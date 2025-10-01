import { Routes, Route } from 'react-router-dom';
import Placeorder from './pages/Placeorder';
import PaymentCallbackHandler from './components/PaymentCallbackHandler';
import OrderSuccess from './pages/OrderSuccess';
import PaymentFailed from './pages/PaymentFailed';
// Import other components as needed

const AppRoutes = () => {
  return (
    <Routes>
      {/* Existing routes */}
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Placeorder />} />
      
      {/* New payment-related routes */}
      <Route 
        path="/payment-callback/:transactionId" 
        element={<PaymentCallbackHandler />} 
      />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />
      
      {/* Other existing routes */}
      {/* ... */}
    </Routes>
  );
};

export default AppRoutes;