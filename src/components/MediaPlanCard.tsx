import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MediaPlan, PlanStatus } from '@/types';
import { format } from 'date-fns';
import { ChevronRight, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface MediaPlanCardProps {
  plan: MediaPlan;
  onClick: () => void;
  onDelete?: (id: string) => void;
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

const MediaPlanCard: React.FC<MediaPlanCardProps> = ({ plan, onClick, onDelete }) => {
  const createdDate = new Date(plan.createdAt);
  const formattedDate = format(createdDate, 'MMM d, yyyy');
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    setShowDeleteDialog(true);
  };
  
  const confirmDelete = () => {
    if (onDelete) {
      onDelete(plan.id);
    }
    setShowDeleteDialog(false);
  };
  
  return (
    <>
      <Card className="h-full transition-all hover:shadow-md cursor-pointer relative" onClick={onClick}>
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
        <CardFooter className="pt-0 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-red-600 p-2 h-8 absolute bottom-2 right-2"
            onClick={handleDeleteClick}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the media plan "{plan.clientName}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MediaPlanCard;
