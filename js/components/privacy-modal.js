/**
 * privacy-modal.js - プライバシーポリシーモーダル処理
 * お問い合わせフォームでの同意確認機能
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    const privacyPolicyLink = document.getElementById('privacyPolicyLink');
    const privacyModal = document.getElementById('privacyModal');
    const closePrivacyModal = document.getElementById('closePrivacyModal');
    const privacyContent = document.getElementById('privacyContent');
    const scrollNotice = document.getElementById('scrollNotice');
    const agreeButton = document.getElementById('agreePrivacy');
    const cancelButton = document.getElementById('cancelPrivacy');
    const privacyConsent = document.getElementById('privacyConsent');
    const submitButton = document.getElementById('submitButton');
    const privacyStatus = document.getElementById('privacyStatus');
    const contactForm = document.getElementById('contactForm');

    // 要素が存在しない場合は処理を中断
    if (!privacyPolicyLink || !privacyModal) return;

    let hasScrolledToBottom = false;

    // プライバシーポリシーリンクのクリック
    privacyPolicyLink.addEventListener('click', function(e) {
        e.preventDefault();
        openPrivacyModal();
    });

    // モーダルを開く
    function openPrivacyModal() {
        privacyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        // スクロール状態をリセット
        hasScrolledToBottom = false;
        agreeButton.disabled = true;
        scrollNotice.classList.remove('hidden');
        scrollNotice.classList.remove('fade-out');
        privacyContent.scrollTop = 0;
    }

    // モーダルを閉じる
    function closeModal() {
        privacyModal.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }

    // 閉じるボタンのクリック
    closePrivacyModal.addEventListener('click', closeModal);

    // オーバーレイクリックで閉じる
    privacyModal.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            closeModal();
        }
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && privacyModal.classList.contains('active')) {
            closeModal();
        }
    });

    // スクロール検知
    privacyContent.addEventListener('scroll', function() {
        const scrollTop = privacyContent.scrollTop;
        const scrollHeight = privacyContent.scrollHeight;
        const clientHeight = privacyContent.clientHeight;

        // 最下部まで読んだかチェック（余裕を持って50px以内）
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            if (!hasScrolledToBottom) {
                hasScrolledToBottom = true;
                agreeButton.disabled = false;

                // 自然にフェードアウト（高さは維持）
                scrollNotice.classList.add('fade-out');

                // 視覚的フィードバック（アニメーションのみ）
                agreeButton.style.animation = 'pulse 1s ease-in-out';

                // アニメーション削除
                setTimeout(() => {
                    agreeButton.style.animation = '';
                }, 1000);
            }
        }
    });

    // 同意ボタンのクリック
    agreeButton.addEventListener('click', function() {
        if (hasScrolledToBottom) {
            // チェックボックスを有効化＆チェック
            privacyConsent.disabled = false;
            privacyConsent.checked = true;

            // ステータス更新
            privacyStatus.innerHTML = '<span style="display: inline-block; width: 16px; height: 16px; position: relative; margin-right: 6px; vertical-align: middle;"><span style="content: \'\'; position: absolute; left: 4px; top: 0; width: 5px; height: 10px; border: solid #00ff88; border-width: 0 2.5px 2.5px 0; transform: rotate(45deg);"></span></span>プライバシーポリシーに同意済み';
            privacyStatus.style.color = '#00ff88';

            // 送信ボタンを有効化
            checkFormValidity();

            // モーダルを閉じる
            closeModal();

            // 成功メッセージ
            showSuccessMessage('プライバシーポリシーに同意いただきありがとうございます。');
        }
    });

    // キャンセルボタンのクリック
    cancelButton.addEventListener('click', closeModal);

    // チェックボックスの変更
    privacyConsent.addEventListener('change', function() {
        checkFormValidity();

        if (!this.checked) {
            privacyStatus.textContent = 'プライバシーポリシーをお読みください';
            privacyStatus.style.color = '#666';
        }
    });

    // フォームの有効性をチェック
    function checkFormValidity() {
        const isFormValid = contactForm.checkValidity();
        const isPrivacyAgreed = privacyConsent.checked;

        submitButton.disabled = !(isFormValid && isPrivacyAgreed);
    }

    // フォーム要素の変更を監視
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
        input.addEventListener('change', checkFormValidity);
    });

    // フォーム送信時の追加チェック
    contactForm.addEventListener('submit', function(e) {
        if (!privacyConsent.checked) {
            e.preventDefault();
            showErrorMessage('プライバシーポリシーに同意してください。');
            return false;
        }
    });

    // 成功メッセージ表示
    function showSuccessMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 255, 136, 0.1);
            color: #00ff88;
            padding: 16px 24px;
            border: 2px solid rgba(0, 255, 136, 0.3);
            backdrop-filter: blur(10px);
            z-index: 10001;
            font-weight: 600;
            max-width: 350px;
            word-wrap: break-word;
            animation: slideIn 0.3s ease;
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 3000);
    }

    // エラーメッセージ表示
    function showErrorMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b6b;
            color: #fff;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
            z-index: 10001;
            font-weight: 500;
            max-width: 350px;
            word-wrap: break-word;
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // 初期フォーム状態チェック
    checkFormValidity();
});
