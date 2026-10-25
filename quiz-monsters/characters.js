/********************************************************************
 * characters.js
 * 16x16 Bitmap Tile Engine with Unified (p, d, l, b, s, t) Obstacle
 * Palettes, Walkable Flags & Visible Floor Item Canvas Rendering
 ********************************************************************/

const DEFAULT_OBSTACLE_DEFS = {
  T: {
    id: 'T', name: 'TREE', walkable: false,
    palette: { p: '#22c55e', d: '#15803d', l: '#86efac', b: '#451a03', s: '#14532d', t: '#166534' },
    grid: [
      "................",
      "................",
      ".....llttttt....",
      "...ddlllttttt...",
      "...dllllttttt...",
      "..dllllttttttt..",
      "..dlllbltttttt..",
      "..llllbbttbttt..",
      "..llbllbtbtttt..",
      "..llbbbbtbtttt..",
      "...lllbbbbtttt..",
      "....llbbbbtt....",
      "......bbbb......",
      ".....bbbbbb.....",
      ".....bbbbbb.....",
      "................"
    ]
  },
  R: {
    id: 'R', name: 'CRAG ROCK / BOULDER', walkable: false,
    palette: { p: '#78716c', d: '#44403c', l: '#d6d3d1', b: '#1c1917', s: '#292524', t: '#a8a29e' },
    grid: [
      "................",
      ".....bbbbbb.....",
      "...bbllllllbb...",
      "..bllppppppllb..",
      ".blpppppppppplb.",
      ".blppplllpppplb.",
      "blpppllppppppplb",
      "blppppppppddddlb",
      "bpppppppdddddddb",
      "bpppppddddddpppb",
      ".bddddddddppppb.",
      ".bbddddddddddbb.",
      "..bbbbbbbbbbbb..",
      "...ssssssssss...",
      "................",
      "................"
    ]
  },
  I: {
    id: 'I', name: 'GLACIER ICE BLOCK', walkable: false,
    palette: { p: '#e0f2fe', d: '#38bdf8', l: '#7dd3fc', b: '#0284c7', s: '#bae6fd', t: '#0369a1' },
    grid: [
      ".bbbbbbbbbbbbbb.",
      "bppppppppppppppb",
      "bpllllllllllllpb",
      "bplppllllllpplpb",
      "bplpllllllllplpb",
      "bpllllppppllllpb",
      "bplllppddpplllpb",
      "bpllpdddddppllpb",
      "bpllpddddddpllpb",
      "bplllppddpplllpb",
      "bpllllppppllllpb",
      "bplpllllllllplpb",
      "bplppllllllpplpb",
      "bpddddddddddddpb",
      "bppppppppppppppb",
      ".bbbbbbbbbbbbbb."
    ]
  },
  C: {
    id: 'C', name: 'SAGUARO CACTUS', walkable: false,
    palette: { p: '#16a34a', d: '#14532d', l: '#86efac', b: '#052e16', s: '#22c55e', t: '#4ade80' },
    grid: [
        "................",
      "......bbbb......",
      ".....bssssb.....",
      ".....bslpsb.....",
      "..bb.bslpsb.bb..",
      "b.ppb.sllsb.sp..",
      "b.ppb.lllsb.sp..",
      "b.ppbblplssssp..",
      "b.pp..lplspppp..",
      "..pppppplsbbbb..",
      "..pppppplsb.....",
      ".....bsplpb.....",
      ".....bppppb.....",
      ".....bppppb.....",
      "....dddddddd....",
      "................"
    ]
  },
  K: {
    id: 'K', name: 'REEF CORAL', walkable: false,
    palette: { p: '#f43f5e', d: '#475569', l: '#ffffff', b: '#1e293b', s: '#a855f7', t: '#fde047' },
    grid: [
      "................",
      "..pp...ss...pp..",
      ".pppp.ssss.pppp.",
      ".pllp.slls.pllp.",
      "..ppppsssspppp..",
      "...ooooppoooo...".replace(/o/g, 'p'),
      "..ttppppppppdd..",
      ".ttttppppppdddd.",
      "..ttppppppppdd..",
      "....pppppppp....",
      ".....pppppp.....",
      "....bbbbbbbb....",
      "...dddddddddd...",
      "................",
      "................",
      "................"
    ]
  },
  G: {
    id: 'G', name: 'TALL WILD GRASS', walkable: true,
    palette: { p: '#15803d', d: '#052e16', l: '#4ade80', b: '#14532d', s: '#22c55e', t: '#86efac' },
    grid: [
      "................",
      "..l....l.....l..",
      "..ll...ll...ll..",
      ".pll..pll..pll..",
      ".ppl..ppl..ppl..",
      ".ppp..ppp..ppp..",
      "pppppppppppppppp",
      "pppppppppppppppp",
      "..l.....l....l..",
      "..ll...ll...ll..",
      ".pll..pll..pll..",
      ".ppl..ppl..ppl..",
      "pppppppppppppppp",
      "pppppppppppppppp",
      "dddddddddddddddd",
      "................"
    ]
  },
  W: {
    id: 'W', name: 'WATER WAVE TILE', walkable: false,
    palette: { p: '#0284c7', d: '#0369a1', l: '#38bdf8', b: '#0f172a', s: '#7dd3fc', t: '#e0f2fe' },
    grid: [
      "pppppppppppppppp",
      "pppppppppppppppp",
      "ppllllpppppppppp",
      "ppppllllpppppppp",
      "pppppppppppppppp",
      "pppppppppppppppp",
      "ppppppppppllllpp",
      "ppppppppllllpppp",
      "pppppppppppppppp",
      "pppppppppppppppp",
      "ppllllpppppppppp",
      "ppppllllpppppppp",
      "pppppppppppppppp",
      "ppppppppppllllpp",
      "pppppppppppppppp",
      "pppppppppppppppp"
    ]
  },
  L: {
    id: 'L', name: 'LAVA MAGMA TILE', walkable: false,
    palette: { p: '#dc2626', d: '#991b1b', l: '#f97316', b: '#450a0a', s: '#fde047', t: '#facc15' },
    grid: [
      "pppppppppppppppp",
      "pppppppppppppppp",
      "ppllllppppststpp",
      "ppppllllpppppppp",
      "pppppppppppppppp",
      "ppppststpppppppp",
      "ppppppppppllllpp",
      "ppppppppllllpppp",
      "pppppppppppppppp",
      "ppststpppppppppp",
      "ppllllpppppppppp",
      "ppppllllppppstst",
      "pppppppppppppppp",
      "ppppppppppllllpp",
      "pppppppppppppppp",
      "pppppppppppppppp"
    ]
  },
  M: {
    id: 'M', name: 'SWAMP MUD TILE', walkable: true,
    palette: { p: '#5c4033', d: '#451a03', l: '#78350f', b: '#292524', s: '#92400e', t: '#a16207' },
    grid: [
      "pppppppppppppppp",
      "pppppppppppppppp",
      "ppllllppppddddpp",
      "ppppllllpppppppp",
      "pppppppppppppppp",
      "ppppddddpppppppp",
      "ppppppppppllllpp",
      "ppppppppllllpppp",
      "pppppppppppppppp",
      "ppddddpppppppppp",
      "ppllllpppppppppp",
      "ppppllllppppdddd",
      "pppppppppppppppp",
      "ppppppppppllllpp",
      "pppppppppppppppp",
      "pppppppppppppppp"
    ]
  },
  F: {
    id: 'F', name: 'ANIMATED FLOWER TILE', walkable: true,
    palette: { p: '#f43f5e', d: '#15803d', l: '#fde047', b: '#0f172a', s: '#ffffff', t: '#fb923c' },
    grid: [
      "................",
      "...ll...........",
      "..llll..........",
      "..llsl.....pp...",
      "...ll.....pppp..",
      "...dd.....ppsp..",
      "....d......pp...",
      "...........dd...",
      "............d...",
      "....pp..........",
      "...pppp....ll...",
      "...ppsp...llll..",
      "....pp....llsl..",
      "....dd.....ll...",
      ".....d.....dd...",
      "................"
    ]
  },
  H: {
    id: 'H', name: 'BUILDING WALL & WINDOW', walkable: false,
    palette: { p: '#dc2626', d: '#991b1b', l: '#e2e8f0', b: '#0f172a', s: '#38bdf8', t: '#94a3b8' },
    grid: [
      "pppppppppppppppp",
      "pppppppppppppppp",
      "dddddddddddddddd",
      "pppppppppppppppp",
      "pppppppppppppppp",
      "bbbbbbbbbbbbbbbb",
      "llllllllllllllll",
      "llllbbbbbbbbllll",
      "llllbssssssbllll",
      "llllbssssssbllll",
      "llllbssssssbllll",
      "llllbssssssbllll",
      "llllbbbbbbbbllll",
      "llllllllllllllll",
      "tttttttttttttttt",
      "bbbbbbbbbbbbbbbb"
    ]
  },
  D: {
    id: 'D', name: 'BUILDING DOORWAY', walkable: false,
    palette: { p: '#dc2626', d: '#78350f', l: '#e2e8f0', b: '#0f172a', s: '#fde047', t: '#d6b37c' },
    grid: [
      "pppppppppppppppp",
      "pppppppppppppppp",
      "bbbbbbbbbbbbbbbb",
      "llllbbbbbbbbllll",
      "llllbddddddbllll",
      "llllbddddddbllll",
      "llllbddddddbllll",
      "llllbddddddbllll",
      "llllbddddssbllll",
      "llllbddddssbllll",
      "llllbddddddbllll",
      "llllbddddddbllll",
      "llllbddddddbllll",
      "llllbddddddbllll",
      "tttttttttttttttt",
      "tttttttttttttttt"
    ]
  },
  B: {
    id: 'B', name: 'WOODEN BRIDGE', walkable: true,
    palette: { p: '#451a03', d: '#292524', l: '#d97706', b: '#0f172a', s: '#0284c7', t: '#78350f' },
    grid: [
      "ssssssssssssssss",
      "pppppppppppppppp",
      "dddddddddddddddd",
      "llppppllppppllpp",
      "llppppllppppllpp",
      "llppppllppppllpp",
      "llppppllppppllpp",
      "llppppllppppllpp",
      "llppppllppppllpp",
      "llppppllppppllpp",
      "llppppllppppllpp",
      "llppppllppppllpp",
      "llppppllppppllpp",
      "dddddddddddddddd",
      "pppppppppppppppp",
      "ssssssssssssssss"
    ]
  },
  P: {
    id: 'P', name: 'DIRT / STONE PATH', walkable: true,
    palette: { p: '#d6b37c', d: '#a16207', l: '#fef08a', b: '#78350f', s: '#ca8a04', t: '#e7e5e4' },
    grid: [
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
    ]
  },
  E: {
    id: 'E', name: 'BIOME EXIT BEACON', walkable: true,
    palette: { p: '#d6b37c', d: '#ca8a04', l: '#fde047', b: '#0f172a', s: '#f59e0b', t: '#ffffff' },
    grid: [
      "pppppppppppppppp",
      "pppppppppppppppp",
      "ppbbbbbbbbbbbbpp",
      "ppbblslslslsbbpp",
      "ppblslslslslsbpp",
      "ppblsbbbbbblespp",
      "ppblbb....bblspp",
      "ppblb......blspp",
      "ppblb......blspp",
      "ppblbb....bblspp",
      "ppblsbbbbbblespp",
      "ppblslslslslsbpp",
      "ppbblslslslsbbpp",
      "ppbbbbbbbbbbbbpp",
      "pppppppppppppppp",
      "pppppppppppppppp"
    ]
  },
  S: {
    id: 'S', name: 'ONSEN STEAM GEYSER', walkable: false,
    palette: { p: '#38bdf8', d: '#64748b', l: '#f8fafc', b: '#0f172a', s: '#f97316', t: '#94a3b8' },
    grid: [
      "....ll....ll....",
      "...ll..ll..ll...",
      "....ll..ll......",
      ".....ll..ll.....",
      "....bbbbbbbb....",
      "...bddddddddb...",
      "..bdtpppppptdb..",
      "..bdppppppppdb..",
      ".bbdppssssppdbb.",
      ".bddddppppddddb.",
      ".bddddddddddddb.",
      "..bbbbbbbbbbbb..",
      "................",
      "................",
      "................",
      "................"
    ]
  },
  V: {
    id: 'V', name: 'TESLA COIL PYLON', walkable: false,
    palette: { p: '#94a3b8', d: '#475569', l: '#facc15', b: '#0f172a', s: '#38bdf8', t: '#e2e8f0' },
    grid: [
      "..l..........l..",
      "...ll.bbbb.ll...",
      "....lbsttsbl....",
      "....bspttpsb....",
      ".....bbbbbb.....",
      "......bddb......",
      "....bbppppbb....",
      "....bddddddB....".replace(/B/g, 'b'),
      "......bddb......",
      "....bbppppbb....",
      "....bddddddb....",
      "...bbppppppbb...",
      "..bbddddddddbb..",
      "..bppppppppppb..",
      "..bbbbbbbbbbbb..",
      "................"
    ]
  },
  U: {
    id: 'U', name: 'SPORE TOADSTOOL', walkable: false,
    palette: { p: '#a855f7', d: '#6b21a8', l: '#86efac', b: '#0f172a', s: '#fef08a', t: '#d8b4fe' },
    grid: [
      "................",
      ".....bbbbbb.....",
      "...bbppppppbb...",
      "..bppllpplpppb..",
      ".bpppllpplppppb.",
      "bppppppllppllppb",
      "bppppllpplpppppb",
      "bddddddddddddddB".replace(/B/g, 'b'),
      ".bbbbbbbbbbbbbb.",
      ".....bssssb.....",
      ".....bssssb.....",
      "....bbssssbb....",
      "....bssssssb....",
      "...bbllllllbb...",
      "...bbbbbbbbbb...",
      "................"
    ]
  },
  A: {
    id: 'A', name: 'ASTRAL CRYSTAL OBELISK', walkable: false,
    palette: { p: '#f472b6', d: '#9333ea', l: '#fbcfe8', b: '#1e1b4b', s: '#38bdf8', t: '#fde047' },
    grid: [
      ".......bb.......",
      "......bllb......",
      ".....blpplb.....",
      "....blpppplb....",
      "....bppssppb....",
      "...blppsspplb...",
      "...bppddddppb...",
      "....bpddddpb....",
      "....bbddddbb....",
      ".....bbddbb.....",
      "......bbbb......",
      "....tt....tt....",
      "...bbbbbbbbbb...",
      "..bbddddddddbb..",
      "................",
      "................"
    ]
  },
  N: {
    id: 'N', name: 'SHADOW STREETLAMP', walkable: false,
    palette: { p: '#334155', d: '#0f172a', l: '#facc15', b: '#020617', s: '#ef4444', t: '#64748b' },
    grid: [
      ".....bbbbbb.....",
      "....bddddddB....".replace(/B/g, 'b'),
      "...bllllllllb...",
      "...blsssssslb...",
      "....bbbbbbbb....",
      ".......bb.......",
      "......bppb......",
      "......bppb......",
      "......bppb......",
      "......bppb......",
      "......bppb......",
      "......bppb......",
      ".....bddddb.....",
      "....bppppppb....",
      "....bbbbbbbb....",
      "................"
    ]
  },
  Q: {
    id: 'Q', name: 'MOON BADLANDS SPIRE', walkable: false,
    palette: { p: '#dc2626', d: '#7f1d1d', l: '#fde047', b: '#450a0a', s: '#f97316', t: '#fca5a5' },
    grid: [
      ".......bb.......",
      "......bllb......",
      ".....blsslB.....".replace(/B/g, 'b'),
      ".....bppppb.....",
      "....bpddddpb....",
      "....bsttttsb....",
      "...bppddddppb...",
      "...bssssssssb...",
      "..bppddddddppb..",
      "..bsttttttttsb..",
      ".bppppddddddppb.",
      ".bddddddddddddb.",
      "bppppppppppppppb",
      "bddddddddddddddB".replace(/B/g, 'b'),
      ".bbbbbbbbbbbbbb.",
      "................"
    ]
  },
  BERRY: {
    id: 'BERRY', name: 'WILD FLOOR BERRY', walkable: false, obtainable: true,
    palette: { p: '#a855f7', d: '#581c87', l: '#f3e8ff', b: '#0f172a', s: '#e9d5ff', t: '#fde047'  },
    grid: [
      "................",
      "................",
      "................",
      "................",
      "................",
      "........s.......",
      "........s.......",
      "......tttts.....",
      "........s.......",
      "........s.......",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ]
  },
  STONE: {
    id: 'STONE', name: 'EVOLUTIONARY STONE', walkable: false, obtainable: true,
    palette: { p: '#a855f7', d: '#581c87', l: '#f3e8ff', b: '#0f172a', s: '#e9d5ff', t: '#ffffff' },
    grid: [
      "................",
      "................",
      "................",
      "................",
      "................",
      "........s.......",
      "........s.......",
      "......tttts.....",
      "........s.......",
      "........s.......",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ]
  }
};

if (typeof OBSTACLE_DEFS === 'undefined') {
  var OBSTACLE_DEFS = structuredClone(DEFAULT_OBSTACLE_DEFS);
}

const TILE_BITMAPS = new Proxy({}, {
  get(target, prop) {
    if (OBSTACLE_DEFS && OBSTACLE_DEFS[prop]) {
      return OBSTACLE_DEFS[prop].grid;
    }
    return undefined;
  }
});

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
  if (!OBSTACLE_DEFS[tileKey] || !DEFAULT_OBSTACLE_DEFS[tileKey]) return false;
  return JSON.stringify(OBSTACLE_DEFS[tileKey].palette) !== JSON.stringify(DEFAULT_OBSTACLE_DEFS[tileKey].palette);
}

function drawOverworldTile(ctx, tile, tx, ty, c, r, theme, animTick) {
  ctx.fillStyle = (c + r) % 2 === 0 ? theme.groundA : theme.groundB;
  ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);

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

  const animatedTile = tile === 'W' || tile === 'L' || tile === 'M' || tile === 'F' || tile === 'S' || tile === 'V';
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

  // Draw visible floor items (Berries & Evolutionary Stones) onto the canvas
  if (typeof drawFloorItemsOnCanvas === 'function') {
    drawFloorItemsOnCanvas(ctx, performance.now());
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