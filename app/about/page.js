import Link from 'next/link';

export const metadata = {
  title: 'About — API Guardrails',
  description: 'Why API Guardrails exists and how it helps developers stay compliant with AI API Terms of Service.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About API Guardrails</h1>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Why This Exists</h2>
          <p>
            AI APIs have become the backbone of modern software, but most developers don&apos;t
            read the Terms of Service. The result? Accidental violations that can get your
            account suspended, your product shut down, or worse.
          </p>
          <p className="mt-3">
            API Guardrails is a free tool that makes ToS compliance simple. Describe what
            you&apos;re building, and we&apos;ll tell you if it&apos;s within bounds — with
            links to the exact sections that apply.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">How It Works</h2>
          <p>
            Everything runs client-side. Your description is analyzed against a curated rules
            database of known ToS patterns — no data is sent to any server. The rules are
            based on publicly available Terms of Service documents from each provider.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">What This Is Not</h2>
          <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
            <p className="text-warning font-medium mb-2">Not Legal Advice</p>
            <p className="text-sm">
              API Guardrails is an informational tool. It does not constitute legal advice and
              should not be relied upon as such. Terms of Service change frequently — always
              verify with the provider&apos;s current documentation before making business decisions.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Coverage</h2>
          <p>
            We currently cover 8 major AI API providers: OpenAI, Anthropic, Google (Gemini),
            Groq, Cerebras, SambaNova, Mistral, and Cohere. We update the rules database
            regularly as providers update their terms.
          </p>
          <p className="mt-3">
            <Link href="/providers" className="text-primary hover:underline">
              Browse all providers &rarr;
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Who Built This</h2>
          <p>
            API Guardrails is built by{' '}
            <a
              href="https://github.com/chatde"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Wattson
            </a>
            , the creator of{' '}
            <a
              href="https://tokenshrink.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              TokenShrink
            </a>
            , the free AI prompt compression tool.
            We believe in making AI development more accessible, affordable, and responsible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Found an Error?</h2>
          <p>
            Terms of Service change frequently. If you spot an outdated rule or incorrect
            information, we want to know.{' '}
            <a
              href="https://github.com/chatde"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Open an issue on GitHub
            </a>{' '}
            and we&apos;ll update it.
          </p>
        </section>
      </div>
    </div>
  );
}
