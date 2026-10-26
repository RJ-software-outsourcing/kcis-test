import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, ItemInput, PartInput } from '../../../components/quiz/types'
import { choice, matches, order, select, write, yesNo } from '../helpers'

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
 * Every word from the workbook word lists (p.2 rule box, sort banks and picture
 * words; p.3 word bank and color-code grid; p.4 ① cards and ③ sort bank; p.5 ⑤ rows;
 * p.6 rule box, activity 1 and activity 4; p.9 Part C verbs; p.14 rule box and match
 * words; p.15–16 adjectives; p.17 noun table), interleaved so that two words in a row
 * are never the same kind.
 */
const kindWords: [string, WordKind][] = [
  ['dog', 'noun'], ['jump', 'verb'], ['school', 'noun'], ['red', 'adjective'],
  ['nurse', 'noun'], ['run', 'verb'], ['girl', 'noun'], ['happy', 'adjective'],
  ['park', 'noun'], ['ride', 'verb'], ['bus', 'noun'], ['tall', 'adjective'],
  ['teacher', 'noun'], ['read', 'verb'], ['boat', 'noun'], ['tiny', 'adjective'],
  ['cat', 'noun'], ['wave', 'verb'], ['banana', 'noun'], ['big', 'adjective'],
  ['store', 'noun'], ['swim', 'verb'], ['crayon', 'noun'], ['small', 'adjective'],
  ['boy', 'noun'], ['eat', 'verb'], ['peach', 'noun'], ['blue', 'adjective'],
  ['garden', 'noun'], ['stop', 'verb'], ['apartment', 'noun'], ['sad', 'adjective'],
  ['scooter', 'noun'], ['sing', 'verb'], ['library', 'noun'], ['green', 'adjective'],
  ['pencil', 'noun'], ['walk', 'verb'], ['playground', 'noun'], ['yellow', 'adjective'],
  ['bike', 'noun'], ['dig', 'verb'], ['flower', 'noun'], ['three', 'adjective'],
  ['hospital', 'noun'], ['swing', 'verb'], ['lion', 'noun'], ['beautiful', 'adjective'],
  ['giraffe', 'noun'], ['drive', 'verb'], ['baby', 'noun'], ['busy', 'adjective'],
  ['bird', 'noun'], ['sleep', 'verb'], ['apple', 'noun'], ['pretty', 'adjective'],
  ['mom', 'noun'], ['dance', 'verb'], ['dad', 'noun'], ['kick', 'verb'],
  ['house', 'noun'], ['draw', 'verb'], ['tree', 'noun'], ['sit', 'verb'],
  ['cupcake', 'noun'], ['listen', 'verb'], ['car', 'noun'], ['play', 'verb'],
]

/** Workbook sentences; the kind to find changes from item to item (noun, verb, adjective …). */
const findInSentence: ItemInput[] = [
  // myGrammar p.2 act 3 · p.8 A · p.14 act 1 · p.2 · p.6 act 3 · p.15 act 1 · p.2 · p.8 A
  tap('noun', 'The boy rides a bike.', ['boy', 'bike']),
  tap('verb', 'Dad cooks dinner for our family.', ['cooks']),
  tap('adjective', 'I ride my red bike.', ['red']),
  tap('noun', 'We play at the park.', ['park']),
  tap('verb', 'Henry rides his bike.', ['rides']),
  tap('adjective', 'A happy girl walks to school.', ['happy']),
  tap('noun', 'My neighbor has a dog.', ['neighbor', 'dog']),
  tap('verb', 'Cathy runs to school every morning.', ['runs']),
  // p.14 act 1 · p.2 · p.8 A · p.14 rule box · p.14 · p.6 · p.15 · p.3 paragraph
  tap('adjective', 'We play at the big playground.', ['big']),
  tap('noun', 'The bus stops near the store.', ['bus', 'store']),
  tap('verb', 'We visit the community center on Saturdays.', ['visit']),
  tap('adjective', 'The green tree is next to the tall building.', ['green', 'tall']),
  tap('noun', 'Mom has a blue bag.', ['Mom', 'bag']),
  tap('verb', 'Kids play at the park.', ['play']),
  tap('adjective', 'The tall tree stands near the busy road.', ['tall', 'busy']),
  tap(
    'noun',
    'My family walks to the community garden. We see flowers, birds, and a playground. A teacher rides a bike near the library.',
    ['family', 'garden', 'flowers', 'birds', 'playground', 'teacher', 'bike', 'library'],
    'Find them all!',
    ['community'],
  ),
  // p.6 act 3 · p.14 · p.8 A · p.7 paragraph · p.15 · p.8 A · p.6 · p.14
  tap('verb', 'Mom shops at the store.', ['shops']),
  tap('adjective', 'Mom has a blue bag.', ['blue']),
  tap('noun', 'Dad cooks dinner for our family.', ['Dad', 'dinner', 'family']),
  tap(
    'verb',
    'Henry rides around the block. He waves to his mom. Kids play in the sand. Big trucks push dirt down the street.',
    ['rides', 'waves', 'play', 'push'],
    '(There are 4 to find!)',
  ),
  tap('adjective', 'The red brick houses look beautiful.', ['red', 'beautiful'], '', ['brick']),
  tap('noun', 'The boys play tennis after school.', ['boys', 'tennis', 'school']),
  tap('verb', 'The bus stops at the corner.', ['stops']),
  tap('adjective', 'The small dog runs fast.', ['small']),
  // p.6 · p.8 A · p.15 · p.15 · p.8 A · p.7 paragraph · p.14 · p.8 B story
  tap('noun', 'Mom shops at the store.', ['Mom', 'store']),
  tap('verb', 'The boys play tennis after school.', ['play']),
  tap('adjective', 'My pretty teacher gives us fun homework.', ['pretty', 'fun']),
  tap('noun', 'The tall tree stands near the busy road.', ['tree', 'road']),
  tap('verb', 'She rides her bike in the park.', ['rides']),
  tap(
    'adjective',
    'Henry rides around the block. He waves to his mom. Kids play in the sand. Big trucks push dirt down the street.',
    ['Big'],
  ),
  tap('noun', 'The small dog runs fast.', ['dog']),
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

/** The answer is the picture's name, so 🔊 is off and the name is not read aloud. */
const pictureNoun = (picture: string, answer: string, others: string[]) =>
  choice('Tap the noun that matches the picture.', answer, others, {
    picture,
    noSpeak: true,
    reveal: `${picture} ${answer}`,
  })

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
        source: 'myGrammar p.2–9, 14–17',
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
      source: 'myGrammar p.2, 5',
      title: 'Look at the picture. Tap the noun that matches it.',
      columns: 2,
      items: [
        pictureNoun('🐶', 'dog', ['jump']),
        pictureNoun('🏫', 'school', ['run', 'jump', 'play']),
        pictureNoun('👧', 'girl', ['run']),
        pictureNoun('🐦', 'bird', ['sing', 'dog', 'swim']),
        pictureNoun('🏫', 'school', ['banana']),
        pictureNoun('🍎', 'apple', ['red', 'eat', 'banana']),
        pictureNoun('👧', 'girl', ['mom', 'happy', 'dad']),
      ],
    },
    {
      source: 'myGrammar p.6, 14',
      title: 'Match the word to the picture.',
      items: [
        ...matches({
          '🛝 a girl on a swing': 'swing',
          '👋 a girl waving her hand': 'wave',
          '🚴 a boy on his bike': 'ride',
          '🐕 a dog making a hole in the dirt': 'dig',
        }),
        ...matches({
          '🌳 a tree, up to the sky': 'tall',
          '🚚 a huge truck': 'big',
          '😄 a smiling girl, jumping': 'happy',
          '🐞 a little ladybug': 'tiny',
        }),
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
  choice('Mia ___ the ball in school.', 'kicks', ['kick']), // p.9 C
  choice('The ___ likes to go to school.', 'girl', ['playground', 'bike']), // p.3 act 1
  choice('We walk past the ___ apartment building.', 'tall', ['happy', 'three']), // p.15 act 2
  article('eagle', 'an'), // p.16 A
  choice('The kids ___ at the park after school.', 'play', ['shop']), // p.7 act 2
  choice('Which noun names the picture?', 'backpack', ['pencil', 'crayon'], {
    picture: '🎒',
    noSpeak: true,
  }), // p.5 ④
  article('park', 'a'), // p.14
  choice('The girl ___ a picture every day.', 'draws', ['draw']), // p.9 C
  choice('We play at the ___ after school.', 'playground', ['cat', 'girl']), // p.3
  article('chair', 'a'), // p.16
  choice('The ___ girl waves to her friends.', 'happy', ['three', 'green']), // p.15
  choice('Kids ___ at the park.', 'play', ['stops']), // p.11 act 3
  article('umbrella', 'an'), // p.14
  choice('The ___ and the ___ play in the park.', 'boy … girl', ['bus … store', 'run … jump'], {
    picture: '👦👧',
    fills: ['boy', 'girl'],
  }), // p.4 ②
  choice('The students ___ at their desks.', 'sit', ['sits']), // p.9 C
  article('lamp', 'a'), // p.16
  choice('Which noun names the picture?', 'fox', ['dog', 'cat'], {
    picture: '🦊',
    noSpeak: true,
  }), // p.5
  choice('Dad ___ his bike to work in the morning.', 'rides', ['waves']), // p.7
  article('tiny bug', 'a'), // p.14
  choice('My dad drives a ___ car.', 'red', ['happy', 'tall']), // p.15
  choice('The ___ sleeps on my bed every day.', 'cat', ['playground', 'bike']), // p.3
  choice('Ben ___ over the puddle.', 'jumps', ['jump']), // p.9 C
  article('elephant', 'an'), // p.16
  choice(
    'The picture shows a building full of books you can borrow. Which noun names it?',
    'library',
    ['school', 'store'],
  ), // p.5
  choice('We ___ our bikes.', 'ride', ['stops', 'play']), // p.11
  article('girl', 'a'), // p.14
  choice('I can ride a ___ on my street.', 'bike', ['playground', 'cat']), // p.3
  choice('I ___ to the funny story.', 'listen', ['listens']), // p.9 C
  article('flower', 'a'), // p.16
  choice('I see a ___ bug on the flower.', 'tiny', ['tall', 'three']), // p.15
  article('octopus', 'an'), // p.16
  choice('I saw a dog ___ along the street by my house.', 'run', ['push']), // p.7
  article('blue bag', 'a'), // p.14
  choice('Which noun names the picture?', 'banana', ['apple', 'peach'], {
    picture: '🍌',
    noSpeak: true,
  }), // p.5
  article('umbrella', 'an'), // p.16
  choice('The children ___ a yummy cake.', 'eat', ['eats']), // p.9 C
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
      title: 'Choose the word that fits. Is it a noun, a verb, a or an, or an adjective?',
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
