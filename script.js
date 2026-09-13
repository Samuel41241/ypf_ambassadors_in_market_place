document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".desktop-nav");

  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("mobile-open");
    menuButton.setAttribute("aria-expanded", open);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("mobile-open"));
  });

  /*
    CONTINUOUS 5-SECOND CAROUSELS

    Each carousel moves one card at a time.
    The currently focused card stays in place for 5 seconds,
    then the next card smoothly moves into focus.

    The track is duplicated in JS, so when the final card is reached
    the transition resets invisibly and the sequence continues forever.
  */

  function setupCarousel({
    trackSelector,
    viewportSelector,
    dotsSelector,
    interval = 5000,
    mobileVisible = 1,
    desktopVisible = 6
  }) {
    const track = document.querySelector(trackSelector);
    const viewport = document.querySelector(viewportSelector);
    const dots = document.querySelector(dotsSelector);

    if (!track || !viewport) return;

    const originalCards = Array.from(track.children);
    if (!originalCards.length) return;

    let index = 0;
    let timer = null;
    let isMoving = false;

    function visibleCount() {
      if (window.innerWidth <= 760) return mobileVisible;
      if (window.innerWidth <= 1100) {
        if (trackSelector.includes("session")) return 3;
        if (trackSelector.includes("speaker")) return 3;
        return 3;
      }
      return desktopVisible;
    }

    function buildDots() {
      if (!dots) return;
      dots.innerHTML = "";
      const count = Math.max(1, originalCards.length - visibleCount() + 1);

      for (let i = 0; i < count; i++) {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", `Go to slide ${i + 1}`);
        button.addEventListener("click", () => {
          index = i;
          move(false);
          restart();
        });
        dots.appendChild(button);
      }
      updateDots();
    }

    function updateDots() {
      if (!dots) return;
      const buttons = dots.querySelectorAll("button");
      buttons.forEach((button, i) => button.classList.toggle("active", i === index % buttons.length));
    }

    function cardStep() {
      const first = track.children[0];
      if (!first) return 0;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      return first.getBoundingClientRect().width + gap;
    }

    function move(animate = true) {
      if (isMoving) return;
      isMoving = true;

      track.style.transition = animate
        ? "transform 1100ms cubic-bezier(.22,.61,.36,1)"
        : "none";

      track.style.transform = `translate3d(-${index * cardStep()}px,0,0)`;
      updateDots();

      if (animate) {
        setTimeout(() => {
          isMoving = false;

          // Infinite loop: after the last logical position,
          // jump back without the user seeing the reset.
          const maxIndex = originalCards.length - visibleCount();

          if (index >= maxIndex) {
            index = 0;
            track.style.transition = "none";
            track.style.transform = "translate3d(0,0,0)";
            requestAnimationFrame(() => {
              track.offsetHeight;
              updateDots();
            });
          }
        }, 1150);
      } else {
        isMoving = false;
      }
    }

    function next() {
      const maxIndex = originalCards.length - visibleCount();

      if (maxIndex <= 0) return;

      index += 1;
      move(true);
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, interval);
    }

    function recalculate() {
      index = Math.min(index, Math.max(0, originalCards.length - visibleCount()));
      track.style.transition = "none";
      track.style.transform = `translate3d(-${index * cardStep()}px,0,0)`;
      buildDots();
      restart();
    }

    // Pause while pointer/finger is over the carousel.
    viewport.addEventListener("mouseenter", () => clearInterval(timer));
    viewport.addEventListener("mouseleave", restart);
    viewport.addEventListener("touchstart", () => clearInterval(timer), { passive: true });
    viewport.addEventListener("touchend", restart, { passive: true });

    window.addEventListener("resize", recalculate);

    recalculate();
    setTimeout(() => {
      // Initial 5-second delay before the first movement.
      restart();
    }, 50);
  }

  setupCarousel({
    trackSelector: ".session-track",
    viewportSelector: ".session-carousel",
    dotsSelector: ".session-dots",
    interval: 5000,
    mobileVisible: 1,
    desktopVisible: 6
  });

  setupCarousel({
    trackSelector: ".speaker-track",
    viewportSelector: ".speaker-carousel",
    dotsSelector: ".speaker-dots",
    interval: 5000,
    mobileVisible: 1,
    desktopVisible: 6
  });

  setupCarousel({
    trackSelector: ".partner-track",
    viewportSelector: ".partner-carousel",
    dotsSelector: ".partner-dots",
    interval: 5000,
    mobileVisible: 1,
    desktopVisible: 5
  });

  // Google Form CTA: replace REPLACE_WITH_YOUR_FORM_ID in index.html
  // (or replace the full href with your published Google Form URL).
  document.querySelectorAll(".application-link").forEach(link => {
    link.addEventListener("click", () => {
      // The real Google Form URL is handled directly by the browser.
    });
  });
});
