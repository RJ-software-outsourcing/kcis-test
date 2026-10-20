import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'

const nameIt = (picture: string, answer: string, options: string[]): ChoiceItem => ({
  kind: 'choice',
  picture,
  options,
  answer,
})

const RWJK = ['r', 'w', 'j', 'k']
const VYZ = ['v', 'y', 'z']
const begins = (picture: string, word: string, options: string[]): ChoiceItem => ({
  kind: 'choice',
  picture,
  reveal: `${picture} ${word}`,
  options,
  answer: word[0],
})

const missing = (prompt: string, answer: string, options: string[]): ChoiceItem => ({
  kind: 'choice',
  prompt,
  noSpeak: true,
  options,
  answer,
})

export const letters = defineSection({
  id: 'letters',
  title: 'Letters',
  subtitle: 'Rr Ww Jj Kk (Wk 7) · Vv Yy Zz (Wk 8)',
  emoji: '🔤',
  parts: [
    {
      title: 'Match each big letter to its small letter.',
      items: [
        {
          kind: 'match',
          pairs: [
            { left: 'R', right: 'r' },
            { left: 'W', right: 'w' },
            { left: 'J', right: 'j' },
            { left: 'K', right: 'k' },
          ],
        },
        {
          kind: 'match',
          pairs: [
            { left: 'V', right: 'v' },
            { left: 'Y', right: 'y' },
            { left: 'Z', right: 'z' },
          ],
        },
      ],
    },
    {
      title: 'Say the picture name. Choose the word that names the picture.',
      columns: 2,
      items: [
        nameIt('🐀', 'rat', ['rip', 'rat', 'run']),
        nameIt('🕸️', 'web', ['wet', 'win', 'web']),
        nameIt('🧒', 'kid', ['kid', 'kit', 'jet']),
        nameIt('✈️', 'jet', ['jam', 'jet', 'wet']),
        nameIt('🚐', 'van', ['vet', 'yes', 'van']),
        nameIt('🧶', 'yarn', ['yarn', 'zip', 'vest']),
        nameIt('🦓', 'zebra', ['yak', 'zebra', 'web']),
        nameIt('🐏', 'ram', ['ram', 'rug', 'jam']),
      ],
    },
    {
      title: 'Say the picture name. Which letter does it begin with?',
      columns: 3,
      items: [
        begins('🔑', 'key', RWJK),
        begins('🌈', 'rainbow', RWJK),
        begins('🍉', 'watermelon', RWJK),
        begins('🧃', 'juice', RWJK),
        begins('🦘', 'kangaroo', RWJK),
        begins('🪱', 'worm', RWJK),
        begins('🎻', 'violin', VYZ),
        begins('🪀', 'yo-yo', VYZ),
        begins('🦓', 'zebra', VYZ),
        begins('🌋', 'volcano', VYZ),
      ],
    },
    {
      title: 'Choose the letter that finishes the word. Then read the sentence.',
      columns: 2,
      items: [
        missing('___im will jog with Ken.', 'K', ['R', 'W', 'J', 'K']),
        missing('Ken will ___og with Kim.', 'j', RWJK),
        missing('I see a big ___eb.', 'w', RWJK),
        missing('We sit on the ___ug.', 'r', RWJK),
        missing('Can ___es win?', 'W', ['R', 'W', 'J', 'K']),
        missing('A ___et is in the van.', 'v', VYZ),
        missing('___es, I like the yak.', 'Y', ['V', 'Y', 'Z']),
        missing('Can Zac ___ip it up?', 'z', VYZ),
        missing('The ___an is red.', 'v', VYZ),
        missing('Kim has a ___o-yo.', 'y', VYZ),
      ],
    },
    {
      title: 'Write a sentence that has words with r, w, j, or k.',
      items: [
        { kind: 'write', prompt: 'Try words like run, web, jog, jet, kid, or Ken.', lines: 2 },
      ],
    },
  ],
})
