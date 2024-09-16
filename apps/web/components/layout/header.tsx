import type { FC } from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import LogoutButton from "../logout-button";

const Header: FC = ({}) => {
  return (
    <>
      <div className="w-full h-[70px] border-b fixed top-0 ">
        <MaxWidthWrapper className="h-full">
          <div className="w-full h-full  flex items-center justify-between">
            <p className="text-xl font-bold  italic">Nextri Projects</p>
            <LogoutButton />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default Header;
