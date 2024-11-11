import React from 'react'
import { Link } from 'react-router-dom'


import bannerImg from "../../assets/header.png"

const Banner = () => {
  return (
    <div className='section__container header__container'>
    <div className='header__content z-30'>
        <h4 className='uppercase'>Up To 100% Discount On </h4>
        <h1> Girls'Fashion</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio consectetur laboriosam accusantium ullam maxime, dicta magnam nulla totam reiciendis sit ipsum est? Nobis quos accusantium temporibus eos nulla quisquam deleniti.</p>
        <button className='btn'>
            <Link to="/shop">Explore Now</Link>
            </button> 
    </div>
    


    <div className='header__image'>
        <img src={bannerImg} alt='Banner Image' />
    </div>

</div>

  )
}

export default Banner