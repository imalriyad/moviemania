import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MovieCard from "./MovieCard/MovieCard";
import SkeletonCompo from "./SkeletonCompo";
import { Button } from "@nextui-org/react";
import NavbarCompo from "./navbar/Navbar";
// Access environment variables
const apiKey = import.meta.env.VITE_APP_API_KEY;
const apiUrl = import.meta.env.VITE_APP_API_URL;

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();

  const searchMovies = async (query) => {
    const url = `${apiUrl}/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US&ds_lang=en`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setMovies(json.results || []);
      console.log(movies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      searchMovies(query);
      setSearchText(query);
    }
  }, [location.search]);

  if (loading) return <SkeletonCompo></SkeletonCompo>;

  return (
      <div className="bg-color">
          <NavbarCompo></NavbarCompo>
      <div className="flex max-w-screen-lg mx-auto justify-between p-4">
        <h1 className="text-2xl font-medium text-white text-center">
          Search Result for &quot;{searchText}&quot;{" "}
        </h1>
        <Link to={'/'}>
          {" "}
          <Button color="secondary">Go Back</Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-3 max-w-screen-lg mx-auto md:gap-4 gap-1 p-4">
        {movies.map(
          (movie) =>
            movie.poster_path && ( // Check if poster_path is not null
              <MovieCard
                key={movie.id}
                title={movie.title}
                id={movie.id}
                imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                rating={movie.vote_average}
                year={new Date(movie.release_date).getFullYear()}
              />
            )
        )}
      </div>
    </div>
  );
};

export default SearchResults;
