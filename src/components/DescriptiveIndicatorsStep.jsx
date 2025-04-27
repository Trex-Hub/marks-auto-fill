'use client';

import { useState } from 'react';

const DescriptiveIndicatorsStep = ({ formData, setFormData }) => {
  const indicators = [
    { id: 'selfSufficientLearner', name: 'Self sufficient learner' },
    { id: 'strivesForAcademicExcellence', name: 'Strives for academic excellence' },
    { id: 'engagesEffectively', name: 'Engages effectively' },
    { id: 'exhibitsHabitsOfMind', name: 'Exhibits habits of mind' },
    { id: 'synthesisesInformation', name: 'Synthesises information' },
    { id: 'demonstratesTeamwork', name: 'Demonstrates teamwork' },
    { id: 'showsRespectForFacilitators', name: 'Shows respect for facilitators' },
    { id: 'exhibitsAttentionAndConcentration', name: 'Exhibits attention and concentration' },
    { id: 'consistentlySubmitsAssignments', name: 'Consistently submits assignments' },
    { id: 'obedientAndDiligent', name: 'Obedient & diligent' },
    { id: 'academicIntegrityAndSelfReliance', name: 'Academic integrity and self-reliance' },
    { id: 'engagesInDiscussion', name: 'Engages in discussion' },
    { id: 'practicesNetiquette', name: 'Practices netiquette' },
    { id: 'exhibitsLeadershipSkills', name: 'Exhibits leadership skills' },
  ];

  const remarksOptions = [
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Very Good', label: 'Very Good' },
    { value: 'Good', label: 'Good' },
    { value: 'Satisfactory', label: 'Satisfactory' },
    { value: 'Needs Improvement', label: 'Needs Improvement' },
  ];

  const handleInputChange = (indicatorId, value, term) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      descriptiveIndicators: {
        ...prevFormData.descriptiveIndicators,
        [term]: {
          ...prevFormData.descriptiveIndicators[term],
          [indicatorId]: value,
        },
      },
    }));
  };

  const handleAutoFill = () => {
    const updatedTerm1 = {};
    const updatedTerm2 = {};

    indicators.forEach((indicator) => {
      updatedTerm1[indicator.id] = 'Excellent';
      updatedTerm2[indicator.id] = 'Excellent';
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      descriptiveIndicators: {
        term1: updatedTerm1,
        term2: updatedTerm2,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descriptive Indicators</h2>

      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={handleAutoFill}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
        >
          Auto Fill "Excellent"
        </button>
      </div>

      <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-6">
        <p className="text-sm text-green-800">
          <strong>Note:</strong> These descriptive indicators provide a holistic assessment of the student's learning behaviors, attitudes, and social skills.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-8">
        <div>
          <h3 className="text-xl font-medium text-teal-700 mb-4">Term 1</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {indicators.map((indicator) => (
              <div key={`term1-${indicator.id}`}>
                <label htmlFor={`term1-${indicator.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  {indicator.name}
                </label>
                <select
                  id={`term1-${indicator.id}`}
                  value={formData.descriptiveIndicators.term1[indicator.id] || ''}
                  onChange={(e) => handleInputChange(indicator.id, e.target.value, 'term1')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Remark</option>
                  {remarksOptions.map((remark) => (
                    <option key={`term1-${indicator.id}-${remark.value}`} value={remark.value}>
                      {remark.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-teal-700 mb-4">Term 2</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {indicators.map((indicator) => (
              <div key={`term2-${indicator.id}`}>
                <label htmlFor={`term2-${indicator.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  {indicator.name}
                </label>
                <select
                  id={`term2-${indicator.id}`}
                  value={formData.descriptiveIndicators.term2[indicator.id] || ''}
                  onChange={(e) => handleInputChange(indicator.id, e.target.value, 'term2')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Remark</option>
                  {remarksOptions.map((remark) => (
                    <option key={`term2-${indicator.id}-${remark.value}`} value={remark.value}>
                      {remark.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const [formData, setFormData] = useState({
    descriptiveIndicators: {
      term1: {},
      term2: {},
    },
  });

  return (
    <div className="p-8">
      <DescriptiveIndicatorsStep formData={formData} setFormData={setFormData} />
      {/* Yahan baad me PDF generate ka button bhi daal sakte ho */}
    </div>
  );
}
