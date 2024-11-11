import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import products from "../../data/products.json"
import ProductCards from '../shop/ProductCards'


const CategoryPage = () => {
  const { categoryName } = useParams()
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const filtered = products.filter((product) => 
      product.category.toLowerCase() === categoryName.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [categoryName])

  useEffect(() => {
    // Scroll to the top only when the category changes
    window.scrollTo(0, 0);
  }, [categoryName]) // This ensures the scroll happens only when `categoryName` changes

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>
          jsdfksdhsdfhsdhjlfhjsdhjfsjdkjksjkfjksdjfsjkfldsj;fasl/bsavd/jsbvjdbsbjs
        </p>
      </section>

      {/* Products Card */}
      <div className='section__container'> 
        <ProductCards products={filteredProducts} />
      </div>
    </>
  )
}

export default CategoryPage
