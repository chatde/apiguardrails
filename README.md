# API Guardrails

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Free](https://img.shields.io/badge/Price-Free%20Forever-brightgreen)](https://apiguardrails.com)

**Know what's allowed before you build.**

[apiguardrails.com](https://apiguardrails.com) | [Providers](https://apiguardrails.com/providers) | [About](https://apiguardrails.com/about)

---

API Guardrails checks if your AI API usage complies with provider Terms of Service. Describe what you're building, and get an instant compliance report — green (allowed), yellow (gray area), or red (likely prohibited).

No signup. No data collection. Everything runs client-side.

## Before / After

**You type:**
> "I want to accept user API keys to call OpenAI on their behalf"

**You get:**
> RED — OpenAI prohibits third-party key usage and sublicensing API access. See [Terms of Use §2(c)](https://openai.com/policies/terms-of-use).

## Provider Coverage

| Provider | Models | ToS Last Verified |
|----------|--------|-------------------|
| OpenAI | GPT-4, GPT-4o, DALL-E, Whisper | 2025-12-09 |
| Anthropic | Claude 4.5, Claude 4, Sonnet, Haiku | 2025-10-16 |
| Google | Gemini 2.5, Gemini 2.0 Flash, Gemma | 2025-06-12 |
| Groq | Llama, Mixtral, Gemma (LPU inference) | 2025-03-15 |
| Cerebras | Llama (wafer-scale inference) | 2025-01-20 |
| SambaNova | Llama, DeepSeek (RDU inference) | 2025-02-01 |
| Mistral | Mistral Large, Medium, Codestral | 2025-04-01 |
| Cohere | Command R+, Embed, Rerank | 2025-03-01 |

## Rule Categories

The engine checks against 16 common use-case patterns:

- BYOK (bring your own key) / key proxying
- Reselling / sublicensing API access
- SaaS with your own key
- Free tier for commercial use
- Training competing models
- High-stakes applications (medical, legal, financial)
- Harmful content generation
- Circumventing safety systems
- Chatbot / conversational AI
- RAG (retrieval-augmented generation)
- Code generation
- Content writing
- Image generation
- Data analysis
- Translation
- Surveillance / monitoring
- Education

## How it works

1. You describe your use case in plain English
2. The client-side rules engine pattern-matches against known ToS rules
3. Each matched rule returns a verdict: **allowed**, **warning**, or **prohibited**
4. Results link to the specific ToS sections for verification

No AI calls. No server processing. Pure regex pattern matching against a curated rules database.

## Running locally

```bash
git clone https://github.com/chatde/apiguardrails.git
cd apiguardrails
npm install
npm run dev    # http://localhost:3000
```

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Engine**: Client-side JavaScript — no database, no auth, no API keys needed
- **Deployment**: Vercel

## Important disclaimer

This tool provides **informational guidance** based on publicly available Terms of Service documents. It is **not legal advice**. Terms of Service change frequently — always verify with the provider's current documentation before making business decisions.

## Updating rules

The rules database lives in two files:

- `app/lib/rules.js` — Pattern matching rules and verdicts
- `app/lib/providers.js` — Provider data, ToS links, and allowed/prohibited lists

If you spot an outdated rule or incorrect information, [open an issue](https://github.com/chatde/apiguardrails/issues) or submit a PR.

## Related

- [TokenShrink](https://tokenshrink.com) — Free AI prompt compression. Same AI, fewer tokens.

## Built by

Made by [Wattson](https://github.com/chatde). Contributions welcome.

## License

[MIT](LICENSE)
