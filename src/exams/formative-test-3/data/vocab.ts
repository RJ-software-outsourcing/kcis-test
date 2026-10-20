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
  o: {
    /** Workbook pages: [fill-in page, match page] */
    pages: [string, string]
    words: string[]
    workbookSentences: ChoiceItem[]
    /** Workbook definitions, in workbook order */
    meanings: Record<string, string>
    newSentences: ChoiceItem[]
    whichMeans: ChoiceItem[]
  },
): SectionInput {
  const pairs = Object.entries(o.meanings).map(([left, right]) => ({ left, right }))
  return {
    ...base,
    parts: [
      {
        source: o.pages[0],
        title: 'Choose the most correct word to complete the sentence.',
        columns: 2,
        items: o.workbookSentences,
      },
      {
        source: o.pages[1],
        title: 'Match the vocabulary word to the correct definition.',
        items: [
          { kind: 'match', pairs: pairs.slice(0, 4) },
          { kind: 'match', pairs: pairs.slice(4) },
        ],
      },
      {
        source: o.pages[1],
        title:
          'Use one of the vocabulary words to make a sentence and draw a picture for your sentence.',
        items: [{ kind: 'write', prompt: `Words: ${o.words.join(', ')}`, lines: 2, draw: true }],
      },
      {
        title: 'Choose the best word to complete the sentence.',
        columns: 2,
        items: o.newSentences,
      },
      {
        title: 'Which word matches the meaning?',
        columns: 2,
        items: o.whichMeans,
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
    {
      pages: ['IT LAW p.20', 'IT LAW p.21'],
      words: ['maps', 'find', 'places', 'grocery', 'list', 'start', 'streets', 'near'],
      workbookSentences: [
        fill('We go to the ___ store to buy vegetables.', 'grocery', 'near'),
        fill('There are many fun ___ to visit near my home.', 'places', 'list'),
        fill('We can ___ the game when everyone is ready.', 'start', 'maps'),
        fill('My best friend lives ___ my house.', 'near', 'places'),
        fill('We use ___ to show where things are.', 'maps', 'list'),
        fill('Mom made a ___ of things to buy at the store.', 'list', 'find'),
        fill('Cars drive on the ___ in the city.', 'streets', 'grocery'),
        fill('I need to ___ all the answers to the questions.', 'find', 'streets'),
      ],
      newSentences: [
        fill('Mom buys milk at the ___ store.', 'grocery', 'start'),
        fill('Can you help me ___ my lost cat?', 'find', 'near'),
        fill('The park is ___ my house, so we can walk there.', 'near', 'list'),
        fill('I made a ___ of toys to take on the trip.', 'list', 'maps'),
        fill('We look at ___ to see where to go.', 'maps', 'streets'),
        fill('The race will ___ when I say "Go!"', 'start', 'places'),
        fill('The zoo and the beach are fun ___ to visit.', 'places', 'grocery'),
        fill('Cars and buses drive on the ___.', 'streets', 'find'),
      ],
      meanings: {
        maps: 'Pictures that show where places are.',
        find: 'To look for something and see where it is.',
        places: 'Different areas or locations, like a park or a school.',
        grocery: 'A kind of store where you can buy food.',
        list: 'A group of words written down to remember things.',
        start: 'To begin doing something.',
        streets: 'Roads where cars and people move.',
        near: 'Close to something.',
      },
      whichMeans: [
        means('close to something', 'near', ['start', 'list']),
        means('to begin', 'start', ['find', 'maps']),
        means('a store that sells food', 'grocery', ['streets', 'places']),
        means('roads where cars go', 'streets', ['list', 'near']),
        means('to look for something', 'find', ['grocery', 'start']),
        means('pictures that show where places are', 'maps', ['places', 'list']),
      ],
    },
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
    {
      pages: ['IT LAW p.24', 'IT LAW p.25'],
      words: ['squares', 'buildings', 'school', 'library', 'stores', 'outdoor', 'fields', 'key'],
      workbookSentences: [
        fill('We use a ___ to unlock a door.', 'key', 'outdoor'),
        fill('Our ___ has classrooms and a playground.', 'school', 'squares'),
        fill('We go to a ___ to borrow books to read.', 'library', 'stores'),
        fill('There are tall ___ in all big cities.', 'buildings', 'fields'),
        fill('Farmers grow crops in big open ___.', 'fields', 'key'),
        fill('We like to play ___ games, like soccer and tag.', 'outdoor', 'library'),
        fill('There are many ___ where we can buy clothes.', 'stores', 'school'),
        fill('Shapes like ___ have four sides.', 'squares', 'buildings'),
      ],
      newSentences: [
        fill('I use a ___ to open the door.', 'key', 'outdoor'),
        fill('We borrow books from the ___.', 'library', 'fields'),
        fill('Kids learn to read at ___.', 'school', 'squares'),
        fill('The city has many tall ___.', 'buildings', 'key'),
        fill('Cows eat grass in the ___.', 'fields', 'stores'),
        fill('We like to play ___ games in the sun.', 'outdoor', 'library'),
        fill('We can buy shoes and toys at the ___.', 'stores', 'school'),
        fill('On the map, ___ show the buildings.', 'squares', 'fields'),
      ],
      meanings: {
        squares: 'Shapes with four sides the same size.',
        buildings: 'Big places made for people to live, work, or play in.',
        school: 'A place where children go to learn.',
        library: 'A place where you can borrow books to read.',
        stores: 'Places where people can buy things.',
        outdoor: 'Outside, not inside a building.',
        fields: 'Big open spaces of grass or land.',
        key: 'A small metal tool used to open locks.',
      },
      whichMeans: [
        means('a place to borrow books', 'library', ['stores', 'key']),
        means('outside, not inside', 'outdoor', ['school', 'squares']),
        means('big open spaces of grass', 'fields', ['buildings', 'key']),
        means('shapes with four sides the same size', 'squares', ['fields', 'stores']),
        means('places to buy things', 'stores', ['library', 'outdoor']),
        means('a place where children learn', 'school', ['key', 'fields']),
      ],
    },
  ),
)
