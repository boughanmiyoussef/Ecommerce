import React, { useState } from 'react'
import ProductCards from './ProductCards'
import products from "../../data/products.json"

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4);
    };

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader mb-12'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maiores veritatis excepturi officiis asperiores repellendus, ad magni optio provident quos voluptates amet repudiandae adipisci praesentium vitae sapiente mollitia, est doloremque!
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
