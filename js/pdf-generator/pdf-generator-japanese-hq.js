/**
 * 高品質日本語PDF見積書生成モジュール
 * Canvas API + jsPDF ハイブリッド方式
 * 高解像度・最適化版
 */

(function() {
    'use strict';

    /**
     * 高品質日本語テキストをCanvas APIで画像化する関数
     * @param {string} text - 画像化したい日本語テキスト
     * @param {number} fontSize - フォントサイズ（デフォルト：16）
     * @param {string} fontFamily - フォントファミリー
     * @param {string} fontWeight - フォントウェイト
     * @returns {Object} 画像データとサイズ情報
     */
    function createHighQualityJapaneseImage(text, fontSize = 16, fontFamily = '"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "游ゴシック", "Yu Gothic", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif', fontWeight = 'normal') {
        // 解像度スケール（3倍で高品質化）
        const scale = 3;

        // 最小フォントサイズの保証（読みやすさ確保）
        const minFontSize = 10;
        if (fontSize < minFontSize) {
            fontSize = minFontSize;
        }

        // 実際の描画サイズ
        const actualFontSize = fontSize * scale;

        // 仮想canvasを作成
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: false
        });

        // アンチエイリアスを有効化
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // フォント設定（高解像度）
        ctx.font = `${fontWeight} ${actualFontSize}px ${fontFamily}`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        // テキストの幅を測定
        const metrics = ctx.measureText(text);
        const textWidth = Math.ceil(metrics.width);
        const textHeight = actualFontSize * 1.4; // 日本語用に高さを調整

        // Canvas サイズを設定（パディング込み）
        canvas.width = textWidth + (8 * scale);
        canvas.height = textHeight + (4 * scale);

        // 高DPI対応の設定
        // ctx.scale(scale, scale); // この行は削除（既にactualFontSizeで対応）

        // 背景を透過に設定（白い背景を削除）
        // ctx.fillStyle = '#ffffff';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 透明な背景にする
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // フォント設定を再度適用（canvasリサイズ後）
        ctx.font = `${fontWeight} ${actualFontSize}px ${fontFamily}`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        // シャドウ効果で視認性向上（微細）
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = scale * 0.5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = scale * 0.3;

        // テキストを描画（真っ黒で鮮明に）
        ctx.fillStyle = '#000000';
        ctx.fillText(text, 2 * scale, 2 * scale);

        // シャドウをリセット
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // コントラスト強化（透過背景対応版）
        // 画像データを取得して処理
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // コントラスト係数（1.2 = 20%強化）
        const contrast = 1.2;
        const factor = (259 * (contrast + 1)) / (1 * (259 - contrast));

        for (let i = 0; i < data.length; i += 4) {
            // アルファチャンネルがある場合のみ処理（透明でない部分）
            if (data[i + 3] > 0) {
                // RGBチャンネルのコントラスト調整
                data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));     // Red
                data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128)); // Green
                data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128)); // Blue
            }
            // Alpha channel (i + 3) は変更しない
        }

        // 処理後のデータを書き戻し
        ctx.putImageData(imageData, 0, 0);

        return {
            dataUrl: canvas.toDataURL('image/png', 1.0), // 最高品質で出力
            width: (canvas.width / scale) * 0.264583, // ピクセル→mm変換（高解像度考慮）
            height: (canvas.height / scale) * 0.264583
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
     * 長いテキストを指定幅に収まるように調整
     */
    function truncateTextForImage(text, maxLength = 30) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 2) + '...';
    }

    /**
     * メインPDF生成関数（高品質日本語版）
     */
    window.generateHighQualityJapanesePDF = async function() {
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
                format: 'a4',
                compress: true
            });

            // PDFの圧縮設定
            doc.internal.scaleFactor = 1.5;

            let currentY = 20;
            let pageNumber = 1;

            // === 1. タイトル部分（高品質日本語画像） ===
            const titleImage = createHighQualityJapaneseImage('御見積書', 32, undefined, 'bold');
            doc.addImage(
                titleImage.dataUrl,
                'PNG',
                (210 - titleImage.width) / 2, // 中央揃え
                currentY,
                titleImage.width,
                titleImage.height,
                undefined,
                'FAST' // 圧縮方式
            );
            currentY += titleImage.height + 15;

            // === 2. 基本情報 ===
            // 見積番号（高品質日本語画像）
            const estimateNoImage = createHighQualityJapaneseImage(`見積番号: ${estimateData.estimateNumber}`, 11);
            doc.addImage(estimateNoImage.dataUrl, 'PNG', 20, currentY, estimateNoImage.width, estimateNoImage.height);

            // 発行日（高品質日本語画像）
            const dateImage = createHighQualityJapaneseImage(`発行日: ${estimateData.date}`, 11);
            doc.addImage(dateImage.dataUrl, 'PNG', 140, currentY, dateImage.width, dateImage.height);
            currentY += 15;

            // 区切り線
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.5);
            doc.line(20, currentY, 190, currentY);
            currentY += 10;

            // === 3. 顧客名欄 ===
            doc.setTextColor(0, 0, 0);
            doc.setDrawColor(150, 150, 150);
            doc.line(20, currentY + 5, 100, currentY + 5); // 顧客名記入線
            const customerImage = createHighQualityJapaneseImage('様', 16);
            doc.addImage(customerImage.dataUrl, 'PNG', 102, currentY, customerImage.width, customerImage.height);
            currentY += 20;

            // === 4. 合計金額ボックス ===
            // 背景色
            doc.setFillColor(0, 200, 100);
            doc.roundedRect(120, currentY - 5, 70, 25, 3, 3, 'F');

            // 合計金額ラベル（高品質日本語画像）
            const totalLabelImage = createHighQualityJapaneseImage('合計金額（税別）', 12);
            doc.addImage(totalLabelImage.dataUrl, 'PNG', 125, currentY, totalLabelImage.width, totalLabelImage.height);

            // 金額（大きく表示）
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text(estimateData.totalPrice, 125, currentY + 12);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            currentY += 35;

            // === 5. 内訳見出し ===
            const breakdownImage = createHighQualityJapaneseImage('【お見積り内訳】', 16, undefined, 'bold');
            doc.addImage(breakdownImage.dataUrl, 'PNG', 20, currentY, breakdownImage.width, breakdownImage.height);
            currentY += breakdownImage.height + 10;

            // === 6. テーブルヘッダー ===
            // ヘッダー背景
            doc.setFillColor(240, 240, 240);
            doc.rect(20, currentY - 5, 170, 10, 'F');

            // ヘッダーラベル（高品質日本語画像）
            const headerCategoryImage = createHighQualityJapaneseImage('区分', 11, undefined, 'bold');
            const headerItemImage = createHighQualityJapaneseImage('項目', 11, undefined, 'bold');
            const headerPriceImage = createHighQualityJapaneseImage('金額', 11, undefined, 'bold');

            doc.addImage(headerCategoryImage.dataUrl, 'PNG', 25, currentY - 2, headerCategoryImage.width, headerCategoryImage.height);
            doc.addImage(headerItemImage.dataUrl, 'PNG', 70, currentY - 2, headerItemImage.width, headerItemImage.height);
            doc.addImage(headerPriceImage.dataUrl, 'PNG', 155, currentY - 2, headerPriceImage.width, headerPriceImage.height);
            currentY += 12;

            // === 7. 各項目を描画（高品質日本語） ===
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

                // カテゴリ（高品質日本語画像）
                const categoryText = truncateTextForImage(item.category || '', 15);
                const categoryImage = createHighQualityJapaneseImage(categoryText, 9);
                doc.addImage(categoryImage.dataUrl, 'PNG', 25, currentY - 2, categoryImage.width, categoryImage.height);

                // 項目名（高品質日本語画像）
                const itemText = truncateTextForImage(item.name || '', 25);
                const itemImage = createHighQualityJapaneseImage(itemText, 9);
                doc.addImage(itemImage.dataUrl, 'PNG', 70, currentY - 2, itemImage.width, itemImage.height);

                // 金額（数字なのでテキストで表示）
                doc.setFontSize(10);
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
            doc.setLineWidth(0.8);
            doc.line(100, currentY, 190, currentY);
            currentY += 8;

            // 小計ラベル（高品質日本語画像）
            const subtotalImage = createHighQualityJapaneseImage('小計（税別）', 12);
            doc.addImage(subtotalImage.dataUrl, 'PNG', 115, currentY - 3, subtotalImage.width, subtotalImage.height);

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(estimateData.totalPrice, 155, currentY);
            doc.setFont('helvetica', 'normal');
            currentY += 15;

            // === 9. 備考欄 ===
            // 改ページチェック
            const remarksPageBreak = checkPageBreak(doc, currentY, 50, pageNumber);
            currentY = remarksPageBreak.y;
            pageNumber = remarksPageBreak.pageNumber;

            // 備考見出し（高品質日本語画像）
            const remarksImage = createHighQualityJapaneseImage('【備考】', 13, undefined, 'bold');
            doc.addImage(remarksImage.dataUrl, 'PNG', 20, currentY, remarksImage.width, remarksImage.height);
            currentY += remarksImage.height + 8;

            // 備考内容（高品質日本語画像）
            const note1Image = createHighQualityJapaneseImage('・本見積書の有効期限は発行日より30日間です。', 10);
            const note2Image = createHighQualityJapaneseImage('・上記金額に別途消費税が加算されます。', 10);
            const note3Image = createHighQualityJapaneseImage('・お支払い条件：納品後30日以内', 10);
            const note4Image = createHighQualityJapaneseImage('・ご不明な点がございましたら、お気軽にお問い合わせください。', 10);

            doc.addImage(note1Image.dataUrl, 'PNG', 25, currentY, note1Image.width, note1Image.height);
            currentY += note1Image.height + 3;
            doc.addImage(note2Image.dataUrl, 'PNG', 25, currentY, note2Image.width, note2Image.height);
            currentY += note2Image.height + 3;
            doc.addImage(note3Image.dataUrl, 'PNG', 25, currentY, note3Image.width, note3Image.height);
            currentY += note3Image.height + 3;
            doc.addImage(note4Image.dataUrl, 'PNG', 25, currentY, note4Image.width, note4Image.height);

            // === 10. 最終ページのフッター ===
            addPageFooter(doc, pageNumber);

            // === 11. PDFダウンロード ===
            const filename = `見積書_${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}_${new Date().getHours().toString().padStart(2,'0')}${new Date().getMinutes().toString().padStart(2,'0')}${new Date().getSeconds().toString().padStart(2,'0')}.pdf`;

            doc.save(filename);

            // 成功通知
            showNotification('高品質PDF見積書を生成しました', 'success');

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
        const existingLoader = document.getElementById('pdf-loader-hq');

        if (show) {
            if (!existingLoader) {
                const loader = document.createElement('div');
                loader.id = 'pdf-loader-hq';
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
                        <p style="font-size: 14px; margin-top: 10px; opacity: 0.8;">高品質日本語見積書を作成しています</p>
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
        const existingNotification = document.querySelector('.pdf-notification-hq');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'pdf-notification-hq';

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
        if (!document.getElementById('pdf-notification-style-hq')) {
            const style = document.createElement('style');
            style.id = 'pdf-notification-style-hq';
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
    window.generateEstimatePDF = window.generateHighQualityJapanesePDF;
    window.generateJapanesePDF = window.generateHighQualityJapanesePDF;
    window.generateJapaneseFullPDF = window.generateHighQualityJapanesePDF;

})();