/********************************************************************
 * characters.js
 * Character Sprite Bitmaps (Trainer & NPCs) & Overworld Canvas
 * Rendering Engine (Obstacle definitions extracted to obstacle.js)
 ********************************************************************/

const CHAR_BITMAPS = {
  TRAINER_DOWN: [
    "....rrrrrrrr....",
    "...rrrrrrrrrr...",
    "...rrwwwwwwrr...",
    "...bbbbbbbbbb...",
    "...ssssssssss...",
    "...ssbbssbbss...",
    "...ssssssssss...",
    "....ssssssss....",
    "...jjjjyyjjjj...",
    "..jjjjjyyjjjjj..",
    "..jjjjjyyjjjjj..",
    "...jjjjyyjjjj...",
    "....pppppppp....",
    "....ppp..ppp....",
    "....bbb..bbb....",
    "................"
  ],
  TRAINER_UP: [
    "....rrrrrrrr....",
    "...rrrrrrrrrr...",
    "...rrrrrrrrrr...",
    "...bbbbbbbbbb...",
    "...bbbbbbbbbb...",
    "...ssssssssss...",
    "....ssssssss....",
    "...jjjjjjjjjj...",
    "..jjjjjjjjjjjj..",
    "..jjjjjjjjjjjj..",
    "...jjjjjjjjjj...",
    "....pppppppp....",
    "....ppp..ppp....",
    "....bbb..bbb....",
    "................",
    "................"
  ],
  TRAINER_LEFT: [
    "....rrrrrrrr....",
    "..rrrrrrrrrrr...",
    "..wwwwrrrrrrr...",
    "...bbbbbbbbbb...",
    "...ssssssssss...",
    "...sbbsssssss...",
    "...ssssssssss...",
    "....ssssssss....",
    "....jjjjjjjj....",
    "...jjjjyyjjjj...",
    "...jjjjyyjjjj...",
    "....jjjjjjjj....",
    "....pppppppp....",
    "....ppp..ppp....",
    "....bbb..bbb....",
    "................"
  ],
  NPC: [
    "....hhhhhhhh....",
    "...hhhhhhhhhh...",
    "...hhhhhhhhhh...",
    "...bbbbbbbbbb...",
    "...ssssssssss...",
    "...ssbbssbbss...",
    "...ssssssssss...",
    "....ssssssss....",
    "...cccccccccc...",
    "..cccccccccccc..",
    "..cccccccccccc..",
    "...cccccccccc...",
    "....bbbbbbbb....",
    "....bbb..bbb....",
    "....bbb..bbb....",
    "................"
  ]
};

function drawBitmap16(ctx, grid, palette, dx, dy, size = TILE_SIZE, flipX = false) {
  const scale = size / 16;
  for (let r = 0; r < 16; r++) {
    const row = grid[r];
    if (!row) continue;
    for (let c = 0; c < 16; c++) {
      const ch = row.charAt(c);
      if (ch === '.' || !palette[ch]) continue;
      ctx.fillStyle = palette[ch];
      const col = flipX ? (15 - c) : c;
      ctx.fillRect(
        Math.floor(dx + col * scale),
        Math.floor(dy + r * scale),
        Math.ceil(scale),
        Math.ceil(scale)
      );
    }
  }
}

function isObstacleCustomModified(tileKey) {
  if (typeof OBSTACLE_DEFS === 'undefined' || typeof DEFAULT_OBSTACLE_DEFS === 'undefined') return false;
  if (!OBSTACLE_DEFS[tileKey] || !DEFAULT_OBSTACLE_DEFS[tileKey]) return false;
  return JSON.stringify(OBSTACLE_DEFS[tileKey].palette) !== JSON.stringify(DEFAULT_OBSTACLE_DEFS[tileKey].palette);
}

function drawOverworldTile(ctx, tile, tx, ty, c, r, theme, animTick) {
  ctx.fillStyle = (c + r) % 2 === 0 ? theme.groundA : theme.groundB;
  ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);

  if (typeof OBSTACLE_DEFS === 'undefined') return;
  const def = OBSTACLE_DEFS[tile];
  if (!def || !def.grid) return;

  const customPal = isObstacleCustomModified(tile);
  const pal = { ...def.palette };

  if (!customPal) {
    if (tile === 'T') {
      pal.t = theme.tree || pal.t;
      pal.l = theme.treeTop || pal.l;
    } else if (tile === 'R') {
      pal.p = theme.rock || pal.p;
      pal.l = theme.rockLight || pal.l;
      pal.d = theme.rockDark || pal.d;
    } else if (tile === 'G') {
      pal.p = theme.grass || pal.p;
      pal.l = theme.grassTip || pal.l;
    } else if (tile === 'P' || tile === 'E' || tile === 'D') {
      if (tile === 'P' || tile === 'E') pal.p = theme.path || pal.p;
      if (tile === 'D') pal.t = theme.path || pal.t;
    }
  }

  const animatedTile = (
    tile === 'W' || tile === 'L' || tile === 'M' || tile === 'F' ||
    tile === 'S' || tile === 'V' || tile === 'Y' || tile === 'w'
  );
  const flipTile = animatedTile && ((animTick + c + r) % 2 === 1);
  drawBitmap16(ctx, def.grid, pal, tx, ty, TILE_SIZE, flipTile);
}

function drawInteractionBubble(ctx, nx, ny, isFacing, dist, animTick, symbol = '!') {
  if (isFacing) {
    const bounceY = animTick % 2 === 0 ? -12 : -15;
    ctx.fillStyle = '#fde047';
    ctx.fillRect(nx + 8, ny + bounceY, 16, 12);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.strokeRect(nx + 8, ny + bounceY, 16, 12);
    ctx.fillStyle = '#0f172a';
    if (symbol === 'NOTE') {
      ctx.fillRect(nx + 14, ny + bounceY + 3, 5, 2);
      ctx.fillRect(nx + 14, ny + bounceY + 3, 2, 6);
      ctx.fillRect(nx + 12, ny + bounceY + 7, 3, 3);
    } else {
      ctx.fillRect(nx + 15, ny + bounceY + 2, 2, 5);
      ctx.fillRect(nx + 15, ny + bounceY + 8, 2, 2);
    }
  } else if (dist <= 3) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(nx + 10, ny - 8, 12, 8);
    ctx.fillStyle = symbol === 'NOTE' ? '#f472b6' : '#38bdf8';
    ctx.fillRect(nx + 15, ny - 6, 2, 4);
  }
}

function drawNPCSprite(ctx, npc, playerWorld, isFacingThisNpc, animTick) {
  const nx = npc.x * TILE_SIZE;
  const ny = npc.y * TILE_SIZE;

  ctx.fillStyle = 'rgba(0,0,0,0.32)';
  ctx.fillRect(nx + 6, ny + 26, 20, 4);

  const skinHex = (typeof getNPCSkinColor === 'function') ? getNPCSkinColor(npc) : (npc.skinColor || '#fed7aa');

  const palette = {
    h: npc.hatColor || '#1e3a8a',
    c: npc.shirtColor || '#60a5fa',
    s: skinHex,
    b: '#0f172a'
  };
  drawBitmap16(ctx, CHAR_BITMAPS.NPC, palette, nx, ny, TILE_SIZE, false);

  const dist = Math.abs(npc.x - playerWorld.gridX) + Math.abs(npc.y - playerWorld.gridY);
  drawInteractionBubble(ctx, nx, ny, isFacingThisNpc, dist, animTick, '!');
}

function drawOverworldPokemonNPC(ctx, pNpc, playerWorld, isFacingThisPoke, animTick) {
  const monKey = pNpc.speciesId || pNpc.monsterId || pNpc.id;
  const art = (typeof MONSTER_PIXELS !== 'undefined' && MONSTER_PIXELS[monKey])
    ? MONSTER_PIXELS[monKey]
    : (typeof DEFAULT_MONSTER_PIXELS !== 'undefined' ? DEFAULT_MONSTER_PIXELS[monKey] : null);
  if (!art || !art.grid) return;

  const nx = pNpc.x * TILE_SIZE;
  const bobY = (animTick + pNpc.x) % 2 === 0 ? 0 : -2;
  const ny = pNpc.y * TILE_SIZE + bobY;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.32)';
  ctx.fillRect(nx + 6, pNpc.y * TILE_SIZE + 26, 20, 4);

  drawBitmap16(ctx, art.grid, art.palette, nx, ny, TILE_SIZE, false);

  const dist = Math.abs(pNpc.x - playerWorld.gridX) + Math.abs(pNpc.y - playerWorld.gridY);
  drawInteractionBubble(ctx, nx, pNpc.y * TILE_SIZE, isFacingThisPoke, dist, animTick, 'NOTE');
}

function drawPlayerTrainerSprite(ctx, p, theme, standingTile) {
  const px = Math.round(p.pixelX);
  const py = Math.round(p.pixelY + p.hopOffsetY);
  const shadowY = Math.round(p.pixelY);

  ctx.fillStyle = 'rgba(0,0,0,0.38)';
  ctx.fillRect(px + 6, shadowY + 26, 20, 4);

  const palette = {
    r: '#dc2626',
    w: '#ffffff',
    s: '#fed7aa',
    b: '#0f172a',
    j: '#2563eb',
    y: '#facc15',
    p: '#1e3a8a'
  };

  let grid = CHAR_BITMAPS.TRAINER_DOWN;
  let flipX = false;
  if (p.dir === 'up') grid = CHAR_BITMAPS.TRAINER_UP;
  else if (p.dir === 'left') grid = CHAR_BITMAPS.TRAINER_LEFT;
  else if (p.dir === 'right') { grid = CHAR_BITMAPS.TRAINER_LEFT; flipX = true; }

  drawBitmap16(ctx, grid, palette, px, py, TILE_SIZE, flipX);

  if (standingTile === 'G') {
    ctx.fillStyle = theme.grassTip;
    ctx.fillRect(px + 4, shadowY + 22, 6, 6);
    ctx.fillRect(px + 22, shadowY + 22, 6, 6);
  }
}

function drawFollowerPartner(ctx, theme) {
  const partner = (typeof getActivePlayer === 'function')
    ? getActivePlayer()
    : (state.dex && state.dex[state.activeDexIndex]);
  if (!partner || !state.partnerWorld) return;

  const monId = partner.id || 'bulbasaur';
  const art = (typeof MONSTER_PIXELS !== 'undefined' && MONSTER_PIXELS[monId])
    ? MONSTER_PIXELS[monId]
    : (typeof DEFAULT_MONSTER_PIXELS !== 'undefined' ? DEFAULT_MONSTER_PIXELS[monId] : null);
  if (!art || !art.grid || !art.palette) return;

  const p = state.playerWorld;
  const pw = state.partnerWorld;

  if (p.isStepping) {
    const elapsed = performance.now() - p.stepStartTime;
    const rawT = Math.min(1, Math.max(0, elapsed / p.stepDurationMs));
    const easedT = typeof easeInOutCubic === 'function' ? easeInOutCubic(rawT) : rawT;
    pw.pixelX = pw.startX + (pw.targetX - pw.startX) * easedT;
    pw.pixelY = pw.startY + (pw.targetY - pw.startY) * easedT;
    pw.hopOffsetY = -Math.sin(rawT * Math.PI) * 4;
  } else {
    pw.pixelX = pw.targetX;
    pw.pixelY = pw.targetY;
    pw.hopOffsetY = Math.sin(performance.now() / 200) * 1.5;
  }

  const px = Math.round(pw.pixelX);
  const py = Math.round(pw.pixelY + pw.hopOffsetY);
  const shadowY = Math.round(pw.pixelY);

  ctx.fillStyle = 'rgba(15, 23, 42, 0.34)';
  ctx.fillRect(px + 6, shadowY + 26, 20, 4);

  drawBitmap16(ctx, art.grid, art.palette, px, py, TILE_SIZE, pw.dir === 'right');

  const partnerTile = getTileAt(pw.gridX, pw.gridY);
  if (partnerTile === 'G') {
    ctx.fillStyle = theme.grassTip;
    ctx.fillRect(px + 5, shadowY + 23, 5, 5);
    ctx.fillRect(px + 22, shadowY + 23, 5, 5);
  }
}

function drawOverworldCanvas() {
  const canvas = document.getElementById('overworldCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const viewW = canvas.width;
  const viewH = canvas.height;

  const p = state.playerWorld;
  const mapObj = getCurrentMap();
  const theme = mapObj.theme;

  const worldW = MAP_COLS * TILE_SIZE;
  const worldH = MAP_ROWS * TILE_SIZE;

  const camX = Math.max(0, Math.min(worldW - viewW, p.pixelX + TILE_SIZE / 2 - viewW / 2));
  const camY = Math.max(0, Math.min(worldH - viewH, p.pixelY + TILE_SIZE / 2 - viewH / 2));

  ctx.clearRect(0, 0, viewW, viewH);
  ctx.save();
  ctx.translate(-Math.round(camX), -Math.round(camY));

  const animTick = Math.floor(performance.now() / 350);

  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < MAP_COLS; c++) {
      const tx = c * TILE_SIZE;
      const ty = r * TILE_SIZE;
      if (tx + TILE_SIZE < camX || tx > camX + viewW || ty + TILE_SIZE < camY || ty > camY + viewH) continue;
      drawOverworldTile(ctx, getTileAt(c, r), tx, ty, c, r, theme, animTick);
    }
  }

  if (typeof drawFloorItemsOnCanvas === 'function') {
    drawFloorItemsOnCanvas(ctx, performance.now());
  }

  const facingNpc = getFacingNPC();
  if (mapObj.npcs) {
    mapObj.npcs.forEach(npc => {
      if (typeof isNPCActiveOnMap === 'function' && !isNPCActiveOnMap(npc)) return;
      if (npc.isMonster || npc.monsterId) {
        drawOverworldPokemonNPC(ctx, npc, p, facingNpc && facingNpc.id === npc.id, animTick);
      } else {
        drawNPCSprite(ctx, npc, p, facingNpc && facingNpc.id === npc.id, animTick);
      }
    });
  }

  const facingPoke = typeof getFacingPokeNPC === 'function' ? getFacingPokeNPC() : null;
  if (mapObj.pokeNpcs) {
    mapObj.pokeNpcs.forEach(pNpc => {
      if (typeof isNPCActiveOnMap === 'function' && !isNPCActiveOnMap(pNpc)) return;
      drawOverworldPokemonNPC(ctx, pNpc, p, facingPoke && facingPoke.id === pNpc.id, animTick);
    });
  }

  const pw = state.partnerWorld;
  if (pw && pw.pixelY <= p.pixelY) {
    drawFollowerPartner(ctx, theme);
    drawPlayerTrainerSprite(ctx, p, theme, getTileAt(p.gridX, p.gridY));
  } else {
    drawPlayerTrainerSprite(ctx, p, theme, getTileAt(p.gridX, p.gridY));
    drawFollowerPartner(ctx, theme);
  }

  ctx.restore();
}