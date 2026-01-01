// src/admin/pages/CollaboratorList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, User, Copy, Loader2 } from "lucide-react"; // npm install lucide-react (or remove icons if not using)
import api from "../../utils/Api";

export default function CollaboratorList() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        api.get("/api/admin/collaborator/all")
            .then((res) => {
                setList(res.data.collaborators || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load collaborators.");
                setLoading(false);
            });
    }, []);

    // Helper to copy code to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(`Copied: ${text}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-gray-500">
                <Loader2 className="animate-spin mr-2" /> Loading data...
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Collaborators</h2>
                        <p className="text-sm text-gray-500">Manage your partners and promo codes</p>
                    </div>
                    <Link 
                        to="/admin/collaborators/create" // Assuming you have a create page
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                        + Add New
                    </Link>
                </div>

                {/* Table Container */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    {list.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promo Code</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {list.map((c) => (
                                        <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                                            {/* Name Column */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                                        <User size={16} />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{c.name}</span>
                                                </div>
                                            </td>
                                            
                                            {/* Email Column */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {c.email}
                                            </td>

                                            {/* Promo Code Column */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span 
                                                    onClick={() => copyToClipboard(c.promoCode)}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 cursor-pointer hover:bg-green-200"
                                                    title="Click to copy"
                                                >
                                                    {c.promoCode} <Copy size={10} className="ml-1 opacity-50"/>
                                                </span>
                                            </td>

                                            {/* Actions Column */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link 
                                                    to={`/admin/collaborators/${c._id}`} 
                                                    className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                                >
                                                    <Edit size={16} className="mr-1" /> Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-12">
                            <div className="mx-auto h-12 w-12 text-gray-400">
                                <User size={48} strokeWidth={1} />
                            </div>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No collaborators</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new collaborator.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}