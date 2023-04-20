import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenreResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  // stores the genre object from 'https://api.rawg.io/api'
  const [genres, setGenres] = useState<Genre[]>([]);

  // for error message
  const [error, setError] = useState("");

  // tracks the loading state
  const [isLoading, setLoading] = useState(false);

  // fetches data from the backend 'https://api.rawg.io/api'
  useEffect(() => {
    // cancels the request when viewing a different page
    const controller = new AbortController();

    // shows the loading skeletons animations when data is being fetched from 'https://api.rawg.io/api/genres'
    setLoading(true);

    // get the list of genres from 'https://api.rawg.io/api/genres'
    apiClient
      .get<FetchGenreResponse>("/genres", { signal: controller.signal })
      .then(res => {
        setGenres(res.data.results);
        setLoading(false); // hides the loading skeletons animations after the data has been successfully fetched
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false); // hides the loading skeletons animations if there was an issues fetching the data
      });

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
