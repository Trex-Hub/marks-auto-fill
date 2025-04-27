'use client';

import { useState } from 'react';
import PersonalInfoStep from './PersonalInfoStep';
import GradesStep from './GradesStep';
import CoScholasticStep from './CoScholasticStep';
import DescriptiveIndicatorsStep from './DescriptiveIndicatorsStep';
import StepIndicator from './StepIndicator';

const ReportCardForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    studentName: '',
    grade: '',
    dateOfBirth: '',
    
    // Academic Grades
    grades: {
      term1: {
        English: { marks: '', grade: '' },
        ICT: { marks: '', grade: '' },
        Mathematics: { marks: '', grade: '' },
        Science: { marks: '', grade: '' },
        SST: { marks: '', grade: '' },
        French: { marks: '', grade: '' },
        Hindi: { marks: '', grade: '' },
        Marathi: { marks: '', grade: '' },
      },
      term2: {
        English: { marks: '', grade: '' },
        ICT: { marks: '', grade: '' },
        Mathematics: { marks: '', grade: '' },
        Science: { marks: '', grade: '' },
        SST: { marks: '', grade: '' },
        French: { marks: '', grade: '' },
        Hindi: { marks: '', grade: '' },
        Marathi: { marks: '', grade: '' },
      }
    },
    
    // Co-Scholastic
    coScholastic: {
      term1: {
        visualArts: ''
      },
      term2: {
        visualArts: ''
      }
    },
    
    // Descriptive Indicators
    descriptiveIndicators: {
      term1: {
        selfSufficientLearner: '',
        strivesForAcademicExcellence: '',
        engagesEffectively: '',
        exhibitsHabitsOfMind: '',
        synthesisesInformation: '',
        demonstratesTeamwork: '',
        showsRespectForFacilitators: '',
        exhibitsAttentionAndConcentration: '',
        consistentlySubmitsAssignments: '',
        obedientAndDiligent: '',
        academicIntegrityAndSelfReliance: '',
        engagesInDiscussion: '',
        practicesNetiquette: '',
        exhibitsLeadershipSkills: '',
      },
      term2: {
        selfSufficientLearner: '',
        strivesForAcademicExcellence: '',
        engagesEffectively: '',
        exhibitsHabitsOfMind: '',
        synthesisesInformation: '',
        demonstratesTeamwork: '',
        showsRespectForFacilitators: '',
        exhibitsAttentionAndConcentration: '',
        consistentlySubmitsAssignments: '',
        obedientAndDiligent: '',
        academicIntegrityAndSelfReliance: '',
        engagesInDiscussion: '',
        practicesNetiquette: '',
        exhibitsLeadershipSkills: '',
      }
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfData, setPdfData] = useState(null);
  const [isPdfReady, setIsPdfReady] = useState(false);
  
  // Function to calculate grade based on marks
  const calculateGrade = (marks) => {
    const numericMarks = parseInt(marks, 10);
    if (isNaN(numericMarks)) return '';
    
    if (numericMarks >= 90) return 'A*';
    if (numericMarks >= 80) return 'A';
    if (numericMarks >= 70) return 'B';
    if (numericMarks >= 60) return 'C';
    if (numericMarks >= 50) return 'D';
    if (numericMarks >= 40) return 'E';
    if (numericMarks >= 30) return 'F';
    if (numericMarks >= 20) return 'G';
    return 'U';
  };
  
  const handleInputChange = (section, field, value, term = null) => {
    if (section === 'personal') {
      setFormData({ ...formData, [field]: value });
    } else if (section === 'grades') {
      // For grades, value is the marks
      const grade = calculateGrade(value);
      setFormData({
        ...formData,
        grades: {
          ...formData.grades,
          [term]: {
            ...formData.grades[term],
            [field]: { marks: value, grade }
          }
        }
      });
    } else if (section === 'coScholastic') {
      setFormData({
        ...formData,
        coScholastic: {
          ...formData.coScholastic,
          [term]: {
            ...formData.coScholastic[term],
            [field]: value
          }
        }
      });
    } else if (section === 'descriptiveIndicators') {
      setFormData({
        ...formData,
        descriptiveIndicators: {
          ...formData.descriptiveIndicators,
          [term]: {
            ...formData.descriptiveIndicators[term],
            [field]: value
          }
        }
      });
    }
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Store the PDF data and set flag that PDF is ready
      const url = window.URL.createObjectURL(blob);
      setPdfData({
        url,
        fileName: `${formData.studentName}_report_card.pdf`
      });
      setIsPdfReady(true);
      
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const downloadPdf = () => {
    if (!pdfData) return;
    
    // Create a download link
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = pdfData.url;
    a.download = pdfData.fileName;
    
    // Append to the document and trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(pdfData.url);
    document.body.removeChild(a);
    
    // Reset PDF data
    setPdfData(null);
    setIsPdfReady(false);
  };
  
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <PersonalInfoStep 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        );
      case 2:
        return (
          <GradesStep 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        );
      case 3:
        return (
          <CoScholasticStep 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        );
      case 4:
        return (
          <DescriptiveIndicatorsStep 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
        Brainiacs Report Card Generator
      </h1>
      
      <StepIndicator currentStep={currentStep} totalSteps={4} />
      
      <form onSubmit={handleSubmit} className="mt-6">
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 ml-auto"
            >
              Next
            </button>
          ) : (
            isPdfReady ? (
              <button
                type="button"
                onClick={downloadPdf}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 ml-auto"
              >
                Download Report Card
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 ml-auto disabled:bg-teal-300"
              >
                {isLoading ? 'Generating PDF...' : 'Generate Report Card'}
              </button>
            )
          )}
        </div>
        
        {isPdfReady && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              Report card generated successfully! Click the download button to save it.
            </p>
          </div>
        )}
        
        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
      </form>
    </div>
  );
};

export default ReportCardForm;