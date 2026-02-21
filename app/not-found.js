import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">🛡️</div>
      <h1 className="text-3xl font-bold mb-3">404 — Page Not Found</h1>
      <p className="text-text-secondary mb-8">
        This page doesn&apos;t exist. Maybe the URL changed, or maybe it never existed.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-bright transition-colors text-sm"
        >
          Back to Home
        </Link>
        <Link
          href="/providers"
          className="px-6 py-2.5 border border-border text-text-secondary rounded-lg hover:border-primary hover:text-primary-bright transition-colors text-sm"
        >
          Browse Providers
        </Link>
      </div>
    </div>
  );
}
