/********************************************************************
 * obstacle.js
 * All 16x16 Overworld Obstacle Definitions (Original, East Asia,
 * West Europe & North America) with Unified (p, d, l, b, s, t) Palettes
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
      "...pppppppppp...",
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
      "....bddddddb....",
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
      "...bbllppppbb...",
      "..bppllpplpppb..",
      ".bpppllpplppppb.",
      "blppllpppppppppb",
      "blppllpppppllppb",
      "bddddddddddllddb",
      ".tttttttttttttt.",
      ".tttttttttttttt.",
      ".....bssssb.....",
      "...ptlsssstlp...",
      "...lttssssttl...",
      "...bs.llll.sb...",
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
      "....bddddddb....",
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
      ".....blsslb.....",
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
      "bddddddddddddddb",
      ".bbbbbbbbbbbbbb.",
      "................"
    ]
  },
  Y: {
    id: 'Y', name: 'NEON BILLBOARD SIGN', walkable: false,
    palette: { p: '#f43f5e', d: '#1e1b4b', l: '#38bdf8', b: '#0f172a', s: '#fde047', t: '#a855f7' },
    grid: [
      ".bbbbbbbbbbbbbb.",
      "bttttttttttttttb",
      "btddddddddddddtb",
      "btdppssllssppdtb",
      "btdpddddddddpdtb",
      "btdpllspspllpdtb",
      "btdpddddddddpdtb",
      "btdppssllssppdtb",
      "btddddddddddddtb",
      "bttttttttttttttb",
      ".bbbbbbbbbbbbbb.",
      "....bb....bb....",
      "....bb....bb....",
      "....bb....bb....",
      "...bbbb..bbbb...",
      "................"
    ]
  },
  J: {
    id: 'J', name: 'CHERRY BLOSSOM TREE', walkable: false,
    palette: { p: '#f472b6', d: '#db2777', l: '#fbcfe8', b: '#451a03', s: '#be185d', t: '#fdf2f8' },
    grid: [
      "................",
      ".....llttttt....",
      "...ddlllttppt...",
      "..dllllttppttt..",
      "..dlllblpppppt..",
      "..llllbppbbppt..",
      "..llbllbpbpptt..",
      "...lllbbbbppt...",
      "....llbbbbtt....",
      "......bbbb......",
      ".....bbbbbb.....",
      ".....bbbbbb..l..",
      "..l.........ll..",
      "................",
      "................",
      "................"
    ]
  },
  O: {
    id: 'O', name: 'PLUM BLOSSOM SHRUB', walkable: false,
    palette: { p: '#e11d48', d: '#9f1239', l: '#fda4af', b: '#292524', s: '#fde047', t: '#fff1f2' },
    grid: [
      "................",
      "....pp....pp....",
      "...pspp..ppsp...",
      "....pp.bb.pp....",
      "..ll..bbbb..ll..",
      ".lsllbb..bbllsl.",
      "..llbb.pp.bbll..",
      "....bbpspb.bb...",
      "...bb..pp...bb..",
      "...bb......bb...",
      "....bbbbbbbb....",
      "......bbbb......",
      ".....bbbbbb.....",
      "....bbbbbbbb....",
      "................",
      "................"
    ]
  },
  Z: {
    id: 'Z', name: 'GREAT WALL BATTLEMENT', walkable: false,
    palette: { p: '#78716c', d: '#44403c', l: '#d6d3d1', b: '#1c1917', s: '#dc2626', t: '#a8a29e' },
    grid: [
      "bbbb..bbbb..bbbb",
      "bllb..bllb..bllb",
      "bppb..bppb..bppb",
      "bbbbbbbbbbbbbbbb",
      "bllllllllllllllb",
      "bpppbppppppbpppb",
      "bddddddddddddddb",
      "bbbbbbbbbbbbbbbb",
      "bpppbppppppbpppb",
      "bpppbpsssspbpppb",
      "bddddbsbbsbddddb",
      "bbbbbbbsbsbbbbbb",
      "bppppppbbppppppb",
      "bddddddddddddddb",
      "bbbbbbbbbbbbbbbb",
      "................"
    ]
  },
  X: {
    id: 'X', name: 'CASINO SLOT MACHINE', walkable: false,
    palette: { p: '#eab308', d: '#a16207', l: '#fef08a', b: '#0f172a', s: '#ef4444', t: '#ffffff' },
    grid: [
      "....bbbbbbbb....",
      "...bllllllllb...",
      "..bbssssssssbb..",
      "..bppppppppppb..",
      "..bpbbbbbbbbpb..",
      "..bpbtstststpb..",
      "..bpbsstststpb..",
      "..bpbbbbbbbbpb..",
      "..bppppppppppb.s",
      "..bpddddddddpb.b",
      "..bpbbbbbbbbpb.b",
      "..bppppppppppbbb",
      "..bddddddddddb..",
      "..bbbbbbbbbbbb..",
      "................",
      "................"
    ]
  },
  g: {
    id: 'g', name: 'MONGOLIAN YURT (GER)', walkable: false,
    palette: { p: '#f8fafc', d: '#cbd5e1', l: '#38bdf8', b: '#0f172a', s: '#dc2626', t: '#f59e0b' },
    grid: [
      "......bbbb......",
      "....bbssssbb....",
      "...bssttttssb...",
      "..bppppppppppb..",
      ".bppppppppppppb.",
      "bllllllllllllllb",
      "bppppppppppppppb",
      "bpdpdpbbbbpdpdpb",
      "bpdpppbsbspppdpb",
      "bpdpdpbstsbpdpdb",
      "bpdpppbsbspppdpb",
      "bdddddbbbbdddddb",
      ".bbbbbbbbbbbbbb.",
      "................",
      "................",
      "................"
    ]
  },
  k: {
    id: 'k', name: 'JARS OF KIMCHI (ONGGI)', walkable: false,
    palette: { p: '#78350f', d: '#451a03', l: '#b45309', b: '#0f172a', s: '#dc2626', t: '#fde68a' },
    grid: [
      "................",
      "...bbbb..bbbb...",
      "..bddddbbddddb..",
      "...bbbb..bbbb...",
      "..bllppbbllppb..",
      ".blllpppblllpppb",
      ".blpppppbllppppb",
      ".bppddddbppddddb",
      "..bpddddbbpddddb",
      "..bddddddbdddddb",
      "...bbbbbbbbbbbb.",
      "....ssssssssss..",
      "................",
      "................",
      "................",
      "................"
    ]
  },
  c: {
    id: 'c', name: 'ROYAL CLOCK TOWER (UK)', walkable: false,
    palette: { p: '#d97706', d: '#78350f', l: '#fef3c7', b: '#0f172a', s: '#ffffff', t: '#eab308' },
    grid: [
      ".......bb.......",
      "......bllb......",
      ".....blpplb.....",
      "....bbbbbbbb....",
      "....bppssppb....",
      "...bbpsbbspbb...",
      "...bppssssppb...",
      "...bppppppppb...",
      "...bpddddddb....",
      "...bppppppppb...",
      "...bpddddddb....",
      "...bppppppppb...",
      "..bbddddddddbb..",
      "..bppppppppppb..",
      "..bbbbbbbbbbbb..",
      "................"
    ]
  },
  i: {
    id: 'i', name: 'CELTIC STONE CROSS (IRELAND)', walkable: false,
    palette: { p: '#94a3b8', d: '#475569', l: '#e2e8f0', b: '#0f172a', s: '#22c55e', t: '#64748b' },
    grid: [
      "......bbbb......",
      ".....bllllb.....",
      "....bbppppbb....",
      "...bllpbbpllb...",
      "..bbppppppppbb..",
      "..bllpbssbpllb..",
      "...bbppppppbb...",
      "....bllppllb....",
      ".....bppppb.....",
      ".....bpddpb.....",
      ".....bppppb.....",
      "....bbpddpbb....",
      "...bssssssssb...",
      "..bbbbbbbbbbbb..",
      "................",
      "................"
    ]
  },
  e: {
    id: 'e', name: 'EIFFEL IRON SPIRE (FRANCE)', walkable: false,
    palette: { p: '#78716c', d: '#44403c', l: '#fde047', b: '#1c1917', s: '#f59e0b', t: '#d6d3d1' },
    grid: [
      ".......ll.......",
      ".......bb.......",
      "......bppb......",
      "......bddb......",
      ".....bppppb.....",
      ".....bbbbbb.....",
      "....bpddddpb....",
      "....bppppppb....",
      "...bbbbbbbbbb...",
      "...bppddddppb...",
      "..bbppppppppbb..",
      "..bppbbbbbbppb..",
      ".bbppb....bppbb.",
      ".bppp......pppb.",
      "bbbbb......bbbbb",
      "................"
    ]
  },
  x: {
    id: 'x', name: 'ALPINE TIMBER CHALET (GERMANY)', walkable: false,
    palette: { p: '#f8fafc', d: '#78350f', l: '#dc2626', b: '#0f172a', s: '#38bdf8', t: '#fde047' },
    grid: [
      "......bbbb......",
      "....bbllllbb....",
      "...bllllllllb...",
      "..bllllllllllb..",
      ".bbbbbbbbbbbbbb.",
      "..bpddppppddpb..",
      "..bdppdppdppdb..",
      "..bppddssddppb..",
      "..bddddssddddb..",
      "..bpddppppddpb..",
      "..bdppddddppdb..",
      "..bppddttddppb..",
      "..bddddddddddb..",
      "..bbbbbbbbbbbb..",
      "................",
      "................"
    ]
  },
  w: {
    id: 'w', name: 'LA MANCHA WINDMILL (SPAIN)', walkable: false,
    palette: { p: '#f8fafc', d: '#cbd5e1', l: '#92400e', b: '#0f172a', s: '#38bdf8', t: '#dc2626' },
    grid: [
      ".ll..........ll.",
      "..ll..bbbb..ll..",
      "...llbttttbll...",
      "....lbttttbl....",
      ".....bbllbb.....",
      "....llbpplll....",
      "...ll.pppp.ll...",
      "..ll.pppppp.ll..",
      ".....ppddpp.....",
      "....pppppppp....",
      "....ppddddpp....",
      "....pppbbppp....",
      "....pppbbppp....",
      "...dddddddddd...",
      "...bbbbbbbbbb...",
      "................"
    ]
  },
  z: {
    id: 'z', name: 'AZULEJO TILE ARCH (PORTUGAL)', walkable: false,
    palette: { p: '#2563eb', d: '#1e3a8a', l: '#ffffff', b: '#0f172a', s: '#38bdf8', t: '#facc15' },
    grid: [
      "...bbbbbbbbbb...",
      "..bllllllllllb..",
      ".blppsssssspplb.",
      ".blpsbbbbbbsplb.",
      ".blpsb....bsplb.",
      ".blpsb....bsplb.",
      ".blppb....bpplb.",
      ".bllpb....bpllb.",
      ".blppb....bpplb.",
      ".blpsb....bsplb.",
      ".bllpb....bpllb.",
      ".blttb....bttlb.",
      ".bbbbbbbbbbbbbb.",
      "................",
      "................",
      "................"
    ]
  },
  u: {
    id: 'u', name: 'JUCHE MONOLITH TOWER (NORTH KOREA)', walkable: false,
    palette: { p: '#cbd5e1', d: '#64748b', l: '#ef4444', b: '#0f172a', s: '#facc15', t: '#f8fafc' },
    grid: [
      ".......ss.......",
      "......slls......",
      ".....bllllb.....",
      ".....bllllb.....",
      "......bbbb......",
      ".....bppppb.....",
      ".....bpddpb.....",
      "....bppddppb....",
      "....bppddppb....",
      "....bppppppb....",
      "...bppddddppb...",
      "...bppppppppb...",
      "..bbddddddddbb..",
      "..bppppppppppb..",
      "..bbbbbbbbbbbb..",
      "................"
    ]
  },
  n: {
    id: 'n', name: 'DUTCH TULIP CANAL BED (NETHERLANDS)', walkable: false,
    palette: { p: '#ef4444', d: '#15803d', l: '#facc15', b: '#0f172a', s: '#f472b6', t: '#38bdf8' },
    grid: [
      "................",
      "..p.p..l.l..s.s.",
      ".ppppplllllsssss",
      ".ppppplllllsssss",
      "..ppp..lll..sss.",
      "...d....d....d..",
      "..ddd..ddd..ddd.",
      "..ddd..ddd..ddd.",
      "bbbbbbbbbbbbbbbb",
      "tttttttttttttttt",
      "ttttlllllllltttt",
      "tttttttttttttttt",
      "bbbbbbbbbbbbbbbb",
      "................",
      "................",
      "................"
    ]
  },
  b: {
    id: 'b', name: 'ATOMIUM IRON SPHERE (BELGIUM)', walkable: false,
    palette: { p: '#cbd5e1', d: '#475569', l: '#ffffff', b: '#0f172a', s: '#38bdf8', t: '#94a3b8' },
    grid: [
      "......bbbb......",
      ".....bllllb.....",
      ".....bppppb.....",
      "..bbb..bb..bbb..",
      ".blllb.bb.blllb.",
      ".bpppbbbbbbpppb.",
      "..bbb.bllb.bbb..",
      ".....bppppb.....",
      "....bbddddbb....",
      "...bb..bb..bb...",
      "..bb...bb...bb..",
      ".bbbb..bb..bbbb.",
      ".bpppb.bb.bpppb.",
      "..bbb.bbbb.bbb..",
      ".....bddddb.....",
      "................"
    ]
  },
  m: {
    id: 'm', name: 'CRIMSON SUGAR MAPLE (CANADA)', walkable: false,
    palette: { p: '#dc2626', d: '#991b1b', l: '#f97316', b: '#451a03', s: '#fde047', t: '#ef4444' },
    grid: [
      ".......pp.......",
      ".....pplllp.....",
      "...ddppllllpp...",
      "..ddpppppppppp..",
      ".ddppllssllpppp.",
      ".dppplssssllppp.",
      "..ddppllbbllpp..",
      "...ddppbbbbpp...",
      ".....ppbbbbpp...",
      ".......bbbb.....",
      "......bbbbbb....",
      "......bbbbbb....",
      ".....bbbbbbbb...",
      "................",
      "................",
      "................"
    ]
  },
  s: {
    id: 's', name: 'COPPER LIBERTY TORCH (USA)', walkable: false,
    palette: { p: '#2dd4bf', d: '#0f766e', l: '#fde047', b: '#0f172a', s: '#f97316', t: '#99f6e4' },
    grid: [
      ".......ll.......",
      "......lssl......",
      "......lssl......",
      ".....bbbbbb.....",
      "......bppb......",
      "......bppb......",
      ".....bppppb.....",
      "....bpttttpb....",
      "....bpddddpb....",
      "....bppppppb....",
      "...bbddddddbb...",
      "...bppppppppb...",
      "..bbddddddddbb..",
      "..bbbbbbbbbbbb..",
      "................",
      "................"
    ]
  },
  f: {
    id: 'f', name: 'MESOAMERICAN PYRAMID (MEXICO)', walkable: false,
    palette: { p: '#d97706', d: '#78350f', l: '#fde68a', b: '#1c1917', s: '#dc2626', t: '#b45309' },
    grid: [
      "......bbbb......",
      ".....blsslb.....",
      "....bbbbbbbb....",
      "...bllppppllb...",
      "...bppddddppb...",
      "..bbbbbbbbbbbb..",
      ".bllppppppppllb.",
      ".bppddddddddppb.",
      "bbbbbbbbbbbbbbbb",
      "blllpppppppplllb",
      "bpppddddddddpppb",
      "bbbbbbbbbbbbbbbb",
      "................",
      "................",
      "................",
      "................"
    ]
  },
  a: {
    id: 'a', name: 'HAVANA CHROME CRUISER (CUBA)', walkable: false,
    palette: { p: '#ec4899', d: '#be185d', l: '#e2e8f0', b: '#0f172a', s: '#38bdf8', t: '#fde047' },
    grid: [
      "................",
      "................",
      "....bbbbbbbb....",
      "...bssssssssb...",
      "..bssssssssssb..",
      ".bbbbbbbbbbbbbb.",
      "bppppppppppppppb",
      "btpppppppppppplb",
      "bddddddddddddddb",
      "llllllllllllllll",
      ".bbbbb....bbbbb.",
      ".blllb....blllb.",
      "..bbb......bbb..",
      "................",
      "................",
      "................"
    ]
  },
  h: {
    id: 'h', name: 'CITADELLE FORTRESS CANNON (HAITI)', walkable: false,
    palette: { p: '#334155', d: '#0f172a', l: '#94a3b8', b: '#020617', s: '#b45309', t: '#facc15' },
    grid: [
      "................",
      "................",
      "..bbbb..........",
      ".bllllbbbb......",
      ".bppppppppbbbb..",
      ".bddddddddppppb.",
      "..bbbbbbbbddddb.",
      "....bssssb.bbbb.",
      "...bssssssb.....",
      "..bssssssssb....",
      "..bbll..llbb....",
      ".bblb....blbb...",
      "..bb......bb....",
      "................",
      "................",
      "................"
    ]
  },
  j: {
    id: 'j', name: 'REGGAE SOUND SYSTEM STACK (JAMAICA)', walkable: false,
    palette: { p: '#16a34a', d: '#1e293b', l: '#facc15', b: '#0f172a', s: '#dc2626', t: '#94a3b8' },
    grid: [
      "..bbbbbbbbbbbb..",
      "..bssssssssssb..",
      "..bsbddbbddbsb..",
      "..bsbdtbbtdbsb..",
      "..bssssssssssb..",
      "..bbbbbbbbbbbb..",
      "..bllllllllllb..",
      "..blbddbbddblb..",
      "..blbdtbbtdblb..",
      "..bllllllllllb..",
      "..bbbbbbbbbbbb..",
      "..bppppppppppb..",
      "..bpbbbbbbbbpb..",
      "..bppppppppppb..",
      "..bbbbbbbbbbbb..",
      "................"
    ]
  },
  q: {
    id: 'q', name: 'PINK CONCH SHELL MONUMENT (BAHAMAS)', walkable: false,
    palette: { p: '#f472b6', d: '#db2777', l: '#fce7f3', b: '#0f172a', s: '#fde047', t: '#38bdf8' },
    grid: [
      ".......bb.......",
      ".....bbllbb.....",
      "....bllppllb....",
      "...blppddpplb...",
      "..blppdssdpppb..",
      "..bppdssbsddpb..",
      ".blppdsbbbsdpb..",
      ".bppddssssddppb.",
      ".bpppddddddpppb.",
      "..bppppppppppb..",
      "...bbppppppbb...",
      "....tttttttt....",
      "...bbbbbbbbbb...",
      "................",
      "................",
      "................"
    ]
  },
  d: {
    id: 'd', name: 'COLONIAL CORAL LIMESTONE ARCH (DOMINICAN REP.)', walkable: false,
    palette: { p: '#fde68a', d: '#b45309', l: '#fffbeb', b: '#451a03', s: '#38bdf8', t: '#f59e0b' },
    grid: [
      "......bbbb......",
      ".....bllllb.....",
      "....bbttttbb....",
      "..bbllllllllbb..",
      ".bppppppppppppb.",
      ".bppddddddddppb.",
      ".bppdbbbbbbdppb.",
      ".bppdbssssbdppb.",
      ".bppdbssssbdppb.",
      ".bppdb....bdppb.",
      ".bppdb....bdppb.",
      ".bdddd....ddddb.",
      ".bbbbbbbbbbbbbb.",
      "................",
      "................",
      "................"
    ]
  },
  l: {
    id: 'l', name: 'CARIBBEAN COCONUT PALM', walkable: false,
    palette: { p: '#22c55e', d: '#15803d', l: '#86efac', b: '#78350f', s: '#451a03', t: '#fde047' },
    grid: [
      "....lll..lll....",
      "..llppppppllll..",
      ".llppddddppppll.",
      ".pp..dsssd..ppp.",
      ".....dsssd......",
      "......bbb.......",
      "......bsb.......",
      ".....bbp........",
      ".....bsb........",
      "......bbb.......",
      "......bsb.......",
      "......bbb.......",
      ".....bbbbb......",
      "....ttttttt.....",
      "................",
      "................"
    ]
  },
  v: {
    id: 'v', name: 'TABLE MOUNTAIN SANDSTONE BLUFF (SOUTH AFRICA)', walkable: false,
    palette: { p: '#a8a29e', d: '#57534e', l: '#f5f5f4', b: '#1c1917', s: '#22c55e', t: '#78716c' },
    grid: [
      "................","..bbbbbbbbbbbb..",".bllllllllllllb.","bppppppppppppppb","bpttttttttttttpb","bpddddddddddddpb","bppddppppppddppb","bddddddddddddd.b".replace(/\./,'d'),"bbssssssssssssbb",".bbbbbbbbbbbbbb.","................","................","................","................","................","................"
    ]
  },
  p: {
    id: 'p', name: 'AFRICAN BAOBAB TREE (BOTSWANA / ZIMBABWE)', walkable: false,
    palette: { p: '#16a34a', d: '#78350f', l: '#4ade80', b: '#292524', s: '#92400e', t: '#15803d' },
    grid: [
      "..llll....llll..",".llpppl..lpppll.",".lppppppppppppl.","..ttttbbbbtttt..","....bbddddbb....","....bdsddsdb....","...bbddddddbb...","...bdsddddsdb...","...bddddddddb...","..bbdsddddsdbb..","..bddddddddddb..","..bbbbbbbbbbbb..","................","................","................","................"
    ]
  },
  r: {
    id: 'r', name: 'GREAT ZIMBABWE CONICAL TOWER (ZIMBABWE)', walkable: false,
    palette: { p: '#78716c', d: '#44403c', l: '#d6d3d1', b: '#1c1917', s: '#a8a29e', t: '#57534e' },
    grid: [
      "......bbbb......",".....bllllb.....",".....bpddpb.....","....bssppssb....","....bppddppb....","...bssttttssb...","...bppddddppb...","...bssssssssb...","..bppddddddppb..","..bssttttttssb..","..bppddddddppb..",".bssssssssssssb.",".bbbbbbbbbbbbbb.","................","................","................"
    ]
  },
  t: {
    id: 't', name: 'BASOTHO MOKOROTLO CONICAL HUT (LESOTHO / ESWATINI)', walkable: false,
    palette: { p: '#d97706', d: '#92400e', l: '#fde68a', b: '#451a03', s: '#e7e5e4', t: '#78350f' },
    grid: [
      ".......bb.......","......bllb......",".....bppppb.....","....bpddddpb....","...bppppppppb...","..bpddddddddpb..",".bbbbbbbbbbbbbb.","..bssssssssssb..","..bsssbbbbsssb..","..bsssbttbsssb..","..bsssbttbsssb..","..bssssssssssb..","..bbbbbbbbbbbb..","................","................","................"
    ]
  },
  y: {
    id: 'y', name: 'SOSSUSVLEI RED STAR DUNE (NAMIBIA)', walkable: false,
    palette: { p: '#ea580c', d: '#9a3412', l: '#fdba74', b: '#431407', s: '#f97316', t: '#fed7aa' },
    grid: [
      ".......bb.......","......blpb......",".....bllppb.....","....blllppdb....","...bllllpppddb..","..bllllppppdddb.",".blllllppppddddb","bllllllppppddddb","bssssssddddddddb",".bbbbbbbbbbbbbb.","................","................","................","................","................","................"
    ]
  },
  o: {
    id: 'o', name: 'INDIAN OCEAN DHOW SAIL (MOZAMBIQUE)', walkable: false,
    palette: { p: '#f8fafc', d: '#cbd5e1', l: '#ffffff', b: '#0f172a', s: '#78350f', t: '#0284c7' },
    grid: [
      ".........bb.....",".......bbllb....",".....bblllpb....","...bbllllpppb...","..blllllppppb...",".bllllpppppddb..","..bbbbbbbbbbbbb.","......bssssb....","..bbbbssssssbbbb","..bssssssssssssb","...bssssssssssb.","..tttttttttttttt","................","................","................","................"
    ]
  },
  '~': {
    id: '~', name: 'WILD DESERT SAND DUNE', walkable: true,
    palette: { p: '#f59e0b', d: '#b45309', l: '#fde68a', b: '#78350f', s: '#fbbf24', t: '#fef3c7' },
    grid: [
      "pppppppppppppppp","pppppppppppppppp","ppststpppppppppp","ppppststppppdddd","pppppppppppppppp","ppppddddpppppppp","ppppppppppststpp","ppststpppppppppp","pppppppppppppppp","ppppppppddddpppp","ppllllpppppppppp","ppppllllppppstst","pppppppppppppppp","ppppddddpppppppp","pppppppppppppppp","pppppppppppppppp"
    ]
  },
  '1': {
    id: '1', name: 'ULURU RED MONOLITH (AUSTRALIA)', walkable: false,
    palette: { p: '#c2410c', d: '#7c2d12', l: '#fb923c', b: '#431407', s: '#ea580c', t: '#fed7aa' },
    grid: [
      "................","................","....bbbbbbbb....","..bbllllllllbb..",".blpppppppppplb.","blppddppppddpplb","bppddddddddddppb","bpddppppppppddpb","bddddddddddddddb","bbbbbbbbbbbbbbbb","................","................","................","................","................","................"
    ]
  },
  '2': {
    id: '2', name: 'MAORI CARVED TOTEM POU (NEW ZEALAND)', walkable: false,
    palette: { p: '#991b1b', d: '#450a0a', l: '#ef4444', b: '#0f172a', s: '#2dd4bf', t: '#fde047' },
    grid: [
      ".....bbbbbb.....","....bllllllb....","....bpsbbspb....","....bppttpbb....","....bddddddB....".replace(/B/,'b'),"....bbbbbbbb....","....bllllllb....","....bssbbssb....","....bppppppb....","....bpddddpb....","....bppppppb....","....bddddddb....","...bbbbbbbbbb...","................","................","................"
    ]
  },
  '3': {
    id: '3', name: 'FUNAFUTI CORAL ATOLL BEACON (TUVALU)', walkable: false,
    palette: { p: '#38bdf8', d: '#0284c7', l: '#fef08a', b: '#0f172a', s: '#f43f5e', t: '#ffffff' },
    grid: [
      ".......ll.......","......lttl......","......bbbb......",".....bssssb.....",".....bttttb.....",".....bssssb.....","....bbttttbb....","....bssssssb....","...bbppppppbb...","..bbddddddddbb..","..bbbbbbbbbbbb..","................","................","................","................","................"
    ]
  },
  '4': {
    id: '4', name: 'SAMOAN DOMED FALE (SAMOA)', walkable: false,
    palette: { p: '#d97706', d: '#92400e', l: '#fde68a', b: '#451a03', s: '#78350f', t: '#fef3c7' },
    grid: [
      ".....bbbbbb.....","...bbllllllbb...","..bllppppppllb..",".blpppppppppplb.",".bpddddddddddpb.","bbbbbbbbbbbbbbbb",".bss..bssb..ssb.",".bss..bssb..ssb.",".bss..bssb..ssb.",".bttttttttttttb.",".bbbbbbbbbbbbbb.","................","................","................","................","................"
    ]
  },
  '5': {
    id: '5', name: 'SLEEPING GIANT ORCHID ARCH (FIJI)', walkable: false,
    palette: { p: '#d946ef', d: '#15803d', l: '#f5d0fe', b: '#052e16', s: '#fde047', t: '#22c55e' },
    grid: [
      "....ppp..ppp....","..pppsl..lsppp..",".pppsslbblssppp.",".ppttbbbbbbttpp.","..tbb......bbt..","..tb........bt..","..db........bd..","..db........bd..","..db........bd..",".ddbb......bbdd.",".bbbb......bbbb.","................","................","................","................","................"
    ]
  },
  '6': {
    id: '6', name: 'HAAMONGA CORAL TRILITHON (TONGA)', walkable: false,
    palette: { p: '#d6d3d1', d: '#78716c', l: '#f5f5f4', b: '#1c1917', s: '#a8a29e', t: '#57534e' },
    grid: [
      "................",".bbbbbbbbbbbbbb.","bllllllllllllllb","bppppppppppppppb","bddddddddddddddb",".bbbbbbbbbbbbbb.","..bllpb..bpllb..","..bppdb..bpddb..","..bppdb..bpddb..","..bppdb..bpddb..","..bppdb..bpddb..","..bdddd..ddddb..","..bbbbb..bbbbb..","................","................","................"
    ]
  },
  '7': {
    id: '7', name: 'MOUNT YASUR ASH CALDERA (VANUATU)', walkable: false,
    palette: { p: '#44403c', d: '#1c1917', l: '#f97316', b: '#09090b', s: '#fde047', t: '#dc2626' },
    grid: [
      "....s..ll..s....",".....llssll.....","....bbttttbb....","...bppddddppb...","..bppddddddppb..",".bppddttttddppb.",".bpddtlllltddpb.","bpddddddddddddpb","bddddddddddddddb","bbbbbbbbbbbbbbbb","................","................","................","................","................","................"
    ]
  },
  '8': {
    id: '8', name: 'SOLOMON PROW CANOE (SOLOMON ISLANDS)', walkable: false,
    palette: { p: '#78350f', d: '#451a03', l: '#67e8f9', b: '#0f172a', s: '#f8fafc', t: '#0284c7' },
    grid: [
      "................","..bb........bb..",".bllb......bllb.",".blpb......bplb.",".bpdbbbbbbbbdpb.","..bpppsssspppp..","..bpppddddpppp..","...bddddddddb...","....bbbbbbbb....","..tttttttttttt..","................","................","................","................","................","................"
    ]
  },
  BERRY: {
    id: 'BERRY', name: 'WILD FLOOR BERRY', walkable: false, obtainable: true,
    palette: { p: '#a855f7', d: '#581c87', l: '#f3e8ff', b: '#0f172a', s: '#e9d5ff', t: '#fde047' },
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

/********************************************************************
 * EXTRACTED OBSTACLE CONSTANTS, FLOOR ITEMS & INTERACTION FACTS
 ********************************************************************/
const BLOCKED_TILE_FALLBACK_SET = new Set([
  'T','W','H','R','I','C','K','L','S','V','U','A','N','Q','Y','J','O','Z','X',
  'g','k','c','i','e','x','w','z','u','n','b','m','s','f','a','h','j','q','d','l','v','p','r','t','y','o',
  '1','2','3','4','5','6','7','8'
]);

const FLOOR_ITEM_TYPES = [
  // --- BERRIES ---
  { id: 'oran_berry',       name: 'ORAN BERRY',       category: 'BERRY', tileKey: 'BERRY', color: '#3b82f6', highlight: '#93c5fd', desc: 'Restored +50 HP to your active partner!' },
  { id: 'sitrus_berry',     name: 'SITRUS BERRY',     category: 'BERRY', tileKey: 'BERRY', color: '#facc15', highlight: '#fef08a', desc: 'Fully restored your active partner\'s HP!' },

  // --- ELEMENTAL EVOLUTION STONES ---
  { id: 'fire_stone',       name: 'FIRE STONE',       category: 'STONE', tileKey: 'STONE', stoneType: 'FIRE',        stoneLabel: 'FIRE STONE',       color: '#f97316', highlight: '#fde047', desc: 'Evolves Vulpix, Growlithe, Eevee (into Flareon), Pansear, or Capsakid!' },
  { id: 'water_stone',      name: 'WATER STONE',      category: 'STONE', tileKey: 'STONE', stoneType: 'WATER',       stoneLabel: 'WATER STONE',      color: '#0284c7', highlight: '#7dd3fc', desc: 'Evolves Poliwhirl, Shellder, Staryu, Eevee (into Vaporeon), Lombre, or Panpour!' },
  { id: 'thunder_stone',    name: 'THUNDER STONE',    category: 'STONE', tileKey: 'STONE', stoneType: 'THUNDER',     stoneLabel: 'THUNDER STONE',    color: '#eab308', highlight: '#fef08a', desc: 'Evolves Pikachu, Eevee (into Jolteon), Magneton, Nosepass, Eelektrik, Charjabug, or Tadbulb!' },
  { id: 'leaf_stone',       name: 'LEAF STONE',       category: 'STONE', tileKey: 'STONE', stoneType: 'LEAF',        stoneLabel: 'LEAF STONE',       color: '#16a34a', highlight: '#86efac', desc: 'Evolves Gloom, Weepinbell, Exeggcute, Eevee (into Leafeon), Nuzleaf, or Pansage!' },
  { id: 'moon_stone',       name: 'MOON STONE',       category: 'STONE', tileKey: 'STONE', stoneType: 'MOON',        stoneLabel: 'MOON STONE',       color: '#a855f7', highlight: '#e9d5ff', desc: 'Evolves Nidorina, Nidorino, Clefairy, Jigglypuff, Eevee (into Umbreon), Skitty, or Munna!' },
  { id: 'sun_stone',        name: 'SUN STONE',        category: 'STONE', tileKey: 'STONE', stoneType: 'SUN',         stoneLabel: 'SUN STONE',        color: '#dc2626', highlight: '#fde047', desc: 'Evolves Gloom (into Bellossom), Eevee (into Espeon), Sunkern, Cottonee, Petilil, or Helioptile!' },
  { id: 'ice_stone',        name: 'ICE STONE',        category: 'STONE', tileKey: 'STONE', stoneType: 'ICE',         stoneLabel: 'ICE STONE',        color: '#38bdf8', highlight: '#e0f2fe', desc: 'Evolves Eevee (into Glaceon), Crabrawler, or Cetoddle!' },
  { id: 'shiny_stone',      name: 'SHINY STONE',      category: 'STONE', tileKey: 'STONE', stoneType: 'SHINY',       stoneLabel: 'SHINY STONE',      color: '#f472b6', highlight: '#fce7f3', desc: 'Evolves Eevee (into Sylveon), Togetic, Roselia, Minccino, or Floette!' },
  { id: 'dusk_stone',       name: 'DUSK STONE',       category: 'STONE', tileKey: 'STONE', stoneType: 'DUSK',        stoneLabel: 'DUSK STONE',       color: '#4c1d95', highlight: '#c084fc', desc: 'Evolves Murkrow, Misdreavus, Lampent, or Doublade!' },
  { id: 'dawn_stone',       name: 'DAWN STONE',       category: 'STONE', tileKey: 'STONE', stoneType: 'DAWN',        stoneLabel: 'DAWN STONE',       color: '#06b6d4', highlight: '#a5f3fc', desc: 'Evolves Kirlia (into Gallade) or Snorunt (into Froslass)!' },
  { id: 'oval_stone',       name: 'OVAL STONE',       category: 'STONE', tileKey: 'STONE', stoneType: 'OVAL',        stoneLabel: 'OVAL STONE',       color: '#fbcfe8', highlight: '#ffffff', desc: 'Evolves Happiny into Chansey!' },

  // --- HELD & TRADE EVOLUTION ITEMS (GENS 2 - 6) ---
  { id: 'linking_cord',     name: 'LINKING CORD',     category: 'STONE', tileKey: 'STONE', stoneType: 'LINK',        stoneLabel: 'LINKING CORD',     color: '#334155', highlight: '#38bdf8', desc: 'Evolves Kadabra, Machoke, Graveler, Haunter, Boldore, Gurdurr, Phantump, or Pumpkaboo!' },
  { id: 'kings_rock',       name: 'KINGS ROCK',       category: 'STONE', tileKey: 'STONE', stoneType: 'KINGS',       stoneLabel: 'KINGS ROCK',       color: '#eab308', highlight: '#ffffff', desc: 'Evolves Poliwhirl (into Politoed) or Slowpoke (into Slowking)!' },
  { id: 'metal_coat',       name: 'METAL COAT',       category: 'STONE', tileKey: 'STONE', stoneType: 'METAL',       stoneLabel: 'METAL COAT',       color: '#94a3b8', highlight: '#f8fafc', desc: 'Evolves Onix (into Steelix), Scyther (into Scizor), or Meltan (into Melmetal)!' },
  { id: 'dragon_scale',     name: 'DRAGON SCALE',     category: 'STONE', tileKey: 'STONE', stoneType: 'DRAGON',      stoneLabel: 'DRAGON SCALE',     color: '#2563eb', highlight: '#93c5fd', desc: 'Evolves Seadra into Kingdra!' },
  { id: 'up_grade',         name: 'UP-GRADE',         category: 'STONE', tileKey: 'STONE', stoneType: 'UPGRADE',     stoneLabel: 'UP-GRADE',         color: '#f43f5e', highlight: '#38bdf8', desc: 'Evolves Porygon into Porygon2!' },
  { id: 'dubious_disc',     name: 'DUBIOUS DISC',     category: 'STONE', tileKey: 'STONE', stoneType: 'DUBIOUS',     stoneLabel: 'DUBIOUS DISC',     color: '#ec4899', highlight: '#38bdf8', desc: 'Evolves Porygon2 into Porygon-Z!' },
  { id: 'deep_sea_tooth',   name: 'DEEP SEA TOOTH',   category: 'STONE', tileKey: 'STONE', stoneType: 'TOOTH',       stoneLabel: 'DEEP SEA TOOTH',   color: '#0284c7', highlight: '#e0f2fe', desc: 'Evolves Clamperl into Huntail!' },
  { id: 'deep_sea_scale',   name: 'DEEP SEA SCALE',   category: 'STONE', tileKey: 'STONE', stoneType: 'SCALE',       stoneLabel: 'DEEP SEA SCALE',   color: '#ec4899', highlight: '#fbcfe8', desc: 'Evolves Clamperl into Gorebyss!' },
  { id: 'prism_scale',      name: 'PRISM SCALE',      category: 'STONE', tileKey: 'STONE', stoneType: 'PRISM',       stoneLabel: 'PRISM SCALE',      color: '#f472b6', highlight: '#67e8f9', desc: 'Evolves Feebas into Milotic!' },
  { id: 'protector',        name: 'PROTECTOR',        category: 'STONE', tileKey: 'STONE', stoneType: 'PROTECTOR',   stoneLabel: 'PROTECTOR',        color: '#ea580c', highlight: '#fdba74', desc: 'Evolves Rhydon into Rhyperior!' },
  { id: 'electirizer',      name: 'ELECTIRIZER',      category: 'STONE', tileKey: 'STONE', stoneType: 'ELECTIRIZER', stoneLabel: 'ELECTIRIZER',      color: '#facc15', highlight: '#0f172a', desc: 'Evolves Electabuzz into Electivire!' },
  { id: 'magmarizer',       name: 'MAGMARIZER',       category: 'STONE', tileKey: 'STONE', stoneType: 'MAGMARIZER',  stoneLabel: 'MAGMARIZER',       color: '#dc2626', highlight: '#fde047', desc: 'Evolves Magmar into Magmortar!' },
  { id: 'reaper_cloth',     name: 'REAPER CLOTH',     category: 'STONE', tileKey: 'STONE', stoneType: 'REAPER',      stoneLabel: 'REAPER CLOTH',     color: '#475569', highlight: '#e2e8f0', desc: 'Evolves Dusclops into Dusknoir!' },
  { id: 'razor_claw',       name: 'RAZOR CLAW',       category: 'STONE', tileKey: 'STONE', stoneType: 'RAZOR_CLAW',  stoneLabel: 'RAZOR CLAW',       color: '#cbd5e1', highlight: '#ef4444', desc: 'Evolves Sneasel into Weavile or Sneasler!' },
  { id: 'razor_fang',       name: 'RAZOR FANG',       category: 'STONE', tileKey: 'STONE', stoneType: 'RAZOR_FANG',  stoneLabel: 'RAZOR FANG',       color: '#e2e8f0', highlight: '#a855f7', desc: 'Evolves Gligar into Gliscor!' },
  { id: 'whipped_dream',    name: 'WHIPPED DREAM',    category: 'STONE', tileKey: 'STONE', stoneType: 'WHIPPED',     stoneLabel: 'WHIPPED DREAM',    color: '#fdf2f8', highlight: '#f43f5e', desc: 'Evolves Swirlix into Slurpuff!' },
  { id: 'sachet',           name: 'SACHET',           category: 'STONE', tileKey: 'STONE', stoneType: 'SACHET',      stoneLabel: 'SACHET',           color: '#ec4899', highlight: '#fbcfe8', desc: 'Evolves Spritzee into Aromatisse!' },

  // --- REGIONAL & MODERN EVOLUTION ITEMS (GENS 8 - 9 & HISUI) ---
  { id: 'tart_apple',       name: 'TART APPLE',       category: 'STONE', tileKey: 'STONE', stoneType: 'TART_APPLE',  stoneLabel: 'TART APPLE',       color: '#22c55e', highlight: '#ef4444', desc: 'Evolves Applin into Flapple!' },
  { id: 'sweet_apple',      name: 'SWEET APPLE',      category: 'STONE', tileKey: 'STONE', stoneType: 'SWEET_APPLE', stoneLabel: 'SWEET APPLE',      color: '#ef4444', highlight: '#fde047', desc: 'Evolves Applin into Appletun!' },
  { id: 'syrupy_apple',     name: 'SYRUPY APPLE',     category: 'STONE', tileKey: 'STONE', stoneType: 'SYRUP_APPLE', stoneLabel: 'SYRUPY APPLE',     color: '#dc2626', highlight: '#84cc16', desc: 'Evolves Applin into Dipplin!' },
  { id: 'cracked_pot',      name: 'CRACKED POT',      category: 'STONE', tileKey: 'STONE', stoneType: 'CRACKED_POT', stoneLabel: 'CRACKED POT',      color: '#a855f7', highlight: '#f3e8ff', desc: 'Evolves Sinistea into Polteageist!' },
  { id: 'unremarkable_cup', name: 'UNREMARKABLE CUP', category: 'STONE', tileKey: 'STONE', stoneType: 'MATCHA_CUP',  stoneLabel: 'UNREMARKABLE CUP', color: '#84cc16', highlight: '#fef08a', desc: 'Evolves Poltchageist into Sinistcha!' },
  { id: 'strawberry_sweet', name: 'STRAWBERRY SWEET', category: 'STONE', tileKey: 'STONE', stoneType: 'SWEET',       stoneLabel: 'STRAWBERRY SWEET', color: '#f43f5e', highlight: '#fce7f3', desc: 'Evolves Milcery into Alcremie!' },
  { id: 'scroll_of_waters', name: 'SCROLL OF WATERS', category: 'STONE', tileKey: 'STONE', stoneType: 'SCROLL',      stoneLabel: 'SCROLL OF WATERS', color: '#38bdf8', highlight: '#fef3c7', desc: 'Evolves Kubfu into Urshifu!' },
  { id: 'black_augurite',   name: 'BLACK AUGURITE',   category: 'STONE', tileKey: 'STONE', stoneType: 'AUGURITE',    stoneLabel: 'BLACK AUGURITE',   color: '#1c1917', highlight: '#a16207', desc: 'Evolves Scyther into Kleavor!' },
  { id: 'peat_block',       name: 'PEAT BLOCK',       category: 'STONE', tileKey: 'STONE', stoneType: 'PEAT_BLOCK',  stoneLabel: 'PEAT BLOCK',       color: '#78350f', highlight: '#facc15', desc: 'Evolves Ursaring into Ursaluna!' },
  { id: 'auspicious_armor', name: 'AUSPICIOUS ARMOR', category: 'STONE', tileKey: 'STONE', stoneType: 'AUSPICIOUS',  stoneLabel: 'AUSPICIOUS ARMOR', color: '#dc2626', highlight: '#facc15', desc: 'Evolves Charcadet into Armarouge!' },
  { id: 'malicious_armor',  name: 'MALICIOUS ARMOR',  category: 'STONE', tileKey: 'STONE', stoneType: 'MALICIOUS',   stoneLabel: 'MALICIOUS ARMOR',  color: '#4c1d95', highlight: '#38bdf8', desc: 'Evolves Charcadet into Ceruledge!' },
  { id: 'leaders_crest',    name: 'LEADERS CREST',    category: 'STONE', tileKey: 'STONE', stoneType: 'CREST',       stoneLabel: 'LEADERS CREST',    color: '#991b1b', highlight: '#fde047', desc: 'Evolves Bisharp into Kingambit!' },
  { id: 'gimmighoul_coin',  name: 'GIMMIGHOUL COIN',  category: 'STONE', tileKey: 'STONE', stoneType: 'COIN',        stoneLabel: 'GIMMIGHOUL COIN',  color: '#facc15', highlight: '#fef9c3', desc: 'Evolves Gimmighoul into Gholdengo!' },
  { id: 'metal_alloy',      name: 'METAL ALLOY',      category: 'STONE', tileKey: 'STONE', stoneType: 'ALLOY',       stoneLabel: 'METAL ALLOY',      color: '#64748b', highlight: '#38bdf8', desc: 'Evolves Duraludon into Archaludon!' }
];

const OBSTACLE_FACTS_MAP = {
  G: ["Tall wild grass! Step inside to encounter wild monsters native to this area!", "TALL GRASS", "HABITAT"],
  M: ["Nutrient-rich swamp mud! Step inside the mud to encounter wild wetland monsters!", "SWAMP MUD", "WETLANDS HABITAT"],
  '~': ["Wind-swept desert sand! Step across the loose sand dunes to encounter burrowing desert monsters!", "DESERT SAND", "ARID HABITAT"],
  T: ["Canopy tree! Trees absorb Carbon Dioxide through leaf Stomata and use Chlorophyll to produce Oxygen and glucose!", "CANOPY TREE", "BOTANY"],
  R: ["Solid crag boulder! The Rock Cycle transitions rocks between Igneous, Sedimentary, and Metamorphic states!", "CRAG BOULDER", "GEOLOGY"],
  I: ["Crystalline glacier ice block! Ordinary water ice forms a Hexagonal crystal lattice at 0C!", "GLACIER ICE", "GLACIOLOGY"],
  C: ["Desert saguaro cactus! Succulents store water in thick stems and use spines to minimize transpiration!", "SAGUARO CACTUS", "XEROPHYTE"],
  K: ["Marine reef coral! Coral reefs are built by calcium-carbonate-secreting polyps in symbiosis with algae!", "REEF CORAL", "MARINE ECOLOGY"],
  L: ["Molten lava pool! Underground molten rock is Magma, and once it erupts onto the surface it is Lava!", "MOLTEN LAVA", "VOLCANOLOGY"],
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
  l: ["Caribbean Coconut Palm! Buoyant fibrous husks allow coconut seeds (drupes) to float across ocean currents and colonize tropical islands!", "COCONUT PALM", "ECOLOGY"],
  v: ["Table Mountain Sandstone Bluff! Flat-topped quartzitic sandstone mesas resist wind and water erosion over hundreds of millions of years!", "TABLE MOUNTAIN BLUFF", "GEOLOGY"],
  p: ["African Baobab Tree (Adansonia digitata)! Its spongy, fibrous trunk can store over 100,000 liters of water to survive severe dry seasons!", "BAOBAB TREE", "BOTANY"],
  r: ["Great Zimbabwe Conical Tower! Built from heat-fractured granite blocks stacked in dry-stone courses without a single drop of mortar!", "CONICAL TOWER", "ARCHAEOLOGY"],
  t: ["Basotho Mokorotlo Conical Hut! Thick stone walls and thatched grass roofs provide high thermal mass, keeping interiors cool in summer and warm in winter!", "MOKOROTLO HUT", "THERMODYNAMICS"],
  y: ["Sossusvlei Red Star Dune! Namib desert quartz sands owe their deep red-orange hue to a coating of oxidized iron (hematite) aged over millions of years!", "RED STAR DUNE", "MINERALOGY"],
  o: ["Indian Ocean Dhow Sail! Triangular lateen sails allow traditional wooden vessels to tack upwind using aerodynamic lift across monsoon trade winds!", "DHOW SAIL", "AERODYNAMICS"],
  '1': ["Uluru Arkose Sandstone Monolith (Australia)! Its iron-bearing feldspar minerals oxidize into a glowing rust-red surface!", "ULURU MONOLITH", "GEOLOGY"],
  '2': ["Maori Carved Totem Pou (New Zealand)! Carved from native Totara heartwood rich in natural rot-resistant oils!", "MAORI TOTEM POU", "BOTANY & CULTURE"],
  '3': ["Funafuti Coral Atoll Beacon (Tuvalu)! Ring-shaped coral atolls form as fringing reefs grow upward while volcanic islands subside!", "ATOLL BEACON", "MARINE GEOLOGY"],
  '4': ["Samoan Open-Air Fale (Samoa)! Domed timber roofs lashed with braided coconut sennit rope flex safely during tropical cyclones!", "SAMOAN FALE", "STRUCTURAL ENGINEERING"],
  '5': ["Sleeping Giant Orchid Arch (Fiji)! Tropical epiphytic orchids absorb moisture and nutrients directly from humid air using aerial velamen roots!", "ORCHID ARCH", "BOTANY"],
  '6': ["Ha'amonga 'a Maui Trilithon (Tonga)! Built in the 13th century from three 40-ton coral limestone slabs mortised into upright lintels!", "TONGAN TRILITHON", "ARCHAEOLOGY"],
  '7': ["Mount Yasur Strombolian Crater (Vanuatu)! Regular gas-slug bursts eject incandescent magma bombs along the New Hebrides subduction zone!", "YASUR VOLCANO", "VOLCANOLOGY"],
  '8': ["Solomon Melanesian Prow Canoe (Solomon Islands)! Inlaid with mother-of-pearl nacre, which diffracts light into iridescent colors!", "PROW CANOE", "OPTICS & NAVIGATION"]
};

function getObstacleFact(tile) {
  if (tile === 'W') {
    const unlocked = (typeof isSurfUnlocked === 'function') && isSurfUnlocked();
    return [
      unlocked
        ? "Crystal-clear water! SURF is unlocked—step directly onto the water to ride your surfboard!"
        : "Crystal-clear water! Catch 70 Pokemon to unlock North America and the SURF surfboard ability!",
      "WATER'S EDGE",
      "HYDROLOGY"
    ];
  }
  return OBSTACLE_FACTS_MAP[tile] || null;
}