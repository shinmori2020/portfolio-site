// FAQデータ
const faqData = [
    // 基本的な質問
    {
        id: 1,
        category: 'production',
        question: 'ホームページって本当に必要ですか？',
        answer: '今の時代、ホームページはお店の「顔」です。24時間365日、あなたの代わりに商品やサービスを紹介してくれる営業マンのような存在です。スマホで検索する人が増えているので、ホームページがないとお客様に見つけてもらえない可能性があります。',
        tags: ['ホームページ', '商品', 'サービス', 'スマホ']
    },
    {
        id: 2,
        category: 'production',
        question: 'ホームページを作るとどんな良いことがありますか？',
        answer: '新しいお客様に見つけてもらいやすくなります。お店の信頼感がアップし、24時間いつでも商品やサービスの案内ができます。また、お問い合わせも増えて、売上アップにつながることが多いです。',
        tags: ['商品', 'サービス', '売上アップ', '信頼感']
    },
    {
        id: 3,
        category: 'production',
        question: 'スマホでも見やすいサイトを作ってもらえますか？',
        answer: 'はい、もちろんです。今は7割以上の人がスマホでホームページを見ています。スマホでもパソコンでも見やすく、使いやすいサイトを作ります。文字の大きさやボタンの配置も、スマホで操作しやすいように工夫します。',
        tags: ['スマホ', 'パソコン', 'ボタン']
    },
    {
        id: 4,
        category: 'production',
        question: '検索で上位に表示されるようになりますか？',
        answer: 'Google やYahoo!で見つけてもらいやすくなる基本的な設定は全て行います。ただし、検索順位は競合他社の状況にも影響されるので、継続的な改善が大切です。お客様と一緒に少しずつ順位を上げていくお手伝いをします。',
        tags: ['Google', 'Yahoo!', '検索', '順位']
    },
    {
        id: 5,
        category: 'production',
        question: '自分でも更新できるホームページにできますか？',
        answer: 'はい、お客様ご自身で文章や画像を更新できるシステムをご用意します。ブログを書くような感覚で、専門知識がなくても簡単に更新できます。もちろん、使い方も丁寧にご説明します。',
        tags: ['更新', '文章', '画像', 'ブログ']
    },
    {
        id: 6,
        category: 'pricing',
        question: 'ホームページ制作の料金はいくらですか？',
        answer: 'ランディングページ（1ページのサイト）10万円〜、企業サイト15万円〜、更新システム付きサイト20万円〜が目安です。詳しい金額は、ご希望の内容をお聞きしてからお見積りします。分割払いも可能です。',
        tags: ['ランディングページ', '企業サイト', '料金', '分割払い']
    },
    {
        id: 7,
        category: 'pricing',
        question: '追加料金が発生することはありますか？',
        answer: '基本的に最初のお見積り金額から追加料金は発生しません。大きな変更や追加のページが必要な場合は、事前にお見積りをお渡しして、ご了承いただいてから作業します。',
        tags: ['追加料金', '変更', '見積り']
    },
    {
        id: 8,
        category: 'pricing',
        question: '制作期間はどのくらいですか？',
        answer: 'シンプルなページは2-3週間、企業サイトは3-4週間、システム付きサイトは4-6週間が目安です。お急ぎの場合はご相談ください。できる限り対応いたします。',
        tags: ['シンプル', '企業サイト', 'システム', '週間']
    },
    {
        id: 9,
        category: 'pricing',
        question: '支払い方法を教えてください',
        answer: '銀行振込とクレジットカード払いが可能です。着手時に半額、完成時に残り半額をお支払いいただく形が基本ですが、分割払い（2-3回）もご相談に応じます。',
        tags: ['銀行振込', 'クレジットカード', '分割払い']
    },
    {
        id: 10,
        category: 'pricing',
        question: '見積もりは無料ですか？',
        answer: 'はい、お見積りは完全無料です。ご相談だけでも大丈夫です。強引な営業は一切しませんので、安心してお問い合わせください。',
        tags: ['見積り', '無料', '営業', '安心']
    },
    {
        id: 11,
        category: 'support',
        question: '完成後のサポートはありますか？',
        answer: '完成後3ヶ月間は無料でサポートします。簡単な修正や使い方の質問などに対応します。その後も月額1万円〜の保守プランをご用意していますので、長くお付き合いできます。',
        tags: ['サポート', '修正', '保守プラン']
    },
    {
        id: 12,
        category: 'support',
        question: 'ドメインやサーバーって何ですか？必要ですか？',
        answer: 'ドメインはホームページの住所、サーバーはホームページを置く場所です。どちらも必要ですが、取得や設定は全てお手伝いします。年間1-3万円程度の費用がかかります。',
        tags: ['ドメイン', 'サーバー', 'ホームページ']
    },
    {
        id: 13,
        category: 'support',
        question: 'ホームページが表示されなくなったらどうすればいいですか？',
        answer: '保守契約をいただいている場合は、すぐに対応いたします。原因を調べて素早く復旧させます。緊急の場合は電話でもご連絡いただけます。',
        tags: ['保守契約', '復旧', '電話']
    },
    {
        id: 14,
        category: 'support',
        question: '使い方を教えてもらえますか？',
        answer: 'もちろんです。完成時に分かりやすいマニュアルをお渡しし、1-2時間程度の使い方レッスンも行います。その後も3ヶ月間は無料で質問にお答えします。',
        tags: ['マニュアル', 'レッスン', '質問']
    },
    {
        id: 15,
        category: 'support',
        question: 'ホームページの更新は自分でできますか？',
        answer: 'はい、お知らせやブログなどは、お客様ご自身で更新できるようにします。難しい作業は必要なく、ワープロ感覚で文章を書いたり、写真を追加したりできます。',
        tags: ['お知らせ', 'ブログ', 'ワープロ', '写真']
    },
    {
        id: 16,
        category: 'production',
        question: '写真がなくてもホームページは作れますか？',
        answer: 'はい、大丈夫です。無料で使える高品質な写真素材をご用意したり、イラストやアイコンを使ったデザインもできます。もしプロの写真が必要な場合は、カメラマンをご紹介することもできます。',
        tags: ['写真', 'イラスト', 'アイコン', 'カメラマン']
    },
    {
        id: 17,
        category: 'production',
        question: '動きのあるおしゃれなサイトにできますか？',
        answer: 'はい、文字がふわっと出てきたり、写真がスライドしたり、スクロールに合わせて動く効果など、様々な動きを付けることができます。ただし、動きが多すぎると見づらくなるので、バランスを考えて提案します。',
        tags: ['文字', '写真', 'スライド', 'スクロール']
    },
    {
        id: 18,
        category: 'production',
        question: 'お問い合わせフォームは作ってもらえますか？',
        answer: 'はい、お問い合わせフォームは標準で作成します。お客様からの問い合わせが自動でメールに届き、お客様にも確認メールが送られます。必要に応じて、アンケートや予約フォームも作ることができます。',
        tags: ['お問い合わせフォーム', 'メール', 'アンケート', '予約フォーム']
    },
    {
        id: 19,
        category: 'production',
        question: 'どんな業種のホームページでも作れますか？',
        answer: 'はい、飲食店、美容室、クリニック、士業、製造業、サービス業など、あらゆる業種に対応しています。それぞれの業界の特徴を理解し、お客様の業種に最適なデザインと機能をご提案します。',
        tags: ['飲食店', '美容室', 'クリニック', '製造業']
    },
    {
        id: 20,
        category: 'production',
        question: 'デザインのイメージがまとまっていないのですが大丈夫ですか？',
        answer: '大丈夫です。お客様のお話をじっくり聞いて、一緒にイメージを作っていきます。参考になるサイトを見せたり、いくつかのデザイン案を提案したりして、理想のホームページを作ります。',
        tags: ['イメージ', 'デザイン案', 'ホームページ']
    },
    {
        id: 21,
        category: 'pricing',
        question: '契約書は必要ですか？',
        answer: 'お客様のご希望に応じて契約書を作成します。お互いの安心のために、制作内容や料金、納期などを明確にした契約書を交わすことをお勧めしています。',
        tags: ['契約書', '料金', '納期']
    },
    {
        id: 22,
        category: 'pricing',
        question: '請求書や領収書は発行してもらえますか？',
        answer: 'はい、もちろん発行します。PDFファイルでメール送付、または郵送も可能です。必要な書類があればお申し付けください。',
        tags: ['請求書', '領収書', 'PDFファイル', '郵送']
    },
    {
        id: 23,
        category: 'pricing',
        question: '修正は何回までできますか？',
        answer: 'デザイン段階では満足いただけるまで修正します。制作開始後は3回まで無料で修正し、それ以降は内容により相談させていただきます。',
        tags: ['修正', 'デザイン', '無料']
    },
    {
        id: 24,
        category: 'pricing',
        question: 'キャンセルはできますか？',
        answer: 'デザイン着手前なら無料でキャンセルできます。着手後は進行状況に応じて料金が発生する場合があります。詳しくは契約時にご説明します。',
        tags: ['キャンセル', 'デザイン', '料金']
    },
    {
        id: 25,
        category: 'pricing',
        question: '遠方でも対応してもらえますか？',
        answer: '全国どこでも対応可能です。打ち合わせはビデオ通話やメール、電話で行います。必要であれば出張も可能です（交通費別途）。',
        tags: ['全国', 'ビデオ通話', 'メール', '電話']
    },
    {
        id: 26,
        category: 'production',
        question: '会員限定ページは作れますか？',
        answer: 'はい、会員だけが見られる特別なページを作ることができます。会員登録やログイン機能も付けられます。会員向けの特別な情報やサービスを提供したい場合にお勧めです。',
        tags: ['会員', '会員登録', 'ログイン機能']
    },
    {
        id: 27,
        category: 'production',
        question: '地図は載せられますか？',
        answer: 'はい、Google マップを使って、お店や会社の場所を分かりやすく表示できます。お客様が迷わずに来られるように、駅からの道順を載せることもできます。',
        tags: ['Google', 'マップ', '駅', '道順']
    },
    {
        id: 28,
        category: 'production',
        question: 'よくある質問に自動で答える機能は付けられますか？',
        answer: 'はい、よくある質問に自動で答えるチャット機能を付けることができます。営業時間外でも、お客様の簡単な質問に答えることができるので、便利です。',
        tags: ['チャット機能', '営業時間外', '質問']
    },
    {
        id: 29,
        category: 'production',
        question: '予約システムは作れますか？',
        answer: 'はい、カレンダーから日時を選んで予約できるシステムを作れます。予約が入ると自動でメールが届き、キャンセルや変更もできるようにします。',
        tags: ['カレンダー', '予約', 'メール', 'キャンセル']
    },
    {
        id: 30,
        category: 'production',
        question: 'ネットショップも作れますか？',
        answer: 'はい、商品を販売できるネットショップも作成可能です。商品管理、カート機能、決済システムなど、必要な機能を全て含めて制作します。',
        tags: ['商品', 'ネットショップ', 'カート機能', '決済システム']
    },
    {
        id: 31,
        category: 'support',
        question: 'セキュリティは大丈夫ですか？',
        answer: 'はい、しっかりとセキュリティ対策を行います。不正なアクセスを防ぐ仕組みを入れ、定期的に安全性をチェックします。お客様の大切な情報を守るため、最新の対策を実施します。',
        tags: ['セキュリティ', '安全性', '情報']
    },
    {
        id: 32,
        category: 'support',
        question: 'ホームページの表示が遅いのは改善できますか？',
        answer: 'はい、表示速度を速くする方法はたくさんあります。画像のサイズを小さくしたり、不要な機能を削除したりして、サクサク表示されるようにします。遅いサイトはお客様が離れてしまうので、しっかり対策します。',
        tags: ['表示速度', '画像', 'サクサク']
    },
    {
        id: 33,
        category: 'support',
        question: 'バックアップは取ってもらえますか？',
        answer: '保守契約をいただいている場合は、定期的にバックアップを取ります。万が一の時でも、すぐに元に戻せるので安心です。',
        tags: ['バックアップ', '保守契約', '安心']
    },
    {
        id: 34,
        category: 'support',
        question: 'アクセス解析はできますか？',
        answer: 'はい、どのくらいの人が見ているか、どのページが人気かなどが分かる解析ツールを設定します。見方も簡単に説明しますので、ホームページの改善に活用できます。',
        tags: ['解析ツール', '人気', 'ホームページ', '改善']
    },
    {
        id: 35,
        category: 'support',
        question: '他社で作ったサイトの修正もお願いできますか？',
        answer: 'はい、対応可能です。まず現在のサイトを確認して、どんな修正が必要か診断します。部分的な修正から全面リニューアルまで承ります。',
        tags: ['サイト', '修正', 'リニューアル']
    },
    {
        id: 36,
        category: 'production',
        question: '初めてホームページを作るので不安です',
        answer: '大丈夫です。多くのお客様が初めてです。分からないことは何でも聞いてください。専門用語は使わず、分かりやすく説明します。一緒に良いホームページを作りましょう。',
        tags: ['初めて', '分かりやすく', 'ホームページ']
    },
    {
        id: 37,
        category: 'production',
        question: '何から準備すればいいですか？',
        answer: '特別な準備は必要ありません。会社案内やパンフレットがあればお見せください。なくても、お話を聞きながら必要な情報を整理していきます。',
        tags: ['会社案内', 'パンフレット', '情報']
    },
    {
        id: 38,
        category: 'production',
        question: '打ち合わせは何回くらい必要ですか？',
        answer: '通常2-3回の打ち合わせで完成します。初回はご要望をお聞きし、2回目でデザイン確認、3回目で最終確認という流れです。オンラインでも対応可能です。',
        tags: ['打ち合わせ', 'デザイン確認', 'オンライン']
    },
    {
        id: 39,
        category: 'production',
        question: '文章を書くのが苦手なのですが',
        answer: '文章作成もお手伝いします。お話を聞いて、プロのライターが魅力的な文章を作成します。もちろん、確認・修正していただけます。',
        tags: ['文章', 'ライター', '修正']
    },
    {
        id: 40,
        category: 'production',
        question: '色やデザインにこだわりがあります',
        answer: 'お客様のこだわりを大切にします。好きな色、イメージ、参考にしたいサイトなど、何でもお聞かせください。ご希望に沿ったデザインを提案します。',
        tags: ['色', 'イメージ', 'サイト', 'デザイン']
    },
    {
        id: 41,
        category: 'support',
        question: 'SNSと連携できますか？',
        answer: 'はい、Facebook、Instagram、Twitter（X）などと連携できます。SNSの投稿をホームページに表示したり、シェアボタンを設置したりできます。',
        tags: ['Facebook', 'Instagram', 'Twitter', 'シェアボタン']
    },
    {
        id: 42,
        category: 'support',
        question: 'ブログは書けるようになりますか？',
        answer: 'はい、ブログ機能を付けることができます。お知らせや新商品の紹介、日々の出来事など、簡単に投稿できるようになります。',
        tags: ['ブログ機能', 'お知らせ', '新商品', '投稿']
    },
    {
        id: 43,
        category: 'support',
        question: 'メールマガジンは送れますか？',
        answer: 'はい、お客様にメールマガジンを送る仕組みを作れます。新商品やキャンペーンのお知らせなど、定期的に情報を届けることができます。',
        tags: ['メールマガジン', '新商品', 'キャンペーン', '情報']
    },
    {
        id: 44,
        category: 'support',
        question: '広告を出したいのですが',
        answer: 'Google広告やFacebook広告の設定もお手伝いできます。効果的な広告運用のアドバイスもいたします。',
        tags: ['Google広告', 'Facebook広告', '広告運用']
    },
    {
        id: 45,
        category: 'support',
        question: 'YouTubeの動画を載せられますか？',
        answer: 'はい、YouTube動画を簡単に埋め込むことができます。会社紹介や商品説明の動画を載せることで、より分かりやすいサイトになります。',
        tags: ['YouTube動画', '会社紹介', '商品説明', 'サイト']
    },
    {
        id: 46,
        category: 'production',
        question: '英語や中国語のページも作れますか？',
        answer: 'はい、英語や中国語など、外国語のページも作成できます。翻訳が必要な場合は、プロの翻訳者をご紹介することもできます。海外のお客様向けのページを作りたい方はご相談ください。',
        tags: ['英語', '中国語', '翻訳者', '海外']
    },
    {
        id: 47,
        category: 'production',
        question: '高齢者や障害のある方でも使いやすいサイトにできますか？',
        answer: 'はい、文字を大きくしたり、色のコントラストを強くしたり、音声読み上げソフトに対応したりと、誰でも使いやすいホームページを作ります。全ての人に優しいデザインを心がけています。',
        tags: ['文字', '色', '音声読み上げ', 'ホームページ']
    },
    {
        id: 48,
        category: 'production',
        question: '今流行りのAI機能も使えますか？',
        answer: 'はい、お客様の質問に自動で答えるAI機能や、おすすめ商品を自動で表示する機能など、最新の技術を使った便利な機能を追加できます。お客様のビジネスに合った使い方をご提案します。',
        tags: ['AI機能', '質問', '商品', 'ビジネス']
    },
    {
        id: 49,
        category: 'production',
        question: 'スマホアプリも作ってもらえますか？',
        answer: 'ホームページをアプリのように使える仕組みは作れます。本格的なスマホアプリが必要な場合は、信頼できる専門の会社をご紹介します。まずはホームページから始めることをお勧めしています。',
        tags: ['ホームページ', 'アプリ', 'スマホアプリ']
    },
    {
        id: 50,
        category: 'production',
        question: '複数のサイトを作りたいのですが割引はありますか？',
        answer: '2サイト以上のご依頼で割引させていただきます。グループ会社や複数店舗をお持ちの方は、お得なパッケージプランもございます。詳しくはご相談ください。',
        tags: ['サイト', '割引', 'グループ会社', 'パッケージプラン']
    }
];

// FAQ管理クラス
class FAQManager {
    constructor(data) {
        this.allData = data;
        this.filteredData = data;
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.displayCount = 10; // 初期表示件数
        this.incrementCount = 10; // 追加表示件数
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderFAQs();
    }

    setupEventListeners() {
        // 検索機能
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.search(e.target.value);
        });

        // カテゴリーフィルター
        const categoryButtons = document.querySelectorAll('.faq-category');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterByCategory(btn);
            });
        });
    }

    search(query) {
        this.searchQuery = query.toLowerCase();
        this.applyFilters();
    }

    filterByCategory(button) {
        // アクティブクラスの切り替え
        document.querySelectorAll('.faq-category').forEach(btn => {
            btn.classList.remove('faq-category--active');
        });
        button.classList.add('faq-category--active');

        this.currentCategory = button.dataset.category;
        this.applyFilters();
    }

    applyFilters() {
        this.filteredData = this.allData.filter(item => {
            // カテゴリーフィルター
            if (this.currentCategory !== 'all' && item.category !== this.currentCategory) {
                return false;
            }

            // 検索フィルター
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                return item.question.toLowerCase().includes(query) ||
                       item.answer.toLowerCase().includes(query);
            }

            return true;
        });

        // フィルター変更時は表示数をリセット
        this.displayCount = 10;
        this.renderFAQs();
    }

    renderFAQs(isLoadMore = false) {
        const faqContainer = document.getElementById('faqContainer');
        const noResults = document.getElementById('noResults');

        if (this.filteredData.length === 0) {
            faqContainer.parentElement.style.display = 'none';
            noResults.classList.add('faq-no-results--show');
            return;
        }

        faqContainer.parentElement.style.display = 'block';
        noResults.classList.remove('faq-no-results--show');

        // 表示するデータを制限
        const displayData = this.filteredData.slice(0, this.displayCount);

        // もっと見るボタンから呼ばれた場合は、既存のアイテムの後に追加
        if (isLoadMore) {
            const currentItemCount = faqContainer.querySelectorAll('.faq__item').length;
            const newItems = this.filteredData.slice(currentItemCount, this.displayCount);

            const newItemsHtml = newItems.map((item, index) => `
                <div class="faq__item faq__item--new" onclick="toggleFaq(this)" style="opacity: 0; transform: translateY(20px); transition: opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s;">
                    <div class="faq__question">
                        <span class="faq__question-text">${this.highlightText(item.question, this.searchQuery)}</span>
                        <div class="faq__expand-icon"></div>
                    </div>
                    <div class="faq__answer">
                        <div class="faq__answer-text">${this.highlightText(item.answer, this.searchQuery)}</div>
                        ${item.tags ? `
                            <div class="faq__tags">
                                ${item.tags.map(tag => `
                                    <span class="faq__tag" onclick="searchByKeyword('${tag}'); event.stopPropagation();">${tag}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');

            faqContainer.insertAdjacentHTML('beforeend', newItemsHtml);

            // 新しく追加されたアイテムをスムーズに表示
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const newElements = faqContainer.querySelectorAll('.faq__item--new');
                    newElements.forEach(el => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                        el.classList.remove('faq__item--new');
                    });
                });
            });
        } else {
            // 通常のレンダリング（全体を置き換え）
            faqContainer.innerHTML = displayData.map(item => `
                <div class="faq__item" onclick="toggleFaq(this)">
                    <div class="faq__question">
                        <span class="faq__question-text">${this.highlightText(item.question, this.searchQuery)}</span>
                        <div class="faq__expand-icon"></div>
                    </div>
                    <div class="faq__answer">
                        <div class="faq__answer-text">${this.highlightText(item.answer, this.searchQuery)}</div>
                        ${item.tags ? `
                            <div class="faq__tags">
                                ${item.tags.map(tag => `
                                    <span class="faq__tag" onclick="searchByKeyword('${tag}'); event.stopPropagation();">${tag}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        }

        // もっと見るボタンの制御
        this.updateLoadMoreButton();
    }

    updateLoadMoreButton() {
        // 既存のボタンを削除
        const existingButton = document.querySelector('.faq__load-more');
        if (existingButton) {
            existingButton.remove();
        }

        // まだ表示していないアイテムがある場合はボタンを表示
        if (this.displayCount < this.filteredData.length) {
            const button = document.createElement('div');
            button.className = 'faq__load-more';
            button.innerHTML = `
                <button class="faq__load-more-button" onclick="faqManager.loadMore()">
                    もっと見る（残り${this.filteredData.length - this.displayCount}件）
                </button>
            `;

            const faqSection = document.querySelector('.faq');
            const contactSection = document.querySelector('.faq__contact');
            faqSection.insertBefore(button, contactSection);
        }
    }

    loadMore() {
        // 現在のボタン位置を記録
        const button = document.querySelector('.faq__load-more-button');
        const buttonRect = button.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        this.displayCount += this.incrementCount;
        this.renderFAQs(true); // もっと見るフラグを渡す

        // スムーズにスクロール調整（新しいカードが見えるように）
        setTimeout(() => {
            const newButton = document.querySelector('.faq__load-more-button');
            if (newButton) {
                // ボタンの位置を維持
                const targetScroll = scrollTop + (newButton.getBoundingClientRect().top - buttonRect.top);
                window.scrollTo({
                    top: targetScroll - 100, // 少し上にマージンを持たせる
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: rgba(0, 255, 136, 0.3); color: #fff;">$1</mark>');
    }

    updateSearchHistory() {
        if (this.searchQuery) {
            const history = JSON.parse(localStorage.getItem('faqSearchHistory') || '[]');
            if (!history.includes(this.searchQuery)) {
                history.unshift(this.searchQuery);
                localStorage.setItem('faqSearchHistory', JSON.stringify(history.slice(0, 10)));
            }
        }
    }
}

// FAQマネージャーのインスタンス作成（グローバル変数として設定）
let faqManager;

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    faqManager = new FAQManager(faqData);
    // グローバル変数として設定
    window.faqManager = faqManager;

    // モバイルタブの切り替え機能
    const mobileTabs = document.querySelectorAll('.mobile-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    mobileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // タブのアクティブ状態を切り替え
            mobileTabs.forEach(t => t.classList.remove('mobile-tab--active'));
            tab.classList.add('mobile-tab--active');

            // コンテンツの表示を切り替え
            tabPanes.forEach(pane => {
                if (pane.dataset.pane === targetTab) {
                    pane.classList.add('tab-pane--active');
                } else {
                    pane.classList.remove('tab-pane--active');
                }
            });
        });
    });
});

// アコーディオン開閉（1つ開いたら他を閉じる）
function toggleFaq(item) {
    try {
        // 同じFAQコンテナ内の他のアイテムを閉じる
        const container = item.closest('.faq__container');
        if (container) {
            const allItems = container.querySelectorAll('.faq__item');

            // 他のアイテムを閉じる
            allItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('faq__item--active');
                }
            });
        }

        // クリックされたアイテムをトグル
        item.classList.toggle('faq__item--active');
    } catch (error) {
        console.error('FAQ toggle error:', error);
    }
}

// 検索クリア
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
}

// ページ離脱時に検索履歴を保存
window.addEventListener('beforeunload', () => {
    if (faqManager && faqManager.searchQuery) {
        const searchHistory = JSON.parse(localStorage.getItem('faqSearchHistory') || '[]');
        if (!searchHistory.includes(faqManager.searchQuery)) {
            searchHistory.unshift(faqManager.searchQuery);
            localStorage.setItem('faqSearchHistory', JSON.stringify(searchHistory.slice(0, 10)));
        }
    }
});

// キーワードで検索（グローバル関数として定義）
function searchByKeyword(keyword) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = keyword;

        // FAQManagerが存在する場合は直接検索を実行
        if (window.faqManager) {
            window.faqManager.search(keyword);
        } else {
            // FAQManagerがまだ初期化されていない場合はイベントを発火
            searchInput.dispatchEvent(new Event('input'));
        }
    }
}