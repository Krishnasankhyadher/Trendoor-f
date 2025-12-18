import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { currency } from '../../admin/Admin';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';

const List = () => {
  const { token, backendurl } = useOutletContext();

  const [list, setlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch product list
  const fetchlist = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/product/list`);
      if (response.data.success) {
        setlist(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Remove product
  const remove = async (id) => {
    try {
      const response = await axios.post(
        `${backendurl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchlist();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  // 🔍 Search filter
  const searchedList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📦 Move out-of-stock products to bottom
  const finalList = [...searchedList].sort((a, b) => {
    if (a.countInStock === 0 && b.countInStock > 0) return 1;
    if (a.countInStock > 0 && b.countInStock === 0) return -1;
    return 0; // keep original order
  });

  return (
    <>
      <p className="text-lg font-semibold mb-3">All Product List</p>

      {/* 🔍 Search Bar */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by product name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border border-gray-400 rounded-md text-sm outline-none focus:border-black"
        />

        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300 transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* Product Table */}
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border border-gray-400 bg-gray-100 text-sm font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Rows */}
        {finalList.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No products found
          </p>
        ) : (
          finalList.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm
                ${item.countInStock === 0 ? 'bg-gray-100 opacity-70' : ''}
              `}
            >
              <img className="w-12" src={item.image[0]} alt={item.name} />

              <div>
                <p className="truncate">{item.name}</p>
                {item.countInStock === 0 && (
                  <span className="text-xs text-red-600 font-semibold">
                    Out of stock
                  </span>
                )}
              </div>

              <p>{item.category}</p>
              <p>{currency}{item.price}</p>

              <p
                onClick={() => remove(item._id)}
                className="text-right md:text-center cursor-pointer text-red-600 font-bold text-lg hover:scale-110 transition"
              >
                ✕
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;
