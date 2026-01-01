import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { currency } from '../../admin/Admin';
import { toast } from 'react-toastify';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Search,
  Package,
  Loader2,
  Pencil
} from 'lucide-react';

const List = () => {
  const { token, backendurl } = useOutletContext();
  const navigate = useNavigate();

  const [list, setlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch product list
  const fetchlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendurl}/api/product/list`);
      if (response.data.success) {
        setlist(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Remove product
  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

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
      toast.error(error.message);
    }
  };

  // Edit product
  const editProduct = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  useEffect(() => {
    fetchlist();
  }, []);

  // Search filter
  const searchedList = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Move out-of-stock items to bottom
  const finalList = [...searchedList].sort((a, b) => {
    const stockA = a.countInStock || 0;
    const stockB = b.countInStock || 0;

    if (stockA === 0 && stockB > 0) return 1;
    if (stockA > 0 && stockB === 0) return -1;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto mt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
          <p className="text-sm text-gray-500">
            Manage your store&apos;s catalog and stock.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-[0.8fr_2fr_1fr_1fr_0.7fr] bg-gray-50 border-b border-gray-200 py-3 px-6 text-xs font-semibold text-gray-500 uppercase">
          <span>Image</span>
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center py-20 text-gray-500">
            <Loader2 className="animate-spin h-8 w-8 mb-2 text-blue-500" />
            Loading products...
          </div>
        ) : finalList.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-gray-400">
            <Package className="h-12 w-12 mb-3" />
            No products found
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {finalList.map((item) => {
              const isOutOfStock = item.countInStock === 0;

              return (
                <div
                  key={item._id}
                  className={`grid grid-cols-[1fr_2fr_0.7fr] md:grid-cols-[0.8fr_2fr_1fr_1fr_0.7fr]
                  items-center gap-4 py-4 px-4 md:px-6 hover:bg-gray-50
                  ${isOutOfStock ? 'opacity-60' : ''}`}
                >
                  {/* Image */}
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />

                  {/* Name */}
                  <div>
                    <p className="font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 md:hidden">
                      {item.category} • {currency}
                      {item.price}
                    </p>
                  </div>

                  {/* Category */}
                  <div className="hidden md:block">
                    <span className="px-2.5 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="hidden md:block font-medium text-gray-700">
                    {currency}
                    {item.price}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end md:justify-center gap-2">
                    <button
                      onClick={() => editProduct(item._id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => remove(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
