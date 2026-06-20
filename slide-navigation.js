(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shell = document.querySelector("[data-page-shell]");
  if (!shell) return;

  function go(href, direction) {
    if (reduceMotion) {
      window.location.href = href;
      return;
    }
    document.body.classList.remove("slide-out-left", "slide-out-right", "slide-in");
    document.body.classList.add(direction === "right" ? "slide-out-right" : "slide-out-left");
    window.setTimeout(() => {
      window.location.href = href;
    }, 220);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a.slide-link");
    if (!link) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank" || link.hasAttribute("download")) {
      return;
    }
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    event.preventDefault();
    go(url.href, link.dataset.slide === "right" ? "right" : "left");
  }, true);

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("slide-out-left", "slide-out-right");
    if (!reduceMotion) {
      document.body.classList.add("slide-in");
      window.requestAnimationFrame(() => document.body.classList.remove("slide-in"));
    }
  });
})();