# 予約システム 機能 仕様書

## 📋 機能概要

WEBサイト制作サービスのポートフォリオサイトに実装された無料相談予約システムの仕様書です。

### 基本仕様
- **技術スタック**: HTML + CSS + JavaScript（バニラJS）
- **外部ライブラリ**: FullCalendar.js, EmailJS, Google Calendar API, Google APIs
- **費用**: EmailJS無料枠内（月200通）で運用可能
- **対象環境**: 静的サイトホスティング対応
- **デザインシステム**: ダークテーマ、グリーンアクセント（#00ff88）
- **アーキテクチャ**: 分離型ファイル構成（HTML/CSS/JS独立）

## 🎯 主要機能

### 1. インタラクティブカレンダーシステム

#### FullCalendar.js統合
```javascript
// カレンダー基本設定
const calendar = new FullCalendar.Calendar(calendarEl, {
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

    // 日付セルの状態管理
    dayCellClassNames: function(arg) {
        const day = arg.date.getDay();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 過去の日付
        if (arg.date < today) {
            return ['booked-slot'];
        }

        // 休業日（土日）
        if (holidays.includes(day)) {
            return ['booked-slot'];
        }

        // 予約可能
        return ['available-slot'];
    },

    // 日付クリック処理
    dateClick: function(info) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // バリデーション
        if (info.date < today) {
            showError('過去の日付は選択できません');
            return;
        }

        if (holidays.includes(info.date.getDay())) {
            showError('休業日は選択できません');
            return;
        }

        selectDate(info.date);
    }
});
```

#### 営業時間・時間スロット管理
```javascript
// 営業時間設定
const businessHours = {
    start: 9,
    end: 18,
    timeSlots: [
        '09:00', '10:00', '11:00', '13:00',
        '14:00', '15:00', '16:00', '17:00'
    ]
};

// 休業日設定
const holidays = [0, 6]; // 日曜日、土曜日

// 時間スロット動的生成
function generateTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('time-slots');
    timeSlotsContainer.innerHTML = '';

    businessHours.timeSlots.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.textContent = time;
        slot.dataset.time = time;

        // 予約状況チェック（デモ用）
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
```

### 2. 包括的予約フォームシステム

#### フォーム項目構成
```html
<!-- 予約フォームの主要項目 -->
<form id="reservation-form">
    <!-- 基本情報 -->
    <div class="form-group">
        <label for="name">お名前 *</label>
        <input type="text" id="name" name="name" required>
        <span class="error-message" id="name-error">お名前を入力してください</span>
    </div>

    <div class="form-group">
        <label for="email">メールアドレス *</label>
        <input type="email" id="email" name="email" required>
        <span class="error-message" id="email-error">有効なメールアドレスを入力してください</span>
    </div>

    <div class="form-group">
        <label for="phone">電話番号</label>
        <input type="tel" id="phone" name="phone">
        <span class="error-message" id="phone-error">有効な電話番号を入力してください</span>
    </div>

    <!-- 相談内容（複数選択可） -->
    <div class="form-group">
        <label>相談内容 *</label>
        <div class="checkbox-group">
            <div class="checkbox-item">
                <input type="checkbox" id="service-lp" name="service" value="LP制作">
                <label for="service-lp">LP制作について</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="service-web" name="service" value="WEB制作">
                <label for="service-web">WEB制作について</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="service-wp" name="service" value="WordPress">
                <label for="service-wp">WordPress制作について</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="service-renewal" name="service" value="リニューアル">
                <label for="service-renewal">既存サイトリニューアル</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="service-ec" name="service" value="ECサイト">
                <label for="service-ec">ECサイト構築</label>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="service-other" name="service" value="その他">
                <label for="service-other">その他</label>
            </div>
        </div>
        <span class="error-message" id="service-error">少なくとも1つ選択してください</span>
    </div>

    <!-- プロジェクト詳細 -->
    <div class="form-group">
        <label for="budget">予算感</label>
        <select id="budget" name="budget">
            <option value="">予算感を選択してください</option>
            <option value="〜10万円">〜10万円</option>
            <option value="10-30万円">10-30万円</option>
            <option value="30-50万円">30-50万円</option>
            <option value="50-100万円">50-100万円</option>
            <option value="100万円〜">100万円〜</option>
            <option value="未定">未定</option>
        </select>
    </div>

    <div class="form-group">
        <label for="deadline">希望納期</label>
        <select id="deadline" name="deadline">
            <option value="">希望納期を選択してください</option>
            <option value="急ぎ（1ヶ月以内）">急ぎ（1ヶ月以内）</option>
            <option value="通常（2-3ヶ月）">通常（2-3ヶ月）</option>
            <option value="余裕あり（3ヶ月以上）">余裕あり（3ヶ月以上）</option>
            <option value="柔軟に対応">柔軟に対応可能</option>
        </select>
    </div>

    <div class="form-group">
        <label for="details">詳細なご要望（任意）</label>
        <textarea id="details" name="details" rows="5" placeholder="具体的なご要望やご質問があればお書きください"></textarea>
    </div>
</form>
```

#### リアルタイムバリデーション
```javascript
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
```

### 3. EmailJS自動メール送信システム

#### 設定・初期化
```javascript
// EmailJS設定（実際の値に置き換え必要）
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// EmailJS初期化
emailjs.init(EMAILJS_PUBLIC_KEY);
```

#### メール送信処理
```javascript
// 確認メール送信（お客様向け）
async function sendConfirmationEmail() {
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

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('確認メール送信成功:', templateParams);
    } catch (error) {
        console.error('確認メール送信エラー:', error);
    }
}

// 通知メール送信（事業者向け）
async function sendNotificationEmail() {
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

    try {
        // 別のテンプレートIDを使用する場合
        console.log('通知メール送信（要設定）:', templateParams);
    } catch (error) {
        console.error('通知メール送信エラー:', error);
    }
}
```

#### メールテンプレート構造
```
【確認メール（お客様向け）】
件名: 【確認】無料相談のご予約を承りました

{{to_name}}様

この度は無料相談にお申し込みいただき、ありがとうございます。

■ 予約内容
日時: {{date}} {{time}}
相談内容: {{services}}
予算感: {{budget}}
希望納期: {{deadline}}

■ 詳細なご要望
{{details}}

当日はZoom/お電話での相談を予定しております。
詳細は改めてご連絡させていただきます。

ご質問がございましたら、お気軽にお声がけください。

---
WEB制作サービス
メール: info@example.com
電話: 03-1234-5678

【通知メール（事業者向け）】
件名: [新規予約] {{from_name}}様より無料相談の予約

新しい相談予約が入りました。

■ お客様情報
お名前: {{from_name}}
メール: {{from_email}}
電話: {{phone}}

■ 予約内容
日時: {{date}} {{time}}
相談内容: {{services}}
予算感: {{budget}}
希望納期: {{deadline}}

■ 詳細
{{details}}

速やかに対応をお願いします。
```

### 4. Google Calendar API統合（予定）

#### API連携設定
```javascript
// Google Calendar API設定（実装予定）
const GOOGLE_CALENDAR_API_KEY = 'YOUR_API_KEY';
const GOOGLE_CALENDAR_ID = 'YOUR_CALENDAR_ID';

// 空き状況確認
async function checkGoogleCalendarAvailability(date, time) {
    // Google Calendar APIで空き状況を確認
    // 実際の実装では以下の処理が必要：
    // 1. gapi.load()でAPIクライアント読み込み
    // 2. gapi.client.init()で初期化
    // 3. gapi.client.calendar.events.list()で予定取得
    // 4. 指定時間の重複チェック

    return true; // デモ用
}

// カレンダーイベント作成
async function createGoogleCalendarEvent(data) {
    // Google Calendar APIで予定を作成
    // 実際の実装では以下の処理が必要：
    // 1. OAuth 2.0認証
    // 2. gapi.client.calendar.events.insert()で予定作成
    // 3. 成功/失敗の処理

    console.log('Creating Google Calendar event:', data);
}
```

### 5. 予約確定・完了処理

#### 統合予約処理フロー
```javascript
// 予約確定処理
async function confirmReservation() {
    closeModal();

    // ローディング表示
    document.getElementById('loading').classList.add('show');
    document.getElementById('submit-button').disabled = true;

    try {
        // 1. Google Calendar連携（将来実装）
        // await createGoogleCalendarEvent(formData);

        // 2. EmailJS でメール送信（お客様向け）
        await sendConfirmationEmail();

        // 3. EmailJS でメール送信（事業者向け）
        await sendNotificationEmail();

        // 4. 成功処理
        showSuccess();

    } catch (error) {
        console.error('Error:', error);
        showError('予約処理中にエラーが発生しました。');
    } finally {
        document.getElementById('loading').classList.remove('show');
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

    // エラー表示のリセット
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });

    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
}
```

## 📁 ファイル構成

```
/html/
├── reservation.html           # メインページ（HTML構造のみ）
├── css/
│   ├── base.css              # ベーススタイル（共通）
│   └── reservation.css       # 予約システム専用CSS（544行）
├── js/
│   └── reservation.js        # 予約システム専用JS（500行）
└── docs/
    ├── reservation-system-prompt.md
    └── reservation-system-implementation.md # この仕様書
```

### ファイル詳細

#### reservation.html（分離型構成）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>無料相談予約 - WEB制作サービス</title>

    <!-- 外部ライブラリCSS -->
    <link href='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.css' rel='stylesheet' />

    <!-- CSS読み込み -->
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/reservation.css">

    <!-- 外部ライブラリJS -->
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <script src="https://apis.google.com/js/api.js"></script>
</head>
<body>
    <div class="reservation-container">
        <!-- ヘッダー -->
        <div class="reservation-header">
            <h1>無料相談予約</h1>
            <p>WEB制作に関するご相談を無料で承ります。お気軽にご予約ください。</p>
        </div>

        <!-- メインコンテンツ -->
        <div class="reservation-main">
            <!-- カレンダーセクション -->
            <div class="calendar-section">
                <h2>日程を選択</h2>
                <div id="calendar"></div>
                <div id="selected-date" style="display: none;">
                    <p>選択された日付: <span id="selected-date-text"></span></p>
                </div>
            </div>

            <!-- フォームセクション -->
            <div class="form-section">
                <h2>予約情報を入力</h2>

                <!-- 時間選択 -->
                <div class="form-group" id="time-selection" style="display: none;">
                    <label>時間帯を選択 *</label>
                    <div class="time-slots" id="time-slots"></div>
                    <span class="error-message" id="time-error">時間を選択してください</span>
                </div>

                <!-- 予約フォーム -->
                <form id="reservation-form">
                    <!-- フォーム項目（省略） -->
                    <button type="submit" class="submit-button" id="submit-button" disabled>
                        予約を確定する
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- 確認モーダル -->
    <div class="modal" id="confirmation-modal">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <h3>予約内容の確認</h3>
            <div id="confirmation-details"></div>
            <button class="submit-button" onclick="confirmReservation()">
                この内容で予約する
            </button>
        </div>
    </div>

    <!-- JavaScript読み込み -->
    <script src="js/reservation.js"></script>
</body>
</html>
```

## ⚙️ 技術実装詳細

### FullCalendar.js初期化
```javascript
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

        // 日付セルのスタイル制御
        dayCellClassNames: function(arg) {
            const day = arg.date.getDay();
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (arg.date < today) {
                return ['booked-slot'];
            }

            if (holidays.includes(day)) {
                return ['booked-slot'];
            }

            return ['available-slot'];
        },

        // 日付クリック処理
        dateClick: function(info) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (info.date < today) {
                showError('過去の日付は選択できません');
                return;
            }

            if (holidays.includes(info.date.getDay())) {
                showError('休業日は選択できません');
                return;
            }

            selectDate(info.date);
        }
    });

    calendar.render();
}
```

### 日付・時間選択処理
```javascript
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
```

### レスポンシブ対応
```css
/* デスクトップ（769px以上） */
.reservation-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.calendar-section,
.form-section {
    background: #1a1a1a;
    padding: 30px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid #333;
}

/* タブレット（768px以下） */
@media (max-width: 768px) {
    .reservation-main {
        grid-template-columns: 1fr;
    }

    .reservation-header h1 {
        font-size: 2rem;
    }

    .time-slots {
        grid-template-columns: repeat(2, 1fr);
    }

    .checkbox-group {
        grid-template-columns: 1fr;
    }
}

/* スマートフォン（480px以下） */
@media (max-width: 480px) {
    .reservation-container {
        padding: 20px 15px;
    }

    .calendar-section,
    .form-section {
        padding: 20px;
    }

    .reservation-header h1 {
        font-size: 1.5rem;
    }

    .time-slots {
        grid-template-columns: 1fr;
    }

    /* モバイル用カレンダー最適化 */
    #calendar {
        font-size: 0.85rem;
    }

    .fc-daygrid-day-number {
        font-size: 0.9rem;
        padding: 4px;
    }

    .fc-col-header-cell {
        padding: 8px 0;
        font-size: 0.85rem;
    }

    .fc-daygrid-day-frame {
        min-height: 40px;
        height: 40px;
    }

    .fc-toolbar-title {
        font-size: 1.2rem !important;
    }

    .fc .fc-button-primary {
        padding: 6px 12px;
        font-size: 0.85rem;
    }
}
```

## 🔧 カスタマイズ方法

### 営業時間・休業日の変更
```javascript
// 営業時間設定
const businessHours = {
    start: 10,      // 10時開始
    end: 19,        // 19時終了
    timeSlots: [
        '10:00', '11:00', '13:00', '14:00',
        '15:00', '16:00', '17:00', '18:00'
    ]
};

// 休業日設定
const holidays = [0, 6, 1]; // 日曜日、土曜日、月曜日を休業日に
```

### EmailJS設定の更新
```javascript
// 実際の値に置き換える
const EMAILJS_PUBLIC_KEY = 'user_AbCdEfGhIjKlMnOp';  // Account → API Keys
const EMAILJS_SERVICE_ID = 'service_xyz123';        // Email Services
const EMAILJS_TEMPLATE_ID = 'template_abc789';      // Email Templates
```

### Google Calendar API設定（将来実装）
```javascript
// Google Calendar API設定
const GOOGLE_CALENDAR_API_KEY = 'your-api-key';
const GOOGLE_CALENDAR_ID = 'your-calendar-id@group.calendar.google.com';

// OAuth 2.0設定
const GOOGLE_CLIENT_ID = 'your-client-id.apps.googleusercontent.com';
const GOOGLE_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const GOOGLE_SCOPES = 'https://www.googleapis.com/auth/calendar.events';
```

### メールテンプレートのカスタマイズ
```javascript
// テンプレートパラメータのカスタマイズ
const templateParams = {
    to_email: formData.email,
    to_name: formData.name,
    company_name: 'あなたの会社名',        // カスタマイズ
    contact_email: 'info@yourcompany.com',  // カスタマイズ
    contact_phone: '03-1234-5678',          // カスタマイズ
    zoom_url: 'https://zoom.us/j/...',      // Zoom URLを動的生成
    meeting_id: generateMeetingId(),        // ミーティングID生成
    date: formData.date,
    time: formData.time,
    services: formData.services.join(', '),
    budget: formData.budget || '未定',
    deadline: formData.deadline || '未定',
    details: formData.details || 'なし'
};
```

## 📊 効果測定・分析

### 取得可能なメトリクス
```javascript
// 予約関連メトリクス
const reservationMetrics = {
    // 基本指標
    totalReservations: 予約総数,
    completedReservations: 完了予約数,
    cancelledReservations: キャンセル数,
    noShowReservations: 無断欠席数,

    // 変換率
    calendarViewToSelection: (日付選択数 / カレンダー表示数) * 100,
    selectionToSubmission: (フォーム送信数 / 日付選択数) * 100,
    submissionToConfirmation: (予約確定数 / フォーム送信数) * 100,

    // 時間帯分析
    popularTimeSlots: {
        '09:00': 予約数,
        '10:00': 予約数,
        // ...
    },

    // サービス分析
    serviceDistribution: {
        'LP制作': 予約数,
        'WEB制作': 予約数,
        'WordPress': 予約数,
        // ...
    }
};
```

### Google Analytics連携
```javascript
// 予約イベント追跡
function trackReservationEvent(action, data = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'reservation_system',
            'event_label': data.service_type || 'general',
            'custom_parameters': {
                'reservation_date': data.date,
                'reservation_time': data.time,
                'service_types': data.services,
                'budget_range': data.budget
            }
        });
    }
}

// 使用例
trackReservationEvent('calendar_viewed');
trackReservationEvent('date_selected', { date: selectedDate });
trackReservationEvent('time_selected', { date: selectedDate, time: selectedTime });
trackReservationEvent('form_submitted', formData);
trackReservationEvent('reservation_confirmed', formData);
```

## 🚨 制約事項・注意点

### 技術的制約
- **EmailJS無料枠**: 月200通の送信制限
- **Google Calendar API**: API呼び出し制限（1日あたり1,000,000リクエスト）
- **ブラウザ対応**: FullCalendar.js対応ブラウザのみ
- **時差対応**: 現在は日本時間のみ対応

### 運用上の注意
- **手動カレンダー管理**: Google Calendar API未実装のため手動管理
- **ダブルブッキング**: 現在はデモ用ランダム判定のみ
- **リマインダー**: 現在は手動対応
- **キャンセル機能**: 未実装

### セキュリティ考慮事項
```javascript
// 入力値サニタイズ
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>\"'&]/g, '').trim();
}

// フォームデータ検証
function validateFormData(data) {
    const sanitized = {};

    // 必須項目の検証
    sanitized.name = sanitizeInput(data.name);
    if (!sanitized.name) throw new Error('名前は必須です');

    sanitized.email = sanitizeInput(data.email);
    if (!validateEmail(sanitized.email)) throw new Error('有効なメールアドレスが必要です');

    // 任意項目の検証
    sanitized.phone = sanitizeInput(data.phone);
    sanitized.budget = sanitizeInput(data.budget);
    sanitized.deadline = sanitizeInput(data.deadline);
    sanitized.details = sanitizeInput(data.details);

    return sanitized;
}
```

## 🔄 今後の改善計画

### Phase 1（1ヶ月後）
- Google Calendar API完全統合
- リアルタイム空き状況取得
- 自動カレンダー予定作成
- ダブルブッキング完全防止

### Phase 2（3ヶ月後）
- 自動リマインダーメール
- キャンセル・変更機能
- Zoom連携（自動ミーティング作成）
- 予約管理ダッシュボード

### Phase 3（6ヶ月後）
- 複数スタッフ対応
- 時差対応（多時間帯）
- 決済機能統合
- モバイルアプリ化検討

## 📝 メンテナンス項目

### 日次チェック項目
- [ ] 新規予約の確認・対応
- [ ] システムエラーの有無確認
- [ ] メール送信状況の確認

### 週次チェック項目
- [ ] 予約データのバックアップ
- [ ] EmailJS送信数の確認（月200通制限）
- [ ] カレンダー表示の正確性確認
- [ ] レスポンシブ表示の動作確認

### 月次チェック項目
- [ ] 予約システムの利用状況分析
- [ ] ユーザーフィードバックの収集・分析
- [ ] 時間スロット設定の最適化
- [ ] メールテンプレートの見直し

### 年次更新項目
- [ ] 営業時間・休業日の見直し
- [ ] 料金体系に合わせたサービス項目更新
- [ ] セキュリティ対策の見直し
- [ ] 技術スタックの更新検討

---

**最終更新日**: 2025年9月22日
**バージョン**: 1.0（分離型ファイル構成版）
**実装形式**: モジュール型（HTML/CSS/JS分離）
**対応ブラウザ**: Chrome, Safari, Firefox, Edge（最新版）

この仕様書は継続的に更新され、機能改善に伴い内容が変更される可能性があります。