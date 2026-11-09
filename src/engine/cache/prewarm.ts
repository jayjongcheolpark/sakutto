import { canonicalLanguage, isChromeOnlyLanguage } from '@/shared/languages';

/** Short labels that show up on many sites. Cached once so a later visit skips inference. */
const ENGLISH_UI = [
  'Sign in',
  'Log in',
  'Sign up',
  'Log out',
  'Settings',
  'Search',
  'Home',
  'Next',
  'Previous',
  'Learn more',
  'Read more',
  'Cancel',
  'Close',
  'Menu',
  'Save',
  'Download',
] as const;

const KOREAN_UI = [
  '로그인',
  '설정',
  '검색',
  '홈',
  '다음',
  '이전',
  '닫기',
  '취소',
  '저장',
  '자세히',
] as const;

export interface PrewarmRequest {
  src: string;
  segments: { id: string; text: string }[];
}

export function prewarmRequest(target: string): PrewarmRequest | null {
  const language = canonicalLanguage(target);
  if (!language || isChromeOnlyLanguage(language)) return null;

  const lines = language === 'en' ? KOREAN_UI : ENGLISH_UI;
  return {
    src: language === 'en' ? 'ko' : 'en',
    segments: lines.map((text, index) => ({ id: `ui-${String(index)}`, text })),
  };
}
