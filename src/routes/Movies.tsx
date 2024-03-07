import { gql, useQuery } from "@apollo/client";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

type Movie = {
  title: string;
  id: string;
};

type Tweet = {
  id: string;
  text: string;
  author: Author;
};

type Author = {
  fullName: string;
};

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Could not fetch :(</h1>;
  }

  return (
    <ul>
      <h1>Movies</h1>
      {data.allMovies.map((movie: Movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
      <h1>Tweets</h1>
      {data.allTweets.map((tweet: Tweet) => (
        <li key={tweet.id}>{tweet.text}/by ${tweet.author.fullName}</li>
      ))}
    </ul>
  );
}
