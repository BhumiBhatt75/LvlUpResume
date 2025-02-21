import { NextRequest, NextResponse } from 'next/server';

import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { PDFDocument, rgb } from 'pdf-lib';

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

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // Set page size

    // Set font size and color
    const { width, height } = page.getSize();
    
    // Add Header
    page.drawText(formData.name, {
      x: 50,
      y: height - 50,
      size: 24,
      color: rgb(0, 0, 0),
    });
    
    page.drawText(formData.contact1, {
      x: 50,
      y: height - 80,
      size: 12,
      color: rgb(0, 0, 0),
    });

    let yPosition = height - 120;

    // Add Education
    page.drawText('Education', { x: 50, y: yPosition, size: 18, color: rgb(0, 0, 0) });
    yPosition -= 20;
    page.drawText(`${formData.education.school} - ${formData.education.degree}`, {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });
    yPosition -= 15;
    page.drawText(`${formData.education.date} | GPA: ${formData.education.cgpa}`, {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });
    yPosition -= 40;

    // Add Experience
    page.drawText('Experience', { x: 50, y: yPosition, size: 18, color: rgb(0, 0, 0) });
    yPosition -= 20;
    formData.experience.forEach((exp: Experience) => {
      page.drawText(`${exp.title} - ${exp.company}`, {
        x: 50,
        y: yPosition,
        size: 12,
        color: rgb(0, 0, 0),
      });
      yPosition -= 15;
      page.drawText(exp.date, {
        x: 50,
        y: yPosition,
        size: 12,
        color: rgb(0, 0, 0),
      });
      yPosition -= 15;
      page.drawText(exp.description, {
        x: 50,
        y: yPosition,
        size: 12,
        color: rgb(0, 0, 0),
      });
      yPosition -= 30;
    });

    // Add Skills
    page.drawText('Skills', { x: 50, y: yPosition, size: 18, color: rgb(0, 0, 0) });
    yPosition -= 20;
    page.drawText(`Technical: ${formData.skills.skills}`, {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });
    yPosition -= 15;
    page.drawText(`Tools: ${formData.skills.tools}`, {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });
    yPosition -= 40;

    // Add Projects
    if (formData.projects.length > 0) {
      page.drawText('Projects', { x: 50, y: yPosition, size: 18, color: rgb(0, 0, 0) });
      yPosition -= 20;
      formData.projects.forEach((project: Project) => {
        page.drawText(`${project.name} (${project.date})`, {
          x: 50,
          y: yPosition,
          size: 12,
          color: rgb(0, 0, 0),
        });
        yPosition -= 15;
        page.drawText(project.description, {
          x: 50,
          y: yPosition,
          size: 12,
          color: rgb(0, 0, 0),
        });
        yPosition -= 15;
        page.drawText(`Technologies: ${project.skills}`, {
          x: 50,
          y: yPosition,
          size: 12,
          color: rgb(0, 0, 0),
        });
        yPosition -= 30;
      });
    }

    // Add Achievements
    if (formData.achievements) {
      page.drawText('Achievements', { x: 50, y: yPosition, size: 18, color: rgb(0, 0, 0) });
      yPosition -= 20;
      page.drawText(formData.achievements, {
        x: 50,
        y: yPosition,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Return the PDF
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${formData.name.replace(/\s+/g, '_')}_resume.pdf"`,
        'Content-Length': pdfBytes.length.toString(),
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    
    if (browser) await browser.close();
    
    return NextResponse.json({ 
      error: 'Failed to generate PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
} 