import { isUserOnboarded } from "@/api/onboarding";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { OnboardingDialog } from "@/components/modals/onboading-modal";
import { cookies } from "next/headers";
import Link from "next/link";

const page = async () => {
  const [isOnboarded] = await Promise.all([
    isUserOnboarded(cookies().get("auth_session")?.value ?? null),
  ]);

  return (
    <div className=" w-full flex flex-col items-center">
      <MaxWidthWrapper>
        <div className="w-full h-[400px] grid grid-cols-3 ">
          <div className="flex flex-col justify-center p-4 gap-y-4 col-span-2">
            <h2 className="text-4xl font-bold text-start">
              Want to contribute to projects <br /> but lack the necessary
              skills?
            </h2>
            <Link
              href="/auth"
              className="px-4 py-4 rounded-md font-bold text-lg bg-primary text-white border-2 border-black  w-fit transition-all shadow-[4px_4px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              Explore different project
            </Link>
          </div>

          <div className="w-full h-[400px] relative col-span-1" />
        </div>
      </MaxWidthWrapper>
      <OnboardingDialog initialValue={!false} />
    </div>
  );
};

export default page;
