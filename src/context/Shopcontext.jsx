
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Shopcontext = createContext();

const Shopcontextprovider = (props) => {
  const currency = '₹';
  const delivery_charge = 50;
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [cartitems, setcartitems] = useState({});
  const [products, setproducts] = useState([]);
  const [token, settoken] = useState('');
  const [loading, setLoading] = useState({
    global: false,
    products: true,
    cart: false,
    auth: false
  });

  // Payment states (added new states)
  const [paymentstatus, setpaymentstatus] = useState(null);
  const [currentorder, setcurrentorder] = useState(null);


  const navigate = useNavigate();
  const location = useLocation();

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoLoading, setPromoLoading] = useState(false);

  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
  }, [location.search]);

  // Helper function for async operations with loading states
  const withLoading = async (fn, loadingType = 'global') => {
    try {
      setLoading(prev => ({ ...prev, [loadingType]: true }));
      return await fn();
    } finally {
      setLoading(prev => ({ ...prev, [loadingType]: false }));
    }
  };
  // NEW: PhonePe payment functions
  const initiatephonepay = async (orderid, amount) => {
    return withLoading(async () => {
      try {
        const response = await axios.post(
          `${backendurl}/api/payment/initiate`,
          {
            amount: amount, // Convert to paise
            orderId: orderid,
            userId: getUserIdFromToken(token)
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setcurrentorder({ orderid, amount });
          return response.data.url;
        }
        throw new Error(response.data.message || 'Payment initiation failed');
      } catch (error) {
        console.error('Payment error:', error);
        toast.error(error.response?.data?.message || 'Payment initiation failed');
        throw error;
      }
    }, 'payment');
  };

  // NEW: Verify payment status
  const verifypayment = async (transactionid) => {
    return withLoading(async () => {
      try {
        const response = await axios.get(
          `${backendurl}/api/payment/status/${transactionid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setpaymentstatus(response.data.paymentStatus);
          return response.data;
        }
        throw new Error(response.data.message || 'Payment verification failed');
      } catch (error) {
        console.error('Payment verification error:', error);
        throw error;
      }
    }, 'payment');
  };


  const performSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (location.pathname === '/search') {
      navigate('/search');
    }
  };

  const applyPromoCode = async (code) => {
    if (!code.trim()) return;

    return withLoading(async () => {
      try {
        setPromoLoading(true);
        const response = await axios.post(
          `${backendurl}/api/promo/validate`,
          {
            code,
            userId: token ? getUserIdFromToken(token) : null,
            cartAmount: getcartamount()
          },
          { headers: token ? { token: token } : {} }
        );

        if (response.data.success) {
          setPromoCode(response.data.promoCode);
          setDiscount(response.data.discount);
          setPromoApplied(true);
          toast.success("Promo code applied successfully!");
          return true;
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        setPromoCode('');
        setDiscount(0);
        setPromoApplied(false);
        toast.error(error.response?.data?.message || error.message || "Failed to apply promo code");
        return false;
      } finally {
        setPromoLoading(false);
      }
    }, 'global');
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscount(0);
    setPromoApplied(false);
  };

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (e) {
      console.error("Error parsing token:", e);
      return null;
    }
  };

  const addtocart = async (itemid, size) => {
    if (!size) return toast.error('Select your size');

    return withLoading(async () => {
      let cartdata = structuredClone(cartitems);
      if (cartdata[itemid] && cartdata[itemid][size] >= 1) {
        toast.warn('Only 1 quantity allowed per product');
        return;
      }

      if (!cartdata[itemid]) cartdata[itemid] = {};
      cartdata[itemid][size] = 1;
      setcartitems(cartdata);

      if (token) {
        try {
          await axios.post(
            `${backendurl}/api/cart/add`,
            { itemid, size },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      }
    }, 'cart');
  };

  const getcartcount = () => {
    let totalcount = 0;
    for (const itemid in cartitems) {
      for (const size in cartitems[itemid]) {
        if (cartitems[itemid][size] > 0) {
          totalcount += cartitems[itemid][size];
        }
      }
    }
    return totalcount;
  };

  const updatequantity = async (itemid, size, quantity) => {
    if (quantity > 1) return toast.warn('Only 1 quantity allowed per product');

    return withLoading(async () => {
      let cartdata = structuredClone(cartitems);
      if (!cartdata[itemid]) cartdata[itemid] = {};

      if (quantity === 0) {
        delete cartdata[itemid][size];
        if (Object.keys(cartdata[itemid]).length === 0) {
          delete cartdata[itemid];
        }
      } else {
        cartdata[itemid][size] = quantity;
      }

      setcartitems(cartdata);

      if (token) {
        try {
          await axios.post(
            `${backendurl}/api/cart/update`,
            { itemid, size, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      }
    }, 'cart');
  };

  const getcartamount = () => {
    let totalAmount = 0;
    for (const items in cartitems) {
      const itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue;
      for (const size in cartitems[items]) {
        if (cartitems[items][size] > 0) {
          totalAmount += itemInfo.price * cartitems[items][size];
        }
      }
    }
    return totalAmount;
  };

  const getproductdata = async () => {
    return withLoading(async () => {
      try {
        const response = await axios.get(`${backendurl}/api/product/list`);
        if (response.data.success) {
          const fifoProducts = [...response.data.products].sort(
            (a, b) => a.date - b.date
          );
          

          setproducts(fifoProducts);

        } else {
          toast.error(response.data.message);
          setproducts([]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        setproducts([]);
      }
    }, 'products');
  };

  const getcartitems = async (token) => {
  return withLoading(async () => {
    try {
      const response = await axios.post(
        `${backendurl}/api/cart/get`,
        {},
        {
          headers: {
            token: token   // 👈 THIS is the key fix
          }
        }
      );

      if (response.data.success) {
        setcartitems(response.data.cartdata);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }, 'cart');
};

  const loginUser = async (credentials) => {
    return withLoading(async () => {
      try {
        const response = await axios.post(`${backendurl}/api/auth/login`, credentials);
        if (response.data.success) {
          const { token } = response.data;
          settoken(token);
          localStorage.setItem('token', token);
          await getcartitems(token);
          return true;
        }
        throw new Error(response.data.message || 'Login failed');
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Login failed");
        return false;
      }
    }, 'auth');
  };

  const registerUser = async (userData) => {
    return withLoading(async () => {
      try {
        const response = await axios.post(`${backendurl}/api/auth/register`, userData);
        if (response.data.success) {
          toast.success("Registration successful! Please login.");
          return true;
        }
        throw new Error(response.data.message || 'Registration failed');
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Registration failed");
        return false;
      }
    }, 'auth');
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    settoken('');
    setcartitems({});
    navigate('/login');
  };

  useEffect(() => {
    getproductdata();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      settoken(storedToken);
      getcartitems(storedToken);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_charge,
    cartitems,
    addtocart,
    getcartcount,
    updatequantity,
    getcartamount,
    navigate,
    backendurl,
    token,
    settoken,
    setcartitems,
    promoCode,
    setPromoCode,
    promoApplied,
    setPromoApplied,
    discount,
    setDiscount,
    applyPromoCode,
    removePromoCode,
    promoLoading,
    // Search related
    searchQuery,
    performSearch,
    clearSearch,
    // Loading states
    loading,
    // Auth functions
    loginUser,
    registerUser,
    logoutUser,
    // Data fetching
    refreshProducts: getproductdata,
    refreshCart: getcartitems,
    // Helper function
    withLoading,
    // NEW: Payment related values
    paymentstatus,
    currentorder,
    initiatephonepay,
    verifypayment
  };

  return (
    <Shopcontext.Provider value={value}>
      {props.children}
    </Shopcontext.Provider>
  );
};

export default Shopcontextprovider;
export { Shopcontext };