// 智能体聊天交互逻辑

class WeChatMiniProgram {
  constructor() {
    this.currentPage = "home";
    this.chatMessages = [];
    this.conversationState = null; // 对话状态
    this.collectedData = {}; // 收集的数据
    this.mockDatabase = this.initMockDatabase(); // 模拟数据库
    this.init();
  }

  // 初始化模拟数据库
  initMockDatabase() {
    return {
      students: [
        {
          id: 1,
          name: "张三",
          age: 14,
          gender: "男",
          grade: "初二",
          lastAssessment: "2024-10-01",
        },
        {
          id: 2,
          name: "张三",
          age: 16,
          gender: "女",
          grade: "高一",
          lastAssessment: "2024-09-28",
        },
        {
          id: 3,
          name: "李四",
          age: 13,
          gender: "男",
          grade: "初一",
          lastAssessment: "2024-10-05",
        },
        {
          id: 4,
          name: "王小明",
          age: 15,
          gender: "男",
          grade: "初三",
          lastAssessment: "2024-10-03",
        },
      ],
    };
  }

  // 根据姓名查询学生
  queryStudentsByName(name) {
    return this.mockDatabase.students.filter(
      (student) => student.name === name
    );
  }

  init() {
    this.bindEvents();
    // this.loadPage('home');
    this.initChatInterface();
  }

  bindEvents() {
    // Tab导航点击事件
    document.querySelectorAll(".tab-item").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const page = e.currentTarget.dataset.page;
        this.switchPage(page);
      });
    });

    // 防止页面滚动时底部导航栏跳动
    const pageContent = document.getElementById("pageContent");
    pageContent.addEventListener("scroll", this.handleScroll.bind(this));
  }

  // 初始化聊天界面
  initChatInterface() {
    const sendBtn = document.getElementById("sendBtn");
    const chatInput = document.getElementById("chatInput");

    if (sendBtn) {
      sendBtn.addEventListener("click", () => this.sendMessage());
    }

    if (chatInput) {
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.sendMessage();
        }
      });
    }

    // 功能菜单项点击事件
    document.querySelectorAll(".feature-menu-item-compact").forEach((item) => {
      item.addEventListener("click", (e) => {
        const page = e.currentTarget.dataset.page;
        this.navigateToPage(page);
      });
    });

    // 视频卡片点击事件
    document.querySelectorAll(".video-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const videoId = e.currentTarget.dataset.videoId;
        this.showVideoDetail(videoId);
      });
    });
  }

  // 导航到指定页面
  navigateToPage(pageName) {
    // 隐藏所有页面
    document.querySelectorAll(".page").forEach((page) => {
      page.style.display = "none";
    });

    // 显示目标页面
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
      targetPage.style.display = "block";
      this.currentPage = pageName;
    }
  }

  // 返回首页
  navigateToHome() {
    this.navigateToPage("home");
  }

  // 发送消息
  sendMessage() {
    const chatInput = document.getElementById("chatInput");
    const message = chatInput.value.trim();

    if (!message) return;

    // 添加用户消息
    this.addUserMessage(message);
    chatInput.value = "";

    // 显示打字动画
    this.showTypingIndicator();

    // 模拟AI回复
    setTimeout(() => {
      this.hideTypingIndicator();
      this.handleUserIntent(message);
    }, 1500);
  }

  // 添加用户消息
  addUserMessage(message) {
    const chatMessages = document.getElementById("chatMessages");
    const messageHTML = `
            <div class="message-group user-message">
                <div class="message-avatar">👤</div>
                <div class="message-content">
                    <div class="message-bubble">${this.escapeHtml(
                      message
                    )}</div>
                </div>
            </div>
        `;
    chatMessages.insertAdjacentHTML("beforeend", messageHTML);
    this.scrollToBottom();
  }

  // 添加AI消息
  addAIMessage(message, includeCard = null) {
    const chatMessages = document.getElementById("chatMessages");
    const messageHTML = `
            <div class="message-group ai-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-bubble">${message}</div>
                    ${includeCard || ""}
                </div>
            </div>
        `;
    chatMessages.insertAdjacentHTML("beforeend", messageHTML);
    this.scrollToBottom();

    // 绑定卡片内的事件
    if (includeCard) {
      // 延迟绑定，确保DOM已更新
      setTimeout(() => {
        this.bindAssessmentItemEvents();
      }, 50);
    }
  }

  // 显示打字动画
  showTypingIndicator() {
    const chatMessages = document.getElementById("chatMessages");
    const typingHTML = `
            <div class="message-group ai-message typing-indicator-group">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-bubble">
                        <div class="typing-indicator">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    chatMessages.insertAdjacentHTML("beforeend", typingHTML);
    this.scrollToBottom();
  }

  // 隐藏打字动画
  hideTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator-group");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // 处理用户意图
  handleUserIntent(message) {
    // 如果在对话流程中，继续处理对话
    if (this.conversationState) {
      this.handleConversationFlow(message);
      return;
    }

    const lowerMessage = message.toLowerCase();

    // 测评相关 - 启动对话流程
    if (lowerMessage.includes("测评") || lowerMessage.includes("想测评")) {
      this.startAssessmentConversation();
    }
    // 智能评估相关 - 启动对话流程
    else if (
      lowerMessage.includes("智能评估") ||
      lowerMessage.includes("评估") ||
      lowerMessage.includes("辅导建议")
    ) {
      this.startSmartAssessmentConversation();
    }
    // 案例检索相关 - 启动对话流程
    else if (
      lowerMessage.includes("案例") ||
      lowerMessage.includes("检索") ||
      lowerMessage.includes("查找")
    ) {
      this.startCaseSearchConversation();
    }
    // 导师36计相关
    else if (
      lowerMessage.includes("导师") ||
      lowerMessage.includes("36计") ||
      lowerMessage.includes("课程") ||
      lowerMessage.includes("视频")
    ) {
      this.addAIMessage("好的，正在为您打开导师36计页面...");
      setTimeout(() => {
        this.navigateToPage("mentor-36");
      }, 800);
    }
    // 默认回复
    else {
      this.addAIMessage(
        '我理解您的需求了。您可以：<br><br>• 输入"我想测评"开始心理测评<br>• 输入"智能评估"获取评估建议<br>• 输入"案例检索"查找相似案例<br>• 输入"导师36计"学习辅导技巧<br><br>我会引导您完成操作 😊'
      );
    }
  }

  // 启动测评对话流程
  startAssessmentConversation() {
    this.conversationState = {
      type: "assessment",
      step: "name",
      data: {},
    };
    this.addAIMessage(
      "好的！我来帮您进行心理测评。<br><br>首先，请告诉我<strong>被测评人的姓名</strong>？"
    );
  }

  // 启动智能评估对话流程
  startSmartAssessmentConversation() {
    this.conversationState = {
      type: "smart-assessment",
      step: "name",
      data: {},
    };
    this.addAIMessage(
      "好的！我来为您提供智能评估服务。<br><br>首先，请告诉我<strong>学生的姓名</strong>？"
    );
  }

  // 启动案例检索对话流程
  startCaseSearchConversation() {
    this.conversationState = {
      type: "case-search",
      step: "name",
      data: {},
    };
    this.addAIMessage(
      "好的！我来帮您检索相似案例。<br><br>首先，请告诉我<strong>学生的姓名</strong>？"
    );
  }

  // 处理对话流程
  handleConversationFlow(message) {
    const state = this.conversationState;

    if (state.type === "assessment") {
      this.handleAssessmentFlow(message);
    } else if (state.type === "smart-assessment") {
      this.handleSmartAssessmentFlow(message);
    } else if (state.type === "case-search") {
      this.handleCaseSearchFlow(message);
    }
  }

  // 处理测评对话流程
  handleAssessmentFlow(message) {
    const state = this.conversationState;

    switch (state.step) {
      case "name":
        // 查询数据库中是否存在该姓名
        const students = this.queryStudentsByName(message);

        if (students.length === 0) {
          // 没有找到，继续询问
          state.data.name = message;
          state.step = "age";
          this.addAIMessage(
            `好的，${message}。<br><br>请问<strong>年龄</strong>是多少？`
          );
        } else if (students.length === 1) {
          // 找到唯一记录，显示确认
          state.data.possibleStudents = students;
          state.step = "confirm-student";
          this.showStudentConfirmation(students[0]);
        } else {
          // 找到多个记录，让用户选择
          state.data.possibleStudents = students;
          state.step = "select-student";
          this.showStudentSelection(students);
        }
        break;

      case "confirm-student":
        const lowerMsg = message.toLowerCase();
        if (
          lowerMsg.includes("是") ||
          lowerMsg.includes("对") ||
          lowerMsg.includes("确认")
        ) {
          // 用户确认，使用已有数据
          const student = state.data.possibleStudents[0];
          state.data.name = student.name;
          state.data.age = student.age;
          state.data.gender = student.gender;
          state.data.studentId = student.id;
          state.step = "direction";
          this.addAIMessage(
            `太好了！已为您加载${student.name}的信息。<br><br>请问主要想测评哪个方向？<br><br>• 情绪稳定性<br>• 学习适应性<br>• 社交能力<br>• 综合测评<br><br>请直接输入方向名称`
          );
        } else {
          // 用户不确认，重新输入
          state.step = "name";
          state.data.possibleStudents = null;
          this.addAIMessage(
            "好的，那请重新输入<strong>被测评人的姓名</strong>："
          );
        }
        break;

      case "select-student":
        const selectedIndex = parseInt(message);
        if (
          isNaN(selectedIndex) ||
          selectedIndex < 1 ||
          selectedIndex > state.data.possibleStudents.length
        ) {
          this.addAIMessage(
            `请输入有效的序号（1-${state.data.possibleStudents.length}）`
          );
          return;
        }
        // 用户选择了某个学生
        const selectedStudent = state.data.possibleStudents[selectedIndex - 1];
        state.data.name = selectedStudent.name;
        state.data.age = selectedStudent.age;
        state.data.gender = selectedStudent.gender;
        state.data.studentId = selectedStudent.id;
        state.step = "direction";
        this.addAIMessage(
          `好的！已选择${selectedStudent.name}（${selectedStudent.age}岁，${selectedStudent.gender}，${selectedStudent.grade}）。<br><br>请问主要想测评哪个方向？<br><br>• 情绪稳定性<br>• 学习适应性<br>• 社交能力<br>• 综合测评<br><br>请直接输入方向名称`
        );
        break;

      case "age":
        const age = parseInt(message);
        if (isNaN(age) || age < 6 || age > 18) {
          this.addAIMessage("抱歉，请输入有效的年龄（6-18岁之间的数字）");
          return;
        }
        state.data.age = age;
        state.step = "gender";
        this.addAIMessage(
          "明白了。<br><br>请问<strong>性别</strong>是？（男/女）"
        );
        break;

      case "gender":
        const gender = message.includes("男")
          ? "男"
          : message.includes("女")
          ? "女"
          : null;
        if (!gender) {
          this.addAIMessage('请输入"男"或"女"');
          return;
        }
        state.data.gender = gender;
        state.step = "direction";
        this.addAIMessage(
          `好的。<br><br>请问主要想测评哪个方向？<br><br>• 情绪稳定性<br>• 学习适应性<br>• 社交能力<br>• 综合测评<br><br>请直接输入方向名称`
        );
        break;

      case "direction":
        state.data.direction = message;
        state.step = "complete";
        this.showAssessmentSummaryAndRecommend();
        break;
    }
  }

  // 处理智能评估对话流程
  handleSmartAssessmentFlow(message) {
    const state = this.conversationState;

    switch (state.step) {
      case "name":
        // 查询数据库中是否存在该姓名
        const students = this.queryStudentsByName(message);

        if (students.length === 0) {
          // 没有找到，继续询问
          state.data.name = message;
          state.step = "age";
          this.addAIMessage(
            `好的，${message}。<br><br>请问<strong>年龄</strong>是多少？`
          );
        } else if (students.length === 1) {
          // 找到唯一记录，显示确认
          state.data.possibleStudents = students;
          state.step = "confirm-student";
          this.showStudentConfirmation(students[0]);
        } else {
          // 找到多个记录，让用户选择
          state.data.possibleStudents = students;
          state.step = "select-student";
          this.showStudentSelection(students);
        }
        break;

      case "confirm-student":
        const lowerMsg = message.toLowerCase();
        if (
          lowerMsg.includes("是") ||
          lowerMsg.includes("对") ||
          lowerMsg.includes("确认")
        ) {
          // 用户确认，使用已有数据
          const student = state.data.possibleStudents[0];
          state.data.name = student.name;
          state.data.age = student.age;
          state.data.gender = student.gender;
          state.data.studentId = student.id;
          state.step = "problem";
          this.addAIMessage(
            `太好了！已为您加载${student.name}的信息。<br><br>请<strong>详细描述</strong>学生的心理问题或行为表现：<br><br>• 具体的问题表现<br>• 持续时间<br>• 影响程度<br>• 家庭背景（可选）`
          );
        } else {
          // 用户不确认，重新输入
          state.step = "name";
          state.data.possibleStudents = null;
          this.addAIMessage("好的，那请重新输入<strong>学生的姓名</strong>：");
        }
        break;

      case "select-student":
        const selectedIndex = parseInt(message);
        if (
          isNaN(selectedIndex) ||
          selectedIndex < 1 ||
          selectedIndex > state.data.possibleStudents.length
        ) {
          this.addAIMessage(
            `请输入有效的序号（1-${state.data.possibleStudents.length}）`
          );
          return;
        }
        // 用户选择了某个学生
        const selectedStudent = state.data.possibleStudents[selectedIndex - 1];
        state.data.name = selectedStudent.name;
        state.data.age = selectedStudent.age;
        state.data.gender = selectedStudent.gender;
        state.data.studentId = selectedStudent.id;
        state.step = "problem";
        this.addAIMessage(
          `好的！已选择${selectedStudent.name}（${selectedStudent.age}岁，${selectedStudent.gender}，${selectedStudent.grade}）。<br><br>请<strong>详细描述</strong>学生的心理问题或行为表现：<br><br>• 具体的问题表现<br>• 持续时间<br>• 影响程度<br>• 家庭背景（可选）`
        );
        break;

      case "age":
        const age = parseInt(message);
        if (isNaN(age) || age < 6 || age > 18) {
          this.addAIMessage("抱歉，请输入有效的年龄（6-18岁之间的数字）");
          return;
        }
        state.data.age = age;
        state.step = "gender";
        this.addAIMessage(
          "明白了。<br><br>请问<strong>性别</strong>是？（男/女）"
        );
        break;

      case "gender":
        const gender = message.includes("男")
          ? "男"
          : message.includes("女")
          ? "女"
          : null;
        if (!gender) {
          this.addAIMessage('请输入"男"或"女"');
          return;
        }
        state.data.gender = gender;
        state.step = "problem";
        this.addAIMessage(
          `好的。<br><br>请<strong>详细描述</strong>学生的心理问题或行为表现：<br><br>• 具体的问题表现<br>• 持续时间<br>• 影响程度<br>• 家庭背景（可选）`
        );
        break;

      case "problem":
        if (message.length < 10) {
          this.addAIMessage(
            "请提供更详细的描述（至少10个字），这样我才能给出更准确的评估建议。"
          );
          return;
        }
        state.data.problem = message;
        state.step = "complete";
        this.generateSmartAssessment();
        break;
    }
  }

  // 显示测评总结并推荐量表
  showAssessmentSummaryAndRecommend() {
    const data = this.conversationState.data;

    // 显示收集的信息
    this.addAIMessage(
      `非常好！我已经收集到以下信息：<br><br>` +
        `👤 <strong>姓名</strong>：${data.name}<br>` +
        `🎂 <strong>年龄</strong>：${data.age}岁<br>` +
        `⚧ <strong>性别</strong>：${data.gender}<br>` +
        `🎯 <strong>测评方向</strong>：${data.direction}<br><br>` +
        `正在为您匹配合适的测评量表...`
    );

    // 延迟显示推荐量表
    setTimeout(() => {
      this.showRecommendedAssessments(data);
      // 重置对话状态
      this.conversationState = null;
    }, 1500);
  }

  // 显示推荐的测评量表
  showRecommendedAssessments(data) {
    const assessmentCard = `
      <div class="assessment-list-card">
        <div class="assessment-list-header">
          <div class="assessment-list-title">📊 为${data.name}推荐的测评量表</div>
        </div>
        <div class="assessment-item clickable-item" data-assessment-id="1" data-name="${data.name}">
          <div class="assessment-item-title">中学生情绪稳定性测评</div>
          <div class="assessment-item-meta">
            <span>⏱ 15分钟</span>
            <span>🔘 单选题</span>
            <span>⭐ 推荐</span>
          </div>
        </div>
        <div class="assessment-item clickable-item" data-assessment-id="2" data-name="${data.name}">
          <div class="assessment-item-title">学习适应性测评量表</div>
          <div class="assessment-item-meta">
            <span>⏱ 20分钟</span>
            <span>☑ 多选题</span>
            <span>🔄 常用</span>
          </div>
        </div>
        <div class="assessment-item clickable-item" data-assessment-id="3" data-name="${data.name}">
          <div class="assessment-item-title">社交能力评估量表</div>
          <div class="assessment-item-meta">
            <span>⏱ 25分钟</span>
            <span>📊 滑动评分</span>
            <span>📈 专业版</span>
          </div>
        </div>
      </div>
    `;

    this.addAIMessage(
      `根据您提供的信息，我为<strong>${data.name}</strong>（${data.age}岁，${data.gender}）推荐以下测评量表：`,
      assessmentCard
    );

    // 绑定点击事件
    setTimeout(() => {
      this.bindAssessmentItemEvents();
    }, 100);
  }

  // 绑定测评项点击事件
  bindAssessmentItemEvents() {
    // 移除旧的事件监听器，避免重复绑定
    document.querySelectorAll(".clickable-item").forEach((item) => {
      // 克隆节点来移除所有事件监听器
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);
    });

    // 重新绑定事件
    document.querySelectorAll(".clickable-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const assessmentId = e.currentTarget.dataset.assessmentId;
        const caseId = e.currentTarget.dataset.caseId;
        const name = e.currentTarget.dataset.name;

        if (assessmentId) {
          this.openAssessmentDetail(assessmentId, name);
        } else if (caseId) {
          this.openCaseDetail(caseId, name);
        }
      });
    });
  }

  // 处理案例检索对话流程
  handleCaseSearchFlow(message) {
    const state = this.conversationState;

    switch (state.step) {
      case "name":
        // 查询数据库中是否存在该姓名
        const students = this.queryStudentsByName(message);

        if (students.length === 0) {
          // 没有找到，继续询问
          state.data.name = message;
          state.step = "age";
          this.addAIMessage(
            `好的，${message}。<br><br>请问<strong>年龄</strong>是多少？`
          );
        } else if (students.length === 1) {
          // 找到唯一记录，显示确认
          state.data.possibleStudents = students;
          state.step = "confirm-student";
          this.showStudentConfirmation(students[0]);
        } else {
          // 找到多个记录，让用户选择
          state.data.possibleStudents = students;
          state.step = "select-student";
          this.showStudentSelection(students);
        }
        break;

      case "confirm-student":
        const lowerMsg = message.toLowerCase();
        if (
          lowerMsg.includes("是") ||
          lowerMsg.includes("对") ||
          lowerMsg.includes("确认")
        ) {
          // 用户确认，使用已有数据
          const student = state.data.possibleStudents[0];
          state.data.name = student.name;
          state.data.age = student.age;
          state.data.gender = student.gender;
          state.data.studentId = student.id;
          state.step = "problem";
          this.addAIMessage(
            `太好了！已为您加载${student.name}的信息。<br><br>请<strong>简要描述</strong>学生的问题或需要检索的案例类型：<br><br>• 问题关键词（如：考前焦虑、厌学等）<br>• 问题严重程度<br>• 其他相关信息`
          );
        } else {
          // 用户不确认，重新输入
          state.step = "name";
          state.data.possibleStudents = null;
          this.addAIMessage("好的，那请重新输入<strong>学生的姓名</strong>：");
        }
        break;

      case "select-student":
        const selectedIndex = parseInt(message);
        if (
          isNaN(selectedIndex) ||
          selectedIndex < 1 ||
          selectedIndex > state.data.possibleStudents.length
        ) {
          this.addAIMessage(
            `请输入有效的序号（1-${state.data.possibleStudents.length}）`
          );
          return;
        }
        // 用户选择了某个学生
        const selectedStudent = state.data.possibleStudents[selectedIndex - 1];
        state.data.name = selectedStudent.name;
        state.data.age = selectedStudent.age;
        state.data.gender = selectedStudent.gender;
        state.data.studentId = selectedStudent.id;
        state.step = "problem";
        this.addAIMessage(
          `好的！已选择${selectedStudent.name}（${selectedStudent.age}岁，${selectedStudent.gender}，${selectedStudent.grade}）。<br><br>请<strong>简要描述</strong>学生的问题或需要检索的案例类型：<br><br>• 问题关键词（如：考前焦虑、厌学等）<br>• 问题严重程度<br>• 其他相关信息`
        );
        break;

      case "age":
        const age = parseInt(message);
        if (isNaN(age) || age < 6 || age > 18) {
          this.addAIMessage("抱歉，请输入有效的年龄（6-18岁之间的数字）");
          return;
        }
        state.data.age = age;
        state.step = "gender";
        this.addAIMessage(
          "明白了。<br><br>请问<strong>性别</strong>是？（男/女）"
        );
        break;

      case "gender":
        const gender = message.includes("男")
          ? "男"
          : message.includes("女")
          ? "女"
          : null;
        if (!gender) {
          this.addAIMessage('请输入"男"或"女"');
          return;
        }
        state.data.gender = gender;
        state.step = "problem";
        this.addAIMessage(
          `好的。<br><br>请<strong>简要描述</strong>学生的问题或需要检索的案例类型：<br><br>• 问题关键词（如：考前焦虑、厌学等）<br>• 问题严重程度<br>• 其他相关信息`
        );
        break;

      case "problem":
        if (message.length < 5) {
          this.addAIMessage(
            "请提供更详细的描述（至少5个字），这样我才能为您匹配更准确的案例。"
          );
          return;
        }
        state.data.problem = message;
        state.step = "complete";
        this.searchAndShowCases();
        break;
    }
  }

  // 搜索并显示案例
  searchAndShowCases() {
    const data = this.conversationState.data;

    // 显示收集的信息
    this.addAIMessage(
      `好的，我已经收集到以下信息：<br><br>` +
        `👤 <strong>姓名</strong>：${data.name}<br>` +
        `🎂 <strong>年龄</strong>：${data.age}岁<br>` +
        `⚧ <strong>性别</strong>：${data.gender}<br>` +
        `📝 <strong>问题描述</strong>：${data.problem}<br><br>` +
        `正在为您匹配相似案例...`
    );

    // 延迟显示案例结果
    setTimeout(() => {
      this.showMatchedCases(data);
      // 重置对话状态
      this.conversationState = null;
    }, 1500);
  }

  // 显示匹配的案例
  showMatchedCases(data) {
    const casesCard = `
      <div class="assessment-list-card">
        <div class="assessment-list-header">
          <div class="assessment-list-title">🔍 为${data.name}匹配的相似案例</div>
        </div>
        <div class="case-match-info">
          <div class="match-label">匹配度</div>
          <div class="match-tags">
            <span class="match-tag high">年龄相近</span>
            <span class="match-tag high">性别相同</span>
            <span class="match-tag medium">问题相似</span>
          </div>
        </div>
        <div class="assessment-item clickable-item" data-case-id="1" data-name="${data.name}">
          <div class="assessment-item-title">考前焦虑疏导方案</div>
          <div class="assessment-item-meta">
            <span>初中</span>
            <span>中度</span>
            <span>成功率 85%</span>
            <span>⭐ 128收藏</span>
          </div>
        </div>
        <div class="assessment-item clickable-item" data-case-id="2" data-name="${data.name}">
          <div class="assessment-item-title">学习动力不足干预案例</div>
          <div class="assessment-item-meta">
            <span>初中</span>
            <span>中度</span>
            <span>成功率 78%</span>
            <span>⭐ 95收藏</span>
          </div>
        </div>
        <div class="assessment-item clickable-item" data-case-id="3" data-name="${data.name}">
          <div class="assessment-item-title">家庭沟通障碍解决方案</div>
          <div class="assessment-item-meta">
            <span>全学段</span>
            <span>轻度</span>
            <span>成功率 92%</span>
            <span>⭐ 156收藏</span>
          </div>
        </div>
      </div>
    `;

    this.addAIMessage(
      `✅ 已为<strong>${data.name}</strong>（${data.age}岁，${data.gender}）匹配到以下相似案例：`,
      casesCard
    );

    // 绑定点击事件
    setTimeout(() => {
      this.bindCaseItemEvents();
    }, 100);
  }

  // 绑定案例项点击事件（统一使用bindAssessmentItemEvents）
  bindCaseItemEvents() {
    this.bindAssessmentItemEvents();
  }

  // 打开案例详情
  openCaseDetail(id, name) {
    this.showToast(`正在为${name}打开案例详情...`);
    setTimeout(() => {
      this.addAIMessage(
        `案例详情页功能开发中...<br><br>您选择了案例：<strong>案例${id}</strong><br><br>实际应用中，这里会显示：<br>• 案例背景<br>• 问题分析<br>• 解决方案<br>• 实施步骤<br>• 效果评估`
      );
    }, 1000);
  }

  // 生成智能评估
  generateSmartAssessment() {
    const data = this.conversationState.data;

    // 显示收集的信息
    this.addAIMessage(
      `好的，我已经收集到以下信息：<br><br>` +
        `👤 <strong>姓名</strong>：${data.name}<br>` +
        `🎂 <strong>年龄</strong>：${data.age}岁<br>` +
        `⚧ <strong>性别</strong>：${data.gender}<br>` +
        `📝 <strong>问题描述</strong>：${data.problem.substring(
          0,
          50
        )}...<br><br>` +
        `正在生成智能评估报告...`
    );

    // 延迟显示评估结果
    setTimeout(() => {
      this.showSmartAssessmentResult(data);
      // 重置对话状态
      this.conversationState = null;
    }, 2000);
  }

  // 显示智能评估结果
  showSmartAssessmentResult(data) {
    const assessmentResult = `
      <div class="assessment-result-card">
        <div class="result-section">
          <div class="result-section-title">📋 评估意见</div>
          <div class="result-content">
            根据您提供的信息，${data.name}（${data.age}岁，${data.gender}）目前表现出的问题需要关注。建议从以下几个方面进行干预：
            <br><br>
            <strong>1. 心理状态评估</strong><br>
            学生可能处于心理压力较大的状态，需要及时疏导。
            <br><br>
            <strong>2. 行为观察</strong><br>
            建议持续观察学生的日常行为变化，记录异常表现。
            <br><br>
            <strong>3. 风险等级</strong><br>
            <span style="color: var(--warning-orange);">⚠️ 中度关注</span>
          </div>
        </div>
        
        <div class="result-section">
          <div class="result-section-title">💡 辅导建议</div>
          <div class="result-content">
            <strong>短期措施（1-2周）：</strong><br>
            • 建立信任关系，多倾听学生的想法<br>
            • 创造安全的表达环境<br>
            • 适当减轻学业压力<br>
            <br>
            <strong>中期措施（1-2个月）：</strong><br>
            • 定期心理辅导（每周1-2次）<br>
            • 家校配合，共同关注<br>
            • 培养积极的兴趣爱好<br>
            <br>
            <strong>长期措施：</strong><br>
            • 建立健康的心理调节机制<br>
            • 提升抗压能力和情绪管理能力<br>
            • 必要时寻求专业心理咨询
          </div>
        </div>
        
        <div class="result-section">
          <div class="result-section-title">🏠 家访大纲</div>
          <div class="result-content">
            <strong>访前准备：</strong><br>
            • 了解家庭基本情况<br>
            • 准备学生在校表现材料<br>
            • 预约合适的时间<br>
            <br>
            <strong>访中沟通要点：</strong><br>
            1. 肯定学生的优点和进步<br>
            2. 客观描述需要关注的问题<br>
            3. 了解家庭教育方式和亲子关系<br>
            4. 共同制定改进计划<br>
            5. 建立后续沟通机制<br>
            <br>
            <strong>访后跟进：</strong><br>
            • 记录家访内容<br>
            • 定期反馈学生进展<br>
            • 调整辅导策略
          </div>
        </div>
        
        <div class="result-actions">
          <button class="btn btn-secondary" onclick="app.showToast('评估报告已保存')">💾 保存报告</button>
          <button class="btn btn-primary" onclick="app.showToast('正在导出PDF...')">📄 导出PDF</button>
        </div>
      </div>
    `;

    this.addAIMessage(
      `✅ 智能评估报告已生成！<br><br>为<strong>${data.name}</strong>提供以下专业建议：`,
      assessmentResult
    );
  }

  // 显示学生确认信息
  showStudentConfirmation(student) {
    const confirmCard = `
      <div class="student-confirm-card">
        <div class="confirm-title">📋 找到以下学生信息</div>
        <div class="student-info-item">
          <span class="info-label">姓名：</span>
          <span class="info-value">${student.name}</span>
        </div>
        <div class="student-info-item">
          <span class="info-label">年龄：</span>
          <span class="info-value">${student.age}岁</span>
        </div>
        <div class="student-info-item">
          <span class="info-label">性别：</span>
          <span class="info-value">${student.gender}</span>
        </div>
        <div class="student-info-item">
          <span class="info-label">年级：</span>
          <span class="info-value">${student.grade}</span>
        </div>
        <div class="student-info-item">
          <span class="info-label">上次测评：</span>
          <span class="info-value">${student.lastAssessment}</span>
        </div>
      </div>
    `;

    this.addAIMessage(
      `我在数据库中找到了<strong>${student.name}</strong>的记录：`,
      confirmCard
    );

    setTimeout(() => {
      this.addAIMessage(
        '请确认是否是这位学生？<br><br>• 回复"是"或"确认"继续<br>• 回复"否"重新输入'
      );
    }, 500);
  }

  // 显示学生选择列表
  showStudentSelection(students) {
    let selectionCard = `
      <div class="student-selection-card">
        <div class="selection-title">📋 找到${students.length}位同名学生</div>
    `;

    students.forEach((student, index) => {
      selectionCard += `
        <div class="student-option" data-index="${index + 1}">
          <div class="option-number">${index + 1}</div>
          <div class="option-info">
            <div class="option-name">${student.name}</div>
            <div class="option-details">
              ${student.age}岁 · ${student.gender} · ${student.grade}<br>
              上次测评：${student.lastAssessment}
            </div>
          </div>
        </div>
      `;
    });

    selectionCard += `
      <div class="input-hint-card">
        <div class="hint-icon">💡</div>
        <div class="hint-content">
          <div class="hint-title">如何选择？</div>
          <div class="hint-text">请在输入框中输入序号（1-${students.length}），然后发送</div>
        </div>
      </div>
    `;

    selectionCard += `</div>`;

    this.addAIMessage(
      `我在数据库中找到了<strong>${students.length}位</strong>名叫"${students[0].name}"的学生：`,
      selectionCard
    );
  }

  // 打开测评详情
  openAssessmentDetail(id, name) {
    this.showToast(`正在为${name}打开测评详情...`);
    // 这里可以跳转到测评详情页
    setTimeout(() => {
      this.addAIMessage(
        `测评详情页功能开发中...<br><br>您选择了：<strong>${name}</strong> 的测评项目<br><br>实际应用中，这里会跳转到完整的测评问卷页面。`
      );
    }, 1000);
  }

  // 显示视频详情
  showVideoDetail(videoId) {
    this.navigateToPage("video-detail");
    // 这里可以根据videoId加载不同的视频内容
  }

  // 快捷操作处理（保留用于其他地方调用）
  handleQuickAction(action) {
    switch (action) {
      case "assessment":
        this.navigateToPage("assessment");
        break;
      case "case-search":
        this.navigateToPage("case-filter");
        break;
      case "visit-plan":
        this.navigateToPage("visit-plan");
        break;
      case "collections":
        this.navigateToPage("collections");
        break;
    }
  }

  // Toast提示
  showToast(message) {
    // 移除已存在的toast
    const existingToast = document.querySelector(".toast-message");
    if (existingToast) {
      existingToast.remove();
    }

    // 创建新toast
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    document.body.appendChild(toast);

    // 显示动画
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    // 3秒后隐藏
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  // 滚动到底部
  scrollToBottom() {
    const chatMessages = document.getElementById("chatMessages");
    if (chatMessages) {
      setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 100);
    }
  }

  // HTML转义
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  switchPage(page) {
    if (this.currentPage === page) return;

    // 更新Tab状态
    document.querySelectorAll(".tab-item").forEach((tab) => {
      tab.classList.remove("active");
    });
    // document.querySelector(`[data-page="${page}"]`)s.classList.add('active');

    this.currentPage = page;
    this.loadPage(page);
  }

  loadPage(page) {
    const pageContent = document.getElementById("pageContent");

    // 添加加载动画
    pageContent.innerHTML = this.getSkeletonHTML();

    // 模拟加载延迟
    setTimeout(() => {
      pageContent.innerHTML = this.getPageHTML(page);
      this.bindPageEvents(page);
    }, 500);
  }

  getSkeletonHTML() {
    return `
            <div class="card">
                <div class="skeleton" style="height: 20px; width: 60%; margin-bottom: 12px;"></div>
                <div class="skeleton" style="height: 16px; width: 80%;"></div>
            </div>
            <div class="grid-4">
                ${Array(4)
                  .fill()
                  .map(
                    () => `
                    <div class="quick-access-card">
                        <div class="skeleton" style="height: 24px; width: 24px; margin: 0 auto 8px;"></div>
                        <div class="skeleton" style="height: 14px; width: 40px; margin: 0 auto;"></div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <div class="skeleton" style="height: 100px; border-radius: 12px; margin-bottom: 16px;"></div>
            <div class="card">
                ${Array(3)
                  .fill()
                  .map(
                    () => `
                    <div style="display: flex; align-items: center; margin-bottom: 16px;">
                        <div class="skeleton" style="width: 20px; height: 20px; border-radius: 50%; margin-right: 12px;"></div>
                        <div style="flex: 1;">
                            <div class="skeleton" style="height: 16px; width: 70%; margin-bottom: 4px;"></div>
                            <div class="skeleton" style="height: 12px; width: 40%;"></div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  getPageHTML(page) {
    const pages = {
      home: this.getHomeHTML(),
      assessment: this.getAssessmentHTML(),
      cases: this.getCasesHTML(),
      caseslist: this.getCaseListHTML(),
      profile: this.getProfileHTML(),
    };

    return pages[page] || '<div class="card">页面加载中...</div>';
  }
  getHomeHTML() {
    setTimeout(() => {
        this.initChatInterface();
    }, 2000);
    return `
    <!-- 聊天消息区域 -->
    <div class="chat-messages" id="chatMessages">
        <!-- 欢迎消息 -->
        <div class="message-group ai-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-bubble welcome-bubble">
                    <div class="welcome-header">
                        <span class="wave-emoji">👋</span>
                        <strong>张老师，下午好！</strong>
                    </div>
                    <p class="welcome-intro">我是您的智能心理辅导助手，可以帮您：</p>
                    <div class="feature-menu-grid">
                        <div class="feature-menu-item-compact" data-page="assessment">
                            <div class="feature-icon-compact">📊</div>
                            <div class="feature-title-compact">心理测评</div>
                        </div>
                        <div class="feature-menu-item-compact" data-page="case-filter">
                            <div class="feature-icon-compact">🔍</div>
                            <div class="feature-title-compact">案例检索</div>
                        </div>
                        <div class="feature-menu-item-compact" data-page="smart-assessment">
                            <div class="feature-icon-compact">🧠</div>
                            <div class="feature-title-compact">智能评估</div>
                        </div>
                        <div class="feature-menu-item-compact" data-page="mentor-36">
                            <div class="feature-icon-compact">🎓</div>
                            <div class="feature-title-compact">导师36计</div>
                        </div>
                    </div>
                    <p class="hint-text">💬 也可以直接输入您的需求，我会智能识别并帮助您</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 聊天输入区域（固定在顶部） -->
    <div class="chat-input-container-fixed">
        <div class="chat-input-wrapper">
            <button class="voice-btn" title="语音输入">🎤</button>
            <input type="text" class="chat-input" id="chatInput" placeholder="输入您的问题或需求...">
            <button class="send-btn" id="sendBtn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 10L18 2L10 18L8 11L2 10Z" fill="currentColor"/>
                </svg>
            </button>
        </div>
    </div>
        `;
  }
  getHomeHTML2() {
    return `
            <!-- 搜索框 -->
            <div class="search-bar">
                <span>🔍</span>
                <input type="text" placeholder="搜索测评量表、案例...">
            </div>

            <!-- 欢迎区域 -->
            <div class="card">
                <div style="display: flex; align-items: center;">
                    <div style="width: 48px; height: 48px; background: #E0E6ED; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                        <span style="font-size: 20px;">👤</span>
                    </div>
                    <div>
                        <div style="font-weight: 500; font-size: 16px;">张老师，下午好</div>
                        <div style="color: var(--text-secondary); font-size: 14px;">北京市第一中学 - 心理教师</div>
                    </div>
                </div>
            </div>

            <!-- 快捷入口 -->
            <div class="grid-4">
                <div class="quick-access-card highlight" data-action="start-assessment">
                    <div class="quick-access-icon">📊</div>
                    <div>开始测评</div>
                </div>
                <div class="quick-access-card" data-action="search-cases">
                    <div class="quick-access-icon">🔍</div>
                    <div>案例检索</div>
                </div>
                <div class="quick-access-card" data-action="my-collections">
                    <div class="quick-access-icon">⭐</div>
                    <div>我的收藏</div>
                </div>
                <div class="quick-access-card" data-action="visit-outline">
                    <div class="quick-access-icon">🏠</div>
                    <div>家访大纲</div>
                </div>
            </div>

            <!-- 数据看板 -->
            <div class="stats-card">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <div class="stats-number">3</div>
                        <div class="stats-label">待处理测评</div>
                    </div>
                    <div>
                        <div class="stats-number">12</div>
                        <div class="stats-label">收藏案例</div>
                    </div>
                </div>
            </div>

            <!-- 近期任务提醒 -->
            <div class="card">
                <div style="font-weight: 500; margin-bottom: 16px;">📋 近期任务提醒</div>
                <div class="task-item">
                    <div class="task-checkbox checked"></div>
                    <div class="task-content">
                        <div class="task-title">李同学家访准备</div>
                        <div class="task-time">今天 14:00</div>
                    </div>
                </div>
                <div class="task-item">
                    <div class="task-checkbox"></div>
                    <div class="task-content">
                        <div class="task-title">王同学测评报告</div>
                        <div class="task-time">明天 10:00</div>
                    </div>
                </div>
                <div class="task-item">
                    <div class="task-checkbox"></div>
                    <div class="task-content">
                        <div class="task-title">班级心理活动策划</div>
                        <div class="task-time">10月12日 15:00</div>
                    </div>
                </div>
            </div>
        `;
  }

  getAssessmentHTML() {
    return `
            <!-- 搜索和筛选 -->
            <div class="search-bar">
                <span>🔍</span>
                <input type="text" placeholder="搜索心理测评量表...">
            </div>

            <div style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto;">
                <div class="tag" style="background: var(--primary-blue); color: white;">全部</div>
                <div class="tag">小学</div>
                <div class="tag">初中</div>
                <div class="tag">高中</div>
                <div class="tag">情绪</div>
                <div class="tag">学习适应</div>
                <div class="tag">社交</div>
            </div>

            <!-- 测评列表 -->
            <div class="list-item" data-action="assessment-detail" data-id="1">
                <div class="list-title">中学生情绪稳定性测评</div>
                <div class="list-description">评估学生情绪调节能力和抗压能力</div>
                <div class="list-tags">
                    <div class="tag">⏱ 15分钟</div>
                    <div class="tag">🔘 单选</div>
                    <div class="tag">⭐ 常用</div>
                </div>
            </div>

            <div class="list-item" data-action="assessment-detail" data-id="2">
                <div class="list-title">学习适应性测评</div>
                <div class="list-description">检测学习习惯和课堂适应能力</div>
                <div class="list-tags">
                    <div class="tag">⏱ 20分钟</div>
                    <div class="tag">☑ 多选</div>
                    <div class="tag">🔄 最近使用</div>
                </div>
            </div>

            <div class="list-item" data-action="assessment-detail" data-id="3">
                <div class="list-title">社交能力评估量表</div>
                <div class="list-description">测量学生人际交往和团队协作能力</div>
                <div class="list-tags">
                    <div class="tag">⏱ 25分钟</div>
                    <div class="tag">📊 滑动评分</div>
                    <div class="tag">📈 专业版</div>
                </div>
            </div>

            <!-- 继续未完成测评 -->
            <div style="position: fixed; bottom: 80px; right: 20px;">
                <div class="btn btn-primary" style="border-radius: 50%; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                    🔄
                </div>
            </div>
        `;
  }

  getCasesHTML() {
    return this.getCaseFilterHTML();
  }

  getCaseFilterHTML() {
    return `
            <div class="card">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-weight: 500; font-size: 18px; margin-bottom: 8px;">案例条件筛选</div>
                    <div style="color: var(--text-secondary);">请填写学生信息进行精准匹配</div>
                </div>

                <!-- 学生基础信息 -->
                <div style="margin-bottom: 24px;">
                    <div style="font-weight: 500; margin-bottom: 12px; color: var(--primary-blue);">👤 学生基础信息</div>
                    <div style="display: grid; gap: 12px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div>
                                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">年龄</div>
                                <input type="number" class="input-field" placeholder="请输入年龄" min="6" max="18">
                            </div>
                            <div>
                                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">性别</div>
                                <select class="input-field">
                                    <option value="">请选择</option>
                                    <option value="male">男</option>
                                    <option value="female">女</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div>
                                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">身高(cm)</div>
                                <input type="number" class="input-field" placeholder="身高">
                            </div>
                            <div>
                                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">体重(kg)</div>
                                <input type="number" class="input-field" placeholder="体重">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 心理问题维度 -->
                <div style="margin-bottom: 24px;">
                    <div style="font-weight: 500; margin-bottom: 12px; color: var(--primary-blue);">🧠 心理问题维度</div>
                    
                    <div style="margin-bottom: 12px;">
                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">问题关键词</div>
                        <input type="text" class="input-field" placeholder="如：考前焦虑、亲子沟通障碍">
                    </div>

                    <div style="margin-bottom: 12px;">
                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">问题严重程度</div>
                        <div style="display: flex; gap: 8px;">
                            <label style="flex: 1; text-align: center;">
                                <input type="radio" name="severity" value="mild" style="display: none;">
                                <div class="severity-tag" data-value="mild">轻度</div>
                            </label>
                            <label style="flex: 1; text-align: center;">
                                <input type="radio" name="severity" value="moderate" style="display: none;">
                                <div class="severity-tag" data-value="moderate">中度</div>
                            </label>
                            <label style="flex: 1; text-align: center;">
                                <input type="radio" name="severity" value="severe" style="display: none;">
                                <div class="severity-tag" data-value="severe">重度</div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">学生学段</div>
                        <div style="display: flex; gap: 8px;">
                            <label style="flex: 1; text-align: center;">
                                <input type="radio" name="grade" value="primary" style="display: none;">
                                <div class="grade-tag" data-value="primary">小学</div>
                            </label>
                            <label style="flex: 1; text-align: center;">
                                <input type="radio" name="grade" value="middle" style="display: none;">
                                <div class="grade-tag" data-value="middle">初中</div>
                            </label>
                            <label style="flex: 1; text-align: center;">
                                <input type="radio" name="grade" value="high" style="display: none;">
                                <div class="grade-tag" data-value="high">高中</div>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- 具体情况描述 -->
                <div style="margin-bottom: 24px;">
                    <div style="font-weight: 500; margin-bottom: 12px; color: var(--primary-blue);">📝 具体情况描述</div>
                    <textarea class="input-field" placeholder="请详细描述学生的具体情况、表现症状、家庭背景等信息..." style="height: 80px; resize: vertical;"></textarea>
                </div>

                <!-- 操作按钮 -->
                <div style="display: grid; gap: 12px;">
                    <button class="btn btn-primary" data-action="cases-results">🔍 查询案例</button>
                    <button class="btn btn-secondary" data-action="reset-filter">🔄 重置条件</button>
                </div>
            </div>
        `;
  }

  getCaseListHTML() {
    return `
            <!-- 搜索和筛选 -->

            <div style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto;">
                <div class="tag" style="background: var(--primary-blue); color: white;">全部</div>
                <div class="tag">家访场景</div>
                <div class="tag">个体辅导</div>
                <div class="tag">班级活动</div>
                <div class="tag">轻度</div>
                <div class="tag">中度</div>
                <div class="tag">重度</div>
            </div>

            <!-- 案例列表 -->
            <div class="list-item" data-action="case-detail" data-id="1">
                <div class="list-title">考前焦虑疏导方案</div>
                <div class="list-description">针对考试焦虑学生的系统干预方案</div>
                <div class="list-tags">
                    <div class="tag">初中</div>
                    <div class="tag">中度</div>
                    <div class="tag">个体辅导</div>
                    <div class="tag">成功率 85%</div>
                    <div class="tag">⭐ 128收藏</div>
                </div>
            </div>

            <div class="list-item" data-action="case-detail" data-id="2">
                <div class="list-title">家访沟通技巧指南</div>
                <div class="list-description">提升家访效果的实用沟通策略</div>
                <div class="list-tags">
                    <div class="tag">全学段</div>
                    <div class="tag">通用</div>
                    <div class="tag">家访场景</div>
                    <div class="tag">成功率 92%</div>
                    <div class="tag">⭐ 256收藏</div>
                </div>
            </div>

            <div class="list-item" data-action="case-detail" data-id="3">
                <div class="list-title">班级冲突调解方案</div>
                <div class="list-description">处理学生间矛盾的有效方法</div>
                <div class="list-tags">
                    <div class="tag">高中</div>
                    <div class="tag">中度</div>
                    <div class="tag">班级活动</div>
                    <div class="tag">成功率 78%</div>
                    <div class="tag">⭐ 89收藏</div>
                </div>
            </div>

            <!-- 返回筛选按钮 -->
            <div style="margin-top: 20px;">
                <button class="btn btn-secondary" data-action="back-to-filter" style="width: 100%;">
                    ← 返回条件筛选
                </button>
            </div>
        `;
  }

  getProfileHTML() {
    return `
            <!-- 用户信息 -->
            <div class="card">
            <div style="text-align: right">算力积分： 99</div>
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <div style="width: 64px; height: 64px; background: #E0E6ED; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                        <span style="font-size: 24px;">👤</span>
                    </div>
                    <div>
                        <div style="font-weight: 500; font-size: 18px; margin-bottom: 4px;">张老师</div>
                        <div style="color: var(--text-secondary);">北京市第一中学 - 心理教师</div>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <div style="flex: 1; text-align: center;">
                        <div style="font-weight: 500; font-size: 16px;">23</div>
                        <div style="color: var(--text-secondary); font-size: 14px;">测评记录</div>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="font-weight: 500; font-size: 16px;">12</div>
                        <div style="color: var(--text-secondary); font-size: 14px;">收藏案例</div>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="font-weight: 500; font-size: 16px;">8</div>
                        <div style="color: var(--text-secondary); font-size: 14px;">评估记录</div>
                    </div>
                </div>
            </div>

            <!-- 功能菜单 -->
            <div class="card">
                <div class="list-item" data-action="settings">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">🎛️</span>
                        <div>我的个案</div>
                    </div>
                </div>
                <div class="list-item" data-action="settings">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">🛡️</span>
                        <div>我的工作台</div>
                    </div>
                </div>
                <div class="list-item" data-action="notifications">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">💡</span>
                        <div>积分充值</div>
                    </div>
                </div>
                <div class="list-item" data-action="security">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">📋</span>
                        <div>订单中心</div>
                    </div>
                </div>
                <div class="list-item" data-action="about">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">📖</span>
                        <div>意见反馈</div>
                    </div>
                </div>
                <div class="list-item" data-action="about">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">ℹ️</span>
                        <div>退出</div>
                    </div>
                </div>
            </div>

        `;
  }

  bindPageEvents(page) {
    // 绑定页面内交互事件
    const pageContent = document.getElementById("pageContent");

    // 快捷入口点击事件
    pageContent.querySelectorAll("[data-action]").forEach((element) => {
      element.addEventListener("click", (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleAction(action, e.currentTarget.dataset);
      });
    });

    // 任务完成勾选
    pageContent.querySelectorAll(".task-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("checked");
      });
    });

    // 案例筛选页面特殊事件
    if (page === "cases") {
      this.bindCaseFilterEvents();
    }
  }

  bindCaseFilterEvents() {
    const pageContent = document.getElementById("pageContent");

    // 严重程度标签点击事件
    pageContent.querySelectorAll(".severity-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        // 移除其他标签的选中状态
        pageContent.querySelectorAll(".severity-tag").forEach((t) => {
          t.classList.remove("selected");
        });
        // 设置当前标签为选中状态
        e.currentTarget.classList.add("selected");
        // 更新对应的radio按钮
        const radio = pageContent.querySelector(
          `input[name="severity"][value="${e.currentTarget.dataset.value}"]`
        );
        if (radio) radio.checked = true;
      });
    });

    // 学段标签点击事件
    pageContent.querySelectorAll(".grade-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        // 移除其他标签的选中状态
        pageContent.querySelectorAll(".grade-tag").forEach((t) => {
          t.classList.remove("selected");
        });
        // 设置当前标签为选中状态
        e.currentTarget.classList.add("selected");
        // 更新对应的radio按钮
        const radio = pageContent.querySelector(
          `input[name="grade"][value="${e.currentTarget.dataset.value}"]`
        );
        if (radio) radio.checked = true;
      });
    });
  }

  handleAction(action, data) {
    console.log("执行操作:", action, data);

    // 模拟不同的操作反馈
    switch (action) {
      case "start-assessment":
        this.showToast("正在加载测评量表...");
        setTimeout(() => this.switchPage("assessment"), 1000);
        break;

      case "search-cases":
        this.showToast("跳转到案例检索");
        setTimeout(() => this.switchPage("cases"), 500);
        break;

      case "assessment-detail":
        this.showAssessmentDetail(data.id);
        break;

      case "case-detail":
        this.showCaseDetail(data.id);
        break;

      case "cases-results":
        this.showToast("跳转到案例结果列表");
        setTimeout(() => this.switchPage("caseslist"), 500);
        break;

      case "reset-filter":
        this.resetCaseFilter();
        break;

      case "back-to-filter":
        this.showCaseFilter();
        break;

      default:
        this.showToast(`执行操作: ${action}`);
    }
  }

  showAssessmentDetail(id) {
    const detailHTML = `
            <div style="position: relative;">
                <div style="position: absolute; left: 0; top: 0; padding: 16px; cursor: pointer;" onclick="app.switchPage('assessment')">
                    ← 返回
                </div>
                <div style="text-align: center; padding: 20px 0;">
                    <div style="font-weight: 500; font-size: 18px; margin-bottom: 8px;">中学生情绪稳定性测评</div>
                    <div style="color: var(--text-secondary);">评估学生情绪调节能力和抗压能力</div>
                </div>
            </div>

            <div class="card">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">测评进度</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 15%"></div>
                    </div>
                    <div style="font-size: 12px; color: var(--text-light);">3/20 已完成</div>
                </div>

                <div style="margin-bottom: 20px;">
                    <div style="font-weight: 500; margin-bottom: 12px;">3. 当遇到挫折时，你通常：</div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="display: flex; align-items: center; padding: 12px; border: 1px solid #E0E6ED; border-radius: 8px;">
                            <input type="radio" name="question3" style="margin-right: 8px;">
                            很快调整心态，继续努力
                        </label>
                        <label style="display: flex; align-items: center; padding: 12px; border: 1px solid #E0E6ED; border-radius: 8px;">
                            <input type="radio" name="question3" style="margin-right: 8px;">
                            需要一段时间才能恢复
                        </label>
                        <label style="display: flex; align-items: center; padding: 12px; border: 1px solid #E0E6ED; border-radius: 8px;">
                            <input type="radio" name="question3" style="margin-right: 8px;">
                            容易陷入消极情绪
                        </label>
                        <label style="display: flex; align-items: center; padding: 12px; border: 1px solid #E0E6ED; border-radius: 8px;">
                            <input type="radio" name="question3" style="margin-right: 8px;">
                            寻求他人帮助
                        </label>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <button class="btn btn-secondary">上一题</button>
                    <button class="btn btn-primary">下一题</button>
                </div>
            </div>
        `;

    document.getElementById("pageContent").innerHTML = detailHTML;
  }

  showCaseDetail(id) {
    const detailHTML = `
            <div style="position: relative;">
                <div style="position: absolute; left: 0; top: 0; padding: 16px; cursor: pointer;" onclick="app.switchPage('cases')">
                    ← 返回
                </div>
                <div style="text-align: center; padding: 20px 0;">
                    <div style="font-weight: 500; font-size: 18px; margin-bottom: 8px;">考前焦虑疏导方案</div>
                    <div style="color: var(--text-secondary);">初中 | 中度 | 个体辅导 | 成功率85%</div>
                </div>
            </div>

            <div class="card">
                <div style="font-weight: 500; margin-bottom: 12px;">案例背景</div>
                <div style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">
                    初三学生，考前出现严重焦虑症状，表现为失眠、食欲不振、注意力不集中，影响正常学习和生活。
                </div>

                <div style="font-weight: 500; margin-bottom: 12px;">解决方案</div>
                <div style="margin-bottom: 16px;">
                    <div style="color: var(--primary-blue); margin-bottom: 8px;">🎯 目标：缓解焦虑，提升考试信心</div>
                    <div style="color: var(--text-secondary); line-height: 1.6;">
                        1. 认知重构（3天）<br>
                        2. 放松训练（7天）<br>
                        3. 模拟考试（5天）
                    </div>
                </div>

                <div style="font-weight: 500; margin-bottom: 8px;">注意事项</div>
                <div style="color: var(--text-secondary); line-height: 1.6;">
                    避免过度施压，关注学生心理承受能力，及时调整干预强度。
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 20px;">
                <button class="btn btn-secondary">⭐ 收藏</button>
                <button class="btn btn-secondary">📝 批注</button>
                <button class="btn btn-primary">🚀 立即使用</button>
            </div>
        `;

    document.getElementById("pageContent").innerHTML = detailHTML;
  }

  showToast(message) {
    // 创建Toast提示
    const toast = document.createElement("div");
    toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-size: 14px;
        `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 2000);
  }

  handleScroll() {
    // 可以在这里添加滚动相关的逻辑
  }
}

// 初始化应用
const app = new WeChatMiniProgram();
