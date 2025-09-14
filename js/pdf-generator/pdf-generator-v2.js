/**
 * PDF見積書生成モジュール v2
 * jsPDFのみを使用してテキストベースでPDF生成
 * 改ページ対応版
 */

(function() {
    'use strict';

    /**
     * PDF生成のメイン関数（改ページ対応版）
     */
    window.generateEstimatePDFv2 = async function() {
        try {
            // ローディング表示
            showPDFLoading(true);

            // jsPDFが読み込まれているか確認
            if (typeof window.jspdf === 'undefined') {
                throw new Error('jsPDFライブラリが読み込まれていません');
            }

            // 見積りデータを抽出
            const estimateData = extractEstimateData();

            // 項目数に応じたレイアウト設定を取得
            const layout = optimizeLayout(estimateData.items.length);

            // PDF生成
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: layout.orientation,
                unit: 'mm',
                format: 'a4'
            });

            // 日本語フォント設定（通常のフォントで代替）
            doc.setFont('helvetica');

            // ページサイズの取得
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const maxY = pageHeight - 30; // フッター用の余白を確保

            let currentY = margin + 10;

            // ========== ヘッダー部分 ==========
            // タイトル
            doc.setFontSize(24);
            doc.setTextColor(0, 0, 0);
            const title = 'ESTIMATE';
            const titleWidth = doc.getTextWidth(title);
            doc.text(title, (pageWidth - titleWidth) / 2, currentY);

            // 日本語表記（英語で代替）
            doc.setFontSize(14);
            const subtitle = '(Quotation)';
            const subtitleWidth = doc.getTextWidth(subtitle);
            currentY += 8;
            doc.text(subtitle, (pageWidth - subtitleWidth) / 2, currentY);
            currentY += 15;

            // 見積番号と日付
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            const estimateNo = `No: ${estimateData.estimateNumber}`;
            const dateText = `Date: ${estimateData.date}`;
            doc.text(estimateNo, margin, currentY);
            doc.text(dateText, pageWidth - margin - doc.getTextWidth(dateText), currentY);
            currentY += 10;

            // 区切り線
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, currentY, pageWidth - margin, currentY);
            currentY += 10;

            // ========== 宛先と合計金額 ==========
            // 宛先欄
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('To:', margin, currentY);
            doc.setDrawColor(180, 180, 180);
            doc.line(margin + 15, currentY, margin + 80, currentY);

            // 合計金額ボックス（右側）
            const totalBoxX = pageWidth - margin - 70;
            const totalBoxY = currentY - 8;
            doc.setFillColor(0, 200, 100);
            doc.rect(totalBoxX, totalBoxY, 70, 20, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text('TOTAL (excl. tax)', totalBoxX + 5, totalBoxY + 7);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text(estimateData.totalPrice, totalBoxX + 5, totalBoxY + 16);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);

            currentY += 25;

            // ========== 明細テーブル ==========
            // テーブルヘッダー
            const tableStartY = currentY;
            const col1X = margin;
            const col2X = margin + 35;
            const col3X = pageWidth - margin - 40;
            const col4X = pageWidth - margin - 20;

            // ヘッダー背景
            doc.setFillColor(240, 240, 240);
            doc.rect(margin, currentY - 5, pageWidth - (margin * 2), 10, 'F');

            // ヘッダーテキスト
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('Category', col1X, currentY);
            doc.text('Item', col2X, currentY);
            doc.text('Price', col3X, currentY);
            doc.setFont('helvetica', 'normal');
            currentY += 10;

            // テーブルデータ
            doc.setFontSize(10);
            let pageNumber = 1;
            let itemsOnCurrentPage = 0;
            const maxItemsFirstPage = layout.orientation === 'portrait' ? 25 : 18;
            const maxItemsPerPage = layout.orientation === 'portrait' ? 35 : 25;

            estimateData.items.forEach((item, index) => {
                // 改ページチェック
                const needsPageBreak = pageNumber === 1
                    ? itemsOnCurrentPage >= maxItemsFirstPage
                    : itemsOnCurrentPage >= maxItemsPerPage;

                if (needsPageBreak || currentY > maxY) {
                    // フッターを追加
                    addPageFooter(doc, pageNumber, pageWidth, pageHeight);

                    // 新しいページ
                    doc.addPage();
                    pageNumber++;
                    currentY = margin + 10;
                    itemsOnCurrentPage = 0;

                    // ページ番号
                    doc.setFontSize(9);
                    doc.setTextColor(150, 150, 150);
                    doc.text(`Page ${pageNumber}`, pageWidth - margin - 15, margin);
                    doc.setTextColor(0, 0, 0);
                    currentY += 5;

                    // テーブルヘッダーを再描画
                    doc.setFillColor(240, 240, 240);
                    doc.rect(margin, currentY - 5, pageWidth - (margin * 2), 10, 'F');
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Category', col1X, currentY);
                    doc.text('Item', col2X, currentY);
                    doc.text('Price', col3X, currentY);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(10);
                    currentY += 10;
                }

                // アイテムを描画
                // 交互に背景色を設定
                if (index % 2 === 1) {
                    doc.setFillColor(250, 250, 250);
                    doc.rect(margin, currentY - 5, pageWidth - (margin * 2), 8, 'F');
                }

                // カテゴリを短縮表示
                const categoryMap = {
                    'ページ数': 'Pages',
                    'デザイン': 'Design',
                    '追加機能': 'Feature',
                    'ページ・コンテンツ関連': 'Content',
                    'フォーム機能': 'Form',
                    'コンテンツ管理システム': 'CMS',
                    '外部サービス連携': 'Integration',
                    'SEO・マーケティング': 'SEO',
                    'UI/UX・視覚効果': 'UI/UX',
                    'WordPress機能・プラグイン': 'WordPress'
                };

                const category = categoryMap[item.category] || item.category || '';
                const itemName = truncateText(doc, item.name || '', 90);
                const price = item.price || '';

                doc.text(category, col1X, currentY);
                doc.text(itemName, col2X, currentY);
                doc.text(price, col3X, currentY);

                currentY += 8;
                itemsOnCurrentPage++;
            });

            // ========== 小計と合計 ==========
            currentY += 5;

            // 改ページチェック（小計用）
            if (currentY > maxY - 30) {
                addPageFooter(doc, pageNumber, pageWidth, pageHeight);
                doc.addPage();
                pageNumber++;
                currentY = margin + 20;
            }

            // 区切り線
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, currentY, pageWidth - margin, currentY);
            currentY += 8;

            // 小計
            doc.setFontSize(11);
            doc.text('Subtotal (excl. tax):', col3X - 40, currentY);
            doc.setFont('helvetica', 'bold');
            doc.text(estimateData.totalPrice, col3X, currentY);
            doc.setFont('helvetica', 'normal');
            currentY += 8;

            // ========== 備考欄 ==========
            if (currentY <= maxY - 40) {
                currentY += 10;
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text('Notes:', margin, currentY);
                doc.setFont('helvetica', 'normal');
                currentY += 7;

                doc.setFontSize(9);
                doc.setTextColor(80, 80, 80);
                const notes = [
                    '- This estimate is valid for 30 days from the date of issue.',
                    '- Consumption tax will be added separately.',
                    '- Payment terms: Within 30 days after delivery.'
                ];

                notes.forEach(note => {
                    if (currentY <= maxY - 10) {
                        doc.text(note, margin + 3, currentY);
                        currentY += 5;
                    }
                });
            }

            // 最終ページのフッター
            addPageFooter(doc, pageNumber, pageWidth, pageHeight);

            // ファイル名生成
            const fileName = generateFileName();

            // PDFを保存
            doc.save(fileName);

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
     * 見積りデータを抽出（DOM から取得）
     */
    function extractEstimateData() {
        const data = {
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
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

        return data;
    }

    /**
     * 項目数に応じたレイアウト最適化
     */
    function optimizeLayout(itemCount) {
        if (itemCount <= 15) {
            return {
                orientation: 'portrait',
                fontSize: 11,
                lineHeight: 8
            };
        } else if (itemCount <= 25) {
            return {
                orientation: 'portrait',
                fontSize: 10,
                lineHeight: 7
            };
        } else {
            return {
                orientation: 'portrait',
                fontSize: 9,
                lineHeight: 6
            };
        }
    }

    /**
     * テキストを指定幅に収まるように切り詰め
     */
    function truncateText(doc, text, maxWidth) {
        if (doc.getTextWidth(text) <= maxWidth) {
            return text;
        }

        let truncated = text;
        while (doc.getTextWidth(truncated + '...') > maxWidth && truncated.length > 0) {
            truncated = truncated.slice(0, -1);
        }
        return truncated + '...';
    }

    /**
     * ページフッターを追加
     */
    function addPageFooter(doc, pageNumber, pageWidth, pageHeight) {
        const margin = 20;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);

        // フッターライン
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

        // フッターテキスト
        const footerText = 'Generated with Web Estimate System';
        const footerWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 10);

        doc.setTextColor(0, 0, 0);
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
     * ファイル名を生成
     */
    function generateFileName() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');
        return `Estimate_${year}${month}${day}_${hour}${minute}${second}.pdf`;
    }

    /**
     * ローディング表示
     */
    function showPDFLoading(show) {
        const existingLoader = document.getElementById('pdf-loader-v2');

        if (show) {
            if (!existingLoader) {
                const loader = document.createElement('div');
                loader.id = 'pdf-loader-v2';
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
                        <p style="font-size: 14px; margin-top: 10px; opacity: 0.8;">改ページ処理を実行しています</p>
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
        const existingNotification = document.querySelector('.pdf-notification-v2');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'pdf-notification-v2';

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
            z-index: 100000;
            animation: notificationSlide 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        // アニメーション
        if (!document.getElementById('pdf-notification-style-v2')) {
            const style = document.createElement('style');
            style.id = 'pdf-notification-style-v2';
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

    // グローバルに公開（既存の関数も残す）
    window.generateEstimatePDF = window.generateEstimatePDFv2;

})();