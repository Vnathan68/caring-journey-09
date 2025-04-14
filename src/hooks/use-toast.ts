
import { toast as sonnerToast, type ToastT } from "sonner";
import { useState, useEffect } from 'react';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
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
    // This is just to satisfy the type requirements
    // Real toast functionality is handled by sonner directly
    const unsubscribe = sonnerToast.onChange((toast) => {
      if (toast.id) {
        setState(prev => ({
          toasts: [...prev.toasts, toast as ToastT]
        }));
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    toast,
    toasts: state.toasts,
  };
};
