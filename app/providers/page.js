import ProviderCard from '../components/ProviderCard';
import { getAllProviders } from '../lib/providers';

export const metadata = {
  title: 'AI API Providers — API Guardrails',
  description: 'Detailed Terms of Service breakdown for OpenAI, Anthropic, Google, Groq, Cerebras, SambaNova, Mistral, and Cohere.',
};

export default function ProvidersPage() {
  const allProviders = getAllProviders();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">AI API Providers</h1>
      <p className="text-text-secondary mb-8">
        Detailed Terms of Service breakdown for each provider. Click a provider to see
        what&apos;s allowed, what&apos;s prohibited, and the gray areas.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProviders.map((provider) => (
          <ProviderCard key={provider.slug} provider={provider} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-text-muted text-sm">
          Not sure what&apos;s allowed for your specific use case?{' '}
          <a href="/" className="text-primary hover:underline">
            Try the compliance checker &rarr;
          </a>
        </p>
      </div>
    </div>
  );
}
