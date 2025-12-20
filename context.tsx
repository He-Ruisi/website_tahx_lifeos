import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Language, AppTheme } from './types';

// Translation Dictionary
export const translations = {
  en: {
    heroTitle: "Tahx",
    heroSubtitle: "Manage Assets, Not Just Expenses.",
    navPhilosophy: "Philosophy",
    navFeatures: "Features",
    navRoadmap: "Roadmap",
    navBeta: "Join Beta",
    
    // Bento Cards
    cardBattery: "Life Battery",
    cardEntry: "AI Entry",
    cardEntryDesc: "Auto-parse natural language",
    cardArch: "Architecture",
    cardArchDesc: "Drift DB + Plugin System",
    cardMap: "Roadmap",
    cardMapDesc: "Technical Plans",
    cardPhil: "Philosophy",
    cardPhilDesc: "Life OS Concept",
    cardBody: "Life Radar",
    cardBodyDesc: "5-Dimension Status",
    
    // Philosophy Section
    philTitle: "Philosophy & Design",
    philSubtitle: "From Expense Tracker to Life OS",
    philConceptTitle: "Core Concept",
    philConceptDesc: "Tahx transforms the traditional expense tracker from a passive recording tool into an active Life OS. It empowers you to manage your life's state, not just your wallet.",
    philArchTitle: "Micro-kernel & Plugins",
    philArchDesc: "Built on a stable micro-kernel with a plugin system. This ensures the core remains lightweight while allowing infinite extensibility for specific needs.",
    philDashTitle: "Negative One Screen",
    philDashDesc: "Your life's cockpit. A customizable Bento Grid dashboard where you define what data matters most—like iOS widgets for your finances.",
    philInteractTitle: "Interaction Revolution",
    philInteractDesc: "Shift from 'I need to track expenses' to 'I want to see my life status'.",
    philLifeCycle: "Asset Lifecycle Pipeline",
    philDeepTitle: "Core Philosophy: Life OS",
    philDeepBody: "Tahx is not just an expense tracker. It is a <strong>Life Operating System (Life OS)</strong>. Traditional apps focus on the \"transaction moment\" (money leaving the wallet). Tahx focuses on \"value persistence\"—how items serve your life and the daily cost of existence.<br/><br/>By tracking the <strong>Survival Cost</strong> (the daily cost to maintain your existence), you gain a new perspective on freedom. Life is a company, and you are the CEO. Your inventory defines your capabilities.",
    
    // Beta Center
    betaTitle: "Join the Beta Lab",
    betaDesc: "Tahx is currently in closed beta. We are looking for early adopters who want to treat their life like a high-growth startup.",
    betaBtnDown: "Download .APK",
    betaBtnSource: "View Source",
    betaLogFile: "latest_build_log.txt",
    betaLog1: "git clone https://github.com/tahx-org/core.git",
    betaLog2: "Cloning into 'tahx-core'...",
    betaLog3: "WARNING: Experimental features enabled [Survival_Mode]",
    betaLog4: "Compiling assets... Done (0.42s)",

    // Beta Modal
    betaModalTitle: "Join the Inner Circle",
    betaModalSubtitle: "Scan to connect with the community",
    wechatLabel: "WeChat Group",
    wechatScan: "Scan QR Code",
    discordLabel: "Discord Community",
    discordBtn: "Join Server",
    
    // AI Chat
    aiTitle: "Tahx AI Assistant",
    aiGreeting: "Ready to treat your life like a company?",
    aiYes: "Yes, take me in.",
    aiBtn: "Yes, enter protocol",
    
    // Modals - Architecture
    archLayer1: "Layer 1: Drift Database",
    archLayer1Desc: "Local-first SQL structure ensuring your data belongs to you. Built on SQLite with JSON extensions. Supports Entity/Event separation.",
    archLayer2: "Layer 2: Plugin System",
    archLayer2Desc: "The nervous system. Connectors for Bank APIs, OCR scanners, and manual input streams. Intelligent mapping rules link inputs to Projects.",
    archLayer3: "Layer 3: Negative One Screen",
    archLayer3Desc: "The interface. A drag-and-drop dashboard (Bento) that acts as the operating system for your life's assets.",
    
    // Modals - Roadmap
    roadmapTitle: "Product Roadmap",
    roadmapCol1: "To Do",
    roadmapCol2: "In Progress",
    roadmapCol3: "Done",
    roadmapItem1: "Bank API Integration",
    roadmapItem2: "Wealth Health Score",
    roadmapItem3: "Legacy Mode",
    roadmapItem4: "Negative One Screen Refine",
    roadmapItem5: "Cloud Backup (Optional)",
    roadmapItem6: "New Theme Engine",
    roadmapItem7: "Core Database (Drift)",
    roadmapItem8: "Basic Asset Entry",
    roadmapItem9: "Multi-language Support",

    quotes: [
      "Spending is instant, but assets are forever.",
      "Track the survival cost, not just the coffee cost.",
      "Life is a company. You are the CEO.",
      "Depreciation is the silent killer of wealth.",
      "Convert your salary into equity in yourself.",
      "Do not just consume. Acquire.",
      "Your inventory defines your capabilities.",
      "Data ownership is the first step to freedom.",
      "Optimize for longevity, not instant gratification.",
      "The 'Negative One Screen' removes the friction."
    ],
    
    aiExamples: [
       "Bought a MacBook Pro M3, $2499",
       "Taxi to Airport, -$45 #System",
       "Trip to Yunnan, -$800 #Soul",
       "Starbucks Latte, -$6",
       "Salary Income, +$5000",
       "Gym Membership, -$500 #Body",
       "Sold Old Switch, +$150",
       "ChatGPT Subscription, -$20",
       "Gift for Mom, -$100 #Social",
       "Bought 'Naval Ravikant', -$15 #Mind"
    ]
  },
  zh: {
    heroTitle: "禾兑",
    heroSubtitle: "管理资产，而不仅仅是消费。",
    navPhilosophy: "理念",
    navFeatures: "架构",
    navRoadmap: "路线图",
    navBeta: "加入内测",
    
    // Bento Cards
    cardBattery: "生命电量",
    cardEntry: "AI 录入",
    cardEntryDesc: "自然语言，自动归档",
    cardArch: "系统架构",
    cardArchDesc: "Drift DB + 插件系统",
    cardMap: "路线图",
    cardMapDesc: "未来开发计划",
    cardPhil: "核心理念",
    cardPhilDesc: "人生操作系统",
    cardBody: "人生雷达",
    cardBodyDesc: "五维状态监控",

    // Philosophy Section
    philTitle: "理念与设计",
    philSubtitle: "从被动记录到主动管理的人生操作系统",
    philConceptTitle: "核心理念",
    philConceptDesc: "禾兑将传统的记账应用从“被动记录工具”转变为“人生操作系统 (Life OS)”。让用户能够主动管理和掌控自己的生活状态。",
    philArchTitle: "微内核+插件化",
    philArchDesc: "采用现代化架构，通过微内核保证核心稳定，通过插件化实现功能扩展。让应用既轻量又强大。",
    philDashTitle: "负一屏仪表盘",
    philDashDesc: "像装配驾驶舱一样自定义你的主页。基于 Bento Grid 的模块化设计，让你决定什么数据对自己最重要。",
    philInteractTitle: "交互变革",
    philInteractDesc: "从“我要去记账”变成“我要去看看我的生活状态”。",
    philLifeCycle: "资产全生命周期流水线",
    philDeepTitle: "核心理念：人生操作系统 (Life OS)",
    philDeepBody: "禾兑不仅仅是一个记账软件，它是一个<strong>人生操作系统 (Life OS)</strong>。传统应用关注“交易时刻”（钱离开钱包的那一刻），而禾兑关注“价值存续”——物品如何服务于你的生活以及存在的每日成本。<br/><br/>通过追踪<strong>生存成本</strong>（维持生存的每日开销），你将获得关于自由的全新视角。人生即公司，你就是 CEO。你的库存定义了你的能力。",

    // Beta Center
    betaTitle: "加入内测实验室",
    betaDesc: "禾兑目前处于封闭测试阶段。我们正在寻找愿意将生活视为高增长初创公司管理的早期采用者。",
    betaBtnDown: "下载 .APK",
    betaBtnSource: "查看源码",
    betaLogFile: "最新构建日志.txt",
    betaLog1: "git clone https://github.com/tahx-org/core.git",
    betaLog2: "正在克隆到 'tahx-core'...",
    betaLog3: "警告: 实验性功能已启用 [生存模式]",
    betaLog4: "编译资源中... 完成 (0.42s)",

    // Beta Modal
    betaModalTitle: "加入内测社区",
    betaModalSubtitle: "扫描二维码或加入服务器",
    wechatLabel: "微信交流群",
    wechatScan: "扫码加入",
    discordLabel: "Discord 社区",
    discordBtn: "加入服务器",

    // AI Chat
    aiTitle: "禾兑 AI 助手",
    aiGreeting: "准备好把你的生活当做公司来经营了吗？",
    aiYes: "是的，带我进入。",
    aiBtn: "是的，启动协议",

    // Modals
    archLayer1: "第一层：Drift 数据库",
    archLayer1Desc: "本地优先的 SQL 结构，确保数据完全属于你。基于 SQLite 构建，支持实体(Entity)与事件(Event)分离设计。",
    archLayer2: "第二层：插件系统",
    archLayer2Desc: "神经系统。连接银行 API、OCR 扫描仪和手动输入流的标准化管道。智能映射规则可自动将输入归类为项目与维度。",
    archLayer3: "第三层：负一屏交互",
    archLayer3Desc: "交互界面。一个可拖拽的仪表盘（Bento），聚合生命电量、现金流跑马灯等组件，作为你人生资产的操作系统。",

    roadmapTitle: "产品路线图",
    roadmapCol1: "待办",
    roadmapCol2: "进行中",
    roadmapCol3: "已完成",
    roadmapItem1: "银行 API 集成",
    roadmapItem2: "财富健康评分",
    roadmapItem3: "遗产/离手模式",
    roadmapItem4: "负一屏交互优化",
    roadmapItem5: "云端备份 (可选)",
    roadmapItem6: "新主题引擎",
    roadmapItem7: "核心数据库 (Drift)",
    roadmapItem8: "基础资产录入",
    roadmapItem9: "多语言支持",

    quotes: [
      "消费是瞬间的，但资产是永恒的。",
      "追踪生存成本，而不仅仅是那一杯咖啡。",
      "人生即公司，你就是 CEO。",
      "折旧是财富的隐形杀手。",
      "将你的薪水转化为自身的股权。",
      "不要只是消费。要去获取。",
      "你的库存定义了你的能力。",
      "数据所有权是自由的第一步。",
      "为长远优化，而非即时满足。",
      "‘负一屏’设计消除了记录的阻力。"
    ],

    aiExamples: [
      "2024-05-20, 滴滴出行, -35.5元",
      "买了一台 MacBook Pro M3, 14999元",
      "云南旅游机票, 2000元 #Soul",
      "星巴克拿铁, -32元",
      "工资收入, +25000元",
      "健身房年卡, -3000元 #Body",
      "出售闲置 Switch, +1200元",
      "订阅 ChatGPT Plus, -20美元",
      "给妈妈发红包, -1000元 #Social",
      "购买《纳瓦尔宝典》, -45元 #Mind"
    ]
  }
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');
  const [theme, setTheme] = useState<AppTheme>('pancanvas');
  const [isPhilosophyOpen, setPhilosophyOpen] = useState(false);
  const [isBetaOpen, setBetaOpen] = useState(false);

  // Apply theme to body background immediately for smoothness
  React.useEffect(() => {
    switch (theme) {
      case 'cyber':
        document.body.style.backgroundColor = '#050505';
        break;
      case 'panyuliang':
        document.body.style.backgroundColor = '#2E243C';
        break;
      case 'pancanvas':
        document.body.style.backgroundColor = '#F2E9E4';
        break;
      case 'panjade':
        document.body.style.backgroundColor = '#D8E2DC';
        break;
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ language, theme, isPhilosophyOpen, isBetaOpen, setLanguage, setTheme, setPhilosophyOpen, setBetaOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export const useT = () => {
  const { language } = useApp();
  return translations[language];
};