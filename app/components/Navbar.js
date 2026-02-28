'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <span className="text-primary text-xl">🛡️</span>
          <span>API Guardrails</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <Link href="/" className="text-text-muted hover:text-text transition-colors">
            Checker
          </Link>
          <Link href="/providers" className="text-text-muted hover:text-text transition-colors">
            Providers
          </Link>
          <Link href="/about" className="text-text-muted hover:text-text transition-colors">
            About
          </Link>
          <a
            href="https://github.com/chatde/apiguardrails"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-text-muted hover:text-text p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-border bg-bg/95 backdrop-blur-md px-4 py-3 flex flex-col gap-3 animate-fade-in">
          <Link href="/" className="text-text-muted hover:text-text transition-colors" onClick={() => setMenuOpen(false)}>
            Checker
          </Link>
          <Link href="/providers" className="text-text-muted hover:text-text transition-colors" onClick={() => setMenuOpen(false)}>
            Providers
          </Link>
          <Link href="/about" className="text-text-muted hover:text-text transition-colors" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
