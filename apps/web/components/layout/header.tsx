import MaxWidthWrapper from "../max-width-wrapper";
import UserNav from "../user-nav";

const Header = () => {
  return (
    <>
      <div className="w-full h-[70px] border-b bg-white fixed top-0 ">
        <MaxWidthWrapper className="h-full">
          <div className="w-full h-full  flex items-center justify-between">
            <p className="text-lg  ">Home</p>
            <UserNav />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default Header;
