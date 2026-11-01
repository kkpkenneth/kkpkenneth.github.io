/********************************************************************
 * overworld.js
 * 4-Region World Map (OG, East Asia, West Europe, North America),
 * Tiered +10 Dex Portal Unlocks (50, 60, 70), All Evolution Stones,
 * Milestone Pop-ups, Floor Items & Full Obstacle Inspection
 ********************************************************************/

const FLOOR_ITEM_TYPES = [
  { id: 'oran_berry',    name: 'ORAN BERRY',    category: 'BERRY', tileKey: 'BERRY', color: '#3b82f6', highlight: '#93c5fd', desc: 'Restored +50 HP to your active partner!' },
  { id: 'sitrus_berry',  name: 'SITRUS BERRY',  category: 'BERRY', tileKey: 'BERRY', color: '#facc15', highlight: '#fef08a', desc: 'Fully restored your active partner\'s HP!' },
  { id: 'fire_stone',    name: 'FIRE STONE',    category: 'STONE', tileKey: 'STONE', stoneType: 'FIRE',    stoneLabel: 'FIRE STONE',    color: '#f97316', highlight: '#fde047', desc: 'Evolves Vulpix, Growlithe, or Eevee (into Flareon)!' },
  { id: 'water_stone',   name: 'WATER STONE',   category: 'STONE', tileKey: 'STONE', stoneType: 'WATER',   stoneLabel: 'WATER STONE',   color: '#0284c7', highlight: '#7dd3fc', desc: 'Evolves Poliwhirl, Shellder, Staryu, Lombre, or Eevee (into Vaporeon)!' },
  { id: 'thunder_stone', name: 'THUNDER STONE', category: 'STONE', tileKey: 'STONE', stoneType: 'THUNDER', stoneLabel: 'THUNDER STONE', color: '#eab308', highlight: '#fef08a', desc: 'Evolves Pikachu (into Raichu) or Eevee (into Jolteon)!' },
  { id: 'leaf_stone',    name: 'LEAF STONE',    category: 'STONE', tileKey: 'STONE', stoneType: 'LEAF',    stoneLabel: 'LEAF STONE',    color: '#16a34a', highlight: '#86efac', desc: 'Evolves Gloom, Weepinbell, Exeggcute, Nuzleaf, or Eevee (into Leafeon)!' },
  { id: 'moon_stone',    name: 'MOON STONE',    category: 'STONE', tileKey: 'STONE', stoneType: 'MOON',    stoneLabel: 'MOON STONE',    color: '#a855f7', highlight: '#e9d5ff', desc: 'Evolves Nidorina, Nidorino, Clefairy, Jigglypuff, Skitty, or Eevee (into Umbreon)!' },
  { id: 'sun_stone',     name: 'SUN STONE',     category: 'STONE', tileKey: 'STONE', stoneType: 'SUN',     stoneLabel: 'SUN STONE',     color: '#dc2626', highlight: '#fde047', desc: 'Evolves Gloom (into Bellossom), Sunkern (into Sunflora), or Eevee (into Espeon)!' },
  { id: 'ice_stone',     name: 'ICE STONE',     category: 'STONE', tileKey: 'STONE', stoneType: 'ICE',     stoneLabel: 'ICE STONE',     color: '#38bdf8', highlight: '#e0f2fe', desc: 'Evolves Eevee into Glaceon!' },
  { id: 'shiny_stone',   name: 'SHINY STONE',   category: 'STONE', tileKey: 'STONE', stoneType: 'SHINY',   stoneLabel: 'SHINY STONE',   color: '#f472b6', highlight: '#fce7f3', desc: 'Evolves Eevee into Sylveon!' },
  { id: 'kings_rock',    name: 'KINGS ROCK',    category: 'STONE', tileKey: 'STONE', stoneType: 'KINGS',   stoneLabel: 'KINGS ROCK',    color: '#eab308', highlight: '#ffffff', desc: 'Evolves Poliwhirl (into Politoed) or Slowpoke (into Slowking)!' },
  { id: 'metal_coat',    name: 'METAL COAT',    category: 'STONE', tileKey: 'STONE', stoneType: 'METAL',   stoneLabel: 'METAL COAT',    color: '#94a3b8', highlight: '#f8fafc', desc: 'Evolves Onix (into Steelix) or Scyther (into Scizor)!' },
  { id: 'dragon_scale',  name: 'DRAGON SCALE',  category: 'STONE', tileKey: 'STONE', stoneType: 'DRAGON',  stoneLabel: 'DRAGON SCALE',  color: '#2563eb', highlight: '#93c5fd', desc: 'Evolves Seadra into Kingdra!' },
  { id: 'up_grade',      name: 'UP-GRADE',      category: 'STONE', tileKey: 'STONE', stoneType: 'UPGRADE', stoneLabel: 'UP-GRADE',      color: '#f43f5e', highlight: '#38bdf8', desc: 'Evolves Porygon into Porygon2!' },
  { id: 'deep_sea_tooth',name: 'DEEP SEA TOOTH',category: 'STONE', tileKey: 'STONE', stoneType: 'TOOTH',   stoneLabel: 'DEEP SEA TOOTH',color: '#0284c7', highlight: '#e0f2fe', desc: 'Evolves Clamperl into Huntail!' },
  { id: 'deep_sea_scale',name: 'DEEP SEA SCALE',category: 'STONE', tileKey: 'STONE', stoneType: 'SCALE',   stoneLabel: 'DEEP SEA SCALE',color: '#ec4899', highlight: '#fbcfe8', desc: 'Evolves Clamperl into Gorebyss!' }
];

const HUMAN_SKIN_PALETTE = [
  '#fde68a', '#fed7aa', '#f5cba7', '#e59866', '#ca8a5b', '#a16236', '#784212', '#5c3317'
];

// 1. Original Region (5x5 Grand Map = 25 Walkable Areas)
const GRAND_MAP_5X5_GRID = [
  ['AURORA_RIDGE', 'WIND_TEMPLE', 'GLACIER',  'METEOR_CRATER', 'CYBER_NEXUS'],
  ['SPIRE',        'NORTHWEST',   'MOUNTAIN', 'NORTHEAST',     'FOUNDRY'],
  ['SANCTUARY',    'FOREST',      'CENTER',   'DESERT',        'ONSEN'],
  ['KALOS_GROVE',  'SOUTHWEST',   'BEACH',    'SOUTHEAST',     'VOLCANO'],
  ['SUNKEN_RUINS', 'BRAMBLE',     'ABYSS',    'SHADOW_ALLEY',  'MOON']
];

const OG_REGION_AREA_NAMES = {
  AURORA_RIDGE:  'Obsidian Tundra',
  WIND_TEMPLE:   'Azure Taiga',
  GLACIER:       'Cyan Cliff',
  METEOR_CRATER: 'Indigo Lake',
  CYBER_NEXUS:   'Neon Zone',
  SPIRE:         'Magenta Cave',
  NORTHWEST:     'Cobalt Boreal',
  MOUNTAIN:      'Slate Mountain',
  NORTHEAST:     'Amber Desert',
  FOUNDRY:       'Gray Town',
  SANCTUARY:     'Magenta Shrubland',
  FOREST:        'Teal Forest',
  CENTER:        'Beige Village',
  DESERT:        'Scarlet Savanna',
  ONSEN:         'Silver Geyser',
  KALOS_GROVE:   'Jade Jungle',
  SOUTHWEST:     'Emerald Swamp',
  BEACH:         'Golden Coast',
  SOUTHEAST:     'Bronze Reef',
  VOLCANO:       'Crimson Volcano',
  SUNKEN_RUINS:  'Sapphire Ocean',
  BRAMBLE:       'Purple Woods',
  ABYSS:         'Navy Abyss',
  SHADOW_ALLEY:  'Obsidian Urban',
  MOON:          'Ruby Badlands'
};

// 2. East Asia Region Grand Map (8 Areas: includes landlocked Fly-only NORTH_KOREA)
const EAST_ASIA_MAP_GRID = [
  ['NORTH_KOREA', 'MONGOLIA',  'SOUTH_KOREA'],
  [null,          'CHINA',     'JAPAN'],
  ['MACAU',       'HONG_KONG', 'TAIWAN']
];

const EAST_ASIA_MAP_IDS = new Set([
  'HONG_KONG', 'MACAU', 'CHINA', 'TAIWAN', 'JAPAN', 'SOUTH_KOREA', 'MONGOLIA', 'NORTH_KOREA'
]);

// 3. West Europe Region Grand Map (8 Areas: UK, Ireland, France, Germany, Spain, Portugal, Netherlands, Belgium)
const WEST_EUROPE_MAP_GRID = [
  ['IRELAND',  'UK',     'NETHERLANDS'],
  [null,       'FRANCE', 'BELGIUM'],
  ['PORTUGAL', 'SPAIN',  'GERMANY']
];

const WEST_EUROPE_MAP_IDS = new Set([
  'UK', 'FRANCE', 'SPAIN', 'PORTUGAL', 'IRELAND', 'GERMANY', 'NETHERLANDS', 'BELGIUM'
]);

// 4. North America Region Grand Map (8 Areas: Canada Hub, USA, Mexico, Cuba, Haiti, Jamaica, Bahamas, Dominican Republic)
const NORTH_AMERICA_MAP_GRID = [
  [null,      'CANADA',  null],
  ['MEXICO',  'USA',     'BAHAMAS'],
  ['JAMAICA', 'CUBA',    'HAITI'],
  [null,      null,      'DOMINICAN_REPUBLIC']
];

const NORTH_AMERICA_MAP_IDS = new Set([
  'CANADA', 'USA', 'MEXICO', 'CUBA', 'HAITI', 'JAMAICA', 'BAHAMAS', 'DOMINICAN_REPUBLIC'
]);

// Tiered Regional Unlocks: 50 for East Asia, +10 for each subsequent region
const REGION_PORTAL_TIERS = [
  { id: 'EAST_ASIA',     name: 'EAST ASIA REGION',     hubMap: 'HONG_KONG', requiredDex: 50 },
  { id: 'WEST_EUROPE',   name: 'WEST EUROPE REGION',   hubMap: 'UK',        requiredDex: 60 },
  { id: 'NORTH_AMERICA', name: 'NORTH AMERICA REGION', hubMap: 'CANADA',    requiredDex: 70 }
];

const LEGENDARY_MONSTER_IDS = new Set([
  'articuno', 'zapdos', 'moltres', 'mewtwo', 'mew', 'deoxys',
  'raikou', 'entei', 'suicune', 'lugia', 'ho_oh', 'celebi',
  'regirock', 'regice', 'registeel', 'latias', 'latios',
  'kyogre', 'groudon', 'rayquaza', 'jirachi', 'dialga', 'palkia'
]);

const _mapThumbnailCache = {};

function getRequiredDexForRegion(regionMode) {
  if (regionMode === 'HABITAT') return 0;
  const idx = REGION_PORTAL_TIERS.findIndex(r => r.id === regionMode);
  return idx !== -1 ? (50 + idx * 10) : 50;
}

function isRegionUnlocked(regionMode) {
  if (regionMode === 'HABITAT') return true;
  const count = (state && Array.isArray(state.dex)) ? state.dex.length : 0;
  return count >= getRequiredDexForRegion(regionMode);
}

function isPortalUnlocked() {
  return isRegionUnlocked('EAST_ASIA');
}

function getRegionOfMapId(mapId) {
  if (EAST_ASIA_MAP_IDS.has(mapId)) return 'EAST_ASIA';
  if (WEST_EUROPE_MAP_IDS.has(mapId)) return 'WEST_EUROPE';
  if (NORTH_AMERICA_MAP_IDS.has(mapId)) return 'NORTH_AMERICA';
  return 'HABITAT';
}

function applyOriginalRegionAreaNames() {
  if (typeof WORLD_MAPS === 'undefined') return;
  Object.keys(OG_REGION_AREA_NAMES).forEach(areaKey => {
    if (WORLD_MAPS[areaKey]) {
      WORLD_MAPS[areaKey].name = OG_REGION_AREA_NAMES[areaKey];
    }
  });
}

function getCanonicalLegendaryId(npcOrMon) {
  if (!npcOrMon) return '';
  return (npcOrMon.monsterId || npcOrMon.speciesId || npcOrMon.id || '')
    .toLowerCase()
    .replace(/^overworld_/, '');
}

function isLegendarySpeciesId(idStr) {
  if (!idStr) return false;
  return LEGENDARY_MONSTER_IDS.has(idStr.toLowerCase().replace(/^overworld_/, ''));
}

function isNPCActiveOnMap(npc) {
  if (!npc) return false;
  const rawId = getCanonicalLegendaryId(npc);
  const isLeg = Boolean(npc.isLegendary || isLegendarySpeciesId(rawId));
  if (isLeg) {
    if (state.dex && state.dex.some(p => p.id.toLowerCase() === rawId)) {
      return false;
    }
    if (Array.isArray(state.defeatedLegendariesInArea) && state.defeatedLegendariesInArea.includes(rawId)) {
      return false;
    }
  }
  return true;
}

function clearAreaLegendaryStateOnTransit() {
  state.pendingLegendaryChallengeId = null;
  state.defeatedLegendariesInArea = [];
}

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
      else if (ch === 'H' || ch === 'D' || ch === 'Y' || ch === 'X' || ch === 'u' || ch === 'b') color = '#f43f5e';
      else if (ch === 'J' || ch === 'O' || ch === 'n' || ch === 'q') color = '#f472b6';
      else if (ch === 'g' || ch === 'c' || ch === 'w') color = '#f8fafc';
      else if (ch === 'k' || ch === 'm' || ch === 'a') color = '#b45309';
      else if (ch === 'T' || ch === 'C' || ch === 'j' || ch === 'l') color = th.treeTop || th.tree || '#14532d';
      else color = th.rockLight || th.rock || '#94a3b8';

      ctx.fillStyle = color;
      ctx.fillRect(c * 2, r * 2, 2, 2);
    }
  }

  const url = cvs.toDataURL();
  _mapThumbnailCache[mapObj.id] = url;
  return url;
}

function isPortalTileOnCurrentMap(col, row) {
  if (!state) return false;
  const portalHubs = new Set(['CENTER', 'HONG_KONG', 'UK', 'CANADA']);
  if (!portalHubs.has(state.currentMapId)) return false;
  if (state.currentMapId === 'CENTER' && !isPortalUnlocked()) return false;
  return (col === 13 || col === 14) && (row === 9 || row === 10);
}

function drawPortalOnCanvas(ctx, animTick) {
  if (!state) return;
  const portalHubs = new Set(['CENTER', 'HONG_KONG', 'UK', 'CANADA']);
  if (!portalHubs.has(state.currentMapId)) return;
  if (state.currentMapId === 'CENTER' && !isPortalUnlocked()) return;

  const px = 13 * TILE_SIZE;
  const py = 9 * TILE_SIZE;
  const size = TILE_SIZE * 2;
  const pulse = Math.sin(animTick / 180) * 3;

  ctx.save();
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px + 2, py + 2, size - 4, size - 4);

  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 3;
  ctx.strokeRect(px + 4, py + 4, size - 8, size - 8);

  ctx.fillStyle = '#7e22ce';
  ctx.fillRect(px + 8, py + 8, size - 16, size - 16);

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 14 - pulse, py + 14 - pulse, size - 28 + pulse * 2, size - 28 + pulse * 2);

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px + 24, py + 24, size - 48, size - 48);

  ctx.restore();
}

function showFeatureUnlockPopup(title, subtitle, description, badgeText = 'NEW FEATURE UNLOCKED!') {
  let modal = document.getElementById('featureUnlockModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'featureUnlockModal';
    modal.className = 'fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 hidden items-center justify-center p-3';
    modal.innerHTML = `
      <div class="w-full max-w-md retro-box p-4 sm:p-5 flex flex-col gap-3 text-center border-4 border-amber-400 shadow-2xl">
        <div class="flex items-center justify-center">
          <span id="unlockModalBadge" class="bg-amber-400 text-slate-950 text-[8px] sm:text-[9px] px-2.5 py-1 rounded border-2 border-slate-950 font-bold"></span>
        </div>
        <h2 id="unlockModalTitle" class="text-sm sm:text-base font-bold text-indigo-900"></h2>
        <div id="unlockModalSubtitle" class="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-400 rounded py-1 px-2"></div>
        <p id="unlockModalDesc" class="text-[10px] sm:text-xs text-slate-800 leading-relaxed"></p>
        <div class="flex justify-center pt-2 border-t border-slate-300">
          <button id="closeUnlockModalBtn" type="button" class="pixel-btn bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] sm:text-[10px] font-bold px-5 py-2">
            GOT IT!
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeUnlockModalBtn').addEventListener('click', () => {
      if (typeof sfx !== 'undefined') sfx.blip();
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  document.getElementById('unlockModalBadge').textContent = badgeText;
  document.getElementById('unlockModalTitle').textContent = title;
  document.getElementById('unlockModalSubtitle').textContent = subtitle;
  document.getElementById('unlockModalDesc').textContent = description;

  if (typeof sfx !== 'undefined' && typeof sfx.grandVictoryFanfare === 'function') {
    sfx.grandVictoryFanfare();
  }
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function checkMilestoneUnlocks() {
  if (!state || !Array.isArray(state.dex)) return;
  if (!state.unlockedMilestones) {
    state.unlockedMilestones = { map20: false, fly30: false, portal50: false, portal60: false, portal70: false };
  }

  const count = state.dex.length;

  if (count >= 20 && !state.unlockedMilestones.map20) {
    state.unlockedMilestones.map20 = true;
    showFeatureUnlockPopup(
      'GRAND REGION MAP UNLOCKED!',
      '20 POKEMON REGISTERED IN DEX',
      'You can now open the Grand Region Map from the Overworld HUD to inspect all 25 Original Region habitats and track your location!'
    );
  } else if (count >= 30 && !state.unlockedMilestones.fly30) {
    state.unlockedMilestones.fly30 = true;
    showFeatureUnlockPopup(
      'FLY FAST-TRAVEL UNLOCKED!',
      '30 POKEMON REGISTERED IN DEX',
      'You can now click any area on your Grand Region Map to Fly directly there, including detached/landlocked biomes like North Korea!'
    );
  } else if (count >= 50 && !state.unlockedMilestones.portal50) {
    state.unlockedMilestones.portal50 = true;
    showFeatureUnlockPopup(
      'EAST ASIA PORTAL UNLOCKED!',
      '50 POKEMON REGISTERED IN DEX',
      'The 2x2 Dimensional Portal has opened in Beige Village! Warp to Hong Kong, Macau, China, Taiwan, Japan, South Korea, Mongolia, and Fly-only North Korea!'
    );
  } else if (count >= 60 && !state.unlockedMilestones.portal60) {
    state.unlockedMilestones.portal60 = true;
    showFeatureUnlockPopup(
      'WEST EUROPE PORTAL UNLOCKED!',
      '60 POKEMON REGISTERED IN DEX (+10 TIER)',
      'Your Dimensional Portal now links to West Europe! Explore the UK, Ireland, France, Germany, Spain, Portugal, Netherlands, and Belgium!'
    );
  } else if (count >= 70 && !state.unlockedMilestones.portal70) {
    state.unlockedMilestones.portal70 = true;
    showFeatureUnlockPopup(
      'NORTH AMERICA PORTAL UNLOCKED!',
      '70 POKEMON REGISTERED IN DEX (+10 TIER)',
      'Your Dimensional Portal now links to North America! Explore the Canada Hub, USA, Mexico, Cuba, Haiti, Jamaica, Bahamas, and Dominican Republic!'
    );
  }
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
  applyOriginalRegionAreaNames();
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
    const blockedFallback = new Set([
      'T','W','H','R','I','C','K','L','S','V','U','A','N','Q','Y','J','O','Z','X',
      'g','k','c','i','e','x','w','z','u','n','b','m','s','f','a','h','j','q','d','l'
    ]);
    if (blockedFallback.has(tile)) return true;
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
      if ((c === 13 || c === 14) && (r === 9 || r === 10)) continue;
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
    const isStone = Math.random() < 0.45;
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
      setOverworldDialogue(`Collected ${item.name}! ${partner.name} recovered +50 HP! (${partner.hp}/${partner.maxHp})`, item.name, 'BERRY COLLECTED');
    } else if (item.id === 'sitrus_berry') {
      partner.hp = partner.maxHp;
      setOverworldDialogue(`Collected ${item.name}! ${partner.name}'s HP was fully restored!`, item.name, 'BERRY COLLECTED');
    }
  } else if (item.category === 'STONE') {
    const oldName = partner.name;
    const evolvedMsg = (typeof tryStoneEvolution === 'function') ? tryStoneEvolution(partner, item) : null;
    if (evolvedMsg) {
      state.floorItems = (state.floorItems || []).filter(it => !(it.x === item.x && it.y === item.y));
      setOverworldDialogue(`Used ${item.name} with ${oldName}! ${evolvedMsg}`, 'STONE EVOLUTION!', item.name);
      const playerWrapper = document.getElementById('playerSpriteWrapper');
      if (playerWrapper && typeof renderMonsterSVG === 'function') {
        playerWrapper.innerHTML = renderMonsterSVG(partner);
      }
      checkMilestoneUnlocks();
    } else {
      state.floorItems = (state.floorItems || []).filter(it => !(it.x === item.x && it.y === item.y));
      sfx.wrongBuzzer();
      setOverworldDialogue(`The ${item.name} shattered and nothing happened. (${partner.name} cannot evolve with ${item.name}!)`, 'STONE SHATTERED', item.name);
    }
  }

  syncAllUI();
  if (typeof saveGameProgress === 'function') saveGameProgress();
}

function drawFloorItemsOnCanvas(ctx, animTick) {
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
      const itemPalette = {
        ...obsDef.palette,
        t: item.color || obsDef.palette.t,
        s: item.highlight || obsDef.palette.s
      };
      drawBitmap16(ctx, obsDef.grid, itemPalette, dx, dy, TILE_SIZE, false);
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
    mapBtn.innerHTML = `MAP (${caught}/20)`;
  } else {
    mapBtn.className = 'pixel-btn bg-indigo-600 hover:bg-indigo-500 text-white text-[7px] sm:text-[9px] px-2.5 py-2 sm:px-3 sm:py-2';
    mapBtn.innerHTML = `MAP`;
  }
}

function renderGrandMapGridRegion(regionMode, mapModal) {
  applyOriginalRegionAreaNames();
  const grid = document.getElementById('worldMapRegionsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const currentRegion = getRegionOfMapId(state.currentMapId);
  const canFly = state.dex.length >= 30;

  let matrix = GRAND_MAP_5X5_GRID;
  let colsCount = 5;
  if (regionMode === 'EAST_ASIA') {
    matrix = EAST_ASIA_MAP_GRID;
    colsCount = 3;
  } else if (regionMode === 'WEST_EUROPE') {
    matrix = WEST_EUROPE_MAP_GRID;
    colsCount = 3;
  } else if (regionMode === 'NORTH_AMERICA') {
    matrix = NORTH_AMERICA_MAP_GRID;
    colsCount = 3;
  }

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
      const targetRegion = getRegionOfMapId(mapKey);
      const sameRegionAsPlayer = (currentRegion === targetRegion);
      const reqDexForTarget = getRequiredDexForRegion(targetRegion);
      const isLockedPortalRegion = !isRegionUnlocked(targetRegion);
      const allowFastTravelHere = canFly && !isCurrent && sameRegionAsPlayer && !isLockedPortalRegion;
      const allowPortalTransitHere = !sameRegionAsPlayer && !isLockedPortalRegion;

      const bgHex = mapObj.theme?.groundA || '#334155';
      const areaTitle = OG_REGION_AREA_NAMES[mapKey] || mapObj.name.replace(/\s*\([^)]*\)\s*/g, '');
      const thumbUrl = renderMapThumbnailDataURL(mapObj);
      const isHubPortal = (mapKey === 'CENTER' || mapKey === 'HONG_KONG' || mapKey === 'UK' || mapKey === 'CANADA');

      const card = document.createElement('div');
      card.className = `pixel-btn p-1.5 sm:p-2 flex flex-col justify-between gap-1 text-left min-h-[108px] ${
        isCurrent ? 'ring-2 ring-amber-400 border-amber-400 scale-[1.02]' : ''
      } ${isLockedPortalRegion ? 'opacity-50 grayscale' : ''}`;
      card.style.backgroundColor = bgHex;
      card.style.color = '#ffffff';

      card.innerHTML = `
        <div class="flex items-start justify-between gap-1">
          <span class="text-[7px] sm:text-[8px] font-bold leading-tight drop-shadow-[1px_1px_0_#000] truncate">${areaTitle}</span>
          ${isCurrent ? '<span class="text-[6px] bg-amber-400 text-slate-950 px-1 py-0.5 rounded font-bold shrink-0">YOU</span>' : ''}
        </div>
        <div class="w-full h-11 sm:h-12 rounded border border-slate-950 overflow-hidden bg-slate-950 my-0.5 shadow-inner relative">
          <img src="${thumbUrl}" alt="${areaTitle}" class="w-full h-full object-cover" style="image-rendering: pixelated;" />
          ${isHubPortal && !isLockedPortalRegion ? '<span class="absolute bottom-0.5 right-0.5 text-[6px] bg-purple-700 text-white px-1 rounded border border-white">PORTAL</span>' : ''}
          ${mapKey === 'NORTH_KOREA' ? '<span class="absolute top-0.5 left-0.5 text-[6px] bg-red-800 text-white px-1 rounded border border-white">FLY ONLY</span>' : ''}
        </div>
        <div class="flex items-center justify-between gap-1 mt-auto">
          <span class="text-[6px] text-slate-200 drop-shadow-[1px_1px_0_#000]">${
            regionMode === 'HABITAT' ? `AREA (${cIdx - 2}, ${2 - rIdx})` : regionMode.replace('_', ' ')
          }</span>
          ${isLockedPortalRegion
            ? `<span class="text-[6px] bg-red-800 text-white px-1 py-0.5 rounded font-bold">NEED ${reqDexForTarget} DEX</span>`
            : (allowFastTravelHere
              ? `<button type="button" class="bg-sky-400 hover:bg-sky-300 text-slate-950 text-[6px] sm:text-[7px] px-1.5 py-0.5 rounded font-bold border border-slate-950 shadow">FLY</button>`
              : (!sameRegionAsPlayer && !isCurrent && !isLockedPortalRegion ? `<button type="button" class="bg-purple-600 hover:bg-purple-500 text-white text-[6px] sm:text-[7px] px-1.5 py-0.5 rounded font-bold border border-slate-950 shadow">PORTAL</button>` : ''))}
        </div>
      `;

      if (allowFastTravelHere || allowPortalTransitHere) {
        card.addEventListener('click', () => {
          if (isLockedPortalRegion) {
            sfx.wrongBuzzer();
            return;
          }
          sfx.heal();
          mapModal.classList.add('hidden');
          mapModal.classList.remove('flex');
          runShutterTransition(`WARPING TO ${areaTitle}...`, () => {
            clearAreaLegendaryStateOnTransit();
            state.currentMapId = mapKey;
            teleportPlayerToGrid(13, 12);
            sfx.startBGM(state.currentMapId);
            updateOverworldHUD();
            if (typeof saveGameProgress === 'function') saveGameProgress();
            setOverworldDialogue(`Warped directly to ${areaTitle}!`, areaTitle, 'GRAND MAP WARP');
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
    setOverworldDialogue(`GRAND REGION MAP LOCKED! You have caught ${state.dex.length}/${MONSTER_SPECIES.length} Pokemon! Catch at least 20 Pokemon to unlock the Region Map.`, 'LOCKED FEATURE', 'REGION MAP');
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
            <h2 class="text-xs sm:text-sm font-bold text-slate-900">GRAND REGION MAP (WALKABLE AREAS)</h2>
            <p id="mapModalStatusSubtitle" class="text-[8px] sm:text-[9px] text-slate-600 mt-0.5"></p>
          </div>
          <div class="flex flex-wrap items-center gap-1.5">
            <button id="tabHabitatMapBtn" type="button" class="pixel-btn bg-indigo-600 text-white text-[8px] px-2.5 py-1 font-bold">OG (25)</button>
            <button id="tabEastAsiaMapBtn" type="button" class="pixel-btn bg-rose-700 text-white text-[8px] px-2.5 py-1 font-bold">EAST ASIA (8)</button>
            <button id="tabWestEuropeMapBtn" type="button" class="pixel-btn bg-emerald-700 text-white text-[8px] px-2.5 py-1 font-bold">WEST EUROPE (8)</button>
            <button id="tabNorthAmericaMapBtn" type="button" class="pixel-btn bg-sky-700 text-white text-[8px] px-2.5 py-1 font-bold">NORTH AMERICA (8)</button>
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
  const subtitleEl = document.getElementById('mapModalStatusSubtitle');
  if (subtitleEl) {
    subtitleEl.textContent = `${canFly ? 'FLY OPEN' : `FLY (${state.dex.length}/30)`} | EAST ASIA: ${
      isRegionUnlocked('EAST_ASIA') ? 'OPEN' : `${state.dex.length}/50`
    } | WEST EUROPE: ${
      isRegionUnlocked('WEST_EUROPE') ? 'OPEN' : `${state.dex.length}/60`
    } | NORTH AMERICA: ${
      isRegionUnlocked('NORTH_AMERICA') ? 'OPEN' : `${state.dex.length}/70`
    }`;
  }

  const tabHab = document.getElementById('tabHabitatMapBtn');
  const tabAsia = document.getElementById('tabEastAsiaMapBtn');
  const tabEuro = document.getElementById('tabWestEuropeMapBtn');
  const tabAmer = document.getElementById('tabNorthAmericaMapBtn');
  const startTab = getRegionOfMapId(state.currentMapId);

  if (tabHab) {
    tabHab.onclick = () => { sfx.blip(); renderGrandMapGridRegion('HABITAT', mapModal); };
  }
  if (tabAsia) {
    tabAsia.onclick = () => {
      if (!isRegionUnlocked('EAST_ASIA') && !EAST_ASIA_MAP_IDS.has(state.currentMapId)) {
        sfx.wrongBuzzer();
        setOverworldDialogue(`EAST ASIA LOCKED! Catch 50 Pokemon (${state.dex.length}/50) to open the East Asia Portal!`, 'PORTAL LOCKED', '50 DEX REQUIRED');
        return;
      }
      sfx.blip();
      renderGrandMapGridRegion('EAST_ASIA', mapModal);
    };
  }
  if (tabEuro) {
    tabEuro.onclick = () => {
      if (!isRegionUnlocked('WEST_EUROPE') && !WEST_EUROPE_MAP_IDS.has(state.currentMapId)) {
        sfx.wrongBuzzer();
        setOverworldDialogue(`WEST EUROPE LOCKED! Catch 60 Pokemon (${state.dex.length}/60) to open the West Europe Portal!`, 'PORTAL LOCKED', '60 DEX REQUIRED');
        return;
      }
      sfx.blip();
      renderGrandMapGridRegion('WEST_EUROPE', mapModal);
    };
  }
  if (tabAmer) {
    tabAmer.onclick = () => {
      if (!isRegionUnlocked('NORTH_AMERICA') && !NORTH_AMERICA_MAP_IDS.has(state.currentMapId)) {
        sfx.wrongBuzzer();
        setOverworldDialogue(`NORTH AMERICA LOCKED! Catch 70 Pokemon (${state.dex.length}/70) to open the North America Portal!`, 'PORTAL LOCKED', '70 DEX REQUIRED');
        return;
      }
      sfx.blip();
      renderGrandMapGridRegion('NORTH_AMERICA', mapModal);
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

function handleTwoStepLegendaryInteraction(npcObj, rawMonId) {
  const targetSpecies = MONSTER_SPECIES.find(
    m => m.id.toLowerCase() === rawMonId || m.name.toLowerCase() === (npcObj.name || '').toLowerCase()
  );

  if (state.pendingLegendaryChallengeId === rawMonId && targetSpecies) {
    state.pendingLegendaryChallengeId = null;
    triggerWildBattleFromOverworld(targetSpecies, true);
    return;
  }

  sfx.pokemonCry(rawMonId);
  state.pendingLegendaryChallengeId = rawMonId;
  const baseText = npcObj.fact || `${npcObj.name} eyes you with intense legendary power!`;
  setOverworldDialogue(
    `${baseText} [Press SPACE or A - TALK again to challenge ${npcObj.name}!]`,
    npcObj.name,
    'PRESS SPACE / TALK TO BATTLE'
  );
  updateOverworldHUD();
}

function interactWithFacingNPC() {
  if (state.screen !== 'OVERWORLD' || state.busy || state.playerWorld.isStepping) return;

  const { tx, ty } = getFacingTileCoords();

  const facingItem = getFloorItemAt(tx, ty);
  if (facingItem) {
    state.pendingLegendaryChallengeId = null;
    interactWithFloorItem(facingItem);
    return;
  }

  const pokeNpc = getFacingPokeNPC();
  if (pokeNpc) {
    const rawPokeId = getCanonicalLegendaryId(pokeNpc);
    const isLeg = Boolean(pokeNpc.isLegendary || isLegendarySpeciesId(rawPokeId));
    if (isLeg) {
      handleTwoStepLegendaryInteraction(pokeNpc, rawPokeId);
      return;
    }
    state.pendingLegendaryChallengeId = null;
    const species = MONSTER_SPECIES.find(m => m.id.toLowerCase() === rawPokeId);
    const displayName = species ? species.name : pokeNpc.name;
    sfx.pokemonCry(rawPokeId);
    setOverworldDialogue(`${displayName}! ${displayName}~`, displayName, 'POKEMON CALL');
    return;
  }

  const npc = getFacingNPC();
  if (npc) {
    const rawMonId = getCanonicalLegendaryId(npc);
    const isLeg = Boolean(npc.isLegendary || isLegendarySpeciesId(rawMonId));

    if (npc.healsParty || npc.name.includes('NURSE')) {
      state.pendingLegendaryChallengeId = null;
      if (typeof sfx.playHealWithBgmPause === 'function') sfx.playHealWithBgmPause();
      else sfx.heal();
      state.dex.forEach(m => { m.hp = m.maxHp; });
      syncAllUI();
      if (typeof saveGameProgress === 'function') saveGameProgress();
      setOverworldDialogue(npc.fact, npc.name, npc.topic);
      return;
    }

    if (isLeg) {
      handleTwoStepLegendaryInteraction(npc, rawMonId);
      return;
    }

    state.pendingLegendaryChallengeId = null;
    if (npc.isMonster || npc.monsterId) {
      sfx.pokemonCry(rawMonId);
    } else {
      sfx.npcChime();
    }
    setOverworldDialogue(npc.fact, npc.name, npc.topic);
    return;
  }

  state.pendingLegendaryChallengeId = null;

  if (state.partnerWorld && state.partnerWorld.gridX === tx && state.partnerWorld.gridY === ty) {
    const partner = getActivePlayer();
    sfx.pokemonCry(partner.id);
    const evoNote = ` [${getEvoStatusText(partner)}]`;
    setOverworldDialogue(`${partner.name}! ${partner.name}~ (Your active partner is happily following you!${evoNote})`, partner.name, 'ACTIVE PARTNER');
    return;
  }

  const tile = getTileAt(tx, ty);
  const obsDef = (typeof OBSTACLE_DEFS !== 'undefined' && OBSTACLE_DEFS[tile]) ? OBSTACLE_DEFS[tile] : null;
  sfx.blip();

  const obstacleFacts = {
    W: ["Crystal-clear water! Roughly 71% of Earth's surface is covered by water!", "WATER'S EDGE", "HYDROLOGY"],
    G: ["Tall wild grass! Step inside to encounter wild monsters native to this area!", "TALL GRASS", "HABITAT"],
    T: ["Canopy tree! Trees absorb Carbon Dioxide through leaf Stomata and use Chlorophyll to produce Oxygen and glucose!", "CANOPY TREE", "BOTANY"],
    R: ["Solid crag boulder! The Rock Cycle transitions rocks between Igneous, Sedimentary, and Metamorphic states!", "CRAG BOULDER", "GEOLOGY"],
    I: ["Crystalline glacier ice block! Ordinary water ice forms a Hexagonal crystal lattice at 0C!", "GLACIER ICE", "GLACIOLOGY"],
    C: ["Desert saguaro cactus! Succulents store water in thick stems and use spines to minimize transpiration!", "SAGUARO CACTUS", "XEROPHYTE"],
    K: ["Marine reef coral! Coral reefs are built by calcium-carbonate-secreting polyps in symbiosis with algae!", "REEF CORAL", "MARINE ECOLOGY"],
    L: ["Molten lava pool! Underground molten rock is Magma, and once it erupts onto the surface it is Lava!", "MOLTEN LAVA", "VOLCANOLOGY"],
    M: ["Nutrient-rich swamp mud! Anaerobic wetland sediments slow organic decomposition and filter aquifers!", "SWAMP MUD", "WETLANDS"],
    F: ["Blooming wildflower patch! Angiosperm flowers attract pollinators to produce seeds enclosed within fruit!", "WILDFLOWERS", "BOTANY"],
    B: ["Timber suspension bridge! Structural beams distribute compressive and tensile forces across supports!", "WOODEN BRIDGE", "ENGINEERING"],
    S: ["Geothermal steam geyser! Superheated groundwater rises through volcanic fissures to form hot springs!", "STEAM GEYSER", "GEOTHERMAL"],
    V: ["High-voltage Tesla coil! Alternating magnetic fields induce currents across conductive windings!", "TESLA PYLON", "ELECTROMAGNETISM"],
    U: ["Bioluminescent spore toadstool! Fungi have cell walls made of Chitin and reproduce via spores!", "SPORE TOADSTOOL", "MYCOLOGY"],
    A: ["Astral crystal obelisk! Birefringent crystals split incoming light beams into polarized spectra!", "ASTRAL OBELISK", "OPTICS"],
    N: ["Flickering shadow streetlamp! Dark Matter accounts for ~85% of the universe's mass!", "SHADOW LAMP", "COSMOLOGY"],
    Q: ["Miradouro da Lua cliff spire! Wind and rain erosion carved red clay into lunar hoodoo pinnacles!", "MOON CLIFF SPIRE", "GEOMORPHOLOGY"],
    Y: ["Glowing neon sign! Noble gases ionize and emit vibrant photons when high voltage is applied!", "NEON SIGN", "ATOMIC PHYSICS"],
    J: ["Sakura cherry blossom tree! Cherry trees bloom synchronously in spring in response to temperature!", "CHERRY BLOSSOM", "BOTANY"],
    O: ["Fragrant plum blossom shrub! Plum blossoms bloom in late winter even through frost!", "PLUM BLOSSOM", "BOTANY"],
    Z: ["Great Wall battlement! Ancient builders mixed sticky rice amylopectin mortar with slaked lime!", "GREAT WALL", "ENGINEERING"],
    X: ["Cotai slot machine! Governed by a Pseudo-Random Number Generator (PRNG) and probability laws!", "SLOT MACHINE", "PROBABILITY"],
    g: ["Mongolian Yurt (Ger)! Its circular lattice wall resists fierce steppe winds while retaining heat!", "MONGOLIAN YURT", "ARCHITECTURE"],
    k: ["Breathable clay Onggi jars of Kimchi! Micropores allow CO2 from Lactobacillus fermentation to escape!", "KIMCHI ONGGI JARS", "MICROBIOLOGY"],
    c: ["Royal Clock Tower! Pendulum clocks keep time using simple harmonic motion!", "CLOCK TOWER", "MECHANICS"],
    i: ["Celtic Stone Cross! Carved from sandstone and granite with geometric knotwork and solar rings!", "CELTIC CROSS", "ARCHAEOLOGY"],
    e: ["Eiffel Puddled-Iron Spire! Curved lattice trusses convert horizontal wind shear into compression!", "EIFFEL SPIRE", "ENGINEERING"],
    x: ["Alpine Timber-Frame Chalet! Steeply pitched roofs prevent heavy winter snow accumulation!", "TIMBER CHALET", "ARCHITECTURE"],
    w: ["La Mancha Windmill! Sails convert kinetic wind energy into rotational mechanical torque!", "WINDMILL", "PHYSICS"],
    z: ["Portuguese Azulejo Tile Arch! Tin-glazed ceramic tiles reflect solar radiation and resist humidity!", "AZULEJO ARCH", "MATERIALS"],
    u: ["Juche Monolith Tower! Carved from stacked granite blocks, monumental obelisks rely on a wide base to lower their center of gravity!", "MONOLITH TOWER", "STATICS"],
    n: ["Dutch Polder Tulip Bed & Canal Mill! Polders reclaim low-lying land from the sea using dikes and wind-powered Archimedes screw pumps!", "POLDER TULIPS", "HYDROLOGY"],
    b: ["Brussels Atomium Sphere! Modeled after an Iron (Fe) unit crystal cell magnified 165 billion times in a body-centered cubic lattice!", "ATOMIUM SPHERE", "CRYSTALLOGRAPHY"],
    m: ["Canadian Sugar Maple Tree! During spring thaws, positive sap pressure pushes sucrose-rich xylem sap upward to be boiled into maple syrup!", "SUGAR MAPLE", "BOTANY"],
    s: ["Copper Liberty Torch Statue! Exposed copper oxidizes over decades with atmospheric carbon dioxide and water to form a protective green patina!", "COPPER STATUE", "CHEMISTRY"],
    f: ["Mesoamerican Stepped Pyramid! Built in alignment with the vernal and autumnal equinoxes to cast serpent-like solar shadows!", "STEPPED PYRAMID", "ARCHAEOASTRONOMY"],
    a: ["Havana Classic Chrome Cruiser! 1950s internal combustion engines kept running for decades through resourceful mechanical fabrication!", "CLASSIC CRUISER", "THERMODYNAMICS"],
    h: ["Citadelle Laferriere Cannon! Mounted atop northern Haiti's mountain peak, bronze cannons use rapid gunpowder combustion to launch iron spheres!", "CITADELLE CANNON", "BALLISTICS"],
    j: ["Kingston Reggae Sound System Stack! Massive bass reflex speaker cabinets amplify low-frequency acoustic wavelengths!", "SOUND SYSTEM", "ACOUSTICS"],
    q: ["Nassau Pink Conch Shell Monument! Queen conchs precipitate calcium carbonate in a logarithmic spiral shell for marine protection!", "CONCH MONUMENT", "MARINE BIOLOGY"],
    d: ["Santo Domingo Colonial Coral-Limestone Arch! Built from fossilized Pleistocene reef limestone, the oldest cathedral stone in the Americas!", "COLONIAL ARCH", "GEOLOGY"],
    l: ["Caribbean Coconut Palm! Buoyant fibrous husks allow coconut seeds (drupes) to float across ocean currents and colonize tropical islands!", "COCONUT PALM", "ECOLOGY"]
  };

  if (obstacleFacts[tile]) {
    const [text, defaultTitle, topic] = obstacleFacts[tile];
    setOverworldDialogue(text, obsDef?.name || defaultTitle, topic);
  } else if (tile === 'H' || tile === 'D') {
    setOverworldDialogue("Professor's words echoed: \"Walking into someone's house without permission is known as trespassing and it is illegal!\"", "LOCKED HOUSE", "LAW & CIVICS");
  } else {
    setOverworldDialogue("Face any Specialist, Alien, Overworld Pokemon, Obstacle, or Floor Item (Berries & Stones) and press SPACE or A!", "FIELD JOURNAL", "TIP");
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
    coordsText.textContent = `AREA: ${mapObj.name} - POS: (${gridX}, ${gridY}) - ITEMS: ${itemsLeft} - ${tile === 'G' ? 'IN TALL GRASS' : 'SAFE PATH'}`;
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
      promptEl.textContent = 'STEP ONTO 2x2 PORTAL TO WARP TO NEXT UNLOCKED REGION';
      promptEl.classList.remove('hidden');
    } else if (facingItem) {
      promptEl.textContent = `PRESS [SPACE] OR [A] TO COLLECT / INTERACT WITH ${facingItem.name}`;
      promptEl.classList.remove('hidden');
    } else if (facingPoke) {
      const rawPokeId = getCanonicalLegendaryId(facingPoke);
      const isLeg = Boolean(facingPoke.isLegendary || isLegendarySpeciesId(rawPokeId));
      promptEl.textContent = isLeg && state.pendingLegendaryChallengeId === rawPokeId
        ? `PRESS [SPACE] OR [A] AGAIN TO BATTLE ${facingPoke.name}!`
        : `PRESS [SPACE] OR [A] TO GREET ${facingPoke.name}`;
      promptEl.classList.remove('hidden');
    } else if (facingNpc) {
      const monId = getCanonicalLegendaryId(facingNpc);
      const isLeg = Boolean(facingNpc.isLegendary || isLegendarySpeciesId(monId));
      if (isLeg) {
        promptEl.textContent = state.pendingLegendaryChallengeId === monId
          ? `PRESS [SPACE] OR [A] AGAIN TO START LEGENDARY BATTLE!`
          : `PRESS [SPACE] OR [A] TO SPEAK TO ${facingNpc.name}`;
      } else {
        promptEl.textContent = `PRESS [SPACE] OR [A] TO TALK TO ${facingNpc.name}`;
      }
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

  state.pendingLegendaryChallengeId = null;

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

function getNextUnlockedPortalHub(currentMapId) {
  const hubs = ['CENTER'];
  if (isRegionUnlocked('EAST_ASIA')) hubs.push('HONG_KONG');
  if (isRegionUnlocked('WEST_EUROPE')) hubs.push('UK');
  if (isRegionUnlocked('NORTH_AMERICA')) hubs.push('CANADA');
  const idx = hubs.indexOf(currentMapId);
  if (idx === -1) return 'CENTER';
  return hubs[(idx + 1) % hubs.length];
}

function onSingleBlockStepLanded() {
  const p = state.playerWorld;
  const tile = getTileAt(p.gridX, p.gridY);
  updateOverworldHUD();

  if (isPortalTileOnCurrentMap(p.gridX, p.gridY)) {
    const destMapKey = getNextUnlockedPortalHub(state.currentMapId);
    if (WORLD_MAPS[destMapKey]) {
      if (typeof sfx.transformEffect === 'function') sfx.transformEffect();
      else sfx.heal();
      state.busy = true;
      state.keysHeld = {};
      const destObj = WORLD_MAPS[destMapKey];
      runShutterTransition(`WARPING TO ${destObj.name}...`, () => {
        clearAreaLegendaryStateOnTransit();
        state.currentMapId = destMapKey;
        teleportPlayerToGrid(13, 12);
        sfx.startBGM(state.currentMapId);
        updateOverworldHUD();
        if (typeof saveGameProgress === 'function') saveGameProgress();
        setOverworldDialogue(`Warped through the 2x2 Dimensional Portal to ${destObj.name}!`, destObj.name, 'REGION PORTAL');
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
        clearAreaLegendaryStateOnTransit();
        state.currentMapId = exitCfg.targetMap;
        teleportPlayerToGrid(exitCfg.spawnX, exitCfg.spawnY);
        sfx.startBGM(state.currentMapId);
        updateOverworldHUD();
        if (typeof saveGameProgress === 'function') saveGameProgress();
        setOverworldDialogue(`Entered ${targetMapObj.name}! Fresh Berries and Evolutionary Stones have appeared in this area!`, targetMapObj.name, 'AREA TRANSIT');
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

function enterOverworldFromTitle() {
  if (state.busy) return;
  sfx.init();
  sfx.blip();
  applyOriginalRegionAreaNames();
  clearAreaLegendaryStateOnTransit();
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

function triggerWildBattleFromOverworld(forcedSpecies = null, isLegendaryEncounter = false) {
  if (state.busy || state.screen !== 'OVERWORLD') return;
  state.busy = true;
  state.keysHeld = {};
  state.pendingLegendaryChallengeId = null;

  const mapObj = getCurrentMap();
  let chosenSpecies = forcedSpecies;
  if (!chosenSpecies) {
    const poolIds = mapObj.encounters;
    const randId = poolIds[Math.floor(Math.random() * poolIds.length)];
    chosenSpecies = MONSTER_SPECIES.find(m => m.id === randId) || MONSTER_SPECIES[0];
  }

  const isLeg = Boolean(isLegendaryEncounter || isLegendarySpeciesId(chosenSpecies.id));
  state.inLegendaryBattle = isLeg;

  sfx.stopBGM();
  sfx.encounterSiren();

  const overlay = document.getElementById('screenTransitionOverlay');
  const flash = document.getElementById('transitionFlash');
  const shutterTop = document.getElementById('shutterTop');
  const shutterBottom = document.getElementById('shutterBottom');
  const banner = document.getElementById('transitionCenterBanner');

  overlay.classList.remove('hidden');
  flash.classList.add('strobe-active');
  banner.querySelector('div').textContent = isLeg
    ? `LEGENDARY ${chosenSpecies.name} BATTLE!`
    : `WILD ${chosenSpecies.name} APPEARED!`;

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
    sfx.startBGM(isLeg && sfx.tracks && sfx.tracks.LEGENDARY_BATTLE ? 'LEGENDARY_BATTLE' : 'BATTLE');

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

  if (state.enemy && isLegendarySpeciesId(state.enemy.id) && state.enemy.hp <= 0) {
    const legId = state.enemy.id.toLowerCase();
    const wasCaught = state.dex && state.dex.some(p => p.id.toLowerCase() === legId);
    if (!wasCaught) {
      if (!Array.isArray(state.defeatedLegendariesInArea)) {
        state.defeatedLegendariesInArea = [];
      }
      if (!state.defeatedLegendariesInArea.includes(legId)) {
        state.defeatedLegendariesInArea.push(legId);
      }
    }
  }
  state.inLegendaryBattle = false;

  runShutterTransition('RETURNING TO AREA...', () => {
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

    checkMilestoneUnlocks();
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
    set() {},
    configurable: true
  });
} catch (e) {}