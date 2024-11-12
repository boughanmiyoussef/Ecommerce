import React from 'react';

export const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
      {/* Free Delivery Section */}
      <div className='banner__card'>
        <span> <i className="ri-truck-line"></i></span>
        <h4>Free Delivery</h4>
        <p>Enjoy free shipping on all orders, no minimum required. Get your products delivered right to your door without any extra cost.</p>
      </div>

      {/* Secure Payment Section */}
      <div className='banner__card'>
        <span> <i className="ri-bank-card-line"></i></span>
        <h4>Secure Payment</h4>
        <p>Your payment details are completely secure with us. We use top-level encryption to ensure that your transactions are safe and private.</p>
      </div>

      {/* Return Policy Section */}
      <div className='banner__card'>
        <span><i className="ri-arrow-go-back-line"></i></span>
        <h4>Return Policy</h4>
        <p>If you're not completely satisfied with your purchase, you can easily return the items within 30 days for a full refund.</p>
      </div>

      {/* Customer Support Section */}
      <div className='banner__card'>
        <span><i className="ri-customer-service-line"></i></span>
        <h4>Customer Support</h4>
        <p>Our customer service team is here to help you! Get assistance via live chat, email, or phone for any questions or issues.</p>
      </div>

      {/* Discount Section */}
      <div className='banner__card'>
        <span><i className="ri-price-tag-line"></i></span>
        <h4>Discount Offers</h4>
        <p>Take advantage of exclusive discounts and seasonal promotions. Shop more, save more, and enjoy great deals on your favorite items.</p>
      </div>

      {/* Customer Reviews Section */}
      <div className='banner__card'>
        <span><i className="ri-star-line"></i></span>
        <h4>Customer Reviews</h4>
        <p>Read real reviews from customers who love our products. See their ratings and feedback to make the best purchase decisions.</p>
      </div>
    </section>
  );
};
