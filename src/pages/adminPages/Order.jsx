import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { currency } from '../../admin/Admin'
import { toast } from 'react-toastify'
import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image'
import { useOutletContext } from 'react-router-dom'


const Order = () => {
  const { token ,backendurl } = useOutletContext()
  const [orders, setorders] = useState([])

  const fetchalldata = async () => {
    if (!token) return
    try {
      const response = await axios.post(`${backendurl}/api/order/list`, {}, {
        headers: { token }
      })
      if (response.data.success) {
        setorders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statushandler = async (event, orderid) => {
    try {
      const response = await axios.post(`${backendurl}/api/order/status`, {
        orderid,
        status: event.target.value
      }, { headers: { token } })

      if (response.data.success) {
        await fetchalldata()
      }
    } catch (error) {
      console.log(error)
      toast.error("Status update failed")
    }
  }

  const generatePDF = async (order) => {
    const input = document.getElementById(`order-${order._id}`);
    if (!input) return toast.error("Could not find order block");

    // Apply temporary styles to avoid unsupported color functions like oklch
    const originalColor = input.style.color;
    const originalBg = input.style.backgroundColor;
    input.style.color = '#000';
    input.style.backgroundColor = '#fff';

    try {
      const dataUrl = await domtoimage.toPng(input);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Trendoor_Order_${order._id}.pdf`);
    } catch (err) {
      toast.error("Failed to generate PDF");
      console.error(err);
    } finally {
      // Restore original styles
      input.style.color = originalColor;
      input.style.backgroundColor = originalBg;
    }
  }

  useEffect(() => {
    fetchalldata()
  }, [token])

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h3 className="text-lg font-semibold mb-4">Order Page</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            id={`order-${order._id}`}
            className="w-full max-w-[750px] bg-white border border-gray-300 rounded-lg p-5 shadow mx-auto"
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Ship To:</h2>
              <h3 className="text-xl font-semibold">{order.address?.firstname} {order.address?.lastname}</h3>
              <h4 className="text-lg">{order.address?.street}</h4>
              <h5 className="text-md">Unit {order.address?.unit || 'N/A'}</h5>
              <p className="font-bold">{order.address?.city}, {order.address?.state} {order.address?.zipcode}</p>
            </div>

            <hr className="border-t border-gray-300 my-4" />

            {/* Order Info */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
              <p className="text-sm">Thank you for buying from Trendoor.</p>
            </div>

            {/* Shipping Info Table */}
            <div className="mb-6">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="font-semibold w-1/3">Shipping Address:</td>
                    <td className="w-1/3">Order Date:</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>{order.address?.firstname} {order.address?.lastname}</td>
                   
                  </tr>
                  <tr>
                    <td>{order.address?.street}</td>
                    <td>Buyer Username:</td>
                    <td>{order.user?.username || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Unit {order.address?.unit || 'N/A'}</td>
                    <td>Seller Name:</td>
                    <td>Trendoor</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="pt-2">
                      {order.address?.city}, {order.address?.state} {order.address?.zipcode}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr className="border-t border-gray-300 my-4" />

            {/* Items Table */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Qty Ordered</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left pb-2">Product Details</th>
                    <th className="text-right pb-2">Unit Price</th>
                    <th className="text-right pb-2">Extended Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr>
                        <td className="pt-3">{item.name}</td>
                        <td className="text-right">{currency}{item.price}</td>
                        <td className="text-right">{currency}{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="text-sm text-gray-600 pb-3">Size: {item.size}</td>
                        <td></td>
                        <td></td>
                      </tr>
                     
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="text-right text-sm mb-6">
              <p className="mb-1">Sub Total: {currency}{order.amount}</p>
              <p className="font-semibold">Grand Total: {currency}{(parseFloat(order.amount) )}</p>
            </div>

           <hr className="border-t border-gray-300 my-4" />

{/* Exchange & Return Policy */}
<div className="text-sm mb-6">
  <h3 className="font-semibold mb-2">Exchange & Return Policy</h3>

  <p className="mb-2">
    At <strong>Trendoor</strong>, we offer unique, limited-stock fashion. Hence, we follow a strict <strong>no return policy</strong>. Please review size charts and product details carefully before ordering.
  </p>

  <p className="mb-2">
    <strong>Exchange is allowed only</strong> in these cases:
  </p>
  <ul className="list-disc list-inside mb-2">
    <li>Damaged or defective item</li>
    <li>Wrong size (as per size chart)</li>
    <li>Completely different or mismatched product</li>
  </ul>

  <p className="mb-2">
    Raise exchange requests within <strong>72 hours</strong> of delivery with an <strong>unboxing video</strong> and clear photos.
  </p>

  <p className="mb-2">
    Email us at <a href="mailto:Trendoorcontact@gmail.com" className="text-blue-600 underline">Trendoorcontact@gmail.com</a> with your order ID and issue details. After verification, we’ll approve the exchange and arrange pickup if valid.
  </p>

  <p className="mt-2 text-xs text-gray-600">
    *Trendoor reserves the right to reject requests that don’t meet the above conditions.
  </p>
</div>


            {/* Controls */}
            <div className="mt-4 flex flex-col md:flex-row justify-between gap-2">
              <select
                onChange={(event) => statushandler(event, order._id)}
                value={order.status}
                className="border px-3 py-1 rounded text-sm"
              >
                <option value="Order placed">Order placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

              <button
                onClick={() => generatePDF(order)}
                className="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order