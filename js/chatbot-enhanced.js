// ======================================
// チャットボット拡張版 - 回答パターン強化
// ======================================

// 拡張回答パターン（70パターン以上）
const EnhancedResponses = {
    // ========== 料金関連（15パターン） ==========
    '料金': {
        message: `料金についてご質問ですね！

■ 基本料金：
• LP制作: 10万円〜
• コーポレートサイト: 15万円〜
• WordPress制作: 20万円〜

詳細なお見積りは料金計算機をご利用ください。`,
        action: '[料金計算機へ](pricing-calculator.html)',
        confidence: 'high'
    },

    '格安': {
        message: `格安プランについてお答えします！

■ お手頃プラン：
• テンプレート利用: 5万円〜
• シンプルLP: 8万円〜
• 基本機能のみ: 10万円〜

品質は落とさず、効率化でコストダウンを実現します。`,
        action: '[格安プランの詳細へ](#budget)',
        confidence: 'high'
    },

    '分割払い': {
        message: `分割払いについて！

■ お支払いプラン：
• 2回払い: 着手時50%、納品時50%
• 3回払い: 着手時30%、中間40%、納品時30%
• 月額払い: 相談可能

お気軽にご相談ください。`,
        action: '[支払い相談へ](#payment)',
        confidence: 'high'
    },

    '追加料金': {
        message: `追加料金についてご説明します。

■ 追加費用が発生する場合：
• 仕様変更: 要相談
• 大幅な修正（4回目以降）: 5,000円/回
• 追加ページ: 2万円〜/ページ
• 急ぎ対応: 料金の20%増

事前にお見積りいたします。`,
        confidence: 'high'
    },

    '見積もり無料': {
        message: `無料見積もり実施中！

■ 見積もりの流れ：
1. ヒアリング（無料）
2. 概算お見積り（無料）
3. 詳細お見積り（無料）

相見積もりも歓迎です。`,
        action: '[無料見積もり依頼](#estimate)',
        confidence: 'high'
    },

    '予算': {
        message: `ご予算に合わせてご提案します！

■ 予算別プラン：
• 〜10万円: LP制作、テンプレートサイト
• 10-30万円: オリジナルサイト制作
• 30万円〜: フルカスタマイズ、大規模サイト

まずはご相談ください。`,
        action: '[予算相談フォームへ](#budget-form)',
        confidence: 'high'
    },

    '業種別料金': {
        message: `業種別の料金目安です。

■ 業種別価格帯：
• 飲食店: 12万円〜（メニュー、予約機能付き）
• 美容室: 15万円〜（予約システム付き）
• 士業: 18万円〜（信頼性重視デザイン）
• 医療: 20万円〜（予約、問診機能）
• ECサイト: 25万円〜（決済機能付き）

業種特有の機能も対応可能です。`,
        confidence: 'high'
    },

    '保守費用': {
        message: `保守・メンテナンス費用について！

■ 月額保守プラン：
• ライト: 5,000円/月（更新3回まで）
• スタンダード: 10,000円/月（更新無制限）
• プレミアム: 20,000円/月（SEO対策込み）

初月無料キャンペーン中！`,
        action: '[保守プラン詳細](#maintenance)',
        confidence: 'high'
    },

    'ドメイン代': {
        message: `ドメイン費用について！

■ ドメイン料金：
• .com: 1,500円/年〜
• .jp: 3,000円/年〜
• .co.jp: 4,000円/年〜

取得代行も無料で承ります。`,
        confidence: 'high'
    },

    'サーバー代': {
        message: `サーバー費用について！

■ レンタルサーバー料金目安：
• エコノミー: 500円/月〜
• スタンダード: 1,000円/月〜
• ビジネス: 3,000円/月〜

最適なプランをご提案します。`,
        action: '[サーバー選定相談](#server)',
        confidence: 'high'
    },

    '他社比較': {
        message: `他社との違いをご説明します！

■ 当社の強み：
• 価格: 業界平均より20%安い
• 納期: 最短2週間
• サポート: 納品後3ヶ月無料
• 品質: 満足度95%以上

相見積もり歓迎です！`,
        confidence: 'high'
    },

    '値引き': {
        message: `お得な割引情報！

■ 現在のキャンペーン：
• 初回限定: 10%OFF
• 2サイト同時: 15%OFF
• リピーター: 20%OFF
• 紹介割: 10%OFF

詳しくはお問い合わせください。`,
        action: '[キャンペーン詳細](#campaign)',
        confidence: 'high'
    },

    '学割': {
        message: `学生割引について！

■ 学割特典：
• 基本料金から20%OFF
• 分割払い手数料無料
• 技術サポート1年間

学生証のご提示が必要です。`,
        confidence: 'medium'
    },

    '紹介割引': {
        message: `紹介キャンペーン実施中！

■ 紹介特典：
• 紹介者: 次回10%OFF
• 紹介された方: 初回10%OFF
• 両方成約で追加5%OFF

Win-Winの紹介制度です。`,
        confidence: 'high'
    },

    'キャンセル料': {
        message: `キャンセル料について。

■ キャンセルポリシー：
• 着手前: 無料
• 着手後〜50%完成: 着手金の50%
• 50%以上完成: 着手金全額

できる限り柔軟に対応します。`,
        confidence: 'medium'
    },

    // ========== 技術・機能関連（15パターン） ==========
    'CMS': {
        message: `CMS（コンテンツ管理システム）について！

■ 対応CMS：
• WordPress: 最も人気、豊富なプラグイン
• Wix: 初心者向け、簡単操作
• Shopify: EC特化
• オリジナルCMS: フルカスタマイズ可能

用途に合わせて最適なCMSをご提案します。`,
        confidence: 'high'
    },

    'カスタム機能': {
        message: `カスタム機能開発も対応！

■ 開発可能な機能：
• 予約システム: 3万円〜
• 会員機能: 5万円〜
• 決済機能: 8万円〜
• チャット機能: 5万円〜
• API連携: 要相談

ご要望に合わせて開発します。`,
        action: '[機能相談フォーム](#custom)',
        confidence: 'high'
    },

    'API連携': {
        message: `外部サービスとの連携について！

■ 連携実績：
• Google Maps API
• SNS連携（Twitter, Instagram, Facebook）
• 決済API（Stripe, PayPal）
• 予約システムAPI
• CRM連携

スムーズな連携を実現します。`,
        confidence: 'high'
    },

    'データ移行': {
        message: `既存サイトからのデータ移行も安心！

■ 移行サービス：
• コンテンツ移行: 無料
• データベース移行: 2万円〜
• 画像・ファイル移行: 無料
• URL転送設定: 無料

SEO評価も引き継ぎます。`,
        confidence: 'high'
    },

    'バックアップ': {
        message: `バックアップ体制について！

■ バックアップサービス：
• 自動バックアップ: 毎日
• 手動バックアップ: いつでも可能
• 保存期間: 30日間
• 復元サポート: 無料

データの安全を守ります。`,
        confidence: 'high'
    },

    'アクセス解析': {
        message: `アクセス解析の導入！

■ 解析ツール設定：
• Google Analytics 4: 無料設定
• Search Console: 無料設定
• ヒートマップツール: オプション
• 月次レポート: 5,000円/月

データに基づいた改善が可能です。`,
        confidence: 'high'
    },

    'SNS連携': {
        message: `SNS連携機能について！

■ 連携可能なSNS：
• Instagram フィード表示
• Twitter タイムライン埋め込み
• Facebook ページ連携
• LINE 友だち追加ボタン
• YouTube 動画埋め込み

全て標準対応です。`,
        confidence: 'high'
    },

    '多言語対応': {
        message: `多言語サイト制作も対応！

■ 多言語化サービス：
• 英語対応: +5万円〜
• 中国語対応: +8万円〜
• 韓国語対応: +5万円〜
• 自動翻訳プラグイン: 2万円〜

グローバル展開をサポートします。`,
        confidence: 'high'
    },

    'ECサイト': {
        message: `ECサイト構築について！

■ EC機能：
• 商品管理システム
• カート機能
• 決済機能（クレカ、コンビニ、銀行振込）
• 在庫管理
• 会員機能

料金: 25万円〜`,
        action: '[EC詳細へ](#ecommerce)',
        confidence: 'high'
    },

    '予約システム': {
        message: `予約システムの導入！

■ 予約機能：
• カレンダー予約
• 時間指定予約
• スタッフ指名
• 自動確認メール
• キャンセル機能

料金: 3万円〜（基本機能）`,
        confidence: 'high'
    },

    'パフォーマンス': {
        message: `サイト高速化について！

■ 高速化対策：
• 画像最適化
• キャッシュ設定
• CDN導入
• コード最適化
• サーバー最適化

表示速度2秒以内を目指します。`,
        confidence: 'high'
    },

    'セキュリティ': {
        message: `セキュリティ対策について！

■ セキュリティ対策：
• SSL証明書: 標準装備
• ファイアウォール設定
• 定期的なアップデート
• 不正アクセス対策
• データ暗号化

安全なサイト運営を実現します。`,
        confidence: 'high'
    },

    '広告連携': {
        message: `広告との連携について！

■ 広告設定：
• Google広告タグ設置
• Facebook Pixel設置
• リマーケティングタグ
• コンバージョン測定
• A/Bテスト対応

効果的な広告運用をサポート。`,
        confidence: 'high'
    },

    'フォーム': {
        message: `お問い合わせフォームについて！

■ フォーム機能：
• 基本フォーム: 無料
• 自動返信メール: 無料
• ファイル添付: +5,000円
• 条件分岐: +1万円
• スパム対策: 標準装備`,
        confidence: 'high'
    },

    'チャットボット': {
        message: `チャットボット導入について！

■ チャットボット：
• 簡易版: 3万円〜
• AI版: 10万円〜
• カスタマイズ: 要相談
• 運用サポート: 月額5,000円〜

24時間対応が可能になります。`,
        confidence: 'high'
    },

    // ========== 業種特化関連（10パターン） ==========
    '飲食店': {
        message: `飲食店サイト制作の実績豊富！

■ 飲食店向け機能：
• メニュー表示システム
• 予約フォーム
• テイクアウト注文
• クーポン機能
• 営業カレンダー

料金: 12万円〜`,
        action: '[飲食店サイト事例](#restaurant)',
        confidence: 'high'
    },

    '美容室': {
        message: `美容室・サロンサイト制作！

■ 美容室向け機能：
• スタイリスト紹介
• ヘアカタログ
• Web予約システム
• クーポン機能
• ブログ機能

料金: 15万円〜`,
        action: '[美容室サイト事例](#beauty)',
        confidence: 'high'
    },

    '士業': {
        message: `士業サイト制作について！

■ 士業向けデザイン：
• 信頼感のあるデザイン
• 実績・資格表示
• 料金表
• 相談予約フォーム
• コラム機能

料金: 18万円〜`,
        confidence: 'high'
    },

    '医療': {
        message: `医療機関サイト制作！

■ 医療機関向け：
• 診療科目・時間表示
• 医師・スタッフ紹介
• Web予約・問診票
• アクセス情報
• お知らせ機能

料金: 20万円〜`,
        confidence: 'high'
    },

    '教育': {
        message: `教育機関・スクールサイト制作！

■ 教育機関向け：
• コース・カリキュラム紹介
• 講師紹介
• 申込みフォーム
• イベントカレンダー
• 生徒の声

料金: 15万円〜`,
        confidence: 'high'
    },

    '不動産': {
        message: `不動産サイト制作！

■ 不動産向け機能：
• 物件検索システム
• 物件詳細ページ
• お問い合わせフォーム
• 来店予約
• 地図連携

料金: 25万円〜`,
        confidence: 'high'
    },

    '製造業': {
        message: `製造業・BtoB企業サイト制作！

■ 製造業向け：
• 製品カタログ
• 技術紹介
• 設備紹介
• 採用情報
• お問い合わせフォーム

料金: 18万円〜`,
        confidence: 'high'
    },

    '小売業': {
        message: `小売店サイト制作！

■ 小売業向け：
• 商品紹介
• 店舗情報
• オンラインショップ連携
• セール情報
• ポイントカード連携

料金: 15万円〜`,
        confidence: 'high'
    },

    'NPO': {
        message: `NPO・団体サイト制作！

■ NPO向け：
• 活動紹介
• 寄付決済機能
• イベント管理
• 会員管理
• ブログ機能

特別料金: 10万円〜`,
        confidence: 'high'
    },

    'イベント': {
        message: `イベント・キャンペーンサイト制作！

■ イベントサイト：
• カウントダウン機能
• 申込みフォーム
• SNSシェア機能
• ギャラリー
• アクセス情報

料金: 8万円〜（期間限定サイト）`,
        confidence: 'high'
    },

    // ========== プロセス・サポート関連（10パターン） ==========
    '制作フロー': {
        message: `制作の流れをご説明します！

■ 制作フロー：
1. ヒアリング（1-2日）
2. 企画・構成（3-5日）
3. デザイン制作（5-7日）
4. コーディング（5-7日）
5. テスト・修正（3-5日）
6. 納品

スムーズな進行を心がけます。`,
        confidence: 'high'
    },

    '打ち合わせ': {
        message: `打ち合わせ方法について！

■ 打ち合わせ方法：
• オンライン（Zoom, Teams）
• 対面（都内近郊）
• メール・チャット
• 電話

お客様のご都合に合わせます。`,
        confidence: 'high'
    },

    '修正回数': {
        message: `修正対応について！

■ 修正ポリシー：
• デザイン修正: 3回まで無料
• 軽微な修正: 無制限
• 大幅な変更: 要相談
• 納品後修正: 1ヶ月無料

柔軟に対応いたします。`,
        confidence: 'high'
    },

    '完成後サポート': {
        message: `納品後のサポート体制！

■ アフターサポート：
• 3ヶ月間無料サポート
• 操作説明・マニュアル提供
• 軽微な修正対応
• 電話・メールサポート
• 更新代行（有料）

安心してお任せください。`,
        confidence: 'high'
    },

    '操作説明': {
        message: `操作説明について！

■ レクチャー内容：
• 管理画面の使い方
• コンテンツ更新方法
• 画像の変更方法
• お知らせ投稿方法
• バックアップ方法

マニュアルも提供します。`,
        confidence: 'high'
    },

    '緊急対応': {
        message: `緊急時の対応について！

■ 緊急サポート：
• 営業時間内: 即日対応
• 営業時間外: 翌営業日対応
• 休日緊急対応: オプション
• リモートサポート可能

トラブル時も安心です。`,
        confidence: 'high'
    },

    '土日対応': {
        message: `土日祝日の対応について！

■ 休日対応：
• メール受付: 24時間365日
• 作業: 事前予約で可能
• 緊急対応: オプション料金
• 打ち合わせ: 調整可能

柔軟に対応します。`,
        confidence: 'medium'
    },

    'リモート': {
        message: `リモート対応について！

■ オンライン完結：
• 打ち合わせ: Zoom/Teams
• 資料共有: クラウド
• 進捗報告: チャット
• 納品: オンライン
• サポート: リモート

全国どこでも対応可能です。`,
        confidence: 'high'
    },

    '訪問対応': {
        message: `訪問対応について！

■ 訪問サービス：
• 都内23区: 無料
• 関東圏: 交通費実費
• その他: 要相談
• オンライン併用可能

直接お会いしての対応も可能です。`,
        confidence: 'medium'
    },

    '電話サポート': {
        message: `電話サポートについて！

■ 電話対応：
• 営業時間: 9:00-18:00
• 技術サポート: 対応可
• 緊急連絡: 可能
• 折り返し対応

お気軽にお電話ください。`,
        action: '[電話で相談](tel:000-0000-0000)',
        confidence: 'high'
    },

    // ========== 具体的な技術質問（15パターン） ==========
    'JavaScript': {
        message: `JavaScript開発について！

■ JS開発対応：
• Vanilla JavaScript
• React / Vue.js / Angular
• jQuery実装
• アニメーション実装
• 非同期処理対応

料金: 要件により異なります。`,
        confidence: 'high'
    },

    'React': {
        message: `React開発について！

■ React開発：
• SPAアプリケーション
• Next.js対応
• Redux状態管理
• TypeScript対応
• 料金: 25万円〜

モダンなWebアプリを構築します。`,
        action: '[React開発詳細](#react)',
        confidence: 'high'
    },

    'Vue': {
        message: `Vue.js開発について！

■ Vue.js開発：
• Vue 3対応
• Nuxt.js対応
• Vuex状態管理
• コンポーネント設計
• 料金: 23万円〜`,
        confidence: 'high'
    },

    'データベース': {
        message: `データベース設計について！

■ DB対応：
• MySQL / PostgreSQL
• MongoDB
• Firebase
• データ移行サポート
• バックアップ設計

最適なDB選定をサポートします。`,
        confidence: 'high'
    },

    'ヘッドレスCMS': {
        message: `ヘッドレスCMS導入について！

■ 対応CMS：
• Contentful
• Strapi
• microCMS
• Sanity
• 料金: 15万円〜

APIベースの柔軟な構成を実現。`,
        confidence: 'high'
    },

    'PWA': {
        message: `PWA（Progressive Web App）について！

■ PWA機能：
• オフライン対応
• プッシュ通知
• ホーム画面追加
• 高速キャッシュ
• 料金: +5万円〜

アプリのような体験を提供。`,
        confidence: 'high'
    },

    'AMP': {
        message: `AMP対応について！

■ AMP実装：
• 超高速表示
• Google推奨
• SEO効果大
• モバイル最適化
• 料金: +3万円〜`,
        confidence: 'medium'
    },

    'GraphQL': {
        message: `GraphQL API開発！

■ GraphQL：
• 効率的なデータ取得
• Apollo Server/Client
• スキーマ設計
• リアルタイム更新
• 料金: 要相談`,
        confidence: 'medium'
    },

    'Jamstack': {
        message: `Jamstackアーキテクチャについて！

■ Jamstack：
• 静的サイトジェネレータ
• Gatsby / Next.js
• Netlify / Vercel デプロイ
• 高速・セキュア・スケーラブル
• 料金: 20万円〜`,
        confidence: 'high'
    },

    'WebGL': {
        message: `WebGL/3D表現について！

■ 3D表現：
• Three.js実装
• 3Dアニメーション
• インタラクティブ表現
• VR/AR対応
• 料金: 30万円〜`,
        confidence: 'medium'
    },

    'WebSocket': {
        message: `リアルタイム通信実装！

■ WebSocket：
• チャット機能
• リアルタイム更新
• Socket.io実装
• 通知システム
• 料金: 10万円〜`,
        confidence: 'high'
    },

    'Docker': {
        message: `Docker環境構築について！

■ Docker対応：
• コンテナ化
• docker-compose設定
• CI/CD構築
• 開発環境統一
• 料金: 5万円〜`,
        confidence: 'medium'
    },

    'Git': {
        message: `Git/バージョン管理について！

■ Git管理：
• GitHub/GitLab設定
• ブランチ戦略
• CI/CD連携
• コードレビュー体制

開発効率を向上させます。`,
        confidence: 'high'
    },

    'テスト': {
        message: `テスト実装について！

■ テスト：
• ユニットテスト
• E2Eテスト
• Jest / Cypress
• 自動テスト構築
• 料金: +3万円〜

品質保証を強化します。`,
        confidence: 'high'
    },

    'CI/CD': {
        message: `CI/CDパイプライン構築！

■ 自動化：
• GitHub Actions
• Jenkins
• 自動デプロイ
• 自動テスト
• 料金: 8万円〜`,
        confidence: 'medium'
    },

    // ========== その他の頻出質問（10パターン） ==========
    '納品形式': {
        message: `納品形式について！

■ 納品内容：
• サイトデータ一式
• デザインデータ（PSD/Figma）
• 操作マニュアル
• ログイン情報一覧
• ソースコード

全てお渡しします。`,
        confidence: 'high'
    },

    '著作権': {
        message: `著作権について！

■ 権利関係：
• 著作権: お客様に譲渡
• 実績掲載: 許可制
• 素材の権利: 適法に処理
• ソースコード: お客様所有

安心してご利用いただけます。`,
        confidence: 'high'
    },

    'レスポンシブ': {
        message: `レスポンシブ対応について！

■ 対応デバイス：
• パソコン: 完全対応
• タブレット: 完全対応
• スマートフォン: 完全対応
• 各ブラウザ: 動作保証

追加料金なしで全デバイス対応！`,
        confidence: 'high'
    },

    'ブラウザ対応': {
        message: `対応ブラウザについて！

■ 動作保証ブラウザ：
• Chrome: 最新版
• Safari: 最新版
• Firefox: 最新版
• Edge: 最新版
• スマホブラウザ: 標準対応

古いブラウザも相談可能です。`,
        confidence: 'high'
    },

    '制作実績': {
        message: `豊富な制作実績！

■ 実績データ：
• 制作数: 500サイト以上
• 継続率: 85%以上
• 満足度: 95%以上
• 業種: 50業種以上

実績ページでご確認いただけます。`,
        action: '[制作実績を見る](#portfolio)',
        confidence: 'high'
    },

    'お客様の声': {
        message: `お客様からの評価！

■ よくいただく声：
• 「対応が早くて助かった」
• 「予算内で満足の仕上がり」
• 「アフターサポートが充実」
• 「集客が増えた」

レビューページでご確認ください。`,
        action: '[お客様の声](#reviews)',
        confidence: 'high'
    },

    '会社情報': {
        message: `会社情報について！

■ 会社概要：
• 創業: 5年以上
• スタッフ: 10名体制
• 所在地: 東京都内
• 営業時間: 平日9:00-18:00

詳しくは会社概要ページへ。`,
        action: '[会社概要](#about)',
        confidence: 'high'
    },

    'お試し': {
        message: `お試しプランについて！

■ トライアル：
• デザイン案作成: 無料
• 1ページお試し: 3万円
• 修正3回まで対応
• 気に入らなければキャンセル可

リスクなくお試しいただけます。`,
        confidence: 'medium'
    },

    '契約書': {
        message: `契約について！

■ 契約内容：
• 業務委託契約書作成
• 機密保持契約対応
• 電子契約対応
• 請求書・領収書発行

適切な契約で安心です。`,
        confidence: 'high'
    },

    '開始時期': {
        message: `すぐに開始可能です！

■ スケジュール：
• 最短: 即日着手可能
• 通常: 3営業日以内
• 予約: 1ヶ月先まで可能

お急ぎの場合もご相談ください。`,
        action: '[今すぐ相談](#contact)',
        confidence: 'high'
    },

    // ========== マーケティング・集客関連（15パターン） ==========
    'SEO詳細': {
        message: `SEO対策の詳細について！

■ 内部SEO対策：
• タイトル・メタタグ最適化
• 構造化データマークアップ
• サイトマップ生成
• robots.txt設定
• ページ速度最適化
• Core Web Vitals対応

全プラン標準対応です。`,
        confidence: 'high'
    },

    'MEO': {
        message: `MEO（Map Engine Optimization）対策！

■ Googleマップ対策：
• Googleビジネスプロフィール最適化
• 店舗情報の統一
• 口コミ対策サポート
• 写真最適化
• 料金: 3万円〜

地域集客を強化します。`,
        confidence: 'high'
    },

    'コンテンツマーケティング': {
        message: `コンテンツマーケティング支援！

■ コンテンツ戦略：
• ブログ記事作成代行
• SEOライティング
• コンテンツカレンダー作成
• 効果測定
• 月額: 5万円〜

継続的な集客を実現。`,
        confidence: 'high'
    },

    'SNS運用': {
        message: `SNS運用代行サービス！

■ SNS運用：
• Instagram運用
• Twitter運用
• Facebook運用
• 投稿デザイン作成
• 月額: 3万円〜

SNSからの流入を増やします。`,
        confidence: 'high'
    },

    'リスティング広告': {
        message: `リスティング広告運用について！

■ 広告運用サポート：
• Google広告設定
• Yahoo!広告設定
• ランディングページ最適化
• コンバージョン測定
• 運用代行: 月額5万円〜`,
        confidence: 'high'
    },

    'アナリティクス設定': {
        message: `詳細なアナリティクス設定！

■ 分析環境構築：
• GA4詳細設定
• GTM（タグマネージャー）
• コンバージョン設定
• イベント計測
• カスタムレポート作成

料金: 3万円〜`,
        confidence: 'high'
    },

    'A/Bテスト': {
        message: `A/Bテスト実施について！

■ テスト実施：
• デザインパターンテスト
• コピーライティングテスト
• CTA最適化
• 結果分析レポート
• 料金: 5万円〜

コンバージョン率を改善。`,
        confidence: 'high'
    },

    'メールマーケティング': {
        message: `メールマーケティング機能！

■ メール配信：
• メルマガ配信システム
• ステップメール構築
• HTMLメールテンプレート
• 配信分析
• 料金: 5万円〜`,
        confidence: 'high'
    },

    'LPO': {
        message: `LPO（ランディングページ最適化）！

■ LPO施策：
• ヒートマップ分析
• 離脱ポイント改善
• フォーム最適化
• CTA改善
• 料金: 3万円〜

成約率を向上させます。`,
        confidence: 'high'
    },

    'コンバージョン改善': {
        message: `コンバージョン改善施策！

■ 改善内容：
• ユーザー行動分析
• UI/UX改善
• 導線設計見直し
• フォーム改善
• チャットボット導入

成果を最大化します。`,
        confidence: 'high'
    },

    'リマーケティング': {
        message: `リマーケティング設定！

■ リターゲティング：
• Googleリマーケティングタグ
• Facebook Pixel設定
• カスタムオーディエンス作成
• 動的リマーケティング
• 設定料: 2万円〜`,
        confidence: 'high'
    },

    'インフルエンサー': {
        message: `インフルエンサーマーケティング！

■ 施策内容：
• インフルエンサー選定
• タイアップ企画
• 効果測定
• 料金: 要相談

認知度を向上させます。`,
        confidence: 'medium'
    },

    'オウンドメディア': {
        message: `オウンドメディア構築！

■ メディア運営：
• コンテンツ企画
• 記事制作
• SEO対策
• 分析・改善
• 構築: 30万円〜

長期的な資産を作ります。`,
        confidence: 'high'
    },

    'ブランディング': {
        message: `ブランディング支援！

■ ブランド構築：
• ロゴデザイン
• ブランドガイドライン
• トーン&マナー設定
• VI/CI設計
• 料金: 15万円〜

統一感のあるブランドを。`,
        confidence: 'high'
    },

    'クチコミ': {
        message: `クチコミ・レビュー対策！

■ 評判管理：
• レビュー促進施策
• 返信テンプレート作成
• ネガティブ対応
• 評価向上施策
• 料金: 月額2万円〜`,
        confidence: 'medium'
    }
};

// 拡張同義語辞書（各カテゴリ2倍以上に拡張）
const EnhancedSynonymDictionary = {
    // 新規追加カテゴリ
    "JavaScript": [
        "JavaScript", "JS", "ジャバスクリプト", "javascript", "ジャバ", "スクリプト",
        "フロントエンド", "front-end", "クライアントサイド"
    ],

    "React": [
        "React", "リアクト", "react", "React.js", "リアクトジェーエス", "reactjs"
    ],

    "Vue": [
        "Vue", "ビュー", "vue", "Vue.js", "ビュージェーエス", "vuejs"
    ],

    "データベース": [
        "データベース", "DB", "デーベー", "database", "MySQL", "PostgreSQL",
        "MongoDB", "SQL", "NoSQL", "データ管理"
    ],

    "マーケティング": [
        "マーケティング", "集客", "マーケ", "marketing", "プロモーション",
        "宣伝", "広告", "PR", "販促", "売上", "コンバージョン"
    ],

    "ブランディング": [
        "ブランディング", "ブランド", "brand", "ロゴ", "CI", "VI",
        "アイデンティティ", "イメージ", "統一感"
    ],

    "アナリティクス": [
        "アナリティクス", "分析", "analytics", "GA", "解析", "測定",
        "計測", "データ分析", "効果測定"
    ],

    "料金": [
        "料金", "価格", "費用", "コスト", "いくら", "金額", "値段", "予算", "お金",
        "プライス", "価格帯", "相場", "単価", "見積", "見積もり", "見積り",
        "お値段", "おいくら", "代金", "料金体系", "費用感", "予算感",
        "cost", "price", "りょうきん", "ねだん"
    ],

    "期間": [
        "期間", "納期", "日数", "時間", "いつまで", "どれくらい", "スケジュール",
        "かかる", "工期", "制作期間", "開発期間", "納品日", "完成", "締切",
        "デッドライン", "いつ", "何日", "何週間", "何ヶ月", "日程", "工程",
        "schedule", "timeline", "きかん", "のうき"
    ],

    "制作": [
        "制作", "作成", "作る", "つくる", "開発", "構築", "製作", "作って",
        "制作して", "開発して", "構築して", "デザイン", "設計", "企画",
        "プロデュース", "立ち上げ", "リニューアル", "新規", "make", "create",
        "develop", "build", "さくせい", "かいはつ"
    ],

    "WordPress": [
        "WordPress", "ワードプレス", "WP", "ワープレ", "word press", "ワードプレ",
        "wordpress", "ＷＰ", "ワープ", "ワドプレ", "ワードプレス", "CMS",
        "ブログシステム", "更新システム"
    ],

    "LP": [
        "LP", "ランディングページ", "ランディング", "landing", "エルピー",
        "ランペ", "１ページ", "1ページ", "単ページ", "ペライチ", "landing page",
        "縦長ページ", "セールスページ", "プロモーションページ"
    ],

    "SEO": [
        "SEO", "エスイーオー", "検索", "上位表示", "集客", "アクセス", "Google",
        "グーグル", "検索対策", "検索エンジン", "検索順位", "検索結果", "順位",
        "ランキング", "最適化", "対策", "seo", "ＳＥＯ", "検索エンジン最適化"
    ],

    "スマホ": [
        "スマホ", "スマートフォン", "モバイル", "レスポンシブ", "iPhone", "Android",
        "携帯", "アイフォン", "アンドロイド", "スマフォ", "すまほ", "モバイル対応",
        "スマホ対応", "モバイルファースト", "マルチデバイス", "タブレット",
        "iPad", "mobile", "responsive"
    ],

    "実績": [
        "実績", "事例", "制作例", "ポートフォリオ", "作品", "サンプル", "実例",
        "制作実績", "過去", "これまで", "今まで", "経験", "実証", "成果",
        "portfolio", "works", "じっせき", "さくひん"
    ],

    "相談": [
        "相談", "質問", "聞きたい", "教えて", "話したい", "問い合わせ", "お願い",
        "相談したい", "聞く", "確認", "問合せ", "問合わせ", "コンタクト",
        "連絡", "contact", "そうだん", "といあわせ"
    ],

    "修正": [
        "修正", "変更", "直し", "改善", "調整", "手直し", "リテイク", "修正",
        "なおし", "改修", "更新", "アップデート", "編集", "訂正", "補正",
        "fix", "modify", "しゅうせい", "へんこう"
    ],

    "デザイン": [
        "デザイン", "見た目", "おしゃれ", "かっこいい", "きれい", "美しい",
        "ビジュアル", "外観", "装飾", "レイアウト", "配色", "カラー",
        "UI", "UX", "ユーザビリティ", "design", "でざいん"
    ],

    "セキュリティ": [
        "セキュリティ", "SSL", "暗号化", "https", "安全", "セキュア", "保護",
        "security", "安全性", "防御", "対策", "保証", "認証", "証明書",
        "せきゅりてぃ", "あんぜん"
    ],

    "サポート": [
        "サポート", "支援", "サポート", "ヘルプ", "アフターケア", "保守",
        "メンテナンス", "運用", "管理", "フォロー", "対応", "support",
        "help", "さぽーと"
    ],

    "格安": [
        "格安", "安い", "安価", "低価格", "激安", "お得", "リーズナブル",
        "お手頃", "エコノミー", "予算内", "コスパ", "cheap", "やすい"
    ],

    "急ぎ": [
        "急ぎ", "至急", "緊急", "今すぐ", "早急", "即日", "最短", "急いで",
        "早く", "スピード", "特急", "express", "urgent", "いそぎ"
    ]
};

// 複数キーワード検知と複合回答システム
const MultiKeywordHandler = {
    // 複数トピック検知
    detectMultipleTopics: function(input) {
        const detectedTopics = [];
        const normalizedInput = input.toLowerCase();

        for (const [category, keywords] of Object.entries(EnhancedSynonymDictionary)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword.toLowerCase())) {
                    if (!detectedTopics.includes(category)) {
                        detectedTopics.push(category);
                    }
                    break;
                }
            }
        }

        return detectedTopics;
    },

    // 複合回答生成
    generateCompositeResponse: function(topics) {
        if (topics.length === 0) return null;
        if (topics.length === 1) {
            return EnhancedResponses[topics[0]] || null;
        }

        // 複数トピックの場合、統合回答を生成
        let compositeMessage = `複数の項目についてお答えします！\n\n`;
        let actions = [];

        topics.slice(0, 3).forEach(topic => {  // 最大3トピックまで
            const response = EnhancedResponses[topic];
            if (response) {
                compositeMessage += `【${topic}について】\n${response.message.split('\n').slice(0, 5).join('\n')}\n\n`;
                if (response.action) {
                    actions.push(response.action);
                }
            }
        });

        return {
            message: compositeMessage.trim(),
            action: actions.length > 0 ? actions[0] : null,
            confidence: 'medium'
        };
    }
};

// 部分一致時の誘導機能
const PartialMatchHandler = {
    // 部分一致処理
    handlePartialMatch: function(input, detectedKeywords) {
        if (detectedKeywords.length === 0) return null;

        const primaryKeyword = detectedKeywords[0];
        const relatedQuestions = this.getRelatedQuestions(primaryKeyword);

        return {
            message: `${primaryKeyword}について何かお調べでしょうか？\n\n` +
                     `よくあるご質問：\n` +
                     relatedQuestions.map((q, i) => `${i + 1}. ${q.label}`).join('\n') +
                     `\n\n番号を選択するか、詳しくご質問ください！`,
            options: relatedQuestions,
            confidence: 'medium'
        };
    },

    // 関連質問の取得
    getRelatedQuestions: function(keyword) {
        const relatedMap = {
            '料金': [
                { label: '基本料金を知りたい', response: '料金' },
                { label: '分割払いについて', response: '分割払い' },
                { label: '追加料金について', response: '追加料金' },
                { label: '見積もりを依頼したい', response: '見積もり無料' }
            ],
            '制作': [
                { label: '制作の流れを知りたい', response: '制作フロー' },
                { label: '制作期間について', response: '期間' },
                { label: 'WordPressで作りたい', response: 'WordPress' },
                { label: '制作実績を見たい', response: '制作実績' }
            ],
            'サポート': [
                { label: '納品後のサポート', response: '完成後サポート' },
                { label: '保守・メンテナンス', response: '保守費用' },
                { label: '操作説明について', response: '操作説明' },
                { label: '緊急時の対応', response: '緊急対応' }
            ]
        };

        return relatedMap[keyword] || [];
    }
};

// 人気質問提案機能
const PopularQuestionSuggester = {
    // 人気質問リスト
    popularQuestions: [
        '料金はいくらですか？',
        '制作期間はどのくらい？',
        'WordPressで作れますか？',
        '制作実績を見たい',
        'スマホ対応していますか？',
        '保守サポートはありますか？',
        '無料見積もりは可能？',
        'SEO対策は含まれる？'
    ],

    // 会話の状態に応じた提案
    suggestQuestions: function(conversationHistory) {
        if (conversationHistory.length === 0) {
            return {
                message: `よくあるご質問から選んでいただくこともできます：\n\n` +
                        this.popularQuestions.slice(0, 5).map((q, i) => `${i + 1}. ${q}`).join('\n') +
                        `\n\nお気軽にご質問ください！`,
                suggestions: this.popularQuestions.slice(0, 5)
            };
        }

        return null;
    },

    // コンテキストに応じた次の質問提案
    suggestNextQuestions: function(lastTopic) {
        const nextQuestionMap = {
            '料金': ['制作期間は？', '分割払いできる？', '追加料金は？'],
            '期間': ['料金はいくら？', '急ぎ対応可能？', '制作フローは？'],
            'WordPress': ['料金は？', '制作期間は？', '保守サポートは？'],
            'デザイン': ['制作実績見たい', 'デザイン修正は何回？', '料金は？']
        };

        const suggestions = nextQuestionMap[lastTopic];
        if (suggestions) {
            return {
                message: `\n\n他にも知りたいことはありますか？\n` +
                        suggestions.map((q, i) => `• ${q}`).join('\n'),
                suggestions: suggestions
            };
        }

        return null;
    }
};

// エラーハンドリングとフォールバック
const ErrorHandler = {
    // エラー時のフォールバック回答
    getFallbackResponse: function() {
        const fallbackResponses = [
            {
                message: `申し訳ございません、ご質問の内容について詳しくお答えするには、
専門スタッフの対応が必要です。

よろしければ、以下からお選びください：
1. 料金について知りたい
2. 制作期間について知りたい
3. 制作実績を見たい
4. 直接相談したい`,
                action: '[お問い合わせフォーム](#contact)'
            },
            {
                message: `ご質問ありがとうございます。
より正確にお答えするため、もう少し詳しく教えていただけますか？

例えば：
• どんなサイトをお考えですか？
• ご予算はどのくらいですか？
• いつまでに必要ですか？`,
                action: '[詳しく相談する](#contact)'
            }
        ];

        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    },

    // 理解度スコア計算
    calculateConfidence: function(input, matchedKeywords) {
        const inputLength = input.length;
        const matchedLength = matchedKeywords.join('').length;
        const ratio = matchedLength / inputLength;

        if (ratio > 0.5) return 'high';
        if (ratio > 0.2) return 'medium';
        return 'low';
    }
};

// 改善されたキーワードマッチャー（既存システムとの統合）
const ImprovedKeywordMatcher = {
    // メイン処理
    findBestMatch: function(input) {
        // 1. 複数キーワード検知
        const detectedTopics = MultiKeywordHandler.detectMultipleTopics(input);

        // 2. 複数トピックがある場合は複合回答
        if (detectedTopics.length > 1) {
            return MultiKeywordHandler.generateCompositeResponse(detectedTopics);
        }

        // 3. 単一トピックの場合
        if (detectedTopics.length === 1) {
            const response = EnhancedResponses[detectedTopics[0]];
            if (response) {
                // 次の質問提案を追加
                const nextSuggestion = PopularQuestionSuggester.suggestNextQuestions(detectedTopics[0]);
                if (nextSuggestion) {
                    response.message += nextSuggestion.message;
                }
                return response;
            }
        }

        // 4. 部分一致の場合は誘導
        if (detectedTopics.length > 0) {
            return PartialMatchHandler.handlePartialMatch(input, detectedTopics);
        }

        // 5. マッチしない場合はフォールバック
        return ErrorHandler.getFallbackResponse();
    },

    // 数字入力への対応（選択肢）
    handleNumberInput: function(input, lastOptions) {
        const number = parseInt(input.trim());
        if (!isNaN(number) && lastOptions && lastOptions[number - 1]) {
            const selectedOption = lastOptions[number - 1];
            return EnhancedResponses[selectedOption.response] || null;
        }
        return null;
    }
};

// エクスポート（既存システムへの統合用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EnhancedResponses,
        EnhancedSynonymDictionary,
        MultiKeywordHandler,
        PartialMatchHandler,
        PopularQuestionSuggester,
        ErrorHandler,
        ImprovedKeywordMatcher
    };
}

// ブラウザ環境でのグローバル登録
if (typeof window !== 'undefined') {
    window.EnhancedResponses = EnhancedResponses;
    window.EnhancedSynonymDictionary = EnhancedSynonymDictionary;
    window.MultiKeywordHandler = MultiKeywordHandler;
    window.PartialMatchHandler = PartialMatchHandler;
    window.PopularQuestionSuggester = PopularQuestionSuggester;
    window.ErrorHandler = ErrorHandler;
    window.ImprovedKeywordMatcher = ImprovedKeywordMatcher;
}