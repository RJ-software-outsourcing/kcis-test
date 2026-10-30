import { defineSection } from '../../../components/quiz/types'
import { lawVocabParts } from '../helpers'

const blackout2 = lawVocabParts({
  pages: ['IT LAW p.8', 'IT LAW p.9'],
  sentences: [
    ['___ clapped when the show was over.', 'Everyone', 'Mutters'],
    ['She is ___ happy to help her friends.', 'always', 'listen'],
    ['The toy needs a ___ to work.', 'battery', 'silent'],
    ['I turned on the ___ to listen to some music.', 'radio', 'works'],
    ['We always ___ to our teacher.', 'listen', 'everyone'],
    ['The library is ___ when children are reading.', 'silent', 'always'],
    ['The clock ___ when it has a new battery.', 'works', 'radio'],
    ['My brother ___ when he is hungry or sad.', 'mutters', 'battery'],
  ],
  meanings: {
    radio: 'A thing that plays music or talks.',
    always: 'All the time.',
    silent: 'No sound at all.',
    battery: 'Something that gives toys power.',
    mutters: 'Talks very quietly.',
    works: 'Does what it should do.',
    everyone: 'All the people.',
    listen: 'To hear something.',
  },
}).map((p, i) =>
  // p.9 says "one (or more)" of the words
  i === 2
    ? {
        ...p,
        title:
          'Use one (or more) of the vocabulary words to make a sentence and draw a picture for your sentence.',
      }
    : p,
)

export const vocabBlackout = defineSection({
  id: 'vocab-blackout',
  title: 'The Blackout words',
  subtitle: 'lights, storm, flashlight, radio, battery …',
  emoji: '🔦',
  group: 'Vocabulary',
  parts: [
    ...lawVocabParts({
      pages: ['IT LAW p.4', 'IT LAW p.5'],
      sentences: [
        ['We use a ___ to see outside in the dark.', 'flashlight', 'check'],
        ['It is very ___ when no one is talking.', 'quiet', 'upstairs'],
        ['Stars are like little ___ in the night sky.', 'lights', 'during'],
        ['There is a lot of rain when there is a ___.', 'storm', 'everything'],
        ['Please ___ that your answer is right!', 'check', 'quiet'],
        ['My English classroom is ___.', 'upstairs', 'storm'],
        ['We eat lunch ___ the day.', 'during', 'flashlight'],
        ['The wind blew ___ everywhere.', 'everything', 'lights'],
      ],
      meanings: {
        lights: 'Things that make a place bright.',
        during: 'At the same time as something else.',
        storm: 'Rain, wind, and thunder.',
        everything: 'All things.',
        quiet: 'When there is no noise.',
        check: 'To look at something.',
        upstairs: 'The rooms above you.',
        flashlight: 'A small light you hold in your hand.',
      },
    }),
    ...blackout2,
  ],
})

export const vocabHenry = defineSection({
  id: 'vocab-henry',
  title: 'Henry on Wheels words',
  subtitle: 'block, corner, street, shovel, mixer, gravel …',
  emoji: '🚲',
  group: 'Vocabulary',
  parts: [
    ...lawVocabParts({
      pages: ['IT LAW p.12', 'IT LAW p.13'],
      sentences: [
        ['There is a 7-11 on the ___ of our block.', 'corner', 'long'],
        ['We ran ___ the park all day.', 'around', 'skipping'],
        ['The movie was so ___ that I fell asleep.', 'boring', 'block'],
        ['There were so many ___ at the zoo. It was busy.', 'people', 'street'],
        ['My best friend lives on the same ___ as me.', 'block', 'people'],
        ['We have a ___ rope race at school.', 'skipping', 'corner'],
        ['My hair is too ___. I need a haircut.', 'long', 'around'],
        ['There are lots of cars on the ___.', 'street', 'boring'],
      ],
      meanings: {
        long: 'Not short.',
        around: 'In a circle or near something.',
        block: 'The houses and buildings near your home.',
        boring: 'Not fun or interesting.',
        street: 'A road where cars and people go.',
        skipping: 'Jumping over a rope.',
        corner: 'Where two roads meet.',
        people: 'More than one person.',
      },
    }),
    ...lawVocabParts({
      pages: ['IT LAW p.16', 'IT LAW p.17'],
      sentences: [
        ['The boy used a ___ to dig a hole in the garden.', 'shovel', 'gravel'],
        ['The dog rolled in the mud and was covered in ___.', 'dirt', 'mixer'],
        ['The children built a castle in the ___ at the beach.', 'sand', 'machine'],
        ['You can ___ your dog from the leash at the park.', 'unhook', 'barrel'],
        ['The ___ made a loud noise as it worked.', 'machine', 'dirt'],
        ['The workers needed a ___ to build the house.', 'mixer', 'unhook'],
        ['The ___ of the mixer goes round and round.', 'barrel', 'sand'],
        ['Walking on a ___ path with no shoes hurts!', 'gravel', 'shovel'],
      ],
      meanings: {
        shovel: 'A tool used to dig a hole.',
        mixer: 'A machine that mixes things together.',
        barrel: 'A large, round box to hold things in.',
        gravel: 'Small stones used to build a path or a road.',
        sand: 'Very small rocks usually found at the beach.',
        machine: 'A thing with moving parts to help us do something.',
        dirt: 'Dry mud, another name for soil.',
        unhook: 'To take off a hook.',
      },
    }),
  ],
})

export const vocabMap = defineSection({
  id: 'vocab-map',
  title: 'Making a Map words',
  subtitle: 'maps, grocery, streets, library, key …',
  emoji: '🗺️',
  group: 'Vocabulary',
  parts: [
    ...lawVocabParts({
      pages: ['IT LAW p.20', 'IT LAW p.21'],
      sentences: [
        ['We go to the ___ store to buy vegetables.', 'grocery', 'near'],
        ['There are many fun ___ to visit near my home.', 'places', 'list'],
        ['We can ___ the game when everyone is ready.', 'start', 'maps'],
        ['My best friend lives ___ my house.', 'near', 'places'],
        ['We use ___ to show where things are.', 'maps', 'list'],
        ['Mom made a ___ of things to buy at the store.', 'list', 'find'],
        ['Cars drive on the ___ in the city.', 'streets', 'grocery'],
        ['I need to ___ all the answers to the questions.', 'find', 'streets'],
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
    }),
    ...lawVocabParts({
      pages: ['IT LAW p.24', 'IT LAW p.25'],
      sentences: [
        ['We use a ___ to unlock a door.', 'key', 'outdoor'],
        ['Our ___ has classrooms and a playground.', 'school', 'squares'],
        ['We go to a ___ to borrow books to read.', 'library', 'stores'],
        ['There are tall ___ in all big cities.', 'buildings', 'fields'],
        ['Farmers grow crops in big open ___.', 'fields', 'key'],
        ['We like to play ___ games, like soccer and tag.', 'outdoor', 'library'],
        ['There are many ___ where we can buy clothes.', 'stores', 'school'],
        ['Shapes like ___ have four sides.', 'squares', 'buildings'],
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
    }),
  ],
})
