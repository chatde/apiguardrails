import { describe, it, expect } from 'vitest';
import { analyzeCompliance, groupByProvider, worstVerdict, overallSummary } from '@/sdk/src/rules.js';
import { providers } from '@/sdk/src/providers.js';

// === FULL FLOW INTEGRATION TESTS ===
describe('Integration — full flow: description → analysis → grouping → verdict → summary', () => {
  it('prohibited BYOK flow end-to-end', () => {
    const description = 'I want to accept user API keys to call OpenAI';

    // Step 1: Analyze
    const findings = analyzeCompliance(description);
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.some(f => f.ruleId === 'byok')).toBe(true);
    expect(findings.every(f => f.provider === 'openai')).toBe(true);

    // Step 2: Group by provider
    const grouped = groupByProvider(findings);
    expect(grouped.openai).toBeTruthy();
    expect(grouped.openai.length).toBeGreaterThan(0);

    // Step 3: Worst verdict for OpenAI
    const verdict = worstVerdict(grouped.openai);
    expect(verdict).toBe('prohibited');

    // Step 4: Overall summary
    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited');
    expect(summary.message).toContain('violates terms');
  });

  it('allowed chatbot flow end-to-end', () => {
    const description = 'I want to build a chatbot using my own OpenAI API key';

    const findings = analyzeCompliance(description);
    expect(findings.length).toBeGreaterThan(0);

    const grouped = groupByProvider(findings);
    expect(grouped.openai).toBeTruthy();

    const verdict = worstVerdict(grouped.openai);
    expect(verdict).toBe('allowed');

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('allowed');
    expect(summary.message).toContain('allowed');
  });

  it('warning free-commercial flow end-to-end', () => {
    const description = 'I want to use Mistral free tier for my commercial app';

    const findings = analyzeCompliance(description);
    expect(findings.length).toBeGreaterThan(0);

    const grouped = groupByProvider(findings);
    expect(grouped.mistral).toBeTruthy();

    const verdict = worstVerdict(grouped.mistral);
    expect(verdict).toBe('warning');

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('warning');
    expect(summary.message).toContain('gray areas');
  });

  it('mixed verdicts flow end-to-end (allowed + prohibited)', () => {
    const description = 'I want to build a chatbot and accept user API keys with OpenAI';

    const findings = analyzeCompliance(description);
    expect(findings.length).toBeGreaterThan(0);

    const ruleIds = new Set(findings.map(f => f.ruleId));
    expect(ruleIds.has('chatbot')).toBe(true);
    expect(ruleIds.has('byok')).toBe(true);

    const grouped = groupByProvider(findings);
    expect(grouped.openai).toBeTruthy();

    const verdict = worstVerdict(grouped.openai);
    expect(verdict).toBe('prohibited'); // worst verdict wins

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited');
  });

  it('multi-provider flow end-to-end', () => {
    const description = 'I want to build a chatbot using OpenAI and Anthropic';

    const findings = analyzeCompliance(description);
    expect(findings.length).toBeGreaterThan(0);

    const grouped = groupByProvider(findings);
    expect(grouped.openai).toBeTruthy();
    expect(grouped.anthropic).toBeTruthy();
    expect(Object.keys(grouped).length).toBe(2);

    const openaiVerdict = worstVerdict(grouped.openai);
    expect(openaiVerdict).toBe('allowed');

    const anthropicVerdict = worstVerdict(grouped.anthropic);
    expect(anthropicVerdict).toBe('allowed');

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('allowed');
  });

  it('no matches flow end-to-end', () => {
    const description = 'xyzzy foobar baz';

    const findings = analyzeCompliance(description);
    expect(findings.length).toBe(0);

    const grouped = groupByProvider(findings);
    expect(Object.keys(grouped).length).toBe(0);

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('unknown');
    expect(summary.message).toContain('No matching patterns');
  });
});

// === INTEGRATION: PROVIDER DATA CONSISTENCY ===
describe('Integration — provider data consistency with findings', () => {
  it('every finding provider exists in providers.js', () => {
    const descriptions = [
      'build a chatbot',
      'accept user API keys',
      'use free tier for commercial',
      'train competing model',
      'generate malware',
    ];

    for (const desc of descriptions) {
      const findings = analyzeCompliance(desc);
      for (const finding of findings) {
        expect(providers[finding.provider]).toBeTruthy();
      }
    }
  });

  it('provider colors are accessible from findings', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');
    const grouped = groupByProvider(findings);

    for (const [providerKey] of Object.entries(grouped)) {
      const provider = providers[providerKey];
      expect(provider.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('provider ToS URLs are accessible from findings', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');
    const grouped = groupByProvider(findings);

    for (const [providerKey] of Object.entries(grouped)) {
      const provider = providers[providerKey];
      expect(provider.tosUrl).toMatch(/^https:\/\//);
    }
  });

  it('provider names are accessible from findings', () => {
    const findings = analyzeCompliance('build a chatbot');
    const grouped = groupByProvider(findings);

    for (const [providerKey] of Object.entries(grouped)) {
      const provider = providers[providerKey];
      expect(provider.name).toBeTruthy();
      expect(typeof provider.name).toBe('string');
    }
  });
});

// === INTEGRATION: COMPLEX MULTI-RULE SCENARIOS ===
describe('Integration — complex multi-rule scenarios', () => {
  it('chatbot + RAG + code-gen all detected', () => {
    const description = 'Build a chatbot with RAG and code generation using OpenAI';
    const findings = analyzeCompliance(description);

    const ruleIds = new Set(findings.map(f => f.ruleId));
    expect(ruleIds.has('chatbot')).toBe(true);
    expect(ruleIds.has('rag')).toBe(true);
    expect(ruleIds.has('code-gen')).toBe(true);

    const verdict = worstVerdict(findings);
    expect(verdict).toBe('allowed');
  });

  it('chatbot + BYOK + resell all detected', () => {
    const description = 'Build a chatbot that accepts user API keys and resells access using OpenAI';
    const findings = analyzeCompliance(description);

    const ruleIds = new Set(findings.map(f => f.ruleId));
    expect(ruleIds.has('chatbot')).toBe(true);
    expect(ruleIds.has('byok')).toBe(true);
    expect(ruleIds.has('resell')).toBe(true);

    const verdict = worstVerdict(findings);
    expect(verdict).toBe('prohibited'); // worst verdict
  });

  it('multiple prohibited rules all show up', () => {
    const description = 'Accept user API keys, resell access, and bypass rate limits with OpenAI';
    const findings = analyzeCompliance(description);

    const ruleIds = new Set(findings.map(f => f.ruleId));
    expect(ruleIds.has('byok')).toBe(true);
    expect(ruleIds.has('resell')).toBe(true);
    expect(ruleIds.has('circumvent')).toBe(true);

    expect(findings.every(f => f.verdict === 'prohibited')).toBe(true);
  });

  it('education + chatbot both allowed', () => {
    const description = 'Build a tutoring chatbot for students using OpenAI';
    const findings = analyzeCompliance(description);

    const ruleIds = new Set(findings.map(f => f.ruleId));
    expect(ruleIds.has('education')).toBe(true);
    expect(ruleIds.has('chatbot')).toBe(true);

    expect(findings.every(f => f.verdict === 'allowed')).toBe(true);
  });

  it('high-stakes + chatbot mixed verdict', () => {
    const description = 'Build a chatbot for automated loan approvals using OpenAI';
    const findings = analyzeCompliance(description);

    const ruleIds = new Set(findings.map(f => f.ruleId));
    expect(ruleIds.has('chatbot')).toBe(true);
    expect(ruleIds.has('high-stakes')).toBe(true);

    const verdict = worstVerdict(findings);
    expect(verdict).toBe('prohibited'); // high-stakes overrides chatbot
  });
});

// === INTEGRATION: REAL-WORLD USE CASES ===
describe('Integration — real-world use cases', () => {
  it('SaaS startup with own key (allowed)', () => {
    const description = 'I am building a SaaS product powered by OpenAI using my own API key';
    const findings = analyzeCompliance(description);

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('allowed');
  });

  it('API aggregator with BYOK (prohibited)', () => {
    const description = 'I am building an API aggregator that lets users bring their own OpenAI keys';
    const findings = analyzeCompliance(description);

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited');
  });

  it('Free tier startup (mixed based on provider)', () => {
    const description = 'I want to use the Cerebras free tier for my commercial startup';
    const findings = analyzeCompliance(description);

    const cerebrasFindings = findings.filter(f => f.provider === 'cerebras');
    const verdict = worstVerdict(cerebrasFindings);
    expect(verdict).toBe('prohibited'); // free tier not safe for production
  });

  it('Training competing model (prohibited for proprietary)', () => {
    const description = 'I want to distill OpenAI model knowledge to train my own model';
    const findings = analyzeCompliance(description);

    const openaiFindings = findings.filter(f => f.provider === 'openai' && f.ruleId === 'train-competing');
    expect(openaiFindings.length).toBeGreaterThan(0);
    expect(openaiFindings[0].verdict).toBe('prohibited');
  });

  it('Training competing model (warning for open-source)', () => {
    const description = 'I want to train a competing model using Groq outputs';
    const findings = analyzeCompliance(description);

    const groqFindings = findings.filter(f => f.provider === 'groq' && f.ruleId === 'train-competing');
    expect(groqFindings.length).toBeGreaterThan(0);
    expect(groqFindings[0].verdict).toBe('warning');
  });

  it('RAG system with multiple providers', () => {
    const description = 'Building a RAG system using OpenAI embeddings and Cohere Rerank';
    const findings = analyzeCompliance(description);

    const grouped = groupByProvider(findings);
    expect(grouped.openai).toBeTruthy();
    expect(grouped.cohere).toBeTruthy();

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('allowed');
  });

  it('Content generation with disclosure', () => {
    const description = 'Generate blog posts and marketing copy with proper AI disclosure using OpenAI';
    const findings = analyzeCompliance(description);

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('allowed');
  });

  it('Harmful content generation (prohibited)', () => {
    const description = 'Generate malware exploits using OpenAI';
    const findings = analyzeCompliance(description);

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited');
  });

  it('Surveillance application (prohibited)', () => {
    const description = 'Build a mass facial recognition surveillance system using Google Gemini';
    const findings = analyzeCompliance(description);

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited');
  });

  it('Medical diagnosis with human oversight (prohibited without clarification)', () => {
    const description = 'Build an automated medical diagnosis system using Claude';
    const findings = analyzeCompliance(description);

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited'); // high-stakes without human oversight
  });
});

// === INTEGRATION: SORTING AND ORDERING ===
describe('Integration — sorting and ordering', () => {
  it('providers sorted by worst verdict (prohibited first)', () => {
    const description = 'Build a chatbot and accept user API keys with OpenAI, Claude, and Groq';
    const findings = analyzeCompliance(description);
    const grouped = groupByProvider(findings);

    const providerKeys = Object.keys(grouped).sort((a, b) => {
      const order = { prohibited: 0, warning: 1, allowed: 2 };
      return (order[worstVerdict(grouped[a])] ?? 3) - (order[worstVerdict(grouped[b])] ?? 3);
    });

    // First provider should have prohibited verdict (BYOK)
    const firstVerdict = worstVerdict(grouped[providerKeys[0]]);
    expect(firstVerdict).toBe('prohibited');
  });

  it('multiple findings for same provider grouped together', () => {
    const description = 'Build a chatbot with RAG and code generation using my own OpenAI key';
    const findings = analyzeCompliance(description);
    const grouped = groupByProvider(findings);

    expect(grouped.openai.length).toBeGreaterThan(1);

    // All findings should be for OpenAI
    expect(grouped.openai.every(f => f.provider === 'openai')).toBe(true);
  });
});

// === INTEGRATION: EMPTY AND EDGE STATES ===
describe('Integration — empty and edge states', () => {
  it('empty findings produce empty grouped object', () => {
    const findings = [];
    const grouped = groupByProvider(findings);
    expect(Object.keys(grouped).length).toBe(0);
  });

  it('empty findings produce unknown summary', () => {
    const findings = [];
    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('unknown');
  });

  it('single finding produces single-provider group', () => {
    const findings = [{ provider: 'openai', ruleId: 'chatbot', verdict: 'allowed' }];
    const grouped = groupByProvider(findings);
    expect(Object.keys(grouped).length).toBe(1);
    expect(grouped.openai.length).toBe(1);
  });

  it('findings with no provider filter return all 8 providers', () => {
    const findings = analyzeCompliance('build a chatbot');
    const grouped = groupByProvider(findings);
    expect(Object.keys(grouped).length).toBe(8);
  });
});
