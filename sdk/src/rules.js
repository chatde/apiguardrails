const rules = [
  // === KEY PROXYING / BYOK ===
  {
    id: 'byok',
    keywords: ['accept.*api.?key', 'user.*api.?key', 'customer.*api.?key', 'byok', 'bring your own key', 'their.?key', 'end.?user.*key', 'paste.*api.?key', 'enter.*api.?key', 'user.?provided key', 'users.*keys', 'customer.*keys'],
    providers: {
      openai: { verdict: 'prohibited', reason: 'OpenAI prohibits third-party API key usage. You cannot accept, store, or proxy requests using end-user keys.', tosSection: 'Section 2(c)' },
      anthropic: { verdict: 'prohibited', reason: 'Anthropic prohibits accepting or proxying end-user API keys.', tosSection: 'API Terms §2' },
      google: { verdict: 'prohibited', reason: 'Sublicensing restrictions likely prohibit BYOK patterns.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'prohibited', reason: 'Groq prohibits sublicensing or making their service available through your application using customer keys.', tosSection: 'Terms §5' },
      cerebras: { verdict: 'prohibited', reason: 'Cerebras prohibits service bureau use and sublicensing.', tosSection: 'Terms §4' },
      sambanova: { verdict: 'prohibited', reason: 'SambaNova explicitly prohibits service bureau use and third-party access.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'prohibited', reason: 'Mistral prohibits sublicensing API access.', tosSection: 'Terms §3' },
      cohere: { verdict: 'prohibited', reason: 'Cohere prohibits sublicensing or reselling API access.', tosSection: 'Terms §2' },
    },
  },

  // === RESELLING / PROXYING ===
  {
    id: 'resell',
    keywords: ['resell', 'resale', 'sublicen[sc]e', 'proxy', 'relay', 'pass.?through', 'white.?label.*api', 'rebrand.*api', 'api.?gateway.*third', 'middleman', 'wholesale', 'redistribute'],
    providers: {
      openai: { verdict: 'prohibited', reason: 'Reselling, sublicensing, or redistributing API access is explicitly prohibited.', tosSection: 'Section 2(c)' },
      anthropic: { verdict: 'prohibited', reason: 'Sublicensing or reselling API access violates terms.', tosSection: 'API Terms §2' },
      google: { verdict: 'prohibited', reason: 'Redistributing API access as a standalone service is prohibited.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'prohibited', reason: 'Sublicensing and reselling are explicitly prohibited.', tosSection: 'Terms §5' },
      cerebras: { verdict: 'prohibited', reason: 'Sublicensing, reselling, and service bureau use are all prohibited.', tosSection: 'Terms §4' },
      sambanova: { verdict: 'prohibited', reason: 'Sublicensing and making available to third parties is prohibited.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'prohibited', reason: 'Sublicensing or reselling API access is prohibited.', tosSection: 'Terms §3' },
      cohere: { verdict: 'prohibited', reason: 'Sublicensing or reselling is prohibited.', tosSection: 'Terms §2' },
    },
  },

  // === LEGITIMATE SAAS / OWN KEY ===
  {
    id: 'saas-own-key',
    keywords: ['(?:my|our|own)\\s+(?:api\\s+)?key', 'saas', '(?:my|our)\\s+(?:\\w+\\s+)?app\\b', '(?:my|our)\\s+(?:\\w+\\s+)?application', '(?:my|our)\\s+(?:\\w+\\s+)?product', '(?:my|our)\\s+(?:\\w+\\s+)?platform', '(?:my|our)\\s+(?:\\w+\\s+)?tool', 'build.*(?:app|product|tool|platform)', 'power.*product', 'integrate.*into', '(?:my|our)\\s+startup', '(?:my|our)\\s+service', '(?:my|our)\\s+project', '(?:my|our)\\s+company'],
    providers: {
      openai: { verdict: 'allowed', reason: 'Building applications using your own API key is the intended use case.', tosSection: 'Section 2(a)' },
      anthropic: { verdict: 'allowed', reason: 'Using your own API key to build products is allowed and encouraged.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Building applications with your own key is the standard use case.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'allowed', reason: 'Integrating Groq inference into your application is allowed.', tosSection: 'Terms §3' },
      cerebras: { verdict: 'allowed', reason: 'Building applications with your key is allowed, though the free tier license is revocable.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'allowed', reason: 'Allowed on paid plans. Free tier is evaluation only.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Building products with your own key is the intended use.', tosSection: 'Terms §3' },
      cohere: { verdict: 'allowed', reason: 'Allowed on paid plans. Trial tier is for evaluation only.', tosSection: 'Terms §2' },
    },
  },

  // === FREE TIER COMMERCIAL USE ===
  {
    id: 'free-commercial',
    keywords: ['free\\s+tier.*commercial', 'commercial.*free', 'free.*production', 'production.*free', 'free.*paid.*product', 'monetiz.*free', 'free\\s+api.*business', 'free.*plan.*launch', 'free.*tier.*startup'],
    providers: {
      openai: { verdict: 'allowed', reason: 'OpenAI allows commercial use on all tiers, subject to rate limits.', tosSection: 'Section 2(a)' },
      anthropic: { verdict: 'allowed', reason: 'Anthropic allows commercial use on all tiers, subject to rate limits.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Google allows commercial use on the free tier, but limits may be restrictive.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'prohibited', reason: 'Groq prohibits "avoiding fees" — commercial use on free tier risks violation.', tosSection: 'Terms §5' },
      cerebras: { verdict: 'prohibited', reason: 'Free tier license is "freely revocable" — not safe for production.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'prohibited', reason: 'SambaNova explicitly prohibits commercial/production use on the free Community tier.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Check your specific plan terms for commercial use details.', tosSection: 'Terms §3' },
      cohere: { verdict: 'prohibited', reason: 'Trial tier is explicitly for evaluation only, not commercial use.', tosSection: 'Terms §2' },
    },
  },

  // === TRAINING COMPETING MODELS ===
  {
    id: 'train-competing',
    keywords: ['train.*competing.*model', 'train.*rival.*model', 'fine.?tune.*competing', 'distill.*model', 'extract.*knowledge.*model', 'train.*competitor', 'build.*own.*model.*(?:from|using)', 'replicate.*model', 'clone.*model', 'copy.*their.*model'],
    providers: {
      openai: { verdict: 'prohibited', reason: 'Using outputs to train models that compete with OpenAI is prohibited.', tosSection: 'Usage Policies' },
      anthropic: { verdict: 'prohibited', reason: 'Using outputs to train competing AI models is prohibited.', tosSection: 'API Terms §4' },
      google: { verdict: 'prohibited', reason: 'Using outputs to train competing foundation models is prohibited.', tosSection: 'Generative AI Use Policy' },
      groq: { verdict: 'allowed', reason: 'Groq hosts open-source models — check the specific model license for training rights.', tosSection: 'Terms §5' },
      cerebras: { verdict: 'allowed', reason: 'Models hosted are open-source, but check specific model licenses.', tosSection: 'Terms §4' },
      sambanova: { verdict: 'prohibited', reason: 'Competing with SambaNova using their platform is prohibited.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Open-weight models may allow this — check the specific model license.', tosSection: 'Terms §3' },
      cohere: { verdict: 'prohibited', reason: 'Using Cohere infrastructure to compete with Cohere is prohibited.', tosSection: 'Terms §4' },
    },
  },

  // === HIGH-STAKES / AUTOMATED DECISIONS ===
  {
    id: 'high-stakes',
    keywords: ['medical.*diagnos', 'legal.*advice', 'hiring.*decision', 'loan.*approv', 'credit.*scor', 'criminal.*justice', 'automat.*decision.*(?:making|system)', 'life.*death', 'autonomous.*weapon', 'healthcare.*decision', 'insurance.*claim'],
    providers: {
      openai: { verdict: 'prohibited', reason: 'Fully automated decisions in critical domains without human oversight are prohibited.', tosSection: 'Usage Policies' },
      anthropic: { verdict: 'prohibited', reason: 'Automated decision-making in high-stakes domains without human oversight is prohibited.', tosSection: 'Acceptable Use Policy' },
      google: { verdict: 'prohibited', reason: 'Autonomous weapons and unsupervised high-stakes decisions are prohibited.', tosSection: 'Generative AI Use Policy' },
      groq: { verdict: 'prohibited', reason: 'High-stakes automated decisions likely violate acceptable use policy.', tosSection: 'Terms §5' },
      cerebras: { verdict: 'prohibited', reason: 'Review their acceptable use policy for high-stakes restrictions.', tosSection: 'Acceptable Use Policy' },
      sambanova: { verdict: 'prohibited', reason: 'Review their acceptable use policy for high-stakes restrictions.', tosSection: 'Acceptable Use Policy' },
      mistral: { verdict: 'prohibited', reason: 'Safety-critical automated decisions require review with Mistral.', tosSection: 'Terms §7' },
      cohere: { verdict: 'prohibited', reason: 'High-stakes automated decisions should be discussed with Cohere directly.', tosSection: 'Terms §4' },
    },
  },

  // === CONTENT GENERATION (HARMFUL) ===
  {
    id: 'harmful-content',
    keywords: ['generat.*(?:weapon|bomb|drug|malware|exploit|hack)', 'deepfake', 'non.?consensual.*intima', 'csam', 'child.*exploit', 'terroris', 'violence.*content', 'hate.*speech'],
    providers: {
      openai: { verdict: 'prohibited', reason: 'Generating weapons instructions, malware, CSAM, or other harmful content is strictly prohibited.', tosSection: 'Usage Policies' },
      anthropic: { verdict: 'prohibited', reason: 'Generating harmful, illegal, or dangerous content is strictly prohibited.', tosSection: 'Acceptable Use Policy' },
      google: { verdict: 'prohibited', reason: 'Generating harmful or illegal content is prohibited across all Google AI products.', tosSection: 'Generative AI Use Policy' },
      groq: { verdict: 'prohibited', reason: 'Harmful content generation violates acceptable use policy.', tosSection: 'Terms §5' },
      cerebras: { verdict: 'prohibited', reason: 'Generating illegal or harmful content is prohibited.', tosSection: 'Acceptable Use Policy' },
      sambanova: { verdict: 'prohibited', reason: 'Generating harmful content is prohibited.', tosSection: 'Acceptable Use Policy' },
      mistral: { verdict: 'prohibited', reason: 'Generating illegal or harmful content is prohibited.', tosSection: 'Terms §7' },
      cohere: { verdict: 'prohibited', reason: 'Generating harmful or illegal content is prohibited.', tosSection: 'Terms §4' },
    },
  },

  // === SCRAPING / RATE LIMIT CIRCUMVENTION ===
  {
    id: 'circumvent',
    keywords: ['bypass.*(?:rate|limit|safety|filter)', 'circumvent', 'jailbreak', 'prompt.*inject', 'scrape.*api', 'automat.*mass.*request', 'evade.*detection', 'unlimited.*request', 'abuse.*api'],
    providers: {
      openai: { verdict: 'prohibited', reason: 'Circumventing rate limits, safety systems, or filters is explicitly prohibited.', tosSection: 'Usage Policies' },
      anthropic: { verdict: 'prohibited', reason: 'Circumventing safety features or usage limits is prohibited.', tosSection: 'Acceptable Use Policy' },
      google: { verdict: 'prohibited', reason: 'Circumventing safety filters or rate limits is prohibited.', tosSection: 'Generative AI Use Policy' },
      groq: { verdict: 'prohibited', reason: 'Automated scraping and circumventing limits is prohibited.', tosSection: 'Terms §5' },
      cerebras: { verdict: 'prohibited', reason: 'Circumventing usage limits or security measures is prohibited.', tosSection: 'Terms §4' },
      sambanova: { verdict: 'prohibited', reason: 'Circumventing rate limits or security is prohibited.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'prohibited', reason: 'Circumventing safety systems or rate limits is prohibited.', tosSection: 'Terms §7' },
      cohere: { verdict: 'prohibited', reason: 'Reverse engineering or circumventing limits is prohibited.', tosSection: 'Terms §4' },
    },
  },

  // === CHATBOT / ASSISTANT (STANDARD USE) ===
  {
    id: 'chatbot',
    keywords: ['chatbot', 'chat\\s*bot', 'virtual.*assistant', 'customer.*support.*(?:bot|ai)', 'help.*desk.*ai', 'conversational.*ai', 'ai.*assistant', 'support.*ticket', 'chat.*widget'],
    providers: {
      openai: { verdict: 'allowed', reason: 'Building chatbots and AI assistants is a core use case.', tosSection: 'Section 2(a)' },
      anthropic: { verdict: 'allowed', reason: 'Claude is designed for conversational AI and assistant use cases.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Gemini supports chatbot and assistant applications.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'allowed', reason: 'Fast inference makes Groq ideal for chatbot applications.', tosSection: 'Terms §3' },
      cerebras: { verdict: 'allowed', reason: 'Chatbot use is allowed with your own API key.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'allowed', reason: 'Allowed on paid plans. Free tier is evaluation only.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Building chatbots with Mistral models is a standard use case.', tosSection: 'Terms §3' },
      cohere: { verdict: 'allowed', reason: 'Cohere supports chat and assistant applications on paid plans.', tosSection: 'Terms §2' },
    },
  },

  // === RAG / SEARCH / EMBEDDINGS ===
  {
    id: 'rag',
    keywords: ['\\brag\\b', 'retrieval.*augment', 'embedding', 'vector.*search', 'semantic.*search', 'knowledge.*base', 'document.*search', 'index.*documents'],
    providers: {
      openai: { verdict: 'allowed', reason: 'RAG and embeddings are core use cases for OpenAI.', tosSection: 'Section 2(a)' },
      anthropic: { verdict: 'allowed', reason: 'RAG with Claude is a supported and encouraged use case.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Google offers embedding models and supports RAG workflows.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'allowed', reason: 'Using Groq for RAG inference is a standard use case.', tosSection: 'Terms §3' },
      cerebras: { verdict: 'allowed', reason: 'RAG applications are a supported use case.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'allowed', reason: 'Allowed on paid plans. Free tier is evaluation only.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Mistral offers embedding models and supports RAG.', tosSection: 'Terms §3' },
      cohere: { verdict: 'allowed', reason: 'Cohere specializes in RAG with Embed and Rerank. Paid plan required for production.', tosSection: 'Terms §2' },
    },
  },

  // === CODE GENERATION / COPILOT ===
  {
    id: 'code-gen',
    keywords: ['code.*generat', 'copilot', 'code.*complet', 'code.*assist', 'programming.*assist', 'ide.*integrat', 'code.*review', 'auto.*complet', 'developer.*tool'],
    providers: {
      openai: { verdict: 'allowed', reason: 'Code generation and developer tools are core use cases.', tosSection: 'Section 2(a)' },
      anthropic: { verdict: 'allowed', reason: 'Claude is widely used for code generation and developer assistance.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Gemini supports code generation and developer tools.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'allowed', reason: 'Fast inference is ideal for code completion tools.', tosSection: 'Terms §3' },
      cerebras: { verdict: 'allowed', reason: 'Code generation is a supported use case.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'allowed', reason: 'Allowed on paid plans. Free tier is evaluation only.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Codestral and other models support code generation.', tosSection: 'Terms §3' },
      cohere: { verdict: 'allowed', reason: 'Code generation is supported on paid plans.', tosSection: 'Terms §2' },
    },
  },

  // === CONTENT WRITING / MARKETING ===
  {
    id: 'content-writing',
    keywords: ['content.*writ', 'blog.*post', 'marketing.*copy', 'email.*generat', 'social.*media.*post', 'article.*writ', 'copywriting', 'seo.*content', 'product.*description', 'newsletter'],
    providers: {
      openai: { verdict: 'allowed', reason: 'Content generation is a standard use case. Disclosure may be required in some contexts.', tosSection: 'Section 2(a)' },
      anthropic: { verdict: 'allowed', reason: 'Content writing with Claude is allowed with responsible use.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Content generation is supported across Gemini models.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'allowed', reason: 'Content generation using hosted models is allowed.', tosSection: 'Terms §3' },
      cerebras: { verdict: 'allowed', reason: 'Content generation is a supported use case.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'allowed', reason: 'Allowed on paid plans. Free tier is evaluation only.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Content writing is a standard use case.', tosSection: 'Terms §3' },
      cohere: { verdict: 'allowed', reason: 'Content generation is supported on paid plans.', tosSection: 'Terms §2' },
    },
  },

  // === IMAGE GENERATION ===
  {
    id: 'image-gen',
    keywords: ['image.*generat', 'dall.?e', 'generate.*image', 'ai.*art', 'text.*to.*image', 'stable.*diffusion.*api', 'picture.*generat', 'avatar.*generat', 'logo.*generat'],
    providers: {
      openai: { verdict: 'allowed', reason: 'DALL-E image generation is a core product. Follow content policies.', tosSection: 'Usage Policies' },
      anthropic: { verdict: 'allowed', reason: 'Claude supports image understanding. Generation is via third-party tools.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Gemini supports image generation. Follow content policies.', tosSection: 'Generative AI Use Policy' },
      groq: { verdict: 'allowed', reason: 'Groq focuses on text inference. Image generation would use other APIs.', tosSection: 'Terms §3' },
      cerebras: { verdict: 'allowed', reason: 'Cerebras focuses on text inference.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'allowed', reason: 'SambaNova focuses on text inference.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Mistral focuses on text models. Image generation is via other tools.', tosSection: 'Terms §3' },
      cohere: { verdict: 'allowed', reason: 'Cohere focuses on text and embeddings.', tosSection: 'Terms §2' },
    },
  },

  // === DATA ANALYSIS / SUMMARIZATION ===
  {
    id: 'data-analysis',
    keywords: ['summar', 'analyz.*data', 'data.*analys', 'report.*generat', 'insight', 'extract.*info', 'parse.*document', 'pdf.*extract', 'spreadsheet', 'dashboard.*ai'],
    providers: {
      openai: { verdict: 'allowed', reason: 'Data analysis and summarization are core use cases.', tosSection: 'Section 2(a)' },
      anthropic: { verdict: 'allowed', reason: 'Claude excels at analysis, summarization, and data processing.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Gemini supports data analysis and document processing.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'allowed', reason: 'Fast inference is ideal for data processing tasks.', tosSection: 'Terms §3' },
      cerebras: { verdict: 'allowed', reason: 'Data analysis is a supported use case.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'allowed', reason: 'Allowed on paid plans. Free tier is evaluation only.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Data analysis and summarization are standard use cases.', tosSection: 'Terms §3' },
      cohere: { verdict: 'allowed', reason: 'Cohere supports summarization and analysis on paid plans.', tosSection: 'Terms §2' },
    },
  },

  // === TRANSLATION ===
  {
    id: 'translation',
    keywords: ['translat', 'localiz', 'multi.?lingual', 'language.*convert', 'i18n', 'internation'],
    providers: {
      openai: { verdict: 'allowed', reason: 'Translation is a standard use case for GPT models.', tosSection: 'Section 2(a)' },
      anthropic: { verdict: 'allowed', reason: 'Claude supports multilingual translation.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Gemini has strong multilingual capabilities.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'allowed', reason: 'Translation via hosted models is allowed.', tosSection: 'Terms §3' },
      cerebras: { verdict: 'allowed', reason: 'Translation is a supported use case.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'allowed', reason: 'Allowed on paid plans. Free tier is evaluation only.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Mistral models support translation tasks.', tosSection: 'Terms §3' },
      cohere: { verdict: 'allowed', reason: 'Multilingual support available on paid plans.', tosSection: 'Terms §2' },
    },
  },

  // === SURVEILLANCE / TRACKING ===
  {
    id: 'surveillance',
    keywords: ['surveil', 'track.*user', 'monitor.*employee', 'spy', 'facial.*recognition.*mass', 'social.*credit', 'citizen.*score'],
    providers: {
      openai: { verdict: 'prohibited', reason: 'Mass surveillance and unauthorized tracking is prohibited.', tosSection: 'Usage Policies' },
      anthropic: { verdict: 'prohibited', reason: 'Surveillance applications violate the acceptable use policy.', tosSection: 'Acceptable Use Policy' },
      google: { verdict: 'prohibited', reason: 'Surveillance and unauthorized tracking is prohibited.', tosSection: 'Generative AI Use Policy' },
      groq: { verdict: 'prohibited', reason: 'Surveillance use cases violate acceptable use policy.', tosSection: 'Terms §5' },
      cerebras: { verdict: 'prohibited', reason: 'Surveillance use is prohibited.', tosSection: 'Acceptable Use Policy' },
      sambanova: { verdict: 'prohibited', reason: 'Surveillance use is prohibited.', tosSection: 'Acceptable Use Policy' },
      mistral: { verdict: 'prohibited', reason: 'Unauthorized surveillance is explicitly prohibited.', tosSection: 'Terms §7' },
      cohere: { verdict: 'prohibited', reason: 'Surveillance use cases are prohibited.', tosSection: 'Terms §4' },
    },
  },

  // === EDUCATION / TUTORING ===
  {
    id: 'education',
    keywords: ['tutor', 'education', 'learn.*platform', 'student', 'homework', 'teach', 'course.*content', 'quiz.*generat', 'study.*aid', 'e.?learning'],
    providers: {
      openai: { verdict: 'allowed', reason: 'Educational applications are a supported use case.', tosSection: 'Section 2(a)' },
      anthropic: { verdict: 'allowed', reason: 'Educational tools and tutoring are encouraged use cases.', tosSection: 'API Terms §1' },
      google: { verdict: 'allowed', reason: 'Educational applications are supported.', tosSection: 'Gemini API Terms' },
      groq: { verdict: 'allowed', reason: 'Educational tools are a standard use case.', tosSection: 'Terms §3' },
      cerebras: { verdict: 'allowed', reason: 'Educational applications are supported.', tosSection: 'Terms §1' },
      sambanova: { verdict: 'allowed', reason: 'Allowed on paid plans. Free tier is evaluation only.', tosSection: 'Community Terms §2' },
      mistral: { verdict: 'allowed', reason: 'Education and research are supported use cases.', tosSection: 'Terms §3' },
      cohere: { verdict: 'allowed', reason: 'Educational applications are supported on paid plans.', tosSection: 'Terms §2' },
    },
  },
];

// Provider name aliases for fuzzy matching
const providerAliases = {
  openai: ['openai', 'open ai', 'gpt', 'gpt-4', 'gpt4', 'gpt-4o', 'chatgpt', 'dall-e', 'dalle', 'whisper', 'o1', 'o3'],
  anthropic: ['anthropic', 'claude', 'sonnet', 'haiku', 'opus'],
  google: ['google', 'gemini', 'gemma', 'bard', 'palm', 'vertex'],
  groq: ['groq'],
  cerebras: ['cerebras'],
  sambanova: ['sambanova', 'samba nova'],
  mistral: ['mistral', 'mixtral', 'codestral'],
  cohere: ['cohere', 'command r', 'command-r', 'rerank'],
};

/**
 * Detect which providers the user is asking about.
 */
function detectProviders(text) {
  const lower = text.toLowerCase();
  const detected = new Set();

  for (const [provider, aliases] of Object.entries(providerAliases)) {
    for (const alias of aliases) {
      if (lower.includes(alias)) {
        detected.add(provider);
      }
    }
  }

  return detected;
}

/**
 * Analyze a user description against all rules.
 * Now handles free-form input by:
 * 1. Matching specific rules when keywords are found
 * 2. Detecting which providers are mentioned
 * 3. Filtering results to mentioned providers (or showing all if none specified)
 * 4. Providing a general summary if no specific rules match
 */
export function analyzeCompliance(description) {
  if (!description || typeof description !== 'string' || description.trim().length < 3) return [];

  const text = description.toLowerCase();
  const findings = [];
  const mentionedProviders = detectProviders(text);

  for (const rule of rules) {
    const matched = rule.keywords.some((kw) => {
      try {
        const regex = new RegExp(kw, 'i');
        return regex.test(text);
      } catch {
        return text.includes(kw.toLowerCase());
      }
    });

    if (matched) {
      for (const [providerKey, result] of Object.entries(rule.providers)) {
        // If user mentioned specific providers, only show those
        if (mentionedProviders.size > 0 && !mentionedProviders.has(providerKey)) continue;

        findings.push({
          ruleId: rule.id,
          provider: providerKey,
          verdict: result.verdict,
          reason: result.reason,
          tosSection: result.tosSection,
        });
      }
    }
  }

  return findings;
}

/**
 * Group findings by provider.
 */
export function groupByProvider(findings) {
  const grouped = {};
  for (const f of findings) {
    if (!grouped[f.provider]) grouped[f.provider] = [];
    grouped[f.provider].push(f);
  }
  return grouped;
}

/**
 * Get the worst verdict for a provider from its findings.
 */
export function worstVerdict(providerFindings) {
  if (providerFindings.some((f) => f.verdict === 'prohibited')) return 'prohibited';
  return 'allowed';
}

/**
 * Get a summary verdict across all providers.
 */
export function overallSummary(findings) {
  if (findings.length === 0) {
    return {
      verdict: 'unknown',
      message: 'No matching patterns found. Try being more specific — mention the provider name (e.g. "OpenAI", "Claude"), what you\'re building (e.g. "chatbot", "SaaS"), and how you\'ll use the API (e.g. "my own key", "user API keys").',
    };
  }

  const prohibited = findings.filter((f) => f.verdict === 'prohibited');
  const allowed = findings.filter((f) => f.verdict === 'allowed');

  if (prohibited.length > 0) {
    const providers = [...new Set(prohibited.map((f) => f.provider))];
    return {
      verdict: 'prohibited',
      message: `This usage pattern likely violates terms for ${providers.length} provider${providers.length > 1 ? 's' : ''}.`,
    };
  }

  return {
    verdict: 'allowed',
    message: 'This usage pattern appears to be allowed by all providers analyzed.',
  };
}
