// Shared player for choir song pages.
// Expects: <audio id="player">, a play button [data-role="play"],
// a seek slider [data-role="seek"], a volume slider [data-role="volume"],
// a now-playing label [data-role="now-playing"], and buttons with
// class="track-btn" carrying data-src and data-label.

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('player');
  const playBtn = document.querySelector('[data-role="play"]');
  const seek = document.querySelector('[data-role="seek"]');
  const time = document.querySelector('[data-role="time"]');
  const volume = document.querySelector('[data-role="volume"]');
  const nowPlaying = document.querySelector('[data-role="now-playing"]');
  const trackBtns = document.querySelectorAll('.track-btn');

  if (!audio) return;

  function formatTime(s) {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  function setActiveButton(btn) {
    trackBtns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }

  trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.src;
      const label = btn.dataset.label;
      audio.src = src;
      audio.play();
      setActiveButton(btn);
      playBtn.dataset.playing = 'true';
      playBtn.innerHTML = '&#10074;&#10074;';
      nowPlaying.innerHTML = 'Now playing: <span class="track-label">' + label + '</span>';
    });
  });

  playBtn.addEventListener('click', () => {
    if (!audio.src) return;
    if (audio.paused) {
      audio.play();
      playBtn.dataset.playing = 'true';
      playBtn.innerHTML = '&#10074;&#10074;';
    } else {
      audio.pause();
      playBtn.dataset.playing = 'false';
      playBtn.innerHTML = '&#9654;';
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    seek.max = audio.duration;
  });

  audio.addEventListener('timeupdate', () => {
    seek.value = audio.currentTime;
    time.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('ended', () => {
    playBtn.dataset.playing = 'false';
    playBtn.innerHTML = '&#9654;';
  });

  seek.addEventListener('input', () => {
    audio.currentTime = seek.value;
  });

  volume.addEventListener('input', () => {
    audio.volume = volume.value;
  });
  audio.volume = volume.value;
});
