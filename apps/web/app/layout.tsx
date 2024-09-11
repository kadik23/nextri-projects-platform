import { Inter } from "next/font/google"; 
import type { Metadata } from "next";
import "@/app/_styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });


export const metadata: Metadata = {
  title: "NEXTRI Projects",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='font-mono'> 
      <body>
          {children}
      </body>
    </html>
  );
}
