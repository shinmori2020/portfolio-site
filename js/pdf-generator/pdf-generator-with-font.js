/**
 * 日本語フォント埋め込み版PDF見積書生成モジュール
 * jsPDF-AutoTableプラグインを使用した実装
 * 注：実際の日本語フォント埋め込みには大きなBase64データが必要
 */

(function() {
    'use strict';

    /**
     * CDNから外部ライブラリを動的に読み込む
     */
    async function loadExternalLibraries() {
        // jsPDF-AutoTableプラグインの読み込み（テーブル作成用）
        if (!window.jspdfAutotable) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js';
            document.head.appendChild(script);

            await new Promise((resolve) => {
                script.onload = resolve;
            });
        }
    }

    /**
     * 日本語対応のための簡易フォント設定
     * 実際の実装では、完全な日本語フォントファイルが必要
     */
    function setupJapaneseFont(doc) {
        // 日本語文字の代替処理
        // 注：これは簡易的な実装で、実際には日本語フォントファイルが必要

        // UTF-8対応を有効化
        doc.setLanguage("ja");

        // デフォルトフォントサイズ
        doc.setFontSize(10);

        return doc;
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
     * 日本語テキストをローマ字に変換（暫定的な対応）
     * 実際の実装では日本語フォントを使用
     */
    function convertToRomaji(text) {
        const romajiMap = {
            'ページ数': 'Page-su',
            'デザイン': 'Design',
            '追加機能': 'Tsuika Kinou',
            'ページ・コンテンツ関連': 'Page/Content',
            'フォーム機能': 'Form Kinou',
            'コンテンツ管理システム': 'CMS',
            '外部サービス連携': 'Gaibu Service',
            'SEO・マーケティング': 'SEO/Marketing',
            'UI/UX・視覚効果': 'UI/UX',
            'WordPress機能・プラグイン': 'WordPress',
            '御見積書': 'MITSUMORI-SHO',
            '見積番号': 'Mitsumori No.',
            '発行日': 'Hakko-bi',
            '様': '-sama',
            '合計金額（税別）': 'Goukei (Zei-betsu)',
            'お見積り内訳': 'Mitsumori Uchiwake',
            '区分': 'Kubun',
            '項目': 'Koumoku',
            '金額': 'Kingaku',
            '小計（税別）': 'Shokei (Zei-betsu)',
            '備考': 'Bikou'
        };

        // マッピングがあれば変換、なければそのまま
        return romajiMap[text] || text;
    }

    /**
     * メインPDF生成関数（フォント版 - 暫定実装）
     */
    window.generatePDFWithFont = async function() {
        try {
            // ローディング表示
            showPDFLoading(true);

            // 外部ライブラリの読み込み
            await loadExternalLibraries();

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

            // 日本語フォント設定
            setupJapaneseFont(doc);

            let currentY = 20;

            // === 1. タイトル ===
            doc.setFontSize(24);
            doc.text(convertToRomaji('御見積書'), 105, currentY, { align: 'center' });
            doc.setFontSize(14);
            doc.text('(ESTIMATE)', 105, currentY + 8, { align: 'center' });
            currentY += 25;

            // === 2. 基本情報 ===
            doc.setFontSize(10);
            doc.text(`${convertToRomaji('見積番号')}: ${estimateData.estimateNumber}`, 20, currentY);
            doc.text(`${convertToRomaji('発行日')}: ${estimateData.date}`, 140, currentY);
            currentY += 15;

            // 区切り線
            doc.setDrawColor(200, 200, 200);
            doc.line(20, currentY, 190, currentY);
            currentY += 10;

            // === 3. 顧客名欄 ===
            doc.setDrawColor(150, 150, 150);
            doc.line(20, currentY + 5, 100, currentY + 5);
            doc.text(convertToRomaji('様'), 102, currentY + 5);
            currentY += 20;

            // === 4. 合計金額 ===
            doc.setFillColor(0, 200, 100);
            doc.rect(120, currentY - 5, 70, 20, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text(convertToRomaji('合計金額（税別）'), 125, currentY);
            doc.setFontSize(16);
            doc.text(estimateData.totalPrice, 125, currentY + 10);
            doc.setTextColor(0, 0, 0);
            currentY += 30;

            // === 5. 内訳テーブル ===
            doc.setFontSize(12);
            doc.text(convertToRomaji('お見積り内訳'), 20, currentY);
            currentY += 10;

            // AutoTableを使用してテーブル作成
            if (doc.autoTable) {
                // テーブルデータの準備
                const tableData = estimateData.items.map(item => [
                    convertToRomaji(item.category || ''),
                    item.name || '',
                    item.price || ''
                ]);

                // テーブル作成
                doc.autoTable({
                    startY: currentY,
                    head: [[
                        convertToRomaji('区分'),
                        convertToRomaji('項目'),
                        convertToRomaji('金額')
                    ]],
                    body: tableData,
                    styles: {
                        font: 'helvetica',
                        fontSize: 9,
                        cellPadding: 3,
                        overflow: 'linebreak',
                        halign: 'left'
                    },
                    headStyles: {
                        fillColor: [240, 240, 240],
                        textColor: [0, 0, 0],
                        fontStyle: 'bold'
                    },
                    alternateRowStyles: {
                        fillColor: [250, 250, 250]
                    },
                    columnStyles: {
                        0: { cellWidth: 40 },
                        1: { cellWidth: 100 },
                        2: { cellWidth: 40, halign: 'right' }
                    },
                    margin: { left: 20, right: 20 },
                    didDrawPage: function (data) {
                        // ページ番号
                        doc.setFontSize(8);
                        doc.text(`Page ${data.pageNumber}`, 190, 290, { align: 'right' });
                    }
                });

                currentY = doc.lastAutoTable.finalY + 10;
            } else {
                // AutoTableが使用できない場合は手動でテーブル描画
                doc.setFontSize(10);

                // ヘッダー
                doc.setFillColor(240, 240, 240);
                doc.rect(20, currentY, 170, 8, 'F');
                doc.text(convertToRomaji('区分'), 25, currentY + 5);
                doc.text(convertToRomaji('項目'), 70, currentY + 5);
                doc.text(convertToRomaji('金額'), 155, currentY + 5);
                currentY += 10;

                // データ行
                estimateData.items.forEach((item, index) => {
                    if (currentY > 260) {
                        doc.addPage();
                        currentY = 20;
                    }

                    if (index % 2 === 1) {
                        doc.setFillColor(250, 250, 250);
                        doc.rect(20, currentY - 4, 170, 8, 'F');
                    }

                    doc.setFontSize(9);
                    doc.text(convertToRomaji(item.category || ''), 25, currentY);
                    doc.text(item.name || '', 70, currentY);
                    doc.text(item.price || '', 155, currentY);
                    currentY += 8;
                });
            }

            // === 6. 小計 ===
            currentY += 5;
            doc.setDrawColor(150, 150, 150);
            doc.line(100, currentY, 190, currentY);
            currentY += 8;
            doc.setFontSize(11);
            doc.text(convertToRomaji('小計（税別）'), 115, currentY);
            doc.setFontSize(12);
            doc.text(estimateData.totalPrice, 155, currentY);
            currentY += 15;

            // === 7. 備考 ===
            if (currentY > 240) {
                doc.addPage();
                currentY = 20;
            }

            doc.setFontSize(11);
            doc.text(convertToRomaji('備考'), 20, currentY);
            currentY += 8;

            doc.setFontSize(9);
            const notes = [
                '* Honnmitsumori-sho no yuukou-kigen wa hakkou-bi yori 30-nichi-kan desu.',
                '* Jouki kingaku ni betto shouhi-zei ga kasan saremasu.',
                '* Oshiharai jouken: Nouhin-go 30-nichi inai'
            ];

            notes.forEach(note => {
                if (currentY > 270) {
                    doc.addPage();
                    currentY = 20;
                }
                doc.text(note, 25, currentY);
                currentY += 5;
            });

            // === 8. フッター ===
            doc.setFontSize(8);
            doc.text('Generated by Web Estimate System', 105, 285, { align: 'center' });

            // === 9. PDFダウンロード ===
            const filename = `Mitsumori_${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}_${new Date().getHours().toString().padStart(2,'0')}${new Date().getMinutes().toString().padStart(2,'0')}${new Date().getSeconds().toString().padStart(2,'0')}.pdf`;

            doc.save(filename);

            // 成功通知
            showNotification('PDF見積書を生成しました（簡易版）', 'success');
            showNotification('完全な日本語フォント対応版は開発中です', 'info');

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
        const existingLoader = document.getElementById('pdf-loader-font');

        if (show) {
            if (!existingLoader) {
                const loader = document.createElement('div');
                loader.id = 'pdf-loader-font';
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
                        <p style="font-size: 14px; margin-top: 10px; opacity: 0.8;">フォント読み込み中</p>
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
        const existingNotification = document.querySelector('.pdf-notification-font');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'pdf-notification-font';

        const bgColor = type === 'success' ? '#00ff88' :
                       type === 'error' ? '#ff4444' :
                       type === 'info' ? '#0088ff' : '#0088ff';

        notification.style.cssText = `
            position: fixed;
            top: ${type === 'info' ? '60%' : '50%'};
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
        if (!document.getElementById('pdf-notification-style-font')) {
            const style = document.createElement('style');
            style.id = 'pdf-notification-style-font';
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
        }, type === 'info' ? 5000 : 3000);
    }

    // グローバルに公開
    window.generateEstimatePDF = window.generatePDFWithFont;

})();