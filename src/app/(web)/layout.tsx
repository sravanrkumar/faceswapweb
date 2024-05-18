import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderNavbar from "@/components/navbar/headerNavBar";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Face Swap Magic",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={inter.className}  >
        <HeaderNavbar/>
        <Header/>
          {children}
        <Footer/>
      </body>
     
    </html>
  );
}
