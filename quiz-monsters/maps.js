/********************************************************************
 * maps.js
 * 5 Biome Maps with Named Scholars & Occupational Professionals
 * Includes Partner Follower Drawing and Depth Sorting Logic
 ********************************************************************/

const MAP_COLS = 28;
const MAP_ROWS = 20;
const TILE_SIZE = 32;

const WORLD_MAPS = {
  CENTER: {
    id: 'CENTER',
    name: 'PALLET RESEARCH HUB',
    subtitle: 'N: MOUNTAIN • E: DESERT • S: BEACH • W: FOREST',
    theme: { groundA: '#65a30d', groundB: '#6dab14', path: '#d6b37c', grass: '#15803d', grassTip: '#4ade80', tree: '#14532d', treeTop: '#22c55e' },
    encounters: ['pikachu', 'pidgey', 'rattata','spearow'],
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
      west:  { targetMap: 'FOREST',    spawnX: 26, spawnY: 9 },
      east:  { targetMap: 'DESERT',    spawnX: 1,  spawnY: 9 }
    },
    npcs: [
      {
        id: 'nurse_joy', name: 'NURSE JOY', topic: 'NURSE • HEAL & CELL FACT', x: 14, y: 5,
        hatColor: '#f43f5e', shirtColor: '#fda4af', healsParty: true,
        fact: "NURSE JOY: Welcome to the Hub Center! I've fully restored your Party's HP! Remember: the Mitochondria is the powerhouse organelle of a eukaryotic cell that generates ATP!"
      },
      {
        id: 'doctor_house', name: 'DR. HOUSE', topic: 'DOCTOR • ANATOMY FACT', x: 13, y: 8,
        hatColor: '#0284c7', shirtColor: '#e0f2fe',
        fact: "DR. HOUSE: As a medical doctor, I treat patients daily. Remember: Hemoglobin is the protein in red blood cells that carries oxygen from the lungs to body tissues!"
      },
      {
        id: 'officer_jenny', name: 'OFFICER JENNY', topic: 'POLICEMAN • LOGIC & LAWS', x: 19, y: 4,
        hatColor: '#1e3a8a', shirtColor: '#60a5fa',
        fact: "OFFICER JENNY: Law and order! In binary code, the decimal number 10 is represented as 1010, and an AND Logic Gate outputs TRUE only when both inputs are TRUE!"
      },
      {
        id: 'teacher_cherry', name: 'TEACHER CHERRY', topic: 'TEACHER • CRITICAL THINKING', x: 13, y: 5,
        hatColor: '#8b5cf6', shirtColor: '#c084fc',
        fact: "TEACHER CHERRY: Welcome back to the Hub Center! Always analyze sources critically before jumping to conclusions!"
      },
    ]
  },

  MOUNTAIN: {
    id: 'MOUNTAIN',
    name: 'CRAG MOUNTAIN PEAK (NORTH)',
    subtitle: 'HIGHLAND HABITAT • WILD PYROCORE & VOLTBIT',
    theme: { groundA: '#57534e', groundB: '#44403c', path: '#a8a29e', grass: '#3f6212', grassTip: '#a3e635', tree: '#292524', treeTop: '#78716c' },
    encounters: ['charmander', 'clefairy', 'vulpix', 'jigglypuff', 'zubat','growlithe','ponyta'],
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
        id: 'geologist_cole', name: 'GEOLOGIST COLE', topic: 'GEOLOGIST • EARTH SCIENCE', x: 13, y: 5,
        hatColor: '#78350f', shirtColor: '#d97706',
        fact: "GEOLOGIST COLE: As a geologist studying rock strata, I know that Igneous rock formed from cooled lava on Earth's surface is called Extrusive rock!"
      },
      {
        id: 'fireman_bravo', name: 'CHIEF BRAVO', topic: 'FIREMAN • THERMODYNAMICS', x: 11, y: 11,
        hatColor: '#dc2626', shirtColor: '#fca5a5',
        fact: "CHIEF BRAVO: Putting out fires is my job! Remember: an Exothermic reaction releases heat to its surroundings, and the First Law of Thermodynamics conserves energy!"
      }
    ]
  },

  DESERT: {
    id: 'DESERT',
    name: 'SCORCHED MIRAGE DESERT (EAST)',
    subtitle: 'ARID DUNES • WILD CHARCOALON, PYROCORE & VOLTBIT',
    theme: { groundA: '#d97706', groundB: '#b45309', path: '#fde68a', grass: '#9a3412', grassTip: '#fb923c', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['sandshrew', 'nidoran_f','nidoran_m','machop','mankey'],
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
        id: 'psychologist_adler', name: 'DR. ADLER', topic: 'PSYCHOLOGIST • HUMAN BEHAVIOR', x: 13, y: 11,
        hatColor: '#4338ca', shirtColor: '#a5b4fc',
        fact: "DR. ADLER: As a psychologist studying cognition, I explore how minds process logic. Remember: Hydrogen is the most abundant chemical element in the universe!"
      }
    ]
  },

  BEACH: {
    id: 'BEACH',
    name: 'CORAL LAGOON BEACH (SOUTH)',
    subtitle: 'COASTAL SHORE • WILD AQUASHELL & TIDALFIN',
    theme: { groundA: '#fde047', groundB: '#facc15', path: '#fef08a', grass: '#0d9488', grassTip: '#5eead4', tree: '#15803d', treeTop: '#4ade80' },
    encounters: ['squirtle', 'psyduck', 'poliwag','tentacool','geodude','abra','ekans'],
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
        id: 'ecologist_lin', name: 'ECOLOGIST LIN', topic: 'ECOLOGIST • MARINE HABITATS', x: 13, y: 7,
        hatColor: '#16a34a', shirtColor: '#4ade80',
        fact: "ECOLOGIST LIN: As an ecologist, I study biomes! Water covers 71% of Earth, the Pacific Ocean holds the Mariana Trench, and mutualism is a symbiotic relationship where both organisms benefit."
      }
    ]
  },

  FOREST: {
    id: 'FOREST',
    name: 'VIRIDIAN CANOPY FOREST (WEST)',
    subtitle: 'DEEC WOODS • WILD FERNLYNX & AQUASHELL',
    theme: { groundA: '#3f6212', groundB: '#365314', path: '#a16207', grass: '#14532d', grassTip: '#22c55e', tree: '#052e16', treeTop: '#15803d' },
    encounters: ['bulbasaur', 'caterpie', 'weedle', 'oddish', 'bellsprout','meowth','venonat','paras'],
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
        id: 'botanist_elena', name: 'BOTANIST ELENA', topic: 'BOTANIST • PLANT SCIENCE', x: 13, y: 8,
        hatColor: '#84cc16', shirtColor: '#bef264',
        fact: "BOTANIST ELENA: As a botanist, I study plants! Plants absorb Carbon Dioxide during photosynthesis using green Chlorophyll, and flower pollen is produced in the Anther."
      }
    ]
  }
};

/********************************************************************
 * MAP CANVAS RENDERING & FOLLOWER DEPTH-SORTING
 ********************************************************************/
function drawOverworldCanvas() {
  const canvas = document.getElementById('overworldCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const mapObj = getCurrentMap();
  const theme = mapObj.theme;
  const p = state.playerWorld;

  // Camera calculations
  const camX = p.pixelX - canvas.width / 2 + TILE_SIZE / 2;
  const camY = p.pixelY - canvas.height / 2 + TILE_SIZE / 2;

  // 1. Draw Map Tiles
  for (let r = 0; r < mapObj.rows.length; r++) {
    for (let c = 0; c < mapObj.rows[r].length; c++) {
      const tile = mapObj.rows[r].charAt(c);
      const x = c * TILE_SIZE - camX;
      const y = r * TILE_SIZE - camY;

      // Skip offscreen tiles for optimization
      if (x < -TILE_SIZE || x > canvas.width || y < -TILE_SIZE || y > canvas.height) continue;

      // Tile Backgrounds
      if (tile === 'T') {
        ctx.fillStyle = theme.tree;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = theme.treeTop;
        ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      } else if (tile === 'W') {
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(x + 6, y + 6, TILE_SIZE - 12, TILE_SIZE - 12);
      } else if (tile === 'G') {
        ctx.fillStyle = theme.grass;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = theme.grassTip;
        ctx.fillRect(x + 8, y + 8, 4, 4);
        ctx.fillRect(x + 20, y + 16, 4, 4);
      } else if (tile === 'P' || tile === 'E') {
        ctx.fillStyle = theme.path;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
      } else if (tile === 'H' || tile === 'D') {
        ctx.fillStyle = '#475569';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      } else {
        ctx.fillStyle = ((r + c) % 2 === 0) ? theme.groundA : theme.groundB;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  // 2. Draw NPCs
  if (mapObj.npcs) {
    mapObj.npcs.forEach(npc => {
      const nx = npc.x * TILE_SIZE - camX;
      const ny = npc.y * TILE_SIZE - camY;
      if (nx >= -TILE_SIZE && nx <= canvas.width && ny >= -TILE_SIZE && ny <= canvas.height) {
        // Simple NPC Sprite Box
        ctx.fillStyle = npc.hatColor || '#334155';
        ctx.fillRect(nx + 6, ny + 4, 20, 10);
        ctx.fillStyle = npc.shirtColor || '#94a3b8';
        ctx.fillRect(nx + 4, ny + 14, 24, 14);

        // Interaction exclamation bubble if facing
        const facing = getFacingNPC();
        if (facing && facing.id === npc.id) {
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(nx + 16, ny - 6, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px monospace';
          ctx.fillText('!', nx + 14, ny - 3);
        }
      }
    });
  }

  // 3. DEPTH-SORTED PARTNER & PLAYER RENDERING
  const pw = state.partnerWorld;
  const playerY = p.pixelY;
  const partnerY = pw ? pw.pixelY : playerY;

  const renderPlayer = () => {
    if (typeof drawPlayerSprite === 'function') {
      drawPlayerSprite(ctx, p.pixelX - camX, p.pixelY - camY + p.hopOffsetY, p.dir);
    } else {
      // Fallback Player Graphic
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(Math.round(p.pixelX - camX) + 6, Math.round(p.pixelY - camY + p.hopOffsetY) + 4, 20, 24);
    }
  };

  const renderPartner = () => {
    if (pw && typeof drawFollowerPartner === 'function') {
      drawFollowerPartner(ctx, camX, camY);
    }
  };

  if (partnerY <= playerY) {
    renderPartner();
    renderPlayer();
  } else {
    renderPlayer();
    renderPartner();
  }
}