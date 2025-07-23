import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import Productitem from '../components/Productitem'

const SearchPage = () => {
  const { products } = useContext(Shopcontext)
  const [filterproducts, setfilterproducts] = useState([])
  const location = useLocation()
  
  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const searchTerm = query.get('q') || ''
    
    if (searchTerm) {
      const filtered = products.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setfilterproducts(filtered)
    } else {
      setfilterproducts([])
    }
  }, [location.search, products])

  return (
    <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'SEARCH'} text2={'RESULTS'}></Title>
      </div>

      {filterproducts.length === 0 ? (
        <div className="text-center text-gray-500 text-2xl font-medium py-10 col-span-full align-middle justify-center">
          No products found matching your search.
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
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
  )
}

export default SearchPage