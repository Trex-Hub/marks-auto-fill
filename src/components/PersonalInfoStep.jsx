'use client';

const PersonalInfoStep = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Information</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
            Student's Name
          </label>
          <input
            type="text"
            id="studentName"
            value={formData.studentName}
            onChange={(e) => handleInputChange('personal', 'studentName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade
          </label>
          <input
            type="text"
            id="grade"
            value={formData.grade}
            onChange={(e) => handleInputChange('personal', 'grade', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-6">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This information will appear at the top of the report card. Please ensure all details are correct.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoStep;