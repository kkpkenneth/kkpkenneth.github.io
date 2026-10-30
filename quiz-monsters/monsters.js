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
  { id: 'caterpie',   pokedexNo: 10,  name: 'CATERPIE',   type: 'BUG',      baseHp: 120, level: 10 },
  { id: 'metapod',    pokedexNo: 11,  name: 'METAPOD',    type: 'BUG',      baseHp: 135, level: 10 },
  { id: 'butterfree', pokedexNo: 12,  name: 'BUTTERFREE', type: 'BUG',      baseHp: 150, level: 14 },
  { id: 'weedle',     pokedexNo: 13,  name: 'WEEDLE',     type: 'POISON',   baseHp: 118, level: 10 },
  { id: 'kakuna',     pokedexNo: 14,  name: 'KAKUNA',     type: 'POISON',   baseHp: 132, level: 10 },
  { id: 'beedrill',   pokedexNo: 15,  name: 'BEEDRILL',   type: 'BUG',      baseHp: 155, level: 15 },
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
  { id: 'greninja',   pokedexNo: 658, name: 'GRENINJA',   type: 'DARK',     baseHp: 190, level: 22 }
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
    ".bbbb......bbbb.",
    "bppppb.bb.bppppb",
    "bpppb..dd..bpppb",
    "bppb..dddd..bppb",
    "bpppb.dsddsbpppb",
    ".bppppddddddpppb",
    "..bbbbddddddbbb.",
    ".bpppddddddpppb.",
    "bpppb.dddd.bpppb",
    ".bbb..ll.ll.bbb.",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
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
  greninja: { palette: { p: '#1e3a8a', d: '#f472b6', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: ["...pp..pp..pp...","..pppppppppppp..","..ppsbppbsbpp...","..dddddddddddd..",".dd.pppppppp.dd.",".d..ppllllpp..d.","....pppppppp....","...pp......pp...","..sss......sss..","................","................","................","................","................","................","................"]}
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