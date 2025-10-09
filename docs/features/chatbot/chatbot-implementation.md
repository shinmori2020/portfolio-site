# チャットボット機能 仕様書

## 📋 機能概要

WEBサイト制作サービスのポートフォリオサイトに実装されたチャットボット機能の仕様書です。

### 基本仕様
- **技術スタック**: HTML + CSS + JavaScript（バニラJS）
- **費用**: ¥0（完全無料・外部API不要）
- **対象環境**: 静的サイトホスティング対応
- **デザインシステム**: ダークテーマ、グリーンアクセント（#00ff88）
- **アーキテクチャ**: 分離型ファイル構成（HTML/CSS/JS独立）

## 🎯 主要機能

### 1. 自動応答システム

#### キーワードマッチング機能
- **基本回答パターン**: 24カテゴリの基本回答
- **拡張回答パターン**: 70+パターンの詳細回答（chatbot-enhanced.js）
- **同義語辞書**: 各カテゴリ平均10個の同義語対応
- **複数キーワード検知**: 1つの質問で複数トピックを同時検知
- **部分一致誘導**: 不完全な質問に対する選択肢提示

#### 対応カテゴリ
```
【料金関連】(15パターン)
- 基本料金、格安プラン、分割払い、追加料金、見積もり無料
- 予算相談、業種別料金、保守費用、ドメイン代、サーバー代
- 他社比較、値引き、学割、紹介割引、キャンセル料

【技術・機能関連】(15パターン)
- CMS、カスタム機能、API連携、データ移行、バックアップ
- アクセス解析、SNS連携、多言語対応、ECサイト、予約システム
- パフォーマンス、セキュリティ、広告連携、フォーム、チャットボット

【業種特化】(10パターン)
- 飲食店、美容室、士業、医療、教育
- 不動産、製造業、小売業、NPO、イベント

【プロセス・サポート】(10パターン)
- 制作フロー、打ち合わせ、修正回数、完成後サポート、操作説明
- 緊急対応、土日対応、リモート、訪問対応、電話サポート

【技術質問】(15パターン)
- JavaScript、React、Vue、データベース、ヘッドレスCMS
- PWA、AMP、GraphQL、Jamstack、WebGL
- WebSocket、Docker、Git、テスト、CI/CD

【その他】(10パターン)
- 納品形式、著作権、レスポンシブ、ブラウザ対応、制作実績
- お客様の声、会社情報、お試し、契約書、開始時期
```

### 2. UI/UXシステム

#### チャットインターフェース
- **展開型ヘッダーUI**: 右下固定配置のヘッダーから展開
- **アニメーション**: CSSトランジション、フェードイン効果
- **タイピングインジケーター**: リアルタイムローディング表示
- **メッセージバブル**: ユーザー/ボット識別可能なデザイン
- **時刻表示**: 各メッセージに送信時刻表示

#### レスポンシブ対応
```css
/* PC画面 (1200px以上) */
.chatbot__container { width: 400px; height: 600px; }

/* タブレット (768px以下) */
.chatbot__container { width: calc(100vw - 40px); max-width: 350px; height: 500px; }

/* スマートフォン (480px以下) */
.chatbot {
    left: 0; right: 0; bottom: 0;
    padding: 0 10px 10px 10px;
}
.chatbot__container { width: 100%; height: 550px; }
```

### 3. 会話管理システム

#### セッション管理
- **LocalStorage活用**: ブラウザ単位でのデータ永続化
- **セッション継続**: 1時間以内の再訪問時に会話履歴復元
- **データ制限**: 最新20件のメッセージのみ保持
- **自動クリーンアップ**: 古いデータの自動削除

#### コンテキスト管理
```javascript
const ConversationContext = {
    sessionId: 'session_timestamp_randomstring',
    conversationHistory: [
        {
            type: 'user'|'bot',
            content: 'メッセージ内容',
            timestamp: 1234567890,
            confidence: 'high'|'medium'|'low'
        }
    ],
    questionCount: {},
    lastInteractionTime: timestamp
}
```

### 4. 制約認識・エスカレーション機能

#### 自動エスカレーション条件
1. **同一質問の繰り返し**: 同じ質問を3回以上
2. **複雑な質問判定**: 100文字以上、複数疑問詞、複数の「？」
3. **営業時間外**: 平日9:00-18:00以外のアクセス
4. **対応範囲外**: キーワードマッチしない質問

#### 制約メッセージ
```javascript
const limitations = {
    outOfScope: "自動応答できません。専門スタッフが対応します。",
    afterHours: "営業時間外です。翌営業日に対応いたします。",
    complex: "複雑な質問のため、専門スタッフによる対応が必要です。",
    escalation: "同じ質問を繰り返されています。専門スタッフにおつなぎします。",
    error: "システムエラーが発生しました。"
}
```

### 5. 拡張機能（chatbot-enhanced.js）

#### 段階的質問誘導
- **選択肢表示**: ボタン形式での選択肢提示
- **複数ステップ**: 段階的な質問で詳細情報を収集
- **動的オプション**: 前の回答に応じた次の選択肢表示

#### 人気質問提案
```javascript
const popularQuestions = [
    '料金はいくらですか？',
    '制作期間はどのくらい？',
    'WordPressで作れますか？',
    '制作実績を見たい',
    'スマホ対応していますか？',
    '保守サポートはありますか？',
    '無料見積もりは可能？',
    'SEO対策は含まれる？'
]
```

#### 分析・ログ機能
- **インタラクションログ**: 質問内容、回答、信頼度の記録
- **基本統計**: 総インタラクション数、ユニークセッション数
- **低信頼度率**: マッチングできなかった質問の割合
- **頻出質問抽出**: よくある質問の自動識別

## 📁 ファイル構成

```
/html/
├── chatbot.html           # チャットボットページ（HTML構造のみ）
├── css/
│   ├── base.css          # ベーススタイル（共通）
│   └── chatbot.css       # チャットボット専用スタイル（438行）
├── js/
│   ├── chatbot.js        # メイン機能（1000+行）
│   └── chatbot-enhanced.js # 拡張機能（1600+行）
└── docs/
    └── chatbot-implementation.md # この仕様書
```

### ファイル詳細

#### chatbot.html
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>チャットボット デモ - WEB制作サービス</title>

    <!-- CSS読み込み -->
    <link rel="stylesheet" href="css/base/base.css">
    <link rel="stylesheet" href="css/pages/chatbot.css">
</head>
<body>
    <!-- チャットボット構造 -->
    <div class="chatbot" id="chatbot">
        <div class="chatbot__container" id="chatbotContainer">
            <!-- ヘッダー -->
            <div class="chatbot__header" id="chatbotHeader">
                <h3 class="chatbot__title">お問い合わせサポート</h3>
                <button class="chatbot__toggle" id="chatbotToggle">
                    <span class="chatbot__toggle-arrow" id="toggleIcon"></span>
                </button>
            </div>

            <!-- チャット本体 -->
            <div class="chatbot__body" id="chatbotBody">
                <div class="chatbot__disclaimer">
                    <p>自動応答中（営業時間: 9:00-18:00）</p>
                </div>
                <div class="chatbot__messages" id="chatbotMessages"></div>
                <div class="chatbot__input-area">
                    <input type="text" class="chatbot__input" id="chatbotInput"
                           placeholder="質問を入力してください...">
                    <button class="chatbot__send" id="chatbotSend">送信</button>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript読み込み -->
    <script src="js/features/chatbot-enhanced.js"></script>
    <script src="js/features/chatbot.js"></script>
</body>
</html>
```

#### chatbot.js (メイン機能)
```javascript
// 主要コンポーネント
const KeywordMatcher = {
    synonymDictionary: { /* 同義語辞書 */ },
    responses: { /* 回答パターン */ },
    findMatch(input) { /* マッチング処理 */ }
};

const ConversationContext = {
    sessionId: null,
    conversationHistory: [],
    init() { /* 初期化 */ },
    addMessage(type, content, confidence) { /* メッセージ追加 */ },
    checkEscalation() { /* エスカレーション判定 */ }
};

const LimitationHandler = {
    businessHours: { start: 9, end: 18 },
    limitations: { /* 制約メッセージ */ },
    isBusinessHours() { /* 営業時間判定 */ },
    isComplexQuestion(input) { /* 複雑質問判定 */ }
};

class Chatbot {
    constructor() { /* チャットボット初期化 */ }
    init() { /* DOM要素設定、イベントリスナー */ }
    sendMessage() { /* メッセージ送信処理 */ }
    processResponse(input) { /* 応答生成処理 */ }
    addUserMessage(content) { /* ユーザーメッセージ表示 */ }
    addBotMessage(content) { /* ボットメッセージ表示 */ }
}
```

#### chatbot-enhanced.js (拡張機能)
```javascript
// 拡張コンポーネント
const EnhancedResponses = {
    // 70+の詳細回答パターン
    '料金': { message: '...', action: '...', confidence: 'high' },
    '格安': { message: '...', action: '...', confidence: 'high' },
    // ... 省略
};

const EnhancedSynonymDictionary = {
    // 拡張同義語辞書（各カテゴリ平均15語）
    "料金": ["料金", "価格", "費用", "コスト", ...],
    "JavaScript": ["JavaScript", "JS", "ジャバスクリプト", ...],
    // ... 省略
};

const MultiKeywordHandler = {
    detectMultipleTopics(input) { /* 複数トピック検知 */ },
    generateCompositeResponse(topics) { /* 複合回答生成 */ }
};

const ImprovedKeywordMatcher = {
    findBestMatch(input) { /* 改善されたマッチング */ }
};
```

## ⚙️ 技術実装詳細

### 初期化プロセス
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // 1. ConversationContext初期化
    ConversationContext.init();

    // 2. Chatbotインスタンス作成
    window.chatbot = new Chatbot();

    // 3. ウェルカムメッセージ表示
    setTimeout(() => {
        chatbot.showWelcomeMessage();
    }, 1000);
});
```

### メッセージ処理フロー
```
1. ユーザー入力
   ↓
2. 入力値検証（不適切な内容チェック）
   ↓
3. エスカレーション判定
   ↓
4. 複雑質問判定
   ↓
5. キーワードマッチング
   ├─ 拡張レスポンス優先
   ├─ 複数キーワード検知
   ├─ 部分一致誘導
   └─ フォールバック応答
   ↓
6. 応答メッセージ生成
   ↓
7. UI表示・ログ保存
```

### データ永続化
```javascript
// LocalStorage構造
{
    "chatbot_context": {
        sessionId: "session_1234567890_abc123",
        conversationHistory: [...],
        questionCount: {...},
        lastInteractionTime: 1234567890
    },
    "chatbot_logs": [
        {
            timestamp: 1234567890,
            input: "質問内容",
            response: "回答内容",
            confidence: "high",
            sessionId: "session_id"
        }
    ]
}
```

## 🔧 カスタマイズ方法

### 回答パターン追加
```javascript
// chatbot.js の responses オブジェクトに追加
responses: {
    '新しいキーワード': {
        message: '回答内容',
        action: '[リンクテキスト](URL)',
        confidence: 'high'
    }
}
```

### 同義語追加
```javascript
// synonymDictionary に追加
synonymDictionary: {
    "新カテゴリ": ["キーワード1", "キーワード2", "キーワード3"]
}
```

### 営業時間変更
```javascript
// LimitationHandler の businessHours を編集
businessHours: {
    start: 10, // 10時開始
    end: 19,   // 19時終了
}
```

### スタイルカスタマイズ
```css
/* chatbot.css でカラーテーマ変更 */
:root {
    --chatbot-primary: #00ff88;    /* メインカラー */
    --chatbot-bg: #1a1a1a;        /* 背景色 */
    --chatbot-text: #ffffff;      /* テキスト色 */
}
```

## 📊 効果測定・分析

### 取得可能なメトリクス
- **総インタラクション数**: チャットボット使用回数
- **ユニークセッション数**: 重複を除いた利用者数
- **低信頼度率**: マッチングできなかった質問の割合
- **平均セッション長**: 1セッションあたりの継続時間
- **頻出質問トップ10**: よくある質問ランキング
- **エスカレーション率**: 人的対応に移行した割合

### 分析データ取得
```javascript
// 分析データの取得
const analytics = EnhancedResponses.getAnalyticsData();
console.log(analytics);

// 出力例
{
    stats: {
        totalInteractions: 150,
        uniqueSessions: 45,
        lowConfidenceRate: 0.15,
        averageSessionLength: 300000
    },
    frequentQuestions: [
        { question: "料金はいくら", count: 25 },
        { question: "制作期間", count: 18 },
        // ...
    ]
}
```

## 🚨 制約事項・注意点

### 技術的制約
- **外部API不使用**: インターネット接続不要だが、高度な自然言語処理は不可
- **LocalStorage依存**: ブラウザ単位でのデータ管理、容量制限5-10MB
- **キーワードベース**: 文脈理解や意図推測は限定的
- **静的レスポンス**: 動的な学習・改善機能なし

### 運用上の注意
- **定期的なキーワード更新**: ユーザーの質問傾向に応じて同義語辞書を更新
- **エスカレーション対応**: 人的対応への適切な誘導設計
- **レスポンス品質**: 回答内容の定期的な見直し・改善
- **分析活用**: ログデータを活用した継続的な機能改善

## 🔄 今後の改善計画

### Phase 1（3ヶ月後）
- ログ分析に基づく回答パターン最適化
- よくある質問の自動提案機能強化
- UI/UXの改善（アニメーション、操作性）

### Phase 2（6ヶ月後）
- 簡易的な文脈理解の実装
- 複数ターンの会話対応強化
- A/Bテスト機能の実装

### Phase 3（1年後）
- AI API（ChatGPT等）の統合検討
- 自然言語処理の本格実装
- 多言語対応の検討

## 📝 セキュリティ・プライバシー

### セキュリティ対策
- **XSS対策**: HTMLエスケープ処理実装済み
- **入力値検証**: 不適切な入力のフィルタリング
- **CSP設定**: Content Security Policy 推奨
- **レート制限**: 連続送信の制限（実装推奨）

### プライバシー配慮
- **個人情報非収集**: 名前、連絡先等の個人情報は収集しない
- **ログデータ匿名化**: セッションIDのみで個人特定不可
- **データ保持期間**: LocalStorageの定期クリーンアップ
- **透明性**: データ利用目的の明示

---

**最終更新日**: 2025年9月22日
**バージョン**: 4.0（分離型ファイル構成版）
**実装形式**: モジュール型（HTML/CSS/JS分離）
**対応ブラウザ**: Chrome, Safari, Firefox, Edge（最新版）

この仕様書は継続的に更新され、機能改善に伴い内容が変更される可能性があります。