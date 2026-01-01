import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';
import { Upload, Check, Loader2, DollarSign } from 'lucide-react'; // Import icons

const Add = () => {
  const { token, backendurl } = useOutletContext();

  // Loading state for better UX
  const [loading, setLoading] = useState(false);

  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [price, setprice] = useState('249');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('women');
  const [name, setname] = useState('');
  const [bestseller, setbestseller] = useState(false);
  const [subcategory, setsubcategory] = useState('topwear');
  const [size, setsize] = useState([]);

  const onsubmithandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const formdata = new FormData();

      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("subcategory", subcategory);
      formdata.append("size", JSON.stringify(size));
      formdata.append("bestseller", bestseller);

      image1 && formdata.append("image1", image1);
      image2 && formdata.append("image2", image2);
      image3 && formdata.append("image3", image3);
      image4 && formdata.append("image4", image4);

      const response = await axios.post(backendurl + "/api/product/add", formdata, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setname('');
        setdescription('');
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setprice('');
        setsize([]); // Clear sizes
        setbestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
        setLoading(false); // Stop loading
    }
  };

  // Helper component for Image Upload slots
  const ImageUploadSlot = ({ id, image, setImage }) => (
    <label htmlFor={id} className="cursor-pointer group">
        <div className={`
            border-2 border-dashed rounded-lg h-24 w-24 flex items-center justify-center transition-all
            ${image ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'}
        `}>
            {image ? (
                <img className="h-full w-full object-cover rounded-lg" src={URL.createObjectURL(image)} alt="" />
            ) : (
                <div className="text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto group-hover:text-blue-500" />
                    <span className="text-[10px] text-gray-500">Upload</span>
                </div>
            )}
        </div>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id={id} hidden />
    </label>
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        <p className="text-sm text-gray-500">Fill in the details to create a new product inventory item.</p>
      </div>

      <form onSubmit={onsubmithandler} className="flex flex-col gap-6">
        
        {/* --- Image Section --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          <div className="flex gap-4">
            <ImageUploadSlot id="image1" image={image1} setImage={setimage1} />
            <ImageUploadSlot id="image2" image={image2} setImage={setimage2} />
            <ImageUploadSlot id="image3" image={image3} setImage={setimage3} />
            <ImageUploadSlot id="image4" image={image4} setImage={setimage4} />
          </div>
          <p className="text-xs text-gray-400 mt-2">Recommended size: 500x500px. Formats: PNG, JPG.</p>
        </div>

        {/* --- Product Info Section --- */}
        <div className="grid gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input 
                onChange={(e) => setname(e.target.value)} 
                value={name} 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                placeholder="e.g. Cotton T-Shirt" 
                required 
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
                onChange={(e) => setdescription(e.target.value)} 
                value={description} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-32 resize-none" 
                placeholder="Write a detailed description..." 
                required 
            />
            </div>
        </div>

        {/* --- Settings Grid (Category, Sub, Price) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select onChange={(e) => setcategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                <select onChange={(e) => setsubcategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="topwear">Topwear</option>
                    <option value="bottomwear">Bottomwear</option>
                    <option value="winterwear">Winterwear</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                        onChange={(e) => setprice(e.target.value)} 
                        value={price} 
                        type="number" 
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                        placeholder="0.00" 
                    />
                </div>
            </div>
        </div>

        {/* --- Sizes Section --- */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Available Sizes</label>
            <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map((item) => (
                    <div 
                        key={item}
                        onClick={() => setsize(prev => prev.includes(item) ? prev.filter(s => s !== item) : [...prev, item])}
                        className={`
                            px-4 py-2 rounded-full cursor-pointer transition-colors border select-none
                            ${size.includes(item) 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
                        `}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>

        {/* --- Checkbox Section --- */}
        <div className="flex items-center gap-2 mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <input 
                onChange={() => setbestseller(prev => !prev)} 
                checked={bestseller} 
                type="checkbox" 
                id="bestseller" 
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 cursor-pointer"
            />
            <label className="cursor-pointer text-sm text-gray-700" htmlFor="bestseller">
                Mark as <span className="font-semibold">Bestseller</span>
            </label>
        </div>

        {/* --- Submit Button --- */}
        <button 
            type="submit" 
            disabled={loading}
            className={`
                w-full md:w-auto md:self-end px-8 py-3 rounded-lg text-white font-medium transition-all shadow-md
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}
            `}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" /> Adding...
                </span>
            ) : (
                "Add Product"
            )}
        </button>

      </form>
    </div>
  );
};

export default Add;