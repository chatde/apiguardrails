'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-bg/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary text-xl">🛡️</span>
          <span>API Guardrails</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <Link href="/" className="text-text-secondary hover:text-text transition-colors">
            Checker
          </Link>
          <Link href="/providers" className="text-text-secondary hover:text-text transition-colors">
            Providers
          </Link>
          <Link href="/about" className="text-text-secondary hover:text-text transition-colors">
            About
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-text-secondary hover:text-text p-1"
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
        <div className="sm:hidden border-t border-border bg-bg px-4 py-3 flex flex-col gap-3 animate-fade-in">
          <Link href="/" className="text-text-secondary hover:text-text transition-colors" onClick={() => setMenuOpen(false)}>
            Checker
          </Link>
          <Link href="/providers" className="text-text-secondary hover:text-text transition-colors" onClick={() => setMenuOpen(false)}>
            Providers
          </Link>
          <Link href="/about" className="text-text-secondary hover:text-text transition-colors" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
