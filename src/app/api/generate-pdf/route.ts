import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            position: relative;
          }
          h1, h2 {
            color: #2196f3;
          }
          h2 {
            border-bottom: 2px solid #2196f3;
            padding-bottom: 5px;
          }
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 100px;
            color: rgba(200, 200, 200, 0.2);
            z-index: -1;
          }
        </style>
      </head>
      <body>
        <div class="watermark">DRAFT</div>
        <h1 style="text-align: center;">${formData.name}</h1>
        <p style="text-align: center;">${formData.contact}</p>
        
        <h2>EDUCATION</h2>
        <p><strong>${formData.education.school}</strong> (CGPA: ${formData.education.cgpa})</p>
        <p>${formData.education.degree} | ${formData.education.date}</p>
        
        <h2>SKILLS & SUBJECTS</h2>
        <p><strong>Skills:</strong> ${formData.skills.skills}</p>
        <p><strong>Tools:</strong> ${formData.skills.tools}</p>
        <p><strong>Languages:</strong> ${formData.skills.languages}</p>
        <p><strong>Relevant Coursework:</strong> ${formData.skills.courses}</p>
        
        <h2>EXPERIENCE</h2>
        ${formData.experience.map((exp: any) => `
          <p><strong>${exp.title} | ${exp.company}</strong> | ${exp.date}</p>
          <ul>
            ${exp.description.split('\n').map((item: string) => `<li>${item}</li>`).join('')}
          </ul>
        `).join('')}
        
        <h2>PROJECTS</h2>
        <p>${formData.projects}</p>
        
        <h2>ACHIEVEMENTS</h2>
        <ul>
          ${formData.achievements.split('\n').map((achievement: string) => `<li>${achievement}</li>`).join('')}
        </ul>
        
        <h2>ADDITIONAL INTERESTS</h2>
        <ul>
          ${formData.interests.split('\n').map((interest: string) => `<li>${interest}</li>`).join('')}
        </ul>
      </body>
      </html>
    `;

    await page.setContent(htmlContent);

    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}