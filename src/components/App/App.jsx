import { useEffect, useRef, useState } from "react";
import { Movie } from "../Movies";
import { Navbar } from "../Nav";
import { Watched } from "../Watched";
import { getMovies } from "./api";
import { debounce } from "lodash";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

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
  const abortController = useRef(null);

  async function searchHandler(value) {
    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;

    const data = await getMovies(value, controller, setIsLoading, setIsError);
    isError && setIsMovies([]);
    data?.Search && setIsMovies(data.Search);
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
        {isError && <h1></h1>}
        <Movie isLoading={isLoading} isError={isError} movies={movies} />
        <Watched />
      </main>
    </>
  );
}