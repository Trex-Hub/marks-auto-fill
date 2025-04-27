// lib/pdf-generator.js
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

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
    page1.drawText(toTitleCase(formData.studentName), {
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
    const term1GradeX = 380; // instead of 531
    const term2GradeX = 580; // instead of 775
    const overallGradeX = 770; // instead of 1000    


    // Y coordinates for each subject (adjusted 50px downwards)
    const gradesY = {
      English: 405,
      ICT: 365,
      Mathematics: 325,
      Science: 285,
      SST: 245,
      French: 205,
      Hindi: 165,
      Marathi: 125,
      Total: 85
    };

    // Initialize variables to calculate totals
    let term1TotalMarks = 0;
    let term2TotalMarks = 0;
    let term1SubjectCount = 0;
    let term2SubjectCount = 0;
    const subjects = Object.keys(gradesY).filter(subject => subject !== 'Total');

    // Add grades for each subject
    subjects.forEach((subject) => {
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

      // Add to total marks for term calculations
      const term1Marks = parseInt(formData.grades.term1[subject]?.marks || 0, 10);
      const term2Marks = parseInt(formData.grades.term2[subject]?.marks || 0, 10);
      
      if (!isNaN(term1Marks)) {
        term1TotalMarks += term1Marks;
        term1SubjectCount++;
      }
      
      if (!isNaN(term2Marks)) {
        term2TotalMarks += term2Marks;
        term2SubjectCount++;
      }

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
          size: 13,
          font: helveticaBold,
          color: rgb(0, 0, 0),
        });
      }
    });

    // Calculate and add total row
    const term1Average = term1SubjectCount > 0 ? Math.round(term1TotalMarks / term1SubjectCount) : 0;
    const term2Average = term2SubjectCount > 0 ? Math.round(term2TotalMarks / term2SubjectCount) : 0;
    
    // Add total grade for term 1
    const term1TotalGrade = calculateGrade(term1Average);
    page3.drawText(term1TotalGrade, {
      x: term1GradeX,
      y: gradesY.Total,
      size: 12,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    // Add total grade for term 2
    const term2TotalGrade = calculateGrade(term2Average);
    page3.drawText(term2TotalGrade, {
      x: term2GradeX,
      y: gradesY.Total,
      size: 12,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    // Calculate and add overall total grade
    if (term1SubjectCount > 0 && term2SubjectCount > 0) {
      const overallAverage = Math.round((term1Average + term2Average) / 2);
      const overallTotalGrade = calculateGrade(overallAverage);
      
      page3.drawText(overallTotalGrade, {
        x: overallGradeX,
        y: gradesY.Total,
        size: 13,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });
    }

    // PAGE 4: Co-Scholastic Assessment
    // Approximate coordinates for the visual arts assessment
    const coScholasticTerm1X = 490;
    const coScholasticTerm2X = 750;
    const coScholasticY = 195;

    // Add co-scholastic grades
    page4.drawText(formData.coScholastic.term1.visualArts || "", {
      x: coScholasticTerm1X,
      y: coScholasticY,
      size: 13,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    page4.drawText(formData.coScholastic.term2.visualArts || "", {
      x: coScholasticTerm2X,
      y: coScholasticY,
      size: 13,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

// PAGE 5: Descriptive Indicators

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

// X coordinates
const leftColumnTerm1X = 300;
const leftColumnTerm2X = 383;
const rightColumnTerm1X = 715;
const rightColumnTerm2X = 805;

// Y coordinates for each left column indicator
const leftYCoordinates = [340, 295, 245, 195, 146, 100, 53];
// Y coordinates for each right column indicator
const rightYCoordinates = [340, 295, 245, 195, 146, 100, 53];

// Fill left column
leftColumnIndicators.forEach((_, index) => {
  const y = leftYCoordinates[index];

  page5.drawText("Excellent", {
    x: leftColumnTerm1X,
    y,
    size: 13,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  page5.drawText("Excellent", {
    x: leftColumnTerm2X,
    y,
    size: 13,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
});

// Fill right column
rightColumnIndicators.forEach((_, index) => {
  const y = rightYCoordinates[index];

  page5.drawText("Excellent", {
    x: rightColumnTerm1X,
    y,
    size: 13,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  page5.drawText("Excellent", {
    x: rightColumnTerm2X,
    y,
    size: 13,
    font: helveticaBold,
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
