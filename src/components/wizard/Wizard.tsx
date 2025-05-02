
import React from 'react';
import { useWizard } from '@/contexts/WizardContext';
import Step1BasicInfo from './Step1BasicInfo';
import Step2Goals from './Step2Goals';
import Step3Timeline from './Step3Timeline';
import Step4Channels from './Step4Channels';
import Step5Targeting from './Step5Targeting';
import Step6Budget from './Step6Budget';
import Step7Summary from './Step7Summary';

const Wizard: React.FC = () => {
  const { currentStep, totalSteps } = useWizard();
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2Goals />;
      case 3:
        return <Step3Timeline />;
      case 4:
        return <Step4Channels />;
      case 5:
        return <Step5Targeting />;
      case 6:
        return <Step6Budget />;
      case 7:
        return <Step7Summary />;
      default:
        return <Step1BasicInfo />;
    }
  };
  
  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };
  
  const stepTitles = [
    'Basic Info',
    'Goals',
    'Timeline',
    'Channels',
    'Targeting',
    'Budget',
    'Summary'
  ];
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto pt-4">
      {/* Compact Progress Indicator */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        {/* Progress Bar - Moved to the top */}
        <div className="w-full h-1 bg-gray-200">
          <div
            className="h-full bg-agency-600 transition-all duration-300 ease-in-out"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between px-4 py-2">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;
            
            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-agency-600 text-white'
                      : isCompleted
                      ? 'bg-agency-200 text-agency-800'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`text-xs mt-1 hidden md:block ${
                    isActive
                      ? 'text-agency-800 font-medium'
                      : isCompleted
                      ? 'text-agency-600'
                      : 'text-gray-400'
                  }`}
                >
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current Step */}
      {renderStep()}
    </div>
  );
};

export default Wizard;
