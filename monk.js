// Pixel art monk — 16×16 grid, drawn at 5× scale (80×80 px)

const MONK_SCALE = 5;

// Colour palette
const H = '#C8906A'; // skin
const R = '#E07B39'; // robe (Anthropic orange)
const S = '#F2E0B0'; // scroll / parchment
const Q = '#F0CC50'; // quill
const D = '#3A2010'; // dark shadow accent
const _ = null;      // transparent

// ── Frame 1: quill raised ──────────────────────────────────
const FRAME_QUILL_UP = [
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,H,H,H,H,_,_,_,_,_,_,_,_],
  [_,_,_,H,H,H,H,H,H,_,_,_,_,_,_,_],
  [_,_,_,H,_,H,H,_,H,_,_,_,_,_,_,_],  // two eye dots
  [_,_,_,D,H,H,H,H,D,_,_,_,_,_,_,_],  // chin / shadow
  [_,_,_,R,R,R,R,R,R,_,_,_,_,_,_,_],  // shoulders
  [_,_,R,R,R,R,R,R,R,R,_,_,_,_,_,_],  // upper robe
  [_,_,R,R,R,R,R,R,R,R,_,_,Q,_,_,_],  // quill tip high
  [_,_,R,R,R,R,R,R,R,R,_,Q,_,_,_,_],  // quill mid
  [_,_,R,R,R,R,R,R,R,R,_,_,_,_,_,_],  // lower robe
  [_,R,R,R,R,R,R,R,R,R,R,_,_,_,_,_],  // robe base
  [R,R,R,R,_,_,_,_,_,R,R,R,_,_,_,_],  // crossed legs
  [_,_,_,_,S,S,S,S,S,S,_,_,_,_,_,_],  // scroll
  [_,_,_,_,S,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// ── Frame 2: quill down (writing) ─────────────────────────
const FRAME_QUILL_DOWN = [
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,H,H,H,H,_,_,_,_,_,_,_,_],
  [_,_,_,H,H,H,H,H,H,_,_,_,_,_,_,_],
  [_,_,_,H,_,H,H,_,H,_,_,_,_,_,_,_],
  [_,_,_,D,H,H,H,H,D,_,_,_,_,_,_,_],
  [_,_,_,R,R,R,R,R,R,_,_,_,_,_,_,_],
  [_,_,R,R,R,R,R,R,R,R,_,_,_,_,_,_],
  [_,_,R,R,R,R,R,R,R,R,R,_,_,_,_,_],  // arm extended right
  [_,_,R,R,R,R,R,R,R,R,_,R,_,_,_,_],  // arm down
  [_,_,R,R,R,R,R,R,R,R,_,_,Q,_,_,_],  // quill tip near scroll
  [_,R,R,R,R,R,R,R,R,R,R,_,_,_,_,_],
  [R,R,R,R,_,_,_,_,_,R,R,R,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

const MONK_FRAMES = [FRAME_QUILL_UP, FRAME_QUILL_DOWN];

function drawMonkFrame(canvas, frameIndex) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const frame = MONK_FRAMES[frameIndex];
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const color = frame[row][col];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(col * MONK_SCALE, row * MONK_SCALE, MONK_SCALE, MONK_SCALE);
      }
    }
  }
}

function initMonk(canvasId) {
  const canvas = document.getElementById(canvasId);
  let frame = 0;
  drawMonkFrame(canvas, frame);
  setInterval(() => {
    frame = (frame + 1) % 2;
    drawMonkFrame(canvas, frame);
  }, 600);
}
