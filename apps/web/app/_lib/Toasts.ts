import toast from "react-hot-toast";

export const displaySuccessToast = (
  message: string = "Your operation was successful."
): void => {
  toast.dismiss();
  toast.success(message);
};

export const displayErrorToast = (
  message: string = "Something went wrong."
): void => {
  toast.dismiss();
  toast.error(message);
};
