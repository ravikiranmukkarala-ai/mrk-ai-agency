"""
CSS Inspector Module for Website Motion Analyzer.
Extracts CSS animations, transitions, and @keyframes definitions.
"""

from typing import Dict, List, Any
import tinycss2


def extract_css_animations_and_transitions(page) -> Dict[str, Any]:
    """
    Evaluates computed styles across DOM elements to discover active CSS transitions,
    CSS animations, and inspects stylesheets for @keyframes rules.
    """
    script = """
    () => {
        const results = {
            animatedElements: [],
            transitionElements: [],
            keyframes: []
        };

        const allElements = document.querySelectorAll('*');
        const seenAnimElements = new Set();
        const seenTransElements = new Set();

        for (const el of allElements) {
            // Ignore script, style, head, noscript, etc.
            if (['SCRIPT', 'STYLE', 'HEAD', 'NOSCRIPT', 'META', 'LINK'].includes(el.tagName)) {
                continue;
            }

            const style = window.getComputedStyle(el);
            
            // 1. Check CSS Animations
            const animName = style.animationName;
            if (animName && animName !== 'none') {
                const tag = el.tagName.toLowerCase();
                const id = el.id ? `#${el.id}` : '';
                const classes = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '';
                const selector = `${tag}${id}${classes}`;
                const textPreview = (el.innerText || '').slice(0, 40).replace(/\\n/g, ' ').trim();

                results.animatedElements.push({
                    selector: selector.slice(0, 100),
                    textPreview: textPreview,
                    animationName: animName,
                    duration: style.animationDuration,
                    delay: style.animationDelay,
                    iterationCount: style.animationIterationCount,
                    direction: style.animationDirection,
                    timingFunction: style.animationTimingFunction,
                    fillMode: style.animationFillMode,
                    playState: style.animationPlayState
                });
            }

            // 2. Check CSS Transitions
            const transProp = style.transitionProperty;
            const transDur = style.transitionDuration;
            if (transProp && transProp !== 'none' && transProp !== 'all 0s ease 0s' && transDur && transDur !== '0s') {
                const tag = el.tagName.toLowerCase();
                const id = el.id ? `#${el.id}` : '';
                const classes = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '';
                const selector = `${tag}${id}${classes}`;

                // Only log unique or significant elements
                if (!seenTransElements.has(selector) && results.transitionElements.length < 150) {
                    seenTransElements.add(selector);
                    results.transitionElements.push({
                        selector: selector.slice(0, 100),
                        transitionProperty: transProp,
                        duration: transDur,
                        delay: style.transitionDelay,
                        timingFunction: style.transitionTimingFunction
                    });
                }
            }
        }

        // 3. Inspect document.styleSheets for @keyframes rules
        for (let i = 0; i < document.styleSheets.length; i++) {
            const sheet = document.styleSheets[i];
            try {
                const rules = sheet.cssRules || sheet.rules;
                if (!rules) continue;

                for (let j = 0; j < rules.length; j++) {
                    const rule = rules[j];
                    // CSSRule.KEYFRAMES_RULE is 7
                    if (rule.type === 7 || rule instanceof CSSKeyframesRule) {
                        const keyframeData = {
                            name: rule.name,
                            cssText: rule.cssText ? rule.cssText.slice(0, 500) : '',
                            keyframeStops: []
                        };
                        for (let k = 0; k < rule.cssRules.length; k++) {
                            const stop = rule.cssRules[k];
                            keyframeData.keyframeStops.push({
                                keyText: stop.keyText,
                                cssText: stop.style ? stop.style.cssText : ''
                            });
                        }
                        results.keyframes.push(keyframeData);
                    }
                }
            } catch (e) {
                // Cross-origin stylesheet access might be blocked by CORS
                results.corsBlockedSheets = (results.corsBlockedSheets || 0) + 1;
            }
        }

        return results;
    }
    """
    data = page.evaluate(script)
    return data
