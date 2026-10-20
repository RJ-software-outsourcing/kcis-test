import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'
import { TownMap, WorkbookMap } from '../TownMap'

const q = (prompt: string, answer: string, others: string[]): ChoiceItem => ({
  kind: 'choice',
  prompt,
  options: [answer, ...others],
  answer,
})

export const map = defineSection({
  id: 'map',
  title: 'Read a Map',
  subtitle: 'Find graphics: labels, streets, map key',
  emoji: '🧭',
  parts: [
    {
      source: 'IT LAW p.23',
      title: 'Draw labels to some of the places on the map. Places A, B, and C have no label.',
      aside: WorkbookMap,
      items: [
        {
          kind: 'write',
          prompt:
            'What could places A, B, and C be? Write a label for each one (like "A: Toy Store").',
          lines: 3,
        },
      ],
    },
    {
      source: 'IT LAW p.23',
      title: 'Link the map to yourself. Answer in full sentences.',
      aside: WorkbookMap,
      items: [
        {
          kind: 'write',
          prompt: 'What are some places on the map that you have near your home?',
          lines: 2,
        },
      ],
    },
    {
      title: 'Look at My Map. Use the labels and streets to answer.',
      aside: WorkbookMap,
      columns: 2,
      items: [
        q('What is the name of the park?', 'Hillside Park', ['Long Pond', 'Main Street']),
        q('What is the name of the pond?', 'Long Pond', ['Hillside Park', 'Oak Street']),
        q('What is next to Long Pond?', 'the Pet Store', ['the Library', 'My home']),
        q('Which street is between My home and Elm Street School?', 'Green Street', [
          'Oak Street',
          'Main Street',
        ]),
        q('Which street is between the Library and Hillside Park?', 'Elm Street', [
          'Green Street',
          'First Street',
        ]),
        q('Which street is between Hillside Park and the Grocery Store?', 'Main Street', [
          'First Street',
          'Green Street',
        ]),
      ],
    },
    {
      title: 'Look at the map. Use the labels to answer.',
      aside: TownMap,
      columns: 2,
      items: [
        q('What is the name of this map?', 'Our Town', ['Sunny Park', 'Main Street']),
        q('What is the name of the park?', 'Sunny Park', ['Duck Pond', 'Elm Street']),
        q('Where can you borrow books?', 'the library', ['the pet store', 'the pond']),
        q('Where can you buy food?', 'the grocery store', ['the school', 'the library']),
        q('Which place is near My Home?', 'the school', ['the duck pond', 'the toy store']),
        q('What is next to the Duck Pond?', 'the pet store', ['the library', 'My Home']),
      ],
    },
    {
      title: 'Look at the streets and the map key. Choose the best answer.',
      aside: TownMap,
      columns: 2,
      items: [
        q('Which street is between the library and the school?', 'Main Street', [
          'First Street',
          'Elm Street',
        ]),
        q('Which street is between My Home and the school?', 'Green Street', [
          'Elm Street',
          'First Street',
        ]),
        q('Which street goes past the pet store and the pond?', 'First Street', [
          'Main Street',
          'Green Street',
        ]),
        q('In the map key, what does blue show?', 'water', ['buildings', 'parks']),
        q('What does green show on this map?', 'parks and fields', ['water', 'streets']),
        q('What shape shows the buildings?', 'squares', ['circles', 'stars']),
      ],
    },
    {
      title: 'Link the map to yourself. Answer in full sentences.',
      aside: TownMap,
      items: [
        {
          kind: 'write',
          prompt: 'What places on this map do you also have near your home?',
          lines: 2,
        },
        { kind: 'write', prompt: 'Which place on the map would you like to visit? Why?', lines: 2 },
      ],
    },
  ],
})
