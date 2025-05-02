
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaPlan, PlanStatus } from '@/types';
import { mockMediaPlans } from '@/data/mockData';
import MediaPlanCard from '@/components/MediaPlanCard';
import MediaPlanDetail from '@/components/MediaPlanDetail';
import { Search, Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const ViewMediaPlans: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PlanStatus | 'all'>('all');
  const [selectedPlan, setSelectedPlan] = useState<MediaPlan | null>(null);
  const [mediaPlans, setMediaPlans] = useState<MediaPlan[]>([]);
  
  // Load plans from localStorage on component mount
  useEffect(() => {
    try {
      const storedPlansJson = localStorage.getItem('mediaPlans');
      if (storedPlansJson) {
        setMediaPlans(JSON.parse(storedPlansJson));
      } else {
        // No stored plans yet, use mock data
        setMediaPlans(mockMediaPlans);
        // Initialize localStorage with mock data
        localStorage.setItem('mediaPlans', JSON.stringify(mockMediaPlans));
      }
    } catch (error) {
      console.error("Error loading media plans:", error);
      setMediaPlans(mockMediaPlans);
    }
  }, []);
  
  const filteredPlans = mediaPlans.filter(plan => {
    const matchesSearch = plan.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const handleSelectPlan = (plan: MediaPlan) => {
    setSelectedPlan(plan);
  };
  
  const handleBackToList = () => {
    setSelectedPlan(null);
  };
  
  const handleDeletePlan = (id: string) => {
    const updatedPlans = mediaPlans.filter(plan => plan.id !== id);
    setMediaPlans(updatedPlans);
    
    // Update localStorage
    localStorage.setItem('mediaPlans', JSON.stringify(updatedPlans));
    
    // Show success toast
    toast({
      title: "Media plan deleted",
      description: "The media plan has been permanently removed.",
    });
  };
  
  if (selectedPlan) {
    return (
      <MainLayout showBackButton mediaPlanName={selectedPlan.clientName}>
        <MediaPlanDetail plan={selectedPlan} onBack={handleBackToList} />
      </MainLayout>
    );
  }
  
  return (
    <MainLayout showBackButton>
      <div className="pt-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by client name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PlanStatus | 'all')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending approval">Pending Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button asChild className="bg-agency-700 hover:bg-agency-800">
            <Link to="/create-manual" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              New Plan
            </Link>
          </Button>
        </div>
      </div>
      
      {filteredPlans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <MediaPlanCard 
              key={plan.id} 
              plan={plan} 
              onClick={() => handleSelectPlan(plan)}
              onDelete={handleDeletePlan}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No media plans found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first media plan'}
          </p>
          <Button asChild className="bg-agency-700 hover:bg-agency-800">
            <Link to="/create-manual">Create New Plan</Link>
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default ViewMediaPlans;
