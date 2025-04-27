// lib/pdf-generator.js
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export async function generateReportCard(formData) {
  try {
    // Helper function to calculate grade from marks
    const calculateGrade = (marks) => {
      const numericMarks = parseInt(marks, 10);
      if (isNaN(numericMarks)) return "";

      if (numericMarks >= 90) return "A*";
      if (numericMarks >= 80) return "A";
      if (numericMarks >= 70) return "B";
      if (numericMarks >= 60) return "C";
      if (numericMarks >= 50) return "D";
      if (numericMarks >= 40) return "E";
      if (numericMarks >= 30) return "F";
      if (numericMarks >= 20) return "G";
      return "U";
    };

    // Load the template PDF file
    const templatePath = path.join(process.cwd(), "public", "template.pdf");
    const templateBytes = await fs.readFile(templatePath);

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Get the form fields (if there are any in the template)
    const form = pdfDoc.getForm();

    // Get pages
    const pages = pdfDoc.getPages();
    const page1 = pages[0];
    const page3 = pages[2]; // Academic grades page
    const page4 = pages[3]; // Co-scholastic assessment page
    const page5 = pages[4]; // Descriptive indicators page

    // Embed a standard font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // PAGE 1: Add student information
    // These coordinates and dimensions are estimated and may need adjustment based on the actual template
    page1.drawText(formData.studentName, {
      x: 500,
      y: 220,
      size: 20,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    page1.drawText(formData.grade, {
      x: 520,
      y: 165,
      size: 20,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    page1.drawText(formData.dateOfBirth, {
      x: 500,
      y: 120,
      size: 20,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    // PAGE 3: Academic Grades
    // Adjusted coordinates for each subject's grades
    const term1GradeX = 531; // X coordinate for Term 1 grades (shifted 20px left from 551)
    const term2GradeX = 775; // X coordinate for Term 2 grades
    const overallGradeX = 1000; // X coordinate for overall grades

    // Y coordinates for each subject (adjusted 50px downwards)
    const gradesY = {
      English: 570, // Original: 620, adjusted -50px
      ICT: 513, // Original: 563, adjusted -50px
      Mathematics: 456, // Original: 506, adjusted -50px
      Science: 399, // Original: 449, adjusted -50px
      SST: 342, // Original: 392, adjusted -50px
      French: 285, // Original: 335, adjusted -50px
      Hindi: 228, // Original: 278, adjusted -50px
      Marathi: 171, // Original: 221, adjusted -50px
    };

    // Add grades for each subject
    Object.keys(gradesY).forEach((subject) => {
      // Term 1 Grade
      const term1Grade = formData.grades.term1[subject]?.grade || "";
      page3.drawText(term1Grade, {
        x: term1GradeX,
        y: gradesY[subject],
        size: 12,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });

      // Term 2 Grade
      const term2Grade = formData.grades.term2[subject]?.grade || "";
      page3.drawText(term2Grade, {
        x: term2GradeX,
        y: gradesY[subject],
        size: 12,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });

      // Calculate and add overall grade if both terms have grades
      if (term1Grade && term2Grade) {
        // Calculate average marks
        const term1Marks = parseInt(
          formData.grades.term1[subject]?.marks || 0,
          10
        );
        const term2Marks = parseInt(
          formData.grades.term2[subject]?.marks || 0,
          10
        );
        const averageMarks = Math.round((term1Marks + term2Marks) / 2);

        // Determine overall grade based on average marks
        const overallGrade = calculateGrade(averageMarks);

        // Draw the average grade in the "AVERAGE GRADE" column
        page3.drawText(overallGrade, {
          x: overallGradeX,
          y: gradesY[subject],
          size: 12,
          font: helveticaBold,
          color: rgb(0, 0, 0),
        });
      }
    });

    // PAGE 4: Co-Scholastic Assessment
    // Approximate coordinates for the visual arts assessment
    const coScholasticTerm1X = 709;
    const coScholasticTerm2X = 1068;
    const coScholasticY = 636;

    // Add co-scholastic grades
    page4.drawText(formData.coScholastic.term1.visualArts || "", {
      x: coScholasticTerm1X,
      y: coScholasticY,
      size: 12,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    page4.drawText(formData.coScholastic.term2.visualArts || "", {
      x: coScholasticTerm2X,
      y: coScholasticY,
      size: 12,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    // PAGE 5: Descriptive Indicators
    // Approximate coordinates for the indicators
    const leftColumnIndicators = [
      "selfSufficientLearner",
      "strivesForAcademicExcellence",
      "engagesEffectively",
      "exhibitsHabitsOfMind",
      "synthesisesInformation",
      "demonstratesTeamwork",
      "showsRespectForFacilitators",
    ];

    const rightColumnIndicators = [
      "exhibitsAttentionAndConcentration",
      "consistentlySubmitsAssignments",
      "obedientAndDiligent",
      "academicIntegrityAndSelfReliance",
      "engagesInDiscussion",
      "practicesNetiquette",
      "exhibitsLeadershipSkills",
    ];

    // Position for the first indicator in each column
    const leftColumnTerm1X = 462;
    const leftColumnTerm2X = 527;
    const rightColumnTerm1X = 1060;
    const rightColumnTerm2X = 1125;

    // Y-coordinates for each row (approximate)
    const indicatorsStartY = 630;
    const indicatorRowHeight = 56;

    // Add left column indicators
    leftColumnIndicators.forEach((indicator, index) => {
      const y = indicatorsStartY - index * indicatorRowHeight;

      // Term 1
      page5.drawText(formData.descriptiveIndicators.term1[indicator] || "", {
        x: leftColumnTerm1X,
        y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Term 2
      page5.drawText(formData.descriptiveIndicators.term2[indicator] || "", {
        x: leftColumnTerm2X,
        y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });

    // Add right column indicators
    rightColumnIndicators.forEach((indicator, index) => {
      const y = indicatorsStartY - index * indicatorRowHeight;

      // Term 1
      page5.drawText(formData.descriptiveIndicators.term1[indicator] || "", {
        x: rightColumnTerm1X,
        y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Term 2
      page5.drawText(formData.descriptiveIndicators.term2[indicator] || "", {
        x: rightColumnTerm2X,
        y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
