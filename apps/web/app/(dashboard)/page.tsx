import { isUserOnboarded } from "@/api/onboarding";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { OnboardingDialog } from "@/components/modals/onboading-modal";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { cookies } from "next/headers";

const page: FC = async () => {
  const onboardedOrNot = await isUserOnboarded({
    authSession: cookies().get("auth_session")?.value ?? null,
  });

  console.log("this is the cookie", cookies().get("auth_session")?.value);
  console.log("this is to see if the value is onboarded ", onboardedOrNot);

  return (
    <>
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

            <div className="w-full h-[400px] relative col-span-1">
              <Image
                alt="ballon images"
                src={"/gifts.svg"}
                fill
                loading="eager"
                className="object-contain"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className="w-full min-h-screen h-fit flex flex-col items-center justify-start"></div>
      </MaxWidthWrapper>

      <OnboardingDialog initialValue={!onboardedOrNot} />
    </>
  );
};

export default page;
