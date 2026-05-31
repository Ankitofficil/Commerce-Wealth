/* Commerce Wealth — shared site JS (public pages) */
(function () {
  "use strict";

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }

  // Highlight active nav link by filename
  const page = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) a.classList.add("active");
  });

  // FAQ accordion
  document.querySelectorAll(".faq-q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      const a = item.querySelector(".faq-a");
      const open = item.classList.toggle("open");
      a.style.maxHeight = open ? a.scrollHeight + "px" : null;
    });
  });

  // Generic demo forms — show success, don't actually submit
  document.querySelectorAll("form[data-demo]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector(".form-success");
      if (note) {
        note.classList.add("show");
        note.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Responsive tables: stamp each cell with its column header (data-label) so
  // CSS can present wide tables as stacked cards on phones.
  document.querySelectorAll("table.data").forEach((t) => {
    const heads = [...t.querySelectorAll("thead th")].map((th) => th.textContent.trim());
    if (!heads.length) return;
    t.classList.add("cards");
    t.querySelectorAll("tbody tr").forEach((tr) => {
      [...tr.children].forEach((td, i) => {
        if (heads[i]) td.setAttribute("data-label", heads[i]);
      });
    });
  });

  // ----- Animations -----
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal: fade/rise sections and card grids into view.
  // Tag elements automatically so the HTML stays clean.
  const revealSel = [
    ".section-head",
    ".grid",
    ".cta-banner",
    ".table-wrap",
    ".founder",
    ".testimonial",
    ".faq-item",
  ];
  const groups = new Set([".grid"]); // children get staggered
  document.querySelectorAll(revealSel.join(",")).forEach((el) => {
    if (el.closest(".hero")) return; // hero has its own load animation
    el.setAttribute("data-reveal", "");
    if (groups.has(".grid") && el.classList.contains("grid")) {
      el.setAttribute("data-reveal-group", "");
    }
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
  }

  // Count-up: animate numbers like "500+", "90+", "100%" when they scroll in.
  function countUp(el) {
    const raw = el.textContent.trim();
    const m = raw.match(/^(\d[\d,]*)(.*)$/); // leading number + suffix (+, %, etc.)
    if (!m) return; // skip ranges like "15–20"
    const target = parseInt(m[1].replace(/,/g, ""), 10);
    const suffix = m[2];
    if (!target || target > 100000) return;
    const dur = 1100;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const numbers = document.querySelectorAll(".hero-stat .num, [data-count]");
  if (!reduceMotion && numbers.length && "IntersectionObserver" in window) {
    const numIO = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            countUp(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    numbers.forEach((n) => numIO.observe(n));
  }
})();
