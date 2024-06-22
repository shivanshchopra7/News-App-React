import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const apiKey = '6d9f2cb1e87cef1026f6d04d5cea6d88'; // Replace with your actual API key
const baseUrl = 'https://gnews.io/api/v4';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [activeTab, setActiveTab] = useState('all');
  const articlesPerPage = 6; // Number of articles per page

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      let url = `${baseUrl}/top-headlines?country=in&lang=en&max=20&apikey=${apiKey}`;
      
      // Adjust URL based on category
      if (category) {
        url += `&topic=${category}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchData();

  }, [category]);

  useEffect(() => {
    // Function to filter articles based on search query
    const handleSearch = () => {
      if (!searchQuery.trim()) {
        setFilteredArticles([]);
      } else {
        const filtered = articles.filter((article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredArticles(filtered);
      }
    };

    handleSearch(); // Initial search on mount or when articles change
  }, [searchQuery, articles]);

  // Calculate total number of pages
  const totalPages = Math.ceil((searchQuery ? filteredArticles.length : articles.length) / articlesPerPage);

  // Function to handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to toggle favorites
  const toggleFavorite = (article) => {
    const index = favorites.findIndex((fav) => fav.title === article.title);
    if (index === -1) {
      const updatedFavorites = [...favorites, article];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = favorites.filter((fav) => fav.title !== article.title);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Calculate which articles to display based on currentPage and search
  const articlesToDisplay = searchQuery ? filteredArticles : articles;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articlesToDisplay.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="container align-items-center">
      {loading && (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}
      <div className="d-flex justify-content-center  my-3">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn btn-outline-primary ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Articles
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setSearchQuery('')}
        >
          Clear
        </button>
      </div>

      {/* Conditionally render articles based on the active tab */}
      <div className="row">
        {activeTab === 'all'
          ? currentArticles.map((news, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={index}>
                <NewsItem
                  title={news.title}
                  description={news.description}
                  src={news.image} 
                  url={news.url}
                  publishedAt={news.publishedAt}
                  isFavorite={favorites.some((fav) => fav.title === news.title)}
                  toggleFavorite={() => toggleFavorite(news)}
                />
              </div>
            ))
          : favorites.map((news, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={index}>
                <NewsItem
                  title={news.title}
                  description={news.description}
                  src={news.image} 
                  url={news.url}
                  publishedAt={news.publishedAt}
                  isFavorite={true}
                  toggleFavorite={() => toggleFavorite(news)}
                />
              </div>
            ))}
      </div>

      {/* Pagination for All Articles */}
      {activeTab === 'all' && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NewsBoard;
