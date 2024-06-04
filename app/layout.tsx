import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CardContextProvider from "@/components/card-context/card-conext";
import NavBar from "@/components/nav-links";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "List App",
  description: "List app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CardContextProvider>
        <body className={inter.className}>
          <main className="max-w-md mx-auto">
            <NavBar />
            {children}
          </main>
        </body>
      </CardContextProvider>
    </html>
  );
}
