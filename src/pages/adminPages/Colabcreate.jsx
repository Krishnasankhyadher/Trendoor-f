// src/admin/pages/CollaboratorCreate.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Save, ArrowLeft, Loader2 } from "lucide-react"; // npm install lucide-react
import api from "../../utils/Api";

export default function CollaboratorCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    promoCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

 const submit = async (e) => {
    e.preventDefault();
    try {
      // Send the request
    const adminToken = localStorage.getItem("adminToken");

const res = await api.post(
  "/api/admin/collaborator/add",
  form,
  {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  }
);

      
      if (res.data.success) {
        alert("Collaborator created successfully!");
        // Optional: clear form
        setForm({ name: "", email: "", password: "", promoCode: "" });
      } else {
        alert("Failed: " + res.data.message);
      }
    } catch (error) {
      // This catches 400/500 errors
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link 
            to="/admin/collaborators" 
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6 transition"
        >
            <ArrowLeft size={16} className="mr-1" /> Back to List
        </Link>

        {/* Card Container */}
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 border border-gray-100">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Add New Collaborator</h2>
            <p className="text-sm text-gray-500">Create a partner account and assign a promo code.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={submit}>
            
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password Input - Note the type="password" */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Promo Code Input */}
            <div>
              <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700">Promo Code</label>
              <div className="mt-1">
                <input
                  id="promoCode"
                  name="promoCode"
                  type="text"
                  required
                  value={form.promoCode}
                  // Force uppercase for promo codes usually helps data consistency
                  onChange={(e) => setForm({...form, promoCode: e.target.value.toUpperCase()})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm uppercase tracking-wider"
                  placeholder="SUMMER2024"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors"
              >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" /> Creating...
                    </>
                ) : (
                    <>
                        <Save className="mr-2 h-4 w-4" /> Create Collaborator
                    </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}