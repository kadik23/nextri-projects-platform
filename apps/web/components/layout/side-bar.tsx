import type { FC } from "react";
import UserNav from "../user-nav";

const Sidebar: FC = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 lg:w-56 flex-col border-r bg-background sm:flex">
      <div className="w-full h-fit min-h-[100px] flex flex-col gap-y-2 p-4">
        <UserNav />
      </div>
    </aside>
  );
};

export default Sidebar;
