/* ========================================
   EmailJS 設定手順（重要！）
   ========================================

   1. EmailJS アカウント作成
      - https://www.emailjs.com/ でサインアップ（無料）

   2. Email Service を追加
      - Dashboard > Email Services > Add New Service
      - Gmail または他のメールサービスを選択
      - Service ID をメモ（例: "service_abc123"）

   3. Email Template を作成
      - Dashboard > Email Templates > Create New Template
      - 以下の変数を使用:
        {{from_name}} - お客様名
        {{from_email}} - メールアドレス
        {{company_name}} - 会社名
        {{phone}} - 電話番号
        {{deadline}} - 希望納期
        {{selected_items}} - 選択項目
        {{total_price}} - 概算金額
        {{message}} - その他要望
        {{receipt_number}} - 受付番号
      - Template ID をメモ（例: "template_xyz789"）

   4. API Keys を確認
      - Dashboard > Account > API Keys
      - Public Key をメモ（例: "user_PublicKey123"）

   5. 下記の定数を実際の値に置き換える
      - EMAILJS_PUBLIC_KEY
      - EMAILJS_SERVICE_ID
      - EMAILJS_TEMPLATE_ID

   6. Netlify へデプロイ後
      - EmailJS Dashboard > Email Services > 設定
      - Whitelist domains に Netlify URL を追加
      （例: your-site.netlify.app）
======================================== */

// EmailJS 設定（これらを実際の値に置き換えてください）
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';  // EmailJSのPublic Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';  // Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Template ID

// EmailJS 初期化
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// 料金設定
const pricingConfig = {
    pages: {
        1: 100000,
        5: 150000,
        10: 200000,
        custom: 0 // 個別相談
    },
    design: {
        template: 0,
        custom: 80000,
        premium: 180000
    },
    features: {
        'add-page': 10000,
        'lp-extension': 3000,
        'contact-form': 10000,
        'booking-form': 20000,
        'basic-cms': 20000,
        'advanced-cms': 10000,
        'news': 10000,
        'sns': 5000,
        'maps': 5000,
        'seo': 10000,
        'slider': 15000,
        'animation': 20000,
        'parallax': 20000,
        'modal': 20000,
        'wp-acf': 15000,
        'wp-faq': 10000,
        'wp-woo-basic': 25000,
        'wp-woo-payment': 15000,
        'wp-membership': 35000,
        'wp-yoast': 10000,
        'wp-polylang': 15000
    }
};

// DOM要素の取得（BEM記法準拠）
const totalPriceElement = document.getElementById('totalPrice');
const breakdownElement = document.getElementById('breakdownItems');

// 計算機の初期化
function initPricingCalculator() {
    // 診断ツールからのパラメータをチェック
    checkDiagnosisParams();
    updatePrice();
    attachEventListeners();
}

// 診断ツールからのパラメータを処理
function checkDiagnosisParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const fromDiagnosis = urlParams.get('from') === 'diagnosis';
    const recommendedType = urlParams.get('type');

    if (fromDiagnosis && recommendedType) {
        // LocalStorageから診断結果を取得
        const diagnosisData = localStorage.getItem('diagnosisResult');
        if (diagnosisData) {
            const result = JSON.parse(diagnosisData);
            applyDiagnosisResult(result, recommendedType);

            // 診断からの遷移メッセージを表示
            showDiagnosisMessage(result.recommendation);
        }
    }
}

// 診断結果を料金計算機に反映
function applyDiagnosisResult(result, type) {
    const answers = result.answers;

    // プランタイプに応じて設定
    switch(type) {
        case 'lp':
            // ランディングページ設定
            document.querySelector('input[name="pages"][value="1"]').checked = true;
            document.querySelector('input[name="design"][value="custom"]').checked = true;
            break;

        case 'website':
            // Webサイト設定
            document.querySelector('input[name="pages"][value="5"]').checked = true;
            document.querySelector('input[name="design"][value="custom"]').checked = true;
            break;

        case 'wordpress':
            // WordPress設定
            document.querySelector('input[name="pages"][value="10"]').checked = true;
            document.querySelector('input[name="design"][value="premium"]').checked = true;
            // CMS機能を自動選択
            document.querySelector('input[value="basic-cms"]').checked = true;
            break;
    }

    // 機能要件に基づいて追加機能を選択
    if (answers.features) {
        answers.features.forEach(feature => {
            switch(feature) {
                case 'contact':
                    const contactCheckbox = document.querySelector('input[value="contact-form"]');
                    if (contactCheckbox) contactCheckbox.checked = true;
                    break;
                case 'cms':
                    const cmsCheckbox = document.querySelector('input[value="basic-cms"]');
                    if (cmsCheckbox) cmsCheckbox.checked = true;
                    break;
                case 'reservation':
                    const bookingCheckbox = document.querySelector('input[value="booking-form"]');
                    if (bookingCheckbox) bookingCheckbox.checked = true;
                    break;
                case 'payment':
                    const paymentCheckbox = document.querySelector('input[value="wp-woo-payment"]');
                    if (paymentCheckbox) paymentCheckbox.checked = true;
                    break;
                case 'member':
                    const memberCheckbox = document.querySelector('input[value="wp-membership"]');
                    if (memberCheckbox) memberCheckbox.checked = true;
                    break;
                case 'multilang':
                    const multilangCheckbox = document.querySelector('input[value="wp-polylang"]');
                    if (multilangCheckbox) multilangCheckbox.checked = true;
                    break;
            }
        });
    }

    // SEO対策（更新頻度が高い場合）
    if (answers.update === 'daily' || answers.update === 'weekly') {
        const seoCheckbox = document.querySelector('input[value="seo"]');
        if (seoCheckbox) seoCheckbox.checked = true;
    }
}

// 診断結果からの遷移メッセージを表示
function showDiagnosisMessage(recommendation) {
    // メッセージ要素を作成
    const messageDiv = document.createElement('div');
    messageDiv.className = 'diagnosis-message';
    messageDiv.innerHTML = `
        <div class="diagnosis-message__content">
            <h3>診断結果を反映しました</h3>
            <p>「${recommendation.plan}」をベースに料金を計算しています。<br>
            項目は自由に変更できますので、ご要望に合わせて調整してください。</p>
        </div>
        <button class="diagnosis-message__close" onclick="this.parentElement.remove()">×</button>
    `;

    // スタイルを追加
    const style = document.createElement('style');
    style.textContent = `
        .diagnosis-message {
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid var(--primary-color);
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            z-index: 1000;
            display: flex;
            gap: 20px;
            animation: slideIn 0.5s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .diagnosis-message__content h3 {
            margin: 0 0 15px 0;
            font-size: 24px;
            color: var(--primary-color);
            font-weight: 600;
        }

        .diagnosis-message__content p {
            margin: 0;
            font-size: 16px;
            color: var(--text-secondary);
            line-height: 1.8;
        }

        .diagnosis-message__close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: transparent;
            border: none;
            color: var(--text-secondary);
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .diagnosis-message__close:hover {
            color: var(--primary-color);
            transform: rotate(90deg);
        }

        @media (max-width: 768px) {
            .diagnosis-message {
                right: 10px;
                left: 10px;
                max-width: none;
                padding: 20px;
            }

            .diagnosis-message__content h3 {
                font-size: 18px;
                margin-bottom: 10px;
            }

            .diagnosis-message__content p {
                font-size: 14px;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(messageDiv);

    // 10秒後に自動で非表示
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => messageDiv.remove(), 500);
        }
    }, 10000);
}

// イベントリスナーの設定
function attachEventListeners() {
    // BEM記法のクラス名でセレクト
    const inputs = document.querySelectorAll('.pricing-calculator__option-input');
    inputs.forEach(input => {
        input.addEventListener('change', updatePrice);
    });
}

// 価格の更新
function updatePrice() {
    const selectedPages = document.querySelector('input[name="pages"]:checked').value;
    const selectedDesign = document.querySelector('input[name="design"]:checked').value;
    const selectedFeatures = Array.from(document.querySelectorAll('input[name="features"]:checked'))
        .map(input => input.value);

    // 基本料金の計算
    let basePrice = pricingConfig.pages[selectedPages];
    let designPrice = pricingConfig.design[selectedDesign];
    let featuresPrice = selectedFeatures.reduce((total, feature) => {
        return total + pricingConfig.features[feature];
    }, 0);

    const totalPrice = basePrice + designPrice + featuresPrice;

    // アニメーション付きで価格を更新
    updatePriceWithAnimation(totalPrice);

    // 内訳の更新
    updateBreakdown(selectedPages, basePrice, designPrice, featuresPrice, selectedFeatures, totalPrice);
}

// アニメーション付きで価格を更新
function updatePriceWithAnimation(newPrice) {
    totalPriceElement.classList.add('pricing-calculator__total-price--count-up');

    setTimeout(() => {
        if (newPrice === 0) {
            totalPriceElement.textContent = 'お見積り';
        } else {
            totalPriceElement.textContent = `¥${newPrice.toLocaleString()}`;
        }
        totalPriceElement.classList.remove('pricing-calculator__total-price--count-up');
    }, 100);
}

// 内訳の更新
function updateBreakdown(selectedPages, basePrice, designPrice, featuresPrice, selectedFeatures, totalPrice) {
    const pageLabels = {
        1: '1ページ',
        5: '5ページ',
        10: '10ページ',
        custom: 'カスタム'
    };

    const designLabels = {
        template: 'テンプレートベース',
        custom: 'オリジナルデザイン',
        premium: 'プレミアムデザイン'
    };

    const featureLabels = {
        'add-page': '1ページ追加',
        'lp-extension': 'LPの長さ延長',
        'contact-form': 'お問い合わせフォーム',
        'booking-form': '予約フォーム',
        'basic-cms': '基本CMS（ブログ機能）',
        'advanced-cms': '高度なCMS',
        'news': 'ニュース・お知らせ機能',
        'sns': 'SNS連携',
        'maps': 'Google Maps連携',
        'seo': '基本SEO対策',
        'slider': 'スライダー・カルーセル',
        'animation': 'アニメーション効果',
        'parallax': 'パララックス効果',
        'modal': 'モーダル・ライトボックス',
        'wp-acf': '高機能エディタ導入',
        'wp-faq': 'FAQ作成',
        'wp-woo-basic': 'WooCommerce基本設定',
        'wp-woo-payment': 'WooCommerce決済設定',
        'wp-membership': '会員制サイト構築',
        'wp-yoast': 'Yoast SEO設定',
        'wp-polylang': 'Polylang設定'
    };

    let breakdownHTML = '';

    // 基本料金
    if (selectedPages === 'custom') {
        breakdownHTML += `
            <div class="pricing-calculator__breakdown-item">
                <span>基本料金 (${pageLabels[selectedPages]})</span>
                <span>お見積り</span>
            </div>
        `;
    } else {
        breakdownHTML += `
            <div class="pricing-calculator__breakdown-item">
                <span>基本料金 (${pageLabels[selectedPages]})</span>
                <span>¥${basePrice.toLocaleString()}</span>
            </div>
        `;
    }

    // デザイン料金
    const selectedDesignValue = document.querySelector('input[name="design"]:checked').value;
    breakdownHTML += `
        <div class="pricing-calculator__breakdown-item">
            <span>デザイン (${designLabels[selectedDesignValue]})</span>
            <span>¥${designPrice.toLocaleString()}</span>
        </div>
    `;

    // 機能料金
    if (selectedFeatures.length > 0) {
        selectedFeatures.forEach(feature => {
            breakdownHTML += `
                <div class="pricing-calculator__breakdown-item">
                    <span>${featureLabels[feature]}</span>
                    <span>¥${pricingConfig.features[feature].toLocaleString()}</span>
                </div>
            `;
        });
    } else {
        breakdownHTML += `
            <div class="pricing-calculator__breakdown-item">
                <span>追加機能</span>
                <span>¥0</span>
            </div>
        `;
    }

    // 合計
    if (selectedPages === 'custom') {
        breakdownHTML += `
            <div class="pricing-calculator__breakdown-item">
                <span><strong>合計金額</strong></span>
                <span><strong>お見積り</strong></span>
            </div>
        `;
    } else {
        breakdownHTML += `
            <div class="pricing-calculator__breakdown-item">
                <span><strong>合計金額</strong></span>
                <span><strong>¥${totalPrice.toLocaleString()}</strong></span>
            </div>
        `;
    }

    breakdownElement.innerHTML = breakdownHTML;
}

// モーダル関連の要素取得
const modal = document.getElementById('quoteModal');
const modalOverlay = document.querySelector('.quote-modal__overlay');
const modalClose = document.querySelector('.quote-modal__close');
const modalCancel = document.querySelector('.quote-modal__cancel');
const quoteForm = document.getElementById('quoteForm');
const quoteSuccess = document.getElementById('quoteSuccess');
const closeSuccessBtn = document.querySelector('.quote-modal__close-success');

// 正式見積りを依頼（モーダルを開く）
function requestQuote() {
    // モーダルを開く
    openQuoteModal();

    // 選択内容を収集して表示
    updateModalSummary();
}

// モーダルを開く
function openQuoteModal() {
    modal.classList.add('quote-modal--active');
    document.body.style.overflow = 'hidden';

    // フォームをリセット
    quoteForm.reset();
    quoteForm.style.display = 'block';
    quoteSuccess.style.display = 'none';
}

// モーダルを閉じる
function closeQuoteModal() {
    modal.classList.remove('quote-modal--active');
    document.body.style.overflow = '';
}

// 選択内容をモーダルに反映
function updateModalSummary() {
    const selectedPages = document.querySelector('input[name="pages"]:checked');
    const selectedDesign = document.querySelector('input[name="design"]:checked');
    const selectedFeatures = document.querySelectorAll('input[name="features"]:checked');

    let summaryHTML = '';

    // ページ数
    if (selectedPages) {
        const pageLabel = selectedPages.nextElementSibling.querySelector('.pricing-calculator__option-title').textContent;
        const pagePrice = selectedPages.nextElementSibling.querySelector('.pricing-calculator__option-price').textContent;
        summaryHTML += `<div class="quote-modal__summary-item">• ページ数: ${pageLabel} (${pagePrice})</div>`;
    }

    // デザイン
    if (selectedDesign) {
        const designLabel = selectedDesign.nextElementSibling.querySelector('.pricing-calculator__option-title').textContent;
        const designPrice = selectedDesign.nextElementSibling.querySelector('.pricing-calculator__option-price').textContent;
        if (designPrice !== '+¥0') {
            summaryHTML += `<div class="quote-modal__summary-item">• デザイン: ${designLabel} (${designPrice})</div>`;
        }
    }

    // 追加機能
    selectedFeatures.forEach(feature => {
        const featureLabel = feature.nextElementSibling.querySelector('.pricing-calculator__option-title').textContent;
        const featurePrice = feature.nextElementSibling.querySelector('.pricing-calculator__option-price').textContent;
        summaryHTML += `<div class="quote-modal__summary-item">• ${featureLabel} (${featurePrice})</div>`;
    });

    // サマリーを更新
    document.getElementById('selectedItemsSummary').innerHTML = summaryHTML || '<div>選択された項目はありません</div>';

    // 合計金額を更新
    const totalPrice = document.getElementById('totalPrice').textContent;
    document.getElementById('modalTotalPrice').textContent = totalPrice;
}

// フォーム送信処理
async function handleQuoteSubmit(e) {
    e.preventDefault();

    // ボタンをローディング状態にする
    const submitButton = document.getElementById('submitButton');
    const submitText = submitButton.querySelector('.quote-modal__submit-text');
    const submitLoading = submitButton.querySelector('.quote-modal__submit-loading');
    const quoteError = document.getElementById('quoteError');

    submitButton.disabled = true;
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline-flex';
    quoteError.style.display = 'none';

    // フォームデータを取得
    const formData = new FormData(quoteForm);
    const customerName = formData.get('customerName');
    const companyName = formData.get('companyName') || '(未入力)';
    const customerEmail = formData.get('customerEmail');
    const customerPhone = formData.get('customerPhone') || '(未入力)';
    const projectDeadline = formData.get('projectDeadline');
    const additionalMessage = formData.get('additionalMessage') || '(なし)';

    // 選択内容を取得
    const selectedItems = Array.from(document.querySelectorAll('#selectedItemsSummary .quote-modal__summary-item'))
        .map(item => item.textContent).join('\n');
    const totalPrice = document.getElementById('modalTotalPrice').textContent;

    // 見積もり番号を生成
    const receiptNumber = generateReceiptNumber();

    // EmailJS用のテンプレートパラメータ
    const templateParams = {
        from_name: customerName,
        from_email: customerEmail,
        company_name: companyName,
        phone: customerPhone,
        deadline: projectDeadline ? new Date(projectDeadline).toLocaleDateString('ja-JP') : '(未指定)',
        selected_items: selectedItems,
        total_price: totalPrice,
        message: additionalMessage,
        receipt_number: receiptNumber,
        request_date: new Date().toLocaleString('ja-JP')
    };

    try {
        // EmailJSで送信
        if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
            // EmailJSが設定されている場合
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            console.log('EmailJS送信成功:', response);

            // 成功画面を表示
            showSuccessMessage(receiptNumber);
        } else {
            // EmailJSが設定されていない場合はmailtoにフォールバック
            console.warn('EmailJSが設定されていません。mailtoを使用します。');

            const subject = `[見積依頼 #${receiptNumber}] Webサイト制作のお見積り`;
            const body = `
【お見積り依頼】

受付番号: ${receiptNumber}
依頼日時: ${templateParams.request_date}

■ お客様情報
お名前: ${customerName}
会社名: ${companyName}
メールアドレス: ${customerEmail}
電話番号: ${customerPhone}

■ プロジェクト情報
希望納期: ${templateParams.deadline}

■ 選択された内容
${selectedItems}

概算金額: ${totalPrice}

■ その他ご要望
${additionalMessage}

---
このメールは料金自動計算機から送信されました。
`.trim();

            const mailtoLink = `mailto:info@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            // 成功画面を表示
            showSuccessMessage(receiptNumber);
        }
    } catch (error) {
        console.error('送信エラー:', error);

        // エラー画面を表示
        document.getElementById('errorMessage').textContent =
            error.text || '送信に失敗しました。もう一度お試しください。';
        quoteForm.style.display = 'none';
        quoteError.style.display = 'block';
    } finally {
        // ボタンを元に戻す
        submitButton.disabled = false;
        submitText.style.display = 'inline';
        submitLoading.style.display = 'none';
    }
}

// 受付番号を生成
function generateReceiptNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    return `${year}${month}${day}-${random}`;
}

// 成功メッセージを表示
function showSuccessMessage(receiptNumber) {
    document.getElementById('receiptNumber').textContent = receiptNumber;
    quoteForm.style.display = 'none';
    quoteSuccess.style.display = 'block';
}

// イベントリスナーの設定
modalClose.addEventListener('click', closeQuoteModal);
modalOverlay.addEventListener('click', closeQuoteModal);
modalCancel.addEventListener('click', closeQuoteModal);
closeSuccessBtn.addEventListener('click', closeQuoteModal);
quoteForm.addEventListener('submit', handleQuoteSubmit);

// エラー時の「もう一度試す」ボタン
document.querySelector('.quote-modal__retry').addEventListener('click', () => {
    document.getElementById('quoteError').style.display = 'none';
    quoteForm.style.display = 'block';
    quoteForm.reset();
    updateModalSummary();
});

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('quote-modal--active')) {
        closeQuoteModal();
    }
});

// 右側パネルの高さを左側に合わせる関数
function adjustResultPanelHeight() {
    const formElement = document.querySelector('.pricing-calculator__form');
    const resultElement = document.querySelector('.pricing-calculator__result');

    if (formElement && resultElement) {
        if (window.innerWidth <= 768) {
            // モバイルではmin-heightを解除
            resultElement.style.minHeight = '';
        } else {
            // PC版では従来通り
            const formHeight = formElement.offsetHeight;
            resultElement.style.minHeight = formHeight + 'px';
        }
    }
}

// 動的CSS値検出ヘルパー関数
function getActualPaddingValues() {
    const body = document.body;
    const resultElement = document.querySelector('.pricing-calculator__result');

    const bodyStyle = window.getComputedStyle(body);
    const resultStyle = window.getComputedStyle(resultElement);

    return {
        bodyPaddingLeft: parseFloat(bodyStyle.paddingLeft) || 0,
        bodyPaddingRight: parseFloat(bodyStyle.paddingRight) || 0,
        resultPaddingLeft: parseFloat(resultStyle.paddingLeft) || 0,
        resultPaddingRight: parseFloat(resultStyle.paddingRight) || 0
    };
}

// 価格表示の幅をbreakdownと同期する関数
function syncPriceDisplayWidth() {
    const priceDisplay = document.querySelector('.pricing-calculator__price-display');
    const breakdown = document.querySelector('.pricing-calculator__breakdown');

    if (!priceDisplay || !breakdown || window.innerWidth > 768) return;

    // 現在の状態をチェックして適切な位置設定を適用
    if (priceDisplay.classList.contains('pricing-calculator__price-display--in-place')) {
        // 通常配置の時（position: static）
        // 幅設定をリセットしてCSSのデフォルト（width: 100%）を使用
        priceDisplay.style.width = '';
        priceDisplay.style.left = '';
        priceDisplay.style.right = '';
        priceDisplay.style.transform = '';
    } else {
        // 固定配置の時（position: fixed）
        // breakdownと同じ幅に設定して画面中央に配置
        const breakdownRect = breakdown.getBoundingClientRect();
        priceDisplay.style.width = breakdownRect.width + 'px';
        priceDisplay.style.left = '50%';
        priceDisplay.style.right = 'auto';
        priceDisplay.style.transform = 'translateX(-50%)';
    }
}

// モバイルで価格表示を下部固定/解除する処理
function setupMobilePriceDisplay() {
    const priceDisplay = document.querySelector('.pricing-calculator__price-display');
    const resultContainer = document.querySelector('.pricing-calculator__result');

    if (!priceDisplay || !resultContainer) return;

    // モバイルサイズかチェック
    const isMobile = () => window.innerWidth <= 768;

    // IntersectionObserverを使用して本来の位置を監視
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (isMobile()) {
                if (entry.isIntersecting) {
                    // 本来の位置が見えたら固定解除
                    priceDisplay.classList.add('pricing-calculator__price-display--in-place');
                } else {
                    // 本来の位置が見えなくなったら下部固定
                    priceDisplay.classList.remove('pricing-calculator__price-display--in-place');
                }
                // スタイルを正しく更新
                syncPriceDisplayWidth();
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px' // 上部100pxのマージンを設定
    });

    // 監視開始
    if (isMobile()) {
        observer.observe(resultContainer);
    }

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
        // 高さ調整も同時に実行
        adjustResultPanelHeight();
        // 幅も同期
        syncPriceDisplayWidth();

        if (!isMobile()) {
            // PCサイズになったら固定解除とリセット
            priceDisplay.classList.remove('pricing-calculator__price-display--in-place');
            priceDisplay.style.left = '';
            priceDisplay.style.right = '';
            priceDisplay.style.width = '';
            priceDisplay.style.transform = '';
            observer.disconnect();
        } else {
            // モバイルサイズになったら監視再開
            observer.observe(resultContainer);
            syncPriceDisplayWidth();
        }
    });
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    initPricingCalculator();
    adjustResultPanelHeight();
    setupMobilePriceDisplay();
    // 初期幅同期
    syncPriceDisplayWidth();
});