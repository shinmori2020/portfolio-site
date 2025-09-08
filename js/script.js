/**
 * MAIN INITIALIZATION - All DOMContentLoaded events consolidated
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HAMBURGER MENU INITIALIZATION =====
    // Get DOM elements
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.header__menu-link');
    
    let isMenuOpen = false;
    
    /**
     * Toggle hamburger menu
     */
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active', isMenuOpen);
        nav.classList.toggle('active', isMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
    
    /**
     * Close hamburger menu
     */
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Hamburger button click event
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Menu link click events - close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
            
            // Smooth scroll to target section
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen && !nav.contains(event.target) && !hamburger.contains(event.target)) {
            closeMenu();
        }
    });
    
    // Close menu on escape key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Handle window resize - close menu if switching to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });
    
    // ===== HERO ANIMATIONS INITIALIZATION =====
    setTimeout(initHeroAnimations, 500);
    
    // ===== FAQ KEYBOARD ACCESSIBILITY =====
    try {
        const faqQuestions = document.querySelectorAll('.faq__question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const faqItem = this.closest('.faq__item');
                    if (faqItem) {
                        toggleFaq(faqItem);
                    }
                }
            });
        });
    } catch (error) {
        console.error('FAQ initialization error:', error);
    }
    
    // ===== OTHER INITIALIZATIONS =====
    // Note: Other initializations remain as separate DOMContentLoaded events
    // for easier maintenance and to avoid conflicts
});

/**
 * ===== TYPING ANIMATION EFFECT =====
 * Creates realistic typing effect for hero section
 */
class TypingAnimation {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.options = {
            typeSpeed: 100,
            startDelay: 1000,
            ...options
        };
        this.currentIndex = 0;
        this.isComplete = false;
    }
    
    async start() {
        if (!this.element) return;
        
        await this.wait(this.options.startDelay);
        await this.typeText();
    }
    
    async typeText() {
        const chars = this.text.split('');
        
        for (let i = 0; i < chars.length; i++) {
            this.element.textContent = this.text.substring(0, i + 1);
            await this.wait(this.options.typeSpeed);
        }
        
        this.isComplete = true;
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * Initialize Hero Section Animations
 */
function initHeroAnimations() {
    const typingElement = document.getElementById('typing-text');
    
    if (typingElement) {
        const typingText = 'Frontend Developer';
        const typing = new TypingAnimation(typingElement, typingText, {
            typeSpeed: 100,
            startDelay: 1500 // Wait a bit after page load
        });
        
        typing.start();
    }
}

// Hero animations initialization moved to main DOMContentLoaded

/**
 * FAQ Toggle Functionality
 */
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

// FAQ keyboard accessibility moved to main DOMContentLoaded

/**
 * Swiper.js実装 - お客様の声セクション
 */
document.addEventListener('DOMContentLoaded', function() {
    // お客様の声データ
    const testimonialsData = [
        {
            name: "田中 健太郎",
            title: "株式会社ABC商事 代表取締役",
            quote: "制作いただいたホームページのおかげで、売上が30%向上しました。デザインが素晴らしく、お客様からも「見やすい」と好評です。レスポンシブ対応も完璧で、スマートフォンからのアクセスも増えています。",
            rating: 5
        },
        {
            name: "佐藤 美香", 
            title: "XYZマーケティング マーケティング部長",
            quote: "LP制作をお願いしましたが、期待以上の仕上がりでした。コンバージョン率が以前の3倍になり、ROIが大幅に改善されました。プロフェッショナルなサポートにも感謝しています。",
            rating: 5
        },
        {
            name: "山田 拓也",
            title: "DEF企画 クリエイティブディレクター", 
            quote: "WordPress制作では、管理画面のカスタマイズが特に素晴らしかったです。非技術者でも簡単に更新できるようになり、運用コストが大幅に削減されました。継続的なサポートも心強いです。",
            rating: 5
        },
        {
            name: "鈴木 雅子",
            title: "GHIデザイン事務所 代表",
            quote: "デザインセンスが抜群で、ブランドイメージを完璧に表現していただきました。お客様からの反応も非常に良く、問い合わせ件数が倍増しています。本当にありがとうございました。",
            rating: 5
        },
        {
            name: "高橋 誠",
            title: "JKL商店 店長",
            quote: "短納期でしたが、品質を落とすことなく対応していただきました。SEO対策もしっかりとしていただき、検索順位が大幅に向上しました。アクセス数が3倍になり、新規顧客の獲得に成功しています。",
            rating: 5
        }
    ];

    // スライドコンテンツを動的に生成
    const carouselTrack = document.getElementById('carouselTrack');
    if (carouselTrack) {
        // オリジナルスライドを生成
        const originalSlides = testimonialsData.map((item, index) => {
            const nameFirst = item.name.split(' ')[0];
            return `
                <div class="swiper-slide">
                    <div class="testimonials__card">
                        <div class="rating">
                            ${'★'.repeat(item.rating).split('').map(star => `<span class="star">${star}</span>`).join('')}
                        </div>
                        <p class="testimonials__quote">${item.quote}</p>
                        <div class="testimonials__customer">
                            <div class="testimonials__avatar">${nameFirst}</div>
                            <div class="testimonials__details">
                                <h4>${item.name} 様</h4>
                                <p>${item.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // ループ機能のためにスライドを複製
        // デスクトップ（5枚表示）で無限ループするには最低10枚必要
        const duplicatedSlides = [...originalSlides, ...originalSlides]; // 10枚に複製
        
        carouselTrack.innerHTML = duplicatedSlides.join('');

        // Swiperの初期化
        const swiper = new Swiper('.testimonials__swiper', {
            // 基本設定
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            
            // レスポンシブ設定
            breakpoints: {
                480: {
                    slidesPerView: 1.5, // 1.5枚表示（次のスライドが少し見える）
                    spaceBetween: 20
                },
                600: {
                    slidesPerView: 2,   // タブレット小: 2枚表示
                    spaceBetween: 25
                },
                768: {
                    slidesPerView: 2.5, // タブレット: 2.5枚表示
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3.5, // デスクトップ小: 3.5枚表示
                    spaceBetween: 30
                },
                1200: {
                    slidesPerView: 4,   // デスクトップ: 4枚表示
                    spaceBetween: 30
                },
                1440: {
                    slidesPerView: 5,   // 大画面: 5枚表示
                    spaceBetween: 30
                }
            },
            
            // 自動再生
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            
            // エフェクト
            speed: 400,
            
            // ナビゲーション
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            
            // ページネーション（複製を考慮して調整）
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
                type: 'bullets'
            },
            
            // ループ設定の追加オプション
            loopedSlides: testimonialsData.length, // オリジナルスライド数を指定
            loopAdditionalSlides: 2, // 追加のクローンスライド数
            
            // タッチ/スワイプ設定
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
            
            // アクセシビリティ
            a11y: {
                prevSlideMessage: '前のお客様の声',
                nextSlideMessage: '次のお客様の声',
                paginationBulletMessage: '{{index}}番目のお客様の声へ移動'
            }
        });

        // Global functions for swiper control (if needed externally)
    }
});

/**
 * タイムライン＋タブ関連のJavaScript
 */
// CTAボタンクリック処理
function handleHeroClick(event, actionType) {
    const button = event.target;
    const originalText = button.textContent;
    const originalBg = button.style.background;
    
    // ボタンアニメーション
    button.style.transform = 'scale(0.95)';
    button.textContent = '処理中...';
    button.style.opacity = '0.8';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.textContent = '完了！';
        if (button.classList.contains('hero__button') && button.style.background.includes('white')) {
            button.style.background = '#e8f5e8';
            button.style.color = '#2d5016';
        } else {
            button.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        }
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.opacity = '1';
            button.style.background = originalBg;
            button.style.color = '';
        }, 2500);
    }, 1200);
    
    console.log(`${actionType}のアクションが実行されました`);
}

// スクロールアニメーション
const heroObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('hero-visible');
        }
    });
}, heroObserverOptions);

// 左右分割レイアウトのアニメーション対象要素を監視
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.hero__animate-on-scroll').forEach(el => {
        heroObserver.observe(el);
    });

    // パララックス効果（軽微）
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.hero__shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ホバー効果の追加
    document.querySelectorAll('.hero__feature-list li').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
            this.style.borderRadius = '12px';
            this.style.padding = '15px 20px 15px 10px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.borderRadius = '';
            this.style.padding = '15px 0';
        });
    });

    // 初期化時のアニメーション
    const heroElements = document.querySelectorAll('.hero__animate-on-scroll');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('hero-visible');
        }, index * 300);
    });

    // キーボードアクセシビリティ
    document.querySelectorAll('.hero__button').forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // タッチデバイス対応
    if ('ontouchstart' in window) {
        document.querySelectorAll('.hero__button, .hero__feature-list li').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }
});

/**
 * タブ切り替え機能
 */
function showServiceTab(tabNumber) {
    // 全てのタブを非表示
    for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById(`service-tab${i}`);
        const button = document.querySelector(`.service-guide__tab-button:nth-child(${i})`);
        if (tab) tab.classList.remove('service-guide__tab-content--active');
        if (button) button.classList.remove('service-guide__tab-button--active');
    }
    
    // 選択されたタブを表示
    const selectedTab = document.getElementById(`service-tab${tabNumber}`);
    const selectedButton = document.querySelector(`.service-guide__tab-button:nth-child(${tabNumber})`);
    if (selectedTab) selectedTab.classList.add('service-guide__tab-content--active');
    if (selectedButton) selectedButton.classList.add('service-guide__tab-button--active');
    
    // タブ切り替え時のアニメーション
    if (selectedTab) {
        selectedTab.style.opacity = '0';
        selectedTab.style.transform = 'translateY(10px)';
        setTimeout(() => {
            selectedTab.style.opacity = '1';
            selectedTab.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Unused timeline functions removed

// タブ機能とUI効果の初期化
document.addEventListener('DOMContentLoaded', function() {
    // キーボードナビゲーション
    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '3') {
            showServiceTab(parseInt(e.key));
        }
    });

    // タブボタンのホバー効果
    document.querySelectorAll('.service-guide__tab-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('service-guide__tab-button--active')) {
                this.style.background = 'rgba(69, 183, 209, 0.1)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('service-guide__tab-button--active')) {
                this.style.background = 'transparent';
            }
        });
    });

    // 自動タブ切り替え機能（オプション）
    let autoServiceTabSwitch = false;
    let serviceTabInterval;

    function toggleAutoServiceTabSwitch() {
        if (autoServiceTabSwitch) {
            clearInterval(serviceTabInterval);
            autoServiceTabSwitch = false;
            console.log('自動タブ切り替えを停止しました');
        } else {
            let currentServiceTab = 1;
            serviceTabInterval = setInterval(() => {
                currentServiceTab = (currentServiceTab % 3) + 1;
                showServiceTab(currentServiceTab);
            }, 4000);
            autoServiceTabSwitch = true;
            console.log('自動タブ切り替えを開始しました（4秒間隔）');
        }
    }

    // ダブルクリックで自動タブ切り替え
    const serviceTabsContainer = document.querySelector('.service-guide__tabs');
    if (serviceTabsContainer) {
        serviceTabsContainer.addEventListener('dblclick', toggleAutoServiceTabSwitch);
    }

    // ページ可視性変更時の処理
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && autoServiceTabSwitch) {
            clearInterval(serviceTabInterval);
        } else if (!document.hidden && autoServiceTabSwitch) {
            toggleAutoServiceTabSwitch();
            toggleAutoServiceTabSwitch(); // 再開
        }
    });
});

/**
 * Contact Form Functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.contact__button');
            const successMessage = document.getElementById('contactSuccessMessage');
            const errorMessage = document.getElementById('contactErrorMessage');
            const originalText = submitBtn.textContent;
            
            // Hide messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Show loading state
            submitBtn.textContent = '送信中...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.transform = 'scale(0.98)';
            
            // Get form data
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();
            
            // Simple validation and simulate sending
            setTimeout(() => {
                if (name && email && subject && message) {
                    // Success state
                    submitBtn.textContent = '送信完了！';
                    submitBtn.style.background = 'linear-gradient(135deg, #495057, #6c757d)';
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Reset form after delay
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.transform = 'scale(1)';
                        submitBtn.style.background = '';
                        successMessage.style.display = 'none';
                    }, 3000);
                    
                } else {
                    // Error state
                    submitBtn.textContent = '送信失敗';
                    submitBtn.style.background = 'linear-gradient(135deg, #6c757d, #495057)';
                    errorMessage.style.display = 'block';
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.transform = 'scale(1)';
                        submitBtn.style.background = '';
                        errorMessage.style.display = 'none';
                    }, 3000);
                }
            }, 1500);
        });

        // Field focus effects
        const contactFields = contactForm.querySelectorAll('.contact__input, .contact__textarea, .contact__select');
        contactFields.forEach(field => {
            field.addEventListener('focus', function() {
                // CSSのfocus-withinで処理されるため、ここでは何もしない
            });
            
            field.addEventListener('blur', function() {
                // CSSのfocus-withinで処理されるため、ここでは何もしない
            });
        });

        // Character counter for message field
        const messageField = document.getElementById('contactMessage');
        if (messageField) {
            const messageGroup = messageField.parentElement;

            function updateCharCount() {
                const currentLength = messageField.value.length;
                const maxLength = 1000;
                
                let charCounter = messageGroup.querySelector('.char-counter');
                if (!charCounter) {
                    charCounter = document.createElement('div');
                    charCounter.className = 'contact__char-counter';
                    messageGroup.appendChild(charCounter);
                }
                
                charCounter.textContent = `${currentLength} / ${maxLength}`;
                
                if (currentLength > maxLength * 0.9) {
                    charCounter.style.color = '#dc3545';
                } else if (currentLength > maxLength * 0.7) {
                    charCounter.style.color = '#ffc107';
                } else {
                    charCounter.style.color = '#6c757d';
                }
            }

            messageField.addEventListener('input', updateCharCount);
            messageField.addEventListener('focus', updateCharCount);
        }

        // Progress bar functionality
        function updateContactProgress() {
            const requiredFields = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
            const filledFields = Array.from(requiredFields).filter(field => field.value.trim() !== '');
            const progress = (filledFields.length / requiredFields.length) * 100;
            
            let progressBar = document.querySelector('.contact__progress-bar');
            if (!progressBar) {
                progressBar = document.createElement('div');
                progressBar.className = 'contact__progress-bar';
                document.body.appendChild(progressBar);
            }
            
            progressBar.style.width = progress + '%';
        }

        // Add progress tracking to all form fields
        contactFields.forEach(field => {
            field.addEventListener('input', updateContactProgress);
            field.addEventListener('change', updateContactProgress);
        });

        // Initialize progress
        updateContactProgress();

        // Prevent Enter key submission except in textarea
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                if (e.target.form === contactForm) {
                    e.preventDefault();
                }
            }
        });

        // Enhanced tab navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusableElements = contactForm.querySelectorAll('input, textarea, select, button');
                const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
                
                if (e.shiftKey) {
                    // Shift+Tab (previous element)
                    if (currentIndex === 0) {
                        e.preventDefault();
                        focusableElements[focusableElements.length - 1].focus();
                    }
                } else {
                    // Tab (next element)
                    if (currentIndex === focusableElements.length - 1) {
                        e.preventDefault();
                        focusableElements[0].focus();
                    }
                }
            }
        });
    }
});

/**
 * Custom Select Dropdown Functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const customSelectButton = document.getElementById('customSelectButton');
    const customSelectDropdown = document.getElementById('customSelectDropdown');
    const customSelectText = customSelectButton.querySelector('.contact__select-text');
    const originalSelect = document.getElementById('contactSubject');
    const customOptions = document.querySelectorAll('.contact__option');
    
    if (customSelectButton && customSelectDropdown) {
        // Toggle dropdown
        customSelectButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = customSelectDropdown.classList.contains('open');
            
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });
        
        // Handle option selection
        customOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                const value = this.getAttribute('data-value');
                const text = this.textContent;
                
                // Update custom select display
                customSelectText.textContent = text;
                customSelectText.classList.add('selected');
                
                // Update original select value
                originalSelect.value = value;
                
                // Trigger change event for form validation
                const changeEvent = new Event('change', { bubbles: true });
                originalSelect.dispatchEvent(changeEvent);
                
                closeDropdown();
            });
            
            // Prevent hover events from bubbling
            option.addEventListener('mouseenter', function(e) {
                e.stopPropagation();
            });
            
            option.addEventListener('mouseleave', function(e) {
                e.stopPropagation();
            });
        });
        
        // Handle dropdown container clicks to prevent event bubbling
        customSelectDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!customSelectButton.contains(event.target) && 
                !customSelectDropdown.contains(event.target)) {
                closeDropdown();
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeDropdown();
            }
        });
        
        function openDropdown() {
            customSelectButton.classList.add('active');
            customSelectDropdown.classList.add('open');
            
            // Add class to disable hover effects on other elements
            const contactFormContainer = document.querySelector('.contact__form-container');
            if (contactFormContainer) {
                contactFormContainer.classList.add('dropdown-open');
            }
        }
        
        function closeDropdown() {
            customSelectButton.classList.remove('active');
            customSelectDropdown.classList.remove('open');
            
            // Remove class to re-enable hover effects
            const contactFormContainer = document.querySelector('.contact__form-container');
            if (contactFormContainer) {
                contactFormContainer.classList.remove('dropdown-open');
            }
        }
        
        // Reset custom select when form is reset
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('reset', function() {
                setTimeout(() => {
                    customSelectText.textContent = 'お問い合わせ内容を選択してください';
                    customSelectText.classList.remove('selected');
                    closeDropdown();
                }, 10);
            });
        }
    }
});

/**
 * GSAP背景四角形アニメーション（スクロール連動 + 自動無限回転）
 */
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
        let animationActive = false;
        let animationFrame;
        let startTime = Date.now();
        
        function animateSquares() {
            if (!animationActive) return;
            
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000; // 秒に変換
            
            // スクロール連動回転の計算
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollProgress = scrollY / docHeight;
            
            // 自動回転（時間ベース）の計算
            const autoRotationLarge = elapsedTime * 18; // 大きい四角：18度/秒（20秒で1回転）
            const autoRotationSmall = elapsedTime * 30; // 小さい四角：30度/秒（12秒で1回転）
            
            // スクロール連動回転の計算
            const scrollRotationLarge = scrollProgress * 360; // 大きい四角：1回転
            const scrollRotationSmall = scrollProgress * 720; // 小さい四角：2回転
            
            // 2つの回転を合成
            const totalRotationLarge = autoRotationLarge + scrollRotationLarge;
            const totalRotationSmall = autoRotationSmall + scrollRotationSmall;
            
            // GSAPでアニメーション適用
            gsap.set("#square-large", {
                rotation: totalRotationLarge
            });
            
            gsap.set("#square-small", {
                rotation: totalRotationSmall
            });
            
            animationFrame = requestAnimationFrame(animateSquares);
        }
        
        function startAnimation() {
            if (!animationActive) {
                animationActive = true;
                startTime = Date.now(); // アニメーション開始時間をリセット
                animateSquares();
            }
        }
        
        function stopAnimation() {
            animationActive = false;
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        }
        
        // Intersection Observer で可視性を監視
        const squareObserver = new IntersectionObserver((entries) => {
            const hasVisibleSquare = entries.some(entry => entry.isIntersecting);
            
            if (hasVisibleSquare) {
                startAnimation();
            } else {
                stopAnimation();
            }
        }, {
            root: null,
            rootMargin: '50px',
            threshold: 0
        });
        
        // 四角形を監視対象に追加
        const squares = document.querySelectorAll('#square-large, #square-small');
        squares.forEach(square => {
            if (square) {
                squareObserver.observe(square);
            }
        });
        
        // ページ可視性変更時の処理
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAnimation();
            } else if (squares.length > 0) {
                startAnimation();
            }
        });
        
        console.log('GSAP背景四角形アニメーション初期化完了（スクロール連動 + 自動無限回転）');
    } else {
        console.warn('GSAP not loaded - background squares animation disabled');
    }
});



