/* Survey B - Modal Survey JavaScript */

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
    // 離脱意図検知を開始
    new ExitIntentDetector(options);

    // モーダル用のSurveySystem
    new ModalSurveySystem();
}

// DOMContentLoaded時に自動初期化（オプション）
if (typeof autoInitModalSurvey !== 'undefined' && autoInitModalSurvey) {
    document.addEventListener('DOMContentLoaded', () => {
        initModalSurvey();
    });
}