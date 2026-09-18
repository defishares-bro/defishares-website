(function () {
  const zh = document.documentElement.lang.startsWith("zh");
  const copy = zh ? {
    kicker: "空投分配规则",
    title: "DFS 空投 BTS 和 NBS 社区规则",
    intro: "本页只展示用户空投额度、折算规则和资格查询入口。全网供应、特殊奖励及审计依据请查看供应与审计页。",
    supplyLink: "查看供应与审计数据",
    bts: "BTS 空投", btsAmount: "2,468,954,844.73158", btsLabel: "正式合并批次实际分配 · DFS",
    btsRatio: "BTS 来源分配", btsBody: "以 2026-08-06 BTS/NBS 合并批次及当前主网 genesis 中记录的实际 BTS 空投为准。",
    nbs: "NBS 空投", nbsAmount: "300,000,000.00000", nbsLabel: "固定空投池 · DFS",
    nbsRatio: "按折算 NBS 持仓占比分配", nbsBody: "以正式快照中合格资产折算后的 NBS 总量作为分配权重，共同分享 3 亿 DFS。",
    conversions: [["1 MINER", "1 NBS"], ["1 SCNY", "50 NBS"]],
    formulaLabel: "个人空投额度", formula: "3 亿 DFS × 个人折算 NBS ÷ 全部合格账户折算 NBS 总量",
    snapshot: "资格依据：2026 年 8 月 5 日正式 NBS 批次、2026 年 8 月 6 日 BTS/NBS 合并批次及当前主网 genesis。",
    exclusions: "NBS 折算沿用正式快照规则：排除 earth.cattle 账户持有的 MINER，以及 metal.rooster 账户持有的 SCNY；其余合格持仓按上述比例折算。",
    query: "查询我的空投额度"
  } : {
    kicker: "Airdrop Allocation Rules",
    title: "DFS Airdrop Rules for the BTS and NBS Communities",
    intro: "This page covers user airdrop amounts, conversion rules, and eligibility lookup. See the Supply and Audit page for total supply, special rewards, and audit basis.",
    supplyLink: "View supply and audit data",
    bts: "BTS Airdrop", btsAmount: "2,468,954,844.73158", btsLabel: "Actual formal merged-batch allocation · DFS",
    btsRatio: "BTS source allocation", btsBody: "The actual BTS airdrop follows the August 6 BTS/NBS merged batch and the amount recorded in the current mainnet genesis.",
    nbs: "NBS Airdrop", nbsAmount: "300,000,000.00000", nbsLabel: "Fixed airdrop pool · DFS",
    nbsRatio: "Proportional to NBS-equivalent holdings", nbsBody: "Eligible holdings are converted to NBS equivalents and used as weights to distribute a fixed pool of 300 million DFS.",
    conversions: [["1 MINER", "1 NBS"], ["1 SCNY", "50 NBS"]],
    formulaLabel: "Individual allocation", formula: "300 million DFS × individual NBS equivalent ÷ total eligible NBS equivalent",
    snapshot: "Eligibility basis: formal NBS batch on August 5, 2026; BTS/NBS merged batch on August 6, 2026; current mainnet genesis.",
    exclusions: "The formal NBS snapshot rules exclude MINER held by earth.cattle and SCNY held by metal.rooster. Other eligible holdings use the conversion ratios above.",
    query: "Check my airdrop allocation"
  };
  const renderRows = (rows) => rows.map(([label, value]) => `<div><dt>${label}</dt><dd>= ${value}</dd></div>`).join("");

  document.querySelectorAll("[data-airdrop-rules]").forEach((mount) => {
    const queryUrl = document.body.dataset.page === "airdrop" ? "#eligibility" : `./airdrop.html?lang=${zh ? "zh" : "en"}#eligibility`;
    mount.innerHTML = `
      <div class="airdrop-rules-heading">
        <p class="section-kicker">${copy.kicker}</p>
        <h2>${copy.title}</h2>
        <p>${copy.intro} <a href="./supply.html?lang=${zh ? "zh" : "en"}#supply-details">${copy.supplyLink}</a></p>
      </div>
      <div class="airdrop-rules-action"><a class="button button-primary" href="${queryUrl}">${copy.query}</a></div>
      <div class="airdrop-rules-grid">
        <article class="airdrop-rule-card">
          <h3>${copy.bts}</h3>
          <p class="airdrop-rule-amount">${copy.btsAmount} <span>DFS</span></p>
          <p class="airdrop-rule-label">${copy.btsLabel}</p>
          <h4>${copy.btsRatio}</h4><p>${copy.btsBody}</p>
        </article>
        <article class="airdrop-rule-card">
          <h3>${copy.nbs}</h3>
          <p class="airdrop-rule-amount">${copy.nbsAmount} <span>DFS</span></p>
          <p class="airdrop-rule-label">${copy.nbsLabel}</p>
          <h4>${copy.nbsRatio}</h4><p>${copy.nbsBody}</p>
          <dl class="airdrop-rule-rows">${renderRows(copy.conversions)}</dl>
          <div class="airdrop-rule-formula"><strong>${copy.formulaLabel}</strong><p>${copy.formula}</p></div>
        </article>
      </div>
      <div class="airdrop-rules-notes"><p><strong>${copy.snapshot}</strong></p><p>${copy.exclusions}</p></div>`;
  });
})();
