// PM+ 完整流程数据模型
const PM_DATA = {
  // 用户状态
  state: {
    currentWeek: 0, // 0=预评估未完成, 1-5=对应周次
    currentStep: null, // 当前步骤ID
    weekCompleted: [false, false, false, false, false],
    psychlops: {
      pre: {
        Q1_Text: "",
        Q1_Score: 0,
        Q2_Text: "",
        Q2_Score: 0,
        Q3_Text: "",
        Q3_Score: 0,
        Q4_Score: 0,
      },
      weekly: [], // 每周评估分数
      post: null,
    },
    problems: [], // 用户识别的问题列表
    solvableProblems: [], // 可解决问题
    currentProblem: null, // 当前处理的问题
    solutions: [], // 头脑风暴方案
    selectedSolutions: [], // 筛选后的方案
    actionPlan: null, // 行动计划
    activities: [], // 行为激活活动
    activityPlan: null, // 活动计划
    socialSupport: {
      hasTrustedPerson: null,
      plan: null,
    },
    homework: null, // 当前作业
    homeworkProgress: 0, // 作业完成进度
    emotionKeywords: [], // 提取的情绪关键词
    bodyReactions: [], // 提取的身体反应
    breathingDifficulty: null,
    crisisTriggered: false,
    moodLog: [], // 心情记录
    journalEntries: [], // 日记条目
    isProMember: false, // 是否解锁专业版 (付费闭环)
    unlockedPM: false, // 是否解锁PM+ (商业流转)
    membershipType: null, // 会员类型: 'single'|'monthly'|'yearly'|null
    proMemberExpireDate: null, // 专业会员到期日期 (年度会员专用)
    mindGraphData: [50, 50, 50, 50, 50, 50], // 用户心理图谱数据 (实时反馈)
    chatHistory: [], // 会话历史记录 { week: number, role: 'ai'|'user', content: string, time: number }
    mindGraphHistory: [
      // 心理图谱历史记录
      {
        date: "2026-01-07",
        time: "09:25",
        reason: "心情打卡：喜悦",
        type: "mood",
        icon: "fa-smile",
        data: [70, 45, 60, 65, 55, 60],
      },
      {
        date: "2026-01-05",
        time: "14:20",
        reason: "完成测评：焦虑度自测 (SAS)",
        type: "assessment",
        icon: "fa-clipboard-check",
        data: [65, 50, 55, 60, 50, 55],
      },
      {
        date: "2026-01-03",
        time: "10:00",
        reason: "完成第二周：问题解决",
        type: "pm",
        icon: "fa-graduation-cap",
        data: [65, 60, 55, 60, 55, 50],
      },
      {
        date: "2026-01-01",
        time: "21:15",
        reason: "完成一篇情绪日记",
        type: "journal",
        icon: "fa-book-open",
        data: [58, 55, 50, 58, 48, 45],
      },
      {
        date: "2025-12-27",
        time: "11:30",
        reason: "完成第一周：呼吸训练",
        type: "pm",
        icon: "fa-graduation-cap",
        data: [55, 50, 45, 55, 45, 40],
      },
      {
        date: "2025-12-20",
        time: "15:45",
        reason: "初始评估完成",
        type: "system",
        icon: "fa-star",
        data: [40, 45, 30, 50, 40, 35],
      },
    ],
  },

  // 问题库
  problemOptions: [
    { id: "study_pressure", text: "学习压力太大", icon: "fa-book" },
    { id: "sleep_poor", text: "睡眠质量很差", icon: "fa-moon" },
    { id: "family_conflict", text: "与家人关系紧张", icon: "fa-home" },
    { id: "social_anxiety", text: "社交感到焦虑", icon: "fa-users" },
    { id: "emotional_trouble", text: "情感/人际困扰", icon: "fa-heart-crack" },
    { id: "future_confusion", text: "对未来感到迷茫", icon: "fa-compass" },
    { id: "mood_low", text: "情绪经常低落", icon: "fa-face-sad-tear" },
    { id: "attention_deficit", text: "注意力难以集中", icon: "fa-brain" },
    { id: "eating_issue", text: "饮食问题", icon: "fa-utensils" },
    {
      id: "self_doubt",
      text: "自我怀疑/不自信",
      icon: "fa-person-circle-question",
    },
  ],

  // 功能影响选项 (Q3固定)
  functionOptions: [
    { id: "study", text: "学习", icon: "fa-graduation-cap" },
    { id: "sleep", text: "睡眠", icon: "fa-bed" },
    { id: "social", text: "社交", icon: "fa-comments" },
    { id: "eating", text: "饮食", icon: "fa-utensils" },
    { id: "exercise", text: "运动", icon: "fa-dumbbell" },
    { id: "attention", text: "注意力集中", icon: "fa-bullseye" },
    { id: "hobby", text: "兴趣爱好", icon: "fa-palette" },
    { id: "family", text: "家庭关系", icon: "fa-house-chimney-heart" },
  ],

  // 呼吸训练困难选项
  breathingDifficulties: [
    {
      id: "timing",
      text: "难以按秒数控制呼吸",
      solution:
        "不用太担心是否严格按秒数，这个练习的主要目的只是以最适合自己的方法放慢呼吸。一旦你掌握了如何放慢呼吸节奏，就可以尝试计数或腹式呼吸。",
    },
    {
      id: "anxiety",
      text: "太焦虑了，无法放慢呼吸",
      solution:
        "马上做到对任何人来说都很困难。可以识别自己感到焦虑的早期迹象，这样就能更早开始放慢呼吸。也可以安排一天中的特定时段来练习，比如睡前5分钟。",
    },
    {
      id: "overthink",
      text: "过分专注呼吸，反而更焦虑",
      solution:
        "可以专注于时钟的秒针跳动或歌曲中的音乐节拍，跟着节奏呼吸，而不是只专注于呼吸本身。",
    },
    {
      id: "dizzy",
      text: "感到头晕或失去控制",
      solution:
        "这些感觉是安全的，你并没有失去控制。可以专注地呼出空气（只是呼气），然后让吸气自然发生，之后再重新关注整个呼吸过程。",
    },
  ],

  // 行为激活 - 愉快活动
  pleasantActivities: {
    connect: {
      title: "与外界联系",
      items: [
        "拜访朋友或家人",
        "给朋友打电话",
        "参加聚会",
        "制作礼物",
        "玩游戏",
      ],
    },
    selfCare: {
      title: "照顾自己",
      items: ["按时起床", "洗澡换衣服", "梳理头发", "护肤保养"],
    },
    meTime: {
      title: "给自己留时间",
      items: [
        "吃大餐",
        "读书",
        "放松冥想",
        "烹饪",
        "听音乐",
        "唱歌",
        "跳舞",
        "画画",
        "写日记",
        "看老照片",
        "去喜欢的地方",
      ],
    },
  },

  // 行为激活 - 任务活动
  taskActivities: {
    achieve: {
      title: "达成目标",
      items: ["洗衣服", "打扫房间", "整理书桌", "买日用品", "做饭", "完成作业"],
    },
    active: {
      title: "活跃起来",
      items: ["散步", "尝试新活动", "骑自行车", "做运动", "与朋友玩耍"],
    },
  },

  // 周次信息
  weeks: [
    {
      num: 1,
      title: "心理教育与压力管理",
      desc: "了解PM+，学习呼吸训练",
      icon: "fa-wind",
      color: "#E8F5E9",
      iconColor: "#388E3C",
    },
    {
      num: 2,
      title: "问题管理策略",
      desc: "拆解问题，制定行动计划",
      icon: "fa-list-check",
      color: "#FFF3E0",
      iconColor: "#F57C00",
    },
    {
      num: 3,
      title: "行为激活",
      desc: "打破不活动的恶性循环",
      icon: "fa-person-running",
      color: "#E3F2FD",
      iconColor: "#1976D2",
    },
    {
      num: 4,
      title: "加强社会支持",
      desc: "建立你的心理安全网",
      icon: "fa-users",
      color: "#FCE4EC",
      iconColor: "#C2185B",
    },
    {
      num: 5,
      title: "保持健康与结束",
      desc: "总结成果，预防复发",
      icon: "fa-sun",
      color: "#FFF8E1",
      iconColor: "#FFA000",
    },
  ],

  // 测评列表
  assessments: [
    {
      id: "mbti",
      title: "16型人格测试",
      desc: "深度剖析你的性格类型、职业天赋及人际风格",
      emoji: "🎭",
      tag: "专业量表",
      tagType: "free",
      price: "免费",
      count: 15823,
    },
    {
      id: "sas",
      title: "焦虑度自测 (SAS)",
      desc: "WHO推荐的焦虑症筛查量表，快速识别心理压强",
      emoji: "🌡️",
      tag: "临床量表",
      tagType: "pro",
      price: "¥9.9",
      count: 8742,
    },
    {
      id: "phq9",
      title: "抑郁度自测 (PHQ-9)",
      desc: "国际通用的抑郁症筛查量表，及早发现情绪信号",
      emoji: "💭",
      tag: "临床量表",
      tagType: "pro",
      price: "¥9.9",
      count: 6521,
    },
    {
      id: "burnout",
      title: "职业倦怠评估",
      desc: "评估你的工作压力和倦怠程度",
      emoji: "🔥",
      tag: "职场",
      tagType: "free",
      price: "免费",
      count: 4210,
    },
  ],

  // 能量坊工具
  energyTools: [
    {
      id: "breathing",
      title: "呼吸训练",
      desc: "4-7-8腹式呼吸法，快速平复焦虑",
      icon: "fa-wind",
      color: "#E3F2FD",
      iconColor: "#1976D2",
    },
    {
      id: "grounding",
      title: "5-4-3-2-1着陆",
      desc: "专注当下感官，摆脱焦虑漩涡",
      icon: "fa-hand-holding-heart",
      color: "#E8F5E9",
      iconColor: "#388E3C",
    },
    {
      id: "muscle",
      title: "渐进式肌肉放松",
      desc: "通过紧张-放松循环释放身体压力",
      icon: "fa-person-walking",
      color: "#FFF3E0",
      iconColor: "#F57C00",
    },
    {
      id: "imagery",
      title: "意象引导冥想",
      desc: "想象安全平静的场景，获得内心安宁",
      icon: "fa-cloud-sun",
      color: "#E1F5FE",
      iconColor: "#0288D1",
    },
    {
      id: "fish",
      title: "冥想木鱼",
      desc: "电子消气功，每敲一次减一分压力",
      icon: "fa-bell",
      color: "#FCE4EC",
      iconColor: "#C2185B",
    },
    {
      id: "journal",
      title: "情绪日记",
      desc: "记录心情变化，觉察情绪模式",
      icon: "fa-book-open",
      color: "#FFF8E1",
      iconColor: "#FFA000",
    },
  ],

  // 会员计划配置
  membershipPlans: {
    single: {
      id: "single",
      name: "单次购买",
      desc: "解锁 PM+ 完整课程",
      price: 99,
      originalPrice: 199,
      duration: 0,
      benefits: ["PM+ 5周完整课程", "专业心理测评报告", "课程内容永久访问"],
      icon: "fa-file-invoice",
      color: "#4CAF50",
    },
    monthly: {
      id: "monthly",
      name: "月度会员",
      desc: "1个月内无限次使用",
      price: 39,
      originalPrice: null,
      duration: 30,
      benefits: [
        "无限次查看专业量表报告",
        "无限次使用PM+课程",
        "AI陪伴无限制使用",
        "优先客服支持",
      ],
      icon: "fa-calendar-check",
      color: "#388E3C",
    },
    yearly: {
      id: "yearly",
      name: "年度会员",
      desc: "12个月内无限次使用所有功能",
      price: 199,
      originalPrice: 468,
      duration: 365,
      benefits: [
        "无限次专业量表报告",
        "无限次PM+课程",
        "AI陪伴无限制",
        "专属人工客服",
        "新功能优先体验",
      ],
      icon: "fa-crown",
      color: "#FFA000",
      recommended: true,
    },
  },
};

// 计算PSYCHLOPS分数
function calculatePsychlopsScore(data) {
  if (data.Q2_Text && data.Q2_Score > 0) {
    return data.Q1_Score + data.Q2_Score + data.Q3_Score + data.Q4_Score;
  } else {
    return data.Q1_Score * 2 + data.Q3_Score + data.Q4_Score;
  }
}

// 获取问候语
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return "夜深了";
  if (hour < 12) return "早安";
  if (hour < 14) return "午安";
  if (hour < 18) return "下午好";
  if (hour < 22) return "晚上好";
  return "夜深了";
}

// 保存状态到本地存储
function saveState() {
  localStorage.setItem("pm_state", JSON.stringify(PM_DATA.state));
}

// 从本地存储加载状态
function loadState() {
  const saved = localStorage.getItem("pm_state");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(PM_DATA.state, parsed);
    } catch (e) {
      console.error("Failed to load state:", e);
    }
  }
}

// 调试用：重置状态
function resetApp() {
  if (confirm("确定要重置所有进度吗？这将清除所有记录。")) {
    localStorage.removeItem("pm_state");
    location.reload();
  }
}

// 调试用：快速跳周
function debugJumpToWeek(week) {
  PM_DATA.state.currentWeek = week;
  PM_DATA.state.weekCompleted = Array(5)
    .fill(false)
    .map((_, i) => i < week - 1);

  // 填充必要的mock数据以支持流程
  if (!PM_DATA.state.psychlops.pre.Q1_Text) {
    PM_DATA.state.psychlops.pre = {
      Q1_Text: "工作压力大",
      Q1_Score: 4,
      Q2_Text: "睡眠不好",
      Q2_Score: 3,
      Q3_Text: "难以集中注意力",
      Q3_Score: 3,
      Q4_Score: 3,
    };
  }

  saveState();
  location.reload();
}
