/**
 * Script to generate resume PDF from HTML
 * 
 * Usage:
 * 1. Install dependencies: npm install puppeteer
 * 2. Run: node scripts/generate-resume-pdf.js
 * 
 * This will create a resume.pdf in the public folder
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function generateResumePDF() {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();

    // Read the HTML file
    const htmlPath = path.join(__dirname, "../public/resume.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");

    // Load HTML content
    await page.setContent(htmlContent, {
      waitUntil: "networkidle2",
    });

    // Generate PDF
    const pdfPath = path.join(__dirname, "../public/resume.pdf");
    await page.pdf({
      path: pdfPath,
      format: "A4",
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
      printBackground: true,
    });

    await browser.close();

    console.log("✓ Resume PDF generated successfully at:", pdfPath);
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    process.exit(1);
  }
}

generateResumePDF();
