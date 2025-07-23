import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'

const Cart = () => {
  const { products, cartitems, currency , updatequantity, navigate,getcartamount} = useContext(Shopcontext)
  const [cartdata, setcartdata] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []

    for (const itemId in cartitems) {
      for (const size in cartitems[itemId]) {
        if (cartitems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartitems[itemId][size]
          })
        }
      }
    }

    setcartdata(tempData)
    }
    
  }, [cartitems,products])

  return (
    <div className='border-t pt-14 border-gray-200 px-4 sm:px-10'>
      <div className='text-2xl mb-6'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      {getcartamount() < 599 && (
  <div className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 border border-yellow-400 text-yellow-900 px-6 py-3 rounded-2xl mb-6 shadow-md flex items-center justify-center gap-2 text-base font-medium">
  🚚 <span>Get <strong>Free Delivery</strong> on orders above ₹599!</span>
</div>
)}

      <div className="flex flex-col gap-6">
        {cartdata.map((item, index) => {
          const product = products.find((p) => p._id === item._id)
          if (!product) return null

          return (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Left Part - Image and Details */}
              <div className="flex items-center gap-4 sm:gap-6">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded-sm"
                  loading="lazy"
                />
                <div>
                  <p className="font-medium text-sm sm:text-base text-gray-800">{product.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <p className="text-gray-700">{currency}{product.price}</p>
                    <p className="border px-2 py-1 bg-gray-50 text-gray-700">{item.size}</p>
                  </div>
                </div>
              </div>

              {/* Right Part - Quantity and Delete */}
              <div className="flex items-center gap-20 sm:gap-50">
            <p className="border px-2 py-1 bg-gray-50 text-gray-700">{item.quantity}</p>
                <img onClick={()=>updatequantity(item._id, item.size,0)}
                  src="https://www.svgrepo.com/show/447911/bin.svg"
                  alt="Delete"
                  className="w-5 sm:w-6 cursor-pointer"
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <Carttotal/>
          <div className='w-full text-end '>
            <button onClick={()=>navigate('/Placeorder')} className='bg-black text-white text-sm my-8 px-8 py-3 '>PROCEED TO CHECKOUT</button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Cart
