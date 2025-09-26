/**
 * contact-form.js - お問い合わせフォーム用JavaScript
 * カスタムセレクト、フォームバリデーション、送信処理
 */

document.addEventListener('DOMContentLoaded', function() {
    // カスタムセレクトドロップダウン機能
    initCustomSelect();

    // フォーム送信処理
    initContactForm();
});

/**
 * カスタムセレクトドロップダウン機能
 */
function initCustomSelect() {
    const customSelectButton = document.getElementById('customSelectButton');
    const customSelectDropdown = document.getElementById('customSelectDropdown');
    const customSelectText = customSelectButton?.querySelector('.contact__select-text');
    const originalSelect = document.getElementById('contactSubject');
    const customOptions = document.querySelectorAll('.contact__option');

    if (!customSelectButton || !customSelectDropdown) return;

    // ドロップダウンのトグル
    customSelectButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = customSelectDropdown.classList.contains('open');

        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // オプション選択処理
    customOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const value = this.getAttribute('data-value');
            const text = this.textContent;

            // カスタムセレクトの表示を更新
            customSelectText.textContent = text;
            customSelectText.classList.add('selected');

            // 元のselectの値を更新
            originalSelect.value = value;

            // changeイベントを発火（バリデーション用）
            const changeEvent = new Event('change', { bubbles: true });
            originalSelect.dispatchEvent(changeEvent);

            closeDropdown();
        });
    });

    // ドロップダウンコンテナのクリックイベント伝播を防止
    customSelectDropdown.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    // ドロップダウン外側をクリックしたら閉じる
    document.addEventListener('click', function(event) {
        if (!customSelectButton.contains(event.target) &&
            !customSelectDropdown.contains(event.target)) {
            closeDropdown();
        }
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeDropdown();
        }
    });

    function openDropdown() {
        customSelectButton.classList.add('active');
        customSelectDropdown.classList.add('open');

        // 他の要素のホバーエフェクトを無効化
        const contactFormContainer = document.querySelector('.contact__form-container');
        if (contactFormContainer) {
            contactFormContainer.classList.add('dropdown-open');
        }
    }

    function closeDropdown() {
        customSelectButton.classList.remove('active');
        customSelectDropdown.classList.remove('open');

        // ホバーエフェクトを再有効化
        const contactFormContainer = document.querySelector('.contact__form-container');
        if (contactFormContainer) {
            contactFormContainer.classList.remove('dropdown-open');
        }
    }

    // フォームリセット時の処理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('reset', function() {
            setTimeout(() => {
                customSelectText.textContent = 'お問い合わせ内容を選択してください';
                customSelectText.classList.remove('selected');
                closeDropdown();
            }, 10);
        });
    }
}

/**
 * お問い合わせフォーム送信処理
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('contactSuccessMessage');
    const errorMessage = document.getElementById('contactErrorMessage');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // メッセージを非表示
        successMessage.classList.remove('show');
        errorMessage.classList.remove('show');

        // フォームデータを取得
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 送信シミュレーション（実際の送信処理に置き換え）
        setTimeout(() => {
            // 成功メッセージを表示
            successMessage.classList.add('show');

            // フォームをリセット
            contactForm.reset();

            // カスタムセレクトをリセット
            const customSelectText = document.querySelector('.contact__select-text');
            if (customSelectText) {
                customSelectText.textContent = 'お問い合わせ内容を選択してください';
                customSelectText.classList.remove('selected');
            }

            // 3秒後にメッセージを非表示
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
        }, 1000);
    });
}