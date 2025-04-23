'use client';

const DescriptiveIndicatorsStep = ({ formData, handleInputChange }) => {
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descriptive Indicators</h2>
      
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
                  value={formData.descriptiveIndicators.term1[indicator.id]}
                  onChange={(e) => handleInputChange('descriptiveIndicators', indicator.id, e.target.value, 'term1')}
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
                  value={formData.descriptiveIndicators.term2[indicator.id]}
                  onChange={(e) => handleInputChange('descriptiveIndicators', indicator.id, e.target.value, 'term2')}
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

export default DescriptiveIndicatorsStep;