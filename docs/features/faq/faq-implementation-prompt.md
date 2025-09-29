# よくある質問（FAQ）ページ実装プロンプト

## 🎯 実装目標
WEBサイト制作サービスのポートフォリオサイトに、検索・絞り込み機能付きの高機能FAQページを実装する。顧客の疑問を即座に解決し、お問い合わせ前の不安を取り除くことでコンバージョン率向上を図る。

## 📋 技術仕様
- **技術**: HTML5 + CSS3 + JavaScript（バニラJS）
- **費用**: ¥0（完全無料）
- **対象環境**: Netlify静的サイトホスティング対応
- **デザイン**: 既存サイトのBEM記法、ダークテーマ、グリーンアクセント(#00ff88)に統一

## 🔧 実装する主要機能

### **1. カテゴリー別FAQ構成**

#### **制作に関するQ&A**
```json
{
  "category": "制作関連",
  "color": "#00ff88",
  "questions": [
    {
      "id": 1,
      "question": "どのような技術でサイトを制作していますか？",
      "answer": "HTML5、CSS3、JavaScript、WordPress等の最新技術を使用しています。SEO対策、レスポンシブデザイン、高速表示を重視した制作を行っています。",
      "tags": ["技術", "HTML", "CSS", "JavaScript", "WordPress", "SEO"]
    },
    {
      "id": 2,
      "question": "デザインはオリジナルで制作してもらえますか？",
      "answer": "はい、完全オリジナルデザインで制作いたします。お客様のブランドイメージや業界特性に合わせたデザインをご提案します。参考サイトがあればお聞かせください。",
      "tags": ["デザイン", "オリジナル", "ブランド"]
    },
    {
      "id": 3,
      "question": "スマートフォン対応は含まれますか？",
      "answer": "はい、レスポンシブデザインによるスマートフォン・タブレット対応は標準で含まれています。どのデバイスでも快適に閲覧できるよう最適化いたします。",
      "tags": ["スマホ対応", "レスポンシブ", "モバイル"]
    },
    {
      "id": 4,
      "question": "SEO対策はどこまで対応していますか？",
      "answer": "メタタグ最適化、構造化データ実装、サイトマップ作成、表示速度最適化など基本的なSEO対策は全プランに含まれています。より高度なSEO対策も別途対応可能です。",
      "tags": ["SEO", "メタタグ", "構造化データ", "サイトマップ"]
    },
    {
      "id": 5,
      "question": "WordPressのカスタマイズは可能ですか？",
      "answer": "はい、WordPressの豊富なカスタマイズ経験があります。独自プラグイン開発、カスタム投稿タイプ、既存テーマのカスタマイズなど、ご要望に応じて対応いたします。",
      "tags": ["WordPress", "カスタマイズ", "プラグイン"]
    }
  ]
}
```

#### **料金・納期に関するQ&A**
```json
{
  "category": "料金・納期",
  "color": "#00ccff",
  "questions": [
    {
      "id": 6,
      "question": "制作費用はいくらですか？",
      "answer": "LP制作：10万円〜、WEB制作：30万円〜、WordPress制作：50万円〜が目安です。詳細は無料お見積りにて、お客様のご要望に応じた正確な金額をご提示いたします。",
      "tags": ["料金", "費用", "価格", "見積り"]
    },
    {
      "id": 7,
      "question": "追加料金は発生しますか？",
      "answer": "基本的に初回お見積り金額から追加料金は発生しません。大幅な仕様変更や追加ページがある場合は事前にお見積りをお渡しし、ご承諾いただいてから作業いたします。",
      "tags": ["追加費用", "見積り", "仕様変更"]
    },
    {
      "id": 8,
      "question": "制作期間はどのくらいですか？",
      "answer": "LP制作：2-3週間、WEB制作：3-4週間、WordPress制作：4-6週間が目安です。お急ぎの場合はご相談ください。可能な限り対応いたします。",
      "tags": ["制作期間", "納期", "スケジュール", "急ぎ"]
    },
    {
      "id": 9,
      "question": "支払い方法を教えてください",
      "answer": "銀行振込、クレジットカード決済に対応しています。分割払い（2回・3回）も可能です。詳しくは無料相談でご説明いたします。",
      "tags": ["支払い", "銀行振込", "クレジット", "分割"]
    },
    {
      "id": 10,
      "question": "修正は何回まで可能ですか？",
      "answer": "デザイン確定前は無制限で修正対応いたします。コーディング着手後は3回まで無料、それ以降は別途お見積りとなります。",
      "tags": ["修正", "回数", "無料"]
    }
  ]
}
```

#### **サポート・運用に関するQ&A**
```json
{
  "category": "サポート・運用",
  "color": "#ff88cc",
  "questions": [
    {
      "id": 11,
      "question": "納品後のサポートはありますか？",
      "answer": "納品後3ヶ月間は無料サポート期間として、軽微な修正や操作方法のサポートを行います。その後も保守契約プラン（月額1万円〜）をご用意しています。",
      "tags": ["サポート", "保守", "アフターケア", "納品後"]
    },
    {
      "id": 12,
      "question": "ドメイン・サーバーの契約は必要ですか？",
      "answer": "はい、別途必要となります。取得・契約代行も承っております（手数料5,000円）。お客様に最適なプランをご提案し、初期設定まで対応いたします。",
      "tags": ["ドメイン", "サーバー", "レンタルサーバー", "代行"]
    },
    {
      "id": 13,
      "question": "SSL証明書の設定は含まれますか？",
      "answer": "はい、SSL証明書（無料版）の設定は標準で含まれています。有料SSL証明書をご希望の場合も対応可能です。",
      "tags": ["SSL", "証明書", "セキュリティ", "HTTPS"]
    },
    {
      "id": 14,
      "question": "Google Analyticsの設定はしてもらえますか？",
      "answer": "Google Analytics、Google Search Consoleの設定・初期設定は基本プランに含まれています。レポートの見方もご説明いたします。",
      "tags": ["Analytics", "Google", "解析", "アクセス解析"]
    },
    {
      "id": 15,
      "question": "既存サイトのリニューアルも対応していますか？",
      "answer": "はい、既存サイトのリニューアルも承っています。現状分析から改善提案、データ移行まで全て対応いたします。",
      "tags": ["リニューアル", "改修", "移行"]
    }
  ]
}
```

### **2. インタラクティブ機能**

#### **リアルタイム検索**
- キーワード入力で即座に絞り込み
- 質問・回答・タグから検索
- 検索履歴の保存

#### **絞り込み機能**
- カテゴリー別表示
- タグによる絞り込み
- 複数条件での AND/OR 検索

#### **アコーディオン表示**
- スムーズな開閉アニメーション
- 複数同時展開/単一展開切り替え
- アイコン回転アニメーション

### **3. ユーザビリティ機能**

#### **検索結果ハイライト**
- マッチした文字列を黄色でハイライト
- 関連度順での並び替え
- 検索結果件数表示

#### **よく見られている質問**
- アクセス数ベースでランキング表示
- 「人気」バッジ表示
- 関連度計算

#### **「この回答は役に立ちましたか？」**
- Yes/No評価ボタン
- フィードバック収集
- 改善提案フォーム

### **4. 誘導機能**

#### **関連質問表示**
- 「こちらも参考にしてください」セクション
- AIによる関連性計算
- クリック率向上

#### **お問い合わせ誘導**
- 「解決しませんでしたか？」セクション
- 無料相談予約への誘導
- チャットボット連携

## 🎨 デザイン要件

### **全体レイアウト**
```
┌─────────────────────────────────────┐
│        FAQ - よくある質問           │
├─────────────────────────────────────┤
│  🔍 [検索ボックス]                   │
│  [制作関連] [料金・納期] [サポート]    │
├─────────────────────────────────────┤
│  ▼ どのような技術で制作していますか？  │
│    HTML5、CSS3、JavaScript、...     │
│                                   │
│  ▼ 制作費用はいくらですか？           │
│    LP制作：10万円〜、...            │
└─────────────────────────────────────┘
```

### **カラースキーム**
- **背景**: #1a1a1a（ダークグレー）
- **カード**: #2a2a2a（やや明るいグレー）
- **アクセント**: #00ff88（グリーン）
- **テキスト**: #ffffff（白）
- **サブテキスト**: #aaaaaa（薄いグレー）

### **アニメーション**
```css
/* アコーディオン開閉 */
.faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.faq__answer--active {
  max-height: 1000px;
  transition: max-height 0.5s ease-in;
}

/* ホバー効果 */
.faq__item:hover {
  background: rgba(0, 255, 136, 0.05);
  transform: translateX(5px);
}
```

### **レスポンシブ対応**
```css
/* モバイル（480px以下） */
@media (max-width: 480px) {
  .faq__categories {
    flex-direction: column;
  }
  .faq__search {
    font-size: 14px;
  }
}

/* タブレット（768px以下） */
@media (max-width: 768px) {
  .faq__grid {
    grid-template-columns: 1fr;
  }
}

/* デスクトップ（769px以上） */
@media (min-width: 769px) {
  .faq__sidebar {
    display: block;
  }
}
```

## 🔧 JavaScript機能実装

### **検索機能実装例**
```javascript
class FAQSearch {
  constructor(faqData) {
    this.faqData = faqData;
    this.filteredData = [...faqData];
    this.searchHistory = JSON.parse(localStorage.getItem('faqSearchHistory')) || [];
  }

  // リアルタイム検索
  search(query) {
    if (!query.trim()) {
      this.filteredData = [...this.faqData];
      return this.filteredData;
    }

    const searchQuery = query.toLowerCase();
    this.filteredData = this.faqData.filter(item =>
      item.question.toLowerCase().includes(searchQuery) ||
      item.answer.toLowerCase().includes(searchQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );

    this.saveSearchHistory(query);
    return this.filteredData;
  }

  // カテゴリー絞り込み
  filterByCategory(category) {
    if (category === 'all') {
      this.filteredData = [...this.faqData];
    } else {
      this.filteredData = this.faqData.filter(item => item.category === category);
    }
    return this.filteredData;
  }

  // 検索履歴保存
  saveSearchHistory(query) {
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      this.searchHistory = this.searchHistory.slice(0, 10);
      localStorage.setItem('faqSearchHistory', JSON.stringify(this.searchHistory));
    }
  }

  // 検索結果ハイライト
  highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
```

### **アコーディオン機能実装例**
```javascript
class FAQAccordion {
  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('faq__question')) {
        this.toggle(e.target);
      }
    });
  }

  toggle(element) {
    const answer = element.nextElementSibling;
    const isActive = element.classList.contains('faq__question--active');

    if (isActive) {
      this.close(element, answer);
    } else {
      this.open(element, answer);
    }
  }

  open(question, answer) {
    question.classList.add('faq__question--active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    answer.classList.add('faq__answer--active');

    // アイコン回転
    const icon = question.querySelector('.faq__icon');
    if (icon) icon.style.transform = 'rotate(180deg)';
  }

  close(question, answer) {
    question.classList.remove('faq__question--active');
    answer.style.maxHeight = '0';
    answer.classList.remove('faq__answer--active');

    // アイコン回転リセット
    const icon = question.querySelector('.faq__icon');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}
```

## 📁 ファイル構成
```
/faq
├── faq.html (メインページ)
├── css/
│   ├── faq.css (メインスタイル)
│   └── faq-responsive.css (レスポンシブ対応)
├── js/
│   ├── faq.js (メイン機能)
│   ├── faq-search.js (検索機能)
│   ├── faq-filter.js (絞り込み機能)
│   └── faq-data.js (FAQ データ)
└── images/
    ├── search-icon.svg
    ├── arrow-down.svg
    └── category-icons/
```

## 🚀 追加機能

### **1. 検索結果統計**
- 検索された回数の記録
- 人気の質問ランキング
- 検索結果が0件の場合の候補提示

### **2. お問い合わせ誘導**
```html
<section class="faq__contact-section">
  <h3>お探しの情報は見つかりましたか？</h3>
  <p>解決しない場合は、お気軽にお問い合わせください。</p>
  <div class="faq__contact-buttons">
    <a href="/reservation.html" class="btn btn--primary">無料相談を予約</a>
    <a href="/contact.html" class="btn btn--secondary">お問い合わせ</a>
    <button id="openChatbot" class="btn btn--outline">チャットで質問</button>
  </div>
</section>
```

### **3. 関連記事・サービス連携**
- 該当するサービスページへのリンク
- ブログ記事との連携
- 事例紹介との連携

### **4. パンくずリスト**
```html
<nav class="breadcrumb">
  <a href="/">ホーム</a>
  <span>></span>
  <a href="/faq.html">よくある質問</a>
  <span>></span>
  <span>制作関連</span>
</nav>
```

## 📊 分析・改善機能

### **Google Analytics連携**
```javascript
// FAQ利用状況の分析
function trackFAQUsage(action, category, label) {
  gtag('event', action, {
    'event_category': 'FAQ',
    'event_label': label,
    'custom_parameter_1': category
  });
}

// 検索キーワード分析
function trackFAQSearch(query) {
  gtag('event', 'faq_search', {
    'event_category': 'FAQ',
    'search_term': query
  });
}

// クリック率測定
function trackFAQClick(questionId) {
  gtag('event', 'faq_click', {
    'event_category': 'FAQ',
    'question_id': questionId
  });
}
```

### **改善提案機能**
- 検索されるが回答がない質問の収集
- 「この回答は役に立ちましたか？」評価機能
- 改善提案フォーム

## 🎯 SEO対策

### **構造化データ実装**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "どのような技術でサイトを制作していますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTML5、CSS3、JavaScript、WordPress等の最新技術を使用しています..."
      }
    }
  ]
}
```

### **メタタグ最適化**
```html
<title>よくある質問 | WEB制作サービス FAQ</title>
<meta name="description" content="WEB制作サービスに関するよくある質問をまとめました。制作費用、納期、技術的な内容など、お客様からよくいただくご質問にお答えします。">
<meta name="keywords" content="WEB制作,FAQ,よくある質問,制作費用,納期,WordPress">
<meta property="og:title" content="よくある質問 | WEB制作サービス">
<meta property="og:description" content="WEB制作に関する疑問を解決。料金・納期・技術仕様など詳しく解説">
<meta property="og:type" content="website">
```

## 🎯 実装依頼

上記仕様に基づいて、完全に動作するFAQページを実装してください。

### **提供していただきたいもの**

1. **完全なコード一式**
   - faq.html（メインページ）
   - 完全なCSS（ダークテーマ、レスポンシブ対応）
   - JavaScript（検索・絞り込み・アコーディオン機能）
   - FAQ データ（JSON形式）

2. **機能実装**
   - リアルタイム検索機能
   - カテゴリー・タグ絞り込み機能
   - スムーズなアコーディオン表示
   - 関連質問表示機能

3. **デザイン**
   - ダークテーマに完全対応
   - 美しいカードレイアウト
   - アニメーション効果
   - アイコン・視覚効果

4. **SEO・アクセシビリティ**
   - 構造化データ実装
   - 適切なHTML構造
   - ARIA属性対応
   - キーボード操作対応

5. **実装・カスタマイズガイド**
   - FAQ データの追加・編集方法
   - デザインのカスタマイズ方法
   - 既存サイトへの組み込み手順

### **特に重要な要件**

- **ユーザビリティ重視**: 直感的で使いやすいインターフェース
- **検索性能**: 高速なリアルタイム検索
- **SEO最適化**: 構造化データとメタタグの完全実装
- **保守性**: FAQ データの追加・編集が容易
- **レスポンシブ**: 全デバイス対応

### **期待する効果**
- お問い合わせ前の疑問解決率80%以上
- サイト滞在時間の延長
- コンバージョン率向上
- サポート工数削減

**プロフェッショナルレベルのFAQページの実装をお願いします！**

---

## 📋 実装チェックリスト

### **基本機能**
- [ ] カテゴリー別FAQ表示
- [ ] リアルタイム検索機能
- [ ] 絞り込み機能
- [ ] アコーディオン表示
- [ ] レスポンシブデザイン

### **高度な機能**
- [ ] 関連質問表示
- [ ] 検索履歴保存
- [ ] 検索結果ハイライト
- [ ] お問い合わせ誘導
- [ ] 分析データ収集

### **SEO・アクセシビリティ**
- [ ] 構造化データ実装
- [ ] メタタグ最適化
- [ ] ARIA属性対応
- [ ] キーボード操作対応
- [ ] パンくずリスト

### **デザイン・UX**
- [ ] ダークテーマ適用
- [ ] アニメーション効果
- [ ] 視覚的分かりやすさ
- [ ] エラー状態の表示
- [ ] ローディング表示