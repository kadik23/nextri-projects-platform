import Header from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Header />
      <div className="mt-[70px]">{children}</div>;
    </>
  );
}
