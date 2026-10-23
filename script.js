/* ==========================================
   SVIP OFFICIAL WEBSITE
========================================== */


/* ==========================================
   OFFICIAL LINKS
========================================== */

/* GROUP CHANNEL */

const whatsappChannelLink =
  "https://supervip.wasap.my";

const telegramChannelLink =
  "https://t.me/SvipTrust";


/* CUSTOMER SERVICE */

const customerServiceWhatsApp =
  "https://supervip.wasap.my";

const customerServiceTelegram =
  "https://t.me/Svip_808_Cs";



/* ==========================================
   GROUP CHANNEL LINKS
========================================== */

const whatsappChannel =
  document.getElementById(
    "whatsappChannel"
  );


const telegramChannel =
  document.getElementById(
    "telegramChannel"
  );


if (whatsappChannel) {

  whatsappChannel.href =
    whatsappChannelLink;

}


if (telegramChannel) {

  telegramChannel.href =
    telegramChannelLink;

}



/* ==========================================
   YEAR
========================================== */

const year =
  document.getElementById(
    "year"
  );


if (year) {

  year.textContent =
    new Date().getFullYear();

}



/* ==========================================
   PARTICLES
========================================== */

const particlesContainer =
  document.getElementById(
    "particles"
  );


function createParticles() {

  if (!particlesContainer) {
    return;
  }


  const totalParticles = 20;


  for (
    let i = 0;
    i < totalParticles;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );


    particle.classList.add(
      "particle"
    );


    const size =
      Math.random() * 2 + 1;


    particle.style.width =
      `${size}px`;


    particle.style.height =
      `${size}px`;


    particle.style.left =
      `${Math.random() * 100}%`;


    particle.style.animationDuration =
      `${Math.random() * 12 + 12}s`;


    particle.style.animationDelay =
      `${Math.random() * 12}s`;


    particlesContainer.appendChild(
      particle
    );

  }

}


createParticles();



/* ==========================================
   SCROLL REVEAL
========================================== */

const revealItems =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target
                .classList.add(
                  "show"
                );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: 0.10
      }

    );


  revealItems.forEach(
    (item) => {

      observer.observe(
        item
      );

    }
  );

} else {

  revealItems.forEach(
    (item) => {

      item.classList.add(
        "show"
      );

    }
  );

}



/* ==========================================
   HEADER EFFECT
========================================== */

const header =
  document.querySelector(
    ".top-header"
  );


function updateHeader() {

  if (!header) {
    return;
  }


  if (
    window.scrollY > 25
  ) {

    header.classList.add(
      "scrolled"
    );

  } else {

    header.classList.remove(
      "scrolled"
    );

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


updateHeader();



/* ==========================================
   POPUP ELEMENTS
========================================== */

const supportPopup =
  document.getElementById(
    "supportPopup"
  );


const popupClose =
  document.getElementById(
    "popupClose"
  );


const popupOverlay =
  document.getElementById(
    "popupOverlay"
  );


const popupTitle =
  document.getElementById(
    "popupTitle"
  );


const popupDescription =
  document.getElementById(
    "popupDescription"
  );


const popupWhatsApp =
  document.getElementById(
    "popupWhatsApp"
  );


const popupTelegram =
  document.getElementById(
    "popupTelegram"
  );


const gameCards =
  document.querySelectorAll(
    ".game-card"
  );


let lastClickedGame = null;



/* ==========================================
   OPEN POPUP
========================================== */

function openSupportPopup(
  gameName,
  clickedCard
) {

  if (!supportPopup) {
    return;
  }


  lastClickedGame =
    clickedCard || null;


  /* TITLE */

  if (popupTitle) {

    popupTitle.textContent =
      `${gameName} Support`;

  }


  /* DESCRIPTION */

  if (popupDescription) {

    popupDescription.textContent =
      `Pilih WhatsApp atau Telegram untuk bertanya mengenai ${gameName}.`;

  }


  /* WHATSAPP */

  if (popupWhatsApp) {

    popupWhatsApp.href =
      customerServiceWhatsApp;

  }


  /* TELEGRAM */

  if (popupTelegram) {

    popupTelegram.href =
      customerServiceTelegram;

  }


  /* SHOW POPUP */

  supportPopup.classList.add(
    "active"
  );


  supportPopup.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "popup-open"
  );


  setTimeout(
    () => {

      if (popupClose) {

        popupClose.focus();

      }

    },
    120
  );

}



/* ==========================================
   CLOSE POPUP
========================================== */

function closeSupportPopup() {

  if (!supportPopup) {
    return;
  }


  supportPopup.classList.remove(
    "active"
  );


  supportPopup.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "popup-open"
  );


  if (lastClickedGame) {

    setTimeout(
      () => {

        lastClickedGame.focus();

      },
      100
    );

  }

}



/* ==========================================
   CLICK GAME
========================================== */

gameCards.forEach(
  (gameCard) => {

    gameCard.addEventListener(
      "click",
      () => {

        const gameName =
          gameCard.dataset.game;


        if (!gameName) {
          return;
        }


        openSupportPopup(
          gameName,
          gameCard
        );

      }
    );

  }
);



/* ==========================================
   CLOSE BUTTON
========================================== */

if (popupClose) {

  popupClose.addEventListener(
    "click",
    closeSupportPopup
  );

}



/* ==========================================
   CLICK OUTSIDE POPUP
========================================== */

if (popupOverlay) {

  popupOverlay.addEventListener(
    "click",
    closeSupportPopup
  );

}



/* ==========================================
   ESC TO CLOSE
========================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      supportPopup &&
      supportPopup.classList.contains(
        "active"
      )
    ) {

      closeSupportPopup();

    }

  }
);



/* ==========================================
   GAME IMAGE FALLBACK
========================================== */

const gameImages =
  document.querySelectorAll(
    ".game-logo-img"
  );


gameImages.forEach(
  (image) => {

    image.addEventListener(
      "error",
      () => {

        const logoBox =
          image.closest(
            ".game-logo-box"
          );


        const gameCard =
          image.closest(
            ".game-card"
          );


        if (
          !logoBox ||
          !gameCard
        ) {
          return;
        }


        image.style.display =
          "none";


        if (
          logoBox.querySelector(
            ".game-logo-fallback"
          )
        ) {
          return;
        }


        const fallback =
          document.createElement(
            "div"
          );


        fallback.className =
          "game-logo-fallback";


        const gameName =
          gameCard.dataset.game || "?";


        fallback.textContent =
          gameName.charAt(0);


        logoBox.appendChild(
          fallback
        );

      }
    );

  }
);