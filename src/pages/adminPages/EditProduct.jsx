import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Upload, X } from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendurl, token } = useOutletContext();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    sizes: [],
    bestseller: false
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  const [existingImages, setExistingImages] = useState([]);

  // Predefined sizes for the selector
  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  /* ---------------- FETCH PRODUCT ---------------- */
  const fetchProduct = async () => {
    try {
      const res = await axios.post(
        `${backendurl}/api/product/single`,
        { productid: id },
        { headers: { token } }
      );

      if (res.data.success) {
        const p = res.data.product;
        setFormData({
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          subcategory: p.subcategory || "",
          sizes: p.sizes || [],
          bestseller: p.bestseller || false
        });
        setExistingImages(p.image || []);
      } else {
        toast.error("Product not found");
      }
    } catch (err) {
      toast.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Logic to toggle sizes in the array
  const toggleSize = (size) => {
    setFormData((prev) => {
      const currentSizes = prev.sizes;
      if (currentSizes.includes(size)) {
        return { ...prev, sizes: currentSizes.filter((s) => s !== size) };
      } else {
        return { ...prev, sizes: [...currentSizes, size] };
      }
    });
  };

  const handleImageChange = (e) => {
    setImages((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0]
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const submitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append("productid", id);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("subcategory", formData.subcategory);
      data.append("size", JSON.stringify(formData.sizes));
      data.append("bestseller", formData.bestseller);

      Object.keys(images).forEach((key) => {
        if (images[key]) data.append(key, images[key]);
      });

      const res = await axios.post(
        `${backendurl}/api/product/edit`,
        data,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        navigate("/admin/list");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin w-10 h-10 text-gray-800" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-start pt-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
          <span className="text-sm text-gray-500">ID: {id}</span>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              placeholder="e.g. Classic Cotton T-Shirt"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              rows="4"
              placeholder="Write a detailed description..."
            />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          {/* Sizes Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Sizes</label>
            <div className="flex gap-3">
              {availableSizes.map((size) => (
                <div
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border rounded cursor-pointer transition-colors ${
                    formData.sizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-3">Update Images</label>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {["image1", "image2", "image3", "image4"].map((img, index) => (
                 <label key={img} className="cursor-pointer group">
                   <div className="h-32 w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 group-hover:border-black group-hover:text-black transition-colors relative overflow-hidden bg-gray-50">
                     {images[img] ? (
                       // Preview of NEWLY selected image
                       <img 
                         src={URL.createObjectURL(images[img])} 
                         className="w-full h-full object-cover" 
                         alt="New Preview" 
                       />
                     ) : existingImages[index] ? (
                       // Preview of EXISTING image
                       <img 
                         src={existingImages[index]} 
                         className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
                         alt="Existing" 
                       />
                     ) : (
                       // Empty State
                       <>
                         <Upload className="w-6 h-6 mb-1" />
                         <span className="text-xs font-medium">Upload</span>
                       </>
                     )}
                     
                     {/* Overlay for "Change" text */}
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">CHANGE</span>
                     </div>
                   </div>
                   <input
                     type="file"
                     name={img}
                     onChange={handleImageChange}
                     className="hidden"
                     accept="image/*"
                   />
                 </label>
               ))}
             </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border border-gray-200 w-fit">
            <input
              type="checkbox"
              name="bestseller"
              id="bestseller"
              checked={formData.bestseller}
              onChange={handleChange}
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
            />
            <label htmlFor="bestseller" className="text-sm font-medium text-gray-700 cursor-pointer">
              Add to Bestseller
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
             <button
               type="button"
               onClick={() => navigate('/admin/list')}
               className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
             >
               Cancel
             </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2 bg-black text-white rounded shadow hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform active:scale-95"
            >
              {saving ? (
                 <div className="flex items-center gap-2">
                   <Loader2 className="animate-spin w-4 h-4" /> Saving...
                 </div>
              ) : (
                "Update Product"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;