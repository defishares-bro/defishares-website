(function () {
  const config = window.DEFI_SITE_CONFIG || {};
  const supportedLanguages = config.supportedLanguages || ["en", "zh"];
  const params = new URLSearchParams(window.location.search);
  const browserLanguage = (navigator.languages || [navigator.language || ""])
    .map((language) => String(language).toLowerCase())
    .find((language) => language.startsWith("zh"))
    ? "zh"
    : config.defaultLanguage || "en";
  const requestedLanguage = params.get("lang") || localStorage.getItem("defishares-lang") || browserLanguage;
  const currentLanguage = supportedLanguages.includes(requestedLanguage) ? requestedLanguage : "en";
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
      home: "Home",
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
      updated: "Updated",
      recentDevelopments: "Recent Developments",
      projectNotices: "Project Notices",
      projectBrief: "Project brief",
      goldNewsTitle: "GOLD-centered feed policy defines DefiShares smartcoin behavior",
      goldNewsBody: "DefiShares uses GOLD as the routing asset for managed bitassets and derives effective TARGET/DFS feeds on chain.",
      walletAccess: "Wallet access",
      walletNewsTitle: "DefiShares Web Wallet provides local-signing browser access",
      walletNewsBody: "Private keys remain local to the user's wallet environment; transactions are signed locally before broadcast.",
      explorerNewsTitle: "Explorer entry prepared for block, account, asset, and transaction lookup",
      explorerNewsBody: "The explorer is the public record surface for verifying chain activity and distribution records.",
      networkDesignation: "Network designation",
      networkDesignationBody: "This site currently labels the active network as Public Testnet. Update site-config.js if the launch state changes.",
      riskStatement: "Risk statement",
      riskStatementBody: "DFS and DefiShares-managed assets involve blockchain, liquidity, market, custody, and protocol risks. This website does not provide investment advice.",
      websitePlanningDoc: "Website section and content planning document",
      feedPolicyDoc: "DefiShares Smartcoin Feed and Risk Policy",
      checklistDoc: "Website content completion checklist",
      protocolPolicy: "Protocol Policy",
      goldPricingTitle: "GOLD-centered smart asset pricing",
      goldPricingBody: "DefiShares changes upstream BitShares smartcoin semantics for managed DFS-backed bitassets. GOLD is the protocol feed anchor, non-GOLD managed bitassets publish TARGET/GOLD, and the chain derives the effective TARGET/DFS current feed.",
      witnessPublishes: "Witness publishes",
      chainGenerated: "Chain-generated",
      effectiveFeed: "Effective",
      targetDfsFeed: "TARGET/DFS current_feed",
      webWallet: "Web Wallet",
      walletCardBody: "Create or import a wallet, review balances, transfer assets, and access the DFS market through the official wallet entry.",
      openWallet: "Open wallet",
      chainExplorer: "Chain Explorer",
      explorerCardBody: "Look up blocks, transactions, accounts, assets, and distribution records through the public explorer.",
      viewExplorerLower: "View explorer",
      rpcAccess: "RPC Access",
      rpcBody: "Connect services and tools to the official public WebSocket endpoint.",
      copy: "Copy",
      communityDistribution: "Community Distribution",
      dfsAirdrop: "DFS Airdrop",
      airdropBody: "The airdrop page will present allocation, eligibility, snapshot time, claim window, distribution account, and chain-verifiable records once the project team publishes final rules.",
      status: "Status",
      requiredFields: "Required fields",
      requiredFieldsValue: "Allocation, eligibility, snapshot, claim window, distribution account, audit records",
      securityNote: "Security note",
      securityNoteValue: "Never enter private keys, seed phrases, or wallet passwords on an airdrop page.",
      documentsReferences: "Documents and official references",
      githubRepository: "GitHub Repository",
      planningDocument: "Planning Document",
      planningDocumentBody: "Project website sections and content architecture",
      technicalPolicy: "Technical Policy",
      feedPolicyBody: "DefiShares Smartcoin Feed and Risk Policy",
      checklist: "Checklist",
      checklistBody: "Website content items pending manual completion",
      riskDisclaimer: "Risk and Disclaimer",
      importantNotice: "Important user notice",
      riskBody: "Digital assets can be volatile and may involve technical, market, liquidity, custody, and regulatory risks. DefiShares does not guarantee profit, price performance, redemption, or investment outcome. Users are responsible for safeguarding private keys and verifying official URLs before interacting with any wallet or airdrop page.",
      language: "Language:",
      aboutPageTitle: "About DefiShares",
      whatIsDefishares: "What is DefiShares?",
      dfsOverview: "DFS asset network overview",
      aboutLead: "DefiShares is an independent blockchain network forked from the BitShares / Graphene technology stack. It is designed as an official access layer for DFS, GOLD-centered smart asset policy, wallet access, explorer lookup, airdrop information, and public project documentation.",
      aboutFunctions: "DefiShares provides five general functions for the public interest of its ecosystem:",
      aboutBullet1: "maintains DFS as the core asset for fees, accounts, transfers, and network operations;",
      aboutBullet2: "uses GOLD as the protocol pricing anchor for DefiShares-managed smart assets;",
      aboutBullet3: "provides official wallet and explorer access for users to interact with and verify chain activity;",
      aboutBullet4: "publishes documentation for chain parameters, risk policy, airdrop status, and asset mechanisms; and",
      aboutBullet5: "supports community governance, witness operations, and transparent ecosystem communication.",
      defisharesNetwork: "DefiShares Network",
      chainParameters: "Chain Parameters",
      chainParametersBody: "DFS, address prefix, block interval, public RPC, and default market.",
      walletAccessTitle: "Wallet Access",
      walletAccessBody: "Official Web Wallet entry with local-signing user access.",
      explorerBody: "Public lookup for blocks, transactions, accounts, assets, and records.",
      goldPolicy: "GOLD Policy",
      goldPolicyBody: "GOLD-centered feed route and fixed collateral policy overview.",
      airdropDirectoryBody: "Allocation, eligibility, snapshot, claim window, and distribution records.",
      publicationsDirectoryBody: "Planning documents, technical policy notes, and website content checklists.",
      governanceOperations: "Governance and Operations",
      governanceBody: "DefiShares follows a witness-based network model inherited from the Graphene family. Witnesses maintain block production and participate in feed publication for applicable assets. Public documentation should distinguish verified project links, network state, asset policy, and risk disclosures from community commentary.",
      currentPublicLabels: "Current public labels",
      publicTestnet: "Public Testnet",
      rulesPending: "Rules pending",
      seconds3: "3 seconds",
      lastUpdate: "Last Update",
      copied: "Copied",
      copyFailed: "Copy failed",
      pageTitleIndex: "DefiShares - Official Information Portal",
      pageTitleAbout: "About DefiShares - Official Information Portal"
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
      home: "首页",
      developer: "开发者",
      riskNotice: "风险提示",
      coreAsset: "核心资产",
      defaultMarket: "默认市场",
      blockInterval: "出块间隔",
      officialProjectOverview: "官方项目概览",
      heroTitle: "以 DFS 支撑的资产、以 GOLD 为中心的定价，以及 DefiShares 生态的官方访问入口。",
      heroBody:
        "DefiShares 是基于 BitShares / Graphene 技术栈分叉的独立区块链。它为钱包访问、链上数据、项目文档、空投信息，以及围绕 DFS 和 DefiShares 管理型智能资产的技术参考提供公共入口。",
      openWebWallet: "打开网页钱包",
      viewExplorer: "查看浏览器",
      aboutDefishares: "关于 DefiShares",
      atAGlance: "概览",
      addressPrefix: "地址前缀",
      publicRpc: "公共 RPC",
      updated: "更新",
      recentDevelopments: "最新动态",
      projectNotices: "项目公告",
      projectBrief: "项目简报",
      goldNewsTitle: "以 GOLD 为中心的喂价策略定义 DefiShares 智能资产行为",
      goldNewsBody: "DefiShares 使用 GOLD 作为管理型智能资产的路由资产，并在链上推导有效的 TARGET/DFS 喂价。",
      walletAccess: "钱包访问",
      walletNewsTitle: "DefiShares 网页钱包提供本地签名浏览器访问",
      walletNewsBody: "私钥保留在用户本地钱包环境中；交易在本地签名后再广播。",
      explorerNewsTitle: "浏览器入口用于区块、账户、资产和交易查询",
      explorerNewsBody: "浏览器是验证链上活动和分发记录的公共记录入口。",
      networkDesignation: "网络标识",
      networkDesignationBody: "本站当前将活跃网络标记为公共测试网。如上线状态变化，请更新 site-config.js。",
      riskStatement: "风险声明",
      riskStatementBody: "DFS 和 DefiShares 管理型资产涉及区块链、流动性、市场、托管和协议风险。本站不提供投资建议。",
      websitePlanningDoc: "官网板块与内容规划文档",
      feedPolicyDoc: "DefiShares 智能资产喂价与风险策略",
      checklistDoc: "官网待填写内容清单",
      protocolPolicy: "协议策略",
      goldPricingTitle: "以 GOLD 为中心的智能资产定价",
      goldPricingBody: "DefiShares 调整了上游 BitShares 管理型智能资产的语义。GOLD 是协议喂价锚点，非 GOLD 管理型资产发布 TARGET/GOLD，链上推导有效的 TARGET/DFS 当前喂价。",
      witnessPublishes: "见证人发布",
      chainGenerated: "链上生成",
      effectiveFeed: "有效喂价",
      targetDfsFeed: "TARGET/DFS 当前喂价",
      webWallet: "网页钱包",
      walletCardBody: "创建或导入钱包，查看余额，转移资产，并通过官方钱包入口访问 DFS 市场。",
      openWallet: "打开钱包",
      chainExplorer: "链上浏览器",
      explorerCardBody: "查询区块、交易、账户、资产和分发记录。",
      viewExplorerLower: "查看浏览器",
      rpcAccess: "RPC 访问",
      rpcBody: "将服务和工具连接到官方公共 WebSocket 端点。",
      copy: "复制",
      communityDistribution: "社区分发",
      dfsAirdrop: "DFS 空投",
      airdropBody: "项目方发布最终规则后，空投页面将展示分配额度、资格、快照时间、领取窗口、分发账户和链上可验证记录。",
      status: "状态",
      requiredFields: "需填写字段",
      requiredFieldsValue: "分配额度、资格、快照、领取窗口、分发账户、审计记录",
      securityNote: "安全提示",
      securityNoteValue: "不要在空投页面输入私钥、助记词或钱包密码。",
      documentsReferences: "文档和官方参考",
      githubRepository: "GitHub 仓库",
      planningDocument: "规划文档",
      planningDocumentBody: "项目官网板块和内容架构",
      technicalPolicy: "技术策略",
      feedPolicyBody: "DefiShares 智能资产喂价与风险策略",
      checklist: "清单",
      checklistBody: "官网仍待人工补充的内容项",
      riskDisclaimer: "风险与免责声明",
      importantNotice: "重要用户提示",
      riskBody: "数字资产可能具有波动性，并涉及技术、市场、流动性、托管和监管风险。DefiShares 不保证收益、价格表现、兑付或投资结果。用户应自行保管私钥，并在与任何钱包或空投页面交互前核对官方 URL。",
      language: "语言：",
      aboutPageTitle: "关于 DefiShares",
      whatIsDefishares: "什么是 DefiShares？",
      dfsOverview: "DFS 资产网络概览",
      aboutLead: "DefiShares 是基于 BitShares / Graphene 技术栈分叉的独立区块链网络。它是 DFS、以 GOLD 为中心的智能资产策略、钱包访问、浏览器查询、空投信息和公开项目文档的官方访问层。",
      aboutFunctions: "DefiShares 为其生态公共利益提供五类通用功能：",
      aboutBullet1: "维护 DFS 作为手续费、账户、转账和网络运行的核心资产；",
      aboutBullet2: "使用 GOLD 作为 DefiShares 管理型智能资产的协议定价锚点；",
      aboutBullet3: "提供官方钱包和浏览器入口，方便用户交互并验证链上活动；",
      aboutBullet4: "发布链参数、风险策略、空投状态和资产机制文档；",
      aboutBullet5: "支持社区治理、见证人运行和透明的生态沟通。",
      defisharesNetwork: "DefiShares 网络",
      chainParameters: "链参数",
      chainParametersBody: "DFS、地址前缀、出块间隔、公共 RPC 和默认市场。",
      walletAccessTitle: "钱包访问",
      walletAccessBody: "官方 Web 钱包入口，支持本地签名用户访问。",
      explorerBody: "公共查询区块、交易、账户、资产和记录。",
      goldPolicy: "GOLD 策略",
      goldPolicyBody: "以 GOLD 为中心的喂价路径和固定抵押策略概览。",
      airdropDirectoryBody: "分配额度、资格、快照、领取窗口和分发记录。",
      publicationsDirectoryBody: "规划文档、技术策略说明和官网内容清单。",
      governanceOperations: "治理与运行",
      governanceBody: "DefiShares 遵循继承自 Graphene 家族的见证人网络模型。见证人维护出块，并参与适用资产的喂价发布。公开文档应区分已验证项目链接、网络状态、资产策略、风险披露和社区评论。",
      currentPublicLabels: "当前公开信息",
      publicTestnet: "公共测试网",
      rulesPending: "规则待定",
      seconds3: "3 秒",
      lastUpdate: "最后更新",
      copied: "已复制",
      copyFailed: "复制失败",
      pageTitleIndex: "DefiShares - 官方信息门户",
      pageTitleAbout: "关于 DefiShares - 官方信息门户"
    }
  };
  const dictionary = translations[currentLanguage] || translations.en;
  const configTranslations = {
    zh: {
      "Public Testnet": dictionary.publicTestnet,
      "Rules pending": dictionary.rulesPending,
      "3 seconds": dictionary.seconds3
    }
  };
  const displayConfigValue = (value) => {
    const text = String(value);
    return configTranslations[currentLanguage]?.[text] || text;
  };
  const path = window.location.pathname;
  if (path.endsWith("/about.html")) {
    document.title = dictionary.pageTitleAbout;
  } else if (path.endsWith("/") || path.endsWith("/index.html")) {
    document.title = dictionary.pageTitleIndex;
  }

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
    if (config[key]) node.textContent = displayConfigValue(config[key]);
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
        copyButton.textContent = dictionary.copied;
        window.setTimeout(() => {
          copyButton.textContent = dictionary.copy;
        }, 1600);
      } catch (error) {
        copyButton.textContent = dictionary.copyFailed;
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
