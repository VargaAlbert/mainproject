import type { Metadata } from "next";
import Header from "@/components/feature/header/Header";
import "./globals.css";
import { ShopProvider } from "@/services/providers/ShopContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=''
        suppressHydrationWarning={true}>
        <ShopProvider>
          <Header />
          {children}
        </ShopProvider>
      </body>
    </html >
  );
}
