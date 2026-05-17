import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeUrl } from '../security.js';

describe('Landing Page Security Infrastructure', () => {
  
  describe('HTML Escaping Engine (escapeHtml)', () => {
    it('should pass normal alphanumeric strings through untouched', () => {
      expect(escapeHtml('Hello World 123')).toBe('Hello World 123');
    });

    it('should handle falsy or nullish edge cases gracefully without throwing', () => {
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
    });

    it('should completely neutralize basic HTML injection characters', () => {
      expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
      expect(escapeHtml('heading & paragraphs')).toBe('heading &amp; paragraphs');
      expect(escapeHtml('attr="value"')).toBe('attr=&quot;value&quot;');
      expect(escapeHtml("single='quote'")).toBe('single=&#039;quote&#039;');
    });
  });

  describe('Protocol URL Sanitizer (sanitizeUrl)', () => {
    it('should allow legitimate relative and absolute hyperlinks', () => {
      expect(sanitizeUrl('./math-worksheets/')).toBe('./math-worksheets/');
      expect(sanitizeUrl('https://github.com/yourusername')).toBe('https://github.com/yourusername');
    });

    it('should trim surrounding whitespace layout artifacts seamlessly', () => {
      expect(sanitizeUrl('   ./dice_sim/   ')).toBe('./dice_sim/');
    });

    it('should disarm malicious script execution vectors by falling back to a safe hash anchor', () => {
      // Direct XSS execution attempts
      expect(sanitizeUrl('javascript:alert(1)')).toBe('#');
      expect(sanitizeUrl('javascript:evilCode()')).toBe('#');

      // Obfuscated/Case-insensitive execution attempts
      expect(sanitizeUrl('JAVAscript:alert(1)')).toBe('#');
      
      // Inline document/Data iframe exploit vectors
      expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('#');
      
      // Legacy Internet Explorer exploit vectors
      expect(sanitizeUrl('vbscript:msgbox("hello")')).toBe('#');
    });
  });
});