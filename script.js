// ======================
// Theme Toggle
// ======================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const body = document.body;

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {

            themeToggle.innerHTML = "☀️";

        } else {

            themeToggle.innerHTML = "🌙";

        }

    });

}

// ======================
// Scroll Reveal
// ======================

const reveals = document.querySelectorAll("section");

function reveal() {

    reveals.forEach((section) => {

        const windowHeight = window.innerHeight;

        const elementTop = section.getBoundingClientRect().top;

        if (elementTop < windowHeight - 120) {

            section.classList.add("revealed");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();

// ======================
// Back To Top Button
// ======================

const topBtn = document.getElementById("topBtn");

window.onscroll = function () {

    if (!topBtn) return;

    if (document.body.scrollTop > 400 ||

        document.documentElement.scrollTop > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

};

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}