import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Shopcontext = createContext();

const Shopcontextprovider = (props) => {
  const currency = '₹';
  const delivery_charge = 50;
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [search, setsearch] = useState('');
  const [showsearch, setshowsearch] = useState(false);
  const [cartitems, setcartitems] = useState({});
  const [products, setproducts] = useState([]);
  const [token, settoken] = useState('');
  const navigate = useNavigate();

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoLoading, setPromoLoading] = useState(false);

  const applyPromoCode = async (code) => {
    if (!code.trim()) return;
    
    setPromoLoading(true);
    try {
      const response = await axios.post(
        `${backendurl}/api/promo/validate`,
        { 
          code,
          userId: token ? getUserIdFromToken(token) : null,
          cartAmount: getcartamount()
        },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      if (response.data.success) {
        setPromoCode(response.data.promoCode);
        setDiscount(response.data.discount);
        setPromoApplied(true);
        toast.success("Promo code applied successfully!");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setPromoCode('');
      setDiscount(0);
      setPromoApplied(false);
      toast.error(error.response?.data?.message || error.message || "Failed to apply promo code");
    } finally {
      setPromoLoading(false);
    }
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

    let cartdata = structuredClone(cartitems);
    if (cartdata[itemid] && cartdata[itemid][size] >= 1) {
      return toast.warn('Only 1 quantity allowed per product');
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
    try {
      const response = await axios.get(`${backendurl}/api/product/list`);
      if (response.data.success) {
        setproducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getcartitems = async (token) => {
    try {
      const response = await axios.post(
        `${backendurl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setcartitems(response.data.cartdata);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
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
    search,
    setsearch,
    showsearch,
    setshowsearch,
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
    promoLoading
  };

  return (
    <Shopcontext.Provider value={value}>
      {props.children}
    </Shopcontext.Provider>
  );
};

export default Shopcontextprovider;
export { Shopcontext };