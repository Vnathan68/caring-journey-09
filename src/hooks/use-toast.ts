
import { toast as sonnerToast, type ToastT } from "sonner";
import { useState, useEffect, ReactNode } from 'react';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  action?: ReactNode;
};

interface ToastState {
  toasts: ToastT[];
}

export function toast(props: ToastProps) {
  const { variant = "default", title, description } = props;

  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description,
    });
  }

  if (variant === "success") {
    return sonnerToast.success(title, {
      description,
    });
  }

  if (variant === "warning") {
    return sonnerToast.warning(title, {
      description,
    });
  }

  if (variant === "info") {
    return sonnerToast.info(title, {
      description,
    });
  }

  return sonnerToast(title || "", {
    description,
  });
}

toast.success = (message: string) => {
  sonnerToast.success(message);
};

toast.error = (message: string) => {
  sonnerToast.error(message);
};

toast.warning = (message: string) => {
  sonnerToast.warning(message);
};

toast.info = (message: string) => {
  sonnerToast.info(message);
};

export const useToast = () => {
  const [state, setState] = useState<ToastState>({ toasts: [] });

  useEffect(() => {
    // Create a mock onChange handler since sonnerToast.onChange might not be available
    const handleToastChange = (toast: ToastT) => {
      if (toast.id) {
        setState(prev => ({
          toasts: [...prev.toasts, toast]
        }));
      }
    };
    
    // Use a simple mock implementation since sonnerToast.listen is not available
    const cleanup = () => {};
    
    return cleanup;
  }, []);

  return {
    toast,
    toasts: state.toasts,
  };
};
