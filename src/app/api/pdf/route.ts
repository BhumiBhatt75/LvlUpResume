import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export async function POST(req: NextRequest) {
  let browser;
  try {
    const { formData } = await req.json();

    // Configure browser for different environments
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      // Production (Vercel) configuration
      browser = await puppeteer.launch({
        args: [
          ...chromium.args,
          '--hide-scrollbars',
          '--disable-web-security'
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
        ignoreHTTPSErrors: true,
      });
    } else {
      // Local development configuration
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
        executablePath: process.platform === 'win32'
          ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
          : process.platform === 'linux'
          ? '/usr/bin/google-chrome'
          : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              line-height: 1.5;
            }
            .section { margin-bottom: 20px; }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              border-bottom: 1px solid #000;
              margin-bottom: 10px;
              padding-bottom: 5px;
            }
            .item { margin-bottom: 15px; }
            .item-title { font-weight: bold; }
            .item-subtitle { color: #666; }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 24px;">${formData.name}</h1>
            <div style="color: #666; margin-top: 5px;">${formData.contact1}</div>
          </div>

          <div class="section">
            <div class="section-title">Education</div>
            <div class="item">
              <div class="item-title">${formData.education.school}</div>
              <div class="item-subtitle">${formData.education.degree}</div>
              <div>${formData.education.date} | GPA: ${formData.education.cgpa}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Experience</div>
            ${formData.experience.map(exp => `
              <div class="item">
                <div class="item-title">${exp.title} at ${exp.company}</div>
                <div class="item-subtitle">${exp.date}</div>
                <div style="margin-top: 5px;">${exp.description}</div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Skills</div>
            <div class="item">
              <div><strong>Technical:</strong> ${formData.skills.skills}</div>
              <div style="margin-top: 5px;"><strong>Tools:</strong> ${formData.skills.tools}</div>
            </div>
          </div>

          ${formData.projects.length > 0 ? `
            <div class="section">
              <div class="section-title">Projects</div>
              ${formData.projects.map(project => `
                <div class="item">
                  <div class="item-title">${project.name}</div>
                  <div class="item-subtitle">${project.date}</div>
                  <div style="margin-top: 5px;">${project.description}</div>
                  <div style="margin-top: 5px;">Technologies: ${project.skills}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${formData.achievements ? `
            <div class="section">
              <div class="section-title">Achievements</div>
              <div class="item">${formData.achievements}</div>
            </div>
          ` : ''}
        </body>
      </html>
    `;

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${formData.name.replace(/\s+/g, '_')}_resume.pdf"`,
        'Content-Length': pdf.length.toString(),
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    if (browser) await browser.close();
    
    return NextResponse.json({ 
      error: 'Failed to generate PDF',
      details: error.message 
    }, { 
      status: 500 
    });
  }
} 