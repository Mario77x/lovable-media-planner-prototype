
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ViewMediaPlans from "./pages/ViewMediaPlans";
import CreateManual from "./pages/CreateManual";
import CreateWithAI from "./pages/CreateWithAI";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/view" element={<ViewMediaPlans />} />
        <Route path="/create-manual" element={<CreateManual />} />
        <Route path="/create-manual/:step" element={<CreateManual />} />
        <Route path="/create-ai" element={<CreateWithAI />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster 
        position="top-right" 
        richColors 
        closeButton 
        toastOptions={{ 
          duration: 4000,
        }}
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
