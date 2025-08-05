import { toast, Id, ToastContent } from "react-toastify";

const defaultOption = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  closeButton: false,
};

let lastToastId: Id | null = null;

const showOnce = (
  fn: (content: ToastContent, options?: any) => Id,
  msg: string,
  toastClassName: string
) => {
  if (lastToastId) toast.dismiss(lastToastId);
  lastToastId = fn(msg, {
    ...defaultOption,
    toastClassName,
    bodyClassName: "text-sm font-medium",
  });
};

export const showErrorToast = (msg: string) => showOnce(toast.error, msg, "toast-error");
export const showSuccessToast = (msg: string) => showOnce(toast.success, msg, "toast-secondary");
export const showInfoToast = (msg: string) => showOnce(toast.info, msg, "toast-secondary");
