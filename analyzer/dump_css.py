from playwright.sync_api import sync_playwright

def dump_css():
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page()
        page.goto('https://ali-and-ai.com/')
        css = page.evaluate("""() => {
            let total = '';
            for (const sheet of document.styleSheets) {
                try {
                    for (const rule of sheet.cssRules) {
                        total += rule.cssText + '\\n';
                    }
                } catch(e) {}
            }
            return total;
        }""")
        with open('captures/reports/extracted_styles.css', 'w', encoding='utf-8') as f:
            f.write(css)
        print(f"Wrote {len(css)} chars of CSS rules")
        b.close()

if __name__ == '__main__':
    dump_css()
