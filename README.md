# DefiShares Website

Static official-information website for DefiShares, styled after a restrained U.S. Federal Reserve information-portal pattern: official banner, dark utility navigation, blue masthead, horizontal primary navigation, tabbed notices, document lists, and dense institutional content blocks.

## Files

- `index.html` - page structure and content.
- `about.html` - second-level About page styled after the Federal Reserve inner-page pattern.
- `features.html`, `gold.html`, `wallet.html`, `explorer.html`, `airdrop.html`, `developers.html`, `documents.html` - second-level pages that follow the same inner-page pattern.
- `styles.css` - Federal Reserve-inspired institutional color system and responsive layout.
- `script.js` - tabs, banner disclosure, search, config injection, and RPC copy behavior.
- `site-config.js` - confirmed project links and network labels.
- `pages-data.js` and `render-page.js` - shared second-level page content and renderer.
- `assets/defishares-seal.png` - local DefiShares seal image.

## Update Confirmed Links

Edit `site-config.js`:

```js
window.DEFI_SITE_CONFIG = {
  websiteUrl: "https://defishares.org",
  walletUrl: "https://wallet.defishares.org",
  explorerUrl: "https://explorer.defishares.org",
  githubUrl: "https://github.com/defishares",
  contactEmail: "contact@defishares.org",
  devEmail: "dev@defishares.org"
};
```

## Local Preview

From the repository root:

```bash
python3 -m http.server 4173 --directory website
```

Then open `http://127.0.0.1:4173/`.
