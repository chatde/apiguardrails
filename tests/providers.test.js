import { describe, it, expect } from 'vitest';
import { providers, getProvider, getAllProviders, getAllProviderSlugs } from '@/sdk/src/providers.js';

describe('providers data integrity', () => {
  it('has 8 providers', () => {
    expect(Object.keys(providers).length).toBe(8);
  });

  it('each provider has required fields', () => {
    for (const [key, p] of Object.entries(providers)) {
      expect(p.name).toBeTruthy();
      expect(p.slug).toBe(key);
      expect(p.description).toBeTruthy();
      expect(p.tosUrl).toMatch(/^https?:\/\//);
      expect(p.usagePolicyUrl).toMatch(/^https?:\/\//);
      expect(p.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(Array.isArray(p.allowed)).toBe(true);
      expect(p.allowed.length).toBeGreaterThan(0);
      expect(Array.isArray(p.prohibited)).toBe(true);
      expect(p.prohibited.length).toBeGreaterThan(0);
      expect(Array.isArray(p.keyTosPoints)).toBe(true);
      expect(p.keyTosPoints.length).toBeGreaterThan(0);
    }
  });

  it('each keyTosPoints entry has section, summary, and link', () => {
    for (const p of Object.values(providers)) {
      for (const point of p.keyTosPoints) {
        expect(point.section).toBeTruthy();
        expect(point.summary).toBeTruthy();
        expect(point.link).toMatch(/^https?:\/\//);
      }
    }
  });

  it('all expected provider slugs are present', () => {
    const expected = ['openai', 'anthropic', 'google', 'groq', 'cerebras', 'sambanova', 'mistral', 'cohere'];
    for (const slug of expected) {
      expect(providers[slug]).toBeTruthy();
    }
  });
});

describe('getProvider', () => {
  it('returns provider for valid slug', () => {
    const p = getProvider('openai');
    expect(p.name).toBe('OpenAI');
    expect(p.slug).toBe('openai');
  });

  it('returns null for invalid slug', () => {
    expect(getProvider('nonexistent')).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(getProvider(undefined)).toBeNull();
  });
});

describe('getAllProviderSlugs', () => {
  it('returns array of 8 slugs', () => {
    const slugs = getAllProviderSlugs();
    expect(slugs.length).toBe(8);
    expect(slugs).toContain('openai');
    expect(slugs).toContain('anthropic');
  });

  it('returns strings', () => {
    for (const slug of getAllProviderSlugs()) {
      expect(typeof slug).toBe('string');
    }
  });
});

describe('getAllProviders', () => {
  it('returns array of 8 provider objects', () => {
    const all = getAllProviders();
    expect(all.length).toBe(8);
    expect(all[0].name).toBeTruthy();
  });
});
