export const providers = {
  openai: {
    name: 'OpenAI',
    slug: 'openai',
    description: 'GPT-4, GPT-4o, DALL-E, Whisper, and more',
    tosUrl: 'https://openai.com/policies/terms-of-use',
    usagePolicyUrl: 'https://openai.com/policies/usage-policies',
    lastUpdated: '2025-12-09',
    color: '#10a37f',
    allowed: [
      'Building applications using your own API key',
      'Commercial SaaS products powered by OpenAI APIs',
      'Internal business tools and automation',
      'Research and educational projects',
      'Content generation with proper disclosure',
    ],
    prohibited: [
      'Accepting or using end-user API keys (BYOK/key proxying)',
      'Reselling, sublicensing, or redistributing API access',
      'Generating content that violates usage policies (weapons, CSAM, etc.)',
      'Misrepresenting AI-generated content as human-created where disclosure is required',
      'Using outputs to train competing models without permission',
      'Circumventing rate limits or safety systems',
    ],
    keyTosPoints: [
      { section: 'Section 2(c)', summary: 'You may not sublicense, resell, or make the API available to third parties as a standalone service', link: 'https://openai.com/policies/terms-of-use' },
      { section: 'Usage Policies', summary: 'Detailed list of prohibited content categories and use cases', link: 'https://openai.com/policies/usage-policies' },
      { section: 'Section 3(a)', summary: 'You own your output, but must comply with all policies', link: 'https://openai.com/policies/terms-of-use' },
    ],
  },

  anthropic: {
    name: 'Anthropic',
    slug: 'anthropic',
    description: 'Claude 4.5, Claude 4, Claude 3.5 Sonnet, and Haiku',
    tosUrl: 'https://www.anthropic.com/legal/terms',
    usagePolicyUrl: 'https://www.anthropic.com/legal/aup',
    lastUpdated: '2025-10-16',
    color: '#d4a574',
    allowed: [
      'Building applications using your own API key',
      'Commercial products and SaaS platforms',
      'Research, education, and internal tools',
      'Content generation with responsible use',
      'Integrating Claude into your product workflow',
    ],
    prohibited: [
      'Accepting or proxying end-user API keys',
      'Reselling or sublicensing API access',
      'Generating harmful, deceptive, or illegal content',
      'Using outputs to train competing AI models',
      'Attempting to extract model weights or architecture details',
      'Circumventing safety features or usage limits',
      'Automated decision-making in high-stakes domains without human oversight',
    ],
    keyTosPoints: [
      { section: 'Acceptable Use Policy', summary: 'Comprehensive list of prohibited and restricted uses', link: 'https://www.anthropic.com/legal/aup' },
      { section: 'API Terms §2', summary: 'License restrictions — no sublicensing, reselling, or making available as standalone', link: 'https://www.anthropic.com/legal/terms' },
      { section: 'API Terms §4', summary: 'Output ownership and usage rights', link: 'https://www.anthropic.com/legal/terms' },
    ],
  },

  google: {
    name: 'Google (Gemini)',
    slug: 'google',
    description: 'Gemini 2.5, Gemini 2.0 Flash, Gemma, and more',
    tosUrl: 'https://ai.google.dev/gemini-api/terms',
    usagePolicyUrl: 'https://policies.google.com/terms/generative-ai/use-policy',
    lastUpdated: '2025-06-12',
    color: '#4285f4',
    allowed: [
      'Building applications with your own API key',
      'Commercial and production use',
      'Research and prototyping',
      'Multi-modal applications (text, image, video, audio)',
      'Free tier for development and low-volume use',
    ],
    prohibited: [
      'Generating harmful, illegal, or deceptive content',
      'Using the API to train competing foundation models',
      'Circumventing safety filters or rate limits',
      'Creating deepfakes or non-consensual intimate imagery',
      'Automated weapons systems or surveillance',
    ],
    keyTosPoints: [
      { section: 'Gemini API Terms', summary: 'API-specific terms covering usage, restrictions, and data handling', link: 'https://ai.google.dev/gemini-api/terms' },
      { section: 'Generative AI Use Policy', summary: 'Prohibited uses across all Google generative AI products', link: 'https://policies.google.com/terms/generative-ai/use-policy' },
    ],
  },

  groq: {
    name: 'Groq',
    slug: 'groq',
    description: 'Ultra-fast LPU inference — Llama, Mixtral, Gemma models',
    tosUrl: 'https://groq.com/terms-of-use/',
    usagePolicyUrl: 'https://groq.com/terms-of-use/',
    lastUpdated: '2025-03-15',
    color: '#f55036',
    allowed: [
      'Building applications with your own API key',
      'Commercial products using Groq for inference',
      'Development and prototyping on free tier',
      'Integrating Groq inference into your pipeline',
    ],
    prohibited: [
      'Sublicensing or reselling API access',
      'Using the service to avoid paying applicable fees',
      'Generating content that violates their acceptable use policy',
      'Reverse engineering or attempting to extract model weights',
      'Automated scraping of API responses at scale',
    ],
    keyTosPoints: [
      { section: 'Terms of Use §3', summary: 'License grant — personal, non-exclusive, non-transferable, revocable', link: 'https://groq.com/terms-of-use/' },
      { section: 'Terms of Use §5', summary: 'Prohibited conduct including avoiding fees and sublicensing', link: 'https://groq.com/terms-of-use/' },
    ],
  },

  cerebras: {
    name: 'Cerebras',
    slug: 'cerebras',
    description: 'Wafer-scale inference — Llama models at extreme speed',
    tosUrl: 'https://cerebras.ai/terms-of-service',
    usagePolicyUrl: 'https://cerebras.ai/terms-of-service',
    lastUpdated: '2025-01-20',
    color: '#ff6b00',
    allowed: [
      'Development and testing with free tier',
      'Building AI applications with proper API key usage',
      'Research and educational applications',
    ],
    prohibited: [
      'Sublicensing, reselling, or redistributing access',
      'Service bureau use (processing data for third parties as a service)',
      'Reverse engineering the platform',
      'Generating illegal, harmful, or deceptive content',
      'Circumventing usage limits or security measures',
    ],
    keyTosPoints: [
      { section: 'Terms §1', summary: 'Free tier license is non-exclusive, non-transferable, freely revocable', link: 'https://cerebras.ai/terms-of-service' },
      { section: 'Terms §4', summary: 'Explicitly prohibits service bureau and third-party data processing', link: 'https://cerebras.ai/terms-of-service' },
    ],
  },

  sambanova: {
    name: 'SambaNova',
    slug: 'sambanova',
    description: 'RDU-powered inference — Llama, DeepSeek models',
    tosUrl: 'https://sambanova.ai/legal',
    usagePolicyUrl: 'https://sambanova.ai/legal',
    lastUpdated: '2025-02-01',
    color: '#7c3aed',
    allowed: [
      'Development and evaluation on free tier',
      'Building AI applications with your own API key',
      'Research and prototyping',
    ],
    prohibited: [
      'Service bureau use — explicitly prohibited',
      'Sublicensing, reselling, or making available to third parties',
      'Commercial production use on free Community tier',
      'Generating harmful, illegal, or deceptive content',
      'Circumventing rate limits or security measures',
      'Competing with SambaNova using their platform',
    ],
    keyTosPoints: [
      { section: 'Community Terms §2', summary: 'Free tier is for evaluation only — explicitly prohibits service bureau and commercial production', link: 'https://sambanova.ai/legal' },
      { section: 'Community Terms §5', summary: 'SambaNova may modify, suspend, or terminate access at any time', link: 'https://sambanova.ai/legal' },
    ],
  },

  mistral: {
    name: 'Mistral',
    slug: 'mistral',
    description: 'Mistral Large, Medium, Small, Codestral, and open models',
    tosUrl: 'https://mistral.ai/terms/',
    usagePolicyUrl: 'https://mistral.ai/terms/',
    lastUpdated: '2025-04-01',
    color: '#ff7000',
    allowed: [
      'Building applications with your own API key',
      'Commercial products and SaaS platforms',
      'Research, education, and prototyping',
      'Self-hosting open-weight models (Apache 2.0 licensed ones)',
      'Fine-tuning via the platform',
    ],
    prohibited: [
      'Sublicensing or reselling API access',
      'Generating illegal, harmful, or deceptive content',
      'Circumventing safety systems or rate limits',
      'Using the platform for unauthorized surveillance',
      'Extracting model weights from API-only models',
    ],
    keyTosPoints: [
      { section: 'Terms of Service §3', summary: 'License restrictions and permitted uses', link: 'https://mistral.ai/terms/' },
      { section: 'Terms of Service §7', summary: 'Acceptable use and content restrictions', link: 'https://mistral.ai/terms/' },
    ],
  },

  cohere: {
    name: 'Cohere',
    slug: 'cohere',
    description: 'Command R+, Embed, Rerank — enterprise-focused AI',
    tosUrl: 'https://cohere.com/terms-of-use',
    usagePolicyUrl: 'https://cohere.com/terms-of-use',
    lastUpdated: '2025-03-01',
    color: '#39d98a',
    allowed: [
      'Building applications with your own API key',
      'Commercial products (on paid plans)',
      'Research and prototyping on trial tier',
      'Enterprise RAG and search applications',
      'Fine-tuning with your own data',
    ],
    prohibited: [
      'Sublicensing or reselling API access',
      'Using trial/free tier for production or commercial applications',
      'Generating harmful, illegal, or deceptive content',
      'Reverse engineering or extracting model weights',
      'Competing directly using Cohere infrastructure',
    ],
    keyTosPoints: [
      { section: 'Terms of Use §2', summary: 'Trial tier restrictions — evaluation purposes only', link: 'https://cohere.com/terms-of-use' },
      { section: 'Terms of Use §4', summary: 'Commercial use requires paid plan', link: 'https://cohere.com/terms-of-use' },
    ],
  },
};

export function getProvider(slug) {
  return providers[slug] || null;
}

export function getAllProviderSlugs() {
  return Object.keys(providers);
}

export function getAllProviders() {
  return Object.values(providers);
}
