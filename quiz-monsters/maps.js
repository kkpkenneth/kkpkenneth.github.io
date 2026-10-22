/********************************************************************
 * maps.js
 * 3x3 Grand World Grid (9 Biomes), 24 Career/Scholar NPCs & Overworld Pokémon
 *
 * GRAND MAP LAYOUT:
 *   [GLACIER (NW)]  <--> [MOUNTAIN (N)] <--> [VOLCANO (NE)]
 *         ^                    ^                   ^
 *         v                    v                   v
 *   [FOREST (W)]    <--> [CENTER HUB]   <--> [DESERT (E)]
 *         ^                    ^                   ^
 *         v                    v                   v
 *   [JUNGLE (SW)]   <--> [BEACH (S)]    <--> [METRO (SE)]
 ********************************************************************/

const MAP_COLS = 28;
const MAP_ROWS = 20;
const TILE_SIZE = 32;

const WORLD_MAPS = {
  // =================================================================
  // 1. CENTER: PALLET RESEARCH HUB
  // =================================================================
  CENTER: {
    id: 'CENTER',
    name: 'PALLET RESEARCH HUB',
    subtitle: 'N: MOUNTAIN • E: DESERT • S: BEACH • W: FOREST',
    theme: { groundA: '#65a30d', groundB: '#6dab14', path: '#d6b37c', grass: '#15803d', grassTip: '#4ade80', tree: '#14532d', treeTop: '#22c55e' },
    encounters: ['pikachu', 'pidgey', 'rattata', 'spearow', 'eevee'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..FFFF..PPPPPPPPPP..FFFF..T",
      "T.GGGGGG.P..HHHH..P.GGGGGG.T",
      "T.GGGGGG.P..HHHH..P.GGGGGG.T",
      "T.GGGGGG.P...DD...P.GGGGGG.T",
      "T.GGGGGG.PPPPPPPPPP.GGGGGG.T",
      "T........P........P........T",
      "T..TTTT..P..FFFF..P..TTTT..T",
      "T........PPPPPPPPPP........T",
      "EPPPPPPPPPPPP..PPPPPPPPPPPPE",
      "EPPPPPPPPPPPP..PPPPPPPPPPPPE",
      "T.GGGGGG.P........P.WWWWWW.T",
      "T........P.FFFFFF.P.BBBBBB.T",
      "T..TTTT..P.FFFFFF.P.WWWWWW.T",
      "T........PPPPPPPPPP........T",
      "T.GGGGGGG....PP....GGGGGGG.T",
      "T.GGGGGGG.PPPPPPPP.GGGGGGG.T",
      "T.GGGGGGG.P..FF..P.GGGGGGG.T",
      "T.........P..PP..P.........T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'MOUNTAIN', spawnX: 13, spawnY: 18 },
      south: { targetMap: 'BEACH',    spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'FOREST',   spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'DESERT',   spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'nurse_joy', name: 'NURSE JOY', topic: 'NURSE • HEAL & CELL FACT', x: 14, y: 5,
        hatColor: '#f43f5e', shirtColor: '#fda4af', healsParty: true,
        fact: "NURSE JOY: Welcome to the Hub Center! I've fully restored your Party's HP! Remember: the Mitochondria is the powerhouse organelle of a eukaryotic cell that generates ATP!"
      },
      {
        id: 'principal_skinner', name: 'PRINCIPAL VANCE', topic: 'PRINCIPAL • EDUCATION', x: 11, y: 5,
        hatColor: '#1e293b', shirtColor: '#94a3b8',
        fact: "PRINCIPAL VANCE: As school principal, I oversee our curriculum! Remember: Palindromes read the same backward and forward, and an Antonym is a word with the exact opposite meaning!"
      },
      {
        id: 'dentist_smile', name: 'DR. MOLAR (DENTIST)', topic: 'DENTIST • DENTAL ANATOMY', x: 9, y: 8,
        hatColor: '#38bdf8', shirtColor: '#f8fafc',
        fact: "DR. MOLAR: Open wide! As a dentist, I remind everyone that an average healthy adult human has 32 permanent teeth including wisdom teeth, and Calcium prevents Osteoporosis!"
      },
      {
        id: 'chef_ramsey', name: 'CHEF GUSTEAU', topic: 'CHEF • NUTRITION & VITAMINS', x: 17, y: 8,
        hatColor: '#ffffff', shirtColor: '#f1f5f9',
        fact: "CHEF GUSTEAU: Bon appétit! Fresh citrus prevents Scurvy (Vitamin C deficiency), dietary protein prevents Kwashiorkor, and iodized salt prevents Goiter!"
      },
      {
        id: 'officer_jenny', name: 'OFFICER JENNY', topic: 'POLICEMAN • LOGIC & LAWS', x: 19, y: 4,
        hatColor: '#1e3a8a', shirtColor: '#60a5fa',
        fact: "OFFICER JENNY: Law and order! According to Kirchhoff's Current Law, the total electric current entering a junction equals the total current leaving it!"
      }
    ],
    pokeNpcs: [
      { id: 'hub_pikachu', speciesId: 'pikachu', name: 'PIKACHU', x: 15, y: 5 },
      { id: 'hub_eevee',   speciesId: 'eevee',   name: 'EEVEE',   x: 18, y: 8 },
      { id: 'hub_snorlax', speciesId: 'snorlax', name: 'SNORLAX', x: 10, y: 14 }
    ]
  },

  // =================================================================
  // 2. MOUNTAIN (NORTH): CRAG MOUNTAIN PEAK
  // =================================================================
  MOUNTAIN: {
    id: 'MOUNTAIN',
    name: 'CRAG MOUNTAIN PEAK (NORTH)',
    subtitle: 'W: GLACIER (NW) • E: VOLCANO (NE) • S: HUB',
    theme: { groundA: '#57534e', groundB: '#44403c', path: '#a8a29e', grass: '#3f6212', grassTip: '#a3e635', tree: '#292524', treeTop: '#78716c' },
    encounters: ['charmander', 'clefairy', 'jigglypuff', 'zubat', 'geodude', 'onix', 'pidgeotto'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T..TTTT....PPPPPP....TTTT..T",
      "T.GGGGGG...P....P...GGGGGG.T",
      "T.GGGGGG..PP.FF.PP..GGGGGG.T",
      "T.GGGGGG..P......P..GGGGGG.T",
      "T...TT....PPPPPPPP....TT...T",
      "T........PP......PP........T",
      "T..GGGGPPP..TTTT..PPPGGGG..T",
      "T..GGGGP...TTTTTT...PGGGG..T",
      "EPPPPPPP...TTTTTT...PPPPPPPE",
      "EPPPPPPP....TTTT....PPPPPPPE",
      "T..TTT..PPPPPPPPPPPP..TTT..T",
      "T..........PP..PP..........T",
      "T.GGGGGGG..PP..PP..GGGGGGG.T",
      "T.GGGGGGG..PP..PP..GGGGGGG.T",
      "T.GGGGGGG.PPP..PPP.GGGGGGG.T",
      "T.........P......P.........T",
      "T..TTTT...PPPPPPPP...TTTT..T",
      "T............PP............T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      south: { targetMap: 'CENTER',  spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'GLACIER', spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'VOLCANO', spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'ornithologist_hawk', name: 'ORNITHOLOGIST ROBIN', topic: 'ORNITHOLOGIST • AVIAN FLIGHT', x: 10, y: 5,
        hatColor: '#0284c7', shirtColor: '#bae6fd',
        fact: "ORNITHOLOGIST ROBIN: I study birds (Class Aves)! Modern birds evolved from Theropod dinosaurs, and their wing shape generates aerodynamic Lift via Bernoulli's Principle!"
      },
      {
        id: 'geologist_cole', name: 'GEOLOGIST COLE', topic: 'GEOLOGIST • EARTH SCIENCE', x: 16, y: 5,
        hatColor: '#78350f', shirtColor: '#d97706',
        fact: "GEOLOGIST COLE: Diamond rates a 10 on the Mohs hardness scale! Mountain ranges form through tectonic plate compression in a process called Orogeny."
      },
      {
        id: 'backpacker_finn', name: 'BACKPACKER FINN', topic: 'BACKPACKER • ALPINE WEATHER', x: 14, y: 11,
        hatColor: '#15803d', shirtColor: '#fde047',
        fact: "BACKPACKER FINN: I hike from the NW Glacier to the NE Volcano! All weather happens in the Troposphere, while the Stratosphere above holds the ozone layer!"
      }
    ],
    pokeNpcs: [
      { id: 'mt_pidgeotto', speciesId: 'pidgeotto', name: 'PIDGEOTTO', x: 9,  y: 5 },
      { id: 'mt_clefairy',  speciesId: 'clefairy',  name: 'CLEFAIRY',  x: 17, y: 5 }
    ]
  },

  // =================================================================
  // 3. GLACIER (NORTHWEST CORNER): GLACIAL TUNDRA PEAK
  // =================================================================
  GLACIER: {
    id: 'GLACIER',
    name: 'GLACIAL TUNDRA PEAK (NW)',
    subtitle: 'E: MOUNTAIN • S: FOREST • ICE & FOSSIL BIOME',
    theme: { groundA: '#bae6fd', groundB: '#7dd3fc', path: '#f1f5f9', grass: '#0284c7', grassTip: '#e0f2fe', tree: '#0f172a', treeTop: '#94a3b8' },
    encounters: ['lapras', 'articuno', 'clefairy', 'jigglypuff', 'zubat', 'geodude'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T..WWWW....PPPPPP....WWWW..T",
      "T.GGGGGG...P....P...GGGGGG.T",
      "T.GGGGGG..PP.FF.PP..GGGGGG.T",
      "T.........P......P.........T",
      "T..TTTT...PPPPPPPP...TTTT..T",
      "T........PP......PP........T",
      "T..GGGG..P..WWWW..P..GGGG..T",
      "T..GGGG..P..WWWW..P..GGGG..T",
      "T........PPPPPPPPPPPPPPPPPPE",
      "T........PPPPPPPPPPPPPPPPPPE",
      "T..WWWW..P........P..GGGG..T",
      "T..WWWW..P..FFFF..P..GGGG..T",
      "T........PPPPPPPPPP........T",
      "T.GGGGGGG....PP....GGGGGGG.T",
      "T.GGGGGGG....PP....GGGGGGG.T",
      "T............PP............T",
      "T..TTTT......PP......TTTT..T",
      "T............PP............T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      east:  { targetMap: 'MOUNTAIN', spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'FOREST',   spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'historian_herodotus', name: 'HISTORIAN CLIO', topic: 'HISTORIAN • ICE AGE & FOLKLORE', x: 11, y: 6,
        hatColor: '#6d28d9', shirtColor: '#ddd6fe',
        fact: "HISTORIAN CLIO: As a historian, I chronicle human eras and oral folklore! The repeated glacial expansions of the Ice Age occurred during the Pleistocene epoch!"
      },
      {
        id: 'archaeologist_indi', name: 'ARCHAEOLOGIST JONES', topic: 'ARCHAEOLOGIST • ANCIENT RELICS', x: 16, y: 10,
        hatColor: '#78350f', shirtColor: '#fde68a',
        fact: "ARCHAEOLOGIST JONES: Frozen permafrost preserves ancient artifacts! Ground that stays at or below 0°C for two or more years is called Permafrost!"
      }
    ],
    pokeNpcs: [
      { id: 'gl_lapras',   speciesId: 'lapras',   name: 'LAPRAS',   x: 10, y: 6 },
      { id: 'gl_articuno', speciesId: 'articuno', name: 'ARTICUNO', x: 17, y: 10 }
    ]
  },

  // =================================================================
  // 4. VOLCANO (NORTHEAST CORNER): MAGMA CALDERA CRATER
  // =================================================================
  VOLCANO: {
    id: 'VOLCANO',
    name: 'MAGMA CALDERA CRATER (NE)',
    subtitle: 'W: MOUNTAIN • S: DESERT • FIRE & DRAGON BIOME',
    theme: { groundA: '#451a03', groundB: '#7c2d12', path: '#a8a29e', grass: '#991b1b', grassTip: '#f97316', tree: '#1c1917', treeTop: '#dc2626' },
    encounters: ['charmander', 'vulpix', 'growlithe', 'ponyta', 'dragonite', 'onix', 'gengar'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T..GGGG....PPPPPP....GGGG..T",
      "T.GGGGGG...P....P...GGGGGG.T",
      "T..........P.FF.P..........T",
      "T..TTTT....PPPPPP....TTTT..T",
      "T............PP............T",
      "T..GGGG..PPPPPPPPPP..GGGG..T",
      "T..GGGG..P........P..GGGG..T",
      "T........P..TTTT..P........T",
      "EPPPPPPPPP..TTTT..P..GGGG..T",
      "EPPPPPPPPP........P..GGGG..T",
      "T........PPPPPPPPPP........T",
      "T..TTTT......PP......TTTT..T",
      "T............PP............T",
      "T.GGGGGGG...PPPP...GGGGGGG.T",
      "T.GGGGGGG..PP..PP..GGGGGGG.T",
      "T..........PP..PP..........T",
      "T..TTTT....PPPPPP....TTTT..T",
      "T............PP............T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      west:  { targetMap: 'MOUNTAIN', spawnX: 26, spawnY: 9 },
      south: { targetMap: 'DESERT',   spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'fireman_bravo', name: 'CHIEF BRAVO', topic: 'FIREMAN • COMBUSTION & HEAT', x: 11, y: 6,
        hatColor: '#dc2626', shirtColor: '#fca5a5',
        fact: "CHIEF BRAVO: Careful near the caldera! Molten rock underground is Magma, and once it erupts onto the surface it's Lava! A blue gas flame is hotter than a yellow flame!"
      },
      {
        id: 'herpetologist_scales', name: 'HERPETOLOGIST DRAKE', topic: 'HERPETOLOGIST • REPTILES', x: 16, y: 11,
        hatColor: '#b45309', shirtColor: '#fcd34d',
        fact: "HERPETOLOGIST DRAKE: As a herpetologist, I study reptiles and amphibians! Reptiles are ectothermic (cold-blooded) and dominated the Mesozoic Era!"
      }
    ],
    pokeNpcs: [
      { id: 'vo_dragonite', speciesId: 'dragonite', name: 'DRAGONITE', x: 17, y: 11 },
      { id: 'vo_growlithe', speciesId: 'growlithe', name: 'GROWLITHE', x: 10, y: 6 }
    ]
  },

  // =================================================================
  // 5. FOREST (WEST): VIRIDIAN CANOPY FOREST
  // =================================================================
  FOREST: {
    id: 'FOREST',
    name: 'VIRIDIAN CANOPY FOREST (WEST)',
    subtitle: 'N: GLACIER (NW) • E: HUB • S: JUNGLE (SW)',
    theme: { groundA: '#3f6212', groundB: '#365314', path: '#a16207', grass: '#14532d', grassTip: '#22c55e', tree: '#052e16', treeTop: '#15803d' },
    encounters: ['bulbasaur', 'caterpie', 'weedle', 'oddish', 'bellsprout', 'meowth', 'venonat', 'paras'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T.TTTT......PPPP......TTTT.T",
      "T.TTTT..GGGGPPPPGGGG..TTTT.T",
      "T.......GGGGPPPPGGGG.......T",
      "T..GGG..PPPPPPPPPPPP..GGG..T",
      "T..GGG..P..TTTTTT..P..GGG..T",
      "T..GGG..P..TTTTTT..P..GGG..T",
      "T.......P....FF....P.......T",
      "T.TTTT..PPPPPPPPPPPP.......T",
      "T.TTTT.......PP.....PPPPPPPE",
      "T............PP.....PPPPPPPE",
      "T..GGGGGGG...PP...GGGGGGG..T",
      "T..GGGGGGG..PPPP..GGGGGGG..T",
      "T..GGGGGGG.PP..PP.GGGGGGG..T",
      "T..........P.FF.P..........T",
      "T.TTTT....PP....PP....TTTT.T",
      "T.TTTT....PPPPPPPP....TTTT.T",
      "T......GGGG..PP..GGGG......T",
      "T......GGGG..PP..GGGG......T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'GLACIER', spawnX: 13, spawnY: 18 },
      east:  { targetMap: 'CENTER',  spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'JUNGLE',  spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'botanist_elena', name: 'BOTANIST ELENA', topic: 'BOTANIST • PLANT SCIENCE', x: 13, y: 8,
        hatColor: '#84cc16', shirtColor: '#bef264',
        fact: "BOTANIST ELENA: Plants use green Chlorophyll to absorb light, Xylem to transport water upward from roots, and Phloem to distribute sugars!"
      }
    ],
    pokeNpcs: [
      { id: 'fo_bulbasaur', speciesId: 'bulbasaur', name: 'BULBASAUR', x: 12, y: 8 },
      { id: 'fo_caterpie',  speciesId: 'caterpie',  name: 'CATERPIE',  x: 15, y: 8 }
    ]
  },

  // =================================================================
  // 6. DESERT (EAST): SCORCHED MIRAGE DESERT
  // =================================================================
  DESERT: {
    id: 'DESERT',
    name: 'SCORCHED MIRAGE DESERT (EAST)',
    subtitle: 'N: VOLCANO (NE) • W: HUB • S: METRO (SE)',
    theme: { groundA: '#d97706', groundB: '#b45309', path: '#fde68a', grass: '#9a3412', grassTip: '#fb923c', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['sandshrew', 'nidoran_f', 'nidoran_m', 'machop', 'mankey', 'diglett', 'kadabra'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T....GGGG...PPPP...GGGG....T",
      "T...GGGGGG..PPPP..GGGGGG...T",
      "T...GGGGGG...PP...GGGGGG...T",
      "T...........PPPP...........T",
      "T..TTT.....PP..PP.....TTT..T",
      "T.........PP.WW.PP.........T",
      "T..GGGG..PP.WWWW.PP..GGGG..T",
      "T..GGGG.PP..WWWW..PP.GGGG..T",
      "EPPPPPPPP....WW....PPPPPPPPT",
      "EPPPPPPPP..........PPPPPPPPT",
      "T..GGGG..PPPPPPPPPP..GGGG..T",
      "T..GGGG......PP......GGGG..T",
      "T............PP............T",
      "T...TTT.....PPPP.....TTT...T",
      "T..........PP..PP..........T",
      "T..GGGGGG..P....P..GGGGGG..T",
      "T..GGGGGG..PPPPPP..GGGGGG..T",
      "T............PP............T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'VOLCANO', spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'CENTER',  spawnX: 26, spawnY: 9 },
      south: { targetMap: 'METRO',   spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'psychologist_adler', name: 'DR. ADLER', topic: 'PSYCHOLOGIST • NEUROSCIENCE', x: 13, y: 11,
        hatColor: '#4338ca', shirtColor: '#a5b4fc',
        fact: "DR. ADLER: As a psychologist, I study the brain! The Frontal lobe governs reasoning, the Occipital lobe processes vision, and the Hippocampus consolidates memory!"
      },
      {
        id: 'construction_bob', name: 'FOREMAN MASON', topic: 'CONSTRUCTION WORKER • MATERIALS', x: 18, y: 11,
        hatColor: '#facc15', shirtColor: '#f97316',
        fact: "FOREMAN MASON: I'm a construction worker! We build with Steel—an alloy of Iron (Fe) and Carbon—and Granite! Quenching and Tempering make steel tough and ductile!"
      }
    ],
    pokeNpcs: [
      { id: 'de_sandshrew', speciesId: 'sandshrew', name: 'SANDSHREW', x: 12, y: 11 },
      { id: 'de_machop',    speciesId: 'machop',    name: 'MACHOP',    x: 19, y: 11 }
    ]
  },

  // =================================================================
  // 7. JUNGLE (SOUTHWEST CORNER): PRIMEVAL RAINFOREST
  // =================================================================
  JUNGLE: {
    id: 'JUNGLE',
    name: 'PRIMEVAL RAINFOREST (SW)',
    subtitle: 'N: FOREST • E: BEACH • PRIMATE & TROPICAL BIOME',
    theme: { groundA: '#14532d', groundB: '#166534', path: '#ca8a04', grass: '#064e3b', grassTip: '#34d399', tree: '#022c22', treeTop: '#10b981' },
    encounters: ['mankey', 'primeape', 'vileplume', 'bellsprout', 'ekans', 'paras', 'venonat', 'weedle'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..GGGG......PP......GGGG..T",
      "T..GGGG.....PPPP.....GGGG..T",
      "T..........PP..PP..........T",
      "T..TTTT...PP....PP...TTTT..T",
      "T.........P..FF..P.........T",
      "T.GGGGGG..PPPPPPPP..GGGGGG.T",
      "T.GGGGGG.....PP.....GGGGGG.T",
      "T............PP............T",
      "T........PPPPPPPPPPPPPPPPPPE",
      "T........PPPPPPPPPPPPPPPPPPE",
      "T..WWWW..P........P..GGGG..T",
      "T..BBBB..P..FFFF..P..GGGG..T",
      "T..WWWW..PPPPPPPPPP........T",
      "T.GGGGGGG....PP....GGGGGGG.T",
      "T.GGGGGGG...PPPP...GGGGGGG.T",
      "T..........PP..PP..........T",
      "T..TTTT....PPPPPP....TTTT..T",
      "T..........................T",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'FOREST', spawnX: 13, spawnY: 18 },
      east:  { targetMap: 'BEACH',  spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'primatologist_jane', name: 'PRIMATOLOGIST JANE', topic: 'PRIMATOLOGIST • ANTHROPOLOGY', x: 11, y: 6,
        hatColor: '#15803d', shirtColor: '#bbf7d0',
        fact: "PRIMATOLOGIST JANE: As a primatologist, I study great apes and primates in the canopy! Modern humans are classified as Homo sapiens, and muscles contract using ATP and Calcium ions!"
      },
      {
        id: 'entomologist_bugsy', name: 'RESEARCHER BUGSY', topic: 'ENTOMOLOGIST • ARTHROPODS', x: 16, y: 12,
        hatColor: '#65a30d', shirtColor: '#ecfccb',
        fact: "RESEARCHER BUGSY: Insects have 6 jointed legs, 3 body segments (head, thorax, abdomen), an exoskeleton made of Chitin, and breathe through Spiracles!"
      }
    ],
    pokeNpcs: [
      { id: 'ju_primeape',  speciesId: 'primeape',  name: 'PRIMEAPE',  x: 10, y: 6 },
      { id: 'ju_vileplume', speciesId: 'vileplume', name: 'VILEPLUME', x: 17, y: 12 }
    ]
  },

  // =================================================================
  // 8. BEACH (SOUTH): CORAL LAGOON BEACH
  // =================================================================
  BEACH: {
    id: 'BEACH',
    name: 'CORAL LAGOON BEACH (SOUTH)',
    subtitle: 'N: HUB • W: JUNGLE (SW) • E: METRO (SE)',
    theme: { groundA: '#fde047', groundB: '#facc15', path: '#fef08a', grass: '#0d9488', grassTip: '#5eead4', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['squirtle', 'psyduck', 'poliwag', 'tentacool', 'abra', 'ekans', 'lapras'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T...........PPPP...........T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..GGGGGG....PP....GGGGGG..T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..........PP..PP..........T",
      "T..FFFF...PP....PP...FFFF..T",
      "T........PPPPPPPPPP........T",
      "T..GGGG..P...PP...P..GGGG..T",
      "EPPPPPPPPP...PP...PPPPPPPPPE",
      "EPPPPPPPPP...BB...PPPPPPPPPE",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWW...PPPP...WWWWWWWWT",
      "TWWWWWWW...GGGGGG...WWWWWWWT",
      "TWWWWWWW...GGGGGG...WWWWWWWT",
      "TWWWWWWWW..........WWWWWWWWT",
      "TWWWWWWWWWWWWWWWWWWWWWWWWWWT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'CENTER', spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'JUNGLE', spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'METRO',  spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'ichthyologist_marlin', name: 'ICHTHYOLOGIST CORAL', topic: 'ICHTHYOLOGIST • MARINE BIOLOGY', x: 10, y: 7,
        hatColor: '#0284c7', shirtColor: '#7dd3fc',
        fact: "ICHTHYOLOGIST CORAL: As an ichthyologist studying marine fish, I track ocean currents! Estuaries are where freshwater rivers meet salt water, and Thermohaline circulation moves global seas!"
      },
      {
        id: 'ecologist_lin', name: 'ECOLOGIST LIN', topic: 'ECOLOGIST • MARINE HABITATS', x: 16, y: 7,
        hatColor: '#16a34a', shirtColor: '#4ade80',
        fact: "ECOLOGIST LIN: Oceans cover 71% of Earth's surface! The Moon's gravitational pull drives our ocean tides, and Osmosis moves water across semipermeable membranes."
      }
    ],
    pokeNpcs: [
      { id: 'be_squirtle', speciesId: 'squirtle', name: 'SQUIRTLE', x: 9,  y: 7 },
      { id: 'be_psyduck',  speciesId: 'psyduck',  name: 'PSYDUCK',  x: 17, y: 7 }
    ]
  },

  // =================================================================
  // 9. METRO (SOUTHEAST CORNER): CYBER HARBOR METROPOLIS
  // =================================================================
  METRO: {
    id: 'METRO',
    name: 'CYBER HARBOR METROPOLIS (SE)',
    subtitle: 'N: DESERT • W: BEACH • FINANCE, LAW & TECH HUB',
    theme: { groundA: '#334155', groundB: '#475569', path: '#94a3b8', grass: '#0f766e', grassTip: '#2dd4bf', tree: '#1e293b', treeTop: '#38bdf8' },
    encounters: ['pikachu', 'zapdos', 'kadabra', 'gengar', 'meowth', 'eevee', 'snorlax', 'abra'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..HHHH......PP......HHHH..T",
      "T..HHHH.....PPPP.....HHHH..T",
      "T...DD.....PP..PP.....DD...T",
      "T..PPPPPPPPPP..PPPPPPPPPP..T",
      "T..P....FFFF....FFFF....P..T",
      "T..P..GGGGGG....GGGGGG..P..T",
      "T..P..GGGGGG....GGGGGG..P..T",
      "T..P....................P..T",
      "EPPPPPPPPPPPPPPPPPPPPPPPP..T",
      "EPPPPPPPPPPPPPPPPPPPPPPPP..T",
      "T..P....................P..T",
      "T..P..HHHH........HHHH..P..T",
      "T..P..HHHH...FF...HHHH..P..T",
      "T..P...DD....FF....DD...P..T",
      "T..PPPPPPPPPPPPPPPPPPPPPP..T",
      "T....GGGG..........GGGG....T",
      "T....GGGG..........GGGG....T",
      "T..........................T",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'DESERT', spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'BEACH',  spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'banker_sterling', name: 'BANKER STERLING', topic: 'INVESTMENT BANKER • MARKETS', x: 6, y: 5,
        hatColor: '#0f172a', shirtColor: '#fde047',
        fact: "BANKER STERLING: As an investment banker, I analyze compound growth and energy markets! Remember: Watt is the unit of power (one joule per second), and Voltage = Current × Resistance!"
      },
      {
        id: 'lawyer_atticus', name: 'LAWYER ATTICUS', topic: 'LAWYER • EVIDENCE & LOGIC', x: 20, y: 5,
        hatColor: '#1e1b4b', shirtColor: '#e2e8f0',
        fact: "LAWYER ATTICUS: In a court of law, precise definitions matter! Primary sources are original documents, while an Allegory uses symbolic characters to convey deeper moral truths."
      },
      {
        id: 'economist_keynes', name: 'ECONOMIST HAYEK', topic: 'ECONOMIST • RESOURCE ALLOCATION', x: 8, y: 15,
        hatColor: '#14532d', shirtColor: '#86efac',
        fact: "ECONOMIST HAYEK: As an economist, I study scarcity and industrial output! Smelting extracts usable metal from ore, and Iron/Steel is the most widely used structural metal in the world."
      },
      {
        id: 'driver_turbo', name: 'DRIVER AXEL', topic: 'DRIVER • PHYSICS OF MOTION', x: 18, y: 15,
        hatColor: '#dc2626', shirtColor: '#f8fafc',
        fact: "DRIVER AXEL: I'm a professional transport driver! Forward Thrust overcomes aerodynamic Drag, and a Fuse melts to protect electrical circuits when current exceeds safe limits!"
      }
    ],
    pokeNpcs: [
      { id: 'me_meowth', speciesId: 'meowth', name: 'MEOWTH', x: 7,  y: 5 },
      { id: 'me_zapdos', speciesId: 'zapdos', name: 'ZAPDOS', x: 19, y: 15 },
      { id: 'me_gengar', speciesId: 'gengar', name: 'GENGAR', x: 21, y: 5 }
    ]
  }
};