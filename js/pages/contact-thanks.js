/**
 * contact-thanks.js - サンクスページ専用JavaScript
 * 送信内容の表示と直接アクセス防止
 */

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {
    // sessionStorageから送信内容を取得
    const submissionDataStr = sessionStorage.getItem('contactFormSubmission');

    // 送信データがない場合は、お問い合わせページにリダイレクト
    // 一時的にコメントアウト - ページ確認用
    /*
    if (!submissionDataStr) {
        window.location.href = 'contact.html';
        return;
    }
    */

    try {
        const submissionData = JSON.parse(submissionDataStr);

        // 必須項目を表示
        document.getElementById('summaryName').textContent = submissionData.name;
        document.getElementById('summaryEmail').textContent = submissionData.email;

        // 任意項目を表示（入力がある場合のみ）
        if (submissionData.company) {
            document.getElementById('summaryCompany').textContent = submissionData.company;
            document.getElementById('summaryCompanyWrapper').style.display = 'block';
        }

        if (submissionData.phone) {
            document.getElementById('summaryPhone').textContent = submissionData.phone;
            document.getElementById('summaryPhoneWrapper').style.display = 'block';
        }

        if (submissionData.schedule) {
            document.getElementById('summarySchedule').textContent = submissionData.schedule;
            document.getElementById('summaryScheduleWrapper').style.display = 'block';
        }

        if (submissionData.subject) {
            document.getElementById('summarySubject').textContent = submissionData.subject;
            document.getElementById('summarySubjectWrapper').style.display = 'block';
        }

        if (submissionData.siteType) {
            document.getElementById('summarySiteType').textContent = submissionData.siteType;
            document.getElementById('summarySiteTypeWrapper').style.display = 'block';
        }

        if (submissionData.budget) {
            document.getElementById('summaryBudget').textContent = submissionData.budget;
            document.getElementById('summaryBudgetWrapper').style.display = 'block';
        }

        if (submissionData.pages) {
            document.getElementById('summaryPages').textContent = submissionData.pages;
            document.getElementById('summaryPagesWrapper').style.display = 'block';
        }

        if (submissionData.message) {
            document.getElementById('summaryMessage').textContent = submissionData.message;
            document.getElementById('summaryMessageWrapper').style.display = 'block';
        }

        // 送信内容エリアを表示
        document.getElementById('submissionSummary').style.display = 'block';

    } catch (error) {
        console.error('送信内容の取得に失敗しました:', error);
        // エラーの場合もお問い合わせページにリダイレクト
        // 一時的にコメントアウト - ページ確認用
        // window.location.href = 'contact.html';
    }
});

// ページを離れる時にsessionStorageをクリア
window.addEventListener('beforeunload', function() {
    sessionStorage.removeItem('contactFormSubmission');
});
