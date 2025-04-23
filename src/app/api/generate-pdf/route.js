// app/api/generate-pdf/route.js
import { NextResponse } from 'next/server';
import { generateReportCard } from '@/lib/pdf-generator';

export async function POST(request) {
  try {
    // Parse the request body
    const formData = await request.json();

    // Validate the form data (basic validation)
    if (!formData.studentName || !formData.grade || !formData.dateOfBirth) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate the PDF
    const pdfBytes = await generateReportCard(formData);

    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${formData.studentName}_report_card.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}