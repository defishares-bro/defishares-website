(function () {
  const config = window.DEFI_SITE_CONFIG || {};
  const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  const copy = {
    en: {
      kicker: "Eligibility lookup",
      title: "Check airdrop eligibility",
      intro: "Select the source network and enter a public account name to review the recorded snapshot balance categories.",
      snapshotStatus: "Snapshot service",
      networkLabel: "Source network",
      nbsNetwork: "NBS Network",
      btsNetwork: "BTS Network",
      accountLabel: "Account name",
      accountPlaceholder: "Enter an NBS or BTS account name",
      queryButton: "Query eligibility",
      initialStatus: "Enter an account name to begin.",
      loading: "Loading snapshot result…",
      unavailable: "The eligibility query service is not connected yet.",
      notFound: "No published snapshot record was found for this account.",
      invalid: "Please enter an account name.",
      failed: "The query could not be completed. Please try again later.",
      found: "Snapshot record found.",
      account: "Account",
      network: "Network",
      available: "Available",
      collateral: "Collateral",
      liquidityPool: "Liquidity pool",
      openOrder: "Open orders",
      userLocked: "User-locked",
      total: "Total eligible balance",
      snapshotBlock: "Snapshot block",
      snapshotTime: "Snapshot time",
      securityNote: "This page never asks for private keys, seed phrases, or wallet passwords. Query results are informational until the official rules and claim process are published."
    },
    zh: {
      kicker: "资格查询",
      title: "查询空投资格",
      intro: "选择来源网络并输入公开账户名，查看快照中记录的各类余额和汇总结果。",
      snapshotStatus: "快照服务",
      networkLabel: "来源网络",
      nbsNetwork: "NBS 网络",
      btsNetwork: "BTS 网络",
      accountLabel: "账户名",
      accountPlaceholder: "输入 NBS 或 BTS 账户名",
      queryButton: "查询资格",
      initialStatus: "请输入账户名开始查询。",
      loading: "正在读取快照结果……",
      unavailable: "资格查询服务尚未连接。",
      notFound: "没有找到该账户的已发布快照记录。",
      invalid: "请输入账户名。",
      failed: "查询未完成，请稍后重试。",
      found: "已找到快照记录。",
      account: "账户",
      network: "网络",
      available: "可用余额",
      collateral: "抵押余额",
      liquidityPool: "流动性池",
      openOrder: "挂单余额",
      userLocked: "用户主动锁定",
      total: "可统计余额合计",
      snapshotBlock: "快照区块",
      snapshotTime: "快照时间",
      securityNote: "本页面不会索要私钥、助记词或钱包密码。在官方规则和领取流程发布前，查询结果仅供信息核对。"
    }
  }[language];

  const text = (key) => copy[key] || key;
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
  const queryForm = document.querySelector("#airdrop-query-form");
  if (!queryForm) return;

  document.querySelectorAll("[data-airdrop-text]").forEach((node) => {
    node.textContent = text(node.getAttribute("data-airdrop-text"));
  });
  document.querySelectorAll("[data-airdrop-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", text(node.getAttribute("data-airdrop-placeholder")));
  });

  const network = document.querySelector("#airdrop-network");
  const account = document.querySelector("#airdrop-account");
  const status = document.querySelector("#airdrop-query-status");
  const result = document.querySelector("#airdrop-result");
  const badge = document.querySelector(".airdrop-query-badge");
  const setStatus = (message, kind) => {
    status.textContent = message;
    status.className = `airdrop-query-status${kind ? ` is-${kind}` : ""}`;
  };
  const value = (data, keys) => {
    for (const key of keys) {
      if (data && data[key] !== undefined && data[key] !== null) return data[key];
    }
    return "0";
  };
  const format = (value) => String(value ?? "0");
  const renderResult = (data, selectedNetwork) => {
    const networkName = selectedNetwork === "nbs" ? text("nbsNetwork") : text("btsNetwork");
    const fields = [
      ["available", ["available", "wallet_balance", "wallet_balance_display"]],
      ["collateral", ["collateral", "collateral_display"]],
      ["liquidityPool", ["liquidity_pool", "liquidity_pool_display"]],
      ["openOrder", ["open_order", "open_order_display"]],
      ["userLocked", ["user_locked", "user_locked_display"]],
      ["total", ["total", "eligible_bts", "airdrop_dfs"]]
    ];
    result.innerHTML = `
      <div class="airdrop-result-header">
        <div><strong>${escapeHtml(value(data, ["account_name", "account"]))}</strong><span>${text("account")}</span></div>
        <div><strong>${escapeHtml(networkName)}</strong><span>${text("network")}</span></div>
      </div>
      <div class="airdrop-result-grid">
        ${fields.map(([label, keys]) => `<div class="airdrop-result-item"><span>${text(label)}</span><strong>${escapeHtml(format(value(data, keys)))}</strong></div>`).join("")}
      </div>
      ${(data.snapshot_block || data.snapshot_time) ? `<div class="airdrop-result-header"><span>${text("snapshotBlock")}: ${escapeHtml(data.snapshot_block || "-")}</span><span>${text("snapshotTime")}: ${escapeHtml(data.snapshot_time || "-")}</span></div>` : ""}
    `;
    result.hidden = false;
  };

  const query = async (selectedNetwork, accountName) => {
    const endpoint = config.airdropApiUrl;
    if (!endpoint) {
      setStatus(text("unavailable"), "error");
      result.hidden = true;
      return;
    }
    const url = new URL(endpoint, window.location.href);
    url.searchParams.set("network", selectedNetwork);
    url.searchParams.set("account", accountName);
    setStatus(text("loading"));
    result.hidden = true;
    try {
      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const data = payload.result || payload;
      if (!data || data.found === false || data.total === undefined && !data.eligible_bts) {
        setStatus(text("notFound"), "error");
        return;
      }
      renderResult(data, selectedNetwork);
      setStatus(text("found"), "success");
    } catch (error) {
      setStatus(text("failed"), "error");
    }
  };

  badge.textContent = config.airdropApiUrl ? text("snapshotStatus") : text("unavailable");
  queryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const accountName = account.value.trim();
    if (!accountName) {
      setStatus(text("invalid"), "error");
      account.focus();
      return;
    }
    query(network.value, accountName);
  });
})();
