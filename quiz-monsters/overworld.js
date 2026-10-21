/********************************************************************
 * overworld.js
 * Eased 1-Block Movement, Screen Shutter Transitions, NPC Interaction
 * & Active Partner Follower with Canvas Depth-Sorting
 ********************************************************************/

// Initialize partnerWorld state if not already present
if (typeof state !== 'undefined' && !state.partnerWorld) {
  state.partnerWorld = {
    gridX: 13,
    gridY: 9,
    startX: 13 * TILE_SIZE,
    startY: 9 * TILE_SIZE,
    targetX: 13 * TILE_SIZE,
    targetY: 9 * TILE_SIZE,
    pixelX: 13 * TILE_SIZE,
    pixelY: 9 * TILE_SIZE,
    hopOffsetY: 0,
    dir: 'down'
  };
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

  // Sync partner position on teleport
  if (state.partnerWorld) {
    state.partnerWorld.gridX = gx;
    state.partnerWorld.gridY = gy;
    state.partnerWorld.startX = gx * TILE_SIZE;
    state.partnerWorld.startY = gy * TILE_SIZE;
    state.partnerWorld.targetX = gx * TILE_SIZE;
    state.partnerWorld.targetY = gy * TILE_SIZE;
    state.partnerWorld.pixelX = gx * TILE_SIZE;
    state.partnerWorld.pixelY = gy * TILE_SIZE;
    state.partnerWorld.hopOffsetY = 0;
  }
}

function getCurrentMap() {
  return WORLD_MAPS[state.currentMapId];
}

function getTileAt(col, row) {
  const mapObj = getCurrentMap();
  if (row < 0 || row >= MAP_ROWS || col < 0 || col >= MAP_COLS) return 'T';
  return mapObj.rows[row].charAt(col) || 'T';
}

function isTileBlocked(col, row) {
  const tile = getTileAt(col, row);
  if (tile === 'T' || tile === 'W' || tile === 'H') return true;
  const npcs = getCurrentMap().npcs;
  if (npcs.some(npc => npc.x === col && npc.y === row)) return true;
  return false;
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
  const npcs = getCurrentMap().npcs;
  return npcs.find(npc => (npc.x === tx && npc.y === ty) || (Math.abs(npc.x - tx) <= 0 && Math.abs(npc.y - ty) <= 0)) || null;
}

function interactWithFacingNPC() {
  if (state.screen !== 'OVERWORLD' || state.busy || state.playerWorld.isStepping) return;
  const npc = getFacingNPC();
  if (npc) {
    sfx.npcChime();
    if (npc.healsParty || npc.name.includes('NURSE')) {
      state.dex.forEach(m => { m.hp = m.maxHp; });
      syncAllUI();
    }
    setOverworldDialogue(npc.fact, npc.name, npc.topic);
  } else {
    const { tx, ty } = getFacingTileCoords();
    const tile = getTileAt(tx, ty);
    sfx.blip();
    if (tile === 'W') {
      setOverworldDialogue("Crystal-clear water! Remember: roughly 71% of Earth's surface is covered by water!", "WATER'S EDGE", "OBSERVATION");
    } else if (tile === 'G') {
      setOverworldDialogue("Tall wild grass! Step inside to encounter regional wild monsters!", "TALL GRASS", "HABITAT");
    } else if (tile === 'H' || tile === 'D') {
      const centerNpc = getCurrentMap().npcs.find(n => n.name.includes('NURSE'));
      if (centerNpc) {
        sfx.npcChime();
        state.dex.forEach(m => { m.hp = m.maxHp; });
        syncAllUI();
        setOverworldDialogue(centerNpc.fact, centerNpc.name, centerNpc.topic);
        return;
      }
      setOverworldDialogue("The Research Center door is locked tight. Talk to nearby professionals to learn facts!", "RESEARCH HUB", "BUILDING");
    } else {
      setOverworldDialogue("Face any Doctor, Police Officer, or Ecologist until the [!] bubble appears above their head, then press SPACE or A!", "FIELD JOURNAL", "TIP");
    }
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
  if (promptEl) {
    if (facingNpc) {
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

  // Partner steps to where player just was
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
        updateOverworldHUD();
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

/********************************************************************
 * ACTIVE PARTNER FOLLOWER & CANVAS RENDERING
 ********************************************************************/
function drawFollowerPartner(ctx, camX, camY) {
  const partner = typeof getActivePlayer === 'function' ? getActivePlayer() : (state.dex && state.dex[state.activeDexIndex]);
  if (!partner) return;

  const liveSpecies = (typeof MONSTER_SPECIES !== 'undefined' ? MONSTER_SPECIES.find(m => m.id === partner.id) : null) || partner;
  const grid = liveSpecies.pixels || liveSpecies.grid || partner.pixels || partner.grid;
  const palette = liveSpecies.palette || partner.palette;
  if (!grid || !palette) return;

  const p = state.playerWorld;
  const pw = state.partnerWorld;

  if (p.isStepping) {
    const elapsed = performance.now() - p.stepStartTime;
    const t = Math.min(1, Math.max(0, elapsed / p.stepDurationMs));
    pw.pixelX = pw.startX + (pw.targetX - pw.startX) * t;
    pw.pixelY = pw.startY + (pw.targetY - pw.startY) * t;
    pw.hopOffsetY = -Math.sin(t * Math.PI) * 5;
  } else {
    pw.pixelX = pw.targetX;
    pw.pixelY = pw.targetY;
    pw.hopOffsetY = Math.sin(performance.now() / 220) * 1.5;
  }

  const screenX = Math.round(pw.pixelX - camX);
  const screenY = Math.round(pw.pixelY - camY + pw.hopOffsetY);

  // Soft ground shadow
  ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
  ctx.beginPath();
  ctx.ellipse(
    screenX + TILE_SIZE / 2,
    Math.round(pw.pixelY - camY) + TILE_SIZE - 3,
    TILE_SIZE * 0.32,
    TILE_SIZE * 0.14,
    0, 0, Math.PI * 2
  );
  ctx.fill();

  const scale = (TILE_SIZE * 0.8) / 16;
  const offsetX = screenX + (TILE_SIZE - 16 * scale) / 2;
  const offsetY = screenY + (TILE_SIZE - 16 * scale) - 2;
  const flipX = pw.dir === 'right';

  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (ch === '.' || ch === ' ' || !palette[ch]) continue;
      ctx.fillStyle = palette[ch];
      const drawCol = flipX ? (15 - c) : c;
      ctx.fillRect(
        Math.floor(offsetX + drawCol * scale),
        Math.floor(offsetY + r * scale),
        Math.ceil(scale),
        Math.ceil(scale)
      );
    }
  }
}

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

      if (x < -TILE_SIZE || x > canvas.width || y < -TILE_SIZE || y > canvas.height) continue;

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
        ctx.fillStyle = npc.hatColor || '#334155';
        ctx.fillRect(nx + 6, ny + 4, 20, 10);
        ctx.fillStyle = npc.shirtColor || '#94a3b8';
        ctx.fillRect(nx + 4, ny + 14, 24, 14);

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
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(Math.round(p.pixelX - camX) + 6, Math.round(p.pixelY - camY + p.hopOffsetY) + 4, 20, 24);
    }
  };

  const renderPartner = () => {
    if (pw) drawFollowerPartner(ctx, camX, camY);
  };

  if (partnerY <= playerY) {
    renderPartner();
    renderPlayer();
  } else {
    renderPlayer();
    renderPartner();
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
    sfx.startBGM('OVERWORLD');
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
    chosenSpecies = MONSTER_SPECIES.find(m => m.id === randId) || MONSTER_SPECIES[1];
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

    sfx.startBGM('OVERWORLD');
    syncAllUI();
    updateOverworldHUD();
    if (statusMessage) {
      setOverworldDialogue(statusMessage, 'BATTLE RESULT', 'EXPLORATION');
    }
    state.busy = false;
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