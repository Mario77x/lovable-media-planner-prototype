
import { toast } from "@/hooks/use-toast";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right" 
      richColors 
      closeButton 
      toastOptions={{ 
        duration: 4000,
      }}
    />
  );
}
