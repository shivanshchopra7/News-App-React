import { useState, useEffect } from 'react';

const Navbar = ({ setCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("general");

  useEffect(() => {
    setCategory("general");
  }, [setCategory]);

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSelectedCategory(category); // Update the selected category state
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
       
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className={`nav-link ${selectedCategory === "general" ? "selected" : ""}`} style={{ cursor: 'pointer', backgroundColor: selectedCategory === "general" ? "red" : "", color: selectedCategory === "general" ? "white" : "" }} onClick={() => handleCategoryClick("general")}>General</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${selectedCategory === "technology" ? "selected" : ""}`} style={{ cursor: 'pointer', backgroundColor: selectedCategory === "technology" ? "red" : "", color: selectedCategory === "technology" ? "white" : "" }} onClick={() => handleCategoryClick("technology")}>Technology</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${selectedCategory === "business" ? "selected" : ""}`} style={{ cursor: 'pointer', backgroundColor: selectedCategory === "business" ? "red" : "", color: selectedCategory === "business" ? "white" : "" }} onClick={() => handleCategoryClick("business")}>Business</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${selectedCategory === "health" ? "selected" : ""}`} style={{ cursor: 'pointer', backgroundColor: selectedCategory === "health" ? "red" : "", color: selectedCategory === "health" ? "white" : "" }} onClick={() => handleCategoryClick("health")}>Health</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${selectedCategory === "science" ? "selected" : ""}`} style={{ cursor: 'pointer', backgroundColor: selectedCategory === "science" ? "red" : "", color: selectedCategory === "science" ? "white" : "" }} onClick={() => handleCategoryClick("science")}>Science</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${selectedCategory === "sports" ? "selected" : ""}`} style={{ cursor: 'pointer', backgroundColor: selectedCategory === "sports" ? "red" : "", color: selectedCategory === "sports" ? "white" : "" }} onClick={() => handleCategoryClick("sports")}>Sports</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${selectedCategory === "entertainment" ? "selected" : ""}`} style={{ cursor: 'pointer', backgroundColor: selectedCategory === "entertainment" ? "red" : "", color: selectedCategory === "entertainment" ? "white" : "" }} onClick={() => handleCategoryClick("entertainment")}>Entertainment</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
