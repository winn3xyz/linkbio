const profile = { name: "Win", year: 2, university: "Burapha University" };

const toOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

document.getElementById("greet").textContent = `Hello, I'm ${profile.name}.`;
document.getElementById("edu").textContent = `I'm a ${toOrdinal(profile.year)}-year student at ${profile.university}.`;

// 💬 typewriter loop
function typewriterLoop(element, text, delay = 100, pause = 1200) {
    let i = 0, isDeleting = false;

    function tick() {
        if (!isDeleting) {
            element.textContent = text.substring(0, i + 1);
            i++;
            if (i === text.length) {
                setTimeout(() => { isDeleting = true; tick(); }, pause);
                return;
            }
        } else {
            element.textContent = text.substring(0, i - 1);
            i--;
            if (i === 0) {
                isDeleting = false;
            }
        }
        const speed = isDeleting ? 60 : delay;
        setTimeout(tick, speed);
    }

    tick();
}

typewriterLoop(document.getElementById("typewriter-name"), "winnerkawear", 100, 1500);

const music = document.getElementById('bg-music');
const volumeSlider = document.getElementById('volume');
const musicBox = document.getElementById('musicBox');
const volBtn = document.getElementById('volBtn');

music.volume = parseFloat(volumeSlider.value || '0.5');

volumeSlider.addEventListener('input', () => {
  music.volume = parseFloat(volumeSlider.value);
});

async function startAudio() {
  try {
    await music.play();                  // พยายามเล่น
    musicBox.classList.add('open');      // โชว์ slider ชั่วคราว
    setTimeout(() => musicBox.classList.remove('open'), 2000);
  } catch (e) {
    // ถ้ายังโดนบล็อก ให้รอคลิกอีกครั้ง
    console.log('Autoplay blocked:', e);
  }
}

volBtn.addEventListener('click', startAudio);

// แตะ/คลิกที่ไหนก็ได้ครั้งแรก → เริ่มเสียง
const tryOnce = async () => {
  await startAudio();
  window.removeEventListener('pointerdown', tryOnce);
  window.removeEventListener('keydown', tryOnce);
};
window.addEventListener('pointerdown', tryOnce);
window.addEventListener('keydown', tryOnce);

// กลับโฟกัสแท็บแล้วเพลงหยุด → พยายามเล่นต่อ
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && music.paused) startAudio();
});


(function startTitleType() {
  const full = "@winnerkawear";
  let i = 0, del = false;

  function tick() {
    document.title = (del ? full.slice(0, i - 1) : full.slice(0, i + 1)) || "winnerkawear";
    i = del ? i - 1 : i + 1;
    if (i >= full.length) { del = true; setTimeout(tick, 900); return; }
    if (i <= 0) { del = false; }
    setTimeout(tick, del ? 120 : 180);
  }

  try { tick(); } catch (e) { console.log(e); }
})();





