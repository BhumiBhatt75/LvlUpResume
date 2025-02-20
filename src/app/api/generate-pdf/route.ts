import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

interface Experience {
    title: string;
    company: string;
    date: string;
    description: string;
    // Add other properties as needed
}

interface Project {
    name: string;
    date: string;
    description: string;
    skills: string;
    // Add other properties as needed
}

export async function POST(req: NextRequest) {
  let browser;
  try {
    const { formData } = await req.json();

    // Launch with minimal configuration
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // Simple HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
              line-height: 1.5;
            }
            .header { margin-bottom: 20px; }
            .name { 
              font-size: 24px; 
              font-weight: bold;
              margin-bottom: 5px;
            }
            .contact { color: #666; }
            .section {
              margin-bottom: 20px;
              break-inside: avoid;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              border-bottom: 1px solid #000;
              margin-bottom: 10px;
            }
            .item {
              margin-bottom: 10px;
              break-inside: avoid;
            }
            .item-title {
              font-weight: bold;
            }
            .item-subtitle {
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="name">${formData.name}</div>
            <div class="contact">${formData.contact1}</div>
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
            ${formData.experience.map((exp: Experience) => `
              <div class="item">
                <div class="item-title">${exp.title} - ${exp.company}</div>
                <div class="item-subtitle">${exp.date}</div>
                <div>${exp.description}</div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Skills</div>
            <div class="item">
              <div><strong>Technical:</strong> ${formData.skills.skills}</div>
              <div><strong>Tools:</strong> ${formData.skills.tools}</div>
            </div>
          </div>

          ${formData.projects.length > 0 ? `
            <div class="section">
              <div class="section-title">Projects</div>
              ${formData.projects.map((project: Project) => `
                <div class="item">
                  <div class="item-title">${project.name}</div>
                  <div class="item-subtitle">${project.date}</div>
                  <div>${project.description}</div>
                  <div>Technologies: ${project.skills}</div>
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

    await page.setContent(htmlContent);

    // Generate PDF with minimal options
    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' },
      printBackground: true
    });

    await browser.close();

    // Return PDF with basic headers
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume.pdf"`
      }
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    if (browser) await browser.close();
    
    // Type assertion to ensure error has a message property
    const errorMessage = (error as Error).message;

    return NextResponse.json({ 
      error: 'PDF generation failed',
      details: errorMessage 
    }, { 
      status: 500 
    });
  }
}