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

  // Render grade based on marks
  const renderGradeInfo = (marks) => {
    if (!marks) return null;
    
    const grade = getGradeFromMarks(marks);
    const gradeClass = getGradeColorClass(grade);
    
    return (
      <span className={`ml-3 font-medium ${gradeClass}`}>
        Grade: {grade}
      </span>
    );
  };
  
  // Helper function to get grade from marks
  const getGradeFromMarks = (marks) => {
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
  
  // Helper function to get color class based on grade
  const getGradeColorClass = (grade) => {
    switch(grade) {
      case 'A*': return 'text-purple-700';
      case 'A': return 'text-green-700';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-cyan-600';
      case 'D': return 'text-yellow-600';
      case 'E': return 'text-orange-600';
      case 'F': return 'text-red-500';
      case 'G': return 'text-red-600';
      case 'U': return 'text-red-700';
      default: return 'text-gray-600';
    }
  };

  // Calculate total marks from the three components and update the form
  const calculateTotalMarks = (term, subjectId) => {
    const firstTest = parseInt(formData.grades[term][subjectId]?.firstUnitTest || 0, 10);
    const secondTest = parseInt(formData.grades[term][subjectId]?.secondUnitTest || 0, 10);
    const finalExam = parseInt(formData.grades[term][subjectId]?.finalExam || 0, 10);
    
    // Sum up the marks, handling NaN values
    const totalMarks = (isNaN(firstTest) ? 0 : firstTest) + 
                       (isNaN(secondTest) ? 0 : secondTest) + 
                       (isNaN(finalExam) ? 0 : finalExam);
    
    return totalMarks;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Academic Marks & Grades</h2>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-6">
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-2">Grade Scale:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div><span className="font-medium text-purple-700">A* (Excelling):</span> 90-100</div>
            <div><span className="font-medium text-green-700">A (Achieving):</span> 80-89</div>
            <div><span className="font-medium text-blue-600">B (Advancing):</span> 70-79</div>
            <div><span className="font-medium text-cyan-600">C (Proficient):</span> 60-69</div>
            <div><span className="font-medium text-yellow-600">D (Developing):</span> 50-59</div>
            <div><span className="font-medium text-orange-600">E (Emerging):</span> 40-49</div>
            <div><span className="font-medium text-red-500">F (Beginning):</span> 30-39</div>
            <div><span className="font-medium text-red-600">G (Initiating):</span> 20-29</div>
            <div><span className="font-medium text-red-700">U (Needs Improvement):</span> 0-19</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-y-8">
        <div>
          <h3 className="text-xl font-medium text-teal-700 mb-4">Term 1</h3>
          <div className="grid grid-cols-1 gap-4">
            {subjects.map((subject) => {
              const totalMarks = calculateTotalMarks('term1', subject.id);
              
              return (
                <div key={`term1-${subject.id}`} className="border p-4 rounded-md">
                  <h4 className="text-md font-semibold text-gray-700 mb-3">
                    {subject.name}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div>
                      <label htmlFor={`term1-${subject.id}-first`} className="block text-sm font-medium text-gray-700 mb-1">
                        First Unit Test
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          id={`term1-${subject.id}-first`}
                          value={formData.grades.term1[subject.id]?.firstUnitTest || ''}
                          onChange={(e) => handleInputChange('grades', subject.id, e.target.value, 'term1', 'firstUnitTest')}
                          min="0"
                          max="20"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required={subject.isCompulsory}
                        />
                        <span className="ml-2 text-gray-600">/ 20</span>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor={`term1-${subject.id}-second`} className="block text-sm font-medium text-gray-700 mb-1">
                        Second Unit Test
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          id={`term1-${subject.id}-second`}
                          value={formData.grades.term1[subject.id]?.secondUnitTest || ''}
                          onChange={(e) => handleInputChange('grades', subject.id, e.target.value, 'term1', 'secondUnitTest')}
                          min="0"
                          max="20"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required={subject.isCompulsory}
                        />
                        <span className="ml-2 text-gray-600">/ 20</span>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor={`term1-${subject.id}-final`} className="block text-sm font-medium text-gray-700 mb-1">
                        Final Exam
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          id={`term1-${subject.id}-final`}
                          value={formData.grades.term1[subject.id]?.finalExam || ''}
                          onChange={(e) => handleInputChange('grades', subject.id, e.target.value, 'term1', 'finalExam')}
                          min="0"
                          max="60"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required={subject.isCompulsory}
                        />
                        <span className="ml-2 text-gray-600">/ 60</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-t pt-3 mt-2">
                    <span className="text-sm font-medium text-gray-700">Total:</span>
                    <span className="ml-2 font-semibold">{totalMarks}</span>
                    <span className="text-gray-600 ml-1">/ 100</span>
                    {renderGradeInfo(totalMarks)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium text-teal-700 mb-4">Term 2</h3>
          <div className="grid grid-cols-1 gap-4">
            {subjects.map((subject) => {
              const totalMarks = calculateTotalMarks('term2', subject.id);
              
              return (
                <div key={`term2-${subject.id}`} className="border p-4 rounded-md">
                  <h4 className="text-md font-semibold text-gray-700 mb-3">
                    {subject.name}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div>
                      <label htmlFor={`term2-${subject.id}-first`} className="block text-sm font-medium text-gray-700 mb-1">
                        First Unit Test
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          id={`term2-${subject.id}-first`}
                          value={formData.grades.term2[subject.id]?.firstUnitTest || ''}
                          onChange={(e) => handleInputChange('grades', subject.id, e.target.value, 'term2', 'firstUnitTest')}
                          min="0"
                          max="20"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required={subject.isCompulsory}
                        />
                        <span className="ml-2 text-gray-600">/ 20</span>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor={`term2-${subject.id}-second`} className="block text-sm font-medium text-gray-700 mb-1">
                        Second Unit Test
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          id={`term2-${subject.id}-second`}
                          value={formData.grades.term2[subject.id]?.secondUnitTest || ''}
                          onChange={(e) => handleInputChange('grades', subject.id, e.target.value, 'term2', 'secondUnitTest')}
                          min="0"
                          max="20"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required={subject.isCompulsory}
                        />
                        <span className="ml-2 text-gray-600">/ 20</span>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor={`term2-${subject.id}-final`} className="block text-sm font-medium text-gray-700 mb-1">
                        Final Exam
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          id={`term2-${subject.id}-final`}
                          value={formData.grades.term2[subject.id]?.finalExam || ''}
                          onChange={(e) => handleInputChange('grades', subject.id, e.target.value, 'term2', 'finalExam')}
                          min="0"
                          max="60"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required={subject.isCompulsory}
                        />
                        <span className="ml-2 text-gray-600">/ 60</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-t pt-3 mt-2">
                    <span className="text-sm font-medium text-gray-700">Total:</span>
                    <span className="ml-2 font-semibold">{totalMarks}</span>
                    <span className="text-gray-600 ml-1">/ 100</span>
                    {renderGradeInfo(totalMarks)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradesStep;