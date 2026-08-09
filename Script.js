/* Mobile navigation */

      const menuToggle = document.querySelector(".menu-toggle");

      const mainNav = document.querySelector(".main-nav");

      menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));

        mainNav.classList.toggle("is-open");
      });

      mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          menuToggle.setAttribute("aria-expanded", "false");

          mainNav.classList.remove("is-open");
        });
      });

      /* Current year */

      document.getElementById("year").textContent = new Date().getFullYear();

      /* Employment duration */

      /*
       * Replace this date with your
       * actual UniQual iTech joining date.
       */

      const employmentStartDate = new Date("2026-02-09");

      function calculateEmploymentDuration(startDate) {
        const today = new Date();

        let years = today.getFullYear() - startDate.getFullYear();

        let months = today.getMonth() - startDate.getMonth();

        let days = today.getDate() - startDate.getDate();

        if (days < 0) {
          months--;
        }

        if (months < 0) {
          years--;

          months += 12;
        }

        const parts = [];

        if (years > 0) {
          parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
        }

        if (months > 0) {
          parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
        }

        if (years === 0 && months === 0) {
          return "Less than 1 mo";
        }

        return parts.join(" ");
      }

      document.getElementById("employment-duration").textContent =
        calculateEmploymentDuration(employmentStartDate);

        /* --- Optimized Lenis Smooth Scroll --- */
    const lenis = new Lenis({
      lerp: 0.08, // 0 to 1 ke beech. Ye scroll ko fluid aur natural banata hai bina lag ke.
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* --- Scroll Reveal Animations (GPU Accelerated) --- */
    document.addEventListener("DOMContentLoaded", () => {
      const revealElements = document.querySelectorAll(".framer-reveal");
      
      const observerOptions = {
          threshold: 0.1, // Thoda jaldi trigger karega
          rootMargin: "0px 0px -20px 0px"
      };

      const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  // Class add karne ke baad will-change hata dein taaki memory free ho jaye
                  entry.target.classList.add("active");
                  observer.unobserve(entry.target); 
                  
                  setTimeout(() => {
                      entry.target.style.willChange = 'auto';
                  }, 1000);
              }
          });
      }, observerOptions);

      revealElements.forEach(el => observer.observe(el));
      
      // Initial load fix
      setTimeout(() => {
          revealElements.forEach(el => {
              const rect = el.getBoundingClientRect();
              if (rect.top < window.innerHeight) {
                  el.classList.add("active");
                  observer.unobserve(el);
              }
          });
      }, 50);
    });