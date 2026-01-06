// PM+ 完整会话流程引擎
const PM_FLOW = {
    // ==================== 第0阶段：预评估 ====================
    '0.1': {
        title: '预评估',
        messages: [
            '你好，我的名字是 <b>AI 心理咨询师</b>，我了解你遇到了一些困难，我或许可以帮助你。',
            '世界卫生组织开发了一个成熟的疏导项目 <b>PM+</b>，它会教你一些技能去更好地应对困难。',
            '在开始之前，你需要知道：<b>你在会面中告诉我的所有内容我都会保密</b>。我不能向任何人，包括你的家人，提及你在会面中谈到的任何事。',
            '<span class="text-danger">但是，如果你有伤害自己或他人的倾向时，我必须及时进行干预。</span>',
            '<b>问：关于保密条款，你还有疑问吗？</b>'
        ],
        actions: [{ text: '没有疑问，我同意开始', type: 'primary', next: '0.2' }]
    },
    '0.2': {
        title: '预评估',
        messages: ['下面是一份有关你和你感受的问卷 <b>(PSYCHLOPS)</b>。', '<b>问题 1</b>：请选出一个近一周<b>最困扰你</b>的问题。'],
        options: { type: 'single', source: 'problemOptions', key: 'Q1' },
        onSelect: (v, text) => { PM_DATA.state.psychlops.pre.Q1_Text = text; renderStep('0.2b'); }
    },
    '0.2b': {
        title: '预评估',
        messages: () => [`在过去的一周里，<b>"${PM_DATA.state.psychlops.pre.Q1_Text}"</b> 对你有多大影响？`],
        likert: { min: 0, max: 5, minLabel: '完全不受影响', maxLabel: '严重影响' },
        onScore: s => { PM_DATA.state.psychlops.pre.Q1_Score = s; renderStep('0.3'); }
    },
    '0.3': {
        title: '预评估',
        messages: ['<b>问题 2</b>：请选出<b>另一个</b>困扰你的问题。（可跳过）'],
        options: { type: 'single', source: 'problemOptions', key: 'Q2', excludeKey: 'Q1' },
        actions: [{ text: '跳过此问题', type: 'secondary', next: '0.4' }],
        onSelect: (v, text) => { PM_DATA.state.psychlops.pre.Q2_Text = text; renderStep('0.3b'); }
    },
    '0.3b': {
        title: '预评估',
        messages: () => [`在过去的一周里，<b>"${PM_DATA.state.psychlops.pre.Q2_Text}"</b> 对你有多大影响？`],
        likert: { min: 0, max: 5, minLabel: '完全不受影响', maxLabel: '严重影响' },
        onScore: s => { PM_DATA.state.psychlops.pre.Q2_Score = s; renderStep('0.4'); }
    },
    '0.4': {
        title: '预评估',
        messages: ['<b>问题 3</b>：请选出一个受你的问题影响而变得<b>难以进行</b>的事情。'],
        options: { type: 'single', source: 'functionOptions', key: 'Q3' },
        onSelect: (v, text) => { PM_DATA.state.psychlops.pre.Q3_Text = text; renderStep('0.4b'); }
    },
    '0.4b': {
        title: '预评估',
        messages: () => [`在过去的一周里，做<b>"${PM_DATA.state.psychlops.pre.Q3_Text}"</b>有多困难？`],
        likert: { min: 0, max: 5, minLabel: '一点也不难', maxLabel: '非常困难' },
        onScore: s => { PM_DATA.state.psychlops.pre.Q3_Score = s; renderStep('0.5'); }
    },
    '0.5': {
        title: '预评估',
        messages: ['<b>问题 4</b>：总体来说，你上周的感觉如何？'],
        likert: { min: 0, max: 5, minLabel: '非常好', maxLabel: '非常差' },
        onScore: s => { 
            PM_DATA.state.psychlops.pre.Q4_Score = s;
            if (s >= 4) { triggerCrisisProtocol(); } 
            else { renderStep('0.6'); }
        }
    },
    '0.6': {
        title: '预评估',
        messages: () => [
            '感谢你的诚实反馈！',
            `<div class="result-card"><p class="result-label">你的 PSYCHLOPS 基准分数</p><p class="result-value">${calculatePsychlopsScore(PM_DATA.state.psychlops.pre)}</p><p class="result-hint">满分 20 分，分数越高表示困扰越大</p></div>`,
            '在未来 5 周里，我将教你<b>四种核心策略</b>：<br>• 压力管理<br>• 问题管理<br>• 行为激活<br>• 加强社会支持',
            '只要你坚持完成所有会面，你的心理韧性将显著提升！'
        ],
        actions: [{ text: '开始第一周：压力管理', type: 'primary', next: '1.0' }]
    },

    // ==================== 第1周：心理教育与压力管理 ====================
    '1.0': {
        title: '第1周',
        messages: () => [
            '欢迎进入 <b>第一周：心理教育与压力管理</b>！',
            'PM+ 是一项简短的疏导，它可以帮助你管理情绪问题，比如绝望、恐惧或悲伤；也可以帮你处理实际问题。',
            '在接下来的 5 次会面中，我将教你四种策略。我们会有时间练习，也建议你在两次会面之间自行练习。',
            `这样你就可以开始减轻并管理那些困扰，例如 <b>${PM_DATA.state.psychlops.pre.Q1_Text}</b>。`
        ],
        actions: [{ text: '我明白了，继续', type: 'primary', next: '1.1' }]
    },
    '1.1': {
        title: '第1周',
        messages: () => [
            '现在，我想问一下你，当你遇到这些困扰时，你的<b>身体和情绪</b>有什么反应？',
            '比如：心跳加快、呼吸急促、手心出汗、紧张、恐惧、无助等...'
        ],
        options: { type: 'multi', items: [
            { id: 'heart_fast', text: '心跳加快', icon: 'fa-heart-pulse' },
            { id: 'breath_fast', text: '呼吸急促', icon: 'fa-lungs' },
            { id: 'tense', text: '身体紧张', icon: 'fa-person' },
            { id: 'sweat', text: '手心出汗', icon: 'fa-hand' },
            { id: 'fear', text: '感到恐惧', icon: 'fa-face-grimace' },
            { id: 'helpless', text: '感到无助', icon: 'fa-face-sad-tear' }
        ]},
        actions: [{ text: '确认选择', type: 'primary', next: '1.2' }],
        onConfirm: (selected) => {
            PM_DATA.state.bodyReactions = selected;
        }
    },
    '1.2': {
        title: '第1周',
        messages: () => {
            const reactions = PM_DATA.state.bodyReactions.map(r => {
                const item = PM_FLOW['1.1'].options.items.find(i => i.id === r);
                return item ? item.text : '';
            }).filter(Boolean).join('、');
            return [
                `你提到了 <b>${reactions || '一些反应'}</b>，这些都是很常见的。`,
                '当人们经历压力事件时，大多数人都会体会到类似的情绪和身体反应，比如恐惧、哀伤或紧张。',
                '这些反应是为了让我们在危险情况下存活。当我们认为自己处于危险中时，身体就会变得警觉。',
                '对很多人来说，这些反应会随着时间慢慢消失。但如果持续存在，就可能影响日常生活。',
                '<b>你不用为这些经历而自责</b>——能从这些挑战中坚持下来，已经证明了你的了不起。'
            ];
        },
        actions: [{ text: '继续学习压力管理', type: 'primary', next: '1.3' }]
    },
    '1.3': {
        title: '第1周',
        messages: () => [
            '现在我要教你一个重要的策略：<b>呼吸训练</b>。',
            '当我们感到压力时，呼吸会变得短促和快速。这会导致紧张、心跳加快等不舒服的感觉。',
            '放慢呼吸能够有效缓解这些紧张的感觉。这些感觉就像弹簧，我们要帮助它逐渐放松。',
            '<b>问：我将教你如何以一种放松身心的方式呼吸。可以吗？</b>'
        ],
        actions: [{ text: '好的，开始练习', type: 'primary', next: '1.4' }]
    },
    '1.4': {
        title: '第1周',
        messages: ['在开始之前，请动一动你的肩膀，让身体放松。向后转动肩膀，轻轻地将头转向两侧。', '现在让我们正式开始 <b>2 分钟的引导呼吸练习</b>。'],
        breathing: { duration: 120 },
        actions: [{ text: '完成练习', type: 'primary', next: '1.5' }]
    },
    '1.5': {
        title: '第1周',
        messages: ['练习后感觉如何？', '<b>问：尝试用更慢的节奏呼吸会困难吗？</b>'],
        options: { type: 'single', items: [
            { id: 'easy', text: '不会，感觉很放松', icon: 'fa-face-smile' },
            { id: 'hard', text: '会，有点困难', icon: 'fa-face-meh' }
        ]},
        onSelect: v => { v === 'easy' ? renderStep('1.7') : renderStep('1.6'); }
    },
    '1.6': {
        title: '第1周',
        messages: ['没关系，初期这是很正常的。你是遇到了下面哪种情况？'],
        options: { type: 'single', source: 'breathingDifficulties' },
        onSelect: (v, text) => {
            const diff = PM_DATA.breathingDifficulties.find(d => d.id === v);
            PM_DATA.state.breathingDifficulty = v;
            addBubble('ai', diff ? diff.solution : '继续练习，慢慢就会好起来。');
            setTimeout(() => renderStep('1.7'), 2000);
        }
    },
    '1.7': {
        title: '第1周',
        messages: () => [
            '太棒了！你完成了第一周的核心课程！🎉',
            '<div class="achievement-card"><div class="achievement-icon">🏆</div><h4>获得成就：宁静初探</h4><p>完成首次呼吸训练</p></div>',
            '我们本次的会谈也将接近尾声。每次会谈结束我都会留一到两个小作业。',
            '<b>本周作业</b>：每天进行 <b>10-20 分钟</b>的呼吸练习。',
            '下周我们将学习如何<b>拆解和管理具体问题</b>。'
        ],
        actions: [{ text: '完成第一周', type: 'primary', next: 'week1_complete' }]
    },

    // ==================== 第2周：问题管理 ====================
    // 周期评估 - Q1回顾
    '2.0': {
        title: '第2周',
        messages: () => [
            '欢迎回来！在开始本周内容之前，我们先做一个简短的评估。',
            `上次你说最困扰你的问题是：<b>"${PM_DATA.state.psychlops.pre.Q1_Text}"</b>`,
            '<b>问：过去一周里，这个问题对你的影响有多大？</b>'
        ],
        likert: { min: 0, max: 5, minLabel: '完全不受影响', maxLabel: '严重影响' },
        onScore: s => { 
            if (!PM_DATA.state.psychlops.weekly) PM_DATA.state.psychlops.weekly = [];
            PM_DATA.state.psychlops.weekly[1] = { Q1_Score: s };
            renderStep(PM_DATA.state.psychlops.pre.Q2_Text ? '2.0b' : '2.0c'); 
        }
    },
    '2.0b': {
        title: '第2周',
        messages: () => [
            `另一个困扰你的问题是：<b>"${PM_DATA.state.psychlops.pre.Q2_Text}"</b>`,
            '<b>问：过去一周里，这个问题对你的影响有多大？</b>'
        ],
        likert: { min: 0, max: 5, minLabel: '完全不受影响', maxLabel: '严重影响' },
        onScore: s => { PM_DATA.state.psychlops.weekly[1].Q2_Score = s; renderStep('2.0c'); }
    },
    '2.0c': {
        title: '第2周',
        messages: () => [
            `你之前说受问题影响难以进行的事情是：<b>"${PM_DATA.state.psychlops.pre.Q3_Text}"</b>`,
            '<b>问：上周做这件事有多困难？</b>'
        ],
        likert: { min: 0, max: 5, minLabel: '一点也不难', maxLabel: '非常困难' },
        onScore: s => { PM_DATA.state.psychlops.weekly[1].Q3_Score = s; renderStep('2.0d'); }
    },
    '2.0d': {
        title: '第2周',
        messages: ['上周的呼吸训练，你有试着练习吗？'],
        options: { type: 'single', items: [
            { id: 'good', text: '坚持练习了，感觉不错', icon: 'fa-check' },
            { id: 'some', text: '练习了一些，效果一般', icon: 'fa-minus' },
            { id: 'none', text: '没怎么练习', icon: 'fa-times' }
        ]},
        onSelect: v => {
            const responses = {
                good: '太棒了！坚持练习真的很不容易，你做得很好！',
                some: '能够尝试就是很大的进步！慢慢来，不要给自己太大压力。',
                none: '没关系，有时候生活确实很忙。这周我们会学习新的技能，别忘了继续练习呼吸哦。'
            };
            addBubble('ai', responses[v]);
            setTimeout(() => renderStep('2.1'), 1500);
        }
    },
    '2.1': {
        title: '第2周',
        messages: ['今天我们将学习 <b>问题管理策略</b>。', '首先，让我们把困扰你的问题都列出来。请选择所有适用的问题：'],
        options: { type: 'multi', source: 'problemOptions' },
        actions: [{ text: '确认选择', type: 'primary', next: '2.2' }],
        onConfirm: selected => { PM_DATA.state.problems = selected; }
    },
    '2.2': {
        title: '第2周',
        messages: [
            '接下来我们进行一个<b>"问题分类"小游戏</b>。',
            '<div class="classify-hint"><div class="hint-box solvable">✓ 可解决的问题<br><small>我有能力做些什么让情况变好</small></div><div class="hint-box unsolvable">❌ 不可解决的问题<br><small>完全取决于他人/环境</small></div></div>',
            '请将你选择的问题<b>拖拽分类</b>到对应区域：'
        ],
        dragClassify: true,  // 启用拖拽分类功能
        actions: [{ text: '完成分类', type: 'primary', next: '2.2b' }]
    },
    '2.2b': {
        title: '第2周',
        messages: () => {
            const solvable = PM_DATA.state.solvableProblems || [];
            return [
                `很好！你识别出了 <b>${solvable.length}</b> 个可解决的问题。`,
                '我们的精力应该集中在<b>可解决的问题</b>上。',
                '现在请选择一个你认为<b>比较容易解决</b>的问题，我们一次解决一个：'
            ];
        },
        options: { type: 'single', source: 'solvableProblems' },
        onSelect: (v, text) => { PM_DATA.state.currentProblem = { id: v, text }; renderStep('2.3'); }
    },
    '2.3': {
        title: '第2周',
        messages: () => [
            `好的，你选择了处理 <b>"${PM_DATA.state.currentProblem.text}"</b>。`,
            '<b>问：请用 1-2 句话描述这个问题的具体情况。</b>'
        ],
        voiceInput: { placeholder: '点击录音或输入文字描述...', key: 'problemDescription' },
        actions: [{ text: '继续', type: 'primary', next: '2.3b' }]
    },
    '2.3b': {
        title: '第2周',
        messages: [
            '我们解决问题的出发点是确定哪些部分是<b>实际可操作</b>的。',
            '<b>问：在这个问题中，你可以控制或影响的是哪些点？</b>'
        ],
        options: { type: 'multi', items: [
            { id: 'method', text: '改进方法/策略', icon: 'fa-lightbulb' },
            { id: 'time', text: '时间管理/规划', icon: 'fa-clock' },
            { id: 'attitude', text: '调整心态/态度', icon: 'fa-heart' },
            { id: 'help', text: '寻求帮助/资源', icon: 'fa-hands-helping' },
            { id: 'habit', text: '改变习惯/行为', icon: 'fa-rotate' }
        ]},
        actions: [{ text: '开始头脑风暴', type: 'primary', next: '2.4' }],
        onConfirm: selected => { PM_DATA.state.controllableFactors = selected; }
    },
    '2.4': {
        title: '第2周',
        messages: ['现在让我们进行<b>头脑风暴</b>！', '关于这个问题，有什么办法可以解决或缓解呢？', '想想你自己能做的，或者有什么是其他人能帮你做的。'],
        options: { type: 'multi', items: [
            { id: 's1', text: '制定学习/生活计划表', icon: 'fa-calendar-check', category: 'self' },
            { id: 's2', text: '向老师/长辈请教方法', icon: 'fa-chalkboard-teacher', category: 'help' },
            { id: 's3', text: '和父母/朋友沟通', icon: 'fa-comments', category: 'help' },
            { id: 's4', text: '每天固定时间处理', icon: 'fa-clock', category: 'self' },
            { id: 's5', text: '找同学/朋友一起', icon: 'fa-users', category: 'help' },
            { id: 's6', text: '拆分成小任务', icon: 'fa-list-check', category: 'self' }
        ]},
        actions: [{ text: '开始验证方案', type: 'primary', next: '2.5_verify' }],
        onConfirm: selected => { 
            PM_DATA.state.solutions = selected; 
            PM_DATA.state.verifyIndex = 0;
            PM_DATA.state.verifiedSolutions = [];
        }
    },
    // 方案验证流程 - 逐个验证
    '2.5_verify': {
        title: '第2周',
        messages: () => {
            const solutions = PM_DATA.state.solutions || [];
            const idx = PM_DATA.state.verifyIndex || 0;
            if (idx >= solutions.length) return ['所有方案验证完成！'];
            const solutionItems = PM_FLOW['2.4'].options.items;
            const current = solutionItems.find(s => s.id === solutions[idx]);
            return [
                `<div class="verify-card"><span class="verify-num">${idx + 1}/${solutions.length}</span><h4>${current ? current.text : solutions[idx]}</h4></div>`,
                '<b>① 这个办法能帮助到你吗？</b>'
            ];
        },
        options: { type: 'single', items: [
            { id: 'helpful', text: '很有帮助', icon: 'fa-thumbs-up' },
            { id: 'some', text: '有点帮助', icon: 'fa-hand' },
            { id: 'no', text: '没有帮助', icon: 'fa-thumbs-down' }
        ]},
        onSelect: v => {
            if (v === 'no') {
                PM_DATA.state.verifyIndex++;
                renderStep(PM_DATA.state.verifyIndex >= PM_DATA.state.solutions.length ? '2.5_done' : '2.5_verify');
            } else {
                PM_DATA.state.currentVerifyHelpful = v;
                renderStep('2.5_verify_b');
            }
        }
    },
    '2.5_verify_b': {
        title: '第2周',
        messages: ['<b>② 这个办法会伤害到人吗？</b>（包括你自己或他人）'],
        options: { type: 'single', items: [
            { id: 'no', text: '不会', icon: 'fa-check' },
            { id: 'yes', text: '会', icon: 'fa-times' }
        ]},
        onSelect: v => {
            if (v === 'yes') {
                PM_DATA.state.verifyIndex++;
                renderStep(PM_DATA.state.verifyIndex >= PM_DATA.state.solutions.length ? '2.5_done' : '2.5_verify');
            } else {
                renderStep('2.5_verify_c');
            }
        }
    },
    '2.5_verify_c': {
        title: '第2周',
        messages: ['<b>③ 你能做到这个办法吗？</b>'],
        options: { type: 'single', items: [
            { id: 'can', text: '能做到', icon: 'fa-check-double' },
            { id: 'hard', text: '有点难', icon: 'fa-question' },
            { id: 'cannot', text: '做不到', icon: 'fa-times' }
        ]},
        onSelect: v => {
            const solutions = PM_DATA.state.solutions;
            const idx = PM_DATA.state.verifyIndex;
            if (v === 'cannot') {
                PM_DATA.state.verifyIndex++;
            } else {
                const solutionItems = PM_FLOW['2.4'].options.items;
                const current = solutionItems.find(s => s.id === solutions[idx]);
                PM_DATA.state.verifiedSolutions.push({
                    id: solutions[idx],
                    text: current ? current.text : solutions[idx],
                    difficulty: v
                });
                PM_DATA.state.verifyIndex++;
            }
            renderStep(PM_DATA.state.verifyIndex >= solutions.length ? '2.5_done' : '2.5_verify');
        }
    },
    '2.5_done': {
        title: '第2周',
        messages: () => {
            const verified = PM_DATA.state.verifiedSolutions || [];
            if (verified.length === 0) {
                return [
                    '暂时没有找到适合的办法呀~',
                    '可能是这些办法有点难... 我们有两个选择：'
                ];
            }
            return [
                `太棒了！你一共筛选出 <b>${verified.length}</b> 个"有帮助、无坏处、能做到"的方案！`,
                '<div class="solution-list">' + verified.map(s => `<span class="solution-tag">✓ ${s.text}</span>`).join('') + '</div>',
                '请选择你想<b>首先尝试</b>的方案：'
            ];
        },
        options: { type: 'single', source: 'verifiedSolutions' },
        fallbackActions: [
            { text: '换个问题试试', type: 'secondary', next: '2.2b' },
            { text: '再想想办法', type: 'primary', next: '2.4' }
        ],
        onSelect: (v, text) => { PM_DATA.state.selectedSolutions = [{ id: v, text }]; renderStep('2.6'); }
    },
    '2.6': {
        title: '第2周',
        messages: () => [
            `你选择了 <b>"${PM_DATA.state.selectedSolutions[0].text}"</b>。`,
            '现在让我们制定具体的<b>行动计划</b>：',
            '<div class="plan-card"><h4>📋 行动计划</h4><p><b>目标</b>：' + PM_DATA.state.selectedSolutions[0].text + '</p><p><b>开始时间</b>：明天</p><p><b>提醒方式</b>：手机闹钟</p></div>',
            '<b>问：做这个计划需要有人提供什么帮助吗？</b>'
        ],
        options: { type: 'single', items: [
            { id: 'self', text: '不需要，我自己可以', icon: 'fa-user' },
            { id: 'help', text: '需要家人/朋友帮助', icon: 'fa-users' }
        ]},
        onSelect: v => renderStep('2.7')
    },
    '2.7': {
        title: '第2周',
        messages: [
            '你的行动计划保存好啦！自己要记住哦~',
            '<div class="achievement-card"><div class="achievement-icon">🎯</div><h4>获得成就：问题猎手</h4><p>完成首个行动计划</p></div>',
            '<b>本周作业</b>：执行你的行动计划，并记录遇到的情况。'
        ],
        actions: [{ text: '完成第二周', type: 'primary', next: 'week2_complete' }]
    },

    // ==================== 第3周：行为激活 ====================
    // 周期评估
    '3.0': {
        title: '第3周',
        messages: () => [
            '欢迎回来！在开始本周内容之前，让我们先做个评估。',
            `上次你说最困扰你的问题是：<b>"${PM_DATA.state.psychlops.pre.Q1_Text}"</b>`,
            '<b>问：过去一周里，这个问题对你的影响有多大？</b>'
        ],
        likert: { min: 0, max: 5, minLabel: '完全不受影响', maxLabel: '严重影响' },
        onScore: s => { 
            if (!PM_DATA.state.psychlops.weekly[2]) PM_DATA.state.psychlops.weekly[2] = {};
            PM_DATA.state.psychlops.weekly[2].Q1_Score = s;
            renderStep('3.0b'); 
        }
    },
    '3.0b': {
        title: '第3周',
        messages: ['<b>问：你整体感觉怎么样？</b>'],
        likert: { min: 0, max: 5, minLabel: '非常好', maxLabel: '非常差' },
        onScore: s => { 
            PM_DATA.state.psychlops.weekly[2].Q4_Score = s;
            if (s >= 4) { triggerCrisisProtocol(); }
            else { renderStep('3.0c'); }
        }
    },
    '3.0c': {
        title: '第3周',
        messages: () => [
            '现在让我们回顾一下上周的问题管理计划执行情况。',
            `上周你制定的计划是：<b>"${PM_DATA.state.selectedSolutions?.[0]?.text || '执行行动计划'}"</b>`,
            '<b>问：请问你的完成情况如何？</b>'
        ],
        options: { type: 'single', items: [
            { id: 'done', text: '完成了整个计划', icon: 'fa-check-double' },
            { id: 'partial', text: '完成了部分计划', icon: 'fa-check' },
            { id: 'none', text: '没有完成', icon: 'fa-times' }
        ]},
        onSelect: v => {
            PM_DATA.state.week3Review = { completion: v };
            renderStep(v === 'none' ? '3.0d_none' : '3.0d_done');
        }
    },
    // 分支：没完成
    '3.0d_none': {
        title: '第3周',
        messages: [
            '制定计划本身就需要花心思，你已经完成了超重要的一步！暂时没开始执行特别正常。',
            '<b>问：是什么让你暂时没启动这个计划呀？咱们一起想办法克服。</b>'
        ],
        voiceInput: { placeholder: '说说遇到的困难...', key: 'week3Obstacle' },
        actions: [{ text: '继续学习行为激活', type: 'primary', next: '3.1' }]
    },
    // 分支：完成了
    '3.0d_done': {
        title: '第3周',
        messages: [
            '你也太厉害啦！不管是把计划全做完，还是只完成了一部分，都付出了实实在在的努力，真为你开心。',
            '<b>问：你做完这些之后，自己感觉怎么样？之前的问题有没有稍微放松一点？</b>'
        ],
        voiceInput: { placeholder: '分享你的感受...', key: 'week3Feeling' },
        actions: [{ text: '继续', type: 'primary', next: '3.0e' }]
    },
    '3.0e': {
        title: '第3周',
        messages: ['<b>问：你觉得这次的计划有没有帮到这个问题？</b>'],
        options: { type: 'single', items: [
            { id: 'yes', text: '有帮助', icon: 'fa-thumbs-up' },
            { id: 'no', text: '没有帮助', icon: 'fa-thumbs-down' }
        ]},
        onSelect: v => {
            PM_DATA.state.week3Review.helpful = v === 'yes';
            renderStep('3.0f');
        }
    },
    '3.0f': {
        title: '第3周',
        messages: () => [
            PM_DATA.state.week3Review.helpful 
                ? '太为你开心啦！这个计划真的帮到你了。' 
                : '谢谢你愿意坦诚告诉我实际效果。',
            '<b>问：结合这次计划执行后的效果，咱们需要再重新回顾问题管理吗？</b>'
        ],
        options: { type: 'single', items: [
            { id: 'yes', text: '需要，想重新梳理', icon: 'fa-rotate' },
            { id: 'no', text: '不需要，继续学习', icon: 'fa-arrow-right' }
        ]},
        onSelect: v => renderStep(v === 'yes' ? '2.2b' : '3.1')
    },
    '3.1': {
        title: '第3周',
        messages: [
            '面对压力的人，通常会减少活动，形成<b>"不活动的恶性循环"</b>。',
            '这种循环会让你困于情绪低落中。但好消息是：<b>只有积极活动才会让人感觉精力充沛</b>。',
            '对许多人来说，最难的是开始行动。但我可以向你保证，很多人发现，一旦开始活动，就会更容易继续做下去。'
        ],
        actions: [{ text: '继续', type: 'primary', next: '3.2' }]
    },
    '3.2': {
        title: '第3周',
        messages: ['请回想一下，在那些你还没感到心情低落前会做的事情中，哪些活动曾让你感到<b>愉快</b>？', '你可以从下面选择至少一项：'],
        options: { type: 'multi', items: [
            { id: 'friends', text: '拜访朋友或家人', icon: 'fa-users' },
            { id: 'music', text: '听音乐/看电影', icon: 'fa-music' },
            { id: 'sports', text: '运动/散步', icon: 'fa-person-running' },
            { id: 'read', text: '阅读/画画', icon: 'fa-book' },
            { id: 'cook', text: '做好吃的', icon: 'fa-utensils' },
            { id: 'game', text: '玩游戏', icon: 'fa-gamepad' }
        ]},
        actions: [{ text: '确认选择', type: 'primary', next: '3.3' }],
        onConfirm: selected => { PM_DATA.state.activities = selected; }
    },
    '3.3': {
        title: '第3周',
        messages: ['再选择一项<b>任务型活动</b>：'],
        options: { type: 'single', items: [
            { id: 'clean', text: '整理房间', icon: 'fa-broom' },
            { id: 'homework', text: '完成一项作业', icon: 'fa-pencil' },
            { id: 'skill', text: '学习新技能', icon: 'fa-lightbulb' }
        ]},
        onSelect: (v, text) => {
            PM_DATA.state.activities.push(v);
            PM_DATA.state.activityPlan = { task: v, taskText: text };
            renderStep('3.4');
        }
    },
    '3.4': {
        title: '第3周',
        messages: () => [
            `我们来把 <b>"${PM_DATA.state.activityPlan.taskText}"</b> 拆分成小步骤：`,
            '<div class="steps-card"><p>1️⃣ 准备开始（找到需要的东西）</p><p>2️⃣ 完成第一个小部分</p><p>3️⃣ 休息一下</p><p>4️⃣ 继续完成剩余部分</p></div>',
            '每个小步骤都很容易完成，这样你不会被任务压得喘不过气。',
            '你想选<b>什么时候</b>开始？'
        ],
        options: { type: 'single', items: [
            { id: 'tomorrow_am', text: '明天上午', icon: 'fa-sun' },
            { id: 'tomorrow_pm', text: '明天下午', icon: 'fa-cloud-sun' },
            { id: 'weekend', text: '周末', icon: 'fa-calendar-week' }
        ]},
        onSelect: v => { PM_DATA.state.activityPlan.time = v; renderStep('3.5'); }
    },
    '3.5': {
        title: '第3周',
        messages: [
            '你的行动计划已经保存好啦！',
            '<div class="achievement-card"><div class="achievement-icon">🌟</div><h4>获得成就：行动派</h4><p>制定首个行为激活计划</p></div>',
            '<b>本周作业</b>：完成你选择的活动，并记录感受。'
        ],
        actions: [{ text: '完成第三周', type: 'primary', next: 'week3_complete' }]
    },
    // ==================== 第4周：社会支持 ====================
    // 周期评估
    '4.0': {
        title: '第4周',
        messages: () => [
            '欢迎回来！让我们先做个评估。',
            `"${PM_DATA.state.psychlops.pre.Q1_Text}"这个问题，过去一周对你的影响有多大？`
        ],
        likert: { min: 0, max: 5, minLabel: '完全不受影响', maxLabel: '严重影响' },
        onScore: s => { 
            if (!PM_DATA.state.psychlops.weekly[3]) PM_DATA.state.psychlops.weekly[3] = {};
            PM_DATA.state.psychlops.weekly[3].Q1_Score = s;
            renderStep('4.0b'); 
        }
    },
    '4.0b': {
        title: '第4周',
        messages: () => [
            '现在让我们回顾一下上周的行为激活计划。',
            `上周你选择的活动是：<b>"${PM_DATA.state.activityPlan?.taskText || '你选择的活动'}"</b>`,
            '<b>问：请问你的完成情况如何？</b>'
        ],
        options: { type: 'single', items: [
            { id: 'done', text: '完成了', icon: 'fa-check' },
            { id: 'partial', text: '做了一部分', icon: 'fa-minus' },
            { id: 'none', text: '没有完成', icon: 'fa-times' }
        ]},
        onSelect: v => {
            PM_DATA.state.week4ReviewActivity = v;
            if (v === 'none') {
                addBubble('ai', '没关系，这周我们会学习新的策略。完成活动后心情会变得更好，下周继续尝试吧！');
            } else {
                addBubble('ai', '太棒了！能够开始行动已经很不容易了。你有没有感觉到完成活动后心情变好了？');
            }
            setTimeout(() => renderStep('4.0c'), 1500);
        }
    },
    '4.0c': {
        title: '第4周',
        messages: [
            '社会支持对不同的人有不同的意义：',
            '• 与信任的人<b>分享困难和感受</b>',
            '• 向信任的人<b>寻求资源和帮助</b>',
            '• 与社区组织或机构<b>建立联系</b>'
        ],
        actions: [{ text: '继续', type: 'primary', next: '4.1' }]
    },
    '4.1': {
        title: '第4周',
        messages: [
            '很多人在与他人谈论自己的问题时会感到不安，担心给对方带来负担。',
            '但事实通常并非如此——倾听他人的困难也可能帮助对方对自己遇到的问题有所了解。',
            '<b>问：你认为你有可以信任的人吗？</b>'
        ],
        options: { type: 'single', items: [
            { id: 'yes', text: '有', icon: 'fa-check' },
            { id: 'no', text: '没有/不确定', icon: 'fa-question' }
        ]},
        onSelect: v => {
            PM_DATA.state.socialSupport.hasTrustedPerson = v === 'yes';
            renderStep(v === 'yes' ? '4.2' : '4.1b');
        }
    },
    '4.1b': {
        title: '第4周',
        messages: [
            '如果你不确定某人是否值得信任，可以：',
            '<div class="tip-card">💡 先告诉他一个不太重要的事情，看看会不会被说出去。这样就可以知道他是不是值得你信任的人。</div>',
            '想想身边的人：好朋友、老师、家人...',
            '有没有想到某个可能可以信任的人？'
        ],
        actions: [{ text: '我想到了一个人', type: 'primary', next: '4.2' }]
    },
    '4.2': {
        title: '第4周',
        messages: ['你打算如何<b>加强与这个人的联系</b>？'],
        options: { type: 'single', items: [
            { id: 'call', text: '打电话/发消息聊聊', icon: 'fa-phone' },
            { id: 'meet', text: '约出来见面', icon: 'fa-user-group' },
            { id: 'activity', text: '一起做某件事', icon: 'fa-people-group' }
        ]},
        onSelect: (v, text) => { PM_DATA.state.socialSupport.plan = { action: v, actionText: text }; renderStep('4.3'); }
    },
    '4.3': {
        title: '第4周',
        messages: ['你打算<b>什么时候</b>做这件事？'],
        options: { type: 'single', items: [
            { id: 'today', text: '今天', icon: 'fa-bolt' },
            { id: 'tomorrow', text: '明天', icon: 'fa-calendar-day' },
            { id: 'weekend', text: '这周末', icon: 'fa-calendar-week' }
        ]},
        onSelect: v => { PM_DATA.state.socialSupport.plan.time = v; renderStep('4.4'); }
    },
    '4.4': {
        title: '第4周',
        messages: [
            '你的社会支持计划已保存！',
            '<div class="achievement-card"><div class="achievement-icon">💫</div><h4>获得成就：连接者</h4><p>制定首个社会支持计划</p></div>',
            '<b>本周作业</b>：执行你的社会支持计划，并分享感受。'
        ],
        actions: [{ text: '完成第四周', type: 'primary', next: 'week4_complete' }]
    },

    // ==================== 第5周：保持健康 ====================
    '5.0': {
        title: '第5周',
        messages: [
            '恭喜你进入 <b>第五周：保持健康与结束</b>！',
            '首先，我想祝贺你成功到达这个阶段。你展现出了很大的<b>勇气和努力</b>来讨论困难的话题，并直面这些问题。',
            '<b>问：这是最后一次会面了，你感觉如何呢？</b>'
        ],
        options: { type: 'single', items: [
            { id: 'better', text: '比开始时好多了', icon: 'fa-face-smile' },
            { id: 'same', text: '差不多', icon: 'fa-face-meh' },
            { id: 'learned', text: '学到了很多', icon: 'fa-graduation-cap' }
        ]},
        onSelect: v => renderStep('5.1')
    },
    '5.1': {
        title: '第5周',
        messages: [
            '自 PM+ 开始以来，你认为<b>哪些方面有所改善</b>？',
        ],
        options: { type: 'multi', items: [
            { id: 'emotion', text: '情绪管理能力', icon: 'fa-heart' },
            { id: 'problem', text: '问题解决能力', icon: 'fa-lightbulb' },
            { id: 'activity', text: '活动参与度', icon: 'fa-person-running' },
            { id: 'social', text: '社交关系', icon: 'fa-users' },
            { id: 'stress', text: '压力应对', icon: 'fa-wind' }
        ]},
        actions: [{ text: '继续', type: 'primary', next: '5.2' }]
    },
    '5.2': {
        title: '第5周',
        messages: [
            'PM+ 类似于学习一种新语言，需要持续练习才能熟练掌握。',
            '只要你尽可能多地练习这些策略，你就更容易保持健康。',
            '<b>这项疏导并不神奇。你已经学会了 PM+，并可以将其应用到自己的生活中。</b>',
            '现在，<b>你就是自己的帮助者</b>了！'
        ],
        actions: [{ text: '进入巩固练习', type: 'primary', next: '5.2b' }]
    },
    // 巩固练习：想象如何助人
    '5.2b': {
        title: '第5周',
        messages: [
            '现在让我们做一个巩固练习：<b>想象如何助人</b>。',
            '你了解所有的 PM+ 策略，现在你可以感到信心十足了！',
            '<div class="case-card"><h4>👤 案例：小明</h4><p>小明是一名高中生，最近因为学业压力很大感到非常焦虑。他不再与朋友见面，大多数时候都待在房间里。</p><p>他感到非常孤独，不知道如何帮助自己。</p></div>',
            '<b>问：根据你学过的策略，你能否给小明一些建议？</b>'
        ],
        options: { type: 'multi', items: [
            { id: 'breathing', text: '建议他练习呼吸训练', icon: 'fa-wind' },
            { id: 'problem', text: '帮他分析问题，找可解决的部分', icon: 'fa-lightbulb' },
            { id: 'activity', text: '建议他增加活动量', icon: 'fa-person-running' },
            { id: 'social', text: '建议他找信任的人聊聊', icon: 'fa-users' }
        ]},
        actions: [{ text: '提交建议', type: 'primary', next: '5.2c' }],
        onConfirm: selected => { PM_DATA.state.helpAdvice = selected; }
    },
    '5.2c': {
        title: '第5周',
        messages: () => {
            const advice = PM_DATA.state.helpAdvice || [];
            const feedbackParts = [];
            if (advice.includes('breathing')) feedbackParts.push('呼吸训练可以帮助他缓解焦虑感');
            if (advice.includes('problem')) feedbackParts.push('分析问题可以让他找到行动方向');
            if (advice.includes('activity')) feedbackParts.push('增加活动量可以打破不活动的恶性循环');
            if (advice.includes('social')) feedbackParts.push('他确实需要加强社会支持');
            return [
                '<div class="feedback-card">✨ 太棒了！你的建议非常好！</div>',
                feedbackParts.length > 0 ? feedbackParts.join('，') + '。' : '这些策略都可以帮助到他！',
                '你已经掌握了 PM+ 的核心技能，可以帮助自己和他人了！',
                '<b>问：下次你遇到非常困难的状况时，你认为自己可以做什么？</b>'
            ];
        },
        voiceInput: { placeholder: '思考一下，下次遇到困难时你会怎么做...', key: 'futureStrategy' },
        actions: [{ text: '进行最终评估', type: 'primary', next: '5.3' }]
    },
    '5.3': {
        title: '第5周',
        messages: ['让我们做一个<b>最终评估</b>，看看你的改善情况：', '你现在整体感觉如何？'],
        likert: { min: 0, max: 5, minLabel: '非常好', maxLabel: '非常差' },
        onScore: s => {
            const preScore = calculatePsychlopsScore(PM_DATA.state.psychlops.pre);
            const postScore = s * 4; // 简化计算
            const improvement = preScore - postScore;
            PM_DATA.state.psychlops.post = { score: postScore, improvement };
            
            addBubble('ai', `
                <div class="result-card">
                    <p class="result-label">你的改善幅度</p>
                    <p class="result-value" style="color:${improvement > 0 ? 'var(--success)' : 'var(--warning)'}">
                        ${improvement > 0 ? '+' : ''}${improvement} 分
                    </p>
                    <p class="result-hint">${improvement > 0 ? '恭喜你取得了明显进步！' : '继续练习，会越来越好的！'}</p>
                </div>
            `);
            setTimeout(() => renderStep('5.4'), 2000);
        }
    },
    '5.4': {
        title: '第5周',
        messages: [
            '<div class="graduation-card"><div class="grad-icon">🎓</div><h3>恭喜你完成 PM+ 全部课程！</h3><p>你已经掌握了四种核心心理技能</p></div>',
            '下次你遇到困难时，可以：',
            '<div class="summary-card"><p>🌬️ 使用<b>呼吸技巧</b>平静情绪</p><p>📋 用<b>问题管理</b>策略拆解问题</p><p>🏃 保持<b>活动</b>，打破恶性循环</p><p>👥 寻求<b>信任的人</b>的支持</p></div>',
            '祝你康复顺利，继续实践这些策略！'
        ],
        actions: [{ text: '领取毕业证书，返回首页', type: 'primary', next: 'week5_complete' }]
    }
};

// 危机干预协议
function triggerCrisisProtocol() {
    PM_DATA.state.crisisTriggered = true;
    showCrisisModal();
}

function showCrisisModal() {
    const modal = document.getElementById('modal');
    modal.innerHTML = `
        <div class="crisis-banner">
            <h4><i class="fas fa-exclamation-triangle"></i> 紧急安全评估</h4>
            <p>我注意到你最近可能感觉非常不好。我需要问你一些重要的问题。</p>
        </div>
        <p style="margin: 20px 0; font-weight: 600;">过去一个月里，你是否有过认真的想法或计划来伤害自己？</p>
        <div class="modal-actions" style="flex-direction: column;">
            <button class="btn btn-secondary" onclick="handleCrisisResponse('no')">没有</button>
            <button class="btn btn-outline" onclick="handleCrisisResponse('yes')">有过这样的想法</button>
        </div>
    `;
    modal.classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function handleCrisisResponse(response) {
    const modal = document.getElementById('modal');
    if (response === 'no') {
        modal.innerHTML = `
            <div class="modal-icon success"><i class="fas fa-check"></i></div>
            <h3 class="modal-title">谢谢你的坦诚</h3>
            <p class="modal-content">虽然你现在感觉难受，但听起来你目前是安全的。这些感受是暂时的，你可以度过这段困难时期。</p>
            <button class="btn btn-primary" onclick="closeCrisisAndContinue()">继续 PM+ 学习</button>
        `;
    } else {
        modal.innerHTML = `
            <div class="crisis-banner">
                <h4><i class="fas fa-phone"></i> 我们很担心你的安全</h4>
                <p>你的感受很重要。已通知学校心理老师，他们会尽快联系你提供专业支持。</p>
                <div class="crisis-hotline">
                    <div class="number">12356</div>
                    <div class="label">24小时心理援助热线</div>
                </div>
            </div>
            <p style="margin: 16px 0; font-size: 14px; color: var(--text-secondary);">你可以联系任何你信任的成年人。</p>
            <button class="btn btn-secondary" onclick="closeCrisisAndExit()">我知道了</button>
        `;
    }
}

function closeCrisisAndContinue() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    renderStep('0.6');
}

function closeCrisisAndExit() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    exitPM();
}
