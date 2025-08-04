import { useState, useEffect } from "react";
import { KEY } from "./App";
import  Button  from "./Button";
import  ErrorMessage  from "./ErrorMessage";
import  Loader  from "./Loader";
import StarRating from "./StarRating";

// movie details component
export default function MovieDetails({
  watched,
  selectedId,
  onCloseMovie,
  onAddWatched,
  onUserRating,
  userRating,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      title,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      imdbID: selectedId,
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  // close movie details with escape key
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          console.log("Closing");
        }
      }

      document.addEventListener("keydown", callback);

      //when you write this code it means if the MovieDetails component is not open this effect doesn't render
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  // Api for selected movie info
  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok)
            throw new Error("Somthing went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False")
            throw new Error(`Somthing went wrong with your internet`);

          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  // changing a page title in browser
  useEffect(
    function () {
      if (title !== undefined) document.title = `Movie | ${title}`;
      // document.title = `${title} ${
      //   watchedUserRating ? `| Rated ${watchedUserRating} 🌟` : ""
      // }`;
      return function () {
        document.title = "usePopcorn";
        // console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  return (
    <div className="details">
      {!isLoading && !error && (
        <>
          <header>
            <Button className="btn-back" onClick={() => onCloseMovie()}>
              &larr;
            </Button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size="24"
                    onUserRating={onUserRating}
                  />
                  {userRating > 0 && (
                    <Button className="btn-add" onClick={() => handleAdd()}>
                      + Add to list
                    </Button>
                  )}
                </>
              ) : (
                <p>
                  This movie is rated {watchedUserRating}{" "}
                  {watchedUserRating <= 1 ? "star" : "stars"} 🌟
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
