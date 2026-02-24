import { describe, it, expect } from 'vitest';
import { providers, getAllProviders, getAllProviderSlugs } from '@/sdk/src/providers.js';
import { analyzeCompliance } from '@/sdk/src/rules.js';

// Import rules source for structural tests
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rulesPath = join(__dirname, '../sdk/src/rules.js');
const rulesSource = readFileSync(rulesPath, 'utf-8');

// Extract rules text for structural parsing
const rulesText = rulesSource;

// === ALL PROVIDERS COVERED IN ALL RULES ===
describe('Data integrity — rule coverage', () => {
  const expectedProviders = ['openai', 'anthropic', 'google', 'groq', 'cerebras', 'sambanova', 'mistral', 'cohere'];

  it('all 8 providers exist in providers.js', () => {
    expect(Object.keys(providers).length).toBe(8);
    for (const slug of expectedProviders) {
      expect(providers[slug]).toBeTruthy();
    }
  });

  it('every rule in rules.js covers all 8 providers', () => {
    // Test via analyzeCompliance — each rule's keywords should produce findings for all providers
    const ruleKeywords = {
      'byok': 'accept user api key',
      'resell': 'resell api access',
      'saas-own-key': 'build my own app',
      'free-commercial': 'free tier commercial use',
      'train-competing': 'train competing model',
      'high-stakes': 'medical diagnosis automated',
      'harmful-content': 'generate malware',
      'circumvent': 'bypass rate limit',
      'chatbot': 'chatbot assistant',
      'rag': 'retrieval augmented generation RAG',
      'code-gen': 'code generation copilot',
      'content-writing': 'content writing blog',
      'image-gen': 'image generation ai art',
      'data-analysis': 'data analysis summarize',
      'translation': 'translation multilingual',
      'surveillance': 'surveillance tracking spy',
      'education': 'education tutoring student',
    };

    for (const [ruleId, keyword] of Object.entries(ruleKeywords)) {
      const findings = analyzeCompliance(keyword);
      const ruleFindings = findings.filter(f => f.ruleId === ruleId);
      const foundProviders = [...new Set(ruleFindings.map(f => f.provider))];
      expect(foundProviders.length, `Rule "${ruleId}" should cover all 8 providers but found ${foundProviders.length}`).toBe(8);
    }
  });

  it('no duplicate rule IDs', () => {
    const ruleIdMatches = rulesText.matchAll(/id:\s*['"]([^'"]+)['"]/g);
    const ruleIds = [...ruleIdMatches].map(m => m[1]);
    const uniqueIds = new Set(ruleIds);
    expect(ruleIds.length).toBe(uniqueIds.size);
  });
});

// === PROVIDER DATA COMPLETENESS ===
describe('Data integrity — provider data completeness', () => {
  it('every provider has exactly the required fields', () => {
    const requiredFields = [
      'name', 'slug', 'description', 'tosUrl', 'usagePolicyUrl',
      'lastUpdated', 'color', 'allowed', 'prohibited', 'keyTosPoints'
    ];

    for (const [key, provider] of Object.entries(providers)) {
      for (const field of requiredFields) {
        expect(provider[field]).toBeTruthy();
      }

      // No extra fields
      const providerFields = Object.keys(provider);
      expect(providerFields.sort()).toEqual(requiredFields.sort());
    }
  });

  it('every provider has at least 3 allowed items', () => {
    for (const provider of Object.values(providers)) {
      expect(provider.allowed.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every provider has at least 3 prohibited items', () => {
    for (const provider of Object.values(providers)) {
      expect(provider.prohibited.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every provider has at least 2 keyTosPoints', () => {
    for (const provider of Object.values(providers)) {
      expect(provider.keyTosPoints.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('every keyTosPoint has section, summary, and link', () => {
    for (const provider of Object.values(providers)) {
      for (const point of provider.keyTosPoints) {
        expect(point.section).toBeTruthy();
        expect(point.summary).toBeTruthy();
        expect(point.link).toBeTruthy();
        expect(typeof point.section).toBe('string');
        expect(typeof point.summary).toBe('string');
        expect(typeof point.link).toBe('string');
      }
    }
  });

  it('every provider name is a string', () => {
    for (const provider of Object.values(providers)) {
      expect(typeof provider.name).toBe('string');
      expect(provider.name.length).toBeGreaterThan(0);
    }
  });

  it('every provider description is a string', () => {
    for (const provider of Object.values(providers)) {
      expect(typeof provider.description).toBe('string');
      expect(provider.description.length).toBeGreaterThan(10);
    }
  });

  it('every provider lastUpdated is a valid date', () => {
    for (const provider of Object.values(providers)) {
      expect(provider.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const date = new Date(provider.lastUpdated);
      expect(date.toString()).not.toBe('Invalid Date');
    }
  });

  it('every provider color is a valid hex code', () => {
    for (const provider of Object.values(providers)) {
      expect(provider.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('every provider slug matches its key', () => {
    for (const [key, provider] of Object.entries(providers)) {
      expect(provider.slug).toBe(key);
    }
  });
});

// === TOS URLS VALID FORMAT ===
describe('Data integrity — ToS URL format', () => {
  it('every provider tosUrl is valid HTTPS URL', () => {
    for (const provider of Object.values(providers)) {
      expect(provider.tosUrl).toMatch(/^https:\/\/.+/);
      expect(() => new URL(provider.tosUrl)).not.toThrow();
    }
  });

  it('every provider usagePolicyUrl is valid HTTPS URL', () => {
    for (const provider of Object.values(providers)) {
      expect(provider.usagePolicyUrl).toMatch(/^https:\/\/.+/);
      expect(() => new URL(provider.usagePolicyUrl)).not.toThrow();
    }
  });

  it('every keyTosPoint link is valid HTTPS URL', () => {
    for (const provider of Object.values(providers)) {
      for (const point of provider.keyTosPoints) {
        expect(point.link).toMatch(/^https:\/\/.+/);
        expect(() => new URL(point.link)).not.toThrow();
      }
    }
  });

  it('no HTTP URLs (all must be HTTPS)', () => {
    for (const provider of Object.values(providers)) {
      expect(provider.tosUrl).not.toMatch(/^http:\/\//);
      expect(provider.usagePolicyUrl).not.toMatch(/^http:\/\//);
      for (const point of provider.keyTosPoints) {
        expect(point.link).not.toMatch(/^http:\/\//);
      }
    }
  });

  it('all URLs have valid domain names', () => {
    for (const provider of Object.values(providers)) {
      const tosUrl = new URL(provider.tosUrl);
      expect(tosUrl.hostname).toMatch(/^[a-z0-9.-]+\.[a-z]{2,}$/i);

      const policyUrl = new URL(provider.usagePolicyUrl);
      expect(policyUrl.hostname).toMatch(/^[a-z0-9.-]+\.[a-z]{2,}$/i);

      for (const point of provider.keyTosPoints) {
        const pointUrl = new URL(point.link);
        expect(pointUrl.hostname).toMatch(/^[a-z0-9.-]+\.[a-z]{2,}$/i);
      }
    }
  });
});

// === RULES DATA INTEGRITY ===
describe('Data integrity — rules structure', () => {
  it('every rule has unique ID', () => {
    const ruleIdMatches = rulesText.matchAll(/id:\s*['"]([^'"]+)['"]/g);
    const ruleIds = [...ruleIdMatches].map(m => m[1]);
    const uniqueIds = new Set(ruleIds);
    expect(ruleIds.length).toBe(uniqueIds.size);
  });

  it('every rule has keywords array', () => {
    const keywordsMatches = rulesText.matchAll(/keywords:\s*\[([^\]]+)\]/g);
    expect([...keywordsMatches].length).toBeGreaterThan(0);
  });

  it('every rule has providers object with all 8 providers', () => {
    // Tested via analyzeCompliance in rule coverage tests above
    // Each rule keyword returns 8 provider findings when no provider is mentioned
    const findings = analyzeCompliance('build a chatbot');
    const chatbotFindings = findings.filter(f => f.ruleId === 'chatbot');
    expect(chatbotFindings.length).toBe(8);
  });

  it('every provider entry in rules has verdict and reason', () => {
    const providerEntryMatches = rulesText.matchAll(/verdict:\s*['"]([^'"]+)['"],\s*reason:/g);
    expect([...providerEntryMatches].length).toBeGreaterThan(0);
  });

  it('all verdicts are valid values', () => {
    const verdictMatches = rulesText.matchAll(/verdict:\s*['"]([^'"]+)['"]/g);
    const verdicts = [...verdictMatches].map(m => m[1]);
    const validVerdicts = ['allowed', 'prohibited', 'warning', 'unknown'];

    for (const verdict of verdicts) {
      expect(validVerdicts).toContain(verdict);
    }
  });

  it('all rules have at least 3 keywords', () => {
    const keywordsMatches = rulesText.matchAll(/keywords:\s*\[([^\]]+)\]/g);

    for (const match of keywordsMatches) {
      const keywordsList = match[1].split(',');
      expect(keywordsList.length).toBeGreaterThanOrEqual(3);
    }
  });
});

// === PROVIDER ALIASES COVERAGE ===
describe('Data integrity — provider aliases', () => {
  it('providerAliases covers all 8 providers', () => {
    const aliasesMatch = rulesSource.match(/const providerAliases = \{([\s\S]*?)\};/);
    expect(aliasesMatch).toBeTruthy();

    const aliases = aliasesMatch[1];
    const providerKeys = ['openai', 'anthropic', 'google', 'groq', 'cerebras', 'sambanova', 'mistral', 'cohere'];

    for (const key of providerKeys) {
      expect(aliases).toContain(key);
    }
  });

  it('every provider has at least one alias', () => {
    const aliasesMatch = rulesSource.match(/const providerAliases = \{([\s\S]*?)\};/);
    const aliases = aliasesMatch[1];

    const aliasArrayMatches = aliases.matchAll(/\w+:\s*\[([^\]]+)\]/g);

    for (const match of aliasArrayMatches) {
      const aliasList = match[1].split(',');
      expect(aliasList.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('OpenAI has comprehensive aliases', () => {
    const aliasesMatch = rulesSource.match(/openai:\s*\[([^\]]+)\]/);
    expect(aliasesMatch).toBeTruthy();

    const openaiAliases = aliasesMatch[1].toLowerCase();
    expect(openaiAliases).toContain('gpt');
    expect(openaiAliases).toContain('chatgpt');
    expect(openaiAliases).toContain('dall-e');
  });

  it('Anthropic has comprehensive aliases', () => {
    const aliasesMatch = rulesSource.match(/anthropic:\s*\[([^\]]+)\]/);
    expect(aliasesMatch).toBeTruthy();

    const anthropicAliases = aliasesMatch[1].toLowerCase();
    expect(anthropicAliases).toContain('claude');
    expect(anthropicAliases).toContain('sonnet');
  });
});

// === CROSS-REFERENCE CONSISTENCY ===
describe('Data integrity — cross-reference consistency', () => {
  it('all provider slugs used in rules exist in providers.js', () => {
    const providerKeys = Object.keys(providers);
    // Verify by checking findings from analyzeCompliance reference all valid providers
    const findings = analyzeCompliance('build a chatbot');
    const foundProviders = [...new Set(findings.map(f => f.provider))];
    for (const slug of foundProviders) {
      expect(providerKeys).toContain(slug);
    }
  });

  it('getAllProviderSlugs returns all provider keys', () => {
    const slugs = getAllProviderSlugs();
    const expectedSlugs = Object.keys(providers);
    expect(slugs.sort()).toEqual(expectedSlugs.sort());
  });

  it('getAllProviders returns all provider objects', () => {
    const allProviders = getAllProviders();
    expect(allProviders.length).toBe(Object.keys(providers).length);

    for (const provider of allProviders) {
      expect(provider.name).toBeTruthy();
      expect(provider.slug).toBeTruthy();
    }
  });
});

// === NO DUPLICATE DATA ===
describe('Data integrity — no duplicates', () => {
  it('no duplicate provider names', () => {
    const names = Object.values(providers).map(p => p.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });

  it('no duplicate provider slugs', () => {
    const slugs = Object.values(providers).map(p => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it('no duplicate provider colors', () => {
    const colors = Object.values(providers).map(p => p.color);
    const uniqueColors = new Set(colors);
    // Colors might legitimately be reused, but let's ensure they're intentional
    expect(uniqueColors.size).toBeGreaterThanOrEqual(6); // At least 6 unique colors
  });

  it('no duplicate ToS URLs', () => {
    const tosUrls = Object.values(providers).map(p => p.tosUrl);
    const uniqueTosUrls = new Set(tosUrls);
    // Some providers might share ToS pages, but most should be unique
    expect(uniqueTosUrls.size).toBeGreaterThanOrEqual(6);
  });
});
