/**
 * モダン・ビジネス向けPDF見積書生成モジュール
 * さりげない洗練されたデザイン
 * Canvas API + jsPDF ハイブリッド方式
 */

(function() {
    'use strict';

    // カラーパレット定義
    const COLORS = {
        primary: '#2C3E50',      // 濃紺 - メインテキスト
        accent: '#16A085',       // ティール - アクセントカラー
        background: '#FAFAFA',   // オフホワイト - 背景
        lightGray: '#ECF0F1',    // ライトグレー - セクション背景
        mediumGray: '#95A5A6',   // ミディアムグレー - サブテキスト
        darkGray: '#7F8C8D',     // ダークグレー - 補助テキスト
        border: '#E0E6E8',       // ボーダー色
        success: '#27AE60',      // 成功・ポジティブ
        white: '#FFFFFF'         // 白
    };

    /**
     * 高品質日本語テキストをCanvas APIで画像化する関数（透過背景）
     */
    function createModernJapaneseImage(text, fontSize = 16, color = COLORS.primary, fontWeight = 'normal') {
        const scale = 3;
        const minFontSize = 10;
        if (fontSize < minFontSize) {
            fontSize = minFontSize;
        }

        const actualFontSize = fontSize * scale;
        const fontFamily = '"Helvetica Neue", "Arial", "Hiragino Sans", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif';

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: false
        });

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.font = `${fontWeight} ${actualFontSize}px ${fontFamily}`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        const metrics = ctx.measureText(text);
        const textWidth = Math.ceil(metrics.width);
        const textHeight = actualFontSize * 1.4;

        canvas.width = textWidth + (8 * scale);
        canvas.height = textHeight + (4 * scale);

        // 透明な背景
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontWeight} ${actualFontSize}px ${fontFamily}`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        // テキストを描画
        ctx.fillStyle = color;
        ctx.fillText(text, 2 * scale, 2 * scale);

        return {
            dataUrl: canvas.toDataURL('image/png', 1.0),
            width: (canvas.width / scale) * 0.264583,
            height: (canvas.height / scale) * 0.264583
        };
    }

    /**
     * ドットリーダーを描画
     */
    function drawDottedLeader(doc, startX, endX, y) {
        const dotSpacing = 2;
        doc.setLineDash([1, dotSpacing], 0);
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(startX, y, endX, y);
        doc.setLineDash([]); // リセット
    }

    /**
     * セクションヘッダーを描画
     */
    function drawSectionHeader(doc, title, x, y, width) {
        // 左端のアクセントライン
        doc.setFillColor(22, 160, 133); // accent color
        doc.rect(x, y - 2, 3, 8, 'F');

        // タイトル
        const titleImage = createModernJapaneseImage(title, 11, COLORS.primary, '500');
        doc.addImage(titleImage.dataUrl, 'PNG', x + 8, y - 2, titleImage.width, titleImage.height);

        // 下線
        doc.setDrawColor(224, 230, 232); // border color
        doc.setLineWidth(0.5);
        doc.line(x, y + 8, x + width, y + 8);

        return y + 12;
    }

    /**
     * 改ページチェック
     */
    function checkPageBreak(doc, currentY, itemHeight, pageNumber, pageHeight = 280) {
        const MARGIN_BOTTOM = 35;

        if (currentY + itemHeight > pageHeight - MARGIN_BOTTOM) {
            addPageFooter(doc, pageNumber);
            doc.addPage();
            pageNumber++;
            addPageHeader(doc, pageNumber);

            return {
                y: 35,
                pageNumber: pageNumber
            };
        }

        return {
            y: currentY,
            pageNumber: pageNumber
        };
    }

    /**
     * ページヘッダー
     */
    function addPageHeader(doc, pageNumber) {
        if (pageNumber > 1) {
            // ページ番号を右上に
            doc.setFontSize(8);
            doc.setTextColor(127, 140, 141); // darkGray
            doc.text(`${pageNumber}`, 195, 15, { align: 'right' });

            // 上部にティールのアクセントライン
            doc.setDrawColor(22, 160, 133);
            doc.setLineWidth(0.5);
            doc.line(20, 20, 190, 20);

            doc.setTextColor(44, 62, 80); // primary
        }
    }

    /**
     * ページフッター
     */
    function addPageFooter(doc, pageNumber) {
        const pageHeight = doc.internal.pageSize.getHeight();

        // フッターライン
        doc.setDrawColor(224, 230, 232);
        doc.setLineWidth(0.3);
        doc.line(20, pageHeight - 30, 190, pageHeight - 30);
    }

    /**
     * 見積りデータを抽出
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

        // ページ数
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

        // 追加機能
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
        return `${year}${month}${day}-${random}`;
    }

    /**
     * メインPDF生成関数（モダンデザイン版）
     */
    window.generateModernPDF = async function() {
        try {
            showPDFLoading(true);

            if (typeof window.jspdf === 'undefined') {
                throw new Error('jsPDFライブラリが読み込まれていません');
            }

            const estimateData = extractEstimateData();
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            let currentY = 30;
            let pageNumber = 1;

            // === 左端のアクセントライン（全ページ共通） ===
            doc.setFillColor(22, 160, 133);
            doc.rect(0, 0, 2, 297, 'F');

            // === 1. ヘッダー部分 ===
            // 小さな会社ロゴスペース（プレースホルダー）
            doc.setDrawColor(224, 230, 232);
            doc.setLineWidth(0.5);
            doc.circle(30, currentY, 8);

            // タイトル
            const titleImage = createModernJapaneseImage('御見積書', 24, COLORS.primary, '300');
            doc.addImage(titleImage.dataUrl, 'PNG', 50, currentY - 5, titleImage.width, titleImage.height);

            // タイトル下の細いライン
            currentY += 15;
            doc.setDrawColor(22, 160, 133);
            doc.setLineWidth(1);
            doc.line(50, currentY, 90, currentY);
            currentY += 15;

            // === 2. 基本情報 ===
            // 見積番号と発行日を横並びに
            const estimateNoImage = createModernJapaneseImage('見積番号', 9, COLORS.darkGray);
            const dateImage = createModernJapaneseImage('発行日', 9, COLORS.darkGray);

            doc.addImage(estimateNoImage.dataUrl, 'PNG', 20, currentY, estimateNoImage.width, estimateNoImage.height);
            doc.setFontSize(10);
            doc.setTextColor(44, 62, 80);
            doc.text(estimateData.estimateNumber, 45, currentY + 1);

            doc.addImage(dateImage.dataUrl, 'PNG', 120, currentY, dateImage.width, dateImage.height);
            const dateValueImage = createModernJapaneseImage(estimateData.date, 10, COLORS.primary);
            doc.addImage(dateValueImage.dataUrl, 'PNG', 140, currentY - 1, dateValueImage.width, dateValueImage.height);
            currentY += 15;

            // === 3. 顧客名欄 ===
            // モダンな下線スタイル
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.5);
            doc.line(20, currentY + 8, 90, currentY + 8);

            const customerLabelImage = createModernJapaneseImage('御中', 11, COLORS.primary);
            doc.addImage(customerLabelImage.dataUrl, 'PNG', 92, currentY + 3, customerLabelImage.width, customerLabelImage.height);

            // 押印欄（右上に控えめに）
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.setLineDash([2, 2], 0);
            doc.circle(170, currentY, 12);
            const sealImage = createModernJapaneseImage('印', 8, COLORS.lightGray);
            doc.addImage(sealImage.dataUrl, 'PNG', 167, currentY - 3, sealImage.width, sealImage.height);
            doc.setLineDash([]);

            currentY += 25;

            // === 4. 合計金額ボックス（モダンスタイル） ===
            // 背景
            doc.setFillColor(250, 250, 250);
            doc.roundedRect(20, currentY, 170, 30, 2, 2, 'F');

            // 左側のアクセント
            doc.setFillColor(22, 160, 133);
            doc.rect(20, currentY, 3, 30, 'F');

            // 合計金額ラベル
            const totalLabelImage = createModernJapaneseImage('合計金額', 10, COLORS.darkGray);
            doc.addImage(totalLabelImage.dataUrl, 'PNG', 30, currentY + 5, totalLabelImage.width, totalLabelImage.height);

            const taxNoteImage = createModernJapaneseImage('（税別）', 8, COLORS.mediumGray);
            doc.addImage(taxNoteImage.dataUrl, 'PNG', 30, currentY + 12, taxNoteImage.width, taxNoteImage.height);

            // 金額（大きく表示）
            doc.setFontSize(24);
            doc.setTextColor(44, 62, 80);
            doc.setFont('helvetica', 'bold');
            doc.text(estimateData.totalPrice, 180, currentY + 15, { align: 'right' });
            doc.setFont('helvetica', 'normal');

            currentY += 40;

            // === 5. 明細セクション ===
            currentY = drawSectionHeader(doc, '明細', 20, currentY, 170);
            currentY += 5;

            // テーブルヘッダー
            doc.setFillColor(236, 240, 241);
            doc.rect(20, currentY - 5, 170, 10, 'F');

            const headerNoImage = createModernJapaneseImage('No.', 9, COLORS.darkGray, '500');
            const headerCategoryImage = createModernJapaneseImage('区分', 9, COLORS.darkGray, '500');
            const headerItemImage = createModernJapaneseImage('項目', 9, COLORS.darkGray, '500');
            const headerPriceImage = createModernJapaneseImage('金額', 9, COLORS.darkGray, '500');

            doc.addImage(headerNoImage.dataUrl, 'PNG', 25, currentY - 2, headerNoImage.width, headerNoImage.height);
            doc.addImage(headerCategoryImage.dataUrl, 'PNG', 40, currentY - 2, headerCategoryImage.width, headerCategoryImage.height);
            doc.addImage(headerItemImage.dataUrl, 'PNG', 75, currentY - 2, headerItemImage.width, headerItemImage.height);
            doc.addImage(headerPriceImage.dataUrl, 'PNG', 165, currentY - 2, headerPriceImage.width, headerPriceImage.height);
            currentY += 12;

            // 明細項目
            estimateData.items.forEach((item, index) => {
                // 改ページチェック
                const pageBreakResult = checkPageBreak(doc, currentY, 10, pageNumber);
                currentY = pageBreakResult.y;
                pageNumber = pageBreakResult.pageNumber;

                if (pageBreakResult.y === 35) {
                    // 新しいページでヘッダー再描画
                    doc.setFillColor(236, 240, 241);
                    doc.rect(20, currentY - 5, 170, 10, 'F');
                    doc.addImage(headerNoImage.dataUrl, 'PNG', 25, currentY - 2, headerNoImage.width, headerNoImage.height);
                    doc.addImage(headerCategoryImage.dataUrl, 'PNG', 40, currentY - 2, headerCategoryImage.width, headerCategoryImage.height);
                    doc.addImage(headerItemImage.dataUrl, 'PNG', 75, currentY - 2, headerItemImage.width, headerItemImage.height);
                    doc.addImage(headerPriceImage.dataUrl, 'PNG', 165, currentY - 2, headerPriceImage.width, headerPriceImage.height);
                    currentY += 12;
                }

                // 項目番号（01, 02, 03...）
                doc.setFontSize(9);
                doc.setTextColor(149, 165, 166);
                doc.text(String(index + 1).padStart(2, '0'), 27, currentY);

                // カテゴリ
                const categoryImage = createModernJapaneseImage(
                    item.category.length > 8 ? item.category.substring(0, 8) + '...' : item.category,
                    9,
                    COLORS.darkGray
                );
                doc.addImage(categoryImage.dataUrl, 'PNG', 40, currentY - 2, categoryImage.width, categoryImage.height);

                // 項目名
                const itemNameImage = createModernJapaneseImage(
                    item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
                    9,
                    COLORS.primary
                );
                doc.addImage(itemNameImage.dataUrl, 'PNG', 75, currentY - 2, itemNameImage.width, itemNameImage.height);

                // ドットリーダー
                drawDottedLeader(doc, 130, 160, currentY);

                // 金額
                doc.setFontSize(9);
                doc.setTextColor(44, 62, 80);
                doc.text(item.price || '', 180, currentY, { align: 'right' });

                currentY += 8;
            });

            // === 6. 小計 ===
            currentY += 10;
            const subtotalPageBreak = checkPageBreak(doc, currentY, 30, pageNumber);
            currentY = subtotalPageBreak.y;
            pageNumber = subtotalPageBreak.pageNumber;

            // 小計ライン
            doc.setDrawColor(22, 160, 133);
            doc.setLineWidth(1);
            doc.line(100, currentY, 190, currentY);
            currentY += 8;

            const subtotalImage = createModernJapaneseImage('小計（税別）', 10, COLORS.darkGray);
            doc.addImage(subtotalImage.dataUrl, 'PNG', 130, currentY - 3, subtotalImage.width, subtotalImage.height);

            doc.setFontSize(12);
            doc.setTextColor(44, 62, 80);
            doc.setFont('helvetica', 'bold');
            doc.text(estimateData.totalPrice, 180, currentY, { align: 'right' });
            doc.setFont('helvetica', 'normal');
            currentY += 20;

            // === 7. 備考欄 ===
            const remarksPageBreak = checkPageBreak(doc, currentY, 60, pageNumber);
            currentY = remarksPageBreak.y;
            pageNumber = remarksPageBreak.pageNumber;

            currentY = drawSectionHeader(doc, '備考', 20, currentY, 170);
            currentY += 5;

            // 備考内容ボックス
            doc.setFillColor(250, 250, 250);
            doc.rect(20, currentY, 170, 35, 'F');
            doc.setDrawColor(224, 230, 232);
            doc.setLineWidth(0.5);
            doc.rect(20, currentY, 170, 35);

            currentY += 8;
            const note1Image = createModernJapaneseImage('• 本見積書の有効期限は発行日より30日間です', 9, COLORS.darkGray);
            const note2Image = createModernJapaneseImage('• 上記金額に別途消費税が加算されます', 9, COLORS.darkGray);
            const note3Image = createModernJapaneseImage('• お支払い条件：納品後30日以内', 9, COLORS.darkGray);

            doc.addImage(note1Image.dataUrl, 'PNG', 25, currentY, note1Image.width, note1Image.height);
            currentY += 8;
            doc.addImage(note2Image.dataUrl, 'PNG', 25, currentY, note2Image.width, note2Image.height);
            currentY += 8;
            doc.addImage(note3Image.dataUrl, 'PNG', 25, currentY, note3Image.width, note3Image.height);

            // === 8. フッター ===
            addPageFooter(doc, pageNumber);

            // 会社情報（最下部に控えめに）
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.setFontSize(8);
            doc.setTextColor(149, 165, 166);
            doc.text('Web Development Services', 105, pageHeight - 20, { align: 'center' });
            doc.text('contact@example.com | 000-0000-0000', 105, pageHeight - 15, { align: 'center' });

            // === 9. PDFダウンロード ===
            const filename = `Estimate_${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}_${new Date().getHours().toString().padStart(2,'0')}${new Date().getMinutes().toString().padStart(2,'0')}${new Date().getSeconds().toString().padStart(2,'0')}.pdf`;

            doc.save(filename);

            showNotification('モダンデザインのPDF見積書を生成しました', 'success');

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
        const existingLoader = document.getElementById('pdf-loader-modern');

        if (show) {
            if (!existingLoader) {
                const loader = document.createElement('div');
                loader.id = 'pdf-loader-modern';
                loader.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(44, 62, 80, 0.95);
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
                            border: 3px solid rgba(255, 255, 255, 0.2);
                            border-top-color: #16A085;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                            margin: 0 auto 20px;
                        "></div>
                        <p style="font-size: 18px; font-weight: 300;">PDF生成中...</p>
                        <p style="font-size: 14px; margin-top: 10px; opacity: 0.7;">モダンデザインを適用しています</p>
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
        const existingNotification = document.querySelector('.pdf-notification-modern');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'pdf-notification-modern';

        const bgColor = type === 'success' ? '#16A085' :
                       type === 'error' ? '#E74C3C' : '#3498DB';

        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: ${bgColor};
            color: #FFFFFF;
            padding: 16px 24px;
            border-radius: 4px;
            font-weight: 400;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            z-index: 100000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            max-width: 400px;
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        if (!document.getElementById('pdf-notification-style-modern')) {
            const style = document.createElement('style');
            style.id = 'pdf-notification-style-modern';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // グローバルに公開
    window.generateEstimatePDF = window.generateModernPDF;
    window.generateJapanesePDF = window.generateModernPDF;
    window.generateJapaneseFullPDF = window.generateModernPDF;
    window.generateHighQualityJapanesePDF = window.generateModernPDF;

})();