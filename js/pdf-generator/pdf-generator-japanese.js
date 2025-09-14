/**
 * 日本語対応PDF見積書生成モジュール
 * Canvas API + jsPDF ハイブリッド方式
 * 改ページ対応版
 */

(function() {
    'use strict';

    /**
     * 日本語テキストをCanvas APIで画像化する関数
     * @param {string} text - 画像化したい日本語テキスト
     * @param {number} fontSize - フォントサイズ（デフォルト：16）
     * @param {string} fontFamily - フォントファミリー
     * @returns {Object} 画像データとサイズ情報
     */
    function createJapaneseImage(text, fontSize = 16, fontFamily = 'Arial, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif') {
        // 仮想canvasを作成
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // フォント設定
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = '#000000';
        ctx.textBaseline = 'top';

        // テキストの幅を測定
        const metrics = ctx.measureText(text);
        canvas.width = Math.ceil(metrics.width) + 4;
        canvas.height = fontSize * 1.4; // 日本語用に高さを調整

        // キャンバスリサイズでリセットされるため再設定
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = '#000000';
        ctx.textBaseline = 'top';

        // 背景を白に
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // テキストを描画
        ctx.fillStyle = '#000000';
        ctx.fillText(text, 2, 2);

        return {
            dataUrl: canvas.toDataURL('image/png'),
            width: canvas.width * 0.264583, // ピクセル→mm変換（96dpi基準）
            height: canvas.height * 0.264583
        };
    }

    /**
     * Y座標をチェックして必要に応じて改ページ
     * @param {jsPDF} doc - PDFドキュメント
     * @param {number} currentY - 現在のY座標
     * @param {number} itemHeight - 追加する要素の高さ
     * @param {number} pageHeight - ページの最大高さ（デフォルト：280mm）
     * @returns {Object} 新しいY座標とページ番号
     */
    function checkPageBreak(doc, currentY, itemHeight, pageNumber, pageHeight = 280) {
        const MARGIN_BOTTOM = 30;

        if (currentY + itemHeight > pageHeight - MARGIN_BOTTOM) {
            // ページフッターを追加
            addPageFooter(doc, pageNumber);

            // 新しいページを追加
            doc.addPage();
            pageNumber++;

            // ページヘッダーを追加
            addPageHeader(doc, pageNumber);

            return {
                y: 30, // 新しいページの開始位置
                pageNumber: pageNumber
            };
        }

        return {
            y: currentY,
            pageNumber: pageNumber
        };
    }

    /**
     * ページヘッダーを追加
     */
    function addPageHeader(doc, pageNumber) {
        if (pageNumber > 1) {
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text(`Page ${pageNumber}`, 190, 10, { align: 'right' });
            doc.setTextColor(0, 0, 0);
        }
    }

    /**
     * ページフッターを追加
     */
    function addPageFooter(doc, pageNumber) {
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, pageHeight - 25, 190, pageHeight - 25);
        doc.setTextColor(0, 0, 0);
    }

    /**
     * 項目名変換マッピング
     */
    const ITEM_NAME_MAPPING = {
        // ページ数
        '1ページ（LP）': '1 Page (Landing Page)',
        '5ページ': '5 Pages',
        '10ページ': '10 Pages',
        '10ページ以上': 'More than 10 Pages',

        // デザイン
        'テンプレートベース': 'Template Based',
        'オリジナルデザイン': 'Original Design',
        'プレミアムデザイン': 'Premium Design',

        // 追加機能
        '1ページ追加': 'Additional Page',
        'LPの長さ延長': 'LP Extension',
        'お問い合わせフォーム': 'Contact Form',
        '予約フォーム': 'Booking Form',
        '基本CMS（ブログ機能）': 'Basic CMS (Blog)',
        '高度なCMS（カテゴリ・タグ管理）': 'Advanced CMS',
        'ニュース・お知らせ機能': 'News/Announcement',
        'SNS連携（Instagram/Twitter）': 'SNS Integration',
        'Google Maps連携': 'Google Maps',
        '基本SEO対策': 'Basic SEO',
        'スライダー・カルーセル': 'Slider/Carousel',
        'アニメーション効果': 'Animation Effects',
        'パララックス効果': 'Parallax Effects',
        'モーダル・ライトボックス': 'Modal/Lightbox',
        '高機能エディタ導入': 'Advanced Editor',
        'FAQ作成': 'FAQ Section',
        'WooCommerce基本設定': 'WooCommerce Basic',
        'WooCommerce決済設定': 'WooCommerce Payment',
        '会員制サイト構築': 'Membership Site',
        'Yoast SEO設定': 'Yoast SEO Setup',
        'Polylang設定': 'Multilingual Setup'
    };

    /**
     * カテゴリ名変換マッピング
     */
    const CATEGORY_MAPPING = {
        'ページ数': 'Pages',
        'デザイン': 'Design',
        'ページ・コンテンツ関連': 'Content',
        'フォーム機能': 'Forms',
        'コンテンツ管理システム': 'CMS',
        '外部サービス連携': 'Integration',
        'SEO・マーケティング': 'SEO/Marketing',
        'UI/UX・視覚効果': 'UI/UX',
        'WordPress機能・プラグイン': 'WordPress'
    };

    /**
     * 項目名を変換する関数
     */
    function convertItemName(itemName) {
        return ITEM_NAME_MAPPING[itemName] || itemName;
    }

    /**
     * カテゴリ名を変換する関数
     */
    function convertCategoryName(categoryName) {
        return CATEGORY_MAPPING[categoryName] || categoryName;
    }

    /**
     * 見積りデータを抽出（DOMから取得）
     */
    function extractEstimateData() {
        const data = {
            date: new Date().toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            estimateNumber: generateEstimateNumber(),
            totalPrice: document.getElementById('totalPrice')?.textContent || '¥0',
            items: []
        };

        // 基本料金（ページ数）
        const selectedPage = document.querySelector('input[name="pages"]:checked');
        if (selectedPage) {
            const pageLabel = selectedPage.nextElementSibling.querySelector('.pricing-calculator__option-title')?.textContent;
            const pagePrice = selectedPage.nextElementSibling.querySelector('.pricing-calculator__option-price')?.textContent;
            if (pagePrice && pagePrice !== 'お見積り') {
                data.items.push({
                    category: 'ページ数',
                    name: pageLabel,
                    price: pagePrice
                });
            }
        }

        // デザイン
        const selectedDesign = document.querySelector('input[name="design"]:checked');
        if (selectedDesign) {
            const designLabel = selectedDesign.nextElementSibling.querySelector('.pricing-calculator__option-title')?.textContent;
            const designPrice = selectedDesign.nextElementSibling.querySelector('.pricing-calculator__option-price')?.textContent;
            if (designPrice && designPrice !== '+¥0') {
                data.items.push({
                    category: 'デザイン',
                    name: designLabel,
                    price: designPrice
                });
            }
        }

        // 追加機能（チェックボックス）
        const selectedFeatures = document.querySelectorAll('input[name="features"]:checked');
        selectedFeatures.forEach(feature => {
            const parentGroup = feature.closest('.pricing-calculator__form-group');
            const groupTitle = parentGroup?.querySelector('.pricing-calculator__form-title')?.textContent || '追加機能';
            const featureLabel = feature.nextElementSibling.querySelector('.pricing-calculator__option-title')?.textContent;
            const featurePrice = feature.nextElementSibling.querySelector('.pricing-calculator__option-price')?.textContent;

            data.items.push({
                category: groupTitle,
                name: featureLabel,
                price: featurePrice
            });
        });

        // 合計金額を数値として取得
        const totalText = data.totalPrice.replace(/[¥,]/g, '');
        data.total = parseInt(totalText) || 0;

        return data;
    }

    /**
     * 見積番号を生成
     */
    function generateEstimateNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
        return `EST-${year}${month}${day}-${random}`;
    }

    /**
     * メインPDF生成関数（日本語対応版）
     */
    window.generateJapanesePDF = async function() {
        try {
            // ローディング表示
            showPDFLoading(true);

            // jsPDFが読み込まれているか確認
            if (typeof window.jspdf === 'undefined') {
                throw new Error('jsPDFライブラリが読み込まれていません');
            }

            // 見積りデータを取得
            const estimateData = extractEstimateData();

            // PDFドキュメントを作成
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            let currentY = 20;
            let pageNumber = 1;

            // === 1. タイトル部分（日本語を画像化） ===
            const titleImage = createJapaneseImage('御見積書', 28);
            doc.addImage(
                titleImage.dataUrl,
                'PNG',
                (210 - titleImage.width) / 2, // 中央揃え
                currentY,
                titleImage.width,
                titleImage.height
            );
            currentY += titleImage.height + 15;

            // === 2. 基本情報 ===
            // 見積番号（英語）
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Estimate No: ${estimateData.estimateNumber}`, 20, currentY);

            // 発行日（日本語画像）
            const dateImage = createJapaneseImage(`発行日: ${estimateData.date}`, 10);
            doc.addImage(dateImage.dataUrl, 'PNG', 140, currentY - 3, dateImage.width, dateImage.height);
            currentY += 15;

            // 区切り線
            doc.setDrawColor(200, 200, 200);
            doc.line(20, currentY, 190, currentY);
            currentY += 10;

            // === 3. 顧客名欄 ===
            doc.setTextColor(0, 0, 0);
            doc.setDrawColor(150, 150, 150);
            doc.line(20, currentY + 5, 100, currentY + 5); // 顧客名記入線
            const customerImage = createJapaneseImage('様', 14);
            doc.addImage(customerImage.dataUrl, 'PNG', 102, currentY, customerImage.width, customerImage.height);
            currentY += 20;

            // === 4. 合計金額ボックス ===
            // 背景色
            doc.setFillColor(0, 200, 100);
            doc.rect(120, currentY - 5, 70, 25, 'F');

            // 合計金額ラベル（日本語画像）
            const totalLabelImage = createJapaneseImage('合計金額（税別）', 11);
            doc.addImage(totalLabelImage.dataUrl, 'PNG', 125, currentY, totalLabelImage.width, totalLabelImage.height);

            // 金額（大きく表示）
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(estimateData.totalPrice, 125, currentY + 12);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            currentY += 35;

            // === 5. 内訳見出し ===
            const breakdownImage = createJapaneseImage('【お見積り内訳】', 14);
            doc.addImage(breakdownImage.dataUrl, 'PNG', 20, currentY, breakdownImage.width, breakdownImage.height);
            currentY += breakdownImage.height + 10;

            // === 6. テーブルヘッダー ===
            // ヘッダー背景
            doc.setFillColor(240, 240, 240);
            doc.rect(20, currentY - 5, 170, 10, 'F');

            // ヘッダーラベル（日本語画像）
            const headerCategoryImage = createJapaneseImage('区分', 10);
            const headerItemImage = createJapaneseImage('項目', 10);
            const headerPriceImage = createJapaneseImage('金額', 10);

            doc.addImage(headerCategoryImage.dataUrl, 'PNG', 25, currentY - 2, headerCategoryImage.width, headerCategoryImage.height);
            doc.addImage(headerItemImage.dataUrl, 'PNG', 70, currentY - 2, headerItemImage.width, headerItemImage.height);
            doc.addImage(headerPriceImage.dataUrl, 'PNG', 155, currentY - 2, headerPriceImage.width, headerPriceImage.height);
            currentY += 12;

            // === 7. 各項目を描画 ===
            doc.setFontSize(9);
            estimateData.items.forEach((item, index) => {
                // 改ページチェック
                const pageBreakResult = checkPageBreak(doc, currentY, 10, pageNumber);
                currentY = pageBreakResult.y;
                pageNumber = pageBreakResult.pageNumber;

                // 新しいページの場合、テーブルヘッダーを再描画
                if (pageBreakResult.y === 30) {
                    // ヘッダー背景
                    doc.setFillColor(240, 240, 240);
                    doc.rect(20, currentY - 5, 170, 10, 'F');

                    // ヘッダーラベル
                    doc.addImage(headerCategoryImage.dataUrl, 'PNG', 25, currentY - 2, headerCategoryImage.width, headerCategoryImage.height);
                    doc.addImage(headerItemImage.dataUrl, 'PNG', 70, currentY - 2, headerItemImage.width, headerItemImage.height);
                    doc.addImage(headerPriceImage.dataUrl, 'PNG', 155, currentY - 2, headerPriceImage.width, headerPriceImage.height);
                    currentY += 12;
                }

                // 交互に背景色
                if (index % 2 === 1) {
                    doc.setFillColor(250, 250, 250);
                    doc.rect(20, currentY - 4, 170, 8, 'F');
                }

                // カテゴリ（英語変換）
                const category = convertCategoryName(item.category || '');
                doc.setFontSize(8);
                doc.text(category, 25, currentY);

                // 項目名（英語変換）
                const itemName = convertItemName(item.name || '');
                doc.setFontSize(8);
                // 長い項目名は切り詰め
                const maxWidth = 70;
                let displayName = itemName;
                if (doc.getTextWidth(displayName) > maxWidth) {
                    while (doc.getTextWidth(displayName + '...') > maxWidth && displayName.length > 0) {
                        displayName = displayName.slice(0, -1);
                    }
                    displayName += '...';
                }
                doc.text(displayName, 70, currentY);

                // 金額
                doc.text(item.price || '', 155, currentY);

                currentY += 8;
            });

            // === 8. 小計欄 ===
            currentY += 5;

            // 改ページチェック
            const subtotalPageBreak = checkPageBreak(doc, currentY, 30, pageNumber);
            currentY = subtotalPageBreak.y;
            pageNumber = subtotalPageBreak.pageNumber;

            // 区切り線
            doc.setDrawColor(150, 150, 150);
            doc.line(100, currentY, 190, currentY);
            currentY += 8;

            // 小計ラベル（日本語画像）
            const subtotalImage = createJapaneseImage('小計（税別）', 11);
            doc.addImage(subtotalImage.dataUrl, 'PNG', 115, currentY - 3, subtotalImage.width, subtotalImage.height);

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(estimateData.totalPrice, 155, currentY);
            doc.setFont('helvetica', 'normal');
            currentY += 15;

            // === 9. 備考欄 ===
            // 改ページチェック
            const remarksPageBreak = checkPageBreak(doc, currentY, 50, pageNumber);
            currentY = remarksPageBreak.y;
            pageNumber = remarksPageBreak.pageNumber;

            // 備考見出し（日本語画像）
            const remarksImage = createJapaneseImage('【備考】', 12);
            doc.addImage(remarksImage.dataUrl, 'PNG', 20, currentY, remarksImage.width, remarksImage.height);
            currentY += remarksImage.height + 8;

            // 備考内容（日本語画像）
            doc.setFontSize(9);
            const note1Image = createJapaneseImage('・本見積書の有効期限は発行日より30日間です。', 9);
            const note2Image = createJapaneseImage('・上記金額に別途消費税が加算されます。', 9);
            const note3Image = createJapaneseImage('・お支払い条件：納品後30日以内', 9);

            doc.addImage(note1Image.dataUrl, 'PNG', 25, currentY, note1Image.width, note1Image.height);
            currentY += note1Image.height + 3;
            doc.addImage(note2Image.dataUrl, 'PNG', 25, currentY, note2Image.width, note2Image.height);
            currentY += note2Image.height + 3;
            doc.addImage(note3Image.dataUrl, 'PNG', 25, currentY, note3Image.width, note3Image.height);

            // === 10. 最終ページのフッター ===
            addPageFooter(doc, pageNumber);

            // フッターメッセージ（日本語画像）
            const footerImage = createJapaneseImage('ご不明な点がございましたら、お気軽にお問い合わせください。', 8);
            doc.addImage(
                footerImage.dataUrl,
                'PNG',
                (210 - footerImage.width) / 2,
                270,
                footerImage.width,
                footerImage.height
            );

            // === 11. PDFダウンロード ===
            const filename = `見積書_${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}_${new Date().getHours().toString().padStart(2,'0')}${new Date().getMinutes().toString().padStart(2,'0')}${new Date().getSeconds().toString().padStart(2,'0')}.pdf`;

            doc.save(filename);

            // 成功通知
            showNotification('PDF見積書を生成しました', 'success');

        } catch (error) {
            console.error('PDF生成エラー:', error);
            showNotification('PDF生成に失敗しました: ' + error.message, 'error');
        } finally {
            showPDFLoading(false);
        }
    };

    /**
     * ローディング表示
     */
    function showPDFLoading(show) {
        const existingLoader = document.getElementById('pdf-loader-japanese');

        if (show) {
            if (!existingLoader) {
                const loader = document.createElement('div');
                loader.id = 'pdf-loader-japanese';
                loader.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 99999;
                `;
                loader.innerHTML = `
                    <div style="text-align: center; color: white;">
                        <div style="
                            width: 60px;
                            height: 60px;
                            border: 5px solid rgba(255, 255, 255, 0.3);
                            border-top-color: #00ff88;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                            margin: 0 auto 20px;
                        "></div>
                        <p style="font-size: 18px;">PDF生成中...</p>
                        <p style="font-size: 14px; margin-top: 10px; opacity: 0.8;">日本語見積書を作成しています</p>
                    </div>
                    <style>
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    </style>
                `;
                document.body.appendChild(loader);
            }
        } else {
            if (existingLoader) {
                existingLoader.remove();
            }
        }
    }

    /**
     * 通知表示
     */
    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.pdf-notification-japanese');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'pdf-notification-japanese';

        const bgColor = type === 'success' ? '#00ff88' :
                       type === 'error' ? '#ff4444' : '#0088ff';

        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${bgColor};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 20px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-family: 'メイリオ', sans-serif;
            z-index: 100000;
            animation: notificationSlide 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        // アニメーション
        if (!document.getElementById('pdf-notification-style-japanese')) {
            const style = document.createElement('style');
            style.id = 'pdf-notification-style-japanese';
            style.textContent = `
                @keyframes notificationSlide {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -60%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // 3秒後に削除
        setTimeout(() => {
            notification.style.animation = 'notificationSlide 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // グローバルに公開（既存の関数を上書き）
    window.generateEstimatePDF = window.generateJapanesePDF;

})();