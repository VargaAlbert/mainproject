import { useState } from "react";

const usePagination = (products: productT[] , itemsPerPage: number) => {

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(products.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return products.slice(begin, end);
  }

  const nextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  const prevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  const jumpPage = (page : number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  const numberOfPage = () => {
    return Math.ceil(products.length / itemsPerPage)
  }

  const count = Math.ceil(products.length / itemsPerPage)

  const handleChange = (event: React.ChangeEvent<unknown>,
    page: number) => {
    setPage(page);
    jumpPage(page);
  };

  return { currentPage, maxPage, page, count, nextPage, prevPage, jumpPage, currentData, numberOfPage, handleChange};
}

export default usePagination;