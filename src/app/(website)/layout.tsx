import "@/styles/globals.css";

import { type Metadata } from "next";
import { Header } from "@/components/organisms/header/header";
import { Footer } from "@/components/organisms/footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
