import { defineSection } from '../../../components/quiz/types'
import { choice, lawVocabParts, listen, matches } from '../helpers'

export const vocabGarden = defineSection({
  id: 'vocab-garden',
  title: 'Garden Party words',
  subtitle: 'community, garden, plant, neighbors, help, apartment, brick, stores',
  emoji: '🌻',
  group: 'Vocabulary',
  parts: lawVocabParts({
    pages: ['LT LAW p.4', 'LT LAW p.5'],
    sentences: [
      ['Can you please ___ me tidy the classroom?', 'help', 'garden'],
      ['We can ___ vegetables in the garden.', 'plant', 'apartment'],
      ['I live in a nice ___ where people help each other.', 'community', 'stores'],
      ['We go to different ___ to buy food.', 'stores', 'neighbors'],
      ['My ___ are nice. They always say hello!', 'neighbors', 'help'],
      ['We plant pretty flowers in our back ___ .', 'garden', 'brick'],
      ['The house is made of red ___ .', 'brick', 'community'],
      ['I live in an ___ on the 9th floor of a tall building.', 'apartment', 'plant'],
    ],
    meanings: {
      community: 'A group of people who live in the same place.',
      garden: 'A place where plants grow, like flowers or vegetables.',
      plant: 'To start to grow some flowers from a seed.',
      neighbors: 'The people who live next door to you.',
      help: 'To do something for someone.',
      apartment: 'A home in a building where many people live.',
      brick: 'A small block that is used to build walls or buildings.',
      stores: 'Places where you can buy things, like food or toys.',
    },
  }),
})

export const vocabClick = defineSection({
  id: 'vocab-click',
  title: 'Click, Clack, Click! words',
  subtitle: 'center, meet, pieces, wooden, gourd, beads, join, instrument',
  emoji: '🥁',
  group: 'Vocabulary',
  parts: lawVocabParts({
    pages: ['LT LAW p.7', 'LT LAW p.8'],
    sentences: [
      ['My chair is ___ and is very strong.', 'wooden', 'meet'],
      ['She used colorful ___ to make a necklace.', 'beads', 'pieces'],
      ["Let's ___ the school basketball team!", 'join', 'wooden'],
      ['We will ___ our friends to play after school.', 'meet', 'instrument'],
      ['A piano is an ___ that is fun to learn!', 'instrument', 'gourd'],
      ['The playground is in the ___ of the school.', 'center', 'beads'],
      ['A ___ is a fruit with a hard shell.', 'gourd', 'center'],
      ['A puzzle has lots of ___ you put together.', 'pieces', 'join'],
    ],
    meanings: {
      center: 'The middle of something.',
      meet: 'To see and talk to someone.',
      pieces: 'Small parts of something.',
      wooden: 'Made from wood.',
      gourd: 'A fruit with a hard shell.',
      beads: 'Small round things used to make jewelry.',
      join: 'To come together with someone or something.',
      instrument: 'Something used to make music, like a drum.',
    },
  }),
})

export const vocabLook1 = defineSection({
  id: 'vocab-look-1',
  title: 'Look Both Ways! words 1',
  subtitle: 'crosswalk, lines, safe, place, cross, first, guard, walk',
  emoji: '🚸',
  group: 'Vocabulary',
  parts: lawVocabParts({
    pages: ['LT LAW p.12', 'LT LAW p.13'],
    sentences: [
      ['I was the ___ to finish my test!', 'first', 'guard'],
      ['Look both ways before you ___ the street.', 'cross', 'place'],
      ['Wear a helmet to stay ___ when you ride a bike.', 'safe', 'lines'],
      ['The kids waited at the ___ when the light was red.', 'crosswalk', 'walk'],
      ['Write the answers on the ___ .', 'lines', 'first'],
      ['The park is a fun ___ to play.', 'place', 'cross'],
      ["We have to ___ in the halls. We can't run.", 'walk', 'crosswalk'],
      ['The ___ at school helps the children stay safe.', 'guard', 'safe'],
    ],
    meanings: {
      crosswalk: 'A safe place to cross the street.',
      lines: 'Long, straight marks.',
      safe: 'Not in danger.',
      place: 'A spot or area.',
      cross: 'To go from one side to the other.',
      first: 'Coming before everyone.',
      guard: 'Someone who keeps other people safe.',
      walk: 'To move by putting one foot in front of the other.',
    },
  }),
})

export const vocabLook2 = defineSection({
  id: 'vocab-look-2',
  title: 'Look Both Ways! words 2',
  subtitle: 'pictures, wait, person, safety, traffic, safely, left, right',
  emoji: '🚦',
  group: 'Vocabulary',
  parts: lawVocabParts({
    pages: ['LT LAW p.15', 'LT LAW p.16'],
    sentences: [
      ['There was a lot of ___ so we were late getting home.', 'traffic', 'wait'],
      ["Be careful to cross the road ___ . It's dangerous.", 'safely', 'right'],
      ['Your teacher is a very nice ___ .', 'person', 'safety'],
      ['Children love to draw ___ of animals.', 'pictures', 'left'],
      ['I have to ___ for my parents after school.', 'wait', 'person'],
      ['Right is the opposite of ___ .', 'left', 'pictures'],
      ['We had a talk about fire ___ at school.', 'safety', 'traffic'],
      ['Most people write with their ___ hand.', 'right', 'safely'],
    ],
    meanings: {
      pictures: 'Drawings or photos.',
      wait: 'To stay still until something happens.',
      person: 'One man or one woman.',
      safety: 'Something that keeps you safe.',
      traffic: 'Cars and trucks on the road.',
      safely: 'To do something in a safe way.',
      left: 'The opposite of right.',
      right: 'The opposite of left.',
    },
  }),
})

const SKILL_PAGES = 'myView p.104, 127, 134, 142, 171, 178'

export const skillWords = defineSection({
  id: 'skill-words',
  title: 'Skill Words & Words to Know',
  subtitle: 'compare, contrast, visualize, heading, label … · up, two, that, by, are, look …',
  emoji: '🧠',
  group: 'Vocabulary',
  parts: [
    {
      source: SKILL_PAGES,
      title: 'Match the skill word to what it means.',
      // Definitions as printed on the myView skill pages.
      items: matches({
        'informational text': 'Tells facts about real people, things, or events.',
        'text features': 'They help you find and learn information.',
        heading: 'Tells the topic of a section.',
        label: 'Names what a picture shows.',
        compare: 'Tell how characters are alike.',
        contrast: 'Tell how characters are different.',
        visualize: 'Make pictures in your mind from the details in a story.',
        'text evidence': 'The details that support what a reader thinks about the text.',
      }),
    },
    {
      source: SKILL_PAGES,
      title: 'Choose the word that completes the sentence.',
      columns: 2,
      items: [
        choice('To compare characters, describe how they are ___ .', 'alike', ['different']),
        choice('To contrast characters, describe how they are ___ .', 'different', ['alike']),
        choice('When you ___ , you make pictures in your mind.', 'visualize', [
          'compare',
          'contrast',
        ]),
        choice('A ___ tells the topic of a section.', 'heading', ['label']),
        choice('A ___ names what a picture shows.', 'label', ['heading']),
        choice('Text ___ help you find and learn information.', 'features', ['evidence']),
        choice(
          'Text evidence is the details that ___ what a reader thinks about the text.',
          'support',
          ['contrast', 'visualize'],
        ),
        choice(
          'Which kind of text tells facts about real people, things, or events?',
          'informational text',
          ['realistic fiction'],
        ),
      ],
    },
    {
      source: 'Term 1 wordlist',
      title: '🔊 Listen. Tap the word you hear.',
      columns: 2,
      items: [
        listen('up', ['by', 'you']),
        listen('two', ['they', 'by']),
        listen('that', ['they', 'have']),
        listen('have', ['are', 'was']),
        listen('they', ['that', 'two']),
        listen('by', ['up', 'you']),
        listen('are', ['was', 'have']),
        listen('was', ['are', 'you']),
        listen('you', ['up', 'look']),
        listen('look', ['by', 'two']),
      ],
    },
  ],
})
