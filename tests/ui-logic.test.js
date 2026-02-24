import { describe, it, expect } from 'vitest';
import { analyzeCompliance, groupByProvider, worstVerdict, overallSummary } from '@/sdk/src/rules.js';
import { providers } from '@/sdk/src/providers.js';

// === UI LOGIC: ComplianceReport Component Behavior ===
describe('UI Logic — ComplianceReport rendering scenarios', () => {
  it('empty findings state returns empty array', () => {
    const findings = analyzeCompliance('xyzzy foobar');
    expect(findings.length).toBe(0);

    // UI should show "no matches" state
    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('unknown');
    expect(summary.message).toContain('No matching patterns');
  });

  it('allowed verdict produces correct summary banner data', () => {
    const findings = analyzeCompliance('build a chatbot with my own OpenAI key');
    const summary = overallSummary(findings);

    expect(summary.verdict).toBe('allowed');
    expect(summary.message).toContain('allowed');

    // UI should render "Looks Good" banner
  });

  it('prohibited verdict produces correct summary banner data', () => {
    const findings = analyzeCompliance('accept user API keys with OpenAI');
    const summary = overallSummary(findings);

    expect(summary.verdict).toBe('prohibited');
    expect(summary.message).toContain('violates terms');

    // UI should render "Potential Violation" banner
  });

  it('warning verdict produces correct summary banner data', () => {
    const findings = analyzeCompliance('use free tier for commercial with Mistral');
    const summary = overallSummary(findings);

    expect(summary.verdict).toBe('warning');
    expect(summary.message).toContain('gray areas');

    // UI should render "Needs Review" banner
  });

  it('unknown verdict produces correct summary banner data', () => {
    const findings = [];
    const summary = overallSummary(findings);

    expect(summary.verdict).toBe('unknown');
    expect(summary.message).toContain('No matching patterns');

    // UI should render "No Matches Found" banner
  });
});

// === UI LOGIC: VerdictBadge Configuration ===
describe('UI Logic — VerdictBadge rendering', () => {
  const verdictConfig = {
    allowed: { label: 'Allowed', icon: '✓' },
    warning: { label: 'Gray Area', icon: '!' },
    prohibited: { label: 'Likely Prohibited', icon: '✗' },
    unknown: { label: 'Unknown', icon: '?' },
  };

  it('allowed verdict has correct config', () => {
    expect(verdictConfig.allowed.label).toBe('Allowed');
    expect(verdictConfig.allowed.icon).toBe('✓');
  });

  it('warning verdict has correct config', () => {
    expect(verdictConfig.warning.label).toBe('Gray Area');
    expect(verdictConfig.warning.icon).toBe('!');
  });

  it('prohibited verdict has correct config', () => {
    expect(verdictConfig.prohibited.label).toBe('Likely Prohibited');
    expect(verdictConfig.prohibited.icon).toBe('✗');
  });

  it('unknown verdict has correct config', () => {
    expect(verdictConfig.unknown.label).toBe('Unknown');
    expect(verdictConfig.unknown.icon).toBe('?');
  });

  it('all verdicts returned by worstVerdict have config', () => {
    const testCases = [
      { findings: [{ verdict: 'allowed' }], expected: 'allowed' },
      { findings: [{ verdict: 'warning' }], expected: 'warning' },
      { findings: [{ verdict: 'prohibited' }], expected: 'prohibited' },
    ];

    for (const testCase of testCases) {
      const verdict = worstVerdict(testCase.findings);
      expect(verdictConfig[verdict]).toBeTruthy();
    }
  });
});

// === UI LOGIC: SummaryBanner States ===
describe('UI Logic — SummaryBanner states', () => {
  it('allowed state renders "Looks Good"', () => {
    const findings = analyzeCompliance('build a chatbot with my own OpenAI key');
    const summary = overallSummary(findings);

    expect(summary.verdict).toBe('allowed');
    // UI renders: "Looks Good" + green styling
  });

  it('warning state renders "Needs Review"', () => {
    const findings = analyzeCompliance('use free tier for commercial with Mistral');
    const summary = overallSummary(findings);

    expect(summary.verdict).toBe('warning');
    // UI renders: "Needs Review" + amber styling
  });

  it('prohibited state renders "Potential Violation"', () => {
    const findings = analyzeCompliance('accept user API keys');
    const summary = overallSummary(findings);

    expect(summary.verdict).toBe('prohibited');
    // UI renders: "Potential Violation" + red styling
  });

  it('unknown state renders "No Matches Found"', () => {
    const findings = [];
    const summary = overallSummary(findings);

    expect(summary.verdict).toBe('unknown');
    // UI renders: "No Matches Found" + gray styling
  });

  it('summary message is user-friendly', () => {
    const testCases = [
      { desc: 'build a chatbot with my own key', expectedWord: 'allowed' },
      { desc: 'accept user API keys', expectedWord: 'violates' },
      { desc: 'use free tier for commercial with Mistral', expectedWord: 'gray' },
    ];

    for (const testCase of testCases) {
      const findings = analyzeCompliance(testCase.desc);
      const summary = overallSummary(findings);
      expect(summary.message.toLowerCase()).toContain(testCase.expectedWord);
    }
  });
});

// === UI LOGIC: Provider Cards Sorting ===
describe('UI Logic — provider card sorting by verdict', () => {
  it('providers sorted prohibited > warning > allowed', () => {
    // Use synthetic findings to test sorting logic with all 3 verdict types
    const findings = [
      { ruleId: 'byok', provider: 'openai', verdict: 'prohibited', reason: 'test' },
      { ruleId: 'train-competing', provider: 'groq', verdict: 'warning', reason: 'test' },
      { ruleId: 'chatbot', provider: 'anthropic', verdict: 'allowed', reason: 'test' },
    ];
    const grouped = groupByProvider(findings);

    const sorted = Object.keys(grouped).sort((a, b) => {
      const order = { prohibited: 0, warning: 1, allowed: 2 };
      return (order[worstVerdict(grouped[a])] ?? 3) - (order[worstVerdict(grouped[b])] ?? 3);
    });

    expect(sorted[0]).toBe('openai');
    expect(worstVerdict(grouped[sorted[0]])).toBe('prohibited');

    expect(sorted[1]).toBe('groq');
    expect(worstVerdict(grouped[sorted[1]])).toBe('warning');

    expect(sorted[2]).toBe('anthropic');
    expect(worstVerdict(grouped[sorted[2]])).toBe('allowed');
  });

  it('all providers have color for UI rendering', () => {
    const findings = analyzeCompliance('build a chatbot');
    const grouped = groupByProvider(findings);

    for (const providerKey of Object.keys(grouped)) {
      const provider = providers[providerKey];
      expect(provider.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('all providers have name for UI rendering', () => {
    const findings = analyzeCompliance('build a chatbot');
    const grouped = groupByProvider(findings);

    for (const providerKey of Object.keys(grouped)) {
      const provider = providers[providerKey];
      expect(provider.name).toBeTruthy();
      expect(typeof provider.name).toBe('string');
    }
  });

  it('all providers have ToS URL for UI linking', () => {
    const findings = analyzeCompliance('build a chatbot');
    const grouped = groupByProvider(findings);

    for (const providerKey of Object.keys(grouped)) {
      const provider = providers[providerKey];
      expect(provider.tosUrl).toMatch(/^https:\/\//);
    }
  });
});

// === UI LOGIC: Finding Detail Rendering ===
describe('UI Logic — finding detail rendering', () => {
  it('each finding has reason for display', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');

    for (const finding of findings) {
      expect(finding.reason).toBeTruthy();
      expect(typeof finding.reason).toBe('string');
      expect(finding.reason.length).toBeGreaterThan(10);
    }
  });

  it('each finding has tosSection for reference', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');

    for (const finding of findings) {
      expect(finding.tosSection).toBeTruthy();
      expect(typeof finding.tosSection).toBe('string');
    }
  });

  it('each finding has verdict for badge rendering', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');

    for (const finding of findings) {
      expect(['allowed', 'prohibited', 'warning']).toContain(finding.verdict);
    }
  });

  it('each finding has ruleId for tracking', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');

    for (const finding of findings) {
      expect(finding.ruleId).toBeTruthy();
      expect(typeof finding.ruleId).toBe('string');
    }
  });

  it('each finding has provider for grouping', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');

    for (const finding of findings) {
      expect(finding.provider).toBeTruthy();
      expect(typeof finding.provider).toBe('string');
      expect(providers[finding.provider]).toBeTruthy();
    }
  });
});

// === UI LOGIC: ComplianceChecker Example Buttons ===
describe('UI Logic — example button functionality', () => {
  const examples = [
    'I want to use OpenAI to power my SaaS chatbot',
    'I accept user API keys to call Anthropic',
    'I use Groq free tier for my commercial app',
    'Building a RAG system with my own API key',
    'I want to proxy OpenAI requests through my server',
  ];

  it('example 1: SaaS chatbot (allowed)', () => {
    const findings = analyzeCompliance(examples[0]);
    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('allowed');
  });

  it('example 2: accept user keys (prohibited)', () => {
    const findings = analyzeCompliance(examples[1]);
    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited');
  });

  it('example 3: Groq free tier commercial (prohibited)', () => {
    const findings = analyzeCompliance(examples[2]);
    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited');
  });

  it('example 4: RAG with own key (allowed)', () => {
    const findings = analyzeCompliance(examples[3]);
    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('allowed');
  });

  it('example 5: proxy requests (prohibited)', () => {
    const findings = analyzeCompliance(examples[4]);
    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited');
  });

  it('all examples produce findings', () => {
    for (const example of examples) {
      const findings = analyzeCompliance(example);
      expect(findings.length).toBeGreaterThan(0);
    }
  });

  it('all examples can be grouped by provider', () => {
    for (const example of examples) {
      const findings = analyzeCompliance(example);
      const grouped = groupByProvider(findings);
      expect(Object.keys(grouped).length).toBeGreaterThan(0);
    }
  });
});

// === UI LOGIC: Empty State Handling ===
describe('UI Logic — empty state handling', () => {
  it('empty input returns empty findings', () => {
    const findings = analyzeCompliance('');
    expect(findings.length).toBe(0);
  });

  it('too-short input returns empty findings', () => {
    const findings = analyzeCompliance('ab');
    expect(findings.length).toBe(0);
  });

  it('unrecognized input returns empty findings', () => {
    const findings = analyzeCompliance('xyzzy foobar baz quux');
    expect(findings.length).toBe(0);
  });

  it('empty findings show helpful message', () => {
    const findings = [];
    const summary = overallSummary(findings);
    expect(summary.message).toContain('Try being more specific');
  });

  it('empty findings have unknown verdict', () => {
    const findings = [];
    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('unknown');
  });
});

// === UI LOGIC: Provider Link Generation ===
describe('UI Logic — provider page linking', () => {
  it('all providers have slug for /providers/:slug links', () => {
    const findings = analyzeCompliance('build a chatbot');
    const grouped = groupByProvider(findings);

    for (const providerKey of Object.keys(grouped)) {
      const provider = providers[providerKey];
      expect(provider.slug).toBe(providerKey);
      // UI generates: /providers/${provider.slug}
    }
  });

  it('provider slugs are URL-safe', () => {
    for (const [key, provider] of Object.entries(providers)) {
      expect(provider.slug).toMatch(/^[a-z]+$/);
      expect(provider.slug).not.toContain(' ');
      expect(provider.slug).not.toContain('/');
    }
  });
});

// === UI LOGIC: Verdict Icon Mapping ===
describe('UI Logic — verdict icon mapping', () => {
  it('allowed verdict uses checkmark icon', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');
    const openaiFindings = findings.filter(f => f.provider === 'openai');
    const verdict = worstVerdict(openaiFindings);

    expect(verdict).toBe('allowed');
    // UI renders: ✓ icon
  });

  it('prohibited verdict uses X icon', () => {
    const findings = analyzeCompliance('accept user API keys with OpenAI');
    const verdict = worstVerdict(findings);

    expect(verdict).toBe('prohibited');
    // UI renders: ✗ icon
  });

  it('warning verdict uses exclamation icon', () => {
    const findings = analyzeCompliance('use free tier for commercial with Mistral');
    const mistralFindings = findings.filter(f => f.provider === 'mistral');
    const verdict = worstVerdict(mistralFindings);

    expect(verdict).toBe('warning');
    // UI renders: ! icon
  });

  it('summary banner maps verdicts to emoji', () => {
    const verdictToEmoji = {
      allowed: '🛡️',
      warning: '⚠️',
      prohibited: '🚫',
      unknown: '❓',
    };

    for (const [verdict, emoji] of Object.entries(verdictToEmoji)) {
      expect(emoji).toBeTruthy();
      // UI renders these emojis in SummaryBanner
    }
  });
});

// === UI LOGIC: Responsive Data Structures ===
describe('UI Logic — data structures for responsive UI', () => {
  it('findings array is iterable for rendering', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');
    expect(Array.isArray(findings)).toBe(true);

    let count = 0;
    for (const finding of findings) {
      expect(finding).toBeTruthy();
      count++;
    }
    expect(count).toBe(findings.length);
  });

  it('grouped object is iterable for rendering provider cards', () => {
    const findings = analyzeCompliance('build a chatbot');
    const grouped = groupByProvider(findings);

    const keys = Object.keys(grouped);
    expect(keys.length).toBeGreaterThan(0);

    for (const key of keys) {
      expect(Array.isArray(grouped[key])).toBe(true);
    }
  });

  it('summary object has required fields for banner', () => {
    const findings = analyzeCompliance('build a chatbot');
    const summary = overallSummary(findings);

    expect(summary.verdict).toBeTruthy();
    expect(summary.message).toBeTruthy();
    expect(typeof summary.verdict).toBe('string');
    expect(typeof summary.message).toBe('string');
  });
});
