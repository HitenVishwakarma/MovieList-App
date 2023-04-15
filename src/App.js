import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isDataLoad, setIsDataLoad] = useState(false);

  // useEffect(() => {
  //   try {
  //     (async () => {
  //       setIsDataLoad(true);
  //       const url = "https://swapi.dev/api/films/";
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       setMovies(data.results);
  //       setIsDataLoad(false);
  //     })();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  const dummyMovies = useCallback(async () => {
    setIsDataLoad(true);
    try {
      const url = "https://swapi.dev/api/films/";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setMovies(data.results);
      setIsDataLoad(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    dummyMovies();
  }, [dummyMovies]);

  return (
    <React.Fragment>
      <section>
        <button onClick={dummyMovies}>Fetch Movies</button>
      </section>
      <section>
        {isDataLoad && !error ? (
          <p>Loading...</p>
        ) : (
          <MoviesList movies={movies} />
        )}
        {!isDataLoad && movies.length === 0 && <p>No Results Found</p>}
        {isDataLoad && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
