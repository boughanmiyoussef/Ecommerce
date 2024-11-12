import React, { useState } from 'react';
import ProductCards from './ProductCards';
import products from "../../data/products.json"; // Replace with actual path if necessary

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4);
    };

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader mb-12'>
                Discover the hottest trends in fashion, accessories, cosmetics, and more. Our trending products are carefully selected to help you stay ahead of the curve and elevate your style. Explore our top picks for the season!
            </p>

            <div className='mt-12'>
                {/* Dynamically slice the products based on visibleProducts state */}
                <ProductCards products={products.slice(0, visibleProducts)} />
            </div>    

            {/* Load More Product Button */}
            <div className='product__btn'>
                {
                    visibleProducts < products.length && (
                        <button className='btn' onClick={loadMoreProducts}>Load More</button>
                    )
                }
            </div>
        </section>
    );
};

export default TrendingProducts;
