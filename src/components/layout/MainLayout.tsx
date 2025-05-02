
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ChevronLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showBackButton = false,
  title = 'Media Planning Nexus'
}) => {
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
            )}
            
            <Link to="/" className="flex items-center space-x-2">
              <LayoutDashboard className="h-6 w-6 text-agency-800" />
              <span className="text-xl font-semibold text-agency-950">Media Planner</span>
            </Link>
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
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {title && !isHomePage && (
            <h1 className="text-3xl font-bold text-agency-950 mb-6">{title}</h1>
          )}
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
