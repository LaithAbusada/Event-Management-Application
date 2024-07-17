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
    case "success":
      toast.success(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    default:
      toast(message, options);
  }
};
