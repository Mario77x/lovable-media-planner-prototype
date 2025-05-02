
import React, { useEffect, useMemo } from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { calculateBudget } from '@/data/mockData';
import { BudgetAllocation } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { toast } from 'sonner';

const COLORS = ['#0a446e', '#0563a0', '#027cc5', '#0e9de8', '#39b7f6', '#7dcefb', '#bae3fd'];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const Step6Budget: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useWizard();
  
  const durationMonths = useMemo(() => {
    if (formData.dateRange?.start && formData.dateRange?.end) {
      const startDate = new Date(formData.dateRange.start);
      const endDate = new Date(formData.dateRange.end);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(1, Math.round(diffDays / 30));
    }
    return 1;
  }, [formData.dateRange]);
  
  // Calculate budget allocations based on selected channels and duration
  useEffect(() => {
    if (formData.channels && formData.channels.length > 0) {
      const allocations = calculateBudget(formData.channels, durationMonths);
      const totalBudget = allocations.reduce((sum, item) => sum + item.amount, 0);
      
      updateFormData('budget', {
        total: totalBudget,
        currency: 'EUR',
        allocations
      });
    }
  }, [formData.channels, durationMonths, updateFormData]);
  
  // Prepare data for the pie chart
  const chartData = useMemo(() => {
    if (!formData.budget?.allocations) return [];
    
    return formData.budget.allocations.map(allocation => ({
      name: allocation.channel.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      value: allocation.amount
    }));
  }, [formData.budget?.allocations]);
  
  const adjustChannelBudget = (index: number, newPercentage: number) => {
    if (!formData.budget?.allocations) return;
    
    const allocations = [...formData.budget.allocations];
    const currentAllocation = allocations[index];
    const oldPercentage = currentAllocation.percentage;
    const percentageDiff = newPercentage - oldPercentage;
    
    // Don't proceed if there's no real change
    if (Math.abs(percentageDiff) < 0.01) return;
    
    // Adjust this channel's percentage
    currentAllocation.percentage = newPercentage;
    
    // Calculate the new amount based on the total and new percentage
    const totalBudget = formData.budget.total;
    currentAllocation.amount = Math.round((totalBudget * newPercentage) / 100);
    
    // Distribute the percentage difference among other channels proportionally
    const otherChannels = allocations.filter((_, i) => i !== index);
    const totalOtherPercentage = otherChannels.reduce((sum, item) => sum + item.percentage, 0);
    
    if (totalOtherPercentage > 0) {
      otherChannels.forEach(channel => {
        const adjustmentRatio = channel.percentage / totalOtherPercentage;
        channel.percentage = Math.max(5, channel.percentage - (percentageDiff * adjustmentRatio));
        channel.amount = Math.round((totalBudget * channel.percentage) / 100);
      });
    }
    
    // Round percentages to ensure they sum to 100%
    let sumPercentages = allocations.reduce((sum, item) => sum + item.percentage, 0);
    
    if (Math.abs(sumPercentages - 100) > 0.1) {
      const lastIndex = allocations.length - 1;
      allocations[lastIndex].percentage += (100 - sumPercentages);
      allocations[lastIndex].amount = Math.round((totalBudget * allocations[lastIndex].percentage) / 100);
    }
    
    // Show notification for significant budget changes
    if (Math.abs(percentageDiff) >= 5) {
      toast.info(`${currentAllocation.channel} budget adjusted to ${newPercentage.toFixed(0)}%`);
    }
    
    updateFormData('budget', {
      ...formData.budget,
      allocations
    });
  };
  
  const handleNext = () => {
    setCurrentStep(7);
  };
  
  const handleBack = () => {
    setCurrentStep(5);
  };
  
  if (!formData.budget || !formData.budget.allocations) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-agency-950">Budget Allocation</CardTitle>
          <CardDescription>Calculating budget based on your selections...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex justify-center items-center">
          <div className="animate-pulse flex space-x-4">
            <div className="h-12 w-12 bg-agency-200 rounded-full"></div>
            <div className="space-y-4">
              <div className="h-4 w-36 bg-agency-200 rounded"></div>
              <div className="h-4 w-80 bg-agency-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-agency-950">Budget Allocation</CardTitle>
        <CardDescription>Review and adjust your budget allocation across selected channels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-agency-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-xl text-agency-900">Total Budget: {formatCurrency(formData.budget.total)}</h3>
          <p className="text-sm text-agency-700 mt-1">
            For a {durationMonths} month campaign, based on your selected channels and targeting
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="font-medium text-lg">Adjust Channel Distribution</h3>
            {formData.budget.allocations.map((allocation, index) => (
              <div key={allocation.channel} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>
                    {allocation.channel.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Label>
                  <span className="text-sm font-medium">
                    {formatCurrency(allocation.amount)} ({allocation.percentage.toFixed(0)}%)
                  </span>
                </div>
                <Slider
                  value={[allocation.percentage]}
                  min={5}
                  max={70}
                  step={1}
                  className="cursor-pointer"
                  onValueChange={(value) => adjustChannelBudget(index, value[0])}
                />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="font-medium text-lg mb-4 self-start">Budget Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  animationBegin={0}
                  animationDuration={500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  animationDuration={300}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
            Continue to Summary
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step6Budget;
