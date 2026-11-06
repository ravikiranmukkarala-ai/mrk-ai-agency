"""
JavaScript & Visual Tech Inspector Module for Website Motion Analyzer.
Uses Web Animations API and DOM/runtime inspection to detect active animations,
keyframes, SVG/Canvas/WebGL usage, and animation libraries with strict evidence.
"""

from typing import Dict, Any


def inspect_web_animations_and_libraries(page) -> Dict[str, Any]:
    """
    Evaluates Web Animations API (document.getAnimations()) and checks for
    animation libraries, canvas, SVG animations, and WebGL contexts.
    """
    script = """
    () => {
        const results = {
            webAnimations: [],
            librariesDetected: {},
            visualEngines: {
                canvasCount: 0,
                webglCanvases: 0,
                svgCount: 0,
                svgAnimatedCount: 0,
                videoCount: 0,
                lottiePlayers: 0
            },
            scriptSources: []
        };

        // 1. Web Animations API: document.getAnimations()
        if (typeof document.getAnimations === 'function') {
            try {
                const anims = document.getAnimations();
                for (const anim of anims) {
                    const target = anim.effect && anim.effect.target;
                    let targetSelector = 'unknown';
                    if (target) {
                        const tag = target.tagName ? target.tagName.toLowerCase() : '';
                        const id = target.id ? `#${target.id}` : '';
                        const cls = target.className && typeof target.className === 'string' ? '.' + target.className.trim().split(/\\s+/).join('.') : '';
                        targetSelector = `${tag}${id}${cls}`;
                    }

                    let timing = null;
                    let keyframes = [];
                    if (anim.effect) {
                        if (typeof anim.effect.getComputedTiming === 'function') {
                            const ct = anim.effect.getComputedTiming();
                            timing = {
                                delay: ct.delay,
                                duration: ct.duration,
                                fill: ct.fill,
                                iterations: ct.iterations,
                                easing: ct.easing,
                                direction: ct.direction,
                                progress: ct.progress
                            };
                        }
                        if (typeof anim.effect.getKeyframes === 'function') {
                            try {
                                const kfs = anim.effect.getKeyframes();
                                keyframes = kfs.slice(0, 10).map(kf => {
                                    // Pick relevant style props
                                    const cleanKf = {};
                                    for (const key in kf) {
                                        if (['offset', 'easing', 'transform', 'opacity', 'filter', 'width', 'height', 'color', 'background'].includes(key) || !key.startsWith('_')) {
                                            cleanKf[key] = kf[key];
                                        }
                                    }
                                    return cleanKf;
                                });
                            } catch(e) {}
                        }
                    }

                    results.webAnimations.push({
                        id: anim.id || null,
                        playState: anim.playState,
                        currentTime: anim.currentTime,
                        playbackRate: anim.playbackRate,
                        target: targetSelector.slice(0, 100),
                        timing: timing,
                        keyframes: keyframes
                    });
                }
            } catch (e) {
                results.webAnimationsError = e.message;
            }
        }

        // 2. Library Detection (Strict Evidence Check)
        // GSAP
        results.librariesDetected.gsap = {
            detected: !!(window.gsap || window.TweenMax || window.TweenLite || window.ScrollTrigger),
            evidence: window.gsap ? `gsap v${window.gsap.version || 'detected'}` : (window.TweenMax ? 'TweenMax detected' : null),
            scrollTrigger: !!(window.ScrollTrigger || (window.gsap && window.gsap.plugins && window.gsap.plugins.scrollTrigger))
        };

        // Framer Motion / Motion
        const framerElements = document.querySelectorAll('[data-framer-name], [data-projection-id], [style*="--framer"]');
        results.librariesDetected.framerMotion = {
            detected: !!(window.__framer_motion_ || framerElements.length > 0),
            evidence: framerElements.length > 0 ? `Found ${framerElements.length} DOM elements with Framer attributes` : null
        };

        // Lottie
        const lottiePlayers = document.querySelectorAll('lottie-player, dotlottie-player, [data-animation-path]');
        results.librariesDetected.lottie = {
            detected: !!(window.lottie || window.bodymovin || lottiePlayers.length > 0),
            evidence: window.lottie ? 'window.lottie present' : (lottiePlayers.length > 0 ? `Found ${lottiePlayers.length} lottie elements` : null)
        };
        results.visualEngines.lottiePlayers = lottiePlayers.length;

        // Three.js / WebGL
        results.librariesDetected.threeJs = {
            detected: !!window.THREE,
            evidence: window.THREE ? `THREE.REVISION: ${window.THREE.REVISION}` : null
        };

        // Anime.js
        results.librariesDetected.animeJs = {
            detected: !!window.anime,
            evidence: window.anime ? 'window.anime detected' : null
        };

        // Smooth Scroll (Lenis, Locomotive)
        results.librariesDetected.lenis = {
            detected: !!window.lenis || !!document.querySelector('.lenis'),
            evidence: window.lenis ? 'window.lenis detected' : null
        };
        results.librariesDetected.locomotiveScroll = {
            detected: !!window.locomotiveScroll || !!document.querySelector('[data-scroll-container]'),
            evidence: document.querySelector('[data-scroll-container]') ? 'data-scroll-container found' : null
        };

        // AOS (Animate on Scroll)
        results.librariesDetected.aos = {
            detected: !!window.AOS || !!document.querySelector('[data-aos]'),
            evidence: document.querySelector('[data-aos]') ? `Found ${document.querySelectorAll('[data-aos]').length} [data-aos] elements` : null
        };

        // 3. Canvas & WebGL Visual Engine Check
        const canvases = document.querySelectorAll('canvas');
        results.visualEngines.canvasCount = canvases.length;
        let webglCount = 0;
        canvases.forEach(c => {
            try {
                const gl = c.getContext('webgl') || c.getContext('webgl2') || c.getContext('experimental-webgl');
                if (gl) webglCount++;
            } catch(e) {}
        });
        results.visualEngines.webglCanvases = webglCount;

        // 4. SVG Analysis
        const svgs = document.querySelectorAll('svg');
        results.visualEngines.svgCount = svgs.length;
        let animatedSvgs = 0;
        svgs.forEach(s => {
            if (s.querySelector('animate, animateTransform, animateMotion') || (s.style.animationName && s.style.animationName !== 'none')) {
                animatedSvgs++;
            }
        });
        results.visualEngines.svgAnimatedCount = animatedSvgs;

        // 5. Videos
        results.visualEngines.videoCount = document.querySelectorAll('video').length;

        // 6. Inspect script tags to discover bundles/vendors
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(s => {
            const src = s.getAttribute('src');
            if (src && !src.startsWith('data:')) {
                results.scriptSources.push(src);
            }
        });

        return results;
    }
    """
    data = page.evaluate(script)
    return data
