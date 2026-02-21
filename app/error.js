'use client';

export default function Error({ reset }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-3xl font-bold mb-3">Something Went Wrong</h1>
      <p className="text-text-secondary mb-8">
        An unexpected error occurred. This shouldn&apos;t happen — try refreshing.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-bright transition-colors text-sm"
      >
        Try Again
      </button>
    </div>
  );
}
