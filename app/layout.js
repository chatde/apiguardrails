import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'API Guardrails — AI API Terms of Service Compliance Checker',
  description: 'Free tool to check if your AI API usage complies with provider Terms of Service. Covers OpenAI, Anthropic, Google, Groq, and more.',
  keywords: ['AI', 'API', 'terms of service', 'compliance', 'OpenAI', 'Anthropic', 'guardrails', 'ToS checker'],
  openGraph: {
    title: 'API Guardrails — AI API ToS Compliance Checker',
    description: 'Check if your AI API usage complies with provider Terms of Service. Free, instant, no signup.',
    url: 'https://apiguardrails.com',
    siteName: 'API Guardrails',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'API Guardrails — AI API ToS Compliance Checker',
    description: 'Check if your AI API usage complies with provider Terms of Service. Free, instant, no signup.',
  },
  alternates: {
    canonical: 'https://apiguardrails.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-border py-8 mt-20">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted text-sm">
            <p>&copy; {new Date().getFullYear()} API Guardrails. Not legal advice.</p>
            <div className="flex items-center gap-4">
              <a href="/about" className="hover:text-text-secondary transition-colors">About</a>
              <span className="text-border">|</span>
              <a href="https://tokenshrink.com" target="_blank" rel="noopener noreferrer" className="hover:text-text-secondary transition-colors">
                TokenShrink
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
