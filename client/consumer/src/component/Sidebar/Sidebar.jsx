import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom"; 

const Sidebar = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({}); // Stores subcategories for each category
  const [expandedCategories, setExpandedCategories] = useState({}); // Tracks expanded categories
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/category/get");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = async (category) => {
    const isExpanded = expandedCategories[category.name];

    if (isExpanded) {
      setExpandedCategories((prev) => ({ ...prev, [category.name]: false }));
    } else {
      if (!subcategories[category.name]) {
        try {
          const response = await fetch(
            `http://localhost:5001/api/subcategory/${category.name}`
          );
          const data = await response.json();
          setSubcategories((prev) => ({ ...prev, [category.name]: data }));
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      }

      setExpandedCategories((prev) => ({ ...prev, [category.name]: true }));
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/subcategory/${category.name}`
      );
      const data = await response.json();
      onCategoryClick(category.name, data); // Pass category name and subcategories to parent
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Categories</h2>
      <nav className="sidebar-nav">
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="category-container">
              {/* Category Item */}
              <div className="nav-item">
                <span className="toggle-icon" onClick={() => toggleCategory(category)}>
                  {expandedCategories[category.name] ? "−" : "+"}
                </span>
                <a href="#" onClick={() => handleCategoryClick(category)}>
                  {category.name}
                </a>
              </div>

              {/* Subcategories Dropdown (Only visible if expanded via +) */}
              {expandedCategories[category.name] && subcategories[category.name] && (
                <div className="subcategory-dropdown">
                  {subcategories[category.name].map((sub) => (
                    <div key={sub._id} className="sub-item">
                      {sub.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
