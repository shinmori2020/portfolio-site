/**
 * ニーズ診断ツール JavaScript
 * あなたに最適なWEB制作プランをご提案
 */

// 一時保存用のキー
const STORAGE_KEY = 'diagnosis_progress';
const STORAGE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7日間

// 診断ツールのデータ構造
const questions = [
    {
        id: 'current_site',
        title: '現在のWebサイトの状況を教えてください',
        type: 'single',
        options: [
            { value: 'new', label: '新規制作', description: '初めてのWebサイト' },
            { value: 'renewal', label: 'リニューアル', description: '既存サイトの刷新' },
            { value: 'additional', label: '追加制作', description: '既存サイトに追加' },
            { value: 'migration', label: '移行・引っ越し', description: '他社からの移管' }
        ]
    },
    {
        id: 'purpose',
        title: 'プロジェクトの目的を教えてください',
        type: 'single',
        options: [
            { value: 'corporate', label: '企業サイト', description: '会社情報や事業内容を紹介' },
            { value: 'lp', label: 'ランディングページ', description: '商品・サービスの訴求に特化' },
            { value: 'ec', label: 'ECサイト', description: 'オンラインショップの構築' },
            { value: 'portfolio', label: 'ポートフォリオ', description: '作品や実績の紹介' },
            { value: 'blog', label: 'ブログ・メディア', description: '情報発信やコンテンツ配信' }
        ]
    },
    {
        id: 'target',
        title: 'メインターゲット層を教えてください',
        type: 'single',
        options: [
            { value: 'btob', label: 'BtoB（企業向け）', description: '企業間取引' },
            { value: 'btoc', label: 'BtoC（一般消費者向け）', description: '個人向けサービス' },
            { value: 'both', label: '両方', description: 'BtoB/BtoC両方' },
            { value: 'internal', label: '社内向け', description: '社内利用・イントラネット' }
        ]
    },
    {
        id: 'timeline',
        title: '希望納期はいつ頃ですか？',
        type: 'single',
        options: [
            { value: 'urgent', label: '1ヶ月以内', description: '急ぎで必要' },
            { value: 'normal', label: '2-3ヶ月', description: '標準的な制作期間' },
            { value: 'flexible', label: '3ヶ月以上', description: '余裕を持って制作' },
            { value: 'undecided', label: '未定', description: 'まだ決めていない' }
        ]
    },
    {
        id: 'budget',
        title: 'ご予算感を教えてください',
        type: 'single',
        options: [
            { value: 'small', label: '10万円以下', description: 'シンプルなサイト' },
            { value: 'medium', label: '10-20万円', description: '標準的な機能のサイト' },
            { value: 'large', label: '20-50万円', description: '高機能なサイト' },
            { value: 'enterprise', label: '50万円以上', description: '大規模・複雑なサイト' },
            { value: 'discuss', label: '相談して決めたい', description: '内容次第で検討' }
        ]
    },
    {
        id: 'features',
        title: '必要な機能を選んでください（複数選択可）',
        type: 'multiple',
        options: [
            { value: 'contact', label: 'お問い合わせフォーム', description: '顧客からの連絡受付' },
            { value: 'cms', label: 'コンテンツ管理', description: '自分で更新できる機能' },
            { value: 'reservation', label: '予約システム', description: 'オンライン予約機能' },
            { value: 'payment', label: '決済機能', description: 'オンライン決済対応' },
            { value: 'member', label: '会員機能', description: 'ログイン・マイページ' },
            { value: 'multilang', label: '多言語対応', description: '複数言語での表示' }
        ]
    },
    {
        id: 'design',
        title: 'デザインの方向性を教えてください',
        type: 'single',
        options: [
            { value: 'modern', label: 'モダン・洗練', description: '最新トレンドを取り入れた' },
            { value: 'traditional', label: 'クラシック・信頼感', description: '落ち着いた印象の' },
            { value: 'creative', label: 'クリエイティブ', description: '個性的で印象的な' },
            { value: 'minimal', label: 'ミニマル', description: 'シンプルで機能的な' },
            { value: 'template', label: 'テンプレート活用', description: 'コストを抑えて制作' }
        ]
    },
    {
        id: 'update',
        title: 'サイトの更新頻度はどのくらいですか？',
        type: 'single',
        options: [
            { value: 'daily', label: '毎日', description: 'ニュースやブログなど' },
            { value: 'weekly', label: '週1-2回', description: '定期的な更新' },
            { value: 'monthly', label: '月1-2回', description: 'イベント情報など' },
            { value: 'rarely', label: 'ほとんど更新しない', description: '基本情報のみ' }
        ]
    },
    {
        id: 'support',
        title: '制作後のサポートは必要ですか？',
        type: 'single',
        options: [
            { value: 'full', label: 'フルサポート', description: '定期的な保守・更新代行' },
            { value: 'partial', label: '部分サポート', description: '困った時だけサポート' },
            { value: 'training', label: '操作研修のみ', description: '使い方を教えてもらう' },
            { value: 'none', label: '不要', description: '自社で対応する' }
        ]
    },
    {
        id: 'content',
        title: 'コンテンツ（文章・画像）の準備状況',
        type: 'single',
        options: [
            { value: 'ready', label: 'すべて準備済み', description: '文章・画像すべて用意' },
            { value: 'partial', label: '一部準備済み', description: '部分的に用意' },
            { value: 'preparing', label: 'これから準備', description: '制作と並行して準備' },
            { value: 'request', label: '制作を依頼したい', description: 'コンテンツ作成も依頼' }
        ]
    }
];

// 診断状態の管理
let currentQuestionIndex = 0;
let answers = {};

// 画面切り替え（ローディング付き）
function showScreen(screenId, callback) {
    const currentScreen = document.querySelector('.diagnosis__screen--active');
    const newScreen = document.getElementById(screenId);

    // フェードアウト
    currentScreen.style.opacity = '0';
    currentScreen.style.transform = 'translateY(10px)';

    setTimeout(() => {
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

// ローカルストレージへの保存
function saveProgress() {
    const data = {
        currentIndex: currentQuestionIndex,
        answers: answers,
        timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ローカルストレージからの復元
function loadProgress() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return null;

        const data = JSON.parse(saved);
        const age = Date.now() - data.timestamp;

        // 7日以上経過していたら削除
        if (age > STORAGE_EXPIRY) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }

        return data;
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

// 診断開始
function startDiagnosis() {
    // 保存データがあるか確認
    const savedProgress = loadProgress();

    if (savedProgress && savedProgress.currentIndex > 0) {
        if (confirm('前回の診断の途中から再開しますか？')) {
            currentQuestionIndex = savedProgress.currentIndex;
            answers = savedProgress.answers;
            updateHistory();
            showScreen('questionScreen', () => {
                document.getElementById('progressContainer').style.display = 'block';
                document.getElementById('questionButtons').style.display = 'flex';
                displayQuestion(true);
            });
            return;
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    currentQuestionIndex = 0;
    answers = {};
    updateHistory();
    showScreen('questionScreen', () => {
        document.getElementById('progressContainer').style.display = 'block';
        document.getElementById('questionButtons').style.display = 'flex';
        displayQuestion(true);
    });
}

// ブラウザ履歴の更新（ブラウザバック対応）
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

// ブラウザバック/フォワード時の処理
window.addEventListener('popstate', (event) => {
    if (event.state) {
        currentQuestionIndex = event.state.questionIndex;
        answers = event.state.answers || {};

        if (currentQuestionIndex === -1) {
            showScreen('welcomeScreen');
            document.getElementById('progressContainer').style.display = 'none';
            document.getElementById('questionButtons').style.display = 'none';
        } else {
            showScreen('questionScreen', () => {
                document.getElementById('questionButtons').style.display = 'flex';
                displayQuestion(true); // ブラウザバック時はスキップ
            });
        }
    }
});

// 質問表示（フェード効果付き）
function displayQuestion(skipAnimation = false) {
    const question = questions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

    const updateContent = () => {
        // プログレス更新
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
        document.getElementById('progressCurrent').textContent = `質問 ${currentQuestionIndex + 1}`;
        document.getElementById('progressTotal').textContent = `/ ${questions.length}`;
        document.getElementById('progressContainer').setAttribute('aria-valuenow', Math.round(progressPercent));

        // 質問内容更新
        document.getElementById('questionTitle').innerHTML =
            `<span class="diagnosis__question-number" aria-label="質問番号">${currentQuestionIndex + 1}</span>${question.title}`;
        document.getElementById('questionTitle').setAttribute('aria-label', `質問${currentQuestionIndex + 1}: ${question.title}`);

        // オプション表示
        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';

        question.options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = `diagnosis__option ${question.type === 'multiple' ? 'diagnosis__option--multiple' : ''}`;

        if (question.type === 'multiple') {
            optionEl.innerHTML = `
                <div class="diagnosis__option-checkbox"></div>
                <div>
                    <div class="diagnosis__option-title">${option.label}</div>
                    <div class="diagnosis__option-description">${option.description}</div>
                </div>
            `;
        } else {
            optionEl.innerHTML = `
                <div>
                    <div class="diagnosis__option-title">${option.label}</div>
                    <div class="diagnosis__option-description">${option.description}</div>
                </div>
            `;
        }

        optionEl.addEventListener('click', () => selectOption(option, question.type === 'multiple'));

        // 既存の回答があれば選択状態に
        if (question.type === 'multiple') {
            if (answers[question.id] && answers[question.id].includes(option.value)) {
                optionEl.classList.add('diagnosis__option--selected');
            }
        } else {
            if (answers[question.id] === option.value) {
                optionEl.classList.add('diagnosis__option--selected');
            }
        }

        container.appendChild(optionEl);
    });

        // ボタンの表示制御
        document.getElementById('prevButton').style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
        document.getElementById('nextButton').textContent = currentQuestionIndex === questions.length - 1 ? '結果を見る' : '次へ';
        updateNextButton();
    };

    if (skipAnimation) {
        updateContent();
    } else {
        // フェードアウト
        const questionScreen = document.getElementById('questionScreen');
        questionScreen.style.opacity = '0';
        questionScreen.style.transform = 'translateY(10px)';

        setTimeout(() => {
            updateContent();
            // フェードイン
            questionScreen.style.opacity = '1';
            questionScreen.style.transform = 'translateY(0)';
        }, 300);
    }
}

// オプション選択
function selectOption(option, isMultiple) {
    const question = questions[currentQuestionIndex];

    if (isMultiple) {
        if (!answers[question.id]) {
            answers[question.id] = [];
        }

        const index = answers[question.id].indexOf(option.value);
        if (index > -1) {
            answers[question.id].splice(index, 1);
        } else {
            answers[question.id].push(option.value);
        }
    } else {
        answers[question.id] = option.value;

        // シングル選択の場合は他の選択を解除
        document.querySelectorAll('.diagnosis__option').forEach(el => {
            el.classList.remove('diagnosis__option--selected');
        });
    }

    // 選択状態の更新
    const isSelected = event.currentTarget.classList.toggle('diagnosis__option--selected');

    // ARIA属性の更新
    if (isMultiple) {
        const checkbox = event.currentTarget.querySelector('[role="checkbox"]');
        if (checkbox) checkbox.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    } else {
        event.currentTarget.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    }

    updateNextButton();

    // 進捗を保存
    saveProgress();
}

// 次へボタンの有効/無効と色変更
function updateNextButton() {
    const question = questions[currentQuestionIndex];
    const hasAnswer = question.type === 'multiple'
        ? answers[question.id] && answers[question.id].length > 0
        : answers[question.id];

    const nextBtn = document.getElementById('nextButton');
    if (nextBtn) {
        nextBtn.disabled = !hasAnswer;

        // 選択状態に応じてクラスを変更
        if (hasAnswer) {
            nextBtn.classList.remove('diagnosis__button--inactive');
            nextBtn.classList.add('diagnosis__button--active');
        } else {
            nextBtn.classList.add('diagnosis__button--inactive');
            nextBtn.classList.remove('diagnosis__button--active');
        }
    }
}

// 次の質問へ
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        saveProgress();
        updateHistory();
        displayQuestion(false);  // 次へボタンはアニメーションあり
    } else {
        showResult();
    }
}

// 前の質問へ
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        saveProgress();
        updateHistory();
        displayQuestion(false);  // 戻るボタンもアニメーションあり
    }
}

// 結果表示
function showResult() {
    // 診断完了時に進捗データを削除
    localStorage.removeItem(STORAGE_KEY);

    showScreen('resultScreen', () => {
        document.getElementById('progressContainer').style.display = 'none';
        document.getElementById('questionButtons').style.display = 'none';
    });

    // 回答に基づいてプランを判定
    const recommendation = calculateRecommendation();

    document.getElementById('recommendedPlan').textContent = recommendation.plan;
    document.getElementById('recommendedPrice').textContent = recommendation.price;
    document.getElementById('recommendedDescription').textContent = recommendation.description;

    const featuresContainer = document.getElementById('recommendedFeatures');
    featuresContainer.innerHTML = '';
    recommendation.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresContainer.appendChild(li);
    });

    // ローカルストレージに結果を保存（料金計算機連携用）
    localStorage.setItem('diagnosisResult', JSON.stringify({
        answers: answers,
        recommendation: recommendation,
        timestamp: new Date().toISOString()
    }));
}

// おすすめプランの計算
function calculateRecommendation() {
    const current_site = answers.current_site;
    const purpose = answers.purpose;
    const target = answers.target;
    const budget = answers.budget;
    const features = answers.features || [];
    const update = answers.update;
    const content = answers.content;

    // スコアリングシステム
    let lpScore = 0;
    let webScore = 0;
    let wpScore = 0;

    // 現在のサイト状況による加点
    if (current_site === 'new') lpScore += 1;
    if (current_site === 'renewal') webScore += 1;
    if (current_site === 'additional' || current_site === 'migration') wpScore += 1;

    // 目的による加点
    if (purpose === 'lp') lpScore += 3;
    if (purpose === 'corporate') webScore += 2;
    if (purpose === 'blog' || purpose === 'ec') wpScore += 3;

    // ターゲット層による加点
    if (target === 'btob') webScore += 1;
    if (target === 'btoc') lpScore += 1;
    if (target === 'both') wpScore += 1;

    // 予算による加点
    if (budget === 'small') lpScore += 2;
    if (budget === 'medium') webScore += 2;
    if (budget === 'large' || budget === 'enterprise') wpScore += 2;

    // 機能による加点
    if (features.includes('cms')) wpScore += 2;
    if (features.includes('member') || features.includes('payment')) wpScore += 2;
    if (features.length <= 2) lpScore += 1;
    if (features.length >= 3) webScore += 1;

    // 更新頻度による加点
    if (update === 'daily' || update === 'weekly') wpScore += 2;
    if (update === 'rarely') lpScore += 1;

    // コンテンツ準備状況による加点
    if (content === 'ready') lpScore += 1;
    if (content === 'partial' || content === 'preparing') webScore += 1;
    if (content === 'request') wpScore += 1;

    // 最高スコアのプランを選択
    let recommendation;
    if (wpScore >= webScore && wpScore >= lpScore) {
        recommendation = {
            plan: 'WordPress制作プラン',
            price: '¥200,000〜',
            description: 'コンテンツ管理システム付きの本格的なWebサイト。更新も簡単で、拡張性も高い選択です。',
            features: [
                'WordPressによるCMS構築',
                'オリジナルテーマ開発',
                '管理画面カスタマイズ',
                'プラグイン設定・導入',
                '更新方法のレクチャー',
                'SEO基本設定',
                '3ヶ月間の無料サポート'
            ],
            type: 'wordpress'
        };
    } else if (webScore >= lpScore) {
        recommendation = {
            plan: 'Webサイト制作プラン',
            price: '¥150,000〜',
            description: '企業サイトやサービスサイトに最適。複数ページで充実した情報発信が可能です。',
            features: [
                '5-10ページのサイト制作',
                'レスポンシブデザイン',
                'お問い合わせフォーム設置',
                '基本的なSEO対策',
                'Googleアナリティクス設定',
                '1ヶ月間の修正対応'
            ],
            type: 'website'
        };
    } else {
        recommendation = {
            plan: 'ランディングページ制作プラン',
            price: '¥100,000〜',
            description: 'コンバージョン重視の1ページ完結型。商品やサービスの魅力を最大限に伝えます。',
            features: [
                '縦長1ページのLP制作',
                'コンバージョン最適化',
                'A/Bテスト対応',
                'フォーム設置',
                'スマホ最適化',
                '納品後の微調整対応'
            ],
            type: 'lp'
        };
    }

    return recommendation;
}

// メッセージ表示用共通関数
function showMessage(message, type = 'error') {
    const messageEl = document.createElement('div');
    messageEl.className = `diagnosis__message diagnosis__message--${type}`;
    messageEl.textContent = message;

    const isError = type === 'error';
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${isError ? '#ff4444' : 'var(--primary-color)'};
        color: ${isError ? 'white' : 'var(--secondary-color)'};
        padding: 15px 20px;
        z-index: 9999;
    `;
    document.body.appendChild(messageEl);
    setTimeout(() => messageEl.remove(), 3000);
}

// 互換性のためのラッパー関数
function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

// メールで結果送信
async function sendResultByEmail() {
    const email = document.getElementById('emailInput').value;
    const emailButton = event.target;

    if (!email) {
        showErrorMessage('メールアドレスを入力してください');
        return;
    }

    // メール形式の簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErrorMessage('正しいメールアドレスを入力してください');
        return;
    }

    // ボタンを無効化してローディング表示
    emailButton.disabled = true;
    emailButton.textContent = '送信中...';

    try {
        // 実際の実装では、ここでサーバーにメール送信リクエストを送る
        await new Promise(resolve => setTimeout(resolve, 1000)); // デモ用の遅延
        showSuccessMessage(`${email} に診断結果を送信しました！`);
    } catch (error) {
        console.error('メール送信エラー:', error);
        showErrorMessage('メールの送信に失敗しました。もう一度お試しください。');
    } finally {
        emailButton.disabled = false;
        emailButton.textContent = 'PDFを送信';
    }
}

// 診断をやり直す
function restartDiagnosis() {
    startDiagnosis();
}

// 料金計算機へ遷移
function goToCalculator() {
    // 診断結果をパラメータとして料金計算機に渡す
    const result = localStorage.getItem('diagnosisResult');
    if (result) {
        const data = JSON.parse(result);
        const params = new URLSearchParams({
            from: 'diagnosis',
            type: data.recommendation.type
        });
        window.location.href = `pricing-calculator.html?${params.toString()}`;
    } else {
        window.location.href = 'pricing-calculator.html';
    }
}

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', () => {
    // エンターキーでの進行を有効化
    document.addEventListener('keydown', (e) => {
        const nextBtn = document.getElementById('nextButton');
        if (e.key === 'Enter' && !nextBtn.disabled) {
            nextQuestion();
        }
    });

    // 初期状態の設定
    const screens = document.querySelectorAll('.diagnosis__screen');
    screens.forEach(screen => {
        if (!screen.classList.contains('diagnosis__screen--active')) {
            screen.style.opacity = '0';
            screen.style.transform = 'translateY(20px)';
        } else {
            screen.style.opacity = '1';
            screen.style.transform = 'translateY(0)';
        }
    });

    // ブラウザURLハッシュに基づいて復元
    if (window.location.hash && window.location.hash.startsWith('#question-')) {
        const savedProgress = loadProgress();
        if (savedProgress) {
            if (confirm('前回の診断の途中から再開しますか？')) {
                currentQuestionIndex = savedProgress.currentIndex;
                answers = savedProgress.answers;
                showScreen('questionScreen', () => {
                    document.getElementById('progressContainer').style.display = 'block';
                    document.getElementById('questionButtons').style.display = 'flex';
                    displayQuestion(true);
                });
            } else {
                localStorage.removeItem(STORAGE_KEY);
                window.location.hash = '';
            }
        }
    }
});