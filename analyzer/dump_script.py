from playwright.sync_api import sync_playwright

def dump():
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page()
        page.goto('https://ali-and-ai.com/')
        script_text = page.evaluate("() => document.querySelector('script').textContent")
        with open('captures/reports/inline_script.js', 'w', encoding='utf-8') as f:
            f.write(script_text)
        print(f"Wrote {len(script_text)} chars to captures/reports/inline_script.js")
        b.close()

if __name__ == '__main__':
    dump()
