import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TermsAndConditions from './pages/Termsandcondition'

// Lazy-loaded components for better performance
const Home = React.lazy(() => import('./pages/Homem'))
const Cart = React.lazy(() => import('./pages/Cart'))
const About = React.lazy(() => import('./pages/About'))
const Collection = React.lazy(() => import('./pages/Collection'))
const Loginm = React.lazy(() => import('./pages/Loginm'))
const Placeorder = React.lazy(() => import('./pages/Placeorder'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Order = React.lazy(() => import('./pages/Order'))
const Product = React.lazy(() => import('./pages/Productm'))
const Exchange = React.lazy(() => import('./pages/Exchange'))
const Delivery = React.lazy(() => import('./pages/Delivery'))
const PrivacyPolicy = React.lazy(() => import('./pages/Privacypolicy'))
const SearchPage = React.lazy(() => import('./pages/Searchpage'))

// Admin routes
const Admin = React.lazy(() => import('./admin/Admin'))
const AdminAdd = React.lazy(() => import('./pages/adminPages/Add'))
const AdminOrder = React.lazy(() => import('./pages/adminPages/Order'))
const AdminList = React.lazy(() => import('./pages/adminPages/List'))
const AdminPromoCodes = React.lazy(() => import('./pages/adminPages/Promotion'))

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen flex flex-col'>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <Navbar />
      
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Loginm />} />
            <Route path='/order' element={<Order />} />
            <Route path='/placeorder' element={<Placeorder />} />
            <Route path='/exchange' element={<Exchange />} />
            <Route path='/delivery' element={<Delivery />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/terms' element={<TermsAndConditions />} />
            <Route path='/product/:productId' element={<Product />} />
            
            {/* Admin Routes */}
            <Route path='/admin' element={<Admin />}>
              <Route path='add' element={<AdminAdd />} />
              <Route path='orders' element={<AdminOrder />} />
              <Route path='list' element={<AdminList />} />
              <Route path='promo' element={<AdminPromoCodes />} />
              <Route index element={<AdminList />} />
            </Route>

            {/* 404 Page - Add this if you have one */}
            {/* <Route path='*' element={<NotFound />} /> */}
          </Routes>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  )
}

export default App