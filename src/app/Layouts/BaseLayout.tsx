import type { Metadata } from "next";

import "@styles/global.scss";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default async function BaseLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { genericData } = props;

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
