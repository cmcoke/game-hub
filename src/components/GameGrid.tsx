import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/react";

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

const GameGrid = () => {
  // stores the game object from 'https://api.rawg.io/api'
  const [games, setGames] = useState<Game[]>([]);

  // for error message
  const [error, setError] = useState("");

  // fetches data from the backend 'https://api.rawg.io/api'
  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
      .then(res => setGames(res.data.results))
      .catch(err => setError(err.message));
  });

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map(game => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};
export default GameGrid;
