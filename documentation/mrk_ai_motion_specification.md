# MRK AI Agency — Motion Design & Interaction Specification

**Project:** MRK AI Agency Website  
**Document:** Motion Design Specification  
**Version:** 1.0.0  
**Author:** Antigravity AI Engineering  
**Status:** Approved for Implementation (Phase 7 Build Preparation)  
**Reference Analysis:** [ali_ai_website_analysis.md](file:///c:/MyDigitalBrain/Projects/mentiby/websites/ravi_website/mrk-ai-agency/documentation/ali_ai_website_analysis.md)  

---

## 1. Vision & Motion Design Philosophy

MRK AI is a premier AI automation agency delivering intelligent autonomous agents, workflow automation, and custom neural systems for modern businesses. 

Where traditional websites either feel static or suffer from sluggish JavaScript-heavy 3D frameworks, MRK AI's motion language is engineered around three pillars:

1. **Compositor-Only Performance (60–120 FPS):** All animations operate strictly on `transform`, `opacity`, and `filter`. Layout thrashing (`top`, `left`, `width`, `margin`) is banned.
2. **Kinetic Intelligence:** Motion conveys computation. Data pulses along connection paths, neural orbits rotate smoothly, and cards illuminate as if powered by live electrical current.
3. **Universal Accessibility:** Comprehensive graceful degradation for `prefers-reduced-motion` and touch devices.

### Design Tokens & Physics Curves:

```css
:root {
  /* Brand Color Tokens */
  --mrk-bg: #0A0D12;
  --mrk-surface-1: #121721;
  --mrk-surface-2: #1A2230;
  --mrk-surface-3: #232D40;
  --mrk-border: rgba(200, 215, 235, 0.10);
  --mrk-cyan: #00F2FE;
  --mrk-blue: #4FACFE;
  --mrk-violet: #7928CA;
  --mrk-cyan-glow: rgba(0, 242, 254, 0.35);

  /* Standard Easing Curves */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in-out-smooth: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.2, 0.8, 0.2, 1);

  /* Timing Standards */
  --dur-fast: 0.2s;
  --dur-med: 0.35s;
  --dur-slow: 0.6s;
  --dur-hero: 0.9s;
}
```

---

## 2. Motion Specification Matrix

Below is the complete blueprint covering every interactive touchpoint of the MRK AI website:

### 2.1. Hero Entrance & Stagger Sequence

- **Element:** Hero Eyebrow Pill, Main Headline ("Architecting Autonomous Intelligence"), Subtitle, and Dual CTA Group.
- **Description:** Staggered upward emergence. Elements begin hidden, translated downward, and cascade into view with an exponential deceleration curve.
- **Trigger:** DOM Content Loaded / Initial Page Mount.
- **Measured Metrics:**
  - `Eyebrow Pill`: Delay `0.1s`, Duration `0.7s`, Translate `Y: 16px -> 0px`, Opacity `0 -> 1`.
  - `H1 Display Title`: Delay `0.25s`, Duration `0.85s`, Translate `Y: 28px -> 0px`, Opacity `0 -> 1`.
  - `Hero Paragraph`: Delay `0.4s`, Duration `0.8s`, Translate `Y: 20px -> 0px`, Opacity `0 -> 1`.
  - `CTA Buttons Group`: Delay `0.55s`, Duration `0.75s`, Translate `Y: 16px -> 0px`, Opacity `0 -> 1`.
- **Easing:** `var(--ease-out-expo)` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Direction:** Upward (+Y to 0).
- **Loop:** Runs once on load.
- **Mobile Behavior:** Identical stagger with reduced translation distance (`12px` instead of `28px`) to prevent scrollbar jumps.
- **Accessibility:** If `prefers-reduced-motion: reduce`, opacity transitions instantaneously (`0.01s`) with 0 translation.

---

### 2.2. The MRK AI "Neural Core" (Hero Visual Mascot)

Instead of a cartoon robot, MRK AI features a sophisticated **Autonomous Neural Core**: a multi-layered 3D kinetic orb surrounded by dynamic agent orbit rings and interactive mouse gaze tracking.

```
       [ Outer Agent Ring - 420px (24s spin, 3 satellite agent nodes) ]
     [ Inner Workflow Ring - 350px (16s reverse, glowing cyan pulse) ]
   +-----------------------------------------------------------------+
   |                 Central Neural Core (280px)                    |
   |   - Dark obsidian sphere with internal radial gradient depth     |
   |   - Responsive 3D perspective tilt reacting to pointer delta    |
   |   - Glowing Neural Iris with breathing pulse animation          |
   +-----------------------------------------------------------------+
```

#### Layer 1: Outer Agent Ring (`.mrk-agent-ring`)
- **Visual:** 420px circular hairline orbit (`border: 1px dashed rgba(0, 242, 254, 0.25)`) featuring 3 glowing satellite agent markers (LLM Parser, Autonomous Dispatcher, API Worker).
- **Animation:** Continuous 360-degree rotation.
- **Duration:** `24.0s`.
- **Easing:** `linear`.
- **Direction:** `normal`.
- **Loop:** `infinite`.

#### Layer 2: Inner Workflow Orbit (`.mrk-workflow-ring`)
- **Visual:** 350px solid hairline circle with dual counter-rotating orbital nodes.
- **Duration:** `16.0s`.
- **Easing:** `linear`.
- **Direction:** `reverse`.
- **Loop:** `infinite`.

#### Layer 3: Central Neural Nucleus & Interactive Tilt (`.mrk-core-sphere`)
- **Visual:** 280px obsidian sphere with metallic silver rim lighting and glowing core iris.
- **Interactive Trigger:** Mouse movement across desktop viewport (`pointer: fine`).
- **Gaze Tracking Formula:**
  - Maximum rotation: `12deg` tilt in 3D perspective (`perspective(800px) rotateY(...) rotateX(...)`).
  - Core Iris offset: Max `18px` horizontal, `12px` vertical shift following cursor.
  - Smooth damping: `transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1); will-change: transform;`.
- **Idle Breathing Effect:** When idle, core gently pulses scale (`scale(1.0)` to `scale(1.03)`) over an `8.0s` ease-in-out cycle.
- **Mobile Behavior:** Orbit rings continue spinning; mouse tracking is deactivated to save battery.
- **Accessibility:** Disabled under `prefers-reduced-motion: reduce`.

---

### 2.3. Background Motion & Ambient Network

- **Visual Concept:** Interactive Ambient Cyber-Mesh Canvas (`canvas#mrk-ambient`).
- **Description:** High-efficiency HTML5 2D canvas drawing subtle connecting neural nodes with electric cyan glow. When mouse moves, nearby nodes gently drift toward cursor within a 150px radius.
- **Lifecycle & Throttling:**
  - Renders max 45 nodes.
  - Pauses execution (`requestAnimationFrame` cancels) when page is out of viewport or user is inactive for > 15 seconds.
  - Memory footprint: < 2 MB, 0% CPU consumption during idle.
- **Mobile Behavior:** Static CSS radial glow spots (`filter: blur(120px)`); canvas is completely unmounted.

---

### 2.4. Typography Reveal & Metallic Accent

- **Element:** Section Headings (`.mrk-heading-display`) and Key Brand Highlights.
- **Effect:** **Cyber-Titanium Gradient Flow**.
  - Base: High-contrast metallic silver gradient (`linear-gradient(135deg, #FFF 0%, #B8C2D1 45%, #FFFFFF 60%, #8A99AD 100%)`).
  - Interactive Accent: Keywords highlight with an animated gradient shine that moves along the text on hover or scroll reveal.
- **Duration:** `2.5s` shimmer duration.
- **Easing:** `ease-in-out`.
- **Trigger:** Scrolled into view.

---

### 2.5. Scroll-Triggered Reveal System

- **Target Elements:** Section titles, grid containers, stats blocks, workflow pipelines.
- **Trigger:** Modern `IntersectionObserver` with `threshold: 0.15` and `rootMargin: "0px 0px -50px 0px"`.
- **Animation CSS:**
  ```css
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s var(--ease-spring), transform 0.6s var(--ease-spring);
    will-change: opacity, transform;
  }
  .reveal-on-scroll.is-revealed {
    opacity: 1;
    transform: translateY(0);
  }
  ```
- **Stagger Multiplier:** Child cards within `.reveal-group` receive cascading `transition-delay: calc(var(--item-index) * 80ms)`.

---

### 2.6. Service Cards & Spotlight Glow Interactions

- **Target Elements:** 6 Core Service Cards (Autonomous Support Agents, Workflow Automation, AI Voice Systems, CRM Lead Engines, Custom RAG Knowledgebases, Enterprise Integrations).
- **Micro-Interactions:**
  1. **Vertical Elevation:** `transform: translateY(-6px)` on hover.
  2. **Spotlight Border Highlight:** Using a dynamic CSS variable `--mouse-x` and `--mouse-y` updated on pointermove, a radial gradient follows the cursor along the card's 1px border:
     ```css
     .service-card {
       border: 1px solid var(--mrk-border);
       transition: transform 0.25s var(--ease-spring), border-color 0.25s ease;
     }
     .service-card:hover {
       transform: translateY(-6px);
       border-color: rgba(0, 242, 254, 0.45);
       box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 24px rgba(0, 242, 254, 0.12);
     }
     ```
  3. **Icon Illumination:** Interior icon container transitions background gradient and pulses cyan shadow on hover.
- **Duration:** `0.25s`.
- **Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)`.

---

### 2.7. Interactive Workflow Pipeline (Visual Flow Architecture)

- **Target Section:** Workflow & Systems Architecture Section (`#workflow`).
- **Interactive Component:** 4-Stage Horizontal/Vertical Pipeline:
  $$\text{Client Trigger} \longrightarrow \text{MRK Neural Agent} \longrightarrow \text{Logic \& Tool Execution} \longrightarrow \text{Automated Output}$$
- **Motion Spec:**
  - **Connection Lines:** Animated SVG paths with pulsing `stroke-dashoffset` (`2.0s linear infinite`) illustrating real-time data packets traversing the pipeline.
  - **Stage Activation:** Hovering over any pipeline stage illuminates that stage and increases the speed of adjacent connecting pulses, demonstrating real-time throughput.
- **Mobile Adaptation:** Converts to vertical stepped layout with vertical connecting pulses.

---

### 2.8. Project & Case Study Cards

- **Target Elements:** Case study spotlight cards featuring metrics (e.g., "78% Time Saved", "4.8x ROI").
- **Motion Spec:**
  - **Number Counter Reveal:** When scrolled into view, numerical values count up smoothly from 0 to final target using a lightweight `requestAnimationFrame` ease-out cubic counter.
  - **Duration:** `1.4s`.
  - **Hover Action:** Card subtly scales by `1.01` with cyan accent border reveal.

---

### 2.9. Navigation & Mobile Drawer Transitions

- **Desktop Header:**
  - Base: `position: sticky; top: 0; z-index: 100; backdrop-filter: blur(16px); background: rgba(10, 13, 18, 0.80); border-bottom: 1px solid var(--mrk-border);`.
  - Link Hover: Glowing cyan underline indicator emerges via `transform: scaleX(1)` from center (`0.2s ease`).
- **Mobile Menu Drawer:**
  - Full-screen glassmorphic overlay (`backdrop-filter: blur(24px)`).
  - Open Transition: Slides down smoothly (`transform: translateY(0)` from `-100%`) in `0.35s` with `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Staggered Link Inset: Menu links fade and slide in from the left with `40ms` incremental delay.
  - Hamburger Morph: 3-bar icon transitions into an electric cyan X (`translateY(7px) rotate(45deg)` / `-7px rotate(-45deg)`) in `0.25s`.

---

### 2.10. High-Conversion CTA Buttons

- **Primary Button (`.mrk-btn-primary`):**
  - Normal State: High-contrast electric cyan gradient (`linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)`), dark slate typography `#041B24`, border-radius `100px`.
  - Hover Transition:
    - Elevation: `transform: translateY(-2px);`
    - Radiant Bloom: `box-shadow: 0 0 28px rgba(0, 242, 254, 0.45), 0 8px 16px rgba(0, 0, 0, 0.3);`
    - Timing: `0.2s ease`.
  - Active / Click State: `transform: translateY(0px) scale(0.98);` (tactile spring response).
- **Secondary / Ghost Button (`.mrk-btn-ghost`):**
  - Normal State: Translucent glass background, 1px border `rgba(200, 215, 235, 0.20)`.
  - Hover Transition: Border color shifts to `#00F2FE`, background tint deepens to `rgba(0, 242, 254, 0.08)`.

---

### 2.11. Live AI Sandbox / Agent Terminal

- **Element:** Interactive Live AI Agent Playground (`#demo`).
- **Description:** Prospective clients can test-drive an actual MRK AI Autonomous Agent in real-time.
- **Interactive Sequence:**
  1. **Typing Prompt:** User clicks pre-built prompt pills ("Automate my customer intake", "Audit my manual email workflows") or types custom input.
  2. **Agent Thought Stream:** An animated status indicator cycles:
     - `● Initializing Agent...` (Delay 0ms)
     - `◆ Searching Tool Registry...` (Delay 400ms)
     - `✔ Generating Automation Blueprint...` (Delay 900ms)
  3. **Streaming Token Reveal:** Agent response appears with smooth character-by-character token streaming, mimicking real-time LLM inference.
  4. **Smooth Scroll Anchor:** Chat transcript automatically scrolls to bottom smoothly upon new token emissions.

---

## 3. Reduced Motion & Accessibility Implementation

Accessibility is a non-negotiable standard. Every animation defined in this specification respects the user's system preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Disable dynamic 3D transforms */
  .mrk-agent-ring,
  .mrk-workflow-ring,
  .mrk-core-sphere,
  .service-card,
  .mrk-btn-primary {
    transform: none !important;
    animation: none !important;
  }

  /* Replace particle canvases with clean static gradients */
  #mrk-ambient,
  #trail {
    display: none !important;
  }

  /* Ensure instant visibility for scroll reveal elements */
  .reveal-on-scroll {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 4. Implementation Readiness & Handoff

| Component | Target Location | Technology Stack | Readiness Status |
|---|---|---|---|
| **HTML/CSS Base Structure** | `website/index.html` | Semantic HTML5, CSS Variables, Flexbox/Grid | Ready for Phase 7 Build |
| **Styling & Animation Tokens** | `website/css/style.css` | Pure CSS, Compositor Transforms, Media Queries | Ready for Phase 7 Build |
| **Interactive Logic & Terminal** | `website/js/main.js` | Vanilla ES6+ (0 dependencies), Canvas 2D, Netlify Serverless | Ready for Phase 7 Build |
| **Assets & Visual Icons** | `website/assets/` | Lightweight SVGs, Optimized WebP photography | Ready for Phase 7 Build |

This motion specification provides an exact, measurable, and highly differentiated foundation for the upcoming MRK AI Agency website build.
