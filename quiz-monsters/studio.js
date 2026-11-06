/********************************************************************
 * studio.js
 * SVG Renderer, 3-Mode Pixel Sprite Studio (Monsters, Overworld
 * Obstacles & 16x16 Visual Quiz Pics), Walkable Checkbox, Unified
 * Palette (p, d, l, b, s, t) & Single-Line Retrofit Code Export
 ********************************************************************/

if (typeof MONSTER_PIXELS === 'undefined') {
  var MONSTER_PIXELS = {};
}

function renderMonsterSVG(speciesOrInstance) {
  const monId = typeof speciesOrInstance === 'string'
    ? speciesOrInstance
    : (speciesOrInstance?.transformedSpeciesId || speciesOrInstance?.id || 'bulbasaur');

  const art = (typeof MONSTER_PIXELS !== 'undefined' && MONSTER_PIXELS[monId])
    ? MONSTER_PIXELS[monId]
    : (typeof DEFAULT_MONSTER_PIXELS !== 'undefined' ? DEFAULT_MONSTER_PIXELS[monId] : null);

  if (!art || !Array.isArray(art.grid) || !art.palette) {
    return '<svg viewBox="0 0 16 16"></svg>';
  }

  let rects = '';
  for (let y = 0; y < art.grid.length; y++) {
    const rowStr = art.grid[y];
    if (typeof rowStr !== 'string') continue;

    for (let x = 0; x < rowStr.length; x++) {
      const ch = rowStr.charAt(x);
      if (ch !== '.' && art.palette[ch]) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${art.palette[ch]}"/>`;
      }
    }
  }
  return `<svg viewBox="0 0 16 16" class="w-full h-full" style="image-rendering: pixelated;">${rects}</svg>`;
}

function renderObstacleSVG(obsKey) {
  const art = (typeof OBSTACLE_DEFS !== 'undefined' && OBSTACLE_DEFS[obsKey])
    ? OBSTACLE_DEFS[obsKey]
    : (typeof DEFAULT_OBSTACLE_DEFS !== 'undefined' ? DEFAULT_OBSTACLE_DEFS[obsKey] : null);
  if (!art || !art.grid) return '<svg viewBox="0 0 16 16"></svg>';

  let rects = '';
  for (let y = 0; y < 16; y++) {
    const rowStr = art.grid[y] || '';
    for (let x = 0; x < 16; x++) {
      const ch = rowStr.charAt(x);
      if (ch !== '.' && art.palette[ch]) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${art.palette[ch]}"/>`;
      }
    }
  }
  return `<svg viewBox="0 0 16 16" class="w-full h-full" style="image-rendering: pixelated;">${rects}</svg>`;
}

function renderQuizPicSVG(questionIndex) {
  if (typeof FOOD_VOCAB_QUESTIONS === 'undefined' || !FOOD_VOCAB_QUESTIONS[questionIndex]) {
    return '<svg viewBox="0 0 16 16"></svg>';
  }
  const art = FOOD_VOCAB_QUESTIONS[questionIndex].pixelArt;
  if (!art || !Array.isArray(art.grid) || !art.palette) return '<svg viewBox="0 0 16 16"></svg>';

  let rects = '';
  for (let y = 0; y < 16; y++) {
    const rowStr = art.grid[y] || '';
    for (let x = 0; x < 16; x++) {
      const ch = rowStr.charAt(x);
      if (ch !== '.' && art.palette[ch]) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${art.palette[ch]}"/>`;
      }
    }
  }
  return `<svg viewBox="0 0 16 16" class="w-full h-full" style="image-rendering: pixelated;">${rects}</svg>`;
}

function renderCaptureBallSVG(isCaught = false) {
  const topColor = isCaught ? '#912626' : '#ef4444';
  const ballArt = {
    palette: { r: topColor, w: '#f8fafc', b: '#0f172a', c: '#fde047' },
    grid: [
      "................","................","................",".....rrrrrr.....",
      "....rrrrrrrr....","....rrrrrrrr....","...bbbbccbbbb...","...bbbbccbbbb...",
      "....wwwwwwww....","....wwwwwwww....",".....wwwwww.....","................",
      "................","................","................","................"
    ]
  };

  let rects = '';
  for (let y = 0; y < 16; y++) {
    const rowStr = ballArt.grid[y];
    for (let x = 0; x < 16; x++) {
      const ch = rowStr.charAt(x);
      if (ch !== '.' && ballArt.palette[ch]) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${ballArt.palette[ch]}"/>`;
      }
    }
  }
  return `<svg viewBox="0 0 16 16" class="w-full h-full" style="image-rendering: pixelated;">${rects}</svg>`;
}

/********************************************************************
 * STUDIO MODE HELPERS (MONSTERS, OBSTACLES & 16x16 QUIZ PICS)
 ********************************************************************/
function ensureStudioObstacleControlsInDOM() {
  const closeBtn = document.getElementById('closeSpriteStudioBtn');
  if (closeBtn && !document.getElementById('studioModeQuizBtn')) {
    const headerBar = closeBtn.parentElement;
    if (!document.getElementById('studioModeMonsterBtn')) {
      const monBtn = document.createElement('button');
      monBtn.id = 'studioModeMonsterBtn';
      monBtn.type = 'button';
      monBtn.className = 'pixel-btn bg-pink-600 text-white text-[8px] px-2.5 py-1 font-bold';
      monBtn.textContent = 'MONSTERS';
      headerBar.insertBefore(monBtn, closeBtn);
    }
    if (!document.getElementById('studioModeObstacleBtn')) {
      const obsBtn = document.createElement('button');
      obsBtn.id = 'studioModeObstacleBtn';
      obsBtn.type = 'button';
      obsBtn.className = 'pixel-btn bg-slate-700 text-slate-200 text-[8px] px-2.5 py-1';
      obsBtn.textContent = 'OBSTACLES';
      headerBar.insertBefore(obsBtn, closeBtn);
    }
    const quizBtn = document.createElement('button');
    quizBtn.id = 'studioModeQuizBtn';
    quizBtn.type = 'button';
    quizBtn.className = 'pixel-btn bg-slate-700 text-slate-200 text-[8px] px-2.5 py-1';
    quizBtn.textContent = 'QUIZ PICS';
    headerBar.insertBefore(quizBtn, closeBtn);
  }

  const typeSelect = document.getElementById('studioMonsterTypeSelect');
  if (typeSelect && !document.getElementById('studioObstacleWalkableWrapper')) {
    const typeContainer = typeSelect.parentElement;
    typeContainer.id = 'studioTypeSelectWrapper';

    const walkDiv = document.createElement('div');
    walkDiv.id = 'studioObstacleWalkableWrapper';
    walkDiv.className = 'hidden flex items-center gap-1.5 pt-3';
    walkDiv.innerHTML = `
      <input id="studioObstacleWalkableCheckbox" type="checkbox" class="w-4 h-4 accent-emerald-600 cursor-pointer" />
      <label for="studioObstacleWalkableCheckbox" class="text-[8px] font-bold text-slate-900 cursor-pointer leading-tight">CAN WALK PASS (WALKABLE)</label>
    `;
    typeContainer.parentElement.appendChild(walkDiv);
  }
}

function getActiveStudioTargetArt() {
  if (state.studio.editTarget === 'OBSTACLE') {
    const obsKey = state.studio.selectedObstacleId || 'T';
    if (!OBSTACLE_DEFS[obsKey] && typeof DEFAULT_OBSTACLE_DEFS !== 'undefined' && DEFAULT_OBSTACLE_DEFS[obsKey]) {
      OBSTACLE_DEFS[obsKey] = structuredClone(DEFAULT_OBSTACLE_DEFS[obsKey]);
    }
    return OBSTACLE_DEFS[obsKey];
  } else if (state.studio.editTarget === 'QUIZ_PIC') {
    const qIdx = Number(state.studio.selectedQuizPicIndex) || 0;
    if (typeof FOOD_VOCAB_QUESTIONS !== 'undefined' && FOOD_VOCAB_QUESTIONS[qIdx]) {
      return FOOD_VOCAB_QUESTIONS[qIdx].pixelArt;
    }
    return null;
  } else {
    const monId = state.studio.selectedMonsterId || (MONSTER_SPECIES[0] && MONSTER_SPECIES[0].id);
    if (!MONSTER_PIXELS[monId] && typeof DEFAULT_MONSTER_PIXELS !== 'undefined' && DEFAULT_MONSTER_PIXELS[monId]) {
      MONSTER_PIXELS[monId] = structuredClone(DEFAULT_MONSTER_PIXELS[monId]);
    }
    return MONSTER_PIXELS[monId];
  }
}

function populateStudioSelectorDropdown() {
  const sel = document.getElementById('studioMonsterSelect');
  if (!sel) return;
  const labelEl = sel.previousElementSibling;

  sel.innerHTML = '';
  if (state.studio.editTarget === 'OBSTACLE') {
    if (labelEl) labelEl.textContent = '1. SELECT OVERWORLD OBSTACLE:';
    if (typeof OBSTACLE_DEFS !== 'undefined') {
      Object.values(OBSTACLE_DEFS).forEach(obs => {
        const opt = document.createElement('option');
        opt.value = obs.id;
        opt.textContent = `[${obs.id}] ${obs.name} (${obs.walkable ? 'WALK PASS: YES' : 'WALK PASS: NO'})`;
        sel.appendChild(opt);
      });
      if (!state.studio.selectedObstacleId || !OBSTACLE_DEFS[state.studio.selectedObstacleId]) {
        state.studio.selectedObstacleId = 'T';
      }
      sel.value = state.studio.selectedObstacleId;
    }
  } else if (state.studio.editTarget === 'QUIZ_PIC') {
    if (labelEl) labelEl.textContent = '1. SELECT 16x16 QUIZ IMAGE:';
    if (typeof FOOD_VOCAB_QUESTIONS !== 'undefined') {
      FOOD_VOCAB_QUESTIONS.forEach((qObj, idx) => {
        const ansLabel = qObj.options && qObj.options[qObj.answer || 0] ? qObj.options[qObj.answer || 0] : `Item #${idx + 1}`;
        const opt = document.createElement('option');
        opt.value = String(idx);
        opt.textContent = `#${idx + 1} ${ansLabel.toUpperCase()} (${qObj.type})`;
        sel.appendChild(opt);
      });
      if (state.studio.selectedQuizPicIndex === undefined || !FOOD_VOCAB_QUESTIONS[state.studio.selectedQuizPicIndex]) {
        state.studio.selectedQuizPicIndex = 0;
      }
      sel.value = String(state.studio.selectedQuizPicIndex);
    }
  } else {
    if (labelEl) labelEl.textContent = '1. SELECT MONSTER:';
    if (typeof MONSTER_SPECIES !== 'undefined') {
      MONSTER_SPECIES.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `#${m.pokedexNo} ${m.name} (${m.type})`;
        sel.appendChild(opt);
      });
      if (MONSTER_SPECIES.length > 0 && (!state.studio.selectedMonsterId || !MONSTER_SPECIES.some(m => m.id === state.studio.selectedMonsterId))) {
        state.studio.selectedMonsterId = MONSTER_SPECIES[0].id;
      }
      sel.value = state.studio.selectedMonsterId;
    }
  }
}

function initSpriteStudio() {
  ensureStudioObstacleControlsInDOM();

  if (!state.studio.editTarget) state.studio.editTarget = 'MONSTER';
  if (!state.studio.selectedObstacleId) state.studio.selectedObstacleId = 'T';
  if (state.studio.selectedQuizPicIndex === undefined) state.studio.selectedQuizPicIndex = 0;

  populateStudioSelectorDropdown();

  const sel = document.getElementById('studioMonsterSelect');
  if (sel) {
    sel.addEventListener('change', (e) => {
      if (state.studio.editTarget === 'OBSTACLE') {
        state.studio.selectedObstacleId = e.target.value;
      } else if (state.studio.editTarget === 'QUIZ_PIC') {
        state.studio.selectedQuizPicIndex = parseInt(e.target.value, 10) || 0;
      } else {
        state.studio.selectedMonsterId = e.target.value;
      }
      const art = getActiveStudioTargetArt();
      if (art && art.palette) {
        const palKeys = Object.keys(art.palette);
        if (state.studio.activeBrush !== '.' && !palKeys.includes(state.studio.activeBrush)) {
          state.studio.activeBrush = palKeys[0] || 'p';
        }
      }
      renderStudioEditor();
    });
  }

  document.getElementById('studioModeMonsterBtn')?.addEventListener('click', () => {
    sfx.blip();
    state.studio.editTarget = 'MONSTER';
    populateStudioSelectorDropdown();
    renderStudioEditor();
  });

  document.getElementById('studioModeObstacleBtn')?.addEventListener('click', () => {
    sfx.blip();
    state.studio.editTarget = 'OBSTACLE';
    populateStudioSelectorDropdown();
    renderStudioEditor();
  });

  document.getElementById('studioModeQuizBtn')?.addEventListener('click', () => {
    sfx.blip();
    state.studio.editTarget = 'QUIZ_PIC';
    populateStudioSelectorDropdown();
    renderStudioEditor();
  });

  const walkCheckbox = document.getElementById('studioObstacleWalkableCheckbox');
  if (walkCheckbox) {
    walkCheckbox.addEventListener('change', (e) => {
      if (state.studio.editTarget !== 'OBSTACLE') return;
      const obsKey = state.studio.selectedObstacleId;
      if (OBSTACLE_DEFS[obsKey]) {
        OBSTACLE_DEFS[obsKey].walkable = e.target.checked;
        sfx.blip();
        populateStudioSelectorDropdown();
        refreshStudioVisualsOnly();
        if (typeof saveGameProgress === 'function') saveGameProgress();
      }
    });
  }

  const nameInput = document.getElementById('studioMonsterNameInput');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      if (state.studio.editTarget === 'OBSTACLE') {
        const obsKey = state.studio.selectedObstacleId;
        const obs = OBSTACLE_DEFS[obsKey];
        if (obs) {
          obs.name = e.target.value.toUpperCase().trim() || 'OBSTACLE';
          const opt = sel?.querySelector(`option[value="${obsKey}"]`);
          if (opt) opt.textContent = `[${obs.id}] ${obs.name} (${obs.walkable ? 'WALK PASS: YES' : 'WALK PASS: NO'})`;
          refreshStudioVisualsOnly();
        }
      } else if (state.studio.editTarget === 'QUIZ_PIC') {
        const qIdx = Number(state.studio.selectedQuizPicIndex) || 0;
        const qObj = (typeof FOOD_VOCAB_QUESTIONS !== 'undefined') ? FOOD_VOCAB_QUESTIONS[qIdx] : null;
        if (qObj && Array.isArray(qObj.options)) {
          const ansIdx = qObj.answer || 0;
          qObj.options[ansIdx] = e.target.value.trim() || 'Answer';
          const opt = sel?.querySelector(`option[value="${qIdx}"]`);
          if (opt) opt.textContent = `#${qIdx + 1} ${qObj.options[ansIdx].toUpperCase()} (${qObj.type})`;
          refreshStudioVisualsOnly();
        }
      } else {
        const monId = state.studio.selectedMonsterId;
        const species = MONSTER_SPECIES.find(m => m.id === monId);
        if (species) {
          species.name = e.target.value.toUpperCase().trim() || 'MONSTER';
          if (sel) {
            const opt = sel.querySelector(`option[value="${monId}"]`);
            if (opt) opt.textContent = `#${species.pokedexNo} ${species.name} (${species.type})`;
          }
          refreshStudioVisualsOnly();
        }
      }
    });
  }

  const typeSelect = document.getElementById('studioMonsterTypeSelect');
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      if (state.studio.editTarget === 'OBSTACLE') return;
      if (state.studio.editTarget === 'QUIZ_PIC') {
        const qIdx = Number(state.studio.selectedQuizPicIndex) || 0;
        const qObj = (typeof FOOD_VOCAB_QUESTIONS !== 'undefined') ? FOOD_VOCAB_QUESTIONS[qIdx] : null;
        if (qObj) {
          qObj.type = e.target.value;
          const ansLabel = qObj.options[qObj.answer || 0] || `Item #${qIdx + 1}`;
          const opt = sel?.querySelector(`option[value="${qIdx}"]`);
          if (opt) opt.textContent = `#${qIdx + 1} ${ansLabel.toUpperCase()} (${qObj.type})`;
          refreshStudioVisualsOnly();
        }
        return;
      }
      const monId = state.studio.selectedMonsterId;
      const species = MONSTER_SPECIES.find(m => m.id === monId);
      if (species) {
        species.type = e.target.value;
        if (sel) {
          const opt = sel.querySelector(`option[value="${monId}"]`);
          if (opt) opt.textContent = `#${species.pokedexNo} ${species.name} (${species.type})`;
        }
        refreshStudioVisualsOnly();
      }
    });
  }

  const presetBar = document.getElementById('studioPresetBar');
  if (presetBar && typeof PIXEL_COLOR_PRESETS !== 'undefined') {
    presetBar.innerHTML = '';
    PIXEL_COLOR_PRESETS.forEach(hex => {
      const swatchBtn = document.createElement('button');
      swatchBtn.type = 'button';
      swatchBtn.className = 'w-5 h-5 rounded border border-slate-900 hover:scale-110 transition-transform';
      swatchBtn.style.backgroundColor = hex;
      swatchBtn.addEventListener('click', () => {
        const activeKey = state.studio.activeBrush;
        if (activeKey === '.') return;
        const art = getActiveStudioTargetArt();
        if (art && art.palette) {
          art.palette[activeKey] = hex;
          sfx.blip();
          renderStudioEditor();
          if (typeof saveGameProgress === 'function') saveGameProgress();
        }
      });
      presetBar.appendChild(swatchBtn);
    });
  }

  document.getElementById('toolBrushBtn')?.addEventListener('click', () => { sfx.blip(); state.studio.toolMode = 'BRUSH'; if (state.studio.activeBrush === '.') state.studio.activeBrush = 'p'; renderStudioEditor(); });
  document.getElementById('toolFillBtn')?.addEventListener('click', () => { sfx.blip(); state.studio.toolMode = 'FILL'; if (state.studio.activeBrush === '.') state.studio.activeBrush = 'p'; renderStudioEditor(); });
  document.getElementById('toolEraserBtn')?.addEventListener('click', () => { sfx.blip(); state.studio.toolMode = 'ERASER'; state.studio.activeBrush = '.'; renderStudioEditor(); });
  document.getElementById('toolMirrorBtn')?.addEventListener('click', () => { sfx.blip(); state.studio.mirrorX = !state.studio.mirrorX; renderStudioEditor(); });

  document.getElementById('openSpriteStudioBtn')?.addEventListener('click', () => {
    sfx.blip();
    populateStudioSelectorDropdown();
    renderStudioEditor();
    document.getElementById('spriteStudioModal')?.classList.remove('hidden');
    document.getElementById('spriteStudioModal')?.classList.add('flex');
  });

  document.getElementById('closeSpriteStudioBtn')?.addEventListener('click', () => {
    sfx.blip();
    document.getElementById('spriteStudioModal')?.classList.add('hidden');
    document.getElementById('spriteStudioModal')?.classList.remove('flex');
    if (typeof saveGameProgress === 'function') saveGameProgress();
  });

  document.getElementById('studioClearGridBtn')?.addEventListener('click', () => {
    sfx.blip();
    const art = getActiveStudioTargetArt();
    if (art) {
      art.grid = Array(16).fill('................');
      renderStudioEditor();
      if (typeof saveGameProgress === 'function') saveGameProgress();
    }
  });

  document.getElementById('studioResetMonsterBtn')?.addEventListener('click', () => {
    sfx.blip();
    if (state.studio.editTarget === 'OBSTACLE') {
      const obsKey = state.studio.selectedObstacleId;
      if (typeof DEFAULT_OBSTACLE_DEFS !== 'undefined' && DEFAULT_OBSTACLE_DEFS[obsKey]) {
        OBSTACLE_DEFS[obsKey] = structuredClone(DEFAULT_OBSTACLE_DEFS[obsKey]);
      }
      populateStudioSelectorDropdown();
    } else if (state.studio.editTarget === 'MONSTER') {
      const monId = state.studio.selectedMonsterId;
      if (typeof DEFAULT_MONSTER_PIXELS !== 'undefined' && DEFAULT_MONSTER_PIXELS[monId]) {
        MONSTER_PIXELS[monId] = structuredClone(DEFAULT_MONSTER_PIXELS[monId]);
      }
    }
    renderStudioEditor();
    if (typeof saveGameProgress === 'function') saveGameProgress();
  });

  document.getElementById('studioCopyCodeBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('studioCodeTextarea').value);
    sfx.captureFanfare();
  });

  window.addEventListener('mouseup', () => { state.studio.isPainting = false; });

  if (typeof MONSTER_SPECIES !== 'undefined' && MONSTER_SPECIES.length > 0) {
    if (!state.studio.selectedMonsterId) state.studio.selectedMonsterId = MONSTER_SPECIES[0].id;
    renderStudioEditor();
  }
}

function floodFillGrid(gridArr, startX, startY, targetChar, replacementChar) {
  if (targetChar === replacementChar) return;
  const queue = [[startX, startY]];
  const visited = new Set();
  while (queue.length > 0) {
    const [cx, cy] = queue.shift();
    const key = `${cx},${cy}`;
    if (visited.has(key) || cx < 0 || cx >= 16 || cy < 0 || cy >= 16) continue;
    visited.add(key);
    if (gridArr[cy].charAt(cx) !== targetChar) continue;
    gridArr[cy] = gridArr[cy].substring(0, cx) + replacementChar + gridArr[cy].substring(cx + 1);
    queue.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
}

function setPixelAt(gridArr, x, y, charKey) {
  if (x < 0 || x >= 16 || y < 0 || y >= 16) return;
  gridArr[y] = gridArr[y].substring(0, x) + charKey + gridArr[y].substring(x + 1);
}

function renderStudioEditor() {
  ensureStudioObstacleControlsInDOM();

  const mode = state.studio.editTarget || 'MONSTER';
  const btnMon  = document.getElementById('studioModeMonsterBtn');
  const btnObs  = document.getElementById('studioModeObstacleBtn');
  const btnQuiz = document.getElementById('studioModeQuizBtn');

  if (btnMon)  btnMon.className  = `pixel-btn text-[8px] px-2.5 py-1 ${mode === 'MONSTER'  ? 'bg-pink-600 text-white font-bold' : 'bg-slate-700 text-slate-200'}`;
  if (btnObs)  btnObs.className  = `pixel-btn text-[8px] px-2.5 py-1 ${mode === 'OBSTACLE' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-700 text-slate-200'}`;
  if (btnQuiz) btnQuiz.className = `pixel-btn text-[8px] px-2.5 py-1 ${mode === 'QUIZ_PIC' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-200'}`;

  const art = getActiveStudioTargetArt();
  if (!art || !art.palette) return;

  const unifiedSlots = ['p', 'd', 'l', 'b', 's', 't'];
  unifiedSlots.forEach(slot => {
    if (!art.palette[slot]) art.palette[slot] = '#0f172a';
  });
  const palKeys = Object.keys(art.palette);

  const nameInput = document.getElementById('studioMonsterNameInput');
  const typeSelectWrap = document.getElementById('studioTypeSelectWrapper');
  const walkableWrap = document.getElementById('studioObstacleWalkableWrapper');
  const walkCheckbox = document.getElementById('studioObstacleWalkableCheckbox');

  if (mode === 'OBSTACLE') {
    if (nameInput) nameInput.value = art.name || state.studio.selectedObstacleId;
    if (typeSelectWrap) typeSelectWrap.classList.add('hidden');
    if (walkableWrap) walkableWrap.classList.remove('hidden');
    if (walkCheckbox) walkCheckbox.checked = Boolean(art.walkable);
  } else if (mode === 'QUIZ_PIC') {
    const qIdx = Number(state.studio.selectedQuizPicIndex) || 0;
    const qObj = (typeof FOOD_VOCAB_QUESTIONS !== 'undefined') ? FOOD_VOCAB_QUESTIONS[qIdx] : null;
    if (qObj) {
      if (nameInput) nameInput.value = qObj.options[qObj.answer || 0] || '';
      const typeSelect = document.getElementById('studioMonsterTypeSelect');
      if (typeSelect) typeSelect.value = qObj.type || 'NORMAL';
    }
    if (typeSelectWrap) typeSelectWrap.classList.remove('hidden');
    if (walkableWrap) walkableWrap.classList.add('hidden');
  } else {
    const species = MONSTER_SPECIES.find(m => m.id === state.studio.selectedMonsterId);
    if (species) {
      if (nameInput) nameInput.value = species.name;
      const typeSelect = document.getElementById('studioMonsterTypeSelect');
      if (typeSelect) typeSelect.value = species.type;
    }
    if (typeSelectWrap) typeSelectWrap.classList.remove('hidden');
    if (walkableWrap) walkableWrap.classList.add('hidden');
  }

  const tMirr = document.getElementById('toolMirrorBtn');
  if (tMirr) {
    tMirr.className = `pixel-btn text-[8px] px-2 py-1 ${state.studio.mirrorX ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'}`;
    tMirr.textContent = `MIRROR X: ${state.studio.mirrorX ? 'ON' : 'OFF'}`;
  }

  const brushContainer = document.getElementById('studioBrushList');
  if (brushContainer) {
    brushContainer.innerHTML = '';
    palKeys.forEach(k => {
      const isSelected = state.studio.activeBrush === k && state.studio.toolMode !== 'ERASER';
      const card = document.createElement('div');
      card.className = `flex items-center justify-between p-1.5 rounded border-2 cursor-pointer ${isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300 bg-white'}`;
      card.innerHTML = `
        <div class="flex items-center gap-1.5">
          <input type="color" value="${art.palette[k]}" class="w-4 h-4 rounded border border-slate-900 cursor-pointer p-0 bg-transparent" data-slot="${k}" />
          <span class="text-[8px] font-bold text-slate-900">${PALETTE_SLOT_NAMES[k] || k} (${k})</span>
        </div>
      `;
      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT') return;
        state.studio.activeBrush = k;
        state.studio.toolMode = 'BRUSH';
        renderStudioEditor();
      });
      const colorPicker = card.querySelector('input[type="color"]');
      colorPicker?.addEventListener('input', (e) => {
        art.palette[k] = e.target.value;
        state.studio.activeBrush = k;
        state.studio.toolMode = 'BRUSH';
        refreshStudioGridColorsOnly();
        refreshStudioVisualsOnly();
        if (typeof saveGameProgress === 'function') saveGameProgress();
      });
      brushContainer.appendChild(card);
    });
  }

  const gridEl = document.getElementById('studioPixelGrid');
  if (!gridEl) return;
  gridEl.innerHTML = '';
  gridEl.oncontextmenu = (e) => e.preventDefault();

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const cell = document.createElement('div');
      const ch = art.grid[y].charAt(x);
      cell.className = ch === '.' || !art.palette[ch] ? 'w-full h-full cursor-crosshair pixel-checker' : 'w-full h-full cursor-crosshair';
      if (ch !== '.' && art.palette[ch]) cell.style.backgroundColor = art.palette[ch];

      const applyStroke = (cx, cy, erase = false) => {
        const char = erase || state.studio.toolMode === 'ERASER' ? '.' : state.studio.activeBrush;
        if (state.studio.toolMode === 'FILL' && !erase) {
          floodFillGrid(art.grid, cx, cy, art.grid[cy].charAt(cx), char);
        } else {
          setPixelAt(art.grid, cx, cy, char);
          if (state.studio.mirrorX) setPixelAt(art.grid, 15 - cx, cy, char);
        }
        refreshStudioGridColorsOnly();
        refreshStudioVisualsOnly();
        if (typeof saveGameProgress === 'function') saveGameProgress();
      };

      cell.addEventListener('mousedown', (e) => { e.preventDefault(); state.studio.isPainting = e.button === 2 ? 'ERASER' : 'PAINT'; applyStroke(x, y, e.button === 2); });
      cell.addEventListener('mouseenter', () => { if (state.studio.isPainting) applyStroke(x, y, state.studio.isPainting === 'ERASER'); });
      gridEl.appendChild(cell);
    }
  }
  refreshStudioVisualsOnly();
}

function refreshStudioGridColorsOnly() {
  const art = getActiveStudioTargetArt();
  if (!art) return;
  const children = document.getElementById('studioPixelGrid').children;
  let idx = 0;
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const cell = children[idx++];
      const ch = art.grid[y].charAt(x);
      cell.className = ch === '.' || !art.palette[ch] ? 'w-full h-full cursor-crosshair pixel-checker' : 'w-full h-full cursor-crosshair';
      cell.style.backgroundColor = ch === '.' || !art.palette[ch] ? '' : art.palette[ch];
    }
  }
}

function refreshStudioVisualsOnly() {
  const mode = state.studio.editTarget || 'MONSTER';
  const livePrev = document.getElementById('studioLivePreview');
  const codeArea = document.getElementById('studioCodeTextarea');

  if (mode === 'OBSTACLE') {
    if (livePrev) livePrev.innerHTML = renderObstacleSVG(state.studio.selectedObstacleId);
    if (state.screen === 'OVERWORLD' && typeof drawOverworldCanvas === 'function') {
      drawOverworldCanvas();
    }
    const obsKey = state.studio.selectedObstacleId;
    const obs = OBSTACLE_DEFS[obsKey];
    if (codeArea && obs) {
      codeArea.value = `${obsKey}: { id: '${obs.id}', name: '${obs.name}', walkable: ${Boolean(obs.walkable)}, palette: ${JSON.stringify(obs.palette)}, grid: ${JSON.stringify(obs.grid)} },`;
    }
  } else if (mode === 'QUIZ_PIC') {
    const qIdx = Number(state.studio.selectedQuizPicIndex) || 0;
    if (livePrev) livePrev.innerHTML = renderQuizPicSVG(qIdx);
    const qObj = (typeof FOOD_VOCAB_QUESTIONS !== 'undefined') ? FOOD_VOCAB_QUESTIONS[qIdx] : null;
    if (codeArea && qObj && qObj.pixelArt) {
      codeArea.value = `{ type: '${qObj.type}', difficulty: ${qObj.difficulty || 1}, q: ${JSON.stringify(qObj.q)}, options: ${JSON.stringify(qObj.options)}, answer: ${qObj.answer || 0},\n  pixelArt: { palette: ${JSON.stringify(qObj.pixelArt.palette)}, grid: ${JSON.stringify(qObj.pixelArt.grid)} } },`;
    }
  } else {
    if (typeof _monsterOffscreenCanvasCache !== 'undefined') {
      delete _monsterOffscreenCanvasCache[state.studio.selectedMonsterId];
    }
    if (livePrev) livePrev.innerHTML = renderMonsterSVG(state.studio.selectedMonsterId);
    if (typeof refreshTitleScreenSprites === 'function') refreshTitleScreenSprites();
    if (state.enemy) document.getElementById('enemySpriteWrapper').innerHTML = renderMonsterSVG(state.enemy);
    if (state.dex?.length > 0) document.getElementById('playerSpriteWrapper').innerHTML = renderMonsterSVG(getActivePlayer());

    if (codeArea && typeof MONSTER_SPECIES !== 'undefined') {
      const monId = state.studio.selectedMonsterId;
      const species = MONSTER_SPECIES.find(m => m.id === monId);
      const art = getActiveStudioTargetArt();
      if (species && art) {
        const pixelCode = `${species.id}: { palette: ${JSON.stringify(art.palette)}, grid: ${JSON.stringify(art.grid)} },`;
        const speciesCode = `{ id: '${species.id}', pokedexNo: ${species.pokedexNo}, name: '${species.name}', type: '${species.type}', baseHp: ${species.baseHp}, level: ${species.level} },`;
        codeArea.value = `${pixelCode}\n${speciesCode}`;
      }
    }
  }
}

function initQuestionEditor() {
  document.getElementById('openEditorBtn')?.addEventListener('click', () => {
    sfx.blip();
    syncJsonTextarea();
    document.getElementById('editorModal')?.classList.remove('hidden');
    document.getElementById('editorModal')?.classList.add('flex');
  });
  document.getElementById('closeEditorBtn')?.addEventListener('click', () => {
    sfx.blip();
    document.getElementById('editorModal')?.classList.add('hidden');
    document.getElementById('editorModal')?.classList.remove('flex');
    if (typeof saveGameProgress === 'function') saveGameProgress();
  });

  document.getElementById('addQuestionForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.questions.unshift({
      type: document.getElementById('qTypeSelect').value,
      difficulty: parseInt(document.getElementById('qDiffSelect').value, 10) || 2,
      q: document.getElementById('qPromptInput').value.trim(),
      options: [
        document.getElementById('qOpt0').value.trim(),
        document.getElementById('qOpt1').value.trim(),
        document.getElementById('qOpt2').value.trim(),
        document.getElementById('qOpt3').value.trim()
      ],
      answer: 0
    });
    sfx.attackHit(true);
    e.target.reset();
    syncJsonTextarea();
    if (typeof saveGameProgress === 'function') saveGameProgress();
  });
}

function syncJsonTextarea() {
  const jsonArea = document.getElementById('jsonBankTextarea');
  if (jsonArea) jsonArea.value = JSON.stringify(state.questions, null, 2);
  const countEl = document.getElementById('totalQuestionsCount');
  if (countEl) countEl.textContent = `${state.questions.length} Questions`;
}