'use client';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, name: 'Personal Info' },
    { number: 2, name: 'Academic Grades' },
    { number: 3, name: 'Co-Scholastic' },
    { number: 4, name: 'Descriptive Indicators' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.number === currentStep
                  ? 'bg-teal-500 text-white'
                  : step.number < currentStep
                  ? 'bg-teal-200 text-teal-700'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number}
            </div>
            <div className="text-xs mt-2 text-center">{step.name}</div>
          </div>
        ))}
      </div>
      
      <div className="relative mt-2">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
        <div 
          className="absolute top-0 left-0 h-1 bg-teal-500 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StepIndicator;