
import React, { createContext, useState, useContext, useEffect } from 'react';
import { MediaPlan, WizardContextType } from '@/types';

const defaultFormData: Partial<MediaPlan> = {
  id: crypto.randomUUID(),
  clientName: '',
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const TEMP_STORAGE_KEY = 'mediaplan_in_progress';

export const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MediaPlan>>(defaultFormData);
  
  // Load in-progress form data on component mount
  useEffect(() => {
    try {
      const storedFormData = localStorage.getItem(TEMP_STORAGE_KEY);
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData);
        setFormData(parsedData);
        
        // Also restore the current step if it was saved
        const storedStep = localStorage.getItem(TEMP_STORAGE_KEY + '_step');
        if (storedStep) {
          setCurrentStep(parseInt(storedStep, 10));
        }
      }
    } catch (error) {
      console.error("Error loading in-progress data:", error);
    }
  }, []);
  
  // Save form data to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(formData));
      localStorage.setItem(TEMP_STORAGE_KEY + '_step', currentStep.toString());
    } catch (error) {
      console.error("Error saving in-progress data:", error);
    }
  }, [formData, currentStep]);
  
  const updateFormData = <K extends keyof MediaPlan>(key: K, value: MediaPlan[K]) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
  };
  
  const resetForm = () => {
    // Generate a new ID for the next plan
    const newDefaultFormData = {
      ...defaultFormData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setFormData(newDefaultFormData);
    setCurrentStep(1);
    
    // Clear the in-progress data
    localStorage.removeItem(TEMP_STORAGE_KEY);
    localStorage.removeItem(TEMP_STORAGE_KEY + '_step');
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
