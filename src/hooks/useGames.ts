import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

// defines the array of objecsts 'results'  from 'https://api.rawg.io/api/games'
interface Game {
  id: number;
  name: string;
}

// defines the response object from 'https://api.rawg.io/api/games'
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  // stores the game object from 'https://api.rawg.io/api'
  const [games, setGames] = useState<Game[]>([]);

  // for error message
  const [error, setError] = useState("");

  // fetches data from the backend 'https://api.rawg.io/api'
  useEffect(() => {
    // cancels the request when viewing a different page
    const controller = new AbortController();

    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then(res => setGames(res.data.results))
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
