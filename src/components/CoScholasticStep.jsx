'use client';

const CoScholasticStep = ({ formData, handleInputChange }) => {
  const coScholasticGradeOptions = [
    { value: 'A', label: 'A (Proficient)' },
    { value: 'B', label: 'B (Developing)' },
    { value: 'C', label: 'C (Emerging)' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Co-Scholastic Assessment</h2>
      
      <div className="bg-purple-50 p-4 rounded-md border border-purple-200 mb-6">
        <p className="text-sm text-purple-800">
          <strong>Note:</strong> Co-scholastic assessment uses a different grading scale (A, B, C) compared to academic subjects. Please select the appropriate grade for Visual Arts.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-y-8">
        <div>
          <h3 className="text-xl font-medium text-teal-700 mb-4">Term 1</h3>
          <div>
            <label htmlFor="term1-visualArts" className="block text-sm font-medium text-gray-700 mb-1">
              Visual Arts - Drawing and Craft
            </label>
            <select
              id="term1-visualArts"
              value={formData.coScholastic.term1.visualArts}
              onChange={(e) => handleInputChange('coScholastic', 'visualArts', e.target.value, 'term1')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Grade</option>
              {coScholasticGradeOptions.map((grade) => (
                <option key={`term1-visualArts-${grade.value}`} value={grade.value}>
                  {grade.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium text-teal-700 mb-4">Term 2</h3>
          <div>
            <label htmlFor="term2-visualArts" className="block text-sm font-medium text-gray-700 mb-1">
              Visual Arts - Drawing and Craft
            </label>
            <select
              id="term2-visualArts"
              value={formData.coScholastic.term2.visualArts}
              onChange={(e) => handleInputChange('coScholastic', 'visualArts', e.target.value, 'term2')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Grade</option>
              {coScholasticGradeOptions.map((grade) => (
                <option key={`term2-visualArts-${grade.value}`} value={grade.value}>
                  {grade.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-8">
        <div className="text-sm text-yellow-800">
          <strong>Understanding the Grades:</strong>
          <ul className="mt-2">
            <li><strong>A (Proficient):</strong> Student demonstrates excellent skills and creativity in visual arts.</li>
            <li><strong>B (Developing):</strong> Student shows good progress in developing artistic skills.</li>
            <li><strong>C (Emerging):</strong> Student is beginning to develop basic artistic skills.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoScholasticStep;