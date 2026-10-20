import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, WriteItem } from '../../../components/quiz/types'

const yesNo = (picture: string | undefined, word: string, yes: boolean): ChoiceItem => ({
  kind: 'choice',
  picture,
  // No emoji for some workbook pictures (e.g. rug): show the word instead.
  prompt: picture ? undefined : word,
  noSpeak: !!picture,
  reveal: picture ? `${picture} ${word}` : undefined,
  options: ['Yes', 'No'],
  keepOrder: true,
  answer: yes ? 'Yes' : 'No',
})

const ending = (picture: string, start: string, answer: string, options: string[]): ChoiceItem => ({
  kind: 'choice',
  picture,
  prompt: `${start}___`,
  noSpeak: true,
  reveal: `${start}${answer}`,
  options,
  answer,
})

const which = (options: string[], answer: string): ChoiceItem => ({
  kind: 'choice',
  prompt: 'Which word has the short u sound?',
  options,
  answer,
})

const writePic = (picture: string, answer: string): WriteItem => ({
  kind: 'write',
  picture,
  answer,
})
const dictation = (word: string): WriteItem => ({ kind: 'write', speak: word, answer: word })

const listen = (word: string, options: string[]): ChoiceItem => ({
  kind: 'choice',
  speak: word,
  options,
  answer: word,
})

export const shortU = defineSection({
  id: 'short-u',
  title: 'Short u',
  subtitle: 'Week 7 Phonics · fun, run, sun',
  emoji: '☀️',
  parts: [
    {
      source: 'Phonics p.18',
      title: 'Say the picture name. Does the word have the short u sound?',
      columns: 3,
      items: [
        yesNo('🛁', 'tub', true),
        yesNo('🐛', 'bug', true),
        yesNo(undefined, 'rug', true),
        yesNo('🚲', 'bike', false),
        yesNo('🪙', 'penny', false),
        yesNo('🚌', 'bus', true),
        yesNo('☀️', 'sun', true),
        yesNo('☕', 'cup', true),
      ],
    },
    {
      source: 'Phonics p.21',
      title: 'Short u is a middle sound: _u_. Choose the ending sound to finish the word.',
      columns: 2,
      items: [
        ending('🐞', 'b', 'ug', ['ug', 'un', 'ut']),
        ending('☕', 'c', 'up', ['ug', 'up', 'ub']),
        ending('🚴', 'f', 'un', ['ug', 'un', 'ut']),
        ending('🧸', 'h', 'ug', ['ug', 'up', 'ub']),
        ending('🥜', 'n', 'ut', ['ug', 'un', 'ut']),
        ending('🏃', 'r', 'un', ['ug', 'un', 'ut']),
        ending('☀️', 's', 'un', ['ug', 'un', 'ut']),
        ending('🛁', 't', 'ub', ['ug', 'up', 'ub']),
        {
          kind: 'write',
          prompt: 'Write two more words that match the spelling pattern _u_.',
          lines: 1,
        },
      ],
    },
    {
      source: 'myView short u',
      title: 'Tap 🔊 and read the short u words. Tap the word you hear.',
      columns: 2,
      items: [
        listen('dug', ['dug', 'hug', 'mug']),
        listen('hug', ['mug', 'hug', 'dug']),
        listen('mug', ['dug', 'hug', 'mug']),
        listen('but', ['but', 'nut', 'hut']),
        listen('nut', ['hut', 'but', 'nut']),
        listen('hut', ['nut', 'hut', 'but']),
      ],
    },
    {
      source: 'myView short u',
      title: 'Add u to make words. Read the words. Match each word to its picture.',
      items: [
        {
          kind: 'match',
          pairs: [
            { left: 's u n', right: '☀️' },
            { left: 'c u p', right: '🥤' },
            { left: 'n u t', right: '🥜' },
            { left: 't u b', right: '🛁' },
          ],
        },
      ],
    },
    {
      source: 'myView short u',
      title: 'Say each picture name. Write the word on the lines.',
      columns: 2,
      items: [
        writePic('☀️', 'sun'),
        writePic('🪲', 'bug'),
        {
          kind: 'write',
          prompt: 'No picture here. Tap 🔊 and write the word.',
          speak: 'rug',
          answer: 'rug',
        },
        writePic('🍔', 'bun'),
      ],
    },
    {
      source: 'myView p.204',
      title:
        'Spell the short u words. Then spell the My Words to Know words. Tap 🔊 to hear each word.',
      columns: 2,
      items: [
        dictation('bug'),
        dictation('hug'),
        dictation('tug'),
        dictation('dug'),
        dictation('to'),
        dictation('with'),
      ],
    },
    {
      title: 'Say the picture name. Does it have the short u sound?',
      columns: 3,
      items: [
        yesNo('☀️', 'sun', true),
        yesNo('🐱', 'cat', false),
        yesNo('🚌', 'bus', true),
        yesNo('🥜', 'nut', true),
        yesNo('🐷', 'pig', false),
        yesNo('🐛', 'bug', true),
        yesNo('🐶', 'dog', false),
        yesNo('🛁', 'tub', true),
      ],
    },
    {
      title: 'Say the picture name. Choose the ending sound to finish the word.',
      columns: 2,
      items: [
        ending('🐛', 'b', 'ug', ['ug', 'un', 'ut']),
        ending('☕', 'c', 'up', ['ug', 'up', 'ub']),
        ending('🏃', 'r', 'un', ['ug', 'un', 'ut']),
        ending('🤗', 'h', 'ug', ['ug', 'up', 'ub']),
        ending('🥜', 'n', 'ut', ['ug', 'un', 'ut']),
        ending('☀️', 's', 'un', ['un', 'up', 'ut']),
        ending('🛁', 't', 'ub', ['ug', 'up', 'ub']),
        ending('🚌', 'b', 'us', ['us', 'ug', 'un']),
      ],
    },
    {
      title: 'Read the words. Which word has the short u sound?',
      columns: 2,
      items: [
        which(['fun', 'fan', 'fin'], 'fun'),
        which(['cat', 'cut', 'cot'], 'cut'),
        which(['hog', 'hip', 'hug'], 'hug'),
        which(['run', 'ran', 'rip'], 'run'),
        which(['mad', 'mud', 'map'], 'mud'),
        which(['big', 'bag', 'bug'], 'bug'),
        which(['sit', 'sun', 'sat'], 'sun'),
        which(['pen', 'pot', 'pup'], 'pup'),
      ],
    },
    {
      title: 'Say the picture name. Write the word.',
      columns: 2,
      items: [
        writePic('☀️', 'sun'),
        writePic('🚌', 'bus'),
        writePic('🐛', 'bug'),
        writePic('☕', 'cup'),
        writePic('🥜', 'nut'),
        writePic('🛁', 'tub'),
      ],
    },
    {
      title: 'Tap 🔊 to listen. Write the word you hear.',
      columns: 2,
      items: [
        dictation('fun'),
        dictation('run'),
        dictation('hug'),
        dictation('mud'),
        dictation('cut'),
        dictation('gum'),
      ],
    },
    {
      title: 'Write a sentence using words with short u.',
      items: [
        {
          kind: 'write',
          prompt: 'Try words like sun, fun, run, bug, cup, or bus.',
          lines: 2,
        },
        {
          kind: 'write',
          prompt: 'Write two more words that have short u in the middle (like s-u-n).',
          lines: 1,
        },
      ],
    },
  ],
})
