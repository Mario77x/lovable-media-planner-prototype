
import React from 'react';
import { useWizard } from '@/contexts/WizardContext';
import Step1BasicInfo from './Step1BasicInfo';
import Step2Goals from './Step2Goals';
import Step3Timeline from './Step3Timeline';
import Step4Channels from './Step4Channels';
import Step5Targeting from './Step5Targeting';
import Step6Budget from './Step6Budget';
import Step7Summary from './Step7Summary';
import { Progress } from '@/components/ui/progress';

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

  // Calculate progress percentage for the progress bar
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Line-based Progress Indicator - Adjusted spacing to match AI Assistant page */}
      <div className="mb-10 px-2">
        <div className="relative">
          {/* Progress Bar */}
          <Progress 
            value={progressPercentage} 
            className="h-1 w-full bg-gray-200"
          />
          
          {/* Step Circles and Labels */}
          <div className="flex justify-between absolute w-full top-0 -mt-2.5">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;
              
              return (
                <div key={stepNumber} className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium border-2
                    ${isActive 
                      ? 'bg-agency-600 border-agency-600 text-white' 
                      : isCompleted 
                        ? 'bg-agency-600 border-agency-600 text-white' 
                        : 'bg-white border-gray-200 text-gray-400'}`}
                  >
                    {stepNumber}
                  </div>
                  
                  {/* Step Title */}
                  <span className={`text-xs mt-2 font-medium text-center
                    ${isActive 
                      ? 'text-agency-800' 
                      : isCompleted 
                        ? 'text-agency-600' 
                        : 'text-gray-400'}`}
                  >
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Current Step - Removed excess padding */}
      <div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Wizard;
