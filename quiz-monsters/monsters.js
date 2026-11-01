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
  { id: 'ivysaur',    pokedexNo: 2,   name: 'IVYSAUR',    type: 'GRASS',    baseHp: 165, level: 16 },
  { id: 'venusaur',   pokedexNo: 3,   name: 'VENUSAUR',   type: 'GRASS',    baseHp: 190, level: 20 },
  { id: 'charmander', pokedexNo: 4,   name: 'CHARMANDER', type: 'FIRE',     baseHp: 135, level: 12 },
  { id: 'charmeleon', pokedexNo: 5,   name: 'CHARMELEON', type: 'FIRE',     baseHp: 165, level: 16 },
  { id: 'charizard',  pokedexNo: 6,   name: 'CHARIZARD',  type: 'FIRE',     baseHp: 190, level: 20 },
  { id: 'squirtle',   pokedexNo: 7,   name: 'SQUIRTLE',   type: 'WATER',    baseHp: 145, level: 12 },
  { id: 'wartortle',  pokedexNo: 8,   name: 'WARTORTLE',  type: 'WATER',    baseHp: 170, level: 16 },
  { id: 'blastoise',  pokedexNo: 9,   name: 'BLASTOISE',  type: 'WATER',    baseHp: 190, level: 20 },
  { id: 'caterpie',   pokedexNo: 10,  name: 'CATERPIE',   type: 'BUG',      baseHp: 120, level: 2 },
  { id: 'metapod',    pokedexNo: 11,  name: 'METAPOD',    type: 'BUG',      baseHp: 135, level: 7 },
  { id: 'butterfree', pokedexNo: 12,  name: 'BUTTERFREE', type: 'BUG',      baseHp: 150, level: 10 },
  { id: 'weedle',     pokedexNo: 13,  name: 'WEEDLE',     type: 'POISON',   baseHp: 118, level: 2 },
  { id: 'kakuna',     pokedexNo: 14,  name: 'KAKUNA',     type: 'POISON',   baseHp: 132, level: 7 },
  { id: 'beedrill',   pokedexNo: 15,  name: 'BEEDRILL',   type: 'BUG',      baseHp: 155, level: 10 },
  { id: 'pidgey',     pokedexNo: 16,  name: 'PIDGEY',     type: 'FLYING',   baseHp: 125, level: 10 },
  { id: 'pidgeotto',  pokedexNo: 17,  name: 'PIDGEOTTO',  type: 'FLYING',   baseHp: 148, level: 15 },
  { id: 'pidgeot',    pokedexNo: 18,  name: 'PIDGEOT',    type: 'FLYING',   baseHp: 175, level: 20 },
  { id: 'rattata',    pokedexNo: 19,  name: 'RATTATA',    type: 'NORMAL',   baseHp: 115, level: 10 },
  { id: 'raticate',   pokedexNo: 20,  name: 'RATICATE',   type: 'NORMAL',   baseHp: 145, level: 18 },
  { id: 'spearow',    pokedexNo: 21,  name: 'SPEAROW',    type: 'FLYING',   baseHp: 122, level: 10 },
  { id: 'fearow',     pokedexNo: 22,  name: 'FEAROW',      type: 'FLYING',   baseHp: 155, level: 18 },
  { id: 'ekans',      pokedexNo: 23,  name: 'EKANS',      type: 'POISON',   baseHp: 128, level: 11 },
  { id: 'arbok',      pokedexNo: 24,  name: 'ARBOK',      type: 'POISON',   baseHp: 160, level: 18 },
  { id: 'pikachu',    pokedexNo: 25,  name: 'PIKACHU',    type: 'ELECTRIC', baseHp: 135, level: 14 },
  { id: 'raichu',     pokedexNo: 26,  name: 'RAICHU',     type: 'ELECTRIC', baseHp: 165, level: 18 },
  { id: 'sandshrew',  pokedexNo: 27,  name: 'SANDSHREW',  type: 'GROUND',   baseHp: 140, level: 13 },
  { id: 'sandslash',  pokedexNo: 28,  name: 'SANDSLASH',  type: 'GROUND',   baseHp: 170, level: 20 },
  { id: 'nidoran_f',  pokedexNo: 29,  name: 'NIDORAN♀',   type: 'POISON',   baseHp: 135, level: 12 },
  { id: 'nidorina',   pokedexNo: 30,  name: 'NIDORINA',   type: 'POISON',   baseHp: 155, level: 16 },
  { id: 'nidoqueen',  pokedexNo: 31,  name: 'NIDOQUEEN',  type: 'POISON',   baseHp: 195, level: 24 },
  { id: 'nidoran_m',  pokedexNo: 32,  name: 'NIDORAN♂',   type: 'POISON',   baseHp: 135, level: 12 },
  { id: 'nidorino',   pokedexNo: 33,  name: 'NIDORINO',   type: 'POISON',   baseHp: 155, level: 16 },
  { id: 'nidoking',   pokedexNo: 34,  name: 'NIDOKING',   type: 'POISON',   baseHp: 195, level: 24 },
  { id: 'clefairy',   pokedexNo: 35,  name: 'CLEFAIRY',   type: 'FAIRY',    baseHp: 150, level: 13 },
  { id: 'clefable',   pokedexNo: 36,  name: 'CLEFABLE',   type: 'FAIRY',    baseHp: 185, level: 20 },
  { id: 'vulpix',     pokedexNo: 37,  name: 'VULPIX',     type: 'FIRE',     baseHp: 130, level: 13 },
  { id: 'ninetales',  pokedexNo: 38,  name: 'NINETALES',  type: 'FIRE',     baseHp: 180, level: 20 },
  { id: 'jigglypuff', pokedexNo: 39,  name: 'JIGGLYPUFF', type: 'FAIRY',    baseHp: 160, level: 12 },
  { id: 'wigglytuff', pokedexNo: 40,  name: 'WIGGLYTUFF', type: 'FAIRY',    baseHp: 200, level: 20 },
  { id: 'zubat',      pokedexNo: 41,  name: 'ZUBAT',      type: 'POISON',   baseHp: 125, level: 11 },
  { id: 'golbat',     pokedexNo: 42,  name: 'GOLBAT',     type: 'POISON',   baseHp: 165, level: 20 },
  { id: 'oddish',     pokedexNo: 43,  name: 'ODDISH',     type: 'GRASS',    baseHp: 132, level: 11 },
  { id: 'gloom',      pokedexNo: 44,  name: 'GLOOM',      type: 'GRASS',    baseHp: 152, level: 15 },
  { id: 'vileplume',  pokedexNo: 45,  name: 'VILEPLUME',  type: 'GRASS',    baseHp: 155, level: 16 },
  { id: 'paras',      pokedexNo: 46,  name: 'PARAS',      type: 'BUG',      baseHp: 128, level: 11 },
  { id: 'parasect',   pokedexNo: 47,  name: 'PARASECT',   type: 'BUG',      baseHp: 165, level: 20 },
  { id: 'venonat',    pokedexNo: 48,  name: 'VENONAT',    type: 'BUG',      baseHp: 135, level: 12 },
  { id: 'venomoth',   pokedexNo: 49,  name: 'VENOMOTH',   type: 'BUG',      baseHp: 170, level: 20 },
  { id: 'diglett',    pokedexNo: 50,  name: 'DIGLETT',    type: 'GROUND',   baseHp: 110, level: 12 },
  { id: 'dugtrio',    pokedexNo: 51,  name: 'DUGTRIO',    type: 'GROUND',   baseHp: 140, level: 22 },
  { id: 'meowth',     pokedexNo: 52,  name: 'MEOWTH',     type: 'NORMAL',   baseHp: 125, level: 12 },
  { id: 'persian',    pokedexNo: 53,  name: 'PERSIAN',    type: 'NORMAL',   baseHp: 165, level: 20 },
  { id: 'psyduck',    pokedexNo: 54,  name: 'PSYDUCK',    type: 'WATER',    baseHp: 140, level: 13 },
  { id: 'golduck',    pokedexNo: 55,  name: 'GOLDUCK',    type: 'WATER',    baseHp: 180, level: 22 },
  { id: 'mankey',     pokedexNo: 56,  name: 'MANKEY',     type: 'FIGHTING', baseHp: 130, level: 13 },
  { id: 'primeape',   pokedexNo: 57,  name: 'PRIMEAPE',   type: 'FIGHTING', baseHp: 155, level: 16 },
  { id: 'growlithe',  pokedexNo: 58,  name: 'GROWLITHE',  type: 'FIRE',     baseHp: 145, level: 14 },
  { id: 'arcanine',   pokedexNo: 59,  name: 'ARCANINE',   type: 'FIRE',     baseHp: 175, level: 19 },
  { id: 'poliwag',    pokedexNo: 60,  name: 'POLIWAG',    type: 'WATER',    baseHp: 125, level: 12 },
  { id: 'poliwhirl',  pokedexNo: 61,  name: 'POLIWHIRL',  type: 'WATER',    baseHp: 155, level: 16 },
  { id: 'poliwrath',  pokedexNo: 62,  name: 'POLIWRATH',  type: 'WATER',    baseHp: 190, level: 24 },
  { id: 'abra',       pokedexNo: 63,  name: 'ABRA',       type: 'PSYCHIC',  baseHp: 120, level: 14 },
  { id: 'kadabra',    pokedexNo: 64,  name: 'KADABRA',    type: 'PSYCHIC',  baseHp: 145, level: 16 },
  { id: 'alakazam',   pokedexNo: 65,  name: 'ALAKAZAM',   type: 'PSYCHIC',  baseHp: 175, level: 25 },
  { id: 'machop',     pokedexNo: 66,  name: 'MACHOP',     type: 'FIGHTING', baseHp: 150, level: 14 },
  { id: 'machoke',    pokedexNo: 67,  name: 'MACHOKE',    type: 'FIGHTING', baseHp: 175, level: 20 },
  { id: 'machamp',    pokedexNo: 68,  name: 'MACHAMP',    type: 'FIGHTING', baseHp: 200, level: 25 },
  { id: 'bellsprout', pokedexNo: 69,  name: 'BELLSPROUT', type: 'GRASS',    baseHp: 130, level: 12 },
  { id: 'weepinbell', pokedexNo: 70,  name: 'WEEPINBELL', type: 'GRASS',    baseHp: 152, level: 15 },
  { id: 'victreebel', pokedexNo: 71,  name: 'VICTREEBEL', type: 'GRASS',    baseHp: 185, level: 21 },
  { id: 'tentacool',  pokedexNo: 72,  name: 'TENTACOOL',  type: 'WATER',    baseHp: 135, level: 13 },
  { id: 'tentacruel', pokedexNo: 73,  name: 'TENTACRUEL', type: 'WATER',    baseHp: 185, level: 22 },
  { id: 'geodude',    pokedexNo: 74,  name: 'GEODUDE',    type: 'ROCK',     baseHp: 145, level: 13 },
  { id: 'graveler',   pokedexNo: 75,  name: 'GRAVELER',   type: 'ROCK',     baseHp: 170, level: 20 },
  { id: 'golem',      pokedexNo: 76,  name: 'GOLEM',       type: 'ROCK',     baseHp: 195, level: 25 },
  { id: 'ponyta',     pokedexNo: 77,  name: 'PONYTA',     type: 'FIRE',     baseHp: 140, level: 14 },
  { id: 'rapidash',   pokedexNo: 78,  name: 'RAPIDASH',    type: 'FIRE',     baseHp: 175, level: 22 },
  { id: 'slowpoke',   pokedexNo: 79,  name: 'SLOWPOKE',   type: 'PSYCHIC',  baseHp: 135, level: 13 },
  { id: 'slowbro',    pokedexNo: 80,  name: 'SLOWBRO',     type: 'PSYCHIC',  baseHp: 190, level: 24 },
  { id: 'magnemite',  pokedexNo: 81,  name: 'MAGNEMITE',  type: 'STEEL',    baseHp: 125, level: 13 },
  { id: 'magneton',   pokedexNo: 82,  name: 'MAGNETON',   type: 'STEEL',    baseHp: 160, level: 20 },
  { id: 'farfetchd',  pokedexNo: 83,  name: 'FARFETCH\'D',type: 'FLYING',   baseHp: 132, level: 14 },
  { id: 'doduo',      pokedexNo: 84,  name: 'DODUO',      type: 'FLYING',   baseHp: 120, level: 11 },
  { id: 'dodrio',     pokedexNo: 85,  name: 'DODRIO',     type: 'FLYING',   baseHp: 165, level: 22 },
  { id: 'seel',       pokedexNo: 86,  name: 'SEEL',       type: 'ICE',      baseHp: 125, level: 12 },
  { id: 'dewgong',    pokedexNo: 87,  name: 'DEWGONG',     type: 'ICE',      baseHp: 190, level: 22 },
  { id: 'grimer',     pokedexNo: 88,  name: 'GRIMER',     type: 'POISON',   baseHp: 125, level: 12 },
  { id: 'muk',        pokedexNo: 89,  name: 'MUK',         type: 'POISON',   baseHp: 200, level: 22 },
  { id: 'shellder',   pokedexNo: 90,  name: 'SHELLDER',   type: 'WATER',    baseHp: 115, level: 12 },
  { id: 'cloyster',   pokedexNo: 91,  name: 'CLOYSTER',    type: 'WATER',    baseHp: 180, level: 22 },
  { id: 'gastly',     pokedexNo: 92,  name: 'GASTLY',     type: 'GHOST',    baseHp: 115, level: 12 },
  { id: 'haunter',    pokedexNo: 93,  name: 'HAUNTER',    type: 'GHOST',    baseHp: 142, level: 16 },
  { id: 'gengar',     pokedexNo: 94,  name: 'GENGAR',     type: 'GHOST',    baseHp: 160, level: 18 },
  { id: 'onix',       pokedexNo: 95,  name: 'ONIX',       type: 'ROCK',     baseHp: 170, level: 17 },
  { id: 'drowzee',    pokedexNo: 96,  name: 'DROWZEE',    type: 'PSYCHIC',  baseHp: 125, level: 13 },
  { id: 'hypno',      pokedexNo: 97,  name: 'HYPNO',      type: 'PSYCHIC',  baseHp: 185, level: 22 },
  { id: 'krabby',     pokedexNo: 98,  name: 'KRABBY',     type: 'WATER',    baseHp: 115, level: 11 },
  { id: 'kingler',    pokedexNo: 99,  name: 'KINGLER',    type: 'WATER',    baseHp: 185, level: 22 },
  { id: 'voltorb',    pokedexNo: 100, name: 'VOLTORB',    type: 'ELECTRIC', baseHp: 120, level: 13 },
  { id: 'electrode',  pokedexNo: 101, name: 'ELECTRODE',  type: 'ELECTRIC', baseHp: 160, level: 22 },
  { id: 'exeggcute',  pokedexNo: 102, name: 'EXEGGCUTE',  type: 'GRASS',    baseHp: 130, level: 13 },
  { id: 'exeggutor',  pokedexNo: 103, name: 'EXEGGUTOR',  type: 'GRASS',    baseHp: 200, level: 24 },
  { id: 'cubone',     pokedexNo: 104, name: 'CUBONE',     type: 'GROUND',   baseHp: 135, level: 14 },
  { id: 'marowak',    pokedexNo: 105, name: 'MAROWAK',    type: 'GROUND',   baseHp: 170, level: 22 },
  { id: 'hitmonlee',  pokedexNo: 106, name: 'HITMONLEE',  type: 'FIGHTING', baseHp: 150, level: 16 },
  { id: 'hitmonchan', pokedexNo: 107, name: 'HITMONCHAN', type: 'FIGHTING', baseHp: 150, level: 16 },
  { id: 'lickitung',  pokedexNo: 108, name: 'LICKITUNG',  type: 'NORMAL',   baseHp: 155, level: 15 },
  { id: 'koffing',    pokedexNo: 109, name: 'KOFFING',    type: 'POISON',   baseHp: 125, level: 12 },
  { id: 'weezing',    pokedexNo: 110, name: 'WEEZING',    type: 'POISON',   baseHp: 175, level: 22 },
  { id: 'rhyhorn',    pokedexNo: 111, name: 'RHYHORN',    type: 'GROUND',   baseHp: 160, level: 15 },
  { id: 'rhydon',     pokedexNo: 112, name: 'RHYDON',     type: 'GROUND',   baseHp: 210, level: 26 },
  { id: 'chansey',    pokedexNo: 113, name: 'CHANSEY',    type: 'NORMAL',   baseHp: 200, level: 16 },
  { id: 'tangela',    pokedexNo: 114, name: 'TANGELA',    type: 'GRASS',    baseHp: 125, level: 14 },
  { id: 'kangaskhan', pokedexNo: 115, name: 'KANGASKHAN', type: 'NORMAL',   baseHp: 145, level: 16 },
  { id: 'horsea',     pokedexNo: 116, name: 'HORSEA',     type: 'WATER',    baseHp: 115, level: 12 },
  { id: 'seadra',     pokedexNo: 117, name: 'SEADRA',     type: 'WATER',    baseHp: 155, level: 16 },
  { id: 'goldeen',    pokedexNo: 118, name: 'GOLDEEN',    type: 'WATER',    baseHp: 120, level: 12 },
  { id: 'seaking',    pokedexNo: 119, name: 'SEAKING',    type: 'WATER',    baseHp: 170, level: 20 },
  { id: 'staryu',     pokedexNo: 120, name: 'STARYU',     type: 'WATER',    baseHp: 120, level: 13 },
  { id: 'starmie',    pokedexNo: 121, name: 'STARMIE',    type: 'WATER',    baseHp: 170, level: 22 },
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
  { id: 'vaporeon',   pokedexNo: 134, name: 'VAPOREON',   type: 'WATER',    baseHp: 210, level: 22 },
  { id: 'jolteon',    pokedexNo: 135, name: 'JOLTEON',    type: 'ELECTRIC', baseHp: 180, level: 22 },
  { id: 'flareon',    pokedexNo: 136, name: 'FLAREON',    type: 'FIRE',     baseHp: 185, level: 22 },
  { id: 'porygon',    pokedexNo: 137, name: 'PORYGON',    type: 'NORMAL',   baseHp: 140, level: 16 },
  { id: 'omanyte',    pokedexNo: 138, name: 'OMANYTE',    type: 'ROCK',     baseHp: 135, level: 15 },
  { id: 'omastar',    pokedexNo: 139, name: 'OMASTAR',    type: 'ROCK',     baseHp: 190, level: 25 },
  { id: 'kabuto',     pokedexNo: 140, name: 'KABUTO',     type: 'ROCK',     baseHp: 135, level: 15 },
  { id: 'kabutops',   pokedexNo: 141, name: 'KABUTOPS',   type: 'ROCK',     baseHp: 185, level: 25 },
  { id: 'aerodactyl', pokedexNo: 142, name: 'AERODACTYL', type: 'ROCK',     baseHp: 170, level: 20 },
  { id: 'snorlax',    pokedexNo: 143, name: 'SNORLAX',    type: 'NORMAL',   baseHp: 195, level: 20 },
  { id: 'articuno',   pokedexNo: 144, name: 'ARTICUNO',   type: 'ICE',      baseHp: 240, level: 22 },
  { id: 'zapdos',     pokedexNo: 145, name: 'ZAPDOS',     type: 'ELECTRIC', baseHp: 240, level: 22 },
  { id: 'moltres',    pokedexNo: 146, name: 'MOLTRES',    type: 'FIRE',     baseHp: 240, level: 22 },
  { id: 'dratini',    pokedexNo: 147, name: 'DRATINI',    type: 'DRAGON',   baseHp: 130, level: 14 },
  { id: 'dragonair',  pokedexNo: 148, name: 'DRAGONAIR',  type: 'DRAGON',   baseHp: 160, level: 18 },
  { id: 'dragonite',  pokedexNo: 149, name: 'DRAGONITE',  type: 'DRAGON',   baseHp: 195, level: 24 },
  { id: 'mewtwo',     pokedexNo: 150, name: 'MEWTWO',     type: 'PSYCHIC',  baseHp: 260, level: 25 },
  { id: 'mew',        pokedexNo: 151, name: 'MEW',        type: 'PSYCHIC',  baseHp: 250, level: 25 },
  { id: 'umbreon',    pokedexNo: 197, name: 'UMBREON',    type: 'DARK',     baseHp: 185, level: 20 },
  { id: 'murkrow',    pokedexNo: 198, name: 'MURKROW',    type: 'DARK',     baseHp: 145, level: 16 },
  { id: 'houndoom',   pokedexNo: 229, name: 'HOUNDOOM',   type: 'DARK',     baseHp: 185, level: 21 },
  { id: 'absol',      pokedexNo: 359, name: 'ABSOL',      type: 'DARK',     baseHp: 180, level: 21 },
  { id: 'deoxys',     pokedexNo: 386, name: 'DEOXYS',     type: 'PSYCHIC',  baseHp: 255, level: 25 },
  { id: 'lucario',    pokedexNo: 448, name: 'LUCARIO',    type: 'FIGHTING', baseHp: 185, level: 20 },
  // --- JOHTO STARTERS (GEN 2) ---
  { id: 'chikorita',  pokedexNo: 152, name: 'CHIKORITA',  type: 'GRASS',    baseHp: 135, level: 12 },
  { id: 'bayleef',    pokedexNo: 153, name: 'BAYLEEF',    type: 'GRASS',    baseHp: 160, level: 16 },
  { id: 'meganium',   pokedexNo: 154, name: 'MEGANIUM',   type: 'GRASS',    baseHp: 190, level: 22 },
  { id: 'cyndaquil',  pokedexNo: 155, name: 'CYNDAQUIL',  type: 'FIRE',     baseHp: 130, level: 12 },
  { id: 'quilava',    pokedexNo: 156, name: 'QUILAVA',    type: 'FIRE',     baseHp: 160, level: 16 },
  { id: 'typhlosion', pokedexNo: 157, name: 'TYPHLOSION', type: 'FIRE',     baseHp: 190, level: 22 },
  { id: 'totodile',   pokedexNo: 158, name: 'TOTODILE',   type: 'WATER',    baseHp: 140, level: 12 },
  { id: 'croconaw',   pokedexNo: 159, name: 'CROCONAW',   type: 'WATER',    baseHp: 165, level: 16 },
  { id: 'feraligatr', pokedexNo: 160, name: 'FERALIGATR', type: 'WATER',    baseHp: 195, level: 22 },

  // --- HOENN STARTERS (GEN 3) ---
  { id: 'treecko',    pokedexNo: 252, name: 'TREECKO',    type: 'GRASS',    baseHp: 130, level: 12 },
  { id: 'grovyle',    pokedexNo: 253, name: 'GROVYLE',    type: 'GRASS',    baseHp: 160, level: 16 },
  { id: 'sceptile',   pokedexNo: 254, name: 'SCEPTILE',   type: 'GRASS',    baseHp: 190, level: 22 },
  { id: 'torchic',    pokedexNo: 255, name: 'TORCHIC',    type: 'FIRE',     baseHp: 135, level: 12 },
  { id: 'combusken',  pokedexNo: 256, name: 'COMBUSKEN',  type: 'FIGHTING', baseHp: 165, level: 16 },
  { id: 'blaziken',   pokedexNo: 257, name: 'BLAZIKEN',   type: 'FIRE',     baseHp: 195, level: 22 },
  { id: 'mudkip',     pokedexNo: 258, name: 'MUDKIP',     type: 'WATER',    baseHp: 140, level: 12 },
  { id: 'marshtomp',  pokedexNo: 259, name: 'MARSHTOMP',  type: 'GROUND',   baseHp: 170, level: 16 },
  { id: 'swampert',   pokedexNo: 260, name: 'SWAMPERT',   type: 'WATER',    baseHp: 200, level: 22 },

  // --- SINNOH STARTERS (GEN 4) ---
  { id: 'turtwig',    pokedexNo: 387, name: 'TURTWIG',    type: 'GRASS',    baseHp: 145, level: 12 },
  { id: 'grotle',     pokedexNo: 388, name: 'GROTLE',     type: 'GRASS',    baseHp: 170, level: 16 },
  { id: 'torterra',   pokedexNo: 389, name: 'TORTERRA',   type: 'GROUND',   baseHp: 200, level: 22 },
  { id: 'chimchar',   pokedexNo: 390, name: 'CHIMCHAR',   type: 'FIRE',     baseHp: 130, level: 12 },
  { id: 'monferno',   pokedexNo: 391, name: 'MONFERNO',   type: 'FIGHTING', baseHp: 160, level: 16 },
  { id: 'infernape',  pokedexNo: 392, name: 'INFERNAPE',  type: 'FIRE',     baseHp: 190, level: 22 },
  { id: 'piplup',     pokedexNo: 393, name: 'PIPLUP',     type: 'WATER',    baseHp: 140, level: 12 },
  { id: 'prinplup',   pokedexNo: 394, name: 'PRINPLUP',   type: 'WATER',    baseHp: 165, level: 16 },
  { id: 'empoleon',   pokedexNo: 395, name: 'EMPOLEON',   type: 'STEEL',    baseHp: 195, level: 22 },

  // --- UNOVA STARTERS (GEN 5) ---
  { id: 'snivy',      pokedexNo: 495, name: 'SNIVY',      type: 'GRASS',    baseHp: 135, level: 12 },
  { id: 'servine',    pokedexNo: 496, name: 'SERVINE',    type: 'GRASS',    baseHp: 160, level: 16 },
  { id: 'serperior',  pokedexNo: 497, name: 'SERPERIOR',  type: 'GRASS',    baseHp: 190, level: 22 },
  { id: 'tepig',      pokedexNo: 498, name: 'TEPIG',      type: 'FIRE',     baseHp: 145, level: 12 },
  { id: 'pignite',    pokedexNo: 499, name: 'PIGNITE',    type: 'FIGHTING', baseHp: 175, level: 16 },
  { id: 'emboar',     pokedexNo: 500, name: 'EMBOAR',     type: 'FIRE',     baseHp: 205, level: 22 },
  { id: 'oshawott',   pokedexNo: 501, name: 'OSHAWOTT',   type: 'WATER',    baseHp: 140, level: 12 },
  { id: 'dewott',     pokedexNo: 502, name: 'DEWOTT',     type: 'WATER',    baseHp: 165, level: 16 },
  { id: 'samurott',   pokedexNo: 503, name: 'SAMUROTT',   type: 'WATER',    baseHp: 195, level: 22 },

  // --- KALOS STARTERS (GEN 6) ---
  { id: 'chespin',    pokedexNo: 650, name: 'CHESPIN',    type: 'GRASS',    baseHp: 145, level: 12 },
  { id: 'quilladin',  pokedexNo: 651, name: 'QUILLADIN',  type: 'GRASS',    baseHp: 170, level: 16 },
  { id: 'chesnaught', pokedexNo: 652, name: 'CHESNAUGHT', type: 'FIGHTING', baseHp: 200, level: 22 },
  { id: 'fennekin',   pokedexNo: 653, name: 'FENNEKIN',   type: 'FIRE',     baseHp: 130, level: 12 },
  { id: 'braixen',    pokedexNo: 654, name: 'BRAIXEN',    type: 'FIRE',     baseHp: 160, level: 16 },
  { id: 'delphox',    pokedexNo: 655, name: 'DELPHOX',    type: 'PSYCHIC',  baseHp: 190, level: 22 },
  { id: 'froakie',    pokedexNo: 656, name: 'FROAKIE',    type: 'WATER',    baseHp: 135, level: 12 },
  { id: 'frogadier',  pokedexNo: 657, name: 'FROGADIER',  type: 'WATER',    baseHp: 160, level: 16 },
  { id: 'greninja',   pokedexNo: 658, name: 'GRENINJA',   type: 'DARK',     baseHp: 190, level: 22 },

  // --- NEW INTERACTABLE OVERWORLD LEGENDARIES ---
  { id: 'raikou',    pokedexNo: 243, name: 'RAIKOU',    type: 'ELECTRIC', baseHp: 245, level: 40 },
  { id: 'entei',     pokedexNo: 244, name: 'ENTEI',     type: 'FIRE',     baseHp: 250, level: 40 },
  { id: 'suicune',   pokedexNo: 245, name: 'SUICUNE',   type: 'WATER',    baseHp: 245, level: 40 },
  { id: 'lugia',     pokedexNo: 249, name: 'LUGIA',     type: 'PSYCHIC',  baseHp: 365, level: 50 },
  { id: 'ho_oh',     pokedexNo: 250, name: 'HO-OH',     type: 'FIRE',     baseHp: 365, level: 50 },
  { id: 'kyogre',    pokedexNo: 382, name: 'KYOGRE',    type: 'WATER',    baseHp: 360, level: 50 },
  { id: 'groudon',   pokedexNo: 383, name: 'GROUDON',   type: 'GROUND',   baseHp: 360, level: 50 },
  { id: 'rayquaza',  pokedexNo: 384, name: 'RAYQUAZA',  type: 'DRAGON',   baseHp: 370, level: 60 },
  { id: 'dialga',    pokedexNo: 483, name: 'DIALGA',    type: 'DRAGON',    baseHp: 365, level: 50 },
  { id: 'palkia',    pokedexNo: 484, name: 'PALKIA',    type: 'DRAGON',   baseHp: 365, level: 50 },

  { id: 'budew',      pokedexNo: 406, name: 'BUDEW',      type: 'GRASS',    baseHp: 125, level: 10 },
  { id: 'espeon',     pokedexNo: 196, name: 'ESPEON',     type: 'PSYCHIC',  baseHp: 180, level: 22 },
  { id: 'roselia',    pokedexNo: 315, name: 'ROSELIA',    type: 'GRASS',    baseHp: 160, level: 18 },
  { id: 'leafeon',    pokedexNo: 470, name: 'LEAFEON',    type: 'GRASS',    baseHp: 185, level: 22 },
  { id: 'glaceon',    pokedexNo: 471, name: 'GLACEON',    type: 'ICE',      baseHp: 185, level: 22 },
  { id: 'sylveon',    pokedexNo: 700, name: 'SYLVEON',    type: 'FAIRY',    baseHp: 195, level: 22 },

  // --- COMPLETE GEN 2 JOHTO ROSTER (#161 - #251) + EEVEELUTIONS ---
  { id: 'sentret',    pokedexNo: 161, name: 'SENTRET',    type: 'NORMAL',   baseHp: 120, level: 10 },
  { id: 'furret',     pokedexNo: 162, name: 'FURRET',     type: 'NORMAL',   baseHp: 165, level: 18 },
  { id: 'hoothoot',   pokedexNo: 163, name: 'HOOTHOOT',   type: 'FLYING',   baseHp: 125, level: 10 },
  { id: 'noctowl',    pokedexNo: 164, name: 'NOCTOWL',    type: 'FLYING',   baseHp: 175, level: 20 },
  { id: 'ledyba',     pokedexNo: 165, name: 'LEDYBA',     type: 'BUG',      baseHp: 120, level: 10 },
  { id: 'ledian',     pokedexNo: 166, name: 'LEDIAN',     type: 'BUG',      baseHp: 155, level: 18 },
  { id: 'spinarak',   pokedexNo: 167, name: 'SPINARAK',   type: 'BUG',      baseHp: 120, level: 10 },
  { id: 'ariados',    pokedexNo: 168, name: 'ARIADOS',    type: 'POISON',   baseHp: 165, level: 19 },
  { id: 'crobat',     pokedexNo: 169, name: 'CROBAT',     type: 'POISON',   baseHp: 190, level: 24 },
  { id: 'chinchou',   pokedexNo: 170, name: 'CHINCHOU',   type: 'ELECTRIC', baseHp: 140, level: 13 },
  { id: 'lanturn',    pokedexNo: 171, name: 'LANTURN',    type: 'ELECTRIC', baseHp: 195, level: 22 },
  { id: 'pichu',      pokedexNo: 172, name: 'PICHU',      type: 'ELECTRIC', baseHp: 110, level: 8 },
  { id: 'cleffa',     pokedexNo: 173, name: 'CLEFFA',     type: 'FAIRY',    baseHp: 115, level: 8 },
  { id: 'igglybuff',  pokedexNo: 174, name: 'IGGLYBUFF',  type: 'FAIRY',    baseHp: 120, level: 8 },
  { id: 'togepi',     pokedexNo: 175, name: 'TOGEPI',     type: 'FAIRY',    baseHp: 125, level: 10 },
  { id: 'togetic',    pokedexNo: 176, name: 'TOGETIC',    type: 'FAIRY',    baseHp: 165, level: 18 },
  { id: 'natu',       pokedexNo: 177, name: 'NATU',       type: 'PSYCHIC',  baseHp: 125, level: 12 },
  { id: 'xatu',       pokedexNo: 178, name: 'XATU',       type: 'PSYCHIC',  baseHp: 170, level: 20 },
  { id: 'mareep',     pokedexNo: 179, name: 'MAREEP',     type: 'ELECTRIC', baseHp: 130, level: 12 },
  { id: 'flaaffy',    pokedexNo: 180, name: 'FLAAFFY',    type: 'ELECTRIC', baseHp: 160, level: 16 },
  { id: 'ampharos',   pokedexNo: 181, name: 'AMPHAROS',   type: 'ELECTRIC', baseHp: 195, level: 24 },
  { id: 'bellossom',  pokedexNo: 182, name: 'BELLOSSOM',  type: 'GRASS',    baseHp: 180, level: 21 },
  { id: 'marill',     pokedexNo: 183, name: 'MARILL',     type: 'WATER',    baseHp: 145, level: 13 },
  { id: 'azumarill',  pokedexNo: 184, name: 'AZUMARILL',  type: 'WATER',    baseHp: 190, level: 20 },
  { id: 'sudowoodo',  pokedexNo: 185, name: 'SUDOWOODO',  type: 'ROCK',     baseHp: 170, level: 18 },
  { id: 'politoed',   pokedexNo: 186, name: 'POLITOED',   type: 'WATER',    baseHp: 190, level: 23 },
  { id: 'hoppip',     pokedexNo: 187, name: 'HOPPIP',     type: 'GRASS',    baseHp: 120, level: 10 },
  { id: 'skiploom',   pokedexNo: 188, name: 'SKIPLOOM',   type: 'GRASS',    baseHp: 145, level: 15 },
  { id: 'jumpluff',   pokedexNo: 189, name: 'JUMPLUFF',   type: 'GRASS',    baseHp: 175, level: 21 },
  { id: 'aipom',      pokedexNo: 190, name: 'AIPOM',      type: 'NORMAL',   baseHp: 135, level: 14 },
  { id: 'sunkern',    pokedexNo: 191, name: 'SUNKERN',    type: 'GRASS',    baseHp: 110, level: 9 },
  { id: 'sunflora',   pokedexNo: 192, name: 'SUNFLORA',   type: 'GRASS',    baseHp: 170, level: 19 },
  { id: 'yanma',      pokedexNo: 193, name: 'YANMA',      type: 'BUG',      baseHp: 145, level: 15 },
  { id: 'wooper',     pokedexNo: 194, name: 'WOOPER',     type: 'WATER',    baseHp: 130, level: 11 },
  { id: 'quagsire',   pokedexNo: 195, name: 'QUAGSIRE',   type: 'GROUND',   baseHp: 185, level: 20 },
  { id: 'espeon',     pokedexNo: 196, name: 'ESPEON',     type: 'PSYCHIC',  baseHp: 185, level: 22 },
  { id: 'slowking',   pokedexNo: 199, name: 'SLOWKING',   type: 'PSYCHIC',  baseHp: 195, level: 24 },
  { id: 'misdreavus', pokedexNo: 200, name: 'MISDREAVUS', type: 'GHOST',    baseHp: 150, level: 17 },
  { id: 'unown',      pokedexNo: 201, name: 'UNOWN',      type: 'PSYCHIC',  baseHp: 130, level: 14 },
  { id: 'wobbuffet',  pokedexNo: 202, name: 'WOBBUFFET',  type: 'PSYCHIC',  baseHp: 230, level: 20 },
  { id: 'girafarig',  pokedexNo: 203, name: 'GIRAFARIG',  type: 'PSYCHIC',  baseHp: 165, level: 18 },
  { id: 'pineco',     pokedexNo: 204, name: 'PINECO',     type: 'BUG',      baseHp: 135, level: 12 },
  { id: 'forretress', pokedexNo: 205, name: 'FORRETRESS', type: 'STEEL',    baseHp: 185, level: 22 },
  { id: 'dunsparce',  pokedexNo: 206, name: 'DUNSPARCE',  type: 'NORMAL',   baseHp: 175, level: 16 },
  { id: 'gligar',     pokedexNo: 207, name: 'GLIGAR',     type: 'GROUND',   baseHp: 155, level: 16 },
  { id: 'steelix',    pokedexNo: 208, name: 'STEELIX',    type: 'STEEL',    baseHp: 210, level: 25 },
  { id: 'snubbull',   pokedexNo: 209, name: 'SNUBBULL',   type: 'FAIRY',    baseHp: 140, level: 13 },
  { id: 'granbull',   pokedexNo: 210, name: 'GRANBULL',   type: 'FAIRY',    baseHp: 185, level: 21 },
  { id: 'qwilfish',   pokedexNo: 211, name: 'QWILFISH',   type: 'POISON',   baseHp: 155, level: 16 },
  { id: 'scizor',     pokedexNo: 212, name: 'SCIZOR',     type: 'STEEL',    baseHp: 195, level: 24 },
  { id: 'shuckle',    pokedexNo: 213, name: 'SHUCKLE',    type: 'ROCK',     baseHp: 210, level: 18 },
  { id: 'heracross',  pokedexNo: 214, name: 'HERACROSS',  type: 'FIGHTING', baseHp: 185, level: 21 },
  { id: 'sneasel',    pokedexNo: 215, name: 'SNEASEL',    type: 'ICE',      baseHp: 145, level: 17 },
  { id: 'teddiursa',  pokedexNo: 216, name: 'TEDDIURSA',  type: 'NORMAL',   baseHp: 135, level: 13 },
  { id: 'ursaring',   pokedexNo: 217, name: 'URSARING',   type: 'NORMAL',   baseHp: 195, level: 23 },
  { id: 'slugma',     pokedexNo: 218, name: 'SLUGMA',     type: 'FIRE',     baseHp: 130, level: 13 },
  { id: 'magcargo',   pokedexNo: 219, name: 'MAGCARGO',   type: 'ROCK',     baseHp: 170, level: 21 },
  { id: 'swinub',     pokedexNo: 220, name: 'SWINUB',     type: 'ICE',      baseHp: 130, level: 12 },
  { id: 'piloswine',  pokedexNo: 221, name: 'PILOSWINE',  type: 'ICE',      baseHp: 185, level: 21 },
  { id: 'corsola',    pokedexNo: 222, name: 'CORSOLA',    type: 'ROCK',     baseHp: 150, level: 16 },
  { id: 'remoraid',   pokedexNo: 223, name: 'REMORAID',   type: 'WATER',    baseHp: 120, level: 12 },
  { id: 'octillery',  pokedexNo: 224, name: 'OCTILLERY',  type: 'WATER',    baseHp: 175, level: 21 },
  { id: 'delibird',   pokedexNo: 225, name: 'DELIBIRD',   type: 'ICE',      baseHp: 135, level: 15 },
  { id: 'mantine',    pokedexNo: 226, name: 'MANTINE',    type: 'WATER',    baseHp: 180, level: 20 },
  { id: 'skarmory',   pokedexNo: 227, name: 'SKARMORY',   type: 'STEEL',    baseHp: 175, level: 21 },
  { id: 'houndour',   pokedexNo: 228, name: 'HOUNDOUR',   type: 'DARK',     baseHp: 135, level: 14 },
  { id: 'kingdra',    pokedexNo: 230, name: 'KINGDRA',    type: 'DRAGON',   baseHp: 195, level: 25 },
  { id: 'phanpy',     pokedexNo: 231, name: 'PHANPY',     type: 'GROUND',   baseHp: 150, level: 13 },
  { id: 'donphan',    pokedexNo: 232, name: 'DONPHAN',    type: 'GROUND',   baseHp: 190, level: 22 },
  { id: 'porygon2',   pokedexNo: 233, name: 'PORYGON2',   type: 'NORMAL',   baseHp: 185, level: 22 },
  { id: 'stantler',   pokedexNo: 234, name: 'STANTLER',   type: 'NORMAL',   baseHp: 165, level: 18 },
  { id: 'smeargle',   pokedexNo: 235, name: 'SMEARGLE',   type: 'NORMAL',   baseHp: 145, level: 16 },
  { id: 'tyrogue',    pokedexNo: 236, name: 'TYROGUE',    type: 'FIGHTING', baseHp: 125, level: 11 },
  { id: 'hitmontop',  pokedexNo: 237, name: 'HITMONTOP',  type: 'FIGHTING', baseHp: 160, level: 20 },
  { id: 'smoochum',   pokedexNo: 238, name: 'SMOOCHUM',   type: 'ICE',      baseHp: 120, level: 10 },
  { id: 'elekid',     pokedexNo: 239, name: 'ELEKID',     type: 'ELECTRIC', baseHp: 125, level: 10 },
  { id: 'magby',      pokedexNo: 240, name: 'MAGBY',      type: 'FIRE',     baseHp: 125, level: 10 },
  { id: 'miltank',    pokedexNo: 241, name: 'MILTANK',    type: 'NORMAL',   baseHp: 190, level: 20 },
  { id: 'blissey',    pokedexNo: 242, name: 'BLISSEY',    type: 'NORMAL',   baseHp: 255, level: 24 },
  { id: 'larvitar',   pokedexNo: 246, name: 'LARVITAR',   type: 'ROCK',     baseHp: 140, level: 14 },
  { id: 'pupitar',    pokedexNo: 247, name: 'PUPITAR',    type: 'ROCK',     baseHp: 170, level: 20 },
  { id: 'tyranitar',  pokedexNo: 248, name: 'TYRANITAR',  type: 'DARK',     baseHp: 220, level: 28 },
  { id: 'celebi',     pokedexNo: 251, name: 'CELEBI',     type: 'PSYCHIC',  baseHp: 250, level: 30 },
  { id: 'poochyena',  pokedexNo: 261, name: 'POOCHYENA',  type: 'DARK',     baseHp: 120, level: 10 },
  { id: 'mightyena',  pokedexNo: 262, name: 'MIGHTYENA',  type: 'DARK',     baseHp: 170, level: 18 },
  { id: 'zigzagoon',  pokedexNo: 263, name: 'ZIGZAGOON',  type: 'NORMAL',   baseHp: 120, level: 10 },
  { id: 'linoone',    pokedexNo: 264, name: 'LINOONE',    type: 'NORMAL',   baseHp: 165, level: 18 },
  { id: 'wurmple',    pokedexNo: 265, name: 'WURMPLE',    type: 'BUG',      baseHp: 115, level: 7 },
  { id: 'silcoon',    pokedexNo: 266, name: 'SILCOON',    type: 'BUG',      baseHp: 130, level: 10 },
  { id: 'beautifly',  pokedexNo: 267, name: 'BEAUTIFLY',  type: 'BUG',      baseHp: 160, level: 15 },
  { id: 'cascoon',    pokedexNo: 268, name: 'CASCOON',    type: 'BUG',      baseHp: 130, level: 10 },
  { id: 'dustox',     pokedexNo: 269, name: 'DUSTOX',     type: 'POISON',   baseHp: 160, level: 15 },
  { id: 'lotad',      pokedexNo: 270, name: 'LOTAD',      type: 'WATER',    baseHp: 125, level: 11 },
  { id: 'lombre',     pokedexNo: 271, name: 'LOMBRE',     type: 'WATER',    baseHp: 155, level: 16 },
  { id: 'ludicolo',   pokedexNo: 272, name: 'LUDICOLO',   type: 'GRASS',    baseHp: 190, level: 22 },
  { id: 'seedot',     pokedexNo: 273, name: 'SEEDOT',     type: 'GRASS',    baseHp: 120, level: 11 },
  { id: 'nuzleaf',    pokedexNo: 274, name: 'NUZLEAF',    type: 'DARK',     baseHp: 155, level: 16 },
  { id: 'shiftry',    pokedexNo: 275, name: 'SHIFTRY',    type: 'DARK',     baseHp: 190, level: 22 },
  { id: 'taillow',    pokedexNo: 276, name: 'TAILLOW',    type: 'FLYING',   baseHp: 125, level: 11 },
  { id: 'swellow',    pokedexNo: 277, name: 'SWELLOW',    type: 'FLYING',   baseHp: 170, level: 20 },
  { id: 'wingull',    pokedexNo: 278, name: 'WINGULL',    type: 'WATER',    baseHp: 125, level: 11 },
  { id: 'pelipper',   pokedexNo: 279, name: 'PELIPPER',   type: 'FLYING',   baseHp: 175, level: 20 },
  { id: 'ralts',      pokedexNo: 280, name: 'RALTS',      type: 'PSYCHIC',  baseHp: 120, level: 10 },
  { id: 'kirlia',     pokedexNo: 281, name: 'KIRLIA',     type: 'PSYCHIC',  baseHp: 150, level: 16 },
  { id: 'gardevoir',  pokedexNo: 282, name: 'GARDEVOIR',  type: 'FAIRY',    baseHp: 195, level: 24 },
  { id: 'surskit',    pokedexNo: 283, name: 'SURSKIT',    type: 'BUG',      baseHp: 120, level: 11 },
  { id: 'masquerain', pokedexNo: 284, name: 'MASQUERAIN', type: 'FLYING',   baseHp: 165, level: 19 },
  { id: 'shroomish',  pokedexNo: 285, name: 'SHROOMISH',  type: 'GRASS',    baseHp: 130, level: 12 },
  { id: 'breloom',    pokedexNo: 286, name: 'BRELOOM',    type: 'FIGHTING', baseHp: 180, level: 21 },
  { id: 'slakoth',    pokedexNo: 287, name: 'SLAKOTH',    type: 'NORMAL',   baseHp: 135, level: 12 },
  { id: 'vigoroth',   pokedexNo: 288, name: 'VIGOROTH',   type: 'NORMAL',   baseHp: 170, level: 18 },
  { id: 'slaking',    pokedexNo: 289, name: 'SLAKING',    type: 'NORMAL',   baseHp: 235, level: 26 },
  { id: 'nincada',    pokedexNo: 290, name: 'NINCADA',    type: 'BUG',      baseHp: 120, level: 11 },
  { id: 'ninjask',    pokedexNo: 291, name: 'NINJASK',    type: 'FLYING',   baseHp: 165, level: 20 },
  { id: 'shedinja',   pokedexNo: 292, name: 'SHEDINJA',   type: 'GHOST',    baseHp: 100, level: 20 },
  { id: 'whismur',    pokedexNo: 293, name: 'WHISMUR',    type: 'NORMAL',   baseHp: 130, level: 11 },
  { id: 'loudred',    pokedexNo: 294, name: 'LOUDRED',    type: 'NORMAL',   baseHp: 165, level: 17 },
  { id: 'exploud',    pokedexNo: 295, name: 'EXPLOUD',    type: 'NORMAL',   baseHp: 195, level: 23 },
  { id: 'makuhita',   pokedexNo: 296, name: 'MAKUHITA',   type: 'FIGHTING', baseHp: 145, level: 13 },
  { id: 'hariyama',   pokedexNo: 297, name: 'HARIYAMA',   type: 'FIGHTING', baseHp: 210, level: 22 },
  { id: 'azurill',    pokedexNo: 298, name: 'AZURILL',    type: 'FAIRY',    baseHp: 115, level: 8 },
  { id: 'nosepass',   pokedexNo: 299, name: 'NOSEPASS',   type: 'ROCK',     baseHp: 160, level: 16 },
  { id: 'skitty',     pokedexNo: 300, name: 'SKITTY',     type: 'NORMAL',   baseHp: 125, level: 11 },
  { id: 'delcatty',   pokedexNo: 301, name: 'DELCATTY',   type: 'NORMAL',   baseHp: 165, level: 19 },
  { id: 'sableye',    pokedexNo: 302, name: 'SABLEYE',    type: 'GHOST',    baseHp: 155, level: 17 },
  { id: 'mawile',     pokedexNo: 303, name: 'MAWILE',     type: 'STEEL',    baseHp: 155, level: 17 },
  { id: 'aron',       pokedexNo: 304, name: 'ARON',       type: 'STEEL',    baseHp: 140, level: 13 },
  { id: 'lairon',     pokedexNo: 305, name: 'LAIRON',     type: 'STEEL',    baseHp: 175, level: 19 },
  { id: 'aggron',     pokedexNo: 306, name: 'AGGRON',     type: 'STEEL',    baseHp: 215, level: 26 },
  { id: 'meditite',   pokedexNo: 307, name: 'MEDITITE',   type: 'FIGHTING', baseHp: 125, level: 13 },
  { id: 'medicham',   pokedexNo: 308, name: 'MEDICHAM',   type: 'PSYCHIC',  baseHp: 175, level: 21 },
  { id: 'electrike',  pokedexNo: 309, name: 'ELECTRIKE',  type: 'ELECTRIC', baseHp: 130, level: 13 },
  { id: 'manectric',  pokedexNo: 310, name: 'MANECTRIC',  type: 'ELECTRIC', baseHp: 175, level: 21 },
  { id: 'plusle',     pokedexNo: 311, name: 'PLUSLE',     type: 'ELECTRIC', baseHp: 140, level: 15 },
  { id: 'minun',      pokedexNo: 312, name: 'MINUN',      type: 'ELECTRIC', baseHp: 140, level: 15 },
  { id: 'volbeat',    pokedexNo: 313, name: 'VOLBEAT',    type: 'BUG',      baseHp: 150, level: 16 },
  { id: 'illumise',   pokedexNo: 314, name: 'ILLUMISE',   type: 'BUG',      baseHp: 150, level: 16 },
  { id: 'gulpin',     pokedexNo: 316, name: 'GULPIN',     type: 'POISON',   baseHp: 140, level: 13 },
  { id: 'swalot',     pokedexNo: 317, name: 'SWALOT',     type: 'POISON',   baseHp: 190, level: 21 },
  { id: 'carvanha',   pokedexNo: 318, name: 'CARVANHA',   type: 'WATER',    baseHp: 125, level: 13 },
  { id: 'sharpedo',   pokedexNo: 319, name: 'SHARPEDO',   type: 'DARK',     baseHp: 180, level: 22 },
  { id: 'wailmer',    pokedexNo: 320, name: 'WAILMER',    type: 'WATER',    baseHp: 180, level: 16 },
  { id: 'wailord',    pokedexNo: 321, name: 'WAILORD',    type: 'WATER',    baseHp: 245, level: 25 },
  { id: 'numel',      pokedexNo: 322, name: 'NUMEL',      type: 'FIRE',     baseHp: 140, level: 13 },
  { id: 'camerupt',   pokedexNo: 323, name: 'CAMERUPT',   type: 'FIRE',     baseHp: 190, level: 22 },
  { id: 'torkoal',    pokedexNo: 324, name: 'TORKOAL',    type: 'FIRE',     baseHp: 180, level: 19 },
  { id: 'spoink',     pokedexNo: 325, name: 'SPOINK',     type: 'PSYCHIC',  baseHp: 135, level: 13 },
  { id: 'grumpig',    pokedexNo: 326, name: 'GRUMPIG',    type: 'PSYCHIC',  baseHp: 180, level: 21 },
  { id: 'spinda',     pokedexNo: 327, name: 'SPINDA',     type: 'NORMAL',   baseHp: 145, level: 15 },
  { id: 'trapinch',   pokedexNo: 328, name: 'TRAPINCH',   type: 'GROUND',   baseHp: 130, level: 14 },
  { id: 'vibrava',    pokedexNo: 329, name: 'VIBRAVA',    type: 'DRAGON',   baseHp: 165, level: 19 },
  { id: 'flygon',     pokedexNo: 330, name: 'FLYGON',     type: 'DRAGON',   baseHp: 200, level: 25 },
  { id: 'cacnea',     pokedexNo: 331, name: 'CACNEA',     type: 'GRASS',    baseHp: 130, level: 13 },
  { id: 'cacturne',   pokedexNo: 332, name: 'CACTURNE',   type: 'DARK',     baseHp: 180, level: 21 },
  { id: 'swablu',     pokedexNo: 333, name: 'SWABLU',     type: 'FLYING',   baseHp: 125, level: 12 },
  { id: 'altaria',    pokedexNo: 334, name: 'ALTARIA',    type: 'DRAGON',   baseHp: 190, level: 23 },
  { id: 'zangoose',   pokedexNo: 335, name: 'ZANGOOSE',   type: 'NORMAL',   baseHp: 175, level: 19 },
  { id: 'seviper',    pokedexNo: 336, name: 'SEVIPER',    type: 'POISON',   baseHp: 175, level: 19 },
  { id: 'lunatone',   pokedexNo: 337, name: 'LUNATONE',   type: 'ROCK',     baseHp: 170, level: 19 },
  { id: 'solrock',    pokedexNo: 338, name: 'SOLROCK',    type: 'ROCK',     baseHp: 170, level: 19 },
  { id: 'barboach',   pokedexNo: 339, name: 'BARBOACH',   type: 'WATER',    baseHp: 130, level: 12 },
  { id: 'whiscash',   pokedexNo: 340, name: 'WHISCASH',   type: 'GROUND',   baseHp: 190, level: 21 },
  { id: 'corphish',   pokedexNo: 341, name: 'CORPHISH',   type: 'WATER',    baseHp: 130, level: 13 },
  { id: 'crawdaunt',  pokedexNo: 342, name: 'CRAWDAUNT',  type: 'DARK',     baseHp: 180, level: 21 },
  { id: 'baltoy',     pokedexNo: 343, name: 'BALTOY',     type: 'GROUND',   baseHp: 130, level: 13 },
  { id: 'claydol',    pokedexNo: 344, name: 'CLAYDOL',    type: 'PSYCHIC',  baseHp: 185, level: 22 },
  { id: 'lileep',     pokedexNo: 345, name: 'LILEEP',     type: 'ROCK',     baseHp: 145, level: 15 },
  { id: 'cradily',    pokedexNo: 346, name: 'CRADILY',    type: 'GRASS',    baseHp: 195, level: 24 },
  { id: 'anorith',    pokedexNo: 347, name: 'ANORITH',    type: 'ROCK',     baseHp: 140, level: 15 },
  { id: 'armaldo',    pokedexNo: 348, name: 'ARMALDO',    type: 'BUG',      baseHp: 195, level: 24 },
  { id: 'feebas',     pokedexNo: 349, name: 'FEEBAS',     type: 'WATER',    baseHp: 105, level: 8 },
  { id: 'milotic',    pokedexNo: 350, name: 'MILOTIC',    type: 'WATER',    baseHp: 205, level: 25 },
  { id: 'castform',   pokedexNo: 351, name: 'CASTFORM',   type: 'NORMAL',   baseHp: 150, level: 16 },
  { id: 'kecleon',    pokedexNo: 352, name: 'KECLEON',    type: 'NORMAL',   baseHp: 160, level: 17 },
  { id: 'shuppet',    pokedexNo: 353, name: 'SHUPPET',    type: 'GHOST',    baseHp: 125, level: 13 },
  { id: 'banette',    pokedexNo: 354, name: 'BANETTE',    type: 'GHOST',    baseHp: 175, level: 21 },
  { id: 'duskull',    pokedexNo: 355, name: 'Duskull'.toUpperCase(), type: 'GHOST', baseHp: 125, level: 13 },
  { id: 'dusclops',   pokedexNo: 356, name: 'DUSCLOPS',   type: 'GHOST',    baseHp: 180, level: 21 },
  { id: 'tropius',    pokedexNo: 357, name: 'TROPIUS',    type: 'GRASS',    baseHp: 190, level: 21 },
  { id: 'chimecho',   pokedexNo: 358, name: 'CHIMECHO',   type: 'PSYCHIC',  baseHp: 160, level: 18 },
  { id: 'wynaut',     pokedexNo: 360, name: 'WYNAUT',     type: 'PSYCHIC',  baseHp: 140, level: 10 },
  { id: 'snorunt',    pokedexNo: 361, name: 'SNORUNT',    type: 'ICE',      baseHp: 130, level: 13 },
  { id: 'glalie',     pokedexNo: 362, name: 'GLALIE',     type: 'ICE',      baseHp: 185, level: 22 },
  { id: 'spheal',     pokedexNo: 363, name: 'SPHEAL',     type: 'ICE',      baseHp: 140, level: 12 },
  { id: 'sealeo',     pokedexNo: 364, name: 'SEALEO',     type: 'ICE',      baseHp: 175, level: 18 },
  { id: 'walrein',    pokedexNo: 365, name: 'WALREIN',    type: 'ICE',      baseHp: 210, level: 25 },
  { id: 'clamperl',   pokedexNo: 366, name: 'CLAMPERL',   type: 'WATER',    baseHp: 130, level: 13 },
  { id: 'huntail',    pokedexNo: 367, name: 'HUNTAIL',    type: 'WATER',    baseHp: 180, level: 22 },
  { id: 'gorebyss',   pokedexNo: 368, name: 'GOREBYSS',   type: 'WATER',    baseHp: 180, level: 22 },
  { id: 'relicanth',  pokedexNo: 369, name: 'RELICANTH',  type: 'ROCK',     baseHp: 190, level: 21 },
  { id: 'luvdisc',    pokedexNo: 370, name: 'LUVDISC',    type: 'WATER',    baseHp: 130, level: 14 },
  { id: 'bagon',      pokedexNo: 371, name: 'BAGON',      type: 'DRAGON',   baseHp: 135, level: 14 },
  { id: 'shelgon',    pokedexNo: 372, name: 'SHELGON',    type: 'DRAGON',   baseHp: 170, level: 20 },
  { id: 'salamence',  pokedexNo: 373, name: 'SALAMENCE',  type: 'DRAGON',   baseHp: 220, level: 28 },
  { id: 'beldum',     pokedexNo: 374, name: 'BELDUM',     type: 'STEEL',    baseHp: 130, level: 14 },
  { id: 'metang',     pokedexNo: 375, name: 'METANG',     type: 'STEEL',    baseHp: 170, level: 20 },
  { id: 'metagross',  pokedexNo: 376, name: 'METAGROSS',  type: 'STEEL',    baseHp: 225, level: 28 },
  { id: 'regirock',   pokedexNo: 377, name: 'REGIROCK',   type: 'ROCK',     baseHp: 250, level: 40 },
  { id: 'regice',     pokedexNo: 378, name: 'REGICE',     type: 'ICE',      baseHp: 250, level: 40 },
  { id: 'registeel',  pokedexNo: 379, name: 'REGISTEEL',  type: 'STEEL',    baseHp: 250, level: 40 },
  { id: 'latias',     pokedexNo: 380, name: 'LATIAS',     type: 'DRAGON',   baseHp: 245, level: 40 },
  { id: 'latios',     pokedexNo: 381, name: 'LATIOS',     type: 'DRAGON',   baseHp: 245, level: 40 },
  { id: 'jirachi',    pokedexNo: 385, name: 'JIRACHI',    type: 'STEEL',    baseHp: 250, level: 40 }

];

const DEFAULT_MONSTER_PIXELS = {
  bulbasaur: { palette: { p: '#22c55e', d: '#15803d', l: '#86efac', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".........dd.....","........dddd....","...p...pdddd....","...ppppppppl....","...bppbpplpp....","...ppppppppp....","........p..p....","................","................","................","................"
  ]},
  ivysaur: { palette: { p: '#2dd4bf', d: '#15803d', l: '#f43f5e', s: '#86efac', b: '#0f172a' }, grid: [
    "................",
    "......llll......",
    "....llllllll....",
    "...dssllllssd...",
    "..ddddddddddddd.",
    "...pppbppppbppp.",
    "..pppppppppppppp",
    "..ppbppppppppbpp",
    "..pppppppppppppp",
    "...pppppppppppp.",
    "...ppp..pp..ppp.",
    "...ppp..pp..ppp.",
    "................",
    "................",
    "................",
    "................"
  ]},
  venusaur: { palette: { p: '#14b8a6', d: '#15803d', l: '#fde047', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",".....ssssss.....","...sssslsssss...","..sssssllsssss..","...dddddddddd...","..dddddddddddd..","...pppppppppp...", "..pppppppppppp..","..ppbppppppbpp..","..pppppppppppp..","..pppppssspppp..","...pppppppppp...", "...ppp....ppp...", "................","................","................"
  ]},
  charmander: { palette: { p: '#f97316', d: '#c2410c', l: '#fdba74', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","................","................",".....pppppp.....",".....pbppbp.....",".....pppppp..s..",".......ppppp.d..","......ppppp..l..",".......pllp..p..",".......pllp.p...",".......pllppp...",".......p..p.....","................","................","................"
  ]},
  charmeleon: { palette: { p: '#f97316', d: '#b91c1c', l: '#fdba74', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",
    "................",
    "........s.......",
    "........s.......",
    "......ssss......",
    ".....ssssss.....",
    ".....sbssbs.....",
    ".....ssssss..s..",
    "......sssss.d...",
    ".....sssss..l...",
    "......slls.ss...",
    "......slls.s....",
    "......sllsss....",
    ".......s..s.....",
    "................",
    "................"
  ]},
  charizard: { palette: { p: '#f97316', d: '#3869b7', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",
    "................",
    ".......p.p......",
    "ppppp.pppp.sssss",
    ".dddp.pbpbpsddd.",
    ".dddp.pppppsddd.",
    "..ddp..pp..sdd..",
    "...ddpppppsdd...",
    "....ppllllps..ss",
    "...pppllllpps.ls",
    "...pppllllpps.p.",
    "....ppllllppppp.",
    "....pppppppppp..",
    "....pp....pp....",
    "................",
    "................"
  ]},
  squirtle: { palette: { p: '#3b82f6', d: '#a16207', l: '#93c5fd', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","......pppppp....","......pppppp....","......bppppb....","......pppppp....",".....pssssssp...",".....dssssssd...",".....dssssssd...",".....dssssssd...",".....dssssssd...","......p....p....","................","................","................"
  ]},
  wartortle: { palette: { p: '#60a5fa', d: '#92400e', l: '#eff6ff', s: '#fde047', b: '#0f172a' }, grid: [
    "................",
    "..ll........ll..",
    ".lll.pppppp.lll.",
    "..llppppppppll..",
    "....pbppppbp....",
    "....pppppppp..ll",
    "...pssssssssp.ll",
    "..ppdssssssdppll",
    "....dssssssdppl.",
    "....dssssssd.ll.",
    "....pppppppp....",
    "....pp....pp....",
    "................",
    "................",
    "................",
    "................"
  ]},
  blastoise: { palette: { p: '#2563eb', d: '#78350f', l: '#cbd5e1', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","..ll..pppp..ll..","..ll.pppppp.ll..","...l.pbppbp.l...","...ddppppppdd...","..ddddssssdddd..","..dddssssssddd..","..dddssssssddd..","..ddddssssdddd..","...pppddddppp...","...pp......pp...","................","................","................","................","................"
  ]},
  caterpie: { palette: { p: '#84cc16', d: '#4d7c0f', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","................","....s.s.........","....sss.........","...ppsppp.......","...blppbl.......","...blppbl.......","...pddppp.......","....ddpdd..p....",".....llldd.p....","......llpddp....",".......lllpp....","................","................","................"
  ]},
  metapod: { palette: { p: '#22c55e', d: '#15803d', l: '#86efac', s: '#ffffff', b: '#0f172a' }, grid: [
    "................",
    ".......pp.......",
    "......pppp......",
    ".....pllllp.....",
    "....pppppppp....",
    "....psbppbsp....",
    "...pppppppppp...",
    "...pppddddppp...",
    "...pppppppppp...",
    "....pppddppp....",
    ".....pppppp.....",
    "......dddd......",
    ".......dd.......",
    "................",
    "................",
    "................"
  ]},
  butterfree: { palette: { p: '#f8fafc', d: '#4c1d95', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [
     "................",
      ".....bb..bb.....",
      "......b..b......",
      "bbbbb.b..b..bbbb",
      "bpppb.b..b.bpppb",
      "bpppbddddddbpppb",
      "bbbppssddssbpbbb",
      "bppbpssddsspbppb",
      "bbbppddllddppbbb",
      "bpppppddddpppppb",
      "bbbppplddlpppbbb",
      "...bppddddpbbb..",
      "..bpbblddlbbpb..",
      "..bpbpl..lpbpb..",
      "..bbppb..bppbb..",
      "....bb....bbb..."
  ]},
  weedle: { palette: { p: '#eab308', d: '#a16207', l: '#fef08a', s: '#dc2626', b: '#0f172a' }, grid: [
    "................","................","......ll........","......ll........","....pppppp......","....bpsspb......","....ppsspp......","....pppppp......","......ppp.......","......ppp...l...",".......ppp..p...",".......pppppp...",".........ppp....","................","................","................"
  ]},
  kakuna: { palette: { p: '#facc15', d: '#a16207', l: '#fef08a', b: '#0f172a' }, grid: [
    "................",
    "......pppp......",
    ".....pllpp......",
    "....pppppppp....",
    "....pbppppbp....",
    "....pppppppp....",
    "...pppddddppp...",
    "...pppppppppp...",
    "....ppddddpp....",
    "....pppppppp....",
    ".....dddddd.....",
    "......dddd......",
    ".......dd.......",
    "................",
    "................",
    "................"
  ]},
  beedrill: { palette: { p: '#facc15', d: '#0f172a', l: '#e0f2fe', s: '#ef4444', b: '#0f172a' }, grid: [
    "....d......d....",
    "..ll.d....d.ll..",
    ".llll.pppp.llll.",
    "..ll..pssp..ll..",
    "......pppp......",
    "..l..dddddd..l..",
    ".ll..pppppp..ll.",
    "....dpddddpd....",
    "...l..pppp..l...",
    "..l...dddd...l..",
    "......pppp......",
    ".......dd.......",
    ".......ll.......",
    "................",
    "................",
    "................"
  ]},
  pidgey: { palette: { p: '#a16207', d: '#713f12', l: '#fef08a', s: '#f97316', b: '#0f172a' }, grid: [
    "................","................","................",".......pp.......",".....lppppl.....",".....lppppl.....",".dppppbppbppppd.","..dppplpplpppd..","...dpplsllppd...","....ddllllpd....",".....dddddd.....","......d..d......","......s..s......","................","................","................"
  ]},
  pidgeotto: { palette: { p: '#a16207', d: '#ef4444', l: '#fef08a', s: '#f97316', b: '#0f172a' }, grid: [
    "................",".....dddddd.....","....dddddddd....","....lppppppl....","....lpbppbp.....",".pppppppspppppp.",".ppppplllllpppp.","..pppplllllppp..","...ppplllllpp...","....dddddddddd..",".....d..d..dd...",".....s..s.......","................","................","................","................"
  ]},
  pidgeot: { palette: { p: '#f97316', d: '#a16207', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","...dddddddd.....","..dddddddddd....","...lpppppppl....","...lpbppbbpnl...", ".ppppppppppppp.", ".pppplllllppppp.", "..ppplllllpppp..","...pppllllppp...", "....dddddddddd..", ".....d..d..dd...", ".....s..s.......","................","................","................","................"
  ]},
  rattata: { palette: { p: '#a855f7', d: '#6b21a8', l: '#f3e8ff', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","................","..........ppp...","...pp..pp...pp..","..pdpppdpp...p..","..pdpppppp...p..","...ppbppb....p..","..llpppppp..pp..","...ssllllpppp...","....llllpppp....","....pp..pp......","....l....l......","................","................","................","................"
  ]},
  raticate: { palette: { p: '#d97706', d: '#78350f', l: '#fef3c7', s: '#ffffff', b: '#0f172a' }, grid: [
    "................",
    "...pp......pp...",
    "..pdpp....ppdp..",
    "...pppppppppp...",
    "..llppbppbpp.ll.",
    "...pppppppppp...",
    "..llppssssppll..",
    "....ppsssspp....",
    "...pppppppppp...",
    "..pppppppppppp..",
    "...pppllllppp.dd",
    "....pp....pp.d..",
    "................",
    "................",
    "................",
    "................"
  ]},
  spearow: { palette: { p: '#b45309', d: '#78350f', l: '#fde68a', s: '#dc2626', b: '#0f172a' }, grid: [
    "................","................","................","........p.......","......p.p.p.....","......ppppp.....","......dbpbd.....","......dpppd.....","..sssssdldsssss.","...ssssdldssss..","....sssdddss....",".......d.d......",".......l.l......","................","................","................"
  ]},
  fearow: { palette: { p: '#b45309', d: '#78350f', l: '#fef08a', s: '#f97316', b: '#0f172a' }, grid: [
    "................",".....llll.......","....llllll......",".....lppppl.....",".....lpbppl.....","..ssssdldsssss..", ".sssssdldsssss..", ".....dppppd.....", "....dppppd......",".....dddd.......",".....l..l.......","................","................","................","................","................"
  ]},
  ekans: { palette: { p: '#a855f7', d: '#facc15', l: '#ecfccb', s: '#0f172a', b: '#0f172a' }, grid: [
    "................","................","................","................","...pppppdpp.....","...ppsppdpp.....","...pppppdppp....",".....ddddppp....","........pppp....",".......ppps.....",".....pdddds..d..","....ppppppsppp..","....ppppppppp...","................","................","................"
  ]},
  arbok: { palette: { p: '#581c87', d: '#3b0764', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","...pplsssslpp...", "...ppsbllbspp...", "...pppppppppp...", "....dddddddd....",".....pppppp.....","...pppppppppp...", "..pppppppppppp..","................","................","................","................","................"
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
  sandslash: { palette: { p: '#eab308', d: '#78350f', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: [
    ".....dd..dd.....",
    "...dddddddddd...",
    "..dddddddddddd..",
    "..ddppppppppdd..",
    ".ddppbppppbppdd.",
    ".ddppppppppppdd.",
    "..ddppllllpddd..",
    "...sspllllp.ss..",
    "....ppllllpp....",
    "....pp....pp....",
    "...ss......ss...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  nidoran_f: { palette: { p: '#3b82f6', d: '#1e3a8a', l: '#bfdbfe', b: '#0f172a' }, grid: [
    "................","................","................","................","................","................","................","...p.p.ppdp.....","...pppppppp.....","...bpbppdpp.....","...pppppppp.....","......p...p.....","................","................","................","................"
  ]},
  nidorina: { palette: { p: '#60a5fa', d: '#1d4ed8', l: '#dbeafe', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",
    "...pp......pp...",
    "..pdpp....ppdp..",
    "...pppppppppp...",
    "...pppsbbsppp...",
    "..lpppppppppp...",
    "...pppddddppp...",
    "..lpppppppppp.l.",
    "...pppllllppp...",
    "...pppppppppp...",
    "....pp....pp....",
    "....ll....ll....",
    "................",
    "................",
    "................",
    "................"
  ]},
  nidoqueen: { palette: { p: '#2563eb', d: '#1e3a8a', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: [
    ".......s........",
    "...pp.ppp.pp....",
    "...ppppppppp....",
    "....ppbppbpp....",
    "..pppppppppppp..",
    ".pppppllllppppp.",
    ".ppppdddddddppp.",
    "..ppplllllllpp..",
    "..ppppppppppppd.",
    "...ppppppppppdd.",
    "...ppp....ppp...",
    "...ssl....lss...",
    "................",
    "................",
    "................",
    "................"
  ]},
  nidoran_m: { palette: { p: '#a855f7', d: '#581c87', l: '#e9d5ff', b: '#0f172a' }, grid: [
    "................","................","................","................","................","................","...p.p..........","...pdp.ppdp.....","...pppppppp.....","...bpbppdpp.....","...pppppppp.....","......p...p.....","................","................","................","................"
  ]},
  nidorino: { palette: { p: '#a855f7', d: '#6b21a8', l: '#f3e8ff', s: '#ef4444', b: '#0f172a' }, grid: [
    ".......ll.......",
    "..pp..ll..pp....",
    "..pdppppppdp..d.",
    "...pppppppp..dd.",
    "...ppsbppbspp...",
    "....ppppppppdd..",
    "...pppppppppp...",
    "...ppdppppdpp...",
    "...pppppppppp...",
    "....pp....pp....",
    "....ll....ll....",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  nidoking: { palette: { p: '#9333ea', d: '#581c87', l: '#e9d5ff', s: '#ffffff', b: '#0f172a' }, grid: [
    ".......ss.......",
    "..pp..ss..pp....",
    "..pdppppppdp....",
    "...ppbppppbpp...",
    ".pppppppppppppp.",
    "ppppppllllpppppp",
    "ppppppddddpppppp",
    ".pppppllllppppd.",
    "..pppppppppppdd.",
    "...ppp....ppp...",
    "...ssl....lss...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  clefairy: { palette: { p: '#f472b6', d: '#db2777', l: '#fbcfe8', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....dd..dd.....",".....ll..ll.....",".....llllll.....",".....lbllbl.....","....lpllllpl....",".....llllll.l...",".....llllllll...",".....l....l.....","................","................","................"
  ]},
  clefable: { palette: { p: '#f9a8d4', d: '#be185d', l: '#fce7f3', b: '#0f172a' }, grid: [
    "................",
    "..dd........dd..",
    "..pp...pp...pp..",
    "...pppppppppp...",
    "...pppbppbppp...",
    "..dppppddppppd..",
    ".ddppppppppppdd.",
    "..dppppppppppd..",
    "...ppppppppppp..",
    "....pppppppppp..",
    "....pp....pp....",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  vulpix: { palette: { p: '#ea580c', d: '#9a3412', l: '#fdba74', b: '#0f172a' }, grid: [
    "................","................","................","................","................","................","...d..d.........","...dddd.........","..pppppp...p.p..","...bppb....p....","...ppppppppp.p..","....pp.pppp.p...",".......ppppp.p..",".......p..p.....","................","................"
  ]},
  ninetales: { palette: { p: '#fef08a', d: '#eab308', l: '#ffffff', s: '#ef4444', b: '#0f172a' }, grid: [
    "...........dd...",
    "...p..p..dddddd.",
    "...pppp.ppppppp.",
    "...psbp.pppppppp",
    "....ppp.pppppppp",
    "....llllllllpppp",
    "....ppppppppppp.",
    "....pppppppppp..",
    "....pp...pp.....",
    "....pp...pp.....",
    "....dd...dd.....",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  jigglypuff: { palette: { p: '#f472b6', d: '#be185d', l: '#fbcfe8', b: '#0f172a', w: '#38bdf8' }, grid: [
    "................","................","................","................","................",".....l....l.....",".....llllll.....",".....lwdlwd.....","....llwwlwwl....",".....llllll.....",".....llllll.....","......l..l......","................","................","................","................"
  ]},
  wigglytuff: { palette: { p: '#f472b6', d: '#db2777', l: '#ffffff', s: '#38bdf8', b: '#0f172a' }, grid: [
    "...ll......ll...",
    "..lpp..pp..ppl..",
    "..pppppppppppp..",
    "..pppppppppppp..",
    "..ppssppppsspp..",
    "..ppsbppppsbpp..",
    "..pppllllllppp..",
    "..pppllllllppp..",
    "...ppllllllpp...",
    "....pppppppp....",
    "....pp....pp....",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  zubat: { palette: { p: '#6366f1', d: '#312e81', l: '#c7d2fe', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....p..p.......",".....p..p.......",".....pppp.......",".....pppp.......",".....lppl.......","...dddppddd.....","...dddppddd.....","...d.dppd.d.....","................","................","................"
  ]},
  golbat: { palette: { p: '#3b82f6', d: '#581c87', l: '#ffffff', s: '#0f172a', b: '#0f172a' }, grid: [
    ".p............p.",
    "pp...p....p...pp",
    "pdp..pppppp..pdp",
    "pddppppbppbpppdp",
    ".pddpplssssppddp",
    ".ppdppssssssppdp",
    "..pddpsssssspdd.",
    "...pddpsssspdd..",
    "....pppddddppp..",
    ".....p....p.....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  oddish: { palette: { p: '#3b82f6', d: '#1e40af', l: '#93c5fd', s: '#16a34a', b: '#0f172a' }, grid: [
    "................","................","................",".......s........","....ss.s.ss.....",".....s.s.s......",".....s.s.s......",".....ppppp......",".....bpppb......",".....ppppp......",".....ppppp......",".....p...p......","................","................","................","................"
  ]},
  gloom: { palette: { p: '#1e3a8a', d: '#b91c1c', l: '#f97316', s: '#fde047', b: '#0f172a' }, grid: [
    "................",
    "...dddd..dddd...",
    "..ddssddddssdd..",
    "..dddddddddddd..",
    "...llllllllll...",
    "....pppppppp....",
    "...pppbppbppp...",
    "...ppppddpppp...",
    "....ppppppps....",
    "....pp....pp....",
    "....pp....pp....",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  vileplume: { palette: { p: '#ef4444', d: '#1e3a8a', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","...pppppppppp...","..ppsppppppspp..","..ppppplllpppp..","..ppspplllppsp..","...pppppppppp...",".....dddddd.....",".....dddddddd...", "....dddddddd....", ".....dddddd.....", ".....dd..dd.....", "................","................","................","................","................"
  ]},
  paras: { palette: { p: '#dc2626', d: '#991b1b', l: '#fca5a5', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....ddl.ddl....",".....ldd.ldd....","....ppppppp.....","....bppbppp.....","...plpplppp.....","...p....p.p.....","................","................","................","................","................"
  ]},
  parasect: { palette: { p: '#ef4444', d: '#991b1b', l: '#fde047', s: '#f97316', b: '#0f172a' }, grid: [
    "....pppppppp....",
    "..ppplllllppppp.",
    ".pppllllppppllpp",
    ".pppppppppppllpp",
    "ppppllpppppppppp",
    "ppppllppppppllpp",
    ".dddddddddddddd.",
    "...ssssbssssb...",
    "..ss.ssssss.ss..",
    ".ss..ssssss..ss.",
    ".s...s....s...s.",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  venonat: { palette: { p: '#7e22ce', d: '#581c87', l: '#e9d5ff', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","................",".....ll..ll.....","......l..l......","......l..l......",".....psspss.....",".....psspss.....",".....plpplp.....",".....pppppp.....",".....pppppp.....",".....l....l.....","................","................","................","................"
  ]},
  venomoth: { palette: { p: '#c084fc', d: '#7e22ce', l: '#f3e8ff', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".ll..........ll.",
    "llll..d..d..llll",
    "lpppl.dddd.lpppl",
    "lppppldsbdlppppl",
    ".lpppddddddpppl.",
    "..llllddddllll..",
    ".lppppddddppppl.",
    "lpppl.dddd.lpppl",
    ".lll...dd...lll.",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  diglett: { palette: { p: '#a16207', d: '#713f12', l: '#f472b6', b: '#0f172a' }, grid: [
    "................","................","................","................","................","................","......pppp......","......bppb......", "......pllp......", "......pppp......", "......pppp......", ".....dddddd.....",".....dddddd.....","................","................","................"
  ]},
  dugtrio: { palette: { p: '#a16207', d: '#713f12', l: '#f472b6', b: '#0f172a' }, grid: [
    "................","................","................","................","....pp..pp..pp..", "....bp..bp..bp..", "....pl..pl..pl..", "....pp..pp..pp..", "...dddddddddddd.", "...dddddddddddd.", "................","................","................","................","................","................"
  ]},
  meowth: { palette: { p: '#fef08a', d: '#ca8a04', l: '#ffffff', b: '#0f172a', s: '#b45309' }, grid: [
    "................","................","................","................",".....p.dd.p.....",".....ppddpp.....",".....pbppbp.....",".....pppppp.....","......pppp......",".....pppppp.s...","......pppp..p...","......p..pppp...","......p..p......","................","................","................"
  ]},
  persian: { palette: { p: '#fde68a', d: '#ca8a04', l: '#ef4444', b: '#0f172a' }, grid: [
    "................",
    "..bb........bb..",
    "..bpp..ll..ppb..",
    "...pppppppppp...",
    "...ppbppppbpp...",
    "....pppppppp....",
    ".....pppppp..pp.",
    "....pppppppp..p.",
    "....pppppppp.pp.",
    "....pp....pppp..",
    "....pp....pp....",
    "...dd......dd...",
    "................",
    "................",
    "................",
    "................"
  ]},
  psyduck: { palette: { p: '#facc15', d: '#ca8a04', l: '#fef08a', b: '#0f172a', s: '#000000' }, grid: [
    "................","................","................","........b.......","......b.b.b.....",".....ppppppp....",".....pbpppbp....",".....plllllp....","....pplllllpp...",".....ppppppp....",".....ppppppp....",".....ppppppp....","......p...p.....","................","................","................"
  ]},
  golduck: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "......p..p......",
    ".....pppppp.....",
    ".....ppsspp.....",
    ".....pbppbp.....",
    "....llllllll....",
    "...pppppppppp...",
    "..pp.pppppp.pp..",
    ".pp..pppppp..pp.",
    ".....pppppp.....",
    "....ppp..ppp....",
    "....pp....pp....",
    "...lll....lll...",
    "................",
    "................",
    "................",
    "................"
  ]},
  mankey: { palette: { p: '#d97706', d: '#b45309', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","................","................","................",".....ll...ll....",".....lllllll....",".....lblllbl....","...dlllpppllld..","..d..lllllll....","..l..lllllll....","..llllllllll....","......l...l.....","......d...d.....","................","................","................"
  ]},
  primeape: { palette: { p: '#fde68a', d: '#78350f', l: '#ef4444', b: '#0f172a' }, grid: [
    "................","................","....dd....dd....","...pppppppppp...","...plbppppbpl...","..dppppddppppd..","..bppppppppppb..","...pppppppppp...","....pppppppp....","....bb....bb....","....dd....dd....","................","................","................","................","................"
  ]},
  growlithe: { palette: { p: '#ea580c', d: '#9a3412', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................",".....ll.........","....ll..p.......","...blllpp.......","...ppbppp.......","..dlllppp.......","...llllpp.......","...blllpbp......","....lllbbpb.l...","....llpppbblll..", ".....lpppbplll..", ".....ppppppll...", ".....dpdpdpd....", "................","................"
  ]},
  arcanine: { palette: { p: '#f97316', d: '#0f172a', l: '#fef3c7', b: '#0f172a' }, grid: [
    "...ll..llll.....",
    "..llllllllll....",
    "..llpbpppbll....",
    "..lllppppllll...",
    "...lllllllpp.ll.",
    "....llpdppdppll.",
    "....ppddppddpll.",
    "....pppppppppll.",
    "....pdppppdp....",
    "....pp....pp....",
    "...lll....lll...",
    "...pp......pp...",
    "................",
    "................",
    "................",
    "................"
  ]},
  poliwag: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#f472b6', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....bppppb.....",".....ppllpp.....",".....pssssp.....","..pd.pssdsp.....","..pd.psddsp.....","..ppppssssp.....","......p..p......","......p..p......","................","................","................"
  ]},
  poliwhirl: { palette: { p: '#3b82f6', d: '#1e3a8a', l: '#ffffff', b: '#0f172a' }, grid: [
    "................",
    "....ll....ll....",
    "...lbbppppbbl...",
    "...pppppppppp...",
    "..pppppppppppp..",
    ".ll.pllllllp.ll.",
    ".ll.plbbbbbp.ll.",
    "....plblllbp....",
    "....plblllbp....",
    "....pllllllp....",
    "....pppppppp....",
    "....ppp..ppp....",
    "................",
    "................",
    "................",
    "................"
  ]},
  poliwrath: { palette: { p: '#1d4ed8', d: '#1e3a8a', l: '#ffffff', b: '#0f172a' }, grid: [
    "....ll....ll....",
    "...lbbppppbbl...",
    "..pppppppppppp..",
    ".pppppppppppppp.",
    "llppplllllllpppl",
    "llppplbbbbbbpppl",
    ".pppplbllllbpp..",
    "..ppplbllbbpp...",
    "...pplllllllp...",
    "...pppppppppp...",
    "...ppp....ppp...",
    "...ddd....ddd...",
    "................",
    "................",
    "................",
    "................"
  ]},
  abra: { palette: { p: '#facc15', d: '#ca8a04', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................","................","................","......p..p......","......pppp......",".....pbppbp.....",".....dppppd.....","....pddllddp....","....ppddddpp....","...p..pppp......","...dpppppp......","......p..p......","................","................"
  ]},
  kadabra: { palette: { p: '#facc15', d: '#854d0e', l: '#94a3b8', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","....p......p....","....pp....pp....",".....ppsspp.....",".....pbppbp.....","....llpppppl..l.", "...dddddddd...l.", "....dddddddd.ll.", ".....pppppppp...", ".....pp...pp....", "....dd.....dd...", "................","................","................","................","................"
  ]},
  alakazam: { palette: { p: '#facc15', d: '#78350f', l: '#fef08a', s: '#94a3b8', b: '#0f172a' }, grid: [
    "..p..........p..",
    "...pp.pppp.pp...",
    "....pppppppp....",
    ".ss.ppbppbpp.ss.",
    ".ss.llllllll.ss.",
    "..s.ll.dd.ll.s..",
    "..s..dddddd..s..",
    "....ppddddpp....",
    "....pp.dd.pp....",
    "....pp....pp....",
    "...dd......dd...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  machop: { palette: { p: '#93c5fd', d: '#3b82f6', l: '#dbeafe', b: '#0f172a' }, grid: [
    "................","................","................","................","......d.d.......",".....ppppp......",".....bpppb......",".....ppppp......",".....ppppp......","......ppp.......",".....ppppp......","......lpl.p.....","......ppppp.....","......p.p.......","................","................"
  ]},
  machoke: { palette: { p: '#94a3b8', d: '#475569', l: '#ef4444', s: '#eab308', b: '#0f172a' }, grid: [
    ".....ssssss.....",
    "....pppppppp....",
    "....ppbppbpp....",
    "..pppppppppppp..",
    ".plp.pppppp.plp.",
    ".pp..pppppp..pp.",
    ".....ssssss.....",
    "....dddddddd....",
    "....ppp..ppp....",
    "....pp....pp....",
    "...ddd....ddd...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  machamp: { palette: { p: '#94a3b8', d: '#334155', l: '#fde047', s: '#0f172a', b: '#0f172a' }, grid: [
    "..pp..llll..pp..",
    ".pp..pppppp..pp.",
    ".pp..ppbppbp.pp.",
    "..pppppppppppp..",
    ".pppppppppppppp.",
    "pp..pppppppp..pp",
    "....llllllll....",
    "....ssssssss....",
    "....ppp..ppp....",
    "....pp....pp....",
    "...ddd....ddd...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  bellsprout: { palette: { p: '#eab308', d: '#a16207', s: '#16a34a', b: '#0f172a' }, grid: [
    "................","................","................","................","................",".....pp.........","....pppp...ss...","....bppb..sss...","....ppppddss....","....ppppsd......","....ddddsd......", "......ss.d......", "........dd......", ".......dd.dd....", "................","................"
  ]},
  weepinbell: { palette: { p: '#facc15', d: '#a16207', l: '#22c55e', s: '#f472b6', b: '#0f172a' }, grid: [
    ".......dd.......",
    ".....pppppp.....",
    "....pppppppp....",
    "....ppbppbpp....",
    "..llppppppppll..",
    ".lllpppppppplll.",
    "..llppssssppll..",
    "....psbbbbsp....",
    "....psbbbbsp....",
    ".....ssssss.....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  victreebel: { palette: { p: '#eab308', d: '#15803d', l: '#22c55e', s: '#b91c1c', b: '#0f172a' }, grid: [
    "...dddddddddd...",
    "....pppppppp....",
    "...pssssssssp...",
    "...psbbbbbbsp...",
    "..llppppppppll..",
    ".lllppbppbpp.ll.",
    "..llpppppppp..d.",
    "...pppppppppp.d.",
    "....pppppppp.dd.",
    ".....pppppp.....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  tentacool: { palette: { p: '#3b82f6', d: '#db2777', l: '#a16207', s: '#dc2626', b: '#0f172a' }, grid: [
    "................","................","................",".......ppp......","......ppppp.....",".....sspppss....",
    ".....sspppss....",
    "......bpppb.....",
    "......ppppp.....",
    "......l...l.....",
    "......l...l.....",
    "......l...l.....",
    ".....ll...ll....",
    "................","................","................"
  ]},
  tentacruel: { palette: { p: '#2563eb', d: '#1e293b', l: '#ef4444', b: '#0f172a' }, grid: [
    "....pppppppp....",
    "..pplllppplllpp.",
    ".ppplllppplllppp",
    "pppppppppppppppp",
    ".ppppbppppbpppp.",
    "..dddddddddddd..",
    "..d.d.d..d.d.d..",
    ".d..d.d..d.d..d.",
    ".d..d..dd..d..d.",
    "....d......d....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  geodude: { palette: { p: '#a8a29e', d: '#57534e', l: '#d6d3d1', b: '#0f172a' }, grid: [
    "................","................","................","................","..dp...pp...pd..","..pp.lppppl.pp..","...p.pppppp.p...","...pppbppbppp...",".....pppppp.....",".....pppppp.....",".....dppppd.....","................","................","................","................","................"
  ]},
  graveler: { palette: { p: '#78716c', d: '#44403c', l: '#a8a29e', b: '#0f172a' }, grid: [
    "....pppppppp....",
    "..pppllllllppp..",
    ".pp.pppppppp.pp.",
    "pp..ppbppbpp..pp",
    "pp.pppppppppp.pp",
    ".pppddddddddppp.",
    "..pppppppppppp..",
    "...dddddddddd...",
    "...ppp....ppp...",
    "...ddd....ddd...",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  golem: { palette: { p: '#44403c', d: '#1c1917', l: '#a8a29e', s: '#ef4444', b: '#0f172a' }, grid: [
    "....dddddddd....",
    "..ddppppppppdd..",
    ".ddppppppppppdd.",
    "ddpppddppddpppdd",
    "dlllpsbppbspllld",
    "ddppppppppppppdd",
    ".ddppppppppppdd.",
    "..dddddddddddd..",
    "...lll....lll...",
    "...ddd....ddd...",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  ponyta: { palette: { p: '#ea580c', d: '#9a3412', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","................","................",".....pp.........","...ppp..........","...ppl..........","..llblp.....pp..","..llllpppp.pp...",".....llllllpp...",".....llllllpp...",".....llllll.....",".....lp...lp....",".....l....l.....","................","................","................"
  ]},
  rapidash: { palette: { p: '#fef3c7', d: '#f97316', l: '#fde047', b: '#0f172a' }, grid: [
    "......l.........",
    ".....l.dd.......",
    "....ppdddd......",
    "...pppbpddd.....",
    "...ppppppddd.dd.",
    ".....pppppddddd.",
    "....ppppppppddd.",
    "....pppppppp.dd.",
    "....pp....pp....",
    "...pp......pp...",
    "...dd......dd...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  slowpoke: { palette: { p: '#f472b6', d: '#db2777', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","................","................","...dd..dd.......","...pppppp.......","..pbppppbp..ll..","..ppllllpp..ll..","...llllll...pp..","....pppppppppp..","....ppppppppp...","....pppppppp....","....pp....pp....","....dd....dd....","................","................","................"
  ]},
  slowbro: { palette: { p: '#f472b6', d: '#94a3b8', l: '#fef08a', b: '#0f172a' }, grid: [
    "...pppppppp.....",
    "..pppppppppp....",
    "..ppbppppbpp....",
    "..ppllllllpp.dd.",
    "...pppppppp.dddd",
    "..ppppppppppdddd",
    "..pppllllpppdddd",
    "..pppllllpppdddd",
    "...pppppppppddd.",
    "...ppp...ppp....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  magnemite: { palette: { p: '#94a3b8', d: '#475569', l: '#ef4444', s: '#3b82f6', b: '#0f172a' }, grid: [
    "................",".......dd.......","......dddd......","..ll.pppppp.ss..","..llppppppppss..","....pppbpppp....",
    "..sspppppppp....","..ss.pppppp.ll..","......dddd......","................","................","................","................","................","................","................"
  ]},
  magneton: { palette: { p: '#94a3b8', d: '#334155', l: '#ef4444', s: '#3b82f6', b: '#0f172a' }, grid: [
    "......dd........",
    "..ll.pppp.ss....",
    ".....pbpp.......",
    "..dd.pppp.dd....",
    ".pppp....pppp...",
    "llpbpp..ppbpss..",
    ".pppp....pppp...",
    "..ss......ll....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  farfetchd: { palette: { p: '#a16207', d: '#451a03', l: '#facc15', s: '#22c55e', b: '#0f172a' }, grid: [
    "...........ss...",
    "....pppp..ss....",
    "...pddddp.ss....",
    "...ppbpbpss.....",
    "....plllpss.....",
    "..pppppppssp....",
    "..ppppppssppp...",
    "...ppppppppp....",
    "....ppppppp.....",
    ".....l...l......",
    "....ll...ll.....",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  doduo: { palette: { p: '#92400e', d: '#78350f', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","...ppp....ppp...", "..ppbp...ppbp...", "..ppppll.ppppll.", "....p......p....", "....p......p....", ".....dppppd.....", "....dppppppd....",
    "....dppppppd....",
    ".....dddddd.....",
    "......l..l......",
    "......l..l......",
    ".....ll..ll.....",
    "................","................","................"
  ]},
  dodrio: { palette: { p: '#92400e', d: '#451a03', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","..p...p...p.....", ".ppbp.ppbp.ppbp.", ".pppllpppllpppl.", "....p...p...p...", ".....dppppd.....", "....dppppppd....", "....dppppppd....", ".....dddddd.....", "......l..l......", "......l..l......", ".....ll..ll.....", "................","................","................","................"
  ]},
  seel: { palette: { p: '#cbd5e1', d: '#94a3b8', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","................",".......ll.......","......pppp......",".....pppppp.....",".....pbppbp.....",".....ppllpp.....","....pppppppp..p.","...pppppppppp.p.","..ddppppppppddp.", "....dddddddddd..", "................","................","................","................","................"
  ]},
  dewgong: { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#38bdf8', b: '#0f172a' }, grid: [
    ".......p........",
    ".....pppppp.....",
    "....pppppppp....",
    "....ppbppbpp....",
    "...pppppppppp...",
    "..pppppppppppp..",
    ".pppddddddddppp.",
    "ppp..pppppp..ppp",
    ".....pppppp..pp.",
    "....pppppppppp..",
    "...ppp....ppp...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  grimer: { palette: { p: '#7e22ce', d: '#581c87', l: '#e9d5ff', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","..pp.pppppp.pp..",".pppppbpppbpppp.",".pppppppppppppp.","..pppddddddppp..","...ppdlllldpp...", "...pppppppppp...", "..dppppppppppd..", ".ddppppppppppdd.", ".dddddddddddddd.", "................","................","................","................"
  ]},
  muk: { palette: { p: '#9333ea', d: '#581c87', l: '#d8b4fe', b: '#0f172a' }, grid: [
    "....pppppppp....",
    "..pppppppppppp..",
    ".ppppbppppbpppp.",
    ".ppppddddddpppp.",
    "pppppddddddppppp",
    "pppplllllllppppp",
    ".pppppppppppppp.",
    "ppppddddddddpppp",
    "pppppppppppppppp",
    ".dddddddddddddd.",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  shellder: { palette: { p: '#7e22ce', d: '#4c1d95', l: '#e9d5ff', s: '#f43f5e', b: '#0f172a' }, grid: [
    "................","................","....pp.pp.pp....","...pppppppppp...","..dddddddddddd..","..dbbbbbbbbbbd..","..dbblbbbbbbld..","..dbbbbbbbbbbd..","...bbssssssbb...", "....pppssppp....",
    ".....ppsspp.....",
    "......ssss......",
    "................","................","................","................"
  ]},
  cloyster: { palette: { p: '#7e22ce', d: '#4c1d95', l: '#e9d5ff', b: '#0f172a' }, grid: [
    ".......pp.......",
    "..pp..pppp..pp..",
    "...pppppppppp...",
    "..pppddddddppp..",
    ".pppddbbbbddppp.",
    ".pppddbblbddppp.",
    ".pppddbbbbddppp.",
    "..pppddddddppp..",
    "...pppppppppp...",
    "..pp..pppp..pp..",
    ".......pp.......",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  gastly: { palette: { p: '#a855f7', d: '#581c87', l: '#ffffff', b: '#0f172a' }, grid: [
    "................","....pp..pp.p....","..pp.dddddd.pp..","..p.dddddddd.p..",".pp.dlbbbbld.pp.",".p.ddllbblldd.p.",".pp.dddddddd.pp.", "..p.dddllldd.p..","..pp.dddddd.pp..", "...p..pppp..p...", ".....p....p.....", "................","................","................","................","................"
  ]},
  haunter: { palette: { p: '#9333ea', d: '#581c87', l: '#ffffff', s: '#ef4444', b: '#0f172a' }, grid: [
    "..pp..pppp..pp..",
    "...pppppppppp...",
    "..ppplpppppplpp.",
    ".ppppllpbbplpppp",
    "..pppppppppppp..",
    "...pppsssssppp..",
    "....ppppppppp...",
    ".pp...pp.pp..pp.",
    "ppp....p..p..ppp",
    ".p............p.",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  gengar: { palette: { p: '#6b21a8', d: '#3b0764', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","...p..p..p..p...",
    "...pppppppppp...",
    "..pppppppppppp..",
    "..ppplbppblppp..",
    "..pppppppppppp..",
    "..pppssssssppp..",
    "..dddddddddddd..",
    "...dddddddddd...",
    "....dd....dd....",
    "................","................","................","................","................","................"
  ]},
  onix: { palette: { p: '#a8a29e', d: '#57534e', l: '#e7e5e4', b: '#0f172a' }, grid: [
    ".......p........",
    "......ppp.......",
    "....ppppppp.....",
    "....pbpppbp.....",
    "....ddddddd.....",
    ".....ppppp......",
    "......dddd......",
    ".......pppp.....",
    "........dddd....",
    "......pppppp....",
    ".....dddd.......",
    "....ppppp.......",
    "................","................","................","................"
  ]},
  drowzee: { palette: { p: '#facc15', d: '#78350f', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","....pbppppbp....", "....pppppplll...",
    "...pppppppppp...",
    "...pppppppppp...",
    "....dddddddd....",
    "....dddddddd....",
    "....dd....dd....",
    "....dd....dd....",
    "................","................","................","................"
  ]},
  hypno: { palette: { p: '#facc15', d: '#a16207', l: '#ffffff', s: '#cbd5e1', b: '#0f172a' }, grid: [
    "...pp......pp...",
    "....pppppppp....",
    "....ppbppbpp....",
    "...ppddpppppp...",
    "..llllllllllll..",
    ".llllllllllllll.",
    "...pppppppppp...",
    "..pp.pppppp.pp.s",
    ".....pppppp...ss",
    "....pp....pp....",
    "...ddd....ddd...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  krabby: { palette: { p: '#ef4444', d: '#991b1b', l: '#fde68a', b: '#0f172a' }, grid: [
    "................","..pp........pp..",".pppp......pppp.",".pp.p.pppp.p.pp.", "..pp.pppppp.pp..", "....ppbppbpp....",
    "....pppppppp....",
    "....llllllll....",
    "...pp.llll.pp...",
    "..pp..dddd..pp..",
    "..p..........p..",
    "................","................","................","................","................"
  ]},
  kingler: { palette: { p: '#dc2626', d: '#7f1d1d', l: '#fde047', b: '#0f172a' }, grid: [
    "................","..pp........pp..",".pppp......pppp.",".pp.p.pppp.p.pp.", "..pp.pppppp.pp..", "....ppbppbpp....", "....pppppppp....", "....llllllll....", "...pp.llll.pp...", "..pp..dddd..pp..", "..p..........p..", "................","................","................","................","................"
  ]},
  voltorb: { palette: { p: '#ef4444', d: '#b91c1c', l: '#ffffff', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","....pppppppp....","...ppbppppbpp...","...pppppppppp...","...bbbbbbbbbb...","...llllllllll...","....llllllll....",".....llllll.....","................","................","................","................","................","................"
  ]},
  electrode: { palette: { p: '#ffffff', d: '#cbd5e1', l: '#ef4444', b: '#0f172a' }, grid: [
    "................",
    ".....pppppp.....",
    "...pppppppppp...",
    "..pppppppppppp..",
    "..pppbppppbppp..",
    "..ppppbbbbpppp..",
    "..bbbbbbbbbbbb..",
    "..llllllllllll..",
    "..llllllllllll..",
    "...llllllllll...",
    ".....llllll.....",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  exeggcute: { palette: { p: '#fbcfe8', d: '#f472b6', l: '#facc15', b: '#0f172a' }, grid: [
    "................","................","................","....ppp..ppp....","...pppbppppbp...","...pppppppppp...","..pppbppllpbpp..","..pppppppppppp..","...pppp..pppp...","................","................","................","................","................","................","................"
  ]},
  exeggutor: { palette: { p: '#16a34a', d: '#14532d', l: '#fde047', b: '#0f172a' }, grid: [
    ".....llll.......","....llllll......","...llpsspll.....","...lpsspsspl....","....llllll......","......dddd......","......dddd......","....pppppppp....","....pbppbbpp....","...pppppppppp...", "...pppppppppp...", "....pppppppp....",".....dd..dd.....","................","................","................"
  ]},
  cubone: { palette: { p: '#a16207', d: '#78350f', l: '#e7e5e4', b: '#0f172a' }, grid: [
    "................","....ll....ll....","...llllllllll...","...lllbllblll...","...llllllllll...","....pppppppp.l..","...pppppppppll..","....pppppppp....","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  marowak: { palette: { p: '#e7e5e4', d: '#a16207', l: '#fef3c7', b: '#0f172a' }, grid: [
    "..pp........pp..",
    "...pppppppppp...",
    "...pppppppppp...",
    "...pppbppbppp...",
    "....pppppppp..pp",
    "...dddddddddd.p.",
    "..dd.dlllld.ddp.",
    ".....dlllld..pp.",
    "....dddddddd....",
    "....dd....dd....",
    "...ddd....ddd...",
    "................",
    "................",
    "................",
    "................",
    "................"
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
  koffing: { palette: { p: '#9333ea', d: '#581c87', l: '#fef08a', s: '#e9d5ff', b: '#0f172a' }, grid: [
    "................","...ss......ss...", "....dppppppd....",
    "...pppppppppp...",
    "..ppppbppbpppp..",
    "..ppppllllpppp..",
    "..pppppppppppp..",
    "..pppl.ll.lppp..",
    "...pp.llll.pp...",
    "...ppp.ll.ppp...",
    "....dppppppd....",
    "...ss......ss...",
    "................","................","................","................"
  ]},
  weezing: { palette: { p: '#7e22ce', d: '#4c1d95', l: '#fef08a', s: '#e9d5ff', b: '#0f172a' }, grid: [
    "....ss......ss..","..dppppppd..dppd", ".pppppppppppppp.", ".pppbppbppppppbp", ".ppppllllpppppp.", ".pppppppppppppp.", "..dppppddppppd..", "...ss......ss...", "................","................","................","................","................","................","................","................"
  ]},
  rhyhorn: { palette: { p: '#64748b', d: '#334155', l: '#cbd5e1', b: '#0f172a' }, grid: [
    "................","...l..dddd......","..ll.dddddd.....","..pppppppppp....","..pbpppppppppp..","..ppppddddpppp..","...dddddddddd...","...pp..pp..pp...","...dd..dd..dd...","................","................","................","................","................","................","................"
  ]},
  rhydon: { palette: { p: '#94a3b8', d: '#475569', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: [
    ".......ss.......",
    "...pp.pppp.pp...",
    "....pppppppp....",
    "....ppbppbpp....",
    "..pppppppppppp..",
    ".ppppllllllpppp.",
    ".ppppllllllpppp.",
    "..pppddddddppp.d",
    "...ppppppppppdd.",
    "...ppp....ppp...",
    "...sss....sss...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  chansey: { palette: { p: '#fbcfe8', d: '#f472b6', l: '#ffffff', b: '#0f172a' }, grid: [
    "................",".....pppppp.....","...ddppppppdd...","....ppbppbpp....","...pppppppppp...","..pppppppppppp..","..ppppllllpppp..","..ppppllllpppp..","...pppppppppp...","....dd....dd....","................","................","................","................","................","................"
  ]},
  tangela: { palette: { p: '#2563eb', d: '#1e3a8a', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","....pp.pp.pp....",
    "...pdpdppdpdp...",
    "..ppdppppppdpp..",
    "..pdpsbppbsdpd..",
    "..ppdbbbbbbdpp..",
    "..pdpdppppdpdp..",
    "...ppdpddpdpp...",
    "....pppppppp....",
    "....lll..lll....",
    "....lll..lll....",
    "................","................","................","................","................"
  ]},
  kangaskhan: { palette: { p: '#a16207', d: '#713f12', l: '#fef08a', s: '#a855f7', b: '#0f172a' }, grid: [
    "................","....dd....dd....",
    "....dddddddd....",
    "....ppbppbpp....",
    "...pppppppppp...",
    "..ppppllllpppp..",
    "..ppplssbslppp..",
    "..pppllllllppp..",
    "...ppllllllpp...",
    "...pppppppppp...",
    "....ppp..ppp....",
    "....dd....dd....",
    "................","................","................","................"
  ]},
  horsea: { palette: { p: '#38bdf8', d: '#0284c7', l: '#fef08a', b: '#0f172a' }, grid: [
    "................",".....p.p.p......",
    ".....ppppp......",
    "....ppppppp.....",
    "..ppppbppbp.....",
    "..pp.pppppp.ll..",
    "......ppppp.ll..",
    ".....pplllp.l...",
    ".....pplllp.....",
    "......ppppp.....",
    ".....pp..pp.....",
    ".....ppp.p......",
    "......ppp.......",
    "................","................","................"
  ]},
  seadra: { palette: { p: '#0284c7', d: '#1d4ed8', l: '#38bdf8', b: '#0f172a' }, grid: [
    "................",".....p.p.p......", ".....ppppp......", "....ppppppp.....", "..ppppbppbp.....", "..pp.pppppp.ll..", "......ppppp.ll..", ".....pplllp.l...", ".....pplllp.....", "......ppppp.....", "....dd....dd....", "................","................","................","................","................"
  ]},
  goldeen: { palette: { p: '#f8fafc', d: '#ef4444', l: '#fde047', b: '#0f172a' }, grid: [
    "................","................",".....l..dd......",
    "....ll.dddd.....",
    "...ppppddpppp...",
    "..ppbppddppppp..",
    "..pppppdddpppp..",
    "...ddddpppppp...",
    "....ddd...pp....",
    "................","................","................","................","................","................","................"
  ]},
  seaking: { palette: { p: '#f97316', d: '#0f172a', l: '#ffffff', s: '#fde047', b: '#0f172a' }, grid: [
    ".......s........",
    "......ss.pp.....",
    "....pppppppp.ll.",
    "...ppddpppppp.ll",
    "..pppbpppppppp.l",
    "..pppppppddpp.ll",
    "...llllllpppp.ll",
    "....llll..pp....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  staryu: { palette: { p: '#b45309', d: '#78350f', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",".......pp.......",
    "......pppp......",
    "......pppp......",
    "..pppppllppppp..",
    "...ppplsslppp...",
    "....pplsslpp....",
    "....ppplllpp....",
    "...pppp..pppp...",
    "...ppp....ppp...",
    "..pp........pp..",
    "................","................","................","................","................"
  ]},
  starmie: { palette: { p: '#8b5cf6', d: '#4c1d95', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",".......pp.......", "......pppp......", "..pppppllppppp..", "...ppplsslppp...", "....pplsslpp....", "....ppplllpp....", "...pppp..pppp...", "...ppp....ppp...", "..pp........pp..", "....dd....dd....", "................","................","................","................","................"
  ]},
  mr_mime: { palette: { p: '#fbcfe8', d: '#db2777', l: '#3b82f6', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","..lll......lll..","...llpppppp.ll..","....ppbppbpp....","....ppdppdpp....","..ss..ssss..ss..","....ssddddss....",".....ssssss.....",".....pp..pp.....","....dd....dd....","................","................","................","................","................","................"
  ]},
  scyther: { palette: { p: '#22c55e', d: '#15803d', l: '#f8fafc', s: '#fef08a', b: '#0f172a' }, grid: [
    "................","....p..p..p.....",
    "....ppppppp.....",
    "..ll.pbppbp.ll..",
    ".ll...pp...ll...",
    ".ll..pppp..ll...",
    "..l..dddddd..l..",
    "......pppp......",
    ".....pppppp.....",
    ".....pp..pp.....",
    "....pp....pp....",
    "................","................","................","................","................"
  ]},
  jynx: { palette: { p: '#dc2626', d: '#7e22ce', l: '#fde047', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","....llllllll....",
    "...llllllllll...",
    "..lllddbbddlll..",
    "..lllddddddlll..",
    "..lllpssssplll..",
    "...pppppppppp...",
    "...ppsssssspp...",
    "..pppppppppppp..",
    "..pppppppppppp..",
    "..ssssssssssss..",
    "................","................","................","................","................"
  ]},
  electabuzz: { palette: { p: '#facc15', d: '#0f172a', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","....p......p....",
    ".....p....p.....",
    "....pppppppp....",
    "....pbppppbp....",
    "..ppppddddpppp..",
    "..ppddppppddpp..",
    "...pppddddppp...",
    "...ppddppddpp...",
    "....pppppppp....",
    "....pp....pp....",
    "...ppp....ppp...",
    "................","................","................","................"
  ]},
  magmar: { palette: { p: '#ef4444', d: '#991b1b', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: [
    "................",".....ll..ll.....",
    "....ssssssss....",
    "....pppppppp....",
    "....pbppppbp....",
    ".....llllll.....",
    "...pppllllppp.l.",
    "...ppllllllpp.s.",
    "....pllllllp.pp.",
    "....pppppppppp..",
    "....pp....pp....",
    "...lll....lll...",
    "................","................","................","................"
  ]},
  pinsir: { palette: { p: '#78350f', d: '#451a03', l: '#e7e5e4', b: '#0f172a' }, grid: [
    "................","...ll......ll...",
    "..ll........ll..",
    "..ll..pppp..ll..",
    "...llpppppp.ll..",
    "...pppppppppp...",
    "...pppbppbppp...",
    "...pppllllppp...",
    "...pppllllppp...",
    "....pppppppp....",
    "....pp....pp....",
    "...ppp....ppp...",
    "................","................","................","................"
  ]},
  tauros: { palette: { p: '#b45309', d: '#451a03', l: '#d6d3d1', b: '#0f172a' }, grid: [
    "................","..ll........ll..", "...ll.dddd.ll...", "....dddddddd....", "...ddpbppbpdd...", "...dddddddddd.d.", "....dddddddd.d.d", "....pppppppp..d.", "....ppppppppdd..", "....pp.pp.pp....", "....dd.dd.dd....", "................","................","................","................","................"
  ]},
  magikarp: { palette: { p: '#f97316', d: '#c2410c', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [
    "................","......l.l.l.....", ".....lllllll....", "....ppppppppp...", "...pppbpppppss..", "..lpppppppppsss.", "...pppppppppss..", "....dddddddd....", ".....ll..ll.....", "................","................","................","................","................","................","................"
  ]},
  gyarados: { palette: { p: '#0284c7', d: '#1e3a8a', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "....s..ll..s....", "...pppppppppp...", "..ppppbppbpppp..", "...ppspppppp....", ".....pppppp.....", "....ppplllpp....", "...ppplllppp....", "....ppplllpp....", ".....ppplllp....", "....ppplllpp....", "................","................","................","................","................","................"
  ]},
  lapras: { palette: { p: '#38bdf8', d: '#64748b', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................",".....l..........", "....ppp.........", "...ppbp.........", "...pppl.........", "....pl...dd.dd..", "....pl..ddddddd.", "...ppl.ddddddddd", "...llllddddddddd", "..ppppppppppppp.", ".ppp...ppp...pp.", "................","................","................","................","................"
  ]},
  ditto: { palette: { p: '#c084fc', d: '#9333ea', l: '#e9d5ff', b: '#0f172a' }, grid: [
    "................",
    "................",
    "................",
    ".....ppd.ppd....",
    "...ppppppppp....",
    "...ppppppppp....",
    "...ppbppppbp....",
    "..pppppppppppp..",
    ".ppppbbbbbbppp..",
    ".pdpppppppppdd..",
    "...pppppppppd...",
    "..pppppppppppd..",
    "..ppppppppppppp.",
    "..dp.dpp..dp.dp.",
    "................",
    "................"
  ]},
  eevee: { palette: { p: '#b45309', d: '#78350f', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","...d......d.....", "...pp....pp.....", "....pppppp......", "....pbppbp......", "...llllllll.....", "...llllllll.pp..", "....ppppppp.pp..", "....pp...pp.....", "................","................","................","................","................","................","................"
  ]},
  vaporeon: { palette: { p: '#38bdf8', d: '#1d4ed8', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","...d......d.....", "...pp....pp.....", "....pppppp......", "....pbppbp......", "...llllllll.....", "...llllllll.pp..", "....ppppppp.pp..", "....pp...pp.....", "....dd....dd....", "................","................","................","................","................","................"
  ]},
  jolteon: { palette: { p: '#facc15', d: '#ca8a04', l: '#ffffff', b: '#0f172a' }, grid: [
    "................","...d......d.....", "...pp....pp.....", "....pppppp......", "....pbppbp......", "...llllllll.....", "...llllllll.pp..", "....ppppppp.pp..", "....pp...pp.....", "....dd....dd....", "................","................","................","................","................","................"
  ]},
  flareon: { palette: { p: '#ea580c', d: '#c2410c', l: '#fde047', b: '#0f172a' }, grid: [
    "................","...d......d.....", "...pp....pp.....", "....pppppp......", "....pbppbp......", "...llllllll.....", "...llllllll.pp..", "....ppppppp.pp..", "....pp...pp.....", "....dd....dd....", "................","................","................","................","................","................"
  ]},
  porygon: { palette: { p: '#f43f5e', d: '#0284c7', l: '#38bdf8', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","................","......ppppp.....", ".....ppppppp....", "...llllpsbpp....", "..llllllpppp....", "....pppppppp....", "....lllppppdd...", "....llllppdddd..", ".....ppppppdd...", "....lll..lll....", "................","................","................","................","................"
  ]},
  omanyte: { palette: { p: '#38bdf8', d: '#fde047', l: '#fef08a', b: '#0f172a' }, grid: [
    "................",".....dddddd.....", "....dddddddd....", "...dddllllddd...", "...dddlbblddd...", "....dddddddd....", "....pppppppp....", "...ppbp..pbpp...", "...ppp....ppp...", "................","................","................","................","................","................","................"
  ]},
  omastar: { palette: { p: '#fde047', d: '#ca8a04', l: '#38bdf8', s: '#ffffff', b: '#0f172a' }, grid: [
    "..s....pp....s..",
    "...pppppppppp...",
    "..sdddddddddd.s.",
    "..ppddddddddpp..",
    "..pddllllllddp..",
    "..spllsblbsllps.",
    "...pllsbbbsllp..",
    "..ll.llllll.ll..",
    ".ll..ll..ll..ll.",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  kabuto: { palette: { p: '#b45309', d: '#78350f', l: '#facc15', b: '#0f172a' }, grid: [
    "................","................",".....ppppp......", "...pppppppppp...", "..ppppbppbpppp..", "..pppppppppppp..", "...dddddddddd...", "....ll....ll....", "................","................","................","................","................","................","................","................"
  ]},
  kabutops: { palette: { p: '#b45309', d: '#78350f', l: '#f8fafc', b: '#0f172a' }, grid: [
    "....pppppppp....",
    "...pppppppppp...",
    "..ppppbppbpppp..",
    ".ll..dddddd..ll.",
    "ll...pppppp...ll",
    "ll....pppp....ll",
    ".ll...pppp...ll.",
    ".....pp..pp.....",
    ".....pp..pp.....",
    "....dd....dd....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  aerodactyl: { palette: { p: '#94a3b8', d: '#64748b', l: '#a855f7', b: '#0f172a' }, grid: [
    "................","..p....pp....p..", ".pp...pppp...pp.", ".ppp..pbbp..ppp.", ".ppllppppppllpp.", "..pllppppppllp..", "...ll.pppp.ll...", "......pppp......", ".....pp..pp.....", "................","................","................","................","................","................","................"
  ]},
  snorlax: { palette: { p: '#0f766e', d: '#134e4a', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","....pp....pp....", "...pppppppppp...", "...pplbppblpp...", "..pppppppppppp..", "..ppllllllllpp..", "..ppllllllllpp..", "..ppllllllllpp..", "...pppppppppp...", "...lll....lll...", "................","................","................","................","................","................"
  ]},
  articuno: { palette: { p: '#38bdf8', d: '#0284c7', l: '#e0f2fe', b: '#0f172a' }, grid: [
    ".......dd.......", "..pp..pppp..pp..", ".pppp.pbpp.pppp.", ".pppppppppppppp.", "..ddddlllllldd..", "...dddppppddd...", "......pppp......", ".....dd..dd.....", ".....dd..dd.....", "....dd....dd....", "................","................","................","................","................","................"
  ]},
  zapdos: { palette: { p: '#facc15', d: '#ca8a04', l: '#0f172a', b: '#f97316' }, grid: [
    ".p...p.pp.p...p.", "..pp.pppppp.pp..", ".ppppplppblpppp.", "..ddddppppdddd..", "..pppppppppppp..", "...llddppddll...", ".....b....b.....", "................","................","................","................","................","................","................","................","................"
  ]},
  moltres: { palette: { p: '#f97316', d: '#dc2626', l: '#fde047', b: '#0f172a' }, grid: [
    "......llll......", "..ll..lddd..ll..", ".llll.pppp.llll.", ".lpppppbppppppl.", ".pppppppppppppp.", "..ddddppppdddd..", "....pppppppp....", ".....pp..pp.....", ".....dd..dd.....", "....lll..lll....", "................","................","................","................","................","................"
  ]},
  dratini: { palette: { p: '#60a5fa', d: '#2563eb', l: '#ffffff', b: '#0f172a' }, grid: [
    "................",
    "....ll..pppp.ll.",
    "....ll.pppppp.ll",
    "......ppbppbpp..",
    "......ppllllpp..",
    ".......pppppp...",
    ".......ppppp....",
    "......ppppp.....",
    ".....ppppp..pp..",
    ".....pppppppp...",
    "......pppppp....",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  dragonair: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#ffffff', s: '#38bdf8', b: '#0f172a' }, grid: [
    "...ll......ll...",
    "..lll.pppp.lll..",
    "...llpppppp.ll..",
    ".....ppbppbp....",
    "......ppsspp....",
    ".......pppp.....",
    "......pppp......",
    ".....pppp.......",
    ".....pppp...ss..",
    "......pppppppp..",
    ".......pppppp...",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  dragonite: { palette: { p: '#f59e0b', d: '#0d9488', l: '#fef3c7', b: '#0f172a' }, grid: [
    "......l..l......", ".....pppppp.....", ".....pbppbp.....", "...ddppppppdd...", "..dddpllllpddd..", "...ddpllllpdd...", ".....pllllp.pp..", ".....ppppppppp..", ".....pp..pp.....", "................","................","................","................","................","................","................"
  ]},
  mewtwo: { palette: { p: '#e2e8f0', d: '#94a3b8', l: '#a855f7', b: '#0f172a' }, grid: [
    "................","....pp....pp....", "....pppppppp....", "....ppbppbpp....", ".....pppppp.....", ".....ppddpp.....", "...pppppppppp...", "..pp.llllll.pp..", ".....llllll..l..", ".....llllll.ll..", "....ppp..pppl...", "....pp....pp....", "...ppp....ppp...", "................","................","................"
  ]},
  mew: { palette: { p: '#f472b6', d: '#db2777', l: '#fce7f3', b: '#0f172a' }, grid: [
    "................","................","................","................",".....pd..dp.....", ".....pppppp.....", ".....pbppbp.....", ".....pppppp.....", ".......pp.......", "..ppp..ppp......", "....p..pp.......", "....pppppp......", "................","................","................","................"
  ]},
  umbreon: { palette: { p: '#1e293b', d: '#0f172a', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","...pp......pp...", "...ll......ll...", "....pppppppp....", "....pplllpp.....", "....psbppbsp....", "....pppppppp..l.", ".....pppppp..pp.", "....ppllllpp.pp.", "....pppppppppp..", "....pp....pp....", "....dd....dd....", "................","................","................","................"
  ]},
  murkrow: { palette: { p: '#1e293b', d: '#0f172a', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "................",".....pppppp.....", "...pppppppppp...", "..dddddddddddd..", "....ppsbbspp....", "....pppbbpppll..", "...ppppppppppll.", "..pppppppppppp..", "...dddddddddd...", "......l..l......", ".....ll..ll.....", "................","................","................","................","................"
  ]},
  houndoom: { palette: { p: '#1e293b', d: '#cbd5e1', l: '#f97316', b: '#0f172a' }, grid: [
    "..dd........dd..",
    ".dd..pppppp..dd.",
    "..dd.pppppp.dd..",
    "....ppbppbpp....",
    "....llllllll....",
    "....pppppppp....",
    "...ppddddddpp...",
    "...pppppppppp..p",
    "....dddddddd..pp",
    "....pp....pp.p..",
    "....dd....dd....",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  absol: { palette: { p: '#f8fafc', d: '#1e293b', l: '#cbd5e1', s: '#ef4444', b: '#0f172a' }, grid: [
    "..........dd....",
    "....pppp..ddd...",
    "...pppppp.ddd...",
    "...ppdddsddp....",
    "...ppddddddp....",
    "..ppppppppppp...",
    "..ppppppppppp.d.",
    "...ppppppppp.dd.",
    "....pp....pp....",
    "....dd....dd....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  deoxys: { palette: { p: '#f97316', d: '#0d9488', l: '#a855f7', s: '#f8fafc', b: '#0f172a' }, grid: [
    ".....pppppp.....",
    "....pppppppp....",
    "...ppsbbsppss...",
    "....dddddddddd..",
    "..pp..dllld..pp.",
    ".pp..ddllldd..p.",
    ".p...ddddddd...p",
    ".d...ppppppp...d",
    "....pp.....pp...",
    "....dd.....dd...",
    "...pp.......pp..",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  lucario: { palette: { p: '#2563eb', d: '#1e293b', l: '#fde047', s: '#38bdf8', b: '#0f172a' }, grid: [
    "................","....pp....pp....", "....pd....dp....", "....pppppppp....", "....dbppppbd....", ".....pppppp.....", "....llllllll....", "...pllllllllp...", "...p.llllll.p...", ".....pppppp.....", ".....pp..pp.....", ".....dd..dd.....", "................","................","................","................"
  ]},

  // --- JOHTO, HOENN, SINNOH, UNOVA & KALOS STARTER PIXELS ---
  chikorita: { palette: { p: '#a3e635', d: '#15803d', l: '#ecfccb', s: '#ef4444', b: '#0f172a' }, grid: ["......dddddd....",".....dddddddd...","......dd........",".....pppppp.....","....pppppppp....","....psbppbsp....","....pppppppp....","...dppppppppd...","....pppppppp....","....pppppppp....","....pp....pp....","................","................","................","................","................"]},
  bayleef: { palette: { p: '#eab308', d: '#15803d', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [".....ddddddd....","....ddddddddd...",".....ddd........","....pppppp......","...pppppppp.....","...psbppbsp.....","....pppppp......","...dddddddd.....","..pppppppppp....","..ppppppppppp...","...pp.....pp....","...pp.....pp....","................","................","................","................"]},
  meganium: { palette: { p: '#84cc16', d: '#15803d', l: '#f43f5e', s: '#fde047', b: '#0f172a' }, grid: ["...s..s.........","....pp..........","...pppp.........","...pbpb.........","..llllll........",".llllllll.......","..llllllpppp....","...pppppppppp...","...ppppppppppp..","...pp......pp...","...pp......pp...","................","................","................","................","................"]},
  cyndaquil: { palette: { p: '#fef08a', d: '#0f766e', l: '#ef4444', s: '#f97316', b: '#0f172a' }, grid: ["................","........lll.....",".....dddlssl....","....dddddssll...","...ddddddpppp...","...ddddbpppp....","....ddpppppp....",".....ppppppp....",".....pp...pp....","................","................","................","................","................","................","................"]},
  quilava: { palette: { p: '#fef08a', d: '#0f766e', l: '#ef4444', s: '#f97316', b: '#0f172a' }, grid: ["..ll............",".lssl.dddddd....","..ll.dddddddd...", "....ddddbppppp..","....ddddpppppp..",".....pppppppp...","....pppppppp.ll.","....pp....pp.lss",".............ll.","................","................","................","................","................","................","................"]},
  typhlosion: { palette: { p: '#fef08a', d: '#1e293b', l: '#ef4444', s: '#f97316', b: '#0f172a' }, grid: ["...llllllllll...","..llssssssssll..","...dddddddddd...", "..ddddbppbdddd..","..ddddppppdddd..","..dddppppppddd..","..ddppppppppdd..","...pppppppppp...","...ppp....ppp...","...pp......pp...","................","................","................","................","................","................"]},
  totodile: { palette: { p: '#38bdf8', d: '#0284c7', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: ["................","....pppppp......","...pppppppp.....","...ppbpppppp....","...pppppssssp...","....llllllll....","...pppppppppp.s.","...pppppppppp.s.","....pp....pp....","................","................","................","................","................","................","................"]},
  croconaw: { palette: { p: '#38bdf8', d: '#0284c7', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [".....ssss.......","....pppppp......","...pppppppp.....","...ppbpppppp....","...pppppppppp...", "...pllllllllp...", "..ppplllllllpp..", "..pppppppppppp.s","...ppp....ppp...", "................","................","................","................","................","................","................"]},
  feraligatr: { palette: { p: '#0284c7', d: '#1e3a8a', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: ["....ssssss......","...pppppppp.....","..ppppbpppppp...", "..pppppppppppp..","..ppllllllllpp..",".pppppppppppppp.",".ppppdddddddppp.","..pppppppppppp.s","...ppp....ppp..s","...ddd....ddd...", "................","................","................","................","................","................"]},
  treecko: { palette: { p: '#4ade80', d: '#15803d', l: '#ef4444', s: '#fde047', b: '#0f172a' }, grid: ["................","....ppp..ppp....","...pppppppppp...","...psbppbsbpp...","....pppppppp....",".....llllll..dd.","....pllllllpddd.","....pp.ll.ppddd.","....pp....pp....","................","................","................","................","................","................","................"]},
  grovyle: { palette: { p: '#22c55e', d: '#14532d', l: '#ef4444', s: '#fde047', b: '#0f172a' }, grid: [".....dddddd.....","....ddd........","....pppppp......","...ppsbppbp.....","....pppppp......","...dllllllddd...", "..ddplllllpddd..","....pppppppp....","....pp....pp....","................","................","................","................","................","................","................"]},
  sceptile: { palette: { p: '#16a34a', d: '#14532d', l: '#ef4444', s: '#fde047', b: '#0f172a' }, grid: ["....pppppppp....","...ppsbppbspp...","....llllllll....","..ssppppppppss..",".ss.pllllllp.ss.","....pppppppdddd.","...ppppppppdddd.","...ppp..pppdddd.","...pp....pp.....","................","................","................","................","................","................","................"]},
  torchic: { palette: { p: '#f97316', d: '#c2410c', l: '#facc15', b: '#0f172a' }, grid: ["......l.l.......",".....lllll......","....ppppppp.....","...ppppppppp....","...ppbpppbpp....","....ppplppp.....","...lllllllll....","..lllllllllll...","...lllllllll....",".....l...l......","................","................","................","................","................","................"]},
  combusken: { palette: { p: '#f97316', d: '#dc2626', l: '#facc15', b: '#0f172a' }, grid: [".....ll..ll.....","....llllllll....","....pppppppp....","....ppbppbpp....",".....pppppp.....","...llllllllll...", "..ll.pppppp.ll..",".....pppppp.....","....dd....dd....","....ll....ll....","................","................","................","................","................","................"]},
  blaziken: { palette: { p: '#dc2626', d: '#f8fafc', l: '#facc15', b: '#0f172a' }, grid: ["...ddd....ddd...","..ddddppppdddd..","...ddpbppbpdd...","....dddddddd....","...pppppppppp...", "..ll.pppppp.ll..",".....pppppp.....","....pppppppp....","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................"]},
  mudkip: { palette: { p: '#38bdf8', d: '#0284c7', l: '#f97316', s: '#bae6fd', b: '#0f172a' }, grid: ["......ppp.......","......ppp.......","....pppppppp....","...pppppppppp...","..llppbppbpp.ll.","..llpppppppp.ll.","...ppsssssspp.ss","....pppppppp..ss","....pp....pp....","................","................","................","................","................","................","................"]},
  marshtomp: { palette: { p: '#38bdf8', d: '#1e293b', l: '#f97316', s: '#bae6fd', b: '#0f172a' }, grid: ["......dddd......",".....dddddd.....","....pppppppp....","...llpbppbpll...","...pppppppppp...", "..pppssssssppp..","..pppssssssppp..","...pppppppppp...", "...pp......pp...", "................","................","................","................","................","................","................"]},
  swampert: { palette: { p: '#2563eb', d: '#0f172a', l: '#f97316', s: '#ffffff', b: '#0f172a' }, grid: ["...ddd....ddd...","..ddddppppdddd..","..ddppbppbppdd..","..llppppppppll..",".pppppssssppppp.",".pppplllllllppp.","..ppppppppppppp.","...ppp....ppp...", "...ddd....ddd...", "................","................","................","................","................","................","................"]},
  turtwig: { palette: { p: '#84cc16', d: '#78350f', l: '#fde047', s: '#15803d', b: '#0f172a' }, grid: ["......ss........",".....ssss.......","......dd........","....pppppp......","...ppbppbpp.....","...ppllllpp.....","...dddddddddd...", "..dddddddddddd..","...pppppppppp...", "....pp....pp....","................","................","................","................","................","................"]},
  grotle: { palette: { p: '#84cc16', d: '#78350f', l: '#fde047', s: '#15803d', b: '#0f172a' }, grid: ["....sss..sss....","...ssssssssss...","...dddddddddd...", "..dddddddddddd..","..ppppbppbpppp..","..pppppppppppp..","...pppppppppp...", "...ppp....ppp...", "................","................","................","................","................","................","................","................"]},
  torterra: { palette: { p: '#15803d', d: '#78350f', l: '#a8a29e', s: '#22c55e', b: '#0f172a' }, grid: ["..sssss..lll....",".sssssss.llll...","...ddd...llll...","..pppppppppppp..",".dddddddddddddd.",".ppppbpppppppppp","..ppppppppppppp.","..ppp......ppp..","..lll......lll..","................","................","................","................","................","................","................"]},
  chimchar: { palette: { p: '#f97316', d: '#9a3412', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: ["......ss........","....pppppp......","...pppppppp.....","...plbppblp.....","...ppllllpp.....","....pppppp...ss.","...pp.ll.pp.ssl.",".....pppp...ss..","....pp..pp......","................","................","................","................","................","................","................"]},
  monferno: { palette: { p: '#f97316', d: '#1d4ed8', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [".....pppppp.....","....ppddddpp....","....pdbppbdp....","....ppllllpp....","...llllllllll...", "..pppppppppppp.s","....pppppppp..ss","....pp....pp.ss.","................","................","................","................","................","................","................","................"]},
  infernape: { palette: { p: '#dc2626', d: '#facc15', l: '#ffffff', s: '#f97316', b: '#0f172a' }, grid: ["....ssssssss....","...ssllllllss...","....llpbppll....","...llllllllll...", "..ddppppppppdd..",".pp.ddppppdd.pp.","....pppppppp....","....pp....pp....","...ddd....ddd...", "................","................","................","................","................","................","................"]},
  piplup: { palette: { p: '#38bdf8', d: '#1d4ed8', l: '#facc15', s: '#ffffff', b: '#0f172a' }, grid: ["................",".....dddddd.....","....dddddddd....","....dsbppbsd....","....ddlllldd....","....dddddddd....","...ppsssssspp...","...pppppppppp...", "....pppppppp....",".....ll..ll.....","................","................","................","................","................","................"]},
  prinplup: { palette: { p: '#1d4ed8', d: '#0f172a', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["....llllllll....","....pppppppp....","....ppbppbpp....","....ppllllpp....","...ssssssssss...", "..pppppppppppp..","..ppssllllsspp..","...pppppppppp...", "....ll....ll....","................","................","................","................","................","................","................"]},
  empoleon: { palette: { p: '#1e3a8a', d: '#0f172a', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["....l..ll..l....","...llllllllll...","....ppbppbpp....","...dddddddddd...", "..ppsssssssspp..",".pp.ddssssdd.pp.",".p..dddddddd..p.","....ppp..ppp....","....lll..lll....","................","................","................","................","................","................","................"]},
  snivy: { palette: { p: '#22c55e', d: '#15803d', l: '#fde047', s: '#fef3c7', b: '#0f172a' }, grid: ["................","...pppppp.......","..pppppppp......","...ppbppbp......","....ssssss......","...llllllll.....","....pppppp..pp..","....ssssss.ppp..",".....pp..pp.....","................","................","................","................","................","................","................"]},
  servine: { palette: { p: '#22c55e', d: '#15803d', l: '#fde047', s: '#fef3c7', b: '#0f172a' }, grid: ["....pp..........","...pppppp.......","..pppppppp......","...ppbppbp......","...lllllll..pp..","....ssssss.ppp..","....ssssssppp...",".....ppppppp....",".....pp..pp.....","................","................","................","................","................","................","................"]},
  serperior: { palette: { p: '#15803d', d: '#a3e635', l: '#fde047', s: '#fef3c7', b: '#0f172a' }, grid: ["....pppppp......","...pppppppp.....","...ppbppbpp.....","...llllllll.....","..pppppppppp....","..ppsssssspp....","...pppppppppp...","....sssssspppp..",".....pppppppp...","................","................","................","................","................","................","................"]},
  tepig: { palette: { p: '#f97316', d: '#1e293b', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: ["................","....pp..pp......","....pppppp......","...pppppppp.....","...ppbssbpp.....","...pppppppp..l..","...ppddddpp.dd..","...dddddddd.....","....dd..dd......","................","................","................","................","................","................","................"]},
  pignite: { palette: { p: '#f97316', d: '#1e293b', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: ["....pp....pp....","....pppppppp....","...pppbppbppp...","...pppppppppp...", "..ppddddddddpp..","..ppdlllllldpp..","...dddddddddd...", "...ppp....ppp...","...ddd....ddd...", "................","................","................","................","................","................","................"]},
  emboar: { palette: { p: '#dc2626', d: '#0f172a', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: ["...llllllllll...","..llssssssssll..","..ddddppppdddd..",".ddddpbppbpdddd.",".ppppdddddddppp.",".ppppdllllldppp.","..pppddddddppp..","...ppp....ppp...","...ddd....ddd...", "................","................","................","................","................","................","................"]},
  oshawott: { palette: { p: '#f8fafc', d: '#1d4ed8', l: '#fde047', s: '#38bdf8', b: '#0f172a' }, grid: ["................","...dd......dd...","...pppppppppp...","...ppbppppbpp...","...ppppddpppp...","....ssssssss....","...sssllllsss...", "...ssssssssss...", "....dd....dd....","................","................","................","................","................","................","................"]},
  dewott: { palette: { p: '#38bdf8', d: '#1e3a8a', l: '#fde047', s: '#f8fafc', b: '#0f172a' }, grid: [".....dddddd.....","....pppppppp....","....ppbppbpp....","....pppppppp....","...pppppppppp...", "..ddddllllldddd.","..dddddddddddd..","...pppppppppp...", "....dd....dd....","................","................","................","................","................","................","................"]},
  samurott: { palette: { p: '#1e3a8a', d: '#fde047', l: '#f8fafc', s: '#38bdf8', b: '#0f172a' }, grid: ["......dddd......",".....dddddd.....","....dddddddd....","...ppppbppbpp...","...llllllllll...","..pppppppppppp..","..ppsssssssspp..","..pppppppppppp..","...ddd....ddd...", "................","................","................","................","................","................","................"]},
  chespin: { palette: { p: '#15803d', d: '#78350f', l: '#fde68a', s: '#f97316', b: '#0f172a' }, grid: ["...pp..pp..pp...","..pppppppppppp..","..ppllllllllpp..","..pplbppppblpp..","...pllllssllp...", "...dddddddddd...", "..ppddddddddpp..","....dddddddd....","....dd....dd....","................","................","................","................","................","................","................"]},
  quilladin: { palette: { p: '#16a34a', d: '#78350f', l: '#fde68a', s: '#ef4444', b: '#0f172a' }, grid: ["....pppppppp....","..pppppppppppp..",".pppllllllllppp.",".ppplbppppblppp.",".ppppddddddpppp.",".ppppddddddpppp.","..pppppppppppp..","....dd....dd....","................","................","................","................","................","................","................","................"]},
  chesnaught: { palette: { p: '#fef3c7', d: '#15803d', l: '#78350f', s: '#ef4444', b: '#0f172a' }, grid: ["..pp........pp..",".ppppddddddpppp.",".pppddddddddppp.",".pppllbppbllppp.",".ppppddddddpppp.","..pppddddddppp..","...pppppppppp...","...ppp....ppp...","...lll....lll...", "................","................","................","................","................","................","................"]},
  fennekin: { palette: { p: '#fde047', d: '#ea580c', l: '#ffffff', b: '#0f172a' }, grid: ["..dd........dd..",".dddd......dddd.","..ddppppppppdd..","...pppppppppp...","...ppbppppbpp...","....llllllll....","....pppppppp.dd.","....ppppppppddd.","....pp....pp....","................","................","................","................","................","................","................"]},
  braixen: { palette: { p: '#fde047', d: '#ea580c', l: '#ffffff', s: '#1e293b', b: '#0f172a' }, grid: ["..dd........dd..",".dddd.pppp.dddd.","..dd.pppppp.dd..",".....ppbppbp....","....llllllll....","....pppppppp....","...ssssssssss.dd","...dddddddddd.dd","....ss....ss....","................","................","................","................","................","................","................"]},
  delphox: { palette: { p: '#dc2626', d: '#ea580c', l: '#fde047', s: '#ffffff', b: '#0f172a' }, grid: ["...dd......dd...","..ddddlllllldd..","...ddllbppbld...","....llllllll....","...pppppppppp...", "..pppppsssspppp.","..ppppppppppppp.",".ppppppppppppppp","..ppppppppppppp.","................","................","................","................","................","................","................"]},
  froakie: { palette: { p: '#38bdf8', d: '#0284c7', l: '#ffffff', s: '#facc15', b: '#0f172a' }, grid: ["................","....ss....ss....","...spppppppps...","...pppppppppp...","..llllpppppp....","..llllpppppp....","...pppppppppp...", "....pp....pp....","...lll....lll...", "................","................","................","................","................","................","................"]},
  frogadier: { palette: { p: '#1d4ed8', d: '#38bdf8', l: '#ffffff', b: '#0f172a' }, grid: ["....pp....pp....","...pppppppppp...","...ppbppppbpp...","..llllllllllll..","..llddddddddll..","...dddddddddd...", "...pp..dd..pp...","....pp....pp....","...lll....lll...", "................","................","................","................","................","................","................"]},
  greninja: { palette: { p: '#1e3a8a', d: '#f472b6', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: ["...pp..pp..pp...","..pppppppppppp..","..ppsbppbsbpp...","..dddddddddddd..",".dd.pppppppp.dd.",".d..ppllllpp..d.","....pppppppp....","...pp......pp...","..sss......sss..","................","................","................","................","................","................","................"]},

  raikou: { palette: { p: '#facc15', d: '#0f172a', l: '#a855f7', s: '#38bdf8', b: '#0f172a' }, grid: [
    "....llllll......",
    "..llllllllll....",
    "..ssppbbppss....",
    "...pppppppp.ll..",
    "..ppddppddpplll.",
    "..pppppppppp.ll.",
    "..ppddppddpp..s.",
    "...pppppppp..ss.",
    "...pp....pp.....",
    "...ss....ss.....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  entei: { palette: { p: '#b45309', d: '#78350f', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "....llllll......",
    "...lssssssl.....",
    "..ssppbppbs.....",
    "..llllllllll....",
    "..ppppppppppp...",
    ".ppppddddpppp...",
    ".ppppppppppppp..",
    "..ppppppppppp...",
    "...pp....pp.....",
    "...ll....ll.....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  suicune: { palette: { p: '#38bdf8', d: '#0284c7', l: '#f8fafc', s: '#a855f7', b: '#0f172a' }, grid: [
    ".....llll.......",
    "....ll..ll.ssss.",
    "....llllllsssss.",
    "....ppbppbs..ss.",
    "...lpppppp.ll...",
    "..llpppppp..ll..",
    ".ll.ppddpp...ll.",
    "....pppppp......",
    "....pp..pp......",
    "...ll....ll.....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  lugia: { palette: { p: '#f8fafc', d: '#1d4ed8', l: '#93c5fd', b: '#0f172a' }, grid: [
    "...dd......dd...",
    "..dpp......ppd..",
    ".dppp.dddd.pppd.",
    "dpppp.pbpp.ppppd",
    "dppppppppp.ppppd",
    ".dpppddddddpppd.",
    "..dppddddddppd..",
    "....pppppppp....",
    ".....pp..pp.....",
    "....dd....dd....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  ho_oh: { palette: { p: '#ef4444', d: '#16a34a', l: '#facc15', s: '#ffffff', b: '#0f172a' }, grid: [
    "......llll......",
    ".dd...lppp...dd.",
    "ddpp..pbpp..ppdd",
    "dpppp.plll.ppppd",
    ".dppppllllppppd.",
    "..ddppssssppdd..",
    "....pppppppp....",
    "....llllllll....",
    ".....ll..ll.....",
    "....ll....ll....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  kyogre: { palette: { p: '#1d4ed8', d: '#0f172a', l: '#ef4444', s: '#f8fafc', b: '#0f172a' }, grid: [
    "................",
    "....pppppppp....",
    "..pppppppppppp..",
    ".pppllpbbpllppp.",
    "pppplppppppplppp",
    "pppssssssssssppp",
    ".pp..ssssss..pp.",
    "......pppp......",
    ".....pp..pp.....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  groudon: { palette: { p: '#dc2626', d: '#0f172a', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [
    "....s..s..s.....",
    "...pppppppppp...",
    "..ppppbppbpppp..",
    ".ppppddddddpppp.",
    ".pppplllllppppp.",
    "..pppddddddppp..",
    "..ppppppppppppd.",
    "...ppp....pppdd.",
    "...sss....sss...",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  rayquaza: { palette: { p: '#16a34a', d: '#052e16', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "....l......l....",
    "...pppl..lppp...",
    "...ppbppppbpp...",
    "....ppsssspp....",
    ".....ppllpp.....",
    "...pppplllppp...",
    "..ppdll..lldpp..",
    "...pp......pp...",
    "....ppplllpp....",
    ".....pppppp.....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  dialga: { palette: { p: '#1e3a8a', d: '#94a3b8', l: '#38bdf8', s: '#f8fafc', b: '#0f172a' }, grid: [
    "....dd....dd....",
    "...dddd..dddd...",
    "...pppbppbppp...",
    "....pppppppp....",
    "..ddppllllppdd..",
    ".dddpppsspppddd.",
    "..ddppppppppdd..",
    "...pppppppppp...",
    "...pp..pp..pp...",
    "...dd..dd..dd...",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
  palkia: { palette: { p: '#f3e8ff', d: '#9333ea', l: '#ec4899', s: '#38bdf8', b: '#0f172a' }, grid: [
    "...dd......dd...",
    "..dpp.pppp.ppd..",
    "..dppppbppbppd..",
    ".ddpppllllpppdd.",
    ".dslpppppppplsd.",
    "..ddppddddppdd..",
    "...pppppppppp...",
    "...ppp....ppp...",
    "...ddd....ddd...",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ]},
budew: { 
    palette: { p: '#22c55e', d: '#15803d', l: '#b5eeaa', s: '#facc15', b: '#0f172a' }, 
    grid: [
      "................",
      ".......ll.......",
      ".....plllld.....",
      ".....pplldd.....",
      ".....pp.ddd.....",
      "......pdd.......",
      "....psssssp.....",
      "...ppssssspp....",
      "...ppbsssbpp....",
      "...ppssssspp....",
      "...ppdddddpp....",
      "...ppdpdpdpp....",
      "....ppppppp.....",
      ".....l...l......",
      "................",
      "................"
  ]},

  sentret: { palette: { p: '#b45309', d: '#78350f', l: '#fef3c7', b: '#0f172a' }, grid: [
    "....pp....pp....","....pd....dp....","....pppppppp....","...pppbppbppp...","...pppppppppp...","..ppplllllllpp..","..ppllpppppllpp.","...pplllllllpp..","....pppppppp....",".....pp..pp.....","....ppp..ppp....",".....dddddd.....",".....pppppp.....","......dddd......","................","................"
  ]},
  furret: { palette: { p: '#d97706', d: '#78350f', l: '#fef3c7', b: '#0f172a' }, grid: [
    "...dd......dd...","...pppppppppp...","...ppbppppbpp...","....llllllll....","....dddddddd....",".....llllll..dd.","....dddddddd.pp.","....llllllll.dd.",".....dddddddd...",".....pppppppp...","....pp....pp....","................","................","................","................","................"
  ]},
  hoothoot: { palette: { p: '#a16207', d: '#451a03', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "..dd........dd..","...dddd..dddd...","...pppppppppp...","..ppdsbllbsdp...","..ppdsbllbsdp...","..pppppppppppp..","...ppllllllpp...","...ppllllllpp...","....pppppppp....","......l..l......","......llll......","................","................","................","................","................"
  ]},
  noctowl: { palette: { p: '#92400e', d: '#451a03', l: '#fde68a', s: '#ef4444', b: '#0f172a' }, grid: [
    "..dddd....dddd..","...dddddddddd...","....ppbppbpp....","....ppsllspp....","..ddppppppppdd..",".dddpllllllpddd.",".dd.plddddlp.dd.","....pllllllp....","....pppppppp....",".....dddddd.....","......l..l......",".....ll..ll.....","................","................","................","................"
  ]},
  ledyba: { palette: { p: '#ef4444', d: '#0f172a', l: '#fef3c7', s: '#f97316', b: '#0f172a' }, grid: [
    "....d......d....",".....d....d.....","....ssssssss....","....sbssssbs....","...pppppppppp...","..ppddppppddpp..","..ppddppppddpp..","..ppppddddpppp..","...pppppppppp...","..ll..l..l..ll..","......l..l......","................","................","................","................","................"
  ]},
  ledian: { palette: { p: '#dc2626', d: '#0f172a', l: '#ffffff', s: '#fde047', b: '#0f172a' }, grid: [
    "...d........d...","....d.pppp.d....","....pppppppp....","....psbllbsp....","..ll..pppp..ll..",".ll..ppddpp..ll.","....ppsdppdsp...","....pppppppp....",".....ssssss.....","....pp....pp....","...ll......ll...","................","................","................","................","................"
  ]},
  spinarak: { palette: { p: '#22c55e', d: '#0f172a', l: '#ffffff', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","......llll......","....pppppppp....","...ppdbppbdpp...","..ss.pppppp.ss..",".ss..ppsspp..ss.","..ss.pppppp.ss..","...s..pppp..s...","................","................","................","................","................","................","................","................"
  ]},
  ariados: { palette: { p: '#ef4444', d: '#7e22ce', l: '#fde047', s: '#ffffff', b: '#0f172a' }, grid: [
    ".......ss.......","..ll..pppp..ll..",".ll..ppbppb..ll.","....pppppppp....","..llppddddppll..",".ll.pppppppp.ll.","....ppddddpp..s.",".....pppppp..ss.","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  crobat: { palette: { p: '#7e22ce', d: '#4c1d95', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: [
    "pp............pp","ppp..p....p..ppp",".ppdppppppppdpp.","..pddplbbplddp..","...pppssssppp...","..ppddddddddpp..",".pp..pppppp..pp.","p.....pppp.....p","......l..l......","................","................","................","................","................","................","................"
  ]},
  chinchou: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#facc15', b: '#0f172a' }, grid: [
    "..ll........ll..",".llll......llll.","..l..........l..","...p..pppp..p...","....pppppppp....","...pplbppblpp...","...pppppppppp...","..ddppppppppdd..","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  lanturn: { palette: { p: '#38bdf8', d: '#0284c7', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "......llll......",".....llllll.....","......d..d......","....pppppppp....","...pppbllbpp....","..pppppppppppp..","..ppsspppppppd..","...ppppppppddd..","....dddddd..dd..","................","................","................","................","................","................","................"
  ]},
  pichu: { palette: { p: '#fef08a', d: '#0f172a', l: '#f43f5e', b: '#0f172a' }, grid: [
    "................","..dd........dd..","..dpp......ppd..","...ddppppppdd...","....pppppppp....","....pbppppbp....","....lppppppl....",".....dddddd.....",".....pppppp..d..",".....pppppp.dd..",".....pp..pp.....","................","................","................","................","................"
  ]},
  cleffa: { palette: { p: '#f9a8d4', d: '#be185d', l: '#78350f', b: '#0f172a' }, grid: [
    "................","...ll......ll...","..llpp....ppll..","...pppppppppp...","..ppppbppbpppp..","..ppppddddpppp..","...pppppppppp...","....pppppppp....",".....pp..pp.....","................","................","................","................","................","................","................"
  ]},
  igglybuff: { palette: { p: '#fbcfe8', d: '#db2777', l: '#ef4444', b: '#0f172a' }, grid: [
    "................","......pppp......",".....pppppp.....","....pppppppp....","...pppbppbppp...","...pplppppppl...","...ppppddpppp...","....pppppppp....",".....pp..pp.....","................","................","................","................","................","................","................"
  ]},
  togepi: { palette: { p: '#fef3c7', d: '#f8fafc', l: '#ef4444', s: '#3b82f6', b: '#0f172a' }, grid: [
    "................","....pp.pp.pp....","...pppppppppp...","...pppbppbppp...","..dddddddddddd..","..ddllssssddll..","..ddddssssdddd..","...dddllllddd...","....dddddddd....",".....pp..pp.....","................","................","................","................","................","................"
  ]},
  togetic: { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#ef4444', s: '#3b82f6', b: '#0f172a' }, grid: [
    ".....p.pp.p.....","....pppppppp....","....ppbppbpp....",".....pppppp.....","..dd..pppp..dd..",".dddppppppppddd.","..ddppllssppdd..","....ppsssspp....","....pppppppp....",".....pp..pp.....","................","................","................","................","................","................"
  ]},
  natu: { palette: { p: '#22c55e', d: '#15803d', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    ".......ll.......","......llll......","....pppppppp....","...pppbssbppp...","..llppppppppll..","..sslpppppp.ss..","...pppppppppp...","....pppppppp....",".....ss..ss.....","................","................","................","................","................","................","................"
  ]},
  xatu: { palette: { p: '#16a34a', d: '#ffffff', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "......llll......",".....pppppp.....","....ppsbbspp....","....pppppppp....","...dddddddddd...","..llssddddssll..","..llppppppppll..","...pppppppppp...","....dddddddd....",".....ll..ll.....","....ll....ll....","................","................","................","................","................"
  ]},
  mareep: { palette: { p: '#fef08a', d: '#3b82f6', l: '#f97316', s: '#0f172a', b: '#0f172a' }, grid: [
    "................","....pppppppp....","..ssddddddddss..","...pppddddppp...","..ppppdbbdpppp..","..pppppppppppp..","...pppppppppp.s.","....dddddddd.sl.","....dd....dd..l.","................","................","................","................","................","................","................"
  ]},
  flaaffy: { palette: { p: '#f472b6', d: '#fce7f3', l: '#38bdf8', s: '#0f172a', b: '#0f172a' }, grid: [
    "....dddddddd....","...dddddddddd...","..ssppppppppss..","....ppbppbpp....","...dddddddddd...", "..dddddddddddd..","...pppppppppp.s.","....ppsssspp.sl.","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  ampharos: { palette: { p: '#facc15', d: '#0f172a', l: '#ffffff', s: '#ef4444', b: '#0f172a' }, grid: [
    "...dp......pd...","....pp.ss.pp....","....pppppppp....","....ppbppbpp....",".....dddddd.....","....pppppppp....","...pppllllppp...", "...pppllllppp.d.","....ppllllpp.dd.","....pp....pp..s.","...ddd....ddd...","................","................","................","................","................"
  ]},
  bellossom: { palette: { p: '#4ade80', d: '#16a34a', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "...lll....lll...","..lllls..sllll..","...lllpppp.ll...","....pppppppp....","....pplbppbl....",".....pppppp.....","...dddddddddd...","..ddssddddssdd..","..ddssddddssdd..","...dddddddddd...","................","................","................","................","................","................"
  ]},
  marill: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#ffffff', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","..ppp......ppp..",".ppspp....ppspp.","..pppppppppppp..","..ppppbppbpppp..","..pppppppppppp..","..pppllllllppp..","...ppllllllpp.d.","....llllllll.sp.",".....pp..pp..ss.","................","................","................","................","................","................"
  ]},
  azumarill: { palette: { p: '#2563eb', d: '#1e3a8a', l: '#ffffff', s: '#f43f5e', b: '#0f172a' }, grid: [
    "..ppp......ppp..",".ppspp....ppspp.","..pp.pppppp.pp..","...pppppppppp...","...pppbppbppp...","..pppppppppppp..","..plpplandlplp..".replace(/and/,'ppp'),"..llllllllllll..","...llllllllll.p.","....pp....pp.ss.","................","................","................","................","................","................"
  ]},
  sudowoodo: { palette: { p: '#92400e', d: '#78350f', l: '#22c55e', s: '#fde047', b: '#0f172a' }, grid: [
    "......pppp......","..ll..pppp..ll..",".llll.pbpb.llll.","..ll..pppp..ll..","...pppppppppp...","....ppsssspp....","....ppsssspp....",".....pppppp.....","....pp....pp....","....dd....dd....","................","................","................","................","................","................"
  ]},
  politoed: { palette: { p: '#22c55e', d: '#15803d', l: '#fef08a', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".......ss.......","......s..s......","....pp....pp....","...pppppppppp...","...ppbppppbpp...","..pppppppppppp..","..ppllllllllpp..","..ppllsbbllspp..","...pllllllllp...","....pp....pp....","...lll....lll...","................","................","................","................","................"
  ]},
  hoppip: { palette: { p: '#f43f5e', d: '#be185d', l: '#22c55e', s: '#fde047', b: '#0f172a' }, grid: [
    "..llll....llll..",".llllll..llllll.","...ll.pppp.ll...","....pppppppp....","...ppsbppbspl...","...pppppppppp...","....pppppppp....","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  skiploom: { palette: { p: '#22c55e', d: '#15803d', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "....llllllll....","...llllllllll...","....dddddddd....","...pppppppppp...","..ppppbppbpppp..","..pppppppppppp..","...pppppppppp...","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  jumpluff: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: [
    "......llll......",".....llllll.....","..ll.pppppp.ll..",".llllpsbbpsllll.",".llllppppppllll.","..ll.pppppp.ll..",".....pp..pp.....","................","................","................","................","................","................","................","................","................"
  ]},
  aipom: { palette: { p: '#a855f7', d: '#6b21a8', l: '#fde68a', b: '#0f172a' }, grid: [
    "......p..p......","...pp.pppp.pp...","..pdppppppppdp..","...pplbppblpp...","...ppllllllpp...","....pppppppp..p.",".....pppppp..pp.","....pp....pp.ll.","....ll....ll.ll.","................","................","................","................","................","................","................"
  ]},
  sunkern: { palette: { p: '#facc15', d: '#78350f', l: '#22c55e', b: '#0f172a' }, grid: [
    "......llll......",".....llllll.....","......ll........","....pppppppp....","...ppddppddpp...","...ppdbppbdpp...","...ppddppddpp...","....pppppppp....",".....dddddd.....","................","................","................","................","................","................","................"
  ]},
  sunflora: { palette: { p: '#fde047', d: '#16a34a', l: '#fef3c7', s: '#78350f', b: '#0f172a' }, grid: [
    "....pppppppp....","..pppssssssppp..",".pppssbssbssppp.",".pppssssssssppp.","..pppssssssppp..","....pppppppp....","...dddddddddd...","..dd..dddd..dd..","......dddd......",".....dd..dd.....","................","................","................","................","................","................"
  ]},
  yanma: { palette: { p: '#ef4444', d: '#991b1b', l: '#e0f2fe', s: '#22c55e', b: '#0f172a' }, grid: [
    ".llll......llll.","llllll.ss.llllll","..lll.sbbs.lll..","......pppp......",".llll.pppp.llll.","llllllpppp.lllll","......pppp......","......dddd......","......pppp......",".......pp.......","................","................","................","................","................","................"
  ]},
  wooper: { palette: { p: '#38bdf8', d: '#1d4ed8', l: '#a855f7', b: '#0f172a' }, grid: [
    "................","..ll........ll..",".llll.pppp.llll.","..ll.pppppp.ll..","....ppbppbpp....","....pppppppp....","....ppddddpp.pp.","....ppddddpp.pp.",".....pp..pp.....","................","................","................","................","................","................","................"
  ]},
  quagsire: { palette: { p: '#38bdf8', d: '#0284c7', l: '#a855f7', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pppppppp....","....ppbppbpp....","...pppppppppp...","..pppppppppppp..",".pp..pppppp..pp.",".pp..pppppp..pp.","....pppppppp.dd.","....ppp..ppp.dd.","....ddd..ddd....","................","................","................","................","................","................"
  ]},
  espeon: { palette: { p: '#d8b4fe', d: '#9333ea', l: '#fae8ff', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","..dd........dd..","..ppp......ppp..","...pppppppppp...","....pppsspppp...","....pbppppbp....",".....pppppp..d..","....pppppppp.dd.","....pppppppp.d..","....pp....pp....","....dd....dd....","................","................","................","................","................"
  ]},
  slowking: { palette: { p: '#f472b6', d: '#94a3b8', l: '#ef4444', s: '#fde047', b: '#0f172a' }, grid: [
    "......dddd......",".....ddlldd.....","....dddddddd....","....ssssssss....","....ppbppbpp....","...pppppppppp...","..lllsllllslll..","...pppllllppp...", "...pppllllppp...","....pppppppp....","....pp....pp....","................","................","................","................","................"
  ]},
  misdreavus: { palette: { p: '#0f766e', d: '#134e4a', l: '#f43f5e', s: '#fde047', b: '#0f172a' }, grid: [
    ".....llllll.....","....pppppppp....","...pppppppppp...","...ppsbppbspl...","....pppppppp....","....llllllll....","...pppppppppp...","..ppddddddddpp..","..p.p..dd..p.p..","................","................","................","................","................","................","................"
  ]},
  unown: { palette: { p: '#1e293b', d: '#0f172a', l: '#ffffff', b: '#0f172a' }, grid: [
    ".......pp.......","......pppp......","......pppp......",".....pppppp.....","....pplllpp.....","....pplblpp.....","....pplllpp.....","....pppppppp....","...pp..pp..pp...","...p...pp...p...","................","................","................","................","................","................"
  ]},
  wobbuffet: { palette: { p: '#38bdf8', d: '#0284c7', l: '#0f172a', s: '#f43f5e', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pppppppp....","...pppppppppp...","...ppbppppbpp...","...pppssssppp...","..pppppppppppp..","..pppppppppppp..","...pppppppppp.ll","...pppppppppp.lb","...ppp.pp.ppp...","................","................","................","................","................","................"
  ]},
  girafarig: { palette: { p: '#facc15', d: '#78350f', l: '#f472b6', b: '#0f172a' }, grid: [
    "...l..l.........","...pppp.........","..ppbp..........","...ppp..........","....pp..........","....ppdd....dd..","....pppdddddbl..","....pppddddddd..","....pp....dd....","....pp....dd....","................","................","................","................","................","................"
  ]},
  pineco: { palette: { p: '#0f766e', d: '#134e4a', l: '#fde047', b: '#0f172a' }, grid: [
    ".......dd.......",".....pppppp.....","....dddddddd....","...pppppppppp...","..ddddlbbldddd..","...pppppppppp...","....dddddddd....",".....pppppp.....","......dddd......","................","................","................","................","................","................","................"
  ]},
  forretress: { palette: { p: '#cbd5e1', d: '#991b1b', l: '#64748b', b: '#0f172a' }, grid: [
    "....pppppppp....","..ppddddddddpp..",".ddppppppppppdd.","ddppbppppppbppdd","ppppddddddddpppp","ddppppppppppppdd",".ddppppppppppdd.","..ppddddddddpp..","....pppppppp....","................","................","................","................","................","................","................"
  ]},
  dunsparce: { palette: { p: '#fde047', d: '#38bdf8', l: '#ffffff', b: '#0f172a' }, grid: [
    "................","...pppppp.......","..ppddddpp..ll..","..ppdbbdpp..ll..","...ppppppppppp..","....ddddpppppp..", ".....ppppppppp.p","......ddddddddp.","................","................","................","................","................","................","................","................"
  ]},
  gligar: { palette: { p: '#c084fc', d: '#7e22ce', l: '#f472b6', b: '#0f172a' }, grid: [
    "..pp..p..p..pp..",".ppp.pppppp.ppp.",".pplppbppbpp.pp.","..plllpppplllp..","...lllpppplll...","....pppppppp....",".....pppppp..pp.","....pp....pppp..","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  steelix: { palette: { p: '#94a3b8', d: '#475569', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: [
    "...ll.pppp.ll...","..lllpppppp.ll..","...ppppbppbpp...","...pllllllllp...","....dddddddd....",".....pppppp.....","....dddddddd....","...pppppp.......","....dddddd......",".....pppppp.....","......dddd......","................","................","................","................","................"
  ]},
  snubbull: { palette: { p: '#f472b6', d: '#1e3a8a', l: '#ffffff', b: '#0f172a' }, grid: [
    "..pp........pp..","..pppppppppppp..","...pppbppbppp...","..pppppppppppp..","..pplpppppplpp..","...dddddddddd...", "...ddppppppdd...", "...dddddddddd...", "....pp....pp....","................","................","................","................","................","................","................"
  ]},
  granbull: { palette: { p: '#c084fc', d: '#581c87', l: '#ffffff', s: '#0f172a', b: '#0f172a' }, grid: [
    "..pp........pp..","...pppppppppp...","...pppbppbppp...","..pplpppppplpp..","..pppppppppppp..",".pp.ssssssss.pp.","....pppppppp....","....pppppppp....","....pp....pp....","...ddd....ddd...","................","................","................","................","................","................"
  ]},
  qwilfish: { palette: { p: '#0f766e', d: '#fef08a', l: '#f43f5e', b: '#0f172a' }, grid: [
    "...p...pp...p...","....pppppppp....","..pppppppppppp..",".pppppbppbppppp.","..pppppplppppp..","..dddddddddddd..","...dddddddddd...", "....d..dd..d....","................","................","................","................","................","................","................","................"
  ]},
  scizor: { palette: { p: '#dc2626', d: '#7f1d1d', l: '#facc15', s: '#cbd5e1', b: '#0f172a' }, grid: [
    "....p..p..p.....","....ppppppp.....","..ss.pbppbp.ss..",".ppp..dddd..ppp.","ppbp.pppppp.pbpp",".ppp..dddd..ppp.","......pppp......",".....pppppp.....",".....pp..pp.....","....dd....dd....","................","................","................","................","................","................"
  ]},
  shuckle: { palette: { p: '#ef4444', d: '#fde047', l: '#ffffff', b: '#0f172a' }, grid: [
    "......dddd......",".....ddbbdd.....","......dddd......","....pppppppp....","...ppllpppllpp..","..pppppppppppp..","..ppllpppppllpp.","...pppppppppp...","..dd..dddd..dd..","................","................","................","................","................","................","................"
  ]},
  heracross: { palette: { p: '#1d4ed8', d: '#1e3a8a', l: '#facc15', b: '#0f172a' }, grid: [
    "......dddd......",".......pp.......",".......pp.......",".....pppppp.....","....pplbbllp....","..pppppppppppp..",".pp..pppppp..pp.",".....pppppp.....","....ppp..ppp....","....dd....dd....","................","................","................","................","................","................"
  ]},
  sneasel: { palette: { p: '#1e293b', d: '#0f172a', l: '#f43f5e', s: '#fde047', b: '#0f172a' }, grid: [
    "...ll...........","..lll..pp.......","...llpppppp.....","....ppsbbspp....",".....pppppp.....","...pppppppppp...", "..ss.ppsspp.ss..",".....pppppp..ll.","....pp....pp.ll.","...ss......ss...","................","................","................","................","................","................"
  ]},
  teddiursa: { palette: { p: '#d97706', d: '#78350f', l: '#fef08a', b: '#0f172a' }, grid: [
    "..ppp......ppp..",".ppdpp....ppdpp.","..pppppppppppp..","..ppppllllpppp..","..pppbllllbppp..","...ppplllppp....","...pppppppppp...", "...pppppppppp...", "....pp....pp....","................","................","................","................","................","................","................"
  ]},
  ursaring: { palette: { p: '#92400e', d: '#451a03', l: '#fde047', b: '#0f172a' }, grid: [
    "..pp........pp..","...pppppppppp...","...ppbppppbpp...","...pppllllppp...", "..pppppppppppp..", ".ppppplllllppppp",".pppplpppppplppp",".ppppplllllppppp","..pppppppppppp..","...ppp....ppp...","................","................","................","................","................","................"
  ]},
  slugma: { palette: { p: '#ef4444', d: '#dc2626', l: '#facc15', b: '#0f172a' }, grid: [
    ".....p....p.....","....ppp..ppp....","....pplbblpp....","....pppppppp....","....pppppppp....","...pppppppppp...", "..ddddppppdddd..",".dddddddddddddd.","................","................","................","................","................","................","................","................"
  ]},
  magcargo: { palette: { p: '#ef4444', d: '#78716c', l: '#facc15', b: '#0f172a' }, grid: [
    ".......dddd.....",".....dddddddd...","...ppddddlldr...","..ppbppdddddd...","..ppppddddddd...","...pppppppppp...","..pppppppppppp..",".dddddddddddddd.","................","................","................","................","................","................","................","................"
  ]},
  swinub: { palette: { p: '#a16207', d: '#451a03', l: '#f472b6', b: '#0f172a' }, grid: [
    "................","................",".....pppppp.....","...ppddddddpp...","..ppppddddpppp..","..pbppddddppppp.",".llppppppppppppp","..pppppppppppp..","................","................","................","................","................","................","................","................"
  ]},
  piloswine: { palette: { p: '#92400e', d: '#78350f', l: '#ffffff', b: '#0f172a' }, grid: [
    "....pppppppp....","..ppppddddpppp..",".pppppppppppppp.",".ppddddddddddpp.",".ppllppppppppll.","..lllppppppppll.","....pppppppp....","....dd....dd....","................","................","................","................","................","................","................","................"
  ]},
  corsola: { palette: { p: '#f472b6', d: '#db2777', l: '#ffffff', b: '#0f172a' }, grid: [
    "..pp..pp..pp....",".pppp.pppp.pp...","..ppppppppppp...","...pppppppppp...","...ppbppppbpp...","...pppppppppp...","...llllllllll...","....ll....ll....","................","................","................","................","................","................","................","................"
  ]},
  remoraid: { palette: { p: '#94a3b8', d: '#334155', l: '#e0f2fe', b: '#0f172a' }, grid: [
    "................","......ll........","....pppppppp.d..","..ppppddpppppdd.",".ppbpppddpppppp.","..pppppppppppdd.",".....ll....lld..","................","................","................","................","................","................","................","................","................"
  ]},
  octillery: { palette: { p: '#dc2626', d: '#991b1b', l: '#facc15', b: '#0f172a' }, grid: [
    ".....pppppp.....","....ppllllpp....","...pppppppppp...","...ppbppppbpp...","....pppbbppp....","..pppppppppppp..",".pp.pp.pp.pp.pp.",".ll.ll.ll.ll.ll.","................","................","................","................","................","................","................","................"
  ]},
  delibird: { palette: { p: '#ef4444', d: '#991b1b', l: '#ffffff', s: '#facc15', b: '#0f172a' }, grid: [
    "....ll....ll....","....llppppll....","....lllbbl.l....","...llllllllll...","...lllsssllll...","..ppppppppppp.ll","..pplllllllpp.ll","...ppppppppp.ll.","....ss....ss....","................","................","................","................","................","................","................"
  ]},
  mantine: { palette: { p: '#3b82f6', d: '#1e3a8a', l: '#cbd5e1', b: '#0f172a' }, grid: [
    "...d........d...","..ppp..pp..ppp..",".pppppppppppppp.","ppppppbppbpppppp",".ppppllllllpppp.","..pp.llllll.pp..","......pppp......",".......pp.......",".......pp.......","................","................","................","................","................","................","................"
  ]},
  skarmory: { palette: { p: '#94a3b8', d: '#334155', l: '#dc2626', s: '#facc15', b: '#0f172a' }, grid: [
    "......ppp.......",".ll..ppppp..ll..","llll.psbps.llll.",".lllppdddpplll..","..pppppppppppp..","...pppddddppp...","......dddd......",".....dd..dd.....","....ss....ss....","................","................","................","................","................","................","................"
  ]},
  houndour: { palette: { p: '#1e293b', d: '#ea580c', l: '#cbd5e1', b: '#0f172a' }, grid: [
    "...pp......pp...","...llllllllll...","...ppddddddpp...","...ppdbppbdpp...","....dddddddd....","....pppppppp.p..","....ppllllpppp..","....pppppppp....","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  kingdra: { palette: { p: '#38bdf8', d: '#0284c7', l: '#fef08a', b: '#0f172a' }, grid: [
    "..ll........ll..","...ll.pppp.ll...","....pppppppp....","..ppppbppbp.....","..pp.pppppp.ll..",".....pplllp.ll..","....ppplllpp....","....ppplllpp....",".....pppppp.....","......pppp......",".....pppp.......","................","................","................","................","................"
  ]},
  phanpy: { palette: { p: '#60a5fa', d: '#2563eb', l: '#ef4444', b: '#0f172a' }, grid: [
    "................","..dddd....dddd..",".dppppppppppppd.",".dppppbppbppppd.","..pppplllppppp..","....pplllppppp..","....pplllpppp...","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  donphan: { palette: { p: '#94a3b8', d: '#1e293b', l: '#ffffff', b: '#0f172a' }, grid: [
    "....dddddddd....","..dddddddddddd..",".ppppddddddddpp.","llpppbddddddpppl","llpppddddddddppl",".ppppdddpppppp..","...pppddd..pp...","...ddd.....dd...","................","................","................","................","................","................","................","................"
  ]},
  porygon2: { palette: { p: '#f43f5e', d: '#38bdf8', l: '#ffffff', b: '#0f172a' }, grid: [
    "......pppp......",".....pppppp.....","...ddddpbpp.....","...ddddpppp.....","......pppp......","....pppppppp.dd.","...pppddddpppdd.","...pppppppppp...","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  stantler: { palette: { p: '#b45309', d: '#78350f', l: '#fef08a', b: '#0f172a' }, grid: [
    "..ll........ll..",".llbl......lbll.","...ll.pppp.ll...","....pppppppp....","...ddpbppbp.....","....pppppp......",".....pppppppp...", "....pppppppppp.l","....pp....pp....","....dd....dd....","................","................","................","................","................","................"
  ]},
  smeargle: { palette: { p: '#fef3c7', d: '#78350f', l: '#22c55e', b: '#0f172a' }, grid: [
    "....dddddddd....","...dddddddddd...","....pppppppp....","...ddpbppbpdd...","....pppppppp....","...dddddddddd...", "...pppppppppp.ll","....pppppppp..dd","....pp....pp..p.","...ddd....ddd...","................","................","................","................","................","................"
  ]},
  tyrogue: { palette: { p: '#c084fc', d: '#78350f', l: '#ffffff', b: '#0f172a' }, grid: [
    "....p..p..p.....","....pppppppp....","....ppbppbpp....","....pppppppp....","...lppppppppl...", "....dddddddd....","....dddddddd....",".....pp..pp.....","....ddd..ddd....","................","................","................","................","................","................","................"
  ]},
  hitmontop: { palette: { p: '#a16207', d: '#38bdf8', l: '#fef08a', b: '#0f172a' }, grid: [
    "...pp......pp...","....pp....pp....",".....dddddd.....","...dddddddddd...", "..pppppppppppp..","...pppbppbppp...","....pppppppp....","......dddd......",".......dd.......","................","................","................","................","................","................","................"
  ]},
  smoochum: { palette: { p: '#f472b6', d: '#fde047', l: '#fef3c7', b: '#0f172a' }, grid: [
    "....dddddddd....","...dddddddddd...","...ddppppppdd...","...ddpbppbpdd...","....ppplllpp....","....pppppppp....","....llllllll....",".....pp..pp.....","................","................","................","................","................","................","................","................"
  ]},
  elekid: { palette: { p: '#facc15', d: '#0f172a', l: '#fef08a', b: '#0f172a' }, grid: [
    "....pp....pp....","....pp....pp....","...pppppppppp...","...pppbppbppp...","...pppddddppp...","..pppppppppppp..","...pppddddppp...","....pppppppp....",".....pp..pp.....","................","................","................","................","................","................","................"
  ]},
  magby: { palette: { p: '#ef4444', d: '#991b1b', l: '#facc15', b: '#0f172a' }, grid: [
    "....ppp..ppp....","...pppppppppp...","...pppppppppp...","...pppbppbppp...","....llllllll....","...pppllllppp...", "...pppppppppp.p.","....pppppppp.pp.",".....pp..pp.....","................","................","................","................","................","................","................"
  ]},
  miltank: { palette: { p: '#f472b6', d: '#1e293b', l: '#fef08a', b: '#0f172a' }, grid: [
    "...dd......dd...","..llllpppp.lll..","...pppppppppp...","...pppbppbppp...","..ddppppppppdd..","..ddppllllppdd..","...pppllllppp...", "...pppppppppp...", "....dd....dd....","................","................","................","................","................","................"
  ]},
  blissey: { palette: { p: '#f9a8d4', d: '#db2777', l: '#ffffff', b: '#0f172a' }, grid: [
    "...ll......ll...","..llppppppppll..","..llppbppbpp.l..","...pppppppppp...","..llllllllllll..",".llllppppppllll.",".llllpllllp.lll.","..lllpppppp.ll..","...pppppppppp...","....dd....dd....","................","................","................","................","................","................"
  ]},
  larvitar: { palette: { p: '#84cc16', d: '#15803d', l: '#ef4444', b: '#0f172a' }, grid: [
    ".......pp.......","......pppp......","....pppppppp....","....ppbppbpp....","....pppppppp....","...pppllllppp...","...pppllllppp.pp","....pppppppp.ppp","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  pupitar: { palette: { p: '#38bdf8', d: '#0284c7', l: '#0f172a', b: '#0f172a' }, grid: [
    "......pppp......",".....pppppp.....","....pplllpp.....","...pppppppppp...","...pppbppbppp...","..pppplllppppp..","...pppppppppp...","....ppddddpp....",".....pppppp.....","......dddd......","................","................","................","................","................","................"
  ]},

  espeon: { palette: { p: '#d8b4fe', d: '#9333ea', l: '#fae8ff', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","..dd........dd..","..ppp......ppp..","...pppppppppp...","....pppsspppp...","....pbppppbp....",".....pppppp..d..","....pppppppp.dd.","....pppppppp.d..","....pp....pp....","....dd....dd....","................","................","................","................","................"
  ]},
  leafeon: { palette: { p: '#fef08a', d: '#16a34a', l: '#4ade80', s: '#78350f', b: '#0f172a' }, grid: [
    "................","...dd......dd...","..dll......lld..","....ppppdlpp....","....pbppppbp....","...pppppppppp...","...pppppppppp.dd","....pppppppp.ddl","....pp...pp..dd.","....ss...ss.....","................","................","................","................","................","................"
  ]},
  glaceon: { palette: { p: '#bae6fd', d: '#0284c7', l: '#38bdf8', s: '#1e3a8a', b: '#0f172a' }, grid: [
    "................","...dd......dd...","..dll.dddd.lld..","...ddppppppdd...","....pbppppbp....","...llpppppp.ll..","...llppppppp.dd.","....pppppppp.dd.","....pp...pp.....","....dd...dd.....","................","................","................","................","................","................"
  ]},
  sylveon: { palette: { p: '#fce7f3', d: '#f472b6', l: '#38bdf8', s: '#ffffff', b: '#0f172a' }, grid: [
    "................","...dd......dd...","...dp.ssss.pd...","...dddddddddd...","....ppbppbpp....","..ssddddddddss..","...pppppppppp.dd","....pppppppp..pp","....pp...pp.....","....dd...dd.....","................","................","................","................","................","................"
  ]},
  roselia: { palette: { p: '#4ade80', d: '#15803d', l: '#ef4444', s: '#3b82f6', b: '#0f172a' }, grid: [
    "................","......dddd......",".....pppppp.....","....ppbppbpp....","..ll.pppppp.ss..",".llllddddddssss.","..ll.pppppp.ss..",".....dddddd.....",".....pppppp.....","......p..p......","................","................","................","................","................","................"
  ]},

  celebi: { palette: { p: '#86efac', d: '#15803d', l: '#ecfccb', s: '#38bdf8', b: '#0f172a' }, grid: ["......dd..dd....",".....d..dd..d...","....pppppppp....","...pppppppppp...","...ppsbppbspl...","....pppppppp....","..ss.dddddd.ss..",".ss..pppppp..ss.",".....pppppp.....","......p..p......","................","................","................","................","................","................"]},
  tyranitar: { palette: { p: '#16a34a', d: '#14532d', l: '#38bdf8', s: '#0f172a', b: '#0f172a' }, grid: ["....dd.dd.dd....","...pppppppppp...","..ppppbppbpppp..",".pppppppppppppp.",".ppppllllllpppp.","..pppllllllppp..","..ppppppppppppd.","...ppp....pppdd.","...ddd....ddd...","................","................","................","................","................","................","................"]},
poochyena: { palette: { p: '#94a3b8', d: '#1e293b', l: '#ef4444', b: '#0f172a' }, grid: [
    "................","..dd........dd..","..dpp......ppd..","...pppppppppp...","...pplbppblpp...","...pppddddppp...","....dddddddd..pp","...ppppppppppppp","...ppddddpppppp.","...pp....pp.....","...dd....dd.....","................","................","................","................","................"
  ]},
  mightyena: { palette: { p: '#94a3b8', d: '#0f172a', l: '#ef4444', b: '#0f172a' }, grid: [
    "..dd........dd..",".dddd......dddd.","..ddppppppppdd..","...pplbppblpp...","...dddddddddd...","..ddddppppdddddd",".ddddppppppddddd","...ppppppppppdd.","...pp......pp...","...dd......dd...","................","................","................","................","................","................"
  ]},
  zigzagoon: { palette: { p: '#a16207', d: '#451a03', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","..pp..ll..pp....",".ppdpplllppdp...","..ppddddddddpp..","..llpbppppbpll..","...llllppllll...","..ppddllllppdd..",".ppddppppppddpp.","...pp......pp...","...ll......ll...","................","................","................","................","................","................"
  ]},
  linoone: { palette: { p: '#fef3c7', d: '#92400e', l: '#38bdf8', b: '#0f172a' }, grid: [
    "................","...pp......pp...","..ppppddddpppp..","..pplbppppblpp..","...pppppppppp...", "..ddddppppppdddd",".ppppddddddddppp","....pppppppp.ppp","...pp......pp...","................","................","................","................","................","................","................"
  ]},
  wurmple: { palette: { p: '#ef4444', d: '#be185d', l: '#fef08a', b: '#0f172a' }, grid: [
    "......l..l......",".....pppppp.....","....pppppppp....","....plbppblp....","....pppppppp....",".....ppddpp.....",".....pppppp..l..","......ppddp.pp..","......llllllll..","................","................","................","................","................","................","................"
  ]},
  silcoon: { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#ef4444', b: '#0f172a' }, grid: [
    ".......pp.......","....pppppppp....","..ppppddddpppp..",".pppppppppppppp.",".ppplbpppppblpp.",".ppppddddddddpp.","..pppppppppppp..","....dddddddd....","................","................","................","................","................","................","................","................"
  ]},
  beautifly: { palette: { p: '#fde047', d: '#0f172a', l: '#ef4444', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".ddd........ddd.","ddppd......dppdd","dpllpd.dd.dpllpd","dppppddddddppppd",".dddssdbbdssddd.","..dd..dddd..dd..",".dss..dddd..ssd.","..dd...dd...dd..","................","................","................","................","................","................","................","................"
  ]},
  cascoon: { palette: { p: '#d8b4fe', d: '#9333ea', l: '#ef4444', b: '#0f172a' }, grid: [
    ".......pp.......","....pppppppp....","..ppppddddpppp..",".pppppppppppppp.",".ppplbpppppblpp.",".ppppddddddddpp.","..pppppppppppp..","....dddddddd....","................","................","................","................","................","................","................","................"
  ]},
  dustox: { palette: { p: '#22c55e', d: '#7e22ce', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    ".ppp...ll...ppp.","ppspp.dddd.ppspp","ppppppdbbdpppppp",".ppppddddddpppp.","..pppddddddppp..",".pp..dddddd..pp.","......dddd......","................","................","................","................","................","................","................","................","................"
  ]},
  lotad: { palette: { p: '#22c55e', d: '#15803d', l: '#38bdf8', s: '#fde047', b: '#0f172a' }, grid: [
    "................","...pppppppppp...","..ppppddddpppp..",".ppppppddpppppp.","..pppppppppppp..","...llllllllll...","...lllbssblll...","...llllllllll...","....ll.ll.ll....","................","................","................","................","................","................","................"
  ]},
  lombre: { palette: { p: '#4ade80', d: '#15803d', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [
    "..dddddddddddd..",".ddppppppppppdd.","..dddddddddddd..","....llbppbll....","....llssssll....","...pppppppppp...", "..llppppppppll..","...pppppppppp...","....ll....ll....","................","................","................","................","................","................","................"
  ]},
  ludicolo: { palette: { p: '#eab308', d: '#16a34a', l: '#fde047', s: '#f97316', b: '#0f172a' }, grid: [
    "......dddd......","...dddddddddd...","..ddlllllllldd..","....llpbppll....","....llssssll....","..pppppppppppp..",".ppppdddddddppp.",".pppppppppppppp.","..pppppppppppp..","....dd....dd....","................","................","................","................","................","................"
  ]},
  seedot: { palette: { p: '#a16207', d: '#78350f', l: '#fde68a', b: '#0f172a' }, grid: [
    ".......dd.......",".....dddddd.....","...dddddddddd...","...llllllllll...","...lllbllblll...","...pppppppppp...","....pppppppp....",".....dddddd.....",".....ll..ll.....","................","................","................","................","................","................","................"
  ]},
  nuzleaf: { palette: { p: '#a16207', d: '#16a34a', l: '#fef3c7', b: '#0f172a' }, grid: [
    "......dddd......",".....dddddd.....","....pppppppp....","....ppbppbpp....","....pppplppp....","...llllllllll...","..pp.pppppp.pp..","....dddddddd....","....pp....pp....","....ll....ll....","................","................","................","................","................","................"
  ]},
  shiftry: { palette: { p: '#78350f', d: '#f8fafc', l: '#16a34a', s: '#facc15', b: '#0f172a' }, grid: [
    "...dddddddddd...","..dddddddddddd..","..ddppsbbsppdd..","...dddppppddd...",".lllpppppppplll.","llllppppppppllll",".ll..pppppp..ll.","....dddddddd....","....pp....pp....","...ddd....ddd...","................","................","................","................","................","................"
  ]},
  taillow: { palette: { p: '#1e3a8a', d: '#ef4444', l: '#ffffff', s: '#facc15', b: '#0f172a' }, grid: [
    "................",".....pppppp.....","....ppbppbpp....","....ppddddpp....","..ppppllllpppp..",".pppppllllppppp.","..pp..llll..pp..",".....pp..pp.....",".....ss..ss.....","................","................","................","................","................","................","................"
  ]},
  swellow: { palette: { p: '#1e3a8a', d: '#dc2626', l: '#ffffff', s: '#facc15', b: '#0f172a' }, grid: [
    ".pp..........pp.","ppp..pppppp..ppp","ppppppbppbpppppp",".ppppdddddddppp.","..pppllllllppp..","....pllllllp....","...pp..pp..pp...","..pp...ss...pp..","................","................","................","................","................","................","................","................"
  ]},
  wingull: { palette: { p: '#f8fafc', d: '#38bdf8', l: '#facc15', b: '#0f172a' }, grid: [
    "................",".pp..........pp.","pdpp..pppp..ppdp",".ddppppbppbppdd.","...pppplllppp...",".....pppppp.....","......l..l......","................","................","................","................","................","................","................","................","................"
  ]},
  pelipper: { palette: { p: '#f8fafc', d: '#38bdf8', l: '#facc15', b: '#0f172a' }, grid: [
    "....dddddddd....","...pppppppppp...","...ppbppppbpp...","..llllllllllll..",".llllllllllllll.","..llllllllllll..","..ddppppppppdd..","...pppppppppp...",".....ll..ll.....","................","................","................","................","................","................","................"
  ]},
  ralts: { palette: { p: '#f8fafc', d: '#4ade80', l: '#f43f5e', b: '#0f172a' }, grid: [
    "......llll......","....dddddddd....","...dddddddddd...","...dddllllddd...","....pppppppp....",".....pppppp.....","....pppppppp....","...pppppppppp...","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  kirlia: { palette: { p: '#f8fafc', d: '#4ade80', l: '#f43f5e', b: '#0f172a' }, grid: [
    "....ll....ll....","...dddddddddd...","...ddpbppbpdd...","....pppppppp....",".....pppppp.....","...dddddddddd...","..ddddppppdddd..","....pp....pp....","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  gardevoir: { palette: { p: '#f8fafc', d: '#22c55e', l: '#f43f5e', b: '#0f172a' }, grid: [
    "....dddddddd....","...dddddddddd...","...ddpbppbpdd...","....ppllllpp....","...dddddddddd...","..ddppppppppdd..","..pppppppppppp..",".pppppppppppppp.",".ppppddddddpppp.","................","................","................","................","................","................","................"
  ]},
  surskit: { palette: { p: '#38bdf8', d: '#0284c7', l: '#facc15', s: '#f43f5e', b: '#0f172a' }, grid: [
    ".......ll.......","......llll......","....pppppppp....","...ppsbppbspl...","....pppppppp....","..pp..dddd..pp..",".pp..........pp.","p..............p","................","................","................","................","................","................","................","................"
  ]},
  masquerain: { palette: { p: '#bae6fd', d: '#f97316', l: '#1e293b', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".dddd......dddd.","ddllld....dllldd","ddllldssssdllldd",".ddddsbbbsddddd.","....ssssssss....","...pp.ssss.pp...","..pp........pp..","................","................","................","................","................","................","................","................","................"
  ]},
  shroomish: { palette: { p: '#fde68a', d: '#16a34a', l: '#a16207', b: '#0f172a' }, grid: [
    ".....dddddd.....","...ppddddddpp...","..ppppddddpppp..","..ppddppppddpp..","..pppbppppbppp..","..ppppbbbbpppp..","...dddddddddd...","....ll....ll....","................","................","................","................","................","................","................","................"
  ]},
  breloom: { palette: { p: '#22c55e', d: '#15803d', l: '#fde68a', s: '#ef4444', b: '#0f172a' }, grid: [
    ".....ssssss.....","...pppppppppp...","....llbppbll....",".....llllll.....","...pppppppppp...","..ss.llllll.ss..","....llllllll.pp.","....pp....pppp..","...sss....sss...","................","................","................","................","................","................","................"
  ]},
  slakoth: { palette: { p: '#d6d3d1', d: '#78716c', l: '#f472b6', b: '#0f172a' }, grid: [
    "................","....dddddddd....","...ddpbppbpdd...","...ppppllpppp...","..pppppppppppp..",".pp..dddddd..pp.","....pp....pp....","................","................","................","................","................","................","................","................","................"
  ]},
  vigoroth: { palette: { p: '#f8fafc', d: '#dc2626', l: '#78350f', b: '#0f172a' }, grid: [
    ".....dddddd.....","....pppppppp....","...pppbppbppp...","..pppppppppppp..",".pp..ppddpp..pp.","ll...pppppp...ll","....ppp..ppp....","...lll....lll...","................","................","................","................","................","................","................","................"
  ]},
  slaking: { palette: { p: '#a16207', d: '#451a03', l: '#fef3c7', s: '#f472b6', b: '#0f172a' }, grid: [
    "....dddddddd....","...ddpbppbpdd...","...ddllssllpp...","..pppppppppppp..",".ppppplllllppppp","pppppplllllppppp",".pppppppppppppp.","..ppp......ppp..","................","................","................","................","................","................","................","................"
  ]},
  nincada: { palette: { p: '#e7e5e4', d: '#78350f', l: '#84cc16', b: '#0f172a' }, grid: [
    "................","....llllllll....","...pppppppppp...","..ddpbppppbpdd..","..ddddppppdddd..","...dd..dd..dd...","................","................","................","................","................","................","................","................","................","................"
  ]},
  ninjask: { palette: { p: '#facc15', d: '#1e293b', l: '#e0f2fe', s: '#ef4444', b: '#0f172a' }, grid: [
    ".llll......llll.","llllll.pp.llllll",".llll.pssp.llll.",".....ddbbdd.....","....dddddddd....","....pppppppp....",".....dd..dd.....","................","................","................","................","................","................","................","................","................"
  ]},
  shedinja: { palette: { p: '#d97706', d: '#78350f', l: '#fef08a', b: '#0f172a' }, grid: [
    ".....llllll.....","................","...pp.pppp.pp...","..ppppddddpppp..","..pppddbbddppp..","...ppddddddpp...","....pppppppp....",".....pp..pp.....","................","................","................","................","................","................","................","................"
  ]},
  whismur: { palette: { p: '#f472b6', d: '#be185d', l: '#fde047', b: '#0f172a' }, grid: [
    "..pp........pp..",".pllp......pllp.","..pppppppppppp..","...pppbppbppp...","...ppppddpppp...","...pppppppppp...","....pp....pp....","................","................","................","................","................","................","................","................","................"
  ]},
  loudred: { palette: { p: '#7e22ce', d: '#4c1d95', l: '#facc15', s: '#f43f5e', b: '#0f172a' }, grid: [
    "..ll........ll..",".llll.pppp.llll.","..llppppppppll..","...pppbppbppp...","...ppsssssspp...","...ppsbbbbspp...","...pppppppppp...","....pp....pp....","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  exploud: { palette: { p: '#6366f1', d: '#312e81', l: '#fde047', s: '#ef4444', b: '#0f172a' }, grid: [
    ".ll..ll..ll..ll.","..llllllllllll..","..ppppbppbpppp..","..ppsssssssspp..","..ppsbbbbbbspp..",".pppppppppppppp.",".pp.ppllllpp.pp.","....ppp..ppp....","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  makuhita: { palette: { p: '#facc15', d: '#1e293b', l: '#ef4444', b: '#0f172a' }, grid: [
    "......pppp......",".....pppppp.....","....pppppppp....","...pllbppbllp...","..ddddppppdddd..",".ddppppppppppdd.","..pppppppppppp..","...dddd..dddd...","................","................","................","................","................","................","................","................"
  ]},
  hariyama: { palette: { p: '#fef08a', d: '#1e3a8a', l: '#f97316', b: '#0f172a' }, grid: [
    ".....dddddd.....","....pppppppp....","...pppbppbppp...",".ll..dddddd..ll.","llllppppppppllll",".ll.dddddddd.ll.","...llllllllll...","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  azurill: { palette: { p: '#38bdf8', d: '#0284c7', l: '#f472b6', b: '#0f172a' }, grid: [
    "................","...pp......pp...","..plpp....pplp..","...pppppppppp...","...pppbppbppp...","....pppppppp....",".....d....d.....",".........ppp....","........ppppp...",".........ppp....","................","................","................","................","................","................"
  ]},
  nosepass: { palette: { p: '#475569', d: '#1e293b', l: '#ef4444', b: '#0f172a' }, grid: [
    "....pppppppp....","...pppppppppp...","...ppddddddpp...","...pppllllppp...","..ppppllllpppp..","..pppppppppppp..","...dddddddddd...", "....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  skitty: { palette: { p: '#f472b6', d: '#db2777', l: '#fef08a', b: '#0f172a' }, grid: [
    "..dd........dd..",".dpp........ppd.","..pppppppppppp..","..ppllllllllpp..","..pplbppppblpp..","...llllllllll.ll","....pppppppp.lll","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  delcatty: { palette: { p: '#fde68a', d: '#7e22ce', l: '#f472b6', b: '#0f172a' }, grid: [
    "..dd........dd..","..dddd....dddd..","...pppppppppp...","...ppbppppbpp...","..dddddddddddd..","...dddddddddd...", "....pppppppp.dd.","....pp....pp.dd.","................","................","................","................","................","................","................","................"
  ]},
  sableye: { palette: { p: '#6b21a8', d: '#3b0764', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [
    "..pp........pp..","..pppp....pppp..","...pppppppppp...","...ppllppbllp...","....pppppppp....","...ppppsspspp...","..pp..pppp..pp..",".....pp..pp.....","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  mawile: { palette: { p: '#fde047', d: '#0f172a', l: '#f43f5e', b: '#0f172a' }, grid: [
    "..dddddddddd....",".dddddddddddd...",".ddlldddddddd...","..ddddpppppp....","..dddppbppbpp...","...ddpppppppp...",".....pppppppp...","....pppppppppp..",".....pp....pp...","................","................","................","................","................","................","................"
  ]},
  aron: { palette: { p: '#cbd5e1', d: '#334155', l: '#38bdf8', b: '#0f172a' }, grid: [
    "................","....pppppppp....","...ppddppddpp...","..ppplbppblppp..","..pppppppppppp..","...dddddddddd...", "...pp..pp..pp...","...dd..dd..dd...","................","................","................","................","................","................","................","................"
  ]},
  lairon: { palette: { p: '#94a3b8', d: '#1e293b', l: '#38bdf8', b: '#0f172a' }, grid: [
    "....pp....pp....","...pppppppppp...","..pppbppppbppp..","..dddddddddddd..",".ppddddddddddpp.","..pppppppppppp..","...pp..pp..pp...","...dd..dd..dd...","................","................","................","................","................","................","................","................"
  ]},
  aggron: { palette: { p: '#cbd5e1', d: '#1e293b', l: '#38bdf8', b: '#0f172a' }, grid: [
    "..pp..pppp..pp..","...pppppppppp...","...pppbppbppp...","..dddddddddddd..",".ppddddddddddpp.","pp.pppddddppp.pp","...dddddddddd.dd","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  meditite: { palette: { p: '#38bdf8', d: '#f8fafc', l: '#f43f5e', b: '#0f172a' }, grid: [
    "......dddd......","....dddddddd....","...dd.dddd.dd...","....pppppppp....","....ppbppbpp....",".....pppppp.....","...dddddddddd...","..dddddddddddd..","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  medicham: { palette: { p: '#f43f5e', d: '#f8fafc', l: '#facc15', b: '#0f172a' }, grid: [
    "....ll.pp.ll....","...pppppppppp...","....ddbppbdd....",".....dddddd.....","....pppppppp....","...pppppppppp...","..ppppddddpppp..","...ppp....ppp...","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  electrike: { palette: { p: '#22c55e', d: '#15803d', l: '#facc15', b: '#0f172a' }, grid: [
    "................","...pppppppp.....","..pplllllllp....","..ppbppppbpp....","...pppppppp..ll.","...ppplllpppppp.","...pppppppppppp.","...pp......pp...","...ll......ll...","................","................","................","................","................","................","................"
  ]},
  manectric: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#facc15', b: '#0f172a' }, grid: [
    "....llllllll....","...llllllllll...","...lllpbpplll...","....pppppppp....","...lllpppppp.ll.","...llpppppppppp.","...pppppppppppp.","...ll......ll...","...pp......pp...","................","................","................","................","................","................","................"
  ]},
  plusle: { palette: { p: '#fef08a', d: '#ef4444', l: '#ffffff', b: '#0f172a' }, grid: [
    "..dd........dd..","..dddd....dddd..","...pppppppppp...","...ppbppppbpp...","...ddppppppdd...","....pppppppp.dd.","....ppppppppddd.","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  minun: { palette: { p: '#fef08a', d: '#38bdf8', l: '#ffffff', b: '#0f172a' }, grid: [
    "..dd........dd..","..dddd....dddd..","...pppppppppp...","...ppbppppbpp...","...ddppppppdd...","....pppppppp.dd.","....ppppppppddd.","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  volbeat: { palette: { p: '#3b82f6', d: '#1e293b', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "....l......l....","....dddddddd....","...ddpbppbpdd...","..ssppppppppss..","..ssppddddppss..","...pppppppppp...","....llllllll....","....dd....dd....","................","................","................","................","................","................","................","................"
  ]},
  illumise: { palette: { p: '#a855f7', d: '#1e293b', l: '#facc15', s: '#f472b6', b: '#0f172a' }, grid: [
    "....s......s....","...ssddddddss...","...ddpbppbpdd...","..llppppppppll..","..llppddddppll..","...pppppppppp...","....dddddddd....","....dd....dd....","................","................","................","................","................","................","................","................"
  ]},
  gulpin: { palette: { p: '#4ade80', d: '#15803d', l: '#facc15', b: '#0f172a' }, grid: [
    ".......ll.......","......llll......","....pppppppp....","...pppppppppp...","..ppppbppbpppp..","..pppppppppppp..","..pppddddddppp..","..ddddppppdddd..","................","................","................","................","................","................","................","................"
  ]},
  swalot: { palette: { p: '#a855f7', d: '#581c87', l: '#facc15', b: '#0f172a' }, grid: [
    "....pppppppp....","...pppppppppp...","..ppppbppbpppp..",".llpppppppppp.ll","ll.ppddddddpp.ll","..pppppppppppp..","..ppddppddppdd..","..dddddddddddd..","................","................","................","................","................","................","................","................"
  ]},
  carvanha: { palette: { p: '#ef4444', d: '#1d4ed8', l: '#facc15', s: '#ffffff', b: '#0f172a' }, grid: [
    "......dddd......","....dddddddd....","...ddlbppbldd...","..dddddddddd.ll.","..ppssssssssppl.","...pppppppppp.ll","....pp....pp....","................","................","................","................","................","................","................","................","................"
  ]},
  sharpedo: { palette: { p: '#1d4ed8', d: '#1e3a8a', l: '#facc15', s: '#ffffff', b: '#0f172a' }, grid: [
    "......pppp......","....pppppppp....","..pppllpppplpp..",".ppppbppppbpppp.",".pppssssssssppp.","..pp.ssssss.pp..","......pppp......","................","................","................","................","................","................","................","................","................"
  ]},
  wailmer: { palette: { p: '#38bdf8', d: '#1d4ed8', l: '#fef3c7', b: '#0f172a' }, grid: [
    "....pppppppp....","..pppppppppppp..",".pppppppppppppp.","ppppppbppbpppppp","ppppllllllllpppp",".pppllllllllppp.","..llllllllllll..","................","................","................","................","................","................","................","................","................"
  ]},
  wailord: { palette: { p: '#2563eb', d: '#1e3a8a', l: '#f8fafc', b: '#0f172a' }, grid: [
    "................","..pppppppppppp..",".pppppppppppppp.","ppppppbppppppppp","pppppppppppppppp","llllllllllllllll",".llllllllllllll.","................","................","................","................","................","................","................","................","................"
  ]},
  numel: { palette: { p: '#facc15', d: '#16a34a', l: '#fef08a', b: '#0f172a' }, grid: [
    "................","......dddd......","...ppddddddpp...","..ppbppddppppp..","..pppppppppppp..","...pppppppppp...","...pp......pp...","................","................","................","................","................","................","................","................","................"
  ]},
  camerupt: { palette: { p: '#ea580c', d: '#78350f', l: '#38bdf8', b: '#0f172a' }, grid: [
    "...ddd....ddd...","..ddddd..ddddd..",".ppppdddddddppp.","pppbpplllppppppp","pppppppppppppppp",".pppppppppppppp.","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................","................","................"
  ]},
  torkoal: { palette: { p: '#ea580c', d: '#334155', l: '#fde047', b: '#0f172a' }, grid: [
    "......llll......","....dddddddd....","...ddlllllldd...","..ppddddddddpp..",".ppbpddddddpppp.","..pppddddddppp..","...pp......pp...","................","................","................","................","................","................","................","................","................"
  ]},
  spoink: { palette: { p: '#94a3b8', d: '#475569', l: '#f472b6', b: '#0f172a' }, grid: [
    "......llll......",".....llllll.....","....pppppppp....","...pppbppbppp...","...pppppppppp...","....dddddddd....","......dddd......",".....dddddd.....","......dddd......",".....dddddd.....","................","................","................","................","................","................"
  ]},
  grumpig: { palette: { p: '#a855f7', d: '#1e293b', l: '#f43f5e', b: '#0f172a' }, grid: [
    "...pp......pp...","...pp.llll.pp...","....pppppppp....","....ppbppbpp....","...pppppppppp...","..ddddllllldddd.","..dddddddddddd..","...pppppppppp.d.","....pp....pp.dd.","................","................","................","................","................","................","................"
  ]},
  spinda: { palette: { p: '#fef3c7', d: '#ef4444', l: '#f97316', b: '#0f172a' }, grid: [
    "..dd........dd..",".dppd......dppd.","..ppppddddpppp..","..ppddbppbddpp..","...pppppppppp...","....dddddddd....","...pppppppppp...","....dd....dd....","................","................","................","................","................","................","................","................"
  ]},
  trapinch: { palette: { p: '#f97316', d: '#c2410c', l: '#ffffff', b: '#0f172a' }, grid: [
    "....pppppppp....","..pppppppppppp..",".pppllpbbpllppp.",".pppllllllllppp.","..pppppppppppp..","....pppppppp....","...pp..pp..pp...","................","................","................","................","................","................","................","................","................"
  ]},
  vibrava: { palette: { p: '#fde047', d: '#22c55e', l: '#a3e635', b: '#0f172a' }, grid: [
    ".dddd......dddd.",".dddd.pppp.dddd.","..dd.ppbppb.dd..",".ddddppppppdddd.",".....pppppp.....",".....dddddd.....","......pppp......","................","................","................","................","................","................","................","................","................"
  ]},
  flygon: { palette: { p: '#22c55e', d: '#15803d', l: '#ef4444', s: '#a3e635', b: '#0f172a' }, grid: [
    "..dd........dd..","...dd.pppp.dd...",".ss..plbbpl..ss.","ssss.pppppp.ssss",".ss..pppppp..ss.","....pppppppp.dd.","....pp....pp.ll.","................","................","................","................","................","................","................","................","................"
  ]},
  cacnea: { palette: { p: '#16a34a', d: '#14532d', l: '#facc15', b: '#0f172a' }, grid: [
    "......llll......","....pppppppp....","..ddppppppppdd..",".ddpppbppbpppdd.","..ddppbbbbppdd..","...pppppppppp...","....dddddddd....","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  cacturne: { palette: { p: '#15803d', d: '#052e16', l: '#facc15', b: '#0f172a' }, grid: [
    "....dddddddd....","..dddddddddddd..","...pppbppbppp...","...pppbbbbppp...",".ppppdddddddppp.","pp..pppppppp..pp","....ppddddpp....","....pp....pp....","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  swablu: { palette: { p: '#38bdf8', d: '#0284c7', l: '#ffffff', b: '#0f172a' }, grid: [
    ".....p....p.....","....pppppppp....","....ppbppbpp....",".lllpppppppplll.","llllllppppllllll",".lllllpppplllll.","......d..d......","................","................","................","................","................","................","................","................","................"
  ]},
  altaria: { palette: { p: '#38bdf8', d: '#0284c7', l: '#ffffff', b: '#0f172a' }, grid: [
    "....pp....pp....",".....pppppp.....",".....ppbppbp....","..lll.ppppp.lll.","llllllllllllllll","llllllllllllllll",".llllllllllllll.",".....dd..dd.....","................","................","................","................","................","................","................","................"
  ]},
  zangoose: { palette: { p: '#f8fafc', d: '#dc2626', l: '#1e293b', b: '#0f172a' }, grid: [
    "..dd........pp..","..dpp......pppp.","...ppddpppppppp.","...ddpbppppbppp.","..ppppddddpppp..",".llppppddpppp.dd","...ppppppppppddd","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  seviper: { palette: { p: '#1e293b', d: '#7e22ce', l: '#facc15', s: '#dc2626', b: '#0f172a' }, grid: [
    "....llll........","...pppppp.......","..pppbppbp......","..ppsspppp......","....ppppllpp....","...pppllpppp.ss.","..pppppppppppss.","...llllllllll...","................","................","................","................","................","................","................","................"
  ]},
  lunatone: { palette: { p: '#fde68a', d: '#a16207', l: '#ef4444', b: '#0f172a' }, grid: [
    ".....pppppp.....","...pppppppppp...","..ppppddddpppp..","..pppplllppppp..","..pppblllbpp....","..pppplllppp....","...pppppppppp...",".....pppppp.....","................","................","................","................","................","................","................","................"
  ]},
  solrock: { palette: { p: '#f97316', d: '#b45309', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "..ll...ll...ll..","...pppppppppp...",".llppdddddddpll.","..pppsbppbsspp..",".llppdddddddpll.","...pppppppppp...","..ll...ll...ll..","................","................","................","................","................","................","................","................","................"
  ]},
  barboach: { palette: { p: '#94a3b8', d: '#1d4ed8', l: '#38bdf8', b: '#0f172a' }, grid: [
    "................","..ll..pppp......","...ppppddpppp.l.","..ppbppddpppppll","...ppppddpppp.l.","......pppp......","................","................","................","................","................","................","................","................","................","................"
  ]},
  whiscash: { palette: { p: '#1e3a8a', d: '#0f172a', l: '#facc15', b: '#0f172a' }, grid: [
    "....ll....ll....","..pppppppppppp..",".pppplllllppppp.",".pppbppppppbppp.","..pppppppppppp..","...dddddddddd...", "................","................","................","................","................","................","................","................","................","................"
  ]},
  corphish: { palette: { p: '#ef4444', d: '#991b1b', l: '#fef3c7', b: '#0f172a' }, grid: [
    "......p..p......","..pp..pppp..pp..",".ppppppbppbpppp.",".pp..pppppp..pp.",".....llllll.....","....pppppppp....","....dd....dd....","................","................","................","................","................","................","................","................","................"
  ]},
  crawdaunt: { palette: { p: '#dc2626', d: '#1e3a8a', l: '#facc15', b: '#0f172a' }, grid: [
    "......llll......","..pp.pppppp.pp..",".ppppppbppbpppp.",".ppp.dddddd.ppp.","....pppppppp....","...ppddddddpp...","...pp......pp...","................","................","................","................","................","................","................","................","................"
  ]},
  baltoy: { palette: { p: '#d97706', d: '#78350f', l: '#ef4444', b: '#0f172a' }, grid: [
    ".......pp.......",".....pppppp.....","....pplbblpp....","..ppppddddpppp..","....pppppppp....",".....dddddd.....","......pppp......",".......pp.......","................","................","................","................","................","................","................","................"
  ]},
  claydol: { palette: { p: '#1e293b', d: '#0f172a', l: '#f43f5e', s: '#fde68a', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pplllpp.....","...pppsbbsppp...","..ss.pppppp.ss..","..ssppppppppss..","...ppsssssspp...","....pppppppp....",".....pp..pp.....","................","................","................","................","................","................","................","................"
  ]},
  lileep: { palette: { p: '#a855f7', d: '#581c87', l: '#f472b6', s: '#facc15', b: '#0f172a' }, grid: [
    "..lll.llll.lll..","...llllllllll...","....dddddddd....","....dsbppbsd....",".....pppppp.....",".....pppppp.....","....dddddddd....","...pppppppppp...","................","................","................","................","................","................","................","................"
  ]},
  cradily: { palette: { p: '#22c55e', d: '#15803d', l: '#f472b6', s: '#facc15', b: '#0f172a' }, grid: [
    "..lll.llll.lll..","...llllllllll...","....dddddddd....","....dsbppbsd....",".....pppppp.....","....pppppppp....","...ppsssssspp...","..pppppppppppp..","................","................","................","................","................","................","................","................"
  ]},
  anorith: { palette: { p: '#64748b', d: '#15803d', l: '#ef4444', b: '#0f172a' }, grid: [
    "..ll........ll..","...pp.pppp.pp...","..ppppddddpppp..","...dddddddddd...", "....pppppppp....",".....dddddd.....","......pppp......","................","................","................","................","................","................","................","................","................"
  ]},
  armaldo: { palette: { p: '#3b82f6', d: '#1e293b', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "..ss........ss..","...pppppppppp...","..ppppbppbpppp..",".llpppddddpppll.","..ppppllllpppp..","...pppppppppp.s.","...ppp....ppp.ss","...ddd....ddd...","................","................","................","................","................","................","................","................"
  ]},
  feebas: { palette: { p: '#a16207', d: '#38bdf8', l: '#f472b6', b: '#0f172a' }, grid: [
    "......dddd......","....pppppppp....","...pppbpppppp.d.","..ppplllppppppdd","...pppppppppp.d.",".....dddddd.....","................","................","................","................","................","................","................","................","................","................"
  ]},
  milotic: { palette: { p: '#fef3c7', d: '#f43f5e', l: '#38bdf8', b: '#0f172a' }, grid: [
    "...ddd....ddd...","..ddppppppppdd..","...ddpbppbpdd...",".....pppppp.....","....pppppppp....","...pppppppppp...","..ppppddddpppp..","...pppllllppp...","....llllllll....","................","................","................","................","................","................","................"
  ]},
  castform: { palette: { p: '#cbd5e1', d: '#94a3b8', l: '#ffffff', b: '#0f172a' }, grid: [
    ".......pp.......",".....pppppp.....","....pppppppp....","...pplbppblpp...","...pppppppppp...","....dddddddd....","...dddddddddd...","....ddd..ddd....","................","................","................","................","................","................","................","................"
  ]},
  kecleon: { palette: { p: '#22c55e', d: '#15803d', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "...ss..ss..ss...","...pppppppppp...","...ppbppppbpp...","....pppppppp....","...llllllllll...","...pppppppppp.d.","....pppppppp.dd.","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  shuppet: { palette: { p: '#475569', d: '#1e293b', l: '#facc15', b: '#0f172a' }, grid: [
    ".......pp.......","......pppp......","....pppppppp....","...pppbllbppp...","...pppppppppp...","..ddddppppdddd..",".dddddddddddddd.","..d..d..d..d..d.","................","................","................","................","................","................","................","................"
  ]},
  banette: { palette: { p: '#334155', d: '#0f172a', l: '#facc15', s: '#f43f5e', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pppppppp....","...ppsbppbspl...","...pppllllppp...","..pppppppppppp..","..pp..pppp..pp..",".....pp..pp.....","....dd....dd....","................","................","................","................","................","................","................","................"
  ]},
  duskull: { palette: { p: '#334155', d: '#0f172a', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: [
    "....llllllll....","...llllllllll...","...llbbssbbll...","....llllllll....","...pppppppppp...","..ppppddddpppp..","..pp.p.dd.p.pp..","................","................","................","................","................","................","................","................","................"
  ]},
  dusclops: { palette: { p: '#64748b', d: '#334155', l: '#ef4444', s: '#e2e8f0', b: '#0f172a' }, grid: [
    "....pppppppp....","...pppddddppp...","...ppddlllddp...","..ppppddddpppp..",".ssppppppppppss.",".ssppddddddppss.","...pppppppppp...","...ddd....ddd...","................","................","................","................","................","................","................","................"
  ]},
  tropius: { palette: { p: '#a16207', d: '#16a34a', l: '#facc15', b: '#0f172a' }, grid: [
    "...dddd..dddd...","....ddppppdd....","....ppbppbp.....","....pplllpp.....","..ddddppppdddd..",".ddddddppdddddd.","...pppppppppp...","...pp..pp..pp...","................","................","................","................","................","................","................","................"
  ]},
  chimecho: { palette: { p: '#e0f2fe', d: '#38bdf8', l: '#f43f5e', s: '#facc15', b: '#0f172a' }, grid: [
    ".......ss.......",".....pppppp.....","....pppppppp....","....ppbppbpp....","....dddddddd....","......llll......","......llll......","......llll......",".......ll.......","................","................","................","................","................","................","................"
  ]},
  wynaut: { palette: { p: '#38bdf8', d: '#0284c7', l: '#f43f5e', b: '#0f172a' }, grid: [
    ".....pppppp.....","...pppppppppp...","..pppbppppbppp..","..ppppllllpppp..","...pppppppppp...","..pp.pppppp.pp..","....pppppppp.dd.",".....pp..pp.....","................","................","................","................","................","................","................","................"
  ]},
  snorunt: { palette: { p: '#facc15', d: '#0f172a', l: '#f97316', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".......pp.......",".....pplllp.....","....pplllppp....","...pppddddppp...","..pppdsbbspppp..","..pppddddddppp..",".ppppddddddpppp.",".....ss..ss.....","................","................","................","................","................","................","................","................"
  ]},
  glalie: { palette: { p: '#f8fafc', d: '#0f172a', l: '#38bdf8', b: '#0f172a' }, grid: [
    "..dd........dd..",".ddddppppppdddd.","..ppppddddpppp..",".ppddlbppblddpp.",".ppppddddddddpp.",".pp..pppppp..pp.","..pppppppppppp..","................","................","................","................","................","................","................","................","................"
  ]},
  spheal: { palette: { p: '#38bdf8', d: '#0284c7', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","....pppppppp....","..ppppddddpppp..",".ppppbppppbpppp.",".ppppllllllpppp.",".ppppllllllpppp.","..llllllllllll..","...ll......ll...","................","................","................","................","................","................","................","................"
  ]},
  sealeo: { palette: { p: '#38bdf8', d: '#0284c7', l: '#fef3c7', s: '#ffffff', b: '#0f172a' }, grid: [
    "....pppppppp....","...pppbppbppp...","..ssssssssssss..","..ppppllllpppp..",".pppppllllppppp.",".pp.ppllllpp.pp.","....pppppppp....","................","................","................","................","................","................","................","................","................"
  ]},
  walrein: { palette: { p: '#0284c7', d: '#f8fafc', l: '#fef3c7', b: '#0f172a' }, grid: [
    "...dddddddddd...","..dddddddddddd..","..ddppbppbppdd..","...ppddppddpp...","..pppddppddppp..",".pppppllllppppp.",".pppppllllppppp.","..ppp......ppp..","................","................","................","................","................","................","................","................"
  ]},
  clamperl: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#f472b6', s: '#ffffff', b: '#0f172a' }, grid: [
    "....pppppppp....","..ppppddddpppp..",".pppllllllllppp.",".pppllsbbsllppp.",".ppppllllllpppp.","..ppppddddpppp..","....pppppppp....","................","................","................","................","................","................","................","................","................"
  ]},
  huntail: { palette: { p: '#0284c7', d: '#f97316', l: '#fef08a', b: '#0f172a' }, grid: [
    "....dddd........","...pppppp.......","..pppbppbp......","..pppplllp......","....ppppddpp....","...pppddpppp.dd.","..pppppppppppdd.","....dddddddd....","................","................","................","................","................","................","................","................"
  ]},
  gorebyss: { palette: { p: '#f472b6', d: '#a855f7', l: '#fef08a', b: '#0f172a' }, grid: [
    "....ll..........","...pppppp.......","..pppbppppll....","...pppppp.......","....ppddpp......","...pppppppp..dd.","..ppppppppppppp.","....pppppppp....","................","................","................","................","................","................","................","................"
  ]},
  relicanth: { palette: { p: '#78350f', d: '#a8a29e', l: '#ef4444', b: '#0f172a' }, grid: [
    ".....dddddd.....","...ddddppppdd...","..ddddbppppppp.d",".dddddllppppppdd","..ddddppppppppd.","....pp....pp....","................","................","................","................","................","................","................","................","................","................"
  ]},
  luvdisc: { palette: { p: '#f472b6', d: '#db2777', l: '#fce7f3', b: '#0f172a' }, grid: [
    ".....pppppp.....","...pppppppppp...","..pppbpppppppp..","..ppllpppppp....","..pppppppppp....","...pppppppppp...",".....pppppp.....","................","................","................","................","................","................","................","................","................"
  ]},
  bagon: { palette: { p: '#3b82f6', d: '#cbd5e1', l: '#facc15', b: '#0f172a' }, grid: [
    "....dddddddd....","...dddddddddd...","...ddpbppbpdd...","....pppppppp....","...pppllllppp...", "...pppllllppp...","....pppppppp....","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  shelgon: { palette: { p: '#f8fafc', d: '#475569', l: '#ef4444', b: '#0f172a' }, grid: [
    "....pppppppp....","..ppppddddpppp..",".pppppppppppppp.",".pppddlbpblddpp.",".ppppddddddddpp.","..pppppppppppp..","...dd..dd..dd...","................","................","................","................","................","................","................","................","................"
  ]},
  salamence: { palette: { p: '#38bdf8', d: '#dc2626', l: '#f8fafc', b: '#0f172a' }, grid: [
    ".ddd........ddd.","ddddd.pppp.ddddd","dddddppbppbddddd",".ddd.pppppp.ddd.","....ppplllpp....","...pppplllppp...","...pppppppppp.pp","...pp......pp...","................","................","................","................","................","................","................","................"
  ]},
  beldum: { palette: { p: '#3b82f6', d: '#cbd5e1', l: '#ef4444', b: '#0f172a' }, grid: [
    ".........dddd...",".......pppppp...",".....pppppppp...","....ppppppppp...","...ppbllppppp...","...ddbllppppp...","....ddddppppp...","................","................","................","................","................","................","................","................","................"
  ]},
  metang: { palette: { p: '#3b82f6', d: '#cbd5e1', l: '#ef4444', b: '#0f172a' }, grid: [
    "................","..dd..pppp..dd..",".dddppppppppddd.",".ppddllbpblddpp.",".pp..pppppp..pp.","..dd........dd..","................","................","................","................","................","................","................","................","................","................"
  ]},
  metagross: { palette: { p: '#2563eb', d: '#cbd5e1', l: '#ef4444', b: '#0f172a' }, grid: [
    "....pppppppp....","..ppppddddpppp..",".ppddllbpblddpp.","ppppddddddddpppp","ppp..pppppp..ppp","ppp..pp..pp..ppp","ddd..........ddd","................","................","................","................","................","................","................","................","................"
  ]},
  regirock: { palette: { p: '#b45309', d: '#78350f', l: '#f97316', b: '#0f172a' }, grid: [
    "...dddddddddd...","..ddppppppppdd..",".ddpppllplppdd.","ddppppplllppppdd","ddppppplllppppdd",".ddppppppppppdd.","..ddddppppdddd..","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  regice: { palette: { p: '#7dd3fc', d: '#0284c7', l: '#fde047', b: '#0f172a' }, grid: [
    "......pppp......","....pppppppp....","..ppppddddpppp..",".pppllllllllppp.","ppppddddddddpppp","..ppppddddpppp..","....pppppppp....",".....pp..pp.....","................","................","................","................","................","................","................","................"
  ]},
  registeel: { palette: { p: '#94a3b8', d: '#1e293b', l: '#ef4444', b: '#0f172a' }, grid: [
    "....dddddddd....","..ddppppppppdd..",".ddpppllllpppdd.","ddppppllllppppdd","ddppppppppppppdd",".dddddddddddd..","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................","................","................"
  ]},
  latias: { palette: { p: '#ef4444', d: '#f8fafc', l: '#facc15', b: '#0f172a' }, grid: [
    "...pp......pp...","....dddddddd....","...ddpbppbpdd...",".ppppdddddddppp.","pppppppppppppppp",".pp..pppppp..pp.",".....pppppp.....","................","................","................","................","................","................","................","................","................"
  ]},
  latios: { palette: { p: '#2563eb', d: '#f8fafc', l: '#ef4444', b: '#0f172a' }, grid: [
    "...pp......pp...","....dddddddd....","...ddpbppbpdd...",".ppppdddddddppp.","pppppppppppppppp",".pp..pppppp..pp.",".....pppppp.....","................","................","................","................","................","................","................","................","................"
  ]},
  jirachi: { palette: { p: '#f8fafc', d: '#facc15', l: '#38bdf8', b: '#0f172a' }, grid: [
    "......dddd......","...dddddddddd...","..ddddppppdddd..","...ddpbppbpdd...","..ll..pppp..ll..",".ll..pppppp..ll.",".....ppllpp.....",".....pp..pp.....","................","................","................","................","................","................","................","................"
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