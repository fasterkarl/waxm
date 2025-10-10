// 微信小程序原型交互逻辑

class WeChatMiniProgram {
  constructor() {
    this.currentPage = "home";
    this.favorites = new Set();
    this.annotations = {};
    this.caseLinks = {};
    this.myCases = [
      {
        id: 101,
        name: "张小明",
        age: 12,
        gender: "男",
        problem: "学习压力大，注意力不集中",
      },
      {
        id: 102,
        name: "李华",
        age: 15,
        gender: "男",
        problem: "青春期叛逆，与父母沟通困难",
      },
      {
        id: 103,
        name: "王芳",
        age: 14,
        gender: "女",
        problem: "社交焦虑，不敢在课堂发言",
      },
    ];
    this.records = [
      {
        id: 201,
        student: {
          name: "张小明",
          age: 14,
          gender: "男",
          clazz: "初二（3）班",
        },
        date: "2025-10-01",
        assessment: "中学生情绪稳定性测评",
        status: "已完成",
        score: 78,
      },
      {
        id: 202,
        student: { name: "李华", age: 15, gender: "男", clazz: "初三（1）班" },
        date: "2025-09-28",
        assessment: "学习适应性测评",
        status: "进行中",
        progress: "12/20",
      },
      {
        id: 203,
        student: { name: "王芳", age: 14, gender: "女", clazz: "初二（5）班" },
        date: "2025-09-20",
        assessment: "社交能力评估量表",
        status: "未开始",
      },
    ];
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadPage("home");
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

  switchPage(page) {
    // if (this.currentPage === page) return;

    // 更新Tab状态
    document.querySelectorAll(".tab-item").forEach((tab) => {
      tab.classList.remove("active");
    });
    // document.querySelector(`[data-page="${page}"]`).classList.add('active');

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
      records: this.getRecordsHTML(),
      mycases: this.getMyCasesHTML(),
      annotlist: this.getAnnotationListHTML(),
      profile: this.getProfileHTML(),
    };

    return pages[page] || '<div class="card">页面加载中...</div>';
  }

  getHomeHTML() {
    return `
            <!-- 搜索框 -->
            <div class="search-bar">
                <input type="text" placeholder="AI心理学家哪吒Banner图片区域">
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
                    <div class="quick-access-icon">🧠</div>
                    <div>智能助手</div>
                </div>
                <div class="quick-access-card" data-action="visit-outline">
                    <div class="quick-access-icon">🏠</div>
                    <div>工作台</div>
                </div>
            </div>

            <!-- 数据看板 -->
            <div class="stats-card">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div data-action="records" style="cursor: pointer;">
                        <div class="stats-number">3</div>
                        <div class="stats-label">已完成测评</div>
                    </div>
                    <div data-action="caseslist" style="cursor: pointer;">
                        <div class="stats-number">12</div>
                        <div class="stats-label">收藏案例</div>
                    </div>
                </div>
            </div>

            <!-- 近期任务提醒 -->
            <div class="card">
                <div style="font-weight: 500; margin-bottom: 16px;">📋 热门量表推荐</div>
                <!-- 测评列表 -->
                <div class="list-item" data-action="assessment-detail" data-id="1">
                    <div class="list-title">中学生情绪稳定性测评</div>
                    <div class="list-description">评估学生情绪调节能力和抗压能力</div>
                    <div class="list-tags">
                        <div class="tag">⏱ 15道题</div>
                        <div class="tag">🔘 单选</div>
                        <div class="tag">⭐ 常用</div>
                    </div>
                </div>

                <div class="list-item" data-action="assessment-detail" data-id="2">
                    <div class="list-title">学习适应性测评</div>
                    <div class="list-description">检测学习习惯和课堂适应能力</div>
                    <div class="list-tags">
                        <div class="tag">⏱ 20道题</div>
                        <div class="tag">☑ 多选</div>
                        <div class="tag">🔄 最近使用</div>
                    </div>
                </div>

                <div class="list-item" data-action="assessment-detail" data-id="3">
                    <div class="list-title">社交能力评估量表</div>
                    <div class="list-description">测量学生人际交往和团队协作能力</div>
                    <div class="list-tags">
                        <div class="tag">⏱ 25道题</div>
                        <div class="tag">📊 滑动评分</div>
                        <div class="tag">📈 专业版</div>
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
                    <div class="tag">⏱ 15道题</div>
                    <div class="tag">🔘 单选</div>
                    <div class="tag">⭐ 常用</div>
                </div>
            </div>

            <div class="list-item" data-action="assessment-detail" data-id="2">
                <div class="list-title">学习适应性测评</div>
                <div class="list-description">检测学习习惯和课堂适应能力</div>
                <div class="list-tags">
                    <div class="tag">⏱ 20道题</div>
                    <div class="tag">☑ 多选</div>
                    <div class="tag">🔄 最近使用</div>
                </div>
            </div>

            <div class="list-item" data-action="assessment-detail" data-id="3">
                <div class="list-title">社交能力评估量表</div>
                <div class="list-description">测量学生人际交往和团队协作能力</div>
                <div class="list-tags">
                    <div class="tag">⏱ 25道题</div>
                    <div class="tag">📊 滑动评分</div>
                    <div class="tag">📈 专业版</div>
                </div>
            </div>

            <!-- 继续未完成测评 -->
            <div style="position: fixed; bottom: 80px; right: 20px; display: none;">
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
                    <div style="color: var(--text-secondary);">请填写学生信息<br>或选择已有个案进行精准匹配</div>
                </div>
                <button id="selectCaseBtn" class="btn btn-primary" style="width: 100%; margin-bottom: 24px;">🔍 选择个案</button>
                
                <!-- 个案列表弹窗 -->
                <div id="caseListModal" class="modal" style="display: none;">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h3>个案列表</h3>
                      <span id="closeModal" class="close-btn">&times;</span>
                    </div>
                    <div class="modal-body">
                      <div class="search-bar">
                        <input type="text" placeholder="搜索姓名..." id="caseSearchInput">
                      </div>
                      <div class="case-list" id="caseListContainer">
                        <!-- 个案列表将在这里动态生成 -->
                      </div>
                    </div>
                  </div>
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
  //  <div class="tag">轻度</div>
  //                 <div class="tag">中度</div>
  //                 <div class="tag">重度</div>
  getCaseListHTML() {
    return `
            <!-- 搜索和筛选 -->

            <div style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto;">
                <div class="tag" style="background: var(--primary-blue); color: white;">全部</div>
                <div class="tag">家访场景</div>
                <div class="tag">个体辅导</div>
                <div class="tag">班级活动</div>
               <div class="tag" style="background: var(--primary-blue); color: white;">自定义</div>
            </div>

            <!-- 案例列表 -->
            <div class="list-item" data-action="case-detail" data-id="1">
                <div class="list-title">考前焦虑疏导方案</div>
                <div class="list-description">针对考试焦虑学生的系统干预方案</div>
                <div class="list-tags">
                    <div class="tag">初中</div>
                    <div class="tag">中度</div>
                    <div class="tag">个体辅导</div>
                    <div class="tag">匹配度 95%</div>
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
                    <div class="tag">匹配度 85%</div>
                    <div class="tag">⭐ 256收藏</div>
                    <div class="tag" style="background: var(--primary-blue); color: white;">调整分类</div>
                </div>
            </div>

            <div class="list-item" data-action="case-detail" data-id="3">
                <div class="list-title">班级冲突调解方案</div>
                <div class="list-description">处理学生间矛盾的有效方法</div>
                <div class="list-tags">
                    <div class="tag">高中</div>
                    <div class="tag">中度</div>
                    <div class="tag">班级活动</div>
                    <div class="tag">匹配度 78%</div>
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
                    <div style="flex: 1; text-align: center; cursor: pointer;" data-action="records">
                        <div style="font-weight: 500; font-size: 16px;">23</div>
                        <div style="color: var(--text-secondary); font-size: 14px;">测评记录</div>
                    </div>
                    <div style="flex: 1; text-align: center; cursor: pointer;" data-action="caseslist">
                        <div style="font-weight: 500; font-size: 16px;">12</div>
                        <div style="color: var(--text-secondary); font-size: 14px;">收藏案例</div>
                    </div>
                    <div style="flex: 1; text-align: center; cursor: pointer;" data-action="annot-list">
                        <div style="font-weight: 500; font-size: 16px;">8</div>
                        <div style="color: var(--text-secondary); font-size: 14px;">批注历史</div>
                    </div>
                </div>
            </div>

            <!-- 功能菜单 -->
            <div class="card">
                
                <div class="list-item" data-action="my-cases">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">ℹ️</span>
                        <div>我的个案</div>
                    </div>
                </div>
                <div class="list-item" data-action="暂无页面">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">ℹ️</span>
                        <div>关于我们</div>
                    </div>
                </div>
                <div class="list-item" data-action="暂无页面">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">ℹ️</span>
                        <div>意见反馈</div>
                    </div>
                </div>
                <div class="list-item" data-action="暂无页面">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 12px;">⚙️</span>
                        <div>FAQ常见问题解答</div>
                    </div>
                </div>
                
            </div>

            <!-- 同步状态 -->
            <div class="card">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <div style="color: var(--success-green); font-size: 14px;">用户隐私协议及政策</div>
                    </div>
                    <div class="btn btn-secondary btn-small">退出</div>
                </div>
            </div>
        `;
  }

  getRecordsHTML() {
    const items =
      (this.records || [])
        .map(
          (r) => `
      <div class="card list-item" data-action="record-detail" data-id="${r.id}">
        <div style="display:flex; align-items:center; justify-content: space-between;">
          <div>
            <div style="font-weight:500;">${r.student.name}（${
            r.student.gender
          }，${r.student.age}岁）</div>
            <div style="color: var(--text-secondary); font-size: 14px;">班级：${
              r.student.clazz
            }</div>
          </div>
          <div class="tag">${r.date}</div>
        </div>
        <div style="margin-top:8px;">
          <div style="color: var(--primary-blue); font-weight: 500;">测评名称：${
            r.assessment
          }</div>
          <div style="color: var(--text-secondary); font-size: 14px;">
            进度：${r.status}${
            r.score != null
              ? " | 得分：" + r.score
              : r.progress
              ? " | 已答：" + r.progress
              : ""
          }
          </div>
        </div>
      </div>
    `
        )
        .join("") ||
      '<div class="card"><div style="color:var(--text-secondary);">暂无测评记录</div></div>';

    return `
      <div style="position: relative;">
        <div style="position: absolute; left: 0; top: 0; padding: 16px; cursor: pointer;" onclick="app.switchPage('profile')">← 返回</div>
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-weight: 500; font-size: 18px; margin-bottom: 8px;">测评记录</div>
          <div style="color: var(--text-secondary);">点击查看测评结果详情与AI解读</div>
        </div>
      </div>
      ${items}
    `;
  }

  showRecordDetail(id) {
    const recId = Number(id);
    const r = (this.records || []).find((x) => x.id === recId);
    if (!r) {
      this.showToast("未找到该测评记录");
      setTimeout(() => this.switchPage("records"), 300);
      return;
    }

    const infoLine =
      r.score != null
        ? `进度：${r.status} | 得分：${r.score}`
        : r.progress
        ? `进度：${r.status} | 已答：${r.progress}`
        : `进度：${r.status}`;

    const detailHTML = `
      <div style="position: relative;">
        <div style="position: absolute; left: 0; top: 0; padding: 16px; cursor: pointer;" onclick="app.switchPage('records')">← 返回</div>
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-weight: 500; font-size: 18px; margin-bottom: 8px;">测评结果详情</div>
          <div style="color: var(--text-secondary);">${r.assessment} · ${r.date}</div>
        </div>
      </div>

      <div class="card">
        <div style="font-weight:500; margin-bottom:8px;">学生信息</div>
        <div style="color: var(--text-secondary); line-height:1.6;">
          姓名：${r.student.name}（${r.student.gender}，${r.student.age}岁）<br>
          班级：${r.student.clazz}<br>
          ${infoLine}
        </div>
      </div>

      <div class="card">
        <div style="font-weight:500; margin-bottom:8px;">结果概览</div>
        <div style="color: var(--text-secondary); line-height:1.6;">
          • 情绪稳定性：中等偏上<br>
          • 压力耐受：中等<br>
          • 自我调节：一般
        </div>
      </div>

      <div class="card">
        <div style="display:flex; gap:12px; align-items:center; justify-content: space-between;">
          <div style="font-weight:500;">智能解读</div>
          <button class="btn btn-primary btn-small" data-action="ai-interpret" data-id="${recId}">🧠 一键AI智能解读</button>
        </div>
        <div id="aiInterpretation" style="margin-top:8px; color: var(--text-secondary); line-height:1.7;">
          点击上方按钮，生成个性化解读与建议
        </div>
      </div>
    `;
    document.getElementById("pageContent").innerHTML = detailHTML;
    this.bindPageEvents(this.currentPage);
  }

  aiInterpret(recId) {
    const target = document.getElementById("aiInterpretation");
    if (!target) return;
    const r = (this.records || []).find((x) => x.id === recId);
    target.style.color = "var(--text-secondary)";
    target.innerHTML = "正在生成AI解读，请稍候...";
    setTimeout(() => {
      const summary =
        r?.score != null
          ? `整体得分为 ${r.score} 分，处于同年龄段的中等水平。`
          : `当前进度为「${
              r?.status || "未知"
            }」。建议尽快完成以获得完整分析。`;
      const advice = `
        1) 认知调节：记录焦虑触发点，进行自我对话与积极重评。<br>
        2) 生理放松：每天10分钟呼吸放松/正念练习，连续7天。<br>
        3) 情境演练：模拟考试场景，逐步暴露，增强掌控感。<br>
        4) 家校协同：与家长沟通减压策略，避免过度外在评价。`;
      target.style.color = "var(--text-secondary)";
      target.innerHTML = `
        <div style="color: var(--primary-blue); font-weight:500; margin-bottom:6px;">AI 解读</div>
        ${summary}<br><br>
        风险提示：如持续出现睡眠问题或显著躯体化，应考虑进一步专业评估。<br><br>
        <div style="color: var(--primary-blue); font-weight:500; margin:8px 0 6px;">建议方案</div>
        ${advice}
      `;
    }, 800);
  }

  getAnnotationListHTML() {
    let entries = Object.entries(this.annotations || {})
      .map(([id, v]) => {
        const caseId = Number(id);
        if (v && typeof v === "object") {
          return {
            caseId,
            text: v.text || "",
            updatedAt: Number(v.updatedAt) || 0,
          };
        }
        return { caseId, text: String(v || ""), updatedAt: 0 };
      })
      .filter((e) => e.text);

    entries.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    if (!entries.length) {
      const now = Date.now();
      entries = [
        {
          caseId: 1,
          text: "示例批注：关注考前焦虑情绪。",
          updatedAt: now - 1 * 3600 * 1000,
        },
        {
          caseId: 2,
          text: "示例批注：家访后家校配合良好。",
          updatedAt: now - 2 * 3600 * 1000,
        },
        {
          caseId: 3,
          text: "示例批注：班级冲突已缓解。",
          updatedAt: now - 24 * 3600 * 1000,
        },
      ];
    }

    const titleMap = {
      1: "考前焦虑疏导方案",
      2: "家访沟通技巧指南",
      3: "班级冲突调解方案",
    };
    const fmt = (ts) => (ts ? new Date(ts).toLocaleString() : "-");

    const items =
      entries
        .map(
          (e) => `
      <div class="list-item" data-action="case-detail" data-id="${e.caseId}">
        <div class="list-title">${
          titleMap[e.caseId] || "案例 " + e.caseId
        }</div>
        <div class="list-description">最后批注时间：${fmt(e.updatedAt)}</div>
      </div>
    `
        )
        .join("") ||
      '<div class="card"><div style="color:var(--text-secondary);">暂无批注</div></div>';

    return `
      <div style="position: relative;">
        <div style="position: absolute; left: 0; top: 0; padding: 16px; cursor: pointer;" onclick="app.switchPage('profile')">← 返回</div>
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-weight: 500; font-size: 18px; margin-bottom: 8px;">批注历史</div>
          <div style="color: var(--text-secondary);">按最后批注时间倒序展示</div>
        </div>
      </div>
      <div class="card">${items}</div>
    `;
  }

  getMyCasesHTML() {
    const items = (this.myCases || [])
      .map(
        (c) => `
      <div class="list-item" data-action="mycase-detail" data-id="${c.id}">
        <div style="display:flex; justify-content: space-between; align-items:center;">
          <div>
            <div class="list-title">${c.name}（${c.gender}，${c.age}岁）</div>
            <div class="list-description">主要问题：${c.problem}</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-small" data-action="mycase-edit" data-id="${c.id}">编辑</button>
            <button class="btn btn-secondary btn-small" data-action="mycase-delete" data-id="${c.id}">删除</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    return `
      <div style="position: relative;">
        <div style="position: absolute; left: 0; top: 0; padding: 16px; cursor: pointer;" onclick="app.switchPage('profile')">← 返回</div>
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-weight: 500; font-size: 18px; margin-bottom: 8px;">我的个案</div>
          <div style="color: var(--text-secondary);">管理学生个案，支持新增、修改、删除</div>
        </div>
      </div>

      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" data-action="mycase-add" style="width:100%;">➕ 新增个案</button>
      </div>

      <div class="card">
        ${items || '<div style="color:var(--text-secondary);">暂无个案</div>'}
      </div>
    `;
  }

  showMyCaseDetail(id) {
    const caseId = Number(id);
    const c = (this.myCases || []).find((x) => x.id === caseId);
    if (!c) {
      this.showToast("未找到该个案");
      setTimeout(() => this.switchPage("mycases"), 500);
      return;
    }

    const detailHTML = `
      <div style="position: relative;">
        <div style="position: absolute; left: 0; top: 0; padding: 16px; cursor: pointer;" onclick="app.switchPage('mycases')">← 返回</div>
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-weight: 500; font-size: 18px; margin-bottom: 8px;">${c.name} 的个案</div>
          <div style="color: var(--text-secondary);">${c.gender}，${c.age}岁</div>
        </div>
      </div>

      <div class="card">
        <div style="font-weight: 500; margin-bottom: 8px;">基本信息</div>
        <div style="color: var(--text-secondary); line-height:1.6;">
          姓名：${c.name}<br>
          年龄：${c.age}<br>
          性别：${c.gender}
        </div>

        <div style="font-weight: 500; margin:16px 0 8px;">主要心理问题</div>
        <div style="color: var(--text-secondary); line-height:1.6;">
          ${c.problem}
        </div>

        <div style="display:flex; gap:12px; margin-top:16px;">
          <button class="btn btn-secondary" data-action="mycase-edit" data-id="${c.id}">编辑</button>
          <button class="btn btn-secondary" data-action="mycase-delete" data-id="${c.id}">删除</button>
        </div>
      </div>
    `;
    document.getElementById("pageContent").innerHTML = detailHTML;
    this.bindPageEvents(this.currentPage);
    this.ensureCaseModals(caseId);
    this.bindPageEvents(this.currentPage);
  }

  bindPageEvents(page) {
    // 绑定页面内交互事件
    const pageContent = document.getElementById("pageContent");

    // 快捷入口点击事件
    pageContent.querySelectorAll("[data-action]").forEach((element) => {
      element.addEventListener("click", (e) => {
        e.stopPropagation();
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

      // 绑定选择个案按钮事件
      const selectCaseBtn = document.getElementById("selectCaseBtn");
      if (selectCaseBtn) {
        selectCaseBtn.addEventListener(
          "click",
          this.showCaseListModal.bind(this)
        );
      }

      // 绑定关闭弹窗事件
      const closeModal = document.getElementById("closeModal");
      if (closeModal) {
        closeModal.addEventListener("click", this.hideCaseListModal.bind(this));
      }

      // 绑定搜索事件
      const searchInput = document.getElementById("caseSearchInput");
      if (searchInput) {
        searchInput.addEventListener("input", this.filterCaseList.bind(this));
      }
    }
  }

  // 显示个案列表弹窗
  showCaseListModal() {
    const modal = document.getElementById("caseListModal");
    if (modal) {
      modal.style.display = "flex";
      // 添加show类以触发动画
      setTimeout(() => {
        modal.classList.add("show");
      }, 10);
      this.renderCaseList();

      // 自动聚焦搜索框
      const searchInput = document.getElementById("caseSearchInput");
      if (searchInput) {
        searchInput.focus();
      }
    }
  }

  // 隐藏个案列表弹窗
  hideCaseListModal() {
    const modal = document.getElementById("caseListModal");
    if (modal) {
      // 移除show类以触发动画
      modal.classList.remove("show");
      // 等待动画完成后隐藏
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  }

  // 渲染个案列表
  renderCaseList(filterText = "") {
    const caseListContainer = document.getElementById("caseListContainer");
    if (!caseListContainer) return;

    const cases = [
      {
        id: 1,
        name: "张小明",
        age: 12,
        gender: "男",
        problem: "学习压力大，注意力不集中",
      },
      {
        id: 2,
        name: "李华",
        age: 15,
        gender: "男",
        problem: "青春期叛逆，与父母沟通困难",
      },
      {
        id: 3,
        name: "王芳",
        age: 14,
        gender: "女",
        problem: "社交焦虑，不敢在课堂发言",
      },
      {
        id: 4,
        name: "赵敏",
        age: 13,
        gender: "女",
        problem: "自卑心理，缺乏自信",
      },
      {
        id: 5,
        name: "刘伟",
        age: 16,
        gender: "男",
        problem: "网络成瘾，学习成绩下滑",
      },
      {
        id: 6,
        name: "陈静",
        age: 11,
        gender: "女",
        problem: "适应新环境困难，转学焦虑",
      },
    ];

    let filteredCases = cases;

    // 如果有搜索文本，进行过滤
    if (filterText) {
      filteredCases = cases.filter((caseItem) =>
        caseItem.name.includes(filterText)
      );
    }

    // 清空容器
    caseListContainer.innerHTML = "";

    // 添加个案项
    if (filteredCases.length === 0) {
      caseListContainer.innerHTML =
        '<div class="no-results">没有找到匹配的个案</div>';
    } else {
      filteredCases.forEach((caseItem) => {
        const caseElement = document.createElement("div");
        caseElement.className = "case-item";
        caseElement.dataset.caseId = caseItem.id;

        caseElement.innerHTML = `
          <div class="case-item-header">
            <span class="case-item-name">${caseItem.name}</span>
            <span>${caseItem.age}岁 | ${caseItem.gender}</span>
          </div>
          <div class="case-item-info">
            主要问题: ${caseItem.problem}
          </div>
        `;

        // 添加点击事件
        caseElement.addEventListener("click", () => this.selectCase(caseItem));

        caseListContainer.appendChild(caseElement);
      });
    }
  }

  // 过滤个案列表
  filterCaseList(event) {
    const filterText = event.target.value;
    this.renderCaseList(filterText);
  }

  // 选择个案
  selectCase(caseItem) {
    // 填充学生信息到表单
    const nameInput = document.querySelector('input[placeholder="姓名"]');
    const ageInput = document.querySelector('input[placeholder="年龄"]');
    const genderSelect = document.querySelector('select[name="gender"]');

    if (nameInput) nameInput.value = caseItem.name;
    if (ageInput) ageInput.value = caseItem.age;
    if (genderSelect) {
      const option = Array.from(genderSelect.options).find(
        (opt) => opt.text === caseItem.gender
      );
      if (option) genderSelect.value = option.value;
    }

    // 关闭弹窗
    this.hideCaseListModal();

    // 显示选择成功提示
    this.showToast(`已选择 ${caseItem.name} 的个案`);
    setTimeout(() => {
      this.switchPage("caseslist");
    }, 800);
  }

  // 显示提示信息
  showToast(message, duration = 2000) {
    // 创建toast元素
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "80px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "rgba(0,0,0,0.7)";
    toast.style.color = "#fff";
    toast.style.padding = "8px 16px";
    toast.style.borderRadius = "4px";
    toast.style.zIndex = "1001";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";

    // 添加到页面
    document.body.appendChild(toast);

    // 显示动画
    setTimeout(() => {
      toast.style.opacity = "1";
    }, 10);

    // 自动隐藏
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
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

      case "my-collections":
        this.showToast("打开案例收藏列表");
        setTimeout(() => this.switchPage("caseslist"), 300);
        break;

      case "my-cases":
        this.showToast("打开我的个案列表");
        setTimeout(() => this.switchPage("mycases"), 300);
        break;

      case "mycase-detail":
        this.showMyCaseDetail(data.id);
        break;

      case "mycase-add": {
        // 动态创建悬浮弹窗（如不存在）
        let modal = document.getElementById("myCaseAddModal");
        if (!modal) {
          modal = document.createElement("div");
          modal.id = "myCaseAddModal";
          modal.className = "modal";
          modal.style.cssText = "display:none; opacity:1; visibility: initial; position: absolute; inset: 0; background: rgba(0,0,0,0.4); align-items: center; justify-content: center; z-index: 2000;";
          modal.innerHTML = `
            <div class="modal-content" style="background:#fff; padding:16px; border-radius:8px; width: 90%; max-width: 420px;">
              <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom:8px;">
                <div style="font-weight:500;">新增个案</div>
                <span style="cursor:pointer;" data-action="mycase-add-cancel">✖</span>
              </div>
              <div style="display:grid; gap:12px;">
                <div>
                  <div style="font-size:14px; color: var(--text-secondary); margin-bottom:4px;">姓名</div>
                  <input id="addCaseName" class="input-field" placeholder="请输入姓名">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                  <div>
                    <div style="font-size:14px; color: var(--text-secondary); margin-bottom:4px;">年龄</div>
                    <input id="addCaseAge" type="number" class="input-field" placeholder="年龄" min="1">
                  </div>
                  <div>
                    <div style="font-size:14px; color: var(--text-secondary); margin-bottom:4px;">性别</div>
                    <select id="addCaseGender" class="input-field">
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div style="font-size:14px; color: var(--text-secondary); margin-bottom:4px;">主要心理问题</div>
                  <textarea id="addCaseProblem" class="input-field" placeholder="请填写主要心理问题..." style="height:80px;"></textarea>
                </div>
                <div style="display:flex; gap:12px; margin-top:8px;">
                  <button class="btn btn-secondary" data-action="mycase-add-cancel">取消</button>
                  <button class="btn btn-primary" data-action="mycase-add-save">保存</button>
                </div>
              </div>
            </div>
          `;
          const pageContent = document.getElementById("pageContent"); 
          pageContent.appendChild(modal);
        }
        // 显示弹窗
        modal.style.display = "flex";
        // body级事件委托（若尚未绑定）
        if (!this._modalDelegationBound) {
          document.body.addEventListener("click", (e) => {
            const target = e.target && e.target.closest && e.target.closest("[data-action]");
            if (!target) return;
            const action = target.getAttribute("data-action");
            const dataset = Object.assign({}, target.dataset);
            this.handleAction(action, dataset);
          });
          this._modalDelegationBound = true;
        }
        break;
      }

      case "mycase-add-save": {
        const nameEl = document.getElementById("addCaseName");
        const ageEl = document.getElementById("addCaseAge");
        const genderEl = document.getElementById("addCaseGender");
        const problemEl = document.getElementById("addCaseProblem");
        const name = (nameEl && nameEl.value.trim()) || "";
        const age = Number((ageEl && ageEl.value) || 0);
        const gender = (genderEl && genderEl.value) || "男";
        const problem = (problemEl && problemEl.value.trim()) || "";
        if (!name) { this.showToast("请输入姓名"); break; }
        if (!age || age <= 0) { this.showToast("年龄无效"); break; }
        const maxId = (this.myCases || []).reduce((m, x) => Math.max(m, x.id), 0);
        if (!this.myCases) this.myCases = [];
        this.myCases.push({ id: maxId + 1, name, age, gender, problem });
        const modal = document.getElementById("myCaseAddModal");
        if (modal) modal.style.display = "none";
        this.showToast("已新增个案");
        setTimeout(() => this.switchPage("mycases"), 200);
        break;
      }

      case "mycase-add-cancel": {
        const modal = document.getElementById("myCaseAddModal");
        if (modal) modal.style.display = "none";
        break;
      }

      case "mycase-edit": {
        const id = Number(data.id);
        const idx = this.myCases.findIndex((x) => x.id === id);
        if (idx < 0) {
          this.showToast("未找到该个案");
          break;
        }
        const cur = this.myCases[idx];

        // 动态创建编辑悬浮弹窗（如不存在）
        let modal = document.getElementById("myCaseEditModal");
        if (!modal) {
          modal = document.createElement("div");
          modal.id = "myCaseEditModal";
          modal.className = "modal";
          modal.style.cssText = "display:none; opacity:1; visibility: initial; position: absolute;  inset: 0; background: rgba(0,0,0,0.4); align-items: center; justify-content: center; z-index: 2000;";
          modal.innerHTML = `
            <div class="modal-content" style="background:#fff; padding:16px; border-radius:8px; width: 90%; max-width: 420px;">
              <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom:8px;">
                <div style="font-weight:500;">编辑个案</div>
                <span style="cursor:pointer;" data-action="mycase-edit-cancel">✖</span>
              </div>
              <div style="display:grid; gap:12px;">
                <div>
                  <div style="font-size:14px; color: var(--text-secondary); margin-bottom:4px;">姓名</div>
                  <input id="editCaseName" class="input-field" placeholder="请输入姓名">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                  <div>
                    <div style="font-size:14px; color: var(--text-secondary); margin-bottom:4px;">年龄</div>
                    <input id="editCaseAge" type="number" class="input-field" placeholder="年龄" min="1">
                  </div>
                  <div>
                    <div style="font-size:14px; color: var(--text-secondary); margin-bottom:4px;">性别</div>
                    <select id="editCaseGender" class="input-field">
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div style="font-size:14px; color: var(--text-secondary); margin-bottom:4px;">主要心理问题</div>
                  <textarea id="editCaseProblem" class="input-field" placeholder="请填写主要心理问题..." style="height:80px;"></textarea>
                </div>
                <div style="display:flex; gap:12px; margin-top:8px;">
                  <button class="btn btn-secondary" data-action="mycase-edit-cancel">取消</button>
                  <button class="btn btn-primary" data-action="mycase-edit-save" data-id="${id}">保存</button>
                </div>
              </div>
            </div>
          `;
          const pageContent = document.getElementById("pageContent"); 
          pageContent.appendChild(modal);
        }
        // 预填当前值
        const nameEl = document.getElementById("editCaseName");
        const ageEl = document.getElementById("editCaseAge");
        const genderEl = document.getElementById("editCaseGender");
        const problemEl = document.getElementById("editCaseProblem");
        if (nameEl) nameEl.value = cur.name || "";
        if (ageEl) ageEl.value = String(cur.age || "");
        if (genderEl) genderEl.value = cur.gender || "男";
        if (problemEl) problemEl.value = cur.problem || "";

        // 显示弹窗
        modal.style.display = "flex";

        // body级事件委托（若尚未绑定）
        if (!this._modalDelegationBound) {
          document.body.addEventListener("click", (e) => {
            const target = e.target && e.target.closest && e.target.closest("[data-action]");
            if (!target) return;
            const action = target.getAttribute("data-action");
            const dataset = Object.assign({}, target.dataset);
            this.handleAction(action, dataset);
          });
          this._modalDelegationBound = true;
        }
        break;
      }

      case "mycase-edit-save": {
        const id = Number(data.id);
        const idx = this.myCases.findIndex((x) => x.id === id);
        if (idx < 0) { this.showToast("未找到该个案"); break; }
        const cur = this.myCases[idx];

        const nameEl = document.getElementById("editCaseName");
        const ageEl = document.getElementById("editCaseAge");
        const genderEl = document.getElementById("editCaseGender");
        const problemEl = document.getElementById("editCaseProblem");
        const name = (nameEl && nameEl.value.trim()) || "";
        const age = Number((ageEl && ageEl.value) || 0);
        const gender = (genderEl && genderEl.value) || "男";
        const problem = (problemEl && problemEl.value.trim()) || "";

        if (!name) { this.showToast("请输入姓名"); break; }
        if (!age || age <= 0) { this.showToast("年龄无效"); break; }

        this.myCases[idx] = { ...cur, name, age, gender, problem };

        const modal = document.getElementById("myCaseEditModal");
        if (modal) modal.style.display = "none";
        this.showToast("已保存修改");
        setTimeout(() => this.switchPage("mycases"), 200);
        break;
      }

      case "mycase-edit-cancel": {
        const modal = document.getElementById("myCaseEditModal");
        if (modal) modal.style.display = "none";
        break;
      }

      case "mycase-delete": {
        const id = Number(data.id);
        const idx = this.myCases.findIndex((x) => x.id === id);
        if (idx < 0) {
          this.showToast("未找到该个案");
          break;
        }
        if (confirm("确定删除该个案吗？")) {
          this.myCases.splice(idx, 1);
          this.showToast("已删除");
          setTimeout(() => this.switchPage("mycases"), 200);
        }
        break;
      }

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

      case "toggle-favorite": {
        const id = Number(data.id);
        if (!this.favorites) this.favorites = new Set();
        if (this.favorites.has(id)) {
          this.favorites.delete(id);
          this.showToast("已取消收藏");
        } else {
          this.favorites.add(id);
          this.showToast("已收藏");
        }
        this.showCaseDetail(id);
        break;
      }

      case "annotate": {
        const caseId = Number(data.id);
        const modal = document.getElementById("annotateModal");
        const textarea = document.getElementById("annotateText");
        if (textarea && this.annotations && this.annotations[caseId]) {
          const ann = this.annotations[caseId];
          textarea.value =
            ann && typeof ann === "object" ? ann.text || "" : ann;
        }
        if (modal) modal.style.display = "flex";
        break;
      }

      case "link-case": {
        this.showToast("关联个案成功");
        return;
        const modal = document.getElementById("linkCaseModal");
        const list = document.getElementById("linkCaseList");
        const caseId = Number(data.id);
        if (list) {
          list.innerHTML = (this.myCases || [])
            .map(
              (c) =>
                `<div class="list-item" data-action="select-linkcase" data-id="${caseId}" data-target="${c.id}">
              <div class="list-title">${c.name}（${c.gender}，${c.age}岁）</div>
              <div class="list-description">主要问题：${c.problem}</div>
            </div>`
            )
            .join("");
        }
        if (modal) modal.style.display = "flex";
        break;
      }

      case "save-annotate": {
        const caseId = Number(data.id);
        const textarea = document.getElementById("annotateText");
        const val = textarea ? textarea.value.trim() : "";
        if (!this.annotations) this.annotations = {};
        this.annotations[caseId] = { text: val, updatedAt: Date.now() };
        const modal = document.getElementById("annotateModal");
        if (modal) modal.style.display = "none";
        this.showToast("已保存批注");
        break;
      }

      case "close-annotate": {
        const modal = document.getElementById("annotateModal");
        if (modal) modal.style.display = "none";
        break;
      }

      case "select-linkcase": {
        const caseId = Number(data.id);
        const targetId = Number(data.target);
        if (!this.caseLinks) this.caseLinks = {};
        this.caseLinks[caseId] = targetId;
        const modal = document.getElementById("linkCaseModal");
        if (modal) modal.style.display = "none";
        this.showToast("已关联个案");
        break;
      }

      case "close-linkcase": {
        const modal = document.getElementById("linkCaseModal");
        if (modal) modal.style.display = "none";
        break;
      }

      case "cases-results":
        this.showToast("跳转到案例结果列表");
        setTimeout(() => this.switchPage("caseslist"), 500);
        break;

      case "caseslist":
        this.showToast("打开收藏案例列表");
        setTimeout(() => this.switchPage("caseslist"), 300);
        break;

      case "reset-filter":
        this.resetCaseFilter();
        break;

      case "back-to-filter":
        setTimeout(() => this.switchPage("cases"), 500);
        break;

      case "records":
        this.showToast("打开测评记录列表");
        setTimeout(() => this.switchPage("records"), 300);
        break;
      case "annot-list":
        this.showToast("打开批注历史");
        setTimeout(() => this.switchPage("annotlist"), 200);
        break;
      case "visit-outline":
        this.showToast("后续跳转到H5高关爱平台");
        break;

      case "record-detail":
        this.showRecordDetail(data.id);
        break;
      case "ai-interpret":
        this.aiInterpret(Number(data.id));
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
                    <button class="btn btn-primary" data-action="record-detail"  data-id="201">下一题</button>
                </div>
            </div>
        `;

    document.getElementById("pageContent").innerHTML = detailHTML;
    this.bindPageEvents(this.currentPage);
  }

  showCaseDetail(id) {
    const caseId = Number(id) || 1;
    if (!this.favorites) this.favorites = new Set();
    const isFav = this.favorites.has(caseId);
    const detailHTML = `
            <div style="position: relative;">
                <div style="position: absolute; left: 0; top: 0; padding: 16px; cursor: pointer;" onclick="app.switchPage('cases')">
                    ← 返回
                </div>
                <div style="text-align: center; padding: 20px 0;">
                    <div style="font-weight: 500; font-size: 18px; margin-bottom: 8px;">考前焦虑疏导方案</div>
                    <div style="color: var(--text-secondary);">初中 | 中度 | 个体辅导 | 匹配度85%</div>
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
            <div style="font-weight:500; margin-bottom:8px;">📝 批注</div>
            <textarea id="annotateText" readonly class="input-field" placeholder="请输入批注内容..." style="height:100px;">我是批注内容</textarea>
            <div style="font-weight:400; margin:8px 0;">批注时间：2025-10-10 10:00:00</div>

            <div style="display: grid; grid-template-columns: ${
              isFav ? "1fr 1fr 1fr" : "1fr"
            }; gap: 12px; margin-top: 20px;">
                <button class="btn btn-secondary" data-action="toggle-favorite" data-id="${caseId}">${
      isFav ? "⭐ 取消收藏" : "⭐ 收藏"
    }</button>
                ${
                  isFav
                    ? '<button class="btn btn-secondary" data-action="annotate" data-id="' +
                      caseId +
                      '">📝 批注</button>'
                    : ""
                }
                ${
                  isFav
                    ? '<button class="btn btn-primary" data-action="link-case" data-id="' +
                      caseId +
                      '">🚀 关联个案</button>'
                    : ""
                }
            </div>

            <!-- 批注弹窗 -->
            <div id="annotateModal" class="modal" style="display:none; opacity:1; visibility: initial; position: absolute; inset: 0; background: rgba(0,0,0,0.4); align-items: center; justify-content: center; z-index: 1000;">
              <div class="modal-content" style="background:#fff; padding:16px; border-radius:8px; width: 90%; max-width: 420px;">
                <div style="font-weight:500; margin-bottom:8px;">📝 批注</div>
                <textarea id="annotateText" class="input-field" placeholder="请输入批注内容..." style="height:100px;"></textarea>
                <div style="display:flex; gap:12px; margin-top:12px;">
                  <button class="btn btn-secondary" data-action="close-annotate">取消</button>
                  <button class="btn btn-primary" data-action="save-annotate" data-id="${caseId}">保存</button>
                </div>
              </div>
            </div>

            <!-- 关联个案弹窗 -->
            <div id="linkCaseModal" class="modal" style="display:none; position: absolute; opacity:1; visibility: initial; inset: 0; background: rgba(0,0,0,0.4); align-items: center; justify-content: center; z-index: 1000;">
              <div class="modal-content" style="background:#fff; padding:16px; border-radius:8px; width: 90%; max-width: 420px; max-height: 70vh; overflow:auto;">
                <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom:8px;">
                  <div style="font-weight:500;">关联个案</div>
                  <span style="cursor:pointer;" data-action="close-linkcase">✖</span>
                </div>
                <div id="linkCaseList"><!-- 动态填充 --></div>
              </div>
            </div>
        `;

    document.getElementById("pageContent").innerHTML = detailHTML;
    this.bindPageEvents(this.currentPage);
  }

  ensureCaseModals(caseId) {
    // 批注弹窗
    if (!document.getElementById("annotateModal")) {
      const modal = document.createElement("div");
      modal.id = "annotateModal";
      modal.style.cssText =
        "display:none; position:fixed; inset:0; background:rgba(0,0,0,0.45); align-items:center; justify-content:center; z-index:2001;";
      modal.innerHTML = `
        <div class="modal-content" style="background:#fff; padding:16px; border-radius:8px; width:90%; max-width:420px;">
          <div style="font-weight:500; margin-bottom:8px;">📝 批注</div>
          <textarea id="annotateText" class="input-field" placeholder="请输入批注内容..." style="height:100px;"></textarea>
          <div style="display:flex; gap:12px; margin-top:12px;">
            <button class="btn btn-secondary" data-action="close-annotate">取消</button>
            <button class="btn btn-primary" data-action="save-annotate" data-id="${caseId}">保存</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    } else {
      // 同步当前caseId到保存按钮，确保保存到正确的案例
      const saveBtn = document.querySelector(
        '#annotateModal [data-action="save-annotate"]'
      );
      if (saveBtn) saveBtn.setAttribute("data-id", String(caseId));
      const textarea = document.getElementById("annotateText");
      if (textarea) {
        const val =
          this.annotations && this.annotations[caseId]
            ? this.annotations[caseId]
            : "";
        textarea.value = val;
      }
    }

    // 关联个案弹窗
    if (!document.getElementById("linkCaseModal")) {
      const modal = document.createElement("div");
      modal.id = "linkCaseModal";
      modal.style.cssText =
        "display:none; position:fixed; inset:0; background:rgba(0,0,0,0.45); align-items:center; justify-content:center; z-index:2001;";
      modal.innerHTML = `
        <div class="modal-content" style="background:#fff; padding:16px; border-radius:8px; width:90%; max-width:420px; max-height:70vh; overflow:auto;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div style="font-weight:500;">关联个案</div>
            <span style="cursor:pointer;" data-action="close-linkcase">✖</span>
          </div>
          <div id="linkCaseList"></div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    // 为 body 级弹窗补充一次事件绑定（与页面绑定不冲突）
    // 使用事件委托，保证动态按钮生效
    if (!this._modalDelegationBound) {
      document.body.addEventListener("click", (e) => {
        const target = e.target.closest("[data-action]");
        if (!target) return;
        const action = target.getAttribute("data-action");
        const dataset = Object.assign({}, target.dataset);
        // 转发到统一的处理逻辑
        this.handleAction(action, dataset);
      });
      this._modalDelegationBound = true;
    }
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
            z-index: 2000;
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
