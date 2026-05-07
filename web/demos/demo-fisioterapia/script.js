const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-demo-form]");
const formStatus = document.querySelector("[data-form-status]");
const demoActions = document.querySelectorAll("[data-demo-action]");
const demoToast = document.querySelector("[data-demo-toast]");

let demoToastTimer = null;

const showDemoNotice = (
  message = "Esto es una demo. En una web real este botón estaría conectado al WhatsApp, teléfono, email o sistema de reservas del negocio."
) => {
  if (!demoToast) {
    return;
  }

  window.clearTimeout(demoToastTimer);
  demoToast.textContent = message;
  demoToast.classList.add("is-visible");

  demoToastTimer = window.setTimeout(() => {
    demoToast.classList.remove("is-visible");
  }, 5200);
};

if (navToggle && nav) {
  const closeMenu = () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

demoActions.forEach((button) => {
  button.addEventListener("click", () => showDemoNotice());
});

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
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

if (form) {
  const showError = (field, message) => {
    const wrapper = field.closest(".form-field");
    const error = wrapper ? wrapper.querySelector(".field-error") : null;

    if (wrapper) {
      wrapper.classList.add("is-invalid");
    }

    field.setAttribute("aria-invalid", "true");

    if (error) {
      error.textContent = message;
    }
  };

  const clearError = (field) => {
    const wrapper = field.closest(".form-field");
    const error = wrapper ? wrapper.querySelector(".field-error") : null;

    if (wrapper) {
      wrapper.classList.remove("is-invalid");
    }

    field.removeAttribute("aria-invalid");

    if (error) {
      error.textContent = "";
    }
  };

  const fields = Array.from(form.querySelectorAll("input, textarea"));

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.value.trim()) {
        clearError(field);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstInvalid = null;

    fields.forEach((field) => {
      if (!field.value.trim()) {
        showError(field, "Completa este campo para continuar.");
        firstInvalid = firstInvalid || field;
      } else {
        clearError(field);
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();

      if (formStatus) {
        formStatus.textContent = "Revisa los campos marcados.";
      }

      return;
    }

    if (formStatus) {
      formStatus.textContent = "Consulta recibida en modo demo. En una web real se enviaría al canal elegido por el centro.";
    }

    showDemoNotice("Consulta recibida en modo demo. En una web real se enviaría al canal elegido por el centro.");
    form.reset();
  });
}

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
