(function () {
  const config = window.DEFI_SITE_CONFIG || {};

  document.querySelectorAll("[data-config]").forEach((node) => {
    const key = node.getAttribute("data-config");
    if (config[key]) node.textContent = config[key];
  });

  document.querySelectorAll("[data-link]").forEach((node) => {
    const key = node.getAttribute("data-link");
    if (config[key]) node.setAttribute("href", config[key]);
  });

  const bannerButton = document.querySelector(".banner-toggle");
  const bannerDetails = document.querySelector("#banner-details");
  if (bannerButton && bannerDetails) {
    bannerButton.addEventListener("click", () => {
      const expanded = bannerButton.getAttribute("aria-expanded") === "true";
      bannerButton.setAttribute("aria-expanded", String(!expanded));
      bannerDetails.hidden = expanded;
    });
  }

  const tabs = Array.from(document.querySelectorAll("[role='tab']"));
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        const panel = document.getElementById(item.getAttribute("aria-controls"));
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        if (panel) {
          panel.hidden = !selected;
          panel.classList.toggle("active", selected);
        }
      });
    });
  });

  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector("#site-search");
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;
      const candidates = Array.from(document.querySelectorAll("main section[id], main article[id]"));
      const match = candidates.find((section) => section.textContent.toLowerCase().includes(query));
      if (match) {
        match.scrollIntoView({ behavior: "smooth", block: "start" });
        match.setAttribute("tabindex", "-1");
        match.focus({ preventScroll: true });
      }
    });
  }

  const copyButton = document.querySelector("#copy-rpc");
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const rpc = config.rpcUrl || "wss://api.defishares.org/ws/";
      try {
        await navigator.clipboard.writeText(rpc);
        copyButton.textContent = "Copied";
        window.setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 1600);
      } catch (error) {
        copyButton.textContent = "Copy failed";
      }
    });
  }
})();
