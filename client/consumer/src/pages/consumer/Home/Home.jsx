import React from "react";
import "./Home.css";
import { Carousel } from "antd";


import one from "../../../assets/1.jpg";
import two from "../../../assets/2.jpg";
import three from "../../../assets/3.jpg";
import four from "../../../assets/4.jpg";
import five from "../../../assets/5.jpg";


const images = [one, two, three, four, five];

const Home = () => {
  return (
    <div className="home-container">
      <Carousel autoplay autoplaySpeed={2500} dots={true} infinite effect="scrollx">
        {images.map((img, index) => (
          <div key={index} className="carousel-slide">
            <img src={img} alt={`Slide ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
