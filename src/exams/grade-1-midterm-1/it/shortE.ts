import { defineSection } from '../../../components/quiz/types'
import { choice, listen, matches, order, pic, select, write } from '../helpers'

const letter = (prompt: string, answer: string, others: string[]) =>
  choice(prompt, answer, others, { noSpeak: true })

export const shortE = defineSection({
  id: 'short-e',
  title: 'Short e · Dd Ll Hh',
  subtitle: 'pet, men, hen · d, l, h words',
  emoji: '🐔',
  group: 'Foundational Skills',
  parts: [
    {
      source: 'myView p.146',
      title: 'Say each picture name. Write each word. Then read the words.',
      columns: 2,
      items: [
        write(undefined, 'men', { picture: '👬' }),
        write('Catch the butterfly with a ___.', 'net', { picture: '🦋' }),
        write('The girl has a kitten. It is her ___.', 'pet', { picture: '🐈' }),
        write(undefined, 'ten', { picture: '🔟' }),
      ],
    },
    {
      source: 'myView p.147',
      title: 'Read the sentences. Tap the words with the short e sound, as in set.',
      columns: 2,
      items: [
        select('Tap the short e words.', 'Peg the cat met ten men.', ['Peg', 'met', 'ten', 'men']),
        select('Tap the short e words.', 'One man was Ben.', ['Ben']),
        select('Tap the short e words.', 'Peg sat by Ben.', ['Peg', 'Ben']),
        select('Tap the short e words.', 'Ben did pet Peg.', ['Ben', 'pet', 'Peg']),
        write('Write another sentence about Peg and Ben.', undefined, { lines: 2 }),
      ],
    },
    {
      source: 'myView p.167',
      title: 'Alphabetize the words. Put them in ABC order by the first letter.',
      items: [order('Tap the words in ABC order.', ['met', 'net', 'pet', 'set'])],
    },
    {
      source: 'myView p.173',
      title: 'Write d, l, or h to finish the words. Then read the sentences.',
      items: [
        letter('Sam can see the ___en.', 'h', ['d', 'l']),
        letter('It is in the be___.', 'd', ['l', 'h']),
        letter('Sam ___et it nap.', 'l', ['d', 'h']),
      ],
    },
    {
      source: 'myView p.174',
      title: 'Say each picture name. Write d, l, or h to finish each picture name.',
      columns: 2,
      items: [
        pic('🦵', 'leg', '___eg', 'l', ['d', 'h']),
        pic('🛏️', 'bed', 'be___', 'd', ['l', 'h']),
        pic('👒', 'hat', '___at', 'h', ['d', 'l']),
        write('Write a sentence that includes a word with d, l, or h.', undefined, { lines: 2 }),
      ],
    },
    {
      source: 'Phonics p.14',
      title: 'Say the picture name. Write e to finish the word. Then read the words.',
      columns: 2,
      items: [
        pic('🐔', 'hen', 'h___n', 'e', ['a', 'i', 'u']),
        pic('🥅', 'net', 'n___t', 'e', ['a', 'i', 'u']),
        pic('🐕', 'pet', 'p___t', 'e', ['a', 'i', 'u']),
        pic('🔔', 'bell', 'b___ll', 'e', ['a', 'i', 'u']),
        pic('🖊️', 'pen', 'p___n', 'e', ['a', 'i', 'u']),
      ],
    },
    {
      source: 'Phonics p.15',
      title: 'Match the pictures to the words.',
      items: matches({ '🛏️': 'bed', '👒': 'hat', '👄': 'lip' }),
    },
    {
      source: 'Phonics p.15',
      title: 'Read the words. Draw a picture of each word.',
      columns: 2,
      items: [
        write('hen', undefined, { lines: 0, draw: true }),
        write('dig', undefined, { lines: 0, draw: true }),
      ],
    },
    {
      source: 'Phonics p.17',
      title:
        'Find the short e words from the word search. Tap 🔊 and tap the short e word you hear.',
      columns: 2,
      items: [
        listen('bed', ['bag', 'bug']),
        listen('get', ['got', 'fit']),
        listen('hen', ['hug', 'hat']),
        listen('let', ['lip', 'log']),
        listen('met', ['mat', 'mop']),
        listen('men', ['man', 'mom']),
        listen('net', ['nut', 'not']),
        listen('pet', ['pot', 'pit']),
        write('Write two more words that match the spelling pattern _e_.'),
      ],
    },
  ],
})
