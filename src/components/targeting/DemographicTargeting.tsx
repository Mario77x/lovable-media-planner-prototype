
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { demographicOptions } from '@/data/mockData';
import { Demographics } from '@/types';

interface DemographicTargetingProps {
  currentDemographics: Demographics;
  toggleDemographic: (category: keyof Demographics, value: string) => void;
}

const DemographicTargeting: React.FC<DemographicTargetingProps> = ({
  currentDemographics,
  toggleDemographic
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Age Range</h3>
          <div className="space-y-2">
            {demographicOptions.ageRanges.map(age => (
              <div key={age} className="flex items-center space-x-2">
                <Checkbox 
                  id={`age-${age}`} 
                  checked={currentDemographics.ageRanges.includes(age)}
                  onCheckedChange={() => toggleDemographic('ageRanges', age)}
                />
                <Label htmlFor={`age-${age}`}>{age}</Label>
              </div>
            ))}
          </div>
          
          <h3 className="font-medium text-lg mt-4">Gender</h3>
          <div className="space-y-2">
            {demographicOptions.genders.map(gender => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox 
                  id={`gender-${gender}`} 
                  checked={currentDemographics.genders.includes(gender)}
                  onCheckedChange={() => toggleDemographic('genders', gender)}
                />
                <Label htmlFor={`gender-${gender}`}>
                  {gender === 'all' ? 'All Genders' : gender.charAt(0).toUpperCase() + gender.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Income Level</h3>
          <div className="space-y-2">
            {demographicOptions.income.map(income => (
              <div key={income} className="flex items-center space-x-2">
                <Checkbox 
                  id={`income-${income}`} 
                  checked={currentDemographics.income.includes(income)}
                  onCheckedChange={() => toggleDemographic('income', income)}
                />
                <Label htmlFor={`income-${income}`}>
                  {income.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Label>
              </div>
            ))}
          </div>
          
          <h3 className="font-medium text-lg mt-4">Interests</h3>
          <div className="grid grid-cols-2 gap-2">
            {demographicOptions.interests.map(interest => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox 
                  id={`interest-${interest}`} 
                  checked={currentDemographics.interests.includes(interest)}
                  onCheckedChange={() => toggleDemographic('interests', interest)}
                />
                <Label htmlFor={`interest-${interest}`}>
                  {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemographicTargeting;
