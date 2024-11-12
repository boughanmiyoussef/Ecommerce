import React from 'react';
import { Link } from 'react-router-dom';

import category1 from "../../assets/category-1.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";

const Categories = () => {
  const categories = [
    { name: 'Accessories', path: 'accessories', image: category1 },
    { name: 'Dress Collection', path: 'dress', image: category2 },
    { name: 'Jewellery', path: 'jewellery', image: category3 },
    { name: 'Cosmetics', path: 'cosmetics', image: category4 },
  ];

  return (
    <>
      <style>
        {`
          .categories-container {
            padding: 50px 30px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            justify-items: center;
          }

          .categories-card {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .categories-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .categories-card h4 {
            position: absolute;
            bottom: 20px;
            left: 20px;
            background-color: rgba(0, 0, 0, 0.6);
            color: white;
            font-size: 1.5rem;
            padding: 10px;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s ease;
          }

          .categories-card:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          }

          .categories-card:hover img {
            transform: scale(1.1);
          }

          .categories-card:hover h4 {
            background-color: rgba(0, 0, 0, 0.8);
          }

          @media (max-width: 768px) {
            .categories-container {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 480px) {
            .categories-container {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="categories-container">
        {categories.map((category) => (
          <Link key={category.name} to={`/categories/${category.path}`} className="categories-card">
            <img src={category.image} alt={category.name} />
            <h4>{category.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
