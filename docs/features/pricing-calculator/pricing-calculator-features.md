# 料金自動計算機 - 機能詳細とセットアップガイド

## 📧 EmailJS セットアップ完全ガイド

### ステップ1: EmailJSアカウント作成

1. [EmailJS.com](https://www.emailjs.com/) にアクセス
2. 「Sign Up Free」をクリック
3. メールアドレスとパスワードを入力して登録

### ステップ2: Email Service を設定

1. ダッシュボードで「Email Services」をクリック
2. 「Add New Service」をクリック
3. サービスを選択（推奨：Gmail）

#### Gmail設定の場合：
```
Service Name: Gmail Service（任意の名前）
Service ID: service_xxxxxx（自動生成・メモする）

Gmailアカウントと連携:
1. 「Connect Account」をクリック
2. Googleアカウントでログイン
3. EmailJSへのアクセスを許可
```

### ステップ3: Email Template を作成

1. 「Email Templates」→「Create New Template」
2. 以下の内容を設定：

#### To Email（送信先）:
```
your-email@example.com
```

#### Subject（件名）:
```
[見積依頼 #{{receipt_number}}] {{from_name}}様より
```

#### Content（本文）:
```
新しい見積もり依頼が届きました。

━━━━━━━━━━━━━━━━━━━━
■ お客様情報
━━━━━━━━━━━━━━━━━━━━
お名前: {{from_name}}
会社名: {{company_name}}
メール: {{from_email}}
電話番号: {{phone}}

━━━━━━━━━━━━━━━━━━━━
■ プロジェクト詳細
━━━━━━━━━━━━━━━━━━━━
希望納期: {{deadline}}
受付番号: {{receipt_number}}
依頼日時: {{request_date}}

━━━━━━━━━━━━━━━━━━━━
■ 選択されたオプション
━━━━━━━━━━━━━━━━━━━━
{{selected_items}}

概算金額: {{total_price}}

━━━━━━━━━━━━━━━━━━━━
■ その他のご要望
━━━━━━━━━━━━━━━━━━━━
{{message}}

---
このメールは料金自動計算機から自動送信されました。
```

3. 「Save」をクリック
4. Template IDをメモ（例：template_xxxxxx）

### ステップ4: コードに設定を反映

`pricing-calculator.html`の1313-1315行目を編集：

```javascript
// 変更前
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// 変更後（実際の値に置き換え）
const EMAILJS_PUBLIC_KEY = 'user_AbCdEfGhIjKlMnOp';  // Account → API Keys
const EMAILJS_SERVICE_ID = 'service_xyz123';        // Email Services
const EMAILJS_TEMPLATE_ID = 'template_abc789';      // Email Templates
```

### ステップ5: ドメイン制限（Netlify用）

1. EmailJS Dashboard → Email Services → 設定アイコン
2. 「Whitelist Domains」に追加：
```
your-site.netlify.app
localhost:3000（開発用）
```

## 🚀 Netlify デプロイ設定

### 基本的なデプロイ手順

1. **GitHubリポジトリと連携**
```bash
# ローカルで確認
git status
git add .
git commit -m "Add pricing calculator"
git push origin main
```

2. **Netlifyでサイト作成**
- Netlifyにログイン
- 「Add new site」→「Import an existing project」
- GitHubを選択してリポジトリを連携
- デプロイ設定はデフォルトでOK

3. **環境変数は不要**
- EmailJSのPublic Keyは公開しても安全
- ドメイン制限で保護される

### カスタムドメイン設定（オプション）

```
1. Domain settings → Add custom domain
2. your-domain.com を入力
3. DNSレコードを設定：
   A record: 75.2.60.5
   CNAME: your-site.netlify.app
```

## 📄 PDF生成機能の詳細

### PDF生成の仕組み

```javascript
// js/pdf-generator/pdf-generator-modern.js

// 日本語テキストを画像化して埋め込む
function createModernJapaneseImage(text, fontSize, color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Canvas APIで日本語を描画
    // → dataURLに変換
    // → PDFに画像として埋め込み
}
```

### PDFカスタマイズ

#### 会社情報の変更（465-466行目）
```javascript
// 変更前
doc.text('Web Development Services', 105, pageHeight - 20);
doc.text('contact@example.com | 000-0000-0000', 105, pageHeight - 15);

// 変更後（あなたの会社情報）
doc.text('株式会社サンプル', 105, pageHeight - 20);
doc.text('info@sample.co.jp | 03-1234-5678', 105, pageHeight - 15);
```

#### カラーテーマの変更
```javascript
// pdf-generator-modern.js 11-21行目
const COLORS = {
    primary: '#2C3E50',      // メインテキスト色
    accent: '#16A085',       // アクセント色を変更
    background: '#FAFAFA',   // 背景色
    // ...
};
```

## 🔧 トラブルシューティング

### よくある問題と解決方法

#### 1. EmailJSが動作しない

**症状**: ボタンを押してもメールが送信されない

**確認事項**:
```javascript
// コンソールで確認
console.log(EMAILJS_PUBLIC_KEY);  // 'YOUR_PUBLIC_KEY'のままではないか？
console.log(emailjs);              // EmailJS SDKが読み込まれているか？
```

**解決方法**:
1. API Keyが正しく設定されているか確認
2. ドメイン制限を確認（localhostも追加）
3. 月間送信数の上限（200通）を確認

#### 2. PDFの日本語が文字化けする

**症状**: PDF内の日本語が□□□と表示される

**原因**: 直接日本語テキストを埋め込もうとしている

**解決方法**:
```javascript
// NG: 直接テキストを追加
doc.text('日本語テキスト', x, y);

// OK: 画像として追加
const textImage = createModernJapaneseImage('日本語テキスト', 12, '#000');
doc.addImage(textImage.dataUrl, 'PNG', x, y, textImage.width, textImage.height);
```

#### 3. モーダルが開かない

**症状**: ボタンをクリックしてもモーダルが表示されない

**デバッグ方法**:
```javascript
// コンソールで手動実行
openQuoteModal();  // これで開くか確認

// イベントリスナーの確認
console.log(document.querySelector('.pricing-calculator__button'));
```

#### 4. 価格が更新されない

**症状**: オプションを選択しても価格が変わらない

**確認コード**:
```javascript
// 手動で価格更新
updatePrice();

// 選択状態を確認
console.log(document.querySelectorAll('input:checked'));
```

## 🎨 高度なカスタマイズ

### モーダルにローディング画面を追加

```javascript
// 送信中の全画面ローディング
function showFullScreenLoader() {
    const loader = document.createElement('div');
    loader.id = 'fullscreen-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>送信中...</p>
        </div>
    `;
    document.body.appendChild(loader);
}
```

### 選択内容の保存（LocalStorage）

```javascript
// 選択内容を保存
function saveSelections() {
    const data = {
        pages: document.querySelector('input[name="pages"]:checked')?.value,
        design: document.querySelector('input[name="design"]:checked')?.value,
        features: Array.from(document.querySelectorAll('input[name="features"]:checked'))
            .map(input => input.value)
    };
    localStorage.setItem('pricing-selections', JSON.stringify(data));
}

// 選択内容を復元
function loadSelections() {
    const saved = localStorage.getItem('pricing-selections');
    if (saved) {
        const data = JSON.parse(saved);
        // 選択状態を復元
    }
}
```

### Google Analytics イベント追跡

```javascript
// 見積もり送信をトラッキング
function trackQuoteSubmission() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'submit_quote', {
            'event_category': 'engagement',
            'event_label': 'pricing_calculator',
            'value': getTotalPrice()
        });
    }
}
```

## 📊 パフォーマンス最適化

### 遅延読み込み

```javascript
// EmailJS SDKを必要時のみ読み込み
function loadEmailJS() {
    if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        };
        document.head.appendChild(script);
    }
}
```

### デバウンス処理

```javascript
// 価格更新を最適化
let updateTimer;
function debouncedUpdatePrice() {
    clearTimeout(updateTimer);
    updateTimer = setTimeout(updatePrice, 100);
}
```

## 🔒 セキュリティ考慮事項

### XSS対策

```javascript
// ユーザー入力をサニタイズ
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}
```

### レート制限

```javascript
// 連続送信を防ぐ
let lastSubmitTime = 0;
function canSubmit() {
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {  // 10秒制限
        alert('しばらくお待ちください');
        return false;
    }
    lastSubmitTime = now;
    return true;
}
```

## 📚 関連リソース

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [jsPDF Documentation](https://rawgit.com/MrRio/jsPDF/master/docs/)
- [Netlify Documentation](https://docs.netlify.com/)
- [BEM Methodology](http://getbem.com/)

## 🆘 サポート

問題が解決しない場合：

1. ブラウザのコンソールエラーを確認
2. ネットワークタブで通信エラーを確認
3. EmailJSのダッシュボードでログを確認
4. このドキュメントのトラブルシューティングを再確認

---

前のドキュメント: [料金計算機 - 概要編](pricing-calculator-overview.md)