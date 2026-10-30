import { defineSection } from '../../../components/quiz/types'
import { write } from '../helpers'

// Every handwriting task of the phonics units. All of it is "write", so the mixed test only
// includes it when "✍️ Writing & drawing" is ticked.

/** 🔊 Spelling dictation, self-checked against the word. */
const dictation = (word: string) => write(undefined, word, { speak: word })

export const spelling = defineSection({
  id: 'spelling',
  title: 'Spelling & writing',
  subtitle: 'Write the words you hear · write sentences',
  emoji: '✏️',
  group: 'Foundational Skills',
  parts: [
    {
      // myView p.60, 85, 130, 146, 190, 204 · Phonics p.5
      source: 'myView & Phonics: spelling',
      title: 'Tap 🔊 to hear the word. Write it.',
      columns: 2,
      items: [
        'bat', 'cat', 'hat', 'mat',
        'it', 'sit', 'sip', 'pin', 'mitt', 'miss',
        'bib', 'fan', 'gas',
        'men', 'net', 'pet', 'ten',
        'sun', 'rug', 'bun', 'bug', 'hug', 'tug', 'dug',
      ].map(dictation),
    },
    {
      source: 'myView p.61, 191, 224, 229 · Phonics p.9, 13, 17, 21',
      title: 'Your turn to write.',
      items: [
        write('Write a sentence about Tim.', undefined, { lines: 2 }),
        write('Write a sentence with a short u word, like sun or bug.', undefined, { lines: 2 }),
        write('Write a sentence about Quinn and the quiz.', undefined, { lines: 2 }),
        write(
          'Write a sentence about two friends named Viv and Yaz. Then draw a picture of Viv and Yaz.',
          undefined,
          { lines: 2, draw: true },
        ),
        write(
          'Write two more words for each spelling pattern: _i_ (like pin), _o_ (like top), _e_ (like pet), _u_ (like sun).',
          undefined,
          { lines: 4 },
        ),
      ],
    },
  ],
})
