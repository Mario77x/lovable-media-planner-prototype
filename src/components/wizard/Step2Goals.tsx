
import React, { useState } from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { kpiGoals, countries } from '@/data/mockData';
import { KPIGoal, Country } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Info } from 'lucide-react';

const Step2Goals: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const selectedKPIs = formData.kpiGoals || [];
  
  const toggleKPI = (kpi: KPIGoal) => {
    const currentKPIs = formData.kpiGoals || [];
    const newKPIs = currentKPIs.includes(kpi)
      ? currentKPIs.filter(k => k !== kpi)
      : [...currentKPIs, kpi];
    
    updateFormData('kpiGoals', newKPIs);
  };
  
  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.kpiGoals || formData.kpiGoals.length === 0) {
      newErrors.kpiGoals = 'At least one KPI goal is required';
    }
    
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setCurrentStep(3);
  };
  
  const handleBack = () => {
    setCurrentStep(1);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-agency-950">Campaign Goals & Market</CardTitle>
        <CardDescription>Define your key performance indicators and target market</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>KPI Goals <span className="text-red-500">*</span></Label>
            <div className="flex items-center text-sm text-gray-500">
              <Info className="h-4 w-4 mr-1" />
              <span>Select all that apply</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {kpiGoals.map((kpi) => (
              <div key={kpi} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50">
                <Checkbox
                  id={kpi}
                  checked={selectedKPIs.includes(kpi)}
                  onCheckedChange={() => toggleKPI(kpi)}
                />
                <Label htmlFor={kpi} className="cursor-pointer w-full">
                  {kpi.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Label>
              </div>
            ))}
          </div>
          
          {errors.kpiGoals && (
            <p className="text-red-500 text-sm mt-1">{errors.kpiGoals}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Target Country <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.country} 
            onValueChange={(value) => updateFormData('country', value as Country)}
            disabled={value => value !== 'germany'} // Only Germany is selectable
          >
            <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select target country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem 
                  key={country} 
                  value={country}
                  disabled={country !== 'germany'}
                >
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                  {country !== 'germany' && " (Coming soon)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
          
          {formData.country && formData.country !== 'germany' && (
            <p className="text-yellow-600 text-sm mt-1">
              Note: This prototype currently only supports campaigns in Germany.
            </p>
          )}
        </div>
        
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
            Continue to Timeline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step2Goals;
