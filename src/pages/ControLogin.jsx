// src/collaborator/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2, LayoutDashboard } from "lucide-react"; 
import api from "../utils/Api";

export default function CollaboratorLogin() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError(null); 
  };

const submit = async (e) => {
  e.preventDefault();

  const res = await api.post("/api/collaborator/login", formData);

  if (res.data.success) {
    // ✅ STORE TOKEN
    localStorage.setItem("collabToken", res.data.token);
    navigate("/collaborator");
  } else {
    setError(res.data.message);
  }
};


  return (
    <div className="min-h-screen bg-black-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-black-600">
            <LayoutDashboard size={48} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black-900">
          Collaborator Portal
        </h2>
        <p className="mt-2 text-center text-sm text-black-600">
          Sign in to manage your dashboard
        </p>
      </div>

      {/* Form Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-100">
          
          <form className="space-y-6" onSubmit={submit}>
            
            {/* Error Banner */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md flex items-center">
                    <span className="font-medium">Error:</span>&nbsp;{error}
                </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-black-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-black-300 rounded-lg focus:ring-black-500 focus:border-black-500 sm:text-sm placeholder-black-400 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-black-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-black-300 rounded-lg focus:ring-black-500 focus:border-black-500 sm:text-sm placeholder-black-400 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`
                    w-full flex justify-center items-center py-2.5 px-4 border border-transparent 
                    rounded-lg shadow-sm text-sm font-medium text-white 
                    transition-all duration-200
                    ${loading ? 'bg-black-400 cursor-not-allowed' : 'bg-black hover:bg-black-700 hover:shadow-md'}
                `}
              >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> Signing in...
                    </>
                ) : (
                    <>
                        <LogIn className="-ml-1 mr-2 h-4 w-4" /> Sign In
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