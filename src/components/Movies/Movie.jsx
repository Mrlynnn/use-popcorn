import React from "react";
import { Box } from "../Box/Box";
import { Error } from "../Error";
import { List } from "../List/List";
import { MovieItem } from "./MovieItem";
import { Spinner } from "../Spinner";

export function Movie({ isLoading, isError, movies }) {
  return (
    <Box>
      {isError && <Error />}
      {isLoading && (
        <div className="spinner-wrapper">
          <Spinner />
        </div>
      )}
      <List className="list-movies">
        {movies &&
          movies.map((item, ind) => <MovieItem key={ind} movie={item} />)}
      </List>
    </Box>
  );
}
