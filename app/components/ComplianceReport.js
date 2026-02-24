'use client';

import { providers } from '../lib/providers';
import { worstVerdict } from '../lib/rules';
import Link from 'next/link';

const verdictConfig = {
  allowed: {
    label: 'Allowed',
    bg: 'bg-success/10',
    border: 'border-success/30',
    text: 'text-success',
    icon: '✓',
  },
  warning: {
    label: 'Gray Area',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-500',
    icon: '!',
  },
  prohibited: {
    label: 'Likely Prohibited',
    bg: 'bg-danger/10',
    border: 'border-danger/30',
    text: 'text-danger',
    icon: '✗',
  },
  unknown: {
    label: 'Unknown',
    bg: 'bg-bg-secondary',
    border: 'border-border',
    text: 'text-text-muted',
    icon: '?',
  },
};

function VerdictBadge({ verdict }) {
  const config = verdictConfig[verdict] || verdictConfig.unknown;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}

function SummaryBanner({ summary }) {
  const config = verdictConfig[summary.verdict] || verdictConfig.unknown;
  return (
    <div className={`${config.bg} border ${config.border} rounded-xl p-5 mb-6`}>
      <div className="flex items-start gap-3">
        <span className={`text-2xl ${config.text}`}>{config.icon === '✓' ? '🛡️' : config.icon === '!' ? '⚠️' : config.icon === '✗' ? '🚫' : '❓'}</span>
        <div>
          <h3 className={`font-semibold text-lg ${config.text}`}>
            {summary.verdict === 'allowed' && 'Looks Good'}
            {summary.verdict === 'warning' && 'Needs Review'}
            {summary.verdict === 'prohibited' && 'Potential Violation'}
            {summary.verdict === 'unknown' && 'No Matches Found'}
          </h3>
          <p className="text-text-secondary text-sm mt-1">{summary.message}</p>
        </div>
      </div>
    </div>
  );
}

export default function ComplianceReport({ summary, grouped, findings }) {
  if (!findings || findings.length === 0) {
    return (
      <div className="bg-bg-card border border-border rounded-xl p-6 text-center">
        <p className="text-text-muted text-lg mb-2">🤔</p>
        <p className="text-text-secondary text-sm">
          No matching patterns found. Try describing your use case in more detail — mention the provider, whether you&apos;re using your own key or accepting user keys, and whether it&apos;s for commercial use.
        </p>
      </div>
    );
  }

  const providerKeys = Object.keys(grouped).sort((a, b) => {
    const order = { prohibited: 0, warning: 1, allowed: 2 };
    return (order[worstVerdict(grouped[a])] ?? 3) - (order[worstVerdict(grouped[b])] ?? 3);
  });

  return (
    <div>
      <SummaryBanner summary={summary} />

      <div className="space-y-4">
        {providerKeys.map((key) => {
          const provider = providers[key];
          const providerFindings = grouped[key];
          const worst = worstVerdict(providerFindings);

          return (
            <div key={key} className="bg-bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: provider?.color || '#666' }}
                  />
                  <Link href={`/providers/${key}`} className="font-medium hover:text-primary transition-colors">
                    {provider?.name || key}
                  </Link>
                </div>
                <VerdictBadge verdict={worst} />
              </div>

              <div className="p-4 space-y-3">
                {providerFindings.map((f, i) => (
                  <div key={`${f.ruleId}-${i}`} className="flex items-start gap-2 text-sm">
                    <span className={`mt-0.5 ${verdictConfig[f.verdict]?.text || 'text-text-muted'}`}>
                      {verdictConfig[f.verdict]?.icon || '?'}
                    </span>
                    <div>
                      <p className="text-text-secondary">{f.reason}</p>
                      {f.tosSection && (
                        <p className="text-text-muted text-xs mt-1">
                          Reference: {f.tosSection}
                          {provider?.tosUrl && (
                            <>
                              {' — '}
                              <a href={provider.tosUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                View ToS
                              </a>
                            </>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-text-muted text-xs text-center mt-6">
        This is informational only, not legal advice. Always read the full Terms of Service for each provider. Last pattern update: Feb 2026.
      </p>
    </div>
  );
}
