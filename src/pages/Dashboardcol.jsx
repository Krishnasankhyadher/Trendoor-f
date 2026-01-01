// src/collaborator/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    LogOut, 
    Save, 
    Copy, 
    User, 
    Tag, 
    TrendingUp, 
    Loader2, 
    CheckCircle2 
} from "lucide-react"; 
import api from "../utils/Api";

export default function CollaboratorDashboard() {
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [testimonial, setTestimonial] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    api.get("/api/collaborator/dashboard")
      .then((res) => {
        setData(res.data);
        setTestimonial(res.data.testimonial || "");
      })
      .catch(() => navigate("/collaborator-login"));
  }, [navigate]);

  const save = async () => {
    setIsSaving(true);
    setSaveMessage(""); // Reset message
    try {
        await api.put("/api/collaborator/testimonial", { testimonial });
        setSaveMessage("Saved successfully!");
        // Clear success message after 3 seconds
        setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
        console.error(error);
        alert("Failed to save");
    } finally {
        setIsSaving(false);
    }
  };

  const logout = async () => {
    try {
        await api.post("/api/collaborator/logout");
        navigate("/collaborator-login");
    } catch (error) {
        console.error("Logout failed", error);
    }
  };

  const copyCode = () => {
    if (data?.promoCode) {
        navigator.clipboard.writeText(data.promoCode);
        alert(`Copied code: ${data.promoCode}`); // Or use a toast here
    }
  };

  if (!data) {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {data.name}!</h1>
                <p className="text-gray-500 text-sm">Manage your promo code and profile.</p>
            </div>
            <button 
                onClick={logout}
                className="mt-4 md:mt-0 flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
                <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promo Code Card */}
            <div className="bg-gradient-to-r from-gray-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 opacity-90 mb-2">
                        <Tag className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">Your Promo Code</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-4xl font-bold tracking-tight">{data.promoCode}</h2>
                        <button 
                            onClick={copyCode}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                            title="Copy Code"
                        >
                            <Copy className="w-5 h-5 text-white" />
                        </button>
                    </div>
                    <p className="mt-4 text-gray-100 text-sm">Share this code with your audience.</p>
                </div>
                {/* Decorative Icon Background */}
                <Tag className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
            </div>

            {/* Usage Stats Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Total Usage</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900">{data.usageCount}</p>
                    <p className="text-green-600 text-sm mt-1 font-medium">
                        Times your code was used
                    </p>
                </div>
                <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
            </div>
        </div>

        {/* --- Lower Section: Profile & Testimonial --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Profile Details (Read Only) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" /> Profile Details
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">Full Name</label>
                        <p className="text-gray-700 font-medium">{data.name}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-50">
                        <label className="text-xs font-semibold text-gray-400 uppercase">Email Address</label>
                        <p className="text-gray-700 font-medium">{data.email}</p>
                    </div>
                </div>
            </div>

            {/* Testimonial Editor */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Testimonial</h3>
                <p className="text-sm text-gray-500 mb-4">
                    Share your experience working with us. This may be displayed on our landing page.
                </p>
                
                <textarea
                    value={testimonial}
                    onChange={(e) => setTestimonial(e.target.value)}
                    rows={5}
                    placeholder="Write something amazing..."
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none resize-none text-gray-700 bg-gray-50"
                />

                <div className="mt-4 flex items-center justify-between">
                    {saveMessage ? (
                         <span className="text-green-600 text-sm flex items-center font-medium animate-pulse">
                            <CheckCircle2 className="w-4 h-4 mr-1" /> {saveMessage}
                         </span>
                    ) : (
                        <span></span> // Spacer
                    )}

                    <button 
                        onClick={save}
                        disabled={isSaving}
                        className={`
                            flex items-center px-6 py-2 rounded-lg text-white font-medium transition-all
                            ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}
                        `}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" /> Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}