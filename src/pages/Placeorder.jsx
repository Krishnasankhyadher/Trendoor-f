import { useContext } from 'react'
import React, { useState } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { useNavigate } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const [method, setmethod] = useState('cod')

  const { backendurl, token, cartitems, setcartitems, getcartamount, delivery_charge, products, navigate,discount ,promoCode } = useContext(Shopcontext)
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })
  const onchangehandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setformdata(data => ({ ...data, [name]: value }))
  }
  const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (err) {
    return null;
  }
};

const onsubmithandler = async (e) => {
  e.preventDefault();

  try {
    const decoded = decodeToken(token);
    const userid = decoded?.id;

    if (!userid) {
      toast.error("Please login first  to place order");
      return;
    }

    

    let orderItems = [];

    for (const productId in cartitems) {
  const product = products.find(p => p._id === productId);
  if (!product) continue;

  for (const size in cartitems[productId]) {
    const quantity = cartitems[productId][size];

    if (quantity > 0) {
      const item = {
        ...structuredClone(product), // full product info
        size,
        quantity
      };
      orderItems.push(item);
    }
  }
}
   

    const orderdata = {
      userid, // ✅ Make sure this is sent
      address: formdata,
      items: orderItems, // ✅ Array of productId, size, quantity
      amount: getcartamount() + delivery_charge,
      paymentmethod: method,
      payment: false,
      date: Date.now(),
      promoCode: promoCode
    };

   

    const response = await axios.post(
      backendurl + '/api/order/place',
      orderdata,
      { headers: { Authorization: `Bearer ${token}` } }
    );

   
    if (response.data.success) {
      setcartitems({});
      navigate('/order');
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("❌ Error placing order:", error);
    toast.error("Error placing order");
  }
};

  return (
    <form onSubmit={onsubmithandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className=' text-xl sm:text-2xl my-3'>
          <Title text1={'Delihvery'} text2={'Information'} />

        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangehandler} name='firstname' value={formdata.firstname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={onchangehandler} name='lastname' value={formdata.lastname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />

        </div>
        <input required onChange={onchangehandler} name='email' value={formdata.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email' />
        <input required onChange={onchangehandler} name='street' value={formdata.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Address' />
        <div className='flex gap-3'>
          <input required onChange={onchangehandler} name='city' value={formdata.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onchangehandler} name='state' value={formdata.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />

        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangehandler} name='zipcode' value={formdata.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Pincode' />
          <input required onChange={onchangehandler} name='country' value={formdata.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />

        </div>
        <input required onChange={onchangehandler} name='phone' value={formdata.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone no.' />
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <Carttotal />

        </div>
        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setmethod('razorpay')} className='flex items-center gap-3 border p-1 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-4 mx-4' src="images/Screenshot 2025-07-05 232146.png" alt=""  loading="lazy"/>

            </div>
            <div onClick={() => setmethod('cod')} className='flex items-center gap-3 border p-1 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>

            </div>

          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>

          </div>

        </div>

      </div>

    </form>
  )
}

export default Placeorder
