(function () {
  const config = window.DEFI_SITE_CONFIG || {};
  const pages = window.DEFI_PAGES || {};
  const key = document.body.getAttribute("data-page");
  const page = pages[key];
  if (!page) return;

  const fallbackValues = {
    contactEmail: "contact@defishares.org",
    devEmail: "dev@defishares.org"
  };
  const value = (field) => config[field] || fallbackValues[field] || field;
  const esc = (text) =>
    String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

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

  document.title = `${page.title} - DefiShares Official Information Portal`;
  const metaDescription = document.querySelector("meta[name='description']");
  if (metaDescription) metaDescription.setAttribute("content", page.description);

  document.body.innerHTML = `
    <div class="official-banner" role="note">
      <div class="page-shell banner-inner">
        <span class="mini-mark" aria-hidden="true"></span>
        <span>DefiShares official information portal</span>
        <button class="banner-toggle" type="button" aria-expanded="false" aria-controls="banner-details">
          Here's how you know
        </button>
      </div>
      <div class="page-shell banner-details" id="banner-details" hidden>
        Use links from this website to access the official wallet, explorer, documents, and community channels.
        DefiShares will never ask for your private key, seed phrase, or wallet password.
      </div>
    </div>

    <header class="site-header">
      <div class="utility-bar">
        <div class="page-shell utility-inner">
          <nav aria-label="Utility navigation">
            <a href="./index.html#status">Network Status</a>
            <a href="./airdrop.html">Airdrop</a>
            <a href="./documents.html">Publications</a>
            <a href="./documents.html#risk">Contact</a>
          </nav>
          <form class="search-form" role="search">
            <label for="site-search" class="sr-only">Search</label>
            <input id="site-search" type="search" placeholder="Search" />
            <button type="submit">Search</button>
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
            <h1>DefiShares Asset Network</h1>
            <p class="tagline">
              A Graphene-based DeFi asset network with DFS as the core asset and GOLD as the protocol pricing anchor.
            </p>
          </div>
        </div>
      </div>

      <nav class="primary-nav" aria-label="Primary navigation">
        <div class="page-shell nav-grid">
          ${nav
            .map(([navKey, label, href]) => `<a href="${href}"${navKey === key ? ' aria-current="page"' : ""}>${label}</a>`)
            .join("")}
        </div>
      </nav>
    </header>

    <main class="interior-main" id="main-content">
      <div class="page-shell breadcrumb">
        <a href="./index.html">Home</a>
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
          <h2>${esc(page.operationsTitle)}</h2>
          <p>${esc(page.operations)}</p>
        </div>
        <aside>
          <h3>Current public labels</h3>
          <dl>
            ${page.facts
              .map(
                ([label, field]) => `
                  <div>
                    <dt>${esc(label)}</dt>
                    <dd>${esc(value(field))}</dd>
                  </div>
                `
              )
              .join("")}
          </dl>
        </aside>
      </section>

      <section class="page-shell last-update" id="risk">
        Last Update: <span>${esc(value("lastUpdated"))}</span>
      </section>
    </main>

    <footer class="site-footer" id="community">
      <div class="page-shell footer-grid">
        <div>
          <img src="./assets/defishares-seal.png" alt="" class="footer-seal" />
          <p>DefiShares Official Information Portal</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="${esc(value("walletUrl"))}">Wallet</a>
          <a href="${esc(value("explorerUrl"))}">Explorer</a>
          <a href="${esc(value("githubUrl"))}">GitHub</a>
          <a href="mailto:${esc(value("contactEmail"))}">Contact</a>
          <a href="mailto:${esc(value("devEmail"))}">Developer</a>
          <a href="./documents.html#risk">Risk Notice</a>
        </nav>
      </div>
    </footer>
  `;
})();
