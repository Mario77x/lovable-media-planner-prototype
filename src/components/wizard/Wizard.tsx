
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
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Compact Horizontal Progress Bar */}
      <div className="bg-white rounded-md shadow-sm p-3">
        <div className="flex justify-between items-center">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isPast = currentStep > stepNumber;
            const isFuture = currentStep < stepNumber;
            
            return (
              <div key={stepNumber} className="flex flex-col items-center relative group">
                {/* Step Number Circle */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium 
                    ${isActive 
                      ? 'bg-agency-600 text-white' 
                      : isPast 
                        ? 'bg-agency-200 text-agency-800' 
                        : 'bg-gray-100 text-gray-400'}`}
                >
                  {stepNumber}
                </div>
                
                {/* Step Title - Only show on hover or for active step */}
                <span className={`text-[10px] sm:text-xs mt-1 font-medium absolute -bottom-5 whitespace-nowrap
                  ${isActive 
                    ? 'text-agency-800 opacity-100' 
                    : 'opacity-0 group-hover:opacity-100 text-gray-500'}`}
                >
                  {title}
                </span>
                
                {/* Connecting Lines */}
                {stepNumber < totalSteps && (
                  <div 
                    className={`absolute top-3 left-6 w-full h-[2px] -z-10
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
