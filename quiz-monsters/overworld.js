/********************************************************************
 * overworld.js
 * Eased 1-Block Movement, Partner Follower Tracking, NPC & Pokémon Calls
 ********************************************************************/

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

  // Check dynamic obstacle walkable setting from Studio (OBSTACLE_DEFS)
  if (typeof OBSTACLE_DEFS !== 'undefined' && OBSTACLE_DEFS[tile] !== undefined) {
    if (!OBSTACLE_DEFS[tile].walkable) return true;
  } else {
    if (tile === 'T' || tile === 'W' || tile === 'H' || tile === 'R' || tile === 'I' || tile === 'C' || tile === 'K' || tile === 'L' || tile === 'S' || tile === 'V' || tile === 'U' || tile === 'A') {
      return true;
    }
  }

  const mapObj = getCurrentMap();
  if (mapObj.npcs && mapObj.npcs.some(npc => npc.x === col && npc.y === row)) return true;
  if (mapObj.pokeNpcs && mapObj.pokeNpcs.some(p => p.x === col && p.y === row)) return true;
  return false;
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

  // Place partner on an adjacent walkable non-exit tile behind or next to the player
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

  // 1. Check if facing an Overworld Pokémon NPC
  const pokeNpc = getFacingPokeNPC();
  if (pokeNpc) {
    const species = MONSTER_SPECIES.find(m => m.id === pokeNpc.speciesId);
    const displayName = species ? species.name : pokeNpc.name;
    sfx.pokemonCry(pokeNpc.speciesId);
    setOverworldDialogue(`${displayName}! ${displayName}~`, displayName, 'POKéMON CALL ♪');
    return;
  }

  // 2. Check if facing a Scholar / Professional NPC
  const npc = getFacingNPC();
  if (npc) {
    if (npc.healsParty || npc.name.includes('NURSE')) {
      sfx.heal();
      state.dex.forEach(m => { m.hp = m.maxHp; });
      syncAllUI();
      if (typeof saveGameProgress === 'function') saveGameProgress();
    } else {
      sfx.npcChime();
    }
    setOverworldDialogue(npc.fact, npc.name, npc.topic);
    return;
  }

  // 3. Check if facing the Follower Partner directly!
  const { tx, ty } = getFacingTileCoords();
  if (state.partnerWorld && state.partnerWorld.gridX === tx && state.partnerWorld.gridY === ty) {
    const partner = getActivePlayer();
    sfx.pokemonCry(partner.id);
    setOverworldDialogue(`${partner.name}! ${partner.name}~ (Your active partner is happily following you!)`, partner.name, 'ACTIVE PARTNER ♪');
    return;
  }

  // 4. Environment Tile Inspection
  const tile = getTileAt(tx, ty);
  if (tile === 'W') {
    sfx.blip();
    setOverworldDialogue("Crystal-clear water! Remember: roughly 71% of Earth's surface is covered by water!", "WATER'S EDGE", "OBSERVATION");
  } else if (tile === 'G') {
    sfx.blip();
    setOverworldDialogue("Tall wild grass! Step inside to encounter regional wild monsters!", "TALL GRASS", "HABITAT");
  } else if (tile === 'S') {
    sfx.blip();
    setOverworldDialogue("Geothermal steam geyser! Superheated groundwater rises through volcanic fissures to form mineral-rich hot springs!", "STEAM GEYSER", "GEOTHERMAL");
  } else if (tile === 'V') {
    sfx.blip();
    setOverworldDialogue("High-voltage resonant coil! Alternating magnetic fields induce currents across conductive metal windings!", "TESLA PYLON", "ELECTROMAGNETISM");
  } else if (tile === 'U') {
    sfx.blip();
    setOverworldDialogue("Bioluminescent spore toadstool! Fungi decompose organic matter and reproduce via microscopic airborne spores!", "SPORE TOADSTOOL", "MYCOLOGY");
  } else if (tile === 'A') {
    sfx.blip();
    setOverworldDialogue("Astral crystal obelisk! Birefringent crystals split incoming light beams into polarized rainbow spectra!", "ASTRAL OBELISK", "OPTICS & MYTH");
  } else if (tile === 'H' || tile === 'D') {
    const centerNpc = (getCurrentMap().npcs || []).find(n => n.name.includes('NURSE'));
    if (centerNpc) {
      sfx.heal();
      state.dex.forEach(m => { m.hp = m.maxHp; });
      syncAllUI();
      if (typeof saveGameProgress === 'function') saveGameProgress();
      setOverworldDialogue(centerNpc.fact, centerNpc.name, centerNpc.topic);
      return;
    }
    sfx.blip();
    setOverworldDialogue("Building entrance. Talk to nearby professionals and Pokémon to learn facts!", "BUILDING", "INSPECT");
  } else {
    sfx.blip();
    setOverworldDialogue("Face any Scholar, Professional, or Overworld Pokémon until the bubble appears above their head, then press SPACE or A!", "FIELD JOURNAL", "TIP");
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
    coordsText.textContent = `MAP: ${mapObj.id} • POS: (${gridX}, ${gridY}) • ${tile === 'G' ? '⚠️ IN TALL GRASS' : 'SAFE PATH'}`;
  }
  if (zoneName) zoneName.textContent = mapObj.name;
  if (zoneSub) zoneSub.textContent = mapObj.subtitle;

  const facingNpc = getFacingNPC();
  const facingPoke = getFacingPokeNPC();
  if (promptEl) {
    if (facingPoke) {
      promptEl.textContent = `PRESS [SPACE] OR [A] TO GREET ${facingPoke.name} ♪`;
      promptEl.classList.remove('hidden');
    } else if (facingNpc) {
      promptEl.textContent = `PRESS [SPACE] OR [A] TO TALK TO ${facingNpc.name}`;
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

  // Partner steps onto the tile the trainer just left
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

    if (exitCfg) {
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
        setOverworldDialogue(`Arrived at ${targetMapObj.name}! ${targetMapObj.subtitle}`, targetMapObj.name, 'REGION TRANSIT');
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

    // Check if player just completed the entire Pokédex!
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