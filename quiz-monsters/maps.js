/********************************************************************
 * maps.js
 * 13 Biome Maps:
 * - 1 Center Hub (CENTER)
 * - 4 Cardinal Maps (MOUNTAIN, DESERT, BEACH, FOREST)
 * - 4 Corner Maps (NORTHWEST, NORTHEAST, SOUTHWEST, SOUTHEAST)
 * - 4 Far Outer Maps (GLACIER, VOLCANO, ABYSS, SANCTUARY)
 * Every habitat has strictly unique 1st-stage or Legendary Pokémon!
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
    encounters: ['pikachu', 'pidgey', 'rattata', 'eevee'],
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
        id: 'teacher_cherry', name: 'TEACHER CHERRY', topic: 'TEACHER • CRITICAL THINKING', x: 12, y: 5,
        hatColor: '#8b5cf6', shirtColor: '#c084fc',
        fact: "TEACHER CHERRY: Welcome back to the Hub Center! Always analyze primary and secondary sources critically before jumping to conclusions!"
      },
      {
        id: 'politician_regina', name: 'POLITICIAN REGINA', topic: 'POLITICIAN • CIVICS & MAVIS', x: 16, y: 5,
        hatColor: '#ec4899', shirtColor: '#fbcfe8',
        fact: "POLITICIAN REGINA: I love my jigglypuff so much that I named it Mavis <3<3<3"
      },
      {
        id: 'mavis_jigglypuff', name: 'MAVIS (JIGGLYPUFF)', topic: 'PARTNER POKéMON • SOUND WAVES', x: 17, y: 5,
        isMonster: true, monsterId: 'jigglypuff',
        fact: "MAVIS THE JIGGLYPUFF: ♪ Puuuff~ ♪ (Mavis sings a soothing 440 Hz lullaby! Sound waves are longitudinal mechanical waves that require a medium to travel!)"
      },
      {
        id: 'doctor_house', name: 'DR. HOUSE', topic: 'DOCTOR • ANATOMY FACT', x: 13, y: 8,
        hatColor: '#0284c7', shirtColor: '#e0f2fe',
        fact: "DR. HOUSE: As a medical doctor, I treat patients daily. Remember: Hemoglobin is the iron-containing protein in red blood cells that carries oxygen from the lungs!"
      },
      {
        id: 'officer_jenny', name: 'OFFICER JENNY', topic: 'POLICEMAN • LOGIC & LAWS', x: 19, y: 6,
        hatColor: '#1e3a8a', shirtColor: '#60a5fa',
        fact: "OFFICER JENNY: Law and order! In binary code, the decimal number 10 is represented as 1010, and an AND Logic Gate outputs TRUE only when both inputs are TRUE!"
      },
      {
        id: 'student_leo', name: 'STUDENT LEO', topic: 'STUDENT • STUDY HABITS', x: 9, y: 8,
        hatColor: '#eab308', shirtColor: '#fef08a',
        fact: "STUDENT LEO: I'm revising for my science exam! Did you know Homo sapiens have 32 permanent adult teeth including wisdom teeth?"
      },
      {
        id: 'mathematician_ada', name: 'MATHEMATICIAN ADA', topic: 'MATHEMATICIAN • ALGORITHMS', x: 18, y: 8,
        hatColor: '#4f46e5', shirtColor: '#c7d2fe',
        fact: "MATHEMATICIAN ADA: According to Ohm's Law, Voltage (V) equals Current (I) multiplied by Resistance (R)!"
      },
      {
        id: 'cleaner_stan', name: 'CLEANER STAN', topic: 'CLEANER • HYGIENE & CHEMISTRY', x: 10, y: 14,
        hatColor: '#0d9488', shirtColor: '#99f6e4',
        fact: "CLEANER STAN: Keeping the town spotless! Soaps work because their molecules have a hydrophilic head that bonds with water and a hydrophobic tail that traps grease!"
      },
      {
        id: 'game_designer_ken', name: 'GAME DESIGNER KEN', topic: 'GAME DESIGNER • PIXEL SYSTEMS', x: 17, y: 14,
        hatColor: '#db2777', shirtColor: '#f472b6',
        fact: "GAME DESIGNER KEN: A 16x16 sprite grid contains 256 individual pixels! Transistors act as microscopic electronic switches inside every game console!"
      }
    ]
  },

  // 2. NORTH: MOUNTAIN (Connects N->GLACIER, S->CENTER, W->NORTHWEST, E->NORTHEAST)
  MOUNTAIN: {
    id: 'MOUNTAIN',
    name: 'CRAG MOUNTAIN PEAK (NORTH)',
    subtitle: 'N: GLACIER • S: HUB • W: SKY PLATEAU • E: CANYON',
    theme: { groundA: '#57534e', groundB: '#44403c', path: '#a8a29e', grass: '#3f6212', grassTip: '#a3e635', tree: '#292524', treeTop: '#78716c' },
    encounters: ['clefairy', 'jigglypuff', 'zubat', 'machop'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
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
      north: { targetMap: 'GLACIER',   spawnX: 13, spawnY: 18 },
      south: { targetMap: 'CENTER',    spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'NORTHWEST', spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'NORTHEAST', spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'geologist_cole', name: 'GEOLOGIST COLE', topic: 'GEOLOGIST • EARTH SCIENCE', x: 13, y: 5,
        hatColor: '#78350f', shirtColor: '#d97706',
        fact: "GEOLOGIST COLE: Igneous rock formed from cooled lava on Earth's surface is called Extrusive rock, and Diamond rates a 10 on the Mohs hardness scale!"
      },
      {
        id: 'fireman_bravo', name: 'CHIEF BRAVO', topic: 'FIREMAN • THERMODYNAMICS', x: 11, y: 11,
        hatColor: '#dc2626', shirtColor: '#fca5a5',
        fact: "CHIEF BRAVO: Putting out fires is my job! Remember: Combustion rapidly combines oxygen with fuel, and the hottest part of a standard burner flame is Blue!"
      },
      {
        id: 'runner_bolt', name: 'RUNNER BOLT', topic: 'RUNNER • AEROBIC RESPIRATION', x: 16, y: 11,
        hatColor: '#ef4444', shirtColor: '#fecaca',
        fact: "RUNNER BOLT: Training at high altitude! During strenuous anaerobic sprinting, Lactic Acid (lactate) builds up in skeletal muscle tissue!"
      },
      {
        id: 'overworld_clefairy', name: 'WILD CLEFAIRY', topic: 'OVERWORLD POKéMON • LUNAR', x: 14, y: 3,
        isMonster: true, monsterId: 'clefairy',
        fact: "CLEFAIRY: ♪ Clef-clef! ♪ (Clefairy dances under the mountain sky! The Moon's gravitational pull is the primary force driving Earth's ocean tides!)"
      }
    ]
  },

  // 3. EAST: DESERT (Connects W->CENTER, E->VOLCANO, N->NORTHEAST, S->SOUTHEAST)
  DESERT: {
    id: 'DESERT',
    name: 'SCORCHED MIRAGE DESERT (EAST)',
    subtitle: 'W: HUB • E: VOLCANO • N: CANYON • S: ATOLL',
    theme: { groundA: '#d97706', groundB: '#b45309', path: '#fde68a', grass: '#9a3412', grassTip: '#fb923c', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['sandshrew', 'diglett', 'mankey', 'doduo'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T....GGGG....PP....GGGG....T",
      "T...GGGGGG..PPPP..GGGGGG...T",
      "T...GGGGGG...PP...GGGGGG...T",
      "T...........PPPP...........T",
      "T..TTT.....PP..PP.....TTT..T",
      "T.........PP.WW.PP.........T",
      "T..GGGG..PP.WWWW.PP..GGGG..T",
      "T..GGGG.PP..WWWW..PP.GGGG..T",
      "EPPPPPPPP....WW....PPPPPPPPE",
      "EPPPPPPPP..........PPPPPPPPE",
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
      north: { targetMap: 'NORTHEAST', spawnX: 13, spawnY: 18 },
      south: { targetMap: 'SOUTHEAST', spawnX: 13, spawnY: 1 },
      west:  { targetMap: 'CENTER',    spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'VOLCANO',   spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'psychologist_adler', name: 'DR. ADLER', topic: 'PSYCHOLOGIST • COGNITION', x: 13, y: 11,
        hatColor: '#4338ca', shirtColor: '#a5b4fc',
        fact: "DR. ADLER: Neurons transmit signals across a microscopic gap called a Synapse using chemical Neurotransmitters, while Myelin insulates axons!"
      },
      {
        id: 'football_player_pele', name: 'FOOTBALLER PELÉ', topic: 'FOOTBALL PLAYER • KINESIOLOGY', x: 8, y: 11,
        hatColor: '#16a34a', shirtColor: '#fde047',
        fact: "FOOTBALLER PELÉ: Actin and Myosin are the specialized protein filaments that slide past each other inside muscle fibers, triggered by Calcium ions (Ca2+)!"
      },
      {
        id: 'basketball_player_kobe', name: 'BALLER KOBE', topic: 'BASKETBALL PLAYER • SKELETAL', x: 18, y: 11,
        hatColor: '#7e22ce', shirtColor: '#facc15',
        fact: "BALLER KOBE: If the body lacks Calcium over time, Osteoporosis will develop, weakening bones! And lacking Vitamin D causes Rickets!"
      },
      {
        id: 'influencer_chloe', name: 'INFLUENCER CHLOE', topic: 'INFLUENCER • COMMUNICATIONS', x: 11, y: 4,
        hatColor: '#ec4899', shirtColor: '#fbcfe8',
        fact: "INFLUENCER CHLOE: Hey besties! Did you know a Portmanteau blends two words together—like 'brunch' or 'podcast'—and a Palindrome reads the same backward?"
      }
    ]
  },

  // 4. SOUTH: BEACH (Connects N->CENTER, S->ABYSS, W->SOUTHWEST, E->SOUTHEAST)
  BEACH: {
    id: 'BEACH',
    name: 'CORAL LAGOON BEACH (SOUTH)',
    subtitle: 'N: HUB • S: ABYSS • W: MARSH • E: ATOLL',
    theme: { groundA: '#fde047', groundB: '#facc15', path: '#fef08a', grass: '#0d9488', grassTip: '#5eead4', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['squirtle', 'psyduck', 'poliwag', 'krabby'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T...........PPPP...........T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..GGGGGG....PP....GGGGGG..T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..........PP..PP..........T",
      "T..FFFF...PP....PP...FFFF..T",
      "T........PPPPPPPPPP........T",
      "T..GGGG......PP......GGGG..T",
      "EPPPPPPPPPPPPPPPPPPPPPPPPPPE",
      "EPPPPPPPPPPPPBBPPPPPPPPPPPPE",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWWWWWWBBWWWWWWWWWWWWT",
      "TWWWWWWWW...PPPP...WWWWWWWWT",
      "TWWWWWWW...GGGGGG...WWWWWWWT",
      "TWWWWWWW...GGGGGG...WWWWWWWT",
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
        hatColor: '#16a34a', shirtColor: '#4ade80',
        fact: "ECOLOGIST LIN: Water covers 71% of Earth! An Estuary is a coastal body where fresh river water meets salt ocean water!"
      },
      {
        id: 'swimmer_marina', name: 'SWIMMER MARINA', topic: 'SWIMMER • HYDROLOGY', x: 10, y: 8,
        hatColor: '#0284c7', shirtColor: '#7dd3fc',
        fact: "SWIMMER MARINA: Osmosis is the movement of water molecules across a semipermeable membrane, and pure water boils at 100°C at standard pressure!"
      },
      {
        id: 'triathlete_troy', name: 'TRIATHLETE TROY', topic: 'TRIATHLETE • NUTRITION', x: 16, y: 8,
        hatColor: '#ea580c', shirtColor: '#fdba74',
        fact: "TRIATHLETE TROY: Swim, bike, run! If the body lacks Thiamine (Vitamin B1), Beriberi will develop; if it lacks Vitamin C, Scurvy will occur!"
      },
      {
        id: 'overworld_squirtle', name: 'FRIENDLY SQUIRTLE', topic: 'OVERWORLD POKéMON • SHELL', x: 13, y: 14,
        isMonster: true, monsterId: 'squirtle',
        fact: "SQUIRTLE: ♪ Squirtle-squirt! ♪ (Limestone is a sedimentary rock formed largely from the skeletal remains of marine organisms!)"
      }
    ]
  },

  // 5. WEST: FOREST (Connects E->CENTER, W->SANCTUARY, N->NORTHWEST, S->SOUTHWEST)
  FOREST: {
    id: 'FOREST',
    name: 'VIRIDIAN CANOPY FOREST (WEST)',
    subtitle: 'E: HUB • W: SANCTUARY • N: SKY PLATEAU • S: MARSH',
    theme: { groundA: '#3f6212', groundB: '#365314', path: '#a16207', grass: '#14532d', grassTip: '#22c55e', tree: '#052e16', treeTop: '#15803d' },
    encounters: ['bulbasaur', 'caterpie', 'weedle', 'oddish', 'bellsprout'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T.TTTT..GGGG.PP.GGGG..TTTT.T",
      "T.TTTT..GGGG.PP.GGGG..TTTT.T",
      "T.......GGGG.PP.GGGG.......T",
      "T..GGG..PPPPPPPPPPPP..GGG..T",
      "T..GGG..P..TTTTTT..P..GGG..T",
      "T..GGG..P..TTTTTT..P..GGG..T",
      "T.......P....FF....P.......T",
      "T.TTTT..PPPPPPPPPPPP.......T",
      "EPPPPPPP.....PP.....PPPPPPPE",
      "EPPPPPPP.....PP.....PPPPPPPE",
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
      north: { targetMap: 'NORTHWEST', spawnX: 13, spawnY: 18 },
      south: { targetMap: 'SOUTHWEST', spawnX: 13, spawnY: 1 },
      east:  { targetMap: 'CENTER',    spawnX: 1,  spawnY: 9 },
      west:  { targetMap: 'SANCTUARY', spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'botanist_elena', name: 'BOTANIST ELENA', topic: 'BOTANIST • PLANT SCIENCE', x: 13, y: 8,
        hatColor: '#84cc16', shirtColor: '#bef264',
        fact: "BOTANIST ELENA: Xylem transports water upward from roots, Phloem distributes sugars, and Stomata are tiny leaf pores for gas exchange!"
      },
      {
        id: 'entomologist_bugsy', name: 'ENTOMOLOGIST BUGSY', topic: 'ENTOMOLOGIST • ARTHROPODS', x: 9, y: 4,
        hatColor: '#65a30d', shirtColor: '#d9f99d',
        fact: "ENTOMOLOGIST BUGSY: Adult insects have 6 legs, 3 body segments (head, thorax, abdomen), breathe through Spiracles/Tracheae, and have Chitin exoskeletons!"
      },
      {
        id: 'farmer_giles', name: 'FARMER GILES', topic: 'FARMER • SOIL & MYCORRHIZA', x: 16, y: 4,
        hatColor: '#ca8a04', shirtColor: '#fef08a',
        fact: "FARMER GILES: Mycorrhiza is a beneficial symbiotic relationship between plant roots and fungi that helps crops absorb water and minerals!"
      },
      {
        id: 'carpenter_oakley', name: 'CARPENTER OAKLEY', topic: 'CARPENTER • CELLULOSE WALLS', x: 11, y: 12,
        hatColor: '#92400e', shirtColor: '#fde68a',
        fact: "CARPENTER OAKLEY: Rigid Cell Walls give wood its strength, and a Climax Community is the stable final stage of ecological succession!"
      },
      {
        id: 'overworld_bulbasaur', name: 'FRIENDLY BULBASAUR', topic: 'OVERWORLD POKéMON • BOTANY', x: 15, y: 12,
        isMonster: true, monsterId: 'bulbasaur',
        fact: "BULBASAUR: ♪ Bulba-saur! ♪ (Angiosperms produce seeds enclosed within a fruit, and Chlorophyll absorbs light for photosynthesis!)"
      }
    ]
  },

  // 6. ORIGINAL CORNER 1: NORTHWEST (Alpine Sky Plateau - Connects E->MOUNTAIN, S->FOREST)
  NORTHWEST: {
    id: 'NORTHWEST',
    name: 'ALPINE SKY PLATEAU (NORTHWEST)',
    subtitle: 'E: CRAG MOUNTAIN • S: VIRIDIAN FOREST',
    theme: { groundA: '#0284c7', groundB: '#0369a1', path: '#e0f2fe', grass: '#15803d', grassTip: '#86efac', tree: '#1e293b', treeTop: '#38bdf8' },
    encounters: ['spearow', 'farfetchd', 'scyther', 'pinsir'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T..TTTT....PPPPPP....TTTT..T",
      "T.GGGGGG...P....P...GGGGGG.T",
      "T.GGGGGG..PP.FF.PP..GGGGGG.T",
      "T.GGGGGG..P......P..GGGGGG.T",
      "T.........PPPPPPPP.........T",
      "T........PP......PP........T",
      "T..GGGGPPP..WWWW..PPPGGGG..T",
      "T..GGGGP...WWWWWW...PGGGG..T",
      "T..GGGGP...WWWWWW...PPPPPPPE",
      "T......PP...WWWW....PPPPPPPE",
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
      east:  { targetMap: 'MOUNTAIN', spawnX: 1,  spawnY: 9 },
      south: { targetMap: 'FOREST',   spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'pilot_amelia', name: 'PILOT AMELIA', topic: 'PILOT • AERODYNAMICS', x: 11, y: 5,
        hatColor: '#1e3a8a', shirtColor: '#93c5fd',
        fact: "PILOT AMELIA: Four forces govern flight: Lift pushes upward, Gravity pulls down, Thrust propels forward, and Drag resists motion! Bernoulli's principle explains wing lift!"
      },
      {
        id: 'flight_attendant_sky', name: 'ATTENDANT SKY', topic: 'FLIGHT ATTENDANT • ATMOSPHERE', x: 16, y: 5,
        hatColor: '#3b82f6', shirtColor: '#dbeafe',
        fact: "ATTENDANT SKY: Weather occurs in the Troposphere, while commercial jets often cruise in the lower Stratosphere near the Jet Stream!"
      },
      {
        id: 'cyclist_lance', name: 'CYCLIST LANCE', topic: 'CYCLIST • BIOMECHANICS', x: 13, y: 11,
        hatColor: '#f59e0b', shirtColor: '#fde68a',
        fact: "CYCLIST LANCE: Tendons connect skeletal muscles to bones, while Ligaments connect bones to other bones at your joints!"
      }
    ]
  },

  // 7. ORIGINAL CORNER 2: NORTHEAST (Badlands Canyon Quarry - Connects W->MOUNTAIN, S->DESERT)
  NORTHEAST: {
    id: 'NORTHEAST',
    name: 'BADLANDS CANYON QUARRY (NORTHEAST)',
    subtitle: 'W: CRAG MOUNTAIN • S: MIRAGE DESERT',
    theme: { groundA: '#78350f', groundB: '#92400e', path: '#fde68a', grass: '#b45309', grassTip: '#facc15', tree: '#451a03', treeTop: '#d97706' },
    encounters: ['geodude', 'onix', 'rhyhorn', 'cubone'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T....GGGG..........GGGG....T",
      "T...GGGGGG..TTTT..GGGGGG...T",
      "T...GGGGGG........GGGGGG...T",
      "T...........PPPP...........T",
      "T..TTT.....PP..PP.....TTT..T",
      "T.........PP....PP.........T",
      "T..GGGG..PP..FF..PP..GGGG..T",
      "T..GGGG.PP...FF...PP.GGGG..T",
      "EPPPPPPPP..........PPPPPPPPT",
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
      west:  { targetMap: 'MOUNTAIN', spawnX: 26, spawnY: 9 },
      south: { targetMap: 'DESERT',   spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'blacksmith_ferris', name: 'BLACKSMITH FERRIS', topic: 'BLACKSMITH • METALLURGY', x: 11, y: 11,
        hatColor: '#1f2937', shirtColor: '#9ca3af',
        fact: "BLACKSMITH FERRIS: Steel is an alloy of Iron (Fe) and Carbon! Quenching cools hot steel rapidly to increase hardness, while Tempering relieves internal stress!"
      },
      {
        id: 'sculptor_rodin', name: 'SCULPTOR RODIN', topic: 'SCULPTOR • MINERALOGY', x: 16, y: 11,
        hatColor: '#78716c', shirtColor: '#e7e5e4',
        fact: "SCULPTOR RODIN: Basalt is a dark, fine-grained igneous rock that makes up most oceanic crust, while Granite is coarse-grained continental rock!"
      },
      {
        id: 'product_designer_jony', name: 'DESIGNER JONY', topic: 'PRODUCT DESIGNER • MATERIALS', x: 13, y: 4,
        hatColor: '#1e293b', shirtColor: '#e2e8f0',
        fact: "DESIGNER JONY: Ductility describes a material's ability to deform under tensile stress without fracturing, while Chromium makes stainless steel corrosion-resistant!"
      }
    ]
  },

  // 8. ORIGINAL CORNER 3: SOUTHWEST (Mangrove Swamp Marsh - Connects N->FOREST, E->BEACH)
  SOUTHWEST: {
    id: 'SOUTHWEST',
    name: 'MANGROVE SWAMP MARSH (SOUTHWEST)',
    subtitle: 'N: VIRIDIAN FOREST • E: CORAL BEACH',
    theme: { groundA: '#134e4a', groundB: '#115e59', path: '#99f6e4', grass: '#065f46', grassTip: '#34d399', tree: '#042f2e', treeTop: '#0d9488' },
    encounters: ['paras', 'venonat', 'tangela', 'ekans', 'grimer'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T.TTTT..GGGG.PP.GGGG..TTTT.T",
      "T.TTTT..GGGG.PP.GGGG..TTTT.T",
      "T.......GGGG.PP.GGGG.......T",
      "T..GGG..PPPPPPPPPPPP..GGG..T",
      "T..GGG..P..WWWWWW..P..GGG..T",
      "T..GGG..P..WWWWWW..P..GGG..T",
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
      "T......GGGG......GGGG......T",
      "T......GGGG......GGGG......T",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      north: { targetMap: 'FOREST', spawnX: 13, spawnY: 18 },
      east:  { targetMap: 'BEACH',  spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'painter_monet', name: 'PAINTER MONET', topic: 'PAINTER • IMPRESSIONISM', x: 10, y: 8,
        hatColor: '#ec4899', shirtColor: '#fbcfe8',
        fact: "PAINTER MONET: Underground layers of water-bearing permeable rock are called Aquifers! And Iodine deficiency causes Goiter!"
      },
      {
        id: 'fashion_designer_coco', name: 'DESIGNER COCO', topic: 'FASHION DESIGNER • TEXTILES', x: 15, y: 8,
        hatColor: '#be185d', shirtColor: '#fbcfe8',
        fact: "DESIGNER COCO: Severe dietary protein deficiency causes Kwashiorkor, while Niacin (Vitamin B3) deficiency causes Pellagra!"
      },
      {
        id: 'graphic_designer_saul', name: 'DESIGNER SAUL', topic: 'GRAPHIC DESIGNER • COLOR THEORY', x: 13, y: 12,
        hatColor: '#7c3aed', shirtColor: '#ddd6fe',
        fact: "DESIGNER SAUL: In traditional subtractive pigment mixing, Red, Yellow, and Blue are the primary colors!"
      }
    ]
  },

  // 9. ORIGINAL CORNER 4: SOUTHEAST (Sunken Trade Atoll - Connects N->DESERT, W->BEACH)
  SOUTHEAST: {
    id: 'SOUTHEAST',
    name: 'SUNKEN TRADE ATOLL (SOUTHEAST)',
    subtitle: 'N: MIRAGE DESERT • W: CORAL BEACH',
    theme: { groundA: '#f59e0b', groundB: '#d97706', path: '#fef3c7', grass: '#0284c7', grassTip: '#38bdf8', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['tentacool', 'staryu', 'meowth', 'snorlax', 'kangaskhan', 'tauros'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T...........PPPP...........T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..GGGGGG....PP....GGGGGG..T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..........PP..PP..........T",
      "T..FFFF...PP....PP...FFFF..T",
      "T........PPPPPPPPPP........T",
      "T..GGGG......PP......GGGG..T",
      "EPPPPPPPPPPPPPPPPP.........T",
      "EPPPPPPPPPPPPBBPPP.........T",
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
      north: { targetMap: 'DESERT', spawnX: 13, spawnY: 18 },
      west:  { targetMap: 'BEACH',  spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'actor_olivier', name: 'ACTOR OLIVIER', topic: 'ACTOR • DRAMATIC LITERATURE', x: 11, y: 7,
        hatColor: '#991b1b', shirtColor: '#fecaca',
        fact: "ACTOR OLIVIER: 'Deafening silence' is a classic Oxymoron! And using symbolic characters to express a deeper moral truth is known as an Allegory!"
      },
      {
        id: 'photographer_ansel', name: 'PHOTOGRAPHER ANSEL', topic: 'PHOTOGRAPHER • OPTICS', x: 16, y: 7,
        hatColor: '#334155', shirtColor: '#cbd5e1',
        fact: "PHOTOGRAPHER ANSEL: The Occipital Lobe of the human brain processes visual information, and lack of Vitamin A causes Night Blindness!"
      },
      {
        id: 'videographer_zack', name: 'VIDEOGRAPHER ZACK', topic: 'VIDEOGRAPHER • PHASE CHANGES', x: 13, y: 10,
        hatColor: '#475569', shirtColor: '#e2e8f0',
        fact: "VIDEOGRAPHER ZACK: When water vapor turns directly into ice crystals without becoming liquid first, that phase transition is called Deposition!"
      }
    ]
  },

  // 10. FAR NORTH: GLACIER (North of MOUNTAIN)
  GLACIER: {
    id: 'GLACIER',
    name: 'ARCTIC GLACIER PEAK (FAR NORTH)',
    subtitle: 'S: CRAG MOUNTAIN • SUBZERO PERMAFROST',
    theme: { groundA: '#bae6fd', groundB: '#7dd3fc', path: '#f0f9ff', grass: '#0284c7', grassTip: '#e0f2fe', tree: '#0f172a', treeTop: '#38bdf8' },
    encounters: ['seel', 'shellder', 'jynx', 'lapras', 'articuno'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T..WWWW....PPPPPP....WWWW..T",
      "T.GGGGGG...P....P...GGGGGG.T",
      "T.GGGGGG..PP.FF.PP..GGGGGG.T",
      "T.GGGGGG..P......P..GGGGGG.T",
      "T.........PPPPPPPP.........T",
      "T........PP......PP........T",
      "T..GGGGPPP..WWWW..PPPGGGG..T",
      "T..GGGGP...WWWWWW...PGGGG..T",
      "T..GGGGP...WWWWWW...PGGGG..T",
      "T......PP...WWWW...PP......T",
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
      south: { targetMap: 'MOUNTAIN', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'biathlete_sven', name: 'BIATHLETE SVEN', topic: 'BIATHLETE • GLACIOLOGY', x: 13, y: 5,
        hatColor: '#0284c7', shirtColor: '#bae6fd',
        fact: "BIATHLETE SVEN: Cross-country skiing and marksmanship! Ground that remains at or below 0°C for two or more consecutive years is called Permafrost!"
      },
      {
        id: 'overworld_articuno', name: 'ARTICUNO', topic: 'LEGENDARY POKéMON • HEXAGONAL ICE', x: 13, y: 3,
        isMonster: true, monsterId: 'articuno',
        fact: "ARTICUNO: ★ Kyaaah! ★ (Ordinary water ice forms a Hexagonal crystal structure at standard atmospheric pressure, and Antarctica holds most of Earth's glacial ice!)"
      }
    ]
  },

  // 11. FAR EAST: VOLCANO (East of DESERT)
  VOLCANO: {
    id: 'VOLCANO',
    name: 'MAGMA CALDERA CORE (FAR EAST)',
    subtitle: 'W: MIRAGE DESERT • IGNEOUS CRATER & STAGE ARTS',
    theme: { groundA: '#450a0a', groundB: '#7f1d1d', path: '#fca5a5', grass: '#991b1b', grassTip: '#f97316', tree: '#1c1917', treeTop: '#dc2626' },
    encounters: ['charmander', 'vulpix', 'growlithe', 'ponyta', 'magmar', 'moltres'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T....GGGG..........GGGG....T",
      "T...GGGGGG..TTTT..GGGGGG...T",
      "T...GGGGGG........GGGGGG...T",
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
      "T..........................T",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      west: { targetMap: 'DESERT', spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'dj_nova', name: 'DJ NOVA', topic: 'DJ • ACOUSTICS & ELECTRONICS', x: 9, y: 9,
        hatColor: '#06b6d4', shirtColor: '#cffafe',
        fact: "DJ NOVA: Dropping the bass! Capacitors store energy in an electric field, and Kirchhoff's Current Law states that current entering a node equals current leaving it!"
      },
      {
        id: 'singer_aria', name: 'SINGER ARIA', topic: 'SINGER • VOCAL RESONANCE', x: 11, y: 5,
        hatColor: '#f43f5e', shirtColor: '#ffe4e6',
        fact: "SINGER ARIA: Heating a gas until its atoms become ionized creates Plasma—the fourth state of matter! And the Kelvin scale starts at Absolute Zero!"
      },
      {
        id: 'guitarist_slash', name: 'GUITARIST AXEL', topic: 'GUITARIST • ELECTROMAGNETISM', x: 16, y: 5,
        hatColor: '#111827', shirtColor: '#fca5a5',
        fact: "GUITARIST AXEL: Electric guitar pickups turn string vibrations into current! Current is measured in Amperes, Potential in Volts, and Power in Watts!"
      },
      {
        id: 'drummer_bonzo', name: 'DRUMMER BONZO', topic: 'DRUMMER • RHYTHM & CEREBELLUM', x: 18, y: 9,
        hatColor: '#d97706', shirtColor: '#fef3c7',
        fact: "DRUMMER BONZO: Keeping complex polyrhythms requires the Cerebellum—the part of the brain that coordinates voluntary movement, balance, and timing!"
      },
      {
        id: 'breakdancer_spin', name: 'B-BOY SPIN', topic: 'BREAKDANCER • ANGULAR MOMENTUM', x: 13, y: 12,
        hatColor: '#eab308', shirtColor: '#fef08a',
        fact: "B-BOY SPIN: Molten rock underground is Magma, and once it erupts onto the surface it's Lava! Subduction occurs when one tectonic plate sinks under another!"
      },
      {
        id: 'overworld_moltres', name: 'MOLTRES', topic: 'LEGENDARY POKéMON • THERMODYNAMICS', x: 13, y: 3,
        isMonster: true, monsterId: 'moltres',
        fact: "MOLTRES: ★ Gyaoooh! ★ (An Endothermic reaction absorbs heat from its surroundings, while an Exothermic reaction releases heat!)"
      }
    ]
  },

  // 12. FAR SOUTH: ABYSS (South of BEACH)
  ABYSS: {
    id: 'ABYSS',
    name: 'TRENCH CORAL ABYSS (FAR SOUTH)',
    subtitle: 'N: CORAL LAGOON BEACH • DEEP OCEAN CURRENTS',
    theme: { groundA: '#0f172a', groundB: '#1e3a8a', path: '#38bdf8', grass: '#0369a1', grassTip: '#2dd4bf', tree: '#020617', treeTop: '#0284c7' },
    encounters: ['horsea', 'goldeen', 'magikarp', 'slowpoke', 'dratini', 'zapdos'],
    rows: [
      "TTTTTTTTTTTTTEETTTTTTTTTTTTT",
      "T...........PPPP...........T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..GGGGGG....PP....GGGGGG..T",
      "T..GGGGGG...PPPP...GGGGGG..T",
      "T..........PP..PP..........T",
      "T..WWWW...PP....PP...WWWW..T",
      "T........PPPPPPPPPP........T",
      "T..GGGG......PP......GGGG..T",
      "T..GGGG......PP......GGGG..T",
      "T............BB............T",
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
      north: { targetMap: 'BEACH', spawnX: 13, spawnY: 18 }
    },
    npcs: [
      {
        id: 'scuba_diver_cousteau', name: 'DIVER COUSTEAU', topic: 'SCUBA DIVER • THERMOHALINE', x: 13, y: 7,
        hatColor: '#0284c7', shirtColor: '#38bdf8',
        fact: "DIVER COUSTEAU: Thermohaline circulation is the global deep-ocean conveyor belt driven by differences in water temperature and salinity!"
      },
      {
        id: 'overworld_zapdos', name: 'ZAPDOS', topic: 'LEGENDARY POKéMON • BIOELECTRICITY', x: 13, y: 15,
        isMonster: true, monsterId: 'zapdos',
        fact: "ZAPDOS: ★ Zzaaap! ★ (Saltwater conducts electricity because dissolved sodium and chloride ions are free to move and carry electric charge!)"
      }
    ]
  },

  // 13. FAR WEST: SANCTUARY (West of FOREST)
  SANCTUARY: {
    id: 'SANCTUARY',
    name: 'MYSTIC RUIN SANCTUARY (FAR WEST)',
    subtitle: 'E: VIRIDIAN FOREST • COSMOLOGY, FOLKLORE & MYTH',
    theme: { groundA: '#2e1065', groundB: '#3b0764', path: '#c084fc', grass: '#4c1d95', grassTip: '#e879f9', tree: '#090d16', treeTop: '#7e22ce' },
    encounters: ['abra', 'gastly', 'drowzee', 'nidoran_f', 'nidoran_m', 'koffing', 'mewtwo', 'mew'],
    rows: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "T.TTTT..GGGGGGGGGGGG..TTTT.T",
      "T.TTTT..GGGGGGGGGGGG..TTTT.T",
      "T.......GGGG....GGGG.......T",
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
      "T......GGGG......GGGG......T",
      "T......GGGG......GGGG......T",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    exits: {
      east: { targetMap: 'FOREST', spawnX: 1, spawnY: 9 }
    },
    npcs: [
      {
        id: 'priest_gabriel', name: 'PRIEST GABRIEL', topic: 'PRIEST • VITAMIN K & HEALING', x: 9, y: 4,
        hatColor: '#f8fafc', shirtColor: '#fde047',
        fact: "PRIEST GABRIEL: Peace be with you! Remember: if the human body lacks Vitamin K, blood clotting and bleeding disorders will develop!"
      },
      {
        id: 'monk_tenzin', name: 'MONK TENZIN', topic: 'MONK • MINDFULNESS & BRAIN', x: 16, y: 4,
        hatColor: '#f97316', shirtColor: '#fed7aa',
        fact: "MONK TENZIN: Deep in the temporal lobe, the Hippocampus plays a major role in memory formation, while the Frontal Lobe governs reasoning!"
      },
      {
        id: 'witch_morgana', name: 'WITCH MORGANA', topic: 'WITCH • FOLKLORE & FAE', x: 10, y: 8,
        hatColor: '#581c87', shirtColor: '#d8b4fe',
        fact: "WITCH MORGANA: A ring of mushrooms in woodland folklore is called a Fairy Ring! Hans Christian Andersen wrote 'The Little Mermaid', and the Brothers Grimm compiled 'Cinderella'!"
      },
      {
        id: 'wizard_merlin', name: 'WIZARD MERLIN', topic: 'WIZARD • QUANTUM & COSMOS', x: 16, y: 8,
        hatColor: '#1d4ed8', shirtColor: '#93c5fd',
        fact: "WIZARD MERLIN: Dark Matter makes up ~85% of the universe's mass, Dark Energy drives cosmic expansion, and the Event Horizon is a Black Hole's point of no return!"
      },
      {
        id: 'overworld_mew', name: 'MYTHICAL MEW', topic: 'LEGENDARY POKéMON • GENETICS', x: 13, y: 12,
        isMonster: true, monsterId: 'mew',
        fact: "MEW: ★ Mew~ ★ (DNA carries genetic information using four nitrogenous bases: Adenine, Thymine, Cytosine, and Guanine!)"
      }
    ]
  }
};