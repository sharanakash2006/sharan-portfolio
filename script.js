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


// ======================
// Interactive 3D Project Cards
// ======================
const projectCards = document.querySelectorAll(".project-card");

if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  projectCards.forEach((card) => {
    let frame = null;

    card.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 8;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.setProperty("--tilt-x", `${rotateX}deg`);
        card.style.setProperty("--tilt-y", `${rotateY}deg`);
        card.style.setProperty("--glow-x", `${x * 100}%`);
        card.style.setProperty("--glow-y", `${y * 100}%`);
        card.style.setProperty("--card-glow", "1");
      });
    });

    card.addEventListener("pointerleave", () => {
      if (frame) cancelAnimationFrame(frame);
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--glow-x", "50%");
      card.style.setProperty("--glow-y", "50%");
      card.style.setProperty("--card-glow", "0");
    });
  });
}


// ======================
// Interactive 3D Skill Tiles
// ======================
const skillCards = document.querySelectorAll(".skill-card");

if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  skillCards.forEach((card) => {
    let skillFrame = null;
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 9;
      const rotateX = (0.5 - y) * 7;
      if (skillFrame) cancelAnimationFrame(skillFrame);
      skillFrame = requestAnimationFrame(() => {
        card.style.setProperty("--skill-x", `${rotateX}deg`);
        card.style.setProperty("--skill-y", `${rotateY}deg`);
        card.style.setProperty("--skill-glow-x", `${x * 100}%`);
        card.style.setProperty("--skill-glow-y", `${y * 100}%`);
        card.style.setProperty("--skill-light", "1");
      });
    });
    card.addEventListener("pointerleave", () => {
      if (skillFrame) cancelAnimationFrame(skillFrame);
      card.style.setProperty("--skill-x", "0deg");
      card.style.setProperty("--skill-y", "0deg");
      card.style.setProperty("--skill-glow-x", "50%");
      card.style.setProperty("--skill-glow-y", "50%");
      card.style.setProperty("--skill-light", "0");
    });
  });
}


// ======================
// Interactive Certificate Cards
// ======================
const certificateCards = document.querySelectorAll(".certificate-card");

if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  certificateCards.forEach((card) => {
    let certificateFrame = null;

    card.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 7;

      if (certificateFrame) cancelAnimationFrame(certificateFrame);
      certificateFrame = requestAnimationFrame(() => {
        card.style.setProperty("--cert-x", `${rotateX}deg`);
        card.style.setProperty("--cert-y", `${rotateY}deg`);
        card.style.setProperty("--cert-glow-x", `${x * 100}%`);
        card.style.setProperty("--cert-glow-y", `${y * 100}%`);
        card.style.setProperty("--cert-glow", "1");
      });
    });

    card.addEventListener("pointerleave", () => {
      if (certificateFrame) cancelAnimationFrame(certificateFrame);
      card.style.setProperty("--cert-x", "0deg");
      card.style.setProperty("--cert-y", "0deg");
      card.style.setProperty("--cert-glow-x", "50%");
      card.style.setProperty("--cert-glow-y", "50%");
      card.style.setProperty("--cert-glow", "0");
    });
  });
}


// ======================
// Contact form — open a prefilled email draft
// ======================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = contactForm.querySelectorAll("input, textarea");
    const [name, email, company, message] = Array.from(fields, (field) => field.value.trim());
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:sharanakash2006@gmail.com?subject=${subject}&body=${body}`;
  });
}


// =========================================================
// CINEMATIC EXPERIENCE — loader, navigation, progress, 3D scene
// =========================================================
(() => {
  const loader = document.getElementById("siteLoader");
  const finishLoader = () => window.setTimeout(() => loader?.classList.add("loaded"), 450);
  if (document.readyState === "complete") finishLoader();
  else window.addEventListener("load", finishLoader, { once: true });
  window.setTimeout(finishLoader, 2400);

  const progress = document.getElementById("scrollProgress");
  const header = document.querySelector("header");
  const navLinks = [...document.querySelectorAll('header nav a[href^="#"]')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  const updateScrollUI = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    if (progress) progress.style.width = (ratio * 100) + "%";
    header?.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => navObserver.observe(section));
  }

  // Pause the decorative video when the tab is hidden to save battery.
  const video = document.querySelector(".cinema-video");
  document.addEventListener("visibilitychange", () => {
    if (!video) return;
    if (document.hidden) video.pause();
    else video.play().catch(() => {});
  });

  // Three.js: lightweight depth particle field, no external model downloads.
  const canvas = document.getElementById("threeScene");
  const hero = document.querySelector(".cinematic-hero");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || !hero || reduced || !window.THREE) return;

  let renderer, scene, camera, points, frameId;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(hero.clientWidth, hero.clientHeight, false);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, hero.clientWidth / hero.clientHeight, .1, 100);
    camera.position.z = 16;

    const count = window.innerWidth < 700 ? 420 : 850;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - .5) * 27;
      positions[i * 3 + 1] = (Math.random() - .5) * 16;
      positions[i * 3 + 2] = (Math.random() - .5) * 13;
      sizes[i] = .35 + Math.random() * 1.35;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    const material = new THREE.PointsMaterial({
      color: 0xff4058, size: .045, transparent: true,
      opacity: .78, blending: THREE.AdditiveBlending,
      depthWrite: false, sizeAttenuation: true
    });
    points = new THREE.Points(geometry, material);
    scene.add(points);

    const resize = () => {
      const w = hero.clientWidth, h = hero.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize, { passive: true });
    hero.addEventListener("pointermove", event => {
      if (event.pointerType === "touch") return;
      const rect = hero.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - .5) * 1.4;
      pointer.ty = ((event.clientY - rect.top) / rect.height - .5) * 1.0;
    }, { passive: true });
    hero.addEventListener("pointerleave", () => { pointer.tx = 0; pointer.ty = 0; });

    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * .025;
      pointer.y += (pointer.ty - pointer.y) * .025;
      points.rotation.y = t * .018 + pointer.x * .12;
      points.rotation.x = Math.sin(t * .12) * .035 + pointer.y * .08;
      points.position.y = Math.sin(t * .18) * .12;
      camera.position.x = pointer.x * .35;
      camera.position.y = -pointer.y * .25;
      renderer.render(scene, camera);
    };
    animate();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && frameId) cancelAnimationFrame(frameId);
      else if (!document.hidden && !frameId) animate();
    });
  } catch (error) {
    console.warn("3D scene unavailable; keeping video and CSS effects.", error);
    if (renderer) renderer.dispose();
  }
})();


// =========================================================
// SHATTERED GLASS OVERLAY + CINEMATIC SECTION REVEALS
// =========================================================
(() => {
  const stage = document.getElementById("portraitStage");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Fine fracture lines around the portrait: lightweight SVG, no image assets.
  if (stage && !stage.querySelector(".glass-fracture")) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "glass-fracture");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    const defs = document.createElementNS(svgNS, "defs");
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", "fractureFill");
    gradient.setAttribute("x1", "0"); gradient.setAttribute("y1", "0");
    gradient.setAttribute("x2", "1"); gradient.setAttribute("y2", "1");
    [["0%","rgba(255,255,255,.18)"],["55%","rgba(255,35,65,.055)"],["100%","rgba(255,255,255,.015)"]].forEach(([offset,color]) => {
      const stop = document.createElementNS(svgNS, "stop");
      stop.setAttribute("offset", offset); stop.setAttribute("stop-color", color);
      gradient.appendChild(stop);
    });
    defs.appendChild(gradient); svg.appendChild(defs);
    const shards = [
      "4,5 29,0 23,27 10,35", "29,0 53,7 42,25 23,27",
      "53,7 77,1 69,25 42,25", "77,1 98,13 83,34 69,25",
      "0,39 10,35 23,27 19,55 4,68", "23,27 42,25 48,48 19,55",
      "42,25 69,25 62,51 48,48", "69,25 83,34 96,53 62,51",
      "4,68 19,55 32,79 13,96", "19,55 48,48 52,75 32,79",
      "48,48 62,51 82,76 52,75", "62,51 96,53 98,89 82,76",
      "13,96 32,79 52,75 44,100", "52,75 82,76 98,89 86,100"
    ];
    shards.forEach(points => {
      const polygon = document.createElementNS(svgNS, "polygon");
      polygon.setAttribute("points", points);
      svg.appendChild(polygon);
    });
    stage.appendChild(svg);
  }

  // Give the portrait fragments a real parallax depth response.
  if (stage && !reduce && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const fragments = [...stage.querySelectorAll(".glass-shard")];
    stage.addEventListener("pointermove", event => {
      const rect = stage.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      fragments.forEach((fragment, index) => {
        const depth = 12 + index * 8;
        fragment.style.transform =
          `translate3d(${-px * depth}px,${-py * depth}px,${depth}px) rotate(${px * (index % 2 ? 5 : -5)}deg)`;
      });
    }, { passive: true });
    stage.addEventListener("pointerleave", () => {
      fragments.forEach(fragment => { fragment.style.transform = ""; });
    });
  }

  // IntersectionObserver gives each section a calm cinematic entrance.
  const animatedSections = [...document.querySelectorAll("section:not(.cinematic-hero)")];
  if ("IntersectionObserver" in window && !reduce) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "0px 0px -7% 0px" });
    animatedSections.forEach(section => {
      section.classList.remove("revealed");
      revealObserver.observe(section);
    });
  } else {
    animatedSections.forEach(section => section.classList.add("revealed"));
  }
})();
