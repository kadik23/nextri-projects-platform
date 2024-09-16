import { SignInForm } from "@/components/forms/auth/signin-form";
import Image from "next/image";

const page = () => {
  return (
    <div className="w-full h-[100vh]  grid grid-cols-2">
      <div className="w-full  h-full flex flex-col gap-y-4 items-center justify-center  max-w-xl mx-auto ">
        <h2 className="text-4xl font-bold ">
          Build and Collaborate on NEXTRI PROJECTS
        </h2>
        <SignInForm />
      </div>
      <div className="w-[90%] h-[90%] mt-auto bg-primary rounded-t-2xl  p-8 pb-0 flex flex-col justify-between ">
        <div className="w-full h-fit flex flex-col gap-y-8">
          <h1 className="text-4xl font-bold text-white ">
            Your Complete Learning Hub
          </h1>
          <p className="text-gray-100 text-xl text-start ">
            Navigate through an interconnected suite of learning experiences,
            meticulously crafted to elevate your tech career at every turn.
          </p>
        </div>

        <div className="w-full h-[400px] relative">
          <Image
            alt="ballon images"
            src={"/baloon-images.svg"}
            fill
            loading="eager"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
