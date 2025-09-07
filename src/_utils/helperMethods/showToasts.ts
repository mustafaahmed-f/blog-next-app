import { toast } from "sonner";

const defaultSuccessStyle = {
  backgroundColor: "#dcfce7", // green-100
  color: "#166534", // green-800
  border: "1px solid #86efac", // green-300
};

const defaultErrorStyle = {
  backgroundColor: "#fee2e2", // red-100
  color: "#991b1b", // red-800
  border: "1px solid #fca5a5", // red-300
};

export const showSuccessToast = (
  message: string,
  options?: { icon?: string },
) => {
  toast.success(message, {
    icon: options?.icon ?? "✅",
    style: defaultSuccessStyle,
  });
};

export const showErrorToast = (
  message: string,
  options?: { icon?: string },
) => {
  toast.error(message, {
    icon: options?.icon ?? "❌",
    style: defaultErrorStyle,
  });
};

export const showWarningToast = (
  message: string,
  options?: { icon?: string },
) => {
  toast(message, {
    icon: options?.icon ?? "⚠️",
    style: {
      backgroundColor: "#fff3cd", // yellow-100
      color: "#664d03", // yellow-800
      border: "1px solid #fde68a", // yellow-300
    },
  });
};
