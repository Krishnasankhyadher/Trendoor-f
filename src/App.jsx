import React, { Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom' // Added useLocation
import { ToastContainer } from 'react-toastify'
import { AnimatePresence } from 'framer-motion' // Added AnimatePresence
import 'react-toastify/dist/ReactToastify.css'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";


// Components
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/Scrolltotop'
import PaymentCallbackHandler from './components/PayementCallbackhandler'
import PaymentCallback from './pages/PaymentCallback'

// Lazy Loaded Pages
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
const TermsAndConditions = React.lazy(() => import('./pages/Termsandcondition'))
const SearchPage = React.lazy(() => import('./pages/Searchpage'))
const OrderSuccess = React.lazy(() => import('./pages/OrderSuccess'))
const OrderFailed = React.lazy(() => import('./pages/OrderFailed'))

// Admin Routes (Lazy)
const Admin = React.lazy(() => import('./admin/Admin'))
const AdminAdd = React.lazy(() => import('./pages/adminPages/Add'))
const AdminOrder = React.lazy(() => import('./pages/adminPages/Order'))
const AdminList = React.lazy(() => import('./pages/adminPages/List'))
const AdminPromoCodes = React.lazy(() => import('./pages/adminPages/Promotion'))
import CollaboratorLogin from './pages/ControLogin'
import CollaboratorDashboard from './pages/Dashboardcol'
import CollaboratorProtected from './components/Protected'
import CollaboratorCreate from './pages/adminPages/Colabcreate'
import CollaboratorList from './pages/adminPages/Listcolab'
import EditProduct from './pages/adminPages/EditProduct'
import AnnouncementBar from './components/Anouncement'
const App = () => {
  // Hook to detect route changes for animation
  const location = useLocation();

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen flex flex-col'>
    
      {/* 🔹 Vercel Analytics (ADD HERE) */}
      <Analytics />
      <SpeedInsights />

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
      <AnnouncementBar/>

      <Navbar />

      {/* ScrollToTop handles scroll reset on route change */}
      <ScrollToTop />

      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          {/* AnimatePresence enables the exit animations */}
          <AnimatePresence mode='wait'>
            {/* Location and Key are required for Framer Motion to detect page changes */}
            <Routes location={location} key={location.pathname}>

              {/* --- Public Routes --- */}
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
              <Route
                path="/collaborator-login"
                element={<CollaboratorLogin />}
              />
              <Route
                path="/collaborator"
                element={
                  <CollaboratorProtected>
                    <CollaboratorDashboard />
                  </CollaboratorProtected>
                }
              />

              {/* --- Payment & Status Routes --- */}
              <Route path="/payment-callback" element={<PaymentCallback />} />
              <Route path="/ordersuccess" element={<OrderSuccess />} />
              <Route path="/orderfailed" element={<OrderFailed />} />

              {/* --- Admin Routes --- */}
              {/* Note: Admin routes usually don't need fancy transitions, but they are included here */}
              <Route path='/admin' element={<Admin />}>
                <Route path='add' element={<AdminAdd />} />
                <Route path='orders' element={<AdminOrder />} />
                <Route path='list' element={<AdminList />} />
                <Route path='promo' element={<AdminPromoCodes />} />
                <Route path="collaborators" element={<CollaboratorList />} />
                <Route path="collaborators/create" element={<CollaboratorCreate />} />
                <Route path="/admin/edit/:id" element={<EditProduct />} />

                <Route index element={<AdminList />} />
              </Route>

            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default App