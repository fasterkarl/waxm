import{_ as a,c as n,o as p,ah as i}from"./chunks/framework.yZu4FxWF.js";const o=JSON.parse('{"title":"🤖 智能对话功能说明","description":"","frontmatter":{},"headers":[],"relativePath":"speak.md","filePath":"speak.md","lastUpdated":null}'),l={name:"speak.md"};function e(h,s,t,c,k,r){return p(),n("div",null,[...s[0]||(s[0]=[i(`<h1 id="🤖-智能对话功能说明" tabindex="-1">🤖 智能对话功能说明 <a class="header-anchor" href="#🤖-智能对话功能说明" aria-label="Permalink to “🤖 智能对话功能说明”">​</a></h1><h2 id="📋-功能概述" tabindex="-1">📋 功能概述 <a class="header-anchor" href="#📋-功能概述" aria-label="Permalink to “📋 功能概述”">​</a></h2><p>系统现在支持智能多轮对话，AI会主动询问信息，根据上下文提示用户补充信息，并自动推送相关内容。</p><hr><h2 id="🎯-两大智能对话场景" tabindex="-1">🎯 两大智能对话场景 <a class="header-anchor" href="#🎯-两大智能对话场景" aria-label="Permalink to “🎯 两大智能对话场景”">​</a></h2><h3 id="_1-📊-智能测评对话" tabindex="-1">1. 📊 智能测评对话 <a class="header-anchor" href="#_1-📊-智能测评对话" aria-label="Permalink to “1. 📊 智能测评对话”">​</a></h3><h4 id="触发方式" tabindex="-1">触发方式 <a class="header-anchor" href="#触发方式" aria-label="Permalink to “触发方式”">​</a></h4><p>用户输入：</p><ul><li>&quot;我想测评&quot;</li><li>&quot;测评&quot;</li><li>&quot;心理测评&quot;</li></ul><h4 id="对话流程" tabindex="-1">对话流程 <a class="header-anchor" href="#对话流程" aria-label="Permalink to “对话流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户：我想测评</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：好的！我来帮您进行心理测评。</span></span>
<span class="line"><span>    首先，请告诉我被测评人的姓名？</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>用户：张小明</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：好的，张小明。</span></span>
<span class="line"><span>    请问年龄是多少？</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>用户：14</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：明白了。</span></span>
<span class="line"><span>    请问性别是？（男/女）</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>用户：男</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：好的。</span></span>
<span class="line"><span>    请问主要想测评哪个方向？</span></span>
<span class="line"><span>    • 情绪稳定性</span></span>
<span class="line"><span>    • 学习适应性</span></span>
<span class="line"><span>    • 社交能力</span></span>
<span class="line"><span>    • 综合测评</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>用户：情绪稳定性</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：非常好！我已经收集到以下信息：</span></span>
<span class="line"><span>    👤 姓名：张小明</span></span>
<span class="line"><span>    🎂 年龄：14岁</span></span>
<span class="line"><span>    ⚧ 性别：男</span></span>
<span class="line"><span>    🎯 测评方向：情绪稳定性</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    正在为您匹配合适的测评量表...</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：根据您提供的信息，我为张小明推荐以下测评量表：</span></span>
<span class="line"><span>    [测评量表列表卡片]</span></span>
<span class="line"><span>    • 中学生情绪稳定性测评</span></span>
<span class="line"><span>    • 学习适应性测评量表</span></span>
<span class="line"><span>    • 社交能力评估量表</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>用户点击测评项 → 打开测评详情页</span></span></code></pre></div><h4 id="智能验证" tabindex="-1">智能验证 <a class="header-anchor" href="#智能验证" aria-label="Permalink to “智能验证”">​</a></h4><ul><li><strong>年龄验证</strong>：必须是6-18岁之间的数字</li><li><strong>性别验证</strong>：必须包含&quot;男&quot;或&quot;女&quot;</li><li><strong>错误提示</strong>：输入无效时会提示重新输入</li></ul><h3 id="_2-🧠-智能评估对话" tabindex="-1">2. 🧠 智能评估对话 <a class="header-anchor" href="#_2-🧠-智能评估对话" aria-label="Permalink to “2. 🧠 智能评估对话”">​</a></h3><h4 id="触发方式-1" tabindex="-1">触发方式 <a class="header-anchor" href="#触发方式-1" aria-label="Permalink to “触发方式”">​</a></h4><p>用户输入：</p><ul><li>&quot;智能评估&quot;</li><li>&quot;评估&quot;</li><li>&quot;辅导建议&quot;</li></ul><h4 id="对话流程-1" tabindex="-1">对话流程 <a class="header-anchor" href="#对话流程-1" aria-label="Permalink to “对话流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户：智能评估</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：好的！我来为您提供智能评估服务。</span></span>
<span class="line"><span>    首先，请告诉我学生的姓名？</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>用户：李小红</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：好的，李小红。</span></span>
<span class="line"><span>    请问年龄是多少？</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>用户：15</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：明白了。</span></span>
<span class="line"><span>    请问性别是？（男/女）</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>用户：女</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：好的。</span></span>
<span class="line"><span>    请详细描述学生的心理问题或行为表现：</span></span>
<span class="line"><span>    • 具体的问题表现</span></span>
<span class="line"><span>    • 持续时间</span></span>
<span class="line"><span>    • 影响程度</span></span>
<span class="line"><span>    • 家庭背景（可选）</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>用户：最近一个月经常情绪低落，不愿意与同学交流，</span></span>
<span class="line"><span>      成绩下降明显，在家也不愿意说话，父母工作忙...</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：好的，我已经收集到以下信息：</span></span>
<span class="line"><span>    👤 姓名：李小红</span></span>
<span class="line"><span>    🎂 年龄：15岁</span></span>
<span class="line"><span>    ⚧ 性别：女</span></span>
<span class="line"><span>    📝 问题描述：最近一个月经常情绪低落...</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    正在生成智能评估报告...</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>AI：✅ 智能评估报告已生成！</span></span>
<span class="line"><span>    为李小红提供以下专业建议：</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [评估报告卡片]</span></span>
<span class="line"><span>    📋 评估意见</span></span>
<span class="line"><span>    💡 辅导建议</span></span>
<span class="line"><span>    🏠 家访大纲</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [保存报告] [导出PDF]</span></span></code></pre></div><h4 id="智能验证-1" tabindex="-1">智能验证 <a class="header-anchor" href="#智能验证-1" aria-label="Permalink to “智能验证”">​</a></h4><ul><li><strong>年龄验证</strong>：必须是6-18岁之间的数字</li><li><strong>性别验证</strong>：必须包含&quot;男&quot;或&quot;女&quot;</li><li><strong>描述长度</strong>：至少10个字，确保信息充分</li></ul><hr><h2 id="🎨-界面展示" tabindex="-1">🎨 界面展示 <a class="header-anchor" href="#🎨-界面展示" aria-label="Permalink to “🎨 界面展示”">​</a></h2><h3 id="测评对话界面" tabindex="-1">测评对话界面 <a class="header-anchor" href="#测评对话界面" aria-label="Permalink to “测评对话界面”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────┐</span></span>
<span class="line"><span>│ 🎤 [输入您的问题或需求...] 📤│ ← 固定顶部</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 👤 我想测评                  │</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 🤖 好的！我来帮您进行心理    │</span></span>
<span class="line"><span>│    测评。首先，请告诉我被    │</span></span>
<span class="line"><span>│    测评人的姓名？            │</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 👤 张小明                    │</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 🤖 好的，张小明。            │</span></span>
<span class="line"><span>│    请问年龄是多少？          │</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 👤 14                        │</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 🤖 明白了。                  │</span></span>
<span class="line"><span>│    请问性别是？（男/女）     │</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 👤 男                        │</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 🤖 好的。                    │</span></span>
<span class="line"><span>│    请问主要想测评哪个方向？  │</span></span>
<span class="line"><span>│    • 情绪稳定性              │</span></span>
<span class="line"><span>│    • 学习适应性              │</span></span>
<span class="line"><span>│    • 社交能力                │</span></span>
<span class="line"><span>│    • 综合测评                │</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 👤 情绪稳定性                │</span></span>
<span class="line"><span>├─────────────────────────────┤</span></span>
<span class="line"><span>│ 🤖 非常好！我已经收集到...   │</span></span>
<span class="line"><span>│    ┌─────────────────────┐  │</span></span>
<span class="line"><span>│    │📊 为张小明推荐的测评 │  │</span></span>
<span class="line"><span>│    ├─────────────────────┤  │</span></span>
<span class="line"><span>│    │中学生情绪稳定性测评  │  │</span></span>
<span class="line"><span>│    │⏱15分钟 🔘单选 ⭐推荐│  │</span></span>
<span class="line"><span>│    ├─────────────────────┤  │</span></span>
<span class="line"><span>│    │学习适应性测评量表    │  │</span></span>
<span class="line"><span>│    │⏱20分钟 ☑多选 🔄常用│  │</span></span>
<span class="line"><span>│    └─────────────────────┘  │</span></span>
<span class="line"><span>└─────────────────────────────┘</span></span></code></pre></div><h3 id="智能评估结果界面" tabindex="-1">智能评估结果界面 <a class="header-anchor" href="#智能评估结果界面" aria-label="Permalink to “智能评估结果界面”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────┐</span></span>
<span class="line"><span>│ 🤖 ✅ 智能评估报告已生成！    │</span></span>
<span class="line"><span>│    为李小红提供以下专业建议： │</span></span>
<span class="line"><span>│                             │</span></span>
<span class="line"><span>│    ┌─────────────────────┐  │</span></span>
<span class="line"><span>│    │📋 评估意见           │  │</span></span>
<span class="line"><span>│    ├─────────────────────┤  │</span></span>
<span class="line"><span>│    │根据您提供的信息，李小│  │</span></span>
<span class="line"><span>│    │红（15岁，女）目前表现│  │</span></span>
<span class="line"><span>│    │出的问题需要关注...   │  │</span></span>
<span class="line"><span>│    │                     │  │</span></span>
<span class="line"><span>│    │1. 心理状态评估       │  │</span></span>
<span class="line"><span>│    │学生可能处于心理压力  │  │</span></span>
<span class="line"><span>│    │较大的状态...         │  │</span></span>
<span class="line"><span>│    │                     │  │</span></span>
<span class="line"><span>│    │2. 行为观察           │  │</span></span>
<span class="line"><span>│    │建议持续观察学生的日常│  │</span></span>
<span class="line"><span>│    │行为变化...           │  │</span></span>
<span class="line"><span>│    │                     │  │</span></span>
<span class="line"><span>│    │3. 风险等级           │  │</span></span>
<span class="line"><span>│    │⚠️ 中度关注          │  │</span></span>
<span class="line"><span>│    ├─────────────────────┤  │</span></span>
<span class="line"><span>│    │💡 辅导建议           │  │</span></span>
<span class="line"><span>│    ├─────────────────────┤  │</span></span>
<span class="line"><span>│    │短期措施（1-2周）：   │  │</span></span>
<span class="line"><span>│    │• 建立信任关系...     │  │</span></span>
<span class="line"><span>│    │• 创造安全环境...     │  │</span></span>
<span class="line"><span>│    │                     │  │</span></span>
<span class="line"><span>│    │中期措施（1-2个月）： │  │</span></span>
<span class="line"><span>│    │• 定期心理辅导...     │  │</span></span>
<span class="line"><span>│    │• 家校配合...         │  │</span></span>
<span class="line"><span>│    │                     │  │</span></span>
<span class="line"><span>│    │长期措施：            │  │</span></span>
<span class="line"><span>│    │• 建立健康机制...     │  │</span></span>
<span class="line"><span>│    ├─────────────────────┤  │</span></span>
<span class="line"><span>│    │🏠 家访大纲           │  │</span></span>
<span class="line"><span>│    ├─────────────────────┤  │</span></span>
<span class="line"><span>│    │访前准备：            │  │</span></span>
<span class="line"><span>│    │• 了解家庭情况...     │  │</span></span>
<span class="line"><span>│    │                     │  │</span></span>
<span class="line"><span>│    │访中沟通要点：        │  │</span></span>
<span class="line"><span>│    │1. 肯定学生优点...    │  │</span></span>
<span class="line"><span>│    │2. 客观描述问题...    │  │</span></span>
<span class="line"><span>│    │                     │  │</span></span>
<span class="line"><span>│    │访后跟进：            │  │</span></span>
<span class="line"><span>│    │• 记录家访内容...     │  │</span></span>
<span class="line"><span>│    ├─────────────────────┤  │</span></span>
<span class="line"><span>│    │[💾 保存] [📄 导出]  │  │</span></span>
<span class="line"><span>│    └─────────────────────┘  │</span></span>
<span class="line"><span>└─────────────────────────────┘</span></span></code></pre></div><hr><h2 id="💡-智能特性" tabindex="-1">💡 智能特性 <a class="header-anchor" href="#💡-智能特性" aria-label="Permalink to “💡 智能特性”">​</a></h2><h3 id="_1-上下文理解" tabindex="-1">1. 上下文理解 <a class="header-anchor" href="#_1-上下文理解" aria-label="Permalink to “1. 上下文理解”">​</a></h3><ul><li>AI记住对话状态</li><li>根据已收集信息提问</li><li>智能验证用户输入</li></ul><h3 id="_2-友好提示" tabindex="-1">2. 友好提示 <a class="header-anchor" href="#_2-友好提示" aria-label="Permalink to “2. 友好提示”">​</a></h3><ul><li>清晰的问题引导</li><li>输入格式说明</li><li>错误时的友好提示</li></ul><h3 id="_3-信息确认" tabindex="-1">3. 信息确认 <a class="header-anchor" href="#_3-信息确认" aria-label="Permalink to “3. 信息确认”">​</a></h3><ul><li>收集完成后展示汇总</li><li>让用户确认信息准确性</li><li>提供修改机会</li></ul><h3 id="_4-智能推荐" tabindex="-1">4. 智能推荐 <a class="header-anchor" href="#_4-智能推荐" aria-label="Permalink to “4. 智能推荐”">​</a></h3><ul><li>根据年龄、性别、方向推荐测评</li><li>个性化的评估建议</li><li>针对性的辅导方案</li></ul><hr><h2 id="🔄-对话状态管理" tabindex="-1">🔄 对话状态管理 <a class="header-anchor" href="#🔄-对话状态管理" aria-label="Permalink to “🔄 对话状态管理”">​</a></h2><h3 id="状态结构" tabindex="-1">状态结构 <a class="header-anchor" href="#状态结构" aria-label="Permalink to “状态结构”">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">conversationState </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;assessment&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;smart-assessment&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  step: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;age&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;gender&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;direction&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;problem&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  data: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;张小明&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    age: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">14</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    gender: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;男&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    direction: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;情绪稳定性&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    problem: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;...&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="状态流转" tabindex="-1">状态流转 <a class="header-anchor" href="#状态流转" aria-label="Permalink to “状态流转”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>null → 启动对话 → name → age → gender → direction/problem → complete → null</span></span></code></pre></div><hr><h2 id="📊-数据验证规则" tabindex="-1">📊 数据验证规则 <a class="header-anchor" href="#📊-数据验证规则" aria-label="Permalink to “📊 数据验证规则”">​</a></h2><h3 id="年龄验证" tabindex="-1">年龄验证 <a class="header-anchor" href="#年龄验证" aria-label="Permalink to “年龄验证”">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 必须是数字</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 范围：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">18岁</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 错误提示：</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;请输入有效的年龄（6-18岁之间的数字）&quot;</span></span></code></pre></div><h3 id="性别验证" tabindex="-1">性别验证 <a class="header-anchor" href="#性别验证" aria-label="Permalink to “性别验证”">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 必须包含</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;男&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">或</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;女&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 错误提示：</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;请输入&quot;男&quot;或&quot;女&quot;&#39;</span></span></code></pre></div><h3 id="描述验证-智能评估" tabindex="-1">描述验证（智能评估） <a class="header-anchor" href="#描述验证-智能评估" aria-label="Permalink to “描述验证（智能评估）”">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 最少10个字</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 错误提示：</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;请提供更详细的描述（至少10个字）&quot;</span></span></code></pre></div><hr><h2 id="🎯-使用示例" tabindex="-1">🎯 使用示例 <a class="header-anchor" href="#🎯-使用示例" aria-label="Permalink to “🎯 使用示例”">​</a></h2><h3 id="示例1-完整测评流程" tabindex="-1">示例1：完整测评流程 <a class="header-anchor" href="#示例1-完整测评流程" aria-label="Permalink to “示例1：完整测评流程”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户：我想测评</span></span>
<span class="line"><span>AI：好的！我来帮您进行心理测评。首先，请告诉我被测评人的姓名？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：王小华</span></span>
<span class="line"><span>AI：好的，王小华。请问年龄是多少？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：13</span></span>
<span class="line"><span>AI：明白了。请问性别是？（男/女）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：女</span></span>
<span class="line"><span>AI：好的。请问主要想测评哪个方向？</span></span>
<span class="line"><span>    • 情绪稳定性</span></span>
<span class="line"><span>    • 学习适应性</span></span>
<span class="line"><span>    • 社交能力</span></span>
<span class="line"><span>    • 综合测评</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：学习适应性</span></span>
<span class="line"><span>AI：非常好！我已经收集到以下信息：</span></span>
<span class="line"><span>    👤 姓名：王小华</span></span>
<span class="line"><span>    🎂 年龄：13岁</span></span>
<span class="line"><span>    ⚧ 性别：女</span></span>
<span class="line"><span>    🎯 测评方向：学习适应性</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    正在为您匹配合适的测评量表...</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [显示推荐测评列表]</span></span></code></pre></div><h3 id="示例2-输入错误处理" tabindex="-1">示例2：输入错误处理 <a class="header-anchor" href="#示例2-输入错误处理" aria-label="Permalink to “示例2：输入错误处理”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户：我想测评</span></span>
<span class="line"><span>AI：好的！我来帮您进行心理测评。首先，请告诉我被测评人的姓名？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：李明</span></span>
<span class="line"><span>AI：好的，李明。请问年龄是多少？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：二十岁</span></span>
<span class="line"><span>AI：抱歉，请输入有效的年龄（6-18岁之间的数字）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：16</span></span>
<span class="line"><span>AI：明白了。请问性别是？（男/女）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：不知道</span></span>
<span class="line"><span>AI：请输入&quot;男&quot;或&quot;女&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：男</span></span>
<span class="line"><span>AI：好的。请问主要想测评哪个方向？...</span></span></code></pre></div><h3 id="示例3-智能评估流程" tabindex="-1">示例3：智能评估流程 <a class="header-anchor" href="#示例3-智能评估流程" aria-label="Permalink to “示例3：智能评估流程”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>用户：智能评估</span></span>
<span class="line"><span>AI：好的！我来为您提供智能评估服务。首先，请告诉我学生的姓名？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：赵小刚</span></span>
<span class="line"><span>AI：好的，赵小刚。请问年龄是多少？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：14</span></span>
<span class="line"><span>AI：明白了。请问性别是？（男/女）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：男</span></span>
<span class="line"><span>AI：好的。请详细描述学生的心理问题或行为表现：</span></span>
<span class="line"><span>    • 具体的问题表现</span></span>
<span class="line"><span>    • 持续时间</span></span>
<span class="line"><span>    • 影响程度</span></span>
<span class="line"><span>    • 家庭背景（可选）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：最近两周上课注意力不集中，经常走神，作业完成质量下降，</span></span>
<span class="line"><span>      与同学发生过几次冲突，回家后情绪烦躁，父母关系紧张</span></span>
<span class="line"><span>AI：好的，我已经收集到以下信息：</span></span>
<span class="line"><span>    👤 姓名：赵小刚</span></span>
<span class="line"><span>    🎂 年龄：14岁</span></span>
<span class="line"><span>    ⚧ 性别：男</span></span>
<span class="line"><span>    📝 问题描述：最近两周上课注意力不集中...</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    正在生成智能评估报告...</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [显示完整评估报告]</span></span></code></pre></div><hr><h2 id="🚀-技术实现" tabindex="-1">🚀 技术实现 <a class="header-anchor" href="#🚀-技术实现" aria-label="Permalink to “🚀 技术实现”">​</a></h2><h3 id="核心方法" tabindex="-1">核心方法 <a class="header-anchor" href="#核心方法" aria-label="Permalink to “核心方法”">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 启动测评对话</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">startAssessmentConversation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 启动智能评估对话</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">startSmartAssessmentConversation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 处理对话流程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">handleConversationFlow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(message)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 处理测评流程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">handleAssessmentFlow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(message)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 处理智能评估流程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">handleSmartAssessmentFlow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(message)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 显示测评推荐</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">showAssessmentSummaryAndRecommend</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 生成智能评估</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generateSmartAssessment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><h3 id="状态管理" tabindex="-1">状态管理 <a class="header-anchor" href="#状态管理" aria-label="Permalink to “状态管理”">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.conversationState </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;assessment&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;smart-assessment&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  step: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;age&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;gender&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  data: { </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="✨-优势特点" tabindex="-1">✨ 优势特点 <a class="header-anchor" href="#✨-优势特点" aria-label="Permalink to “✨ 优势特点”">​</a></h2><ol><li><strong>自然对话</strong>：像真人一样逐步询问</li><li><strong>智能引导</strong>：清晰的问题和选项</li><li><strong>实时验证</strong>：即时反馈输入错误</li><li><strong>上下文记忆</strong>：记住所有对话内容</li><li><strong>个性化推荐</strong>：根据信息智能匹配</li><li><strong>完整报告</strong>：专业的评估建议</li></ol><hr><h2 id="🎉-总结" tabindex="-1">🎉 总结 <a class="header-anchor" href="#🎉-总结" aria-label="Permalink to “🎉 总结”">​</a></h2><p>智能对话功能让用户体验更自然、更流畅：</p><ul><li>✅ 无需填写表单，对话式收集信息</li><li>✅ AI主动引导，降低使用门槛</li><li>✅ 智能验证，确保数据准确</li><li>✅ 个性化推荐，提供专业建议</li><li>✅ 完整报告，可保存可导出</li></ul><p>让心理测评和评估变得简单、专业、高效！🚀</p>`,73)])])}const g=a(l,[["render",e]]);export{o as __pageData,g as default};
