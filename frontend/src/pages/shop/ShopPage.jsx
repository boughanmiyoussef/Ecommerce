import React, { useState, useEffect } from 'react';
import productsData from "../../data/products.json";  // Assuming you have a product JSON file
import ProductCards from '../shop/ProductCards'; // Assuming you have a ProductCards component for displaying products

const ShopPage = () => {
  // Define the filters
  const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
      { label: 'Under $50', min: 0, max: 50 },
      { label: '$50 - $100', min: 50, max: 100 },
      { label: '$100 - $200', min: 100, max: 200 },
      { label: '$200 and above', min: 200, max: Infinity },
    ],
  };

  // Set state for filters, search query, and products
  const [selectedCategories, setSelectedCategories] = useState('all'); // multiple categories
  const [selectedColors, setSelectedColors] = useState([]); // multiple colors
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // Handle filter changes
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value) // Remove from selected
        : [...prevSelected, value] // Add to selected
    );
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setSelectedColors((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  // Handle search logic
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    // Filter products based on the search query and selected filters
    const filtered = productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      // Apply the category, color, and price filters
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category.toLowerCase()) || selectedCategories.includes('all');
      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(product.color.toLowerCase()) || selectedColors.includes('all');
      const priceRange = filters.priceRanges.find((range) => range.label === selectedPriceRange);
      const matchesPrice =
        selectedPriceRange === 'all' ||
        (product.price >= priceRange.min && product.price <= priceRange.max);

      return matchesSearch && matchesCategory && matchesColor && matchesPrice;
    });

    setFilteredProducts(filtered);
  };

  // Filter products whenever the filters or search query change
  useEffect(() => {
    handleSearch(); // Trigger the search whenever any filter or search query changes
  }, [selectedCategories, selectedColors, selectedPriceRange, searchQuery]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedPriceRange('all');
    setSearchQuery('');
  };

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Shop Page</h2>
        <p className='section__subheader'>
          Browse through our selection of products.
        </p>
      </section>

      <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          {/* Left Side: Filters */}
          <div className='w-full md:w-1/4'>
            <h3 className='text-xl font-medium mb-4'>Shop Filtering</h3>

            {/* Search Bar */}
            <div className='mb-4'>
              <label htmlFor='search' className='block font-semibold mb-2'>
                Search Products
              </label>
              <input
                id='search'
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(); // Trigger the search on Enter
                  }
                }}
                className='p-2 border rounded w-full'
                placeholder='Search for products'
              />
            </div>

            {/* Category Filter - Checkbox style */}
            <div className='mb-4'>
              <label className='block font-semibold mb-2'>Category</label>
              <div className='space-y-2'>
                {filters.categories.map((category) => (
                  <div key={category}>
                    <input
                      type='checkbox'
                      id={category}
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategoryChange}
                    />
                    <label htmlFor={category} className='ml-2'>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Filter - Checkbox style */}
            <div className='mb-4'>
              <label className='block font-semibold mb-2'>Color</label>
              <div className='space-y-2'>
                {filters.colors.map((color) => (
                  <div key={color}>
                    <input
                      type='checkbox'
                      id={color}
                      value={color}
                      checked={selectedColors.includes(color)}
                      onChange={handleColorChange}
                    />
                    <label htmlFor={color} className='ml-2'>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter - Radio style */}
            <div className='mb-4'>
              <label className='block font-semibold mb-2'>Price Range</label>
              <div className='space-y-2'>
                {filters.priceRanges.map((range) => (
                  <div key={range.label}>
                    <input
                      type='radio'
                      id={range.label}
                      name='priceRange'
                      value={range.label}
                      checked={selectedPriceRange === range.label}
                      onChange={handlePriceRangeChange}
                    />
                    <label htmlFor={range.label} className='ml-2'>
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className='mb-4'>
              <button
                onClick={clearFilters}
                className='w-full p-2 bg-red-500 text-white rounded'
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Right Side: Filtered Products */}
          <div className='w-full md:w-3/4'>
            <h3 className='text-xl font-medium mb-4'>
              Products Found: {filteredProducts.length}
            </h3>
            {filteredProducts.length > 0 ? (
              <ProductCards products={filteredProducts} />
            ) : (
              <p>No products found based on the selected filters.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
