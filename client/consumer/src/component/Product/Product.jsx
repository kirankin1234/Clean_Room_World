// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Row, Col, Typography, Button, Radio, InputNumber, Image } from "antd";

// const { Title, Text } = Typography;

// // Mock product data
// const products = [
//   {
//     id: 3,
//     name: "Cleanroom ESD Shoes: Autoclavable Clogs",
//     price: 6500, 
//     code: "APC-ACFE8",
//     sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
//     colors: ["black", "white"],
//     image: "https://via.placeholder.com/300",
//   },
//   {
//     id: 4,
//     name: "Disposable Gloves",
//     price: 500, 
//     code: "GLV-001",
//     sizes: ["S", "M", "L"],
//     colors: ["white", "blue"],
//     image: "https://via.placeholder.com/300",
//   }
// ];

// const Product = () => {
// //   const { productId } = useParams();
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   // Find product by ID
// //   const product = products.find(p => p.id === parseInt(productId));
// const { productId } = useParams();
// const product = products.find((p) => p.id === parseInt(productId, 10));


//   if (!product) {
//     return <h2 style={{ color: "red", textAlign: "center" }}>⚠ Product Not Found</h2>;
//   }

//   const handleCartClick = () => {
//     const cartItem = {
//       name: product.name,
//       price: product.price * quantity,
//       size: selectedSize,
//       color: selectedColor,
//       quantity,
//     };
//     console.log("Cart Item:", cartItem);
//     alert("Item added to the cart!");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Row gutter={24}>
//         <Col span={12}>
//           <Image
//             src={product.image}
//             alt="Product"
//             style={{ maxWidth: "100%", borderRadius: "8px" }}
//           />
//         </Col>
//         <Col span={12}>
//           <Title level={3}>{product.name}</Title>
//           <Title level={4}>₹{product.price}</Title>
//           <Text>
//             Product Code: <strong>{product.code}</strong>
//           </Text>
//           <br /><br />
//           <Text>Size: Required</Text>
//           <div>
//             <Radio.Group
//               onChange={(e) => setSelectedSize(e.target.value)}
//               value={selectedSize}
//             >
//               {product.sizes.map((size) => (
//                 <Radio.Button key={size} value={size}>
//                   {size}
//                 </Radio.Button>
//               ))}
//             </Radio.Group>
//           </div>
//           <br />
//           <Text>Color: Required</Text>
//           <div>
//             <Radio.Group
//               onChange={(e) => setSelectedColor(e.target.value)}
//               value={selectedColor}
//             >
//               {product.colors.map((color) => (
//                 <Radio.Button key={color} value={color}>
//                   {color.charAt(0).toUpperCase() + color.slice(1)}
//                 </Radio.Button>
//               ))}
//             </Radio.Group>
//           </div>
//           <br />
//           <Text>Quantity:</Text>
//           <div>
//             <InputNumber
//               min={1}
//               value={quantity}
//               onChange={(value) => setQuantity(value)}
//             />
//           </div>
//           <br />
//           <Button
//             style={{ backgroundColor: "#40476D" }}
//             type="primary"
//             onClick={handleCartClick}
//             disabled={!selectedSize || !selectedColor}
//           >
//             I'm Interested
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Product;


import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Button, Radio, InputNumber, Image } from "antd";

const { Title, Text } = Typography;

// Mock product data
const products = [
  {
    id: 1,
    name: "Cleanroom ESD Shoes: Autoclavable Clogs",
    price: 6500,
    code: "APC-ACFE8",
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    colors: ["black", "white"],
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Disposable Gloves",
    price: 500,
    code: "GLV-001",
    sizes: ["S", "M", "L"],
    colors: ["white", "blue"],
    image: "https://via.placeholder.com/300",
  },
];

const Product = () => {
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Find product by ID
  const product = products.find((p) => p.id === parseInt(productId, 10));

  if (!product) {
    return (
      <h2 style={{ color: "red", textAlign: "center" }}>⚠ Product Not Found</h2>
    );
  }

  const handleCartClick = () => {
    const cartItem = {
      name: product.name,
      price: product.price * quantity,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    console.log("Cart Item:", cartItem);
    alert("Item added to the cart!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={24}>
        <Col span={12}>
          <Image
            src={product.image}
            alt={product.name}
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </Col>
        <Col span={12}>
          <Title level={3}>{product.name}</Title>
          <Title level={4}>₹{product.price}</Title>
          <Text>
            Product Code: <strong>{product.code}</strong>
          </Text>
          <br />
          <Text>Size:</Text>
          <div>
            <Radio.Group
              onChange={(e) => setSelectedSize(e.target.value)}
              value={selectedSize}
            >
              {product.sizes.map((size) => (
                <Radio.Button key={size} value={size}>
                  {size}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <br />
          <Text>Color:</Text>
          <div>
            <Radio.Group
              onChange={(e) => setSelectedColor(e.target.value)}
              value={selectedColor}
            >
              {product.colors.map((color) => (
                <Radio.Button key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <br />
          <Text>Quantity:</Text>
          <div>
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => setQuantity(value)}
            />
          </div>
          <br />
          <Button
            style={{ backgroundColor: "#40476D" }}
            type="primary"
            onClick={handleCartClick}
            disabled={!selectedSize || !selectedColor}
          >
            I'm Interested
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
