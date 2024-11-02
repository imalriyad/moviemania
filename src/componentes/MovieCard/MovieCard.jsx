/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const MovieCard = ({ title="Movie title", imageUrl, rating, year,id}) => {

  return (
    <div>
    <Link to={`https://vidsrc.xyz/embed/movie/${id}`}>
    <div style={styles.cardContainer} className="mx-auto w-full drop-shadow-2xl">
    <div style={styles.featureTag}>FEATURE</div>
    <div style={styles.imageContainer}>
      <img className="object-cover" src={imageUrl} alt={title} style={styles.image} />
      <div style={styles.rating}>⭐ {rating}</div>
    </div>
    <div style={styles.title}>{title}</div>
    <div style={styles.year}>{year}</div>
  </div>
    </Link>
    </div>
  );
};

const styles = {
  cardContainer: {
    cursor: "pointer",
    backgroundColor: '#1d1d1d',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    position: 'relative',
    fontFamily: 'Arial, sans-serif',
  },
  featureTag: {
    backgroundColor: '#e50914',
    color: '#fff',
    padding: '2px 6px',
    fontSize: '10px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '10px',
    left: '10px',
    borderRadius: '3px',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    borderRadius: '5px',
  },
  rating: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    backgroundColor: '#333',
    padding: '2px 5px',
    fontSize: '12px',
    borderRadius: '3px',
  },
  title: {
    marginTop: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  year: {
    fontSize: '12px',
    color: '#888',
  }
};

export default MovieCard;
