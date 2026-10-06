const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function htmlToPdf() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Read the HTML file
  const htmlPath = path.join(__dirname, 'out/_build/book.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  // Wait for fonts to load
  await page.waitForTimeout(2000);
  
  // Generate PDF
  await page.pdf({
    path: path.join(__dirname, 'out/Prompt-Video-IPA.pdf'),
    format: 'B5',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm'
    }
  });
  
  console.log('PDF generated successfully!');
  await browser.close();
}

htmlToPdf().catch(console.error);
