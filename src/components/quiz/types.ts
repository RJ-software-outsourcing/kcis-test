import type { ComponentType } from 'react'

export type Result = 'correct' | 'wrong' | 'done'

/** Multiple choice. `___` in the prompt is rendered as a blank and filled with the answer once correct. */
export interface ChoiceItem {
  kind: 'choice'
  prompt?: string
  /** Large emoji picture */
  picture?: string
  /** Shown after answering, e.g. the picture's name */
  reveal?: string
  /** Text for the 🔊 button. Defaults to the prompt; set `noSpeak` to hide the button. */
  speak?: string
  noSpeak?: boolean
  /** Don't shuffle the options (e.g. Yes / No) */
  keepOrder?: boolean
  /** Per-blank text shown once correct, when blanks differ (e.g. ["Z", "z"]). Defaults to `answer`. */
  fills?: string[]
  options: string[]
  answer: string
}

/** Tap a word on the left, then its match on the right. */
export interface MatchItem {
  kind: 'match'
  pairs: { left: string; right: string }[]
}

/** Handwriting answer, self-checked against `answer` (if any). */
export interface WriteItem {
  kind: 'write'
  prompt?: string
  picture?: string
  speak?: string
  /** Symbol code to decode (shown as tiles) */
  code?: string[]
  answer?: string
  /** Number of ruled lines (default 1) */
  lines?: number
  /** Also show a blank drawing box */
  draw?: boolean
}

/**
 * Read, predict, then read on to check and correct the prediction.
 * Without `options`, the child writes the prediction and self-checks it.
 */
export interface PredictItem {
  kind: 'predict'
  before: string
  question: string
  options?: string[]
  /** What really happens in the story (required with `options`) */
  answer?: string
  after: string
}

/** Tap every word in `text` that matches (e.g. "Underline the nouns"). Words are compared without case or punctuation. */
export interface SelectItem {
  kind: 'select'
  /** What to look for, e.g. "Tap the words with short e." */
  prompt?: string
  text: string
  answers: string[]
  /** Read `text` aloud with the 🔊 button */
  speak?: boolean
}

/** Tap the pieces in the right order (ABC order, story events, words of a sentence). */
export interface OrderItem {
  kind: 'order'
  prompt?: string
  /** In the correct order */
  pieces: string[]
  /** Show the pieces as a list (events) instead of in a row (words) */
  vertical?: boolean
}

export type ItemInput = ChoiceItem | MatchItem | WriteItem | PredictItem | SelectItem | OrderItem
export type Item = ItemInput & { id: string }

export interface PartInput {
  /** Directions shown above the part */
  title: string
  /** Where the questions come from, e.g. "IT LAW p.20". Omit for extra practice. */
  source?: string
  /** Extra content above the items (e.g. a map or a code key) */
  aside?: ComponentType
  /** Grid columns on wide screens */
  columns?: 1 | 2 | 3
  items: ItemInput[]
}
export interface Part extends Omit<PartInput, 'items'> {
  id: string
  items: Item[]
}

export interface SectionInput {
  id: string
  title: string
  subtitle: string
  emoji: string
  /** Heading the section card is listed under on the landing page (e.g. "Vocabulary") */
  group?: string
  /** Story to read first (e.g. "myView 1.1 p.16–35"). Such sections are left out of the mixed review. */
  readFirst?: string
  parts: PartInput[]
}
export interface Section extends Omit<SectionInput, 'parts'> {
  parts: Part[]
}

/** Assigns stable ids: `<section>/<part index>/<item index>`. */
export function defineSection(s: SectionInput): Section {
  return {
    ...s,
    parts: s.parts.map((p, pi) => ({
      ...p,
      id: `${s.id}/${pi}`,
      items: p.items.map((it, ii) => ({ ...it, id: `${s.id}/${pi}/${ii}` })),
    })),
  }
}
