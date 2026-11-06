# MRK AI Agency - Website Motion Analyzer

A automated toolkit to inspect, analyze, and profile web animations, transitions, DOM interactions, and visual dynamics using Playwright, BeautifulSoup4, tinycss2, and OpenCV.

## Project Structure

```
mrk-ai-agency/
    analyzer/             # Python motion & animation analysis suite
        __init__.py
        crawler.py        # Playwright browser automation & page interaction
        css_inspector.py  # CSS animations, transitions, and keyframes parser
        js_inspector.py   # Web Animations API & JS animation library detector
        frame_analyzer.py # OpenCV video/frame extraction & contact sheet generator
        runner.py         # Main analysis CLI orchestration
    captures/
        screenshots/      # Full-page, viewport, and section screenshots
        recordings/       # Video recordings of scrolling and interactions
        reports/          # Machine-readable JSON metrics and animation dumps
    website/              # MRK AI agency website implementation (Phase 7+)
    documentation/        # Detailed analysis reports and design specifications
        ali_ai_website_analysis.md
        mrk_ai_motion_specification.md
    requirements.txt      # Python dependencies
    README.md             # Project documentation
```

## Setup & Installation

1. Create and activate a Python virtual environment:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

3. Install Playwright browser binaries:
   ```powershell
   playwright install chromium
   ```

## Usage

Run the motion analyzer on any target URL:
```powershell
python -m analyzer.runner --url https://ali-and-ai.com/
```
