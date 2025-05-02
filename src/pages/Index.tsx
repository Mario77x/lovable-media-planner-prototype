
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Edit, Bot } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <div className="max-w-5xl w-full text-center pt-10 pb-16">
          <h1 className="text-4xl font-bold text-agency-950 mb-3">Media Planning Nexus</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            An enterprise-grade media planning platform for managing high-value advertising campaigns
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Card className="w-full sm:w-80 transition-shadow hover:shadow-md animate-fadeIn opacity-0" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-3">
                <FolderOpen className="h-10 w-10 text-agency-700 mb-2" />
                <CardTitle className="text-xl">View Plans</CardTitle>
                <CardDescription>Browse and manage your existing media plans</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-500 pb-4">
                Access your saved drafts, active campaigns, and completed plans. Monitor status and make updates as needed.
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-agency-700 hover:bg-agency-800">
                  <Link to="/view">View Media Plans</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="w-full sm:w-80 transition-shadow hover:shadow-md animate-fadeIn opacity-0" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-3">
                <Edit className="h-10 w-10 text-agency-700 mb-2" />
                <CardTitle className="text-xl">Create Manually</CardTitle>
                <CardDescription>Build a new media plan step by step</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-500 pb-4">
                Define your media plan details including target audience, channels, budget allocation, and campaign timeline.
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-agency-700 hover:bg-agency-800">
                  <Link to="/create-manual">Create New Plan</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="w-full sm:w-80 transition-shadow hover:shadow-md animate-fadeIn opacity-0" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="pb-3">
                <Bot className="h-10 w-10 text-agency-700 mb-2" />
                <CardTitle className="text-xl">Create with AI</CardTitle>
                <CardDescription>Let our AI assistant build your plan</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-500 pb-4">
                Describe your campaign goals in natural language and our AI will recommend an optimized media strategy.
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-agency-700 hover:bg-agency-800">
                  <Link to="/create-ai">AI Assistant</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="w-full max-w-5xl py-12 px-4 bg-agency-50 rounded-lg animate-slideUp opacity-0" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-2xl font-bold text-agency-900 mb-6 text-center">Enterprise Media Planning Simplified</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-agency-100 text-agency-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Define Your Strategy</h3>
              <p className="text-sm text-gray-600">
                Set campaign objectives, target audience, and KPIs to align with your business goals.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-agency-100 text-agency-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Optimize Channel Mix</h3>
              <p className="text-sm text-gray-600">
                Select and allocate budget across multiple channels for maximum campaign effectiveness.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-agency-100 text-agency-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Execute & Track</h3>
              <p className="text-sm text-gray-600">
                Launch campaigns and monitor their status throughout the entire campaign lifecycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
