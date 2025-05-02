import React, { useState, useEffect, useId } from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { getRecommendedRegions, germanRegions, demographicOptions } from '@/data/mockData';
import { GermanRegion } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import MapboxGermanyMap from '@/components/MapboxGermanyMap';
import GermanyMap from '@/components/GermanyMap';
import { Map, Target, Users } from 'lucide-react';
import { toast } from 'sonner';

const Step5Targeting: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useWizard();
  const [recommendedRegions, setRecommendedRegions] = useState<GermanRegion[]>([]);
  const [useMapbox, setUseMapbox] = useState<boolean>(true);
  const mapboxKey = useId(); // Generate unique key for mapbox component
  
  const selectedRegions = formData.regions || [];
  const currentDemographics = formData.demographics || {
    ageRanges: [],
    genders: [],
    income: [],
    interests: []
  };
  
  useEffect(() => {
    if (formData.industry && formData.kpiGoals && formData.kpiGoals.length > 0) {
      const recommended = getRecommendedRegions(formData.industry, formData.kpiGoals);
      setRecommendedRegions(recommended);
      
      // Pre-select recommended regions if none selected
      if (!formData.regions || formData.regions.length === 0) {
        updateFormData('regions', recommended);
      }
    }
  }, [formData.industry, formData.kpiGoals, formData.regions, updateFormData]);
  
  const handleRegionClick = (region: GermanRegion) => {
    console.log("Region clicked:", region);
    const isSelected = selectedRegions.includes(region);
    const newSelection = isSelected
      ? selectedRegions.filter(r => r !== region)
      : [...selectedRegions, region];
    
    updateFormData('regions', newSelection);
    
    // Show notification when region is selected/deselected
    if (isSelected) {
      const regionName = germanRegions.find(r => r.id === region)?.name || region;
      toast.info(`Removed ${regionName} from selection`);
    } else {
      const regionName = germanRegions.find(r => r.id === region)?.name || region;
      toast.success(`Added ${regionName} to selection`);
    }
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
  
  const switchToSimpleMap = () => {
    console.log("Switching to simple map view");
    setUseMapbox(false);
    toast.info("Switched to simple map view");
  };

  const switchToMapbox = () => {
    console.log("Switching to interactive map view");
    setUseMapbox(true);
    toast.info("Switched to interactive map view");
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-agency-950">Audience Targeting</CardTitle>
        <CardDescription>Define your geographic and demographic targeting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="geographic">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="geographic" className="flex items-center space-x-2">
              <Map className="h-4 w-4" />
              <span>Geographic</span>
            </TabsTrigger>
            <TabsTrigger value="demographic" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Demographic</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="geographic" className="space-y-4">
            <div className="bg-agency-50 p-4 rounded-lg mb-4 flex items-start">
              <Target className="h-5 w-5 text-agency-700 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-agency-900">Regional Targeting</h3>
                <p className="text-sm text-agency-700">
                  Click on regions in the map to select or deselect them. Recommended regions are highlighted based on your campaign goals.
                </p>
              </div>
            </div>
            
            {/* Map Type Toggle */}
            {!useMapbox && (
              <div className="flex items-center justify-end mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={switchToMapbox}
                  className="text-xs"
                >
                  Use Interactive Map
                </Button>
              </div>
            )}
            
            {/* Map Container - Fixed height with proper positioning */}
            <div className="w-full h-[500px] relative">
              {useMapbox ? (
                <div className="absolute inset-0" key={`mapbox-container-${mapboxKey}`}>
                  <MapboxGermanyMap
                    selectedRegions={selectedRegions}
                    recommendedRegions={recommendedRegions}
                    onRegionClick={handleRegionClick}
                    onSwitchToSimpleMap={switchToSimpleMap}
                  />
                </div>
              ) : (
                <div className="absolute inset-0">
                  <GermanyMap
                    selectedRegions={selectedRegions}
                    recommendedRegions={recommendedRegions}
                    onRegionClick={handleRegionClick}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="demographic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                
                <h3 className="font-medium text-lg mt-6">Gender</h3>
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
                
                <h3 className="font-medium text-lg mt-6">Interests</h3>
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
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-agency-700 hover:bg-agency-800"
          >
            Continue to Budget
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step5Targeting;
