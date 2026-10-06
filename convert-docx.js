const { Document, Packer, Paragraph, TextRun, HeadingLevel, PageNumber, AlignmentType } = require('docx');
const fs = require('fs');
const path = require('path');

async function htmlToDocx() {
  // Simple HTML to DOCX converter (basic version)
  const htmlContent = fs.readFileSync(path.join(__dirname, 'out/_build/book.html'), 'utf8');
  
  // Extract text content (simplified)
  const textContent = htmlContent
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  console.log('HTML content extracted, length:', textContent.length);
  
  // Create a simple document
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: {
            width: 14400 * 5 / 7,  // B5 width in DWPT
            height: 14400 * 8 / 7, // B5 height in DWPT
          },
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440,
          },
        },
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "Panduan Prompt AI untuk Video Pembelajaran IPA",
              bold: true,
              size: 36,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: textContent.substring(0, 500) + "...",
              size: 24,
            }),
          ],
        }),
      ],
    }],
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(__dirname, 'out/Prompt-Video-IPA.docx'), buffer);
  console.log('DOCX generated successfully!');
}

htmlToDocx().catch(console.error);
