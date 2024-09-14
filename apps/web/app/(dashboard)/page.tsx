import { OnboardingDialog } from "@/components/modals/onboading-modal";
import type { FC } from "react";

const page: FC = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold ">this is the dashboard</h1>
      </div>

      <OnboardingDialog />
    </>
  );
};

export default page;
