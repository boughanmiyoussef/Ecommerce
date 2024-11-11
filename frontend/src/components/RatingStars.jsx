import React from 'react'

const RatingStars = ({ rating }) => {
    const stars = [];

    // Fix the loop syntax and star rendering
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={`ri-star${i <= rating ? '-fill' : '-line' }`}></span>
        );
    }

    return (
        <div className='product__rating'>{stars}</div> 
    );
}

export default RatingStars;
