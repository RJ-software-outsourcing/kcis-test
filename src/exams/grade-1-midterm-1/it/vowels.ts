import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, MultiItem } from '../../../components/quiz/types'
import { choice, matches } from '../helpers'

// Short a, e, i, o, u from every unit, mixed in every question, so neither the section
// nor the directions tell which vowel it is: the child has to listen (or read).

const VOWELS = ['a', 'e', 'i', 'o', 'u']

/** 🔊 Three words; pick the middle (vowel) sound of each. No picture, no spelling shown. */
const middle = (...words: [string, string, string]): MultiItem => ({
  kind: 'multi',
  options: VOWELS,
  rows: words.map((w) => ({ speak: w, answer: w.match(/[aeiou]/)![0] })),
})

/** 🔊 Three words; tap the word you hear. Options differ only in the vowel. */
const hear = (...rows: [string, string[]][]): MultiItem => ({
  kind: 'multi',
  rows: rows.map(([word, options]) => ({ speak: word, options, answer: word })),
})

/** The answer is the picture's name, so it is not read aloud. */
const nameIt = (picture: string, answer: string, others: string[]): ChoiceItem => ({
  kind: 'choice',
  picture,
  noSpeak: true,
  reveal: `${picture} ${answer}`,
  options: [answer, ...others],
  answer,
})

export const vowels = defineSection({
  id: 'vowels',
  title: 'Short vowels',
  subtitle: 'a, e, i, o, u · cat, hen, pig, pot, sun',
  emoji: '🔤',
  group: 'Foundational Skills',
  parts: [
    {
      // Workbook words: myView p.13, 20, 21, 60, 108, 146, 190 · Phonics p.2, 5, 9, 10, 14, 18
      source: 'myView & Phonics: short a, i, o, e, u',
      title: 'Tap 🔊 to hear each word. Which vowel sound is in the middle?',
      items: [
        middle('cat', 'hen', 'pig'),
        middle('pot', 'sun', 'bed'),
        middle('map', 'pin', 'mop'),
        middle('bug', 'net', 'hat'),
        middle('fox', 'wig', 'jet'),
        middle('rug', 'can', 'top'),
        middle('lip', 'pen', 'nut'),
        middle('log', 'fan', 'cup'),
        middle('web', 'kid', 'bus'),
        middle('hug', 'mom', 'pan'),
        middle('zip', 'ten', 'bat'),
        middle('tub', 'bun', 'leg'),
      ],
    },
    {
      source: 'Phonics p.17',
      title: 'Tap 🔊 and tap the word you hear.',
      items: [
        hear(['bed', ['bag', 'bed', 'bug']], ['hot', ['hat', 'hit', 'hot']], ['pin', ['pan', 'pen', 'pin']]),
        hear(['men', ['man', 'men', 'mom']], ['cup', ['cap', 'cop', 'cup']], ['net', ['net', 'not', 'nut']]),
        hear(['pot', ['pat', 'pet', 'pot']], ['bug', ['bag', 'big', 'bug']], ['hen', ['hat', 'hen', 'hug']]),
      ],
    },
    {
      source: 'Phonics p.6, 19',
      title: 'Read the words. Tap the word that names the picture or matches the clue.',
      columns: 2,
      items: [
        choice('a small bed for camping', 'cot', ['cat', 'cut']),
        choice('You wash the floor with it.', 'mop', ['map']),
        nameIt('🍲', 'pot', ['pit', 'pet']),
        nameIt('🐀', 'rat', ['rip', 'run']),
        nameIt('🏺', 'jug', ['jet', 'jam']),
        nameIt('🕸️', 'web', ['win', 'wet']),
      ],
    },
    {
      source: 'myView p.130, 191 · Phonics p.15',
      title: 'Read the words. Match each word to its picture.',
      items: [
        ...matches({ bed: '🛏️', hat: '👒', lip: '👄' }),
        ...matches({ sun: '☀️', cup: '🥤', nut: '🌰', tub: '🛁' }),
        ...matches({ bib: '👶 a baby wears it to eat', fan: '🪭', gas: '⛽' }),
      ],
    },
  ],
})
