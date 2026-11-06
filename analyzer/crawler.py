"""
Playwright Crawler and DOM/Interaction Inspector Module.
Automates browser actions, section captures, gradual scrolling,
hover testing, interactive demo & form inspection, and mobile viewport checks.
"""

import os
import time
import json
from typing import Dict, List, Any, Optional
from playwright.sync_api import sync_playwright, Page, BrowserContext

from analyzer.css_inspector import extract_css_animations_and_transitions
from analyzer.js_inspector import inspect_web_animations_and_libraries


class WebsiteMotionCrawler:
    def __init__(
        self,
        target_url: str = "https://ali-and-ai.com/",
        output_dir: str = "captures",
        headless: bool = True
    ):
        self.target_url = target_url
        self.output_dir = output_dir
        self.screenshots_dir = os.path.join(output_dir, "screenshots")
        self.recordings_dir = os.path.join(output_dir, "recordings")
        self.reports_dir = os.path.join(output_dir, "reports")
        self.headless = headless

        os.makedirs(self.screenshots_dir, exist_ok=True)
        os.makedirs(self.recordings_dir, exist_ok=True)
        os.makedirs(self.reports_dir, exist_ok=True)

    def run_full_inspection(self) -> Dict[str, Any]:
        """
        Executes complete inspection across desktop and mobile viewports.
        """
        inspection_data: Dict[str, Any] = {
            "target_url": self.target_url,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "metadata": {},
            "sections": [],
            "navbar_behavior": {},
            "button_interactions": [],
            "card_interactions": [],
            "live_demo_interactions": {},
            "contact_form": {},
            "css_analysis": {},
            "js_analysis": {},
            "responsive_mobile": {},
            "video_recording_path": None
        }

        print(f"[Crawler] Starting Playwright Chromium for {self.target_url}...")
        with sync_playwright() as p:
            # 1. Desktop Session with Video Recording
            browser = p.chromium.launch(
                headless=self.headless,
                args=["--disable-blink-features=AutomationControlled"]
            )

            context = browser.new_context(
                viewport={"width": 1440, "height": 900},
                record_video_dir=self.recordings_dir,
                record_video_size={"width": 1440, "height": 900},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            )

            page = context.new_page()

            try:
                print(f"[Crawler] Navigating to {self.target_url}...")
                response = page.goto(self.target_url, wait_until="domcontentloaded", timeout=45000)
                page.wait_for_timeout(3000)  # Allow initial animations/fonts to settle
                
                inspection_data["metadata"] = {
                    "title": page.title(),
                    "http_status": response.status if response else None,
                    "url": page.url
                }
                print(f"[Crawler] Page title: {page.title()}")

                # 2. Capture Initial State & Full Page
                print("[Crawler] Capturing initial state & full page screenshots...")
                page.screenshot(path=os.path.join(self.screenshots_dir, "01_initial_state.png"))
                page.screenshot(path=os.path.join(self.screenshots_dir, "02_full_page.png"), full_page=True)

                # 3. Inspect Navigation & Sticky Header Behavior (Pre-scroll)
                initial_nav_styles = self._inspect_navbar(page)

                # 4. Detect Page Sections
                sections = self._identify_sections(page)
                inspection_data["sections"] = sections
                print(f"[Crawler] Identified {len(sections)} major sections.")

                # 5. Capture Individual Section Screenshots
                self._capture_section_screenshots(page, sections)

                # 6. Gradual Smooth Scroll (Observe reveals & sticky header)
                print("[Crawler] Executing gradual scroll through page...")
                scroll_observations = self._gradual_scroll(page)
                inspection_data["scroll_observations"] = scroll_observations

                # Post-scroll navbar check
                scrolled_nav_styles = self._inspect_navbar(page)
                inspection_data["navbar_behavior"] = {
                    "initial": initial_nav_styles,
                    "scrolled": scrolled_nav_styles,
                    "is_sticky": scrolled_nav_styles.get("position") in ["fixed", "sticky"] or initial_nav_styles.get("position") in ["fixed", "sticky"],
                    "style_changes_on_scroll": self._diff_styles(initial_nav_styles, scrolled_nav_styles)
                }

                # Scroll back to top smoothly
                page.evaluate("window.scrollTo({top: 0, behavior: 'smooth'});")
                page.wait_for_timeout(1000)

                # 7. Button & Link Interactions
                print("[Crawler] Inspecting buttons and hover states...")
                btn_results = self._inspect_buttons(page)
                inspection_data["button_interactions"] = btn_results

                # 8. Card Hover Interactions
                print("[Crawler] Inspecting cards and hover effects...")
                card_results = self._inspect_cards(page)
                inspection_data["card_interactions"] = card_results

                # 9. Live Demo / Chat Interface Inspection
                print("[Crawler] Inspecting live demo or chat elements...")
                demo_results = self._inspect_live_demo(page)
                inspection_data["live_demo_interactions"] = demo_results

                # 10. Contact Form Inspection (Non-submitting)
                print("[Crawler] Inspecting contact form elements...")
                form_results = self._inspect_contact_form(page)
                inspection_data["contact_form"] = form_results

                # 11. CSS & JS Deep Inspection
                print("[Crawler] Running CSS and JS animation inspectors...")
                inspection_data["css_analysis"] = extract_css_animations_and_transitions(page)
                inspection_data["js_analysis"] = inspect_web_animations_and_libraries(page)

            except Exception as e:
                print(f"[Crawler] Error during desktop crawling: {e}")
                inspection_data["error"] = str(e)
            finally:
                page.close()
                context.close()

            # Find the saved video file
            video_files = [f for f in os.listdir(self.recordings_dir) if f.endswith(".webm")]
            if video_files:
                # Get the most recent video
                video_files.sort(key=lambda x: os.path.getmtime(os.path.join(self.recordings_dir, x)), reverse=True)
                inspection_data["video_recording_path"] = os.path.join(self.recordings_dir, video_files[0])
                print(f"[Crawler] Video recorded to: {inspection_data['video_recording_path']}")

            # 12. Mobile Responsive Inspection
            print("[Crawler] Launching mobile viewport (390x844)...")
            mobile_context = browser.new_context(
                viewport={"width": 390, "height": 844},
                is_mobile=True,
                has_touch=True,
                user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
            )
            mobile_page = mobile_context.new_page()
            try:
                mobile_page.goto(self.target_url, wait_until="domcontentloaded", timeout=30000)
                mobile_page.wait_for_timeout(2000)
                mobile_page.screenshot(path=os.path.join(self.screenshots_dir, "mobile_01_hero.png"))
                
                # Check for mobile menu button / hamburger (#burger)
                menu_btn = mobile_page.query_selector("#burger, button[aria-label*='menu'], button[class*='menu'], button[class*='hamburger'], [data-mobile-menu]")
                menu_opened = False
                if menu_btn:
                    try:
                        menu_btn.hover()
                        mobile_page.wait_for_timeout(300)
                        menu_btn.click()
                        mobile_page.wait_for_timeout(600)
                        mobile_page.screenshot(path=os.path.join(self.screenshots_dir, "mobile_02_menu_open.png"))
                        menu_opened = True
                        print("[Crawler] Successfully opened mobile menu and captured screenshot.")
                    except Exception as e:
                        print(f"[Crawler] Mobile menu click issue: {e}")

                mobile_page.screenshot(path=os.path.join(self.screenshots_dir, "mobile_03_full_page.png"), full_page=True)

                inspection_data["responsive_mobile"] = {
                    "tested_viewport": {"width": 390, "height": 844},
                    "has_mobile_menu_trigger": menu_btn is not None,
                    "menu_opened_successfully": menu_opened
                }
            except Exception as e:
                print(f"[Crawler] Error in mobile inspection: {e}")
                inspection_data["responsive_mobile"] = {"error": str(e)}
            finally:
                mobile_page.close()
                mobile_context.close()
                browser.close()

        # Save inspection JSON
        raw_report_path = os.path.join(self.reports_dir, "inspection_raw.json")
        with open(raw_report_path, "w", encoding="utf-8") as f:
            json.dump(inspection_data, f, indent=2, ensure_ascii=False)
        print(f"[Crawler] Raw inspection data saved to: {raw_report_path}")

        return inspection_data

    def _inspect_navbar(self, page: Page) -> Dict[str, Any]:
        """Inspects navbar styling and positioning."""
        script = """
        () => {
            const nav = document.querySelector('header, nav, [role="navigation"], .navbar, [class*="nav"]');
            if (!nav) return { found: false };
            const style = window.getComputedStyle(nav);
            const rect = nav.getBoundingClientRect();
            return {
                found: true,
                tagName: nav.tagName.toLowerCase(),
                className: nav.className,
                position: style.position,
                top: style.top,
                background: style.backgroundColor,
                backdropFilter: style.backdropFilter || style.webkitBackdropFilter || 'none',
                boxShadow: style.boxShadow,
                height: `${rect.height}px`,
                width: `${rect.width}px`,
                transition: style.transition
            };
        }
        """
        try:
            return page.evaluate(script)
        except Exception:
            return {"found": False}

    def _identify_sections(self, page: Page) -> List[Dict[str, Any]]:
        """Identifies semantic page sections, headings, and bounding boxes."""
        script = """
        () => {
            const results = [];
            const candidates = document.querySelectorAll('header, section, footer, main > div, [id], [class*="section"], [class*="hero"]');
            const seen = new Set();

            for (const el of candidates) {
                const rect = el.getBoundingClientRect();
                // Filter out tiny or invisible containers
                if (rect.height < 120 || rect.width < 300) continue;

                const heading = el.querySelector('h1, h2, h3');
                const headingText = heading ? heading.innerText.trim().slice(0, 80) : '';
                const tag = el.tagName.toLowerCase();
                const id = el.id ? `#${el.id}` : '';
                const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.') : '';
                const selector = `${tag}${id}${cls}`;

                if (seen.has(selector)) continue;
                seen.add(selector);

                results.push({
                    selector: selector,
                    id: el.id || null,
                    heading: headingText,
                    top: Math.round(rect.top + window.scrollY),
                    height: Math.round(rect.height),
                    width: Math.round(rect.width)
                });
            }

            // Sort by vertical position
            results.sort((a, b) => a.top - b.top);
            return results.slice(0, 15);
        }
        """
        try:
            return page.evaluate(script)
        except Exception:
            return []

    def _capture_section_screenshots(self, page: Page, sections: List[Dict[str, Any]]):
        """Scrolls to and captures screenshots for each identified section."""
        for idx, sec in enumerate(sections[:12]):
            try:
                top = sec.get("top", 0)
                page.evaluate(f"window.scrollTo({{top: {max(0, top - 60)}, behavior: 'instant'}});")
                page.wait_for_timeout(500)
                raw_id = sec.get("id") or f"block_{idx+1}"
                clean_id = raw_id.replace("#", "").replace(".", "_").replace(" ", "_")
                safe_name = f"section_{idx+1}_{clean_id}.png"
                path = os.path.join(self.screenshots_dir, safe_name)
                page.screenshot(path=path)
                sec["screenshot"] = safe_name
                print(f"[Crawler] Saved section screenshot: {safe_name}")
            except Exception as e:
                print(f"[Crawler] Could not screenshot section {idx}: {e}")

    def _gradual_scroll(self, page: Page) -> Dict[str, Any]:
        """Gradually scrolls down the entire page to trigger scroll-based animations."""
        scroll_height = page.evaluate("() => document.body.scrollHeight")
        viewport_height = page.evaluate("() => window.innerHeight")
        
        current_scroll = 0
        step = 250
        steps_taken = 0

        while current_scroll < scroll_height and steps_taken < 50:
            current_scroll += step
            page.evaluate(f"window.scrollTo({{top: {current_scroll}, behavior: 'smooth'}});")
            page.wait_for_timeout(250)
            steps_taken += 1

        # Final pause at bottom
        page.wait_for_timeout(1000)
        return {
            "total_scroll_height": scroll_height,
            "viewport_height": viewport_height,
            "steps_taken": steps_taken
        }

    def _inspect_buttons(self, page: Page) -> List[Dict[str, Any]]:
        """Finds primary and secondary buttons/CTAs, checks hover transitions."""
        script = """
        () => {
            const btns = Array.from(document.querySelectorAll('button, a[href*="contact"], a[href*="calendly"], a[class*="btn"], a[class*="button"], [role="button"]'));
            return btns.slice(0, 10).map((b, i) => {
                const rect = b.getBoundingClientRect();
                const style = window.getComputedStyle(b);
                return {
                    index: i,
                    text: (b.innerText || '').slice(0, 40).trim(),
                    tag: b.tagName.toLowerCase(),
                    href: b.getAttribute('href') || null,
                    rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
                    initialStyles: {
                        color: style.color,
                        backgroundColor: style.backgroundColor,
                        transform: style.transform,
                        boxShadow: style.boxShadow,
                        border: style.border,
                        transition: style.transition
                    }
                };
            }).filter(b => b.rect.width > 30 && b.rect.height > 20);
        }
        """
        btn_data = page.evaluate(script)
        results = []

        for b in btn_data[:6]:
            btn_info = dict(b)
            try:
                # Scroll button into view & hover
                locators = page.locator(f"{b['tag']}:has-text('{b['text']}')")
                if locators.count() > 0:
                    loc = locators.first
                    loc.scroll_into_view_if_needed()
                    page.wait_for_timeout(150)
                    loc.hover()
                    page.wait_for_timeout(350)

                    # Get hovered style
                    hover_style = page.evaluate("""
                    (text) => {
                        const el = Array.from(document.querySelectorAll('button, a')).find(e => (e.innerText || '').trim().includes(text));
                        if (!el) return null;
                        const s = window.getComputedStyle(el);
                        return {
                            color: s.color,
                            backgroundColor: s.backgroundColor,
                            transform: s.transform,
                            boxShadow: s.boxShadow,
                            border: s.border
                        };
                    }
                    """, b["text"])

                    btn_info["hoverStyles"] = hover_style
                    btn_info["diff"] = self._diff_styles(b["initialStyles"], hover_style or {})
            except Exception as e:
                btn_info["hover_error"] = str(e)
            results.append(btn_info)

        return results

    def _inspect_cards(self, page: Page) -> List[Dict[str, Any]]:
        """Inspects card components for hover lift, border glow, and transition timing."""
        card_locators = page.locator(".card, [class*='card'], .service-card, .lab-card")
        count = card_locators.count()
        results = []

        for idx in range(min(count, 6)):
            loc = card_locators.nth(idx)
            try:
                loc.scroll_into_view_if_needed()
                page.wait_for_timeout(200)

                # Get initial style
                initial_style = loc.evaluate("""
                el => {
                    const s = window.getComputedStyle(el);
                    return {
                        transform: s.transform,
                        boxShadow: s.boxShadow,
                        borderColor: s.borderColor,
                        backgroundColor: s.backgroundColor,
                        transition: s.transition
                    };
                }
                """)

                # Hover over card
                loc.hover()
                page.wait_for_timeout(350)

                # Get hovered style
                hover_style = loc.evaluate("""
                el => {
                    const s = window.getComputedStyle(el);
                    return {
                        transform: s.transform,
                        boxShadow: s.boxShadow,
                        borderColor: s.borderColor,
                        backgroundColor: s.backgroundColor
                    };
                }
                """)

                results.append({
                    "index": idx,
                    "initialStyles": initial_style,
                    "hoverStyles": hover_style,
                    "diff": self._diff_styles(initial_style, hover_style or {})
                })
            except Exception as e:
                results.append({"index": idx, "error": str(e)})

        # Move mouse away
        page.mouse.move(0, 0)
        return results

    def _inspect_live_demo(self, page: Page) -> Dict[str, Any]:
        """Detects live demo widgets, interactive chat windows, tabs or toggles."""
        script = """
        () => {
            const results = {
                chatElementsFound: false,
                chatContainers: [],
                interactiveToggles: [],
                demoInputs: []
            };

            // Check chat-like containers
            const chatCandidates = document.querySelectorAll('[class*="chat"], [class*="bot"], [class*="conversation"], [class*="message"], [id*="chat"]');
            chatCandidates.forEach(c => {
                results.chatContainers.push({
                    tagName: c.tagName.toLowerCase(),
                    className: c.className,
                    textPreview: (c.innerText || '').slice(0, 60).replace(/\\n/g, ' ')
                });
            });
            results.chatElementsFound = results.chatContainers.length > 0;

            // Check tabs / toggles
            const toggles = document.querySelectorAll('[role="tab"], [role="switch"], [class*="toggle"], [class*="tab"]');
            toggles.forEach(t => {
                results.interactiveToggles.push({
                    text: (t.innerText || '').slice(0, 30),
                    role: t.getAttribute('role'),
                    ariaSelected: t.getAttribute('aria-selected')
                });
            });

            // Check inputs in demo area
            const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea');
            inputs.forEach(inp => {
                results.demoInputs.push({
                    type: inp.getAttribute('type') || 'text',
                    placeholder: inp.getAttribute('placeholder') || '',
                    name: inp.getAttribute('name') || ''
                });
            });

            return results;
        }
        """
        try:
            return page.evaluate(script)
        except Exception as e:
            return {"error": str(e)}

    def _inspect_contact_form(self, page: Page) -> Dict[str, Any]:
        """
        Inspects contact form elements, inputs, placeholders, and hover/focus styles.
        DOES NOT SUBMIT THE FORM.
        """
        script = """
        () => {
            const form = document.querySelector('form, [class*="contact"], [id*="contact"]');
            if (!form) return { found: false };

            const inputs = Array.from(form.querySelectorAll('input, textarea, select, button[type="submit"]'));
            const fields = inputs.map(el => {
                const style = window.getComputedStyle(el);
                return {
                    tagName: el.tagName.toLowerCase(),
                    type: el.getAttribute('type') || 'text',
                    placeholder: el.getAttribute('placeholder') || '',
                    required: el.hasAttribute('required'),
                    name: el.getAttribute('name') || '',
                    styles: {
                        borderRadius: style.borderRadius,
                        border: style.border,
                        backgroundColor: style.backgroundColor,
                        transition: style.transition
                    }
                };
            });

            return {
                found: true,
                formId: form.id || null,
                action: form.getAttribute('action') || null,
                fieldsCount: fields.length,
                fields: fields
            };
        }
        """
        try:
            return page.evaluate(script)
        except Exception as e:
            return {"found": False, "error": str(e)}

    def _diff_styles(self, initial: Dict[str, Any], hovered: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
        """Identifies properties that changed between initial and hovered states."""
        changes = {}
        for key, val in hovered.items():
            if key in initial and initial[key] != val:
                changes[key] = {
                    "from": initial[key],
                    "to": val
                }
        return changes
