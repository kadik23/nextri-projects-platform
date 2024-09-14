import Link from "next/link";
import type { FC } from "react";

const page: FC = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Link
          href="/auth"
          className="px-6 py-6 rounded-md font-bold text-xl bg-white border-2 border-primary text-primary w-fit transition-all shadow-[4px_4px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
        >
          Explore different project
        </Link>
      </div>
    </>
  );
};

export default page;
