import React from 'react'
import Hero from '../components/Herom'
import Latestcollection from '../components/Latestcollection'
import Bestseller from '../components/Bestseller'
import Ourpolicy from '../components/Ourpolicy'
import Newsletterbox from '../components/Newsletterbox'
import { Link } from 'react-router-dom'



const Home = () => {
  return (
    <div>
      <Hero/>
      <Latestcollection/>
      <Bestseller/>
      <div className='flex items-center justify-center'>
<Link to='/Collection'>
      <button className='bg-black text-white text-base px-15 py-4 text-center'>Browse All Collection</button>
</Link>
      </div>
      <Ourpolicy/>
      <Newsletterbox/>
      
    </div>
  )
}

export default Home
