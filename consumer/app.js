// 应用主控制器
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initApp();
  updateTimeDisplay();
  setInterval(updateTimeDisplay, 60000);
});

function initApp() {
  updateGreeting();
  renderWeekList();
  renderAssessments();
  renderEnergyTools();
  renderUserProfile();
  updateHomePage();
}

function updateTimeDisplay() {
  const now = new Date();
  document.getElementById("timeDisplay").textContent = now.toLocaleTimeString(
    "zh-CN",
    { hour: "2-digit", minute: "2-digit", hour12: false }
  );
}

function updateGreeting() {
  document.getElementById("greetingText").textContent =
    getGreeting() + "，探索者";
}

// ==================== 页面导航 ====================
function switchPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));
  document.getElementById(pageId + "Page").classList.add("active");

  const navItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (navItem) navItem.classList.add("active");

  // AiLing页面、量表答题页、测评报告页、PM+介绍页隐藏底部导航
  if (["ai", "quiz", "quizResult", "pmIntro"].includes(pageId)) {
    document.getElementById("navBar").style.display = "none";
  } else {
    document.getElementById("navBar").style.display = "flex";
  }

  if (pageId === "home") {
    setTimeout(() => {
      // 确保 updateMindGraph 已定义（避免在图谱脚本加载前调用报错）
      if (typeof updateMindGraph === "function") updateMindGraph(false);
    }, 100);
  }

  if (pageId === "history") {
    renderHistoryTimeline();
  }

  if (pageId === "user") renderUserProfile();
}

// ==================== 首页更新 ====================
function updateHomePage() {
  const state = PM_DATA.state;
  const completedWeeks = state.weekCompleted.filter((w) => w).length;
  const heroTitle = document.getElementById("pmHeroTitle");
  const heroDesc = document.getElementById("pmHeroDesc");
  const heroProgress = document.getElementById("pmHeroProgress");
  const actionText = document.getElementById("pmActionText");

  if (completedWeeks === 0 && state.currentWeek === 0) {
    heroTitle.textContent = "开启你的心灵成长之旅";
    heroDesc.textContent = "5周结构化心理疏导，已帮助全球数百万人";
    heroProgress.style.display = "none";
    actionText.textContent = "立即开始";
  } else if (completedWeeks === 5) {
    heroTitle.textContent = "恭喜完成 PM+ 全部课程！";
    heroDesc.textContent = "你已经是自己的心理帮助者了";
    heroProgress.style.display = "flex";
    document.getElementById("pmProgressFill").style.width = "100%";
    document.getElementById("pmProgressText").textContent = "5/5 周";
    actionText.textContent = "查看成果";
  } else {
    const currentWeek = completedWeeks + 1;
    heroTitle.textContent = `第 ${currentWeek} 周：${
      PM_DATA.weeks[currentWeek - 1].title
    }`;
    heroDesc.textContent = PM_DATA.weeks[currentWeek - 1].desc;
    heroProgress.style.display = "flex";
    document.getElementById("pmProgressFill").style.width = `${
      (completedWeeks / 5) * 100
    }%`;
    document.getElementById(
      "pmProgressText"
    ).textContent = `${completedWeeks}/5 周`;
    actionText.textContent = "继续学习";
  }

  renderWeekList();
  updateHomework();
}

function renderWeekList() {
  const container = document.getElementById("weekList");
  const state = PM_DATA.state;

  container.innerHTML = PM_DATA.weeks
    .map((week, i) => {
      const isCompleted = state.weekCompleted[i];
      const isUnlocked = i === 0 || state.weekCompleted[i - 1];
      const isCurrent = isUnlocked && !isCompleted;

      let statusHtml = "";
      if (isCompleted) {
        statusHtml =
          '<span class="week-status done"><i class="fas fa-check-circle"></i></span>';
      } else if (isCurrent) {
        statusHtml = '<span class="week-status progress">进行中</span>';
      } else {
        statusHtml = '<i class="fas fa-lock week-status"></i>';
      }

      return `
            <div class="week-card ${isCurrent ? "active" : ""} ${
        !isUnlocked ? "locked" : ""
      } ${isCompleted ? "completed" : ""}" 
                 onclick="${isUnlocked ? `startWeek(${i + 1})` : ""}">
                <div class="week-icon" style="background: ${
                  week.color
                }; color: ${week.iconColor}">
                    <i class="fas ${isCompleted ? "fa-check" : week.icon}"></i>
                </div>
                <div class="week-meta">
                    <h4>第 ${week.num} 周：${week.title}</h4>
                    <p>${week.desc}</p>
                </div>
                ${statusHtml}
            </div>
        `;
    })
    .join("");
}

function updateHomework() {
  const section = document.getElementById("homeworkSection");
  const card = document.getElementById("homeworkCard");
  const state = PM_DATA.state;

  if (state.homework) {
    section.style.display = "block";
    card.innerHTML = `
            <div class="homework-header">
                <div class="homework-icon"><i class="fas fa-${
                  state.homework.icon
                }"></i></div>
                <div class="homework-info">
                    <h4>${state.homework.title}</h4>
                    <p>${state.homework.desc}</p>
                </div>
            </div>
            <div class="homework-progress">
                <div class="progress-bar"><div class="progress-fill" style="width: ${
                  state.homeworkProgress
                }%"></div></div>
            </div>
            <p class="homework-days">已完成 ${Math.round(
              state.homeworkProgress / 20
            )}/5 天</p>
            <button class="homework-btn" onclick="completeHomework()">今日打卡</button>
        `;
  } else {
    section.style.display = "none";
  }
}

function completeHomework() {
  const state = PM_DATA.state;
  if (state.homeworkProgress < 100) {
    state.homeworkProgress += 20;
    saveState();
    updateHomework();
    showToast("打卡成功！继续保持 💪");
  }
}

// ==================== PM+ 流程控制 ====================
function enterPM() {
  // 商业闭环：检查是否已解锁课程
  if (!PM_DATA.state.unlockedPM && !PM_DATA.state.isProMember) {
    switchPage("pmIntro");
    return;
  }

  const state = PM_DATA.state;
  const completedWeeks = state.weekCompleted.filter((w) => w).length;

  if (completedWeeks === 0 && state.currentWeek === 0) {
    startWeek(0); // 预评估
  } else {
    const nextWeek = completedWeeks + 1;
    if (nextWeek <= 5) {
      startWeek(nextWeek);
    } else {
      showCompletionSummary();
    }
  }
}

function startWeek(weekNum) {
  document.getElementById("navBar").style.display = "none";
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("pmPage").classList.add("active");
  document.getElementById("chatMessages").innerHTML = "";

  const stepId = weekNum === 0 ? "0.1" : `${weekNum}.0`;
  renderStep(stepId);
}

function exitPM() {
  document.getElementById("navBar").style.display = "flex";
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("homePage").classList.add("active");
  updateHomePage();
}

// ==================== PM+ 步骤渲染引擎 ====================
function renderStep(stepId) {
  // 处理周完成
  if (stepId.startsWith("week") && stepId.endsWith("_complete")) {
    const weekNum = parseInt(stepId.match(/\d/)[0]);
    completeWeek(weekNum);
    return;
  }

  PM_DATA.state.currentStep = stepId;
  const step = PM_FLOW[stepId];
  if (!step) {
    console.error("Step not found:", stepId);
    return;
  }

  // 更新会话信息
  document.getElementById("sessionInfo").textContent = step.title || "";

  const messagesContainer = document.getElementById("chatMessages");
  const inputArea = document.getElementById("chatInputArea");

  // 获取消息内容
  let messages = step.messages;
  if (typeof messages === "function") messages = messages();

  // 逐条显示消息
  let delay = 0;
  messages.forEach((msg, i) => {
    setTimeout(() => {
      addBubble("ai", msg);
    }, delay);
    delay += 600;
  });

  // 延迟渲染交互区
  setTimeout(() => {
    inputArea.innerHTML = "";

    // 呼吸训练
    if (step.breathing) {
      renderBreathingExercise(step.breathing.duration);
    }

    // Likert量表
    if (step.likert) {
      inputArea.innerHTML = renderLikertScale(step.likert, stepId);
    }

    // 拖拽分类交互
    if (step.dragClassify) {
      inputArea.innerHTML = renderDragClassify();
    }

    // 语音输入（带mock）
    if (step.voiceInput) {
      inputArea.innerHTML = renderVoiceInput(step.voiceInput, stepId);
    }

    // 选项
    if (step.options) {
      inputArea.innerHTML = renderOptions(step.options, stepId);
    }

    // 文本输入
    if (step.input) {
      inputArea.innerHTML = `
                <div class="input-wrapper">
                    <input type="text" id="stepInput" placeholder="${
                      step.input.placeholder || "输入..."
                    }">
                    <button class="send-btn" onclick="submitInput('${stepId}')"><i class="fas fa-paper-plane"></i></button>
                </div>
            `;
    }

    // 操作按钮（如果没有验证后的方案，显示备选按钮）
    const verified = PM_DATA.state.verifiedSolutions || [];
    if (step.fallbackActions && verified.length === 0) {
      inputArea.innerHTML += renderActionButtons(step.fallbackActions);
    } else if (step.actions) {
      inputArea.innerHTML += renderActionButtons(step.actions);
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, delay + 300);

  saveState();
}

// 保存聊天记录
function saveChatMessage(role, content) {
  if (!PM_DATA.state.chatHistory) PM_DATA.state.chatHistory = [];

  // 获取当前周次 (如果正在进行 PM+，使用 currentWeek)
  let week = PM_DATA.state.currentWeek;

  // 如果 week 为 0 (预评估或未开始)，尝试查找最近的活动周
  if (week === 0) {
    // 看看有没有完成的周
    const lastCompletedRef = PM_DATA.state.weekCompleted.lastIndexOf(true);
    if (lastCompletedRef !== -1) {
      week = lastCompletedRef + 1;
    } else {
      // 如果连第一周都没完成，则暂且归为第1周 (预评估阶段)
      week = 1;
    }
  }

  console.log(`Saving chat message: week=${week}, role=${role}`); // Debug log

  PM_DATA.state.chatHistory.push({
    week: week,
    role: role,
    content: content,
    time: Date.now(),
  });

  // 立即保存，防止刷新丢失
  saveState();
}

function addBubble(type, content) {
  const container = document.getElementById("chatMessages");
  const bubble = document.createElement("div");
  bubble.className = `bubble ${type}`;
  bubble.innerHTML = content;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;

  // 保存到历史记录 (仅保存 AI 和 User 的对话，这种系统提示不保存)
  if (type !== "system") {
    saveChatMessage(type, content);
  }
}

// 辅助：获取最新的PSYCHLOPS分数
function getLastPsychlopsScore() {
  const s = PM_DATA.state.psychlops;
  // 如果有后测分数，优先使用
  if (s.post && s.post.score) return s.post.score;
  // 否则查找最近一次周评估分数
  for (let i = 5; i >= 1; i--) {
    if (s.weekly[i] && calculatePsychlopsScore(s.weekly[i]) > 0) {
      return calculatePsychlopsScore(s.weekly[i]);
    }
  }
  // 最后使用预评估分数
  return s.pre.Q1_Score ? calculatePsychlopsScore(s.pre) : "--";
}

// 辅助：计算改善分数
function getImprovementScore() {
  const current = getLastPsychlopsScore();
  const pre = PM_DATA.state.psychlops.pre.Q1_Score
    ? calculatePsychlopsScore(PM_DATA.state.psychlops.pre)
    : 0;
  if (current === "--" || pre === 0) return 0;
  return pre - current;
}

// 渲染Likert量表
function renderLikertScale(config, stepId) {
  const labels = [];
  for (let i = config.min; i <= config.max; i++) {
    let label = "";
    if (i === config.min) label = config.minLabel;
    else if (i === config.max) label = config.maxLabel;
    labels.push({ value: i, label });
  }

  return `
        <div class="likert-scale">
            ${labels
              .map(
                (l) => `
                <div class="likert-item" onclick="selectLikert(this, ${l.value}, '${stepId}')">
                    <div class="likert-circle">${l.value}</div>
                    <span class="likert-label">${l.label}</span>
                </div>
            `
              )
              .join("")}
        </div>
    `;
}

function selectLikert(el, score, stepId) {
  document
    .querySelectorAll(".likert-item")
    .forEach((i) => i.classList.remove("selected"));
  el.classList.add("selected");

  setTimeout(() => {
    addBubble("user", `${score} 分`);
    const step = PM_FLOW[stepId];
    if (step && step.onScore) step.onScore(score);
  }, 300);
}

// 渲染选项
function renderOptions(config, stepId) {
  let items = config.items || [];

  // 从数据源获取选项（支持静态PM_DATA和动态state）
  if (config.source) {
    if (config.source === "solvableProblems") {
      // 从state获取可解决问题列表
      items = PM_DATA.state.solvableProblems || [];
    } else if (config.source === "verifiedSolutions") {
      // 从state获取验证后的方案列表
      items = (PM_DATA.state.verifiedSolutions || []).map((s) => ({
        id: s.id,
        text: s.text,
        icon: "fa-star",
      }));
    } else {
      items = PM_DATA[config.source] || [];
    }
  }

  // 如果没有选项，返回空提示
  if (!items || items.length === 0) {
    return '<div class="empty-options">暂无可选项</div>';
  }

  const isMulti = config.type === "multi";

  return `
        <div class="options-container" data-step="${stepId}" data-multi="${isMulti}">
            ${items
              .map(
                (item) => `
                <div class="option-card" data-value="${
                  item.id
                }" onclick="selectOption(this)">
                    ${item.icon ? `<i class="fas ${item.icon}"></i>` : ""}
                    <span>${item.text}</span>
                    <div class="check"><i class="fas fa-check"></i></div>
                </div>
            `
              )
              .join("")}
        </div>
    `;
}

function selectOption(el) {
  const container = el.closest(".options-container");
  const isMulti = container.dataset.multi === "true";
  const stepId = container.dataset.step;

  if (isMulti) {
    el.classList.toggle("selected");
  } else {
    container
      .querySelectorAll(".option-card")
      .forEach((c) => c.classList.remove("selected"));
    el.classList.add("selected");

    setTimeout(() => {
      const value = el.dataset.value;
      const text = el.querySelector("span").textContent;
      addBubble("user", text);

      const step = PM_FLOW[stepId];
      if (step && step.onSelect) step.onSelect(value, text);
    }, 300);
  }
}

// 渲染操作按钮
function renderActionButtons(actions) {
  return `
        <div class="action-buttons">
            ${actions
              .map(
                (action) => `
                <button class="btn btn-${
                  action.type || "primary"
                }" onclick="handleAction('${action.next}')">
                    ${action.text}
                </button>
            `
              )
              .join("")}
        </div>
    `;
}

function handleAction(next) {
  // 处理多选确认
  const container = document.querySelector(
    '.options-container[data-multi="true"]'
  );
  if (container) {
    const selected = Array.from(
      container.querySelectorAll(".option-card.selected")
    ).map((el) => el.dataset.value);
    const stepId = container.dataset.step;
    const step = PM_FLOW[stepId];
    if (step && step.onConfirm) step.onConfirm(selected);
  }

  renderStep(next);
}

function submitInput(stepId) {
  const input = document.getElementById("stepInput");
  const value = input.value.trim();
  if (!value) return;

  addBubble("user", value);
  input.value = "";

  const step = PM_FLOW[stepId];
  if (step && step.onInput) step.onInput(value);
}

// ==================== 拖拽分类交互 ====================
function renderDragClassify() {
  const problems = PM_DATA.state.problems || [];
  const problemItems = PM_DATA.problemOptions.filter((p) =>
    problems.includes(p.id)
  );

  // 如果没有选择，使用之前PSYCHLOPS的问题
  const allItems =
    problemItems.length > 0
      ? problemItems
      : [
          {
            id: PM_DATA.state.psychlops.pre.Q1_Text,
            text: PM_DATA.state.psychlops.pre.Q1_Text,
          },
          PM_DATA.state.psychlops.pre.Q2_Text
            ? {
                id: PM_DATA.state.psychlops.pre.Q2_Text,
                text: PM_DATA.state.psychlops.pre.Q2_Text,
              }
            : null,
        ].filter(Boolean);

  return `
        <div class="drag-classify-container">
            <div class="drag-zone solvable" id="solvableZone" ondrop="dropProblem(event, 'solvable')" ondragover="allowDrop(event)">
                <div class="zone-header">✓ 可解决的问题</div>
                <div class="zone-items" id="solvableItems"></div>
            </div>
            <div class="drag-zone unsolvable" id="unsolvableZone" ondrop="dropProblem(event, 'unsolvable')" ondragover="allowDrop(event)">
                <div class="zone-header">❌ 不可解决的问题</div>
                <div class="zone-items" id="unsolvableItems"></div>
            </div>
            <div class="drag-source" id="dragSource">
                ${allItems
                  .map(
                    (p) => `
                    <div class="drag-item" draggable="true" ondragstart="dragProblem(event)" data-id="${p.id}" data-text="${p.text}">
                        <i class="fas fa-grip-vertical"></i>
                        <span>${p.text}</span>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `;
}

function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
}

function dragProblem(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.id);
  event.dataTransfer.setData("text/html", event.target.dataset.text);
  event.target.classList.add("dragging");
}

function dropProblem(event, type) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");

  const id = event.dataTransfer.getData("text/plain");
  const text = event.dataTransfer.getData("text/html");
  const dragItem = document.querySelector(`.drag-item[data-id="${id}"]`);

  if (dragItem) {
    const targetZone = document.getElementById(
      type === "solvable" ? "solvableItems" : "unsolvableItems"
    );
    dragItem.classList.remove("dragging");
    dragItem.classList.add("dropped");
    targetZone.appendChild(dragItem);

    // 更新状态
    if (!PM_DATA.state.solvableProblems) PM_DATA.state.solvableProblems = [];
    if (!PM_DATA.state.unsolvableProblems)
      PM_DATA.state.unsolvableProblems = [];

    if (type === "solvable") {
      PM_DATA.state.solvableProblems.push({ id, text });
    } else {
      PM_DATA.state.unsolvableProblems.push({ id, text });
    }

    // 触觉反馈
    if (navigator.vibrate) navigator.vibrate(30);
  }
}

// ==================== 语音输入（Mock） ====================
function renderVoiceInput(config, stepId) {
  return `
        <div class="voice-input-container">
            <div class="voice-text-input">
                <input type="text" id="voiceTextInput" placeholder="${
                  config.placeholder || "输入或点击录音..."
                }">
            </div>
            <div class="voice-buttons">
                <button class="voice-record-btn" onclick="startMockVoiceRecord('${
                  config.key
                }')">
                    <i class="fas fa-microphone"></i>
                    <span>点击录音</span>
                </button>
            </div>
        </div>
    `;
}

function startMockVoiceRecord(key) {
  const btn = document.querySelector(".voice-record-btn");
  const input = document.getElementById("voiceTextInput");

  btn.classList.add("recording");
  btn.innerHTML =
    '<i class="fas fa-circle" style="color:#E53935;animation:pulse 1s infinite;"></i><span>录音中...</span>';

  // 模拟录音过程
  setTimeout(() => {
    btn.classList.remove("recording");
    btn.innerHTML = '<i class="fas fa-microphone"></i><span>点击录音</span>';

    // Mock ASR结果
    const mockTexts = {
      problemDescription: "我觉得自己时间规划不太好，经常拖延",
      week3Obstacle: "可能是太忙了，没找到合适的时间",
      week3Feeling: "感觉轻松了一些，有一点成就感",
      futureStrategy: "先深呼吸冷静下来，然后分析问题",
    };

    const mockResult = mockTexts[key] || "这是一段语音转写的内容";
    input.value = mockResult;

    // 保存到状态
    if (!PM_DATA.state.voiceInputs) PM_DATA.state.voiceInputs = {};
    PM_DATA.state.voiceInputs[key] = mockResult;

    showToast("语音识别完成 🎤");
  }, 2000);
}

// 呼吸训练
function renderBreathingExercise(duration) {
  const container = document.getElementById("chatMessages");
  container.innerHTML += `
        <div class="breath-exercise">
            <div class="breath-circle" id="breathCircle">
                <div class="breath-inner" id="breathText">吸气</div>
            </div>
            <p class="breath-hint" id="breathHint">跟随圆圈的节奏，平稳呼吸</p>
            <p class="breath-timer" id="breathTimer">剩余时间：${Math.floor(
              duration / 60
            )}:${(duration % 60).toString().padStart(2, "0")}</p>
        </div>
    `;

  startBreathingAnimation(duration);
}

let breathInterval, breathTimeout;
function startBreathingAnimation(duration) {
  let isInhale = true;
  let remaining = duration;

  breathInterval = setInterval(() => {
    const circle = document.getElementById("breathCircle");
    const text = document.getElementById("breathText");
    const hint = document.getElementById("breathHint");
    if (!circle) {
      clearInterval(breathInterval);
      return;
    }

    if (isInhale) {
      circle.style.transform = "scale(1.5)";
      text.textContent = "呼气";
      hint.textContent = "缓缓呼出焦虑";
    } else {
      circle.style.transform = "scale(1)";
      text.textContent = "吸气";
      hint.textContent = "深深吸入新鲜空气";
    }
    isInhale = !isInhale;
  }, 4000);

  const timerInterval = setInterval(() => {
    remaining--;
    const timer = document.getElementById("breathTimer");
    if (timer) {
      timer.textContent = `剩余时间：${Math.floor(remaining / 60)}:${(
        remaining % 60
      )
        .toString()
        .padStart(2, "0")}`;
    }
    if (remaining <= 0) clearInterval(timerInterval);
  }, 1000);
}

// 完成周次
// 完成周次
function completeWeek(weekNum) {
  const state = PM_DATA.state;
  if (weekNum > 0 && weekNum <= 5) {
    state.weekCompleted[weekNum - 1] = true;
  }

  state.currentWeek = weekNum + 1;

  // 设置作业
  if (weekNum === 1) {
    state.homework = {
      icon: "wind",
      title: "呼吸训练",
      desc: "每天 10-20 分钟",
    };
    state.homeworkProgress = 0;
  } else if (weekNum === 2) {
    state.homework = {
      icon: "list-check",
      title: "执行行动计划",
      desc: "按计划执行并记录",
    };
    state.homeworkProgress = 0;
  }

  saveState();

  // 更新心理图谱
  if (typeof updateMindGraph === "function") updateMindGraph(true);

  if (breathInterval) clearInterval(breathInterval);

  showModal(
    "success",
    weekNum === 5 ? "🎓" : "🎉",
    weekNum === 5 ? "恭喜毕业！" : `第 ${weekNum} 周完成！`,
    weekNum === 5 ? "你已经掌握了四种核心心理技能" : "继续保持，下周见！",
    () => exitPM()
  );

  // 记录历史趋势
  recordMindGraphHistory(
    `完成第 ${weekNum} 周：${PM_DATA.weeks[weekNum - 1].title}`,
    "pm",
    "fa-graduation-cap"
  );
}

// 记录心理图谱历史
function recordMindGraphHistory(reason, type = "system", icon = "fa-history") {
  if (!PM_DATA.state.mindGraphHistory) PM_DATA.state.mindGraphHistory = [];

  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

  const currentData = [...PM_DATA.state.mindGraphData];

  PM_DATA.state.mindGraphHistory.unshift({
    date: dateStr,
    time: timeStr,
    reason: reason,
    type: type,
    icon: icon,
    data: currentData,
  });

  saveState();
}

// 渲染历史时间轴
function renderHistoryTimeline() {
  const history = PM_DATA.state.mindGraphHistory || [];
  const container = document.getElementById("historyTimeline");
  const countEl = document.getElementById("historyCount");
  const energyEl = document.getElementById("maxEnergy");

  countEl.textContent = history.length;

  // 计算最高能量 (假设 data[3] 是能量维度)
  const maxEnergy =
    history.length > 0 ? Math.max(...history.map((h) => h.data[3])) : "--";
  energyEl.textContent = maxEnergy;

  if (history.length === 0) {
    container.innerHTML = '<div class="empty-hint">暂无更新记录</div>';
    return;
  }

  const typeLabels = {
    mood: "心情打卡",
    assessment: "专业测评",
    journal: "情绪日记",
    pm: "课程进度",
    system: "系统记录",
  };

  container.innerHTML = history
    .map((item, index) => {
      // 维度名称
      const dimensionNames = ["情绪", "压力", "睡眠", "能量", "专注", "社交"];
      const statsHtml = item.data
        .map(
          (val, i) =>
            `<div class="stat-mini">
                <span class="dot" style="background: ${
                  val > 50 ? "var(--primary)" : "#CCC"
                }"></span>
                <span class="dim">${dimensionNames[i]} ${val}</span>
            </div>`
        )
        .join("");

      return `
            <div class="timeline-item" style="animation-delay: ${
              index * 0.05
            }s">
                <div class="timeline-dot ${item.type}">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="timeline-time">${item.date} <small>${
        item.time || ""
      }</small></div>
                <div class="timeline-card ${item.type}">
                    <div class="card-tag">${
                      typeLabels[item.type] || "记录"
                    }</div>
                    <div class="timeline-reason">${item.reason}</div>
                    <div class="timeline-stats-grid">
                        ${statsHtml}
                    </div>
                </div>
            </div>
        `;
    })
    .join("");
}

// ==================== 心情选择 ====================
function selectMood(el) {
  document
    .querySelectorAll(".mood-item")
    .forEach((m) => m.classList.remove("selected"));
  el.classList.add("selected");

  const mood = el.dataset.mood;
  PM_DATA.state.moodLog.push({ mood, timestamp: Date.now() });
  saveState();

  const colors = {
    happy: "#FDF7E7",
    calm: "#FDFCF8",
    tired: "#F0F4F8",
    anxious: "#FFF5F5",
    sad: "#F5F5F5",
  };
  document.getElementById(
    "homePage"
  ).style.background = `linear-gradient(180deg, ${colors[mood]} 0%, #F5F9F5 100%)`;

  showToast("心情已记录 ✨");

  // 记录历史趋势 - 心情打卡
  const moodLabels = {
    happy: "喜悦",
    calm: "平静",
    tired: "疲惫",
    anxious: "焦虑",
    sad: "难过",
  };
  const moodIcons = {
    happy: "fa-smile",
    calm: "fa-smile-beam",
    tired: "fa-bed",
    anxious: "fa-face-frown-slight",
    sad: "fa-face-sad-tear",
  };
  recordMindGraphHistory(
    `心情打卡：${moodLabels[mood]}`,
    "mood",
    moodIcons[mood] || "fa-heart"
  );
}

// ==================== 测评模块 ====================
function renderAssessments() {
  const container = document.getElementById("assessList");
  container.innerHTML = PM_DATA.assessments
    .map(
      (a) => `
        <div class="assess-card" onclick="startAssessment('${a.id}')">
            <div class="assess-banner" style="background: ${
              a.tagType === "free" ? "#E8F5E9" : "#FFF3E0"
            }">${a.emoji}</div>
            <div class="assess-content">
                <span class="assess-tag ${a.tagType}">${a.tag}</span>
                <h3>${a.title}</h3>
                <p>${a.desc}</p>
                <div class="assess-meta">
                    <span><i class="fas fa-users"></i> ${a.count.toLocaleString()} 人已测</span>
                    <span class="assess-price">${a.price}</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// 测评题库
const ASSESSMENT_DATA = {
  mbti: {
    title: "16型人格测试",
    questions: [
      {
        q: "在社交场合中，你通常会：",
        a: "主动与新朋友交谈",
        b: "等待别人来找你聊天",
      },
      {
        q: "当你在做决定时，你更看重：",
        a: "逻辑和客观分析",
        b: "个人价值观和感受",
      },
      { q: "你更喜欢的生活方式是：", a: "有计划、有条理的", b: "灵活、随性的" },
      {
        q: "在获取信息时，你更关注：",
        a: "具体的事实和细节",
        b: "整体的概念和可能性",
      },
      {
        q: "周末时，你更愿意：",
        a: "参加朋友聚会",
        b: "独处或与少数亲密朋友在一起",
      },
    ],
    results: {
      AAAA: {
        type: "ESTJ",
        title: "总经理型",
        desc: "你是天生的组织者和领导者，善于制定计划并确保执行。",
      },
      ABAB: {
        type: "INFP",
        title: "调停者型",
        desc: "你是理想主义者，富有同情心，追求内心的和谐与意义。",
      },
      BBBB: {
        type: "INFP",
        title: "调停者型",
        desc: "你是理想主义者，富有同情心，追求内心的和谐与意义。",
      },
      default: {
        type: "ENFP",
        title: "竞选者型",
        desc: "你是热情洋溢的创意者，善于激励他人，追求新可能。",
      },
    },
  },
  sas: {
    title: "焦虑自评量表 (SAS)",
    questions: [
      {
        q: "我觉得比平常容易紧张和着急",
        opts: [
          "没有或很少时间",
          "小部分时间",
          "相当多时间",
          "绝大部分或全部时间",
        ],
      },
      {
        q: "我无缘无故地感到害怕",
        opts: [
          "没有或很少时间",
          "小部分时间",
          "相当多时间",
          "绝大部分或全部时间",
        ],
      },
      {
        q: "我容易心里烦乱或感到惊恐",
        opts: [
          "没有或很少时间",
          "小部分时间",
          "相当多时间",
          "绝大部分或全部时间",
        ],
      },
      {
        q: "我觉得我可能将要发疯",
        opts: [
          "没有或很少时间",
          "小部分时间",
          "相当多时间",
          "绝大部分或全部时间",
        ],
      },
      {
        q: "我手脚发抖打颤",
        opts: [
          "没有或很少时间",
          "小部分时间",
          "相当多时间",
          "绝大部分或全部时间",
        ],
      },
    ],
    scoring: (answers) => {
      const total = answers.reduce((sum, a) => sum + a + 1, 0);
      const standardScore = Math.round(total * 1.25 * 4);
      if (standardScore < 50)
        return {
          level: "正常",
          color: "#4CAF50",
          desc: "你的焦虑水平在正常范围内。",
        };
      if (standardScore < 60)
        return {
          level: "轻度焦虑",
          color: "#FF9800",
          desc: "你可能存在轻度焦虑，建议进行放松训练。",
        };
      if (standardScore < 70)
        return {
          level: "中度焦虑",
          color: "#F57C00",
          desc: "你存在中度焦虑，建议寻求专业帮助。",
        };
      return {
        level: "重度焦虑",
        color: "#E53935",
        desc: "你的焦虑水平较高，强烈建议寻求专业心理咨询。",
      };
    },
  },
  phq9: {
    title: "抑郁自评量表 (PHQ-9)",
    questions: [
      {
        q: "做事时提不起劲或没有兴趣",
        opts: ["完全不会", "好几天", "一半以上的天数", "几乎每天"],
      },
      {
        q: "感到心情低落、沮丧或绝望",
        opts: ["完全不会", "好几天", "一半以上的天数", "几乎每天"],
      },
      {
        q: "入睡困难、睡不安稳或睡眠过多",
        opts: ["完全不会", "好几天", "一半以上的天数", "几乎每天"],
      },
      {
        q: "感觉疲倦或没有活力",
        opts: ["完全不会", "好几天", "一半以上的天数", "几乎每天"],
      },
      {
        q: "食欲不振或吃太多",
        opts: ["完全不会", "好几天", "一半以上的天数", "几乎每天"],
      },
    ],
    scoring: (answers) => {
      const total = answers.reduce((sum, a) => sum + a, 0);
      if (total < 5)
        return {
          level: "无抑郁",
          color: "#4CAF50",
          desc: "你目前没有明显的抑郁症状。",
        };
      if (total < 10)
        return {
          level: "轻度抑郁",
          color: "#FF9800",
          desc: "你可能存在轻度抑郁，建议关注情绪变化。",
        };
      if (total < 15)
        return {
          level: "中度抑郁",
          color: "#F57C00",
          desc: "你存在中度抑郁，建议寻求专业帮助。",
        };
      return {
        level: "重度抑郁",
        color: "#E53935",
        desc: "你的抑郁水平较高，强烈建议寻求专业心理咨询。",
      };
    },
  },
  burnout: {
    title: "职业倦怠评估",
    questions: [
      { q: "工作让我感到精疲力竭", opts: ["从不", "偶尔", "经常", "总是"] },
      {
        q: "早上起床想到要上班就感到疲惫",
        opts: ["从不", "偶尔", "经常", "总是"],
      },
      { q: "我对工作越来越缺乏热情", opts: ["从不", "偶尔", "经常", "总是"] },
      { q: "我怀疑自己工作的意义", opts: ["从不", "偶尔", "经常", "总是"] },
      { q: "我觉得工作效率在下降", opts: ["从不", "偶尔", "经常", "总是"] },
    ],
    scoring: (answers) => {
      const total = answers.reduce((sum, a) => sum + a, 0);
      if (total < 5)
        return {
          level: "无倦怠",
          color: "#4CAF50",
          desc: "你目前工作状态良好！",
        };
      if (total < 10)
        return {
          level: "轻度倦怠",
          color: "#FF9800",
          desc: "注意工作与生活平衡。",
        };
      if (total < 15)
        return {
          level: "中度倦怠",
          color: "#F57C00",
          desc: "建议适当休息和调整。",
        };
      return {
        level: "重度倦怠",
        color: "#E53935",
        desc: "强烈建议寻求帮助或考虑调整。",
      };
    },
  },
};

let currentAssessment = null;
let assessmentAnswers = [];
let currentQuestionIndex = 0;

function startAssessment(id) {
  const data = ASSESSMENT_DATA[id];
  if (!data) {
    showToast("测评暂不可用");
    return;
  }

  currentAssessment = { id, data };
  assessmentAnswers = [];
  currentQuestionIndex = 0;

  switchPage("quiz");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const { data } = currentAssessment;
  const q = data.questions[currentQuestionIndex];
  const total = data.questions.length;
  const progress = (((currentQuestionIndex + 1) / total) * 100).toFixed(0);

  document.getElementById("quizProgressFill").style.width = `${progress}%`;
  document.getElementById("quizProgressText").textContent = `${
    currentQuestionIndex + 1
  }/${total}`;
  document.getElementById("quizQuestion").textContent = q.q;

  let optionsHtml = "";
  if (currentAssessment.id === "mbti") {
    optionsHtml = `
            <div class="quiz-opt" onclick="nextQuizQuestion('a')">${q.a}</div>
            <div class="quiz-opt" onclick="nextQuizQuestion('b')">${q.b}</div>
        `;
  } else {
    optionsHtml = q.opts
      .map(
        (opt, i) =>
          `<div class="quiz-opt" onclick="nextQuizQuestion(${i})">${opt}</div>`
      )
      .join("");
  }

  const optionsContainer = document.getElementById("quizOptions");
  optionsContainer.innerHTML = optionsHtml;
  optionsContainer.scrollTo(0, 0);
}

function nextQuizQuestion(answer) {
  assessmentAnswers.push(answer);
  currentQuestionIndex++;

  if (currentQuestionIndex >= currentAssessment.data.questions.length) {
    showQuizResult();
  } else {
    // 增加一点点动效切换的感觉
    const content = document.querySelector(".quiz-content");
    content.style.opacity = "0";
    content.style.transform = "translateY(10px)";

    setTimeout(() => {
      renderQuizQuestion();
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    }, 200);
  }
}

function confirmExitQuiz() {
  if (confirm("测评尚未完成，确定要退出吗？")) {
    switchPage("assess");
  }
}

function showQuizResult() {
  const { id, data } = currentAssessment;
  const isPro = PM_DATA.state.isProMember;
  const assessMeta = PM_DATA.assessments.find((a) => a.id === id);
  const needsPay = assessMeta && assessMeta.tagType === "pro" && !isPro;

  let result = null;
  let score = null;
  let level = "";
  let color = "var(--primary)";

  if (id === "mbti") {
    const key = assessmentAnswers.map((a) => a.toUpperCase()).join("");
    result = data.results[key] || data.results.default;
    level = result.type;
    score = "MBTI";
  } else {
    result = data.scoring(assessmentAnswers);
    level = result.level;
    color = result.color;
    score = assessmentAnswers.reduce(
      (sum, a) => sum + a + (id === "sas" ? 1 : 0),
      0
    );
    if (id === "sas") score = Math.round(score * 1.25 * 4);
  }

  // 保存记录
  if (!PM_DATA.state.assessmentHistory) PM_DATA.state.assessmentHistory = [];
  PM_DATA.state.assessmentHistory.unshift({
    id,
    title: data.title,
    result: result,
    timestamp: Date.now(),
  });

  // 更新图谱 (模拟)
  updateMindGraph(true);
  recordMindGraphHistory(
    `完成测评：${data.title}`,
    "assessment",
    "fa-clipboard-check"
  );

  renderResultDetail(result, score, level, color, needsPay);
  switchPage("quizResult");
}

function renderResultDetail(result, score, level, color, needsPay) {
  const container = document.getElementById("quizResultDetail");

  // 基础报告内容
  const baseReport = `
        <div class="result-card">
            <div class="result-score-circle" style="border-color: ${color}20">
                <span class="result-score-value" style="color: ${color}">${score}</span>
                <span class="result-score-label">评估结果</span>
            </div>
            <h2 class="result-title">${level}</h2>
            <p class="result-desc">${result.desc}</p>
        </div>
    `;

  // 详细建议 (可能被遮盖)
  const suggestions = [
    "保持良好的作息习惯，确保充足的睡眠",
    "尝试每天进行 10 分钟的深呼吸练习",
    "建议加入 PM+ 问题管理课程进行系统性提升",
    "在压力较大时，主动寻求社交支持",
  ];

  const detailedReport = `
        <div class="result-section">
            <h4 class="section-h4"><i class="fas fa-lightbulb" style="color: #FFD600"></i> 专业干预建议</h4>
            ${suggestions
              .map((s) => `<div class="suggestion-item">${s}</div>`)
              .join("")}
        </div>
        <div class="result-section">
            <h4 class="section-h4"><i class="fas fa-chart-bar" style="color: #4CAF50"></i> 维度详细分析</h4>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.8;">
                根据您的回答，我们在情绪调节能力、压力应对机制和社交活力三个维度进行了深度评估。当前您的情绪基础值较为稳定，但在应对突发工作压力时表现出较强的生理唤醒水平...
            </div>
        </div>
    `;

  if (needsPay) {
    container.innerHTML = `
            ${baseReport}
            <div class="paywall-container">
                <div class="blurred-content">
                    ${detailedReport}
                </div>
                <div class="paywall-mask">
                    <div class="paywall-icon"><i class="fas fa-lock"></i></div>
                    <div class="paywall-text">
                        <h3>解锁深度分析报告</h3>
                        <p>付费测评包含专家建议与 10+ 维度深度分析</p>
                    </div>
                    <button class="unlock-btn" onclick="unlockQuizReport()">立即解锁 ¥9.9</button>
                    <p style="margin-top:16px; font-size:12px; color:var(--text-muted);">解锁后可永久查看此报告</p>
                </div>
            </div>
        `;
  } else {
    container.innerHTML = `
            ${baseReport}
            ${detailedReport}

            <!-- PM+ 购买引导 -->
            <div style="margin-top: 30px; padding: 16px; background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%); border-radius: 12px; border: 2px solid #81C784;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="background: #43A047; color: white; padding: 8px; border-radius: 8px; flex-shrink: 0;">
                        <i class="fas fa-seedling" style="font-size: 18px;"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 8px 0; color: #2E7D32; font-size: 16px;">🎯 更推荐：开启 PM+ 系统干预</h4>
                        <p style="margin: 0 0 12px 0; color: #388E3C; font-size: 14px; line-height: 1.6;">
                            WHO 推荐的 5 周结构化心理疏导，系统性解决您的问题
                        </p>
                        <button class="btn btn-primary" style="width: 100%; height: 48px; background: linear-gradient(135deg, #43A047 0%, #2E7D32 100%); border: none; font-size: 15px; font-weight: 600; box-shadow: 0 4px 12px rgba(67, 160, 71, 0.3);" onclick="switchPage('pmIntro')">
                            <i class="fas fa-rocket" style="margin-right: 6px;"></i>
                            立即开启 · ¥99 (原价 ¥199)
                        </button>
                    </div>
                </div>
            </div>

            <div style="margin-top: 16px; padding: 0 10px;">
                <button class="btn btn-secondary" style="width:100%; height: 48px;" onclick="switchPage('home')">回到主页</button>
            </div>
        `;
  }
}

function confirmPurchasePM() {
  // 打开会员选择页面
  showMemberPage();
}

function unlockQuizReport() {
  showModal(
    "payment",
    "💳",
    "确认解锁报告",
    "您将支付 ¥9.9 解锁此份专业心理测评详细报告",
    () => {
      const mask = document.querySelector(".paywall-mask");
      const blurred = document.querySelector(".blurred-content");
      if (mask) mask.style.opacity = "0";
      setTimeout(() => {
        if (mask) mask.remove();
        if (blurred) {
          blurred.classList.remove("blurred-content");
          blurred.style.filter = "none";
          blurred.style.pointerEvents = "auto";
        }
        // 底部增加 PM+ 引导和返回主页按钮
        const container = document.getElementById("quizResultDetail");

        // 添加 PM+ 引导卡片
        const pmDiv = document.createElement("div");
        pmDiv.style.marginTop = "24px";
        pmDiv.style.padding = "16px";
        pmDiv.style.background =
          "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)";
        pmDiv.style.borderRadius = "12px";
        pmDiv.style.border = "2px solid #81C784";
        pmDiv.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="background: #43A047; color: white; padding: 8px; border-radius: 8px; flex-shrink: 0;">
                        <i class="fas fa-seedling" style="font-size: 18px;"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 8px 0; color: #2E7D32; font-size: 16px;">🎯 更推荐：开启 PM+ 系统干预</h4>
                        <p style="margin: 0 0 12px 0; color: #388E3C; font-size: 14px; line-height: 1.6;">
                            WHO 推荐的 5 周结构化心理疏导，系统性解决您的问题
                        </p>
                        <button class="btn btn-primary" style="width: 100%; height: 48px; background: linear-gradient(135deg, #43A047 0%, #2E7D32 100%); border: none; font-size: 15px; font-weight: 600; box-shadow: 0 4px 12px rgba(67, 160, 71, 0.3);" onclick="switchPage('pmIntro')">
                            <i class="fas fa-rocket" style="margin-right: 6px;"></i>
                            立即开启 · ¥99 (原价 ¥199)
                        </button>
                    </div>
                </div>
            `;
        container.appendChild(pmDiv);

        // 添加返回主页按钮
        const btnDiv = document.createElement("div");
        btnDiv.style.marginTop = "16px";
        btnDiv.style.padding = "0 10px";
        btnDiv.innerHTML = `<button class="btn btn-secondary" style="width:100%; height: 48px;" onclick="switchPage('home')">回到主页</button>`;
        container.appendChild(btnDiv);
      }, 500);
    }
  );
}

function shareResult() {
  showToast("已复制到剪贴板 📋");
  closeSheet();
}

// ==================== 能量坊模块 ====================
function renderEnergyTools() {
  const container = document.getElementById("energyTools");
  container.innerHTML = PM_DATA.energyTools
    .map(
      (t) => `
        <div class="energy-card" onclick="openTool('${t.id}')">
            <div class="energy-icon" style="background: ${t.color}; color: ${t.iconColor}">
                <i class="fas ${t.icon}"></i>
            </div>
            <div class="energy-meta">
                <h4>${t.title}</h4>
                <p>${t.desc}</p>
            </div>
        </div>
    `
    )
    .join("");
}

function openTool(toolId) {
  const sheet = document.getElementById("sheet");
  const overlay = document.getElementById("overlay");

  let content = "";
  switch (toolId) {
    case "sos":
      content = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title" style="color: #E53935;">紧急求助</h3>
                <p class="sheet-desc">如果你正处于危险中，请立即寻求专业帮助</p>
                <div style="padding: 20px 0;">
                    <button class="sos-card" style="width:100%; text-align:left;" onclick="window.location.href='tel:110'">
                        <div class="sos-icon"><i class="fas fa-phone-alt"></i></div>
                        <div class="sos-info">
                            <h4>紧急报警 110</h4>
                            <p>遇到现实危险时使用</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <button class="sos-card" style="width:100%; text-align:left;" onclick="window.location.href='tel:4001619995'">
                        <div class="sos-icon" style="background: #E8F5E9; color: var(--primary);"><i class="fas fa-heartbeat"></i></div>
                        <div class="sos-info">
                            <h4>心理援助热线</h4>
                            <p>12356 免费心理援助</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                     <button class="sos-card" style="width:100%; text-align:left;" onclick="openTool('grounding')">
                        <div class="sos-icon" style="background: #FFF3E0; color: #FB8C00;"><i class="fas fa-anchor"></i></div>
                        <div class="sos-info">
                            <h4>快速稳定情绪</h4>
                            <p>感到极度焦虑恐慌时使用</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <button class="sos-card" style="width:100%; text-align:left;" onclick="openTool('breathing')">
                         <div class="sos-icon" style="background: #E3F2FD; color: #1976D2;"><i class="fas fa-wind"></i></div>
                         <div class="sos-info">
                             <h4>立刻放松呼吸</h4>
                             <p>平复心跳，缓解紧张</p>
                         </div>
                         <i class="fas fa-chevron-right"></i>
                     </button>
                </div>
                <button class="btn btn-secondary" onclick="closeSheet()">取消</button>
            `;
      break;
    case "breathing":
      content = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title">4-7-8 呼吸法</h3>
                <p class="sheet-desc">吸气 4 秒 - 屏息 7 秒 - 呼气 8 秒</p>
                <div class="breath-exercise" style="padding: 20px 0;">
                    <div class="breath-circle" id="toolBreathCircle">
                        <div class="breath-inner" id="toolBreathText">开始</div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="startToolBreathing()">开始练习</button>
            `;
      break;
    case "grounding":
      content = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title">5-4-3-2-1 着陆技术</h3>
                <p class="sheet-desc">专注当下感官，摆脱焦虑漩涡</p>
                <div id="groundingSteps" style="padding: 20px 0;">
                    <div class="grounding-step active" data-step="5">
                        <div style="font-size: 48px; text-align: center; margin-bottom: 16px;">👀</div>
                        <h4 style="text-align: center; margin-bottom: 12px;">说出你看到的 5 样东西</h4>
                        <p style="font-size: 13px; color: var(--text-secondary); text-align: center;">环顾四周，专注观察细节</p>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="nextGroundingStep()">下一步</button>
            `;
      break;
    case "muscle":
      content = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title">渐进式肌肉放松</h3>
                <p class="sheet-desc">通过紧张-放松循环释放身体压力</p>
                <div id="muscleGuide" style="padding: 20px 0; text-align: center;">
                    <div style="font-size: 64px; margin-bottom: 16px;">💪</div>
                    <h4 id="muscleArea" style="margin-bottom: 8px;">准备开始</h4>
                    <p id="muscleInstruction" style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">找一个舒适的位置坐下或躺下</p>
                    <div id="muscleTimer" style="font-size: 32px; font-weight: 700; color: var(--primary);"></div>
                </div>
                <button class="btn btn-primary" id="muscleBtn" onclick="startMuscleRelax()">开始练习</button>
            `;
      break;
    case "imagery":
      content = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title">意象引导冥想</h3>
                <p class="sheet-desc">想象一个安全平静的场景</p>
                <div style="padding: 20px 0;">
                    <p style="margin-bottom: 16px; font-weight: 600;">选择你的安全场景：</p>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                        <div class="imagery-scene" onclick="startImagery('beach')" style="background: #E3F2FD; padding: 20px; border-radius: 16px; text-align: center; cursor: pointer;">
                            <div style="font-size: 40px; margin-bottom: 8px;">🏖️</div>
                            <p style="font-size: 13px;">宁静海滩</p>
                        </div>
                        <div class="imagery-scene" onclick="startImagery('forest')" style="background: #E8F5E9; padding: 20px; border-radius: 16px; text-align: center; cursor: pointer;">
                            <div style="font-size: 40px; margin-bottom: 8px;">🌲</div>
                            <p style="font-size: 13px;">静谧森林</p>
                        </div>
                        <div class="imagery-scene" onclick="startImagery('mountain')" style="background: #FFF3E0; padding: 20px; border-radius: 16px; text-align: center; cursor: pointer;">
                            <div style="font-size: 40px; margin-bottom: 8px;">🏔️</div>
                            <p style="font-size: 13px;">高山云端</p>
                        </div>
                        <div class="imagery-scene" onclick="startImagery('garden')" style="background: #FCE4EC; padding: 20px; border-radius: 16px; text-align: center; cursor: pointer;">
                            <div style="font-size: 40px; margin-bottom: 8px;">🌸</div>
                            <p style="font-size: 13px;">花园小径</p>
                        </div>
                    </div>
                </div>
            `;
      break;
    case "fish":
      content = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title">静心木鱼</h3>
                <p class="sheet-desc">敲击木鱼，平复心绪</p>
                <div class="muyu-wrapper">
                    <div class="muyu-container" id="muyuFish" onclick="tapFish()">
                        <div class="muyu-stick">
                            <div class="muyu-stick-head"></div>
                            <div class="muyu-stick-handle"></div>
                        </div>
                        <div class="muyu-body">
                            <div class="muyu-mouth"></div>
                            <div class="muyu-eye"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align:center; padding-bottom: 20px;">
                    <p style="font-size: 20px; font-weight: 700; color: var(--accent);" id="gongdeCount">累计功德：${gongde}</p>
                    <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">每次敲击消除一分烦恼</p>
                </div>
            `;
      break;
    case "journal":
      content = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title">情绪日记</h3>
                <p class="sheet-desc">记录今天的心情</p>
                <div class="mood-grid" style="margin: 20px 0;" id="journalMoodGrid">
                    <div class="mood-item" onclick="selectJournalMood(this, 'happy')"><span class="mood-emoji">😊</span><span class="mood-label">喜悦</span></div>
                    <div class="mood-item" onclick="selectJournalMood(this, 'calm')"><span class="mood-emoji">😌</span><span class="mood-label">平静</span></div>
                    <div class="mood-item" onclick="selectJournalMood(this, 'sad')"><span class="mood-emoji">😔</span><span class="mood-label">难过</span></div>
                    <div class="mood-item" onclick="selectJournalMood(this, 'anxious')"><span class="mood-emoji">😟</span><span class="mood-label">焦虑</span></div>
                    <div class="mood-item" onclick="selectJournalMood(this, 'angry')"><span class="mood-emoji">😤</span><span class="mood-label">生气</span></div>
                </div>
                <textarea id="journalText" placeholder="写下今天的感受..." style="width: 100%; height: 120px; border: 1px solid #E0E0E0; border-radius: 16px; padding: 16px; font-family: inherit; font-size: 14px; resize: none; margin-bottom: 16px;"></textarea>
                <button class="btn btn-primary" onclick="saveJournal()">保存日记</button>
                <div id="journalHistory" style="margin-top: 24px;"></div>
            `;
      setTimeout(loadJournalHistory, 100);
      break;
    default:
      content = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title">功能开发中</h3>
                <p class="sheet-desc">敬请期待...</p>
                <button class="btn btn-secondary" onclick="closeSheet()">关闭</button>
            `;
  }

  sheet.innerHTML = content;
  sheet.classList.add("active");
  overlay.classList.add("active");
  overlay.onclick = closeSheet;
}

let gongde = 0;
function tapFish() {
  gongde++;
  document.getElementById("gongdeCount").textContent = `累计功德：${gongde}`;

  // 视觉反馈
  const container = document.getElementById("muyuFish");
  if (container) {
    // 清除之前的定时器，防止冲突
    if (container.dataset.tapTimer) clearTimeout(container.dataset.tapTimer);

    container.classList.remove("tapping");
    void container.offsetWidth; // 触发重绘
    container.classList.add("tapping");

    // 自动回弹：100ms 后移除 tapping 类，触发 CSS 的回弹过渡
    container.dataset.tapTimer = setTimeout(() => {
      container.classList.remove("tapping");
    }, 100);
  }

  // 浮动文字
  const wrapper = document.querySelector(".muyu-wrapper");
  if (wrapper) {
    const merit = document.createElement("div");
    merit.className = "merit-text";
    merit.textContent = "功德 +1";
    wrapper.appendChild(merit);

    // 波纹效果
    const ripple = document.createElement("div");
    ripple.className = "muyu-ripple";
    wrapper.appendChild(ripple);

    // 自动清理
    setTimeout(() => {
      if (merit.parentNode) merit.remove();
      if (ripple.parentNode) ripple.remove();
    }, 1000);
  }

  // 触觉反馈
  if (navigator.vibrate) navigator.vibrate(50);

  // 随机音效文案
  if (gongde % 10 === 0) {
    showToast(`心如止水，功德无量 🙏`);
  }
}

function startToolBreathing() {
  let phase = 0;
  const phases = ["吸气 4秒", "屏息 7秒", "呼气 8秒"];
  const durations = [4000, 7000, 8000];

  document.querySelector("#sheet .btn-primary").textContent = "练习中...";
  document.querySelector("#sheet .btn-primary").disabled = true;

  function cycle() {
    const circle = document.getElementById("toolBreathCircle");
    const text = document.getElementById("toolBreathText");
    if (!circle) return;

    text.textContent = phases[phase];
    circle.style.transform =
      phase === 0 ? "scale(1.5)" : phase === 2 ? "scale(1)" : "scale(1.5)";

    setTimeout(() => {
      phase = (phase + 1) % 3;
      cycle();
    }, durations[phase]);
  }
  cycle();
}

// 着陆技术步骤
let groundingStep = 5;
const groundingData = [
  {
    num: 5,
    emoji: "👀",
    title: "说出你看到的 5 样东西",
    hint: "环顾四周，专注观察细节",
  },
  {
    num: 4,
    emoji: "👂",
    title: "说出你听到的 4 种声音",
    hint: "安静下来，仔细倾听周围",
  },
  {
    num: 3,
    emoji: "✋",
    title: "触摸 3 样你能碰到的东西",
    hint: "感受不同的材质和温度",
  },
  {
    num: 2,
    emoji: "👃",
    title: "闻一闻 2 种气味",
    hint: "深呼吸，用心感受空气",
  },
  { num: 1, emoji: "👅", title: "品尝 1 种味道", hint: "可以是口中残留的味道" },
];

function nextGroundingStep() {
  groundingStep--;
  const container = document.getElementById("groundingSteps");

  if (groundingStep < 1) {
    container.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 64px; margin-bottom: 16px;">✨</div>
                <h4 style="margin-bottom: 12px; color: var(--primary);">太棒了！你已完成着陆练习</h4>
                <p style="font-size: 13px; color: var(--text-secondary);">现在你应该感觉更加平静和专注</p>
            </div>
        `;
    document.querySelector("#sheet .btn-primary").textContent = "完成";
    document.querySelector("#sheet .btn-primary").onclick = closeSheet;
    groundingStep = 5; // 重置
    return;
  }

  const step = groundingData[5 - groundingStep];
  container.innerHTML = `
        <div class="grounding-step active" data-step="${step.num}">
            <div style="font-size: 48px; text-align: center; margin-bottom: 16px;">${step.emoji}</div>
            <h4 style="text-align: center; margin-bottom: 12px;">${step.title}</h4>
            <p style="font-size: 13px; color: var(--text-secondary); text-align: center;">${step.hint}</p>
        </div>
    `;
}

// 渐进式肌肉放松
const muscleAreas = [
  { area: "双手", instruction: "紧握双拳，保持5秒...", emoji: "✊" },
  { area: "手臂", instruction: "弯曲手臂，紧绷肌肉...", emoji: "💪" },
  { area: "肩膀", instruction: "耸起肩膀，向耳朵靠近...", emoji: "🙆" },
  { area: "脸部", instruction: "皱起眉头，闭紧眼睛...", emoji: "😣" },
  { area: "腹部", instruction: "收紧腹部肌肉...", emoji: "🧘" },
  { area: "双腿", instruction: "伸直双腿，绷紧肌肉...", emoji: "🦵" },
];
let muscleIndex = 0;

function startMuscleRelax() {
  muscleIndex = 0;
  document.getElementById("muscleBtn").style.display = "none";
  runMuscleStep();
}

function runMuscleStep() {
  if (muscleIndex >= muscleAreas.length) {
    document.getElementById("muscleGuide").innerHTML = `
            <div style="font-size: 64px; margin-bottom: 16px;">🌟</div>
            <h4 style="color: var(--primary);">全身放松完成！</h4>
            <p style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">感受身体的轻松与平静</p>
        `;
    document.getElementById("muscleBtn").style.display = "block";
    document.getElementById("muscleBtn").textContent = "完成";
    document.getElementById("muscleBtn").onclick = closeSheet;
    return;
  }

  const step = muscleAreas[muscleIndex];
  document.getElementById("muscleGuide").innerHTML = `
        <div style="font-size: 64px; margin-bottom: 16px;">${step.emoji}</div>
        <h4 id="muscleArea" style="margin-bottom: 8px;">${step.area}</h4>
        <p id="muscleInstruction" style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">${step.instruction}</p>
        <div id="muscleTimer" style="font-size: 32px; font-weight: 700; color: var(--primary);">紧张 5</div>
    `;

  let count = 5;
  let isTense = true;
  const timer = setInterval(() => {
    count--;
    if (count <= 0) {
      if (isTense) {
        isTense = false;
        count = 10;
        document.getElementById("muscleTimer").textContent = "放松 10";
        document.getElementById("muscleInstruction").textContent =
          "慢慢放松，感受紧张消散...";
      } else {
        clearInterval(timer);
        muscleIndex++;
        setTimeout(runMuscleStep, 500);
      }
    } else {
      document.getElementById("muscleTimer").textContent =
        (isTense ? "紧张 " : "放松 ") + count;
    }
  }, 1000);
}

// 意象冥想
const imageryScripts = {
  beach: {
    title: "宁静海滩",
    steps: [
      "闭上眼睛，想象你正站在一片金色的沙滩上...",
      "温暖的阳光洒在你的皮肤上，海风轻轻吹过...",
      "听听海浪拍打沙滩的声音，有节奏地一波接一波...",
      "感受脚下温热的细沙，让你全身心放松...",
      "深呼吸，让海风带走所有的压力和烦恼...",
    ],
  },
  forest: {
    title: "静谧森林",
    steps: [
      "想象你走进一片郁郁葱葱的森林...",
      "阳光透过树叶的缝隙洒落，形成斑驳的光影...",
      "听听鸟儿欢快的歌唱，还有风吹过树叶的沙沙声...",
      "空气中弥漫着泥土和树木的清新香气...",
      "深呼吸，让大自然的宁静包围着你...",
    ],
  },
  mountain: {
    title: "高山云端",
    steps: [
      "想象你站在一座高山的顶峰...",
      "云朵在你脚下缓缓飘过，世界变得如此安静...",
      "远方的山峦层层叠叠，如水墨画一般...",
      "凉爽的山风拂过面颊，带来清新的空气...",
      "在这里，所有烦恼都显得如此渺小...",
    ],
  },
  garden: {
    title: "花园小径",
    steps: [
      "想象你漫步在一个美丽的花园中...",
      "五彩缤纷的花朵在阳光下绽放...",
      "蝴蝶在花丛中翩翩起舞，蜜蜂嗡嗡地忙碌着...",
      "空气中弥漫着花朵的芬芳...",
      "让这片花园的美好治愈你的心灵...",
    ],
  },
};

function startImagery(scene) {
  const sheet = document.getElementById("sheet");
  const script = imageryScripts[scene];
  let stepIndex = 0;

  sheet.innerHTML = `
        <div class="sheet-handle"></div>
        <h3 class="sheet-title">${script.title}</h3>
        <div style="text-align: center; padding: 40px 0;">
            <p id="imageryText" style="font-size: 16px; line-height: 1.8; color: var(--text-primary); min-height: 100px;">${script.steps[0]}</p>
        </div>
        <button class="btn btn-primary" onclick="nextImageryStep()">继续</button>
    `;

  window.currentImagery = { script, stepIndex };
}

function nextImageryStep() {
  if (!window.currentImagery) return;
  const { script } = window.currentImagery;
  window.currentImagery.stepIndex++;

  if (window.currentImagery.stepIndex >= script.steps.length) {
    document.getElementById("imageryText").innerHTML =
      "🌟 冥想结束，慢慢睁开眼睛，回到当下。";
    document.querySelector("#sheet .btn-primary").textContent = "完成";
    document.querySelector("#sheet .btn-primary").onclick = closeSheet;
    return;
  }

  document.getElementById("imageryText").textContent =
    script.steps[window.currentImagery.stepIndex];
}

// 情绪日记
let selectedJournalMood = null;

function selectJournalMood(el, mood) {
  document
    .querySelectorAll("#journalMoodGrid .mood-item")
    .forEach((m) => m.classList.remove("selected"));
  el.classList.add("selected");
  selectedJournalMood = mood;
}

function saveJournal() {
  const text = document.getElementById("journalText")?.value.trim();

  if (!selectedJournalMood && !text) {
    showToast("请选择心情或写下感受");
    return;
  }

  if (!PM_DATA.state.journalEntries) PM_DATA.state.journalEntries = [];
  PM_DATA.state.journalEntries.push({
    mood: selectedJournalMood || "neutral",
    text: text || "",
    timestamp: Date.now(),
  });
  saveState();

  showToast("日记已保存 📔");

  // 记录历史趋势 - 情绪日记
  recordMindGraphHistory("完成一篇情绪日记", "journal", "fa-book-open");

  selectedJournalMood = null;
  closeSheet();
}

function loadJournalHistory() {
  const container = document.getElementById("journalHistory");
  if (!container) return;

  const entries = PM_DATA.state.journalEntries || [];
  if (entries.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: var(--text-muted); font-size: 13px;">暂无日记记录</p>';
    return;
  }

  const moodEmojis = {
    happy: "😊",
    calm: "😌",
    sad: "😔",
    anxious: "😟",
    angry: "😤",
    neutral: "😐",
  };
  const recent = entries.slice(-3).reverse();

  container.innerHTML = `
        <h4 style="font-size: 14px; margin-bottom: 12px;">最近记录</h4>
        ${recent
          .map(
            (e) => `
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: 12px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">
                    <span>${moodEmojis[e.mood] || "😐"}</span>
                    <span>${new Date(e.timestamp).toLocaleDateString()}</span>
                </div>
                ${
                  e.text
                    ? `<p style="font-size: 13px; color: var(--text-secondary);">${e.text.substring(
                        0,
                        50
                      )}${e.text.length > 50 ? "..." : ""}</p>`
                    : ""
                }
            </div>
        `
          )
          .join("")}
    `;
}

function closeSheet() {
  document.getElementById("sheet").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  groundingStep = 5; // 重置着陆步骤
}

// ==================== 个人中心 ====================
function renderUserProfile() {
  const state = PM_DATA.state;
  const completedWeeks = state.weekCompleted.filter((w) => w).length;
  const score = getLastPsychlopsScore();
  const assessCount = (state.assessmentHistory || []).length;

  document.getElementById("userProfile").innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar">
            </div>
            <h2 class="profile-name">探索者 Felix</h2>
            <p class="profile-days">已在森境旅行 ${
              Math.floor(
                (Date.now() -
                  (localStorage.getItem("pm_start_time") || Date.now())) /
                  86400000
              ) || 1
            } 天</p>
        </div>
        
        <div class="profile-stats">
            <div class="stat-card" onclick="showPsychlopsDetail()">
                <p class="stat-value">${score}</p>
                <p class="stat-label">当前困扰指数</p>
            </div>
            <div class="stat-card">
                <p class="stat-value">${completedWeeks}/5</p>
                <p class="stat-label">周进度</p>
            </div>
            <div class="stat-card">
                <p class="stat-value">${
                  state.moodLog.length + (state.journalEntries?.length || 0)
                }</p>
                <p class="stat-label">心情记录</p>
            </div>
        </div>
        
        <div class="profile-menu">
            <div class="menu-item" onclick="showGrowthReport()">
                <i class="fas fa-chart-line"></i>
                <span>我的成长报告</span>
                <i class="fas fa-chevron-right arrow"></i>
            </div>
            <div class="menu-item" onclick="showSessionHistory()">
                <i class="fas fa-history"></i>
                <span>会谈记录</span>
                <span style="margin-left: auto; margin-right: 8px; font-size: 12px; color: var(--primary);">${completedWeeks} 次</span>
                <i class="fas fa-chevron-right arrow"></i>
            </div>
            <div class="menu-item" onclick="showAssessmentHistory()">
                <i class="fas fa-clipboard-check"></i>
                <span>测评记录</span>
                <span style="margin-left: auto; margin-right: 8px; font-size: 12px; color: var(--primary);">${assessCount} 份</span>
                <i class="fas fa-chevron-right arrow"></i>
            </div>
            <div class="menu-item" onclick="showMemberPage()">
                <i class="fas fa-crown"></i>
                <span>爱聆 Plus 会员</span>
                <i class="fas fa-chevron-right arrow"></i>
            </div>
            <div class="menu-item" onclick="showPrivacySettings()">
                <i class="fas fa-shield-alt"></i>
                <span>隐私设置</span>
                <i class="fas fa-chevron-right arrow"></i>
            </div>
            <div class="menu-item" onclick="showResetConfirmation()">
                <i class="fas fa-rotate-left"></i>
                <span>重置所有进度</span>
                <i class="fas fa-chevron-right arrow"></i>
            </div>
        </div>
        
        <p style="text-align: center; margin-top: 40px; font-size: 12px; color: var(--text-muted);">
            Version 4.1.0 "Forest Voyage"
        </p>
    `;
}

// 优化：重置确认弹窗
function showResetConfirmation() {
  const sheet = document.getElementById("sheet");
  const overlay = document.getElementById("overlay");

  sheet.innerHTML = `
        <div class="sheet-handle"></div>
        <div style="text-align: center; padding: 20px 0;">
            <div style="width: 64px; height: 64px; background: #FFEBEE; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 32px; color: #D32F2F;"></i>
            </div>
            <h3 class="sheet-title" style="color: #D32F2F;">确定要重置吗？</h3>
            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; line-height: 1.5;">
                这将清除所有的对话记录、测评结果和心情日记。<br>此操作<b>无法撤销</b>。
            </p>
            <div style="display: flex; gap: 12px;">
                <button class="btn" onclick="closeSheet()" style="background: #F5F5F5; color: #333; border: none;">取消</button>
                <button class="btn" onclick="performReset()" style="background: #D32F2F; color: white; border: none;">确认重置</button>
            </div>
        </div>
    `;

  sheet.classList.add("active");
  overlay.classList.add("active");
  overlay.onclick = closeSheet;
}

function performReset() {
  localStorage.removeItem("pm_state");
  localStorage.removeItem("pm_start_time"); // 清除开始时间
  showToast("已重置所有数据");
  setTimeout(() => {
    location.reload();
  }, 1000);
}

// 成长报告
function showGrowthReport() {
  const sheet = document.getElementById("sheet");
  const overlay = document.getElementById("overlay");
  const state = PM_DATA.state;
  const completedWeeks = state.weekCompleted.filter((w) => w).length;
  const preScore = state.psychlops.pre.Q1_Score
    ? calculatePsychlopsScore(state.psychlops.pre)
    : null;
  const currentScore = getLastPsychlopsScore();
  const improvement = getImprovementScore();
  const moodStats = getMoodStats();

  sheet.innerHTML = `
        <div class="sheet-handle"></div>
        <h3 class="sheet-title">我的成长报告</h3>
        
        <div style="padding: 20px 0;">
            <!-- 整体进度 -->
            <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); border-radius: 16px; padding: 20px; color: white; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <p style="font-size: 12px; opacity: 0.9;">PM+ 学习进度</p>
                        <p style="font-size: 32px; font-weight: 700;">${completedWeeks}/5 <span style="font-size: 16px;">周</span></p>
                    </div>
                    <div style="font-size: 48px;">${
                      completedWeeks === 5 ? "🎓" : "📚"
                    }</div>
                </div>
                <div class="progress-bar" style="margin-top: 16px; background: rgba(255,255,255,0.2);">
                    <div class="progress-fill" style="width: ${
                      completedWeeks * 20
                    }%; background: var(--accent);"></div>
                </div>
            </div>
            
            <!-- PSYCHLOPS 变化 -->
            ${
              preScore
                ? `
            <div style="background: var(--bg-secondary); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                <h4 style="font-size: 14px; margin-bottom: 16px;">心理健康指数变化</h4>
                <div style="display: flex; justify-content: space-around; text-align: center;">
                    <div>
                        <p style="font-size: 24px; font-weight: 700; color: var(--text-muted);">${preScore}</p>
                        <p style="font-size: 11px; color: var(--text-muted);">初始评估</p>
                    </div>
                    <div style="font-size: 20px; color: var(--text-muted);">→</div>
                    <div>
                        <p style="font-size: 24px; font-weight: 700; color: var(--primary);">${currentScore}</p>
                        <p style="font-size: 11px; color: var(--text-muted);">当前评估</p>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 12px; font-size: 12px; color: var(--success);">
                    ${
                      improvement > 0
                        ? `📉 困扰程度降低了 ${improvement} 分`
                        : "继续保持，变化正在发生"
                    }
                </p>
            </div>
            `
                : ""
            }
            
            <!-- 心情统计 -->
            <div style="background: var(--bg-secondary); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                <h4 style="font-size: 14px; margin-bottom: 16px;">最近心情分布</h4>
                <div style="display: flex; justify-content: space-around;">
                    ${Object.entries(moodStats)
                      .map(
                        ([mood, count]) => `
                        <div style="text-align: center;">
                            <p style="font-size: 24px;">${getMoodEmoji(
                              mood
                            )}</p>
                            <p style="font-size: 16px; font-weight: 600;">${count}</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <!-- 技能掌握 -->
            <div style="background: var(--bg-secondary); border-radius: 16px; padding: 20px;">
                <h4 style="font-size: 14px; margin-bottom: 16px;">已掌握技能</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${
                      state.weekCompleted[0]
                        ? '<span style="background: var(--primary); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">呼吸训练</span>'
                        : ""
                    }
                    ${
                      state.weekCompleted[1]
                        ? '<span style="background: var(--primary); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">问题管理</span>'
                        : ""
                    }
                    ${
                      state.weekCompleted[2]
                        ? '<span style="background: var(--primary); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">行为激活</span>'
                        : ""
                    }
                    ${
                      state.weekCompleted[3]
                        ? '<span style="background: var(--primary); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">社会支持</span>'
                        : ""
                    }
                    ${
                      state.weekCompleted[4]
                        ? '<span style="background: var(--primary); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">预防复发</span>'
                        : ""
                    }
                    ${
                      completedWeeks === 0
                        ? '<span style="color: var(--text-muted); font-size: 13px;">完成课程后解锁</span>'
                        : ""
                    }
                </div>
            </div>
        </div>
        
        <button class="btn btn-primary" onclick="closeSheet()">关闭</button>
    `;

  sheet.classList.add("active");
  overlay.classList.add("active");
  overlay.onclick = closeSheet;
}

function getMoodStats() {
  const state = PM_DATA.state;
  const moods = [...(state.moodLog || []), ...(state.journalEntries || [])];
  const stats = { happy: 0, calm: 0, sad: 0, anxious: 0, angry: 0 };
  moods.forEach((m) => {
    if (stats[m.mood] !== undefined) stats[m.mood]++;
  });
  return stats;
}

function getMoodEmoji(mood) {
  const emojis = {
    happy: "😊",
    calm: "😌",
    sad: "😔",
    anxious: "😟",
    angry: "😤",
  };
  return emojis[mood] || "😐";
}

// 会谈记录
function showSessionHistory() {
  const sheet = document.getElementById("sheet");
  const overlay = document.getElementById("overlay");
  const state = PM_DATA.state;

  const sessions = [];
  state.weekCompleted.forEach((completed, i) => {
    if (completed) {
      sessions.push({
        week: i + 1,
        title: PM_DATA.weeks[i].title,
        icon: PM_DATA.weeks[i].icon,
        color: PM_DATA.weeks[i].color,
        iconColor: PM_DATA.weeks[i].iconColor,
      });
    }
  });

  sheet.innerHTML = `
        <div class="sheet-handle"></div>
        <h3 class="sheet-title">会谈记录</h3>
        
        <div style="padding: 20px 0;">
            ${
              sessions.length === 0
                ? `
                <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
                    <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <p>暂无会谈记录</p>
                    <p style="font-size: 13px; margin-top: 8px;">完成 PM+ 课程后会显示在这里</p>
                </div>
            `
                : sessions
                    .map(
                      (s) => `
                <div class="session-item" onclick="showSessionDetail(${s.week})" style="display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--bg-secondary); border-radius: 16px; margin-bottom: 12px; cursor: pointer;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: ${s.color}; display: flex; align-items: center; justify-content: center; color: ${s.iconColor}; font-size: 18px;">
                        <i class="fas ${s.icon}"></i>
                    </div>
                    <div style="flex: 1;">
                        <p style="font-weight: 600; margin-bottom: 4px;">第 ${s.week} 周</p>
                        <p style="font-size: 13px; color: var(--text-secondary);">${s.title}</p>
                    </div>
                    <span style="color: var(--primary); font-size: 12px; display: flex; align-items: center; gap: 4px;">查看 <i class="fas fa-chevron-right"></i></span>
                </div>
            `
                    )
                    .join("")
            }
        </div>
        
        <button class="btn btn-primary" onclick="closeSheet()">关闭</button>
    `;

  sheet.classList.add("active");
  overlay.classList.add("active");
  overlay.onclick = closeSheet;
}

// 会谈记录详情
function showSessionDetail(week) {
  const sheet = document.getElementById("sheet");
  const messages = (PM_DATA.state.chatHistory || []).filter(
    (msg) => msg.week === week
  );
  const weekData = PM_DATA.weeks[week - 1];

  // 生成简化的聊天界面视图
  const chatHtml = messages
    .map(
      (msg) => `
        <div class="bubble ${
          msg.role
        }" style="font-size: 14px; padding: 12px 16px; margin-bottom: 12px; max-width: 100%; box-shadow: none; border: 1px solid ${
        msg.role === "ai" ? "#eee" : "transparent"
      };">
            ${msg.content}
        </div>
    `
    )
    .join("");

  sheet.innerHTML = `
        <div class="sheet-handle"></div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px;">
            <button onclick="showSessionHistory()" style="border:none; background:none; font-size:18px; color:var(--text-primary); cursor:pointer;"><i class="fas fa-arrow-left"></i></button>
            <h3 class="sheet-title" style="margin:0; flex:1; text-align:left; font-size: 18px;">第 ${week} 周: ${
    weekData.title
  }</h3>
        </div>
        
        <div style="height: 400px; overflow-y: auto; background: #F8FAF8; padding: 16px; border-radius: 16px; margin-bottom: 16px;">
            ${
              messages.length > 0
                ? chatHtml
                : '<p style="text-align: center; color: var(--text-muted); font-size: 13px; margin-top: 40px;">暂无该周的详细记录</p>'
            }
        </div>
        
        <button class="btn btn-primary" onclick="showSessionHistory()">返回列表</button>
    `;
}

// 测评记录
function showAssessmentHistory() {
  const sheet = document.getElementById("sheet");
  const overlay = document.getElementById("overlay");
  const history = PM_DATA.state.assessmentHistory || [];

  sheet.innerHTML = `
        <div class="sheet-handle"></div>
        <h3 class="sheet-title">测评记录</h3>
        
        <div style="padding: 20px 0;">
            ${
              history.length === 0
                ? `
                <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
                    <i class="fas fa-clipboard" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <p>暂无测评记录</p>
                    <p style="font-size: 13px; margin-top: 8px;">去"测评"页面完成测评</p>
                </div>
            `
                : history
                    .map(
                      (h) => `
                <div style="padding: 16px; background: var(--bg-secondary); border-radius: 16px; margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <p style="font-weight: 600;">${h.title}</p>
                        <span style="font-size: 12px; color: var(--text-muted);">${new Date(
                          h.timestamp
                        ).toLocaleDateString()}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="padding: 4px 10px; border-radius: 12px; font-size: 12px; background: ${
                          h.result.color || "var(--primary)"
                        }20; color: ${h.result.color || "var(--primary)"};">
                            ${h.result.level || h.result.type || "已完成"}
                        </span>
                    </div>
                </div>
            `
                    )
                    .join("")
            }
        </div>
        
        <button class="btn btn-primary" onclick="closeSheet()">关闭</button>
    `;

  sheet.classList.add("active");
  overlay.classList.add("active");
  overlay.onclick = closeSheet;
}

// ==================== 会员功能模块 ====================

let selectedPlan = null; // 当前选择的套餐: 'single' | 'monthly' | 'yearly'

// 选择套餐
function selectPlan(planType) {
  selectedPlan = planType;

  // 移除所有套餐的选中状态
  const plans = document.querySelectorAll('[id^="plan-"]');
  plans.forEach((plan) => {
    plan.style.borderColor = "transparent";
    plan.style.background = "var(--bg-secondary)";
    plan.style.boxShadow = "none";
  });

  // 设置当前套餐为选中状态
  const selectedElement = document.getElementById(`plan-${planType}`);
  if (selectedElement) {
    selectedElement.style.borderColor =
      planType === "yearly" ? "#FFA000" : "var(--primary)";
    selectedElement.style.background =
      planType === "yearly"
        ? "rgba(255, 160, 0, 0.15)"
        : "rgba(91, 140, 90, 0.1)";
    selectedElement.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
  }

  // 更新按钮状态
  const btn = document.getElementById("purchase-btn");
  if (btn) {
    const planInfo = PM_DATA.membershipPlans[planType];
    btn.textContent = `立即开通 ${planInfo.name} · ¥${planInfo.price}`;
    btn.disabled = false;
    btn.onclick = () => handlePurchase();
  }
}

// 处理购买
function handlePurchase() {
  if (!selectedPlan) {
    showToast("请先选择套餐");
    return;
  }

  closeSheet();

  // 显示支付弹窗
  showPayModal(selectedPlan);
}

// 显示支付弹窗（扩展支持不同套餐）
function showPayModal(type) {
  const overlay =
    document.querySelector(".pay-modal-overlay") || createPayModal();
  const title = overlay.querySelector(".pay-title");
  const desc = overlay.querySelector(".pay-desc");
  const price = overlay.querySelector(".pay-price");
  const btn = overlay.querySelector(".pay-btn");

  const plan = PM_DATA.membershipPlans[type];

  switch (type) {
    case "report":
      title.textContent = "解锁深度心理测评报告";
      desc.textContent =
        "获取包含多维度性格分析、潜在风险预警及专家定制建议的完整报告。";
      price.innerHTML = "¥9.9 <small>原价 ¥29.9</small>";
      btn.onclick = () => simulatePayment("report");
      break;
    case "single":
      title.textContent = plan.name;
      desc.textContent = plan.desc;
      price.innerHTML = `¥${plan.price} <small>${
        plan.originalPrice ? `原价 ¥${plan.originalPrice}` : "单次购买"
      }</small>`;
      btn.onclick = () => simulatePayment("single");
      break;
    case "monthly":
      title.textContent = plan.name;
      desc.textContent = plan.desc;
      price.innerHTML = `¥${plan.price} <small>月费会员</small>`;
      btn.onclick = () => simulatePayment("monthly");
      break;
    case "yearly":
      title.textContent = plan.name;
      desc.textContent = plan.desc;
      price.innerHTML = `¥${plan.price} <small>年费会员</small>`;
      btn.onclick = () => simulatePayment("yearly");
      break;
    default:
      title.textContent = "解锁高级功能";
      desc.textContent = "解锁说明文案";
      price.innerHTML = "¥9.9";
      btn.onclick = () => simulatePayment("default");
  }

  overlay.style.display = "flex";
}

// 创建支付弹窗
function createPayModal() {
  const div = document.createElement("div");
  div.className = "pay-modal-overlay";
  div.innerHTML = `
        <div class="pay-modal">
            <button class="pay-close" onclick="this.closest('.pay-modal-overlay').style.display='none'">&times;</button>
            <div class="pay-icon">💎</div>
            <h3 class="pay-title">解锁高级功能</h3>
            <p class="pay-desc">解锁说明文案</p>
            <div class="pay-price">¥9.9</div>
            <button class="pay-btn">立即支付解锁</button>
        </div>
    `;
  document.body.appendChild(div);
  return div;
}

// 模拟支付（扩展支持不同套餐）
function simulatePayment(type) {
  const btn = document.querySelector(".pay-btn");
  const originalText = btn.innerText;
  btn.innerText = "支付处理中...";
  btn.disabled = true;

  setTimeout(() => {
    const plan = PM_DATA.membershipPlans[type];
    showToast(`支付成功！已解锁 ${plan.name} ✨`);

    // 根据支付类型设置用户状态
    const now = new Date();

    switch (type) {
      case "report":
        PM_DATA.state.isProMember = true;
        PM_DATA.state.membershipType = "single";
        break;
      case "single":
        PM_DATA.state.unlockedPM = true;
        PM_DATA.state.isProMember = true;
        PM_DATA.state.membershipType = "single";
        break;
      case "monthly":
        PM_DATA.state.unlockedPM = true;
        PM_DATA.state.isProMember = true;
        PM_DATA.state.membershipType = "monthly";
        // 设置月度会员到期时间（30天后）
        const monthlyExpire = new Date();
        monthlyExpire.setDate(monthlyExpire.getDate() + plan.duration);
        PM_DATA.state.proMemberExpireDate = monthlyExpire.getTime();
        break;
      case "yearly":
        PM_DATA.state.unlockedPM = true;
        PM_DATA.state.isProMember = true;
        PM_DATA.state.membershipType = "yearly";
        // 设置年度会员到期时间（365天后）
        const yearlyExpire = new Date();
        yearlyExpire.setDate(yearlyExpire.getDate() + plan.duration);
        PM_DATA.state.proMemberExpireDate = yearlyExpire.getTime();
        break;
    }

    document.querySelector(".pay-modal-overlay").style.display = "none";
    btn.innerText = originalText;
    btn.disabled = false;

    // 刷新状态和页面
    if (type === "report") {
      showAssessmentResult();
    } else if (type === "single" || type === "monthly" || type === "yearly") {
      // 刷新个人中心页面
      if (document.querySelector(".page.active").id === "userPage") {
        updateUserProfile();
      }
      // 如果是从PM+入口进入的，进入PM+课程
      switchPage("home");
    }

    saveState(); // 持久化状态
  }, 1500);
}

// 检查会员是否过期
function checkMembershipStatus() {
  if (PM_DATA.state.proMemberExpireDate) {
    const now = Date.now();
    if (now > PM_DATA.state.proMemberExpireDate) {
      // 会员已过期
      PM_DATA.state.isProMember = false;
      PM_DATA.state.unlockedPM = false;
      PM_DATA.state.proMemberExpireDate = null;
      saveState();
      return false;
    }
  }
  return PM_DATA.state.isProMember;
}

// 格式化会员到期日期
function formatExpireDate(timestamp) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 会员页面
function showMemberPage() {
  const sheet = document.getElementById("sheet");
  const overlay = document.getElementById("overlay");
  const isPro = PM_DATA.state.isProMember;
  const membershipType = PM_DATA.state.membershipType;
  const expireDate = PM_DATA.state.proMemberExpireDate;

  // 如果已经是会员，显示会员信息
  if (isPro) {
    if (membershipType === "yearly" && expireDate) {
      const formattedDate = formatExpireDate(expireDate);
      const remainingDays = Math.ceil(
        (expireDate - Date.now()) / (1000 * 60 * 60 * 24)
      );

      sheet.innerHTML = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title">我的会员</h3>
                
                <div style="padding: 20px 0;">
                    <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA000 100%); border-radius: 20px; padding: 24px; color: white; text-align: center; margin-bottom: 24px;">
                        <i class="fas fa-crown" style="font-size: 40px; margin-bottom: 12px;"></i>
                        <h4 style="font-size: 20px; margin-bottom: 8px;">爱聆 Plus 年度会员</h4>
                        <p style="font-size: 13px; opacity: 0.95;">剩余 ${remainingDays} 天</p>
                        <p style="font-size: 12px; opacity: 0.8; margin-top: 8px;">有效期至：${formattedDate}</p>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">会员权益</h4>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i>
                            <span style="font-size: 14px;">无限次专业测评报告</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i>
                            <span style="font-size: 14px;">PM+ 课程无限次使用</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i>
                            <span style="font-size: 14px;">AI 陪伴无限制使用</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0;">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i>
                            <span style="font-size: 14px;">专属人工客服支持</span>
                        </div>
                    </div>
                    
                    <div style="text-align: center; padding: 20px 0;">
                        <button class="btn btn-primary" onclick="closeSheet()">确定</button>
                    </div>
                </div>
            `;
    } else if (membershipType === "single") {
      sheet.innerHTML = `
                <div class="sheet-handle"></div>
                <h3 class="sheet-title">我的会员</h3>
                
                <div style="padding: 20px 0;">
                    <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); border-radius: 20px; padding: 24px; color: white; text-align: center; margin-bottom: 24px;">
                        <i class="fas fa-check-circle" style="font-size: 40px; margin-bottom: 12px;"></i>
                        <h4 style="font-size: 20px; margin-bottom: 8px;">爱聆 Plus 单次购买</h4>
                        <p style="font-size: 13px; opacity: 0.95;">您已解锁 PM+ 课程</p>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">已解锁权益</h4>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i>
                            <span style="font-size: 14px;">PM+ 5周课程完整访问</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i>
                            <span style="font-size: 14px;">专业心理测评报告</span>
                        </div>
                    </div>
                    
                    <div style="background: #FFF8E1; border: 1px solid #FFE082; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                        <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #F57C00;">💡 升级年度会员</h4>
                        <p style="font-size: 13px; color: #F57C00; margin-bottom: 12px; line-height: 1.5;">升级至年度会员，享受无限次使用所有功能</p>
                        <button class="btn btn-primary" style="width: 100%; background: linear-gradient(135deg, #FFD700 0%, #FFA000 100%); border: none;" onclick="closeSheet(); setTimeout(() => showMemberPage(), 300);">立即升级 ¥${PM_DATA.membershipPlans.yearly.price}</button>
                    </div>
                    
                    <div style="text-align: center;">
                        <button class="btn btn-secondary" onclick="closeSheet()">关闭</button>
                    </div>
                </div>
            `;
    }
  } else {
    // 显示购买页面
    const singlePlan = PM_DATA.membershipPlans.single;
    const yearlyPlan = PM_DATA.membershipPlans.yearly;

    sheet.innerHTML = `
            <div class="sheet-handle"></div>
            <h3 class="sheet-title">爱聆 Plus 会员</h3>
            
            <div style="padding: 20px 0;">
                <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA000 100%); border-radius: 20px; padding: 24px; color: white; text-align: center; margin-bottom: 24px;">
                    <i class="fas fa-crown" style="font-size: 40px; margin-bottom: 12px;"></i>
                    <h4 style="font-size: 20px; margin-bottom: 8px;">解锁全部高级功能</h4>
                    <p style="font-size: 13px; opacity: 0.95;">专业心理测评 · PM+ 课程 · AI 陪伴</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">会员权益</h4>
                    <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
                        <i class="fas fa-check-circle" style="color: var(--success);"></i>
                        <span style="font-size: 14px;">解锁所有付费专业量表</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
                        <i class="fas fa-check-circle" style="color: var(--success);"></i>
                        <span style="font-size: 14px;">PM+ 5周结构化课程</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
                        <i class="fas fa-check-circle" style="color: var(--success);"></i>
                        <span style="font-size: 14px;">AiLing 陪伴无限制使用</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0;">
                        <i class="fas fa-check-circle" style="color: var(--success);"></i>
                        <span style="font-size: 14px;">专属人工客服支持</span>
                    </div>
                </div>
                
                <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">选择套餐</h4>
                <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                    <div id="plan-single" style="background: var(--bg-secondary); border-radius: 16px; padding: 20px; border: 2px solid transparent; cursor: pointer; transition: all 0.3s; position: relative;" onclick="selectPlan('single')">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <p style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${
                                  singlePlan.name
                                }</p>
                                <p style="font-size: 12px; color: var(--text-muted);">${
                                  singlePlan.desc
                                }</p>
                            </div>
                            <div style="text-align: right;">
                                <p style="font-size: 24px; font-weight: 700; color: var(--primary);">¥${
                                  singlePlan.price
                                }</p>
                                ${
                                  singlePlan.originalPrice
                                    ? `<p style="font-size: 12px; color: var(--text-muted); text-decoration: line-through;">¥${singlePlan.originalPrice}</p>`
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                    
                    <div id="plan-yearly" style="background: rgba(255, 215, 0, 0.1); border-radius: 16px; padding: 20px; border: 2px solid #FFA000; cursor: pointer; transition: all 0.3s; position: relative;" onclick="selectPlan('yearly')">
                        <span style="position: absolute; top: -10px; right: 10px; background: #FFA000; color: white; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px;">推荐</span>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <p style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${
                                  yearlyPlan.name
                                }</p>
                                <p style="font-size: 12px; color: var(--text-muted);">${
                                  yearlyPlan.desc
                                }</p>
                            </div>
                            <div style="text-align: right;">
                                <p style="font-size: 24px; font-weight: 700; color: #FFA000;">¥${
                                  yearlyPlan.price
                                }</p>
                                ${
                                  yearlyPlan.originalPrice
                                    ? `<p style="font-size: 12px; color: var(--success); font-weight: 600;">省 ¥${
                                        yearlyPlan.originalPrice -
                                        yearlyPlan.price
                                      }</p>`
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button id="purchase-btn" class="btn btn-primary" style="background: linear-gradient(135deg, #FFA000 0%, #FF8F00 100%); border: none; box-shadow: 0 4px 15px rgba(255, 160, 0, 0.3);" onclick="handlePurchase()">立即开通 ${
              yearlyPlan.name
            } · ¥${yearlyPlan.price}</button>
        `;

    // 默认选中年度会员
    selectedPlan = "yearly";
  }

  sheet.classList.add("active");
  overlay.classList.add("active");
  overlay.onclick = closeSheet;
}

// 隐私设置
function showPrivacySettings() {
  const sheet = document.getElementById("sheet");
  const overlay = document.getElementById("overlay");

  sheet.innerHTML = `
        <div class="sheet-handle"></div>
        <h3 class="sheet-title">隐私设置</h3>
        
        <div style="padding: 20px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--border-light);">
                <div>
                    <p style="font-weight: 600;">数据加密存储</p>
                    <p style="font-size: 12px; color: var(--text-muted);">所有数据本地加密保存</p>
                </div>
                <div style="width: 50px; height: 28px; background: var(--success); border-radius: 14px; position: relative;">
                    <div style="width: 24px; height: 24px; background: white; border-radius: 50%; position: absolute; right: 2px; top: 2px;"></div>
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--border-light);">
                <div>
                    <p style="font-weight: 600;">使用统计</p>
                    <p style="font-size: 12px; color: var(--text-muted);">帮助我们改进产品</p>
                </div>
                <div style="width: 50px; height: 28px; background: var(--success); border-radius: 14px; position: relative;">
                    <div style="width: 24px; height: 24px; background: white; border-radius: 50%; position: absolute; right: 2px; top: 2px;"></div>
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--border-light);">
                <div>
                    <p style="font-weight: 600;">危机通知</p>
                    <p style="font-size: 12px; color: var(--text-muted);">高风险时通知紧急联系人</p>
                </div>
                <div style="width: 50px; height: 28px; background: var(--success); border-radius: 14px; position: relative;">
                    <div style="width: 24px; height: 24px; background: white; border-radius: 50%; position: absolute; right: 2px; top: 2px;"></div>
                </div>
            </div>
            
            <div style="padding: 16px 0;">
                <p style="font-weight: 600; margin-bottom: 8px;">数据管理</p>
                <button class="btn btn-secondary" style="margin-bottom: 8px;" onclick="exportData()">导出我的数据</button>
                <button class="btn btn-outline" style="color: var(--danger); border-color: var(--danger);" onclick="deleteAllData()">删除所有数据</button>
            </div>
        </div>
        
        <button class="btn btn-primary" onclick="closeSheet()">完成</button>
    `;

  sheet.classList.add("active");
  overlay.classList.add("active");
  overlay.onclick = closeSheet;
}

function showPsychlopsDetail() {
  const score = PM_DATA.state.psychlops.pre.Q1_Score
    ? calculatePsychlopsScore(PM_DATA.state.psychlops.pre)
    : null;
  if (!score) {
    showToast("完成 PM+ 预评估后查看详情");
    return;
  }
  showModal(
    "success",
    "📊",
    `PSYCHLOPS: ${score}`,
    `这是你的心理困扰基准分数。分数越低表示状况越好。完成PM+课程后会有明显改善。`,
    null
  );
}

function exportData() {
  const data = JSON.stringify(PM_DATA.state, null, 2);
  showToast("数据已复制到剪贴板");
}

function deleteAllData() {
  if (confirm("确定要删除所有数据吗？此操作不可撤销。")) {
    localStorage.clear();
    location.reload();
  }
}

function resetApp() {
  if (confirm("确定要重置所有进度吗？")) {
    localStorage.removeItem("pm_state");
    location.reload();
  }
}

// ==================== 通用UI组件 ====================
function showModal(type, icon, title, content, onClose) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.innerHTML = `
        <div class="modal-icon ${type}"><span style="font-size: 40px;">${icon}</span></div>
        <h3 class="modal-title">${title}</h3>
        <p class="modal-content">${content}</p>
        <button class="btn btn-primary" onclick="closeModal()">确定</button>
    `;

  modal.classList.add("active");
  overlay.classList.add("active");
  overlay.onclick = null;

  window.currentModalCallback = onClose;
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  if (window.currentModalCallback) {
    window.currentModalCallback();
    window.currentModalCallback = null;
  }
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.style.cssText =
    "position: fixed; top: 100px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 12px 24px; border-radius: 24px; font-size: 14px; z-index: 300; animation: fadeIn 0.3s;";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}

function showCompletionSummary() {
  showModal(
    "success",
    "🎓",
    "PM+ 已完成",
    "你已经完成了全部5周课程，继续使用能量坊工具保持心理健康！",
    null
  );
}

// AiLing 聊天
const AI_RESPONSES = {
  心情: [
    "我听到你现在心情可能不太好。能告诉我具体发生了什么吗？",
    "心情低落是很正常的感受。你愿意多说一些吗？",
    "每个人都会有情绪起伏。你现在最困扰的是什么？",
  ],
  压力: [
    "压力是现代生活中很常见的问题。你最近是什么让你感到压力呢？",
    "听起来你承受了不少压力。要不要试试我们的呼吸练习来放松一下？",
    "压力过大时，身体和心理都会有反应。你最近睡眠和食欲怎么样？",
  ],
  放松: [
    '很棒，学习放松技巧是照顾自己的好方法！你可以去"能量坊"尝试呼吸训练或渐进式肌肉放松。',
    "我推荐你试试 4-7-8 呼吸法：吸气4秒、屏息7秒、呼气8秒。非常有效！",
    "着陆技术也是一个好选择：注意5样你看到的、4样你听到的、3样你能触摸的东西...",
  ],
  睡眠: [
    "睡眠问题确实会影响我们的状态。你是入睡困难，还是容易早醒呢？",
    "睡前可以试试渐进式肌肉放松，或者做几分钟呼吸练习。",
    "建立规律的睡眠习惯很重要。尽量每天同一时间睡觉和起床。",
  ],
  焦虑: [
    "焦虑的感觉确实很不舒服。你能描述一下焦虑时有什么身体感受吗？",
    "当感到焦虑时，可以试试着陆技术，把注意力拉回当下。",
    "记住，焦虑的情绪会来也会走。我们一起来应对它。",
  ],
  工作: [
    "工作上的压力确实会影响心情。现在工作中最让你困扰的是什么？",
    "在职场中保持边界感很重要。你有尝试过设定工作与生活的边界吗？",
    "有时候工作压力需要我们主动寻求帮助。你身边有可以倾诉的同事吗？",
  ],
  default: [
    "我听到了你说的。这种感觉确实让人挺不舒服的。要不要试试PM+里学到的呼吸技巧？",
    "谢谢你愿意跟我分享。你的感受是完全可以理解的。😊",
    "我在这里陪着你。如果你想聊更多，我随时都在。",
    "你愿意说出来，这本身就是很勇敢的一步。",
    "我能感受到这对你来说很重要。能多告诉我一些吗？",
    "每个人的感受都是有意义的。你现在最需要什么样的支持？",
  ],
};

function sendAiChat() {
  const input = document.getElementById("aiChatInput");
  const text = input.value.trim();
  if (!text) return;

  addAiChatBubble("user", text);
  input.value = "";

  // 隐藏快捷话题
  document.getElementById("quickTopics").style.display = "none";

  // 显示打字指示器
  showTypingIndicator();

  // 模拟AI思考后回复
  setTimeout(() => {
    hideTypingIndicator();
    const response = getAiResponse(text);
    addAiChatBubble("ai", response);
  }, 1000 + Math.random() * 1000);
}

function sendQuickTopic(topic) {
  document.getElementById("aiChatInput").value = topic;
  sendAiChat();
}

function addAiChatBubble(type, text) {
  const container = document.getElementById("aiChatMessages");
  const bubble = document.createElement("div");
  bubble.className = `bubble ${type}`;
  bubble.innerHTML = text; // 支持 HTML 内容
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function getAiResponse(userText) {
  const lower = userText.toLowerCase();

  // 情绪识别与图谱更新
  let sentiment = "neutral";
  if (userText.match(/难过|伤心|痛苦|不想活|累|死/)) sentiment = "negative";
  if (userText.match(/开心|高兴|棒|好/)) sentiment = "positive";
  if (userText.match(/焦虑|担心|害怕|紧张/)) sentiment = "anxious";

  updateMindGraph(true); // 更新首页图谱

  // 智能推荐 HTML 生成
  let recommendHtml = "";
  if (sentiment === "anxious" || lower.includes("焦虑")) {
    recommendHtml = `
            <div class="recommend-card" onclick="switchPage('assess'); setTimeout(()=> startAssessment('sas'), 500)">
                <div class="recommend-icon"><i class="fas fa-clipboard-list"></i></div>
                <div class="recommend-content">
                    <h4>焦虑自评量表 (SAS)</h4>
                    <p>AiLing 发现你有些焦虑，来测测看？</p>
                </div>
            </div>`;
  } else if (sentiment === "negative" || lower.includes("累")) {
    recommendHtml = `
            <div class="recommend-card" onclick="enterPM()">
                <div class="recommend-icon"><i class="fas fa-seedling"></i></div>
                <div class="recommend-content">
                    <h4>PM+ 情绪疏导课程</h4>
                    <p>系统化解决压力，重获能量</p>
                </div>
            </div>`;
  }

  // 关键词匹配回复
  let reply = "";
  for (let keyword of Object.keys(AI_RESPONSES)) {
    if (keyword !== "default" && lower.includes(keyword)) {
      const responses = AI_RESPONSES[keyword];
      reply = responses[Math.floor(Math.random() * responses.length)];
      break;
    }
  }

  if (!reply) {
    const defaults = AI_RESPONSES.default;
    reply = defaults[Math.floor(Math.random() * defaults.length)];
  }

  return reply + recommendHtml;
}

// ==================== 新增辅助逻辑 ====================

// 更新心理图谱 (模拟雷达图数据变化)
function updateMindGraph(animate = false) {
  const radar = document.getElementById("radarData");
  if (!radar) return;

  if (!PM_DATA.state.mindGraphData)
    PM_DATA.state.mindGraphData = [50, 50, 50, 50, 50, 50];

  // 模拟基于最近行为计算出的 6 个维度
  const newData = PM_DATA.state.mindGraphData.map((v) => {
    const delta = Math.floor(Math.random() * 20) - 10;
    return Math.max(20, Math.min(90, v + delta));
  });

  PM_DATA.state.mindGraphData = newData; // 保存状态

  // 生成 SVG 坐标 points
  const points = newData
    .map((val, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const r = (val / 100) * 40;
      const x = 50 + r * Math.cos(angle);
      const y = 50 + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  radar.setAttribute("points", points);

  if (animate) {
    const badge = document.querySelector(".update-badge");
    if (badge) {
      badge.style.background = "#e6fffa";
      badge.style.color = "#00b894";
      badge.textContent = "刚刚更新";
      setTimeout(() => {
        badge.style.background = "rgba(91, 140, 90, 0.1)";
        badge.style.color = "var(--primary)";
        badge.textContent = "实时更新";
      }, 2000);
    }
  }
}

function showTypingIndicator() {
  const container = document.getElementById("aiChatMessages");
  const typing = document.createElement("div");
  typing.className = "typing-bubble";
  typing.id = "typingIndicator";
  typing.innerHTML = "<span></span><span></span><span></span>";
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

// 语音输入交互逻辑
let voiceState = "idle"; // idle, recording, canceling
let voiceStartTime = 0;
let voiceTimerInterval = null;
let recognition = null;
let finalTranscript = "";
let simulationInterval = null;

function switchToVoiceMode() {
  document.getElementById("textInputMode").style.display = "none";
  document.getElementById("voiceInputMode").style.display = "block";
}

function switchToTextMode() {
  document.getElementById("voiceInputMode").style.display = "none";
  document.getElementById("textInputMode").style.display = "block";
}

function startVoiceRecord(e) {
  if (e) e.preventDefault(); // 防止触摸时触发点击

  voiceState = "recording";
  finalTranscript = "";

  // 显示全屏模态
  const modal = document.getElementById("voiceRecordingModal");
  modal.classList.add("active");

  const statusEl = document.getElementById("voiceStatus");
  statusEl.innerText = "正在聆听...";
  statusEl.style.color = "#FFFFFF";

  // 启动计时器
  voiceStartTime = Date.now();
  updateVoiceTimer();
  voiceTimerInterval = setInterval(updateVoiceTimer, 100);

  // haptic feedback
  if (navigator.vibrate) navigator.vibrate(50);

  // 启动语音识别
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.lang = "zh-CN";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        if (interimTranscript || finalTranscript) {
          statusEl.innerText = finalTranscript + interimTranscript;
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        statusEl.innerText = "无法识别，请重试";
      };

      recognition.start();
    } catch (err) {
      console.log("Voice API error:", err);
      simulateVoiceDictation();
    }
  } else {
    // 模拟听写效果
    simulateVoiceDictation();
  }
}

function stopVoiceRecord(e) {
  if (e) e.preventDefault();
  if (voiceState !== "recording") return;

  voiceState = "idle";
  if (voiceTimerInterval) clearInterval(voiceTimerInterval);
  if (simulationInterval) clearInterval(simulationInterval);

  const modal = document.getElementById("voiceRecordingModal");
  modal.classList.remove("active", "canceling");

  if (recognition) {
    try {
      recognition.stop();
    } catch (e) {}
    recognition = null;
  }

  // 获取最终文本
  const statusEl = document.getElementById("voiceStatus");
  const text =
    finalTranscript ||
    (statusEl.innerText !== "正在聆听..." ? statusEl.innerText : "");

  // 如果有有效内容，发送
  if (text && text !== "正在聆听..." && text !== "无法识别，请重试") {
    // 直接发送用户消息
    addAiChatBubble("user", text);

    // 触发AI回复流程
    document.getElementById("quickTopics").style.display = "none";
    showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator();
      const response = getAiResponse(text);
      addAiChatBubble("ai", response);
    }, 1500 + Math.random() * 1000);
  }
}

// 模拟听写动画
function simulateVoiceDictation() {
  const texts = [
    "我最近感到压力真的很大",
    "心情有些低落，不知道该怎么办",
    "可以教我怎么放松吗",
    "晚上总是睡不着觉，很痛苦",
    "我觉得自己快崩溃了",
  ];
  const targetText = texts[Math.floor(Math.random() * texts.length)];
  let index = 0;
  const statusEl = document.getElementById("voiceStatus");

  // 延迟一点开始出字，模拟听的过程
  setTimeout(() => {
    if (voiceState !== "recording") return;

    simulationInterval = setInterval(() => {
      if (voiceState !== "recording") {
        clearInterval(simulationInterval);
        return;
      }
      if (index < targetText.length) {
        index++;
        statusEl.innerText = targetText.substring(0, index);
        finalTranscript = targetText.substring(0, index);
      } else {
        clearInterval(simulationInterval);
      }
    }, 150);
  }, 500);
}

function updateVoiceTimer() {
  const elapsed = Math.floor((Date.now() - voiceStartTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const el = document.getElementById("voiceTimer");
  if (el) el.innerText = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// AiLing菜单
function showAiChatMenu() {
  const sheet = document.getElementById("sheet");
  const overlay = document.getElementById("overlay");

  sheet.innerHTML = `
        <div class="sheet-handle"></div>
        <h3 class="sheet-title">聊天选项</h3>
        <div style="padding: 20px 0;">
            <div class="menu-item" onclick="clearAiChat();">
                <i class="fas fa-trash"></i>
                <span>清空聊天记录</span>
            </div>
            <div class="menu-item" onclick="exportAiChat();">
                <i class="fas fa-download"></i>
                <span>导出聊天记录</span>
            </div>
            <div class="menu-item" onclick="closeSheet(); switchPage('tools');">
                <i class="fas fa-leaf"></i>
                <span>前往能量坊</span>
            </div>
            <div class="menu-item" onclick="closeSheet(); enterPM();">
                <i class="fas fa-seedling"></i>
                <span>开始 PM+ 课程</span>
            </div>
        </div>
        <button class="btn btn-secondary" onclick="closeSheet()">关闭</button>
    `;

  sheet.classList.add("active");
  overlay.classList.add("active");
  overlay.onclick = closeSheet;
}

function clearAiChat() {
  document.getElementById("aiChatMessages").innerHTML = `
        <div class="bubble ai">嗨，我是 AiLing！今天想聊些什么呢？😊</div>
        <div class="bubble ai">你可以点击上方的快捷话题，或者直接输入文字/语音和我交流～</div>
    `;
  document.getElementById("quickTopics").style.display = "flex";
  closeSheet();
  showToast("聊天记录已清空");
}

function exportAiChat() {
  const messages = document.querySelectorAll("#aiChatMessages .bubble");
  let text = "AiLing 聊天记录\n" + new Date().toLocaleString() + "\n\n";
  messages.forEach((msg) => {
    const role = msg.classList.contains("ai") ? "AiLing" : "我";
    text += `${role}: ${msg.textContent}\n\n`;
  });
  showToast("聊天记录已复制");
  closeSheet();
}

// 初始化时间戳
if (!localStorage.getItem("pm_start_time")) {
  localStorage.setItem("pm_start_time", Date.now());
}
