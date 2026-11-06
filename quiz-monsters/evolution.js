/********************************************************************
 * evolution.js
 * Complete National Dex Evolution Sheet (Gen 1 - Gen 9)
 * Supports EXP Wins, Elemental Stones, Held/Trade Items & Split Evolutions
 ********************************************************************/

const EVOLUTION_CHAINS = {
  // --- STARTER LINES (GEN 1 - GEN 9) ---
  bulbasaur:    { to: 'ivysaur',      method: 'EXP', winsNeeded: 2 },
  ivysaur:      { to: 'venusaur',     method: 'EXP', winsNeeded: 3 },
  charmander:   { to: 'charmeleon',   method: 'EXP', winsNeeded: 2 },
  charmeleon:   { to: 'charizard',    method: 'EXP', winsNeeded: 3 },
  squirtle:     { to: 'wartortle',    method: 'EXP', winsNeeded: 2 },
  wartortle:    { to: 'blastoise',    method: 'EXP', winsNeeded: 3 },
  chikorita:    { to: 'bayleef',      method: 'EXP', winsNeeded: 2 },
  bayleef:      { to: 'meganium',     method: 'EXP', winsNeeded: 3 },
  cyndaquil:    { to: 'quilava',      method: 'EXP', winsNeeded: 2 },
  quilava:      { to: 'typhlosion',   method: 'EXP', winsNeeded: 3 },
  totodile:     { to: 'croconaw',     method: 'EXP', winsNeeded: 2 },
  croconaw:     { to: 'feraligatr',   method: 'EXP', winsNeeded: 3 },
  treecko:      { to: 'grovyle',      method: 'EXP', winsNeeded: 2 },
  grovyle:      { to: 'sceptile',     method: 'EXP', winsNeeded: 3 },
  torchic:      { to: 'combusken',    method: 'EXP', winsNeeded: 2 },
  combusken:    { to: 'blaziken',     method: 'EXP', winsNeeded: 3 },
  mudkip:       { to: 'marshtomp',    method: 'EXP', winsNeeded: 2 },
  marshtomp:    { to: 'swampert',     method: 'EXP', winsNeeded: 3 },
  turtwig:      { to: 'grotle',       method: 'EXP', winsNeeded: 2 },
  grotle:       { to: 'torterra',     method: 'EXP', winsNeeded: 3 },
  chimchar:     { to: 'monferno',     method: 'EXP', winsNeeded: 2 },
  monferno:     { to: 'infernape',    method: 'EXP', winsNeeded: 3 },
  piplup:       { to: 'prinplup',     method: 'EXP', winsNeeded: 2 },
  prinplup:     { to: 'empoleon',     method: 'EXP', winsNeeded: 3 },
  snivy:        { to: 'servine',      method: 'EXP', winsNeeded: 2 },
  servine:      { to: 'serperior',    method: 'EXP', winsNeeded: 3 },
  tepig:        { to: 'pignite',      method: 'EXP', winsNeeded: 2 },
  pignite:      { to: 'emboar',       method: 'EXP', winsNeeded: 3 },
  oshawott:     { to: 'dewott',       method: 'EXP', winsNeeded: 2 },
  dewott:       { to: 'samurott',     method: 'EXP', winsNeeded: 3 },
  chespin:      { to: 'quilladin',    method: 'EXP', winsNeeded: 2 },
  quilladin:    { to: 'chesnaught',   method: 'EXP', winsNeeded: 3 },
  fennekin:     { to: 'braixen',      method: 'EXP', winsNeeded: 2 },
  braixen:      { to: 'delphox',      method: 'EXP', winsNeeded: 3 },
  froakie:      { to: 'frogadier',    method: 'EXP', winsNeeded: 2 },
  frogadier:    { to: 'greninja',     method: 'EXP', winsNeeded: 3 },
  rowlet:       { to: 'dartrix',      method: 'EXP', winsNeeded: 2 },
  dartrix:      { to: 'decidueye',    method: 'EXP', winsNeeded: 3 },
  litten:       { to: 'torracat',     method: 'EXP', winsNeeded: 2 },
  torracat:     { to: 'incineroar',   method: 'EXP', winsNeeded: 3 },
  popplio:      { to: 'brionne',      method: 'EXP', winsNeeded: 2 },
  brionne:      { to: 'primarina',    method: 'EXP', winsNeeded: 3 },
  grookey:      { to: 'thwackey',     method: 'EXP', winsNeeded: 2 },
  thwackey:     { to: 'rillaboom',    method: 'EXP', winsNeeded: 3 },
  scorbunny:    { to: 'raboot',       method: 'EXP', winsNeeded: 2 },
  raboot:       { to: 'cinderace',    method: 'EXP', winsNeeded: 3 },
  sobble:       { to: 'drizzile',     method: 'EXP', winsNeeded: 2 },
  drizzile:     { to: 'inteleon',     method: 'EXP', winsNeeded: 3 },
  sprigatito:   { to: 'floragato',    method: 'EXP', winsNeeded: 2 },
  floragato:    { to: 'meowscarada',  method: 'EXP', winsNeeded: 3 },
  fuecoco:      { to: 'crocalor',     method: 'EXP', winsNeeded: 2 },
  crocalor:     { to: 'skeledirge',   method: 'EXP', winsNeeded: 3 },
  quaxly:       { to: 'quaxwell',     method: 'EXP', winsNeeded: 2 },
  quaxwell:     { to: 'quaquaval',    method: 'EXP', winsNeeded: 3 },

  // --- GEN 1 KANTO LINES (WITH CROSS-GEN EVOLUTIONS) ---
  caterpie:     { to: 'metapod',      method: 'EXP', winsNeeded: 1 },
  metapod:      { to: 'butterfree',   method: 'EXP', winsNeeded: 2 },
  weedle:       { to: 'kakuna',       method: 'EXP', winsNeeded: 1 },
  kakuna:       { to: 'beedrill',     method: 'EXP', winsNeeded: 2 },
  pidgey:       { to: 'pidgeotto',    method: 'EXP', winsNeeded: 2 },
  pidgeotto:    { to: 'pidgeot',      method: 'EXP', winsNeeded: 3 },
  rattata:      { to: 'raticate',     method: 'EXP', winsNeeded: 2 },
  spearow:      { to: 'fearow',       method: 'EXP', winsNeeded: 2 },
  ekans:        { to: 'arbok',        method: 'EXP', winsNeeded: 2 },
  pikachu:      { to: 'raichu',       method: 'EVOITEM', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  sandshrew:    { to: 'sandslash',    method: 'EXP', winsNeeded: 2 },
  nidoran_f:    { to: 'nidorina',     method: 'EXP', winsNeeded: 2 },
  nidorina:     { to: 'nidoqueen',    method: 'EVOITEM', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  nidoran_m:    { to: 'nidorino',     method: 'EXP', winsNeeded: 2 },
  nidorino:     { to: 'nidoking',     method: 'EVOITEM', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  clefairy:     { to: 'clefable',     method: 'EVOITEM', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  vulpix:       { to: 'ninetales',    method: 'EVOITEM', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
  jigglypuff:   { to: 'wigglytuff',   method: 'EVOITEM', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  zubat:        { to: 'golbat',       method: 'EXP', winsNeeded: 2 },
  golbat:       { to: 'crobat',       method: 'EXP', winsNeeded: 3 },
  oddish:       { to: 'gloom',        method: 'EXP', winsNeeded: 2 },
  gloom: [
    { to: 'vileplume', method: 'EVOITEM', stone: 'LEAF', stoneLabel: 'LEAF STONE' },
    { to: 'bellossom', method: 'EVOITEM', stone: 'SUN',  stoneLabel: 'SUN STONE' }
  ],
  paras:        { to: 'parasect',     method: 'EXP', winsNeeded: 2 },
  venonat:      { to: 'venomoth',     method: 'EXP', winsNeeded: 2 },
  diglett:      { to: 'dugtrio',      method: 'EXP', winsNeeded: 2 },
  meowth:     { to: ['persian','perrserker'],    method: 'EXP',   winsNeeded: 2 },
  psyduck:      { to: 'golduck',      method: 'EXP', winsNeeded: 3 },
  mankey:       { to: 'primeape',     method: 'EXP', winsNeeded: 2 },
  primeape:     { to: 'annihilape',   method: 'EXP', winsNeeded: 3 },
  growlithe:    { to: 'arcanine',     method: 'EVOITEM', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
  poliwag:      { to: 'poliwhirl',    method: 'EXP', winsNeeded: 2 },
  poliwhirl: [
    { to: 'poliwrath', method: 'EVOITEM', stone: 'WATER', stoneLabel: 'WATER STONE' },
    { to: 'politoed',  method: 'EVOITEM', stone: 'KINGS', stoneLabel: 'KINGS ROCK' }
  ],
  abra:         { to: 'kadabra',      method: 'EXP', winsNeeded: 2 },
  kadabra: [
    { to: 'alakazam', method: 'EVOITEM', stone: 'LINK', stoneLabel: 'LINKING CORD' }
  ],
  machop:       { to: 'machoke',      method: 'EXP', winsNeeded: 2 },
  machoke: [
    { to: 'machamp', method: 'EVOITEM', stone: 'LINK', stoneLabel: 'LINKING CORD' }
  ],
  bellsprout:   { to: 'weepinbell',   method: 'EXP', winsNeeded: 2 },
  weepinbell:   { to: 'victreebel',   method: 'EVOITEM', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
  tentacool:    { to: 'tentacruel',   method: 'EXP', winsNeeded: 3 },
  geodude:      { to: 'graveler',     method: 'EXP', winsNeeded: 2 },
  graveler: [
    { to: 'golem', method: 'EVOITEM', stone: 'LINK', stoneLabel: 'LINKING CORD' }
  ],
  ponyta:       { to: 'rapidash',     method: 'EXP', winsNeeded: 3 },
  slowpoke: [
    { to: 'slowbro',  method: 'EXP',   winsNeeded: 3 },
    { to: 'slowking', method: 'EVOITEM', stone: 'KINGS', stoneLabel: 'KINGS ROCK' }
  ],
  magnemite:    { to: 'magneton',     method: 'EXP', winsNeeded: 2 },
  magneton:     { to: 'magnezone',    method: 'EVOITEM', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  farfetchd:    { to: 'sirfetchd',    method: 'EXP', winsNeeded: 3 },
  doduo:        { to: 'dodrio',       method: 'EXP', winsNeeded: 2 },
  seel:         { to: 'dewgong',      method: 'EXP', winsNeeded: 3 },
  grimer:       { to: 'muk',          method: 'EXP', winsNeeded: 3 },
  shellder:     { to: 'cloyster',     method: 'EVOITEM', stone: 'WATER',   stoneLabel: 'WATER STONE' },
  gastly:       { to: 'haunter',      method: 'EXP', winsNeeded: 2 },
  haunter: [
    { to: 'gengar', method: 'EVOITEM', stone: 'LINK', stoneLabel: 'LINKING CORD' }
  ],
  onix:         { to: 'steelix',      method: 'EVOITEM', stone: 'METAL',   stoneLabel: 'METAL COAT' },
  drowzee:      { to: 'hypno',        method: 'EXP', winsNeeded: 3 },
  krabby:       { to: 'kingler',      method: 'EXP', winsNeeded: 3 },
  voltorb:      { to: 'electrode',    method: 'EXP', winsNeeded: 2 },
  exeggcute:    { to: 'exeggutor',    method: 'EVOITEM', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
  cubone:       { to: 'marowak',      method: 'EXP', winsNeeded: 3 },
  lickitung:    { to: 'lickilicky',   method: 'EXP', winsNeeded: 3 },
  koffing:      { to: 'weezing',      method: 'EXP', winsNeeded: 3 },
  rhyhorn:      { to: 'rhydon',       method: 'EXP', winsNeeded: 3 },
  rhydon: [
    { to: 'rhyperior', method: 'EVOITEM', stone: 'PROTECTOR', stoneLabel: 'PROTECTOR' }
  ],
  chansey:      { to: 'blissey',      method: 'EXP', winsNeeded: 3 },
  tangela:      { to: 'tangrowth',    method: 'EXP', winsNeeded: 3 },
  horsea:       { to: 'seadra',       method: 'EXP', winsNeeded: 2 },
  seadra:       { to: 'kingdra',      method: 'EVOITEM', stone: 'DRAGON',  stoneLabel: 'DRAGON SCALE' },
  goldeen:      { to: 'seaking',      method: 'EXP', winsNeeded: 2 },
  staryu:       { to: 'starmie',      method: 'EVOITEM', stone: 'WATER',   stoneLabel: 'WATER STONE' },
  mr_mime:      { to: 'mr_rime',      method: 'EVOITEM', stone: 'ICE',     stoneLabel: 'ICE STONE' },
  scyther: [
    { to: 'scizor',  method: 'EVOITEM', stone: 'METAL',    stoneLabel: 'METAL COAT' },
    { to: 'kleavor', method: 'EVOITEM', stone: 'AUGURITE', stoneLabel: 'BLACK AUGURITE' }
  ],
  electabuzz: [
    { to: 'electivire', method: 'EVOITEM', stone: 'ELECTIRIZER', stoneLabel: 'ELECTIRIZER' }
  ],
  magmar: [
    { to: 'magmortar', method: 'EVOITEM', stone: 'MAGMARIZER', stoneLabel: 'MAGMARIZER' }
  ],
  magikarp:     { to: 'gyarados',     method: 'EXP', winsNeeded: 5 },
  eevee: [
    { to: 'vaporeon', method: 'EVOITEM', stone: 'WATER',   stoneLabel: 'WATER STONE' },
    { to: 'jolteon',  method: 'EVOITEM', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
    { to: 'flareon',  method: 'EVOITEM', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
    { to: 'espeon',   method: 'EVOITEM', stone: 'SUN',     stoneLabel: 'SUN STONE' },
    { to: 'umbreon',  method: 'EVOITEM', stone: 'MOON',    stoneLabel: 'MOON STONE' },
    { to: 'leafeon',  method: 'EVOITEM', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
    { to: 'glaceon',  method: 'EVOITEM', stone: 'ICE',     stoneLabel: 'ICE STONE' },
    { to: 'sylveon',  method: 'EVOITEM', stone: 'SHINY',   stoneLabel: 'SHINY STONE' }
  ],
  porygon:      { to: 'porygon2',     method: 'EVOITEM', stone: 'UPGRADE', stoneLabel: 'UP-GRADE' },
  porygon2: { to: 'porygon_z', method: 'EVOITEM', stone: 'DUBIOUS', stoneLabel: 'DUBIOUS DISC' },
  omanyte:      { to: 'omastar',      method: 'EXP', winsNeeded: 3 },
  kabuto:       { to: 'kabutops',     method: 'EXP', winsNeeded: 3 },
  dratini:      { to: 'dragonair',    method: 'EXP', winsNeeded: 2 },
  dragonair:    { to: 'dragonite',    method: 'EXP', winsNeeded: 3 },

  // --- GEN 2 JOHTO LINES ---
  sentret:      { to: 'furret',       method: 'EXP', winsNeeded: 2 },
  hoothoot:     { to: 'noctowl',      method: 'EXP', winsNeeded: 2 },
  ledyba:       { to: 'ledian',       method: 'EXP', winsNeeded: 2 },
  spinarak:     { to: 'ariados',      method: 'EXP', winsNeeded: 2 },
  chinchou:     { to: 'lanturn',      method: 'EXP', winsNeeded: 2 },
  pichu:        { to: 'pikachu',      method: 'EXP', winsNeeded: 2 },
  cleffa:       { to: 'clefairy',     method: 'EXP', winsNeeded: 2 },
  igglybuff:    { to: 'jigglypuff',   method: 'EXP', winsNeeded: 2 },
  togepi:       { to: 'togetic',      method: 'EXP', winsNeeded: 2 },
  togetic:      { to: 'togekiss',     method: 'EVOITEM', stone: 'SHINY',   stoneLabel: 'SHINY STONE' },
  natu:         { to: 'xatu',         method: 'EXP', winsNeeded: 2 },
  mareep:       { to: 'flaaffy',      method: 'EXP', winsNeeded: 2 },
  flaaffy:      { to: 'ampharos',     method: 'EXP', winsNeeded: 3 },
  marill:       { to: 'azumarill',    method: 'EXP', winsNeeded: 2 },
  hoppip:       { to: 'skiploom',     method: 'EXP', winsNeeded: 2 },
  skiploom:     { to: 'jumpluff',     method: 'EXP', winsNeeded: 3 },
  aipom:        { to: 'ambipom',      method: 'EXP', winsNeeded: 2 },
  sunkern:      { to: 'sunflora',     method: 'EVOITEM', stone: 'SUN',     stoneLabel: 'SUN STONE' },
  yanma:        { to: 'yanmega',      method: 'EXP', winsNeeded: 2 },
  wooper:       { to: ['quagsire', 'clodsire'], method: 'EXP', winsNeeded: 2 },
  murkrow:      { to: 'honchkrow',    method: 'EVOITEM', stone: 'DUSK',    stoneLabel: 'DUSK STONE' },
  misdreavus:   { to: 'mismagius',    method: 'EVOITEM', stone: 'DUSK',    stoneLabel: 'DUSK STONE' },
  girafarig:    { to: 'farigiraf',    method: 'EXP', winsNeeded: 2 },
  pineco:       { to: 'forretress',   method: 'EXP', winsNeeded: 2 },
  dunsparce:    { to: 'dudunsparce',  method: 'EXP', winsNeeded: 2 },
  gligar: [
    { to: 'gliscor', method: 'EVOITEM', stone: 'RAZOR_FANG', stoneLabel: 'RAZOR FANG' }
  ],
  snubbull:     { to: 'granbull',     method: 'EXP', winsNeeded: 2 },
  qwilfish:     { to: 'overqwil',     method: 'EXP', winsNeeded: 2 },
  sneasel: { to: ['weavile', 'sneasler'], method: 'EVOITEM', stone: 'RAZOR_CLAW', stoneLabel: 'RAZOR CLAW' },
  teddiursa:    { to: 'ursaring',     method: 'EXP', winsNeeded: 3 },
  ursaring: [
    { to: 'ursaluna', method: 'EVOITEM', stone: 'PEAT_BLOCK', stoneLabel: 'PEAT BLOCK' }
  ],
  slugma:       { to: 'magcargo',     method: 'EXP', winsNeeded: 2 },
  swinub:       { to: 'piloswine',    method: 'EXP', winsNeeded: 2 },
  piloswine:    { to: 'mamoswine',    method: 'EXP', winsNeeded: 3 },
  corsola:      { to: 'cursola',      method: 'EXP', winsNeeded: 2 },
  remoraid:     { to: 'octillery',    method: 'EXP', winsNeeded: 2 },
  houndour:     { to: 'houndoom',     method: 'EXP', winsNeeded: 2 },
  phanpy:       { to: 'donphan',      method: 'EXP', winsNeeded: 2 },
  stantler:     { to: 'wyrdeer',      method: 'EXP', winsNeeded: 2 },
  tyrogue:      { to: ['hitmonlee', 'hitmonchan', 'hitmontop'], method: 'EXP', winsNeeded: 2 },
  smoochum:     { to: 'jynx',         method: 'EXP', winsNeeded: 2 },
  elekid:       { to: 'electabuzz',   method: 'EXP', winsNeeded: 2 },
  magby:        { to: 'magmar',       method: 'EXP', winsNeeded: 2 },
  larvitar:     { to: 'pupitar',      method: 'EXP', winsNeeded: 2 },
  pupitar:      { to: 'tyranitar',    method: 'EXP', winsNeeded: 3 },

  // --- GEN 3 HOENN LINES ---
  poochyena:    { to: 'mightyena',    method: 'EXP', winsNeeded: 2 },
  zigzagoon:    { to: 'linoone',      method: 'EXP', winsNeeded: 2 },
  linoone:      { to: 'obstagoon',    method: 'EXP', winsNeeded: 3 },
  wurmple:      { to: ['silcoon', 'cascoon'], method: 'EXP', winsNeeded: 1 },
  silcoon:      { to: 'beautifly',    method: 'EXP', winsNeeded: 2 },
  cascoon:      { to: 'dustox',       method: 'EXP', winsNeeded: 2 },
  lotad:        { to: 'lombre',       method: 'EXP', winsNeeded: 2 },
  lombre:       { to: 'ludicolo',     method: 'EVOITEM', stone: 'WATER',   stoneLabel: 'WATER STONE' },
  seedot:       { to: 'nuzleaf',      method: 'EXP', winsNeeded: 2 },
  nuzleaf:      { to: 'shiftry',      method: 'EVOITEM', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
  taillow:      { to: 'swellow',      method: 'EXP', winsNeeded: 2 },
  wingull:      { to: 'pelipper',     method: 'EXP', winsNeeded: 2 },
  ralts:        { to: 'kirlia',       method: 'EXP', winsNeeded: 2 },
  kirlia: [
    { to: 'gardevoir', method: 'EXP',   winsNeeded: 3 },
    { to: 'gallade',   method: 'EVOITEM', stone: 'DAWN', stoneLabel: 'DAWN STONE' }
  ],
  surskit:      { to: 'masquerain',   method: 'EXP', winsNeeded: 2 },
  shroomish:    { to: 'breloom',      method: 'EXP', winsNeeded: 2 },
  slakoth:      { to: 'vigoroth',     method: 'EXP', winsNeeded: 2 },
  vigoroth:     { to: 'slaking',      method: 'EXP', winsNeeded: 3 },
  nincada:      { to: ['ninjask', 'shedinja'], method: 'EXP', winsNeeded: 2 },
  whismur:      { to: 'loudred',      method: 'EXP', winsNeeded: 2 },
  loudred:      { to: 'exploud',      method: 'EXP', winsNeeded: 3 },
  makuhita:     { to: 'hariyama',     method: 'EXP', winsNeeded: 2 },
  azurill:      { to: 'marill',       method: 'EXP', winsNeeded: 2 },
  nosepass:     { to: 'probopass',    method: 'EVOITEM', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  skitty:       { to: 'delcatty',     method: 'EVOITEM', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  aron:         { to: 'lairon',       method: 'EXP', winsNeeded: 2 },
  lairon:       { to: 'aggron',       method: 'EXP', winsNeeded: 3 },
  meditite:     { to: 'medicham',     method: 'EXP', winsNeeded: 2 },
  electrike:    { to: 'manectric',    method: 'EXP', winsNeeded: 2 },
  roselia:      { to: 'roserade',     method: 'EVOITEM', stone: 'SHINY',   stoneLabel: 'SHINY STONE' },
  gulpin:       { to: 'swalot',       method: 'EXP', winsNeeded: 2 },
  carvanha:     { to: 'sharpedo',     method: 'EXP', winsNeeded: 2 },
  wailmer:      { to: 'wailord',      method: 'EXP', winsNeeded: 3 },
  numel:        { to: 'camerupt',     method: 'EXP', winsNeeded: 2 },
  spoink:       { to: 'grumpig',      method: 'EXP', winsNeeded: 2 },
  trapinch:     { to: 'vibrava',      method: 'EXP', winsNeeded: 2 },
  vibrava:      { to: 'flygon',       method: 'EXP', winsNeeded: 3 },
  cacnea:       { to: 'cacturne',     method: 'EXP', winsNeeded: 2 },
  swablu:       { to: 'altaria',      method: 'EXP', winsNeeded: 3 },
  barboach:     { to: 'whiscash',     method: 'EXP', winsNeeded: 2 },
  corphish:     { to: 'crawdaunt',    method: 'EXP', winsNeeded: 2 },
  baltoy:       { to: 'claydol',      method: 'EXP', winsNeeded: 2 },
  lileep:       { to: 'cradily',      method: 'EXP', winsNeeded: 3 },
  anorith:      { to: 'armaldo',      method: 'EXP', winsNeeded: 3 },
  feebas: [
    { to: 'milotic', method: 'EVOITEM', stone: 'PRISM', stoneLabel: 'PRISM SCALE' }
  ],
  shuppet:      { to: 'banette',      method: 'EXP', winsNeeded: 2 },
  duskull:      { to: 'dusclops',     method: 'EXP', winsNeeded: 2 },
  dusclops: [
    { to: 'dusknoir', method: 'EVOITEM', stone: 'REAPER', stoneLabel: 'REAPER CLOTH' }
  ],
  wynaut:       { to: 'wobbuffet',    method: 'EXP', winsNeeded: 2 },
  snorunt: [
    { to: 'glalie',   method: 'EXP',   winsNeeded: 2 },
    { to: 'froslass', method: 'EVOITEM', stone: 'DAWN', stoneLabel: 'DAWN STONE' }
  ],
  spheal:       { to: 'sealeo',       method: 'EXP', winsNeeded: 2 },
  sealeo:       { to: 'walrein',      method: 'EXP', winsNeeded: 3 },
  clamperl: [
    { to: 'huntail',  method: 'EVOITEM', stone: 'TOOTH', stoneLabel: 'DEEP SEA TOOTH' },
    { to: 'gorebyss', method: 'EVOITEM', stone: 'SCALE', stoneLabel: 'DEEP SEA SCALE' }
  ],
  bagon:        { to: 'shelgon',      method: 'EXP', winsNeeded: 2 },
  shelgon:      { to: 'salamence',    method: 'EXP', winsNeeded: 3 },
  beldum:       { to: 'metang',       method: 'EXP', winsNeeded: 2 },
  metang:       { to: 'metagross',    method: 'EXP', winsNeeded: 3 },

  // --- GEN 4 SINNOH LINES ---
  starly:       { to: 'staravia',     method: 'EXP', winsNeeded: 2 },
  staravia:     { to: 'staraptor',    method: 'EXP', winsNeeded: 3 },
  bidoof:       { to: 'bibarel',      method: 'EXP', winsNeeded: 2 },
  kricketot:    { to: 'kricketune',   method: 'EXP', winsNeeded: 2 },
  shinx:        { to: 'luxio',        method: 'EXP', winsNeeded: 2 },
  luxio:        { to: 'luxray',       method: 'EXP', winsNeeded: 3 },
  budew:        { to: 'roselia',      method: 'EXP', winsNeeded: 2 },
  cranidos:     { to: 'rampardos',    method: 'EXP', winsNeeded: 3 },
  shieldon:     { to: 'bastiodon',    method: 'EXP', winsNeeded: 3 },
  burmy:        { to: ['wormadam', 'mothim'], method: 'EXP', winsNeeded: 2 },
  combee:       { to: 'vespiquen',    method: 'EXP', winsNeeded: 2 },
  buizel:       { to: 'floatzel',     method: 'EXP', winsNeeded: 2 },
  cherubi:      { to: 'cherrim',      method: 'EXP', winsNeeded: 2 },
  shellos:      { to: 'gastrodon',    method: 'EXP', winsNeeded: 2 },
  drifloon:     { to: 'drifblim',     method: 'EXP', winsNeeded: 2 },
  buneary:      { to: 'lopunny',      method: 'EXP', winsNeeded: 2 },
  glameow:      { to: 'purugly',      method: 'EXP', winsNeeded: 2 },
  chingling:    { to: 'chimecho',     method: 'EXP', winsNeeded: 2 },
  stunky:       { to: 'skuntank',     method: 'EXP', winsNeeded: 2 },
  bronzor:      { to: 'bronzong',     method: 'EXP', winsNeeded: 2 },
  bonsly:       { to: 'sudowoodo',    method: 'EXP', winsNeeded: 2 },
  mime_jr:      { to: 'mr_mime',      method: 'EXP', winsNeeded: 2 },
  happiny: [
    { to: 'chansey', method: 'EVOITEM', stone: 'OVAL', stoneLabel: 'OVAL STONE' }
  ],
  gible:        { to: 'gabite',       method: 'EXP', winsNeeded: 2 },
  gabite:       { to: 'garchomp',     method: 'EXP', winsNeeded: 3 },
  munchlax:     { to: 'snorlax',      method: 'EXP', winsNeeded: 2 },
  riolu:        { to: 'lucario',      method: 'EXP', winsNeeded: 2 },
  hippopotas:   { to: 'hippowdon',    method: 'EXP', winsNeeded: 2 },
  skorupi:      { to: 'drapion',      method: 'EXP', winsNeeded: 2 },
  croagunk:     { to: 'toxicroak',    method: 'EXP', winsNeeded: 2 },
  finneon:      { to: 'lumineon',     method: 'EXP', winsNeeded: 2 },
  mantyke:      { to: 'mantine',      method: 'EXP', winsNeeded: 2 },
  snover:       { to: 'abomasnow',    method: 'EXP', winsNeeded: 2 },

  // --- GEN 5 UNOVA LINES ---
  patrat:       { to: 'watchog',      method: 'EXP', winsNeeded: 2 },
  lillipup:     { to: 'herdier',      method: 'EXP', winsNeeded: 2 },
  herdier:      { to: 'stoutland',    method: 'EXP', winsNeeded: 3 },
  purrloin:     { to: 'liepard',      method: 'EXP', winsNeeded: 2 },
  pansage:      { to: 'simisage',     method: 'EVOITEM', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
  pansear:      { to: 'simisear',     method: 'EVOITEM', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
  panpour:      { to: 'simipour',     method: 'EVOITEM', stone: 'WATER',   stoneLabel: 'WATER STONE' },
  munna:        { to: 'musharna',     method: 'EVOITEM', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  pidove:       { to: 'tranquill',    method: 'EXP', winsNeeded: 2 },
  tranquill:    { to: 'unfezant',     method: 'EXP', winsNeeded: 3 },
  blitzle:      { to: 'zebstrika',    method: 'EXP', winsNeeded: 2 },
  roggenrola:   { to: 'boldore',      method: 'EXP', winsNeeded: 2 },
  boldore: [
    { to: 'gigalith', method: 'EVOITEM', stone: 'LINK', stoneLabel: 'LINKING CORD' }
  ],
  woobat:       { to: 'swoobat',      method: 'EXP', winsNeeded: 2 },
  drilbur:      { to: 'excadrill',    method: 'EXP', winsNeeded: 2 },
  timburr:      { to: 'gurdurr',      method: 'EXP', winsNeeded: 2 },
  gurdurr: [
    { to: 'conkeldurr', method: 'EVOITEM', stone: 'LINK', stoneLabel: 'LINKING CORD' }
  ],
  tympole:      { to: 'palpitoad',    method: 'EXP', winsNeeded: 2 },
  palpitoad:    { to: 'seismitoad',   method: 'EXP', winsNeeded: 3 },
  sewaddle:     { to: 'swadloon',     method: 'EXP', winsNeeded: 2 },
  swadloon:     { to: 'leavanny',     method: 'EXP', winsNeeded: 3 },
  venipede:     { to: 'whirlipede',   method: 'EXP', winsNeeded: 2 },
  whirlipede:   { to: 'scolipede',    method: 'EXP', winsNeeded: 3 },
  cottonee:     { to: 'whimsicott',   method: 'EVOITEM', stone: 'SUN',     stoneLabel: 'SUN STONE' },
  petilil:      { to: 'lilligant',    method: 'EVOITEM', stone: 'SUN',     stoneLabel: 'SUN STONE' },
  basculin:     { to: 'basculegion',  method: 'EXP', winsNeeded: 3 },
  sandile:      { to: 'krokorok',     method: 'EXP', winsNeeded: 2 },
  krokorok:     { to: 'krookodile',   method: 'EXP', winsNeeded: 3 },
  darumaka:     { to: 'darmanitan',   method: 'EXP', winsNeeded: 2 },
  dwebble:      { to: 'crustle',      method: 'EXP', winsNeeded: 2 },
  scraggy:      { to: 'scrafty',      method: 'EXP', winsNeeded: 2 },
  yamask:       { to: ['cofagrigus', 'runerigus'], method: 'EXP', winsNeeded: 2 },
  tirtouga:     { to: 'carracosta',   method: 'EXP', winsNeeded: 2 },
  archen:       { to: 'archeops',     method: 'EXP', winsNeeded: 2 },
  trubbish:     { to: 'garbodor',     method: 'EXP', winsNeeded: 2 },
  zorua:        { to: 'zoroark',      method: 'EXP', winsNeeded: 2 },
  minccino:     { to: 'cinccino',     method: 'EVOITEM', stone: 'SHINY',   stoneLabel: 'SHINY STONE' },
  gothita:      { to: 'gothorita',    method: 'EXP', winsNeeded: 2 },
  gothorita:    { to: 'gothitelle',   method: 'EXP', winsNeeded: 3 },
  solosis:      { to: 'duosion',      method: 'EXP', winsNeeded: 2 },
  duosion:      { to: 'reuniclus',    method: 'EXP', winsNeeded: 3 },
  ducklett:     { to: 'swanna',       method: 'EXP', winsNeeded: 2 },
  vanillite:    { to: 'vanillish',    method: 'EXP', winsNeeded: 2 },
  vanillish:    { to: 'vanilluxe',    method: 'EXP', winsNeeded: 3 },
  deerling:     { to: 'sawsbuck',     method: 'EXP', winsNeeded: 2 },
  karrablast:   { to: 'escavalier',   method: 'EXP', winsNeeded: 2 },
  foongus:      { to: 'amoonguss',    method: 'EXP', winsNeeded: 2 },
  frillish:     { to: 'jellicent',    method: 'EXP', winsNeeded: 2 },
  joltik:       { to: 'galvantula',   method: 'EXP', winsNeeded: 2 },
  ferroseed:    { to: 'ferrothorn',   method: 'EXP', winsNeeded: 2 },
  klink:        { to: 'klang',        method: 'EXP', winsNeeded: 2 },
  klang:        { to: 'klinklang',    method: 'EXP', winsNeeded: 3 },
  tynamo:       { to: 'eelektrik',    method: 'EXP', winsNeeded: 2 },
  eelektrik:    { to: 'eelektross',   method: 'EVOITEM', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  elgyem:       { to: 'beheeyem',     method: 'EXP', winsNeeded: 2 },
  litwick:      { to: 'lampent',      method: 'EXP', winsNeeded: 2 },
  lampent:      { to: 'chandelure',   method: 'EVOITEM', stone: 'DUSK',    stoneLabel: 'DUSK STONE' },
  axew:         { to: 'fraxure',      method: 'EXP', winsNeeded: 2 },
  fraxure:      { to: 'haxorus',      method: 'EXP', winsNeeded: 3 },
  cubchoo:      { to: 'beartic',      method: 'EXP', winsNeeded: 2 },
  shelmet:      { to: 'accelgor',     method: 'EXP', winsNeeded: 2 },
  mienfoo:      { to: 'mienshao',     method: 'EXP', winsNeeded: 2 },
  golett:       { to: 'golurk',       method: 'EXP', winsNeeded: 2 },
  pawniard:     { to: 'bisharp',      method: 'EXP', winsNeeded: 2 },
  bisharp: [
    { to: 'kingambit', method: 'EVOITEM', stone: 'CREST', stoneLabel: 'LEADERS CREST' }
  ],
  rufflet:      { to: 'braviary',     method: 'EXP', winsNeeded: 2 },
  vullaby:      { to: 'mandibuzz',    method: 'EXP', winsNeeded: 2 },
  deino:        { to: 'zweilous',     method: 'EXP', winsNeeded: 2 },
  zweilous:     { to: 'hydreigon',    method: 'EXP', winsNeeded: 3 },
  larvesta:     { to: 'volcarona',    method: 'EXP', winsNeeded: 3 },

  // --- GEN 6 KALOS LINES ---
  bunnelby:     { to: 'diggersby',    method: 'EXP', winsNeeded: 2 },
  fletchling:   { to: 'fletchinder',  method: 'EXP', winsNeeded: 2 },
  fletchinder:  { to: 'talonflame',   method: 'EXP', winsNeeded: 3 },
  scatterbug:   { to: 'spewpa',       method: 'EXP', winsNeeded: 1 },
  spewpa:       { to: 'vivillon',     method: 'EXP', winsNeeded: 2 },
  litleo:       { to: 'pyroar',       method: 'EXP', winsNeeded: 2 },
  flabebe:      { to: 'floette',      method: 'EXP', winsNeeded: 2 },
  floette:      { to: 'florges',      method: 'EVOITEM', stone: 'SHINY',   stoneLabel: 'SHINY STONE' },
  skiddo:       { to: 'gogoat',       method: 'EXP', winsNeeded: 2 },
  pancham:      { to: 'pangoro',      method: 'EXP', winsNeeded: 2 },
  espurr:       { to: 'meowstic',     method: 'EXP', winsNeeded: 2 },
  honedge:      { to: 'doublade',     method: 'EXP', winsNeeded: 2 },
  doublade:     { to: 'aegislash',    method: 'EVOITEM', stone: 'DUSK',    stoneLabel: 'DUSK STONE' },
  spritzee: [
    { to: 'aromatisse', method: 'EVOITEM', stone: 'SACHET', stoneLabel: 'SACHET' }
  ],
  swirlix: [
    { to: 'slurpuff', method: 'EVOITEM', stone: 'WHIPPED', stoneLabel: 'WHIPPED DREAM' }
  ],
  inkay:        { to: 'malamar',      method: 'EXP', winsNeeded: 2 },
  binacle:      { to: 'barbaracle',   method: 'EXP', winsNeeded: 2 },
  skrelp:       { to: 'dragalge',     method: 'EXP', winsNeeded: 2 },
  clauncher:    { to: 'clawitzer',    method: 'EXP', winsNeeded: 2 },
  helioptile:   { to: 'heliolisk',    method: 'EVOITEM', stone: 'SUN',     stoneLabel: 'SUN STONE' },
  tyrunt:       { to: 'tyrantrum',    method: 'EXP', winsNeeded: 2 },
  amaura:       { to: 'aurorus',      method: 'EXP', winsNeeded: 2 },
  goomy:        { to: 'sliggoo',      method: 'EXP', winsNeeded: 2 },
  sliggoo:      { to: 'goodra',       method: 'EXP', winsNeeded: 3 },
  phantump: [
    { to: 'trevenant', method: 'EVOITEM', stone: 'LINK', stoneLabel: 'LINKING CORD' }
  ],
  pumpkaboo: [
    { to: 'gourgeist', method: 'EVOITEM', stone: 'LINK', stoneLabel: 'LINKING CORD' }
  ],
  bergmite:     { to: 'avalugg',      method: 'EXP', winsNeeded: 2 },
  noibat:       { to: 'noivern',      method: 'EXP', winsNeeded: 2 },

  // --- GEN 7 ALOLA LINES ---
  pikipek:      { to: 'trumbeak',     method: 'EXP', winsNeeded: 2 },
  trumbeak:     { to: 'toucannon',    method: 'EXP', winsNeeded: 3 },
  yungoos:      { to: 'gumshoos',     method: 'EXP', winsNeeded: 2 },
  grubbin:      { to: 'charjabug',    method: 'EXP', winsNeeded: 2 },
  charjabug:    { to: 'vikavolt',     method: 'EVOITEM', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  crabrawler:   { to: 'crabominable', method: 'EVOITEM', stone: 'ICE',     stoneLabel: 'ICE STONE' },
  cutiefly:     { to: 'ribombee',     method: 'EXP', winsNeeded: 2 },
  rockruff:     { to: 'lycanroc',     method: 'EXP', winsNeeded: 2 },
  mareanie:     { to: 'toxapex',      method: 'EXP', winsNeeded: 2 },
  mudbray:      { to: 'mudsdale',     method: 'EXP', winsNeeded: 2 },
  dewpider:     { to: 'araquanid',    method: 'EXP', winsNeeded: 2 },
  fomantis:     { to: 'lurantis',     method: 'EXP', winsNeeded: 2 },
  morelull:     { to: 'shiinotic',    method: 'EXP', winsNeeded: 2 },
  salandit:     { to: 'salazzle',     method: 'EXP', winsNeeded: 2 },
  stufful:      { to: 'bewear',       method: 'EXP', winsNeeded: 2 },
  bounsweet:    { to: 'steenee',      method: 'EXP', winsNeeded: 2 },
  steenee:      { to: 'tsareena',     method: 'EXP', winsNeeded: 3 },
  wimpod:       { to: 'golisopod',    method: 'EXP', winsNeeded: 3 },
  sandygast:    { to: 'palossand',    method: 'EXP', winsNeeded: 2 },
  type_null:    { to: 'silvally',     method: 'EXP', winsNeeded: 3 },
  jangmo_o:     { to: 'hakamo_o',     method: 'EXP', winsNeeded: 2 },
  hakamo_o:     { to: 'kommo_o',      method: 'EXP', winsNeeded: 3 },
  cosmog:       { to: 'cosmoem',      method: 'EXP', winsNeeded: 2 },
  cosmoem:      { to: ['solgaleo', 'lunala'], method: 'EXP', winsNeeded: 3 },
  poipole:      { to: 'naganadel',    method: 'EXP', winsNeeded: 3 },
  meltan:       { to: 'melmetal',     method: 'EVOITEM', stone: 'METAL',   stoneLabel: 'METAL COAT' },

  // --- GEN 8 GALAR LINES ---
  skwovet:      { to: 'greedent',     method: 'EXP', winsNeeded: 2 },
  rookidee:     { to: 'corvisquire',  method: 'EXP', winsNeeded: 2 },
  corvisquire:  { to: 'corviknight',  method: 'EXP', winsNeeded: 3 },
  blipbug:      { to: 'dottler',      method: 'EXP', winsNeeded: 2 },
  dottler:      { to: 'orbeetle',     method: 'EXP', winsNeeded: 3 },
  nickit:       { to: 'thievul',      method: 'EXP', winsNeeded: 2 },
  gossifleur:   { to: 'eldegoss',     method: 'EXP', winsNeeded: 2 },
  wooloo:       { to: 'dubwool',      method: 'EXP', winsNeeded: 2 },
  chewtle:      { to: 'drednaw',      method: 'EXP', winsNeeded: 2 },
  yamper:       { to: 'boltund',      method: 'EXP', winsNeeded: 2 },
  rolycoly:     { to: 'carkol',       method: 'EXP', winsNeeded: 2 },
  carkol:       { to: 'coalossal',    method: 'EXP', winsNeeded: 3 },
  applin: [
    { to: 'flapple',  method: 'EVOITEM', stone: 'TART_APPLE',  stoneLabel: 'TART APPLE' },
    { to: 'appletun', method: 'EVOITEM', stone: 'SWEET_APPLE', stoneLabel: 'SWEET APPLE' },
    { to: 'dipplin',  method: 'EVOITEM', stone: 'SYRUP_APPLE', stoneLabel: 'SYRUPY APPLE' }
  
  ],
  dipplin:      { to: 'hydrapple',    method: 'EXP', winsNeeded: 3 },
  silicobra:    { to: 'sandaconda',   method: 'EXP', winsNeeded: 2 },
  arrokuda:     { to: 'barraskewda',  method: 'EXP', winsNeeded: 2 },
  toxel:        { to: 'toxtricity',   method: 'EXP', winsNeeded: 2 },
  sizzlipede:   { to: 'centiskorch',  method: 'EXP', winsNeeded: 2 },
  clobbopus:    { to: 'grapploct',    method: 'EXP', winsNeeded: 2 },
  sinistea: [
    { to: 'polteageist', method: 'EVOITEM', stone: 'CRACKED_POT', stoneLabel: 'CRACKED POT' }
  ],
  hatenna:      { to: 'hattrem',      method: 'EXP', winsNeeded: 2 },
  hattrem:      { to: 'hatterene',    method: 'EXP', winsNeeded: 3 },
  impidimp:     { to: 'morgrem',      method: 'EXP', winsNeeded: 2 },
  morgrem:      { to: 'grimmsnarl',   method: 'EXP', winsNeeded: 3 },
  milcery: [
    { to: 'alcremie', method: 'EVOITEM', stone: 'SWEET', stoneLabel: 'STRAWBERRY SWEET' }
  ],
  snom:         { to: 'frosmoth',     method: 'EXP', winsNeeded: 2 },
  cufant:       { to: 'copperajah',   method: 'EXP', winsNeeded: 2 },
  duraludon: [
    { to: 'archaludon', method: 'EVOITEM', stone: 'ALLOY', stoneLabel: 'METAL ALLOY' },
  ],
  dreepy:       { to: 'drakloak',     method: 'EXP', winsNeeded: 2 },
  drakloak:     { to: 'dragapult',    method: 'EXP', winsNeeded: 3 },
  kubfu: [
    { to: 'urshifu', method: 'EVOITEM', stone: 'SCROLL', stoneLabel: 'SCROLL OF WATERS' }
  ],

  // --- GEN 9 PALDEA LINES ---
  lechonk:      { to: 'oinkologne',   method: 'EXP', winsNeeded: 2 },
  tarountula:   { to: 'spidops',      method: 'EXP', winsNeeded: 2 },
  nymble:       { to: 'lokix',        method: 'EXP', winsNeeded: 2 },
  pawmi:        { to: 'pawmo',        method: 'EXP', winsNeeded: 2 },
  pawmo:        { to: 'pawmot',       method: 'EXP', winsNeeded: 3 },
  tandemaus:    { to: 'maushold',     method: 'EXP', winsNeeded: 2 },
  fidough:      { to: 'dachsbun',     method: 'EXP', winsNeeded: 2 },
  smoliv:       { to: 'dolliv',       method: 'EXP', winsNeeded: 2 },
  dolliv:       { to: 'arboliva',     method: 'EXP', winsNeeded: 3 },
  nacli:        { to: 'naclstack',    method: 'EXP', winsNeeded: 2 },
  naclstack:    { to: 'garganacl',    method: 'EXP', winsNeeded: 3 },
  charcadet: [
    { to: 'armarouge', method: 'EVOITEM', stone: 'AUSPICIOUS', stoneLabel: 'AUSPICIOUS ARMOR' },
    { to: 'ceruledge', method: 'EVOITEM', stone: 'MALICIOUS',  stoneLabel: 'MALICIOUS ARMOR' },
  ],
  tadbulb:      { to: 'bellibolt',    method: 'EVOITEM', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  wattrel:      { to: 'kilowattrel',  method: 'EXP', winsNeeded: 2 },
  maschiff:     { to: 'mabosstiff',   method: 'EXP', winsNeeded: 2 },
  shroodle:     { to: 'grafaiai',     method: 'EXP', winsNeeded: 2 },
  bramblin:     { to: 'brambleghast', method: 'EXP', winsNeeded: 2 },
  toedscool:    { to: 'toedscruel',   method: 'EXP', winsNeeded: 2 },
  capsakid:     { to: 'scovillain',   method: 'EVOITEM', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
  rellor:       { to: 'rabsca',       method: 'EXP', winsNeeded: 2 },
  flittle:      { to: 'espathra',     method: 'EXP', winsNeeded: 2 },
  tinkatink:    { to: 'tinkatuff',    method: 'EXP', winsNeeded: 2 },
  tinkatuff:    { to: 'tinkaton',     method: 'EXP', winsNeeded: 3 },
  wiglett:      { to: 'wugtrio',      method: 'EXP', winsNeeded: 2 },
  finizen:      { to: 'palafin',      method: 'EXP', winsNeeded: 3 },
  varoom:       { to: 'revavroom',    method: 'EXP', winsNeeded: 2 },
  glimmet:      { to: 'glimmora',     method: 'EXP', winsNeeded: 2 },
  greavard:     { to: 'houndstone',   method: 'EXP', winsNeeded: 2 },
  cetoddle:     { to: 'cetitan',      method: 'EVOITEM', stone: 'ICE',     stoneLabel: 'ICE STONE' },
  frigibax:     { to: 'arctibax',     method: 'EXP', winsNeeded: 2 },
  arctibax:     { to: 'baxcalibur',   method: 'EXP', winsNeeded: 3 },
  gimmighoul: [
    { to: 'gholdengo', method: 'EVOITEM', stone: 'COIN', stoneLabel: 'GIMMIGHOUL COIN' }
  ],
  poltchageist: [
    { to: 'sinistcha', method: 'EVOITEM', stone: 'MATCHA_CUP', stoneLabel: 'UNREMARKABLE CUP' }
  ]
};

function getEvolutionOptionsForSpecies(speciesId) {
  if (!speciesId || !EVOLUTION_CHAINS[speciesId]) return [];
  const raw = EVOLUTION_CHAINS[speciesId];
  return Array.isArray(raw) ? raw : [raw];
}

function getExpEvolutionRequirement(speciesId) {
  const opts = getEvolutionOptionsForSpecies(speciesId);
  return opts.find(o => o.method === 'EXP') || null;
}

function getEvoStatusText(mon) {
  if (!mon) return 'MAX EVO';
  const opts = getEvolutionOptionsForSpecies(mon.id);
  if (opts.length === 0) return 'MAX EVO';

  const expOpt = opts.find(o => o.method === 'EXP');
  const stoneOpts = opts.filter(o => o.method === 'EVOITEM');

  if (expOpt && stoneOpts.length > 0) {
    return `EXP ${mon.evoWins || 0}/${expOpt.winsNeeded} OR ${stoneOpts[0].stoneLabel}`;
  }
  if (expOpt) {
    return `EXP ${mon.evoWins || 0}/${expOpt.winsNeeded}`;
  }
  if (stoneOpts.length === 1) {
    return `USE ${stoneOpts[0].stoneLabel}`;
  }
  if (stoneOpts.length > 1) {
    return `USE EVO ITEM (${stoneOpts.length} FORMS)`;
  }
  return 'MAX EVO';
}

function resolveTargetSpeciesId(toField) {
  if (Array.isArray(toField)) {
    return toField[Math.floor(Math.random() * toField.length)];
  }
  return toField;
}

function checkAndTriggerEvolution(playerMon) {
  if (!playerMon) return null;
  const expReq = getExpEvolutionRequirement(playerMon.id);
  if (!expReq) return null;

  const currentWins = playerMon.evoWins || 0;
  if (currentWins >= expReq.winsNeeded) {
    const resolvedTarget = resolveTargetSpeciesId(expReq.to);
    return {
      ready: true,
      req: { ...expReq, to: resolvedTarget }
    };
  }
  return {
    ready: false,
    req: expReq
  };
}

function evolveMonsterInstance(playerMon, targetSpeciesId) {
  const resolvedId = resolveTargetSpeciesId(targetSpeciesId);
  const nextSpecies = (typeof MONSTER_SPECIES !== 'undefined')
    ? MONSTER_SPECIES.find(m => m.id === resolvedId)
    : null;
  if (!nextSpecies) return `${playerMon.name} could not evolve!`;

  const oldName = playerMon.name;
  playerMon.id = nextSpecies.id;
  playerMon.pokedexNo = nextSpecies.pokedexNo;
  playerMon.name = nextSpecies.name;
  playerMon.type = nextSpecies.type;
  playerMon.level = Math.max((playerMon.level || 10) + 4, nextSpecies.level || 16);
  playerMon.baseHp = nextSpecies.baseHp;
  playerMon.maxHp = nextSpecies.baseHp;
  playerMon.hp = nextSpecies.baseHp;
  playerMon.evoWins = 0;

  if (typeof state !== 'undefined' && Array.isArray(state.dex)) {
    const alreadyInDex = state.dex.some(p => p.id === nextSpecies.id && p !== playerMon);
    if (!alreadyInDex && !state.dex.includes(playerMon)) {
      state.dex.push(playerMon);
    }
  }

  if (typeof sfx !== 'undefined' && typeof sfx.grandVictoryFanfare === 'function') {
    sfx.grandVictoryFanfare();
  }
  return `CONGRATULATIONS! Your ${oldName} evolved into ${nextSpecies.name}!`;
}

function tryStoneEvolution(playerMon, stoneItem) {
  if (!playerMon || !stoneItem) return null;
  const opts = getEvolutionOptionsForSpecies(playerMon.id);
  const match = opts.find(o => o.method === 'EVOITEM' && o.stone === stoneItem.stoneType);
  if (!match) return null;
  return evolveMonsterInstance(playerMon, match.to);
}