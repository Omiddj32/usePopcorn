import { useState } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Navbar from "./Navbar";
import Search from "./Search";
import NumResults from "./NumResults";
import Main from "./Main";
import Box from "./Box";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export const KEY = process.env.REACT_APP_OMDB_KEY;

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movies, isLoading, error] = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  // select movie from list
  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  // close Movie details
  function handleCloseMovie() {
    setSelectedId(null);
  }

  // add movie to watched list
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  // remove movie from watched list
  function handleDeleteWatched(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
