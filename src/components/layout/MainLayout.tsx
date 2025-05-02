
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ChevronRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

interface MainLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  mediaPlanName?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showBackButton = false,
  title = 'Media Planning Nexus',
  mediaPlanName
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  // Define breadcrumb paths based on current location
  const getBreadcrumbs = () => {
    const path = location.pathname;
    
    // Always start with Home
    const crumbs = [
      { label: 'Media Planning Nexus', path: '/', isActive: isHomePage }
    ];
    
    // Add Media Plans link in these cases
    if (path.includes('/view') || mediaPlanName) {
      // Media Plans should always be clickable and point to /view
      crumbs.push({ label: 'Media Plans', path: '/view', isActive: path === '/view' && !mediaPlanName });
    }
    
    if (path.includes('/create-manual')) {
      crumbs.push({ label: 'Create Media Plan', path: '/create-manual', isActive: true });
    }
    
    if (path.includes('/create-ai')) {
      crumbs.push({ label: 'AI Assistant', path: '/create-ai', isActive: true });
    }
    
    // Add media plan name to breadcrumb if provided
    if (mediaPlanName) {
      crumbs.push({ label: mediaPlanName, path: '#', isActive: true });
    }
    
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  // Direct navigation handler using navigate function
  const handleNavigate = (path: string, isActive: boolean) => {
    if (!isActive && path !== '#') {
      navigate(path);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <header className="bg-white border-b border-gray-200 shadow-sm h-[61px] flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="flex items-center">
            <Breadcrumb>
              <BreadcrumbList className="items-center">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {crumb.isActive ? (
                        <BreadcrumbPage className="font-semibold flex items-center">
                          {index === 0 && <LayoutDashboard className="h-5 w-5 mr-1.5 text-agency-800" />}
                          {crumb.label}
                        </BreadcrumbPage>
                      ) : (
                        <button 
                          onClick={() => handleNavigate(crumb.path, crumb.isActive)}
                          className="flex items-center transition-colors hover:text-foreground"
                        >
                          {index === 0 && <LayoutDashboard className="h-5 w-5 mr-1.5 text-agency-800" />}
                          {crumb.label}
                        </button>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {!isHomePage && (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto px-4 pt-4 pb-6">
          {children}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Media Planning Nexus - Enterprise Edition
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
