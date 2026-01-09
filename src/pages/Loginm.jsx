import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading' // Make sure you have this component
import PageTransition from '../components/Pagetransition'

const Login = () => {
  const [currentstate, setcurrentstate] = useState('Login')
  const { token, settoken, backendurl, navigate } = useContext(Shopcontext)
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onsubmithandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    
    try {
      if (currentstate === 'Sign up') {
        const response = await axios.post(backendurl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          settoken(response.data.token)
          localStorage.setItem('userToken', response.data.token)
          toast.success('Registration successful!')
        } else {
          toast.error(response.data.message || 'Registration failed')
        }
      } else {
        const response = await axios.post(backendurl + '/api/user/login', { email, password })
        if (response.data.success) {
          settoken(response.data.token)
          localStorage.setItem('userToken', response.data.token)
          toast.success('Login successful!')
        } else {
          toast.error(response.data.message || 'Login failed')
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast.error(error.response?.data?.message || 
                 error.message || 
                 (currentstate === 'Login' ? 'Login failed' : 'Registration failed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <PageTransition>

    <form onSubmit={onsubmithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-4xl font-serif'>{currentstate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentstate === 'Sign up' && (
        <input 
        onChange={(e) => setname(e.target.value)} 
          value={name} 
          type="text" 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Name'
          required
        />
      )} 

      <input 
        onChange={(e) => setemail(e.target.value)} 
        value={email} 
        type="email" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email'
        required
      />

      <input 
        onChange={(e) => setpassword(e.target.value)} 
        value={password} 
        type="password" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer hover:underline'>Forgot Your Password?</p>
        {currentstate === 'Login' ? (
          <p 
            className='cursor-pointer hover:underline' 
            onClick={() => setcurrentstate('Sign up')}
          >
            Create Account
          </p>
        ) : (
          <p 
            className='cursor-pointer hover:underline' 
            onClick={() => setcurrentstate('Login')}
          >
            Login Here
          </p>
        )}
      </div>

      <button 
        type="submit" 
        className='bg-black text-white px-8 py-2 mt-4 w-full flex justify-center items-center gap-2'
        disabled={loading}
      >
        {loading ? (
          <>
            <Loading size={20} color="white" />
            {currentstate === 'Login' ? 'Signing In...' : 'Signing Up...'}
          </>
        ) : (
          currentstate === 'Login' ? 'Sign In' : 'Sign Up'
        )}
      </button>
    </form>
          </PageTransition>
  )
}

export default Login