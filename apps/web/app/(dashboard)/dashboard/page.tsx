import Header from "@/components/layout/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { OnboardingDialog } from "@/components/modals/onboading-modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

// here fetch to see if the user has been onboarded or not
const page: FC = () => {
  // just send the data to the endpoint and finish that modal
  return (
    <>
      <div className="bg-white w-full ">
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

      <OnboardingDialog />
    </>
  );
};

export default page;
