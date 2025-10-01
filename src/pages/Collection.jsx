import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import Productitem from '../components/Productitem'
import { useLocation } from 'react-router-dom'
import Loading from '../components/Loading'

const Collection = () => {
  const { products, loading } = useContext(Shopcontext)
  const [showfilter, setShowfilter] = useState(false)
  const [filterproducts, setfilterproducts] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sortType, setsortType] = useState('relevant')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 20
  const location = useLocation()

  // Get search query from URL
  const searchQuery = new URLSearchParams(location.search).get('q') || ''

  const togglecategory = (e) => {
    const value = e.target.value
    setcategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    )
  }

  const togglesubcategory = (e) => {
    const value = e.target.value
    setsubcategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    )
  }

  const applyfilter = () => {
    if (!products || products.length === 0) {
      setfilterproducts([])
      return
    }
    
    let filtered = [...products]

    // Apply category filters
    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category))
    }

    // Apply subcategory filters
    if (subcategory.length > 0) {
      filtered = filtered.filter(item => subcategory.includes(item.subcategory))
    }

    setfilterproducts(filtered)
    setCurrentPage(1)
  }

  const sortproduct = (productsToSort) => {
    if (!productsToSort || productsToSort.length === 0) return productsToSort
    
    const sorted = [...productsToSort]
    switch (sortType) {
      case 'low-high':
        return sorted.sort((a, b) => a.price - b.price)
      case 'high-low':
        return sorted.sort((a, b) => b.price - a.price)
      default:
        return sorted
    }
  }

  // Initialize and apply filters when products load
  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = applyFilters(products, category, subcategory)
      const sorted = sortproduct(filtered)
      setfilterproducts(sorted)
    } else {
      setfilterproducts([])
    }
  }, [products, category, subcategory, sortType])

  // Helper function to apply filters
  const applyFilters = (products, categories, subcategories) => {
    let filtered = [...products]
    
    if (categories.length > 0) {
      filtered = filtered.filter(item => categories.includes(item.category))
    }
    
    if (subcategories.length > 0) {
      filtered = filtered.filter(item => subcategories.includes(item.subcategory))
    }
    
    return filtered
  }

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filterproducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filterproducts.length / productsPerPage)

  if (loading.global || loading.products) {
    return <Loading />
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filters Sidebar */}
      <div className='min-w-60'>
        <p 
          onClick={() => setShowfilter(!showfilter)} 
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img 
            src="https://www.svgrepo.com/show/501929/drop-down-minor.svg" 
            className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} 
            alt="" 
          />
        </p>
        
        {/* Categories Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['women', 'men', ].map((cat) => (
              <label key={cat} className='flex gap-2 items-center cursor-pointer'>
                <input 
                  type="checkbox" 
                  className='w-3' 
                  value={cat} 
                  checked={category.includes(cat)}
                  onChange={togglecategory} 
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategories Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['topwear','bottomwear'].map((type) => (
              <label key={type} className='flex gap-2 items-center cursor-pointer'>
                <input 
                  type="checkbox" 
                  className='w-3' 
                  value={type} 
                  checked={subcategory.includes(type)}
                  onChange={togglesubcategory} 
                />
                {type === 'topwear' ? 'Upper Wear' : 'Bottom Wear'}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          <select 
            onChange={(e) => setsortType(e.target.value)} 
            value={sortType}
            className='border-2 border-gray-300 text-sm px-2'
            disabled={filterproducts.length === 0}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products List or Empty State */}
        {filterproducts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg sm:text-2xl font-medium py-10 col-span-full align-middle justify-center">
            {products.length === 0 ? (
              "No products available"
            ) : searchQuery ? (
              `No products found for "${searchQuery}"`
            ) : (
              "No products match your filters"
            )}
          </div>
        ) : (
          <>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {currentProducts.map((item) => (
                <Productitem
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2 text-sm sm:text-base">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === index + 1 ? 'bg-black text-white' : ''
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Collection