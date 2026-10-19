/********************************************************************
 * maps.js
 * 5 Interconnected 28x20 Biome Maps, Themes, Exits & Scholar NPCs:
 * - CENTER:   Pallet Research Hub (Exits N, E, S, W)
 * - MOUNTAIN: Crag Mountain Peak (North)
 * - DESERT:   Scorched Mirage Desert (East)
 * - BEACH:    Coral Lagoon Beach (South)
 * - FOREST:   Viridian Canopy Forest (West)
 ********************************************************************/

const MAP_COLS = 28;
const MAP_ROWS = 20;
const TILE_SIZE = 32;

const WORLD_MAPS = {
  CENTER: {
    id: 'CENTER',
    name: 'PALLET RESEARCH HUB',
    subtitle: 'N: MOUNTAIN • E: DESERT • S: BEACH • W: FOREST',
    theme: {
      groundA: '#65a30d',
      groundB: '#6dab14',
      path: '#d6b37c',
      grass: '#15803d',
      grassTip: '#4ade80',
      tree: '#14532d',
      treeTop: '#22c55e'
    },
    encounters: ['voltbit', 'fernlynx', 'charcoalon', 'aquashell'],
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
        id: 'nurse_joy',
        name: 'NURSE JOY',
        topic: 'HEAL & CELL FACT',
        x: 14,
        y: 5,
        hatColor: '#f43f5e',
        shirtColor: '#fda4af',
        healsParty: true,
        fact: "Welcome to the Hub Center! I've fully restored your Party's HP! Remember: the Mitochondria is the powerhouse organelle of a eukaryotic cell that generates ATP!"
      },
      {
        id: 'guide_leo',
        name: 'GUIDE LEO',
        topic: 'BIOME GATEWAY FACT',
        x: 13,
        y: 8,
        hatColor: '#2563eb',
        shirtColor: '#60a5fa',
        fact: "KNOWLEDGE FACT: Follow the 4 roads to visit the Mountain (North), Desert (East), Beach (South), or Forest (West)! Also, in binary code, 1010 represents the decimal number 10!"
      },
      {
        id: 'chemist_ignis',
        name: 'CHEMIST IGNIS',
        topic: 'FIRE • CHEMISTRY FACT',
        x: 19,
        y: 4,
        hatColor: '#ea580c',
        shirtColor: '#fb923c',
        fact: "KNOWLEDGE FACT: The chemical symbol for Gold is Au, and an Exothermic reaction is any chemical reaction that releases heat to its surroundings!"
      }
    ]
  },

  MOUNTAIN: {
    id: 'MOUNTAIN',
    name: 'CRAG MOUNTAIN PEAK (NORTH)',
    subtitle: 'HIGHLAND HABITAT • WILD PYROCORE & VOLTBIT',
    theme: {
      groundA: '#57534e',
      groundB: '#44403c',
      path: '#a8a29e',
      grass: '#3f6212',
      grassTip: '#a3e635',
      tree: '#292524',
      treeTop: '#78716c'
    },
    encounters: ['pyrocore', 'voltbit', 'charcoalon'],
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
      "T..GGGGP...TTTTTT...PGGGG..T",
      "T......PP...TTTT...PP......T",
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
      south: { targetMap: 'CENTER', spawnX: 13, spawnY: 1 }
    },
    npcs: [
      {
        id: 'geologist_brock',
        name: 'GEOLOGIST COLE',
        topic: 'MOUNTAIN • EARTH FACT',
        x: 13,
        y: 5,
        hatColor: '#78350f',
        shirtColor: '#d97706',
        fact: "KNOWLEDGE FACT: Igneous rock formed from lava cooling rapidly on Earth's surface is called Extrusive rock—and the Troposphere is the atmospheric layer where most weather clouds form!"
      },
      {
        id: 'physicist_tesla',
        name: 'DR. TESLA',
        topic: 'MOUNTAIN • PHYSICS FACT',
        x: 11,
        y: 11,
        hatColor: '#eab308',
        shirtColor: '#fde047',
        fact: "KNOWLEDGE FACT: In electrical circuits, Resistance (measured in Ohms) is the opposition to current flow, and the Newton is the standard SI unit of force!"
      }
    ]
  },

  DESERT: {
    id: 'DESERT',
    name: 'SCORCHED MIRAGE DESERT (EAST)',
    subtitle: 'ARID DUNES • WILD CHARCOALON, PYROCORE & VOLTBIT',
    theme: {
      groundA: '#d97706',
      groundB: '#b45309',
      path: '#fde68a',
      grass: '#9a3412',
      grassTip: '#fb923c',
      tree: '#15803d',
      treeTop: '#4ade80'
    },
    encounters: ['charcoalon', 'pyrocore', 'voltbit'],
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
      west: { targetMap: 'CENTER', spawnX: 26, spawnY: 9 }
    },
    npcs: [
      {
        id: 'nomad_sol',
        name: 'NOMAD SOL',
        topic: 'DESERT • THERMODYNAMICS FACT',
        x: 13,
        y: 11,
        hatColor: '#dc2626',
        shirtColor: '#fca5a5',
        fact: "KNOWLEDGE FACT: The First Law of Thermodynamics states that energy cannot be created or destroyed, only transformed—and Hydrogen is the most abundant element in the universe!"
      }
    ]
  },

  BEACH: {
    id: 'BEACH',
    name: 'CORAL LAGOON BEACH (SOUTH)',
    subtitle: 'COASTAL SHORE • WILD AQUASHELL & TIDALFIN',
    theme: {
      groundA: '#fde047',
      groundB: '#facc15',
      path: '#fef08a',
      grass: '#0d9488',
      grassTip: '#5eead4',
      tree: '#15803d',
      treeTop: '#4ade80'
    },
    encounters: ['aquashell', 'tidalfin', 'voltbit'],
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
      north: { targetMap: 'CENTER', spawnX: 13, spawnY: 18 }
    },
    npcs: [
      {
        id: 'captain_marina',
        name: 'CAPTAIN MARINA',
        topic: 'BEACH • OCEAN FACT',
        x: 13,
        y: 7,
        hatColor: '#0284c7',
        shirtColor: '#38bdf8',
        fact: "KNOWLEDGE FACT: Water covers about 71% of Earth's surface! The Pacific Ocean is the largest and deepest ocean, containing the Mariana Trench, and ocean tides are driven by the Moon and Sun's gravity!"
      }
    ]
  },

  FOREST: {
    id: 'FOREST',
    name: 'VIRIDIAN CANOPY FOREST (WEST)',
    subtitle: 'DEEP WOODS • WILD FERNLYNX & AQUASHELL',
    theme: {
      groundA: '#3f6212',
      groundB: '#365314',
      path: '#a16207',
      grass: '#14532d',
      grassTip: '#22c55e',
      tree: '#052e16',
      treeTop: '#15803d'
    },
    encounters: ['fernlynx', 'aquashell', 'voltbit'],
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
      east: { targetMap: 'CENTER', spawnX: 1, spawnY: 9 }
    },
    npcs: [
      {
        id: 'botanist_lin',
        name: 'BOTANIST LIN',
        topic: 'FOREST • BOTANY FACT',
        x: 13,
        y: 8,
        hatColor: '#16a34a',
        shirtColor: '#4ade80',
        fact: "KNOWLEDGE FACT: Plants absorb Carbon Dioxide using green Chlorophyll, flower pollen is produced on the Anther, and Fungi are the primary decomposers of dead forest trees!"
      },
      {
        id: 'ranger_oak',
        name: 'RANGER OAK',
        topic: 'FOREST • ECOLOGY FACT',
        x: 13,
        y: 14,
        hatColor: '#7c3aed',
        shirtColor: '#c084fc',
        fact: "KNOWLEDGE FACT: Mutualism is a symbiotic relationship where both organisms benefit, and Omnivores are animals that eat both plants and other animals!"
      }
    ]
  }
};