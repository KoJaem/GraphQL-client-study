import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

type Movie = {
  title: string;
  id: string;
};

export default function Movies() {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              title
              id
            }
          }
        `,
      })
      .then(result => setMovies(result.data.allMovies));
  }, [client]);

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}
