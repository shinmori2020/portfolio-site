/* Survey A - Page Survey JavaScript */

// ページ用アンケートシステム
class PageSurveySystem {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 10;
        this.answers = {};
        this.autoAdvance = false;

        this.init();
    }

    init() {
        if (!document.getElementById('questionContainerMain')) return;

        this.setupPageQuestions();
        this.bindEvents();
        this.updateProgress();
        this.loadSavedAnswers();
        this.setupBeforeUnload();

        // コンテナの固定高さを設定
        const container = document.getElementById('questionContainerMain');
        if (container) {
            const isDesktop = window.innerWidth > 768;
            container.style.height = isDesktop ? '400px' : '300px';
        }
    }

    setupPageQuestions() {
        const container = document.getElementById('questionContainerMain');
        if (!container) return;

        // 質問HTMLが既に存在する場合は何もしない
        if (container.querySelector('.question')) {
            return;
        }

        // 質問HTMLを動的に生成する場合はここに記述
        // 現在は HTML に直接記述することを想定
    }

    bindEvents() {
        // ナビゲーションボタン
        const prevBtn = document.getElementById('prevBtnMain');
        const nextBtn = document.getElementById('nextBtnMain');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevQuestion());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());

        // ラジオボタン
        const container = document.getElementById('questionContainerMain');

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
        const container = document.getElementById('questionContainerMain');

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
        const nextBtn = document.getElementById('nextBtnMain');
        const message = document.getElementById('selectionMessageMain');

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
        const container = document.getElementById('questionContainerMain');
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
        const fillElement = document.getElementById('progressFillMain');
        const counterElement = document.getElementById('progressCounterMain');

        if (fillElement) fillElement.style.width = `${progress}%`;
        if (counterElement) counterElement.textContent = `${this.currentQuestion} / ${this.totalQuestions}`;
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtnMain');
        const nextBtn = document.getElementById('nextBtnMain');

        if (prevBtn) prevBtn.disabled = this.currentQuestion === 1;
        if (nextBtn) nextBtn.textContent = this.currentQuestion === this.totalQuestions ? '送信' : '次へ';

        this.updateNextButtonState();
    }

    updateNextButtonState() {
        const nextBtn = document.getElementById('nextBtnMain');
        const container = document.getElementById('questionContainerMain');

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
        localStorage.setItem('pageSurveyAnswers', JSON.stringify(this.answers));
    }

    loadSavedAnswers() {
        const saved = localStorage.getItem('pageSurveyAnswers');
        if (saved) {
            this.answers = JSON.parse(saved);
            this.restoreAnswers();
        }
    }

    restoreAnswers() {
        Object.keys(this.answers).forEach(key => {
            const radio = document.querySelector(`#questionContainerMain input[name="${key}_main"][value="${this.answers[key]}"]`);
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
        const loading = document.getElementById('loadingMain');
        const questionContainer = document.getElementById('questionContainerMain');
        const navigation = document.querySelector('.page-survey-container .navigation');
        const progressSection = document.querySelector('.page-survey-container .progress-section');

        // UI更新
        if (loading) loading.style.display = 'block';
        if (questionContainer) questionContainer.style.display = 'none';
        if (navigation) navigation.style.display = 'none';
        if (progressSection) progressSection.style.display = 'none';

        // データ準備
        const surveyData = {
            timestamp: new Date().toLocaleString('ja-JP'),
            survey_type: 'page',
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
            const completionScreen = document.getElementById('completionScreenMain');
            if (completionScreen) completionScreen.classList.add('active');

            // ローカルストレージをクリア
            localStorage.removeItem('pageSurveyAnswers');

            // 回答済みCookieを設定（30日間有効）
            this.setCookie('page_survey_responded', 'true', 30);

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
                console.log('ページ版アンケート送信データ:', data);
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
function initPageSurvey() {
    new PageSurveySystem();
}

// DOMContentLoaded時に自動初期化（オプション）
if (typeof autoInitPageSurvey !== 'undefined' && autoInitPageSurvey) {
    document.addEventListener('DOMContentLoaded', () => {
        initPageSurvey();
    });
}