import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, MultiItem } from '../../../components/quiz/types'
import { choice, order } from '../helpers'

// The consonants of every unit (m s t · c p n · f b g · d l h · r w j k · qu v y z), mixed.
// Sounds are heard (🔊), not shown; the sentences are read, not heard.

/** 🔊 Three words, each with letters missing (`___`); pick the letters you hear. */
const sounds = (...rows: [prompt: string, word: string, options: string[]][]): MultiItem => ({
  kind: 'multi',
  rows: rows.map(([prompt, word, options]) => {
    // The answer is what the blank stands for: "___an" + "man" → "m".
    const [before, after] = prompt.split('___')
    return { prompt, speak: word, options, answer: word.slice(before.length, word.length - after.length) }
  }),
})

/** A sentence with letters missing. Read it: only one choice makes real words that make sense. */
const fill = (prompt: string, answer: string, others: string[], fills?: string[]): ChoiceItem =>
  choice(prompt, answer, others, { noSpeak: true, fills })

export const letters = defineSection({
  id: 'letters',
  title: 'Letters & sounds',
  subtitle: 'm s t · c p n · f b g · d l h · r w j k · qu v y z',
  emoji: '🔠',
  group: 'Foundational Skills',
  parts: [
    {
      // myView p.44, 92, 174, 223, 228 · Phonics p.9, 11, 22
      source: 'myView & Phonics: beginning sounds',
      title: 'Tap 🔊 to hear each word. Which letter does it begin with?',
      items: [
        sounds(['___an', 'man', ['m', 's', 't']], ['___ap', 'cap', ['c', 'n', 'p']], ['___ox', 'fox', ['b', 'f', 'g']]),
        sounds(['___ag', 'tag', ['m', 's', 't']], ['___eg', 'leg', ['d', 'h', 'l']], ['___an', 'van', ['v', 'y', 'z']]),
        sounds(['___ad', 'sad', ['m', 's', 't']], ['___ot', 'got', ['b', 'f', 'g']], ['___ak', 'yak', ['v', 'y', 'z']]),
        sounds(['___at', 'hat', ['d', 'h', 'l']], ['___ip', 'zip', ['v', 'y', 'z']], ['___in', 'pin', ['c', 'n', 'p']]),
        sounds(['___ap', 'nap', ['c', 'n', 'p']], ['___ug', 'rug', ['j', 'r', 'w']], ['___een', 'queen', ['k', 'qu', 'w']]),
        sounds(['___eb', 'web', ['j', 'r', 'w']], ['___ilt', 'quilt', ['k', 'qu', 'w']], ['___id', 'kid', ['b', 'k', 't']]),
      ],
    },
    {
      // myView p.21, 92, 174, 228 · Phonics p.9, 11
      source: 'myView & Phonics: ending sounds',
      title: 'Tap 🔊 to hear each word. Which letter does it end with?',
      items: [
        sounds(['ma___', 'map', ['n', 'p', 't']], ['lo___', 'log', ['b', 'g', 't']], ['be___', 'bed', ['d', 'h', 'l']]),
        sounds(['pi___', 'pin', ['c', 'n', 'p']], ['ca___', 'can', ['n', 'p', 't']], ['qui___', 'quiz', ['v', 'y', 'z']]),
      ],
    },
    {
      // Phonics p.21 (_u_ word endings) · myView p.225 (-it / -ill)
      source: 'Phonics p.21 · myView p.225',
      title: 'Tap 🔊 to hear each word. Which ending do you hear?',
      items: [
        sounds(['b___', 'bug', ['ug', 'un', 'ut']], ['c___', 'cup', ['ub', 'ug', 'up']], ['f___', 'fun', ['ug', 'un', 'ut']]),
        sounds(['h___', 'hug', ['ub', 'ug', 'up']], ['n___', 'nut', ['ug', 'un', 'ut']], ['r___', 'run', ['ug', 'un', 'ut']]),
        sounds(['s___', 'sun', ['ug', 'un', 'ut']], ['t___', 'tub', ['ub', 'ug', 'up']], ['r___', 'rug', ['ub', 'ug', 'un']]),
        sounds(['qu___', 'quit', ['it', 'ill']], ['qu___', 'quill', ['it', 'ill']], ['b___', 'bit', ['it', 'ill']]),
        sounds(['w___', 'will', ['it', 'ill']], ['f___', 'fit', ['it', 'ill']], ['f___', 'fill', ['it', 'ill']]),
      ],
    },
    {
      source: 'myView p.43, 44, 91, 129, 173, 209, 210 · Phonics p.3, 7, 23',
      title: 'Read the sentence. Which letters finish the words so they make sense?',
      columns: 2,
      items: [
        fill('Sam ___a___.', 's … t', ['m … t', 't … m'], ['s', 't']),
        fill('___am ___at.', 'S … s', ['T … m', 'M … t'], ['S', 's']),
        fill('Sa___ is at his ___at.', 'm … m', ['s … t', 't … s'], ['m', 'm']),
        fill('___am sa___ at a ma___.', 'T … t … t', ['M … m … s', 'S … m … m'], ['T', 't', 't']),
        choice('Sam is at a ___.', 'mat', ['man', 'tag', 'sad']),
        fill('We ___at the ___at.', 'p … c', ['c … p', 'p … n'], ['p', 'c']),
        fill('Can the wi___ ___it?', 'g … f', ['f … g', 'b … f'], ['g', 'f']),
        fill('Can it ___it in the bi___ ___in?', 'f … g … b', ['b … g … f', 'g … b … f'], ['f', 'g', 'b']),
        fill('Sam can see the ___en. It is in the be___.', 'h … d', ['l … h', 'b … l'], ['h', 'd']),
        fill('___im will ___og.', 'K … j', ['J … k', 'R … w'], ['K', 'j']),
        fill('Wes ___ill ___un.', 'w … r', ['r … w', 'j … k'], ['w', 'r']),
        choice('We sit on the ___.', 'rug', ['web', 'jug']),
        choice('A spider made a big ___.', 'web', ['rug', 'kit']),
        fill('A ___et is in the ___an.', 'v … v', ['y … z', 'z … y'], ['v', 'v']),
        fill('___es, I like the ___ak.', 'Y … y', ['V … z', 'Z … v'], ['Y', 'y']),
      ],
    },
    {
      source: 'myView p.123, 167',
      title: 'Alphabetize the words: put them in ABC order by the first letter.',
      items: [
        order('Tap the words in ABC order.', ['cot', 'got', 'not', 'pot']),
        order('Tap the words in ABC order.', ['met', 'net', 'pet', 'set']),
      ],
    },
  ],
})
