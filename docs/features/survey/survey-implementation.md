# 📊 WEBサイト評価アンケート実装ガイド

**作成日：2025年9月25日**

## 📋 概要

WEBサイト評価アンケートシステムは、2つのバージョンで構成されています：
- **Survey A（ページ版）** - 独立したアンケートページ
- **Survey B（モーダル版）** - 離脱意図検知で自動表示されるポップアップ

## 🎯 主な特徴

- 10問の段階的質問フロー
- リアルタイムプログレスバー
- LocalStorageによる回答保存
- Cookieベースの重複表示防止
- 完全レスポンシブ対応
- カスタマイズ可能な表示条件

## 📁 ファイル構成

```
html/
├── website-evaluation-survey.html    # メインアンケートページ
├── css/
│   ├── survey-common.css            # 共通スタイル
│   ├── survey-modal.css             # モーダル版専用スタイル
│   └── survey-page.css              # ページ版専用スタイル
└── js/
    ├── survey-modal.js              # モーダル版JavaScript
    └── survey-page.js               # ページ版JavaScript
```

## 🚀 他のページへの導入方法

### 基本的な実装手順

#### 1. **必要なファイルのリンク**

```html
<!-- head内に追加 -->
<link rel="stylesheet" href="css/survey-common.css">
<link rel="stylesheet" href="css/survey-modal.css">
```

#### 2. **モーダルHTMLの追加**

```html
<!-- body内に追加（website-evaluation-survey.htmlから15-341行目をコピー） -->
<div class="modal-overlay" id="surveyModal">
    <!-- モーダル内容 -->
</div>
```

#### 3. **JavaScriptの読み込みと初期化**

```html
<!-- body末尾に追加 -->
<script src="js/survey/survey-modal.js"></script>
<script>
    // 初期化
    initModalSurvey({
        minTimeOnSite: 30000,     // 30秒後に表示
        enableCookieCheck: true    // Cookie確認有効
    });
</script>
```

## ⚙️ オプション設定

### 現在利用可能なオプション

```javascript
initModalSurvey({
    // 最小滞在時間（ミリ秒）
    minTimeOnSite: 30000,        // デフォルト: 30000 (30秒)

    // Cookie確認の有効/無効
    enableCookieCheck: true      // デフォルト: true
});
```

### テスト用設定例

```javascript
// 開発・テスト時の設定
initModalSurvey({
    minTimeOnSite: 2000,         // 2秒で表示（テスト用）
    enableCookieCheck: false     // Cookie無視（テスト用）
});
```

### 本番環境設定例

```javascript
// 本番環境の推奨設定
initModalSurvey({
    minTimeOnSite: 30000,        // 30秒
    enableCookieCheck: true       // Cookie確認有効
});
```

## 🔧 カスタマイズ可能な項目

### 表示トリガー条件

現在の実装では以下の条件で表示されます：

1. **PC環境**
   - マウスが画面上部に移動（離脱意図）
   - 90%スクロール時

2. **モバイル環境**
   - 70%スクロール時

### Cookie管理

- `survey_shown`: アンケート表示済み（24時間有効）
- `survey_responded`: アンケート回答済み（30日有効）

### LocalStorage

- `modalSurveyAnswers`: モーダル版の回答データ
- `pageSurveyAnswers`: ページ版の回答データ

## 📊 データ送信

### Google Apps Script連携（要設定）

```javascript
// survey-modal.js内のsubmitToGAS関数
async submitToGAS(data) {
    const GAS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';  // ←ここにURLを設定

    const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('送信に失敗しました');
    }

    return response.json();
}
```

### 送信されるデータ形式

```javascript
{
    timestamp: "2025/09/25 12:34:56",
    survey_type: "modal",  // または "page"
    usability: "使いやすい",
    design_preference: "とても好き",
    info_findability: "すぐ見つかった（1分以内）",
    text_readability: "ちょうど良い",
    page_speed: "速い（2-3秒）",
    device: "デスクトップPC",
    competitor_comparison: "優れている",
    site_impression: "プロフェッショナル",
    contact_intention: "検討中",
    overall_rating: "★★★★☆（良い）",
    user_agent: "Mozilla/5.0...",
    page_url: "https://example.com/page"
}
```

## 🎨 デザインカスタマイズ

### カラーテーマの変更

`css/survey-common.css`内の以下の値を変更：

```css
/* メインカラー */
--survey-primary: #00ff88;
--survey-primary-dark: #00cc6a;

/* 背景色 */
--survey-bg: #1a1a1a;
--survey-bg-dark: #0a0a0a;
```

### アニメーション速度の調整

```css
/* トランジション時間 */
.question {
    transition: all 0.4s ease;  /* ← この値を変更 */
}
```

## 📱 レスポンシブ対応

### ブレークポイント

- デスクトップ: 1200px以上
- タブレット: 768px - 1199px
- モバイル: 480px - 767px
- 小型モバイル: 480px未満

## 🐛 トラブルシューティング

### モーダルが表示されない場合

1. Cookie確認を無効化してテスト
2. コンソールでエラーを確認
3. 必要なHTML要素のIDが存在するか確認

### スタイルが適用されない場合

1. CSSファイルのパスを確認
2. survey-common.cssが読み込まれているか確認
3. 他のCSSとの競合を確認

### 回答が保存されない場合

1. LocalStorageが有効か確認
2. プライベートブラウジングモードではないか確認
3. コンソールでエラーを確認

## 🚀 今後の拡張可能性

- 質問内容の動的変更機能
- A/Bテスト機能
- リアルタイムアナリティクス連携
- 多言語対応
- AIによる回答分析
- カスタムイベントトリガー
- 条件分岐による質問変更

## 📞 サポート

実装に関する質問や問題が発生した場合は、プロジェクトドキュメントを参照するか、開発チームまでお問い合わせください。

---

**最終更新日：2025年9月25日**