
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Edit, Bot } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <div className="w-full">
        <div className="max-w-5xl mx-auto text-center pt-6 pb-12">
          <h1 className="text-4xl font-bold text-agency-950 mb-3">Media Planning Nexus</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            An enterprise-grade media planning platform for managing high-value advertising campaigns
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="w-full transition-shadow hover:shadow-md animate-fadeIn opacity-0 flex flex-col" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-3">
                <FolderOpen className="h-10 w-10 text-[#2B539A] mb-2" />
                <CardTitle className="text-xl">View Plans</CardTitle>
                <CardDescription>Browse and manage your existing media plans</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-500 pb-4 flex-grow">
                Access your saved drafts, active campaigns, and completed plans. Monitor status and make updates as needed.
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link to="/view">View Media Plans</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="w-full transition-shadow hover:shadow-md animate-fadeIn opacity-0 flex flex-col" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-3">
                <Edit className="h-10 w-10 text-[#2B539A] mb-2" />
                <CardTitle className="text-xl">Create Manually</CardTitle>
                <CardDescription>Build a new media plan step by step</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-500 pb-4 flex-grow">
                Define your media plan details including target audience, channels, budget allocation, and campaign timeline.
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link to="/create-manual">Create New Plan</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="w-full transition-shadow hover:shadow-md animate-fadeIn opacity-0 flex flex-col" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="pb-3">
                <Bot className="h-10 w-10 text-[#2B539A] mb-2" />
                <CardTitle className="text-xl">Create with AI</CardTitle>
                <CardDescription>Let our AI assistant build your plan</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-500 pb-4 flex-grow">
                Describe your campaign goals in natural language and our AI will recommend an optimized media strategy.
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link to="/create-ai">AI Assistant</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
