import { useEffect, useRef, useState } from "react";
import { getMovies } from "../api";

export function useGetMovies() {
  const [numResults, setNumResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [movies, setIsMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);

  const abortController = useRef(null);

  async function searchHandler(value) {
    if (!value) {
      setError();
      setNumResults(0);
      return;
    }

    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;

    setIsLoading(true);
    setError();

    try {
      const data = await getMovies(value, controller);
      if (data.Response === "False") throw new Error("Can't find some movies");
      setIsLoading(false);
      // !data ? setIsError(true) : setIsError(false);
      setIsMovies(data.Search);
      setNumResults(data?.totalResults || 0);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error);
        setIsMovies([]);
        setError(error.message);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  return {
    searchHandler,
    numResults,
    isLoading,
    error,
    movies,
    activeMovie,
    setActiveMovie,
  };
}
