import React, { useState, useEffect } from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Step3Timeline: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [startDate, setStartDate] = useState<Date | undefined>(
    formData.dateRange?.start ? new Date(formData.dateRange.start) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    formData.dateRange?.end ? new Date(formData.dateRange.end) : undefined
  );
  
  // Calculate campaign duration in days
  const [duration, setDuration] = useState<number>(0);
  
  useEffect(() => {
    if (startDate && endDate) {
      const durationInMs = endDate.getTime() - startDate.getTime();
      const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));
      setDuration(durationInDays);
      
      updateFormData('dateRange', {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0]
      });
    } else {
      setDuration(0);
    }
  }, [startDate, endDate, updateFormData]);
  
  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!endDate) {
      newErrors.endDate = 'End date is required';
    } else if (startDate && endDate && endDate < startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setCurrentStep(4);
  };
  
  const handleBack = () => {
    setCurrentStep(2);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-agency-950">Campaign Timeline</CardTitle>
        <CardDescription>Set the start and end dates for your media campaign</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="start-date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal hover:bg-gray-50",
                    !startDate && "text-muted-foreground",
                    errors.startDate && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="end-date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal hover:bg-gray-50",
                    !endDate && "text-muted-foreground",
                    errors.endDate && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => {
                    if (!startDate) return false;
                    return date < startDate;
                  }}
                />
              </PopoverContent>
            </Popover>
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate}</p>
            )}
          </div>
        </div>
        
        {duration > 0 && (
          <div className="bg-agency-50 p-4 rounded-lg">
            <p className="font-medium text-agency-900">Campaign duration: {duration} days</p>
            <p className="text-sm text-agency-700">
              {Math.floor(duration / 30)} months, {duration % 30} days
            </p>
          </div>
        )}
        
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
            Continue to Channels
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3Timeline;
