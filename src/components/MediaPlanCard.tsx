
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MediaPlan, PlanStatus } from '@/types';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';

interface MediaPlanCardProps {
  plan: MediaPlan;
  onClick: () => void;
}

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

const MediaPlanCard: React.FC<MediaPlanCardProps> = ({ plan, onClick }) => {
  const createdDate = new Date(plan.createdAt);
  const formattedDate = format(createdDate, 'MMM d, yyyy');
  
  return (
    <Card className="h-full transition-all hover:shadow-md cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-agency-950 line-clamp-1">{plan.clientName}</h3>
          <StatusBadge status={plan.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-sm text-gray-500 mb-2">
          Created: {formattedDate}
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {plan.industry && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              {plan.industry.charAt(0).toUpperCase() + plan.industry.slice(1)}
            </Badge>
          )}
          {plan.kpiGoals && plan.kpiGoals.slice(0, 2).map((goal) => (
            <Badge key={goal} variant="secondary" className="bg-agency-100 text-agency-700 hover:bg-agency-200">
              {goal.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
          ))}
          {(plan.kpiGoals && plan.kpiGoals.length > 2) && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              +{plan.kpiGoals.length - 2} more
            </Badge>
          )}
        </div>
        <div className="text-sm">
          {plan.dateRange ? (
            <p className="text-gray-600">
              {format(new Date(plan.dateRange.start), 'MMM d, yyyy')} - {format(new Date(plan.dateRange.end), 'MMM d, yyyy')}
            </p>
          ) : (
            <p className="text-gray-400 italic">No date range set</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" className="w-full justify-between text-agency-700 hover:text-agency-800" size="sm">
          View Details 
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MediaPlanCard;
