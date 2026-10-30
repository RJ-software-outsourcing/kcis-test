import type {
  ChoiceItem,
  MatchItem,
  OrderItem,
  PartInput,
  SelectItem,
  WriteItem,
} from '../../components/quiz/types'

/** Multiple choice. `others` are the wrong options (all options are shuffled). */
export const choice = (
  prompt: string,
  answer: string,
  others: string[],
  extra: Partial<ChoiceItem> = {},
): ChoiceItem => ({ kind: 'choice', prompt, options: [answer, ...others], answer, ...extra })

/** Yes / No, in that order. */
export const yesNo = (
  prompt: string | undefined,
  yes: boolean,
  extra: Partial<ChoiceItem> = {},
): ChoiceItem => ({
  kind: 'choice',
  prompt,
  options: ['Yes', 'No'],
  keepOrder: true,
  answer: yes ? 'Yes' : 'No',
  ...extra,
})

/** Handwriting. With `answer` the child self-checks; without, it is open-ended ("Done"). */
export const write = (
  prompt: string | undefined,
  answer?: string,
  extra: Partial<WriteItem> = {},
): WriteItem => ({ kind: 'write', prompt, answer, ...extra })

/** Tap all the words in `text` that are in `answers`. */
export const select = (
  prompt: string,
  text: string,
  answers: string[],
  extra: Partial<SelectItem> = {},
): SelectItem => ({ kind: 'select', prompt, text, answers, ...extra })

/** Put the pieces in order (given here in the correct order). */
export const order = (
  prompt: string | undefined,
  pieces: string[],
  extra: Partial<OrderItem> = {},
): OrderItem => ({ kind: 'order', prompt, pieces, ...extra })

/** Match items of at most 4 pairs each (a full 8-pair match does not fit an iPad screen). */
export const matches = (pairs: Record<string, string>, size = 4): MatchItem[] => {
  const all = Object.entries(pairs).map(([left, right]) => ({ left, right }))
  const out: MatchItem[] = []
  for (let i = 0; i < all.length; i += size) out.push({ kind: 'match', pairs: all.slice(i, i + size) })
  return out
}

/**
 * The three parts of a LAW vocabulary spread: choose the word (2 options),
 * match word ↔ definition, and use a word in a sentence with a picture.
 */
export function lawVocabParts(o: {
  /** e.g. ['IT LAW p.4', 'IT LAW p.5'] */
  pages: [string, string]
  /** [sentence with ___, answer, wrong option] in workbook order */
  sentences: [string, string, string][]
  /** word → workbook definition, in workbook order */
  meanings: Record<string, string>
}): PartInput[] {
  const words = Object.keys(o.meanings)
  return [
    {
      source: o.pages[0],
      title: 'Choose the most correct word to complete the sentence.',
      columns: 2,
      items: o.sentences.map(([s, a, b]) => choice(s, a, [b])),
    },
    {
      source: o.pages[1],
      title: 'Match the vocabulary word to the correct definition.',
      items: matches(o.meanings),
    },
    {
      source: o.pages[1],
      title:
        'Use one of the vocabulary words to make a sentence and draw a picture for your sentence.',
      items: [write(`Words: ${words.join(', ')}`, undefined, { lines: 2, draw: true })],
    },
  ]
}
