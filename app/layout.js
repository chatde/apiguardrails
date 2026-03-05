import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://apiguardrails.com'),
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
    card: 'summary_large_image',
    title: 'API Guardrails — AI API ToS Compliance Checker',
    description: 'Check if your AI API usage complies with provider Terms of Service. Free, instant, no signup.',
  },
  alternates: {
    canonical: 'https://apiguardrails.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
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
      </body>
    </html>
  );
}
