
import React, { createContext, useState, useContext } from 'react';
import { MediaPlan, WizardContextType } from '@/types';

const defaultFormData: Partial<MediaPlan> = {
  id: '',
  clientName: '',
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MediaPlan>>(defaultFormData);
  
  const updateFormData = <K extends keyof MediaPlan>(key: K, value: MediaPlan[K]) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
  };
  
  const resetForm = () => {
    setFormData({
      ...defaultFormData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setCurrentStep(1);
  };
  
  return (
    <WizardContext.Provider
      value={{
        currentStep,
        totalSteps: 7,
        formData,
        setCurrentStep,
        updateFormData,
        resetForm,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = (): WizardContextType => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
