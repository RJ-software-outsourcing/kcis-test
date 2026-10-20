import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, SectionInput } from '../../../components/quiz/types'

const fill = (prompt: string, answer: string, other: string): ChoiceItem => ({
  kind: 'choice',
  prompt,
  options: [answer, other],
  answer,
})

const means = (meaning: string, answer: string, others: string[]): ChoiceItem => ({
  kind: 'choice',
  prompt: `Which word means "${meaning}"?`,
  options: [answer, ...others],
  answer,
})

function vocabSection(
  base: Omit<SectionInput, 'parts'>,
  wordList: string[],
  sentences: ChoiceItem[],
  meanings: Record<string, string>,
  whichMeans: ChoiceItem[],
): SectionInput {
  const pairs = Object.entries(meanings).map(([left, right]) => ({ left, right }))
  return {
    ...base,
    parts: [
      {
        title: 'Choose the best word to complete the sentence.',
        columns: 2,
        items: sentences,
      },
      {
        title: 'Match each vocabulary word to what it means.',
        items: [
          { kind: 'match', pairs: pairs.slice(0, 4) },
          { kind: 'match', pairs: pairs.slice(4) },
        ],
      },
      {
        title: 'Which word matches the meaning?',
        columns: 2,
        items: whichMeans,
      },
      {
        title: 'Use one vocabulary word to write a sentence. Then draw a picture for your sentence.',
        items: [
          {
            kind: 'write',
            prompt: `Words: ${wordList.join(', ')}`,
            lines: 2,
            draw: true,
          },
        ],
      },
    ],
  }
}

export const vocab1 = defineSection(
  vocabSection(
    {
      id: 'vocab-1',
      title: 'Vocabulary Part 1',
      subtitle: 'maps, find, places, grocery, list, start, streets, near',
      emoji: '🗺️',
    },
    ['maps', 'find', 'places', 'grocery', 'list', 'start', 'streets', 'near'],
    [
      fill('Mom buys milk at the ___ store.', 'grocery', 'start'),
      fill('Can you help me ___ my lost cat?', 'find', 'near'),
      fill('The park is ___ my house, so we can walk there.', 'near', 'list'),
      fill('I made a ___ of toys to take on the trip.', 'list', 'maps'),
      fill('We look at ___ to see where to go.', 'maps', 'streets'),
      fill('The race will ___ when I say "Go!"', 'start', 'places'),
      fill('The zoo and the beach are fun ___ to visit.', 'places', 'grocery'),
      fill('Cars and buses drive on the ___.', 'streets', 'find'),
    ],
    {
      maps: 'Pictures that show where places are.',
      find: 'To look for something and see where it is.',
      places: 'Areas or spots, like a park or a school.',
      grocery: 'A store where you can buy food.',
      list: 'Words written down to help you remember things.',
      start: 'To begin doing something.',
      streets: 'Roads where cars and people move.',
      near: 'Close to something.',
    },
    [
      means('close to something', 'near', ['start', 'list']),
      means('to begin', 'start', ['find', 'maps']),
      means('a store that sells food', 'grocery', ['streets', 'places']),
      means('roads where cars go', 'streets', ['list', 'near']),
      means('to look for something', 'find', ['grocery', 'start']),
      means('pictures that show where places are', 'maps', ['places', 'list']),
    ],
  ),
)

export const vocab2 = defineSection(
  vocabSection(
    {
      id: 'vocab-2',
      title: 'Vocabulary Part 2',
      subtitle: 'squares, buildings, school, library, stores, outdoor, fields, key',
      emoji: '🏫',
    },
    ['squares', 'buildings', 'school', 'library', 'stores', 'outdoor', 'fields', 'key'],
    [
      fill('I use a ___ to open the door.', 'key', 'outdoor'),
      fill('We borrow books from the ___.', 'library', 'fields'),
      fill('Kids learn to read at ___.', 'school', 'squares'),
      fill('The city has many tall ___.', 'buildings', 'key'),
      fill('Cows eat grass in the ___.', 'fields', 'stores'),
      fill('We like to play ___ games in the sun.', 'outdoor', 'library'),
      fill('We can buy shoes and toys at the ___.', 'stores', 'school'),
      fill('On the map, ___ show the buildings.', 'squares', 'fields'),
    ],
    {
      squares: 'Shapes with four sides the same size.',
      buildings: 'Big places made for people to live, work, or play in.',
      school: 'A place where children go to learn.',
      library: 'A place where you can borrow books to read.',
      stores: 'Places where people can buy things.',
      outdoor: 'Outside, not inside a building.',
      fields: 'Big open spaces of grass or land.',
      key: 'A small metal tool used to open locks.',
    },
    [
      means('a place to borrow books', 'library', ['stores', 'key']),
      means('outside, not inside', 'outdoor', ['school', 'squares']),
      means('big open spaces of grass', 'fields', ['buildings', 'key']),
      means('shapes with four sides the same size', 'squares', ['fields', 'stores']),
      means('places to buy things', 'stores', ['library', 'outdoor']),
      means('a place where children learn', 'school', ['key', 'fields']),
    ],
  ),
)
