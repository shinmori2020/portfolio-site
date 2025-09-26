// Intersection Observerでフッター表示時にチャットボットを非表示にする
document.addEventListener('DOMContentLoaded', function() {
    const chatbotBar = document.getElementById('chatbot');
    const footer = document.querySelector('.footer');

    if (chatbotBar && footer) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3 // フッターが30%見えたら動作
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // フッターが見えたらチャットボットをフェードアウト
                    chatbotBar.style.opacity = '0';
                    chatbotBar.style.pointerEvents = 'none';
                    chatbotBar.style.transition = 'opacity 0.3s ease';
                } else {
                    // フッターが見えなくなったら再表示
                    chatbotBar.style.opacity = '1';
                    chatbotBar.style.pointerEvents = 'auto';
                }
            });
        }, observerOptions);

        observer.observe(footer);
    }
});

// キーワードマッチング機能
const KeywordMatcher = {
    // 同義語辞書
    synonymDictionary: {
        "料金": ["料金", "価格", "費用", "コスト", "いくら", "金額", "値段", "予算", "お金"],
        "期間": ["期間", "納期", "日数", "時間", "いつまで", "どれくらい", "スケジュール", "かかる"],
        "制作": ["制作", "作成", "作る", "つくる", "開発", "構築", "製作"],
        "LP": ["LP", "ランディングページ", "ランディング", "landing", "エルピー"],
        "WordPress": ["WordPress", "ワードプレス", "WP", "ワープレ", "ワードプレ"],
        "SEO": ["SEO", "エスイーオー", "検索", "上位表示", "集客", "アクセス", "Google", "グーグル"],
        "スマホ": ["スマホ", "スマートフォン", "モバイル", "レスポンシブ", "iPhone", "Android", "携帯"],
        "実績": ["実績", "事例", "制作例", "ポートフォリオ", "作品", "サンプル", "実例"],
        "相談": ["相談", "質問", "聞きたい", "教えて", "話したい", "問い合わせ", "お願い"],
        "修正": ["修正", "変更", "直し", "改善", "調整", "手直し", "リテイク"],
        "SSL": ["SSL", "セキュリティ", "暗号化", "https", "安全", "証明書"],
        "ドメイン": ["ドメイン", "URL", "アドレス", "サイト名", "ホームページアドレス"],
        "サーバー": ["サーバー", "レンタルサーバー", "ホスティング", "サーバ", "インフラ"],
        "デザイン": ["デザイン", "見た目", "おしゃれ", "かっこいい", "きれい", "美しい", "ビジュアル"],
        "更新": ["更新", "アップデート", "メンテナンス", "保守", "運用", "管理"],
        "アクセス解析": ["アクセス解析", "Analytics", "分析", "GA", "解析", "アナリティクス"],
        "見積": ["見積", "見積もり", "見積り", "お見積", "概算", "試算"],
        "契約": ["契約", "申し込み", "申込", "依頼", "発注", "注文"],
        "支払": ["支払", "支払い", "払い", "決済", "入金", "振込"]
    },

    // 回答パターン
    responses: {
        '料金': {
            message: `料金についてご質問ですね！

■ 基本料金：
• LP制作: 10万円〜
• コーポレートサイト: 15万円〜
• WordPress制作: 20万円〜

詳細なお見積りは料金計算機をご利用ください。`,
            action: '[料金計算機へ](pricing-calculator.html)',
            confidence: 'high'
        },
        '期間': {
            message: `制作期間についてお答えします！

■ 標準納期：
• LP制作: 2-3週間
• コーポレートサイト: 3-4週間
• WordPress制作: 4-6週間

お急ぎの場合もご相談ください。`,
            action: '[相談予約へ](#contact)',
            confidence: 'high'
        },
        'WordPress': {
            message: `WordPress制作について！

■ 特徴：
• 管理画面から簡単更新
• SEO対策標準装備
• プラグインで機能拡張可能
• 料金: 20万円〜

お客様のニーズに合わせてカスタマイズいたします。`,
            action: '[WordPress詳細へ](#wordpress)',
            confidence: 'high'
        },
        'SEO': {
            message: `SEO対策について！

■ 標準対応：
• ページ速度最適化
• メタタグ設定
• 構造化データ対応
• サイトマップ生成
• モバイルフレンドリー

全プランSEO基本対策込みです。`,
            confidence: 'high'
        },
        'スマホ': {
            message: `スマートフォン対応について！

■ レスポンシブデザイン：
• 全デバイス対応保証
• タブレットも最適化
• タッチ操作最適化
• 表示速度も高速化

追加料金なしで標準対応です。`,
            confidence: 'high'
        },
        '実績': {
            message: `制作実績をご覧いただけます！

■ 実績：
• 制作サイト数: 100+
• 顧客満足度: 95%
• リピート率: 80%
• 様々な業種に対応`,
            action: '[制作事例を見る](#portfolio)',
            confidence: 'high'
        },
        '修正': {
            message: `修正対応について！

■ 修正ポリシー：
• 初回3回まで無料
• 4回目以降: 5,000円/回
• 緊急対応も可能
• 納品後1ヶ月保証

安心してご依頼ください。`,
            confidence: 'high'
        },
        'SSL': {
            message: `SSL証明書について！

■ セキュリティ対策：
• SSL証明書設定対応
• Let's Encrypt無料SSL
• 常時SSL化（https）
• セキュリティ診断付き

セキュリティも万全です。`,
            confidence: 'high'
        },
        'ドメイン': {
            message: `ドメイン取得について！

■ ドメインサービス：
• 取得代行サービス
• .com/.co.jp対応
• DNS設定も込み
• 移管サポートあり

ドメインもお任せください。`,
            confidence: 'medium'
        },
        'サーバー': {
            message: `サーバーについて！

■ サーバーサポート：
• レンタルサーバー選定
• 初期設定サポート
• 移行作業も対応
• 最適なプランをご提案

最適なサーバーをご提案します。`,
            confidence: 'medium'
        },
        '更新': {
            message: `サイト更新について！

■ 更新サポート：
• 月額保守プラン: 5,000円〜
• スポット更新も可能
• WordPress更新レクチャー
• 緊急時の対応も

継続的なサポートもお任せください。`,
            confidence: 'high'
        },
        'アクセス解析': {
            message: `アクセス解析について！

■ 解析ツール：
• Google Analytics設定
• Search Console設定
• レポート見方説明
• 月次レポート作成（オプション）

データ分析もサポートします。`,
            confidence: 'high'
        },
        '相談': {
            message: `ご相談承ります！

■ お気軽にご相談ください：
• 無料相談実施中
• オンライン相談OK
• 営業時間: 9:00-18:00
• 土日祝も事前予約で対応`,
            action: '[今すぐ相談予約](#contact)',
            confidence: 'high'
        },
        'デザイン': {
            message: `デザインについて！

■ デザインの特徴：
• モダンで洗練されたデザイン
• ブランディング重視
• UI/UX最適化
• オリジナルデザイン対応

お客様のイメージを形にします。`,
            confidence: 'medium'
        },
        '見積': {
            message: `お見積もりについて！

■ 見積もり対応：
• 無料でお見積もり
• 最短即日回答
• 詳細な内訳付き
• 相見積もりOK

まずは料金計算機をお試しください。`,
            action: '[料金計算機へ](pricing-calculator.html)',
            confidence: 'high'
        },
        '契約': {
            message: `ご契約について！

■ 契約の流れ：
1. お見積もり確認
2. ご契約書締結
3. 着手金お支払い（50%）
4. 制作開始
5. 納品・残金お支払い

安心の契約体系です。`,
            confidence: 'medium'
        },
        '支払': {
            message: `お支払いについて！

■ お支払い方法：
• 銀行振込
• クレジットカード（対応予定）
• 分割払い相談可能
• 請求書払い対応

柔軟に対応いたします。`,
            confidence: 'medium'
        },
        '制作': {
            message: `WEB制作サービスについて！

■ 制作可能なサイト：
• ランディングページ
• コーポレートサイト
• ECサイト
• WordPress
• その他カスタム制作

どんなサイトでもご相談ください。`,
            action: '[サービス詳細へ](#services)',
            confidence: 'high'
        },
        'LP': {
            message: `ランディングページ制作！

■ LP制作の特徴：
• コンバージョン重視
• 高速表示
• A/Bテスト対応
• 料金: 10万円〜
• 納期: 2-3週間

成果の出るLPを制作します。`,
            action: '[LP制作詳細へ](#lp)',
            confidence: 'high'
        }
    },

    // 拡張版キーワードマッチング処理を使用
    findMatch(input) {
        // 拡張版の辞書とレスポンスがある場合はそちらを使用
        if (typeof ImprovedKeywordMatcher !== 'undefined') {
            const result = ImprovedKeywordMatcher.findBestMatch(input);
            if (result && result.message) {
                return result;
            }
        }

        // 拡張レスポンスをチェック
        if (typeof EnhancedResponses !== 'undefined') {
            const normalizedInput = input.toLowerCase();

            // EnhancedResponsesから直接マッチングを試みる
            for (const [key, response] of Object.entries(EnhancedResponses)) {
                if (normalizedInput.includes(key.toLowerCase())) {
                    return response;
                }
            }

            // EnhancedSynonymDictionaryがある場合は同義語もチェック
            if (typeof EnhancedSynonymDictionary !== 'undefined') {
                for (const [category, synonyms] of Object.entries(EnhancedSynonymDictionary)) {
                    for (const synonym of synonyms) {
                        if (normalizedInput.includes(synonym.toLowerCase())) {
                            if (EnhancedResponses[category]) {
                                return EnhancedResponses[category];
                            }
                        }
                    }
                }
            }
        }

        // フォールバック：既存の処理
        const normalizedInput = input.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        for (const [category, keywords] of Object.entries(this.synonymDictionary)) {
            let score = 0;

            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword.toLowerCase())) {
                    score += keyword.length;
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = category;
            }
        }

        if (highestScore >= 2) {
            return this.responses[bestMatch] || null;
        }

        return null;
    },

    // 複数キーワードの処理
    findMultipleMatches(input) {
        const matches = [];
        const normalizedInput = input.toLowerCase();

        for (const [category, keywords] of Object.entries(this.synonymDictionary)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword.toLowerCase())) {
                    if (!matches.includes(category)) {
                        matches.push(category);
                    }
                    break;
                }
            }
        }

        return matches;
    }
};

// 会話コンテキスト管理
const ConversationContext = {
    // セッションデータ
    sessionId: null,
    conversationHistory: [],
    questionCount: {},
    lastInteractionTime: null,

    // 初期化
    init() {
        this.sessionId = this.generateSessionId();
        this.loadFromStorage();
        this.startSession();
    },

    // セッションID生成
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // セッション開始
    startSession() {
        this.lastInteractionTime = Date.now();
        this.saveToStorage();
    },

    // LocalStorageから読み込み
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('chatbot_context');
            if (stored) {
                const data = JSON.parse(stored);
                // 1時間以内のセッションのみ継続
                if (data.lastInteractionTime && (Date.now() - data.lastInteractionTime < 3600000)) {
                    this.conversationHistory = data.conversationHistory || [];
                    this.questionCount = data.questionCount || {};
                }
            }
        } catch (e) {
            console.error('Failed to load context:', e);
        }
    },

    // LocalStorageに保存
    saveToStorage() {
        try {
            const data = {
                sessionId: this.sessionId,
                conversationHistory: this.conversationHistory.slice(-20), // 最新20件のみ保持
                questionCount: this.questionCount,
                lastInteractionTime: this.lastInteractionTime
            };
            localStorage.setItem('chatbot_context', JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save context:', e);
        }
    },

    // メッセージ追加
    addMessage(type, content, confidence = null) {
        const message = {
            type: type, // 'user' or 'bot'
            content: content,
            timestamp: Date.now(),
            confidence: confidence
        };

        this.conversationHistory.push(message);
        this.lastInteractionTime = Date.now();
        this.saveToStorage();

        return message;
    },

    // 段階的質問の管理
    guidedQuestions: {
        "料金": {
            question: "どのような制作をご希望ですか？",
            options: [
                { id: "lp", text: "ランディングページ制作", response: "LP制作は10万円〜、納期2-3週間です。コンバージョン重視の設計で制作いたします。" },
                { id: "corp", text: "コーポレートサイト制作", response: "コーポレートサイトは15万円〜、納期3-4週間です。企業の信頼性を高めるデザインで制作します。" },
                { id: "wp", text: "WordPress制作", response: "WordPress制作は20万円〜、納期4-6週間です。更新しやすい管理画面を構築します。" },
                { id: "quote", text: "詳しい見積もりが欲しい", response: "詳細なお見積りをご希望の場合は、料金計算機をご利用ください。" }
            ]
        },
        "制作": {
            question: "どのようなサイトをお考えですか？",
            options: [
                { id: "new", text: "新規サイト制作", response: "新規制作承ります。まずはご要望をお聞かせください。" },
                { id: "renewal", text: "既存サイトリニューアル", response: "リニューアルも対応可能です。現在のサイトを拝見させてください。" },
                { id: "unsure", text: "まだ決まっていない", response: "ご相談から承ります。お気軽にお問い合わせください。" }
            ]
        }
    },

    // エスカレーションチェック
    checkEscalation() {
        // 同じような質問が3回以上繰り返された場合
        const recent = this.conversationHistory.slice(-6);
        const userMessages = recent.filter(m => m.type === 'user');

        if (userMessages.length >= 3) {
            const contents = userMessages.map(m => m.content.toLowerCase());
            const uniqueContents = new Set(contents);

            if (uniqueContents.size === 1) {
                return true; // 同じ質問を3回繰り返している
            }

            // 類似度チェック
            if (userMessages.length >= 3) {
                const lastThree = userMessages.slice(-3);
                const keywords = lastThree.map(m => {
                    const matches = KeywordMatcher.findMultipleMatches(m.content);
                    return matches.join(',');
                });

                if (keywords[0] === keywords[1] && keywords[1] === keywords[2]) {
                    return true;
                }
            }
        }

        return false;
    }
};

// 制約処理とエスカレーション機能
const LimitationHandler = {
    // 営業時間設定
    businessHours: {
        start: 9,
        end: 18,
        timezone: 'Asia/Tokyo'
    },

    // 制約メッセージ
    limitations: {
        outOfScope: `申し訳ございません。その質問には自動応答できません。

専門スタッフが詳しくお答えいたします。
[今すぐ相談予約](#contact)`,

        afterHours: `現在営業時間外です（営業時間: 9:00-18:00）。

翌営業日に専門スタッフが対応いたします。
[お問い合わせフォーム](#contact)`,

        complex: `ご質問が複雑なため、専門スタッフによる対応が必要です。

無料相談も実施中です。
[相談予約はこちら](#contact) 💬`,

        escalation: `同じご質問を繰り返しされているようです。

自動応答では十分にお答えできていないようですので、
専門スタッフが直接対応させていただきます。

[今すぐ相談予約](#contact)`,

        error: `申し訳ございません。システムエラーが発生しました。

お手数ですが、直接お問い合わせください。
[お問い合わせ](#contact)`
    },

    // 営業時間チェック
    isBusinessHours() {
        const now = new Date();
        const hours = now.getHours();
        return hours >= this.businessHours.start && hours < this.businessHours.end;
    },

    // 複雑な質問の判定
    isComplexQuestion(input) {
        // 複数の疑問詞が含まれる
        const questionWords = ['どう', 'なぜ', 'いつ', 'どこ', 'どちら', 'どれ', 'どのような', 'どんな'];
        let questionCount = 0;

        for (const word of questionWords) {
            if (input.includes(word)) {
                questionCount++;
            }
        }

        if (questionCount >= 2) return true;

        // 文字数が長すぎる（詳細な説明を求めている可能性）
        if (input.length > 100) return true;

        // 複数の「？」が含まれる
        const questionMarks = (input.match(/？|\?/g) || []).length;
        if (questionMarks >= 2) return true;

        // 「と」で複数の要素を結合している
        if (input.includes('と') && input.includes('どちら')) return true;

        return false;
    },

    // 不適切な入力チェック
    isInappropriate(input) {
        // 空白のみ
        if (input.trim().length === 0) return true;

        // 繰り返し文字
        const repeatedPattern = /(.)\1{4,}/;
        if (repeatedPattern.test(input)) return true;

        // 意味不明な文字列（ランダムな英数字など）
        const randomPattern = /^[a-zA-Z0-9]{20,}$/;
        if (randomPattern.test(input)) return true;

        return false;
    },

    // エラーメッセージ生成
    getErrorMessage(type) {
        switch (type) {
            case 'empty':
                return 'メッセージを入力してください。';
            case 'inappropriate':
                return '申し訳ございません。適切なご質問をお願いします。';
            case 'too_long':
                return 'メッセージが長すぎます。簡潔にお願いします。';
            default:
                return this.limitations.error;
        }
    },

    // 制約説明メッセージ
    getDisclaimer() {
        return {
            initial: `自動応答システムです

基本的なご質問にお答えします。
複雑なご相談は営業時間内に専門スタッフが対応いたします。`,

            limitations: `以下の場合は専門スタッフにおつなぎします：
• 複雑なカスタマイズのご相談
• 詳細な見積もりのご依頼
• 技術的な詳細質問
• 緊急のご依頼`,

            businessHours: `営業時間: 平日 9:00-18:00
時間外は翌営業日に対応いたします。`
        };
    },

    // フォールバック応答
    getFallbackResponse(input) {
        const responses = [
            {
                message: `ご質問ありがとうございます。

その件について、詳しくお答えするため専門スタッフにおつなぎしたいと思います。`,
                action: '[今すぐ相談](#contact)'
            },
            {
                message: `申し訳ございません、その質問には詳しい説明が必要です。

無料相談で詳しくご説明させていただけます。`,
                action: '[無料相談予約](#contact)'
            },
            {
                message: `お問い合わせありがとうございます。

より正確にお答えするため、直接お話を伺えればと思います。`,
                action: '[お問い合わせフォーム](#contact)'
            }
        ];

        // ランダムに選択
        return responses[Math.floor(Math.random() * responses.length)];
    },

    // ログ記録（分析用）
    logInteraction(input, response, confidence) {
        try {
            const logs = JSON.parse(localStorage.getItem('chatbot_logs') || '[]');
            logs.push({
                timestamp: Date.now(),
                input: input,
                response: response,
                confidence: confidence,
                sessionId: ConversationContext.sessionId
            });

            // 最新100件のみ保持
            const recentLogs = logs.slice(-100);
            localStorage.setItem('chatbot_logs', JSON.stringify(recentLogs));
        } catch (e) {
            console.error('Failed to log interaction:', e);
        }
    }
};

// チャットボット メイン機能
class Chatbot {
    constructor() {
        this.elements = {
            icon: null,
            window: null,
            messages: null,
            input: null,
            sendBtn: null,
            closeBtn: null,
            disclaimer: null
        };

        this.isOpen = false;
        this.isTyping = false;

        this.init();
    }

    // 初期化
    init() {
        this.setupElements();
        this.setupEventListeners();

        // コンテキスト初期化
        ConversationContext.init();

        // 初回メッセージ表示
        this.showWelcomeMessage();

        // 営業時間チェック
        this.updateBusinessHoursStatus();
    }

    // DOM要素の取得
    setupElements() {
        this.elements.container = document.getElementById('chatbotContainer');
        this.elements.header = document.getElementById('chatbotHeader');
        this.elements.toggle = document.getElementById('chatbotToggle');
        this.elements.toggleIcon = document.getElementById('toggleIcon');
        this.elements.body = document.getElementById('chatbotBody');
        this.elements.messages = document.getElementById('chatbotMessages');
        this.elements.input = document.getElementById('chatbotInput');
        this.elements.sendBtn = document.getElementById('chatbotSend');
        this.elements.disclaimer = document.getElementById('chatbotDisclaimer');
    }

    // イベントリスナー設定
    setupEventListeners() {
        // ヘッダークリックで開閉
        this.elements.header.addEventListener('click', (e) => {
            // トグルボタンのクリックも含む
            this.toggle();
        });

        // 送信ボタン
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());

        // Enterキーで送信
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // ESCキーで閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    // 営業時間ステータス更新
    updateBusinessHoursStatus() {
        if (LimitationHandler.isBusinessHours()) {
            this.elements.disclaimer.innerHTML = '<p>自動応答中（営業時間: 9:00-18:00）</p>';
        } else {
            this.elements.disclaimer.innerHTML = '<p>営業時間外（営業時間: 9:00-18:00）</p>';
        }
    }

    // チャット開閉
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    // チャットを開く
    open() {
        this.elements.container.classList.add('chatbot__container--open');
        this.isOpen = true;

        // 少し遅延してインプットにフォーカス
        setTimeout(() => {
            this.elements.input.focus();
        }, 300);

        // 営業時間更新
        this.updateBusinessHoursStatus();
    }

    // チャットを閉じる
    close() {
        this.elements.container.classList.remove('chatbot__container--open');
        this.isOpen = false;
    }

    // ウェルカムメッセージ
    showWelcomeMessage() {
        setTimeout(() => {
            const disclaimer = LimitationHandler.getDisclaimer();
            this.addBotMessage(disclaimer.initial);

            // 営業時間外の場合
            if (!LimitationHandler.isBusinessHours()) {
                setTimeout(() => {
                    this.addBotMessage(disclaimer.businessHours);
                }, 1000);
            }

            // 初期選択肢を表示
            setTimeout(() => {
                this.showInitialCategories();
            }, 1500);
        }, 1000);
    }

    // 初期カテゴリー選択を表示
    showInitialCategories() {
        const categories = [
            { id: 'pricing', label: '料金・見積もりについて', keywords: ['料金', '見積もり', '予算'] },
            { id: 'production', label: 'サイト制作について', keywords: ['制作', 'WordPress', 'LP'] },
            { id: 'schedule', label: '納期・スケジュール', keywords: ['期間', '納期', '急ぎ'] },
            { id: 'tech', label: '技術・機能について', keywords: ['機能', 'SEO', 'スマホ'] },
            { id: 'support', label: 'サポート・保守', keywords: ['サポート', '修正', '更新'] },
            { id: 'portfolio', label: '制作実績・事例', keywords: ['実績', '事例', 'ポートフォリオ'] },
            { id: 'contact', label: '直接相談したい', keywords: ['相談', '問い合わせ'] },
            { id: 'other', label: 'その他の質問', keywords: [] }
        ];

        const optionsHtml = categories.map(cat =>
            `<button class="chatbot__option-btn chatbot__category-btn" data-category="${cat.id}" data-keywords='${JSON.stringify(cat.keywords)}'>
                ${cat.label}
            </button>`
        ).join('');

        const messageHtml = `
            <div class="chatbot__initial-select">
                <p style="margin-bottom: 15px; font-weight: bold;">どのようなご相談でしょうか？</p>
                <div class="chatbot__options" style="max-height: 350px; overflow-y: auto; padding-right: 5px;">
                    ${optionsHtml}
                </div>
                <p style="margin-top: 15px; font-size: 12px; color: #999;">
                    または、下の入力欄から直接ご質問いただくこともできます。
                </p>
            </div>
        `;

        this.addBotMessageHtml(messageHtml);

        // カテゴリーボタンのクリックイベント
        setTimeout(() => {
            document.querySelectorAll('.chatbot__category-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const category = e.currentTarget.dataset.category;
                    const keywords = JSON.parse(e.currentTarget.dataset.keywords);
                    const label = e.currentTarget.textContent.trim();

                    // ユーザーの選択を表示
                    this.addUserMessage(label);

                    // カテゴリーに応じた詳細選択肢を表示
                    setTimeout(() => {
                        this.showCategoryDetails(category, keywords);
                    }, 500);
                });
            });
        }, 100);
    }

    // カテゴリー別の詳細選択肢を表示
    showCategoryDetails(category, keywords) {
        const categoryResponses = {
            'pricing': {
                message: '料金についてお答えします！',
                options: [
                    { text: '基本料金を知りたい', response: '料金' },
                    { text: '見積もりを依頼したい', response: '見積もり無料' },
                    { text: '分割払いについて', response: '分割払い' },
                    { text: '追加料金について', response: '追加料金' },
                    { text: '業種別の料金', response: '業種別料金' }
                ]
            },
            'production': {
                message: 'サイト制作について詳しくご説明します！',
                options: [
                    { text: 'LP制作について', response: 'LP' },
                    { text: 'WordPress制作', response: 'WordPress' },
                    { text: 'ECサイト制作', response: 'ECサイト' },
                    { text: '制作の流れ', response: '制作フロー' },
                    { text: 'カスタム機能開発', response: 'カスタム機能' }
                ]
            },
            'schedule': {
                message: 'スケジュールについてお答えします！',
                options: [
                    { text: '標準的な納期', response: '期間' },
                    { text: '急ぎの対応', response: '急ぎ' },
                    { text: '制作フロー', response: '制作フロー' },
                    { text: '開始時期について', response: '開始時期' }
                ]
            },
            'tech': {
                message: '技術・機能についてご説明します！',
                options: [
                    { text: 'SEO対策', response: 'SEO' },
                    { text: 'スマホ対応', response: 'スマホ' },
                    { text: 'セキュリティ対策', response: 'セキュリティ' },
                    { text: 'API連携', response: 'API連携' },
                    { text: '予約システム', response: '予約システム' }
                ]
            },
            'support': {
                message: 'サポート体制についてご説明します！',
                options: [
                    { text: '納品後のサポート', response: '完成後サポート' },
                    { text: '保守・メンテナンス', response: '保守費用' },
                    { text: '修正対応', response: '修正回数' },
                    { text: '緊急時の対応', response: '緊急対応' },
                    { text: '操作説明', response: '操作説明' }
                ]
            },
            'portfolio': {
                message: '制作実績をご覧いただけます！',
                options: [
                    { text: '制作実績を見る', response: '制作実績' },
                    { text: '業種別の事例', response: '業種別料金' },
                    { text: 'お客様の声', response: 'お客様の声' },
                    { text: '会社情報', response: '会社情報' }
                ]
            },
            'contact': {
                message: 'お問い合わせ方法をご案内します！',
                direct: true,
                response: `ご相談ありがとうございます！

以下の方法でお問い合わせいただけます：

• 電話相談（平日9:00-18:00）
• メール相談（24時間受付）
• オンライン相談（Zoom/Teams）
• 来社相談（要予約）

[今すぐ問い合わせる](#contact)`
            },
            'other': {
                message: 'その他のご質問をどうぞ！',
                direct: true,
                response: `下の入力欄にご質問をお書きください。

よくあるご質問：
• 著作権について
• 契約書について
• ドメイン・サーバーについて
• 多言語対応について

何でもお気軽にご質問ください！`
            }
        };

        const categoryData = categoryResponses[category];
        if (!categoryData) return;

        if (categoryData.direct) {
            // 直接回答を表示
            this.addBotMessage(categoryData.response);
        } else {
            // 詳細選択肢を表示
            this.addBotMessage(categoryData.message);

            const optionsHtml = categoryData.options.map((opt, index) =>
                `<button class="chatbot__option-btn" data-response="${opt.response}">
                    ${index + 1}. ${opt.text}
                </button>`
            ).join('');

            const messageHtml = `
                <div class="chatbot__options">
                    ${optionsHtml}
                </div>
            `;

            setTimeout(() => {
                this.addBotMessageHtml(messageHtml);

                // 選択肢のクリックイベント
                setTimeout(() => {
                    document.querySelectorAll('.chatbot__option-btn[data-response]').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            const responseKey = e.target.dataset.response;
                            const buttonText = e.target.textContent;

                            // ユーザーの選択を表示
                            this.addUserMessage(buttonText);

                            // タイピング表示
                            this.showTypingIndicator();

                            // 対応する回答を検索して表示
                            setTimeout(() => {
                                this.hideTypingIndicator();

                                // KeywordMatcherを使って回答を取得
                                const response = KeywordMatcher.findMatch(responseKey);
                                if (response) {
                                    this.addBotMessage(response.message);
                                    if (response.action) {
                                        setTimeout(() => {
                                            this.addBotMessage(response.action);
                                        }, 500);
                                    }
                                }
                            }, 1000);
                        });
                    });
                }, 100);
            }, 500);
        }
    }

    // メッセージ送信
    sendMessage() {
        const input = this.elements.input.value.trim();

        if (input === '') return;

        // 不適切な入力チェック
        if (LimitationHandler.isInappropriate(input)) {
            this.addBotMessage(LimitationHandler.getErrorMessage('inappropriate'));
            this.elements.input.value = '';
            return;
        }

        // ユーザーメッセージ追加
        this.addUserMessage(input);
        ConversationContext.addMessage('user', input);

        // 入力欄クリア
        this.elements.input.value = '';

        // タイピングインジケーター表示
        this.showTypingIndicator();

        // 応答処理
        setTimeout(() => {
            this.processResponse(input);
        }, 1000);
    }

    // 応答処理
    processResponse(input) {
        // タイピングインジケーター削除
        this.hideTypingIndicator();

        // エスカレーションチェック
        if (ConversationContext.checkEscalation()) {
            this.addBotMessage(LimitationHandler.limitations.escalation);
            LimitationHandler.logInteraction(input, 'escalation', 'escalation');
            return;
        }

        // 複雑な質問チェック
        if (LimitationHandler.isComplexQuestion(input)) {
            this.addBotMessage(LimitationHandler.limitations.complex);
            LimitationHandler.logInteraction(input, 'complex', 'low');
            return;
        }

        // キーワードマッチング
        const response = KeywordMatcher.findMatch(input);

        if (response) {
            // マッチした場合
            let message = response.message;

            this.addBotMessage(message);

            // アクション表示
            if (response.action) {
                setTimeout(() => {
                    this.addBotMessage(response.action);
                }, 500);
            }

            // ログ記録
            ConversationContext.addMessage('bot', message, response.confidence);
            LimitationHandler.logInteraction(input, message, response.confidence);

            // 段階的質問の処理
            const multipleMatches = KeywordMatcher.findMultipleMatches(input);
            if (multipleMatches.length === 1 && ConversationContext.guidedQuestions[multipleMatches[0]]) {
                setTimeout(() => {
                    this.handleGuidedQuestion(multipleMatches[0]);
                }, 1000);
            }
        } else {
            // マッチしない場合
            const fallback = LimitationHandler.getFallbackResponse(input);
            this.addBotMessage(fallback.message);

            if (fallback.action) {
                setTimeout(() => {
                    this.addBotMessage(fallback.action);
                }, 500);
            }

            ConversationContext.addMessage('bot', fallback.message, 'low');
            LimitationHandler.logInteraction(input, fallback.message, 'low');
        }
    }

    // 段階的質問の処理
    handleGuidedQuestion(category) {
        const guided = ConversationContext.guidedQuestions[category];

        if (!guided) return;

        // 質問と選択肢を表示
        const optionsHtml = guided.options.map((opt, index) =>
            `<button class="chatbot__option-btn" data-response="${opt.response.replace(/"/g, '&quot;')}" data-id="${opt.id}">
                ${index + 1}. ${opt.text}
            </button>`
        ).join('');

        const messageHtml = `
            <div class="chatbot__guided">
                <p>${guided.question}</p>
                <div class="chatbot__options">${optionsHtml}</div>
            </div>
        `;

        this.addBotMessageHtml(messageHtml);

        // 選択肢のクリックイベント
        setTimeout(() => {
            document.querySelectorAll('.chatbot__option-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const response = e.target.dataset.response.replace(/&quot;/g, '"');
                    const id = e.target.dataset.id;

                    // ユーザーの選択を表示
                    this.addUserMessage(e.target.textContent);

                    // ボットの応答
                    setTimeout(() => {
                        this.addBotMessage(response);

                        // 追加アクション
                        if (id === 'quote') {
                            setTimeout(() => {
                                this.addBotMessage('[料金計算機を開く](pricing-calculator.html)');
                            }, 500);
                        }
                    }, 500);
                });
            });
        }, 100);
    }

    // ユーザーメッセージ追加
    addUserMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot__message chatbot__message--user';

        const time = new Date().toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            ${this.escapeHtml(content)}
            <div class="chatbot__message-time">${time}</div>
        `;

        this.elements.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    // ボットメッセージ追加
    addBotMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot__message chatbot__message--bot';

        const time = new Date().toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // リンクの処理
        content = this.processLinks(content);

        messageDiv.innerHTML = `
            ${content}
            <div class="chatbot__message-time">${time}</div>
        `;

        this.elements.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    // HTMLメッセージ追加
    addBotMessageHtml(html) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot__message chatbot__message--bot';
        messageDiv.innerHTML = html;

        this.elements.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    // タイピングインジケーター表示
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot__typing';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="chatbot__typing-dot"></div>
            <div class="chatbot__typing-dot"></div>
            <div class="chatbot__typing-dot"></div>
        `;

        this.elements.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    // タイピングインジケーター削除
    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // リンクの処理
    processLinks(content) {
        // [テキスト](URL) 形式をHTMLリンクに変換
        return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    }

    // HTMLエスケープ
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 最下部にスクロール
    scrollToBottom() {
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
});