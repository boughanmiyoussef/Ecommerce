import React, { useState } from 'react';
import productsData from "../../data/products.json";
import ProductCards from '../shop/ProductCards';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // Handle the search logic
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    // Filter products based on name or description
    const filtered = productsData.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    // Update the filtered products state
    setFilteredProducts(filtered);
  };

  // Handle Enter key press to trigger search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* Search Section Header */}
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Search Products</h2>
        <p className='section__subheader'>
          Find the best products that match your needs and preferences.
        </p>
      </section>

      {/* Search Input & Button */}
      <section className='section__container'>
        <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
          
          {/* Search Input */}
          <input
            type="text"
            placeholder='Search For Products'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Detect Enter key press
            className='search-bar w-full max-w-4xl p-2 border rounded'
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'
          >
            Search
          </button>
        </div>

        {/* Display Filtered Products */}
        <ProductCards products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;
