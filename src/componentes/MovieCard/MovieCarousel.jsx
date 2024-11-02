/* eslint-disable react/prop-types */
// MovieCarousel.js
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from './MovieCard';
import leftArrow from "./assests/left-arrow.svg"
import rightArrow from "./assests/right-arrow.svg"
import SkeletonCompo from '../SkeletonCompo';

const MovieCarousel = ({movies, isLoading}) => {

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
          <div className="custom-next-arrow" onClick={onClick}>
           <img className='md:h-[30px] h-[20px] w-[30px] md:w-[30px]' src={leftArrow} alt="" />
          </div>
        );
      };
      
      const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
          <div className="custom-prev-arrow" onClick={onClick}>
           <img className='md:h-[30px] h-[20px] w-[30px] md:w-[30px]' src={rightArrow} alt="" />
          </div>
        );
      }



    var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <div className="slider-container">
          <Slider {...settings}>
          {movies?.map((movie) => (
          <div key={movie.id}>
            {isLoading? <SkeletonCompo></SkeletonCompo>:<MovieCard
              title={movie.title}
              id={movie.id}
              imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              rating={movie.vote_average}
              year={new Date(movie.release_date).getFullYear()}
            />}
          </div>
        ))}
            
          </Slider>
        </div>
      );
    }
    
export default MovieCarousel;
