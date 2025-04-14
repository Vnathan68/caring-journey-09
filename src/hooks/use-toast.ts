
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
};

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
  return { toast };
};
