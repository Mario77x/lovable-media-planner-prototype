import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlanStatus, MediaPlan } from '@/types';
import { format } from 'date-fns';
import { Edit, Save, X, ArrowLeft } from 'lucide-react';

interface MediaPlanDetailProps {
  plan: MediaPlan;
  onBack: () => void;
}

const formatCurrency = (value: number | undefined): string => {
  if (value === undefined) return 'Not specified';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const StatusBadge: React.FC<{ status: PlanStatus }> = ({ status }) => {
  let className = 'plan-status-draft';
  
  switch (status) {
    case 'draft':
      className = 'plan-status-draft';
      break;
    case 'pending approval':
      className = 'plan-status-pending';
      break;
    case 'approved':
      className = 'plan-status-approved';
      break;
    case 'running':
      className = 'plan-status-running';
      break;
    case 'completed':
      className = 'plan-status-completed';
      break;
  }
  
  return (
    <Badge variant="outline" className={className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const MediaPlanDetail: React.FC<MediaPlanDetailProps> = ({ plan, onBack }) => {
  const { toast } = useToast();
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<PlanStatus>(plan.status);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  
  const handleStatusChange = () => {
    setIsEditingStatus(false);
    
    // In a real app, this would be an API call
    toast({
      title: "Status updated",
      description: `Media plan status updated to ${currentStatus}.`,
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Media Plans
        </Button>
      </div>
      
      <Card className="shadow-md">
        <CardHeader className="pb-4 border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-agency-950">{plan.clientName}</CardTitle>
              <CardDescription className="text-gray-500">
                Created on {format(new Date(plan.createdAt), 'MMMM d, yyyy')}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditingStatus ? (
                <>
                  <StatusBadge status={plan.status} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsEditingStatus(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Select value={currentStatus} onValueChange={(value) => setCurrentStatus(value as PlanStatus)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending approval">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-600"
                    onClick={handleStatusChange}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600"
                    onClick={() => {
                      setCurrentStatus(plan.status);
                      setIsEditingStatus(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 pb-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Campaign Details</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Product Type</dt>
                    <dd>
                      {plan.productType 
                        ? plan.productType.charAt(0).toUpperCase() + plan.productType.slice(1)
                        : 'Not specified'
                      }
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Industry</dt>
                    <dd>
                      {plan.industry 
                        ? plan.industry.charAt(0).toUpperCase() + plan.industry.slice(1)
                        : 'Not specified'
                      }
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Market</dt>
                    <dd>Germany</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">KPI Goals</dt>
                    <dd className="text-right">
                      {plan.kpiGoals && plan.kpiGoals.length > 0
                        ? plan.kpiGoals.map(goal => 
                            goal.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                          ).join(', ')
                        : 'Not specified'
                      }
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Timeline</dt>
                    <dd className="text-right">
                      {plan.dateRange
                        ? `${format(new Date(plan.dateRange.start), 'MMM d, yyyy')} - ${format(new Date(plan.dateRange.end), 'MMM d, yyyy')}`
                        : 'Not specified'
                      }
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Budget</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Total Budget</dt>
                    <dd className="font-bold">{formatCurrency(plan.budget?.total)}</dd>
                  </div>
                  <div>
                    {plan.budget?.allocations ? (
                      plan.budget.allocations.map((allocation, index) => (
                        <div key={index} className="flex justify-between">
                          <dt className="text-sm text-gray-500">
                            {allocation.channel.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </dt>
                          <dd>
                            {formatCurrency(allocation.amount)} ({allocation.percentage}%)
                          </dd>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm">No budget allocation details available</div>
                    )}
                  </div>
                </dl>
              </div>
              
              {plan.description && (
                <div>
                  <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Additional Notes</h3>
                  <p className="text-sm text-gray-700">{plan.description}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Channels</h3>
                <div className="flex flex-wrap gap-2">
                  {plan.channels && plan.channels.length > 0 ? (
                    plan.channels.map(channel => (
                      <Badge key={channel} variant="secondary" className="bg-agency-100 text-agency-700">
                        {channel.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">No channels specified</div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Geographic Targeting</h3>
                <div className="text-sm">
                  <p className="mb-2">Selected Regions:</p>
                  <div className="flex flex-wrap gap-2">
                    {plan.regions && plan.regions.length > 0 ? (
                      plan.regions.map(region => (
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
              
              {plan.demographics && (
                <div>
                  <h3 className="text-lg font-medium mb-2 text-agency-950 border-b pb-1">Demographic Targeting</h3>
                  <dl className="space-y-3">
                    {plan.demographics.ageRanges && plan.demographics.ageRanges.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 mb-1">Age Ranges</dt>
                        <dd className="flex flex-wrap gap-1">
                          {plan.demographics.ageRanges.map(age => (
                            <span key={age} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                              {age}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                    
                    {plan.demographics.genders && plan.demographics.genders.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 mb-1">Gender</dt>
                        <dd className="flex flex-wrap gap-1">
                          {plan.demographics.genders.map(gender => (
                            <span key={gender} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                              {gender === 'all' ? 'All Genders' : gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                    
                    {plan.demographics.income && plan.demographics.income.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 mb-1">Income Level</dt>
                        <dd className="flex flex-wrap gap-1">
                          {plan.demographics.income.map(income => (
                            <span key={income} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                              {income.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                    
                    {plan.demographics.interests && plan.demographics.interests.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 mb-1">Interests</dt>
                        <dd className="flex flex-wrap gap-1">
                          {plan.demographics.interests.map(interest => (
                            <span key={interest} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                              {interest.charAt(0).toUpperCase() + interest.slice(1)}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-4 pb-4 border-t">
          <Button
            variant="outline"
            onClick={onBack}
          >
            Back to Media Plans
          </Button>
          
          <Dialog open={showMoreInfo} onOpenChange={setShowMoreInfo}>
            <Button
              variant="outline"
              className="border-agency-200 text-agency-700 hover:bg-agency-50"
              onClick={() => setShowMoreInfo(true)}
            >
              Campaign Insights
            </Button>
            
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Campaign Insights</DialogTitle>
                <DialogDescription>
                  This feature is coming soon in a future update.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-gray-500">
                  Campaign analytics and performance metrics will be available here.
                </p>
              </div>
              <DialogFooter>
                <Button onClick={() => setShowMoreInfo(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MediaPlanDetail;
