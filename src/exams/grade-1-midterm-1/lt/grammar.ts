import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, ItemInput, MultiItem, PartInput } from '../../../components/quiz/types'
import { choice, order, select, write, yesNo } from '../helpers'

// ---------------------------------------------------------------------------
// Shared builders
// ---------------------------------------------------------------------------

type WordKind = 'noun' | 'verb' | 'adjective'
const WORD_KINDS: WordKind[] = ['noun', 'verb', 'adjective']

/** "What kind of word is it?" — noun / verb / adjective, always in that order. */
const wordKind = (word: string, answer: WordKind): ChoiceItem => ({
  kind: 'choice',
  prompt: `What kind of word is "${word}"?`,
  options: WORD_KINDS,
  answer,
  keepOrder: true,
})

const NOUN_KINDS = ['a person', 'a place', 'an animal', 'a thing']

/** Person, place, animal, or thing? */
const nounKind = (word: string, answer: string): ChoiceItem => ({
  kind: 'choice',
  prompt: `"${word}" names ___.`,
  options: NOUN_KINDS,
  answer,
  keepOrder: true,
})

/** Tap the noun(s) / verb(s) / adjective(s) in a workbook sentence. */
/** `optional`: words that may be tapped or not (e.g. "brick" in "red brick houses"). */
const tap = (k: WordKind, text: string, answers: string[], hint = '', optional?: string[]) =>
  select(`Tap the ${k}${answers.length > 1 ? 's' : ''}.${hint ? ` ${hint}` : ''}`, text, answers, {
    optional,
  })

/** a / an, in that order. */
const article = (noun: string, answer: 'a' | 'an'): ChoiceItem => ({
  kind: 'choice',
  prompt: `___ ${noun}`,
  options: ['a', 'an'],
  answer,
  keepOrder: true,
})

const WRONG = [
  'a capital letter',
  'a period',
  'a capital letter and a period',
  'an -s on the verb',
]

/** "What does the sentence need?" — capital letter / period / both / verb + s. */
const whatIsWrong = (sentence: string, answer: string): ChoiceItem => ({
  kind: 'choice',
  prompt: sentence,
  options: WRONG,
  answer,
  keepOrder: true,
})

/** Split a long list of items into parts of `size`, all with the same title and source. */
const chunk = (
  items: ItemInput[],
  size: number,
  base: Omit<PartInput, 'items'>,
): PartInput[] => {
  const out: PartInput[] = []
  for (let i = 0; i < items.length; i += size) out.push({ ...base, items: items.slice(i, i + size) })
  return out
}

// ---------------------------------------------------------------------------
// Find the Word — nouns, verbs and adjectives mixed in every part
// ---------------------------------------------------------------------------

/**
 * The words from the workbook's "circle the noun / verb" lists (p.4 ① cards,
 * p.6 activity 1), asked as noun / verb / adjective so the page doesn't give it away.
 */
const kindWords: [string, WordKind][] = [
  ['nurse', 'noun'], ['read', 'verb'], ['dog', 'noun'], ['run', 'verb'],
  ['boat', 'noun'], ['jump', 'verb'], ['cat', 'noun'], ['ride', 'verb'],
  ['crayon', 'noun'], ['wave', 'verb'], ['park', 'noun'], ['stop', 'verb'],
  ['peach', 'noun'], ['house', 'noun'], ['bike', 'noun'], ['tree', 'noun'],
]

/**
 * Workbook sentences (p.2 act 3, p.3 paragraph, p.6 act 3, p.7 paragraph, p.8 A–B,
 * p.14 act 1, p.15 act 1), each asking for the kind its page asks for; the kind
 * changes from item to item.
 */
const findInSentence: ItemInput[] = [
  tap('noun', 'The boy rides a bike.', ['boy', 'bike']),
  tap('verb', 'Dad cooks dinner for our family.', ['cooks']),
  tap('adjective', 'I ride my red bike.', ['red']),
  tap('noun', 'We play at the park.', ['park']),
  tap('verb', 'Henry rides his bike.', ['rides']),
  tap('adjective', 'A happy girl walks to school.', ['happy']),
  tap('noun', 'My neighbor has a dog.', ['neighbor', 'dog']),
  tap('verb', 'Cathy runs to school every morning.', ['runs']),
  tap('adjective', 'We play at the big playground.', ['big']),
  tap('noun', 'The bus stops near the store.', ['bus', 'store']),
  tap('verb', 'We visit the community center on Saturdays.', ['visit']),
  tap('verb', 'Kids play at the park.', ['play']),
  tap('adjective', 'The tall tree stands near the busy road.', ['tall', 'busy']),
  tap(
    'noun',
    'My family walks to the community garden. We see flowers, birds, and a playground. A teacher rides a bike near the library.',
    ['family', 'garden', 'flowers', 'birds', 'playground', 'teacher', 'bike', 'library'],
    'Find them all!',
    ['community'],
  ),
  tap('verb', 'Mom shops at the store.', ['shops']),
  tap('adjective', 'Mom has a blue bag.', ['blue']),
  tap(
    'verb',
    'Henry rides around the block. He waves to his mom. Kids play in the sand. Big trucks push dirt down the street.',
    ['rides', 'waves', 'play', 'push'],
    '(There are 4 to find!)',
  ),
  tap('adjective', 'The red brick houses look beautiful.', ['red', 'beautiful'], '', ['brick']),
  tap('verb', 'The bus stops at the corner.', ['stops']),
  tap('adjective', 'The small dog runs fast.', ['small']),
  tap('verb', 'The boys play tennis after school.', ['play']),
  tap('adjective', 'My pretty teacher gives us fun homework.', ['pretty', 'fun']),
  tap('verb', 'She rides her bike in the park.', ['rides']),
  tap(
    'verb',
    'Every morning, Emma walks to school. She sees her friends on the way. They talk and laugh together. At school, Emma opens her backpack and takes out her books.',
    ['walks', 'sees', 'talk', 'laugh', 'opens', 'takes'],
    '(There are 6 to find!)',
  ),
]

/** p.2 / p.4 sort and p.3 color code, one word each, never the same kind twice in a row. */
const nounKinds: ItemInput[] = [
  nounKind('teacher', 'a person'),
  nounKind('store', 'a place'),
  nounKind('cat', 'an animal'),
  nounKind('bus', 'a thing'),
  nounKind('boy', 'a person'),
  nounKind('garden', 'a place'),
  nounKind('dog', 'an animal'),
  nounKind('scooter', 'a thing'),
  nounKind('library', 'a place'),
  nounKind('lion', 'an animal'),
  nounKind('pencil', 'a thing'),
  nounKind('baby', 'a person'),
  nounKind('hospital', 'a place'),
  nounKind('giraffe', 'an animal'),
  nounKind('flower', 'a thing'),
  nounKind('park', 'a place'),
]

/**
 * "Which word is a noun / verb / adjective?" — the other options are the other kinds, so
 * the child has to know what the kind means (not just what the picture shows).
 */
const whichIs = (k: WordKind, answer: string, others: [string, string]) =>
  choice(`Which word is ${k === 'adjective' ? 'an' : 'a'} ${k}?`, answer, others)

export const grammarFind = defineSection({
  id: 'grammar-find',
  title: 'Find the Word',
  subtitle: 'Nouns, verbs, adjectives — mixed',
  emoji: '🔍',
  group: 'Grammar',
  parts: [
    ...chunk(
      kindWords.map(([w, k]) => wordKind(w, k)),
      10,
      {
        source: 'myGrammar p.4, 6',
        title: 'What kind of word is it? A noun names a person, place, animal, or thing. A verb is an action word. An adjective tells more about a noun.',
        columns: 2,
      },
    ),
    ...chunk(findInSentence, 8, {
      source: 'myGrammar p.2–3, 6–8, 14–15',
      title: 'Read the sentence. Tap the words. Look carefully: noun, verb, or adjective?',
    }),
    ...chunk(nounKinds, 8, {
      source: 'myGrammar p.2–4',
      title: 'A noun names a person, a place, an animal, or a thing. Which one?',
      columns: 2,
    }),
    {
      // The words of the picture activities (p.2, 5 nouns; p.6 verbs; p.14 adjectives)
      source: 'myGrammar p.2, 5, 6, 14',
      title:
        'Which word is it? A noun names a person, place, animal, or thing. A verb is an action word. An adjective tells more about a noun.',
      columns: 2,
      items: [
        whichIs('noun', 'dog', ['jump', 'happy']),
        whichIs('verb', 'wave', ['hand', 'happy']),
        whichIs('adjective', 'tall', ['tree', 'grow']),
        whichIs('noun', 'school', ['run', 'big']),
        whichIs('verb', 'ride', ['bike', 'red']),
        whichIs('adjective', 'big', ['truck', 'drive']),
        whichIs('noun', 'girl', ['sing', 'little']),
        whichIs('verb', 'dig', ['dog', 'dirty']),
        whichIs('adjective', 'happy', ['girl', 'jump']),
        whichIs('noun', 'apple', ['eat', 'red']),
        whichIs('adjective', 'tiny', ['ladybug', 'crawl']),
        whichIs('noun', 'bird', ['swim', 'blue']),
      ],
    },
    {
      source: 'myGrammar p.16',
      title: 'Which sentence gives more information?',
      items: [
        choice('Tap the sentence that tells more.', 'I see a big dog.', ['I see a dog.']),
        choice('Tap the sentence that tells more.', 'She has a blue bag.', ['She has a bag.']),
        choice('Tap the sentence that tells more.', 'I see three birds.', ['I see birds.']),
      ],
    },
    {
      source: 'myGrammar p.16',
      title: 'What does the adjective tell you?',
      items: [
        choice('I see a big dog.\nWhat does "big" tell us?', "the dog's size", ["the dog's color"]),
        choice('She has a blue bag.\nWhat does "blue" tell us?', "the bag's color", [
          "the bag's size",
        ]),
        choice('I see three birds.\nWhat does "three" tell us?', 'how many birds', [
          'what color the birds are',
        ]),
      ],
    },
  ],
})

// ---------------------------------------------------------------------------
// Use the Right Word — fill-ins, kinds mixed
// ---------------------------------------------------------------------------

const useItems: ItemInput[] = [
  article('orange', 'an'), // p.14 act 3
  choice('The ___ likes to go to school.', 'girl', ['playground', 'bike']), // p.3 act 1
  choice('We walk past the ___ apartment building.', 'tall', ['happy', 'three']), // p.15 act 2
  article('eagle', 'an'), // p.16 A
  choice('The kids ___ at the park after school.', 'play', ['shop']), // p.7 act 2
  article('park', 'a'), // p.14
  choice('We play at the ___ after school.', 'playground', ['cat', 'girl']), // p.3
  article('chair', 'a'), // p.16
  choice('The ___ girl waves to her friends.', 'happy', ['three', 'green']), // p.15
  choice('Kids ___ at the park.', 'play', ['stops']), // p.11 act 3
  article('umbrella', 'an'), // p.14
  choice('The ___ and the ___ play in the park.', 'boy … girl', ['bus … store', 'run … jump'], {
    picture: '👦👧',
    fills: ['boy', 'girl'],
  }), // p.4 ②
  article('lamp', 'a'), // p.16
  choice('Dad ___ his bike to work in the morning.', 'rides', ['waves']), // p.7
  article('tiny bug', 'a'), // p.14
  choice('My dad drives a ___ car.', 'red', ['happy', 'tall']), // p.15
  choice('The ___ sleeps on my bed every day.', 'cat', ['playground', 'bike']), // p.3
  article('elephant', 'an'), // p.16
  choice('We ___ our bikes.', 'ride', ['stops', 'play']), // p.11
  article('girl', 'a'), // p.14
  choice('I can ride a ___ on my street.', 'bike', ['playground', 'cat']), // p.3
  article('flower', 'a'), // p.16
  choice('I see a ___ bug on the flower.', 'tiny', ['tall', 'three']), // p.15
  article('octopus', 'an'), // p.16
  choice('I saw a dog ___ along the street by my house.', 'run', ['push']), // p.7
  article('blue bag', 'a'), // p.14
  article('carrot', 'a'), // p.16
]

export const grammarUse = defineSection({
  id: 'grammar-use',
  title: 'Use the Right Word',
  subtitle: 'Nouns, verbs, a / an, adjectives — mixed',
  emoji: '✏️',
  group: 'Grammar',
  parts: [
    ...chunk(useItems, 8, {
      source: 'myGrammar p.3–5, 7, 9, 11, 14–16',
      title: 'Choose the word that fits the sentence.',
      columns: 2,
    }),
    {
      source: 'myGrammar p.2, 3, 5, 7',
      title: 'Your turn: nouns and verbs.',
      items: [
        write('Think of your own noun for each box: a person, a place, an animal, a thing.', undefined, {
          lines: 2,
        }),
        write(
          'Look around your neighborhood. Write a noun for each: a person, a place, an animal, a thing.',
          undefined,
          { lines: 2 },
        ),
        write('Draw your favorite thing. What do we call it? Write the noun.', undefined, {
          draw: true,
        }),
        write('Draw a picture and write a sentence about something you do every day.', undefined, {
          draw: true,
          lines: 2,
        }),
      ],
    },
    {
      source: 'myGrammar p.15, 17',
      title: 'Your turn: articles and adjectives.',
      items: [
        write(
          'Build a neighborhood sentence. Use an article (a, an, the), an adjective, and a noun.',
          undefined,
          { lines: 2 },
        ),
        write(
          'Read the sentence. Draw and color a picture that matches: "The happy girl walks past the tall tree and the red brick houses."',
          undefined,
          { lines: 0, draw: true },
        ),
        write('Choose ONE noun: dog, cat, house, pencil, cupcake, car. My noun is a ___.'),
        write(
          'Write adjectives to describe your noun. Color: ___ ___  Size: ___ ___  Number: ___ ___  What is it like? ___ ___',
          undefined,
          { lines: 4 },
        ),
        write('Draw your noun and use at least 3 adjectives.', undefined, { draw: true }),
      ],
    },
  ],
})

// ---------------------------------------------------------------------------
// Verb + s — the same verb twice (kick / kicks); pick the one that fits the naming part
// ---------------------------------------------------------------------------

/** Three sentences; each row offers the verb without and with -s. */
const verbS = (...rows: [sentence: string, verb: string, withS: boolean][]): MultiItem => ({
  kind: 'multi',
  rows: rows.map(([prompt, verb, withS]) => ({
    prompt,
    options: [verb, `${verb}s`],
    answer: withS ? `${verb}s` : verb,
  })),
})

export const verbPlusS = defineSection({
  id: 'verb-s',
  title: 'Verb + s',
  subtitle: 'Mia kicks · They kick',
  emoji: '🦶',
  group: 'Grammar',
  parts: [
    {
      // p.9 C sentences first, then the verbs of p.7, 9, 11–13 in new sentences
      source: 'myGrammar p.7, 9, 11–13',
      title:
        'Which verb fits? One person, animal, or thing (he, she, it, Mia, the dog) → add -s: Mia kicks. I, you, we, they, or more than one → no -s: They kick.',
      items: [
        verbS(['Mia ___ the ball in school.', 'kick', true], ['The students ___ at their desks.', 'sit', false], ['The girl ___ a picture every day.', 'draw', true]),
        verbS(['Ben ___ over the puddle.', 'jump', true], ['I ___ to the funny story.', 'listen', false], ['The children ___ a yummy cake.', 'eat', false]),
        verbS(['He ___ a room.', 'clean', true], ['They ___ books.', 'read', false], ['Tom ___ to school.', 'walk', true]),
        verbS(['The dog ___ fast.', 'run', true], ['The dogs ___ fast.', 'run', false], ['We ___ in the park.', 'play', false]),
        verbS(['Mom ___ at the store.', 'shop', true], ['The kids ___ in the sand.', 'play', false], ['The bus ___ at the corner.', 'stop', true]),
        verbS(['You ___ a bike.', 'ride', false], ['Henry ___ his bike.', 'ride', true], ['We ___ to our teacher.', 'listen', false]),
        verbS(['A bird ___ in the tree.', 'sing', true], ['Birds ___ in the tree.', 'sing', false], ['She ___ to her friends.', 'wave', true]),
        verbS(['My brother ___ up early.', 'wake', true], ['I ___ the flowers.', 'water', false], ['Dad ___ dinner for our family.', 'cook', true]),
        verbS(['The cat ___ on my bed.', 'sleep', true], ['They ___ to school.', 'walk', false], ['It ___ a lot in spring.', 'rain', true]),
        verbS(['Sam ___ a book.', 'read', true], ['We ___ our bikes.', 'ride', false], ['The teacher ___ a dress.', 'wear', true]),
      ],
    },
  ],
})

// ---------------------------------------------------------------------------
// Simple Sentences — capital letter · period · verb + s
// ---------------------------------------------------------------------------

const SENTENCE_RULE =
  'A simple sentence tells a complete idea, has a noun and a verb, begins with a capital letter, and ends with a period.'

const writtenRight = (prompt: string, answer: string, others: string[], picture?: string) =>
  choice(prompt, answer, others, picture ? { picture } : {})

export const simpleSentences = defineSection({
  id: 'sentences',
  title: 'Simple Sentences',
  subtitle: 'Capital letter · period · verb + s',
  emoji: '📝',
  group: 'Grammar',
  parts: [
    {
      source: 'myGrammar p.9',
      title: 'Use the words to make a complete sentence. Don\'t forget the present tense verb! (Tom / walk / to school. → Tom walks to school.)',
      items: [
        writtenRight('He / clean / a room.\nWhich sentence is right?', 'He cleans a room.', [
          'He clean a room.',
          'he cleans a room.',
          'He cleans a room',
        ]),
        writtenRight('They / read / books.\nWhich sentence is right?', 'They read books.', [
          'They reads books.',
          'they read books.',
          'They read books',
        ]),
      ],
    },
    {
      source: 'myGrammar p.9',
      title: 'Use the words and write a complete sentence on the line.',
      items: [
        write('He / clean / a room.', 'He cleans a room.'),
        write('They / read / books.', 'They read books.'),
      ],
    },
    {
      source: 'myGrammar p.10–11',
      title: `Is it a simple sentence? ${SENTENCE_RULE}`,
      columns: 2,
      items: [
        yesNo('The bus stops.', true),
        yesNo('Kids play in the sand.', true),
        yesNo('Shops at the store.', false),
        yesNo('Rides around the block.', false),
        yesNo('The girl rides a bike.', true),
        yesNo('at the playground', false),
        yesNo('playing in the sand', false),
        yesNo('The bus stops here.', true),
      ],
    },
    {
      source: 'myGrammar p.10–11',
      title: 'What is wrong? What does the sentence need?',
      items: [
        whatIsWrong('the dog runs', 'a capital letter and a period'),
        whatIsWrong('kids play outside', 'a capital letter and a period'),
        whatIsWrong('The dog runs fast', 'a period'),
        whatIsWrong('mom shops for food.', 'a capital letter'),
        whatIsWrong('The bus stops at the school', 'a period'),
        whatIsWrong('kids walk to school', 'a capital letter and a period'),
      ],
    },
    {
      source: 'myGrammar p.10–11',
      title: 'Fix the mistakes. Write the simple sentence correctly.',
      items: [
        write('the dog runs', 'The dog runs.', { picture: '🐕' }),
        write('kids play outside', 'Kids play outside.', { picture: '⚽' }),
        write('The dog runs fast', 'The dog runs fast.'),
        write('mom shops for food.', 'Mom shops for food.'),
        write('The bus stops at the school', 'The bus stops at the school.'),
        write('kids walk to school', 'Kids walk to school.'),
      ],
    },
    {
      source: 'myGrammar p.10',
      title: 'Match a noun with a verb and write a simple sentence. Nouns: Sam, Mom, The girl, The bike. Verbs: rides, waves, plays, stops.',
      items: [write('Sentence 1'), write('Sentence 2')],
    },
    {
      source: 'myGrammar p.12',
      title: 'Is it a sentence? Tap Yes or No.',
      columns: 2,
      items: [
        yesNo('My mom.', false),
        yesNo('friends', false),
        yesNo('The teacher wears a dress.', true),
        yesNo('Sam reads a book.', true),
        yesNo('I walk to.', false),
        yesNo('Grandma visits me', false),
      ],
    },
    {
      source: 'myGrammar p.11–12',
      title: 'Put the words in order to make a simple sentence.',
      items: [
        order('🚚 🛑 A truck at a stop sign.', ['the', 'truck', 'stops']),
        order('🪟 👋 Mom at the window.', ['Mom', 'waves', 'at', 'the', 'window']),
        order('🛏️ A boy waking up in bed.', ['My brother', 'wakes up early']),
        order('👒 🌷 A girl in a sun hat with flowers.', ['I', 'water', 'the flowers']),
      ],
    },
    {
      source: 'myGrammar p.11–12',
      title: 'Which one is written correctly? Look at the capital letter, the period, and the verb.',
      items: [
        writtenRight('🚚 🛑', 'The truck stops.', [
          'the truck stops.',
          'The truck stops',
          'The truck stop.',
        ]),
        writtenRight('🪟 👋', 'Mom waves at the window.', [
          'Mom wave at the window.',
          'mom waves at the window.',
          'Mom waves at the window',
        ]),
        writtenRight('🛏️', 'My brother wakes up early.', [
          'My brother wake up early.',
          'my brother wakes up early.',
          'My brother wakes up early',
        ]),
        writtenRight('🌷', 'I water the flowers.', [
          'I waters the flowers.',
          'i water the flowers.',
          'I water the flowers',
        ]),
      ],
    },
    {
      source: 'myGrammar p.13',
      title: 'Look at the picture of our school garden. Which sentence is written correctly?',
      items: [
        writtenRight(
          'A boy in glasses holds a red watering can over the plants.',
          'A boy waters the plants.',
          ['A boy water the plants.', 'a boy waters the plants.', 'A boy waters the plants'],
        ),
        writtenRight(
          'A girl in an apron works on the soil with a rake.',
          'A girl rakes the soil.',
          ['A girl rake the soil.', 'a girl rakes the soil.', 'A girl rakes the soil'],
        ),
        writtenRight(
          'A boy in a blue shirt puts a tomato plant in the ground.',
          'A boy plants tomatoes.',
          ['A boy plant tomatoes.', 'a boy plants tomatoes.', 'A boy plants tomatoes'],
        ),
        writtenRight(
          'A girl in a striped shirt makes a hole in the soil.',
          'A girl digs a hole.',
          ['A girl dig a hole.', 'a girl digs a hole.', 'A girl digs a hole'],
        ),
      ],
    },
    {
      source: 'myGrammar p.13',
      title: 'Look at the picture and write three sentences about it.',
      items: [
        write(
          'Our school garden: two boys, two girls, a watering can, a rake, tomatoes, sunflowers, carrots. Word bank: dig, plant, rake, water, hole, soil, tomatoes, seeds.',
          undefined,
          { lines: 3 },
        ),
      ],
    },
  ],
})
