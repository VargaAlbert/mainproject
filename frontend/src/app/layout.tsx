import type { Metadata } from "next";
import Header from "@/components/feature/header/Header";
import "./globals.css";
import { ShopProvider } from "@/services/providers/ShopContext";

import { darkTheme } from "@/services/providers/MaterialTheme";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


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
        <ThemeProvider theme={darkTheme}>
          <ShopProvider>
            <Header />
            {children}
          </ShopProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
