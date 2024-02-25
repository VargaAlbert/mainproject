import { useState } from "react";

/**
 * @fileOverview Custom React hook for managing UI states.
 * @module usePagination
 */

// Type for objects representing products
export interface ProductT {
  // Define the ProductT interface based on the actual type
  // For example: id: number, name: string, etc.
}

// Hook that facilitates pagination functionality
export interface UsePaginationInterface {
  // Current page number
  page: number;
  // Maximum page number
  maxPage: number;
  // Function to retrieve data for the current page
  currentPageData: () => ProductT[];
  // Handling page change
  handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
}

/**
 * Custom React hook for managing pagination.
 * @param products - Array containing all products.
 * @param itemsPerPage - Number of items to display per page.
 * @returns - Object containing pagination state and operations.
 */
const usePagination = (products: ProductT[], itemsPerPage: number): UsePaginationInterface => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(products.length / itemsPerPage);

  /**
   * Retrieves data for the current page.
   * @returns - Array of products for the current page.
   * @public
   */
  const currentPageData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return products.slice(begin, end);
  }

  /**
   * Handles page change.
   * @param event - The event object.
   * @param page - The new page number.
   * @public
   */
  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    jumpPage(page);
  };

  /**
   * Handles page jump.
   * @param page - The new page number.
   * @private
   */
  const jumpPage = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { page, maxPage, currentPageData, handleChangePage };
}

export default usePagination;