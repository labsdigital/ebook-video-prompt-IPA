#!/usr/bin/env python3
"""Convert HTML to PDF using WeasyPrint"""
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration
import sys
from pathlib import Path

def html_to_pdf(html_path, pdf_path):
    font_config = FontConfiguration()
    
    html = HTML(filename=html_path)
    css_files = [
        '/opt/data/skills/layout/book-layout-designer/assets/book.css',
        CSS(string='@page { size: B5; margin: 20mm 15mm; }')
    ]
    
    pdf_bytes = html.write_pdf(pdf_path, font_config=font_config, stylesheets=css_files)
    print(f"PDF generated: {pdf_path}")
    print(f"PDF size: {Path(pdf_path).stat().st_size / 1024:.1f} KB")
    return pdf_path

if __name__ == '__main__':
    html_path = sys.argv[1] if len(sys.argv) > 1 else 'out/_build/book.html'
    pdf_path = sys.argv[2] if len(sys.argv) > 2 else 'out/Prompt-Video-IPA.pdf'
    html_to_pdf(html_path, pdf_path)
