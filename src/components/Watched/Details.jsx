import { Spinner } from "../Spinner";
import { StarRating } from "../StarRating";
import { Error } from "../Error";
import { useGetMovieDescription } from "./module/useGetMovieDescription";

export function Details({ id }) {
  const { description, isLoading, errorMsg } = useGetMovieDescription(id);

  return isLoading ? (
    <div className="spinner-wrapper">
      <Spinner />
    </div>
  ) : errorMsg ? (
    <Error msg={errorMsg} />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back">&larr;</button>
        <img src="https://m.media-amazon.com/images/M/MV5BMDFhNzU4MTMtYzZmNS00ZDEzLTg2MjQtYmUzZDA1ZWU4OTkzXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX300.jpg" />
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
          <StarRating />
          <button className="btn-add">+ Add to list</button>
          <p>
            You rated with movie 7 <span>⭐️</span>
          </p>
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
