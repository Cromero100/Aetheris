// Selección de elementos
const header = document.getElementById("header");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const fadeElements = document.querySelectorAll(".fade-in");
const contactForm = document.getElementById("contactForm");

// Menú móvil
mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});

// Cambio de estilo del header al hacer scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }

  // Animación de elementos al hacer scroll
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("visible");
    }
  });
});

// Iniciar animaciones para elementos visibles al cargar la página
window.addEventListener("load", () => {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("visible");
    }
  });
});

// Navegación suave al hacer clic en los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Manejar envío del formulario
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const project = document.getElementById("project").value;
    const message = document.getElementById("message").value;

    // Aquí normalmente enviarías los datos a un servidor
    // Por ahora, solo mostraremos un mensaje de éxito

    // Simular envío
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    setTimeout(() => {
      // Crear mensaje de éxito
      const successMessage = document.createElement("div");
      successMessage.className = "alert-success";
      successMessage.style.backgroundColor = "#d1fae5";
      successMessage.style.color = "#065f46";
      successMessage.style.padding = "1rem";
      successMessage.style.borderRadius = "5px";
      successMessage.style.marginTop = "1rem";
      successMessage.textContent =
        "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.";

      // Insertar mensaje después del formulario
      this.appendChild(successMessage);

      // Resetear formulario
      this.reset();

      // Restaurar botón
      submitButton.disabled = false;
      submitButton.textContent = originalText;

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        successMessage.style.opacity = "0";
        successMessage.style.transition = "opacity 0.5s ease";

        setTimeout(() => {
          successMessage.remove();
        }, 500);
      }, 5000);
    }, 1500);
  });
}

// Añadir animación al botón de solicitar cotización
const ctaButtons = document.querySelectorAll(".btn");
ctaButtons.forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px)";
    this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
    this.style.transition = "all 0.3s ease";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "none";
  });
});

// Animación para tarjetas de servicios
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
    this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
    this.style.borderBottomColor = "#2563eb";
    this.style.transition = "all 0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.05)";
    this.style.borderBottomColor = "transparent";
  });
});

// Detectar cuando las secciones entran en el viewport para resaltar enlace de navegación activo
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-links a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav-links a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.querySelectorAll(".indicator");

  let currentSlide = 0;
  const totalSlides = 5;

  function updateCarousel() {
    const translateX = -currentSlide * 20; // 20% por slide
    track.style.transform = `translateX(${translateX}%)`;

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  // Auto-play (opcional)
  let autoPlayInterval = setInterval(nextSlide, 5000);

  // Pausar auto-play al hacer hover
  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoPlayInterval);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
  });

  // Soporte para touch/swipe en móviles
  let startX = 0;
  let endX = 0;

  carouselContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carouselContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
});
