<?php
/**
 * Template Name: GPT-5 Slider Lab 08（Swiper.js）
 * Description: Swiper.jsライブラリを使用したモダンスライダー実装。CDN読み込み・レスポンシブ対応・バニラJS。
 * Template Post Type: page
 */

if (!defined('ABSPATH')) { exit; }
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GPT5 Slider Lab 08 - Swiper.js Implementation</title>
    
    <!-- Swiper.js CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f5f7fa;
            line-height: 1.6;
        }

        .gpt5sw-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 60px 20px;
        }

        .gpt5sw-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .gpt5sw-title {
            font-size: 3rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 15px 0;
            letter-spacing: 0.05em;
        }

        .gpt5sw-subtitle {
            font-size: 1.2rem;
            color: #7f8c8d;
            margin: 0;
            font-weight: 300;
        }

        .gpt5sw-description {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            margin-bottom: 60px;
        }

        .gpt5sw-description h3 {
            color: #34495e;
            font-size: 1.5rem;
            margin: 0 0 20px 0;
        }

        .gpt5sw-description p {
            color: #7f8c8d;
            margin: 0 0 15px 0;
            line-height: 1.7;
        }

        .gpt5sw-description ul {
            color: #7f8c8d;
            padding-left: 20px;
        }

        .gpt5sw-description li {
            margin-bottom: 8px;
        }

        /* スライダーエリア（準備済み） */
        .gpt5sw-slider-section {
            background: white;
            padding: 60px 40px;
            border-radius: 12px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            margin-bottom: 40px;
        }

        .gpt5sw-slider-title {
            text-align: center;
            font-size: 2rem;
            color: #2c3e50;
            margin: 0 0 40px 0;
            font-weight: 600;
        }

        /* レスポンシブ対応 */
        @media (max-width: 768px) {
            .gpt5sw-container {
                padding: 40px 15px;
            }

            .gpt5sw-title {
                font-size: 2.2rem;
            }

            .gpt5sw-subtitle {
                font-size: 1rem;
            }

            .gpt5sw-description {
                padding: 25px;
            }

            .gpt5sw-slider-section {
                padding: 40px 20px;
            }

            .gpt5sw-slider-title {
                font-size: 1.5rem;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-title {
                font-size: 1.8rem;
            }

            .gpt5sw-description {
                padding: 20px;
            }

            .gpt5sw-slider-section {
                padding: 30px 15px;
            }
        }

        /* ===== Swiper Slider 01 Styles ===== */
        .gpt5sw-slider-01 {
            margin-top: 30px;
        }

        .gpt5sw-slider-01 .swiper {
            width: 100%;
            height: 500px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .gpt5sw-slider-01 .swiper-slide {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            text-align: center;
        }

        .gpt5sw-slider-01 .swiper-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .gpt5sw-slider-01 .slide-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
            padding: 60px 30px 30px;
            color: white;
        }

        .gpt5sw-slider-01 .slide-title {
            font-size: 2rem;
            font-weight: 700;
            margin: 0 0 10px 0;
            line-height: 1.3;
        }

        .gpt5sw-slider-01 .slide-description {
            font-size: 1rem;
            margin: 0;
            line-height: 1.6;
            opacity: 0.9;
        }

        /* Custom Navigation Buttons */
        .gpt5sw-slider-01 .gpt5sw-01-next,
        .gpt5sw-slider-01 .gpt5sw-01-prev {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            color: #667eea;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            font-size: 20px;
            font-weight: 700;
        }

        .gpt5sw-slider-01 .gpt5sw-01-next {
            right: 15px;
        }

        .gpt5sw-slider-01 .gpt5sw-01-next::after {
            content: '›';
        }

        .gpt5sw-slider-01 .gpt5sw-01-prev {
            left: 15px;
        }

        .gpt5sw-slider-01 .gpt5sw-01-prev::after {
            content: '‹';
        }

        .gpt5sw-slider-01 .gpt5sw-01-next:hover,
        .gpt5sw-slider-01 .gpt5sw-01-prev:hover {
            background: rgba(255, 255, 255, 1);
            transform: translateY(-50%) scale(1.1);
        }

        /* External Controls Container */
        .gpt5sw-01-external-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            padding: 0;
        }

        /* Custom Pagination */
        .gpt5sw-slider-01 .gpt5sw-01-pagination {
            display: flex;
            gap: 8px;
        }

        .gpt5sw-slider-01 .gpt5sw-01-pagination .gpt5sw-bullet {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #9ca3af;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 600;
            border: 2px solid transparent;
        }

        .gpt5sw-slider-01 .gpt5sw-01-pagination .gpt5sw-bullet:hover {
            background: #6b7280;
            transform: scale(1.1);
        }

        .gpt5sw-slider-01 .gpt5sw-01-pagination .gpt5sw-bullet.active {
            background: #374151;
            border-color: #6b7280;
            transform: scale(1.2);
        }


        /* Custom Controls */
        .gpt5sw-01-controls {
            /* No positioning needed - handled by external-controls flex */
        }

        .gpt5sw-01-info {
            background: #f8f9fa;
            color: #495057;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .gpt5sw-slider-01 .swiper {
                height: 400px;
            }

            .gpt5sw-slider-01 .slide-title {
                font-size: 1.5rem;
            }

            .gpt5sw-slider-01 .slide-content {
                padding: 40px 20px 20px;
            }

            .gpt5sw-slider-01 .gpt5sw-01-next,
            .gpt5sw-slider-01 .gpt5sw-01-prev {
                width: 40px;
                height: 40px;
            }

            .gpt5sw-01-external-controls {
                padding: 0;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-slider-01 .swiper {
                height: 320px;
            }

            .gpt5sw-slider-01 .slide-title {
                font-size: 1.2rem;
            }

            .gpt5sw-slider-01 .slide-description {
                font-size: 0.9rem;
            }

            .gpt5sw-slider-01 .slide-content {
                padding: 30px 15px 15px;
            }
            
            .gpt5sw-01-external-controls {
                padding: 0;
                flex-direction: column;
                gap: 10px;
                align-items: center;
            }
        }

        /* ===== Swiper Slider 02 Styles (Advanced 3D Parallax) ===== */
        .gpt5sw-slider-02 {
            margin-top: 60px;
        }

        .gpt5sw-slider-02 .swiper {
            width: 100%;
            height: 600px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            position: relative;
        }

        .gpt5sw-slider-02 .swiper-slide {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
            overflow: hidden;
        }

        .gpt5sw-slider-02 .swiper-slide::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
            z-index: 2;
        }

        .gpt5sw-slider-02 .swiper-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1.1);
            transition: transform 8s ease-out;
        }

        .gpt5sw-slider-02 .swiper-slide-active img {
            transform: scale(1);
        }

        .gpt5sw-slider-02 .slide-content {
            position: absolute;
            top: 40px;
            left: 40px;
            right: 40px;
            bottom: 40px;
            color: white;
            z-index: 3;
            opacity: 0;
            transform: translateY(-30px);
            transition: all 1s ease-out 0.5s;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 15px;
        }

        .gpt5sw-slider-02 .swiper-slide-active .slide-content {
            opacity: 1;
            transform: translateY(0);
        }

        .gpt5sw-slider-02 .slide-category {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
            font-weight: 500;
            margin-bottom: 8px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .gpt5sw-slider-02 .slide-text {
            flex: 1;
            text-align: left;
        }

        .gpt5sw-slider-02 .slide-title {
            font-size: 3.5rem;
            font-weight: 800;
            margin: 0 0 10px 0;
            line-height: 1.1;
            text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
            background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .gpt5sw-slider-02 .slide-description {
            font-size: 1.3rem;
            margin: 0;
            line-height: 1.5;
            opacity: 0.95;
            text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
        }

        .gpt5sw-slider-02 .slide-button {
            align-self: flex-start;
        }

        .gpt5sw-slider-02 .slide-cta {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 40px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            white-space: nowrap;
        }

        .gpt5sw-slider-02 .slide-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            border-color: rgba(255, 255, 255, 0.4);
        }

        .gpt5sw-slider-02 .slide-cta::after {
            content: '→';
            transition: transform 0.3s ease;
        }

        .gpt5sw-slider-02 .slide-cta:hover::after {
            transform: translateX(5px);
        }

        /* Advanced Custom Navigation */
        .gpt5sw-slider-02 .gpt5sw-02-next,
        .gpt5sw-slider-02 .gpt5sw-02-prev {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all 0.4s ease;
            backdrop-filter: blur(20px);
            font-size: 24px;
            font-weight: 700;
        }

        .gpt5sw-slider-02 .gpt5sw-02-next {
            right: 20px;
        }

        .gpt5sw-slider-02 .gpt5sw-02-next::after {
            content: '→';
        }

        .gpt5sw-slider-02 .gpt5sw-02-prev {
            left: 20px;
        }

        .gpt5sw-slider-02 .gpt5sw-02-prev::after {
            content: '←';
        }

        .gpt5sw-slider-02 .gpt5sw-02-next:hover,
        .gpt5sw-slider-02 .gpt5sw-02-prev:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.6);
            transform: translateY(-50%) scale(1.1);
        }


        /* Advanced Thumbnails */
        .gpt5sw-02-thumbnails {
            display: flex;
            gap: 15px;
            margin-top: 25px;
            justify-content: center;
            padding: 0 20px;
        }

        .gpt5sw-02-thumb {
            width: 80px;
            height: 60px;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            opacity: 0.6;
            transform: scale(0.9);
            transition: all 0.3s ease;
            border: 3px solid transparent;
            position: relative;
        }

        .gpt5sw-02-thumb::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            transition: opacity 0.3s ease;
        }

        .gpt5sw-02-thumb.active {
            opacity: 1;
            transform: scale(1);
            border-color: #667eea;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }

        .gpt5sw-02-thumb.active::after {
            opacity: 0;
        }

        .gpt5sw-02-thumb:hover {
            opacity: 0.8;
            transform: scale(0.95);
        }

        .gpt5sw-02-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Control Panel */
        .gpt5sw-02-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-top: 25px;
            flex-wrap: wrap;
        }

        .gpt5sw-02-play-pause {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .gpt5sw-02-play-pause:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .gpt5sw-02-info {
            background: #f8f9fa;
            color: #495057;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 0.95rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .gpt5sw-02-speed-control {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f8f9fa;
            padding: 8px 16px;
            border-radius: 20px;
        }

        .gpt5sw-02-speed-btn {
            background: none;
            border: 2px solid #dee2e6;
            color: #495057;
            padding: 6px 12px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .gpt5sw-02-speed-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .gpt5sw-02-speed-btn:hover:not(.active) {
            border-color: #667eea;
            color: #667eea;
        }

        /* Responsive Design for Slider 02 */
        @media (max-width: 768px) {
            .gpt5sw-slider-02 .swiper {
                height: 500px;
            }

            .gpt5sw-slider-02 .slide-content {
                gap: 15px;
                text-align: center;
                align-items: center;
            }

            .gpt5sw-slider-02 .slide-text {
                text-align: center;
            }

            .gpt5sw-slider-02 .slide-button {
                align-self: center;
            }

            .gpt5sw-slider-02 .slide-title {
                font-size: 2.5rem;
            }

            .gpt5sw-slider-02 .slide-description {
                font-size: 1.1rem;
            }

            .gpt5sw-slider-02 .slide-cta {
                padding: 15px 30px;
                font-size: 1.1rem;
            }

            .gpt5sw-slider-02 .gpt5sw-02-next,
            .gpt5sw-slider-02 .gpt5sw-02-prev {
                width: 50px;
                height: 50px;
                font-size: 20px;
            }

            .gpt5sw-02-thumbnails {
                gap: 10px;
                padding: 0 15px;
            }

            .gpt5sw-02-thumb {
                width: 60px;
                height: 45px;
            }

            .gpt5sw-02-controls {
                flex-direction: column;
                gap: 15px;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-slider-02 .swiper {
                height: 400px;
                border-radius: 15px;
            }

            .gpt5sw-slider-02 .slide-content {
                gap: 12px;
                top: 20px;
                left: 20px;
                right: 20px;
                bottom: 20px;
            }

            .gpt5sw-slider-02 .slide-title {
                font-size: 2rem;
            }

            .gpt5sw-slider-02 .slide-description {
                font-size: 1rem;
            }

            .gpt5sw-slider-02 .slide-cta {
                padding: 12px 24px;
                font-size: 1rem;
            }

            .gpt5sw-02-thumbnails {
                gap: 8px;
            }

            .gpt5sw-02-thumb {
                width: 50px;
                height: 38px;
            }

            .gpt5sw-02-speed-control {
                flex-direction: column;
                gap: 8px;
            }
        }

        /* ===== Swiper Slider 03 Styles (3D Card Coverflow) ===== */
        .gpt5sw-slider-03 {
            margin-top: 60px;
            padding: 40px 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 20px;
        }

        .gpt5sw-slider-03 .swiper {
            width: 100%;
            height: 500px;
            padding: 50px 0;
        }

        .gpt5sw-slider-03 .swiper-slide {
            width: 350px;
            height: 400px;
            position: relative;
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .gpt5sw-slider-03 .swiper-slide::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%);
            z-index: 1;
        }

        .gpt5sw-slider-03 .swiper-slide:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        }

        .gpt5sw-slider-03 .swiper-slide-active {
            transform: scale(1.05);
            z-index: 2;
        }

        .gpt5sw-slider-03 .slide-image {
            width: 100%;
            height: 60%;
            object-fit: cover;
            border-radius: 20px 20px 0 0;
        }

        .gpt5sw-slider-03 .slide-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            z-index: 2;
            height: 40%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 0 0 20px 20px;
        }

        .gpt5sw-slider-03 .slide-category {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            margin-bottom: 8px;
            align-self: flex-start;
        }

        .gpt5sw-slider-03 .slide-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 8px 0;
            line-height: 1.3;
        }

        .gpt5sw-slider-03 .slide-description {
            font-size: 0.9rem;
            color: #7f8c8d;
            line-height: 1.5;
            margin: 0;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .gpt5sw-slider-03 .slide-price {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.95);
            color: #e74c3c;
            padding: 8px 12px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 1.1rem;
            z-index: 3;
            backdrop-filter: blur(10px);
        }

        /* Custom Navigation for Slider 03 */
        .gpt5sw-slider-03 .gpt5sw-03-next,
        .gpt5sw-slider-03 .gpt5sw-03-prev {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: white;
            border: 2px solid #667eea;
            border-radius: 50%;
            color: #667eea;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all 0.3s ease;
            font-size: 18px;
            font-weight: 700;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }

        .gpt5sw-slider-03 .gpt5sw-03-next {
            right: 20px;
        }

        .gpt5sw-slider-03 .gpt5sw-03-next::after {
            content: '→';
        }

        .gpt5sw-slider-03 .gpt5sw-03-prev {
            left: 20px;
        }

        .gpt5sw-slider-03 .gpt5sw-03-prev::after {
            content: '←';
        }

        .gpt5sw-slider-03 .gpt5sw-03-next:hover,
        .gpt5sw-slider-03 .gpt5sw-03-prev:hover {
            background: #667eea;
            color: white;
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        /* Pagination Dots for Slider 03 */
        .gpt5sw-03-pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 30px;
        }

        .gpt5sw-03-pagination .gpt5sw-03-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .gpt5sw-03-pagination .gpt5sw-03-dot.active {
            background: #667eea;
            transform: scale(1.3);
        }

        .gpt5sw-03-pagination .gpt5sw-03-dot:hover {
            background: #667eea;
            transform: scale(1.1);
        }

        /* Info Panel for Slider 03 */
        .gpt5sw-03-info {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            margin-top: 25px;
            flex-wrap: wrap;
        }

        .gpt5sw-03-counter {
            background: white;
            color: #2c3e50;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .gpt5sw-03-auto-toggle {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .gpt5sw-03-auto-toggle:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        /* Responsive Design for Slider 03 */
        @media (max-width: 768px) {
            .gpt5sw-slider-03 .swiper {
                height: 450px;
                padding: 30px 0;
            }

            .gpt5sw-slider-03 .swiper-slide {
                width: 280px;
                height: 350px;
            }

            .gpt5sw-slider-03 .slide-title {
                font-size: 1.2rem;
            }

            .gpt5sw-slider-03 .slide-description {
                font-size: 0.85rem;
            }

            .gpt5sw-slider-03 .gpt5sw-03-next,
            .gpt5sw-slider-03 .gpt5sw-03-prev {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }

            .gpt5sw-03-info {
                flex-direction: column;
                gap: 15px;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-slider-03 {
                margin-top: 40px;
                padding: 30px 10px;
            }

            .gpt5sw-slider-03 .swiper {
                height: 400px;
                padding: 20px 0;
            }

            .gpt5sw-slider-03 .swiper-slide {
                width: 250px;
                height: 320px;
            }

            .gpt5sw-slider-03 .slide-content {
                padding: 15px;
            }

            .gpt5sw-slider-03 .slide-title {
                font-size: 1.1rem;
            }

            .gpt5sw-slider-03 .slide-price {
                font-size: 1rem;
                padding: 6px 10px;
            }
        }

        /* ===== Swiper Slider 04 Styles (Vertical Timeline) ===== */
        .gpt5sw-slider-04 {
            margin-top: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 60px 40px;
            position: relative;
        }

        .gpt5sw-slider-04::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="25" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.08)"/><circle cx="25" cy="75" r="1" fill="rgba(255,255,255,0.03)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.06)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            border-radius: 20px;
            z-index: 1;
        }

        .gpt5sw-slider-04 .swiper {
            width: 100%;
            height: 700px;
            position: relative;
            z-index: 2;
        }

        .gpt5sw-slider-04 .swiper-slide {
            height: auto;
            padding: 50px 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .gpt5sw-slider-04 .timeline-item {
            display: flex;
            align-items: center;
            width: 100%;
            max-width: 800px;
            position: relative;
        }

        .gpt5sw-slider-04 .timeline-year {
            flex-shrink: 0;
            width: 120px;
            height: 120px;
            background: rgba(255, 255, 255, 0.15);
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            font-weight: 800;
            color: white;
            backdrop-filter: blur(20px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 3;
        }

        .gpt5sw-slider-04 .timeline-content {
            flex: 1;
            margin-left: 40px;
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 20px;
            backdrop-filter: blur(20px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            position: relative;
        }

        .gpt5sw-slider-04 .timeline-content::before {
            content: '';
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            border-right: 15px solid rgba(255, 255, 255, 0.95);
        }

        .gpt5sw-slider-04 .timeline-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 15px 0;
            line-height: 1.3;
        }

        .gpt5sw-slider-04 .timeline-subtitle {
            font-size: 1.1rem;
            font-weight: 500;
            color: #667eea;
            margin: 0 0 20px 0;
        }

        .gpt5sw-slider-04 .timeline-description {
            font-size: 1rem;
            color: #5a6c7d;
            line-height: 1.7;
            margin: 0 0 20px 0;
        }

        .gpt5sw-slider-04 .timeline-highlights {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .gpt5sw-slider-04 .timeline-highlight {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }

        /* Timeline Line */
        .gpt5sw-slider-04::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 80px;
            bottom: 80px;
            width: 3px;
            background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 80%, transparent 100%);
            transform: translateX(-50%);
            z-index: 1;
        }

        /* Navigation for Slider 04 */
        .gpt5sw-slider-04 .gpt5sw-04-next,
        .gpt5sw-slider-04 .gpt5sw-04-prev {
            position: absolute;
            right: -70px;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            color: #667eea;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all 0.3s ease;
            font-size: 18px;
            font-weight: 700;
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .gpt5sw-slider-04 .gpt5sw-04-next {
            top: 50%;
            transform: translateY(5px);
        }

        .gpt5sw-slider-04 .gpt5sw-04-next::after {
            content: '↓';
        }

        .gpt5sw-slider-04 .gpt5sw-04-prev {
            top: 50%;
            transform: translateY(-65px);
        }

        .gpt5sw-slider-04 .gpt5sw-04-prev::after {
            content: '↑';
        }

        .gpt5sw-slider-04 .gpt5sw-04-next:hover,
        .gpt5sw-slider-04 .gpt5sw-04-prev:hover {
            background: rgba(255, 255, 255, 1);
            border-color: rgba(102, 126, 234, 0.5);
            transform: translateY(5px) scale(1.1);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .gpt5sw-slider-04 .gpt5sw-04-prev:hover {
            transform: translateY(-65px) scale(1.1);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        /* Timeline Progress */
        .gpt5sw-04-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            margin-top: 40px;
            flex-wrap: wrap;
        }

        .gpt5sw-04-progress {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            backdrop-filter: blur(20px);
            border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .gpt5sw-04-auto-control {
            background: rgba(255, 255, 255, 0.95);
            color: #667eea;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .gpt5sw-04-auto-control:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
        }

        /* Alternative Layout for Even Slides */
        .gpt5sw-slider-04 .swiper-slide:nth-child(even) .timeline-item {
            flex-direction: row-reverse;
        }

        .gpt5sw-slider-04 .swiper-slide:nth-child(even) .timeline-content {
            margin-left: 0;
            margin-right: 40px;
        }

        .gpt5sw-slider-04 .swiper-slide:nth-child(even) .timeline-content::before {
            left: auto;
            right: -15px;
            border-right: none;
            border-left: 15px solid rgba(255, 255, 255, 0.95);
        }

        /* Responsive Design for Slider 04 */
        @media (max-width: 768px) {
            .gpt5sw-slider-04 {
                padding: 40px 20px;
            }

            .gpt5sw-slider-04 .swiper {
                height: 600px;
            }

            .gpt5sw-slider-04 .timeline-year {
                width: 80px;
                height: 80px;
                font-size: 1.4rem;
            }

            .gpt5sw-slider-04 .timeline-content {
                margin-left: 25px;
                padding: 20px;
            }

            .gpt5sw-slider-04 .timeline-title {
                font-size: 1.5rem;
            }

            .gpt5sw-slider-04 .timeline-subtitle {
                font-size: 1rem;
            }

            .gpt5sw-slider-04 .timeline-description {
                font-size: 0.9rem;
            }

            .gpt5sw-slider-04 .swiper-slide:nth-child(even) .timeline-content {
                margin-right: 25px;
            }

            .gpt5sw-04-controls {
                flex-direction: column;
                gap: 15px;
            }

            .gpt5sw-slider-04 .gpt5sw-04-next,
            .gpt5sw-slider-04 .gpt5sw-04-prev {
                right: 15px;
                width: 45px;
                height: 45px;
                font-size: 16px;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-slider-04 {
                padding: 30px 15px;
            }

            .gpt5sw-slider-04 .swiper {
                height: 500px;
            }

            .gpt5sw-slider-04 .swiper-slide:nth-child(even) .timeline-item,
            .gpt5sw-slider-04 .timeline-item {
                flex-direction: column;
                text-align: center;
            }

            .gpt5sw-slider-04 .timeline-content,
            .gpt5sw-slider-04 .swiper-slide:nth-child(even) .timeline-content {
                margin: 20px 0 0 0;
            }

            .gpt5sw-slider-04 .timeline-content::before,
            .gpt5sw-slider-04 .swiper-slide:nth-child(even) .timeline-content::before {
                display: none;
            }

            .gpt5sw-slider-04 .timeline-year {
                width: 70px;
                height: 70px;
                font-size: 1.2rem;
            }

            .gpt5sw-slider-04 .gpt5sw-04-next,
            .gpt5sw-slider-04 .gpt5sw-04-prev {
                right: 10px;
                width: 40px;
                height: 40px;
                font-size: 14px;
            }
        }

        /* ===== Swiper Slider 05 Styles (Interactive 3D Cube Slider) ===== */
        .gpt5sw-slider-05 {
            margin-top: 60px;
            background: linear-gradient(45deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%);
            border-radius: 25px;
            padding: 60px 40px;
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-slider-05::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
            z-index: 1;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .gpt5sw-slider-05 .swiper {
            width: 100%;
            height: 500px;
            position: relative;
            z-index: 2;
            overflow: visible;
        }

        .gpt5sw-slider-05 .swiper-slide {
            text-align: center;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            transition: all 0.6s ease;
            width: 350px;
        }

        .gpt5sw-slider-05 .cube-card {
            width: 300px;
            height: 400px;
            position: relative;
            transform-style: preserve-3d;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            cursor: pointer;
        }

        .gpt5sw-slider-05 .cube-card:hover {
            transform: rotateY(180deg) scale(1.05);
        }

        .gpt5sw-slider-05 .cube-face {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 30px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
            backface-visibility: hidden;
        }

        .gpt5sw-slider-05 .cube-front {
            background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
            color: #2c3e50;
        }

        .gpt5sw-slider-05 .cube-back {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transform: rotateY(180deg);
        }

        .gpt5sw-slider-05 .cube-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
            margin-bottom: 20px;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .gpt5sw-slider-05 .cube-back .cube-icon {
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
            color: white;
        }

        .gpt5sw-slider-05 .cube-title {
            font-size: 1.8rem;
            font-weight: 700;
            margin: 0 0 15px 0;
            line-height: 1.3;
        }

        .gpt5sw-slider-05 .cube-description {
            font-size: 1rem;
            line-height: 1.6;
            margin: 0 0 25px 0;
            opacity: 0.9;
        }

        .gpt5sw-slider-05 .cube-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            width: 100%;
        }

        .gpt5sw-slider-05 .cube-stat {
            text-align: center;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }

        .gpt5sw-slider-05 .stat-number {
            font-size: 1.5rem;
            font-weight: 700;
            display: block;
        }

        .gpt5sw-slider-05 .stat-label {
            font-size: 0.85rem;
            opacity: 0.8;
            margin-top: 5px;
        }

        /* Floating particles effect */
        .gpt5sw-slider-05 .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .gpt5sw-slider-05 .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }

        .gpt5sw-slider-05 .particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
        .gpt5sw-slider-05 .particle:nth-child(2) { left: 20%; top: 80%; animation-delay: 1s; }
        .gpt5sw-slider-05 .particle:nth-child(3) { left: 60%; top: 40%; animation-delay: 2s; }
        .gpt5sw-slider-05 .particle:nth-child(4) { left: 80%; top: 70%; animation-delay: 3s; }
        .gpt5sw-slider-05 .particle:nth-child(5) { left: 70%; top: 10%; animation-delay: 4s; }
        .gpt5sw-slider-05 .particle:nth-child(6) { left: 30%; top: 60%; animation-delay: 5s; }

        @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
            50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }

        /* Navigation for Slider 05 */
        .gpt5sw-slider-05 .gpt5sw-05-next,
        .gpt5sw-slider-05 .gpt5sw-05-prev {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.95);
            border: none;
            border-radius: 50%;
            color: #667eea;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all 0.4s ease;
            font-size: 20px;
            font-weight: 700;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .gpt5sw-slider-05 .gpt5sw-05-prev {
            left: 20px;
        }

        .gpt5sw-slider-05 .gpt5sw-05-next {
            right: 20px;
        }

        .gpt5sw-slider-05 .gpt5sw-05-prev::after {
            content: '←';
        }

        .gpt5sw-slider-05 .gpt5sw-05-next::after {
            content: '→';
        }

        .gpt5sw-slider-05 .gpt5sw-05-next:hover,
        .gpt5sw-slider-05 .gpt5sw-05-prev:hover {
            background: #667eea;
            color: white;
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
        }

        /* Pagination */
        .gpt5sw-slider-05 .swiper-pagination {
            bottom: -50px;
        }

        .gpt5sw-slider-05 .swiper-pagination-bullet {
            width: 16px;
            height: 16px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
            margin: 0 10px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .gpt5sw-slider-05 .swiper-pagination-bullet:hover {
            background: rgba(255, 255, 255, 0.8);
            transform: scale(1.1);
        }

        .gpt5sw-slider-05 .swiper-pagination-bullet-active {
            background: white;
            transform: scale(1.4);
        }

        /* Controls */
        .gpt5sw-05-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
            padding: 20px 0;
            color: white;
        }

        .gpt5sw-05-counter {
            font-size: 1.2rem;
            font-weight: 600;
        }

        .gpt5sw-05-autoplay {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .gpt5sw-05-autoplay:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
        }

        /* Responsive Design for Slider 05 */
        @media (max-width: 768px) {
            .gpt5sw-slider-05 {
                padding: 40px 20px;
            }

            .gpt5sw-slider-05 .swiper {
                height: 450px;
            }

            .gpt5sw-slider-05 .cube-card {
                width: 280px;
                height: 370px;
            }

            .gpt5sw-slider-05 .cube-title {
                font-size: 1.5rem;
            }

            .gpt5sw-slider-05 .cube-description {
                font-size: 0.9rem;
            }

            .gpt5sw-slider-05 .gpt5sw-05-next,
            .gpt5sw-slider-05 .gpt5sw-05-prev {
                width: 50px;
                height: 50px;
                font-size: 18px;
            }

            .gpt5sw-slider-05 .gpt5sw-05-prev {
                left: 15px;
            }

            .gpt5sw-slider-05 .gpt5sw-05-next {
                right: 15px;
            }

            .gpt5sw-05-info {
                flex-direction: column;
                gap: 15px;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-slider-05 {
                padding: 30px 15px;
            }

            .gpt5sw-slider-05 .swiper {
                height: 400px;
            }

            .gpt5sw-slider-05 .cube-card {
                width: 260px;
                height: 340px;
            }

            .gpt5sw-slider-05 .cube-face {
                padding: 25px;
            }

            .gpt5sw-slider-05 .cube-icon {
                width: 70px;
                height: 70px;
                font-size: 1.8rem;
            }

            .gpt5sw-slider-05 .cube-title {
                font-size: 1.3rem;
            }

            .gpt5sw-slider-05 .cube-description {
                font-size: 0.85rem;
            }

            .gpt5sw-slider-05 .gpt5sw-05-next,
            .gpt5sw-slider-05 .gpt5sw-05-prev {
                width: 45px;
                height: 45px;
                font-size: 16px;
            }

            .gpt5sw-slider-05 .gpt5sw-05-prev {
                left: 10px;
            }

            .gpt5sw-slider-05 .gpt5sw-05-next {
                right: 10px;
            }
        }

        /* ===== Swiper Slider 06 Styles (Premium Product Slider) ===== */
        .gpt5sw-sl06-container {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 20px;
            padding: 60px 40px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl06-main {
            margin-bottom: 40px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .gpt5sw-sl06-slide-content {
            display: flex;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            min-height: 400px;
        }

        .gpt5sw-sl06-product-image {
            flex: 1;
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl06-product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .gpt5sw-sl06-slide-content:hover .gpt5sw-sl06-product-image img {
            transform: scale(1.05);
        }

        .gpt5sw-sl06-badge {
            position: absolute;
            top: 20px;
            left: 20px;
            background: #e74c3c;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .gpt5sw-sl06-badge.premium {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .gpt5sw-sl06-badge.sale {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .gpt5sw-sl06-product-info {
            flex: 1;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .gpt5sw-sl06-category {
            color: #667eea;
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .gpt5sw-sl06-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 15px 0;
            line-height: 1.3;
        }

        .gpt5sw-sl06-description {
            font-size: 1rem;
            color: #5a6c7d;
            line-height: 1.6;
            margin: 0 0 25px 0;
        }

        .gpt5sw-sl06-specs {
            margin-bottom: 30px;
        }

        .gpt5sw-sl06-spec {
            display: block;
            color: #7f8c8d;
            font-size: 0.9rem;
            margin-bottom: 8px;
            padding-left: 5px;
        }

        .gpt5sw-sl06-price-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        .gpt5sw-sl06-price {
            font-size: 2.2rem;
            font-weight: 700;
            color: #e74c3c;
        }

        .gpt5sw-sl06-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        .gpt5sw-sl06-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        /* Navigation */
        .gpt5sw-sl06-navigation {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            pointer-events: none;
            z-index: 10;
        }

        .gpt5sw-sl06-prev,
        .gpt5sw-sl06-next {
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            color: #667eea;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 700;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            pointer-events: auto;
        }

        .gpt5sw-sl06-prev::after {
            content: '‹';
        }

        .gpt5sw-sl06-next::after {
            content: '›';
        }

        .gpt5sw-sl06-prev:hover,
        .gpt5sw-sl06-next:hover {
            background: #667eea;
            color: white;
            border-color: #667eea;
            transform: scale(1.1);
        }

        /* Pagination */
        .gpt5sw-sl06-pagination {
            text-align: center;
            margin-top: 20px;
        }

        .gpt5sw-sl06-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgba(102, 126, 234, 0.3);
            opacity: 1;
            margin: 0 6px;
            transition: all 0.3s ease;
        }

        .gpt5sw-sl06-pagination .swiper-pagination-bullet-active {
            background: #667eea;
            transform: scale(1.3);
        }

        /* Thumbnails */
        .gpt5sw-sl06-thumbs {
            margin-top: 30px;
        }

        .gpt5sw-sl06-thumbs-swiper {
            padding: 0;
        }

        .gpt5sw-sl06-thumb {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            opacity: 0.6;
            transition: all 0.3s ease;
            border: 3px solid transparent;
            text-align: center;
            padding: 15px;
        }

        .gpt5sw-sl06-thumb:hover,
        .gpt5sw-sl06-thumb.swiper-slide-thumb-active {
            opacity: 1;
            border-color: #667eea;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
        }

        .gpt5sw-sl06-thumb img {
            width: 80px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 10px;
        }

        .gpt5sw-sl06-thumb span {
            display: block;
            font-size: 0.8rem;
            font-weight: 600;
            color: #2c3e50;
        }

        /* Controls */
        .gpt5sw-sl06-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            padding: 20px 0;
        }

        .gpt5sw-sl06-counter {
            background: white;
            color: #2c3e50;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .gpt5sw-sl06-autoplay {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .gpt5sw-sl06-autoplay:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .gpt5sw-sl06-container {
                padding: 40px 20px;
            }

            .gpt5sw-sl06-slide-content {
                flex-direction: column;
                min-height: auto;
            }

            .gpt5sw-sl06-product-image {
                height: 250px;
            }

            .gpt5sw-sl06-product-info {
                padding: 30px;
            }

            .gpt5sw-sl06-title {
                font-size: 1.5rem;
            }

            .gpt5sw-sl06-price {
                font-size: 1.8rem;
            }

            .gpt5sw-sl06-price-row {
                flex-direction: column;
                gap: 15px;
                align-items: stretch;
            }

            .gpt5sw-sl06-controls {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }

            .gpt5sw-sl06-thumbs-swiper {
                padding: 0;
            }

            .gpt5sw-sl06-thumb img {
                width: 60px;
                height: 45px;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-sl06-container {
                padding: 30px 15px;
            }

            .gpt5sw-sl06-product-info {
                padding: 20px;
            }

            .gpt5sw-sl06-title {
                font-size: 1.3rem;
            }

            .gpt5sw-sl06-description {
                font-size: 0.9rem;
            }

            .gpt5sw-sl06-price {
                font-size: 1.6rem;
            }

            .gpt5sw-sl06-prev,
            .gpt5sw-sl06-next {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }

            .gpt5sw-sl06-navigation {
                padding: 0 10px;
            }
        }

        /* ===== Swiper Slider 07 Styles (Minimal Card Slider) ===== */
        .gpt5sw-sl07-container {
            background: #ffffff;
            border-radius: 20px;
            padding: 60px 40px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl07-main {
            margin-bottom: 40px;
            border-radius: 16px;
            overflow: hidden;
        }

        .gpt5sw-sl07-card {
            display: flex;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
            border: 1px solid rgba(0, 0, 0, 0.04);
            transition: all 0.3s ease;
            min-height: 300px;
        }

        .gpt5sw-sl07-card:hover {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            border-color: rgba(0, 0, 0, 0.08);
            transform: translateY(-2px);
        }

        .gpt5sw-sl07-image {
            flex: 0 0 40%;
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl07-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .gpt5sw-sl07-card:hover .gpt5sw-sl07-image img {
            transform: scale(1.05);
        }

        .gpt5sw-sl07-info {
            flex: 1;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
        }

        .gpt5sw-sl07-category {
            display: inline-block;
            background: #f8f9fa;
            color: #6c757d;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
            align-self: flex-start;
            border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .gpt5sw-sl07-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #212529;
            margin: 0 0 16px 0;
            line-height: 1.3;
        }

        .gpt5sw-sl07-description {
            font-size: 1rem;
            color: #6c757d;
            line-height: 1.6;
            margin: 0 0 24px 0;
        }

        .gpt5sw-sl07-btn {
            background: #212529;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            align-self: flex-start;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .gpt5sw-sl07-btn:hover {
            background: #495057;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(33, 37, 41, 0.2);
        }

        /* Navigation */
        .gpt5sw-sl07-navigation {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            pointer-events: none;
            z-index: 10;
        }

        .gpt5sw-sl07-nav-prev,
        .gpt5sw-sl07-nav-next {
            width: 48px;
            height: 48px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            color: #212529;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            pointer-events: auto;
        }

        .gpt5sw-sl07-nav-prev::after {
            content: '‹';
        }

        .gpt5sw-sl07-nav-next::after {
            content: '›';
        }

        .gpt5sw-sl07-nav-prev:hover,
        .gpt5sw-sl07-nav-next:hover {
            background: #212529;
            color: white;
            border-color: #212529;
            transform: scale(1.05);
            box-shadow: 0 4px 16px rgba(33, 37, 41, 0.2);
        }

        /* Pagination */
        .gpt5sw-sl07-pagination {
            text-align: center;
            margin-top: 20px;
        }

        .gpt5sw-sl07-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: rgba(33, 37, 41, 0.2);
            opacity: 1;
            margin: 0 5px;
            transition: all 0.3s ease;
        }

        .gpt5sw-sl07-pagination .swiper-pagination-bullet-active {
            background: #212529;
            transform: scale(1.2);
        }

        /* Thumbnails */
        .gpt5sw-sl07-thumbs {
            margin-top: 30px;
        }

        .gpt5sw-sl07-thumbs-swiper {
            padding: 0;
        }

        .gpt5sw-sl07-thumb {
            background: #f8f9fa;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            opacity: 0.6;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            text-align: center;
            padding: 12px;
        }

        .gpt5sw-sl07-thumb:hover,
        .gpt5sw-sl07-thumb.swiper-slide-thumb-active {
            opacity: 1;
            border-color: #212529;
            background: #ffffff;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .gpt5sw-sl07-thumb img {
            width: 80px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 8px;
        }

        .gpt5sw-sl07-thumb span {
            display: block;
            font-size: 0.8rem;
            font-weight: 600;
            color: #495057;
        }

        /* Controls */
        .gpt5sw-sl07-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            padding: 20px 0;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .gpt5sw-sl07-counter {
            background: #f8f9fa;
            color: #495057;
            padding: 10px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
            border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .gpt5sw-sl07-autoplay {
            background: #212529;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .gpt5sw-sl07-autoplay:hover {
            background: #495057;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(33, 37, 41, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .gpt5sw-sl07-container {
                padding: 40px 20px;
            }

            .gpt5sw-sl07-card {
                flex-direction: column;
                min-height: auto;
            }

            .gpt5sw-sl07-image {
                flex: none;
                height: 200px;
            }

            .gpt5sw-sl07-info {
                padding: 30px;
            }

            .gpt5sw-sl07-title {
                font-size: 1.5rem;
            }

            .gpt5sw-sl07-description {
                font-size: 0.9rem;
            }

            .gpt5sw-sl07-controls {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }

            .gpt5sw-sl07-thumbs-swiper {
                padding: 0;
            }

            .gpt5sw-sl07-thumb img {
                width: 60px;
                height: 45px;
            }

            .gpt5sw-sl07-nav-prev,
            .gpt5sw-sl07-nav-next {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-sl07-container {
                padding: 30px 15px;
            }

            .gpt5sw-sl07-info {
                padding: 20px;
            }

            .gpt5sw-sl07-title {
                font-size: 1.3rem;
            }

            .gpt5sw-sl07-description {
                font-size: 0.85rem;
            }

            .gpt5sw-sl07-navigation {
                padding: 0 10px;
            }

            .gpt5sw-sl07-nav-prev,
            .gpt5sw-sl07-nav-next {
                width: 36px;
                height: 36px;
                font-size: 14px;
            }

            .gpt5sw-sl07-thumb {
                padding: 8px;
            }

            .gpt5sw-sl07-thumb img {
                width: 50px;
                height: 38px;
            }
        }

        /* ===== Swiper Slider 08 Styles (Mobile Native Card Slider) ===== */
        .gpt5sw-sl08-container {
            background: #ffffff;
            border-radius: 20px;
            padding: 40px 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
            border: 1px solid rgba(0, 0, 0, 0.04);
            position: relative;
            overflow: hidden;
            max-width: 500px;
            margin: 0 auto;
        }

        .gpt5sw-sl08-main {
            margin-bottom: 30px;
            border-radius: 16px;
            overflow: visible;
        }

        .gpt5sw-sl08-card {
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
            border: 1px solid rgba(0, 0, 0, 0.04);
            transition: all 0.3s ease-out;
            display: flex;
            flex-direction: column;
            height: 480px;
        }

        .gpt5sw-sl08-card:hover {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            border-color: rgba(0, 123, 255, 0.2);
            transform: translateY(-2px);
        }

        .gpt5sw-sl08-image {
            position: relative;
            height: 250px;
            overflow: hidden;
        }

        .gpt5sw-sl08-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease-out;
        }

        .gpt5sw-sl08-card:hover .gpt5sw-sl08-image img {
            transform: scale(1.05);
        }

        .gpt5sw-sl08-badge {
            position: absolute;
            top: 16px;
            right: 16px;
            background: #007AFF;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
        }

        .gpt5sw-sl08-badge.new {
            background: #34C759;
            box-shadow: 0 2px 8px rgba(52, 199, 89, 0.3);
        }

        .gpt5sw-sl08-badge.trending {
            background: #FF9500;
            box-shadow: 0 2px 8px rgba(255, 149, 0, 0.3);
        }

        .gpt5sw-sl08-badge.featured {
            background: #FF3B30;
            box-shadow: 0 2px 8px rgba(255, 59, 48, 0.3);
        }

        .gpt5sw-sl08-content {
            flex: 1;
            padding: 24px;
            display: flex;
            flex-direction: column;
        }

        .gpt5sw-sl08-category {
            display: inline-block;
            background: rgba(0, 122, 255, 0.1);
            color: #007AFF;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
            align-self: flex-start;
        }

        .gpt5sw-sl08-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #1D1D1F;
            margin: 0 0 12px 0;
            line-height: 1.3;
        }

        .gpt5sw-sl08-description {
            font-size: 0.9rem;
            color: #6E6E73;
            line-height: 1.5;
            margin: 0 0 16px 0;
            flex: 1;
        }

        .gpt5sw-sl08-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 12px 0;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .gpt5sw-sl08-price {
            font-size: 1rem;
            font-weight: 700;
            color: #007AFF;
        }

        .gpt5sw-sl08-rating {
            font-size: 0.9rem;
            color: #FF9500;
        }

        .gpt5sw-sl08-btn {
            background: #007AFF;
            color: white;
            border: none;
            padding: 14px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease-out;
            text-transform: none;
            letter-spacing: 0;
            box-shadow: 0 2px 8px rgba(0, 122, 255, 0.2);
        }

        .gpt5sw-sl08-btn:hover {
            background: #0056CC;
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
        }

        .gpt5sw-sl08-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(0, 122, 255, 0.2);
        }

        /* Pagination */
        .gpt5sw-sl08-pagination {
            text-align: center;
            margin-top: 20px;
            position: relative;
        }

        .gpt5sw-sl08-pagination .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: rgba(0, 0, 0, 0.2);
            opacity: 1;
            margin: 0 4px;
            transition: all 0.3s ease-out;
            border-radius: 50%;
        }

        .gpt5sw-sl08-pagination .swiper-pagination-bullet-active {
            background: #007AFF;
            transform: scale(1.3);
            box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
        }

        /* Controls */
        .gpt5sw-sl08-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 24px;
            padding: 16px 0;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .gpt5sw-sl08-counter {
            background: rgba(0, 0, 0, 0.06);
            color: #6E6E73;
            padding: 8px 16px;
            border-radius: 16px;
            font-weight: 600;
            font-size: 0.85rem;
        }

        .gpt5sw-sl08-autoplay {
            background: #007AFF;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 16px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.85rem;
            transition: all 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 8px rgba(0, 122, 255, 0.2);
        }

        .gpt5sw-sl08-autoplay:hover {
            background: #0056CC;
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .gpt5sw-sl08-container {
                padding: 30px 20px;
                max-width: 100%;
                margin: 0;
            }

            .gpt5sw-sl08-card {
                height: 420px;
            }

            .gpt5sw-sl08-image {
                height: 200px;
            }

            .gpt5sw-sl08-content {
                padding: 20px;
            }

            .gpt5sw-sl08-title {
                font-size: 1.3rem;
            }

            .gpt5sw-sl08-description {
                font-size: 0.85rem;
            }

            .gpt5sw-sl08-controls {
                flex-direction: column;
                gap: 12px;
                text-align: center;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-sl08-container {
                padding: 20px 15px;
            }

            .gpt5sw-sl08-card {
                height: 380px;
            }

            .gpt5sw-sl08-image {
                height: 180px;
            }

            .gpt5sw-sl08-content {
                padding: 16px;
            }

            .gpt5sw-sl08-title {
                font-size: 1.2rem;
            }

            .gpt5sw-sl08-description {
                font-size: 0.8rem;
                line-height: 1.4;
            }

            .gpt5sw-sl08-btn {
                padding: 12px 20px;
                font-size: 0.85rem;
            }
        }

        @media (min-width: 769px) {
            .gpt5sw-sl08-container {
                max-width: 450px;
            }

            .gpt5sw-sl08-card {
                height: 500px;
            }

            .gpt5sw-sl08-image {
                height: 260px;
            }
        }

        /* ===== Swiper Slider 09 Styles (Liquid Flow Slider) ===== */
        .gpt5sw-sl09-container {
            background: linear-gradient(135deg, #667eea 0%, #5a6fd8 100%);
            border-radius: 30px;
            padding: 60px 40px 60px 40px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
        }

        /* Liquid Background Effects */
        .gpt5sw-sl09-liquid-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        }

        /* Ripple Effects */
        .gpt5sw-sl09-ripple {
            position: absolute;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: gpt5sw-sl09-ripple-animation 4s infinite ease-out;
        }

        .gpt5sw-sl09-ripple-1 {
            top: 20%;
            left: 10%;
            width: 150px;
            height: 150px;
            animation-delay: 0s;
        }

        .gpt5sw-sl09-ripple-2 {
            top: 60%;
            right: 15%;
            width: 200px;
            height: 200px;
            animation-delay: 1.5s;
        }

        .gpt5sw-sl09-ripple-3 {
            bottom: 20%;
            left: 20%;
            width: 120px;
            height: 120px;
            animation-delay: 3s;
        }

        @keyframes gpt5sw-sl09-ripple-animation {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                opacity: 0.6;
            }
            100% {
                transform: scale(1.5);
                opacity: 0;
            }
        }

        /* Droplet Effects */
        .gpt5sw-sl09-droplet {
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            animation: gpt5sw-sl09-droplet-animation 3s infinite ease-in-out;
        }

        .gpt5sw-sl09-droplet-1 {
            top: -20px;
            left: 30%;
            animation-delay: 0s;
        }

        .gpt5sw-sl09-droplet-2 {
            top: -20px;
            right: 25%;
            animation-delay: 1s;
        }

        .gpt5sw-sl09-droplet-3 {
            top: -20px;
            left: 60%;
            animation-delay: 2s;
        }

        @keyframes gpt5sw-sl09-droplet-animation {
            0% {
                transform: rotate(-45deg) translateY(-20px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: rotate(-45deg) translateY(calc(100vh + 50px));
                opacity: 0;
            }
        }

        /* Main Swiper */
        .gpt5sw-sl09-main {
            position: relative;
            z-index: 10;
            margin-bottom: 40px;
        }

        .gpt5sw-sl09-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 25px;
            overflow: hidden;
            position: relative;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }

        .gpt5sw-sl09-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }

        /* Liquid Border Effect */
        .gpt5sw-sl09-liquid-border {
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #667eea, #5a6fd8, #4e63d2, #667eea);
            background-size: 400% 400%;
            border-radius: 25px;
            z-index: -1;
            animation: gpt5sw-sl09-liquid-border-animation 4s ease infinite;
        }

        @keyframes gpt5sw-sl09-liquid-border-animation {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        .gpt5sw-sl09-image {
            position: relative;
            height: 300px;
            overflow: hidden;
        }

        .gpt5sw-sl09-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }

        .gpt5sw-sl09-card:hover .gpt5sw-sl09-image img {
            transform: scale(1.1);
        }

        /* Wave Overlay Effect */
        .gpt5sw-sl09-wave-overlay {
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 60px;
            background: linear-gradient(to top, rgba(255,255,255,0.9), transparent);
            clip-path: polygon(0 20px, 100% 0, 100% 100%, 0 100%);
            animation: gpt5sw-sl09-wave-animation 3s ease-in-out infinite;
        }

        @keyframes gpt5sw-sl09-wave-animation {
            0%, 100% {
                clip-path: polygon(0 20px, 100% 0, 100% 100%, 0 100%);
            }
            50% {
                clip-path: polygon(0 0, 100% 20px, 100% 100%, 0 100%);
            }
        }

        .gpt5sw-sl09-content {
            padding: 30px;
            position: relative;
        }

        .gpt5sw-sl09-category {
            display: inline-block;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 15px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .gpt5sw-sl09-title {
            font-size: 1.6rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 15px 0;
            line-height: 1.3;
        }

        .gpt5sw-sl09-description {
            font-size: 0.95rem;
            color: #5a6c7d;
            line-height: 1.6;
            margin: 0 0 20px 0;
        }

        .gpt5sw-sl09-meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
            padding: 15px 0;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .gpt5sw-sl09-impact,
        .gpt5sw-sl09-participants {
            font-size: 0.85rem;
            font-weight: 600;
            color: #667eea;
        }

        /* Liquid Button */
        .gpt5sw-sl09-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .gpt5sw-sl09-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .gpt5sw-sl09-btn-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .gpt5sw-sl09-btn:active .gpt5sw-sl09-btn-ripple {
            width: 300px;
            height: 300px;
        }

        /* Navigation */
        .gpt5sw-sl09-navigation {
            position: absolute;
            top: 50%;
            width: calc(100% + 140px);
            left: -70px;
            display: flex;
            justify-content: space-between;
            padding: 0;
            pointer-events: none;
            z-index: 20;
        }

        .gpt5sw-sl09-nav-prev,
        .gpt5sw-sl09-nav-next {
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            color: #667eea;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(10px);
            pointer-events: auto;
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl09-nav-prev::after {
            content: '‹';
        }

        .gpt5sw-sl09-nav-next::after {
            content: '›';
        }

        .gpt5sw-sl09-nav-prev:hover,
        .gpt5sw-sl09-nav-next:hover {
            background: #667eea;
            color: white;
            transform: scale(1.1);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .gpt5sw-sl09-nav-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .gpt5sw-sl09-nav-prev:active .gpt5sw-sl09-nav-ripple,
        .gpt5sw-sl09-nav-next:active .gpt5sw-sl09-nav-ripple {
            width: 120px;
            height: 120px;
        }

        /* Pagination */
        .gpt5sw-sl09-pagination {
            text-align: center;
            margin-top: 30px;
            position: relative;
            z-index: 10;
        }

        .gpt5sw-sl09-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
            margin: 0 6px;
            transition: all 0.4s ease;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl09-pagination .swiper-pagination-bullet-active {
            background: white;
            transform: scale(1.3);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        }

        .gpt5sw-sl09-pagination .swiper-pagination-bullet::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s;
        }

        .gpt5sw-sl09-pagination .swiper-pagination-bullet-active::before {
            width: 100%;
            height: 100%;
        }

        /* Controls */
        .gpt5sw-sl09-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            position: relative;
            z-index: 10;
        }

        .gpt5sw-sl09-counter {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .gpt5sw-sl09-autoplay {
            background: rgba(255, 255, 255, 0.9);
            color: #667eea;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl09-autoplay:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .gpt5sw-sl09-container {
                padding: 40px 20px;
            }

            .gpt5sw-sl09-navigation {
                width: calc(100% + 100px);
                left: -50px;
            }

            .gpt5sw-sl09-image {
                height: 220px;
            }

            .gpt5sw-sl09-content {
                padding: 25px;
            }

            .gpt5sw-sl09-title {
                font-size: 1.4rem;
            }

            .gpt5sw-sl09-description {
                font-size: 0.9rem;
            }

            .gpt5sw-sl09-meta {
                flex-direction: column;
                gap: 8px;
            }

            .gpt5sw-sl09-controls {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }

            .gpt5sw-sl09-nav-prev,
            .gpt5sw-sl09-nav-next {
                width: 50px;
                height: 50px;
                font-size: 18px;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-sl09-container {
                padding: 30px 15px;
            }

            .gpt5sw-sl09-navigation {
                width: calc(100% + 80px);
                left: -40px;
            }

            .gpt5sw-sl09-image {
                height: 200px;
            }

            .gpt5sw-sl09-content {
                padding: 20px;
            }

            .gpt5sw-sl09-title {
                font-size: 1.3rem;
            }

            .gpt5sw-sl09-description {
                font-size: 0.85rem;
                line-height: 1.5;
            }

            .gpt5sw-sl09-btn {
                padding: 12px 24px;
                font-size: 0.9rem;
            }

            .gpt5sw-sl09-nav-prev,
            .gpt5sw-sl09-nav-next {
                width: 45px;
                height: 45px;
                font-size: 16px;
            }
        }

        /* ===== Swiper Slider 10 Styles (Split Dual Slider) ===== */
        .gpt5sw-sl10-container {
            background: #ffffff;
            border-radius: 20px;
            padding: 40px 40px 100px 40px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl10-split-layout {
            display: flex;
            height: 600px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
            position: relative;
        }

        /* Left Side: Image Area */
        .gpt5sw-sl10-left {
            flex: 1;
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl10-image-swiper {
            height: 100%;
        }

        .gpt5sw-sl10-image {
            height: 100%;
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-sl10-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .gpt5sw-sl10-image:hover img {
            transform: scale(1.05);
        }

        /* Split Line */
        .gpt5sw-sl10-split-line {
            width: 2px;
            background: linear-gradient(to bottom, transparent 0%, #e0e0e0 20%, #e0e0e0 80%, transparent 100%);
            position: relative;
            flex-shrink: 0;
            transition: width 0.3s ease;
        }

        .gpt5sw-sl10-split-line:hover {
            width: 4px;
            background: linear-gradient(to bottom, transparent 0%, #2c3e50 20%, #2c3e50 80%, transparent 100%);
        }

        .gpt5sw-sl10-split-animation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            background: linear-gradient(to bottom, #2c3e50, transparent);
            border-radius: 0 0 50% 50%;
            animation: gpt5sw-sl10-flow-animation 3s ease-in-out infinite;
        }

        @keyframes gpt5sw-sl10-flow-animation {
            0% {
                transform: translateY(-40px);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(600px);
                opacity: 0;
            }
        }

        /* Right Side: Content Area */
        .gpt5sw-sl10-right {
            flex: 1;
            position: relative;
            overflow: hidden;
            background: #fafafa;
        }

        .gpt5sw-sl10-content-swiper {
            height: 100%;
        }

        .gpt5sw-sl10-content {
            height: 100%;
            padding: 60px 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .gpt5sw-sl10-category {
            display: inline-block;
            background: #2c3e50;
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
            align-self: flex-start;
        }

        .gpt5sw-sl10-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 20px 0;
            line-height: 1.3;
        }

        .gpt5sw-sl10-description {
            font-size: 1rem;
            color: #5a6c7d;
            line-height: 1.7;
            margin: 0 0 30px 0;
            flex: 1;
        }

        .gpt5sw-sl10-meta {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .gpt5sw-sl10-tag {
            background: rgba(44, 62, 80, 0.1);
            color: #2c3e50;
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .gpt5sw-sl10-btn {
            background: #2c3e50;
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.3s ease;
            align-self: flex-start;
        }

        .gpt5sw-sl10-btn:hover {
            background: #34495e;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
        }

        /* Main Navigation */
        .gpt5sw-sl10-main-nav {
            position: absolute;
            top: 50%;
            width: calc(100% + 160px);
            left: -80px;
            display: flex;
            justify-content: space-between;
            pointer-events: none;
            z-index: 25;
            transform: translateY(-50%);
        }

        .gpt5sw-sl10-main-prev,
        .gpt5sw-sl10-main-next {
            width: 60px;
            height: 60px;
            background: rgba(44, 62, 80, 0.9);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            pointer-events: auto;
        }

        .gpt5sw-sl10-main-prev::after {
            content: '‹';
        }

        .gpt5sw-sl10-main-next::after {
            content: '›';
        }

        .gpt5sw-sl10-main-prev:hover,
        .gpt5sw-sl10-main-next:hover {
            background: #2c3e50;
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(44, 62, 80, 0.4);
        }

        /* Main Pagination */
        .gpt5sw-sl10-main-pagination {
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 15;
            text-align: center;
            width: 100%;
        }

        .gpt5sw-sl10-main-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgba(44, 62, 80, 0.3);
            opacity: 1;
            margin: 0 6px;
            transition: all 0.3s ease;
            border-radius: 50%;
        }

        .gpt5sw-sl10-main-pagination .swiper-pagination-bullet-active {
            background: #2c3e50;
            transform: scale(1.3);
            box-shadow: 0 2px 8px rgba(44, 62, 80, 0.3);
        }

        /* Override Swiper default pagination styles for perfect centering */
        .gpt5sw-sl10-container .swiper-pagination-horizontal,
        .gpt5sw-sl10-container .swiper-pagination-bullets.swiper-pagination-horizontal {
            /* bottom: -50px !important; */
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: auto !important;
            text-align: center !important;
        }

        /* Controls */
        .gpt5sw-sl10-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            padding: 20px 0;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .gpt5sw-sl10-counters {
            display: flex;
            gap: 30px;
        }

        .gpt5sw-sl10-left-counter,
        .gpt5sw-sl10-right-counter {
            background: rgba(44, 62, 80, 0.05);
            color: #2c3e50;
            padding: 8px 16px;
            border-radius: 16px;
            font-weight: 600;
            font-size: 0.85rem;
        }

        .gpt5sw-sl10-sync-controls {
            display: flex;
            gap: 15px;
        }

        .gpt5sw-sl10-sync-btn {
            background: #34495e;
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 16px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.85rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .gpt5sw-sl10-sync-btn:hover {
            background: #2c3e50;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
        }

        .gpt5sw-sl10-sync-btn.active {
            background: #27ae60;
        }

        .gpt5sw-sl10-autoplay {
            background: #2c3e50;
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 16px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.85rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .gpt5sw-sl10-autoplay:hover {
            background: #34495e;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .gpt5sw-sl10-container {
                padding: 30px 20px 80px 20px;
            }

            .gpt5sw-sl10-split-layout {
                flex-direction: column;
                height: auto;
            }

            .gpt5sw-sl10-left {
                height: 300px;
            }

            .gpt5sw-sl10-split-line {
                width: 100%;
                height: 2px;
                background: linear-gradient(to right, transparent 0%, #e0e0e0 20%, #e0e0e0 80%, transparent 100%);
            }

            .gpt5sw-sl10-split-line:hover {
                height: 4px;
            }

            .gpt5sw-sl10-split-animation {
                width: 40px;
                height: 100%;
                left: 0;
                top: 0;
                background: linear-gradient(to right, #2c3e50, transparent);
                border-radius: 0 50% 50% 0;
                animation: gpt5sw-sl10-flow-horizontal 3s ease-in-out infinite;
            }

            @keyframes gpt5sw-sl10-flow-horizontal {
                0% {
                    transform: translateX(-40px);
                    opacity: 0;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    transform: translateX(calc(100vw + 40px));
                    opacity: 0;
                }
            }

            .gpt5sw-sl10-right {
                height: 400px;
            }

            .gpt5sw-sl10-content {
                padding: 40px 30px;
            }

            .gpt5sw-sl10-title {
                font-size: 1.6rem;
            }

            .gpt5sw-sl10-description {
                font-size: 0.9rem;
            }

            .gpt5sw-sl10-controls {
                flex-direction: column;
                gap: 20px;
                text-align: center;
            }

            .gpt5sw-sl10-counters {
                justify-content: center;
            }

            .gpt5sw-sl10-main-nav {
                width: calc(100% + 120px);
                left: -60px;
            }

            .gpt5sw-sl10-main-prev,
            .gpt5sw-sl10-main-next {
                width: 50px;
                height: 50px;
                font-size: 18px;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-sl10-container {
                padding: 20px 15px 70px 15px;
            }

            .gpt5sw-sl10-left {
                height: 250px;
            }

            .gpt5sw-sl10-right {
                height: 350px;
            }

            .gpt5sw-sl10-content {
                padding: 30px 20px;
            }

            .gpt5sw-sl10-title {
                font-size: 1.4rem;
            }

            .gpt5sw-sl10-description {
                font-size: 0.85rem;
                line-height: 1.6;
            }

            .gpt5sw-sl10-counters {
                flex-direction: column;
                gap: 10px;
            }

            .gpt5sw-sl10-sync-controls {
                flex-direction: column;
                gap: 10px;
            }

            .gpt5sw-sl10-main-nav {
                width: calc(100% + 100px);
                left: -50px;
            }

            .gpt5sw-sl10-main-prev,
            .gpt5sw-sl10-main-next {
                width: 45px;
                height: 45px;
                font-size: 16px;
            }
        }

        /* ==================================================
           Slider 06: Modern Card Grid Slider Styles
           ================================================== */

        .gpt5sw-slider-06 {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 60px 40px;
            border-radius: 20px;
            overflow: hidden;
            min-height: 600px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .gpt5sw-slider-06.initialized {
            opacity: 1;
        }

        .gpt5sw-06-split-container {
            display: flex;
            gap: 30px;
            height: 500px;
            max-width: 900px;
            margin: 0 auto;
        }

        /* Left Panel */
        .gpt5sw-06-left-panel {
            flex: 1.2;
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
            min-height: 400px;
        }

        .gpt5sw-06-main-image-swiper {
            height: 100%;
            min-height: 400px;
        }

        .gpt5sw-06-main-image-swiper .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-06-main-image-swiper .swiper-slide::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="80" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="60" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }

        .gpt5sw-06-slide-visual {
            text-align: center;
            color: white;
            z-index: 2;
            position: relative;
        }

        .slide-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: iconPulse 3s ease-in-out infinite;
        }

        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        .gpt5sw-06-slide-visual h3 {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 10px 0;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .gpt5sw-06-slide-visual p {
            font-size: 1.1rem;
            opacity: 0.9;
            text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
            margin: 0;
        }

        /* Vertical Progress */
        .gpt5sw-06-vertical-progress {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }

        .gpt5sw-06-progress-track {
            width: 4px;
            height: 200px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            position: relative;
        }

        .gpt5sw-06-progress-fill {
            width: 100%;
            height: 16.67%; /* 初期値: 1/6 = 16.67% */
            background: linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%);
            border-radius: 2px;
            transition: height 0.3s ease;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .progress-labels {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            color: white;
            font-weight: 600;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .current-slide {
            font-size: 1.5rem;
        }

        .total-slides {
            font-size: 1rem;
            opacity: 0.7;
        }

        /* Right Panel */
        .gpt5sw-06-right-panel {
            flex: 1.3;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        /* Tab Navigation */
        .gpt5sw-06-tab-navigation {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }

        .gpt5sw-06-tab-item {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 12px;
            padding: 12px 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            position: relative;
            overflow: hidden;
        }

        .gpt5sw-06-tab-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s ease;
        }

        .gpt5sw-06-tab-item:hover::before {
            left: 100%;
        }

        .gpt5sw-06-tab-item:hover {
            background: rgba(255, 255, 255, 0.8);
            border-color: rgba(255, 255, 255, 0.6);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .gpt5sw-06-tab-item.active {
            background: rgba(255, 255, 255, 0.9);
            border-color: rgba(102, 126, 234, 0.4);
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
            transform: scale(1.02);
        }

        .tab-number {
            font-size: 0.9rem;
            font-weight: 700;
            color: #667eea;
            background: rgba(102, 126, 234, 0.1);
            padding: 4px 8px;
            border-radius: 6px;
            min-width: 28px;
            text-align: center;
        }

        .tab-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: #2c3e50;
        }

        /* Content Swiper */
        .gpt5sw-06-content-swiper {
            flex: 1;
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
            height: 320px;
            min-height: 300px;
            overflow: hidden;
        }

        .gpt5sw-06-content-swiper .swiper-slide {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
        }

        .gpt5sw-06-content-card {
            text-align: center;
        }

        .gpt5sw-06-content-card .gpt5sw-06-card-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            color: #667eea;
            text-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        }

        .gpt5sw-06-content-card .gpt5sw-06-card-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 15px 0;
        }

        .gpt5sw-06-content-card .gpt5sw-06-card-description {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #5a6c7d;
            margin: 0 0 25px 0;
        }

        .gpt5sw-06-content-card .gpt5sw-06-card-features {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
        }

        .gpt5sw-06-feature-item {
            text-align: center;
            flex: 1;
        }

        .feature-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: #667eea;
            display: block;
            margin-bottom: 5px;
        }

        .feature-label {
            font-size: 0.9rem;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        /* Controls */
        .gpt5sw-06-slider-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
        }

        .gpt5sw-06-control-btn {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 12px;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #2c3e50;
        }

        .gpt5sw-06-control-btn:hover {
            background: rgba(255, 255, 255, 0.9);
            border-color: rgba(255, 255, 255, 0.6);
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .autoplay-control {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 12px;
            padding: 12px 16px;
            transition: all 0.3s ease;
        }

        .autoplay-control:hover {
            background: rgba(255, 255, 255, 0.8);
            border-color: rgba(255, 255, 255, 0.6);
        }

        .gpt5sw-06-autoplay-btn {
            background: transparent;
            border: none;
            width: 24px;
            height: 24px;
            margin: 0;
            padding: 0;
        }

        .autoplay-text {
            font-size: 0.9rem;
            font-weight: 600;
            color: #2c3e50;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .gpt5sw-slider-06 {
                padding: 40px 20px;
            }

            .gpt5sw-06-split-container {
                flex-direction: column;
                height: auto;
                gap: 25px;
                max-width: 100%;
            }

            .gpt5sw-06-left-panel {
                height: 300px;
            }

            .slide-icon {
                font-size: 3rem;
            }

            .gpt5sw-06-slide-visual h3 {
                font-size: 2rem;
            }

            .gpt5sw-06-slide-visual p {
                font-size: 1rem;
            }

            .gpt5sw-06-progress-track {
                height: 120px;
            }

            .gpt5sw-06-tab-navigation {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            .gpt5sw-06-tab-item {
                padding: 10px 12px;
            }

            .tab-number {
                font-size: 0.8rem;
                padding: 3px 6px;
                min-width: 24px;
            }

            .tab-label {
                font-size: 0.8rem;
            }

            .gpt5sw-06-content-swiper {
                padding: 20px;
                height: 280px;
            }

            .gpt5sw-06-content-card .gpt5sw-06-card-icon {
                font-size: 2.5rem;
            }

            .gpt5sw-06-content-card .gpt5sw-06-card-title {
                font-size: 1.5rem;
            }

            .gpt5sw-06-content-card .gpt5sw-06-card-description {
                font-size: 1rem;
            }

            .gpt5sw-06-content-card .gpt5sw-06-card-features {
                flex-direction: column;
                gap: 15px;
            }

            .gpt5sw-06-slider-controls {
                flex-direction: column;
                gap: 15px;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-slider-06 {
                padding: 30px 15px;
            }

            .gpt5sw-06-left-panel {
                height: 250px;
            }

            .slide-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
            }

            .gpt5sw-06-slide-visual h3 {
                font-size: 1.5rem;
            }

            .gpt5sw-06-slide-visual p {
                font-size: 0.9rem;
            }

            .gpt5sw-06-tab-navigation {
                grid-template-columns: 1fr;
                gap: 8px;
            }

            .gpt5sw-06-content-swiper {
                padding: 15px;
                height: 250px;
            }

            .gpt5sw-06-content-card .gpt5sw-06-card-icon {
                font-size: 2rem;
            }

            .gpt5sw-06-content-card .gpt5sw-06-card-title {
                font-size: 1.3rem;
            }

            .gpt5sw-06-content-card .gpt5sw-06-card-description {
                font-size: 0.9rem;
            }
        }

        /* ===== Swiper Slider 11 Styles (円形オーバーラップスライダー) ===== */
        .gpt5sw-sl11-container {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 30px;
            padding: 80px 40px 120px 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
            position: relative;
            overflow: hidden;
            min-height: 500px;
        }

        .gpt5sw-sl11-swiper {
            position: relative;
            height: 350px;
            overflow: visible;
        }

        .gpt5sw-sl11-slide {
            width: 300px !important;
            height: 350px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .gpt5sw-sl11-circle {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
            border: 3px solid rgba(102, 126, 234, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 40px;
            position: relative;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            overflow: hidden;
        }

        .gpt5sw-sl11-circle:hover {
            transform: scale(1.05);
            box-shadow: 0 25px 60px rgba(102, 126, 234, 0.2);
            border-color: #667eea;
        }

        .gpt5sw-sl11-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
            transition: transform 0.3s ease;
        }

        .gpt5sw-sl11-circle:hover .gpt5sw-sl11-icon {
            transform: scale(1.1) rotate(5deg);
        }

        .gpt5sw-sl11-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1a202c;
            margin: 0 0 15px 0;
            line-height: 1.2;
        }

        .gpt5sw-sl11-description {
            font-size: 1rem;
            color: #4a5568;
            line-height: 1.4;
            margin: 0;
        }

        .gpt5sw-sl11-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease;
        }

        .gpt5sw-sl11-circle:hover .gpt5sw-sl11-overlay {
            opacity: 1;
            transform: scale(1);
        }

        .gpt5sw-sl11-btn {
            background: rgba(255, 255, 255, 0.9);
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            color: #667eea;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            transform: translateY(10px);
        }

        .gpt5sw-sl11-circle:hover .gpt5sw-sl11-btn {
            transform: translateY(0);
            background: white;
        }

        .gpt5sw-sl11-navigation {
            position: absolute;
            top: 50%;
            width: calc(100% + 140px);
            left: -70px;
            display: flex;
            justify-content: space-between;
            pointer-events: none;
            z-index: 10;
        }

        .gpt5sw-sl11-prev,
        .gpt5sw-sl11-next {
            display: none;
        }

        .gpt5sw-sl11-pagination {
            position: absolute;
            bottom: -60px;
            left: 50%;
            /* transform: translateX(-50%); */
            z-index: 15;
            text-align: center;
            width: 100%;
        }

        .gpt5sw-sl11-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            margin: 0 6px;
            transition: all 0.3s ease;
        }

        .gpt5sw-sl11-pagination .swiper-pagination-bullet-active {
            background: #667eea;
            transform: scale(1.3);
        }

        .gpt5sw-sl11-progress-ring {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 80px;
            height: 80px;
        }

        .gpt5sw-sl11-progress-svg {
            transform: rotate(-90deg);
        }

        .gpt5sw-sl11-progress-track {
            opacity: 0.3;
        }

        .gpt5sw-sl11-progress-bar {
            stroke-dasharray: 226;
            stroke-dashoffset: 226;
            transition: stroke-dashoffset 0.3s ease;
        }

        .gpt5sw-sl11-progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.9rem;
            font-weight: 600;
            color: #667eea;
            text-align: center;
        }

        /* レスポンシブ対応 */
        @media (max-width: 768px) {
            .gpt5sw-sl11-container {
                padding: 60px 20px;
            }
            
            .gpt5sw-sl11-circle {
                width: 250px;
                height: 250px;
                padding: 30px;
            }
            
            .gpt5sw-sl11-slide {
                width: 250px !important;
                height: 300px;
            }
            
            .gpt5sw-sl11-swiper {
                height: 300px;
            }
            
            .gpt5sw-sl11-icon {
                font-size: 3rem;
            }
            
            .gpt5sw-sl11-title {
                font-size: 1.3rem;
            }
        }

        @media (max-width: 480px) {
            .gpt5sw-sl11-container {
                padding: 40px 15px;
            }
            
            .gpt5sw-sl11-circle {
                width: 200px;
                height: 200px;
                padding: 20px;
            }
            
            .gpt5sw-sl11-slide {
                width: 200px !important;
                height: 250px;
            }
            
            .gpt5sw-sl11-swiper {
                height: 250px;
            }
            
            .gpt5sw-sl11-navigation {
                display: none;
            }
        }

    </style>
</head>

<body>
    <div class="gpt5sw-container">
        <header class="gpt5sw-header">
            <h1 class="gpt5sw-title">GPT5 Slider Lab 08</h1>
            <p class="gpt5sw-subtitle">Swiper.js Implementation</p>
        </header>

        <section class="gpt5sw-description">
            <h3>Swiper.jsについて</h3>
            <p>
                Swiper.jsは最もモダンなモバイル向けタッチスライダーライブラリです。
                ハードウェアアクセラレーションによる滑らかなアニメーションと、
                優れたタッチジェスチャーサポートが特徴です。
            </p>
            
            <h3>主な特徴</h3>
            <ul>
                <li><strong>軽量・高速</strong> - jQueryなど他ライブラリ不要</li>
                <li><strong>タッチ対応</strong> - モバイル・タブレット完全対応</li>
                <li><strong>豊富な機能</strong> - 自動再生、無限ループ、パララックス等</li>
                <li><strong>カスタマイズ性</strong> - 柔軟な設定とスタイリング</li>
                <li><strong>フレームワーク対応</strong> - React、Vue、Angularなど</li>
            </ul>

            <p>
                このページでは、Swiper.jsを使用した様々なスライダーパターンを実装・検証します。
            </p>
        </section>

        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">Basic Feature-Rich Slider</h2>
            
            <!-- Swiper Slider 01 -->
            <div class="gpt5sw-slider-01">
                <div class="swiper">
                    <div class="swiper-wrapper">
                        <!-- Slides will be dynamically generated by JavaScript -->
                    </div>
                    
                    <!-- Navigation arrows -->
                    <div class="gpt5sw-01-next"></div>
                    <div class="gpt5sw-01-prev"></div>
                    
                </div>
                
                <!-- Controls outside slider -->
                <div class="gpt5sw-01-external-controls">
                    <!-- Pagination -->
                    <div class="gpt5sw-01-pagination"></div>
                    
                    <!-- Custom controls -->
                    <div class="gpt5sw-01-controls">
                        <div class="gpt5sw-01-info">
                            <span id="gpt5sw-01-current">1</span> / <span id="gpt5sw-01-total">6</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">Advanced Parallax 3D Slider</h2>
            
            <!-- Swiper Slider 02 -->
            <div class="gpt5sw-slider-02">
                <div class="swiper">
                    <div class="swiper-wrapper">
                        <!-- Slides will be dynamically generated by JavaScript -->
                    </div>
                    
                    <!-- Navigation arrows -->
                    <div class="gpt5sw-02-next"></div>
                    <div class="gpt5sw-02-prev"></div>
                </div>
                
                
                <!-- Thumbnails -->
                <div class="gpt5sw-02-thumbnails"></div>
                
                <!-- Control Panel -->
                <div class="gpt5sw-02-controls">
                    <button class="gpt5sw-02-play-pause" id="gpt5sw-02-play-pause">
                        <span id="gpt5sw-02-play-icon">⏸</span>
                        <span>一時停止</span>
                    </button>
                    
                    <div class="gpt5sw-02-info">
                        <span>スライド:</span>
                        <span id="gpt5sw-02-current">1</span> / <span id="gpt5sw-02-total">5</span>
                    </div>
                    
                    <div class="gpt5sw-02-speed-control">
                        <span style="font-size: 0.9rem; color: #6c757d;">速度:</span>
                        <button class="gpt5sw-02-speed-btn" data-speed="2000">遅い</button>
                        <button class="gpt5sw-02-speed-btn active" data-speed="4000">標準</button>
                        <button class="gpt5sw-02-speed-btn" data-speed="1000">高速</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">3D Card Coverflow Slider</h2>
            
            <!-- Swiper Slider 03 -->
            <div class="gpt5sw-slider-03">
                <div class="swiper">
                    <div class="swiper-wrapper">
                        <!-- Slides will be dynamically generated by JavaScript -->
                    </div>
                    
                    <!-- Navigation arrows -->
                    <div class="gpt5sw-03-next"></div>
                    <div class="gpt5sw-03-prev"></div>
                </div>
                
                <!-- Pagination Dots -->
                <div class="gpt5sw-03-pagination"></div>
                
                <!-- Info Panel -->
                <div class="gpt5sw-03-info">
                    <div class="gpt5sw-03-counter">
                        <span id="gpt5sw-03-current">1</span> / <span id="gpt5sw-03-total">6</span>
                    </div>
                    
                    <button class="gpt5sw-03-auto-toggle" id="gpt5sw-03-auto-toggle">
                        <span id="gpt5sw-03-auto-icon">⏸</span>
                        <span id="gpt5sw-03-auto-text">自動再生停止</span>
                    </button>
                </div>
            </div>
        </section>

        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">Vertical Timeline Slider</h2>
            
            <!-- Swiper Slider 04 -->
            <div class="gpt5sw-slider-04">
                <div class="swiper">
                    <div class="swiper-wrapper">
                        <!-- Slides will be dynamically generated by JavaScript -->
                    </div>
                    
                    <!-- Navigation arrows -->
                    <div class="gpt5sw-04-prev"></div>
                    <div class="gpt5sw-04-next"></div>
                </div>
                
                <!-- Control Panel -->
                <div class="gpt5sw-04-controls">
                    <div class="gpt5sw-04-progress">
                        <span id="gpt5sw-04-current">2020</span> / <span id="gpt5sw-04-total">2024</span>
                    </div>
                    
                    <button class="gpt5sw-04-auto-control" id="gpt5sw-04-auto-control">
                        <span id="gpt5sw-04-auto-icon">⏸</span>
                        <span id="gpt5sw-04-auto-text">自動進行停止</span>
                    </button>
                </div>
            </div>
        </section>
            
        <!-- Swiper Slider 05 -->
        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">05. インタラクティブ3Dキューブスライダー</h2>
                <div class="gpt5sw-slider-05">
                    <!-- Floating particles -->
                    <div class="particles">
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                        <div class="particle"></div>
                    </div>
                    
                    <div class="swiper">
                        <div class="swiper-wrapper">
                            <!-- Slides will be dynamically generated by JavaScript -->
                        </div>
                        
                        <!-- Navigation arrows -->
                        <div class="gpt5sw-05-prev"></div>
                        <div class="gpt5sw-05-next"></div>
                        
                        <!-- Pagination -->
                        <div class="swiper-pagination"></div>
                    </div>
                    
                    <!-- Control Panel -->
                    <div class="gpt5sw-05-info">
                        <div class="gpt5sw-05-counter">
                            <span id="gpt5sw-05-current">1</span> / <span id="gpt5sw-05-total">6</span>
                        </div>
                        
                        <button class="gpt5sw-05-autoplay" id="gpt5sw-05-autoplay">
                            <span id="gpt5sw-05-auto-icon">⏸</span>
                            <span id="gpt5sw-05-auto-text">自動進行停止</span>
                        </button>
                    </div>
                </div>
            </section>
        </section>

        <!-- Swiper Slider 06 -->
        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">06. プレミアムプロダクトスライダー</h2>
            
            <!-- Swiper Slider 06: Premium Product Showcase -->
            <div class="gpt5sw-sl06-container">
                <!-- Main Swiper -->
                <div class="swiper gpt5sw-sl06-main">
                    <div class="swiper-wrapper">
                        
                        <!-- Slide 1: Wireless Headphones -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl06-slide-content">
                                <div class="gpt5sw-sl06-product-image">
                                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop" alt="Wireless Headphones">
                                    <div class="gpt5sw-sl06-badge">New</div>
                                </div>
                                <div class="gpt5sw-sl06-product-info">
                                    <div class="gpt5sw-sl06-category">Electronics</div>
                                    <h3 class="gpt5sw-sl06-title">Premium Wireless Headphones</h3>
                                    <p class="gpt5sw-sl06-description">高品質なワイヤレスヘッドフォン。ノイズキャンセリング機能搭載で、クリアな音質を実現。</p>
                                    <div class="gpt5sw-sl06-specs">
                                        <span class="gpt5sw-sl06-spec">• 30時間連続再生</span>
                                        <span class="gpt5sw-sl06-spec">• ANCテクノロジー</span>
                                        <span class="gpt5sw-sl06-spec">• 急速充電対応</span>
                                    </div>
                                    <div class="gpt5sw-sl06-price-row">
                                        <div class="gpt5sw-sl06-price">¥29,800</div>
                                        <button class="gpt5sw-sl06-btn">詳細を見る</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 2: Smartwatch -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl06-slide-content">
                                <div class="gpt5sw-sl06-product-image">
                                    <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=400&fit=crop" alt="Smartwatch">
                                    <div class="gpt5sw-sl06-badge premium">Premium</div>
                                </div>
                                <div class="gpt5sw-sl06-product-info">
                                    <div class="gpt5sw-sl06-category">Wearables</div>
                                    <h3 class="gpt5sw-sl06-title">Advanced Smartwatch Pro</h3>
                                    <p class="gpt5sw-sl06-description">多機能スマートウォッチ。健康管理から通知機能まで、日常をサポートする最新技術。</p>
                                    <div class="gpt5sw-sl06-specs">
                                        <span class="gpt5sw-sl06-spec">• GPS内蔵</span>
                                        <span class="gpt5sw-sl06-spec">• 心拍数モニター</span>
                                        <span class="gpt5sw-sl06-spec">• 防水機能</span>
                                    </div>
                                    <div class="gpt5sw-sl06-price-row">
                                        <div class="gpt5sw-sl06-price">¥45,000</div>
                                        <button class="gpt5sw-sl06-btn">詳細を見る</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 3: Laptop -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl06-slide-content">
                                <div class="gpt5sw-sl06-product-image">
                                    <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop" alt="Laptop">
                                    <div class="gpt5sw-sl06-badge sale">Sale</div>
                                </div>
                                <div class="gpt5sw-sl06-product-info">
                                    <div class="gpt5sw-sl06-category">Computing</div>
                                    <h3 class="gpt5sw-sl06-title">Ultra-Thin Laptop</h3>
                                    <p class="gpt5sw-sl06-description">軽量でパワフルなウルトラブック。仕事からクリエイティブワークまで幅広く対応。</p>
                                    <div class="gpt5sw-sl06-specs">
                                        <span class="gpt5sw-sl06-spec">• 16GB RAM</span>
                                        <span class="gpt5sw-sl06-spec">• 512GB SSD</span>
                                        <span class="gpt5sw-sl06-spec">• 10時間バッテリー</span>
                                    </div>
                                    <div class="gpt5sw-sl06-price-row">
                                        <div class="gpt5sw-sl06-price">¥159,800</div>
                                        <button class="gpt5sw-sl06-btn">詳細を見る</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 4: Camera -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl06-slide-content">
                                <div class="gpt5sw-sl06-product-image">
                                    <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop" alt="Camera">
                                    <div class="gpt5sw-sl06-badge">Featured</div>
                                </div>
                                <div class="gpt5sw-sl06-product-info">
                                    <div class="gpt5sw-sl06-category">Photography</div>
                                    <h3 class="gpt5sw-sl06-title">Professional DSLR Camera</h3>
                                    <p class="gpt5sw-sl06-description">プロ仕様のデジタル一眼レフカメラ。高解像度センサーで美しい写真を撮影。</p>
                                    <div class="gpt5sw-sl06-specs">
                                        <span class="gpt5sw-sl06-spec">• 24.2MP センサー</span>
                                        <span class="gpt5sw-sl06-spec">• 4K動画撮影</span>
                                        <span class="gpt5sw-sl06-spec">• Wi-Fi内蔵</span>
                                    </div>
                                    <div class="gpt5sw-sl06-price-row">
                                        <div class="gpt5sw-sl06-price">¥89,800</div>
                                        <button class="gpt5sw-sl06-btn">詳細を見る</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <!-- Navigation -->
                    <div class="gpt5sw-sl06-navigation">
                        <div class="swiper-button-prev gpt5sw-sl06-prev"></div>
                        <div class="swiper-button-next gpt5sw-sl06-next"></div>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="swiper-pagination gpt5sw-sl06-pagination"></div>
                </div>
                
                <!-- Thumbnails -->
                <div class="gpt5sw-sl06-thumbs">
                    <div class="swiper gpt5sw-sl06-thumbs-swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide gpt5sw-sl06-thumb">
                                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=80&fit=crop" alt="Headphones">
                                <span>Headphones</span>
                            </div>
                            <div class="swiper-slide gpt5sw-sl06-thumb">
                                <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=80&fit=crop" alt="Smartwatch">
                                <span>Smartwatch</span>
                            </div>
                            <div class="swiper-slide gpt5sw-sl06-thumb">
                                <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=80&fit=crop" alt="Laptop">
                                <span>Laptop</span>
                            </div>
                            <div class="swiper-slide gpt5sw-sl06-thumb">
                                <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=80&fit=crop" alt="Camera">
                                <span>Camera</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Controls -->
                <div class="gpt5sw-sl06-controls">
                    <div class="gpt5sw-sl06-counter">
                        <span id="gpt5sw-sl06-current">1</span> / <span id="gpt5sw-sl06-total">4</span>
                            </div>

                    <button class="gpt5sw-sl06-autoplay" id="gpt5sw-sl06-autoplay">
                        <span id="gpt5sw-sl06-auto-icon">⏸</span>
                        <span id="gpt5sw-sl06-auto-text">自動再生停止</span>
                            </button>
                </div>
            </div>
        </section>

        <!-- Swiper Slider 07 -->
        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">07. ミニマル・カード・スライダー</h2>
            
            <!-- Swiper Slider 07: Minimal Card Slider -->
            <div class="gpt5sw-sl07-container">
                <!-- Main Swiper -->
                <div class="swiper gpt5sw-sl07-main">
                    <div class="swiper-wrapper">
                        
                        <!-- Slide 1: Web Design Service -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl07-card">
                                <div class="gpt5sw-sl07-image">
                                    <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=400&fit=crop" alt="Web Design Service">
                                </div>
                                <div class="gpt5sw-sl07-info">
                                    <div class="gpt5sw-sl07-category">Web Design</div>
                                    <h3 class="gpt5sw-sl07-title">モダンWebデザイン</h3>
                                    <p class="gpt5sw-sl07-description">ユーザー体験を重視したモダンで美しいWebサイトデザインを提供。レスポンシブ対応で全デバイスに最適化されたデザインをお届けします。</p>
                                    <button class="gpt5sw-sl07-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 2: Digital Marketing -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl07-card">
                                <div class="gpt5sw-sl07-image">
                                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop" alt="Digital Marketing">
                                </div>
                                <div class="gpt5sw-sl07-info">
                                    <div class="gpt5sw-sl07-category">Marketing</div>
                                    <h3 class="gpt5sw-sl07-title">デジタルマーケティング</h3>
                                    <p class="gpt5sw-sl07-description">データドリブンなマーケティング戦略で、ROIを最大化。SEO、SNS、コンテンツマーケティングを統合したアプローチで成果を実現します。</p>
                                    <button class="gpt5sw-sl07-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 3: App Development -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl07-card">
                                <div class="gpt5sw-sl07-image">
                                    <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=400&fit=crop" alt="App Development">
                                </div>
                                <div class="gpt5sw-sl07-info">
                                    <div class="gpt5sw-sl07-category">Development</div>
                                    <h3 class="gpt5sw-sl07-title">モバイルアプリ開発</h3>
                                    <p class="gpt5sw-sl07-description">iOS・Android対応のネイティブアプリ開発。ユーザビリティを重視した直感的なインターフェースで、ビジネス価値を最大化するアプリを制作します。</p>
                                    <button class="gpt5sw-sl07-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 4: Business Consulting -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl07-card">
                                <div class="gpt5sw-sl07-image">
                                    <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=400&fit=crop" alt="Business Consulting">
                                </div>
                                <div class="gpt5sw-sl07-info">
                                    <div class="gpt5sw-sl07-category">Consulting</div>
                                    <h3 class="gpt5sw-sl07-title">ビジネス戦略コンサルティング</h3>
                                    <p class="gpt5sw-sl07-description">企業の成長戦略立案から実行支援まで。豊富な経験と実績に基づいた戦略的アドバイスで、持続可能なビジネス成長をサポートします。</p>
                                    <button class="gpt5sw-sl07-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <!-- Navigation -->
                    <div class="gpt5sw-sl07-navigation">
                        <div class="swiper-button-prev gpt5sw-sl07-nav-prev"></div>
                        <div class="swiper-button-next gpt5sw-sl07-nav-next"></div>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="swiper-pagination gpt5sw-sl07-pagination"></div>
                </div>
                
                <!-- Thumbnails -->
                <div class="gpt5sw-sl07-thumbs">
                    <div class="swiper gpt5sw-sl07-thumbs-swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide gpt5sw-sl07-thumb">
                                <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=80&fit=crop" alt="Web Design">
                                <span>Web Design</span>
                            </div>
                            <div class="swiper-slide gpt5sw-sl07-thumb">
                                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=80&fit=crop" alt="Marketing">
                                <span>Marketing</span>
                            </div>
                            <div class="swiper-slide gpt5sw-sl07-thumb">
                                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=80&fit=crop" alt="Development">
                                <span>Development</span>
                            </div>
                            <div class="swiper-slide gpt5sw-sl07-thumb">
                                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&h=80&fit=crop" alt="Consulting">
                                <span>Consulting</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Controls -->
                <div class="gpt5sw-sl07-controls">
                    <div class="gpt5sw-sl07-counter">
                        <span id="gpt5sw-sl07-current">1</span> / <span id="gpt5sw-sl07-total">4</span>
                    </div>
                    
                    <button class="gpt5sw-sl07-autoplay" id="gpt5sw-sl07-autoplay">
                        <span id="gpt5sw-sl07-auto-icon">⏸</span>
                        <span id="gpt5sw-sl07-auto-text">自動再生停止</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Swiper Slider 08 -->
        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">08. モバイルネイティブ・カードスライダー</h2>
            
            <!-- Swiper Slider 08: Mobile Native Card Slider -->
            <div class="gpt5sw-sl08-container">
                <!-- Main Swiper -->
                <div class="swiper gpt5sw-sl08-main">
                    <div class="swiper-wrapper">
                        
                        <!-- Slide 1: Travel & Tourism -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl08-card">
                                <div class="gpt5sw-sl08-image">
                                    <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=250&fit=crop" alt="Travel Experience">
                                    <div class="gpt5sw-sl08-badge">Popular</div>
                                </div>
                                <div class="gpt5sw-sl08-content">
                                    <div class="gpt5sw-sl08-category">Travel</div>
                                    <h3 class="gpt5sw-sl08-title">世界を旅する体験</h3>
                                    <p class="gpt5sw-sl08-description">忘れられない旅の思い出を作りませんか？美しい景色と文化に触れる特別な体験をご提供します。</p>
                                    <div class="gpt5sw-sl08-meta">
                                        <span class="gpt5sw-sl08-price">¥89,000〜</span>
                                        <span class="gpt5sw-sl08-rating">★★★★★</span>
                                    </div>
                                    <button class="gpt5sw-sl08-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 2: Technology & Innovation -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl08-card">
                                <div class="gpt5sw-sl08-image">
                                    <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=250&fit=crop" alt="Technology Innovation">
                                    <div class="gpt5sw-sl08-badge new">New</div>
                                </div>
                                <div class="gpt5sw-sl08-content">
                                    <div class="gpt5sw-sl08-category">Technology</div>
                                    <h3 class="gpt5sw-sl08-title">次世代テクノロジー</h3>
                                    <p class="gpt5sw-sl08-description">最新のAI技術とイノベーションで、ビジネスの可能性を広げる革新的なソリューションを提供します。</p>
                                    <div class="gpt5sw-sl08-meta">
                                        <span class="gpt5sw-sl08-price">お問い合わせ</span>
                                        <span class="gpt5sw-sl08-rating">★★★★☆</span>
                                    </div>
                                    <button class="gpt5sw-sl08-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 3: Health & Wellness -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl08-card">
                                <div class="gpt5sw-sl08-image">
                                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=250&fit=crop" alt="Health & Wellness">
                                    <div class="gpt5sw-sl08-badge trending">Trending</div>
                                </div>
                                <div class="gpt5sw-sl08-content">
                                    <div class="gpt5sw-sl08-category">Wellness</div>
                                    <h3 class="gpt5sw-sl08-title">健康とウェルネス</h3>
                                    <p class="gpt5sw-sl08-description">心と体の健康をサポートする包括的なウェルネスプログラム。専門家による個別指導で理想の自分へ。</p>
                                    <div class="gpt5sw-sl08-meta">
                                        <span class="gpt5sw-sl08-price">¥12,000/月</span>
                                        <span class="gpt5sw-sl08-rating">★★★★★</span>
                                    </div>
                                    <button class="gpt5sw-sl08-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 4: Education & Learning -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl08-card">
                                <div class="gpt5sw-sl08-image">
                                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=250&fit=crop" alt="Education & Learning">
                                    <div class="gpt5sw-sl08-badge featured">Featured</div>
                                </div>
                                <div class="gpt5sw-sl08-content">
                                    <div class="gpt5sw-sl08-category">Education</div>
                                    <h3 class="gpt5sw-sl08-title">学習とスキルアップ</h3>
                                    <p class="gpt5sw-sl08-description">現代に必要なスキルを効率的に学べるオンライン学習プラットフォーム。あなたの成長をサポートします。</p>
                                    <div class="gpt5sw-sl08-meta">
                                        <span class="gpt5sw-sl08-price">¥2,980/月</span>
                                        <span class="gpt5sw-sl08-rating">★★★★☆</span>
                                    </div>
                                    <button class="gpt5sw-sl08-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <!-- Pagination -->
                    <div class="swiper-pagination gpt5sw-sl08-pagination"></div>
                </div>
                
                <!-- Controls -->
                <div class="gpt5sw-sl08-controls">
                    <div class="gpt5sw-sl08-counter">
                        <span id="gpt5sw-sl08-current">1</span> / <span id="gpt5sw-sl08-total">4</span>
                    </div>
                    
                    <button class="gpt5sw-sl08-autoplay" id="gpt5sw-sl08-autoplay">
                        <span id="gpt5sw-sl08-auto-icon">⏸</span>
                        <span id="gpt5sw-sl08-auto-text">自動再生停止</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Swiper Slider 09 -->
        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">09. リキッド・フロー・スライダー</h2>
            
            <!-- Swiper Slider 09: Liquid Flow Slider -->
            <div class="gpt5sw-sl09-container">
                <!-- Liquid Background Effects -->
                <div class="gpt5sw-sl09-liquid-bg">
                    <div class="gpt5sw-sl09-ripple gpt5sw-sl09-ripple-1"></div>
                    <div class="gpt5sw-sl09-ripple gpt5sw-sl09-ripple-2"></div>
                    <div class="gpt5sw-sl09-ripple gpt5sw-sl09-ripple-3"></div>
                    <div class="gpt5sw-sl09-droplet gpt5sw-sl09-droplet-1"></div>
                    <div class="gpt5sw-sl09-droplet gpt5sw-sl09-droplet-2"></div>
                    <div class="gpt5sw-sl09-droplet gpt5sw-sl09-droplet-3"></div>
                </div>
                
                <!-- Main Swiper -->
                <div class="swiper gpt5sw-sl09-main">
                    <div class="swiper-wrapper">
                        
                        <!-- Slide 1: Ocean Conservation -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl09-card">
                                <div class="gpt5sw-sl09-liquid-border"></div>
                                <div class="gpt5sw-sl09-image">
                                    <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=300&fit=crop" alt="Ocean Conservation">
                                    <div class="gpt5sw-sl09-wave-overlay"></div>
                                </div>
                                <div class="gpt5sw-sl09-content">
                                    <div class="gpt5sw-sl09-category">Ocean</div>
                                    <h3 class="gpt5sw-sl09-title">海洋保護プロジェクト</h3>
                                    <p class="gpt5sw-sl09-description">美しい海を守るための革新的な取り組み。持続可能な未来のために、私たちと一緒に海洋環境を保護しませんか？</p>
                                    <div class="gpt5sw-sl09-meta">
                                        <span class="gpt5sw-sl09-impact">影響度: 高</span>
                                        <span class="gpt5sw-sl09-participants">参加者: 12,500人</span>
                                    </div>
                                    <button class="gpt5sw-sl09-btn">
                                        <span>参加する</span>
                                        <div class="gpt5sw-sl09-btn-ripple"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 2: Forest Restoration -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl09-card">
                                <div class="gpt5sw-sl09-liquid-border"></div>
                                <div class="gpt5sw-sl09-image">
                                    <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=300&fit=crop" alt="Forest Restoration">
                                    <div class="gpt5sw-sl09-wave-overlay"></div>
                                </div>
                                <div class="gpt5sw-sl09-content">
                                    <div class="gpt5sw-sl09-category">Forest</div>
                                    <h3 class="gpt5sw-sl09-title">森林再生イニシアティブ</h3>
                                    <p class="gpt5sw-sl09-description">失われた森を取り戻す大規模な植林プロジェクト。緑豊かな地球を次世代に残すための取り組みにご参加ください。</p>
                                    <div class="gpt5sw-sl09-meta">
                                        <span class="gpt5sw-sl09-impact">影響度: 最高</span>
                                        <span class="gpt5sw-sl09-participants">参加者: 8,900人</span>
                                    </div>
                                    <button class="gpt5sw-sl09-btn">
                                        <span>参加する</span>
                                        <div class="gpt5sw-sl09-btn-ripple"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 3: Clean Energy -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl09-card">
                                <div class="gpt5sw-sl09-liquid-border"></div>
                                <div class="gpt5sw-sl09-image">
                                    <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=300&fit=crop" alt="Clean Energy">
                                    <div class="gpt5sw-sl09-wave-overlay"></div>
                                </div>
                                <div class="gpt5sw-sl09-content">
                                    <div class="gpt5sw-sl09-category">Energy</div>
                                    <h3 class="gpt5sw-sl09-title">クリーンエネルギー革命</h3>
                                    <p class="gpt5sw-sl09-description">再生可能エネルギーによる持続可能な社会の実現。太陽光、風力、水力を活用した次世代エネルギーシステム。</p>
                                    <div class="gpt5sw-sl09-meta">
                                        <span class="gpt5sw-sl09-impact">影響度: 高</span>
                                        <span class="gpt5sw-sl09-participants">参加者: 15,200人</span>
                                    </div>
                                    <button class="gpt5sw-sl09-btn">
                                        <span>参加する</span>
                                        <div class="gpt5sw-sl09-btn-ripple"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide 4: Water Conservation -->
                        <div class="swiper-slide">
                            <div class="gpt5sw-sl09-card">
                                <div class="gpt5sw-sl09-liquid-border"></div>
                                <div class="gpt5sw-sl09-image">
                                    <img src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=300&fit=crop" alt="Water Conservation">
                                    <div class="gpt5sw-sl09-wave-overlay"></div>
                                </div>
                                <div class="gpt5sw-sl09-content">
                                    <div class="gpt5sw-sl09-category">Water</div>
                                    <h3 class="gpt5sw-sl09-title">水資源保全プログラム</h3>
                                    <p class="gpt5sw-sl09-description">貴重な水資源を守り、きれいな水を世界中に届ける取り組み。技術革新と地域連携で水不足問題の解決を目指します。</p>
                                    <div class="gpt5sw-sl09-meta">
                                        <span class="gpt5sw-sl09-impact">影響度: 最高</span>
                                        <span class="gpt5sw-sl09-participants">参加者: 20,100人</span>
                                    </div>
                                    <button class="gpt5sw-sl09-btn">
                                        <span>参加する</span>
                                        <div class="gpt5sw-sl09-btn-ripple"></div>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <!-- Navigation -->
                    <div class="gpt5sw-sl09-navigation">
                        <div class="swiper-button-prev gpt5sw-sl09-nav-prev">
                            <div class="gpt5sw-sl09-nav-ripple"></div>
                        </div>
                        <div class="swiper-button-next gpt5sw-sl09-nav-next">
                            <div class="gpt5sw-sl09-nav-ripple"></div>
                        </div>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="swiper-pagination gpt5sw-sl09-pagination"></div>
                </div>
                
                <!-- Controls -->
                <div class="gpt5sw-sl09-controls">
                    <div class="gpt5sw-sl09-counter">
                        <span id="gpt5sw-sl09-current">1</span> / <span id="gpt5sw-sl09-total">4</span>
                    </div>
                    
                    <button class="gpt5sw-sl09-autoplay" id="gpt5sw-sl09-autoplay">
                        <span id="gpt5sw-sl09-auto-icon">⏸</span>
                        <span id="gpt5sw-sl09-auto-text">自動再生停止</span>
                        <div class="gpt5sw-sl09-btn-ripple"></div>
                    </button>
                </div>
            </div>
        </section>

        <!-- Swiper Slider 10 -->
        <section class="gpt5sw-slider-section">
            <h2 class="gpt5sw-slider-title">10. スプリット・デュアル・スライダー</h2>
            
            <!-- Swiper Slider 10: Split Dual Slider -->
            <div class="gpt5sw-sl10-container">
                <!-- Split Layout -->
                <div class="gpt5sw-sl10-split-layout">
                    
                    <!-- Left Side: Image Slider -->
                    <div class="gpt5sw-sl10-left">
                        <div class="swiper gpt5sw-sl10-image-swiper">
                            <div class="swiper-wrapper">
                                
                                <!-- Image Slide 1: Nature -->
                                <div class="swiper-slide">
                                    <div class="gpt5sw-sl10-image">
                                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" alt="Mountain Landscape">
                                    </div>
                                </div>
                                
                                <!-- Image Slide 2: City -->
                                <div class="swiper-slide">
                                    <div class="gpt5sw-sl10-image">
                                        <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop" alt="City Skyline">
                                    </div>
                                </div>
                                
                                <!-- Image Slide 3: Technology -->
                                <div class="swiper-slide">
                                    <div class="gpt5sw-sl10-image">
                                        <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop" alt="Technology">
                                    </div>
                                </div>
                                
                                <!-- Image Slide 4: Lifestyle -->
                                <div class="swiper-slide">
                                    <div class="gpt5sw-sl10-image">
                                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop" alt="Lifestyle">
                                    </div>
                                </div>
                                
                            </div>
                            

                        </div>
                    </div>
                    
                    <!-- Split Line -->
                    <div class="gpt5sw-sl10-split-line">
                        <div class="gpt5sw-sl10-split-animation"></div>
                    </div>
                    
                    <!-- Right Side: Content Slider -->
                    <div class="gpt5sw-sl10-right">
                        <div class="swiper gpt5sw-sl10-content-swiper">
                            <div class="swiper-wrapper">
                                
                                <!-- Content Slide 1: Business -->
                                <div class="swiper-slide">
                                    <div class="gpt5sw-sl10-content">
                                        <div class="gpt5sw-sl10-category">Business</div>
                                        <h3 class="gpt5sw-sl10-title">ビジネス戦略の革新</h3>
                                        <p class="gpt5sw-sl10-description">現代のビジネス環境において、革新的な戦略とデジタル変革が成功の鍵となります。データ分析と顧客インサイトを活用し、競合他社との差別化を図ります。</p>
                                        <div class="gpt5sw-sl10-meta">
                                            <span class="gpt5sw-sl10-tag">戦略</span>
                                            <span class="gpt5sw-sl10-tag">革新</span>
                                            <span class="gpt5sw-sl10-tag">成長</span>
                                        </div>
                                        <button class="gpt5sw-sl10-btn">詳細を見る</button>
                                    </div>
                                </div>
                                
                                <!-- Content Slide 2: Education -->
                                <div class="swiper-slide">
                                    <div class="gpt5sw-sl10-content">
                                        <div class="gpt5sw-sl10-category">Education</div>
                                        <h3 class="gpt5sw-sl10-title">次世代の学習体験</h3>
                                        <p class="gpt5sw-sl10-description">テクノロジーを活用した個別最適化学習により、一人ひとりの可能性を最大限に引き出します。AIとVRを組み合わせた没入型の教育プラットフォームを提供。</p>
                                        <div class="gpt5sw-sl10-meta">
                                            <span class="gpt5sw-sl10-tag">学習</span>
                                            <span class="gpt5sw-sl10-tag">AI</span>
                                            <span class="gpt5sw-sl10-tag">個別化</span>
                                        </div>
                                        <button class="gpt5sw-sl10-btn">詳細を見る</button>
                                    </div>
                                </div>
                                
                                <!-- Content Slide 3: Health -->
                                <div class="swiper-slide">
                                    <div class="gpt5sw-sl10-content">
                                        <div class="gpt5sw-sl10-category">Health</div>
                                        <h3 class="gpt5sw-sl10-title">ウェルネス・ライフスタイル</h3>
                                        <p class="gpt5sw-sl10-description">心と体の健康を総合的にサポートする包括的なウェルネスプログラム。栄養管理、運動指導、メンタルヘルスケアを統合したアプローチで理想の生活を実現。</p>
                                        <div class="gpt5sw-sl10-meta">
                                            <span class="gpt5sw-sl10-tag">健康</span>
                                            <span class="gpt5sw-sl10-tag">運動</span>
                                            <span class="gpt5sw-sl10-tag">栄養</span>
                                        </div>
                                        <button class="gpt5sw-sl10-btn">詳細を見る</button>
                                    </div>
                                </div>
                                
                                <!-- Content Slide 4: Entertainment -->
                                <div class="swiper-slide">
                                    <div class="gpt5sw-sl10-content">
                                        <div class="gpt5sw-sl10-category">Entertainment</div>
                                        <h3 class="gpt5sw-sl10-title">デジタル・エンターテイメント</h3>
                                        <p class="gpt5sw-sl10-description">最新のテクノロジーを駆使したエンターテイメント体験。VR、AR、AIを活用したインタラクティブなコンテンツで、新しい娯楽の形を提案します。</p>
                                        <div class="gpt5sw-sl10-meta">
                                            <span class="gpt5sw-sl10-tag">VR</span>
                                            <span class="gpt5sw-sl10-tag">AR</span>
                                            <span class="gpt5sw-sl10-tag">体験</span>
                                        </div>
                                        <button class="gpt5sw-sl10-btn">詳細を見る</button>
                                    </div>
                                </div>
                                
                            </div>
                            

                        </div>
                    </div>
                    
                </div>
                
                <!-- Main Navigation -->
                <div class="gpt5sw-sl10-main-nav">
                    <div class="swiper-button-prev gpt5sw-sl10-main-prev"></div>
                    <div class="swiper-button-next gpt5sw-sl10-main-next"></div>
                </div>
                
                <!-- Main Pagination -->
                <div class="swiper-pagination gpt5sw-sl10-main-pagination"></div>
                
                <!-- Controls -->
                <div class="gpt5sw-sl10-controls">
                    <div class="gpt5sw-sl10-counters">
                        <div class="gpt5sw-sl10-left-counter">
                            画像: <span id="gpt5sw-sl10-left-current">1</span> / <span id="gpt5sw-sl10-left-total">4</span>
                        </div>
                        <div class="gpt5sw-sl10-right-counter">
                            コンテンツ: <span id="gpt5sw-sl10-right-current">1</span> / <span id="gpt5sw-sl10-right-total">4</span>
                        </div>
                    </div>
                    
                    <div class="gpt5sw-sl10-sync-controls">
                        <button class="gpt5sw-sl10-autoplay" id="gpt5sw-sl10-autoplay">
                            <span id="gpt5sw-sl10-auto-icon">⏸</span>
                            <span id="gpt5sw-sl10-auto-text">自動再生停止</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <div class="gpt5sw-slider-divider"></div>
        <section class="gpt5sw-slider-section">
            <div class="gpt5sw-slider-header">
                <h2 class="gpt5sw-slider-title">11. 円形オーバーラップスライダー</h2>
                <p class="gpt5sw-slider-description">美しい円形デザインで重なり合うモダンなスライダー</p>
            </div>
            <div class="gpt5sw-sl11-container">
                <div class="swiper gpt5sw-sl11-swiper">
                    <div class="swiper-wrapper">
                        <!-- 6つの円形スライド -->
                        <div class="swiper-slide gpt5sw-sl11-slide">
                            <div class="gpt5sw-sl11-circle">
                                <div class="gpt5sw-sl11-icon">🎨</div>
                                <h3 class="gpt5sw-sl11-title">Creative Design</h3>
                                <p class="gpt5sw-sl11-description">革新的なデザインソリューション</p>
                                <div class="gpt5sw-sl11-overlay">
                                    <button class="gpt5sw-sl11-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="swiper-slide gpt5sw-sl11-slide">
                            <div class="gpt5sw-sl11-circle">
                                <div class="gpt5sw-sl11-icon">💻</div>
                                <h3 class="gpt5sw-sl11-title">Web Development</h3>
                                <p class="gpt5sw-sl11-description">最新技術による開発サービス</p>
                                <div class="gpt5sw-sl11-overlay">
                                    <button class="gpt5sw-sl11-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="swiper-slide gpt5sw-sl11-slide">
                            <div class="gpt5sw-sl11-circle">
                                <div class="gpt5sw-sl11-icon">📱</div>
                                <h3 class="gpt5sw-sl11-title">Mobile Apps</h3>
                                <p class="gpt5sw-sl11-description">ユーザーフレンドリーなアプリ開発</p>
                                <div class="gpt5sw-sl11-overlay">
                                    <button class="gpt5sw-sl11-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="swiper-slide gpt5sw-sl11-slide">
                            <div class="gpt5sw-sl11-circle">
                                <div class="gpt5sw-sl11-icon">📈</div>
                                <h3 class="gpt5sw-sl11-title">Digital Marketing</h3>
                                <p class="gpt5sw-sl11-description">効果的なマーケティング戦略</p>
                                <div class="gpt5sw-sl11-overlay">
                                    <button class="gpt5sw-sl11-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="swiper-slide gpt5sw-sl11-slide">
                            <div class="gpt5sw-sl11-circle">
                                <div class="gpt5sw-sl11-icon">🛠️</div>
                                <h3 class="gpt5sw-sl11-title">Technical Support</h3>
                                <p class="gpt5sw-sl11-description">24/7包括的サポート</p>
                                <div class="gpt5sw-sl11-overlay">
                                    <button class="gpt5sw-sl11-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="swiper-slide gpt5sw-sl11-slide">
                            <div class="gpt5sw-sl11-circle">
                                <div class="gpt5sw-sl11-icon">🚀</div>
                                <h3 class="gpt5sw-sl11-title">Business Growth</h3>
                                <p class="gpt5sw-sl11-description">持続可能な成長戦略</p>
                                <div class="gpt5sw-sl11-overlay">
                                    <button class="gpt5sw-sl11-btn">詳細を見る</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation -->
                <div class="gpt5sw-sl11-navigation">
                    <div class="swiper-button-prev gpt5sw-sl11-prev"></div>
                    <div class="swiper-button-next gpt5sw-sl11-next"></div>
                </div>
                
                <!-- Pagination -->
                <div class="swiper-pagination gpt5sw-sl11-pagination"></div>
                
                <!-- Progress Ring -->
                <div class="gpt5sw-sl11-progress-ring">
                    <svg class="gpt5sw-sl11-progress-svg" width="80" height="80">
                        <circle class="gpt5sw-sl11-progress-track" cx="40" cy="40" r="36" fill="none" stroke="#e0e0e0" stroke-width="4"/>
                        <circle class="gpt5sw-sl11-progress-bar" cx="40" cy="40" r="36" fill="none" stroke="#667eea" stroke-width="4" stroke-linecap="round"/>
                    </svg>
                    <div class="gpt5sw-sl11-progress-text">
                        <span id="gpt5sw-sl11-current">1</span>/<span id="gpt5sw-sl11-total">6</span>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- Swiper.js JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    
    <script>
        (function() {
            'use strict';

            // Sample data for slider 01
            const slider01Data = [
                {
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
                    title: '革新的なビジネスソリューション',
                    description: '最新のテクノロジーを活用して、あなたのビジネスを次のレベルへ導きます。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop',
                    title: 'デジタルマーケティング戦略',
                    description: 'データドリブンなアプローチで、ROIを最大化する効果的なマーケティング戦略を提案します。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1553028826-f4804151e2a0?w=800&h=500&fit=crop',
                    title: 'クリエイティブデザイン',
                    description: 'ユーザー体験を重視したクリエイティブなデザインで、ブランド価値を向上させます。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
                    title: 'データ分析・可視化',
                    description: '複雑なデータを分かりやすく可視化し、意思決定をサポートします。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
                    title: 'チーム開発・協業',
                    description: '効率的なチーム開発プロセスで、高品質なプロダクトを迅速に提供します。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop',
                    title: 'カスタマーサポート',
                    description: '24/7体制の充実したサポートで、お客様の成功を全面的にバックアップします。'
                }
            ];

            // Sample data for slider 02 (Advanced Parallax)
            const slider02Data = [
                {
                    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
                    category: 'Technology',
                    title: 'Future Innovation',
                    description: '最先端テクノロジーで未来を創造する革新的なソリューションを提供します。',
                    cta: 'Learn More'
                },
                {
                    image: 'https://images.unsplash.com/photo-1573164713712-03790a178651?w=1200&h=600&fit=crop',
                    category: 'Creative',
                    title: 'Design Excellence',
                    description: 'ユーザー体験を重視したクリエイティブデザインで、ブランド価値を向上させます。',
                    cta: 'View Portfolio'
                },
                {
                    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop',
                    category: 'Business',
                    title: 'Strategic Growth',
                    description: 'データドリブンなビジネス戦略で、持続可能な成長を実現します。',
                    cta: 'Get Started'
                },
                {
                    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=600&fit=crop',
                    category: 'Development',
                    title: 'Digital Solutions',
                    description: '高品質なデジタルソリューションで、ビジネスの課題を解決します。',
                    cta: 'Contact Us'
                },
                {
                    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
                    category: 'Collaboration',
                    title: 'Team Excellence',
                    description: 'エキスパートチームによる協業で、最高の成果を実現します。',
                    cta: 'Join Team'
                }
            ];

            // Sample data for slider 03 (3D Card Coverflow)
            const slider03Data = [
                {
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
                    category: 'Electronics',
                    title: 'Wireless Headphones',
                    description: '高品質なワイヤレスヘッドフォン。クリアな音質と快適な装着感を実現。',
                    price: '¥19,800'
                },
                {
                    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
                    category: 'Fashion',
                    title: 'Premium Sneakers',
                    description: 'スタイリッシュで履き心地抜群のプレミアムスニーカー。',
                    price: '¥24,000'
                },
                {
                    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop',
                    category: 'Watches',
                    title: 'Smart Watch Pro',
                    description: '多機能スマートウォッチ。健康管理から通知まで全てをサポート。',
                    price: '¥45,000'
                },
                {
                    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=300&fit=crop',
                    category: 'Bags',
                    title: 'Leather Backpack',
                    description: '本革製の高級バックパック。ビジネスからカジュアルまで対応。',
                    price: '¥32,500'
                },
                {
                    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
                    category: 'Sunglasses',
                    title: 'Designer Sunglasses',
                    description: 'UV保護機能付きデザイナーサングラス。洗練されたスタイル。',
                    price: '¥18,900'
                },
                {
                    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop',
                    category: 'Home',
                    title: 'Premium Coffee Maker',
                    description: 'プロ仕様のコーヒーメーカー。本格的なコーヒーを自宅で楽しめます。',
                    price: '¥89,000'
                }
            ];

            // Sample data for slider 04 (Vertical Timeline)
            const slider04Data = [
                {
                    year: '2020',
                    title: '会社設立',
                    subtitle: '新たなスタートライン',
                    description: '革新的なテクノロジーで社会に貢献することを目指し、小さなオフィスからスタートしました。創業メンバー3名で挑戦を始めました。',
                    highlights: ['スタートアップ', '創業3名', '革新技術']
                },
                {
                    year: '2021',
                    title: '初期プロダクト開発',
                    subtitle: 'MVP完成とユーザーテスト',
                    description: '1年間の開発期間を経て、初期プロダクトが完成。ベータユーザー50名による集中的なテストを実施し、貴重なフィードバックを収集しました。',
                    highlights: ['MVP完成', 'ベータテスト', 'ユーザー50名']
                },
                {
                    year: '2022',
                    title: '正式サービス開始',
                    subtitle: '市場参入とユーザー獲得',
                    description: '正式サービスをローンチし、初月から1000名のユーザー登録を達成。メディアにも取り上げられ、認知度が大幅に向上しました。',
                    highlights: ['正式ローンチ', 'ユーザー1000名', 'メディア掲載']
                },
                {
                    year: '2023',
                    title: '事業拡大とチーム強化',
                    subtitle: '組織成長と新機能追加',
                    description: 'チームメンバーを15名に拡大し、新機能を次々とリリース。ユーザー数は10,000名を突破し、安定したサービス運営を実現しました。',
                    highlights: ['チーム15名', 'ユーザー10000名', '新機能多数']
                },
                {
                    year: '2024',
                    title: '次のステージへ',
                    subtitle: 'グローバル展開の準備',
                    description: '国内市場での地位を確立し、海外展開に向けた準備を開始。新たな投資を受け入れ、さらなる成長に向けて歩みを進めています。',
                    highlights: ['海外展開', '新規投資', '持続成長']
                }
            ];

            // Global variables
            let swiper01 = null;
            let swiper01IsPlaying = true;
            let swiper02 = null;
            let swiper02IsPlaying = true;
            let swiper03 = null;
            let swiper03IsPlaying = true;
            let swiper04 = null;
            let swiper04IsPlaying = true;
            let swiper05 = null;
            let swiper05IsPlaying = true;

            // Sample data for slider 05 (Interactive 3D Cube)
            const slider05Data = [
                {
                    icon: '🚀',
                    title: 'イノベーション',
                    description: '革新的なアイデアと最新技術で、未来を創造します',
                    stat1: { number: '50+', label: 'プロジェクト' },
                    stat2: { number: '95%', label: '成功率' }
                },
                {
                    icon: '🎨',
                    title: 'クリエイティブ',
                    description: '美しいデザインと優れたユーザー体験を提供します',
                    stat1: { number: '200+', label: 'デザイン' },
                    stat2: { number: '4.9★', label: '評価' }
                },
                {
                    icon: '⚡',
                    title: 'パフォーマンス',
                    description: '高速で効率的なソリューションを構築します',
                    stat1: { number: '99.9%', label: '稼働率' },
                    stat2: { number: '<1s', label: '応答速度' }
                },
                {
                    icon: '🛡️',
                    title: 'セキュリティ',
                    description: 'エンタープライズ級のセキュリティで保護します',
                    stat1: { number: '0件', label: '侵害' },
                    stat2: { number: 'ISO27001', label: '認証' }
                },
                {
                    icon: '📈',
                    title: '成長',
                    description: 'ビジネスの継続的な成長をサポートします',
                    stat1: { number: '300%', label: 'ROI' },
                    stat2: { number: '24/7', label: 'サポート' }
                },
                {
                    icon: '🌍',
                    title: 'グローバル',
                    description: '世界中のお客様にサービスを提供しています',
                    stat1: { number: '50+', label: '国' },
                    stat2: { number: '100k+', label: 'ユーザー' }
                }
            ];

            // Swiper.js初期化
            function initSwiperSliders() {
                console.log('Swiper.js が読み込まれました');
                console.log('Swiper version:', typeof Swiper !== 'undefined' ? 'loaded' : 'not loaded');
                
                if (typeof Swiper === 'undefined') {
                    console.error('Swiper.js が読み込まれていません');
                    return;
                }

                console.log('=== Starting Swiper 01 initialization ===');
                
                // Generate slides for slider 01
                console.log('Step 1: Generating slider content');
                generateSlider01Content();
                
                // Initialize Swiper 01
                console.log('Step 2: Initializing Swiper 01 instance');
                initSwiper01();
                
                // Setup custom controls for Swiper 01 (delay to ensure proper initialization)
                setTimeout(() => {
                    console.log('Step 3: Setting up Swiper 01 custom controls');
                    setupSlider01Controls();
                    console.log('=== Swiper 01 initialization complete ===');
                }, 150);

                console.log('=== Starting Swiper 02 initialization ===');
                
                // Generate slides for slider 02
                console.log('Step 1: Generating slider 02 content');
                generateSlider02Content();
                
                // Initialize Swiper 02
                console.log('Step 2: Initializing Swiper 02 instance');
                initSwiper02();
                
                // Setup custom controls for Swiper 02 (delay to ensure proper initialization)
                setTimeout(() => {
                    console.log('Step 3: Setting up Swiper 02 custom controls');
                    setupSlider02Controls();
                    console.log('=== Swiper 02 initialization complete ===');
                }, 200);

                console.log('=== Starting Swiper 03 initialization ===');
                
                // Generate slides for slider 03
                console.log('Step 1: Generating slider 03 content');
                generateSlider03Content();
                
                // Initialize Swiper 03
                console.log('Step 2: Initializing Swiper 03 instance');
                initSwiper03();
                
                // Setup custom controls for Swiper 03 (delay to ensure proper initialization)
                setTimeout(() => {
                    console.log('Step 3: Setting up Swiper 03 custom controls');
                    setupSlider03Controls();
                    console.log('=== Swiper 03 initialization complete ===');
                }, 250);

                console.log('=== Starting Swiper 04 initialization ===');
                
                // Generate slides for slider 04
                console.log('Step 1: Generating slider 04 content');
                generateSlider04Content();
                
                // Initialize Swiper 04
                console.log('Step 2: Initializing Swiper 04 instance');
                initSwiper04();
                
                // Setup custom controls for Swiper 04 (delay to ensure proper initialization)
                setTimeout(() => {
                    console.log('Step 3: Setting up Swiper 04 custom controls');
                    setupSlider04Controls();
                    console.log('=== Swiper 04 initialization complete ===');
                }, 300);

                // Initialize Swiper 05 with delay
                setTimeout(() => {
                    console.log('=== Starting Swiper 05 initialization ===');
                    initSwiper05();
                    console.log('=== Swiper 05 initialization complete ===');
                }, 500);

                // Initialize Swiper 06 (Premium Product Slider)
                setTimeout(() => {
                    console.log('=== Starting Swiper 06 initialization ===');
                    initSwiper06PremiumProduct();
                    console.log('=== Swiper 06 initialization complete ===');
                }, 600);

                // Initialize Swiper 07 (Minimal Card Slider)
                setTimeout(() => {
                    console.log('=== Starting Swiper 07 initialization ===');
                    initSwiper07MinimalCard();
                    console.log('=== Swiper 07 initialization complete ===');
                }, 700);

                // Initialize Swiper 08 (Mobile Native Card Slider)
                setTimeout(() => {
                    console.log('=== Starting Swiper 08 initialization ===');
                    initSwiper08MobileNative();
                    console.log('=== Swiper 08 initialization complete ===');
                }, 800);

                // Initialize Swiper 09 (Liquid Flow Slider)
                setTimeout(() => {
                    console.log('=== Starting Swiper 09 initialization ===');
                    initSwiper09LiquidFlow();
                    console.log('=== Swiper 09 initialization complete ===');
                }, 900);

                // Initialize Swiper 10 (Split Dual Slider)
                setTimeout(() => {
                    console.log('=== Starting Swiper 10 initialization ===');
                    initSwiper10SplitDual();
                    console.log('=== Swiper 10 initialization complete ===');
                }, 1000);

                setTimeout(() => {
                    console.log('=== Starting Swiper 11 initialization ===');
                    initSwiperSl11();
                    console.log('=== Swiper 11 initialization complete ===');
                }, 1100);
            }

            // Generate slider 01 content
            function generateSlider01Content() {
                const swiperWrapper = document.querySelector('.gpt5sw-slider-01 .swiper-wrapper');
                if (!swiperWrapper) return;

                swiperWrapper.innerHTML = '';
                
                slider01Data.forEach((slide, index) => {
                    const slideElement = document.createElement('div');
                    slideElement.className = 'swiper-slide';
                    slideElement.innerHTML = `
                        <img src="${slide.image}" alt="${slide.title}" loading="${index === 0 ? 'eager' : 'lazy'}">
                        <div class="slide-content">
                            <h3 class="slide-title">${slide.title}</h3>
                            <p class="slide-description">${slide.description}</p>
                        </div>
                    `;
                    swiperWrapper.appendChild(slideElement);
                });

                // Update total count
                const totalElement = document.getElementById('gpt5sw-01-total');
                if (totalElement) {
                    totalElement.textContent = slider01Data.length;
                }
            }

            // Initialize Swiper 01 with full features
            function initSwiper01() {
                const swiperElement = document.querySelector('.gpt5sw-slider-01 .swiper');
                if (!swiperElement) return;

                swiper01 = new Swiper(swiperElement, {
                    // Basic settings
                    direction: 'horizontal',
                    loop: true,
                    speed: 600,
                    effect: 'slide',
                    
                    // Autoplay
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },

                    // Slides per view
                    slidesPerView: 1,
                    spaceBetween: 0,
                    centeredSlides: true,

                    // Touch settings
                    touchRatio: 1,
                    touchAngle: 45,
                    simulateTouch: true,
                    shortSwipes: true,
                    longSwipes: true,

                    // Keyboard control
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },

                    // Mouse wheel
                    mousewheel: {
                        enabled: true,
                        sensitivity: 1,
                    },

                    // Accessibility
                    a11y: {
                        enabled: true,
                        prevSlideMessage: '前のスライド',
                        nextSlideMessage: '次のスライド',
                        firstSlideMessage: '最初のスライド',
                        lastSlideMessage: '最後のスライド',
                    },

                    // Lazy loading
                    lazy: {
                        loadPrevNext: true,
                        loadPrevNextAmount: 2,
                    },

                    // Preloader
                    preloadImages: false,

                    // Watch for changes
                    observer: true,
                    observeParents: true,

                    // Callbacks
                    on: {
                        slideChange: function () {
                            updateSlider01Counter();
                            updateCustomPagination();
                        },
                        init: function () {
                            console.log('Swiper 01 initialized successfully');
                        }
                    }
                });

                // Initialize custom components AFTER Swiper instance is created
                // Use setTimeout to ensure swiper01 variable is properly assigned
                setTimeout(() => {
                    console.log('Initializing custom components...');
                    if (swiper01) {
                        console.log('Swiper instance available, creating custom components');
                        createCustomPagination();
                        updateSlider01Counter();
                        updateCustomPagination();
                    } else {
                        console.error('Swiper instance still not available after timeout');
                    }
                }, 100);
            }

            // Setup custom controls for slider 01
            function setupSlider01Controls() {
                // Navigation buttons
                const nextBtn = document.querySelector('.gpt5sw-01-next');
                const prevBtn = document.querySelector('.gpt5sw-01-prev');
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', function() {
                        if (swiper01) swiper01.slideNext();
                        console.log('Next button clicked');
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', function() {
                        if (swiper01) swiper01.slidePrev();
                        console.log('Previous button clicked');
                    });
                }
            }

            // Create custom pagination bullets
            function createCustomPagination() {
                const paginationContainer = document.querySelector('.gpt5sw-01-pagination');
                if (!paginationContainer) {
                    console.error('Pagination container not found');
                    return;
                }
                if (!swiper01) {
                    console.error('Swiper instance not available');
                    return;
                }

                paginationContainer.innerHTML = '';
                console.log('Creating pagination for', slider01Data.length, 'slides');
                
                for (let i = 0; i < slider01Data.length; i++) {
                    const bullet = document.createElement('div');
                    bullet.className = 'gpt5sw-bullet';
                    bullet.textContent = i + 1;
                    bullet.addEventListener('click', function() {
                        console.log('Clicked pagination bullet', i + 1);
                        if (swiper01) swiper01.slideToLoop(i);
                    });
                    paginationContainer.appendChild(bullet);
                }
                console.log('Pagination bullets created successfully');
            }

            // Update pagination active state
            function updateCustomPagination() {
                const bullets = document.querySelectorAll('.gpt5sw-01-pagination .gpt5sw-bullet');
                if (!bullets.length) {
                    console.log('No pagination bullets found');
                    return;
                }
                if (!swiper01) {
                    console.log('Swiper instance not available for pagination update');
                    return;
                }

                const currentIndex = swiper01.realIndex;
                console.log('Updating pagination, current slide:', currentIndex + 1);

                bullets.forEach((bullet, index) => {
                    bullet.classList.remove('active');
                    if (index === currentIndex) {
                        bullet.classList.add('active');
                        console.log('Activated pagination bullet:', index + 1);
                    }
                });
            }


            // Update slide counter
            function updateSlider01Counter() {
                const currentElement = document.getElementById('gpt5sw-01-current');
                if (!currentElement) {
                    console.log('Current slide counter element not found');
                    return;
                }
                if (!swiper01) {
                    console.log('Swiper instance not available for counter update');
                    return;
                }
                
                const realIndex = swiper01.realIndex + 1;
                currentElement.textContent = realIndex;
                console.log('Updated slide counter to:', realIndex);
            }

            // ===== SWIPER 02 FUNCTIONS =====

            // Generate slider 02 content
            function generateSlider02Content() {
                const swiperWrapper = document.querySelector('.gpt5sw-slider-02 .swiper-wrapper');
                if (!swiperWrapper) return;

                swiperWrapper.innerHTML = '';
                
                slider02Data.forEach((slide, index) => {
                    const slideElement = document.createElement('div');
                    slideElement.className = 'swiper-slide';
                    slideElement.innerHTML = `
                        <img src="${slide.image}" alt="${slide.title}" loading="${index === 0 ? 'eager' : 'lazy'}">
                        <div class="slide-content" data-swiper-parallax="-300">
                            <div class="slide-text">
                                <div class="slide-category" data-swiper-parallax="-100">${slide.category}</div>
                                <h3 class="slide-title" data-swiper-parallax="-200">${slide.title}</h3>
                                <p class="slide-description" data-swiper-parallax="-150">${slide.description}</p>
                            </div>
                            <div class="slide-button">
                                <a href="#" class="slide-cta" data-swiper-parallax="-50">${slide.cta}</a>
                            </div>
                        </div>
                    `;
                    swiperWrapper.appendChild(slideElement);
                });

                // Update total count
                const totalElement = document.getElementById('gpt5sw-02-total');
                if (totalElement) {
                    totalElement.textContent = slider02Data.length;
                }

                // Generate thumbnails
                generateSlider02Thumbnails();
            }

            // Generate thumbnails for slider 02
            function generateSlider02Thumbnails() {
                const thumbnailContainer = document.querySelector('.gpt5sw-02-thumbnails');
                if (!thumbnailContainer) return;

                thumbnailContainer.innerHTML = '';
                
                slider02Data.forEach((slide, index) => {
                    const thumb = document.createElement('div');
                    thumb.className = 'gpt5sw-02-thumb' + (index === 0 ? ' active' : '');
                    thumb.innerHTML = `<img src="${slide.image}" alt="${slide.title}">`;
                    thumb.addEventListener('click', function() {
                        if (swiper02) swiper02.slideToLoop(index);
                    });
                    thumbnailContainer.appendChild(thumb);
                });
            }

            // Initialize advanced Swiper 02 with parallax and 3D effects
            function initSwiper02() {
                const swiperElement = document.querySelector('.gpt5sw-slider-02 .swiper');
                if (!swiperElement) return;

                swiper02 = new Swiper(swiperElement, {
                    // Basic settings
                    direction: 'horizontal',
                    loop: true,
                    speed: 1000,
                    effect: 'fade',
                    
                    // Fade effect settings
                    fadeEffect: {
                        crossFade: true
                    },

                    // Parallax effect
                    parallax: true,
                    
                    // Autoplay with advanced settings
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        reverseDirection: false,
                    },

                    // Slides settings
                    slidesPerView: 1,
                    spaceBetween: 0,
                    centeredSlides: true,

                    // Touch settings
                    touchRatio: 1,
                    touchAngle: 45,
                    simulateTouch: true,
                    shortSwipes: true,
                    longSwipes: true,
                    touchStartPreventDefault: false,

                    // Keyboard control
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },

                    // Mouse wheel
                    mousewheel: {
                        enabled: true,
                        sensitivity: 1,
                        releaseOnEdges: true,
                    },

                    // Accessibility
                    a11y: {
                        enabled: true,
                        prevSlideMessage: '前のスライド',
                        nextSlideMessage: '次のスライド',
                        firstSlideMessage: '最初のスライド',
                        lastSlideMessage: '最後のスライド',
                    },

                    // Lazy loading
                    lazy: {
                        loadPrevNext: true,
                        loadPrevNextAmount: 2,
                    },

                    // Preloader
                    preloadImages: false,

                    // Watch for changes
                    observer: true,
                    observeParents: true,

                    // Callbacks
                    on: {
                        slideChange: function () {
                            updateSlider02Counter();
                            updateSlider02Thumbnails();
                        },
                        init: function () {
                            console.log('Swiper 02 initialized successfully');
                        }
                    }
                });
            }

            // Setup custom controls for slider 02
            function setupSlider02Controls() {
                // Navigation buttons
                const nextBtn = document.querySelector('.gpt5sw-02-next');
                const prevBtn = document.querySelector('.gpt5sw-02-prev');
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', function() {
                        if (swiper02) swiper02.slideNext();
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', function() {
                        if (swiper02) swiper02.slidePrev();
                    });
                }

                // Play/Pause button
                const playPauseBtn = document.getElementById('gpt5sw-02-play-pause');
                const playIcon = document.getElementById('gpt5sw-02-play-icon');
                
                if (playPauseBtn) {
                    playPauseBtn.addEventListener('click', function() {
                        if (swiper02IsPlaying) {
                            swiper02.autoplay.stop();
                            playIcon.textContent = '▶';
                            playPauseBtn.querySelector('span:last-child').textContent = '再生';
                            swiper02IsPlaying = false;
                        } else {
                            swiper02.autoplay.start();
                            playIcon.textContent = '⏸';
                            playPauseBtn.querySelector('span:last-child').textContent = '一時停止';
                            swiper02IsPlaying = true;
                        }
                    });
                }

                // Speed control buttons
                const speedButtons = document.querySelectorAll('.gpt5sw-02-speed-btn');
                speedButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const speed = parseInt(this.getAttribute('data-speed'));
                        
                        // Update active state
                        speedButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Update autoplay delay
                        if (swiper02 && swiper02.autoplay) {
                            swiper02.autoplay.stop();
                            swiper02.params.autoplay.delay = speed;
                            if (swiper02IsPlaying) {
                                swiper02.autoplay.start();
                            }
                        }
                    });
                });
            }

            // Update slide counter for slider 02
            function updateSlider02Counter() {
                const currentElement = document.getElementById('gpt5sw-02-current');
                if (!currentElement || !swiper02) return;
                
                const realIndex = swiper02.realIndex + 1;
                currentElement.textContent = realIndex;
            }

            // Update thumbnails active state for slider 02
            function updateSlider02Thumbnails() {
                const thumbs = document.querySelectorAll('.gpt5sw-02-thumb');
                if (!thumbs.length || !swiper02) return;

                const currentIndex = swiper02.realIndex;

                thumbs.forEach((thumb, index) => {
                    thumb.classList.remove('active');
                    if (index === currentIndex) {
                        thumb.classList.add('active');
                    }
                });
            }

            // ===== SWIPER 03 FUNCTIONS =====

            // Generate slider 03 content
            function generateSlider03Content() {
                const swiperWrapper = document.querySelector('.gpt5sw-slider-03 .swiper-wrapper');
                if (!swiperWrapper) return;

                swiperWrapper.innerHTML = '';
                
                slider03Data.forEach((slide, index) => {
                    const slideElement = document.createElement('div');
                    slideElement.className = 'swiper-slide';
                    slideElement.innerHTML = `
                        <img src="${slide.image}" alt="${slide.title}" class="slide-image" loading="${index === 0 ? 'eager' : 'lazy'}">
                        <div class="slide-price">${slide.price}</div>
                        <div class="slide-content">
                            <div class="slide-category">${slide.category}</div>
                            <h3 class="slide-title">${slide.title}</h3>
                            <p class="slide-description">${slide.description}</p>
                        </div>
                    `;
                    swiperWrapper.appendChild(slideElement);
                });

                // Update total count
                const totalElement = document.getElementById('gpt5sw-03-total');
                if (totalElement) {
                    totalElement.textContent = slider03Data.length;
                }

                // Generate pagination dots
                generateSlider03Pagination();
            }

            // Generate pagination dots for slider 03
            function generateSlider03Pagination() {
                const paginationContainer = document.querySelector('.gpt5sw-03-pagination');
                if (!paginationContainer) return;

                paginationContainer.innerHTML = '';
                
                slider03Data.forEach((slide, index) => {
                    const dot = document.createElement('div');
                    dot.className = 'gpt5sw-03-dot' + (index === 0 ? ' active' : '');
                    dot.addEventListener('click', function() {
                        if (swiper03) swiper03.slideToLoop(index);
                    });
                    paginationContainer.appendChild(dot);
                });
            }

            // Initialize Swiper 03 with coverflow effect
            function initSwiper03() {
                const swiperElement = document.querySelector('.gpt5sw-slider-03 .swiper');
                if (!swiperElement) return;

                swiper03 = new Swiper(swiperElement, {
                    // Coverflow effect
                    effect: 'coverflow',
                    coverflowEffect: {
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    },

                    // Basic settings
                    direction: 'horizontal',
                    loop: true,
                    speed: 600,
                    
                    // Autoplay
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },

                    // Slides settings
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    centeredSlides: true,

                    // Touch settings
                    touchRatio: 1,
                    touchAngle: 45,
                    simulateTouch: true,
                    shortSwipes: true,
                    longSwipes: true,

                    // Keyboard control
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },

                    // Mouse wheel
                    mousewheel: {
                        enabled: true,
                        sensitivity: 1,
                    },

                    // Accessibility
                    a11y: {
                        enabled: true,
                        prevSlideMessage: '前のカード',
                        nextSlideMessage: '次のカード',
                        firstSlideMessage: '最初のカード',
                        lastSlideMessage: '最後のカード',
                    },

                    // Lazy loading
                    lazy: {
                        loadPrevNext: true,
                        loadPrevNextAmount: 2,
                    },

                    // Watch for changes
                    observer: true,
                    observeParents: true,

                    // Callbacks
                    on: {
                        slideChange: function () {
                            updateSlider03Counter();
                            updateSlider03Pagination();
                        },
                        init: function () {
                            console.log('Swiper 03 initialized successfully');
                        }
                    }
                });
            }

            // Setup custom controls for slider 03
            function setupSlider03Controls() {
                // Navigation buttons
                const nextBtn = document.querySelector('.gpt5sw-03-next');
                const prevBtn = document.querySelector('.gpt5sw-03-prev');
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', function() {
                        if (swiper03) swiper03.slideNext();
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', function() {
                        if (swiper03) swiper03.slidePrev();
                    });
                }

                // Auto toggle button
                const autoToggleBtn = document.getElementById('gpt5sw-03-auto-toggle');
                const autoIcon = document.getElementById('gpt5sw-03-auto-icon');
                const autoText = document.getElementById('gpt5sw-03-auto-text');
                
                if (autoToggleBtn) {
                    autoToggleBtn.addEventListener('click', function() {
                        if (swiper03IsPlaying) {
                            swiper03.autoplay.stop();
                            autoIcon.textContent = '▶';
                            autoText.textContent = '自動再生開始';
                            swiper03IsPlaying = false;
                        } else {
                            swiper03.autoplay.start();
                            autoIcon.textContent = '⏸';
                            autoText.textContent = '自動再生停止';
                            swiper03IsPlaying = true;
                        }
                    });
                }
            }

            // Update slide counter for slider 03
            function updateSlider03Counter() {
                const currentElement = document.getElementById('gpt5sw-03-current');
                if (!currentElement || !swiper03) return;
                
                const realIndex = swiper03.realIndex + 1;
                currentElement.textContent = realIndex;
            }

            // Update pagination active state for slider 03
            function updateSlider03Pagination() {
                const dots = document.querySelectorAll('.gpt5sw-03-dot');
                if (!dots.length || !swiper03) return;

                const currentIndex = swiper03.realIndex;

                dots.forEach((dot, index) => {
                    dot.classList.remove('active');
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    }
                });
            }

            // ===== SWIPER 04 FUNCTIONS =====

            // Generate slider 04 content
            function generateSlider04Content() {
                const swiperWrapper = document.querySelector('.gpt5sw-slider-04 .swiper-wrapper');
                if (!swiperWrapper) return;

                swiperWrapper.innerHTML = '';
                
                slider04Data.forEach((slide, index) => {
                    const slideElement = document.createElement('div');
                    slideElement.className = 'swiper-slide';
                    slideElement.innerHTML = `
                        <div class="timeline-item">
                            <div class="timeline-year">${slide.year}</div>
                            <div class="timeline-content">
                                <h3 class="timeline-title">${slide.title}</h3>
                                <p class="timeline-subtitle">${slide.subtitle}</p>
                                <p class="timeline-description">${slide.description}</p>
                                <div class="timeline-highlights">
                                    ${slide.highlights.map(highlight => `<span class="timeline-highlight">${highlight}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                    swiperWrapper.appendChild(slideElement);
                });

                // Update total count (show last year)
                const totalElement = document.getElementById('gpt5sw-04-total');
                if (totalElement) {
                    totalElement.textContent = slider04Data[slider04Data.length - 1].year;
                }

                // Update current year (show first year)
                const currentElement = document.getElementById('gpt5sw-04-current');
                if (currentElement) {
                    currentElement.textContent = slider04Data[0].year;
                }
            }

            // Initialize Swiper 04 with vertical direction
            function initSwiper04() {
                const swiperElement = document.querySelector('.gpt5sw-slider-04 .swiper');
                if (!swiperElement) return;

                swiper04 = new Swiper(swiperElement, {
                    // Vertical direction
                    direction: 'vertical',
                    loop: false,
                    speed: 800,
                    
                    // Autoplay
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },

                    // Slides settings
                    slidesPerView: 1,
                    spaceBetween: 0,

                    // Touch settings
                    touchRatio: 1,
                    touchAngle: 45,
                    simulateTouch: true,

                    // Keyboard control
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },

                    // Mouse wheel
                    mousewheel: {
                        enabled: true,
                        sensitivity: 1,
                    },

                    // Accessibility
                    a11y: {
                        enabled: true,
                        prevSlideMessage: '前の年代',
                        nextSlideMessage: '次の年代',
                        firstSlideMessage: '最初の年代',
                        lastSlideMessage: '最後の年代',
                    },

                    // Watch for changes
                    observer: true,
                    observeParents: true,

                    // Callbacks
                    on: {
                        slideChange: function () {
                            updateSlider04Counter();
                        },
                        init: function () {
                            console.log('Swiper 04 initialized successfully');
                        }
                    }
                });
            }

            // Setup custom controls for slider 04
            function setupSlider04Controls() {
                // Navigation buttons
                const nextBtn = document.querySelector('.gpt5sw-04-next');
                const prevBtn = document.querySelector('.gpt5sw-04-prev');
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', function() {
                        if (swiper04) swiper04.slideNext();
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', function() {
                        if (swiper04) swiper04.slidePrev();
                    });
                }

                // Auto control button
                const autoControlBtn = document.getElementById('gpt5sw-04-auto-control');
                const autoIcon = document.getElementById('gpt5sw-04-auto-icon');
                const autoText = document.getElementById('gpt5sw-04-auto-text');
                
                if (autoControlBtn) {
                    autoControlBtn.addEventListener('click', function() {
                        if (swiper04IsPlaying) {
                            swiper04.autoplay.stop();
                            autoIcon.textContent = '▶';
                            autoText.textContent = '自動進行開始';
                            swiper04IsPlaying = false;
                        } else {
                            swiper04.autoplay.start();
                            autoIcon.textContent = '⏸';
                            autoText.textContent = '自動進行停止';
                            swiper04IsPlaying = true;
                        }
                    });
                }
            }

            // Update year counter for slider 04
            function updateSlider04Counter() {
                const currentElement = document.getElementById('gpt5sw-04-current');
                if (!currentElement || !swiper04) return;
                
                const currentIndex = swiper04.activeIndex;
                const currentYear = slider04Data[currentIndex]?.year || '2020';
                currentElement.textContent = currentYear;
            }

            // Slider 05: Interactive 3D Cube Slider
            function initSwiper05() {
                const container = document.querySelector('.gpt5sw-slider-05');
                if (!container) return;

                const swiperElement = container.querySelector('.swiper');
                const swiperWrapper = swiperElement.querySelector('.swiper-wrapper');
                const nextBtn = container.querySelector('.gpt5sw-05-next');
                const prevBtn = container.querySelector('.gpt5sw-05-prev');
                const autoplayBtn = container.querySelector('#gpt5sw-05-autoplay');

                // Generate slides from data
                slider05Data.forEach((item, index) => {
                    const slideDiv = document.createElement('div');
                    slideDiv.className = 'swiper-slide';
                    slideDiv.innerHTML = `
                        <div class="cube-card">
                            <div class="cube-face cube-front">
                                <div class="cube-icon">${item.icon}</div>
                                <h3 class="cube-title">${item.title}</h3>
                                <p class="cube-description">${item.description}</p>
                            </div>
                            <div class="cube-face cube-back">
                                <div class="cube-icon">${item.icon}</div>
                                <h3 class="cube-title">詳細情報</h3>
                                <div class="cube-stats">
                                    <div class="cube-stat">
                                        <span class="stat-number">${item.stat1.number}</span>
                                        <div class="stat-label">${item.stat1.label}</div>
                                    </div>
                                    <div class="cube-stat">
                                        <span class="stat-number">${item.stat2.number}</span>
                                        <div class="stat-label">${item.stat2.label}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    swiperWrapper.appendChild(slideDiv);
                });

                // Initialize Swiper
                swiper05 = new Swiper(swiperElement, {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    centeredSlides: true,
                    effect: 'coverflow',
                    coverflowEffect: {
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 2,
                        slideShadows: false,
                    },
                    loop: true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },
                    speed: 800,
                    grabCursor: true,
                    pagination: {
                        el: container.querySelector('.swiper-pagination'),
                        clickable: true,
                        dynamicBullets: true,
                    },
                    navigation: {
                        nextEl: nextBtn,
                        prevEl: prevBtn,
                    },
                    on: {
                        slideChange: function() {
                            updateSwiper05Counter();
                        },
                        init: function() {
                            updateSwiper05Counter();
                        },
                    },
                });

                // Autoplay control
                if (autoplayBtn) {
                    autoplayBtn.addEventListener('click', function() {
                        const autoIcon = document.getElementById('gpt5sw-05-auto-icon');
                        const autoText = document.getElementById('gpt5sw-05-auto-text');
                        
                        if (swiper05IsPlaying) {
                            swiper05.autoplay.stop();
                            swiper05IsPlaying = false;
                            autoIcon.textContent = '▶';
                            autoText.textContent = '自動進行開始';
                        } else {
                            swiper05.autoplay.start();
                            swiper05IsPlaying = true;
                            autoIcon.textContent = '⏸';
                            autoText.textContent = '自動進行停止';
                        }
                    });
                }

                console.log('Swiper 05 (Interactive 3D Cube) initialized');
            }

            // =====================================
            // Swiper 06: Premium Product Slider
            // =====================================

            let swiper06Main = null;
            let swiper06Thumbs = null;
            let swiper06IsPlaying = true;

            // Premium Product Data
            const premiumProductData = [
                {
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop',
                    thumbImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=80&fit=crop',
                    category: 'Electronics',
                    title: 'Premium Wireless Headphones',
                    description: '高品質なワイヤレスヘッドフォン。ノイズキャンセリング機能搭載で、クリアな音質を実現。',
                    specs: ['30時間連続再生', 'ANCテクノロジー', '急速充電対応'],
                    price: '¥29,800',
                    badge: 'New',
                    badgeClass: ''
                },
                {
                    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=400&fit=crop',
                    thumbImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=80&fit=crop',
                    category: 'Wearables',
                    title: 'Advanced Smartwatch Pro',
                    description: '多機能スマートウォッチ。健康管理から通知機能まで、日常をサポートする最新技術。',
                    specs: ['GPS内蔵', '心拍数モニター', '防水機能'],
                    price: '¥45,000',
                    badge: 'Premium',
                    badgeClass: 'premium'
                },
                {
                    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop',
                    thumbImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=80&fit=crop',
                    category: 'Computing',
                    title: 'Ultra-Thin Laptop',
                    description: '軽量でパワフルなウルトラブック。仕事からクリエイティブワークまで幅広く対応。',
                    specs: ['16GB RAM', '512GB SSD', '10時間バッテリー'],
                    price: '¥159,800',
                    badge: 'Sale',
                    badgeClass: 'sale'
                },
                {
                    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop',
                    thumbImage: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=80&fit=crop',
                    category: 'Photography',
                    title: 'Professional DSLR Camera',
                    description: 'プロ仕様のデジタル一眼レフカメラ。高解像度センサーで美しい写真を撮影。',
                    specs: ['24.2MP センサー', '4K動画撮影', 'Wi-Fi内蔵'],
                    price: '¥89,800',
                    badge: 'Featured',
                    badgeClass: ''
                }
            ];

            function initSwiper06PremiumProduct() {
                const container = document.querySelector('.gpt5sw-sl06-container');
                if (!container) {
                    console.error('Premium Product Slider container not found');
                    return;
                }

                try {
                    // Initialize thumbnails swiper first
                    const thumbsElement = container.querySelector('.gpt5sw-sl06-thumbs-swiper');
                    if (thumbsElement) {
                        swiper06Thumbs = new Swiper(thumbsElement, {
                            spaceBetween: 20,
                            slidesPerView: 4,
                            freeMode: true,
                            watchSlidesProgress: true,
                            centeredSlides: false,
                            breakpoints: {
                                320: {
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 15
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 20
                                }
                            }
                        });
                        console.log('Thumbnails swiper initialized:', swiper06Thumbs);
                    }

                    // Initialize main swiper
                    const mainElement = container.querySelector('.gpt5sw-sl06-main');
                    if (mainElement) {
                        swiper06Main = new Swiper(mainElement, {
                            spaceBetween: 30,
                    loop: true,
                    speed: 600,
                            effect: 'slide',
                            
                            // Autoplay
                    autoplay: {
                                delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },

                            // Navigation
                    navigation: {
                                nextEl: container.querySelector('.gpt5sw-sl06-next'),
                                prevEl: container.querySelector('.gpt5sw-sl06-prev'),
                            },

                            // Pagination
                            pagination: {
                                el: container.querySelector('.gpt5sw-sl06-pagination'),
                                clickable: true,
                                dynamicBullets: true,
                            },

                            // Thumbs
                            thumbs: {
                                swiper: swiper06Thumbs,
                            },

                            // Keyboard control
                            keyboard: {
                                enabled: true,
                                onlyInViewport: true,
                            },

                            // Mouse wheel
                            mousewheel: {
                                enabled: true,
                                sensitivity: 1,
                            },

                            // Accessibility
                            a11y: {
                                enabled: true,
                                prevSlideMessage: '前の商品',
                                nextSlideMessage: '次の商品',
                            },

                            // Callbacks
                    on: {
                        slideChange: function() {
                                    updatePremiumProductCounter();
                        },
                        init: function() {
                                    updatePremiumProductCounter();
                                    console.log('Premium Product Slider initialized successfully');
                                }
                            }
                        });
                        console.log('Main swiper initialized:', swiper06Main);
                    }

                    // Initialize controls
                    initPremiumProductControls(container);
                    
                    console.log('Swiper 06 (Premium Product Slider) initialized');
                
                } catch (error) {
                    console.error('Premium Product Slider initialization failed:', error);
                }
            }

            function initPremiumProductControls(container) {
                // Autoplay control
                const autoplayBtn = container.querySelector('#gpt5sw-sl06-autoplay');
                if (autoplayBtn) {
                    autoplayBtn.addEventListener('click', function() {
                        const autoIcon = document.getElementById('gpt5sw-sl06-auto-icon');
                        const autoText = document.getElementById('gpt5sw-sl06-auto-text');
                        
                        if (swiper06IsPlaying && swiper06Main) {
                            swiper06Main.autoplay.stop();
                            swiper06IsPlaying = false;
                            autoIcon.textContent = '▶';
                            autoText.textContent = '自動再生開始';
                        } else if (swiper06Main) {
                            swiper06Main.autoplay.start();
                            swiper06IsPlaying = true;
                            autoIcon.textContent = '⏸';
                            autoText.textContent = '自動再生停止';
                        }
                    });
                }

                // Product buttons click handlers
                const productBtns = container.querySelectorAll('.gpt5sw-sl06-btn');
                productBtns.forEach((btn, index) => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log(`Product ${index + 1} details clicked`);
                        // Add your product details handling here
                    });
                });
            }

            function updatePremiumProductCounter() {
                if (!swiper06Main) return;
                
                const currentElement = document.getElementById('gpt5sw-sl06-current');
                const totalElement = document.getElementById('gpt5sw-sl06-total');
                
                if (currentElement && totalElement) {
                    const realIndex = swiper06Main.realIndex + 1;
                    const total = premiumProductData.length;
                    currentElement.textContent = realIndex;
                    totalElement.textContent = total;
                }
            }

            // =====================================
            // Swiper 07: Minimal Card Slider
            // =====================================

            let swiper07Main = null;
            let swiper07Thumbs = null;
            let swiper07IsPlaying = true;

            // Minimal Card Service Data
            const minimalCardData = [
                {
                    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=400&fit=crop',
                    thumbImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=80&fit=crop',
                    category: 'Web Design',
                    title: 'モダンWebデザイン',
                    description: 'ユーザー体験を重視したモダンで美しいWebサイトデザインを提供。レスポンシブ対応で全デバイスに最適化されたデザインをお届けします。',
                    thumbLabel: 'Web Design'
                },
                {
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop',
                    thumbImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=80&fit=crop',
                    category: 'Marketing',
                    title: 'デジタルマーケティング',
                    description: 'データドリブンなマーケティング戦略で、ROIを最大化。SEO、SNS、コンテンツマーケティングを統合したアプローチで成果を実現します。',
                    thumbLabel: 'Marketing'
                },
                {
                    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=400&fit=crop',
                    thumbImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=80&fit=crop',
                    category: 'Development',
                    title: 'モバイルアプリ開発',
                    description: 'iOS・Android対応のネイティブアプリ開発。ユーザビリティを重視した直感的なインターフェースで、ビジネス価値を最大化するアプリを制作します。',
                    thumbLabel: 'Development'
                },
                {
                    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=400&fit=crop',
                    thumbImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&h=80&fit=crop',
                    category: 'Consulting',
                    title: 'ビジネス戦略コンサルティング',
                    description: '企業の成長戦略立案から実行支援まで。豊富な経験と実績に基づいた戦略的アドバイスで、持続可能なビジネス成長をサポートします。',
                    thumbLabel: 'Consulting'
                }
            ];

            function initSwiper07MinimalCard() {
                const container = document.querySelector('.gpt5sw-sl07-container');
                if (!container) {
                    console.error('Minimal Card Slider container not found');
                    return;
                }

                try {
                    // Initialize thumbnails swiper first
                    const thumbsElement = container.querySelector('.gpt5sw-sl07-thumbs-swiper');
                    if (thumbsElement) {
                        swiper07Thumbs = new Swiper(thumbsElement, {
                            spaceBetween: 16,
                            slidesPerView: 4,
                            freeMode: true,
                            watchSlidesProgress: true,
                            centeredSlides: false,
                            breakpoints: {
                                320: {
                                    slidesPerView: 2,
                                    spaceBetween: 12
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 14
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 16
                                }
                            }
                        });
                        console.log('Minimal Card Thumbnails swiper initialized:', swiper07Thumbs);
                    }

                    // Initialize main swiper
                    const mainElement = container.querySelector('.gpt5sw-sl07-main');
                    if (mainElement) {
                        swiper07Main = new Swiper(mainElement, {
                            spaceBetween: 30,
                            loop: true,
                            speed: 500,
                            effect: 'slide',
                            
                            // Autoplay
                            autoplay: {
                                delay: 6000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            },

                            // Navigation
                            navigation: {
                                nextEl: container.querySelector('.gpt5sw-sl07-nav-next'),
                                prevEl: container.querySelector('.gpt5sw-sl07-nav-prev'),
                            },

                            // Pagination
                            pagination: {
                                el: container.querySelector('.gpt5sw-sl07-pagination'),
                                clickable: true,
                                dynamicBullets: false,
                            },

                            // Thumbs
                            thumbs: {
                                swiper: swiper07Thumbs,
                            },

                            // Keyboard control
                            keyboard: {
                                enabled: true,
                                onlyInViewport: true,
                            },

                            // Mouse wheel
                            mousewheel: {
                                enabled: true,
                                sensitivity: 1,
                            },

                            // Accessibility
                            a11y: {
                                enabled: true,
                                prevSlideMessage: '前のサービス',
                                nextSlideMessage: '次のサービス',
                            },

                            // Callbacks
                            on: {
                                slideChange: function() {
                                    updateMinimalCardCounter();
                                },
                                init: function() {
                                    updateMinimalCardCounter();
                                    console.log('Minimal Card Slider initialized successfully');
                                }
                            }
                        });
                        console.log('Minimal Card Main swiper initialized:', swiper07Main);
                    }

                    // Initialize controls
                    initMinimalCardControls(container);
                    
                    console.log('Swiper 07 (Minimal Card Slider) initialized');
                    
                } catch (error) {
                    console.error('Minimal Card Slider initialization failed:', error);
                }
            }

            function initMinimalCardControls(container) {
                // Autoplay control
                const autoplayBtn = container.querySelector('#gpt5sw-sl07-autoplay');
                if (autoplayBtn) {
                    autoplayBtn.addEventListener('click', function() {
                        const autoIcon = document.getElementById('gpt5sw-sl07-auto-icon');
                        const autoText = document.getElementById('gpt5sw-sl07-auto-text');
                        
                        if (swiper07IsPlaying && swiper07Main) {
                            swiper07Main.autoplay.stop();
                            swiper07IsPlaying = false;
                            autoIcon.textContent = '▶';
                            autoText.textContent = '自動再生開始';
                        } else if (swiper07Main) {
                            swiper07Main.autoplay.start();
                            swiper07IsPlaying = true;
                            autoIcon.textContent = '⏸';
                            autoText.textContent = '自動再生停止';
                        }
                    });
                }

                // Service buttons click handlers
                const serviceBtns = container.querySelectorAll('.gpt5sw-sl07-btn');
                serviceBtns.forEach((btn, index) => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log(`Service ${index + 1} details clicked`);
                        // Add your service details handling here
                    });
                });
            }

            function updateMinimalCardCounter() {
                if (!swiper07Main) return;
                
                const currentElement = document.getElementById('gpt5sw-sl07-current');
                const totalElement = document.getElementById('gpt5sw-sl07-total');
                
                if (currentElement && totalElement) {
                    const realIndex = swiper07Main.realIndex + 1;
                    const total = minimalCardData.length;
                    currentElement.textContent = realIndex;
                    totalElement.textContent = total;
                }
            }

            // =====================================
            // Swiper 08: Mobile Native Card Slider
            // =====================================

            let swiper08Main = null;
            let swiper08IsPlaying = true;

            // Mobile Native Card Data
            const mobileNativeCardData = [
                {
                    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=250&fit=crop',
                    category: 'Travel',
                    title: '世界を旅する体験',
                    description: '忘れられない旅の思い出を作りませんか？美しい景色と文化に触れる特別な体験をご提供します。',
                    price: '¥89,000〜',
                    rating: '★★★★★',
                    badge: 'Popular',
                    badgeClass: ''
                },
                {
                    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=250&fit=crop',
                    category: 'Technology',
                    title: '次世代テクノロジー',
                    description: '最新のAI技術とイノベーションで、ビジネスの可能性を広げる革新的なソリューションを提供します。',
                    price: 'お問い合わせ',
                    rating: '★★★★☆',
                    badge: 'New',
                    badgeClass: 'new'
                },
                {
                    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=250&fit=crop',
                    category: 'Wellness',
                    title: '健康とウェルネス',
                    description: '心と体の健康をサポートする包括的なウェルネスプログラム。専門家による個別指導で理想の自分へ。',
                    price: '¥12,000/月',
                    rating: '★★★★★',
                    badge: 'Trending',
                    badgeClass: 'trending'
                },
                {
                    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=250&fit=crop',
                    category: 'Education',
                    title: '学習とスキルアップ',
                    description: '現代に必要なスキルを効率的に学べるオンライン学習プラットフォーム。あなたの成長をサポートします。',
                    price: '¥2,980/月',
                    rating: '★★★★☆',
                    badge: 'Featured',
                    badgeClass: 'featured'
                }
            ];

            function initSwiper08MobileNative() {
                const container = document.querySelector('.gpt5sw-sl08-container');
                if (!container) {
                    console.error('Mobile Native Card Slider container not found');
                    return;
                }

                try {
                    // Initialize main swiper
                    const mainElement = container.querySelector('.gpt5sw-sl08-main');
                    if (mainElement) {
                        swiper08Main = new Swiper(mainElement, {
                            spaceBetween: 20,
                            loop: true,
                            speed: 500,
                            effect: 'slide',
                            centeredSlides: true,
                            
                            // Autoplay
                            autoplay: {
                                delay: 6000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            },

                            // Pagination
                            pagination: {
                                el: container.querySelector('.gpt5sw-sl08-pagination'),
                                clickable: true,
                                dynamicBullets: false,
                            },

                            // Touch settings (Mobile Native)
                            touchRatio: 1,
                            touchAngle: 45,
                            grabCursor: true,
                            touchStartPreventDefault: false,
                            touchMoveStopPropagation: true,

                            // Keyboard control
                            keyboard: {
                                enabled: true,
                                onlyInViewport: true,
                            },

                            // Mouse wheel
                            mousewheel: {
                                enabled: true,
                                sensitivity: 1,
                                forceToAxis: true,
                            },

                            // Accessibility
                            a11y: {
                                enabled: true,
                                prevSlideMessage: '前のカード',
                                nextSlideMessage: '次のカード',
                            },

                            // Responsive breakpoints
                            breakpoints: {
                                320: {
                                    spaceBetween: 15,
                                },
                                768: {
                                    spaceBetween: 20,
                                },
                                1024: {
                                    spaceBetween: 25,
                                }
                            },

                            // Callbacks
                            on: {
                                slideChange: function() {
                                    updateMobileNativeCounter();
                                },
                                init: function() {
                                    updateMobileNativeCounter();
                                    console.log('Mobile Native Card Slider initialized successfully');
                                },
                                touchStart: function() {
                                    // Add mobile-specific touch feedback
                                    this.el.style.transform = 'scale(0.98)';
                                },
                                touchEnd: function() {
                                    // Remove touch feedback
                                    this.el.style.transform = 'scale(1)';
                                }
                            }
                        });
                        console.log('Mobile Native Main swiper initialized:', swiper08Main);
                    }

                    // Initialize controls
                    initMobileNativeControls(container);
                    
                    console.log('Swiper 08 (Mobile Native Card Slider) initialized');
                    
                } catch (error) {
                    console.error('Mobile Native Card Slider initialization failed:', error);
                }
            }

            function initMobileNativeControls(container) {
                // Autoplay control
                const autoplayBtn = container.querySelector('#gpt5sw-sl08-autoplay');
                if (autoplayBtn) {
                    autoplayBtn.addEventListener('click', function() {
                        const autoIcon = document.getElementById('gpt5sw-sl08-auto-icon');
                        const autoText = document.getElementById('gpt5sw-sl08-auto-text');
                        
                        if (swiper08IsPlaying && swiper08Main) {
                            swiper08Main.autoplay.stop();
                            swiper08IsPlaying = false;
                            autoIcon.textContent = '▶';
                            autoText.textContent = '自動再生開始';
                        } else if (swiper08Main) {
                            swiper08Main.autoplay.start();
                            swiper08IsPlaying = true;
                            autoIcon.textContent = '⏸';
                            autoText.textContent = '自動再生停止';
                        }
                    });
                }

                // Card buttons click handlers
                const cardBtns = container.querySelectorAll('.gpt5sw-sl08-btn');
                cardBtns.forEach((btn, index) => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Add mobile-like button press animation
                        btn.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            btn.style.transform = 'scale(1)';
                        }, 150);
                        
                        console.log(`Card ${index + 1} details clicked`);
                        // Add your card details handling here
                    });
                });

                // Add swipe gesture indicators (mobile-like)
                let startX = 0;
                let startY = 0;
                
                container.addEventListener('touchstart', function(e) {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                }, { passive: true });

                container.addEventListener('touchmove', function(e) {
                    if (!startX || !startY) return;
                    
                    const xUp = e.touches[0].clientX;
                    const yUp = e.touches[0].clientY;
                    
                    const xDiff = startX - xUp;
                    const yDiff = startY - yUp;
                    
                    // Add subtle visual feedback during swipe
                    if (Math.abs(xDiff) > Math.abs(yDiff)) {
                        if (xDiff > 0) {
                            // Swiping left
                            container.style.transform = 'translateX(-2px)';
                        } else {
                            // Swiping right
                            container.style.transform = 'translateX(2px)';
                        }
                    }
                }, { passive: true });

                container.addEventListener('touchend', function() {
                    // Reset visual feedback
                    container.style.transform = 'translateX(0)';
                    startX = 0;
                    startY = 0;
                }, { passive: true });
            }

            function updateMobileNativeCounter() {
                if (!swiper08Main) return;
                
                const currentElement = document.getElementById('gpt5sw-sl08-current');
                const totalElement = document.getElementById('gpt5sw-sl08-total');
                
                if (currentElement && totalElement) {
                    const realIndex = swiper08Main.realIndex + 1;
                    const total = mobileNativeCardData.length;
                    currentElement.textContent = realIndex;
                    totalElement.textContent = total;
                }
            }

            // =====================================
            // Swiper 09: Liquid Flow Slider
            // =====================================

            let swiper09Main = null;
            let swiper09IsPlaying = true;

            // Liquid Flow Environmental Data
            const liquidFlowData = [
                {
                    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=300&fit=crop',
                    category: 'Ocean',
                    title: '海洋保護プロジェクト',
                    description: '美しい海を守るための革新的な取り組み。持続可能な未来のために、私たちと一緒に海洋環境を保護しませんか？',
                    impact: '影響度: 高',
                    participants: '参加者: 12,500人'
                },
                {
                    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=300&fit=crop',
                    category: 'Forest',
                    title: '森林再生イニシアティブ',
                    description: '失われた森を取り戻す大規模な植林プロジェクト。緑豊かな地球を次世代に残すための取り組みにご参加ください。',
                    impact: '影響度: 最高',
                    participants: '参加者: 8,900人'
                },
                {
                    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=300&fit=crop',
                    category: 'Energy',
                    title: 'クリーンエネルギー革命',
                    description: '再生可能エネルギーによる持続可能な社会の実現。太陽光、風力、水力を活用した次世代エネルギーシステム。',
                    impact: '影響度: 高',
                    participants: '参加者: 15,200人'
                },
                {
                    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=300&fit=crop',
                    category: 'Water',
                    title: '水資源保全プログラム',
                    description: '貴重な水資源を守り、きれいな水を世界中に届ける取り組み。技術革新と地域連携で水不足問題の解決を目指します。',
                    impact: '影響度: 最高',
                    participants: '参加者: 20,100人'
                }
            ];

            function initSwiper09LiquidFlow() {
                const container = document.querySelector('.gpt5sw-sl09-container');
                if (!container) {
                    console.error('Liquid Flow Slider container not found');
                    return;
                }

                try {
                    // Initialize main swiper
                    const mainElement = container.querySelector('.gpt5sw-sl09-main');
                    if (mainElement) {
                        swiper09Main = new Swiper(mainElement, {
                            spaceBetween: 30,
                            loop: true,
                            speed: 600,
                            effect: 'slide',
                            
                            // Autoplay (slower for liquid effects)
                            autoplay: {
                                delay: 7000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            },

                            // Navigation
                            navigation: {
                                nextEl: container.querySelector('.gpt5sw-sl09-nav-next'),
                                prevEl: container.querySelector('.gpt5sw-sl09-nav-prev'),
                            },

                            // Pagination
                            pagination: {
                                el: container.querySelector('.gpt5sw-sl09-pagination'),
                                clickable: true,
                                dynamicBullets: false,
                            },

                            // Keyboard control
                            keyboard: {
                                enabled: true,
                                onlyInViewport: true,
                            },

                            // Mouse wheel
                            mousewheel: {
                                enabled: true,
                                sensitivity: 1,
                                forceToAxis: true,
                            },

                            // Accessibility
                            a11y: {
                                enabled: true,
                                prevSlideMessage: '前の環境プロジェクト',
                                nextSlideMessage: '次の環境プロジェクト',
                            },

                            // Responsive breakpoints
                            breakpoints: {
                                320: {
                                    spaceBetween: 20,
                                },
                                768: {
                                    spaceBetween: 25,
                                },
                                1024: {
                                    spaceBetween: 30,
                                }
                            },

                            // Callbacks
                            on: {
                                slideChange: function() {
                                    updateLiquidFlowCounter();
                                    triggerLiquidEffects();
                                },
                                init: function() {
                                    updateLiquidFlowCounter();
                                    initLiquidEffects();
                                    console.log('Liquid Flow Slider initialized successfully');
                                }
                            }
                        });
                        console.log('Liquid Flow Main swiper initialized:', swiper09Main);
                    }

                    // Initialize controls
                    initLiquidFlowControls(container);
                    
                    console.log('Swiper 09 (Liquid Flow Slider) initialized');
                    
                } catch (error) {
                    console.error('Liquid Flow Slider initialization failed:', error);
                }
            }

            function initLiquidFlowControls(container) {
                // Autoplay control
                const autoplayBtn = container.querySelector('#gpt5sw-sl09-autoplay');
                if (autoplayBtn) {
                    autoplayBtn.addEventListener('click', function() {
                        const autoIcon = document.getElementById('gpt5sw-sl09-auto-icon');
                        const autoText = document.getElementById('gpt5sw-sl09-auto-text');
                        
                        if (swiper09IsPlaying && swiper09Main) {
                            swiper09Main.autoplay.stop();
                            swiper09IsPlaying = false;
                            autoIcon.textContent = '▶';
                            autoText.textContent = '自動再生開始';
                        } else if (swiper09Main) {
                            swiper09Main.autoplay.start();
                            swiper09IsPlaying = true;
                            autoIcon.textContent = '⏸';
                            autoText.textContent = '自動再生停止';
                        }
                    });
                }

                // Project buttons click handlers
                const projectBtns = container.querySelectorAll('.gpt5sw-sl09-btn');
                projectBtns.forEach((btn, index) => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Trigger liquid ripple effect
                        const ripple = btn.querySelector('.gpt5sw-sl09-btn-ripple');
                        if (ripple) {
                            ripple.style.width = '300px';
                            ripple.style.height = '300px';
                            setTimeout(() => {
                                ripple.style.width = '0';
                                ripple.style.height = '0';
                            }, 600);
                        }
                        
                        console.log(`Environmental Project ${index + 1} participation clicked`);
                        // Add your project participation handling here
                    });
                });

                // Navigation buttons ripple effects
                const navBtns = container.querySelectorAll('.gpt5sw-sl09-nav-prev, .gpt5sw-sl09-nav-next');
                navBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const ripple = btn.querySelector('.gpt5sw-sl09-nav-ripple');
                        if (ripple) {
                            ripple.style.width = '120px';
                            ripple.style.height = '120px';
                            setTimeout(() => {
                                ripple.style.width = '0';
                                ripple.style.height = '0';
                            }, 600);
                        }
                        
                        // Trigger additional liquid effects on navigation
                        triggerLiquidEffects();
                    });
                });
            }

            function initLiquidEffects() {
                // Initialize background liquid animations
                const ripples = document.querySelectorAll('.gpt5sw-sl09-ripple');
                const droplets = document.querySelectorAll('.gpt5sw-sl09-droplet');
                
                // Ensure animations are running
                ripples.forEach(ripple => {
                    ripple.style.animationPlayState = 'running';
                });
                
                droplets.forEach(droplet => {
                    droplet.style.animationPlayState = 'running';
                });
                
                console.log('Liquid effects initialized');
            }

            function triggerLiquidEffects() {
                // Create additional ripple effect on slide change
                const liquidBg = document.querySelector('.gpt5sw-sl09-liquid-bg');
                if (liquidBg) {
                    const newRipple = document.createElement('div');
                    newRipple.className = 'gpt5sw-sl09-ripple';
                    newRipple.style.top = Math.random() * 70 + 15 + '%';
                    newRipple.style.left = Math.random() * 70 + 15 + '%';
                    newRipple.style.width = Math.random() * 100 + 100 + 'px';
                    newRipple.style.height = newRipple.style.width;
                    newRipple.style.animationDuration = Math.random() * 2 + 3 + 's';
                    
                    liquidBg.appendChild(newRipple);
                    
                    // Remove the ripple after animation
                    setTimeout(() => {
                        if (liquidBg.contains(newRipple)) {
                            liquidBg.removeChild(newRipple);
                        }
                    }, 5000);
                }
                
                // Enhance wave effects
                const waveOverlays = document.querySelectorAll('.gpt5sw-sl09-wave-overlay');
                waveOverlays.forEach(wave => {
                    wave.style.animationDuration = Math.random() * 1 + 2.5 + 's';
                });
            }

            function updateLiquidFlowCounter() {
                if (!swiper09Main) return;
                
                const currentElement = document.getElementById('gpt5sw-sl09-current');
                const totalElement = document.getElementById('gpt5sw-sl09-total');
                
                if (currentElement && totalElement) {
                    const realIndex = swiper09Main.realIndex + 1;
                    const total = liquidFlowData.length;
                    currentElement.textContent = realIndex;
                    totalElement.textContent = total;
                }
            }

            // =====================================
            // Swiper 10: Split Dual Slider
            // =====================================

            let swiper10Left = null;
            let swiper10Right = null;
            let swiper10IsPlaying = true;

            // Split Dual Slider Data
            const splitDualImageData = [
                {
                    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                    alt: 'Mountain Landscape'
                },
                {
                    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
                    alt: 'City Skyline'
                },
                {
                    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
                    alt: 'Technology'
                },
                {
                    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
                    alt: 'Lifestyle'
                }
            ];

            const splitDualContentData = [
                {
                    category: 'Business',
                    title: 'ビジネス戦略の革新',
                    description: '現代のビジネス環境において、革新的な戦略とデジタル変革が成功の鍵となります。データ分析と顧客インサイトを活用し、競合他社との差別化を図ります。',
                    tags: ['戦略', '革新', '成長']
                },
                {
                    category: 'Education',
                    title: '次世代の学習体験',
                    description: 'テクノロジーを活用した個別最適化学習により、一人ひとりの可能性を最大限に引き出します。AIとVRを組み合わせた没入型の教育プラットフォームを提供。',
                    tags: ['学習', 'AI', '個別化']
                },
                {
                    category: 'Health',
                    title: 'ウェルネス・ライフスタイル',
                    description: '心と体の健康を総合的にサポートする包括的なウェルネスプログラム。栄養管理、運動指導、メンタルヘルスケアを統合したアプローチで理想の生活を実現。',
                    tags: ['健康', '運動', '栄養']
                },
                {
                    category: 'Entertainment',
                    title: 'デジタル・エンターテイメント',
                    description: '最新のテクノロジーを駆使したエンターテイメント体験。VR、AR、AIを活用したインタラクティブなコンテンツで、新しい娯楽の形を提案します。',
                    tags: ['VR', 'AR', '体験']
                }
            ];

            function initSwiper10SplitDual() {
                const container = document.querySelector('.gpt5sw-sl10-container');
                if (!container) {
                    console.error('Split Dual Slider container not found');
                    return;
                }

                try {
                    // Initialize left swiper (images)
                    const leftElement = container.querySelector('.gpt5sw-sl10-image-swiper');
                    if (leftElement) {
                        swiper10Left = new Swiper(leftElement, {
                            spaceBetween: 0,
                            loop: true,
                            speed: 500,
                            effect: 'slide',
                            
                            // Autoplay (6 seconds)
                            autoplay: {
                                delay: 6000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            },

                            // Navigation (main navigation)
                            navigation: {
                                nextEl: container.querySelector('.gpt5sw-sl10-main-next'),
                                prevEl: container.querySelector('.gpt5sw-sl10-main-prev'),
                            },

                            // Pagination (main pagination)
                            pagination: {
                                el: container.querySelector('.gpt5sw-sl10-main-pagination'),
                                clickable: true,
                                dynamicBullets: false,
                            },

                            // Keyboard control
                            keyboard: {
                                enabled: true,
                                onlyInViewport: true,
                            },

                            // Mouse wheel
                            mousewheel: {
                                enabled: true,
                                sensitivity: 1,
                                forceToAxis: true,
                            },

                            // Accessibility
                            a11y: {
                                enabled: true,
                                prevSlideMessage: '前の画像',
                                nextSlideMessage: '次の画像',
                            },

                            // Callbacks
                            on: {
                                slideChange: function() {
                                    updateSplitDualCounters();
                                    // Always sync right slider
                                    if (swiper10Right) {
                                        swiper10Right.slideToLoop(this.realIndex);
                                    }
                                },
                                init: function() {
                                    updateSplitDualCounters();
                                    console.log('Split Dual Left Swiper initialized successfully');
                                }
                            }
                        });
                        console.log('Split Dual Left swiper initialized:', swiper10Left);
                    }

                    // Initialize right swiper (content)
                    const rightElement = container.querySelector('.gpt5sw-sl10-content-swiper');
                    if (rightElement) {
                        swiper10Right = new Swiper(rightElement, {
                            slidesPerView: 1,
                            spaceBetween: 0,
                            loop: true,
                            speed: 500,
                            effect: 'slide',
                            
                            // No autoplay for right slider (controlled by left)
                            autoplay: false,

                            // Keyboard control
                            keyboard: {
                                enabled: true,
                                onlyInViewport: true,
                            },

                            // Mouse wheel
                            mousewheel: {
                                enabled: true,
                                sensitivity: 1,
                                forceToAxis: true,
                            },

                            // Accessibility
                            a11y: {
                                enabled: true,
                                prevSlideMessage: '前のコンテンツ',
                                nextSlideMessage: '次のコンテンツ',
                            },

                            // Callbacks
                            on: {
                                init: function() {
                                    console.log('Split Dual Right Swiper initialized successfully');
                                }
                            }
                        });
                        console.log('Split Dual Right swiper initialized:', swiper10Right);
                    }

                    // Initialize controls
                    initSplitDualControls(container);
                    
                    console.log('Swiper 10 (Split Dual Slider) initialized');
                    
                } catch (error) {
                    console.error('Split Dual Slider initialization failed:', error);
                }
            }

            function initSplitDualControls(container) {
                // Autoplay control
                const autoplayBtn = container.querySelector('#gpt5sw-sl10-autoplay');
                if (autoplayBtn) {
                    autoplayBtn.addEventListener('click', function() {
                        const autoIcon = document.getElementById('gpt5sw-sl10-auto-icon');
                        const autoText = document.getElementById('gpt5sw-sl10-auto-text');
                        
                        if (swiper10IsPlaying) {
                            // Stop autoplay
                            if (swiper10Left) {
                                swiper10Left.autoplay.stop();
                                swiper10IsPlaying = false;
                            }
                            autoIcon.textContent = '▶';
                            autoText.textContent = '自動再生開始';
                        } else {
                            // Start autoplay
                            if (swiper10Left) {
                                swiper10Left.autoplay.start();
                                swiper10IsPlaying = true;
                            }
                            autoIcon.textContent = '⏸';
                            autoText.textContent = '自動再生停止';
                        }
                    });
                }

                // Content buttons click handlers
                const contentBtns = container.querySelectorAll('.gpt5sw-sl10-btn');
                contentBtns.forEach((btn, index) => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log(`Split Dual Content ${index + 1} details clicked`);
                        // Add your content details handling here
                    });
                });
            }

            function updateSplitDualCounters() {
                if (!swiper10Left) return;
                
                const leftCurrentElement = document.getElementById('gpt5sw-sl10-left-current');
                const leftTotalElement = document.getElementById('gpt5sw-sl10-left-total');
                const rightCurrentElement = document.getElementById('gpt5sw-sl10-right-current');
                const rightTotalElement = document.getElementById('gpt5sw-sl10-right-total');
                
                if (leftCurrentElement && leftTotalElement) {
                    const realIndex = swiper10Left.realIndex + 1;
                    const total = splitDualImageData.length;
                    leftCurrentElement.textContent = realIndex;
                    leftTotalElement.textContent = total;
                    
                    // Update right counter with same index (synchronized)
                    if (rightCurrentElement && rightTotalElement) {
                        rightCurrentElement.textContent = realIndex;
                        rightTotalElement.textContent = splitDualContentData.length;
                    }
                }
            }

            // Update counter for slider 05
            function updateSwiper05Counter() {
                if (!swiper05) return;
                
                const currentElement = document.getElementById('gpt5sw-05-current');
                const totalElement = document.getElementById('gpt5sw-05-total');
                
                if (currentElement && totalElement) {
                    const realIndex = swiper05.realIndex + 1;
                    const total = slider05Data.length;
                    currentElement.textContent = realIndex;
                    totalElement.textContent = total;
                }
            }

            // Slider 11: 円形オーバーラップスライダー
            let swiperSl11 = null;

            function initSwiperSl11() {
                const container = document.querySelector('.gpt5sw-sl11-container');
                if (!container) {
                    console.error('円形オーバーラップスライダー container not found');
                    return;
                }

                try {
                    swiperSl11 = new Swiper(container.querySelector('.gpt5sw-sl11-swiper'), {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        centeredSlides: true,
                        loop: true,
                        speed: 800,
                        initialSlide: 0,
                        
                        autoplay: {
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        },
                        
                        navigation: {
                            nextEl: container.querySelector('.gpt5sw-sl11-next'),
                            prevEl: container.querySelector('.gpt5sw-sl11-prev'),
                        },
                        
                        pagination: {
                            el: container.querySelector('.gpt5sw-sl11-pagination'),
                            clickable: true,
                        },
                        
                        keyboard: {
                            enabled: true,
                            onlyInViewport: true,
                        },
                        
                        grabCursor: true,
                        
                        breakpoints: {
                            // モバイル
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            // タブレット
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 25,
                            },
                            // デスクトップ
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            }
                        },
                        
                        on: {
                            init: function() {
                                console.log('円形オーバーラップスライダー initialized successfully');
                                updateSl11Progress();
                                updateSl11Counter();
                            },
                            slideChange: function() {
                                updateSl11Progress();
                                updateSl11Counter();
                            }
                        }
                    });
                    
                    // ボタンクリックイベント
                    container.addEventListener('click', function(e) {
                        if (e.target.classList.contains('gpt5sw-sl11-btn')) {
                            console.log('Circle button clicked:', e.target.closest('.gpt5sw-sl11-slide'));
                        }
                    });
                    
                } catch (error) {
                    console.error('円形オーバーラップスライダー initialization failed:', error);
                }
            }

            function updateSl11Progress() {
                if (!swiperSl11) return;
                
                const progressBar = document.querySelector('.gpt5sw-sl11-progress-bar');
                if (progressBar) {
                    const progress = ((swiperSl11.realIndex + 1) / 6) * 226;
                    progressBar.style.strokeDashoffset = 226 - progress;
                }
            }

            function updateSl11Counter() {
                if (!swiperSl11) return;
                
                const currentEl = document.getElementById('gpt5sw-sl11-current');
                const totalEl = document.getElementById('gpt5sw-sl11-total');
                
                if (currentEl && totalEl) {
                    currentEl.textContent = swiperSl11.realIndex + 1;
                    totalEl.textContent = '6';
                }
            }


            // DOM読み込み完了後に実行
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initSwiperSliders);
            } else {
                initSwiperSliders();
            }
        })();
    </script>
</body>

<?php get_footer(); ?>