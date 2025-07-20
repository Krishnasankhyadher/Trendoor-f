import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useOutletContext } from 'react-router-dom'


const AdminPromoCodes = () => {
  const { token ,backendurl } = useOutletContext()
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountAmount: '',
    minOrderAmount: '',
    maxUses: '',
    validFrom: '',
    validUntil: '',
    isActive: true
  });
  const [editMode, setEditMode] = useState(false);
  const [currentPromoId, setCurrentPromoId] = useState(null);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`${backendurl}/api/promo`, {
      headers: { 
        token: token,
        'Content-Type': 'application/json'
      }
    });
    console.log(response)
    setPromos(response.data.promos || []);
  } catch (error) {
    console.error('Fetch error:', error.response?.data || error);
    toast.error(error.response?.data?.message || 'Failed to fetch promo codes');
  } finally {
    setLoading(false);
  }
};

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        discountAmount: Number(formData.discountAmount),
        minOrderAmount: formData.minOrderAmount ? Number(formData.minOrderAmount) : 0,
        maxUses: formData.maxUses ? Number(formData.maxUses) : null,
        validFrom: formData.validFrom || null,
        validUntil: formData.validUntil || null
      };

      if (editMode) {
        await axios.put(
          `${backendurl}/api/promo/${currentPromoId}`,
          payload,
          { headers: { token: token } }
        );
        toast.success('Promo code updated successfully');
      } else {
        const response =await axios.post(
          `${backendurl}/api/promo`,
          payload,
          { headers: { token: token } }
        );
        console.log(response)
        toast.success('Promo code created successfully');
      }

      resetForm();
      await fetchPromoCodes();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.message || 'Failed to save promo code');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      discountAmount: '',
      minOrderAmount: '',
      maxUses: '',
      validFrom: '',
      validUntil: '',
      isActive: true
    });
    setEditMode(false);
    setCurrentPromoId(null);
  };

  const handleEdit = (promo) => {
    setFormData({
      code: promo.code,
      discountAmount: promo.discountAmount.toString(),
      minOrderAmount: promo.minOrderAmount?.toString() || '',
      maxUses: promo.maxUses?.toString() || '',
      validFrom: promo.validFrom ? new Date(promo.validFrom).toISOString().split('T')[0] : '',
      validUntil: promo.validUntil ? new Date(promo.validUntil).toISOString().split('T')[0] : '',
      isActive: promo.isActive
    });
    setEditMode(true);
    setCurrentPromoId(promo._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this promo code?')) return;

    setLoading(true);
    try {
      await axios.delete(`${backendurl}/api/promo/${id}`, {
        headers: { token: token, }
      });
      toast.success('Promo code deleted successfully');
      await fetchPromoCodes();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete promo code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Promo Codes</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editMode ? 'Edit Promo Code' : 'Create New Promo Code'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Code*</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                disabled={editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount Amount*</label>
              <input
                type="number"
                name="discountAmount"
                value={formData.discountAmount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Minimum Order Amount</label>
              <input
                type="number"
                name="minOrderAmount"
                value={formData.minOrderAmount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Maximum Uses (leave blank for unlimited)</label>
              <input
                type="number"
                name="maxUses"
                value={formData.maxUses}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Valid From (optional)</label>
              <input
                type="date"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Valid Until (optional)</label>
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="mr-2"
              id="isActive"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Active
            </label>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : editMode ? 'Update' : 'Create'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Promo Codes</h2>
        {loading && promos.length === 0 ? (
          <p>Loading promo codes...</p>
        ) : promos.length === 0 ? (
          <p>No promo codes found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {promos.map((promo) => (
                  <tr key={promo._id}>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">{promo.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{promo.discountAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promo.minOrderAmount ? `₹${promo.minOrderAmount}` : 'None'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promo.maxUses ? `${promo.currentUses}/${promo.maxUses}` : 'Unlimited'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        promo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {promo.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promo.validUntil ? new Date(promo.validUntil).toLocaleDateString() : 'No expiry'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleEdit(promo)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(promo._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPromoCodes;