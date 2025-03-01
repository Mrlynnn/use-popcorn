import { Box } from "../../Box/ui/Box";
import { Details } from "./Details";
import { WatchedItem } from "./WatchedItem";
import { Summary } from "./Summary";
import { List } from "../../List/ui/List";
import { useState } from "react";

export function WatchedBlock({ id, onSetActiveMovie }) {
  const [ratedMovies, setRatedMovies] = useState([]);

  return (
    <Box>
      {id && (
        <Details
          id={id}
          onReset={onSetActiveMovie}
          setRatedMovies={setRatedMovies}
          ratedMovies={ratedMovies}
        />
      )}

      {!id && (
        <>
          <Summary ratedMovies={ratedMovies} />
          <List>
            {ratedMovies?.map((movie) => (
              <WatchedItem key={movie.id} movie={movie} />
            ))}
          </List>
        </>
      )}
    </Box>
  );
}
