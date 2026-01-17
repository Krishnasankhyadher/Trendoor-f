import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import { useOutletContext } from "react-router-dom";
import { currency } from "../../admin/Admin";

const Order = () => {
  const { token, backendurl } = useOutletContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `${backendurl}/api/order/list`,
        { headers: { token } }
      );
      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteOrder = async (orderid) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await axios.post(
        `${backendurl}/api/order/delete`,
        { orderid },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Order deleted");
        fetchOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const updateStatus = async (orderid, status) => {
    try {
      await axios.post(
        `${backendurl}/api/order/status`,
        { orderid, status },
        { headers: { token } }
      );
      fetchOrders();
      toast.success("Status Updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const downloadPDF = async (order) => {
    const node = document.getElementById(`order-${order._id}`);
    if (!node) return;
    try {
      const img = await domtoimage.toPng(node, { bgcolor: '#ffffff' });
      const pdf = new jsPDF();
      pdf.addImage(img, "PNG", 10, 10, 190, 0);
      pdf.save(`Order_${order._id.slice(-6)}.pdf`);
    } catch {
      toast.error("PDF generation failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  // Helper for Status Colors (Delivery Status)
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Packing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Out for Delivery': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }

  // Helper for Payment Status Badge
  const getPaymentStatusBadge = (paymentStatus, method) => {
    // According to your controller: paymentStatus is 'paid' or 'pending'
    if (paymentStatus === 'paid') {
      return <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 border border-green-200">PAID</span>;
    }
    if (method === 'cod') {
      return <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">COD PENDING</span>;
    }
    return <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 border border-red-200">PAYMENT PENDING</span>;
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and track all customer orders</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-sm font-medium">
          Total Orders: {orders.length}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            id={`order-${order._id}`}
            // Logic updated: Check order.paymentStatus instead of order.payment
            className={`rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-300 ${
              order.paymentStatus !== "paid" && order.paymentMethod !== "cod"
                ? "border-red-200 bg-red-50/50" // Light warning for unpaid online orders
                : "border-gray-200 bg-white"
            }`}
          >
            {/* Order Header / Top Strip */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full border border-gray-200 shadow-sm">
                  {/* Package Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Order ID</span>
                  <div className="flex items-center">
                    <p className="text-sm font-bold text-gray-800">#{order._id.slice(-6).toUpperCase()}</p>
                    {/* Copy ID Button (Optional convenience) */}
                    <button 
                      onClick={() => {navigator.clipboard.writeText(order._id); toast.success("ID Copied")}}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      title="Copy Full ID"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Date Placed</span>
                  <span className="text-sm font-medium text-gray-700">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => downloadPDF(order)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  title="Download Invoice"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-8">

              {/* 1. Order Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items Ordered</h4>
                <div className="flex flex-col gap-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs text-gray-500 font-bold border border-gray-200">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                            Size: {item.size}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Customer Info */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Delivery Address</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-semibold text-gray-900 text-base">
                    {order.address?.firstname} {order.address?.lastname}
                  </p>
                  <p className="leading-relaxed text-gray-500">
                    {order.address?.street}, <br />
                    {order.address?.city}, {order.address?.state}<br />
                    {order.address?.zipcode}
                  </p>
                  <p className="pt-2 text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {order.address?.phone}
                  </p>
                </div>
              </div>

              {/* 3. Payment & Status (UPDATED) */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment & Status</h4>
                <div className="space-y-4">
                  
                  {/* Amount Breakdown */}
                  <div>
                    {/* Display Subtotal & Discount if Promo was used */}
                    {order.discountAmount > 0 && (
                      <div className="text-xs text-gray-500 mb-1 space-y-0.5 border-b border-gray-100 pb-1">
                        <div className="flex justify-between">
                           <span>Subtotal:</span>
                           <span>{currency}{order.originalAmount}</span>
                        </div>
                        <div className="flex justify-between text-green-600 font-medium">
                           <span>Promo ({order.promoCode}):</span>
                           <span>- {currency}{order.discountAmount}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                       <p className="text-xl font-bold text-gray-900">{currency}{order.amount}</p>
                       {getPaymentStatusBadge(order.paymentStatus, order.paymentMethod)}
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                       <span className="text-xs text-gray-500">Method:</span>
                       <span className="text-xs font-medium uppercase text-gray-700">
                          {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                       </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="relative">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`w-full text-sm font-medium border rounded px-3 py-2 outline-none cursor-pointer appearance-none ${getStatusColor(order.status)}`}
                    >
                      <option value="Order placed">Order placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    {/* Chevron Icon */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Delete Action */}
              <div className="flex md:flex-col justify-end items-end md:border-l border-gray-100 md:pl-6">
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="group flex items-center justify-center w-8 h-8 rounded-full bg-red-50 hover:bg-red-500 transition-colors"
                  title="Delete Order"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-red-500 group-hover:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
