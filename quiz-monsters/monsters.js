/********************************************************************
 * monsters.js
 * 1. Elemental Types & Effectiveness Matrix
 * 2. Retrofittable 16x16 8-Color Monster Pixel Matrices
 * 3. Monster Species Stats & SVG Generators
 * 4. Elemental Trivia Moveset Question Pool (with Difficulty 1-3)
 ********************************************************************/

const ELEMENT_TYPES = {
  GRASS: {
    id: 'GRASS',
    name: 'GRASS',
    subject: 'Ecology & Nature',
    badgeClass: 'bg-emerald-600',
    btnClass: 'bg-emerald-600 hover:bg-emerald-500 text-white'
  },
  WATER: {
    id: 'WATER',
    name: 'WATER',
    subject: 'Ocean & Earth',
    badgeClass: 'bg-sky-600',
    btnClass: 'bg-sky-600 hover:bg-sky-500 text-white'
  },
  FIRE: {
    id: 'FIRE',
    name: 'FIRE',
    subject: 'Chemistry & Physics',
    badgeClass: 'bg-orange-600',
    btnClass: 'bg-orange-600 hover:bg-orange-500 text-white'
  },
  ELECTRIC: {
    id: 'ELECTRIC',
    name: 'ELECTRIC',
    subject: 'Tech, Logic & Math',
    badgeClass: 'bg-amber-500',
    btnClass: 'bg-amber-500 hover:bg-amber-400 text-slate-950'
  }
};

function getEffectiveness(attackType, defendType) {
  const chart = {
    GRASS:    { WATER: 2.0, FIRE: 0.5, GRASS: 0.5, ELECTRIC: 1.0 },
    WATER:    { FIRE: 2.0, GRASS: 0.5, WATER: 0.5, ELECTRIC: 1.0 },
    FIRE:     { GRASS: 2.0, WATER: 0.5, FIRE: 0.5, ELECTRIC: 1.0 },
    ELECTRIC: { WATER: 2.0, GRASS: 0.5, ELECTRIC: 0.5, FIRE: 1.0 }
  };
  return (chart[attackType] && chart[attackType][defendType]) || 1.0;
}

/********************************************************************
 * RETROFITTABLE 16x16 8-COLOR MONSTER PIXEL MATRICES
 * Clean 8-Slot Palette per Monster:
 *   p = Primary     s = Secondary   d = Dark Outline   a = Accent
 *   w = White       h = Highlight   m = Shadow         c = Core/Belly
 ********************************************************************/
const DEFAULT_MONSTER_PIXELS = {
  voltbit: {
    palette: {
      p: '#facc15', s: '#eab308', d: '#1e293b', a: '#ef4444',
      w: '#ffffff', h: '#fef08a', m: '#ca8a04', c: '#fde047'
    },
    grid: [
      "................",
      "...dd......dd...",
      "...dm......md...",
      "...ph......hp...",
      "....hhhhhhhh....",
      "...hppppppppph..",
      "...ppwdppwdpp...",
      "...ppddppddpp.aa",
      "...aappddppaa.ss",
      "...aappccppaa.pp",
      "...ppppccpppp.mm",
      "...spppccppps...",
      "....mmmmmmmm....",
      "....mdm..mdm....",
      "....ddd..ddd....",
      "................"
    ]
  },
  charcoalon: {
    palette: {
      p: '#f97316', s: '#ea580c', d: '#1e293b', a: '#fde047',
      w: '#ffffff', h: '#fdba74', m: '#9a3412', c: '#ef4444'
    },
    grid: [
      ".............aa.",
      "............aca.",
      ".....hhhhp..ccc.",
      ".....wdhpp...ss.",
      ".....ddppp...sm.",
      "....hppppps..mm.",
      "....ppppppps.m..",
      "..ccppaaaapp....",
      "..ccppahhapppss.",
      "..mmppahhapppsm.",
      "....ppaaaappmmm.",
      "....spaaaaps....",
      "....mms.smm.....",
      "....mws.swm.....",
      "....ddd.ddd.....",
      "................"
    ]
  },
  aquashell: {
    palette: {
      p: '#38bdf8', s: '#0284c7', d: '#0f172a', a: '#bae6fd',
      w: '#ffffff', h: '#7dd3fc', m: '#0369a1', c: '#fde68a'
    },
    grid: [
      "................",
      "................",
      ".....hhhhh......",
      "....hppppph.....",
      "....pwdppwd.....",
      "....pddppdd.....",
      "...mmmmmmmmm....",
      "...msccccccsmww.",
      "..ppdccccccdaaa.",
      "..pmdccccccdaam.",
      "..mmmmmmmmmmmm..",
      "...ddccccccdd...",
      "....ppp..ppp....",
      "....pmm..mmp....",
      "....ddd..ddd....",
      "................"
    ]
  },
  fernlynx: {
    palette: {
      p: '#4ade80', s: '#16a34a', d: '#052e16', a: '#facc15',
      w: '#ffffff', h: '#86efac', m: '#15803d', c: '#dcfce7'
    },
    grid: [
      ".......aa.......",
      "......ahha......",
      "......hssh......",
      "...ss.hssh.ss...",
      "...shhhhhhhhhs..",
      "...spppppppps...",
      "....padppadp....",
      "....pddppddp....",
      "....pppccppp....",
      "....ppccccpp....",
      "....spccccps....",
      "....mmmmmmmm....",
      "....mms..smm....",
      "....mms..smm....",
      "....ddd..ddd....",
      "................"
    ]
  },
  pyrocore: {
    palette: {
      p: '#ef4444', s: '#b91c1c', d: '#111827', a: '#fef08a',
      w: '#ffffff', h: '#f87171', m: '#7f1d1d', c: '#f97316'
    },
    grid: [
      ".......aa.......",
      "......acca......",
      ".....cccccc.....",
      "....hhhhhhhh....",
      "....pppppppp....",
      "...ssssssssss...",
      "...ssaw..wass...",
      "..ccsac..cascc..",
      "..ppssssssssspp.",
      "..mmsccccccsmm..",
      "..mmssaaaaassmm.",
      "...mmssssssssmm.",
      "....mdd..ddm....",
      "....mdd..ddm....",
      "....ddd..ddd....",
      "................"
    ]
  },
  tidalfin: {
    palette: {
      p: '#2563eb', s: '#1d4ed8', d: '#0f172a', a: '#67e8f9',
      w: '#ffffff', h: '#60a5fa', m: '#1e3a8a', c: '#e0f2fe'
    },
    grid: [
      ".......aa.......",
      ".......aah......",
      ".......aah......",
      "......haah......",
      "....hhhhhhhh....",
      "....pppppppp....",
      "..aapwdppwdpsss.",
      "..hapddppddpssm.",
      "..happccccppssm.",
      "..aapccccccpsmm.",
      "....pccccccp....",
      "....mmmmmmmm....",
      ".....sm..ms.....",
      ".....dm..md.....",
      ".....dd..dd.....",
      "................"
    ]
  }
};

let MONSTER_PIXELS = structuredClone(DEFAULT_MONSTER_PIXELS);

const MONSTER_SPECIES = [
  { id: 'voltbit',    name: 'VOLTBIT',    type: 'ELECTRIC', baseHp: 140, level: 14 },
  { id: 'charcoalon', name: 'CHARCOALON', type: 'FIRE',     baseHp: 125, level: 12 },
  { id: 'aquashell',  name: 'AQUASHELL',  type: 'WATER',    baseHp: 135, level: 13 },
  { id: 'fernlynx',   name: 'FERNLYNX',   type: 'GRASS',    baseHp: 130, level: 13 },
  { id: 'pyrocore',   name: 'PYROCORE',   type: 'FIRE',     baseHp: 150, level: 15 },
  { id: 'tidalfin',   name: 'TIDALFIN',   type: 'WATER',    baseHp: 145, level: 15 }
];

const PALETTE_SLOT_NAMES = {
  p: 'Primary (p)',
  s: 'Secondary (s)',
  d: 'Outline (d)',
  a: 'Accent (a)',
  w: 'White (w)',
  h: 'Highlight (h)',
  m: 'Shadow (m)',
  c: 'Core/Belly (c)'
};

const PIXEL_COLOR_PRESETS = [
  '#0f172a', '#ffffff', '#ef4444', '#f97316',
  '#facc15', '#4ade80', '#15803d', '#38bdf8',
  '#2563eb', '#a855f7', '#f43f5e', '#78350f'
];

function renderMonsterSVG(speciesOrId) {
  const id = typeof speciesOrId === 'string' ? speciesOrId : speciesOrId.id;
  const art = MONSTER_PIXELS[id] || MONSTER_PIXELS.voltbit;
  const pal = art.palette;
  let rects = '';
  for (let y = 0; y < 16; y++) {
    const row = art.grid[y] || '................';
    for (let x = 0; x < 16; x++) {
      const ch = row.charAt(x);
      if (ch !== '.' && pal[ch]) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${pal[ch]}"/>`;
      }
    }
  }
  return `<svg viewBox="0 0 16 16" class="w-full h-full drop-shadow-md">${rects}</svg>`;
}

function renderCaptureBallSVG(highlightStar = false) {
  return `
    <svg viewBox="0 0 16 16" class="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg">
      ${highlightStar ? '<rect x="7" y="0" width="2" height="2" fill="#fde047"/><rect x="2" y="2" width="2" height="2" fill="#fde047"/><rect x="12" y="2" width="2" height="2" fill="#fde047"/>' : ''}
      <rect x="5" y="3" width="6" height="2" fill="#0f172a"/>
      <rect x="3" y="5" width="10" height="3" fill="#ef4444"/>
      <rect x="3" y="8" width="10" height="1" fill="#0f172a"/>
      <rect x="3" y="9" width="10" height="3" fill="#f8fafc"/>
      <rect x="5" y="12" width="6" height="2" fill="#0f172a"/>
      <rect x="6" y="7" width="4" height="3" fill="#0f172a"/>
      <rect x="7" y="8" width="2" height="1" fill="${highlightStar ? '#4ade80' : '#fde047'}"/>
    </svg>`;
}

/********************************************************************
 * ELEMENTAL TRIVIA MOVESET QUESTION POOL (32 QUESTIONS, DIFF 1-3)
 ********************************************************************/
const DEFAULT_QUESTIONS = [
  // GRASS: Ecology, Biology & Nature
  { type: 'GRASS', difficulty: 1, q: 'Which gas do plants absorb from the atmosphere during photosynthesis?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Argon'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What is the powerhouse organelle of a eukaryotic cell that generates ATP?', options: ['Mitochondria', 'Ribosome', 'Golgi Apparatus', 'Nucleolus'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'Which pigment gives plant leaves their green color?', options: ['Chlorophyll', 'Carotene', 'Hemoglobin', 'Melanin'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What term describes animals that eat both plants and other animals?', options: ['Omnivores', 'Herbivores', 'Carnivores', 'Detritivores'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'Which biome is characterized by permafrost and very low temperatures?', options: ['Tundra', 'Savanna', 'Taiga', 'Chaparral'], answer: 0 },
  { type: 'GRASS', difficulty: 3, q: 'What part of a flower produces pollen?', options: ['Anther', 'Stigma', 'Sepal', 'Pistil'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'Symbiosis where both organisms benefit is known as what?', options: ['Mutualism', 'Parasitism', 'Commensalism', 'Predation'], answer: 0 },
  { type: 'GRASS', difficulty: 3, q: 'Which group of organisms is primarily responsible for decomposing dead lignin in trees?', options: ['Fungi', 'Ferns', 'Mosses', 'Conifers'], answer: 0 },

  // WATER: Ocean, Weather & Earth Science
  { type: 'WATER', difficulty: 1, q: 'Which ocean is the largest and deepest on Earth?', options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What is the process of water vapor turning directly into liquid clouds?', options: ['Condensation', 'Evaporation', 'Sublimation', 'Transpiration'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'Roughly what percentage of Earth’s surface is covered by water?', options: ['71%', '51%', '85%', '60%'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What causes the regular rise and fall of ocean tides on Earth?', options: ['Gravitational pull of the Moon & Sun', 'Ocean floor volcanic vents', 'Earth’s magnetic field', 'Trade wind currents'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What is the deepest known trench in the world’s oceans?', options: ['Mariana Trench', 'Tonga Trench', 'Java Trench', 'Puerto Rico Trench'], answer: 0 },
  { type: 'WATER', difficulty: 3, q: 'Which layer of Earth’s atmosphere contains the majority of weather clouds?', options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], answer: 0 },
  { type: 'WATER', difficulty: 3, q: 'Igneous rock formed from cooled lava on the Earth’s surface is called?', options: ['Extrusive rock', 'Intrusive rock', 'Metamorphic rock', 'Sedimentary rock'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'Which warm ocean current moderates the climate of Western Europe?', options: ['The Gulf Stream', 'Humboldt Current', 'Kuroshio Current', 'Benguela Current'], answer: 0 },

  // FIRE: Chemistry, Energy & Physics
  { type: 'FIRE', difficulty: 1, q: 'Which subatomic particle carries a negative electrical charge?', options: ['Electron', 'Proton', 'Neutron', 'Photon'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What is the chemical symbol for the element Gold?', options: ['Au', 'Ag', 'Fe', 'Gd'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'At standard atmospheric pressure, at what Celsius temperature does water boil?', options: ['100°C', '90°C', '180°C', '212°C'], answer: 0 },
  { type: 'FIRE', difficulty: 3, q: 'Which law states that energy cannot be created or destroyed, only transformed?', options: ['First Law of Thermodynamics', 'Ohm’s Law', 'Boyle’s Law', 'Hooke’s Law'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What is the most abundant chemical element in the universe?', options: ['Hydrogen', 'Helium', 'Gold', 'Carbon'], answer: 0 },
  { type: 'FIRE', difficulty: 3, q: 'A chemical reaction that releases heat to its surroundings is called?', options: ['Exothermic', 'Endothermic', 'Isothermal', 'Catalytic'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What is the standard SI unit of force?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'What is the pH value of pure neutral water at 25°C?', options: ['7', '0', '10', '14'], answer: 0 },

  // ELECTRIC: Tech, Logic & Mathematics
  { type: 'ELECTRIC', difficulty: 2, q: 'In binary code, what decimal number is represented by 1010?', options: ['10', '8', '12', '6'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What is the square root of 144?', options: ['12', '14', '11', '16'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'Which logic gate outputs TRUE only when BOTH inputs are TRUE?', options: ['AND Gate', 'OR Gate', 'XOR Gate', 'NOT Gate'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'How many bits make up a single byte?', options: ['8 bits', '4 bits', '16 bits', '32 bits'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'What is the next prime number after 13?', options: ['17', '15', '19', '21'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 3, q: 'In electrical circuits, what does Resistance measure (in Ohms)?', options: ['Opposition to current flow', 'Total charge stored', 'Voltage amplification', 'Magnetic flux'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'If a right triangle has angles of 90° and 45°, what is the third angle?', options: ['45°', '30°', '60°', '90°'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What does CPU stand for in computer hardware?', options: ['Central Processing Unit', 'Core Power Utility', 'Circuit Protocol Unit', 'Calculated Program User'], answer: 0 }
];