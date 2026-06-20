const startTime = new Date('2026-03-01T00:00:00+07:00').getTime();
function updateUptime() {
  const e = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById('ut-days').textContent  = Math.floor(e / 86400);
  document.getElementById('ut-hours').textContent = Math.floor((e % 86400) / 3600);
  document.getElementById('ut-mins').textContent  = Math.floor((e % 3600) / 60);
  document.getElementById('ut-secs').textContent  = e % 60;
}
updateUptime();
setInterval(updateUptime, 1000);

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('hidden', window.scrollY > 40);
});

let revealed = false;
function toggleReveal() {
  revealed = !revealed;
  document.getElementById('stk').classList.toggle('revealed', revealed);
  document.getElementById('ctk').classList.toggle('revealed', revealed);
  document.getElementById('copy-stk').classList.toggle('show', revealed);
  document.getElementById('copy-ctk').classList.toggle('show', revealed);
}

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg || 'Đã sao chép';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}
function copyVal(id) {
  navigator.clipboard.writeText(document.getElementById(id).textContent).then(() => showToast());
}
function copyText(val) {
  navigator.clipboard.writeText(val).then(() => showToast());
}

function openQR() { document.getElementById('qrOverlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeQR() { document.getElementById('qrOverlay').classList.remove('open'); document.body.style.overflow = ''; }
function closeQROutside(e) { if (e.target === document.getElementById('qrOverlay')) closeQR(); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQR(); });

const playlist = [
  '/assets/music/khongbuong.mp3',
  '/assets/music/buong.mp3',
  '/assets/music/khoanthai.mp3'
];

const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.5;

let currentTrack = 0;
let musicStarted = false;

function loadTrack(index) {
  bgMusic.src = playlist[index];
  bgMusic.load();
}

function playNext() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  bgMusic.play().catch(() => {});
}

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  loadTrack(currentTrack);
  bgMusic.play().catch(() => {});
}

bgMusic.addEventListener('ended', playNext);

document.addEventListener('click', startMusic, { once: true });
