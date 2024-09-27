import toast from "react-hot-toast";

export const displaySuccessToast = (
	message = "Your operation was successful.",
): void => {
	toast.dismiss();
	toast.success(message);
};

export const displayErrorToast = (message = "Something went wrong."): void => {
	toast.dismiss();
	toast.error(message);
};
