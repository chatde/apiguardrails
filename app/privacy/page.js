export const metadata = {
  title: 'Privacy Policy — API Guardrails',
  description: 'Privacy Policy for API Guardrails — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-text-muted text-sm mb-10">Last updated: March 1, 2026</p>

      <div className="space-y-8 text-text-secondary">
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Overview</h2>
          <p>
            API Guardrails (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website
            apiguardrails.com and the api-guardrails npm package. This Privacy Policy explains how
            we collect, use, and protect information when you use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Data Collection</h2>
          <p>
            API Guardrails is designed with privacy in mind. Our compliance checker runs entirely
            client-side — your use case descriptions are analyzed in your browser and are never sent
            to our servers.
          </p>
          <p className="mt-3">We may collect the following information:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Standard web server logs (IP address, browser type, pages visited)</li>
            <li>Anonymous usage analytics to understand how the tool is used</li>
            <li>Information you voluntarily provide (e.g., bug reports, feedback)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">npm Package Usage</h2>
          <p>
            The api-guardrails npm package runs entirely on your machine. It does not phone home,
            collect telemetry, or transmit any data. All compliance checks are performed locally
            using the bundled rules database.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Cookies</h2>
          <p>
            We do not use tracking cookies. We may use essential cookies required for the website to
            function properly (e.g., theme preferences). Third-party analytics services may set their
            own cookies subject to their respective privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Third-Party Services</h2>
          <p>Our website may use the following third-party services:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Vercel — hosting and edge delivery</li>
            <li>GitHub — source code hosting and issue tracking</li>
          </ul>
          <p className="mt-2 text-sm">
            Each of these services has its own privacy policy governing how they handle data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Data Retention</h2>
          <p>
            Server logs are retained for up to 30 days for security and debugging purposes. We do
            not store your compliance check inputs — they exist only in your browser session.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of any personal data
            we may hold. Since our tool operates client-side, we typically hold no personal data
            beyond standard server logs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect personal
            information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Contact</h2>
          <p>
            If you have questions about this Privacy Policy, you can reach us through our{' '}
            <a
              href="https://github.com/chatde/apiguardrails"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub repository
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
