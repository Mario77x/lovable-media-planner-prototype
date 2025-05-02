
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Bot } from 'lucide-react';
import { ChatMessage } from '@/types';
import { mockAIResponses } from '@/data/mockData';
import { useWizard } from '@/contexts/WizardContext';

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetForm } = useWizard();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hello! I'm your Media Planning Assistant. Tell me about the campaign you'd like to create. You can describe the product or service, goals, target audience, and any preferences for channels or timing.",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      // Pick a random response from our mock responses
      const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
      
      const aiResponse: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'ai',
        content: randomResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // If we have at least 2 user messages, after a delay, show a button to proceed to the plan
      if (messages.filter(m => m.role === 'user').length >= 1) {
        setTimeout(() => {
          const finalMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'ai',
            content: "I've created a draft media plan based on our conversation. Would you like to review it now?",
            timestamp: new Date().toISOString()
          };
          
          setMessages(prev => [...prev, finalMessage]);
          
          // Add UI option to view the plan
          setTimeout(() => {
            const actionMessage: ChatMessage = {
              id: crypto.randomUUID(),
              role: 'ai',
              content: "**ACTION REQUIRED**: [View Media Plan]",
              timestamp: new Date().toISOString()
            };
            
            setMessages(prev => [...prev, actionMessage]);
          }, 1500);
        }, 5000);
      }
    }, 2000);
  };
  
  const handleViewPlan = () => {
    toast({
      title: "Media plan created",
      description: "Your AI-generated media plan is ready to review.",
    });
    
    // Reset the form and navigate to the plan summary
    resetForm();
    navigate('/create-manual/summary');
  };
  
  const renderMessage = (message: ChatMessage) => {
    // Check if this is an action message
    if (message.role === 'ai' && message.content.includes('**ACTION REQUIRED**')) {
      const actionContent = message.content.split('**ACTION REQUIRED**: ')[1];
      if (actionContent.includes('[View Media Plan]')) {
        return (
          <div key={message.id} className="flex justify-center my-4">
            <Button
              onClick={handleViewPlan}
              className="bg-agency-700 hover:bg-agency-800"
            >
              View Media Plan
            </Button>
          </div>
        );
      }
    }
    
    return (
      <div
        key={message.id}
        className={`chat-message ${message.role === 'user' ? 'user' : 'ai'}`}
      >
        {message.role === 'ai' && (
          <div className="flex items-center mb-1 text-agency-800">
            <Bot className="h-5 w-5 mr-1" />
            <span className="font-medium">AI Assistant</span>
          </div>
        )}
        <div className="text-gray-800">{message.content}</div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-250px)] max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-4">
          {messages.map(renderMessage)}
          {isTyping && (
            <div className="chat-message ai">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-agency-500 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-agency-500 rounded-full animate-pulse delay-150"></div>
                <div className="h-2 w-2 bg-agency-500 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your campaign needs..."
              className="min-h-[80px] resize-none"
            />
          </div>
          <Button 
            type="submit" 
            className="bg-agency-700 hover:bg-agency-800"
            disabled={isTyping || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
