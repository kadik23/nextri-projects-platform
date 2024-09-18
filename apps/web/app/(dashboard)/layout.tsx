import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="w-[100%-[14rem]  ml-[14rem] min-h-screen h-fit bg-zinc-100]">
        <div className=" bg-neutral-100">{children}</div>;
      </div>
    </div>
  );
}
