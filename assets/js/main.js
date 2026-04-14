// Inject mobile-nav styles (pages use Tailwind CDN, not styles.css)
const mobileNavStyles = document.createElement('style');
mobileNavStyles.textContent = `
.mobile-nav{display:none;flex-direction:column;gap:0;padding:0 1.5rem 1.5rem;border-top:1px solid rgba(255,255,255,.05);background:rgba(9,9,11,.97);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px)}
.mobile-nav.open{display:flex}
.mobile-nav a{display:block;padding:.85rem 0;font-size:1rem;font-weight:600;color:#a1a1aa;border-bottom:1px solid rgba(255,255,255,.04);transition:color .2s}
.mobile-nav a:hover,.mobile-nav a.active-link{color:#cc97ff}
.mobile-nav a:last-child{border-bottom:none}
.mobile-nav .mobile-lang{display:flex;align-items:center;gap:.5rem;padding-top:1rem;margin-top:.5rem;border-top:1px solid rgba(255,255,255,.08);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
.mobile-nav .mobile-lang a{display:inline;padding:0;border-bottom:none;font-size:.75rem}
.mobile-nav .mobile-lang span{color:#52525b}
.hamburger-line{display:block;width:20px;height:2px;background:#fff;border-radius:2px;transition:transform .3s,opacity .3s}
[data-menu-btn][aria-expanded="true"] .hamburger-line:nth-child(1){transform:translateY(8px) rotate(45deg)}
[data-menu-btn][aria-expanded="true"] .hamburger-line:nth-child(2){opacity:0}
[data-menu-btn][aria-expanded="true"] .hamburger-line:nth-child(3){transform:translateY(-8px) rotate(-45deg)}
`;
document.head.appendChild(mobileNavStyles);

(() => {
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
  const uiText = isEnglish
    ? {
        nameError: "Please add your full name.",
        emailError: "Please check your email format.",
        phoneError: "Please include country or area code.",
        success: "Thanks, we got your request. We will reply within 24 business hours."
      }
    : {
        nameError: "Por favor, agrega tu nombre completo.",
        emailError: "Revisa el formato del email.",
        phoneError: "Inclui codigo de area o pais.",
        success: "Gracias, recibimos tu solicitud. Te respondemos en menos de 24 horas habiles."
      };

  const menuBtn = document.querySelector("[data-menu-btn]");
  const nav = document.querySelector("[data-nav]");

  if (menuBtn && nav) {
    const closeMenu = () => {
      menuBtn.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    };

    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-nav]") || target.closest("[data-menu-btn]")) return;
      closeMenu();
    });
  }

  const faqs = document.querySelectorAll(".faq-item");
  faqs.forEach((item) => {
    const button = item.querySelector(".faq-button");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      faqs.forEach((entry) => {
        if (entry !== item) {
          entry.classList.remove("open");
          const b = entry.querySelector(".faq-button");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  const forms = document.querySelectorAll("[data-validate-form]");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = form.querySelector('[name="nombre"]');
      const emailInput = form.querySelector('[name="email"]');
      const phoneInput = form.querySelector('[name="telefono"]');
      const messageBox = form.querySelector("[data-form-message]");

      const errors = [];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9+()\-\s]{8,}$/;

      if (nameInput && nameInput.value.trim().length < 2) errors.push(uiText.nameError);
      if (emailInput && !emailRegex.test(emailInput.value.trim())) errors.push(uiText.emailError);
      if (phoneInput && phoneInput.value.trim() && !phoneRegex.test(phoneInput.value.trim())) errors.push(uiText.phoneError);
      if (!messageBox) return;

      if (errors.length > 0) {
        messageBox.className = "alert error";
        messageBox.textContent = errors[0];
        return;
      }

      messageBox.className = "alert ok";
      messageBox.textContent = uiText.success;
      form.reset();
    });
  });

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 45, 360)}ms`;
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }
})();
