# ニーズ診断ツール 機能 仕様書

## 📋 機能概要

WEBサイト制作サービスのポートフォリオサイトに実装されたニーズ診断ツールの仕様書です。

### 基本仕様
- **技術スタック**: HTML + CSS + JavaScript（バニラJS）
- **外部ライブラリ**: なし（完全自作）
- **費用**: ¥0（完全無料・外部サービス不要）
- **対象環境**: 静的サイトホスティング対応
- **デザインシステム**: ダークテーマ、グリーンアクセント（#00ff88）
- **アーキテクチャ**: 分離型ファイル構成（HTML/CSS/JS独立）

## 🎯 主要機能

### 1. インタラクティブ診断システム

#### 質問フロー（全10問）
```javascript
【質問1】現在のWebサイトの状況
- 新規制作（初めてのWebサイト）
- リニューアル（既存サイトの刷新）
- 追加制作（既存サイトに追加）
- 移行・引っ越し（他社からの移管）

【質問2】プロジェクトの目的
- 企業サイト（会社情報や事業内容を紹介）
- ランディングページ（商品・サービスの訴求に特化）
- ECサイト（オンラインショップの構築）
- ポートフォリオ（作品や実績の紹介）
- ブログ・メディア（情報発信やコンテンツ配信）

【質問3】メインターゲット層
- BtoB（企業向け）- 企業間取引
- BtoC（一般消費者向け）- 個人向けサービス
- 両方（BtoB/BtoC両方）
- 社内向け（社内利用・イントラネット）

【質問4】希望納期
- 1ヶ月以内（急ぎで必要）
- 2-3ヶ月（標準的な制作期間）
- 3ヶ月以上（余裕を持って制作）
- 未定（まだ決めていない）

【質問5】ご予算感
- 10万円以下（シンプルなサイト）
- 10-20万円（標準的な機能のサイト）
- 20-50万円（高機能なサイト）
- 50万円以上（大規模・複雑なサイト）
- 相談して決めたい（内容次第で検討）

【質問6】必要な機能（複数選択可）
- お問い合わせフォーム（顧客からの連絡受付）
- コンテンツ管理（自分で更新できる機能）
- 予約システム（オンライン予約機能）
- 決済機能（オンライン決済対応）
- 会員機能（ログイン・マイページ）
- 多言語対応（複数言語での表示）

【質問7】デザインの方向性
- モダン・洗練（最新トレンドを取り入れた）
- クラシック・信頼感（落ち着いた印象の）
- クリエイティブ（個性的で印象的な）
- ミニマル（シンプルで機能的な）
- テンプレート活用（コストを抑えて制作）

【質問8】サイトの更新頻度
- 毎日（ニュースやブログなど）
- 週1-2回（定期的な更新）
- 月1-2回（イベント情報など）
- ほとんど更新しない（基本情報のみ）

【質問9】制作後のサポート
- フルサポート（定期的な保守・更新代行）
- 部分サポート（困った時だけサポート）
- 操作研修のみ（使い方を教えてもらう）
- 不要（自社で対応する）

【質問10】コンテンツ（文章・画像）の準備状況
- すべて準備済み（文章・画像すべて用意）
- 一部準備済み（部分的に用意）
- これから準備（制作と並行して準備）
- 制作を依頼したい（コンテンツ作成も依頼）
```

### 2. スマート推奨システム

#### AI風スコアリングロジック
```javascript
// 診断ロジック（3プラン評価）
function calculateRecommendation(answers) {
    let scores = {
        lp: 0,        // ランディングページ
        web: 0,       // Webサイト制作
        wordpress: 0  // WordPress制作
    };

    // 目的による基本スコア
    const purposeScores = {
        'lp': { lp: 3, web: 1, wordpress: 0 },
        'corporate': { lp: 1, web: 3, wordpress: 2 },
        'ec': { lp: 0, web: 1, wordpress: 3 },
        'portfolio': { lp: 1, web: 2, wordpress: 2 },
        'blog': { lp: 0, web: 1, wordpress: 3 }
    };

    // 予算による調整
    const budgetScores = {
        'small': { lp: 3, web: 1, wordpress: 0 },
        'medium': { lp: 2, web: 3, wordpress: 1 },
        'large': { lp: 1, web: 2, wordpress: 3 },
        'enterprise': { lp: 0, web: 2, wordpress: 3 }
    };

    // 機能要件による調整
    const featureAdjustments = {
        'cms': { wordpress: +2 },
        'reservation': { wordpress: +2 },
        'payment': { wordpress: +3 },
        'member': { wordpress: +3 },
        'multilang': { wordpress: +2 }
    };

    // 更新頻度による調整
    const updateFrequency = {
        'daily': { wordpress: +3 },
        'weekly': { wordpress: +2 },
        'monthly': { wordpress: +1 },
        'rarely': { lp: +1, web: +1 }
    };

    // 最適プランの決定
    const highestScore = Math.max(...Object.values(scores));
    const recommendedType = Object.keys(scores).find(
        key => scores[key] === highestScore
    );

    return {
        type: recommendedType,
        scores: scores,
        confidence: calculateConfidence(scores)
    };
}
```

#### 推奨プラン詳細
```javascript
const planDetails = {
    lp: {
        name: 'ランディングページ制作プラン',
        price: '¥100,000〜',
        description: 'コンバージョンに特化した1ページ完結型のサイト',
        features: [
            '1ページ構成（LP）',
            'レスポンシブ対応',
            'お問い合わせフォーム',
            'SEO基本設定',
            '高速表示最適化',
            '成果測定タグ設置'
        ],
        suitable: ['商品・サービス訴求', '短期間での制作', '明確な目標設定']
    },

    web: {
        name: 'Webサイト制作プラン',
        price: '¥150,000〜',
        description: '企業の信頼性を高める多ページ構成のコーポレートサイト',
        features: [
            '5-10ページ構成',
            'レスポンシブ対応',
            '会社案内・事業紹介',
            'お問い合わせフォーム',
            'SEO基本設定',
            'Google Analytics設定'
        ],
        suitable: ['企業サイト', '信頼性重視', '安定した情報発信']
    },

    wordpress: {
        name: 'WordPress制作プラン',
        price: '¥200,000〜',
        description: '自分で更新できる高機能CMS付きサイト',
        features: [
            'WordPress CMS',
            '自由なページ追加・編集',
            'ブログ機能',
            'プラグイン対応',
            '管理画面カスタマイズ',
            '操作説明・研修付き'
        ],
        suitable: ['頻繁な更新', '多機能が必要', '長期運用前提']
    }
};
```

### 3. ユーザー体験最適化

#### プログレス管理
```javascript
// リアルタイムプログレス表示
function updateProgress() {
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

    // プログレスバー更新
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    document.getElementById('progressCurrent').textContent = `質問 ${currentQuestionIndex + 1}`;
    document.getElementById('progressTotal').textContent = `/ ${questions.length}`;

    // ARIA属性更新
    document.getElementById('progressContainer').setAttribute('aria-valuenow', Math.round(progressPercent));
}
```

#### 自動保存機能
```javascript
// LocalStorage自動保存（7日間保持）
function saveProgress() {
    const data = {
        currentIndex: currentQuestionIndex,
        answers: answers,
        timestamp: Date.now()
    };
    localStorage.setItem('diagnosis_progress', JSON.stringify(data));
}

// データ復元
function loadProgress() {
    const saved = localStorage.getItem('diagnosis_progress');
    if (!saved) return null;

    const data = JSON.parse(saved);
    const age = Date.now() - data.timestamp;
    const STORAGE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7日間

    // 期限切れチェック
    if (age > STORAGE_EXPIRY) {
        localStorage.removeItem('diagnosis_progress');
        return null;
    }

    return data;
}
```

#### ブラウザ履歴管理
```javascript
// History API活用
function updateHistory() {
    const state = {
        questionIndex: currentQuestionIndex,
        answers: answers
    };

    const url = currentQuestionIndex === -1
        ? '#welcome'
        : `#question-${currentQuestionIndex + 1}`;

    history.pushState(state, '', url);
}

// ブラウザバック/フォワード対応
window.addEventListener('popstate', (event) => {
    if (event.state) {
        currentQuestionIndex = event.state.questionIndex;
        answers = event.state.answers || {};

        // 適切な画面に復元
        if (currentQuestionIndex === -1) {
            showScreen('welcomeScreen');
        } else {
            showScreen('questionScreen', () => {
                displayQuestion(true);
            });
        }
    }
});
```

### 4. アニメーション・UI効果

#### スムーズ画面遷移
```javascript
// フェード効果付き画面切り替え
function showScreen(screenId, callback) {
    const currentScreen = document.querySelector('.diagnosis__screen--active');
    const newScreen = document.getElementById(screenId);

    // フェードアウト
    currentScreen.style.opacity = '0';
    currentScreen.style.transform = 'translateY(10px)';

    setTimeout(() => {
        // 画面切り替え
        currentScreen.classList.remove('diagnosis__screen--active');
        newScreen.classList.add('diagnosis__screen--active');

        // フェードイン
        setTimeout(() => {
            newScreen.style.opacity = '1';
            newScreen.style.transform = 'translateY(0)';
            if (callback) callback();
        }, 50);
    }, 300);
}
```

#### インタラクション効果
```css
/* 選択肢ホバー効果 */
.diagnosis__option {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
}

.diagnosis__option:hover {
    border-color: #00ff88;
    transform: translateY(-2px);
    background: rgba(0, 255, 136, 0.05);
}

.diagnosis__option--selected {
    border-color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
}

/* プログレスバーアニメーション */
.diagnosis__progress-fill {
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, #00ff88 0%, #00cc70 100%);
}
```

## 📁 ファイル構成

```
/html/
├── needs-diagnosis.html        # メインページ（HTML構造のみ）
├── css/
│   ├── base.css               # ベーススタイル（共通）
│   └── needs-diagnosis.css    # 診断ツール専用CSS（600行）
├── js/
│   ├── common.js              # 共通JavaScript（ヘッダーメニュー等）
│   └── needs-diagnosis.js     # 診断ツール専用JS（800行）
└── docs/
    ├── needs-diagnosis-tool.md
    └── needs-diagnosis-implementation.md # この仕様書
```

### ファイル詳細

#### needs-diagnosis.html
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ニーズ診断ツール - あなたに最適なWEB制作プランをご提案</title>

    <!-- CSS読み込み -->
    <link rel="stylesheet" href="css/base/base.css">
    <link rel="stylesheet" href="css/pages/needs-diagnosis.css">
</head>
<body>
    <!-- ヘッダー -->
    <header class="header">...</header>

    <div class="diagnosis" role="main">
        <div class="diagnosis__container">
            <!-- プログレスバー -->
            <div class="diagnosis__progress" id="progressContainer">
                <div class="diagnosis__progress-bar">
                    <div class="diagnosis__progress-fill" id="progressFill"></div>
                </div>
                <div class="diagnosis__progress-text">
                    <span id="progressCurrent">質問 1</span>
                    <span id="progressTotal">/ 10</span>
                </div>
            </div>

            <!-- ウェルカム画面 -->
            <div class="diagnosis__screen diagnosis__screen--active" id="welcomeScreen">
                <div class="diagnosis__welcome">
                    <h1 class="diagnosis__title">あなたに最適な<br><span>WEB制作プラン</span>を診断</h1>
                    <div class="diagnosis__subtitle-accent">10万円～100万円の幅広いプランから最適解をご提案</div>
                    <p class="diagnosis__subtitle">10個の簡単な質問に答えるだけで、あなたのビジネスにピッタリなWEB制作プランと概算費用がすぐにわかります</p>

                    <!-- 特徴カード -->
                    <div class="diagnosis__features">
                        <div class="diagnosis__feature">
                            <div class="diagnosis__feature-number">3分</div>
                            <div class="diagnosis__feature-text">かんたん診断</div>
                            <div class="diagnosis__feature-description">スマホでもOK</div>
                        </div>
                        <!-- ... -->
                    </div>

                    <button class="diagnosis__button" onclick="startDiagnosis()">無料で診断を始める</button>
                </div>
            </div>

            <!-- 質問画面 -->
            <div class="diagnosis__screen" id="questionScreen">
                <h2 class="diagnosis__question" id="questionTitle"></h2>
                <div class="diagnosis__options" id="optionsContainer"></div>
                <div class="diagnosis__buttons" id="questionButtons">
                    <button class="diagnosis__button diagnosis__button--secondary" onclick="previousQuestion()">前へ</button>
                    <button class="diagnosis__button" onclick="nextQuestion()">次へ</button>
                </div>
            </div>

            <!-- 結果画面 -->
            <div class="diagnosis__screen" id="resultScreen">
                <h1 class="diagnosis__title">診断結果</h1>
                <div class="diagnosis__result-card">
                    <div class="diagnosis__result-plan" id="recommendedPlan"></div>
                    <div class="diagnosis__result-price" id="recommendedPrice"></div>
                    <p id="recommendedDescription"></p>
                    <ul class="diagnosis__result-features" id="recommendedFeatures"></ul>
                </div>

                <!-- メール送信機能 -->
                <div class="diagnosis__email-capture">
                    <h3 class="diagnosis__email-title">詳細な診断結果をメールで受け取る</h3>
                    <input type="email" class="diagnosis__email-input" id="emailInput">
                    <button class="diagnosis__button diagnosis__button--secondary" onclick="sendResultByEmail()">PDFを送信</button>
                </div>

                <div class="diagnosis__buttons">
                    <button class="diagnosis__button diagnosis__button--secondary" onclick="restartDiagnosis()">もう一度診断する</button>
                    <button class="diagnosis__button" onclick="goToCalculator()">料金計算機で詳細を見る</button>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript読み込み -->
    <script src="js/pages/needs-diagnosis.js"></script>
    <script src="js/base/common.js"></script>
</body>
</html>
```

## ⚙️ 技術実装詳細

### 質問データ構造
```javascript
const questions = [
    {
        id: 'current_site',                    // 一意のID
        title: '現在のWebサイトの状況を教えてください',  // 質問文
        type: 'single',                        // 選択タイプ（single/multiple）
        options: [                             // 選択肢配列
            {
                value: 'new',                  // 値
                label: '新規制作',             // 表示ラベル
                description: '初めてのWebサイト' // 説明文
            },
            // ... 他の選択肢
        ]
    },
    // ... 他の質問
];
```

### 診断結果算出
```javascript
function calculateRecommendation(answers) {
    // 1. 基本スコア初期化
    let scores = { lp: 0, web: 0, wordpress: 0 };

    // 2. 目的によるスコア加算
    const purpose = answers.purpose;
    if (purpose === 'lp') scores.lp += 3;
    if (purpose === 'corporate') scores.web += 3;
    if (purpose === 'blog' || purpose === 'ec') scores.wordpress += 3;

    // 3. 予算によるスコア調整
    const budget = answers.budget;
    if (budget === 'small') scores.lp += 2;
    if (budget === 'medium') scores.web += 2;
    if (budget === 'large' || budget === 'enterprise') scores.wordpress += 2;

    // 4. 機能要件によるスコア加算
    const features = answers.features || [];
    if (features.includes('cms')) scores.wordpress += 2;
    if (features.includes('reservation')) scores.wordpress += 2;
    if (features.includes('payment')) scores.wordpress += 3;

    // 5. 更新頻度によるスコア調整
    const updateFreq = answers.update;
    if (updateFreq === 'daily' || updateFreq === 'weekly') scores.wordpress += 3;
    if (updateFreq === 'rarely') { scores.lp += 1; scores.web += 1; }

    // 6. 最高スコアのプランを推奨
    const maxScore = Math.max(...Object.values(scores));
    const recommendedType = Object.keys(scores).find(key => scores[key] === maxScore);

    return {
        type: recommendedType,
        plan: planDetails[recommendedType],
        scores: scores,
        confidence: calculateConfidence(scores, maxScore)
    };
}

// 信頼度計算
function calculateConfidence(scores, maxScore) {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return total > 0 ? Math.round((maxScore / total) * 100) : 50;
}
```

### レスポンシブ対応
```css
/* デスクトップ（769px以上） */
.diagnosis__container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}

.diagnosis__features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.diagnosis__buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
}

/* タブレット（768px以下） */
@media (max-width: 768px) {
    .diagnosis__container {
        padding: 40px 20px;
    }

    .diagnosis__features {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .diagnosis__buttons {
        flex-direction: column-reverse;
    }

    .diagnosis__button {
        width: 100%;
    }
}

/* スマートフォン（480px以下） */
@media (max-width: 480px) {
    .diagnosis__container {
        padding: 40px 15px;
    }

    .diagnosis__title {
        font-size: 1.8rem;
    }

    .diagnosis__option {
        padding: 15px;
    }

    .diagnosis__option-title {
        font-size: 0.95rem;
    }
}
```

## 🔗 外部システム連携

### 料金計算機との連携
```javascript
// 診断結果を料金計算機に引き継ぎ
function goToCalculator() {
    const result = localStorage.getItem('diagnosisResult');
    if (result) {
        const data = JSON.parse(result);
        const params = new URLSearchParams({
            from: 'diagnosis',
            type: data.recommendation.type,
            recommended: 'true'
        });

        // 推奨オプションの事前選択
        if (data.answers.features) {
            params.set('features', data.answers.features.join(','));
        }

        window.location.href = `pricing-calculator.html?${params}`;
    } else {
        window.location.href = 'pricing-calculator.html';
    }
}
```

### メール送信機能（予定）
```javascript
// 現在はアラート表示のみ（将来的にバックエンド連携予定）
async function sendResultByEmail() {
    const email = document.getElementById('emailInput').value;

    if (!email) {
        alert('メールアドレスを入力してください');
        return;
    }

    if (!validateEmail(email)) {
        alert('有効なメールアドレスを入力してください');
        return;
    }

    // TODO: 実際のメール送信処理
    // - バックエンドAPI呼び出し
    // - PDF生成
    // - EmailJS連携

    alert(`${email} に診断結果を送信しました！（デモ）`);
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
```

## 🎨 カスタマイズ方法

### 質問の追加・編集
```javascript
// 1. questions配列に新しい質問を追加
const questions = [
    // 既存の質問...
    {
        id: 'new_question',
        title: '新しい質問のタイトル',
        type: 'single', // または 'multiple'
        options: [
            { value: 'option1', label: 'オプション1', description: '説明1' },
            { value: 'option2', label: 'オプション2', description: '説明2' }
        ]
    }
];

// 2. calculateRecommendation関数に新しい質問の処理を追加
function calculateRecommendation(answers) {
    // ... 既存の処理

    // 新しい質問の処理
    const newAnswer = answers.new_question;
    if (newAnswer === 'option1') {
        scores.wordpress += 2;
    }

    // ... 残りの処理
}
```

### スコアリング調整
```javascript
// スコア重み付けの調整例
const SCORE_WEIGHTS = {
    PURPOSE_WEIGHT: 3,      // 目的の重要度
    BUDGET_WEIGHT: 2,       // 予算の重要度
    FEATURES_WEIGHT: 2,     // 機能の重要度
    UPDATE_WEIGHT: 1        // 更新頻度の重要度
};

// 調整された計算
if (purpose === 'lp') scores.lp += PURPOSE_WEIGHT;
if (budget === 'small') scores.lp += BUDGET_WEIGHT;
```

### デザインテーマ変更
```css
/* CSS変数でテーマカスタマイズ */
:root {
    --primary-color: #0088ff;      /* 青テーマに変更 */
    --secondary-color: #f8f9fa;    /* ライトテーマに変更 */
    --text-primary: #333333;       /* ダークテキスト */
    --text-secondary: #666666;     /* グレーテキスト */
}

/* ダークモード対応 */
@media (prefers-color-scheme: dark) {
    :root {
        --primary-color: #00ff88;
        --secondary-color: #0a0a0a;
        --text-primary: #ffffff;
        --text-secondary: #a0a0a0;
    }
}
```

## 📊 効果測定・分析

### 取得可能なメトリクス
```javascript
// 診断開始率
const startRate = (診断開始数 / ページビュー数) * 100;

// 完了率
const completionRate = (診断完了数 / 診断開始数) * 100;

// 離脱ポイント分析
const dropOffPoints = {
    question1: 離脱数,
    question2: 離脱数,
    // ... 各質問での離脱数
};

// 推奨プラン分布
const planDistribution = {
    lp: 推奨回数,
    web: 推奨回数,
    wordpress: 推奨回数
};
```

### Google Analytics連携例
```javascript
// イベント追跡
function trackDiagnosisEvent(action, questionIndex = null) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'needs_diagnosis',
            'event_label': questionIndex ? `question_${questionIndex}` : 'general',
            'custom_parameters': {
                'question_index': questionIndex,
                'total_questions': questions.length
            }
        });
    }
}

// 使用例
trackDiagnosisEvent('diagnosis_started');
trackDiagnosisEvent('question_answered', currentQuestionIndex + 1);
trackDiagnosisEvent('diagnosis_completed');
trackDiagnosisEvent('result_viewed', recommendedPlan);
```

## 🚨 制約事項・注意点

### 技術的制約
- **ブラウザ対応**: LocalStorage対応ブラウザのみ
- **データ保持**: 7日間の自動削除
- **メール機能**: 現在はデモ実装のみ
- **プラン精度**: ルールベースのため精度に限界

### 運用上の注意
- **質問内容**: 定期的な見直しと最適化
- **スコアリング**: 実際の案件データとの整合性確認
- **UIテスト**: 異なるデバイス・ブラウザでの動作確認
- **パフォーマンス**: 大量アクセス時の負荷対策

### セキュリティ考慮事項
```javascript
// 入力値サニタイズ
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>\"']/g, '').trim();
}

// データ検証
function validateAnswers(answers) {
    const validQuestions = questions.map(q => q.id);
    const filteredAnswers = {};

    for (const [key, value] of Object.entries(answers)) {
        if (validQuestions.includes(key)) {
            filteredAnswers[key] = sanitizeInput(value);
        }
    }

    return filteredAnswers;
}
```

## 🔄 今後の改善計画

### Phase 1（1ヶ月後）
- メール送信機能の実装（EmailJS連携）
- PDF診断結果書の生成機能
- Google Analytics詳細トラッキング

### Phase 2（3ヶ月後）
- 機械学習による推奨精度向上
- A/Bテスト機能の実装
- 管理画面での質問編集機能

### Phase 3（6ヶ月後）
- 多言語対応（英語版）
- API化による他システム連携
- リアルタイム分析ダッシュボード

## 📝 メンテナンス項目

### 定期チェック項目
- [ ] 全質問の表示・選択が正常に動作するか
- [ ] プログレスバーが正確に更新されるか
- [ ] ブラウザバック/フォワードが正常に動作するか
- [ ] レスポンシブ表示が崩れていないか
- [ ] 診断結果の表示が正確か
- [ ] LocalStorageの保存・復元が正常か

### 月次更新項目
- [ ] 診断結果の精度検証
- [ ] ユーザーフィードバックの反映
- [ ] 質問内容の最適化
- [ ] スコアリング調整

### 年次更新項目
- [ ] 料金体系に合わせたプラン更新
- [ ] デザイントレンドの反映
- [ ] 技術スタックの更新検討
- [ ] セキュリティ対策の見直し

---

**最終更新日**: 2025年9月22日
**バージョン**: 2.0（分離型ファイル構成版）
**実装形式**: モジュール型（HTML/CSS/JS分離）
**対応ブラウザ**: Chrome, Safari, Firefox, Edge（最新版）

この仕様書は継続的に更新され、機能改善に伴い内容が変更される可能性があります。