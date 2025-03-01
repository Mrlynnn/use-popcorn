import { Error } from "../../Error";
import { Spinner } from "../../Spinner";
import { useGetMovieDescription } from "../module/useGetMovieDescription";
import { StarRating } from "./StarRating/StarRating";
import { useMovieRating } from "../module/useMovieRating";

export function Details({ id, onReset, ratedMovies, setRatedMovies }) {
  const { description, isLoading, errorMsg } = useGetMovieDescription(id);
  const { rating, movieIndex, setRating } = useMovieRating(id, ratedMovies);

  return isLoading ? (
    <div className="spinner-wrapper">
      <Spinner />
    </div>
  ) : errorMsg ? (
    <Error msg={errorMsg} />
  ) : (
    <div className="details">
      <header>
        <button onClick={() => onReset(null)} className="btn-back">
          &larr;
        </button>
        <img src={description?.Poster} />
        <div className="details-overview">
          <h2>{description?.Title}</h2>
          <p>
            {description?.Released} &bull; {description?.Runtime}
          </p>
          <p>{description?.Genre}</p>
          <p>
            <span>⭐️</span>
            {description?.imdbRating} IMDb rating
          </p>
        </div>
      </header>

      {/* <p>{avgRating}</p> */}

      <section>
        <div className="rating">
          {movieIndex === -1 && (
            <StarRating rating={rating} setRating={setRating} />
          )}

          {!!rating && movieIndex === -1 && (
            <button
              onClick={() => {
                setRatedMovies((oldMovies) => [
                  ...oldMovies,
                  {
                    id,
                    rating,
                    title: description.Title,
                    imdbRating: description.imdbRating,
                    runtime: description.Runtime,
                    poster: description.Poster,
                  },
                ]);
              }}
              className="btn-add"
            >
              + Add to list
            </button>
          )}
          {movieIndex !== -1 && (
            <p>
              You rated with movie {ratedMovies[movieIndex]?.rating}
              <span>⭐️</span>
            </p>
          )}
        </div>
        <div className="details-overview">
          <p>
            <em>{description?.Plot}</em>
          </p>
          <p>Starring actors: {description?.Actors}</p>
          <p>Directed by: {description?.Director}</p>
        </div>
      </section>
    </div>
  );
}
