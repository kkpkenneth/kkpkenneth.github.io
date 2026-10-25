/********************************************************************
 * monsters.js
 * Expanded National Roster (Ordered by Pokédex No) & Custom 16x16 Pixel Sprites
 * (Trivia Question Bank separated into questions.js)
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
  { id: 'articuno',   pokedexNo: 144, name: 'ARTICUNO',   type: 'ICE',      baseHp: 240, level: 22 },
  { id: 'zapdos',     pokedexNo: 145, name: 'ZAPDOS',     type: 'ELECTRIC', baseHp: 240, level: 22 },
  { id: 'moltres',    pokedexNo: 146, name: 'MOLTRES',    type: 'FIRE',     baseHp: 240, level: 22 },
  { id: 'dratini',    pokedexNo: 147, name: 'DRATINI',    type: 'DRAGON',   baseHp: 130, level: 14 },
  { id: 'dragonite',  pokedexNo: 149, name: 'DRAGONITE',  type: 'DRAGON',   baseHp: 195, level: 24 },
  { id: 'mewtwo',     pokedexNo: 150, name: 'MEWTWO',     type: 'PSYCHIC',  baseHp: 260, level: 25 },
  { id: 'mew',        pokedexNo: 151, name: 'MEW',        type: 'PSYCHIC',  baseHp: 250, level: 25 },
  { id: 'lucario',    pokedexNo: 448, name: 'LUCARIO',    type: 'FIGHTING', baseHp: 185, level: 20 }
];

const DEFAULT_MONSTER_PIXELS = {
  bulbasaur: { palette: { p: '#22c55e', d: '#15803d', l: '#86efac', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".........dd.....","........dddd....","...p...pdddd....","...ppppppppl....","...bppbpplpp....","...ppppppppp....","........p..p....","................","................","................","................"
  ]},
  venusaur: { palette: { p: '#14b8a6', d: '#15803d', l: '#fde047', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",".....ssssss.....","...sssslsssss...","..sssssllsssss..","...dddddddddd...","..dddddddddddd..","...pppppppppp...","..pppppppppppp..","..ppbppppppbpp..","..pppppppppppp..","..pppppssspppp..","...pppppppppp...","...ppp....ppp...","................","................","................"
  ]},
  charmander: { palette: { p: '#f97316', d: '#c2410c', l: '#fdba74', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","................","................",".....pppppp.....",".....pbppbp.....",".....pppppp..s..",".......ppppp.d..","......ppppp..l..",".......pllp..p..",".......pllp.p...",".......pllppp...",".......p..p.....","................","................","................"
  ]},
  charizard: { palette: { p: '#f97316', d: '#0d9488', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","..dd..pppp..dd..",".dddd.pbpb.dddd.",".dddd.pppp.dddd.","..ddd..pp..ddd..","...ddppppppdd...","....ppllllpp..s.","...pppllllppp.l.","...pppllllppp.p.","....ppllllpppp..","....pppppppp....","....pp....pp....","................","................","................","................"
  ]},
  squirtle: { palette: { p: '#3b82f6', d: '#a16207', l: '#93c5fd', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","......pppppp....","......pppppp....","......bppppb....","......pppppp....",".....pssssssp...",".....dssssssd...",".....dssssssd...",".....dssssssd...",".....dssssssd...","......p....p....","................","................","................"
  ]},
  blastoise: { palette: { p: '#2563eb', d: '#78350f', l: '#cbd5e1', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","..ll..pppp..ll..","..ll.pppppp.ll..","...l.pbppbp.l...","...ddppppppdd...","..ddddssssdddd..","..dddssssssddd..","..dddssssssddd..","..ddddssssdddd..","...pppddddppp...","...pp......pp...","................","................","................","................","................"
  ]},
  caterpie: { palette: { p: '#84cc16', d: '#4d7c0f', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","................","....s.s.........","....sss.........","...ppsppp.......","...blppbl.......","...blppbl.......","...pddppp.......","....ddpdd..p....",".....llldd.p....","......llpddp....",".......lllpp....","................","................","................"
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
  // REDESIGNED: Rattata (curled tail, large ears, whiskers & white incisors)
  rattata: { palette: { p: '#a855f7', d: '#6b21a8', l: '#f3e8ff', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","................","..........ppp...","...pp..pp...pp..","..pdpppdpp...p..","..pdpppppp...p..","...ppbppb....p..","..llpppppp..pp..","...ssllllpppp...","....llllpppp....","....pp..pp......","....l....l......","................","................","................","................"
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
  raichu: { palette: { p: '#f97316', d: '#9a3412', l: '#fef08a', s: '#facc15', b: '#0f172a' }, grid: [
    "................","...dd......dd...","..dssd....dssd..","...ddppppppdd...","....pppppppp....","....pbppppbp....","...spppppppps...","....pppppppp....","...pppllllppp.d.","...pppllllppp.d.","....ppllllpp.d..","....ppppppppd...","....dd....dd....","................","................","................"
  ]},
  sandshrew: { palette: { p: '#eab308', d: '#854d0e', l: '#fef08a', s: '#0f172a', b: '#0f172a' }, grid: [
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
    "................","................","................","................","................","................","...d..d.........","...dddd.........","..pppppp...p.p..","...bppb....p....","...ppppppppp.p..","....pp.pppp.p...",".......ppppp.p..",".......p..p.....","................","................"
  ]},
  jigglypuff: { palette: { p: '#f472b6', d: '#be185d', l: '#fbcfe8', b: '#0f172a', w: '#38bdf8' }, grid: [
    "................","................","................","................","................",".....l....l.....",".....llllll.....",".....lwdlwd.....","....llwwlwwl....",".....llllll.....",".....llllll.....","......l..l......","................","................","................","................"
  ]},
  zubat: { palette: { p: '#6366f1', d: '#312e81', l: '#c7d2fe', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....p..p.......",".....p..p.......",".....pppp.......",".....pppp.......",".....lppl.......","...dddppddd.....","...dddppddd.....","...d.dppd.d.....","................","................","................"
  ]},
  oddish: { palette: { p: '#3b82f6', d: '#1e40af', l: '#93c5fd', s: '#16a34a', b: '#0f172a' }, grid: [
    "................","................","................",".......s........","....ss.s.ss.....",".....s.s.s......",".....s.s.s......",".....ppppp......",".....bpppb......",".....ppppp......",".....ppppp......",".....p...p......","................","................","................","................"
  ]},
  vileplume: { palette: { p: '#ef4444', d: '#1e3a8a', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","...pppppppppp...","..ppsppppppspp..","..ppppplllpppp..","..ppspplllppsp..","...pppppppppp...",".....dddddd.....",".....dbddbd.....","....dddddddd....",".....dddddd.....",".....dd..dd.....","................","................","................","................","................"
  ]},
  paras: { palette: { p: '#dc2626', d: '#991b1b', l: '#fca5a5', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....ddl.ddl....",".....ldd.ldd....","....ppppppp.....","....bppbppp.....","...plpplppp.....","...p....p.p.....","................","................","................","................","................"
  ]},
  venonat: { palette: { p: '#7e22ce', d: '#581c87', l: '#e9d5ff', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","................",".....ll..ll.....","......l..l......","......l..l......",".....psspss.....",".....psspss.....",".....plpplp.....",".....pppppp.....",".....pppppp.....",".....l....l.....","................","................","................","................"
  ]},
  diglett: { palette: { p: '#a16207', d: '#713f12', l: '#f472b6', b: '#0f172a' }, grid: [
    "................","................","................","................","................","................","......pppp......","......bppb      ","      pllp      ","      pppp      ","      pppp      ","     dddddd     ","     dddddd     ","................","................","................".replace(/ /g, '.')
  ]},
  meowth: { palette: { p: '#fef08a', d: '#ca8a04', l: '#ffffff', b: '#0f172a', s: '#b45309' }, grid: [
    "................","................","................","................",".....p.dd.p.....",".....ppddpp.....",".....pbppbp.....",".....pppppp.....","......pppp......",".....pppppp.s...","......pppp..p...","......p..pppp...","......p..p......","................","................","................"
  ]},
  psyduck: { palette: { p: '#facc15', d: '#ca8a04', l: '#fef08a', b: '#0f172a', s: '#000000' }, grid: [
    "................","................","................","........b.......","......b.b.b.....",".....ppppppp....",".....pbpppbp....",".....plllllp....","....pplllllpp...",".....ppppppp....",".....ppppppp....",".....ppppppp....","......p...p.....","................","................","................"
  ]},
  mankey: { palette: { p: '#d97706', d: '#b45309', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","................","................","................",".....ll...ll....",".....lllllll....",".....lblllbl....","...dlllpppllld..","..d..lllllll....","..l..lllllll....","..llllllllll....","......l...l.....","......d...d.....","................","................","................"
  ]},
  primeape: { palette: { p: '#fde68a', d: '#78350f', l: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","....dd....dd....","...pppppppppp...","...plbppppbpl...","..dppppddppppd..","..bppppppppppb..","...pppppppppp...","....pppppppp....","....bb....bb....","....dd....dd....","................","................","................","................","................"
  ]},
  growlithe: { palette: { p: '#ea580c', d: '#9a3412', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................",".....ll.........","....ll..p.......","...blllpp.......","...ppbppp.......","..dlllppp.......","...llllpp.......","...blllpbp......","....lllbbpb.l...","....llpppbblll..",".....lpppbplll..",".....ppppppll...",".....dpdpdpd....","................","................"
  ]},
  // REDESIGNED: Arcanine (fluffy cream mane, tiger stripes & bushy tail)
  arcanine: { palette: { p: '#ea580c', d: '#1e293b', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","...ll..llll.....","..llllllllll....","..llpbpppbll....","..lllppppllll...","...lllllllpp.ll.","....llpdppdppll.","....ppddppddpll.","....pppppppppll.","....pdppppdp....","....pp....pp....","...lll....lll...","...pp......pp...","................","................","................"
  ]},
  poliwag: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#f472b6', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....bppppb.....",".....ppllpp.....",".....pssssp.....","..pd.pssdsp.....","..pd.psddsp.....","..ppppssssp.....","......p..p......","......p..p......","................","................","................"
  ]},
  abra: { palette: { p: '#facc15', d: '#ca8a04', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","................","................","......p..p......","......pppp......",".....pbppbp.....",".....dppppd.....","....pddllddp....","....ppddddpp....","...p..pppp......","...dpppppp......","......p..p......","................","................"
  ]},
  kadabra: { palette: { p: '#facc15', d: '#854d0e', l: '#94a3b8', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","....p......p....","....pp....pp....",".....ppsspp.....",".....pbppbp.....","....llpppppl..l.","...dddddddd...l.","....dddddddd.ll.",".....pppppppp...",".....pp...pp....","....dd.....dd...","................","................","................","................","................"
  ]},
  machop: { palette: { p: '#93c5fd', d: '#3b82f6', l: '#dbeafe', b: '#0f172a' }, grid: [
    "................","................","................","................","......d.d.......",".....ppppp......",".....bpppb......",".....ppppp......",".....ppppp......","......ppp.......",".....ppppp......","......lpl.p.....","......ppppp.....","......p.p.......","................","................"
  ]},
  bellsprout: { palette: { p: '#eab308', d: '#a16207', s: '#16a34a', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....pp.........","....pppp...ss...","....bppb..sss...","....ppppddss....","....ppppsd......","....ddddsd......","......ss.d......","........dd......",".......dd.dd....","................","................"
  ]},
  tentacool: { palette: { p: '#3b82f6', d: '#db2777', l: '#a16207', s: '#dc2626', b: '#0f172a' }, grid: [
    "................","................","................",".......ppp......","......ppppp.....",".....sspppss    ","     sspppss    ","      bpppb     ","      ppppp     ","      l   l     ","      l   l     ","      l   l     ","     ll   ll    ","................","................","................".replace(/ /g, '.')
  ]},
  geodude: { palette: { p: '#a8a29e', d: '#57534e', l: '#d6d3d1', b: '#0f172a' }, grid: [
    "................","................","................","................","..dp...pp...pd..","..pp.lppppl.pp..","...p.pppppp.p...","...pppbppbppp...",".....pppppp.....",".....pppppp.....",".....dppppd.....","................","................","................","................","................"
  ]},
  ponyta: { palette: { p: '#ea580c', d: '#9a3412', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................",".....pp.........","...ppp..........","...ppl..........","..llblp.....pp..","..llllpppp.pp...",".....llllllpp...",".....llllllpp...",".....llllll.....",".....lp...lp....",".....l....l.....","................","................","................"
  ]},
  // REDESIGNED: Slowpoke (pink quadruped with cream muzzle, curled ears & white-tipped tail)
  slowpoke: { palette: { p: '#f472b6', d: '#db2777', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","................","................","...dd..dd.......","...pppppp.......","..pbppppbp..ll..","..ppllllpp..ll..","...llllll...pp..","....pppppppppp..","....ppppppppp...","....pppppppp....","....pp....pp....","....dd....dd....","................","................","................"
  ]},
  magnemite: { palette: { p: '#94a3b8', d: '#475569', l: '#ef4444', s: '#3b82f6', b: '#0f172a' }, grid: [
    "................",".......dd.......","......dddd......","..ll.pppppp.ss..","..llppppppppss..","....pppbpppp....","..sspppppppp....","..ss.pppppp.ll..","......dddd......","................","................","................","................","................","................","................"
  ]},
  farfetchd: { palette: { p: '#a16207', d: '#713f12', l: '#fef3c7', s: '#22c55e', b: '#0f172a' }, grid: [
    "................","......ppp.......",".....ppppp..ss..",".....pbpbp.ss...",".....ppppp.s....","....ppppppps....","...dpppppppd....","....ppppppp.....",".....lllll......","......l.l.......","................","................","................","................","................","................"
  ]},
  // REDESIGNED: Doduo (twin bird heads, long beaks, fuzzy body & bird legs)
  doduo: { palette: { p: '#a16207', d: '#713f12', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","...ppp....ppp...","..ppbp...ppbp...","..ppppll.ppppll.","....p......p....","....p......p....",".....dppppd.....","....dppppppd....","....dppppppd....",".....dddddd.....","......l..l......","......l..l......",".....ll..ll.....","................","................","................"
  ]},
  // REDESIGNED: Seel (horn on head, tan muzzle & flippers)
  seel: { palette: { p: '#cbd5e1', d: '#94a3b8', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","................",".......ll.......","......pppp......",".....pppppp.....",".....pbppbp.....",".....ppllpp.....","....pppppppp..p.","...pppppppppp.p.","..ddppppppppddp.","....dddddddddd..","................","................","................","................","................"
  ]},
  // REDESIGNED: Grimer (oozing purple sludge monster with raised arms & mouth)
  grimer: { palette: { p: '#7e22ce', d: '#581c87', l: '#e9d5ff', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","..pp.pppppp.pp..",".pppppbpppbpppp.",".pppppppppppppp.","..pppddddddppp..","...ppdlllldpp...","...pppppppppp...","..dppppppppppd..",".ddppppppppppdd.",".dddddddddddddd.","................","................","................","................"
  ]},
  // REDESIGNED: Shellder (bivalve shell, wide eyes inside dark interior & sticking-out pink tongue)
  shellder: { palette: { p: '#7e22ce', d: '#4c1d95', l: '#e9d5ff', s: '#f43f5e', b: '#0f172a' }, grid: [
    "................","................","....pp.pp.pp....","...pppppppppp...","..dddddddddddd..","..dbbbbbbbbbbd..","..dbblbbbbbbld..","..dbbbbbbbbbbd..","...bbssssssbb...","....pppssppp....",".....ppsspp.....","......ssss......","................","................","................","................"
  ]},
  // REDESIGNED: Gastly (dark core with big slanted eyes surrounded by purple spectral gas)
  gastly: { palette: { p: '#a855f7', d: '#581c87', l: '#ffffff', b: '#0f172a' }, grid: [
    "................","....pp..pp.p....","..pp.dddddd.pp..","..p.dddddddd.p..",".pp.dlbbbbld.pp.",".p.ddllbblldd.p.",".pp.dddddddd.pp.","..p.dddllldd.p..","..pp.dddddd.pp..","...p..pppp..p...",".....p....p.....","................","................","................","................","................"
  ]},
  gengar: { palette: { p: '#6b21a8', d: '#3b0764', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","...p..p..p..p...","...pppppppppp...","..pppppppppppp..","..ppplbppblppp..","  pppppppppppp  ","  pppssssssppp  ","  dddddddddddd  ","   dddddddddd   ","    dd    dd    ","................","................","................","................","................","................".replace(/ /g, '.')
  ]},
  onix: { palette: { p: '#a8a29e', d: '#57534e', l: '#e7e5e4', b: '#0f172a' }, grid: [
    ".......p........","......ppp.......","....ppppppp.....","....pbpppbp.....","....ddddddd.....",".....ppppp......","......dddd......",".......pppp.....","........dddd....","......pppppp    ","     dddd       ","    ppppp       ","................","................","................","................".replace(/ /g, '.')
  ]},
  // REDESIGNED: Drowzee (yellow upper half, tapir trunk & brown lower body)
  drowzee: { palette: { p: '#facc15', d: '#78350f', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","....pbppppbp....","....pppppplll...","...pppppppppp...","...pppppppppp...","....dddddddd....","....dddddddd....","....dd....dd....","....dd....dd....","................","................","................","................"
  ]},
  // REDESIGNED: Krabby (two raised pincer claws, red upper shell, tan lower jaw & crab legs)
  krabby: { palette: { p: '#ef4444', d: '#991b1b', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","..pp........pp..",".pppp......pppp.",".pp.p.pppp.p.pp.","..pp.pppppp.pp..","....ppbppbpp....","....pppppppp....","....llllllll....","...pp.llll.pp...","..pp..dddd..pp..","..p..........p..","................","................","................","................","................"
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
  // REDESIGNED: Koffing (floating purple gas sphere with vents, smirk & skull-and-crossbones marking)
  koffing: { palette: { p: '#9333ea', d: '#581c87', l: '#fef08a', s: '#e9d5ff', b: '#0f172a' }, grid: [
    "................","...ss......ss...","....dppppppd....","...pppppppppp...","..ppppbppbpppp..","..ppppllllpppp..","..pppppppppppp..","..pppl.ll.lppp..","...pp.llll.pp...","...ppp.ll.ppp...","....dppppppd....","...ss......ss...","................","................","................","................"
  ]},
  rhyhorn: { palette: { p: '#64748b', d: '#334155', l: '#cbd5e1', b: '#0f172a' }, grid: [
    "................","...l..dddd......","..ll.dddddd.....","..pppppppppp....","..pbpppppppppp..","..ppppddddpppp..","...dddddddddd...","...pp..pp..pp...","...dd..dd..dd...","................","................","................","................","................","................","................"
  ]},
  chansey: { palette: { p: '#fbcfe8', d: '#f472b6', l: '#ffffff', b: '#0f172a' }, grid: [
    "................",".....pppppp.....","...ddppppppdd...","....ppbppbpp....","...pppppppppp...","..pppppppppppp..","..ppppllllpppp..","..ppppllllpppp..","...pppppppppp...","....dd....dd....","................","................","................","................","................","................"
  ]},
  // REDESIGNED: Tangela (blue vine tangle, big eyes peering from dark shadow & red boots)
  tangela: { palette: { p: '#2563eb', d: '#1e3a8a', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","....pp.pp.pp....","...pdpdppdpdp...","..ppdppppppdpp..","..pdpsbppbsdpd..","..ppdbbbbbbdpp..","..pdpdppppdpdp..","...ppdpddpdpp...","....pppppppp....","....lll..lll....","....lll..lll....","................","................","................","................"
  ]},
  // REDESIGNED: Kangaskhan (armored brown mother with cream belly pouch, ears & baby head)
  kangaskhan: { palette: { p: '#a16207', d: '#713f12', l: '#fef08a', s: '#a855f7', b: '#0f172a' }, grid: [
    "................","....dd....dd....","....dddddddd....","....ppbppbpp....","...pppppppppp...","..ppppllllpppp..","..ppplssbslppp..","..pppllllllppp..","...ppllllllpp...","...pppppppppp...","....ppp..ppp....","....dd....dd....","................","................","................","................"
  ]},
  // REDESIGNED: Horsea (blue seahorse with tubular snout, cream dorsal fin & curled tail)
  horsea: { palette: { p: '#38bdf8', d: '#0284c7', l: '#fef08a', b: '#0f172a' }, grid: [
    "................",".....p.p.p......",".....ppppp......","....ppppppp.....","..ppppbppbp.....","..pp.pppppp.ll..","......ppppp.ll..",".....pplllp.l...",".....pplllp.....","......ppppp.....",".....pp..pp.....",".....ppp.p......","......ppp.......","................","................","................"
  ]},
  // REDESIGNED: Goldeen (horned white-and-orange koi with flowing tail fins)
  goldeen: { palette: { p: '#f8fafc', d: '#ef4444', l: '#fde047', b: '#0f172a' }, grid: [
    "................","................",".....l..dd......","....ll.dddd.....","...ppppddpppp...","..ppbppddppppp..","..pppppdddpppp..","...ddddpppppp...","....ddd...pp....","................","................","................","................","................","................","................"
  ]},
  // REDESIGNED: Staryu (five-pointed golden brown starfish with red gem core & gold ring)
  staryu: { palette: { p: '#b45309', d: '#78350f', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",".......pp.......","......pppp......","......pppp......","..pppppllppppp..","...ppplsslppp...","....pplsslpp....","....ppplllpp....","...pppp..pppp...","...ppp....ppp...","..pp........pp..","................","................","................","................","................"
  ]},
  mr_mime: { palette: { p: '#fbcfe8', d: '#db2777', l: '#3b82f6', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","..lll......lll..","...llpppppp.ll..","....ppbppbpp....","....ppdppdpp....","..ss..ssss..ss..","....ssddddss....",".....ssssss.....",".....pp..pp.....","....dd....dd....","................","................","................","................","................","................"
  ]},
  // REDESIGNED: Scyther (green mantis with twin white scythe blades & wings)
  scyther: { palette: { p: '#22c55e', d: '#15803d', l: '#f8fafc', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","....p..p..p.....","....ppppppp.....","..ll.pbppbp.ll..",".ll...pppp...ll.",".ll..pppppp..ll.","..l..dddddd..l..","......pppp......",".....pppppp.....",".....pp..pp.....","....pp....pp....","................","................","................","................","................"
  ]},
  // REDESIGNED: Jynx (long blonde hair, purple face, red dress & white trim)
  jynx: { palette: { p: '#dc2626', d: '#7e22ce', l: '#fde047', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","....llllllll....","...llllllllll...","..lllddbbddlll..","..lllddddddlll..","..lllpssssplll..","...pppppppppp...","...ppsssssspp...","..pppppppppppp..","..pppppppppppp..","..ssssssssssss..","................","................","................","................","................"
  ]},
  // REDESIGNED: Electabuzz (antennae, yellow body with black lightning bolt stripes)
  electabuzz: { palette: { p: '#facc15', d: '#0f172a', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","....p......p....",".....p....p.....","....pppppppp....","....pbppppbp....","..ppppddddpppp..","..ppddppppddpp..","...pppddddppp...","...ppddppddpp...","....pppppppp....","....pp....pp....","...ppp....ppp...","................","................","................","................"
  ]},
  // REDESIGNED: Magmar (flame crest, yellow beak, red-and-gold fire pattern & flame tail)
  magmar: { palette: { p: '#ef4444', d: '#991b1b', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: [
    "................",".....ll..ll.....","....ssssssss....","....pppppppp....","....pbppppbp....",".....llllll.....","...pppllllppp.l.","...ppllllllpp.s.","....pllllllp.pp.","....pppppppppp..","....pp....pp....","...lll....lll...","................","................","................","................"
  ]},
  // REDESIGNED: Pinsir (huge curved stag pincer horns & vertical gridded teeth)
  pinsir: { palette: { p: '#78350f', d: '#451a03', l: '#e7e5e4', b: '#0f172a' }, grid: [
    "................","...ll......ll...","..ll........ll..","..ll..pppp..ll..","...llpppppp.ll..","...pppppppppp...","...pppbppbppp...","...pppllllppp...","...pppllllppp...","....pppppppp....","....pp....pp....","...ppp....ppp...","................","................","................","................"
  ]},
  // REDESIGNED: Tauros (curved bull horns, dark brown mane & three whipping tails)
  tauros: { palette: { p: '#b45309', d: '#451a03', l: '#d6d3d1', b: '#0f172a' }, grid: [
    "................","..ll........ll..","...ll.dddd.ll...","....dddddddd....","...ddpbppbpdd...","...dddddddddd.d.","....dddddddd.d.d","....pppppppp..d.","....ppppppppdd..","....pp.pp.pp....","....dd.dd.dd....","................","................","................","................","................"
  ]},
  // REDESIGNED: Magikarp (golden crown fin, wide eyes, whiskers & white tail fin)
  magikarp: { palette: { p: '#f97316', d: '#c2410c', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [
    "................","......l.l.l.....",".....lllllll....","....ppppppppp...","...pppbpppppss..","..lpppppppppsss.","...pppppppppss..","....dddddddd....",".....ll..ll.....","................","................","................","................","................","................","................"
  ]},
  gyarados: { palette: { p: '#0284c7', d: '#1e3a8a', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "....s..ll..s....","...pppppppppp...","..ppppbppbpppp..","...ppspppppp....",".....pppppp.....","....ppplllpp....","...ppplllppp....","....ppplllpp....",".....ppplllp....","....ppplllpp....","................","................","................","................","................","................"
  ]},
  // REDESIGNED: Lapras (horn, curled ears, long neck, spiked grey shell & flippers)
  lapras: { palette: { p: '#38bdf8', d: '#64748b', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................",".....l..........","....ppp.........","...ppbp.........","...pppl.........","....pl...dd.dd..","....pl..ddddddd.","...ppl.ddddddddd","...llllddddddddd","..ppppppppppppp.",".ppp...ppp...pp.","................","................","................","................","................"
  ]},
  // REDESIGNED: Ditto (classic wavy smiling blob with bead eyes)
  ditto: { palette: { p: '#c084fc', d: '#9333ea', l: '#e9d5ff', b: '#0f172a' }, grid: [
    "................","................","................","................",".....pp..pp.....","...pppppppppp...","..ppppbppbpppp..","..pppbppppbppp..","...pppbbbbppp...","..pppppppppppp..","..dddddddddddd..","................","................","................","................","................"
  ]},
  eevee: { palette: { p: '#b45309', d: '#78350f', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","...d......d.....","...pp....pp.....","....pppppp......","....pbppbp......","...llllllll.....","...llllllll.pp..","....ppppppp.pp..","....pp...pp.....","................","................","................","................","................","................","................"
  ]},
  // REDESIGNED: Porygon (polygonal pink & cyan geometric duck)
  porygon: { palette: { p: '#f43f5e', d: '#0284c7', l: '#38bdf8', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","................","......ppppp.....",".....ppppppp....","...llllpsbpp....","..llllllpppp....","....pppppppp....","....lllppppdd...","....llllppdddd..",".....ppppppdd...","....lll..lll....","................","................","................","................","................"
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
  snorlax: { palette: { p: '#0f766e', d: '#134e4a', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","....pp....pp....","...pppppppppp...","...pplbppblpp...","..pppppppppppp..","..ppllllllllpp..","..ppllllllllpp..","..ppllllllllpp..","...pppppppppp...","...lll....lll...","................","................","................","................","................","................"
  ]},
  articuno: { palette: { p: '#38bdf8', d: '#0284c7', l: '#e0f2fe', b: '#0f172a' }, grid: [
    ".......dd.......","..pp..pppp..pp..",".pppp.pbpp.pppp.",".pppppppppppppp.","..ddddlllllldd..","...dddppppddd...","......pppp......",".....dd..dd.....",".....dd..dd.....","....dd....dd....","................","................","................","................","................","................"
  ]},
  zapdos: { palette: { p: '#facc15', d: '#ca8a04', l: '#0f172a', b: '#f97316' }, grid: [
    ".p...p.pp.p...p.","..pp.pppppp.pp..",".ppppplppblpppp.","..ddddppppdddd..","..pppppppppppp..","...llddppddll...",".....b....b.....","................","................","................","................","................","................","................","................","................"
  ]},
  // REDESIGNED: Moltres (blazing wing tips, flame crest & long beak)
  moltres: { palette: { p: '#f97316', d: '#dc2626', l: '#fde047', b: '#0f172a' }, grid: [
    "......llll......","..ll..lssl..ll..",".llll.pppp.llll.",".lpppppbpppppppl",".pppppppppppppp.","..ddddppppdddd..","....pppppppp....",".....pp..pp.....",".....dd..dd.....","....lll..lll....","................","................","................","................","................","................".replace(/s/g, 'd')
  ]},
  dratini: { palette: { p: '#2563eb', d: '#1d4ed8', l: '#f8fafc', b: '#0f172a' }, grid: [
    "................","................",".....pppp.......","....pppppp......","....pbppbp......",".....ppppp......","......pppp......","......pppp......",".....pp..pp.....","....pp..........","................","................","................","................","................","................"
  ]},
  dragonite: { palette: { p: '#f59e0b', d: '#0d9488', l: '#fef3c7', b: '#0f172a' }, grid: [
    "......l..l......",".....pppppp.....",".....pbppbp.....","...ddppppppdd...","..dddpllllpddd..","...ddpllllpdd...",".....pllllp.pp..",".....ppppppppp..",".....pp..pp.....","................","................","................","................","................","................","................"
  ]},
  // REDESIGNED: Mewtwo (horned feline head, neck tube, purple chest & long tail)
  mewtwo: { palette: { p: '#e2e8f0', d: '#94a3b8', l: '#a855f7', b: '#0f172a' }, grid: [
    "................","....pp....pp....","....pppppppp....","....ppbppbpp....",".....pppppp.....",".....ppddpp.....","...pppppppppp...","..pp.llllll.pp..",".....llllll..l..",".....llllll.ll..","....ppp..pppl...","....pp....pp....","...ppp....ppp...","................","................","................"
  ]},
  mew: { palette: { p: '#f472b6', d: '#db2777', l: '#fce7f3', b: '#0f172a' }, grid: [
    "................","................","................","................",".....pd..dp.....",".....pppppp.....",".....pbppbp.....",".....pppppp.....",".......pp.......","..ppp..ppp......","....p..pp.......","....pppppp......","................","................","................","................"
  ]},
  lucario: { palette: { p: '#2563eb', d: '#1e293b', l: '#fde047', s: '#38bdf8', b: '#0f172a' }, grid: [
    "................","....pp....pp....","....pd....dp....","....pppppppp....","....dbppppbd....",".....pppppp.....","....llllllll....","...pllllllllp...","...p.llllll.p...",".....pppppp.....",".....pp..pp.....",".....dd..dd.....","................","................","................","................"
  ]}
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