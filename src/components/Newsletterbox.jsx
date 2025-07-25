import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Shopcontext } from '../context/Shopcontext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {backendurl} =useContext(Shopcontext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${backendurl}/api/mail/subscribe`, { email });

      if (res.data.success) {
        toast.success(res.data.message);
        setSuccess(true);
        setEmail('');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if (success) {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup
  }
}, [success]);

  return (
    <div className='text-center'>
        <p className='text-3xl font-medium text-gray-800'>Subscribe Now & get ₹150 OFF</p>
        <p className='text-gray-400 mt-3'>
            You get ₹150 off on your first order of above ₹499

        </p>

      <form
        onSubmit={handleSubmit}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input
          type="email"
          placeholder="Enter your email"
          className='w-full sm:flex-1 outline-none'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-10 py-4  hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
       {success && (
        <p className='text-green-600 text-lg font-medium'>
          Subscribed Successfully! Use code <span className='font-bold'>WELCOME</span> to get ₹150 OFF
        </p>
      )}
    </div>
  );
};

export default Newsletter;
