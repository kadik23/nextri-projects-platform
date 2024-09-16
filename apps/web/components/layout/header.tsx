import MaxWidthWrapper from "../max-width-wrapper";
import { Button } from "../ui/button";
import UserNav from "../user-nav";

const Header = () => {
  return (
    <>
      <div className="w-full h-[70px] border-b bg-white fixed top-0 ">
        <MaxWidthWrapper className="h-full">
          <div className="w-full h-full  flex items-center justify-between">
            <Button variant={"ghost"}>Home</Button>
            <UserNav />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default Header;
