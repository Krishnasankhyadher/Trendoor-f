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
      const res = await axios.post(
        `${backendurl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (res.data.success) setOrders(res.data.orders);
      else toast.error(res.data.message);
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
    } catch {
      toast.error("Failed to update status");
    }
  };

  const downloadPDF = async (order) => {
    const node = document.getElementById(`order-${order._id}`);
    if (!node) return;

    try {
      const img = await domtoimage.toPng(node);
      const pdf = new jsPDF();
      pdf.addImage(img, "PNG", 10, 10, 190, 0);
      pdf.save(`Order_${order._id}.pdf`);
    } catch {
      toast.error("PDF generation failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      <div className="overflow-x-auto bg-white border rounded">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Items</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Delete</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} id={`order-${order._id}`} className="hover:bg-gray-50">
                <td className="p-3 border">{order._id.slice(-6)}</td>

                <td className="p-3 border">
                  {order.address?.firstname} {order.address?.lastname}
                  <div className="text-xs text-gray-500">
                    {order.address?.city}
                  </div>
                </td>

                <td className="p-3 border">
                  {order.items.map((item, i) => (
                    <div key={i} className="text-xs">
                      • {item.name} ({item.size}) × {item.quantity}
                    </div>
                  ))}
                </td>

                <td className="p-3 border font-medium">
                  {currency}{order.amount}
                </td>

                <td className="p-3 border">
                  {new Date(order.date).toLocaleDateString()}
                </td>

                <td className="p-3 border">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-xs"
                  >
                    <option>Order placed</option>
                    <option>Packing</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                  </select>
                </td>
                <td className="p-3 border">

                <button
                  onClick={() => deleteOrder(order._id)}
                  className="text-xs bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                </td>

                <td className="p-3 border">
                  <button
                    onClick={() => downloadPDF(order)}
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default Order;