import image from '../assets/image.jpg';

const NewsItem = ({ title, description, src, url, publishedAt }) => {
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
    <div className="card-container d-inline-flex "> {/* Container with flex styles */}
      <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{ maxWidth: "345px" }}>
        <img src={src ? src : image} style={{ height: "200px", width: "100%", objectFit: "cover" }} className="card-img-top" alt="News" />
        <div className="card-body">
          <h5 className="card-title">{truncateText(title, maxLengthTitle)}</h5>
          <p className="card-text">{description ? truncateText(description, maxLengthDescription) : "News about the current event which has happened. Click below to learn more about what just happened!"}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text"><small className="">{formatDate(publishedAt)}</small></p>
            <a href={url} className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
