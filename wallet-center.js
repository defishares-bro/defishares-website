(function () {
  const root = document.querySelector("[data-wallet-center]");
  if (!root) return;
  const config = window.DEFI_SITE_CONFIG || {};
  const android = config.androidWallet || {};
  const zh = document.documentElement.lang.startsWith("zh");
  const text = zh ? {
    intro: "选择适合你的 DefiShares 钱包",
    summary: "电脑、Android 手机与移动浏览器，共用同一个 DefiShares 网络。请选择你的使用方式。",
    desktopLabel: "电脑浏览器", desktopTitle: "Wallet UI", desktopBody: "面向桌面浏览器的完整钱包界面，适合账户管理、资产操作与市场交易。",
    desktopAction: "打开 Wallet UI", desktopNote: "直接在浏览器中使用，无需安装。",
    androidLabel: "Android 应用", androidTitle: "Android 钱包", androidBody: "安装到 Android 手机，在原生应用中管理账户、查看行情和完成交易。",
    androidAction: "下载 Android APK", pending: "安装包准备中", pendingNote: "正式安装包发布后，将在此提供下载及版本信息。",
    mobileLabel: "手机浏览器", mobileTitle: "Mobile Web", mobileBody: "通过手机浏览器直接访问，适用于 Android 和 iPhone，也可添加到主屏幕。",
    mobileAction: "打开 Mobile Web", mobileNote: "无需下载安装包。",
    version: "版本", size: "文件大小", minimum: "系统要求", date: "发布日期",
    release: "版本说明与备用下载", qrMobile: "扫码打开 Mobile Web", qrAndroid: "扫码在手机上访问下载页",
    guide: "如何选择", guideDesktop: "电脑上使用：打开 Wallet UI，访问完整网页钱包。",
    guideAndroid: "Android 手机上使用：下载 APK 安装，或直接打开 Mobile Web。",
    guideIphone: "iPhone 上使用：用 Safari 打开 Mobile Web，通过浏览器分享菜单添加到主屏幕。",
    verify: "核对安装包", verifyBody: "下载后可核对下方 SHA-256，确认文件与官方发布的安装包一致。更新 Android 应用时请使用同一签名的官方安装包。",
    security: "账户与备份", securityBody: "三个客户端连接同一条链，但本机钱包数据与解锁设置分别保存。切换客户端前，请确认已有账户所需的登录资料与备份。官网分发页不会要求你输入私钥或钱包密码。",
    source: "查看移动钱包源码", classic: "Wallet UI 源码", platform: "Android 与 iPhone"
  } : {
    intro: "Choose your DefiShares wallet",
    summary: "Desktop, Android and mobile browsers, connected to the same DefiShares network. Choose how you want to access your wallet.",
    desktopLabel: "Desktop browsers", desktopTitle: "Wallet UI", desktopBody: "The full desktop browser interface for account management, asset operations and market trading.",
    desktopAction: "Open Wallet UI", desktopNote: "Use it in your browser. No installation required.",
    androidLabel: "Android app", androidTitle: "Android Wallet", androidBody: "Install the native Android app to manage accounts, follow markets and trade from your phone.",
    androidAction: "Download Android APK", pending: "Download coming soon", pendingNote: "The official APK and its version details will appear here once published.",
    mobileLabel: "Mobile browsers", mobileTitle: "Mobile Web", mobileBody: "Open the wallet in your mobile browser on Android or iPhone, with the option to add it to your home screen.",
    mobileAction: "Open Mobile Web", mobileNote: "No APK download required.",
    version: "Version", size: "File size", minimum: "Requires", date: "Published",
    release: "Release notes and alternate download", qrMobile: "Scan to open Mobile Web", qrAndroid: "Scan to visit this download page on your phone",
    guide: "Which wallet should I choose?", guideDesktop: "On a computer: open Wallet UI for the full desktop wallet.",
    guideAndroid: "On Android: install the APK, or open Mobile Web directly in your browser.",
    guideIphone: "On iPhone: open Mobile Web in Safari, then use the browser share menu to add it to your home screen.",
    verify: "Verify your download", verifyBody: "Compare the downloaded APK with the SHA-256 below to check that it matches the official release. Android updates must use an official APK signed with the same key.",
    security: "Accounts and backups", securityBody: "All three clients connect to the same chain, while local wallet data and unlock settings are stored separately. Keep the login details and backups needed for your account before switching clients. This distribution page never asks for private keys or wallet passwords.",
    source: "Mobile wallet source code", classic: "Wallet UI source code", platform: "Android and iPhone"
  };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const link = (url) => {
    try { const parsed = new URL(url); return parsed.protocol === "https:" ? parsed.href : ""; } catch { return ""; }
  };
  const downloadUrl = link(android.downloadUrl);
  const releaseUrl = link(android.releaseUrl);
  const metadata = [
    [text.version, android.version],
    [text.size, android.sizeBytes ? `${(android.sizeBytes / 1000 / 1000).toFixed(2)} MB` : ""],
    [text.minimum, android.minAndroid],
    [text.date, android.releaseDate]
  ].filter(([, value]) => value);
  const icons = {
    desktop: '<rect x="3" y="4" width="26" height="17" rx="2"/><path d="M16 21v7m-6 0h12"/>',
    android: '<rect x="8" y="2" width="16" height="28" rx="3"/><path d="M13 6h6m-5 20h4"/>',
    mobile: '<rect x="3" y="5" width="26" height="22" rx="2"/><path d="M3 11h26M8 8h1m3 0h1m-3 8h12m-12 5h8"/>'
  };
  const icon = (name) => `<svg class="wallet-card-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${icons[name]}</svg>`;
  const external = (url, label, cls = "") => `<a class="${cls}" href="${esc(link(url))}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;

  root.innerHTML = `
    <div class="wallet-heading"><h3>${text.intro}</h3><p>${text.summary}</p></div>
    <div class="wallet-cards">
      <article class="wallet-card" id="wallet-ui">
        ${icon("desktop")}<p class="wallet-platform">${text.desktopLabel}</p><h3>${text.desktopTitle}</h3><p class="wallet-description">${text.desktopBody}</p>
        ${external(config.walletUrl, text.desktopAction, "button primary wallet-action")}
        <p class="wallet-small">${text.desktopNote}</p>
        <div class="wallet-card-bottom"><span class="wallet-domain">wallet.defishares.org</span></div>
      </article>
      <article class="wallet-card wallet-card-featured" id="android">
        ${icon("android")}<p class="wallet-platform">${text.androidLabel}</p><h3>${text.androidTitle}</h3><p class="wallet-description">${text.androidBody}</p>
        ${downloadUrl ? `<a class="button primary wallet-action" href="${esc(downloadUrl)}">${text.androidAction}</a>` : `<button class="button wallet-action" type="button" disabled>${text.pending}</button>`}
        ${downloadUrl ? `<dl class="wallet-metadata">${metadata.map(([key, value]) => `<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join("")}</dl>` : `<p class="wallet-small">${text.pendingNote}</p>`}
        ${releaseUrl ? external(releaseUrl, text.release, "wallet-release") : ""}
        <figure class="wallet-card-bottom wallet-qr"><img src="./assets/wallet-center-qr.svg" width="116" height="116" alt="${text.qrAndroid}"/><figcaption>${text.qrAndroid}</figcaption></figure>
      </article>
      <article class="wallet-card" id="mobile-web">
        ${icon("mobile")}<p class="wallet-platform">${text.mobileLabel}</p><h3>${text.mobileTitle}</h3><p class="wallet-description">${text.mobileBody}</p>
        ${external(config.mobileWebWalletUrl, text.mobileAction, "button primary wallet-action")}
        <p class="wallet-small">${text.mobileNote}</p>
        <figure class="wallet-card-bottom wallet-qr"><img src="./assets/mobile-web-qr.svg" width="116" height="116" alt="${text.qrMobile}"/><figcaption>${text.qrMobile}<br/><span class="wallet-domain">app.defishares.org</span></figcaption></figure>
      </article>
    </div>
    <section class="wallet-help"><h3>${text.guide}</h3><ul><li>${text.guideDesktop}</li><li>${text.guideAndroid}</li><li>${text.guideIphone}</li></ul></section>
    ${downloadUrl && /^[a-f0-9]{64}$/i.test(android.sha256) ? `<section class="wallet-verification"><h3>${text.verify}</h3><p>${text.verifyBody}</p><p class="wallet-small">SHA-256</p><code>${esc(android.sha256)}</code></section>` : ""}
    <section class="wallet-help"><h3>${text.security}</h3><p>${text.securityBody}</p><div class="wallet-source-links">${external(config.walletSourceUrl, text.source)}${external("https://github.com/defishares/defishares-ui", text.classic)}</div></section>
  `;
})();
