/********************************************************************
 * battle.js
 * Trivia Combat Engine, Auto-Switch on Faint, Professor Oak Duplicate
 * Transfer, Absolute HP Catch Rate, Enemy Attack & Ball Pop Animation
 ********************************************************************/

const EVOLUTION_CHAINS = {
  // 1st-Gen Starters -> Second Stage -> Final Stage
  bulbasaur:  { to: 'ivysaur',    method: 'EXP',   winsNeeded: 2 },
  ivysaur:    { to: 'venusaur',   method: 'EXP',   winsNeeded: 3 },
  charmander: { to: 'charmeleon', method: 'EXP',   winsNeeded: 2 },
  charmeleon: { to: 'charizard',  method: 'EXP',   winsNeeded: 3 },
  squirtle:   { to: 'wartortle',  method: 'EXP',   winsNeeded: 2 },
  wartortle:  { to: 'blastoise',  method: 'EXP',   winsNeeded: 3 },

  // Bug lines
  caterpie:   { to: 'metapod',    method: 'EXP',   winsNeeded: 1 },
  metapod:    { to: 'butterfree', method: 'EXP',   winsNeeded: 2 },
  weedle:     { to: 'kakuna',     method: 'EXP',   winsNeeded: 1 },
  kakuna:     { to: 'beedrill',   method: 'EXP',   winsNeeded: 2 },

  // Flying & Normal lines
  pidgey:     { to: 'pidgeotto',  method: 'EXP',   winsNeeded: 2 },
  pidgeotto:  { to: 'pidgeot',    method: 'EXP',   winsNeeded: 3 },
  rattata:    { to: 'raticate',   method: 'EXP',   winsNeeded: 2 },
  spearow:    { to: 'fearow',     method: 'EXP',   winsNeeded: 2 },

  // Poison / Ground lines (EXP & Stones)
  ekans:      { to: 'arbok',      method: 'EXP',   winsNeeded: 2 },
  sandshrew:  { to: 'sandslash',  method: 'EXP',   winsNeeded: 2 },
  nidoran_f:  { to: 'nidorina',   method: 'EXP',   winsNeeded: 2 },
  nidorina:   { to: 'nidoqueen',  method: 'STONE', stone: 'POISON',   stoneLabel: 'MOON STONE' },
  nidoran_m:  { to: 'nidorino',   method: 'EXP',   winsNeeded: 2 },
  nidorino:   { to: 'nidoking',   method: 'STONE', stone: 'POISON',   stoneLabel: 'MOON STONE' },

  // Fairy / Cute lines (Stones)
  clefairy:   { to: 'clefable',   method: 'STONE', stone: 'FAIRY',    stoneLabel: 'MOON STONE' },
  jigglypuff: { to: 'wigglytuff', method: 'STONE', stone: 'NORMAL',   stoneLabel: 'MOON STONE' },

  // Fire lines (Stones & EXP)
  vulpix:     { to: 'ninetales',  method: 'STONE', stone: 'FIRE',     stoneLabel: 'FIRE STONE' },
  growlithe:  { to: 'arcanine',   method: 'STONE', stone: 'FIRE',     stoneLabel: 'FIRE STONE' },
  ponyta:     { to: 'rapidash',   method: 'EXP',   winsNeeded: 3 },

  // Bat / Plant lines (EXP & Stones)
  zubat:      { to: 'golbat',     method: 'EXP',   winsNeeded: 2 },
  oddish:     { to: 'gloom',      method: 'EXP',   winsNeeded: 2 },
  gloom:      { to: 'vileplume',  method: 'STONE', stone: 'GRASS',    stoneLabel: 'LEAF STONE' },
  paras:      { to: 'parasect',   method: 'EXP',   winsNeeded: 2 },
  venonat:    { to: 'venomoth',   method: 'EXP',   winsNeeded: 2 },
  bellsprout: { to: 'weepinbell', method: 'EXP',   winsNeeded: 2 },
  weepinbell: { to: 'victreebel', method: 'STONE', stone: 'GRASS',    stoneLabel: 'LEAF STONE' },

  // Ground / Water / Fighting lines (EXP)
  diglett:    { to: 'dugtrio',    method: 'EXP',   winsNeeded: 2 },
  meowth:     { to: 'persian',    method: 'EXP',   winsNeeded: 2 },
  psyduck:    { to: 'golduck',    method: 'EXP',   winsNeeded: 3 },
  mankey:     { to: 'primeape',   method: 'EXP',   winsNeeded: 2 },
  poliwag:    { to: 'poliwhirl',  method: 'EXP',   winsNeeded: 2 },
  poliwhirl:  { to: 'poliwrath',  method: 'STONE', stone: 'WATER',    stoneLabel: 'WATER STONE' },
  abra:       { to: 'kadabra',    method: 'EXP',   winsNeeded: 2 },
  kadabra:    { to: 'alakazam',   method: 'EXP',   winsNeeded: 3 },
  machop:     { to: 'machoke',    method: 'EXP',   winsNeeded: 2 },
  machoke:    { to: 'machamp',    method: 'EXP',   winsNeeded: 3 },
  tentacool:  { to: 'tentacruel', method: 'EXP',   winsNeeded: 3 },
  geodude:    { to: 'graveler',   method: 'EXP',   winsNeeded: 2 },
  graveler:   { to: 'golem',      method: 'EXP',   winsNeeded: 3 },
  slowpoke:   { to: 'slowbro',    method: 'EXP',   winsNeeded: 3 },
  magnemite:  { to: 'magneton',   method: 'EXP',   winsNeeded: 2 },
  doduo:      { to: 'dodrio',     method: 'EXP',   winsNeeded: 2 },
  seel:       { to: 'dewgong',    method: 'EXP',   winsNeeded: 3 },
  grimer:     { to: 'muk',        method: 'EXP',   winsNeeded: 3 },
  shellder:   { to: 'cloyster',   method: 'STONE', stone: 'WATER',    stoneLabel: 'WATER STONE' },
  gastly:     { to: 'haunter',    method: 'EXP',   winsNeeded: 2 },
  haunter:    { to: 'gengar',     method: 'EXP',   winsNeeded: 3 },
  drowzee:    { to: 'hypno',      method: 'EXP',   winsNeeded: 3 },
  krabby:     { to: 'kingler',    method: 'EXP',   winsNeeded: 3 },
  voltorb:    { to: 'electrode',  method: 'EXP',   winsNeeded: 2 },
  exeggcute:  { to: 'exeggutor',  method: 'STONE', stone: 'GRASS',    stoneLabel: 'LEAF STONE' },
  cubone:     { to: 'marowak',    method: 'EXP',   winsNeeded: 3 },
  koffing:    { to: 'weezing',    method: 'EXP',   winsNeeded: 3 },
  rhyhorn:    { to: 'rhydon',     method: 'EXP',   winsNeeded: 3 },
  horsea:     { to: 'seadra',     method: 'EXP',   winsNeeded: 2 },
  goldeen:    { to: 'seaking',    method: 'EXP',   winsNeeded: 2 },
  staryu:     { to: 'starmie',    method: 'STONE', stone: 'WATER',    stoneLabel: 'WATER STONE' },
  omanyte:    { to: 'omastar',    method: 'EXP',   winsNeeded: 3 },
  kabuto:     { to: 'kabutops',   method: 'EXP',   winsNeeded: 3 },

  // Eeveelutions & Electric (Stones)
  pikachu:    { to: 'raichu',     method: 'STONE', stone: 'ELECTRIC', stoneLabel: 'THUNDER STONE' },
  eevee:      { to: 'vaporeon',   method: 'STONE', stone: 'WATER',    stoneLabel: 'WATER STONE' }, 
  eevee:      { to: 'flareon',   method: 'STONE', stone: 'FIRE',    stoneLabel: 'FIRE STONE' },
  eevee:      { to: 'jolteon',   method: 'STONE', stone: 'ELECTRIC',    stoneLabel: 'THUNDER STONE' },
  eevee:      { to: 'umbreon',   method: 'STONE', stone: 'MOON',    stoneLabel: 'MOON STONE' },

  // Dragon lines (EXP)
  dratini:    { to: 'dragonair',  method: 'EXP',   winsNeeded: 2 },
  dragonair:  { to: 'dragonite',  method: 'EXP',   winsNeeded: 3 },
  magikarp:   { to: 'gyarados',   method: 'EXP',   winsNeeded: 3 },

  // Johto Starters (Gen 2)
  chikorita:  { to: 'bayleef',    method: 'EXP', winsNeeded: 2 },
  bayleef:    { to: 'meganium',   method: 'EXP', winsNeeded: 3 },
  cyndaquil:  { to: 'quilava',    method: 'EXP', winsNeeded: 2 },
  quilava:    { to: 'typhlosion', method: 'EXP', winsNeeded: 3 },
  totodile:   { to: 'croconaw',   method: 'EXP', winsNeeded: 2 },
  croconaw:   { to: 'feraligatr', method: 'EXP', winsNeeded: 3 },

  // Hoenn Starters (Gen 3)
  treecko:    { to: 'grovyle',    method: 'EXP', winsNeeded: 2 },
  grovyle:    { to: 'sceptile',   method: 'EXP', winsNeeded: 3 },
  torchic:    { to: 'combusken',  method: 'EXP', winsNeeded: 2 },
  combusken:  { to: 'blaziken',   method: 'EXP', winsNeeded: 3 },
  mudkip:     { to: 'marshtomp',  method: 'EXP', winsNeeded: 2 },
  marshtomp:  { to: 'swampert',   method: 'EXP', winsNeeded: 3 },

  // Sinnoh Starters (Gen 4)
  turtwig:    { to: 'grotle',     method: 'EXP', winsNeeded: 2 },
  grotle:     { to: 'torterra',   method: 'EXP', winsNeeded: 3 },
  chimchar:   { to: 'monferno',   method: 'EXP', winsNeeded: 2 },
  monferno:   { to: 'infernape',  method: 'EXP', winsNeeded: 3 },
  piplup:     { to: 'prinplup',   method: 'EXP', winsNeeded: 2 },
  prinplup:   { to: 'empoleon',   method: 'EXP', winsNeeded: 3 },

  // Unova Starters (Gen 5)
  snivy:      { to: 'servine',    method: 'EXP', winsNeeded: 2 },
  servine:    { to: 'serperior',  method: 'EXP', winsNeeded: 3 },
  tepig:      { to: 'pignite',    method: 'EXP', winsNeeded: 2 },
  pignite:    { to: 'emboar',     method: 'EXP', winsNeeded: 3 },
  oshawott:   { to: 'dewott',     method: 'EXP', winsNeeded: 2 },
  dewott:     { to: 'samurott',   method: 'EXP', winsNeeded: 3 },

  // Kalos Starters (Gen 6)
  chespin:    { to: 'quilladin',  method: 'EXP', winsNeeded: 2 },
  quilladin:  { to: 'chesnaught', method: 'EXP', winsNeeded: 3 },
  fennekin:   { to: 'braixen',    method: 'EXP', winsNeeded: 2 },
  braixen:    { to: 'delphox',    method: 'EXP', winsNeeded: 3 },
  froakie:    { to: 'frogadier',  method: 'EXP', winsNeeded: 2 },
  frogadier:  { to: 'greninja',   method: 'EXP', winsNeeded: 3 },
};

function getEvolutionRequirement(speciesId) {
  return EVOLUTION_CHAINS[speciesId] || null;
}

function evolveMonsterInstance(mon, targetSpeciesId) {
  const newSpecies = MONSTER_SPECIES.find(m => m.id === targetSpeciesId);
  if (!newSpecies) return null;
  const oldName = mon.name;

  const alreadyOwned = state.dex.some(p => p.id === newSpecies.id);

  mon.id = newSpecies.id;
  mon.pokedexNo = newSpecies.pokedexNo;
  mon.name = newSpecies.name;
  mon.type = newSpecies.type;
  mon.level = Math.max((mon.level || 12) + 4, newSpecies.level || 18);
  mon.maxHp = newSpecies.baseHp || (mon.maxHp + 35);
  mon.hp = mon.maxHp;
  mon.evoWins = 0;

  if (!alreadyOwned) {
    state.dex.push(mon);
  }

  if (typeof sfx !== 'undefined' && typeof sfx.grandVictoryFanfare === 'function') {
    sfx.grandVictoryFanfare();
  }

  if (alreadyOwned) {
    return `CONGRATULATIONS! Your ${oldName} evolved into ${newSpecies.name}! (Since you already owned ${newSpecies.name}, this extra evolved form was sent to Professor Oak!)`;
  }
  return `CONGRATULATIONS! Your ${oldName} evolved into ${newSpecies.name}!`;
}

function checkAndTriggerEvolution(mon) {
  if (!mon) return null;
  const req = getEvolutionRequirement(mon.id);
  if (!req || req.method !== 'EXP') return null;
  mon.evoWins = mon.evoWins || 0;
  if (mon.evoWins >= req.winsNeeded) {
    return evolveMonsterInstance(mon, req.to);
  }
  return null;
}

function tryStoneEvolution(mon, stoneItem) {
  if (!mon || !stoneItem) return null;
  const req = getEvolutionRequirement(mon.id);
  if (!req || req.method !== 'STONE') return null;
  if (stoneItem.stoneType === 'ANY' || req.stone === 'ANY' || req.stone === stoneItem.stoneType) {
    return evolveMonsterInstance(mon, req.to);
  }
  return null;
}

function createMonsterInstance(template) {
  const liveSpecies = (typeof MONSTER_SPECIES !== 'undefined' ? MONSTER_SPECIES.find(m => m.id === template.id) : null) || template;
  const allTypes = Object.keys(ELEMENT_TYPES);
  const charSum = liveSpecies.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const consistentRandomType = allTypes[charSum % allTypes.length];

  return {
    ...structuredClone(liveSpecies),
    maxHp: liveSpecies.baseHp || template.baseHp || 100,
    hp: liveSpecies.baseHp || template.baseHp || 100,
    evoWins: template.evoWins || 0,
    consistentRandomType: consistentRandomType === liveSpecies.type ? allTypes[(charSum + 1) % allTypes.length] : consistentRandomType
  };
}

function clearPartyTransformations() {
  if (!state.dex) return;
  state.dex.forEach(m => {
    delete m.transformedSpeciesId;
    delete m.transformedType;
    delete m.transformedRandomType;
  });
}

function getActivePlayer() {
  if (!state.dex || state.dex.length === 0) {
    state.dex = [createMonsterInstance(MONSTER_SPECIES[0])];
    state.activeDexIndex = 0;
  }
  if (state.activeDexIndex >= state.dex.length) state.activeDexIndex = 0;
  const dexMon = state.dex[state.activeDexIndex];
  const liveSpecies = MONSTER_SPECIES.find(m => m.id === dexMon.id);
  if (liveSpecies) {
    dexMon.name = liveSpecies.name;
    dexMon.type = liveSpecies.type;
  }
  return dexMon;
}

function findNextHealthyPartnerIndex() {
  if (!state.dex || state.dex.length === 0) return -1;
  for (let i = 0; i < state.dex.length; i++) {
    if (i !== state.activeDexIndex && state.dex[i].hp > 0) {
      return i;
    }
  }
  return -1;
}

function handleActivePartnerFainted() {
  const faintedMon = getActivePlayer();
  faintedMon.hp = 0;
  delete faintedMon.transformedSpeciesId;
  delete faintedMon.transformedType;
  delete faintedMon.transformedRandomType;
  syncAllUI();

  const nextIdx = findNextHealthyPartnerIndex();
  if (nextIdx !== -1) {
    state.activeDexIndex = nextIdx;
    const newPartner = getActivePlayer();
    const playerWrapper = document.getElementById('playerSpriteWrapper');
    if (playerWrapper) {
      playerWrapper.innerHTML = renderMonsterSVG(newPartner);
      triggerSpriteAnimation('player', 'anim-lunge-player');
    }
    sfx.pokemonCry(newPartner.id);
    if (typeof saveGameProgress === 'function') saveGameProgress();
    syncAllUI();
    setDialogue(`${faintedMon.name} fainted! Go, ${newPartner.name}! "${newPartner.name}! ${newPartner.name}~"`, 'PARTNER SWITCHED!');
    setTimeout(() => {
      state.busy = false;
    }, 1000);
  } else {
    clearPartyTransformations();
    state.dex.forEach(m => { m.hp = m.maxHp; });
    syncAllUI();
    setDialogue(`${faintedMon.name} fainted! All your partners are exhausted! Returning to Nurse Joy...`, 'PARTY FAINTED');
    setTimeout(() => {
      state.currentMapId = 'CENTER';
      teleportPlayerToGrid(14, 6);
      returnToOverworldFromBattle(`Nurse Joy restored all your Pokémon to full HP!`);
    }, 1600);
  }
}

function calculateCatchProbability(enemy) {
  if (!enemy) return 0.25;
  const currentHpAmount = Math.max(0, enemy.hp);

  // Actual absolute HP remaining = lower catch rate
  const rawProb = 0.95 - (currentHpAmount * 0.0055);
  return Math.min(0.95, Math.max(0.15, Math.round(rawProb * 100) / 100));
}

function setupBattleEncounter(chosenSpecies) {
  clearPartyTransformations();

  let activePlayer = getActivePlayer();
  if (activePlayer.hp <= 0) {
    const healthyIdx = findNextHealthyPartnerIndex();
    if (healthyIdx !== -1) {
      state.activeDexIndex = healthyIdx;
      activePlayer = getActivePlayer();
    } else {
      activePlayer.hp = activePlayer.maxHp;
    }
  }

  state.enemy = createMonsterInstance(chosenSpecies);

  const enemyWrapper = document.getElementById('enemySpriteWrapper');
  const playerWrapper = document.getElementById('playerSpriteWrapper');

  if (enemyWrapper) {
    enemyWrapper.innerHTML = renderMonsterSVG(state.enemy);
    enemyWrapper.style.boxShadow = 'none';
    enemyWrapper.style.filter = '';
    enemyWrapper.style.transform = '';
    enemyWrapper.style.transition = '';
    enemyWrapper.style.opacity = '1';
  }
  if (playerWrapper) {
    playerWrapper.innerHTML = renderMonsterSVG(activePlayer);
    playerWrapper.style.boxShadow = 'none';
    playerWrapper.style.filter = '';
    playerWrapper.style.transform = '';
    playerWrapper.style.transition = '';
    playerWrapper.style.opacity = '1';
  }

  setTimeout(() => sfx.pokemonCry(state.enemy.id), 350);

  showCommandView();
  setDialogue(`Wild ${state.enemy.name} (${state.enemy.type}) appeared! "${state.enemy.name}! ${state.enemy.name}~"`, 'WILD ENCOUNTER');
  syncAllUI();
}

function getHpColorClass(ratio) {
  if (ratio > 0.5) return 'bg-emerald-500';
  if (ratio > 0.22) return 'bg-amber-400';
  return 'bg-red-500 animate-pulse';
}

function getEvoStatusText(mon) {
  const req = getEvolutionRequirement(mon.id);
  if (!req) return 'MAX EVO ★';
  if (req.method === 'STONE') return `NEEDS ${req.stoneLabel} 💎`;
  return `EVO BAR: ${Math.min(req.winsNeeded, mon.evoWins || 0)}/${req.winsNeeded}`;
}

function syncAllUI() {
  const player = getActivePlayer();
  const enemy = state.enemy;
  const effectivePlayerType = player.transformedType || player.type;

  document.getElementById('playerName').textContent = player.name;
  document.getElementById('playerLevel').textContent = `Lv${player.level}`;
  const pTypeInfo = ELEMENT_TYPES[effectivePlayerType];
  const pBadge = document.getElementById('playerTypeBadge');
  pBadge.textContent = pTypeInfo ? pTypeInfo.name : effectivePlayerType;
  pBadge.className = `text-[7px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded text-white font-bold ${pTypeInfo ? pTypeInfo.badgeClass : 'bg-slate-700'}`;

  const pRatio = Math.max(0, player.hp / player.maxHp);
  const pBar = document.getElementById('playerHpBar');
  pBar.style.width = `${pRatio * 100}%`;
  pBar.className = `h-full transition-all duration-500 ease-out ${getHpColorClass(pRatio)}`;
  document.getElementById('playerHpNumbers').textContent = `${Math.max(0, player.hp)}/${player.maxHp}`;

  let evoContainer = document.getElementById('playerEvoBarWrap');
  const evoReq = getEvolutionRequirement(player.id);

  if (!evoReq || evoReq.method !== 'EXP') {
    if (evoContainer) {
      evoContainer.classList.add('hidden');
    }
  } else {
    if (!evoContainer) {
      const hpNumbersRow = document.getElementById('playerHpNumbers')?.parentElement;
      if (hpNumbersRow && hpNumbersRow.parentElement) {
        evoContainer = document.createElement('div');
        evoContainer.id = 'playerEvoBarWrap';
        evoContainer.className = 'w-full mt-1';
        hpNumbersRow.parentElement.appendChild(evoContainer);
      }
    }
    if (evoContainer) {
      evoContainer.classList.remove('hidden');
      evoContainer.innerHTML = `
        <div class="w-full bg-slate-900 p-0.5 rounded border border-slate-950 flex items-center gap-1">
          <span class="text-[6px] sm:text-[7px] text-purple-300 font-bold px-0.5">EVO</span>
          <div class="w-full h-1.5 bg-slate-700 rounded-sm overflow-hidden">
            <div id="playerEvoBar" class="h-full bg-purple-500 transition-all duration-500" style="width: 0%;"></div>
          </div>
          <span id="playerEvoText" class="text-[6px] sm:text-[7px] text-purple-200 px-0.5 shrink-0">0/3</span>
        </div>
      `;
    }

    const evoBar = document.getElementById('playerEvoBar');
    const evoText = document.getElementById('playerEvoText');
    if (evoBar && evoText) {
      const wins = Math.min(evoReq.winsNeeded, player.evoWins || 0);
      evoBar.style.width = `${(wins / evoReq.winsNeeded) * 100}%`;
      evoBar.className = 'h-full bg-purple-500 transition-all duration-500';
      evoText.textContent = `EXP ${wins}/${evoReq.winsNeeded}`;
    }
  }

  const atkBonus = Math.min(6, state.streak);
  const atkMult = (1 + atkBonus * 0.15).toFixed(2);
  document.getElementById('playerAtkStage').textContent = `ATK: +${atkBonus}`;

  document.getElementById('streakCountText').textContent = `${state.streak} (${atkMult}x)`;
  document.getElementById('dexCountText').textContent = `${state.dex.length}/${MONSTER_SPECIES.length}`;
  document.getElementById('btnSwitchSub').textContent = `DEX (${state.dex.length}/${MONSTER_SPECIES.length})`;

  if (typeof syncMapButtonState === 'function') syncMapButtonState();

  if (enemy) {
    document.getElementById('enemyName').textContent = enemy.name;
    document.getElementById('enemyLevel').textContent = `Lv${enemy.level}`;
    const eTypeInfo = ELEMENT_TYPES[enemy.type];
    const eBadge = document.getElementById('enemyTypeBadge');
    eBadge.textContent = eTypeInfo ? eTypeInfo.name : enemy.type;
    eBadge.className = `text-[7px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded text-white font-bold ${eTypeInfo ? eTypeInfo.badgeClass : 'bg-slate-700'}`;

    const zoneHint = document.getElementById('enemyZoneHint');
    if (zoneHint) {
      zoneHint.textContent = '';
      zoneHint.classList.add('hidden');
    }

    const alreadyOwned = state.dex.some(p => p.id === enemy.id);
    document.getElementById('enemyCaughtIcon').classList.toggle('hidden', !alreadyOwned);

    const eRatio = Math.max(0, enemy.hp / enemy.maxHp);
    const eBar = document.getElementById('enemyHpBar');
    eBar.style.width = `${eRatio * 100}%`;
    eBar.className = `h-full transition-all duration-500 ease-out ${getHpColorClass(eRatio)}`;
    document.getElementById('enemyHpNumbers').textContent = `${Math.max(0, enemy.hp)}/${enemy.maxHp}`;

    const catchProb = Math.round(calculateCatchProbability(enemy) * 100);
    const oddsLabel = document.getElementById('enemyCaptureOddsText');
    oddsLabel.textContent = `CATCH: ${catchProb}%`;
    document.getElementById('btnBallSub').textContent = `${catchProb}% CATCH RATE`;

    if (catchProb >= 75) oddsLabel.className = 'text-emerald-700 font-bold';
    else if (catchProb >= 45) oddsLabel.className = 'text-amber-700 font-bold';
    else oddsLabel.className = 'text-slate-600';
  }
}

function setDialogue(text, badgeText = 'BATTLE LOG') {
  if (state.typewriterTimer) clearInterval(state.typewriterTimer);
  const el = document.getElementById('dialogueText');
  document.getElementById('battleHintBadge').textContent = badgeText;
  el.textContent = '';
  let idx = 0;
  state.typewriterTimer = setInterval(() => {
    el.textContent += text.charAt(idx);
    idx++;
    if (idx >= text.length) clearInterval(state.typewriterTimer);
  }, 14);
}

function spawnFloatingText(target, text, colorClass = 'text-amber-300') {
  const container = document.getElementById(target === 'enemy' ? 'enemyFloatContainer' : 'playerFloatContainer');
  const badge = document.createElement('div');
  badge.className = `floating-dmg text-xs sm:text-sm font-bold ${colorClass} whitespace-nowrap`;
  badge.textContent = text;
  container.innerHTML = '';
  container.appendChild(badge);
  setTimeout(() => { if (badge.parentNode) badge.remove(); }, 1150);
}

function triggerSpriteAnimation(target, animClass) {
  const wrapper = document.getElementById(target === 'enemy' ? 'enemySpriteWrapper' : 'playerSpriteWrapper');
  if (!wrapper) return;
  // Clear inline transform/filter/transition so CSS keyframe animations always run cleanly
  wrapper.style.transition = '';
  wrapper.style.transform = '';
  wrapper.style.filter = '';
  if (wrapper._animTimeout) clearTimeout(wrapper._animTimeout);
  wrapper.classList.remove('anim-idle', 'anim-hit', 'anim-lunge-player', 'anim-lunge-enemy', 'anim-ball-throw', 'anim-ball-shake');
  void wrapper.offsetWidth;
  wrapper.classList.add(animClass);
  wrapper._animTimeout = setTimeout(() => {
    wrapper.classList.remove(animClass);
    wrapper.classList.add('anim-idle');
  }, 560);
}

function hideAllBottomViews() {
  document.getElementById('commandView').classList.add('hidden');
  document.getElementById('moveSelectView').classList.add('hidden');
  document.getElementById('quizCombatView').classList.add('hidden');
  document.getElementById('dexSwitchView').classList.add('hidden');
}

function showCommandView() {
  hideAllBottomViews();
  document.getElementById('commandView').classList.remove('hidden');
}

function showMoveSelectView() {
  if (state.busy) return;
  sfx.blip();
  hideAllBottomViews();
  document.getElementById('moveSelectView').classList.remove('hidden');
  renderMoveButtons();
}

function executeDittoTransform() {
  if (state.busy) return;
  const player = getActivePlayer();
  const enemy = state.enemy;
  if (!enemy) return;

  state.busy = true;
  if (typeof sfx.transformEffect === 'function') {
    sfx.transformEffect();
  } else {
    sfx.pokemonCry(enemy.id);
  }

  const playerWrapper = document.getElementById('playerSpriteWrapper');
  let blinks = 0;
  const maxBlinks = 6;

  const blinkTimer = setInterval(() => {
    if (playerWrapper) {
      playerWrapper.style.opacity = (blinks % 2 === 0) ? '0.1' : '1';
    }
    blinks++;
    if (blinks >= maxBlinks) {
      clearInterval(blinkTimer);
      if (playerWrapper) playerWrapper.style.opacity = '1';

      player.transformedSpeciesId = enemy.id;
      player.transformedType = enemy.type;
      player.transformedRandomType = enemy.consistentRandomType;

      if (playerWrapper) {
        playerWrapper.innerHTML = renderMonsterSVG(enemy.id);
      }
      sfx.pokemonCry(enemy.id);
      spawnFloatingText('player', `TRANSFORMED!`, 'text-purple-300');
      syncAllUI();
      renderMoveButtons();
      setDialogue(`${player.name} transformed into ${enemy.name} and copied its moveset completely!`, 'TRANSFORM ★');
      state.busy = false;
    }
  }, 85);
}

function renderMoveButtons() {
  const grid = document.getElementById('moveButtonsGrid');
  grid.innerHTML = '';
  const player = getActivePlayer();
  const enemy = state.enemy;

  const activeType = player.transformedType || player.type;
  const secondaryType = player.transformedRandomType || player.consistentRandomType || 'NORMAL';
  const primarySubject = ELEMENT_TYPES[activeType] ? ELEMENT_TYPES[activeType].subject : 'General';
  const secondarySubject = ELEMENT_TYPES[secondaryType] ? ELEMENT_TYPES[secondaryType].subject : 'General';

  const isUntransformedDitto = player.id === 'ditto' && !player.transformedSpeciesId;

  const moveConfigs = [
    { title: 'NORMAL STRIKE', typeId: 'NORMAL', diff: 1, desc: 'Everyday Logic (★1 • Normal)' },
    { title: `${activeType} EASY STRIKE`, typeId: activeType, diff: 1, desc: `${primarySubject} (★1 • Easy STAB)` },
    { title: `${activeType} MEDIUM STRIKE`, typeId: activeType, diff: 2, desc: `${primarySubject} (★★2 • Medium STAB)` },
    isUntransformedDitto
      ? { title: 'TRANSFORM', typeId: 'NORMAL', diff: 1, isTransform: true, desc: `Morph into ${enemy ? enemy.name : 'Enemy'} & copy moves` }
      : { title: `${secondaryType} WILD STRIKE`, typeId: secondaryType, diff: 2, desc: `${secondarySubject} (★★2 • Partner Move)` }
  ];

  moveConfigs.forEach(cfg => {
    const typeObj = ELEMENT_TYPES[cfg.typeId] || { name: cfg.typeId, btnClass: 'bg-slate-700 text-white', badgeClass: 'bg-slate-700' };
    const mult = getEffectiveness(cfg.typeId, enemy.type);
    const hasStab = activeType === cfg.typeId && cfg.typeId !== 'NORMAL';

    let effLabel = cfg.isTransform ? 'MORPH ★' : '1x';
    let effBadgeClass = cfg.isTransform ? 'bg-purple-300 text-slate-950 font-bold animate-pulse' : 'bg-slate-900/40 text-white';
    if (!cfg.isTransform) {
      if (mult > 1) {
        effLabel = 'SUPER (2x!)';
        effBadgeClass = 'bg-yellow-300 text-slate-950 animate-pulse';
      } else if (mult < 1) {
        effLabel = 'NOT VERY (0.5x)';
        effBadgeClass = 'bg-slate-800/70 text-slate-300';
      }
    }

    const btn = document.createElement('button');
    btn.className = `pixel-btn ${typeObj.btnClass} p-2.5 sm:p-3 flex flex-col justify-between text-left gap-1.5`;
    btn.innerHTML = `
      <div class="flex items-center justify-between w-full gap-1">
        <span class="text-xs sm:text-sm font-bold">${cfg.title}</span>
        ${cfg.isTransform ? '<span class="text-[8px] px-1.5 py-0.5 rounded bg-white/90 text-slate-950 font-bold">NORMAL</span>' : (hasStab ? '<span class="text-[8px] px-1.5 py-0.5 rounded bg-white/90 text-slate-950 font-bold">STAB</span>' : '')}
      </div>
      <div class="flex items-center justify-between w-full gap-1">
        <span class="text-[8px] sm:text-[9px] opacity-95">${cfg.desc}</span>
        <span class="text-[8px] px-1.5 py-0.5 rounded font-bold ${effBadgeClass}">${effLabel}</span>
      </div>
    `;
    btn.addEventListener('click', () => {
      if (cfg.isTransform) {
        executeDittoTransform();
      } else {
        startElementalTriviaAttack(cfg.typeId, cfg.diff);
      }
    });
    grid.appendChild(btn);
  });
}

function pickRandomQuestion(elementType = null, difficulty = null) {
  let pool = (state && Array.isArray(state.questions) && state.questions.length > 0)
    ? state.questions
    : (typeof DEFAULT_QUESTIONS !== 'undefined' ? DEFAULT_QUESTIONS : []);

  if (pool.length === 0) {
    return {
      chosen: { q: 'What is 2 + 2?', options: ['4', '5', '3', '6'], answer: 0, difficulty: 1, type: 'NORMAL' },
      indexedOptions: [
        { text: '4', isCorrect: true },
        { text: '5', isCorrect: false },
        { text: '3', isCorrect: false },
        { text: '6', isCorrect: false }
      ]
    };
  }

  if (elementType) {
    const filtered = pool.filter(q => q.type === elementType);
    if (filtered.length > 0) pool = filtered;
  }
  if (difficulty !== null) {
    const diffPool = pool.filter(q => q.difficulty === difficulty);
    if (diffPool.length > 0) pool = diffPool;
  }

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const indexedOptions = chosen.options.map((text, idx) => ({
    text,
    isCorrect: idx === chosen.answer
  }));

  for (let i = indexedOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexedOptions[i], indexedOptions[j]] = [indexedOptions[j], indexedOptions[i]];
  }
  return { chosen, indexedOptions };
}

function getDifficultyMultiplier(diff) {
  if (diff === 3) return 1.75;
  if (diff === 2) return 1.35;
  return 1.0;
}

function startElementalTriviaAttack(elementType, difficulty = 2) {
  sfx.blip();
  state.selectedAttackType = elementType;
  state.selectedDifficulty = difficulty;
  launchQuizQuestion(elementType, difficulty, 25.0);
}

function startCaptureBallSequence() {
  if (state.busy) return;
  state.busy = true;
  showCommandView();

  const enemy = state.enemy;
  const catchProb = calculateCatchProbability(enemy);
  const pctText = Math.round(catchProb * 100);

  sfx.ballThrow();

  const targetContainer = document.getElementById('enemyContainer');
  if (targetContainer) {
    const flyingBall = document.createElement('div');
    flyingBall.className = 'absolute z-50 w-10 h-10 transition-all duration-600 ease-out pointer-events-none';
    flyingBall.style.left = '-140px';
    flyingBall.style.bottom = '-40px';
    flyingBall.style.transform = 'scale(0.8)';
    flyingBall.innerHTML = renderCaptureBallSVG(false);
    targetContainer.appendChild(flyingBall);

    void flyingBall.offsetWidth;
    setTimeout(() => {
      flyingBall.style.left = '16px';
      flyingBall.style.bottom = '16px';
      flyingBall.style.transform = 'scale(0.8)';
    }, 40);
    setTimeout(() => flyingBall.remove(), 620);
  }

  setDialogue(`Threw a Capture Ball at ${enemy.name}! (HP Catch Rate: ${pctText}%)...`, 'THROWING BALL');

  setTimeout(() => {
    const enemyWrapper = document.getElementById('enemySpriteWrapper');
    if (enemyWrapper) {
      enemyWrapper.style.transition = 'transform 0.3s ease-in, opacity 0.3s ease-in';
      enemyWrapper.style.transform = 'scale(0.1)';
      enemyWrapper.style.opacity = '0';

      setTimeout(() => {
        enemyWrapper.style.transition = '';
        enemyWrapper.style.transform = '';
        enemyWrapper.style.opacity = '1';
        enemyWrapper.innerHTML = renderCaptureBallSVG(false);

        const isCaught = Math.random() < catchProb;
        const totalShakes = isCaught ? 3 : (Math.floor(Math.random() * 2) + 1);

        let currentShake = 0;
        const runNextShake = () => {
          currentShake++;
          if (currentShake <= totalShakes) {
            sfx.ballShake();
            triggerSpriteAnimation('enemy', 'anim-ball-shake');
            spawnFloatingText('enemy', `SHAKE ${currentShake}...`, 'text-amber-300');
            setTimeout(runNextShake, 750);
          } else if (isCaught) {
            sfx.captureFanfare();
            enemyWrapper.innerHTML = renderCaptureBallSVG(true);
            spawnFloatingText('enemy', 'GOTCHA! ★', 'text-emerald-300');

            const alreadyInDex = state.dex.some(p => p.id === enemy.id);
            if (!alreadyInDex) {
              state.dex.push(createMonsterInstance(enemy));
              setDialogue(`GOTCHA! ${enemy.name} was caught and saved to your Dex! (${state.dex.length}/${MONSTER_SPECIES.length})`, 'CAPTURED! ★');
            } else {
              setDialogue(`GOTCHA! ${enemy.name} was caught again! The extra Pokémon was sent to Professor Oak's Lab!`, 'PROFESSOR OAK 📦');
            }
            clearPartyTransformations();
            if (typeof saveGameProgress === 'function') saveGameProgress();
            syncAllUI();

            setTimeout(() => {
              returnToOverworldFromBattle(alreadyInDex 
                ? `GOTCHA! Extra ${enemy.name} caught and transferred to Professor Oak!` 
                : `GOTCHA! ${enemy.name} (${enemy.type}) registered & auto-saved in your Dex! (${state.dex.length}/${MONSTER_SPECIES.length})`);
            }, 2000);
          } else {
            sfx.wrongBuzzer();
            
            enemyWrapper.innerHTML = renderMonsterSVG(enemy);
            enemyWrapper.style.transition = '';
            enemyWrapper.style.transform = '';
            enemyWrapper.style.opacity = '1';

            const enemyDmg = 18;
            const player = getActivePlayer();
            player.hp = Math.max(0, player.hp - enemyDmg);

            triggerSpriteAnimation('enemy', 'anim-lunge-enemy');
            setTimeout(() => {
              triggerSpriteAnimation('player', 'anim-hit');
              spawnFloatingText('player', `-${enemyDmg} HP`, 'text-red-400');
              syncAllUI();
            }, 240);

            setDialogue(`Argh! Wild ${enemy.name} broke free (${pctText}% odds) and counterattacked for ${enemyDmg} DMG!`, 'BROKE FREE!');
            setTimeout(() => {
              if (player.hp <= 0) {
                handleActivePartnerFainted();
              } else {
                state.busy = false;
              }
            }, 950);
          }
        };
        setTimeout(runNextShake, 600);
      }, 300);
    }
  }, 550);
}

function launchQuizQuestion(elementType, difficulty, durationSeconds) {
  hideAllBottomViews();
  document.getElementById('quizCombatView').classList.remove('hidden');

  const { chosen, indexedOptions } = pickRandomQuestion(elementType, difficulty);
  state.currentQuestion = chosen;
  state.shuffledOptions = indexedOptions;
  state.maxTime = durationSeconds;
  state.timeRemaining = durationSeconds;
  state.questionStartTime = performance.now();

  const tInfo = ELEMENT_TYPES[elementType] || { name: elementType, subject: 'General', badgeClass: 'bg-slate-700' };
  const contextBadge = document.getElementById('quizContextBadge');
  contextBadge.textContent = `${tInfo.name} • ${tInfo.subject.toUpperCase()}`;
  contextBadge.className = `text-[9px] sm:text-[10px] px-2 py-1 rounded text-white font-bold ${tInfo.badgeClass}`;

  const diff = chosen.difficulty || difficulty;
  const diffBadge = document.getElementById('quizDifficultyBadge');
  if (diff >= 2) {
    diffBadge.textContent = '★★ MEDIUM (1.35x DMG)';
    diffBadge.className = 'text-[9px] px-2 py-1 rounded bg-purple-200 text-purple-950 font-bold border border-purple-500';
  } else {
    diffBadge.textContent = '★ EASY (1.0x DMG)';
    diffBadge.className = 'text-[9px] px-2 py-1 rounded bg-emerald-200 text-emerald-950 font-bold border border-emerald-500';
  }

  const mult = getEffectiveness(elementType, state.enemy.type);
  document.getElementById('quizMultiplierBadge').textContent = `${mult}x TYPE EFFECT`;

  document.getElementById('quizQuestionText').textContent = chosen.q;
  const choicesGrid = document.getElementById('quizChoicesGrid');
  choicesGrid.innerHTML = '';

  const labels = ['A', 'B', 'C', 'D'];
  indexedOptions.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'pixel-btn bg-white hover:bg-indigo-50 text-slate-900 p-2 sm:p-2.5 text-left flex items-center gap-2';
    btn.innerHTML = `
      <span class="inline-block px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 text-[9px] font-bold shrink-0">${labels[i]}</span>
      <span class="text-[10px] sm:text-xs leading-tight">${opt.text}</span>
    `;
    btn.addEventListener('click', () => handleQuizAnswer(opt.isCorrect, btn));
    choicesGrid.appendChild(btn);
  });

  startQuizCountdown();
}

function startQuizCountdown() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  const timerBar = document.getElementById('quizTimerBar');
  const timerText = document.getElementById('quizTimerText');
  const speedBadge = document.getElementById('speedBonusIndicator');

  state.timerInterval = setInterval(() => {
    const elapsed = (performance.now() - state.questionStartTime) / 1000;
    state.timeRemaining = Math.max(0, state.maxTime - elapsed);

    const timeRatio = state.timeRemaining / state.maxTime;
    const pct = timeRatio * 100;
    timerBar.style.width = `${pct}%`;
    timerText.textContent = `${state.timeRemaining.toFixed(1)}s`;

    const liveSpeedMult = (0.60 + 1.00 * timeRatio).toFixed(2);
    speedBadge.textContent = `⚡ SPEED: ${liveSpeedMult}x`;

    if (pct > 55) timerBar.className = 'h-full bg-emerald-500 transition-all duration-75';
    else if (pct > 25) timerBar.className = 'h-full bg-amber-400 transition-all duration-75';
    else timerBar.className = 'h-full bg-red-600 transition-all duration-75';

    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval);
      handleQuizAnswer(false, null, true);
    }
  }, 60);
}

function handleQuizAnswer(isCorrect, clickedBtn, isTimeout = false) {
  if (state.busy) return;
  state.busy = true;
  if (state.timerInterval) clearInterval(state.timerInterval);

  const timeRatio = Math.max(0, state.timeRemaining / state.maxTime);
  const speedMult = 0.60 + 1.00 * timeRatio;

  const allButtons = document.querySelectorAll('#quizChoicesGrid button');
  allButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (state.shuffledOptions[idx].isCorrect) {
      btn.className = 'pixel-btn bg-emerald-500 text-white p-2 sm:p-2.5 text-left flex items-center gap-2';
    } else if (btn === clickedBtn && !isCorrect) {
      btn.className = 'pixel-btn bg-red-600 text-white p-2 sm:p-2.5 text-left flex items-center gap-2';
    }
  });

  setTimeout(() => resolveAttackOutcome(isCorrect, speedMult, isTimeout), 650);
}

function resolveAttackOutcome(isCorrect, speedMult, isTimeout) {
  showCommandView();
  const player = getActivePlayer();
  const enemy = state.enemy;
  const activeType = player.transformedType || player.type;

  if (isCorrect) {
    state.streak++;
    const basePower = 24;
    const diff = state.selectedDifficulty || state.currentQuestion?.difficulty || 2;
    const diffMult = getDifficultyMultiplier(diff);
    const typeMult = getEffectiveness(state.selectedAttackType, enemy.type);
    const stabMult = activeType === state.selectedAttackType && state.selectedAttackType !== 'NORMAL' ? 1.25 : 1.0;
    const streakMult = 1 + Math.min(6, state.streak - 1) * 0.12;

    const totalDmg = Math.max(8, Math.round(basePower * diffMult * speedMult * typeMult * stabMult * streakMult));
    enemy.hp = Math.max(0, enemy.hp - totalDmg);

    triggerSpriteAnimation('player', 'anim-lunge-player');
    setTimeout(() => {
      sfx.attackHit(typeMult > 1);
      triggerSpriteAnimation('enemy', 'anim-hit');
      spawnFloatingText('enemy', `-${totalDmg} HP (${speedMult.toFixed(2)}x SPD)`, typeMult > 1 ? 'text-amber-300' : 'text-white');
      syncAllUI();
    }, 220);

    let msg = `${player.name} used ${state.selectedAttackType} STRIKE! `;
    if (typeMult > 1) msg += "SUPER EFFECTIVE! ";
    msg += `Dealt ${totalDmg} DMG!`;
    setDialogue(msg, 'DIRECT HIT!');

    setTimeout(() => {
      if (enemy.hp <= 0) {
        clearPartyTransformations();
        const req = getEvolutionRequirement(player.id);
        let evoMessage = null;

        if (req && req.method === 'EXP') {
          player.evoWins = (player.evoWins || 0) + 1;
          evoMessage = checkAndTriggerEvolution(player);
        }

        const playerWrapper = document.getElementById('playerSpriteWrapper');
        if (evoMessage && playerWrapper) {
          playerWrapper.innerHTML = renderMonsterSVG(player);
        }
        syncAllUI();
        if (typeof saveGameProgress === 'function') saveGameProgress();

        sfx.captureFanfare();
        let victoryLog = `Wild ${enemy.name} fainted!`;
        if (evoMessage) {
          victoryLog = `Wild ${enemy.name} fainted! ★ ${evoMessage}`;
        } else if (req && req.method === 'EXP') {
          victoryLog = `Wild ${enemy.name} fainted! (${player.name} EXP EVO BAR: ${player.evoWins}/${req.winsNeeded})!`;
        } else if (req && req.method === 'STONE') {
          victoryLog = `Wild ${enemy.name} fainted! (Find a ${req.stoneLabel} on the map to evolve ${player.name})!`;
        }

        setDialogue(victoryLog, evoMessage ? 'EVOLUTION! ★' : 'VICTORY!');
        setTimeout(() => {
          returnToOverworldFromBattle(victoryLog);
        }, 1800);
      } else {
        state.busy = false;
      }
    }, 900);

  } else {
    state.streak = 0;
    sfx.wrongBuzzer();
    const enemyDmg = Math.round(24 + enemy.level * 1.2);
    player.hp = Math.max(0, player.hp - enemyDmg);

    // Trigger enemy lunge animation when it counterattacks
    triggerSpriteAnimation('enemy', 'anim-lunge-enemy');

    setTimeout(() => {
      triggerSpriteAnimation('player', 'anim-hit');
      spawnFloatingText('player', `-${enemyDmg} HP`, 'text-red-400');
      syncAllUI();
    }, 220);

    const reason = isTimeout ? 'TIME UP!' : 'INCORRECT!';
    setDialogue(`${reason} Combo streak reset! Wild ${enemy.name} counterattacked ${player.name} for ${enemyDmg} DMG!`, 'COUNTERATTACK!');

    setTimeout(() => {
      if (player.hp <= 0) {
        handleActivePartnerFainted();
      } else {
        state.busy = false;
      }
    }, 1200);
  }
}

/********************************************************************
 * DEX SWITCHERS & 100% POKéDEX COMPLETION CELEBRATION
 ********************************************************************/
function showDexSwitchView() {
  if (state.busy) return;
  sfx.blip();
  hideAllBottomViews();
  document.getElementById('dexSwitchView').classList.remove('hidden');

  const container = document.getElementById('dexGridContainer');
  container.innerHTML = '';

  state.dex.forEach((mon, idx) => {
    const liveSpecies = MONSTER_SPECIES.find(m => m.id === mon.id) || mon;
    const displayName = liveSpecies.name;
    const displayType = liveSpecies.type;
    const isCurrent = idx === state.activeDexIndex;
    const isFainted = mon.hp <= 0;
    const tInfo = ELEMENT_TYPES[displayType] || { name: displayType, badgeClass: 'bg-slate-700' };

    const card = document.createElement('button');
    card.disabled = isFainted;
    card.className = `pixel-btn ${isCurrent ? 'bg-amber-100 border-amber-500' : (isFainted ? 'bg-slate-300 opacity-60' : 'bg-white hover:bg-slate-100')} text-slate-900 p-2.5 flex items-center gap-2.5 text-left w-full`;
    card.innerHTML = `
      <div class="w-12 h-12 shrink-0 bg-slate-200 rounded p-1 border border-slate-400">
        ${renderMonsterSVG(mon)}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-1">
          <span class="text-[10px] font-bold truncate">${displayName}</span>
          ${isCurrent ? '<span class="text-[8px] bg-amber-400 text-slate-950 px-1 rounded">PARTNER</span>' : (isFainted ? '<span class="text-[8px] bg-red-600 text-white px-1 rounded">FAINTED</span>' : '')}
        </div>
        <div class="flex items-center gap-1 mt-1">
          <span class="text-[8px] px-1.5 py-0.5 rounded text-white ${tInfo.badgeClass}">${displayType}</span>
          <span class="text-[8px] text-slate-600">HP ${Math.max(0, mon.hp)}/${mon.maxHp} • ${getEvoStatusText(mon)}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      if (isFainted) return;
      if (idx === state.activeDexIndex) {
        showCommandView();
        return;
      }
      clearPartyTransformations();
      sfx.pokemonCry(mon.id);
      state.activeDexIndex = idx;
      if (typeof saveGameProgress === 'function') saveGameProgress();
      const playerWrapper = document.getElementById('playerSpriteWrapper');
      if (playerWrapper) playerWrapper.innerHTML = renderMonsterSVG(getActivePlayer());
      syncAllUI();
      showCommandView();
      setDialogue(`Partner switched to ${displayName}! "${displayName}! ${displayName}~"`, 'PARTNER SWITCHED!');
    });
    container.appendChild(card);
  });
}

function getMonsterHabitatName(monsterId, monsterName) {
  if (typeof WORLD_MAPS === 'undefined') return 'Unknown';
  const cleanId = (monsterId || '').toLowerCase();
  const cleanName = (monsterName || '').toLowerCase();
  
  for (const mapKey of Object.keys(WORLD_MAPS)) {
    const mapObj = WORLD_MAPS[mapKey];
    if (mapObj.encounters && mapObj.encounters.some(e => e.toLowerCase() === cleanId || e.toLowerCase() === cleanName)) {
      return mapObj.name.replace(/\s*\([^)]*\)\s*/g, '').trim();
    }
  }
  return 'Unknown';
}

function openOverworldDexModal() {
  sfx.blip();
  const list = document.getElementById('overworldDexList');
  if (!list) return;
  list.innerHTML = '';

  const totalMonsters = MONSTER_SPECIES.length;
  const caughtCount = state.dex.length;
  const pct = Math.round((caughtCount / totalMonsters) * 100);

  const summaryBox = document.createElement('div');
  summaryBox.className = 'col-span-full bg-slate-900 text-amber-300 p-2.5 rounded border-2 border-amber-500 flex items-center justify-between text-[9px] sm:text-[10px] font-bold mb-1';
  summaryBox.innerHTML = `
    <span>📊 DEX COMPLETION: ${caughtCount} / ${totalMonsters} (${pct}%)</span>
    <span class="text-emerald-400">${caughtCount >= 30 ? '✈️ FLY UNLOCKED' : caughtCount >= 20 ? '🗺️ WORLD MAP UNLOCKED' : `NEED ${20 - caughtCount} MORE FOR MAP`}</span>
  `;
  list.appendChild(summaryBox);

  MONSTER_SPECIES.forEach(species => {
    const dexIndex = state.dex.findIndex(p => p.id === species.id);
    const caughtMon = dexIndex !== -1 ? state.dex[dexIndex] : null;
    const isCurrent = dexIndex === state.activeDexIndex;
    const tInfo = ELEMENT_TYPES[species.type] || { name: species.type, badgeClass: 'bg-slate-700' };
    const habitatLocation = getMonsterHabitatName(species.id, species.name);

    const card = document.createElement('div');
    card.className = `pixel-btn ${caughtMon ? (isCurrent ? 'bg-amber-100' : 'bg-white') : 'bg-slate-200 opacity-65'} text-slate-900 p-2.5 flex items-center gap-3`;
    card.innerHTML = `
      <div class="w-12 h-12 shrink-0 bg-slate-800 rounded p-1 border border-slate-900">
        ${renderMonsterSVG(species)}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-1">
          <span class="text-[10px] font-bold truncate">#${species.pokedexNo} ${species.name}</span>
          <span class="text-[8px] px-1.5 py-0.5 rounded text-white ${tInfo.badgeClass}">${species.type}</span>
        </div>
        <div class="text-[8px] text-slate-600 mt-1">
          ${caughtMon ? `CAUGHT • HP ${Math.max(0, caughtMon.hp)}/${caughtMon.maxHp} • ${getEvoStatusText(caughtMon)} ${isCurrent ? '★ ACTIVE' : ''}` : `📍 HABITAT: ${habitatLocation}`}
        </div>
      </div>
    `;
    if (caughtMon) {
      card.addEventListener('click', () => {
        if (caughtMon.hp <= 0) caughtMon.hp = caughtMon.maxHp;
        sfx.pokemonCry(species.id);
        state.activeDexIndex = dexIndex;
        if (typeof saveGameProgress === 'function') saveGameProgress();
        syncAllUI();
        openOverworldDexModal();
      });
    }
    list.appendChild(card);
  });

  const modal = document.getElementById('overworldDexModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function checkAllMonstersCaughtCelebration() {
  if (state.dex.length >= MONSTER_SPECIES.length && !state.celebrationShown) {
    state.celebrationShown = true;
    launchGrandCelebrationModal();
  }
}

function launchGrandCelebrationModal() {
  const modal = document.getElementById('congratsModal');
  const stage = document.getElementById('floatingPokemonStage');
  if (!modal || !stage) return;

  sfx.grandVictoryFanfare();
  stage.innerHTML = '';

  MONSTER_SPECIES.forEach((mon, idx) => {
    const floater = document.createElement('div');
    floater.className = 'absolute w-12 h-12 sm:w-16 sm:h-16 pointer-events-none float-celebrate';
    floater.style.left = `${(idx * 19) % 88 + 3}%`;
    floater.style.top = `${(idx * 23) % 80 + 6}%`;
    floater.style.animationDelay = `${(idx * 0.17).toFixed(2)}s`;
    floater.style.animationDuration = `${3.2 + (idx % 4) * 0.6}s`;
    floater.innerHTML = renderMonsterSVG(mon);
    stage.appendChild(floater);
  });

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}