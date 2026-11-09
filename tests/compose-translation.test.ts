import { describe, expect, it } from 'vitest';
import {
  composePairOther,
  draftLooksLikeTarget,
  planComposeTranslation,
} from '@/shared/compose-translation';

describe('compose translation direction', () => {
  it('sends a Korean draft to English when the saved target is Korean', () => {
    const plan = planComposeTranslation('안녕하세요, 회의는 내일입니다.', 'ko');
    expect(plan.targetLanguage).toBe('en');
    expect(plan.sourceLanguage).toBe('ko');
    expect(plan.other).toBe('ko');
    expect(plan.ok).toBe(true);
  });

  it('sends a Korean draft to the saved target when that target is not Korean', () => {
    const plan = planComposeTranslation('감사합니다.', 'en');
    expect(plan.targetLanguage).toBe('en');
    expect(plan.other).toBe('ko');
  });

  it('sends a Latin draft to Korean when the saved target is Korean', () => {
    const plan = planComposeTranslation('See you tomorrow.', 'ko');
    expect(plan.targetLanguage).toBe('ko');
    expect(plan.other).toBe('en');
  });

  it('does not send a Latin draft to Korean just because the saved target is English', () => {
    const english = planComposeTranslation('See you tomorrow.', 'en');
    expect(english.targetLanguage).toBe('en');
    const german = planComposeTranslation('Guten Morgen, wir treffen uns morgen.', 'en');
    expect(german.targetLanguage).toBe('en');
    expect(draftLooksLikeTarget('See you tomorrow.', 'en')).toBe(false);
    expect(draftLooksLikeTarget('Guten Morgen, wir treffen uns morgen.', 'en')).toBe(false);
    expect(draftLooksLikeTarget('안녕하세요', 'ko')).toBe(true);
  });

  it('does not treat a few kanji inside an English sentence as Japanese', () => {
    expect(draftLooksLikeTarget('By the Edo period, 大坂 was the city.', 'en')).toBe(false);
    const plan = planComposeTranslation('By the Edo period, 大坂 was the city.', 'en');
    expect(plan.targetLanguage).toBe('en');
  });

  it('inverts the auto choice when the reader swaps', () => {
    const auto = planComposeTranslation('안녕하세요', 'ko', false);
    const swapped = planComposeTranslation('안녕하세요', 'ko', true);
    expect(auto.targetLanguage).toBe('en');
    expect(swapped.targetLanguage).toBe('ko');
    expect(swapped.other).toBe('en');
  });

  it('keeps the other half of the pair as Korean for a non-Korean target', () => {
    expect(composePairOther('de', 'de')).toBe('ko');
    expect(composePairOther('ko', 'de')).toBe('de');
    expect(composePairOther('ko', 'ko')).toBe('en');
  });

  it('refuses a Chrome-only target instead of handing the draft to another engine', () => {
    const plan = planComposeTranslation('안녕하세요', 'pt');
    expect(plan.targetLanguage).toBe('pt');
    expect(plan.ok).toBe(false);
  });

  it('keeps an explicit target instead of flipping a Korean draft', () => {
    const auto = planComposeTranslation('안녕하세요', 'ko');
    const explicit = planComposeTranslation('안녕하세요', 'ko', false, true);
    expect(auto.targetLanguage).toBe('en');
    expect(explicit.targetLanguage).toBe('ko');
    expect(planComposeTranslation('See you tomorrow.', 'en', false, true).targetLanguage).toBe(
      'en',
    );
  });
});
