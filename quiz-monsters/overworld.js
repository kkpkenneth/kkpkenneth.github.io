/********************************************************************
 * overworld.js
 * Visible Floor Items, Blocking Collision, Space/A Talk Interactivity,
 * Live Map Thumbnails, 2x2 Portal (at 50 Dex) & East Asia Grand Map
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

// 1. 5x5 Habitat Region Grand Map Matrix
const GRAND_MAP_5X5_GRID = [
  ['AURORA_RIDGE', 'WIND_TEMPLE', 'GLACIER',  'METEOR_CRATER', 'CYBER_NEXUS'],
  ['SPIRE',        'NORTHWEST',   'MOUNTAIN', 'NORTHEAST',     'FOUNDRY'],
  ['SANCTUARY',    'FOREST',      'CENTER',   'DESERT',        'ONSEN'],
  ['KALOS_GROVE',  'SOUTHWEST',   'BEACH',    'SOUTHEAST',     'VOLCANO'],
  ['SUNKEN_RUINS', 'BRAMBLE',     'ABYSS',    'SHADOW_ALLEY',  'MIRADOURO_LUA']
];

// 2. East Asia Region Matrix (Exact Geographical Layout)
// Row 0: [null,    'MONGOLIA',  'SOUTH_KOREA']
// Row 1: [null,    'CHINA',     'JAPAN'      ]
// Row 2: ['MACAU', 'HONG_KONG', 'TAIWAN'     ]
const EAST_ASIA_MAP_GRID = [
  [null,    'MONGOLIA',  'SOUTH_KOREA'],
  [null,    'CHINA',     'JAPAN'],
  ['MACAU', 'HONG_KONG', 'TAIWAN']
];

const EAST_ASIA_MAP_IDS = new Set([
  'HONG_KONG', 'MACAU', 'CHINA', 'TAIWAN', 'JAPAN', 'SOUTH_KOREA', 'MONGOLIA'
]);

const LEGENDARY_MONSTER_IDS = new Set(['articuno', 'zapdos', 'moltres', 'mewtwo', 'mew', 'deoxys']);

const _mapThumbnailCache = {};

function renderMapThumbnailDataURL(mapObj) {
  if (!mapObj || !mapObj.rows) return '';
  if (_mapThumbnailCache[mapObj.id]) return _mapThumbnailCache[mapObj.id];

  const cvs = document.createElement('canvas');
  cvs.width = 56;
  cvs.height = 40;
  const ctx = cvs.getContext('2d');
  const th = mapObj.theme || {};

  for (let r = 0; r < MAP_ROWS; r++) {
    const rowStr = mapObj.rows[r] || '';
    for (let c = 0; c < MAP_COLS; c++) {
      const ch = rowStr.charAt(c) || '.';
      let color = (c + r) % 2 === 0 ? (th.groundA || '#475569') : (th.groundB || '#334155');
      if (ch === 'P' || ch === 'E' || ch === 'B') color = th.path || '#fde047';
      else if (ch === 'G') color = th.grassTip || th.grass || '#22c55e';
      else if (ch === 'W') color = '#0284c7';
      else if (ch === 'L') color = '#ef4444';
      else if (ch === 'I') color = '#7dd3fc';
      else if (ch === 'H' || ch === 'D') color = '#f43f5e';
      else if (ch === 'T' || ch === 'C') color = th.treeTop || th.tree || '#14532d';
      else if (ch === 'R' || ch === 'Q' || ch === 'V' || ch === 'A' || ch === 'N') color = th.rockLight || th.rock || '#94a3b8';

      ctx.fillStyle = color;
      ctx.fillRect(c * 2, r * 2, 2, 2);
    }
  }

  const url = cvs.toDataURL();
  _mapThumbnailCache[mapObj.id] = url;
  return url;
}

function isPortalUnlocked() {
  return Boolean(state && Array.isArray(state.dex) && state.dex.length >= 50);
}

function isPortalTileOnCurrentMap(col, row) {
  if (!state) return false;
  if (state.currentMapId !== 'CENTER' && state.currentMapId !== 'HONG_KONG') return false;
  if (state.currentMapId === 'CENTER' && !isPortalUnlocked()) return false;
  return (col === 13 || col === 14) && (row === 9 || row === 10);
}

function drawPortalOnCanvas(ctx, animTick) {
  if (!state) return;
  if (state.currentMapId !== 'CENTER' && state.currentMapId !== 'HONG_KONG') return;
  if (state.currentMapId === 'CENTER' && !isPortalUnlocked()) return;

  const px = 13 * TILE_SIZE;
  const py = 9 * TILE_SIZE;
  const size = TILE_SIZE * 2;
  const pulse = Math.sin(animTick / 180) * 3;

  ctx.save();
  // Outer 2x2 dimensional frame
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px + 2, py + 2, size - 4, size - 4);

  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 3;
  ctx.strokeRect(px + 4, py + 4, size - 8, size - 8);

  // Swirling inner vortex rings
  ctx.fillStyle = '#7e22ce';
  ctx.fillRect(px + 8, py + 8, size - 16, size - 16);

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 14 - pulse, py + 14 - pulse, size - 28 + pulse * 2, size - 28 + pulse * 2);

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px + 24, py + 24, size - 48, size - 48);

  ctx.restore();
}

function isNPCActiveOnMap(npc) {
  if (!npc) return false;
  const monId = (npc.monsterId || npc.speciesId || '').toLowerCase();
  if ((npc.isLegendary || LEGENDARY_MONSTER_IDS.has(monId)) && state.dex && state.dex.some(p => p.id.toLowerCase() === monId)) {
    return false;
  }
  return true;
}

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
  if (mapObj.npcs && mapObj.npcs.some(npc => isNPCActiveOnMap(npc) && npc.x === col && npc.y === row)) return true;
  if (mapObj.pokeNpcs && mapObj.pokeNpcs.some(p => isNPCActiveOnMap(p) && p.x === col && p.y === row)) return true;
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
      if ((c === 13 || c === 14) && (r === 9 || r === 10)) continue; // Keep 2x2 portal area clear
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
    const oldName = partner.name;
    const evolvedMsg = (typeof tryStoneEvolution === 'function') ? tryStoneEvolution(partner, item) : null;
    if (evolvedMsg) {
      state.floorItems = (state.floorItems || []).filter(it => !(it.x === item.x && it.y === item.y));
      setOverworldDialogue(`Used ${item.name} with ${oldName}! ${evolvedMsg}`, 'STONE EVOLUTION! ★', item.name);
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
  // Also render the 2x2 portal if on CENTER (with >=50 Pokemon) or HONG_KONG
  drawPortalOnCanvas(ctx, animTick);

  if (!Array.isArray(state.floorItems) || state.floorItems.length === 0) return;
  const bob = Math.floor(animTick / 350) % 2 === 0 ? 0 : -2;

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

function syncWorldMapButtonState() {
  const mapBtn = document.getElementById('overworldMapBtn');
  if (!mapBtn || typeof state === 'undefined') return;
  const caught = state.dex ? state.dex.length : 1;
  if (caught < 20) {
    mapBtn.className = 'pixel-btn bg-slate-600 hover:bg-slate-500 text-slate-300 text-[7px] sm:text-[9px] px-2.5 py-2 sm:px-3 sm:py-2 grayscale opacity-80';
    mapBtn.innerHTML = `🔒 MAP (${caught}/20)`;
  } else {
    mapBtn.className = 'pixel-btn bg-indigo-600 hover:bg-indigo-500 text-white text-[7px] sm:text-[9px] px-2.5 py-2 sm:px-3 sm:py-2';
    mapBtn.innerHTML = `🗺️ MAP`;
  }
}

function renderGrandMapGridRegion(regionMode, mapModal) {
  const grid = document.getElementById('worldMapRegionsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const isCurrentInEastAsia = EAST_ASIA_MAP_IDS.has(state.currentMapId);
  const canFly = state.dex.length >= 30;
  const matrix = regionMode === 'EAST_ASIA' ? EAST_ASIA_MAP_GRID : GRAND_MAP_5X5_GRID;
  const colsCount = regionMode === 'EAST_ASIA' ? 3 : 5;
  grid.className = `grid grid-cols-${colsCount} gap-2 bg-slate-900 p-2.5 sm:p-3 rounded-lg border-2 border-slate-950 min-w-[520px]`;

  matrix.forEach((rowKeys, rIdx) => {
    rowKeys.forEach((mapKey, cIdx) => {
      if (!mapKey || !WORLD_MAPS[mapKey]) {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'bg-slate-950/60 border border-slate-800 rounded p-2 min-h-[104px] flex items-center justify-center text-[7px] text-slate-600';
        emptySlot.textContent = 'OCEAN / BORDER';
        grid.appendChild(emptySlot);
        return;
      }

      const mapObj = WORLD_MAPS[mapKey];
      const isCurrent = state.currentMapId === mapKey;
      const targetIsEastAsia = EAST_ASIA_MAP_IDS.has(mapKey);
      // Enforces rule 6: Habitat region and East Asia region are linked by the 2x2 Portal only
      const sameRegionAsPlayer = (isCurrentInEastAsia === targetIsEastAsia);
      const allowFastTravelHere = canFly && !isCurrent && sameRegionAsPlayer;

      const bgHex = mapObj.theme?.groundA || '#334155';
      const shortName = mapObj.name.replace(/\s*\([^)]*\)\s*/g, '');
      const thumbUrl = renderMapThumbnailDataURL(mapObj);

      const card = document.createElement('div');
      card.className = `pixel-btn p-1.5 sm:p-2 flex flex-col justify-between gap-1 text-left min-h-[108px] ${
        isCurrent ? 'ring-2 ring-amber-400 border-amber-400 scale-[1.02]' : ''
      }`;
      card.style.backgroundColor = bgHex;
      card.style.color = '#ffffff';

      card.innerHTML = `
        <div class="flex items-start justify-between gap-1">
          <span class="text-[7px] sm:text-[8px] font-bold leading-tight drop-shadow-[1px_1px_0_#000] truncate">${shortName}</span>
          ${isCurrent ? '<span class="text-[6px] bg-amber-400 text-slate-950 px-1 py-0.5 rounded font-bold shrink-0">📍 YOU</span>' : ''}
        </div>
        <div class="w-full h-11 sm:h-12 rounded border border-slate-950 overflow-hidden bg-slate-950 my-0.5 shadow-inner relative">
          <img src="${thumbUrl}" alt="${shortName}" class="w-full h-full object-cover" style="image-rendering: pixelated;" />
          ${(mapKey === 'CENTER' || mapKey === 'HONG_KONG') && isPortalUnlocked() ? '<span class="absolute bottom-0.5 right-0.5 text-[6px] bg-purple-700 text-white px-1 rounded border border-white">🌀 PORTAL</span>' : ''}
        </div>
        <div class="flex items-center justify-between gap-1 mt-auto">
          <span class="text-[6px] text-slate-200 drop-shadow-[1px_1px_0_#000]">${regionMode === 'EAST_ASIA' ? 'ASIA' : `(${cIdx - 2}, ${2 - rIdx})`}</span>
          ${allowFastTravelHere
            ? `<button type="button" class="bg-sky-400 hover:bg-sky-300 text-slate-950 text-[6px] sm:text-[7px] px-1.5 py-0.5 rounded font-bold border border-slate-950 shadow">✈️ FLY</button>`
            : (!sameRegionAsPlayer && !isCurrent ? `<span class="text-[6px] bg-purple-900/90 text-purple-200 px-1 py-0.5 rounded">USE PORTAL</span>` : '')}
        </div>
      `;

      if (allowFastTravelHere) {
        card.addEventListener('click', () => {
          sfx.heal();
          mapModal.classList.add('hidden');
          mapModal.classList.remove('flex');
          runShutterTransition(`FLYING TO ${shortName}...`, () => {
            state.currentMapId = mapKey;
            teleportPlayerToGrid(13, 12);
            sfx.startBGM(state.currentMapId);
            updateOverworldHUD();
            if (typeof saveGameProgress === 'function') saveGameProgress();
            setOverworldDialogue(`Flew directly to ${mapObj.name}!`, mapObj.name, 'FAST TRAVEL ✈️');
          });
        });
      }

      grid.appendChild(card);
    });
  });
}

function openWorldMapModal() {
  if (state.dex.length < 20) {
    sfx.wrongBuzzer();
    setOverworldDialogue(`🔒 WORLD MAP LOCKED! You have caught ${state.dex.length}/${MONSTER_SPECIES.length} Pokémon! Catch at least 20 Pokémon to unlock the Grand World Map.`, 'LOCKED FEATURE', 'WORLD MAP 🔒');
    return;
  }

  sfx.blip();
  let mapModal = document.getElementById('worldMapModal');
  if (!mapModal) {
    mapModal = document.createElement('div');
    mapModal.id = 'worldMapModal';
    mapModal.className = 'fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 hidden items-center justify-center p-2 sm:p-4';
    mapModal.innerHTML = `
      <div class="w-full max-w-4xl retro-box p-3 sm:p-5 flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
        <div class="flex flex-wrap items-center justify-between border-b-2 border-slate-300 pb-2 gap-2">
          <div>
            <h2 class="text-xs sm:text-sm font-bold text-slate-900">🗺️ GRAND WORLD MAP &amp; THUMBNAIL ATLAS</h2>
            <p id="mapModalStatusSubtitle" class="text-[8px] sm:text-[9px] text-slate-600 mt-0.5"></p>
          </div>
          <div class="flex items-center gap-1.5">
            <button id="tabHabitatMapBtn" type="button" class="pixel-btn bg-indigo-600 text-white text-[8px] px-2.5 py-1 font-bold">🌍 HABITAT (5×5)</button>
            <button id="tabEastAsiaMapBtn" type="button" class="pixel-btn bg-rose-700 text-white text-[8px] px-2.5 py-1 font-bold">🏮 EAST ASIA</button>
            <button id="closeWorldMapBtn" type="button" class="pixel-btn bg-red-600 text-white text-[10px] px-2.5 py-1">X</button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <div id="worldMapRegionsGrid"></div>
        </div>
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
  const portalReady = isPortalUnlocked();
  const subtitleEl = document.getElementById('mapModalStatusSubtitle');
  if (subtitleEl) {
    subtitleEl.textContent = `${canFly ? '✈️ FLY UNLOCKED (within current region)' : `✈️ FLY LOCKED (${state.dex.length}/30)`} • ${
      portalReady ? '🌀 2×2 HK PORTAL ACTIVE IN PALLET HUB!' : `🌀 EAST ASIA PORTAL LOCKED (${state.dex.length}/50 Pokémon)`
    }`;
  }

  const tabHab = document.getElementById('tabHabitatMapBtn');
  const tabAsia = document.getElementById('tabEastAsiaMapBtn');
  const startTab = EAST_ASIA_MAP_IDS.has(state.currentMapId) ? 'EAST_ASIA' : 'HABITAT';

  if (tabHab && tabAsia) {
    tabHab.onclick = () => {
      sfx.blip();
      renderGrandMapGridRegion('HABITAT', mapModal);
    };
    tabAsia.onclick = () => {
      if (!isPortalUnlocked() && !EAST_ASIA_MAP_IDS.has(state.currentMapId)) {
        sfx.wrongBuzzer();
        setOverworldDialogue(`🔒 EAST ASIA REGION LOCKED! Catch 50 Pokémon (${state.dex.length}/50) to open the 2×2 Portal in Pallet Research Hub!`, 'PORTAL LOCKED', '50 DEX REQUIRED');
        return;
      }
      sfx.blip();
      renderGrandMapGridRegion('EAST_ASIA', mapModal);
    };
  }

  renderGrandMapGridRegion(startTab, mapModal);

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
  return npcs.find(npc => isNPCActiveOnMap(npc) && npc.x === tx && npc.y === ty) || null;
}

function getFacingPokeNPC() {
  const { tx, ty } = getFacingTileCoords();
  const pokeNpcs = getCurrentMap().pokeNpcs || [];
  return pokeNpcs.find(p => isNPCActiveOnMap(p) && p.x === tx && p.y === ty) || null;
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
    const monId = (npc.monsterId || npc.id || '').toLowerCase();
    const isLeg = npc.isLegendary || LEGENDARY_MONSTER_IDS.has(monId);

    if (npc.healsParty || npc.name.includes('NURSE')) {
      if (typeof sfx.playHealWithBgmPause === 'function') sfx.playHealWithBgmPause();
      else sfx.heal();
      state.dex.forEach(m => { m.hp = m.maxHp; });
      syncAllUI();
      if (typeof saveGameProgress === 'function') saveGameProgress();
      setOverworldDialogue(npc.fact, npc.name, npc.topic);
    } else if (isLeg) {
      sfx.pokemonCry(monId);
      setOverworldDialogue(npc.fact, npc.name, 'LEGENDARY CHALLENGE ★');
      const targetSpecies = MONSTER_SPECIES.find(m => m.id.toLowerCase() === monId);
      if (targetSpecies) {
        setTimeout(() => {
          triggerWildBattleFromOverworld(targetSpecies);
        }, 900);
      }
    } else if (npc.isMonster || npc.monsterId) {
      sfx.pokemonCry(npc.monsterId || npc.id);
      setOverworldDialogue(npc.fact, npc.name, npc.topic);
    } else {
      sfx.npcChime();
      setOverworldDialogue(npc.fact, npc.name, npc.topic);
    }
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
    } else if (tile === 'Y') {
    setOverworldDialogue("Glowing neon sign! Neon tubes contain low-pressure noble gases that ionize and emit vibrant photons when high voltage is applied—red-orange for pure Neon, and blue for Argon with Mercury!", obsDef?.name || "NEON SIGN", "ATOMIC PHYSICS");
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

  syncWorldMapButtonState();

  const { tx, ty } = getFacingTileCoords();
  const facingNpc = getFacingNPC();
  const facingPoke = getFacingPokeNPC();
  const facingItem = getFloorItemAt(tx, ty);
  const facingTile = getTileAt(tx, ty);
  const facingObs = (typeof OBSTACLE_DEFS !== 'undefined' && OBSTACLE_DEFS[facingTile] && !['.', 'P', 'E', 'G'].includes(facingTile))
    ? OBSTACLE_DEFS[facingTile]
    : null;

  if (promptEl) {
    if (isPortalTileOnCurrentMap(tx, ty)) {
      promptEl.textContent = state.currentMapId === 'CENTER'
        ? 'STEP ONTO 2×2 PORTAL TO WARP TO HONG KONG 🌀'
        : 'STEP ONTO 2×2 PORTAL TO WARP TO PALLET HUB 🌀';
      promptEl.classList.remove('hidden');
    } else if (facingItem) {
      promptEl.textContent = `PRESS [SPACE] OR [A] TO COLLECT / INTERACT WITH ${facingItem.name}`;
      promptEl.classList.remove('hidden');
    } else if (facingPoke) {
      promptEl.textContent = `PRESS [SPACE] OR [A] TO GREET ${facingPoke.name} ♪`;
      promptEl.classList.remove('hidden');
    } else if (facingNpc) {
      const monId = (facingNpc.monsterId || facingNpc.id || '').toLowerCase();
      const isLeg = facingNpc.isLegendary || LEGENDARY_MONSTER_IDS.has(monId);
      promptEl.textContent = isLeg
        ? `PRESS [SPACE] OR [A] TO CHALLENGE ${facingNpc.name} ★`
        : `PRESS [SPACE] OR [A] TO TALK TO ${facingNpc.name}`;
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

  // Check if player stepped onto the 2x2 Portal at (13..14, 9..10)
  if (isPortalTileOnCurrentMap(p.gridX, p.gridY)) {
    const destMapKey = state.currentMapId === 'CENTER' ? 'HONG_KONG' : 'CENTER';
    if (WORLD_MAPS[destMapKey]) {
      if (typeof sfx.transformEffect === 'function') sfx.transformEffect();
      else sfx.heal();
      state.busy = true;
      state.keysHeld = {};
      const destObj = WORLD_MAPS[destMapKey];
      runShutterTransition(`🌀 WARPING TO ${destObj.name}...`, () => {
        state.currentMapId = destMapKey;
        teleportPlayerToGrid(13, 12); // Spawn just below the 2x2 portal so it doesn't loop
        sfx.startBGM(state.currentMapId);
        updateOverworldHUD();
        if (typeof saveGameProgress === 'function') saveGameProgress();
        setOverworldDialogue(
          destMapKey === 'HONG_KONG'
            ? 'Warped through the 2×2 Dimensional Portal to Hong Kong! Explore Macau (W), China (N), Taiwan (E), Japan, South Korea, and Mongolia!'
            : 'Warped back through the 2×2 Portal to Pallet Research Hub!',
          destObj.name,
          'DIMENSIONAL PORTAL 🌀'
        );
        state.busy = false;
      });
      return;
    }
  }

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
      const portalNotice = state.dex.length === 50
        ? ' 🌀 50 POKÉMON CAUGHT! The 2×2 Dimensional Portal to HONG KONG has opened in Pallet Research Hub!'
        : '';
      setOverworldDialogue(statusMessage + portalNotice, 'BATTLE RESULT', 'EXPLORATION');
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