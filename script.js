
"use strict";

/* SVIP OFFICIAL WEBSITE */

/* LINKS */
const GROUP_WHATSAPP = "https://supervip.wasap.my";
const GROUP_TELEGRAM = "https://t.me/SvipTrust";

const CS_WHATSAPP = "https://supervip.wasap.my";
const CS_TELEGRAM = "https://t.me/Svip_808_Cs";

/* COPYRIGHT YEAR */
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* HEADER */
const header = document.querySelector(".top-header");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 25);
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();

/* BACKGROUND PARTICLES */
const particlesContainer = document.getElementById("particles");

function createParticles() {
  if (!particlesContainer) return;

  const total = 20;

  for (let i = 0; i < total; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";

    const size = Math.random() * 2 + 1;

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration =
      (Math.random() * 12 + 12) + "s";

    particle.style.animationDelay =
      (-Math.random() * 24) + "s";

    particlesContainer.appendChild(particle);
  }
}

createParticles();

/* SCROLL REVEAL */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("show"));
}

/* GAME POPUP */
const supportPopup = document.getElementById("supportPopup");
const popupClose = document.getElementById("popupClose");
const popupOverlay = document.getElementById("popupOverlay");
const popupTitle = document.getElementById("popupTitle");
const popupDescription = document.getElementById("popupDescription");
const popupWhatsApp = document.getElementById("popupWhatsApp");
const popupTelegram = document.getElementById("popupTelegram");
const gameCards = document.querySelectorAll(".game-card");

let lastClickedGame = null;

/* APPLY CONTACT LINKS */
if (popupWhatsApp) {
  popupWhatsApp.href = CS_WHATSAPP;
}

if (popupTelegram) {
  popupTelegram.href = CS_TELEGRAM;
}

/* OPEN */
function openSupportPopup(gameName, clickedCard) {
  if (!supportPopup) return;

  lastClickedGame = clickedCard;

  popupTitle.textContent = gameName + " Support";

  popupDescription.textContent =
    "Pilih WhatsApp atau Telegram untuk bertanya mengenai " +
    gameName + ".";

  supportPopup.classList.add("active");
  supportPopup.setAttribute("aria-hidden", "false");
  document.body.classList.add("popup-open");

  popupClose.focus({ preventScroll: true });
}

/* CLOSE */
function closeSupportPopup() {
  if (!supportPopup) return;

  supportPopup.classList.remove("active");
  supportPopup.setAttribute("aria-hidden", "true");
  document.body.classList.remove("popup-open");

  if (lastClickedGame) {
    lastClickedGame.focus({ preventScroll: true });
  }
}

/* GAME CARD CLICK */
gameCards.forEach((card) => {
  card.addEventListener("click", () => {
    const gameName = card.dataset.game;
    if (!gameName) return;

    openSupportPopup(gameName, card);
  });
});

/* CLOSE EVENTS */
if (popupClose) {
  popupClose.addEventListener("click", closeSupportPopup);
}

if (popupOverlay) {
  popupOverlay.addEventListener("click", closeSupportPopup);
}

/* ESCAPE KEY + FOCUS */
document.addEventListener("keydown", (event) => {
  if (!supportPopup || !supportPopup.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeSupportPopup();
  }

  if (event.key === "Tab") {
    const focusable = [
      popupClose,
      popupWhatsApp,
      popupTelegram
    ].filter(Boolean);

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

/* GAME LOGO FALLBACK */
document.querySelectorAll(".game-logo-box img").forEach((img) => {
  function handleImageError() {
    const box = img.closest(".game-logo-box");
    const card = img.closest(".game-card");

    if (!box || !card) return;
    if (box.querySelector(".game-logo-fallback")) return;

    img.style.display = "none";

    const fallback = document.createElement("div");
    fallback.className = "game-logo-fallback";
    fallback.textContent = (card.dataset.game || "?").charAt(0);

    box.appendChild(fallback);
  }

  img.addEventListener("error", handleImageError);

  if (img.complete && img.naturalWidth === 0) {
    handleImageError();
  }
});
