
import React, { useState } from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { productTypes, industries } from '@/data/mockData';
import { ProductType, Industry } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Step1BasicInfo: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.clientName) {
      newErrors.clientName = 'Client name is required';
    }
    
    if (!formData.productType) {
      newErrors.productType = 'Product type is required';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setCurrentStep(2);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-agency-950">Basic Information</CardTitle>
        <CardDescription>Let's start by defining the basic details of your media plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="client-name">Client Name</Label>
          <Input
            id="client-name"
            placeholder="Enter client name"
            value={formData.clientName || ''}
            onChange={(e) => updateFormData('clientName', e.target.value)}
            className={errors.clientName ? 'border-red-500' : ''}
          />
          {errors.clientName && (
            <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Product Type</Label>
          <Select 
            value={formData.productType} 
            onValueChange={(value) => updateFormData('productType', value as ProductType)}
          >
            <SelectTrigger className={errors.productType ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select product type" />
            </SelectTrigger>
            <SelectContent>
              {productTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.productType && (
            <p className="text-red-500 text-sm mt-1">{errors.productType}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Industry</Label>
          <Select 
            value={formData.industry} 
            onValueChange={(value) => updateFormData('industry', value as Industry)}
          >
            <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry.charAt(0).toUpperCase() + industry.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
          )}
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={handleNext}
            className="w-full bg-agency-700 hover:bg-agency-800"
          >
            Continue to Goals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step1BasicInfo;
