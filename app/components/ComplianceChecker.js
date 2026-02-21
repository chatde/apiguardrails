'use client';

import { useState } from 'react';
import { analyzeCompliance, groupByProvider, overallSummary } from '../lib/rules';
import ComplianceReport from './ComplianceReport';

const examples = [
  'I want to use OpenAI to power my SaaS chatbot',
  'I accept user API keys to call Anthropic',
  'I use Groq free tier for my commercial app',
  'Building a RAG system with my own API key',
  'I want to proxy OpenAI requests through my server',
];

export default function ComplianceChecker() {
  const [description, setDescription] = useState('');
  const [findings, setFindings] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function handleAnalyze() {
    if (!description.trim()) return;
    setIsAnalyzing(true);

    // Tiny delay for visual feedback
    setTimeout(() => {
      const results = analyzeCompliance(description);
      setFindings(results);
      setIsAnalyzing(false);
    }, 300);
  }

  function handleExample(text) {
    setDescription(text);
    setIsAnalyzing(true);
    setTimeout(() => {
      const results = analyzeCompliance(text);
      setFindings(results);
      setIsAnalyzing(false);
    }, 300);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleAnalyze();
    }
  }

  const summary = findings !== null ? overallSummary(findings) : null;
  const grouped = findings !== null ? groupByProvider(findings) : null;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-bg-card border border-border rounded-xl p-6">
        <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-2">
          Describe what you&apos;re building
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={'e.g., "I want to use OpenAI\'s API to power my SaaS chatbot" or "I accept user API keys to call Anthropic"'}
          rows={3}
          className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none font-sans text-sm"
        />

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleAnalyze}
            disabled={!description.trim() || isAnalyzing}
            className="bg-primary hover:bg-primary-bright text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Checking...
              </span>
            ) : (
              'Check Compliance'
            )}
          </button>

          <div className="flex items-center gap-3">
            {findings !== null && (
              <button
                onClick={() => { setFindings(null); setDescription(''); }}
                className="text-text-muted hover:text-text-secondary text-sm transition-colors"
              >
                Clear
              </button>
            )}
            <span className="text-xs text-text-muted hidden sm:inline">{'\u2318'}+Enter</span>
          </div>
        </div>

        {/* Example queries */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-muted mb-2">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => handleExample(ex)}
                className="text-xs bg-bg-secondary border border-border rounded-full px-3 py-1 text-text-secondary hover:border-primary hover:text-primary-bright transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {findings !== null && (
        <div className="mt-6 animate-slide-up">
          <ComplianceReport summary={summary} grouped={grouped} findings={findings} />
        </div>
      )}
    </div>
  );
}
