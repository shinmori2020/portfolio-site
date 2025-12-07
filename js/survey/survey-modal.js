/* Survey B - Modal Survey JavaScript */

// アンケートモーダルHTML動的生成
function createSurveyModalHTML() {
    const container = document.getElementById('surveyModalContainer');
    if (!container) return;

    const questions = [
        {name: 'usability', title: 'このサイトの使いやすさはどうですか？', options: ['とても使いやすい', '使いやすい', '普通', 'やや使いにくい', '使いにくい']},
        {name: 'design_preference', title: 'サイトの見た目は好みですか？', options: ['とても好き', 'まあまあ好き', 'どちらでもない', 'あまり好きではない', '全く好きではない']},
        {name: 'info_findability', title: '探している情報はすぐに見つかりましたか？', options: ['すぐ見つかった（1分以内）', '少し探した（2-3分）', '普通（3-5分）', '時間がかかった（5分以上）', '見つからなかった']},
        {name: 'text_readability', title: '文字の大きさは読みやすいですか？', options: ['ちょうど良い', 'やや読みやすい', '普通', 'やや読みにくい', '読みにくい']},
        {name: 'page_speed', title: 'ページの表示速度は速いですか？', options: ['とても速い（1秒以内）', '速い（2-3秒）', '普通（4-5秒）', '遅い（6-10秒）', 'とても遅い（10秒以上）']},
        {name: 'device', title: 'どのデバイスで閲覧していますか？', options: ['スマートフォン', 'タブレット', 'ノートPC', 'デスクトップPC', 'その他']},
        {name: 'competitor_comparison', title: '競合他社と比べてこのサイトは？', options: ['かなり優れている', '優れている', '同等', 'やや劣る', 'かなり劣る']},
        {name: 'site_impression', title: 'このサイトの印象を一言で表すと？', options: ['プロフェッショナル', '親しみやすい', 'シンプル', '情報が多い', 'わかりにくい']},
        {name: 'contact_intention', title: 'お問い合わせしたいと思いますか？', options: ['今すぐしたい', '近いうちにしたい', '検討中', '情報収集のみ', '予定なし']},
        {name: 'overall_rating', title: 'このサイトを5段階で評価すると？', options: ['★★★★★（とても良い）', '★★★★☆（良い）', '★★★☆☆（普通）', '★★☆☆☆（改善が必要）', '★☆☆☆☆（大幅な改善が必要）']}
    ];

    const questionsHTML = questions.map((q, index) => `
        <div class="question ${index === 0 ? 'active' : ''}" data-question="${index + 1}">
            <h2 class="question-title">${q.title}</h2>
            <div class="radio-group" data-name="${q.name}">
                ${q.options.map(opt => `
                    <label class="radio-option">
                        <input type="radio" name="${q.name}" value="${opt}">
                        <span class="radio-label">${opt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');

    container.innerHTML = `
    <div class="modal-overlay" id="surveyModal">
        <div class="modal-container">
            <button class="close-modal" id="closeModal">×</button>
            <div class="modal-survey-container" id="modalSurveyContainer">
                <div class="survey-header">
                    <h1 class="survey-title">WEBサイト評価アンケート</h1>
                    <p class="survey-description">当サイトの改善のため、皆様のご意見をお聞かせください。<br>ご回答は約2-3分で完了します。</p>
                </div>
                <div class="progress-section">
                    <div class="progress-info">
                        <span class="progress-text">進捗状況</span>
                        <span class="progress-counter" id="progressCounter">1 / 10</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                </div>
                <div class="question-container" id="questionContainer">
                    ${questionsHTML}
                </div>
                <div class="navigation">
                    <button class="nav-btn" id="prevBtn" disabled>戻る</button>
                    <button class="skip-survey" id="skipSurvey">今回はスキップ</button>
                    <button class="nav-btn primary" id="nextBtn">次へ</button>
                </div>
                <div id="selectionMessage" style="text-align: center; margin-top: 20px; color: #00ff88; opacity: 0; transition: opacity 0.3s; font-size: 0.9rem;">
                    ※ 選択してから次へ進んでください
                </div>
                <div class="completion-screen" id="completionScreen">
                    <div class="completion-icon">✓</div>
                    <h2 class="completion-title">アンケート完了</h2>
                    <p class="completion-text">貴重なご意見をありがとうございました！<br>いただいたフィードバックは、サイト改善に活用させていただきます。</p>
                </div>
                <div class="loading" id="loading">
                    <div class="spinner"></div>
                    <p>送信中...</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

// 離脱意図検知システム
class ExitIntentDetector {
    constructor(options = {}) {
        this.modal = document.getElementById('surveyModal');
        this.closeBtn = document.getElementById('closeModal');
        this.skipBtn = document.getElementById('skipSurvey');
        this.startTime = Date.now();
        this.minTimeOnSite = options.minTimeOnSite || 30000; // デフォルト30秒
        this.hasShown = false;
        this.cookieName = 'survey_shown';
        this.responseCookieName = 'survey_responded';
        this.enableCookieCheck = options.enableCookieCheck !== undefined ? options.enableCookieCheck : true;

        this.init();
    }

    init() {
        if (!this.modal) return;

        // Cookie チェック
        if (this.enableCookieCheck) {
            if (this.getCookie(this.cookieName) || this.getCookie(this.responseCookieName)) {
                return; // 既に表示済みまたは回答済み
            }
        }

        // イベントリスナー設定
        this.setupEventListeners();
    }

    setupEventListeners() {
        // PC用: マウスが画面上部に移動
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !this.hasShown) {
                this.checkAndShowSurvey();
            }
        });

        // 追加: マウス移動の監視（PC用の補助）
        let mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            if (mouseY > 100 && e.clientY < 20 && !this.hasShown) {
                this.checkAndShowSurvey();
            }
            mouseY = e.clientY;
        });

        // モバイル用: スクロール率
        if (window.innerWidth <= 768) {
            window.addEventListener('scroll', () => {
                const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
                if (scrollPercent > 0.7 && !this.hasShown) {
                    this.checkAndShowSurvey();
                }
            });
        } else {
            // PC用: スクロール率もバックアップとして使用
            window.addEventListener('scroll', () => {
                const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
                if (scrollPercent > 0.9 && !this.hasShown) {
                    this.checkAndShowSurvey();
                }
            });
        }

        // 閉じるボタン
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeSurvey());
        }
        if (this.skipBtn) {
            this.skipBtn.addEventListener('click', () => this.closeSurvey());
        }

        // ESCキーで閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('show')) {
                this.closeSurvey();
            }
        });

        // オーバーレイクリックで閉じる
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeSurvey();
                }
            });
        }
    }

    checkAndShowSurvey() {
        const timeOnSite = Date.now() - this.startTime;

        if (timeOnSite >= this.minTimeOnSite && !this.hasShown) {
            this.showSurvey();
        }
    }

    showSurvey() {
        if (!this.modal) return;

        // Check if hamburger menu is open - don't show survey while menu is open
        if (window.isHamburgerMenuOpen) {
            // Survey display will be skipped while menu is open
            // User can still trigger survey after closing menu
            return;
        }

        this.hasShown = true;
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Cookieを設定（24時間有効）
        if (this.enableCookieCheck) {
            this.setCookie(this.cookieName, 'true', 1);
        }
    }

    closeSurvey() {
        if (!this.modal) return;

        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

// モーダル用アンケートシステム
class ModalSurveySystem {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 10;
        this.answers = {};
        this.autoAdvance = false;

        this.init();
    }

    init() {
        if (!document.getElementById('questionContainer')) return;

        this.bindEvents();
        this.updateProgress();
        this.loadSavedAnswers();
        this.setupBeforeUnload();

        // コンテナの固定高さを設定
        const container = document.getElementById('questionContainer');
        if (container) {
            const isDesktop = window.innerWidth > 768;
            container.style.height = isDesktop ? '400px' : '300px';
        }
    }

    bindEvents() {
        // ナビゲーションボタン
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevQuestion());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());

        // ラジオボタン
        const container = document.getElementById('questionContainer');

        if (container) {
            container.querySelectorAll('.radio-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const input = option.querySelector('input[type="radio"]');
                    if (input) {
                        input.checked = true;
                        this.handleRadioSelection(option);
                    }
                });
            });
        }
    }

    handleRadioSelection(selectedOption) {
        const group = selectedOption.closest('.radio-group');
        const name = group.dataset.name;
        const value = selectedOption.querySelector('input').value;

        // 選択状態の更新
        group.querySelectorAll('.radio-option').forEach(option => {
            option.classList.remove('selected');
        });
        selectedOption.classList.add('selected');

        this.answers[name] = value;
        this.saveAnswers();

        // 次へボタンの状態を更新
        this.updateNextButtonState();

        if (this.autoAdvance) {
            setTimeout(() => this.nextQuestion(), 600);
        }
    }

    nextQuestion() {
        // 現在の質問に回答があるかチェック
        const container = document.getElementById('questionContainer');

        if (container) {
            const currentQ = container.querySelector(`[data-question="${this.currentQuestion}"]`);
            if (currentQ) {
                const radioGroup = currentQ.querySelector('.radio-group');
                if (radioGroup) {
                    const selectedRadio = radioGroup.querySelector('input[type="radio"]:checked');
                    if (!selectedRadio) {
                        this.showSelectionWarning();
                        return;
                    }
                }
            }
        }

        if (this.currentQuestion < this.totalQuestions) {
            this.changeQuestion(this.currentQuestion + 1);
        } else {
            this.submitSurvey();
        }
    }

    showSelectionWarning() {
        const nextBtn = document.getElementById('nextBtn');
        const message = document.getElementById('selectionMessage');

        // ボタンを振動させて注意を引く
        if (nextBtn) {
            nextBtn.style.animation = 'shake 0.5s';
            setTimeout(() => {
                nextBtn.style.animation = '';
            }, 500);
        }

        // メッセージを表示
        if (message) {
            message.style.opacity = '1';
            setTimeout(() => {
                message.style.opacity = '0';
            }, 2000);
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 1) {
            this.changeQuestion(this.currentQuestion - 1);
        }
    }

    changeQuestion(questionNumber) {
        const container = document.getElementById('questionContainer');
        if (!container) return;

        const currentQ = container.querySelector(`[data-question="${this.currentQuestion}"]`);
        const nextQ = container.querySelector(`[data-question="${questionNumber}"]`);

        if (currentQ && nextQ) {
            // アニメーション
            if (questionNumber > this.currentQuestion) {
                // 次へ進む場合
                nextQ.style.display = 'block';
                nextQ.classList.remove('prev', 'active');
                nextQ.classList.add('next');

                setTimeout(() => {
                    currentQ.classList.remove('active');
                    currentQ.classList.add('prev');

                    nextQ.classList.remove('next');
                    nextQ.classList.add('active');

                    setTimeout(() => {
                        currentQ.style.display = 'none';
                    }, 400);
                }, 50);
            } else {
                // 前へ戻る場合
                nextQ.style.display = 'block';
                nextQ.classList.remove('next', 'active');
                nextQ.classList.add('prev');

                setTimeout(() => {
                    currentQ.classList.remove('active');
                    currentQ.classList.add('next');

                    nextQ.classList.remove('prev');
                    nextQ.classList.add('active');

                    setTimeout(() => {
                        currentQ.style.display = 'none';
                    }, 400);
                }, 50);
            }

            this.currentQuestion = questionNumber;
            this.updateProgress();
            this.updateNavigation();
        }
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        const fillElement = document.getElementById('progressFill');
        const counterElement = document.getElementById('progressCounter');

        if (fillElement) fillElement.style.width = `${progress}%`;
        if (counterElement) counterElement.textContent = `${this.currentQuestion} / ${this.totalQuestions}`;
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) prevBtn.disabled = this.currentQuestion === 1;
        if (nextBtn) nextBtn.textContent = this.currentQuestion === this.totalQuestions ? '送信' : '次へ';

        this.updateNextButtonState();
    }

    updateNextButtonState() {
        const nextBtn = document.getElementById('nextBtn');
        const container = document.getElementById('questionContainer');

        if (!container || !nextBtn) return;

        const currentQ = container.querySelector(`[data-question="${this.currentQuestion}"]`);

        if (currentQ) {
            const radioGroup = currentQ.querySelector('.radio-group');
            if (radioGroup) {
                const selectedRadio = radioGroup.querySelector('input[type="radio"]:checked');
                if (!selectedRadio) {
                    nextBtn.style.opacity = '0.6';
                    nextBtn.style.cursor = 'not-allowed';
                } else {
                    nextBtn.style.opacity = '1';
                    nextBtn.style.cursor = 'pointer';
                }
            }
        }
    }

    saveAnswers() {
        localStorage.setItem('modalSurveyAnswers', JSON.stringify(this.answers));
    }

    loadSavedAnswers() {
        const saved = localStorage.getItem('modalSurveyAnswers');
        if (saved) {
            this.answers = JSON.parse(saved);
            this.restoreAnswers();
        }
    }

    restoreAnswers() {
        Object.keys(this.answers).forEach(key => {
            const radio = document.querySelector(`input[name="${key}"][value="${this.answers[key]}"]`);
            if (radio) {
                radio.checked = true;
                radio.closest('.radio-option').classList.add('selected');
            }
        });
    }

    setupBeforeUnload() {
        window.addEventListener('beforeunload', (e) => {
            if (Object.keys(this.answers).length > 0 && this.currentQuestion < this.totalQuestions) {
                e.preventDefault();
                e.returnValue = '';
                return 'アンケートの回答が保存されていません。ページを離れますか？';
            }
        });
    }

    async submitSurvey() {
        const loading = document.getElementById('loading');
        const questionContainer = document.getElementById('questionContainer');
        const navigation = document.querySelector('.modal-survey-container .navigation');
        const progressSection = document.querySelector('.modal-survey-container .progress-section');

        // UI更新
        if (loading) loading.style.display = 'block';
        if (questionContainer) questionContainer.style.display = 'none';
        if (navigation) navigation.style.display = 'none';
        if (progressSection) progressSection.style.display = 'none';

        // データ準備
        const surveyData = {
            timestamp: new Date().toLocaleString('ja-JP'),
            ...this.answers,
            user_agent: navigator.userAgent,
            page_url: window.location.href
        };

        try {
            // 実際の送信処理（Google Apps Script URLを設定して使用）
            // await this.submitToGAS(surveyData);

            // テスト用のダミー送信
            await this.simulateSubmission(surveyData);

            // 成功時の処理
            if (loading) loading.style.display = 'none';
            const completionScreen = document.getElementById('completionScreen');
            if (completionScreen) completionScreen.classList.add('active');

            // ローカルストレージをクリア
            localStorage.removeItem('modalSurveyAnswers');

            // 回答済みCookieを設定（30日間有効）
            this.setCookie('survey_responded', 'true', 30);

        } catch (error) {
            console.error('送信エラー:', error);
            if (loading) loading.style.display = 'none';
            if (questionContainer) questionContainer.style.display = 'block';
            if (navigation) navigation.style.display = 'flex';
            if (progressSection) progressSection.style.display = 'block';
            alert('送信に失敗しました。もう一度お試しください。');
        }
    }

    // テスト用のダミー送信関数
    async simulateSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('送信データ:', data);
                resolve();
            }, 2000);
        });
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // 実際のGoogle Apps Script送信関数
    async submitToGAS(data) {
        const GAS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

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
}

// 初期化関数
function initModalSurvey(options = {}) {
    // アンケートモーダルHTMLを動的生成
    createSurveyModalHTML();

    // 少し待ってから離脱意図検知を開始（DOM生成完了を待つ）
    setTimeout(() => {
        new ExitIntentDetector(options);
        new ModalSurveySystem();
    }, 100);
}

// DOMContentLoaded時に自動初期化（オプション）
if (typeof autoInitModalSurvey !== 'undefined' && autoInitModalSurvey) {
    document.addEventListener('DOMContentLoaded', () => {
        initModalSurvey();
    });
}
