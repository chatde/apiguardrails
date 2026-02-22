import { describe, it, expect } from 'vitest';
import { analyzeCompliance, groupByProvider, worstVerdict, overallSummary } from '@/sdk/src/rules.js';

// === INPUT VALIDATION ===
describe('analyzeCompliance — input validation', () => {
  it('returns empty array for null input', () => {
    expect(analyzeCompliance(null)).toEqual([]);
  });

  it('returns empty array for undefined input', () => {
    expect(analyzeCompliance(undefined)).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(analyzeCompliance('')).toEqual([]);
  });

  it('returns empty array for too-short string', () => {
    expect(analyzeCompliance('ab')).toEqual([]);
  });

  it('returns empty array for non-string input', () => {
    expect(analyzeCompliance(42)).toEqual([]);
  });

  it('returns empty array for unrecognized input', () => {
    expect(analyzeCompliance('xyzzy foobar baz')).toEqual([]);
  });
});

// === RULE CATEGORIES ===
describe('analyzeCompliance — rule categories', () => {
  it('detects BYOK pattern', () => {
    const findings = analyzeCompliance('accept user API keys');
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.some(f => f.ruleId === 'byok')).toBe(true);
    expect(findings.every(f => f.verdict === 'prohibited')).toBe(true);
  });

  it('detects reselling pattern', () => {
    const findings = analyzeCompliance('resell API access to customers');
    expect(findings.some(f => f.ruleId === 'resell')).toBe(true);
  });

  it('detects SaaS own-key pattern', () => {
    const findings = analyzeCompliance('build my own app with my API key');
    expect(findings.some(f => f.ruleId === 'saas-own-key')).toBe(true);
    expect(findings.some(f => f.verdict === 'allowed')).toBe(true);
  });

  it('detects free tier commercial pattern', () => {
    const findings = analyzeCompliance('use free tier for commercial production');
    expect(findings.some(f => f.ruleId === 'free-commercial')).toBe(true);
  });

  it('detects training competing models', () => {
    const findings = analyzeCompliance('distill model knowledge into our own');
    expect(findings.some(f => f.ruleId === 'train-competing')).toBe(true);
  });

  it('detects high-stakes automated decisions', () => {
    const findings = analyzeCompliance('automated decision making system for loan approvals');
    expect(findings.some(f => f.ruleId === 'high-stakes')).toBe(true);
    expect(findings.every(f => f.verdict === 'prohibited')).toBe(true);
  });

  it('detects harmful content generation', () => {
    const findings = analyzeCompliance('generate malware exploits');
    expect(findings.some(f => f.ruleId === 'harmful-content')).toBe(true);
  });

  it('detects circumvention patterns', () => {
    const findings = analyzeCompliance('bypass rate limits');
    expect(findings.some(f => f.ruleId === 'circumvent')).toBe(true);
  });

  it('detects chatbot use case', () => {
    const findings = analyzeCompliance('build a customer support chatbot');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
    expect(findings.some(f => f.verdict === 'allowed')).toBe(true);
  });

  it('detects RAG use case', () => {
    const findings = analyzeCompliance('retrieval augmented generation with embeddings');
    expect(findings.some(f => f.ruleId === 'rag')).toBe(true);
  });

  it('detects code generation', () => {
    const findings = analyzeCompliance('build a code generation copilot');
    expect(findings.some(f => f.ruleId === 'code-gen')).toBe(true);
  });

  it('detects content writing', () => {
    const findings = analyzeCompliance('generate blog posts and marketing copy');
    expect(findings.some(f => f.ruleId === 'content-writing')).toBe(true);
  });

  it('detects image generation', () => {
    const findings = analyzeCompliance('text to image generation with DALL-E');
    expect(findings.some(f => f.ruleId === 'image-gen')).toBe(true);
  });

  it('detects data analysis', () => {
    const findings = analyzeCompliance('summarize and analyze data from reports');
    expect(findings.some(f => f.ruleId === 'data-analysis')).toBe(true);
  });

  it('detects translation', () => {
    const findings = analyzeCompliance('multilingual translation service');
    expect(findings.some(f => f.ruleId === 'translation')).toBe(true);
  });

  it('detects surveillance', () => {
    const findings = analyzeCompliance('mass facial recognition surveillance system');
    expect(findings.some(f => f.ruleId === 'surveillance')).toBe(true);
  });

  it('detects education', () => {
    const findings = analyzeCompliance('build an AI tutoring platform for students');
    expect(findings.some(f => f.ruleId === 'education')).toBe(true);
  });
});

// === PROVIDER FILTERING ===
describe('analyzeCompliance — provider filtering', () => {
  it('filters to mentioned provider (OpenAI)', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');
    expect(findings.every(f => f.provider === 'openai')).toBe(true);
  });

  it('filters to mentioned provider (Claude/Anthropic)', () => {
    const findings = analyzeCompliance('build a chatbot using Claude');
    expect(findings.every(f => f.provider === 'anthropic')).toBe(true);
  });

  it('returns all providers when none mentioned', () => {
    const findings = analyzeCompliance('build a chatbot');
    const providers = new Set(findings.map(f => f.provider));
    expect(providers.size).toBe(8);
  });

  it('handles provider aliases (GPT-4)', () => {
    const findings = analyzeCompliance('use gpt-4 for code completion');
    expect(findings.every(f => f.provider === 'openai')).toBe(true);
  });

  it('handles multiple providers', () => {
    const findings = analyzeCompliance('use OpenAI and Anthropic for a chatbot');
    const providers = new Set(findings.map(f => f.provider));
    expect(providers.has('openai')).toBe(true);
    expect(providers.has('anthropic')).toBe(true);
    expect(providers.size).toBe(2);
  });
});

// === GROUPING ===
describe('groupByProvider', () => {
  it('groups findings by provider key', () => {
    const findings = analyzeCompliance('build a chatbot');
    const grouped = groupByProvider(findings);
    expect(Object.keys(grouped)).toContain('openai');
    expect(Object.keys(grouped)).toContain('anthropic');
    expect(Array.isArray(grouped.openai)).toBe(true);
  });

  it('returns empty object for empty array', () => {
    expect(groupByProvider([])).toEqual({});
  });
});

// === WORST VERDICT ===
describe('worstVerdict', () => {
  it('returns prohibited if any finding is prohibited', () => {
    const findings = [
      { verdict: 'allowed' },
      { verdict: 'prohibited' },
    ];
    expect(worstVerdict(findings)).toBe('prohibited');
  });

  it('returns allowed if all allowed', () => {
    const findings = [
      { verdict: 'allowed' },
      { verdict: 'allowed' },
    ];
    expect(worstVerdict(findings)).toBe('allowed');
  });
});

// === OVERALL SUMMARY ===
describe('overallSummary', () => {
  it('returns unknown for empty findings', () => {
    const result = overallSummary([]);
    expect(result.verdict).toBe('unknown');
  });

  it('returns prohibited when any finding is prohibited', () => {
    const findings = analyzeCompliance('accept user API keys and build a chatbot');
    const result = overallSummary(findings);
    expect(result.verdict).toBe('prohibited');
  });

  it('returns allowed when all findings are allowed', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI using my own key');
    const result = overallSummary(findings);
    expect(result.verdict).toBe('allowed');
  });
});
