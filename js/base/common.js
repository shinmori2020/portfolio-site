/**
 * common.js - 全ページ共通機能
 * ヘッダー、ハンバーガーメニュー、スムーズスクロールなど
 */

document.addEventListener('DOMContentLoaded', function() {

    // ===== HAMBURGER MENU INITIALIZATION =====
    // Get DOM elements
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.header__menu-link');

    let isMenuOpen = false;

    // ===== GLITCH GRID GENERATION =====
    /**
     * Generate glitch grid blocks for menu background
     */
    function generateGlitchGrid() {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'glitch-grid';

        const rows = 5;
        const cols = 5;
        const totalBlocks = rows * cols;

        for (let i = 0; i < totalBlocks; i++) {
            const block = document.createElement('div');
            block.className = 'glitch-block';
            block.style.gridRow = Math.floor(i / cols) + 1;
            block.style.gridColumn = (i % cols) + 1;

            // Random delay for staggered animation
            const delay = Math.random() * 0.3;
            block.style.animationDelay = `${delay}s`;

            gridContainer.appendChild(block);
        }

        // Insert grid before menu content
        nav.insertBefore(gridContainer, nav.firstChild);
    }

    // Generate grid on page load
    if (nav) {
        generateGlitchGrid();
    }

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
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Menu link click events - close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeMenu();

            // Smooth scroll to target section (同一ページ内のアンカーのみ)
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
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
        if (isMenuOpen && nav && !nav.contains(event.target) && hamburger && !hamburger.contains(event.target)) {
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

    // ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
    // アンカーリンクのスムーズスクロール（ヘッダーメニュー以外も対象）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // ヘッダーメニューのリンクは既に処理済みなのでスキップ
        if (!anchor.classList.contains('header__menu-link')) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }
    });

    // ===== INTERSECTION OBSERVER UTILITY =====
    // 汎用的な要素表示検知機能
    function observeElements(selector, callback, options = {}) {
        const defaultOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerOptions = { ...defaultOptions, ...options };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    // 一度表示されたら監視を停止（オプション）
                    if (options.once) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            observer.observe(element);
        });

        return observer;
    }

    // グローバルに公開（他のスクリプトから使用可能）
    window.observeElements = observeElements;

    console.log('Common JS initialized');
});