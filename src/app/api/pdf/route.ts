import { NextRequest, NextResponse } from 'next/server';
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
  try {
    const { formData } = await req.json();

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // Set page size

    // Set font size and color
    const { width, height } = page.getSize();
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
    page.drawText(`${formData.education.school} - ${formData.education.degree} (${formData.education.date}) | GPA: ${formData.education.cgpa}`, {
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
      page.drawText(`${exp.title} - ${exp.company} (${exp.date})`, {
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

    // Serialize the PDF document to bytes (Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Send the response
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${formData.name.replace(/\s+/g, '_')}_resume.pdf"`,
        'Content-Length': pdfBytes.length.toString(),
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
} 