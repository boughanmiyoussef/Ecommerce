import React from 'react'
import blogsData from "../../data/blogs.json";  // Correct relative path

export const Blogs = () => {
  return (
    <section className='section__container blog__container'>
                <h2 className='section__header'>Latest From Blog</h2>
                <p className='section__subheader'  >jhghldshaghashgasljghasdlhgajghjlahgljhasjhgjasjlghjlahgjhgjjg</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12'>
                {
                        blogsData.map((blog, index) =>(
                        <div key={index} className='blog__card cursor-pointer hover:scale-105 transition-all duration-300' >
                    <img src={blog.imageUrl} alt="" />  
                    <div className='bord__card__content'>
                        <h6>{blog.subtitle}</h6>
                        <h4>{blog.title}</h4>
                        <p>{blog.date}</p>
                    </div>
                        </div>

                        ))
                    }
                </div>
    </section>
  )
}