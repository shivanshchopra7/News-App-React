import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import image from '../assets/image.jpg';

const NewsItem = ({ title, description, src, url, publishedAt, isFavorite, toggleFavorite }) => {
  const maxLengthTitle = 50; // Maximum characters for title
  const maxLengthDescription = 90; // Maximum characters for description

  // Function to add ellipsis if string exceeds maxLength
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (zero-indexed) and pad with leading zero if needed
    const year = date.getFullYear().toString().slice(-2); // Get year and slice to get last two digits
    const hours = date.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if needed
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if needed
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="card-container d-flex flex-row justify-content-center p-0 m-0 "> {/* Container with flex styles */}
      <div className="card bg-dark text-light mb-3 d-inline-block my-4 mx-4 px-2 py-2" style={{ width: "365px" }}>
        <img src={src ? src : image} style={{ height: "200px", width: "100%", objectFit: "cover" }} className="card-img-top" alt="News" />
        <div className="card-body" style={{ height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p className="card-text"><small className="">{formatDate(publishedAt)}</small></p>
          <h5 className="card-title">{truncateText(title, maxLengthTitle)}</h5>
          <p className="card-text">{description ? truncateText(description, maxLengthDescription) : "News about the current event which has happened. Click below to learn more about what just happened!"}</p>
          <div className="d-flex justify-content-between align-items-center">
            
            <a href={url} target='_blank' rel="noopener noreferrer" className="btn btn-primary">Read More</a>
            <button
              className="btn btn-outline-danger"
              onClick={toggleFavorite}
              style={{ border: 'none', background: 'none' }}
            >
             <FontAwesomeIcon
        icon={isFavorite ? solidHeart : regularHeart}
        style={{ fontSize: '24px', color: isFavorite ? 'white' : 'white' }}
      />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
