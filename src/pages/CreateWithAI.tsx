
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ChatInterface from '@/components/ChatInterface';
import { WizardProvider } from '@/contexts/WizardContext';

const CreateWithAI: React.FC = () => {
  return (
    <MainLayout showBackButton>
      <Card className="max-w-4xl mx-auto shadow-md mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-agency-950">
            Media Planning Assistant
          </CardTitle>
          <CardDescription>
            Describe your campaign needs in natural language, and our AI will help you create an optimized media plan
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <WizardProvider>
            <ChatInterface />
          </WizardProvider>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default CreateWithAI;
