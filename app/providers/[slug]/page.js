import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProvider, getAllProviderSlugs } from '../../lib/providers';

export function generateStaticParams() {
  return getAllProviderSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const provider = getProvider(slug);
  if (!provider) return {};
  return {
    title: `${provider.name} ToS Analysis — API Guardrails`,
    description: `Detailed Terms of Service breakdown for ${provider.name}. What's allowed and what's prohibited.`,
  };
}

export default async function ProviderPage({ params }) {
  const { slug } = await params;
  const provider = getProvider(slug);
  if (!provider) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link href="/providers" className="hover:text-text-secondary transition-colors">Providers</Link>
        <span>/</span>
        <span className="text-text-secondary">{provider.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: provider.color }}
        />
        <div>
          <h1 className="text-3xl font-bold">{provider.name}</h1>
          <p className="text-text-secondary">{provider.description}</p>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 mb-8">
        <a
          href={provider.tosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-bg-card border border-border rounded-lg px-4 py-2 hover:border-primary text-text-secondary hover:text-primary transition-colors"
        >
          Terms of Service &rarr;
        </a>
        {provider.usagePolicyUrl && provider.usagePolicyUrl !== provider.tosUrl && (
          <a
            href={provider.usagePolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-bg-card border border-border rounded-lg px-4 py-2 hover:border-primary text-text-secondary hover:text-primary transition-colors"
          >
            Usage Policy &rarr;
          </a>
        )}
      </div>

      {/* Allowed */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-success">✓</span> What&apos;s Allowed
        </h2>
        <div className="bg-success/5 border border-success/20 rounded-xl p-5">
          <ul className="space-y-2">
            {provider.allowed.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-success mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prohibited */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-danger">✗</span> What&apos;s Prohibited
        </h2>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5">
          <ul className="space-y-2">
            {provider.prohibited.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-danger mt-0.5">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Key ToS Points */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Key ToS Sections</h2>
        <div className="space-y-3">
          {provider.keyTosPoints.map((point, i) => (
            <div key={i} className="bg-bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm font-mono text-primary">{point.section}</span>
                <a
                  href={point.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-muted hover:text-primary transition-colors"
                >
                  View &rarr;
                </a>
              </div>
              <p className="text-text-secondary text-sm">{point.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Last Updated */}
      <div className="text-text-muted text-sm text-center pt-4 border-t border-border">
        Last updated: {provider.lastUpdated} —
        <Link href="/" className="text-primary hover:underline ml-1">
          Check your compliance &rarr;
        </Link>
      </div>
    </div>
  );
}
