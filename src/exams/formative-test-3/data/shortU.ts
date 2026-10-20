import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, WriteItem } from '../../../components/quiz/types'

const yesNo = (picture: string, word: string, yes: boolean): ChoiceItem => ({
  kind: 'choice',
  picture,
  reveal: `${picture} ${word}`,
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

const writePic = (picture: string, answer: string): WriteItem => ({ kind: 'write', picture, answer })
const dictation = (word: string): WriteItem => ({ kind: 'write', speak: word, answer: word })

export const shortU = defineSection({
  id: 'short-u',
  title: 'Short u',
  subtitle: 'Week 7 Phonics · fun, run, sun',
  emoji: '☀️',
  parts: [
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
