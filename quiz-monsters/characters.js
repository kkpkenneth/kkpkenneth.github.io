/********************************************************************
 * characters.js
 * 16x16 Bitmap Tile Engine with Distinct Rocks, Ice, Lava, Swamp Mud,
 * Desert Cacti, Beach Corals & Multi-Color Flowers
 ********************************************************************/

const TILE_BITMAPS = {
  // Tree (16x16)
  T: [
    "....tttttttt....",
    "..tttttttttttt..",
    ".ttttlllllltttt.",
    ".tttllllllllttt.",
    "tttllllllllllttt",
    "tttllllllllllttt",
    "ttttlllllllltttt",
    "tttttttttttttttt",
    ".tttttttttttttt.",
    "..tttttttttttt..",
    "....dddddddd....",
    ".....bbbbbb.....",
    ".....bbbbbb.....",
    ".....bbbbbb.....",
    "....bbbbbbbb....",
    "................"
  ],
  // Jagged Crag Rock / Boulder (16x16)
  R: [
    "................",
    ".....bbbbbb.....",
    "...bbllllllbb...",
    "..bllrrrrrrllb..",
    ".blrrrrrrrrrrlb.",
    ".blrrrlllrrrrlb.",
    "blrrrllrrrrrrrlb",
    "blrrrrrrrrddddlb",
    "brrrrrrrdddddddb",
    "brrrrrddddddrrrb",
    ".bddddddddrrrrb.",
    ".bbddddddddddbb.",
    "..bbbbbbbbbbbb..",
    "...ssssssssss...",
    "................",
    "................"
  ],
  // Crystalline Glacier Ice Block (16x16)
  I: [
    ".bbbbbbbbbbbbbb.",
    "bwwwwwwwwwwwwwwb",
    "bwllllllllllllwb",
    "bwlwwllllllwwlwb",
    "bwlwllllllllwlwb",
    "bwllllwwwwllllwb",
    "bwlllwwccwwlllwb",
    "bwllwwccccwwllwb",
    "bwllwccccccwllwb",
    "bwlllwwccwwlllwb",
    "bwllllwwwwllllwb",
    "bwlwllllllllwlwb",
    "bwlwwllllllwwlwb",
    "bwccccccccccccwb",
    "bwwwwwwwwwwwwwwb",
    ".bbbbbbbbbbbbbb."
  ],
  // Desert Saguaro Cactus (16x16)
  C: [
    "................",
    "......bbbb......",
    ".....bggggb.....",
    ".....bglggb.....",
    ".bbb.bglggb.bbb.",
    "bgggb.bglgb.bggb",
    "bglgb.bglgb.bglb",
    "bglgbbbglgbbbglb",
    "bggggggglggggggb",
    ".bbbbbbglgbbbbb.",
    ".....bbglgb.....",
    ".....bgglgb.....",
    ".....bggggb.....",
    ".....bggggb.....",
    "....dddddddd....",
    "................"
  ],
  // Beach / Reef Coral (16x16)
  K: [
    "................",
    "..kk...pp...kk..",
    ".kkkk.pppp.kkkk.",
    ".kllk.pllp.kllk.",
    "..kkkkppppkkkk..",
    "...kkkkppkkkk...",
    "..yykkkkkkkkcc..",
    ".yyyykkkkkkcccc.",
    "..yykkkkkkkkcc..",
    "....kkkkkkkk....",
    ".....kkkkkk.....",
    "....bbbbbbbb....",
    "...dddddddddd...",
    "................",
    "................",
    "................"
  ],
  // Tall Wild Grass (16x16)
  G: [
    "................",
    "..l....l.....l..",
    "..ll...ll...ll..",
    ".gll..gll..gll..",
    ".ggl..ggl..ggl..",
    ".ggg..ggg..ggg..",
    "gggggggggggggggg",
    "gggggggggggggggg",
    "..l.....l....l..",
    "..ll...ll...ll..",
    ".gll..gll..gll..",
    ".ggl..ggl..ggl..",
    "gggggggggggggggg",
    "gggggggggggggggg",
    "dddddddddddddddd",
    "................"
  ],
  // Water Wave Tile (16x16)
  W: [
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwllllwwwwwwwwww",
    "wwwwllllwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwllllww",
    "wwwwwwwwllllwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwllllwwwwwwwwww",
    "wwwwllllwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwllllww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww"
  ],
  // Lava Magma Wave Tile (16x16)
  L: [
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwllllwwwwyyyyww",
    "wwwwllllwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwyyyywwwwwwww",
    "wwwwwwwwwwllllww",
    "wwwwwwwwllllwwww",
    "wwwwwwwwwwwwwwww",
    "wwyyyywwwwwwwwww",
    "wwllllwwwwwwwwww",
    "wwwwllllwwwwyyyy",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwllllww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww"
  ],
  // Swamp Mud Tile (16x16)
  M: [
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwllllwwwwddddww",
    "wwwwllllwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwddddwwwwwwww",
    "wwwwwwwwwwllllww",
    "wwwwwwwwllllwwww",
    "wwwwwwwwwwwwwwww",
    "wwddddwwwwwwwwww",
    "wwllllwwwwwwwwww",
    "wwwwllllwwwwdddd",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwllllww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww"
  ],
  // Multi-Color Animated Flower Tile (16x16)
  F: [
    "................",
    "...yy...........",
    "..yyyy..........",
    "..yycy.....rr...",
    "...yy.....rrrr..",
    "...gg.....rrcr..",
    "....g......rr...",
    "...........gg...",
    "............g...",
    "....rr..........",
    "...rrrr....yy...",
    "...rrcr...yyyy..",
    "....rr....yycy..",
    "....gg.....yy...",
    ".....g.....gg...",
    "................"
  ],
  // Research Building Wall & Window (16x16)
  H: [
    "rrrrrrrrrrrrrrrr",
    "rrrrrrrrrrrrrrrr",
    "dddddddddddddddd",
    "rrrrrrrrrrrrrrrr",
    "rrrrrrrrrrrrrrrr",
    "bbbbbbbbbbbbbbbb",
    "wwwwwwwwwwwwwwww",
    "wwwwbbbbbbbbwwww",
    "wwwwbccccccbwwww",
    "wwwwbccccccbwwww",
    "wwwwbccccccbwwww",
    "wwwwbccccccbwwww",
    "wwwwbbbbbbbbwwww",
    "wwwwwwwwwwwwwwww",
    "ssssssssssssssss",
    "bbbbbbbbbbbbbbbb"
  ],
  // Building Doorway (16x16)
  D: [
    "rrrrrrrrrrrrrrrr",
    "rrrrrrrrrrrrrrrr",
    "bbbbbbbbbbbbbbbb",
    "wwwwbbbbbbbbwwww",
    "wwwwbddddddBwwww",
    "wwwwbddddddBwwww",
    "wwwwbddddddBwwww",
    "wwwwbddddddBwwww",
    "wwwwbddddyyBwwww",
    "wwwwbddddyyBwwww",
    "wwwwbddddddBwwww",
    "wwwwbddddddBwwww",
    "wwwwbddddddBwwww",
    "wwwwbddddddBwwww",
    "pppppppppppppppp",
    "pppppppppppppppp"
  ],
  // Wooden Bridge over Water (16x16)
  B: [
    "wwwwwwwwwwwwwwww",
    "bbbbbbbbbbbbbbbb",
    "dddddddddddddddd",
    "llbbbbllbbbbllbb",
    "llbbbbllbbbbllbb",
    "llbbbbllbbbbllbb",
    "llbbbbllbbbbllbb",
    "llbbbbllbbbbllbb",
    "llbbbbllbbbbllbb",
    "llbbbbllbbbbllbb",
    "llbbbbllbbbbllbb",
    "llbbbbllbbbbllbb",
    "llbbbbllbbbbllbb",
    "dddddddddddddddd",
    "bbbbbbbbbbbbbbbb",
    "wwwwwwwwwwwwwwww"
  ],
  // Dirt/Stone Path (16x16)
  P: [
    "pppppppppppppppp",
    "pppppppppppppppp",
    "ppddpppppppppppp",
    "ppddpppppppppppp",
    "pppppppppppppppp",
    "pppppppppppddppp",
    "pppppppppppddppp",
    "pppppppppppppppp",
    "pppppppppppppppp",
    "ppppddpppppppppp",
    "ppppddpppppppppp",
    "pppppppppppppppp",
    "pppppppppppppddp",
    "pppppppppppppddp",
    "pppppppppppppppp",
    "pppppppppppppppp"
  ],
  // Biome Exit Beacon Tile (16x16)
  E: [
    "pppppppppppppppp",
    "pppppppppppppppp",
    "ppbbbbbbbbbbbbpp",
    "ppbbyyyyyyyybBpp",
    "ppbyyyyyyyyyybpp",
    "ppbyyybbbbyyybpp",
    "ppbyybb..bbyybpp",
    "ppbyyb....byybpp",
    "ppbyyb....byybpp",
    "ppbyybb..bbyybpp",
    "ppbyyybbbbyyybpp",
    "ppbyyyyyyyyyybpp",
    "ppbbyyyyyyyybBpp",
    "ppbbbbbbbbbbbbpp",
    "pppppppppppppppp",
    "pppppppppppppppp"
  ]
};

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

const FLOWER_COLOR_SETS = [
  { r: '#f43f5e', y: '#fde047', c: '#ffffff' },
  { r: '#a855f7', y: '#f472b6', c: '#fef08a' },
  { r: '#38bdf8', y: '#fb923c', c: '#ffffff' },
  { r: '#ec4899', y: '#a78bfa', c: '#fde047' },
  { r: '#f97316', y: '#facc15', c: '#fffbeb' }
];

function drawOverworldTile(ctx, tile, tx, ty, c, r, theme, animTick) {
  ctx.fillStyle = (c + r) % 2 === 0 ? theme.groundA : theme.groundB;
  ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);

  const bmp = TILE_BITMAPS[tile];
  if (!bmp) return;

  if (tile === 'R') {
    const rockPalette = {
      b: '#1c1917',
      r: theme.rock || '#78716c',
      l: theme.rockLight || '#d6d3d1',
      d: theme.rockDark || '#44403c',
      s: 'rgba(0,0,0,0.28)'
    };
    drawBitmap16(ctx, bmp, rockPalette, tx, ty, TILE_SIZE, (c + r) % 2 === 1);
    return;
  }

  if (tile === 'I') {
    const icePalette = {
      b: '#0284c7',
      w: '#e0f2fe',
      l: '#7dd3fc',
      c: '#38bdf8'
    };
    drawBitmap16(ctx, bmp, icePalette, tx, ty, TILE_SIZE, false);
    return;
  }

  if (tile === 'L') {
    const lavaPalette = {
      w: '#dc2626',
      l: animTick % 2 === 0 ? '#f97316' : '#fb923c',
      y: animTick % 2 === 0 ? '#fde047' : '#facc15'
    };
    const flipLava = (animTick + c + r) % 2 === 1;
    drawBitmap16(ctx, bmp, lavaPalette, tx, ty, TILE_SIZE, flipLava);
    return;
  }

  if (tile === 'M') {
    const mudPalette = {
      w: '#5c4033',
      l: '#78350f',
      d: animTick % 2 === 0 ? '#92400e' : '#451a03'
    };
    const flipMud = (animTick + c + r) % 2 === 1;
    drawBitmap16(ctx, bmp, mudPalette, tx, ty, TILE_SIZE, flipMud);
    return;
  }

  if (tile === 'C') {
    const cactusPalette = {
      b: '#052e16',
      g: '#16a34a',
      l: '#86efac',
      d: 'rgba(0,0,0,0.25)'
    };
    drawBitmap16(ctx, bmp, cactusPalette, tx, ty, TILE_SIZE, c % 2 === 1);
    return;
  }

  if (tile === 'K') {
    const coralColors = ['#f43f5e', '#fb7185', '#e879f9', '#f97316'];
    const secColors   = ['#a855f7', '#38bdf8', '#facc15', '#ec4899'];
    const idx = (c * 3 + r * 5) % coralColors.length;
    const coralPalette = {
      k: coralColors[idx],
      p: secColors[idx],
      l: '#ffffff',
      y: '#fde047',
      c: '#2dd4bf',
      b: '#475569',
      d: 'rgba(0,0,0,0.28)'
    };
    drawBitmap16(ctx, bmp, coralPalette, tx, ty, TILE_SIZE, (c + r) % 2 === 1);
    return;
  }

  if (tile === 'F') {
    const fSet = FLOWER_COLOR_SETS[(c * 7 + r * 13) % FLOWER_COLOR_SETS.length];
    const flowerPalette = {
      r: fSet.r,
      y: animTick % 2 === 0 ? fSet.y : fSet.r,
      c: fSet.c,
      g: '#15803d'
    };
    const flipFlower = (animTick + c + r) % 2 === 1;
    drawBitmap16(ctx, bmp, flowerPalette, tx, ty, TILE_SIZE, flipFlower);
    return;
  }

  const palette = {
    t: theme.tree,
    l: tile === 'W' ? '#38bdf8' : (tile === 'B' ? '#d97706' : (tile === 'G' ? theme.grassTip : theme.treeTop)),
    g: theme.grass,
    d: 'rgba(0,0,0,0.25)',
    b: tile === 'T' || tile === 'B' ? '#451a03' : '#0f172a',
    B: '#0f172a',
    p: theme.path,
    w: tile === 'H' || tile === 'D' ? '#e2e8f0' : '#0284c7',
    r: '#dc2626',
    c: '#38bdf8',
    s: '#94a3b8',
    y: animTick % 2 === 0 ? '#fde047' : '#f59e0b'
  };

  const flipTile = tile === 'W' && ((animTick + c + r) % 2 === 1);
  drawBitmap16(ctx, bmp, palette, tx, ty, TILE_SIZE, flipTile);
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
    if (symbol === '♪') {
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
    ctx.fillStyle = symbol === '♪' ? '#f472b6' : '#38bdf8';
    ctx.fillRect(nx + 15, ny - 6, 2, 4);
  }
}

function drawNPCSprite(ctx, npc, playerWorld, isFacingThisNpc, animTick) {
  const nx = npc.x * TILE_SIZE;
  const ny = npc.y * TILE_SIZE;

  ctx.fillStyle = 'rgba(0,0,0,0.32)';
  ctx.fillRect(nx + 6, ny + 26, 20, 4);

  const palette = {
    h: npc.hatColor || '#1e3a8a',
    c: npc.shirtColor || '#60a5fa',
    s: '#fed7aa',
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
  drawInteractionBubble(ctx, nx, pNpc.y * TILE_SIZE, isFacingThisPoke, dist, animTick, '♪');
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

  const facingNpc = getFacingNPC();
  if (mapObj.npcs) {
    mapObj.npcs.forEach(npc => {
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