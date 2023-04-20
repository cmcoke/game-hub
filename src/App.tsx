import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  return (
    <Grid
      // templateAreas={{}} -- creates a grid layout of the different sections of the website
      templateAreas={{
        base: `"nav" "main"`, // layout for devices with a screen width less 922px
        lg: `"nav nav" "aside main"` // layout for devices with a screen width of 992px and more
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr"
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      {/* Show above='lg' -- only shows the aside element on devices with a screen width of 992px and more. */}
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList selectedGenre={selectedGenre} onSelectGenre={genre => setSelectedGenre(genre)} />
        </GridItem>
      </Show>
      <GridItem area="main">
        <PlatformSelector />
        <GameGrid seletedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
};

export default App;
