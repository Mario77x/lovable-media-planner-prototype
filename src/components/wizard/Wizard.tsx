
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Simplified Horizontal Progress Bar */}
      <div className="bg-white rounded-md shadow-sm p-3">
        <div className="flex justify-between items-center">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isPast = currentStep > stepNumber;
            const isFuture = currentStep < stepNumber;
            
            return (
              <div key={stepNumber} className="flex flex-col items-center relative">
                {/* Step Number Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                    ${isActive 
                      ? 'bg-agency-600 text-white' 
                      : isPast 
                        ? 'bg-agency-200 text-agency-800' 
                        : 'bg-gray-100 text-gray-400'}`}
                >
                  {stepNumber}
                </div>
                
                {/* Step Title */}
                <span className={`text-xs mt-1 font-medium 
                  ${isActive 
                    ? 'text-agency-800' 
                    : isPast 
                      ? 'text-agency-600' 
                      : 'text-gray-400'}`}
                >
                  {title}
                </span>
                
                {/* Connecting Lines */}
                {stepNumber < totalSteps && (
                  <div 
                    className={`absolute top-4 left-8 w-full h-[2px] -z-10
                      ${isPast ? 'bg-agency-600' : 'bg-gray-200'}`}
                  />
                )}
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
