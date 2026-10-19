/********************************************************************
 * characters.js
 * Player Trainer Design, Scholar NPC Sprites & Overworld Tile Renderer
 ********************************************************************/

const TRAINER_PALETTE = {
  capMain: '#dc2626',
  capBrim: '#ffffff',
  skin: '#fed7aa',
  eyes: '#0f172a',
  jacket: '#2563eb',
  shirtTrim: '#facc15',
  pants: '#1e3a8a'
};

function drawOverworldTile(ctx, tile, tx, ty, c, r, theme, animTick) {
  // Base Checkerboard Biome Ground
  ctx.fillStyle = (c + r) % 2 === 0 ? theme.groundA : theme.groundB;
  ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);

  if (tile === 'P') {
    ctx.fillStyle = theme.path;
    ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(tx + 4, ty + 6, 4, 4);
    ctx.fillRect(tx + 22, ty + 20, 4, 4);
  } else if (tile === 'E') {
    ctx.fillStyle = theme.path;
    ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = animTick % 2 === 0 ? '#fde047' : '#f59e0b';
    ctx.fillRect(tx + 4, ty + 4, TILE_SIZE - 8, TILE_SIZE - 8);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(tx + 12, ty + 12, 8, 8);
  } else if (tile === 'B') {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#92400e';
    ctx.fillRect(tx, ty + 2, TILE_SIZE, TILE_SIZE - 4);
    ctx.fillStyle = '#b45309';
    for (let bx = 2; bx < TILE_SIZE; bx += 8) {
      ctx.fillRect(tx + bx, ty + 4, 5, TILE_SIZE - 8);
    }
  } else if (tile === 'W') {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#38bdf8';
    const waveOffset = (animTick + c + r) % 2 === 0 ? 4 : 12;
    ctx.fillRect(tx + waveOffset, ty + 8, 10, 3);
    ctx.fillRect(tx + 20 - waveOffset, ty + 22, 8, 3);
  } else if (tile === 'F') {
    const sway = (animTick + c) % 2 === 0 ? 0 : 2;
    ctx.fillStyle = '#facc15';
    ctx.fillRect(tx + 6 + sway, ty + 6, 6, 6);
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(tx + 18 - sway, ty + 18, 6, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(tx + 8 + sway, ty + 8, 2, 2);
    ctx.fillRect(tx + 20 - sway, ty + 20, 2, 2);
  } else if (tile === 'G') {
    ctx.fillStyle = theme.grass;
    ctx.fillRect(tx + 2, ty + 2, TILE_SIZE - 4, TILE_SIZE - 4);
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    for (let gx = 4; gx < 26; gx += 7) {
      ctx.fillRect(tx + gx, ty + 6, 4, 10);
      ctx.fillRect(tx + gx + 2, ty + 16, 4, 10);
    }
    ctx.fillStyle = theme.grassTip;
    ctx.fillRect(tx + 6, ty + 6, 3, 5);
    ctx.fillRect(tx + 18, ty + 14, 3, 5);
  } else if (tile === 'T') {
    ctx.fillStyle = '#451a03';
    ctx.fillRect(tx + 11, ty + 20, 10, 12);
    ctx.fillStyle = theme.tree;
    ctx.fillRect(tx + 3, ty + 4, 26, 20);
    ctx.fillStyle = theme.treeTop;
    ctx.fillRect(tx + 6, ty + 3, 20, 13);
  } else if (tile === 'H') {
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(tx, ty, TILE_SIZE, 14);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(tx + 6, ty + 18, 8, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(tx + 7, ty + 19, 6, 6);
  } else if (tile === 'D') {
    ctx.fillStyle = theme.path;
    ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(tx + 4, ty + 2, TILE_SIZE - 8, 12);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(tx + 8, ty + 5, TILE_SIZE - 16, 4);
  }
}

function drawNPCSprite(ctx, npc, playerWorld, isFacingThisNpc, animTick) {
  const nx = npc.x * TILE_SIZE;
  const ny = npc.y * TILE_SIZE;

  // Ground Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.32)';
  ctx.fillRect(nx + 6, ny + 25, 20, 5);

  // Boots & Tunic
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(nx + 9, ny + 22, 5, 5);
  ctx.fillRect(nx + 18, ny + 22, 5, 5);
  ctx.fillStyle = npc.shirtColor;
  ctx.fillRect(nx + 7, ny + 14, 18, 9);

  // Head & Cap
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(nx + 8, ny + 6, 16, 9);
  ctx.fillStyle = npc.hatColor;
  ctx.fillRect(nx + 7, ny + 3, 18, 5);

  // Eyes
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(nx + 10, ny + 9, 3, 3);
  ctx.fillRect(nx + 19, ny + 9, 3, 3);

  // Interaction Bubble [!]
  const dist = Math.abs(npc.x - playerWorld.gridX) + Math.abs(npc.y - playerWorld.gridY);
  if (isFacingThisNpc) {
    const bounceY = animTick % 2 === 0 ? -12 : -15;
    ctx.fillStyle = '#fde047';
    ctx.fillRect(nx + 8, ny + bounceY, 16, 12);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.strokeRect(nx + 8, ny + bounceY, 16, 12);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(nx + 15, ny + bounceY + 2, 2, 5);
    ctx.fillRect(nx + 15, ny + bounceY + 8, 2, 2);
  } else if (dist <= 3) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(nx + 10, ny - 8, 12, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(nx + 15, ny - 6, 2, 4);
  }
}

function drawPlayerTrainerSprite(ctx, p, theme, standingTile) {
  const px = Math.round(p.pixelX);
  const py = Math.round(p.pixelY + p.hopOffsetY);
  const shadowY = Math.round(p.pixelY);

  // Ground shadow stays planted during mid-step hop
  ctx.fillStyle = 'rgba(0,0,0,0.38)';
  ctx.fillRect(px + 6, shadowY + 25, 20, 5);

  // Alternating stride legs
  const leftLegLift  = p.isStepping && p.stepFrame === 0 ? -2 : 0;
  const rightLegLift = p.isStepping && p.stepFrame === 1 ? -2 : 0;
  ctx.fillStyle = TRAINER_PALETTE.pants;
  ctx.fillRect(px + 9, py + 21 + leftLegLift, 5, 6);
  ctx.fillRect(px + 18, py + 21 + rightLegLift, 5, 6);

  // Jacket & Trim
  ctx.fillStyle = TRAINER_PALETTE.jacket;
  ctx.fillRect(px + 7, py + 13, 18, 9);
  ctx.fillStyle = TRAINER_PALETTE.shirtTrim;
  ctx.fillRect(px + 14, py + 14, 4, 7);

  // Head & Trainer Cap
  ctx.fillStyle = TRAINER_PALETTE.skin;
  ctx.fillRect(px + 8, py + 5, 16, 9);
  ctx.fillStyle = TRAINER_PALETTE.capMain;
  ctx.fillRect(px + 6, py + 2, 20, 5);
  ctx.fillStyle = TRAINER_PALETTE.capBrim;
  ctx.fillRect(px + 11, py + 3, 10, 2);

  // Directional Eyes
  ctx.fillStyle = TRAINER_PALETTE.eyes;
  if (p.dir === 'down') {
    ctx.fillRect(px + 10, py + 8, 3, 3);
    ctx.fillRect(px + 19, py + 8, 3, 3);
  } else if (p.dir === 'left') {
    ctx.fillRect(px + 9, py + 8, 3, 3);
  } else if (p.dir === 'right') {
    ctx.fillRect(px + 20, py + 8, 3, 3);
  }

  // Tall Grass Rustle Overlay
  if (standingTile === 'G') {
    ctx.fillStyle = theme.grassTip;
    ctx.fillRect(px + 4, shadowY + 20, 6, 8);
    ctx.fillRect(px + 22, shadowY + 20, 6, 8);
    ctx.fillRect(px + 13, shadowY + 22, 6, 6);
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

  const facingNpc = getFacingNPC();
  mapObj.npcs.forEach(npc => {
    drawNPCSprite(ctx, npc, p, facingNpc && facingNpc.id === npc.id, animTick);
  });

  drawPlayerTrainerSprite(ctx, p, theme, getTileAt(p.gridX, p.gridY));
  ctx.restore();
}