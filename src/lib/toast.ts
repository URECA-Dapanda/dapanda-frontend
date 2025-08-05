import { toast, Id, ToastContent, ToastOptions, ToastPosition } from "react-toastify";

interface DefaultOptionType {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: true;
  closeOnClick: true;
  pauseOnHover: false;
  draggable: false;
  closeButton: false;
}

const defaultOption: DefaultOptionType = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  closeButton: false,
};

interface OptionType extends ToastOptions {
  toastClassName: string;
  bodyClassName: string;
}

let lastToastId: Id | null = null;
toast.error("hellp", { containerId: "a" });

const showOnce = (
  fn: (content: ToastContent, options?: ToastOptions) => Id,
  msg: string,
  toastClassName: string
) => {
  if (lastToastId) toast.dismiss(lastToastId);
  const customOption: OptionType = {
    ...defaultOption,
    toastClassName: toastClassName,
    bodyClassName: "text-sm font-medium",
  };
  lastToastId = fn(msg, customOption);
};

export const showErrorToast = (msg: string) => showOnce(toast.error, msg, "toast-error");
export const showSuccessToast = (msg: string) => showOnce(toast.success, msg, "toast-secondary");
export const showInfoToast = (msg: string) => showOnce(toast.info, msg, "toast-secondary");
