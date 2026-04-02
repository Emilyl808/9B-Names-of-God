// ── Page management ──────────────────────────────────────────

const pages = {
  landing:  document.getElementById('page-landing'),
  race:     document.getElementById('page-race'),
  boom:     document.getElementById('page-boom'),
};

function showPage(name) {
  Object.values(pages).forEach(p => (p.style.display = 'none'));
  pages[name].style.display = 'flex';
}

// ── Monk permutation cycling ──────────────────────────────────

const MONK_PERMS = [
  'AABBAACCA', 'BBCAABBCA', 'CCDDAABBA', 'AABBCCAAB',
  'DDCCBBAAD', 'EECDDAABC', 'AABCDDCCA', 'BBAACDCCB',
  'CCBBDDAAC', 'AADDBBCCD',
];

let monkPermIndex = 0;

function cycleMonkPerm() {
  const el = document.getElementById('monk-permutation');
  el.style.opacity = '0';
  setTimeout(() => {
    monkPermIndex = (monkPermIndex + 1) % MONK_PERMS.length;
    el.textContent = MONK_PERMS[monkPermIndex];
    el.style.opacity = '1';
  }, 300);
}

// ── Computer random permutation ───────────────────────────────

function randomPerm() {
  let s = '';
  for (let i = 0; i < 9; i++) {
    s += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }
  return s;
}

// ── Race logic ────────────────────────────────────────────────

const COMPUTER_DURATION_MS = 15000;
const COMP_UPDATE_MS = 50;

let monkProgress = 0;
let raceStartTime = null;
let raceIntervals = [];

function startRace() {
  raceStartTime = Date.now();

  // Monk: permutation cycling every 1.5 s with fade
  raceIntervals.push(setInterval(cycleMonkPerm, 1500));

  // Monk: glacially slow fake progress (+0.000001% per 100 ms)
  raceIntervals.push(setInterval(() => {
    monkProgress += 0.000001;
    document.getElementById('monk-bar').style.width      = monkProgress + '%';
    document.getElementById('monk-progress').textContent = monkProgress.toFixed(6) + '%';
  }, 100));

  // Computer: permutation snap-update every 30 ms
  raceIntervals.push(setInterval(() => {
    document.getElementById('computer-permutation').textContent = randomPerm();
  }, 30));

  // Computer: progress bar completes in exactly 15 s
  const compInterval = setInterval(() => {
    const elapsed = Date.now() - raceStartTime;
    const pct = Math.min((elapsed / COMPUTER_DURATION_MS) * 100, 100);

    document.getElementById('computer-bar').style.width      = pct + '%';
    document.getElementById('computer-progress').textContent = pct.toFixed(2) + '%';

    const secsLeft = Math.max(0, Math.ceil((COMPUTER_DURATION_MS - elapsed) / 1000));
    document.getElementById('computer-countdown').textContent = secsLeft;

    if (pct >= 100) {
      clearInterval(compInterval);
      triggerBoom();
    }
  }, COMP_UPDATE_MS);
  raceIntervals.push(compInterval);
}

function stopRace() {
  raceIntervals.forEach(clearInterval);
  raceIntervals = [];
}

// ── Boom sequence ─────────────────────────────────────────────

function triggerBoom() {
  stopRace();
  showPage('boom');

  // Shake the entire viewport
  document.body.classList.add('shaking');

  // After 1.5 s shake, reveal the aftermath
  setTimeout(() => {
    document.body.classList.remove('shaking');

    const aftermath = document.getElementById('boom-aftermath');
    aftermath.style.display = 'flex';

    // Seed the boom-page monk bar with accumulated progress
    document.getElementById('monk-bar-boom').style.width           = monkProgress + '%';
    document.getElementById('monk-progress-boom').textContent      = monkProgress.toFixed(6) + '%';

    // Keep ticking
    setInterval(() => {
      monkProgress += 0.000001;
      document.getElementById('monk-bar-boom').style.width          = monkProgress + '%';
      document.getElementById('monk-progress-boom').textContent     = monkProgress.toFixed(6) + '%';
    }, 100);
  }, 1500);
}

// ── Entry point ───────────────────────────────────────────────

document.getElementById('btn-start').addEventListener('click', () => {
  showPage('race');
  initMonk('monk-canvas');
  initComputer('computer-canvas');
  startRace();
});
