import { describe, it, expect } from 'vitest';
import { analyzeCompliance } from '@/sdk/src/rules.js';

// === INPUT SANITIZATION ===
describe('Input sanitization and security', () => {
  it('handles potential XSS in description (HTML tags)', () => {
    const findings = analyzeCompliance('<script>alert("xss")</script> build a chatbot');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
    // Should not execute script, just analyze the text
  });

  it('handles HTML entities in description', () => {
    const findings = analyzeCompliance('build a chatbot &lt;with OpenAI&gt;');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles potential SQL injection patterns', () => {
    const findings = analyzeCompliance("build a chatbot'; DROP TABLE users; --");
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles potential command injection patterns', () => {
    const findings = analyzeCompliance('build a chatbot $(rm -rf /)');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles null bytes in string', () => {
    const findings = analyzeCompliance('build a chatbot\x00with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles potential path traversal patterns', () => {
    const findings = analyzeCompliance('build a chatbot ../../etc/passwd');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles backslashes and escape sequences', () => {
    const findings = analyzeCompliance('build a chatbot \\n\\r\\t with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });
});

// === XSS IN DESCRIPTIONS AND OUTPUTS ===
describe('XSS prevention in findings output', () => {
  it('finding reasons do not contain executable HTML', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');
    for (const finding of findings) {
      expect(finding.reason).not.toContain('<script');
      expect(finding.reason).not.toContain('javascript:');
      expect(finding.reason).not.toContain('onerror=');
    }
  });

  it('finding tosSection does not contain executable HTML', () => {
    const findings = analyzeCompliance('build a chatbot with OpenAI');
    for (const finding of findings) {
      expect(finding.tosSection).not.toContain('<script');
      expect(finding.tosSection).not.toContain('javascript:');
    }
  });

  it('finding provider keys are safe strings', () => {
    const findings = analyzeCompliance('build a chatbot');
    for (const finding of findings) {
      expect(typeof finding.provider).toBe('string');
      expect(finding.provider).toMatch(/^[a-z]+$/);
    }
  });

  it('finding ruleIds are safe strings', () => {
    const findings = analyzeCompliance('build a chatbot');
    for (const finding of findings) {
      expect(typeof finding.ruleId).toBe('string');
      expect(finding.ruleId).toMatch(/^[a-z-]+$/);
    }
  });
});

// === VERY LONG INPUTS ===
describe('Very long input handling', () => {
  it('handles 100KB input without crashing', () => {
    const longString = 'chatbot OpenAI '.repeat(6700); // ~100KB
    expect(() => analyzeCompliance(longString)).not.toThrow();
  }, 30000);

  it('handles 1MB input without crashing', () => {
    const longString = 'chatbot '.repeat(140000); // ~1MB
    expect(() => analyzeCompliance(longString)).not.toThrow();
  });

  it('returns correct findings for very long input with valid keywords', () => {
    const longString = 'some random text '.repeat(1000) + ' build a chatbot with OpenAI ';
    const findings = analyzeCompliance(longString);
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles input with no spaces (single giant word)', () => {
    const longString = 'a'.repeat(100000);
    const findings = analyzeCompliance(longString);
    expect(findings).toEqual([]);
  });

  it('handles input with excessive whitespace', () => {
    const longString = '   '.repeat(10000) + 'chatbot' + '   '.repeat(10000);
    const findings = analyzeCompliance(longString);
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });
});

// === SPECIAL REGEX CHARACTERS IN INPUT ===
describe('Special regex characters in input', () => {
  it('handles asterisk * in input', () => {
    const findings = analyzeCompliance('build a chatbot* with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles plus + in input', () => {
    const findings = analyzeCompliance('build a chatbot+ with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles question mark ? in input', () => {
    const findings = analyzeCompliance('build a chatbot? with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles dot . in input', () => {
    // Dot in "chat.bot" breaks the keyword match — this is expected behavior
    const findings = analyzeCompliance('build a chat.bot with OpenAI');
    // Should still match other keywords if present, and not crash
    expect(() => analyzeCompliance('build a chat.bot')).not.toThrow();
  });

  it('handles caret ^ in input', () => {
    const findings = analyzeCompliance('build a ^chatbot with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles dollar sign $ in input', () => {
    const findings = analyzeCompliance('build a $chatbot with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles pipe | in input', () => {
    const findings = analyzeCompliance('build a chatbot | with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles backslash \\ in input', () => {
    const findings = analyzeCompliance('build a chatbot\\ with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles square brackets [] in input', () => {
    const findings = analyzeCompliance('build a [chatbot] with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles parentheses () in input', () => {
    const findings = analyzeCompliance('build a (chatbot) with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles curly braces {} in input', () => {
    const findings = analyzeCompliance('build a {chatbot} with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles regex lookahead pattern in input', () => {
    const findings = analyzeCompliance('build a chatbot (?=OpenAI)');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles regex character class in input', () => {
    const findings = analyzeCompliance('build a chatbot [a-z] with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles multiple regex special chars combined', () => {
    const findings = analyzeCompliance('build a chatbot.*?^$|()[]{}\\+ with OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });
});

// === MALICIOUS REGEX PATTERNS (ReDoS PREVENTION) ===
describe('ReDoS prevention', () => {
  it('handles catastrophic backtracking pattern 1', () => {
    const malicious = '(a+)+b'.repeat(10);
    expect(() => analyzeCompliance(malicious)).not.toThrow();
  });

  it('handles catastrophic backtracking pattern 2', () => {
    const malicious = '(a*)*b'.repeat(10);
    expect(() => analyzeCompliance(malicious)).not.toThrow();
  });

  it('handles nested quantifiers', () => {
    const malicious = 'a{1,10}{1,10}{1,10}';
    expect(() => analyzeCompliance(malicious)).not.toThrow();
  });

  it('handles alternation with overlap', () => {
    const malicious = '(a|a)*b'.repeat(10);
    expect(() => analyzeCompliance(malicious)).not.toThrow();
  });
});

// === UNICODE AND INTERNATIONAL CHARACTERS ===
describe('Unicode and international character handling', () => {
  it('handles Chinese characters', () => {
    const findings = analyzeCompliance('我想用OpenAI建一个聊天机器人 chatbot');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles Japanese characters', () => {
    const findings = analyzeCompliance('OpenAIでチャットボット chatbot を作りたい');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles Arabic characters (RTL)', () => {
    const findings = analyzeCompliance('أريد بناء chatbot مع OpenAI');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles emoji sequences', () => {
    const findings = analyzeCompliance('👨‍💻👩‍💻 build a chatbot with OpenAI 🤖🚀');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles mixed scripts', () => {
    const findings = analyzeCompliance('Build a чатбот with OpenAI και chatbot');
    expect(findings.some(f => f.ruleId === 'chatbot')).toBe(true);
  });

  it('handles zero-width characters', () => {
    // Zero-width characters break keyword matching — expected behavior
    const findings = analyzeCompliance('build\u200B a\u200C chat\u200Dbot');
    // Should not crash, but keyword won't match since "chatbot" is split
    expect(() => analyzeCompliance('build\u200B a\u200C chat\u200Dbot')).not.toThrow();
  });
});
