import { useEffect, useState } from "react";
import API from "../../api/api";

export function useFetchList(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    API.get(`${endpoint}?page=${page}`)
      .then((res) => {
        setData(res.data.results);
        setNext(res.data.next);
        setPrevious(res.data.previous);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [endpoint, page]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
  };
}
