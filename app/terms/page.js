export const metadata = {
  title: 'Terms of Service — API Guardrails',
  description: 'Terms of Service for API Guardrails — usage terms for our website and npm package.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-text-muted text-sm mb-10">Last updated: March 1, 2026</p>

      <div className="space-y-8 text-text-secondary">
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using API Guardrails (the &quot;Service&quot;), including the website at
            apiguardrails.com and the api-guardrails npm package, you agree to be bound by these
            Terms of Service. If you do not agree, do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">2. Description of Service</h2>
          <p>
            API Guardrails is a free tool that helps developers check whether their AI API usage
            complies with provider Terms of Service. The Service includes a web-based compliance
            checker and an open-source npm package.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">3. Not Legal Advice</h2>
          <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
            <p>
              API Guardrails provides <strong className="text-text">informational guidance only</strong>.
              It does not constitute legal advice and should not be relied upon as such. Terms of
              Service change frequently — always verify with the provider&apos;s current
              documentation before making business decisions. We are not liable for any decisions
              made based on the output of this tool.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">4. Open Source License</h2>
          <p>
            The api-guardrails npm package is distributed under the MIT License. You are free to
            use, modify, and distribute the package in accordance with the terms of that license.
            The full license text is available in the project repository.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to disrupt or overload the Service infrastructure</li>
            <li>Scrape or harvest data from the website in an automated manner that degrades performance</li>
            <li>Misrepresent the output of the Service as legal advice to third parties</li>
            <li>Remove or alter any copyright or attribution notices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">6. Intellectual Property</h2>
          <p>
            The API Guardrails name, logo, website design, and curated rules database are the
            property of their respective owners. The open-source code is licensed under MIT. The
            rules database content is derived from publicly available Terms of Service documents
            and is provided for informational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">7. Limitation of Liability</h2>
          <p>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
            IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR
            USE OF THE SERVICE.
          </p>
          <p className="mt-3">
            This includes, without limitation, damages arising from reliance on compliance check
            results, loss of business, or account suspension by AI API providers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">8. Accuracy of Information</h2>
          <p>
            We make reasonable efforts to keep the rules database current, but AI provider Terms
            of Service change frequently. We do not guarantee that the information is complete,
            accurate, or up-to-date at all times.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">9. Termination</h2>
          <p>
            We reserve the right to restrict or terminate access to the Service at any time, for
            any reason, without notice. The npm package, once downloaded, will continue to function
            independently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">10. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes
            are posted constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-3">11. Contact</h2>
          <p>
            Questions about these Terms can be directed to us through our{' '}
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
