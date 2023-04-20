import useData from "./useData";

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

const useGames = () => useData<Game>("/games");

export default useGames;
