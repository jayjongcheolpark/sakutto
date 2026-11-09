import { describe, expect, it } from 'vitest';
import { prewarmRequest } from '@/engine/cache/prewarm';

describe('frequent UI strings', () => {
  it('prepares English labels for a Korean target and Korean labels for English', () => {
    const korean = prewarmRequest('ko-KR');
    expect(korean?.src).toBe('en');
    expect(korean?.segments.map((segment) => segment.text)).toContain('Sign in');

    const english = prewarmRequest('en');
    expect(english?.src).toBe('ko');
    expect(english?.segments.map((segment) => segment.text)).toContain('로그인');
    expect(prewarmRequest('pt')).toBeNull();
    expect(prewarmRequest('nope')).toBeNull();
  });
});
