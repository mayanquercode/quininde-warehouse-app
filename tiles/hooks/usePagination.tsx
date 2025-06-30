import { useState } from "react";

export default function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () => setCurrentPage(prev => prev + 1);
  const prevPage = () => setCurrentPage(prev => prev - 1);
  const firstPage = () => setCurrentPage(1);

  return { currentPage, goToPage, nextPage, prevPage, firstPage };
}