import { MediaPlan, GermanRegion, Industry, KPIGoal, Channel, BudgetAllocation } from '@/types';

export const mockMediaPlans: MediaPlan[] = [
  {
    id: '1',
    clientName: 'Volkswagen AG',
    status: 'approved',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:20:00Z',
    productType: 'product',
    industry: 'automotive',
    kpiGoals: ['brand awareness', 'sales'],
    country: 'germany',
    regions: ['bavaria', 'berlin', 'hamburg', 'north rhine-westphalia'],
    dateRange: {
      start: '2025-05-01',
      end: '2025-07-31',
    },
    channels: ['traditional tv', 'digital tv', 'social media', 'outdoor'],
    demographics: {
      ageRanges: ['25-34', '35-44', '45-54'],
      genders: ['all'],
      income: ['middle', 'upper middle', 'high'],
      interests: ['automotive', 'technology', 'sports']
    },
    budget: {
      total: 2500000,
      currency: 'EUR',
      allocations: [
        { channel: 'traditional tv', amount: 1000000, percentage: 40 },
        { channel: 'digital tv', amount: 750000, percentage: 30 },
        { channel: 'social media', amount: 500000, percentage: 20 },
        { channel: 'outdoor', amount: 250000, percentage: 10 }
      ]
    },
    description: 'Summer campaign for the new electric vehicle lineup.'
  },
  {
    id: '2',
    clientName: 'Deutsche Bank',
    status: 'running',
    createdAt: '2025-02-20T09:15:00Z',
    updatedAt: '2025-03-10T11:45:00Z',
    productType: 'service',
    industry: 'finance',
    kpiGoals: ['lead generation', 'customer retention'],
    country: 'germany',
    regions: ['berlin', 'hamburg', 'hesse'],
    dateRange: {
      start: '2025-04-01',
      end: '2025-06-30',
    },
    channels: ['print', 'digital banners', 'email marketing'],
    demographics: {
      ageRanges: ['35-44', '45-54', '55-64'],
      genders: ['all'],
      income: ['upper middle', 'high'],
      interests: ['finance', 'business', 'real estate']
    },
    budget: {
      total: 1200000,
      currency: 'EUR',
      allocations: [
        { channel: 'print', amount: 360000, percentage: 30 },
        { channel: 'digital banners', amount: 480000, percentage: 40 },
        { channel: 'email marketing', amount: 360000, percentage: 30 }
      ]
    },
    description: 'Investment products campaign targeting high-net-worth individuals.'
  },
  {
    id: '3',
    clientName: 'Adidas',
    status: 'pending approval',
    createdAt: '2025-04-05T13:45:00Z',
    updatedAt: '2025-04-05T13:45:00Z',
    productType: 'product',
    industry: 'fashion',
    kpiGoals: ['brand awareness', 'social media engagement'],
    country: 'germany',
    regions: ['berlin', 'bavaria', 'north rhine-westphalia'],
    dateRange: {
      start: '2025-06-01',
      end: '2025-08-31',
    },
    channels: ['social media', 'digital interactive', 'outdoor', 'dooh'],
    demographics: {
      ageRanges: ['18-24', '25-34'],
      genders: ['all'],
      income: ['middle', 'upper middle'],
      interests: ['fashion', 'sports', 'fitness']
    },
    budget: {
      total: 1800000,
      currency: 'EUR',
      allocations: [
        { channel: 'social media', amount: 720000, percentage: 40 },
        { channel: 'digital interactive', amount: 540000, percentage: 30 },
        { channel: 'outdoor', amount: 270000, percentage: 15 },
        { channel: 'dooh', amount: 270000, percentage: 15 }
      ]
    },
    description: 'Summer sportswear collection launch with focus on Gen Z and Millennials.'
  },
  {
    id: '4',
    clientName: 'Allianz Insurance',
    status: 'draft',
    createdAt: '2025-04-10T15:20:00Z',
    updatedAt: '2025-04-10T15:20:00Z',
    productType: 'service',
    industry: 'finance',
    kpiGoals: ['lead generation'],
    country: 'germany',
    regions: ['baden-wurttemberg', 'bavaria', 'hesse', 'north rhine-westphalia'],
    dateRange: {
      start: '2025-06-15',
      end: '2025-09-15',
    },
    channels: ['traditional tv', 'digital tv', 'radio'],
    demographics: {
      ageRanges: ['25-34', '35-44', '45-54', '55-64'],
      genders: ['all'],
      income: ['middle', 'upper middle'],
      interests: ['finance', 'family', 'home ownership']
    },
    budget: {
      total: 1500000,
      currency: 'EUR',
      allocations: [
        { channel: 'traditional tv', amount: 750000, percentage: 50 },
        { channel: 'digital tv', amount: 450000, percentage: 30 },
        { channel: 'radio', amount: 300000, percentage: 20 }
      ]
    },
    description: 'Family insurance packages campaign.'
  },
  {
    id: '5',
    clientName: 'Lufthansa',
    status: 'completed',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2025-03-15T09:30:00Z',
    productType: 'service',
    industry: 'travel',
    kpiGoals: ['sales', 'website traffic'],
    country: 'germany',
    regions: ['berlin', 'hamburg', 'north rhine-westphalia', 'bavaria', 'hesse'],
    dateRange: {
      start: '2025-01-15',
      end: '2025-03-15',
    },
    channels: ['print', 'digital banners', 'social media', 'email marketing'],
    demographics: {
      ageRanges: ['25-34', '35-44', '45-54', '55-64'],
      genders: ['all'],
      income: ['upper middle', 'high'],
      interests: ['travel', 'luxury', 'business']
    },
    budget: {
      total: 2000000,
      currency: 'EUR',
      allocations: [
        { channel: 'print', amount: 400000, percentage: 20 },
        { channel: 'digital banners', amount: 600000, percentage: 30 },
        { channel: 'social media', amount: 600000, percentage: 30 },
        { channel: 'email marketing', amount: 400000, percentage: 20 }
      ]
    },
    description: 'Winter travel destinations promotional campaign.'
  },
  {
    id: '6',
    clientName: 'Siemens',
    status: 'draft',
    createdAt: '2025-04-12T11:20:00Z',
    updatedAt: '2025-04-12T11:20:00Z',
    productType: 'product',
    industry: 'technology',
    kpiGoals: ['brand awareness', 'lead generation'],
    country: 'germany',
    regions: ['bavaria', 'berlin', 'hesse'],
    dateRange: {
      start: '2025-07-01',
      end: '2025-10-31',
    }
  }
];

export const productTypes = ['product', 'service'];

export const industries = [
  'automotive', 
  'fashion', 
  'food & beverage', 
  'technology', 
  'healthcare', 
  'finance', 
  'entertainment',
  'travel'
];

export const kpiGoals = [
  'sales', 
  'brand awareness', 
  'lead generation', 
  'customer retention', 
  'website traffic', 
  'app downloads', 
  'social media engagement'
];

export const countries = [
  'germany', 
  'france', 
  'spain', 
  'italy', 
  'united kingdom'
];

export const germanRegions: { id: GermanRegion; name: string; population: number; }[] = [
  { id: 'baden-wurttemberg', name: 'Baden-Württemberg', population: 11100000 },
  { id: 'bavaria', name: 'Bavaria', population: 13124000 },
  { id: 'berlin', name: 'Berlin', population: 3669000 },
  { id: 'brandenburg', name: 'Brandenburg', population: 2531000 },
  { id: 'bremen', name: 'Bremen', population: 680000 },
  { id: 'hamburg', name: 'Hamburg', population: 1851000 },
  { id: 'hesse', name: 'Hesse', population: 6290000 },
  { id: 'lower saxony', name: 'Lower Saxony', population: 8000000 },
  { id: 'mecklenburg-vorpommern', name: 'Mecklenburg-Vorpommern', population: 1610000 },
  { id: 'north rhine-westphalia', name: 'North Rhine-Westphalia', population: 17930000 },
  { id: 'rhineland-palatinate', name: 'Rhineland-Palatinate', population: 4094000 },
  { id: 'saarland', name: 'Saarland', population: 983000 },
  { id: 'saxony', name: 'Saxony', population: 4056000 },
  { id: 'saxony-anhalt', name: 'Saxony-Anhalt', population: 2180000 },
  { id: 'schleswig-holstein', name: 'Schleswig-Holstein', population: 2910000 },
  { id: 'thuringia', name: 'Thuringia', population: 2120000 }
];

export const channels = [
  'traditional tv', 
  'digital tv', 
  'streaming', 
  'print', 
  'social media', 
  'digital banners', 
  'digital interactive', 
  'radio', 
  'podcasts', 
  'outdoor', 
  'dooh',
  'email marketing'
];

export const demographicOptions = {
  ageRanges: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  genders: ['all', 'male', 'female'],
  income: ['low', 'middle', 'upper middle', 'high'],
  interests: ['automotive', 'fashion', 'food', 'technology', 'healthcare', 'finance', 'entertainment', 'travel', 'sports', 'fitness', 'luxury', 'business', 'family', 'home ownership', 'real estate']
};

export const getRecommendedChannels = (industry: Industry, kpiGoals: KPIGoal[]): Channel[] => {
  // This is a simple recommendation logic that would be more sophisticated in a real application
  if (kpiGoals.includes('brand awareness')) {
    switch (industry) {
      case 'automotive':
        return ['traditional tv', 'digital tv', 'outdoor', 'dooh'] as Channel[];
      case 'fashion':
        return ['social media', 'digital interactive', 'print'] as Channel[];
      case 'technology':
        return ['digital banners', 'digital interactive', 'streaming'] as Channel[];
      default:
        return ['traditional tv', 'social media', 'outdoor'] as Channel[];
    }
  }
  
  if (kpiGoals.includes('sales')) {
    switch (industry) {
      case 'automotive':
        return ['traditional tv', 'digital tv', 'print'] as Channel[];
      case 'fashion':
        return ['social media', 'digital banners', 'email marketing'] as Channel[];
      case 'technology':
        return ['digital banners', 'email marketing', 'social media'] as Channel[];
      default:
        return ['digital banners', 'email marketing', 'social media'] as Channel[];
    }
  }
  
  if (kpiGoals.includes('lead generation')) {
    return ['digital banners', 'email marketing', 'social media', 'digital interactive'] as Channel[];
  }
  
  return channels.slice(0, 5) as Channel[]; // Return first 5 channels as default
};

export const getRecommendedRegions = (industry: Industry, kpiGoals: KPIGoal[]): GermanRegion[] => {
  if (kpiGoals.includes('brand awareness') || kpiGoals.includes('social media engagement')) {
    return ['berlin', 'hamburg', 'north rhine-westphalia', 'bavaria'];
  }
  
  if (kpiGoals.includes('sales')) {
    switch (industry) {
      case 'automotive':
        return ['baden-wurttemberg', 'bavaria', 'north rhine-westphalia'];
      case 'fashion':
        return ['berlin', 'hamburg', 'north rhine-westphalia'];
      case 'technology':
        return ['berlin', 'bavaria', 'hesse'];
      default:
        return ['north rhine-westphalia', 'bavaria', 'berlin'];
    }
  }
  
  return ['berlin', 'hamburg', 'north rhine-westphalia', 'bavaria', 'hesse'];
};

export const getChannelCost = (channel: Channel): number => {
  // These are simplified cost approximations per channel (in thousands of euros)
  switch (channel) {
    case 'traditional tv': return 250;
    case 'digital tv': return 150;
    case 'streaming': return 120;
    case 'print': return 100;
    case 'social media': return 80;
    case 'digital banners': return 60;
    case 'digital interactive': return 90;
    case 'radio': return 70;
    case 'podcasts': return 40;
    case 'outdoor': return 110;
    case 'dooh': return 130;
    case 'email marketing': return 30;
    default: return 50;
  }
};

export const calculateBudget = (selectedChannels: Channel[], durationMonths: number): BudgetAllocation[] => {
  const allocations: BudgetAllocation[] = [];
  const totalBaseCost = selectedChannels.reduce((sum, channel) => sum + getChannelCost(channel), 0);
  
  selectedChannels.forEach(channel => {
    const channelCost = getChannelCost(channel);
    const percentage = Math.round((channelCost / totalBaseCost) * 100);
    const amount = channelCost * 1000 * durationMonths; // Convert to euros and multiply by months
    
    allocations.push({
      channel,
      amount,
      percentage
    });
  });
  
  return allocations;
};

export const mockAIResponses = [
  "Based on your requirements, I recommend focusing on digital TV and social media for your tech product campaign. These channels have shown high engagement rates for your target demographics (25-34) in Germany, particularly in Berlin and Bavaria regions. For optimal results, allocate 40% of your budget to social media, 35% to digital TV, and 25% to digital interactive content.",
  "For your fashion brand awareness campaign, I suggest a multi-channel approach with emphasis on visual platforms. Social media should be your primary channel (45%), complemented by DOOH in urban centers (30%) and digital interactive experiences (25%). Target primarily Berlin, Hamburg, and North Rhine-Westphalia regions for maximum impact.",
  "Your automotive product launch would benefit from a premium-focused media mix. I recommend traditional TV (35%) for broad reach, complemented by outdoor advertising (25%), print in high-end publications (20%), and targeted digital campaigns (20%). Focus on Baden-Württemberg, Bavaria, and North Rhine-Westphalia regions where luxury vehicle adoption rates are highest.",
  "For your financial services campaign, my analysis suggests a more conservative, trust-building approach. Allocate budget to premium print media (30%), professional digital platforms (25%), traditional TV for credibility (25%), and targeted email marketing (20%). Focus on major economic centers: Frankfurt area, Munich, Hamburg, and Berlin.",
  "Your entertainment service launch should prioritize streaming platforms and social media to reach younger demographics. I recommend allocating 40% to streaming platform advertising, 35% to social media campaigns, 15% to digital interactive experiences, and 10% to podcasts. Focus primarily on urban centers in Berlin, Hamburg, and major university cities."
];
