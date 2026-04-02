// Pixel art retro computer — 16×16 grid, drawn at 5× scale (80×80 px)

const COMP_SCALE = 5;

// Colour palette
const CG = '#8A8A8A'; // monitor body — gray
const CL = '#BBBBBB'; // highlight
const CD = '#444444'; // shadow / vent slats
const CB = '#080C14'; // screen background (dark blue-black)
const __ = null;      // transparent

// Static body (screen pixels drawn dynamically each frame)
const COMPUTER_BODY = [
  [__,__,__,__,__,__,__,__,__,__,__,__,__,__,__,__],
  [__,__,CG,CG,CG,CG,CG,CG,CG,CG,CG,CG,__,__,__,__],
  [__,CG,CG,CL,CG,CG,CG,CG,CG,CG,CG,CG,CG,__,__,__],
  [__,CG,CB,CB,CB,CB,CB,CB,CB,CB,CB,CB,CG,__,__,__],  // screen rows 3-8
  [__,CG,CB,CB,CB,CB,CB,CB,CB,CB,CB,CB,CG,__,__,__],
  [__,CG,CB,CB,CB,CB,CB,CB,CB,CB,CB,CB,CG,__,__,__],
  [__,CG,CB,CB,CB,CB,CB,CB,CB,CB,CB,CB,CG,__,__,__],
  [__,CG,CB,CB,CB,CB,CB,CB,CB,CB,CB,CB,CG,__,__,__],
  [__,CG,CB,CB,CB,CB,CB,CB,CB,CB,CB,CB,CG,__,__,__],
  [__,CG,CG,CG,CG,CG,CG,CG,CG,CG,CG,CG,CG,__,__,__],
  [__,__,__,CG,CD,CG,CD,CG,CD,CG,CD,CG,__,__,__,__],  // vent slats
  [__,__,__,__,__,CG,CG,CG,CG,CG,__,__,__,__,__,__],  // neck
  [__,__,__,__,CG,CG,CG,CG,CG,CG,CG,__,__,__,__,__],  // base top
  [__,__,__,CG,CG,CG,CG,CG,CG,CG,CG,CG,__,__,__,__],  // base
  [__,__,__,__,__,__,__,__,__,__,__,__,__,__,__,__],
  [__,__,__,__,__,__,__,__,__,__,__,__,__,__,__,__],
];

// Screen pixel region (inclusive)
const SCREEN_ROW_START = 3;
const SCREEN_ROW_END   = 8;
const SCREEN_COL_START = 2;
const SCREEN_COL_END   = 11;

function drawComputer(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw static body
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const color = COMPUTER_BODY[row][col];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(col * COMP_SCALE, row * COMP_SCALE, COMP_SCALE, COMP_SCALE);
      }
    }
  }

  // Flicker: random lit/dark pixels in screen area
  for (let row = SCREEN_ROW_START; row <= SCREEN_ROW_END; row++) {
    for (let col = SCREEN_COL_START; col <= SCREEN_COL_END; col++) {
      const rnd = Math.random();
      let color;
      if (rnd > 0.72)      color = '#00FF88'; // bright green — "1"
      else if (rnd > 0.50) color = '#006633'; // dim green — "0"
      else                 color = CB;         // off (background)
      ctx.fillStyle = color;
      ctx.fillRect(col * COMP_SCALE, row * COMP_SCALE, COMP_SCALE, COMP_SCALE);
    }
  }
}

function initComputer(canvasId) {
  const canvas = document.getElementById(canvasId);
  drawComputer(canvas);
  setInterval(() => drawComputer(canvas), 50);
}
