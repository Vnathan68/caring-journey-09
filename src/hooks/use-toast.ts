
import { toast as sonnerToast, type Toast } from "@/components/ui/sonner"

type ToastProps = Toast & {
  variant?: "default" | "destructive" | "success" | "warning" | "info"
};

export function toast(props: ToastProps) {
  const { variant = "default", ...rest } = props

  if (variant === "destructive") {
    return sonnerToast.error(rest.title, {
      ...rest,
    })
  }

  if (variant === "success") {
    return sonnerToast.success(rest.title, {
      ...rest,
    })
  }

  return sonnerToast(rest.title, {
    ...rest,
  })
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
