/********************************************************************
 * overworld.js
 * 8-Region Overworld Engine, Tiered +10 Dex Portal Unlocks,
 * Yellow Asterisk (*) on Completed Areas, Water/Flying Surf Filter,
 * Deep-Sea Freshwater Exclusion, Respawning Antarctica Ultra Beasts,
 * Chef + Nurse Party Healing & 60 FPS Optimized Render Loop
 * (Map grid constants in maps.js; Obstacle & Floor Item defs in obstacle.js)
 ********************************************************************/

const HUMAN_SKIN_PALETTE = [
  '#fde68a', '#fed7aa', '#f5cba7', '#e59866', '#ca8a5b', '#a16236', '#784212', '#5c3317'
];

const _mapThumbnailCache = {};
let _originalAreaNamesApplied = false;

function isAreaPokedexComplete(mapObj) {
  if (!mapObj || !state || !Array.isArray(state.dex)) return false;
  const caughtIds = new Set(state.dex.map(p => (p.id || '').toLowerCase()));
  const requiredIds = new Set();

  if (Array.isArray(mapObj.encounters)) {
    mapObj.encounters.forEach(id => {
      if (id) requiredIds.add(id.toLowerCase());
    });
  }
  if (Array.isArray(mapObj.npcs)) {
    mapObj.npcs.forEach(npc => {
      if (npc.isMonster || npc.monsterId) {
        const monId = getCanonicalLegendaryId(npc);
        if (monId) requiredIds.add(monId);
      }
    });
  }
  if (Array.isArray(mapObj.pokeNpcs)) {
    mapObj.pokeNpcs.forEach(p => {
      const monId = getCanonicalLegendaryId(p);
      if (monId) requiredIds.add(monId);
    });
  }

  if (requiredIds.size === 0) return false;
  for (const reqId of requiredIds) {
    if (!caughtIds.has(reqId)) return false;
  }
  return true;
}

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

function isSurfUnlocked() {
  return isRegionUnlocked('NORTH_AMERICA');
}

function getRegionOfMapId(mapId) {
  if (EAST_ASIA_MAP_IDS.has(mapId)) return 'EAST_ASIA';
  if (WEST_EUROPE_MAP_IDS.has(mapId)) return 'WEST_EUROPE';
  if (NORTH_AMERICA_MAP_IDS.has(mapId)) return 'NORTH_AMERICA';
  if (SOUTHERN_AFRICA_MAP_IDS.has(mapId)) return 'SOUTHERN_AFRICA';
  if (OCEANIA_MAP_IDS.has(mapId)) return 'OCEANIA';
  if (SOUTH_AMERICA_MAP_IDS.has(mapId)) return 'SOUTH_AMERICA';
  if (ANTARCTICA_MAP_IDS.has(mapId)) return 'ANTARCTICA';
  return 'HABITAT';
}

function injectSandPatchesIntoDesertyMaps() {
  if (typeof WORLD_MAPS === 'undefined') return;
  const desertyIds = ['DESERT', 'NORTHEAST', 'MOON', 'MONGOLIA', 'SPAIN', 'MEXICO', 'NAMIBIA', 'AUSTRALIA', 'CHILE'];
  desertyIds.forEach(mapKey => {
    const m = WORLD_MAPS[mapKey];
    if (!m || !Array.isArray(m.rows) || m._sandInjected) return;
    m._sandInjected = true;
    m.rows = m.rows.map((rowStr, rIdx) => {
      if (rIdx <= 1 || rIdx >= MAP_ROWS - 2) return rowStr;
      let out = '';
      for (let c = 0; c < rowStr.length; c++) {
        const ch = rowStr.charAt(c);
        if (ch === '.' && c >= 3 && c <= MAP_COLS - 4 && ((rIdx + c) % 4 === 0 || (rIdx >= 6 && rIdx <= 13 && (c === 5 || c === 22)))) {
          out += '~';
        } else {
          out += ch;
        }
      }
      return out;
    });
  });
}

function applyOriginalRegionAreaNames() {
  if (_originalAreaNamesApplied || typeof WORLD_MAPS === 'undefined') return;
  _originalAreaNamesApplied = true;
  Object.keys(OG_REGION_AREA_NAMES).forEach(areaKey => {
    if (WORLD_MAPS[areaKey]) {
      WORLD_MAPS[areaKey].name = OG_REGION_AREA_NAMES[areaKey];
    }
  });
  injectSandPatchesIntoDesertyMaps();
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

  if (npc.isUltraBeast || ULTRA_BEAST_IDS.has(rawId)) {
    if (Array.isArray(state.defeatedLegendariesInArea) && state.defeatedLegendariesInArea.includes(rawId)) {
      return false;
    }
    return true;
  }

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
      else if (ch === '~') color = '#fbbf24';
      else if (ch === 'M') color = '#5c4033';
      else if (ch === 'G') color = th.grassTip || th.grass || '#22c55e';
      else if (ch === 'W') color = '#0284c7';
      else if (ch === 'L') color = '#ef4444';
      else if (ch === 'I') color = '#7dd3fc';
      else if (ch === 'H' || ch === 'D' || ch === 'Y' || ch === 'X' || ch === 'u' || ch === 'b') color = '#f43f5e';
      else if (ch === 'J' || ch === 'O' || ch === 'n' || ch === 'q') color = '#f472b6';
      else if (ch === 'g' || ch === 'c' || ch === 'w' || ch === 'o') color = '#f8fafc';
      else if (ch === 'k' || ch === 'm' || ch === 'a' || ch === 't' || ch === 'y') color = '#b45309';
      else if (ch === 'T' || ch === 'C' || ch === 'j' || ch === 'l' || ch === 'p') color = th.treeTop || th.tree || '#14532d';
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
  const portalHubs = new Set(['CENTER', 'HONG_KONG', 'UK', 'CANADA', 'SOUTH_AFRICA', 'AUSTRALIA', 'ECUADOR', 'PARADISE_BAY']);
  if (!portalHubs.has(state.currentMapId)) return false;
  if (state.currentMapId === 'CENTER' && !isPortalUnlocked()) return false;
  return (col === 13 || col === 14) && (row === 9 || row === 10);
}

function drawPortalOnCanvas(ctx, animTick) {
  if (!state) return;
  const portalHubs = new Set(['CENTER', 'HONG_KONG', 'UK', 'CANADA', 'SOUTH_AFRICA', 'AUSTRALIA', 'ECUADOR', 'PARADISE_BAY']);
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
    state.unlockedMilestones = {
      map20: false, fly30: false, portal50: false, portal60: false,
      portal70: false, portal80: false, portal90: false, portal100: false, portal110: false
    };
  }

  const count = state.dex.length;

  if (count >= 20 && !state.unlockedMilestones.map20) {
    state.unlockedMilestones.map20 = true;
    showFeatureUnlockPopup(
      'GRAND REGION MAP UNLOCKED!',
      '20 POKEMON REGISTERED IN DEX',
      'You can now open the Grand Region Map from the Overworld HUD to inspect all 25 Chroma Archipelago habitats and track your location!'
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
      'NORTH AMERICA & SURF UNLOCKED!',
      '70 POKEMON REGISTERED IN DEX (+10 TIER)',
      'You unlocked the North America Portal AND the SURF ability! Walk directly onto any Water (W) tile in any region to ride your surfboard across rivers, lakes, and seas!'
    );
  } else if (count >= 80 && !state.unlockedMilestones.portal80) {
    state.unlockedMilestones.portal80 = true;
    showFeatureUnlockPopup(
      'SOUTHERN AFRICA PORTAL UNLOCKED!',
      '80 POKEMON REGISTERED IN DEX (+10 TIER)',
      'Your Dimensional Portal now links to Southern Africa! Explore South Africa, Lesotho, Eswatini, Mozambique, Zimbabwe, Zambia, Botswana, and Namibia!'
    );
  } else if (count >= 90 && !state.unlockedMilestones.portal90) {
    state.unlockedMilestones.portal90 = true;
    showFeatureUnlockPopup(
      'OCEANIA PORTAL UNLOCKED!',
      '90 POKEMON REGISTERED IN DEX (+10 TIER)',
      'Your Dimensional Portal now links to Oceania! Surf across the Pacific borders between Australia, New Zealand, Tuvalu, Samoa, Fiji, Tonga, Vanuatu, and the Solomon Islands!'
    );
  } else if (count >= 100 && !state.unlockedMilestones.portal100) {
    state.unlockedMilestones.portal100 = true;
    showFeatureUnlockPopup(
      'SOUTH AMERICA PORTAL UNLOCKED!',
      '100 POKEMON REGISTERED IN DEX (+10 TIER)',
      'Your Dimensional Portal now links to South America! Explore Ecuador, Peru, Bolivia, Paraguay, Chile, Argentina, and Uruguay!'
    );
  } else if (count >= 110 && !state.unlockedMilestones.portal110) {
    state.unlockedMilestones.portal110 = true;
    showFeatureUnlockPopup(
      'ANTARCTICA & ULTRA BEASTS UNLOCKED!',
      '110 POKEMON REGISTERED IN DEX (+10 TIER)',
      'Your Dimensional Portal now links to Paradise Bay in Antarctica! Challenge overworld Ultra Beasts that respawn every time you enter an area!'
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
  if (tile === 'W' && isSurfUnlocked()) {
    // Surfing unlocked: Water tiles are walkable unless occupied by an NPC
  } else if (tile === '~' || tile === 'M') {
    // Sand (~) and Swamp Mud (M) are always walkable encounter terrains
  } else if (typeof OBSTACLE_DEFS !== 'undefined' && OBSTACLE_DEFS[tile] !== undefined) {
    if (!OBSTACLE_DEFS[tile].walkable) return true;
  } else if (typeof BLOCKED_TILE_FALLBACK_SET !== 'undefined' && BLOCKED_TILE_FALLBACK_SET.has(tile)) {
    return true;
  }

  const mapObj = getCurrentMap();
  if (mapObj.npcs && mapObj.npcs.some(npc => isNPCActiveOnMap(npc) && npc.x === col && npc.y === row)) return true;
  if (mapObj.pokeNpcs && mapObj.pokeNpcs.some(p => isNPCActiveOnMap(p) && p.x === col && p.y === row)) return true;

  return false;
}

function getLocalizedStoneIdsForMap(mapObj) {
  if (!mapObj || !Array.isArray(mapObj.rows)) return ['moon_stone', 'sun_stone', 'shiny_stone', 'kings_rock', 'linking_cord'];
  const gridStr = mapObj.rows.join('');
  const pool = new Set(['linking_cord']);

  if (/[LCfy~7]/.test(gridStr) || /VOLCANO|DESERT|SPAIN|MEXICO|NAMIBIA|AUSTRALIA|VANUATU|CHILE/.test(mapObj.id)) {
    ['fire_stone', 'sun_stone', 'magmarizer', 'protector', 'auspicious_armor'].forEach(id => pool.add(id));
  }
  if (/[WKBqo134568]/.test(gridStr) || /BEACH|ABYSS|SUNKEN|PORTUGAL|BAHAMAS|MOZAMBIQUE|ZAMBIA|TUVALU|SAMOA|FIJI|TONGA|SOLOMON|ECUADOR|URUGUAY/.test(mapObj.id)) {
    ['water_stone', 'deep_sea_tooth', 'deep_sea_scale', 'prism_scale', 'kings_rock', 'scroll_of_waters'].forEach(id => pool.add(id));
  }
  if (/[I]/.test(gridStr) || /GLACIER|AURORA|CANADA|LESOTHO|NEW_ZEALAND|BOLIVIA|ARGENTINA|PARADISE_BAY|DRAKE|WEDDELL|ROSS|VOSTOK/.test(mapObj.id)) {
    ['ice_stone', 'dawn_stone', 'razor_claw'].forEach(id => pool.add(id));
  }
  if (/[VYXub]/.test(gridStr) || /FOUNDRY|CYBER|BELGIUM|GERMANY|USA|SOUTH_KOREA|MACAU/.test(mapObj.id)) {
    ['thunder_stone', 'metal_coat', 'up_grade', 'dubious_disc', 'electirizer', 'metal_alloy', 'gimmighoul_coin', 'leaders_crest'].forEach(id => pool.add(id));
  }
  if (/[TFJOmp2]/.test(gridStr) || /FOREST|KALOS|BRAMBLE|IRELAND|NETHERLANDS|BOTSWANA|ESWATINI|NEW_ZEALAND|PARAGUAY|TAIWAN|UK|FRANCE/.test(mapObj.id)) {
    ['leaf_stone', 'shiny_stone', 'oval_stone', 'whipped_dream', 'sachet', 'tart_apple', 'sweet_apple', 'syrupy_apple', 'strawberry_sweet', 'unremarkable_cup', 'peat_block'].forEach(id => pool.add(id));
  }
  if (/[RANQZr]/.test(gridStr) || /MOUNTAIN|SPIRE|SANCTUARY|MOON|CHINA|ZIMBABWE|SHADOW_ALLEY|PERU|HAITI|JAPAN/.test(mapObj.id)) {
    ['moon_stone', 'dusk_stone', 'dragon_scale', 'reaper_cloth', 'razor_fang', 'black_augurite', 'cracked_pot', 'malicious_armor'].forEach(id => pool.add(id));
  }

  return Array.from(pool);
}

function spawnFloorItemsForCurrentMap() {
  state.floorItems = [];
  const mapObj = getCurrentMap();
  if (!mapObj || typeof FLOOR_ITEM_TYPES === 'undefined') return;

  const numItems = 3 + Math.floor(Math.random() * 3);
  const preferredCoords = [];
  const fallbackCoords = [];
  const localStoneIds = getLocalizedStoneIdsForMap(mapObj);

  const isAdjacentToTerrainFeature = (x, y) => {
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    return dirs.some(([dx, dy]) => {
      const t = getTileAt(x + dx, y + dy);
      return t !== '.' && t !== 'P' && t !== 'E';
    });
  };

  for (let r = 2; r < MAP_ROWS - 2; r++) {
    for (let c = 2; c < MAP_COLS - 2; c++) {
      if ((c === 13 || c === 14) && (r === 9 || r === 10)) continue;
      const tile = getTileAt(c, r);
      if ((tile === '.' || tile === 'G' || tile === 'F' || tile === 'M' || tile === '~') && !isTileBlocked(c, r)) {
        if (state.playerWorld && state.playerWorld.gridX === c && state.playerWorld.gridY === r) continue;
        if (tile === 'G' || tile === 'F' || tile === 'M' || tile === '~' || isAdjacentToTerrainFeature(c, r)) {
          preferredCoords.push({ x: c, y: r });
        } else {
          fallbackCoords.push({ x: c, y: r });
        }
      }
    }
  }

  const candidatePool = preferredCoords.length >= numItems
    ? preferredCoords
    : preferredCoords.concat(fallbackCoords);

  const stonePool = FLOOR_ITEM_TYPES.filter(it => it.category === 'EVOITEM' && localStoneIds.includes(it.id));
  const berryPool = FLOOR_ITEM_TYPES.filter(it => it.category === 'BERRY');

  for (let i = 0; i < numItems && candidatePool.length > 0; i++) {
    const randIdx = Math.floor(Math.random() * candidatePool.length);
    const coord = candidatePool.splice(randIdx, 1)[0];
    const isStone = Math.random() < 0.48 && stonePool.length > 0;
    const pool = isStone ? stonePool : berryPool;
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
  } else if (item.category === 'EVOITEM') {
    const oldName = partner.name;
    const evolvedMsg = (typeof tryStoneEvolution === 'function') ? tryStoneEvolution(partner, item) : null;
    if (evolvedMsg) {
      state.floorItems = (state.floorItems || []).filter(it => !(it.x === item.x && it.y === item.y));
      setOverworldDialogue(`Used ${item.name} with ${oldName}! ${evolvedMsg}`, 'ITEM EVOLUTION!', item.name);
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
  updateOverworldHUD();
  if (typeof saveGameProgress === 'function') saveGameProgress();
}

function drawFloorItemsOnCanvas(ctx, animTick) {
  drawPortalOnCanvas(ctx, animTick);

  if (!Array.isArray(state.floorItems) || state.floorItems.length === 0) return;
  const bob = Math.floor(animTick / 350) % 2 === 0 ? 0 : -2;

  state.floorItems.forEach(item => {
    const dx = item.x * TILE_SIZE;
    const dy = item.y * TILE_SIZE + bob;
    const tileKey = item.tileKey || (item.category === 'EVOITEM' ? 'EVOITEM' : 'BERRY');
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
  } else if (regionMode === 'SOUTHERN_AFRICA') {
    matrix = SOUTHERN_AFRICA_MAP_GRID;
    colsCount = 3;
  } else if (regionMode === 'OCEANIA') {
    matrix = OCEANIA_MAP_GRID;
    colsCount = 3;
  } else if (regionMode === 'SOUTH_AMERICA') {
    matrix = SOUTH_AMERICA_MAP_GRID;
    colsCount = 3;
  } else if (regionMode === 'ANTARCTICA') {
    matrix = ANTARCTICA_MAP_GRID;
    colsCount = 3;
  }

  grid.className = `grid grid-cols-${colsCount} gap-2 bg-slate-900 p-2.5 sm:p-3 rounded-lg border-2 border-slate-950 min-w-[520px]`;

  matrix.forEach((rowKeys, rIdx) => {
    rowKeys.forEach((mapKey, cIdx) => {
      if (!mapKey) {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'bg-slate-950/60 border border-slate-800 rounded p-2 min-h-[104px] flex items-center justify-center text-[7px] text-slate-600';
        emptySlot.textContent = 'OCEAN / BORDER';
        grid.appendChild(emptySlot);
        return;
      }

      const mapObj = (typeof WORLD_MAPS !== 'undefined' && WORLD_MAPS[mapKey]) ? WORLD_MAPS[mapKey] : null;
      const fallbackMeta = FALLBACK_AREA_META[mapKey] || { name: mapKey.replace(/_/g, ' '), bg: '#334155' };
      const isCurrent = state.currentMapId === mapKey;
      const targetRegion = getRegionOfMapId(mapKey);
      const sameRegionAsPlayer = (currentRegion === targetRegion);
      const reqDexForTarget = getRequiredDexForRegion(targetRegion);
      const isLockedPortalRegion = !isRegionUnlocked(targetRegion);
      const allowFastTravelHere = Boolean(mapObj && canFly && !isCurrent && sameRegionAsPlayer && !isLockedPortalRegion);
      const allowPortalTransitHere = Boolean(mapObj && !sameRegionAsPlayer && !isLockedPortalRegion);

      const bgHex = mapKey === 'CENTER'
        ? '#d6b37c'
        : (mapObj?.theme?.groundA || fallbackMeta.bg);

      const areaTitle = OG_REGION_AREA_NAMES[mapKey] || (mapObj ? mapObj.name.replace(/\s*\([^)]*\)\s*/g, '') : fallbackMeta.name);
      const areaComplete = isAreaPokedexComplete(mapObj);
      const starHtml = areaComplete ? ' <span class="text-amber-300 font-bold drop-shadow-[1px_1px_0_#000]">*</span>' : '';
      const thumbUrl = mapObj ? renderMapThumbnailDataURL(mapObj) : '';
      const isHubPortal = (
        mapKey === 'CENTER' || mapKey === 'HONG_KONG' ||
        mapKey === 'UK' || mapKey === 'CANADA' ||
        mapKey === 'SOUTH_AFRICA' || mapKey === 'AUSTRALIA' ||
        mapKey === 'ECUADOR' || mapKey === 'PARADISE_BAY'
      );

      const card = document.createElement('div');
      card.className = `pixel-btn p-1.5 sm:p-2 flex flex-col justify-between gap-1 text-left min-h-[108px] ${
        isCurrent ? 'ring-2 ring-amber-400 border-amber-400 scale-[1.02]' : ''
      } ${isLockedPortalRegion ? 'opacity-55 grayscale' : ''}`;
      card.style.backgroundColor = bgHex;
      card.style.color = '#ffffff';

      card.innerHTML = `
        <div class="flex items-start justify-between gap-1">
          <span class="text-[7px] sm:text-[8px] font-bold leading-tight drop-shadow-[1px_1px_0_#000] truncate">${areaTitle}${starHtml}</span>
          ${isCurrent ? '<span class="text-[6px] bg-amber-400 text-slate-950 px-1 py-0.5 rounded font-bold shrink-0">YOU</span>' : ''}
        </div>
        <div class="w-full h-11 sm:h-12 rounded border border-slate-950 overflow-hidden bg-slate-950 my-0.5 shadow-inner relative flex items-center justify-center">
          ${thumbUrl
            ? `<img src="${thumbUrl}" alt="${areaTitle}" class="w-full h-full object-cover" style="image-rendering: pixelated;" />`
            : `<span class="text-[6px] text-slate-400">${mapKey.replace(/_/g, ' ')}</span>`
          }
          ${isHubPortal && !isLockedPortalRegion ? '<span class="absolute bottom-0.5 right-0.5 text-[6px] bg-purple-700 text-white px-1 rounded border border-white">PORTAL</span>' : ''}
          ${mapKey === 'NORTH_KOREA' ? '<span class="absolute top-0.5 left-0.5 text-[6px] bg-red-800 text-white px-1 rounded border border-white">FLY ONLY</span>' : ''}
          ${OCEANIA_MAP_IDS.has(mapKey) ? '<span class="absolute top-0.5 left-0.5 text-[6px] bg-sky-700 text-white px-1 rounded border border-white">SWIM EXITS</span>' : ''}
          ${ANTARCTICA_MAP_IDS.has(mapKey) ? '<span class="absolute top-0.5 left-0.5 text-[6px] bg-indigo-700 text-white px-1 rounded border border-white">ULTRA BEAST</span>' : ''}
        </div>
        <div class="flex items-center justify-between gap-1 mt-auto">
          <span class="text-[6px] text-slate-200 drop-shadow-[1px_1px_0_#000]">${
            regionMode === 'HABITAT' ? `${OG_REGION_FULL_NAME} (${cIdx - 2}, ${2 - rIdx})` : regionMode.replace('_', ' ')
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
          if (isLockedPortalRegion || !mapObj) {
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
  if (mapModal && !document.getElementById('tabAntarcticaMapBtn')) {
    mapModal.remove();
    mapModal = null;
  }

  if (!mapModal) {
    mapModal = document.createElement('div');
    mapModal.id = 'worldMapModal';
    mapModal.className = 'fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 hidden items-center justify-center p-2 sm:p-4';
    mapModal.innerHTML = `
      <div class="w-full max-w-4xl retro-box p-3 sm:p-5 flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
        <div class="flex flex-wrap items-center justify-between border-b-2 border-slate-300 pb-2 gap-2">
          <div>
            <h2 class="text-xs sm:text-sm font-bold text-slate-900">GRAND REGION MAP (8 WORLD REGIONS)</h2>
            <p id="mapModalStatusSubtitle" class="text-[8px] sm:text-[9px] text-slate-600 mt-0.5"></p>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <button id="tabHabitatMapBtn" type="button" class="pixel-btn bg-indigo-600 text-white text-[7px] sm:text-[8px] px-2 py-1 font-bold">${OG_REGION_FULL_NAME} (25)</button>
            <button id="tabEastAsiaMapBtn" type="button" class="pixel-btn bg-rose-700 text-white text-[7px] sm:text-[8px] px-2 py-1 font-bold">EAST ASIA (8)</button>
            <button id="tabWestEuropeMapBtn" type="button" class="pixel-btn bg-emerald-700 text-white text-[7px] sm:text-[8px] px-2 py-1 font-bold">WEST EUROPE (8)</button>
            <button id="tabNorthAmericaMapBtn" type="button" class="pixel-btn bg-sky-700 text-white text-[7px] sm:text-[8px] px-2 py-1 font-bold">NORTH AMERICA (8)</button>
            <button id="tabSouthernAfricaMapBtn" type="button" class="pixel-btn bg-amber-700 text-white text-[7px] sm:text-[8px] px-2 py-1 font-bold">S. AFRICA (8)</button>
            <button id="tabOceaniaMapBtn" type="button" class="pixel-btn bg-cyan-700 text-white text-[7px] sm:text-[8px] px-2 py-1 font-bold">OCEANIA (8)</button>
            <button id="tabSouthAmericaMapBtn" type="button" class="pixel-btn bg-teal-700 text-white text-[7px] sm:text-[8px] px-2 py-1 font-bold">S. AMERICA (7)</button>
            <button id="tabAntarcticaMapBtn" type="button" class="pixel-btn bg-slate-700 text-sky-200 text-[7px] sm:text-[8px] px-2 py-1 font-bold">ANTARCTICA (5)</button>
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
    subtitleEl.textContent = `${canFly ? 'FLY: OPEN' : `FLY (${state.dex.length}/30)`} | E.ASIA: ${
      isRegionUnlocked('EAST_ASIA') ? 'OPEN' : `${state.dex.length}/50`
    } | W.EUR: ${
      isRegionUnlocked('WEST_EUROPE') ? 'OPEN' : `${state.dex.length}/60`
    } | N.AM+SURF: ${
      isRegionUnlocked('NORTH_AMERICA') ? 'OPEN' : `${state.dex.length}/70`
    } | S.AFR: ${
      isRegionUnlocked('SOUTHERN_AFRICA') ? 'OPEN' : `${state.dex.length}/80`
    } | OCEAN: ${
      isRegionUnlocked('OCEANIA') ? 'OPEN' : `${state.dex.length}/90`
    } | S.AM: ${
      isRegionUnlocked('SOUTH_AMERICA') ? 'OPEN' : `${state.dex.length}/100`
    } | ANTARCTICA: ${
      isRegionUnlocked('ANTARCTICA') ? 'OPEN' : `${state.dex.length}/110`
    }`;
  }

  const tabHab  = document.getElementById('tabHabitatMapBtn');
  const tabAsia = document.getElementById('tabEastAsiaMapBtn');
  const tabEuro = document.getElementById('tabWestEuropeMapBtn');
  const tabAmer = document.getElementById('tabNorthAmericaMapBtn');
  const tabAfri = document.getElementById('tabSouthernAfricaMapBtn');
  const tabOcea = document.getElementById('tabOceaniaMapBtn');
  const tabSAm  = document.getElementById('tabSouthAmericaMapBtn');
  const tabAnt  = document.getElementById('tabAntarcticaMapBtn');
  const startTab = getRegionOfMapId(state.currentMapId);

  if (tabHab)  tabHab.onclick  = () => { sfx.blip(); renderGrandMapGridRegion('HABITAT', mapModal); };
  if (tabAsia) tabAsia.onclick = () => { sfx.blip(); renderGrandMapGridRegion('EAST_ASIA', mapModal); };
  if (tabEuro) tabEuro.onclick = () => { sfx.blip(); renderGrandMapGridRegion('WEST_EUROPE', mapModal); };
  if (tabAmer) tabAmer.onclick = () => { sfx.blip(); renderGrandMapGridRegion('NORTH_AMERICA', mapModal); };
  if (tabAfri) tabAfri.onclick = () => { sfx.blip(); renderGrandMapGridRegion('SOUTHERN_AFRICA', mapModal); };
  if (tabOcea) tabOcea.onclick = () => { sfx.blip(); renderGrandMapGridRegion('OCEANIA', mapModal); };
  if (tabSAm)  tabSAm.onclick  = () => { sfx.blip(); renderGrandMapGridRegion('SOUTH_AMERICA', mapModal); };
  if (tabAnt)  tabAnt.onclick  = () => { sfx.blip(); renderGrandMapGridRegion('ANTARCTICA', mapModal); };

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
    const isLeg = Boolean(pokeNpc.isLegendary || pokeNpc.isUltraBeast || isLegendarySpeciesId(rawPokeId));
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
    const isLeg = Boolean(npc.isLegendary || npc.isUltraBeast || isLegendarySpeciesId(rawMonId));
    const upperName = (npc.name || '').toUpperCase();
    const upperTopic = (npc.topic || '').toUpperCase();

    const isChef = upperName.includes('CHEF') || upperTopic.includes('CHEF') || (npc.id || '').startsWith('chef_');
    if (npc.healsParty || upperName.includes('NURSE') || isChef) {
      state.pendingLegendaryChallengeId = null;
      if (typeof sfx.playHealWithBgmPause === 'function') sfx.playHealWithBgmPause();
      else sfx.heal();
      state.dex.forEach(m => { m.hp = m.maxHp; });
      syncAllUI();
      if (typeof saveGameProgress === 'function') saveGameProgress();
      const healSuffix = isChef ? ' [Chef served a fresh meal and restored your entire Party to full HP!]' : '';
      setOverworldDialogue((npc.fact || '') + healSuffix, npc.name, npc.topic);
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

  const factEntry = (typeof getObstacleFact === 'function')
    ? getObstacleFact(tile)
    : (typeof OBSTACLE_FACTS_MAP !== 'undefined' ? OBSTACLE_FACTS_MAP[tile] : null);

  if (factEntry) {
    const [text, defaultTitle, topic] = factEntry;
    setOverworldDialogue(text, obsDef?.name || defaultTitle, topic);
  } else if (tile === 'H' || tile === 'D') {
    setOverworldDialogue("Professor's words echoed: \"Walking into someone's house without permission is known as trespassing and it is illegal!\"", "LOCKED HOUSE", "LAW & CIVICS");
  } else {
    setOverworldDialogue("Face any Specialist, Chef, Alien, Overworld Pokemon, Obstacle, or Floor Item (Berries & Stones) and press SPACE or A!", "FIELD JOURNAL", "TIP");
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

  const areaComplete = isAreaPokedexComplete(mapObj);
  const starHtml = areaComplete ? ' <span class="text-amber-400 font-bold drop-shadow-[1px_1px_0_#000]">*</span>' : '';

  if (coordsText) {
    const itemsLeft = Array.isArray(state.floorItems) ? state.floorItems.length : 0;
    const isWildTile = (tile === 'G' || tile === 'M' || tile === '~');
    const terrainLabel = tile === 'W' ? 'SURFING ON WATER' : (isWildTile ? 'IN WILD HABITAT' : 'SAFE PATH');
    coordsText.innerHTML = `AREA: ${mapObj.name}${starHtml} - POS: (${gridX}, ${gridY}) - ITEMS: ${itemsLeft} - ${terrainLabel}`;
  }
  if (zoneName) {
    zoneName.innerHTML = `${mapObj.name}${starHtml}`;
  }
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
      const isLeg = Boolean(facingPoke.isLegendary || facingPoke.isUltraBeast || isLegendarySpeciesId(rawPokeId));
      promptEl.textContent = isLeg && state.pendingLegendaryChallengeId === rawPokeId
        ? `PRESS [SPACE] OR [A] AGAIN TO BATTLE ${facingPoke.name}!`
        : `PRESS [SPACE] OR [A] TO GREET ${facingPoke.name}`;
      promptEl.classList.remove('hidden');
    } else if (facingNpc) {
      const monId = getCanonicalLegendaryId(facingNpc);
      const isLeg = Boolean(facingNpc.isLegendary || facingNpc.isUltraBeast || isLegendarySpeciesId(monId));
      if (isLeg) {
        promptEl.textContent = state.pendingLegendaryChallengeId === monId
          ? `PRESS [SPACE] OR [A] AGAIN TO START BATTLE!`
          : `PRESS [SPACE] OR [A] TO SPEAK TO ${facingNpc.name}`;
      } else {
        promptEl.textContent = `PRESS [SPACE] OR [A] TO TALK TO ${facingNpc.name}`;
      }
      promptEl.classList.remove('hidden');
    } else if (facingObs && !(facingTile === 'W' && isSurfUnlocked())) {
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
  if (isRegionUnlocked('SOUTHERN_AFRICA')) hubs.push('SOUTH_AFRICA');
  if (isRegionUnlocked('OCEANIA')) hubs.push('AUSTRALIA');
  if (isRegionUnlocked('SOUTH_AMERICA')) hubs.push('ECUADOR');
  if (isRegionUnlocked('ANTARCTICA')) hubs.push('PARADISE_BAY');
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
        setOverworldDialogue(`Entered ${targetMapObj.name}! Localized Berries, Floor items have refreshed!`, targetMapObj.name, 'AREA TRANSIT');
        state.busy = false;
      });
      return;
    }
  }

  if (tile === 'G' || tile === 'M' || tile === '~') {
    sfx.stepGrass();
    p.stepsSinceBattle++;
    if (Math.random() < 0.26 || p.stepsSinceBattle >= 5) {
      p.stepsSinceBattle = 0;
      triggerWildBattleFromOverworld();
    }
  } else if (tile === 'W' && isSurfUnlocked()) {
    sfx.stepGrass();
    p.stepsSinceBattle++;
    if (Math.random() < 0.22 || p.stepsSinceBattle >= 6) {
      p.stepsSinceBattle = 0;
      triggerWildBattleFromOverworld();
    }
  }
}

function overworldRenderLoop(now) {
  if (state.screen === 'OVERWORLD') {
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
    if (typeof syncCanvasAspect === 'function') syncCanvasAspect();
    sfx.startBGM(state.currentMapId);
    updateOverworldHUD();
  });
}

const BABY_PRE_EVOLUTION_IDS = new Set([
  'pichu', 'cleffa', 'igglybuff', 'togepi', 'tyrogue', 'smoochum',
  'elekid', 'magby', 'azurill', 'wynaut', 'budew', 'chingling',
  'bonsly', 'mime_jr', 'happiny', 'munchlax', 'riolu', 'mantyke', 'toxel'
]);

function isEvolvedSpeciesId(speciesId) {
  if (typeof EVOLUTION_CHAINS === 'undefined' || !speciesId) return false;
  const clean = speciesId.toLowerCase();
  return Object.entries(EVOLUTION_CHAINS).some(([fromId, chain]) => {
    if (BABY_PRE_EVOLUTION_IDS.has(fromId.toLowerCase())) return false;
    const list = Array.isArray(chain) ? chain : [chain];
    return list.some(c => {
      if (Array.isArray(c.to)) return c.to.some(t => t.toLowerCase() === clean);
      return c.to && c.to.toLowerCase() === clean;
    });
  });
}

function pickWildEncounterSpeciesForCurrentTile() {
  const mapObj = getCurrentMap();
  const p = state.playerWorld;
  const standingTile = getTileAt(p.gridX, p.gridY);
  const isDeepSeaMap = DEEP_SEA_MAP_IDS.has(state.currentMapId);

  let candidateSpecies = (mapObj.encounters || [])
    .map(id => MONSTER_SPECIES.find(m => m.id === id))
    .filter(m => m && !isEvolvedSpeciesId(m.id) && !isLegendarySpeciesId(m.id));

  if (isDeepSeaMap) {
    candidateSpecies = candidateSpecies.filter(m => !FRESHWATER_ONLY_FISH_IDS.has(m.id));
  }

  if (standingTile === 'W') {
    let waterOrFlying = candidateSpecies.filter(m => m.type === 'WATER' || m.type === 'FLYING');
    if (waterOrFlying.length === 0) {
      waterOrFlying = MONSTER_SPECIES.filter(m =>
        (m.type === 'WATER' || m.type === 'FLYING') &&
        !isEvolvedSpeciesId(m.id) &&
        !isLegendarySpeciesId(m.id) &&
        (!isDeepSeaMap || !FRESHWATER_ONLY_FISH_IDS.has(m.id))
      );
    }
    candidateSpecies = waterOrFlying;
  }

  if (candidateSpecies.length === 0) {
    return MONSTER_SPECIES[0];
  }
  return candidateSpecies[Math.floor(Math.random() * candidateSpecies.length)];
}

function triggerWildBattleFromOverworld(forcedSpecies = null, isLegendaryEncounter = false) {
  if (state.busy || state.screen !== 'OVERWORLD') return;
  state.busy = true;
  state.keysHeld = {};
  state.pendingLegendaryChallengeId = null;

  let chosenSpecies = forcedSpecies;
  if (!chosenSpecies) {
    chosenSpecies = pickWildEncounterSpeciesForCurrentTile();
  }

  const isUB = ULTRA_BEAST_IDS.has((chosenSpecies.id || '').toLowerCase());
  const isLeg = Boolean(isLegendaryEncounter || isUB || isLegendarySpeciesId(chosenSpecies.id));
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
  banner.querySelector('div').textContent = isUB
    ? `ULTRA BEAST ${chosenSpecies.name} APPEARED!`
    : (isLeg ? `LEGENDARY ${chosenSpecies.name} BATTLE!` : `WILD ${chosenSpecies.name} APPEARED!`);

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

    const reg = getRegionOfMapId(state.currentMapId);
    const regionalBattleTrack = isLeg
      ? 'LEGENDARY_BATTLE'
      : (reg === 'HABITAT' ? 'BATTLE' : `BATTLE_${reg}`);
    sfx.startBGM(sfx.tracks && sfx.tracks[regionalBattleTrack] ? regionalBattleTrack : 'BATTLE');

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

  if (state.enemy) {
    const legId = state.enemy.id.toLowerCase();
    const isUB = ULTRA_BEAST_IDS.has(legId);
    const isLeg = isLegendarySpeciesId(legId);

    if (isUB || (isLeg && state.enemy.hp <= 0)) {
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
    if (typeof syncCanvasAspect === 'function') syncCanvasAspect();

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