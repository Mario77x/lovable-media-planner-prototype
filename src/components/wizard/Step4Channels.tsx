
import React, { useState, useEffect } from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { getRecommendedChannels, channels } from '@/data/mockData';
import { Channel } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const Step4Channels: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recommendedChannels, setRecommendedChannels] = useState<Channel[]>([]);
  
  const selectedChannels = formData.channels || [];
  
  useEffect(() => {
    if (formData.industry && formData.kpiGoals && formData.kpiGoals.length > 0) {
      const recommended = getRecommendedChannels(formData.industry, formData.kpiGoals);
      setRecommendedChannels(recommended);
      
      // If no channels are selected yet, pre-select the recommended ones
      if (!formData.channels || formData.channels.length === 0) {
        updateFormData('channels', recommended);
      }
    }
  }, [formData.industry, formData.kpiGoals, formData.channels, updateFormData]);
  
  const toggleChannel = (channel: Channel) => {
    const newSelection = selectedChannels.includes(channel)
      ? selectedChannels.filter(c => c !== channel)
      : [...selectedChannels, channel];
    
    updateFormData('channels', newSelection);
  };
  
  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.channels || formData.channels.length === 0) {
      newErrors.channels = 'At least one channel is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setCurrentStep(5);
  };
  
  const handleBack = () => {
    setCurrentStep(3);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-agency-950">Media Channels</CardTitle>
        <CardDescription>Select which channels to include in your media plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Available Channels <span className="text-red-500">*</span></Label>
            <p className="text-sm text-gray-500">
              Selected: {selectedChannels.length}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {channels.map((channel) => {
              const isRecommended = recommendedChannels.includes(channel as Channel);
              
              return (
                <div
                  key={channel}
                  className={`flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50 ${
                    isRecommended ? 'border-agency-300 bg-blue-50' : ''
                  }`}
                >
                  <Checkbox
                    id={channel}
                    checked={selectedChannels.includes(channel as Channel)}
                    onCheckedChange={() => toggleChannel(channel as Channel)}
                  />
                  <Label htmlFor={channel} className="cursor-pointer w-full">
                    <div className="flex items-center justify-between">
                      <span>
                        {channel.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                      {isRecommended && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          Recommended
                        </span>
                      )}
                    </div>
                  </Label>
                </div>
              );
            })}
          </div>
          
          {errors.channels && (
            <p className="text-red-500 text-sm mt-1">{errors.channels}</p>
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
          >
            Continue to Targeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4Channels;
