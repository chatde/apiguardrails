// Basic usage of the api-guardrails SDK
// Run: node examples/basic-usage.mjs

import { analyzeCompliance, groupByProvider, overallSummary, getAllProviderSlugs } from '../sdk/src/index.js';

// 1. Analyze a use case
console.log('=== Analyzing: "accept user API keys to proxy OpenAI requests" ===\n');

const findings = analyzeCompliance('accept user API keys to proxy OpenAI requests');
console.log(`Found ${findings.length} finding(s)\n`);

// 2. Group by provider
const grouped = groupByProvider(findings);
for (const [provider, results] of Object.entries(grouped)) {
  for (const r of results) {
    console.log(`  [${r.verdict.toUpperCase()}] ${provider} — ${r.reason} (${r.tosSection})`);
  }
}

// 3. Overall summary
const summary = overallSummary(findings);
console.log(`\nVerdict: ${summary.verdict}`);
console.log(`Message: ${summary.message}`);

// 4. Try an allowed use case
console.log('\n=== Analyzing: "build a chatbot with my own OpenAI key" ===\n');

const allowed = analyzeCompliance('build a chatbot with my own OpenAI key');
const allowedSummary = overallSummary(allowed);
console.log(`Verdict: ${allowedSummary.verdict}`);
console.log(`Message: ${allowedSummary.message}`);

// 5. List all providers
console.log(`\nSupported providers: ${getAllProviderSlugs().join(', ')}`);
