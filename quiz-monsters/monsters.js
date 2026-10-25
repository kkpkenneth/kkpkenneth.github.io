/********************************************************************
 * monsters.js
 * Expanded National Roster (Ordered by Pokédex No) & 180-Question Trivia Bank
 ********************************************************************/

const ELEMENT_TYPES = {
  NORMAL:   { id: 'NORMAL',   name: 'Normal',   subject: 'Logic & Linguistics', btnClass: 'bg-slate-500 hover:bg-slate-400 text-white', badgeClass: 'bg-slate-500' },
  FIRE:     { id: 'FIRE',     name: 'Fire',     subject: 'Chemistry & Energy',  btnClass: 'bg-orange-600 hover:bg-orange-500 text-white', badgeClass: 'bg-orange-600' },
  WATER:    { id: 'WATER',    name: 'Water',    subject: 'Earth & Hydrology',   btnClass: 'bg-blue-600 hover:bg-blue-500 text-white', badgeClass: 'bg-blue-600' },
  GRASS:    { id: 'GRASS',    name: 'Grass',    subject: 'Ecology & Botany',    btnClass: 'bg-emerald-600 hover:bg-emerald-500 text-white', badgeClass: 'bg-emerald-600' },
  ELECTRIC: { id: 'ELECTRIC', name: 'Electric', subject: 'Physics & Circuits',  btnClass: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold', badgeClass: 'bg-amber-500' },
  ICE:      { id: 'ICE',      name: 'Ice',      subject: 'Climatology',         btnClass: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold', badgeClass: 'bg-cyan-500' },
  FIGHTING: { id: 'FIGHTING', name: 'Fighting', subject: 'Kinesiology & Health',btnClass: 'bg-red-700 hover:bg-red-600 text-white', badgeClass: 'bg-red-700' },
  POISON:   { id: 'POISON',   name: 'Poison',   subject: 'Biochemistry & Nutrition', btnClass: 'bg-purple-700 hover:bg-purple-600 text-white', badgeClass: 'bg-purple-700' },
  GROUND:   { id: 'GROUND',   name: 'Ground',   subject: 'Geology & Earth',     btnClass: 'bg-yellow-700 hover:bg-yellow-600 text-white', badgeClass: 'bg-yellow-700' },
  FLYING:   { id: 'FLYING',   name: 'Flying',   subject: 'Aerodynamics',        btnClass: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold', badgeClass: 'bg-sky-500' },
  PSYCHIC:  { id: 'PSYCHIC',  name: 'Psychic',  subject: 'Neuroscience',        btnClass: 'bg-pink-600 hover:bg-pink-500 text-white', badgeClass: 'bg-pink-600' },
  BUG:      { id: 'BUG',      name: 'Bug',      subject: 'Entomology',          btnClass: 'bg-lime-600 hover:bg-lime-500 text-slate-950 font-bold', badgeClass: 'bg-lime-600' },
  ROCK:     { id: 'ROCK',     name: 'Rock',     subject: 'Mineralogy',          btnClass: 'bg-amber-800 hover:bg-amber-700 text-white', badgeClass: 'bg-amber-800' },
  GHOST:    { id: 'GHOST',    name: 'Ghost',    subject: 'Quantum & Cosmos',    btnClass: 'bg-indigo-900 hover:bg-indigo-800 text-white', badgeClass: 'bg-indigo-900' },
  DRAGON:   { id: 'DRAGON',   name: 'Dragon',   subject: 'Evolutionary Theory', btnClass: 'bg-blue-900 hover:bg-blue-800 text-white', badgeClass: 'bg-blue-900' },
  DARK:     { id: 'DARK',     name: 'Dark',     subject: 'Astronomy & Economics',btnClass: 'bg-zinc-800 hover:bg-zinc-700 text-white', badgeClass: 'bg-zinc-800' },
  STEEL:    { id: 'STEEL',    name: 'Steel',    subject: 'Materials Science',   btnClass: 'bg-slate-400 hover:bg-slate-300 text-slate-950 font-bold', badgeClass: 'bg-slate-400' },
  FAIRY:    { id: 'FAIRY',    name: 'Fairy',    subject: 'Mythology & Arts',    btnClass: 'bg-rose-400 hover:bg-rose-300 text-slate-950 font-bold', badgeClass: 'bg-rose-400' }
};

function getEffectiveness(atkType, defType) {
  const chart = {
    FIRE: { GRASS: 2, ICE: 2, BUG: 2, STEEL: 2, WATER: 0.5, FIRE: 0.5, ROCK: 0.5, DRAGON: 0.5 },
    WATER: { FIRE: 2, GROUND: 2, ROCK: 2, WATER: 0.5, GRASS: 0.5, DRAGON: 0.5 },
    GRASS: { WATER: 2, GROUND: 2, ROCK: 2, FIRE: 0.5, GRASS: 0.5, POISON: 0.5, FLYING: 0.5, BUG: 0.5, DRAGON: 0.5, STEEL: 0.5 },
    ELECTRIC: { WATER: 2, FLYING: 2, ELECTRIC: 0.5, GRASS: 0.5, DRAGON: 0.5, GROUND: 0 },
    ICE: { GRASS: 2, GROUND: 2, FLYING: 2, DRAGON: 2, FIRE: 0.5, WATER: 0.5, ICE: 0.5, STEEL: 0.5 },
    FIGHTING: { NORMAL: 2, ICE: 2, ROCK: 2, DARK: 2, STEEL: 2, POISON: 0.5, FLYING: 0.5, PSYCHIC: 0.5, BUG: 0.5, FAIRY: 0.5, GHOST: 0 },
    POISON: { GRASS: 2, FAIRY: 2, POISON: 0.5, GROUND: 0.5, ROCK: 0.5, GHOST: 0.5, STEEL: 0 },
    GROUND: { FIRE: 2, ELECTRIC: 2, POISON: 2, ROCK: 2, STEEL: 2, GRASS: 0.5, BUG: 0.5, FLYING: 0 },
    FLYING: { GRASS: 2, FIGHTING: 2, BUG: 2, ELECTRIC: 0.5, ROCK: 0.5, STEEL: 0.5 },
    PSYCHIC: { FIGHTING: 2, POISON: 2, PSYCHIC: 0.5, STEEL: 0.5, DARK: 0 },
    BUG: { GRASS: 2, PSYCHIC: 2, DARK: 2, FIRE: 0.5, FIGHTING: 0.5, POISON: 0.5, FLYING: 0.5, GHOST: 0.5, STEEL: 0.5, FAIRY: 0.5 },
    ROCK: { FIRE: 2, ICE: 2, FLYING: 2, BUG: 2, FIGHTING: 0.5, GROUND: 0.5, STEEL: 0.5 },
    GHOST: { PSYCHIC: 2, GHOST: 2, DARK: 0.5, NORMAL: 0 },
    DRAGON: { DRAGON: 2, STEEL: 0.5, FAIRY: 0 },
    DARK: { PSYCHIC: 2, GHOST: 2, FIGHTING: 0.5, DARK: 0.5, FAIRY: 0.5 },
    STEEL: { ICE: 2, ROCK: 2, FAIRY: 2, FIRE: 0.5, WATER: 0.5, ELECTRIC: 0.5, STEEL: 0.5 },
    FAIRY: { FIGHTING: 2, DRAGON: 2, DARK: 2, FIRE: 0.5, POISON: 0.5, STEEL: 0.5 }
  };
  if (chart[atkType] && chart[atkType][defType] !== undefined) {
    return chart[atkType][defType];
  }
  return 1.0;
}

// National Roster Ordered Strictly by Pokédex Number
const MONSTER_SPECIES = [
  { id: 'bulbasaur',  pokedexNo: 1,   name: 'BULBASAUR',  type: 'GRASS',    baseHp: 140, level: 12 },
  { id: 'venusaur',   pokedexNo: 3,   name: 'VENUSAUR',   type: 'GRASS',    baseHp: 190, level: 20 },
  { id: 'charmander', pokedexNo: 4,   name: 'CHARMANDER', type: 'FIRE',     baseHp: 135, level: 12 },
  { id: 'charizard',  pokedexNo: 6,   name: 'CHARIZARD',  type: 'FIRE',     baseHp: 190, level: 20 },
  { id: 'squirtle',   pokedexNo: 7,   name: 'SQUIRTLE',   type: 'WATER',    baseHp: 145, level: 12 },
  { id: 'blastoise',  pokedexNo: 9,   name: 'BLASTOISE',  type: 'WATER',    baseHp: 190, level: 20 },
  { id: 'caterpie',   pokedexNo: 10,  name: 'CATERPIE',   type: 'BUG',      baseHp: 120, level: 10 },
  { id: 'weedle',     pokedexNo: 13,  name: 'WEEDLE',     type: 'POISON',   baseHp: 118, level: 10 },
  { id: 'pidgey',     pokedexNo: 16,  name: 'PIDGEY',     type: 'FLYING',   baseHp: 125, level: 10 },
  { id: 'pidgeotto',  pokedexNo: 17,  name: 'PIDGEOTTO',  type: 'FLYING',   baseHp: 148, level: 15 },
  { id: 'rattata',    pokedexNo: 19,  name: 'RATTATA',    type: 'NORMAL',   baseHp: 115, level: 10 },
  { id: 'spearow',    pokedexNo: 21,  name: 'SPEAROW',    type: 'FLYING',   baseHp: 122, level: 10 },
  { id: 'ekans',      pokedexNo: 23,  name: 'EKANS',      type: 'POISON',   baseHp: 128, level: 11 },
  { id: 'pikachu',    pokedexNo: 25,  name: 'PIKACHU',    type: 'ELECTRIC', baseHp: 135, level: 14 },
  { id: 'raichu',     pokedexNo: 26,  name: 'RAICHU',     type: 'ELECTRIC', baseHp: 165, level: 18 },
  { id: 'sandshrew',  pokedexNo: 27,  name: 'SANDSHREW',  type: 'GROUND',   baseHp: 140, level: 13 },
  { id: 'nidoran_f',  pokedexNo: 29,  name: 'NIDORAN♀',   type: 'POISON',   baseHp: 135, level: 12 },
  { id: 'nidoran_m',  pokedexNo: 32,  name: 'NIDORAN♂',   type: 'POISON',   baseHp: 135, level: 12 },
  { id: 'clefairy',   pokedexNo: 35,  name: 'CLEFAIRY',   type: 'FAIRY',    baseHp: 150, level: 13 },
  { id: 'vulpix',     pokedexNo: 37,  name: 'VULPIX',     type: 'FIRE',     baseHp: 130, level: 13 },
  { id: 'jigglypuff', pokedexNo: 39,  name: 'JIGGLYPUFF', type: 'FAIRY',    baseHp: 160, level: 12 },
  { id: 'zubat',      pokedexNo: 41,  name: 'ZUBAT',      type: 'POISON',   baseHp: 125, level: 11 },
  { id: 'oddish',     pokedexNo: 43,  name: 'ODDISH',     type: 'GRASS',    baseHp: 132, level: 11 },
  { id: 'vileplume',  pokedexNo: 45,  name: 'VILEPLUME',  type: 'GRASS',    baseHp: 155, level: 16 },
  { id: 'paras',      pokedexNo: 46,  name: 'PARAS',      type: 'BUG',      baseHp: 128, level: 11 },
  { id: 'venonat',    pokedexNo: 48,  name: 'VENONAT',    type: 'BUG',      baseHp: 135, level: 12 },
  { id: 'diglett',    pokedexNo: 50,  name: 'DIGLETT',    type: 'GROUND',   baseHp: 110, level: 12 },
  { id: 'meowth',     pokedexNo: 52,  name: 'MEOWTH',     type: 'NORMAL',   baseHp: 125, level: 12 },
  { id: 'psyduck',    pokedexNo: 54,  name: 'PSYDUCK',    type: 'WATER',    baseHp: 140, level: 13 },
  { id: 'mankey',     pokedexNo: 56,  name: 'MANKEY',     type: 'FIGHTING', baseHp: 130, level: 13 },
  { id: 'primeape',   pokedexNo: 57,  name: 'PRIMEAPE',   type: 'FIGHTING', baseHp: 155, level: 16 },
  { id: 'growlithe',  pokedexNo: 58,  name: 'GROWLITHE',  type: 'FIRE',     baseHp: 145, level: 14 },
  { id: 'arcanine',   pokedexNo: 59,  name: 'ARCANINE',   type: 'FIRE',     baseHp: 175, level: 19 },
  { id: 'poliwag',    pokedexNo: 60,  name: 'POLIWAG',    type: 'WATER',    baseHp: 125, level: 12 },
  { id: 'abra',       pokedexNo: 63,  name: 'ABRA',       type: 'PSYCHIC',  baseHp: 120, level: 14 },
  { id: 'kadabra',    pokedexNo: 64,  name: 'KADABRA',    type: 'PSYCHIC',  baseHp: 145, level: 16 },
  { id: 'machop',     pokedexNo: 66,  name: 'MACHOP',     type: 'FIGHTING', baseHp: 150, level: 14 },
  { id: 'bellsprout', pokedexNo: 69,  name: 'BELLSPROUT', type: 'GRASS',    baseHp: 130, level: 12 },
  { id: 'tentacool',  pokedexNo: 72,  name: 'TENTACOOL',  type: 'WATER',    baseHp: 135, level: 13 },
  { id: 'geodude',    pokedexNo: 74,  name: 'GEODUDE',    type: 'ROCK',     baseHp: 145, level: 13 },
  { id: 'ponyta',     pokedexNo: 77,  name: 'PONYTA',     type: 'FIRE',     baseHp: 140, level: 14 },
  { id: 'slowpoke',   pokedexNo: 79,  name: 'SLOWPOKE',   type: 'PSYCHIC',  baseHp: 135, level: 13 },
  { id: 'magnemite',  pokedexNo: 81,  name: 'MAGNEMITE',  type: 'STEEL',    baseHp: 125, level: 13 },
  { id: 'farfetchd',  pokedexNo: 83,  name: 'FARFETCH\'D',type: 'FLYING',   baseHp: 132, level: 14 },
  { id: 'doduo',      pokedexNo: 84,  name: 'DODUO',      type: 'FLYING',   baseHp: 120, level: 11 },
  { id: 'seel',       pokedexNo: 86,  name: 'SEEL',       type: 'ICE',      baseHp: 125, level: 12 },
  { id: 'grimer',     pokedexNo: 88,  name: 'GRIMER',     type: 'POISON',   baseHp: 125, level: 12 },
  { id: 'shellder',   pokedexNo: 90,  name: 'SHELLDER',   type: 'WATER',    baseHp: 115, level: 12 },
  { id: 'gastly',     pokedexNo: 92,  name: 'GASTLY',     type: 'GHOST',    baseHp: 115, level: 12 },
  { id: 'gengar',     pokedexNo: 94,  name: 'GENGAR',     type: 'GHOST',    baseHp: 160, level: 18 },
  { id: 'onix',       pokedexNo: 95,  name: 'ONIX',       type: 'ROCK',     baseHp: 170, level: 17 },
  { id: 'drowzee',    pokedexNo: 96,  name: 'DROWZEE',    type: 'PSYCHIC',  baseHp: 125, level: 13 },
  { id: 'krabby',     pokedexNo: 98,  name: 'KRABBY',     type: 'WATER',    baseHp: 115, level: 11 },
  { id: 'voltorb',    pokedexNo: 100, name: 'VOLTORB',    type: 'ELECTRIC', baseHp: 120, level: 13 },
  { id: 'exeggcute',  pokedexNo: 102, name: 'EXEGGCUTE',  type: 'GRASS',    baseHp: 130, level: 13 },
  { id: 'cubone',     pokedexNo: 104, name: 'CUBONE',     type: 'GROUND',   baseHp: 135, level: 14 },
  { id: 'hitmonlee',  pokedexNo: 106, name: 'HITMONLEE',  type: 'FIGHTING', baseHp: 150, level: 16 },
  { id: 'hitmonchan', pokedexNo: 107, name: 'HITMONCHAN', type: 'FIGHTING', baseHp: 150, level: 16 },
  { id: 'lickitung',  pokedexNo: 108, name: 'LICKITUNG',  type: 'NORMAL',   baseHp: 155, level: 15 },
  { id: 'koffing',    pokedexNo: 109, name: 'KOFFING',    type: 'POISON',   baseHp: 125, level: 12 },
  { id: 'rhyhorn',    pokedexNo: 111, name: 'RHYHORN',    type: 'GROUND',   baseHp: 160, level: 15 },
  { id: 'chansey',    pokedexNo: 113, name: 'CHANSEY',    type: 'NORMAL',   baseHp: 200, level: 16 },
  { id: 'tangela',    pokedexNo: 114, name: 'TANGELA',    type: 'GRASS',    baseHp: 125, level: 14 },
  { id: 'kangaskhan', pokedexNo: 115, name: 'KANGASKHAN', type: 'NORMAL',   baseHp: 145, level: 16 },
  { id: 'horsea',     pokedexNo: 116, name: 'HORSEA',     type: 'WATER',    baseHp: 115, level: 12 },
  { id: 'goldeen',    pokedexNo: 118, name: 'GOLDEEN',    type: 'WATER',    baseHp: 120, level: 12 },
  { id: 'staryu',     pokedexNo: 120, name: 'STARYU',     type: 'WATER',    baseHp: 120, level: 13 },
  { id: 'mr_mime',    pokedexNo: 122, name: 'MR. MIME',   type: 'PSYCHIC',  baseHp: 140, level: 16 },
  { id: 'scyther',    pokedexNo: 123, name: 'SCYTHER',    type: 'BUG',      baseHp: 135, level: 16 },
  { id: 'jynx',       pokedexNo: 124, name: 'JYNX',       type: 'ICE',      baseHp: 130, level: 15 },
  { id: 'electabuzz', pokedexNo: 125, name: 'ELECTABUZZ', type: 'ELECTRIC', baseHp: 150, level: 17 },
  { id: 'magmar',     pokedexNo: 126, name: 'MAGMAR',     type: 'FIRE',     baseHp: 135, level: 16 },
  { id: 'pinsir',     pokedexNo: 127, name: 'PINSIR',     type: 'BUG',      baseHp: 135, level: 16 },
  { id: 'tauros',     pokedexNo: 128, name: 'TAUROS',     type: 'NORMAL',   baseHp: 140, level: 16 },
  { id: 'magikarp',   pokedexNo: 129, name: 'MAGIKARP',   type: 'WATER',    baseHp: 100, level: 5 },
  { id: 'gyarados',   pokedexNo: 130, name: 'GYARADOS',   type: 'WATER',    baseHp: 185, level: 20 },
  { id: 'lapras',     pokedexNo: 131, name: 'LAPRAS',     type: 'ICE',      baseHp: 175, level: 18 },
  { id: 'ditto',      pokedexNo: 132, name: 'DITTO',      type: 'NORMAL',   baseHp: 130, level: 14 },
  { id: 'eevee',      pokedexNo: 133, name: 'EEVEE',      type: 'NORMAL',   baseHp: 135, level: 14 },
  { id: 'porygon',    pokedexNo: 137, name: 'PORYGON',    type: 'NORMAL',   baseHp: 140, level: 16 },
  { id: 'omanyte',    pokedexNo: 138, name: 'OMANYTE',    type: 'ROCK',     baseHp: 135, level: 15 },
  { id: 'kabuto',     pokedexNo: 140, name: 'KABUTO',     type: 'ROCK',     baseHp: 135, level: 15 },
  { id: 'aerodactyl', pokedexNo: 142, name: 'AERODACTYL', type: 'ROCK',     baseHp: 170, level: 20 },
  { id: 'snorlax',    pokedexNo: 143, name: 'SNORLAX',    type: 'NORMAL',   baseHp: 195, level: 20 },
  { id: 'articuno',   pokedexNo: 144, name: 'ARTICUNO',   type: 'ICE',      baseHp: 185, level: 22 },
  { id: 'zapdos',     pokedexNo: 145, name: 'ZAPDOS',     type: 'ELECTRIC', baseHp: 185, level: 22 },
  { id: 'moltres',    pokedexNo: 146, name: 'MOLTRES',    type: 'FIRE',     baseHp: 165, level: 22 },
  { id: 'dratini',    pokedexNo: 147, name: 'DRATINI',    type: 'DRAGON',   baseHp: 130, level: 14 },
  { id: 'dragonite',  pokedexNo: 149, name: 'DRAGONITE',  type: 'DRAGON',   baseHp: 190, level: 24 },
  { id: 'mewtwo',     pokedexNo: 150, name: 'MEWTWO',     type: 'PSYCHIC',  baseHp: 175, level: 25 },
  { id: 'mew',        pokedexNo: 151, name: 'MEW',        type: 'PSYCHIC',  baseHp: 170, level: 25 },
  { id: 'lucario',    pokedexNo: 448, name: 'LUCARIO',    type: 'FIGHTING', baseHp: 185, level: 20 }
];

const DEFAULT_QUESTIONS = [
  // --- NORMAL (10 Questions) ---
  { type: 'NORMAL', difficulty: 1, q: 'What is the standard biological classification term for modern human beings?', options: ['Homo sapiens', 'Pan troglodytes', 'Canis lupus', 'Felis catus'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'In linguistics, what term describes a word that reads the same backward as forward?', options: ['Palindrome', 'Anagram', 'Homophone', 'Portmanteau'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'Which of the following is a traditional primary color in paint and pigment mixing?', options: ['Red', 'Orange', 'Green', 'Purple'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'How many permanent teeth does an average healthy adult human have, including wisdom teeth?', options: ['32', '28', '30', '34'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'How many letters are in the modern English alphabet?', options: ['26', '24', '28', '25'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'What literary term describes a word blending the sounds and meanings of two other words (e.g., "brunch")?', options: ['Portmanteau', 'Acronym', 'Euphemism', 'Idiom'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'Which of these animals is commonly known as man\'s best friend?', options: ['Dog', 'Cat', 'Hamster', 'Parrot'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'What figure of speech combines contradictory terms, such as "deafening silence"?', options: ['Oxymoron', 'Hyperbole', 'Metaphor', 'Onomatopoeia'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after January?', options: ['March', 'February', 'December', 'April'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after February?', options: ['April', 'January', 'March', 'May'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after March?', options: ['April', 'May', 'June', 'February'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after April?', options: ['June', 'March', 'July', 'May'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after May?', options: ['July', 'June', 'April', 'August'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after June?', options: ['May', 'August', 'July', 'September'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after July?', options: ['August', 'June', 'September', 'October'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after August?', options: ['October', 'November', 'July', 'September'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after September?', options: ['August', 'November', 'October', 'December'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after October?', options: ['December', 'November', 'September', 'January'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after November?', options: ['October', 'January', 'February', 'December'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after December?', options: ['January', 'February', 'November', 'March'], answer: 0 },

  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Monday?', options: ['Wednesday', 'Tuesday', 'Sunday', 'Thursday'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Tuesday?', options: ['Thursday', 'Monday', 'Wednesday', 'Friday'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Wednesday?', options: ['Tuesday', 'Friday', 'Saturday', 'Thursday'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Thursday?', options: ['Friday', 'Wednesday', 'Saturday', 'Monday'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Friday?', options: ['Sunday', 'Saturday', 'Thursday', 'Monday'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Saturday?', options: ['Friday', 'Monday', 'Sunday', 'Tuesday'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Sunday?', options: ['Tuesday', 'Saturday', 'Wednesday', 'Monday'], answer: 3 },

  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Spring?', options: ['Summer', 'Autumn', 'Winter', 'Fall'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Summer?', options: ['Winter', 'Spring', 'Autumn', 'Dry'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Autumn?', options: ['Spring', 'Summer', 'Monsoon', 'Winter'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Winter?', options: ['Summer', 'Spring', 'Autumn', 'Fall'], answer: 1 },
  { type: 'NORMAL', difficulty: 2, q: 'What is the term for a word that has the exact opposite meaning of another word?', options: ['Antonym', 'Synonym', 'Homonym', 'Acronym'], answer: 0 },

  // --- FIRE (10 Questions) ---
  { type: 'FIRE', difficulty: 1, q: 'What chemical process rapidly combines oxygen with materials, releasing heat and light?', options: ['Combustion', 'Oxidation', 'Reduction', 'Pyrolysis'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What is the most abundant gas found in Earths atmosphere?', options: ['Nitrogen', 'Oxygen', 'Argon', 'Carbon dioxide'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What scientific term describes a chemical reaction that absorbs heat from its surroundings?', options: ['Endothermic', 'Exothermic', 'Isothermal', 'Adiabatic'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'What element is essential for sustaining a fire and acts as the primary oxidizer?', options: ['Oxygen', 'Hydrogen', 'Helium', 'Nitrogen'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What state of matter is created when a gas is superheated until its atoms become ionized?', options: ['Plasma', 'Bose-Einstein condensate', 'Supercritical fluid', 'Solid'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'What color flame typically indicates the hottest part of a standard gas burner flame?', options: ['Blue', 'Red', 'Yellow', 'Orange'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What law states that the total energy of an isolated system is constant (cannot be created or destroyed)?', options: ['First Law of Thermodynamics', 'Second Law of Thermodynamics', 'Third Law', 'Boyle\'s Law'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'What common household safety device detects smoke and products of combustion?', options: ['Smoke detector', 'Thermometer', 'Barometer', 'Hygrometer'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What temperature scale has its zero point at absolute zero?', options: ['Kelvin', 'Celsius', 'Fahrenheit', 'Rankine'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'Which fossil fuel is a flammable gas primarily composed of methane?', options: ['Natural gas', 'Coal', 'Propane', 'Petroleum'], answer: 0 },

  // --- WATER (10 Questions) ---
  { type: 'WATER', difficulty: 1, q: 'Approximately what percentage of Earths surface is covered by oceans?', options: ['71%', '50%', '85%', '60%'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'What is the standard chemical formula for pure water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What scientific term describes the movement of water molecules across a semipermeable membrane?', options: ['Osmosis', 'Diffusion', 'Active transport', 'Filtration'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'At standard atmospheric pressure, what is the boiling point of pure water in Celsius?', options: ['100°C', '0°C', '212°C', '50°C'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What global ocean circulation pattern is driven by differences in water temperature and salinity?', options: ['Thermohaline circulation', 'Coriolis drift', 'Upwelling', 'Tidal current'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'What phase change occurs when liquid water turns into water vapor?', options: ['Evaporation', 'Condensation', 'Freezing', 'Sublimation'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What is the term for an underground layer of water-bearing permeable rock or sediment?', options: ['Aquifer', 'Reservoir', 'Estuary', 'Watershed'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'What term describes precipitation in the form of lumps or balls of ice?', options: ['Hail', 'Sleet', 'Snow', 'Dew'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What coastal body of water has a free connection to the open sea, where fresh water meets salt water?', options: ['Estuary', 'Fjord', 'Lagoon', 'Atoll'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'What is the primary force responsible for ocean tides on Earth?', options: ['Moon\'s gravitational pull', 'Wind velocity', 'Earth\'s magnetic field', 'Solar radiation'], answer: 0 },

  // --- GRASS (10 Questions) ---
  { type: 'GRASS', difficulty: 1, q: 'What primary green pigment do plants use to absorb light energy for photosynthesis?', options: ['Chlorophyll', 'Carotene', 'Xanthophyll', 'Anthocyanin'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What gas do plants primarily take in from the atmosphere during photosynthesis?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What vascular plant tissue is responsible for transporting water and dissolved minerals upward from roots?', options: ['Xylem', 'Phloem', 'Cortex', 'Cambium'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What plant organ is primarily responsible for anchoring the plant and absorbing water and nutrients?', options: ['Roots', 'Leaves', 'Stems', 'Flowers'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What term describes the stable final community stage in ecological succession?', options: ['Climax community', 'Pioneer community', 'Seral community', 'Biizing community'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What structural green cellular feature gives plant cells rigidity and protection?', options: ['Cell wall', 'Cell membrane', 'Nucleus', 'Ribosome'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What vascular tissue in plants distributes sugars and organic compounds produced by photosynthesis?', options: ['Phloem', 'Xylem', 'Pith', 'Epidermis'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What are the tiny pores on plant leaves that allow gas exchange called?', options: ['Stomata', 'Chloroplasts', 'Lenticels', 'Vili'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What symbiotic relationship occurs between plant roots and specialized fungi that aid nutrient absorption?', options: ['Mycorrhiza', 'Lichens', 'Rhizome', 'Mycelium'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What plant reproductive structure contains seeds enclosed within a fruit?', options: ['Angiosperm flower', 'Gymnosperm cone', 'Spore', 'Fern frond'], answer: 0 },

  // --- ELECTRIC (10 Questions) ---
  { type: 'ELECTRIC', difficulty: 1, q: 'What electrical unit measures the rate of flow of electric charge (current)?', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What passive electronic component is used to store electrical energy in an electric field?', options: ['Capacitor', 'Resistor', 'Transistor', 'Inductor'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'According to Ohm\'s law, voltage equals current multiplied by what?', options: ['Resistance', 'Capacitance', 'Inductance', 'Frequency'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What subatomic particle carries a negative electric charge?', options: ['Electron', 'Proton', 'Neutron', 'Positron'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'What semiconductor device is primarily used to amplify or switch electrical signals and power?', options: ['Transistor', 'Diode', 'Transformer', 'Fuse'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What instrument is used to measure electrical potential difference (voltage)?', options: ['Voltmeter', 'Ammeter', 'Ohmmeter', 'Wattmeter'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'What electrical law states that the total current entering a junction must equal the total current leaving it?', options: ['Kirchhoff\'s Current Law', 'Ohm\'s Law', 'Coulomb\'s Law', 'Faraday\'s Law'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What material allows electrical current to flow through it easily?', options: ['Conductor', 'Insulator', 'Semiconductor', 'Dielectric'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'What unit measures electrical power, representing one joule per second?', options: ['Watt', 'Joule', 'Volt', 'Ampere'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What safety device contains a thin wire that melts when current exceeds a safe limit?', options: ['Fuse', 'Resistor', 'Capacitor', 'Transistor'], answer: 0 },

  // --- ICE (10 Questions) ---
  { type: 'ICE', difficulty: 1, q: 'At what temperature in Celsius does pure water freeze at standard atmospheric pressure?', options: ['0°C', '32°C', '-10°C', '4°C'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What scientific term describes the direct phase transition from a solid directly into a gas?', options: ['Sublimation', 'Condensation', 'Deposition', 'Melting'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'What massive body of dense ice constantly moves under its own weight?', options: ['Glacier', 'Iceberg', 'Tundra', 'Permafrost'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What term describes ground that remains at or below 0°C for two or more consecutive years?', options: ['Permafrost', 'Glacial till', 'Sleet', 'Pack ice'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'What is a large piece of freshwater ice that has broken off a glacier and floats in open water called?', options: ['Iceberg', 'Floe', 'Glacier', 'Shelf'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What crystal structure does ordinary water ice form at standard atmospheric pressure?', options: ['Hexagonal', 'Cubic', 'Tetragonal', 'Orthorhombic'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'What winter sport involves sliding across ice using specialized footwear with metal blades?', options: ['Ice skating', 'Skiing', 'Snowshoeing', 'Curling'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What is the name of the geological epoch characterized by repeated glacial expansion (the Ice Age)?', options: ['Pleistocene', 'Holocene', 'Miocene', 'Cretaceous'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'Which polar region contains the vast majority of Earths glacial ice?', options: ['Antarctica', 'The Arctic', 'Greenland only', 'Siberia'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What term refers to the phase change where water vapor turns directly into ice without becoming liquid?', options: ['Deposition (Desublimation)', 'Sublimation', 'Condensation', 'Evaporation'], answer: 0 },

  // --- FIGHTING (10 Questions) ---
  { type: 'FIGHTING', difficulty: 1, q: 'Which human body system is primarily responsible for voluntary movement and posture?', options: ['Muscular system', 'Digestive system', 'Endocrine system', 'Lymphatic system'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What high-energy molecule stores and transports chemical energy within cellular structures?', options: ['ATP (Adenosine triphosphate)', 'DNA', 'RNA', 'Glucose'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'What tough fibrous connective tissue connects skeletal muscles to bones?', options: ['Tendon', 'Ligament', 'Cartilage', 'Joint'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What specialized protein filaments slide past each other during muscle contraction?', options: ['Actin and Myosin', 'Keratin and Collagen', 'Hemoglobin and Albumin', 'Insulin and Glucagon'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'What fibrous connective tissue connects bones to other bones at joints?', options: ['Ligament', 'Tendon', 'Fascia', 'Cartilage'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What mineral ion is critically required inside muscle cells to trigger contraction?', options: ['Calcium (Ca2+)', 'Sodium (Na+)', 'Potassium (K+)', 'Iron (Fe)'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'What type of muscle tissue forms the walls of the human heart?', options: ['Cardiac muscle', 'Skeletal muscle', 'Smooth muscle', 'Striated muscle'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What aerobic metabolic process generates ATP inside cellular mitochondria using oxygen?', options: ['Cellular respiration (Oxidative phosphorylation)', 'Glycolysis only', 'Fermentation', 'Lactic acid pathway'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'Which organ system provides structural support, protection, and blood cell production?', options: ['Skeletal system', 'Nervous system', 'Integumentary system', 'Respiratory system'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What chemical byproduct builds up in skeletal muscle tissue during strenuous anaerobic exercise?', options: ['Lactic acid (Lactate)', 'Uric acid', 'Citric acid', 'Carbonic acid'], answer: 0 },

  // --- POISON (10 Deficiency Questions) ---
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks vitamin C?', options: ['Scurvy', 'Rickets', 'Beriberi', 'Anemia'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks vitamin D?', options: ['Rickets', 'Scurvy', 'Pellagra', 'Goiter'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks thiamine (vitamin B1)?', options: ['Beriberi', 'Scurvy', 'Night blindness', 'Kwashiorkor'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks niacin (vitamin B3)?', options: ['Pellagra', 'Scurvy', 'Rickets', 'Anemia'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks vitamin A?', options: ['Night blindness', 'Scurvy', 'Rickets', 'Goiter'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks iron?', options: ['Anemia', 'Scurvy', 'Goiter', 'Beriberi'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks iodine?', options: ['Goiter', 'Anemia', 'Scurvy', 'Rickets'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks dietary protein?', options: ['Kwashiorkor', 'Scurvy', 'Beriberi', 'Rickets'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks calcium?', options: ['Osteoporosis', 'Anemia', 'Scurvy', 'Beriberi'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks vitamin K?', options: ['Bleeding disorders (impaired clotting)', 'Scurvy', 'Rickets', 'Night blindness'], answer: 0 },

  // --- GROUND (10 Questions) ---
  { type: 'GROUND', difficulty: 1, q: 'What is the outermost solid shell or skin of a rocky planet called?', options: ['Crust', 'Mantle', 'Core', 'Magma'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What scientific theory describes the large-scale motion of Earths lithosphere plates?', options: ['Plate tectonics', 'Continental drift only', 'Seafloor spreading', 'Isostasy'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'What dense, hot layer of Earth sits directly beneath the crust and above the core?', options: ['Mantle', 'Atmosphere', 'Lithosphere', 'Biosphere'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What scale is used to quantify the magnitude or energy released by an earthquake?', options: ['Moment magnitude scale (Richter scale)', 'Mercalli scale', 'Mohs scale', 'Fujita scale'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'Molten or semi-molten rock located beneath the surface of a terrestrial planet is called what?', options: ['Magma', 'Lava', 'Ash', 'Basalt'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What boundary type occurs where tectonic plates move apart from one another?', options: ['Divergent boundary', 'Convergent boundary', 'Transform fault', 'Subduction zone'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'What is molten rock called once it erupts onto Earths surface?', options: ['Lava', 'Magma', 'Pumice', 'Tuff'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What term describes the geological process where one tectonic plate moves under another and sinks into the mantle?', options: ['Subduction', 'Accretion', 'Orogeny', 'Faulting'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'What branch of science deals with the solid Earth, the rocks of which it is composed, and the processes by which they change?', options: ['Geology', 'Meteorology', 'Astronomy', 'Oceanography'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What geological term refers to the formation of mountain ranges, typically via tectonic plate compression?', options: ['Orogeny', 'Erosion', 'Sedimentation', 'Weathering'], answer: 0 },

  // --- FLYING (10 Questions) ---
  { type: 'FLYING', difficulty: 1, q: 'What physical aerodynamic force counteracts gravity to allow an aircraft or bird to rise?', options: ['Lift', 'Drag', 'Thrust', 'Inertia'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What lowest layer of Earths atmosphere is where weather phenomena occur?', options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What forward force propels an aircraft or bird through the air, overcoming aerodynamic drag?', options: ['Thrust', 'Lift', 'Gravity', 'Friction'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What atmospheric layer sits directly above the troposphere and contains the ozone layer?', options: ['Stratosphere', 'Troposphere', 'Thermosphere', 'Exosphere'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What aerodynamic resistance force slows down an object moving through a fluid or gas?', options: ['Drag (Air resistance)', 'Lift', 'Thrust', 'Gravity'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What apparent force deflects moving objects (like winds and ocean currents) due to Earths rotation?', options: ['Coriolis effect', 'Centrifugal force', 'Centripetal force', 'Gravitational pull'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What winged vertebrate class includes birds, which are uniquely adapted for flight?', options: ['Aves (Birds)', 'Mammalia', 'Reptilia', 'Amphibia'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What principle states that an increase in the speed of a fluid occurs simultaneously with a decrease in pressure?', options: ['Bernoulli\'s principle', 'Archimedes\' principle', 'Pascal\'s law', 'Newton\'s third law'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What natural flying mammals belong to the order Chiroptera?', options: ['Bats', 'Flying squirrels', 'Gliding possums', 'Birds'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What atmospheric phenomenon features powerful, narrow meandering air currents high in the atmosphere?', options: ['Jet stream', 'Trade winds', 'Monsoon', 'Doldrums'], answer: 0 },

  // --- PSYCHIC (10 Questions) ---
  { type: 'PSYCHIC', difficulty: 1, q: 'Which lobe of the human brain is primarily responsible for reasoning, motor control, and higher executive function?', options: ['Frontal lobe', 'Occipital lobe', 'Cerebellum', 'Brainstem'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What microscopic gap allows neurons to transmit chemical neurotransmitter signals to adjacent cells?', options: ['Synapse', 'Axon', 'Dendrite', 'Myelin sheath'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'What central nervous system organ serves as the main control center for the human body?', options: ['Brain', 'Spinal cord', 'Heart', 'Liver'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What lobe of the brain is primarily responsible for processing visual information?', options: ['Occipital lobe', 'Temporal lobe', 'Parietal lobe', 'Frontal lobe'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'What long, slender nerve fiber conducts electrical impulses away from a neuron\'s cell body?', options: ['Axon', 'Dendrite', 'Synapse', 'Neuron'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What insulating fatty substance surrounds nerve cell axons to speed up electrical impulse transmission?', options: ['Myelin', 'Plasma', 'Collagen', 'Keratin'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'What branch-like structures of a neuron receive electrical signals from other neurons?', options: ['Dendrites', 'Axons', 'Synapses', 'Soma'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What part of the brain coordinates voluntary muscular movements, balance, and posture?', options: ['Cerebellum', 'Cerebrum', 'Thalamus', 'Hypothalamus'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'What specialized chemical messengers transmit signals across a synapse between neurons?', options: ['Neurotransmitters', 'Hormones', 'Enzymes', 'Antibodies'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What limbic structure deeply embedded within the temporal lobe plays a major role in memory and emotion?', options: ['Hippocampus', 'Amygdala', 'Medulla', 'Pons'], answer: 0 },

  // --- BUG (10 Questions) ---
  { type: 'BUG', difficulty: 1, q: 'What are the three main body segments of a typical adult insect?', options: ['Head, thorax, abdomen', 'Head, torso, tail', 'Cervix, chest, pelvis', 'Exoskeleton, wings, legs'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What biological process transforms an insect through distinct developmental stages from larva to adult?', options: ['Metamorphosis', 'Mitosis', 'Meiosis', 'Osmosis'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'How many jointed legs do adult insects possess as a defining physical characteristic?', options: ['6', '8', '4', '10'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What tough, protective external skeleton composed of chitin do arthropods possess?', options: ['Exoskeleton', 'Endoskeleton', 'Shell', 'Carapace'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'What class of invertebrate animals includes insects, spiders, and crustaceans?', options: ['Arthropods', 'Mollusks', 'Annelids', 'Echinoderms'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What specialized breathing organs do insects use to take in oxygen directly from the air?', options: ['Tracheae / Spiracles', 'Gills', 'Lungs', 'Book lungs'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'What social insects live in large colonies and are famous for building complex nests and producing honey?', options: ['Honeybees', 'Wasps', 'Termites', 'Ants'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What is the immature, caterpillar-like feeding stage of complete metamorphosis in insects called?', options: ['Larva', 'Nymph', 'Pupa', 'Imago'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'What protective resting stage sits between the larval and adult forms in complete metamorphosis (e.g., a chrysalis)?', options: ['Pupa', 'Larva', 'Nymph', 'Egg'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What biological structural polysaccharide gives insect exoskeletons their tough, resilient properties?', options: ['Chitin', 'Cellulose', 'Glycogen', 'Keratin'], answer: 0 },

  // --- ROCK (10 Questions) ---
  { type: 'ROCK', difficulty: 1, q: 'What category of rock is formed by the cooling and solidification of molten magma or lava?', options: ['Igneous', 'Sedimentary', 'Metamorphic', 'Fossiliferous'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What standard geological scale characterizes the scratch resistance of various minerals?', options: ['Mohs scale', 'Richter scale', 'Fujita scale', 'Kelvin scale'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What category of rock is formed from the accumulation and cementation of mineral or organic particles over time?', options: ['Sedimentary', 'Igneous', 'Metamorphic', 'Basaltic'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What geological process transforms existing rocks under intense heat and pressure into new rock types?', options: ['Metamorphism', 'Weathering', 'Erosion', 'Melting'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What is the most abundant mineral found in Earths continental crust, composed of silicon and oxygen?', options: ['Quartz', 'Feldspar', 'Calcite', 'Mica'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What common sedimentary rock is formed primarily from the accumulation of microscopic skeletal remains of marine organisms?', options: ['Limestone', 'Sandstone', 'Shale', 'Conglomerate'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What igneous rock is dark-colored, fine-grained, and forms the primary constituent of oceanic crust?', options: ['Basalt', 'Granite', 'Pumice', 'Obsidian'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What mineral is rated as a 10 (the hardest) on the Mohs hardness scale?', options: ['Diamond', 'Corundum', 'Topaz', 'Quartz'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What coarse-grained intrusive igneous rock is widely used for monuments and countertops?', options: ['Granite', 'Basalt', 'Obsidian', 'Slate'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What cyclic geological model describes how rocks transition between igneous, sedimentary, and metamorphic states?', options: ['The Rock Cycle', 'Plate Tectonics', 'Hydrologic Cycle', 'Carbon Cycle'], answer: 0 },

  // --- GHOST (10 Questions) ---
  { type: 'GHOST', difficulty: 1, q: 'In cosmology, what invisible form of matter accounts for approximately 85% of the universe\'s total mass?', options: ['Dark matter', 'Antimatter', 'Baryonic matter', 'Plasma'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What theoretical massless particle is hypothesized in physics to mediate the force of gravity?', options: ['Graviton', 'Photon', 'Gluon', 'Boson'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'What type of subatomic particle has an identical mass to an ordinary particle but opposite electric charge?', options: ['Antiparticle (Antimatter)', 'Neutron', 'Photon', 'Neutrino'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What ghostly, nearly massless subatomic particle interacts very weakly with normal matter?', options: ['Neutrino', 'Electron', 'Proton', 'Quark'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'What phenomenon occurs when matter and antimatter collide, completely converting mass into energy?', options: ['Annihilation', 'Fission', 'Fusion', 'Ionization'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'In quantum mechanics, what phenomenon describes particles remaining interconnected regardless of distance?', options: ['Quantum entanglement', 'Superposition', 'Tunneling', 'Wave-particle duality'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'What celestial remnant is an extremely dense collapsed core of a massive supergiant star?', options: ['Neutron star', 'Red giant', 'White dwarf', 'Protostar'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What quantum physics principle states that a system can exist in multiple states simultaneously until observed?', options: ['Quantum superposition', 'Heisenberg uncertainty', 'Pauli exclusion', 'Quantum tunneling'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'What type of high-energy electromagnetic radiation is produced by radioactive decay and cosmic events?', options: ['Gamma rays', 'X-rays', 'Ultraviolet', 'Infrared'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What theoretical concept describes bridges through spacetime that could connect distant points in the universe?', options: ['Wormhole (Einstein-Rosen bridge)', 'Black hole', 'Event horizon', 'Singularity'], answer: 0 },

  // --- DRAGON (10 Questions) ---
  { type: 'DRAGON', difficulty: 1, q: 'What major group of extinct reptiles dominated terrestrial ecosystems during the Mesozoic era?', options: ['Dinosaurs', 'Mammoths', 'Amphibians', 'Trilobites'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What biological macromolecules carry hereditary genetic information essential for all cellular life?', options: ['Nucleic acids (DNA/RNA)', 'Proteins', 'Carbohydrates', 'Lipids'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What geological era is commonly known as the Age of Reptiles or Age of Dinosaurs?', options: ['Mesozoic era', 'Paleozoic era', 'Cenozoic era', 'Precambrian'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What scientific term describes animals (like reptiles and dinosaurs) whose body temperature depends on external sources?', options: ['Ectotherm (Cold-blooded)', 'Endotherm', 'Homeotherm', 'Marsupial'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What famous massive carnivorous dinosaur lived during the late Cretaceous period?', options: ['Tyrannosaurus rex', 'Stegosaurus', 'Triceratops', 'Brachiosaurus'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What evolutionary theory proposes that modern birds are direct descendants of a group of two-legged dinosaurs?', options: ['Theropod dinosaur ancestry', 'Mammalian convergence', 'Pterosaur evolution', 'Amphibian divergence'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What large marine reptiles lived alongside dinosaurs in Mesozoic oceans but were technically not dinosaurs?', options: ['Plesiosaurs / Ichthyosaurs', 'Whales', 'Sharks', 'Crocodiles'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What catastrophic global event at the end of the Cretaceous period caused the extinction of non-avian dinosaurs?', options: ['An asteroid impact (Chicxulub impact)', 'Massive global glaciation', 'Supervolcano eruption only', 'Solar flare'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What living reptile group is considered the closest surviving evolutionary relative to crocodiles and birds?', options: ['Alligators / Crocodilians', 'Snakes', 'Lizards', 'Turtles'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What nitrogenous base pairs form the rungs of the DNA double helix structure?', options: ['Adenine, Thymine, Cytosine, Guanine', 'Carbon, Hydrogen, Oxygen, Nitrogen', 'Glucose, Fructose, Sucrose', 'Amino acids'], answer: 0 },

  // --- DARK (10 Questions) ---
  { type: 'DARK', difficulty: 1, q: 'In astronomy, what region of spacetime exhibits gravitational attraction so strong that nothing can escape?', options: ['Black hole', 'Pulsar', 'Quasar', 'Supernova'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What mysterious repulsive force is driving the current accelerated expansion of the universe?', options: ['Dark energy', 'Solar wind', 'Magnetic flux', 'Centrifugal force'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What boundary surrounding a black hole marks the point of no return for light and matter?', options: ['Event horizon', 'Singularity', 'Accretion disk', 'Photon sphere'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What theoretical radiation is predicted to be thermally emitted by black holes?', options: ['Hawking radiation', 'Cherenkov radiation', 'Synchrotron radiation', 'Cosmic microwave background'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What is the infinitely dense central point of a black hole called?', options: ['Gravitational singularity', 'Event horizon', 'Core', 'Pulsar'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What type of extremely dense rotating neutron star emits regular pulses of electromagnetic radiation?', options: ['Pulsar', 'Quasar', 'Magnetar', 'Supergiant'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What term describes the celestial phenomenon where a massive star explodes at the end of its life cycle?', options: ['Supernova', 'Nebula', 'Eclipse', 'Flares'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What extremely luminous active galactic nucleus is powered by a supermassive black hole?', options: ['Quasar', 'Pulsar', 'Magnetar', 'Binary star'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What interstellar cloud of dust, hydrogen, helium, and ionized gases is often a birthplace of stars?', options: ['Nebula', 'Galaxy', 'Cluster', 'Asteroid belt'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What theoretical dense star is composed entirely of closely packed neutrons resulting from gravitational collapse?', options: ['Neutron star', 'White dwarf', 'Brown dwarf', 'Black dwarf'], answer: 0 },

  // --- STEEL (10 Questions) ---
  { type: 'STEEL', difficulty: 1, q: 'Steel is an industrial alloy primarily composed of iron combined with which chemical element?', options: ['Carbon', 'Copper', 'Zinc', 'Aluminum'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What mechanical property describes a material\'s ability to deform under tensile stress without fracturing?', options: ['Ductility', 'Brittleness', 'Hardness', 'Density'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'What metal is alloyed with iron and chromium to create corrosion-resistant stainless steel?', options: ['Chromium', 'Gold', 'Lead', 'Mercury'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What metallurgical heat treatment process involves heating steel and cooling it rapidly to increase hardness?', options: ['Quenching', 'Annealing', 'Tempering', 'Smelting'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'What is the chemical symbol for the metal iron?', options: ['Fe', 'Ir', 'In', 'I'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What mechanical property measures a material\'s resistance to permanent indentation or scratching?', options: ['Hardness', 'Toughness', 'Elasticity', 'Mallability'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'What term describes a mixture of two or more metallic elements to enhance desirable properties?', options: ['Alloy', 'Compound', 'Solution', 'Ore'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What industrial process extracts usable metal from raw mineral ore using heat and chemical reduction?', options: ['Smelting', 'Forging', 'Casting', 'Extrusion'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'What is the most widely used structural metal in human construction and manufacturing?', options: ['Iron / Steel', 'Aluminum', 'Copper', 'Titanium'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What metallurgical process reheats quenched steel to a lower temperature to relieve internal stress and increase toughness?', options: ['Tempering', 'Quenching', 'Annealing', 'Galvanizing'], answer: 0 },

  // --- FAIRY (10 Questions) ---
  { type: 'FAIRY', difficulty: 1, q: 'In European folklore and mythology, what legendary diminutive spirits are traditionally associated with nature and woodlands?', options: ['Fae / Pixies', 'Goblins', 'Trolls', 'Ogres'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'In literature, what narrative technique uses symbolic fictional characters and events to express a deeper moral meaning?', options: ['Allegory', 'Metaphor', 'Hyperbole', 'Oxymoron'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'What classic folklore genre features magical creatures, royalty, spells, and mythical transformations?', options: ['Fairy tale', 'Sci-fi thriller', 'Historical drama', 'Biographical essay'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'What literary device assigns human emotions, traits, or intentions to non-human objects or nature?', options: ['Anthropomorphism (Personification)', 'Alliteration', 'Simile', 'Irony'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'In mythology, what winged magical humanoid creature is often depicted granting wishes or bestowing enchantments?', options: ['Fairy / Pixie', 'Vampire', 'Zombie', 'Cyclops'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'What traditional folklore term describes a ring of mushrooms that supernatural beings were believed to dance inside?', options: ['Fairy ring', 'Stone circle', 'Witches\' sabbath', 'Labyrinth'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'What famous Danish author wrote classic fairy tales such as "The Little Mermaid" and "The Ugly Duckling"?', options: ['Hans Christian Andersen', 'Brothers Grimm', 'Charles Perrault', 'J.R.R. Tolkien'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'What folkloric term describes a malicious supernatural being or mischief-maker often living underground or in forests?', options: ['Goblin / Imp', 'Angel', 'Titan', 'Sphinx'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'What traditional German brothers compiled and published famous folklore collections including Cinderella and Snow White?', options: ['Brothers Grimm', 'Brothers Wright', 'Brothers Marx', 'Brothers Lumière'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'What term describes traditional stories passed down orally within a specific culture before being written down?', options: ['Folklore / Oral tradition', 'Primary sources', 'Academic thesis', 'Legal statute'], answer: 0 }
];

const DEFAULT_MONSTER_PIXELS = {
  bulbasaur: { palette: { p: '#22c55e', d: '#15803d', l: '#86efac', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".........dd.....","........dddd....","...p...pdddd....","...ppppppppl....","...bppbpplpp....","...ppppppppp....","........p..p....","................","................","................","................"
  ]},
  charmander: { palette: { p: '#f97316', d: '#c2410c', l: '#fdba74', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","................","................",".....pppppp.....",".....pbppbp.....",".....pppppp..s..",".......ppppp.d..","......ppppp..l..",".......pllp..p..",".......pllp.p...",".......pllppp...",".......p..p.....","................","................","................"
  ]},
  squirtle: { palette: { p: '#3b82f6', d: '#a16207', l: '#93c5fd', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","......pppppp....","......pppppp....","......bppppb....","......pppppp....",".....pssssssp...",".....dssssssd...",".....dssssssd...",".....dssssssd...",".....dssssssd...","......p....p....","................","................","................"
  ]},
  caterpie: { palette: { p: '#84cc16', d: '#4d7c0f', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",
      "................",
      "................",
      "....s.s.........",
      "....sss.........",
      "...ppsppp.......",
      "...blppbl.......",
      "...blppbl.......",
      "...pddppp.......",
      "....ddpdd..p....",
      ".....llldd.p....",
      "......llpddp....",
      ".......lllpp....",
      "................",
      "................",
      "................"
  ]},
  weedle: { palette: { p: '#eab308', d: '#a16207', l: '#fef08a', s: '#dc2626', b: '#0f172a' }, grid: [
    "................","................","......ll........","......ll........","....pppppp......","....bpsspb......","....ppsspp......","....pppppp......","......ppp.......","......ppp...l...",".......ppp..p...",".......pppppp...",".........ppp....","................","................","................"
  ]},
  pidgey: { palette: { p: '#a16207', d: '#713f12', l: '#fef08a', s: '#f97316', b: '#0f172a' }, grid: [
    "................","................","................",".......pp.......",".....lppppl.....",".....lppppl.....",".dppppbppbppppd.","..dppplpplpppd..","...dpplsllppd...","....ddllllpd....",".....dddddd.....","......d..d......","......s..s......","................","................","................"
  ]},
  pidgeotto: { palette: { p: '#a16207', d: '#ef4444', l: '#fef08a', s: '#f97316', b: '#0f172a' }, grid: [
    "................",".....dddddd.....","....dddddddd....","....lppppppl....","....lpbppbp.....",".pppppppspppppp.",".ppppplllllpppp.","..pppplllllppp..","...ppplllllpp...","....dddddddddd..",".....d..d..dd...",".....s..s.......","................","................","................","................"
  ]},
  rattata: { palette: { p: '#a855f7', d: '#6b21a8', l: '#f3e8ff', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","................","................","..........ppp...","..pp..pp..ppp...","..pp..pp....p...","..bpppbp....p...","..ldppppppppp...","..llllppppppp...","...p...pppppp...","...p...p...pp...","................","................","................","................","................"
  ]},
  spearow: { palette: { p: '#b45309', d: '#78350f', l: '#fde68a', s: '#dc2626', b: '#0f172a' }, grid: [
    "................","................","................","........p.......","......p.p.p.....","......ppppp.....","......dbpbd.....","......dpppd.....","..sssssdldsssss.","...ssssdldssss..","....sssdddss....",".......d.d......",".......l.l......","................","................","................"
  ]},
  ekans: { palette: { p: '#a855f7', d: '#facc15', l: '#ecfccb', s: '#0f172a', b: '#0f172a' }, grid: [
    "................","................","................","................","...pppppdpp.....","...ppsppdpp.....","...pppppdppp....",".....ddddppp....","........pppp....",".......ppps.....",".....pdddds..d..","....ppppppsppp..","....ppppppppp...","................","................","................"
  ]},
  pikachu: { palette: { p: '#facc15', d: '#ca8a04', l: '#ef4444', s: '#0f172a', b: '#0f172a' }, grid: [
    "................","................","....b....b......","....p....p......","....p....p......","....pppppp......","....pbppbp......","....lppppl......","...pppppppp.....","....dppppd..p...","....pppppp.pp...","....dppppdpp....","....p....p......","................","................","................"
  ]},
  sandshrew: { palette: { p: '#eab308', d: '#854d0e', l: '#fef08a', s: '#0f172a' }, grid: [
    "................","................","................","................","....p..p........","...pppppp.......","...psppsppp.....","...pppppppdp....","....llllpdpp....",".....ll.pppd.p..","........ppdppp..","........p..p....","................","................","................","................"
  ]},
  nidoran_f: { palette: { p: '#3b82f6', d: '#1e3a8a', l: '#bfdbfe', b: '#0f172a' }, grid: [
    "................","................","................","................","................","................","................","...p.p.ppdp.....","...pppppppp.....","...bpbppdpp.....","...pppppppp.....","......p...p.....","................","................","................","................"
  ]},
  nidoran_m: { palette: { p: '#a855f7', d: '#581c87', l: '#e9d5ff', b: '#0f172a' }, grid: [
    "................","................","................","................","................","................","...p.p..........","...pdp.ppdp.....","...pppppppp.....","...bpbppdpp.....","...pppppppp.....","......p...p.....","................","................","................","................"
  ]},
  clefairy: { palette: { p: '#f472b6', d: '#db2777', l: '#fbcfe8', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....dd..dd.....",".....ll..ll.....",".....llllll.....",".....lbllbl.....","....lpllllpl....",".....llllll.l...",".....llllllll...",".....l....l.....","................","................","................"
  ]},
  vulpix: { palette: { p: '#ea580c', d: '#9a3412', l: '#fdba74', b: '#0f172a' }, grid: [
    "................","................","................","................","................","................","...d..d.........","...dddd.........","..pppppp...p.p..","...bppb     p...","...ppppppppp.p..","    pp.pppp.p...",".......ppppp.p..","       p..p.....","................","................"
  ]},
  jigglypuff: { palette: { p: '#f472b6', d: '#be185d', l: '#fbcfe8', b: '#0f172a', w: '#38bdf8' }, grid: [
    "................","................","................","................","................","     l....l.....","     llllll.....","     lwdlwd     ","    llwwlwwl    ","     llllll.....","     llllll.....","      l..l......","................","................","................","................"
  ]},
  zubat: { palette: { p: '#6366f1', d: '#312e81', l: '#c7d2fe', b: '#0f172a' }, grid: [
    "................","................","................","................","................","     p..p.......","     p..p.......","     pppp       ","     pppp       ","     lppl       ","   dddppddd     ","   dddppddd     ","   d.dppd.d     ","................","................","................"
  ]},
  oddish: { palette: { p: '#3b82f6', d: '#1e40af', l: '#93c5fd', s: '#16a34a', b: '#0f172a' }, grid: [
    "................","................","................","       s        ","    ss.s.ss     ","     s.s.s      ","     s.s.s      ","     ppppp      ","     bpppb      ","     ppppp      ","     ppppp      ","     p   p      ","................","................","................","................"
  ]},
  vileplume: { palette: { p: '#ef4444', d: '#1e3a8a', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","   pppppppppp   ","  ppsppppppspp  ","  ppppplllpppp  ","  ppspplllppsp  ","   pppppppppp   ","     dddddd     ","     dbddbd     ","    dddddddd    ","     dddddd     ","     dd  dd     ","................","................","................","................","................"
  ]},
  paras: { palette: { p: '#dc2626', d: '#991b1b', l: '#fca5a5', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","................","................","     ddl.ddl    ","     ldd.ldd    ","    ppppppp     ","    bppbppp     ","   plpplppp     ","   p    p.p     ","................","................","................","................","................"
  ]},
  venonat: { palette: { p: '#7e22ce', d: '#581c87', l: '#e9d5ff', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","................","     ll  ll     ","      l  l      ","      l  l      ","     psspss     ","     psspss     ","     plpplp     ","     pppppp     ","     pppppp     ","     l    l     ","................","................","................","................"
  ]},
  diglett: { palette: { p: '#a16207', d: '#713f12', l: '#f472b6', b: '#0f172a' }, grid: [
    "................","................","................","................","................","................","      pppp      ","      bppb      ","      pllp      ","      pppp      ","      pppp      ","     dddddd     ","     dddddd     ","................","................","................"
  ]},
  meowth: { palette: { p: '#fef08a', d: '#ca8a04', l: '#ffffff', b: '#0f172a', s: '#b45309' }, grid: [
    "................","................","................","................","     p.dd.p     ","     ppddpp     ","     pbppbp     ","     pppppp     ","      pppp      ","     pppppp.s   ","      pppp  p   ","      p  pppp   ","      p  p      ","................","................","................"
  ]},
  psyduck: { palette: { p: '#facc15', d: '#ca8a04', l: '#fef08a', b: '#0f172a', s: '#000000' }, grid: [
    "................","................","................","        b       ","      b.b.b     ","     ppppppp    ","     pbpppbp    ","     plllllp    ","    pplllllpp   ","     ppppppp    ","     ppppppp    ","     ppppppp    ","      p   p     ","................","................","................"
  ]},
  mankey: { palette: { p: '#d97706', d: '#b45309', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","................","................","................","     ll   ll    ","     lllllll    ","     lblllbl    ","   dlllpppllld  ","  d  lllllll    ","  l  lllllll    ","  llllllllll    ","      l   l     ","      d   d     ","................","................","................"
  ]},
  primeape: { palette: { p: '#fde68a', d: '#78350f', l: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","    dd    dd    ","   pppppppppp   ","   plbppppbpl   ","  dppppddppppd  ","  bppppppppppb  ","   pppppppppp   ","    pppppppp    ","    bb    bb    ","    dd    dd    ","................","................","................","................","................"
  ]},
  growlithe: { palette: { p: '#ea580c', d: '#9a3412', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","     ll         ","    ll  p       ","   blllpp       ","   ppbppp       ","  dlllppp       ","   llllpp       ","   blllpbp      ","    lllbbpb.l   ","    llpppbblll  ","     lpppbplll  ","     ppppppll   ","     dpdpdpd    ","................","................"
  ]},
  poliwag: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#f472b6', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","................","................","................","................","     bppppb     ","     ppllpp     ","     pssssp     ","  pd.pssdsp     ","  pd.psddsp     ","  ppppssssp     ","      p  p      ","      p  p      ","................","................","................"
  ]},
  abra: { palette: { p: '#facc15', d: '#ca8a04', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","................","................","      p  p      ","      pppp      ","     pbppbp     ","     dppppd     ","    pddllddp    ","    ppddddpp    ","   p  pppp      ","   dpppppp      ","      p  p      ","................","................"
  ]},
  kadabra: { palette: { p: '#facc15', d: '#854d0e', l: '#94a3b8', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","    p      p    ","    pp    pp    ","     ppsspp     ","     pbppbp     ","    llpppppl  l ","   dddddddd   l ","    dddddddd ll ","     pppppppp   ","     pp   pp    ","    dd     dd   ","................","................","................","................","................"
  ]},
  machop: { palette: { p: '#93c5fd', d: '#3b82f6', l: '#dbeafe', b: '#0f172a' }, grid: [
    "................","................","................","................","      d.d       ","     ppppp      ","     bpppb      ","     ppppp      ","     ppppp      ","      ppp       ","     ppppp      ","      lpl.p     ","      ppppp     ","      p.p       ","................","................"
  ]},
  bellsprout: { palette: { p: '#eab308', d: '#a16207', s: '#16a34a', b: '#0f172a' }, grid: [
    "................","................","................","................","................","     pp         ","    pppp   ss   ","    bppb  sss   ","    ppppddss    ","    ppppsd      ","    ddddsd      ","      ss.d      ","        dd      ","       dd.dd    ","................","................"
  ]},
  tentacool: { palette: { p: '#3b82f6', d: '#db2777', l: '#a16207', s: '#dc2626', b: '#0f172a' }, grid: [
    "................","................","................","       ppp      ","      ppppp     ","     sspppss    ","     sspppss    ","      bpppb     ","      ppppp     ","      l   l     ","      l   l     ","      l   l     ","     ll   ll    ","................","................","................"
  ]},
  geodude: { palette: { p: '#a8a29e', d: '#57534e', l: '#d6d3d1', b: '#0f172a' }, grid: [
    "................","................","................","................","  dp   pp   pd  ","  pp.lppppl.pp  ","   p.pppppp.p   ","   pppbppbppp   ","     pppppp     ","     pppppp     ","     dppppd     ","................","................","................","................","................"
  ]},
  ponyta: { palette: { p: '#ea580c', d: '#9a3412', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","     pp         ","   ppp          ","   ppl          ","  llblp     pp  ","  llllpppp.pp   ","     llllllpp   ","     llllllpp   ","     llllll     ","     lp   lp    ","     l    l     ","................","................","................"
  ]},
  slowpoke: { palette: { p: '#ec4899', d: '#db2777', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","....pbppbbpp....","...pppppppppp...\n","...pppppppppp...\n","....pppppppp....",".....pppppp.....","................","................","................","................","................","................","................"
  ]},
  doduo: { palette: { p: '#92400e', d: '#78350f', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","..pp......pp....","..pp......pp....","..pb......bp....","..pp......pp....","...p......p.....","....pppppp......",".....pppp.......","......pp........","......pp........","......pp........","................","................","................","................","................"
  ]},
  seel: { palette: { p: '#cbd5e1', d: '#94a3b8', l: '#f8fafc', b: '#0f172a' }, grid: [
    "................","................","................",".....pppppp.....",".....pbppbp.....","....pppppppp....","....llllllll....","....llllllll....",".....pppppp.....","......pppp......","......pppp......","................","................","................","................","................"
  ]},
  grimer: { palette: { p: '#581c87', d: '#3b0764', l: '#c084fc', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","....pbppbbpp....","...pppppppppp...\n","...pppppppppp...\n","....pppppppp....",".....pppppp.....","................","................","................","................","................","................","................"
  ]},
  shellder: { palette: { p: '#6d28d9', d: '#4c1d95', l: '#8b5cf6', s: '#f43f5e', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","...pppppppppp...\n","...psssssspp....","...psssssspp....","...psssssspp....","...pppppppppp...\n","....pppppppp....",".....pppppp.....","................","................","................","................","................"
  ]},
  gastly: { palette: { p: '#3b0764', d: '#2e1065', l: '#d8b4fe', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","....pbppbbpp....","....pppppppp....",".....pppppp.....","......pppp......","................","................","................","................","................","................","................","................"
  ]},
  gengar: { palette: { p: '#6b21a8', d: '#3b0764', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","   p  p  p  p   ","   pppppppppp   ","  pppppppppppp  ","  ppplbppblppp  ","  pppppppppppp  ","  pppssssssppp  ","  dddddddddddd  ","   dddddddddd   ","    dd    dd    ","................","................","................","................","................","................"
  ]},
  onix: { palette: { p: '#a8a29e', d: '#57534e', l: '#e7e5e4', b: '#0f172a' }, grid: [
    "       p        ","      ppp       ","    ppppppp     ","    pbpppbp     ","    ddddddd     ","     ppppp      ","      dddd      ","       pppp     ","        dddd    ","      pppppp    ","     dddd       ","    ppppp       ","................","................","................","................"
  ]},
  drowzee: { palette: { p: '#ca8a04', d: '#a16207', l: '#78350f', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","....pbppbbpp....","...pppppppppp...\n","...pppppppppp...\n","....pppppppp....",".....pppppp.....","................","................","................","................","................","................","................"
  ]},
  krabby: { palette: { p: '#dc2626', d: '#991b1b', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","................","...p..p..p..p...\n","....pppppppp....","....pbppbbpp....","...pppppppppp...\n","...pppppppppp...\n","....pppppppp....",".....pppppp.....","................","................","................","................","................","................","................"
  ]},
  koffing: { palette: { p: '#6b21a8', d: '#581c87', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","....pbppbbpp....","...pppppppppp...\n","...pppppppppp...\n","....pppppppp....",".....pppppp.....","................","................","................","................","................","................","................"
  ]},
  tangela: { palette: { p: '#1d4ed8', d: '#1e40af', l: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","...llllllll.....","..llllllllll....","..llbllbllll....","..llllllllll....","...llllllll.....","....llllll......","................","................","................","................","................","................","................","................"
  ]},
  kangaskhan: { palette: { p: '#78350f', d: '#451a03', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","....pppppp......","...pppppppp.....","...pbppbbpp.....","...pppppppp.....","...pllllllpp....","...pllllllpp....","....pppppp......","....pp..pp......","................","................","................","................","................","................"
  ]},
  horsea: { palette: { p: '#0284c7', d: '#0369a1', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................",".....pppp.......","....pppppp......","....pbppbp......",".....ppppp......","......pppp......","......pppp......",".....pp..pp.....","....pp..........","................","................","................","................","................","................"
  ]},
  goldeen: { palette: { p: '#ef4444', d: '#b91c1c', l: '#fde047', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","....pbppbbpp....","....pppppppp....",".....pppppp.....","......pppp......",".......pp.......","................","................","................","................","................","................","................"
  ]},
  staryu: { palette: { p: '#b45309', d: '#78350f', l: '#facc15', b: '#0f172a' }, grid: [
    "................",".......p........","......ppp.......\n",".....ppppp......","...ppppppppp...\n","....pppppppp....",".....pppppp.....","......pppp......",".....pp..pp.....","....pp....pp....","................","................","................","................","................","................"
  ]},
  scyther: { palette: { p: '#15803d', d: '#166534', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","....pppppp......","...pppppppp.....","...pbppbbpp.....","...pppppppp.....","...pllllllpp....","...pllllllpp....","....pppppp......","....pp..pp......","................","................","................","................","................","................"
  ]},
  jynx: { palette: { p: '#be123c', d: '#881337', l: '#fde047', b: '#0f172a' }, grid: [
    "................","....llllllll....","...llllllllll...\n","...llbllblll...\n","...llllllllll...\n","....pppppppp....",".....pbppbp.....",".....pppppp.....","......pppp......","................","................","................","................","................","................","................"
  ]},
  magmar: { palette: { p: '#dc2626', d: '#991b1b', l: '#fde047', b: '#0f172a' }, grid: [
    "................",".....pppppp.....","....pppppppp....","....pbppbbpp....","....pppppppp....",".....llllll.....",".....llllll.....",".....pppppp.....","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  pinsir: { palette: { p: '#78350f', d: '#451a03', l: '#e7e5e4', b: '#0f172a' }, grid: [
    "................","...p......p.....","...pp....pp.....","....pppppp......","....pbppbp......","...pppppppp.....","...pllllllpp....","...pllllllpp....","....pppppp......",".....pp..pp.....","................","................","................","................","................","................"
  ]},
  tauros: { palette: { p: '#92400e', d: '#451a03', l: '#78716c', b: '#0f172a' }, grid: [
    "................","...p......p.....","...pp....pp.....","....pppppp......","....pbppbp      ","...pppppppp.....","...pllllllpp....","...pllllllpp    ","....pppppp......","     pp..pp.....","................","................","................","................","................","................"
  ]},
  magikarp: { palette: { p: '#ea580c', d: '#c2410c', l: '#fde047', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","....pbppbbpp....","....pppppppp....",".....pppppp.....","......pppp......","................","................","................","................","................","................","................","................"
  ]},
  lapras: { palette: { p: '#38bdf8', d: '#64748b', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","     pp         ","    pppp        ","    pbpp        ","     pp   dddd  ","     pp  dddddd ","    lppdddddddd ","    llllddddddd ","   ppppppppppp  ","  pppp   pppp   ","................","................","................","................","................","................"
  ]},
  eevee: { palette: { p: '#b45309', d: '#78350f', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","   d      d     ","   pp    pp     ","    pppppp      ","    pbppbp      ","   llllllll     ","   llllllll.pp  ","    ppppppp.pp  ","    pp   pp     ","................","................","................","................","................","................","................"
  ]},
  snorlax: { palette: { p: '#0f766e', d: '#134e4a', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","    pp    pp    ","   pppppppppp   ","   pplbppblpp   ","  pppppppppppp  ","  ppllllllllpp  ","  ppllllllllpp  ","  ppllllllllpp  ","   pppppppppp   ","   lll    lll   ","................","................","................","................","................","................"
  ]},
  articuno: { palette: { p: '#38bdf8', d: '#0284c7', l: '#e0f2fe', b: '#0f172a' }, grid: [
    "       dd       ","  pp  pppp  pp  ",".pppp.pbpp.pppp.",".pppppppppppppp.","  ddddlllllldd  ","   dddppppddd   ","      pppp      ","     dd  dd     ","     dd  dd     ","    dd    dd    ","................","................","................","................","................","................"
  ]},
  zapdos: { palette: { p: '#facc15', d: '#ca8a04', l: '#0f172a', b: '#f97316' }, grid: [
   ".p...p.pp.p...p.","  pp.pppppp.pp  ",".ppppplppblpppp.","  ddddppppdddd  ","  pppppppppppp  ","   llddppddll   ","     b    b     ","................","................","................","................","................","................","................","................","................"
  ]},
  moltres: { palette: { p: '#ea580c', d: '#c2410c', l: '#fef08a', b: '#0f172a' }, grid: [
    "    ll..ll      ","   pppppppp     ","  pppppbpppp    ","  pppppppppp    ","   ddlllllldd   \n","    dddddddd    ","     dd  dd     ","     dd  dd     ","................","................","................","................","................","................","................","................"
  ]},
  dratini: { palette: { p: '#2563eb', d: '#1d4ed8', l: '#f8fafc', b: '#0f172a' }, grid: [
    "................","................","     pppp       ","    pppppp      ","    pbppbp      ","     ppppp      ","      pppp      ","      pppp      ","     pp..pp     ","    pp          ","................","................","................","................","................","................"
  ]},
  dragonite: { palette: { p: '#f59e0b', d: '#0d9488', l: '#fef3c7', b: '#0f172a' }, grid: [
    "      l  l      ","     pppppp     ","     pbppbp     ","   ddppppppdd   ","  dddpllllpddd  ","   ddpllllpdd   ","     pllllp.pp  ","     ppppppppp  ","     pp  pp     ","................","................","................","................","................","................","................"
  ]},
  mewtwo: { palette: { p: '#cbd5e1', d: '#94a3b8', l: '#a855f7', b: '#0f172a' }, grid: [
    "................","     pppppp     ","    pppppppp    ","    pbppbbpp    ","   pppppppppp   \n","   pllllllpp    ","   pllllllpp    ","    pppppp      ","    pp  pp      ","................","................","................","................","................","................","................"
  ]},
  mew: { palette: { p: '#f472b6', d: '#db2777', l: '#fce7f3', b: '#0f172a' }, grid: [
    "................",
      "................",
      "................",
      "................",
      ".....pd..dp.....",
      ".....pppppp.....",
      ".....pbppbp.....",
      ".....pppppp.....",
      ".......pp.......",
      "..ppp..ppp......",
      "....p..pp.......",
      "....pppppp......",
      "................",
      "................",
      "................",
      "................"
  ]},
  raichu: { palette: { p: '#f97316', d: '#9a3412', l: '#fef08a', s: '#facc15', b: '#0f172a' }, grid: [
    "................","...dd......dd...","..dssd....dssd..","...ddppppppdd...","....pppppppp....","....pbppppbp....","...spppppppps...","....pppppppp....","...pppllllppp.d.","...pppllllppp.d.","....ppllllpp.d..","....ppppppppd...","....dd....dd....","................","................","................"
  ]},
  arcanine: { palette: { p: '#ea580c', d: '#1e293b', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","....llllll......","...llllllll.....","...llpbppll.....","..llllpppppp....","..llllpdppdp.ll.","...lllpppppp.ll.","....pppppppppll.","....pdppppdp....","....pppppppp....","....ll....ll....","....ll....ll....","................","................","................","................"
  ]},
  magnemite: { palette: { p: '#94a3b8', d: '#475569', l: '#ef4444', s: '#3b82f6', b: '#0f172a' }, grid: [
    "................",".......dd.......","......dddd......","..ll.pppppp.ss..","..llppppppppss..","....pppbpppp....","..sspppppppp....","..ss.pppppp.ll..","......dddd......","................","................","................","................","................","................","................"
  ]},
  farfetchd: { palette: { p: '#a16207', d: '#713f12', l: '#fef3c7', s: '#22c55e', b: '#0f172a' }, grid: [
    "................","......ppp.......",".....ppppp..ss..",".....pbpbp.ss...",".....ppppp.s....","....ppppppps....","...dpppppppd....","....ppppppp.....",".....lllll......","......l.l.......","................","................","................","................","................","................"
  ]},
  voltorb: { palette: { p: '#ef4444', d: '#b91c1c', l: '#ffffff', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","...ppbppppbpp...","...pppppppppp...","...bbbbbbbbbb...","...llllllllll...","....llllllll....",".....llllll.....","................","................","................","................","................","................"
  ]},
  exeggcute: { palette: { p: '#fbcfe8', d: '#f472b6', l: '#facc15', b: '#0f172a' }, grid: [
    "................","................","................","....ppp..ppp....","...pppbppppbp...","...pppppppppp...","..pppbppllpbpp..","..pppppppppppp..","...pppp..pppp...","................","................","................","................","................","................","................"
  ]},
  cubone: { palette: { p: '#a16207', d: '#78350f', l: '#e7e5e4', b: '#0f172a' }, grid: [
    "................","....ll....ll....","...llllllllll...","...lllbllblll...","...llllllllll...","....pppppppp.l..","...pppppppppll..","....pppppppp....","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  hitmonlee: { palette: { p: '#a16207', d: '#78350f', l: '#fef08a', b: '#0f172a' }, grid: [
    "................",".....pppppp.....","....pppppppp....","....plbppblp....","....pppppppp....","...pppppppppp...","....llllllll....","....pp....pp....","....ll....ll....","...pp......pp...","................","................","................","................","................","................"
  ]},
  hitmonchan: { palette: { p: '#a16207', d: '#ef4444', l: '#d8b4fe', b: '#0f172a' }, grid: [
    "................","....pppppppp....","....pppppppp....","....pbppppbp....","..ddppppppppdd..","..ddlllllllldd..","....llllllll....","....llllllll....",".....pp..pp.....",".....dd..dd.....","................","................","................","................","................","................"
  ]},
  lickitung: { palette: { p: '#f472b6', d: '#db2777', l: '#fef08a', b: '#0f172a' }, grid: [
    "................",".....pppppp.....","....pppppppp....","....pbppppbp....","...ppppddpppp...","...pppddddppp...","...pplddddlpp...","....pdddddlp....","....pppppppp....","....pp....pp....","................","................","................","................","................","................"
  ]},
  rhyhorn: { palette: { p: '#64748b', d: '#334155', l: '#cbd5e1', b: '#0f172a' }, grid: [
    "................","...l..dddd......","..ll.dddddd.....","..pppppppppp....","..pbpppppppppp..","..ppppddddpppp..","...dddddddddd...","...pp..pp..pp...","...dd..dd..dd...","................","................","................","................","................","................","................"
  ]},
  chansey: { palette: { p: '#fbcfe8', d: '#f472b6', l: '#ffffff', b: '#0f172a' }, grid: [
    "................",".....pppppp.....","...ddppppppdd...","....ppbppbpp....","...pppppppppp...","..pppppppppppp..","..ppppllllpppp..","..ppppllllpppp..","...pppppppppp...","....dd....dd....","................","................","................","................","................","................"
  ]},
  mr_mime: { palette: { p: '#fbcfe8', d: '#db2777', l: '#3b82f6', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","..lll......lll..","...llpppppp.ll..","....ppbppbpp....","....ppdppdpp....","..ss..ssss..ss..","....ssddddss....",".....ssssss.....",".....pp..pp.....","....dd....dd....","................","................","................","................","................","................"
  ]},
  electabuzz: { palette: { p: '#facc15', d: '#0f172a', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","....p......p....","....pppppppp....","....pbppppbp....","...ppddppddpp...","...ppppddpppp...","...ppddddddpp...","....pppppppp....","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  gyarados: { palette: { p: '#0284c7', d: '#1e3a8a', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "....s..ll..s....","...pppppppppp...","..ppppbppbpppp..","...ppspppppp....",".....pppppp.....","....ppplllpp....","...ppplllppp....","....ppplllpp....",".....ppplllp....","....ppplllpp....","................","................","................","................","................","................"
  ]},
  ditto: { palette: { p: '#c084fc', d: '#9333ea', l: '#e9d5ff', b: '#0f172a' }, grid: [
    "................","................","................",".....pp..pp.....","...pppppppppp...","...pppbppbp.....","..ppppbbbbpppp..","..pppppppppppp..","...dddddddddd...","................","................","................","................","................","................","................"
  ]},
  porygon: { palette: { p: '#f43f5e', d: '#0284c7', l: '#38bdf8', b: '#0f172a' }, grid: [
    "................",".....pppppp.....","....pppppppp....","...llpbpppppp...","..llllpppppppp..","....dddddddddd..","....ddddppppdd..",".....pppppppp...","....dd......dd..","................","................","................","................","................","................","................"
  ]},
  omanyte: { palette: { p: '#38bdf8', d: '#fde047', l: '#fef08a', b: '#0f172a' }, grid: [
    "................",".....dddddd.....","....dddddddd....","...dddllllddd...","...dddlbblddd...","....dddddddd....","....pppppppp....","...ppbp..pbpp...","...ppp....ppp...","................","................","................","................","................","................","................"
  ]},
  kabuto: { palette: { p: '#b45309', d: '#78350f', l: '#facc15', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","...pppppppppp...","..ppppbppbpppp..","..pppppppppppp..","...dddddddddd...","....ll....ll....","................","................","................","................","................","................","................","................"
  ]},
  aerodactyl: { palette: { p: '#94a3b8', d: '#64748b', l: '#a855f7', b: '#0f172a' }, grid: [
    "................","..p....pp....p..",".pp...pppp...pp.",".ppp..pbbp..ppp.",".ppllppppppllpp.","..pllppppppllp..","...ll.pppp.ll...","......pppp......",".....pp..pp.....","................","................","................","................","................","................","................"
  ]},
  venusaur: { palette: { p: '#14b8a6', d: '#15803d', l: '#fde047', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",
    ".....ssssss.....",
    "...sssslsssss...",
    "..sssssllsssss..",
    "...dddddddddd...",
    "..dddddddddddd..",
    "...pppppppppp...",
    "..pppppppppppp..",
    "..ppbppppppbpp..",
    "..pppppppppppp..",
    "..pppppssspppp..",
    "...pppppppppp...",
    "...ppp....ppp...",
    "................",
    "................",
    "................"
  ]},
  charizard: { palette: { p: '#f97316', d: '#0d9488', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",
    "..dd..pppp..dd..",
    ".dddd.pbpb.dddd.",
    ".dddd.pppp.dddd.",
    "..ddd..pp..ddd..",
    "...ddppppppdd...",
    "....ppllllpp..s.",
    "...pppllllppp.l.",
    "...pppllllppp.p.",
    "....ppllllpppp..",
    "....pppppppp....",
    "....pp....pp....",
    "................",
    "................",
    "................",
    "................"
  ]},
  blastoise: { palette: { p: '#2563eb', d: '#78350f', l: '#cbd5e1', s: '#fef08a', b: '#0f172a' }, grid: [
    "................",
    "..ll..pppp..ll..",
    "..ll.pppppp.ll..",
    "...l.pbppbp.l...",
    "...ddppppppdd...",
    "..ddddssssdddd..",
    "..dddssssssddd..",
    "..dddssssssddd..",
    "..ddddssssdddd..",
    "...pppddddppp...",
    "...pp......pp...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  lucario: { palette: { p: '#2563eb', d: '#1e293b', l: '#fde047', s: '#38bdf8', b: '#0f172a' }, grid: [
    "................",
    "....pp....pp....",
    "....pd....dp....",
    "....pppppppp....",
    "....dbppppbd....",
    ".....pppppp.....",
    "....llllllll....",
    "...pllllllllp...",
    "...p.llllll.p...",
    ".....pppppp.....",
    ".....pp..pp.....",
    ".....dd..dd.....",
    "................",
    "................",
    "................",
    "................"
  ]},
};

const PIXEL_COLOR_PRESETS = [
  '#0f172a', '#ffffff', '#ef4444', '#f97316', '#facc15',
   '#22c55e', '#3b82f6', '#a855f7', '#f472b6', '#a16207'
];

const PALETTE_SLOT_NAMES = {
  p: 'Primary Hue',
  d: 'Shading',
  l: 'Highlight',
  b: 'Outline',
  s: 'Secondary Hue',
  t: 'Tertiary Hue'
};