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
        English: '',
        ICT: '',
        Mathematics: '',
        Science: '',
        SST: '',
        French: '',
        Hindi: '',
        Marathi: '',
      },
      term2: {
        English: '',
        ICT: '',
        Mathematics: '',
        Science: '',
        SST: '',
        French: '',
        Hindi: '',
        Marathi: '',
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
  
  const handleInputChange = (section, field, value, term = null) => {
    if (section === 'personal') {
      setFormData({ ...formData, [field]: value });
    } else if (section === 'grades') {
      setFormData({
        ...formData,
        grades: {
          ...formData.grades,
          [term]: {
            ...formData.grades[term],
            [field]: value
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
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${formData.studentName}_report_card.pdf`;
      
      // Append to the document and trigger the download
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 ml-auto disabled:bg-teal-300"
            >
              {isLoading ? 'Generating PDF...' : 'Generate Report Card'}
            </button>
          )}
        </div>
        
        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
      </form>
    </div>
  );
};

export default ReportCardForm;