import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="flex items-center justify-center">{children}</section>
  );
};

export default Layout;
