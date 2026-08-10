/* =========================================================
   UNIVERSAL JS - LENIS SCROLL & ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Navigation Toggle ---
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

    // --- 2. Dynamic Year Updater ---
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- 3. Dynamic Employment Duration Updater ---
    const employmentStartDate = new Date("2026-02-09");
    function calculateEmploymentDuration(startDate) {
        const today = new Date();
        let years = today.getFullYear() - startDate.getFullYear();
        let months = today.getMonth() - startDate.getMonth();
        let days = today.getDate() - startDate.getDate();

        if (days < 0) { months--; }
        if (months < 0) { years--; months += 12; }

        const parts = [];
        if (years > 0) { parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`); }
        if (months > 0) { parts.push(`${months} ${months === 1 ? "mo" : "mos"}`); }
        if (years === 0 && months === 0) { return "Less than 1 mo"; }
        return parts.join(" ");
    }
    const empDurationElement = document.getElementById("employment-duration");
    if (empDurationElement) {
        empDurationElement.textContent = calculateEmploymentDuration(employmentStartDate);
    }

    // --- 4. Lenis Fluid Smooth Scroll ---
    // Ensure Lenis script is loaded in HTML before this runs
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            lerp: 0.08, // Fluidity factor
            smoothWheel: true,
            wheelMultiplier: 1,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // --- 5. GPU Accelerated Scroll Reveals ---
    const revealElements = document.querySelectorAll(".framer-reveal");
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); 
                
                // Remove will-change to free up memory post-animation
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 1000);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
    
    // Fallback for elements immediately in viewport
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add("active");
                observer.unobserve(el);
            }
        });
    }, 100);

});
