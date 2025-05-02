
export type PlanStatus = 'draft' | 'pending approval' | 'approved' | 'running' | 'completed';

export type ProductType = 'product' | 'service';

export type Industry = 'automotive' | 'fashion' | 'food & beverage' | 'technology' | 'healthcare' | 'finance' | 'entertainment' | 'travel';

export type KPIGoal = 'sales' | 'brand awareness' | 'lead generation' | 'customer retention' | 'website traffic' | 'app downloads' | 'social media engagement';

export type Channel = 
  'traditional tv' | 
  'digital tv' | 
  'streaming' | 
  'print' | 
  'social media' | 
  'digital banners' | 
  'digital interactive' | 
  'radio' | 
  'podcasts' | 
  'outdoor' | 
  'dooh' |
  'email marketing';

export type Country = 'germany' | 'france' | 'spain' | 'italy' | 'united kingdom';

export type GermanRegion = 
  'baden-wurttemberg' | 
  'bavaria' | 
  'berlin' | 
  'brandenburg' | 
  'bremen' | 
  'hamburg' | 
  'hesse' | 
  'lower saxony' | 
  'mecklenburg-vorpommern' | 
  'north rhine-westphalia' | 
  'rhineland-palatinate' | 
  'saarland' | 
  'saxony' | 
  'saxony-anhalt' | 
  'schleswig-holstein' | 
  'thuringia';

export type Demographics = {
  ageRanges: string[];
  genders: string[];
  income: string[];
  interests: string[];
};

export type BudgetAllocation = {
  channel: Channel;
  amount: number;
  percentage: number;
};

export interface MediaPlan {
  id: string;
  clientName: string;
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
  productType?: ProductType;
  industry?: Industry;
  kpiGoals?: KPIGoal[];
  country?: Country;
  regions?: GermanRegion[];
  dateRange?: {
    start: string;
    end: string;
  };
  channels?: Channel[];
  demographics?: Demographics;
  budget?: {
    total: number;
    currency: string;
    allocations: BudgetAllocation[];
  };
  description?: string;
}

export interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  formData: Partial<MediaPlan>;
  setCurrentStep: (step: number) => void;
  updateFormData: <K extends keyof MediaPlan>(key: K, value: MediaPlan[K]) => void;
  resetForm: () => void;
}

export type ChatMessage = {
  id: string;
  content: string;
  role: 'user' | 'ai';
  timestamp: string;
};
