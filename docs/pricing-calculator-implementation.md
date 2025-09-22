# 料金自動計算機 機能 仕様書

## 📋 機能概要

WEBサイト制作サービスのポートフォリオサイトに実装された料金自動計算機の仕様書です。

### 基本仕様
- **技術スタック**: HTML + CSS + JavaScript（バニラJS）
- **外部ライブラリ**: EmailJS, jsPDF, カスタムPDF生成器
- **費用**: EmailJS無料枠内（月200通）で運用可能
- **対象環境**: 静的サイトホスティング対応
- **デザインシステム**: ダークテーマ、グリーンアクセント（#00ff88）

## 🎯 主要機能

### 1. リアルタイム料金計算システム

#### 料金カテゴリ
```javascript
【ページ数】
- 1ページ（LP）: ¥100,000
- 5ページ: ¥150,000
- 10ページ: ¥200,000
- 10ページ以上: 個別見積り

【デザイン複雑度】
- テンプレートベース: +¥0
- オリジナルデザイン: +¥30,000
- プレミアムデザイン: +¥50,000
```

#### 追加機能オプション（全26項目）
```javascript
【ページ・コンテンツ関連】(2項目)
- 1ページ追加: +¥10,000
- LPの長さ延長: +¥3,000

【フォーム機能】(2項目)
- お問い合わせフォーム: +¥10,000
- 予約フォーム: +¥20,000

【コンテンツ管理システム】(3項目)
- 基本CMS（ブログ機能）: +¥20,000
- 高度なCMS（カテゴリ・タグ管理）: +¥10,000
- ニュース・お知らせ機能: +¥10,000

【外部サービス連携】(2項目)
- SNS連携（Instagram/Twitter）: +¥5,000
- Google Maps連携: +¥5,000

【SEO・マーケティング】(1項目)
- 基本SEO対策: +¥10,000

【UI/UX・視覚効果】(4項目)
- スライダー・カルーセル: +¥15,000
- アニメーション効果: +¥20,000
- パララックス効果: +¥20,000
- モーダル・ライトボックス: +¥20,000

【WordPress機能・プラグイン】(7項目)
- 高機能エディタ導入: +¥15,000
- FAQ作成: +¥10,000
- WooCommerce基本設定: +¥25,000
- WooCommerce決済設定: +¥15,000
- 会員制サイト構築: +¥35,000
- Yoast SEO設定: +¥10,000
- Polylang設定: +¥15,000
```

### 2. 見積もり依頼システム

#### モーダルフォーム機能
- **お客様情報入力**: 氏名、会社名、メール、電話番号
- **プロジェクト詳細**: 希望納期、詳細要望
- **選択内容表示**: 選択されたオプションの一覧表示
- **リアルタイム料金表示**: 合計金額の自動計算

#### バリデーション機能
```javascript
// 必須項目チェック
- 氏名: 必須、1文字以上
- メールアドレス: 必須、正規表現チェック
- 選択オプション: 最低1つの選択必須

// 任意項目
- 会社名: 制限なし
- 電話番号: 任意
- 詳細要望: 任意
```

### 3. PDF見積書生成機能

#### PDF生成の特徴
- **日本語完全対応**: Canvas APIで日本語を画像化して埋め込み
- **モダンデザイン**: グラデーション、影効果を使用
- **レスポンシブレイアウト**: A4サイズに最適化
- **自動レイアウト**: 項目数に応じた動的配置

#### PDF内容構成
```
1. ヘッダー
   - 会社ロゴ・名称
   - 見積書タイトル
   - 発行日・受付番号

2. お客様情報
   - 氏名・会社名
   - 連絡先情報

3. 見積もり詳細
   - 基本料金
   - 追加オプション
   - 小計・税込み総額

4. フッター
   - 会社情報
   - 連絡先
   - 有効期限
```

### 4. メール自動送信機能

#### EmailJS連携
- **お客様向け確認メール**: 見積もり内容の詳細送信
- **事業者向け通知メール**: 新規見積もり依頼の通知
- **PDF添付**: 生成されたPDF見積書を自動添付
- **受付番号**: 自動生成される6桁の受付番号

#### メールテンプレート
```
件名: [見積依頼 #123456] {{お客様名}}様より

本文:
━━━━━━━━━━━━━━━━━━━━
■ お客様情報
━━━━━━━━━━━━━━━━━━━━
お名前: {{氏名}}
会社名: {{会社名}}
メール: {{メールアドレス}}
電話番号: {{電話番号}}

━━━━━━━━━━━━━━━━━━━━
■ プロジェクト詳細
━━━━━━━━━━━━━━━━━━━━
希望納期: {{納期}}
受付番号: {{受付番号}}
依頼日時: {{日時}}

━━━━━━━━━━━━━━━━━━━━
■ 選択されたオプション
━━━━━━━━━━━━━━━━━━━━
{{選択内容一覧}}

概算金額: {{総額}}

━━━━━━━━━━━━━━━━━━━━
■ その他のご要望
━━━━━━━━━━━━━━━━━━━━
{{詳細要望}}
```

## 📁 ファイル構成

```
/html/
├── pricing-calculator.html    # メインページ（インラインCSS/JS）
├── css/
│   └── pricing-calculator.css # 外部CSS（未分離）
├── js/
│   ├── pricing-calculator.js  # 外部JS（未分離）
│   └── pdf-generator/
│       └── pdf-generator-modern.js # PDF生成専用モジュール
└── docs/
    ├── pricing-calculator-overview.md
    ├── pricing-calculator-features.md
    └── pricing-calculator-implementation.md # この仕様書
```

### 現在の実装状況
- ✅ **機能実装**: 完了
- ❌ **ファイル分離**: 未実装（CSS/JavaScriptがHTML内にインライン）
- ✅ **レスポンシブ対応**: 完了
- ✅ **PDF生成**: 完了
- ⚠️ **EmailJS設定**: 設定値要更新

## ⚙️ 技術実装詳細

### 料金計算ロジック
```javascript
// 料金設定オブジェクト
const pricingConfig = {
    pages: {
        1: 100000,      // 1ページ
        5: 150000,      // 5ページ
        10: 200000,     // 10ページ
        custom: 0       // カスタム
    },
    design: {
        template: 0,    // テンプレート
        custom: 30000,  // オリジナル
        premium: 50000  // プレミアム
    },
    features: {
        'add-page': 10000,
        'contact-form': 10000,
        'booking-form': 20000,
        // ... 全26項目
    }
};

// 料金計算処理
function calculateTotal() {
    let total = 0;

    // ページ数基本料金
    const pages = document.querySelector('input[name="pages"]:checked')?.value;
    total += pricingConfig.pages[pages] || 0;

    // デザイン追加料金
    const design = document.querySelector('input[name="design"]:checked')?.value;
    total += pricingConfig.design[design] || 0;

    // 機能追加料金
    const features = document.querySelectorAll('input[name="features"]:checked');
    features.forEach(feature => {
        total += pricingConfig.features[feature.value] || 0;
    });

    return total;
}
```

### PDF生成処理
```javascript
// 日本語テキスト画像化
function createModernJapaneseImage(text, fontSize, color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // フォント設定
    ctx.font = `${fontSize}px 'Noto Sans JP', 'Yu Gothic', sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // テキスト描画
    const metrics = ctx.measureText(text);
    canvas.width = Math.ceil(metrics.width) + 4;
    canvas.height = fontSize + 8;

    ctx.font = `${fontSize}px 'Noto Sans JP', 'Yu Gothic', sans-serif`;
    ctx.fillStyle = color;
    ctx.fillText(text, 2, 4);

    return {
        dataUrl: canvas.toDataURL('image/png'),
        width: canvas.width * 0.75,  // PDF用スケール調整
        height: canvas.height * 0.75
    };
}

// PDF生成メイン処理
function generateModernQuotePDF(quoteData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');

    // A4サイズ設定
    const pageWidth = 595.28;
    const pageHeight = 841.89;

    // 背景・ヘッダー・コンテンツを順次追加
    addBackground(doc, pageWidth, pageHeight);
    addHeader(doc, pageWidth, quoteData);
    addCustomerInfo(doc, quoteData);
    addQuoteDetails(doc, quoteData);
    addFooter(doc, pageWidth, pageHeight);

    return doc;
}
```

### メール送信処理
```javascript
// EmailJS設定
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// メール送信処理
async function sendEmailWithPDF() {
    try {
        // PDF生成
        const quoteData = collectQuoteData();
        const pdfDoc = generateModernQuotePDF(quoteData);
        const pdfBlob = pdfDoc.output('blob');

        // Base64変換
        const pdfBase64 = await blobToBase64(pdfBlob);

        // EmailJSテンプレートパラメータ
        const templateParams = {
            from_name: quoteData.customerName,
            from_email: quoteData.email,
            company_name: quoteData.companyName,
            phone: quoteData.phone,
            deadline: quoteData.deadline,
            receipt_number: quoteData.receiptNumber,
            request_date: quoteData.requestDate,
            selected_items: quoteData.selectedItemsText,
            total_price: quoteData.totalPriceText,
            message: quoteData.message,
            pdf_attachment: pdfBase64,
            pdf_filename: `見積書_${quoteData.receiptNumber}.pdf`
        };

        // メール送信
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        showSuccessMessage();

    } catch (error) {
        console.error('メール送信エラー:', error);
        showErrorMessage();
    }
}
```

### レスポンシブ対応
```css
/* デスクトップ（769px以上） */
.pricing-calculator__content {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 40px;
}

.pricing-calculator__result {
    position: sticky;
    top: 20px;
    height: fit-content;
}

/* タブレット・モバイル（768px以下） */
@media (max-width: 768px) {
    .pricing-calculator__content {
        grid-template-columns: 1fr;
    }

    .pricing-calculator__result {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: #1a1a1a;
        border-top: 2px solid #00ff88;
        padding: 20px;
        box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.3);
    }
}

/* スマートフォン（480px以下） */
@media (max-width: 480px) {
    .pricing-calculator__option {
        padding: 15px;
    }

    .pricing-calculator__option-title {
        font-size: 0.9rem;
    }

    .pricing-calculator__option-description {
        font-size: 0.75rem;
    }
}
```

## 🔧 カスタマイズ方法

### 料金設定の変更
```javascript
// pricingConfigオブジェクトを編集
const pricingConfig = {
    pages: {
        1: 120000,      // 10万円 → 12万円に変更
        5: 180000,      // 15万円 → 18万円に変更
        10: 250000,     // 20万円 → 25万円に変更
        custom: 0
    }
    // ... 他の設定
};
```

### 新機能オプションの追加
```html
<!-- HTMLに新しいオプションを追加 -->
<div class="pricing-calculator__option">
    <input type="checkbox" id="feature-new" name="features" value="new-feature" class="pricing-calculator__option-input">
    <label for="feature-new" class="pricing-calculator__option-label">
        <div class="pricing-calculator__option-content">
            <div class="pricing-calculator__option-title">新機能</div>
            <div class="pricing-calculator__option-description">新機能の説明</div>
        </div>
        <div class="pricing-calculator__option-price">+¥25,000</div>
    </label>
</div>
```

```javascript
// JavaScriptに料金を追加
features: {
    // 既存機能...
    'new-feature': 25000,  // 新機能: 2.5万円
}
```

### EmailJS設定
```javascript
// 実際の値に置き換える
const EMAILJS_PUBLIC_KEY = 'user_AbCdEfGhIjKlMnOp';  // Account → API Keys
const EMAILJS_SERVICE_ID = 'service_xyz123';        // Email Services
const EMAILJS_TEMPLATE_ID = 'template_abc789';      // Email Templates
```

### PDF会社情報の変更
```javascript
// pdf-generator-modern.js内
// 会社情報を更新
doc.text('あなたの会社名', 105, pageHeight - 20);
doc.text('info@yourcompany.com | 03-1234-5678', 105, pageHeight - 15);
```

## 📊 効果測定・分析

### 取得可能なメトリクス
- **計算機利用数**: ページビュー数
- **見積もり依頼数**: フォーム送信数
- **平均見積もり金額**: 算出される料金の平均
- **人気オプション**: 選択頻度の高い機能
- **離脱ポイント**: どの段階でユーザーが離脱するか

### Google Analytics連携例
```javascript
// イベント追跡
function trackCalculatorEvent(action, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'pricing_calculator',
            'event_label': 'engagement',
            'value': value
        });
    }
}

// 使用例
trackCalculatorEvent('option_selected', 'contact-form');
trackCalculatorEvent('quote_requested', totalPrice);
```

## 🚨 制約事項・注意点

### 技術的制約
- **EmailJS無料枠**: 月200通の送信制限
- **PDF生成**: 日本語フォント読み込みによる初回遅延
- **ファイルサイズ**: PDF添付によるメールサイズ増加
- **ブラウザ対応**: Canvas API対応ブラウザのみ

### 運用上の注意
- **スパム対策**: レート制限の実装推奨
- **データ保護**: 個人情報の適切な取り扱い
- **料金更新**: 定期的な料金見直しと更新
- **メンテナンス**: EmailJS APIキーの管理

### セキュリティ考慮事項
```javascript
// 入力値サニタイズ
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// レート制限
let lastSubmitTime = 0;
function canSubmit() {
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {  // 10秒制限
        return false;
    }
    lastSubmitTime = now;
    return true;
}
```

## 🔄 今後の改善計画

### Phase 1（1ヶ月後）
- CSS/JavaScriptの外部ファイル分離
- TypeScript化の検討
- 入力値バリデーションの強化

### Phase 2（3ヶ月後）
- データベース連携（見積もり履歴管理）
- 管理画面の実装
- A/Bテスト機能の追加

### Phase 3（6ヶ月後）
- AI による料金推定機能
- 多言語対応
- 決済機能との連携

## 📝 メンテナンス項目

### 定期チェック項目
- [ ] 全オプションの料金計算が正確か
- [ ] モーダルが正常に開閉するか
- [ ] PDF生成が正常に動作するか
- [ ] メール送信が成功するか
- [ ] レスポンシブ表示が崩れていないか
- [ ] EmailJS送信数の確認（月200通制限）

### 年次更新項目
- [ ] 料金体系の見直し
- [ ] デザイントレンドの反映
- [ ] 技術スタックの更新検討
- [ ] セキュリティ対策の見直し

---

**最終更新日**: 2025年9月22日
**バージョン**: 1.0（インラインファイル構成版）
**実装形式**: 単一ファイル型（HTML内にCSS/JS統合）
**対応ブラウザ**: Chrome, Safari, Firefox, Edge（最新版）

この仕様書は継続的に更新され、機能改善に伴い内容が変更される可能性があります。