/* =========================================================
   ROHIT BHARADVA — PORTFOLIO
   Shared interactions: smooth scroll, reveal, magnetism
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Mobile nav ---------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (menuToggle && mainNav) {
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
  }

  /* ---------- 2. Highlight current nav link ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href").split("#")[0];
    if (href && href === here) link.classList.add("is-current");
  });

  /* ---------- 3. Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 4. Live tenure counter (since Feb 2026) ---------- */
  const tenureEls = document.querySelectorAll("[data-tenure-since]");
  tenureEls.forEach((el) => {
    const start = new Date(el.getAttribute("data-tenure-since"));
    const today = new Date();
    let months = (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth());
    if (today.getDate() < start.getDate()) months--;
    if (months < 1) {
      el.textContent = "Just started";
    } else if (months < 12) {
      el.textContent = `${months} mo${months === 1 ? "" : "s"} in the role`;
    } else {
      const y = Math.floor(months / 12);
      const m = months % 12;
      el.textContent = `${y} yr${y === 1 ? "" : "s"}${m ? " " + m + " mo" : ""} in the role`;
    }
  });

  /* ---------- 5. Lenis smooth scroll ---------- */
  if (typeof Lenis !== "undefined" && !reduceMotion) {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.__lenis = lenis;
  }

  /* ---------- 6. Scroll progress bar ---------- */
  const bar = document.querySelector(".scroll-progress");
  if (bar) {
    const updateBar = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      bar.style.width = height > 0 ? `${(scrolled / height) * 100}%` : "0%";
    };
    document.addEventListener("scroll", updateBar, { passive: true });
    updateBar();
  }

  /* ---------- 7. Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- 8. Inspector frame in-view state (mobile/no-hover) ---------- */
  const inspectors = document.querySelectorAll(".inspector");
  if (inspectors.length && !reduceMotion) {
    const ioInspect = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-visible"), 250);
          }
        });
      },
      { threshold: 0.5 }
    );
    inspectors.forEach((el) => ioInspect.observe(el));
  }

  /* ---------- 10. Magnetic buttons ---------- */
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0,0)";
      });
    });
  }
});
