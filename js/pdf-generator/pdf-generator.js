/**
 * PDF見積書生成モジュール
 * html2canvas + jsPDFを使用してWebページの見積り内容をPDF化
 *
 * 必要なライブラリ:
 * - html2canvas: HTMLを画像化
 * - jsPDF: PDF生成
 */

(function() {
    'use strict';

    /**
     * PDF生成のメイン関数
     * グローバルスコープに公開
     */
    window.generateEstimatePDF = async function() {
        try {
            // ローディング表示を開始
            showPDFLoading(true);

            // jsPDFとhtml2canvasが読み込まれているか確認
            if (typeof window.jspdf === 'undefined' || typeof html2canvas === 'undefined') {
                throw new Error('必要なライブラリが読み込まれていません');
            }

            // 見積り内容を取得
            const estimateData = collectEstimateData();

            // PDF用の一時的なコンテナを作成
            const pdfContainer = createPDFContainer(estimateData);
            document.body.appendChild(pdfContainer);

            // html2canvasで画像化
            const canvas = await html2canvas(pdfContainer, {
                scale: 2, // 高解像度化
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // 一時コンテナを削除
            document.body.removeChild(pdfContainer);

            // jsPDFでPDF生成
            const pdf = new window.jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // A4サイズに合わせて画像を配置
            const imgWidth = 210; // A4の幅（mm）
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pageHeight = 297; // A4の高さ（mm）

            // 画像をPDFに追加
            const imgData = canvas.toDataURL('image/png');

            // ページ分割が必要な場合の処理
            if (imgHeight > pageHeight) {
                let heightLeft = imgHeight;
                let position = 0;

                // 最初のページ
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                // 追加ページ
                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
            } else {
                // 1ページに収まる場合
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }

            // ファイル名を生成（見積書_YYYYMMDD_HHMMSS.pdf）
            const fileName = generateFileName();

            // PDFをダウンロード
            pdf.save(fileName);

            // 成功通知
            showNotification('PDF見積書を生成しました', 'success');

        } catch (error) {
            console.error('PDF生成エラー:', error);
            showNotification('PDF生成に失敗しました: ' + error.message, 'error');
        } finally {
            // ローディング表示を終了
            showPDFLoading(false);
        }
    };

    /**
     * 見積りデータを収集
     */
    function collectEstimateData() {
        const data = {
            date: new Date().toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: new Date().toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            estimateNumber: generateEstimateNumber(),
            totalPrice: document.getElementById('totalPrice')?.textContent || '¥0',
            items: []
        };

        // 選択されたページ数
        const selectedPage = document.querySelector('input[name="pages"]:checked');
        if (selectedPage) {
            const pageLabel = selectedPage.nextElementSibling.querySelector('.pricing-calculator__option-title')?.textContent;
            const pagePrice = selectedPage.nextElementSibling.querySelector('.pricing-calculator__option-price')?.textContent;
            data.items.push({
                category: 'ページ数',
                name: pageLabel,
                price: pagePrice
            });
        }

        // 選択されたデザイン
        const selectedDesign = document.querySelector('input[name="design"]:checked');
        if (selectedDesign) {
            const designLabel = selectedDesign.nextElementSibling.querySelector('.pricing-calculator__option-title')?.textContent;
            const designPrice = selectedDesign.nextElementSibling.querySelector('.pricing-calculator__option-price')?.textContent;
            data.items.push({
                category: 'デザイン',
                name: designLabel,
                price: designPrice
            });
        }

        // 選択された機能
        const selectedFeatures = document.querySelectorAll('input[name="features"]:checked');
        selectedFeatures.forEach(feature => {
            const featureLabel = feature.nextElementSibling.querySelector('.pricing-calculator__option-title')?.textContent;
            const featurePrice = feature.nextElementSibling.querySelector('.pricing-calculator__option-price')?.textContent;
            data.items.push({
                category: '追加機能',
                name: featureLabel,
                price: featurePrice
            });
        });

        return data;
    }

    /**
     * PDF用のHTMLコンテナを作成
     */
    function createPDFContainer(data) {
        const container = document.createElement('div');
        container.style.cssText = `
            position: absolute;
            left: -9999px;
            top: 0;
            width: 794px;
            padding: 40px;
            background: white;
            font-family: 'メイリオ', 'Meiryo', sans-serif;
            color: #333;
        `;

        container.innerHTML = `
            <div style="border: 2px solid #333; padding: 30px;">
                <!-- ヘッダー -->
                <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #333;">
                    <h1 style="font-size: 28px; margin: 0 0 10px 0; color: #000;">御見積書</h1>
                    <p style="font-size: 14px; color: #666; margin: 5px 0;">見積番号: ${data.estimateNumber}</p>
                    <p style="font-size: 14px; color: #666; margin: 5px 0;">発行日: ${data.date} ${data.time}</p>
                </div>

                <!-- 宛先 -->
                <div style="margin-bottom: 30px;">
                    <div style="font-size: 18px; margin-bottom: 10px;">
                        <span style="display: inline-block; min-width: 200px; border-bottom: 1px solid #999; margin-right: 10px;">&nbsp;</span> 様
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 10px;">
                        下記の通りお見積り申し上げます。
                    </p>
                </div>

                <!-- 合計金額 -->
                <div style="background: #f8f8f8; padding: 20px; margin-bottom: 30px; border: 1px solid #ddd;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 18px; font-weight: bold;">合計金額（税別）</span>
                        <span style="font-size: 32px; font-weight: bold; color: #00cc66;">${data.totalPrice}</span>
                    </div>
                </div>

                <!-- 明細 -->
                <div style="margin-bottom: 30px;">
                    <h2 style="font-size: 18px; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 2px solid #333;">お見積り内訳</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f0f0f0;">
                                <th style="padding: 10px; text-align: left; border: 1px solid #ddd; width: 20%;">区分</th>
                                <th style="padding: 10px; text-align: left; border: 1px solid #ddd; width: 50%;">項目</th>
                                <th style="padding: 10px; text-align: right; border: 1px solid #ddd; width: 30%;">金額</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.items.map(item => `
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #ddd;">${item.category}</td>
                                    <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
                                    <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${item.price}</td>
                                </tr>
                            `).join('')}
                            <tr style="background: #f8f8f8; font-weight: bold;">
                                <td colspan="2" style="padding: 10px; border: 1px solid #ddd; text-align: right;">小計（税別）</td>
                                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${data.totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 備考 -->
                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 16px; margin-bottom: 10px;">備考</h3>
                    <div style="border: 1px solid #ddd; padding: 15px; min-height: 80px; background: #fafafa;">
                        <p style="margin: 5px 0; font-size: 14px;">・本見積書の有効期限は発行日より30日間です。</p>
                        <p style="margin: 5px 0; font-size: 14px;">・上記金額に別途消費税が加算されます。</p>
                        <p style="margin: 5px 0; font-size: 14px;">・お支払い条件：納品後30日以内</p>
                    </div>
                </div>

                <!-- フッター -->
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                    <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
                </div>
            </div>
        `;

        return container;
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
        return `見積書_${year}${month}${day}_${hour}${minute}${second}.pdf`;
    }

    /**
     * ローディング表示
     */
    function showPDFLoading(show) {
        const existingLoader = document.getElementById('pdf-loader');

        if (show) {
            if (!existingLoader) {
                const loader = document.createElement('div');
                loader.id = 'pdf-loader';
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
        const existingNotification = document.querySelector('.pdf-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'pdf-notification';

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

        // アニメーション用のスタイル追加
        if (!document.getElementById('pdf-notification-style')) {
            const style = document.createElement('style');
            style.id = 'pdf-notification-style';
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

        // 3秒後に自動削除
        setTimeout(() => {
            notification.style.animation = 'notificationSlide 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

})();