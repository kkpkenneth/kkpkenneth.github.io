/********************************************************************
 * studio.js
 * SVG Renderer, Pixel Sprite Studio, Custom Questions & Save/Reset System
 ********************************************************************/

if (typeof MONSTER_PIXELS === 'undefined') {
  var MONSTER_PIXELS = {};
}

function renderMonsterSVG(speciesOrInstance) {
  const monId = typeof speciesOrInstance === 'string' ? speciesOrInstance : (speciesOrInstance?.id || 'bulbasaur');
  const art = (typeof MONSTER_PIXELS !== 'undefined' && MONSTER_PIXELS[monId])
    ? MONSTER_PIXELS[monId]
    : (typeof DEFAULT_MONSTER_PIXELS !== 'undefined' ? DEFAULT_MONSTER_PIXELS[monId] : null);
  if (!art || !art.grid) return '<svg viewBox="0 0 16 16"></svg>';

  let rects = '';
  for (let y = 0; y < 16; y++) {
    const rowStr = art.grid[y];
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
  const topColor = isCaught ? '#10b981' : '#ef4444';
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
 * LOCALSTORAGE SAVE, LOAD & RESET SYSTEM
 ********************************************************************/
const SAVE_STORAGE_KEY = 'POKEQUIZ_DX_SAVE_V6';

function saveGameProgress(showToast = false) {
  try {
    const saveData = {
      dex: state.dex,
      activeDexIndex: state.activeDexIndex,
      currentMapId: state.currentMapId,
      gridX: state.playerWorld.gridX,
      gridY: state.playerWorld.gridY,
      streak: state.streak,
      celebrationShown: state.celebrationShown || false,
      questions: state.questions,
      customPixels: MONSTER_PIXELS
    };
    localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(saveData));

    if (showToast) {
      sfx.npcChime();
      const saveBtn = document.getElementById('saveGameBtn');
      if (saveBtn) {
        const orig = saveBtn.textContent;
        saveBtn.textContent = '✓ SAVED!';
        setTimeout(() => { saveBtn.textContent = orig; }, 1400);
      }
    }
  } catch (e) {
    console.error('Failed to save game progress:', e);
  }
}

function loadGameProgress() {
  try {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.dex && Array.isArray(data.dex) && data.dex.length > 0) {
      state.dex = data.dex;
    }
    if (typeof data.activeDexIndex === 'number') {
      state.activeDexIndex = Math.min(data.activeDexIndex, state.dex.length - 1);
    }
    if (data.currentMapId && WORLD_MAPS[data.currentMapId]) {
      state.currentMapId = data.currentMapId;
    }
    if (typeof data.gridX === 'number' && typeof data.gridY === 'number') {
      teleportPlayerToGrid(data.gridX, data.gridY);
    }
    if (typeof data.streak === 'number') state.streak = data.streak;
    if (typeof data.celebrationShown === 'boolean') state.celebrationShown = data.celebrationShown;
    if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
      state.questions = data.questions;
    }
    if (data.customPixels) MONSTER_PIXELS = data.customPixels;
    return true;
  } catch (e) {
    console.error('Failed to load save data:', e);
    return false;
  }
}

function resetGameSaveData() {
  localStorage.removeItem(SAVE_STORAGE_KEY);
  MONSTER_PIXELS = {};
  state.currentMapId = 'CENTER';
  state.dex = [createMonsterInstance(MONSTER_SPECIES[0])];
  state.activeDexIndex = 0;
  state.streak = 0;
  state.celebrationShown = false;
  state.questions = structuredClone(DEFAULT_QUESTIONS);
  teleportPlayerToGrid(13, 10);
  syncAllUI();
  refreshTitleScreenSprites();
  sfx.captureFanfare();
}

function initSpriteStudio() {
  const sel = document.getElementById('studioMonsterSelect');
  if (sel && typeof MONSTER_SPECIES !== 'undefined') {
    sel.innerHTML = '';
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

    sel.addEventListener('change', (e) => {
      state.studio.selectedMonsterId = e.target.value;
      const art = MONSTER_PIXELS[state.studio.selectedMonsterId] || DEFAULT_MONSTER_PIXELS[state.studio.selectedMonsterId];
      if (art && art.palette) {
        const palKeys = Object.keys(art.palette);
        if (state.studio.activeBrush !== '.' && !palKeys.includes(state.studio.activeBrush)) {
          state.studio.activeBrush = palKeys[0] || 'p';
        }
      }
      renderStudioEditor();
    });
  }

  const nameInput = document.getElementById('studioMonsterNameInput');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
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
    });
  }

  const typeSelect = document.getElementById('studioMonsterTypeSelect');
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
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
        const monId = state.studio.selectedMonsterId;
        const activeKey = state.studio.activeBrush;
        if (activeKey === '.') return;
        if (!MONSTER_PIXELS[monId]) MONSTER_PIXELS[monId] = structuredClone(DEFAULT_MONSTER_PIXELS[monId]);
        if (MONSTER_PIXELS[monId].palette) {
          MONSTER_PIXELS[monId].palette[activeKey] = hex;
          sfx.blip();
          renderStudioEditor();
          saveGameProgress();
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
    renderStudioEditor();
    document.getElementById('spriteStudioModal')?.classList.remove('hidden');
    document.getElementById('spriteStudioModal')?.classList.add('flex');
  });

  document.getElementById('closeSpriteStudioBtn')?.addEventListener('click', () => {
    sfx.blip();
    document.getElementById('spriteStudioModal')?.classList.add('hidden');
    document.getElementById('spriteStudioModal')?.classList.remove('flex');
    saveGameProgress();
  });

  document.getElementById('studioClearGridBtn')?.addEventListener('click', () => {
    sfx.blip();
    if (!MONSTER_PIXELS[state.studio.selectedMonsterId]) MONSTER_PIXELS[state.studio.selectedMonsterId] = structuredClone(DEFAULT_MONSTER_PIXELS[state.studio.selectedMonsterId]);
    MONSTER_PIXELS[state.studio.selectedMonsterId].grid = Array(16).fill('................');
    renderStudioEditor();
    saveGameProgress();
  });

  document.getElementById('studioResetMonsterBtn')?.addEventListener('click', () => {
    sfx.blip();
    if (typeof DEFAULT_MONSTER_PIXELS !== 'undefined' && DEFAULT_MONSTER_PIXELS[state.studio.selectedMonsterId]) {
      MONSTER_PIXELS[state.studio.selectedMonsterId] = structuredClone(DEFAULT_MONSTER_PIXELS[state.studio.selectedMonsterId]);
    }
    renderStudioEditor();
    saveGameProgress();
  });

  document.getElementById('studioCopyCodeBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('studioCodeTextarea').value);
    sfx.captureFanfare();
    const msg = document.getElementById('studioCopyStatus');
    if (msg) { msg.textContent = 'COPIED!'; setTimeout(() => { msg.textContent = ''; }, 3000); }
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
  const monId = state.studio.selectedMonsterId || (MONSTER_SPECIES[0] && MONSTER_SPECIES[0].id);
  if (!monId) return;

  if (!MONSTER_PIXELS[monId]) {
    MONSTER_PIXELS[monId] = structuredClone(DEFAULT_MONSTER_PIXELS[monId]);
  }
  const art = MONSTER_PIXELS[monId];
  if (!art || !art.palette) return;

  const species = MONSTER_SPECIES.find(m => m.id === monId);
  const palKeys = Object.keys(art.palette);

  if (species) {
    const nameInput = document.getElementById('studioMonsterNameInput');
    const typeSelect = document.getElementById('studioMonsterTypeSelect');
    if (nameInput) nameInput.value = species.name;
    if (typeSelect) typeSelect.value = species.type;
  }

  const tMirr = document.getElementById('toolMirrorBtn');
  if (tMirr) {
    tMirr.className = `pixel-btn text-[8px] px-2 py-1 ${state.studio.mirrorX ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'}`;
    tMirr.textContent = `🪞 MIRROR X: ${state.studio.mirrorX ? 'ON' : 'OFF'}`;
  }

  const brushContainer = document.getElementById('studioBrushList');
  if (brushContainer) {
    brushContainer.innerHTML = '';
    palKeys.forEach(k => {
      const isSelected = state.studio.activeBrush === k && state.studio.toolMode !== 'ERASER';
      const card = document.createElement('div');
      card.className = `flex items-center justify-between p-1.5 rounded border-2 cursor-pointer ${isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300 bg-white'}`;
      card.innerHTML = `<div class="flex items-center gap-1.5"><span class="w-4 h-4 rounded border border-slate-900 inline-block" style="background-color: ${art.palette[k]}"></span><span class="text-[8px] font-bold text-slate-900">${PALETTE_SLOT_NAMES[k] || k}</span></div>`;
      card.addEventListener('click', () => { state.studio.activeBrush = k; state.studio.toolMode = 'BRUSH'; renderStudioEditor(); });
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
        saveGameProgress();
      };

      cell.addEventListener('mousedown', (e) => { e.preventDefault(); state.studio.isPainting = e.button === 2 ? 'ERASER' : 'PAINT'; applyStroke(x, y, e.button === 2); });
      cell.addEventListener('mouseenter', () => { if (state.studio.isPainting) applyStroke(x, y, state.studio.isPainting === 'ERASER'); });
      gridEl.appendChild(cell);
    }
  }
  refreshStudioVisualsOnly();
}

function refreshStudioGridColorsOnly() {
  const art = MONSTER_PIXELS[state.studio.selectedMonsterId];
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
  const livePrev = document.getElementById('studioLivePreview');
  if (livePrev) livePrev.innerHTML = renderMonsterSVG(state.studio.selectedMonsterId);
  if (typeof refreshTitleScreenSprites === 'function') refreshTitleScreenSprites();
  if (state.enemy) document.getElementById('enemySpriteWrapper').innerHTML = renderMonsterSVG(state.enemy);
  if (state.dex?.length > 0) document.getElementById('playerSpriteWrapper').innerHTML = renderMonsterSVG(getActivePlayer());

  const codeArea = document.getElementById('studioCodeTextarea');
  if (codeArea && typeof MONSTER_SPECIES !== 'undefined') {
    const monId = state.studio.selectedMonsterId;
    const species = MONSTER_SPECIES.find(m => m.id === monId);
    const art = MONSTER_PIXELS[monId];
    if (species && art) {
      const speciesCode = `  { id: '${species.id}', pokedexNo: ${species.pokedexNo}, name: '${species.name}', type: '${species.type}', baseHp: ${species.baseHp}, level: ${species.level} }`;
      const pixelCode = `  ${species.id}: ${JSON.stringify(art, null, 2).replace(/\n/g, '\n  ')}`;
      codeArea.value = `// --- Retrofit Code for ${species.name} ---\n\n// 1. Update in MONSTER_SPECIES array:\n${speciesCode},\n\n// 2. Update in MONSTER_PIXELS object:\n${pixelCode}`;
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
    saveGameProgress();
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
    saveGameProgress();
  });
}

function syncJsonTextarea() {
  const jsonArea = document.getElementById('jsonBankTextarea');
  if (jsonArea) jsonArea.value = JSON.stringify(state.questions, null, 2);
  const countEl = document.getElementById('totalQuestionsCount');
  if (countEl) countEl.textContent = `${state.questions.length} Questions`;
}