import type { Metadata } from "next";

import "@styles/global.scss";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

interface BaseLayoutProps {
  children: React.ReactNode;
  genericData?: any;
  [key: string]: any;
}

export default async function BaseLayout({
  children,
  genericData,
  ...props
}: BaseLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-wrap w-full h-full">
          <div className="w-full">
            <Navbar {...props} />
            <main>{children}</main>
          </div>
          <Footer genericElement={genericData} {...props} />
        </div>
      </body>
    </html>
  );
}
