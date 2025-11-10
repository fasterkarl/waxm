import{_ as a,c as i,o as n,ah as l}from"./chunks/framework.yZu4FxWF.js";const d=JSON.parse('{"title":"🎯 Ai心理学家 - 可视化交互流程图","description":"","frontmatter":{},"headers":[],"relativePath":"fdd.md","filePath":"fdd.md","lastUpdated":null}'),t={name:"fdd.md"};function p(e,s,h,E,k,r){return n(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="🎯-ai心理学家-可视化交互流程图" tabindex="-1">🎯 Ai心理学家 - 可视化交互流程图 <a class="header-anchor" href="#🎯-ai心理学家-可视化交互流程图" aria-label="Permalink to “🎯 Ai心理学家 - 可视化交互流程图”">​</a></h1><p><strong>产品名称</strong>：Ai心理学家（哪吒心理小助手）<br><strong>文档版本</strong>：v2.0<br><strong>创建日期</strong>：2025-11-10<br><strong>最后更新</strong>：2025-11-10</p><hr><h3 id="架构设计" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计" aria-label="Permalink to “架构设计”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    表现层（Presentation Layer）            │</span></span>
<span class="line"><span>│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │</span></span>
<span class="line"><span>│  │  聊天界面     │  │  菜单系统     │  │  模态框系统   │  │</span></span>
<span class="line"><span>│  │  Chat UI     │  │  Menu System │  │  Modal System│  │</span></span>
<span class="line"><span>│  └──────────────┘  └──────────────┘  └──────────────┘  │</span></span>
<span class="line"><span>│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │</span></span>
<span class="line"><span>│  │  页面管理     │  │  组件库       │  │  动画效果     │  │</span></span>
<span class="line"><span>│  │  Page Mgmt   │  │  Components  │  │  Animations  │  │</span></span>
<span class="line"><span>│  └──────────────┘  └──────────────┘  └──────────────┘  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            ↓↑</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    业务逻辑层（Business Logic Layer）      │</span></span>
<span class="line"><span>│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │</span></span>
<span class="line"><span>│  │  意图识别     │  │  个案匹配     │  │  会员管理     │  │</span></span>
<span class="line"><span>│  │  Intent Rec  │  │  Case Match  │  │  Membership  │  │</span></span>
<span class="line"><span>│  └──────────────┘  └──────────────┘  └──────────────┘  │</span></span>
<span class="line"><span>│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │</span></span>
<span class="line"><span>│  │  身份管理     │  │  天气服务     │  │  消息处理     │  │</span></span>
<span class="line"><span>│  │  Role Mgmt   │  │  Weather Svc │  │  Msg Handler │  │</span></span>
<span class="line"><span>│  └──────────────┘  └──────────────┘  └──────────────┘  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            ↓↑</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    数据层（Data Layer）                    │</span></span>
<span class="line"><span>│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │</span></span>
<span class="line"><span>│  │  本地存储     │  │  内存数据     │  │  配置数据     │  │</span></span>
<span class="line"><span>│  │  localStorage│  │  Memory Data │  │  Config Data │  │</span></span>
<span class="line"><span>│  └──────────────┘  └──────────────┘  └──────────────┘  │</span></span>
<span class="line"><span>│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │</span></span>
<span class="line"><span>│  │  用户偏好     │  │  会员状态     │  │  学生档案     │  │</span></span>
<span class="line"><span>│  │  User Prefs  │  │  Membership  │  │  Student DB  │  │</span></span>
<span class="line"><span>│  └──────────────┘  └──────────────┘  └──────────────┘  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="一、整体交互流程" tabindex="-1">一、整体交互流程 <a class="header-anchor" href="#一、整体交互流程" aria-label="Permalink to “一、整体交互流程”">​</a></h2><div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);padding:20px;border-radius:10px;color:white;margin:20px 0;"><h3>🎬 用户旅程概览</h3><p>本章节展示用户从首次使用到日常操作的完整交互路径</p></div><h3 id="_1-1-🆕-用户首次使用流程" tabindex="-1">1.1 🆕 用户首次使用流程 <a class="header-anchor" href="#_1-1-🆕-用户首次使用流程" aria-label="Permalink to “1.1 🆕 用户首次使用流程”">​</a></h3><blockquote><p><strong>场景说明</strong>：用户第一次打开应用，系统引导完成身份设置<br><strong>关键节点</strong>：欢迎界面 → 天气展示 → 身份选择 → 开始使用<br><strong>预计时长</strong>：30-60 秒</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[打开应用] --&gt; B[显示欢迎界面]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt; C[显示天气信息]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt; D[显示功能菜单]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; E{用户是否输入}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt;|是| F[检测用户身份]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt;|无身份| G[显示身份选择]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt; H[用户选择身份]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    H --&gt; I[保存身份信息]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    I --&gt; J[更新问候语]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    J --&gt; K[处理用户输入]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt;|否| L[等待用户操作]</span></span></code></pre></div><hr><h3 id="_1-2-🔄-用户常规使用流程" tabindex="-1">1.2 🔄 用户常规使用流程 <a class="header-anchor" href="#_1-2-🔄-用户常规使用流程" aria-label="Permalink to “1.2 🔄 用户常规使用流程”">​</a></h3><blockquote><p><strong>场景说明</strong>：已完成身份设置的用户日常使用流程<br><strong>关键节点</strong>：加载身份 → 个性化问候 → 功能操作 → 结果展示<br><strong>预计时长</strong>：即时响应</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[打开应用] --&gt; B[加载用户身份]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt; C[显示个性化问候]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt; D[显示天气信息]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; E{用户操作}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt;|输入文字| F[意图识别]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt;|点击菜单| G[打开侧边菜单]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt;|点击功能卡片| H[跳转功能页面]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt; I[处理用户请求]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt; J[选择菜单项]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    J --&gt; K[页面导航]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    H --&gt; K</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    I --&gt; L[显示结果]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    K --&gt; L</span></span></code></pre></div><hr><h2 id="二、核心功能流程" tabindex="-1">二、核心功能流程 <a class="header-anchor" href="#二、核心功能流程" aria-label="Permalink to “二、核心功能流程”">​</a></h2><div style="background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%);padding:20px;border-radius:10px;color:white;margin:20px 0;"><h3>⚙️ 核心功能详解</h3><p>深入了解系统核心功能的交互逻辑和处理流程</p></div><h3 id="_2-1-👤-身份选择流程" tabindex="-1">2.1 👤 身份选择流程 <a class="header-anchor" href="#_2-1-👤-身份选择流程" aria-label="Permalink to “2.1 👤 身份选择流程”">​</a></h3><blockquote><p><strong>功能说明</strong>：用户首次输入后选择身份角色<br><strong>可选身份</strong>：👨‍⚕️ 心理老师 | 👨‍🏫 班主任 | 👔 校领导<br><strong>存储方式</strong>：localStorage 持久化<br><strong>触发时机</strong>：首次输入消息后</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant U as 👤 用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant S as 🤖 系统</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant L as 💾 本地存储</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: 首次输入消息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;L: 检查身份信息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L--&gt;&gt;S: ❌ 无身份数据</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 📋 显示身份选择卡片</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over U,S: 展示三种身份选项👨‍⚕️ 心理老师 👨‍🏫 班主任 👔 校领导</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: ✅ 点击选择身份</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;L: 💾 保存身份信息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: ✅ 显示确认消息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 🎉 更新问候语</span></span></code></pre></div><p><strong>💡 设计亮点</strong>：</p><ul><li>✨ 首次输入后才显示，避免打扰</li><li>🎯 三种身份精准定位用户群体</li><li>💾 本地持久化，无需重复选择</li><li>🔄 支持随时切换身份</li></ul><hr><h3 id="_2-2-🔄-身份切换流程" tabindex="-1">2.2 🔄 身份切换流程 <a class="header-anchor" href="#_2-2-🔄-身份切换流程" aria-label="Permalink to “2.2 🔄 身份切换流程”">​</a></h3><blockquote><p><strong>功能说明</strong>：已有身份的用户切换到其他身份<br><strong>触发方式</strong>：输入&quot;切换身份&quot;或&quot;身份&quot;关键词<br><strong>交互方式</strong>：卡片选择<br><strong>即时生效</strong>：切换后立即更新问候语</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant U as 👤 用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant S as 🤖 系统</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant L as 💾 本地存储</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: 💬 输入&quot;切换身份&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;L: 📖 读取当前身份</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 📋 显示身份切换卡片</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over U,S: 🔍 显示当前身份  📝 展示其他身份选项（标记当前身份为灰色）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: ✅ 点击新身份</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;L: 💾 更新身份信息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: ✅ 显示切换成功消息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 🎉 更新问候语</span></span></code></pre></div><p><strong>💡 设计亮点</strong>：</p><ul><li>🎯 关键词触发，操作便捷</li><li>👁️ 当前身份高亮显示</li><li>🚫 当前身份不可重复选择</li><li>⚡ 即时生效，无需刷新</li></ul><hr><h3 id="_2-3-🧠-智能意图识别流程" tabindex="-1">2.3 🧠 智能意图识别流程 <a class="header-anchor" href="#_2-3-🧠-智能意图识别流程" aria-label="Permalink to “2.3 🧠 智能意图识别流程”">​</a></h3><blockquote><p><strong>功能说明</strong>：自动识别用户输入中的学生信息和问题描述<br><strong>识别内容</strong>：姓名、年龄、性别、问题关键词<br><strong>处理策略</strong>：信息完整 → 查询个案库 | 信息不完整 → 提示补充<br><strong>智能推荐</strong>：根据识别结果推荐服务类型</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[💬 用户输入] --&gt; B[🔍 提取关键信息]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt; C{👤 识别姓名}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt;|✅ 成功| D[📝 记录姓名]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt;|❌ 失败| E[⚠️ 标记缺失]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; F{🎂 识别年龄}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt;|✅ 成功| G[📝 记录年龄]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt;|❌ 失败| H[⚠️ 标记缺失]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt; I{⚧ 识别性别}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    I --&gt;|✅ 成功| J[📝 记录性别]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    I --&gt;|❌ 失败| K[⚠️ 标记缺失]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    J --&gt; L{📋 识别问题描述}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L --&gt;|✅ 成功| M[📝 记录问题]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L --&gt;|❌ 失败| N[⚠️ 标记缺失]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M --&gt; O{🔍 信息完整性检查}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt; O</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    H --&gt; O</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    K --&gt; O</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    N --&gt; O</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    O --&gt;|✅ 完整| P[🗄️ 查询个案库]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    O --&gt;|❌ 不完整| Q[💡 提示补充信息]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    P --&gt; R[🎯 推荐服务类型]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    R --&gt; S[📊 显示意图识别结果]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#e1f5ff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style S fill:#c8e6c9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Q fill:#fff9c4</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style P fill:#f3e5f5</span></span></code></pre></div><p><strong>💡 设计亮点</strong>：</p><ul><li>🤖 AI 驱动的智能识别</li><li>📊 多维度信息提取（姓名/年龄/性别/问题）</li><li>🎯 智能推荐服务类型</li><li>💬 友好的补充信息提示</li></ul><p><strong>🔧 技术实现</strong>：</p><ul><li>正则表达式匹配</li><li>关键词词典</li><li>上下文管理</li><li>多轮对话支持</li></ul><hr><h3 id="_2-4-🗄️-个案库智能匹配流程" tabindex="-1">2.4 🗄️ 个案库智能匹配流程 <a class="header-anchor" href="#_2-4-🗄️-个案库智能匹配流程" aria-label="Permalink to “2.4 🗄️ 个案库智能匹配流程”">​</a></h3><blockquote><p><strong>功能说明</strong>：根据学生姓名查询历史档案<br><strong>匹配策略</strong>：精确匹配姓名<br><strong>同名处理</strong>：展示选择列表供用户确认<br><strong>未找到处理</strong>：提示创建新档案</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant U as 👤 用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant S as 🤖 系统</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant D as 🗄️ 数据库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: 💬 输入学生姓名</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;S: 🔍 提取姓名信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;D: 🔎 查询同名学生</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D--&gt;&gt;S: 📋 返回学生列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    alt 只有1个学生</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: ✅ 直接显示学生信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Note over U,S: 📊 姓名、年龄、性别 📚 年级、班级 📅 最后评估日期</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    else 有多个学生</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: 📋 显示学生选择列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Note over U,S: 👥 展示所有同名学生</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                       📊 年龄、性别、年级等信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                       🎯 帮助用户精准选择</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        U-&gt;&gt;S: ✅ 点击选择学生</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: 📊 显示选中学生详情</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    else 没有找到</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: ❌ 提示未找到记录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: 💡 建议创建新档案</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span></code></pre></div><p><strong>💡 设计亮点</strong>：</p><ul><li>🎯 精准匹配，快速查询</li><li>👥 智能处理同名情况</li><li>📊 详细信息展示</li><li>💡 友好的空状态提示</li></ul><p><strong>📊 数据展示</strong>：</p><ul><li>基本信息：姓名、年龄、性别、年级</li><li>历史记录：最后评估日期、评估次数</li><li>快速操作：查看详情、新建评估</li></ul><hr><h3 id="_2-5-💎-会员系统流程" tabindex="-1">2.5 💎 会员系统流程 <a class="header-anchor" href="#_2-5-💎-会员系统流程" aria-label="Permalink to “2.5 💎 会员系统流程”">​</a></h3><div style="background:linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);padding:15px;border-radius:8px;margin:10px 0;"><b>🎁 会员系统概览</b><br> 提供三种会员等级，满足不同用户需求：<br> 💳 专业版月卡 ¥299/月 | 💎 专业版年卡 ¥2,999/年 | ❤️ 高关爱年卡 ¥3,999/年 </div><h4 id="_2-5-1-📊-查看会员详情-生效中状态" tabindex="-1">2.5.1 📊 查看会员详情（生效中状态） <a class="header-anchor" href="#_2-5-1-📊-查看会员详情-生效中状态" aria-label="Permalink to “2.5.1 📊 查看会员详情（生效中状态）”">​</a></h4><blockquote><p><strong>场景说明</strong>：用户已开通会员，点击卡片查看详情<br><strong>展示内容</strong>：激活日期、有效期、价格、权益列表<br><strong>可用操作</strong>：续费、升级<br><strong>交互方式</strong>：模态框弹出</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant U as 👤 用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant S as 🤖 系统</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant M as 🎨 模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant L as 💾 本地存储</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: 🖱️ 点击会员卡片</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;L: 📖 读取会员状态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L--&gt;&gt;S: ✅ 返回生效中状态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;M: 🎨 创建详情模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M-&gt;&gt;U: 📊 显示会员详情</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over U,M: 📅 激活日期：2025-11-10</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                   ⏰ 有效期至：2025-11-10</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                   💰 价格：¥2,999/年</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                   🎁 权益列表： ✓ 无限次测评</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                                 ✓ 高级评估功能</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                                 ✓ 全部案例库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                                 ✓ 年度深度报告 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                                 ✓ 专属客服</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    alt 用户点击续费</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        U-&gt;&gt;M: 💳 点击续费按钮</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        M-&gt;&gt;U: 💡 显示续费提示</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        M-&gt;&gt;M: ❌ 关闭模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    else 用户点击升级</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        U-&gt;&gt;M: ⬆️ 点击升级按钮</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        M-&gt;&gt;U: 💡 显示升级提示</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        M-&gt;&gt;M: ❌ 关闭模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    else 用户关闭</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        U-&gt;&gt;M: ❌ 点击关闭按钮/遮罩</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        M-&gt;&gt;M: 🚪 关闭模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span></code></pre></div><p><strong>💡 设计亮点</strong>：</p><ul><li>🎨 精美的模态框设计</li><li>📊 清晰的信息层级</li><li>🎁 权益列表一目了然</li><li>⚡ 流畅的动画效果</li></ul><hr><h4 id="_2-5-2-💳-开通会员流程-待激活状态" tabindex="-1">2.5.2 💳 开通会员流程（待激活状态） <a class="header-anchor" href="#_2-5-2-💳-开通会员流程-待激活状态" aria-label="Permalink to “2.5.2 💳 开通会员流程（待激活状态）”">​</a></h4><blockquote><p><strong>场景说明</strong>：用户未开通会员，点击卡片进入开通流程<br><strong>展示内容</strong>：三种会员套餐对比<br><strong>支付流程</strong>：选择套餐 → 模拟支付 → 开通成功<br><strong>即时生效</strong>：开通后立即更新状态</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant U as 👤 用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant S as 🤖 系统</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant M as 🎨 模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant L as 💾 本地存储</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: 🖱️ 点击会员卡片</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;L: 📖 读取会员状态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L--&gt;&gt;S: 🔒 返回待激活状态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;M: 🎨 创建付费选项模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M-&gt;&gt;U: 💳 显示三种套餐</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over U,M: 📦 套餐选项：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                   💳 专业版月卡 ¥299/月</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     ✓ 每月50次测评  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     ✓ 智能评估报告</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                   💎 专业版年卡 ¥2,999/年 ⭐推荐</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     ✓ 无限次测评</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     ✓ 高级评估功能</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     ✓ 全部案例库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                   ❤️ 高关爱年卡 ¥3,999/年</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     ✓ 无限次心理测评</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     ✓ 专属心理咨询</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                     ✓ 高关爱平台使用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;M: ✅ 选择套餐并点击开通</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M-&gt;&gt;M: ❌ 关闭模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M-&gt;&gt;U: 💡 显示支付提示</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over M,U: &quot;💳 正在跳转到支付页面...&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;S: ⏳ 模拟支付处理（1.5秒）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;L: 💾 更新会员状态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;S: 🔄 更新会员显示</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 🎉 显示开通成功提示</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over S,U: &quot;🎉 恭喜！[会员名称]开通成功！&quot;</span></span></code></pre></div><p><strong>💡 设计亮点</strong>：</p><ul><li>💳 三种套餐清晰对比</li><li>⭐ 推荐套餐突出显示</li><li>💰 价格和权益一目了然</li><li>🎉 开通成功即时反馈</li></ul><p><strong>📊 套餐对比</strong>：</p><table tabindex="0"><thead><tr><th>套餐类型</th><th>价格</th><th>核心权益</th><th>适用场景</th></tr></thead><tbody><tr><td>💳 专业版月卡</td><td>¥299/月</td><td>每月 50 次测评</td><td>短期试用</td></tr><tr><td>💎 专业版年卡</td><td>¥2,999/年</td><td>无限次测评 + 高级功能</td><td>长期使用 ⭐ 推荐</td></tr><tr><td>❤️ 高关爱年卡</td><td>¥3,999/年</td><td>专属心理咨询</td><td>深度服务</td></tr></tbody></table><hr><h4 id="_2-5-3-🔄-会员状态切换流程-演示功能" tabindex="-1">2.5.3 🔄 会员状态切换流程（演示功能） <a class="header-anchor" href="#_2-5-3-🔄-会员状态切换流程-演示功能" aria-label="Permalink to “2.5.3 🔄 会员状态切换流程（演示功能）”">​</a></h4><blockquote><p><strong>功能说明</strong>：点击会员图标快速切换状态（用于演示）<br><strong>切换顺序</strong>：待激活 → 月卡 → 年卡 → 高关爱 → 待激活<br><strong>操作方式</strong>：点击右上角会员图标 💎<br><strong>即时反馈</strong>：显示切换提示</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[💎 点击会员图标] --&gt; B[📖 获取当前状态]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt; C{🔍 当前状态}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt;|🔒 待激活| D[💳 切换到专业版月卡]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt;|💳 专业版月卡| E[💎 切换到专业版年卡]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt;|💎 专业版年卡| F[❤️ 切换到高关爱年卡]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt;|❤️ 高关爱年卡| G[🔒 切换到待激活]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; H[💾 保存新状态]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt; H</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt; H</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt; H</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    H --&gt; I[🔄 更新卡片显示]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    I --&gt; J[💡 显示切换提示]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#e1f5ff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style J fill:#c8e6c9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style H fill:#fff9c4</span></span></code></pre></div><p><strong>💡 设计亮点</strong>：</p><ul><li>🔄 循环切换，方便演示</li><li>💾 状态持久化保存</li><li>🎨 卡片实时更新</li><li>💡 Toast 提示反馈</li></ul><p><strong>🎯 使用场景</strong>：</p><ul><li>📱 产品演示</li><li>🧪 功能测试</li><li>👥 用户培训</li><li>🎓 教学展示</li></ul><hr><h3 id="_2-6-🎛️-菜单导航流程" tabindex="-1">2.6 🎛️ 菜单导航流程 <a class="header-anchor" href="#_2-6-🎛️-菜单导航流程" aria-label="Permalink to “2.6 🎛️ 菜单导航流程”">​</a></h3><blockquote><p><strong>功能说明</strong>：侧边菜单的打开、关闭和页面导航<br><strong>触发方式</strong>：点击右上角菜单按钮<br><strong>菜单内容</strong>：智能助手、心理测评、案例检索、导师工具包、个人中心<br><strong>动画效果</strong>：滑入/滑出动画（300ms）</p></blockquote><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[🖱️ 点击菜单按钮] --&gt; B{📋 菜单状态}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|❌ 关闭| C[✅ 打开菜单]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|✅ 打开| D[❌ 关闭菜单]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt; E[🎭 显示遮罩层]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt; F[➡️ 菜单滑入动画]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt; G{👆 用户操作}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt;|📱 点击菜单项| H[❌ 关闭菜单]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt;|🎭 点击遮罩| H</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt;|✖️ 点击关闭按钮| H</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    H --&gt; I[🔄 页面导航]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    I --&gt; J{🎯 目标页面}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    J --&gt;|👤 个人中心| K[💎 更新会员显示]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    J --&gt;|📊 其他页面| L[📄 显示页面内容]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; M[⬅️ 菜单滑出动画]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M --&gt; N[🎭 隐藏遮罩层]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#e1f5ff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style K fill:#f3e5f5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style L fill:#c8e6c9</span></span></code></pre></div><p><strong>💡 设计亮点</strong>：</p><ul><li>🎨 流畅的滑动动画</li><li>🎭 半透明遮罩层</li><li>👆 多种关闭方式</li><li>⚡ 快速页面切换</li></ul><p><strong>📱 菜单项列表</strong>：</p><ul><li>🏠 智能助手</li><li>📊 心理测评</li><li>🔍 案例检索</li><li>🎓 导师工具包</li><li>🧠 心理状态评估</li><li>⚙️ 个人中心</li></ul><hr><h2 id="三、页面交互流程" tabindex="-1">三、页面交互流程 <a class="header-anchor" href="#三、页面交互流程" aria-label="Permalink to “三、页面交互流程”">​</a></h2><div style="background:linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);padding:20px;border-radius:10px;color:#333;margin:20px 0;"><h3>📱 页面级交互设计</h3><p>详细展示各个页面的交互逻辑和状态转换</p></div><h3 id="_3-1-💬-聊天页面交互" tabindex="-1">3.1 💬 聊天页面交互 <a class="header-anchor" href="#_3-1-💬-聊天页面交互" aria-label="Permalink to “3.1 💬 聊天页面交互”">​</a></h3><blockquote><p><strong>页面说明</strong>：主要的对话交互界面<br><strong>输入模式</strong>：文字输入 | 语音输入<br><strong>核心功能</strong>：消息发送、意图识别、AI 回复<br><strong>状态管理</strong>：输入模式切换、消息历史</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">stateDiagram-v2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [*] --&gt; ⏳等待输入</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ⏳等待输入 --&gt; ⌨️文字输入模式: 🎯默认状态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ⏳等待输入 --&gt; 🎤语音输入模式: 🔄点击切换按钮</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ⌨️文字输入模式 --&gt; ✍️输入中: 👆用户输入文字</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ✍️输入中 --&gt; 📤发送消息: 🖱️点击发送/回车</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    📤发送消息 --&gt; ⏳处理中: 💭显示打字动画</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ⏳处理中 --&gt; 📊显示结果: 🤖AI回复</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    📊显示结果 --&gt; ⏳等待输入</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    🎤语音输入模式 --&gt; 🔴录音中: 👇按住说话</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    🔴录音中 --&gt; 🔍识别中: 👆松开手指</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    🔍识别中 --&gt; 📤发送消息: 📝语音转文字</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ⌨️文字输入模式 --&gt; 🎤语音输入模式: 🔄点击切换</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    🎤语音输入模式 --&gt; ⌨️文字输入模式: 🔄点击切换</span></span></code></pre></div></details><p><strong>💡 设计亮点</strong>：</p><ul><li>🔄 灵活的输入模式切换</li><li>🎤 语音输入支持</li><li>💭 打字动画效果</li><li>📜 消息历史记录</li></ul><p><strong>⌨️ 文字输入模式</strong>：</p><ul><li>输入框输入文字</li><li>点击发送或按回车键</li><li>支持多行文本</li></ul><p><strong>🎤 语音输入模式</strong>：</p><ul><li>按住说话按钮</li><li>松开自动识别</li><li>语音转文字发送</li></ul><hr><h3 id="_3-2-👤-个人中心页面交互" tabindex="-1">3.2 👤 个人中心页面交互 <a class="header-anchor" href="#_3-2-👤-个人中心页面交互" aria-label="Permalink to “3.2 👤 个人中心页面交互”">​</a></h3><blockquote><p><strong>页面说明</strong>：用户个人信息和会员管理<br><strong>核心功能</strong>：查看个人资料、管理会员、查看统计<br><strong>会员操作</strong>：查看详情、开通会员、状态切换<br><strong>数据展示</strong>：使用统计、会员状态</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[🚪 进入个人中心] --&gt; B[📥 加载用户信息]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt; C[👤 显示个人资料]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt; D[📊 显示使用统计]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; E[💎 显示会员卡片]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt; F{👆 用户操作}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt;|🖱️ 点击会员卡片| G[🎨 打开会员模态框]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt;|💎 点击会员图标| H[🔄 切换会员状态]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt;|📱 点击其他菜单项| I[🔄 跳转对应页面]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt; J{🔍 会员状态}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    J --&gt;|🔒 待激活| K[💳 显示付费选项]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    J --&gt;|✅ 生效中| L[📊 显示会员详情]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    K --&gt; M[✅ 选择套餐]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M --&gt; N[💳 模拟支付]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    N --&gt; O[🔄 更新状态]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L --&gt; P[👁️ 查看详情]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    P --&gt; Q[💰 续费/升级]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    H --&gt; R[🔄 更新显示]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    R --&gt; S[💡 显示提示]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#e1f5ff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style O fill:#c8e6c9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style S fill:#fff9c4</span></span></code></pre></div></details><p><strong>💡 设计亮点</strong>：</p><ul><li>👤 清晰的信息层级</li><li>💎 醒目的会员卡片</li><li>📊 直观的数据统计</li><li>🎨 精美的模态框</li></ul><p><strong>📊 页面内容</strong>：</p><ul><li>👤 个人资料：头像、姓名、身份</li><li>📈 使用统计：测评次数、活跃天数</li><li>💎 会员状态：等级、有效期</li><li>⚙️ 设置选项：通知、隐私、安全</li></ul><hr><h3 id="_3-3-🔍-案例检索页面交互" tabindex="-1">3.3 🔍 案例检索页面交互 <a class="header-anchor" href="#_3-3-🔍-案例检索页面交互" aria-label="Permalink to “3.3 🔍 案例检索页面交互”">​</a></h3><blockquote><p><strong>页面说明</strong>：心理辅导案例的检索和查看<br><strong>筛选维度</strong>：年龄段、问题类型、严重程度、解决方案<br><strong>核心功能</strong>：多维筛选、案例查看、案例收藏<br><strong>数据展示</strong>：案例列表、案例详情</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant U as 👤 用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant S as 🤖 系统</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant F as 🔍 筛选器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant D as 🗄️ 数据库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: 🚪 进入案例检索页面</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 📋 显示筛选条件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;F: ✅ 选择筛选条件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over U,F: 🎯 筛选维度：&lt;br/&gt;👶 年龄段（儿童/青少年/成人）&lt;br/&gt;🧠 问题类型（焦虑/抑郁/厌学）&lt;br/&gt;⚠️ 严重程度（轻度/中度/重度）&lt;br/&gt;💡 解决方案（认知疗法/行为疗法）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F-&gt;&gt;D: 🔎 查询符合条件的案例</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D--&gt;&gt;S: 📋 返回案例列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 📊 显示案例列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: 🖱️ 点击案例</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 📄 显示案例详情</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over S,U: 📖 案例内容：&lt;br/&gt;📝 案例背景&lt;br/&gt;🔍 问题分析&lt;br/&gt;💡 干预方案&lt;br/&gt;📊 效果评估</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: ⭐ 收藏案例</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: ✅ 显示收藏成功</span></span></code></pre></div></details><p><strong>💡 设计亮点</strong>：</p><ul><li>🔍 多维度筛选</li><li>📊 清晰的案例列表</li><li>📄 详细的案例内容</li><li>⭐ 便捷的收藏功能</li></ul><p><strong>🎯 筛选维度</strong>：</p><ul><li>👶 年龄段：儿童、青少年、成人</li><li>🧠 问题类型：焦虑、抑郁、厌学、人际关系</li><li>⚠️ 严重程度：轻度、中度、重度</li><li>💡 解决方案：认知疗法、行为疗法、家庭治疗</li></ul><hr><h2 id="四、异常处理流程" tabindex="-1">四、异常处理流程 <a class="header-anchor" href="#四、异常处理流程" aria-label="Permalink to “四、异常处理流程”">​</a></h2><div style="background:linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);padding:20px;border-radius:10px;color:#333;margin:20px 0;"><h3>⚠️ 异常处理机制</h3><p>完善的错误处理和用户友好的提示系统</p></div><h3 id="_4-1-✅-输入验证流程" tabindex="-1">4.1 ✅ 输入验证流程 <a class="header-anchor" href="#_4-1-✅-输入验证流程" aria-label="Permalink to “4.1 ✅ 输入验证流程”">​</a></h3><blockquote><p><strong>验证内容</strong>：空值检查、长度限制、特殊字符过滤<br><strong>处理策略</strong>：前端验证 + 友好提示<br><strong>安全防护</strong>：XSS 防护、SQL 注入防护<br><strong>用户体验</strong>：实时验证、清晰提示</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[💬 用户输入] --&gt; B{❓ 输入是否为空}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|✅ 是| C[⏳ 不处理，等待输入]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|❌ 否| D{📏 输入长度检查}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt;|⚠️ 过长| E[💡 提示输入过长]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt;|✅ 正常| F[➡️ 继续处理]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt; G{🔍 特殊字符检查}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt;|⚠️ 包含| H[🛡️ 过滤特殊字符]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt;|✅ 不包含| I[✅ 正常处理]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    H --&gt; I</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    I --&gt; J[🧠 意图识别]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#e1f5ff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style J fill:#c8e6c9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style E fill:#ffcdd2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style H fill:#fff9c4</span></span></code></pre></div></details><p><strong>💡 验证规则</strong>：</p><ul><li>❌ 空值检查：不允许空输入</li><li>📏 长度限制：最大 500 字符</li><li>🛡️ 特殊字符：过滤危险字符</li><li>⚡ 实时验证：输入时即时反馈</li></ul><p><strong>🔒 安全措施</strong>：</p><ul><li>XSS 防护：过滤脚本标签</li><li>SQL 注入防护：参数化查询</li><li>CSRF 防护：令牌验证</li></ul><hr><h3 id="_4-2-🌐-网络错误处理" tabindex="-1">4.2 🌐 网络错误处理 <a class="header-anchor" href="#_4-2-🌐-网络错误处理" aria-label="Permalink to “4.2 🌐 网络错误处理”">​</a></h3><blockquote><p><strong>错误类型</strong>：网络超时、服务器错误、数据错误<br><strong>处理策略</strong>：友好提示 + 重试机制<br><strong>用户体验</strong>：清晰的错误说明、便捷的重试按钮<br><strong>日志记录</strong>：记录错误信息用于排查</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant U as 👤 用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant S as 🤖 系统</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant A as 🌐 API</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: 📤 发起请求</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;A: 🔗 调用API</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    alt ✅ 请求成功</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        A--&gt;&gt;S: 📦 返回数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: 📊 显示结果</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    else ⏱️ 网络超时</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        A--&gt;&gt;S: ⚠️ 超时错误</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: 💡 显示&quot;网络超时，请重试&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: 🔄 提供重试按钮</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    else 🔥 服务器错误</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        A--&gt;&gt;S: ❌ 500错误</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: 💡 显示&quot;服务器错误，请稍后重试&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    else 📋 数据错误</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        A--&gt;&gt;S: ⚠️ 数据格式错误</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S-&gt;&gt;U: 💡 显示&quot;数据加载失败&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span></code></pre></div></details><p><strong>💡 错误处理策略</strong>：</p><table tabindex="0"><thead><tr><th>错误类型</th><th>提示信息</th><th>用户操作</th><th>系统处理</th></tr></thead><tbody><tr><td>⏱️ 网络超时</td><td>&quot;网络超时，请重试&quot;</td><td>🔄 点击重试</td><td>重新发起请求</td></tr><tr><td>🔥 服务器错误</td><td>&quot;服务器错误，请稍后重试&quot;</td><td>⏳ 稍后再试</td><td>记录错误日志</td></tr><tr><td>📋 数据错误</td><td>&quot;数据加载失败&quot;</td><td>🔄 刷新页面</td><td>上报错误信息</td></tr><tr><td>🔒 权限错误</td><td>&quot;无权限访问&quot;</td><td>👤 联系管理员</td><td>跳转登录页</td></tr></tbody></table><hr><h3 id="_4-3-📭-数据不存在处理" tabindex="-1">4.3 📭 数据不存在处理 <a class="header-anchor" href="#_4-3-📭-数据不存在处理" aria-label="Permalink to “4.3 📭 数据不存在处理”">​</a></h3><blockquote><p><strong>场景说明</strong>：查询数据时未找到结果<br><strong>处理策略</strong>：友好的空状态提示 + 引导操作<br><strong>用户体验</strong>：清晰的说明、建议的下一步操作<br><strong>设计原则</strong>：避免空白页面，提供有价值的信息</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[🔍 查询数据] --&gt; B{❓ 数据是否存在}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|✅ 存在| C[📦 返回数据]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|❌ 不存在| D[📭 显示空状态]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; E{🤔 是否可创建}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt;|✅ 是| F[➕ 显示创建按钮]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt;|❌ 否| G[💡 显示提示信息]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt; H[👉 引导用户创建]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt; I[💡 建议其他操作]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#e1f5ff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style C fill:#c8e6c9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style D fill:#fff9c4</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style H fill:#f3e5f5</span></span></code></pre></div></details><p><strong>💡 空状态设计</strong>：</p><table tabindex="0"><thead><tr><th>场景</th><th>图标</th><th>提示文案</th><th>引导操作</th></tr></thead><tbody><tr><td>📭 无学生档案</td><td>👤</td><td>&quot;未找到该学生的档案&quot;</td><td>➕ 创建新档案</td></tr><tr><td>📋 无案例结果</td><td>🔍</td><td>&quot;没有符合条件的案例&quot;</td><td>🔄 调整筛选条件</td></tr><tr><td>⭐ 无收藏内容</td><td>💝</td><td>&quot;还没有收藏任何内容&quot;</td><td>🔍 去浏览案例</td></tr><tr><td>📊 无测评记录</td><td>📈</td><td>&quot;暂无测评记录&quot;</td><td>➕ 开始测评</td></tr></tbody></table><hr><h2 id="五、动画效果流程" tabindex="-1">五、动画效果流程 <a class="header-anchor" href="#五、动画效果流程" aria-label="Permalink to “五、动画效果流程”">​</a></h2><div style="background:linear-gradient(135deg, #fa709a 0%, #fee140 100%);padding:20px;border-radius:10px;color:#333;margin:20px 0;"><h3>🎨 动画效果设计</h3><p>流畅自然的动画提升用户体验</p></div><h3 id="_5-1-🎭-模态框动画" tabindex="-1">5.1 🎭 模态框动画 <a class="header-anchor" href="#_5-1-🎭-模态框动画" aria-label="Permalink to “5.1 🎭 模态框动画”">​</a></h3><blockquote><p><strong>动画类型</strong>：淡入淡出 + 滑动<br><strong>动画时长</strong>：300ms<br><strong>缓动函数</strong>：ease<br><strong>触发时机</strong>：打开/关闭模态框</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant U as 👤 用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant M as 🎭 模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant A as 🎨 动画引擎</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over U,M: 🎬 打开模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;M: 🖱️ 触发打开</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M-&gt;&gt;A: 🏗️ 创建DOM元素</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A-&gt;&gt;A: ➕ 添加到body</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A-&gt;&gt;A: ⚡ requestAnimationFrame</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A-&gt;&gt;M: ✨ 添加active类</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M-&gt;&gt;U: 🎭 遮罩淡入（300ms）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M-&gt;&gt;U: ⬆️ 内容滑入（300ms）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over U,M: 🚪 关闭模态框</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;M: ❌ 触发关闭</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    M-&gt;&gt;A: 🔄 移除active类</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A-&gt;&gt;M: 🎭 遮罩淡出（300ms）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A-&gt;&gt;M: ⬇️ 内容滑出（300ms）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A-&gt;&gt;A: ⏱️ 延迟300ms</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A-&gt;&gt;A: 🗑️ 移除DOM元素</span></span></code></pre></div></details><p><strong>💡 动画细节</strong>：</p><table tabindex="0"><thead><tr><th>阶段</th><th>动画效果</th><th>时长</th><th>缓动函数</th></tr></thead><tbody><tr><td>🎬 打开-遮罩</td><td>淡入（opacity: 0→1）</td><td>300ms</td><td>ease</td></tr><tr><td>🎬 打开-内容</td><td>向上滑入（translateY: 50px→0）</td><td>300ms</td><td>ease</td></tr><tr><td>🚪 关闭-遮罩</td><td>淡出（opacity: 1→0）</td><td>300ms</td><td>ease</td></tr><tr><td>🚪 关闭-内容</td><td>向下滑出（translateY: 0→50px）</td><td>300ms</td><td>ease</td></tr></tbody></table><p><strong>🔧 技术实现</strong>：</p><ul><li>CSS3 Animation</li><li>requestAnimationFrame</li><li>transform + opacity（硬件加速）</li></ul><hr><h3 id="_5-2-📱-页面切换动画" tabindex="-1">5.2 📱 页面切换动画 <a class="header-anchor" href="#_5-2-📱-页面切换动画" aria-label="Permalink to “5.2 📱 页面切换动画”">​</a></h3><blockquote><p><strong>动画类型</strong>：淡入淡出<br><strong>动画时长</strong>：200ms<br><strong>触发时机</strong>：页面导航<br><strong>性能优化</strong>：使用 opacity 避免重排</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[🔄 触发页面切换] --&gt; B[👋 隐藏当前页面]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt; C[👁️ 显示目标页面]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt; D{🤔 目标页面类型}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt;|⚙️ 需要初始化| E[🔧 执行初始化]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt;|✅ 无需初始化| F[➡️ 直接显示]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt; G[✨ 淡入动画]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt; G</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt; H[🔄 更新导航状态]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#e1f5ff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style H fill:#c8e6c9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style E fill:#fff9c4</span></span></code></pre></div></details><p><strong>💡 动画细节</strong>：</p><ul><li>⚡ 快速切换（200ms）</li><li>🎨 淡入淡出效果</li><li>📱 流畅的用户体验</li><li>🔧 按需初始化页面</li></ul><hr><h2 id="六、数据同步流程" tabindex="-1">六、数据同步流程 <a class="header-anchor" href="#六、数据同步流程" aria-label="Permalink to “六、数据同步流程”">​</a></h2><div style="background:linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);padding:20px;border-radius:10px;color:#333;margin:20px 0;"><h3>💾 数据同步机制</h3><p>确保数据的一致性和持久化</p></div><h3 id="_6-1-💾-本地存储同步" tabindex="-1">6.1 💾 本地存储同步 <a class="header-anchor" href="#_6-1-💾-本地存储同步" aria-label="Permalink to “6.1 💾 本地存储同步”">​</a></h3><blockquote><p><strong>存储方式</strong>：localStorage<br><strong>存储内容</strong>：用户身份、会员状态、用户偏好<br><strong>同步时机</strong>：数据变更时立即同步<br><strong>恢复机制</strong>：页面刷新时自动恢复</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant U as 👤 用户操作</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant S as 🤖 系统</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant L as 💾 localStorage</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: ✏️ 修改数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;S: 🔄 更新内存状态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;L: 💾 保存到localStorage</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L--&gt;&gt;S: ✅ 保存成功</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 🔄 更新界面显示</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over U,L: 🔄 页面刷新</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    U-&gt;&gt;S: 🔃 重新加载</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;L: 📖 读取数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L--&gt;&gt;S: 📦 返回数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;S: 🔄 恢复状态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S-&gt;&gt;U: 📊 显示界面</span></span></code></pre></div></details><p><strong>💡 存储内容</strong>：</p><table tabindex="0"><thead><tr><th>数据类型</th><th>存储键名</th><th>数据格式</th><th>用途</th></tr></thead><tbody><tr><td>👤 用户身份</td><td>userRole</td><td>string</td><td>身份识别</td></tr><tr><td>💎 会员状态</td><td>membershipStatus</td><td>string</td><td>会员管理</td></tr><tr><td>⚙️ 用户偏好</td><td>userPreferences</td><td>JSON</td><td>个性化设置</td></tr><tr><td>📊 使用统计</td><td>usageStats</td><td>JSON</td><td>数据分析</td></tr></tbody></table><p><strong>🔒 数据安全</strong>：</p><ul><li>敏感信息加密存储</li><li>定期清理过期数据</li><li>数据备份机制</li></ul><hr><h3 id="_6-2-💎-会员状态同步" tabindex="-1">6.2 💎 会员状态同步 <a class="header-anchor" href="#_6-2-💎-会员状态同步" aria-label="Permalink to “6.2 💎 会员状态同步”">​</a></h3><blockquote><p><strong>同步内容</strong>：会员等级、有效期、权益<br><strong>同步时机</strong>：状态变更、页面切换<br><strong>更新策略</strong>：内存优先、持久化保存<br><strong>UI 更新</strong>：实时反映状态变化</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[💎 会员状态变更] --&gt; B[🔄 更新内存状态]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt; C[💾 保存到localStorage]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt; D[🎨 更新UI显示]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; E{🤔 是否在个人中心}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt;|✅ 是| F[🔄 更新会员卡片]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt;|❌ 否| G[🏷️ 标记需要更新]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt; H[✅ 完成同步]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt; I[⏰ 下次进入时更新]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    I --&gt; H</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#e1f5ff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style H fill:#c8e6c9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style G fill:#fff9c4</span></span></code></pre></div></details><p><strong>💡 同步策略</strong>：</p><ul><li>⚡ 即时更新：状态变更立即同步</li><li>🎨 UI 刷新：实时反映状态</li><li>💾 持久化：保存到本地存储</li><li>🔄 智能更新：按需更新 UI</li></ul><p><strong>🔧 优化技巧</strong>：</p><ul><li>使用标记位避免重复更新</li><li>批量更新减少 DOM 操作</li><li>异步处理提升响应速度</li></ul><hr><h2 id="七、性能优化流程" tabindex="-1">七、性能优化流程 <a class="header-anchor" href="#七、性能优化流程" aria-label="Permalink to “七、性能优化流程”">​</a></h2><div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);padding:20px;border-radius:10px;color:white;margin:20px 0;"><h3>⚡ 性能优化策略</h3><p>提升系统响应速度和用户体验</p></div><h3 id="_7-1-🎯-事件处理优化" tabindex="-1">7.1 🎯 事件处理优化 <a class="header-anchor" href="#_7-1-🎯-事件处理优化" aria-label="Permalink to “7.1 🎯 事件处理优化”">​</a></h3><blockquote><p><strong>优化目标</strong>：减少不必要的事件处理，提升响应速度<br><strong>优化技术</strong>：防抖、节流、事件委托<br><strong>适用场景</strong>：高频事件（滚动、输入、窗口调整）<br><strong>性能提升</strong>：减少 70%+的事件处理次数</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A[👆 用户操作] --&gt; B{🔍 事件类型}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|⚡ 高频事件| C[🛡️ 防抖/节流]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|📝 普通事件| D[➡️ 直接处理]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C --&gt; E[⏱️ 延迟执行]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    E --&gt; F[📦 批量处理]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; G[🎯 单次处理]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    F --&gt; H[🎨 更新UI]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    G --&gt; H</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#e1f5ff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style H fill:#c8e6c9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style C fill:#fff9c4</span></span></code></pre></div></details><p><strong>💡 优化技术</strong>：</p><table tabindex="0"><thead><tr><th>技术</th><th>适用场景</th><th>效果</th><th>实现方式</th></tr></thead><tbody><tr><td>🛡️ 防抖</td><td>搜索输入、窗口调整</td><td>延迟执行，只执行最后一次</td><td>延迟 300ms</td></tr><tr><td>⚡ 节流</td><td>滚动事件、鼠标移动</td><td>固定频率执行</td><td>每 100ms 执行一次</td></tr><tr><td>📋 事件委托</td><td>列表项点击</td><td>减少监听器数量</td><td>父元素监听</td></tr><tr><td>🔄 批量处理</td><td>多次 DOM 更新</td><td>减少重排重绘</td><td>DocumentFragment</td></tr></tbody></table><hr><h3 id="_7-2-🎨-dom-操作优化" tabindex="-1">7.2 🎨 DOM 操作优化 <a class="header-anchor" href="#_7-2-🎨-dom-操作优化" aria-label="Permalink to “7.2 🎨 DOM 操作优化”">​</a></h3><blockquote><p><strong>优化目标</strong>：减少 DOM 操作次数，避免重排重绘<br><strong>优化技术</strong>：批量操作、requestAnimationFrame、虚拟 DOM<br><strong>性能提升</strong>：减少 50%+的渲染时间<br><strong>用户体验</strong>：更流畅的动画和交互</p></blockquote><details open><summary>📋 <b>流程详情</b></summary><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant L as 💼 业务逻辑</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant D as 🎨 DOM操作</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant R as 🖥️ 渲染引擎</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L-&gt;&gt;D: 📝 准备更新数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D-&gt;&gt;D: 📦 批量收集变更</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D-&gt;&gt;R: ⚡ requestAnimationFrame</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    R-&gt;&gt;D: 🎬 下一帧开始</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D-&gt;&gt;D: 🔄 批量应用变更</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D-&gt;&gt;R: 🎨 触发重排重绘</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    R-&gt;&gt;R: 🖼️ 渲染更新</span></span></code></pre></div></details><p><strong>💡 优化技巧</strong>：</p><table tabindex="0"><thead><tr><th>技巧</th><th>说明</th><th>性能提升</th></tr></thead><tbody><tr><td>📦 批量操作</td><td>使用 DocumentFragment</td><td>减少重排次数</td></tr><tr><td>⚡ RAF</td><td>requestAnimationFrame</td><td>同步浏览器刷新</td></tr><tr><td>🎨 CSS 动画</td><td>使用 transform/opacity</td><td>硬件加速</td></tr><tr><td>🔄 虚拟滚动</td><td>只渲染可见区域</td><td>减少 DOM 数量</td></tr></tbody></table><p><strong>🔧 最佳实践</strong>：</p><ul><li>避免频繁读取布局属性</li><li>使用 CSS 类切换代替直接修改样式</li><li>合理使用 will-change 提示浏览器</li><li>及时清理不需要的 DOM 元素</li></ul><hr><h2 id="八、总结" tabindex="-1">八、总结 <a class="header-anchor" href="#八、总结" aria-label="Permalink to “八、总结”">​</a></h2><div style="background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%);padding:25px;border-radius:10px;color:white;margin:20px 0;text-align:center;"><h3>🎉 文档总结</h3><p style="font-size:16px;line-height:1.8;"> 本文档详细描述了Ai心理学家的完整交互流程体系<br> 为产品设计、开发实现、测试验证提供了清晰的指导 </p></div><h3 id="📊-文档覆盖内容" tabindex="-1">📊 文档覆盖内容 <a class="header-anchor" href="#📊-文档覆盖内容" aria-label="Permalink to “📊 文档覆盖内容”">​</a></h3><h4 id="✅-已完整描述的流程" tabindex="-1">✅ 已完整描述的流程 <a class="header-anchor" href="#✅-已完整描述的流程" aria-label="Permalink to “✅ 已完整描述的流程”">​</a></h4><ol><li><p><strong>🏠 整体交互流程</strong></p><ul><li>👶 用户首次使用流程</li><li>🔄 用户常规使用流程</li></ul></li><li><p><strong>⚙️ 核心功能流程</strong></p><ul><li>👤 身份选择与切换</li><li>🧠 智能意图识别</li><li>🗄️ 个案库智能匹配</li><li>💎 会员系统（查看/开通/切换）</li><li>🎛️ 菜单导航</li></ul></li><li><p><strong>📱 页面交互流程</strong></p><ul><li>💬 聊天页面（文字/语音输入）</li><li>👤 个人中心页面</li><li>🔍 案例检索页面</li></ul></li><li><p><strong>⚠️ 异常处理流程</strong></p><ul><li>✅ 输入验证</li><li>🌐 网络错误处理</li><li>📭 数据不存在处理</li></ul></li><li><p><strong>🎨 动画效果流程</strong></p><ul><li>🎭 模态框动画</li><li>📱 页面切换动画</li></ul></li><li><p><strong>💾 数据同步流程</strong></p><ul><li>💾 本地存储同步</li><li>💎 会员状态同步</li></ul></li><li><p><strong>⚡ 性能优化流程</strong></p><ul><li>🎯 事件处理优化</li><li>🎨 DOM 操作优化</li></ul></li></ol><hr><h3 id="🎯-文档特色" tabindex="-1">🎯 文档特色 <a class="header-anchor" href="#🎯-文档特色" aria-label="Permalink to “🎯 文档特色”">​</a></h3><table><tr><td width="50%"><p><strong>🎨 可视化设计</strong></p><ul><li>📊 Mermaid 流程图</li><li>🎨 丰富的图标系统</li><li>🌈 渐变色块分区</li><li>📋 清晰的表格对比</li></ul></td><td width="50%"><p><strong>📖 内容组织</strong></p><ul><li>🔍 可折叠详情区</li><li>💡 设计亮点总结</li><li>📊 数据表格展示</li><li>🔧 技术实现说明</li></ul></td></tr><tr><td width="50%"><p><strong>👥 用户友好</strong></p><ul><li>🎯 场景说明</li><li>⏱️ 时长预估</li><li>💡 操作提示</li><li>✅ 成功标准</li></ul></td><td width="50%"><p><strong>🔧 技术详实</strong></p><ul><li>📝 实现原理</li><li>🎨 动画参数</li><li>📊 性能数据</li><li>🛡️ 安全措施</li></ul></td></tr></table><hr><h3 id="📚-使用指南" tabindex="-1">📚 使用指南 <a class="header-anchor" href="#📚-使用指南" aria-label="Permalink to “📚 使用指南”">​</a></h3><h4 id="👥-不同角色的阅读建议" tabindex="-1">👥 不同角色的阅读建议 <a class="header-anchor" href="#👥-不同角色的阅读建议" aria-label="Permalink to “👥 不同角色的阅读建议”">​</a></h4><p><strong>🎨 产品经理/设计师</strong></p><ul><li>重点阅读：整体流程、核心功能、页面交互</li><li>关注内容：用户体验、交互逻辑、设计亮点</li></ul><p><strong>💻 开发工程师</strong></p><ul><li>重点阅读：核心功能、异常处理、性能优化</li><li>关注内容：技术实现、数据流、优化策略</li></ul><p><strong>🧪 测试工程师</strong></p><ul><li>重点阅读：所有流程图</li><li>关注内容：异常场景、边界条件、用户路径</li></ul><p><strong>📊 项目经理</strong></p><ul><li>重点阅读：整体流程、核心功能</li><li>关注内容：功能完整性、开发进度、风险点</li></ul><hr><h3 id="🔗-相关文档" tabindex="-1">🔗 相关文档 <a class="header-anchor" href="#🔗-相关文档" aria-label="Permalink to “🔗 相关文档”">​</a></h3><ul><li>📋 <a href="./prd.html">产品说明书</a> - 产品需求详细说明</li><li>🤖 <a href="./speak.html">智能对话功能说明</a> - 智能对话功能详解</li><li>📖 <a href="./markdown-examples.html">Markdown 示例</a> - 文档编写示例</li><li>🔧 <a href="./api-examples.html">API 示例</a> - 接口使用示例</li></ul><hr><h3 id="📞-联系方式" tabindex="-1">📞 联系方式 <a class="header-anchor" href="#📞-联系方式" aria-label="Permalink to “📞 联系方式”">​</a></h3><p>如有疑问或建议，请联系：</p><ul><li>📧 产品团队：[待填写]</li><li>💻 技术团队：[待填写]</li><li>📝 文档维护：[待填写]</li></ul><hr><div align="center" style="margin-top:40px;padding:20px;background:#f5f7fa;border-radius:10px;"><p><strong>🎉 感谢阅读！</strong></p><p>本文档持续更新中，最后更新时间：2025-11-10</p><p>⭐ 如果这份文档对你有帮助，欢迎分享给团队成员</p></div>`,205)])])}const c=a(t,[["render",p]]);export{d as __pageData,c as default};
