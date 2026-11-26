# DefiShares Website

Static official-information website for DefiShares, styled after a restrained U.S. Federal Reserve information-portal pattern: official banner, dark utility navigation, blue masthead, horizontal primary navigation, tabbed notices, document lists, and dense institutional content blocks.

## Files

- `index.html` - page structure and content.
- `about.html` - second-level About page styled after the Federal Reserve inner-page pattern.
- `features.html`, `gold.html`, `wallet.html`, `explorer.html`, `airdrop.html`, `developers.html`, `documents.html` - second-level pages that follow the same inner-page pattern.
- `styles.css` - Federal Reserve-inspired institutional color system and responsive layout.
- `script.js` - tabs, banner disclosure, search, config injection, and RPC copy behavior.
- `site-config.js` - confirmed project links and network labels.
- `airdrop.js` - dual-network airdrop eligibility query UI. Set `airdropApiUrl` in `site-config.js` to connect the published query service.
- `airdrop-rules.js` - shared bilingual BTS/NBS airdrop rules for the homepage and airdrop page.
- `supply-details.js` - bilingual genesis supply summary, special reward categories, pie chart, and audit-basis tables on `supply.html`.
- `pages-data.js` and `render-page.js` - shared second-level page content and renderer.
- Multilingual support is available through `?lang=en`, `?lang=zh`, and the EN/中文 switch in the header. The selected language is stored in `localStorage`.
- `assets/defishares-seal.png` - local DefiShares seal image.

## Update Confirmed Links

Edit `site-config.js`:

```js
window.DEFI_SITE_CONFIG = {
  websiteUrl: "https://defishares.org",
  walletUrl: "https://wallet.defishares.org",
  explorerUrl: "https://explorer.defishares.org",
  forumUrl: "https://forum.defishares.org/",
  githubUrl: "https://github.com/defishares/defishares-core",
  contactEmail: "contact@defishares.org",
  devEmail: "dev@defishares.org"
};
```

The airdrop query page calls `airdropApiUrl` with `network` (`nbs` or `bts`) and `account` query parameters. The endpoint should return JSON containing the account name and balance fields: `available`, `collateral`, `liquidity_pool`, `open_order`, `user_locked`, and `total`. Optional `snapshot_block` and `snapshot_time` fields are displayed with the result.

## Local Preview

From the repository root:

```bash
python3 -m http.server 4173 --directory website
```

Then open `http://127.0.0.1:4173/`.

## Wallet distribution center

`wallet.html` presents Wallet UI, the Android APK and Mobile Web in English and Chinese. Navigation and homepage wallet links go through this page. `wallet-center.js` renders the platform cards and local SVG QR codes.

Configure links in `site-config.js`:

- `walletUrl`: existing Wallet UI address.
- `walletCenterUrl`: local distribution page.
- `mobileWebWalletUrl`: mobile browser wallet address.
- `walletSourceUrl`: public mobile wallet source repository.
- `androidWallet`: verified APK metadata (`downloadUrl`, `releaseUrl`, `version`, `sizeBytes`, `minAndroid`, `releaseDate`, `sha256`). An empty `downloadUrl` keeps the Android download button disabled.

Publish the signed APK as a versioned release asset or on a download host, then update this metadata. Do not commit APK binaries to the website repository. The Android QR code opens the official wallet center; the Mobile Web QR code opens `https://app.defishares.org/`.

Preview from this checkout with `python3 -m http.server 4175 --bind 127.0.0.1`, then open `/wallet.html?lang=en` or `/wallet.html?lang=zh`.
