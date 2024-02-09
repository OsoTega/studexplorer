import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "StudExplorer",
  description: "This is an anonymous chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={cn(inter.className, "bg-white")}>
        <MaxWidthWrapper>
        <Navbar/>
          {children}
          <Footer/>
        </MaxWidthWrapper>
      </body>
    </html>
    </ClerkProvider>
  );
}
