import React, { useState } from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { getRecommendedRegions } from '@/data/mockData';
import { GermanRegion } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GeographicTargeting from '@/components/targeting/GeographicTargeting';
import DemographicTargeting from '@/components/targeting/DemographicTargeting';
import TargetingTabHeader from '@/components/targeting/TargetingTabHeader';

const Step5Targeting: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useWizard();
  const [activeTab, setActiveTab] = useState<"geographic" | "demographic">("geographic");
  
  const selectedRegions = formData.regions || [];
  // Using a valid industry from the Industry type as fallback
  const industry = formData.industry || 'technology';
  const recommendedRegions = getRecommendedRegions(industry, formData.kpiGoals || []);
  const currentDemographics = formData.demographics || {
    ageRanges: [],
    genders: [],
    income: [],
    interests: []
  };
  
  const handleRegionClick = (region: GermanRegion) => {
    const isSelected = selectedRegions.includes(region);
    const newSelection = isSelected
      ? selectedRegions.filter(r => r !== region)
      : [...selectedRegions, region];
    
    updateFormData('regions', newSelection);
  };
  
  const toggleDemographic = (category: keyof typeof currentDemographics, value: string) => {
    const currentValues = currentDemographics[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    updateFormData('demographics', {
      ...currentDemographics,
      [category]: newValues
    });
  };
  
  const handleNext = () => {
    setCurrentStep(6);
  };
  
  const handleBack = () => {
    setCurrentStep(4);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md relative pb-16">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-agency-950">Audience Targeting</CardTitle>
          <CardDescription>Define your geographic and demographic targeting</CardDescription>
        </div>
        
        {/* Tab navigation aligned with header */}
        <TargetingTabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Content based on active tab */}
        {activeTab === "geographic" ? (
          <GeographicTargeting 
            selectedRegions={selectedRegions}
            recommendedRegions={recommendedRegions}
            onRegionClick={handleRegionClick}
          />
        ) : (
          <DemographicTargeting 
            currentDemographics={currentDemographics}
            toggleDemographic={toggleDemographic}
          />
        )}
      </CardContent>
      
      {/* Navigation Buttons - Repositioned with absolute positioning */}
      <div className="absolute bottom-4 left-6 right-6 flex justify-between">
        <Button 
          variant="outline"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
        >
          Continue to Budget
        </Button>
      </div>
    </Card>
  );
};

export default Step5Targeting;
