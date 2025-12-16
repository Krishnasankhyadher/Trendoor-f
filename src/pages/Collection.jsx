import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import Productitem from '../components/Productitem'
import { useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import PageTransition from '../components/Pagetransition'

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

  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = applyFilters(products, category, subcategory)
      const sorted = sortproduct(filtered)
      setfilterproducts(sorted)
    } else {
      setfilterproducts([])
    }
  }, [products, category, subcategory, sortType])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filterproducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filterproducts.length / productsPerPage)

  const clearAllFilters = () => {
    setcategory([])
    setsubcategory([])
  }

  if (loading.global || loading.products) {
    return <Loading />
  }

  return (
    <PageTransition>
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-8 pt-8 sm:pt-12 border-t'>
        {/* Filters Sidebar */}
        <div className='w-full sm:w-64 lg:w-72'>
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowfilter(!showfilter)} 
            className='w-full sm:hidden flex items-center justify-between bg-white border-2 border-gray-200 rounded-lg px-5 py-3 mb-4 shadow-sm hover:shadow-md transition-shadow'
          >
            <span className='text-lg font-semibold text-gray-800'>
              Filters {(category.length + subcategory.length > 0) && `(${category.length + subcategory.length})`}
            </span>
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${showfilter ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Desktop Filter Header */}
          <div className='hidden sm:flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-gray-900'>Filters</h2>
            {(category.length + subcategory.length > 0) && (
              <button 
                onClick={clearAllFilters}
                className='text-sm text-black hover:text-black font-medium transition-colors'
              >
                Clear All
              </button>
            )}
          </div>
          
          {/* Filter Sections */}
          <div className={`space-y-4 ${showfilter ? 'block' : 'hidden'} sm:block`}>
            {/* Categories Filter */}
            <div className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
              <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 border-b border-gray-200'>
                <h3 className='font-semibold text-gray-800 text-sm uppercase tracking-wide'>Categories</h3>
              </div>
              <div className='p-5 space-y-3'>
                {['women', 'men'].map((cat) => (
                  <label 
                    key={cat} 
                    className='flex items-center gap-3 cursor-pointer group'
                  >
                    <div className='relative'>
                      <input 
                        type="checkbox" 
                        className='w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-black focus:ring-offset-0 cursor-pointer transition-all' 
                        value={cat} 
                        checked={category.includes(cat)}
                        onChange={togglecategory} 
                      />
                    </div>
                    <span className='text-gray-700 font-medium group-hover:text-gray-900 transition-colors'>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategories Filter */}
            <div className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
              <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 border-b border-gray-200'>
                <h3 className='font-semibold text-gray-800 text-sm uppercase tracking-wide'>Type</h3>
              </div>
              <div className='p-5 space-y-3'>
                {['topwear', 'bottomwear'].map((type) => (
                  <label 
                    key={type} 
                    className='flex items-center gap-3 cursor-pointer group'
                  >
                    <div className='relative'>
                      <input 
                        type="checkbox" 
                        className='w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-black focus:ring-offset-0 cursor-pointer transition-all' 
                        value={type} 
                        checked={subcategory.includes(type)}
                        onChange={togglesubcategory} 
                      />
                    </div>
                    <span className='text-gray-700 font-medium group-hover:text-gray-900 transition-colors'>
                      {type === 'topwear' ? 'Upper Wear' : 'Bottom Wear'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            {(category.length + subcategory.length > 0) && (
              <div className='bg-gray-50 border border-gray-400 rounded-xl p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-semibold text-black'>Active Filters</span>
                  <button 
                    onClick={clearAllFilters}
                    className='text-xs text-black hover:text-black font-medium'
                  >
                    Clear
                  </button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {[...category, ...subcategory].map((filter) => (
                    <span 
                      key={filter}
                      className='inline-flex items-center gap-1 bg-white border border-gray-500 text-black text-xs font-medium px-3 py-1 rounded-full'
                    >
                      {filter === 'topwear' ? 'Upper Wear' : filter === 'bottomwear' ? 'Bottom Wear' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className='flex-1'>
          {/* Header with Title and Sort */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 bg-white border border-gray-200 rounded-xl p-5 shadow-sm'>
            <div className='flex items-center gap-2'>
              <Title text1={'ALL'} text2={'COLLECTION'} />
              <span className='bg-gray-100 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full'>
                {filterproducts.length}
              </span>
            </div>
            
            <div className='flex items-center gap-3'>
              <label className='text-sm font-medium text-gray-700 hidden sm:block'>Sort by:</label>
              <select 
                onChange={(e) => setsortType(e.target.value)} 
                value={sortType}
                className='flex-1 sm:flex-none border-2 border-gray-300 rounded-lg text-sm px-4 py-2 bg-white focus:border-black focus:ring-2 focus:ring-black outline-none transition-all cursor-pointer'
                disabled={filterproducts.length === 0}
              >
                <option value="relevant">Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products List or Empty State */}
          {filterproducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-2xl py-16 px-6">
              <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                <svg className='w-10 h-10 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>
                {products.length === 0 ? "No products available" : searchQuery ? "No results found" : "No matches"}
              </h3>
              <p className='text-gray-500 text-center max-w-md'>
                {products.length === 0 
                  ? "Check back soon for new arrivals" 
                  : searchQuery 
                    ? `We couldn't find any products matching "${searchQuery}"`
                    : "Try adjusting your filters to see more products"
                }
              </p>
              {(category.length + subcategory.length > 0) && (
                <button 
                  onClick={clearAllFilters}
                  className='mt-6 px-6 py-2 bg-black hover:bg-black text-white font-medium rounded-lg transition-colors'
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <div className='text-sm text-gray-600'>
                    Showing <span className='font-semibold text-gray-900'>{indexOfFirstProduct + 1}</span> to <span className='font-semibold text-gray-900'>{Math.min(indexOfLastProduct, filterproducts.length)}</span> of <span className='font-semibold text-gray-900'>{filterproducts.length}</span> products
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Previous
                    </button>
                    
                    <div className='flex gap-1'>
                      {[...Array(totalPages)].slice(
                        Math.max(0, currentPage - 2),
                        Math.min(totalPages, currentPage + 1)
                      ).map((_, index) => {
                        const pageNum = Math.max(0, currentPage - 2) + index + 1
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                              currentPage === pageNum 
                                ? 'bg-black text-white shadow-lg shadow-gray-200' 
                                : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default Collection