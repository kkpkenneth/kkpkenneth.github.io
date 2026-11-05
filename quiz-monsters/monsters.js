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
  // --- GEN 1 KANTO ---
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

  // --- GEN 2 JOHTO ---
  { id: 'chikorita',  pokedexNo: 152, name: 'CHIKORITA',  type: 'GRASS',    baseHp: 135, level: 12 },
  { id: 'bayleef',    pokedexNo: 153, name: 'BAYLEEF',    type: 'GRASS',    baseHp: 160, level: 16 },
  { id: 'meganium',   pokedexNo: 154, name: 'MEGANIUM',   type: 'GRASS',    baseHp: 190, level: 22 },
  { id: 'cyndaquil',  pokedexNo: 155, name: 'CYNDAQUIL',  type: 'FIRE',     baseHp: 130, level: 12 },
  { id: 'quilava',    pokedexNo: 156, name: 'QUILAVA',    type: 'FIRE',     baseHp: 160, level: 16 },
  { id: 'typhlosion', pokedexNo: 157, name: 'TYPHLOSION', type: 'FIRE',     baseHp: 190, level: 22 },
  { id: 'totodile',   pokedexNo: 158, name: 'TOTODILE',   type: 'WATER',    baseHp: 140, level: 12 },
  { id: 'croconaw',   pokedexNo: 159, name: 'CROCONAW',   type: 'WATER',    baseHp: 165, level: 16 },
  { id: 'feraligatr', pokedexNo: 160, name: 'FERALIGATR', type: 'WATER',    baseHp: 195, level: 22 },
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
  { id: 'umbreon',    pokedexNo: 197, name: 'UMBREON',    type: 'DARK',     baseHp: 185, level: 20 },
  { id: 'murkrow',    pokedexNo: 198, name: 'MURKROW',    type: 'DARK',     baseHp: 145, level: 16 },
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
  { id: 'houndoom',   pokedexNo: 229, name: 'HOUNDOOM',   type: 'DARK',     baseHp: 185, level: 21 },
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
  { id: 'raikou',     pokedexNo: 243, name: 'RAIKOU',    type: 'ELECTRIC', baseHp: 245, level: 40 },
  { id: 'entei',      pokedexNo: 244, name: 'ENTEI',     type: 'FIRE',     baseHp: 250, level: 40 },
  { id: 'suicune',    pokedexNo: 245, name: 'SUICUNE',   type: 'WATER',    baseHp: 245, level: 40 },
  { id: 'larvitar',   pokedexNo: 246, name: 'LARVITAR',   type: 'ROCK',     baseHp: 140, level: 14 },
  { id: 'pupitar',    pokedexNo: 247, name: 'PUPITAR',    type: 'ROCK',     baseHp: 170, level: 20 },
  { id: 'tyranitar',  pokedexNo: 248, name: 'TYRANITAR',  type: 'DARK',     baseHp: 220, level: 28 },
  { id: 'lugia',      pokedexNo: 249, name: 'LUGIA',     type: 'PSYCHIC',  baseHp: 365, level: 50 },
  { id: 'ho_oh',      pokedexNo: 250, name: 'HO-OH',     type: 'FIRE',     baseHp: 365, level: 50 },
  { id: 'celebi',     pokedexNo: 251, name: 'CELEBI',     type: 'PSYCHIC',  baseHp: 250, level: 30 },


  // --- GEN 3 HOENN ---
  { id: 'treecko',    pokedexNo: 252, name: 'TREECKO',    type: 'GRASS',    baseHp: 130, level: 12 },
  { id: 'grovyle',    pokedexNo: 253, name: 'GROVYLE',    type: 'GRASS',    baseHp: 160, level: 16 },
  { id: 'sceptile',   pokedexNo: 254, name: 'SCEPTILE',   type: 'GRASS',    baseHp: 190, level: 22 },
  { id: 'torchic',    pokedexNo: 255, name: 'TORCHIC',    type: 'FIRE',     baseHp: 135, level: 12 },
  { id: 'combusken',  pokedexNo: 256, name: 'COMBUSKEN',  type: 'FIGHTING', baseHp: 165, level: 16 },
  { id: 'blaziken',   pokedexNo: 257, name: 'BLAZIKEN',   type: 'FIRE',     baseHp: 195, level: 22 },
  { id: 'mudkip',     pokedexNo: 258, name: 'MUDKIP',     type: 'WATER',    baseHp: 140, level: 12 },
  { id: 'marshtomp',  pokedexNo: 259, name: 'MARSHTOMP',  type: 'GROUND',   baseHp: 170, level: 16 },
  { id: 'swampert',   pokedexNo: 260, name: 'SWAMPERT',   type: 'WATER',    baseHp: 200, level: 22 },
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
  { id: 'roselia',    pokedexNo: 315, name: 'ROSELIA',    type: 'GRASS',    baseHp: 160, level: 18 },
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
  { id: 'duskull',    pokedexNo: 355, name: 'DUSKULL',    type: 'GHOST',    baseHp: 125, level: 13 },
  { id: 'dusclops',   pokedexNo: 356, name: 'DUSCLOPS',   type: 'GHOST',    baseHp: 180, level: 21 },
  { id: 'tropius',    pokedexNo: 357, name: 'TROPIUS',    type: 'GRASS',    baseHp: 190, level: 21 },
  { id: 'chimecho',   pokedexNo: 358, name: 'CHIMECHO',   type: 'PSYCHIC',  baseHp: 160, level: 18 },
  { id: 'absol',      pokedexNo: 359, name: 'ABSOL',      type: 'DARK',     baseHp: 180, level: 21 },
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
  { id: 'kyogre',     pokedexNo: 382, name: 'KYOGRE',    type: 'WATER',    baseHp: 360, level: 50 },
  { id: 'groudon',    pokedexNo: 383, name: 'GROUDON',   type: 'GROUND',   baseHp: 360, level: 50 },
  { id: 'rayquaza',   pokedexNo: 384, name: 'RAYQUAZA',  type: 'DRAGON',   baseHp: 370, level: 60 },
  { id: 'jirachi',    pokedexNo: 385, name: 'JIRACHI',    type: 'STEEL',    baseHp: 250, level: 40 },
  { id: 'deoxys',     pokedexNo: 386, name: 'DEOXYS',     type: 'PSYCHIC',  baseHp: 255, level: 25 },

  // --- GEN 4 SINNOH ---
  { id: 'turtwig',    pokedexNo: 387, name: 'TURTWIG',    type: 'GRASS',    baseHp: 145, level: 12 },
  { id: 'grotle',     pokedexNo: 388, name: 'GROTLE',     type: 'GRASS',    baseHp: 170, level: 16 },
  { id: 'torterra',   pokedexNo: 389, name: 'TORTERRA',   type: 'GROUND',   baseHp: 200, level: 22 },
  { id: 'chimchar',   pokedexNo: 390, name: 'CHIMCHAR',   type: 'FIRE',     baseHp: 130, level: 12 },
  { id: 'monferno',   pokedexNo: 391, name: 'MONFERNO',   type: 'FIGHTING', baseHp: 160, level: 16 },
  { id: 'infernape',  pokedexNo: 392, name: 'INFERNAPE',  type: 'FIRE',     baseHp: 190, level: 22 },
  { id: 'piplup',     pokedexNo: 393, name: 'PIPLUP',     type: 'WATER',    baseHp: 140, level: 12 },
  { id: 'prinplup',   pokedexNo: 394, name: 'PRINPLUP',   type: 'WATER',    baseHp: 165, level: 16 },
  { id: 'empoleon',   pokedexNo: 395, name: 'EMPOLEON',   type: 'STEEL',    baseHp: 195, level: 22 },
  { id: 'starly',     pokedexNo: 396, name: 'STARLY',     type: 'FLYING',   baseHp: 120, level: 10 },
  { id: 'staravia',   pokedexNo: 397, name: 'STARAVIA',   type: 'FLYING',   baseHp: 155, level: 16 },
  { id: 'staraptor',  pokedexNo: 398, name: 'STARAPTOR',  type: 'FLYING',   baseHp: 195, level: 24 },
  { id: 'bidoof',     pokedexNo: 399, name: 'BIDOOF',     type: 'NORMAL',   baseHp: 125, level: 10 },
  { id: 'bibarel',    pokedexNo: 400, name: 'BIBAREL',    type: 'WATER',    baseHp: 175, level: 18 },
  { id: 'kricketot',  pokedexNo: 401, name: 'KRICKETOT',  type: 'BUG',      baseHp: 115, level: 9 },
  { id: 'kricketune', pokedexNo: 402, name: 'KRICKETUNE', type: 'BUG',      baseHp: 165, level: 17 },
  { id: 'shinx',      pokedexNo: 403, name: 'SHINX',      type: 'ELECTRIC', baseHp: 125, level: 11 },
  { id: 'luxio',      pokedexNo: 404, name: 'LUXIO',      type: 'ELECTRIC', baseHp: 160, level: 17 },
  { id: 'luxray',     pokedexNo: 405, name: 'LUXRAY',     type: 'ELECTRIC', baseHp: 200, level: 25 },
  { id: 'budew',      pokedexNo: 406, name: 'BUDEW',      type: 'GRASS',    baseHp: 125, level: 10 },
  { id: 'roserade',   pokedexNo: 407, name: 'ROSERADE',   type: 'GRASS',    baseHp: 190, level: 23 },
  { id: 'cranidos',   pokedexNo: 408, name: 'CRANIDOS',   type: 'ROCK',     baseHp: 145, level: 15 },
  { id: 'rampardos',  pokedexNo: 409, name: 'RAMPARDOS',  type: 'ROCK',     baseHp: 205, level: 25 },
  { id: 'shieldon',   pokedexNo: 410, name: 'SHIELDON',   type: 'STEEL',    baseHp: 145, level: 15 },
  { id: 'bastiodon',  pokedexNo: 411, name: 'BASTIODON',  type: 'STEEL',    baseHp: 205, level: 25 },
  { id: 'burmy',      pokedexNo: 412, name: 'BURMY',      type: 'BUG',      baseHp: 120, level: 10 },
  { id: 'wormadam',   pokedexNo: 413, name: 'WORMADAM',   type: 'BUG',      baseHp: 165, level: 19 },
  { id: 'mothim',     pokedexNo: 414, name: 'MOTHIM',     type: 'FLYING',   baseHp: 165, level: 19 },
  { id: 'combee',     pokedexNo: 415, name: 'COMBEE',     type: 'BUG',      baseHp: 120, level: 10 },
  { id: 'vespiquen',  pokedexNo: 416, name: 'VESPIQUEN',  type: 'BUG',      baseHp: 185, level: 22 },
  { id: 'pachirisu',  pokedexNo: 417, name: 'PACHIRISU',  type: 'ELECTRIC', baseHp: 145, level: 15 },
  { id: 'buizel',     pokedexNo: 418, name: 'BUIZEL',     type: 'WATER',    baseHp: 135, level: 13 },
  { id: 'floatzel',   pokedexNo: 419, name: 'FLOATZEL',   type: 'WATER',    baseHp: 185, level: 21 },
  { id: 'cherubi',    pokedexNo: 420, name: 'CHERUBI',    type: 'GRASS',    baseHp: 120, level: 11 },
  { id: 'cherrim',    pokedexNo: 421, name: 'CHERRIM',    type: 'GRASS',    baseHp: 165, level: 19 },
  { id: 'shellos',    pokedexNo: 422, name: 'SHELLOS',    type: 'WATER',    baseHp: 140, level: 13 },
  { id: 'gastrodon',  pokedexNo: 423, name: 'GASTRODON',  type: 'GROUND',   baseHp: 195, level: 22 },
  { id: 'ambipom',    pokedexNo: 424, name: 'AMBIPOM',    type: 'NORMAL',   baseHp: 180, level: 21 },
  { id: 'drifloon',   pokedexNo: 425, name: 'DRIFLOON',   type: 'GHOST',    baseHp: 145, level: 13 },
  { id: 'drifblim',   pokedexNo: 426, name: 'DRIFBLIM',   type: 'GHOST',    baseHp: 210, level: 22 },
  { id: 'buneary',    pokedexNo: 427, name: 'BUNEARY',    type: 'NORMAL',   baseHp: 130, level: 12 },
  { id: 'lopunny',    pokedexNo: 428, name: 'LOPUNNY',    type: 'NORMAL',   baseHp: 180, level: 21 },
  { id: 'mismagius',  pokedexNo: 429, name: 'MISMAGIUS',  type: 'GHOST',    baseHp: 185, level: 23 },
  { id: 'honchkrow',  pokedexNo: 430, name: 'HONCHKROW',  type: 'DARK',     baseHp: 195, level: 23 },
  { id: 'glameow',    pokedexNo: 431, name: 'GLAMEOW',    type: 'NORMAL',   baseHp: 125, level: 12 },
  { id: 'purugly',    pokedexNo: 432, name: 'PURUGLY',    type: 'NORMAL',   baseHp: 180, level: 21 },
  { id: 'chingling',  pokedexNo: 433, name: 'CHINGLING',  type: 'PSYCHIC',  baseHp: 120, level: 10 },
  { id: 'stunky',     pokedexNo: 434, name: 'STUNKY',     type: 'POISON',   baseHp: 135, level: 13 },
  { id: 'skuntank',   pokedexNo: 435, name: 'SKUNTANK',   type: 'DARK',     baseHp: 190, level: 22 },
  { id: 'bronzor',    pokedexNo: 436, name: 'BRONZOR',    type: 'STEEL',    baseHp: 135, level: 13 },
  { id: 'bronzong',   pokedexNo: 437, name: 'BRONZONG',   type: 'STEEL',    baseHp: 190, level: 23 },
  { id: 'bonsly',     pokedexNo: 438, name: 'BONSLY',     type: 'ROCK',     baseHp: 125, level: 11 },
  { id: 'mime_jr',    pokedexNo: 439, name: 'MIME JR.',   type: 'PSYCHIC',  baseHp: 120, level: 11 },
  { id: 'happiny',    pokedexNo: 440, name: 'HAPPINY',    type: 'NORMAL',   baseHp: 140, level: 10 },
  { id: 'chatot',     pokedexNo: 441, name: 'CHATOT',     type: 'FLYING',   baseHp: 150, level: 16 },
  { id: 'spiritomb',  pokedexNo: 442, name: 'SPIRITOMB',  type: 'GHOST',    baseHp: 185, level: 22 },
  { id: 'gible',      pokedexNo: 443, name: 'GIBLE',      type: 'DRAGON',   baseHp: 135, level: 14 },
  { id: 'gabite',     pokedexNo: 444, name: 'GABITE',     type: 'DRAGON',   baseHp: 170, level: 20 },
  { id: 'garchomp',   pokedexNo: 445, name: 'GARCHOMP',   type: 'DRAGON',   baseHp: 225, level: 28 },
  { id: 'munchlax',   pokedexNo: 446, name: 'MUNCHLAX',   type: 'NORMAL',   baseHp: 165, level: 12 },
  { id: 'riolu',      pokedexNo: 447, name: 'RIOLU',      type: 'FIGHTING', baseHp: 130, level: 12 },
  { id: 'lucario',    pokedexNo: 448, name: 'LUCARIO',    type: 'FIGHTING', baseHp: 185, level: 20 },
  { id: 'hippopotas', pokedexNo: 449, name: 'HIPPOPOTAS', type: 'GROUND',   baseHp: 145, level: 14 },
  { id: 'hippowdon',  pokedexNo: 450, name: 'HIPPOWDON',  type: 'GROUND',   baseHp: 205, level: 24 },
  { id: 'skorupi',    pokedexNo: 451, name: 'SKORUPI',    type: 'POISON',   baseHp: 130, level: 13 },
  { id: 'drapion',    pokedexNo: 452, name: 'DRAPION',    type: 'DARK',     baseHp: 190, level: 23 },
  { id: 'croagunk',   pokedexNo: 453, name: 'CROAGUNK',   type: 'POISON',   baseHp: 130, level: 13 },
  { id: 'toxicroak',  pokedexNo: 454, name: 'TOXICROAK',  type: 'FIGHTING', baseHp: 185, level: 22 },
  { id: 'carnivine',  pokedexNo: 455, name: 'CARNIVINE',  type: 'GRASS',    baseHp: 165, level: 18 },
  { id: 'finneon',    pokedexNo: 456, name: 'FINNEON',    type: 'WATER',    baseHp: 125, level: 12 },
  { id: 'lumineon',   pokedexNo: 457, name: 'LUMINEON',   type: 'WATER',    baseHp: 175, level: 21 },
  { id: 'mantyke',    pokedexNo: 458, name: 'MANTYKE',    type: 'WATER',    baseHp: 130, level: 11 },
  { id: 'snover',     pokedexNo: 459, name: 'SNOVER',     type: 'ICE',      baseHp: 140, level: 14 },
  { id: 'abomasnow',  pokedexNo: 460, name: 'ABOMASNOW',  type: 'ICE',      baseHp: 195, level: 23 },
  { id: 'weavile',    pokedexNo: 461, name: 'WEAVILE',    type: 'ICE',      baseHp: 185, level: 24 },
  { id: 'magnezone',  pokedexNo: 462, name: 'MAGNEZONE',  type: 'STEEL',    baseHp: 200, level: 25 },
  { id: 'lickilicky', pokedexNo: 463, name: 'LICKILICKY', type: 'NORMAL',   baseHp: 205, level: 24 },
  { id: 'rhyperior',  pokedexNo: 464, name: 'RHYPERIOR',  type: 'ROCK',     baseHp: 225, level: 27 },
  { id: 'tangrowth',  pokedexNo: 465, name: 'TANGROWTH',  type: 'GRASS',    baseHp: 205, level: 24 },
  { id: 'electivire', pokedexNo: 466, name: 'ELECTIVIRE', type: 'ELECTRIC', baseHp: 200, level: 25 },
  { id: 'magmortar',  pokedexNo: 467, name: 'MAGMORTAR',  type: 'FIRE',     baseHp: 200, level: 25 },
  { id: 'togekiss',   pokedexNo: 468, name: 'TOGEKISS',   type: 'FAIRY',    baseHp: 200, level: 25 },
  { id: 'yanmega',    pokedexNo: 469, name: 'YANMEGA',    type: 'BUG',      baseHp: 195, level: 24 },
  { id: 'leafeon',    pokedexNo: 470, name: 'LEAFEON',    type: 'GRASS',    baseHp: 185, level: 22 },
  { id: 'glaceon',    pokedexNo: 471, name: 'GLACEON',    type: 'ICE',      baseHp: 185, level: 22 },
  { id: 'gliscor',    pokedexNo: 472, name: 'GLISCOR',    type: 'GROUND',   baseHp: 195, level: 24 },
  { id: 'mamoswine',  pokedexNo: 473, name: 'MAMOSWINE',  type: 'ICE',      baseHp: 215, level: 26 },
  { id: 'porygon_z',  pokedexNo: 474, name: 'PORYGON-Z',  type: 'NORMAL',   baseHp: 195, level: 25 },
  { id: 'gallade',    pokedexNo: 475, name: 'GALLADE',    type: 'FIGHTING', baseHp: 195, level: 25 },
  { id: 'probopass',  pokedexNo: 476, name: 'PROBOPASS',  type: 'STEEL',    baseHp: 195, level: 24 },
  { id: 'dusknoir',   pokedexNo: 477, name: 'DUSKNOIR',   type: 'GHOST',    baseHp: 200, level: 25 },
  { id: 'froslass',   pokedexNo: 478, name: 'FROSLASS',   type: 'ICE',      baseHp: 185, level: 23 },
  { id: 'rotom',      pokedexNo: 479, name: 'ROTOM',      type: 'ELECTRIC', baseHp: 160, level: 18 },
  { id: 'uxie',       pokedexNo: 480, name: 'UXIE',       type: 'PSYCHIC',  baseHp: 240, level: 40 },
  { id: 'mesprit',    pokedexNo: 481, name: 'MESPRIT',    type: 'PSYCHIC',  baseHp: 240, level: 40 },
  { id: 'azelf',      pokedexNo: 482, name: 'AZELF',      type: 'PSYCHIC',  baseHp: 240, level: 40 },
  { id: 'dialga',     pokedexNo: 483, name: 'DIALGA',     type: 'DRAGON',   baseHp: 365, level: 50 },
  { id: 'palkia',     pokedexNo: 484, name: 'PALKIA',     type: 'DRAGON',   baseHp: 365, level: 50 },
  { id: 'heatran',    pokedexNo: 485, name: 'HEATRAN',    type: 'FIRE',     baseHp: 260, level: 45 },
  { id: 'regigigas',  pokedexNo: 486, name: 'REGIGIGAS',  type: 'NORMAL',   baseHp: 280, level: 50 },
  { id: 'giratina',   pokedexNo: 487, name: 'GIRATINA',   type: 'GHOST',    baseHp: 370, level: 50 },
  { id: 'cresselia',  pokedexNo: 488, name: 'CRESSELIA',  type: 'PSYCHIC',  baseHp: 255, level: 45 },
  { id: 'phione',     pokedexNo: 489, name: 'PHIONE',     type: 'WATER',    baseHp: 180, level: 25 },
  { id: 'manaphy',    pokedexNo: 490, name: 'MANAPHY',    type: 'WATER',    baseHp: 245, level: 40 },
  { id: 'darkrai',    pokedexNo: 491, name: 'DARKRAI',    type: 'DARK',     baseHp: 255, level: 45 },
  { id: 'shaymin',    pokedexNo: 492, name: 'SHAYMIN',    type: 'GRASS',    baseHp: 245, level: 40 },
  { id: 'arceus',     pokedexNo: 493, name: 'ARCEUS',     type: 'NORMAL',   baseHp: 390, level: 65 },

  // --- GEN 5 UNOVA ---
  { id: 'victini',    pokedexNo: 494, name: 'VICTINI',    type: 'PSYCHIC',  baseHp: 245, level: 40 },
  { id: 'snivy',      pokedexNo: 495, name: 'SNIVY',      type: 'GRASS',    baseHp: 135, level: 12 },
  { id: 'servine',    pokedexNo: 496, name: 'SERVINE',    type: 'GRASS',    baseHp: 160, level: 16 },
  { id: 'serperior',  pokedexNo: 497, name: 'SERPERIOR',  type: 'GRASS',    baseHp: 190, level: 22 },
  { id: 'tepig',      pokedexNo: 498, name: 'TEPIG',      type: 'FIRE',     baseHp: 145, level: 12 },
  { id: 'pignite',    pokedexNo: 499, name: 'PIGNITE',    type: 'FIGHTING', baseHp: 175, level: 16 },
  { id: 'emboar',     pokedexNo: 500, name: 'EMBOAR',     type: 'FIRE',     baseHp: 205, level: 22 },
  { id: 'oshawott',   pokedexNo: 501, name: 'OSHAWOTT',   type: 'WATER',    baseHp: 140, level: 12 },
  { id: 'dewott',     pokedexNo: 502, name: 'DEWOTT',     type: 'WATER',    baseHp: 165, level: 16 },
  { id: 'samurott',   pokedexNo: 503, name: 'SAMUROTT',   type: 'WATER',    baseHp: 195, level: 22 },
  { id: 'patrat',     pokedexNo: 504, name: 'PATRAT',     type: 'NORMAL',   baseHp: 120, level: 10 },
  { id: 'watchog',    pokedexNo: 505, name: 'WATCHOG',    type: 'NORMAL',   baseHp: 165, level: 18 },
  { id: 'lillipup',   pokedexNo: 506, name: 'LILLIPUP',   type: 'NORMAL',   baseHp: 125, level: 11 },
  { id: 'herdier',    pokedexNo: 507, name: 'HERDIER',    type: 'NORMAL',   baseHp: 155, level: 16 },
  { id: 'stoutland',  pokedexNo: 508, name: 'STOUTLAND',  type: 'NORMAL',   baseHp: 195, level: 23 },
  { id: 'purrloin',   pokedexNo: 509, name: 'PURRLOIN',   type: 'DARK',     baseHp: 120, level: 11 },
  { id: 'liepard',    pokedexNo: 510, name: 'LIEPARD',    type: 'DARK',     baseHp: 170, level: 19 },
  { id: 'pansage',    pokedexNo: 511, name: 'PANSAGE',    type: 'GRASS',    baseHp: 130, level: 12 },
  { id: 'simisage',   pokedexNo: 512, name: 'SIMISAGE',   type: 'GRASS',    baseHp: 180, level: 21 },
  { id: 'pansear',    pokedexNo: 513, name: 'PANSEAR',    type: 'FIRE',     baseHp: 130, level: 12 },
  { id: 'simisear',   pokedexNo: 514, name: 'SIMISEAR',   type: 'FIRE',     baseHp: 180, level: 21 },
  { id: 'panpour',    pokedexNo: 515, name: 'PANPOUR',    type: 'WATER',    baseHp: 130, level: 12 },
  { id: 'simipour',   pokedexNo: 516, name: 'SIMIPOUR',   type: 'WATER',    baseHp: 180, level: 21 },
  { id: 'munna',      pokedexNo: 517, name: 'MUNNA',      type: 'PSYCHIC',  baseHp: 140, level: 13 },
  { id: 'musharna',   pokedexNo: 518, name: 'MUSHARNA',   type: 'PSYCHIC',  baseHp: 205, level: 23 },
  { id: 'pidove',     pokedexNo: 519, name: 'PIDOVE',     type: 'FLYING',   baseHp: 120, level: 10 },
  { id: 'tranquill',  pokedexNo: 520, name: 'TRANQUILL',  type: 'FLYING',   baseHp: 155, level: 16 },
  { id: 'unfezant',   pokedexNo: 521, name: 'UNFEZANT',   type: 'FLYING',   baseHp: 190, level: 23 },
  { id: 'blitzle',    pokedexNo: 522, name: 'BLITZLE',    type: 'ELECTRIC', baseHp: 130, level: 13 },
  { id: 'zebstrika',  pokedexNo: 523, name: 'ZEBSTRIKA',  type: 'ELECTRIC', baseHp: 185, level: 22 },
  { id: 'roggenrola', pokedexNo: 524, name: 'ROGGENROLA', type: 'ROCK',     baseHp: 135, level: 12 },
  { id: 'boldore',    pokedexNo: 525, name: 'BOLDORE',    type: 'ROCK',     baseHp: 170, level: 18 },
  { id: 'gigalith',   pokedexNo: 526, name: 'GIGALITH',   type: 'ROCK',     baseHp: 210, level: 25 },
  { id: 'woobat',     pokedexNo: 527, name: 'WOOBAT',     type: 'PSYCHIC',  baseHp: 130, level: 12 },
  { id: 'swoobat',    pokedexNo: 528, name: 'SWOOBAT',    type: 'PSYCHIC',  baseHp: 175, level: 20 },
  { id: 'drilbur',    pokedexNo: 529, name: 'DRILBUR',    type: 'GROUND',   baseHp: 140, level: 13 },
  { id: 'excadrill',  pokedexNo: 530, name: 'EXCADRILL',  type: 'STEEL',    baseHp: 215, level: 24 },
  { id: 'audino',     pokedexNo: 531, name: 'AUDINO',     type: 'NORMAL',   baseHp: 205, level: 19 },
  { id: 'timburr',    pokedexNo: 532, name: 'TIMBURR',    type: 'FIGHTING', baseHp: 145, level: 13 },
  { id: 'gurdurr',    pokedexNo: 533, name: 'GURDURR',    type: 'FIGHTING', baseHp: 175, level: 19 },
  { id: 'conkeldurr', pokedexNo: 534, name: 'CONKELDURR', type: 'FIGHTING', baseHp: 215, level: 25 },
  { id: 'tympole',    pokedexNo: 535, name: 'TYMPOLE',    type: 'WATER',    baseHp: 125, level: 11 },
  { id: 'palpitoad',  pokedexNo: 536, name: 'PALPITOAD',  type: 'GROUND',   baseHp: 165, level: 17 },
  { id: 'seismitoad', pokedexNo: 537, name: 'SEISMITOAD', type: 'WATER',    baseHp: 205, level: 24 },
  { id: 'throh',      pokedexNo: 538, name: 'THROH',      type: 'FIGHTING', baseHp: 210, level: 21 },
  { id: 'sawk',       pokedexNo: 539, name: 'SAWK',       type: 'FIGHTING', baseHp: 185, level: 21 },
  { id: 'sewaddle',   pokedexNo: 540, name: 'SEWADDLE',   type: 'BUG',      baseHp: 120, level: 10 },
  { id: 'swadloon',   pokedexNo: 541, name: 'SWADLOON',   type: 'GRASS',    baseHp: 155, level: 16 },
  { id: 'leavanny',   pokedexNo: 542, name: 'LEAVANNY',   type: 'BUG',      baseHp: 190, level: 23 },
  { id: 'venipede',   pokedexNo: 543, name: 'VENIPEDE',   type: 'POISON',   baseHp: 125, level: 11 },
  { id: 'whirlipede', pokedexNo: 544, name: 'WHIRLIPEDE', type: 'POISON',   baseHp: 160, level: 17 },
  { id: 'scolipede',  pokedexNo: 545, name: 'SCOLIPEDE',  type: 'POISON',   baseHp: 195, level: 24 },
  { id: 'cottonee',   pokedexNo: 546, name: 'COTTONEE',   type: 'FAIRY',    baseHp: 125, level: 12 },
  { id: 'whimsicott', pokedexNo: 547, name: 'WHIMSICOTT', type: 'FAIRY',    baseHp: 175, level: 21 },
  { id: 'petilil',    pokedexNo: 548, name: 'PETILIL',    type: 'GRASS',    baseHp: 125, level: 12 },
  { id: 'lilligant',  pokedexNo: 549, name: 'LILLIGANT',  type: 'GRASS',    baseHp: 180, level: 21 },
  { id: 'basculin',   pokedexNo: 550, name: 'BASCULIN',   type: 'WATER',    baseHp: 170, level: 18 },
  { id: 'sandile',    pokedexNo: 551, name: 'SANDILE',    type: 'GROUND',   baseHp: 130, level: 13 },
  { id: 'krokorok',   pokedexNo: 552, name: 'KROKOROK',   type: 'DARK',     baseHp: 165, level: 19 },
  { id: 'krookodile', pokedexNo: 553, name: 'KROOKODILE', type: 'DARK',     baseHp: 210, level: 25 },
  { id: 'darumaka',   pokedexNo: 554, name: 'DARUMAKA',   type: 'FIRE',     baseHp: 145, level: 13 },
  { id: 'darmanitan', pokedexNo: 555, name: 'DARMANITAN', type: 'FIRE',     baseHp: 215, level: 24 },
  { id: 'maractus',   pokedexNo: 556, name: 'MARACTUS',   type: 'GRASS',    baseHp: 175, level: 18 },
  { id: 'dwebble',    pokedexNo: 557, name: 'DWEBBLE',    type: 'BUG',      baseHp: 135, level: 13 },
  { id: 'crustle',    pokedexNo: 558, name: 'CRUSTLE',    type: 'ROCK',     baseHp: 185, level: 22 },
  { id: 'scraggy',    pokedexNo: 559, name: 'SCRAGGY',    type: 'DARK',     baseHp: 135, level: 13 },
  { id: 'scrafty',    pokedexNo: 560, name: 'SCRAFTY',    type: 'FIGHTING', baseHp: 185, level: 22 },
  { id: 'sigilyph',   pokedexNo: 561, name: 'SIGILYPH',   type: 'PSYCHIC',  baseHp: 180, level: 20 },
  { id: 'yamask',     pokedexNo: 562, name: 'YAMASK',     type: 'GHOST',    baseHp: 130, level: 13 },
  { id: 'cofagrigus', pokedexNo: 563, name: 'COFAGRIGUS', type: 'GHOST',    baseHp: 190, level: 23 },
  { id: 'tirtouga',   pokedexNo: 564, name: 'TIRTOUGA',   type: 'WATER',    baseHp: 140, level: 15 },
  { id: 'carracosta', pokedexNo: 565, name: 'CARRACOSTA', type: 'ROCK',     baseHp: 195, level: 24 },
  { id: 'archen',     pokedexNo: 566, name: 'ARCHEN',     type: 'ROCK',     baseHp: 140, level: 15 },
  { id: 'archeops',   pokedexNo: 567, name: 'ARCHEOPS',   type: 'FLYING',   baseHp: 195, level: 24 },
  { id: 'trubbish',   pokedexNo: 568, name: 'TRUBBISH',   type: 'POISON',   baseHp: 130, level: 12 },
  { id: 'garbodor',   pokedexNo: 569, name: 'GARBODOR',   type: 'POISON',   baseHp: 185, level: 22 },
  { id: 'zorua',      pokedexNo: 570, name: 'ZORUA',      type: 'DARK',     baseHp: 130, level: 14 },
  { id: 'zoroark',    pokedexNo: 571, name: 'ZOROARK',    type: 'DARK',     baseHp: 190, level: 24 },
  { id: 'minccino',   pokedexNo: 572, name: 'MINCCINO',   type: 'NORMAL',   baseHp: 125, level: 12 },
  { id: 'cinccino',   pokedexNo: 573, name: 'CINCCINO',   type: 'NORMAL',   baseHp: 175, level: 21 },
  { id: 'gothita',    pokedexNo: 574, name: 'GOTHITA',    type: 'PSYCHIC',  baseHp: 125, level: 12 },
  { id: 'gothorita',  pokedexNo: 575, name: 'GOTHORITA',  type: 'PSYCHIC',  baseHp: 160, level: 18 },
  { id: 'gothitelle', pokedexNo: 576, name: 'GOTHITELLE', type: 'PSYCHIC',  baseHp: 195, level: 24 },
  { id: 'solosis',    pokedexNo: 577, name: 'SOLOSIS',    type: 'PSYCHIC',  baseHp: 125, level: 12 },
  { id: 'duosion',    pokedexNo: 578, name: 'DUOSION',    type: 'PSYCHIC',  baseHp: 160, level: 18 },
  { id: 'reuniclus',  pokedexNo: 579, name: 'REUNICLUS',  type: 'PSYCHIC',  baseHp: 210, level: 24 },
  { id: 'ducklett',   pokedexNo: 580, name: 'DUCKLETT',   type: 'WATER',    baseHp: 130, level: 12 },
  { id: 'swanna',     pokedexNo: 581, name: 'SWANNA',     type: 'FLYING',   baseHp: 180, level: 21 },
  { id: 'vanillite',  pokedexNo: 582, name: 'VANILLITE',  type: 'ICE',      baseHp: 125, level: 12 },
  { id: 'vanillish',  pokedexNo: 583, name: 'VANILLISH',  type: 'ICE',      baseHp: 160, level: 18 },
  { id: 'vanilluxe',  pokedexNo: 584, name: 'VANILLUXE',  type: 'ICE',      baseHp: 195, level: 24 },
  { id: 'deerling',   pokedexNo: 585, name: 'DEERLING',   type: 'GRASS',    baseHp: 130, level: 13 },
  { id: 'sawsbuck',   pokedexNo: 586, name: 'SAWSBUCK',   type: 'GRASS',    baseHp: 185, level: 22 },
  { id: 'emolga',     pokedexNo: 587, name: 'EMOLGA',     type: 'ELECTRIC', baseHp: 155, level: 17 },
  { id: 'karrablast', pokedexNo: 588, name: 'KARRABLAST', type: 'BUG',      baseHp: 130, level: 13 },
  { id: 'escavalier', pokedexNo: 589, name: 'ESCAVALIER', type: 'STEEL',    baseHp: 195, level: 23 },
  { id: 'foongus',    pokedexNo: 590, name: 'FOONGUS',    type: 'GRASS',    baseHp: 140, level: 13 },
  { id: 'amoonguss',  pokedexNo: 591, name: 'AMOONGUSS',  type: 'POISON',   baseHp: 205, level: 23 },
  { id: 'frillish',   pokedexNo: 592, name: 'FRILLISH',   type: 'WATER',    baseHp: 140, level: 13 },
  { id: 'jellicent',  pokedexNo: 593, name: 'JELLICENT',  type: 'GHOST',    baseHp: 200, level: 23 },
  { id: 'alomomola',  pokedexNo: 594, name: 'ALOMOMOLA',  type: 'WATER',    baseHp: 230, level: 20 },
  { id: 'joltik',     pokedexNo: 595, name: 'JOLTIK',     type: 'BUG',      baseHp: 120, level: 12 },
  { id: 'galvantula', pokedexNo: 596, name: 'GALVANTULA', type: 'ELECTRIC', baseHp: 180, level: 22 },
  { id: 'ferroseed',  pokedexNo: 597, name: 'FERROSEED',  type: 'STEEL',    baseHp: 135, level: 13 },
  { id: 'ferrothorn', pokedexNo: 598, name: 'FERROTHORN', type: 'GRASS',    baseHp: 195, level: 23 },
  { id: 'klink',      pokedexNo: 599, name: 'KLINK',      type: 'STEEL',    baseHp: 125, level: 12 },
  { id: 'klang',      pokedexNo: 600, name: 'KLANG',      type: 'STEEL',    baseHp: 165, level: 18 },
  { id: 'klinklang',  pokedexNo: 601, name: 'KLINKLANG',  type: 'STEEL',    baseHp: 195, level: 24 },
  { id: 'tynamo',     pokedexNo: 602, name: 'TYNAMO',     type: 'ELECTRIC', baseHp: 115, level: 10 },
  { id: 'eelektrik',  pokedexNo: 603, name: 'EELEKTRIK',  type: 'ELECTRIC', baseHp: 165, level: 18 },
  { id: 'eelektross', pokedexNo: 604, name: 'EELEKTROSS', type: 'ELECTRIC', baseHp: 200, level: 25 },
  { id: 'elgyem',     pokedexNo: 605, name: 'ELGYEM',     type: 'PSYCHIC',  baseHp: 130, level: 13 },
  { id: 'beheeyem',   pokedexNo: 606, name: 'BEHEEYEM',   type: 'PSYCHIC',  baseHp: 185, level: 22 },
  { id: 'litwick',    pokedexNo: 607, name: 'LITWICK',    type: 'GHOST',    baseHp: 125, level: 12 },
  { id: 'lampent',    pokedexNo: 608, name: 'LAMPENT',    type: 'GHOST',    baseHp: 160, level: 18 },
  { id: 'chandelure', pokedexNo: 609, name: 'CHANDELURE', type: 'FIRE',     baseHp: 195, level: 25 },
  { id: 'axew',       pokedexNo: 610, name: 'AXEW',       type: 'DRAGON',   baseHp: 135, level: 14 },
  { id: 'fraxure',    pokedexNo: 611, name: 'FRAXURE',    type: 'DRAGON',   baseHp: 170, level: 20 },
  { id: 'haxorus',    pokedexNo: 612, name: 'HAXORUS',    type: 'DRAGON',   baseHp: 215, level: 27 },
  { id: 'cubchoo',    pokedexNo: 613, name: 'CUBCHOO',    type: 'ICE',      baseHp: 130, level: 13 },
  { id: 'beartic',    pokedexNo: 614, name: 'BEARTIC',    type: 'ICE',      baseHp: 195, level: 23 },
  { id: 'cryogonal',  pokedexNo: 615, name: 'CRYOGONAL',  type: 'ICE',      baseHp: 180, level: 20 },
  { id: 'shelmet',    pokedexNo: 616, name: 'SHELMET',    type: 'BUG',      baseHp: 130, level: 13 },
  { id: 'accelgor',   pokedexNo: 617, name: 'ACCELGOR',   type: 'BUG',      baseHp: 185, level: 22 },
  { id: 'stunfisk',   pokedexNo: 618, name: 'STUNFISK',   type: 'GROUND',   baseHp: 195, level: 20 },
  { id: 'mienfoo',    pokedexNo: 619, name: 'MIENFOO',    type: 'FIGHTING', baseHp: 130, level: 14 },
  { id: 'mienshao',   pokedexNo: 620, name: 'MIENSHAO',   type: 'FIGHTING', baseHp: 185, level: 23 },
  { id: 'druddigon',  pokedexNo: 621, name: 'DRUDDIGON',  type: 'DRAGON',   baseHp: 190, level: 22 },
  { id: 'golett',     pokedexNo: 622, name: 'GOLETT',     type: 'GROUND',   baseHp: 140, level: 14 },
  { id: 'golurk',     pokedexNo: 623, name: 'GOLURK',     type: 'GHOST',    baseHp: 205, level: 24 },
  { id: 'pawniard',   pokedexNo: 624, name: 'PAWNIARD',   type: 'DARK',     baseHp: 130, level: 14 },
  { id: 'bisharp',    pokedexNo: 625, name: 'BISHARP',    type: 'STEEL',    baseHp: 190, level: 24 },
  { id: 'bouffalant', pokedexNo: 626, name: 'BOUFFALANT', type: 'NORMAL',   baseHp: 195, level: 22 },
  { id: 'rufflet',    pokedexNo: 627, name: 'RUFFLET',    type: 'FLYING',   baseHp: 140, level: 14 },
  { id: 'braviary',   pokedexNo: 628, name: 'BRAVIARY',   type: 'FLYING',   baseHp: 200, level: 24 },
  { id: 'vullaby',    pokedexNo: 629, name: 'VULLABY',    type: 'DARK',     baseHp: 140, level: 14 },
  { id: 'mandibuzz',  pokedexNo: 630, name: 'MANDIBUZZ',  type: 'DARK',     baseHp: 205, level: 24 },
  { id: 'heatmor',    pokedexNo: 631, name: 'HEATMOR',    type: 'FIRE',     baseHp: 185, level: 21 },
  { id: 'durant',     pokedexNo: 632, name: 'DURANT',     type: 'STEEL',    baseHp: 165, level: 21 },
  { id: 'deino',      pokedexNo: 633, name: 'DEINO',      type: 'DARK',     baseHp: 135, level: 14 },
  { id: 'zweilous',   pokedexNo: 634, name: 'ZWEILOUS',   type: 'DARK',     baseHp: 175, level: 20 },
  { id: 'hydreigon',  pokedexNo: 635, name: 'HYDREIGON',  type: 'DRAGON',   baseHp: 225, level: 28 },
  { id: 'larvesta',   pokedexNo: 636, name: 'LARVESTA',   type: 'BUG',      baseHp: 140, level: 15 },
  { id: 'volcarona',  pokedexNo: 637, name: 'VOLCARONA',  type: 'FIRE',     baseHp: 215, level: 27 },
  { id: 'cobalion',   pokedexNo: 638, name: 'COBALION',   type: 'STEEL',    baseHp: 245, level: 42 },
  { id: 'terrakion',  pokedexNo: 639, name: 'TERRAKION',  type: 'ROCK',     baseHp: 245, level: 42 },
  { id: 'virizion',   pokedexNo: 640, name: 'VIRIZION',   type: 'GRASS',    baseHp: 245, level: 42 },
  { id: 'tornadus',   pokedexNo: 641, name: 'TORNADUS',   type: 'FLYING',   baseHp: 245, level: 42 },
  { id: 'thundurus',  pokedexNo: 642, name: 'THUNDURUS',  type: 'ELECTRIC', baseHp: 245, level: 42 },
  { id: 'reshiram',   pokedexNo: 643, name: 'RESHIRAM',   type: 'FIRE',     baseHp: 365, level: 55 },
  { id: 'zekrom',     pokedexNo: 644, name: 'ZEKROM',     type: 'ELECTRIC', baseHp: 365, level: 55 },
  { id: 'landorus',   pokedexNo: 645, name: 'LANDORUS',   type: 'GROUND',   baseHp: 255, level: 45 },
  { id: 'kyurem',     pokedexNo: 646, name: 'KYUREM',     type: 'ICE',      baseHp: 365, level: 55 },
  { id: 'keldeo',     pokedexNo: 647, name: 'KELDEO',     type: 'WATER',    baseHp: 245, level: 42 },
  { id: 'meloetta',   pokedexNo: 648, name: 'MELOETTA',   type: 'PSYCHIC',  baseHp: 250, level: 42 },
  { id: 'genesect',   pokedexNo: 649, name: 'GENESECT',   type: 'STEEL',    baseHp: 250, level: 45 },

  // --- GEN 6 KALOS ---
  { id: 'chespin',    pokedexNo: 650, name: 'CHESPIN',    type: 'GRASS',    baseHp: 145, level: 12 },
  { id: 'quilladin',  pokedexNo: 651, name: 'QUILLADIN',  type: 'GRASS',    baseHp: 170, level: 16 },
  { id: 'chesnaught', pokedexNo: 652, name: 'CHESNAUGHT', type: 'FIGHTING', baseHp: 200, level: 22 },
  { id: 'fennekin',   pokedexNo: 653, name: 'FENNEKIN',   type: 'FIRE',     baseHp: 130, level: 12 },
  { id: 'braixen',    pokedexNo: 654, name: 'BRAIXEN',    type: 'FIRE',     baseHp: 160, level: 16 },
  { id: 'delphox',    pokedexNo: 655, name: 'DELPHOX',    type: 'PSYCHIC',  baseHp: 190, level: 22 },
  { id: 'froakie',    pokedexNo: 656, name: 'FROAKIE',    type: 'WATER',    baseHp: 135, level: 12 },
  { id: 'frogadier',  pokedexNo: 657, name: 'FROGADIER',  type: 'WATER',    baseHp: 160, level: 16 },
  { id: 'greninja',   pokedexNo: 658, name: 'GRENINJA',   type: 'DARK',     baseHp: 190, level: 22 },
  { id: 'bunnelby',   pokedexNo: 659, name: 'BUNNELBY',   type: 'NORMAL',   baseHp: 120, level: 10 },
  { id: 'diggersby',  pokedexNo: 660, name: 'DIGGERSBY',  type: 'GROUND',   baseHp: 185, level: 20 },
  { id: 'fletchling', pokedexNo: 661, name: 'FLETCHLING', type: 'FLYING',   baseHp: 120, level: 10 },
  { id: 'fletchinder',pokedexNo: 662, name: 'FLETCHINDER',type: 'FIRE',     baseHp: 155, level: 17 },
  { id: 'talonflame', pokedexNo: 663, name: 'TALONFLAME', type: 'FIRE',     baseHp: 195, level: 25 },
  { id: 'scatterbug', pokedexNo: 664, name: 'SCATTERBUG', type: 'BUG',      baseHp: 115, level: 8 },
  { id: 'spewpa',     pokedexNo: 665, name: 'SPEWPA',     type: 'BUG',      baseHp: 130, level: 11 },
  { id: 'vivillon',   pokedexNo: 666, name: 'VIVILLON',   type: 'BUG',      baseHp: 170, level: 18 },
  { id: 'litleo',     pokedexNo: 667, name: 'LITLEO',     type: 'FIRE',     baseHp: 135, level: 13 },
  { id: 'pyroar',     pokedexNo: 668, name: 'PYROAR',     type: 'FIRE',     baseHp: 190, level: 23 },
  { id: 'flabebe',    pokedexNo: 669, name: 'FLABEBE',    type: 'FAIRY',    baseHp: 120, level: 11 },
  { id: 'floette',    pokedexNo: 670, name: 'FLOETTE',    type: 'FAIRY',    baseHp: 150, level: 17 },
  { id: 'florges',    pokedexNo: 671, name: 'FLORGES',    type: 'FAIRY',    baseHp: 195, level: 24 },
  { id: 'skiddo',     pokedexNo: 672, name: 'SKIDDO',     type: 'GRASS',    baseHp: 140, level: 13 },
  { id: 'gogoat',     pokedexNo: 673, name: 'GOGOAT',     type: 'GRASS',    baseHp: 205, level: 23 },
  { id: 'pancham',    pokedexNo: 674, name: 'PANCHAM',    type: 'FIGHTING', baseHp: 140, level: 13 },
  { id: 'pangoro',    pokedexNo: 675, name: 'PANGORO',    type: 'DARK',     baseHp: 200, level: 24 },
  { id: 'furfrou',    pokedexNo: 676, name: 'FURFROU',    type: 'NORMAL',   baseHp: 175, level: 19 },
  { id: 'espurr',     pokedexNo: 677, name: 'ESPURR',     type: 'PSYCHIC',  baseHp: 130, level: 12 },
  { id: 'meowstic',   pokedexNo: 678, name: 'MEOWSTIC',   type: 'PSYCHIC',  baseHp: 180, level: 22 },
  { id: 'honedge',    pokedexNo: 679, name: 'HONEDGE',    type: 'STEEL',    baseHp: 130, level: 13 },
  { id: 'doublade',   pokedexNo: 680, name: 'DOUBLADE',   type: 'STEEL',    baseHp: 165, level: 20 },
  { id: 'aegislash',  pokedexNo: 681, name: 'AEGISLASH',  type: 'GHOST',    baseHp: 205, level: 26 },
  { id: 'spritzee',   pokedexNo: 682, name: 'SPRITZEE',   type: 'FAIRY',    baseHp: 140, level: 13 },
  { id: 'aromatisse', pokedexNo: 683, name: 'AROMATISSE', type: 'FAIRY',    baseHp: 195, level: 22 },
  { id: 'swirlix',    pokedexNo: 684, name: 'SWIRLIX',    type: 'FAIRY',    baseHp: 135, level: 13 },
  { id: 'slurpuff',   pokedexNo: 685, name: 'SLURPUFF',   type: 'FAIRY',    baseHp: 185, level: 22 },
  { id: 'inkay',      pokedexNo: 686, name: 'INKAY',      type: 'DARK',     baseHp: 130, level: 13 },
  { id: 'malamar',    pokedexNo: 687, name: 'MALAMAR',    type: 'PSYCHIC',  baseHp: 190, level: 23 },
  { id: 'binacle',    pokedexNo: 688, name: 'BINACLE',    type: 'ROCK',     baseHp: 130, level: 13 },
  { id: 'barbaracle', pokedexNo: 689, name: 'BARBARACLE', type: 'WATER',    baseHp: 190, level: 23 },
  { id: 'skrelp',     pokedexNo: 690, name: 'SKRELP',     type: 'POISON',   baseHp: 130, level: 13 },
  { id: 'dragalge',   pokedexNo: 691, name: 'DRAGALGE',   type: 'DRAGON',   baseHp: 190, level: 24 },
  { id: 'clauncher',  pokedexNo: 692, name: 'CLAUNCHER',  type: 'WATER',    baseHp: 130, level: 13 },
  { id: 'clawitzer',  pokedexNo: 693, name: 'CLAWITZER',  type: 'WATER',    baseHp: 190, level: 24 },
  { id: 'helioptile', pokedexNo: 694, name: 'HELIOPTILE', type: 'ELECTRIC', baseHp: 125, level: 12 },
  { id: 'heliolisk',  pokedexNo: 695, name: 'HELIOLISK',  type: 'ELECTRIC', baseHp: 180, level: 22 },
  { id: 'tyrunt',     pokedexNo: 696, name: 'TYRUNT',     type: 'ROCK',     baseHp: 145, level: 15 },
  { id: 'tyrantrum',  pokedexNo: 697, name: 'TYRANTRUM',  type: 'DRAGON',   baseHp: 210, level: 26 },
  { id: 'amaura',     pokedexNo: 698, name: 'AMAURA',     type: 'ICE',      baseHp: 150, level: 15 },
  { id: 'aurorus',    pokedexNo: 699, name: 'AURORUS',    type: 'ICE',      baseHp: 220, level: 26 },
  { id: 'sylveon',    pokedexNo: 700, name: 'SYLVEON',    type: 'FAIRY',    baseHp: 195, level: 22 },  
  { id: 'hawlucha',   pokedexNo: 701, name: 'HAWLUCHA',   type: 'FIGHTING', baseHp: 180, level: 21 },
  { id: 'dedenne',    pokedexNo: 702, name: 'DEDENNE',    type: 'ELECTRIC', baseHp: 155, level: 17 },
  { id: 'carbink',    pokedexNo: 703, name: 'CARBINK',    type: 'FAIRY',    baseHp: 165, level: 18 },
  { id: 'goomy',      pokedexNo: 704, name: 'GOOMY',      type: 'DRAGON',   baseHp: 130, level: 14 },
  { id: 'sliggoo',    pokedexNo: 705, name: 'SLIGGOO',    type: 'DRAGON',   baseHp: 170, level: 20 },
  { id: 'goodra',     pokedexNo: 706, name: 'GOODRA',     type: 'DRAGON',   baseHp: 220, level: 28 },
  { id: 'klefki',     pokedexNo: 707, name: 'KLEFKI',     type: 'STEEL',    baseHp: 160, level: 18 },
  { id: 'phantump',   pokedexNo: 708, name: 'PHANTUMP',   type: 'GHOST',    baseHp: 130, level: 13 },
  { id: 'trevenant',  pokedexNo: 709, name: 'TREVENANT',  type: 'GRASS',    baseHp: 195, level: 23 },
  { id: 'pumpkaboo',  pokedexNo: 710, name: 'PUMPKABOO',  type: 'GHOST',    baseHp: 135, level: 13 },
  { id: 'gourgeist',  pokedexNo: 711, name: 'GOURGEIST',  type: 'GHOST',    baseHp: 190, level: 23 },
  { id: 'bergmite',   pokedexNo: 712, name: 'BERGMITE',   type: 'ICE',      baseHp: 140, level: 14 },
  { id: 'avalugg',    pokedexNo: 713, name: 'AVALUGG',    type: 'ICE',      baseHp: 215, level: 25 },
  { id: 'noibat',     pokedexNo: 714, name: 'NOIBAT',     type: 'FLYING',   baseHp: 125, level: 13 },
  { id: 'noivern',    pokedexNo: 715, name: 'NOIVERN',    type: 'DRAGON',   baseHp: 205, level: 26 },
  { id: 'xerneas',    pokedexNo: 716, name: 'XERNEAS',    type: 'FAIRY',    baseHp: 370, level: 55 },
  { id: 'yveltal',    pokedexNo: 717, name: 'YVELTAL',    type: 'DARK',     baseHp: 370, level: 55 },
  { id: 'zygarde',    pokedexNo: 718, name: 'ZYGARDE',    type: 'DRAGON',   baseHp: 375, level: 55 },
  { id: 'diancie',    pokedexNo: 719, name: 'DIANCIE',    type: 'FAIRY',    baseHp: 255, level: 45 },
  { id: 'hoopa',      pokedexNo: 720, name: 'HOOPA',      type: 'PSYCHIC',  baseHp: 255, level: 45 },
  { id: 'volcanion',  pokedexNo: 721, name: 'VOLCANION',  type: 'FIRE',     baseHp: 265, level: 45 },

  

  // --- GEN 7 ALOLA (#722 - #809) ---
  { id: 'rowlet',       pokedexNo: 722,  name: 'ROWLET',       type: 'GRASS',    baseHp: 135, level: 12 },
  { id: 'dartrix',      pokedexNo: 723,  name: 'DARTRIX',      type: 'GRASS',    baseHp: 165, level: 16 },
  { id: 'decidueye',    pokedexNo: 724,  name: 'DECIDUEYE',    type: 'GHOST',    baseHp: 195, level: 22 },
  { id: 'litten',       pokedexNo: 725,  name: 'LITTEN',       type: 'FIRE',     baseHp: 130, level: 12 },
  { id: 'torracat',     pokedexNo: 726,  name: 'TORRACAT',     type: 'FIRE',     baseHp: 165, level: 16 },
  { id: 'incineroar',   pokedexNo: 727,  name: 'INCINEROAR',   type: 'DARK',     baseHp: 200, level: 22 },
  { id: 'popplio',      pokedexNo: 728,  name: 'POPPLIO',      type: 'WATER',    baseHp: 135, level: 12 },
  { id: 'brionne',      pokedexNo: 729,  name: 'BRIONNE',      type: 'WATER',    baseHp: 165, level: 16 },
  { id: 'primarina',    pokedexNo: 730,  name: 'PRIMARINA',    type: 'FAIRY',    baseHp: 195, level: 22 },
  { id: 'pikipek',      pokedexNo: 731,  name: 'PIKIPEK',      type: 'FLYING',   baseHp: 120, level: 10 },
  { id: 'trumbeak',     pokedexNo: 732,  name: 'TRUMBEAK',     type: 'FLYING',   baseHp: 150, level: 15 },
  { id: 'toucannon',    pokedexNo: 733,  name: 'TOUCANNON',    type: 'FLYING',   baseHp: 185, level: 21 },
  { id: 'yungoos',      pokedexNo: 734,  name: 'YUNGOOS',      type: 'NORMAL',   baseHp: 120, level: 10 },
  { id: 'gumshoos',     pokedexNo: 735,  name: 'GUMSHOOS',     type: 'NORMAL',   baseHp: 175, level: 18 },
  { id: 'grubbin',      pokedexNo: 736,  name: 'GRUBBIN',      type: 'BUG',      baseHp: 120, level: 10 },
  { id: 'charjabug',    pokedexNo: 737,  name: 'CHARJABUG',    type: 'ELECTRIC', baseHp: 155, level: 16 },
  { id: 'vikavolt',     pokedexNo: 738,  name: 'VIKAVOLT',     type: 'ELECTRIC', baseHp: 195, level: 23 },
  { id: 'crabrawler',   pokedexNo: 739,  name: 'CRABRAWLER',   type: 'FIGHTING', baseHp: 135, level: 13 },
  { id: 'crabominable', pokedexNo: 740,  name: 'CRABOMINABLE', type: 'ICE',      baseHp: 195, level: 23 },
  { id: 'oricorio',     pokedexNo: 741,  name: 'ORICORIO',     type: 'FLYING',   baseHp: 165, level: 18 },
  { id: 'cutiefly',     pokedexNo: 742,  name: 'CUTIEFLY',     type: 'FAIRY',    baseHp: 115, level: 10 },
  { id: 'ribombee',     pokedexNo: 743,  name: 'RIBOMBEE',     type: 'FAIRY',    baseHp: 165, level: 19 },
  { id: 'rockruff',     pokedexNo: 744,  name: 'ROCKRUFF',     type: 'ROCK',     baseHp: 130, level: 12 },
  { id: 'lycanroc',     pokedexNo: 745,  name: 'LYCANROC',     type: 'ROCK',     baseHp: 185, level: 22 },
  { id: 'wishiwashi',   pokedexNo: 746,  name: 'WISHIWASHI',   type: 'WATER',    baseHp: 175, level: 18 },
  { id: 'mareanie',     pokedexNo: 747,  name: 'MAREANIE',     type: 'POISON',   baseHp: 135, level: 13 },
  { id: 'toxapex',      pokedexNo: 748,  name: 'TOXAPEX',      type: 'POISON',   baseHp: 190, level: 22 },
  { id: 'mudbray',      pokedexNo: 749,  name: 'MUDBRAY',      type: 'GROUND',   baseHp: 145, level: 14 },
  { id: 'mudsdale',     pokedexNo: 750,  name: 'MUDSDALE',     type: 'GROUND',   baseHp: 210, level: 24 },
  { id: 'dewpider',     pokedexNo: 751,  name: 'DEWPIDER',     type: 'WATER',    baseHp: 125, level: 12 },
  { id: 'araquanid',    pokedexNo: 752,  name: 'ARAQUANID',    type: 'WATER',    baseHp: 185, level: 21 },
  { id: 'fomantis',     pokedexNo: 753,  name: 'FOMANTIS',     type: 'GRASS',    baseHp: 125, level: 12 },
  { id: 'lurantis',     pokedexNo: 754,  name: 'LURANTIS',     type: 'GRASS',    baseHp: 180, level: 21 },
  { id: 'morelull',     pokedexNo: 755,  name: 'MORELULL',     type: 'FAIRY',    baseHp: 125, level: 11 },
  { id: 'shiinotic',    pokedexNo: 756,  name: 'SHIINOTIC',    type: 'FAIRY',    baseHp: 175, level: 20 },
  { id: 'salandit',     pokedexNo: 757,  name: 'SALANDIT',     type: 'POISON',   baseHp: 125, level: 13 },
  { id: 'salazzle',     pokedexNo: 758,  name: 'SALAZZLE',     type: 'FIRE',     baseHp: 180, level: 22 },
  { id: 'stufful',      pokedexNo: 759,  name: 'STUFFUL',      type: 'NORMAL',   baseHp: 140, level: 13 },
  { id: 'bewear',       pokedexNo: 760,  name: 'BEWEAR',       type: 'FIGHTING', baseHp: 215, level: 24 },
  { id: 'bounsweet',    pokedexNo: 761,  name: 'BOUNSWEET',    type: 'GRASS',    baseHp: 120, level: 10 },
  { id: 'steenee',      pokedexNo: 762,  name: 'STEENEE',      type: 'GRASS',    baseHp: 150, level: 16 },
  { id: 'tsareena',     pokedexNo: 763,  name: 'TSAREENA',     type: 'GRASS',    baseHp: 190, level: 23 },
  { id: 'comfey',       pokedexNo: 764,  name: 'COMFEY',       type: 'FAIRY',    baseHp: 155, level: 18 },
  { id: 'oranguru',     pokedexNo: 765,  name: 'ORANGURU',     type: 'PSYCHIC',  baseHp: 185, level: 20 },
  { id: 'passimian',    pokedexNo: 766,  name: 'PASSIMIAN',    type: 'FIGHTING', baseHp: 185, level: 20 },
  { id: 'wimpod',       pokedexNo: 767,  name: 'WIMPOD',       type: 'BUG',      baseHp: 115, level: 9 },
  { id: 'golisopod',    pokedexNo: 768,  name: 'GOLISOPOD',    type: 'BUG',      baseHp: 200, level: 24 },
  { id: 'sandygast',    pokedexNo: 769,  name: 'SANDYGAST',    type: 'GHOST',    baseHp: 135, level: 13 },
  { id: 'palossand',    pokedexNo: 770,  name: 'PALOSSAND',    type: 'GROUND',   baseHp: 195, level: 23 },
  { id: 'pyukumuku',    pokedexNo: 771,  name: 'PYUKUMUKU',    type: 'WATER',    baseHp: 160, level: 17 },
  { id: 'type_null',    pokedexNo: 772,  name: 'TYPE: NULL',   type: 'NORMAL',   baseHp: 210, level: 35 },
  { id: 'silvally',     pokedexNo: 773,  name: 'SILVALLY',     type: 'NORMAL',   baseHp: 235, level: 42 },
  { id: 'minior',       pokedexNo: 774,  name: 'MINIOR',       type: 'ROCK',     baseHp: 165, level: 19 },
  { id: 'komala',       pokedexNo: 775,  name: 'KOMALA',       type: 'NORMAL',   baseHp: 165, level: 18 },
  { id: 'turtonator',   pokedexNo: 776,  name: 'TURTONATOR',   type: 'FIRE',     baseHp: 180, level: 21 },
  { id: 'togedemaru',   pokedexNo: 777,  name: 'TOGEDEMARU',   type: 'ELECTRIC', baseHp: 160, level: 18 },
  { id: 'mimikyu',      pokedexNo: 778,  name: 'MIMIKYU',      type: 'GHOST',    baseHp: 170, level: 20 },
  { id: 'bruxish',      pokedexNo: 779,  name: 'BRUXISH',      type: 'WATER',    baseHp: 165, level: 19 },
  { id: 'drampa',       pokedexNo: 780,  name: 'DRAMPA',       type: 'DRAGON',   baseHp: 190, level: 22 },
  { id: 'dhelmise',     pokedexNo: 781,  name: 'DHELMISE',     type: 'GHOST',    baseHp: 185, level: 22 },
  { id: 'jangmo_o',     pokedexNo: 782,  name: 'JANGMO-O',     type: 'DRAGON',   baseHp: 135, level: 14 },
  { id: 'hakamo_o',     pokedexNo: 783,  name: 'HAKAMO-O',     type: 'FIGHTING', baseHp: 170, level: 20 },
  { id: 'kommo_o',      pokedexNo: 784,  name: 'KOMMO-O',      type: 'DRAGON',   baseHp: 220, level: 28 },
  { id: 'tapu_koko',    pokedexNo: 785,  name: 'TAPU KOKO',    type: 'ELECTRIC', baseHp: 245, level: 45 },
  { id: 'tapu_lele',    pokedexNo: 786,  name: 'TAPU LELE',    type: 'PSYCHIC',  baseHp: 245, level: 45 },
  { id: 'tapu_bulu',    pokedexNo: 787,  name: 'TAPU BULU',    type: 'GRASS',    baseHp: 245, level: 45 },
  { id: 'tapu_fini',    pokedexNo: 788,  name: 'TAPU FINI',    type: 'WATER',    baseHp: 245, level: 45 },
  { id: 'cosmog',       pokedexNo: 789,  name: 'COSMOG',       type: 'PSYCHIC',  baseHp: 120, level: 10 },
  { id: 'cosmoem',      pokedexNo: 790,  name: 'COSMOEM',      type: 'PSYCHIC',  baseHp: 160, level: 20 },
  { id: 'solgaleo',     pokedexNo: 791,  name: 'SOLGALEO',     type: 'STEEL',    baseHp: 365, level: 55 },
  { id: 'lunala',       pokedexNo: 792,  name: 'LUNALA',       type: 'GHOST',    baseHp: 365, level: 55 },
  { id: 'nihilego',     pokedexNo: 793, name: 'NIHILEGO',   type: 'ROCK',     baseHp: 260, level: 55 },
  { id: 'buzzwole',     pokedexNo: 794, name: 'BUZZWOLE',   type: 'FIGHTING', baseHp: 270, level: 55 },
  { id: 'pheromosa',    pokedexNo: 795, name: 'PHEROMOSA',  type: 'BUG',      baseHp: 230, level: 55 },
  { id: 'xurkitree',    pokedexNo: 796, name: 'XURKITREE',  type: 'ELECTRIC', baseHp: 255, level: 55 },
  { id: 'celesteela',   pokedexNo: 797, name: 'CELESTEELA', type: 'STEEL',    baseHp: 275, level: 55 },
  { id: 'kartana',      pokedexNo: 798, name: 'KARTANA',    type: 'STEEL',    baseHp: 235, level: 55 },
  { id: 'guzzlord',     pokedexNo: 799, name: 'GUZZLORD',   type: 'DRAGON',   baseHp: 320, level: 60 },
  { id: 'necrozma',     pokedexNo: 800,  name: 'NECROZMA',     type: 'PSYCHIC',  baseHp: 360, level: 55 },
  { id: 'magearna',     pokedexNo: 801,  name: 'MAGEARNA',     type: 'STEEL',    baseHp: 255, level: 48 },
  { id: 'marshadow',    pokedexNo: 802,  name: 'MARSHADOW',    type: 'FIGHTING', baseHp: 255, level: 48 },
  { id: 'poipole',      pokedexNo: 803,  name: 'POIPOLE',      type: 'POISON',   baseHp: 165, level: 30 },
  { id: 'naganadel',    pokedexNo: 804,  name: 'NAGANADEL',    type: 'DRAGON',   baseHp: 245, level: 48 },
  { id: 'stakataka',    pokedexNo: 805,  name: 'STAKATAKA',    type: 'ROCK',     baseHp: 260, level: 55 },
  { id: 'blacephalon',  pokedexNo: 806,  name: 'BLACEPHALON',  type: 'FIRE',     baseHp: 240, level: 55 },
  { id: 'zeraora',      pokedexNo: 807,  name: 'ZERAORA',      type: 'ELECTRIC', baseHp: 255, level: 48 },
  { id: 'meltan',       pokedexNo: 808,  name: 'MELTAN',       type: 'STEEL',    baseHp: 140, level: 18 },
  { id: 'melmetal',     pokedexNo: 809,  name: 'MELMETAL',     type: 'STEEL',    baseHp: 280, level: 50 },

  // --- GEN 8 GALAR & HISUI (#810 - #905) ---
  { id: 'grookey',      pokedexNo: 810,  name: 'GROOKEY',      type: 'GRASS',    baseHp: 135, level: 12 },
  { id: 'thwackey',     pokedexNo: 811,  name: 'THWACKEY',     type: 'GRASS',    baseHp: 165, level: 16 },
  { id: 'rillaboom',    pokedexNo: 812,  name: 'RILLABOOM',    type: 'GRASS',    baseHp: 200, level: 22 },
  { id: 'scorbunny',    pokedexNo: 813,  name: 'SCORBUNNY',    type: 'FIRE',     baseHp: 135, level: 12 },
  { id: 'raboot',       pokedexNo: 814,  name: 'RABOOT',       type: 'FIRE',     baseHp: 165, level: 16 },
  { id: 'cinderace',    pokedexNo: 815,  name: 'CINDERACE',    type: 'FIRE',     baseHp: 195, level: 22 },
  { id: 'sobble',       pokedexNo: 816,  name: 'SOBBLE',       type: 'WATER',    baseHp: 130, level: 12 },
  { id: 'drizzile',     pokedexNo: 817,  name: 'DRIZZILE',     type: 'WATER',    baseHp: 160, level: 16 },
  { id: 'inteleon',     pokedexNo: 818,  name: 'INTELEON',     type: 'WATER',    baseHp: 190, level: 22 },
  { id: 'skwovet',      pokedexNo: 819,  name: 'SKWOVET',      type: 'NORMAL',   baseHp: 135, level: 10 },
  { id: 'greedent',     pokedexNo: 820,  name: 'GREEDENT',     type: 'NORMAL',   baseHp: 205, level: 19 },
  { id: 'rookidee',     pokedexNo: 821,  name: 'ROOKIDEE',     type: 'FLYING',   baseHp: 120, level: 10 },
  { id: 'corvisquire',  pokedexNo: 822,  name: 'CORVISQUIRE',  type: 'FLYING',   baseHp: 155, level: 16 },
  { id: 'corviknight',  pokedexNo: 823,  name: 'CORVIKNIGHT',  type: 'STEEL',    baseHp: 200, level: 24 },
  { id: 'blipbug',      pokedexNo: 824,  name: 'BLIPBUG',      type: 'BUG',      baseHp: 115, level: 8 },
  { id: 'dottler',      pokedexNo: 825,  name: 'DOTTLER',      type: 'PSYCHIC',  baseHp: 145, level: 14 },
  { id: 'orbeetle',     pokedexNo: 826,  name: 'ORBEETLE',     type: 'PSYCHIC',  baseHp: 185, level: 21 },
  { id: 'nickit',       pokedexNo: 827,  name: 'NICKIT',       type: 'DARK',     baseHp: 120, level: 10 },
  { id: 'thievul',      pokedexNo: 828,  name: 'THIEVUL',      type: 'DARK',     baseHp: 170, level: 19 },
  { id: 'gossifleur',   pokedexNo: 829,  name: 'GOSSIFLEUR',   type: 'GRASS',    baseHp: 120, level: 11 },
  { id: 'eldegoss',     pokedexNo: 830,  name: 'ELDEGOSS',     type: 'GRASS',    baseHp: 170, level: 19 },
  { id: 'wooloo',       pokedexNo: 831,  name: 'WOOLOO',       type: 'NORMAL',   baseHp: 125, level: 11 },
  { id: 'dubwool',      pokedexNo: 832,  name: 'DUBWOOL',      type: 'NORMAL',   baseHp: 180, level: 20 },
  { id: 'chewtle',      pokedexNo: 833,  name: 'CHEWTLE',      type: 'WATER',    baseHp: 130, level: 11 },
  { id: 'drednaw',      pokedexNo: 834,  name: 'DREDNAW',      type: 'ROCK',     baseHp: 195, level: 22 },
  { id: 'yamper',       pokedexNo: 835,  name: 'YAMPER',       type: 'ELECTRIC', baseHp: 135, level: 11 },
  { id: 'boltund',      pokedexNo: 836,  name: 'BOLTUND',      type: 'ELECTRIC', baseHp: 180, level: 20 },
  { id: 'rolycoly',     pokedexNo: 837,  name: 'ROLYCOLY',     type: 'ROCK',     baseHp: 125, level: 11 },
  { id: 'carkol',       pokedexNo: 838,  name: 'CARKOL',       type: 'FIRE',     baseHp: 165, level: 17 },
  { id: 'coalossal',    pokedexNo: 839,  name: 'COALOSSAL',    type: 'ROCK',     baseHp: 215, level: 25 },
  { id: 'applin',       pokedexNo: 840,  name: 'APPLIN',       type: 'GRASS',    baseHp: 115, level: 10 },
  { id: 'flapple',      pokedexNo: 841,  name: 'FLAPPLE',      type: 'DRAGON',   baseHp: 180, level: 22 },
  { id: 'appletun',     pokedexNo: 842,  name: 'APPLETUN',     type: 'DRAGON',   baseHp: 215, level: 22 },
  { id: 'silicobra',    pokedexNo: 843,  name: 'SILICOBRA',    type: 'GROUND',   baseHp: 130, level: 13 },
  { id: 'sandaconda',   pokedexNo: 844,  name: 'SANDACONDA',   type: 'GROUND',   baseHp: 190, level: 22 },
  { id: 'cramorant',    pokedexNo: 845,  name: 'CRAMORANT',    type: 'FLYING',   baseHp: 175, level: 19 },
  { id: 'arrokuda',     pokedexNo: 846,  name: 'ARROKUDA',     type: 'WATER',    baseHp: 120, level: 11 },
  { id: 'barraskewda',  pokedexNo: 847,  name: 'BARRASKEWDA',  type: 'WATER',    baseHp: 175, level: 21 },
  { id: 'toxel',        pokedexNo: 848,  name: 'TOXEL',        type: 'ELECTRIC', baseHp: 120, level: 10 },
  { id: 'toxtricity',   pokedexNo: 849,  name: 'TOXTRICITY',   type: 'ELECTRIC', baseHp: 190, level: 23 },
  { id: 'sizzlipede',   pokedexNo: 850,  name: 'SIZZLIPEDE',   type: 'FIRE',     baseHp: 130, level: 13 },
  { id: 'centiskorch',  pokedexNo: 851,  name: 'CENTISKORCH',  type: 'FIRE',     baseHp: 205, level: 24 },
  { id: 'clobbopus',    pokedexNo: 852,  name: 'CLOBBOPUS',    type: 'FIGHTING', baseHp: 130, level: 13 },
  { id: 'grapploct',    pokedexNo: 853,  name: 'GRAPPLOCT',    type: 'FIGHTING', baseHp: 185, level: 22 },
  { id: 'sinistea',     pokedexNo: 854,  name: 'SINISTEA',     type: 'GHOST',    baseHp: 120, level: 12 },
  { id: 'polteageist',  pokedexNo: 855,  name: 'POLTEAGEIST',  type: 'GHOST',    baseHp: 175, level: 21 },
  { id: 'hatenna',      pokedexNo: 856,  name: 'HATENNA',      type: 'PSYCHIC',  baseHp: 120, level: 11 },
  { id: 'hattrem',      pokedexNo: 857,  name: 'HATTREM',      type: 'PSYCHIC',  baseHp: 155, level: 17 },
  { id: 'hatterene',    pokedexNo: 858,  name: 'HATTERENE',    type: 'FAIRY',    baseHp: 190, level: 24 },
  { id: 'impidimp',     pokedexNo: 859,  name: 'IMPIDIMP',     type: 'DARK',     baseHp: 125, level: 11 },
  { id: 'morgrem',      pokedexNo: 860,  name: 'MORGREM',      type: 'DARK',     baseHp: 160, level: 17 },
  { id: 'grimmsnarl',   pokedexNo: 861,  name: 'GRIMMSNARL',   type: 'FAIRY',    baseHp: 205, level: 25 },
  { id: 'obstagoon',    pokedexNo: 862,  name: 'OBSTAGOON',    type: 'DARK',     baseHp: 200, level: 25 },
  { id: 'perrserker',   pokedexNo: 863,  name: 'PERRSERKER',   type: 'STEEL',    baseHp: 180, level: 21 },
  { id: 'cursola',      pokedexNo: 864,  name: 'CURSOLA',      type: 'GHOST',    baseHp: 175, level: 22 },
  { id: 'sirfetchd',    pokedexNo: 865,  name: 'SIRFETCHD',    type: 'FIGHTING', baseHp: 185, level: 23 },
  { id: 'mr_rime',      pokedexNo: 866,  name: 'MR. RIME',     type: 'ICE',      baseHp: 185, level: 23 },
  { id: 'runerigus',    pokedexNo: 867,  name: 'RUNERIGUS',    type: 'GROUND',   baseHp: 180, level: 22 },
  { id: 'milcery',      pokedexNo: 868,  name: 'MILCERY',      type: 'FAIRY',    baseHp: 120, level: 11 },
  { id: 'alcremie',     pokedexNo: 869,  name: 'ALCREMIE',     type: 'FAIRY',    baseHp: 175, level: 20 },
  { id: 'falinks',      pokedexNo: 870,  name: 'FALINKS',      type: 'FIGHTING', baseHp: 175, level: 20 },
  { id: 'pincurchin',   pokedexNo: 871,  name: 'PINCURCHIN',   type: 'ELECTRIC', baseHp: 155, level: 17 },
  { id: 'snom',         pokedexNo: 872,  name: 'SNOM',         type: 'ICE',      baseHp: 115, level: 9 },
  { id: 'frosmoth',     pokedexNo: 873,  name: 'FROSMOTH',     type: 'ICE',      baseHp: 180, level: 21 },
  { id: 'stonjourner',  pokedexNo: 874,  name: 'STONJOURNER',  type: 'ROCK',     baseHp: 205, level: 22 },
  { id: 'eiscue',       pokedexNo: 875,  name: 'EISCUE',       type: 'ICE',      baseHp: 180, level: 20 },
  { id: 'indeedee',     pokedexNo: 876,  name: 'INDEEDEE',     type: 'PSYCHIC',  baseHp: 175, level: 19 },
  { id: 'morpeko',      pokedexNo: 877,  name: 'MORPEKO',      type: 'ELECTRIC', baseHp: 165, level: 18 },
  { id: 'cufant',       pokedexNo: 878,  name: 'CUFANT',       type: 'STEEL',    baseHp: 145, level: 14 },
  { id: 'copperajah',   pokedexNo: 879,  name: 'COPPERAJAH',   type: 'STEEL',    baseHp: 225, level: 24 },
  { id: 'dracozolt',    pokedexNo: 880,  name: 'DRACOZOLT',    type: 'ELECTRIC', baseHp: 195, level: 24 },
  { id: 'arctozolt',    pokedexNo: 881,  name: 'ARCTOZOLT',    type: 'ICE',      baseHp: 195, level: 24 },
  { id: 'dracovish',    pokedexNo: 882,  name: 'DRACOVISH',    type: 'WATER',    baseHp: 195, level: 24 },
  { id: 'arctovish',    pokedexNo: 883,  name: 'ARCTOVISH',    type: 'ICE',      baseHp: 195, level: 24 },
  { id: 'duraludon',    pokedexNo: 884,  name: 'DURALUDON',    type: 'STEEL',    baseHp: 185, level: 23 },
  { id: 'dreepy',       pokedexNo: 885,  name: 'DREEPY',       type: 'DRAGON',   baseHp: 120, level: 12 },
  { id: 'drakloak',     pokedexNo: 886,  name: 'DRAKLOAK',     type: 'GHOST',    baseHp: 165, level: 20 },
  { id: 'dragapult',    pokedexNo: 887,  name: 'DRAGAPULT',    type: 'DRAGON',   baseHp: 220, level: 28 },
  { id: 'zacian',       pokedexNo: 888,  name: 'ZACIAN',       type: 'FAIRY',    baseHp: 360, level: 58 },
  { id: 'zamazenta',    pokedexNo: 889,  name: 'ZAMAZENTA',    type: 'FIGHTING', baseHp: 360, level: 58 },
  { id: 'eternatus',    pokedexNo: 890,  name: 'ETERNATUS',    type: 'POISON',   baseHp: 390, level: 60 },
  { id: 'kubfu',        pokedexNo: 891,  name: 'KUBFU',        type: 'FIGHTING', baseHp: 160, level: 25 },
  { id: 'urshifu',      pokedexNo: 892,  name: 'URSHIFU',      type: 'FIGHTING', baseHp: 265, level: 50 },
  { id: 'zarude',       pokedexNo: 893,  name: 'ZARUDE',       type: 'DARK',     baseHp: 265, level: 50 },
  { id: 'regieleki',    pokedexNo: 894,  name: 'REGIELEKI',    type: 'ELECTRIC', baseHp: 250, level: 45 },
  { id: 'regidrago',    pokedexNo: 895,  name: 'REGIDRAGO',    type: 'DRAGON',   baseHp: 310, level: 45 },
  { id: 'glastrier',    pokedexNo: 896,  name: 'GLASTRIER',    type: 'ICE',      baseHp: 265, level: 50 },
  { id: 'spectrier',    pokedexNo: 897,  name: 'SPECTRIER',    type: 'GHOST',    baseHp: 265, level: 50 },
  { id: 'calyrex',      pokedexNo: 898,  name: 'CALYREX',      type: 'PSYCHIC',  baseHp: 265, level: 50 },
  { id: 'wyrdeer',      pokedexNo: 899,  name: 'WYRDEER',      type: 'PSYCHIC',  baseHp: 205, level: 24 },
  { id: 'kleavor',      pokedexNo: 900,  name: 'KLEAVOR',      type: 'ROCK',     baseHp: 195, level: 24 },
  { id: 'ursaluna',     pokedexNo: 901,  name: 'URSALUNA',     type: 'GROUND',   baseHp: 235, level: 28 },
  { id: 'basculegion',  pokedexNo: 902,  name: 'BASCULEGION',  type: 'GHOST',    baseHp: 220, level: 25 },
  { id: 'sneasler',     pokedexNo: 903,  name: 'SNEASLER',     type: 'FIGHTING', baseHp: 195, level: 24 },
  { id: 'overqwil',     pokedexNo: 904,  name: 'OVERQWIL',     type: 'DARK',     baseHp: 195, level: 23 },
  { id: 'enamorus',     pokedexNo: 905,  name: 'ENAMORUS',     type: 'FAIRY',    baseHp: 245, level: 45 },
  { id: 'sprigatito',   pokedexNo: 906,  name: 'SPRIGATITO',   type: 'GRASS',    baseHp: 130, level: 12 },
  { id: 'floragato',    pokedexNo: 907,  name: 'FLORAGATO',    type: 'GRASS',    baseHp: 160, level: 16 },
  { id: 'meowscarada',  pokedexNo: 908,  name: 'MEOWSCARADA',  type: 'DARK',     baseHp: 190, level: 22 },
  { id: 'fuecoco',      pokedexNo: 909,  name: 'FUECOCO',      type: 'FIRE',     baseHp: 140, level: 12 },
  { id: 'crocalor',     pokedexNo: 910,  name: 'CROCALOR',     type: 'FIRE',     baseHp: 170, level: 16 },
  { id: 'skeledirge',   pokedexNo: 911,  name: 'SKELEDIRGE',   type: 'GHOST',    baseHp: 205, level: 22 },
  { id: 'quaxly',       pokedexNo: 912,  name: 'QUAXLY',       type: 'WATER',    baseHp: 135, level: 12 },
  { id: 'quaxwell',     pokedexNo: 913,  name: 'QUAXWELL',     type: 'WATER',    baseHp: 165, level: 16 },
  { id: 'quaquaval',    pokedexNo: 914,  name: 'QUAQUAVAL',    type: 'FIGHTING', baseHp: 195, level: 22 },
  { id: 'lechonk',      pokedexNo: 915,  name: 'LECHONK',      type: 'NORMAL',   baseHp: 130, level: 10 },
  { id: 'oinkologne',   pokedexNo: 916,  name: 'OINKOLOGNE',   type: 'NORMAL',   baseHp: 210, level: 19 },
  { id: 'tarountula',   pokedexNo: 917,  name: 'TAROUNTULA',   type: 'BUG',      baseHp: 115, level: 9 },
  { id: 'spidops',      pokedexNo: 918,  name: 'SPIDOPS',      type: 'BUG',      baseHp: 165, level: 18 },
  { id: 'nymble',       pokedexNo: 919,  name: 'NYMBLE',       type: 'BUG',      baseHp: 115, level: 10 },
  { id: 'lokix',        pokedexNo: 920,  name: 'LOKIX',        type: 'DARK',     baseHp: 180, level: 20 },
  { id: 'pawmi',        pokedexNo: 921,  name: 'PAWMI',        type: 'ELECTRIC', baseHp: 125, level: 11 },
  { id: 'pawmo',        pokedexNo: 922,  name: 'PAWMO',        type: 'ELECTRIC', baseHp: 155, level: 16 },
  { id: 'pawmot',       pokedexNo: 923,  name: 'PAWMOT',       type: 'FIGHTING', baseHp: 190, level: 23 },
  { id: 'tandemaus',    pokedexNo: 924,  name: 'TANDEMAUS',    type: 'NORMAL',   baseHp: 130, level: 12 },
  { id: 'maushold',     pokedexNo: 925,  name: 'MAUSHOLD',     type: 'NORMAL',   baseHp: 180, level: 21 },
  { id: 'fidough',      pokedexNo: 926,  name: 'FIDOUGH',      type: 'FAIRY',    baseHp: 125, level: 11 },
  { id: 'dachsbun',     pokedexNo: 927,  name: 'DACHSBUN',     type: 'FAIRY',    baseHp: 175, level: 20 },
  { id: 'smoliv',       pokedexNo: 928,  name: 'SMOLIV',       type: 'GRASS',    baseHp: 120, level: 10 },
  { id: 'dolliv',       pokedexNo: 929,  name: 'DOLLIV',       type: 'GRASS',    baseHp: 150, level: 16 },
  { id: 'arboliva',     pokedexNo: 930,  name: 'ARBOLIVA',     type: 'GRASS',    baseHp: 195, level: 23 },
  { id: 'squawkabilly', pokedexNo: 931,  name: 'SQUAWKABILLY', type: 'FLYING',   baseHp: 165, level: 18 },
  { id: 'nacli',        pokedexNo: 932,  name: 'NACLI',        type: 'ROCK',     baseHp: 130, level: 12 },
  { id: 'naclstack',    pokedexNo: 933,  name: 'NACLSTACK',    type: 'ROCK',     baseHp: 165, level: 18 },
  { id: 'garganacl',    pokedexNo: 934,  name: 'GARGANACL',    type: 'ROCK',     baseHp: 215, level: 25 },
  { id: 'charcadet',    pokedexNo: 935,  name: 'CHARCADET',    type: 'FIRE',     baseHp: 125, level: 13 },
  { id: 'armarouge',    pokedexNo: 936,  name: 'ARMAROUGE',    type: 'PSYCHIC',  baseHp: 195, level: 24 },
  { id: 'ceruledge',    pokedexNo: 937,  name: 'CERULEDGE',    type: 'GHOST',    baseHp: 195, level: 24 },
  { id: 'tadbulb',      pokedexNo: 938,  name: 'TADBULB',      type: 'ELECTRIC', baseHp: 130, level: 11 },
  { id: 'bellibolt',    pokedexNo: 939,  name: 'BELLIBOLT',    type: 'ELECTRIC', baseHp: 210, level: 22 },
  { id: 'wattrel',      pokedexNo: 940,  name: 'WATTREL',      type: 'ELECTRIC', baseHp: 120, level: 11 },
  { id: 'kilowattrel',  pokedexNo: 941,  name: 'KILOWATTREL',  type: 'FLYING',   baseHp: 180, level: 21 },
  { id: 'maschiff',     pokedexNo: 942,  name: 'MASCHIFF',     type: 'DARK',     baseHp: 135, level: 12 },
  { id: 'mabosstiff',   pokedexNo: 943,  name: 'MABOSSTIFF',   type: 'DARK',     baseHp: 190, level: 22 },
  { id: 'shroodle',     pokedexNo: 944,  name: 'SHROODLE',     type: 'POISON',   baseHp: 120, level: 11 },
  { id: 'grafaiai',     pokedexNo: 945,  name: 'GRAFAIAI',     type: 'POISON',   baseHp: 175, level: 20 },
  { id: 'bramblin',     pokedexNo: 946,  name: 'BRAMBLIN',     type: 'GRASS',    baseHp: 120, level: 11 },
  { id: 'brambleghast', pokedexNo: 947,  name: 'BRAMBLEGHAST', type: 'GHOST',    baseHp: 175, level: 21 },
  { id: 'toedscool',    pokedexNo: 948,  name: 'TOEDSCOOL',    type: 'GROUND',   baseHp: 125, level: 12 },
  { id: 'toedscruel',   pokedexNo: 949,  name: 'TOEDSCRUEL',   type: 'GROUND',   baseHp: 190, level: 22 },
  { id: 'klawf',        pokedexNo: 950,  name: 'KLAWF',        type: 'ROCK',     baseHp: 175, level: 20 },
  { id: 'capsakid',     pokedexNo: 951,  name: 'CAPSAKID',     type: 'GRASS',    baseHp: 125, level: 11 },
  { id: 'scovillain',   pokedexNo: 952,  name: 'SCOVILLAIN',   type: 'FIRE',     baseHp: 180, level: 21 },
  { id: 'rellor',       pokedexNo: 953,  name: 'RELLOR',       type: 'BUG',      baseHp: 120, level: 11 },
  { id: 'rabsca',       pokedexNo: 954,  name: 'RABSCA',       type: 'PSYCHIC',  baseHp: 180, level: 21 },
  { id: 'flittle',      pokedexNo: 955,  name: 'FLITTLE',      type: 'PSYCHIC',  baseHp: 115, level: 10 },
  { id: 'espathra',     pokedexNo: 956,  name: 'ESPATHRA',     type: 'PSYCHIC',  baseHp: 195, level: 22 },
  { id: 'tinkatink',    pokedexNo: 957,  name: 'TINKATINK',    type: 'FAIRY',    baseHp: 125, level: 12 },
  { id: 'tinkatuff',    pokedexNo: 958,  name: 'TINKATUFF',    type: 'STEEL',    baseHp: 160, level: 18 },
  { id: 'tinkaton',     pokedexNo: 959,  name: 'TINKATON',     type: 'STEEL',    baseHp: 200, level: 25 },
  { id: 'wiglett',      pokedexNo: 960,  name: 'WIGLETT',      type: 'WATER',    baseHp: 110, level: 10 },
  { id: 'wugtrio',      pokedexNo: 961,  name: 'WUGTRIO',      type: 'WATER',    baseHp: 160, level: 19 },
  { id: 'bombirdier',   pokedexNo: 962,  name: 'BOMBIRDIER',   type: 'FLYING',   baseHp: 180, level: 20 },
  { id: 'finizen',      pokedexNo: 963,  name: 'FINIZEN',      type: 'WATER',    baseHp: 140, level: 13 },
  { id: 'palafin',      pokedexNo: 964,  name: 'PALAFIN',      type: 'WATER',    baseHp: 215, level: 25 },
  { id: 'varoom',       pokedexNo: 965,  name: 'VAROOM',       type: 'STEEL',    baseHp: 130, level: 13 },
  { id: 'revavroom',    pokedexNo: 966,  name: 'REVAVROOM',    type: 'STEEL',    baseHp: 190, level: 23 },
  { id: 'cyclizar',     pokedexNo: 967,  name: 'CYCLIZAR',     type: 'DRAGON',   baseHp: 180, level: 21 },
  { id: 'orthworm',     pokedexNo: 968,  name: 'ORTHWORM',     type: 'STEEL',    baseHp: 180, level: 21 },
  { id: 'glimmet',      pokedexNo: 969,  name: 'GLIMMET',      type: 'ROCK',     baseHp: 130, level: 13 },
  { id: 'glimmora',     pokedexNo: 970,  name: 'GLIMMORA',     type: 'POISON',   baseHp: 195, level: 24 },
  { id: 'greavard',     pokedexNo: 971,  name: 'GREAVARD',     type: 'GHOST',    baseHp: 130, level: 13 },
  { id: 'houndstone',   pokedexNo: 972,  name: 'HOUNDSTONE',   type: 'GHOST',    baseHp: 185, level: 22 },
  { id: 'flamigo',      pokedexNo: 973,  name: 'FLAMIGO',      type: 'FLYING',   baseHp: 185, level: 20 },
  { id: 'cetoddle',     pokedexNo: 974,  name: 'CETODDLE',     type: 'ICE',      baseHp: 165, level: 14 },
  { id: 'cetitan',      pokedexNo: 975,  name: 'CETITAN',      type: 'ICE',      baseHp: 245, level: 25 },
  { id: 'veluza',       pokedexNo: 976,  name: 'VELUZA',       type: 'WATER',    baseHp: 185, level: 20 },
  { id: 'dondozo',      pokedexNo: 977,  name: 'DONDOZO',      type: 'WATER',    baseHp: 250, level: 25 },
  { id: 'tatsugiri',    pokedexNo: 978,  name: 'TATSUGIRI',    type: 'DRAGON',   baseHp: 165, level: 20 },
  { id: 'annihilape',   pokedexNo: 979,  name: 'ANNIHILAPE',   type: 'GHOST',    baseHp: 220, level: 27 },
  { id: 'clodsire',     pokedexNo: 980,  name: 'CLODSIRE',     type: 'POISON',   baseHp: 225, level: 22 },
  { id: 'farigiraf',    pokedexNo: 981,  name: 'FARIGIRAF',    type: 'PSYCHIC',  baseHp: 215, level: 23 },
  { id: 'dudunsparce',  pokedexNo: 982,  name: 'DUDUNSPARCE',  type: 'NORMAL',   baseHp: 215, level: 23 },
  { id: 'kingambit',    pokedexNo: 983,  name: 'KINGAMBIT',    type: 'STEEL',    baseHp: 220, level: 28 },
  { id: 'great_tusk',   pokedexNo: 984,  name: 'GREAT TUSK',   type: 'GROUND',   baseHp: 245, level: 42 },
  { id: 'scream_tail',  pokedexNo: 985,  name: 'SCREAM TAIL',  type: 'FAIRY',    baseHp: 245, level: 42 },
  { id: 'brute_bonnet', pokedexNo: 986,  name: 'BRUTE BONNET', type: 'DARK',     baseHp: 245, level: 42 },
  { id: 'flutter_mane', pokedexNo: 987,  name: 'FLUTTER MANE', type: 'GHOST',    baseHp: 230, level: 42 },
  { id: 'slither_wing', pokedexNo: 988,  name: 'SLITHER WING', type: 'FIGHTING', baseHp: 240, level: 42 },
  { id: 'sandy_shocks', pokedexNo: 989,  name: 'SANDY SHOCKS', type: 'ELECTRIC', baseHp: 240, level: 42 },
  { id: 'iron_treads',  pokedexNo: 990,  name: 'IRON TREADS',  type: 'STEEL',    baseHp: 240, level: 42 },
  { id: 'iron_bundle',  pokedexNo: 991,  name: 'IRON BUNDLE',  type: 'ICE',      baseHp: 230, level: 42 },
  { id: 'iron_hands',   pokedexNo: 992,  name: 'IRON HANDS',   type: 'FIGHTING', baseHp: 265, level: 42 },
  { id: 'iron_jugulis', pokedexNo: 993,  name: 'IRON JUGULIS', type: 'DARK',     baseHp: 240, level: 42 },
  { id: 'iron_moth',    pokedexNo: 994,  name: 'IRON MOTH',    type: 'FIRE',     baseHp: 235, level: 42 },
  { id: 'iron_thorns',  pokedexNo: 995,  name: 'IRON THORNS',  type: 'ROCK',     baseHp: 245, level: 42 },
  { id: 'frigibax',     pokedexNo: 996,  name: 'FRIGIBAX',     type: 'DRAGON',   baseHp: 135, level: 14 },
  { id: 'arctibax',     pokedexNo: 997,  name: 'ARCTIBAX',     type: 'ICE',      baseHp: 175, level: 20 },
  { id: 'baxcalibur',   pokedexNo: 998,  name: 'BAXCALIBUR',   type: 'DRAGON',   baseHp: 225, level: 28 },
  { id: 'gimmighoul',   pokedexNo: 999,  name: 'GIMMIGHOUL',   type: 'GHOST',    baseHp: 125, level: 12 },
  { id: 'gholdengo',    pokedexNo: 1000, name: 'GHOLDENGO',    type: 'STEEL',    baseHp: 215, level: 27 },
  { id: 'wo_chien',     pokedexNo: 1001, name: 'WO-CHIEN',     type: 'DARK',     baseHp: 255, level: 48 },
  { id: 'chien_pao',    pokedexNo: 1002, name: 'CHIEN-PAO',    type: 'ICE',      baseHp: 250, level: 48 },
  { id: 'ting_lu',      pokedexNo: 1003, name: 'TING-LU',      type: 'GROUND',   baseHp: 280, level: 48 },
  { id: 'chi_yu',       pokedexNo: 1004, name: 'CHI-YU',       type: 'FIRE',     baseHp: 245, level: 48 },
  { id: 'roaring_moon', pokedexNo: 1005, name: 'ROARING MOON', type: 'DRAGON',   baseHp: 255, level: 48 },
  { id: 'iron_valiant', pokedexNo: 1006, name: 'IRON VALIANT', type: 'FAIRY',    baseHp: 245, level: 48 },
  { id: 'koraidon',     pokedexNo: 1007, name: 'KORAIDON',     type: 'FIGHTING', baseHp: 370, level: 60 },
  { id: 'miraidon',     pokedexNo: 1008, name: 'MIRAIDON',     type: 'ELECTRIC', baseHp: 370, level: 60 },
  { id: 'walking_wake', pokedexNo: 1009, name: 'WALKING WAKE', type: 'WATER',    baseHp: 255, level: 48 },
  { id: 'iron_leaves',  pokedexNo: 1010, name: 'IRON LEAVES',  type: 'PSYCHIC',  baseHp: 250, level: 48 },
  { id: 'dipplin',      pokedexNo: 1011, name: 'DIPPLIN',      type: 'DRAGON',   baseHp: 185, level: 22 },
  { id: 'poltchageist', pokedexNo: 1012, name: 'POLTCHAGEIST', type: 'GRASS',    baseHp: 125, level: 13 },
  { id: 'sinistcha',    pokedexNo: 1013, name: 'SINISTCHA',    type: 'GHOST',    baseHp: 185, level: 22 },
  { id: 'okidogi',      pokedexNo: 1014, name: 'OKIDOGI',      type: 'POISON',   baseHp: 255, level: 48 },
  { id: 'munkidori',    pokedexNo: 1015, name: 'MUNKIDORI',    type: 'PSYCHIC',  baseHp: 250, level: 48 },
  { id: 'fezandipiti',  pokedexNo: 1016, name: 'FEZANDIPITI',  type: 'FAIRY',    baseHp: 250, level: 48 },
  { id: 'ogerpon',      pokedexNo: 1017, name: 'OGERPON',      type: 'GRASS',    baseHp: 255, level: 50 },
  { id: 'archaludon',   pokedexNo: 1018, name: 'ARCHALUDON',   type: 'DRAGON',   baseHp: 220, level: 28 },
  { id: 'hydrapple',    pokedexNo: 1019, name: 'HYDRAPPLE',    type: 'DRAGON',   baseHp: 225, level: 28 },
  { id: 'gouging_fire', pokedexNo: 1020, name: 'GOUGING FIRE', type: 'FIRE',     baseHp: 260, level: 50 },
  { id: 'raging_bolt',  pokedexNo: 1021, name: 'RAGING BOLT',  type: 'ELECTRIC', baseHp: 265, level: 50 },
  { id: 'iron_boulder', pokedexNo: 1022, name: 'IRON BOULDER', type: 'ROCK',     baseHp: 250, level: 50 },
  { id: 'iron_crown',   pokedexNo: 1023, name: 'IRON CROWN',   type: 'STEEL',    baseHp: 250, level: 50 },
  { id: 'terapagos',    pokedexNo: 1024, name: 'TERAPAGOS',    type: 'NORMAL',   baseHp: 375, level: 60 },
  { id: 'pecharunt',    pokedexNo: 1025, name: 'PECHARUNT',    type: 'POISON',   baseHp: 265, level: 55 }

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
  ]},
  starly: { palette: { p: '#78716c', d: '#1c1917', l: '#f8fafc', s: '#f97316', b: '#0f172a' }, grid: [
    "................","......dd........",".....dddd.......","....dlllld......","...ddlbpbld.....","...ddllllss.....","..pppppppppp....",".pppppppppppp...","..ppppdddddd....",".....s...s......","....ss...ss.....","................","................","................","................","................"
  ]},
  staravia: { palette: { p: '#78716c', d: '#1c1917', l: '#f8fafc', s: '#f97316', b: '#0f172a' }, grid: [
    "......ddd.......",".....ddddd......","....ddlllld.....","...ddlbppbld....","...ddllllss.....","..dddddddddd....",".pppppppppppp...",".pppppllllppp...","..ppppddddpp....",".....s....s.....","....ss....ss....","................","................","................","................","................"
  ]},
  staraptor: { palette: { p: '#57534e', d: '#1c1917', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: [
    ".....ssdd.......","....sssddd......","...ssdlllld.....","....dlbppbld....",".pp.ddddddss.pp.","pppppllllllppppp","pppppllllllppppp",".ppp.dddddd.ppp.","....pppppppp....",".....d....d.....","................","................","................","................","................","................"
  ]},
  bidoof: { palette: { p: '#b45309', d: '#78350f', l: '#fef3c7', s: '#ef4444', b: '#0f172a' }, grid: [
    "................","....pp....pp....","...pppppppppp...","..ppppbppbpppp..","..pppplsslpppp..","..ppppllllpppp..","..ddddppppdddd..",".dppppppppppppd.","..ddddppppdddd..","...dd......dd...","................","................","................","................","................","................"
  ]},
  bibarel: { palette: { p: '#92400e', d: '#451a03', l: '#fde68a', s: '#ef4444', b: '#0f172a' }, grid: [
    "...pp......pp...","..pppppppppppp..","..ppllbppbllpp..","..pplllsslllpp..","...pppllllppp...","..pppppppppppp..",".pppllllllllppp.",".pppllllllllppp.d","..ppppppppppppdd","...ddd....ddd...","................","................","................","................","................","................"
  ]},
  kricketot: { palette: { p: '#ef4444', d: '#7f1d1d', l: '#fde047', s: '#1e293b', b: '#0f172a' }, grid: [
    "....ss....ss....",".....s....s.....","....pppppppp....","...pppbppbppp...","....ppllllpp....","...ppsllllspp...","..pppppppppppp..","...pppplllppp...","....dddddddd....",".....ss..ss.....","................","................","................","................","................","................"
  ]},
  kricketune: { palette: { p: '#dc2626', d: '#7f1d1d', l: '#fef08a', s: '#1e293b', b: '#0f172a' }, grid: [
    "...ss......ss...","....s.pppp.s....","....pppppppp....","...sspbppbpss...","..sssspppppssss.","....ppllllpp....","..ssppddddppss..",".ss.pppppppp.ss.","....ppp..ppp....","....ss....ss....","................","................","................","................","................","................"
  ]},
  shinx: { palette: { p: '#38bdf8', d: '#1e293b', l: '#facc15', b: '#0f172a' }, grid: [
    "..pp........pp..",".pllp......pllp.","..pppppppppppp..","..pppbppppbppp..","...dddddddddd...", "...dddddddddd..l","...pppppppppp.ll","...pp......pp..l","...dd......dd...","................","................","................","................","................","................","................"
  ]},
  luxio: { palette: { p: '#38bdf8', d: '#0f172a', l: '#facc15', b: '#0f172a' }, grid: [
    "..dd........dd..",".dppd.dddd.dppd.","..ddddppppdddd..","..ddpbppppbpdd..","...dddddddddd...", "..ddddppppdddd.l",".ddppddddddppdll","...pp......pp...", "...dd......dd...", "................","................","................","................","................","................","................"
  ]},
  luxray: { palette: { p: '#1e293b', d: '#38bdf8', l: '#facc15', b: '#0f172a' }, grid: [
    "..pppp....pppp..",".pppppppppppppp.",".ppppddddddpppp.","..pppdlbbldppp..","..ppppddddpppp..",".pppppppppppppp.",".ppddddddddddpp.","..ddpp....ppdd.l","...dd......dd.ll","................","................","................","................","................","................","................"
  ]},
  roserade: { palette: { p: '#22c55e', d: '#15803d', l: '#f8fafc', s: '#ef4444', t: '#3b82f6', b: '#0f172a' }, grid: [
    ".....llllll.....","....llllllll....","...llpppppp.ll..","...ppppbppbpp...","..ss.dddddd.tt..",".sssspppppptttt.","..ss.dddddd.tt..","....dddddddd....","....ppp..ppp....",".....p....p.....","................","................","................","................","................","................"
  ]},
  cranidos: { palette: { p: '#64748b', d: '#334155', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [
    "....llllllll....","...llllllllll...","..llppppppppll..","..ppppbppbpppp..","...pppppppppp...","..ppppddddpppp..","...pppppppppp.pp","....pp....pp.pp.","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  rampardos: { palette: { p: '#475569', d: '#1e293b', l: '#38bdf8', s: '#f8fafc', b: '#0f172a' }, grid: [
    "..ss..llll..ss..","...llllllllll...","..ddlllllllldd..","..ppppbppbpppp..",".ppppddddddpppp.",".ppppddddddpppp.","..ppppppppppppd.","...ppp....pppdd.","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  shieldon: { palette: { p: '#facc15', d: '#334155', l: '#f8fafc', b: '#0f172a' }, grid: [
    "....dddddddd....","...ddppppppdd...","..ddppppppppdd..","..ddppbppbppdd..","..ddppllllppdd..","...dddddddddd...", "...llllllllll...","...dd..dd..dd...","................","................","................","................","................","................","................","................"
  ]},
  bastiodon: { palette: { p: '#334155', d: '#1e293b', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [
    ".ll..ll..ll..ll.",".dddddddddddddd.",".ddllpppppplldd.",".ddppppppppppdd.",".ddpppbppbpppdd.",".ddssssssssssdd.","..dddddddddddd..","..lll..ll..lll..","..ddd..dd..ddd..","................","................","................","................","................","................","................"
  ]},
  burmy: { palette: { p: '#16a34a', d: '#14532d', l: '#facc15', s: '#1e293b', b: '#0f172a' }, grid: [
    ".......ss.......","......ssss......",".....ssssss.....","....sslbbllss...","...pppppppppp...","..ppddddddddpp..","..ppppddddpppp..","...ppddddddpp...","....pppppppp....",".....dddddd.....","................","................","................","................","................","................"
  ]},
  wormadam: { palette: { p: '#15803d', d: '#14532d', l: '#86efac', s: '#facc15', b: '#0f172a' }, grid: [
    "......dddd......",".....dddddd.....","....ddsbbsdd....","...pppppppppp...","..ppllllllllpp..",".pppddddddddppp.",".pppllllllllppp.","..pppddddddppp..","...pppppppppp...",".....dddddd.....","................","................","................","................","................","................"
  ]},
  mothim: { palette: { p: '#f97316', d: '#78350f', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    ".ll..........ll.","llll..dddd..llll","lpppl.dsbd.lpppl","lpppplddddlppppl",".lppppddddppppl.","..llllddddllll..",".ll..dddddd..ll.","......d..d......","................","................","................","................","................","................","................","................"
  ]},
  combee: { palette: { p: '#facc15', d: '#d97706', l: '#e0f2fe', s: '#ef4444', b: '#0f172a' }, grid: [
    ".ll..........ll.","llll.pp..pp.llll",".ll.pppppppp.ll.","...ppbp..pbpp...","...ppsp..pspp...","....pppppppp....",".....pppbpp.....",".....pppppp.....","................","................","................","................","................","................","................","................"
  ]},
  vespiquen: { palette: { p: '#eab308', d: '#1e293b', l: '#ef4444', s: '#fde047', b: '#0f172a' }, grid: [
    ".....dddddd.....","....ddllldd.....","....pppbppbp....","..ss..dddd..ss..",".ss..pppppp..ss.","....dddddddd....","...pppppppppp...","..ppddddddddpp..","..ppppddddpppp..","...dddddddddd...","................","................","................","................","................","................"
  ]},
  pachirisu: { palette: { p: '#f8fafc', d: '#38bdf8', l: '#fde047', b: '#0f172a' }, grid: [
    "..dd........dd..",".dpp........ppd.","..ppppddddpppp..","..ppbppppppbpp..","..pplpppppplpp..","...pppppppppp.dd","...ppppddppppddd","...ppppppppppdd.","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  buizel: { palette: { p: '#f97316', d: '#c2410c', l: '#fef08a', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pppppppp....","....ppbppbpp....","...llllllllll...","..llllllllllll..","...pppppppppp.p.","...ppsspp.pp.pp.","....pp....pp....","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  floatzel: { palette: { p: '#ea580c', d: '#9a3412', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: [
    "....pppppppp....","...pppbppbppp...","..llllllllllll..",".lllpppppppplll.",".lllpppppppplll.","..lllpppppp.lll.","...ppsspppp..pp.","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  cherubi: { palette: { p: '#f43f5e', d: '#be185d', l: '#22c55e', b: '#0f172a' }, grid: [
    "......llll......","....llllllll....","......l..l......","...pppppppp.....","..pppppppppp.pp.","..pppbppbppppppp","..pppppppppppppp","...pppppppp..pp.","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  cherrim: { palette: { p: '#f472b6', d: '#db2777', l: '#fde047', s: '#22c55e', b: '#0f172a' }, grid: [
    "....pppppppp....","..ppddddddddpp..",".ppddppppppddpp.",".ppdpplbbplpdpp.","..ppllllllllpp..","...ssssssssss...","..ss.llllll.ss..",".....ll..ll.....","................","................","................","................","................","................","................","................"
  ]},
  shellos: { palette: { p: '#f472b6', d: '#db2777', l: '#ffffff', s: '#fde047', b: '#0f172a' }, grid: [
    "....ss....ss....","...pppppppppp...","...ppbppppbpp...","....llllllll....","....pppppppp....","..pppppppppppp..",".ppddddddddddpp.",".llllllllllllll.","................","................","................","................","................","................","................","................"
  ]},
  gastrodon: { palette: { p: '#f472b6', d: '#78350f', l: '#4ade80', s: '#fde047', b: '#0f172a' }, grid: [
    "..ss..pppp..ss..","...pppppppppp...","...ppbppppbpp...","...llllllllll...","..ddddppppdddd..",".ddddddppdddddd.",".ppppdddddddppp.",".llllllllllllll.","................","................","................","................","................","................","................","................"
  ]},
  ambipom: { palette: { p: '#a855f7', d: '#6b21a8', l: '#fde68a', b: '#0f172a' }, grid: [
    ".....p.pp.p.....","....pppppppp....","...pplbppblpp...","...ppllllllpp...","..pp.pppppp.pp..",".pp..pppppp..pp.","ll...pp..pp...ll","ll...ll..ll...ll","................","................","................","................","................","................","................","................"
  ]},
  drifloon: { palette: { p: '#a855f7', d: '#6b21a8', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [
    ".....ssssss.....","....ssssssss....","...pppppppppp...","..ppppbllbppppp.","..ppplllllppppp.","..ppppbllbppppp.","...pppppppppp...",".....p....p.....","....l......l....","................","................","................","................","................","................","................"
  ]},
  drifblim: { palette: { p: '#9333ea', d: '#581c87', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "....llllllll....","..pppppppppppp..",".pppppbllbppppp.",".pppplllllppppp.",".pppppbllbppppp.","..ssssssssssss..","...p..p..p..p...","...l..l..l..l...","................","................","................","................","................","................","................","................"
  ]},
  buneary: { palette: { p: '#92400e', d: '#451a03', l: '#fef3c7', b: '#0f172a' }, grid: [
    "...ll......ll...","..llll....llll..","...pp......pp...","....pppppppp....","....ppbppbpp....","...llllllllll...", "..llllllllllll..","...pppppppppp...","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  lopunny: { palette: { p: '#92400e', d: '#451a03', l: '#fef3c7', b: '#0f172a' }, grid: [
    "..llll....llll..",".llpp......ppll.",".lpp..pppp..ppl.",".ll..ppbppb..ll.","....llllllll....","...pppppppppp...", "...pppppppppp...", "....ppp..ppp....","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  mismagius: { palette: { p: '#6b21a8', d: '#3b0764', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "......dddd......","....pppppppp....","..ddddppppdddd..",".pppppppppppppp.","....ppsbbspp....","....llllllll....","...pppppppppp...","..ppppddddpppp..","...pp.dddd.pp...","................","................","................","................","................","................","................"
  ]},
  honchkrow: { palette: { p: '#1e293b', d: '#0f172a', l: '#f8fafc', s: '#dc2626', b: '#0f172a' }, grid: [
    "....pppppppp....","..ddddppppdddd..","...ssssssssss...","....ppbppbpp....","...llllllllll...", "..llllllllllll..",".ppppllllllpppp.","..ddddppppdddd..",".....s....s.....","................","................","................","................","................","................","................"
  ]},
  glameow: { palette: { p: '#94a3b8', d: '#475569', l: '#f8fafc', s: '#f472b6', b: '#0f172a' }, grid: [
    "..ss........ss..",".spps......spps.","..pppppppppppp..","..pplbppppblpp..","...llllllllll.pp","....pppppppp.pp.","....pppppppppp..","....ll....ll....","................","................","................","................","................","................","................","................"
  ]},
  purugly: { palette: { p: '#64748b', d: '#334155', l: '#f8fafc', s: '#db2777', b: '#0f172a' }, grid: [
    "..ss........ss..","..pppppppppppp..","..pppbppppbppp..","..llllllllllll..",".pppppppppppppp.",".ppppllllllpppp.","..pppppppppppp.s","...lll....lll.ss","................","................","................","................","................","................","................","................"
  ]},
  chingling: { palette: { p: '#facc15', d: '#ca8a04', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: [
    "....ll....ll....","...llllllllll...","....pppppppp....","...pppppppppp...","..ppppbppbpppp..","..ppppddddpppp..","...pppppppppp...","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  stunky: { palette: { p: '#581c87', d: '#3b0764', l: '#fef3c7', s: '#ef4444', b: '#0f172a' }, grid: [
    "...........ppp..","..pp..pp..ppppp.",".pppplllpp.ppppp",".ppbppppbp..ppp.","..ppppppppppp...","..pplllllpppp...","...pp......pp...","...dd......dd...","................","................","................","................","................","................","................","................"
  ]},
  skuntank: { palette: { p: '#581c87', d: '#3b0764', l: '#fef3c7', s: '#f43f5e', b: '#0f172a' }, grid: [
    "...ppppllllllll.","..ppppppppppppl.",".pppppppppp.....",".pppbppbppp.ppp.","..ppssssppppppp.","..pplllllpppppp.","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................","................"
  ]},
  bronzor: { palette: { p: '#0284c7', d: '#0f766e', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: [
    "......llll......","...llpppppp.ll..","..ppppddddpppp..",".ppddppssppddpp.",".ppdsbpddpbsdpp.",".ppddppssppddpp.","..ppppddddpppp..","...llpppppp.ll..","......llll......","................","................","................","................","................","................","................"
  ]},
  bronzong: { palette: { p: '#0284c7', d: '#0f766e', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [
    "..ddd.pppp.ddd..",".ddd.pppppp.ddd.",".dd..ppddpp..dd.","....pppppppp....","...ppdsbbspdp...","...ppddddddpp...","..pppppppppppp..","..dddddddddddd..","................","................","................","................","................","................","................","................"
  ]},
  bonsly: { palette: { p: '#92400e', d: '#451a03', l: '#22c55e', s: '#facc15', b: '#0f172a' }, grid: [
    "......llll......",".....llllll.....","......llll......","....pppppppp....","...pppppppppp...","...pppbppbppp...","...ppspppppspp..","....dddddddd....",".....pp..pp.....","................","................","................","................","................","................","................"
  ]},
  mime_jr: { palette: { p: '#f472b6', d: '#1d4ed8', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: [
    "......dddd......",".....dddddd.....","....dddddddd....","...pppppppppp...","...pppbppbppp...","...ppppllpppp...","....ssssssss....","....pppppppp....",".....dd..dd.....","................","................","................","................","................","................","................"
  ]},
  happiny: { palette: { p: '#f9a8d4', d: '#db2777', l: '#ffffff', b: '#0f172a' }, grid: [
    ".......dd.......",".....pppppp.....","....pppppppp....","...pppppppppp...","...pppbppbppp...","...dddddddddd...", "..ddddllllldddd.","...dddddddddd...","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  chatot: { palette: { p: '#0f172a', d: '#2563eb', l: '#facc15', s: '#22c55e', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pppppppp....","....pppppppp....","....ppbppllp....",".....ppppss.....","...dddddddddd...","..dssddddddssd..","...dddddddddd...",".....ll..ll.....","................","................","................","................","................","................","................"
  ]},
  spiritomb: { palette: { p: '#9333ea', d: '#581c87', l: '#22c55e', s: '#a8a29e', b: '#0f172a' }, grid: [
    "....pppppppp....","..ppddddddddpp..",".ppdllppppplldp.",".ppdlbppllbpldp.",".ppdllppppplldp.","..ppddddddddpp..","....pppppppp....","....ssssssss....","...ssssssssss...","................","................","................","................","................","................","................"
  ]},
  gible: { palette: { p: '#38bdf8', d: '#1d4ed8', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "......pppp......","....pppppppp....","...pppppppppp...","..ppppbppbpppp..","..ppllllllllpp..","..ppllssssllpp..","...ppllllllpp...", "....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  gabite: { palette: { p: '#2563eb', d: '#1e3a8a', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "...pp......pp...","....pppppppp....","...ppsbppbspl...","..pppppppppppp..",".pp.llllllll.pp.",".p..llllllll..p.","....pppppppp.dd.","....pp....pp....","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  garchomp: { palette: { p: '#1e3a8a', d: '#dc2626', l: '#facc15', b: '#0f172a' }, grid: [
    "..pp........pp..",".pppp.pppp.pppp.","..pp.ppllpp.pp..","....ppbppbpp....","..ppppddddpppp..",".pp..dddddd..pp.","pp...dddddd...pp","....pppppppp.pp.","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................"
  ]},
  munchlax: { palette: { p: '#0f766e', d: '#134e4a', l: '#fef3c7', b: '#0f172a' }, grid: [
    "...pp......pp...","...pppppppppp...","..ppppbppbpppp..","..ppppllllpppp..","..pppppppppppp..",".ppppllllllpppp.",".ppppllllllpppp.","..pppppppppppp..","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  riolu: { palette: { p: '#38bdf8', d: '#1e293b', l: '#fde047', b: '#0f172a' }, grid: [
    "....dd....dd....","...dddd..dddd...","...pppppppppp...","...ddbppppbdd...","....pppppppp....","....llllllll....","..pppppppppppp..","....pppppppp.pp.","....pp....pp....","...ddd....ddd...","................","................","................","................","................","................"
  ]},
  hippopotas: { palette: { p: '#d97706', d: '#78350f', l: '#fef3c7', b: '#0f172a' }, grid: [
    "................","....dd....dd....","..pppppppppppp..",".ppddbppppbddpp.",".pppppppppppppp.",".pppddddddddppp.","..pppppppppppp..","...dd..dd..dd...","................","................","................","................","................","................","................","................"
  ]},
  hippowdon: { palette: { p: '#92400e', d: '#451a03', l: '#f59e0b', s: '#ef4444', b: '#0f172a' }, grid: [
    "....dddddddd....","..ddppppppppdd..",".pppppsbppbsplp.",".ppddddddddddpp.","llllppppppppllll","llllllppppllllll",".llllllllllllll.","................","................","................","................","................","................","................","................","................"
  ]},
  skorupi: { palette: { p: '#a855f7', d: '#581c87', l: '#f472b6', b: '#0f172a' }, grid: [
    "..........pppp..",".........ppddpp.","..pp..pp..pppp..",".pppppppp..pp...",".pppbppbpppp....","..pppppppppp....","...dd..dd..dd...","................","................","................","................","................","................","................","................","................"
  ]},
  drapion: { palette: { p: '#7e22ce', d: '#3b0764', l: '#f43f5e', b: '#0f172a' }, grid: [
    ".........pppppp.","..pp....ppddddpp",".pppp..pppp..pp.",".pppbppbppp.....",".ppppddddddpppp.","..pppppppppppp..","...dd..dd..dd...","................","................","................","................","................","................","................","................","................"
  ]},
  croagunk: { palette: { p: '#1d4ed8', d: '#1e3a8a', l: '#f97316', s: '#ffffff', b: '#0f172a' }, grid: [
    "....pp....pp....","...pppppppppp...","..ppsbppppbspp..","..ppllppppllpp..","...ppsssssspp...","..pppppppppppp..","..ss.pppppp.ss..","....pp....pp....","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  toxicroak: { palette: { p: '#1d4ed8', d: '#1e3a8a', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "......llll......","....pppppppp....","...ppsbppbspl...","...pplllllllp...","..pppppppppppp..",".pp..dddddd..pp.","ll...pppppp...ll","....ppp..ppp....","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  carnivine: { palette: { p: '#84cc16', d: '#15803d', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "...pppppppppp...","..ppppbppbpppp..",".pppllllllllppp.",".pppssssssssppp.","..pppppppppppp..","..dd..dddd..dd..",".dd...dddd...dd.","....dd.dd.dd....","................","................","................","................","................","................","................","................"
  ]},
  finneon: { palette: { p: '#1e293b', d: '#38bdf8', l: '#f472b6', b: '#0f172a' }, grid: [
    "................","......dddd......","....pppppppp.dd.","..ppppbppppppddd",".ppppllllllllddd","..dddddddddddd..","......dddd......","................","................","................","................","................","................","................","................","................"
  ]},
  lumineon: { palette: { p: '#0f172a', d: '#38bdf8', l: '#f472b6', b: '#0f172a' }, grid: [
    "...dddd..dddd...","..ddllpppp.lld..",".ddllpbpppp.lld.",".ddllllllllllld.","..ddllpppp.lld..","...dddd..dddd...","................","................","................","................","................","................","................","................","................","................"
  ]},
  mantyke: { palette: { p: '#38bdf8', d: '#1d4ed8', l: '#f8fafc', b: '#0f172a' }, grid: [
    "....d......d....",".....d....d.....","..pp.pppppp.pp..",".pppppbppbppppp.","..ppppllllpppp..","...pp.llll.pp...","......pppp......","................","................","................","................","................","................","................","................","................"
  ]},
  snover: { palette: { p: '#f8fafc', d: '#a16207', l: '#22c55e', b: '#0f172a' }, grid: [
    "......pppp......","....pppppppp....","...pppppppppp...","...pplbppblpp...","..llllppppllll..","..dddddddddddd..","...dddddddddd...", "....dd....dd....","................","................","................","................","................","................","................","................"
  ]},
  abomasnow: { palette: { p: '#f8fafc', d: '#15803d', l: '#a855f7', b: '#0f172a' }, grid: [
    "....pppppppp....","..pppppppppppp..",".pppppbppbppppp.",".ppppddddddpppp.","pppppppppppppppp","pppddddddddddppp",".pp..llllll..pp.","....ppp..ppp....","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  weavile: { palette: { p: '#1e293b', d: '#0f172a', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "...llllllllll...","..llllllllllll..","...llpppppp.ll..","....ppsbbspp....","...llllllllll...","..pppppppppppp..",".ss..pppppp..ss.","....pppppppp.ll.","....pp....pp....","...ss......ss...","................","................","................","................","................","................"
  ]},
  magnezone: { palette: { p: '#94a3b8', d: '#334155', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    ".......ll.......","......dddd......","...pppppppppp...","..ppppddddpppp..",".llppppssppppll.",".ssppppppppppss.","..ddddppppdddd..","....dddddddd....","................","................","................","................","................","................","................","................"
  ]},
  lickilicky: { palette: { p: '#f472b6', d: '#db2777', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: [
    "......pppp......","....pppppppp....","...pppbppbppp...","..ppppddddpppp..","..pppddddddppp..",".ppppddddddpppp.",".pppllllllllppp.","..ppsssssssspp..","...ppp....ppp...","................","................","................","................","................","................","................"
  ]},
  rhyperior: { palette: { p: '#44403c', d: '#1c1917', l: '#f97316', s: '#facc15', b: '#0f172a' }, grid: [
    ".......ss.......","...pp.pppp.pp...","..ppppbppbpppp..",".pppllppppllppp.","llllppppppppllll","llllllppppllllll",".ppppllllllpppp.","..ppp......ppp..","..lll......lll..","................","................","................","................","................","................","................"
  ]},
  tangrowth: { palette: { p: '#1e3a8a', d: '#172554', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: [
    "...pppppppppp...","..ppdpdppdpdpp..",".ppppdddddddppp.",".pppdsbppbsdpdp.","ppppddddddddpppp","ppllppppppppllpp","..ll.pppppp.ll..","....lll..lll....","................","................","................","................","................","................","................","................"
  ]},
  electivire: { palette: { p: '#facc15', d: '#0f172a', l: '#ef4444', b: '#0f172a' }, grid: [
    "...l........l...","..dd..pppp..dd..","...pppppppppp...","...pppbppbppp...",".ppppddddddpppp.","ppddppppppppddpp","pp.pppddddppp.pp","...ppp....ppp.dd","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  magmortar: { palette: { p: '#dc2626', d: '#7f1d1d', l: '#facc15', s: '#f472b6', b: '#0f172a' }, grid: [
    "....llllllll....","...pppppppppp...","...pppbppbppp...","..pppppppppppp..",".llpppplllpppll.","llllllppppllllll",".dd..pppppp..dd.","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  togekiss: { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#ef4444', s: '#3b82f6', b: '#0f172a' }, grid: [
    "....ll.pp.ss....","...pppppppppp...",".pppppbppbppppp.","pppppppppppppppp","ppppppllllpppppp",".ppp.ppsspp.ppp.","......pppp......","................","................","................","................","................","................","................","................","................"
  ]},
  yanmega: { palette: { p: '#15803d', d: '#052e16', l: '#ef4444', s: '#e0f2fe', b: '#0f172a' }, grid: [
    ".ssss......ssss.","ssssss.pp.ssssss","..sss.pllp.sss..",".ssss.pppp.ssss.","ssssssddddssssss","......pppp......","......dddd......","......pppp......",".......ll.......","................","................","................","................","................","................","................"
  ]},
  gliscor: { palette: { p: '#6b21a8', d: '#0f172a', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    ".pp...p..p...pp.","pdpp.pppppp.ppdp","pdddplbppblddddp",".pdddsddddsdddp.","..ddddppppdddd..","....pppppppp.pp.","....pp....pppp..","................","................","................","................","................","................","................","................","................"
  ]},
  mamoswine: { palette: { p: '#78350f', d: '#451a03', l: '#f8fafc', s: '#38bdf8', b: '#0f172a' }, grid: [
    "...pppppppppp...","..ppppddddpppp..",".ppppssbbsspppp.",".llpppssssppp.ll","lllpppppppppp.ll",".ll.pppppppp.ll.","...lll....lll...","...ddd....ddd...","................","................","................","................","................","................","................","................"
  ]},
  porygon_z: { palette: { p: '#f43f5e', d: '#38bdf8', l: '#facc15', b: '#0f172a' }, grid: [
    ".......dd.......",".....pppppp.....","....pplbblpp....",".....pppppp.....","......dddd......","..dd.pppppp.dd..",".ddd.pppppp.ddd.",".....pppppp.....","......d..d......","................","................","................","................","................","................","................"
  ]},
  gallade: { palette: { p: '#f8fafc', d: '#16a34a', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [
    "......llll......","....dddddddd....","...ddpbppbpdd...","....pppppppp....","..dd.ppsspp.dd..",".dddppppppppddd.",".dd..pppppp..dd.","....ppp..ppp....","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  probopass: { palette: { p: '#2563eb', d: '#dc2626', l: '#0f172a', s: '#facc15', b: '#0f172a' }, grid: [
    "....dddddddd....","..ddppppppppdd..","..ppppbppbpppp..","..pppddddddppp..",".ss.llllllll.ss.",".ssllllllllllss.","...pppppppppp...","....ss....ss....","................","................","................","................","................","................","................","................"
  ]},
  dusknoir: { palette: { p: '#334155', d: '#0f172a', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    ".......ll.......","....pppppppp....","...pppddddppp...","...ppddssddpp...","..pppppppppppp..",".pplllpppplllpp.",".ppppddddddpppp.","..ddddppppdddd..","....dddddddd....","................","................","................","................","................","................","................"
  ]},
  froslass: { palette: { p: '#f8fafc', d: '#7e22ce', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [
    "....llllllll....","...pppppppppp...","..ddddbppbdddd..","...pppppppppp...","..llppppppppll..",".ll.ssssssss.ll.","...pppppppppp...","...pppppppppp...","....ppp..ppp....","................","................","................","................","................","................","................"
  ]},
  rotom: { palette: { p: '#f97316', d: '#ea580c', l: '#38bdf8', s: '#ffffff', b: '#0f172a' }, grid: [
    ".......pp.......","......pppp......","..ll..pppp..ll..",".llllpsbbpsllll.","..ll.pppppp.ll..","....pppppppp....","...ll.pppp.ll...","......pppp......",".......pp.......","................","................","................","................","................","................","................"
  ]},
  uxie: { palette: { p: '#94a3b8', d: '#facc15', l: '#ef4444', b: '#0f172a' }, grid: [
    "...dddddddddd...","..ddddlllllddd..","..dddddddddddd..","...pppbppbppp...","....pppppppp....","....pppppppp.pp.",".....pp..pp..pp.","................","................","................","................","................","................","................","................","................"
  ]},
  mesprit: { palette: { p: '#94a3b8', d: '#ec4899', l: '#ef4444', b: '#0f172a' }, grid: [
    "..dddd....dddd..",".dddddd..dddddd.","..ddddl..ldddd..","...pppbppbppp...","....pppppppp....","....pppppppp.pp.",".....pp..pp..pp.","................","................","................","................","................","................","................","................","................"
  ]},
  azelf: { palette: { p: '#94a3b8', d: '#38bdf8', l: '#ef4444', b: '#0f172a' }, grid: [
    "..dd..dddd..dd..","...dddddddddd...","...ddddlllddd...","...pppbppbppp...","....pppppppp....","....pppppppp.pp.",".....pp..pp..pp.","................","................","................","................","................","................","................","................","................"
  ]},
  heatran: { palette: { p: '#9a3412', d: '#78716c', l: '#f97316', s: '#ef4444', b: '#0f172a' }, grid: [
    "...ddd....ddd...","..ddlllllllldd..",".ddpppsbbspppdd.",".pppppppppppppp.","ppppddddddddpppp","ddd..pppppp..ddd","................","................","................","................","................","................","................","................","................","................"
  ]},
  regigigas: { palette: { p: '#f8fafc', d: '#facc15', l: '#22c55e', s: '#38bdf8', b: '#0f172a' }, grid: [
    "...llddddddll...","..llppppppppll..",".llpppsbbspllpp.",".ppppddddddpppp.","pppppppppppppppp","ppp..pppppp..ppp","lll..ppp.pp..lll",".....ddd.dd.....","................","................","................","................","................","................","................","................"
  ]},
  giratina: { palette: { p: '#475569', d: '#dc2626', l: '#facc15', b: '#0f172a' }, grid: [
    ".dd..........dd.","dddd..llll..dddd","dddddppppppddddd",".dddppbppbppddd.","..dd.dddddd.dd..","....llllllll....","...pppppppppp...","...llddppddll...","...ll..ll..ll...","................","................","................","................","................","................","................"
  ]},
  cresselia: { palette: { p: '#facc15', d: '#f472b6', l: '#38bdf8', b: '#0f172a' }, grid: [
    "...pp......pp...","..pppp....pppp..","...ppdddddddpp..","....ddbppbdd....","...llllllllll...","..dddddddddddd..","...llllllllll...", ".....dddddd.....","................","................","................","................","................","................","................","................"
  ]},
  phione: { palette: { p: '#38bdf8', d: '#0284c7', l: '#ef4444', b: '#0f172a' }, grid: [
    "......pppp......",".....pppppp.....","....pppppppp....","...pppppppppp...","...pppbppbppp...","....pppppppp....","..pp..pllp..pp..",".....pppppp.....","................","................","................","................","................","................","................","................"
  ]},
  manaphy: { palette: { p: '#38bdf8', d: '#0284c7', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "..pp........pp..",".pp..........pp.","..pp.pppppp.pp..","....pppppppp....","...pplbppblpp...","....pppppppp....","..pp..pssp..pp..",".....ppllpp.....",".....pp..pp.....","................","................","................","................","................","................","................"
  ]},
  darkrai: { palette: { p: '#1e293b', d: '#dc2626', l: '#f8fafc', b: '#0f172a' }, grid: [
    ".....llllll.....","....llllllll....","...llpppppp.....","...pppbllbppp...","..dddddddddddd..",".pppppppppppppp.","pppppppppppppppp",".pp.pppppppp.pp.",".....pppppp.....","......p..p......","................","................","................","................","................","................"
  ]},
  shaymin: { palette: { p: '#f8fafc', d: '#22c55e', l: '#f43f5e', s: '#fde047', b: '#0f172a' }, grid: [
    "................","....dddddddd....","...ddllssll.dd..","..ddddddddddddd.","..ppppbppbppppp.","..ppppppppppppp.","...ppppppppppp..","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  arceus: { palette: { p: '#f8fafc', d: '#94a3b8', l: '#facc15', s: '#22c55e', b: '#0f172a' }, grid: [
    "......llll......","....pp....pp....","...pppppppppp...","...ppsbppbspl...","....pppppppp....","..llllpppppllll.",".ll.pppppppp.ll.","..llllpppppllll.","....pppppppp....","....pp.dd.pp....","....dd....dd....","................","................","................","................","................"
  ]},
  nihilego:   { palette: { p: '#e0f2fe', d: '#38bdf8', l: '#ffffff', s: '#c084fc', b: '#0f172a' }, grid: [".....llllll.....","...llppppppppll.","..lpppssssssppl.",".lppddddddddddpl",".ppppppppppppppp","..dddddddddddddd","..d.d.d.dd.d.d.d",".d..d.d.dd.d.d..",".d..d..d..d..d..","................","................","................","................","................","................","................"]},
  buzzwole:   { palette: { p: '#dc2626', d: '#7f1d1d', l: '#f8fafc', s: '#f97316', b: '#0f172a' }, grid: ["......ssss......","..ppp.dddd.ppp..",".pppppsbbs.pppp.","ppppppddddpppppp","pp.pppppppppp.pp","...pppddddppp...","..pp..dddd..pp..",".dd..dd..dd..dd.","................","................","................","................","................","................","................","................"]},
  pheromosa:  { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#fde047', s: '#a855f7', b: '#0f172a' }, grid: ["....ll....ll....",".....pppppp.....","....ppsbbspp....","...pppppppppp...","..pp.dddddd.pp..",".pp..pppppp..pp.",".p...pppppp...p.",".....pp..pp.....",".....dd..dd.....","................","................","................","................","................","................","................"]},
  xurkitree:  { palette: { p: '#0f172a', d: '#facc15', l: '#ffffff', s: '#ef4444', b: '#0f172a' }, grid: ["..ll..llll..ll..","...llllllllll...","....dddddddd....","..dd..pppp..dd..",".ss..pppppp..ss.",".p...ppddpp...p.",".....pppppp.....","....pp.pp.pp....","...dd..dd..dd...","................","................","................","................","................","................","................"]},
  celesteela: { palette: { p: '#14b8a6', d: '#0f766e', l: '#cbd5e1', s: '#fde047', b: '#0f172a' }, grid: [".......ss.......","......pppp......","..dd..pbpp..dd..",".dddd.pppp.dddd.",".ddllpppppp.lld.",".ddllpddddp.lld.",".ddllpppppp.lld.",".dddd.pppp.dddd.","..ss..dddd..ss..","................","................","................","................","................","................","................"]},
  kartana:    { palette: { p: '#f8fafc', d: '#f97316', l: '#fde047', b: '#0f172a' }, grid: [".......ll.......","..pp..dddd..pp..","...pppppppppp...","....ddpbppdd....","..ppppddddpppp..",".pp..pppppp..pp.",".....pp..pp.....","....ll....ll....","................","................","................","................","................","................","................","................"]},
  guzzlord:   { palette: { p: '#1e293b', d: '#facc15', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: ["..dd..pppp..dd..",".ddddppppppdddd.","ppdddbpppbpdddpp","pppddddddddddppp","ppddssssssssddpp",".pddssbbbbssddp.","..dddddddddddd..","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................"]},
  victini: { palette: { p: '#fde047', d: '#ea580c', l: '#fef3c7', s: '#38bdf8', b: '#0f172a' }, grid: [
    "..dd........dd..",".dddd......dddd.","..dddd....dddd..","...ddds..sddd...","....dddddddd....","...pppppppppp...","...ppsbppbspl...","....pppppppp....","...llllllllll...","..ll.pppppp.ll..","....pppppppp....","....ppp..ppp....","....pp....pp....","...ddd....ddd...","................","................"
  ]},
  patrat: { palette: { p: '#b45309', d: '#78350f', l: '#fef3c7', s: '#ef4444', b: '#0f172a' }, grid: [
    ".....pp..pp.....","....pppppppp....","...pppppppppp...","...ppsbppbspl...","...ppllllllpp...","....llllllll....","....pppppppp..ll","...pppppppppp.pl","...pppddddppp.p.","....pppppppp.pp.","....ppp..ppp....","....pp....pp....","...ddd....ddd...","................","................","................"
  ]},
  watchog: { palette: { p: '#b45309', d: '#78350f', l: '#fde047', s: '#ef4444', b: '#0f172a' }, grid: [
    "....dd....dd....","...pppppppppp...","...ppsbppbspl...","....pppppppp....","...llllllllll...","...llddddddll...","..pppllllllppp..",".pp.llllllll.pp.","....ppddddpp..ll","....pppppppp..pl","....ppp..ppp.pp.","....pp....pp....","...ddd....ddd...","................","................","................"
  ]},
  lillipup: { palette: { p: '#d97706', d: '#451a03', l: '#fef3c7', s: '#fde68a', b: '#0f172a' }, grid: [
    "................","..pp........pp..",".pppp..ll..pppp.",".pppppppppppppp.","..ppllbppbllpp..","..ppllllllllpp..","...llllllllll...", "...ddddpppppp.p.","..ddddpppppppppp","..ddddpppppppp..","...pp......pp...","...pp......pp...","...ll......ll...","................","................","................"
  ]},
  herdier: { palette: { p: '#d97706', d: '#1e293b', l: '#fef3c7', s: '#94a3b8', b: '#0f172a' }, grid: [
    "..pp........pp..",".pppp.ssss.pppp.","..pp.pppppp.pp..","...pplbppblpp...","..llllllllllll..",".llllpppppp.lll.","..dddddddddddd..",".dddddddddddddd.",".ddddppppppdddd.","..pppppppppppp..","..ppp......ppp..","..ppp......ppp..","..lll......lll..","................","................","................"
  ]},
  stoutland: { palette: { p: '#b45309', d: '#1e293b', l: '#f8fafc', s: '#fde68a', b: '#0f172a' }, grid: [
    "..pp..llll..pp..",".pppppppppppppp.","..ppllbppbllpp..",".llllllllllllll.","llllllllllllllll",".llllddddddddll.",".llddddddddddddl","..ddddppppdddd..",".lll.pppppp.lll.","..ll.pp..pp.ll..","....ppp..ppp....","....pp....pp....","...lll....lll...","................","................","................"
  ]},
  purrloin: { palette: { p: '#9333ea', d: '#581c87', l: '#fef3c7', s: '#f472b6', b: '#0f172a' }, grid: [
    "..pp........pp..",".pspp......ppsp.","..pppppppppppp..","..pplbppppblpp..","...ppllllllpp...", "....llllllll....","....pppppppp..dd","...ppplllppp..pd","...pppppppppp.p.","....pppppppppp..","....pp....pp....","....pp....pp....","...lll....lll...","................","................","................"
  ]},
  liepard: { palette: { p: '#7e22ce', d: '#3b0764', l: '#facc15', s: '#f43f5e', b: '#0f172a' }, grid: [
    "..pp........pp..",".pspp......ppsp.","..pppppppppppp..","...ppbppppbpp...","....pppppppp....","...ppplllpppp...", "..ppllpppllppp.d",".ppplpppppllpp.p","..pppppppppppppp","...pp......pp...","...pp......pp...","..ppp......ppp..","..lll......lll..","................","................","................"
  ]},
  pansage: { palette: { p: '#22c55e', d: '#15803d', l: '#fef3c7', s: '#86efac', b: '#0f172a' }, grid: [
    "......pppp......",".....pppppp.....","......dddd......","...llpppppp.ll..","..lllpppppp.lll.","...lllbppblll...","....llllllll....","...pppppppppp...", "..ll.ppllpp.ll..","....pppppppp.p..","....ppp..ppppp..","....pp....pp....","...lll....lll...","................","................","................"
  ]},
  simisage: { palette: { p: '#16a34a', d: '#14532d', l: '#fef3c7', s: '#f8fafc', b: '#0f172a' }, grid: [
    "....pppppppp....","...pppppppppp...","....pppppppp....","..llppppppppll..","...lllbppblll...","....llllllll....","..sssspppppssss.",".ss.pppppppp.ss.",".l..ppsssspp..l.","....pppppppp.pp.","...ppp....ppp.p.","...pp......pp...","..lll......lll..","................","................","................"
  ]},
  pansear: { palette: { p: '#ef4444', d: '#b91c1c', l: '#fef3c7', s: '#fca5a5', b: '#0f172a' }, grid: [
    ".....pppppp.....","....ppsssspp....",".....dddddd.....","...llpppppp.ll..","..lllpppppp.lll.","...lllbppblll...","....llllllll....","...pppppppppp...", "..ll.ppllpp.ll..","....pppppppp.p..","....ppp..ppppp..","....pp....pp....","...lll....lll...","................","................","................"
  ]},
  simisear: { palette: { p: '#dc2626', d: '#991b1b', l: '#fef3c7', s: '#fde047', b: '#0f172a' }, grid: [
    "....ssssssss....","...pppppppppp...","..llppppppppll..","...lllbppblll...","....llllllll....","..sssspppppssss.",".ss.pppppppp.ss.",".l..ppllllpp..l.","...pppppppppp.pp","....pppppppp..p.","...ppp....ppp...","...pp......pp...","..lll......lll..","................","................","................"
  ]},
  panpour: { palette: { p: '#38bdf8', d: '#0284c7', l: '#fef3c7', s: '#bae6fd', b: '#0f172a' }, grid: [
    ".....ssssss.....","....pppppppp....",".....dddddd.....","...llpppppp.ll..","..lllpppppp.lll.","...lllbppblll...","....llllllll....","...pppppppppp...", "..ll.ppllpp.ll..","....pppppppp.p..","....ppp..ppppp..","....pp....pp....","...lll....lll...","................","................","................"
  ]},
  simipour: { palette: { p: '#0284c7', d: '#0369a1', l: '#fef3c7', s: '#fde68a', b: '#0f172a' }, grid: [
    "...ssssssssss...","..ssppppppppss..","..ssllbppbllss..","..ssllllllllss..","...ssppppppss...","..pppppppppppp..",".ll.ppllllpp.ll.",".l..ppllllpp..l.","....pppppppp.pp.","....ppp..ppp..p.","...ppp....ppp...","...lll....lll...","................","................","................","................"
  ]},
  munna: { palette: { p: '#f472b6', d: '#be185d', l: '#fce7f3', s: '#a855f7', b: '#0f172a' }, grid: [
    "................","................","....pppppppp....","..ppddddddddpp..",".ppppllpppllppp.",".ppppbppppbpppp.",".pppllsddllsppp.",".ppppdddddddppp.","..pppppppppppp..","...pp..pp..pp...","...dd..dd..dd...","................","................","................","................","................"
  ]},
  musharna: { palette: { p: '#d8b4fe', d: '#7e22ce', l: '#fbcfe8', s: '#f43f5e', b: '#0f172a' }, grid: [
    "....llllllll....","..llllssssllll..","...lllsssslll...","....pppppppp....","..pppppppppppp..",".ppppddddddpppp.",".ppppdbppbppppp.",".pppppppppppppp.","..ddddppppdddd..","...dddddddddd...", "....dd....dd....","................","................","................","................","................"
  ]},
  pidove: { palette: { p: '#94a3b8', d: '#475569', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: [
    "......p..p......",".....pppppp.....","....pppppppp....","....ppbppbs.....","....pplllpp.....","...pppppppppp...","..ppppddddpppp..","..pppddddddppp..","...dddddddddd...", "....dddddddd....",".....s....s.....","....ss....ss....","................","................","................","................"
  ]},
  tranquill: { palette: { p: '#64748b', d: '#334155', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: [
    ".....ssssss.....","....sspppppp....","....sspbppbp....",".....llllll.....","...pppppppppp...","..ddddppppdddd..",".ddd.pppppp.ddd.","..dd.dddddd.dd..",".....dddddd.....","....dddddddd....",".....l....l.....","....ll....ll....","................","................","................","................"
  ]},
  unfezant: { palette: { p: '#475569', d: '#1e293b', l: '#22c55e', s: '#f43f5e', b: '#0f172a' }, grid: [
    "..sssss.........",".sssssss........","...ssllllll.....","....llbppbll....",".....llllll.....","...pppppppppp...","..ddddppppdddd..",".ddddppppppdddd.",".dd..dddddd..dd.","....dddddddd....","....ppp..ppp....",".....s....s.....","....ss....ss....","................","................","................"
  ]},
  blitzle: { palette: { p: '#1e293b', d: '#0f172a', l: '#f8fafc', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".....ss..ss.....","....llllllll....","...lllpppppp....","...llpbppbpp....","....llpppp......","....llpppppp..l.","...ppplllpppppl.","...ppllllpppppp.","...ppplllpppp...","...pp......pp...","...pp......pp...","...ll......ll...","................","................","................","................"
  ]},
  zebstrika: { palette: { p: '#1e293b', d: '#0f172a', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: [
    "...ss..llll.....","..llllllpppp....","...llllpbppbp...","....lllpppppp...","...llllppppp.ll.","..pppllllpppppll","..pplllllllpppp.","..pppllllpppppp.","...pppppppppp...","...pp......pp...","...pp......pp...","...ll......ll...","...ss......ss...","................","................","................"
  ]},
  roggenrola: { palette: { p: '#1e3a8a', d: '#172554', l: '#f97316', s: '#eab308', b: '#0f172a' }, grid: [
    ".......ss.......","......ssss......",".....pppppp.....","...pppppppppp...","..ppppsssspppp..","..pppsbbbbsppp..","..pppsbbbbsppp..","..ppppddddpppp..","...pppppppppp...","...lll....lll...","..llll....llll..","................","................","................","................","................"
  ]},
  boldore: { palette: { p: '#1e3a8a', d: '#172554', l: '#ef4444', s: '#f97316', b: '#0f172a' }, grid: [
    "......llll......","...ll.pppp.ll...","..lllpppppp.ll..",".pppppssssppppp.",".ppppbbbbbbpppp.","..ppppddddpppp..",".llpppppppppp.ll","llll.dddddd.llll",".dd..dd..dd..dd.","................","................","................","................","................","................","................"
  ]},
  gigalith: { palette: { p: '#3b82f6', d: '#1e3a8a', l: '#ef4444', s: '#f97316', b: '#0f172a' }, grid: [
    ".....llllll.....","..ll.llllll.ll..",".llllpppppp.lll.",".llpppsbbsppp.ll","..ppppddddpppp..",".llpppppppppp.ll","llllddddddddllll","ll.dddddddddd.ll","...ppp....ppp...","...ddd....ddd...","..llll....llll..","..dddd....dddd..","................","................","................","................"
  ]},
  woobat: { palette: { p: '#60a5fa', d: '#1d4ed8', l: '#f8fafc', s: '#f43f5e', b: '#0f172a' }, grid: [
    "................",".....pppppp.....","d...pppppppp...d","dd.pppssssppp.dd","dddppssssssppddd",".ddppppppppppdd.","..d.pppppppp.d..",".....pp..pp.....","................","................","................","................","................","................","................","................"
  ]},
  swoobat: { palette: { p: '#3b82f6', d: '#1e40af', l: '#fde047', s: '#f43f5e', b: '#0f172a' }, grid: [
    "...pp......pp...","..pppp....pppp..",".d.pppppppppp.d.","dd.ppsssssspp.dd","dddppsbppbsspddd",".dd.llllllll.dd.","....pppppppp....","....pppppppp.dd.",".....s....s..dd.","................","................","................","................","................","................","................"
  ]},
  drilbur: { palette: { p: '#334155', d: '#0f172a', l: '#cbd5e1', s: '#38bdf8', b: '#0f172a' }, grid: [
    "......llll......",".....llllll.....","....pppppppp....","...pppbppbppp...","..llppppppppll..",".lllpppssppp.ll.",".ll.ppsssspp.ll.","....ppsssspp....","....pppppppp....","....pp....pp....","...lll....lll...","................","................","................","................","................"
  ]},
  excadrill: { palette: { p: '#78350f', d: '#451a03', l: '#cbd5e1', s: '#dc2626', b: '#0f172a' }, grid: [
    ".....llllll.....","....llllllll....","...lllsssslll...","...ppppbppbpp...",".ll.ppsssspp.ll.","llllppppppppllll","lll.ppsssspp.lll","....ppsssspp....","...pppppppppp...","...ppp....ppp...","..llll....llll..","................","................","................","................","................"
  ]},
  audino: { palette: { p: '#f9a8d4', d: '#db2777', l: '#fef3c7', s: '#38bdf8', b: '#0f172a' }, grid: [
    "..pp........pp..","..pppp....pppp..","...pppppppppp...","..ppsbppppbspp..","..ppllllllllpp..","...pppppppppp...", "..ppllllllllpp..",".pp.llllllll.pp.","..ppllllllllpp..","...pppppppppp...","....ppp..ppp....","....ll....ll....","................","................","................","................"
  ]},
  timburr: { palette: { p: '#d6d3d1', d: '#78716c', l: '#b45309', s: '#f43f5e', b: '#0f172a' }, grid: [
    ".....pppppp.....","....ppsssspp....","...pppppppppp...","...pppbppbppp...","....pppppppp.ll.","..pppppppppp.ll.",".pp.ppsssspp.ll.","....pppppppp.ll.","....ppp..ppp.ll.","....pp....pp....","...ddd....ddd...","................","................","................","................","................"
  ]},
  gurdurr: { palette: { p: '#a8a29e', d: '#57534e', l: '#dc2626', s: '#f43f5e', b: '#0f172a' }, grid: [
    "..llllllllllll..",".llllllllllllll.","....ssssssss....","...pppppppppp...","...pppbppbppp...","..pppppppppppp..",".pp.ppsssspp.pp.","....pppppppp....","....ppp..ppp....","....pp....pp....","...ddd....ddd...","................","................","................","................","................"
  ]},
  conkeldurr: { palette: { p: '#a16207', d: '#78350f', l: '#94a3b8', s: '#ef4444', b: '#0f172a' }, grid: [
    "....ssssssss....","...pppppppppp...","...pppbppbppp...","...pppplllppp...",".ll.pppppppp.ll.","llllppssssppllll","llllppppppppllll","llllddddddddllll","lll.ppp..ppp.lll","....ddd..ddd....","................","................","................","................","................","................"
  ]},
  tympole: { palette: { p: '#38bdf8', d: '#0f172a', l: '#fef3c7', s: '#0284c7', b: '#0f172a' }, grid: [
    "................","....llllllll....","...llllllllll...","..ddllbppbll.dd.","..ddllllllll.dd.","...llllllllll...", "....dddddddd.pp.",".....dddddd.ppp.","............pp..","................","................","................","................","................","................","................"
  ]},
  palpitoad: { palette: { p: '#0284c7', d: '#1e3a8a', l: '#fef3c7', s: '#38bdf8', b: '#0f172a' }, grid: [
    "....dd....dd....","...dddd..dddd...","..ddppppppppdd..","..ddppbppbppdd..","..ppppllllpppp..","..ppllllllllpp..","...pllllllllp.s.","...pppppppppp.ss","....pp....pp....","...ddd....ddd...","................","................","................","................","................","................"
  ]},
  seismitoad: { palette: { p: '#0284c7', d: '#0f172a', l: '#22c55e', s: '#ef4444', b: '#0f172a' }, grid: [
    "..ss..pppp..ss..",".ss.pppppppp.ss.","..ssppbppbppss..","...pppppppppp...",".sspllllllllp.ss","ss.pllllllllp.ss","...pllllllllp...","...pppppppppp...","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................"
  ]},
  throh: { palette: { p: '#dc2626', d: '#7f1d1d', l: '#f8fafc', s: '#0f172a', b: '#0f172a' }, grid: [
    "....pppppppp....","...ppsbbbbspp...","...pppbppbppp...","..llllllllllll..",".llllpppppp.lll.","llllssssssssllll",".llllllssllllll.","..llllllllllll..","...lll....lll...","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................"
  ]},
  sawk: { palette: { p: '#2563eb', d: '#1e3a8a', l: '#f8fafc', s: '#0f172a', b: '#0f172a' }, grid: [
    ".....pppppp.....","....psbppbpp....","....pppppppp....","...llllllllll...","..lllpppppp.ll..",".lll.ssssss.lll.",".ll...llll...ll.",".....llllll.....","....lll..lll....","....ppp..ppp....","....ddd..ddd....","................","................","................","................","................"
  ]},
  sewaddle: { palette: { p: '#84cc16', d: '#15803d', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: [
    "...pp......pp...","..pppppppppppp..","..ppddddddddpp..","..ppdlllllddpp..","..ppdlbppbldpp..","...pplssssllp...","....llllllll....","....pppppppp....","...pppppppppp...","....ll.ll.ll....","................","................","................","................","................","................"
  ]},
  swadloon: { palette: { p: '#15803d', d: '#052e16', l: '#84cc16', s: '#facc15', b: '#0f172a' }, grid: [
    ".....pp..pp.....","...pppppppppp...","..ppppddddpppp..",".pppddssssddppp.",".pppdsbppbssppp.",".pppddssssddppp.","..ppppllllpppp..","..pppppppppppp..","...dddddddddd...", ".....s....s.....","................","................","................","................","................","................"
  ]},
  leavanny: { palette: { p: '#facc15', d: '#16a34a', l: '#bef264', s: '#ef4444', b: '#0f172a' }, grid: [
    "..ll........ll..","...l.pppppp.l...","....ppsbbspp....",".....pppppp.....","...dddddddddd...","..dd.dddddd.dd..",".dd..llllll..dd.","....dddddddd....","....dddddddd....",".....d....d.....",".....d....d.....","................","................","................","................","................"
  ]},
  venipede: { palette: { p: '#be185d', d: '#581c87', l: '#84cc16', s: '#0f172a', b: '#0f172a' }, grid: [
    "..ss............","...ss..pppp.....","....pppppppp.ss.","...pppbpppppps..","..ppppddddppppp.","..lllppppppplll.","...dd..dd..dd...","................","................","................","................","................","................","................","................","................"
  ]},
  whirlipede: { palette: { p: '#6b21a8', d: '#3b0764', l: '#ef4444', s: '#94a3b8', b: '#0f172a' }, grid: [
    "......pppp......","...pppppppppp...","..ppddddddddpp..",".ppddssssssddpp.",".ppdslbppbsldpp.",".ppddssssssddpp.","..ppddddddddpp..","...pppppppppp...","......pppp......","................","................","................","................","................","................","................"
  ]},
  scolipede: { palette: { p: '#be185d', d: '#4c1d95', l: '#a855f7', s: '#22c55e', b: '#0f172a' }, grid: [
    "..ll..pppp......","...llpppppp.....","....pppbppbp....","....pppppppp....",".....ppddpp.....",".....pppppp..dd.","....ppddddpppppp","...ppppppppppppp","...ppddppddppdd.","...dd..dd..dd...","................","................","................","................","................","................"
  ]},
  cottonee: { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#22c55e', s: '#f97316', b: '#0f172a' }, grid: [
    "................","....pppppppp....","..pppppppppppp..","llppppppppppppll","lllpppsbbsppp.ll","ll.pppppppppp.l.","...dddddddddd...", "....pppppppp....","................","................","................","................","................","................","................","................"
  ]},
  whimsicott: { palette: { p: '#fef3c7', d: '#78350f', l: '#22c55e', s: '#f97316', b: '#0f172a' }, grid: [
    "...pppppppppp...","..pppppppppppp..",".pppllppppllppp.",".ppddddddddddpp.","..ppdsbppbsdpp..","..ppppddddpppp..",".pppppppppppppp.","..ppppddddpppp..","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  petilil: { palette: { p: '#86efac', d: '#16a34a', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: [
    "....dd.dd.dd....","...dddddddddd...","....dddddddd....","...llllllllll...","..lllssbbsslll..","..llllllllllll..","...pppppppppp...", "....pppppppp....","....pp.pp.pp....","................","................","................","................","................","................","................"
  ]},
  lilligant: { palette: { p: '#4ade80', d: '#15803d', l: '#f43f5e', s: '#facc15', b: '#0f172a' }, grid: [
    "....llllllll....","...lllsssslll...","....llllllll....","....pppppppp....","....ppbppbpp....","...dddddddddd...","..ddppppppppdd..",".dd.pppppppp.dd.","...dddddddddd...", "....dd.dd.dd....","................","................","................","................","................","................"
  ]},
  basculin: { palette: { p: '#16a34a', d: '#052e16', l: '#ef4444', s: '#38bdf8', b: '#0f172a' }, grid: [
    "......dddd......","....dddddddd..p.","..ppppppppppp.pp",".pppbllppppppppp",".ppppppppppppppp","..ddddpppppp..pp",".....dddddd...p.","................","................","................","................","................","................","................","................","................"
  ]},
  sandile: { palette: { p: '#d97706', d: '#78350f', l: '#0f172a', s: '#f43f5e', b: '#0f172a' }, grid: [
    "................","...ll..ll.......","..llllllpppp....",".llblpppppppp...","..llllpppppp.ll.","....pppppppppp..","...ppddppddppp..","...pp......pp...","................","................","................","................","................","................","................","................"
  ]},
  krokorok: { palette: { p: '#b45309', d: '#451a03', l: '#fef3c7', s: '#ef4444', b: '#0f172a' }, grid: [
    "....dd....dd....","...ddbppppbdd...","..pppppppppppp..","....pppppppp....","...pppllllppp...", "..pp.pllllp.pp..",".....pllllp..dd.","....pppppppp.pp.","....pp....pp....","...ddd....ddd...","................","................","................","................","................","................"
  ]},
  krookodile: { palette: { p: '#dc2626', d: '#7f1d1d', l: '#f8fafc', s: '#0f172a', b: '#0f172a' }, grid: [
    "...ss......ss...","..sssspppppssss.","..ssppbppbppss..","...pppppppppp...","..ppppllllpppp..",".pp..llllll..pp.",".p...llllll...p.","....pppppppp.dd.","...ppp....pppdd.","...sss....sss...","................","................","................","................","................","................"
  ]},
  darumaka: { palette: { p: '#ef4444', d: '#991b1b', l: '#facc15', s: '#ffffff', b: '#0f172a' }, grid: [
    "...ll......ll...","..pppppppppppp..",".pppssssssssppp.",".pppsbppppbsppp.",".pppssssssssppp.",".pppppllllppppp.","..pppllllllppp..","...pppppppppp...","....ll....ll....","................","................","................","................","................","................","................"
  ]},
  darmanitan: { palette: { p: '#dc2626', d: '#7f1d1d', l: '#facc15', s: '#fef3c7', b: '#0f172a' }, grid: [
    "..llll....llll..",".llllll..llllll.","..pppppppppppp..",".pppsbppppbsppp.",".ppppllllllpppp.","pppppppppppppppp","ppp..pppppp..ppp","ppp..dddddd..ppp","....ppp..ppp....","................","................","................","................","................","................","................"
  ]},
  maractus: { palette: { p: '#22c55e', d: '#15803d', l: '#f43f5e', s: '#facc15', b: '#0f172a' }, grid: [
    ".ll..........ll.","llll........llll",".pp..pppppp..pp.",".pppppppppppppp.","..ppsbppbsplpp..","..ppppddddpppp..",".pp..pppppp..pp.",".....dddddd.....","....pppppppp....",".....ssssss.....","................","................","................","................","................","................"
  ]},
  dwebble: { palette: { p: '#f97316', d: '#92400e', l: '#d6d3d1', s: '#78350f', b: '#0f172a' }, grid: [
    "....ssssssss....","..ssddddddddss..",".ssddddddddddss.",".ssddddddddddss.","..llllllllllll..","...pppbppbppp...","..pp.pppppp.pp..","..p..pp..pp..p..","................","................","................","................","................","................","................","................"
  ]},
  crustle: { palette: { p: '#b45309', d: '#78350f', l: '#ea580c', s: '#fde68a', b: '#0f172a' }, grid: [
    ".pppppppppppppp.",".dddddddddddddd.",".ssssssssssssss.",".pppppppppppppp.",".dddddddddddddd.","..llllbppbllll..",".ll..llllll..ll.",".l...ll..ll...l.","................","................","................","................","................","................","................","................"
  ]},
  scraggy: { palette: { p: '#facc15', d: '#ca8a04', l: '#ef4444', s: '#fef3c7', b: '#0f172a' }, grid: [
    "......llll......","....pppppppp....","...ppsbppbspl...","...ppsssssspp...","....pppppppp....","...dddddddddd...","..ddddllllldddd.","..dddddddddddd..","....dd....dd....","...lll....lll...","................","................","................","................","................","................"
  ]},
  scrafty: { palette: { p: '#f97316', d: '#15803d', l: '#facc15', s: '#dc2626', b: '#0f172a' }, grid: [
    ".....ssssss.....","....ssssssss....","...llllllllll...","...llsbppbsll...","...pppppppppp...","..ddddppppdddd..",".ddddppppppdddd.","..dddddddddddd..","...dddddddddd...", "....pp....pp....","................","................","................","................","................","................"
  ]},
  sigilyph: { palette: { p: '#1e293b', d: '#0284c7', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    ".......ll.......","..dd..pppp..dd..",".dddd.pllp.dddd.","..dd.pppppp.dd..",".ss.ppddddpp.ss.","....ppddddpp....","....pppppppp....","...ll..ll..ll...",".......ll.......","................","................","................","................","................","................","................"
  ]},
  yamask: { palette: { p: '#1e293b', d: '#0f172a', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pppppppp....","...ppsbppbspl...","....pppppppp....",".....pp..pp.....","......pppp......",".....llllll.....","....llllllll....","....lllddlll....",".....llllll.....","................","................","................","................","................","................"
  ]},
  cofagrigus: { palette: { p: '#eab308', d: '#1e3a8a', l: '#ef4444', s: '#0f172a', b: '#0f172a' }, grid: [
    ".ss..pppppp..ss.","ssssppddddppssss",".ss.pplbblpp.ss.","....pppppppp....",".ss.ppddddpp.ss.","ssssppppppppssss",".ss.ppddddpp.ss.","....pppppppp....","....dddddddd....","................","................","................","................","................","................","................"
  ]},
  tirtouga: { palette: { p: '#2563eb', d: '#1e293b', l: '#38bdf8', s: '#94a3b8', b: '#0f172a' }, grid: [
    "................","....dddddddd....","..ddssssssssdd..",".ppddddddddddpp.","ppbpddddddddpppp",".pp.dddddddd.pp.",".....pp..pp.....","................","................","................","................","................","................","................","................","................"
  ]},
  carracosta: { palette: { p: '#1d4ed8', d: '#1e293b', l: '#93c5fd', s: '#475569', b: '#0f172a' }, grid: [
    "....dddddddd....","...ddpbppbpdd...","..pppppppppppp..",".pp.ssssssss.pp.","pp..sddddddss.pp","....sddddddss...","....pppppppp....","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  archen: { palette: { p: '#facc15', d: '#dc2626', l: '#3b82f6', s: '#22c55e', b: '#0f172a' }, grid: [
    "....dddddddd....","...ddpbppbpdd...","....dddddddd....","..pp.llllll.pp..",".pppp.llll.pppp.","..pp..llll..pp..",".....dddddd.dd..",".....p....p.ll..","................","................","................","................","................","................","................","................"
  ]},
  archeops: { palette: { p: '#facc15', d: '#dc2626', l: '#2563eb', s: '#16a34a', b: '#0f172a' }, grid: [
    ".....dddddd.....","....ddpbppdd....","..pp..dddd..pp..",".pppp.ssss.pppp.","pppppllllllppppp",".ppp.llllll.ppp.",".....dddddd.dd..","....pp....p.ll..","................","................","................","................","................","................","................","................"
  ]},
  trubbish: { palette: { p: '#15803d', d: '#064e3b', l: '#f472b6', s: '#38bdf8', b: '#0f172a' }, grid: [
    "....dd....dd....",".....dddddd.....","....pppppppp....","...pppppppppp...","..ppppbppbpppp..",".llppppllpppp.ss","..pppppppppppp..","...dddddddddd...", "....dd....dd....","................","................","................","................","................","................","................"
  ]},
  garbodor: { palette: { p: '#4d7c0f', d: '#365314', l: '#f43f5e', s: '#38bdf8', b: '#0f172a' }, grid: [
    "...ll......ss...","..llllpppppsss..","..pppppppppppp..",".pppppbppbppppp.",".ppppllllllpppp.","llppppppppppppss","llppppddddppppss",".pppppppppppppp.","..dddd....dddd..","................","................","................","................","................","................","................"
  ]},
  zorua: { palette: { p: '#334155', d: '#dc2626', l: '#38bdf8', b: '#0f172a' }, grid: [
    "..pp........pp..",".pdpp..dd..ppdp.","..pppppppppppp..","..pplbppppblpp..","...pppppppppp...", "...dddddddddd...", "...pppppppppp.pp","...ppppppppppppp","....pp....pp....","....dd....dd....","................","................","................","................","................","................"
  ]},
  minccino: { palette: { p: '#cbd5e1', d: '#94a3b8', l: '#f472b6', s: '#f8fafc', b: '#0f172a' }, grid: [
    ".ppp........ppp.","pplpp.pppp.pplpp",".pppppplbppbp.p.","..pppppppppppp..","....pppppppp..ss","...pppppppppp.ss","....pppppppp.ss.","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  cinccino: { palette: { p: '#cbd5e1', d: '#94a3b8', l: '#f8fafc', s: '#f43f5e', b: '#0f172a' }, grid: [
    ".ppp..llll..ppp.","ppspp.llll.ppspp",".pppppbppbppppp.","..llllllllllll..",".llllpppppp.lll.","..lllpppppp.lll.","...llllllllll...", "....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  gothita: { palette: { p: '#a855f7', d: '#1e293b', l: '#f8fafc', s: '#38bdf8', b: '#0f172a' }, grid: [
    "...ll......ll...","..pppppppppppp..","..ppsbppppbspp..","...pppppppppp...","...llddddddll...","....dddddddd....","...llddddddll...","...dddddddddd...", "....ll....ll....","................","................","................","................","................","................","................"
  ]},
  gothorita: { palette: { p: '#1e293b', d: '#a855f7', l: '#f8fafc', b: '#0f172a' }, grid: [
    "...ll.dddd.ll...","..dddddddddddd..","...dddbppbddd...","....dddddddd....","...llpppppp.ll..","..pppppppppppp..","...llpppppp.ll..","..pppppppppppp..","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  gothitelle: { palette: { p: '#1e293b', d: '#0f172a', l: '#f8fafc', s: '#a855f7', b: '#0f172a' }, grid: [
    "..ll..ssss..ll..","...llssssssll...","....ssbppbs.....","...llpppppp.ll..","..pppppppppppp..","...llpppppp.ll..","..pppppppppppp..",".pppppllllppppp.",".pppppppppppppp.","................","................","................","................","................","................","................"
  ]},
  solosis: { palette: { p: '#86efac', d: '#22c55e', l: '#f43f5e', s: '#fde047', b: '#0f172a' }, grid: [
    "................","....pppppppp....","..ppddddddddpp..",".ppddssssssddpp.",".ppdddbppbddlpp.",".ppddddllddddpp.","..ppddddddddpp..","....pppppppp....","................","................","................","................","................","................","................","................"
  ]},
  duosion: { palette: { p: '#86efac', d: '#16a34a', l: '#f43f5e', b: '#0f172a' }, grid: [
    "....pppppppp....","..ppddddddddpp..",".ppddllppplldpp.",".ppdddddddddddd.",".ppdddbppbddppp.","..ppddddllddpp..","...pppppppppp...","................","................","................","................","................","................","................","................","................"
  ]},
  reuniclus: { palette: { p: '#86efac', d: '#16a34a', l: '#f43f5e', s: '#fde047', b: '#0f172a' }, grid: [
    "....pppppppp....",".pppddddddddppp.","ppdddsbppbssddpp","ppdddddlllddddpp",".pp.dddddddd.pp.","....pppppppp....","....pp....pp....","................","................","................","................","................","................","................","................","................"
  ]},
  ducklett: { palette: { p: '#38bdf8', d: '#0284c7', l: '#facc15', b: '#0f172a' }, grid: [
    "......pppp......",".....pppppp.....","....ppbppbpp....","....ppllllpp....",".....pppppp..pp.","...pppppppppppp.","..ddddpppppppp..","...dddddddddd...", ".....ll..ll.....","................","................","................","................","................","................","................"
  ]},
  swanna: { palette: { p: '#f8fafc', d: '#38bdf8', l: '#facc15', b: '#0f172a' }, grid: [
    ".....dd..dd.....","....pppppppp....","....pppbppbp....",".....ppllll.....","......pppp......",".pppp.pppp.pppp.","ppppppddddpppppp",".pppp.dddd.pppp.",".....pppppp.....","......l..l......","................","................","................","................","................","................"
  ]},
  vanillite: { palette: { p: '#f8fafc', d: '#38bdf8', l: '#bae6fd', b: '#0f172a' }, grid: [
    "......pppp......","....pppppppp....","...pppppppppp...","...pppbppbppp...","....pppppppp....","....dddddddd....",".....dddddd.....","......dddd......",".......dd.......","................","................","................","................","................","................","................"
  ]},
  vanillish: { palette: { p: '#f8fafc', d: '#38bdf8', l: '#7dd3fc', b: '#0f172a' }, grid: [
    "......pppp......","....pppppppp....","...pppppppppp...","..ppppbppbpppp..","...llllllllll...","...dddddddddd...", "....dddddddd....",".....dddddd.....","......dddd......","................","................","................","................","................","................","................"
  ]},
  vanilluxe: { palette: { p: '#f8fafc', d: '#38bdf8', l: '#bae6fd', b: '#0f172a' }, grid: [
    "..pppp....pppp..",".pppppp..pppppp.",".ppbppppp.pbppp.","..pppppppppppp..","...llllllllll...","....dddddddd....",".....dddddd.....","......dddd......",".......dd.......","................","................","................","................","................","................","................"
  ]},
  deerling: { palette: { p: '#f472b6', d: '#fef08a', l: '#ffffff', s: '#22c55e', b: '#0f172a' }, grid: [
    "...pp..ss..pp...","..pppppppppppp..","...ppbppppbpp...","....dddddddd....",".....pppppp..pp.","...pppppppppppp.","...pppddddppppp.","...pp......pp...","...dd......dd...","................","................","................","................","................","................","................"
  ]},
  sawsbuck: { palette: { p: '#92400e', d: '#451a03', l: '#fef3c7', s: '#22c55e', b: '#0f172a' }, grid: [
    ".ss..ss..ss..ss.","..dddd....dddd..","...pppppppppp...","...ppbppppbpp...","....llllllll....","....llllllll....","...pppppppppp...", "..ppppddddpppp..","...pp......pp...","...dd......dd...","................","................","................","................","................","................"
  ]},
  emolga: { palette: { p: '#f8fafc', d: '#1e293b', l: '#facc15', b: '#0f172a' }, grid: [
    "..dd........dd..",".dddd......dddd.","..ddppppppppdd..","...pplbppblpp...",".llpppppppppp.ll","llllppppppppllll",".ll.pppppppp.ll.","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  karrablast: { palette: { p: '#3b82f6', d: '#1d4ed8', l: '#facc15', b: '#0f172a' }, grid: [
    "...dd......dd...","....ddppppdd....","...pppppppppp...","...pppbppbppp...","...pppplllppp...","..ppppllllpppp..","...pppllllppp...", "....pppppppp....","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  escavalier: { palette: { p: '#cbd5e1', d: '#dc2626', l: '#475569', s: '#facc15', b: '#0f172a' }, grid: [
    ".....dddddd.....","....dddddddd....","...pppppppppp...","...ppsbppbspl...",".pp.pppppppp.pp.","pppp.dddddd.pppp","pp...pppppp...pp",".....llllll.....","................","................","................","................","................","................","................","................"
  ]},
  foongus: { palette: { p: '#f8fafc', d: '#ef4444', l: '#f472b6', b: '#0f172a' }, grid: [
    "....dddddddd....","..ddppppppppdd..",".ddppddddddppdd.",".ddddddddddddd..","...pppppppppp...","...pppbppbppp...","...pppplllppp...","....pppppppp....","................","................","................","................","................","................","................","................"
  ]},
  amoonguss: { palette: { p: '#94a3b8', d: '#dc2626', l: '#f8fafc', b: '#0f172a' }, grid: [
    "...dddddddddd...","..ddllllllllldd.",".ddllDDDDDDlldd.".replace(/D/g,'d'),"...pppppppppp...","..dd.pbppbp.dd..",".ddllpppppp.lld.",".ddddppppppdddd.","....pppppppp....","................","................","................","................","................","................","................","................"
  ]},
  frillish: { palette: { p: '#38bdf8', d: '#0284c7', l: '#f8fafc', b: '#0f172a' }, grid: [
    ".....llllll.....","....pppppppp....","...pppppppppp...","...pppbppbppp...","..llllllllllll..","...pppppppppp...","...pp.pppp.pp...","..pp..p..p..pp..","..p...p..p...p..","................","................","................","................","................","................","................"
  ]},
  jellicent: { palette: { p: '#38bdf8', d: '#0284c7', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: [
    "....ssssssss....","...pppppppppp...","..pppppppppppp..","..pppbppppbppp..",".llllllllllllll.","llllllllllllllll","..pp..pppp..pp..",".pp...p..p...pp.","................","................","................","................","................","................","................","................"
  ]},
  alomomola: { palette: { p: '#f472b6', d: '#db2777', l: '#fce7f3', b: '#0f172a' }, grid: [
    "....pppp........","...pppppp.......","..pppppppp..pp..",".ppppbppppppppp.",".ppppllllpppppp.","..pppppppp..pp..","...pppppp.......","....pppp........","................","................","................","................","................","................","................","................"
  ]},
  joltik: { palette: { p: '#facc15', d: '#ca8a04', l: '#38bdf8', b: '#0f172a' }, grid: [
    "................","................","....pppppppp....","...pppppppppp...","..ppplbppblppp..","..pppppppppppp..",".pp.pp.pp.pp.pp.",".p..p..pp..p..p.","................","................","................","................","................","................","................","................"
  ]},
  galvantula: { palette: { p: '#facc15', d: '#7e22ce', l: '#38bdf8', b: '#0f172a' }, grid: [
    "....pppppppp....","..ppddddddddpp..",".ppppbllbbllppp.",".pppppppppppppp.","pp.pppddddppp.pp","p..pp.pppp.pp..p","..pp........pp..","................","................","................","................","................","................","................","................","................"
  ]},
  ferroseed: { palette: { p: '#94a3b8', d: '#475569', l: '#16a34a', b: '#0f172a' }, grid: [
    "......dddd......","...ddppppppdd...","..pppppppppppp..",".pp.ll.pp.ll.pp.",".pp.lb.pp.bl.pp.","..pppppppppppp..","...ddppppppdd...","......dddd......","................","................","................","................","................","................","................","................"
  ]},
  ferrothorn: { palette: { p: '#94a3b8', d: '#16a34a', l: '#facc15', b: '#0f172a' }, grid: [
    ".dd..........dd.",".dd..pppppp..dd.","..ddppppppppdd..",".ppppllbppbllpp.",".pppppppppppppp.","..ddppppppppdd..","................","................","................","................","................","................","................","................","................","................"
  ]},
  klink: { palette: { p: '#94a3b8', d: '#475569', l: '#f8fafc', b: '#0f172a' }, grid: [
    "...pp......pp...",".pppppp..pppppp.",".ppbbpp..ppbbpp.",".pppppp..pppppp.","...pp..pp..pp...",".....pppppp.....",".....ppbbpp.....",".....pppppp.....",".......pp.......","................","................","................","................","................","................","................"
  ]},
  klang: { palette: { p: '#94a3b8', d: '#334155', l: '#38bdf8', b: '#0f172a' }, grid: [
    "....pp....pp....","..pppppppppppp..",".pppddddddddppp.",".pppddbppbddppp.",".pppddddddddppp.","..pppppppppppp..","....pp....pp....","................","................","................","................","................","................","................","................","................"
  ]},
  klinklang: { palette: { p: '#94a3b8', d: '#334155', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "....ssssssss....","..ss..pppp..ss..",".ss.pppppppp.ss.",".s.pppddddppp.s.",".s.ppdbppbdpp.s.",".ss.pppppppp.ss.","..ss..pppp..ss..","....ssssssss....","................","................","................","................","................","................","................","................"
  ]},
  tynamo: { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#facc15', b: '#0f172a' }, grid: [
    "................","................","....pppppppp....","..pppppppppppp..",".pppbppllllpppp.","..pppppppppppp..","....pppppppp....","................","................","................","................","................","................","................","................","................"
  ]},
  eelektrik: { palette: { p: '#0f766e', d: '#ef4444', l: '#facc15', b: '#0f172a' }, grid: [
    "....dddd........","...pppppp.......","..pppbppbp......","..pppplllp......","....ppppllpp....","...pppllpppp.dd.","..pppppppppppdd.","....dddddddd....","................","................","................","................","................","................","................","................"
  ]},
  eelektross: { palette: { p: '#0f766e', d: '#dc2626', l: '#facc15', b: '#0f172a' }, grid: [
    ".....dddddd.....","....pppppppp....","...pppbppbppp...","..ppppddddpppp..",".pp.ppllllpp.pp.","pp..ppllllpp..pp","....pppppppp....","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  elgyem: { palette: { p: '#67e8f9', d: '#0e7490', l: '#22c55e', s: '#ef4444', b: '#0f172a' }, grid: [
    "....pppppppp....","...pppppppppp...","..pppppppppppp..","..ppplbppblppp..","...pppppppppp...","....dddddddd....","...ppddddddpp...","...ls.dddd.sl...","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  beheeyem: { palette: { p: '#b45309', d: '#78350f', l: '#22c55e', s: '#ef4444', b: '#0f172a' }, grid: [
    "...dddddddddd...","..pppppppppppp..","..ppplbppblppp..","...dddddddddd...", "..pppppppppppp..",".pp.dddddddd.pp.",".ls.pppppppp.sl.","....ppp..ppp....","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  litwick: { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#a855f7', s: '#facc15', b: '#0f172a' }, grid: [
    ".......ll.......","......llll......","......llll......","....pppppppp....","...pppppppppp...","...ppsbppbspl...","...pppppppppp...","...dddddddddd...", "....dddddddd....","................","................","................","................","................","................","................"
  ]},
  lampent: { palette: { p: '#1e293b', d: '#0f172a', l: '#a855f7', s: '#facc15', b: '#0f172a' }, grid: [
    "......pppp......","....pppppppp....","...llllllllll...","...llsbppbsll...","...llllllllll...","..pppppppppppp..",".pp...dddd...pp.","......dddd......",".....dddddd.....","................","................","................","................","................","................","................"
  ]},
  axew: { palette: { p: '#84cc16', d: '#3f6212', l: '#f8fafc', b: '#0f172a' }, grid: [
    "......pppp......",".....pppppp.....","....pppppppp....","..llpppbppbpll..","...dddddddddd...", "....pppppppp....","...pppppppppp.p.","....pppppppp.pp.","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  fraxure: { palette: { p: '#65a30d', d: '#334155', l: '#dc2626', b: '#0f172a' }, grid: [
    ".....dddddd.....","....dddddddd....","..llpppbppbpll..","...dddddddddd...", "...pppppppppp...", "..ppppddddpppp..","...pppppppppp.d.","....ppp..ppp.dd.","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  cubchoo: { palette: { p: '#f8fafc', d: '#bae6fd', l: '#38bdf8', b: '#0f172a' }, grid: [
    "..dd........dd..",".dppd......dppd.","..dddddddddddd..","..dddbppppbddd..","...dddllllddd...",".....llllll.....","...pppppppppp...", "...pppppppppp...", "....pp....pp....","................","................","................","................","................","................","................"
  ]},
  beartic: { palette: { p: '#f8fafc', d: '#bae6fd', l: '#38bdf8', b: '#0f172a' }, grid: [
    "..pp........pp..","...pppppppppp...","...pppbppbppp...","...pppllllppp...", "..llllllllllll..",".pppppppppppppp.","pppppppppppppppp",".pppppppppppppp.","..ppp......ppp..","................","................","................","................","................","................","................"
  ]},
  cryogonal: { palette: { p: '#38bdf8', d: '#0284c7', l: '#e0f2fe', b: '#0f172a' }, grid: [
    "....ll.pp.ll....","..pp.pppppp.pp..",".ppppddddddpppp.",".ppddlbppblddpp.",".ppppddddddpppp.","..pp.pppppp.pp..","....ll.pp.ll....","......dddd......","................","................","................","................","................","................","................","................"
  ]},
  shelmet: { palette: { p: '#cbd5e1', d: '#dc2626', l: '#84cc16', b: '#0f172a' }, grid: [
    "....pppppppp....","..pppppppppppp..",".pppppppppppppp.",".pppddddddddppp.",".ppddllbppbllpp.","..dddddddddddd..","....dddddddd....","................","................","................","................","................","................","................","................","................"
  ]},
  accelgor: { palette: { p: '#dc2626', d: '#1e3a8a', l: '#84cc16', b: '#0f172a' }, grid: [
    "...pppppppppp...","..pppppppppppp..","...ddllbppbll...","....dddddddd....","...dddddddddd...", "..dd.dddddd.dd..",".....dddddd.....","......dddd......","................","................","................","................","................","................","................","................"
  ]},
  stunfisk: { palette: { p: '#a16207', d: '#78350f', l: '#facc15', b: '#0f172a' }, grid: [
    "................","................","................","....pppppppp....","..pppppppppppp..",".pppbpplllpbppp.",".pppppllllppppp.","..pppppppppppp..","................","................","................","................","................","................","................","................"
  ]},
  mienfoo: { palette: { p: '#facc15', d: '#dc2626', l: '#fef08a', b: '#0f172a' }, grid: [
    "...pp......pp...","...pppppppppp...","...ppbppppbpp...","....pppppppp....","...dddddddddd...", "..dd.pppppp.dd..","..d..pppppp..d..","....dddddddd....","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  mienshao: { palette: { p: '#e9d5ff', d: '#7e22ce', l: '#facc15', b: '#0f172a' }, grid: [
    "..pp........pp..","...pppppppppp...","...ppbppppbpp...","....dddddddd....",".pp.pppppppp.pp.","pppp.dddddd.pppp","pp...pppppp...pp","....dddddddd....","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  druddigon: { palette: { p: '#1d4ed8', d: '#dc2626', l: '#facc15', b: '#0f172a' }, grid: [
    "....dddddddd....","...dddddddddd...","...dddbppbddd...",".dd.pppppppp.dd.","ddddppppppppdddd",".dd.pppppppp.dd.","...pppppppppp.p.","...ppp....ppp.pp","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  golett: { palette: { p: '#38bdf8', d: '#0f766e', l: '#facc15', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pppppppp....","....pplbbllp....","...dddddddddd...", "..ppppddddpppp..",".pp..ddllld..pp.",".....ddddddd....","....ppp..ppp....","....ddd..ddd....","................","................","................","................","................","................","................"
  ]},
  golurk: { palette: { p: '#0284c7', d: '#1e293b', l: '#facc15', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pplbbllp....","..ddddppppdddd..",".ppppddddddpppp.","ppppddllllldpppp","pp..dddddddd..pp","...dddddddddd...", "...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  pawniard: { palette: { p: '#dc2626', d: '#1e293b', l: '#cbd5e1', b: '#0f172a' }, grid: [
    ".......ll.......",".....pppppp.....","....pppppppp....","....ddbppbdd....","....dddddddd....","..ll.pppppp.ll..","....ppddddpp....","....pppppppp....","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  bisharp: { palette: { p: '#b91c1c', d: '#1e293b', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [
    "......llll......","....pppppppp....","...pllbppbllp...","....dddddddd....","..ss.pppppp.ss..",".ss.ppsssspp.ss.","....ppsssspp....","...pppppppppp...","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  bouffalant: { palette: { p: '#78350f', d: '#451a03', l: '#facc15', s: '#cbd5e1', b: '#0f172a' }, grid: [
    "..dddddddddddd..",".dddddddddddddd.","ssddddddddddddss","ss..ddbppbdd..ss","....pppppppp....","...pppppppppp...", "..pppppppppppp..","...pp..pp..pp...","...dd..dd..dd...","................","................","................","................","................","................","................"
  ]},
  rufflet: { palette: { p: '#64748b', d: '#f8fafc', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    ".....dddddd.....","....ddllllld....","...dddddddddd...", "...ddpbppbpdd...","....ddssssdd....","..pppppppppppp..","...pppppppppp...","....dddddddd....",".....s....s.....","................","................","................","................","................","................","................"
  ]},
  braviary: { palette: { p: '#dc2626', d: '#1e3a8a', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: [
    "...llllllllll...","....llllllll....","....llpbppll....",".pp..llssll..pp.","pppppppppppppppp","ppppddddddddpppp",".pp..dddddd..pp.",".....s....s.....","................","................","................","................","................","................","................","................"
  ]},
  vullaby: { palette: { p: '#475569', d: '#f472b6', l: '#f8fafc', b: '#0f172a' }, grid: [
    ".....dddddd.....","....dddddddd....","...dddbppbddd...","....dddddddd....","...pppppppppp...","..llllllllllll..",".llllllllllllll.","..llllllllllll..",".....d....d.....","................","................","................","................","................","................","................"
  ]},
  mandibuzz: { palette: { p: '#78350f', d: '#f472b6', l: '#f8fafc', b: '#0f172a' }, grid: [
    "......llll......",".....dddddd.....","....ddbppldd....",".....dddddd.....",".pp.pppppppp.pp.","pppppppppppppppp",".pp.llllllll.pp.","....llllllll....",".....d....d.....","................","................","................","................","................","................","................"
  ]},
  heatmor: { palette: { p: '#b91c1c', d: '#d97706', l: '#facc15', s: '#64748b', b: '#0f172a' }, grid: [
    "....pppppppp....","...pppbpppppp...","..ppppppppppppp.","...dddddddddd...", "..ssppppppppss..",".ss.ppddddpp.ss.","....pppppppp.ss.","....ppp..ppp....","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  durant: { palette: { p: '#94a3b8', d: '#334155', l: '#ef4444', b: '#0f172a' }, grid: [
    "................","..dd..pppp......",".dd..ppllpp.ppp.","....pppppppppppp","....ddddpppppppp","...dd..dd..dd...","................","................","................","................","................","................","................","................","................","................"
  ]},
  deino: { palette: { p: '#2563eb', d: '#0f172a', l: '#db2777', b: '#0f172a' }, grid: [
    "......dddd......","....dddddddd....","...dddddddddd...", "...dddddddddd...", "....pppppppp....","...dddddddddd...", "...pppppppppp...", "...pp......pp...","...dd......dd...","................","................","................","................","................","................","................"
  ]},
  zweilous: { palette: { p: '#2563eb', d: '#0f172a', l: '#db2777', b: '#0f172a' }, grid: [
    "..dddd....dddd..",".dddddd..dddddd.","..ppppp..ppppp..","...ppp....ppp...","...dddddddddd...", "..ddddppppdddd..","..pppppppppppp..","...pp......pp...","...dd......dd...","................","................","................","................","................","................","................"
  ]},
  larvesta: { palette: { p: '#f8fafc', d: '#ea580c', l: '#38bdf8', b: '#0f172a' }, grid: [
    "..dd...dd...dd..",".dddd.pppp.dddd.","..dd.ppllpp.dd..",".dd..pppppp..dd.","....pppppppp....","...pppppppppp...","....dd.dd.dd....","................","................","................","................","................","................","................","................","................"
  ]},
  cobalion: { palette: { p: '#0284c7', d: '#0f172a', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [
    "..ll........ll..","...ll.pppp.ll...","....pppppppp....","....ppbppbpp....","...ssssssssss...","...pppppppppp...", "..pppppppppppp..","..ppp......ppp..","..lll......lll..","................","................","................","................","................","................","................"
  ]},
  terrakion: { palette: { p: '#78350f', d: '#451a03', l: '#ef4444', s: '#fde68a', b: '#0f172a' }, grid: [
    "..dd........dd..",".dddd.pppp.dddd.","..ddppppppppdd..","...pppbppbppp...","..ssssssssssss..",".pppppppppppppp.",".ppppdddddddppp.","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................","................"
  ]},
  virizion: { palette: { p: '#22c55e', d: '#14532d', l: '#f43f5e', s: '#fef3c7', b: '#0f172a' }, grid: [
    "..dd........dd..","...dd.pppp.dd...","....pppppppp....","....ppbppbpp....","....llllllll....","....ssssssss....","...pppppppppp...", "...pp......pp...","...dd......dd...","................","................","................","................","................","................","................"
  ]},
  tornadus: { palette: { p: '#16a34a', d: '#7e22ce', l: '#f8fafc', b: '#0f172a' }, grid: [
    "....llllllll....","...pppppppppp...","...pppbppbppp...","..ppppddddpppp..",".pp..pppppp..pp.","....dddddddd....","...llllllllll...","..llllllllllll..","....llllllll....","................","................","................","................","................","................","................"
  ]},
  thundurus: { palette: { p: '#38bdf8', d: '#1e3a8a', l: '#f8fafc', b: '#0f172a' }, grid: [
    "....llllllll....","...pppppppppp...","...pppbppbppp...","..ppppddddpppp..",".pp..pppppp..pp.","....dddddddd....","...llllllllll...","..llllllllllll..","....llllllll....","................","................","................","................","................","................","................"
  ]},
  landorus: { palette: { p: '#f97316', d: '#78350f', l: '#f8fafc', b: '#0f172a' }, grid: [
    "....llllllll....","...pppppppppp...","...pppbppbppp...","..ppppddddpppp..",".pp..pppppp..pp.","....dddddddd....","...llllllllll...","..llllllllllll..","....llllllll....","................","................","................","................","................","................","................"
  ]},
  keldeo: { palette: { p: '#fef3c7', d: '#38bdf8', l: '#ef4444', b: '#0f172a' }, grid: [
    ".....llllll.....","....llllllll....","...ddppppppdd...","....ppbppbpp....","....dddddddd....","...pppppppppp...", "...pppppppppp...", "...dd......dd...","................","................","................","................","................","................","................","................"
  ]},
  meloetta: { palette: { p: '#f8fafc', d: '#22c55e', l: '#1e293b', s: '#38bdf8', b: '#0f172a' }, grid: [
    "...dddddddddd...","..dddddddddddd..","..ddppppppppdd..","..ddppsbbsppdd..","...ddppppppdd...","....llllllll....","...llllllllll...","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},

  // --- KALOS (#659 - #721) ---
  bunnelby: { palette: { p: '#a8a29e', d: '#57534e', l: '#fef3c7', s: '#f472b6', b: '#0f172a' }, grid: [
    "...pp......pp...","..pspp....ppsp..","..pspp....ppsp..","...pp......pp...","....pppppppp....","...pppbppbppp...","...ppllllllpp...","....dddddddd....","...pppppppppp...","....pp....pp....","...lll....lll...","................","................","................","................","................"
  ]},
  diggersby: { palette: { p: '#a8a29e', d: '#78350f', l: '#facc15', s: '#fef3c7', b: '#0f172a' }, grid: [
    "..dd........dd..",".dddd.pppp.dddd.","..dd.ppbppb.dd..","....ppsssspp....","..pppppppppppp..",".pppllllllllppp.",".pppllllllllppp.","..dddddddddddd..","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................"
  ]},
  fletchling: { palette: { p: '#ef4444', d: '#64748b', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pppppppp....","....ppbppbps....","....pppppppp....","...dddddddddd...","..ddddlllllddd..","...dddddddddd.l.",".....dddddd..dl.",".....s....s.....","................","................","................","................","................","................","................"
  ]},
  fletchinder: { palette: { p: '#ea580c', d: '#334155', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    ".....pppppp.....","....pppppppp....","....ppbppbps....","...pppppppppp...","..ddddppppdddd..",".ddddlllllldddd.","..dd.dddddd.dd..",".....dl..ld.....",".....s....s.....","................","................","................","................","................","................","................"
  ]},
  talonflame: { palette: { p: '#dc2626', d: '#334155', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: [
    ".pp...pppp...pp.","pppp.ppbppb.pppp","pppppppppppppppp",".pppddddddddppp.","..dddllllllddd..","....dddddddd....","....dl.dd.ld....",".....l....l.....","................","................","................","................","................","................","................","................"
  ]},
  scatterbug: { palette: { p: '#1e293b', d: '#0f172a', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: [
    "......l..l......","....pppppppp....","...pppbppbppp...","...pppppppppp...","..llllllllllll..","...pppppppppp...","...pppppppppp...","....pp.pp.pp....","................","................","................","................","................","................","................","................"
  ]},
  spewpa: { palette: { p: '#f8fafc', d: '#1e293b', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "....pppppppp....","..pppppppppppp..",".pppddddddddppp.",".ppddlbppblddpp.",".pppppppppppppp.",".ppllsspppssllp.","..pppppppppppp..","....dddddddd....","................","................","................","................","................","................","................","................"
  ]},
  vivillon: { palette: { p: '#f43f5e', d: '#1e293b', l: '#f8fafc', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".ppp........ppp.","pplpp.dddd.pplpp","ppsppddbbddppspp",".ppppddddddpppp.",".ppplddddddlp.p.","..pp.dddddd.pp..","......dddd......","................","................","................","................","................","................","................","................","................"
  ]},
  litleo: { palette: { p: '#44403c', d: '#1c1917', l: '#ef4444', s: '#fde68a', b: '#0f172a' }, grid: [
    ".....llllll.....","...ppddddddpp...","...ddsbppbsdd...","...dddddddddd...", "....pppppppp..d.","...pppppppppp.dd","...pppppppppp...", "...pp......pp...","...dd......dd...","................","................","................","................","................","................","................"
  ]},
  pyroar: { palette: { p: '#d97706', d: '#78350f', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "...llllssssll...","..llssllllssll..",".llssddbppbsll..",".llssdddddddsl..","..llllpppppp.ll.","...pppppppppp...","...pppppppppp.d.","...pp......pp.dd","...dd......dd...","................","................","................","................","................","................","................"
  ]},
  flabebe: { palette: { p: '#f8fafc', d: '#22c55e', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "...lll....lll...","..lllls..sllll..","...lllpppp.ll...","....pppbppbp....",".....pppppp.....","....dddddddd....",".....dddddd.....","......dddd......","................","................","................","................","................","................","................","................"
  ]},
  floette: { palette: { p: '#f8fafc', d: '#16a34a', l: '#f43f5e', s: '#fde047', b: '#0f172a' }, grid: [
    "....llllllll....","...lllsssslll...","......dddd......","....pppppppp....","....pppbppbp....",".....dddddd.....","....pppppppp....",".....p....p.....","................","................","................","................","................","................","................","................"
  ]},
  florges: { palette: { p: '#f472b6', d: '#16a34a', l: '#f8fafc', s: '#fde047', b: '#0f172a' }, grid: [
    "..pppppppppppp..",".pppssppppssppp.","..ppppllllpppp..","....llpbppll....","...dddddddddd...","..dddddddddddd..","...dddddddddd...", "....dddddddd....",".....dddddd.....","................","................","................","................","................","................","................"
  ]},
  skiddo: { palette: { p: '#22c55e', d: '#78350f', l: '#fef3c7', s: '#ef4444', b: '#0f172a' }, grid: [
    "...ss......ss...","....llllllll....","...llbppppbll...","..pppppppppppp..",".pppppppppppppp.","..dddddddddddd..","..dddddddddddd..","...dd......dd...","................","................","................","................","................","................","................","................"
  ]},
  gogoat: { palette: { p: '#16a34a', d: '#78350f', l: '#f8fafc', s: '#eab308', b: '#0f172a' }, grid: [
    "..ss........ss..","...ss.llll.ss...","....llpbppll....","..pppppppppppp..",".pppppppppppppp.",".dddddddddddddd.","..dddddddddddd..","..dd........dd..","..ss........ss..","................","................","................","................","................","................","................"
  ]},
  pancham: { palette: { p: '#f8fafc', d: '#1e293b', l: '#22c55e', s: '#cbd5e1', b: '#0f172a' }, grid: [
    "..dd........dd..","..pppppppppppp..","..ppddbppbddpp..","...ppppppppppll.","...dddddddddd...", "..ddddppppdddd..","...dddddddddd...", "....dd....dd....","................","................","................","................","................","................","................","................"
  ]},
  pangoro: { palette: { p: '#1e293b', d: '#f8fafc', l: '#22c55e', s: '#475569', b: '#0f172a' }, grid: [
    "...pp......pp...","..dddddddddddd..","..ddpbppppbpdd..","..ddddddddddll..",".ppppdddddddppp.","ppppddddddddddpp","ppp..dddddd..ppp","....ppp..ppp....","...ddd....ddd...","................","................","................","................","................","................","................"
  ]},
  furfrou: { palette: { p: '#f8fafc', d: '#1e293b', l: '#cbd5e1', s: '#38bdf8', b: '#0f172a' }, grid: [
    "...pppppppppp...","..pppppppppppp..","..pppddbppbddp..","...pppddddddp...","....pppppppp....","...pppppppppp...", "..ppppddddpppp..","...dd......dd...","...pp......pp...","................","................","................","................","................","................","................"
  ]},
  espurr: { palette: { p: '#cbd5e1', d: '#64748b', l: '#c084fc', s: '#f8fafc', b: '#0f172a' }, grid: [
    "..pp........pp..","..dddd....dddd..","..pppppppppppp..","..pplbpppppblp..","...pppppppppp...","...ssssssssss...","....pppppppp....","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  meowstic: { palette: { p: '#1e3a8a', d: '#f8fafc', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: [
    "..pp........pp..","..pdpp....ppdp..","...pppppppppp...","...ppbppppbpp...","...dddddddddd...", "..ddppppppppdd..","...pppppppppp.dd","....ppp..ppp.ddd","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  honedge: { palette: { p: '#94a3b8', d: '#78350f', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: [
    ".......ss.......","......dddd......","......dlld......",".....dddddd.....","......pppp......","......pppp..ll..","......pppp.lll..","......pppp.ll...","......pppp......",".......pp.......","................","................","................","................","................","................"
  ]},
  doublade: { palette: { p: '#94a3b8', d: '#db2777', l: '#f472b6', s: '#eab308', b: '#0f172a' }, grid: [
    "..ss........ss..",".dddd......dddd.","..dlp......pld..","...pp.dddd.pp...","...pppppppppp...","..ll.pppppp.ll..",".....pp..pp.....","................","................","................","................","................","................","................","................","................"
  ]},
  aegislash: { palette: { p: '#eab308', d: '#475569', l: '#a855f7', s: '#f8fafc', b: '#0f172a' }, grid: [
    ".......ss.......","......dddd......","..pppppppppppp..",".pppllppppllppp.",".pppllllllllppp.","..ppppddddpppp..","....pppppppp....",".....dddddd.....","......ssss......","................","................","................","................","................","................","................"
  ]},
  spritzee: { palette: { p: '#f472b6', d: '#be185d', l: '#fce7f3', s: '#ef4444', b: '#0f172a' }, grid: [
    "....pppppppp....","...pppppppppp...","..ppllsbbllspp..","..ppllllllllpp..","...pppddddppp...","....pppppppp....",".....dd..dd.....","................","................","................","................","................","................","................","................","................"
  ]},
  aromatisse: { palette: { p: '#ec4899', d: '#831843', l: '#fce7f3', s: '#fde047', b: '#0f172a' }, grid: [
    "..llll....llll..",".llllll..llllll.","...pppppppppp...","...ppsbppbspl...","..llllllllllll..",".llllllllllllll.",".ll.dddddddd.ll.","....dddddddd....","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  swirlix: { palette: { p: '#fce7f3', d: '#db2777', l: '#ffffff', s: '#f472b6', b: '#0f172a' }, grid: [
    "....llllllll....","..pppppppppppp..",".pppppppppppppp.",".ppppbppppbpppp.",".ppppppddpppppp.","..pppppppppppp..","....dd....dd....","................","................","................","................","................","................","................","................","................"
  ]},
  slurpuff: { palette: { p: '#fbcfe8', d: '#be185d', l: '#ffffff', s: '#ef4444', b: '#0f172a' }, grid: [
    "......ssss......","...llllllllll...","..llllllllllll..","..ppppbppbpppp..",".ppppppddpppppp.",".pppllllllllppp.","..ppllllllllpp..","....dd....dd....","................","................","................","................","................","................","................","................"
  ]},
  inkay: { palette: { p: '#38bdf8', d: '#f472b6', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: [
    "....dddddddd....","..ddllllllllldd.","..dddddddddddd..","...ssssssssss...","...ssbppppbss...","....pppppppp....","...pp.pppp.pp...","..pp..p..p..pp..","................","................","................","................","................","................","................","................"
  ]},
  malamar: { palette: { p: '#6b21a8', d: '#f472b6', l: '#fde047', s: '#f8fafc', b: '#0f172a' }, grid: [
    "..ss..pppp..ss..","..ss.pppppp.ss..","...pppppppppp...","...pplbppblpp...","..ddddppppdddd..",".dd.llllllll.dd.","....llllllll....","...pp.pp.pp.pp..","................","................","................","................","................","................","................","................"
  ]},
  binacle: { palette: { p: '#f97316', d: '#78350f', l: '#38bdf8', s: '#a8a29e', b: '#0f172a' }, grid: [
    "..pppp....pppp..",".ppddpp..ppddpp.",".ppllpp..ppllpp.","..dddd....dddd..","...dddddddddd...", "..ssssssssssss..",".ssssssssssssss.","................","................","................","................","................","................","................","................","................"
  ]},
  barbaracle: { palette: { p: '#78350f', d: '#ea580c', l: '#38bdf8', s: '#f8fafc', b: '#0f172a' }, grid: [
    "..dd..dddd..dd..",".dddd.dddd.dddd.","..pp..dbbd..pp..",".pppppppppppppp.",".pp.pppppppp.pp.","....pppppppp....","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................","................"
  ]},
  skrelp: { palette: { p: '#92400e', d: '#7e22ce', l: '#c084fc', s: '#ef4444', b: '#0f172a' }, grid: [
    "....pp..pp......","...pppppppp.....","..pppbppbp......","...dddddddd.....","....pppppp.dd...","...ppppppppddd..","....dddddd..dd..","................","................","................","................","................","................","................","................","................"
  ]},
  dragalge: { palette: { p: '#7e22ce', d: '#78350f', l: '#f43f5e', s: '#4ade80', b: '#0f172a' }, grid: [
    "..ll........ll..","...ll.dddd.ll...","....ddpbppdd....","..ss.pppppp.ss..","....pppppppp....","...pppppppppp...", "....dddddddd....",".....pppppp.....","................","................","................","................","................","................","................","................"
  ]},
  clauncher: { palette: { p: '#38bdf8', d: '#0284c7', l: '#facc15', s: '#1e293b', b: '#0f172a' }, grid: [
    "..pppppp........",".pppppppp..ll...",".ppddppppppppp..",".ppppppppbpppp..","..pppp..pppppp..","........dddd....","................","................","................","................","................","................","................","................","................","................"
  ]},
  clawitzer: { palette: { p: '#2563eb', d: '#1e3a8a', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    ".pppppppp.......","pppppppppp..ll..","pppddddpppppppp.","pppppppppppbppp.",".pppppppp.ppppp.","..pppppp...dddd.","................","................","................","................","................","................","................","................","................","................"
  ]},
  helioptile: { palette: { p: '#facc15', d: '#78350f', l: '#fef08a', s: '#38bdf8', b: '#0f172a' }, grid: [
    "..dddd....dddd..",".ddppd....dppdd.","..ddppppppppdd..","...ppsbppbspl...","....pppppppp....","....llllllll....","...pppppppppp...", "....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  heliolisk: { palette: { p: '#facc15', d: '#ea580c', l: '#fef08a', s: '#1e293b', b: '#0f172a' }, grid: [
    "...dddddddddd...","..ddddppppdddd..",".ddddpbppbpdddd.","..ddddppppdddd..","...pppppppppp...", "...pppppppppp...", "....ppp..ppp.dd.","....pp....pp....","................","................","................","................","................","................","................","................"
  ]},
  tyrunt: { palette: { p: '#78350f', d: '#451a03', l: '#f8fafc', s: '#f97316', b: '#0f172a' }, grid: [
    "....ssssssss....","...pppppppppp...","..ppppbppbpppp..","..ppllllllllpp..","...llllllllll...", "...pppppppppp.p.","...ppp....pppppp","...lll....lll...","................","................","................","................","................","................","................","................"
  ]},
  tyrantrum: { palette: { p: '#b91c1c', d: '#7f1d1d', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: [
    "...ssssssssss...","..pppppppppppp..",".pppppbppbppppp.",".llllllllllllll.","..pppppppppppp..",".ppppddddddpppp.","..ppppppppppppd.","...ppp....pppdd.","...lll....lll...","................","................","................","................","................","................","................"
  ]},
  amaura: { palette: { p: '#7dd3fc', d: '#0284c7', l: '#fde047', s: '#f472b6', b: '#0f172a' }, grid: [
    "...ll......ll...","..lssl....lssl..","...pppppppppp...","...ppbppppbpp...","....pppppppp....","....pppppppp....","...pppppppppp.ll","...pppppppppp.ll","...pp......pp...","................","................","................","................","................","................","................"
  ]},
  aurorus: { palette: { p: '#38bdf8', d: '#1d4ed8', l: '#f8fafc', s: '#fde047', b: '#0f172a' }, grid: [
    "..llll....llll..",".llssppppppssll.","..llppbppbpp.ll.","....pppppppp.ll.","....pppppppp.ll.","...ddddddddddll.","..ddddppppdddd..","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................","................"
  ]},
  hawlucha: { palette: { p: '#22c55e', d: '#dc2626', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: [
    "....dddddddd....","...ddppssppdd...","...ddpbppbpdd...",".dd.llllllll.dd.","ddddlllllllllddd","pp..llllllll..pp","....pppppppp....","....ss....ss....","................","................","................","................","................","................","................","................"
  ]},
  dedenne: { palette: { p: '#f97316', d: '#1e293b', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: [
    "..dd........dd..",".dppd......dppd.","..pppppppppppp..","..ppbppppppbpp..","..ppspppppplsp..","...pppllllppp...", "...pppllllppp.d.","....pppppppp.dd.","....pp....pp....","................","................","................","................","................","................","................"
  ]},
  carbink: { palette: { p: '#94a3b8', d: '#475569', l: '#38bdf8', s: '#f8fafc', b: '#0f172a' }, grid: [
    "...ll......ll...","....llllllll....","...pppppppppp...","...pplbppblpp...","..ssssssssssss..",".ssssssssssssss.","..ddddppppdddd..","...ddlllllldd...","....dddddddd....","................","................","................","................","................","................","................"
  ]},
  goomy: { palette: { p: '#d8b4fe', d: '#9333ea', l: '#4ade80', s: '#fae8ff', b: '#0f172a' }, grid: [
    "....pp....pp....",".....p....p.....","....pppppppp....","...pppppppppp...","..ppplbppblppp..","..pppddddddppp..",".dddddddddddddd.","..ddddppppdddd..","................","................","................","................","................","................","................","................"
  ]},
  sliggoo: { palette: { p: '#c084fc', d: '#7e22ce', l: '#4ade80', s: '#f8fafc', b: '#0f172a' }, grid: [
    "...pp......pp...","....pppppppp....","...ppplllpppp...","....pppppppp....","...ppddddddpp...","..ppddddddddpp..","..pppddddddppp..","...pppppppppp...","................","................","................","................","................","................","................","................"
  ]},
  goodra: { palette: { p: '#c084fc', d: '#7e22ce', l: '#4ade80', s: '#fae8ff', b: '#0f172a' }, grid: [
    "..pp........pp..","...pp.pppp.pp...","....pppbppbp....","....pppppppp....","...ppsssssspp...","..pppssssssppp..",".ppppllllllpppp.","..ppppppppppppd.","...ppp....pppdd.","................","................","................","................","................","................","................"
  ]},
  klefki: { palette: { p: '#cbd5e1', d: '#64748b', l: '#f472b6', s: '#facc15', b: '#0f172a' }, grid: [
    "....pppppppp....","..pp........pp..",".pp...llll...pp.",".pp..llllll..pp.","..pp.llbppb.pp..","....pppppppp....","...ss..dd..pp...","...ss..dd..pp...","................","................","................","................","................","................","................","................"
  ]},
  phantump: { palette: { p: '#44403c', d: '#1c1917', l: '#22c55e', s: '#ef4444', b: '#0f172a' }, grid: [
    "...ll......ll...","..pppp....pppp..","..pppppppppppp..","..pppsbppbsplp..","...pppppppppp...","....dddddddd....","...dddddddddd...", "....dd....dd....","................","................","................","................","................","................","................","................"
  ]},
  trevenant: { palette: { p: '#78350f', d: '#15803d', l: '#22c55e', s: '#ef4444', b: '#0f172a' }, grid: [
    "..dddddddddddd..",".dddddddddddddd.","...pppppppppp...","...ppppbssbpp...",".pp.pppppppp.pp.","pppp..pppp..pppp","....pppppppp....","...pp.pp.pp.pp..","................","................","................","................","................","................","................","................"
  ]},
  pumpkaboo: { palette: { p: '#f97316', d: '#44403c', l: '#fde047', s: '#c084fc', b: '#0f172a' }, grid: [
    ".....dddddd.....","....dddddddd....","...ddddbppbddd..","....dddddddd....","..pppppppppppp..",".pppllppppllppp.",".pppppppppppppp.","..pppppppppppp..","................","................","................","................","................","................","................","................"
  ]},
  gourgeist: { palette: { p: '#ea580c', d: '#1c1917', l: '#f472b6', s: '#fde047', b: '#0f172a' }, grid: [
    "....llllllll....","...llllllllll...","...llddbppbdd...","....dddddddd....","...dddddddddd...", "..pppppppppppp..",".pppssppppssppp.","..pppppppppppp..","....dd....dd....","................","................","................","................","................","................","................"
  ]},
  bergmite: { palette: { p: '#bae6fd', d: '#0284c7', l: '#ffffff', s: '#facc15', b: '#0f172a' }, grid: [
    "......llll......","....llllllll....","..llllppppllll..",".pppppppppppppp.",".pppsbppppbsppp.","..dddddddddddd..","...dd..dd..dd...","................","................","................","................","................","................","................","................","................"
  ]},
  avalugg: { palette: { p: '#7dd3fc', d: '#0369a1', l: '#ffffff', s: '#38bdf8', b: '#0f172a' }, grid: [
    "................","................",".llllllllllllll.","pppppppppppppppp","pppsbpppppplpppp","dddddddddddddddd",".ddd..dddd..ddd.","................","................","................","................","................","................","................","................","................"
  ]},
  noibat: { palette: { p: '#9333ea', d: '#1e293b', l: '#2dd4bf', s: '#c084fc', b: '#0f172a' }, grid: [
    "..dddd....dddd..",".ddllld..dllldd.","..ddddppppdddd..","...pppbppbppp...",".dd.pppppppp.dd.","dddd..dddd..dddd",".....pp..pp.....","................","................","................","................","................","................","................","................","................"
  ]},
  noivern: { palette: { p: '#4c1d95', d: '#14b8a6', l: '#ef4444', s: '#f8fafc', b: '#0f172a' }, grid: [
    "..dddd....dddd..","...pppppppppp...",".pp.ppbppbpp.pp.","pppp.ssssss.pppp","ppddppppppppddpp",".dd..pppppp..dd.","....ppp..ppp....","................","................","................","................","................","................","................","................","................"
  ]},
  xerneas: { palette: { p: '#2563eb', d: '#0f172a', l: '#fde047', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".ll..ll..ll..ll.","..llllllllllll..","....ssssssss....","....ssbppbs.....","....pppppppp....","...pppppppppp...", "..ddddppppdddd..","..dd........dd..","..ll........ll..","................","................","................","................","................","................","................"
  ]},
  yveltal: { palette: { p: '#dc2626', d: '#0f172a', l: '#38bdf8', s: '#94a3b8', b: '#0f172a' }, grid: [
    ".pp....ll....pp.","pppp..pppp..pppp","ppddpppbppbppddp",".ppddddddddddpp.","...ssssddddss...","....pppppppp....","...ppddppddpp...","..dd........dd..","................","................","................","................","................","................","................","................"
  ]},
  zygarde: { palette: { p: '#22c55e', d: '#0f172a', l: '#f8fafc', s: '#4ade80', b: '#0f172a' }, grid: [
    "..dd..pppp..dd..",".ddddppppppdddd.",".dd.pplllpp.dd..","....dddddddd....","...pppddddppp...","..ppppddddpppp..","...dddddddddd...", "....pppppppp....","................","................","................","................","................","................","................","................"
  ]},
  diancie: { palette: { p: '#f472b6', d: '#94a3b8', l: '#ffffff', s: '#ef4444', b: '#0f172a' }, grid: [
    "....pppppppp....","..pppppppppppp..","...ddlsbbsldd...","....llllllll....","...dddddddddd...", "..ddppppppppdd..",".pppppppppppppp.","..pppppppppppp..","................","................","................","................","................","................","................","................"
  ]},
  hoopa: { palette: { p: '#d8b4fe', d: '#7e22ce', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [
    "..ll..dddd..ll..","...dddddddddd...","...pppbppbppp...","....pppppppp....","..ll.ppllpp.ll..","....pppppppp....",".....dddddd.....","................","................","................","................","................","................","................","................","................"
  ]},
  volcanion: { palette: { p: '#b91c1c', d: '#0284c7', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: [
    "...dddd..dddd...","..dd..pppp..dd..",".dd..pppppp..dd.",".pp.pppbppbp.pp.","ppppppddddpppppp",".pppppppppppppp.","..ppp......ppp..","..lll......lll..","................","................","................","................","................","................","................","................"
  ]},
  // --- ALOLA (#722 - #809) ---
  rowlet: { palette: { p: '#d6b37c', d: '#78350f', l: '#ffffff', s: '#22c55e', b: '#0f172a' }, grid: [
    "................","....pppppppp....","..pppppppppppp..",".pppllllppplllp.",".ppplbpppppblpp.",".pppplllsslllpp.",".pppppssssssppp.",".pppllsllllsllp.",".pppllllllllllp.","..ppddddddddddp.","...ddddddddddd..",".....ss....ss...","....sss....sss..","................","................","................"
  ]},
  dartrix: { palette: { p: '#d6b37c', d: '#15803d', l: '#ffffff', s: '#f97316', b: '#0f172a' }, grid: [
    "................","...dddddddddd...","..dddddddddddd..",".ddddllpppbpddd.",".dddllbppppbddd.","..ddllllllllll..","..pppsssssssspp.",".pppddddddddddpp",".pp.llllllllll.p","....llllllllll..","....dddddddddd..",".....ss....ss...","....sss....sss..","................","................","................"
  ]},
  decidueye: { palette: { p: '#15803d', d: '#78350f', l: '#fef3c7', s: '#ef4444', b: '#0f172a' }, grid: [
    "......llll......","....pppppppp....","..pppppppppppp..",".pppssddddssppp.",".pppddbppbddppp.","..pppppppppppp..",".ddddllllllllldd","dddppllllllllppd","dd.ppllllllllpp.","...dddddddddd...", "...dddd..dddd...","...ddd....ddd...","...lll....lll...","...ll......ll...","................","................"
  ]},
  litten: { palette: { p: '#1e293b', d: '#0f172a', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [
    "................","..pp........pp..",".plpp..ll..pplp.","..ppppllllpppp..","..ppsbppppbspp..","..ppppllllpppp..","...dddddddddd...", "...pppllllppp.dd","...pppppppppp.dl","...pppppppppp.dd","...pp......pp...", "...pp......pp...", "...ll......ll...", "................","................","................"
  ]},
  torracat: { palette: { p: '#ef4444', d: '#1e293b', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: [
    "................","..dd........dd..",".dppd.dddd.dppd.","..ppppddddpppp..","..pplbppppblpp..","...pppppppppp...", "...ddddllllldd..","..pppppppppppp.d",".dppppddddddpppd",".ddppppppppppdd.","..ppp......ppp..","..ppp......ppp..","..ddd......ddd..","................","................","................"
  ]},
  incineroar: { palette: { p: '#dc2626', d: '#1e293b', l: '#facc15', s: '#94a3b8', b: '#0f172a' }, grid: [
    "..dd........dd..",".dddd.pppp.dddd.","..ddppbppbppdd..","...dddddddddd...", ".ppppddddddpppp.","ppppddssssddpppp","ppddssssssssddpp",".dd.llllllll.dd.","...dddddddddd...", "..pppp....pppp..","..dddd....dddd..","..ppp......ppp..","..ddd......ddd..","................","................","................"
  ]},
  popplio: { palette: { p: '#2563eb', d: '#1e3a8a', l: '#38bdf8', s: '#f43f5e', b: '#0f172a' }, grid: [
    "................","...pp......pp...","..pppppppppppp..","..pppbppppbppp..","...pppssssppp...", "....pppppppp....","..llllllllllll..","..llllllllllll..","...pppppppppp...", "..ppppddddpppp..",".pppppppppppppp.","..ppp......ppp..","..lll......lll..","................","................","................"
  ]},
  brionne: { palette: { p: '#38bdf8', d: '#2563eb', l: '#f8fafc', s: '#f472b6', b: '#0f172a' }, grid: [
    "..ll........ll..",".lsll.pppp.llsl.","..llppppppppll..","...pppbppbppp...","....ppsssspp....","..llllllllllll..",".llllllllllllll.","..ddddppppdddd..",".llllllllllllll.","..llllllllllll..","...dddddddddd...", "...lll....lll...","................","................","................","................"
  ]},
  primarina: { palette: { p: '#f8fafc', d: '#38bdf8', l: '#f472b6', s: '#fde047', b: '#0f172a' }, grid: [
    "....ssssssss....","..ddddppppdddd..",".ddddppppppdddd.","..ddpppbppbpp...","....ppplllpp....","...pppppppppp...", "..ddppppppppdd..",".ddddppppppdddd.","..ppppddddpppp..","..ddddppppdddd..","...dddddddddd...", "..dddddddddddd..","..llllllllllll..","................","................","................"
  ]},
  pikipek: { palette: { p: '#1e293b', d: '#dc2626', l: '#f8fafc', s: '#38bdf8', b: '#0f172a' }, grid: [
    ".....dddddd.....","....dddddddd....","...dddllllddd...","...ddpbppbpdd...","...llllssssss...","..pppppppppp....",".pppppllllppp...",".pppppllllppp...","..ppppppppppp...","...pppppppppp...","....pppppppp....",".....s....s.....","....ss....ss....","................","................","................"
  ]},
  toucannon: { palette: { p: '#1e293b', d: '#f97316', l: '#facc15', s: '#dc2626', b: '#0f172a' }, grid: [
    "................","...pppppppp.....","..pppppppppp....",".pppbppddddss...",".pppppddddddss..",".ppppppllllss...","..pppppppppp....",".pppppppppppp...","pppppppppppppp..",".pppppppppppp...", "..pppppppppp....","....ll....ll....","...lll....lll...","................","................","................"
  ]},
  rockruff: { palette: { p: '#a16207', d: '#451a03', l: '#fef3c7', s: '#38bdf8', b: '#0f172a' }, grid: [
    "..dd........dd..",".dppd......dppd.","..pppppppppppp..","..ppsbppppbspp..","...pppddddppp...", "..llllllllllll..",".lldd.llll.ddll.","..pppppppppppp.l","..pppppppppppp.l","..pppppppppppp..","..ppp......ppp..","..ppp......ppp..","..ddd......ddd..","................","................","................"
  ]},
  lycanroc: { palette: { p: '#b45309', d: '#451a03', l: '#f8fafc', s: '#38bdf8', b: '#0f172a' }, grid: [
    "..dd........dd..",".dppd.llll.dppd.","..pppppppppppp..","..ppsbppppbspp..",".lllllddddlllll.","llllllppppllllll",".llddppppppddll.","...pppppppppp.ll","..ppppddddppppll","..ppp......ppp..","..ppp......ppp..","..lll......lll..","..ddd......ddd..","................","................","................"
  ]},
  mimikyu: { palette: { p: '#fef08a', d: '#a16207', l: '#ef4444', s: '#0f172a', b: '#0f172a' }, grid: [
    "..ss........ss..",".spps......spps.","..pppp....pppp..","...pppppppppp...","..pppppppppppp..",".pppllsbbllsppp.",".pppppppppppppp.","..ddddppppdddd..","...pppssssppp...", "..ppppbbbbpppp..",".pppppppppppppp.",".dddd.dddd.dddd.","................","................","................","................"
  ]},
  kommo_o: { palette: { p: '#94a3b8', d: '#ca8a04', l: '#facc15', s: '#dc2626', b: '#0f172a' }, grid: [
    "..llll....llll..",".llssddddddssll.",".llddppppppddll.","..ddpppbppbppdd.","...dddddddddd...", ".ddppppddddppppd","dddpppddddddpppd","dd.pppddddddppp.","...pppppppppp.dd","...pppp..pppp.ll","...ppp....ppp...", "...ddd....ddd...","...lll....lll...","................","................","................"
  ]},
  tapu_koko: { palette: { p: '#facc15', d: '#1e293b', l: '#f97316', s: '#ffffff', b: '#0f172a' }, grid: [
    ".....pppppp.....","...pppppppppp...","..pppppppppppp..",".ll..ddbppbdd.ll","llll.dddddddd.ll","llpp.dddddd.ppll","llpp.ssssss.ppll",".ll..dddddd..ll.",".....dddddd.....","....pppppppp....",".....dd..dd.....",".....dd..dd.....","................","................","................","................"
  ]},
  
  zeraora: { palette: { p: '#facc15', d: '#1e293b', l: '#38bdf8', s: '#f8fafc', b: '#0f172a' }, grid: [
    "..dd........dd..",".dppd.llll.dppd.","..pppppppppppp..","..pplbppppblpp..","...dddddddddd...", ".llppppddddpp.ll","llddppppppppddll","..dd.dddddd.dd..","...pppppppppp...", "...ppp....ppp...","...ddd....ddd...","...lll....lll...","................","................","................","................"
  ]},
  trumbeak:     { palette: { p: '#1e293b', d: '#dc2626', l: '#f97316', s: '#f8fafc', b: '#0f172a' }, grid: [".....dddddd.....","....dddddddd....","...ddpbppbpdd...","...ddssssssllll.","..ppppppppppppp.",".pppppsssssspp..",".pppppsssssspp..","..pppppppppp....","...pppppppp.....","....pppppp......",".....l....l.....","....ll....ll....","................","................","................","................"]},
  yungoos:      { palette: { p: '#b45309', d: '#78350f', l: '#fde047', s: '#fef3c7', b: '#0f172a' }, grid: ["................","...llllllllll...","..llllllllllll..","..pppbppppbppp..","..ppsssssssspp..","...pppppppppp...","..ppppddddpppp..",".pppppssssppppp.",".pppppsssspppp.d","..ppppppppppppdd","...ppp....ppp...","...ddd....ddd...","................","................","................","................"]},
  gumshoos:     { palette: { p: '#b45309', d: '#78350f', l: '#fde047', s: '#fef3c7', b: '#0f172a' }, grid: ["...llllllllll...","..llllllllllll..","..llllbppbllll..","...pppppppppp...","..pppppppppppp..",".pp.ssssssss.pp.",".pp.ssssssss.pp.","..pp.ssssss.pp..","...pppppppppp...", "...ppp....ppp...","...ddd....ddd...","...ddd....ddd...","................","................","................","................"]},
  grubbin:      { palette: { p: '#f8fafc', d: '#ca8a04', l: '#f97316', s: '#eab308', b: '#0f172a' }, grid: ["................","...ll......ll...","..llll....llll..","...dddddddddd...","..dddsbppbssdd..","..pppppppppppp..",".pppssppppssppp.",".pppppppppppppp.","..pppssppppsspp.","...pppppppppp...","....dd.dd.dd....","................","................","................","................","................"]},
  charjabug:    { palette: { p: '#16a34a', d: '#14532d', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["................","..pppppppppppp..",".ppppddddddddpp.",".ppppssllllsspp.","pppppsbppppbsppp","pppppssssssssppp","ppppdddddddddddd",".dddddddddddddd.","..ss..ss..ss..ss","................","................","................","................","................","................","................"]},
  vikavolt:     { palette: { p: '#1e3a8a', d: '#0f172a', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["..ll........ll..",".llll......llll.","..ll.pppppp.ll..","...pppppppppp...",".sspppsbbspppss.","ssssppppppppssss",".ss.dddddddd.ss.","....pppppppp....","....pppddppp....",".....pppppp.....","......dddd......",".......ll.......","................","................","................","................"]},
  crabrawler:   { palette: { p: '#7e22ce', d: '#4c1d95', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["..llll....llll..",".llllll..llllll.","..llll....llll..","...pp.ssss.pp...","....pppppppp....","...pppbppbppp...","..ppppddddpppp..",".pp..pppppp..pp.","...ppp.pp.ppp...","..pp...pp...pp..","..dd........dd..","................","................","................","................","................"]},
  crabominable: { palette: { p: '#f8fafc', d: '#94a3b8', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["..pppp....pppp..",".ppllpp..ppllpp.",".pppppp..pppppp.","..ppp.ssss.ppp..","...pppppppppp...","..ppppbppbpppp..",".pppppddddppppp.","pp..pppppppp..pp","...ppp.pp.ppp...","..ppp..pp..ppp..","..lll......lll..","................","................","................","................","................"]},
  oricorio:     { palette: { p: '#ef4444', d: '#991b1b', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: ["....ppp..ppp....","...pppppppppp...","....ppbppbpp....",".....ppsspp.....",".pp..pppppp..pp.","pppp.dddddd.pppp","pppp.pppppp.pppp",".pp..dddddd..pp.","....pppppppp....",".....dddddd.....",".....s....s.....","....ss....ss....","................","................","................","................"]},
  cutiefly:     { palette: { p: '#fef08a', d: '#ca8a04', l: '#ffffff', s: '#78350f', b: '#0f172a' }, grid: ["................","......s..s......","..ll.pppppp.ll..",".llllpbppbpllll.",".llllppppppllll.","..ll.pppppp.ll..","....ssssssss....",".....pppppp.....","....s..ss..s....","................","................","................","................","................","................","................"]},
  ribombee:     { palette: { p: '#facc15', d: '#92400e', l: '#fef3c7', s: '#ef4444', b: '#0f172a' }, grid: ["....dd....dd....","...pppppppppp...","...pppbppbppp...","..ssssssssssss..",".ll.ssssssss.ll.","llllppppppppllll","llllpddddddpllll",".ll..pppppp..ll.",".....dddddd.....",".....pp..pp.....","....dd....dd....","................","................","................","................","................"]},
  wishiwashi:   { palette: { p: '#38bdf8', d: '#1e3a8a', l: '#f8fafc', s: '#bae6fd', b: '#0f172a' }, grid: ["................",".....dddddd.....","...dddddddddd.p.",".llllllllllllppp","lllbpplllllllppp","llllppppppppp.pp",".dddddddddddd.p.",".....dddddd.....","................","................","................","................","................","................","................","................"]},
  mareanie:     { palette: { p: '#a855f7', d: '#581c87', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["......ssss......","....ssssssss....","..pppppppppppp..",".ppddddddddddpp.",".ppdllsbbslldpp.",".pp.llllllll.pp.",".pp.llllllll.pp.","..pp.llllll.pp..","...pp..ll..pp...","................","................","................","................","................","................","................"]},
  toxapex:      { palette: { p: '#38bdf8', d: '#1e3a8a', l: '#f472b6', s: '#a855f7', b: '#0f172a' }, grid: ["......ssss......","....pppppppp....","..ppppddddpppp..",".ppddppppppddpp.",".ppdpplbbplpdpp.","ppppppddddpppppp","pp.pp.llll.pp.pp","pp.pp.llll.pp.pp","..pp........pp..","................","................","................","................","................","................","................"]},
  mudbray:      { palette: { p: '#92400e', d: '#451a03', l: '#d6d3d1', s: '#1c1917', b: '#0f172a' }, grid: ["..pp........pp..",".pdpp.ssss.ppdp.","..pppppppppppp..","..pplbppppblpp..","...llllllllll...", "...pppppppppp.ss","..ppppddddppppss","..pppppppppppp..","..ppp......ppp..","..ddd......ddd..","..sss......sss..","................","................","................","................","................"]},
  mudsdale:     { palette: { p: '#92400e', d: '#1c1917', l: '#ea580c', s: '#d6d3d1', b: '#0f172a' }, grid: ["..dd..llll..dd..",".ddddlllllldddd.","..ddpppbppbppdd.","...ddddssssdd...", "..ppppddddpppp..",".ppppppppppppppd",".ppppddddddpppdd","..ppp......ppp..","..lll......lll..","..lll......lll..","..ddd......ddd..","................","................","................","................","................"]},
  dewpider:     { palette: { p: '#84cc16', d: '#15803d', l: '#38bdf8', s: '#bae6fd', b: '#0f172a' }, grid: ["....llllllll....","..llssssssssll..",".llssppppppssll.",".llsspbppbpssll.","..llssssssssll..","....dddddddd....","...pppppppppp...","..pp..pppp..pp..",".pp...d..d...pp.",".d............d.","................","................","................","................","................","................"]},
  araquanid:    { palette: { p: '#84cc16', d: '#1e293b', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["....llllllll....","..llssssssssll..",".llssddbppbddll.","..llssssssssll..",".pp..pppppp..pp.","pp..pppddppp..pp","p..pppppppppp..p","..pp..dddd..pp..",".pp..........pp.",".l............l.","................","................","................","................","................","................"]},
  fomantis:     { palette: { p: '#86efac', d: '#16a34a', l: '#f472b6', s: '#fce7f3', b: '#0f172a' }, grid: ["....dd....dd....","...dddd..dddd...","....llllllll....","...lllpbpplll...","....llllllll....","..ddddppppdddd..",".dddd.llll.dddd.","..dd..ssss..dd..",".....ssssss.....",".....ll..ll.....","....dd....dd....","................","................","................","................","................"]},
  lurantis:     { palette: { p: '#f472b6', d: '#be185d', l: '#fce7f3', s: '#86efac', b: '#0f172a' }, grid: ["...ss......ss...","..ssssllllssss..","...llllllllll...","...llpbppppbl...","....pppppppp....",".ppppdddddddppp.","pppp..llll..pppp",".pp..llllll..pp.","....pppppppp....","...pppp..pppp...","...ddd....ddd...","................","................","................","................","................"]},
  morelull:     { palette: { p: '#f472b6', d: '#a855f7', l: '#f8fafc', s: '#fef08a', b: '#0f172a' }, grid: ["....pp.dd.pp....","..ppppddddpppp..",".ppppppddpppppp.",".ppddppppppddpp.","..dddddddddddd..","....llllllll....","....lllbllbll...",".....llllll.....",".....llllll.....","....ll.ll.ll....","................","................","................","................","................","................"]},
  shiinotic:    { palette: { p: '#f472b6', d: '#9333ea', l: '#f8fafc', s: '#fde047', b: '#0f172a' }, grid: ["...pppppppppp...","..ppssppppsspp..",".ppddddddddddpp.","ppddddppppddddpp",".dddddddddddddd.","....llllllll....","....llbppbl.....","...llllllllll...","..ll.llllll.ll..",".....llllll.....","....ll....ll....","................","................","................","................","................"]},
  salandit:     { palette: { p: '#1e293b', d: '#0f172a', l: '#ef4444', s: '#a855f7', b: '#0f172a' }, grid: ["................","....pppppppp....","...ppsbppbspl...","....pppppppp....",".....dddddd.....","...pppppppppp...", "..pp.ppllpp.pp..","....ppddddpp.dd.","....pppppppp.pd.","...pp......pp...", "...dd......dd...", "................","................","................","................","................"]},
  salazzle:     { palette: { p: '#334155', d: '#0f172a', l: '#ec4899', s: '#a855f7', b: '#0f172a' }, grid: ["...dd......dd...","....pppppppp....","...ppsbppbspl...","....dddddddd....",".....pppppp.....","...pppppppppp...", "..pp.ppllpp.pp..",".p...ppsspp...p.","....pppppppp.dd.","...ppp....pppdd.","...ddd....ddd...","................","................","................","................","................"]},
  stufful:      { palette: { p: '#f472b6', d: '#78350f', l: '#f8fafc', s: '#fbcfe8', b: '#0f172a' }, grid: ["..pp........pp..",".pllp......pllp.","..pppppppppppp..","..pppbppppbppp..","..ppppllllpppp..","..dddddddddddd..",".dddddddddddddd.","..dddddddddddd.p","...ddd....ddd.ll","...ddd....ddd...","................","................","................","................","................","................"]},
  bewear:       { palette: { p: '#f472b6', d: '#1e293b', l: '#f8fafc', s: '#fbcfe8', b: '#0f172a' }, grid: ["..pp........pp..",".pllp.pppp.pllp.","..llllllllllll..","..llpbppppbpll..","..pppppppppppp..",".dddddddddddddd.","dddddddddddddddd","dddddddddddddddd",".dd.dddddddd.dd.","...ddd....ddd...","...ddd....ddd...","................","................","................","................","................"]},
  bounsweet:    { palette: { p: '#db2777', d: '#16a34a', l: '#f8fafc', s: '#fde047', b: '#0f172a' }, grid: ["....ddd..ddd....","...dddddddddd...","....dddddddd....","...pppppppppp...","..pppppppppppp..",".ppppbppppbpppp.",".ppppppsspppppp.","..pppppppppppp..","...llllllllll...","....ll....ll....","................","................","................","................","................","................"]},
  steenee:      { palette: { p: '#22c55e', d: '#15803d', l: '#db2777', s: '#f8fafc', b: '#0f172a' }, grid: ["...pppppppppp...","..ppppddddpppp..",".ppppppddpppppp.","...llllllllll...","...llsbppbsll...","..pppppppppppp..",".pp.ssssssss.pp.","....ssssssss....","....llllllll....",".....l....l.....","................","................","................","................","................","................"]},
  tsareena:     { palette: { p: '#db2777', d: '#16a34a', l: '#a3e635', s: '#f8fafc', b: '#0f172a' }, grid: ["....llllllll....","...dddddddddd...","..ddddppppdddd..",".ddddpbppbpdddd.","..dd.ssssss.dd..","...pppppppppp...","..pppppppppppp..",".pppppssssppppp.","..pppppppppppp..","....pp....pp....","...ppp....ppp...","...ppp....ppp...","................","................","................","................"]},
  comfey:       { palette: { p: '#4ade80', d: '#16a34a', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [".....pppppp.....","...pppppppppp...","..pppbppppbppp..",".dd..pppppp..dd.","lll..........lll","lll..ssssss..lll",".ss..llllll..ss.","..ssllllllllss..","....ssssssss....","................","................","................","................","................","................","................"]},
  oranguru:     { palette: { p: '#f8fafc', d: '#7e22ce', l: '#1e293b', s: '#22c55e', b: '#0f172a' }, grid: ["....dddddddd....","..ddppppppppdd..",".ddpppbppbpppdd.",".pppppllllppppp.","ppppddddddddpppp","pppddddddddddppp","pp..pppppppp..pp","...llllllllll...","...lll....lll...","...ddd....ddd...","................","................","................","................","................","................"]},
  passimian:    { palette: { p: '#f8fafc', d: '#1e293b', l: '#22c55e', s: '#ef4444', b: '#0f172a' }, grid: ["....llllllll....","...dddddddddd...","..ddppppppppdd..","..ddddbppbddpp..","...dddddddddd...", "..pppppppppppp.s",".pp.pppppppp.sss","....dddddddd..s.","...pppp..pppp...","...ddd....ddd...","................","................","................","................","................","................"]},
  wimpod:       { palette: { p: '#cbd5e1', d: '#7e22ce', l: '#f8fafc', s: '#475569', b: '#0f172a' }, grid: ["................","....pppppppp....","..ppddddddddpp..",".ppppddddddddpp.",".pppbpppppppppp.",".ppppllllppppdd.","..ppppppppppddd.","...dd..dd..dd...","................","................","................","................","................","................","................","................"]},
  golisopod:    { palette: { p: '#cbd5e1', d: '#475569', l: '#7e22ce', s: '#1e293b', b: '#0f172a' }, grid: ["...dddddddddd...","..ddppppppppdd..",".ddppllbppbllpp.",".ppppdddddddppp.","ppppplllllllpppp","ppp..pppppp..ppp","dd...dddddd...dd","....ppp..ppp....","...ddd....ddd...","................","................","................","................","................","................","................"]},
  sandygast:    { palette: { p: '#d6b37c', d: '#a16207', l: '#ef4444', s: '#0f172a', b: '#0f172a' }, grid: [".......ll.......","......llll......",".......ll.......","....pppppppp....","...pppppppppp...","..pppssssssppp..","..pppsbbbbsppp..",".ppppddddddpppp.",".ddddppppppdddd.","dddddddddddddddd","................","................","................","................","................","................"]},
  palossand:    { palette: { p: '#d6b37c', d: '#a16207', l: '#ef4444', s: '#38bdf8', b: '#0f172a' }, grid: [".......ll.......","..pp..pppp..pp..",".dddd.dddd.dddd.",".pppppppppppppp.",".ppppsbppbssppp.","pppppddddddppppp","ppppdbbbbbbddppp","ddddbbbbbbbbdddd","dddddddddddddddd","................","................","................","................","................","................","................"]},
  pyukumuku:    { palette: { p: '#1e293b', d: '#0f172a', l: '#ec4899', s: '#f8fafc', b: '#0f172a' }, grid: ["................","...ll..ll..ll...","..pppppppppppp..",".pppppppppppppp.",".pppllbppbllppp.",".pppppssssppppp.","..ddddppppdddd..","...dddddddddd...", "................","................","................","................","................","................","................","................"]},
  type_null:    { palette: { p: '#78716c', d: '#44403c', l: '#a3e635', s: '#d6d3d1', b: '#0f172a' }, grid: ["....ssssssss....","...ssssssssss...","..ssddddddddss..","...ssssbppbs....","....llllllll....","...pppppppppp...", "..ppppddddpppp.s",".pppppppppppppss","..ppp......ppp..","..lll......lll..","..ddd......ddd..","................","................","................","................","................"]},
  silvally:     { palette: { p: '#f8fafc', d: '#334155', l: '#ef4444', s: '#38bdf8', b: '#0f172a' }, grid: ["..pppppppppppp..",".pppppppppppppp.","..ppppbppbpppp..","...llllllllll...", "...dddddddddd...", "..ddddppppdddd.p",".ddddppppppppppp","..ddd......ddd..","..ddd......ddd..","..lll......lll..","................","................","................","................","................","................"]},
  minior:       { palette: { p: '#57534e', d: '#292524', l: '#f472b6', s: '#facc15', b: '#0f172a' }, grid: ["......pppp......","....ppddddpp....","..ppddllllldpp..",".ppdllppppplldp.",".pddllpbppbllpdp",".ppdllppppplldp.","..ppddllllldpp..","....ppddddpp....","......pppp......","................","................","................","................","................","................","................"]},
  komala:       { palette: { p: '#94a3b8', d: '#475569', l: '#f8fafc', s: '#a16207', b: '#0f172a' }, grid: ["..pp........pp..",".pllp......pllp.","..pppppppppppp..","..ppddbppbddpp..","...pppllllppp...", "..pppppppppppp.s",".pp..pppppp..sss","....pppppppp.sss","....ppp..ppp..s.","................","................","................","................","................","................","................"]},
  turtonator:   { palette: { p: '#dc2626', d: '#78350f', l: '#facc15', s: '#94a3b8', b: '#0f172a' }, grid: ["..ll...ll...ll..",".llllpppppp.lll.",".llppppbppbpp.l.","..ppppllllpppp..",".llllppppppppll.","llllppddddppplll",".ll.pppppppp.ll.","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................","................"]},
  togedemaru:   { palette: { p: '#cbd5e1', d: '#64748b', l: '#facc15', s: '#78350f', b: '#0f172a' }, grid: ["...dd......dd...","..pppppppppppp..",".ppssddddddsspp.",".ppppbppppbpppp.",".ppplpppppplppp.",".pppppppppppppp.","..pppddddddppp..","...pppppppppp...", "....ll....ll....","................","................","................","................","................","................","................"]},
  bruxish:      { palette: { p: '#ec4899', d: '#7e22ce', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["......llll......","....dddddddd....","..pppppppppppp..",".ppsspbppppllsp.",".ppppppllllppppp","..ddddppppdddd..",".....dddddd.....","................","................","................","................","................","................","................","................","................"]},
  drampa:       { palette: { p: '#f8fafc', d: '#0d9488', l: '#fde047', s: '#f472b6', b: '#0f172a' }, grid: ["...pppppppppp...","..pppppppppppp..","..ppllbppbllpp..","...pppppppppp...","....dddddddd....","..ppppddddpppp..",".ppppddddddpppp.",".pp..dddddd..pp.","....dddddddd....","....ppp..ppp....","................","................","................","................","................","................"]},
  dhelmise:     { palette: { p: '#15803d', d: '#78350f', l: '#ca8a04', s: '#ef4444', b: '#0f172a' }, grid: ["......llll......","....llssssll....","...llddddddll...","....llllllll....",".....pppppp.....",".....dddddd.....","..ll.pppppp.ll..",".llllpddddpllll.","..llllllllllll..",".....llllll.....","................","................","................","................","................","................"]},
  jangmo_o:     { palette: { p: '#94a3b8', d: '#475569', l: '#facc15', s: '#1e293b', b: '#0f172a' }, grid: [".....llllll.....","....llllllll....","...lllsssslll...","...ppppbppbpp...","....pppppppp....","...dddddddddd...", "...pppppppppp.d.","...ppppppppppdd.","...pp......pp...", "...dd......dd...", "................","................","................","................","................","................"]},
  hakamo_o:     { palette: { p: '#94a3b8', d: '#ca8a04', l: '#facc15', s: '#dc2626', b: '#0f172a' }, grid: ["....llllllll....","...lllsssslll...","...ppppbppbpp...","....pppppppp....","..ddddppppdddd..",".dd.pppppppp.dd.",".d..pppddppp..d.","....pppppppp.dd.","...ppp....ppp.ll","...ddd....ddd...","................","................","................","................","................","................"]},
  tapu_lele:    { palette: { p: '#f472b6', d: '#1e293b', l: '#fce7f3', s: '#38bdf8', b: '#0f172a' }, grid: ["....pppppppp....","..pppppppppppp..",".pppllppppllppp.",".ppddddddddddpp.","..ddsbppppbsdd..","...dddddddddd...", "..pppppppppppp..",".pppppllllppppp.","..pppppppppppp..","....dddddddd....","................","................","................","................","................","................"]},
  tapu_bulu:    { palette: { p: '#dc2626', d: '#1e293b', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: ["..ss........ss..",".ssssppppppssss.","..ssppppppppss..","...dddbppbddd...","..ppppddddddpp..",".pppplllllllppp.",".pppplllllllppp.","..ppppddddddpp..","....llllllll....",".....llllll.....","................","................","................","................","................","................"]},
  tapu_fini:    { palette: { p: '#7e22ce', d: '#1e1b4b', l: '#38bdf8', s: '#f472b6', b: '#0f172a' }, grid: [".....llllll.....","...llppppppppll.","..lppppppppppppl","..pppddbppbddppp","...ppddddddpp...", "..ppppddddpppp..",".pppppppppppppp.",".pppplllllllppp.","..pppppppppppp..","....llllllll....","................","................","................","................","................","................"]},
  cosmog:       { palette: { p: '#3b82f6', d: '#7e22ce', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["..pp........pp..",".pppp.dddd.pppp.",".ppddddddddddpp.","..ddsslbbllssdd.","..ddllllllllldd.","..ddddllllldddd.","...ppddddddddpp.","....pppppppp....","................","................","................","................","................","................","................","................"]},
  cosmoem:      { palette: { p: '#facc15', d: '#1e3a8a', l: '#38bdf8', s: '#a855f7', b: '#0f172a' }, grid: ["......pppp......","..pp.pppppp.pp..",".ppppddddddpppp.","ppddssllbbllsspp","ppppddddddddddpp",".ppppddddddpppp.","..pp.pppppp.pp..","......pppp......","................","................","................","................","................","................","................","................"]},
  solgaleo:     { palette: { p: '#f8fafc', d: '#facc15', l: '#ef4444', s: '#1e3a8a', b: '#0f172a' }, grid: ["..dd..dddd..dd..",".ddddlssssldddd.","ddlllsbbbbssllld","ddppppppppppppdd",".ddppppppppppdd.",".ppppddddddpppp.",".pppppppppppppp.","..pppppppppppp.d","..ppp......ppp.l","..ppp......ppp..","..ddd......ddd..","..lll......lll..","................","................","................"
  ]},
  lunala: { palette: { p: '#4c1d95', d: '#1e1b4b', l: '#facc15', s: '#f43f5e', b: '#0f172a' }, grid: [".ll..........ll.","llpp..llll..ppll","lpppp.pssp.ppppl","lppddppppppddppl","lppddddddddddppl",".llpppddddpppll.","..llppppppppll..","....pppddppp....","....pppppppp....",".....llllll.....","......dddd......",".......ll.......","................","................","................","................"
  ]},
  necrozma: { palette: { p: '#0f172a', d: '#334155', l: '#38bdf8', s: '#f43f5e', b: '#0f172a' }, grid: ["..pp........pp..",".pppp.dddd.pppp.",".ppddlsbbslddpp.",".ppddddddddddpp.","pppppppppppppppp","ppdd..pppp..ddpp","pp....dddd....pp",".....pppppp.....","....ppp..ppp....","...dddd..dddd...","...ppp....ppp...","................","................","................","................","................"
  ]},
  magearna:     { palette: { p: '#cbd5e1', d: '#64748b', l: '#f43f5e', s: '#facc15', b: '#0f172a' }, grid: ["....ssssssss....","...pp.pppp.pp...","...pppppppppp...","...pplbppblpp...","....ssssssss....","..pppppppppppp..",".pppllllllllppp.","pppppppppppppppp","pppddddddddddppp",".pppppppppppppp.","................","................","................","................","................","................"]},
  marshadow:    { palette: { p: '#334155', d: '#0f172a', l: '#f97316', s: '#fde047', b: '#0f172a' }, grid: ["....pppppppp....","...dddddddddd...","..ddppppppppdd..","..ddpsbppbsspdd.","...dddddddddd...", "..ppppddddpppp..",".pp..dddddd..pp.","....dddddddd....","....ppp..ppp....","...ddd....ddd...","................","................","................","................","................","................"]},
  poipole:      { palette: { p: '#ec4899', d: '#7e22ce', l: '#38bdf8', s: '#fde047', b: '#0f172a' }, grid: ["......ssss......","....pppppppp....","...pppppppppp...","..ppppddddddpp..","..ppdllbppblpp..","...pppppppppp...","....dddddddd....","...pp.pppp.pp...","....pppppppp.ss.",".....pp..pp.....","................","................","................","................","................","................"]},
  naganadel:    { palette: { p: '#7e22ce', d: '#ec4899', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: [".dd...ssss...dd.","dddd.dddddd.dddd",".dd..dlllld..dd.","....dddddddd....","...pppppppppp...","..ppppddddddpp..",".pppddddddddddpp","..ppppddddddpp..",".....ssssss.....","......ssss......",".......ss.......","................","................","................","................","................"]},
  stakataka:    { palette: { p: '#64748b', d: '#1e293b', l: '#38bdf8', s: '#cbd5e1', b: '#0f172a' }, grid: [".dddddddddddddd.","ddllppddddpplldd","ddppppddddppppdd","ddppllppppllpdd.","dddddddddddddddd","ppppddddddddpppp","ppp..........ppp","ppp..........ppp","ddd..........ddd","................","................","................","................","................","................","................"]},
  blacephalon:  { palette: { p: '#f8fafc', d: '#ec4899', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["....dddddddd....","..ddllllllllldd.",".ddppssppppssppd",".ddppppppppppdd.","..ddllllllllldd.","....pppppppp....","..dd.pppppp.ll..",".dd..ppsspp..ll.",".....pppppp.....","....pp....pp....","...dd......ll...","................","................","................","................","................"]},
  meltan:       { palette: { p: '#cbd5e1', d: '#ca8a04', l: '#ef4444', s: '#0f172a', b: '#0f172a' }, grid: ["....dddddddd....","..dddddddddddd..",".ddddssssssssdd.",".ddddssbbbbssdd.",".ddddssssssssdd.","..dddddddddddd..","....pppppppp....","...pppppppppp...","...pppppppppp.l.","....pp....pp.ll.","................","................","................","................","................","................"]},
  melmetal: { palette: { p: '#94a3b8', d: '#334155', l: '#eab308', s: '#ef4444', b: '#0f172a' }, grid: [
    "....llllllll....","...lllsssslll...","...lllbbbblll...","....llllllll....",".ppppdddddddppp.","ppppddddddddddpp","ppppddllllldddpp","ppp..dddddd..ppp","...pppppppppp...","..pppp....pppp..","..dddd....dddd..","..dddd....dddd..","................","................","................","................"
  ]},

  // --- GALAR & HISUI (#810 - #905) ---


  grookey:      { palette: { p: '#22c55e', d: '#15803d', l: '#f97316', s: '#78350f', b: '#0f172a' }, grid: ["......ssss......",".....ssllss.....","....pppppppp....","...pppppppppp...","..llpppbppbpll..","..llpplllllpll..","...pppppppppp...","..ss.pppppp.ss..",".ss..ppllll..ss.","....pppppppp..ss","...pppp..pppp.s.","...ppp....ppp...","...lll....lll...","...ddd....ddd...","................","................"]},
  thwackey:     { palette: { p: '#84cc16', d: '#15803d', l: '#f97316', s: '#78350f', b: '#0f172a' }, grid: [".....dddddd.....","....dddddddd....","...pppppppppp...","..llpppbppbpll..","..llpplllllpll..",".ss.pppppppp.ss.",".ss.pppddppp.ss.","...pppppppppp...","...pppddddppp.dd","...pppppppppp.d.","...ppp....ppp...","...ppp....ppp...","...lll....lll...","...ddd....ddd...","................","................"]},
  rillaboom:    { palette: { p: '#14532d', d: '#78350f', l: '#22c55e', s: '#f97316', b: '#0f172a' }, grid: ["..pppppppppppp..",".pppppppppppppp.",".ppppllbppbllpp.",".ppppppsssspppp.","ppppllllllllpppp","ppplllllllllllpp","pp..llllllll..pp","...dddddddddd...","..ddddllllldddd.","..dddddddddddd..","...lll....lll...","...ddd....ddd...","...ddd....ddd...","................","................","................"]},
  scorbunny:    { palette: { p: '#f8fafc', d: '#ef4444', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: ["...dd......dd...","..dppd....dppd..","..pppp....pppp..","...pp......pp...","....pppppppp....","...ppplllpppp...","...ppdbppbdpp...","....ppsssspp....","...dddddddddd...","..pp.dddddd.pp..","....pppppppp....","....ppp..ppp....","...dddd..dddd...","...lll....lll...","................","................"]},
  raboot:       { palette: { p: '#1e293b', d: '#dc2626', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: ["...ll......ll...","..llll....llll..","...ll.ssss.ll...","....llllllll....","...lllbppblll...","..dddddddddddd..",".dddddddddddddd.","..ddppppppppdd..","...pppppppppp...","...pppppppppp...","...dddd..dddd...","...ddd....ddd...","...lll....lll...","...ss......ss...","................","................"]},
  cinderace:    { palette: { p: '#f8fafc', d: '#dc2626', l: '#facc15', s: '#1e3a8a', b: '#0f172a' }, grid: ["..pp...ll...pp..",".pppp.dddd.pppp.","..pp.pppppp.pp..","....ppdbbdpp....","...dddddddddd...","..ddppppppppdd..",".dd.pppppppp.dd.","....ssssssss....","...ssssssssss...","...dddd..dddd...","...ddd....ddd...","....pp....pp....","...ddd....ddd...","...lll....lll...","................","................"]},
  sobble:       { palette: { p: '#38bdf8', d: '#1d4ed8', l: '#facc15', s: '#bae6fd', b: '#0f172a' }, grid: [".......ll.......","......llll......",".....ll..ll.....","....pppppppp....","...pppppppppp...","...ppdbppbdpp...","...ppsssssspp...","....pppppppp....","...pppppppppp.dd","...pppssssppp.dp","....pppppppp.dd.","....pp....pp....","....pp....pp....","...ddd....ddd...","................","................"]},
  drizzile:     { palette: { p: '#2563eb', d: '#a855f7', l: '#84cc16', s: '#f8fafc', b: '#0f172a' }, grid: ["....dddddddd....","...ddppppppdd...","...ppppbppbpp...","...pppllllppp...","....pppppppp....","...llllllllll...","..pp.pppppp.pp..",".ll..pppppp..ll.","....dddddddd.pp.","....pppppppp.p..","....pp....pp....","....pp....pp....","...lll....lll...","...ddd....ddd...","................","................"]},
  inteleon:     { palette: { p: '#0284c7', d: '#0f172a', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: ["......llll......","....pppppppp....","...pppbppbppp...","....pppppppp....","...dddddddddd...","..pp.dssssd.pp..",".pp..dssssd..pp.",".p...dddddd...p.","....pppppppp.pp.","....ppp..ppp..pp","....pp....pp.pp.","....pp....pp....","...ddd....ddd...","...ddd....ddd...","................","................"]},
  skwovet:      { palette: { p: '#a16207', d: '#78350f', l: '#fef3c7', s: '#ef4444', b: '#0f172a' }, grid: ["..pp........pp..",".pdpp......ppdp.","..pppppppppppp..","..pplbppppblpp..",".pppppllllppppp.",".ppppllllllpppp.","..pppllllllppp.d","...pppppppppp.dp","...pppppppppp.pp","....pp....pp....","...ddd....ddd...","................","................","................","................","................"]},
  greedent:     { palette: { p: '#b45309', d: '#78350f', l: '#fef3c7', s: '#ef4444', b: '#0f172a' }, grid: ["..pp........pp..",".pppp.pppp.pppp.","..pppbppppbppp..",".pppppllllppppp.","pppppllllllppppp","pppppllllllppppd",".ppppllllllpppdd","..ppppppppppppd.","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................"]},
  rookidee:     { palette: { p: '#2563eb', d: '#1e293b', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [".....dddddd.....","...dddddddddd...","..ddppppppppdd..","..ddpsbppbspdd..","..ddllllllllll..","..ddddlllllddd..",".ddddppppppdddd.","..dddddddddddd..","....dddddddd....",".....l....l.....","....ll....ll....","................","................","................","................","................"]},
  corvisquire:  { palette: { p: '#1d4ed8', d: '#1e293b', l: '#94a3b8', s: '#ef4444', b: '#0f172a' }, grid: ["....dddddddd....","...ddppppppdd...","..ddpsbppbssp...","..ddddddddddll..",".ppppdddddddd...","pppppppppppppp..",".pppdddddddppp..","..dddddddddddd..","....dddddddd....",".....l....l.....","....ll....ll....","................","................","................","................","................"]},
  corviknight:  { palette: { p: '#1e293b', d: '#0f172a', l: '#ef4444', s: '#64748b', b: '#0f172a' }, grid: [".pp....dd....pp.","pppp..pppp..pppp","ppsppppbppbpppsp","ppddppppppppddpp","pppddddddddddppp",".pp.ssssssss.pp.","...pppppppppp...","...pppddddppp...","....dddddddd....","....ppp..ppp....",".....d....d.....","....dd....dd....","...ddd....ddd...","................","................","................"]},
  blipbug:      { palette: { p: '#2563eb', d: '#1e3a8a', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [".....ss..ss.....","....pppppppp....","...pppppppppp...","..ppllbppbllpp..","..ppllpppppllp..","...pppppppppp...","....dddddddd....","...pppppppppp...","...dddddddddd...","....pp.pp.pp....","....dd.dd.dd....","................","................","................","................","................"]},
  dottler:      { palette: { p: '#f97316', d: '#eab308', l: '#38bdf8', s: '#1e293b', b: '#0f172a' }, grid: ["....pppppppp....","..ppddddddddpp..",".ppdllppppplldp.",".ppdlbpppppblpp.",".ppppddddddddpp.",".ppddllbppbllpp.","..pppppppppppp..","...ssssssssss...","....ss.ss.ss....","................","................","................","................","................","................","................"]},
  orbeetle:     { palette: { p: '#dc2626', d: '#1e293b', l: '#38bdf8', s: '#f8fafc', b: '#0f172a' }, grid: ["...pppppppppp...","..ppddddddddpp..",".ppdllppppplldp.",".ppppddddddddpp.",".ppddppppppppdd.","..pppppppppppp..","....dddddddd....","...ddlbppbldd...","....dddddddd....","...dd..dd..dd...","................","................","................","................","................","................"]},
  nickit:       { palette: { p: '#c2410c', d: '#1e293b', l: '#fef3c7', s: '#facc15', b: '#0f172a' }, grid: ["..dd........dd..",".dppd......dppd.","..pppppppppppp..","..pplbppppblpp..","...llllllllll...","...pppppppppp.dd","...ppppppppppddd","...ppppppppppdd.","...dd......dd...","...dd......dd...","................","................","................","................","................","................"]},
  thievul:      { palette: { p: '#c2410c', d: '#1e293b', l: '#fef3c7', s: '#facc15', b: '#0f172a' }, grid: ["..dd........dd..",".dppd......dppd.","..ppddddddddpp..","..ddsbppppbsdd..","...dlllllllld...","...pppppppppp...","..ppppddddpppp.d","..ppppppppppppdd","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................"]},
  gossifleur:   { palette: { p: '#22c55e', d: '#ef4444', l: '#facc15', s: '#86efac', b: '#0f172a' }, grid: ["...dddddddddd...","..ddllllllllldd.",".ddllssssssslldd","..ddllllllllldd.","...pppppppppp...","...pppbppbppp...","....pppppppp....","...ppsssssspp...","....pppppppp....",".....pppppp.....","......pppp......","................","................","................","................","................"]},
  eldegoss:     { palette: { p: '#f8fafc', d: '#22c55e', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: ["...pppppppppp...","..pppppppppppp..",".pppppppppppppp.",".pppppppppppppp.","..pppppppppppp..","...llddddddll...","....ddpbppdd....","...dddddddddd...","..ss.dddddd.ss..",".....dddddd.....","......d..d......","................","................","................","................","................"]},
  wooloo:       { palette: { p: '#f8fafc', d: '#334155', l: '#94a3b8', s: '#f472b6', b: '#0f172a' }, grid: ["....pppppppp....","..pppppppppppp..",".ppddddddddddpp.","ppddllbppbllddpp","ppppddddddddddpp","llppppppppppppll","llppppppppppppll",".pppppppppppppp.","..pppppppppppp..","...ddd....ddd...","...ddd....ddd...","................","................","................","................","................"]},
  dubwool:      { palette: { p: '#f8fafc', d: '#1e293b', l: '#94a3b8', s: '#a16207', b: '#0f172a' }, grid: [".ss..........ss.","ssss.pppppp.ssss",".ss.dddddddd.ss.","...ddlbppbldd...","..ppppddddpppp..",".ppddddddddddpp.","ppppddddddddddpp",".pppppppppppppp.","..dddd....dddd..","..dddd....dddd..","................","................","................","................","................","................"]},
  chewtle:      { palette: { p: '#22c55e', d: '#15803d', l: '#f8fafc', s: '#a16207', b: '#0f172a' }, grid: ["......llll......","....pppppppp....","..pppppppppppp..",".ppppbppppbpppp.",".ppppllllllpppp.","..pppppppppppp..","..ssssssssssss..",".ssddddddddddss.","..ssssssssssss..","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................"]},
  drednaw:      { palette: { p: '#0284c7', d: '#78350f', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: ["......llll......","...pppppppppp...","..ppppbppbpppp..",".ppsssssssssspp.",".dddddddddddddd.","ddddlllllllllddd","dddddddddddddddd",".pppppppppppppp.","..ppp..pp..ppp..","..sss..ss..sss..","................","................","................","................","................","................"]},
  yamper:       { palette: { p: '#facc15', d: '#78350f', l: '#84cc16', s: '#f8fafc', b: '#0f172a' }, grid: ["..dd........dd..",".dppd......dppd.","..pppppppppppp..","..pplbppppblpp..","..llllllllllll..",".llllssssssllll.","..ddddppppdddd.p","..ddddppppddddpp","..ddddppppdddd..","...ss......ss...","...pp......pp...","...dd......dd...","................","................","................","................"]},
  boltund:      { palette: { p: '#facc15', d: '#1e293b', l: '#ffffff', s: '#22c55e', b: '#0f172a' }, grid: ["..dd........dd..",".dppd......dppd.","..pppppppppppp..","..ppsbppppbspp..","...llllllllll...","...dddddddddd...","..pppppppppppp.d",".dppppddddddpppd","..ppp......ppp..","..lll......lll..","..ddd......ddd..","................","................","................","................","................"]},
  rolycoly:     { palette: { p: '#1e293b', d: '#0f172a', l: '#ef4444', s: '#f97316', b: '#0f172a' }, grid: ["....dddddddd....","..ddppppppppdd..",".ddppppppppppdd.","ddppppddddddppdd","ddpppdslllspppdd","ddppppddddddppdd",".ddppppppppppdd.","..ddppppppppdd..","....dddddddd....",".....dddddd.....","................","................","................","................","................","................"]},
  carkol:       { palette: { p: '#1e293b', d: '#0f172a', l: '#ef4444', s: '#f97316', b: '#0f172a' }, grid: ["...ss..ll..ss...","..ddddppppdddd..",".ddddppppppdddd.",".ddppsbppbsspdd.","dddddddddddddddd","ppppddddddddpppp",".dddddddddddddd.","..ddd......ddd..","..ddd......ddd..","................","................","................","................","................","................","................"]},
  coalossal:    { palette: { p: '#1e293b', d: '#0f172a', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: ["..ll..ssss..ll..",".llllllddddllll.",".ddddppppppdddd.","ddppsbppbsplppdd","dddddddddddddddd","ppppddddddddpppp","ppp..dddddd..ppp","..pppp....pppp..","..dddd....dddd..","................","................","................","................","................","................","................"]},
  applin:       { palette: { p: '#ef4444', d: '#b91c1c', l: '#22c55e', s: '#fde047', b: '#0f172a' }, grid: [".....ll..ll.....","....llllllll....",".....ssbbss.....","...pppppppppp...","..pppppppppppp..",".pppssppppppppp.",".pppssppppddppp.",".ppppppppddddpp.","..ppppddddddpp..","...dddddddddd...","................","................","................","................","................","................"]},
  flapple:      { palette: { p: '#22c55e', d: '#ef4444', l: '#facc15', s: '#15803d', b: '#0f172a' }, grid: [".dddd......dddd.","ddllld.pp.dllldd","ddllldpbpdlllddd",".dddd.pppp.dddd.",".....pppppp.....","....pppddppp....","...dddddddddd...","..ddddppppdddd..","...dddddddddd...","................","................","................","................","................","................","................"]},
  appletun:     { palette: { p: '#22c55e', d: '#b45309', l: '#ef4444', s: '#fde68a', b: '#0f172a' }, grid: ["...ll......ll...","..llllpppp.lll..","..ppppbppbpppp..",".dddddddddddddd.","ddddssssssssdddd","ddddsddddddssddd","dddddddddddddddd",".pppppppppppppp.","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................"]},
  silicobra:    { palette: { p: '#d97706', d: '#78350f', l: '#fde68a', s: '#22c55e', b: '#0f172a' }, grid: ["....pppppppp....","...ppsbppbspl...","..dddddddddddd..",".ddddllllllllldd",".dddddddddddddd.","...pppppppppp...","..ppppddddpppp..",".pppppppppppppp.","..dddddddddddd..","................","................","................","................","................","................","................"]},
  sandaconda:   { palette: { p: '#b45309', d: '#451a03', l: '#fde68a', s: '#78716c', b: '#0f172a' }, grid: ["...dddddddddd...","..ddddllllldddd.",".ddddpbppbpdddd.",".ddddllllllllldd","..dddddddddddd..",".ppppdddddddppp.","ppppddddddddddpp",".pppppppppppppp.","..dddddddddddd..","................","................","................","................","................","................","................"]},
  cramorant:    { palette: { p: '#2563eb', d: '#1e3a8a', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [".....pppppp.....","....pppppppp....","....ppsbppbs....","....llllllllll..",".....llllllllll.","....ssssssss....","..pppppppppppp..",".ppppddddddpppp.",".pp..pppppp..pp.","....dddddddd....",".....l....l.....","....lll..lll....","................","................","................","................"]},
  arrokuda:     { palette: { p: '#b45309', d: '#78350f', l: '#fef3c7', s: '#38bdf8', b: '#0f172a' }, grid: ["................","......dddd......","....pppppppp..s.","..ppppbpppppppss",".llllllllllllpss","..dddddddddddds.","......dddd......","................","................","................","................","................","................","................","................","................"]},
  barraskewda:  { palette: { p: '#92400e', d: '#451a03', l: '#fde68a', s: '#ef4444', b: '#0f172a' }, grid: [".....dddddd.....","...pppppppppp.s.",".ppppbppppppppss","llllllllllllllss",".ddddddddddddds.",".....dddddd.....","................","................","................","................","................","................","................","................","................","................"]},
  toxel:        { palette: { p: '#a855f7', d: '#581c87', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: [".....ssssss.....","....pppppppp....","...pppppppppp...","...pppbppbppp...","...ppppddpppp...","..pppppppppppp..","..ppplllllllpp..",".pp.llllllll.pp.","....llllllll....","....pp....pp....","................","................","................","................","................","................"]},
  toxtricity:   { palette: { p: '#9333ea', d: '#1e293b', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["...llll..llll...","..llllpppp.lll..","...pppppppppp...","...pppbppbppp...","..ppppddddpppp..",".pp.llllllll.pp.","pp..llllllll..pp","....pppppppp....","...dddddddddd...","...ppp....ppp...","...ppp....ppp...","...ddd....ddd...","...lll....lll...","................","................","................"]},
  sizzlipede:   { palette: { p: '#ef4444', d: '#7f1d1d', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: ["..ll........ll..","...ll.pppp.ll...","...ppppbppbpp...","..ppppddddpppp..",".llpppddddpppll.","..ppppddddpppp..",".llpppddddpppll.","..ppppddddpppp..",".llpppddddpppll.","..ppppddddpppp..","...dddddddddd...","....ll....ll....","................","................","................","................"]},
  centiskorch:  { palette: { p: '#dc2626', d: '#7f1d1d', l: '#facc15', s: '#f97316', b: '#0f172a' }, grid: [".ll..........ll.","..ll..ssss..ll..","...llllllllll...","..ppppbppbpppp..",".llppppddppppll.","..ppppddddpppp..",".llpppddddpppll.","..ppppddddpppp..",".llpppddddpppll.","..ppppddddpppp..",".llpppddddpppll.","..ppppddddpppp..","...dddddddddd...","....ll....ll....","................","................"]},
  clobbopus:    { palette: { p: '#f97316', d: '#9a3412', l: '#fef3c7', s: '#38bdf8', b: '#0f172a' }, grid: ["................","....pppppppp....","..pppppppppppp..",".ppplllppplllpp.",".ppplbpppppblpp.",".pppppppppppppp.","..ddddppppdddd..",".pppp.pppp.pppp.","pppp..pppp..pppp","pp...pp..pp...pp","....pp....pp....","...lll....lll...","...ddd....ddd...","................","................","................"]},
  grapploct:    { palette: { p: '#2563eb', d: '#1e3a8a', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["....pppppppp....","..ppddddddddpp..",".ppddssbppbsddp.",".ppppddddddddpp.","..pppppppppppp..",".dd.pppppppp.dd.","ddd.pppddppp.ddd","dd..pppppppp..dd","...ppp.pp.ppp...","..ppp..pp..ppp..",".ppp...pp...ppp.",".ll....ll....ll.","................","................","................","................"]},
  sinistea:     { palette: { p: '#c084fc', d: '#581c87', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: ["......pppp......","....pppppppp....","..llllllllllll..",".llssssssssssll.",".llpppppppppp.ll",".llpppbppbppp.l.",".llppppddpppp.ll","..llllllllllll..","...ssssssssss...","....pppppppp....",".....pp..pp.....","......p..p......","................","................","................","................"]},
  polteageist:  { palette: { p: '#a855f7', d: '#581c87', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: ["......ssss......","....llllllll....","..llssssssssll..",".llpppppppppp.l.","ll.pppbppbppp.ll","ll.pppppppppp.ll",".llssssssssssll.","..llllllllllll..","...llssssssll...","....pppppppp....","....ppp..ppp....",".....pp..pp.....","................","................","................","................"]},
  hatenna:      { palette: { p: '#f472b6', d: '#38bdf8', l: '#fce7f3', s: '#ffffff', b: '#0f172a' }, grid: ["......pppp......",".....pppppp.....","....pppppppp....","...pppppppppp...","..pppppppppppp..",".ppppdddddddppp.",".dddssssssssddd.","...ddsbppbsdd...","...dddddddddd...","....llllllll....","....llllllll....","....dd....dd....","...ddd....ddd...","................","................","................"]},
  hattrem:      { palette: { p: '#f472b6', d: '#38bdf8', l: '#fce7f3', s: '#ffffff', b: '#0f172a' }, grid: [".....pppppp.....","....pppppppp....","...pppppppppp...","..ppppddddpppp..",".pppddddddddppp.",".dddssssssssddd.","..ddsbppppbsdd..","..dd.dddddd.dd..","..dd.llllll.dd..",".dd..llllll..dd.","....dddddddd....","....dd....dd....","...ddd....ddd...","................","................","................"]},
  hatterene:    { palette: { p: '#f472b6', d: '#38bdf8', l: '#fce7f3', s: '#ffffff', b: '#0f172a' }, grid: ["....pppppppp....","...pppppppppp...","..ppppddddpppp..",".pppddddddddppp.",".dddssssssssddd.","..ddsbppppbsdd..","..ddddllllldddd.",".ddd.dddddd.ddd.",".dd..dddddd..dd.",".dd..llllll..dd.","....dddddddd....","...dddddddddd...","...dddddddddd...","................","................","................"]},
  impidimp:     { palette: { p: '#ec4899', d: '#831843', l: '#ffffff', s: '#38bdf8', b: '#0f172a' }, grid: ["..pp........pp..",".pppp.pppp.pppp.","..pppppppppppp..","..pplbppppblpp..","..ppppllllpppp..","...pppppppppp...","....dddddddd....","..pp.pppppp.pp..",".pp..pppppp..pp.","....pppppppp.p..","....pp....pp.pp.","....pp....pp....","...ddd....ddd...","................","................","................"]},
  morgrem:      { palette: { p: '#ec4899', d: '#0f172a', l: '#22c55e', s: '#ffffff', b: '#0f172a' }, grid: ["...dddddddddd...","..ddddppppdddd..",".ddddpbppbpdddd.",".ddd.ppsspp.ddd.","..dd.pppppp.dd..","...dddddddddd...","..dd.pppppp.dd..",".dd..pppppp..dd.","....dddddddd....","....ppp..ppp....","...ppp....ppp...","...ddd....ddd...","...lll....lll...","................","................","................"]},
  grimmsnarl:   { palette: { p: '#0f172a', d: '#15803d', l: '#ec4899', s: '#ffffff', b: '#0f172a' }, grid: ["..pppppppppppp..",".pppppllllppppp.",".pppplbppbllppp.","pppppppppppppppp","pppddddddddddppp","pp.ppppllllpp.pp","pp.pppppppppp.pp","...pppppppppp...","..ppppddddpppp..","..ppp......ppp..","..ppp......ppp..","..ddd......ddd..","..lll......lll..","................","................","................"]},
  obstagoon:    { palette: { p: '#1e293b', d: '#f8fafc', l: '#ef4444', s: '#94a3b8', b: '#0f172a' }, grid: ["..pp..dddd..pp..",".ppppddddddpppp.","..ppdlbppbldpp..","...ddddllldddd..",".ppppddddddpppp.","ppddppppppppddpp","ppdd.dddddd.ddpp","dd...pppppp...dd","....dddddddd....","...ppp....ppp...","...ddd....ddd...","...ppp....ppp...","...ddd....ddd...","................","................","................"]},
  perrserker:   { palette: { p: '#64748b', d: '#1e293b', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: [".dd..........dd.","dddd.pppppp.dddd",".ddppppppppppdd.","..ppsbppppbspp..","..ppppllllpppp..","..dddddddddddd..",".ppppdddddddppp.",".pp.dddddddd.pp.","...dddddddddd...","...ppp....ppp...","...ppp....ppp...","...ddd....ddd...","................","................","................","................"]},
  cursola:      { palette: { p: '#f8fafc', d: '#e2e8f0', l: '#f472b6', s: '#c084fc', b: '#0f172a' }, grid: ["..ss...ss...ss..",".ssss..ss..ssss.","..ss.ssssss.ss..","...ssssssssss...","....pppppppp....","...pppbppbppp...","..pppppppppppp..",".ppddddddddddpp.","..pppppppppppp..","...dd..dd..dd...","................","................","................","................","................","................"]},
  sirfetchd:    { palette: { p: '#f8fafc', d: '#16a34a', l: '#facc15', s: '#84cc16', b: '#0f172a' }, grid: ["......p..p....dd",".....pppppp..ddd","....pppppppp.dd.","....ppbppbps.dd.","....ppllllppdd..",".ss.ppppppppdd..","ssssppppppppdd..","ssssppppppppdd..",".ss..pppppp.dd..",".....pp..pp.dd..",".....ll..ll.....","....lll..lll....","................","................","................","................"]},
  mr_rime:      { palette: { p: '#1e293b', d: '#38bdf8', l: '#f43f5e', s: '#facc15', b: '#0f172a' }, grid: ["....pppppppp....","...pppppppppp...","..pppppppppppp..","...dddbppbddd...","...dddllllddd...","..pppppppppppp..",".pp.dddddddd.pp.d","....ppsssspp...d","...pppppppppp..d","....dddddddd...d","....pp....pp....","...lll....lll...","................","................","................","................"]},
  runerigus:    { palette: { p: '#78716c', d: '#44403c', l: '#ef4444', s: '#a855f7', b: '#0f172a' }, grid: ["..pppp....pppp..",".ppddpp..ppddpp.",".ppllpp..ppllpp.","..ppppddddpppp..",".ss.pppbppbp.ss.",".ss.ppllllpp.ss.","..ppppddddpppp..",".ppddpp..ppddpp.",".pppppp..pppppp.","...ss......ss...","..dddd....dddd..","..pppp....pppp..","................","................","................","................"]},
  milcery:      { palette: { p: '#fef3c7', d: '#fde68a', l: '#ffffff', s: '#f472b6', b: '#0f172a' }, grid: ["...ll..ll..ll...","..llllppppllll..","...pppppppppp...","..pppppppppppp..",".pppppbppbppppp.",".ppppppsspppppp.","..pppppppppppp..","...dddddddddd...","....pppppppp....",".....dddddd.....","................","................","................","................","................","................"]},
  alcremie:     { palette: { p: '#fce7f3', d: '#f472b6', l: '#ef4444', s: '#ffffff', b: '#0f172a' }, grid: ["...ll......ll...","..llllpppp.lll..","..pppppppppppp..",".ppsssssssssspp.",".ppppplbbplpppp.","..pppppppppppp..",".ppsssssssssspp.","pppppppppppppppp","ppddddddddddddpp",".pppppppppppppp.","..dddddddddddd..","...pppppppppp...","................","................","................","................"]},
  falinks:      { palette: { p: '#facc15', d: '#dc2626', l: '#1e293b', s: '#f8fafc', b: '#0f172a' }, grid: [".....dd.........","....pppp..pppp..","...pllbbpppbpp..","..ddppppddpppp..",".dddppppddpppp..","..ddppppddpppp..","...dd..dddd..dd.","...dd..dddd..dd.","................","................","................","................","................","................","................","................"]},
  pincurchin:   { palette: { p: '#3b0764', d: '#1e1b4b', l: '#facc15', s: '#a855f7', b: '#0f172a' }, grid: ["..p...p..p...p..","...pp.pppp.pp...",".p..pppppppp..p.","..ppppddddpppp..",".ppppdbppbdpppp.","..ppppllllpppp..",".p..pppppppp..p.","...pp.dddd.pp...","..p...d..d...p..","................","................","................","................","................","................","................"]},
  snom:         { palette: { p: '#e0f2fe', d: '#7dd3fc', l: '#ffffff', s: '#38bdf8', b: '#0f172a' }, grid: ["................","....ll.ll.ll....","..llppppppppll..",".llppddddddppll.","llppddddddddppll","ppppbppppppppppp","ppppbppppppppppp",".dddddddddddddd.","................","................","................","................","................","................","................","................"]},
  frosmoth:     { palette: { p: '#e0f2fe', d: '#38bdf8', l: '#ffffff', s: '#7dd3fc', b: '#0f172a' }, grid: [".llll......llll.","llllll.ss.llllll","llpppllsbsllpppl","lpppppllllpppppl",".lppppddddppppl.","..llllddddllll..",".llppddddddppll.","..ll..dddd..ll..","................","................","................","................","................","................","................","................"]},
  stonjourner:  { palette: { p: '#78716c', d: '#44403c', l: '#d6d3d1', s: '#ef4444', b: '#0f172a' }, grid: ["..llllllllllll..",".llpppppppppp.l.","..dddddddddddd..","....pppppppp....","....ppbppbpp....","....pppppppp....","..ppppddddpppp..",".ppp..pppp..ppp.",".ppp........ppp.",".ddd........ddd.",".lll........lll.",".ddd........ddd.",".pppp......pppp.","................","................","................"]},
  eiscue:       { palette: { p: '#bae6fd', d: '#1e293b', l: '#facc15', s: '#ffffff', b: '#0f172a' }, grid: [".......dd.......","...pppppppppp...","..pppppppppppp..","..pppbppppbppp..","..pppppppppppp..","..pppppppppppp..","....dddddddd....","...ddssssssdd...","...ddssssssdd...","...ddssssssdd...","....dddddddd....",".....ll..ll.....","................","................","................","................"]},
  indeedee:     { palette: { p: '#6b21a8', d: '#3b0764', l: '#f8fafc', s: '#f472b6', b: '#0f172a' }, grid: ["..pppp....pppp..",".ppddpp..ppddpp.","..pp.pppppp.pp..","...pppppppppp...","...ppsbppbspl...","..llllllllllll..",".llllpppppp.lll.",".ll.llllllll.ll.","....llllllll....","....ppp..ppp....","....pp....pp....","...ddd....ddd...","................","................","................","................"]},
  morpeko:      { palette: { p: '#facc15', d: '#78350f', l: '#1e293b', s: '#ef4444', b: '#0f172a' }, grid: ["..dd........ll..",".dddd......llll.","..ddppppppppll..","..ddppbppbpp.ll.","..ddspppppps.ll.","..ddddppppllll..","..ddddppppllll..","..ddddppppllll..","...dddd..llll...","....pp....pp....","................","................","................","................","................","................"]},
  cufant:       { palette: { p: '#f97316', d: '#0f766e', l: '#facc15', s: '#ffffff', b: '#0f172a' }, grid: ["....llllllll....","..ddddppppdddd..",".dppppppppppppd.",".dppppbppbppppd.","..pppplllppppp..","...ddplllppdd...","...dddddddddd...","...pp..pp..pp...","...dd..dd..dd...","................","................","................","................","................","................","................"]},
  copperajah:   { palette: { p: '#0f766e', d: '#134e4a', l: '#f97316', s: '#facc15', b: '#0f172a' }, grid: ["...llllllllll...","..pppppppppppp..",".ppppddddddpppp.","llpppbpppppppppp","llpppddddddppppp","llpppplllllppppp",".pppppppppppppp.","..ppp..pp..ppp..","..lll..ll..lll..","..ddd..dd..ddd..","................","................","................","................","................","................"]},
  dracozolt:    { palette: { p: '#facc15', d: '#16a34a', l: '#ef4444', s: '#38bdf8', b: '#0f172a' }, grid: ["....pppppppp....","...pppbppbppp...","....ppllllpp....","...pppppppppp...","..llppppppppll..","..dddddddddddd..",".ddddddddddddd..",".ddddddddddddd.d","...ddd....ddd.dd","...ddd....ddd...","................","................","................","................","................","................"]},
  arctozolt:    { palette: { p: '#facc15', d: '#38bdf8', l: '#bae6fd', s: '#ef4444', b: '#0f172a' }, grid: ["....pppppppp....","...pppbppbppp...","....ppsssspp....","...llllllllll...","..dddddddddddd..",".ddddlllllldddd.",".dddddddddddddd.","..dddddddddddd..","...ddd....ddd...","...lll....lll...","................","................","................","................","................","................"]},
  dracovish:    { palette: { p: '#2563eb', d: '#16a34a', l: '#ef4444', s: '#bae6fd', b: '#0f172a' }, grid: ["...pppppppppp...","..ppppbppbpppp..","..ppllllllllpp..","...pppppppppp...","....dddddddd....","...dddddddddd...","..dddddddddddd..",".dddddddddddddd.","...ddd....ddd...","...ddd....ddd...","................","................","................","................","................","................"]},
  arctovish:    { palette: { p: '#2563eb', d: '#38bdf8', l: '#bae6fd', s: '#f8fafc', b: '#0f172a' }, grid: ["...pppppppppp...","..ppppbppbpppp..","..ppsssssssspp..","...llllllllll...","..dddddddddddd..",".ddddlllllldddd.",".dddddddddddddd.","..dddddddddddd..","....dd....dd....","................","................","................","................","................","................","................"]},
  duraludon:    { palette: { p: '#cbd5e1', d: '#475569', l: '#ef4444', s: '#38bdf8', b: '#0f172a' }, grid: ["......llll......",".....pppppp.....","....pppppppp....","....ppdbbdpp....","...pppppppppp...","..pppddddddppp..",".pppddddddddppp.",".pp..pppppp..pp.","....pppppppp.dd.","...pppp..ppppdd.","...ppp....ppp...","...ddd....ddd...","................","................","................","................"]},
  dreepy:       { palette: { p: '#0f766e', d: '#84cc16', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: ["..ll........ll..",".llpppppppppp.ll","..ppppddddpppp..","...pppbppbppp...","....dddddddd....",".....dddddd.....","......dddd......",".......dd.......",".......dd.......","................","................","................","................","................","................","................"]},
  drakloak:     { palette: { p: '#0f766e', d: '#1e293b', l: '#ef4444', s: '#84cc16', b: '#0f172a' }, grid: [".ll..ssssss..ll.","llllpppppppp.lll","..ppppbppbpppp..","...pppppppppp...","..dd.llllll.dd..",".dd..pppppp..dd.",".....dddddd.....","......pppp......","......dddd......",".......pp.......","................","................","................","................","................","................"]},
  dragapult:    { palette: { p: '#0f766e', d: '#1e293b', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [".llddddddddddll.","llddppppppppddll",".llddpbppbpddll.","...pppppppppp...","..pppssssssppp..",".pp..pppppp..pp.",".....pppppp.....","....pppddppp....","....pppppppp....",".....ppddpp.....","......pppp......",".......pp.......",".......dd.......","................","................","................"]},
  zacian:       { palette: { p: '#38bdf8', d: '#1e3a8a', l: '#facc15', s: '#f43f5e', b: '#0f172a' }, grid: ["..ss..llll..ss..",".ssssppppppssss.","..ssppbppbppss..","llllllllllllllll","..pppppppppppp..",".ppssddddddsspp.",".ppssppppppsspp.","..pppppppppppp..","..ppp......ppp..","..ppp......ppp..","..ddd......ddd..","..lll......lll..","................","................","................","................"]},
  zamazenta:    { palette: { p: '#dc2626', d: '#1e3a8a', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["..ll..dddd..ll..",".llllpppppp.lll.",".lllppbppbpp.ll.",".llllllllllllll.","llppppddddppppll","llpppddddddpppll",".llllpppppp.lll.","..pppppppppppp..","..ppp......ppp..","..ppp......ppp..","..ddd......ddd..","..lll......lll..","................","................","................","................"]},
  eternatus:    { palette: { p: '#7e22ce', d: '#0f172a', l: '#f43f5e', s: '#f8fafc', b: '#0f172a' }, grid: [".ll...pppp...ll.",".ll..ppllpp..ll.","..dd.plbbpl.dd..",".ddddppppppdddd.","dd.llllllllll.dd","...llddddddll...","....pppppppp....","...pp.dddd.pp...","..pp..pppp..pp..","......dddd......","......pppp......",".......ll.......",".......dd.......","................","................","................"]},
  kubfu:        { palette: { p: '#fde68a', d: '#44403c', l: '#f8fafc', s: '#1e293b', b: '#0f172a' }, grid: ["..pp........pp..",".pdpp..ll..ppdp.","..pppppppppppp..","..pplbppppblpp..","...pppppppppp...","...dddddddddd...","..ddppppppppdd..",".dd.dddddddd.dd.","....dddddddd....","....ppp..ppp....","....pp....pp....","...sss....sss...","................","................","................","................"]},
  urshifu:      { palette: { p: '#334155', d: '#0f172a', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: ["..dd..llll..dd..",".ddddlllllldddd.","..ddpppbppbppdd.","...pppppppppp...",".ddddppppppdddd.","dddddddddddddddd","dd..pppppppp..dd","...dddddddddd...","..dddd....dddd..","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................"]},
  zarude:       { palette: { p: '#1e293b', d: '#0f172a', l: '#22c55e', s: '#ef4444', b: '#0f172a' }, grid: ["...dddddddddd...","..ddppppppppdd..",".ddppsbppbsspdd.",".ddpppddddpppdd.",".llllppppppppll.","lllllddddddlllll","ll..pppppppp..ll","...pppppppppp...","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................"]},
  regieleki:    { palette: { p: '#facc15', d: '#38bdf8', l: '#f472b6', s: '#fef08a', b: '#0f172a' }, grid: ["..pp........pp..",".pppp..dd..pppp.","pp..ppddddpp..pp","p...pplllpp....p","...ppppllpppp...","..ppppplllpppp..","...ppppllpppp...","..dd.pppppp.dd..",".....pp..pp.....","................","................","................","................","................","................","................"]},
  regidrago:    { palette: { p: '#be185d', d: '#1e293b', l: '#38bdf8', s: '#f43f5e', b: '#0f172a' }, grid: ["..dd........dd..",".dddd.pppp.dddd.","dd..pppppppp..dd","d..ppplllpppp..d","...ppplllpppp...","..ddppppppppdd..",".ddddddddddddd..","....ppp..ppp....","....ddd..ddd....","................","................","................","................","................","................","................"]},
  glastrier:    { palette: { p: '#f8fafc', d: '#38bdf8', l: '#0284c7', s: '#bae6fd', b: '#0f172a' }, grid: [".....dddddd.....","....ddllllld....","...pppppppppp...","...ppdbppbdpp...","..pppppppppppp..",".ppppddddddpppp.",".pppppppppppppp.","..pppppppppppp..","..ppp......ppp..","..ddd......ddd..","..lll......lll..","................","................","................","................","................"]},
  spectrier:    { palette: { p: '#1e1b4b', d: '#7e22ce', l: '#facc15', s: '#c084fc', b: '#0f172a' }, grid: [".....dddddd.....","....ddssssdd....","...pppppppppp...","...pplbppblpp...","..pppppppppppp..",".ppppddddddpppp.",".pppppppppppppp.","..pppppppppppp..","..ppp......ppp..","..ddd......ddd..","..sss......sss..","................","................","................","................","................"]},
  calyrex:      { palette: { p: '#22c55e', d: '#14532d', l: '#38bdf8', s: '#f8fafc', b: '#0f172a' }, grid: ["...pppppppppp...","..ppppddddpppp..",".ppppddddddpppp.",".pppppppppppppp.","..ddddppppdddd..","....ssbppbs.....","....ssssssss....","...dddddddddd...","..dd.dddddd.dd..",".....pp..pp.....",".....pp..pp.....","................","................","................","................","................"]},
  wyrdeer:      { palette: { p: '#cbd5e1', d: '#64748b', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: [".ss..........ss.","..ss.llllll.ss..","...llpppppp.ll..","....ppbppbpp....","...llllllllll...","..llllllllllll..",".pppppppppppppp.",".ppppddddddpppp.","..ppp......ppp..","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................"]},
  kleavor:      { palette: { p: '#a16207', d: '#1c1917', l: '#f8fafc', s: '#22c55e', b: '#0f172a' }, grid: ["....dddddddd....","...ddpbppbpdd...",".dd..pppppp..dd.","dddd.ssssss.dddd","dddp.pppppp.pddd",".dd..dddddd..dd.","....pppppppp....","....ppp..ppp....","...ddd....ddd...","................","................","................","................","................","................","................"]},
  ursaluna:     { palette: { p: '#78350f', d: '#451a03', l: '#facc15', s: '#a8a29e', b: '#0f172a' }, grid: ["..dd........dd..","..ddddppppdddd..",".ddddpbppbpdddd.",".pppppllllppppp.","ddddppppppppdddd","dddddddddddddddd",".pppppppppppppp.","..ddd......ddd..","..ddd......ddd..","................","................","................","................","................","................","................"]},
  basculegion:  { palette: { p: '#0f766e', d: '#be185d', l: '#f43f5e', s: '#f8fafc', b: '#0f172a' }, grid: ["....dddddddd....","..pppppppppppp..",".pppbllppppppdd.","ppppppppppppdddd","ppppddddppppdddd",".pp..dddddd..dd.",".....llllll.....","................","................","................","................","................","................","................","................","................"]},
  sneasler:     { palette: { p: '#a855f7', d: '#3b0764', l: '#f43f5e', s: '#cbd5e1', b: '#0f172a' }, grid: ["...llllllllll...","..lllsssssslll..","...pppppppppp...","...ppsbppbspl...","....pppppppp....","..ssppppppppss..",".ss.pppppppp.ss.","....pppddppp....","....pppppppp....","....pp....pp....","...lll....lll...","................","................","................","................","................"]},
  overqwil:     { palette: { p: '#1e293b', d: '#7e22ce', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [".d...d....d...d.","..dd.pppppp.dd..","...pppppppppp...",".ddppppbppbppdd.","ddddppppppppdddd",".dddddddddddd...","...dddddddddd...","..d...d..d...d..","................","................","................","................","................","................","................","................"]},
  enamorus:     { palette: { p: '#f472b6', d: '#be185d', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: ["....llllllll....","...pppppppppp...","...pppbppbppp...","..ssppppppppss..",".ss..dddddd..ss.","....pppppppp....","...llllllllll...","..llllllllllll..","....llllllll....","................","................","................","................","................","................","................"]},

  // --- PALDEA (#906 - #1025) ---
  sprigatito:   { palette: { p: '#4ade80', d: '#15803d', l: '#86efac', s: '#f472b6', b: '#0f172a' }, grid: ["..dd........dd..",".dppd......dppd.","..pppppppppppp..","..ppllsbbllspp..","..ppppddddpppp..","...dddddddddd...","...llllllllll...","...pppppppppp.dd","...pppppppppp.pd","....pp....pp..dd","....pp....pp....","...ddd....ddd...","................","................","................","................"]},
  floragato:    { palette: { p: '#4ade80', d: '#15803d', l: '#1e293b', s: '#f43f5e', b: '#0f172a' }, grid: ["..dd........dd..",".dppd......dppd.","..pppppppppppp..","..ppllsbbllspp..","...dddddddddd...","..llddddddddll..",".ll.pppppppp.ll.","....pppppppp.ss.","....ppp..ppp.ss.","....pp....pp....","...lll....lll...","................","................","................","................","................"]},
  meowscarada:  { palette: { p: '#4ade80', d: '#1e293b', l: '#15803d', s: '#f43f5e', b: '#0f172a' }, grid: ["..dd...ss...dd..",".dddd.ssss.dddd.","..dddsbppbsddd..","....pppppppp....","..llllllllllll..",".ll.pppppppp.ll.",".l..pppddppp..l.","....pppppppp....","...dddddddddd...","...dddd..dddd...","...ddd....ddd...","...ddd....ddd...","....pp....pp....","................","................","................"]},
  fuecoco:      { palette: { p: '#ef4444', d: '#991b1b', l: '#fef08a', s: '#facc15', b: '#0f172a' }, grid: ["......ssss......","....pppppppp....","..ppllllllllpp..",".pppllbppbllppp.",".pppllllllllppp.",".pppppppppppppp.","..pppllllllppp..","..pppllllllppp.p","..pppllllllppppp","...pppppppppp...","...ppp....ppp...","...ddd....ddd...","................","................","................","................"]},
  crocalor:     { palette: { p: '#dc2626', d: '#7f1d1d', l: '#facc15', s: '#fef08a', b: '#0f172a' }, grid: ["....llllllll....","..llssssssssll..","..llllllllllll..","..ppppbppbpppp..",".ppppllllllpppp.",".pppppppppppppp.","..pppllllllppp..","..pppppppppppp..","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................"]},
  skeledirge:   { palette: { p: '#dc2626', d: '#1e293b', l: '#f8fafc', s: '#f97316', b: '#0f172a' }, grid: ["..ssss....ssss..",".sssssllllsssss.","..ssllllllllss..","..ppppbppbpppp..",".pppppppppppppp.",".ddddllllllllldd",".ddddppppppppddd","..pppppppppppp..","..ppp..pp..ppp..","..ddd..dd..ddd..","................","................","................","................","................","................"]},
  quaxly:       { palette: { p: '#f8fafc', d: '#0284c7', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["...dddddddddd...","..ddddllllldddd.","..dddddddddddd..","...pppppppppp...","...pppbppbppp...","....ppsssspp....","...pppppppppp...","..pp.pppppp.pp..","....pppppppp....","....pppppppp....",".....s....s.....","....ss....ss....","................","................","................","................"]},
  quaxwell:     { palette: { p: '#2563eb', d: '#1e3a8a', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: ["...pppppppppp...","..ppppddddpppp..","...llllbppbll...","....lllsslll....","...llllllllll...","..pppppppppppp..",".pp.llllllll.pp.","....pppppppp....","....ppp..ppp....","....pp....pp....","...sss....sss...","................","................","................","................","................"]},
  quaquaval:    { palette: { p: '#1d4ed8', d: '#0f172a', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: ["...ss..ll..ss...","..llllpppp.lll..","...ppppbppbpp...","....pppppppp....",".ll.pppppppp.ll.","llllppddddpp.lll","ll.pppddddppp.ll","...pppppppppp...","....ppp..ppp....","....pp....pp....","...lll....lll...","...ss......ss...","................","................","................","................"]},
  lechonk:      { palette: { p: '#44403c', d: '#1c1917', l: '#f472b6', s: '#facc15', b: '#0f172a' }, grid: ["................","..dd........dd..",".ddddppppppdddd.",".ddppppppppppdd.",".ppsbppppllppsp.",".ppppppppllllpp.",".pppppppppppppp.","..ddddppppdddd..","...dd......dd...","...ll......ll...","................","................","................","................","................","................"]},
  oinkologne:   { palette: { p: '#292524', d: '#0f172a', l: '#f472b6', s: '#fef3c7', b: '#0f172a' }, grid: ["..dd........dd..",".ddddppppppdddd.",".ddppsbppbsspdd.",".ppppllllllpppp.",".pppppppppppppp.",".ddddppppppdddd.","..pppppppppppp..","..ddd......ddd..","..lll......lll..","................","................","................","................","................","................","................"]},
  tarountula:   { palette: { p: '#f8fafc', d: '#84cc16', l: '#ef4444', s: '#1e293b', b: '#0f172a' }, grid: ["....pppppppp....","..pppppppppppp..",".pppllpppppllpp.",".pppppppppppppp.","..pppppppppppp..","...dddddddddd...","..ddsbbppppbsd..",".ss..dddddd..ss.",".s...dd..dd...s.","................","................","................","................","................","................","................"]},
  spidops:      { palette: { p: '#84cc16', d: '#15803d', l: '#ef4444', s: '#78350f', b: '#0f172a' }, grid: [".....pppppp.....","....ppsbbspp....","....pppppppp....",".ss.dddddddd.ss.","ssss.pppppp.ssss",".ss..dddddd..ss.","...pp.pppp.pp...","..pp..dddd..pp..",".ss...p..p...ss.","................","................","................","................","................","................","................"]},
  nymble:       { palette: { p: '#334155', d: '#0f172a', l: '#facc15', s: '#94a3b8', b: '#0f172a' }, grid: ["...ll......ll...","....l.pppp.l....","...pppppppppp...","...ppsbppbspl...","..ddddppppdddd..",".ddddppppppdddd.","..pppppppppppp..","...dd..dd..dd...","................","................","................","................","................","................","................","................"]},
  lokix:        { palette: { p: '#1e293b', d: '#0f172a', l: '#84cc16', s: '#cbd5e1', b: '#0f172a' }, grid: ["...ll......ll...","....pppppppp....","...pplbppblpp...","....dddddddd....","..ssppppppppss..",".ss.ppddddpp.ss.","....pppppppp....","...dddd..dddd...","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................"]},
  pawmi:        { palette: { p: '#f97316', d: '#c2410c', l: '#fef08a', s: '#22c55e', b: '#0f172a' }, grid: ["..pp........pp..",".pppp..ll..pppp.","..pppppppppppp..","..pplbppppblpp..","..llllllllllll..","..pppppppppppp..",".pp.ppllllpp.pp.","....pppppppp....","....ppp..ppp....","...lll....lll...","................","................","................","................","................","................"]},
  pawmo:        { palette: { p: '#f97316', d: '#c2410c', l: '#fef08a', s: '#ffffff', b: '#0f172a' }, grid: ["..pp...ll...pp..",".pppp.llll.pppp.","..pppppppppppp..","..pplbppppblpp..","...pppppppppp...","..ppsssssssspp..",".pp.ssssssss.pp.","....pppppppp.dd.","....ppp..ppp.dd.","...lll....lll...","................","................","................","................","................","................"]},
  pawmot:       { palette: { p: '#f97316', d: '#c2410c', l: '#facc15', s: '#ffffff', b: '#0f172a' }, grid: ["..pp..llll..pp..",".ppppllllllpppp.","..pplbppppblpp..","...pppppppppp...",".ppsssssssssspp.","pp.ssssssssss.pp","...pppppppppp.dd","...pppp..pppp.dd","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................"]},
  tandemaus:    { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#93c5fd', s: '#f472b6', b: '#0f172a' }, grid: [".pp...pp.pp...pp","pppp.ppppppp.ppp",".pppppbppbpppbp.","..ppppppppppppp.","..lllllllllllll.","..ppppppp.ppppp.","...pp.pp...p.p..","................","................","................","................","................","................","................","................","................"]},
  maushold:     { palette: { p: '#f8fafc', d: '#93c5fd', l: '#cbd5e1', s: '#f472b6', b: '#0f172a' }, grid: [".pp..pp..pp..pp.","pppppppppppppppp",".ppppbppppbpppp.","..dddddddddddd..",".pp.ppp..ppp.pp.","ppp.pbp..pbp.ppp",".dd.ddd..ddd.dd.","..p..pp..pp..p..","................","................","................","................","................","................","................","................"]},
  fidough:      { palette: { p: '#fef3c7', d: '#d97706', l: '#ffffff', s: '#f43f5e', b: '#0f172a' }, grid: ["..dddd....dddd..",".dppppd..dppppd.",".dppppppppppppd.","..ppppbppbpppp..","..llllllllllll..",".llpppppppppp.ll","..ppppddddpppp..","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................"]},
  dachsbun:     { palette: { p: '#d97706', d: '#78350f', l: '#fef3c7', s: '#fde68a', b: '#0f172a' }, grid: ["..dddd....dddd..",".dssssd..dssssd.","..pppppppppppp..","..pppbppppbppp..","...llllllllll...","..ppppddddpppp..",".ppppdddddddppp.","..ppp......ppp..","..lll......lll..","................","................","................","................","................","................","................"]},
  smoliv:       { palette: { p: '#84cc16', d: '#15803d', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: ["......llll......","....dddddddd....","...dddddddddd...","....dddddddd....","...pppppppppp...","..ppppbppbpppp..","..pppppssppppp..","..pppppppppppp..","...pppppppppp...","....dd....dd....","................","................","................","................","................","................"]},
  dolliv:       { palette: { p: '#84cc16', d: '#15803d', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: ["...dddd..dddd...","..ddddppppdddd..","...ppppbppbpp...","....pppppppp....","..ddddllllldddd.",".ddddppppppdddd.","..dd.pppppp.dd..","....pppppppp....",".....pp..pp.....",".....dd..dd.....","................","................","................","................","................","................"]},
  arboliva:     { palette: { p: '#15803d', d: '#14532d', l: '#84cc16', s: '#a855f7', b: '#0f172a' }, grid: ["..ssss....ssss..",".ssdddd..ddddss.","..ddddlllllddd..","...lllpbpplll...",".pppppppppppppp.","pppppllllllppppp","pp..llllllll..pp","....pppppppp....","...pppppppppp...","...dddddddddd...","................","................","................","................","................","................"]},
  squawkabilly: { palette: { p: '#22c55e', d: '#0f172a', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: ["....dddddddd....","...dddddddddd...","....ppbppbps....","....ppllllpp....","..ppppsssspppp..",".pppppppppppppp.",".pppddddddddppp.","...pppppppppp...","....pppppppp....",".....l....l.....","....ll....ll....","................","................","................","................","................"]},
  nacli:        { palette: { p: '#f8fafc', d: '#a16207', l: '#f97316', s: '#d6d3d1', b: '#0f172a' }, grid: [".....pppppp.....","...pppppppppp...","..pppppppppppp..",".pppppppppppppp.",".ddddlllllldddd.",".ddddlbbllldddd.",".dddddddddddddd.","..dddddddddddd..","................","................","................","................","................","................","................","................"]},
  naclstack:    { palette: { p: '#a16207', d: '#78350f', l: '#f8fafc', s: '#f97316', b: '#0f172a' }, grid: ["....llllllll....","..llppppppppll..",".pppppppppppppp.",".ddddsbppbssddd.","ppppddddddddpppp","dddddddddddddddd",".ddd..dddd..ddd.",".lll..llll..lll.","................","................","................","................","................","................","................","................"]},
  garganacl:    { palette: { p: '#a16207', d: '#78350f', l: '#f8fafc', s: '#f97316', b: '#0f172a' }, grid: ["....llllllll....","..llppppppppll..",".ppppdddddddppp.","ppppssbppbsspppp","ddddppppppppdddd","dddddddddddddddd",".pppp..pp..pppp.",".dddd......dddd.",".llll......llll.","................","................","................","................","................","................","................"]},
  charcadet:    { palette: { p: '#dc2626', d: '#1e293b', l: '#f97316', s: '#38bdf8', b: '#0f172a' }, grid: [".....llllll.....","....llllllll....","...pppppppppp...","...ppsbppbspl...","....dddddddd....","...dddddddddd...","..pp.dddddd.pp..","....dddddddd....","....ppp..ppp....","....dd....dd....","................","................","................","................","................","................"]},
  armarouge:    { palette: { p: '#dc2626', d: '#7f1d1d', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["....llllllll....","...lllsssslll...","...pppppppppp...","...ppsbppbspl...",".ll.dddddddd.ll.","llllppppppppllll","llllppddddpp.lll","....pppppppp....","...dddddddddd...","...ppp....ppp...","...lll....lll...","...ddd....ddd...","................","................","................","................"]},
  ceruledge:    { palette: { p: '#312e81', d: '#0f172a', l: '#a855f7', s: '#38bdf8', b: '#0f172a' }, grid: [".....llllll.....","....llssssll....","...dddddddddd...","...ddsbppbsdd...","..ll.pppppp.ll..",".lllpppppppplll.",".ll.ppddddpp.ll.","....pppppppp....","...dddddddddd...","...ppp....ppp...","...ppp....ppp...","...ddd....ddd...","...lll....lll...","................","................","................"]},
  tadbulb:      { palette: { p: '#facc15', d: '#ca8a04', l: '#ef4444', s: '#fef08a', b: '#0f172a' }, grid: ["................","....pppppppp....","..ppsssssssspp..",".ppsssssssssspp.",".ppppbppppbpppp.",".ppppplllpppppp.","..ppppppppppppd.","...ddddddddddll.","................","................","................","................","................","................","................","................"]},
  bellibolt:    { palette: { p: '#22c55e', d: '#15803d', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: ["..ll........ll..",".lsll.pppp.llsl.","..llppppppppll..",".pppppbppbppppp.","pppppllllllppppp","ppppllllllllpppp","ppppllllllllpppp",".pppppppppppppp.","..dddd....dddd..","................","................","................","................","................","................","................"]},
  wattrel:      { palette: { p: '#1e293b', d: '#0f172a', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: [".....pppppp.....","....ppbppbps....","....ppllllpp....",".pp..pppppp..pp.","pppppppppppppppp",".ppppllllllpppp.","...ssssssssss...","....pppppppp....",".....l....l.....","................","................","................","................","................","................","................"]},
  kilowattrel:  { palette: { p: '#facc15', d: '#1e293b', l: '#f8fafc', s: '#f97316', b: '#0f172a' }, grid: [".dd...pppp...dd.","dddd.ppbppb.dddd","ddppppppppppppdd",".dppppllllppppd.","...pppppppppp...","...pppppppppp...","....dddddddd....",".....dddddd.....",".....s....s.....","....ss....ss....","................","................","................","................","................","................"]},
  maschiff:     { palette: { p: '#b45309', d: '#44403c', l: '#facc15', s: '#f8fafc', b: '#0f172a' }, grid: ["..dd........dd..","..ddddppppdddd..",".ddddppppppdddd.",".ddppbppppbppdd.",".pppplssssllppp.","..pppppppppppp..","..ddddppppdddd..","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................"]},
  mabosstiff:   { palette: { p: '#44403c', d: '#1c1917', l: '#d6d3d1', s: '#ef4444', b: '#0f172a' }, grid: ["..dd........dd..",".ddddppppppdddd.",".ddppbppppbppdd.",".pplllllllllllp.",".llllllllllllll.",".ddddppppppdddd.","dddddddddddddddd",".pppppppppppppp.","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................"]},
  shroodle:     { palette: { p: '#64748b', d: '#1e293b', l: '#facc15', s: '#a855f7', b: '#0f172a' }, grid: ["..pp........pp..",".pppp......pppp.","..pppppppppppp..","..ppllppppbllp..","..pplbpppppblp..","...pppppppppp...","....dddddddd.ss.","....pppppppp.ss.","....pp....pp....","................","................","................","................","................","................","................"]},
  grafaiai:     { palette: { p: '#1e293b', d: '#f8fafc', l: '#84cc16', s: '#a855f7', b: '#0f172a' }, grid: ["..dddd....dddd..",".ddllld..dllldd.","..ddddppppdddd..","...pplbppblpp...","..ppppddddpppp..",".ss.pppppppp.ll.",".s..pppddppp..l.","....pppppppp.dd.","....pp....pp.dd.","...ddd....ddd...","................","................","................","................","................","................"]},
  bramblin:     { palette: { p: '#a16207', d: '#451a03', l: '#ef4444', s: '#fde68a', b: '#0f172a' }, grid: ["...p..d..p..d...","..pp.dd.pp.dd...",".ppppddddppppdd.",".ddpppbllbppddp.",".ppppddddddpppp.",".ddppppppppppdd.","..ppppddddpppp..","...dd..pp..dd...","................","................","................","................","................","................","................","................"]},
  brambleghast: { palette: { p: '#92400e', d: '#451a03', l: '#a855f7', s: '#ef4444', b: '#0f172a' }, grid: ["..pp.dd..dd.pp..",".ppppddddddpppp.","ppddppppppppddpp","ddddpsbppbsspddd","ppppddddddddpppp","ddppppddddddppdd",".ddppddddddppdd.","..ddddppppdddd..","................","................","................","................","................","................","................","................"]},
  toedscool:    { palette: { p: '#fde047', d: '#a16207', l: '#ef4444', s: '#f8fafc', b: '#0f172a' }, grid: ["...pppppppppp...","..ppllppppllpp..",".pppppppppppppp.",".dddddddddddddd.","...ssbppppbss...","....ssssssss....","....pp....pp....","....pp....pp....","....pp....pp....","...dd......dd...","................","................","................","................","................","................"]},
  toedscruel:   { palette: { p: '#1e293b', d: '#a16207', l: '#f43f5e', s: '#fde047', b: '#0f172a' }, grid: ["..pppppppppppp..",".pplllpppplllpp.","pppppppppppppppp",".dddddddddddddd.","...ssbppppbss...","..ddddddddddddd.","..d.d.d..d.d.d..",".d..d.d..d.d..d.",".l..l..ll..l..l.","................","................","................","................","................","................","................"]},
  klawf:        { palette: { p: '#f97316', d: '#9a3412', l: '#fef3c7', s: '#38bdf8', b: '#0f172a' }, grid: ["....ss....ss....","..pp.pppppp.pp..",".pppppppppppppp.","ppppddddddddpppp","pp..llllllll..pp","...pppppppppp...","..pp.pp..pp.pp..",".dd..dd..dd..dd.","................","................","................","................","................","................","................","................"]},
  capsakid:     { palette: { p: '#22c55e', d: '#15803d', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: ["....dddddddd....","...dddddddddd...","..ddppppppppdd..","..ppppbppbpppp..","..ppppllllpppp..","...pppppppppp...","...dddddddddd...","...pppppppppp...","....pp....pp....","...ddd....ddd...","................","................","................","................","................","................"]},
  scovillain:   { palette: { p: '#16a34a', d: '#dc2626', l: '#facc15', s: '#15803d', b: '#0f172a' }, grid: ["..pppp....dddd..",".ppbbpp..ddbbdd.",".ppllpp..ddlldd.","..pppp....dddd..","...ssssssssss...","..pppppppppppp..",".pp.ssssssss.pp.","....pppppppp....","...ppp....ppp...","...sss....sss...","................","................","................","................","................","................"]},
  rellor:       { palette: { p: '#92400e', d: '#451a03', l: '#d97706', s: '#facc15', b: '#0f172a' }, grid: ["....llllllll....","..llllllllllll..",".llllllllllllll.",".llllllllllllll.","..llllllllllll..","...pppppppppp...","..ppsbppppbspp..","..pp.pppppp.pp..","...dd..dd..dd...","................","................","................","................","................","................","................"]},
  rabsca:       { palette: { p: '#7e22ce', d: '#1d4ed8', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: ["...pppppppppp...","..ppsssssssspp..",".ppddddddddddpp.",".ppddddddddddpp.","..ppsssssssspp..","...llllllllll...","....dddddddd....","...ddlbppbldd...","....dddddddd....","................","................","................","................","................","................","................"]},
  flittle:      { palette: { p: '#facc15', d: '#ec4899', l: '#38bdf8', s: '#f8fafc', b: '#0f172a' }, grid: ["....pppppppp....","..pppppppppppp..",".ppppdddddddppp.",".pppdsbppbssppp.","..pppppppppppp..","..ddddppppdddd..","...dddddddddd...","....ll....ll....","................","................","................","................","................","................","................","................"]},
  espathra:     { palette: { p: '#fde047', d: '#9333ea', l: '#ec4899', s: '#f8fafc', b: '#0f172a' }, grid: ["....pppppppp....","...pppddddppp...","...ppdbppbdpp...","....llllllll....",".....ssssss.....","..ppppddddpppp..",".pppppppppppppp.",".ppppllllllpppp.","..dddddddddddd..","....ss....ss....","....ss....ss....","...lll....lll...","................","................","................","................"]},
  tinkatink:    { palette: { p: '#f472b6', d: '#94a3b8', l: '#fce7f3', s: '#475569', b: '#0f172a' }, grid: [".........dddddd.","........ddddddd.","....pppp..ddddd.","...pppppp...ss..","...ppbppb...ss..","...pppppppp.ss..","..ppppppppppss..","...pppppppppp...","....pp....pp....","................","................","................","................","................","................","................"]},
  tinkatuff:    { palette: { p: '#f472b6', d: '#94a3b8', l: '#475569', s: '#fce7f3', b: '#0f172a' }, grid: ["........ddddddd.",".......dddddddd.","...pppp..dddddd.","..pppppp...lll..","..ppbppb...lll..","...pppppp..lll..","..ppppppppplll..",".pp.pppppppp....","....pppppppp....","....ppp..ppp....","....pp....pp....","................","................","................","................","................"]},
  tinkaton:     { palette: { p: '#f472b6', d: '#94a3b8', l: '#475569', s: '#f8fafc', b: '#0f172a' }, grid: [".dddddddddddddd.","ddddlllllllllddd","dddddddddddddddd","......llll......","...pppppppppp...","..pppppppppppp..","..pppbppppbppp..","...ppsssssspp...","..pppppppppppp..","...pppppppppp...","....ppp..ppp....","....pp....pp....","................","................","................","................"]},
  wiglett:      { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#f43f5e', s: '#a16207', b: '#0f172a' }, grid: ["......pppp......",".....pppppp.....","....pppbppbp....","....ppppllpp....",".....pppppp.....","......pppp......","......dddd......",".....pppppp.....","....ssssssss....","...ssssssssss...","................","................","................","................","................","................"]},
  wugtrio:      { palette: { p: '#ef4444', d: '#b91c1c', l: '#facc15', s: '#475569', b: '#0f172a' }, grid: ["..ppp..ppp..ppp.",".ppbp.ppbp.ppbp.",".pplp.pplp.pplp.","..ppp..ppp..ppp.","...pp..ppp..pp..","...ddddddddddd..","..sssssssssssss.",".sssssssssssssss","................","................","................","................","................","................","................","................"]},
  bombirdier:   { palette: { p: '#f8fafc', d: '#1e293b', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [".....pppppp.....","....pppbppbp....","....pppllll.....",".dd..pppppp..dd.","ddddppppppppdddd","dd..pppppppp..dd","...pppppppppp...","..pppppppppppp..","...pppppppppp...",".....l....l.....","....ll....ll....","................","................","................","................","................"]},
  finizen:      { palette: { p: '#38bdf8', d: '#0284c7', l: '#f8fafc', s: '#f472b6', b: '#0f172a' }, grid: ["......dddd......","....pppppppp....","..pppppppppppp..",".pppbpppppppppp.",".pppplllllllpppp","..llllllllllllpp","......dddd..ppp.","............pp..","................","................","................","................","................","................","................","................"]},
  palafin:      { palette: { p: '#38bdf8', d: '#0284c7', l: '#f43f5e', s: '#f8fafc', b: '#0f172a' }, grid: [".....pppppp.....","....pppppppp....","...pppbppbppp...","..pppppppppppp..",".pp.ssllllss.pp.","pp..ssllllss..pp","....ssssssss....","...pppppppppp...","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................"]},
  varoom:       { palette: { p: '#94a3b8', d: '#334155', l: '#facc15', s: '#1e293b', b: '#0f172a' }, grid: ["....dddddddd....","...pppppppppp...","..ppppddddpppp..",".ssppdllllldppss","sssppsbbbbsppsss",".sspppddddpppss.","...pppppppppp...","....dddddddd....","................","................","................","................","................","................","................","................"]},
  revavroom:    { palette: { p: '#94a3b8', d: '#1e293b', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: ["...dddddddddd...","..pppppppppppp..",".ddddppddppdddd.","ddddpsbppbsspddd","ppppddddddddpppp","dddd..pppp..dddd",".dd...dddd...dd.","................","................","................","................","................","................","................","................","................"]},
  cyclizar:     { palette: { p: '#22c55e', d: '#1e293b', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: ["....pppppppp....","...pppbppbppp...","..ddddddddddddd.",".ddddllllllllldd","..ddddppppdddd..","...pppppppppp.pp","..pppdddddddpppp","...dd......dd...","................","................","................","................","................","................","................","................"]},
  orthworm:     { palette: { p: '#ec4899', d: '#be185d', l: '#38bdf8', s: '#cbd5e1', b: '#0f172a' }, grid: ["....pppppppp....","..ppppddddpppp..",".pppbppppppbppp.",".pppssssssssppp.","ll..pppppppp..ll","ll.pppddddppp.ll","...pppppppppp...","....dddddddd....","................","................","................","................","................","................","................","................"]},
  glimmet:      { palette: { p: '#38bdf8', d: '#1e293b', l: '#a855f7', s: '#facc15', b: '#0f172a' }, grid: ["......dddd......",".....dddddd.....","....ddsbbsdd....","....dddddddd....","..pppppppppppp..",".pppllllllllppp.",".pppppppppppppp.","..ppppllllpppp..","....pppppppp....","................","................","................","................","................","................","................"]},
  glimmora:     { palette: { p: '#7e22ce', d: '#38bdf8', l: '#1e293b', s: '#facc15', b: '#0f172a' }, grid: ["....pppppppp....","..ppddddddddpp..",".ppddllllllddpp.","ppddllsbbsllddpp","ppddlllllllllddp",".ppddllllllddpp.","..ppddddddddpp..","....pppppppp....","................","................","................","................","................","................","................","................"]},
  greavard:     { palette: { p: '#f8fafc', d: '#cbd5e1', l: '#a855f7', s: '#facc15', b: '#0f172a' }, grid: [".......ll.......","......ssss......","......ssss......","...pppppppppp...","..ppppddddpppp..",".ppppbppppbpppp.",".ppppddddddpppp.","..pppppppppppp.p","..ppp......ppp.p","..ddd......ddd..","................","................","................","................","................","................"]},
  houndstone:   { palette: { p: '#e2e8f0', d: '#64748b', l: '#a855f7', s: '#facc15', b: '#0f172a' }, grid: [".....dddddd.....","....ddllllld....","..pppppppppppp..",".ppppddddddpppp.",".pppbppppppbppp.",".ppppddddddpppp.",".ppppppppppppppd","..ppp......pppdd","..ddd......ddd..","................","................","................","................","................","................","................"]},
  flamigo:      { palette: { p: '#f43f5e', d: '#be185d', l: '#facc15', s: '#1e293b', b: '#0f172a' }, grid: ["....pppp........","...pppbpsll.....","....pppp........",".....pp.........","....pp..........","...pppppppppp...","..ppppddddpppp..","...dddddddddd...","......p..p......","......p..p......",".....ll..ll.....","................","................","................","................","................"]},
  cetoddle:     { palette: { p: '#f8fafc', d: '#f472b6', l: '#334155', s: '#38bdf8', b: '#0f172a' }, grid: [".......ss.......","....pppppppp....","..pppppppppppp..",".ppppbppppbpppp.",".pppddddddddppp.",".pppddddddddppp.","..pppppppppppp..","...lll....lll...","................","................","................","................","................","................","................","................"]},
  cetitan:      { palette: { p: '#f8fafc', d: '#334155', l: '#f472b6', s: '#38bdf8', b: '#0f172a' }, grid: ["...ss......ss...","..pppppppppppp..",".pppppppppppppp.","ppppppbppbpppppp","pppppllllllppppp","pppppddddddppppp",".pppppppppppppp.","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................","................"]},
  veluza:       { palette: { p: '#94a3b8', d: '#ec4899', l: '#22c55e', s: '#1e293b', b: '#0f172a' }, grid: ["......llll......","....pppppppp..s.","..ppppbpppppppss",".ppppddddddpppss","..dddddddddddds.","......llll......","................","................","................","................","................","................","................","................","................","................"]},
  dondozo:      { palette: { p: '#2563eb', d: '#f8fafc', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: ["...pppppppppp...","..ppppllllpppp..",".pppbppppppbppp.","ppppddddddddpppp","ppppddddddsspppp","dddddddddddddddd",".dddddddddddddd.","................","................","................","................","................","................","................","................","................"]},
  tatsugiri:    { palette: { p: '#f97316', d: '#c2410c', l: '#f8fafc', s: '#facc15', b: '#0f172a' }, grid: ["................","....pppppppp....","...pppbppbppp...","..ppppllllpppp..","..ppppllllpppp.d","...pppppppppp.dd","....dddddddd....","................","................","................","................","................","................","................","................","................"]},
  annihilape:   { palette: { p: '#475569', d: '#1e293b', l: '#ef4444', s: '#f8fafc', b: '#0f172a' }, grid: ["..pppp....pppp..",".pppppppppppppp.",".pppplbppbllppp.","pppppppppppppppp","ppddddddddddddd.","..pppppppppppp..","..sss......sss..","..ddd......ddd..","................","................","................","................","................","................","................","................"]},
  clodsire:     { palette: { p: '#78350f', d: '#451a03', l: '#d8b4fe', s: '#f8fafc', b: '#0f172a' }, grid: ["................","...pppppppppp...","..ppppddddpppp..",".ppppbppppbpppp.",".ppppllllllpppp.","ppppddddddddpppp",".pppppppppppppp.","..ddd......ddd..","................","................","................","................","................","................","................","................"]},
  farigiraf:    { palette: { p: '#b45309', d: '#facc15', l: '#ef4444', s: '#1e293b', b: '#0f172a' }, grid: ["...ll......ll...","..pppppppppppp..","..ppddbppbddpp..","...ppddddddpp...","....pppppppp....","....dddddddd....","...dddddddddd...","..ddddppppdddd..","...dd......dd...","...ss......ss...","................","................","................","................","................","................"]},
  dudunsparce:  { palette: { p: '#fde047', d: '#38bdf8', l: '#f8fafc', s: '#f43f5e', b: '#0f172a' }, grid: ["...pppppp.......","..ppddddpp..ll..","..ppdbbdpp..ll..","...pppppppppp...","....ddddpppppp..",".....ppppddddpp.","......ddddpppppp",".......ppppddddp","................","................","................","................","................","................","................","................"]},
  kingambit:    { palette: { p: '#1e293b', d: '#991b1b', l: '#facc15', s: '#cbd5e1', b: '#0f172a' }, grid: ["......llll......","..ll.dddddd.ll..",".llllpbppbpllll.",".ppppddddddpppp.","llppppppppppppll","..ddddppppdddd..",".dddddddddddddd.",".pppppppppppppp.","..sss......sss..","................","................","................","................","................","................","................"]},
  great_tusk:   { palette: { p: '#7e22ce', d: '#78350f', l: '#f8fafc', s: '#ef4444', b: '#0f172a' }, grid: ["..ss........ss..",".ssssppppppssss.",".llddddbppbddll.","llllppppppppllll","ll.dddddddddd.ll","..dddddddddddd..","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................","................","................"]},
  scream_tail:  { palette: { p: '#f472b6', d: '#be185d', l: '#facc15', s: '#fbcfe8', b: '#0f172a' }, grid: ["..pp........pp..",".pppppppppppppp.",".ppddbppppbddpp.","..ppsssssssspp..","..ppppppppppppdd","...ppppppppppddd","....pp....pp.dd.","................","................","................","................","................","................","................","................","................"]},
  brute_bonnet: { palette: { p: '#dc2626', d: '#15803d', l: '#f8fafc', s: '#7e22ce', b: '#0f172a' }, grid: ["...pppppppppp...","..ppllppppllpp..",".pppppppppppppp.",".dddddddddddddd.","..ss.llbppb.ss..",".ss.dddddddd.ss.","...dddddddddd...","....dd....dd....","................","................","................","................","................","................","................","................"]},
  flutter_mane: { palette: { p: '#0f766e', d: '#134e4a', l: '#ef4444', s: '#facc15', b: '#0f172a' }, grid: [".ll..pppppp..ll.","llllpppppppp.lll","..ppppsbbspppp..","...pppppppppp...","....llllllll....","...pppppppppp...","..ppddddddddpp..","..p.p..dd..p.p..","................","................","................","................","................","................","................","................"]},
  slither_wing: { palette: { p: '#f97316', d: '#f8fafc', l: '#ef4444', s: '#38bdf8', b: '#0f172a' }, grid: [".ppp........ppp.","ppdpp.dddd.ppdpp","ppppplsbbslppppp",".ppppddddddpppp.","..dddddddddddd..","..ddddppppdddd..","...ppp....ppp...","...lll....lll...","................","................","................","................","................","................","................","................"]},
  sandy_shocks: { palette: { p: '#94a3b8', d: '#78350f', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: ["..ll.pppppp.ss..","...ppppbppbpp...",".ll.pppppppp.ss.","....dddddddd....","...dd..dd..dd...","..dd...dd...dd..",".dd....dd....dd.","................","................","................","................","................","................","................","................","................"]},
  iron_treads:  { palette: { p: '#cbd5e1', d: '#1e293b', l: '#ef4444', s: '#38bdf8', b: '#0f172a' }, grid: ["....dddddddd....","..ddppppppppdd..",".ppppllbppbllpp.","sspppddddddddpps","sspppddddddddpps",".ppppddddddddpp.","..ddd......ddd..","................","................","................","................","................","................","................","................","................"]},
  iron_bundle:  { palette: { p: '#ef4444', d: '#cbd5e1', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["....dddddddd....","...ddppssppdd...","...dddbppbddd...","...dddddddddd...","..pppppppppppp.l","..ppddddddddppll","...pppppppppp.ll","....ss....ss....","................","................","................","................","................","................","................","................"]},
  iron_hands:   { palette: { p: '#1e293b', d: '#facc15', l: '#38bdf8', s: '#cbd5e1', b: '#0f172a' }, grid: [".....dddddd.....","....pppppppp....","...pppbppbppp...",".dd..ssssss..dd.","ddddppppppppdddd",".dd.ssssssss.dd.","...pppppppppp...","...ddd....ddd...","................","................","................","................","................","................","................","................"]},
  iron_jugulis: { palette: { p: '#1e3a8a', d: '#0f172a', l: '#ec4899', s: '#38bdf8', b: '#0f172a' }, grid: [".dd...llll...dd.","dddd.llllll.dddd",".dd..ppbppb..dd.",".pp.dddddddd.pp.","pppppssssssppppp",".ppppsssssspppp.","..ddddppppdddd..","...pp......pp...","................","................","................","................","................","................","................","................"]},
  iron_moth:    { palette: { p: '#f97316', d: '#cbd5e1', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [".ppp........ppp.","ppdpp.dddd.ppdpp","ppppplsbbslppppp",".ppppddddddpppp.",".ppddddddddddpp.","..pp.dddddd.pp..","................","................","................","................","................","................","................","................","................","................"]},
  iron_thorns:  { palette: { p: '#22c55e', d: '#cbd5e1', l: '#a3e635', s: '#0f172a', b: '#0f172a' }, grid: ["....ll.ll.ll....","...pppppppppp...","..ppppbppbpppp..",".ppppdddddddppp.",".ppppllllllpppp.","..pppddddddppp..","..ppppppppppppd.","...ppp....pppdd.","...ddd....ddd...","................","................","................","................","................","................","................"]},
  frigibax:     { palette: { p: '#94a3b8', d: '#334155', l: '#38bdf8', s: '#facc15', b: '#0f172a' }, grid: ["......dddd......",".....dddddd.....","....pppppppp....","...pppbppbppp...","...ppsssssspp...","...pppppppppp...","..ppppddddpppp..","...pppppppppp.dd","....pp....pp....","................","................","................","................","................","................","................"]},
  arctibax:     { palette: { p: '#64748b', d: '#1e293b', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [".....dddddd.....","....dddddddd....","...ppppbppbpp...","....pppppppp....","..ddddppppdddd..",".ddddppppppdddd.","...pppppppppp.dd","...ppp....ppp.ll","...lll....lll...","................","................","................","................","................","................","................"]},
  baxcalibur:   { palette: { p: '#334155', d: '#1e293b', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: [".....ll.........","....lll.pppp....","...llllpbppbp...","..llllpppppppp..",".llll.dddddd....","..ll.pppppppp...","....pppppppppp.d","....ppp....pppdd","...lll......lll.","................","................","................","................","................","................","................"]},
  gimmighoul:   { palette: { p: '#94a3b8', d: '#b45309', l: '#facc15', s: '#ef4444', b: '#0f172a' }, grid: ["....ll....ll....",".....l....l.....","....pppppppp....","...ppsbppbspl...","....pppppppp....","..dddddddddddd..",".ddllllllllllldd",".dddddddddddddd.","...dddddddddd...","................","................","................","................","................","................","................"]},
  gholdengo:    { palette: { p: '#facc15', d: '#ca8a04', l: '#fef08a', s: '#ef4444', b: '#0f172a' }, grid: ["...pp..pp..pp...","..pppppppppppp..","...pppppppppp...","...ppsbppbspl...","...pppddddppp...","..pppppppppppp..",".pp..ppsspp..pp.",".p...pppppp...p.","....pppppppp....","....ppp..ppp....","....pp....pp....","...ddd....ddd...","................","................","................","................"]},
  wo_chien:     { palette: { p: '#78350f', d: '#15803d', l: '#a855f7', s: '#84cc16', b: '#0f172a' }, grid: ["....llllllll....","..llppppppppll..",".llppddddddppll.",".ppppdddddddppp.","ssddddddddddddss","ssssppppppppssss",".dddddddddddddd.","................","................","................","................","................","................","................","................","................"]},
  chien_pao:    { palette: { p: '#f8fafc', d: '#38bdf8', l: '#94a3b8', s: '#facc15', b: '#0f172a' }, grid: ["..pp........pp..",".pppppppppppppp.","..pppbppppbppp..","...llppppppll...","...llpppppp.ll..","..ppppddddpppp.d",".dppppppppppppdd","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................","................"]},
  ting_lu:      { palette: { p: '#78350f', d: '#451a03', l: '#16a34a', s: '#a8a29e', b: '#0f172a' }, grid: [".llllllllllllll.",".llssssssssssll.","..llllllllllll..","..ppppbppbpppp..",".ppppdddddddppp.","ddddppppppppdddd","dddddddddddddddd",".ppp..pp..ppp...",".ddd..dd..ddd...","................","................","................","................","................","................","................"]},
  chi_yu:       { palette: { p: '#ef4444', d: '#f97316', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["......llll......","....dddddddd..p.","..pppppppppppppp",".ppssbppppssbppp",".ppppppppppppppp","..ddddpppppp..pp",".....llllll...p.","................","................","................","................","................","................","................","................","................"]},
  roaring_moon: { palette: { p: '#38bdf8', d: '#dc2626', l: '#facc15', s: '#1e293b', b: '#0f172a' }, grid: [".ddd........ddd.","ddllldppppdllldd","dddddppbppbddddd",".ddd.pppppp.ddd.","....pppssspp....","...ppppsssppp...","...pppppppppp.pp","...pp......pp...","................","................","................","................","................","................","................","................"]},
  iron_valiant: { palette: { p: '#f8fafc', d: '#ec4899', l: '#22c55e', s: '#475569', b: '#0f172a' }, grid: ["...dd......dd...","..ddddlllllddd..","...llpbppbp.ll..","....pppppppp....","..dd.ppsspp.dd..",".dddppppppppddd.",".dd..pppppp..dd.","....ppp..ppp....","....dd....dd....","................","................","................","................","................","................","................"]},
  koraidon:     { palette: { p: '#dc2626', d: '#1e293b', l: '#f8fafc', s: '#38bdf8', b: '#0f172a' }, grid: [".ll..ssssss..ll.","llllllpppp.lllll",".lllpppbppbpp.ll","...pppppppppp...","..pppddddddppp..",".pppddddddddppp.",".pp.dddddddd.pp.","....pppppppp.pp.","...ppp....ppp.p.","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................"]},
  miraidon:     { palette: { p: '#6366f1', d: '#1e1b4b', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["..ll..ssss..ll..",".llllpppppp.lll.","..llpppbppbpp.l.","...pppppppppp...","..ppsssssssspp..",".pp.dddddddd.pp.","....dddddddd....","....pppppppp....","...ssss..ssss...","....dd....dd....",".....d....d.....","................","................","................","................","................"]},
  walking_wake: { palette: { p: '#38bdf8', d: '#0284c7', l: '#a855f7', s: '#ef4444', b: '#0f172a' }, grid: ["...ssss..ssss...","..llllpppp.lll..","...ppppbppbpp...","....pppppppp....","..ppppddddpppp..",".ppppppppppppppd","...ppp....ppp.dd","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................"]},
  iron_leaves:  { palette: { p: '#22c55e', d: '#cbd5e1', l: '#ec4899', s: '#fde047', b: '#0f172a' }, grid: ["..ll........ll..","...ll.pppp.ll...","....pppppppp....","....ppbppbpp....","...dddddddddd...","...pppppppppp...","..ppppddddpppp..","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................","................"]},
  dipplin:      { palette: { p: '#dc2626', d: '#991b1b', l: '#84cc16', s: '#fde047', b: '#0f172a' }, grid: [".....llllll.....","....llssssll....","....llbppbll....","..pppppppppppp..",".pppppppppppppp.",".ppppddddddpppp.",".pppppppppppppp.","..ddddppppdddd..","...dddddddddd...","................","................","................","................","................","................","................"]},
  poltchageist: { palette: { p: '#84cc16', d: '#15803d', l: '#78350f', s: '#facc15', b: '#0f172a' }, grid: ["......ssss......","....pppppppp....","..llllllllllll..",".llpppppppppp.l.",".llpppbppbppp.l.",".llddddddddddll.","..llllllllllll..","...dddddddddd...","................","................","................","................","................","................","................","................"]},
  sinistcha:    { palette: { p: '#15803d', d: '#1e293b', l: '#84cc16', s: '#facc15', b: '#0f172a' }, grid: ["......ssss......","....llllllll....","..dddddddddddd..",".ddllllllllllldd",".ddlllbppbllldd.",".ddppppppppppdd.","..dddddddddddd..","...ssssssssss...","................","................","................","................","................","................","................","................"]},
  okidogi:      { palette: { p: '#1e293b', d: '#16a34a', l: '#a855f7', s: '#f8fafc', b: '#0f172a' }, grid: ["..pp........pp..",".pppp.llll.pppp.",".ppppddddddpppp.","..ppppbppbpppp..",".ddddppppppdddd.","dddddddddddddddd","ppp..pppppp..ppp","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................","................"]},
  munkidori:    { palette: { p: '#3b82f6', d: '#1e293b', l: '#a855f7', s: '#ef4444', b: '#0f172a' }, grid: ["....llllllll....","...llllllllll...","..ddddppppdddd..","..ddssbppbssdd..","...pppppppppp...","..ddddppppdddd..",".dd..pppppp..dd.","....pppppppp.dd.","....pp....pp....","................","................","................","................","................","................","................"]},
  fezandipiti:  { palette: { p: '#1e293b', d: '#a855f7', l: '#f43f5e', s: '#f8fafc', b: '#0f172a' }, grid: ["....lll..lll....","....pppppppp....","....ppbppbps....",".dd..pppppp..dd.","ddddppppppppdddd","ddllpppppppplldd",".dd..dddddd..dd.","....pppppppp....",".....l....l.....","................","................","................","................","................","................","................"]},
  ogerpon:      { palette: { p: '#22c55e', d: '#15803d', l: '#f97316', s: '#facc15', b: '#0f172a' }, grid: ["...llllllllll...","..llssssssssll..",".llssppppppssll.",".llsspbppbpssll.","..llllllllllll..","..ppppddddpppp..",".pppppppppppppp.",".ppppddddddpppp.","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................"]},
  archaludon:   { palette: { p: '#cbd5e1', d: '#1e3a8a', l: '#38bdf8', s: '#ef4444', b: '#0f172a' }, grid: ["..dd........dd..",".dppd.ssss.dppd.",".pppppppppppppp.","..ppddbppbddpp..","..ppppllllpppp..",".pp..dddddd..pp.",".p...pppppp...p.","....ppp..ppp....","...ddd....ddd...","................","................","................","................","................","................","................"]},
  hydrapple:    { palette: { p: '#ef4444', d: '#15803d', l: '#facc15', s: '#84cc16', b: '#0f172a' }, grid: ["..dd...dd...dd..",".dss..dss..dssd.","..dd...dd...dd..","...pppppppppp...","..ppllllllllpp..",".ppppddddddpppp.",".pppppppppppppp.","..dddddddddddd..","................","................","................","................","................","................","................","................"]},
  gouging_fire: { palette: { p: '#b45309', d: '#facc15', l: '#ef4444', s: '#78350f', b: '#0f172a' }, grid: [".dddddddddddddd.","ddddlllllllllddd","..ddppbppbppdd..","...llllllllll...",".pppppppppppppp.","ppppddddddddpppp",".pppppppppppppp.","..ppp......ppp..","..lll......lll..","................","................","................","................","................","................","................"]},
  raging_bolt:  { palette: { p: '#facc15', d: '#1e293b', l: '#a855f7', s: '#38bdf8', b: '#0f172a' }, grid: ["...dddddddddd...","..ddddppppdddd..","...ddpbppbpdd...","....dddddddd....",".....pppppp.....",".....pppppp.....","...pppppppppp...","..ppppddddpppp..","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................"]},
  iron_boulder: { palette: { p: '#94a3b8', d: '#334155', l: '#facc15', s: '#38bdf8', b: '#0f172a' }, grid: ["..ll........ll..",".llll.pppp.llll.","..ddppppppppdd..","...pppbppbppp...","..ssssssssssss..",".pppppppppppppp.",".ppppdddddddppp.","..ppp......ppp..","..ddd......ddd..","................","................","................","................","................","................","................"]},
  iron_crown:   { palette: { p: '#0284c7', d: '#cbd5e1', l: '#facc15', s: '#ec4899', b: '#0f172a' }, grid: ["..ll........ll..",".llll.pppp.llll.","....pppppppp....","....ppbppbpp....","...dddddddddd...","...pppppppppp...","..ppppddddpppp..","..ppp......ppp..","..lll......lll..","................","................","................","................","................","................","................"]},
  terapagos:    { palette: { p: '#38bdf8', d: '#1e3a8a', l: '#fde047', s: '#f472b6', b: '#0f172a' }, grid: ["....llllllll....","..llppppppppll..",".llppddddddppll.","llppddssssddppll","ppppdsbbbbsppppp","ppppddssssddpppp",".llppddddddppll.","..llppppppppll..","...ppp....ppp...","...ddd....ddd...","................","................","................","................","................","................"]},
  pecharunt:    { palette: { p: '#9333ea', d: '#3b0764', l: '#f472b6', s: '#fde047', b: '#0f172a' }, grid: ["......llll......","....llllllll....","..llppppppppll..",".llppddddddppll.",".lppddsbbsddppl.",".lppddddddddppl.",".llppddddddppll.","..llppppppppll..","....dddddddd....",".....dddddd.....","................","................","................","................","................","................"]}

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