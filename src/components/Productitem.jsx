import React, { useContext, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { Link } from 'react-router-dom'
import LazyImage from './Lazyload'

const Productitem = ({ id, image, name, price }) => {
    
    const { currency, addtocart, products } = useContext(Shopcontext)
    const [btnState, setBtnState] = useState('default');

    const handleAddToCart = async () => {
        if (btnState !== 'default') return;
        setBtnState('loading');
        
        const productData = products.find(product => product._id === id);
        const sizeToAdd = (productData && productData.sizes?.length > 0) ? productData.sizes[0] : null;

        await addtocart(id, sizeToAdd);
        setBtnState('success');
        setTimeout(() => setBtnState('default'), 1500);
    }

    return (
        <div className='group text-gray-700 cursor-pointer flex flex-col h-full'>
            
            {/* Image Section */}
            {/* Note: We removed 'overflow-hidden' from here because LazyImage handles it now */}
            <Link to={`/product/${id}`} className='flex-grow relative block'>
                <LazyImage 
                    // This class is passed to the <img> tag inside LazyImage for the zoom effect
                    className='group-hover:scale-110' 
                    src={image[0]} 
                    alt={name} 
                />
            </Link>

            {/* Product Details */}
            <div className='pt-3 pb-1'>
                <Link to={`/product/${id}`} className='text-sm hover:text-black transition-colors line-clamp-1'>
                    {name}
                </Link>
                <p className='text-sm font-medium mt-1'>{currency}{price}</p>
            </div>

            {/* Animated Button */}
            <button 
                onClick={handleAddToCart}
                disabled={btnState !== 'default'}
                className={`w-full text-xs font-bold uppercase py-2 mt-2 transition-all duration-300 transform 
                ${btnState === 'default' ? 'bg-black text-white' : ''}
                ${btnState === 'loading' ? 'bg-gray-400 text-white cursor-wait scale-95' : ''}
                ${btnState === 'success' ? 'bg-green-600 text-white scale-100' : ''}
                ${btnState === 'default' ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0' : 'opacity-100 translate-y-0'}
                `}
            >
                {btnState === 'default' && "Add to Cart"}
                {btnState === 'loading' && "Adding..."}
                {btnState === 'success' && "Added! ✓"}
            </button>
        </div>
    )
}

export default Productitem