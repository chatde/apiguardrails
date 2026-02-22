# api-guardrails

[![npm version](https://img.shields.io/npm/v/api-guardrails.svg)](https://www.npmjs.com/package/api-guardrails)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](package.json)

**AI API Terms of Service compliance checker — know what's allowed before you build.**

Check if your AI API usage complies with provider Terms of Service. Pure JavaScript, zero dependencies, works in Node.js and the browser.

[Website](https://apiguardrails.com) | [GitHub](https://github.com/chatde/apiguardrails)

## Install

```bash
npm install api-guardrails
```

## Quick Start

```js
import { analyzeCompliance, groupByProvider, overallSummary } from 'api-guardrails';

// Describe your use case in plain English
const findings = analyzeCompliance('I want to accept user API keys to proxy OpenAI requests');

// Get overall verdict
const summary = overallSummary(findings);
console.log(summary.verdict);  // 'prohibited'
console.log(summary.message);  // 'This usage pattern likely violates terms for 8 providers.'

// Group by provider for detailed view
const grouped = groupByProvider(findings);
for (const [provider, results] of Object.entries(grouped)) {
  console.log(`${provider}: ${results[0].verdict} — ${results[0].reason}`);
}
```

## API

### `analyzeCompliance(description: string): Finding[]`

Analyzes a plain-English description against all compliance rules.

- Matches keywords against 16 rule categories
- Detects mentioned providers (e.g. "OpenAI", "Claude", "GPT-4") and filters results
- If no providers are mentioned, returns results for all 8 providers

Returns an array of findings:

```js
{
  ruleId: 'byok',           // Rule category ID
  provider: 'openai',       // Provider key
  verdict: 'prohibited',    // 'allowed' or 'prohibited'
  reason: '...',            // Human-readable explanation
  tosSection: 'Section 2(c)' // Relevant ToS section
}
```

### `groupByProvider(findings: Finding[]): Record<string, Finding[]>`

Groups findings by provider key for display.

### `worstVerdict(providerFindings: Finding[]): string`

Returns `'prohibited'` if any finding is prohibited, otherwise `'allowed'`.

### `overallSummary(findings: Finding[]): Summary`

Returns an overall verdict with a human-readable message:

```js
{
  verdict: 'prohibited' | 'allowed' | 'unknown',
  message: '...'
}
```

### `providers: Record<string, Provider>`

The full provider data object with ToS URLs, allowed/prohibited lists, and key ToS points.

### `getProvider(slug: string): Provider | null`

Get a single provider by slug (e.g. `'openai'`, `'anthropic'`).

### `getAllProviders(): Provider[]`

Get all providers as an array.

### `getAllProviderSlugs(): string[]`

Get all provider slug strings.

## Rule Categories

The engine checks against 16 use-case patterns:

| ID | Category | Common Verdict |
|----|----------|----------------|
| `byok` | BYOK / key proxying | Prohibited (all) |
| `resell` | Reselling / sublicensing | Prohibited (all) |
| `saas-own-key` | SaaS with own key | Allowed (all) |
| `free-commercial` | Free tier for production | Mixed |
| `train-competing` | Training competing models | Mixed |
| `high-stakes` | Medical/legal/financial automation | Prohibited (all) |
| `harmful-content` | Weapons, malware, CSAM | Prohibited (all) |
| `circumvent` | Bypassing limits/safety | Prohibited (all) |
| `chatbot` | Chatbots and assistants | Allowed (all) |
| `rag` | RAG and embeddings | Allowed (all) |
| `code-gen` | Code generation | Allowed (all) |
| `content-writing` | Blog posts, marketing | Allowed (all) |
| `image-gen` | Image generation | Allowed (all) |
| `data-analysis` | Summarization and analysis | Allowed (all) |
| `translation` | Translation and i18n | Allowed (all) |
| `surveillance` | Mass surveillance | Prohibited (all) |
| `education` | Tutoring and e-learning | Allowed (all) |

## Providers

| Provider | Slug | ToS Last Verified |
|----------|------|-------------------|
| OpenAI | `openai` | 2025-12-09 |
| Anthropic | `anthropic` | 2025-10-16 |
| Google (Gemini) | `google` | 2025-06-12 |
| Groq | `groq` | 2025-03-15 |
| Cerebras | `cerebras` | 2025-01-20 |
| SambaNova | `sambanova` | 2025-02-01 |
| Mistral | `mistral` | 2025-04-01 |
| Cohere | `cohere` | 2025-03-01 |

## Disclaimer

This package provides **informational guidance** based on publicly available Terms of Service documents. It is **not legal advice**. Terms of Service change frequently — always verify with the provider's current documentation before making business decisions.

## License

[MIT](LICENSE)
