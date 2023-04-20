import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";

const App = () => {
  return (
    <Grid
      // templateAreas={{}} -- creates a grid layout of the different sections of the website
      templateAreas={{
        base: `"nav" "main"`, // layout for devices with a screen width less 922px
        lg: `"nav nav" "aside main"` // layout for devices with a screen width of 992px and more
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      {/* Show above='lg' -- only shows the aside element on devices with a screen width of 992px and more. */}
      <Show above="lg">
        <GridItem area="aside">
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default App;
