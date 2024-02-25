"use client"

import { Pagination } from '@mui/material'
import { useShopContext } from '@/services/providers/ShopContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { handleChangePage, page, maxPage } = useShopContext();

  return (
    <main className="ProductPageContainer">
      {children}
      <Pagination
        count={maxPage}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
      />
    </main>
  );
}
