# FAQシステム 機能 仕様書

## 📋 機能概要

WEBサイト制作サービスのポートフォリオサイトに実装されたよくある質問（FAQ）システムの仕様書です。

### 基本仕様
- **技術スタック**: HTML + CSS + JavaScript（バニラJS）
- **外部ライブラリ**: なし（完全自作）
- **費用**: ¥0（完全無料・外部サービス不要）
- **対象環境**: 静的サイトホスティング対応
- **デザインシステム**: ダークテーマ、グリーンアクセント（#00ff88）
- **アーキテクチャ**: 分離型ファイル構成（HTML/CSS/JS独立）

## 🎯 主要機能

### 1. 高度な検索・フィルタリングシステム

#### リアルタイム検索機能
```javascript
// 検索処理のコア機能
class FAQSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.setupEventListeners();
    }

    // リアルタイム検索
    performSearch(query) {
        if (!query.trim()) {
            this.displayAllFAQs();
            return;
        }

        const results = this.faqData.filter(item => {
            // 質問文での検索
            const questionMatch = item.question.toLowerCase().includes(query.toLowerCase());

            // 回答文での検索
            const answerMatch = item.answer.toLowerCase().includes(query.toLowerCase());

            // タグでの検索
            const tagMatch = item.tags.some(tag =>
                tag.toLowerCase().includes(query.toLowerCase())
            );

            return questionMatch || answerMatch || tagMatch;
        });

        this.displaySearchResults(results, query);
        this.highlightMatches(query);
    }

    // 検索結果ハイライト
    highlightMatches(query) {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const questionEl = item.querySelector('.faq-question');
            const answerEl = item.querySelector('.faq-answer');

            if (questionEl) {
                questionEl.innerHTML = this.highlightText(questionEl.textContent, query);
            }
            if (answerEl) {
                answerEl.innerHTML = this.highlightText(answerEl.textContent, query);
            }
        });
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
}
```

#### 多軸フィルタリング
```javascript
// カテゴリー・タグによる絞り込み
class FAQFilter {
    constructor() {
        this.activeFilters = {
            category: 'all',
            tags: [],
            searchQuery: ''
        };
    }

    // カテゴリーフィルター
    filterByCategory(category) {
        this.activeFilters.category = category;
        this.applyFilters();
    }

    // タグフィルター（複数選択可）
    filterByTags(selectedTags) {
        this.activeFilters.tags = selectedTags;
        this.applyFilters();
    }

    // 全フィルターを適用
    applyFilters() {
        let filteredData = [...this.faqData];

        // カテゴリーフィルター適用
        if (this.activeFilters.category !== 'all') {
            filteredData = filteredData.filter(item =>
                item.category === this.activeFilters.category
            );
        }

        // 検索クエリフィルター適用
        if (this.activeFilters.searchQuery) {
            filteredData = filteredData.filter(item =>
                this.matchesSearchQuery(item, this.activeFilters.searchQuery)
            );
        }

        // タグフィルター適用
        if (this.activeFilters.tags.length > 0) {
            filteredData = filteredData.filter(item =>
                this.activeFilters.tags.some(tag => item.tags.includes(tag))
            );
        }

        this.displayResults(filteredData);
    }
}
```

#### 人気キーワード機能
```javascript
// よく検索されるキーワードの管理
const popularKeywords = [
    'ホームページ', 'サイト', '商品', '質問', 'デザイン',
    '料金', '修正', 'スマホ', 'メール', '無料'
];

// キーワードクリックで検索実行
function searchByKeyword(keyword) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = keyword;

    // 検索実行
    faqSearch.performSearch(keyword);

    // 検索履歴に追加
    addToSearchHistory(keyword);
}
```

### 2. 包括的FAQ データベース

#### FAQ項目構成（全15項目）
```javascript
const faqData = [
    // 制作関連（5項目）
    {
        id: 1,
        category: 'production',
        question: 'どのような技術でサイトを制作していますか？',
        answer: 'HTML5、CSS3、JavaScript、WordPress等の最新技術を使用しています。SEO対策、レスポンシブデザイン、高速表示を重視した制作を行っています。',
        tags: ['技術', 'HTML', 'CSS', 'JavaScript', 'WordPress', 'SEO'],
        views: 450,
        helpful: 42,
        notHelpful: 3
    },
    {
        id: 2,
        category: 'production',
        question: 'デザインはオリジナルで制作してもらえますか？',
        answer: 'はい、完全オリジナルデザインで制作いたします。お客様のブランドイメージや業界特性に合わせたデザインをご提案します。参考サイトがあればお聞かせください。',
        tags: ['デザイン', 'オリジナル', 'ブランド'],
        views: 380,
        helpful: 35,
        notHelpful: 2
    },
    {
        id: 3,
        category: 'production',
        question: 'スマートフォン対応は含まれますか？',
        answer: 'はい、レスポンシブデザインによるスマートフォン・タブレット対応は標準で含まれています。どのデバイスでも快適に閲覧できるよう最適化いたします。',
        tags: ['スマホ対応', 'レスポンシブ', 'モバイル'],
        views: 520,
        helpful: 48,
        notHelpful: 1
    },
    {
        id: 4,
        category: 'production',
        question: 'SEO対策はどこまで対応していますか？',
        answer: 'メタタグ最適化、構造化データ実装、サイトマップ作成、表示速度最適化など基本的なSEO対策は全プランに含まれています。より高度なSEO対策も別途対応可能です。',
        tags: ['SEO', 'メタタグ', '構造化データ', 'サイトマップ'],
        views: 410,
        helpful: 39,
        notHelpful: 4
    },
    {
        id: 5,
        category: 'production',
        question: 'WordPressのカスタマイズは可能ですか？',
        answer: 'はい、WordPressの豊富なカスタマイズ経験があります。独自プラグイン開発、カスタム投稿タイプ、既存テーマのカスタマイズなど、ご要望に応じて対応いたします。',
        tags: ['WordPress', 'カスタマイズ', 'プラグイン'],
        views: 290,
        helpful: 28,
        notHelpful: 2
    },

    // 料金・納期関連（5項目）
    {
        id: 6,
        category: 'pricing',
        question: '制作費用はいくらですか？',
        answer: 'LP制作：10万円〜、WEB制作：30万円〜、WordPress制作：50万円〜が目安です。詳細は無料お見積りにて、お客様のご要望に応じた正確な金額をご提示いたします。',
        tags: ['料金', '費用', '価格', '見積り'],
        views: 680,
        helpful: 61,
        notHelpful: 5
    },
    {
        id: 7,
        category: 'pricing',
        question: '追加料金は発生しますか？',
        answer: '基本的に初回お見積り金額から追加料金は発生しません。大幅な仕様変更や追加ページがある場合は事前にお見積りをお渡しし、ご承諾いただいてから作業いたします。',
        tags: ['追加費用', '見積り', '仕様変更'],
        views: 340,
        helpful: 32,
        notHelpful: 3
    },
    {
        id: 8,
        category: 'pricing',
        question: '制作期間はどのくらいですか？',
        answer: 'LP制作：2-3週間、WEB制作：3-4週間、WordPress制作：4-6週間が目安です。お急ぎの場合はご相談ください。可能な限り対応いたします。',
        tags: ['制作期間', '納期', 'スケジュール', '急ぎ'],
        views: 490,
        helpful: 44,
        notHelpful: 2
    },
    {
        id: 9,
        category: 'pricing',
        question: '支払い方法を教えてください',
        answer: '銀行振込、クレジットカード決済に対応しています。分割払い（2回・3回）も可能です。詳しくは無料相談でご説明いたします。',
        tags: ['支払い', '銀行振込', 'クレジット', '分割'],
        views: 280,
        helpful: 26,
        notHelpful: 1
    },
    {
        id: 10,
        category: 'pricing',
        question: '修正は何回まで可能ですか？',
        answer: 'デザイン確定前は無制限で修正対応いたします。コーディング着手後は3回まで無料、それ以降は別途お見積りとなります。',
        tags: ['修正', '回数', '無料'],
        views: 360,
        helpful: 33,
        notHelpful: 4
    },

    // サポート・運用関連（5項目）
    {
        id: 11,
        category: 'support',
        question: '納品後のサポートはありますか？',
        answer: '納品後3ヶ月間は無料サポート期間として、軽微な修正や操作方法のサポートを行います。その後も保守契約プラン（月額1万円〜）をご用意しています。',
        tags: ['サポート', '保守', 'アフターケア', '納品後'],
        views: 420,
        helpful: 38,
        notHelpful: 3
    },
    {
        id: 12,
        category: 'support',
        question: 'ドメイン・サーバーの契約は必要ですか？',
        answer: 'はい、別途必要となります。取得・契約代行も承っております（手数料5,000円）。お客様に最適なプランをご提案し、初期設定まで対応いたします。',
        tags: ['ドメイン', 'サーバー', 'レンタルサーバー', '代行'],
        views: 310,
        helpful: 29,
        notHelpful: 2
    },
    {
        id: 13,
        category: 'support',
        question: 'SSL証明書の設定は含まれますか？',
        answer: 'はい、SSL証明書（無料版）の設定は標準で含まれています。有料SSL証明書をご希望の場合も対応可能です。',
        tags: ['SSL', '証明書', 'セキュリティ', 'HTTPS'],
        views: 220,
        helpful: 21,
        notHelpful: 1
    },
    {
        id: 14,
        category: 'support',
        question: 'Google Analyticsの設定はしてもらえますか？',
        answer: 'Google Analytics、Google Search Consoleの設定・初期設定は基本プランに含まれています。レポートの見方もご説明いたします。',
        tags: ['Analytics', 'Google', '解析', 'アクセス解析'],
        views: 190,
        helpful: 18,
        notHelpful: 1
    },
    {
        id: 15,
        category: 'support',
        question: '既存サイトのリニューアルも対応していますか？',
        answer: 'はい、既存サイトのリニューアルも承っています。現状分析から改善提案、データ移行まで全て対応いたします。',
        tags: ['リニューアル', '改修', '移行'],
        views: 350,
        helpful: 32,
        notHelpful: 3
    }
];
```

### 3. スムーズなアコーディオンUI

#### アコーディオン機能
```javascript
class FAQAccordion {
    constructor() {
        this.activeItems = new Set();
        this.multipleExpansion = true; // 複数同時展開可能
        this.setupEventListeners();
    }

    // アコーディオンの開閉処理
    toggle(questionElement) {
        const faqItem = questionElement.closest('.faq-item');
        const answerId = faqItem.dataset.id;
        const answerElement = faqItem.querySelector('.faq-answer');
        const isActive = this.activeItems.has(answerId);

        if (isActive) {
            this.close(faqItem, answerElement, answerId);
        } else {
            this.open(faqItem, answerElement, answerId);
        }

        // 分析データ送信
        this.trackAccordionUsage(answerId, !isActive);
    }

    // アコーディオンを開く
    open(faqItem, answerElement, id) {
        faqItem.classList.add('faq-item--active');
        answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
        answerElement.classList.add('faq-answer--active');

        // アイコン回転
        const icon = faqItem.querySelector('.faq-icon');
        if (icon) {
            icon.style.transform = 'rotate(180deg)';
        }

        this.activeItems.add(id);

        // 開封時にビュー数カウント
        this.incrementViewCount(id);
    }

    // アコーディオンを閉じる
    close(faqItem, answerElement, id) {
        faqItem.classList.remove('faq-item--active');
        answerElement.style.maxHeight = '0';
        answerElement.classList.remove('faq-answer--active');

        // アイコン回転リセット
        const icon = faqItem.querySelector('.faq-icon');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }

        this.activeItems.delete(id);
    }

    // ビュー数カウント
    incrementViewCount(faqId) {
        const faqItem = this.faqData.find(item => item.id == faqId);
        if (faqItem) {
            faqItem.views = (faqItem.views || 0) + 1;
            this.saveFAQData();
        }
    }
}
```

### 4. インタラクティブUI要素

#### タブナビゲーション（モバイル対応）
```javascript
class MobileTabNavigation {
    constructor() {
        this.currentTab = 'keywords';
        this.setupEventListeners();
    }

    // タブ切り替え
    switchTab(tabName) {
        if (this.currentTab === tabName) return;

        // 既存のアクティブ状態をクリア
        document.querySelector('.mobile-tab--active').classList.remove('mobile-tab--active');
        document.querySelector('.tab-pane--active').classList.remove('tab-pane--active');

        // 新しいタブをアクティブに
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('mobile-tab--active');
        document.querySelector(`[data-pane="${tabName}"]`).classList.add('tab-pane--active');

        this.currentTab = tabName;
    }

    setupEventListeners() {
        document.querySelectorAll('.mobile-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }
}
```

#### カテゴリーフィルター
```javascript
class CategoryFilter {
    constructor() {
        this.activeCategory = 'all';
        this.categories = {
            'all': 'すべて',
            'production': '制作関連',
            'pricing': '料金・納期',
            'support': 'サポート・運用'
        };
        this.setupEventListeners();
    }

    // カテゴリー切り替え
    switchCategory(category) {
        if (this.activeCategory === category) return;

        // UIの更新
        document.querySelector('.faq-category--active').classList.remove('faq-category--active');
        document.querySelector(`[data-category="${category}"]`).classList.add('faq-category--active');

        this.activeCategory = category;

        // フィルタリング実行
        this.filterFAQsByCategory(category);

        // 分析データ送信
        this.trackCategoryUsage(category);
    }

    // カテゴリーによるフィルタリング
    filterFAQsByCategory(category) {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.3s ease';
            } else {
                item.style.display = 'none';
            }
        });

        // 結果数の更新
        this.updateResultCount();
    }
}
```

### 5. 助けになったか評価システム

#### フィードバック機能
```javascript
class FAQFeedback {
    constructor() {
        this.setupEventListeners();
    }

    // 「役に立った」ボタンクリック
    markAsHelpful(faqId) {
        const faqItem = this.faqData.find(item => item.id == faqId);
        if (faqItem) {
            faqItem.helpful = (faqItem.helpful || 0) + 1;
            this.saveFAQData();
            this.updateFeedbackUI(faqId, 'helpful');
            this.trackFeedback(faqId, 'helpful');
        }
    }

    // 「役に立たなかった」ボタンクリック
    markAsNotHelpful(faqId) {
        const faqItem = this.faqData.find(item => item.id == faqId);
        if (faqItem) {
            faqItem.notHelpful = (faqItem.notHelpful || 0) + 1;
            this.saveFAQData();
            this.updateFeedbackUI(faqId, 'notHelpful');
            this.trackFeedback(faqId, 'notHelpful');
        }
    }

    // フィードバックUI更新
    updateFeedbackUI(faqId, type) {
        const faqElement = document.querySelector(`[data-id="${faqId}"]`);
        const feedbackButtons = faqElement.querySelector('.faq-feedback');

        // ボタンを無効化して完了メッセージ表示
        feedbackButtons.innerHTML = `
            <span class="feedback-thanks">
                フィードバックありがとうございました！
            </span>
        `;
    }
}
```

### 6. データ永続化・分析機能

#### LocalStorage活用
```javascript
class FAQDataManager {
    constructor() {
        this.storageKey = 'faq_data';
        this.searchHistoryKey = 'faq_search_history';
        this.loadFAQData();
    }

    // FAQデータの保存
    saveFAQData() {
        const dataToSave = {
            faqData: this.faqData,
            lastUpdated: Date.now(),
            version: '1.0'
        };
        localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
    }

    // FAQデータの読み込み
    loadFAQData() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const data = JSON.parse(saved);
                // マージ処理（新しいデータと既存の統計を組み合わせ）
                this.mergeFAQData(data.faqData);
            } else {
                this.faqData = defaultFAQData;
            }
        } catch (error) {
            console.error('FAQ data loading error:', error);
            this.faqData = defaultFAQData;
        }
    }

    // 検索履歴の管理
    addToSearchHistory(query) {
        let history = JSON.parse(localStorage.getItem(this.searchHistoryKey)) || [];

        // 重複削除
        history = history.filter(item => item !== query);

        // 先頭に追加
        history.unshift(query);

        // 最大10件まで保持
        history = history.slice(0, 10);

        localStorage.setItem(this.searchHistoryKey, JSON.stringify(history));
    }

    // 人気質問の算出
    getPopularFAQs(limit = 5) {
        return [...this.faqData]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, limit);
    }

    // 評価の高い質問の算出
    getHighRatedFAQs(limit = 5) {
        return [...this.faqData]
            .sort((a, b) => {
                const aRatio = (a.helpful || 0) / ((a.helpful || 0) + (a.notHelpful || 1));
                const bRatio = (b.helpful || 0) / ((b.helpful || 0) + (b.notHelpful || 1));
                return bRatio - aRatio;
            })
            .slice(0, limit);
    }
}
```

## 📁 ファイル構成

```
/html/
├── faq.html                   # メインページ（HTML構造のみ）
├── css/
│   ├── base.css              # ベーススタイル（共通）
│   ├── faq.css               # FAQ専用CSS（メインスタイル）
│   └── faq-inline.css        # 追加スタイル
├── js/
│   └── faq.js                # FAQ専用JavaScript（800行）
└── docs/
    ├── faq-implementation-prompt.md
    └── faq-system-implementation.md # この仕様書
```

### ファイル詳細

#### faq.html（分離型構成）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>よくある質問 - WEB制作サービス</title>
    <meta name="description" content="WEB制作サービスに関するよくある質問をまとめました。料金、納期、サポートなど、お客様の疑問にお答えします。">

    <!-- CSS読み込み -->
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/faq.css">
    <link rel="stylesheet" href="css/faq-inline.css">
</head>
<body>
    <!-- ヘッダー -->
    <header>
        <h1>よくある質問</h1>
        <p>WEB制作サービスに関する疑問にお答えします</p>
    </header>

    <!-- 検索とフィルター -->
    <div class="faq-controls">
        <!-- 検索ボックス -->
        <div class="faq-search">
            <input type="text" class="faq-search__input" placeholder="質問を検索..." id="searchInput">
            <span class="faq-search__icon"></span>
        </div>

        <!-- モバイル用タブナビゲーション -->
        <div class="mobile-tab-nav">
            <button class="mobile-tab mobile-tab--active" data-tab="keywords">キーワード</button>
            <button class="mobile-tab" data-tab="categories">カテゴリー</button>
        </div>

        <!-- タブコンテンツ -->
        <div class="tab-content-wrapper">
            <!-- 人気の検索キーワード -->
            <div class="popular-search tab-pane tab-pane--active" data-pane="keywords">
                <p class="popular-search__label">人気のキーワード：</p>
                <div class="popular-search__keywords">
                    <button class="popular-search__keyword" onclick="searchByKeyword('ホームページ')">ホームページ</button>
                    <button class="popular-search__keyword" onclick="searchByKeyword('料金')">料金</button>
                    <!-- 他のキーワード... -->
                </div>
            </div>

            <!-- カテゴリーフィルター -->
            <div class="faq-categories tab-pane" data-pane="categories" id="categoryFilter">
                <button class="faq-category faq-category--active" data-category="all">すべて</button>
                <button class="faq-category" data-category="production">制作関連</button>
                <button class="faq-category" data-category="pricing">料金・納期</button>
                <button class="faq-category" data-category="support">サポート・運用</button>
            </div>
        </div>
    </div>

    <!-- FAQセクション -->
    <section class="faq">
        <div class="faq__container" id="faqContainer">
            <!-- FAQ項目はJavaScriptで動的生成 -->
        </div>

        <!-- お問い合わせ誘導 -->
        <section class="faq__contact">
            <h3 class="faq__contact-title">お探しの情報は見つかりましたか？</h3>
            <p class="faq__contact-text">解決しない場合は、お気軽にお問い合わせください</p>
            <div class="faq__contact-buttons">
                <a href="reservation.html" class="faq__button">無料相談を予約</a>
                <a href="chatbot.html" class="faq__button">チャットで質問</a>
            </div>
        </section>
    </section>

    <!-- 検索結果なし -->
    <div class="faq-no-results" id="noResults">
        <h3 class="faq-no-results__title">検索結果が見つかりません</h3>
        <p class="faq-no-results__text">別のキーワードでお試しください</p>
        <button class="faq-no-results__button" onclick="clearSearch()">検索をクリア</button>
    </div>

    <!-- JavaScript読み込み -->
    <script src="js/faq.js"></script>
</body>
</html>
```

## ⚙️ 技術実装詳細

### FAQ項目の動的生成
```javascript
// FAQ項目HTMLの生成
function generateFAQHTML(faqItem) {
    const popularBadge = faqItem.views > 400 ? '<span class="faq-popular-badge">人気</span>' : '';
    const helpfulRatio = faqItem.helpful / (faqItem.helpful + faqItem.notHelpful + 1);
    const ratingBadge = helpfulRatio > 0.8 ? '<span class="faq-rating-badge">高評価</span>' : '';

    return `
        <div class="faq-item" data-id="${faqItem.id}" data-category="${faqItem.category}">
            <div class="faq-question" onclick="toggleFAQ(${faqItem.id})">
                <h3 class="faq-question__text">
                    ${faqItem.question}
                    ${popularBadge}
                    ${ratingBadge}
                </h3>
                <span class="faq-icon">▼</span>
            </div>
            <div class="faq-answer" data-answer-id="${faqItem.id}">
                <div class="faq-answer__content">
                    <p>${faqItem.answer}</p>

                    <!-- タグ表示 -->
                    <div class="faq-tags">
                        ${faqItem.tags.map(tag => `<span class="faq-tag">${tag}</span>`).join('')}
                    </div>

                    <!-- 統計情報 -->
                    <div class="faq-stats">
                        <span class="faq-views">閲覧数: ${faqItem.views || 0}</span>
                    </div>

                    <!-- フィードバック -->
                    <div class="faq-feedback">
                        <p class="faq-feedback__question">この回答は役に立ちましたか？</p>
                        <div class="faq-feedback__buttons">
                            <button class="faq-feedback__btn faq-feedback__btn--yes" onclick="markAsHelpful(${faqItem.id})">
                                👍 はい (${faqItem.helpful || 0})
                            </button>
                            <button class="faq-feedback__btn faq-feedback__btn--no" onclick="markAsNotHelpful(${faqItem.id})">
                                👎 いいえ (${faqItem.notHelpful || 0})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
```

### レスポンシブ対応
```css
/* デスクトップ（769px以上） */
.faq-controls {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 40px;
}

.faq-search {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
}

.mobile-tab-nav {
    display: none; /* デスクトップでは非表示 */
}

.tab-content-wrapper {
    display: block;
}

/* タブレット（768px以下） */
@media (max-width: 768px) {
    .mobile-tab-nav {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    .mobile-tab {
        flex: 1;
        max-width: 150px;
        padding: 10px 20px;
        background: #2a2a2a;
        border: 1px solid #444;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .mobile-tab--active {
        background: #00ff88;
        color: #000;
        border-color: #00ff88;
    }

    .tab-pane {
        display: none;
    }

    .tab-pane--active {
        display: block;
    }
}

/* スマートフォン（480px以下） */
@media (max-width: 480px) {
    .faq-search__input {
        font-size: 16px; /* iOS Safariでのズーム防止 */
    }

    .popular-search__keywords {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
    }

    .faq-categories {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
    }

    .faq-item {
        margin-bottom: 15px;
    }

    .faq-question__text {
        font-size: 0.95rem;
        padding-right: 30px;
    }

    .faq-answer__content {
        padding: 15px;
        font-size: 0.9rem;
        line-height: 1.6;
    }
}
```

### SEO最適化・構造化データ
```javascript
// 構造化データの動的生成
function generateStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    // 構造化データをページに挿入
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// ページ読み込み時に構造化データ生成
document.addEventListener('DOMContentLoaded', generateStructuredData);
```

## 🔧 カスタマイズ方法

### FAQ データの追加・編集
```javascript
// 新しいFAQ項目の追加
const newFAQItem = {
    id: 16, // 既存の最大ID + 1
    category: 'production', // 'production', 'pricing', 'support'
    question: '新しい質問',
    answer: '新しい回答',
    tags: ['タグ1', 'タグ2', 'タグ3'],
    views: 0,
    helpful: 0,
    notHelpful: 0
};

// faqDataに追加
faqData.push(newFAQItem);

// 表示を更新
generateFAQHTML();
```

### カテゴリーの追加
```javascript
// 新しいカテゴリーの定義
const categories = {
    'all': 'すべて',
    'production': '制作関連',
    'pricing': '料金・納期',
    'support': 'サポート・運用',
    'technology': '技術関連' // 新カテゴリー追加
};

// HTMLにカテゴリーボタンを追加
const categoryHTML = `
    <button class="faq-category" data-category="technology">
        技術関連
    </button>
`;
```

### 人気キーワードの更新
```javascript
// よく検索されるキーワードの更新
const popularKeywords = [
    'ホームページ', 'サイト', '商品', '質問', 'デザイン',
    '料金', '修正', 'スマホ', 'メール', '無料',
    'WordPress', 'SSL', 'SEO' // 新キーワード追加
];
```

### デザインテーマの変更
```css
/* CSS変数でテーマカスタマイズ */
:root {
    --faq-primary: #0088ff;        /* 青テーマに変更 */
    --faq-background: #f8f9fa;     /* ライトテーマに変更 */
    --faq-card: #ffffff;           /* 白背景 */
    --faq-text: #333333;           /* ダークテキスト */
    --faq-border: #e0e0e0;         /* ライトボーダー */
}

/* ライトモード用スタイル */
.faq-item {
    background: var(--faq-card);
    color: var(--faq-text);
    border: 1px solid var(--faq-border);
}

.faq-item:hover {
    background: rgba(0, 136, 255, 0.05);
}
```

## 📊 効果測定・分析

### 取得可能なメトリクス
```javascript
// FAQ利用統計の取得
class FAQAnalytics {
    // 基本統計情報
    getBasicStats() {
        return {
            totalFAQs: faqData.length,
            totalViews: faqData.reduce((sum, item) => sum + (item.views || 0), 0),
            totalHelpful: faqData.reduce((sum, item) => sum + (item.helpful || 0), 0),
            totalNotHelpful: faqData.reduce((sum, item) => sum + (item.notHelpful || 0), 0),
            averageHelpfulRatio: this.calculateAverageHelpfulRatio()
        };
    }

    // 人気質問TOP5
    getPopularFAQs() {
        return [...faqData]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5)
            .map(item => ({
                question: item.question,
                views: item.views || 0,
                category: item.category
            }));
    }

    // 検索キーワード分析
    getSearchAnalytics() {
        const searchHistory = JSON.parse(localStorage.getItem('faq_search_history')) || [];
        const keywordFrequency = {};

        searchHistory.forEach(keyword => {
            keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1;
        });

        return Object.entries(keywordFrequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([keyword, count]) => ({ keyword, count }));
    }

    // カテゴリー別統計
    getCategoryStats() {
        const stats = {};

        faqData.forEach(item => {
            if (!stats[item.category]) {
                stats[item.category] = {
                    count: 0,
                    totalViews: 0,
                    totalHelpful: 0,
                    avgHelpfulRatio: 0
                };
            }

            stats[item.category].count++;
            stats[item.category].totalViews += item.views || 0;
            stats[item.category].totalHelpful += item.helpful || 0;
        });

        return stats;
    }
}
```

### Google Analytics連携
```javascript
// FAQ イベント追跡
function trackFAQEvent(action, faqId, category = null, label = null) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'FAQ',
            'event_label': label || `FAQ_${faqId}`,
            'custom_parameters': {
                'faq_id': faqId,
                'faq_category': category
            }
        });
    }
}

// 使用例
trackFAQEvent('faq_viewed', faqId, faqCategory);
trackFAQEvent('faq_helpful', faqId, faqCategory);
trackFAQEvent('faq_search', null, null, searchQuery);
trackFAQEvent('category_filtered', null, categoryName);
```

## 🚨 制約事項・注意点

### 技術的制約
- **LocalStorage容量**: 約5-10MBの制限
- **検索性能**: 大量データ（1000項目以上）では性能低下の可能性
- **ブラウザ対応**: LocalStorage対応ブラウザのみ
- **SEO制限**: クライアントサイド生成のため初期HTML に構造化データが必要

### 運用上の注意
- **データ管理**: FAQデータの定期的な見直し・更新
- **検索最適化**: よく検索されるキーワードの分析・対応
- **パフォーマンス**: FAQ項目数が多い場合の表示最適化
- **アクセシビリティ**: キーボード操作・スクリーンリーダー対応

### セキュリティ考慮事項
```javascript
// XSS対策
function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 入力値検証
function validateSearchInput(input) {
    // 特殊文字の制限
    return input.replace(/[<>\"'&]/g, '').trim();
}

// データ整合性チェック
function validateFAQData(data) {
    return data.filter(item =>
        item.id &&
        item.question &&
        item.answer &&
        item.category &&
        Array.isArray(item.tags)
    );
}
```

## 🔄 今後の改善計画

### Phase 1（1ヶ月後）
- AI による関連質問の自動提案
- 検索結果の relevance スコアリング
- 動的なよくある質問ランキング
- A/Bテスト機能の実装

### Phase 2（3ヶ月後）
- 自然言語検索の実装
- ユーザー行動分析ダッシュボード
- FAQ自動生成機能
- 多言語対応

### Phase 3（6ヶ月後）
- 機械学習による回答精度向上
- 音声検索対応
- チャットボット統合
- リアルタイム分析・最適化

## 📝 メンテナンス項目

### 週次チェック項目
- [ ] 新しい検索キーワードの確認
- [ ] 「役に立たなかった」評価の多い項目の見直し
- [ ] 検索結果0件のキーワード分析
- [ ] FAQ閲覧数ランキングの確認

### 月次更新項目
- [ ] FAQ項目の追加・更新
- [ ] 人気キーワードリストの更新
- [ ] カテゴリー構成の見直し
- [ ] パフォーマンス分析・最適化

### 四半期更新項目
- [ ] FAQ全体の構成見直し
- [ ] ユーザーフィードバックの反映
- [ ] 競合サイトFAQの分析
- [ ] SEO効果の測定・改善

### 年次更新項目
- [ ] FAQ システム全体のリニューアル検討
- [ ] 技術スタックの更新
- [ ] アクセシビリティ対応の強化
- [ ] 新機能の企画・実装

---

**最終更新日**: 2025年9月22日
**バージョン**: 1.0（分離型ファイル構成版）
**実装形式**: モジュール型（HTML/CSS/JS分離）
**対応ブラウザ**: Chrome, Safari, Firefox, Edge（最新版）

この仕様書は継続的に更新され、機能改善に伴い内容が変更される可能性があります。