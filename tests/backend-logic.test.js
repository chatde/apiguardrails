import { describe, it, expect } from 'vitest';
import { analyzeCompliance, groupByProvider, worstVerdict, overallSummary } from '@/sdk/src/rules.js';
import { providers } from '@/sdk/src/providers.js';

// === EDGE CASES FOR analyzeCompliance ===
describe('analyzeCompliance — edge cases', () => {
  it('handles string with only whitespace', () => {
    expect(analyzeCompliance('   ')).toEqual([]);
  });

  it('handles string with only newlines', () => {
    expect(analyzeCompliance('\n\n\n')).toEqual([]);
  });

  it('handles string with special characters only', () => {
    expect(analyzeCompliance('!@#$%^&*()')).toEqual([]);
  });

  it('handles string with numbers only', () => {
    expect(analyzeCompliance('123456789')).toEqual([]);
  });

  it('handles very long string (10k+ chars)', () => {
    const longString = 'I want to build a chatbot with OpenAI using my own API key. '.repeat(200);
    const findings = analyzeCompliance(longString);
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.every(f => f.provider === 'openai')).toBe(true);
  });

  it('handles string with mixed case keywords', () => {
    const findings = analyzeCompliance('I want to BYOK using User API Keys');
    expect(findings.some(f => f.ruleId === 'byok')).toBe(true);
  });

  it('handles multiple rule matches in single description', () => {
    const findings = analyzeCompliance('I want to accept user API keys and resell access using OpenAI');
    const ruleIds = new Set(findings.map(f => f.ruleId));
    expect(ruleIds.has('byok')).toBe(true);
    expect(ruleIds.has('resell')).toBe(true);
  });

  it('handles unicode and emoji in description', () => {
    const findings = analyzeCompliance('🤖 I want to build a chatbot 🚀 with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles description with regex special characters', () => {
    const findings = analyzeCompliance('I want to build a chatbot (my own key) [using OpenAI] with $$$');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });
});

// === EDGE CASES FOR groupByProvider ===
describe('groupByProvider — edge cases', () => {
  it('handles null input gracefully', () => {
    expect(() => groupByProvider(null)).toThrow();
  });

  it('handles undefined input gracefully', () => {
    expect(() => groupByProvider(undefined)).toThrow();
  });

  it('handles single finding', () => {
    const findings = [{ provider: 'openai', ruleId: 'chatbot', verdict: 'allowed' }];
    const grouped = groupByProvider(findings);
    expect(Object.keys(grouped).length).toBe(1);
    expect(grouped.openai.length).toBe(1);
  });

  it('groups multiple findings for same provider', () => {
    const findings = [
      { provider: 'openai', ruleId: 'chatbot', verdict: 'allowed' },
      { provider: 'openai', ruleId: 'byok', verdict: 'prohibited' },
    ];
    const grouped = groupByProvider(findings);
    expect(grouped.openai.length).toBe(2);
  });

  it('groups findings across multiple providers', () => {
    const findings = analyzeCompliance('build a chatbot');
    const grouped = groupByProvider(findings);
    expect(Object.keys(grouped).length).toBeGreaterThan(1);
  });
});

// === EDGE CASES FOR detectProviders ===
describe('detectProviders (exported from rules.js)', () => {
  // Note: detectProviders is internal, testing via analyzeCompliance provider filtering

  it('detects OpenAI via "openai"', () => {
    const findings = analyzeCompliance('use openai for chatbot');
    expect(findings.every(f => f.provider === 'openai')).toBe(true);
  });

  it('detects OpenAI via "gpt-4"', () => {
    const findings = analyzeCompliance('use gpt-4 for chatbot');
    expect(findings.every(f => f.provider === 'openai')).toBe(true);
  });

  it('detects OpenAI via "gpt4" (no hyphen)', () => {
    const findings = analyzeCompliance('use gpt4 for chatbot');
    expect(findings.every(f => f.provider === 'openai')).toBe(true);
  });

  it('detects OpenAI via "chatgpt"', () => {
    const findings = analyzeCompliance('use chatgpt for chatbot');
    expect(findings.every(f => f.provider === 'openai')).toBe(true);
  });

  it('detects OpenAI via "dall-e"', () => {
    const findings = analyzeCompliance('use dall-e for image generation');
    expect(findings.every(f => f.provider === 'openai')).toBe(true);
  });

  it('detects OpenAI via "o1"', () => {
    const findings = analyzeCompliance('use o1 for chatbot');
    expect(findings.every(f => f.provider === 'openai')).toBe(true);
  });

  it('detects Anthropic via "claude"', () => {
    const findings = analyzeCompliance('use claude for chatbot');
    expect(findings.every(f => f.provider === 'anthropic')).toBe(true);
  });

  it('detects Anthropic via "sonnet"', () => {
    const findings = analyzeCompliance('use sonnet for chatbot');
    expect(findings.every(f => f.provider === 'anthropic')).toBe(true);
  });

  it('detects Google via "gemini"', () => {
    const findings = analyzeCompliance('use gemini for chatbot');
    expect(findings.every(f => f.provider === 'google')).toBe(true);
  });

  it('detects Google via "bard"', () => {
    const findings = analyzeCompliance('use bard for chatbot');
    expect(findings.every(f => f.provider === 'google')).toBe(true);
  });

  it('detects Mistral via "mixtral"', () => {
    const findings = analyzeCompliance('use mixtral for chatbot');
    expect(findings.every(f => f.provider === 'mistral')).toBe(true);
  });

  it('detects Cohere via "command r"', () => {
    const findings = analyzeCompliance('use command r for chatbot');
    expect(findings.every(f => f.provider === 'cohere')).toBe(true);
  });

  it('detects multiple providers mentioned', () => {
    const findings = analyzeCompliance('use OpenAI and Claude for chatbot');
    const providerSet = new Set(findings.map(f => f.provider));
    expect(providerSet.has('openai')).toBe(true);
    expect(providerSet.has('anthropic')).toBe(true);
    expect(providerSet.size).toBe(2);
  });

  it('returns all providers when none mentioned', () => {
    const findings = analyzeCompliance('build a chatbot');
    const providerSet = new Set(findings.map(f => f.provider));
    expect(providerSet.size).toBe(8); // all 8 providers
  });
});

// === BUG FIX TESTS: worstVerdict now handles 'warning' ===
describe('worstVerdict — bug fix for warning verdict', () => {
  it('returns prohibited if any finding is prohibited', () => {
    const findings = [
      { verdict: 'allowed' },
      { verdict: 'warning' },
      { verdict: 'prohibited' },
    ];
    expect(worstVerdict(findings)).toBe('prohibited');
  });

  it('returns warning if any finding is warning (no prohibited)', () => {
    const findings = [
      { verdict: 'allowed' },
      { verdict: 'warning' },
      { verdict: 'allowed' },
    ];
    expect(worstVerdict(findings)).toBe('warning');
  });

  it('returns allowed if all findings are allowed', () => {
    const findings = [
      { verdict: 'allowed' },
      { verdict: 'allowed' },
    ];
    expect(worstVerdict(findings)).toBe('allowed');
  });

  it('returns warning for single warning finding', () => {
    const findings = [{ verdict: 'warning' }];
    expect(worstVerdict(findings)).toBe('warning');
  });

  it('returns prohibited for single prohibited finding', () => {
    const findings = [{ verdict: 'prohibited' }];
    expect(worstVerdict(findings)).toBe('prohibited');
  });

  it('handles empty array gracefully', () => {
    // worstVerdict doesn't handle empty arrays explicitly, but shouldn't crash
    const result = worstVerdict([]);
    expect(result).toBe('allowed'); // fallback behavior
  });
});

// === BUG FIX TESTS: overallSummary now handles 'warning' ===
describe('overallSummary — bug fix for warning verdict', () => {
  it('returns prohibited when any finding is prohibited', () => {
    const findings = analyzeCompliance('accept user API keys and build a chatbot');
    const result = overallSummary(findings);
    expect(result.verdict).toBe('prohibited');
    expect(result.message).toContain('violates terms');
  });

  it('returns warning when any finding is warning (no prohibited)', () => {
    // Use synthetic findings to isolate the warning logic
    const findings = [
      { ruleId: 'train-competing', provider: 'groq', verdict: 'warning', reason: 'Check model license' },
      { ruleId: 'chatbot', provider: 'groq', verdict: 'allowed', reason: 'Allowed' },
    ];
    const result = overallSummary(findings);
    expect(result.verdict).toBe('warning');
    expect(result.message).toContain('gray areas');
  });

  it('returns allowed when all findings are allowed', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI using my own key');
    const result = overallSummary(findings);
    expect(result.verdict).toBe('allowed');
    expect(result.message).toContain('allowed');
  });

  it('returns unknown for empty findings', () => {
    const result = overallSummary([]);
    expect(result.verdict).toBe('unknown');
    expect(result.message).toContain('No matching patterns');
  });

  it('message includes provider count for prohibited', () => {
    const findings = analyzeCompliance('accept user API keys');
    const result = overallSummary(findings);
    expect(result.verdict).toBe('prohibited');
    expect(result.message).toMatch(/\d+ provider/);
  });

  it('message includes provider count for warning', () => {
    const findings = analyzeCompliance('use free tier for commercial with Mistral');
    const result = overallSummary(findings);
    expect(result.verdict).toBe('warning');
    expect(result.message).toMatch(/\d+ provider/);
  });
});

// === BUG FIX TESTS: Gray-area verdicts changed to 'warning' ===
describe('Gray-area rules now use warning verdict', () => {
  it('free-commercial with Mistral returns warning', () => {
    const findings = analyzeCompliance('use free tier for commercial with Mistral');
    const mistralFinding = findings.find(f => f.provider === 'mistral' && f.ruleId === 'free-commercial');
    expect(mistralFinding).toBeTruthy();
    expect(mistralFinding.verdict).toBe('warning');
  });

  it('train-competing with Groq returns warning (open-source models)', () => {
    const findings = analyzeCompliance('train competing model using Groq');
    const groqFinding = findings.find(f => f.provider === 'groq' && f.ruleId === 'train-competing');
    expect(groqFinding).toBeTruthy();
    expect(groqFinding.verdict).toBe('warning');
    expect(groqFinding.reason).toContain('open-source');
  });

  it('train-competing with Cerebras returns warning (open-source models)', () => {
    const findings = analyzeCompliance('train competing model using Cerebras');
    const cerebrasFinding = findings.find(f => f.provider === 'cerebras' && f.ruleId === 'train-competing');
    expect(cerebrasFinding).toBeTruthy();
    expect(cerebrasFinding.verdict).toBe('warning');
  });

  it('train-competing with Mistral returns warning (open-weight models)', () => {
    const findings = analyzeCompliance('train competing model using Mistral');
    const mistralFinding = findings.find(f => f.provider === 'mistral' && f.ruleId === 'train-competing');
    expect(mistralFinding).toBeTruthy();
    expect(mistralFinding.verdict).toBe('warning');
  });

  it('free-commercial with Groq returns prohibited (avoiding fees)', () => {
    const findings = analyzeCompliance('use free tier for commercial with Groq');
    const groqFinding = findings.find(f => f.provider === 'groq' && f.ruleId === 'free-commercial');
    expect(groqFinding).toBeTruthy();
    expect(groqFinding.verdict).toBe('prohibited');
  });

  it('free-commercial with Cerebras returns prohibited (revocable license)', () => {
    const findings = analyzeCompliance('use free tier for commercial with Cerebras');
    const cerebrasFinding = findings.find(f => f.provider === 'cerebras' && f.ruleId === 'free-commercial');
    expect(cerebrasFinding).toBeTruthy();
    expect(cerebrasFinding.verdict).toBe('prohibited');
  });
});
