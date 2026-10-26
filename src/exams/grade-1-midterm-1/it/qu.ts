import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'
import { choice, pic, select, write, yesNo } from '../helpers'

const letter = (prompt: string, answer: string, others: string[], fills?: string[]) =>
  choice(prompt, answer, others, { noSpeak: true, fills })

/** Yes / No: does it begin like quit? 🔊 says the picture name. */
const likeQuit = (picture: string | undefined, word: string, yes: boolean): ChoiceItem =>
  yesNo(undefined, yes, {
    picture,
    speak: word,
    reveal: picture ? `${picture} ${word}` : word,
  })

const pattern = (word: string, answer: '-it' | '-ill'): ChoiceItem => ({
  kind: 'choice',
  prompt: word,
  options: ['-it', '-ill'],
  keepOrder: true,
  answer,
})

export const qu = defineSection({
  id: 'qu',
  title: 'Qu · Vv Yy Zz',
  subtitle: 'quit, queen, quiz · v, y, z words',
  emoji: '👸',
  group: 'Foundational Skills',
  parts: [
    {
      source: 'myView p.223',
      title:
        'Say each picture name. Choose the letters that stand for the beginning sound of each picture name.',
      columns: 2,
      items: [
        choice('___ilt', 'qu', ['k', 'w'], { speak: 'quilt' }),
        pic('👸', 'queen', '___een', 'qu', ['k', 'w']),
        write('Write a sentence with a qu word.', undefined, { lines: 2 }),
      ],
    },
    {
      source: 'myView p.224',
      title:
        'Listen to the sentences (tap 🔊). Tap the words with the kw sound. The letters qu stand for the kw sound.',
      columns: 2,
      items: [
        select('Tap the kw words.', 'Can Quinn do the quiz?', ['Quinn', 'quiz'], { speak: true }),
        select('Tap the kw words.', 'Can Bess do the quiz?', ['quiz'], { speak: true }),
        select('Tap the kw words.', 'Will they quit the quiz?', ['quit', 'quiz'], { speak: true }),
        write('Write a sentence about Quinn.', undefined, { lines: 2 }),
      ],
    },
    {
      source: 'myView p.225',
      title: 'Look at the spelling patterns to sort the words. Which pattern: -it or -ill?',
      columns: 2,
      items: [
        pattern('quit', '-it'),
        pattern('bit', '-it'),
        pattern('quill', '-ill'),
        pattern('will', '-ill'),
      ],
    },
    {
      source: 'myView p.228',
      title: 'Say each picture name (tap 🔊). Write the letter v, y, or z to make the words.',
      columns: 2,
      items: [
        pic('🐂', 'yak', '___ak', 'y', ['v', 'z']),
        pic('📝', 'quiz', 'qui___', 'z', ['v', 'y']),
        choice('___ip', 'z', ['v', 'y'], { speak: 'zip' }),
        pic('🚐', 'van', '___an', 'v', ['y', 'z']),
      ],
    },
    {
      source: 'myView p.229',
      title:
        'Write a sentence about two friends named Viv and Yaz. Then draw a picture of Viv and Yaz.',
      items: [write(undefined, undefined, { lines: 2, draw: true })],
    },
    {
      source: 'Phonics p.22',
      title: 'Say the picture name. Does the word begin the same as quit (qu)?',
      columns: 3,
      items: [
        likeQuit('👸', 'queen', true),
        likeQuit('🐞', 'ladybug', false),
        likeQuit('🐦', 'quail', true),
        likeQuit('📝', 'quiz', true),
        likeQuit('🪙', 'quarter', true),
        likeQuit(undefined, 'quilt', true),
        likeQuit('❓', 'question mark', true),
        likeQuit('🕯️', 'candle', false),
      ],
    },
    {
      source: 'Phonics p.23',
      title: 'Write the letter v, z, or y to complete the words. Then read the sentences.',
      items: [
        letter('A ___et is in the ___an.', 'v', ['y', 'z']),
        letter('Can ___ac ___ip it up?', 'z', ['v', 'y'], ['Z', 'z']),
        letter('___es, I like the ___ak.', 'y', ['v', 'z'], ['Y', 'y']),
      ],
    },
  ],
})
