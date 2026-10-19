/********************************************************************
 * monsters.js
 * Complete 18-Type Elemental System & 32 Monster Roster (Base + 20 New + Evolutions)
 ********************************************************************/

const ELEMENT_TYPES = {
  NORMAL:   { id: 'NORMAL',   name: 'NORMAL',   subject: 'Everyday Logic & Facts', badgeClass: 'bg-slate-500',   btnClass: 'bg-slate-500 hover:bg-slate-400 text-white' },
  FIRE:     { id: 'FIRE',     name: 'FIRE',     subject: 'Chemistry & Physics',    badgeClass: 'bg-orange-600',  btnClass: 'bg-orange-600 hover:bg-orange-500 text-white' },
  WATER:    { id: 'WATER',    name: 'WATER',    subject: 'Ocean & Earth',         badgeClass: 'bg-sky-600',     btnClass: 'bg-sky-600 hover:bg-sky-500 text-white' },
  GRASS:    { id: 'GRASS',    name: 'GRASS',    subject: 'Ecology & Nature',      badgeClass: 'bg-emerald-600', btnClass: 'bg-emerald-600 hover:bg-emerald-500 text-white' },
  ELECTRIC: { id: 'ELECTRIC', name: 'ELECTRIC', subject: 'Tech, Logic & Math',    badgeClass: 'bg-amber-500',  btnClass: 'bg-amber-500 hover:bg-amber-400 text-slate-950' },
  ICE:      { id: 'ICE',      name: 'ICE',      subject: 'Cryogenics & Climate',  badgeClass: 'bg-cyan-500',   btnClass: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' },
  FIGHTING: { id: 'FIGHTING', name: 'FIGHTING', subject: 'Kinetic Energy & Force',badgeClass: 'bg-red-700',    btnClass: 'bg-red-700 hover:bg-red-600 text-white' },
  POISON:   { id: 'POISON',   name: 'POISON',   subject: 'Biochemistry & Toxins', badgeClass: 'bg-purple-600',  btnClass: 'bg-purple-600 hover:bg-purple-500 text-white' },
  GROUND:   { id: 'GROUND',   name: 'GROUND',   subject: 'Geology & Tectonics',   badgeClass: 'bg-yellow-700',  btnClass: 'bg-yellow-700 hover:bg-yellow-600 text-white' },
  FLYING:   { id: 'FLYING',   name: 'FLYING',   subject: 'Aerodynamics & Altitude',badgeClass: 'bg-indigo-400',  btnClass: 'bg-indigo-400 hover:bg-indigo-300 text-slate-950' },
  PSYCHIC:  { id: 'PSYCHIC',  name: 'PSYCHIC',  subject: 'Mind & Neuroscience',   badgeClass: 'bg-pink-600',    btnClass: 'bg-pink-600 hover:bg-pink-500 text-white' },
  BUG:      { id: 'BUG',      name: 'BUG',      subject: 'Entomology & Zoology',  badgeClass: 'bg-lime-600',    btnClass: 'bg-lime-600 hover:bg-lime-500 text-white' },
  ROCK:     { id: 'ROCK',     name: 'ROCK',     subject: 'Mineralogy & Crystals', badgeClass: 'bg-stone-600',   btnClass: 'bg-stone-600 hover:bg-stone-500 text-white' },
  GHOST:    { id: 'GHOST',    name: 'GHOST',    subject: 'Quantum & Mysteries',   badgeClass: 'bg-purple-900',  btnClass: 'bg-purple-900 hover:bg-purple-800 text-white' },
  DRAGON:   { id: 'DRAGON',   name: 'DRAGON',   subject: 'Mythology & Genetics',  badgeClass: 'bg-indigo-800',  btnClass: 'bg-indigo-800 hover:bg-indigo-700 text-white' },
  DARK:     { id: 'DARK',     name: 'DARK',     subject: 'Astrophysics & Shadows',badgeClass: 'bg-zinc-800',    btnClass: 'bg-zinc-800 hover:bg-zinc-700 text-white' },
  STEEL:    { id: 'STEEL',    name: 'STEEL',    subject: 'Metallurgy & Materials',badgeClass: 'bg-slate-400',   btnClass: 'bg-slate-400 hover:bg-slate-300 text-slate-950' },
  FAIRY:    { id: 'FAIRY',    name: 'FAIRY',    subject: 'Aesthetics & Optics',   badgeClass: 'bg-rose-400',    btnClass: 'bg-rose-400 hover:bg-rose-300 text-slate-950' }
};

function getEffectiveness(attackType, defendType) {
  const chart = {
    NORMAL:   { ROCK: 0.5, GHOST: 0.0, STEEL: 0.5 },
    FIRE:     { FIRE: 0.5, WATER: 0.5, GRASS: 2.0, ICE: 2.0, BUG: 2.0, ROCK: 0.5, DRAGON: 0.5, STEEL: 2.0 },
    WATER:    { FIRE: 2.0, WATER: 0.5, GRASS: 0.5, GROUND: 2.0, ROCK: 2.0, DRAGON: 0.5 },
    GRASS:    { FIRE: 0.5, WATER: 2.0, GRASS: 0.5, POISON: 0.5, GROUND: 2.0, FLYING: 0.5, BUG: 0.5, ROCK: 2.0, DRAGON: 0.5, STEEL: 0.5 },
    ELECTRIC: { WATER: 2.0, GRASS: 0.5, ELECTRIC: 0.5, GROUND: 0.0, FLYING: 2.0, DRAGON: 0.5 },
    ICE:      { FIRE: 0.5, WATER: 0.5, GRASS: 2.0, ICE: 0.5, GROUND: 2.0, FLYING: 2.0, DRAGON: 2.0, STEEL: 0.5 },
    FIGHTING: { NORMAL: 2.0, ICE: 2.0, POISON: 0.5, FLYING: 0.5, PSYCHIC: 0.5, BUG: 0.5, ROCK: 2.0, GHOST: 0.0, DARK: 2.0, STEEL: 2.0, FAIRY: 0.5 },
    POISON:   { GRASS: 2.0, POISON: 0.5, GROUND: 0.5, ROCK: 0.5, GHOST: 0.5, STEEL: 0.0, FAIRY: 2.0 },
    GROUND:   { FIRE: 2.0, ELECTRIC: 2.0, GRASS: 0.5, POISON: 2.0, FLYING: 0.0, BUG: 0.5, ROCK: 2.0, STEEL: 2.0 },
    FLYING:   { GRASS: 2.0, ELECTRIC: 0.5, FIGHTING: 2.0, BUG: 2.0, ROCK: 0.5, STEEL: 0.5 },
    PSYCHIC:  { FIGHTING: 2.0, POISON: 2.0, PSYCHIC: 0.5, DARK: 0.0, STEEL: 0.5 },
    BUG:      { FIRE: 0.5, GRASS: 2.0, FIGHTING: 0.5, POISON: 0.5, FLYING: 0.5, PSYCHIC: 2.0, GHOST: 0.5, DARK: 2.0, STEEL: 0.5, FAIRY: 0.5 },
    ROCK:     { FIRE: 2.0, ICE: 2.0, FIGHTING: 0.5, GROUND: 0.5, FLYING: 2.0, BUG: 2.0, STEEL: 0.5 },
    GHOST:    { NORMAL: 0.0, PSYCHIC: 2.0, GHOST: 2.0, DARK: 0.5 },
    DRAGON:   { DRAGON: 2.0, STEEL: 0.5, FAIRY: 0.0 },
    DARK:     { FIGHTING: 0.5, PSYCHIC: 2.0, GHOST: 2.0, DARK: 0.5, FAIRY: 0.5 },
    STEEL:    { FIRE: 0.5, WATER: 0.5, ELECTRIC: 0.5, ICE: 2.0, ROCK: 2.0, STEEL: 0.5, FAIRY: 2.0 },
    FAIRY:    { FIRE: 0.5, FIGHTING: 2.0, POISON: 0.5, DRAGON: 2.0, DARK: 2.0, STEEL: 0.5 }
  };
  return (chart[attackType] && chart[attackType][defendType]) !== undefined ? chart[attackType][defendType] : 1.0;
}

/********************************************************************
 * 32 MONSTER PIXEL MATRICES (BASE + EVOLUTIONS + 20 NEW MONSTERS)
 ********************************************************************/
const DEFAULT_MONSTER_PIXELS = {
  voltbit: {
    palette: { p: '#facc15', s: '#eab308', d: '#1e293b', a: '#ef4444', w: '#ffffff', h: '#fef08a', m: '#ca8a04', c: '#fde047' },
    grid: ["................","...dd......dd...","...dm......md...","...ph......hp...","....hhhhhhhh....","...hppppppppph..","...ppwdppwdpp...", "...ppddppddpp.aa","...aappddppaa.ss","...aappccppaa.pp","...ppppccpppp.mm","...spppccppps...", "....mmmmmmmm....","....mdm..mdm....","....ddd..ddd....","................"]
  },
  voltprime: {
    palette: { p: '#fde047', s: '#ca8a04', d: '#0f172a', a: '#38bdf8', w: '#ffffff', h: '#fef9c3', m: '#eab308', c: '#facc15' },
    grid: [".....11..11.....","....111..111....","...dd......dd...","...ph1h..h1hp...", "....hhhhhhhh....","..hpppppppppph..",".ppw1ppwwpp1dpp.",".ppddppffppddpp.", ".aappddffddppaa.",".aappccffccppaa.","..ppppccffccpp..","...sppppppppps..", "....mmmmmmmm....","....m4m..m4m....","....ddd..ddd....","................"]
  },
  charcoalon: {
    palette: { p: '#f97316', s: '#ea580c', d: '#1e293b', a: '#fde047', w: '#ffffff', h: '#fdba74', m: '#9a3412', c: '#ef4444' },
    grid: [".............aa.","............aca.",".....hhhhp..ccc.",".....wdhpp...ss.", ".....d2ppp...sm.","....hppppps..mm.","....ppppppps.m..","..ccppaaaapp....", "..ccppahhapppss.","..mmppahhapppsm.","....ppaaaappmmm.","....spaaaaps....", "....mms.smm.....","....mws.swm.....","....ddd.ddd.....","................"]
  },
  pyroclast: {
    palette: { p: '#ea580c', s: '#c2410c', d: '#0f172a', a: '#f59e0b', w: '#ffffff', h: '#fed7aa', m: '#7c2d12', c: '#ef4444' },
    grid: ["....aa....aa....","...aaaa..aaaa...","..hhhhhpppppp...",".wdhpppppppppp..", ".dpppaaaapppppp.","ppppppaaccappppp","ppppppaaccappppp","ppppaaccccaapppp", "ppppaaccccaapppp",".ppppaaccccaapp.","..ppppaaaaapp...","...ssppppppss...", "....mm....mm....","....mm....mm....","....dd....dd....","................"]
  },
  aquashell: {
    palette: { p: '#38bdf8', s: '#0284c7', d: '#0f172a', a: '#bae6fd', w: '#ffffff', h: '#7dd3fc', m: '#0369a1', c: '#fde68a' },
    grid: ["................","................",".....hhhhh......","....hppppph.....", "....pwdppwd.....","....pddppdd.....","...mmmmmmmmm....","...msccccccsmww.", "..ppdccccccdaaa.","..pmdccccccdaam.","..mmmmmmmmmmmm..","...ddccccccdd...", "....ppp..ppp....","....pmm..mmp....","....ddd..ddd....","................"]
  },
  neptunoid: {
    palette: { p: '#0284c7', s: '#0369a1', d: '#0f172a', a: '#38bdf8', w: '#ffffff', h: '#bae6fd', m: '#075985', c: '#7dd3fc' },
    grid: ["......hhhh......",".....hpppph.....","....hpppph33....","...hpphpph333..", "...pwdppwdphhh..","...pddppddphh..","..mmmmmmmmmmmm..",".mmseeeeeeeesm..", "ppsseeeeeeeespp.","ppsseccccccespp.",".mmseccccccesm..","..mmseeeeeeesm..", "...sss....sss...","...sss....sss...","....dd....dd....","................"]
  },
  fernlynx: {
    palette: { p: '#4ade80', s: '#16a34a', d: '#052e16', a: '#facc15', w: '#ffffff', h: '#86efac', m: '#15803d', c: '#dcfce7' },
    grid: [".......11.......","......ahha......","......hssh......","...ss.hssh.ss...", "...shhhhhhhhhs..","...spppppppps...", "....padppadp....","....pddppddp....", "....pppccppp....","....ppccccpp....","....spccccps....","....mmmmmmmm....", "....mms..smm....","....mms..smm....","....ddd..ddd....","................"]
  },
  sylvanpanther: {
    palette: { p: '#16a34a', s: '#15803d', d: '#052e16', a: '#fde047', w: '#ffffff', h: '#4ade80', m: '#064e3b', c: '#bbf7d0' },
    grid: [".....111111.....","....1aaaaaa1....","...1ahhhhhha1...","...ahhhhhhhhha..", "..shpppppppphs..",".shppwdppwdpphs.",".shppddppddpphs.",".shppccppccpphs.", "..shppccppccphs.","...shhhhhhhhhs..","....mmmmmmmm....","....mmseesmms...", "....ssm..mss....","....ssm..mss....","....ddd..ddd....","................"]
  },
  pyrocore: {
    palette: { p: '#ef4444', s: '#b91c1c', d: '#111827', a: '#fef08a', w: '#ffffff', h: '#f87171', m: '#7f1d1d', c: '#f97316' },
    grid: [".......aa.......","......acca......",".....cccccc.....","....hhhhhhhh....", "....pppppppp....","...ssssssssss...", "...ssaw..wass...", "..ccsa1..1ascc..", "..ppssssssssspp.","..mmsccccccsmm..","..mmssaaaaassmm.","...mmssssssssmm.", "....mdd..ddm....","....mdd..ddm....","....ddd..ddd....","................"]
  },
  infernotitan: {
    palette: { p: '#dc2626', s: '#991b1b', d: '#0f172a', a: '#fde047', w: '#ffffff', h: '#fca5a5', m: '#450a0a', c: '#f97316' },
    grid: ["....aaaaaa......","...aaaaaaaa.....","..hhpppppphh....",".whpppppppphw...", "hssssssssssssh..","hssddppddppssh..","hssddppddppssh..","hssccppccppssh..", ".ssccppccppss...",".ssaaaaaaaaas...", "..mmmmmmmmmm....","..mmssaaaaasmm..", "...ssmm..mmss...", "...dddd..dddd...", "................","................"]
  },
  tidalfin: {
    palette: { p: '#2563eb', s: '#1d4ed8', d: '#0f172a', a: '#67e8f9', w: '#ffffff', h: '#60a5fa', m: '#1e3a8a', c: '#e0f2fe' },
    grid: [".......aa.......",".......aah......",".......aah......","......haah......", "....hhhhhhhh....","....pppppppp....","..aapwdppwdpsss.","..hapddppddpssm.", "..happccccppssm.","..aapccccccpsmm.","....pccccccp....","....mmmmmmmm....", ".....sm..ms.....",".....dm..md.....",".....dd..dd.....","................"]
  },
  leviathan: {
    palette: { p: '#1d4ed8', s: '#1e40af', d: '#0f172a', a: '#38bdf8', w: '#ffffff', h: '#93c5fd', m: '#1e3a8a', c: '#bae6fd' },
    grid: ["......aaaa......",".....aaaar......","....hhpppphh....","...whpppppphw...", "..hpppppppppph..",".hppwdppwdpph...",".hppddppddpph...",".hppccppccpph...", "..hppccppccph...","...hhhhhhhhh....","..mmmmmmmmmm....","..mmseeeeesm....", "...ssm..mss.....","...ssm..mss.....","....dd..dd......","................"]
  },
  // 20 Additional Brand-New Monsters
  blitzcat: {
    palette: { p: '#fbbf24', s: '#d97706', d: '#1e293b', a: '#ffffff', w: '#ffffff', h: '#fde68a', m: '#b45309', c: '#fef3c7' },
    grid: ["....dd..dd......","...dppddppd.....","..dppppppspd....","..dphhhhhpdd....","..dph1hh1hpdd...", "..dpphhhhppd....","...dppssppd.....","....pppppp......","...appppppa.....","..apssppssap....","..apssppssap....","...pp....pp.....","...dd....dd.....","................","................","................"]
  },
  magmaclaw: {
    palette: { p: '#dc2626', s: '#991b1b', d: '#0f172a', a: '#fde047', w: '#ffffff', h: '#fca5a5', m: '#7f1d1d', c: '#f97316' },
    grid: [".....aa..aa.....","....ahhaahha....","...apppppppp....","..apwpddppwda...", "..apppppppppp...", ".spppaaaaappss..", ".spcccccccppss..", ".spcccccccppss..", "..spccccccps....", "...sppppppps....", "....mm..mm......", "....mm..mm......", "....dd..dd......","................","................","................"]
  },
  frostfang: {
    palette: { p: '#22d3ee', s: '#0891b2', d: '#082f49', a: '#e0f2fe', w: '#ffffff', h: '#67e8f9', m: '#0e7490', c: '#cffafe' },
    grid: [".....ww..ww.....","....wppwwppw....","...dppppppppd...", "..dphhhpphhdp...", "..dphwhppwhdp...", "..dppppppppd....","...dppssppd.....","....pppppp......","...dapppppad....","..dapssppsad....","..dapssppsad....","...pp....pp.....","...dd....dd.....","................","................","................"]
  },
  terramoth: {
    palette: { p: '#a16207', s: '#78350f', d: '#292524', a: '#fde047', w: '#ffffff', h: '#d97706', m: '#451a03', c: '#fef3c7' },
    grid: ["...d......d.....","..dppppppppd....",".dppaaaaaaaapp..", "dppahhhhhhaapp..", "dpphwwppwwphpp..", "dpphwwppwwphpp..", ".dpphhhhhhppd...", "..dpppppppd.....", "...dppssppd.....", "..dppssppssd....", "..dpp....ppd....", "..dpp....ppd....", "...dd....dd.....","................","................","................"]
  },
  aerodrake: {
    palette: { p: '#818cf8', s: '#4f46e5', d: '#1e1b4b', a: '#c7d2fe', w: '#ffffff', h: '#a5b4fc', m: '#3730a3', c: '#e0e7ff' },
    grid: ["......aa........",".....ahha.......","....hpppph......","...hpppppph.....","..hppwppwph.....","..hppppppph.....","...hppppph......","....hhhhhh......","...spppppps.....","..sppssppss.....",".spp......pps...","..s........s....","................","................","................","................"]
  },
  venomspore: {
    palette: { p: '#c084fc', s: '#9333ea', d: '#3b0764', a: '#4ade80', w: '#ffffff', h: '#e879f9', m: '#6b21a8', c: '#f3e8ff' },
    grid: [".....aaaa.......","....aahhaaa.....","...ahhhhhha.....","..shhhhhhhhs....", ".shpwppwpphhs...", ".shpwppwpphhs...", "..shhhhhhhhs....","...sppppppps....","..sppaapppps....", ".sppaaccappa....", ".sppaaaaappa....", "..spppppppps....","...ss....ss.....","................","................","................"]
  },
  gigaslate: {
    palette: { p: '#64748b', s: '#475569', d: '#0f172a', a: '#38bdf8', w: '#ffffff', h: '#94a3b8', m: '#334155', c: '#cbd5e1' },
    grid: ["...dddddddd.....","..dppppppppd....",".dphhhhhhhhdp...", ".dphwpppwphdp...", ".dphwpppwphdp...", ".dphhhhhhhhdp...", ".dppppppppppd...", ".dppccccccccd...", ".dppccccccccd...", ".dppppppppppd...", "..dppppppppd....","...dppssppd.....","...ddd..ddd.....","................","................","................"]
  },
  pixiebell: {
    palette: { p: '#fb7185', s: '#e11d48', d: '#4c0519', a: '#fde047', w: '#ffffff', h: '#fda4af', m: '#9f1239', c: '#ffe4e6' },
    grid: ["......aa........",".....aaha.......","....ahhhha......","...shhhhhhs.....", ".shpwppwpphs....", ".shpwppwpphs....", "..shhhhhhhhs....","...sppppppps....","..sppaapppps....", ".sppaaccappa....", ".sppaaaaappa....", "..spppppppps....","...ss....ss.....","................","................","................"]
  },
  spectre: {
    palette: { p: '#a855f7', s: '#7e22ce', d: '#3b0764', a: '#22d3ee', w: '#ffffff', h: '#c084fc', m: '#581c87', c: '#e879f9' },
    grid: ["......hh........",".....hppph......","....hpppph......","...hpppppph.....","..hppwppwph.....",".shppwppwpphs...", ".shhhhhhhhs.....","..sppppppps.....","..sppaappps.....", "...sppaaaps.....", "....spppps......", ".....ssss.......","................","................","................","................"]
  },
  boulderkin: {
    palette: { p: '#78716c', s: '#57534e', d: '#1c1917', a: '#a8a29e', w: '#ffffff', h: '#d6d3d1', m: '#44403c', c: '#e7e5e4' },
    grid: ["................","...dddddddd.....","..dppppppppd....", ".dphhhhhhhhdp...", ".dphwpppwphdp...", ".dphwpppwphdp...", ".dphhhhhhhhdp...", ".dppppppppppd...", ".dppccccccccd...", ".dppppppppppd...", "..dppppppppd....","...dppssppd.....","...ddd..ddd.....","................","................","................"]
  },
  shadowstalker: {
    palette: { p: '#27272a', s: '#18181b', d: '#09090b', a: '#a855f7', w: '#ffffff', h: '#52525b', m: '#0f172a', c: '#3f3f46' },
    grid: [".....aaaa.......","....aapppaa.....","...appppppa.....","..appwppwpd.....", "..appdppdpda....", "..appppppppa....","...appssppa.....","....pppppp......","...dapppppad....","..dapssppsad....","..dapssppsad....","...pp....pp.....","...dd....dd.....","................","................","................"]
  },
  mechagolem: {
    palette: { p: '#94a3b8', s: '#64748b', d: '#0f172a', a: '#facc15', w: '#ffffff', h: '#cbd5e1', m: '#334155', c: '#f1f5f9' },
    grid: ["...dddddddd.....","..dppppppppd....", ".dphhhhhhhhdp...", ".dphwpppwphdp...", ".dphwpppwphdp...", ".dphhhhhhhhdp...", ".dppppppppppd...", ".dppccccccccd...", ".dppccccccccd...", ".dppppppppppd...", "..dppppppppd....","...dppssppd.....","...ddd..ddd.....","................","................","................"]
  },
  solari: {
    palette: { p: '#f59e0b', s: '#d97706', d: '#78350f', a: '#fef08a', w: '#ffffff', h: '#fde68a', m: '#b45309', c: '#fffbeb' },
    grid: ["....aa..aa......","...aahaahha.....","..ahhhhhhhha....", ".ahwppppppwha...", ".ahwppppppwha...", "..ahhhhhhhha....", "...ahhhhhha.....","....pppppp......","...spppppps.....","..sppssppssa....", "..sppssppssa....", "...pp....pp.....", "...dd....dd.....","................","................","................"]
  },
  abyssalis: {
    palette: { p: '#09090b', s: '#18181b', d: '#27272a', a: '#06b6d4', w: '#ffffff', h: '#3f3f46', m: '#020617', c: '#1e1b4b' },
    grid: ["................","...dd......dd...", "...dm......md...", "...ph......hp...", "....hhhhhhhh....","...hppppppppph..","...ppwdppwdpp...", "...ppddppddpp.aa","...aappddppaa.ss","...aappccppaa.pp","...ppppccpppp.mm","...spppccppps...", "....mmmmmmmm....","....mdm..mdm....","....ddd..ddd....","................"]
  },
  zephyr: {
    palette: { p: '#38bdf8', s: '#0284c7', d: '#0c4a6e', a: '#ffffff', w: '#ffffff', h: '#7dd3fc', m: '#0369a1', c: '#e0f2fe' },
    grid: ["......aa........",".....ahha.......","....hpppph......","...hpppppph.....","..hppwppwph.....","..hppppppph.....","...hppppph......","....hhhhhh......","...spppppps.....","..sppssppss.....",".spp......pps...","..s........s....","................","................","................","................"]
  },
  myceloid: {
    palette: { p: '#db2777', s: '#be185d', d: '#4c0519', a: '#fef08a', w: '#ffffff', h: '#f472b6', m: '#831843', c: '#fce7f3' },
    grid: ["....hhhhhh......","...hppppppph....","..hppwppwpph....","..hppwppwpph....", "...hppppppph....", "....hhhhhh......", ".....pppps......", "....sppppps.....", "...sppssppps....", "...sppssppps....", "....pp..pp......", "....dd..dd......","................","................","................","................"]
  },
  chronomite: {
    palette: { p: '#10b981', s: '#059669', d: '#022c22', a: '#fde047', w: '#ffffff', h: '#34d399', m: '#047857', c: '#ecfdf5' },
    grid: ["................","...dd......dd...", "...dm......md...", "...ph......hp...", "....hhhhhhhh....","...hppppppppph..","...ppwdppwdpp...", "...ppddppddpp.aa","...aappddppaa.ss","...aappccppaa.pp","...ppppccpppp.mm","...spppccppps...", "....mmmmmmmm....","....mdm..mdm....","....ddd..ddd....","................"]
  },
  galehawk: {
    palette: { p: '#6366f1', s: '#4f46e5', d: '#312e81', a: '#facc15', w: '#ffffff', h: '#818cf8', m: '#3730a3', c: '#e0e7ff' },
    grid: ["......aa........",".....ahha.......","....hpppph......","...hpppppph.....","..hppwppwph.....","..hppppppph.....","...hppppph......","....hhhhhh......","...spppppps.....","..sppssppss.....",".spp......pps...","..s........s....","................","................","................","................"]
  },
  pythos: {
    palette: { p: '#15803d', s: '#166534', d: '#052e16', a: '#facc15', w: '#ffffff', h: '#22c55e', m: '#14532d', c: '#dcfce7' },
    grid: ["................","...dd......dd...", "...dm......md...", "...ph......hp...", "....hhhhhhhh....","...hppppppppph..","...ppwdppwdpp...", "...ppddppddpp.aa","...aappddppaa.ss","...aappccppaa.pp","...ppppccpppp.mm","...spppccppps...", "....mmmmmmmm....","....mdm..mdm....","....ddd..ddd....","................"]
  },
  celestia: {
    palette: { p: '#ec4899', s: '#db2777', d: '#500724', a: '#fde047', w: '#ffffff', h: '#f472b6', m: '#9d174d', c: '#fce7f3' },
    grid: ["......aa........",".....aaha.......","....ahhhha......","...shhhhhhs.....", ".shpwppwpphs....", ".shpwppwpphs....", "..shhhhhhhhs....","...sppppppps....","..sppaapppps....", ".sppaaccappa....", ".sppaaaaappa....", "..spppppppps....","...ss....ss.....","................","................","................"]
  }
};

let MONSTER_PIXELS = structuredClone(DEFAULT_MONSTER_PIXELS);

const MONSTER_SPECIES = [
  { id: 'voltbit', name: 'VOLTBIT', type: 'ELECTRIC', baseHp: 140, level: 14, evolvesTo: 'voltprime', evolveLevel: 16 },
  { id: 'voltprime', name: 'VOLTPRIME', type: 'ELECTRIC', baseHp: 195, level: 16 },
  { id: 'charcoalon', name: 'CHARCOALON', type: 'FIRE', baseHp: 125, level: 12, evolvesTo: 'pyroclast', evolveLevel: 15 },
  { id: 'pyroclast', name: 'PYROCLAST', type: 'FIRE', baseHp: 180, level: 15 },
  { id: 'aquashell', name: 'AQUASHELL', type: 'WATER', baseHp: 135, level: 13, evolvesTo: 'neptunoid', evolveLevel: 15 },
  { id: 'neptunoid', name: 'NEPTUNOID', type: 'WATER', baseHp: 190, level: 15 },
  { id: 'fernlynx', name: 'FERNLYNX', type: 'GRASS', baseHp: 130, level: 13, evolvesTo: 'sylvanpanther', evolveLevel: 15 },
  { id: 'sylvanpanther', name: 'SYLVAN PANTHER', type: 'GRASS', baseHp: 185, level: 15 },
  { id: 'pyrocore', name: 'PYROCORE', type: 'FIRE', baseHp: 150, level: 15, evolvesTo: 'infernotitan', evolveLevel: 18 },
  { id: 'infernotitan', name: 'INFERNOTITAN', type: 'FIRE', baseHp: 210, level: 18 },
  { id: 'tidalfin', name: 'TIDALFIN', type: 'WATER', baseHp: 145, level: 15, evolvesTo: 'leviathan', evolveLevel: 18 },
  { id: 'leviathan', name: 'LEVIATHAN', type: 'WATER', baseHp: 215, level: 18 },
  // 20 New Monsters
  { id: 'blitzcat', name: 'BLITZCAT', type: 'ELECTRIC', baseHp: 130, level: 11 },
  { id: 'magmaclaw', name: 'MAGMACLAW', type: 'FIRE', baseHp: 160, level: 14 },
  { id: 'frostfang', name: 'FROSTFANG', type: 'ICE', baseHp: 145, level: 13 },
  { id: 'terramoth', name: 'TERRAMOTH', type: 'GROUND', baseHp: 155, level: 14 },
  { id: 'aerodrake', name: 'AERODRAKE', type: 'DRAGON', baseHp: 170, level: 16 },
  { id: 'venomspore', name: 'VENOMSPORE', type: 'POISON', baseHp: 135, level: 12 },
  { id: 'gigaslate', name: 'GIGASLATE', type: 'ROCK', baseHp: 190, level: 17 },
  { id: 'pixiebell', name: 'PIXIEBELL', type: 'FAIRY', baseHp: 125, level: 10 },
  { id: 'spectre', name: 'SPECTRE', type: 'GHOST', baseHp: 135, level: 13 },
  { id: 'boulderkin', name: 'BOULDERKIN', type: 'ROCK', baseHp: 175, level: 15 },
  { id: 'shadowstalker', name: 'SHADOWSTALKER', type: 'DARK', baseHp: 160, level: 14 },
  { id: 'mechagolem', name: 'MECHAGOLEM', type: 'STEEL', baseHp: 200, level: 18 },
  { id: 'solari', name: 'SOLARI', type: 'FIRE', baseHp: 150, level: 14 },
  { id: 'abyssalis', name: 'ABYSSALIS', type: 'DARK', baseHp: 185, level: 16 },
  { id: 'zephyr', name: 'ZEPHYR', type: 'FLYING', baseHp: 140, level: 12 },
  { id: 'myceloid', name: 'MYCELOID', type: 'GRASS', baseHp: 145, level: 13 },
  { id: 'chronomite', name: 'CHRONOMITE', type: 'STEEL', baseHp: 165, level: 15 },
  { id: 'galehawk', name: 'GALEHAWK', type: 'FLYING', baseHp: 150, level: 14 },
  { id: 'pythos', name: 'PYTHOS', type: 'POISON', baseHp: 160, level: 15 },
  { id: 'celestia', name: 'CELESTIA', type: 'PSYCHIC', baseHp: 175, level: 16 }
];

const PALETTE_SLOT_NAMES = {
  p: 'Primary (p)', s: 'Secondary (s)', d: 'Outline (d)', a: 'Accent (a)',
  w: 'White (w)', h: 'Highlight (h)', m: 'Shadow (m)', c: 'Core/Belly (c)'
};

const PIXEL_COLOR_PRESETS = [
  '#0f172a', '#ffffff', '#ef4444', '#f97316', '#facc15', '#4ade80', '#15803d', '#38bdf8',
  '#2563eb', '#a855f7', '#f43f5e', '#78350f', '#57534e', '#d97706', '#0284c7', '#16a34a'
];

function renderMonsterSVG(speciesOrId) {
  const id = typeof speciesOrId === 'string' ? speciesOrId : speciesOrId.id;
  const art = MONSTER_PIXELS[id] || MONSTER_PIXELS.voltbit;
  const pal = art.palette;
  let rects = '';
  for (let y = 0; y < 16; y++) {
    const row = art.grid[y] || '................';
    for (let x = 0; x < 16; x++) {
      const ch = row.charAt(x);
      if (ch !== '.' && pal[ch]) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${pal[ch]}"/>`;
      }
    }
  }
  return `<svg viewBox="0 0 16 16" class="w-full h-full drop-shadow-md">${rects}</svg>`;
}

function renderCaptureBallSVG(highlightStar = false) {
  return `
    <svg viewBox="0 0 16 16" class="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg">
      ${highlightStar ? '<rect x="7" y="0" width="2" height="2" fill="#fde047"/><rect x="2" y="2" width="2" height="2" fill="#fde047"/><rect x="12" y="2" width="2" height="2" fill="#fde047"/>' : ''}
      <rect x="5" y="3" width="6" height="2" fill="#0f172a"/>
      <rect x="3" y="5" width="10" height="3" fill="#ef4444"/>
      <rect x="3" y="8" width="10" height="1" fill="#0f172a"/>
      <rect x="3" y="9" width="10" height="3" fill="#f8fafc"/>
      <rect x="5" y="12" width="6" height="2" fill="#0f172a"/>
      <rect x="6" y="7" width="4" height="3" fill="#0f172a"/>
      <rect x="7" y="8" width="2" height="1" fill="${highlightStar ? '#4ade80' : '#fde047'}"/>
    </svg>`;
}

/********************************************************************
 * TRIVIA QUESTION POOL ACROSS ALL 18 TYPES
 ********************************************************************/
const DEFAULT_QUESTIONS = [
  { type: 'GRASS', difficulty: 1, q: 'Which gas do plants absorb from the atmosphere during photosynthesis?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Argon'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What is the powerhouse organelle of a eukaryotic cell that generates ATP?', options: ['Mitochondria', 'Ribosome', 'Golgi Apparatus', 'Nucleolus'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'Which ocean is the largest and deepest on Earth?', options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What is the deepest known trench in the world’s oceans?', options: ['Mariana Trench', 'Tonga Trench', 'Java Trench', 'Puerto Rico Trench'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'Which subatomic particle carries a negative electrical charge?', options: ['Electron', 'Proton', 'Neutron', 'Photon'], answer: 0 },
  { type: 'FIRE', difficulty: 3, q: 'A chemical reaction that releases heat to its surroundings is called?', options: ['Exothermic', 'Endothermic', 'Isothermal', 'Catalytic'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'In binary code, what decimal number is represented by 1010?', options: ['10', '8', '12', '6'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'Which lobe of the human brain is primarily responsible for visual processing?', options: ['Occipital Lobe', 'Frontal Lobe', 'Temporal Lobe', 'Parietal Lobe'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What molecule carries genetic instructions used in the growth, development, and functioning of all living organisms?', options: ['DNA', 'ATP', 'RNA', 'Protein'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'At standard atmospheric pressure, at what Celsius temperature does water freeze into ice?', options: ['0°C', '-10°C', '4°C', '-32°C'], answer: 0 },
  { type: 'GHOST', difficulty: 3, q: 'In quantum mechanics, what phenomenon describes particles remaining interconnected regardless of distance?', options: ['Quantum Entanglement', 'Superposition', 'Tunneling', 'Wave-particle duality'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'How many days are in a standard non-leap year?', options: ['365', '366', '360', '355'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What term describes the rate of doing work or consuming energy in physics?', options: ['Power', 'Velocity', 'Momentum', 'Acceleration'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What pH level represents a strongly acidic chemical substance?', options: ['pH 1-3', 'pH 7', 'pH 9-11', 'pH 14'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What instrument is used to record seismic waves generated by earthquakes?', options: ['Seismograph', 'Barometer', 'Anemometer', 'Hydrometer'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What force opposes the forward motion of an aircraft through the air?', options: ['Drag', 'Lift', 'Thrust', 'Gravity'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'How many main body segments does an adult insect have?', options: ['Three', 'Two', 'Four', 'One'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'Which mineral is known as the hardest naturally occurring substance on Earth?', options: ['Diamond', 'Quartz', 'Topaz', 'Corundum'], answer: 0 },
  { type: 'DARK', difficulty: 3, q: 'What theoretical boundary around a black hole prevents anything, including light, from escaping?', options: ['Event Horizon', 'Accretion Disk', 'Singularity', 'Photon Sphere'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What primary metal alloy is created by combining iron and carbon?', options: ['Steel', 'Bronze', 'Brass', 'Pewter'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'In optics, what phenomenon causes light to bend around the edges of an obstacle or opening?', options: ['Diffraction', 'Reflection', 'Refraction', 'Dispersion'], answer: 0 }
];