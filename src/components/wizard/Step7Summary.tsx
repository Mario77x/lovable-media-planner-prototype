import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard } from '@/contexts/WizardContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { mockMediaPlans } from '@/data/mockData';
import { Save, SendHorizonal, ChevronLeft, ChevronRight } from 'lucide-react';

const formatListItems = (items: string[] | undefined): string => {
  if (!items || items.length === 0) return 'None selected';
  return items.map(item => 
    item.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  ).join(', ');
};

const formatCurrency = (value: number | undefined): string => {
  if (value === undefined) return 'Not specified';
  
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const Step7Summary: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateFormData, resetForm, setCurrentStep } = useWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleBack = () => {
    setCurrentStep(6);
  };
  
  const handleSaveAsDraft = () => {
    setIsSubmitting(true);
    
    // Generate a unique ID if one doesn't exist
    const planToSave = {
      ...formData,
      id: formData.id || crypto.randomUUID(),
      status: 'draft',
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Store in localStorage
    try {
      // Get existing plans or initialize with mock data
      const existingPlansJson = localStorage.getItem('mediaPlans');
      let existingPlans = existingPlansJson ? JSON.parse(existingPlansJson) : [...mockMediaPlans];
      
      // Check if this plan already exists (update) or is new (add)
      const existingPlanIndex = existingPlans.findIndex(p => p.id === planToSave.id);
      if (existingPlanIndex >= 0) {
        existingPlans[existingPlanIndex] = planToSave;
      } else {
        existingPlans.push(planToSave);
      }
      
      // Save back to localStorage
      localStorage.setItem('mediaPlans', JSON.stringify(existingPlans));
      
      toast({
        title: "Draft saved",
        description: "Your media plan has been saved as a draft.",
      });
      
      setIsSubmitting(false);
      resetForm();
      navigate('/view');
    } catch (error) {
      console.error("Error saving media plan:", error);
      toast({
        title: "Error saving draft",
        description: "An error occurred while saving your media plan.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  const handleSendForApproval = () => {
    setIsSubmitting(true);
    
    // Generate a unique ID if one doesn't exist
    const planToSave = {
      ...formData,
      id: formData.id || crypto.randomUUID(),
      status: 'pending approval',
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Store in localStorage
    try {
      // Get existing plans or initialize with mock data
      const existingPlansJson = localStorage.getItem('mediaPlans');
      let existingPlans = existingPlansJson ? JSON.parse(existingPlansJson) : [...mockMediaPlans];
      
      // Check if this plan already exists (update) or is new (add)
      const existingPlanIndex = existingPlans.findIndex(p => p.id === planToSave.id);
      if (existingPlanIndex >= 0) {
        existingPlans[existingPlanIndex] = planToSave;
      } else {
        existingPlans.push(planToSave);
      }
      
      // Save back to localStorage
      localStorage.setItem('mediaPlans', JSON.stringify(existingPlans));
      
      toast({
        title: "Plan submitted",
        description: "Your media plan has been sent to the client for approval.",
      });
      
      setIsSubmitting(false);
      resetForm();
      navigate('/view');
    } catch (error) {
      console.error("Error submitting media plan:", error);
      toast({
        title: "Error submitting plan",
        description: "An error occurred while submitting your media plan.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-agency-950">Media Plan Summary</CardTitle>
        <CardDescription>Review all details of your media plan before finalizing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Basic Information</h3>
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Client Name</dt>
                  <dd>{formData.clientName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Product Type</dt>
                  <dd>{formData.productType?.charAt(0).toUpperCase() + formData.productType?.slice(1)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Industry</dt>
                  <dd>{formData.industry?.charAt(0).toUpperCase() + formData.industry?.slice(1)}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Campaign Details</h3>
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">KPI Goals</dt>
                  <dd className="text-right">{formatListItems(formData.kpiGoals)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Market</dt>
                  <dd>Germany</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Timeline</dt>
                  <dd className="text-right">
                    {formData.dateRange 
                      ? `${format(new Date(formData.dateRange.start), 'MMM d, yyyy')} - ${format(new Date(formData.dateRange.end), 'MMM d, yyyy')}` 
                      : 'Not specified'}
                  </dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Channel Mix</h3>
              <div className="text-sm">
                {formatListItems(formData.channels)}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Budget</h3>
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Total Budget</dt>
                  <dd className="font-bold">{formatCurrency(formData.budget?.total)}</dd>
                </div>
                {formData.budget?.allocations.map((allocation) => (
                  <div key={allocation.channel} className="flex justify-between">
                    <dt className="text-sm text-gray-500">
                      {allocation.channel.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </dt>
                    <dd>
                      {formatCurrency(allocation.amount)} ({allocation.percentage}%)
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Geographic Targeting</h3>
              <div className="text-sm">
                <p className="mb-2">Selected Regions:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.regions && formData.regions.length > 0 ? (
                    formData.regions.map(region => (
                      <span key={region} className="inline-block bg-agency-100 text-agency-800 px-2 py-1 rounded text-xs">
                        {region.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No regions selected</span>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Demographic Targeting</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Age Ranges</dt>
                  <dd className="flex flex-wrap gap-1">
                    {formData.demographics?.ageRanges && formData.demographics.ageRanges.length > 0 ? (
                      formData.demographics.ageRanges.map(age => (
                        <span key={age} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                          {age}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">None selected</span>
                    )}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Gender</dt>
                  <dd className="flex flex-wrap gap-1">
                    {formData.demographics?.genders && formData.demographics.genders.length > 0 ? (
                      formData.demographics.genders.map(gender => (
                        <span key={gender} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                          {gender === 'all' ? 'All Genders' : gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">None selected</span>
                    )}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Income Level</dt>
                  <dd className="flex flex-wrap gap-1">
                    {formData.demographics?.income && formData.demographics.income.length > 0 ? (
                      formData.demographics.income.map(income => (
                        <span key={income} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                          {income.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">None selected</span>
                    )}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Interests</dt>
                  <dd className="flex flex-wrap gap-1">
                    {formData.demographics?.interests && formData.demographics.interests.length > 0 ? (
                      formData.demographics.interests.map(interest => (
                        <span key={interest} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                          {interest.charAt(0).toUpperCase() + interest.slice(1)}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">None selected</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Additional Notes</Label>
              <Textarea
                id="description"
                placeholder="Add any additional notes or context for this media plan..."
                value={formData.description || ''}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isSubmitting}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleSaveAsDraft}
            disabled={isSubmitting}
            className="flex items-center border-agency-200 text-agency-700 hover:bg-agency-50"
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                className="flex items-center bg-agency-700 hover:bg-agency-800"
                disabled={isSubmitting}
              >
                <SendHorizonal className="h-4 w-4 mr-2" />
                Send for Approval
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Send media plan for client approval?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will send the media plan to {formData.clientName} for review and approval. 
                  You can still make changes after sending if needed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleSendForApproval}
                  className="bg-agency-700 hover:bg-agency-800"
                >
                  Send for Approval
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Step7Summary;
