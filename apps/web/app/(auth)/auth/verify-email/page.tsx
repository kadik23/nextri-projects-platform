import Image from "next/image";

const Page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[600px] h-[500px] bg-primary rounded-2xl flex flex-col items-center py-8 gap-y-4">
        <div className="w-[200px] h-[200px] relative">
          <Image
            alt="ballon images"
            src={"/message.svg"}
            fill
            loading="eager"
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold text-white">
          We've sent you a magic link
        </h1>
      </div>
    </div>
  );
};

export default Page;
