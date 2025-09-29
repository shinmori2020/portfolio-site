// グローバル変数
let calendar;
let selectedDate = null;
let selectedTime = null;
let formData = {};

// 営業時間設定
const businessHours = {
    start: 9,
    end: 18,
    timeSlots: [
        '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ]
};

// 休業日設定（例: 土日）
const holidays = [0, 6]; // 0: 日曜日, 6: 土曜日

// EmailJS設定（実際の値に置き換えてください）
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // 例: 'AbCdEfGhIjKlMnOpQrSt'
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // 例: 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // 例: 'template_xyz789'

// EmailJS初期化
emailjs.init(EMAILJS_PUBLIC_KEY);

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    setupFormValidation();
    setupEventListeners();

    // ウィンドウリサイズ時の対応
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const isMobile = window.innerWidth <= 480;
            if (calendar) {
                calendar.setOption('height', isMobile ? 300 : 'auto');
                calendar.setOption('aspectRatio', isMobile ? 1.2 : 1.35);
            }
        }, 250);
    });
});

// カレンダー初期化
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    const isMobile = window.innerWidth <= 480;

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ja',
        height: isMobile ? 300 : 'auto',
        aspectRatio: isMobile ? 1.2 : 1.35,
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        buttonText: {
            today: '今日'
        },
        dayCellClassNames: function(arg) {
            const day = arg.date.getDay();
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // 過去の日付
            if (arg.date < today) {
                return ['booked-slot'];
            }

            // 休業日
            if (holidays.includes(day)) {
                return ['booked-slot'];
            }

            // 予約可能
            return ['available-slot'];
        },
        dateClick: function(info) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // 過去の日付は選択不可
            if (info.date < today) {
                showError('過去の日付は選択できません');
                return;
            }

            // 休業日は選択不可
            if (holidays.includes(info.date.getDay())) {
                showError('休業日は選択できません');
                return;
            }

            selectDate(info.date);
        }
    });

    calendar.render();
}

// 日付選択処理
function selectDate(date) {
    selectedDate = date;

    // 選択された日付を表示
    const dateText = formatDate(date);
    document.getElementById('selected-date-text').textContent = dateText;
    document.getElementById('selected-date').style.display = 'block';

    // 時間選択を表示
    document.getElementById('time-selection').style.display = 'block';
    generateTimeSlots(date);

    // 送信ボタンのチェック
    checkSubmitButton();
}

// 時間スロット生成
function generateTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('time-slots');
    timeSlotsContainer.innerHTML = '';

    businessHours.timeSlots.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.textContent = time;
        slot.dataset.time = time;

        // ダミーの予約済みチェック（実際はGoogle Calendar APIで確認）
        const isBooked = Math.random() < 0.2; // 20%の確率で予約済み

        if (isBooked) {
            slot.classList.add('disabled');
            slot.title = '予約済み';
        } else {
            slot.addEventListener('click', function() {
                selectTime(this);
            });
        }

        timeSlotsContainer.appendChild(slot);
    });
}

// 時間選択処理
function selectTime(element) {
    // 既存の選択をクリア
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });

    // 新しい選択
    element.classList.add('selected');
    selectedTime = element.dataset.time;

    // エラーメッセージを非表示
    document.getElementById('time-error').classList.remove('show');

    // 送信ボタンのチェック
    checkSubmitButton();
}

// フォームバリデーション設定
function setupFormValidation() {
    const form = document.getElementById('reservation-form');
    const inputs = form.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
            checkSubmitButton();
        });
    });
}

// フィールドバリデーション
function validateField(field) {
    const fieldName = field.name || field.id;
    const errorElement = document.getElementById(fieldName + '-error');

    let isValid = true;

    // 必須チェック
    if (field.required && !field.value.trim()) {
        isValid = false;
    }

    // メールアドレスバリデーション
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
        }
    }

    // 電話番号バリデーション
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d-]+$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
        }
    }

    // エラー表示制御
    if (isValid) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    } else {
        field.classList.add('error');
        if (errorElement) {
            errorElement.classList.add('show');
        }
    }

    return isValid;
}

// チェックボックスバリデーション
function validateCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="service"]');
    const checked = Array.from(checkboxes).some(cb => cb.checked);
    const errorElement = document.getElementById('service-error');

    if (!checked) {
        errorElement.classList.add('show');
        return false;
    } else {
        errorElement.classList.remove('show');
        return true;
    }
}

// 送信ボタンの有効/無効チェック
function checkSubmitButton() {
    const submitButton = document.getElementById('submit-button');
    const nameValid = document.getElementById('name').value.trim() !== '';
    const emailValid = document.getElementById('email').value.trim() !== '';
    const servicesValid = document.querySelectorAll('input[name="service"]:checked').length > 0;

    if (selectedDate && selectedTime && nameValid && emailValid && servicesValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// イベントリスナー設定
function setupEventListeners() {
    // フォーム送信
    document.getElementById('reservation-form').addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            showConfirmationModal();
        }
    });

    // チェックボックス変更監視
    document.querySelectorAll('input[name="service"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            validateCheckboxes();
            checkSubmitButton();
        });
    });
}

// フォーム全体のバリデーション
function validateForm() {
    let isValid = true;

    // 日付と時間
    if (!selectedDate || !selectedTime) {
        showError('日付と時間を選択してください');
        isValid = false;
    }

    // 必須フィールド
    const requiredFields = ['name', 'email'];
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // チェックボックス
    if (!validateCheckboxes()) {
        isValid = false;
    }

    return isValid;
}

// 確認モーダル表示
function showConfirmationModal() {
    // フォームデータ収集
    collectFormData();

    // 確認内容生成
    const details = document.getElementById('confirmation-details');
    details.innerHTML = `
        <p><strong>日時:</strong> ${formatDate(selectedDate)} ${selectedTime}</p>
        <p><strong>お名前:</strong> ${formData.name}</p>
        <p><strong>メールアドレス:</strong> ${formData.email}</p>
        <p><strong>電話番号:</strong> ${formData.phone || 'なし'}</p>
        <p><strong>相談内容:</strong> ${formData.services.join(', ')}</p>
        <p><strong>予算感:</strong> ${formData.budget || '未定'}</p>
        <p><strong>希望納期:</strong> ${formData.deadline || '未定'}</p>
        ${formData.details ? `<p><strong>詳細:</strong> ${formData.details}</p>` : ''}
    `;

    // モーダル表示
    document.getElementById('confirmation-modal').classList.add('show');
}

// モーダル閉じる
function closeModal() {
    document.getElementById('confirmation-modal').classList.remove('show');
}

// フォームデータ収集
function collectFormData() {
    formData = {
        date: formatDate(selectedDate),
        time: selectedTime,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        services: Array.from(document.querySelectorAll('input[name="service"]:checked'))
            .map(cb => cb.value),
        budget: document.getElementById('budget').value,
        deadline: document.getElementById('deadline').value,
        details: document.getElementById('details').value
    };
}

// 予約確定処理
async function confirmReservation() {
    closeModal();

    // ローディング表示
    document.getElementById('loading').classList.add('show');
    document.getElementById('submit-button').disabled = true;

    try {
        // EmailJS でメール送信（お客様向け）
        await sendConfirmationEmail();

        // EmailJS でメール送信（事業者向け）
        await sendNotificationEmail();

        // 成功処理
        showSuccess();

    } catch (error) {
        console.error('Error:', error);
        showError('予約処理中にエラーが発生しました。');
    } finally {
        document.getElementById('loading').classList.remove('show');
    }
}

// 確認メール送信（お客様向け）
async function sendConfirmationEmail() {
    // EmailJSのテンプレートパラメータ
    const templateParams = {
        to_email: formData.email,
        to_name: formData.name,
        date: formData.date,
        time: formData.time,
        services: formData.services.join(', '),
        budget: formData.budget || '未定',
        deadline: formData.deadline || '未定',
        details: formData.details || 'なし'
    };

    // EmailJSでメール送信
    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('確認メール送信成功:', templateParams);
    } catch (error) {
        console.error('確認メール送信エラー:', error);
        // エラーが発生してもフォーム送信は続行
    }
}

// 通知メール送信（事業者向け）
async function sendNotificationEmail() {
    // EmailJSのテンプレートパラメータ
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'なし',
        date: formData.date,
        time: formData.time,
        services: formData.services.join(', '),
        budget: formData.budget || '未定',
        deadline: formData.deadline || '未定',
        details: formData.details || 'なし'
    };

    // EmailJSでメール送信（通知用テンプレートがある場合）
    try {
        // 別のテンプレートIDを使用する場合はここで指定
        // await emailjs.send(EMAILJS_SERVICE_ID, 'YOUR_NOTIFICATION_TEMPLATE_ID', templateParams);
        console.log('通知メール送信（必要に応じて有効化）:', templateParams);
    } catch (error) {
        console.error('通知メール送信エラー:', error);
        // エラーが発生してもフォーム送信は続行
    }
}

// 成功表示
function showSuccess() {
    document.getElementById('success-message').classList.add('show');

    // フォームリセット
    setTimeout(() => {
        resetForm();
    }, 3000);
}

// エラー表示
function showError(message) {
    const errorBanner = document.getElementById('error-banner');
    const errorText = document.getElementById('error-text');

    errorText.textContent = message;
    errorBanner.classList.add('show');

    setTimeout(() => {
        errorBanner.classList.remove('show');
    }, 5000);
}

// フォームリセット
function resetForm() {
    document.getElementById('reservation-form').reset();
    selectedDate = null;
    selectedTime = null;

    // UI リセット
    document.getElementById('selected-date').style.display = 'none';
    document.getElementById('time-selection').style.display = 'none';
    document.getElementById('success-message').classList.remove('show');
    document.getElementById('submit-button').disabled = true;

    // 時間スロットのリセット
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });

    // エラー表示のリセット
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });

    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
}

// 日付フォーマット
function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    return `${year}年${month}月${day}日（${weekday}）`;
}

// Google Calendar API 関連（実装例）
// 実際の実装では、Google Calendar APIの認証と連携が必要
async function checkGoogleCalendarAvailability(date, time) {
    // Google Calendar APIで空き状況を確認
    // この部分は実際のAPI実装が必要
    return true; // デモ用
}

async function createGoogleCalendarEvent(data) {
    // Google Calendar APIで予定を作成
    // この部分は実際のAPI実装が必要
    console.log('Creating Google Calendar event:', data);
}