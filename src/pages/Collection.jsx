import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import Productitem from '../components/Productitem'
import { useLocation } from 'react-router-dom'

const Collection = () => {
  const { products, loading } = useContext(Shopcontext) // Add loading state from context
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
    if (category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setcategory(prev => [...prev, e.target.value])
    }
  }

  const togglesubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setsubcategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setsubcategory(prev => [...prev, e.target.value])
    }
  }

  const applyfilter = () => {
    // Only apply filters if products are loaded
    if (!products || products.length === 0) return
    
    let productscopy = [...products]

    // Apply category filters
    if (category.length > 0) {
      productscopy = productscopy.filter(item => category.includes(item.category))
    }

    // Apply subcategory filters
    if (subcategory.length) {
      productscopy = productscopy.filter(item => subcategory.includes(item.subcategory))
    }

    setfilterproducts(productscopy)
    setCurrentPage(1)
  }

  const sortproduct = () => {
    if (filterproducts.length === 0) return
    
    let fpcopy = [...filterproducts]
    switch (sortType) {
      case 'low-high':
        fpcopy.sort((a, b) => (a.price - b.price))
        break
      case 'high-low':
        fpcopy.sort((a, b) => (b.price - a.price))
        break
      default:
        // For 'relevant', maintain original order
        break
    }
    setfilterproducts(fpcopy)
  }

  // Initialize filterproducts when products load
  useEffect(() => {
    if (products && products.length > 0) {
      setfilterproducts(products)
    }
  }, [products])

  // Apply filters when category, subcategory changes
  useEffect(() => {
    applyfilter()
  }, [category, subcategory])

  // Sort products when sortType changes
  useEffect(() => {
    sortproduct()
  }, [sortType])

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filterproducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filterproducts.length / productsPerPage)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
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
            {['women', 'men', 'kids'].map((cat) => (
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
            {['topwear', 'bottomwear'].map((type) => (
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
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products List or Empty State */}
        {filterproducts.length === 0 ? (
          <div className="text-center text-gray-500 text-2xl font-medium py-10 col-span-full align-middle justify-center">
            {products.length === 0 ? (
              "Loading products..."
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
                    className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-black text-white' : ''}`}
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