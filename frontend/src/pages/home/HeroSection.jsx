import React from 'react';
import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const card = [
    {
        id: 1,
        image: card1,
        trend: "2024 Trend",
        title: "Womens Shirt"
    },
    {
        id: 2,
        image: card2,
        trend: "2024 Trend",
        title: "Womens Dresses"
    },
    {
        id: 3,
        image: card3,
        trend: "2024 Trend",
        title: "Womens Casual"
    },
];

const HeroSection = () => {
    return (
        <>
            <style>
                {`
                    .hero-container {
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        gap: 30px;
                        padding: 60px 30px;
                        background-color: #f0f0f0;
                    }

                    .hero-card {
                        position: relative;
                        width: 100%;
                        max-width: 320px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                        border-radius: 15px;
                        overflow: hidden;
                        background-color: white;
                        transition: transform 0.3s ease-in-out;
                    }

                    .hero-card:hover {
                        transform: scale(1.05);
                    }

                    .hero-card img {
                        width: 100%;
                        height: auto;
                        object-fit: cover;
                        border-bottom: 3px solid #ff6f61;
                    }

                    .hero-content {
                        padding: 20px;
                        text-align: center;
                    }

                    .hero-content p {
                        font-size: 1.2rem;
                        font-weight: 500;
                        color: #ff6f61;
                        margin-bottom: 10px;
                    }

                    .hero-content h4 {
                        font-size: 1.8rem;
                        color: #333;
                        font-weight: bold;
                        margin-bottom: 15px;
                    }

                    .hero-content a {
                        font-size: 1rem;
                        color: #ff6f61;
                        text-decoration: none;
                        font-weight: 500;
                        transition: color 0.3s ease;
                    }

                    .hero-content a:hover {
                        color: #333;
                    }

                    @media (max-width: 768px) {
                        .hero-container {
                            flex-direction: column;
                            align-items: center;
                        }

                        .hero-card {
                            max-width: 100%;
                        }
                    }
                `}
            </style>

            <section className="hero-container">
                {card.map((cardItem) => (
                    <div key={cardItem.id} className="hero-card">
                        <img src={cardItem.image} alt={cardItem.title} />
                        <div className="hero-content">
                            <p>{cardItem.trend}</p>
                            <h4>{cardItem.title}</h4>
                            <a href="#">Discover More</a>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default HeroSection;
