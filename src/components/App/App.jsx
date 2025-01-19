import React from "react";
import { useEffect, useRef, useState } from "react";
import { MovieBlock } from "../Movies";
import { Navbar } from "../Nav";
import { WatchedBlock } from "../Watched";
import { getMovies } from "./api";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// export function App() {
//   const [numResults, setNumResults] = useState(0);

//   const searchHandler = debounce(async (value) => {
//     const data = await getMovies(value);
//     setNumResults(data?.totalResults || 0);
//   }, 100);

//   useEffect(() => {
//     return () => {
//       searchHandler.cancel();
//     };
//   }, [searchHandler]);

//   return (
//     <>
//       <Navbar onSearch={searchHandler} numResults={numResults} />
//       <main className="main">
//         <Movie />
//         <Watched />
//       </main>
//     </>
//   );
// }

export function App() {
  const [numResults, setNumResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setIsMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState();
  const abortController = useRef(null);

  async function searchHandler(value) {
    if (!value) {
      setIsError(false);
      setNumResults(0);
      return;
    }
    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;

    setIsLoading(true);
    setIsError(false);
    const data = await getMovies(value, controller);
    // isError && setIsMovies([]);
    setIsLoading(false);
    !data ? setIsError(true) : setIsError(false);
    data?.Search ? setIsMovies(data.Search) : setIsMovies([]);
    setNumResults(data?.totalResults || 0);
  }

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  return (
    <>
      <Navbar onSearch={searchHandler} numResults={numResults} />
      <main className="main">
        <MovieBlock
          isLoading={isLoading}
          isError={isError}
          movies={movies}
          activeMovie={activeMovie}
          setActiveMovie={setActiveMovie}
        />
        <WatchedBlock id={activeMovie} />
      </main>
    </>
  );
}
