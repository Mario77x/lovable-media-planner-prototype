
import { toast as sonnerToast } from "sonner";
import { ReactNode } from "react";

type ToastProps = {
  title?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "destructive";
};

// Create a wrapper for sonner toast that accepts our custom props format
const customToast = ({ title, description, variant, ...props }: ToastProps) => {
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description,
      ...props
    });
  }
  
  return sonnerToast(title as string, {
    description,
    ...props
  });
};

// Export both the original sonner toast and our custom wrapper
export const toast = customToast;

export function useToast() {
  return {
    toast: customToast,
  };
}
