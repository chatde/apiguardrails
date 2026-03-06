# CLAUDE.md — API Guardrails

## What This Is

AI API compliance checker — tells developers whether their use case complies with a given AI provider's Terms of Service. Ships as both a Next.js 16 web app (apiguardrails.com) and a standalone zero-dependency npm SDK (`api-guardrails@1.0.0`).

## Tech Stack

- **Framework**: Next.js 16 App Router, React 19, JavaScript (jsconfig.json, no TypeScript)
- **Testing**: Vitest 4, 197 tests across 8 files in `tests/`
- **Styling**: Tailwind 4
- **SDK**: `/sdk/src/` — standalone zero-dependency ES modules npm package
- **Providers covered**: OpenAI, Anthropic, Google, Groq, Cerebras, SambaNova, Mistral, Cohere
- **Hosting**: Vercel at apiguardrails.com
- **GitHub**: chatde/apiguardrails (SSH protocol)
- **Node**: /opt/homebrew/bin/node

## Key Paths

```
app/                    # Next.js App Router (pages, components)
app/components/         # ComplianceChecker, ProviderCard, Bumper, etc.
app/lib/                # Proxies to SDK (providers.js, rules.js) — edit SDK, not app/lib
sdk/src/                # npm SDK source (index.js, providers.js, rules.js)
sdk/src/rules.js        # Main rules engine (28KB, 16+ use-case patterns) — read thoroughly before touching
sdk/src/providers.js    # 8 provider definitions
tests/                  # 8 Vitest test files (197 tests)
vitest.config.js        # Test config (includes @ path alias)
```

## Development Workflow

```bash
npm run dev              # Next.js dev server
npm run build            # Production build (catches all errors)
npm run lint             # ESLint
npm test                 # Run 197 Vitest tests (8 files)

# Deploy
git push origin main     # Triggers Vercel auto-deploy
```

## Project-Specific Rules

- **No console.log in production code.**
- **SDK is standalone**: Zero dependencies, ES modules — never add npm deps to `sdk/src/`.
- **App lib proxies SDK**: `app/lib/providers.js` and `app/lib/rules.js` re-export from SDK. Edit the SDK source, not the app/lib proxies.
- **rules.js is the core**: 28KB rules engine — read it thoroughly before modifying. The `worstVerdict()` function had a bug previously — test verdict logic carefully after any change.
- **Path alias**: `@/*` maps to project root.
- **No TypeScript in this repo**: JavaScript + jsconfig.json. Do not add TypeScript.
- **Git**: SSH protocol (chatde on GitHub). Deploy by pushing to main — Vercel auto-deploys.
