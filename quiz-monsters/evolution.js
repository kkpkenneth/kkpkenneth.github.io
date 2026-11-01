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
  budew:      { to: 'roselia',    method: 'EXP', winsNeeded: 2 }
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
    return `CONGRATULATIONS! Your ${oldName} evolved into ${newSpecies.name}! (Since you already owned ${newSpecies.name}, this extra evolved form was sent to Professor Oak!)`;
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