import useData from "./useData";
import { Genre } from "./useGenres";

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

const useGames = (seletedGenre: Genre | null, selectedPlatform: Platform | null) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: seletedGenre?.id,
        platforms: selectedPlatform?.id
      }
    },
    [seletedGenre?.id, selectedPlatform?.id]
  );

export default useGames;
