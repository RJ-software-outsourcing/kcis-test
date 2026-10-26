import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'
import { choice, listen, pic, select, write, yesNo } from '../helpers'

const dictation = (word: string) => write(undefined, word, { speak: word })
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
      source: 'myView p.222',
      title: 'Say the name of each picture. Listen to the beginning sound. Which letters spell it?',
      columns: 3,
      items: [
        pic('🪙', 'quarter', undefined, 'qu', ['k', 'w']),
        pic('👸', 'queen', undefined, 'qu', ['k', 'w']),
        pic('❓', 'question', undefined, 'qu', ['k', 'w']),
      ],
    },
    {
      source: 'myView p.222',
      title: 'The letters qu make the sound at the beginning of quit. Tap 🔊 and tap the word.',
      items: [listen('quit', ['queen', 'question'])],
    },
    {
      source: 'myView p.223',
      title: 'Read these sentences. Tap 🔊 and tap the sentence you hear.',
      items: [
        listen('Will Quinn quit?', ['Quinn will not quit.']),
        listen('Quinn will not quit.', ['Will Quinn quit?']),
      ],
    },
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
      title: 'Spell the qu words and the words that rhyme with them. Tap 🔊 to hear each word.',
      columns: 2,
      items: [dictation('quit'), dictation('bit'), dictation('quill'), dictation('will')],
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
      source: 'myView p.226',
      title:
        'Say what the bee does. Listen to the ending sound. Name the other pictures. Listen to the beginning sounds.',
      columns: 2,
      items: [
        pic('🐝', 'buzz', 'What does the bee say? Which letter spells the sound at the end?', 'z', [
          'v',
          'y',
        ]),
        pic('🧶', 'yarn', 'Which letter spells the beginning sound?', 'y', ['v', 'z']),
        pic('🚐', 'van', 'Which letter spells the beginning sound?', 'v', ['y', 'z']),
        pic('🦓', 'zebra', 'Which letter spells the beginning sound?', 'z', ['v', 'y']),
      ],
    },
    {
      source: 'myView p.226',
      title: 'Read these words. Tap 🔊 and tap the word you hear.',
      columns: 2,
      items: [listen('van', ['vet', 'yet']), listen('yet', ['van', 'yak'])],
    },
    {
      source: 'myView p.228',
      title: 'Read these words. Tap 🔊 and tap the word you hear.',
      columns: 2,
      items: [
        listen('yum', ['vet', 'zap']),
        listen('vet', ['yum', 'zap']),
        listen('zap', ['yum', 'vet']),
        listen('van', ['zag', 'yet']),
        listen('zag', ['van', 'yet']),
        listen('yet', ['van', 'zag']),
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
