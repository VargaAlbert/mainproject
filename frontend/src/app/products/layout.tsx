"use client"

import type { Metadata } from "next";
/* import { ShopProvider } from "@/services/providers/ShopContext";
import { darkTheme } from "@/services/providers/MaterialTheme";
import { ThemeProvider } from '@mui/material/styles';

import Header from "@/components/feature/navigation/ResponsiveAppBar";
import LoginModal from "@/components/feature/authentication/LoginModal";
import PersistLogin from "@/components/feature/authentication/PersitstLogin";
import MaterialDrawer from '@/components/feature/MaterialDrawer'
import ProductCart from "@/components/feature/product/ProductCart";
import "../style/globals.scss" */
import { Pagination } from '@mui/material'
import { useShopContext } from '@/services/providers/ShopContext';

/* export const metadata: Metadata = {
  title: "ALBIHORGÁSZBOLT",
  description: "ALBIHORGÁSZBOLT e-kereskedelmi webáruház",
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { handleChange, page, count } = useShopContext();
  return (
    <main className="ProductPageContainer">
      {children}
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </main>
  );
}
