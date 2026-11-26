// ======================
// Theme Toggle
// ======================
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.innerHTML = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

// ======================
// Scroll Reveal
// ======================
const reveals = document.querySelectorAll("section");
function reveal() {
  reveals.forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight - 120) {
      section.classList.add("revealed");
    }
  });
}
window.addEventListener("scroll", reveal, { passive: true });
reveal();

// ======================
// Back To Top Button
// ======================
const topBtn = document.getElementById("topBtn");
function updateTopButton() {
  if (!topBtn) return;
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
}
window.addEventListener("scroll", updateTopButton, { passive: true });
updateTopButton();
if (topBtn) {
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ======================
// Cinematic 3D Portrait Interaction
// ======================
const heroVisual = document.getElementById("heroVisual");
const portraitStage = document.getElementById("portraitStage");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (heroVisual && portraitStage && !reduceMotion) {
  heroVisual.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portraitStage.style.transform = `rotateY(${x * 11}deg) rotateX(${-y * 9}deg)`;
    portraitStage.style.setProperty("--pointer-x", `${x * 22}px`);
    portraitStage.style.setProperty("--pointer-y", `${y * 22}px`);
  });
  heroVisual.addEventListener("pointerleave", () => {
    portraitStage.style.transform = "rotateY(0deg) rotateX(0deg)";
    portraitStage.style.setProperty("--pointer-x", "0px");
    portraitStage.style.setProperty("--pointer-y", "0px");
  });
}

// Subtle parallax for glass fragments
document.querySelectorAll(".glass-shard").forEach((shard, index) => {
  shard.style.transition = "transform .35s ease-out";
  if (portraitStage) {
    portraitStage.addEventListener("pointermove", () => {
      const x = parseFloat(portraitStage.style.getPropertyValue("--pointer-x")) || 0;
      const y = parseFloat(portraitStage.style.getPropertyValue("--pointer-y")) || 0;
      shard.style.translate = `${x * (index + 1) * .035}px ${y * (index + 1) * .035}px`;
    });
    portraitStage.addEventListener("pointerleave", () => { shard.style.translate = "0 0"; });
  }
});
