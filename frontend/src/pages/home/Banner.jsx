import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from "../../assets/header.png"; // Make sure the path is correct

const Banner = () => {
  return (
    <>
      <style>
        {`
          .banner-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            padding: 50px 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .banner-content {
            flex: 1;
            max-width: 50%;
            padding-right: 30px;
          }

          .banner-subtitle {
            font-size: 1.5rem;
            color: #ff6f61; /* Warm coral color */
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          .banner-title {
            font-size: 3rem;
            font-weight: bold;
            color: #2d2d2d; /* Dark gray for the main title */
            margin: 10px 0;
          }

          .banner-description {
            font-size: 1rem;
            color: #6c6c6c; /* Medium gray for text */
            line-height: 1.6;
            margin-bottom: 20px;
          }

          .shop-button {
            background-color: #ff6f61; /* Button color matching subtitle */
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }

          .shop-button:hover {
            background-color: #e05b4a; /* Darker red on hover */
          }

          .shop-link {
            color: white;
            text-decoration: none;
          }

          .banner-image-container {
            flex: 1;
            max-width: 50%;
          }

          .banner-image {
            width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      <div className="banner-container">
        <div className="banner-content">
          <h4 className="banner-subtitle">Up to 50% Off on Latest Fashion Trends</h4>
          <h1 className="banner-title">Exclusive Summer Collection 2024</h1>
          <p className="banner-description">
            Discover our new summer collection with fresh, stylish designs for every occasion. From
            breezy dresses to chic accessories, we've got everything you need to stay fashionable this
            season. Shop now and enjoy up to 50% off on select items!
          </p>
          <button className="shop-button">
            <Link to="/shop" className="shop-link">Shop Now</Link>
          </button>
        </div>

        <div className="banner-image-container">
          <img src={bannerImg} alt="Summer Collection Banner" className="banner-image" />
        </div>
      </div>
    </>
  );
};

export default Banner;
