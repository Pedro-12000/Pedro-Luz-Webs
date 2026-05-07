const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxOpen = document.querySelector("[data-lightbox-open]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxFrame = document.querySelector("[data-lightbox-frame]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const contactModal = document.querySelector("[data-contact-modal]");
const contactOpenButtons = document.querySelectorAll("[data-contact-open]");
const contactClose = document.querySelector("[data-contact-close]");
const demoModal = document.querySelector("[data-demo-modal]");
const demoClose = document.querySelector("[data-demo-close]");
const demoFrame = document.querySelector("[data-demo-frame]");
const demoModalTitle = document.querySelector("[data-demo-modal-title]");
const demoModalUrl = document.querySelector("[data-demo-modal-url]");
const demoCarousel = document.querySelector("[data-demo-carousel]");
const demoViewport = document.querySelector("[data-demo-viewport]");
const demoSlides = Array.from(document.querySelectorAll("[data-demo-slide]"));
const demoOpenButtons = document.querySelectorAll("[data-demo-open]");
const demoPrev = document.querySelector("[data-demo-prev]");
const demoNext = document.querySelector("[data-demo-next]");
const demoDots = Array.from(document.querySelectorAll("[data-demo-dot]"));
const demoCurrentLabel = document.querySelector("[data-demo-current-label]");
const demoCurrentCount = document.querySelector("[data-demo-current-count]");

let lightboxPreviousFocus = null;
let contactPreviousFocus = null;
let demoPreviousFocus = null;
let selectedDemoIndex = 0;
let demoAutoplayTimer = null;
let demoResumeTimer = null;
let demoIsHovering = false;
let demoPointerStartX = 0;
let demoPointerActive = false;

const isOpen = (element) => element && element.classList.contains("is-open");

if (navToggle && nav) {
  const closeMenu = () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
  };

  navToggle.addEventListener("click", () => {
    const menuIsOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", menuIsOpen);
    navToggle.setAttribute("aria-expanded", String(menuIsOpen));
    navToggle.setAttribute("aria-label", menuIsOpen ? "Cerrar menú" : "Abrir menú");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

if (lightbox && lightboxOpen && lightboxClose && lightboxImage) {
  const openLightbox = () => {
    const sourceImage = lightboxOpen.querySelector("img");

    if (!sourceImage) {
      return;
    }

    lightboxPreviousFocus = document.activeElement;
    lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
    lightboxImage.alt = sourceImage.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    if (lightboxPreviousFocus && typeof lightboxPreviousFocus.focus === "function") {
      lightboxPreviousFocus.focus();
    }
  };

  lightboxOpen.addEventListener("click", openLightbox);
  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target === lightboxFrame) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen(lightbox)) {
      closeLightbox();
    }
  });
}

if (contactModal && contactClose) {
  const openContactModal = (trigger) => {
    contactPreviousFocus = trigger || document.activeElement;
    contactModal.classList.add("is-open");
    contactModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    contactClose.focus();
  };

  const closeContactModal = () => {
    contactModal.classList.remove("is-open");
    contactModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (contactPreviousFocus && typeof contactPreviousFocus.focus === "function") {
      contactPreviousFocus.focus();
    }
  };

  contactOpenButtons.forEach((button) => {
    button.addEventListener("click", () => openContactModal(button));
  });

  contactClose.addEventListener("click", closeContactModal);

  contactModal.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      closeContactModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen(contactModal)) {
      closeContactModal();
      return;
    }

    if (!isOpen(contactModal) || event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements(contactModal);

    if (!focusableElements.length) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const DEMO_AUTOPLAY_DELAY = 7000;
const DEMO_RESUME_DELAY = 9000;

const wrapDemoIndex = (index) => {
  if (!demoSlides.length) {
    return 0;
  }

  return (index + demoSlides.length) % demoSlides.length;
};

const stopDemoAutoplay = () => {
  window.clearInterval(demoAutoplayTimer);
  demoAutoplayTimer = null;
};

const startDemoAutoplay = () => {
  if (prefersReducedMotion || !demoSlides.length || demoAutoplayTimer || demoIsHovering || isOpen(demoModal)) {
    return;
  }

  demoAutoplayTimer = window.setInterval(() => {
    updateDemoSlide(selectedDemoIndex + 1);
  }, DEMO_AUTOPLAY_DELAY);
};

const queueDemoAutoplayResume = (delay = DEMO_RESUME_DELAY) => {
  window.clearTimeout(demoResumeTimer);

  if (prefersReducedMotion) {
    return;
  }

  demoResumeTimer = window.setTimeout(() => {
    if (!demoIsHovering && !isOpen(demoModal)) {
      startDemoAutoplay();
    }
  }, delay);
};

const pauseDemoAfterInteraction = () => {
  stopDemoAutoplay();
  queueDemoAutoplayResume();
};

const getFocusableElements = (element) =>
  Array.from(
    element.querySelectorAll(
      'a[href], button:not([disabled]), iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((item) => item.offsetParent !== null || item === document.activeElement);

function updateDemoSlide(nextIndex, options = {}) {
  if (!demoSlides.length) {
    return;
  }

  selectedDemoIndex = wrapDemoIndex(nextIndex);
  const previousIndex = wrapDemoIndex(selectedDemoIndex - 1);
  const followingIndex = wrapDemoIndex(selectedDemoIndex + 1);

  demoSlides.forEach((slide, index) => {
    const isActive = index === selectedDemoIndex;
    const isPrevious = index === previousIndex;
    const isNext = index === followingIndex;
    const slideButton = slide.querySelector("[data-demo-open]");
    const status = slide.dataset.demoStatus || "Demo disponible";
    const type = slide.dataset.demoType || "Demo";
    const title = slide.dataset.demoTitle || type;

    slide.classList.toggle("is-active", isActive);
    slide.classList.toggle("is-prev", isPrevious);
    slide.classList.toggle("is-next", isNext);
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.setAttribute("aria-label", `${type}. ${title}. ${status}. ${index + 1} de ${demoSlides.length}.`);

    if (slideButton) {
      slideButton.tabIndex = isActive && !slideButton.disabled ? 0 : -1;
    }
  });

  const activeSlide = demoSlides[selectedDemoIndex];

  if (demoCurrentLabel && activeSlide) {
    demoCurrentLabel.textContent = activeSlide.dataset.demoType || activeSlide.dataset.demoTitle || "Demo";
  }

  if (demoCurrentCount) {
    demoCurrentCount.textContent = `${selectedDemoIndex + 1} / ${demoSlides.length}`;
  }

  demoDots.forEach((dot, index) => {
    const isActive = index === selectedDemoIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });

  if (options.userInitiated) {
    pauseDemoAfterInteraction();
  }
}

if (demoCarousel && demoSlides.length) {
  updateDemoSlide(selectedDemoIndex);

  if (demoPrev) {
    demoPrev.addEventListener("click", () => {
      updateDemoSlide(selectedDemoIndex - 1, { userInitiated: true });
    });
  }

  if (demoNext) {
    demoNext.addEventListener("click", () => {
      updateDemoSlide(selectedDemoIndex + 1, { userInitiated: true });
    });
  }

  demoDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateDemoSlide(index, { userInitiated: true });
    });
  });

  demoCarousel.addEventListener("mouseenter", () => {
    demoIsHovering = true;
    stopDemoAutoplay();
  });

  demoCarousel.addEventListener("mouseleave", () => {
    demoIsHovering = false;
    queueDemoAutoplayResume(1400);
  });

  demoCarousel.addEventListener("click", (event) => {
    if (!event.target.closest("[data-demo-open], [data-demo-prev], [data-demo-next]")) {
      pauseDemoAfterInteraction();
    }
  });

  if (demoViewport) {
    demoViewport.addEventListener("pointerdown", (event) => {
      demoPointerStartX = event.clientX;
      demoPointerActive = true;
      pauseDemoAfterInteraction();
    });

    demoViewport.addEventListener("pointerup", (event) => {
      if (!demoPointerActive) {
        return;
      }

      const distance = event.clientX - demoPointerStartX;
      demoPointerActive = false;

      if (Math.abs(distance) > 48) {
        updateDemoSlide(selectedDemoIndex + (distance < 0 ? 1 : -1), { userInitiated: true });
      }
    });

    demoViewport.addEventListener("pointercancel", () => {
      demoPointerActive = false;
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopDemoAutoplay();
    } else {
      queueDemoAutoplayResume(1400);
    }
  });

  startDemoAutoplay();
}

if (demoModal && demoClose && demoFrame) {
  const openDemoModal = (trigger) => {
    const activeSlide = demoSlides[selectedDemoIndex];

    if (!activeSlide || activeSlide.dataset.demoAvailable !== "true" || !activeSlide.dataset.demoUrl) {
      return;
    }

    stopDemoAutoplay();
    demoPreviousFocus = trigger || document.activeElement;
    demoModal.classList.add("is-open");
    demoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    demoFrame.src = activeSlide.dataset.demoUrl;
    demoFrame.title = `Demo ${activeSlide.dataset.demoTitle || "web local"}`;

    if (demoModalTitle) {
      demoModalTitle.textContent = activeSlide.dataset.demoTitle || "Demo";
    }

    if (demoModalUrl) {
      demoModalUrl.textContent = activeSlide.dataset.demoBrowserUrl || "demo.local";
    }

    window.requestAnimationFrame(() => demoClose.focus());
  };

  const closeDemoModal = () => {
    demoModal.classList.remove("is-open");
    demoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    demoFrame.removeAttribute("src");

    if (demoPreviousFocus && typeof demoPreviousFocus.focus === "function") {
      demoPreviousFocus.focus();
    }

    queueDemoAutoplayResume(2200);
  };

  demoOpenButtons.forEach((button) => {
    button.addEventListener("click", () => openDemoModal(button));
  });

  demoClose.addEventListener("click", closeDemoModal);

  demoModal.addEventListener("click", (event) => {
    if (event.target === demoModal) {
      closeDemoModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen(demoModal)) {
      return;
    }

    if (event.key === "Escape") {
      closeDemoModal();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements(demoModal);

    if (!focusableElements.length) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    const headerOffset = header ? header.offsetHeight + 16 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  });
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
