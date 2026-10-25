/********************************************************************
 * overworld.js
 * Eased 1-Block Movement, Partner Follower Tracking, Full Obstacle
 * Interactions, Random Floor Items (Berries & Stones) & Diverse Skin Tones
 ********************************************************************/

const FLOOR_ITEM_TYPES = [
  {
    id: 'oran_berry',
    name: 'ORAN BERRY',
    category: 'BERRY',
    color: '#3b82f6',
    highlight: '#93c5fd',
    leaf: '#22c55e',
    desc: 'Restored +50 HP to your active partner!'
  },
  {
    id: 'sitrus_berry',
    name: 'SITRUS BERRY',
    category: 'BERRY',
    color: '#facc15',
    highlight: '#fef08a',
    leaf: '#16a34a',
    desc: 'Fully restored your active partner\'s HP!'
  },
  {
    id: 'lum_berry',
    name: 'LUM BERRY',
    category: 'BERRY',
    color: '#22c55e',
    highlight: '#86efac',
    leaf: '#15803d',
    desc: 'Boosted your active partner\'s Evolution Bar by +1!'
  },
  {
    id: 'fire_stone',
    name: 'FIRE STONE',
    category: 'STONE',
    stoneType: 'FIRE',
    color: '#f97316',
    highlight: '#fde047',
    leaf: '#dc2626',
    desc: 'A radiant Fire Stone! Evolves Fire-type & compatible Pokémon!'
  },
  {
    id: 'water_stone',
    name: 'WATER STONE',
    category: 'STONE',
    stoneType: 'WATER',
    color: '#0284c7',
    highlight: '#7dd3fc',
    leaf: '#1e3a8a',
    desc: 'A shimmering Water Stone! Evolves Water-type & compatible Pokémon!'
  },
  {
    id: 'thunder_stone',
    name: 'THUNDER STONE',
    category: 'STONE',
    stoneType: 'ELECTRIC',
    color: '#eab308',
    highlight: '#fef08a',
    leaf: '#15803d',
    desc: 'A sparking Thunder Stone! Evolves Pikachu & Electric-type Pokémon!'
  },
  {
    id: 'leaf_stone',
    name: 'LEAF STONE',
    category: 'STONE',
    stoneType: 'GRASS',
    color: '#16a34a',
    highlight: '#86efac',
    leaf: '#78350f',
    desc: 'A verdant Leaf Stone! Evolves Grass-type & compatible Pokémon!'
  },
  {
    id: 'moon_stone',
    name: 'MOON STONE',
    category: 'STONE',
    stoneType: 'ANY',
    color: '#a855f7',
    highlight: '#e9d5ff',
    leaf: '#3b0764',
    desc: 'A mystic Moon Stone! Instantly fills the Evolution Bar of any evolving partner!'
  }
];

const HUMAN_SKIN_PALETTE = [
  '#fde68a', // Light warm
  '#fed7aa', // Peach
  '#f5cba7', // Warm beige
  '#e59866', // Golden tan
  '#ca8a5b', // Medium bronze
  '#a16236', // Rich brown
  '#784212', // Deep espresso
  '#5c3317'  // Dark umber
];

function getNPCSkinColor(npc) {
  if (!npc) return '#fed7aa';
  if (npc.skinColor) return npc.skinColor;
  const upperName = (npc.name || '').toUpperCase();
  const upperTopic = (npc.topic || '').toUpperCase();
  const lowerId = (npc.id || '').toLowerCase();
  if (
    npc.isAlien ||
    upperName.includes('ALIEN') ||
    upperTopic.includes('ALIEN') ||
    lowerId.includes('alien')
  ) {
    return '#4ade80'; // Extraterrestrial Alien Green
  }
  let hash = 0;
  for (let i = 0; i < lowerId.length; i++) {
    hash = (hash * 31 + lowerId.charCodeAt(i)) % 997;
  }
  return HUMAN_SKIN_PALETTE[hash % HUMAN_SKIN_PALETTE.length];
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getCurrentMap() {
  return WORLD_MAPS[state.currentMapId] || WORLD_MAPS.CENTER;
}

function getTileAt(col, row) {
  const mapObj = getCurrentMap();
  if (row < 0 || row >= MAP_ROWS || col < 0 || col >= MAP_COLS) return 'T';
  return mapObj.rows[row].charAt(col) || 'T';
}

function isTileBlocked(col, row) {
  if (row < 0 || row >= MAP_ROWS || col < 0 || col >= MAP_COLS) return true;
  const tile = getTileAt(col, row);

  if (typeof OBSTACLE_DEFS !== 'undefined' && OBSTACLE_DEFS[tile] !== undefined) {
    if (!OBSTACLE_DEFS[tile].walkable) return true;
  } else {
    if (
      tile === 'T' || tile === 'W' || tile === 'H' || tile === 'R' ||
      tile === 'I' || tile === 'C' || tile === 'K' || tile === 'L' ||
      tile === 'S' || tile === 'V' || tile === 'U' || tile === 'A' ||
      tile === 'N' || tile === 'Q'
    ) {
      return true;
    }
  }

  const mapObj = getCurrentMap();
  if (mapObj.npcs && mapObj.npcs.some(npc => npc.x === col && npc.y === row)) return true;
  if (mapObj.pokeNpcs && mapObj.pokeNpcs.some(p => p.x === col && p.y === row)) return true;
  return false;
}

function spawnFloorItemsForCurrentMap() {
  state.floorItems = [];
  const mapObj = getCurrentMap();
  if (!mapObj) return;

  const numItems = 3 + Math.floor(Math.random() * 3); // 3 to 5 items per area entry
  const validCoords = [];

  for (let r = 2; r < MAP_ROWS - 2; r++) {
    for (let c = 2; c < MAP_COLS - 2; c++) {
      const tile = getTileAt(c, r);
      if ((tile === '.' || tile === 'P' || tile === 'G' || tile === 'F') && !isTileBlocked(c, r)) {
        if (state.playerWorld && state.playerWorld.gridX === c && state.playerWorld.gridY === r) continue;
        validCoords.push({ x: c, y: r });
      }
    }
  }

  for (let i = 0; i < numItems && validCoords.length > 0; i++) {
    const randIdx = Math.floor(Math.random() * validCoords.length);
    const coord = validCoords.splice(randIdx, 1)[0];
    // 65% chance Berry, 35% chance Evolutionary Stone
    const isStone = Math.random() < 0.35;
    const pool = FLOOR_ITEM_TYPES.filter(it => it.category === (isStone ? 'STONE' : 'BERRY'));
    const chosenItem = pool[Math.floor(Math.random() * pool.length)];
    state.floorItems.push({
      x: coord.x,
      y: coord.y,
      ...chosenItem
    });
  }
}

function getFloorItemAt(col, row) {
  if (!Array.isArray(state.floorItems)) return null;
  return state.floorItems.find(it => it.x === col && it.y === row) || null;
}

function collectFloorItem(item) {
  if (!item) return;
  state.floorItems = (state.floorItems || []).filter(it => !(it.x === item.x && it.y === item.y));
  const partner = typeof getActivePlayer === 'function' ? getActivePlayer() : null;
  if (!partner) return;

  if (item.category === 'BERRY') {
    sfx.heal();
    if (item.id === 'oran_berry') {
      partner.hp = Math.min(partner.maxHp, partner.hp + 50);
      setOverworldDialogue(`Picked up an ${item.name}! ${partner.name} recovered +50 HP! (${partner.hp}/${partner.maxHp})`, item.name, 'BERRY FOUND 🍓');
    } else if (item.id === 'sitrus_berry') {
      partner.hp = partner.maxHp;
      setOverworldDialogue(`Picked up a ${item.name}! ${partner.name}'s HP was fully restored!`, item.name, 'BERRY FOUND 🍋');
    } else if (item.id === 'lum_berry') {
      partner.evoWins = (partner.evoWins || 0) + 1;
      const evolvedMsg = (typeof checkAndTriggerEvolution === 'function') ? checkAndTriggerEvolution(partner) : null;
      if (evolvedMsg) {
        setOverworldDialogue(`Picked up a ${item.name}! ${evolvedMsg}`, 'EVOLUTION! ★', 'LUM BERRY');
      } else {
        const req = typeof getEvolutionRequirement === 'function' ? getEvolutionRequirement(partner.id) : null;
        const barTxt = req ? ` (EVO BAR: ${partner.evoWins}/${req.winsNeeded})` : '';
        setOverworldDialogue(`Picked up a ${item.name}! ${partner.name} gained +1 Evolution energy!${barTxt}`, item.name, 'BERRY FOUND 🌿');
      }
    }
  } else if (item.category === 'STONE') {
    const evolvedMsg = (typeof tryStoneEvolution === 'function') ? tryStoneEvolution(partner, item) : null;
    if (evolvedMsg) {
      setOverworldDialogue(`Found a ${item.name}! ${evolvedMsg}`, 'STONE EVOLUTION! ★', item.name);
    } else {
      sfx.npcChime();
      partner.evoWins = (partner.evoWins || 0) + 1;
      const autoEvoMsg = (typeof checkAndTriggerEvolution === 'function') ? checkAndTriggerEvolution(partner) : null;
      if (autoEvoMsg) {
        setOverworldDialogue(`Found a ${item.name}! Its radiant energy filled the Evolution Bar—${autoEvoMsg}`, 'EVOLUTION! ★', item.name);
      } else {
        setOverworldDialogue(`Picked up a ${item.name}! ${item.desc} (${partner.name} absorbed +1 Evolution energy!)`, item.name, 'EVO STONE 💎');
      }
    }
  }

  syncAllUI();
  if (typeof saveGameProgress === 'function') saveGameProgress();
}

function drawFloorItemsOnCanvas(ctx, animTick) {
  if (!Array.isArray(state.floorItems) || state.floorItems.length === 0) return;
  const bob = animTick % 2 === 0 ? 0 : -2;

  state.floorItems.forEach(item => {
    const dx = item.x * TILE_SIZE;
    const dy = item.y * TILE_SIZE + bob;

    // Shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
    ctx.fillRect(dx + 10, item.y * TILE_SIZE + 24, 12, 4);

    if (item.category === 'BERRY') {
      // Stem / Leaf
      ctx.fillStyle = item.leaf || '#22c55e';
      ctx.fillRect(dx + 14, dy + 8, 4, 4);
      ctx.fillRect(dx + 12, dy + 10, 8, 2);
      // Berry body
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(dx + 9, dy + 11, 14, 13);
      ctx.fillStyle = item.color;
      ctx.fillRect(dx + 10, dy + 12, 12, 11);
      // Highlight
      ctx.fillStyle = item.highlight;
      ctx.fillRect(dx + 12, dy + 14, 4, 4);
    } else {
      // Evolutionary Stone (Octagonal Crystal)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(dx + 10, dy + 8, 12, 16);
      ctx.fillRect(dx + 8, dy + 10, 16, 12);
      ctx.fillStyle = item.color;
      ctx.fillRect(dx + 11, dy + 9, 10, 14);
      ctx.fillRect(dx + 9, dy + 11, 14, 10);
      // Inner core facet
      ctx.fillStyle = item.highlight;
      ctx.fillRect(dx + 12, dy + 11, 6, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(dx + 13, dy + 12, 3, 3);
    }
  });
}

function teleportPlayerToGrid(gx, gy) {
  const p = state.playerWorld;
  p.gridX = gx;
  p.gridY = gy;
  p.startX = gx * TILE_SIZE;
  p.startY = gy * TILE_SIZE;
  p.targetX = gx * TILE_SIZE;
  p.targetY = gy * TILE_SIZE;
  p.pixelX = gx * TILE_SIZE;
  p.pixelY = gy * TILE_SIZE;
  p.hopOffsetY = 0;
  p.isStepping = false;

  if (!state.partnerWorld) {
    state.partnerWorld = {
      gridX: gx, gridY: gy, startX: gx * TILE_SIZE, startY: gy * TILE_SIZE,
      targetX: gx * TILE_SIZE, targetY: gy * TILE_SIZE, pixelX: gx * TILE_SIZE,
      pixelY: gy * TILE_SIZE, hopOffsetY: 0, dir: 'down'
    };
  }

  const candidates = [
    { x: gx, y: gy - 1 },
    { x: gx, y: gy + 1 },
    { x: gx - 1, y: gy },
    { x: gx + 1, y: gy }
  ];
  const valid = candidates.find(c => !isTileBlocked(c.x, c.y) && getTileAt(c.x, c.y) !== 'E') || { x: gx, y: gy };

  state.partnerWorld.gridX = valid.x;
  state.partnerWorld.gridY = valid.y;
  state.partnerWorld.startX = valid.x * TILE_SIZE;
  state.partnerWorld.startY = valid.y * TILE_SIZE;
  state.partnerWorld.targetX = valid.x * TILE_SIZE;
  state.partnerWorld.targetY = valid.y * TILE_SIZE;
  state.partnerWorld.pixelX = valid.x * TILE_SIZE;
  state.partnerWorld.pixelY = valid.y * TILE_SIZE;
  state.partnerWorld.hopOffsetY = 0;

  spawnFloorItemsForCurrentMap();
}

function getFacingTileCoords() {
  const p = state.playerWorld;
  let tx = p.gridX;
  let ty = p.gridY;
  if (p.dir === 'up') ty--;
  else if (p.dir === 'down') ty++;
  else if (p.dir === 'left') tx--;
  else if (p.dir === 'right') tx++;
  return { tx, ty };
}

function getFacingNPC() {
  const { tx, ty } = getFacingTileCoords();
  const npcs = getCurrentMap().npcs || [];
  return npcs.find(npc => npc.x === tx && npc.y === ty) || null;
}

function getFacingPokeNPC() {
  const { tx, ty } = getFacingTileCoords();
  const pokeNpcs = getCurrentMap().pokeNpcs || [];
  return pokeNpcs.find(p => p.x === tx && p.y === ty) || null;
}

function interactWithFacingNPC() {
  if (state.screen !== 'OVERWORLD' || state.busy || state.playerWorld.isStepping) return;

  const { tx, ty } = getFacingTileCoords();

  // 0. Check if facing or standing on a Floor Item (Berry / Evo Stone)
  const facingItem = getFloorItemAt(tx, ty) || getFloorItemAt(state.playerWorld.gridX, state.playerWorld.gridY);
  if (facingItem) {
    collectFloorItem(facingItem);
    return;
  }

  // 1. Check if facing an Overworld Pokémon NPC
  const pokeNpc = getFacingPokeNPC();
  if (pokeNpc) {
    const species = MONSTER_SPECIES.find(m => m.id === pokeNpc.speciesId);
    const displayName = species ? species.name : pokeNpc.name;
    sfx.pokemonCry(pokeNpc.speciesId);
    setOverworldDialogue(`${displayName}! ${displayName}~`, displayName, 'POKéMON CALL ♪');
    return;
  }

  // 2. Check if facing a Scholar / Professional / Alien NPC
  const npc = getFacingNPC();
  if (npc) {
    if (npc.healsParty || npc.name.includes('NURSE')) {
      if (typeof sfx.playHealWithBgmPause === 'function') sfx.playHealWithBgmPause();
      else sfx.heal();
      state.dex.forEach(m => { m.hp = m.maxHp; });
      syncAllUI();
      if (typeof saveGameProgress === 'function') saveGameProgress();
    } else if (npc.isMonster || npc.monsterId) {
      sfx.pokemonCry(npc.monsterId || npc.id);
    } else {
      sfx.npcChime();
    }
    setOverworldDialogue(npc.fact, npc.name, npc.topic);
    return;
  }

  // 3. Check if facing the Follower Partner directly!
  if (state.partnerWorld && state.partnerWorld.gridX === tx && state.partnerWorld.gridY === ty) {
    const partner = getActivePlayer();
    sfx.pokemonCry(partner.id);
    const req = typeof getEvolutionRequirement === 'function' ? getEvolutionRequirement(partner.id) : null;
    const evoNote = req ? ` [EVO BAR: ${partner.evoWins || 0}/${req.winsNeeded} → ${req.to.toUpperCase()}]` : ' [MAX EVOLUTION ★]';
    setOverworldDialogue(`${partner.name}! ${partner.name}~ (Your active partner is happily following you!${evoNote})`, partner.name, 'ACTIVE PARTNER ♪');
    return;
  }

  // 4. Full Environment & Regional Signature Obstacle Inspection
  const tile = getTileAt(tx, ty);
  const obsDef = (typeof OBSTACLE_DEFS !== 'undefined' && OBSTACLE_DEFS[tile]) ? OBSTACLE_DEFS[tile] : null;
  sfx.blip();

  if (tile === 'W') {
    setOverworldDialogue("Crystal-clear water! Remember: roughly 71% of Earth's surface is covered by water!", "WATER'S EDGE", "HYDROLOGY");
  } else if (tile === 'G') {
    setOverworldDialogue("Tall wild grass! Step inside to encounter regional wild monsters!", "TALL GRASS", "HABITAT");
  } else if (tile === 'T') {
    setOverworldDialogue("Canopy tree! Trees absorb Carbon Dioxide through leaf Stomata and use Chlorophyll to produce Oxygen and glucose via Photosynthesis!", obsDef?.name || "CANOPY TREE", "BOTANY");
  } else if (tile === 'R') {
    setOverworldDialogue("Solid crag boulder! The Rock Cycle transitions rocks between Igneous, Sedimentary, and Metamorphic states over geological time!", obsDef?.name || "CRAG BOULDER", "GEOLOGY");
  } else if (tile === 'I') {
    setOverworldDialogue("Crystalline glacier ice block! Ordinary water ice forms a Hexagonal crystal lattice at 0°C and floats because it is less dense than liquid water!", obsDef?.name || "GLACIER ICE", "GLACIOLOGY");
  } else if (tile === 'C') {
    setOverworldDialogue("Desert saguaro cactus! Succulents store water in thick stems and use spines to minimize surface-area water loss from transpiration!", obsDef?.name || "SAGUARO CACTUS", "XEROPHYTE");
  } else if (tile === 'K') {
    setOverworldDialogue("Marine reef coral! Coral reefs are built by colonies of calcium-carbonate-secreting polyps living in symbiosis with photosynthetic algae!", obsDef?.name || "REEF CORAL", "MARINE ECOLOGY");
  } else if (tile === 'L') {
    setOverworldDialogue("Molten lava pool! Underground molten rock is called Magma, and once it erupts onto a planet's surface it is called Lava!", obsDef?.name || "MOLTEN LAVA", "VOLCANOLOGY");
  } else if (tile === 'M') {
    setOverworldDialogue("Nutrient-rich swamp mud! Anaerobic wetland sediments slow down organic decomposition and filter groundwater aquifers!", obsDef?.name || "SWAMP MUD", "WETLANDS");
  } else if (tile === 'F') {
    setOverworldDialogue("Blooming wildflower patch! Angiosperm flowers attract insect pollinators to transfer pollen and produce seeds enclosed within fruit!", obsDef?.name || "WILDFLOWERS", "BOTANY");
  } else if (tile === 'B') {
    setOverworldDialogue("Timber suspension bridge! Structural beams distribute compressive and tensile forces across the supports!", obsDef?.name || "WOODEN BRIDGE", "ENGINEERING");
  } else if (tile === 'S') {
    setOverworldDialogue("Geothermal steam geyser! Superheated groundwater rises through volcanic fissures to form mineral-rich hot springs!", obsDef?.name || "STEAM GEYSER", "GEOTHERMAL");
  } else if (tile === 'V') {
    setOverworldDialogue("High-voltage resonant Tesla coil! Alternating magnetic fields induce currents across conductive metal windings!", obsDef?.name || "TESLA PYLON", "ELECTROMAGNETISM");
  } else if (tile === 'U') {
    setOverworldDialogue("Bioluminescent spore toadstool! Fungi have cell walls made of Chitin, decompose organic matter, and reproduce via airborne spores!", obsDef?.name || "SPORE TOADSTOOL", "MYCOLOGY");
  } else if (tile === 'A') {
    setOverworldDialogue("Astral crystal obelisk! Birefringent crystals split incoming light beams into polarized rainbow spectra!", obsDef?.name || "ASTRAL OBELISK", "OPTICS & MYTH");
  } else if (tile === 'N') {
    setOverworldDialogue("Flickering shadow streetlamp! In cosmology, Dark Matter accounts for ~85% of the universe's mass, while a Black Hole's Event Horizon traps even light!", obsDef?.name || "SHADOW LAMP", "DARK COSMOLOGY");
  } else if (tile === 'Q') {
    setOverworldDialogue("Miradouro da Lua cliff spire! Over millions of years, wind and rain erosion carved red clay and sandstone into lunar-like hoodoo pinnacles!", obsDef?.name || "MOON CLIFF SPIRE", "GEOMORPHOLOGY");
  } else if (tile === 'H' || tile === 'D') {
    setOverworldDialogue("Professor's words echoed: \"Walking into someone's house without permission is known as trespassing and it is illegal!\"", "LOCKED HOUSE", "LAW & CIVICS");
  } else {
    setOverworldDialogue("Face any Specialist, Alien, Overworld Pokémon, Obstacle, or Floor Item (Berries & Stones) and press SPACE or A!", "FIELD JOURNAL", "TIP");
  }
}

function setOverworldDialogue(text, speaker = 'FIELD JOURNAL', badge = 'KNOWLEDGE FACT') {
  if (state.overworldTypewriterTimer) clearInterval(state.overworldTypewriterTimer);
  const speakerEl = document.getElementById('overworldSpeaker');
  const topicEl = document.getElementById('overworldTopicBadge');
  const el = document.getElementById('overworldDialogueText');

  if (speakerEl) speakerEl.textContent = speaker;
  if (topicEl) topicEl.textContent = badge;
  if (!el) return;

  el.textContent = '';
  let idx = 0;
  state.overworldTypewriterTimer = setInterval(() => {
    el.textContent += text.charAt(idx);
    idx++;
    if (idx >= text.length) {
      clearInterval(state.overworldTypewriterTimer);
    }
  }, 11);
}

function updateOverworldHUD() {
  const { gridX, gridY } = state.playerWorld;
  const mapObj = getCurrentMap();
  const tile = getTileAt(gridX, gridY);

  const coordsText = document.getElementById('overworldCoordsText');
  const zoneName = document.getElementById('zoneNameBadge');
  const zoneSub = document.getElementById('zoneSubBadge');
  const promptEl = document.getElementById('npcPromptBanner');

  if (coordsText) {
    const itemsLeft = Array.isArray(state.floorItems) ? state.floorItems.length : 0;
    coordsText.textContent = `MAP: ${mapObj.id} • POS: (${gridX}, ${gridY}) • ITEMS: ${itemsLeft} • ${tile === 'G' ? '⚠️ IN TALL GRASS' : 'SAFE PATH'}`;
  }
  if (zoneName) zoneName.textContent = mapObj.name;
  if (zoneSub) zoneSub.textContent = mapObj.subtitle;

  const { tx, ty } = getFacingTileCoords();
  const facingNpc = getFacingNPC();
  const facingPoke = getFacingPokeNPC();
  const facingItem = getFloorItemAt(tx, ty);
  const facingTile = getTileAt(tx, ty);
  const facingObs = (typeof OBSTACLE_DEFS !== 'undefined' && OBSTACLE_DEFS[facingTile] && !['.', 'P', 'E', 'G'].includes(facingTile))
    ? OBSTACLE_DEFS[facingTile]
    : null;

  if (promptEl) {
    if (facingItem) {
      promptEl.textContent = `PRESS [SPACE] OR STEP ON ${facingItem.name} TO COLLECT`;
      promptEl.classList.remove('hidden');
    } else if (facingPoke) {
      promptEl.textContent = `PRESS [SPACE] OR [A] TO GREET ${facingPoke.name} ♪`;
      promptEl.classList.remove('hidden');
    } else if (facingNpc) {
      promptEl.textContent = `PRESS [SPACE] OR [A] TO TALK TO ${facingNpc.name}`;
      promptEl.classList.remove('hidden');
    } else if (facingObs) {
      promptEl.textContent = `PRESS [SPACE] OR [A] TO INSPECT ${facingObs.name}`;
      promptEl.classList.remove('hidden');
    } else {
      promptEl.classList.add('hidden');
    }
  }
}

function initiateOneBlockStep(dir) {
  const now = performance.now();
  const p = state.playerWorld;
  if (state.busy || state.screen !== 'OVERWORLD' || p.isStepping) return;
  if (now - p.lastStepEndTime < p.stepPauseMs) return;

  const prevX = p.gridX;
  const prevY = p.gridY;

  p.dir = dir;
  updateOverworldHUD();

  let nextX = p.gridX;
  let nextY = p.gridY;
  if (dir === 'up') nextY--;
  else if (dir === 'down') nextY++;
  else if (dir === 'left') nextX--;
  else if (dir === 'right') nextX++;

  if (isTileBlocked(nextX, nextY)) {
    return;
  }

  p.startX = p.gridX * TILE_SIZE;
  p.startY = p.gridY * TILE_SIZE;
  p.gridX = nextX;
  p.gridY = nextY;
  p.targetX = nextX * TILE_SIZE;
  p.targetY = nextY * TILE_SIZE;
  p.stepStartTime = now;
  p.isStepping = true;
  p.stepFrame = (p.stepFrame + 1) % 2;

  if (state.partnerWorld && (p.gridX !== prevX || p.gridY !== prevY)) {
    const pw = state.partnerWorld;
    pw.startX = pw.pixelX;
    pw.startY = pw.pixelY;
    pw.gridX = prevX;
    pw.gridY = prevY;
    pw.targetX = prevX * TILE_SIZE;
    pw.targetY = prevY * TILE_SIZE;
    pw.dir = dir;
  }
}

function onSingleBlockStepLanded() {
  const p = state.playerWorld;
  const tile = getTileAt(p.gridX, p.gridY);

  // Check if player stepped onto a random floor item (Berry or Evolution Stone)
  const itemOnTile = getFloorItemAt(p.gridX, p.gridY);
  if (itemOnTile) {
    collectFloorItem(itemOnTile);
  }

  updateOverworldHUD();

  if (tile === 'E') {
    const exits = getCurrentMap().exits;
    let exitCfg = null;
    if (p.gridY === 0 && exits.north) exitCfg = exits.north;
    else if (p.gridY === MAP_ROWS - 1 && exits.south) exitCfg = exits.south;
    else if (p.gridX === 0 && exits.west) exitCfg = exits.west;
    else if (p.gridX === MAP_COLS - 1 && exits.east) exitCfg = exits.east;

    if (exitCfg && WORLD_MAPS[exitCfg.targetMap]) {
      sfx.blip();
      state.busy = true;
      state.keysHeld = {};
      const targetMapObj = WORLD_MAPS[exitCfg.targetMap];
      runShutterTransition(`ENTERING ${targetMapObj.name}...`, () => {
        state.currentMapId = exitCfg.targetMap;
        teleportPlayerToGrid(exitCfg.spawnX, exitCfg.spawnY);
        sfx.startBGM(state.currentMapId);
        updateOverworldHUD();
        if (typeof saveGameProgress === 'function') saveGameProgress();
        setOverworldDialogue(`Arrived at ${targetMapObj.name}! Fresh Berries and Evolutionary Stones have appeared on the ground!`, targetMapObj.name, 'REGION TRANSIT');
        state.busy = false;
      });
      return;
    }
  }

  if (tile === 'G') {
    sfx.stepGrass();
    p.stepsSinceBattle++;
    if (Math.random() < 0.26 || p.stepsSinceBattle >= 5) {
      p.stepsSinceBattle = 0;
      triggerWildBattleFromOverworld();
    }
  }
}

function overworldRenderLoop(now) {
  if (state.screen === 'OVERWORLD') {
    if (typeof syncCanvasAspect === 'function') syncCanvasAspect();
    const p = state.playerWorld;

    if (p.isStepping) {
      const elapsed = now - p.stepStartTime;
      const rawT = Math.min(1, Math.max(0, elapsed / p.stepDurationMs));
      const easedT = easeInOutCubic(rawT);

      p.pixelX = p.startX + (p.targetX - p.startX) * easedT;
      p.pixelY = p.startY + (p.targetY - p.startY) * easedT;
      p.hopOffsetY = -Math.sin(rawT * Math.PI) * 2.5;

      if (rawT >= 1) {
        p.pixelX = p.targetX;
        p.pixelY = p.targetY;
        p.hopOffsetY = 0;
        p.isStepping = false;
        p.lastStepEndTime = now;
        onSingleBlockStepLanded();
      }
    } else if (!state.busy) {
      if (state.keysHeld['ArrowUp'] || state.keysHeld['KeyW'] || state.keysHeld['up']) initiateOneBlockStep('up');
      else if (state.keysHeld['ArrowDown'] || state.keysHeld['KeyS'] || state.keysHeld['down']) initiateOneBlockStep('down');
      else if (state.keysHeld['ArrowLeft'] || state.keysHeld['KeyA'] || state.keysHeld['left']) initiateOneBlockStep('left');
      else if (state.keysHeld['ArrowRight'] || state.keysHeld['KeyD'] || state.keysHeld['right']) initiateOneBlockStep('right');
    }

    drawOverworldCanvas();
  }
  requestAnimationFrame(overworldRenderLoop);
}

/********************************************************************
 * SCREEN TRANSITIONS (TITLE <-> OVERWORLD <-> BATTLE)
 ********************************************************************/
function enterOverworldFromTitle() {
  if (state.busy) return;
  sfx.init();
  sfx.blip();
  if (!state.floorItems || state.floorItems.length === 0) {
    spawnFloorItemsForCurrentMap();
  }
  runShutterTransition('ENTERING OVERWORLD...', () => {
    state.screen = 'OVERWORLD';
    document.getElementById('titleScreenView').classList.add('hidden');
    document.getElementById('battleMasterContainer').classList.add('hidden');
    const ow = document.getElementById('overworldView');
    ow.classList.remove('hidden');
    ow.classList.add('flex');
    sfx.startBGM(state.currentMapId);
    updateOverworldHUD();
  });
}

function triggerWildBattleFromOverworld(forcedSpecies = null) {
  if (state.busy || state.screen !== 'OVERWORLD') return;
  state.busy = true;
  state.keysHeld = {};

  const mapObj = getCurrentMap();
  let chosenSpecies = forcedSpecies;
  if (!chosenSpecies) {
    const poolIds = mapObj.encounters;
    const randId = poolIds[Math.floor(Math.random() * poolIds.length)];
    chosenSpecies = MONSTER_SPECIES.find(m => m.id === randId) || MONSTER_SPECIES[0];
  }

  sfx.stopBGM();
  sfx.encounterSiren();

  const overlay = document.getElementById('screenTransitionOverlay');
  const flash = document.getElementById('transitionFlash');
  const shutterTop = document.getElementById('shutterTop');
  const shutterBottom = document.getElementById('shutterBottom');
  const banner = document.getElementById('transitionCenterBanner');

  overlay.classList.remove('hidden');
  flash.classList.add('strobe-active');
  banner.querySelector('div').textContent = `WILD ${chosenSpecies.name} APPEARED!`;

  setTimeout(() => {
    shutterTop.classList.remove('-translate-y-full');
    shutterBottom.classList.remove('translate-y-full');
    banner.classList.remove('opacity-0');
  }, 320);

  setTimeout(() => {
    state.screen = 'BATTLE';
    document.getElementById('overworldView').classList.add('hidden');
    document.getElementById('overworldView').classList.remove('flex');
    document.getElementById('battleMasterContainer').classList.remove('hidden');

    setupBattleEncounter(chosenSpecies);
    sfx.startBGM('BATTLE');

    shutterTop.classList.add('-translate-y-full');
    shutterBottom.classList.add('translate-y-full');
    banner.classList.add('opacity-0');
    flash.classList.remove('strobe-active');
  }, 880);

  setTimeout(() => {
    overlay.classList.add('hidden');
    state.busy = false;
  }, 1220);
}

function returnToOverworldFromBattle(statusMessage = null) {
  state.busy = true;
  if (state.timerInterval) clearInterval(state.timerInterval);

  runShutterTransition('RETURNING TO OVERWORLD...', () => {
    state.screen = 'OVERWORLD';
    document.getElementById('battleMasterContainer').classList.add('hidden');
    const ow = document.getElementById('overworldView');
    ow.classList.remove('hidden');
    ow.classList.add('flex');

    sfx.startBGM(state.currentMapId);
    syncAllUI();
    updateOverworldHUD();
    if (statusMessage) {
      setOverworldDialogue(statusMessage, 'BATTLE RESULT', 'EXPLORATION');
    }
    state.busy = false;

    if (typeof checkAllMonstersCaughtCelebration === 'function') {
      checkAllMonstersCaughtCelebration();
    }
  });
}

function runShutterTransition(bannerLabel, midCallback) {
  const overlay = document.getElementById('screenTransitionOverlay');
  const shutterTop = document.getElementById('shutterTop');
  const shutterBottom = document.getElementById('shutterBottom');
  const banner = document.getElementById('transitionCenterBanner');

  overlay.classList.add('hidden');
  banner.querySelector('div').textContent = bannerLabel;

  requestAnimationFrame(() => {
    overlay.classList.remove('hidden');
    shutterTop.classList.remove('-translate-y-full');
    shutterBottom.classList.remove('translate-y-full');
    banner.classList.remove('opacity-0');
  });

  setTimeout(() => {
    if (midCallback) midCallback();
    shutterTop.classList.add('-translate-y-full');
    shutterBottom.classList.add('translate-y-full');
    banner.classList.add('opacity-0');
  }, 360);

  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 700);
}

// Protect interactWithFacingNPC from being overwritten by inline scripts in quiz-monsters.html
const _canonicalInteractWithFacingNPC = interactWithFacingNPC;
try {
  Object.defineProperty(window, 'interactWithFacingNPC', {
    get() { return _canonicalInteractWithFacingNPC; },
    set() { /* Keep canonical overworld.js version with all obstacle & item interactions */ },
    configurable: true
  });
} catch (e) {}