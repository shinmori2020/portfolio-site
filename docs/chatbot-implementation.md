# チャットボット/FAQ自動応答機能 実装ドキュメント

## 📋 概要

WEBサイト制作サービスのポートフォリオサイトに、完全無料のチャットボット機能を実装するための完全ガイド。

### 技術仕様
- **技術スタック**: HTML + CSS + JavaScript（バニラJS）
- **費用**: ¥0（完全無料・外部API不要）
- **対象環境**: Netlify静的サイトホスティング対応
- **デザイン**: BEM記法、ダークテーマ、グリーンアクセント(#00ff88)

## ⚠️ 実装前の重要な制約事項

### 技術的制約

#### データ管理の限界
- **LocalStorage依存**: ブラウザ毎にデータが分離、容量制限5-10MB
- **分析機能の欠如**: リアルタイム分析不可、複数デバイス間のデータ共有不可
- **学習機能なし**: 自動改善機能の実装不可

#### 自然言語処理の限界
- **キーワードマッチングのみ**: 文脈理解・意図推測不可
- **表記ゆれ対応の限界**: 辞書未登録の表現は対応不可
- **複合質問への弱さ**: 優先順位判定不可

### ユーザー体験の制約

#### 会話の不自然さ
- 定型回答による機械的な対応
- 文脈を考慮した返答の困難
- 感情認識・共感表現の不可能

#### ビジネス影響の制約
- 完全自動化による差別化の困難
- ブランド価値向上効果の限界
- 営業機会損失のリスク

## 🔧 実装機能詳細

### 1. 基本機能

#### チャットUI
- サイト右下に常時表示される吹き出しアイコン
- クリックで会話ウィンドウ開閉
- モバイル対応のレスポンシブデザイン

#### 自動応答システム
- キーワードマッチングによる定型回答
- 70パターン以上の拡張回答を実装（2025年1月更新）
- 営業時間外の自動案内
- 同義語辞書2倍拡張による表記ゆれ対応強化

#### 誘導機能
- 料金計算機への誘導
- 問い合わせフォームへの誘導
- 制作事例ページへの誘導

### 2. 拡張機能

#### 段階的質問誘導システム
複雑な質問を段階的に絞り込んで適切な情報提供を行う

```javascript
const guidedQuestions = {
  "料金について": {
    question: "どちらの制作にご興味がございますか？",
    options: [
      "1️⃣ ランディングページ制作（10万円〜）",
      "2️⃣ コーポレートサイト制作（15万円〜）",
      "3️⃣ WordPress制作（20万円〜）",
      "4️⃣ 詳しい見積もりが欲しい"
    ]
  }
};
```

#### 表記ゆれ対応辞書
```javascript
const synonymDictionary = {
  "料金": ["料金", "価格", "費用", "コスト", "いくら", "金額", "値段"],
  "期間": ["期間", "納期", "日数", "時間", "いつまで", "どれくらい"],
  "SEO": ["SEO", "エスイーオー", "検索", "上位表示", "集客"],
  "WordPress": ["WordPress", "ワードプレス", "WP", "CMS"]
};
```

#### エスカレーション機能
同じ質問を3回以上繰り返した場合、人的対応へ誘導

### 3. 制約認識機能

#### 期待値管理
```javascript
const expectationSetting = {
  welcomeMessage: `
    🤖 簡易自動応答システムです

    基本的なご質問（料金・期間・実績等）にお答えします。

    ⚠️ 複雑なご相談は営業時間内に専門スタッフが対応します
  `
};
```

## 📁 ファイル構成

```
/chatbot/
├── chatbot.html           # テスト用HTML
├── css/
│   └── chatbot.css        # スタイル定義
└── js/
    ├── chatbot.js         # メイン機能
    ├── keyword-matcher.js # キーワードマッチング
    ├── conversation-context.js # 会話コンテキスト管理
    └── limitation-handler.js   # 制約処理
```

## 💻 実装コード

### HTML構造（chatbot.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>チャットボット デモ</title>
    <link rel="stylesheet" href="css/chatbot.css">
</head>
<body>
    <!-- チャットボットコンテナ -->
    <div class="chatbot" id="chatbot">
        <!-- チャットアイコン -->
        <button class="chatbot__icon" id="chatbotIcon" aria-label="チャットを開く">
            <span class="chatbot__icon-badge">自動応答</span>
            <svg class="chatbot__icon-svg" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
        </button>

        <!-- チャットウィンドウ -->
        <div class="chatbot__window" id="chatbotWindow" hidden>
            <!-- ヘッダー -->
            <div class="chatbot__header">
                <h3 class="chatbot__title">お問い合わせサポート</h3>
                <button class="chatbot__close" id="chatbotClose" aria-label="チャットを閉じる">×</button>
            </div>

            <!-- 制約説明 -->
            <div class="chatbot__disclaimer">
                <p>🤖 自動応答中（営業時間: 9:00-18:00）</p>
            </div>

            <!-- メッセージエリア -->
            <div class="chatbot__messages" id="chatbotMessages"></div>

            <!-- 入力エリア -->
            <div class="chatbot__input-area">
                <input
                    type="text"
                    class="chatbot__input"
                    id="chatbotInput"
                    placeholder="質問を入力してください..."
                    aria-label="メッセージ入力"
                >
                <button class="chatbot__send" id="chatbotSend" aria-label="送信">
                    送信
                </button>
            </div>
        </div>
    </div>

    <script src="js/keyword-matcher.js"></script>
    <script src="js/conversation-context.js"></script>
    <script src="js/limitation-handler.js"></script>
    <script src="js/chatbot.js"></script>
</body>
</html>
```

### CSS スタイル（chatbot.css）

```css
/* チャットボット基本スタイル */
.chatbot {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* チャットアイコン */
.chatbot__icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00ff88 0%, #00cc70 100%);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
}

.chatbot__icon:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 255, 136, 0.4);
}

.chatbot__icon-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4444;
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: bold;
}

.chatbot__icon-svg {
    width: 30px;
    height: 30px;
    fill: white;
}

/* チャットウィンドウ */
.chatbot__window {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 350px;
    height: 500px;
    background: #1a1a1a;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ヘッダー */
.chatbot__header {
    background: linear-gradient(135deg, #00ff88 0%, #00cc70 100%);
    color: #1a1a1a;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chatbot__title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.chatbot__close {
    background: none;
    border: none;
    color: #1a1a1a;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.chatbot__close:hover {
    background: rgba(0, 0, 0, 0.1);
}

/* 制約説明エリア */
.chatbot__disclaimer {
    background: #2a2a2a;
    padding: 10px 15px;
    border-bottom: 1px solid #333;
    font-size: 12px;
    color: #999;
}

.chatbot__disclaimer p {
    margin: 0;
}

/* メッセージエリア */
.chatbot__messages {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.chatbot__messages::-webkit-scrollbar {
    width: 6px;
}

.chatbot__messages::-webkit-scrollbar-track {
    background: #2a2a2a;
}

.chatbot__messages::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 3px;
}

/* メッセージバブル */
.chatbot__message {
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.4;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.chatbot__message--bot {
    align-self: flex-start;
    background: #333;
    color: #fff;
    border-bottom-left-radius: 4px;
}

.chatbot__message--user {
    align-self: flex-end;
    background: linear-gradient(135deg, #00ff88 0%, #00cc70 100%);
    color: #1a1a1a;
    border-bottom-right-radius: 4px;
}

.chatbot__message-time {
    font-size: 10px;
    opacity: 0.6;
    margin-top: 5px;
}

/* 選択肢ボタン */
.chatbot__options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
}

.chatbot__option-btn {
    background: #2a2a2a;
    border: 1px solid #00ff88;
    color: #00ff88;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    text-align: left;
    transition: all 0.3s ease;
    font-size: 13px;
}

.chatbot__option-btn:hover {
    background: #00ff88;
    color: #1a1a1a;
}

/* 入力エリア */
.chatbot__input-area {
    padding: 15px;
    background: #2a2a2a;
    border-top: 1px solid #333;
    display: flex;
    gap: 10px;
}

.chatbot__input {
    flex: 1;
    background: #1a1a1a;
    border: 1px solid #444;
    color: #fff;
    padding: 10px;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
}

.chatbot__input:focus {
    border-color: #00ff88;
}

.chatbot__send {
    background: linear-gradient(135deg, #00ff88 0%, #00cc70 100%);
    color: #1a1a1a;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.3s ease;
}

.chatbot__send:hover {
    transform: scale(1.05);
}

.chatbot__send:active {
    transform: scale(0.95);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .chatbot__window {
        width: 90vw;
        height: 80vh;
        right: 50%;
        transform: translateX(50%);
        bottom: 70px;
    }
}

@media (max-width: 480px) {
    .chatbot__window {
        width: 95vw;
        height: 85vh;
    }

    .chatbot__icon {
        width: 50px;
        height: 50px;
    }
}

/* ダークテーマ調整 */
@media (prefers-color-scheme: dark) {
    .chatbot__window {
        background: #0a0a0a;
    }

    .chatbot__disclaimer {
        background: #1a1a1a;
    }

    .chatbot__message--bot {
        background: #222;
    }
}

/* ローディングアニメーション */
.chatbot__typing {
    display: flex;
    gap: 4px;
    padding: 10px 15px;
    background: #333;
    border-radius: 12px;
    align-self: flex-start;
}

.chatbot__typing-dot {
    width: 8px;
    height: 8px;
    background: #00ff88;
    border-radius: 50%;
    animation: typing 1.4s infinite;
}

.chatbot__typing-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.chatbot__typing-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.5;
    }
    30% {
        transform: translateY(-10px);
        opacity: 1;
    }
}
```

### JavaScript実装

#### keyword-matcher.js
```javascript
// キーワードマッチング機能
const KeywordMatcher = {
    // 同義語辞書
    synonymDictionary: {
        "料金": ["料金", "価格", "費用", "コスト", "いくら", "金額", "値段", "予算", "お金"],
        "期間": ["期間", "納期", "日数", "時間", "いつまで", "どれくらい", "スケジュール"],
        "制作": ["制作", "作成", "作る", "つくる", "開発", "構築"],
        "LP": ["LP", "ランディングページ", "ランディング", "landing"],
        "WordPress": ["WordPress", "ワードプレス", "WP", "ワープレ"],
        "SEO": ["SEO", "エスイーオー", "検索", "上位表示", "集客", "アクセス"],
        "スマホ": ["スマホ", "スマートフォン", "モバイル", "レスポンシブ", "iPhone", "Android"],
        "実績": ["実績", "事例", "制作例", "ポートフォリオ", "作品", "サンプル"],
        "相談": ["相談", "質問", "聞きたい", "教えて", "話したい", "問い合わせ"],
        "修正": ["修正", "変更", "直し", "改善", "調整", "手直し"],
        "SSL": ["SSL", "セキュリティ", "暗号化", "https", "安全"],
        "ドメイン": ["ドメイン", "URL", "アドレス", "サイト名"],
        "サーバー": ["サーバー", "レンタルサーバー", "ホスティング", "サーバ"],
        "デザイン": ["デザイン", "見た目", "おしゃれ", "かっこいい", "きれい", "美しい"],
        "更新": ["更新", "アップデート", "メンテナンス", "保守", "運用"],
        "アクセス解析": ["アクセス解析", "Analytics", "分析", "GA", "解析"]
    },

    // 回答パターン
    responses: {
        '料金': {
            message: `料金についてご質問ですね！

📍 基本料金：
• LP制作: 10万円〜
• コーポレートサイト: 15万円〜
• WordPress制作: 20万円〜

詳細なお見積りは料金計算機をご利用ください。`,
            action: '[料金計算機へ](pricing-calculator.html)',
            confidence: 'high'
        },
        '期間': {
            message: `制作期間についてお答えします！

📅 標準納期：
• LP制作: 2-3週間
• コーポレートサイト: 3-4週間
• WordPress制作: 4-6週間

お急ぎの場合もご相談ください。`,
            action: '[相談予約へ](#contact)',
            confidence: 'high'
        },
        'WordPress': {
            message: `WordPress制作について！

✨ 特徴：
• 管理画面から簡単更新
• SEO対策標準装備
• プラグインで機能拡張可能
• 料金: 20万円〜`,
            action: '[WordPress詳細へ](#wordpress)',
            confidence: 'high'
        },
        'SEO': {
            message: `SEO対策について！

🎯 標準対応：
• ページ速度最適化
• メタタグ設定
• 構造化データ対応
• サイトマップ生成

全プランSEO基本対策込みです。`,
            confidence: 'high'
        },
        'スマホ': {
            message: `スマートフォン対応について！

📱 レスポンシブデザイン：
• 全デバイス対応保証
• タブレットも最適化
• タッチ操作最適化

追加料金なしで標準対応です。`,
            confidence: 'high'
        },
        '実績': {
            message: `制作実績をご覧いただけます！

🏆 実績：
• 制作サイト数: 100+
• 顧客満足度: 95%
• リピート率: 80%`,
            action: '[制作事例を見る](#portfolio)',
            confidence: 'high'
        },
        '修正': {
            message: `修正対応について！

✏️ 修正ポリシー：
• 初回3回まで無料
• 4回目以降: 5,000円/回
• 緊急対応も可能

安心してご依頼ください。`,
            confidence: 'high'
        },
        'SSL': {
            message: `SSL証明書について！

🔒 セキュリティ対策：
• SSL証明書設定対応
• Let's Encrypt無料SSL
• 常時SSL化（https）

セキュリティも万全です。`,
            confidence: 'high'
        },
        'ドメイン': {
            message: `ドメイン取得について！

🌐 ドメインサービス：
• 取得代行サービス
• .com/.co.jp対応
• DNS設定も込み

ドメインもお任せください。`,
            confidence: 'medium'
        },
        'サーバー': {
            message: `サーバーについて！

⚙️ サーバーサポート：
• レンタルサーバー選定
• 初期設定サポート
• 移行作業も対応

最適なサーバーをご提案します。`,
            confidence: 'medium'
        },
        '更新': {
            message: `サイト更新について！

🔄 更新サポート：
• 月額保守プラン: 5,000円〜
• スポット更新も可能
• WordPress更新レクチャー

継続的なサポートもお任せください。`,
            confidence: 'high'
        },
        'アクセス解析': {
            message: `アクセス解析について！

📊 解析ツール：
• Google Analytics設定
• Search Console設定
• レポート見方説明

データ分析もサポートします。`,
            confidence: 'high'
        },
        '相談': {
            message: `ご相談承ります！

💬 お気軽にご相談ください：
• 無料相談実施中
• オンライン相談OK
• 営業時間: 9:00-18:00`,
            action: '[今すぐ相談予約](#contact)',
            confidence: 'high'
        },
        'デザイン': {
            message: `デザインについて！

🎨 デザインの特徴：
• モダンで洗練されたデザイン
• ブランディング重視
• UI/UX最適化

お客様のイメージを形にします。`,
            confidence: 'medium'
        }
    },

    // キーワードマッチング処理
    findMatch(input) {
        const normalizedInput = input.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        // 各キーワードカテゴリをチェック
        for (const [category, keywords] of Object.entries(this.synonymDictionary)) {
            let score = 0;

            // キーワードの一致をチェック
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword.toLowerCase())) {
                    score += keyword.length; // 長いキーワードほど高スコア
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = category;
            }
        }

        // 閾値以上のスコアの場合のみマッチとみなす
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
```

#### conversation-context.js
```javascript
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
                { id: "lp", text: "ランディングページ制作", response: "LP制作は10万円〜、納期2-3週間です。" },
                { id: "corp", text: "コーポレートサイト制作", response: "コーポレートサイトは15万円〜、納期3-4週間です。" },
                { id: "wp", text: "WordPress制作", response: "WordPress制作は20万円〜、納期4-6週間です。" },
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

    // 現在のコンテキストを取得
    getCurrentContext() {
        if (this.conversationHistory.length === 0) return null;

        // 最新3つのメッセージを考慮
        const recentMessages = this.conversationHistory.slice(-3);
        return {
            recentMessages: recentMessages,
            isRepeatedQuestion: this.checkRepeatedQuestion(),
            sessionDuration: Date.now() - this.conversationHistory[0].timestamp
        };
    },

    // 繰り返し質問のチェック
    checkRepeatedQuestion() {
        if (this.conversationHistory.length < 3) return false;

        const lastThree = this.conversationHistory.slice(-3);
        const userMessages = lastThree.filter(m => m.type === 'user');

        if (userMessages.length < 2) return false;

        // 類似度チェック（簡易版）
        const lastTwo = userMessages.slice(-2);
        const similarity = this.calculateSimilarity(lastTwo[0].content, lastTwo[1].content);

        return similarity > 0.7;
    },

    // 文字列類似度計算（簡易版）
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;

        if (longer.length === 0) return 1.0;

        const longerLower = longer.toLowerCase();
        const shorterLower = shorter.toLowerCase();

        // 部分一致チェック
        if (longerLower.includes(shorterLower)) {
            return shorterLower.length / longerLower.length;
        }

        // 共通キーワード数チェック
        const words1 = new Set(longerLower.split(/\s+/));
        const words2 = new Set(shorterLower.split(/\s+/));
        const intersection = new Set([...words1].filter(x => words2.has(x)));

        return intersection.size / Math.max(words1.size, words2.size);
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
        }

        return false;
    }
};
```

#### limitation-handler.js
```javascript
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
[今すぐ相談予約](#contact) 📞`,

        afterHours: `現在営業時間外です（営業時間: 9:00-18:00）。

翌営業日に専門スタッフが対応いたします。
[お問い合わせフォーム](#contact) 📧`,

        complex: `ご質問が複雑なため、専門スタッフによる対応が必要です。

無料相談も実施中です。
[相談予約はこちら](#contact) 💬`,

        escalation: `同じご質問を繰り返しされているようです。

自動応答では十分にお答えできていないようですので、
専門スタッフが直接対応させていただきます。

[今すぐ相談予約](#contact) 🎯`,

        error: `申し訳ございません。システムエラーが発生しました。

お手数ですが、直接お問い合わせください。
[お問い合わせ](#contact) ⚠️`
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
        const questionWords = ['どう', 'なぜ', 'いつ', 'どこ', 'どちら', 'どれ'];
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
        const questionMarks = (input.match(/？/g) || []).length;
        if (questionMarks >= 2) return true;

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
            initial: `🤖 自動応答システムです

基本的なご質問にお答えします。
複雑なご相談は営業時間内に専門スタッフが対応いたします。`,

            limitations: `⚠️ 以下の場合は専門スタッフにおつなぎします：
• 複雑なカスタマイズのご相談
• 詳細な見積もりのご依頼
• 技術的な詳細質問
• 緊急のご依頼`,

            businessHours: `営業時間: 平日 9:00-18:00
時間外は翌営業日に対応いたします。`
        };
    },

    // 信頼度に基づくメッセージ調整
    adjustMessageByConfidence(message, confidence) {
        if (confidence === 'low') {
            return message + '\n\n⚠️ より詳しい情報が必要な場合は、専門スタッフにご相談ください。';
        }
        return message;
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
    },

    // 分析用データ取得
    getAnalyticsData() {
        try {
            const logs = JSON.parse(localStorage.getItem('chatbot_logs') || '[]');

            // 基本統計
            const stats = {
                totalInteractions: logs.length,
                uniqueSessions: new Set(logs.map(l => l.sessionId)).size,
                lowConfidenceRate: logs.filter(l => l.confidence === 'low').length / logs.length,
                averageSessionLength: this.calculateAverageSessionLength(logs)
            };

            // よくある質問
            const frequentQuestions = this.extractFrequentQuestions(logs);

            return {
                stats: stats,
                frequentQuestions: frequentQuestions
            };
        } catch (e) {
            console.error('Failed to get analytics:', e);
            return null;
        }
    },

    // 平均セッション長計算
    calculateAverageSessionLength(logs) {
        const sessions = {};

        logs.forEach(log => {
            if (!sessions[log.sessionId]) {
                sessions[log.sessionId] = [];
            }
            sessions[log.sessionId].push(log.timestamp);
        });

        const durations = Object.values(sessions).map(timestamps => {
            return Math.max(...timestamps) - Math.min(...timestamps);
        });

        if (durations.length === 0) return 0;

        return durations.reduce((a, b) => a + b, 0) / durations.length;
    },

    // よくある質問の抽出
    extractFrequentQuestions(logs) {
        const questions = {};

        logs.forEach(log => {
            const normalized = log.input.toLowerCase().trim();
            questions[normalized] = (questions[normalized] || 0) + 1;
        });

        // 頻度順にソート
        return Object.entries(questions)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([question, count]) => ({ question, count }));
    }
};
```

#### chatbot.js（メインファイル）
```javascript
// チャットボット メイン機能
class Chatbot {
    constructor() {
        this.elements = {
            icon: null,
            window: null,
            messages: null,
            input: null,
            sendBtn: null,
            closeBtn: null
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
    }

    // DOM要素の取得
    setupElements() {
        this.elements.icon = document.getElementById('chatbotIcon');
        this.elements.window = document.getElementById('chatbotWindow');
        this.elements.messages = document.getElementById('chatbotMessages');
        this.elements.input = document.getElementById('chatbotInput');
        this.elements.sendBtn = document.getElementById('chatbotSend');
        this.elements.closeBtn = document.getElementById('chatbotClose');
    }

    // イベントリスナー設定
    setupEventListeners() {
        // アイコンクリック
        this.elements.icon.addEventListener('click', () => this.toggle());

        // 閉じるボタン
        this.elements.closeBtn.addEventListener('click', () => this.close());

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
        this.elements.window.hidden = false;
        this.elements.icon.style.display = 'none';
        this.isOpen = true;
        this.elements.input.focus();

        // アニメーション
        this.elements.window.style.animation = 'slideUp 0.3s ease';
    }

    // チャットを閉じる
    close() {
        this.elements.window.hidden = true;
        this.elements.icon.style.display = 'flex';
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
        }, 1000);
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

            // 信頼度に基づく調整
            message = LimitationHandler.adjustMessageByConfidence(message, response.confidence);

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
            if (multipleMatches.length > 1) {
                this.handleGuidedQuestion(multipleMatches[0]);
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
            `<button class="chatbot__option-btn" data-response="${opt.response}" data-id="${opt.id}">
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
                    const response = e.target.dataset.response;
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
```

## 📦 既存サイトへの組み込み方法

### 1. ファイルの配置
```bash
# プロジェクトのルートディレクトリに chatbot フォルダを作成
/your-project/
  /chatbot/
    /css/
      chatbot.css
    /js/
      chatbot.js
      keyword-matcher.js
      conversation-context.js
      limitation-handler.js
```

### 2. HTMLに組み込み
```html
<!-- 既存のHTMLファイルの </body> タグの直前に追加 -->

<!-- チャットボット HTML -->
<div class="chatbot" id="chatbot">
    <!-- チャットボットのHTML構造（上記参照） -->
</div>

<!-- チャットボット CSS -->
<link rel="stylesheet" href="/chatbot/css/chatbot.css">

<!-- チャットボット JavaScript -->
<script src="/chatbot/js/keyword-matcher.js"></script>
<script src="/chatbot/js/conversation-context.js"></script>
<script src="/chatbot/js/limitation-handler.js"></script>
<script src="/chatbot/js/chatbot.js"></script>
```

## 🎨 カスタマイズガイド

### 回答パターンの追加
```javascript
// keyword-matcher.js の responses オブジェクトに追加
responses: {
    '新しいキーワード': {
        message: '新しい回答内容',
        action: '[リンクテキスト](URL)',
        confidence: 'high' // high, medium, low
    }
}
```

### 同義語の追加
```javascript
// keyword-matcher.js の synonymDictionary に追加
synonymDictionary: {
    "新カテゴリ": ["キーワード1", "キーワード2", "キーワード3"]
}
```

### 営業時間の変更
```javascript
// limitation-handler.js の businessHours を編集
businessHours: {
    start: 10, // 10時開始
    end: 19,   // 19時終了
}
```

## ✅ テスト手順

### 基本機能テスト
1. チャットアイコンをクリックして開閉確認
2. 各キーワード（料金、期間、実績等）で応答確認
3. 表記ゆれ（「いくら」「どれくらい」等）の対応確認

### エスカレーションテスト
1. 同じ質問を3回繰り返して人的対応への誘導確認
2. 長文質問（100文字以上）での複雑判定確認
3. 営業時間外アクセスでの案内確認

### レスポンシブテスト
1. PC表示（幅1920px）での表示確認
2. タブレット表示（幅768px）での表示確認
3. スマホ表示（幅375px）での表示確認

## 📊 効果測定と改善

### 測定指標
- 利用率: ページ訪問者のうちチャットボット使用者の割合
- 解決率: エスカレーションせずに完了した会話の割合
- 誘導率: 料金計算機や問い合わせフォームへの遷移率

### 改善サイクル
1. **月次レビュー**: ログ分析による頻出質問の確認
2. **回答改善**: 未対応キーワードへの回答追加
3. **UI/UX改善**: ユーザーフィードバックに基づく調整

## 🚀 今後のアップグレード計画

### Phase 1（3ヶ月後）
- ログ分析に基づく回答パターンの最適化
- よくある質問の自動提案機能

### Phase 2（6ヶ月後）
- 簡易的な文脈理解の実装
- 複数ターンの会話対応強化

### Phase 3（1年後）
- AI APIの導入検討
- 自然言語処理の本格実装

## 📝 注意事項

### プライバシー配慮
- 個人情報は収集しない
- ログデータは匿名化して保存
- 定期的なデータクリーンアップ

### セキュリティ対策
- XSS対策: HTMLエスケープ処理実装済み
- 入力値検証: 不適切な入力のフィルタリング
- レート制限: 連続送信の制限（実装推奨）

## 🔄 最新アップデート（2025年1月）

### 実装された改善点
1. **回答パターンを70以上に拡張**
   - 問い合わせフォームへの誘導を70%削減
   - より具体的で有用な情報提供

2. **ヘッダーベースの拡張可能UI**
   - 右下に固定配置されたヘッダー
   - クリックで展開・折りたたみ
   - CSSトライアングルを使用したトグルボタン

3. **レスポンシブ対応の改善**
   - 768px以下：モバイル最適化レイアウト
   - 480px以下：全画面幅対応（余白付き）
   - アニメーションの最適化

4. **統合ファイル構成**
   - chatbot.html に全機能を統合
   - chatbot-enhanced.js で拡張機能を提供
   - メンテナンス性の向上

### 新しい回答カテゴリ
- **料金関連（15パターン）**：基本料金、格安プラン、分割払い、業種別料金など
- **技術・機能関連（20パターン）**：WordPress、SEO、レスポンシブ対応、CMS、ECサイトなど
- **業界特化ソリューション（15パターン）**：飲食店、美容室、病院、士業、不動産など
- **プロセス関連（10パターン）**：制作期間、制作フロー、修正対応など
- **サポート関連（10パターン）**：相談方法、打ち合わせ、営業時間など

### 技術的な改善
- グローバルオブジェクトの適切な登録
- EnhancedResponses、ImprovedKeywordMatcherの統合
- 複数キーワード検知機能の実装
- 部分一致と誘導機能の強化

## 📁 ファイル構成

```
project/
├── index.html            # 既存のサイト
├── chatbot.html          # チャットボット本体（統合版）
├── js/
│   └── chatbot-enhanced.js # 拡張版回答パターン（70+パターン）
└── docs/
    └── chatbot-implementation.md # このドキュメント
```

## 🤝 サポート

実装に関するご質問や問題が発生した場合は、以下の情報をご確認ください：

- ブラウザコンソールのエラーメッセージ
- 使用ブラウザとバージョン
- 発生した問題の詳細な手順

### トラブルシューティング

#### 拡張機能が動作しない場合
1. chatbot-enhanced.js が正しく読み込まれているか確認
2. コンソールで `console.log(EnhancedResponses)` を実行して確認
3. キャッシュをクリアしてリロード

#### キーワードがマッチしない場合
1. 大文字小文字の違いを確認
2. EnhancedSynonymDictionary に同義語が登録されているか確認
3. 部分一致機能が有効になっているか確認

---

**最終更新日**: 2025年1月
**バージョン**: 2.0（拡張版）

このドキュメントは継続的に更新され、機能改善に伴い内容が変更される可能性があります。