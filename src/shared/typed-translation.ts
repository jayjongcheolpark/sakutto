import { inferLanguage } from '@/dom/detect';
import { MAX_SEGMENT_TEXT } from '@/engine/offscreen/protocol';
import {
  canonicalLanguage,
  isChromeOnlyLanguage,
  isTargetLanguage,
  type TargetLanguage,
} from './languages';

export type TypedDirection = 'to-ko' | 'to-other';

export interface TypedPlan {
  /** False when the direction cannot be decided from the chosen target. */
  ok: boolean;
  sourceLanguage: string | null;
  targetLanguage: TargetLanguage;
  /** The half of the main pair this direction reads, for the swap control. */
  other: TargetLanguage;
}

/** The default target: Korean. English is the other side of the switch. */
export const PRIMARY_PAIR_TARGET: TargetLanguage = 'ko';

/**
 * True when the text is written in the same script as the target. Latin text is not
 * named: the same letters cover many languages, so a German draft with an English
 * target must not be treated as already English.
 */
function textMatchesTarget(text: string, target: string): boolean {
  const inferred = inferLanguage(text);
  if (!inferred) return false;
  const canonical = canonicalLanguage(target);
  if (!canonical) return false;
  if (inferred === canonical) return true;
  return inferred.startsWith('zh') && canonical.startsWith('zh');
}

/**
 * Which way a typed input is translated. The saved target is the direction for every
 * detected source. Text that is already in that target flips to the other side of the
 * Korean–English switch, so Korean pasted into a Korean target goes to English.
 *
 * The source is sent only when the script detector names a model language. Latin text
 * stays unset, and the target is still sent.
 */
export function planTypedTranslation(targetLanguage: TargetLanguage, text = ''): TypedPlan {
  const preferred = isTargetLanguage(targetLanguage) ? targetLanguage : PRIMARY_PAIR_TARGET;
  const detected = text.trim().length > 0 ? inferLanguage(text) : null;
  const source = detected !== null && canonicalLanguage(detected) !== null ? detected : null;
  const target =
    text.trim().length > 0 && textMatchesTarget(text, preferred)
      ? preferred === 'ko'
        ? 'en'
        : 'ko'
      : preferred;
  return {
    ok: true,
    sourceLanguage: source,
    targetLanguage: target,
    other: target === 'ko' ? 'en' : 'ko',
  };
}

/**
 * Why typed text cannot be sent right now. `ready` means the model is loaded; every other
 * value names the setup step the page has to offer first.
 */
export type TypedReadiness =
  'ready' | 'no-consent' | 'model-absent' | 'model-partial' | 'model-busy' | 'model-error';

export interface TypedReadinessInput {
  consent: boolean;
  modelState:
    'absent' | 'partial' | 'downloading' | 'verifying' | 'ready' | 'loading' | 'loaded' | 'error';
  plamoReady: boolean;
}

/**
 * The gate in front of the model. Typed text uses the same engine, the same consent record
 * and the same load flow as a page, so it waits for the same things in the same order: agree
 * to the license, have the file, then let it load.
 *
 * A Chrome-only target is refused here too. The built-in translator is a page's real engine
 * only for languages PLaMo cannot translate, and typed text is not a page, so there is no
 * half-supported direction to cover. Returning `ready` for one would make this box look like
 * a PLaMo translation while another engine wrote it.
 */
export function typedReadiness(input: TypedReadinessInput): TypedReadiness {
  if (!input.consent) return 'no-consent';
  if (input.modelState === 'error') return 'model-error';
  if (input.modelState === 'downloading' || input.modelState === 'verifying') return 'model-busy';
  if (input.modelState === 'loading') return 'model-busy';
  if (input.plamoReady) return 'ready';
  if (input.modelState === 'ready' || input.modelState === 'loaded') return 'ready';
  if (input.modelState === 'partial') return 'model-partial';
  return 'model-absent';
}

/** True when the picked target can only be served by Chrome's built-in translator. */
export function typedTargetNeedsChrome(targetLanguage: string): boolean {
  return isChromeOnlyLanguage(targetLanguage);
}

/**
 * Ctrl+Enter (⌘+Enter on a Mac) runs the translation. It is the one accelerator a
 * multi-line box needs, because plain Enter has to keep inserting line breaks.
 */
export function isTranslateShortcut(event: {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  isComposing?: boolean;
}): boolean {
  if (event.key !== 'Enter') return false;
  if (event.isComposing === true) return false;
  if (event.altKey === true || event.shiftKey === true) return false;
  return event.ctrlKey === true || event.metaKey === true;
}

/**
 * Per-request ceiling for the typed box. It matches `MAX_SEGMENT_TEXT` so a request the
 * UI accepts is not rejected by the offscreen protocol. The engine still splits the text
 * into prompt-sized pieces.
 */
export const MAX_TYPED_CHARS = MAX_SEGMENT_TEXT;

/**
 * Trims the pasted text the way the page collector trims a block: runs of whitespace collapse
 * to one space and the ends are trimmed, but a real line break inside the text is kept as a
 * line break because the user typed it as structure.
 */
export function normalizeTypedInput(value: string): string {
  return value
    .replace(/\r\n?/gu, '\n')
    .replace(/[ \t]+/gu, ' ')
    .trim();
}

export interface CopyTarget {
  writeText(text: string): Promise<void>;
}

/** Copies the result, reporting failure instead of throwing so the button can show it. */
export async function copyTranslation(
  text: string,
  clipboard: CopyTarget | null | undefined,
): Promise<boolean> {
  if (text.trim().length === 0) return false;
  if (!clipboard) return false;
  try {
    await clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
