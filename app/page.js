import ComplianceChecker from './components/ComplianceChecker';
import ProviderCard from './components/ProviderCard';
import Bumper from './components/Bumper';
import { getAllProviders } from './lib/providers';

export default function HomePage() {
  const allProviders = getAllProviders();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-20 relative min-h-[60vh] flex flex-col items-center justify-center">
        {/* Grid background */}
        <div className="grid-bg absolute inset-[-48px]" />
        {/* Scan line animation */}
        <div className="scan-line" />

        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[160px] pointer-events-none animate-glow" />
        <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative">
          {/* Eyebrow */}
          <p className="text-cyan text-xs tracking-[0.3em] uppercase font-mono mb-6 animate-fade-in">
            ◈ AI Compliance Intelligence
          </p>

          {/* Shield */}
          <div className="flex justify-center mb-8">
            <div className="animate-shield-pulse rounded-full">
              <Bumper size={80} className="animate-float" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-5 leading-[1.05]">
            Know Before<br />
            <span className="text-primary">You Build</span>
          </h1>

          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Describe what you&apos;re building and we&apos;ll instantly check compliance with AI provider
            Terms of Service. Free, instant, no signup required.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 text-sm font-mono border border-border rounded-xl px-8 py-4 bg-bg-card/50 backdrop-blur-sm w-fit mx-auto">
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">10+</div>
              <div className="text-text-muted text-xs mt-0.5">Providers</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">&lt;2s</div>
              <div className="text-text-muted text-xs mt-0.5">Analysis</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">Free</div>
              <div className="text-text-muted text-xs mt-0.5">Forever</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">Open</div>
              <div className="text-text-muted text-xs mt-0.5">Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Checker */}
      <section className="mb-24">
        <ComplianceChecker />
      </section>

      {/* Provider Coverage */}
      <section className="mb-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <div className="text-center">
            <p className="text-xs font-mono text-cyan tracking-[0.2em] uppercase mb-1">Coverage Matrix</p>
            <h2 className="text-xl font-bold">Provider Intelligence</h2>
          </div>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProviders.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-border" />
          <div className="text-center">
            <p className="text-xs font-mono text-cyan tracking-[0.2em] uppercase mb-1">Process</p>
            <h2 className="text-xl font-bold">How It Works</h2>
          </div>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Connecting line (hidden on mobile) */}
          <div className="hidden sm:block absolute top-8 left-[33%] right-[33%] h-px bg-border" />

          {[
            { num: '01', title: 'Describe Your Use Case', body: "Tell us what you're building — mention the provider, how you'll use the API, and whether it's commercial." },
            { num: '02', title: 'Get Instant Analysis', body: "Our rules engine checks your description against known ToS patterns across all major AI providers." },
            { num: '03', title: 'Read the Fine Print', body: "Each finding links to the specific ToS section so you can verify and make informed decisions." },
          ].map((step) => (
            <div key={step.num} className="bg-bg-card border border-border rounded-xl p-6 relative overflow-hidden group hover:border-border-hover transition-colors">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-[100%]" />
              <div className="text-4xl font-extrabold text-primary/15 mb-4 font-mono leading-none">{step.num}</div>
              <h3 className="font-semibold mb-2 text-text">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 border border-border/50 rounded-full px-5 py-2.5 bg-bg-card/30">
          <span className="text-warning text-xs">⚠</span>
          <p className="text-text-muted text-xs">
            Informational guidance only, based on publicly available Terms of Service.{' '}
            <strong className="text-text-secondary">Not legal advice.</strong>{' '}
            Always read the full provider terms before building.
          </p>
        </div>
      </section>
    </div>
  );
}
