import React, { useState } from "react";
import Sidebar from '../Sidebar/Sidebar'; // Import Sidebar component
import { Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName, subcategoryList) => {
    setSelectedCategory(categoryName);
    setSubcategories(subcategoryList);
  };

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/category/${selectedCategory}/${subcategory.toLowerCase()}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onCategoryClick={handleCategoryClick} />
      <div style={{ padding: "24px", flex: 1 }}>
        {selectedCategory && (
          <>
            <h2 style={{ marginBottom: "16px" }}>
              Subcategories in "{selectedCategory}"
            </h2>
            <Row gutter={[16, 16]}>
              {subcategories.length > 0 ? (
                subcategories.map((subcategory, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <Card
                      title={subcategory.name}
                      hoverable
                      onClick={() => handleSubcategoryClick(subcategory.name)}
                      style={{ height: "150px" }}
                    >
                      <p>View products in {subcategory.name}</p>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No subcategories found</p>
              )}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default Category;

