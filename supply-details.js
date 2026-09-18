(function () {
  const zh = document.documentElement.lang.startsWith("zh");
  const copy = zh ? {
    kicker: "发行与审计依据",
    title: "供应总量与特殊奖励分配",
    intro: "本页集中展示当前主网 genesis 与正式批次对应的供应分配数据。",
    allocationTitle: "来源分配",
    allocationHeaders: ["来源分配", "DFS 数量"],
    allocationRows: [["BTS 空投", "2,468,954,844.73158 DFS"], ["NBS 空投", "300,000,000.00000 DFS"], ["创始团队/特殊奖励分配", "640,000,000.00000 DFS"]],
    supplyTitle: "供应摘要（独立指标）",
    supplyCards: [["genesis 初始供应", "3,408,954,844.73158 DFS"], ["最大供应", "4,500,000,000.00000 DFS"], ["初始未发行", "1,091,045,155.26842 DFS"]],
    specialTitle: "创始团队/特殊奖励分配 · 640,000,000 DFS",
    specialHeaders: ["分配类别", "DFS 数量", "占特殊奖励池"],
    specialRows: [["创始人", "300,000,000", "46.875%"], ["联合创始人", "160,000,000", "25%"], ["技术开发", "90,000,000", "14.0625%"], ["社区历史贡献：BYTEMASTER / ABIT / BITCRAB", "90,000,000", "14.0625%"]],
    chartLabel: "特殊奖励池分配比例",
    query: "前往空投页面查询额度"
  } : {
    kicker: "Issuance and Audit Basis",
    title: "Total Supply and Special Reward Allocation",
    intro: "This page presents current mainnet genesis and formal-batch supply allocation data.",
    allocationTitle: "Source Allocation",
    allocationHeaders: ["Source allocation", "DFS amount"],
    allocationRows: [["BTS airdrop", "2,468,954,844.73158 DFS"], ["NBS airdrop", "300,000,000.00000 DFS"], ["Founder team / special rewards", "640,000,000.00000 DFS"]],
    supplyTitle: "Supply Summary (Separate Metrics)",
    supplyCards: [["Genesis initial supply", "3,408,954,844.73158 DFS"], ["Maximum supply", "4,500,000,000.00000 DFS"], ["Initially unissued", "1,091,045,155.26842 DFS"]],
    specialTitle: "Founder Team / Special Rewards · 640,000,000 DFS",
    specialHeaders: ["Allocation category", "DFS amount", "% of special pool"],
    specialRows: [["Founder", "300,000,000", "46.875%"], ["Co-founders", "160,000,000", "25%"], ["Technical development", "90,000,000", "14.0625%"], ["Historical community contribution: BYTEMASTER / ABIT / BITCRAB", "90,000,000", "14.0625%"]],
    chartLabel: "Special reward pool allocation",
    query: "Check allocation on the airdrop page"
  };

  const table = (headers, rows) => `<div class="airdrop-rules-table-wrap"><table class="airdrop-rules-table"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  document.querySelectorAll("[data-supply-details]").forEach((mount) => {
    const segments = "#1f6feb 0 46.875%, #e09f2f 46.875% 71.875%, #2b8a78 71.875% 85.9375%, #8b5cf6 85.9375% 100%";
    mount.innerHTML = `
      <div class="airdrop-rules-heading">
        <p class="section-kicker">${copy.kicker}</p>
        <h2>${copy.title}</h2>
        <p>${copy.intro}</p>
      </div>
      <section class="airdrop-rules-block"><h3>${copy.allocationTitle}</h3>${table(copy.allocationHeaders, copy.allocationRows)}</section>
      <section class="airdrop-rules-block"><h3>${copy.supplyTitle}</h3><div class="supply-summary-grid">${copy.supplyCards.map(([label, value]) => `<article class="supply-summary-card"><span>${label}</span><strong>${value}</strong></article>`).join("")}</div></section>
      <section class="airdrop-rules-block"><h3>${copy.specialTitle}</h3><div class="special-rewards-layout"><div><div class="special-rewards-chart" role="img" aria-label="${copy.chartLabel}" style="--special-rewards-chart: conic-gradient(${segments});"><span>640M<br><small>DFS</small></span></div><ul class="special-rewards-legend">${copy.specialRows.map(([label, , share], index) => `<li><span class="special-rewards-swatch swatch-${index + 1}"></span>${label} · ${share}</li>`).join("")}</ul></div>${table(copy.specialHeaders, copy.specialRows)}</div></section>
      <div class="airdrop-rules-action"><a class="button button-primary" href="./airdrop.html?lang=${zh ? "zh" : "en"}#rules">${copy.query}</a></div>`;
  });
})();
