import { useEffect, useState } from "react";

export function usePaginate(
  initialUrl,
  initialData,
  initialPage = 1,
  initialPerPage = 10
) {
  const [data, setData] = useState(initialData);
  const [totalRows, setTotalRows] = useState(initialData.totalItems || 0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page, limit) => {
    setLoading(true);
    try {
      const response = await fetch(`${initialUrl}?page=${page}&limit=${limit}`);

      if (!response.ok) {
        throw new Error("Could not fetch blogs.");
      }

      const resData = await response.json();
      setData(resData.data.data);
      setTotalRows(resData.data.totalItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [currentPage, perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage) => {
    setPerPage(newPerPage);
    fetchData(currentPage, newPerPage);
  };

  return {
    data,
    totalRows,
    currentPage,
    perPage,
    loading,
    handlePageChange,
    handlePerRowsChange,
  };
}
