"use client"
import EmailCheckModal from '@/app/_components/Modal';
import Modal from '@/app/_components/Modal';
import { useRouter } from 'next/navigation';

const CheckEmailModal = () => {
  const router = useRouter();
  const handleClose = () => {
  
    router.back();
  };

  return (
    // <Modal
    //   title="Check Your Email"
    //   description="We've sent you a magic link. Please check your email to sign in."
    //   onClose={handleClose}
    // />
    <EmailCheckModal />
  );
};

export default CheckEmailModal;
