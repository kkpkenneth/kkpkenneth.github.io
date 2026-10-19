/********************************************************************
 * battle.js
 * Trivia Combat Engine, Difficulty x Speed Math, HP Catch & Partner/Dex UI
 ********************************************************************/

function createMonsterInstance(template) {
  return {
    ...structuredClone(template),
    maxHp: template.baseHp,
    hp: template.baseHp
  };
}

function getActivePlayer() {
  return state.dex[state.activeDexIndex];
}

function calculateCatchProbability(enemy) {
  if (!enemy) return 0.25;
  const hpRatio = Math.max(0, enemy.hp / enemy.maxHp);
  return Math.min(0.95, Math.max(0.20, Math.round((0.95 - 0.70 * hpRatio) * 100) / 100));
}

function setupBattleEncounter(chosenSpecies) {
  const activePlayer = getActivePlayer();
  state.enemy = createMonsterInstance(chosenSpecies);

  document.getElementById('enemySpriteWrapper').innerHTML = renderMonsterSVG(state.enemy);
  document.getElementById('playerSpriteWrapper').innerHTML = renderMonsterSVG(activePlayer);

  showCommandView();
  setDialogue(`Wild ${state.enemy.name} (${state.enemy.type}) appeared in ${getCurrentMap().name}! Answer fast on tough questions for huge damage, or throw a BALL!`, 'WILD ENCOUNTER');
  syncAllUI();
}

function getHpColorClass(ratio) {
  if (ratio > 0.5) return 'bg-emerald-500';
  if (ratio > 0.22) return 'bg-amber-400';
  return 'bg-red-500 animate-pulse';
}

function syncAllUI() {
  const player = getActivePlayer();
  const enemy = state.enemy;

  document.getElementById('playerName').textContent = player.name;
  document.getElementById('playerLevel').textContent = `Lv${player.level}`;
  const pTypeInfo = ELEMENT_TYPES[player.type];
  const pBadge = document.getElementById('playerTypeBadge');
  pBadge.textContent = pTypeInfo.name;
  pBadge.className = `text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded text-white font-bold ${pTypeInfo.badgeClass}`;

  const pRatio = Math.max(0, player.hp / player.maxHp);
  const pBar = document.getElementById('playerHpBar');
  pBar.style.width = `${pRatio * 100}%`;
  pBar.className = `h-full transition-all duration-500 ease-out ${getHpColorClass(pRatio)}`;
  document.getElementById('playerHpNumbers').textContent = `${Math.max(0, player.hp)}/${player.maxHp}`;

  const atkBonus = Math.min(6, state.streak);
  const atkMult = (1 + atkBonus * 0.15).toFixed(2);
  document.getElementById('playerAtkStage').textContent = `ATK STAGE: +${atkBonus}`;
  document.getElementById('playerStreakBar').style.width = `${Math.min(100, (state.streak / 6) * 100)}%`;

  document.getElementById('streakCountText').textContent = `${state.streak} (${atkMult}x)`;
  document.getElementById('dexCountText').textContent = `${state.dex.length}/${MONSTER_SPECIES.length}`;
  document.getElementById('btnSwitchSub').textContent = `DEX (${state.dex.length})`;

  const dexSlotsEl = document.getElementById('headerDexSlots');
  if (dexSlotsEl) {
    dexSlotsEl.innerHTML = '';
    for (let i = 0; i < MONSTER_SPECIES.length; i++) {
      const mon = state.dex[i];
      const dot = document.createElement('div');
      if (mon) {
        const isCurrent = i === state.activeDexIndex;
        dot.className = `w-3.5 h-3.5 rounded-full border-2 ${isCurrent ? 'bg-amber-400 border-white scale-110' : 'bg-emerald-500 border-slate-200'}`;
        dot.title = `${mon.name} (${mon.type}) - HP ${mon.hp}/${mon.maxHp}`;
      } else {
        dot.className = 'w-3.5 h-3.5 rounded-full border border-slate-600 bg-slate-800';
        dot.title = 'Uncaught in Dex';
      }
      dexSlotsEl.appendChild(dot);
    }
  }

  if (enemy) {
    document.getElementById('enemyName').textContent = enemy.name;
    document.getElementById('enemyLevel').textContent = `Lv${enemy.level}`;
    const eTypeInfo = ELEMENT_TYPES[enemy.type];
    const eBadge = document.getElementById('enemyTypeBadge');
    eBadge.textContent = eTypeInfo.name;
    eBadge.className = `text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded text-white font-bold ${eTypeInfo.badgeClass}`;

    const alreadyOwned = state.dex.some(p => p.id === enemy.id);
    document.getElementById('enemyCaughtIcon').classList.toggle('hidden', !alreadyOwned);

    const eRatio = Math.max(0, enemy.hp / enemy.maxHp);
    const eBar = document.getElementById('enemyHpBar');
    eBar.style.width = `${eRatio * 100}%`;
    eBar.className = `h-full transition-all duration-500 ease-out ${getHpColorClass(eRatio)}`;
    document.getElementById('enemyHpNumbers').textContent = `${Math.max(0, enemy.hp)}/${enemy.maxHp}`;

    const catchProb = Math.round(calculateCatchProbability(enemy) * 100);
    const oddsLabel = document.getElementById('enemyCaptureOddsText');
    oddsLabel.textContent = `CATCH RATE: ${catchProb}%`;
    document.getElementById('btnBallSub').textContent = `${catchProb}% CATCH RATE`;

    if (catchProb >= 75) {
      oddsLabel.className = 'text-emerald-700 font-bold';
    } else if (catchProb >= 45) {
      oddsLabel.className = 'text-amber-700 font-bold';
    } else {
      oddsLabel.className = 'text-slate-600';
    }
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
    if (idx >= text.length) {
      clearInterval(state.typewriterTimer);
    }
  }, 14);
}

function spawnFloatingText(target, text, colorClass = 'text-amber-300') {
  const container = document.getElementById(target === 'enemy' ? 'enemyFloatContainer' : 'playerFloatContainer');
  const badge = document.createElement('div');
  badge.className = `floating-dmg text-xs sm:text-sm font-bold ${colorClass} whitespace-nowrap`;
  badge.textContent = text;
  container.innerHTML = '';
  container.appendChild(badge);
  setTimeout(() => {
    if (badge.parentNode) badge.remove();
  }, 1150);
}

function triggerSpriteAnimation(target, animClass) {
  const wrapper = document.getElementById(target === 'enemy' ? 'enemySpriteWrapper' : 'playerSpriteWrapper');
  wrapper.classList.remove('anim-idle', 'anim-hit', 'anim-lunge-player', 'anim-lunge-enemy', 'anim-ball-throw', 'anim-ball-shake');
  void wrapper.offsetWidth;
  wrapper.classList.add(animClass);
  setTimeout(() => {
    wrapper.classList.remove(animClass);
    wrapper.classList.add('anim-idle');
  }, 580);
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

function renderMoveButtons() {
  const grid = document.getElementById('moveButtonsGrid');
  grid.innerHTML = '';
  const player = getActivePlayer();
  const enemy = state.enemy;

  Object.values(ELEMENT_TYPES).forEach(typeObj => {
    const mult = getEffectiveness(typeObj.id, enemy.type);
    const hasStab = player.type === typeObj.id;

    let effLabel = 'NORMAL (1x)';
    let effBadgeClass = 'bg-slate-900/40 text-white';
    if (mult > 1) {
      effLabel = 'SUPER EFFECTIVE (2x!)';
      effBadgeClass = 'bg-yellow-300 text-slate-950 animate-pulse';
    } else if (mult < 1) {
      effLabel = 'NOT VERY EFFECTIVE (0.5x)';
      effBadgeClass = 'bg-slate-800/70 text-slate-300';
    }

    const btn = document.createElement('button');
    btn.className = `pixel-btn ${typeObj.btnClass} p-2.5 sm:p-3 flex flex-col justify-between text-left gap-1.5`;
    btn.innerHTML = `
      <div class="flex items-center justify-between w-full gap-1">
        <span class="text-xs sm:text-sm font-bold">${typeObj.name} STRIKE</span>
        ${hasStab ? '<span class="text-[8px] px-1.5 py-0.5 rounded bg-white/90 text-slate-950 font-bold">STAB 1.25x</span>' : ''}
      </div>
      <div class="flex items-center justify-between w-full gap-1">
        <span class="text-[8px] sm:text-[9px] opacity-95">${typeObj.subject}</span>
        <span class="text-[8px] px-1.5 py-0.5 rounded font-bold ${effBadgeClass}">${effLabel}</span>
      </div>
    `;
    btn.addEventListener('click', () => startElementalTriviaAttack(typeObj.id));
    grid.appendChild(btn);
  });
}

function pickRandomQuestion(elementType = null) {
  let pool = elementType
    ? state.questions.filter(q => q.type === elementType)
    : state.questions;

  if (pool.length === 0) pool = state.questions;
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

function startElementalTriviaAttack(elementType) {
  sfx.blip();
  state.selectedAttackType = elementType;
  launchQuizQuestion(elementType, 25.0);
}

function startCaptureBallSequence() {
  if (state.busy) return;
  state.busy = true;
  showCommandView();

  const enemy = state.enemy;
  const catchProb = calculateCatchProbability(enemy);
  const pctText = Math.round(catchProb * 100);

  sfx.ballThrow();
  const enemyWrapper = document.getElementById('enemySpriteWrapper');
  enemyWrapper.innerHTML = renderCaptureBallSVG(false);
  triggerSpriteAnimation('enemy', 'anim-ball-throw');
  setDialogue(`Threw a Capture Ball at ${enemy.name}! (HP Catch Rate: ${pctText}%)...`, 'THROWING BALL');

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
      }
      syncAllUI();
      setDialogue(`GOTCHA! ${enemy.name} was caught (${pctText}% odds) and added to your Dex! Returning to Overworld...`, 'CAPTURED! ★');

      setTimeout(() => {
        returnToOverworldFromBattle(`GOTCHA! ${enemy.name} (${enemy.type}) registered in your Dex! (${state.dex.length}/${MONSTER_SPECIES.length})`);
      }, 2000);
    } else {
      sfx.wrongBuzzer();
      enemyWrapper.innerHTML = renderMonsterSVG(enemy);
      const enemyDmg = 18;
      const player = getActivePlayer();
      player.hp = Math.max(1, player.hp - enemyDmg);

      triggerSpriteAnimation('enemy', 'anim-lunge-enemy');
      setTimeout(() => {
        triggerSpriteAnimation('player', 'anim-hit');
        spawnFloatingText('player', `-${enemyDmg} HP`, 'text-red-400');
        syncAllUI();
      }, 220);

      setDialogue(`Argh! Wild ${enemy.name} broke free (${pctText}% odds) and counterattacked for ${enemyDmg} DMG! Lower its HP to increase catch rate!`, 'BROKE FREE!');
      setTimeout(() => {
        state.busy = false;
      }, 950);
    }
  };

  setTimeout(runNextShake, 680);
}

function launchQuizQuestion(elementType, durationSeconds) {
  hideAllBottomViews();
  document.getElementById('quizCombatView').classList.remove('hidden');

  const { chosen, indexedOptions } = pickRandomQuestion(elementType);
  state.currentQuestion = chosen;
  state.shuffledOptions = indexedOptions;
  state.maxTime = durationSeconds;
  state.timeRemaining = durationSeconds;
  state.questionStartTime = performance.now();

  const tInfo = ELEMENT_TYPES[elementType];
  const contextBadge = document.getElementById('quizContextBadge');
  contextBadge.textContent = `${tInfo.name} • ${tInfo.subject.toUpperCase()}`;
  contextBadge.className = `text-[9px] sm:text-[10px] px-2 py-1 rounded text-white font-bold ${tInfo.badgeClass}`;

  const diff = chosen.difficulty || 2;
  const diffBadge = document.getElementById('quizDifficultyBadge');
  if (diff === 3) {
    diffBadge.textContent = '★★★ HARD (1.75x DMG)';
    diffBadge.className = 'text-[9px] px-2 py-1 rounded bg-red-200 text-red-950 font-bold border border-red-500';
  } else if (diff === 2) {
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

  setTimeout(() => {
    resolveAttackOutcome(isCorrect, speedMult, isTimeout);
  }, 650);
}

function resolveAttackOutcome(isCorrect, speedMult, isTimeout) {
  showCommandView();
  const player = getActivePlayer();
  const enemy = state.enemy;

  if (isCorrect) {
    state.streak++;
    const basePower = 24;
    const diff = state.currentQuestion?.difficulty || 2;
    const diffMult = getDifficultyMultiplier(diff);
    const typeMult = getEffectiveness(state.selectedAttackType, enemy.type);
    const stabMult = player.type === state.selectedAttackType ? 1.25 : 1.0;
    const streakMult = 1 + Math.min(6, state.streak - 1) * 0.12;

    const totalDmg = Math.max(8, Math.round(basePower * diffMult * speedMult * typeMult * stabMult * streakMult));
    enemy.hp = Math.max(0, enemy.hp - totalDmg);

    triggerSpriteAnimation('player', 'anim-lunge-player');
    setTimeout(() => {
      sfx.attackHit(typeMult > 1);
      triggerSpriteAnimation('enemy', 'anim-hit');
      spawnFloatingText('enemy', `-${totalDmg} HP (${speedMult.toFixed(2)}x SPD)`, typeMult > 1 ? 'text-amber-300' : 'text-white');
      syncAllUI();
    }, 200);

    let msg = `${player.name} used ${state.selectedAttackType} STRIKE (★${diff} Diff × ${speedMult.toFixed(2)}x Speed)! `;
    if (typeMult > 1) msg += "SUPER EFFECTIVE! ";
    msg += `Dealt ${totalDmg} DMG!`;

    setDialogue(msg, 'DIRECT HIT!');

    setTimeout(() => {
      if (enemy.hp <= 0) {
        sfx.captureFanfare();
        setDialogue(`Wild ${enemy.name} fainted! Returning to ${getCurrentMap().name}...`, 'VICTORY!');
        setTimeout(() => {
          returnToOverworldFromBattle(`Victory! Defeated wild ${enemy.name} with ${totalDmg} DMG! Streak: ${state.streak}`);
        }, 1600);
      } else {
        state.busy = false;
      }
    }, 900);

  } else {
    state.streak = 0;
    sfx.wrongBuzzer();
    const enemyDmg = Math.round(24 + enemy.level * 1.2);
    player.hp = Math.max(0, player.hp - enemyDmg);

    triggerSpriteAnimation('enemy', 'anim-lunge-enemy');
    setTimeout(() => {
      triggerSpriteAnimation('player', 'anim-hit');
      spawnFloatingText('player', `-${enemyDmg} HP`, 'text-red-400');
      syncAllUI();
    }, 200);

    const reason = isTimeout ? 'TIME UP!' : 'INCORRECT!';
    setDialogue(`${reason} Combo streak reset! Wild ${enemy.name} counterattacked ${player.name} for ${enemyDmg} DMG!`, 'COUNTERATTACK!');

    setTimeout(() => {
      if (player.hp <= 0) {
        player.hp = player.maxHp;
        syncAllUI();
        setDialogue(`${player.name} fainted! Returning to Nurse Joy at Pallet Research Hub...`, 'FAINTED');
        setTimeout(() => {
          state.currentMapId = 'CENTER';
          teleportPlayerToGrid(14, 6);
          returnToOverworldFromBattle(`Nurse Joy restored ${player.name} to full HP!`);
        }, 1500);
      } else {
        state.busy = false;
      }
    }, 1200);
  }
}

/********************************************************************
 * DEX SWITCHERS (BATTLE DRAWER & OVERWORLD MODAL)
 ********************************************************************/
function showDexSwitchView() {
  if (state.busy) return;
  sfx.blip();
  hideAllBottomViews();
  document.getElementById('dexSwitchView').classList.remove('hidden');

  const container = document.getElementById('dexGridContainer');
  container.innerHTML = '';

  state.dex.forEach((mon, idx) => {
    const isCurrent = idx === state.activeDexIndex;
    const tInfo = ELEMENT_TYPES[mon.type];
    const card = document.createElement('button');
    card.className = `pixel-btn ${isCurrent ? 'bg-amber-100 border-amber-500' : 'bg-white hover:bg-slate-100'} text-slate-900 p-2.5 flex items-center gap-2.5 text-left`;
    card.innerHTML = `
      <div class="w-12 h-12 shrink-0 bg-slate-200 rounded p-1 border border-slate-400">
        ${renderMonsterSVG(mon)}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-1">
          <span class="text-[10px] font-bold truncate">${mon.name}</span>
          ${isCurrent ? '<span class="text-[8px] bg-amber-400 text-slate-950 px-1 rounded">PARTNER</span>' : ''}
        </div>
        <div class="flex items-center gap-1 mt-1">
          <span class="text-[8px] px-1.5 py-0.5 rounded text-white ${tInfo.badgeClass}">${mon.type}</span>
          <span class="text-[8px] text-slate-600">HP ${mon.hp}/${mon.maxHp}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      if (idx === state.activeDexIndex) {
        showCommandView();
        return;
      }
      sfx.npcChime();
      state.activeDexIndex = idx;
      document.getElementById('playerSpriteWrapper').innerHTML = renderMonsterSVG(getActivePlayer());
      syncAllUI();
      showCommandView();
      setDialogue(`Partner switched to ${mon.name}! ${mon.type}-type moves receive a 1.25x STAB bonus!`, 'PARTNER SWITCHED!');
    });
    container.appendChild(card);
  });
}

function openOverworldDexModal() {
  sfx.blip();
  const list = document.getElementById('overworldDexList');
  list.innerHTML = '';

  MONSTER_SPECIES.forEach(species => {
    const dexIndex = state.dex.findIndex(p => p.id === species.id);
    const caughtMon = dexIndex !== -1 ? state.dex[dexIndex] : null;
    const isCurrent = dexIndex === state.activeDexIndex;
    const tInfo = ELEMENT_TYPES[species.type];

    const card = document.createElement('div');
    card.className = `pixel-btn ${caughtMon ? (isCurrent ? 'bg-amber-100' : 'bg-white') : 'bg-slate-200 opacity-65'} text-slate-900 p-2.5 flex items-center gap-3`;
    card.innerHTML = `
      <div class="w-12 h-12 shrink-0 bg-slate-800 rounded p-1 border border-slate-900">
        ${renderMonsterSVG(species)}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-1">
          <span class="text-[10px] font-bold truncate">${species.name}</span>
          <span class="text-[8px] px-1.5 py-0.5 rounded text-white ${tInfo.badgeClass}">${species.type}</span>
        </div>
        <div class="text-[8px] text-slate-600 mt-1">
          ${caughtMon ? `CAUGHT • HP ${caughtMon.hp}/${caughtMon.maxHp}${isCurrent ? '★ ACTIVE PARTNER' : '(CLICK TO SET PARTNER)'}` : 'UNCAUGHT • FIND IN TALL GRASS'}
        </div>
      </div>
    `;
    if (caughtMon) {
      card.addEventListener('click', () => {
        sfx.npcChime();
        state.activeDexIndex = dexIndex;
        syncAllUI();
        openOverworldDexModal();
      });
    }
    list.appendChild(card);
  });

  const modal = document.getElementById('overworldDexModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}