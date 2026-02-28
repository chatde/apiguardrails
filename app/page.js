import ComplianceChecker from './components/ComplianceChecker';
import ProviderCard from './components/ProviderCard';
import Bumper from './components/Bumper';
import { getAllProviders } from './lib/providers';

export default function HomePage() {
  const allProviders = getAllProviders();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16 relative">
        {/* Atmosphere — subtle blue glow */}
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative">
          <div className="flex justify-center mb-6">
            <Bumper size={80} className="animate-float" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-primary">AI API</span> Compliance Checker
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Describe what you&apos;re building and we&apos;ll check if it complies with provider Terms of Service.
            Free, instant, no signup required.
          </p>
        </div>
      </section>

      {/* Checker */}
      <section className="mb-20">
        <ComplianceChecker />
      </section>

      {/* Provider Grid */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-xl font-semibold text-text-secondary">Provider Coverage</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProviders.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-xl font-semibold text-text-secondary">How It Works</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-bg-card border border-border rounded-xl p-6 relative overflow-hidden group hover:border-border-hover transition-colors">
            <div className="text-3xl font-bold text-primary/20 mb-3 font-mono">01</div>
            <h3 className="font-semibold mb-2">Describe Your Use Case</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Tell us what you&apos;re building — mention the provider, how you&apos;ll use the API, and whether it&apos;s commercial.
            </p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-6 relative overflow-hidden group hover:border-border-hover transition-colors">
            <div className="text-3xl font-bold text-primary/20 mb-3 font-mono">02</div>
            <h3 className="font-semibold mb-2">Get Instant Analysis</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Our rules engine checks your description against known ToS patterns across all major AI providers.
            </p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-6 relative overflow-hidden group hover:border-border-hover transition-colors">
            <div className="text-3xl font-bold text-primary/20 mb-3 font-mono">03</div>
            <h3 className="font-semibold mb-2">Read the Fine Print</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Each finding links to the specific ToS section so you can verify and make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-16 text-center">
        <p className="text-text-muted text-sm max-w-xl mx-auto">
          This tool provides informational guidance based on publicly available Terms of Service.
          It is <strong className="text-text-secondary">not legal advice</strong>.
          Always read the full terms for each provider before building.
        </p>
      </section>
    </div>
  );
}
