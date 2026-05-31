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
})();
