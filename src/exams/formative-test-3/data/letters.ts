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

const missing = (
  prompt: string,
  answer: string,
  options: string[],
  fills?: string[],
): ChoiceItem => ({
  kind: 'choice',
  prompt,
  noSpeak: true,
  options,
  answer,
  fills,
})

const listen = (word: string, options: string[]): ChoiceItem => ({
  kind: 'choice',
  speak: word,
  options,
  answer: word,
})

const STORY = 'Ken will jog with Kim. He will jog with Jeff. The three like to run.'

export const letters = defineSection({
  id: 'letters',
  title: 'Letters',
  subtitle: 'Rr Ww Jj Kk (Wk 7) · Vv Yy Zz (Wk 8)',
  emoji: '🔤',
  parts: [
    {
      source: 'Phonics p.19',
      title: 'Say the picture name. Choose the word that names the picture.',
      columns: 2,
      items: [
        nameIt('🐀', 'rat', ['rip', 'rat', 'run']),
        nameIt('🏺', 'jug', ['jet', 'jam', 'jug']),
        nameIt('🧒', 'kid', ['kin', 'kid', 'kit']),
        nameIt('🕸️', 'web', ['web', 'win', 'wet']),
      ],
    },
    {
      source: 'Phonics p.23',
      title: 'Write the letter v, z, or y to complete the words. Then read the sentence.',
      items: [
        missing('A ___et is in the ___an.', 'v', VYZ),
        missing('Can ___ac ___ip it up?', 'z', VYZ, ['Z', 'z']),
        missing('___es, I like the ___ak.', 'y', VYZ, ['Y', 'y']),
      ],
    },
    {
      source: 'myView p.205',
      title: 'Say each picture name. Listen to the sound at the beginning of each word.',
      columns: 2,
      items: [
        begins('🪨', 'rock', RWJK),
        begins('🕸️', 'web', RWJK),
        begins('🏺', 'jug', RWJK),
        begins('🪁', 'kite', RWJK),
        listen('rip', ['rip', 'job', 'kit']),
        listen('job', ['rip', 'job', 'web']),
      ],
    },
    {
      source: 'myView p.209',
      title: 'Decode these words. Tap 🔊 and tap the word you hear.',
      columns: 2,
      items: [
        listen('rag', ['rag', 'rat', 'rug']),
        listen('rug', ['rat', 'rug', 'rag']),
        listen('wag', ['web', 'wag', 'wet']),
        listen('wet', ['wet', 'web', 'wag']),
        listen('jet', ['jug', 'Jan', 'jet']),
        listen('Jan', ['jet', 'Jan', 'jug']),
        listen('kit', ['Ken', 'kit', 'kid']),
        listen('kid', ['kid', 'kit', 'Ken']),
      ],
    },
    {
      source: 'myView p.209',
      title: 'Write the letter r, w, j, or k to finish the words. Then read the sentences.',
      columns: 2,
      items: [
        missing('___im will jog.', 'K', ['R', 'W', 'J', 'K']),
        missing('Kim will ___og.', 'j', RWJK),
        missing('Wes ___ill run.', 'w', RWJK),
        missing('Wes will ___un.', 'r', RWJK),
        missing('Can ___im win?', 'J', ['R', 'W', 'J', 'K']),
      ],
    },
    {
      source: 'myView p.210',
      title:
        'Choose the word that completes each sentence. Think about the sounds the letters spell.',
      columns: 2,
      items: [
        {
          kind: 'choice',
          picture: '🟦',
          prompt: 'We sit on the ___.',
          options: ['rug', 'web', 'jug'],
          answer: 'rug',
        },
        {
          kind: 'choice',
          picture: '🕸️',
          prompt: 'I see a big ___.',
          options: ['rug', 'web', 'kit'],
          answer: 'web',
        },
        {
          kind: 'write',
          prompt: 'Write a sentence that includes words with r, w, j, or k.',
          lines: 2,
        },
      ],
    },
    {
      source: 'myView p.211',
      title: 'Read the story "Three Will Run".',
      items: [
        {
          kind: 'choice',
          prompt: `${STORY}\nWhich three words have the j sound?`,
          options: ['jog, jog, Jeff', 'Ken, Kim, like', 'will, with, run'],
          answer: 'jog, jog, Jeff',
        },
        {
          kind: 'choice',
          prompt: `${STORY}\nWhich two words begin with the k sound spelled k?`,
          options: ['Ken, Kim', 'jog, Jeff', 'three, run'],
          answer: 'Ken, Kim',
        },
      ],
    },
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
