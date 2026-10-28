const scenes = [...document.querySelectorAll('.scene')];
const progress = document.querySelector('#progress');
const label = document.querySelector('#scene-label');
const play = document.querySelector('#play');
const restart = document.querySelector('#restart');
const sceneDuration = 5200;
let current = 0;
let startedAt = performance.now();
let paused = false;

function showScene(index) {
  current = index;
  scenes.forEach((scene, i) => scene.classList.toggle('active', i === current));
  label.textContent = `${String(current + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
}

function tick(now) {
  if (!paused) {
    const elapsed = now - startedAt;
    if (elapsed >= sceneDuration) {
      showScene((current + 1) % scenes.length);
      startedAt = now;
    }
    progress.style.width = `${Math.min(100, (elapsed / sceneDuration) * 100)}%`;
  }
  requestAnimationFrame(tick);
}

play.addEventListener('click', () => {
  paused = !paused;
  play.textContent = paused ? 'Play' : 'Pause';
  if (!paused) startedAt = performance.now();
});

restart.addEventListener('click', () => {
  showScene(0);
  startedAt = performance.now();
  paused = false;
  play.textContent = 'Pause';
});

showScene(0);
requestAnimationFrame(tick);
