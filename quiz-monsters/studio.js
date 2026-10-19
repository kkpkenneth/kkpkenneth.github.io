/********************************************************************
 * studio.js
 * Streamlined 8-Color Pixel Sprite Studio, Flood Fill, Mirror & Deck Editor
 ********************************************************************/

function initSpriteStudio() {
  const sel = document.getElementById('studioMonsterSelect');
  sel.innerHTML = '';
  MONSTER_SPECIES.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = `${m.name} (${m.type})`;
    sel.appendChild(opt);
  });

  // Hide the "+ ADD COLOR SLOT" button so the studio stays locked to 8 clean colors
  const addSlotBtn = document.getElementById('studioAddColorSlotBtn');
  if (addSlotBtn) addSlotBtn.classList.add('hidden');

  sel.addEventListener('change', (e) => {
    state.studio.selectedMonsterId = e.target.value;
    const palKeys = Object.keys(MONSTER_PIXELS[state.studio.selectedMonsterId].palette);
    if (state.studio.activeBrush !== '.' && !palKeys.includes(state.studio.activeBrush)) {
      state.studio.activeBrush = palKeys[0] || 'p';
    }
    renderStudioEditor();
  });

  const presetBar = document.getElementById('studioPresetBar');
  presetBar.innerHTML = '';
  PIXEL_COLOR_PRESETS.forEach(hex => {
    const swatchBtn = document.createElement('button');
    swatchBtn.type = 'button';
    swatchBtn.className = 'w-5 h-5 rounded border border-slate-900 hover:scale-110 transition-transform';
    swatchBtn.style.backgroundColor = hex;
    swatchBtn.title = `Set active slot to ${hex}`;
    swatchBtn.addEventListener('click', () => {
      const monId = state.studio.selectedMonsterId;
      const activeKey = state.studio.activeBrush;
      if (activeKey === '.') return;
      MONSTER_PIXELS[monId].palette[activeKey] = hex;
      sfx.blip();
      renderStudioEditor();
    });
    presetBar.appendChild(swatchBtn);
  });

  document.getElementById('toolBrushBtn').addEventListener('click', () => {
    sfx.blip();
    state.studio.toolMode = 'BRUSH';
    if (state.studio.activeBrush === '.') state.studio.activeBrush = 'p';
    renderStudioEditor();
  });

  document.getElementById('toolFillBtn').addEventListener('click', () => {
    sfx.blip();
    state.studio.toolMode = 'FILL';
    if (state.studio.activeBrush === '.') state.studio.activeBrush = 'p';
    renderStudioEditor();
  });

  document.getElementById('toolEraserBtn').addEventListener('click', () => {
    sfx.blip();
    state.studio.toolMode = 'ERASER';
    state.studio.activeBrush = '.';
    renderStudioEditor();
  });

  document.getElementById('toolMirrorBtn').addEventListener('click', () => {
    sfx.blip();
    state.studio.mirrorX = !state.studio.mirrorX;
    renderStudioEditor();
  });

  document.getElementById('openSpriteStudioBtn').addEventListener('click', () => {
    sfx.blip();
    renderStudioEditor();
    const modal = document.getElementById('spriteStudioModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  document.getElementById('closeSpriteStudioBtn').addEventListener('click', () => {
    sfx.blip();
    const modal = document.getElementById('spriteStudioModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  document.getElementById('studioClearGridBtn').addEventListener('click', () => {
    sfx.blip();
    const monId = state.studio.selectedMonsterId;
    MONSTER_PIXELS[monId].grid = Array(16).fill('................');
    renderStudioEditor();
  });

  document.getElementById('studioResetMonsterBtn').addEventListener('click', () => {
    sfx.blip();
    const monId = state.studio.selectedMonsterId;
    MONSTER_PIXELS[monId] = structuredClone(DEFAULT_MONSTER_PIXELS[monId]);
    renderStudioEditor();
  });

  document.getElementById('studioCopyCodeBtn').addEventListener('click', () => {
    const area = document.getElementById('studioCodeTextarea');
    navigator.clipboard.writeText(area.value);
    sfx.captureFanfare();
    const msg = document.getElementById('studioCopyStatus');
    msg.textContent = 'COPIED! PASTE INTO monsters.js';
    setTimeout(() => { msg.textContent = ''; }, 3000);
  });

  document.getElementById('studioImportCodeBtn').addEventListener('click', () => {
    try {
      let raw = document.getElementById('studioCodeTextarea').value.trim();
      raw = raw.replace(/^const\s+(DEFAULT_)?MONSTER_PIXELS\s*=\s*/, '').replace(/;$/, '');
      const parsed = JSON.parse(raw);
      if (!parsed.voltbit) throw new Error('Missing monster keys');
      MONSTER_PIXELS = parsed;
      sfx.captureFanfare();
      renderStudioEditor();
      const msg = document.getElementById('studioCopyStatus');
      msg.textContent = 'RETROFIT APPLIED!';
      setTimeout(() => { msg.textContent = ''; }, 3000);
    } catch (e) {
      sfx.wrongBuzzer();
      document.getElementById('studioCopyStatus').textContent = 'INVALID SYNTAX!';
    }
  });

  window.addEventListener('mouseup', () => { state.studio.isPainting = false; });
  renderStudioEditor();
}

function floodFillGrid(gridArr, startX, startY, targetChar, replacementChar) {
  if (targetChar === replacementChar) return;
  const queue = [[startX, startY]];
  const visited = new Set();

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();
    const key = `${cx},${cy}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (cx < 0 || cx >= 16 || cy < 0 || cy >= 16) continue;
    if (gridArr[cy].charAt(cx) !== targetChar) continue;

    const rowStr = gridArr[cy];
    gridArr[cy] = rowStr.substring(0, cx) + replacementChar + rowStr.substring(cx + 1);

    queue.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
}

function setPixelAt(gridArr, x, y, charKey) {
  if (x < 0 || x >= 16 || y < 0 || y >= 16) return;
  const rowStr = gridArr[y];
  gridArr[y] = rowStr.substring(0, x) + charKey + rowStr.substring(x + 1);
}

function renderStudioEditor() {
  const monId = state.studio.selectedMonsterId;
  const art = MONSTER_PIXELS[monId];
  const palKeys = Object.keys(art.palette);

  const tBrush = document.getElementById('toolBrushBtn');
  const tFill  = document.getElementById('toolFillBtn');
  const tErase = document.getElementById('toolEraserBtn');
  const tMirr  = document.getElementById('toolMirrorBtn');

  tBrush.className = `pixel-btn text-[8px] px-2 py-1 ${state.studio.toolMode === 'BRUSH' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-200'}`;
  tFill.className  = `pixel-btn text-[8px] px-2 py-1 ${state.studio.toolMode === 'FILL' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-700 text-slate-200'}`;
  tErase.className = `pixel-btn text-[8px] px-2 py-1 ${state.studio.toolMode === 'ERASER' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-200'}`;
  tMirr.className  = `pixel-btn text-[8px] px-2 py-1 ${state.studio.mirrorX ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'}`;
  tMirr.textContent = `🪞 MIRROR X: ${state.studio.mirrorX ? 'ON' : 'OFF'}`;

  document.getElementById('studioSlotCountLabel').textContent = `${palKeys.length} Colors`;

  const brushContainer = document.getElementById('studioBrushList');
  brushContainer.className = 'grid grid-cols-2 gap-1.5';
  brushContainer.innerHTML = '';

  palKeys.forEach(k => {
    const isSelected = state.studio.activeBrush === k && state.studio.toolMode !== 'ERASER';
    const card = document.createElement('div');
    card.className = `flex items-center justify-between p-1.5 rounded border-2 cursor-pointer transition-colors ${isSelected ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-300 bg-white hover:bg-slate-50'}`;

    const left = document.createElement('div');
    left.className = 'flex items-center gap-1.5 flex-1 min-w-0';
    const swatch = document.createElement('span');
    swatch.className = 'w-4 h-4 rounded border border-slate-900 shrink-0 inline-block';
    swatch.style.backgroundColor = art.palette[k];

    const lbl = document.createElement('span');
    lbl.className = 'text-[8px] text-slate-900 font-bold truncate';
    lbl.textContent = PALETTE_SLOT_NAMES[k] || `Slot (${k})`;

    left.appendChild(swatch);
    left.appendChild(lbl);
    left.addEventListener('click', () => {
      state.studio.activeBrush = k;
      if (state.studio.toolMode === 'ERASER') state.studio.toolMode = 'BRUSH';
      renderStudioEditor();
    });
    card.appendChild(left);

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = art.palette[k];
    colorInput.title = `Change Hex Color for slot (${k})`;
    colorInput.className = 'w-5 h-5 cursor-pointer border-0 bg-transparent shrink-0';
    colorInput.addEventListener('input', (e) => {
      art.palette[k] = e.target.value;
      swatch.style.backgroundColor = e.target.value;
      state.studio.activeBrush = k;
      refreshStudioGridColorsOnly();
      refreshStudioVisualsOnly();
    });
    card.appendChild(colorInput);

    brushContainer.appendChild(card);
  });

  const gridEl = document.getElementById('studioPixelGrid');
  gridEl.innerHTML = '';
  gridEl.oncontextmenu = (e) => e.preventDefault();

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const cell = document.createElement('div');
      cell.dataset.x = x;
      cell.dataset.y = y;
      const ch = art.grid[y].charAt(x);
      if (ch === '.' || !art.palette[ch]) {
        cell.className = 'w-full h-full cursor-crosshair pixel-checker';
        cell.style.backgroundColor = '';
      } else {
        cell.className = 'w-full h-full cursor-crosshair';
        cell.style.backgroundColor = art.palette[ch];
      }

      const applyStrokeAt = (cx, cy, forceErase = false) => {
        const activeChar = forceErase || state.studio.toolMode === 'ERASER' ? '.' : state.studio.activeBrush;
        if (state.studio.toolMode === 'FILL' && !forceErase) {
          const targetChar = art.grid[cy].charAt(cx);
          floodFillGrid(art.grid, cx, cy, targetChar, activeChar);
          refreshStudioGridColorsOnly();
          refreshStudioVisualsOnly();
        } else {
          setPixelAt(art.grid, cx, cy, activeChar);
          if (state.studio.mirrorX) {
            setPixelAt(art.grid, 15 - cx, cy, activeChar);
          }
          refreshStudioGridColorsOnly();
          refreshStudioVisualsOnly();
        }
      };

      cell.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.altKey) {
          const sampled = art.grid[y].charAt(x);
          if (sampled !== '.' && art.palette[sampled]) {
            state.studio.activeBrush = sampled;
            state.studio.toolMode = 'BRUSH';
            sfx.blip();
            renderStudioEditor();
          }
          return;
        }
        const isRightClick = e.button === 2;
        state.studio.isPainting = isRightClick ? 'ERASE' : 'PAINT';
        applyStrokeAt(x, y, isRightClick);
      });

      cell.addEventListener('mouseenter', () => {
        if (!state.studio.isPainting) return;
        if (state.studio.toolMode === 'FILL' && state.studio.isPainting === 'PAINT') return;
        applyStrokeAt(x, y, state.studio.isPainting === 'ERASE');
      });

      gridEl.appendChild(cell);
    }
  }

  refreshStudioVisualsOnly();
}

function refreshStudioGridColorsOnly() {
  const monId = state.studio.selectedMonsterId;
  const art = MONSTER_PIXELS[monId];
  const gridEl = document.getElementById('studioPixelGrid');
  const children = gridEl.children;
  let idx = 0;
  for (let y = 0; y < 16; y++) {
    const rowStr = art.grid[y];
    for (let x = 0; x < 16; x++) {
      const cell = children[idx++];
      if (!cell) continue;
      const ch = rowStr.charAt(x);
      if (ch === '.' || !art.palette[ch]) {
        cell.className = 'w-full h-full cursor-crosshair pixel-checker';
        cell.style.backgroundColor = '';
      } else {
        cell.className = 'w-full h-full cursor-crosshair';
        cell.style.backgroundColor = art.palette[ch];
      }
    }
  }
}

function refreshStudioVisualsOnly() {
  const monId = state.studio.selectedMonsterId;
  document.getElementById('studioLivePreview').innerHTML = renderMonsterSVG(monId);

  refreshTitleScreenSprites();
  if (state.enemy) {
    document.getElementById('enemySpriteWrapper').innerHTML = renderMonsterSVG(state.enemy);
  }
  if (state.party.length > 0) {
    document.getElementById('playerSpriteWrapper').innerHTML = renderMonsterSVG(getActivePlayer());
  }

  const codeStr = `const DEFAULT_MONSTER_PIXELS = ${JSON.stringify(MONSTER_PIXELS, null, 2)};`;
  document.getElementById('studioCodeTextarea').value = codeStr;
}

/********************************************************************
 * CUSTOM QUESTION DECK EDITOR
 ********************************************************************/
function initQuestionEditor() {
  document.getElementById('openEditorBtn').addEventListener('click', () => {
    sfx.blip();
    syncJsonTextarea();
    document.getElementById('editorModal').classList.remove('hidden');
    document.getElementById('editorModal').classList.add('flex');
  });

  document.getElementById('closeEditorBtn').addEventListener('click', () => {
    sfx.blip();
    document.getElementById('editorModal').classList.add('hidden');
    document.getElementById('editorModal').classList.remove('flex');
  });

  document.getElementById('addQuestionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('qTypeSelect').value;
    const difficulty = parseInt(document.getElementById('qDiffSelect').value, 10) || 2;
    const q = document.getElementById('qPromptInput').value.trim();
    const o0 = document.getElementById('qOpt0').value.trim();
    const o1 = document.getElementById('qOpt1').value.trim();
    const o2 = document.getElementById('qOpt2').value.trim();
    const o3 = document.getElementById('qOpt3').value.trim();

    if (!q || !o0 || !o1 || !o2 || !o3) return;

    state.questions.unshift({
      type,
      difficulty,
      q,
      options: [o0, o1, o2, o3],
      answer: 0
    });

    sfx.attackHit(true);
    e.target.reset();
    syncJsonTextarea();
    const status = document.getElementById('editorStatusMsg');
    status.textContent = `Added ★${difficulty} question to ${type} Deck!`;
    setTimeout(() => { status.textContent = ''; }, 3000);
  });

  document.getElementById('loadJsonDeckBtn').addEventListener('click', () => {
    try {
      const raw = document.getElementById('jsonBankTextarea').value;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('Must be a non-empty array');
      state.questions = parsed;
      sfx.captureFanfare();
      syncJsonTextarea();
      document.getElementById('editorStatusMsg').textContent = `Loaded ${parsed.length} custom questions!`;
    } catch (err) {
      sfx.wrongBuzzer();
      document.getElementById('editorStatusMsg').textContent = 'Invalid JSON format! Check brackets & quotes.';
    }
  });

  document.getElementById('resetDefaultDeckBtn').addEventListener('click', () => {
    state.questions = structuredClone(DEFAULT_QUESTIONS);
    sfx.blip();
    syncJsonTextarea();
    document.getElementById('editorStatusMsg').textContent = 'Restored default 32-question deck!';
  });

  syncJsonTextarea();
}

function syncJsonTextarea() {
  document.getElementById('jsonBankTextarea').value = JSON.stringify(state.questions, null, 2);
  document.getElementById('totalQuestionsCount').textContent = `${state.questions.length} Questions`;
}