document.addEventListener("DOMContentLoaded", () => {
  // โปรไฟล์
  const profile = { name: "Win", year: 2, university: "Burapha University" };
  const toOrdinal = (n) => {
    const s = ["th","st","nd","rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  const greetEl = document.getElementById("greet");
  const eduEl   = document.getElementById("edu");
  if (greetEl) greetEl.textContent = `Hello, I'm ${profile.name}.`;
  if (eduEl)   eduEl.textContent   = `I'm a ${toOrdinal(profile.year)}-year student at ${profile.university}.`;

  // Typewriter ชื่อกลาง
  function typewriterLoop(element, text, delay = 100, pause = 1200) {
    if (!element) return;
    let i = 0, isDeleting = false;
    function tick() {
      if (!isDeleting) {
        element.textContent = text.substring(0, i + 1);
        i++;
        if (i === text.length) { setTimeout(() => { isDeleting = true; tick(); }, pause); return; }
      } else {
        element.textContent = text.substring(0, i - 1);
        i--;
        if (i === 0) { isDeleting = false; }
      }
      setTimeout(tick, isDeleting ? 60 : delay);
    }
    tick();
  }
  typewriterLoop(document.getElementById("typewriter-name"), "winnerkawear", 100, 1500);

  
 (function startTitleType () {
  if (window.__titleTyperRunning) return;
  window.__titleTyperRunning = true;

  const full = "@winnerkawear";
  let i = 0, del = false;

  function tick() {
    document.title = (del ? full.slice(0, i - 1) : full.slice(0, i + 1)) || "winnerkawear";
    i = del ? i - 1 : i + 1;

    let delay = del ? 120 : 180;
    if (i >= full.length) { del = true; delay = 900; }
    if (i <= 0) { del = false; }

    window.__titleTyperTimer = setTimeout(tick, delay); // ใช้อันเดียว
  }

  tick(); // เริ่มทันที ไม่ต้อง delay ซ้อน
})();

  // อ้างอิงองค์ประกอบเสียง + splash (อย่าประกาศซ้ำ)
  const music        = document.getElementById("bg-music");
  const volumeSlider = document.getElementById("volume");
  const musicBox     = document.getElementById("musicBox");
  const volBtn       = document.getElementById("volBtn");
  const splash       = document.getElementById("splash");
  const enterBtn     = document.getElementById("enterBtn");

  if (volumeSlider && music) music.volume = parseFloat(volumeSlider.value || "0.5");

  // ปรับเสียง
  if (volumeSlider && music) {
    volumeSlider.addEventListener("input", () => {
      music.volume = parseFloat(volumeSlider.value);
    });
  }

  // เริ่มเสียง
  async function startAudio() {
    if (!music) return;
    try {
      await music.play();
      if (musicBox) {
        musicBox.classList.add("open");
        setTimeout(() => musicBox.classList.remove("open"), 2000);
      }
    } catch (e) {
      console.log("Autoplay blocked:", e);
    }
  }

  
  async function enterSite() {
    if (splash) splash.classList.add("hidden");
    await startAudio();
  }
  if (enterBtn) enterBtn.addEventListener("click", enterSite);

  
  const tryOnce = async () => {
    await enterSite();
    window.removeEventListener("pointerdown", tryOnce);
    window.removeEventListener("keydown", tryOnce);
  };
  window.addEventListener("pointerdown", tryOnce);
  window.addEventListener("keydown", tryOnce);

  // ปุ่มลำโพง
  if (volBtn) volBtn.addEventListener("click", startAudio);

  // กลับแท็บมาแล้วเพลงหยุด → เล่นต่อ
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && music && music.paused) startAudio();
  });
});
