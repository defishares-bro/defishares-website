(function () {
  const config = window.DEFI_SITE_CONFIG || {};
  const supportedLanguages = config.supportedLanguages || ["en", "zh"];
  const params = new URLSearchParams(window.location.search);
  const requestedLanguage = params.get("lang") || localStorage.getItem("defishares-lang") || config.defaultLanguage || "en";
  const currentLanguage = supportedLanguages.includes(requestedLanguage) ? requestedLanguage : "en";
  localStorage.setItem("defishares-lang", currentLanguage);
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";

  const translations = {
    en: {
      portal: "DefiShares official information portal",
      how: "Here's how you know",
      banner:
        "Use links from this website to access the official wallet, explorer, documents, and community channels. DefiShares will never ask for your private key, seed phrase, or wallet password.",
      networkStatus: "Network Status",
      airdrop: "Airdrop",
      publications: "Publications",
      contact: "Contact",
      search: "Search",
      mastheadTitle: "DefiShares Asset Network",
      tagline: "A Graphene-based DeFi asset network with DFS as the core asset and GOLD as the protocol pricing anchor.",
      navAbout: "About",
      navFeatures: "Features",
      navGold: "GOLD Model",
      navWallet: "Wallet",
      navExplorer: "Explorer",
      navAirdrop: "Airdrop",
      navDevelopers: "Developers",
      navDocuments: "Documents",
      footerPortal: "DefiShares Official Information Portal",
      developer: "Developer",
      riskNotice: "Risk Notice",
      coreAsset: "Core Asset",
      defaultMarket: "Default Market",
      blockInterval: "Block Interval",
      officialProjectOverview: "Official Project Overview",
      heroTitle: "DFS-backed assets, GOLD-centered pricing, and official access to the DefiShares ecosystem.",
      heroBody:
        "DefiShares is an independent blockchain forked from the BitShares / Graphene technology stack. It provides a public gateway for wallet access, chain data, project documents, airdrop information, and technical references around DFS and DefiShares-managed smart assets.",
      openWebWallet: "Open Web Wallet",
      viewExplorer: "View Explorer",
      aboutDefishares: "About DefiShares",
      atAGlance: "At a glance",
      addressPrefix: "Address Prefix",
      publicRpc: "Public RPC",
      updated: "Updated"
    },
    zh: {
      portal: "DefiShares 官方信息门户",
      how: "如何确认官方来源",
      banner:
        "请通过本站链接访问官方钱包、浏览器、文档和社区渠道。DefiShares 永远不会索要你的私钥、助记词或钱包密码。",
      networkStatus: "网络状态",
      airdrop: "空投",
      publications: "文档发布",
      contact: "联系",
      search: "搜索",
      mastheadTitle: "DefiShares 资产网络",
      tagline: "基于 Graphene 的 DeFi 资产网络，以 DFS 为核心资产，以 GOLD 为协议级定价锚点。",
      navAbout: "关于",
      navFeatures: "特性",
      navGold: "GOLD 模型",
      navWallet: "钱包",
      navExplorer: "浏览器",
      navAirdrop: "空投",
      navDevelopers: "开发者",
      navDocuments: "文档",
      footerPortal: "DefiShares 官方信息门户",
      developer: "开发者",
      riskNotice: "风险提示",
      coreAsset: "核心资产",
      defaultMarket: "默认市场",
      blockInterval: "出块间隔",
      officialProjectOverview: "官方项目概览",
      heroTitle: "DFS-backed 资产、GOLD-centered 定价，以及 DefiShares 生态的官方访问入口。",
      heroBody:
        "DefiShares 是基于 BitShares / Graphene 技术栈 fork 的独立区块链。它为钱包访问、链上数据、项目文档、空投信息，以及围绕 DFS 和 DefiShares 管理型智能资产的技术参考提供公共入口。",
      openWebWallet: "打开 Web 钱包",
      viewExplorer: "查看浏览器",
      aboutDefishares: "关于 DefiShares",
      atAGlance: "概览",
      addressPrefix: "地址前缀",
      publicRpc: "公共 RPC",
      updated: "更新"
    }
  };
  const dictionary = translations[currentLanguage] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (dictionary[key]) node.textContent = dictionary[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    if (dictionary[key]) node.setAttribute("placeholder", dictionary[key]);
  });

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

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const lang = button.getAttribute("data-lang");
    button.setAttribute("aria-pressed", String(lang === currentLanguage));
    button.addEventListener("click", () => {
      localStorage.setItem("defishares-lang", lang);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.location.href = url.toString();
    });
  });
})();
