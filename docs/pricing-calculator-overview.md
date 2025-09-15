# 料金自動計算機 - 概要とカスタマイズガイド

## 📊 システム概要

`pricing-calculator.html`は、Webサイト制作の料金を自動計算し、見積もり依頼まで完結できる高機能な料金計算システムです。

### 主な機能
- ✅ リアルタイム料金計算
- ✅ 見積もり依頼フォーム（モーダル）
- ✅ PDF見積書生成
- ✅ EmailJS/mailto送信対応
- ✅ レスポンシブ対応

## 🎨 デザイン仕様

### カラーパレット
```css
/* メインカラー */
--bg-primary: #0a0a0a;      /* 背景色（ダークブラック） */
--bg-secondary: #1a1a1a;    /* セクション背景（ダークグレー） */
--accent: #00ff88;          /* アクセントカラー（ネオングリーン） */
--border: #333;             /* ボーダー色 */
--text-primary: #fff;       /* メインテキスト */
--text-secondary: #aaa;     /* サブテキスト */
```

### レイアウト構造
```
┌─────────────────────────────────────────┐
│          ヘッダー（タイトル）              │
├────────────────┬────────────────────────┤
│                │                        │
│  選択エリア     │   結果表示エリア        │
│  (左側)        │   (右側・sticky)       │
│                │                        │
│  ・ページ数     │   ・合計金額           │
│  ・デザイン     │   ・内訳               │
│  ・追加機能     │   ・アクションボタン    │
│                │                        │
└────────────────┴────────────────────────┘
```

## 💰 料金設定のカスタマイズ

### 基本料金の変更方法

`pricingConfig`オブジェクトを編集します（1323-1365行目）：

```javascript
const pricingConfig = {
    // ページ数の料金
    pages: {
        1: 100000,      // 1ページ：10万円
        5: 150000,      // 5ページ：15万円
        10: 200000,     // 10ページ：20万円
        custom: 0       // カスタム：個別見積もり
    },

    // デザインの追加料金
    design: {
        template: 0,    // テンプレート：追加料金なし
        custom: 80000,  // オリジナル：8万円追加
        premium: 180000 // プレミアム：18万円追加
    },

    // 機能ごとの追加料金
    features: {
        'contact-form': 10000,  // お問い合わせフォーム：1万円
        'booking-form': 20000,  // 予約フォーム：2万円
        'basic-cms': 20000,     // 基本CMS：2万円
        // ... 他の機能
    }
};
```

### 新しいオプションを追加する方法

#### 1. HTMLに選択肢を追加

```html
<!-- 例：新しい機能カテゴリを追加 -->
<div class="pricing-calculator__form-group">
    <h3 class="pricing-calculator__form-title">新機能カテゴリ</h3>
    <div class="pricing-calculator__options">
        <div class="pricing-calculator__option">
            <input type="checkbox" id="feature-new" name="features" value="new-feature">
            <label for="feature-new" class="pricing-calculator__option-label">
                <div class="pricing-calculator__option-content">
                    <div class="pricing-calculator__option-title">新機能名</div>
                    <div class="pricing-calculator__option-description">説明文</div>
                </div>
                <div class="pricing-calculator__option-price">+¥30,000</div>
            </label>
        </div>
    </div>
</div>
```

#### 2. JavaScriptに料金を追加

```javascript
features: {
    // 既存の機能...
    'new-feature': 30000,  // 新機能：3万円
}
```

## 📱 レスポンシブ対応

### ブレークポイント
- **デスクトップ**: 769px以上
- **タブレット/モバイル**: 768px以下
- **スマートフォン**: 480px以下

### モバイル時の特別な挙動

#### 価格表示の固定配置
768px以下では、価格表示が画面下部に固定されます：

```javascript
// 1844-1881行目
function setupMobilePriceDisplay() {
    const isMobile = () => window.innerWidth <= 768;

    if (isMobile()) {
        // 価格表示を下部固定
        priceDisplay.classList.add('pricing-calculator__price-display--in-place');
    }
}
```

### カスタマイズ例：ブレークポイントの変更

```css
/* 例：タブレット用のブレークポイントを変更 */
@media (max-width: 1024px) {  /* 768px → 1024px */
    .pricing-calculator__content {
        grid-template-columns: 1fr;
    }
}
```

## 🔧 よくあるカスタマイズ

### 1. アクセントカラーの変更

全ての`#00ff88`を別の色に置換：

```css
/* 例：青色に変更 */
.pricing-calculator__form-title {
    color: #0088ff;  /* 緑 → 青 */
}
```

### 2. フォントの変更

```css
body {
    font-family: 'Noto Sans JP', 'Inter', sans-serif;  /* 日本語フォント優先 */
}
```

### 3. アニメーション速度の調整

```css
/* 価格更新アニメーションを高速化 */
@keyframes countUp {
    /* animation: countUp 0.8s → 0.3s */
}

.pricing-calculator__total-price--count-up {
    animation: countUp 0.3s ease-out;  /* 0.8s → 0.3s */
}
```

## 📂 ファイル構成

```
pricing-calculator.html
├── CSS（内部スタイル）
│   ├── 基本スタイル（12-373行目）
│   ├── モーダルスタイル（377-789行目）
│   └── レスポンシブ（305-373, 791-811行目）
│
├── JavaScript（内部スクリプト）
│   ├── EmailJS設定（1271-1320行目）
│   ├── 料金設定（1323-1365行目）
│   ├── 計算ロジック（1430-1519行目）
│   └── モーダル制御（1537-1790行目）
│
└── 外部依存
    ├── jsPDF（PDF生成）
    ├── EmailJS SDK（メール送信）
    └── pdf-generator-modern.js（カスタムPDF）
```

## 🎯 ベストプラクティス

### DO ✅
- BEM記法でクラス名を追加する
- 料金変更は`pricingConfig`で一元管理
- レスポンシブ確認は必須
- コメントを追加して保守性を高める

### DON'T ❌
- HTMLに直接価格を書かない（表示用のみ）
- インラインスタイルの使用を避ける
- グローバル変数を増やさない
- 既存の構造を大きく変更しない

## 🔍 デバッグ方法

### コンソールで価格を確認
```javascript
// 現在の設定を確認
console.log(pricingConfig);

// 選択されている項目を確認
console.log(document.querySelector('input[name="pages"]:checked').value);
```

### 価格計算のテスト
```javascript
// 手動で価格更新を実行
updatePrice();
```

## 📝 メンテナンスチェックリスト

定期的に確認すべき項目：

- [ ] 全オプションの価格が正しく計算されるか
- [ ] モバイル表示が崩れていないか
- [ ] モーダルが正常に開閉するか
- [ ] PDFが正しく生成されるか
- [ ] フォーム送信が動作するか

---

次のドキュメント: [料金計算機 - 機能詳細編](pricing-calculator-features.md)