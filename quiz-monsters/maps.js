/********************************************************************
 * maps.js
 * 32 Areas (25 Original Region + 7 East Asia Region)
 * - 4 Corner Areas (AURORA_RIDGE, CYBER_NEXUS, SUNKEN_RUINS, MOON)
 *   are detached and accessible ONLY via Fly.
 * - All other areas are bidirectionally linked on the 5x5 Grand Map.
 * - Zero overlapping wild Pokémon encounters across all areas.
 ********************************************************************/

const MAP_COLS = 28;
const MAP_ROWS = 20;
const TILE_SIZE = 32;

const WORLD_MAPS = {
  // ====================================================================
  // ROW 0: ['AURORA_RIDGE', 'WIND_TEMPLE', 'GLACIER', 'METEOR_CRATER', 'CYBER_NEXUS']
  // ====================================================================

  // (0,0) DETACHED CORNER — FLY ONLY
  AURORA_RIDGE: {
    id: 'AURORA_RIDGE',
    name: 'Obsidian Tundra',
    subtitle: 'DETACHED CORNER • ACCESSIBLE BY FLY ONLY',
    theme: { groundA: '#0f172a', groundB: '#1e293b', path: '#7dd3fc', grass: '#0369a1', grassTip: '#38bdf8', tree: '#020617', treeTop: '#a855f7', rock: '#334155', rockLight: '#bae6fd', rockDark: '#0f172a' },
    encounters: ['turtwig', 'chimchar', 'piplup'],
    rows: [
      "IIIIIIIIIIIIIIIIIIIIIIIIIIII",
      "I..AA..GGGG......GGGG..AA..I",
      "I......GGGG.PPPP.GGGG......I",
      "I..AA.......P..P.......AA..I",
      "I......PPPPPP..PPPPPP......I",
      "I..GGGGP....I..I....PGGGG..I",
      "I..GGGGP............PGGGG..I",
      "I......P..II....II..P......I",
      "I......PPPPPPPPPPPPPP......I",
      "I...........PPPP...........I",
      "I...........PPPP...........I",
      "I......PPPPPPPPPPPPPP......I",
      "I......P..II....II..P......I",
      "I..GGGGP............PGGGG..I",
      "I..GGGGP....I..I....PGGGG..I",
      "I......PPPPPPPPPPPPPP......I",
      "I..AA.......P..P.......AA..I",
      "I......GGGG.PPPP.GGGG......I",
      "I..AA..GGGG..PP..GGGG..AA..I",
      "IIIIIIIIIIIIIIIIIIIIIIIIIIII"
    ],
    exits: {},
    npcs: [
      {
        id: 'astrophysicist_vera', name: 'DR. VERA RUBIN', topic: 'ASTROPHYSICIST • AURORAS', x: 13, y: 5,
        skinColor: '#fed7aa', hatColor: '#7e22ce', shirtColor: '#c084fc',
        fact: "DR. VERA RUBIN: Auroras occur when charged solar wind particles collide with oxygen and nitrogen gases in Earth's magnetosphere!"
      }
    ]
  },

  // (0,1) E: Cyan Cliff • S: Cobalt Boreal
  WIND_TEMPLE: {
    id: 'WIND_TEMPLE',
    name: 'Azure Taiga',
    subtitle: 'E: Cyan Cliff • S: Cobalt Boreal',
    theme: { groundA: '#0369a1', groundB: '#0284c7', path: '#f0f9ff', grass: '#0d9488', grassTip: '#99f6e4', tree: '#0f172a', treeTop: '#38bdf8', rock: '#475569', rockLight: '#e2e8f0', rockDark: '#1e293b' },
    encounters: ['chikorita', 'cyndaquil', 'totodile'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..AA..GGGG......GGGG..AA..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..AA.......P..P.......AA..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....A..A....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..AA....AA..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "R...........PPPPPPPPPPPPPPPE",
      "R...........PPPPPPPPPPPPPPPE",
      "R......PPPPPPPPPPPPPP......R",
      "R......P..AA....AA..P......R",
      "R..GGGGP............PGGGG..R",
      "R..GGGGP....A..A....PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..AA.......P..P.......AA..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..AA..GGGG..PP..GGGG..AA..R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      east:  { targetMap: 'GLACIER',   spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'NORTHWEST', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'meteorologist_fujita', name: 'DR. FUJITA', topic: 'METEOROLOGIST • JET STREAM', x: 13, y: 8,
        skinColor: '#fde68a', hatColor: '#0284c7', shirtColor: '#bae6fd',
        fact: "DR. FUJITA: High-altitude Jet Streams blow from west to east in the upper Troposphere due to thermal gradients and the Coriolis Effect!"
      }
    ]
  },

  // (0,2) W: Azure Taiga • E: Indigo Lake • S: Slate Mountain
  GLACIER: {
    id: 'GLACIER',
    name: 'Cyan Cliff',
    subtitle: 'W: Azure Taiga • E: Indigo Lake • S: Slate Mountain',
    theme: { groundA: '#bae6fd', groundB: '#7dd3fc', path: '#f0f9ff', grass: '#0284c7', grassTip: '#e0f2fe', tree: '#0f172a', treeTop: '#38bdf8' },
    encounters: ['seel', 'shellder', 'jynx'],
    rows: [
      "IIIIIIIIIIIIIIIIIIIIIIIIIIII",
      "I..IIII....PPPPPP....IIII..I",
      "I.GGGGGG...P....P...GGGGGG.I",
      "I.GGGGGG..PP.FF.PP..GGGGGG.I",
      "I.GGGGGG..P......P..GGGGGG.I",
      "I.........PPPPPPPP.........I",
      "I........PP......PP........I",
      "I..GGGGPPP..IIII..PPPGGGG..I",
      "I..GGGGP...IIIIII...PGGGG..I",
      "EPPPPPPP...IIIIII...PPPPPPPE",
      "EPPPPPPP....IIII....PPPPPPPE",
      "I..III..PPPPPPPPPPPP..III..I",
      "I..........PP..PP..........I",
      "I.GGGGGGG..PP..PP..GGGGGGG.I",
      "I.GGGGGGG..PP..PP..GGGGGGG.I",
      "I.GGGGGGG.PPP..PPP.GGGGGGG.I",
      "I.........P......P.........I",
      "I..IIII...PPPPPPPP...IIII..I",
      "I............PP............I",
      "IIIIIIIIIIIIIEEIIIIIIIIIIIII"
    ],
    exits: {
      west:  { targetMap: 'WIND_TEMPLE',   spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'METEOR_CRATER', spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'MOUNTAIN',      spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'biathlete_sven', name: 'BIATHLETE SVEN', topic: 'BIATHLETE • GLACIOLOGY', x: 13, y: 11,
        skinColor: '#fed7aa', hatColor: '#0284c7', shirtColor: '#bae6fd',
        fact: "BIATHLETE SVEN: Cross-country skiing and marksmanship! Ground that remains at or below 0°C for two or more consecutive years is called Permafrost!"
      },
      {
        id: 'overworld_articuno', name: 'ARTICUNO', topic: 'LEGENDARY POKéMON • HEXAGONAL ICE', x: 13, y: 5,
        isMonster: true, monsterId: 'articuno', isLegendary: true,
        fact: "ARTICUNO: Kyaaah! (Ordinary water ice forms a Hexagonal crystal structure at standard atmospheric pressure, and Antarctica holds most of Earth's glacial ice!)"
      }
    ]
  },

  // (0,3) W: Cyan Cliff • S: Amber Desert
  METEOR_CRATER: {
    id: 'METEOR_CRATER',
    name: 'Indigo Lake',
    subtitle: 'W: Cyan Cliff • S: Amber Desert',
    theme: { groundA: '#312e81', groundB: '#1e1b4b', path: '#cbd5e1', grass: '#4338ca', grassTip: '#818cf8', tree: '#0f172a', treeTop: '#6366f1', rock: '#3730a3', rockLight: '#a5b4fc', rockDark: '#1e1b4b' },
    encounters: ['treecko', 'torchic', 'mudkip'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..RR..GGGG......GGGG..RR..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..RR.......P..P.......RR..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....WWWW....PGGGG..R",
      "R..GGGGP...WWWWWW...PGGGG..R",
      "R......P...WWWWWW...P......R",
      "R......PPPPPPPPPPPPPP......R",
      "EPPPPPPPPPPPPPPPP..........R",
      "EPPPPPPPPPPPPPPPP..........R",
      "R......PPPPPPPPPPPPPP......R",
      "R......P..RR....RR..P......R",
      "R..GGGGP............PGGGG..R",
      "R..GGGGP....R..R....PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..RR.......P..P.......RR..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..RR..GGGG..PP..GGGG..RR..R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      west:  { targetMap: 'GLACIER',   spawnX: 26, spawnY: 9 },
      south: { targetMap: 'NORTHEAST', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'paleontologist_grant', name: 'DR. GRANT', topic: 'PALEONTOLOGIST • CHICXULUB', x: 13, y: 11,
        skinColor: '#e59866', hatColor: '#78350f', shirtColor: '#fde68a',
        fact: "DR. GRANT: The Chicxulub asteroid impact 66 million years ago ended the Cretaceous Period and drove non-avian dinosaurs to extinction!"
      }
    ]
  },

  // (0,4) DETACHED CORNER — FLY ONLY
  CYBER_NEXUS: {
    id: 'CYBER_NEXUS',
    name: 'Neon Zone',
    subtitle: 'DETACHED CORNER • ACCESSIBLE BY FLY ONLY',
    theme: { groundA: '#090d16', groundB: '#111827', path: '#38bdf8', grass: '#0f766e', grassTip: '#2dd4bf', tree: '#1e293b', treeTop: '#06b6d4', rock: '#1e293b', rockLight: '#7dd3fc', rockDark: '#020617' },
    encounters: ['snivy', 'tepig', 'oshawott'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..VV..GGGG......GGGG..VV..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..VV.......P..P.......VV..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....V..V....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..VV....VV..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "R...........PPPP...........R",
      "R...........PPPP...........R",
      "R......PPPPPPPPPPPPPP......R",
      "R......P..VV....VV..P......R",
      "R..GGGGP............PGGGG..R",
      "R..GGGGP....V..V....PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..VV.......P..P.......VV..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..VV..GGGG..PP..GGGG..VV..R",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {},
    npcs: [
      {
        id: 'ai_researcher_turing', name: 'DR. TURING', topic: 'COMPUTER SCIENTIST • AI & LOGIC', x: 13, y: 8,
        skinColor: '#fed7aa', hatColor: '#0284c7', shirtColor: '#e0f2fe',
        fact: "DR. TURING: All digital data is encoded in Binary bits (0s and 1s), and Transistors amplify or switch electronic signals inside CPUs!"
      },
      {
        id: 'overworld_dialga', name: 'TEMPORAL DIALGA', topic: 'LEGENDARY POKéMON • TIME & RELATIVITY', x: 13, y: 11,
        isMonster: true, monsterId: 'dialga', isLegendary: true,
        fact: "DIALGA: Gggaaah! (Dialga governs the flow of time! According to Einstein's Relativity, time moves slower near massive gravitational fields!)"
      }
    ]
  },

  // ====================================================================
  // ROW 1: ['SPIRE', 'NORTHWEST', 'MOUNTAIN', 'NORTHEAST', 'FOUNDRY']
  // ====================================================================

  // (1,0) E: Cobalt Boreal • S: Magenta Shrubland
  SPIRE: {
    id: 'SPIRE',
    name: 'Magenta Cave',
    subtitle: 'E: Cobalt Boreal • S: Magenta Shrubland',
    theme: { groundA: '#311042', groundB: '#4a1d66', path: '#fbcfe8', grass: '#701a75', grassTip: '#f472b6', tree: '#1e1b4b', treeTop: '#e879f9' },
    encounters: ['drowzee', 'mr_mime'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T..AA..GGGG..PP..GGGG..AA..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..AA.......P..P.......AA..T",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....A..A....PGGGG..T",
      "T..GGGGP....FFFF....PGGGG..T",
      "T......P..AAFFFFAA..P......T",
      "T......PPPPPPPPPPPPPP......T",
      "T...........PPPPPPPPPPPPPPPE",
      "T..AA.......P..PPPPPPPPPPPPE",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....A..A....PGGGG..T",
      "T..GGGGP............PGGGG..T",
      "T......PPPPPPPPPPPPPP......T",
      "T..AA.......P..P.......AA..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..AA..GGGG..PP..GGGG..AA..T",
      "T............PP............T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      east:  { targetMap: 'NORTHWEST', spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'SANCTUARY', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'overworld_mewtwo', name: 'LEGENDARY MEWTWO', topic: 'LEGENDARY POKéMON • GENETIC ENGINEERING', x: 13, y: 9,
        isMonster: true, monsterId: 'mewtwo', isLegendary: true,
        fact: "MEWTWO: Who am I? What is my purpose? (Mewtwo was created by genetic manipulation based on Mew's genetic code!)"
      },
      {
        id: 'publisher_pulitzer', name: 'PUBLISHER PERRY', topic: 'PUBLISHER • PRINT & FOLKLORE', x: 9, y: 4,
        skinColor: '#fed7aa', hatColor: '#581c87', shirtColor: '#e9d5ff',
        fact: "PUBLISHER PERRY: Publishing timeless stories! Traditional tales passed down orally before being written are called Folklore—like the Brothers Grimm collections!"
      },
      {
        id: 'journalist_lois', name: 'JOURNALIST LOIS', topic: 'JOURNALIST • INVESTIGATIVE', x: 18, y: 4,
        skinColor: '#f5cba7', hatColor: '#0284c7', shirtColor: '#bae6fd',
        fact: "JOURNALIST LOIS: Investigating the truth! An Antonym is a word with the exact opposite meaning of another word, and the English alphabet has 26 letters!"
      },
      {
        id: 'reporter_clark', name: 'REPORTER CLARK', topic: 'REPORTER • BREAKING NEWS', x: 9, y: 8,
        skinColor: '#e59866', hatColor: '#dc2626', shirtColor: '#fecaca',
        fact: "REPORTER CLARK: Live from the Celestial Spire! Assigning human emotions or traits to non-human nature in writing is called Anthropomorphism!"
      },
      {
        id: 'correspondent_erin', name: 'CORRESPONDENT ERIN', topic: 'CORRESPONDENT • FIELD DISPATCH', x: 18, y: 8,
        skinColor: '#ca8a5b', hatColor: '#d97706', shirtColor: '#fef3c7',
        fact: "CORRESPONDENT ERIN: Reporting across regions! In quantum physics, Quantum Entanglement links particles across vast cosmic distances!"
      },
      {
        id: 'social_worker_clara', name: 'SOCIAL WORKER CLARA', topic: 'SOCIAL WORKER • PUBLIC HEALTH', x: 10, y: 14,
        skinColor: '#a16236', hatColor: '#0d9488', shirtColor: '#99f6e4',
        fact: "SOCIAL WORKER CLARA: Supporting community wellness! Proper nutrition prevents deficiency disorders like Anemia (Iron) and Rickets (Vitamin D)!"
      },
      {
        id: 'counselor_troi', name: 'COUNSELOR DEANNA', topic: 'COUNSELOR • EMPATHY & MEMORY', x: 17, y: 14,
        skinColor: '#784212', hatColor: '#7e22ce', shirtColor: '#f3e8ff',
        fact: "COUNSELOR DEANNA: Listening with empathy! Sensory signals are received by a neuron's branch-like Dendrites and sent along its Axon!"
      }
    ]
  },

  // (1,1) N: Azure Taiga • S: Teal Forest • W: Magenta Cave • E: Slate Mountain
  NORTHWEST: {
    id: 'NORTHWEST',
    name: 'Cobalt Boreal',
    subtitle: 'N: Azure Taiga • S: Teal Forest • W: Magenta Cave • E: Slate Mountain',
    theme: { groundA: '#0284c7', groundB: '#0369a1', path: '#e0f2fe', grass: '#15803d', grassTip: '#86efac', tree: '#1e293b', treeTop: '#38bdf8', rock: '#64748b', rockLight: '#cbd5e1', rockDark: '#334155' },
    encounters: ['spearow', 'farfetchd', 'scyther', 'pinsir'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..TTTT....PPPPPP....TTTT..R",
      "R.GGGGGG...P....P...GGGGGG.R",
      "R.GGGGGG..PP.FF.PP..GGGGGG.R",
      "R.GGGGGG..P......P..GGGGGG.R",
      "R.........PPPPPPPP.........R",
      "R........PP......PP........R",
      "R..GGGGPPP..WWWW..PPPGGGG..R",
      "R..GGGGP...WWWWWW...PGGGG..R",
      "EPPPPPPP...WWWWWW...PPPPPPPE",
      "EPPPPPPP....WWWW....PPPPPPPE",
      "R..RRR..PPPPPPPPPPPP..RRR..R",
      "R..........PP..PP..........R",
      "R.GGGGGGG..PP..PP..GGGGGGG.R",
      "R.GGGGGGG..PP..PP..GGGGGGG.R",
      "R.GGGGGGG.PPP..PPP.GGGGGGG.R",
      "R.........P......P.........R",
      "R..RRRR...PPPPPPPP...RRRR..R",
      "R............PP............R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'WIND_TEMPLE', spawnX: 13, spawnY: 18 },
      south: { targetMap: 'FOREST',      spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'SPIRE',       spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'MOUNTAIN',    spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'pilot_amelia', name: 'PILOT AMELIA', topic: 'PILOT • AERODYNAMICS', x: 11, y: 5,
        skinColor: '#fde68a', hatColor: '#1e3a8a', shirtColor: '#93c5fd',
        fact: "PILOT AMELIA: Four forces govern flight: Lift pushes upward, Gravity pulls down, Thrust propels forward, and Drag resists motion! Bernoulli's principle explains wing lift!"
      },
      {
        id: 'flight_attendant_sky', name: 'ATTENDANT SKY', topic: 'FLIGHT ATTENDANT • ATMOSPHERE', x: 16, y: 5,
        skinColor: '#fed7aa', hatColor: '#3b82f6', shirtColor: '#dbeafe',
        fact: "ATTENDANT SKY: Weather occurs in the Troposphere, while commercial jets often cruise in the lower Stratosphere near the Jet Stream!"
      },
      {
        id: 'cyclist_lance', name: 'CYCLIST LANCE', topic: 'CYCLIST • BIOMECHANICS', x: 13, y: 11,
        skinColor: '#ca8a5b', hatColor: '#f59e0b', shirtColor: '#fde68a',
        fact: "CYCLIST LANCE: Tendons connect skeletal muscles to bones, while Ligaments connect bones to other bones at your joints!"
      },
      {
        id: 'cosmologist_stephen', name: 'COSMOLOGIST STEPHEN', topic: 'COSMOLOGIST • UNIVERSE', x: 9, y: 15,
        skinColor: '#784212', hatColor: '#5f7478', shirtColor: '#4d5354',
        fact: "COSMOLOGIST STEPHEN: Did you know? 63 Earths can fit inside Uranus! And did you know? Uranus surface smells like rotten eggs due to hydrogen sulfide clouds. I have always wanted to have a closer look at Uranus."
      },
      {
        id: 'cop_branco', name: 'COP BRANCO', topic: 'ARMED • JUSTICE', x: 18, y: 1,
        skinColor: '#000000', hatColor: '#5f7478', shirtColor: '#4d5354',
        fact: "COP BRANCO: If I see those jerks, I will shoot them dead for you."
      }
    ]
  },

  // (1,2) N: Cyan Cliff • S: Beige Village • W: Cobalt Boreal • E: Amber Desert
  MOUNTAIN: {
    id: 'MOUNTAIN',
    name: 'Slate Mountain',
    subtitle: 'N: Cyan Cliff • S: Beige Village • W: Cobalt Boreal • E: Amber Desert',
    theme: { groundA: '#57534e', groundB: '#44403c', path: '#a8a29e', grass: '#3f6212', grassTip: '#a3e635', tree: '#292524', treeTop: '#78716c', rock: '#78716c', rockLight: '#d6d3d1', rockDark: '#292524' },
    encounters: ['clefairy', 'jigglypuff', 'machop', 'hitmonlee', 'hitmonchan'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..RRRR....PPPPPP....RRRR..R",
      "R.GGGGGG...P....P...GGGGGG.R",
      "R.GGGGGG..PP.FF.PP..GGGGGG.R",
      "R.GGGGGG..P......P..GGGGGG.R",
      "R...RR....PPPPPPPP....RR...R",
      "R........PP......PP........R",
      "R..GGGGPPP..RRRR..PPPGGGG..R",
      "R..GGGGP...RRRRRR...PGGGG..R",
      "EPPPPPPP...RRRRRR...PPPPPPPE",
      "EPPPPPPP....RRRR....PPPPPPPE",
      "R..RRR..PPPPPPPPPPPP..RRR..R",
      "R..........PP..PP..........R",
      "R.GGGGGGG..PP..PP..GGGGGGG.R",
      "R.GGGGGGG..PP..PP..GGGGGGG.R",
      "R.GGGGGGG.PPP..PPP.GGGGGGG.R",
      "R.........P......P.........R",
      "R..RRRR...PPPPPPPP...RRRR..R",
      "R............PP............R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'GLACIER',   spawnX: 13, spawnY: 18 },
      south: { targetMap: 'CENTER',    spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'NORTHWEST', spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'NORTHEAST', spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'geologist_cole', name: 'GEOLOGIST COLE', topic: 'GEOLOGIST • EARTH SCIENCE', x: 13, y: 5,
        skinColor: '#a16236', hatColor: '#78350f', shirtColor: '#d97706',
        fact: "GEOLOGIST COLE: Igneous rock formed from cooled lava on Earth's surface is called Extrusive rock, and Diamond rates a 10 on the Mohs hardness scale!"
      },
      {
        id: 'fireman_bravo', name: 'CHIEF BRAVO', topic: 'FIREMAN • THERMODYNAMICS', x: 11, y: 11,
        skinColor: '#fed7aa', hatColor: '#dc2626', shirtColor: '#fca5a5',
        fact: "CHIEF BRAVO: Putting out fires is my job! Remember: Combustion rapidly combines oxygen with fuel, and the hottest part of a standard burner flame is Blue!"
      },
      {
        id: 'runner_bolt', name: 'RUNNER BOLT', topic: 'RUNNER • AEROBIC RESPIRATION', x: 16, y: 11,
        skinColor: '#e59866', hatColor: '#ef4444', shirtColor: '#fecaca',
        fact: "RUNNER BOLT: Training at high altitude! During strenuous anaerobic sprinting, Lactic Acid (lactate) builds up in skeletal muscle tissue!"
      },
      {
        id: 'overworld_clefairy', name: 'WILD CLEFAIRY', topic: 'OVERWORLD POKéMON • LUNAR', x: 14, y: 3,
        isMonster: true, monsterId: 'clefairy',
        fact: "CLEFAIRY: ♪ Clef-clef! ♪ (Clefairy dances under the mountain sky! The Moon's gravitational pull is the primary force driving Earth's ocean tides!)"
      },
      {
        id: 'no_name_1', name: 'NO NAME', topic: 'JOBLESS • NOTHING TO LOSE', x: 26, y: 5,
        skinColor: '#000000', hatColor: '#78350f', shirtColor: '#d97706',
        fact: "NO NAME: Chines! Chines! Chines!(Slap with machete)"
      },  
      {
        id: 'no_name_2', name: 'NO NAME', topic: 'JOBLESS • NOTHING TO LOSE', x: 25, y: 6,
        skinColor: '#000000', hatColor: '#d97706', shirtColor: '#78350f',
        fact: "NO NAME: Kwanza! Kwanza! Kwanza!(Pulls your poncho and throws it on the floor)"
      }
    ]
  },

  // (1,3) N: Indigo Lake • S: Scarlet Savanna • W: Slate Mountain • E: Gray Town
  NORTHEAST: {
    id: 'NORTHEAST',
    name: 'Amber Desert',
    subtitle: 'N: Indigo Lake • S: Scarlet Savanna • W: Slate Mountain • E: Gray Town',
    theme: { groundA: '#78350f', groundB: '#92400e', path: '#fde68a', grass: '#b45309', grassTip: '#facc15', tree: '#451a03', treeTop: '#d97706', rock: '#92400e', rockLight: '#fbbf24', rockDark: '#451a03' },
    encounters: ['geodude', 'onix'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R....GGGG....PP....GGGG....R",
      "R...GGGGGG..RRRR..GGGGGG...R",
      "R...GGGGGG........GGGGGG...R",
      "R...........PPPP...........R",
      "R..RRR.....PP..PP.....RRR..R",
      "R.........PP....PP.........R",
      "R..GGGG..PP..FF..PP..GGGG..R",
      "R..GGGG.PP...FF...PP.GGGG..R",
      "EPPPPPPPP..........PPPPPPPPE",
      "EPPPPPPPP..........PPPPPPPPE",
      "R..GGGG..PPPPPPPPPP..GGGG..R",
      "R..GGGG......PP......GGGG..R",
      "R............PP............R",
      "R...RRR.....PPPP.....RRR...R",
      "R..........PP..PP..........R",
      "R..GGGGGG..P....P..GGGGGG..R",
      "R..GGGGGG..PPPPPP..GGGGGG..R",
      "R............PP............R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'METEOR_CRATER', spawnX: 13, spawnY: 18 },
      south: { targetMap: 'DESERT',        spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'MOUNTAIN',      spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'FOUNDRY',       spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'blacksmith_ferris', name: 'BLACKSMITH FERRIS', topic: 'BLACKSMITH • METALLURGY', x: 11, y: 11,
        skinColor: '#a16236', hatColor: '#1f2937', shirtColor: '#9ca3af',
        fact: "BLACKSMITH FERRIS: Steel is an alloy of Iron (Fe) and Carbon! Quenching cools hot steel rapidly to increase hardness, while Tempering relieves internal stress!"
      },
      {
        id: 'sculptor_rodin', name: 'SCULPTOR RODIN', topic: 'SCULPTOR • MINERALOGY', x: 16, y: 11,
        skinColor: '#e59866', hatColor: '#78716c', shirtColor: '#e7e5e4',
        fact: "SCULPTOR RODIN: Basalt is a dark, fine-grained igneous rock that makes up most oceanic crust, while Granite is coarse-grained continental rock!"
      },
      {
        id: 'product_designer_jony', name: 'DESIGNER JONY', topic: 'PRODUCT DESIGNER • MATERIALS', x: 13, y: 4,
        skinColor: '#fed7aa', hatColor: '#1e293b', shirtColor: '#e2e8f0',
        fact: "DESIGNER JONY: Ductility describes a material's ability to deform under tensile stress without fracturing, while Chromium makes stainless steel corrosion-resistant!"
      },
      {
        id: 'policeman_nero', name: 'POLICEMAN NERO', topic: 'POLICE • CORRUPTED', x: 26, y: 14,
        skinColor: '#000000', hatColor: '#1e293b', shirtColor: '#e7e5e4',
        fact: "POLICEMAN NERO: I know you lost your phones, passports and computer. Now you can pay for my taxi :)"
      }
    ]
  },

  // (1,4) W: Amber Desert • S: Silver Geyser
  FOUNDRY: {
    id: 'FOUNDRY',
    name: 'Gray Town',
    subtitle: 'W: Amber Desert • S: Silver Geyser',
    theme: { groundA: '#1e293b', groundB: '#334155', path: '#94a3b8', grass: '#ca8a04', grassTip: '#fef08a', tree: '#0f172a', treeTop: '#38bdf8', rock: '#475569', rockLight: '#e2e8f0', rockDark: '#0f172a' },
    encounters: ['magnemite', 'voltorb', 'electabuzz', 'lucario'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..VV..GGGG......GGGG..VV..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..VV.......P..P.......VV..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....V..V....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..VV....VV..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "EPPPPPPPP...PPPP...PPPPPPPPR",
      "EPPPPPPPP...PPPP...PPPPPPPPR",
      "R......PPPPPPPPPPPPPP......R",
      "R......P..VV....VV..P......R",
      "R..GGGGP............PGGGG..R",
      "R..GGGGP....V..V....PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..VV.......P..P.......VV..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..VV..GGGG..PP..GGGG..VV..R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      west:  { targetMap: 'NORTHEAST', spawnX: 26, spawnY: 9 },
      south: { targetMap: 'ONSEN',     spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'developer_linus', name: 'DEVELOPER LINUS', topic: 'DEVELOPER • SOFTWARE LOGIC', x: 9, y: 4,
        skinColor: '#fed7aa', hatColor: '#2563eb', shirtColor: '#93c5fd',
        fact: "DEVELOPER LINUS: Writing clean code! Every computer processor relies on billions of microscopic semiconductor Transistors to switch binary signals!"
      },
      {
        id: 'contractor_bob', name: 'CONTRACTOR BOB', topic: 'CONTRACTOR • STRUCTURAL STEEL', x: 18, y: 4,
        skinColor: '#e59866', hatColor: '#eab308', shirtColor: '#fde047',
        fact: "CONTRACTOR BOB: Building this facility! Iron alloyed with Carbon makes structural Steel, the most widely used metal in construction!"
      },
      {
        id: 'engineer_tesla', name: 'ENGINEER NIKOLA', topic: 'ENGINEER • POWER SYSTEMS', x: 11, y: 8,
        skinColor: '#f5cba7', hatColor: '#0284c7', shirtColor: '#bae6fd',
        fact: "ENGINEER NIKOLA: One Watt of electrical power equals one Joule of energy per second! Smelting extracts usable metal from raw mineral ore!"
      },
      {
        id: 'technician_maya', name: 'TECHNICIAN MAYA', topic: 'TECHNICIAN • DIAGNOSTICS', x: 16, y: 8,
        skinColor: '#ca8a5b', hatColor: '#0d9488', shirtColor: '#99f6e4',
        fact: "TECHNICIAN MAYA: Calibrating instruments! We use a Voltmeter to measure electrical potential difference and an Ammeter to measure current in Amperes!"
      },
      {
        id: 'mechanic_cid', name: 'MECHANIC CID', topic: 'MECHANIC • ALLOY HARDNESS', x: 9, y: 15,
        skinColor: '#a16236', hatColor: '#1e3a8a', shirtColor: '#ef4444',
        fact: "MECHANIC CID: Tuning heavy gears! Hardness measures a metal's resistance to scratching or indentation, while Tempering increases toughness!"
      },
      {
        id: 'elec_engineer_faraday', name: 'ELEC. ENG. FARADAY', topic: 'ELECTRICAL ENGINEER • CIRCUITS', x: 14, y: 15,
        skinColor: '#fed7aa', hatColor: '#4f46e5', shirtColor: '#c7d2fe',
        fact: "ELEC. ENG. FARADAY: Electrons carry a negative charge! According to Ohm's Law, Voltage equals Current multiplied by Resistance!"
      },
      {
        id: 'electrician_sparky', name: 'ELECTRICIAN SPARK', topic: 'ELECTRICIAN • CIRCUIT SAFETY', x: 19, y: 15,
        skinColor: '#e59866', hatColor: '#f59e0b', shirtColor: '#fef08a',
        fact: "ELECTRICIAN SPARK: Safety first! Conductors let electricity flow easily, while a Fuse contains a thin wire that melts if current gets too high!"
      },
      {
        id: 'the_punisher', name: 'THE PUNISHER', topic: 'JUST BEING HUMAN • NOT MARVEL', x: 25, y: 8,
        skinColor: '#e59866', hatColor: '#f59e0b', shirtColor: '#000000',
        fact: "THE PUNISHER: In certain extreme situations, the law is inadequate. In order to shame its inadequacy, it is necessary to act outside the law. To pursue... natural justice."
      }
    ]
  },

  // ====================================================================
  // ROW 2: ['SANCTUARY', 'FOREST', 'CENTER', 'DESERT', 'ONSEN']
  // ====================================================================

  // (2,0) N: Magenta Cave • S: Jade Jungle • E: Teal Forest
  SANCTUARY: {
    id: 'SANCTUARY',
    name: 'Magenta Shrubland',
    subtitle: 'N: Magenta Cave • S: Jade Jungle • E: Teal Forest',
    theme: { groundA: '#2e1065', groundB: '#3b0764', path: '#c084fc', grass: '#4c1d95', grassTip: '#e879f9', tree: '#090d16', treeTop: '#7e22ce', rock: '#4c1d95', rockLight: '#c084fc', rockDark: '#1e1b4b' },
    encounters: ['abra', 'gastly', 'nidoran_f', 'nidoran_m'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T.RRRR..GGGG.PP.GGGG..RRRR.T",
      "T.RRRR..GGGG.PP.GGGG..RRRR.T",
      "T..FF...GGGG.PP.GGGG...FF..T",
      "T..GGG..PPPPPPPPPPPP..GGG..T",
      "T..GGG..P..RRRRRR..P..GGG..T",
      "T..GGG..P..RRRRRR..P..GGG..T",
      "T..FF...P....FF....P...FF..T",
      "T.RRRR..PPPPPPPPPPPP.......T",
      "T.RRRR.......PP.....PPPPPPPE",
      "T............PP.....PPPPPPPE",
      "T..GGGGGGG...PP...GGGGGGG..T",
      "T..GGGGGGG..PPPP..GGGGGGG..T",
      "T..GGGGGGG.PP..PP.GGGGGGG..T",
      "T...FF.....P.FF.P.....FF...T",
      "T.RRRR....PP....PP....RRRR.T",
      "T.RRRR....PPPPPPPP....RRRR.T",
      "T......GGGG..PP..GGGG......T",
      "T......GGGG..PP..GGGG......T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'SPIRE',       spawnX: 13, spawnY: 18 },
      south: { targetMap: 'KALOS_GROVE', spawnX: 13, spawnY: 1 },
      east:  { targetMap: 'FOREST',      spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'priest_gabriel', name: 'PRIEST GABRIEL', topic: 'PRIEST • VITAMIN K & HEALING', x: 9, y: 4,
        skinColor: '#fed7aa', hatColor: '#f8fafc', shirtColor: '#fde047',
        fact: "PRIEST GABRIEL: Peace be with you! Remember: if the human body lacks Vitamin K, blood clotting and bleeding disorders will develop!"
      },
      {
        id: 'monk_tenzin', name: 'MONK TENZIN', topic: 'MONK • MINDFULNESS & BRAIN', x: 16, y: 4,
        skinColor: '#ca8a5b', hatColor: '#f97316', shirtColor: '#fed7aa',
        fact: "MONK TENZIN: Deep in the temporal lobe, the Hippocampus plays a major role in memory formation, while the Frontal Lobe governs reasoning!"
      },
      {
        id: 'witch_morgana', name: 'WITCH MORGANA', topic: 'WITCH • FOLKLORE & FAE', x: 10, y: 8,
        skinColor: '#fde68a', hatColor: '#581c87', shirtColor: '#d8b4fe',
        fact: "WITCH MORGANA: A ring of mushrooms in woodland folklore is called a Fairy Ring! Hans Christian Andersen wrote 'The Little Mermaid', and the Brothers Grimm compiled 'Cinderella'!"
      },
      {
        id: 'wizard_merlin', name: 'WIZARD MERLIN', topic: 'WIZARD • QUANTUM & COSMOS', x: 16, y: 8,
        skinColor: '#f5cba7', hatColor: '#1d4ed8', shirtColor: '#93c5fd',
        fact: "WIZARD MERLIN: Dark Matter makes up ~85% of the universe's mass, Dark Energy drives cosmic expansion, and the Event Horizon is a Black Hole's point of no return!"
      },
      {
        id: 'overworld_mew', name: 'MYTHICAL MEW', topic: 'LEGENDARY POKéMON • GENETICS', x: 13, y: 12,
        isMonster: true, monsterId: 'mew', isLegendary: true,
        fact: "MEW: Mew~ (DNA carries genetic information using four nitrogenous bases: Adenine, Thymine, Cytosine, and Guanine!)"
      },
      {
        id: 'human_ecologist_kim', name: 'HUMAN ECOLOGIST KIM', topic: 'HUMAN EXPERIMENTS • GATE OF TRUTH', x: 5, y: 17,
        skinColor: '#f5cba7', hatColor: '#000000', shirtColor: '#555555',
        fact: "HUMAN ECOLOGIST KIM: You kill some of them, they come back stronger. You kill them all, you end their pain. You keep them uneducated, they will keep killing each other, keep torturing each other, keep giving themselves a sustainable life in hell. That is the beauty of tragedy farming."
      }
    ]
  },

  // (2,1) N: Cobalt Boreal • S: Emerald Swamp • W: Magenta Shrubland • E: Beige Village
  FOREST: {
    id: 'FOREST',
    name: 'Teal Forest',
    subtitle: 'N: Cobalt Boreal • S: Emerald Swamp • W: Magenta Shrubland • E: Beige Village',
    theme: { groundA: '#3f6212', groundB: '#365314', path: '#a16207', grass: '#14532d', grassTip: '#22c55e', tree: '#052e16', treeTop: '#15803d' },
    encounters: ['bulbasaur', 'caterpie', 'exeggcute'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T.TTTT..GGGG.PP.GGGG..TTTT.T",
      "T.TTTT..GGGG.PP.GGGG..TTTT.T",
      "T..FF...GGGG.PP.GGGG...FF..T",
      "T..GGG..PPPPPPPPPPPP..GGG..T",
      "T..GGG..P..TTTTTT..P..GGG..T",
      "T..GGG..P..TTTTTT..P..GGG..T",
      "T..FF...P....FF....P...FF..T",
      "T.TTTT..PPPPPPPPPPPP.......T",
      "EPPPPPPP.....PP.....PPPPPPPE",
      "EPPPPPPP.....PP.....PPPPPPPE",
      "T..GGGGGGG...PP...GGGGGGG..T",
      "T..GGGGGGG..PPPP..GGGGGGG..T",
      "T..GGGGGGG.PP..PP.GGGGGGG..T",
      "T...FF.....P.FF.P.....FF...T",
      "T.TTTT....PP....PP....TTTT.T",
      "T.TTTT....PPPPPPPP....TTTT.T",
      "T......GGGG..PP..GGGG......T",
      "T......GGGG..PP..GGGG......T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'NORTHWEST', spawnX: 13, spawnY: 18 },
      south: { targetMap: 'SOUTHWEST', spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'SANCTUARY', spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'CENTER',    spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'botanist_elena', name: 'BOTANIST ELENA', topic: 'BOTANIST • PLANT SCIENCE', x: 13, y: 8,
        skinColor: '#fed7aa', hatColor: '#84cc16', shirtColor: '#bef264',
        fact: "BOTANIST ELENA: Xylem transports water upward from roots, Phloem distributes sugars, and Stomata are tiny leaf pores for gas exchange!"
      },
      {
        id: 'entomologist_bugsy', name: 'ENTOMOLOGIST BUGSY', topic: 'ENTOMOLOGIST • ARTHROPODS', x: 9, y: 4,
        skinColor: '#f5cba7', hatColor: '#65a30d', shirtColor: '#d9f99d',
        fact: "ENTOMOLOGIST BUGSY: Adult insects have 6 legs, 3 body segments (head, thorax, abdomen), breathe through Spiracles/Tracheae, and have Chitin exoskeletons!"
      },
      {
        id: 'farmer_giles', name: 'FARMER GILES', topic: 'FARMER • SOIL & MYCORRHIZA', x: 16, y: 4,
        skinColor: '#a16236', hatColor: '#ca8a04', shirtColor: '#fef08a',
        fact: "FARMER GILES: Mycorrhiza is a beneficial symbiotic relationship between plant roots and fungi that helps crops absorb water and minerals!"
      },
      {
        id: 'carpenter_oakley', name: 'CARPENTER OAKLEY', topic: 'CARPENTER • CELLULOSE WALLS', x: 11, y: 12,
        skinColor: '#5c3317', hatColor: '#92400e', shirtColor: '#fde68a',
        fact: "CARPENTER OAKLEY: Rigid Cell Walls give wood its strength, and a Climax Community is the stable final stage of ecological succession!"
      },
      {
        id: 'overworld_bulbasaur', name: 'FRIENDLY BULBASAUR', topic: 'OVERWORLD POKéMON • BOTANY', x: 15, y: 12,
        isMonster: true, monsterId: 'bulbasaur',
        fact: "BULBASAUR: ♪ Bulba-saur! ♪ (Angiosperms produce seeds enclosed within a fruit, and Chlorophyll absorbs light for photosynthesis!)"
      }
    ]
  },

  // (2,2) N: Slate Mountain • E: Scarlet Savanna • S: Golden Coast • W: Teal Forest
  CENTER: {
    id: 'CENTER',
    name: 'Beige Village',
    subtitle: 'N: Slate Mountain • E: Scarlet Savanna • S: Golden Coast • W: Teal Forest',
    theme: { groundA: '#65a30d', groundB: '#6dab14', path: '#d6b37c', grass: '#15803d', grassTip: '#4ade80', tree: '#14532d', treeTop: '#22c55e' },
    encounters: ['pikachu', 'pidgey', 'rattata', 'eevee', 'chansey', 'ditto'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..FFFF..PPPPPPPPPP..FFFF..T",
      "T.GGGGGG.P..HHHH..P.GGGGGG.T",
      "T.GGGGGG.P..HDDH..P.GGGGGG.T",
      "T.GGGGGG.P........P.GGGGGG.T",
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
        skinColor: '#fed7aa', hatColor: '#f43f5e', shirtColor: '#fda4af', healsParty: true,
        fact: "NURSE JOY: Welcome to the Hub Center! I've fully restored your Party's HP! Remember: the Mitochondria is the powerhouse organelle of a eukaryotic cell that generates ATP!"
      },
      {
        id: 'teacher_cherry', name: 'TEACHER CHERRY', topic: 'TEACHER • CRITICAL THINKING', x: 12, y: 5,
        skinColor: '#f5cba7', hatColor: '#8b5cf6', shirtColor: '#c084fc',
        fact: "TEACHER CHERRY: Welcome back to the Hub Center! Always analyze primary and secondary sources critically before jumping to conclusions!"
      },
      {
        id: 'politician_regina', name: 'POLITICIAN REGINA', topic: 'POLITICIAN • CIVICS & MAVIS', x: 16, y: 5,
        skinColor: '#e59866', hatColor: '#ec4899', shirtColor: '#fbcfe8',
        fact: "POLITICIAN REGINA: I love my jigglypuff so much that I named it Mavis <3<3<3"
      },
      {
        id: 'mavis_jigglypuff', name: 'MAVIS (JIGGLYPUFF)', topic: 'PARTNER POKéMON • SOUND WAVES', x: 17, y: 5,
        isMonster: true, monsterId: 'jigglypuff',
        fact: "MAVIS THE JIGGLYPUFF: ♪ Puuuff~ ♪ (Mavis sings a soothing 440 Hz lullaby! Sound waves are longitudinal mechanical waves that require a medium to travel!)"
      },
      {
        id: 'professor_oak', name: 'PROFESSOR OAK', topic: 'PROFESSOR • MONSTER FACT', x: 13, y: 8,
        skinColor: '#ca8a5b', hatColor: '#0284c7', shirtColor: '#e0f2fe',
        fact: "PROFESSOR OAK: As a professor, I research quiz monsters daily. Remember: You will encounter wild monsters if you walk into the tall grass!"
      },
      {
        id: 'officer_jenny', name: 'OFFICER JENNY', topic: 'POLICEMAN • LOGIC & LAWS', x: 19, y: 6,
        skinColor: '#fde68a', hatColor: '#1e3a8a', shirtColor: '#60a5fa',
        fact: "OFFICER JENNY: Law and order! In binary code, the decimal number 10 is represented as 1010, and an AND Logic Gate outputs TRUE only when both inputs are TRUE!"
      },
      {
        id: 'student_leo', name: 'STUDENT LEO', topic: 'STUDENT • STUDY HABITS', x: 9, y: 8,
        skinColor: '#a16236', hatColor: '#eab308', shirtColor: '#fef08a',
        fact: "STUDENT LEO: I'm revising for my science exam! Did you know Homo sapiens have 32 permanent adult teeth including wisdom teeth?"
      },
      {
        id: 'mathematician_ada', name: 'MATHEMATICIAN ADA', topic: 'MATHEMATICIAN • ALGORITHMS', x: 18, y: 8,
        skinColor: '#fed7aa', hatColor: '#4f46e5', shirtColor: '#c7d2fe',
        fact: "MATHEMATICIAN ADA: According to Ohm's Law, Voltage (V) equals Current (I) multiplied by Resistance (R)!"
      },
      {
        id: 'cleaner_stan', name: 'CLEANER STAN', topic: 'CLEANER • HYGIENE & CHEMISTRY', x: 10, y: 14,
        skinColor: '#784212', hatColor: '#0d9488', shirtColor: '#99f6e4',
        fact: "CLEANER STAN: Keeping the town spotless! Soaps work because their molecules have a hydrophilic head that bonds with water and a hydrophobic tail that traps grease!"
      },
      {
        id: 'game_designer_ken', name: 'GAME DESIGNER KEN', topic: 'GAME DESIGNER • PIXEL SYSTEMS', x: 17, y: 14,
        skinColor: '#fde68a', hatColor: '#db2777', shirtColor: '#f472b6',
        fact: "GAME DESIGNER KEN: A 16x16 sprite grid contains 256 individual pixels! Transistors act as microscopic electronic switches inside every game console!"
      }
    ]
  },

  // (2,3) N: Amber Desert • S: Bronze Reef • W: Beige Village • E: Silver Geyser
  DESERT: {
    id: 'DESERT',
    name: 'Scarlet Savanna',
    subtitle: 'N: Amber Desert • S: Bronze Reef • W: Beige Village • E: Silver Geyser',
    theme: { groundA: '#d97706', groundB: '#b45309', path: '#fde68a', grass: '#9a3412', grassTip: '#fb923c', tree: '#15803d', treeTop: '#4ade80', rock: '#b45309', rockLight: '#fcd34d', rockDark: '#78350f' },
    encounters: ['sandshrew', 'diglett', 'mankey', 'doduo', 'cubone', 'rhyhorn'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..C.GGGG....PP....GGGG.C..R",
      "R...GGGGGG..PPPP..GGGGGG...R",
      "R.C.GGGGGG...PP...GGGGGG.C.R",
      "R...........PPPP...........R",
      "R..CCC.....PP..PP.....CCC..R",
      "R.........PP.WW.PP.........R",
      "R..GGGG..PP.WWWW.PP..GGGG..R",
      "R..GGGG.PP..WWWW..PP.GGGG..R",
      "EPPPPPPPP....WW....PPPPPPPPE",
      "EPPPPPPPP..........PPPPPPPPE",
      "R..GGGG..PPPPPPPPPP..GGGG..R",
      "R..GGGG......PP......GGGG..R",
      "R.C..........PP..........C.R",
      "R...CCC.....PPPP.....CCC...R",
      "R..........PP..PP..........R",
      "R..GGGGGG..P....P..GGGGGG..R",
      "R..GGGGGG..PPPPPP..GGGGGG..R",
      "R..C.........PP.........C..R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'NORTHEAST', spawnX: 13, spawnY: 18 },
      south: { targetMap: 'SOUTHEAST', spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'CENTER',    spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'ONSEN',     spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'psychologist_adler', name: 'DR. ADLER', topic: 'PSYCHOLOGIST • COGNITION', x: 13, y: 11,
        skinColor: '#f5cba7', hatColor: '#4338ca', shirtColor: '#a5b4fc',
        fact: "DR. ADLER: Neurons transmit signals across a microscopic gap called a Synapse using chemical Neurotransmitters, while Myelin insulates axons!"
      },
      {
        id: 'football_player_pele', name: 'FOOTBALLER PELÉ', topic: 'FOOTBALL PLAYER • KINESIOLOGY', x: 8, y: 11,
        skinColor: '#ca8a5b', hatColor: '#16a34a', shirtColor: '#fde047',
        fact: "FOOTBALLER PELÉ: Actin and Myosin are the specialized protein filaments that slide past each other inside muscle fibers, triggered by Calcium ions (Ca2+)!"
      },
      {
        id: 'basketball_player_kobe', name: 'BALLER KOBE', topic: 'BASKETBALL PLAYER • SKELETAL', x: 18, y: 11,
        skinColor: '#784212', hatColor: '#7e22ce', shirtColor: '#facc15',
        fact: "BALLER KOBE: If the body lacks Calcium over time, Osteoporosis will develop, weakening bones! And lacking Vitamin D causes Rickets!"
      },
      {
        id: 'influencer_chloe', name: 'INFLUENCER CHLOE', topic: 'INFLUENCER • COMMUNICATIONS', x: 11, y: 4,
        skinColor: '#fde68a', hatColor: '#ec4899', shirtColor: '#fbcfe8',
        fact: "INFLUENCER CHLOE: Hey besties! Did you know a Portmanteau blends two words together—like 'brunch' or 'podcast'—and a Palindrome reads the same backward?"
      }
    ]
  },

  // (2,4) N: Gray Town • S: Crimson Volcano • W: Scarlet Savanna
  ONSEN: {
    id: 'ONSEN',
    name: 'Silver Geyser',
    subtitle: 'N: Gray Town • S: Crimson Volcano • W: Scarlet Savanna',
    theme: { groundA: '#334155', groundB: '#475569', path: '#fed7aa', grass: '#0f766e', grassTip: '#5eead4', tree: '#7c2d12', treeTop: '#fb923c', rock: '#475569', rockLight: '#cbd5e1', rockDark: '#1e293b' },
    encounters: ['vulpix', 'magmar', 'lickitung'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..SS..WWWW..PP..WWWW..SS..R",
      "R.GGGG.WWWW.PPPP.WWWW.GGGG.R",
      "R.GGGG......P..P......GGGG.R",
      "R..SS..PPPPPP..PPPPPP..SS..R",
      "R......P....S..S....P......R",
      "R.WWWW.P..GGGGGGGG..P.WWWW.R",
      "R.WWWW.P..GGGGGGGG..P.WWWW.R",
      "R......P....S..S....P......R",
      "EPPPPPPPPPPPPPPPPPPPP..SS..R",
      "EPPPPPPPPPPPPPPPPPPPP......R",
      "R..GGGG.....P..P.....GGGG..R",
      "R..GGGG..SS.P..P.SS..GGGG..R",
      "R..GGGG.....P..P.....GGGG..R",
      "R........PPPPPPPPPP........R",
      "R..WWWW..P........P..WWWW..R",
      "R..WWWW..P..S..S..P..WWWW..R",
      "R........PPPP..PPPP........R",
      "R............PP............R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'FOUNDRY', spawnX: 13, spawnY: 18 },
      south: { targetMap: 'VOLCANO', spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'DESERT',  spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'plumber_mario', name: 'PLUMBER MARIO', topic: 'PLUMBER • FLUID PRESSURE', x: 10, y: 4,
        skinColor: '#fde68a', hatColor: '#dc2626', shirtColor: '#2563eb',
        fact: "PLUMBER MARIO: Maintaining the hot spring pipes! Water boils at 100°C at standard pressure, and evaporation turns liquid water into steam!"
      },
      {
        id: 'painter_ross', name: 'PAINTER ROSS', topic: 'PAINTER • PIGMENTS & STEAM', x: 17, y: 4,
        skinColor: '#fed7aa', hatColor: '#f59e0b', shirtColor: '#f8fafc',
        fact: "PAINTER ROSS: Painting happy little steam clouds! When warm moist air hits cool mountain air, water vapor condenses into visible mist!"
      },
      {
        id: 'decorator_vera', name: 'DECORATOR VERA', topic: 'DECORATOR • MINERAL DESIGN', x: 8, y: 8,
        skinColor: '#e59866', hatColor: '#a855f7', shirtColor: '#f3e8ff',
        fact: "DECORATOR VERA: I designed this resort with Quartz and Granite tiles! Quartz is the most abundant mineral in Earth's continental crust!"
      },
      {
        id: 'housekeeper_marta', name: 'HOUSEKEEPER MARTA', topic: 'HOUSEKEEPER • THERMAL CARE', x: 19, y: 9,
        skinColor: '#a16236', hatColor: '#0284c7', shirtColor: '#e0f2fe',
        fact: "HOUSEKEEPER MARTA: Fresh towels for the baths! The First Law of Thermodynamics states that energy cannot be created or destroyed—only transformed!"
      },
      {
        id: 'janitor_scruffy', name: 'JANITOR GLENN', topic: 'JANITOR • SANITATION SCIENCE', x: 11, y: 14,
        skinColor: '#784212', hatColor: '#15803d', shirtColor: '#86efac',
        fact: "JANITOR GLENN: Scrubbing mineral deposits! Hard water contains dissolved Calcium and Magnesium ions picked up from underground Limestone!"
      },
      {
        id: 'spy_bond', name: 'AGENT CIPHER (SPY)', topic: 'SPY • COVERT RECONNAISSANCE', x: 16, y: 14,
        skinColor: '#ca8a5b', hatColor: '#0f172a', shirtColor: '#334155',
        fact: "AGENT CIPHER: Shh—I'm undercover in the steam! Neutrinos are ghostly subatomic particles that pass right through solid matter almost undetected!"
      }
    ]
  },

  // ====================================================================
  // ROW 3: ['KALOS_GROVE', 'SOUTHWEST', 'BEACH', 'SOUTHEAST', 'VOLCANO']
  // ====================================================================

  // (3,0) N: Magenta Shrubland • E: Emerald Swamp
  KALOS_GROVE: {
    id: 'KALOS_GROVE',
    name: 'Jade Jungle',
    subtitle: 'N: Magenta Shrubland • E: Emerald Swamp',
    theme: { groundA: '#14532d', groundB: '#166534', path: '#fde047', grass: '#15803d', grassTip: '#86efac', tree: '#052e16', treeTop: '#4ade80' },
    encounters: ['chespin', 'fennekin', 'froakie','budew'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..FF..GGGG..PP..GGGG..FF..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..FF.......P..P.......FF..T",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....F..F....PGGGG..T",
      "T..GGGGP....FFFF....PGGGG..T",
      "T......P..FFFFFFFF..P......T",
      "T......PPPPPPPPPPPPPP......T",
      "T...........PPPPPPPPPPPPPPPE",
      "T...........PPPPPPPPPPPPPPPE",
      "T......PPPPPPPPPPPPPP......T",
      "T..GGGGP....F..F....PGGGG..T",
      "T..GGGGP............PGGGG..T",
      "T......PPPPPPPPPPPPPP......T",
      "T..FF.......P..P.......FF..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..FF..GGGG..PP..GGGG..FF..T",
      "T............PP............T",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'SANCTUARY', spawnX: 13, spawnY: 18 },
      east:  { targetMap: 'SOUTHWEST', spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'chef_auguste', name: 'CHEF AUGUSTE', topic: 'CULINARY SCIENTIST • MAILLARD', x: 13, y: 8,
        skinColor: '#fed7aa', hatColor: '#ffffff', shirtColor: '#f8fafc',
        fact: "CHEF AUGUSTE: Bon appétit! Welcome to the Kalos starter grove! Plants store solar energy as glucose carbohydrates in their chloroplasts!"
      },
      {
        id: 'f1_racer_jonathan', name: 'F1 RACER JONATHAN', topic: 'F1 RACER • BUDSUM BUDDY', x: 7, y: 5,
        skinColor: '#f5cba7', hatColor: '#dc2626', shirtColor: '#ffffff',
        fact: "F1 RACER JONATHAN: Vroom! Vroom! I Love my buddy so much I named her Budsum!"
      },
      {
        id: 'budsum_budew', name: 'BUDSUM (BUDEW)', topic: 'PARTNER POKéMON • BUDEW', x: 8, y: 5,
        isMonster: true, monsterId: 'budew',
        fact: "BUDSUM THE BUDEW: I love Jonathan too. Budew~ Budew~ <3"
      }
    ]
  },

  // (3,1) N: Teal Forest • S: Purple Woods • W: Jade Jungle • E: Golden Coast
  SOUTHWEST: {
    id: 'SOUTHWEST',
    name: 'Emerald Swamp',
    subtitle: 'N: Teal Forest • S: Purple Woods • W: Jade Jungle • E: Golden Coast',
    theme: { groundA: '#134e4a', groundB: '#115e59', path: '#99f6e4', grass: '#065f46', grassTip: '#34d399', tree: '#042f2e', treeTop: '#0d9488' },
    encounters: ['paras', 'venonat', 'tangela', 'grimer'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T.TTTT..GGGG.PP.GGGG..TTTT.T",
      "T.TTTT..GGGG.PP.GGGG..TTTT.T",
      "T..MM...GGGG.PP.GGGG...MM..T",
      "T..GGG..PPPPPPPPPPPP..GGG..T",
      "T..GGG..P..MMMMMM..P..GGG..T",
      "T..GGG..P..MMMMMM..P..GGG..T",
      "T.......P....FF....P.......T",
      "T.TTTT..PPPPPPPPPPPP.......T",
      "EPPPPPPPPPPPPPPPP...PPPPPPPE",
      "EPPPPPPPPPPPPPPPP...PPPPPPPE",
      "T..GGGGGGG...PP...GGGGGGG..T",
      "T..GGGGGGG..PPPP..GGGGGGG..T",
      "T..GGGGGGG.PP..PP.GGGGGGG..T",
      "T...MM.....P.FF.P.....MM...T",
      "T.TTTT....PP....PP....TTTT.T",
      "T.TTTT....PPPPPPPP....TTTT.T",
      "T......GGGG..PP..GGGG......T",
      "T......GGGG..PP..GGGG......T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'FOREST',      spawnX: 13, spawnY: 18 },
      south: { targetMap: 'BRAMBLE',     spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'KALOS_GROVE', spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'BEACH',       spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'painter_monet', name: 'PAINTER MONET', topic: 'PAINTER • IMPRESSIONISM', x: 10, y: 8,
        skinColor: '#fde68a', hatColor: '#ec4899', shirtColor: '#fbcfe8',
        fact: "PAINTER MONET: Underground layers of water-bearing permeable rock are called Aquifers! And Iodine deficiency causes Goiter!"
      },
      {
        id: 'fashion_designer_coco', name: 'DESIGNER COCO', topic: 'FASHION DESIGNER • TEXTILES', x: 15, y: 8,
        skinColor: '#a16236', hatColor: '#be185d', shirtColor: '#fbcfe8',
        fact: "DESIGNER COCO: Severe dietary protein deficiency causes Kwashiorkor, while Niacin (Vitamin B3) deficiency causes Pellagra!"
      },
      {
        id: 'graphic_designer_saul', name: 'DESIGNER SAUL', topic: 'GRAPHIC DESIGNER • COLOR THEORY', x: 13, y: 12,
        skinColor: '#fed7aa', hatColor: '#7c3aed', shirtColor: '#ddd6fe',
        fact: "DESIGNER SAUL: In traditional subtractive pigment mixing, Red, Yellow, and Blue are the primary colors!"
      },
      {
        id: 'psychopath_rafiki', name: 'PSYCHOPATH RAFIKI', topic: 'FROM FAR FAR AWAY • MANDRILL', x: 2, y: 3,
        skinColor: '#555555', hatColor: '#7c3aed', shirtColor: '#ddd6fe',
        fact: "PSYCHOPATH RAFIKI: Did you know? A psychopath gives birth to another psychopath without the birds and the bees! That is the circle of psychopathic life."
      }
    ]
  },

  // (3,2) N: Beige Village • S: Navy Abyss • W: Emerald Swamp • E: Bronze Reef
  BEACH: {
    id: 'BEACH',
    name: 'Golden Coast',
    subtitle: 'N: Beige Village • S: Navy Abyss • W: Emerald Swamp • E: Bronze Reef',
    theme: { groundA: '#fde047', groundB: '#facc15', path: '#fef08a', grass: '#0d9488', grassTip: '#5eead4', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['squirtle', 'psyduck', 'poliwag', 'krabby'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..K........PPPP........K..T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..GGGGGG....PP....GGGGGG..T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..K.......PP..PP.......K..T",
      "T..FFFF...PP....PP...FFFF..T",
      "T........PPPPPPPPPP........T",
      "T..GGGG..K...PP...K..GGGG..T",
      "EPPPPPPPPPPPPPPPPPPPPPPPPPPE",
      "EPPPPPPPPPPPPBBPPPPPPPPPPPPE",
      "TWWWWWWWWKKKKBBKKKKWWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWW...PPPP...WWWWWWWWT",
      "TWWWWWWWK..GGGGGG..KWWWWWWWT",
      "TWWWWWWWK..GGGGGG..KWWWWWWWT",
      "TWWWWWWWW...PPPP...WWWWWWWWT",
      "TWWWWWWWWWWWWPPWWWWWWWWWWWWT",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'CENTER',    spawnX: 13, spawnY: 18 },
      south: { targetMap: 'ABYSS',     spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'SOUTHWEST', spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'SOUTHEAST', spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'ecologist_lin', name: 'ECOLOGIST LIN', topic: 'ECOLOGIST • MARINE HABITATS', x: 13, y: 7,
        skinColor: '#e59866', hatColor: '#16a34a', shirtColor: '#4ade80',
        fact: "ECOLOGIST LIN: Water covers 71% of Earth! An Estuary is a coastal body where fresh river water meets salt ocean water!"
      },
      {
        id: 'swimmer_marina', name: 'SWIMMER MARINA', topic: 'SWIMMER • HYDROLOGY', x: 10, y: 8,
        skinColor: '#fed7aa', hatColor: '#0284c7', shirtColor: '#7dd3fc',
        fact: "SWIMMER MARINA: Osmosis is the movement of water molecules across a semipermeable membrane, and pure water boils at 100°C at standard pressure!"
      },
      {
        id: 'triathlete_troy', name: 'TRIATHLETE TROY', topic: 'TRIATHLETE • NUTRITION', x: 16, y: 8,
        skinColor: '#a16236', hatColor: '#ea580c', shirtColor: '#fdba74',
        fact: "TRIATHLETE TROY: Swim, bike, run! If the body lacks Thiamine (Vitamin B1), Beriberi will develop; if it lacks Vitamin C, Scurvy will occur!"
      },
      {
        id: 'overworld_squirtle', name: 'FRIENDLY SQUIRTLE', topic: 'OVERWORLD POKéMON • SHELL', x: 13, y: 14,
        isMonster: true, monsterId: 'squirtle',
        fact: "SQUIRTLE: ♪ Squirtle-squirt! ♪ (Limestone is a sedimentary rock formed largely from the skeletal remains of marine organisms!)"
      }
    ]
  },

  // (3,3) N: Scarlet Savanna • S: Obsidian Urban • W: Golden Coast • E: Crimson Volcano
  SOUTHEAST: {
    id: 'SOUTHEAST',
    name: 'Bronze Reef',
    subtitle: 'N: Scarlet Savanna • S: Obsidian Urban • W: Golden Coast • E: Crimson Volcano',
    theme: { groundA: '#f59e0b', groundB: '#d97706', path: '#fef3c7', grass: '#0284c7', grassTip: '#38bdf8', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['tentacool', 'staryu', 'meowth', 'snorlax', 'kangaskhan'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..K........PPPP........K..T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..GGGGGG....PP....GGGGGG..T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..........PP..PP..........T",
      "T..FFFF...PP....PP...FFFF..T",
      "T........PPPPPPPPPP........T",
      "T..GGGG..K...PP...K..GGGG..T",
      "EPPPPPPPPPPPPPPPPPPPPPPPPPPE",
      "EPPPPPPPPPPPPBBPPPPPPPPPPPPE",
      "TWWWWWWWWKKKKBBKKKKWWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWW...PPPP...WWWWWWWWT",
      "TWWWWWWWK..GGGGGG..KWWWWWWWT",
      "TWWWWWWWK..GGGGGG..KWWWWWWWT",
      "TWWWWWWWW...PPPP...WWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'DESERT',       spawnX: 13, spawnY: 18 },
      south: { targetMap: 'SHADOW_ALLEY', spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'BEACH',        spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'VOLCANO',      spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'actor_olivier', name: 'ACTOR OLIVIER', topic: 'ACTOR • DRAMATIC LITERATURE', x: 11, y: 7,
        skinColor: '#f5cba7', hatColor: '#991b1b', shirtColor: '#fecaca',
        fact: "ACTOR OLIVIER: 'Deafening silence' is a classic Oxymoron! And using symbolic characters to express a deeper moral truth is known as an Allegory!"
      },
      {
        id: 'photographer_ansel', name: 'PHOTOGRAPHER ANSEL', topic: 'PHOTOGRAPHER • OPTICS', x: 16, y: 7,
        skinColor: '#fed7aa', hatColor: '#334155', shirtColor: '#cbd5e1',
        fact: "PHOTOGRAPHER ANSEL: The Occipital Lobe of the human brain processes visual information, and lack of Vitamin A causes Night Blindness!"
      },
      {
        id: 'videographer_zack', name: 'VIDEOGRAPHER ZACK', topic: 'VIDEOGRAPHER • PHASE CHANGES', x: 13, y: 10,
        skinColor: '#a16236', hatColor: '#475569', shirtColor: '#e2e8f0',
        fact: "VIDEOGRAPHER ZACK: When water vapor turns directly into ice crystals without becoming liquid first, that phase transition is called Deposition!"
      },
      {
        id: 'chauffeur_jarvis', name: 'CHAUFFEUR JARVIS', topic: 'CHAUFFEUR • KINEMATICS', x: 9, y: 5,
        skinColor: '#e59866', hatColor: '#1e293b', shirtColor: '#94a3b8',
        fact: "CHAUFFEUR JARVIS: Smooth driving relies on physics! Aerodynamic Drag resists a vehicle's forward Thrust, and seatbelts protect passengers against inertia!"
      },
      {
        id: 'captain_ahab', name: 'CAPTAIN AHAB', topic: 'CAPTAIN • CORIOLIS NAVIGATION', x: 12, y: 14,
        skinColor: '#784212', hatColor: '#1e3a8a', shirtColor: '#fde047',
        fact: "CAPTAIN AHAB: Navigating the high seas! The Coriolis Effect deflects moving winds and ocean currents due to Earth's rotation!"
      },
      {
        id: 'sailor_popeye', name: 'SAILOR MARCO', topic: 'SAILOR • SCURVY & NUTRITION', x: 15, y: 14,
        skinColor: '#ca8a5b', hatColor: '#0284c7', shirtColor: '#f8fafc',
        fact: "SAILOR MARCO: Ahoy! Sailors on long ocean voyages eat citrus fruits because lacking Vitamin C causes Scurvy, and lacking Iron causes Anemia!"
      },
      {
        id: 'judge_judith', name: 'JUDGE JUDITH', topic: 'JUDGE • LOGIC & EVIDENCE', x: 18, y: 5,
        skinColor: '#fde68a', hatColor: '#0f172a', shirtColor: '#e2e8f0',
        fact: "JUDGE JUDITH: Order in the court! Sound legal reasoning requires weighing evidence objectively with the Frontal Lobe—the seat of executive judgment!"
      }
    ]
  },

  // (3,4) N: Silver Geyser • W: Bronze Reef
  VOLCANO: {
    id: 'VOLCANO',
    name: 'Crimson Volcano',
    subtitle: 'N: Silver Geyser • W: Bronze Reef',
    theme: { groundA: '#450a0a', groundB: '#7f1d1d', path: '#fca5a5', grass: '#991b1b', grassTip: '#f97316', tree: '#1c1917', treeTop: '#dc2626', rock: '#450a0a', rockLight: '#ef4444', rockDark: '#1c1917' },
    encounters: ['charmander', 'growlithe', 'ponyta'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..LLGGGG....PP....GGGGLL..R",
      "R...GGGGGG..PPPP..GGGGGG...R",
      "R...GGGGGG...PP...GGGGGG...R",
      "R...........PPPP...........R",
      "R..RRR.....PP..PP.....RRR..R",
      "R.........PP.LL.PP.........R",
      "R..GGGG..PP.LLLL.PP..GGGG..R",
      "R..GGGG.PP..LLLL..PP.GGGG..R",
      "EPPPPPPPP....LL....PPPPPPPPR",
      "EPPPPPPPP..........PPPPPPPPR",
      "R..GGGG..PPPPPPPPPP..GGGG..R",
      "R..GGGG......PP......GGGG..R",
      "R............PP............R",
      "R...RRR.....PPPP.....RRR...R",
      "R..........PP..PP..........R",
      "R..GGGGGG..P....P..GGGGGG..R",
      "R..GGGGGG..PPPPPP..GGGGGG..R",
      "R..LL..................LL..R",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'ONSEN',     spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'SOUTHEAST', spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'dj_nova', name: 'DJ NOVA', topic: 'DJ • ACOUSTICS & ELECTRONICS', x: 9, y: 9,
        skinColor: '#f5cba7', hatColor: '#06b6d4', shirtColor: '#cffafe',
        fact: "DJ NOVA: Dropping the bass! Capacitors store energy in an electric field, and Kirchhoff's Current Law states that current entering a node equals current leaving it!"
      },
      {
        id: 'singer_paris', name: 'SINGER PARIS', topic: 'SINGER • VOCAL RESONANCE', x: 11, y: 5,
        skinColor: '#fed7aa', hatColor: '#f43f5e', shirtColor: '#ffe4e6',
        fact: "SINGER PARIS: Heating a gas until its atoms become ionized creates Plasma—the fourth state of matter! And the Kelvin scale starts at Absolute Zero! Do you know who was in Paris before?"
      },
      {
        id: 'guitarist_slash', name: 'GUITARIST AXEL', topic: 'GUITARIST • ELECTROMAGNETISM', x: 16, y: 5,
        skinColor: '#a16236', hatColor: '#111827', shirtColor: '#fca5a5',
        fact: "GUITARIST AXEL: Electric guitar pickups turn string vibrations into current! Current is measured in Amperes, Potential in Volts, and Power in Watts!"
      },
      {
        id: 'drummer_bonzo', name: 'DRUMMER BONZO', topic: 'DRUMMER • RHYTHM & CEREBELLUM', x: 18, y: 9,
        skinColor: '#5c3317', hatColor: '#d97706', shirtColor: '#fef3c7',
        fact: "DRUMMER BONZO: Keeping complex polyrhythms requires the Cerebellum—the part of the brain that coordinates voluntary movement, balance, and timing!"
      },
      {
        id: 'breakdancer_spin', name: 'B-BOY SPIN', topic: 'BREAKDANCER • ANGULAR MOMENTUM', x: 13, y: 12,
        skinColor: '#ca8a5b', hatColor: '#eab308', shirtColor: '#fef08a',
        fact: "B-BOY SPIN: Molten rock underground is Magma, and once it erupts onto the surface it's Lava! Subduction occurs when one tectonic plate sinks under another!"
      },
      {
        id: 'overworld_moltres', name: 'MOLTRES', topic: 'LEGENDARY POKéMON • THERMODYNAMICS', x: 13, y: 4,
        isMonster: true, monsterId: 'moltres', isLegendary: true,
        fact: "MOLTRES: Gyaoooh! (An Endothermic reaction absorbs heat from its surroundings, while an Exothermic reaction releases heat!)"
      },
      {
        id: 'overworld_groudon', name: 'GROUDON', topic: 'LEGENDARY POKéMON • TECTONIC PLATES', x: 16, y: 11,
        isMonster: true, monsterId: 'groudon', isLegendary: true,
        fact: "GROUDON: Grraaah! (Groudon shaped the continents! Orogeny is the geological process where tectonic plate compression builds mountain ranges!)"
      },
      {
        id: 'homeless_nobody', name: 'HOMELESS NOBODY', topic: 'STRANDED • REFUGEE', x: 26, y: 16,
        skinColor: '#ca8a5b', hatColor: 'gray', shirtColor: 'brown',
        fact: "HOMELESS NOBODY: I HAVE NOTHING! I HAVE NOTHING TO LOSE! I HAVE NOTHING TO LOSE! I HAVE NOTHING TO LOSE! I HAVE NOTHING TO LOSE!!!!!!!!!!!"
      }
    ]
  },

  // ====================================================================
  // ROW 4: ['SUNKEN_RUINS', 'BRAMBLE', 'ABYSS', 'SHADOW_ALLEY', 'MOON']
  // ====================================================================

  // (4,0) DETACHED CORNER — FLY ONLY
  SUNKEN_RUINS: {
    id: 'SUNKEN_RUINS',
    name: 'Sapphire Ocean',
    subtitle: 'DETACHED CORNER • ACCESSIBLE BY FLY ONLY',
    theme: { groundA: '#083344', groundB: '#164e63', path: '#67e8f9', grass: '#0e7490', grassTip: '#22d3ee', tree: '#042f2e', treeTop: '#06b6d4', rock: '#155e75', rockLight: '#a5f3fc', rockDark: '#083344' },
    encounters: ['omanyte', 'kabuto'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..KK..GGGG..PP..GGGG..KK..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..KK.......P..P.......KK..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....K..K....PGGGG..R",
      "R..GGGGP....WWWW....PGGGG..R",
      "R......P..KKWWWWKK..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "R...........PPPP...........R",
      "R...........PPPP...........R",
      "R......PPPPPPPPPPPPPP......R",
      "R..GGGGP....K..K....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..KK.......P..P.......KK..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..KK..GGGG......GGGG..KK..R",
      "R..........................R",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {},
    npcs: [
      {
        id: 'archaeologist_indy', name: 'DR. INDIANA', topic: 'MARINE ARCHAEOLOGIST • FOSSILS', x: 13, y: 8,
        skinColor: '#e59866', hatColor: '#78350f', shirtColor: '#fde68a',
        fact: "DR. INDIANA: Sedimentary rock layers preserve marine fossils over millions of years! Ancient Helix and Dome fossils rest in this subtidal reef!"
      },
       {
        id: 'overworld_kyogre', name: 'KYOGRE', topic: 'LEGENDARY POKéMON • HYDROSPHERE', x: 16, y: 7,
        isMonster: true, monsterId: 'kyogre', isLegendary: true,
        fact: "KYOGRE: Vwooooh! (Kyogre expanded the seas! The hydrosphere covers 71% of Earth's surface and regulates global climate!)"
      }
    ]
  },

  // (4,1) N: Emerald Swamp • E: Navy Abyss
  BRAMBLE: {
    id: 'BRAMBLE',
    name: 'Purple Woods',
    subtitle: 'N: Emerald Swamp • E: Navy Abyss',
    theme: { groundA: '#2e1065', groundB: '#14532d', path: '#a855f7', grass: '#15803d', grassTip: '#c084fc', tree: '#1e1b4b', treeTop: '#22c55e' },
    encounters: ['oddish', 'bellsprout', 'weedle', 'ekans', 'zubat', 'koffing'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..UU..GGGG..PP..GGGG..UU..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..UU.......P..P.......UU..T",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....U..U....PGGGG..R",
      "T..GGGGP....MMMM....PGGGG..T",
      "T......P..UUMMMMUU..P......T",
      "T......PPPPPPPPPPPPPP......T",
      "T...........PPPPPPPPPPPPPPPE",
      "T..UU.......P..PPPPPPPPPPPPE",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....U..U....PGGGG..T",
      "T..GGGGP............PGGGG..R",
      "T......PPPPPPPPPPPPPP......T",
      "T..UU.......P..P.......UU..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..UU..GGGG..PP..GGGG..UU..T",
      "T............PP............T",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'SOUTHWEST', spawnX: 13, spawnY: 18 },
      east:  { targetMap: 'ABYSS',     spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'game_tester_zack', name: 'GAME TESTER ZACK', topic: 'GAME TESTER • QA & DEBUGGING', x: 10, y: 4,
        skinColor: '#fed7aa', hatColor: '#16a34a', shirtColor: '#86efac',
        fact: "GAME TESTER ZACK: Testing collision boxes around these giant toadstools! Complete metamorphosis in insects goes Egg, Larva, Pupa, and Adult!"
      },
      {
        id: 'sweet_tester_willy', name: 'SWEET TESTER CANDY', topic: 'SWEET TESTER • PLANT SUGARS', x: 17, y: 4,
        skinColor: '#e59866', hatColor: '#ec4899', shirtColor: '#fbcfe8',
        fact: "SWEET TESTER CANDY: Tasting botanical nectars! In vascular plants, Phloem is the tissue that distributes sweet sugars made during photosynthesis!"
      },
      {
        id: 'toy_tester_woody', name: 'TOY TESTER TOBY', topic: 'TOY TESTER • MATERIAL SAFETY', x: 13, y: 8,
        skinColor: '#f5cba7', hatColor: '#ef4444', shirtColor: '#fde047',
        fact: "TOY TESTER TOBY: Checking durability! Arthropods have tough external skeletons made of Chitin, while plant cells are reinforced by Cell Walls!"
      }
    ]
  },

  // (4,2) N: Golden Coast • W: Purple Woods • E: Obsidian Urban
  ABYSS: {
    id: 'ABYSS',
    name: 'Navy Abyss',
    subtitle: 'N: Golden Coast • W: Purple Woods • E: Obsidian Urban',
    theme: { groundA: '#0f172a', groundB: '#1e3a8a', path: '#38bdf8', grass: '#0369a1', grassTip: '#2dd4bf', tree: '#020617', treeTop: '#0284c7', rock: '#1e293b', rockLight: '#64748b', rockDark: '#020617' },
    encounters: ['horsea', 'goldeen', 'magikarp', 'slowpoke', 'dratini'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..K........PPPP........K..R",
      "R..GGGGGG...PPPP...GGGGGG..R",
      "R..GGGGGG....PP....GGGGGG..R",
      "R..GGGGGG...PPPP...GGGGGG..R",
      "R..........PP..PP..........R",
      "R..WWWW...PP....PP...WWWW..R",
      "R..KKKK..PPPPPPPPPP..KKKK..R",
      "R..GGGG......PP......GGGG..R",
      "EPPPPPPPPPPPPPPPPPPPPPPPPPPE",
      "EPPPPPPPPPPPPBBPPPPPPPPPPPPE",
      "RWWWWWWWWKKKKBBKKKKWWWWWWWWR",
      "RWWWWWWWWWWWWBBWWWWWWWWWWWWR",
      "RWWWWWWWWWWWWBBWWWWWWWWWWWWR",
      "RWWWWWWWW...PPPP...WWWWWWWWR",
      "RWWWWWWWK..GGGGGG..KWWWWWWWR",
      "RWWWWWWWK..GGGGGG..KWWWWWWWR",
      "RWWWWWWWW..........WWWWWWWWR",
      "RWWWWWWWWWWWWWWWWWWWWWWWWWWR",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'BEACH',        spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'BRAMBLE',      spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'SHADOW_ALLEY', spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'scuba_diver_cousteau', name: 'DIVER COUSTEAU', topic: 'SCUBA DIVER • THERMOHALINE', x: 11, y: 7,
        skinColor: '#e59866', hatColor: '#0284c7', shirtColor: '#38bdf8',
        fact: "DIVER COUSTEAU: Thermohaline circulation is the global deep-ocean conveyor belt driven by differences in water temperature and salinity!"
      },
      {
        id: 'overworld_zapdos', name: 'ZAPDOS', topic: 'LEGENDARY POKéMON • BIOELECTRICITY', x: 13, y: 14,
        isMonster: true, monsterId: 'zapdos', isLegendary: true,
        fact: "ZAPDOS: Zzaaap! (Saltwater conducts electricity because dissolved sodium and chloride ions are free to move and carry electric charge!)"
      },
      
    ]
  },

  // (4,3) N: Bronze Reef • W: Navy Abyss
  SHADOW_ALLEY: {
    id: 'SHADOW_ALLEY',
    name: 'Obsidian Urban',
    subtitle: 'N: Bronze Reef • W: Navy Abyss',
    theme: {
      groundA: '#090d16', groundB: '#111827', path: '#27272a',
      grass: '#1e1b4b', grassTip: '#dc2626', tree: '#020617',
      treeTop: '#3f3f46', rock: '#18181b', rockLight: '#52525b', rockDark: '#09090b'
    },
    encounters: ['umbreon', 'murkrow', 'houndoom', 'absol'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..NN..GGGG..PP..GGGG..NN..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..NN.......P..P.......NN..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....N..N....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..NN....NN..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "EPPPPPPPPPPPPPPP...........R",
      "EPPPPPPPPPPPPPPP...........R",
      "R......PPPPPPPPPPPPPP......R",
      "R..GGGGP....N..N....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..NN.......P..P.......NN..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..NN..GGGG......GGGG..NN..R",
      "R..........................R",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'SOUTHEAST', spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'ABYSS',     spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'cereal_killer_crunch', name: 'CEREAL KILLER CRUNCH', topic: 'CEREAL KILLER • GRAIN & NUTRITION', x: 9, y: 4,
        skinColor: '#fed7aa', hatColor: '#dc2626', shirtColor: '#fde047',
        fact: "CEREAL KILLER CRUNCH: Muahaha! I just demolished three boxes of frosted cornflakes! Whole-grain cereals are rich in Thiamine (Vitamin B1), which prevents Beriberi!"
      },
      {
        id: 'gangster_vinnie', name: 'GANGSTER VINNIE', topic: 'GANGSTER • BLACK HOLES & GRAVITY', x: 18, y: 4,
        skinColor: '#ca8a5b', hatColor: '#18181b', shirtColor: '#71717a',
        fact: "GANGSTER VINNIE: Watch your step in these dark alleys, kid! Nothing escapes a Black Hole once it crosses the Event Horizon—not even light, down to the Gravitational Singularity!"
      },
      {
        id: 'criminal_bandit', name: 'CRIMINAL NIGAR', topic: 'CRIMINAL • DARK ENERGY & COSMOS', x: 10, y: 14,
        skinColor: '#000000', hatColor: '#3f3f46', shirtColor: '#e4e4e7',
        fact: "CRIMINAL NIGAR: Hiding in the shadows! Are you Chinese? Give me all your money! Give me your computer! Give me your phones! Give me your passports!"
      },
      {
        id: 'overworld_umbreon', name: 'SHADOW UMBREON', topic: 'DARK POKéMON • BIOLUMINESCENCE', x: 17, y: 8,
        isMonster: true, monsterId: 'umbreon',
        fact: "UMBREON: ★ Umbree-on! ★ (Umbreon's golden rings glow in the dark! A Pulsar is a rapidly rotating neutron star that sweeps beams of radiation across dark space!)"
      },
      {
        id: 'overworld_houndoom', name: 'WILD HOUNDOOM', topic: 'DARK POKéMON • SUPERNOVA', x: 8, y: 8,
        isMonster: true, monsterId: 'houndoom',
        fact: "HOUNDOOM: ★ Awooooo! ★ (Houndoom prowls the midnight alley! When a massive supergiant star explodes at the end of its life cycle, it triggers a Supernova!)"
      },
      {
        id: 'overworld_murkrow', name: 'SCHEMING MURKROW', topic: 'DARK POKéMON • QUASARS', x: 14, y: 14,
        isMonster: true, monsterId: 'murkrow',
        fact: "MURKROW: ♪ Krow-krow! ♪ (Murkrow collects shiny trinkets in the dark! A Quasar is an extremely luminous active galactic nucleus powered by a supermassive black hole!)"
      },
      {
        id: 'overworld_absol', name: 'MYSTIC ABSOL', topic: 'DARK POKéMON • SEISMOLOGY', x: 17, y: 14,
        isMonster: true, monsterId: 'absol',
        fact: "ABSOL: ★ Sol-sol! ★ (Absol senses impending natural disasters! Earthquakes are measured on the Moment Magnitude Scale—formerly the Richter Scale!)"
      }
    ]
  },

  // (4,4) DETACHED CORNER — FLY ONLY (Both MOON and MIRADOURO_LUA keys supported)
  MOON: {
    id: 'MOON',
    name: 'Ruby Badlands',
    subtitle: 'DETACHED CORNER • ACCESSIBLE BY FLY ONLY',
    theme: {
      groundA: '#9a3412', groundB: '#c2410c', path: '#fde68a',
      grass: '#7c2d12', grassTip: '#38bdf8', tree: '#431407',
      treeTop: '#f97316', rock: '#b91c1c', rockLight: '#fca5a5', rockDark: '#450a0a'
    },
    encounters: ['porygon'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..QQ..GGGG......GGGG..QQ..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..QQ.......P..P.......QQ..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....Q..Q....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..QQ....QQ..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "R...........PPPP...........R",
      "R...........PPPP...........R",
      "R......PPPPPPPPPPPPPP......R",
      "R......P..QQ....QQ..P......R",
      "R..GGGGP............PGGGG..R",
      "R..GGGGP....Q..Q....PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..QQ.......P..P.......QQ..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..QQ..GGGG......GGGG..QQ..R",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {},
    npcs: [
      {
        id: 'alien_commander_xylar', name: 'ALIEN COMMANDER XYLAR', topic: 'ALIEN • LUNAR EROSION & GEOLOGY', x: 10, y: 4,
        isAlien: true, skinColor: '#4ade80', hatColor: '#22c55e', shirtColor: '#a855f7',
        fact: "COMMANDER XYLAR: Greetings, Earthling! We landed at Ruby Badlands because its red ochre cliffs and gullies carved by wind and rain erosion look just like the Moon!"
      },
      {
        id: 'alien_navigator_zog', name: 'ALIEN NAVIGATOR ZOG', topic: 'ALIEN • GRAVITY & TIDES', x: 17, y: 4,
        isAlien: true, skinColor: '#4ade80', hatColor: '#4ade80', shirtColor: '#38bdf8',
        fact: "NAVIGATOR ZOG: Bleep-blorp! From this Moon Viewpoint, remember that the Moon's gravitational pull is the primary force driving ocean tides on Earth!"
      },
      {
        id: 'alien_biologist_blorp', name: 'ALIEN SCIENTIST VEX', topic: 'ALIEN • ASTROBIOLOGY & DNA', x: 10, y: 15,
        isAlien: true, skinColor: '#4ade80', hatColor: '#10b981', shirtColor: '#f472b6',
        fact: "SCIENTIST VEX: Scanning terrestrial lifeforms! Earth organisms encode genetic information in DNA using four nitrogenous bases: Adenine, Thymine, Cytosine, and Guanine!"
      },
      {
        id: 'alien_scout_orion', name: 'ALIEN SCOUT ORION', topic: 'ALIEN • WORMHOLES & SPACETIME', x: 17, y: 15,
        isAlien: true, skinColor: '#4ade80', hatColor: '#84cc16', shirtColor: '#fde047',
        fact: "SCOUT ORION: Our saucer warped here through an Einstein-Rosen bridge—also known in physics as a Wormhole connecting distant points in spacetime!"
      },
      {
        id: 'overworld_deoxys', name: 'COSMIC DEOXYS', topic: 'EXTRATERRESTRIAL POKéMON • COSMOS', x: 13, y: 8,
        isMonster: true, monsterId: 'deoxys', isLegendary: true,
        fact: "DEOXYS: Vwooo-shhh! (Deoxys crystallized from a space virus inside a meteor! Gamma rays are the highest-energy electromagnetic radiation in the cosmos!)"
      }
    ]
  },

  // ====================================================================
  // EAST ASIA REGION (LINKED TO BEIGE VILLAGE VIA 2x2 PORTAL AT 50 DEX)
  // ====================================================================

  // E1. HONG_KONG -> Ivory City
  HONG_KONG: {
    id: 'HONG_KONG',
    name: 'Ivory City',
    subtitle: 'N: Crimson Walls • E: Green Island • W: Bronze Casino • PORTAL: Beige Village',
    region: 'EAST_ASIA',
    theme: { groundA: '#1e293b', groundB: '#334155', path: '#f43f5e', grass: '#0d9488', grassTip: '#2dd4bf', tree: '#0f172a', treeTop: '#fb7185', rock: '#475569', rockLight: '#cbd5e1', rockDark: '#0f172a' },
    encounters: ['persian', 'gyarados'],
    rows: [
      "HHHHHHHHHHHHHEEHHHHHHHHHHHHH",
      "H..YYYY..PPPPPPPPPP..YYYY..H",
      "H.GGGGGG.P..HHHH..P.GGGGGG.H",
      "H.GGGGGG.P..HDDH..P.GGGGGG.H",
      "H........P........P........H",
      "H..YYYY..PPPPPPPPPP..YYYY..H",
      "H........P........P........H",
      "H.GGGGGG.P.PPPPPP.P.GGGGGG.H",
      "H........P.P....P.P........H",
      "EPPPPPPPPP.P....P.PPPPPPPPPE",
      "EPPPPPPPPP.P....P.PPPPPPPPPE",
      "H........P.PPPPPP.P........H",
      "HWWWWWWWWP........PWWWWWWWWH",
      "HWWWWWWWWBBBBBBBBBBWWWWWWWWH",
      "HWWWWWWWWPPPPPPPPPPWWWWWWWWH",
      "H..YYYY......PP......YYYY..H",
      "H.GGGGGGG.PPPPPPPP.GGGGGGG.H",
      "H.GGGGGGG.P..FF..P.GGGGGGG.H",
      "H.........P......P.........H",
      "HHHHHHHHHHHHHHHHHHHHHHHHHHHH"
    ],
    exits: {
      north: { targetMap: 'CHINA',  spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'MACAU',  spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'TAIWAN', spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'hk_investment_banker', name: 'BANKER KEVIN (CENTRAL)', topic: 'INVESTMENT BANKER • COMPOUND INTEREST', x: 10, y: 5,
        skinColor: '#fde68a', hatColor: '#0f172a', shirtColor: '#38bdf8',
        fact: "INVESTMENT BANKER KEVIN: Time is money in Central IFC! Compound interest grows exponentially, and the Hang Seng Index tracks the largest companies on the Hong Kong Stock Exchange!"
      },
      {
        id: 'hk_lion_dancer', name: 'SIFU WONG (LION DANCER)', topic: 'LION DANCER • ACOUSTICS & KINEMATICS', x: 17, y: 5,
        skinColor: '#f5cba7', hatColor: '#dc2626', shirtColor: '#facc15',
        fact: "LION DANCER SIFU WONG: Kung Hei Fat Choy! High-pole Lion Dancing requires explosive skeletal muscle ATP and precise balance coordinated by the brain's Cerebellum!"
      },
      {
        id: 'hk_dim_sum_chef', name: 'DIM SUM MASTER CHAN', topic: 'DIM SUM CHEF • STEAM CONVECTION', x: 11, y: 8,
        skinColor: '#fed7aa', hatColor: '#f8fafc', shirtColor: '#ffffff',
        fact: "DIM SUM MASTER CHAN: Har Gow and Siu Mai! Bamboo steamers cook dumplings evenly because rising water vapor releases latent heat of vaporization when it condenses!"
      },
      {
        id: 'hk_star_ferry_captain', name: 'CAPTAIN LEUNG (STAR FERRY)', topic: 'FERRY CAPTAIN • BUOYANCY', x: 12, y: 13,
        skinColor: '#e59866', hatColor: '#15803d', shirtColor: '#f8fafc',
        fact: "CAPTAIN LEUNG: Crossing Victoria Harbour since 1888! By Archimedes' Principle, our Star Ferry floats because the upward buoyant force equals the weight of displaced seawater!"
      },
      {
        id: 'hk_ding_ding_driver', name: 'DRIVER UNCLE HO (DING DING)', topic: 'TRAM DRIVER • OVERHEAD CIRCUITS', x: 18, y: 11,
        skinColor: '#ca8a5b', hatColor: '#166534', shirtColor: '#4ade80',
        fact: "UNCLE HO: Ding-Ding! Hong Kong's double-decker trams draw direct current (DC) electricity from overhead pantograph wires and complete the circuit through the steel rails!"
      },
      {
        id: 'hk_nurse_joy', name: 'NURSE JOY (HK)', topic: 'NURSE • PARTY HEAL', x: 14, y: 4,
        skinColor: '#fed7aa', hatColor: '#f43f5e', shirtColor: '#fda4af', healsParty: true,
        fact: "NURSE JOY: Welcome to Ivory City! I've fully healed your Pokémon party! Step into the glowing 2×2 Portal in the center whenever you want to warp back to Beige Village!"
      },
      {
        id: 'overworld_lugia', name: 'GUARDIAN LUGIA', topic: 'LEGENDARY POKéMON • OCEAN STORMS', x: 25, y: 13,
        isMonster: true, monsterId: 'lugia', isLegendary: true,
        fact: "LUGIA: Gyaaaoh! (Lugia calms raging typhoons across Victoria Harbour! The character 水 [shuǐ] means Water and 風 [fēng] means Wind!)"
      }
    ]
  },

  // E2. MACAU -> Bronze Casino
  MACAU: {
    id: 'MACAU',
    name: 'Bronze Casino',
    subtitle: 'E: Ivory City • SLOT MACHINES & NEON LIGHTS',
    region: 'EAST_ASIA',
    theme: { groundA: '#064e3b', groundB: '#047857', path: '#fde047', grass: '#0f766e', grassTip: '#5eead4', tree: '#022c22', treeTop: '#fbbf24', rock: '#1e293b', rockLight: '#fef08a', rockDark: '#0f172a' },
    encounters: ['flareon', 'jolteon'],
    rows: [
      "HHHHHHHHHHHHHHHHHHHHHHHHHHHH",
      "H..XX..GGGG......GGGG..XX..H",
      "H......GGGG.PPPP.GGGG......H",
      "H..YY.......P..P.......YY..H",
      "H......PPPPPP..PPPPPP......H",
      "H..GGGGP....X..X....PGGGG..H",
      "H..GGGGP....HHHH....PGGGG..H",
      "H......P..YYHHHHYY..P......H",
      "H......PPPPPPPPPPPPPP......H",
      "H...........PPPPPPPPPPPPPPPE",
      "H...........PPPPPPPPPPPPPPPE",
      "H......PPPPPPPPPPPPPP......H",
      "H..GGGGP....X..X....PGGGG..H",
      "H..GGGGP............PGGGG..H",
      "H......PPPPPPPPPPPPPP......H",
      "H..XX.......P..P.......XX..H",
      "H......GGGG.PPPP.GGGG......H",
      "H..XX..GGGG......GGGG..XX..H",
      "HWWWWWWWWWWWWWWWWWWWWWWWWWWH",
      "HHHHHHHHHHHHHHHHHHHHHHHHHHHH"
    ],
    exits: {
      east: { targetMap: 'HONG_KONG', spawnX: 1, spawnY: 9 }
    },
    npcs: [
      {
        id: 'macau_egg_tart_baker', name: 'BAKER FERNANDO', topic: 'PASTRY CHEF • CARAMELIZATION', x: 11, y: 5,
        skinColor: '#f5cba7', hatColor: '#f59e0b', shirtColor: '#fef3c7',
        fact: "BAKER FERNANDO: Pastéis de Nata! Baking Portuguese egg tarts at high heat triggers the Maillard reaction and caramelization of sucrose!"
      },
      {
        id: 'macau_probability_prof', name: 'PROFESSOR PASCAL', topic: 'MATHEMATICIAN • PROBABILITY', x: 16, y: 11,
        skinColor: '#fed7aa', hatColor: '#7e22ce', shirtColor: '#e9d5ff',
        fact: "PROFESSOR PASCAL: Expected Value in probability theory proves the house always has a mathematical edge over the long run!"
      },
      {
        id: 'overworld_palkia', name: 'PALKIA', topic: 'LEGENDARY POKéMON • SPATIAL DIMENSIONS', x: 13, y: 11,
        isMonster: true, monsterId: 'palkia', isLegendary: true,
        fact: "PALKIA: Gggaaah! (Palkia warps space across Bronze Casino! The Chinese character 天 [tiān] means Sky/Heaven!)"
      }
    ]
  },

  // E3. CHINA -> Crimson Walls
  CHINA: {
    id: 'CHINA',
    name: 'Crimson Walls',
    subtitle: 'S: Ivory City • N: Khaki Plains • E: Monster Island',
    region: 'EAST_ASIA',
    theme: { groundA: '#7f1d1d', groundB: '#991b1b', path: '#facc15', grass: '#b91c1c', grassTip: '#fde047', tree: '#450a0a', treeTop: '#ef4444', rock: '#57534e', rockLight: '#d6d3d1', rockDark: '#1c1917' },
    encounters: ['arcanine', 'dragonair'],
    rows: [
      "ZZZZZZZZZZZZZEEZZZZZZZZZZZZZ",
      "Z............PP............Z",
      "ZZZZZZZZZZZZZPPPPPPZZZZZZZZZ",
      "ZZZZZZZZZZZZZZZZZPPGGGGGGGGZ",
      "R..GGGG..PPPPPPPPPP..GGGG..R",
      "R..GGGG..P........P..GGGG..R",
      "R........P..ZZZZ..P........R",
      "R..ZZZZ..P..ZZZZ..P..ZZZZ..R",
      "R........PPPPPPPPPP........R",
      "R...........PPPPPPPPPPPPPPPE",
      "R...........PPPPPPPPPPPPPPPE",
      "R..GGGG..PPPPPPPPPP..GGGG..R",
      "R..GGGG..P........P..GGGG..R",
      "R........P..FFFF..P........R",
      "R..ZZZZ..P..FFFF..P..ZZZZ..R",
      "R........PPPPPPPPPP........R",
      "R..GGGGGG....PP....GGGGGG..R",
      "R..GGGGGG....PP....GGGGGG..R",
      "R............PP............R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      south: { targetMap: 'HONG_KONG', spawnX: 13, spawnY: 1 },
      north: { targetMap: 'MONGOLIA',  spawnX: 13, spawnY: 18 },
      east:  { targetMap: 'JAPAN',     spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'china_wall_historian', name: 'HISTORIAN SIMA', topic: 'HISTORIAN • GREAT WALL ENGINEERING', x: 13, y: 4,
        skinColor: '#fde68a', hatColor: '#dc2626', shirtColor: '#fde047',
        fact: "HISTORIAN SIMA: Behold the Great Wall across the northern ridge! Ancient builders mixed sticky rice mortar (amylopectin starch) with slaked lime (calcium carbonate) to bind the stone bricks!"
      },
      {
        id: 'china_botanist_li', name: 'HERBALIST LI SHIZHEN', topic: 'BOTANIST • PHARMACOGNOSY', x: 10, y: 12,
        skinColor: '#f5cba7', hatColor: '#15803d', shirtColor: '#bbf7d0',
        fact: "HERBALIST LI: Tea leaves (Camellia sinensis) contain caffeine and polyphenols! Boiling water also sterilized drinking water throughout ancient history!"
      },
      {
        id: 'overworld_rayquaza', name: 'JADE RAYQUAZA', topic: 'LEGENDARY POKéMON • CELESTIAL DRAGON', x: 13, y: 8,
        isMonster: true, monsterId: 'rayquaza', isLegendary: true,
        fact: "RAYQUAZA: Kyuraaaah! (Rayquaza soars above Crimson Walls! The Chinese character for Dragon is 龍 [lóng]!)"
      }
    ]
  },

  // E4. TAIWAN -> Green Island
  TAIWAN: {
    id: 'TAIWAN',
    name: 'Green Island',
    subtitle: 'W: Ivory City • N: Monster Island • PLUM BLOSSOMS',
    region: 'EAST_ASIA',
    theme: { groundA: '#065f46', groundB: '#047857', path: '#fcd34d', grass: '#15803d', grassTip: '#86efac', tree: '#064e3b', treeTop: '#34d399', rock: '#475569', rockLight: '#cbd5e1', rockDark: '#1e293b' },
    encounters: ['ivysaur', 'gloom'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..OO..GGGG..PP..GGGG..OO..T",
      "T......GGGG.PPPP.GGGG..OO..T",
      "T..OO.......P..P.......RR..T",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....O..O....PGGGG..T",
      "T..GGGGP............PGGGG..T",
      "T......P..OO....OO..P......T",
      "T......PPPPPPPPPPPPPP......T",
      "EPPPPPPPPPPPPPPPP..........T",
      "EPPPPPPPPPPPPPPPP..........T",
      "T......PPPPPPPPPPPPPP......T",
      "TWWWWWWP............P..OO..T",
      "TWWWWWWP....O..O....P..OO..T",
      "TWWWWWWPPPPPPPPPPPPPP......T",
      "T...........P..P...........T",
      "T......GGGG.PPPP.GGGG......T",
      "T......GGGG......GGGG......T",
      "TWWWWWWWWWWWWWWWWWWWWWWWWWWT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      west:  { targetMap: 'HONG_KONG', spawnX: 26, spawnY: 9 },
      north: { targetMap: 'JAPAN',     spawnX: 13, spawnY: 18 }
    },
    npcs: [
      {
        id: 'taiwan_chip_engineer', name: 'ENGINEER MORRIS', topic: 'SEMICONDUCTOR ENG. • PHOTOLITHOGRAPHY', x: 10, y: 5,
        skinColor: '#fde68a', hatColor: '#0284c7', shirtColor: '#e0f2fe',
        fact: "ENGINEER MORRIS: Green Island fabricates the world's most advanced microchips! Extreme Ultraviolet (EUV) photolithography etches silicon transistors smaller than 3 nanometers!"
      },
      {
        id: 'taiwan_boba_vendor', name: 'VENDOR MEI (NIGHT MARKET)', topic: 'FOOD SCIENTIST • TAPIOCA POLYMERS', x: 16, y: 11,
        skinColor: '#fed7aa', hatColor: '#d97706', shirtColor: '#fef3c7',
        fact: "VENDOR MEI: Bubble tea pearls are made from cassava root starch! Boiling gelatinizes the starch polymers into chewy, elastic spheres!"
      },
      {
        id: 'overworld_suicune', name: 'SUICUNE', topic: 'LEGENDARY POKéMON • PURE SPRING WATER', x: 13, y: 8,
        isMonster: true, monsterId: 'suicune', isLegendary: true,
        fact: "SUICUNE: Shuuu-aaah! (Suicune purifies mountain springs among the Plum Blossoms! The character 花 [huā] means Flower!)"
      }
    ]
  },

  // E5. JAPAN -> Monster Island
  JAPAN: {
    id: 'JAPAN',
    name: 'Monster Island',
    subtitle: 'W: Crimson Walls • S: Green Island • N: Neon Plaza',
    region: 'EAST_ASIA',
    theme: { groundA: '#4c1d95', groundB: '#5b21b6', path: '#fbcfe8', grass: '#be185d', grassTip: '#f9a8d4', tree: '#3b0764', treeTop: '#f472b6', rock: '#64748b', rockLight: '#f8fafc', rockDark: '#1e293b' },
    encounters: ['charmeleon', 'wartortle'],
    rows: [
      "JJJJJJJJJJJJJEEJJJJJJJJJJJJJ",
      "J..JJ..GGGG..PP..GGGG..SS..J",
      "J......GGGG.PPPP.GGGG..SS..J",
      "J..JJ.......P..P...........J",
      "J......PPPPPP..PPPPPP......J",
      "J..GGGGP...RRRRRR...PGGGG..J",
      "J..GGGGP..RIIIIIIR..PGGGG..J",
      "J......P..RIIIIIIR..P......J",
      "J......PPPPPPPPPPPPPP......J",
      "EPPPPPPPPPPPPPPPP..........J",
      "EPPPPPPPPPPPPPPPP..........J",
      "J......PPPPPPPPPPPPPP......J",
      "J..SS..P....J..J....P..JJ..J",
      "J..SS..P............P..JJ..J",
      "J......PPPPPPPPPPPPPP......J",
      "J...........P..P...........J",
      "J......GGGG.PPPP.GGGG......J",
      "J..JJ..GGGG..PP..GGGG..JJ..J",
      "J............PP............J",
      "JJJJJJJJJJJJJEEJJJJJJJJJJJJJ"
    ],
    exits: {
      west:  { targetMap: 'CHINA',       spawnX: 26, spawnY: 9 },
      south: { targetMap: 'TAIWAN',      spawnX: 13, spawnY: 1 },
      north: { targetMap: 'SOUTH_KOREA', spawnX: 13, spawnY: 18 }
    },
    npcs: [
      {
        id: 'japan_shinkansen_eng', name: 'ENGINEER HIDEO (SHINKANSEN)', topic: 'RAILWAY ENG. • BIOMIMICRY & MAGLEV', x: 10, y: 8,
        skinColor: '#fde68a', hatColor: '#1d4ed8', shirtColor: '#f8fafc',
        fact: "ENGINEER HIDEO: The Shinkansen bullet train's nose cone was modeled after a Kingfisher's beak to eliminate sonic booms when exiting tunnels!"
      },
      {
        id: 'japan_seismologist', name: 'DR. OMORI', topic: 'SEISMOLOGIST • PACIFIC RING OF FIRE', x: 17, y: 8,
        skinColor: '#f5cba7', hatColor: '#dc2626', shirtColor: '#fde047',
        fact: "DR. OMORI: Mount Fuji is a stratovolcano formed along a tectonic subduction zone! Monster Island uses base-isolation shock absorbers so skyscrapers sway safely during earthquakes!"
      },
      {
        id: 'overworld_ho_oh', name: 'RAINBOW HO-OH', topic: 'LEGENDARY POKéMON • SACRED PHOENIX', x: 13, y: 4,
        isMonster: true, monsterId: 'ho_oh', isLegendary: true,
        fact: "HO-OH: Kyaaaooh! (Ho-Oh's wings glow in seven rainbow colors above the Cherry Blossoms! The character 火 [huǒ] means Fire!)"
      }
    ]
  },

  // E6. SOUTH_KOREA -> Neon Plaza
  SOUTH_KOREA: {
    id: 'SOUTH_KOREA',
    name: 'Neon Plaza',
    subtitle: 'S: Monster Island • KIMCHI ONGGI JARS & ESPORTS ARENA',
    region: 'EAST_ASIA',
    theme: { groundA: '#1e1b4b', groundB: '#312e81', path: '#93c5fd', grass: '#1d4ed8', grassTip: '#60a5fa', tree: '#0f172a', treeTop: '#ec4899', rock: '#334155', rockLight: '#e2e8f0', rockDark: '#0f172a' },
    encounters: ['vaporeon', 'raichu'],
    rows: [
      "HHHHHHHHHHHHHHHHHHHHHHHHHHHH",
      "H..kk..GGGG......GGGG..YY..H",
      "H......GGGG.PPPP.GGGG......H",
      "H..kk.......P..P.......YY..H",
      "H......PPPPPP..PPPPPP......H",
      "H..GGGGP....k..k....PGGGG..H",
      "H..GGGGP............PGGGG..H",
      "H......P..kk....kk..P......H",
      "H......PPPPPPPPPPPPPP......H",
      "HWWWWWWWWWWWBBBBWWWWWWWWWWWH",
      "HWWWWWWWWWWWBBBBWWWWWWWWWWWH",
      "H......PPPPPPPPPPPPPP......H",
      "H..GGGGP....Y..Y....PGGGG..H",
      "H..GGGGP............PGGGG..H",
      "H......PPPPPPPPPPPPPP......H",
      "H..kk.......P..P.......YY..H",
      "H......GGGG.PPPP.GGGG......H",
      "H..kk..GGGG..PP..GGGG..YY..H",
      "H............PP............H",
      "HHHHHHHHHHHHHEEHHHHHHHHHHHHH"
    ],
    exits: {
      south: { targetMap: 'JAPAN', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'korea_food_microbiologist', name: 'CHEF JI-YOON', topic: 'MICROBIOLOGIST • LACTIC FERMENTATION', x: 11, y: 5,
        skinColor: '#fde68a', hatColor: '#e11d48', shirtColor: '#ffe4e6',
        fact: "CHEF JI-YOON: Traditional Kimchi is preserved by Lactobacillus bacteria! Through anaerobic fermentation, they convert sugars into lactic acid, lowering pH and boosting Vitamin C!"
      },
      {
        id: 'korea_pro_gamer', name: 'PRO GAMER SANG-HYEOK', topic: 'ESPORTS PRO • REFLEX ARCS & MYELIN', x: 16, y: 12,
        skinColor: '#fed7aa', hatColor: '#2563eb', shirtColor: '#dbeafe',
        fact: "PRO GAMER SANG-HYEOK: Hitting 400 Actions Per Minute relies on myelinated motor neurons conducting action potentials from the motor cortex to your fingers in milliseconds!"
      },
      {
        id: 'overworld_raikou', name: 'THUNDER RAIKOU', topic: 'LEGENDARY POKéMON • LIGHTNING SPEED', x: 13, y: 8,
        isMonster: true, monsterId: 'raikou', isLegendary: true,
        fact: "RAIKOU: Raaai-kou! (Raikou rides thunderclouds across the Han River! The character 電 [diàn] means Electricity!)"
      }
    ]
  },

  // E7. MONGOLIA -> Khaki Plains
  MONGOLIA: {
    id: 'MONGOLIA',
    name: 'Khaki Plains',
    subtitle: 'S: Crimson Walls • MONGOLIAN YURTS & STEPPE',
    region: 'EAST_ASIA',
    theme: { groundA: '#ca8a04', groundB: '#a16207', path: '#fef08a', grass: '#4d7c0f', grassTip: '#a3e635', tree: '#365314', treeTop: '#84cc16', rock: '#78350f', rockLight: '#fde68a', rockDark: '#451a03' },
    encounters: ['tauros', 'rapidash'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..gg..GGGG......GGGG..gg..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..gg.......P..P.......gg..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....g..g....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..gg....gg..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "R...........PPPP...........R",
      "R...........PPPP...........R",
      "R......PPPPPPPPPPPPPP......R",
      "R..GGGGP....g..g....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..gg.......P..P.......gg..R",
      "R..GGGGGGGG.PPPP.GGGGGGGG..R",
      "R..GGGGGGGG..PP..GGGGGGGG..R",
      "R............PP............R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      south: { targetMap: 'CHINA', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'mongolia_throat_singer', name: 'KHOOMEI MASTER BATBAYAR', topic: 'ACOUSTICIAN • OVERTONE HARMONICS', x: 10, y: 8,
        skinColor: '#e59866', hatColor: '#0284c7', shirtColor: '#fde047',
        fact: "MASTER BATBAYAR: Traditional Mongolian throat singing (Khoomei) shapes the vocal tract as a resonator to amplify two distinct harmonic frequencies at the exact same time!"
      },
      {
        id: 'mongolia_gobi_paleo', name: 'NOMADIC RANGER ALTAN', topic: 'PALEONTOLOGIST • GOBI DINOSAUR EGGS', x: 16, y: 12,
        skinColor: '#ca8a5b', hatColor: '#78350f', shirtColor: '#fed7aa',
        fact: "RANGER ALTAN: The Flaming Cliffs of the Gobi Desert were where the first fossilized dinosaur eggs and Velociraptor skeletons were discovered in the 1920s!"
      },
      {
        id: 'overworld_entei', name: 'VOLCANIC ENTEI', topic: 'LEGENDARY POKéMON • STEPPE FLAME', x: 13, y: 8,
        isMonster: true, monsterId: 'entei', isLegendary: true,
        fact: "ENTEI: Bwooo-oh! (Entei races across Khaki Plains! The character 山 [shān] means Mountain!)"
      }
    ]
  },

  NORTH_KOREA: {
    id: 'NORTH_KOREA',
    name: 'Crimson Monolith (North Korea)',
    subtitle: 'LANDLOCKED FORTRESS - ACCESSIBLE BY FLY ONLY',
    region: 'EAST_ASIA',
    theme: { groundA: '#334155', groundB: '#1e293b', path: '#94a3b8', grass: '#475569', grassTip: '#ef4444', tree: '#0f172a', treeTop: '#dc2626', rock: '#1e293b', rockLight: '#cbd5e1', rockDark: '#020617' },
    encounters: ['poochyena', 'mightyena', 'gulpin', 'swalot', 'baltoy', 'claydol', 'registeel'],
    rows: [
      "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",
      "Z..uu..GGGG......GGGG..uu..Z",
      "Z......GGGG.PPPP.GGGG......Z",
      "Z..uu.......P..P.......uu..Z",
      "Z......PPPPPP..PPPPPP......Z",
      "Z..GGGGP....u..u....PGGGG..Z",
      "Z..GGGGP............PGGGG..Z",
      "Z......P..uu....uu..P......Z",
      "Z......PPPPPPPPPPPPPP......Z",
      "Z...........PPPP...........Z",
      "Z...........PPPP...........Z",
      "Z......PPPPPPPPPPPPPP......Z",
      "Z..GGGGP....u..u....PGGGG..Z",
      "Z..GGGGP............PGGGG..Z",
      "Z......PPPPPPPPPPPPPP......Z",
      "Z..uu.......P..P.......uu..Z",
      "Z......GGGG.PPPP.GGGG......Z",
      "Z..uu..GGGG......GGGG..uu..Z",
      "Z..........................Z",
      "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
    ],
    exits: {},
    npcs: [
      { id: 'nk_rocket_1', name: 'UNIFORM GRUNT #01', topic: 'SYNCHRONIZED BRIGADE - CONFORMITY', x: 9,  y: 4,  skinColor: '#fde68a', hatColor: '#111827', shirtColor: '#dc2626', fact: "UNIFORM GRUNT #01: Prepare for trouble in strict formation! We all wear the exact same black-and-red Team Rocket uniform!" },
      { id: 'nk_rocket_2', name: 'UNIFORM GRUNT #02', topic: 'SYNCHRONIZED BRIGADE - MARCHING',   x: 18, y: 4,  skinColor: '#fde68a', hatColor: '#111827', shirtColor: '#dc2626', fact: "UNIFORM GRUNT #02: Make it double in unison! When marching Soldiers step in cadence on a bridge, mechanical resonance can amplify oscillations!" },
      { id: 'nk_rocket_3', name: 'UNIFORM GRUNT #03', topic: 'SYNCHRONIZED BRIGADE - OPTICS',     x: 9,  y: 8,  skinColor: '#fde68a', hatColor: '#111827', shirtColor: '#dc2626', fact: "UNIFORM GRUNT #03: Standing at attention! In stadium card stunts, thousands of people flip colored placards like pixels on a giant raster display!" },
      { id: 'nk_rocket_4', name: 'UNIFORM GRUNT #04', topic: 'SYNCHRONIZED BRIGADE - RADIO',      x: 18, y: 8,  skinColor: '#fde68a', hatColor: '#111827', shirtColor: '#dc2626', fact: "UNIFORM GRUNT #04: All borders are sealed! Only shortwave radio frequencies reflect off the Earth's ionosphere via skywave propagation!" },
      { id: 'nk_rocket_5', name: 'UNIFORM GRUNT #05', topic: 'SYNCHRONIZED BRIGADE - ACOUSTICS',  x: 9,  y: 14, skinColor: '#fde68a', hatColor: '#111827', shirtColor: '#dc2626', fact: "UNIFORM GRUNT #05: Loudspeakers broadcast across the plaza! Sound intensity follows the inverse-square law as distance increases!" },
      { id: 'nk_rocket_6', name: 'UNIFORM GRUNT #06', topic: 'SYNCHRONIZED BRIGADE - STATICS',    x: 18, y: 14, skinColor: '#fde68a', hatColor: '#111827', shirtColor: '#dc2626', fact: "UNIFORM GRUNT #06: No exits by land—you could only Fly in and must Fly out! Granite monuments resist compressive stress for centuries!" },
      { id: 'overworld_registeel', name: 'IRON REGISTEEL', topic: 'LEGENDARY POKEMON - TEMPERED ALLOY', x: 13, y: 8, isMonster: true, monsterId: 'registeel', isLegendary: true, fact: "REGISTEEL: Zzz-klink! (Registeel's body was forged under immense subterranean pressure into an indestructible metal lattice!)" }
    ]
  },

  // ====================================================================
  // WEST EUROPE REGION (UK, IRELAND, FRANCE, GERMANY, SPAIN, PORTUGAL)
  // ====================================================================

  // W1. UK (Royal Clockwork Hub - W: Ireland • S: France • 2x2 Portal)
  UK: {
    id: 'UK',
    name: 'Royal Thames Hub (UK)',
    subtitle: 'W: Emerald Cliffs (Ireland) - S: Lumiere Champs (France) - PORTAL: Beige Village',
    region: 'WEST_EUROPE',
    theme: { groundA: '#1e293b', groundB: '#334155', path: '#cbd5e1', grass: '#15803d', grassTip: '#4ade80', tree: '#0f172a', treeTop: '#16a34a', rock: '#475569', rockLight: '#e2e8f0', rockDark: '#0f172a' },
    encounters: ['sentret', 'hoothoot', 'snubbull', 'porygon2', 'togepi', 'cleffa', 'igglybuff'],
    rows: [
      "HHHHHHHHHHHHHHHHHHHHHHHHHHHH",
      "H..NNNN..PPPPPPPPPP..NNNN..H",
      "H.GGGGGG.P..HHHH..P.GGGGGG.H",
      "H.GGGGGG.P..HDDH..P.GGGGGG.H",
      "H........P........P........H",
      "H..NNNN..PPPPPPPPPP..NNNN..H",
      "H........P........P........H",
      "H.GGGGGG.P.PPPPPP.P.GGGGGG.H",
      "H........P.P....P.P........H",
      "EPPPPPPPPP.P....P.PPPPPPPPPH",
      "EPPPPPPPPP.P....P.PPPPPPPPPH",
      "H........P.PPPPPP.P........H",
      "HWWWWWWWWP........PWWWWWWWWH",
      "HWWWWWWWWBBBBBBBBBBWWWWWWWWH",
      "HWWWWWWWWPPPPPPPPPPWWWWWWWWH",
      "H..NNNN......PP......NNNN..H",
      "H.GGGGGGG.PPPPPPPP.GGGGGGG.H",
      "H.GGGGGGG.P..FF..P.GGGGGGG.H",
      "H.........P..PP..P.........H",
      "HHHHHHHHHHHHHEEHHHHHHHHHHHHH"
    ],
    exits: {
      west:  { targetMap: 'IRELAND', spawnX: 26, spawnY: 9 },
      south: { targetMap: 'FRANCE',  spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'uk_physicist_newton', name: 'SIR ISAAC', topic: 'PHYSICIST - CLASSICAL MECHANICS', x: 10, y: 5,
        skinColor: '#fed7aa', hatColor: '#1e3a8a', shirtColor: '#dc2626',
        fact: "SIR ISAAC: Every object in the universe attracts every other object with a gravitational force proportional to their masses and inversely proportional to the square of the distance between them!"
      },
      {
        id: 'uk_nurse_joy', name: 'NURSE JOY (UK)', topic: 'NURSE - PARTY HEAL', x: 14, y: 4,
        skinColor: '#fed7aa', hatColor: '#f43f5e', shirtColor: '#fda4af', healsParty: true,
        fact: "NURSE JOY: Welcome to the Royal Thames Hub in the UK! Your party is fully restored! Step onto the 2x2 Portal in the center to warp back to Beige Village!"
      }
    ]
  },

  // W2. IRELAND (Emerald Cliffs - E: UK)
  IRELAND: {
    id: 'IRELAND',
    name: 'Emerald Causeway (Ireland)',
    subtitle: 'E: Royal Thames Hub (UK) - BASALT COLUMNS & LUSH MEADOWS',
    region: 'WEST_EUROPE',
    theme: { groundA: '#14532d', groundB: '#166534', path: '#d6d3d1', grass: '#15803d', grassTip: '#86efac', tree: '#052e16', treeTop: '#22c55e', rock: '#334155', rockLight: '#94a3b8', rockDark: '#0f172a' },
    encounters: ['mareep', 'hoppip', 'marill', 'stantler', 'miltank', 'noctowl', 'azumarill', 'jumpluff'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..FF..GGGG......GGGG..FF..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..FF.......P..P.......FF..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....F..F....PGGGG..R",
      "R..GGGGP....WWWW....PGGGG..R",
      "R......P..FFWWWWFF..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "R...........PPPPPPPPPPPPPPPE",
      "R...........PPPPPPPPPPPPPPPE",
      "R......PPPPPPPPPPPPPP......R",
      "R..GGGGP....R..R....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..FF.......P..P.......FF..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..FF..GGGG......GGGG..FF..R",
      "RWWWWWWWWWWWWWWWWWWWWWWWWWWR",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {
      east: { targetMap: 'UK', spawnX: 1, spawnY: 9 }
    },
    npcs: [
      {
        id: 'ireland_chemist_boyle', name: 'CHEMIST BOYLE', topic: 'CHEMIST - GAS LAWS & BASALT', x: 11, y: 5,
        skinColor: '#fde68a', hatColor: '#15803d', shirtColor: '#86efac',
        fact: "CHEMIST BOYLE: Boyle's Law states that at constant temperature, the pressure of an ideal gas is inversely proportional to its volume! And Giant's Causeway is made of hexagonal volcanic basalt columns!"
      },
      {
        id: 'overworld_celebi', name: 'GUARDIAN CELEBI', topic: 'LEGENDARY POKEMON - FOREST TIME TRAVEL', x: 13, y: 11,
        isMonster: true, monsterId: 'celebi', isLegendary: true,
        fact: "CELEBI: Biii-bi! (Celebi travels through time protecting emerald forests! Dendrochronology studies tree ring growth to reconstruct past climates!)"
      }
    ]
  },

  // W3. FRANCE (Lumiere Champs - N: UK • E: Germany • S: Spain)
  FRANCE: {
    id: 'FRANCE',
    name: 'Lumiere Lavender (France)',
    subtitle: 'N: Royal Thames Hub (UK) - E: Black Forest (Germany) - S: Iberian Sun (Spain)',
    region: 'WEST_EUROPE',
    theme: { groundA: '#4c1d95', groundB: '#5b21b6', path: '#fef08a', grass: '#6d28d9', grassTip: '#d8b4fe', tree: '#2e1065', treeTop: '#a855f7', rock: '#475569', rockLight: '#e2e8f0', rockDark: '#1e293b' },
    encounters: ['smeargle', 'AIPOM'.toLowerCase(), 'girafarig', 'ledyba', 'furret', 'togetic', 'espeon', 'sylveon', 'bellossom'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..FF..GGGG..PP..GGGG..FF..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..FF.......P..P.......FF..T",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....A..A....PGGGG..T",
      "T..GGGGP....FFFF....PGGGG..T",
      "T......P..AAFFFFAA..P......T",
      "T......PPPPPPPPPPPPPP......T",
      "T...........PPPPPPPPPPPPPPPE",
      "T...........PPPPPPPPPPPPPPPE",
      "T......PPPPPPPPPPPPPP......T",
      "T..GGGGP....F..F....PGGGG..T",
      "T..GGGGP............PGGGG..T",
      "T......PPPPPPPPPPPPPP......T",
      "T..FF.......P..P.......FF..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..FF..GGGG..PP..GGGG..FF..T",
      "T............PP............T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'UK',      spawnX: 13, spawnY: 18 },
      east:  { targetMap: 'GERMANY', spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'SPAIN',   spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'france_microbiologist_pasteur', name: 'DR. PASTEUR', topic: 'MICROBIOLOGIST - PASTEURIZATION', x: 10, y: 5,
        skinColor: '#fed7aa', hatColor: '#1d4ed8', shirtColor: '#f8fafc',
        fact: "DR. PASTEUR: Pasteurization heats liquids to eliminate pathogenic microbes, and vaccines train the adaptive immune system to produce antibodies!"
      },
      {
        id: 'france_physicist_curie', name: 'MADAME CURIE', topic: 'PHYSICIST - RADIOACTIVITY', x: 16, y: 11,
        skinColor: '#fde68a', hatColor: '#7e22ce', shirtColor: '#f3e8ff',
        fact: "MADAME CURIE: I discovered Polonium and Radium! Radioactive decay occurs when an unstable atomic nucleus emits alpha, beta, or gamma radiation!"
      }
    ]
  },

  // W4. GERMANY (Black Forest & Alpine Foundry - W: France)
  GERMANY: {
    id: 'GERMANY',
    name: 'Bavarian Forest (Germany)',
    subtitle: 'W: Lumiere Lavender (France) - ALPINE WOODS & PRECISION ENGINEERING',
    region: 'WEST_EUROPE',
    theme: { groundA: '#1e293b', groundB: '#0f172a', path: '#fde047', grass: '#14532d', grassTip: '#22c55e', tree: '#052e16', treeTop: '#15803d', rock: '#475569', rockLight: '#cbd5e1', rockDark: '#0f172a' },
    encounters: ['pineco', 'forretress', 'scizor', 'steelix', 'skarmory', 'heracross', 'ursaring', 'houndour', 'piloswine', 'delibird', 'sneasel'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T..VV..GGGG......GGGG..TT..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..VV.......P..P.......TT..T",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....V..V....PGGGG..T",
      "T..GGGGP............PGGGG..T",
      "T......P..VV....VV..P......T",
      "T......PPPPPPPPPPPPPP......T",
      "EPPPPPPPPPPPPPPPP..........T",
      "EPPPPPPPPPPPPPPPP..........T",
      "T......PPPPPPPPPPPPPP......T",
      "T..GGGGP....T..T....PGGGG..T",
      "T..GGGGP............PGGGG..T",
      "T......PPPPPPPPPPPPPP......T",
      "T..TT.......P..P.......TT..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..TT..GGGG..PP..GGGG..TT..T",
      "T..........................T",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      west: { targetMap: 'FRANCE', spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'germany_physicist_planck', name: 'PROFESSOR PLANCK', topic: 'THEORETICAL PHYSICIST - QUANTUM THEORY', x: 13, y: 8,
        skinColor: '#fed7aa', hatColor: '#0f172a', shirtColor: '#eab308',
        fact: "PROFESSOR PLANCK: Electromagnetic energy is quantized! The energy of a photon is directly proportional to its frequency multiplied by Planck's constant (E = hf)!"
      }
    ]
  },

  // W5. SPAIN (Iberian Meseta & Strait - N: France • W: Portugal)
  SPAIN: {
    id: 'SPAIN',
    name: 'Iberian Sierra (Spain)',
    subtitle: 'N: Lumiere Lavender (France) - W: Atlantic Douro (Portugal)',
    region: 'WEST_EUROPE',
    theme: { groundA: '#b45309', groundB: '#d97706', path: '#fef08a', grass: '#15803d', grassTip: '#fde047', tree: '#78350f', treeTop: '#22c55e', rock: '#92400e', rockLight: '#fcd34d', rockDark: '#451a03' },
    encounters: ['sunkern', 'sunflora', 'yanma', 'gligar', 'teddiursa', 'slugma', 'magcargo', 'phanpy', 'donphan', 'larvitar', 'pupitar', 'tyranitar', 'hitmontop'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..FF..GGGG..PP..GGGG..FF..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..FF.......P..P.......FF..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....R..R....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..FF....FF..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "EPPPPPPPPPPPPPPPP..........R",
      "EPPPPPPPPPPPPPPPP..........R",
      "R......PPPPPPPPPPPPPP......R",
      "R..GGGGP....F..F....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "RWWWWWWWW...P..P...WWWWWWWWR",
      "RWWWWWWWWGG.PPPP.GGWWWWWWWWR",
      "RWWWWWWWWGG......GGWWWWWWWWR",
      "RWWWWWWWWWWWWWWWWWWWWWWWWWWR",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'FRANCE',   spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'PORTUGAL', spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'spain_neuroscientist_cajal', name: 'DR. RAMON Y CAJAL', topic: 'NEUROSCIENTIST - NEURON DOCTRINE', x: 11, y: 5,
        skinColor: '#e59866', hatColor: '#dc2626', shirtColor: '#fde047',
        fact: "DR. RAMON Y CAJAL: From Zaragoza to Madrid, my drawings proved the Neuron Doctrine: the nervous system is made of discrete individual cells (neurons) communicating across synapses!"
      },
      {
        id: 'spain_wind_engineer_tarifa', name: 'ENGINEER CARMEN (TARIFA)', topic: 'RENEWABLE ENERGY - STRAIT WIND', x: 16, y: 12,
        skinColor: '#f5cba7', hatColor: '#ea580c', shirtColor: '#fef3c7',
        fact: "ENGINEER CARMEN: Along the Strait of Tarifa where the Mediterranean meets the Atlantic, Venturi wind funneling drives clean kinetic wind turbines!"
      }
    ]
  },

  // W6. PORTUGAL (Atlantic Douro Coast - E: Spain)
  PORTUGAL: {
    id: 'PORTUGAL',
    name: 'Atlantic Douro (Portugal)',
    subtitle: 'E: Iberian Sierra (Spain) - AZULEJO COAST & GRANITE VALLEYS',
    region: 'WEST_EUROPE',
    theme: { groundA: '#0369a1', groundB: '#0284c7', path: '#fef3c7', grass: '#15803d', grassTip: '#38bdf8', tree: '#14532d', treeTop: '#4ade80', rock: '#475569', rockLight: '#bae6fd', rockDark: '#0f172a' },
    encounters: ['chinchou', 'lanturn', 'corsola', 'remoraid', 'octillery', 'mantine', 'qwilfish', 'wooper', 'quagsire', 'kingdra', 'politoed', 'slowking', 'shuckle', 'suicune'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "RWWWWWWGGGG......GGGG..KK..R",
      "RWWWWWWGGGG.PPPP.GGGG......R",
      "RWWWWWW.....P..P.......KK..R",
      "RWWWWWWPPPPPP..PPPPPP......R",
      "RWWWWWWP....K..K....PGGGG..R",
      "RWWWWWWP............PGGGG..R",
      "RWWWWWWP..KK....KK..P......R",
      "RWWWWWWPPPPPPPPPPPPPP......R",
      "RBBBBBBBBBBBBPPPPPPPPPPPPPPPE",
      "RBBBBBBBBBBBBPPPPPPPPPPPPPPPE",
      "RWWWWWWPPPPPPPPPPPPPP......R",
      "RWWWWWWP....R..R....PGGGG..R",
      "RWWWWWWP............PGGGG..R",
      "RWWWWWWPPPPPPPPPPPPPP......R",
      "RWWWWWW.....P..P.......FF..R",
      "RWWWWWWGGGG.PPPP.GGGG......R",
      "RWWWWWWGGGG......GGGG..FF..R",
      "RWWWWWWWWWWWWWWWWWWWWWWWWWWR",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {
      east: { targetMap: 'SPAIN', spawnX: 1, spawnY: 9 }
    },
    npcs: [
      {
        id: 'portugal_navigator_henrique', name: 'NAVIGATOR HENRIQUE (PORTO)', topic: 'OCEANOGRAPHER - ATLANTIC GYRES & ASTROLABE', x: 13, y: 5,
        skinColor: '#e59866', hatColor: '#1e3a8a', shirtColor: '#38bdf8',
        fact: "NAVIGATOR HENRIQUE: From the Douro bridges of Porto to the granite hills of Viseu! Early maritime navigators used the astrolabe to measure star altitude and determine latitude across the Atlantic!"
      },
      {
        id: 'portugal_forester_duarte', name: 'ECOLOGIST DUARTE', topic: 'BOTANIST - QUERCUS SUBER (CORK OAK)', x: 16, y: 12,
        skinColor: '#f5cba7', hatColor: '#166534', shirtColor: '#bbf7d0',
        fact: "ECOLOGIST DUARTE: Portugal's Cork Oak (Quercus suber) regenerates its outer bark every 9 years! Suberin makes cork cells impermeable, buoyant, and fire-resistant!"
      },
      {
        id: 'prince_joao_portugal', name: 'PRINCE JOAO', topic: 'ROYALTY - GERMAN PSYDUCK LORE', x: 13, y: 8,
        skinColor: '#fed7aa', hatColor: '#eab308', shirtColor: '#dc2626',
        fact: "PRINCE JOAO: You know Psyducks in Germany are called Antons? I love Antons!"
      },
      { id: 'pt_psyduck_1',  name: 'ANTON (PSYDUCK #1)',  topic: 'OVERWORLD PSYDUCK', x: 9,  y: 4,  isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #1: Psy-yi-yi! (Anton waddles happily along the Douro riverbank!)" },
      { id: 'pt_psyduck_2',  name: 'ANTON (PSYDUCK #2)',  topic: 'OVERWORLD PSYDUCK', x: 11, y: 4,  isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #2: Quack? Psy-duck! (Anton is holding its head in deep thought!)" },
      { id: 'pt_psyduck_3',  name: 'ANTON (PSYDUCK #3)',  topic: 'OVERWORLD PSYDUCK', x: 15, y: 4,  isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #3: Psy-psy! (Anton admires the blue Azulejo tiles!)" },
      { id: 'pt_psyduck_4',  name: 'ANTON (PSYDUCK #4)',  topic: 'OVERWORLD PSYDUCK', x: 18, y: 4,  isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #4: Duck-duck! (Anton splashes near the Atlantic bridge!)" },
      { id: 'pt_psyduck_5',  name: 'ANTON (PSYDUCK #5)',  topic: 'OVERWORLD PSYDUCK', x: 9,  y: 7,  isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #5: Psy~ (Anton islistening to Prince Joao!)" },
      { id: 'pt_psyduck_6',  name: 'ANTON (PSYDUCK #6)',  topic: 'OVERWORLD PSYDUCK', x: 18, y: 7,  isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #6: Psy-yi! (Anton tilts its head curiously!)" },
      { id: 'pt_psyduck_7',  name: 'ANTON (PSYDUCK #7)',  topic: 'OVERWORLD PSYDUCK', x: 9,  y: 12, isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #7: Quack! (Anton is taking a sunny afternoon nap!)" },
      { id: 'pt_psyduck_8',  name: 'ANTON (PSYDUCK #8)',  topic: 'OVERWORLD PSYDUCK', x: 12, y: 14, isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #8: Psy-duck~ (Anton dances in a circle!)" },
      { id: 'pt_psyduck_9',  name: 'ANTON (PSYDUCK #9)',  topic: 'OVERWORLD PSYDUCK', x: 15, y: 15, isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #9: Psy-yi-yi! (Anton unleashes a tiny harmless water splash!)" },
      { id: 'pt_psyduck_10', name: 'ANTON (PSYDUCK #10)', topic: 'OVERWORLD PSYDUCK', x: 19, y: 15, isMonster: true, monsterId: 'psyduck', fact: "PSYDUCK #10: Anton! Eh, Psyduck! (All 10 Antons are accounted for!)" }
    ]
  },
  NETHERLANDS: {
    id: 'NETHERLANDS',
    name: 'Tulip Polder (Netherlands)',
    subtitle: 'W: Royal Thames Hub (UK) - S: Atomium Plaza (Belgium)',
    region: 'WEST_EUROPE',
    theme: { groundA: '#047857', groundB: '#065f46', path: '#fde047', grass: '#16a34a', grassTip: '#f97316', tree: '#064e3b', treeTop: '#fb923c', rock: '#475569', rockLight: '#cbd5e1', rockDark: '#1e293b' },
    encounters: ['roselia', 'surskit', 'masquerain', 'wingull', 'pelipper', 'lotad', 'lombre', 'ludicolo'],
    rows: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W..nn..GGGG......GGGG..nn..W",
      "W......GGGG.PPPP.GGGG......W",
      "W..nn.......P..P.......nn..W",
      "W......PPPPPP..PPPPPP......W",
      "W..GGGGP....n..n....PGGGG..W",
      "W..GGGGP............PGGGG..W",
      "W......P..nn....nn..P......W",
      "W......PPPPPPPPPPPPPP......W",
      "EPPPPPPPPPPPPPPPP..........W",
      "EPPPPPPPPPPPPPPPP..........W",
      "W......PPPPPPPPPPPPPP......W",
      "W..GGGGP....n..n....PGGGG..W",
      "W..GGGGP............PGGGG..W",
      "W......PPPPPPPPPPPPPP......W",
      "W..nn.......P..P.......nn..W",
      "W......GGGG.PPPP.GGGG......W",
      "W..nn..GGGG..PP..GGGG..nn..W",
      "W............PP............W",
      "WWWWWWWWWWWWWEWWWWWWWWWWWWWW".replace(/WEW/,'WEE')
    ],
    exits: {
      west:  { targetMap: 'UK',      spawnX: 26, spawnY: 9 },
      south: { targetMap: 'BELGIUM', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      { id: 'nl_microscopist_leeuwenhoek', name: 'VAN LEEUWENHOEK', topic: 'MICROSCOPIST - MICROBIOLOGY', x: 13, y: 8, skinColor: '#fed7aa', hatColor: '#ea580c', shirtColor: '#fed7aa', fact: "VAN LEEUWENHOEK: By grinding precision glass lenses in Delft, I became the first human to observe single-celled bacteria and protozoa ('animalcules')!" }
    ]
  },

  BELGIUM: {
    id: 'BELGIUM',
    name: 'Atomium Plaza (Belgium)',
    subtitle: 'N: Tulip Polder (Netherlands) - W: Lumiere Lavender (France) - S: Bavarian Forest (Germany)',
    region: 'WEST_EUROPE',
    theme: { groundA: '#334155', groundB: '#1e293b', path: '#fde68a', grass: '#15803d', grassTip: '#facc15', tree: '#0f172a', treeTop: '#ef4444', rock: '#475569', rockLight: '#e2e8f0', rockDark: '#0f172a' },
    encounters: ['aron', 'lairon', 'aggron', 'beldum', 'metang', 'metagross', 'mawile', 'plusle', 'minun'],
    rows: [
      "HHHHHHHHHHHHHEEHHHHHHHHHHHHH",
      "H..bb..GGGG..PP..GGGG..bb..H",
      "H......GGGG.PPPP.GGGG......H",
      "H..bb.......P..P.......bb..H",
      "H......PPPPPP..PPPPPP......H",
      "H..GGGGP....b..b....PGGGG..H",
      "H..GGGGP............PGGGG..H",
      "H......P..bb....bb..P......H",
      "H......PPPPPPPPPPPPPP......H",
      "EPPPPPPPPPPPPPPPP..........H",
      "EPPPPPPPPPPPPPPPP..........H",
      "H......PPPPPPPPPPPPPP......H",
      "H..GGGGP....b..b....PGGGG..H",
      "H..GGGGP............PGGGG..H",
      "H......PPPPPPPPPPPPPP......H",
      "H..bb.......P..P.......bb..H",
      "H......GGGG.PPPP.GGGG......H",
      "H..bb..GGGG..PP..GGGG..bb..H",
      "H............PP............H",
      "HHHHHHHHHHHHHEEHHHHHHHHHHHHH"
    ],
    exits: {
      north: { targetMap: 'NETHERLANDS', spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'FRANCE',      spawnX: 26, spawnY: 9 },
      south: { targetMap: 'GERMANY',     spawnX: 13, spawnY: 1 }
    },
    npcs: [
      { id: 'be_cosmologist_lemaitre', name: 'GEORGES LEMAITRE', topic: 'COSMOLOGIST - BIG BANG THEORY', x: 13, y: 8, skinColor: '#fed7aa', hatColor: '#0f172a', shirtColor: '#f8fafc', fact: "GEORGES LEMAITRE: I proposed the 'Primeval Atom' hypothesis—that the expanding universe originated from a single dense point, now known as the Big Bang!" }
    ]
  },
  // NORTH AMERICA REGION (CANADA HUB + USA, MEXICO, CUBA, HAITI, JAMAICA, BAHAMAS, DOMINICAN REP.)
  // ====================================================================
  CANADA: {
    id: 'CANADA',
    name: 'Maple Boreal Hub (Canada)',
    subtitle: 'S: Liberty Canyon (USA) - 2x2 PORTAL: Beige Village',
    region: 'NORTH_AMERICA',
    theme: { groundA: '#7f1d1d', groundB: '#991b1b', path: '#fef3c7', grass: '#14532d', grassTip: '#4ade80', tree: '#450a0a', treeTop: '#ef4444', rock: '#475569', rockLight: '#e2e8f0', rockDark: '#0f172a' },
    encounters: ['spheal', 'sealeo', 'walrein', 'snorunt', 'glalie', 'absol', 'zangoose', 'glaceon'],
    rows: [
      "mmmmmmmmmmmmmmmmmmmmmmmmmmmm",
      "m..mmmm..PPPPPPPPPP..mmmm..m",
      "m.GGGGGG.P..HHHH..P.GGGGGG.m",
      "m.GGGGGG.P..HDDH..P.GGGGGG.m",
      "m........P........P........m",
      "m..mmmm..PPPPPPPPPP..mmmm..m",
      "m........P........P........m",
      "m.GGGGGG.P.PPPPPP.P.GGGGGG.m",
      "m........P.P....P.P........m",
      "m........P.P....P.P........m",
      "m........P.P....P.P........m",
      "m........P.PPPPPP.P........m",
      "mWWWWWWWWP........PWWWWWWWWm",
      "mWWWWWWWWBBBBBBBBBBWWWWWWWWm",
      "mWWWWWWWWPPPPPPPPPPWWWWWWWWm",
      "m..mmmm......PP......mmmm..m",
      "m.GGGGGGG.PPPPPPPP.GGGGGGG.m",
      "m.GGGGGGG.P..FF..P.GGGGGGG.m",
      "m.........P..PP..P.........m",
      "mmmmmmmmmmmmmeemmmmmmmmmmmmm".replace(/ee/,'EE')
    ],
    exits: {
      south: { targetMap: 'USA', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      { id: 'ca_doctor_banting', name: 'DR. BANTING', topic: 'ENDOCRINOLOGIST - INSULIN', x: 10, y: 5, skinColor: '#fed7aa', hatColor: '#dc2626', shirtColor: '#ffffff', fact: "DR. BANTING: Our discovery of Insulin in Toronto revolutionized medicine! Insulin is a peptide hormone produced by beta cells of the pancreas to regulate blood glucose!" },
      { id: 'ca_nurse_joy', name: 'NURSE JOY (CANADA)', topic: 'NURSE - PARTY HEAL', x: 14, y: 4, skinColor: '#fed7aa', hatColor: '#f43f5e', shirtColor: '#fda4af', healsParty: true, fact: "NURSE JOY: Welcome to the Maple Boreal Hub in Canada! I've healed your party to full HP! Step onto the 2x2 Portal in the center to cycle regions!" },
      { id: 'overworld_regice', name: 'CRYSTAL REGICE', topic: 'LEGENDARY POKEMON - ABSOLUTE ZERO', x: 22, y: 8, isMonster: true, monsterId: 'regice', isLegendary: true, fact: "REGICE: Jii-jii-jii! (Regice cloaks itself in air at -200C! Even molten magma cannot melt its Antarctic ice crystal body!)" }
    ]
  },

  USA: {
    id: 'USA',
    name: 'Liberty Canyon (USA)',
    subtitle: 'N: Maple Boreal (Canada) - W: Sun Pyramid (Mexico) - E: Coral Cay (Bahamas) - S: Malecón (Cuba)',
    region: 'NORTH_AMERICA',
    theme: { groundA: '#1e3a8a', groundB: '#1d4ed8', path: '#f8fafc', grass: '#15803d', grassTip: '#86efac', tree: '#0f172a', treeTop: '#38bdf8', rock: '#78350f', rockLight: '#fca5a5', rockDark: '#451a03' },
    encounters: ['taillow', 'swellow', 'electrike', 'manectric', 'solrock', 'lunatone', 'bagon', 'shelgon', 'salamence'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..ss..GGGG..PP..GGGG..ss..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..ss.......P..P.......ss..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....s..s....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..ss....ss..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "EPPPPPPPPPPPPPPPPPPPPPPPPPPE",
      "EPPPPPPPPPPPPPPPPPPPPPPPPPPE",
      "R......PPPPPPPPPPPPPP......R",
      "R..GGGGP....s..s....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..ss.......P..P.......ss..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..ss..GGGG..PP..GGGG..ss..R",
      "R............PP............R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'CANADA',  spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'MEXICO',  spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'BAHAMAS', spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'CUBA',    spawnX: 13, spawnY: 1 }
    },
    npcs: [
      { id: 'usa_physicist_feynman', name: 'PROF. FEYNMAN', topic: 'QUANTUM ELECTRODYNAMICS', x: 13, y: 8, skinColor: '#fed7aa', hatColor: '#1d4ed8', shirtColor: '#f8fafc', fact: "PROF. FEYNMAN: Surely you're joking! Feynman diagrams visualize how subatomic particles interact by exchanging virtual photons!" },
      { id: 'overworld_latios', name: 'EON LATIOS', topic: 'LEGENDARY POKEMON - JET STREAM', x: 18, y: 12, isMonster: true, monsterId: 'latios', isLegendary: true, fact: "LATIOS: Kii-yaaah! (By folding its wings, Latios overtakes jet planes by minimizing aerodynamic form drag!)" }
    ]
  },

  MEXICO: {
    id: 'MEXICO',
    name: 'Sun Pyramid Sierra (Mexico)',
    subtitle: 'E: Liberty Canyon (USA) - AGAVE HIGHLANDS & CENOTES',
    region: 'NORTH_AMERICA',
    theme: { groundA: '#b45309', groundB: '#92400e', path: '#fde047', grass: '#15803d', grassTip: '#4ade80', tree: '#451a03', treeTop: '#22c55e', rock: '#78350f', rockLight: '#fcd34d', rockDark: '#451a03' },
    encounters: ['lotad', 'lombre', 'ludicolo', 'cacnea', 'cacturne', 'trapinch', 'vibrava', 'flygon', 'numel', 'camerupt', 'torkoal'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..ff..GGGG......GGGG..CC..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..ff.......P..P.......CC..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....f..f....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..ff....ff..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "R...........PPPPPPPPPPPPPPPE",
      "R...........PPPPPPPPPPPPPPPE",
      "R......PPPPPPPPPPPPPP......R",
      "R..GGGGP....C..C....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..ff.......P..P.......CC..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..ff..GGGG......GGGG..CC..R",
      "R..........................R",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {
      east: { targetMap: 'USA', spawnX: 1, spawnY: 9 }
    },
    npcs: [
      { id: 'mx_chemist_molina', name: 'DR. MARIO MOLINA', topic: 'ATMOSPHERIC CHEMIST - OZONE LAYER', x: 13, y: 8, skinColor: '#e59866', hatColor: '#16a34a', shirtColor: '#f8fafc', fact: "DR. MARIO MOLINA: My research showed how CFC gases catalytically destroy stratospheric Ozone (O3), which shields Earth from ultraviolet radiation!" },
      { id: 'overworld_regirock', name: 'DESERT REGIROCK', topic: 'LEGENDARY POKEMON - LITHOSPHERE', x: 10, y: 12, isMonster: true, monsterId: 'regirock', isLegendary: true, fact: "REGIROCK: Zuu-zuu! (If Regirock is chipped in battle, it repairs itself by fusing new igneous and sedimentary rocks onto its body!)" }
    ]
  },

  BAHAMAS: {
    id: 'BAHAMAS',
    name: 'Nassau Coral Cay (Bahamas)',
    subtitle: 'W: Liberty Canyon (USA) - CONCH SALAD & FESTIVAL MUSEUM',
    region: 'NORTH_AMERICA',
    theme: { groundA: '#0284c7', groundB: '#0369a1', path: '#fef08a', grass: '#0d9488', grassTip: '#5eead4', tree: '#14532d', treeTop: '#4ade80', rock: '#f472b6', rockLight: '#fce7f3', rockDark: '#be185d' },
    encounters: ['wingull', 'pelipper', 'carvanha', 'sharpedo', 'wailmer', 'wailord', 'clamperl', 'huntail', 'gorebyss', 'luvdisc', 'relicanth'],
    rows: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W..qq..GGGG......GGGG..qq..W",
      "W......GGGG.PPPP.GGGG......W",
      "W..qq.......P..P.......qq..W",
      "W......PPPPPP..PPPPPP......W",
      "W..GGGGP....q..q....PGGGG..W",
      "W..GGGGP............PGGGG..W",
      "W......P..qq....qq..P......W",
      "W......PPPPPPPPPPPPPP......W",
      "EPPPPPPPPPPPPPPPP..........W",
      "EPPPPPPPPPPPPPPPP..........W",
      "W......PPPPPPPPPPPPPP......W",
      "W..GGGGP....q..q....PGGGG..W",
      "W..GGGGP............PGGGG..W",
      "W......PPPPPPPPPPPPPP......W",
      "W..qq.......P..P.......qq..W",
      "W......GGGG.PPPP.GGGG......W",
      "W..qq..GGGG......GGGG..qq..W",
      "W..........................W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
    ],
    exits: {
      west: { targetMap: 'USA', spawnX: 26, spawnY: 9 }
    },
    npcs: [
      { id: 'bs_nassau_curator', name: 'CURATOR MARCUS (NASSAU)', topic: 'JUNKANOO FESTIVAL MUSEUM & CONCH', x: 13, y: 8, skinColor: '#784212', hatColor: '#f43f5e', shirtColor: '#fde047', fact: "CURATOR MARCUS: Welcome to Nassau's Junkanoo Festival Museum! Fresh Bahamian conch salad uses citrus acid (lime juice) to denature proteins in raw queen conch—just like ceviche!" }
    ]
  },

  CUBA: {
    id: 'CUBA',
    name: 'Havana Malecon (Cuba)',
    subtitle: 'N: Liberty Canyon (USA) - W: Blue Mountain (Jamaica) - E: Citadelle Peak (Haiti)',
    region: 'NORTH_AMERICA',
    theme: { groundA: '#0f766e', groundB: '#115e59', path: '#fde68a', grass: '#15803d', grassTip: '#86efac', tree: '#064e3b', treeTop: '#22c55e', rock: '#475569', rockLight: '#cbd5e1', rockDark: '#1e293b' },
    encounters: ['treecko', 'grovyle', 'sceptile', 'ralts', 'kirlia', 'gardevoir', 'slakoth', 'vigoroth', 'slaking', 'tropius'],
    rows: [
      "WWWWWWWWWWWWWEWWWWWWWWWWWWWW".replace(/WEW/,'WEE'),
      "W..aa..GGGG..PP..GGGG..aa..W",
      "W......GGGG.PPPP.GGGG......W",
      "W..aa.......P..P.......aa..W",
      "W......PPPPPP..PPPPPP......W",
      "W..GGGGP....a..a....PGGGG..W",
      "W..GGGGP............PGGGG..W",
      "W......P..aa....aa..P......W",
      "W......PPPPPPPPPPPPPP......W",
      "EPPPPPPPPPPPPPPPPPPPPPPPPPPE",
      "EPPPPPPPPPPPPPPPPPPPPPPPPPPE",
      "W......PPPPPPPPPPPPPP......W",
      "W..GGGGP....a..a....PGGGG..W",
      "W..GGGGP............PGGGG..W",
      "W......PPPPPPPPPPPPPP......W",
      "W..aa.......P..P.......aa..W",
      "W......GGGG.PPPP.GGGG......W",
      "W..aa..GGGG......GGGG..aa..W",
      "W..........................W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
    ],
    exits: {
      north: { targetMap: 'USA',     spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'JAMAICA', spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'HAITI',   spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      { id: 'cu_doctor_finlay', name: 'DR. CARLOS FINLAY', topic: 'EPIDEMIOLOGIST - VECTOR BIOLOGY', x: 13, y: 8, skinColor: '#f5cba7', hatColor: '#f8fafc', shirtColor: '#38bdf8', fact: "DR. CARLOS FINLAY: In Havana, I discovered that Yellow Fever is transmitted by Aedes aegypti mosquitoes, founding modern vector epidemiology!" }
    ]
  },

  JAMAICA: {
    id: 'JAMAICA',
    name: 'Blue Mountain Bay (Jamaica)',
    subtitle: 'E: Havana Malecon (Cuba) - REGGAE ACOUSTICS & CLOUD FORESTS',
    region: 'NORTH_AMERICA',
    theme: { groundA: '#14532d', groundB: '#166534', path: '#facc15', grass: '#15803d', grassTip: '#fde047', tree: '#052e16', treeTop: '#22c55e', rock: '#1e293b', rockLight: '#facc15', rockDark: '#0f172a' },
    encounters: ['torchic', 'combusken', 'blaziken', 'whismur', 'loudred', 'exploud', 'makuhita', 'hariyama', 'meditite', 'medicham', 'chimecho'],
    rows: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W..jj..GGGG......GGGG..ll..W",
      "W......GGGG.PPPP.GGGG......W",
      "W..jj.......P..P.......ll..W",
      "W......PPPPPP..PPPPPP......W",
      "W..GGGGP....j..j....PGGGG..W",
      "W..GGGGP............PGGGG..W",
      "W......P..jj....jj..P......W",
      "W......PPPPPPPPPPPPPP......W",
      "W...........PPPPPPPPPPPPPPPE",
      "W...........PPPPPPPPPPPPPPPE",
      "W......PPPPPPPPPPPPPP......W",
      "W..GGGGP....l..l....PGGGG..W",
      "W..GGGGP............PGGGG..W",
      "W......PPPPPPPPPPPPPP......W",
      "W..jj.......P..P.......ll..W",
      "W......GGGG.PPPP.GGGG......W",
      "W..jj..GGGG......GGGG..ll..W",
      "W..........................W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
    ],
    exits: {
      east: { targetMap: 'CUBA', spawnX: 1, spawnY: 9 }
    },
    npcs: [
      { id: 'jm_sound_engineer_king', name: 'DUB ENGINEER OSBOURNE', topic: 'ACOUSTICAL ENGINEER - BASS FREQUENCIES', x: 13, y: 8, skinColor: '#5c3317', hatColor: '#dc2626', shirtColor: '#facc15', fact: "DUB ENGINEER OSBOURNE: Reggae dub music pioneered spring reverb and high-pass/low-pass frequency filtering! Sub-bass sound waves (20-60 Hz) have wavelengths up to 17 meters long!" }
    ]
  },

  HAITI: {
    id: 'HAITI',
    name: 'Citadelle Peak (Haiti)',
    subtitle: 'W: Havana Malecon (Cuba) - S: Amber Quisqueya (Dominican Republic)',
    region: 'NORTH_AMERICA',
    theme: { groundA: '#1e3a8a', groundB: '#7f1d1d', path: '#fde68a', grass: '#15803d', grassTip: '#4ade80', tree: '#14532d', treeTop: '#22c55e', rock: '#334155', rockLight: '#94a3b8', rockDark: '#0f172a' },
    encounters: ['mudkip', 'marshtomp', 'swampert', 'shuppet', 'banette', 'duskull', 'dusclops', 'sableye', 'mawile', 'kecleon'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..hh..GGGG......GGGG..hh..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..hh.......P..P.......hh..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....h..h....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..hh....hh..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "EPPPPPPPPPPPPPPPP..........R",
      "EPPPPPPPPPPPPPPPP..........R",
      "R......PPPPPPPPPPPPPP......R",
      "R..GGGGP....h..h....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..hh.......P..P.......hh..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..hh..GGGG..PP..GGGG..hh..R",
      "R............PP............R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      west:  { targetMap: 'CUBA',               spawnX: 26, spawnY: 9 },
      south: { targetMap: 'DOMINICAN_REPUBLIC', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      { id: 'ht_historian_toussaint', name: 'ARCHITECT HENRI', topic: 'MOUNTAIN FORTIFICATION & BALLISTICS', x: 13, y: 8, skinColor: '#5c3317', hatColor: '#1e3a8a', shirtColor: '#dc2626', fact: "ARCHITECT HENRI: Built atop Pic Laferriere at 900 meters elevation, the Citadelle's angled stone bastions deflect cannonball kinetic energy!" }
    ]
  },

  DOMINICAN_REPUBLIC: {
    id: 'DOMINICAN_REPUBLIC',
    name: 'Amber Quisqueya (Dominican Republic)',
    subtitle: 'N: Citadelle Peak (Haiti) - FOSSIL AMBER MINES & CORAL LIMESTONE',
    region: 'NORTH_AMERICA',
    theme: { groundA: '#0369a1', groundB: '#b45309', path: '#fef3c7', grass: '#15803d', grassTip: '#fde047', tree: '#14532d', treeTop: '#4ade80', rock: '#d97706', rockLight: '#fef08a', rockDark: '#78350f' },
    encounters: ['lileep', 'cradily', 'anorith', 'armaldo', 'feebas', 'milotic', 'swablu', 'altaria', 'castform', 'jirachi'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..dd..GGGG..PP..GGGG..ll..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..dd.......P..P.......ll..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....d..d....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..dd....dd..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "R...........PPPP...........R",
      "R...........PPPP...........R",
      "R......PPPPPPPPPPPPPP......R",
      "R..GGGGP....l..l....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "RWWWWWWWW...P..P...WWWWWWWWR",
      "RWWWWWWWWGG.PPPP.GGWWWWWWWWR",
      "RWWWWWWWWGG......GGWWWWWWWWR",
      "RWWWWWWWWWWWWWWWWWWWWWWWWWWR",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'HAITI', spawnX: 13, spawnY: 18 }
    },
    npcs: [
      { id: 'do_paleontologist_amber', name: 'PALEONTOLOGIST SOFIA', topic: 'FOSSILIZATION - DOMINICAN AMBER', x: 13, y: 8, skinColor: '#e59866', hatColor: '#d97706', shirtColor: '#fef3c7', fact: "PALEONTOLOGIST SOFIA: Dominican Amber is fossilized resin from the extinct Hymenaea protera tree! Free-radical polymerization preserved 20-million-year-old Miocene insects in 3D detail!" },
      { id: 'overworld_latias', name: 'EON LATIAS', topic: 'LEGENDARY POKEMON - REFRACTION', x: 18, y: 12, isMonster: true, monsterId: 'latias', isLegendary: true, fact: "LATIAS: Shuu-aaah! (Latias coats its glass-like down feathers to refract light and become invisible!)" }
    ]
  }
};

/********************************************************************
 * COUNTRY CHEF NPCs (24 COUNTRIES ACROSS EAST ASIA, WEST EUROPE & NORTH AMERICA)
 * Each Chef shares the country's most iconic dish and its key ingredients
 ********************************************************************/
const COUNTRY_CHEF_NPCS = {
  // --- EAST ASIA (8 COUNTRIES / TERRITORIES) ---
  HONG_KONG: {
    id: 'chef_country_hk', name: 'CHEF MAK (HONG KONG)', topic: 'COUNTRY CHEF - WONTON NOODLES & HAR GOW', x: 16, y: 8,
    skinColor: '#fde68a', hatColor: '#ffffff', shirtColor: '#f8fafc',
    fact: "CHEF MAK: Hong Kong's signature dishes are Cantonese Har Gow and Wonton Noodles! Har Gow wraps fresh shrimp, bamboo shoots, and pork fat in a translucent wheat-and-tapioca starch skin, while Wonton broth is simmered from roasted flounder, pork bones, yellow chives, and egg noodles!"
  },
  MACAU: {
    id: 'chef_country_mo', name: 'CHEF AFONSO (MACAU)', topic: 'COUNTRY CHEF - MINCHI & PASTEIS DE NATA', x: 13, y: 8,
    skinColor: '#f5cba7', hatColor: '#ffffff', shirtColor: '#fef3c7',
    fact: "CHEF AFONSO: Macau's iconic Macanese dish is Minchi alongside Pasteis de Nata! Minchi sautes minced beef or pork with cubed fried potatoes, onions, garlic, soy sauce, Worcestershire sauce, and molasses, topped with a sunny-side-up egg over white rice!"
  },
  CHINA: {
    id: 'chef_country_cn', name: 'CHEF DONGPO (CHINA)', topic: 'COUNTRY CHEF - PEKING ROAST DUCK', x: 16, y: 12,
    skinColor: '#fde68a', hatColor: '#ffffff', shirtColor: '#fee2e2',
    fact: "CHEF DONGPO: China's imperial signature dish is Peking Roast Duck! A whole duck is glazed with maltose syrup, five-spice, and vinegar, air-dried, and roasted over fruitwood until crispy, then wrapped in thin wheat pancakes with scallions, cucumber, and sweet bean sauce (Tianmianjiang)!"
  },
  TAIWAN: {
    id: 'chef_country_tw', name: 'CHEF LIN (TAIWAN)', topic: 'COUNTRY CHEF - TAIWANESE BEEF NOODLE SOUP', x: 13, y: 11,
    skinColor: '#fed7aa', hatColor: '#ffffff', shirtColor: '#e0f2fe',
    fact: "CHEF LIN: Taiwan's national comfort dish is Red-Braised Beef Noodle Soup (Niu Rou Mian)! We slow-simmer beef shank with spicy broad-bean paste (Doubanjiang), soy sauce, star anise, ginger, garlic, and tomatoes, served over chewy wheat noodles with bok choy and pickled mustard greens!"
  },
  JAPAN: {
    id: 'chef_country_jp', name: 'CHEF JIRO (JAPAN)', topic: 'COUNTRY CHEF - TAKOYAKI & KATSUO NO TATAKI', x: 13, y: 11,
    skinColor: '#fde68a', hatColor: '#ffffff', shirtColor: '#f1f5f9',
    fact: "CHEF JIRO: In Japan we celebrate Osaka Takoyaki and Kochi Katsuo no Tataki! Takoyaki grills dashi-seasoned wheat batter around diced octopus (tako), pickled red ginger (beni shoga), tenkasu tempura scraps, and green onions; Katsuo no Tataki sears skipjack tuna over straw fire with garlic, ginger, and ponzu!"
  },
  SOUTH_KOREA: {
    id: 'chef_country_kr', name: 'CHEF MIN-JUN (SOUTH KOREA)', topic: 'COUNTRY CHEF - BIBIMBAP & KIMCHI', x: 13, y: 11,
    skinColor: '#fed7aa', hatColor: '#ffffff', shirtColor: '#ffe4e6',
    fact: "CHEF MIN-JUN: South Korea's classic dish is Dolsot Bibimbap with Napa Kimchi! Steamed white rice is topped with sauteed fernbrake, spinach, bean sprouts, julienned carrots, shiitake mushrooms, marinated bulgogi beef, a raw egg yolk, toasted sesame oil, and fermented red chili paste (Gochujang)!"
  },
  MONGOLIA: {
    id: 'chef_country_mn', name: 'CHEF TEMUULEN (MONGOLIA)', topic: 'COUNTRY CHEF - KHUUSHUUR & BUUZ', x: 13, y: 11,
    skinColor: '#e59866', hatColor: '#ffffff', shirtColor: '#fef08a',
    fact: "CHEF TEMUULEN: Across the Mongolian steppe, our most famous dishes are Buuz and Khuushuur! We knead wheat flour and water into dough pockets filled with minced mutton or beef, wild steppe onion, garlic, salt, and black pepper, then steam or pan-fry them until golden!"
  },
  NORTH_KOREA: {
    id: 'chef_country_kp', name: 'UNIFORM CHEF #07 (NORTH KOREA)', topic: 'COUNTRY CHEF - PYONGYANG NAENGMYEON', x: 13, y: 11,
    skinColor: '#fde68a', hatColor: '#111827', shirtColor: '#dc2626',
    fact: "UNIFORM CHEF #07: Even the kitchen brigade wears the uniform! Our most famous dish is Pyongyang Raengmyon (Cold Buckwheat Noodles), made from buckwheat and sweet potato starch noodles in an icy beef-and-pheasant broth with dongchimi radish water, sliced Korean pear, cucumber, and half a boiled egg!"
  },

  // --- WEST EUROPE (8 COUNTRIES) ---
  UK: {
    id: 'chef_country_uk', name: 'CHEF GORDON (UK)', topic: 'COUNTRY CHEF - FISH AND CHIPS', x: 17, y: 5,
    skinColor: '#fed7aa', hatColor: '#ffffff', shirtColor: '#e2e8f0',
    fact: "CHEF GORDON: Britain's iconic dish is Fish and Chips! Fresh Atlantic cod or haddock fillets are dipped in a cold batter of wheat flour, baking powder, and sparkling beer or water, deep-fried until crisp alongside thick-cut Maris Piper potato chips, crushed marrowfat mushy peas, and malt vinegar!"
  },
  IRELAND: {
    id: 'chef_country_ie', name: 'CHEF SIOBHAN (IRELAND)', topic: 'COUNTRY CHEF - TRADITIONAL IRISH STEW', x: 16, y: 8,
    skinColor: '#fde68a', hatColor: '#ffffff', shirtColor: '#dcfce7',
    fact: "CHEF SIOBHAN: Ireland's national dish is Traditional Irish Lamb Stew (Stobhach Gaelach)! We slow-braise pasture-raised lamb shoulder with floury potatoes, carrots, onions, leeks, pearl barley, fresh thyme, and parsley in rich stock until the potatoes naturally thicken the gravy!"
  },
  FRANCE: {
    id: 'chef_country_fr', name: 'CHEF ESCOFFIER (FRANCE)', topic: 'COUNTRY CHEF - BOEUF BOURGUIGNON', x: 13, y: 8,
    skinColor: '#fed7aa', hatColor: '#ffffff', shirtColor: '#f8fafc',
    fact: "CHEF ESCOFFIER: France's celebrated classic is Boeuf Bourguignon! Charolais beef is slowly braised in red Burgundy wine and beef stock with smoked lardons (bacon), pearl onions, button mushrooms, carrots, garlic, and a bouquet garni of thyme and bay leaf!"
  },
  GERMANY: {
    id: 'chef_country_de', name: 'CHEF HANS (GERMANY)', topic: 'COUNTRY CHEF - SAUERBRATEN & SPATZLE', x: 16, y: 8,
    skinColor: '#fed7aa', hatColor: '#ffffff', shirtColor: '#fef9c3',
    fact: "CHEF HANS: Germany's signature roast is Rheinischer Sauerbraten with Spatzle! Beef is marinated for days in wine vinegar, water, juniper berries, cloves, bay leaves, and onions, then braised and served with egg-and-flour Spatzle noodles and braised red cabbage (Rotkohl)!"
  },
  SPAIN: {
    id: 'chef_country_es', name: 'CHEF FERRAN (SPAIN)', topic: 'COUNTRY CHEF - PAELLA DE ARROZ NEGRO & GAZPACHO', x: 13, y: 8,
    skinColor: '#e59866', hatColor: '#ffffff', shirtColor: '#fef08a',
    fact: "CHEF FERRAN: In Spain we love Paella de Arroz Negro, Salmorejo, and Andalusian Gazpacho! Arroz Negro simmers short-grain Bomba rice in seafood stock with cuttlefish, squid ink, prawns, garlic, olive oil, and paprika; Gazpacho and Salmorejo blend ripe tomatoes, extra-virgin olive oil, garlic, bread, and sherry vinegar!"
  },
  PORTUGAL: {
    id: 'chef_country_pt', name: 'CHEF AVILLEZ (PORTUGAL)', topic: 'COUNTRY CHEF - BACALHAU A BRAS & FRANCESINHA', x: 16, y: 8,
    skinColor: '#f5cba7', hatColor: '#ffffff', shirtColor: '#dbeafe',
    fact: "CHEF AVILLEZ: Welcome to Portugal! Our most famous dish is Bacalhau a Bras (and Porto's Francesinha)! We shred desalted Atlantic cod (bacalhau) and bind it over low heat with thinly sliced matchstick potatoes, caramelized onions, garlic, extra-virgin olive oil, lightly scrambled eggs, black olives, and fresh parsley!"
  },
  NETHERLANDS: {
    id: 'chef_country_nl', name: 'CHEF PIETER (NETHERLANDS)', topic: 'COUNTRY CHEF - STAMPPOT & STROOPWAFELS', x: 16, y: 8,
    skinColor: '#fed7aa', hatColor: '#ffffff', shirtColor: '#ffedd5',
    fact: "CHEF PIETER: The Netherlands' heartiest dish is Boerenkool Stamppot! Floury potatoes are boiled and mashed together with finely chopped curly kale, butter, and milk, served steaming hot with a smoked Rookworst sausage and a pool of savory gravy!"
  },
  BELGIUM: {
    id: 'chef_country_be', name: 'CHEF BENOIT (BELGIUM)', topic: 'COUNTRY CHEF - MOULES-FRITES & CARBONADE', x: 16, y: 8,
    skinColor: '#fed7aa', hatColor: '#ffffff', shirtColor: '#fef3c7',
    fact: "CHEF BENOIT: Belgium's national dish is Moules-Frites! Fresh North Sea black mussels are steamed in white wine with shallots, celery, garlic, parsley, and butter, served alongside twice-fried Bintje potatoes cooked first at low heat and crisped at high heat!"
  },

  // --- NORTH AMERICA & CARIBBEAN (8 COUNTRIES) ---
  CANADA: {
    id: 'chef_country_ca', name: 'CHEF MARTIN (CANADA)', topic: 'COUNTRY CHEF - QUEBEC POUTINE', x: 17, y: 5,
    skinColor: '#fed7aa', hatColor: '#ffffff', shirtColor: '#fee2e2',
    fact: "CHEF MARTIN: Canada's iconic dish is Quebecois Poutine! Crispy hand-cut Russet potato fries are topped with fresh, squeaky cheddar cheese curds and smothered in hot brown beef-and-chicken gravy thickened with a toasted wheat flour roux!"
  },
  USA: {
    id: 'chef_country_us', name: 'CHEF ALICE (USA)', topic: 'COUNTRY CHEF - SMOKED BRISKET & BURGERS', x: 16, y: 8,
    skinColor: '#f5cba7', hatColor: '#ffffff', shirtColor: '#e0f2fe',
    fact: "CHEF ALICE: Classic American barbecue and burgers! Texas Smoked Brisket rubs beef chest cut with coarse black pepper and kosher salt, smoking it low-and-slow over post oak wood for 12 hours until tough collagen melts into tender gelatin!"
  },
  MEXICO: {
    id: 'chef_country_mx', name: 'CHEF ENRIQUE (MEXICO)', topic: 'COUNTRY CHEF - MOLE POBLANO & TACOS', x: 16, y: 8,
    skinColor: '#e59866', hatColor: '#ffffff', shirtColor: '#dcfce7',
    fact: "CHEF ENRIQUE: Mexico's culinary masterpiece is Mole Poblano with corn tortillas! Over 20 ingredients—including mulato, pasilla, and ancho chilies, toasted sesame seeds, pumpkin seeds, almonds, plantains, cinnamon, tomatoes, and dark cacao chocolate—are ground into a rich sauce over turkey or chicken!"
  },
  CUBA: {
    id: 'chef_country_cu', name: 'CHEF PALADAR (CUBA)', topic: 'COUNTRY CHEF - ROPA VIEJA & MOROS', x: 16, y: 8,
    skinColor: '#f5cba7', hatColor: '#ffffff', shirtColor: '#fef9c3',
    fact: "CHEF PALADAR: Cuba's national dish is Ropa Vieja! Flank steak is simmered until shreddable in a Criollo sofrito sauce of bell peppers, onions, garlic, plum tomatoes, cumin, oregano, bay leaves, and dry white wine, served with black beans, white rice, and fried sweet plantains (Maduros)!"
  },
  HAITI: {
    id: 'chef_country_ht', name: 'CHEF NADEGE (HAITI)', topic: 'COUNTRY CHEF - GRIOT, PIKLIZ & DIRI DJONDJON', x: 16, y: 8,
    skinColor: '#5c3317', hatColor: '#ffffff', shirtColor: '#ffe4e6',
    fact: "CHEF NADEGE: Haiti's beloved feast is Griot with Pikliz and Diri ak Djondjon! Pork shoulder is marinated in sour Seville orange juice, Epis (blended scallions, garlic, peppers, and herbs), boiled, and fried crisp, served with fiery pickled cabbage-carrot-habanero Pikliz and black mushroom rice!"
  },
  JAMAICA: {
    id: 'chef_country_jm', name: 'CHEF RASTA LEVI (JAMAICA)', topic: 'COUNTRY CHEF - ACKEE & SALTFISH & JERK', x: 16, y: 8,
    skinColor: '#5c3317', hatColor: '#ffffff', shirtColor: '#fef08a',
    fact: "CHEF RASTA LEVI: Jamaica's national dish is Ackee and Saltfish alongside Jerk Chicken! Sun-ripened Ackee fruit pods are sauteed with flaked salted cod, Scotch bonnet peppers, onions, tomatoes, sweet bell peppers, and thyme; while Jerk seasoning combines allspice (pimento) and Scotch bonnets!"
  },
  BAHAMAS: {
    id: 'chef_country_bs', name: 'CHEF SHERELLE (BAHAMAS)', topic: 'COUNTRY CHEF - CONCH SALAD & BAHAMA MAMA', x: 16, y: 8,
    skinColor: '#784212', hatColor: '#ffffff', shirtColor: '#fce7f3',
    fact: "CHEF SHERELLE: Right here in Nassau, our signature dish is Tropical Conch Salad paired with a Bahama Mama! We dice fresh raw Queen Conch and marinate it in freshly squeezed lime and sour orange juice with diced green bell peppers, ripe tomatoes, onions, cucumber, and goat pepper!"
  },
  DOMINICAN_REPUBLIC: {
    id: 'chef_country_do', name: 'CHEF ESPERANZA (DOMINICAN REP.)', topic: 'COUNTRY CHEF - LA BANDERA & SANCOCHO', x: 16, y: 8,
    skinColor: '#ca8a5b', hatColor: '#ffffff', shirtColor: '#e0f2fe',
    fact: "CHEF ESPERANZA: The Dominican Republic's daily pride is La Bandera Dominicana and Sancocho! La Bandera combines white rice, red kidney beans stewed with pumpkin (auyama), oregano, and cilantro, and braised chicken or beef, served with crispy twice-fried green plantains (Tostones)!"
  }
};

(function registerCountryChefs() {
  if (typeof WORLD_MAPS === 'undefined') return;
  Object.keys(COUNTRY_CHEF_NPCS).forEach(mapKey => {
    const mapObj = WORLD_MAPS[mapKey];
    if (!mapObj) return;
    if (!Array.isArray(mapObj.npcs)) mapObj.npcs = [];
    const chef = COUNTRY_CHEF_NPCS[mapKey];
    if (!mapObj.npcs.some(n => n.id === chef.id)) {
      mapObj.npcs.push(chef);
    }
  });
})();


// Alias MIRADOURO_LUA to MOON so both keys work seamlessly across overworld.js & audio.js
WORLD_MAPS.MIRADOURO_LUA = WORLD_MAPS.MOON;