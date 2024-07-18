import { TOAST_TYPES } from "@/constants/toastEnums";
import { ToastOptions, toast } from "react-toastify";

export const showToast = (type: string, message: string) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  switch (type) {
    case TOAST_TYPES.SUCCESS:
      toast.success(message, options);
      break;
    case TOAST_TYPES.INFO:
      toast.info(message, options);
      break;
    case TOAST_TYPES.WARN:
      toast.warn(message, options);
      break;
    case TOAST_TYPES.ERROR:
      toast.error(message, options);
      break;
    default:
      toast(message, options);
  }
};
