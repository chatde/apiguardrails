import { Syne, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import SmoothScroll from '../components/smooth-scroll';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://apiguardrails.com'),
  title: 'API Guardrails — AI Compliance & Agent Security Checker',
  description: 'Free tool to check AI API compliance and agent security risks. Covers autonomous agents, multi-agent systems, tool use, spend control, and ToS for OpenAI, Anthropic, Google, Groq, and more.',
  keywords: ['AI', 'API', 'terms of service', 'compliance', 'AI agent', 'agent security', 'autonomous agent', 'multi-agent', 'OpenAI', 'Anthropic', 'guardrails', 'MCP', 'agentic AI'],
  openGraph: {
    title: 'API Guardrails — AI Compliance & Agent Security',
    description: 'Check AI API compliance and agent security risks instantly. Autonomous agents, multi-agent systems, tool use, spend control. Free, no signup.',
    url: 'https://apiguardrails.com',
    siteName: 'API Guardrails',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Guardrails — AI Compliance & Agent Security',
    description: 'Check AI API compliance and agent security risks instantly. Autonomous agents, multi-agent systems, tool use, spend control. Free.',
  },
  alternates: {
    canonical: 'https://apiguardrails.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${geistMono.variable}`}>
      <body className="min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-black focus:rounded">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "API Guardrails",
              "url": "https://apiguardrails.com",
              "applicationCategory": "DeveloperApplication",
              "description": "Free tool to check if your AI API usage complies with provider Terms of Service.",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "operatingSystem": "Web"
            })
          }}
        />
        <SmoothScroll>
        <Navbar />
        <main id="main-content">{children}</main>
        <footer className="border-t border-border py-10 mt-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <span className="text-primary">🛡️</span>
                <span>&copy; {new Date().getFullYear()} API Guardrails</span>
                <span className="text-border">·</span>
                <span>Not legal advice</span>
              </div>
              <div className="flex items-center gap-5 text-sm text-text-muted">
                <a href="/about" className="hover:text-text transition-colors">About</a>
                <a href="/privacy" className="hover:text-text transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-text transition-colors">Terms</a>
                <a href="https://github.com/chatde/apiguardrails" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                  GitHub
                </a>
                <a href="https://tokenshrink.com" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                  TokenShrink
                </a>
                <a href="https://chatde.dev" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                  chatde.dev
                </a>
              </div>
            </div>
          </div>
        </footer>
        </SmoothScroll>
      </body>
    </html>
  );
}
