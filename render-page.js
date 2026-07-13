(function () {
  const config = window.DEFI_SITE_CONFIG || {};
  const pageGroups = window.DEFI_PAGES_I18N || { en: window.DEFI_PAGES || {} };
  const supportedLanguages = config.supportedLanguages || ["en", "zh"];
  const params = new URLSearchParams(window.location.search);
  const browserLanguage = (navigator.languages || [navigator.language || ""])
    .map((language) => String(language).toLowerCase())
    .find((language) => language.startsWith("zh"))
    ? "zh"
    : config.defaultLanguage || "en";
  const requestedLanguage = params.get("lang") || localStorage.getItem("defishares-lang") || browserLanguage;
  const lang = supportedLanguages.includes(requestedLanguage) ? requestedLanguage : "en";
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  const pages = pageGroups[lang] || pageGroups.en || {};
  const key = document.body.getAttribute("data-page");
  const page = pages[key];
  if (!page) return;

  const fallbackValues = {
    contactEmail: "contact@defishares.org",
    devEmail: "dev@defishares.org"
  };
  const value = (field) => config[field] || fallbackValues[field] || field;
  const labels = {
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
      home: "Home",
      currentLabels: "Current public labels",
      lastUpdate: "Last Update",
      language: "Language:",
      wallet: "Wallet",
      explorer: "Explorer",
      github: "GitHub",
      developer: "Developer",
      riskNotice: "Risk Notice",
      nav: {
        about: "About",
        features: "Features",
        gold: "GOLD Model",
        wallet: "Wallet",
        explorer: "Explorer",
        airdrop: "Airdrop",
        developers: "Developers",
        documents: "Documents"
      }
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
      home: "首页",
      currentLabels: "当前公开信息",
      lastUpdate: "最后更新",
      language: "语言：",
      wallet: "钱包",
      explorer: "浏览器",
      github: "GitHub",
      developer: "开发者",
      riskNotice: "风险提示",
      nav: {
        about: "关于",
        features: "特性",
        gold: "GOLD 模型",
        wallet: "钱包",
        explorer: "浏览器",
        airdrop: "空投",
        developers: "开发者",
        documents: "文档"
      }
    }
  }[lang];
  const esc = (text) =>
    String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  const configTranslations = {
    zh: {
      "Public Testnet": "公共测试网",
      "Rules pending": "规则待定",
      "3 seconds": "3 秒"
    }
  };
  const displayValue = (field) => {
    const text = String(value(field));
    return configTranslations[lang]?.[text] || text;
  };

  const nav = [
    ["about", "About", "./about.html"],
    ["features", "Features", "./features.html"],
    ["gold", "GOLD Model", "./gold.html"],
    ["wallet", "Wallet", value("walletUrl")],
    ["explorer", "Explorer", value("explorerUrl")],
    ["airdrop", "Airdrop", "./airdrop.html"],
    ["developers", "Developers", "./developers.html"],
    ["documents", "Documents", "./documents.html"]
  ];

  document.title = `${page.title} - ${lang === "zh" ? "DefiShares 官方信息门户" : "DefiShares Official Information Portal"}`;
  const metaDescription = document.querySelector("meta[name='description']");
  if (metaDescription) metaDescription.setAttribute("content", page.description);

  document.body.innerHTML = `
    <div class="official-banner" role="note">
      <div class="page-shell banner-inner">
        <span class="mini-mark" aria-hidden="true"></span>
        <span>${labels.portal}</span>
        <button class="banner-toggle" type="button" aria-expanded="false" aria-controls="banner-details">
          ${labels.how}
        </button>
      </div>
      <div class="page-shell banner-details" id="banner-details" hidden>
        ${labels.banner}
      </div>
    </div>

    <header class="site-header">
      <div class="utility-bar">
        <div class="page-shell utility-inner">
          <nav aria-label="Utility navigation">
            <a href="./index.html#status">${labels.networkStatus}</a>
            <a href="./airdrop.html">${labels.airdrop}</a>
            <a href="./documents.html">${labels.publications}</a>
            <a href="./documents.html#risk">${labels.contact}</a>
          </nav>
          <form class="search-form" role="search">
            <label for="site-search" class="sr-only">${labels.search}</label>
            <input id="site-search" type="search" placeholder="${labels.search}" />
            <button type="submit">${labels.search}</button>
          </form>
        </div>
      </div>

      <div class="masthead">
        <div class="page-shell masthead-inner">
          <a href="./index.html" aria-label="DefiShares home">
            <img src="./assets/defishares-seal.png" alt="DefiShares seal" class="seal" />
          </a>
          <div>
            <p class="eyebrow">DefiShares</p>
            <h1>${labels.mastheadTitle}</h1>
            <p class="tagline">
              ${labels.tagline}
            </p>
          </div>
        </div>
      </div>

      <nav class="primary-nav" aria-label="Primary navigation">
        <div class="page-shell nav-grid">
          ${nav
            .map(([navKey, label, href]) => `<a href="${href}"${navKey === key ? ' aria-current="page"' : ""}>${labels.nav[navKey] || label}</a>`)
            .join("")}
        </div>
      </nav>
    </header>

    <main class="interior-main" id="main-content">
      <div class="page-shell breadcrumb">
        <a href="./index.html">${labels.home}</a>
      </div>

      <section class="page-shell interior-title">
        <h2>${esc(page.title)}</h2>
      </section>

      <section class="page-shell about-intro">
        <div class="about-visual" aria-label="${esc(page.visualTitle)}">
          <img src="./assets/defishares-seal.png" alt="" />
          <div>
            <strong>${esc(page.visualTitle)}</strong>
            <span>${esc(page.visualSubtitle)}</span>
          </div>
        </div>
        <div class="about-summary">
          <p>${esc(page.introLead)}</p>
          <p>${esc(page.intro)}</p>
          <ul>
            ${page.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </div>
      </section>

      <section class="page-shell about-directory" aria-labelledby="directory-title">
        <h2 id="directory-title">${esc(page.directoryTitle)}</h2>
        <div class="directory-grid">
          ${page.directory
            .map(
              ([title, text]) => `
                <a href="./${key}.html#${title.toLowerCase().replaceAll(" ", "-")}">
                  <span>${esc(title)}</span>
                  <strong>${esc(text)}</strong>
                </a>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="page-shell about-governance">
        <div>
          ${page.operationsTitle ? `<h2>${esc(page.operationsTitle)}</h2>` : ""}
          <p>${esc(page.operations)}</p>
        </div>
        <aside>
          <h3>${labels.currentLabels}</h3>
          <dl>
            ${page.facts
              .map(
                ([label, field]) => `
                  <div>
                    <dt>${esc(label)}</dt>
                    <dd>${esc(displayValue(field))}</dd>
                  </div>
                `
              )
              .join("")}
          </dl>
        </aside>
      </section>

      <section class="page-shell last-update" id="risk">
        ${labels.lastUpdate}: <span>${esc(value("lastUpdated"))}</span>
      </section>
    </main>

    <footer class="site-footer" id="community">
      <div class="page-shell footer-grid">
        <div>
          <img src="./assets/defishares-seal.png" alt="" class="footer-seal" />
          <p>${labels.portal}</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="${esc(value("walletUrl"))}">${labels.wallet}</a>
          <a href="${esc(value("explorerUrl"))}">${labels.explorer}</a>
          <a href="${esc(value("githubUrl"))}">${labels.github}</a>
          <a href="mailto:${esc(value("contactEmail"))}">${labels.contact}</a>
          <a href="mailto:${esc(value("devEmail"))}">${labels.developer}</a>
          <a href="./index.html#risk">${labels.riskNotice}</a>
        </nav>
        <div class="footer-language" role="group" aria-label="Language">
          <span>${labels.language}</span>
          <button type="button" data-lang="en" aria-pressed="${lang === "en"}">EN</button>
          <button type="button" data-lang="zh" aria-pressed="${lang === "zh"}">中文</button>
        </div>
      </div>
    </footer>
  `;
})();
