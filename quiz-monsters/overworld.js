/********************************************************************
 * overworld.js
 * Visible Floor Items, Blocking Collision, Space/A Talk Interactivity
 * & Stone Evolution with Shattering Feedback
 ********************************************************************/

const FLOOR_ITEM_TYPES = [
  {
    id: 'oran_berry',
    name: 'ORAN BERRY',
    category: 'BERRY',
    tileKey: 'BERRY',
    color: '#3b82f6',
    highlight: '#93c5fd',
    desc: 'Restored +50 HP to your active partner!'
  },
  {
    id: 'sitrus_berry',
    name: 'SITRUS BERRY',
    category: 'BERRY',
    tileKey: 'BERRY',
    color: '#facc15',
    highlight: '#fef08a',
    desc: 'Fully restored your active partner\'s HP!'
  },
  {
    id: 'fire_stone',
    name: 'FIRE STONE',
    category: 'STONE',
    tileKey: 'STONE',
    stoneType: 'FIRE',
    stoneLabel: 'FIRE STONE',
    color: '#f97316',
    highlight: '#fde047',
    desc: 'A radiant Fire Stone! Interact with this stone while your Fire-type partner is active to evolve them!'
  },
  {
    id: 'water_stone',
    name: 'WATER STONE',
    category: 'STONE',
    tileKey: 'STONE',
    stoneType: 'WATER',
    stoneLabel: 'WATER STONE',
    color: '#0284c7',
    highlight: '#7dd3fc',
    desc: 'A shimmering Water Stone! Interact with this stone while your Water-type partner is active to evolve them!'
  },
  {
    id: 'thunder_stone',
    name: 'THUNDER STONE',
    category: 'STONE',
    tileKey: 'STONE',
    stoneType: 'ELECTRIC',
    stoneLabel: 'THUNDER STONE',
    color: '#eab308',
    highlight: '#fef08a',
    desc: 'A sparking Thunder Stone! Interact with this stone while Pikachu is active to evolve into Raichu!'
  },
  {
    id: 'leaf_stone',
    name: 'LEAF STONE',
    category: 'STONE',
    tileKey: 'STONE',
    stoneType: 'GRASS',
    stoneLabel: 'LEAF STONE',
    color: '#16a34a',
    highlight: '#86efac',
    desc: 'A verdant Leaf Stone! Interact with this stone while your Grass-type partner is active to evolve them!'
  },
  {
    id: 'moon_stone',
    name: 'MOON STONE',
    category: 'STONE',
    tileKey: 'STONE',
    stoneType: 'ANY',
    stoneLabel: 'MOON STONE',
    color: '#a855f7',
    highlight: '#e9d5ff',
    desc: 'A mystic Moon Stone! Interact with this stone with compatible Pokémon to trigger instant evolution!'
  }
];

const HUMAN_SKIN_PALETTE = [
  '#fde68a', '#fed7aa', '#f5cba7', '#e59866', '#ca8a5b', '#a16236', '#784212', '#5c3317'
];

function getNPCSkinColor(npc) {
  if (!npc) return '#fed7aa';
  if (npc.skinColor) return npc.skinColor;
  const upperName = (npc.name || '').toUpperCase();
  const upperTopic = (npc.topic || '').toUpperCase();
  const lowerId = (npc.id || '').toLowerCase();
  if (npc.isAlien || upperName.includes('ALIEN') || upperTopic.includes('ALIEN') || lowerId.includes('alien')) {
    return '#4ade80';
  }
  let hash = 0;
  for (let i = 0; i < lowerId.length; i++) {
    hash = (hash * 31 + lowerId.charCodeAt(i)) % 997;
  }
  return HUMAN_SKIN_PALETTE[hash % HUMAN_SKIN_PALETTE.length];
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getCurrentMap() {
  return WORLD_MAPS[state.currentMapId] || WORLD_MAPS.CENTER;
}

function getTileAt(col, row) {
  const mapObj = getCurrentMap();
  if (row < 0 || row >= MAP_ROWS || col < 0 || col >= MAP_COLS) return 'T';
  return mapObj.rows[row].charAt(col) || 'T';
}

function getFloorItemAt(col, row) {
  if (!Array.isArray(state.floorItems)) return null;
  return state.floorItems.find(it => it.x === col && it.y === row) || null;
}

function isTileBlocked(col, row) {
  if (row < 0 || row >= MAP_ROWS || col < 0 || col >= MAP_COLS) return true;
  
  if (getFloorItemAt(col, row)) return true;

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

  const numItems = 3 + Math.floor(Math.random() * 3);
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

function interactWithFloorItem(item) {
  if (!item) return;
  const partner = typeof getActivePlayer === 'function' ? getActivePlayer() : null;
  if (!partner) return;

  if (item.category === 'BERRY') {
    state.floorItems = (state.floorItems || []).filter(it => !(it.x === item.x && it.y === item.y));
    sfx.heal();
    if (item.id === 'oran_berry') {
      partner.hp = Math.min(partner.maxHp, partner.hp + 50);
      setOverworldDialogue(`Collected ${item.name}! ${partner.name} recovered +50 HP! (${partner.hp}/${partner.maxHp})`, item.name, 'BERRY COLLECTED 🍓');
    } else if (item.id === 'sitrus_berry') {
      partner.hp = partner.maxHp;
      setOverworldDialogue(`Collected ${item.name}! ${partner.name}'s HP was fully restored!`, item.name, 'BERRY COLLECTED 🍋');
    }
  } else if (item.category === 'STONE') {
    const evolvedMsg = (typeof tryStoneEvolution === 'function') ? tryStoneEvolution(partner, item) : null;
    if (evolvedMsg) {
      state.floorItems = (state.floorItems || []).filter(it => !(it.x === item.x && it.y === item.y));
      setOverworldDialogue(`Used ${item.name} with ${partner.name}! ${evolvedMsg}`, 'STONE EVOLUTION! ★', item.name);
      const playerWrapper = document.getElementById('playerSpriteWrapper');
      if (playerWrapper && typeof renderMonsterSVG === 'function') {
        playerWrapper.innerHTML = renderMonsterSVG(partner);
      }
    } else {
      state.floorItems = (state.floorItems || []).filter(it => !(it.x === item.x && it.y === item.y));
      sfx.wrongBuzzer();
      setOverworldDialogue(`The stone shattered and nothing happened. (${partner.name} cannot evolve with this stone!)`, 'STONE SHATTERED 💥', item.name);
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
    const tileKey = item.tileKey || (item.category === 'STONE' ? 'STONE' : 'BERRY');
    const obsDef = (typeof OBSTACLE_DEFS !== 'undefined') ? OBSTACLE_DEFS[tileKey] : null;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.fillRect(dx + 6, item.y * TILE_SIZE + 24, 20, 5);

    if (obsDef && typeof drawBitmap16 === 'function') {
      drawBitmap16(ctx, obsDef.grid, obsDef.palette, dx, dy, TILE_SIZE, false);
    } else {
      ctx.fillStyle = item.color || '#3b82f6';
      ctx.fillRect(dx + 8, dy + 8, 16, 16);
    }
  });
}

function openWorldMapModal() {
  if (state.dex.length < 20) {
    sfx.wrongBuzzer();
    setOverworldDialogue(`You have caught ${state.dex.length}/52 Pokémon! Catch at least 20 Pokémon to unlock the World Map.`, 'LOCKED FEATURE', 'WORLD MAP');
    return;
  }

  sfx.blip();
  let mapModal = document.getElementById('worldMapModal');
  if (!mapModal) {
    mapModal = document.createElement('div');
    mapModal.id = 'worldMapModal';
    mapModal.className = 'fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 hidden items-center justify-center p-3';
    mapModal.innerHTML = `
      <div class="w-full max-w-2xl retro-box p-4 sm:p-5 flex flex-col gap-3 max-h-[85vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b-2 border-slate-300 pb-2">
          <div>
            <h2 class="text-xs sm:text-sm font-bold text-slate-900">🗺️ WORLD MAP &amp; FAST TRAVEL</h2>
            <p id="mapModalStatusSubtitle" class="text-[9px] text-slate-600 mt-0.5">Explore unlocked regions across Kanto &amp; beyond</p>
          </div>
          <button id="closeWorldMapBtn" type="button" class="pixel-btn bg-red-600 text-white text-[10px] px-2.5 py-1">X</button>
        </div>
        <div id="worldMapRegionsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5"></div>
      </div>
    `;
    document.body.appendChild(mapModal);
    document.getElementById('closeWorldMapBtn').addEventListener('click', () => {
      sfx.blip();
      mapModal.classList.add('hidden');
      mapModal.classList.remove('flex');
    });
  }

  const canFly = state.dex.length >= 30;
  const subtitleEl = document.getElementById('mapModalStatusSubtitle');
  if (subtitleEl) {
    subtitleEl.textContent = canFly 
      ? '✈️ FLY UNLOCKED (Click Fly on any region to fast travel)' 
      : `✈️ FLY LOCKED (${state.dex.length}/30 Pokémon caught to unlock fast travel)`;
  }

  const grid = document.getElementById('worldMapRegionsGrid');
  grid.innerHTML = '';

  Object.keys(WORLD_MAPS).forEach(mapKey => {
    const mapObj = WORLD_MAPS[mapKey];
    const isCurrent = state.currentMapId === mapKey;

    const card = document.createElement('div');
    card.className = `pixel-btn ${isCurrent ? 'bg-amber-100 border-amber-600' : 'bg-white hover:bg-slate-100'} p-3 flex flex-col justify-between gap-2 text-left`;
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between gap-1">
          <span class="text-[10px] font-bold text-slate-900 truncate">${mapObj.name}</span>
          ${isCurrent ? '<span class="text-[8px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">CURRENT</span>' : ''}
        </div>
        <div class="text-[8px] text-slate-600 mt-1">${mapObj.subtitle}</div>
      </div>
      ${canFly && !isCurrent ? `<button type="button" class="pixel-btn bg-sky-600 hover:bg-sky-500 text-white text-[8px] px-2 py-1 text-center font-bold">✈️ FLY HERE</button>` : ''}
    `;

    if (canFly && !isCurrent) {
      const flyBtn = card.querySelector('button');
      if (flyBtn) {
        flyBtn.addEventListener('click', () => {
          sfx.heal();
          mapModal.classList.add('hidden');
          mapModal.classList.remove('flex');
          runShutterTransition(`FLYING TO ${mapObj.name}...`, () => {
            state.currentMapId = mapKey;
            teleportPlayerToGrid(13, 10);
            sfx.startBGM(state.currentMapId);
            updateOverworldHUD();
            if (typeof saveGameProgress === 'function') saveGameProgress();
            setOverworldDialogue(`Flew directly to ${mapObj.name}!`, mapObj.name, 'FAST TRAVEL ✈️');
          });
        });
      }
    }

    grid.appendChild(card);
  });

  mapModal.classList.remove('hidden');
  mapModal.classList.add('flex');
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

  const facingItem = getFloorItemAt(tx, ty);
  if (facingItem) {
    interactWithFloorItem(facingItem);
    return;
  }

  const pokeNpc = getFacingPokeNPC();
  if (pokeNpc) {
    const species = MONSTER_SPECIES.find(m => m.id === pokeNpc.speciesId);
    const displayName = species ? species.name : pokeNpc.name;
    sfx.pokemonCry(pokeNpc.speciesId);
    setOverworldDialogue(`${displayName}! ${displayName}~`, displayName, 'POKéMON CALL ♪');
    return;
  }

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

  if (state.partnerWorld && state.partnerWorld.gridX === tx && state.partnerWorld.gridY === ty) {
    const partner = getActivePlayer();
    sfx.pokemonCry(partner.id);
    const req = typeof getEvolutionRequirement === 'function' ? getEvolutionRequirement(partner.id) : null;
    const evoNote = req ? ` [EVO BAR: ${partner.evoWins || 0}/${req.winsNeeded} → ${req.to.toUpperCase()}]` : ' [MAX EVOLUTION ★]';
    setOverworldDialogue(`${partner.name}! ${partner.name}~ (Your active partner is happily following you!${evoNote})`, partner.name, 'ACTIVE PARTNER ♪');
    return;
  }

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
      promptEl.textContent = `PRESS [SPACE] OR [A] TO COLLECT / INTERACT WITH ${facingItem.name}`;
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

const _canonicalInteractWithFacingNPC = interactWithFacingNPC;
try {
  Object.defineProperty(window, 'interactWithFacingNPC', {
    get() { return _canonicalInteractWithFacingNPC; },
    set() { /* Keep canonical overworld.js version with all obstacle & item interactions */ },
    configurable: true
  });
} catch (e) {}