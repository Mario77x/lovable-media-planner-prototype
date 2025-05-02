
import React from 'react';
import { Map, Users } from 'lucide-react';

interface TargetingTabHeaderProps {
  activeTab: "geographic" | "demographic";
  setActiveTab: (tab: "geographic" | "demographic") => void;
}

const TargetingTabHeader: React.FC<TargetingTabHeaderProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <div className="inline-flex rounded-md bg-muted p-1">
      <button
        onClick={() => setActiveTab("geographic")}
        className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
          activeTab === "geographic" 
            ? "bg-background shadow text-foreground" 
            : "text-muted-foreground hover:bg-muted-foreground/10"
        }`}
      >
        <Map className="h-4 w-4 mr-1" />
        Geographic
      </button>
      <button
        onClick={() => setActiveTab("demographic")}
        className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
          activeTab === "demographic" 
            ? "bg-background shadow text-foreground" 
            : "text-muted-foreground hover:bg-muted-foreground/10"
        }`}
      >
        <Users className="h-4 w-4 mr-1" />
        Demographic
      </button>
    </div>
  );
};

export default TargetingTabHeader;
