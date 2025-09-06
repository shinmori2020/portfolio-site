<?php
/**
 * Template Name: GPT-5 Slider Lab 07（ブランドニュース）
 * Description: 全幅表示のカードスライダー。中央寄せ・無限ループ・チラ見せ対応。
 * Template Post Type: page
 */

if (!defined('ABSPATH')) { exit; }
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GPT5 Slider Lab 07 - Brand News</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8f9fa;
        }

        .gpt5bn-section {
            width: 100vw;
            padding: 60px 0;
            background-color: #f8f9fa;
            overflow: hidden;
            position: relative;
        }

        .gpt5bn-heading {
            text-align: center;
            margin-bottom: 40px;
            position: relative;
        }

        .gpt5bn-heading::before,
        .gpt5bn-heading::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 60px;
            height: 2px;
            background-color: #333;
        }

        .gpt5bn-heading::before {
            left: calc(50% - 150px);
        }

        .gpt5bn-heading::after {
            right: calc(50% - 150px);
        }

        .gpt5bn-title-en {
            font-size: 2.5rem;
            font-weight: bold;
            color: #333;
            margin: 0;
            letter-spacing: 0.1em;
        }

        .gpt5bn-title-ja {
            font-size: 1rem;
            color: #666;
            margin: 8px 0 0 0;
            font-weight: normal;
        }

        .gpt5bn-viewport {
            width: 100vw;
            padding: 0;
            position: relative;
            overflow: hidden;
        }

        .gpt5bn-track {
            display: flex;
            gap: 20px;
            transition: transform 450ms ease-out;
            will-change: transform;
            padding: 0 5vw;
        }

        .gpt5bn-card {
            flex-shrink: 0;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 300ms ease-out, opacity 300ms ease-out;
            position: relative;
        }

        .gpt5bn-card:hover {
            transform: scale(1.02);
        }

        .gpt5bn-card-image {
            aspect-ratio: 1 / 1;
            width: 100%;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
            background-color: #e9ecef;
            display: block;
        }

        .gpt5bn-card-content {
            padding: 16px;
        }

        .gpt5bn-card-title {
            font-size: 1rem;
            font-weight: 600;
            color: #333;
            margin: 0 0 8px 0;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: 2.8em;
        }

        .gpt5bn-card-date {
            font-size: 0.875rem;
            color: #666;
            margin-bottom: 4px;
        }

        .gpt5bn-card-brand {
            font-size: 0.875rem;
            color: #999;
            font-weight: 500;
        }

        .gpt5bn-nav {
            position: absolute;
            top: 85px;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            width: 72px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 300ms ease;
            z-index: 10;
        }

        .gpt5bn-nav:hover::before {
            background-color: #555;
        }
        
        .gpt5bn-nav:hover::after {
            border-color: #555;
        }

        .gpt5bn-nav:focus {
            outline: 2px solid #007bff;
            outline-offset: 2px;
        }

        .gpt5bn-nav--prev {
            left: 100px;
        }

        .gpt5bn-nav--next {
            right:100px;
        }

        .gpt5bn-nav svg {
            display: none;
        }
        
        /* 左側の矢印：斜め線＋横線 (＼ーーー) */
        .gpt5bn-nav--prev::before {
            content: '';
            position: absolute;
            width: 60px;
            height: 1px;
            background-color: #333;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            transition: all 300ms ease;
        }
        
        .gpt5bn-nav--prev::after {
            content: '';
            position: absolute;
            width: 12px;
            height: 1px;
            background-color: #333;
            top: 5%;
            right: 50px;
            transform: translateY(-50%) rotate(-45deg);
            transform-origin: right center;
            transition: all 300ms ease;
        }
        
        /* 右側の矢印：横線＋斜め線 (ーーー／) */
        .gpt5bn-nav--next::before {
            content: '';
            position: absolute;
            width: 60px;
            height: 1px;
            background-color: #333;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            transition: all 300ms ease;
        }
        
        .gpt5bn-nav--next::after {
            content: '';
            position: absolute;
            width: 12px;
            height: 1px;
            background-color: #333;
            top: 5%;
            left: 50px;
            transform: translateY(-50%) rotate(45deg);
            transform-origin: left center;
            transition: all 300ms ease;
        }

        .gpt5bn-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
            position: relative;
        }

        .gpt5bn-more {
            background: #333;
            color: white;
            border: none;
            padding: 12px 32px;
            font-size: 0.875rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 300ms ease;
        }

        .gpt5bn-more:hover {
            background: #555;
        }

        .gpt5bn-more:focus {
            outline: 2px solid #007bff;
            outline-offset: 2px;
        }

        .gpt5bn-status {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }

        /* Responsive breakpoints */
        @media (max-width: 599px) {
            .gpt5bn-track {
                gap: 16px;
                padding: 0 5vw;
            }

            .gpt5bn-card {
                width: calc(83.33vw - 8px);
            }

            .gpt5bn-title-en {
                font-size: 2rem;
            }

            .gpt5bn-heading::before,
            .gpt5bn-heading::after {
                width: 40px;
            }

            .gpt5bn-heading::before {
                left: calc(50% - 100px);
            }

            .gpt5bn-heading::after {
                right: calc(50% - 100px);
            }

            .gpt5bn-nav {
                top: 85px;
            }

            .gpt5bn-nav--prev {
                left: 5px;
            }

            .gpt5bn-nav--next {
                right: 5px;
            }
        }

        @media (min-width: 600px) and (max-width: 959px) {
            .gpt5bn-track {
                gap: 20px;
                padding: 0 6vw;
            }

            .gpt5bn-card {
                width: calc((88vw - 40px) / 3);
            }

            .gpt5bn-nav {
                top: 90px;
            }

            .gpt5bn-nav--prev {
                left: 20px;
            }

            .gpt5bn-nav--next {
                right: 20px;
            }
        }

        @media (min-width: 960px) {
            .gpt5bn-track {
                gap: 24px;
                padding: 0 7vw;
            }

            .gpt5bn-card {
                width: calc((86vw - 96px) / 5);
            }
        }
        @media (max-width: 400px) {
            .gpt5bn-nav--next::before{
                width: 30px;
                left: 30px;
            }
            .gpt5bn-nav--prev::before{
                width: 30px;
                right: 30px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .gpt5bn-track,
            .gpt5bn-card,
            .gpt5bn-nav {
                transition: none;
            }
        }

        /* 新しいスライダー用CSS */
        .gpt5pr-section {
            width: 100vw;
            padding: 80px 0;
            background: #667eea;
            overflow: hidden;
            position: relative;
        }

        .gpt5pr-heading {
            text-align: center;
            margin-bottom: 50px;
            position: relative;
        }

        .gpt5pr-heading::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            border: 1px solid rgba(255,255,255,0.4);
            border-radius: 50%;
            z-index: 0;
        }

        .gpt5pr-title-en {
            font-size: 2.8rem;
            font-weight: 700;
            color: white;
            margin: 0;
            letter-spacing: 0.15em;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .gpt5pr-title-ja {
            font-size: 1.1rem;
            color: rgba(255,255,255,0.9);
            margin: 12px 0 0 0;
            font-weight: 300;
            position: relative;
            z-index: 1;
        }

        .gpt5pr-viewport {
            width: 100vw;
            padding: 0;
            position: relative;
            overflow: hidden;
        }

        .gpt5pr-track {
            display: flex;
            gap: 30px;
            transition: transform 400ms ease;
            will-change: transform;
            padding: 0 5vw;
        }

        .gpt5pr-card {
            flex-shrink: 0;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 300ms ease;
            position: relative;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .gpt5pr-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .gpt5pr-card-image {
            aspect-ratio: 4 / 3;
            width: 100%;
            object-fit: cover;
            border-radius: 12px 12px 0 0;
            display: block;
        }

        .gpt5pr-card-content {
            padding: 24px;
            position: relative;
        }

        .gpt5pr-card-badge {
            position: absolute;
            top: -12px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 12px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .gpt5pr-card-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #2c3e50;
            margin: 0 0 12px 0;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: 3.12em;
        }

        .gpt5pr-card-description {
            font-size: 0.9rem;
            color: #7f8c8d;
            margin-bottom: 16px;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .gpt5pr-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 16px;
            border-top: 1px solid #ecf0f1;
        }

        .gpt5pr-card-price {
            font-size: 1.3rem;
            font-weight: 700;
            color: #e74c3c;
        }

        .gpt5pr-card-category {
            font-size: 0.8rem;
            color: #95a5a6;
            text-transform: uppercase;
            font-weight: 500;
            letter-spacing: 0.5px;
        }

        .gpt5pr-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.9);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 250ms ease;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .gpt5pr-nav:hover {
            background: white;
            transform: translateY(-50%) scale(1.05);
            box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }

        .gpt5pr-nav:focus {
            outline: 3px solid rgba(255,255,255,0.8);
            outline-offset: 3px;
        }

        .gpt5pr-nav--prev {
            left: 30px;
        }

        .gpt5pr-nav--next {
            right: 30px;
        }

        .gpt5pr-nav svg {
            width: 24px;
            height: 24px;
            fill: #667eea;
            transition: fill 300ms ease;
        }

        .gpt5pr-nav:hover svg {
            fill: #5a67d8;
        }

        .gpt5pr-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
            position: relative;
        }

        .gpt5pr-more {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 2px solid rgba(255,255,255,0.3);
            padding: 12px 32px;
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 0.1em;
            border-radius: 25px;
            cursor: pointer;
            transition: all 250ms ease;
            text-transform: uppercase;
        }

        .gpt5pr-more:hover {
            background: rgba(255,255,255,0.3);
            border-color: rgba(255,255,255,0.5);
        }

        .gpt5pr-more:focus {
            outline: 2px solid rgba(255,255,255,0.8);
            outline-offset: 2px;
        }

        .gpt5pr-status {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }

        /* レスポンシブ */
        @media (max-width: 599px) {
            .gpt5pr-section {
                padding: 60px 0;
            }

            .gpt5pr-track {
                gap: 20px;
                padding: 0 5vw;
            }

            .gpt5pr-card {
                width: calc(85vw - 10px);
            }

            .gpt5pr-title-en {
                font-size: 2.2rem;
            }

            .gpt5pr-nav {
                width: 50px;
                height: 50px;
            }

            .gpt5pr-nav svg {
                width: 20px;
                height: 20px;
            }

            .gpt5pr-nav--prev {
                left: 15px;
            }

            .gpt5pr-nav--next {
                right: 15px;
            }
        }

        @media (min-width: 600px) and (max-width: 959px) {
            .gpt5pr-track {
                gap: 25px;
                padding: 0 6vw;
            }

            .gpt5pr-card {
                width: calc((88vw - 50px) / 3);
            }
        }

        @media (min-width: 960px) {
            .gpt5pr-track {
                gap: 30px;
                padding: 0 7vw;
            }

            .gpt5pr-card {
                width: calc((86vw - 120px) / 4);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .gpt5pr-track,
            .gpt5pr-card,
            .gpt5pr-nav {
                transition: none;
            }
        }

        /* 3つ目のスライダー用CSS - ミニマルデザイン */
        .gpt5th-section {
            width: 100vw;
            padding: 100px 0;
            background-color: #fafafa;
            overflow: hidden;
            position: relative;
        }

        .gpt5th-heading {
            text-align: center;
            margin-bottom: 60px;
            position: relative;
        }

        .gpt5th-heading::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 1px;
            background-color: #2c3e50;
        }

        .gpt5th-title-en {
            font-size: 2.2rem;
            font-weight: 300;
            color: #2c3e50;
            margin: 0;
            letter-spacing: 0.3em;
            text-transform: uppercase;
        }

        .gpt5th-title-ja {
            font-size: 0.9rem;
            color: #7f8c8d;
            margin: 16px 0 0 0;
            font-weight: 300;
            letter-spacing: 0.1em;
        }

        .gpt5th-viewport {
            width: 100vw;
            padding: 20px 0;
            position: relative;
            overflow: hidden;
        }

        .gpt5th-track {
            display: flex;
            gap: 40px;
            transition: transform 400ms ease;
            will-change: transform;
            padding: 0 8vw;
        }

        .gpt5th-card {
            flex-shrink: 0;
            background: white;
            border: 1px solid #ecf0f1;
            cursor: pointer;
            transition: all 300ms ease;
            position: relative;
            overflow: hidden;
        }

        .gpt5th-card:hover {
            border-color: #bdc3c7;
            transform: translateY(-4px);
        }

        .gpt5th-card-image {
            aspect-ratio: 16 / 9;
            width: 100%;
            object-fit: cover;
            background-color: #ecf0f1;
            display: block;
            filter: grayscale(100%) contrast(1.1);
            transition: filter 300ms ease;
        }

        .gpt5th-card:hover .gpt5th-card-image {
            filter: grayscale(0%) contrast(1);
        }

        .gpt5th-card-content {
            padding: 32px 24px 24px;
        }

        .gpt5th-card-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
        }

        .gpt5th-card-category {
            font-size: 0.75rem;
            color: #95a5a6;
            text-transform: uppercase;
            font-weight: 500;
            letter-spacing: 0.1em;
        }

        .gpt5th-card-date {
            font-size: 0.75rem;
            color: #bdc3c7;
            font-weight: 300;
        }

        .gpt5th-card-title {
            font-size: 1.1rem;
            font-weight: 400;
            color: #2c3e50;
            margin: 0 0 12px 0;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: 3.3em;
        }

        .gpt5th-card-excerpt {
            font-size: 0.85rem;
            color: #7f8c8d;
            line-height: 1.6;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .gpt5th-card-link {
            font-size: 0.8rem;
            color: #2c3e50;
            text-decoration: none;
            font-weight: 500;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            position: relative;
            display: inline-block;
            transition: color 300ms ease;
        }

        .gpt5th-card-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background-color: #2c3e50;
            transition: width 300ms ease;
        }

        .gpt5th-card:hover .gpt5th-card-link::after {
            width: 100%;
        }

        .gpt5th-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 24px;
            color: #95a5a6;
            transition: all 300ms ease;
            z-index: 10;
            font-weight: 300;
        }

        .gpt5th-nav:hover {
            color: #2c3e50;
            background-color: rgba(44, 62, 80, 0.05);
            border-radius: 2px;
        }

        .gpt5th-nav:focus {
            outline: 1px solid #95a5a6;
            outline-offset: 4px;
        }

        .gpt5th-nav--prev {
            left: 40px;
        }

        .gpt5th-nav--next {
            right: 40px;
        }

        .gpt5th-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 50px;
            position: relative;
        }

        .gpt5th-more {
            background: none;
            color: #2c3e50;
            border: 1px solid #ecf0f1;
            padding: 12px 40px;
            font-size: 0.8rem;
            font-weight: 400;
            letter-spacing: 0.15em;
            cursor: pointer;
            transition: all 300ms ease;
            text-transform: uppercase;
        }

        .gpt5th-more:hover {
            background-color: #2c3e50;
            color: white;
            border-color: #2c3e50;
        }

        .gpt5th-more:focus {
            outline: 1px solid #95a5a6;
            outline-offset: 2px;
        }

        .gpt5th-status {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }

        /* レスポンシブ */
        @media (max-width: 599px) {
            .gpt5th-section {
                padding: 60px 0;
            }

            .gpt5th-track {
                gap: 24px;
                padding: 0 6vw;
            }

            .gpt5th-card {
                width: calc(88vw - 12px);
            }

            .gpt5th-title-en {
                font-size: 1.8rem;
            }

            .gpt5th-nav {
                width: 50px;
                height: 50px;
                font-size: 20px;
            }

            .gpt5th-nav--prev {
                left: 10px;
            }

            .gpt5th-nav--next {
                right: 10px;
            }
        }

        @media (min-width: 600px) and (max-width: 959px) {
            .gpt5th-track {
                gap: 32px;
                padding: 0 7vw;
            }

            .gpt5th-card {
                width: calc((86vw - 64px) / 3);
            }

            .gpt5th-nav--prev {
                left: 20px;
            }

            .gpt5th-nav--next {
                right: 20px;
            }
        }

        @media (min-width: 960px) {
            .gpt5th-track {
                gap: 40px;
                padding: 0 8vw;
            }

            .gpt5th-card {
                width: calc((84vw - 120px) / 4);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .gpt5th-track,
            .gpt5th-card,
            .gpt5th-nav,
            .gpt5th-card-image,
            .gpt5th-card-link::after {
                transition: none;
            }
        }

        /* 4つ目のスライダー用CSS - ナチュラル/オーガニックデザイン */
        .gpt5nt-section {
            width: 100vw;
            padding: 90px 0;
            background: linear-gradient(135deg, #f7f3e9 0%, #e8dcc6 50%, #f0e68c 100%);
            overflow: hidden;
            position: relative;
        }

        .gpt5nt-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 80%, rgba(210, 180, 140, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(188, 143, 143, 0.1) 0%, transparent 50%);
        }

        .gpt5nt-heading {
            text-align: center;
            margin-bottom: 60px;
            position: relative;
            z-index: 2;
        }

        .gpt5nt-heading::after {
            content: '❦';
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            color: #8b7355;
            font-size: 1.5rem;
        }

        .gpt5nt-title-en {
            font-size: 2.6rem;
            font-weight: 400;
            color: #6b5b73;
            margin: 0;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            font-family: 'Georgia', serif;
        }

        .gpt5nt-title-ja {
            font-size: 1rem;
            color: #8b7355;
            margin: 16px 0 0 0;
            font-weight: 300;
            letter-spacing: 0.05em;
        }

        .gpt5nt-viewport {
            width: 100vw;
            padding: 0;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }

        .gpt5nt-track {
            display: flex;
            gap: 35px;
            transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
            will-change: transform;
            padding: 0 6vw;
        }

        .gpt5nt-card {
            flex-shrink: 0;
            background: linear-gradient(145deg, #ffffff 0%, #faf7f2 100%);
            border-radius: 25px;
            overflow: hidden;
            cursor: pointer;
            transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
            position: relative;
            box-shadow: 
                0 8px 32px rgba(139, 115, 85, 0.15),
                0 2px 8px rgba(139, 115, 85, 0.1);
            border: 1px solid rgba(139, 115, 85, 0.1);
        }

        .gpt5nt-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 0%, rgba(240, 230, 140, 0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 400ms ease;
            z-index: 1;
            border-radius: 25px;
        }

        .gpt5nt-card:hover {
            transform: translateY(-8px) rotate(-1deg);
            box-shadow: 
                0 16px 48px rgba(139, 115, 85, 0.25),
                0 4px 16px rgba(139, 115, 85, 0.15);
        }

        .gpt5nt-card:hover::before {
            opacity: 1;
        }

        .gpt5nt-card-image {
            aspect-ratio: 3 / 2;
            width: 100%;
            object-fit: cover;
            border-radius: 25px 25px 0 0;
            display: block;
            filter: sepia(10%) saturate(120%) contrast(105%);
            transition: filter 400ms ease;
        }

        .gpt5nt-card:hover .gpt5nt-card-image {
            filter: sepia(20%) saturate(140%) contrast(110%);
        }

        .gpt5nt-card-content {
            padding: 28px 24px 24px;
            position: relative;
            z-index: 2;
        }

        .gpt5nt-card-category {
            font-size: 0.8rem;
            color: #bc8f8f;
            text-transform: uppercase;
            font-weight: 500;
            letter-spacing: 0.1em;
            margin-bottom: 12px;
            display: inline-block;
            background: rgba(188, 143, 143, 0.1);
            padding: 4px 12px;
            border-radius: 15px;
        }

        .gpt5nt-card-title {
            font-size: 1.3rem;
            font-weight: 500;
            color: #6b5b73;
            margin: 0 0 14px 0;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: 3.64em;
            font-family: 'Georgia', serif;
        }

        .gpt5nt-card-description {
            font-size: 0.9rem;
            color: #8b7355;
            line-height: 1.6;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .gpt5nt-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 16px;
            border-top: 1px solid rgba(139, 115, 85, 0.1);
        }

        .gpt5nt-card-price {
            font-size: 1.2rem;
            font-weight: 600;
            color: #d2b48c;
            font-family: 'Georgia', serif;
        }

        .gpt5nt-card-rating {
            display: flex;
            gap: 2px;
            color: #f0e68c;
            font-size: 0.9rem;
        }

        .gpt5nt-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(250, 247, 242, 0.9);
            border: 2px solid rgba(139, 115, 85, 0.2);
            width: 55px;
            height: 55px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 20px;
            color: #6b5b73;
            transition: all 350ms ease;
            z-index: 10;
            box-shadow: 0 6px 20px rgba(139, 115, 85, 0.15);
            backdrop-filter: blur(5px);
        }

        .gpt5nt-nav:hover {
            background: rgba(240, 230, 140, 0.9);
            border-color: rgba(139, 115, 85, 0.4);
            transform: translateY(-50%) scale(1.08);
            box-shadow: 0 8px 25px rgba(139, 115, 85, 0.25);
        }

        .gpt5nt-nav:focus {
            outline: 2px solid rgba(139, 115, 85, 0.5);
            outline-offset: 3px;
        }

        .gpt5nt-nav--prev {
            left: 35px;
        }

        .gpt5nt-nav--next {
            right: 35px;
        }

        .gpt5nt-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 50px;
            position: relative;
            z-index: 2;
        }

        .gpt5nt-more {
            background: linear-gradient(135deg, #d2b48c 0%, #bc8f8f 100%);
            color: white;
            border: none;
            padding: 16px 40px;
            font-size: 0.9rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            border-radius: 30px;
            cursor: pointer;
            transition: all 350ms ease;
            text-transform: uppercase;
            box-shadow: 0 6px 20px rgba(139, 115, 85, 0.2);
            position: relative;
            overflow: hidden;
        }

        .gpt5nt-more::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 600ms ease;
        }

        .gpt5nt-more:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 115, 85, 0.3);
        }

        .gpt5nt-more:hover::before {
            left: 100%;
        }

        .gpt5nt-more:focus {
            outline: 2px solid rgba(139, 115, 85, 0.5);
            outline-offset: 2px;
        }

        .gpt5nt-status {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }

        /* レスポンシブ */
        @media (max-width: 599px) {
            .gpt5nt-section {
                padding: 70px 0;
            }

            .gpt5nt-track {
                gap: 25px;
                padding: 0 6vw;
            }

            .gpt5nt-card {
                width: calc(88vw - 12px);
            }

            .gpt5nt-title-en {
                font-size: 2.2rem;
            }

            .gpt5nt-nav {
                width: 45px;
                height: 45px;
                font-size: 16px;
            }

            .gpt5nt-nav--prev {
                left: 15px;
            }

            .gpt5nt-nav--next {
                right: 15px;
            }
        }

        @media (min-width: 600px) and (max-width: 959px) {
            .gpt5nt-track {
                gap: 30px;
                padding: 0 7vw;
            }

            .gpt5nt-card {
                width: calc((86vw - 60px) / 2.5);
            }

            .gpt5nt-nav--prev {
                left: 25px;
            }

            .gpt5nt-nav--next {
                right: 25px;
            }
        }

        @media (min-width: 960px) {
            .gpt5nt-track {
                gap: 35px;
                padding: 0 8vw;
            }

            .gpt5nt-card {
                width: calc((84vw - 140px) / 3.5);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .gpt5nt-track,
            .gpt5nt-card,
            .gpt5nt-nav,
            .gpt5nt-card-image,
            .gpt5nt-card::before,
            .gpt5nt-more::before {
                transition: none;
            }
        }

        /* ===== GPT5BD (Business Dashboard) Slider Styles ===== */
        .gpt5bd-section {
            width: 100vw;
            padding: 80px 0;
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
            overflow: hidden;
            position: relative;
        }

        .gpt5bd-heading {
            text-align: center;
            margin-bottom: 50px;
            position: relative;
        }

        .gpt5bd-heading::before,
        .gpt5bd-heading::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 50px;
            height: 2px;
            background: linear-gradient(90deg, #3182ce, #38a169);
        }

        .gpt5bd-heading::before {
            left: calc(50% - 140px);
        }

        .gpt5bd-heading::after {
            right: calc(50% - 140px);
        }

        .gpt5bd-title-en {
            font-size: 2.8rem;
            font-weight: 700;
            color: #ffffff;
            margin: 0;
            letter-spacing: 0.15em;
            text-shadow: 0 2px 10px rgba(49, 130, 206, 0.3);
        }

        .gpt5bd-title-ja {
            font-size: 1.1rem;
            color: #a0aec0;
            margin: 10px 0 0 0;
            font-weight: 300;
            letter-spacing: 0.1em;
        }

        .gpt5bd-viewport {
            width: 100vw;
            padding: 0;
            position: relative;
            overflow: hidden;
        }

        .gpt5bd-track {
            display: flex;
            gap: 25px;
            transition: transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform;
            padding: 0 5vw;
        }

        .gpt5bd-card {
            flex-shrink: 0;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 300ms ease-out, box-shadow 300ms ease-out;
            position: relative;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
        }

        .gpt5bd-card:hover {
            box-shadow: 0 6px 30px rgba(49, 130, 206, 0.15);
        }

        .gpt5bd-card-image {
            aspect-ratio: 16 / 10;
            width: 100%;
            object-fit: cover;
            display: block;
        }

        .gpt5bd-card-content {
            padding: 20px;
            background: #ffffff;
        }

        .gpt5bd-card-meta {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
        }

        .gpt5bd-card-category {
            background: linear-gradient(135deg, #3182ce, #38a169);
            color: white;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 4px 10px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .gpt5bd-card-date {
            font-size: 0.8rem;
            color: #718096;
            font-weight: 500;
        }

        .gpt5bd-card-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2d3748;
            margin: 0 0 8px 0;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .gpt5bd-card-description {
            font-size: 0.9rem;
            color: #4a5568;
            line-height: 1.5;
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .gpt5bd-nav {
            position: absolute;
            top: calc(50% + 50px);
            transform: translateY(-50%);
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.95);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
            transition: all 300ms ease-out;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }

        .gpt5bd-nav:hover {
            background: rgba(255, 255, 255, 1);
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 6px 30px rgba(49, 130, 206, 0.3);
        }

        .gpt5bd-nav:active {
            transform: translateY(-50%) scale(0.95);
        }

        .gpt5bd-nav--prev {
            left: 25px;
        }

        .gpt5bd-nav--next {
            right: 25px;
        }

        .gpt5bd-nav svg {
            width: 24px;
            height: 24px;
            fill: #2d3748;
            transition: fill 300ms ease-out;
        }

        .gpt5bd-nav:hover svg {
            fill: #3182ce;
        }

        .gpt5bd-status {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }

        /* レスポンシブ */
        @media (max-width: 599px) {
            .gpt5bd-section {
                padding: 60px 0;
            }

            .gpt5bd-track {
                gap: 20px;
                padding: 0 5vw;
            }

            .gpt5bd-card {
                width: calc(85vw - 10px);
            }

            .gpt5bd-title-en {
                font-size: 2.2rem;
            }

            .gpt5bd-nav {
                width: 50px;
                height: 50px;
            }

            .gpt5bd-nav svg {
                width: 20px;
                height: 20px;
            }

            .gpt5bd-nav--prev {
                left: 15px;
            }

            .gpt5bd-nav--next {
                right: 15px;
            }

            .gpt5bd-heading::before {
                left: calc(50% - 120px);
            }

            .gpt5bd-heading::after {
                right: calc(50% - 120px);
            }
        }

        @media (min-width: 600px) and (max-width: 959px) {
            .gpt5bd-track {
                gap: 25px;
                padding: 0 6vw;
            }

            .gpt5bd-card {
                width: calc(50vw - 20px);
            }

            .gpt5bd-nav--prev {
                left: 20px;
            }

            .gpt5bd-nav--next {
                right: 20px;
            }
        }

        @media (min-width: 960px) {
            .gpt5bd-track {
                gap: 30px;
                padding: 0 8vw;
            }

            .gpt5bd-card {
                width: calc(33.333vw - 25px);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .gpt5bd-track,
            .gpt5bd-card,
            .gpt5bd-nav {
                transition: none;
            }
        }
    </style>
</head>

<body>
    <main class="gpt5bn-section" aria-label="ブランドニュース">
        <div class="gpt5bn-heading">
            <h2 class="gpt5bn-title-en">BRAND NEWS</h2>
            <p class="gpt5bn-title-ja">ブランドニュース</p>
        </div>

        <div class="gpt5bn-viewport" id="gpt5bn-viewport">
            <div class="gpt5bn-track" id="gpt5bn-track">
                <!-- Cards will be generated by JavaScript -->
            </div>
        </div>

        <button class="gpt5bn-nav gpt5bn-nav--prev" id="gpt5bn-prev" aria-label="前のニュースを表示" aria-controls="gpt5bn-track">
        </button>

        <button class="gpt5bn-nav gpt5bn-nav--next" id="gpt5bn-next" aria-label="次のニュースを表示" aria-controls="gpt5bn-track">
        </button>

        <div class="gpt5bn-controls">
            <button class="gpt5bn-more" id="gpt5bn-more">VIEW MORE</button>
        </div>

        <div id="gpt5bn-status" class="gpt5bn-status" aria-live="polite"></div>
    </main>

    <!-- 新しいスライダーセクション -->
    <main class="gpt5pr-section" aria-label="プロダクトショーケース">
        <div class="gpt5pr-heading">
            <h2 class="gpt5pr-title-en">PRODUCT SHOWCASE</h2>
            <p class="gpt5pr-title-ja">プロダクトショーケース</p>
        </div>

        <div class="gpt5pr-viewport" id="gpt5pr-viewport">
            <div class="gpt5pr-track" id="gpt5pr-track">
                <!-- Cards will be generated by JavaScript -->
            </div>
        </div>

        <button class="gpt5pr-nav gpt5pr-nav--prev" id="gpt5pr-prev" aria-label="前の商品を表示" aria-controls="gpt5pr-track">
        </button>

        <button class="gpt5pr-nav gpt5pr-nav--next" id="gpt5pr-next" aria-label="次の商品を表示" aria-controls="gpt5pr-track">
        </button>

        <div class="gpt5pr-controls">
            <button class="gpt5pr-more" id="gpt5pr-more">EXPLORE MORE</button>
        </div>

        <div id="gpt5pr-status" class="gpt5pr-status" aria-live="polite"></div>
    </main>

    <!-- 3つ目のスライダーセクション -->
    <main class="gpt5th-section" aria-label="テックインサイト">
        <div class="gpt5th-heading">
            <h2 class="gpt5th-title-en">TECH INSIGHTS</h2>
            <p class="gpt5th-title-ja">テックインサイト</p>
        </div>

        <div class="gpt5th-viewport" id="gpt5th-viewport">
            <div class="gpt5th-track" id="gpt5th-track">
                <!-- Cards will be generated by JavaScript -->
            </div>
        </div>

        <button class="gpt5th-nav gpt5th-nav--prev" id="gpt5th-prev" aria-label="前のインサイトを表示" aria-controls="gpt5th-track">
            ←
        </button>

        <button class="gpt5th-nav gpt5th-nav--next" id="gpt5th-next" aria-label="次のインサイトを表示" aria-controls="gpt5th-track">
            →
        </button>

        <div class="gpt5th-controls">
            <button class="gpt5th-more" id="gpt5th-more">READ MORE</button>
        </div>

        <div id="gpt5th-status" class="gpt5th-status" aria-live="polite"></div>
    </main>

    <!-- 4つ目のスライダーセクション - ナチュラル系 -->
    <main class="gpt5nt-section" aria-label="ナチュラルコレクション">
        <div class="gpt5nt-heading">
            <h2 class="gpt5nt-title-en">NATURAL COLLECTION</h2>
            <p class="gpt5nt-title-ja">ナチュラルコレクション</p>
        </div>

        <div class="gpt5nt-viewport" id="gpt5nt-viewport">
            <div class="gpt5nt-track" id="gpt5nt-track">
                <!-- Cards will be generated by JavaScript -->
            </div>
        </div>

        <button class="gpt5nt-nav gpt5nt-nav--prev" id="gpt5nt-prev" aria-label="前のアイテムを表示" aria-controls="gpt5nt-track">
            ❮
        </button>

        <button class="gpt5nt-nav gpt5nt-nav--next" id="gpt5nt-next" aria-label="次のアイテムを表示" aria-controls="gpt5nt-track">
            ❯
        </button>

        <div class="gpt5nt-controls">
            <button class="gpt5nt-more" id="gpt5nt-more">VIEW COLLECTION</button>
        </div>

        <div id="gpt5nt-status" class="gpt5nt-status" aria-live="polite"></div>
    </main>

    <!-- GPT5BD Business Dashboard Slider -->
    <main class="gpt5bd-section" aria-label="ビジネスインサイト">
        <div class="gpt5bd-heading">
            <h2 class="gpt5bd-title-en">INSIGHTS</h2>
            <p class="gpt5bd-title-ja">インサイト</p>
        </div>

        <div class="gpt5bd-viewport" id="gpt5bd-viewport">
            <div class="gpt5bd-track" id="gpt5bd-track">
                <!-- Cards will be generated by JavaScript -->
            </div>
        </div>

        <button class="gpt5bd-nav gpt5bd-nav--prev" id="gpt5bd-prev" aria-label="前のインサイトを表示" aria-controls="gpt5bd-track">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
        </button>

        <button class="gpt5bd-nav gpt5bd-nav--next" id="gpt5bd-next" aria-label="次のインサイトを表示" aria-controls="gpt5bd-track">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
        </button>

        <div id="gpt5bd-status" class="gpt5bd-status" aria-live="polite"></div>
    </main>

    <script>
        (function() {
            'use strict';
            
            const GPT5BN_AUTO_INTERVAL = 3500;
            const GPT5BN_TRANSITION_MS = 450;
            const GPT5BN_SWIPE_THRESHOLD = 0.2;
            let GPT5BN_CLONE_COUNT = 3;
            
            const gpt5bnData = [
                {
                    imageURL: 'https://picsum.photos/400/400?random=1',
                    title: 'New Collection Launch: Sustainable Fashion for Modern Living',
                    date: '2023.09.21',
                    brand: 'ECO FASHION',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/400/400?random=2',
                    title: 'Tech Innovation Award Winner 2023',
                    date: '2023.09.18',
                    brand: 'TECH SOLUTIONS',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/400/400?random=3',
                    title: 'Global Partnership Announcement',
                    date: '2023.09.15',
                    brand: 'GLOBAL CORP',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/400/400?random=4',
                    title: 'Exclusive Interview with CEO',
                    date: '2023.09.12',
                    brand: 'BUSINESS WEEKLY',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/400/400?random=5',
                    title: 'Annual Report 2023 Released',
                    date: '2023.09.08',
                    brand: 'ANNUAL REPORTS',
                    linkURL: '#'
                }
            ];
            
            const gpt5bnSection = document.querySelector('.gpt5bn-section');
            const gpt5bnTrack = document.getElementById('gpt5bn-track');
            const gpt5bnViewport = document.getElementById('gpt5bn-viewport');
            const gpt5bnPrevBtn = document.getElementById('gpt5bn-prev');
            const gpt5bnNextBtn = document.getElementById('gpt5bn-next');
            const gpt5bnMoreBtn = document.getElementById('gpt5bn-more');
            const gpt5bnStatus = document.getElementById('gpt5bn-status');
            
            let gpt5bnCurrentIndex = 0;
            let gpt5bnTotalCards = gpt5bnData.length;
            let gpt5bnIsAnimating = false;
            let gpt5bnAutoTimer = null;
            let gpt5bnVisibleCount = 1;
            let gpt5bnCardWidth = 0;
            let gpt5bnGap = 0;
            
            let gpt5bnIsDragging = false;
            let gpt5bnStartX = 0;
            let gpt5bnStartTransform = 0;
            const gpt5bnMinDragDistance = 50;
            
            if (!gpt5bnSection || !gpt5bnTrack || !gpt5bnViewport) return;
            
            function gpt5bnInit() {
                gpt5bnRenderCards();
                gpt5bnCreateClones();
                gpt5bnSetupEventListeners();
                
                setTimeout(() => {
                    gpt5bnCalculateLayout();
                    gpt5bnTranslateToIndex(gpt5bnCurrentIndex);
                    gpt5bnUpdateStatus();
                    gpt5bnStartAutoPlay();
                }, 100);
            }

            function gpt5bnRenderCards() {
                const cards = gpt5bnData.map((item, index) => {
                    const isFirst = index < 2;
                    const loading = isFirst ? 'eager' : 'lazy';
                    const fetchPriority = isFirst ? 'high' : 'auto';
                    
                    return `
                        <div class="gpt5bn-card" data-gpt5bn-index="${index}">
                            <img 
                                src="${item.imageURL}" 
                                alt="${item.title}"
                                class="gpt5bn-card-image"
                                loading="${loading}"
                                ${isFirst ? `fetchpriority="${fetchPriority}"` : ''}
                                srcset="${item.imageURL}&w=400 400w, ${item.imageURL}&w=600 600w"
                                sizes="(max-width: 599px) 83vw, (max-width: 959px) 29vw, 17vw"
                                draggable="false"
                            >
                            <div class="gpt5bn-card-content">
                                <h3 class="gpt5bn-card-title">${item.title}</h3>
                                <div class="gpt5bn-card-date">${item.date}</div>
                                <div class="gpt5bn-card-brand">${item.brand}</div>
                            </div>
                        </div>
                    `;
                }).join('');

                gpt5bnTrack.innerHTML = cards;
            }
            
            function gpt5bnCreateClones() {
                const originalCards = Array.from(gpt5bnTrack.children);
                
                GPT5BN_CLONE_COUNT = 3;
                
                for (let i = 0; i < GPT5BN_CLONE_COUNT; i++) {
                    const sourceIndex = gpt5bnTotalCards - GPT5BN_CLONE_COUNT + i;
                    const clone = originalCards[sourceIndex].cloneNode(true);
                    clone.setAttribute('data-gpt5bn-clone', 'leading');
                    clone.removeAttribute('id');
                    gpt5bnTrack.insertBefore(clone, gpt5bnTrack.firstChild);
                }
                
                for (let i = 0; i < GPT5BN_CLONE_COUNT; i++) {
                    const clone = originalCards[i].cloneNode(true);
                    clone.setAttribute('data-gpt5bn-clone', 'trailing');
                    clone.removeAttribute('id');
                    gpt5bnTrack.appendChild(clone);
                }
                
                gpt5bnCurrentIndex = GPT5BN_CLONE_COUNT;
            }

            function gpt5bnSetupEventListeners() {
                gpt5bnPrevBtn.addEventListener('click', gpt5bnPrev);
                gpt5bnNextBtn.addEventListener('click', gpt5bnNext);

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        gpt5bnPrev();
                    } else if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        gpt5bnNext();
                    }
                });

                gpt5bnTrack.addEventListener('pointerdown', gpt5bnHandlePointerDown);
                gpt5bnTrack.addEventListener('pointermove', gpt5bnHandlePointerMove);
                gpt5bnTrack.addEventListener('pointerup', gpt5bnHandlePointerUp);
                gpt5bnTrack.addEventListener('pointercancel', gpt5bnHandlePointerUp);

                gpt5bnTrack.addEventListener('selectstart', (e) => {
                    if (gpt5bnIsDragging) e.preventDefault();
                });

                gpt5bnSection.addEventListener('mouseenter', gpt5bnStopAutoPlay);
                gpt5bnSection.addEventListener('mouseleave', gpt5bnStartAutoPlay);
                gpt5bnSection.addEventListener('focusin', gpt5bnStopAutoPlay);
                gpt5bnSection.addEventListener('focusout', gpt5bnStartAutoPlay);

                gpt5bnTrack.addEventListener('transitionend', gpt5bnHandleTransitionEnd);

                window.addEventListener('resize', gpt5bnHandleResize);

                gpt5bnMoreBtn.addEventListener('click', () => {
                    console.log('View more clicked');
                });
            }

            function gpt5bnHandlePointerDown(e) {
                if (gpt5bnIsAnimating) return;
                
                gpt5bnStopAutoPlay();
                gpt5bnIsDragging = true;
                gpt5bnStartX = e.clientX;
                gpt5bnStartTransform = gpt5bnGetCurrentTransform();
                gpt5bnSetTransition(false);
                gpt5bnTrack.setPointerCapture(e.pointerId);
                e.preventDefault();
            }

            function gpt5bnHandlePointerMove(e) {
                if (!gpt5bnIsDragging) return;

                const deltaX = e.clientX - gpt5bnStartX;
                const newTransform = gpt5bnStartTransform + deltaX;
                gpt5bnTrack.style.transform = `translateX(${newTransform}px)`;
                e.preventDefault();
            }

            function gpt5bnHandlePointerUp(e) {
                if (!gpt5bnIsDragging) return;

                const deltaX = e.clientX - gpt5bnStartX;
                const swipeThreshold = gpt5bnCardWidth * GPT5BN_SWIPE_THRESHOLD;

                gpt5bnIsDragging = false;
                gpt5bnSetTransition(true);

                if (Math.abs(deltaX) > swipeThreshold) {
                    if (deltaX > 0) {
                        gpt5bnPrev();
                    } else {
                        gpt5bnNext();
                    }
                } else {
                    gpt5bnTranslateToIndex(gpt5bnCurrentIndex);
                }

                gpt5bnStartAutoPlay();
                e.preventDefault();
            }

            function gpt5bnGetCurrentTransform() {
                const style = window.getComputedStyle(gpt5bnTrack);
                const matrix = style.transform;
                if (matrix === 'none') return 0;
                const values = matrix.split('(')[1].split(')')[0].split(',');
                return parseFloat(values[4]) || 0;
            }

            function gpt5bnNext() {
                if (gpt5bnIsAnimating) return;
                gpt5bnStopAutoPlay();
                gpt5bnCurrentIndex++;
                gpt5bnSetTransition(true);
                gpt5bnTranslateToIndex(gpt5bnCurrentIndex);
                gpt5bnUpdateStatus();
                gpt5bnStartAutoPlay();
            }

            function gpt5bnPrev() {
                if (gpt5bnIsAnimating) return;
                gpt5bnStopAutoPlay();
                gpt5bnCurrentIndex--;
                gpt5bnSetTransition(true);
                gpt5bnTranslateToIndex(gpt5bnCurrentIndex);
                gpt5bnUpdateStatus();
                gpt5bnStartAutoPlay();
            }
            
            function gpt5bnGoTo(realIndex) {
                if (gpt5bnIsAnimating) return;
                gpt5bnStopAutoPlay();
                gpt5bnCurrentIndex = realIndex + GPT5BN_CLONE_COUNT;
                gpt5bnSetTransition(true);
                gpt5bnTranslateToIndex(gpt5bnCurrentIndex);
                gpt5bnUpdateStatus();
                gpt5bnStartAutoPlay();
            }

            function gpt5bnCalculateLayout() {
                const viewportWidth = gpt5bnViewport.offsetWidth;
                const cards = gpt5bnTrack.children;
                if (cards.length === 0) return;

                gpt5bnCardWidth = cards[0].offsetWidth;
                gpt5bnGap = gpt5bnGetGap();
                
                if (window.innerWidth < 600) {
                    gpt5bnVisibleCount = 1.2;
                } else if (window.innerWidth < 960) {
                    gpt5bnVisibleCount = 3;
                } else {
                    gpt5bnVisibleCount = 5;
                }
            }
            
            function gpt5bnTranslateToIndex(index) {
                const viewportWidth = gpt5bnViewport.offsetWidth;
                const totalCardWidth = gpt5bnCardWidth + gpt5bnGap;
                
                const trackStyle = window.getComputedStyle(gpt5bnTrack);
                const trackPaddingLeft = parseFloat(trackStyle.paddingLeft) || 0;
                
                const viewportCenter = viewportWidth / 2;
                const cardCenter = gpt5bnCardWidth / 2;
                
                const cardPositionInTrack = index * totalCardWidth + cardCenter;
                const cardActualPosition = trackPaddingLeft + cardPositionInTrack;
                const transform = viewportCenter - cardActualPosition;
                
                gpt5bnTrack.style.transform = `translateX(${transform}px)`;
            }
            
            function gpt5bnSetTransition(enable) {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    gpt5bnTrack.style.transition = 'none';
                } else {
                    gpt5bnTrack.style.transition = enable ? `transform ${GPT5BN_TRANSITION_MS}ms ease-out` : 'none';
                }
                gpt5bnIsAnimating = enable;
            }

            function gpt5bnGetGap() {
                const style = window.getComputedStyle(gpt5bnTrack);
                return parseFloat(style.gap) || 20;
            }

            function gpt5bnUpdateStatus() {
                const realIndex = gpt5bnGetRealIndex(gpt5bnCurrentIndex);
                const current = realIndex + 1;
                const total = gpt5bnTotalCards;
                gpt5bnStatus.textContent = `${current} / ${total}`;
            }
            
            function gpt5bnGetRealIndex(index) {
                if (index < GPT5BN_CLONE_COUNT) {
                    return gpt5bnTotalCards - (GPT5BN_CLONE_COUNT - index);
                } else if (index >= GPT5BN_CLONE_COUNT + gpt5bnTotalCards) {
                    return index - GPT5BN_CLONE_COUNT - gpt5bnTotalCards;
                } else {
                    return index - GPT5BN_CLONE_COUNT;
                }
            }
            
            function gpt5bnHandleTransitionEnd() {
                const totalElements = gpt5bnTotalCards + (GPT5BN_CLONE_COUNT * 2);
                
                if (gpt5bnCurrentIndex < GPT5BN_CLONE_COUNT) {
                    gpt5bnCurrentIndex = gpt5bnTotalCards + gpt5bnCurrentIndex;
                    gpt5bnSetTransition(false);
                    gpt5bnTranslateToIndex(gpt5bnCurrentIndex);
                }
                else if (gpt5bnCurrentIndex >= GPT5BN_CLONE_COUNT + gpt5bnTotalCards) {
                    gpt5bnCurrentIndex = gpt5bnCurrentIndex - gpt5bnTotalCards;
                    gpt5bnSetTransition(false);
                    gpt5bnTranslateToIndex(gpt5bnCurrentIndex);
                }
                
                setTimeout(() => {
                    gpt5bnIsAnimating = false;
                }, 50);
            }
            
            function gpt5bnStartAutoPlay() {
                gpt5bnStopAutoPlay();
                if (gpt5bnTotalCards > 1) {
                    gpt5bnAutoTimer = setInterval(gpt5bnNext, GPT5BN_AUTO_INTERVAL);
                }
            }
            
            function gpt5bnStopAutoPlay() {
                if (gpt5bnAutoTimer) {
                    clearInterval(gpt5bnAutoTimer);
                    gpt5bnAutoTimer = null;
                }
            }

            function gpt5bnHandleResize() {
                const realIndex = gpt5bnGetRealIndex(gpt5bnCurrentIndex);
                
                const clones = gpt5bnTrack.querySelectorAll('[data-gpt5bn-clone]');
                clones.forEach(clone => clone.remove());
                
                gpt5bnCreateClones();
                
                gpt5bnCalculateLayout();
                
                gpt5bnCurrentIndex = realIndex + GPT5BN_CLONE_COUNT;
                gpt5bnTranslateToIndex(gpt5bnCurrentIndex);
            }
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', gpt5bnInit);
            } else {
                gpt5bnInit();
            }
        })();

        // 新しいスライダーのJavaScript
        (function() {
            'use strict';
            
            const GPT5PR_AUTO_INTERVAL = 4000;
            const GPT5PR_TRANSITION_MS = 500;
            const GPT5PR_SWIPE_THRESHOLD = 0.2;
            let GPT5PR_CLONE_COUNT = 3;
            
            const gpt5prData = [
                {
                    imageURL: 'https://picsum.photos/600/450?random=1',
                    title: 'Premium Wireless Headphones',
                    description: 'High-quality sound with active noise cancellation and 30-hour battery life.',
                    price: '¥29,800',
                    category: 'Audio',
                    badge: 'NEW',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/600/450?random=2',
                    title: 'Smart Fitness Watch',
                    description: 'Track your health with advanced sensors and GPS functionality.',
                    price: '¥45,600',
                    category: 'Wearable',
                    badge: 'Popular',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/600/450?random=3',
                    title: 'Ergonomic Office Chair',
                    description: 'Comfortable seating solution with lumbar support and adjustable height.',
                    price: '¥68,000',
                    category: 'Furniture',
                    badge: 'Sale',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/600/450?random=4',
                    title: 'Portable Power Bank',
                    description: 'Fast charging 20000mAh battery with multiple USB ports.',
                    price: '¥8,980',
                    category: 'Tech',
                    badge: 'Hot',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/600/450?random=5',
                    title: 'Eco-Friendly Water Bottle',
                    description: 'Sustainable stainless steel bottle that keeps drinks cold for 24 hours.',
                    price: '¥3,200',
                    category: 'Lifestyle',
                    badge: 'Eco',
                    linkURL: '#'
                }
            ];
            
            const gpt5prSection = document.querySelector('.gpt5pr-section');
            const gpt5prTrack = document.getElementById('gpt5pr-track');
            const gpt5prViewport = document.getElementById('gpt5pr-viewport');
            const gpt5prPrevBtn = document.getElementById('gpt5pr-prev');
            const gpt5prNextBtn = document.getElementById('gpt5pr-next');
            const gpt5prMoreBtn = document.getElementById('gpt5pr-more');
            const gpt5prStatus = document.getElementById('gpt5pr-status');
            
            let gpt5prCurrentIndex = 0;
            let gpt5prTotalCards = gpt5prData.length;
            let gpt5prIsAnimating = false;
            let gpt5prAutoTimer = null;
            let gpt5prVisibleCount = 1;
            let gpt5prCardWidth = 0;
            let gpt5prGap = 0;
            
            let gpt5prIsDragging = false;
            let gpt5prStartX = 0;
            let gpt5prStartTransform = 0;
            const gpt5prMinDragDistance = 50;
            
            if (!gpt5prSection || !gpt5prTrack || !gpt5prViewport) return;
            
            function gpt5prInit() {
                gpt5prRenderCards();
                gpt5prCreateClones();
                gpt5prSetupEventListeners();
                
                setTimeout(() => {
                    gpt5prCalculateLayout();
                    gpt5prTranslateToIndex(gpt5prCurrentIndex);
                    gpt5prUpdateStatus();
                    gpt5prStartAutoPlay();
                }, 100);
            }

            function gpt5prRenderCards() {
                const cards = gpt5prData.map((item, index) => {
                    const isFirst = index < 2;
                    const loading = isFirst ? 'eager' : 'lazy';
                    const fetchPriority = isFirst ? 'high' : 'auto';
                    
                    return `
                        <div class="gpt5pr-card" data-gpt5pr-index="${index}">
                            <img 
                                src="${item.imageURL}" 
                                alt="${item.title}"
                                class="gpt5pr-card-image"
                                loading="${loading}"
                                ${isFirst ? `fetchpriority="${fetchPriority}"` : ''}
                                draggable="false"
                            >
                            <div class="gpt5pr-card-content">
                                <div class="gpt5pr-card-badge">${item.badge}</div>
                                <h3 class="gpt5pr-card-title">${item.title}</h3>
                                <p class="gpt5pr-card-description">${item.description}</p>
                                <div class="gpt5pr-card-footer">
                                    <div class="gpt5pr-card-price">${item.price}</div>
                                    <div class="gpt5pr-card-category">${item.category}</div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                gpt5prTrack.innerHTML = cards;
            }
            
            function gpt5prCreateClones() {
                const originalCards = Array.from(gpt5prTrack.children);
                
                GPT5PR_CLONE_COUNT = 3;
                
                for (let i = 0; i < GPT5PR_CLONE_COUNT; i++) {
                    const sourceIndex = gpt5prTotalCards - GPT5PR_CLONE_COUNT + i;
                    const clone = originalCards[sourceIndex].cloneNode(true);
                    clone.setAttribute('data-gpt5pr-clone', 'leading');
                    clone.removeAttribute('id');
                    gpt5prTrack.insertBefore(clone, gpt5prTrack.firstChild);
                }
                
                for (let i = 0; i < GPT5PR_CLONE_COUNT; i++) {
                    const clone = originalCards[i].cloneNode(true);
                    clone.setAttribute('data-gpt5pr-clone', 'trailing');
                    clone.removeAttribute('id');
                    gpt5prTrack.appendChild(clone);
                }
                
                gpt5prCurrentIndex = GPT5PR_CLONE_COUNT;
            }

            function gpt5prSetupEventListeners() {
                // ナビゲーションボタンのSVGを追加
                gpt5prPrevBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
                gpt5prNextBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';
                
                gpt5prPrevBtn.addEventListener('click', gpt5prPrev);
                gpt5prNextBtn.addEventListener('click', gpt5prNext);

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft' && gpt5prSection.contains(document.activeElement)) {
                        e.preventDefault();
                        gpt5prPrev();
                    } else if (e.key === 'ArrowRight' && gpt5prSection.contains(document.activeElement)) {
                        e.preventDefault();
                        gpt5prNext();
                    }
                });

                gpt5prTrack.addEventListener('pointerdown', gpt5prHandlePointerDown);
                gpt5prTrack.addEventListener('pointermove', gpt5prHandlePointerMove);
                gpt5prTrack.addEventListener('pointerup', gpt5prHandlePointerUp);
                gpt5prTrack.addEventListener('pointercancel', gpt5prHandlePointerUp);

                gpt5prTrack.addEventListener('selectstart', (e) => {
                    if (gpt5prIsDragging) e.preventDefault();
                });

                gpt5prSection.addEventListener('mouseenter', gpt5prStopAutoPlay);
                gpt5prSection.addEventListener('mouseleave', gpt5prStartAutoPlay);
                gpt5prSection.addEventListener('focusin', gpt5prStopAutoPlay);
                gpt5prSection.addEventListener('focusout', gpt5prStartAutoPlay);

                gpt5prTrack.addEventListener('transitionend', gpt5prHandleTransitionEnd);

                window.addEventListener('resize', gpt5prHandleResize);

                gpt5prMoreBtn.addEventListener('click', () => {
                    console.log('Explore more clicked');
                });
            }

            function gpt5prHandlePointerDown(e) {
                if (gpt5prIsAnimating) return;
                
                gpt5prStopAutoPlay();
                gpt5prIsDragging = true;
                gpt5prStartX = e.clientX;
                gpt5prStartTransform = gpt5prGetCurrentTransform();
                gpt5prSetTransition(false);
                gpt5prTrack.setPointerCapture(e.pointerId);
                e.preventDefault();
            }

            function gpt5prHandlePointerMove(e) {
                if (!gpt5prIsDragging) return;

                const deltaX = e.clientX - gpt5prStartX;
                const newTransform = gpt5prStartTransform + deltaX;
                gpt5prTrack.style.transform = `translateX(${newTransform}px)`;
                e.preventDefault();
            }

            function gpt5prHandlePointerUp(e) {
                if (!gpt5prIsDragging) return;

                const deltaX = e.clientX - gpt5prStartX;
                const swipeThreshold = gpt5prCardWidth * GPT5PR_SWIPE_THRESHOLD;

                gpt5prIsDragging = false;
                gpt5prSetTransition(true);

                if (Math.abs(deltaX) > swipeThreshold) {
                    if (deltaX > 0) {
                        gpt5prPrev();
                    } else {
                        gpt5prNext();
                    }
                } else {
                    gpt5prTranslateToIndex(gpt5prCurrentIndex);
                }

                gpt5prStartAutoPlay();
                e.preventDefault();
            }

            function gpt5prGetCurrentTransform() {
                const style = window.getComputedStyle(gpt5prTrack);
                const matrix = style.transform;
                if (matrix === 'none') return 0;
                const values = matrix.split('(')[1].split(')')[0].split(',');
                return parseFloat(values[4]) || 0;
            }

            function gpt5prNext() {
                if (gpt5prIsAnimating) return;
                gpt5prStopAutoPlay();
                gpt5prCurrentIndex++;
                gpt5prSetTransition(true);
                gpt5prTranslateToIndex(gpt5prCurrentIndex);
                gpt5prUpdateStatus();
                gpt5prStartAutoPlay();
            }

            function gpt5prPrev() {
                if (gpt5prIsAnimating) return;
                gpt5prStopAutoPlay();
                gpt5prCurrentIndex--;
                gpt5prSetTransition(true);
                gpt5prTranslateToIndex(gpt5prCurrentIndex);
                gpt5prUpdateStatus();
                gpt5prStartAutoPlay();
            }

            function gpt5prCalculateLayout() {
                const viewportWidth = gpt5prViewport.offsetWidth;
                const cards = gpt5prTrack.children;
                if (cards.length === 0) return;

                gpt5prCardWidth = cards[0].offsetWidth;
                gpt5prGap = gpt5prGetGap();
                
                if (window.innerWidth < 600) {
                    gpt5prVisibleCount = 1.2;
                } else if (window.innerWidth < 960) {
                    gpt5prVisibleCount = 3;
                } else {
                    gpt5prVisibleCount = 4;
                }
            }
            
            function gpt5prTranslateToIndex(index) {
                const viewportWidth = gpt5prViewport.offsetWidth;
                const totalCardWidth = gpt5prCardWidth + gpt5prGap;
                
                const trackStyle = window.getComputedStyle(gpt5prTrack);
                const trackPaddingLeft = parseFloat(trackStyle.paddingLeft) || 0;
                
                const viewportCenter = viewportWidth / 2;
                const cardCenter = gpt5prCardWidth / 2;
                
                const cardPositionInTrack = index * totalCardWidth + cardCenter;
                const cardActualPosition = trackPaddingLeft + cardPositionInTrack;
                const transform = viewportCenter - cardActualPosition;
                
                gpt5prTrack.style.transform = `translateX(${transform}px)`;
            }
            
            function gpt5prSetTransition(enable) {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    gpt5prTrack.style.transition = 'none';
                } else {
                    gpt5prTrack.style.transition = enable ? `transform ${GPT5PR_TRANSITION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none';
                }
                gpt5prIsAnimating = enable;
            }

            function gpt5prGetGap() {
                const style = window.getComputedStyle(gpt5prTrack);
                return parseFloat(style.gap) || 30;
            }

            function gpt5prUpdateStatus() {
                const realIndex = gpt5prGetRealIndex(gpt5prCurrentIndex);
                const current = realIndex + 1;
                const total = gpt5prTotalCards;
                gpt5prStatus.textContent = `${current} / ${total}`;
            }
            
            function gpt5prGetRealIndex(index) {
                if (index < GPT5PR_CLONE_COUNT) {
                    return gpt5prTotalCards - (GPT5PR_CLONE_COUNT - index);
                } else if (index >= GPT5PR_CLONE_COUNT + gpt5prTotalCards) {
                    return index - GPT5PR_CLONE_COUNT - gpt5prTotalCards;
                } else {
                    return index - GPT5PR_CLONE_COUNT;
                }
            }
            
            function gpt5prHandleTransitionEnd() {
                const totalElements = gpt5prTotalCards + (GPT5PR_CLONE_COUNT * 2);
                
                if (gpt5prCurrentIndex < GPT5PR_CLONE_COUNT) {
                    gpt5prCurrentIndex = gpt5prTotalCards + gpt5prCurrentIndex;
                    gpt5prSetTransition(false);
                    gpt5prTranslateToIndex(gpt5prCurrentIndex);
                }
                else if (gpt5prCurrentIndex >= GPT5PR_CLONE_COUNT + gpt5prTotalCards) {
                    gpt5prCurrentIndex = gpt5prCurrentIndex - gpt5prTotalCards;
                    gpt5prSetTransition(false);
                    gpt5prTranslateToIndex(gpt5prCurrentIndex);
                }
                
                setTimeout(() => {
                    gpt5prIsAnimating = false;
                }, 50);
            }
            
            function gpt5prStartAutoPlay() {
                gpt5prStopAutoPlay();
                if (gpt5prTotalCards > 1) {
                    gpt5prAutoTimer = setInterval(gpt5prNext, GPT5PR_AUTO_INTERVAL);
                }
            }
            
            function gpt5prStopAutoPlay() {
                if (gpt5prAutoTimer) {
                    clearInterval(gpt5prAutoTimer);
                    gpt5prAutoTimer = null;
                }
            }

            function gpt5prHandleResize() {
                const realIndex = gpt5prGetRealIndex(gpt5prCurrentIndex);
                
                const clones = gpt5prTrack.querySelectorAll('[data-gpt5pr-clone]');
                clones.forEach(clone => clone.remove());
                
                gpt5prCreateClones();
                
                gpt5prCalculateLayout();
                
                gpt5prCurrentIndex = realIndex + GPT5PR_CLONE_COUNT;
                gpt5prTranslateToIndex(gpt5prCurrentIndex);
            }
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', gpt5prInit);
            } else {
                gpt5prInit();
            }
        })();

        // 3つ目のスライダーのJavaScript - ミニマルデザイン
        (function() {
            'use strict';
            
            const GPT5TH_AUTO_INTERVAL = 5000;
            const GPT5TH_TRANSITION_MS = 400;
            const GPT5TH_SWIPE_THRESHOLD = 0.2;
            let GPT5TH_CLONE_COUNT = 3;
            
            const gpt5thData = [
                {
                    imageURL: 'https://picsum.photos/800/450?random=101',
                    title: 'The Future of Artificial Intelligence in Web Development',
                    excerpt: 'Exploring how AI is transforming the way we build and interact with digital experiences.',
                    category: 'AI & Tech',
                    date: '2024.01.15',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/800/450?random=102',
                    title: 'Minimalist Design Principles for Modern Interfaces',
                    excerpt: 'Understanding the core concepts of minimalism and how to apply them effectively.',
                    category: 'Design',
                    date: '2024.01.12',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/800/450?random=103',
                    title: 'Performance Optimization Strategies for Web Applications',
                    excerpt: 'Best practices for creating fast, efficient, and scalable web solutions.',
                    category: 'Performance',
                    date: '2024.01.09',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/800/450?random=104',
                    title: 'User Experience Research Methods and Implementation',
                    excerpt: 'Data-driven approaches to understanding and improving user interactions.',
                    category: 'UX Research',
                    date: '2024.01.06',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/800/450?random=105',
                    title: 'Sustainable Technology Practices for the Digital Age',
                    excerpt: 'How to build environmentally conscious solutions without compromising functionality.',
                    category: 'Sustainability',
                    date: '2024.01.03',
                    linkURL: '#'
                }
            ];
            
            const gpt5thSection = document.querySelector('.gpt5th-section');
            const gpt5thTrack = document.getElementById('gpt5th-track');
            const gpt5thViewport = document.getElementById('gpt5th-viewport');
            const gpt5thPrevBtn = document.getElementById('gpt5th-prev');
            const gpt5thNextBtn = document.getElementById('gpt5th-next');
            const gpt5thMoreBtn = document.getElementById('gpt5th-more');
            const gpt5thStatus = document.getElementById('gpt5th-status');
            
            let gpt5thCurrentIndex = 0;
            let gpt5thTotalCards = gpt5thData.length;
            let gpt5thIsAnimating = false;
            let gpt5thAutoTimer = null;
            let gpt5thVisibleCount = 1;
            let gpt5thCardWidth = 0;
            let gpt5thGap = 0;
            
            let gpt5thIsDragging = false;
            let gpt5thStartX = 0;
            let gpt5thStartTransform = 0;
            const gpt5thMinDragDistance = 50;
            
            if (!gpt5thSection || !gpt5thTrack || !gpt5thViewport) return;
            
            function gpt5thInit() {
                gpt5thRenderCards();
                gpt5thCreateClones();
                gpt5thSetupEventListeners();
                
                setTimeout(() => {
                    gpt5thCalculateLayout();
                    gpt5thTranslateToIndex(gpt5thCurrentIndex);
                    gpt5thUpdateStatus();
                    gpt5thStartAutoPlay();
                }, 100);
            }

            function gpt5thRenderCards() {
                const cards = gpt5thData.map((item, index) => {
                    const isFirst = index < 2;
                    const loading = isFirst ? 'eager' : 'lazy';
                    const fetchPriority = isFirst ? 'high' : 'auto';
                    
                    return `
                        <article class="gpt5th-card" data-gpt5th-index="${index}">
                            <img 
                                src="${item.imageURL}" 
                                alt="${item.title}"
                                class="gpt5th-card-image"
                                loading="${loading}"
                                ${isFirst ? `fetchpriority="${fetchPriority}"` : ''}
                                draggable="false"
                            >
                            <div class="gpt5th-card-content">
                                <div class="gpt5th-card-meta">
                                    <span class="gpt5th-card-category">${item.category}</span>
                                    <span class="gpt5th-card-date">${item.date}</span>
                                </div>
                                <h3 class="gpt5th-card-title">${item.title}</h3>
                                <p class="gpt5th-card-excerpt">${item.excerpt}</p>
                                <a href="${item.linkURL}" class="gpt5th-card-link">Read Article</a>
                            </div>
                        </article>
                    `;
                }).join('');

                gpt5thTrack.innerHTML = cards;
            }
            
            function gpt5thCreateClones() {
                const originalCards = Array.from(gpt5thTrack.children);
                
                GPT5TH_CLONE_COUNT = 3;
                
                for (let i = 0; i < GPT5TH_CLONE_COUNT; i++) {
                    const sourceIndex = gpt5thTotalCards - GPT5TH_CLONE_COUNT + i;
                    const clone = originalCards[sourceIndex].cloneNode(true);
                    clone.setAttribute('data-gpt5th-clone', 'leading');
                    clone.removeAttribute('id');
                    gpt5thTrack.insertBefore(clone, gpt5thTrack.firstChild);
                }
                
                for (let i = 0; i < GPT5TH_CLONE_COUNT; i++) {
                    const clone = originalCards[i].cloneNode(true);
                    clone.setAttribute('data-gpt5th-clone', 'trailing');
                    clone.removeAttribute('id');
                    gpt5thTrack.appendChild(clone);
                }
                
                gpt5thCurrentIndex = GPT5TH_CLONE_COUNT;
            }

            function gpt5thSetupEventListeners() {
                gpt5thPrevBtn.addEventListener('click', gpt5thPrev);
                gpt5thNextBtn.addEventListener('click', gpt5thNext);

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft' && gpt5thSection.contains(document.activeElement)) {
                        e.preventDefault();
                        gpt5thPrev();
                    } else if (e.key === 'ArrowRight' && gpt5thSection.contains(document.activeElement)) {
                        e.preventDefault();
                        gpt5thNext();
                    }
                });

                gpt5thTrack.addEventListener('pointerdown', gpt5thHandlePointerDown);
                gpt5thTrack.addEventListener('pointermove', gpt5thHandlePointerMove);
                gpt5thTrack.addEventListener('pointerup', gpt5thHandlePointerUp);
                gpt5thTrack.addEventListener('pointercancel', gpt5thHandlePointerUp);

                gpt5thTrack.addEventListener('selectstart', (e) => {
                    if (gpt5thIsDragging) e.preventDefault();
                });

                gpt5thSection.addEventListener('mouseenter', gpt5thStopAutoPlay);
                gpt5thSection.addEventListener('mouseleave', gpt5thStartAutoPlay);
                gpt5thSection.addEventListener('focusin', gpt5thStopAutoPlay);
                gpt5thSection.addEventListener('focusout', gpt5thStartAutoPlay);

                gpt5thTrack.addEventListener('transitionend', gpt5thHandleTransitionEnd);

                window.addEventListener('resize', gpt5thHandleResize);

                gpt5thMoreBtn.addEventListener('click', () => {
                    console.log('Read more clicked');
                });
            }

            function gpt5thHandlePointerDown(e) {
                if (gpt5thIsAnimating) return;
                
                gpt5thStopAutoPlay();
                gpt5thIsDragging = true;
                gpt5thStartX = e.clientX;
                gpt5thStartTransform = gpt5thGetCurrentTransform();
                gpt5thSetTransition(false);
                gpt5thTrack.setPointerCapture(e.pointerId);
                e.preventDefault();
            }

            function gpt5thHandlePointerMove(e) {
                if (!gpt5thIsDragging) return;

                const deltaX = e.clientX - gpt5thStartX;
                const newTransform = gpt5thStartTransform + deltaX;
                gpt5thTrack.style.transform = `translateX(${newTransform}px)`;
                e.preventDefault();
            }

            function gpt5thHandlePointerUp(e) {
                if (!gpt5thIsDragging) return;

                const deltaX = e.clientX - gpt5thStartX;
                const swipeThreshold = gpt5thCardWidth * GPT5TH_SWIPE_THRESHOLD;

                gpt5thIsDragging = false;
                gpt5thSetTransition(true);

                if (Math.abs(deltaX) > swipeThreshold) {
                    if (deltaX > 0) {
                        gpt5thPrev();
                    } else {
                        gpt5thNext();
                    }
                } else {
                    gpt5thTranslateToIndex(gpt5thCurrentIndex);
                }

                gpt5thStartAutoPlay();
                e.preventDefault();
            }

            function gpt5thGetCurrentTransform() {
                const style = window.getComputedStyle(gpt5thTrack);
                const matrix = style.transform;
                if (matrix === 'none') return 0;
                const values = matrix.split('(')[1].split(')')[0].split(',');
                return parseFloat(values[4]) || 0;
            }

            function gpt5thNext() {
                if (gpt5thIsAnimating) return;
                gpt5thStopAutoPlay();
                gpt5thCurrentIndex++;
                gpt5thSetTransition(true);
                gpt5thTranslateToIndex(gpt5thCurrentIndex);
                gpt5thUpdateStatus();
                gpt5thStartAutoPlay();
            }

            function gpt5thPrev() {
                if (gpt5thIsAnimating) return;
                gpt5thStopAutoPlay();
                gpt5thCurrentIndex--;
                gpt5thSetTransition(true);
                gpt5thTranslateToIndex(gpt5thCurrentIndex);
                gpt5thUpdateStatus();
                gpt5thStartAutoPlay();
            }

            function gpt5thCalculateLayout() {
                const viewportWidth = gpt5thViewport.offsetWidth;
                const cards = gpt5thTrack.children;
                if (cards.length === 0) return;

                gpt5thCardWidth = cards[0].offsetWidth;
                gpt5thGap = gpt5thGetGap();
                
                if (window.innerWidth < 600) {
                    gpt5thVisibleCount = 1.1;
                } else if (window.innerWidth < 960) {
                    gpt5thVisibleCount = 3;
                } else {
                    gpt5thVisibleCount = 4;
                }
            }
            
            function gpt5thTranslateToIndex(index) {
                const viewportWidth = gpt5thViewport.offsetWidth;
                const totalCardWidth = gpt5thCardWidth + gpt5thGap;
                
                const trackStyle = window.getComputedStyle(gpt5thTrack);
                const trackPaddingLeft = parseFloat(trackStyle.paddingLeft) || 0;
                
                const viewportCenter = viewportWidth / 2;
                const cardCenter = gpt5thCardWidth / 2;
                
                const cardPositionInTrack = index * totalCardWidth + cardCenter;
                const cardActualPosition = trackPaddingLeft + cardPositionInTrack;
                const transform = viewportCenter - cardActualPosition;
                
                gpt5thTrack.style.transform = `translateX(${transform}px)`;
            }
            
            function gpt5thSetTransition(enable) {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    gpt5thTrack.style.transition = 'none';
                } else {
                    gpt5thTrack.style.transition = enable ? `transform ${GPT5TH_TRANSITION_MS}ms ease` : 'none';
                }
                gpt5thIsAnimating = enable;
            }

            function gpt5thGetGap() {
                const style = window.getComputedStyle(gpt5thTrack);
                return parseFloat(style.gap) || 40;
            }

            function gpt5thUpdateStatus() {
                const realIndex = gpt5thGetRealIndex(gpt5thCurrentIndex);
                const current = realIndex + 1;
                const total = gpt5thTotalCards;
                gpt5thStatus.textContent = `${current} / ${total}`;
            }
            
            function gpt5thGetRealIndex(index) {
                if (index < GPT5TH_CLONE_COUNT) {
                    return gpt5thTotalCards - (GPT5TH_CLONE_COUNT - index);
                } else if (index >= GPT5TH_CLONE_COUNT + gpt5thTotalCards) {
                    return index - GPT5TH_CLONE_COUNT - gpt5thTotalCards;
                } else {
                    return index - GPT5TH_CLONE_COUNT;
                }
            }
            
            function gpt5thHandleTransitionEnd() {
                const totalElements = gpt5thTotalCards + (GPT5TH_CLONE_COUNT * 2);
                
                if (gpt5thCurrentIndex < GPT5TH_CLONE_COUNT) {
                    gpt5thCurrentIndex = gpt5thTotalCards + gpt5thCurrentIndex;
                    gpt5thSetTransition(false);
                    gpt5thTranslateToIndex(gpt5thCurrentIndex);
                }
                else if (gpt5thCurrentIndex >= GPT5TH_CLONE_COUNT + gpt5thTotalCards) {
                    gpt5thCurrentIndex = gpt5thCurrentIndex - gpt5thTotalCards;
                    gpt5thSetTransition(false);
                    gpt5thTranslateToIndex(gpt5thCurrentIndex);
                }
                
                setTimeout(() => {
                    gpt5thIsAnimating = false;
                }, 50);
            }
            
            function gpt5thStartAutoPlay() {
                gpt5thStopAutoPlay();
                if (gpt5thTotalCards > 1) {
                    gpt5thAutoTimer = setInterval(gpt5thNext, GPT5TH_AUTO_INTERVAL);
                }
            }
            
            function gpt5thStopAutoPlay() {
                if (gpt5thAutoTimer) {
                    clearInterval(gpt5thAutoTimer);
                    gpt5thAutoTimer = null;
                }
            }

            function gpt5thHandleResize() {
                const realIndex = gpt5thGetRealIndex(gpt5thCurrentIndex);
                
                const clones = gpt5thTrack.querySelectorAll('[data-gpt5th-clone]');
                clones.forEach(clone => clone.remove());
                
                gpt5thCreateClones();
                
                gpt5thCalculateLayout();
                
                gpt5thCurrentIndex = realIndex + GPT5TH_CLONE_COUNT;
                gpt5thTranslateToIndex(gpt5thCurrentIndex);
            }
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', gpt5thInit);
            } else {
                gpt5thInit();
            }
        })();

        // 4つ目のスライダーのJavaScript - ナチュラル/オーガニックデザイン
        (function() {
            'use strict';
            
            const GPT5NT_AUTO_INTERVAL = 4500;
            const GPT5NT_TRANSITION_MS = 600;
            const GPT5NT_SWIPE_THRESHOLD = 0.2;
            let GPT5NT_CLONE_COUNT = 3;
            
            const gpt5ntData = [
                {
                    imageURL: 'https://picsum.photos/600/400?random=301',
                    title: 'Organic Cotton Comfort Wear Collection',
                    description: 'Sustainably sourced organic cotton pieces designed for everyday comfort and natural elegance.',
                    price: '¥12,800',
                    category: 'Organic',
                    rating: '★★★★★',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/600/400?random=302',
                    title: 'Bamboo Fiber Home Essentials',
                    description: 'Eco-friendly bamboo fiber products that bring natural wellness to your daily routine.',
                    price: '¥8,600',
                    category: 'Bamboo',
                    rating: '★★★★☆',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/600/400?random=303',
                    title: 'Hemp Seed Natural Skincare Line',
                    description: 'Nourishing skincare formulated with pure hemp seed oil for healthy, radiant skin.',
                    price: '¥15,200',
                    category: 'Skincare',
                    rating: '★★★★★',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/600/400?random=304',
                    title: 'Handcrafted Wooden Lifestyle Items',
                    description: 'Beautiful handcrafted pieces made from sustainably harvested wood for conscious living.',
                    price: '¥22,400',
                    category: 'Handcraft',
                    rating: '★★★★☆',
                    linkURL: '#'
                },
                {
                    imageURL: 'https://picsum.photos/600/400?random=305',
                    title: 'Natural Stone Wellness Accessories',
                    description: 'Carefully selected natural stones and crystals to enhance your wellness journey.',
                    price: '¥7,800',
                    category: 'Wellness',
                    rating: '★★★★★',
                    linkURL: '#'
                }
            ];
            
            const gpt5ntSection = document.querySelector('.gpt5nt-section');
            const gpt5ntTrack = document.getElementById('gpt5nt-track');
            const gpt5ntViewport = document.getElementById('gpt5nt-viewport');
            const gpt5ntPrevBtn = document.getElementById('gpt5nt-prev');
            const gpt5ntNextBtn = document.getElementById('gpt5nt-next');
            const gpt5ntMoreBtn = document.getElementById('gpt5nt-more');
            const gpt5ntStatus = document.getElementById('gpt5nt-status');
            
            let gpt5ntCurrentIndex = 0;
            let gpt5ntTotalCards = gpt5ntData.length;
            let gpt5ntIsAnimating = false;
            let gpt5ntAutoTimer = null;
            let gpt5ntVisibleCount = 1;
            let gpt5ntCardWidth = 0;
            let gpt5ntGap = 0;
            
            let gpt5ntIsDragging = false;
            let gpt5ntStartX = 0;
            let gpt5ntStartTransform = 0;
            const gpt5ntMinDragDistance = 50;
            
            if (!gpt5ntSection || !gpt5ntTrack || !gpt5ntViewport) return;
            
            function gpt5ntInit() {
                gpt5ntRenderCards();
                gpt5ntCreateClones();
                gpt5ntSetupEventListeners();
                
                setTimeout(() => {
                    gpt5ntCalculateLayout();
                    gpt5ntTranslateToIndex(gpt5ntCurrentIndex);
                    gpt5ntUpdateStatus();
                    gpt5ntStartAutoPlay();
                }, 100);
            }

            function gpt5ntRenderCards() {
                const cards = gpt5ntData.map((item, index) => {
                    const isFirst = index < 2;
                    const loading = isFirst ? 'eager' : 'lazy';
                    const fetchPriority = isFirst ? 'high' : 'auto';
                    
                    return `
                        <article class="gpt5nt-card" data-gpt5nt-index="${index}">
                            <img 
                                src="${item.imageURL}" 
                                alt="${item.title}"
                                class="gpt5nt-card-image"
                                loading="${loading}"
                                ${isFirst ? `fetchpriority="${fetchPriority}"` : ''}
                                draggable="false"
                            >
                            <div class="gpt5nt-card-content">
                                <div class="gpt5nt-card-category">${item.category}</div>
                                <h3 class="gpt5nt-card-title">${item.title}</h3>
                                <p class="gpt5nt-card-description">${item.description}</p>
                                <div class="gpt5nt-card-footer">
                                    <div class="gpt5nt-card-price">${item.price}</div>
                                    <div class="gpt5nt-card-rating">${item.rating}</div>
                                </div>
                            </div>
                        </article>
                    `;
                }).join('');

                gpt5ntTrack.innerHTML = cards;
            }
            
            function gpt5ntCreateClones() {
                const originalCards = Array.from(gpt5ntTrack.children);
                
                GPT5NT_CLONE_COUNT = 3;
                
                for (let i = 0; i < GPT5NT_CLONE_COUNT; i++) {
                    const sourceIndex = gpt5ntTotalCards - GPT5NT_CLONE_COUNT + i;
                    const clone = originalCards[sourceIndex].cloneNode(true);
                    clone.setAttribute('data-gpt5nt-clone', 'leading');
                    clone.removeAttribute('id');
                    gpt5ntTrack.insertBefore(clone, gpt5ntTrack.firstChild);
                }
                
                for (let i = 0; i < GPT5NT_CLONE_COUNT; i++) {
                    const clone = originalCards[i].cloneNode(true);
                    clone.setAttribute('data-gpt5nt-clone', 'trailing');
                    clone.removeAttribute('id');
                    gpt5ntTrack.appendChild(clone);
                }
                
                gpt5ntCurrentIndex = GPT5NT_CLONE_COUNT;
            }

            function gpt5ntSetupEventListeners() {
                gpt5ntPrevBtn.addEventListener('click', gpt5ntPrev);
                gpt5ntNextBtn.addEventListener('click', gpt5ntNext);

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft' && gpt5ntSection.contains(document.activeElement)) {
                        e.preventDefault();
                        gpt5ntPrev();
                    } else if (e.key === 'ArrowRight' && gpt5ntSection.contains(document.activeElement)) {
                        e.preventDefault();
                        gpt5ntNext();
                    }
                });

                gpt5ntTrack.addEventListener('pointerdown', gpt5ntHandlePointerDown);
                gpt5ntTrack.addEventListener('pointermove', gpt5ntHandlePointerMove);
                gpt5ntTrack.addEventListener('pointerup', gpt5ntHandlePointerUp);
                gpt5ntTrack.addEventListener('pointercancel', gpt5ntHandlePointerUp);

                gpt5ntTrack.addEventListener('selectstart', (e) => {
                    if (gpt5ntIsDragging) e.preventDefault();
                });

                gpt5ntSection.addEventListener('mouseenter', gpt5ntStopAutoPlay);
                gpt5ntSection.addEventListener('mouseleave', gpt5ntStartAutoPlay);
                gpt5ntSection.addEventListener('focusin', gpt5ntStopAutoPlay);
                gpt5ntSection.addEventListener('focusout', gpt5ntStartAutoPlay);

                gpt5ntTrack.addEventListener('transitionend', gpt5ntHandleTransitionEnd);

                window.addEventListener('resize', gpt5ntHandleResize);

                gpt5ntMoreBtn.addEventListener('click', () => {
                    console.log('View collection clicked');
                });
            }

            function gpt5ntHandlePointerDown(e) {
                if (gpt5ntIsAnimating) return;
                
                gpt5ntStopAutoPlay();
                gpt5ntIsDragging = true;
                gpt5ntStartX = e.clientX;
                gpt5ntStartTransform = gpt5ntGetCurrentTransform();
                gpt5ntSetTransition(false);
                gpt5ntTrack.setPointerCapture(e.pointerId);
                e.preventDefault();
            }

            function gpt5ntHandlePointerMove(e) {
                if (!gpt5ntIsDragging) return;

                const deltaX = e.clientX - gpt5ntStartX;
                const newTransform = gpt5ntStartTransform + deltaX;
                gpt5ntTrack.style.transform = `translateX(${newTransform}px)`;
                e.preventDefault();
            }

            function gpt5ntHandlePointerUp(e) {
                if (!gpt5ntIsDragging) return;

                const deltaX = e.clientX - gpt5ntStartX;
                const swipeThreshold = gpt5ntCardWidth * GPT5NT_SWIPE_THRESHOLD;

                gpt5ntIsDragging = false;
                gpt5ntSetTransition(true);

                if (Math.abs(deltaX) > swipeThreshold) {
                    if (deltaX > 0) {
                        gpt5ntPrev();
                    } else {
                        gpt5ntNext();
                    }
                } else {
                    gpt5ntTranslateToIndex(gpt5ntCurrentIndex);
                }

                gpt5ntStartAutoPlay();
                e.preventDefault();
            }

            function gpt5ntGetCurrentTransform() {
                const style = window.getComputedStyle(gpt5ntTrack);
                const matrix = style.transform;
                if (matrix === 'none') return 0;
                const values = matrix.split('(')[1].split(')')[0].split(',');
                return parseFloat(values[4]) || 0;
            }

            function gpt5ntNext() {
                if (gpt5ntIsAnimating) return;
                gpt5ntStopAutoPlay();
                gpt5ntCurrentIndex++;
                gpt5ntSetTransition(true);
                gpt5ntTranslateToIndex(gpt5ntCurrentIndex);
                gpt5ntUpdateStatus();
                gpt5ntStartAutoPlay();
            }

            function gpt5ntPrev() {
                if (gpt5ntIsAnimating) return;
                gpt5ntStopAutoPlay();
                gpt5ntCurrentIndex--;
                gpt5ntSetTransition(true);
                gpt5ntTranslateToIndex(gpt5ntCurrentIndex);
                gpt5ntUpdateStatus();
                gpt5ntStartAutoPlay();
            }

            function gpt5ntCalculateLayout() {
                const viewportWidth = gpt5ntViewport.offsetWidth;
                const cards = gpt5ntTrack.children;
                if (cards.length === 0) return;

                gpt5ntCardWidth = cards[0].offsetWidth;
                gpt5ntGap = gpt5ntGetGap();
                
                if (window.innerWidth < 600) {
                    gpt5ntVisibleCount = 1.1;
                } else if (window.innerWidth < 960) {
                    gpt5ntVisibleCount = 2.5;
                } else {
                    gpt5ntVisibleCount = 3.5;
                }
            }
            
            function gpt5ntTranslateToIndex(index) {
                const viewportWidth = gpt5ntViewport.offsetWidth;
                const totalCardWidth = gpt5ntCardWidth + gpt5ntGap;
                
                const trackStyle = window.getComputedStyle(gpt5ntTrack);
                const trackPaddingLeft = parseFloat(trackStyle.paddingLeft) || 0;
                
                const viewportCenter = viewportWidth / 2;
                const cardCenter = gpt5ntCardWidth / 2;
                
                const cardPositionInTrack = index * totalCardWidth + cardCenter;
                const cardActualPosition = trackPaddingLeft + cardPositionInTrack;
                const transform = viewportCenter - cardActualPosition;
                
                gpt5ntTrack.style.transform = `translateX(${transform}px)`;
            }
            
            function gpt5ntSetTransition(enable) {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    gpt5ntTrack.style.transition = 'none';
                } else {
                    gpt5ntTrack.style.transition = enable ? `transform ${GPT5NT_TRANSITION_MS}ms cubic-bezier(0.23, 1, 0.32, 1)` : 'none';
                }
                gpt5ntIsAnimating = enable;
            }

            function gpt5ntGetGap() {
                const style = window.getComputedStyle(gpt5ntTrack);
                return parseFloat(style.gap) || 35;
            }

            function gpt5ntUpdateStatus() {
                const realIndex = gpt5ntGetRealIndex(gpt5ntCurrentIndex);
                const current = realIndex + 1;
                const total = gpt5ntTotalCards;
                gpt5ntStatus.textContent = `${current} / ${total}`;
            }
            
            function gpt5ntGetRealIndex(index) {
                if (index < GPT5NT_CLONE_COUNT) {
                    return gpt5ntTotalCards - (GPT5NT_CLONE_COUNT - index);
                } else if (index >= GPT5NT_CLONE_COUNT + gpt5ntTotalCards) {
                    return index - GPT5NT_CLONE_COUNT - gpt5ntTotalCards;
                } else {
                    return index - GPT5NT_CLONE_COUNT;
                }
            }
            
            function gpt5ntHandleTransitionEnd() {
                const totalElements = gpt5ntTotalCards + (GPT5NT_CLONE_COUNT * 2);
                
                if (gpt5ntCurrentIndex < GPT5NT_CLONE_COUNT) {
                    gpt5ntCurrentIndex = gpt5ntTotalCards + gpt5ntCurrentIndex;
                    gpt5ntSetTransition(false);
                    gpt5ntTranslateToIndex(gpt5ntCurrentIndex);
                }
                else if (gpt5ntCurrentIndex >= GPT5NT_CLONE_COUNT + gpt5ntTotalCards) {
                    gpt5ntCurrentIndex = gpt5ntCurrentIndex - gpt5ntTotalCards;
                    gpt5ntSetTransition(false);
                    gpt5ntTranslateToIndex(gpt5ntCurrentIndex);
                }
                
                setTimeout(() => {
                    gpt5ntIsAnimating = false;
                }, 50);
            }
            
            function gpt5ntStartAutoPlay() {
                gpt5ntStopAutoPlay();
                if (gpt5ntTotalCards > 1) {
                    gpt5ntAutoTimer = setInterval(gpt5ntNext, GPT5NT_AUTO_INTERVAL);
                }
            }
            
            function gpt5ntStopAutoPlay() {
                if (gpt5ntAutoTimer) {
                    clearInterval(gpt5ntAutoTimer);
                    gpt5ntAutoTimer = null;
                }
            }

            function gpt5ntHandleResize() {
                const realIndex = gpt5ntGetRealIndex(gpt5ntCurrentIndex);
                
                const clones = gpt5ntTrack.querySelectorAll('[data-gpt5nt-clone]');
                clones.forEach(clone => clone.remove());
                
                gpt5ntCreateClones();
                
                gpt5ntCalculateLayout();
                
                gpt5ntCurrentIndex = realIndex + GPT5NT_CLONE_COUNT;
                gpt5ntTranslateToIndex(gpt5ntCurrentIndex);
            }
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', gpt5ntInit);
            } else {
                gpt5ntInit();
            }
        })();

        // ===== GPT5BD (Business Dashboard) Slider Script =====
        (function() {
            'use strict';

            // Constants
            const GPT5BD_CLONE_COUNT = 3;
            const GPT5BD_AUTO_INTERVAL = 4500;

            // Elements
            const gpt5bdSection = document.querySelector('.gpt5bd-section');
            const gpt5bdTrack = document.getElementById('gpt5bd-track');
            const gpt5bdViewport = document.getElementById('gpt5bd-viewport');
            const gpt5bdPrevBtn = document.getElementById('gpt5bd-prev');
            const gpt5bdNextBtn = document.getElementById('gpt5bd-next');
            const gpt5bdStatus = document.getElementById('gpt5bd-status');

            // State
            let gpt5bdCurrentIndex = GPT5BD_CLONE_COUNT;
            let gpt5bdIsAnimating = false;
            let gpt5bdAutoTimer = null;
            let gpt5bdTotalCards = 0;
            let gpt5bdCardWidth = 0;
            let gpt5bdCardGap = 0;

            // Sample data
            const gpt5bdInsightsData = [
                {
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=375&fit=crop',
                    category: 'ANALYTICS',
                    date: '2024.01.15',
                    title: 'データドリブン戦略の最新トレンド',
                    description: 'ビジネス成長を加速させる分析手法と実践的なアプローチについて解説します。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=375&fit=crop',
                    category: 'STRATEGY',
                    date: '2024.01.12',
                    title: 'デジタル変革における課題と解決策',
                    description: '企業のDXプロジェクトで直面する主要な課題とその効果的な解決方法。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=375&fit=crop',
                    category: 'INNOVATION',
                    date: '2024.01.10',
                    title: '次世代テクノロジーの活用事例',
                    description: 'AI、IoT、ブロックチェーンを活用した革新的なビジネスモデルの紹介。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=375&fit=crop',
                    category: 'RESEARCH',
                    date: '2024.01.08',
                    title: '市場調査から見る業界動向',
                    description: '最新の市場データに基づいた業界トレンドの分析と今後の予測。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=375&fit=crop',
                    category: 'GROWTH',
                    date: '2024.01.05',
                    title: 'スケーラブルな組織運営のコツ',
                    description: '急成長する企業が直面する組織課題とその解決に向けた実践的なアプローチ。'
                },
                {
                    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=375&fit=crop',
                    category: 'INSIGHTS',
                    date: '2024.01.03',
                    title: 'カスタマーエクスペリエンス向上戦略',
                    description: '顧客満足度を高めるための体験設計とデジタル施策の効果的な実装方法。'
                }
            ];

            function gpt5bdInit() {
                if (!gpt5bdSection) return;

                gpt5bdTotalCards = gpt5bdInsightsData.length;
                gpt5bdGenerateCards();
                gpt5bdCreateClones();
                gpt5bdCalculateLayout();
                gpt5bdBindEvents();
                gpt5bdStartAutoPlay();
                gpt5bdTranslateToIndex(gpt5bdCurrentIndex);
            }

            function gpt5bdGenerateCards() {
                if (!gpt5bdTrack) return;

                gpt5bdTrack.innerHTML = '';
                
                gpt5bdInsightsData.forEach((insight, index) => {
                    const card = document.createElement('div');
                    card.className = 'gpt5bd-card';
                    card.setAttribute('data-gpt5bd-index', index);
                    
                    card.innerHTML = `
                        <img src="${insight.image}" alt="${insight.title}" class="gpt5bd-card-image">
                        <div class="gpt5bd-card-content">
                            <div class="gpt5bd-card-meta">
                                <span class="gpt5bd-card-category">${insight.category}</span>
                                <span class="gpt5bd-card-date">${insight.date}</span>
                            </div>
                            <h3 class="gpt5bd-card-title">${insight.title}</h3>
                            <p class="gpt5bd-card-description">${insight.description}</p>
                        </div>
                    `;
                    
                    gpt5bdTrack.appendChild(card);
                });
            }

            function gpt5bdCreateClones() {
                if (!gpt5bdTrack || gpt5bdTotalCards === 0) return;

                const cards = Array.from(gpt5bdTrack.children);
                
                for (let i = 0; i < GPT5BD_CLONE_COUNT; i++) {
                    const cloneAfter = cards[i].cloneNode(true);
                    cloneAfter.setAttribute('data-gpt5bd-clone', 'after');
                    gpt5bdTrack.appendChild(cloneAfter);
                    
                    const cloneBefore = cards[gpt5bdTotalCards - 1 - i].cloneNode(true);
                    cloneBefore.setAttribute('data-gpt5bd-clone', 'before');
                    gpt5bdTrack.insertBefore(cloneBefore, gpt5bdTrack.firstChild);
                }
            }

            function gpt5bdCalculateLayout() {
                if (!gpt5bdTrack || !gpt5bdViewport) return;

                const viewportWidth = gpt5bdViewport.offsetWidth;
                const computedStyle = getComputedStyle(gpt5bdTrack);
                const paddingLeft = parseFloat(computedStyle.paddingLeft);
                const paddingRight = parseFloat(computedStyle.paddingRight);
                const availableWidth = viewportWidth - paddingLeft - paddingRight;
                
                gpt5bdCardGap = parseFloat(computedStyle.gap) || 0;

                if (window.innerWidth < 600) {
                    gpt5bdCardWidth = availableWidth - 10;
                } else if (window.innerWidth < 960) {
                    gpt5bdCardWidth = availableWidth / 2 - gpt5bdCardGap / 2;
                } else {
                    gpt5bdCardWidth = availableWidth / 3 - (gpt5bdCardGap * 2) / 3;
                }

                const cards = gpt5bdTrack.children;
                for (let card of cards) {
                    card.style.width = `${gpt5bdCardWidth}px`;
                }
            }

            function gpt5bdBindEvents() {
                if (gpt5bdPrevBtn) {
                    gpt5bdPrevBtn.addEventListener('click', gpt5bdPrev);
                }

                if (gpt5bdNextBtn) {
                    gpt5bdNextBtn.addEventListener('click', gpt5bdNext);
                }

                gpt5bdSection.addEventListener('mouseenter', gpt5bdStopAutoPlay);
                gpt5bdSection.addEventListener('mouseleave', gpt5bdStartAutoPlay);

                let gpt5bdTouchStartX = 0;
                let gpt5bdTouchEndX = 0;

                gpt5bdViewport.addEventListener('touchstart', (e) => {
                    gpt5bdTouchStartX = e.touches[0].clientX;
                    gpt5bdStopAutoPlay();
                }, { passive: true });

                gpt5bdViewport.addEventListener('touchend', (e) => {
                    gpt5bdTouchEndX = e.changedTouches[0].clientX;
                    const diff = gpt5bdTouchStartX - gpt5bdTouchEndX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            gpt5bdNext();
                        } else {
                            gpt5bdPrev();
                        }
                    }
                    
                    gpt5bdStartAutoPlay();
                }, { passive: true });

                window.addEventListener('resize', gpt5bdDebounce(gpt5bdHandleResize, 250));
            }

            function gpt5bdDebounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }

            function gpt5bdNext() {
                if (gpt5bdIsAnimating || gpt5bdTotalCards <= 1) return;

                gpt5bdIsAnimating = true;
                gpt5bdCurrentIndex++;
                gpt5bdSetTransition(true);
                gpt5bdTranslateToIndex(gpt5bdCurrentIndex);
                gpt5bdHandleInfiniteLoop();
                gpt5bdUpdateStatus();
            }

            function gpt5bdPrev() {
                if (gpt5bdIsAnimating || gpt5bdTotalCards <= 1) return;

                gpt5bdIsAnimating = true;
                gpt5bdCurrentIndex--;
                gpt5bdSetTransition(true);
                gpt5bdTranslateToIndex(gpt5bdCurrentIndex);
                gpt5bdHandleInfiniteLoop();
                gpt5bdUpdateStatus();
            }

            function gpt5bdSetTransition(enabled) {
                if (!gpt5bdTrack) return;
                gpt5bdTrack.style.transition = enabled ? 'transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
            }

            function gpt5bdTranslateToIndex(index) {
                if (!gpt5bdTrack) return;
                const translateX = -(index * (gpt5bdCardWidth + gpt5bdCardGap));
                gpt5bdTrack.style.transform = `translateX(${translateX}px)`;
            }

            function gpt5bdGetRealIndex(index) {
                if (index < GPT5BD_CLONE_COUNT) {
                    return gpt5bdTotalCards - (GPT5BD_CLONE_COUNT - index);
                } else if (index >= GPT5BD_CLONE_COUNT + gpt5bdTotalCards) {
                    return index - GPT5BD_CLONE_COUNT - gpt5bdTotalCards;
                } else {
                    return index - GPT5BD_CLONE_COUNT;
                }
            }

            function gpt5bdUpdateStatus() {
                if (!gpt5bdStatus) return;
                const realIndex = gpt5bdGetRealIndex(gpt5bdCurrentIndex);
                gpt5bdStatus.textContent = `${realIndex + 1} / ${gpt5bdTotalCards}`;
            }

            function gpt5bdHandleInfiniteLoop() {
                setTimeout(() => {
                    if (gpt5bdCurrentIndex < GPT5BD_CLONE_COUNT) {
                        gpt5bdCurrentIndex = gpt5bdCurrentIndex + gpt5bdTotalCards;
                        gpt5bdSetTransition(false);
                        gpt5bdTranslateToIndex(gpt5bdCurrentIndex);
                    }
                    else if (gpt5bdCurrentIndex >= GPT5BD_CLONE_COUNT + gpt5bdTotalCards) {
                        gpt5bdCurrentIndex = gpt5bdCurrentIndex - gpt5bdTotalCards;
                        gpt5bdSetTransition(false);
                        gpt5bdTranslateToIndex(gpt5bdCurrentIndex);
                    }
                    
                    setTimeout(() => {
                        gpt5bdIsAnimating = false;
                    }, 50);
                }, 450);
            }

            function gpt5bdStartAutoPlay() {
                gpt5bdStopAutoPlay();
                if (gpt5bdTotalCards > 1) {
                    gpt5bdAutoTimer = setInterval(gpt5bdNext, GPT5BD_AUTO_INTERVAL);
                }
            }

            function gpt5bdStopAutoPlay() {
                if (gpt5bdAutoTimer) {
                    clearInterval(gpt5bdAutoTimer);
                    gpt5bdAutoTimer = null;
                }
            }

            function gpt5bdHandleResize() {
                const realIndex = gpt5bdGetRealIndex(gpt5bdCurrentIndex);
                
                const clones = gpt5bdTrack.querySelectorAll('[data-gpt5bd-clone]');
                clones.forEach(clone => clone.remove());
                
                gpt5bdCreateClones();
                gpt5bdCalculateLayout();
                
                gpt5bdCurrentIndex = realIndex + GPT5BD_CLONE_COUNT;
                gpt5bdTranslateToIndex(gpt5bdCurrentIndex);
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', gpt5bdInit);
            } else {
                gpt5bdInit();
            }
        })();
    </script>
</body>

<?php get_footer(); ?>