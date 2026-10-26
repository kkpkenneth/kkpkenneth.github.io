/********************************************************************
 * maps.js
 * 19 Biome Maps Featuring Custom & Regional Signature Obstacles:
 * R = Rock, I = Ice, L = Lava, M = Swamp Mud, C = Cactus, K = Coral,
 * F = Multi-Color Flower, S = Onsen Steam Geyser, V = Tesla Coil Pylon,
 * U = Spore Toadstool, A = Astral Crystal Obelisk, N = Shadow Lamp, Q = Moon Spire
 ********************************************************************/

const MAP_COLS = 28;
const MAP_ROWS = 20;
const TILE_SIZE = 32;

const WORLD_MAPS = {
  // 1. CENTER HUB
  CENTER: {
    id: 'CENTER',
    name: 'PALLET RESEARCH HUB',
    subtitle: 'N: MOUNTAIN • E: DESERT • S: BEACH • W: FOREST',
    theme: { groundA: '#65a30d', groundB: '#6dab14', path: '#d6b37c', grass: '#15803d', grassTip: '#4ade80', tree: '#14532d', treeTop: '#22c55e' },
    encounters: ['pikachu', 'pidgey', 'rattata', 'eevee', 'chansey', 'ditto', 'porygon'],
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

  // 2. NORTH: MOUNTAIN
  MOUNTAIN: {
    id: 'MOUNTAIN',
    name: 'CRAG MOUNTAIN PEAK (NORTH)',
    subtitle: 'N: GLACIER • S: HUB • W: SKY PLATEAU • E: CANYON',
    theme: { groundA: '#57534e', groundB: '#44403c', path: '#a8a29e', grass: '#3f6212', grassTip: '#a3e635', tree: '#292524', treeTop: '#78716c', rock: '#78716c', rockLight: '#d6d3d1', rockDark: '#292524' },
    encounters: ['clefairy', 'jigglypuff', 'zubat', 'machop', 'hitmonlee', 'hitmonchan', 'lucario'],
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
      }
    ]
  },

  // 3. EAST: DESERT
  DESERT: {
    id: 'DESERT',
    name: 'SCORCHED MIRAGE DESERT (EAST)',
    subtitle: 'W: HUB • E: VOLCANO • N: CANYON • S: ATOLL',
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
      east:  { targetMap: 'VOLCANO',   spawnX: 1,  spawnY: 9 }
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

  // 4. SOUTH: BEACH
  BEACH: {
    id: 'BEACH',
    name: 'CORAL LAGOON BEACH (SOUTH)',
    subtitle: 'N: HUB • S: ABYSS • W: MARSH • E: ATOLL',
    theme: { groundA: '#fde047', groundB: '#facc15', path: '#fef08a', grass: '#0d9488', grassTip: '#5eead4', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['squirtle', 'blastoise', 'psyduck', 'poliwag', 'krabby', 'omanyte', 'kabuto'],
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

  // 5. WEST: FOREST
  FOREST: {
    id: 'FOREST',
    name: 'VIRIDIAN CANOPY FOREST (WEST)',
    subtitle: 'E: HUB • W: SANCTUARY • N: SKY PLATEAU • S: MARSH',
    theme: { groundA: '#3f6212', groundB: '#365314', path: '#a16207', grass: '#14532d', grassTip: '#22c55e', tree: '#052e16', treeTop: '#15803d' },
    encounters: ['bulbasaur', 'venusaur', 'caterpie', 'weedle', 'oddish', 'bellsprout', 'exeggcute', 'chansey'],
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
      east:  { targetMap: 'CENTER',    spawnX: 1,  spawnY: 9 },
      west:  { targetMap: 'SANCTUARY', spawnX: 26, spawnY: 9 }
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

  // 6. NORTHWEST: ALPINE SKY PLATEAU
  NORTHWEST: {
    id: 'NORTHWEST',
    name: 'ALPINE SKY PLATEAU (NORTHWEST)',
    subtitle: 'E: CRAG MOUNTAIN • S: VIRIDIAN FOREST',
    theme: { groundA: '#0284c7', groundB: '#0369a1', path: '#e0f2fe', grass: '#15803d', grassTip: '#86efac', tree: '#1e293b', treeTop: '#38bdf8', rock: '#64748b', rockLight: '#cbd5e1', rockDark: '#334155' },
    encounters: ['spearow', 'farfetchd', 'scyther', 'pinsir', 'aerodactyl', 'dragonite'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..TTTT....PPPPPP....TTTT..R",
      "R.GGGGGG...P....P...GGGGGG.R",
      "R.GGGGGG..PP.FF.PP..GGGGGG.R",
      "R.GGGGGG..P......P..GGGGGG.R",
      "R.........PPPPPPPP.........R",
      "R........PP......PP........R",
      "R..GGGGPPP..WWWW..PPPGGGG..R",
      "R..GGGGP...WWWWWW...PGGGG..R",
      "R..GGGGP...WWWWWW...PPPPPPPE",
      "R......PP...WWWW....PPPPPPPE",
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
      east:  { targetMap: 'MOUNTAIN', spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'FOREST',   spawnX: 13, spawnY: 1 }
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
      }
    ]
  },

  // 7. NORTHEAST: BADLANDS CANYON QUARRY
  NORTHEAST: {
    id: 'NORTHEAST',
    name: 'BADLANDS CANYON QUARRY (NORTHEAST)',
    subtitle: 'W: CRAG MOUNTAIN • S: MIRAGE DESERT • E: DYNAMO WORKS',
    theme: { groundA: '#78350f', groundB: '#92400e', path: '#fde68a', grass: '#b45309', grassTip: '#facc15', tree: '#451a03', treeTop: '#d97706', rock: '#92400e', rockLight: '#fbbf24', rockDark: '#451a03' },
    encounters: ['geodude', 'onix', 'voltorb', 'magnemite', 'electabuzz'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R....GGGG..........GGGG....R",
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
      west:  { targetMap: 'MOUNTAIN', spawnX: 26, spawnY: 9 },
      south: { targetMap: 'DESERT',   spawnX: 13, spawnY: 1 },
      east:  { targetMap: 'FOUNDRY',  spawnX: 1,  spawnY: 9 }
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
      }
    ]
  },

  // 8. SOUTHWEST: MANGROVE SWAMP MARSH
  SOUTHWEST: {
    id: 'SOUTHWEST',
    name: 'MANGROVE SWAMP MARSH (SOUTHWEST)',
    subtitle: 'N: VIRIDIAN FOREST • E: CORAL BEACH • S: SPORE FEN',
    theme: { groundA: '#134e4a', groundB: '#115e59', path: '#99f6e4', grass: '#065f46', grassTip: '#34d399', tree: '#042f2e', treeTop: '#0d9488' },
    encounters: ['paras', 'venonat', 'tangela', 'ekans', 'grimer', 'koffing'],
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
      "T.TTTT.......PP.....PPPPPPPE",
      "T..MM........PP.....PPPPPPPE",
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
      north: { targetMap: 'FOREST',  spawnX: 13, spawnY: 18 },
      east:  { targetMap: 'BEACH',   spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'BRAMBLE', spawnX: 13, spawnY: 1 }
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
      }
    ]
  },

  // 9. SOUTHEAST: SUNKEN TRADE ATOLL
  SOUTHEAST: {
    id: 'SOUTHEAST',
    name: 'SUNKEN TRADE ATOLL (SOUTHEAST)',
    subtitle: 'N: MIRAGE DESERT • W: CORAL BEACH • E: MIRADOURO DA LUA',
    theme: { groundA: '#f59e0b', groundB: '#d97706', path: '#fef3c7', grass: '#0284c7', grassTip: '#38bdf8', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['tentacool', 'staryu', 'meowth', 'snorlax', 'kangaskhan', 'tauros'],
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
      "TWWWWWWWW..........WWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'DESERT',        spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'BEACH',         spawnX: 26, spawnY: 9 },
      south:  { targetMap: 'MIRADOURO_LUA', spawnX: 13,  spawnY: 1 }
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

  // 10. FAR NORTH: GLACIER
  GLACIER: {
    id: 'GLACIER',
    name: 'ARCTIC GLACIER PEAK (FAR NORTH)',
    subtitle: 'S: CRAG MOUNTAIN • SUBZERO PERMAFROST',
    theme: { groundA: '#bae6fd', groundB: '#7dd3fc', path: '#f0f9ff', grass: '#0284c7', grassTip: '#e0f2fe', tree: '#0f172a', treeTop: '#38bdf8' },
    encounters: ['seel', 'shellder', 'jynx', 'lapras', 'articuno'],
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
      "I..GGGGP...IIIIII...PGGGG..I",
      "I......PP...IIII...PP......I",
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
      south: { targetMap: 'MOUNTAIN', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'biathlete_sven', name: 'BIATHLETE SVEN', topic: 'BIATHLETE • GLACIOLOGY', x: 13, y: 5,
        skinColor: '#fed7aa', hatColor: '#0284c7', shirtColor: '#bae6fd',
        fact: "BIATHLETE SVEN: Cross-country skiing and marksmanship! Ground that remains at or below 0°C for two or more consecutive years is called Permafrost!"
      },
      {
        id: 'overworld_articuno', name: 'ARTICUNO', topic: 'LEGENDARY POKéMON • HEXAGONAL ICE', x: 13, y: 3,
        isMonster: true, monsterId: 'articuno',
        fact: "ARTICUNO: ★ Kyaaah! ★ (Ordinary water ice forms a Hexagonal crystal structure at standard atmospheric pressure, and Antarctica holds most of Earth's glacial ice!)"
      }
    ]
  },

  // 11. FAR EAST: VOLCANO
  VOLCANO: {
    id: 'VOLCANO',
    name: 'MAGMA CALDERA CORE (FAR EAST)',
    subtitle: 'W: MIRAGE DESERT • N: MISTVEIL ONSEN • IGNEOUS CRATER',
    theme: { groundA: '#450a0a', groundB: '#7f1d1d', path: '#fca5a5', grass: '#991b1b', grassTip: '#f97316', tree: '#1c1917', treeTop: '#dc2626', rock: '#450a0a', rockLight: '#ef4444', rockDark: '#1c1917' },
    encounters: ['charmander', 'charizard', 'vulpix', 'growlithe', 'ponyta', 'magmar', 'moltres'],
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
      west:  { targetMap: 'DESERT', spawnX: 26, spawnY: 9 },
      north: { targetMap: 'ONSEN',  spawnX: 13, spawnY: 18 }
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
        id: 'overworld_moltres', name: 'MOLTRES', topic: 'LEGENDARY POKéMON • THERMODYNAMICS', x: 14, y: 3,
        isMonster: true, monsterId: 'moltres',
        fact: "MOLTRES: ★ Gyaoooh! ★ (An Endothermic reaction absorbs heat from its surroundings, while an Exothermic reaction releases heat!)"
      }
    ]
  },

  // 12. FAR SOUTH: ABYSS
  ABYSS: {
    id: 'ABYSS',
    name: 'TRENCH CORAL ABYSS (FAR SOUTH)',
    subtitle: 'N: CORAL LAGOON BEACH • DEEP OCEAN CURRENTS',
    theme: { groundA: '#0f172a', groundB: '#1e3a8a', path: '#38bdf8', grass: '#0369a1', grassTip: '#2dd4bf', tree: '#020617', treeTop: '#0284c7', rock: '#1e293b', rockLight: '#64748b', rockDark: '#020617' },
    encounters: ['horsea', 'goldeen', 'magikarp', 'gyarados', 'slowpoke', 'dratini', 'zapdos'],
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
      "R..GGGG......PP......GGGG..R",
      "R............BB............R",
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
      north: { targetMap: 'BEACH', spawnX: 13, spawnY: 18 }
    },
    npcs: [
      {
        id: 'scuba_diver_cousteau', name: 'DIVER COUSTEAU', topic: 'SCUBA DIVER • THERMOHALINE', x: 13, y: 7,
        skinColor: '#e59866', hatColor: '#0284c7', shirtColor: '#38bdf8',
        fact: "DIVER COUSTEAU: Thermohaline circulation is the global deep-ocean conveyor belt driven by differences in water temperature and salinity!"
      },
      {
        id: 'overworld_zapdos', name: 'ZAPDOS', topic: 'LEGENDARY POKéMON • BIOELECTRICITY', x: 13, y: 15,
        isMonster: true, monsterId: 'zapdos',
        fact: "ZAPDOS: ★ Zzaaap! ★ (Saltwater conducts electricity because dissolved sodium and chloride ions are free to move and carry electric charge!)"
      }
    ]
  },

  // 13. FAR WEST: SANCTUARY
  SANCTUARY: {
    id: 'SANCTUARY',
    name: 'MYSTIC RUIN SANCTUARY (FAR WEST)',
    subtitle: 'E: VIRIDIAN FOREST • N: CELESTIAL SPIRE • MYTH & COSMOS',
    theme: { groundA: '#2e1065', groundB: '#3b0764', path: '#c084fc', grass: '#4c1d95', grassTip: '#e879f9', tree: '#090d16', treeTop: '#7e22ce', rock: '#4c1d95', rockLight: '#c084fc', rockDark: '#1e1b4b' },
    encounters: ['abra', 'kadabra', 'gastly', 'gengar', 'drowzee', 'nidoran_f', 'nidoran_m', 'mr_mime', 'mewtwo', 'mew'],
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
      "T......GGGG......GGGG......T",
      "T......GGGG......GGGG......T",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      east:  { targetMap: 'FOREST', spawnX: 1,  spawnY: 9 },
      north: { targetMap: 'SPIRE',  spawnX: 13, spawnY: 18 }
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
        isMonster: true, monsterId: 'mew',
        fact: "MEW: ★ Mew~ ★ (DNA carries genetic information using four nitrogenous bases: Adenine, Thymine, Cytosine, and Guanine!)"
      }
    ]
  },

  // 14. MISTVEIL ONSEN BASIN (Uses Signature Obstacle S = Onsen Steam Geyser)
  ONSEN: {
    id: 'ONSEN',
    name: 'MISTVEIL ONSEN BASIN',
    subtitle: 'S: MAGMA CALDERA • THERMAL SPRINGS & STEAM GEYSERS',
    theme: { groundA: '#334155', groundB: '#475569', path: '#fed7aa', grass: '#0f766e', grassTip: '#5eead4', tree: '#7c2d12', treeTop: '#fb923c', rock: '#475569', rockLight: '#cbd5e1', rockDark: '#1e293b' },
    encounters: ['vulpix', 'growlithe', 'arcanine', 'psyduck', 'poliwag', 'slowpoke', 'magmar', 'blastoise', 'charizard'],
    rows: [
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR",
      "R..SS..WWWW......WWWW..SS..R",
      "R.GGGG.WWWW.PPPP.WWWW.GGGG.R",
      "R.GGGG......P..P......GGGG.R",
      "R..SS..PPPPPP..PPPPPP..SS..R",
      "R......P....S..S....P......R",
      "R.WWWW.P..GGGGGGGG..P.WWWW.R",
      "R.WWWW.P..GGGGGGGG..P.WWWW.R",
      "R......P....S..S....P......R",
      "R..SS..PPPPPPPPPPPPPP..SS..R",
      "R...........PPPP...........R",
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
      south: { targetMap: 'VOLCANO', spawnX: 13, spawnY: 1 }
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
        id: 'decorator_vera', name: 'DECORATOR VERA', topic: 'DECORATOR • MINERAL DESIGN', x: 8, y: 9,
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

  // 15. DYNAMO ANVIL WORKS (Uses Signature Obstacle V = Tesla Coil Pylon)
  FOUNDRY: {
    id: 'FOUNDRY',
    name: 'DYNAMO ANVIL WORKS',
    subtitle: 'W: BADLANDS CANYON • HIGH-VOLTAGE MAGNETIC FORGE',
    theme: { groundA: '#1e293b', groundB: '#334155', path: '#94a3b8', grass: '#ca8a04', grassTip: '#fef08a', tree: '#0f172a', treeTop: '#38bdf8', rock: '#475569', rockLight: '#e2e8f0', rockDark: '#0f172a' },
    encounters: ['pikachu', 'raichu', 'magnemite', 'voltorb', 'electabuzz', 'porygon', 'lucario'],
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
      "R..VV..GGGG......GGGG..VV..R",
      "RRRRRRRRRRRRRRRRRRRRRRRRRRRR"
    ],
    exits: {
      west: { targetMap: 'NORTHEAST', spawnX: 26, spawnY: 9 }
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
      }
    ]
  },

  // 16. NIGHTSHADE SPORE FEN (Uses Signature Obstacle U = Spore Toadstool)
  BRAMBLE: {
    id: 'BRAMBLE',
    name: 'NIGHTSHADE SPORE FEN',
    subtitle: 'N: MANGROVE SWAMP • S: NOCTURNE SHADOW UNDERBELLY',
    theme: { groundA: '#2e1065', groundB: '#14532d', path: '#a855f7', grass: '#15803d', grassTip: '#c084fc', tree: '#1e1b4b', treeTop: '#22c55e' },
    encounters: ['bulbasaur', 'venusaur', 'oddish', 'vileplume', 'bellsprout', 'weedle', 'ekans', 'zubat', 'koffing'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T..UU..GGGG..PP..GGGG..UU..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..UU.......P..P.......UU..T",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....U..U....PGGGG..T",
      "T..GGGGP....MMMM....PGGGG..T",
      "T......P..UUMMMMUU..P......T",
      "T......PPPPPPPPPPPPPP......T",
      "T...........PPPP...........T",
      "T..UU.......P..P.......UU..T",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....U..U....PGGGG..T",
      "T..GGGGP............PGGGG..T",
      "T......PPPPPPPPPPPPPP......T",
      "T..UU.......P..P.......UU..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..UU..GGGG..PP..GGGG..UU..T",
      "T............PP............T",
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'SOUTHWEST',    spawnX: 13, spawnY: 18 },
      south: { targetMap: 'SHADOW_ALLEY', spawnX: 13, spawnY: 1 }
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

  // 17. STARLIGHT CELESTIAL SPIRE (Uses Signature Obstacle A = Astral Crystal Obelisk)
  SPIRE: {
    id: 'SPIRE',
    name: 'STARLIGHT CELESTIAL SPIRE',
    subtitle: 'S: MYSTIC SANCTUARY • ASTRAL OBELISKS & PRESS SUMMIT',
    theme: { groundA: '#311042', groundB: '#4a1d66', path: '#fbcfe8', grass: '#701a75', grassTip: '#f472b6', tree: '#1e1b4b', treeTop: '#e879f9' },
    encounters: ['clefairy', 'jigglypuff', 'abra', 'kadabra', 'drowzee', 'mr_mime', 'mewtwo', 'mew'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T..AA..GGGG......GGGG..AA..T",
      "T......GGGG.PPPP.GGGG......T",
      "T..AA.......P..P.......AA..T",
      "T......PPPPPP..PPPPPP......T",
      "T..GGGGP....A..A....PGGGG..T",
      "T..GGGGP....FFFF....PGGGG..T",
      "T......P..AAFFFFAA..P......T",
      "T......PPPPPPPPPPPPPP......T",
      "T...........PPPP...........T",
      "T..AA.......P..P.......AA..T",
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
      south: { targetMap: 'SANCTUARY', spawnX: 13, spawnY: 1 }
    },
    npcs: [
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

  // 18. DARK DANGEROUS AREA: NOCTURNE SHADOW UNDERBELLY (Uses N = Shadow Streetlamp)
  SHADOW_ALLEY: {
    id: 'SHADOW_ALLEY',
    name: 'NOCTURNE SHADOW UNDERBELLY',
    subtitle: 'N: SPORE FEN • E: MIRADOURO DA LUA • DARK DANGER ZONE',
    theme: {
      groundA: '#090d16', groundB: '#111827', path: '#27272a',
      grass: '#1e1b4b', grassTip: '#dc2626', tree: '#020617',
      treeTop: '#3f3f46', rock: '#18181b', rockLight: '#52525b', rockDark: '#09090b'
    },
    encounters: ['umbreon', 'murkrow', 'houndoom', 'absol', 'gengar', 'zubat', 'ekans', 'koffing'],
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
      "R...........PPPPPPPPPPPPPPPE",
      "R..NN.......P..PPPPPPPPIIIRE",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....N..N....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..NN.......P..P.......NN..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..NN..GGGG......GGGG..NN..R",
      "R..........................R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'BRAMBLE',       spawnX: 13, spawnY: 18 },
      east:  { targetMap: 'MIRADOURO_LUA', spawnX: 1,  spawnY: 9 }
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

  // 19. MIRADOURO DA LUA VALLEY (Uses Signature Obstacle Q = Moon Badlands Spire + Alien Characters)
  MIRADOURO_LUA: {
    id: 'MIRADOURO_LUA',
    name: 'MIRADOURO DA LUA VALLEY',
    subtitle: 'N: SUNKEN ATOLL • W: SHADOW UNDERBELLY • ALIEN CLIFFS',
    theme: {
      groundA: '#9a3412', groundB: '#c2410c', path: '#fde68a',
      grass: '#7c2d12', grassTip: '#38bdf8', tree: '#431407',
      treeTop: '#f97316', rock: '#b91c1c', rockLight: '#fca5a5', rockDark: '#450a0a'
    },
    encounters: ['clefairy', 'deoxys', 'staryu', 'porygon', 'abra', 'geodude', 'onix'],
    rows: [
      "RRRRRRRRRRRRREERRRRRRRRRRRRR",
      "R..QQ..GGGG......GGGG..QQ..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..QQ.......P..P.......QQ..R",
      "R......PPPPPP..PPPPPP......R",
      "R..GGGGP....Q..Q....PGGGG..R",
      "R..GGGGP............PGGGG..R",
      "R......P..QQ....QQ..P......R",
      "R......PPPPPPPPPPPPPP......R",
      "EPPPPPPPP...PPPP...PPPPPPPPR",
      "EPPPPPPPP...PPPP...PPPPPPPPR",
      "R......PPPPPPPPPPPPPP......R",
      "R......P..QQ....QQ..P......R",
      "R..GGGGP............PGGGG..R",
      "R..GGGGP....Q..Q....PGGGG..R",
      "R......PPPPPPPPPPPPPP......R",
      "R..QQ.......P..P.......QQ..R",
      "R......GGGG.PPPP.GGGG......R",
      "R..QQ..GGGG......GGGG..QQ..R",
      "RRRRRRRRRRRRREERRRRRRRRRRRRR"
    ],
    exits: {
      north: { targetMap: 'SOUTHEAST',    spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'SHADOW_ALLEY', spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'alien_commander_xylar', name: 'ALIEN COMMANDER XYLAR', topic: 'ALIEN • LUNAR EROSION & GEOLOGY', x: 10, y: 4,
        isAlien: true, skinColor: '#4ade80', hatColor: '#22c55e', shirtColor: '#a855f7',
        fact: "COMMANDER XYLAR: 👽 Greetings, Earthling! We landed at Miradouro da Lua because its red ochre cliffs and gullies carved by wind and rain erosion look just like the Moon!"
      },
      {
        id: 'alien_navigator_zog', name: 'ALIEN NAVIGATOR ZOG', topic: 'ALIEN • GRAVITY & TIDES', x: 17, y: 4,
        isAlien: true, skinColor: '#4ade80', hatColor: '#4ade80', shirtColor: '#38bdf8',
        fact: "NAVIGATOR ZOG: 👽 Bleep-blorp! From this Moon Viewpoint, remember that the Moon's gravitational pull is the primary force driving ocean tides on Earth!"
      },
      {
        id: 'alien_biologist_blorp', name: 'ALIEN SCIENTIST VEX', topic: 'ALIEN • ASTROBIOLOGY & DNA', x: 10, y: 15,
        isAlien: true, skinColor: '#4ade80', hatColor: '#10b981', shirtColor: '#f472b6',
        fact: "SCIENTIST VEX: 👽 Scanning terrestrial lifeforms! Earth organisms encode genetic information in DNA using four nitrogenous bases: Adenine, Thymine, Cytosine, and Guanine!"
      },
      {
        id: 'alien_scout_orion', name: 'ALIEN SCOUT ORION', topic: 'ALIEN • WORMHOLES & SPACETIME', x: 17, y: 15,
        isAlien: true, skinColor: '#4ade80', hatColor: '#84cc16', shirtColor: '#fde047',
        fact: "SCOUT ORION: 👽 Our saucer warped here through an Einstein-Rosen bridge—also known in physics as a Wormhole connecting distant points in spacetime!"
      },
      {
        id: 'overworld_deoxys', name: 'COSMIC DEOXYS', topic: 'EXTRATERRESTRIAL POKéMON • COSMOS', x: 13, y: 8,
        isMonster: true, monsterId: 'deoxys',
        fact: "DEOXYS: ★ Vwooo-shhh! ★ (Deoxys crystallized from a space virus inside a meteor! Gamma rays are the highest-energy electromagnetic radiation in the cosmos!)"
      }
    ]
  }
};