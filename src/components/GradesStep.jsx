'use client';

const GradesStep = ({ formData, handleInputChange }) => {
  const subjects = [
    { id: 'English', name: 'English*', isCompulsory: true },
    { id: 'ICT', name: 'ICT*', isCompulsory: true },
    { id: 'Mathematics', name: 'Mathematics*', isCompulsory: true },
    { id: 'Science', name: 'Science*', isCompulsory: true },
    { id: 'SST', name: 'SST*', isCompulsory: true },
    { id: 'French', name: 'French', isCompulsory: false },
    { id: 'Hindi', name: 'Hindi', isCompulsory: false },
    { id: 'Marathi', name: 'Marathi', isCompulsory: false },
  ];

  const gradeOptions = [
    { value: 'A*', label: 'A* (Excelling - 90+)' },
    { value: 'A', label: 'A (Achieving - 80-89)' },
    { value: 'B', label: 'B (Advancing - 70-79)' },
    { value: 'C', label: 'C (Proficient - 60-69)' },
    { value: 'D', label: 'D (Developing - 50-59)' },
    { value: 'E', label: 'E (Emerging - 40-49)' },
    { value: 'F', label: 'F (Beginning - 30-39)' },
    { value: 'G', label: 'G (Initiating - 20-29)' },
    { value: 'U', label: 'U (Needs Improvement - 0-19)' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Academic Grades</h2>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Subjects marked with * are compulsory. Please select a grade for each subject from the dropdown menu.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-y-8">
        <div>
          <h3 className="text-xl font-medium text-teal-700 mb-4">Term 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <div key={`term1-${subject.id}`}>
                <label htmlFor={`term1-${subject.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  {subject.name}
                </label>
                <select
                  id={`term1-${subject.id}`}
                  value={formData.grades.term1[subject.id]}
                  onChange={(e) => handleInputChange('grades', subject.id, e.target.value, 'term1')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required={subject.isCompulsory}
                >
                  <option value="">Select Grade</option>
                  {gradeOptions.map((grade) => (
                    <option key={`term1-${subject.id}-${grade.value}`} value={grade.value}>
                      {grade.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium text-teal-700 mb-4">Term 2</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <div key={`term2-${subject.id}`}>
                <label htmlFor={`term2-${subject.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  {subject.name}
                </label>
                <select
                  id={`term2-${subject.id}`}
                  value={formData.grades.term2[subject.id]}
                  onChange={(e) => handleInputChange('grades', subject.id, e.target.value, 'term2')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required={subject.isCompulsory}
                >
                  <option value="">Select Grade</option>
                  {gradeOptions.map((grade) => (
                    <option key={`term2-${subject.id}-${grade.value}`} value={grade.value}>
                      {grade.label}
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

export default GradesStep;