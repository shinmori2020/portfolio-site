# 制作実績ページ実装プロンプト

## 🎯 実装目標
WEBサイト制作サービスのポートフォリオサイトに、Before/After表示機能付きの高機能制作実績ページを実装する。業界別カテゴリー分け、制作期間・予算情報の表示により、潜在顧客の信頼獲得と具体的なイメージ形成を促進し、成約率向上を図る。

## 📋 技術仕様
- **技術**: HTML5 + CSS3 + JavaScript（バニラJS）
- **費用**: ¥0（完全無料）
- **対象環境**: Netlify静的サイトホスティング対応
- **デザイン**: 既存サイトのBEM記法、ダークテーマ、グリーンアクセント(#00ff88)に統一

## 🔧 実装する主要機能

### **1. 業界別カテゴリー構成**

#### **医療・クリニック業界**
```json
{
  "category": "医療・クリニック",
  "color": "#4a9eff",
  "icon": "medical",
  "projects": [
    {
      "id": 1,
      "title": "○○クリニック様 ホームページリニューアル",
      "client": "○○クリニック様",
      "industry": "医療・クリニック",
      "projectType": "WEB制作",
      "budget": "15-30万円",
      "period": "6週間",
      "completedDate": "2024年8月",
      "technologies": ["HTML5", "CSS3", "JavaScript", "レスポンシブ"],
      "features": ["予約システム", "診療案内", "アクセスマップ", "お知らせ機能"],
      "description": "患者様に分かりやすい診療案内と、オンライン予約システムを導入したクリニックサイト",
      "beforeImage": "/images/portfolio/clinic-before.jpg",
      "afterImage": "/images/portfolio/clinic-after.jpg",
      "beforeDescription": "古いデザインで情報が見つけにくく、スマホ対応していない状態",
      "afterDescription": "スッキリとしたモダンなデザインで、スマホからも簡単に予約が可能に",
      "results": {
        "pageViews": "+150%",
        "inquiries": "+200%",
        "mobileAccess": "75%"
      }
    }
  ]
}
```

#### **美容・サロン業界**
```json
{
  "category": "美容・サロン",
  "color": "#ff6b9d",
  "icon": "beauty",
  "projects": [
    {
      "id": 2,
      "title": "美容サロン○○様 LP制作",
      "client": "美容サロン○○様",
      "industry": "美容・サロン",
      "projectType": "LP制作",
      "budget": "10-15万円",
      "period": "4週間",
      "completedDate": "2024年9月",
      "technologies": ["HTML5", "CSS3", "JavaScript", "アニメーション"],
      "features": ["予約フォーム", "ビフォーアフター", "料金表", "スタッフ紹介"],
      "description": "施術の魅力を伝える美しいビジュアルと分かりやすい料金体系を実現",
      "beforeImage": "/images/portfolio/beauty-before.jpg",
      "afterImage": "/images/portfolio/beauty-after.jpg",
      "beforeDescription": "SNSのみの集客で新規顧客獲得に限界を感じていた状態",
      "afterDescription": "プロフェッショナルなLPで信頼感が向上し、成約率が大幅改善",
      "results": {
        "conversionRate": "+220%",
        "newCustomers": "+85%",
        "averageOrderValue": "+40%"
      }
    }
  ]
}
```

#### **飲食店・レストラン業界**
```json
{
  "category": "飲食店・レストラン",
  "color": "#ffa726",
  "icon": "restaurant",
  "projects": [
    {
      "id": 3,
      "title": "イタリアンレストラン○○様 公式サイト制作",
      "client": "イタリアンレストラン○○様",
      "industry": "飲食店・レストラン",
      "projectType": "WEB制作",
      "budget": "20-30万円",
      "period": "5週間",
      "completedDate": "2024年7月",
      "technologies": ["HTML5", "CSS3", "JavaScript", "WordPress"],
      "features": ["メニュー管理", "予約システム", "イベント情報", "多言語対応"],
      "description": "本格イタリアンの魅力を伝える美味しそうなビジュアルと使いやすい予約システム",
      "beforeImage": "/images/portfolio/restaurant-before.jpg",
      "afterImage": "/images/portfolio/restaurant-after.jpg",
      "beforeDescription": "情報が古く、料理の魅力が伝わりにくいサイト構成",
      "afterDescription": "美味しそうな料理写真とスタイリッシュなデザインで集客力向上",
      "results": {
        "reservationRate": "+180%",
        "averageOrderValue": "+25%",
        "repeatCustomers": "+60%"
      }
    }
  ]
}
```

#### **企業・コーポレートサイト**
```json
{
  "category": "企業・コーポレート",
  "color": "#00ff88",
  "icon": "corporate",
  "projects": [
    {
      "id": 4,
      "title": "IT企業○○様 コーポレートサイトリニューアル",
      "client": "IT企業○○様",
      "industry": "企業・コーポレート",
      "projectType": "WordPress制作",
      "budget": "30-50万円",
      "period": "8週間",
      "completedDate": "2024年6月",
      "technologies": ["WordPress", "カスタムテーマ", "SEO対策", "多言語対応"],
      "features": ["企業情報", "採用ページ", "ニュース配信", "IR情報"],
      "description": "企業ブランドを強化し、採用と投資家向け情報発信を強化",
      "beforeImage": "/images/portfolio/corporate-before.jpg",
      "afterImage": "/images/portfolio/corporate-after.jpg",
      "beforeDescription": "更新が滞りがちで、企業の先進性が伝わりにくい状態",
      "afterDescription": "モダンなデザインで企業ブランドを強化。採用応募数も大幅増加",
      "results": {
        "jobApplications": "+250%",
        "brandRecognition": "+80%",
        "seoRanking": "主要KW 3位以内"
      }
    }
  ]
}
```

#### **ECサイト・ショップ**
```json
{
  "category": "ECサイト・ショップ",
  "color": "#9c27b0",
  "icon": "shop",
  "projects": [
    {
      "id": 5,
      "title": "ハンドメイドショップ○○様 ECサイト構築",
      "client": "ハンドメイドショップ○○様",
      "industry": "ECサイト・ショップ",
      "projectType": "WordPress制作",
      "budget": "25-40万円",
      "period": "7週間",
      "completedDate": "2024年5月",
      "technologies": ["WordPress", "WooCommerce", "決済システム", "在庫管理"],
      "features": ["商品管理", "決済システム", "顧客管理", "在庫連携"],
      "description": "ハンドメイド商品の魅力を最大限に表現したECサイト",
      "beforeImage": "/images/portfolio/shop-before.jpg",
      "afterImage": "/images/portfolio/shop-after.jpg",
      "beforeDescription": "外部プラットフォームのみで限界を感じていた状態",
      "afterDescription": "独自ECサイトで自由な販売戦略を実現。売上が大幅向上",
      "results": {
        "salesIncrease": "+400%",
        "conversionRate": "3.2%",
        "averageOrderValue": "+60%"
      }
    }
  ]
}
```

### **2. Before/After表示機能**

#### **比較スライダー実装**
```html
<div class="portfolio__comparison">
  <div class="comparison-slider">
    <div class="comparison-slider__before">
      <img src="before-image.jpg" alt="リニューアル前">
      <div class="comparison-label comparison-label--before">Before</div>
    </div>
    <div class="comparison-slider__after">
      <img src="after-image.jpg" alt="リニューアル後">
      <div class="comparison-label comparison-label--after">After</div>
    </div>
    <div class="comparison-slider__handle">
      <div class="comparison-slider__button"></div>
    </div>
  </div>
</div>
```

#### **タブ切り替え表示**
```html
<div class="portfolio__before-after-tabs">
  <div class="tabs">
    <button class="tab tab--active" data-tab="before">Before</button>
    <button class="tab" data-tab="after">After</button>
  </div>
  <div class="tab-content">
    <div class="tab-panel tab-panel--active" data-panel="before">
      <img src="before-image.jpg" alt="Before">
      <p class="description">リニューアル前の状態...</p>
    </div>
    <div class="tab-panel" data-panel="after">
      <img src="after-image.jpg" alt="After">
      <p class="description">リニューアル後の改善点...</p>
    </div>
  </div>
</div>
```

### **3. 詳細情報表示**

#### **プロジェクト詳細カード**
```html
<article class="portfolio-card">
  <div class="portfolio-card__image">
    <!-- Before/After表示エリア -->
  </div>

  <div class="portfolio-card__content">
    <div class="portfolio-card__header">
      <h3 class="portfolio-card__title">○○クリニック様 ホームページリニューアル</h3>
      <span class="portfolio-card__category">医療・クリニック</span>
    </div>

    <div class="portfolio-card__meta">
      <div class="meta-item">
        <span class="meta-label">制作タイプ</span>
        <span class="meta-value">WEB制作</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">予算</span>
        <span class="meta-value">15-30万円</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">制作期間</span>
        <span class="meta-value">6週間</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">完成</span>
        <span class="meta-value">2024年8月</span>
      </div>
    </div>

    <div class="portfolio-card__technologies">
      <span class="tech-tag">HTML5</span>
      <span class="tech-tag">CSS3</span>
      <span class="tech-tag">JavaScript</span>
      <span class="tech-tag">レスポンシブ</span>
    </div>

    <p class="portfolio-card__description">
      患者様に分かりやすい診療案内と、オンライン予約システムを導入したクリニックサイト
    </p>

    <div class="portfolio-card__results">
      <h4>導入効果</h4>
      <div class="results-grid">
        <div class="result-item">
          <span class="result-value">+150%</span>
          <span class="result-label">ページビュー</span>
        </div>
        <div class="result-item">
          <span class="result-value">+200%</span>
          <span class="result-label">お問い合わせ</span>
        </div>
        <div class="result-item">
          <span class="result-value">75%</span>
          <span class="result-label">モバイル流入</span>
        </div>
      </div>
    </div>

    <div class="portfolio-card__actions">
      <button class="btn btn--primary portfolio-card__details-btn">詳細を見る</button>
      <a href="/contact.html" class="btn btn--outline">相談してみる</a>
    </div>
  </div>
</article>
```

### **4. フィルタリング・検索機能**

#### **カテゴリー絞り込み**
```html
<div class="portfolio-filters">
  <button class="filter-btn filter-btn--active" data-filter="all">
    すべて <span class="count">(12)</span>
  </button>
  <button class="filter-btn" data-filter="medical">
    医療・クリニック <span class="count">(3)</span>
  </button>
  <button class="filter-btn" data-filter="beauty">
    美容・サロン <span class="count">(2)</span>
  </button>
  <button class="filter-btn" data-filter="restaurant">
    飲食店 <span class="count">(2)</span>
  </button>
  <button class="filter-btn" data-filter="corporate">
    コーポレート <span class="count">(3)</span>
  </button>
  <button class="filter-btn" data-filter="ecommerce">
    ECサイト <span class="count">(2)</span>
  </button>
</div>
```

#### **予算・期間絞り込み**
```html
<div class="portfolio-advanced-filters">
  <div class="filter-group">
    <label>予算で絞り込み</label>
    <select class="filter-select" data-filter-type="budget">
      <option value="">すべて</option>
      <option value="under15">15万円未満</option>
      <option value="15-30">15-30万円</option>
      <option value="30-50">30-50万円</option>
      <option value="over50">50万円以上</option>
    </select>
  </div>

  <div class="filter-group">
    <label>制作期間で絞り込み</label>
    <select class="filter-select" data-filter-type="period">
      <option value="">すべて</option>
      <option value="short">4週間以内</option>
      <option value="medium">4-6週間</option>
      <option value="long">6週間以上</option>
    </select>
  </div>

  <div class="filter-group">
    <label>制作タイプで絞り込み</label>
    <select class="filter-select" data-filter-type="type">
      <option value="">すべて</option>
      <option value="LP">LP制作</option>
      <option value="WEB">WEB制作</option>
      <option value="WP">WordPress制作</option>
    </select>
  </div>
</div>
```

## 🎨 デザイン要件

### **全体レイアウト**
```
┌─────────────────────────────────────────────────────────────┐
│                     制作実績 - Portfolio                    │
├─────────────────────────────────────────────────────────────┤
│  [すべて] [医療] [美容] [飲食] [企業] [EC]                    │
│  予算: [選択] 期間: [選択] タイプ: [選択]                     │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────┐  ┌─────────┐  ┌─────────┐                    │
│ │ Before  │  │ Before  │  │ Before  │                    │
│ │ After   │  │ After   │  │ After   │                    │
│ │ Slider  │  │ Slider  │  │ Slider  │                    │
│ │─────────│  │─────────│  │─────────│                    │
│ │医療・15万│  │美容・12万│  │飲食・25万│                    │
│ │6週間    │  │4週間    │  │5週間    │                    │
│ └─────────┘  └─────────┘  └─────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

### **カラーテーマ**
- **背景**: #1a1a1a（ダークテーマ）
- **カード背景**: #2d2d2d
- **テキスト**: #ffffff
- **アクセント**: #00ff88
- **カテゴリー別色分け**:
  - 医療: #4a9eff
  - 美容: #ff6b9d
  - 飲食: #ffa726
  - 企業: #00ff88
  - EC: #9c27b0

### **レスポンシブ対応**
```css
/* デスクトップ: 3カラム */
@media (min-width: 1200px) {
  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}

/* タブレット: 2カラム */
@media (min-width: 768px) and (max-width: 1199px) {
  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* スマートフォン: 1カラム */
@media (max-width: 767px) {
  .portfolio-grid {
    display: block;
  }
  .portfolio-card {
    margin-bottom: 30px;
  }
}
```

## 🔧 JavaScript機能実装

### **Before/Afterスライダー実装**
```javascript
class ComparisonSlider {
  constructor(element) {
    this.container = element;
    this.slider = element.querySelector('.comparison-slider');
    this.handle = element.querySelector('.comparison-slider__handle');
    this.before = element.querySelector('.comparison-slider__before');
    this.after = element.querySelector('.comparison-slider__after');

    this.init();
  }

  init() {
    this.addEventListeners();
    this.setInitialPosition();
  }

  addEventListeners() {
    // マウスイベント
    this.handle.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));

    // タッチイベント
    this.handle.addEventListener('touchstart', this.startDrag.bind(this));
    document.addEventListener('touchmove', this.drag.bind(this));
    document.addEventListener('touchend', this.endDrag.bind(this));
  }

  startDrag(e) {
    e.preventDefault();
    this.isDragging = true;
    this.slider.classList.add('is-dragging');
  }

  drag(e) {
    if (!this.isDragging) return;

    const rect = this.slider.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    this.updatePosition(percentage);
  }

  updatePosition(percentage) {
    this.handle.style.left = `${percentage}%`;
    this.after.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  }

  setInitialPosition() {
    this.updatePosition(50); // 初期位置は50%
  }

  endDrag() {
    this.isDragging = false;
    this.slider.classList.remove('is-dragging');
  }
}
```

### **フィルタリング機能実装**
```javascript
class PortfolioFilter {
  constructor(container) {
    this.container = container;
    this.items = [...container.querySelectorAll('.portfolio-card')];
    this.filters = {
      category: 'all',
      budget: '',
      period: '',
      type: ''
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCounts();
  }

  bindEvents() {
    // カテゴリーフィルター
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setFilter('category', e.target.dataset.filter);
      });
    });

    // 詳細フィルター
    document.querySelectorAll('.filter-select').forEach(select => {
      select.addEventListener('change', (e) => {
        this.setFilter(e.target.dataset.filterType, e.target.value);
      });
    });
  }

  setFilter(type, value) {
    this.filters[type] = value;
    this.applyFilters();
    this.updateActiveStates();
    this.updateCounts();
  }

  applyFilters() {
    this.items.forEach(item => {
      const shouldShow = this.itemMatchesFilters(item);
      item.style.display = shouldShow ? 'block' : 'none';

      if (shouldShow) {
        item.classList.add('portfolio-card--visible');
      } else {
        item.classList.remove('portfolio-card--visible');
      }
    });
  }

  itemMatchesFilters(item) {
    const data = JSON.parse(item.dataset.portfolio);

    // カテゴリーフィルター
    if (this.filters.category !== 'all' &&
        data.category !== this.filters.category) {
      return false;
    }

    // 予算フィルター
    if (this.filters.budget && !this.matchesBudget(data.budget, this.filters.budget)) {
      return false;
    }

    // 期間フィルター
    if (this.filters.period && !this.matchesPeriod(data.period, this.filters.period)) {
      return false;
    }

    // タイプフィルター
    if (this.filters.type && data.projectType !== this.filters.type) {
      return false;
    }

    return true;
  }

  matchesBudget(projectBudget, filterValue) {
    // 予算マッチングロジック
    const budgetRanges = {
      'under15': [0, 15],
      '15-30': [15, 30],
      '30-50': [30, 50],
      'over50': [50, Infinity]
    };

    const range = budgetRanges[filterValue];
    if (!range) return true;

    // プロジェクトの予算文字列から数値を抽出
    const matches = projectBudget.match(/(\d+)/g);
    if (!matches) return false;

    const minBudget = parseInt(matches[0]);
    return minBudget >= range[0] && minBudget < range[1];
  }

  matchesPeriod(projectPeriod, filterValue) {
    // 期間マッチングロジック
    const weekNumber = parseInt(projectPeriod.match(/\d+/)[0]);

    switch(filterValue) {
      case 'short': return weekNumber <= 4;
      case 'medium': return weekNumber > 4 && weekNumber <= 6;
      case 'long': return weekNumber > 6;
      default: return true;
    }
  }

  updateCounts() {
    const categories = ['all', 'medical', 'beauty', 'restaurant', 'corporate', 'ecommerce'];

    categories.forEach(category => {
      const count = this.items.filter(item => {
        const data = JSON.parse(item.dataset.portfolio);
        return category === 'all' || data.category === category;
      }).length;

      const btn = document.querySelector(`.filter-btn[data-filter="${category}"] .count`);
      if (btn) btn.textContent = `(${count})`;
    });
  }

  updateActiveStates() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('filter-btn--active',
        btn.dataset.filter === this.filters.category);
    });
  }
}
```

## 📁 ファイル構成
```
/portfolio
├── portfolio.html (メインページ)
├── portfolio-detail.html (詳細ページテンプレート)
├── css/
│   ├── portfolio.css (メインスタイル)
│   ├── comparison-slider.css (Before/Afterスライダー)
│   └── portfolio-responsive.css (レスポンシブ対応)
├── js/
│   ├── portfolio.js (メイン機能)
│   ├── comparison-slider.js (Before/Afterスライダー)
│   ├── portfolio-filter.js (フィルタリング機能)
│   └── portfolio-data.js (実績データ)
├── images/
│   └── portfolio/
│       ├── before/
│       ├── after/
│       └── thumbnails/
└── data/
    └── portfolio-projects.json (プロジェクトデータ)
```

## 🚀 追加機能

### **1. 詳細モーダル表示**
```html
<div class="portfolio-modal" id="portfolioModal">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <button class="modal-close">×</button>
    <div class="modal-header">
      <h2 class="modal-title"></h2>
      <span class="modal-category"></span>
    </div>
    <div class="modal-body">
      <div class="modal-comparison">
        <!-- Before/Afterスライダー -->
      </div>
      <div class="modal-details">
        <!-- 詳細情報 -->
      </div>
    </div>
    <div class="modal-footer">
      <a href="/contact.html" class="btn btn--primary">同じような制作を依頼する</a>
    </div>
  </div>
</div>
```

### **2. 関連実績表示**
```javascript
function getRelatedProjects(currentProject) {
  return projects.filter(project =>
    project.id !== currentProject.id &&
    (project.category === currentProject.category ||
     project.projectType === currentProject.projectType)
  ).slice(0, 3);
}
```

### **3. お問い合わせ誘導**
```html
<section class="portfolio__cta">
  <h2>同じような制作をお考えですか？</h2>
  <p>あなたのビジネスに最適なWebサイトを制作いたします。</p>
  <div class="cta-buttons">
    <a href="/diagnosis.html" class="btn btn--primary">診断を受けてみる</a>
    <a href="/reservation.html" class="btn btn--secondary">無料相談を予約</a>
    <a href="/contact.html" class="btn btn--outline">お問い合わせ</a>
  </div>
</section>
```

## 📊 分析・SEO機能

### **構造化データ実装**
```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "○○クリニック様 ホームページリニューアル",
  "author": {
    "@type": "Organization",
    "name": "WEB制作サービス"
  },
  "datePublished": "2024-08-01",
  "description": "患者様に分かりやすい診療案内と、オンライン予約システムを導入したクリニックサイト",
  "image": "/images/portfolio/clinic-after.jpg"
}
```

### **Google Analytics連携**
```javascript
// 実績閲覧の追跡
function trackPortfolioView(projectId, category) {
  gtag('event', 'portfolio_view', {
    'event_category': 'Portfolio',
    'event_label': projectId,
    'custom_parameter_1': category
  });
}

// フィルター使用の追跡
function trackFilterUsage(filterType, value) {
  gtag('event', 'filter_usage', {
    'event_category': 'Portfolio',
    'filter_type': filterType,
    'filter_value': value
  });
}
```

## 🎯 実装依頼

上記仕様に基づいて、完全に動作する制作実績ページを実装してください。

### **提供していただきたいもの**

1. **完全なコード一式**
   - portfolio.html（メインページ）
   - portfolio-detail.html（詳細ページ）
   - 完全なCSS（ダークテーマ、レスポンシブ対応）
   - JavaScript（全機能実装）
   - サンプル実績データ

2. **Before/After表示機能**
   - ドラッグ操作対応の比較スライダー
   - タブ切り替え表示
   - モバイル対応のタッチ操作

3. **高度なフィルタリング**
   - カテゴリー別絞り込み
   - 予算・期間・タイプでの複合絞り込み
   - リアルタイム検索機能
   - 絞り込み結果数の表示

4. **詳細モーダル表示**
   - 実績詳細のポップアップ表示
   - 関連実績の提案
   - お問い合わせへの誘導

5. **SEO・分析対応**
   - 構造化データ実装
   - メタタグ最適化
   - Google Analytics連携
   - サイトマップ対応

### **サンプルデータ要件**
- **最低12件のプロジェクト**（各業界2件以上）
- **リアルな業界・予算・期間設定**
- **具体的な成果数値**
- **Before/After画像の設置場所明記**

### **特に重要な要件**

- **信頼性重視**: リアルな実績感のあるコンテンツ
- **視覚的インパクト**: Before/Afterの効果的な表示
- **使いやすさ**: 直感的なフィルタリング操作
- **コンバージョン**: お問い合わせへの自然な誘導
- **保守性**: 実績データの追加・編集が容易

### **期待する効果**
- サイト信頼性の大幅向上
- 具体的なイメージ形成による成約率UP
- 業界特化による適切な顧客マッチング
- Before/Afterによる効果の可視化

**ビジネス成果に直結する制作実績ページの実装をお願いします！**

---

## 📋 実装チェックリスト

### **基本機能**
- [ ] 業界別カテゴリー表示
- [ ] Before/After比較機能
- [ ] 制作期間・予算情報表示
- [ ] フィルタリング機能
- [ ] レスポンシブデザイン

### **高度な機能**
- [ ] ドラッグ対応スライダー
- [ ] 詳細モーダル表示
- [ ] 関連実績表示
- [ ] 検索機能
- [ ] アニメーション効果

### **SEO・分析**
- [ ] 構造化データ実装
- [ ] メタタグ最適化
- [ ] 画像ALTタグ設定
- [ ] サイトマップ対応
- [ ] Analytics連携

### **コンバージョン**
- [ ] お問い合わせ誘導
- [ ] 診断ページ連携
- [ ] 予約システム連携
- [ ] 関連サービス提案
- [ ] CTAボタン最適化