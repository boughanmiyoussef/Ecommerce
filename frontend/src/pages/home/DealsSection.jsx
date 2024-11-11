import React from 'react'
import dealsImg from "../../assets/deals.png" 


const DealsSection = () => {
  return (
    <section className='section__container deals__container'>
      <div className='deals__image'>
          <img src={dealsImg} alt="" />
      </div>

      <div className='deals__content'>
        <h5>Get Up To % Discount</h5>
        <h4>Deals Of The Month</h4>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta a corporis voluptatibus molestiae omnis error nesciunt temporibus aliquam, sequi est. Officiis recusandae accusantium excepturi odio quas voluptates minus doloribus reprehenderit!</p>

      <div className='deals__countdown flex-wrap'>

        <div className='deals__countdown__card'>
          <h4> 14</h4>
          <p>Days</p>
        </div>
        <div className='deals__countdown__card'>
          <h4> 8</h4>
          <p>Hours</p>
        </div>
        <div className='deals__countdown__card'>
          <h4> 6</h4>
          <p>Minutes</p>
        </div>
        <div className='deals__countdown__card'>
          <h4> 6</h4>
          <p>Seconds</p>
        </div>

      </div>


      </div>



    </section>
  )
}

export default DealsSection