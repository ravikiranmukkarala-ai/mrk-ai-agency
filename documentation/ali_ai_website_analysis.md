# Website Motion & Interaction Analysis: Ali & AI (`ali-and-ai.com`)

**Target URL:** [https://ali-and-ai.com/](https://ali-and-ai.com/)  
**Inspection Date:** 2026-11-06  
**Analysis Engine:** Playwright (Chromium Headless & Mobile Emulation), tinycss2, BeautifulSoup4, OpenCV (Frame Difference & Contact Sheet Generator)  
**Artifact References:**  
- Full Page Capture: [02_full_page.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/02_full_page.png)  
- Initial Viewport Capture: [01_initial_state.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/01_initial_state.png)  
- Motion Contact Sheet: [motion_contact_sheet.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/recordings/motion_contact_sheet.png)  
- Raw Inspection Data: [inspection_raw.json](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/inspection_raw.json)  
- Extracted Styles: [extracted_styles.css](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/extracted_styles.css)  
- Extracted Inline Interaction Script: [inline_script.js](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/inline_script.js)  

---

## 1. Executive Summary & Architecture Overview

`ali-and-ai.com` is a dark-mode, high-conversion landing page for an AI automation agency founded by Alina Kremenchutska. The website achieves an ultra-smooth, futuristic aesthetic not through heavyweight 3D JavaScript libraries (such as Three.js, GSAP, or WebGL), but through **native CSS transitions, pure CSS keyframe loops, and lightweight HTML5 Canvas 2D / requestAnimationFrame scripts** totaling only 5.4 KB of inline JavaScript and 22 KB of compiled CSS.

### Key Motion & Tech Findings:
- **No Heavy External Animation Libraries:** Zero traces of GSAP, Framer Motion, Lottie, Three.js, or Anime.js. All animations are executed natively via the browser's compositor thread.
- **Micro-interactive Mascot:** The hero section features a 3D robot head (`.robot-orb` and `.eyes`) that dynamically tracks the user's mouse position using trigonometric angles and perspective transforms.
- **Ambient Canvas Cursor Trail:** A fixed 2D `<canvas id="trail">` draws an electric cyan glowing particle trail following fine pointer movements, decaying over 450ms.
- **Accessibility & Reduced Motion:** The script strictly gates interactive mouse tracking and particle trails behind `window.matchMedia('(pointer: fine)').matches` and `(prefers-reduced-motion: reduce)`.
- **Serverless Live Demo:** The interactive demo chat widget communicates directly with `/.netlify/functions/chat` using structured JSON messages.

---

## 2. Website Section Inventory

The website is laid out as a single continuous landing page consisting of 11 distinct sections, ordered from top to bottom:

| # | Section Selector | Section ID | Heading / Purpose | Vertical Top | Height | Screenshot Reference |
|---|---|---|---|---|---|---|
| 1 | `canvas#trail` | `trail` | Fullscreen particle cursor trail canvas | `0px` | `900px` | [section_1_trail.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_1_trail.png) |
| 2 | `header.hero` | — | Hero section with interactive robot & headline | `71px` | `707px` | [01_initial_state.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/01_initial_state.png) |
| 3 | `div.strip` | — | Infinite ticker strip ("Email sorting ◆ AI phone systems...") | `715px` | `64px` | [section_2_block_2.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_2_block_2.png) |
| 4 | `section#cost` | `cost` | Problem statement & Cost comparison (Good vs. Bad) | `778px` | `955px` | [section_4_cost.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_4_cost.png) |
| 5 | `section#services` | `services` | 6 AI Automation service cards | `1733px` | `1037px` | [section_5_services.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_5_services.png) |
| 6 | `section#process` | `process` | 4-step execution workflow | `2770px` | `578px` | [section_6_process.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_6_process.png) |
| 7 | `section#work` | `work` | Electrical contractor case study & workflow breakdown | `3348px` | `1824px` | [section_7_work.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_7_work.png) |
| 8 | `section#lab` | `lab` | Evaluation metrics, benchmarks & reliability tests | `5172px` | `782px` | [section_8_lab.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_8_lab.png) |
| 9 | `section#about` | `about` | Founder bio ("Hi, I'm Alina"), photo & Amazon book CTA | `5954px` | `1083px` | [section_9_about.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_9_about.png) |
| 10 | `section#demo` | `demo` | Live interactive AI chatbot widget | `7037px` | `911px` | [section_11_demo.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_11_demo.png) |
| 11 | `section#contact` | `contact` | Lead intake form (`form#leadForm`) & direct channels | `7948px` | `909px` | [section_12_chatBody.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/section_12_chatBody.png) |
| 12 | `footer` | — | Site footer, sitemap links & copyright | `8857px` | `415px` | [02_full_page.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/02_full_page.png) |

---

## 3. Hero Visual & Mascot Motion Analysis

The Hero section combines two key motion layers: an ambient orbital system and an interactive gaze-tracking mascot.

```
       [ .robot-ring.r2 (400px, 26s reverse) ]
     [ .robot-ring (340px, 18s normal spin) ]
   +-------------------------------------------+
   |              .robot-orb (270px)           |
   |   [ .robot-face (180x130, dark glass) ]   |
   |   [   .eye (blink)      .eye (blink)   ]   |
   +-------------------------------------------+
```

### Detailed Animation Breakdown:

#### 1. Inner Orbital Ring (`div.robot-ring`)
- **Element:** `div.robot-ring`
- **Animation Description:** Thin circular border (`border: 1px solid rgba(53, 208, 242, 0.18)`) with a glowing satellite cyan dot (`::before`, 8px diameter, `box-shadow: 0 0 16px #35D0F2`) orbiting 360 degrees around the center mascot.
- **Trigger:** Immediate on page load (autonomous CSS loop).
- **Duration (Measured):** `18.0s` (`18000ms`).
- **Delay (Measured):** `0s`.
- **Easing (Measured):** `linear`.
- **Direction (Measured):** `normal`.
- **Loop Behavior:** `infinite`.
- **Desktop/Mobile:** Active on all screens; scaled on mobile via container sizing.
- **Evidence Reference:** [extracted_styles.css#L56-L61](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/extracted_styles.css#L56-L61); [inspection_raw.json#L744-L754](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/inspection_raw.json#L744-L754).
- **Confidence Level:** 100% (Confirmed by Web Animations API and CSSOM).

#### 2. Outer Orbital Ring (`div.robot-ring.r2`)
- **Element:** `div.robot-ring.r2`
- **Animation Description:** Secondary concentric circular orbit (400px diameter) rotating in reverse, creating counter-rotational depth.
- **Trigger:** Immediate on load.
- **Duration (Measured):** `26.0s` (`26000ms`).
- **Delay (Measured):** `0s`.
- **Easing (Measured):** `linear`.
- **Direction (Measured):** `reverse`.
- **Loop Behavior:** `infinite`.
- **Evidence Reference:** [extracted_styles.css#L58](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/extracted_styles.css#L58); [inspection_raw.json#L756-L766](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/inspection_raw.json#L756-L766).
- **Confidence Level:** 100%.

#### 3. Robot Eyes Blink (`div.eye`)
- **Element:** `div.eye` (2 instances within `.eyes`)
- **Animation Description:** Vertical squash-and-stretch eye blink using `transform: scaleY(1)` to `transform: scaleY(0.1)`. The animation stays open for 92% of the loop, closes sharply at 96%, and re-opens at 100%.
- **Trigger:** Continuous autonomous loop.
- **Duration (Measured):** `5.0s` (`5000ms`).
- **Delay (Measured):** `0s`.
- **Easing (Measured):** `ease`.
- **Direction:** `normal`.
- **Keyframes (Measured):**
  - `0%, 92%, 100%`: `transform: scaleY(1)`
  - `96%`: `transform: scaleY(0.1)`
- **Evidence Reference:** [extracted_styles.css#L67-L71](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/extracted_styles.css#L67-L71); [inspection_raw.json#L768-L790](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/inspection_raw.json#L768-L790).
- **Confidence Level:** 100%.

#### 4. Robot Interactive Cursor Gaze & Perspective Tilt
- **Elements:** `div.robot-orb` and `div#eyes.eyes`
- **Animation Description:** When the mouse moves across the viewport, JavaScript calculates the angle and distance between the mascot center and the cursor. The eyes translate up to 22px horizontally and 14px vertically, while the metallic orb rotates up to 10 degrees in 3D perspective (`perspective(700px) rotateY(...) rotateX(...)`).
- **Formula (from `inline_script.js`):**
  $$\Delta x = \text{mouseX} - c_x, \quad \Delta y = \text{mouseY} - c_y$$
  $$\text{dist} = \sqrt{\Delta x^2 + \Delta y^2}, \quad \text{pull} = \min\left(\frac{\text{dist}}{300}, 1\right)$$
  $$\text{eyes.style.transform} = \text{translate}\left(\frac{\Delta x}{\text{dist}} \cdot 22 \cdot \text{pull}\,\text{px},\, \frac{\Delta y}{\text{dist}} \cdot 14 \cdot \text{pull}\,\text{px}\right)$$
  $$\text{orb.style.transform} = \text{perspective}(700\text{px})\,\text{rotateY}\left(\frac{\Delta x}{\text{dist}} \cdot 10 \cdot \text{pull}^\circ\right)\,\text{rotateX}\left(-\frac{\Delta y}{\text{dist}} \cdot 10 \cdot \text{pull}^\circ\right)$$
- **Transition Smoothing:**
  - Eyes: `transition: transform 0.15s ease-out`
  - Orb: `transition: transform 0.2s ease-out`
- **Trigger:** Mousemove on window (active pointer devices only).
- **Reset Trigger:** `document.addEventListener('mouseleave')` resets transforms to `""`.
- **Desktop/Mobile:** Desktop only (`pointer: fine`); completely bypassed on touch/mobile and when `prefers-reduced-motion: reduce` is enabled.
- **Evidence Reference:** [inline_script.js#L23-L33](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/inline_script.js#L23-L33).
- **Confidence Level:** 100%.

---

## 4. Navigation & Sticky Header Behavior

- **Initial State:** `position: sticky; top: 0px; z-index: 60; background: rgba(14, 17, 22, 0.82); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(199, 205, 214, 0.10); height: 71px;`
- **Scroll Behavior:** Because the navigation is built with `position: sticky; top: 0;`, it stays anchored at the top of the viewport during entire scroll travel without needing JavaScript scroll event listeners or layout jumps.
- **Nav Link Hover:** `color` transitions smoothly from `var(--steel)` (`rgb(135, 146, 163)`) to `var(--silver-bright)` (`rgb(238, 241, 245)`) on hover.
- **Nav CTA Button ("Get a quote"):**
  - Normal: background `#35D0F2`, text `#04222B`, border-radius `100px`.
  - Transition (Measured): `transition: box-shadow 0.2s ease`.
  - Hover State (Measured): `boxShadow: rgba(53, 208, 242, 0.35) 0px 0px 24px 0px`.

---

## 5. Background & Cursor Effects

### 1. Canvas Cursor Particle Trail (`canvas#trail`)
- **Element:** `<canvas id="trail">`, fixed fullscreen (`inset: 0; pointer-events: none; z-index: 55`).
- **Mechanism:** HTML5 2D Canvas context with requestAnimationFrame loop.
- **Trail Lifetime:** Exactly `450ms` (`const LIFE = 450;`).
- **Line Rendering:**
  - Line cap / join: `'round'`.
  - Stroke style: `rgba(53, 208, 242, ${0.55 * life})`.
  - Shadow glow: `shadowColor = 'rgba(53, 208, 242, 0.9)'`, `shadowBlur = 12 * life`.
  - Line width: dynamically scales as `1 + 5 * life` (tapered tail).
  - Maximum queued points: 60.
- **Auto-Stop:** When all points exceed 450ms, the animation loop stops (`running = false`) and clears the canvas to consume 0% idle CPU.
- **Evidence Reference:** [inline_script.js#L10-L58](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/inline_script.js#L10-L58).

### 2. Ambient Radial Background Glows
- **Hero Top Glow:** 480px circle, `background: rgba(53, 208, 242, 0.16); filter: blur(100px);`
- **Hero Bottom Glow:** 360px circle, `background: rgba(135, 146, 163, 0.14); filter: blur(100px);`
- **CTA Band Glow:** 320px circle, `background: var(--accent); filter: blur(140px); opacity: 0.14;`
- **Motion:** Static blurred CSS glow elements, non-animated, preventing unnecessary GPU redraws while providing deep ambient lighting.

---

## 6. Text Animations & Infinite Ticker

### 1. Infinite Service Strip (`div.strip-track`)
- **Element:** `div.strip-track`
- **Animation Name:** `scroll`
- **Definition:** `@keyframes scroll { 100% { transform: translateX(-50%); } }`
- **Duration (Measured):** `24.0s` (`24000ms`).
- **Timing Function:** `linear`.
- **Iteration Count:** `infinite`.
- **Content:** Seamlessly repeated marquee text ("Email sorting ◆ AI phone systems ◆ Chatbots ◆ Social automation ◆ Lead qualification ◆").
- **Evidence Reference:** [extracted_styles.css#L74-L79](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/extracted_styles.css#L74-L79); [inspection_raw.json#L792-L802](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/inspection_raw.json#L792-L802).

### 2. Metallic Gradient Heading Fill (`.metal`)
- **Rule:** `background: linear-gradient(135deg, #E8ECF1 0%, #B8BFC9 40%, #EEF1F5 55%, #9AA3B0 100%) text; color: transparent;`
- **Visual Effect:** Simulates polished chrome/brushed aluminum typography on hero and CTA banners. Static gradient rendering with high contrast.

---

## 7. Interactive Cards & Container Hovers

Every card component on `ali-and-ai.com` employs a unified micro-interaction model:

### 1. Service Cards (`.card`) & Workflow Cards
- **Initial Computed Style (Measured):**
  - `transform: none`
  - `borderColor: rgba(199, 205, 214, 0.10)`
  - `backgroundColor: rgb(22, 26, 33)` (`#161A21`)
  - `transition: transform 0.25s, border-color 0.25s`
- **Hover State (Measured):**
  - `transform: matrix(1, 0, 0, 1, 0, -4)` (i.e. `translateY(-4px)` vertical lift)
  - `borderColor: rgba(53, 208, 242, 0.40)` (Electric cyan border illumination)
- **Duration (Measured):** `0.25s` (`250ms`).
- **Easing:** Default browser ease curve.
- **Evidence Reference:** [inspection_raw.json#L393-L418](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/inspection_raw.json#L393-L418); [extracted_styles.css#L112-L113](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/extracted_styles.css#L112-L113).

### 2. Lab Benchmark Cards (`.lab-card`)
- **Initial Style:** `border: 1px solid var(--line); transition: border-color 0.25s;`
- **Hover State:** `borderColor: rgba(53, 208, 242, 0.40)`. Does not lift, maintaining tabular data alignment.

---

## 8. Button & CTA Animations

The site utilizes two core button variants with measured physics:

| Button Class | Default Style | Hover Transformation | Measured Transition | Evidence |
|---|---|---|---|---|
| `.btn-primary` ("Start automating", "Send") | Background `#35D0F2`, text `#04222B`, border `none`, radius `100px` | `transform: translateY(-2px);`<br>`box-shadow: 0 0 28px rgba(53,208,242,0.35);` | `box-shadow 0.2s, transform 0.2s` | [extracted_styles.css#L51-L52](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/extracted_styles.css#L51-L52) |
| `.btn-ghost` ("Talk to our AI →") | Background transparent, text `#C7CDD6`, border `1px solid rgba(199,205,214,0.22)` | `border-color: #35D0F2;` | `border-color 0.2s` | [extracted_styles.css#L53-L54](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/reports/extracted_styles.css#L53-L54) |

---

## 9. Workflow & Case Study Interactions

The Case Study section (`section#work`) presents a concrete automation project for an electrical contractor:
- **Visual Architecture:** Two-column split layout. Left side details problem and business stats (`case-stats`); right side displays an interactive workflow diagram (`.case-vis`).
- **Workflow Pipeline:** Sequence of `.flow` cards representing automated pipeline stages:
  1. Incoming Email / Voice Lead
  2. AI Parsing & Job Type Classification
  3. Quoting Engine & Database Sync
  4. WhatsApp / SMS Notification to Dispatcher
- **Flow Visuals:** Dark slate background `#1D222B`, gradient icons, connecting arrow markers (`.flow-ar` in cyan `#35D0F2`).
- **Motion:** Clean static layout with subtle hover highlights, ensuring maximum readability without distracting motion artifacts.

---

## 10. Live AI Chat Interface

The live demo (`section#demo`) provides a functional AI consultation widget:

```
+-------------------------------------------------------+
|  [A] Ali & AI assistant                  Online now   |
+-------------------------------------------------------+
|  Bot: Hi! I'm the Ali & AI assistant. Ask me...       |
|                                                       |
|                                     User: Can you...  |
|  Bot: Assistant is typing...                          |
+-------------------------------------------------------+
|  [ Ask about automation...                 ] [ Send ] |
+-------------------------------------------------------+
```

### Motion & Interaction Details:
1. **Typing Indicator:** When user sends a message, an italicized placeholder bubble (`.msg.bot.typing`) appears with text `"Assistant is typing…"`.
2. **Auto-Scroll Behavior:** Smooth programmatic scrolling to latest message via `body.scrollTop = body.scrollHeight`.
3. **Button Disable / Re-enable:** Send button opacity drops to 0.5 and disables during API roundtrip, transitioning back via `box-shadow 0.2s`.
4. **Backend Endpoint:** Directly dispatches POST to Netlify serverless function `/.netlify/functions/chat` with structured role/messages JSON.

---

## 11. Contact Form Behavior (Non-Submitting Inspection)

- **Form Identifier:** `<form id="leadForm">` inside `section#contact`.
- **Fields Inspected:**
  1. `Name` (Text, required, placeholder `"Jane Smith"`)
  2. `Email` (Email, required, placeholder `"you@business.com"`)
  3. `Phone` (Text, optional, placeholder `"Optional"`)
  4. `Business type` (`<select>`, options for E-commerce, Trades, Professional Services, etc.)
  5. `What to automate` (`<textarea>`, required, placeholder `"Tell us about the task that's eating your time..."`)
  6. Submit button (`.btn-primary`, `"Get my free automation audit"`)
- **Input Focus Transitions (Measured):**
  - Initial: `border: 1px solid rgba(199, 205, 214, 0.10); background: #0E1116; border-radius: 12px;`
  - Focus: `border-color: #35D0F2; outline: none;`
  - Transition (Measured): `transition: border-color 0.2s ease`.
- **Safety Verification:** Analyzer strictly inspected computed styles, placeholder strings, and field schema without triggering form submission.

---

## 12. Responsive & Mobile Observations

Tested under mobile viewport `390x844` (iPhone 14 emulation):

- **Mobile Navigation:**
  - Desktop nav links (`.nav-links`) hide below `900px` (`display: none`).
  - Hamburger button (`#burger`) appears (`display: flex`).
  - Hamburger consists of 3 horizontal bars (`span`). When toggled (`.burger.on`):
    - Bar 1: `transform: translateY(7px) rotate(45deg);`
    - Bar 2: `opacity: 0;`
    - Bar 3: `transform: translateY(-7px) rotate(-45deg);`
    - Transition: `0.3s ease`.
  - Dropdown menu (`#mobileMenu`) slides in cleanly with full-width stacked links.
  - Verified via screenshot: [mobile_02_menu_open.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/screenshots/mobile_02_menu_open.png).
- **Hero Stacking:** Layout transitions from 2-column grid (`1.15fr 0.85fr`) to single-column centered layout (`grid-template-columns: 1fr`).
- **Performance Optimization on Mobile:** Cursor trail (`#trail`) and robot mouse gaze are **completely disabled** on mobile via `window.matchMedia('(pointer: fine)').matches`. This preserves 100% of mobile battery life and eliminates GPU lag.

---

## 13. Identified Animation Technologies (Evidence-Based)

| Technology | Claimed / Rumored | Detected with Evidence? | Direct Evidence Found |
|---|---|---|---|
| **CSS Keyframe Animations** | Yes | **YES (Confirmed)** | `@keyframes spin` (18s & 26s), `@keyframes blink` (5s), `@keyframes scroll` (24s). Extracted directly from stylesheet. |
| **CSS Transitions** | Yes | **YES (Confirmed)** | Button lifts (`0.2s`), Card lifts (`0.25s`), Eye transitions (`0.15s`), Input focus rings (`0.2s`). |
| **HTML5 Canvas 2D** | Yes | **YES (Confirmed)** | `<canvas id="trail">` with `requestAnimationFrame` drawing loop and 450ms particle decay. |
| **Web Animations API** | Yes | **YES (Confirmed)** | 5 active running animations queried directly via `document.getAnimations()`. |
| **GSAP (GreenSock)** | Possible | **NO** | `window.gsap` is `undefined`, no GSAP scripts or ScrollTrigger markers. |
| **Framer Motion** | Possible | **NO** | No Framer data attributes or runtime objects. |
| **Lottie / Bodymovin** | Possible | **NO** | Zero `<lottie-player>` or JSON animation assets. |
| **Three.js / WebGL** | Possible | **NO** | No WebGL context (`getContext('webgl')` returned null for all canvases). |

---

## 14. OpenCV Video & Frame Motion Verification

Using OpenCV on the Playwright video recording ([page@1f1bba6f1f9cbbd8c244d64e3b557387.webm](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/recordings/page@1f1bba6f1f9cbbd8c244d64e3b557387.webm)):

- **Extracted Sample Frames:** 24 keyframes extracted across the interaction timeline.
- **Visual Contact Sheet:** Assembled at [motion_contact_sheet.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/recordings/motion_contact_sheet.png).
- **Peak Motion Transitions Identified:**
  1. **T=5.5s to 6.0s (Peak 1 - 99.7% change):** Scroll initiation from Hero down to the Cost & Services section. [motion_peak_1_diff.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/recordings/motion_peak_1_diff.png).
  2. **T=7.0s to 7.5s (Peak 2 - 90.15% change):** Mid-page continuous scrolling through Workflow and Case Studies. [motion_peak_2_diff.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/recordings/motion_peak_2_diff.png).
  3. **T=8.5s to 9.0s (Peak 3 - 90.15% change):** Rapid viewport translation approaching the Live Demo Chat and Lead Form. [motion_peak_3_diff.png](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/captures/recordings/motion_peak_3_diff.png).

---

## 15. Key Takeaways for MRK AI Agency

1. **Lightweight Beats Bloat:** Ali & AI feels fast, responsive, and polished because it avoids heavy 3D rendering engines and bloated bundle libraries. MRK AI should adopt this exact design principle: maximize native CSS hardware acceleration.
2. **Interactive Mascots Create Memorable Identity:** The gaze-tracking robot creates an instant impression of an "intelligent" agency. MRK AI can elevate this concept with an **Automated Neural Core** or **Agent Workflow Sphere** that reacts dynamically to user interaction.
3. **Strict Accessibility is Essential:** Gating intensive mouse and particle tracking behind `pointer: fine` and `prefers-reduced-motion` ensures the website is accessible, compliant, and battery-friendly.
4. **Actionable Live Demos Drive Trust:** Giving prospective clients a working chat sandbox directly proves technical competence before they ever fill out the contact form.
