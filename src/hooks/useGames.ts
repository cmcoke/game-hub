import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

// defines the platform objects
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

// defines the array of objecsts 'results'  from 'https://api.rawg.io/api/games'
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
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

  // tracks the loading state
  const [isLoading, setLoading] = useState(false);

  // fetches data from the backend 'https://api.rawg.io/api'
  useEffect(() => {
    // cancels the request when viewing a different page
    const controller = new AbortController();

    // shows the loading skeletons animations when data is being fetched from 'https://api.rawg.io/api/games'
    setLoading(true);

    // get the list of games from 'https://api.rawg.io/api/games'
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then(res => {
        setGames(res.data.results);
        setLoading(false); // hides the loading skeletons animations after the data has been successfully fetched
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false); // hides the loading skeletons animations if there was an issues fetching the data
      });

    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
