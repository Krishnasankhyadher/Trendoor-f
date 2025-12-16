import React, { useContext, useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import Productitem from '../components/Productitem'
import PageTransition from '../components/Pagetransition'
import Fuse from 'fuse.js'

const SearchPage = () => {
  const { products } = useContext(Shopcontext)
  const location = useLocation()
  
  // --- States ---
  const [filterproducts, setfilterproducts] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sortType, setsortType] = useState('relevant')
  const [showfilter, setShowfilter] = useState(false)

  // --- Search Query ---
  const searchQuery = new URLSearchParams(location.search).get('q') || ''

  // --- Toggle Handlers ---
  const togglecategory = (e) => {
    const value = e.target.value
    setcategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }

  const togglesubcategory = (e) => {
    const value = e.target.value
    setsubcategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }

  const clearAllFilters = () => {
    setcategory([])
    setsubcategory([])
  }

  // --- Main Logic: Search + Filter + Sort ---
  useEffect(() => {
    if (products.length === 0) return

    let tempProducts = [...products]

    // 1. Apply Fuse.js Search
    if (searchQuery) {
      const fuse = new Fuse(tempProducts, {
        isCaseSensitive: false,
        includeScore: true,
        shouldSort: true,
        threshold: 0.4,
        keys: [
          { name: 'name', weight: 0.6 },
          { name: 'description', weight: 0.2 },
          { name: 'category', weight: 0.1 },
          { name: 'subCategory', weight: 0.1 }
        ]
      })
      const results = fuse.search(searchQuery)
      tempProducts = results.map(result => result.item)
    }

    // 2. Apply Category Filter
    if (category.length > 0) {
      tempProducts = tempProducts.filter(item => category.includes(item.category))
    }

    // 3. Apply Subcategory Filter
    if (subcategory.length > 0) {
      tempProducts = tempProducts.filter(item => subcategory.includes(item.subcategory))
    }

    // 4. Apply Sorting
    switch (sortType) {
      case 'low-high':
        tempProducts.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        tempProducts.sort((a, b) => b.price - a.price)
        break
      default:
        // Keep relevance order from Fuse.js
        break
    }

    setfilterproducts(tempProducts)
  }, [searchQuery, products, category, subcategory, sortType])

  return (
    <PageTransition>
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-8 pt-8 sm:pt-12 border-t'>
        
        {/* --- Filters Sidebar (Identical to Collection) --- */}
        <div className='w-full sm:w-64 lg:w-72'>
          
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowfilter(!showfilter)} 
            className='w-full sm:hidden flex items-center justify-between bg-white border-2 border-gray-200 rounded-lg px-5 py-3 mb-4 shadow-sm hover:shadow-md transition-shadow'
          >
            <span className='text-lg font-semibold text-gray-800'>
              Filters {(category.length + subcategory.length > 0) && `(${category.length + subcategory.length})`}
            </span>
            <svg className={`w-5 h-5 transition-transform duration-300 ${showfilter ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Desktop Filter Header */}
          <div className='hidden sm:flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-gray-900'>Filters</h2>
            {(category.length + subcategory.length > 0) && (
              <button onClick={clearAllFilters} className='text-sm text-black hover:text-black font-medium transition-colors'>
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
                  <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
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
                  <label key={type} className='flex items-center gap-3 cursor-pointer group'>
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
                  <button onClick={clearAllFilters} className='text-xs text-black hover:text-black font-medium'>
                    Clear
                  </button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {[...category, ...subcategory].map((filter) => (
                    <span key={filter} className='inline-flex items-center gap-1 bg-white border border-gray-500 text-black text-xs font-medium px-3 py-1 rounded-full'>
                      {filter === 'topwear' ? 'Upper Wear' : filter === 'bottomwear' ? 'Bottom Wear' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className='flex-1'>
          
          {/* Header with Title and Sort */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 bg-white border border-gray-200 rounded-xl p-5 shadow-sm'>
            <div className='flex items-center gap-2'>
              <Title text1={'SEARCH'} text2={'RESULTS'} />
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

          {/* Product Grid or Empty State */}
          {filterproducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-2xl py-16 px-6">
              <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                <svg className='w-10 h-10 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>
                No matches found
              </h3>
              <p className='text-gray-500 text-center max-w-md'>
                We couldn't find any products matching "{searchQuery}" with your selected filters.
              </p>
              <div className="flex gap-4 mt-6">
                {(category.length + subcategory.length > 0) && (
                   <button onClick={clearAllFilters} className='px-6 py-2 border-2 border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors'>
                     Clear Filters
                   </button>
                )}
                <Link to='/collection' className='px-6 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors'>
                  View All Collection
                </Link>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
              {filterproducts.map((item, index) => (
                <Productitem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default SearchPage