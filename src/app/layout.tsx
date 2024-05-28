import { auth } from "@/auth";
import { Header } from "@/components/header";
import Providers from "@/providers/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desafio Datawer",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <Header />
          <Toaster position="bottom-center" />

          {children}
        </Providers>
      </body>
    </html>
  );
}
