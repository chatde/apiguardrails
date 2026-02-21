import Link from 'next/link';

export default function ProviderCard({ provider }) {
  const allowedCount = provider.allowed?.length || 0;
  const prohibitedCount = provider.prohibited?.length || 0;

  return (
    <Link
      href={`/providers/${provider.slug}`}
      className="block bg-bg-card border border-border rounded-xl p-5 hover:border-border-hover transition-colors group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: provider.color }}
        />
        <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
          {provider.name}
        </h3>
      </div>

      <p className="text-text-secondary text-sm mb-4">{provider.description}</p>

      <div className="flex items-center gap-3 text-xs">
        <span className="text-success">{allowedCount} allowed</span>
        <span className="text-text-muted">·</span>
        <span className="text-danger">{prohibitedCount} prohibited</span>
      </div>

      <p className="text-text-muted text-xs mt-3">
        Updated {provider.lastUpdated}
      </p>
    </Link>
  );
}
