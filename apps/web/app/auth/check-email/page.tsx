"use client";
import EmailCheckModal from "@/app/_components/EmailCheckModel";
import { useRouter } from "next/navigation";

const CheckEmailModal = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return <EmailCheckModal />;
};

export default CheckEmailModal;
