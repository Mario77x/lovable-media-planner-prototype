
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { WizardProvider } from '@/contexts/WizardContext';
import MainLayout from '@/components/layout/MainLayout';
import Wizard from '@/components/wizard/Wizard';
import Step7Summary from '@/components/wizard/Step7Summary';

const CreateManual: React.FC = () => {
  const { step } = useParams<{ step?: string }>();
  
  // If we have a specific step in the URL, show just that step
  if (step === 'summary') {
    return (
      <MainLayout showBackButton>
        <div className="pt-3 pb-4">
          <WizardProvider>
            <Step7Summary />
          </WizardProvider>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout showBackButton>
      <div className="py-3">
        <WizardProvider>
          <Wizard />
        </WizardProvider>
      </div>
    </MainLayout>
  );
};

export default CreateManual;
