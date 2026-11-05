/********************************************************************
 * evolution.js
 * Complete Gen 1, Gen 2, Gen 3 (Hoenn), and All 8 Eeveelution Chains,
 * Random Multi-Target Evolution (Tyrogue, Wurmple) & Stone Evolutions
 ********************************************************************/

const EVOLUTION_CHAINS = {
  // Gen 1-6 Starters
  bulbasaur:  { to: 'ivysaur',    method: 'EXP', winsNeeded: 2 },
  ivysaur:    { to: 'venusaur',   method: 'EXP', winsNeeded: 3 },
  charmander: { to: 'charmeleon', method: 'EXP', winsNeeded: 2 },
  charmeleon: { to: 'charizard',  method: 'EXP', winsNeeded: 3 },
  squirtle:   { to: 'wartortle',  method: 'EXP', winsNeeded: 2 },
  wartortle:  { to: 'blastoise',  method: 'EXP', winsNeeded: 3 },
  chikorita:  { to: 'bayleef',    method: 'EXP', winsNeeded: 2 },
  bayleef:    { to: 'meganium',   method: 'EXP', winsNeeded: 3 },
  cyndaquil:  { to: 'quilava',    method: 'EXP', winsNeeded: 2 },
  quilava:    { to: 'typhlosion', method: 'EXP', winsNeeded: 3 },
  totodile:   { to: 'croconaw',   method: 'EXP', winsNeeded: 2 },
  croconaw:   { to: 'feraligatr', method: 'EXP', winsNeeded: 3 },
  treecko:    { to: 'grovyle',    method: 'EXP', winsNeeded: 2 },
  grovyle:    { to: 'sceptile',   method: 'EXP', winsNeeded: 3 },
  torchic:    { to: 'combusken',  method: 'EXP', winsNeeded: 2 },
  combusken:  { to: 'blaziken',   method: 'EXP', winsNeeded: 3 },
  mudkip:     { to: 'marshtomp',  method: 'EXP', winsNeeded: 2 },
  marshtomp:  { to: 'swampert',   method: 'EXP', winsNeeded: 3 },
  turtwig:    { to: 'grotle',     method: 'EXP', winsNeeded: 2 },
  grotle:     { to: 'torterra',   method: 'EXP', winsNeeded: 3 },
  chimchar:   { to: 'monferno',   method: 'EXP', winsNeeded: 2 },
  monferno:   { to: 'infernape',  method: 'EXP', winsNeeded: 3 },
  piplup:     { to: 'prinplup',   method: 'EXP', winsNeeded: 2 },
  prinplup:   { to: 'empoleon',   method: 'EXP', winsNeeded: 3 },
  snivy:      { to: 'servine',    method: 'EXP', winsNeeded: 2 },
  servine:    { to: 'serperior',  method: 'EXP', winsNeeded: 3 },
  tepig:      { to: 'pignite',    method: 'EXP', winsNeeded: 2 },
  pignite:    { to: 'emboar',     method: 'EXP', winsNeeded: 3 },
  oshawott:   { to: 'dewott',     method: 'EXP', winsNeeded: 2 },
  dewott:     { to: 'samurott',   method: 'EXP', winsNeeded: 3 },
  chespin:    { to: 'quilladin',  method: 'EXP', winsNeeded: 2 },
  quilladin:  { to: 'chesnaught', method: 'EXP', winsNeeded: 3 },
  fennekin:   { to: 'braixen',    method: 'EXP', winsNeeded: 2 },
  braixen:    { to: 'delphox',    method: 'EXP', winsNeeded: 3 },
  froakie:    { to: 'frogadier',  method: 'EXP', winsNeeded: 2 },
  frogadier:  { to: 'greninja',   method: 'EXP', winsNeeded: 3 },

  // Gen 1 Lines
  caterpie:   { to: 'metapod',    method: 'EXP', winsNeeded: 1 },
  metapod:    { to: 'butterfree', method: 'EXP', winsNeeded: 2 },
  weedle:     { to: 'kakuna',     method: 'EXP', winsNeeded: 1 },
  kakuna:     { to: 'beedrill',   method: 'EXP', winsNeeded: 2 },
  pidgey:     { to: 'pidgeotto',  method: 'EXP', winsNeeded: 2 },
  pidgeotto:  { to: 'pidgeot',    method: 'EXP', winsNeeded: 3 },
  rattata:    { to: 'raticate',   method: 'EXP', winsNeeded: 2 },
  spearow:    { to: 'fearow',     method: 'EXP', winsNeeded: 2 },
  ekans:      { to: 'arbok',      method: 'EXP', winsNeeded: 2 },
  pikachu:    { to: 'raichu',     method: 'STONE', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  sandshrew:  { to: 'sandslash',  method: 'EXP', winsNeeded: 2 },
  nidoran_f:  { to: 'nidorina',   method: 'EXP', winsNeeded: 2 },
  nidorina:   { to: 'nidoqueen',  method: 'STONE', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  nidoran_m:  { to: 'nidorino',   method: 'EXP', winsNeeded: 2 },
  nidorino:   { to: 'nidoking',   method: 'STONE', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  clefairy:   { to: 'clefable',   method: 'STONE', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  vulpix:     { to: 'ninetales',  method: 'STONE', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
  jigglypuff: { to: 'wigglytuff', method: 'STONE', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  zubat:      { to: 'golbat',     method: 'EXP', winsNeeded: 2 },
  golbat:     { to: 'crobat',     method: 'EXP', winsNeeded: 3 },
  oddish:     { to: 'gloom',      method: 'EXP', winsNeeded: 2 },
  gloom: [
    { to: 'vileplume', method: 'STONE', stone: 'LEAF', stoneLabel: 'LEAF STONE' },
    { to: 'bellossom', method: 'STONE', stone: 'SUN',  stoneLabel: 'SUN STONE' }
  ],
  paras:      { to: 'parasect',   method: 'EXP', winsNeeded: 2 },
  venonat:    { to: 'venomoth',   method: 'EXP', winsNeeded: 2 },
  diglett:    { to: 'dugtrio',    method: 'EXP', winsNeeded: 2 },
  meowth:     { to: 'persian',    method: 'EXP', winsNeeded: 2 },
  psyduck:    { to: 'golduck',    method: 'EXP', winsNeeded: 3 },
  mankey:     { to: 'primeape',   method: 'EXP', winsNeeded: 2 },
  growlithe:  { to: 'arcanine',   method: 'STONE', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
  poliwag:    { to: 'poliwhirl',  method: 'EXP', winsNeeded: 2 },
  poliwhirl: [
    { to: 'poliwrath', method: 'STONE', stone: 'WATER', stoneLabel: 'WATER STONE' },
    { to: 'politoed',  method: 'STONE', stone: 'KINGS', stoneLabel: 'KINGS ROCK' }
  ],
  abra:       { to: 'kadabra',    method: 'EXP', winsNeeded: 2 },
  kadabra:    { to: 'alakazam',   method: 'EXP', winsNeeded: 3 },
  machop:     { to: 'machoke',    method: 'EXP', winsNeeded: 2 },
  machoke:    { to: 'machamp',    method: 'EXP', winsNeeded: 3 },
  bellsprout: { to: 'weepinbell', method: 'EXP', winsNeeded: 2 },
  weepinbell: { to: 'victreebel', method: 'STONE', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
  tentacool:  { to: 'tentacruel', method: 'EXP', winsNeeded: 3 },
  geodude:    { to: 'graveler',   method: 'EXP', winsNeeded: 2 },
  graveler:   { to: 'golem',      method: 'EXP', winsNeeded: 3 },
  ponyta:     { to: 'rapidash',   method: 'EXP', winsNeeded: 3 },
  slowpoke: [
    { to: 'slowbro',  method: 'EXP',   winsNeeded: 3 },
    { to: 'slowking', method: 'STONE', stone: 'KINGS', stoneLabel: 'KINGS ROCK' }
  ],
  magnemite:  { to: 'magneton',   method: 'EXP', winsNeeded: 2 },
  doduo:      { to: 'dodrio',     method: 'EXP', winsNeeded: 2 },
  seel:       { to: 'dewgong',    method: 'EXP', winsNeeded: 3 },
  grimer:     { to: 'muk',        method: 'EXP', winsNeeded: 3 },
  shellder:   { to: 'cloyster',   method: 'STONE', stone: 'WATER',   stoneLabel: 'WATER STONE' },
  gastly:     { to: 'haunter',    method: 'EXP', winsNeeded: 2 },
  haunter:    { to: 'gengar',     method: 'EXP', winsNeeded: 3 },
  onix:       { to: 'steelix',    method: 'STONE', stone: 'METAL',   stoneLabel: 'METAL COAT' },
  drowzee:    { to: 'hypno',      method: 'EXP', winsNeeded: 3 },
  krabby:     { to: 'kingler',    method: 'EXP', winsNeeded: 3 },
  voltorb:    { to: 'electrode',  method: 'EXP', winsNeeded: 2 },
  exeggcute:  { to: 'exeggutor',  method: 'STONE', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
  cubone:     { to: 'marowak',    method: 'EXP', winsNeeded: 3 },
  koffing:    { to: 'weezing',    method: 'EXP', winsNeeded: 3 },
  rhyhorn:    { to: 'rhydon',     method: 'EXP', winsNeeded: 3 },
  chansey:    { to: 'blissey',    method: 'EXP', winsNeeded: 3 },
  horsea:     { to: 'seadra',     method: 'EXP', winsNeeded: 2 },
  seadra:     { to: 'kingdra',    method: 'STONE', stone: 'DRAGON',  stoneLabel: 'DRAGON SCALE' },
  goldeen:    { to: 'seaking',    method: 'EXP', winsNeeded: 2 },
  staryu:     { to: 'starmie',    method: 'STONE', stone: 'WATER',   stoneLabel: 'WATER STONE' },
  scyther:    { to: 'scizor',     method: 'STONE', stone: 'METAL',   stoneLabel: 'METAL COAT' },
  magikarp:   { to: 'gyarados',   method: 'EXP', winsNeeded: 3 },
  eevee: [
    { to: 'vaporeon', method: 'STONE', stone: 'WATER',   stoneLabel: 'WATER STONE' },
    { to: 'jolteon',  method: 'STONE', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
    { to: 'flareon',  method: 'STONE', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
    { to: 'espeon',   method: 'STONE', stone: 'SUN',     stoneLabel: 'SUN STONE' },
    { to: 'umbreon',  method: 'STONE', stone: 'MOON',    stoneLabel: 'MOON STONE' },
    { to: 'leafeon',  method: 'STONE', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
    { to: 'glaceon',  method: 'STONE', stone: 'ICE',     stoneLabel: 'ICE STONE' },
    { to: 'sylveon',  method: 'STONE', stone: 'SHINY',   stoneLabel: 'SHINY STONE' }
  ],
  porygon:    { to: 'porygon2',   method: 'STONE', stone: 'UPGRADE', stoneLabel: 'UP-GRADE' },
  omanyte:    { to: 'omastar',    method: 'EXP', winsNeeded: 3 },
  kabuto:     { to: 'kabutops',   method: 'EXP', winsNeeded: 3 },
  dratini:    { to: 'dragonair',  method: 'EXP', winsNeeded: 2 },
  dragonair:  { to: 'dragonite',  method: 'EXP', winsNeeded: 3 },

  // Gen 2 Johto Lines
  sentret:    { to: 'furret',     method: 'EXP', winsNeeded: 2 },
  hoothoot:   { to: 'noctowl',    method: 'EXP', winsNeeded: 2 },
  ledyba:     { to: 'ledian',     method: 'EXP', winsNeeded: 2 },
  spinarak:   { to: 'ariados',    method: 'EXP', winsNeeded: 2 },
  chinchou:   { to: 'lanturn',    method: 'EXP', winsNeeded: 2 },
  pichu:      { to: 'pikachu',    method: 'EXP', winsNeeded: 2 },
  cleffa:     { to: 'clefairy',   method: 'EXP', winsNeeded: 2 },
  igglybuff:  { to: 'jigglypuff', method: 'EXP', winsNeeded: 2 },
  togepi:     { to: 'togetic',    method: 'EXP', winsNeeded: 2 },
  natu:       { to: 'xatu',       method: 'EXP', winsNeeded: 2 },
  mareep:     { to: 'flaaffy',    method: 'EXP', winsNeeded: 2 },
  flaaffy:    { to: 'ampharos',   method: 'EXP', winsNeeded: 3 },
  marill:     { to: 'azumarill',  method: 'EXP', winsNeeded: 2 },
  hoppip:     { to: 'skiploom',   method: 'EXP', winsNeeded: 2 },
  skiploom:   { to: 'jumpluff',   method: 'EXP', winsNeeded: 3 },
  sunkern:    { to: 'sunflora',   method: 'STONE', stone: 'SUN',     stoneLabel: 'SUN STONE' },
  wooper:     { to: 'quagsire',   method: 'EXP', winsNeeded: 2 },
  pineco:     { to: 'forretress', method: 'EXP', winsNeeded: 2 },
  snubbull:   { to: 'granbull',   method: 'EXP', winsNeeded: 2 },
  teddiursa:  { to: 'ursaring',   method: 'EXP', winsNeeded: 3 },
  slugma:     { to: 'magcargo',   method: 'EXP', winsNeeded: 2 },
  swinub:     { to: 'piloswine',  method: 'EXP', winsNeeded: 2 },
  remoraid:   { to: 'octillery',  method: 'EXP', winsNeeded: 2 },
  houndour:   { to: 'houndoom',   method: 'EXP', winsNeeded: 2 },
  phanpy:     { to: 'donphan',    method: 'EXP', winsNeeded: 2 },
  tyrogue:    { to: ['hitmonlee', 'hitmonchan', 'hitmontop'], method: 'EXP', winsNeeded: 2 },
  smoochum:   { to: 'jynx',       method: 'EXP', winsNeeded: 2 },
  elekid:     { to: 'electabuzz', method: 'EXP', winsNeeded: 2 },
  magby:      { to: 'magmar',     method: 'EXP', winsNeeded: 2 },
  larvitar:   { to: 'pupitar',    method: 'EXP', winsNeeded: 2 },
  pupitar:    { to: 'tyranitar',  method: 'EXP', winsNeeded: 3 },

  // Gen 3 Hoenn Lines
  poochyena:  { to: 'mightyena',  method: 'EXP', winsNeeded: 2 },
  zigZagoon:  { to: 'linoone',    method: 'EXP', winsNeeded: 2 },
  zigzagoon:  { to: 'linoone',    method: 'EXP', winsNeeded: 2 },
  wurmple:    { to: ['silcoon', 'cascoon'], method: 'EXP', winsNeeded: 1 },
  silcoon:    { to: 'beautifly',  method: 'EXP', winsNeeded: 2 },
  cascoon:    { to: 'dustox',     method: 'EXP', winsNeeded: 2 },
  lotad:      { to: 'lombre',     method: 'EXP', winsNeeded: 2 },
  lombre:     { to: 'ludicolo',   method: 'STONE', stone: 'WATER',   stoneLabel: 'WATER STONE' },
  seedot:     { to: 'nuzleaf',    method: 'EXP', winsNeeded: 2 },
  nuzleaf:    { to: 'shiftry',    method: 'STONE', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
  taillow:    { to: 'swellow',    method: 'EXP', winsNeeded: 2 },
  wingull:    { to: 'pelipper',   method: 'EXP', winsNeeded: 2 },
  ralts:      { to: 'kirlia',     method: 'EXP', winsNeeded: 2 },
  kirlia:     { to: 'gardevoir',  method: 'EXP', winsNeeded: 3 },
  surskit:    { to: 'masquerain', method: 'EXP', winsNeeded: 2 },
  shroomish:  { to: 'breloom',    method: 'EXP', winsNeeded: 2 },
  slakoth:    { to: 'vigoroth',   method: 'EXP', winsNeeded: 2 },
  vigoroth:   { to: 'slaking',    method: 'EXP', winsNeeded: 3 },
  nincada:    { to: 'ninjask',    method: 'EXP', winsNeeded: 2 },
  whismur:    { to: 'loudred',    method: 'EXP', winsNeeded: 2 },
  loudred:    { to: 'exploud',    method: 'EXP', winsNeeded: 3 },
  makuhita:   { to: 'hariyama',   method: 'EXP', winsNeeded: 2 },
  azurill:    { to: 'marill',     method: 'EXP', winsNeeded: 2 },
  skitty:     { to: 'delcatty',   method: 'STONE', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  aron:       { to: 'lairon',     method: 'EXP', winsNeeded: 2 },
  lairon:     { to: 'aggron',     method: 'EXP', winsNeeded: 3 },
  meditite:   { to: 'medicham',   method: 'EXP', winsNeeded: 2 },
  electrike:  { to: 'manectric',  method: 'EXP', winsNeeded: 2 },
  gulpin:     { to: 'swalot',     method: 'EXP', winsNeeded: 2 },
  carvanha:   { to: 'sharpedo',   method: 'EXP', winsNeeded: 2 },
  wailmer:    { to: 'wailord',    method: 'EXP', winsNeeded: 3 },
  numel:      { to: 'camerupt',   method: 'EXP', winsNeeded: 2 },
  spoink:     { to: 'grumpig',    method: 'EXP', winsNeeded: 2 },
  trapinch:   { to: 'vibrava',    method: 'EXP', winsNeeded: 2 },
  vibrava:    { to: 'flygon',     method: 'EXP', winsNeeded: 3 },
  cacnea:     { to: 'cacturne',   method: 'EXP', winsNeeded: 2 },
  swablu:     { to: 'altaria',    method: 'EXP', winsNeeded: 3 },
  barboach:   { to: 'whiscash',   method: 'EXP', winsNeeded: 2 },
  corphish:   { to: 'crawdaunt',  method: 'EXP', winsNeeded: 2 },
  baltoy:     { to: 'claydol',    method: 'EXP', winsNeeded: 2 },
  lileep:     { to: 'cradily',    method: 'EXP', winsNeeded: 3 },
  anorith:    { to: 'armaldo',    method: 'EXP', winsNeeded: 3 },
  feebas:     { to: 'milotic',    method: 'STONE', stone: 'SHINY',   stoneLabel: 'SHINY STONE' },
  shuppet:    { to: 'banette',    method: 'EXP', winsNeeded: 2 },
  duskull:    { to: 'dusclops',   method: 'EXP', winsNeeded: 2 },
  wynaut:     { to: 'wobbuffet',  method: 'EXP', winsNeeded: 2 },
  snorunt:    { to: 'glalie',     method: 'EXP', winsNeeded: 2 },
  spheal:     { to: 'sealeo',     method: 'EXP', winsNeeded: 2 },
  sealeo:     { to: 'walrein',    method: 'EXP', winsNeeded: 3 },
  clamperl: [
    { to: 'huntail',  method: 'STONE', stone: 'TOOTH', stoneLabel: 'DEEP SEA TOOTH' },
    { to: 'gorebyss', method: 'STONE', stone: 'SCALE', stoneLabel: 'DEEP SEA SCALE' }
  ],
  bagon:      { to: 'shelgon',    method: 'EXP', winsNeeded: 2 },
  shelgon:    { to: 'salamence',  method: 'EXP', winsNeeded: 3 },
  beldum:     { to: 'metang',     method: 'EXP', winsNeeded: 2 },
  metang:     { to: 'metagross',  method: 'EXP', winsNeeded: 3 },
  budew:      { to: 'roselia',    method: 'EXP', winsNeeded: 2 },

  starly:     { to: 'staravia',   method: 'EXP',   winsNeeded: 2 },
  staravia:   { to: 'staraptor',  method: 'EXP',   winsNeeded: 3 },
  bidoof:     { to: 'bibarel',    method: 'EXP',   winsNeeded: 2 },
  kricketot:  { to: 'kricketune', method: 'EXP',   winsNeeded: 2 },
  shinx:      { to: 'luxio',      method: 'EXP',   winsNeeded: 2 },
  luxio:      { to: 'luxray',     method: 'EXP',   winsNeeded: 3 },
  roselia:    { to: 'roserade',   method: 'STONE', stone: 'SHINY',   stoneLabel: 'SHINY STONE' },
  cranidos:   { to: 'rampardos',  method: 'EXP',   winsNeeded: 3 },
  shieldon:   { to: 'bastiodon',  method: 'EXP',   winsNeeded: 3 },
  burmy:      { to: ['wormadam', 'mothim'], method: 'EXP', winsNeeded: 2 },
  combee:     { to: 'vespiquen',  method: 'EXP',   winsNeeded: 2 },
  buizel:     { to: 'floatzel',   method: 'EXP',   winsNeeded: 2 },
  cherubi:    { to: 'cherrim',    method: 'EXP',   winsNeeded: 2 },
  shellos:    { to: 'gastrodon',  method: 'EXP',   winsNeeded: 2 },
  aipom:      { to: 'ambipom',    method: 'EXP',   winsNeeded: 2 },
  drifloon:   { to: 'drifblim',   method: 'EXP',   winsNeeded: 2 },
  buneary:    { to: 'lopunny',    method: 'EXP',   winsNeeded: 2 },
  misdreavus: { to: 'mismagius',  method: 'STONE', stone: 'DUSK',    stoneLabel: 'DUSK STONE' },
  murkrow:    { to: 'honchkrow',  method: 'STONE', stone: 'DUSK',    stoneLabel: 'DUSK STONE' },
  glameow:    { to: 'purugly',    method: 'EXP',   winsNeeded: 2 },
  chingling:  { to: 'chimecho',   method: 'EXP',   winsNeeded: 2 },
  stunky:     { to: 'skuntank',   method: 'EXP',   winsNeeded: 2 },
  bronzor:    { to: 'bronzong',   method: 'EXP',   winsNeeded: 2 },
  bonsly:     { to: 'sudowoodo',  method: 'EXP',   winsNeeded: 2 },
  mime_jr:    { to: 'mr_mime',    method: 'EXP',   winsNeeded: 2 },
  happiny:    { to: 'chansey',    method: 'EXP',   winsNeeded: 2 },
  gible:      { to: 'gabite',     method: 'EXP',   winsNeeded: 2 },
  gabite:     { to: 'garchomp',   method: 'EXP',   winsNeeded: 3 },
  munchlax:   { to: 'snorlax',    method: 'EXP',   winsNeeded: 2 },
  riolu:      { to: 'lucario',    method: 'EXP',   winsNeeded: 2 },
  hippopotas: { to: 'hippowdon',  method: 'EXP',   winsNeeded: 2 },
  skorupi:    { to: 'drapion',    method: 'EXP',   winsNeeded: 2 },
  croagunk:   { to: 'toxicroak',  method: 'EXP',   winsNeeded: 2 },
  finneon:    { to: 'lumineon',   method: 'EXP',   winsNeeded: 2 },
  mantyke:    { to: 'mantine',    method: 'EXP',   winsNeeded: 2 },
  snover:     { to: 'abomasnow',  method: 'EXP',   winsNeeded: 2 },
  sneasel:    { to: 'weavile',    method: 'STONE', stone: 'ICE',     stoneLabel: 'ICE STONE' },
  magneton:   { to: 'magnezone',  method: 'STONE', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  lickitung:  { to: 'lickilicky', method: 'EXP',   winsNeeded: 3 },
  rhydon:     { to: 'rhyperior',  method: 'STONE', stone: 'METAL',   stoneLabel: 'METAL COAT' },
  tangela:    { to: 'tangrowth',  method: 'EXP',   winsNeeded: 3 },
  electabuzz: { to: 'electivire', method: 'STONE', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  magmar:     { to: 'magmortar',  method: 'STONE', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
  togetic:    { to: 'togekiss',   method: 'STONE', stone: 'SHINY',   stoneLabel: 'SHINY STONE' },
  yanma:      { to: 'yanmega',    method: 'EXP',   winsNeeded: 2 },
  gligar:     { to: 'gliscor',    method: 'STONE', stone: 'DUSK',    stoneLabel: 'DUSK STONE' },
  piloswine:  { to: 'mamoswine',  method: 'EXP',   winsNeeded: 3 },
  porygon2:   { to: 'porygon_z',  method: 'STONE', stone: 'UPGRADE', stoneLabel: 'UP-GRADE' },
  kirlia: [
    { to: 'gardevoir', method: 'EXP',   winsNeeded: 3 },
    { to: 'gallade',   method: 'STONE', stone: 'DAWN', stoneLabel: 'DAWN STONE' }
  ],
  nosepass:   { to: 'probopass',  method: 'STONE', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  dusclops:   { to: 'dusknoir',   method: 'STONE', stone: 'DUSK',    stoneLabel: 'DUSK STONE' },
  snorunt: [
    { to: 'glalie',   method: 'EXP',   winsNeeded: 2 },
    { to: 'froslass', method: 'STONE', stone: 'DAWN', stoneLabel: 'DAWN STONE' }
  ],
  patrat:     { to: 'watchog',    method: 'EXP',   winsNeeded: 2 },
  lillipup:   { to: 'herdier',    method: 'EXP',   winsNeeded: 2 },
  herdier:    { to: 'stoutland',  method: 'EXP',   winsNeeded: 3 },
  purrloin:   { to: 'liepard',    method: 'EXP',   winsNeeded: 2 },
  pansage:    { to: 'simisage',   method: 'STONE', stone: 'LEAF',    stoneLabel: 'LEAF STONE' },
  pansear:    { to: 'simisear',   method: 'STONE', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
  panpour:    { to: 'simipour',   method: 'STONE', stone: 'WATER',   stoneLabel: 'WATER STONE' },
  munna:      { to: 'musharna',   method: 'STONE', stone: 'MOON',    stoneLabel: 'MOON STONE' },
  pidove:     { to: 'tranquill',  method: 'EXP',   winsNeeded: 2 },
  tranquill:  { to: 'unfezant',   method: 'EXP',   winsNeeded: 3 },
  blitzle:    { to: 'zebstrika',  method: 'EXP',   winsNeeded: 2 },
  roggenrola: { to: 'boldore',    method: 'EXP',   winsNeeded: 2 },
  boldore:    { to: 'gigalith',   method: 'EXP',   winsNeeded: 3 },
  woobat:     { to: 'swoobat',    method: 'EXP',   winsNeeded: 2 },
  drilbur:    { to: 'excadrill',  method: 'EXP',   winsNeeded: 2 },
  timburr:    { to: 'gurdurr',    method: 'EXP',   winsNeeded: 2 },
  gurdurr:    { to: 'conkeldurr', method: 'EXP',   winsNeeded: 3 },
  tympole:    { to: 'palpitoad',  method: 'EXP',   winsNeeded: 2 },
  palpitoad:  { to: 'seismitoad', method: 'EXP',   winsNeeded: 3 },
  sewaddle:   { to: 'swadloon',   method: 'EXP',   winsNeeded: 2 },
  swadloon:   { to: 'leavanny',   method: 'EXP',   winsNeeded: 3 },
  venipede:   { to: 'whirlipede', method: 'EXP',   winsNeeded: 2 },
  whirlipede: { to: 'scolipede',  method: 'EXP',   winsNeeded: 3 },
  cottonee:   { to: 'whimsicott', method: 'STONE', stone: 'SUN',     stoneLabel: 'SUN STONE' },
  petilil:    { to: 'lilligant',  method: 'STONE', stone: 'SUN',     stoneLabel: 'SUN STONE' },
  sandile:    { to: 'krokorok',   method: 'EXP',   winsNeeded: 2 },
  krokorok:   { to: 'krookodile', method: 'EXP',   winsNeeded: 3 },
  darumaka:   { to: 'darmanitan', method: 'EXP',   winsNeeded: 2 },
  dwebble:    { to: 'crustle',    method: 'EXP',   winsNeeded: 2 },
  scraggy:    { to: 'scrafty',    method: 'EXP',   winsNeeded: 2 },
  yamask:     { to: 'cofagrigus', method: 'EXP',   winsNeeded: 2 },
  tirtouga:   { to: 'carracosta', method: 'EXP',   winsNeeded: 2 },
  archen:     { to: 'archeops',   method: 'EXP',   winsNeeded: 2 },
  trubbish:   { to: 'garbodor',   method: 'EXP',   winsNeeded: 2 },
  zorua:      { to: 'zoroark',    method: 'EXP',   winsNeeded: 2 },
  minccino:   { to: 'cinccino',   method: 'STONE', stone: 'SHINY',   stoneLabel: 'SHINY STONE' },
  gothita:    { to: 'gothorita',  method: 'EXP',   winsNeeded: 2 },
  gothorita:  { to: 'gothitelle', method: 'EXP',   winsNeeded: 3 },
  solosis:    { to: 'duosion',    method: 'EXP',   winsNeeded: 2 },
  duosion:    { to: 'reuniclus',  method: 'EXP',   winsNeeded: 3 },
  ducklett:   { to: 'swanna',     method: 'EXP',   winsNeeded: 2 },
  vanillite:  { to: 'vanillish',  method: 'EXP',   winsNeeded: 2 },
  vanillish:  { to: 'vanilluxe',  method: 'EXP',   winsNeeded: 3 },
  deerling:   { to: 'sawsbuck',   method: 'EXP',   winsNeeded: 2 },
  karrablast: { to: 'escavalier', method: 'EXP',   winsNeeded: 2 },
  foongus:    { to: 'amoonguss',  method: 'EXP',   winsNeeded: 2 },
  frillish:   { to: 'jellicent',  method: 'EXP',   winsNeeded: 2 },
  joltik:     { to: 'galvantula', method: 'EXP',   winsNeeded: 2 },
  ferroseed:  { to: 'ferrothorn', method: 'EXP',   winsNeeded: 2 },
  klink:      { to: 'klang',      method: 'EXP',   winsNeeded: 2 },
  klang:      { to: 'klinklang',  method: 'EXP',   winsNeeded: 3 },
  tynamo:     { to: 'eelektrik',  method: 'EXP',   winsNeeded: 2 },
  eelektrik:  { to: 'eelektross', method: 'STONE', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  elgyem:     { to: 'beheeyem',   method: 'EXP',   winsNeeded: 2 },
  litwick:    { to: 'lampent',    method: 'EXP',   winsNeeded: 2 },
  lampent:    { to: 'chandelure', method: 'STONE', stone: 'DUSK',    stoneLabel: 'DUSK STONE' },
  axew:       { to: 'fraxure',    method: 'EXP',   winsNeeded: 2 },
  fraxure:    { to: 'haxorus',    method: 'EXP',   winsNeeded: 3 },
  cubchoo:    { to: 'beartic',    method: 'EXP',   winsNeeded: 2 },
  shelmet:    { to: 'accelgor',   method: 'EXP',   winsNeeded: 2 },
  mienfoo:    { to: 'mienshao',   method: 'EXP',   winsNeeded: 2 },
  golett:     { to: 'golurk',     method: 'EXP',   winsNeeded: 2 },
  pawniard:   { to: 'bisharp',    method: 'EXP',   winsNeeded: 2 },
  rufflet:    { to: 'braviary',   method: 'EXP',   winsNeeded: 2 },
  vullaby:    { to: 'mandibuzz',  method: 'EXP',   winsNeeded: 2 },
  deino:      { to: 'zweilous',   method: 'EXP',   winsNeeded: 2 },
  zweilous:   { to: 'hydreigon',  method: 'EXP',   winsNeeded: 3 },
  larvesta:   { to: 'volcarona',  method: 'EXP',   winsNeeded: 3 },
  rowlet:     { to: 'dartrix',     method: 'EXP', winsNeeded: 2 },
  dartrix:    { to: 'decidueye',   method: 'EXP', winsNeeded: 3 },
  litten:     { to: 'torracat',    method: 'EXP', winsNeeded: 2 },
  torracat:   { to: 'incineroar',  method: 'EXP', winsNeeded: 3 },
  popplio:    { to: 'brionne',     method: 'EXP', winsNeeded: 2 },
  brionne:    { to: 'primarina',   method: 'EXP', winsNeeded: 3 },
  pikipek:    { to: 'trumbeak',    method: 'EXP', winsNeeded: 2 },
  trumbeak:   { to: 'toucannon',   method: 'EXP', winsNeeded: 3 },
  yungoos:    { to: 'gumshoos',    method: 'EXP', winsNeeded: 2 },
  grubbin:    { to: 'charjabug',   method: 'EXP', winsNeeded: 2 },
  charjabug:  { to: 'vikavolt',    method: 'STONE', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  crabrawler: { to: 'crabominable',method: 'STONE', stone: 'ICE',     stoneLabel: 'ICE STONE' },
  cutiefly:   { to: 'ribombee',    method: 'EXP', winsNeeded: 2 },
  rockruff:   { to: 'lycanroc',    method: 'EXP', winsNeeded: 2 },
  mareanie:   { to: 'toxapex',     method: 'EXP', winsNeeded: 2 },
  mudbray:    { to: 'mudsdale',    method: 'EXP', winsNeeded: 2 },
  dewpider:   { to: 'araquanid',   method: 'EXP', winsNeeded: 2 },
  fomantis:   { to: 'lurantis',    method: 'EXP', winsNeeded: 2 },
  morelull:   { to: 'shiinotic',   method: 'EXP', winsNeeded: 2 },
  salandit:   { to: 'salazzle',    method: 'EXP', winsNeeded: 2 },
  stufful:    { to: 'bewear',      method: 'EXP', winsNeeded: 2 },
  bounsweet:  { to: 'steenee',     method: 'EXP', winsNeeded: 2 },
  steenee:    { to: 'tsareena',    method: 'EXP', winsNeeded: 3 },
  wimpod:     { to: 'golisopod',   method: 'EXP', winsNeeded: 3 },
  sandygast:  { to: 'palossand',   method: 'EXP', winsNeeded: 2 },
  type_null:  { to: 'silvally',    method: 'EXP', winsNeeded: 3 },
  jangmo_o:   { to: 'hakamo_o',    method: 'EXP', winsNeeded: 2 },
  hakamo_o:   { to: 'kommo_o',     method: 'EXP', winsNeeded: 3 },
  cosmog:     { to: 'cosmoem',     method: 'EXP', winsNeeded: 2 },
  cosmoem:    { to: ['solgaleo', 'lunala'], method: 'EXP', winsNeeded: 3 },
  poipole:    { to: 'naganadel',   method: 'EXP', winsNeeded: 3 },
  meltan:     { to: 'melmetal',    method: 'STONE', stone: 'METAL', stoneLabel: 'METAL COAT' },
  grookey:    { to: 'thwackey',    method: 'EXP', winsNeeded: 2 },
  thwackey:   { to: 'rillaboom',   method: 'EXP', winsNeeded: 3 },
  scorbunny:  { to: 'raboot',      method: 'EXP', winsNeeded: 2 },
  raboot:     { to: 'cinderace',   method: 'EXP', winsNeeded: 3 },
  sobble:     { to: 'drizzile',    method: 'EXP', winsNeeded: 2 },
  drizzile:   { to: 'inteleon',    method: 'EXP', winsNeeded: 3 },
  skwovet:    { to: 'greedent',    method: 'EXP', winsNeeded: 2 },
  rookidee:   { to: 'corvisquire', method: 'EXP', winsNeeded: 2 },
  corvisquire:{ to: 'corviknight', method: 'EXP', winsNeeded: 3 },
  blipbug:    { to: 'dottler',     method: 'EXP', winsNeeded: 2 },
  dottler:    { to: 'orbeetle',    method: 'EXP', winsNeeded: 3 },
  nickit:     { to: 'thievul',     method: 'EXP', winsNeeded: 2 },
  gossifleur: { to: 'eldegoss',    method: 'EXP', winsNeeded: 2 },
  wooloo:     { to: 'dubwool',     method: 'EXP', winsNeeded: 2 },
  chewtle:    { to: 'drednaw',     method: 'EXP', winsNeeded: 2 },
  yamper:     { to: 'boltund',     method: 'EXP', winsNeeded: 2 },
  rolycoly:   { to: 'carkol',      method: 'EXP', winsNeeded: 2 },
  carkol:     { to: 'coalossal',   method: 'EXP', winsNeeded: 3 },
  applin:     { to: ['flapple', 'appletun', 'dipplin'], method: 'STONE', stone: 'LEAF', stoneLabel: 'LEAF STONE' },
  dipplin:    { to: 'hydrapple',   method: 'EXP', winsNeeded: 3 },
  silicobra:  { to: 'sandaconda',  method: 'EXP', winsNeeded: 2 },
  arrokuda:   { to: 'barraskewda', method: 'EXP', winsNeeded: 2 },
  toxel:      { to: 'toxtricity',  method: 'EXP', winsNeeded: 2 },
  sizzlipede: { to: 'centiskorch', method: 'EXP', winsNeeded: 2 },
  clobbopus:  { to: 'grapploct',   method: 'EXP', winsNeeded: 2 },
  sinistea:   { to: 'polteageist', method: 'STONE', stone: 'DUSK', stoneLabel: 'DUSK STONE' },
  hatenna:    { to: 'hattrem',     method: 'EXP', winsNeeded: 2 },
  hattrem:    { to: 'hatterene',   method: 'EXP', winsNeeded: 3 },
  impidimp:   { to: 'morgrem',     method: 'EXP', winsNeeded: 2 },
  morgrem:    { to: 'grimmsnarl',  method: 'EXP', winsNeeded: 3 },
  milcery:    { to: 'alcremie',    method: 'STONE', stone: 'SHINY', stoneLabel: 'SHINY STONE' },
  snom:       { to: 'frosmoth',    method: 'EXP', winsNeeded: 2 },
  cufant:     { to: 'copperajah',  method: 'EXP', winsNeeded: 2 },
  duraludon:  { to: 'archaludon',  method: 'STONE', stone: 'METAL', stoneLabel: 'METAL COAT' },
  dreepy:     { to: 'drakloak',    method: 'EXP', winsNeeded: 2 },
  drakloak:   { to: 'dragapult',   method: 'EXP', winsNeeded: 3 },
  kubfu:      { to: 'urshifu',     method: 'EXP', winsNeeded: 3 },
  sprigatito: { to: 'floragato',   method: 'EXP', winsNeeded: 2 },
  floragato:  { to: 'meowscarada', method: 'EXP', winsNeeded: 3 },
  fuecoco:    { to: 'crocalor',    method: 'EXP', winsNeeded: 2 },
  crocalor:   { to: 'skeledirge',  method: 'EXP', winsNeeded: 3 },
  quaxly:     { to: 'quaxwell',    method: 'EXP', winsNeeded: 2 },
  quaxwell:   { to: 'quaquaval',   method: 'EXP', winsNeeded: 3 },
  lechonk:    { to: 'oinkologne',  method: 'EXP', winsNeeded: 2 },
  tarountula: { to: 'spidops',     method: 'EXP', winsNeeded: 2 },
  nymble:     { to: 'lokix',       method: 'EXP', winsNeeded: 2 },
  pawmi:      { to: 'pawmo',       method: 'EXP', winsNeeded: 2 },
  pawmo:      { to: 'pawmot',      method: 'EXP', winsNeeded: 3 },
  tandemaus:  { to: 'maushold',    method: 'EXP', winsNeeded: 2 },
  fidough:    { to: 'dachsbun',    method: 'EXP', winsNeeded: 2 },
  smoliv:     { to: 'dolliv',      method: 'EXP', winsNeeded: 2 },
  dolliv:     { to: 'arboliva',    method: 'EXP', winsNeeded: 3 },
  nacli:      { to: 'naclstack',   method: 'EXP', winsNeeded: 2 },
  naclstack:  { to: 'garganacl',   method: 'EXP', winsNeeded: 3 },
  charcadet:  { to: ['armarouge', 'ceruledge'], method: 'STONE', stone: 'FIRE', stoneLabel: 'FIRE STONE' },
  tadbulb:    { to: 'bellibolt',   method: 'STONE', stone: 'THUNDER', stoneLabel: 'THUNDER STONE' },
  wattrel:    { to: 'kilowattrel', method: 'EXP', winsNeeded: 2 },
  maschiff:   { to: 'mabosstiff',  method: 'EXP', winsNeeded: 2 },
  shroodle:   { to: 'grafaiai',    method: 'EXP', winsNeeded: 2 },
  bramblin:   { to: 'brambleghast',method: 'EXP', winsNeeded: 2 },
  toedscool:  { to: 'toedscruel',  method: 'EXP', winsNeeded: 2 },
  capsakid:   { to: 'scovillain',  method: 'STONE', stone: 'FIRE', stoneLabel: 'FIRE STONE' },
  rellor:     { to: 'rabsca',      method: 'EXP', winsNeeded: 2 },
  flittle:    { to: 'espathra',    method: 'EXP', winsNeeded: 2 },
  tinkatink:  { to: 'tinkatuff',   method: 'EXP', winsNeeded: 2 },
  tinkatuff:  { to: 'tinkaton',    method: 'EXP', winsNeeded: 3 },
  wiglett:    { to: 'wugtrio',     method: 'EXP', winsNeeded: 2 },
  finizen:    { to: 'palafin',     method: 'EXP', winsNeeded: 3 },
  varoom:     { to: 'revavroom',   method: 'EXP', winsNeeded: 2 },
  glimmet:    { to: 'glimmora',    method: 'EXP', winsNeeded: 2 },
  greavard:   { to: 'houndstone',  method: 'EXP', winsNeeded: 2 },
  cetoddle:   { to: 'cetitan',     method: 'STONE', stone: 'ICE', stoneLabel: 'ICE STONE' },
  primeape:   { to: 'annihilape',  method: 'EXP', winsNeeded: 3 },
  girafarig:  { to: 'farigiraf',   method: 'EXP', winsNeeded: 2 },
  dunsparce:  { to: 'dudunsparce', method: 'EXP', winsNeeded: 2 },
  bisharp:    { to: 'kingambit',   method: 'EXP', winsNeeded: 3 },
  frigibax:   { to: 'arctibax',    method: 'EXP', winsNeeded: 2 },
  arctibax:   { to: 'baxcalibur',  method: 'EXP', winsNeeded: 3 },
  gimmighoul: { to: 'gholdengo',   method: 'EXP', winsNeeded: 3 },
  poltchageist:{ to: 'sinistcha',  method: 'STONE', stone: 'DUSK', stoneLabel: 'DUSK STONE' }

};

function getEvolutionRequirement(speciesId) {
  return EVOLUTION_CHAINS[speciesId] || null;
}

function getExpEvolutionRequirement(speciesId) {
  const req = getEvolutionRequirement(speciesId);
  if (!req) return null;
  const list = Array.isArray(req) ? req : [req];
  return list.find(r => r.method === 'EXP') || null;
}

function evolveMonsterInstance(mon, targetSpeciesId) {
  const resolvedId = Array.isArray(targetSpeciesId)
    ? targetSpeciesId[Math.floor(Math.random() * targetSpeciesId.length)]
    : targetSpeciesId;
  const newSpecies = MONSTER_SPECIES.find(m => m.id === resolvedId);
  if (!newSpecies) return null;
  const oldName = mon.name;

  const alreadyOwned = state.dex.some(p => p.id === newSpecies.id);

  mon.id = newSpecies.id;
  mon.pokedexNo = newSpecies.pokedexNo;
  mon.name = newSpecies.name;
  mon.type = newSpecies.type;
  mon.level = Math.max((mon.level || 12) + 4, newSpecies.level || 18);
  mon.maxHp = newSpecies.baseHp || (mon.maxHp + 35);
  mon.hp = mon.maxHp;
  mon.evoWins = 0;

  if (!alreadyOwned) {
    state.dex.push(mon);
  }

  if (typeof sfx !== 'undefined' && typeof sfx.grandVictoryFanfare === 'function') {
    sfx.grandVictoryFanfare();
  }

  if (typeof checkMilestoneUnlocks === 'function') {
    checkMilestoneUnlocks();
  }

  if (alreadyOwned) {
    return `CONGRATULATIONS! Your ${oldName} evolved into ${newSpecies.name}! (Since you already owned ${newSpecies.name}, the extra evolved form was sent to Professor Oak!)`;
  }
  return `CONGRATULATIONS! Your ${oldName} evolved into ${newSpecies.name}!`;
}

function checkAndTriggerEvolution(mon) {
  if (!mon) return null;
  const expReq = getExpEvolutionRequirement(mon.id);
  if (!expReq) return null;
  mon.evoWins = mon.evoWins || 0;
  if (mon.evoWins >= expReq.winsNeeded) {
    return { ready: true, req: expReq };
  }
  return null;
}

function tryStoneEvolution(mon, stoneItem) {
  if (!mon || !stoneItem) return null;
  const req = getEvolutionRequirement(mon.id);
  if (!req) return null;
  const reqList = Array.isArray(req) ? req : [req];
  const matched = reqList.find(r => r.method === 'STONE' && r.stone === stoneItem.stoneType);
  if (matched) {
    return evolveMonsterInstance(mon, matched.to);
  }
  return null;
}

function getEvoStatusText(mon) {
  const req = getEvolutionRequirement(mon.id);
  if (!req) return 'MAX EVO';
  if (Array.isArray(req)) {
    const labels = req.map(r => r.method === 'STONE' ? r.stoneLabel : `EXP ${r.winsNeeded}`).join(' / ');
    return `EVO: ${labels}`;
  }
  if (req.method === 'STONE') return `NEEDS ${req.stoneLabel}`;
  return `EVO BAR: ${Math.min(req.winsNeeded, mon.evoWins || 0)}/${req.winsNeeded}`;
}