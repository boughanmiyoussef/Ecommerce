import React from 'react';
import blogsData from "../../data/blogs.json";  // Correct relative path

export const Blogs = () => {
  return (
    <section className='section__container blog__container'>
      <h2 className='section__header'>Latest From Blog</h2>
      
      <p className='section__subheader'>
        Discover the latest trends, tips, and insights in fashion, lifestyle, beauty, and more.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12'>
        {
          blogsData.map((blog, index) => (
            <div key={index} className='blog__card cursor-pointer hover:scale-105 transition-all duration-300'>
              <img src={blog.imageUrl} alt={blog.title} className="rounded-lg w-full object-cover h-48" />  
              <div className='blog__content p-4'>
                <h4 className='text-xl font-semibold text-gray-800'>{blog.title}</h4>
                <p className='text-sm text-gray-600 mt-2'>{blog.description}</p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};
