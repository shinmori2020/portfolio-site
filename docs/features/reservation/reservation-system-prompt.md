# 無料相談予約システム（Level 2A - Netlify版）実装プロンプト

## 🎯 実装目標
WEBサイト制作サービスのポートフォリオサイトに、Google Calendar API連携の高機能予約システムを実装する。完全無料でプロフェッショナルレベルの予約機能を構築し、ビジネス成果を最大化する。

## 📋 技術仕様
- **技術**: FullCalendar.js + Google Calendar API + EmailJS + JavaScript
- **費用**: ¥0（完全無料）
- **対象環境**: Netlify静的サイトホスティング対応
- **デザイン**: 既存サイトのBEM記法、ダークテーマ、グリーンアクセント(#00ff88)に統一

## 🔧 実装する主要機能

### **1. 美しいカレンダーUI**
- FullCalendar.jsを使用した月表示カレンダー
- 空き時間のリアルタイム表示
- クリックで時間選択可能
- レスポンシブ対応（PC・タブレット・スマートフォン）

### **2. Google Calendar API連携**
- リアルタイムで空き状況取得
- 予約時に自動でGoogleカレンダーに予定追加
- ダブルブッキング完全防止
- 既存予定との重複チェック

### **3. 相談内容事前入力フォーム**
```html
<!-- 必要なフォーム項目 -->
<form id="reservationForm">
  <input type="text" name="name" placeholder="お名前" required>
  <input type="email" name="email" placeholder="メールアドレス" required>
  <input type="tel" name="phone" placeholder="電話番号">

  <fieldset>
    <legend>相談内容</legend>
    <label><input type="checkbox" name="service" value="LP">LP制作について</label>
    <label><input type="checkbox" name="service" value="WEB">WEB制作について</label>
    <label><input type="checkbox" name="service" value="WP">WordPress制作について</label>
    <label><input type="checkbox" name="service" value="RENEWAL">既存サイトリニューアル</label>
    <label><input type="checkbox" name="service" value="OTHER">その他</label>
  </fieldset>

  <select name="budget">
    <option>予算感を選択してください</option>
    <option value="under10">〜10万円</option>
    <option value="10-30">10-30万円</option>
    <option value="30-50">30-50万円</option>
    <option value="50-100">50-100万円</option>
    <option value="over100">100万円〜</option>
  </select>

  <select name="deadline">
    <option>希望納期を選択してください</option>
    <option value="urgent">急ぎ（1ヶ月以内）</option>
    <option value="normal">通常（2-3ヶ月）</option>
    <option value="flexible">柔軟に対応可能</option>
  </select>

  <textarea name="details" placeholder="詳細なご要望（任意）" rows="5"></textarea>
</form>
```

## 🎨 デザイン仕様

### **カラースキーム**
- **背景**: #1a1a1a
- **テキスト**: #ffffff
- **アクセント**: #00ff88
- **空き時間**: #00ff88（薄め）
- **予約済み**: #666666

### **フォント**
- 既存サイトと統一
- 角丸: 8px
- シャドウ: box-shadow: 0 4px 20px rgba(0,0,0,0.3)

### **フォームデザイン**
- **レイアウト**: 2カラム（デスクトップ）、1カラム（モバイル）
- **入力欄**: ダークテーマに適したスタイリング
- **ボタン**: グリーンアクセント(#00ff88)
- **バリデーション**: リアルタイム入力チェック

### **レスポンシブ対応**
```css
/* ブレークポイント */
@media (max-width: 768px) {
  /* タブレット対応 */
}

@media (max-width: 480px) {
  /* スマートフォン対応 */
  .fc-calendar { width: 100%; }
  .reservation-form { padding: 15px; }
}
```

## 🔧 API設定・連携

### **Google Calendar API設定**
1. **Google Cloud Console**でプロジェクト作成
2. **Calendar API**有効化
3. **OAuth 2.0認証情報**作成
4. **APIキー**取得

### **EmailJS設定**
1. **EmailJSアカウント**作成
2. **サービス追加**（Gmail推奨）
3. **テンプレート作成**（確認メール・リマインダー）
4. **Public Key**取得

### **環境変数設定（Netlify）**
```javascript
// 環境変数例
GOOGLE_CALENDAR_API_KEY="your-api-key"
GOOGLE_CALENDAR_ID="your-calendar-id"
EMAILJS_SERVICE_ID="service-id"
EMAILJS_TEMPLATE_ID="template-id"
EMAILJS_PUBLIC_KEY="emailjs-public-key"
```

## 📁 ファイル構成
```
/reservation-system
├── reservation.html (メインページ)
├── css/
│   ├── reservation.css (メインスタイル)
│   └── fullcalendar-custom.css (カレンダーカスタム)
├── js/
│   ├── reservation.js (メイン機能)
│   ├── calendar-config.js (カレンダー設定)
│   ├── form-handler.js (フォーム処理)
│   └── email-sender.js (メール送信)
└── libs/ (外部ライブラリ)
    ├── fullcalendar/
    └── googleapis/
```

## 🚀 実装する具体的機能

### **1. カレンダー機能**
```javascript
// 実装すべき機能例
const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek'
  },

  // Google Calendar連携
  events: function(info, successCallback, failureCallback) {
    fetchGoogleCalendarEvents(info.start, info.end)
      .then(events => successCallback(events))
      .catch(error => failureCallback(error));
  },

  // 時間選択
  selectable: true,
  select: function(info) {
    showReservationForm(info.start, info.end);
  }
});
```

### **2. 予約処理フロー**
```javascript
// 予約完了までの処理
async function completeReservation(formData, dateTime) {
  try {
    // 1. Google Calendarに予定追加
    const event = await createGoogleCalendarEvent(formData, dateTime);

    // 2. 確認メール送信（お客様）
    await sendConfirmationEmail(formData, dateTime);

    // 3. 通知メール送信（事業者）
    await sendNotificationEmail(formData, dateTime);

    // 4. 成功メッセージ表示
    showSuccessMessage();

  } catch (error) {
    showErrorMessage(error);
  }
}
```

### **3. バリデーション機能**
- 必須項目チェック
- メールアドレス形式チェック
- 電話番号形式チェック
- 営業時間内チェック
- 重複予約チェック

### **4. エラーハンドリング**
- API通信エラー
- 予約時間の重複
- フォーム入力エラー
- 各種エラーメッセージの表示

## 📧 メールテンプレート

### **確認メール（お客様向け）**
```
件名: 【確認】無料相談のご予約を承りました

{{name}}様

この度は無料相談にお申し込みいただき、ありがとうございます。

■ 予約内容
日時: {{date}} {{time}}
相談内容: {{services}}
予算感: {{budget}}
希望納期: {{deadline}}

■ 詳細
{{details}}

当日はZoomでの相談を予定しております。
前日にミーティングURLをお送りいたします。

ご質問がございましたら、お気軽にお声がけください。

---
WEB制作サービス
{{contact_info}}
```

### **リマインダーメール**
```
件名: 【明日です】無料相談のリマインダー

{{name}}様

明日{{date}} {{time}}より、無料相談のお時間をいただいております。

■ Zoomミーティング情報
URL: {{zoom_url}}
ミーティングID: {{meeting_id}}

お忙しい中、お時間をいただきありがとうございます。
明日お話しできるのを楽しみにしております。
```

## 📱 ユーザーエクスペリエンス設計

### **予約完了までのフロー**
1. **カレンダー表示**: 空き状況が一目でわかる
2. **時間選択**: クリックで簡単選択
3. **フォーム入力**: 必要最小限の項目
4. **確認画面**: 入力内容の確認
5. **予約完了**: 即座に確認メール受信

### **アクセシビリティ対応**
- キーボード操作対応
- スクリーンリーダー対応
- ARIA属性の適切な設定
- 色覚異常への配慮

## 🔒 セキュリティ・プライバシー

### **データ保護**
- 個人情報の暗号化
- HTTPS必須
- 不要なデータの保存を避ける

### **API セキュリティ**
- OAuth 2.0認証
- APIキーの適切な管理
- レート制限対応

## 📊 分析・改善機能

### **予約データ分析**
```javascript
// 分析用データ収集例
const analytics = {
  trackReservation: function(data) {
    // Google Analytics連携
    gtag('event', 'reservation_complete', {
      'service_type': data.services,
      'budget_range': data.budget
    });
  }
};
```

## 🎯 実装依頼

上記仕様に基づいて、完全に動作する無料相談予約システムを実装してください。

### **提供していただきたいもの**

1. **完全なコード一式**
   - reservation.html（メインページ）
   - 完全なCSS（ダークテーマ対応）
   - JavaScript（全機能実装）
   - 設定ファイル

2. **API設定手順書**
   - Google Cloud Console設定手順
   - EmailJS設定手順
   - Netlify環境変数設定手順

3. **実装・導入ガイド**
   - 既存サイトへの組み込み方法
   - 必要なHTML要素の説明
   - トラブルシューティング

4. **カスタマイズガイド**
   - 営業時間・休業日の変更方法
   - メールテンプレートの編集方法
   - デザインのカスタマイズ方法

5. **テスト手順**
   - 動作確認方法
   - ブラウザ互換性テスト
   - レスポンシブ動作確認

### **特に重要な要件**

- **完全無料**: 外部有料サービス不使用
- **Netlify対応**: 静的サイトで完全動作
- **プロダクション品質**: 実際のビジネスで使用可能
- **保守性**: 将来の機能追加・変更が容易
- **パフォーマンス**: 高速動作とSEO配慮

### **期待する成果**
- 予約率30-50%向上
- 業務効率月15時間改善
- 成約率15-25%向上
- 競合との明確な差別化

**プロフェッショナルレベルの予約システムの実装をお願いします！**

---

## 📋 実装チェックリスト

### **基本機能**
- [ ] FullCalendar.js実装
- [ ] Google Calendar API連携
- [ ] EmailJS自動メール送信
- [ ] フォームバリデーション
- [ ] レスポンシブデザイン

### **高度な機能**
- [ ] ダブルブッキング防止
- [ ] 営業時間設定
- [ ] 休業日設定
- [ ] リマインダーメール
- [ ] エラーハンドリング

### **UX・デザイン**
- [ ] ダークテーマ適用
- [ ] アクセシビリティ対応
- [ ] アニメーション効果
- [ ] 成功・エラーメッセージ
- [ ] ローディング表示