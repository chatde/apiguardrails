import { describe, it, expect } from 'vitest';
import {
  analyzeCompliance,
  groupByProvider,
  worstVerdict,
  overallSummary,
  providers,
  getProvider,
  getAllProviders,
  getAllProviderSlugs,
} from '@/sdk/src/index.js';

describe('barrel export — all functions available', () => {
  it('exports analyzeCompliance', () => {
    expect(typeof analyzeCompliance).toBe('function');
  });

  it('exports groupByProvider', () => {
    expect(typeof groupByProvider).toBe('function');
  });

  it('exports worstVerdict', () => {
    expect(typeof worstVerdict).toBe('function');
  });

  it('exports overallSummary', () => {
    expect(typeof overallSummary).toBe('function');
  });

  it('exports providers object', () => {
    expect(typeof providers).toBe('object');
    expect(providers.openai).toBeTruthy();
  });

  it('exports getProvider', () => {
    expect(typeof getProvider).toBe('function');
  });

  it('exports getAllProviders', () => {
    expect(typeof getAllProviders).toBe('function');
  });

  it('exports getAllProviderSlugs', () => {
    expect(typeof getAllProviderSlugs).toBe('function');
  });
});

describe('full workflow via barrel export', () => {
  it('analyze → group → verdict → summary', () => {
    const findings = analyzeCompliance('I want to accept user API keys to proxy OpenAI requests');
    expect(findings.length).toBeGreaterThan(0);

    const grouped = groupByProvider(findings);
    expect(grouped.openai).toBeTruthy();

    const verdict = worstVerdict(grouped.openai);
    expect(verdict).toBe('prohibited');

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('prohibited');
  });

  it('allowed use case end-to-end', () => {
    const findings = analyzeCompliance('build a chatbot with my own OpenAI key');
    const grouped = groupByProvider(findings);
    expect(grouped.openai).toBeTruthy();

    const verdict = worstVerdict(grouped.openai);
    expect(verdict).toBe('allowed');

    const summary = overallSummary(findings);
    expect(summary.verdict).toBe('allowed');
  });

  it('provider data is accessible from barrel', () => {
    const slugs = getAllProviderSlugs();
    expect(slugs.length).toBe(8);

    const all = getAllProviders();
    expect(all.length).toBe(8);

    const openai = getProvider('openai');
    expect(openai.name).toBe('OpenAI');
  });

  it('rules and provider data are consistent', () => {
    // Every provider in a finding should exist in providers data
    const findings = analyzeCompliance('build a chatbot');
    for (const f of findings) {
      expect(providers[f.provider]).toBeTruthy();
    }
  });
});
