
import { useEffect, useState } from "react";
import MovieCarousel from "../componentes/MovieCard/MovieCarousel";
import NavbarCompo from "../componentes/navbar/Navbar";
import SectionTitle from "../componentes/SectionTitle";
import MovieCard from "../componentes/MovieCard/MovieCard";
import SkeletonCompo from "../componentes/SkeletonCompo";
const apiUrl = import.meta.env.VITE_APP_API_URL
const apiKey = import.meta.env.VITE_APP_API_KEY

const Home = () => {
    const [populer, setPopuler] = useState([])
    const [topRated, setTopRated] = useState([])
    const [latest, setLatest] = useState([])
    const [isLoading,setLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const skeletonCount = 6
  

useEffect(()=>{
    setLoading(true)
    const url = `${apiUrl+'/movie/top_rated?language=en-US&sort_by=popularity.desc&page=2'}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: apiKey
      }
    };
    setLoading(true)
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setTopRated(json.results)
        setLoading(false)
      })
      .catch(err => console.error(err));
      
},[])
  

  
useEffect(()=>{
    setLoading(true)
       const url = `${apiUrl+'/movie/popular?language=en-US&sort_by=popularity.desc&page=2'}`
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: apiKey
      }
    };
    setLoading(true)
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setPopuler(json.results)
        setLoading(false)
      })
      .catch(err => console.error(err));

},[])


const fetchedPages = new Set(); // Store fetched page numbers

const fetchMovies = async () => {
  if (!hasMore || isLoading || fetchedPages.has(page)) return; // Prevent fetching if already loading, no more data, or page already fetched

  setLoading(true);
  const url = `${apiUrl}/trending/movie/week?language=en-US&sort_by=popularity.desc&page=${page}`;

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

    if (json.results.length > 0) {
      setLatest((prev) => [...prev, ...json.results]); // Append new movies to the existing list
      fetchedPages.add(page); // Mark the current page as fetched
      setPage((prev) => prev + 1); // Increment page number for the next fetch
    } else {
      setHasMore(false); // No more movies to load
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  
  useEffect(() => {
    fetchMovies(); // Initial fetch
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500; // Trigger when near the bottom
      if (nearBottom) {
        fetchMovies(); // Fetch more movies
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener on unmount
  }, [hasMore, isLoading]);







    return (
        <div className="bg-color h-screen" style={{  paddingBottom: "50px"}}>
      <NavbarCompo></NavbarCompo>

    <div className="max-w-screen-lg mx-auto" style={{padding: '20px', color: '#fff' }}>
    <SectionTitle title={"Top Rated"} />
    {isLoading ? (
                       <div className="grid md:grid-cols-5 grid-cols-3">{ Array.from({ length: skeletonCount }, (_, index) =><SkeletonCompo key={index} />)}</div>
                    ) : (
                        <MovieCarousel movies={topRated} />
                    )}

                <div className="md:pt-10 pt-4">
                    <SectionTitle title={"Popular"} />
                  
                   {isLoading ? (
                       <div className="grid md:grid-cols-5 grid-cols-3">{ Array.from({ length: skeletonCount }, (_, index) =><SkeletonCompo key={index} />)}</div>
                    ) : (
                        <MovieCarousel movies={populer} />
                    )}
                  
                </div>

             
     <div className="md:pt-10 pt-4">
     <SectionTitle title={"Latest"}></SectionTitle>
     <div className="grid md:grid-cols-5 grid-cols-3 ">
  {isLoading 
    ? [...Array(6)].map((_, index) => <SkeletonCompo key={index} />) // Show skeletons based on desired count
    : latest?.map((movie) => (
        <MovieCard 
          key={movie.id}
          title={movie.title}
          id={movie.id}
          imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          rating={movie.vote_average}
          year={new Date(movie.release_date).getFullYear()}
        />
      ))
  }
</div>

     </div>
       
    </div>
        </div>
    );
};

export default Home;