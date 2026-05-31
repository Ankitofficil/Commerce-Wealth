/* Commerce Wealth — shared dashboard shell behaviour */
(function () {
  "use strict";

  // Sidebar panel switching
  const navLinks = document.querySelectorAll(".side-nav a[data-panel]");
  const panels = document.querySelectorAll(".panel");
  function show(id) {
    panels.forEach((p) => p.classList.toggle("active", p.id === "panel-" + id));
    navLinks.forEach((a) => a.classList.toggle("active", a.dataset.panel === id));
    document.querySelector(".sidebar")?.classList.remove("open");
    document.querySelector(".backdrop")?.classList.remove("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
    // notify page-specific code (e.g. to lazily draw charts)
    document.dispatchEvent(new CustomEvent("panelchange", { detail: id }));
  }
  navLinks.forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      show(a.dataset.panel);
    })
  );
  // expose for inline quick-links
  window.cwShowPanel = show;

  // Mobile sidebar toggle
  const menuBtn = document.querySelector(".menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const backdrop = document.querySelector(".backdrop");
  menuBtn?.addEventListener("click", () => {
    sidebar?.classList.add("open");
    backdrop?.classList.add("show");
  });
  backdrop?.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    backdrop?.classList.remove("show");
  });

  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // Responsive tables: copy each column's header onto its cells as data-label,
  // so CSS can render the table as stacked cards on phones. Tables are built
  // dynamically (and re-built on filter changes), so watch for changes.
  function labelTables(root) {
    (root || document).querySelectorAll("table.dtable, table.data").forEach((t) => {
      const heads = [...t.querySelectorAll("thead th")].map((th) => th.textContent.trim());
      if (!heads.length) return;
      t.classList.add("cards");
      t.querySelectorAll("tbody tr").forEach((tr) => {
        [...tr.children].forEach((td, i) => {
          if (heads[i] && !td.hasAttribute("data-label")) td.setAttribute("data-label", heads[i]);
        });
      });
    });
  }
  const content = document.querySelector(".dash-content");
  if (content) {
    const obs = new MutationObserver(() => { obs.disconnect(); labelTables(content); obs.observe(content, { childList: true, subtree: true }); });
    labelTables(content);
    obs.observe(content, { childList: true, subtree: true });
  }
})();
