import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  // stores the data object from 'https://api.rawg.io/api'
  const [data, setData] = useState<T[]>([]);

  // for error message
  const [error, setError] = useState("");

  // tracks the loading state
  const [isLoading, setLoading] = useState(false);

  // fetches data from the backend 'https://api.rawg.io/api'
  useEffect(() => {
    // cancels the request when viewing a different page
    const controller = new AbortController();

    // shows the loading skeletons animations when data is being fetched
    setLoading(true);

    // get the data from a stated endpoint Ex. -- 'https://api.rawg.io/api/genres'
    apiClient
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
      .then(res => {
        setData(res.data.results);
        setLoading(false); // hides the loading skeletons animations after the data has been successfully fetched
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false); // hides the loading skeletons animations if there was an issues fetching the data
      });

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useData;
