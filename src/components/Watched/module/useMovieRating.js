import { useEffect, useState } from "react";

export function useMovieRating(id, ratedMovies) {
  const [rating, setRating] = useState(0);
  let movieIndex = ratedMovies?.findIndex((movie) => movie.id === id);

  useEffect(() => {
    setRating(0);
  }, [id]);

  return {
    rating,
    movieIndex,
    setRating,
  };
}
