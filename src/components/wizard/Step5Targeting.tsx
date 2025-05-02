import React, { useState } from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { getRecommendedRegions, germanRegions, demographicOptions } from '@/data/mockData';
import { GermanRegion } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import GermanyMap from '@/components/GermanyMap';
import { Map, Users } from 'lucide-react';

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
    <Card className="w-full max-w-4xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-agency-950">Audience Targeting</CardTitle>
        <CardDescription>Define your geographic and demographic targeting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tab navigation in a pill style */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-md bg-muted p-1">
            <button
              onClick={() => setActiveTab("geographic")}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === "geographic" 
                  ? "bg-background shadow text-foreground" 
                  : "text-muted-foreground hover:bg-muted-foreground/10"
              }`}
            >
              <Map className="h-4 w-4 mr-1" />
              Geographic
            </button>
            <button
              onClick={() => setActiveTab("demographic")}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === "demographic" 
                  ? "bg-background shadow text-foreground" 
                  : "text-muted-foreground hover:bg-muted-foreground/10"
              }`}
            >
              <Users className="h-4 w-4 mr-1" />
              Demographic
            </button>
          </div>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === "geographic" ? (
          <div className="space-y-4">
            {/* Map Container - Reduced to 350px height */}
            <div className="w-full h-[350px] relative overflow-hidden rounded-lg">
              <GermanyMap
                selectedRegions={selectedRegions}
                recommendedRegions={recommendedRegions}
                onRegionClick={handleRegionClick}
              />
            </div>
            
            {/* Selected Regions Display */}
            <div>
              <h3 className="font-medium mb-2">Selected Regions:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedRegions.length > 0 ? (
                  selectedRegions.map(regionId => {
                    const region = germanRegions.find(r => r.id === regionId);
                    return (
                      <Badge key={regionId} variant="secondary">
                        {region?.name}
                      </Badge>
                    );
                  })
                ) : (
                  <span className="text-muted-foreground text-sm">No regions selected</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Age Range</h3>
                <div className="space-y-2">
                  {demographicOptions.ageRanges.map(age => (
                    <div key={age} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`age-${age}`} 
                        checked={currentDemographics.ageRanges.includes(age)}
                        onCheckedChange={() => toggleDemographic('ageRanges', age)}
                      />
                      <Label htmlFor={`age-${age}`}>{age}</Label>
                    </div>
                  ))}
                </div>
                
                <h3 className="font-medium text-lg mt-4">Gender</h3>
                <div className="space-y-2">
                  {demographicOptions.genders.map(gender => (
                    <div key={gender} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`gender-${gender}`} 
                        checked={currentDemographics.genders.includes(gender)}
                        onCheckedChange={() => toggleDemographic('genders', gender)}
                      />
                      <Label htmlFor={`gender-${gender}`}>
                        {gender === 'all' ? 'All Genders' : gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Income Level</h3>
                <div className="space-y-2">
                  {demographicOptions.income.map(income => (
                    <div key={income} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`income-${income}`} 
                        checked={currentDemographics.income.includes(income)}
                        onCheckedChange={() => toggleDemographic('income', income)}
                      />
                      <Label htmlFor={`income-${income}`}>
                        {income.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Label>
                    </div>
                  ))}
                </div>
                
                <h3 className="font-medium text-lg mt-4">Interests</h3>
                <div className="grid grid-cols-2 gap-2">
                  {demographicOptions.interests.map(interest => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`interest-${interest}`} 
                        checked={currentDemographics.interests.includes(interest)}
                        onCheckedChange={() => toggleDemographic('interests', interest)}
                      />
                      <Label htmlFor={`interest-${interest}`}>
                        {interest.charAt(0).toUpperCase() + interest.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons - Always at the bottom */}
        <div className="flex justify-between pt-4">
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
      </CardContent>
    </Card>
  );
};

export default Step5Targeting;
