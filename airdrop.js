(function () {
  const config = window.DEFI_SITE_CONFIG || {};
  const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  const copy = {
    en: {
      kicker: "Eligibility lookup",
      title: "Check airdrop eligibility",
      intro: "Select a source network and enter a public account name to review the snapshot record and the next claim step.",
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
      failed: "The request could not be completed. Please try again later.",
      found: "Snapshot record found.",
      account: "Account",
      network: "Network",
      available: "Available",
      collateral: "Collateral",
      liquidityPool: "Liquidity pool",
      openOrder: "Open orders",
      userLocked: "User-locked",
      total: "Total eligible balance",
      dfsAmount: "DFS airdrop amount",
      snapshotBlock: "Snapshot block",
      snapshotTime: "Snapshot time",
      directTitle: "Direct import route",
      directText: "This record is marked as a unique account with a single-key authority. Import the same derived keys into the DFS wallet; no signature claim is required.",
      directSteps: "Use the same account name, password, and role derivation. The DFS wallet will display the DFS-prefixed public keys.",
      signatureTitle: "Identity verification route",
      signatureText: "Register or select the DFS receiving account, request a one-time challenge, sign it with the source wallet, and paste the complete signed message here.",
      targetAccount: "DFS receiving account",
      targetPlaceholder: "Enter the DFS account that should receive the airdrop",
      challengeButton: "Create signing challenge",
      challengeTitle: "Sign this challenge in the source wallet",
      copyChallenge: "Copy challenge",
      copiedButton: "Copied",
      copied: "Challenge copied.",
      signatureLabel: "Complete signed message",
      signaturePlaceholder: "Paste the complete BEGIN BITSHARES SIGNED MESSAGE block",
      invalidSignatureEnvelope: "Paste the complete signed message for the current challenge.",
      verifyButton: "Verify identity",
      challengeReady: "Challenge created. It expires soon and can be used once.",
      targetInvalid: "This DFS receiving account does not exist. Register it first, then try again.",
      verified: "Identity verified. The claim is waiting for manual transfer.",
      claimStatus: "Claim status",
      statusNotStarted: "Not started",
      statusChallenge: "Challenge issued",
      statusPending: "Verified — pending transfer",
      statusTransferred: "Transferred",
      pendingFinalization: "The recorded snapshot is visible, but the final allocation has not been enabled yet.",
      securityNote: "This page never asks for private keys, seed phrases, or wallet passwords. Only sign the challenge shown by the official page.",
      targetRequired: "Enter a DFS receiving account first.",
      challengeFailed: "The challenge could not be created.",
      verifyFailed: "The signature could not be verified.",
      required: "Please complete this field."
    },
    zh: {
      kicker: "资格查询",
      title: "查询空投资格",
      intro: "选择来源网络并输入公开账户名，查看快照记录和下一步领取路径。",
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
      failed: "请求未完成，请稍后重试。",
      found: "已找到快照记录。",
      account: "账户",
      network: "网络",
      available: "可用余额",
      collateral: "抵押余额",
      liquidityPool: "流动性池",
      openOrder: "挂单余额",
      userLocked: "用户主动锁定",
      total: "可统计余额合计",
      dfsAmount: "DFS 空投金额",
      snapshotBlock: "快照区块",
      snapshotTime: "快照时间",
      directTitle: "直接导入密钥领取",
      directText: "该记录属于唯一账户名且为单一公钥权限。请将相同的派生密钥导入 DFS 钱包，不需要签名领取。",
      directSteps: "使用相同账户名、密码和角色派生规则。DFS 钱包会显示 DFS 前缀的公钥。",
      signatureTitle: "签名验证领取",
      signatureText: "先注册或选择 DFS 接收账户，生成一次性挑战，用来源钱包签名后，将完整签名消息粘贴到这里。",
      targetAccount: "DFS 接收账户",
      targetPlaceholder: "输入接收空投的 DFS 账户",
      challengeButton: "生成签名挑战",
      challengeTitle: "请在来源钱包中签署以下挑战",
      copyChallenge: "复制挑战内容",
      copiedButton: "已复制",
      copied: "挑战内容已复制。",
      signatureLabel: "完整签名消息",
      signaturePlaceholder: "粘贴完整的 BEGIN BITSHARES SIGNED MESSAGE 区块",
      invalidSignatureEnvelope: "请粘贴与当前挑战对应的完整签名消息。",
      verifyButton: "验证身份",
      challengeReady: "挑战已生成，请尽快签名；挑战只能使用一次。",
      targetInvalid: "这个 DFS 接收账户不存在，请先注册账户后再试。",
      verified: "身份验证成功，等待人工转账。",
      claimStatus: "领取状态",
      statusNotStarted: "未开始",
      statusChallenge: "已生成挑战",
      statusPending: "已验证，等待转账",
      statusTransferred: "已转账",
      pendingFinalization: "当前快照记录已可查询，但最终分配尚未启用。",
      securityNote: "本页面不会索要私钥、助记词或钱包密码。只签署官方页面显示的挑战内容。",
      targetRequired: "请先填写 DFS 接收账户。",
      challengeFailed: "生成挑战失败。",
      verifyFailed: "签名验证失败。",
      required: "请完成此项。"
    }
  }[language];

  const text = key => copy[key] || key;
  const escapeHtml = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
  const queryForm = document.querySelector("#airdrop-query-form");
  if (!queryForm) return;

  document.querySelectorAll("[data-airdrop-text]").forEach(node => {
    node.textContent = text(node.getAttribute("data-airdrop-text"));
  });
  document.querySelectorAll("[data-airdrop-placeholder]").forEach(node => {
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
      if (data && data[key] !== undefined && data[key] !== null && data[key] !== "") return data[key];
    }
    return "0";
  };
  const statusLabel = claimStatus => ({
    not_started: text("statusNotStarted"),
    challenge_issued: text("statusChallenge"),
    verified_pending_transfer: text("statusPending"),
    transferred: text("statusTransferred")
  }[claimStatus] || claimStatus || text("statusNotStarted"));

  const actionPanel = (data, selectedNetwork, accountName) => {
    if (!data.ready) {
      return `
        <section class="airdrop-claim-panel is-review">
          <p class="section-kicker">${text("claimStatus")}</p>
          <p>${text("pendingFinalization")}</p>
        </section>`;
    }
    const route = data.route || "manual_review";
    const claimStatus = data.status || "not_started";
    if (route === "direct_import") {
      return `
        <section class="airdrop-claim-panel is-direct">
          <p class="section-kicker">${text("directTitle")}</p>
          <p>${text("directText")}</p>
          <p class="airdrop-action-note">${text("directSteps")}</p>
        </section>`;
    }
    if (route === "signature") {
      return `
        <section class="airdrop-claim-panel" data-airdrop-claim-panel
          data-network="${escapeHtml(selectedNetwork)}" data-account="${escapeHtml(accountName)}">
          <p class="section-kicker">${text("signatureTitle")}</p>
          <p>${text("signatureText")}</p>
          <div class="airdrop-action-form">
            <label for="airdrop-target-account">${text("targetAccount")}</label>
            <input id="airdrop-target-account" type="text" autocomplete="off" spellcheck="false" placeholder="${text("targetPlaceholder")}" value="${escapeHtml(data.claim && data.claim.target_dfs_account)}" />
            <button class="button button-primary" type="button" data-airdrop-action="challenge">${text("challengeButton")}</button>
          </div>
          <div class="airdrop-challenge-box" data-airdrop-challenge-box hidden>
            <strong>${text("challengeTitle")}</strong>
            <pre data-airdrop-challenge></pre>
            <button class="button secondary" type="button" data-airdrop-action="copy-challenge">${text("copyChallenge")}</button>
            <p class="airdrop-query-status is-success">${text("challengeReady")}</p>
            <label for="airdrop-signed-message">${text("signatureLabel")}</label>
            <textarea id="airdrop-signed-message" rows="10" placeholder="${text("signaturePlaceholder")}"></textarea>
            <button class="button button-primary" type="button" data-airdrop-action="verify">${text("verifyButton")}</button>
          </div>
          <p class="airdrop-action-status" data-airdrop-action-status role="status" aria-live="polite">${statusLabel(claimStatus)}</p>
        </section>`;
    }
    return `
      <section class="airdrop-claim-panel is-review">
        <p class="section-kicker">${text("signatureTitle")}</p>
        <p>${text("pendingFinalization")}</p>
      </section>`;
  };

  const renderResult = (data, selectedNetwork, accountName) => {
    const networkName = selectedNetwork === "nbs" ? text("nbsNetwork") : text("btsNetwork");
    const fields = [
      ["available", ["available", "wallet_balance", "wallet_balance_display"]],
      ["collateral", ["collateral", "collateral_display"]],
      ["liquidityPool", ["liquidity_pool", "liquidity_pool_display"]],
      ["openOrder", ["open_order", "open_order_display"]],
      // BTS exports store user-locked balances as bts_ticket_locked. The API
      // exposes the same value as ticket_locked; keep legacy aliases for old
      // NBS records and older backend responses.
      ["userLocked", selectedNetwork === "bts"
        ? ["bts_ticket_locked", "ticket_locked", "user_locked_unspecified", "user_locked", "user_locked_display"]
        : ["nbs_user_locked", "user_locked_unspecified", "user_locked", "user_locked_display"]],
      ["total", ["total", "eligible_bts", "eligible_nbs"]],
      ["dfsAmount", ["airdrop_dfs", "airdrop_dfs_nbs", "airdrop_dfs_bts"]]
    ];
    result.innerHTML = `
      <div class="airdrop-result-header">
        <div><strong>${escapeHtml(value(data, ["account_name", "account"]))}</strong><span>${text("account")}</span></div>
        <div><strong>${escapeHtml(networkName)}</strong><span>${text("network")}</span></div>
        <div><strong>${escapeHtml(data.claim_id || "-")}</strong><span>${text("claimStatus")}</span></div>
      </div>
      <div class="airdrop-result-grid">
        ${fields.map(([label, keys]) => `<div class="airdrop-result-item"><span>${text(label)}</span><strong>${escapeHtml(String(value(data, keys)))}</strong></div>`).join("")}
      </div>
      ${(data.snapshot_block || data.snapshot_time) ? `<div class="airdrop-result-header"><span>${text("snapshotBlock")}: ${escapeHtml(data.snapshot_block || "-")}</span><span>${text("snapshotTime")}: ${escapeHtml(data.snapshot_time || "-")}</span></div>` : ""}
      ${!data.ready ? `<p class="airdrop-query-note is-warning">${text("pendingFinalization")}</p>` : ""}
      ${actionPanel(data, selectedNetwork, accountName)}
    `;
    result.hidden = false;
    bindClaimActions(result, selectedNetwork, accountName);
  };

  const postJson = async (url, body) => {
    const response = await fetch(new URL(url, window.location.href), {
      method: "POST",
      headers: {"content-type": "application/json", Accept: "application/json"},
      body: JSON.stringify(body)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = payload.error && payload.error.base && payload.error.base[0];
      throw new Error(message || `HTTP ${response.status}`);
    }
    return payload;
  };

  const copyText = async valueToCopy => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(valueToCopy);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = valueToCopy;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Clipboard access is unavailable");
  };

  const bindClaimActions = (root, selectedNetwork, accountName) => {
    const panel = root.querySelector("[data-airdrop-claim-panel]");
    if (!panel) return;
    const target = root.querySelector("#airdrop-target-account");
    const challengeBox = root.querySelector("[data-airdrop-challenge-box]");
    const challengeOutput = root.querySelector("[data-airdrop-challenge]");
    const copyChallenge = root.querySelector('[data-airdrop-action="copy-challenge"]');
    const signedMessage = root.querySelector("#airdrop-signed-message");
    const actionStatus = root.querySelector("[data-airdrop-action-status]");
    const setActionStatus = (message, kind = "") => {
      actionStatus.textContent = message;
      actionStatus.className = `airdrop-action-status${kind ? ` is-${kind}` : ""}`;
      actionStatus.setAttribute("role", kind === "error" ? "alert" : "status");
      actionStatus.setAttribute("aria-live", kind === "error" ? "assertive" : "polite");
    };
    target.addEventListener("input", () => {
      target.removeAttribute("aria-invalid");
      target.classList.remove("is-invalid");
      if (actionStatus.classList.contains("is-error")) setActionStatus("");
    });
    let copyResetTimer;
    copyChallenge?.addEventListener("click", async () => {
      const challenge = challengeOutput.textContent.trim();
      if (!challenge) return;
      try {
        await copyText(challenge);
        copyChallenge.textContent = text("copiedButton");
        copyChallenge.classList.add("is-copied");
        copyChallenge.disabled = true;
        clearTimeout(copyResetTimer);
        copyResetTimer = window.setTimeout(() => {
          copyChallenge.textContent = text("copyChallenge");
          copyChallenge.classList.remove("is-copied");
          copyChallenge.disabled = false;
        }, 1800);
        setActionStatus(text("copied"), "success");
      } catch (_) {
        setActionStatus(text("challengeFailed"), "error");
      }
    });
    root.querySelector('[data-airdrop-action="challenge"]')?.addEventListener("click", async () => {
      if (!target.value.trim()) {
        target.setAttribute("aria-invalid", "true");
        target.classList.add("is-invalid");
        setActionStatus(text("targetRequired"), "error");
        target.focus();
        return;
      }
      try {
        target.removeAttribute("aria-invalid");
        target.classList.remove("is-invalid");
        setActionStatus(text("loading"));
        const payload = await postJson(config.airdropChallengeUrl, {
          network: selectedNetwork,
          account: accountName,
          target_dfs_account: target.value.trim()
        });
        challengeOutput.textContent = payload.challenge;
        challengeBox.hidden = false;
        setActionStatus(text("challengeReady"), "success");
      } catch (error) {
        const message = String(error.message || "");
        if (message.startsWith("Unknown DFS account:")) {
          target.setAttribute("aria-invalid", "true");
          target.classList.add("is-invalid");
          setActionStatus(text("targetInvalid"), "error");
          target.focus();
          return;
        }
        setActionStatus(message || text("challengeFailed"), "error");
      }
    });
    root.querySelector('[data-airdrop-action="verify"]')?.addEventListener("click", async () => {
      const signed = signedMessage.value.trim();
      const challenge = challengeOutput.textContent.trim();
      const hasEnvelope = signed.startsWith("-----BEGIN BITSHARES SIGNED MESSAGE-----") &&
        signed.endsWith("-----END BITSHARES SIGNED MESSAGE-----") &&
        challenge && signed.includes(challenge);
      if (!hasEnvelope) {
        setActionStatus(text("invalidSignatureEnvelope"), "error");
        return;
      }
      try {
        setActionStatus(text("loading"));
        await postJson(config.airdropVerifyUrl, {
          network: selectedNetwork,
          account: accountName,
          signed_message: signed
        });
        setActionStatus(text("verified"), "success");
      } catch (_) {
        setActionStatus(text("verifyFailed"), "error");
      }
    });
  };

  const query = async (selectedNetwork, accountName) => {
    if (!config.airdropApiUrl) {
      setStatus(text("unavailable"), "error");
      result.hidden = true;
      return;
    }
    const url = new URL(config.airdropApiUrl, window.location.href);
    url.searchParams.set("network", selectedNetwork);
    url.searchParams.set("account", accountName);
    setStatus(text("loading"));
    result.hidden = true;
    try {
      const response = await fetch(url, {headers: {Accept: "application/json"}});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data || data.found === false) {
        setStatus(text("notFound"), "error");
        return;
      }
      renderResult(data, selectedNetwork, accountName);
      setStatus(text("found"), "success");
    } catch (_) {
      setStatus(text("failed"), "error");
    }
  };

  badge.textContent = config.airdropApiUrl ? text("snapshotStatus") : text("unavailable");
  queryForm.addEventListener("submit", event => {
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
