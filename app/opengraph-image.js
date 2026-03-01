import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'API Guardrails — AI API ToS Compliance Checker';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            fontSize: 72,
          }}
        >
          🛡️
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#f8fafc',
            letterSpacing: '-0.02em',
            display: 'flex',
          }}
        >
          <span style={{ color: '#3b82f6' }}>API</span>
          <span style={{ marginLeft: 16 }}>Guardrails</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            marginTop: 16,
            display: 'flex',
          }}
        >
          AI API Terms of Service Compliance Checker
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#4b6a9b',
            marginTop: 12,
            display: 'flex',
          }}
        >
          Free • Instant • No Signup
        </div>
      </div>
    ),
    { ...size }
  );
}
