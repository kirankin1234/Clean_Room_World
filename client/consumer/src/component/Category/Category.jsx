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



// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Spin, message } from "antd";
// import { useNavigate, useParams } from "react-router-dom";

// const Category = () => {
//   const navigate = useNavigate();
//   const { categoryName } = useParams(); // Get the category name from the URL
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Function to fetch categoryId by categoryName
//   // const getCategoryIdByName = async (categoryName) => {
//   //   try {
//   //     const response = await fetch(`http://localhost:5001/api/category/get`);
//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch categories");
//   //     }
//   //     // console.log(categoryName);      //to check response from backend

//   //     const categories = await response.json();

//   //     // Find the category object by name
//   //     const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());

//   //     return category ? category._id : null; // Return ObjectId if found
//   //   } catch (error) {
//   //     message.error("Error fetching categories: " + error.message);
//   //     return null;
//   //   }
//   // };

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       try {
//         setLoading(true);

//         // Get the categoryId from categoryName
//         const categoryId = categoryName;
//         if (!categoryId) {
//           throw new Error("Category not found");
//         }

//         // Fetch subcategories using categoryId
//         const response = await fetch(`http://localhost:5001/api/category/${categoryId}/subcategory`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch subcategories");
//         }

//         // console.log(response);      //to check responsefrom backend

//         const data = await response.json();
//         setSubcategories(data); // Assuming backend returns an array
//       } catch (error) {
//         message.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubcategories();
//   }, [categoryName]);

//   const handleSubcategoryClick = (subcategory) => {
//     navigate(`/category/${categoryName}/${subcategory.toLowerCase()}`);
//   };

//   return (
//     <div style={{ padding: "24px" }}>
//       <h2 style={{ marginBottom: "16px" }}>
//         Subcategories in "{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}"
//       </h2>

//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <Row gutter={[16, 16]}>
//           {subcategories.length > 0 ? (
//             subcategories.map((subcategory, index) => (
//               <Col xs={24} sm={12} md={8} lg={6} key={index}>
//                 <Card
//                   title={subcategory.name} // Assuming API returns objects with a "name" field
//                   hoverable
//                   onClick={() => handleSubcategoryClick(subcategory.name)}
//                   style={{ height: "150px" }}
//                 >
//                   <p>View products in {subcategory.name}</p>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <p>No subcategories available.</p>
//           )}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default Category;




// // import React, { useEffect, useState } from "react";
// // import { Card, Row, Col, Spin, message } from "antd";
// // import { useNavigate, useParams } from "react-router-dom";

// // const Category = () => {
// //   const navigate = useNavigate();
// //   const { categoryName } = useParams(); // Get the category from the URL
// //   const [subcategories, setSubcategories] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchSubcategories = async () => {
// //       try {
// //         const response = await fetch(`http://localhost:5001/api/subcategories/${categoryName}`); // Adjust API endpoint
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch subcategories");
// //         }
// //         const data = await response.json();
// //         setSubcategories(data); // Assuming backend returns an array
// //       } catch (error) {
// //         message.error(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchSubcategories();
// //   }, [categoryName]);

// //   const handleSubcategoryClick = (subcategory) => {
// //     navigate(`/category/${categoryName}/${subcategory.toLowerCase()}`);
// //   };

// //   return (
// //     <div style={{ padding: "24px" }}>
// //       <h2 style={{ marginBottom: "16px" }}>
// //         Subcategories in "{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}"
// //       </h2>

// //       {loading ? (
// //         <Spin size="large" />
// //       ) : (
// //         <Row gutter={[16, 16]}>
// //           {subcategories.length > 0 ? (
// //             subcategories.map((subcategory, index) => (
// //               <Col xs={24} sm={12} md={8} lg={6} key={index}>
// //                 <Card
// //                   title={subcategory.name} // Assuming API returns objects with a "name" field
// //                   hoverable
// //                   onClick={() => handleSubcategoryClick(subcategory.name)}
// //                   style={{ height: "150px" }}
// //                 >
// //                   <p>View products in {subcategory.name}</p>
// //                 </Card>
// //               </Col>
// //             ))
// //           ) : (
// //             <p>No subcategories available.</p>
// //           )}
// //         </Row>
// //       )}
// //     </div>
// //   );
// // };

// // export default Category;
