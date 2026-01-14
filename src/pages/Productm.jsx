import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shopcontext } from '../context/Shopcontext';
import Relatedproduct from '../components/Relatedproduct';
import { toast } from 'react-toastify';
import { FaShareAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import ShareModal from '../components/Sharemodel';
import PageTransition from '../components/Pagetransition';

const Product = () => {
  const { productId } = useParams();
  const { products, addtocart } = useContext(Shopcontext);
  const [productdata, setproductdata] = useState(null);
  const [image, setimage] = useState('');
  const [size, setsize] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  

  useEffect(() => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setproductdata(item);
      setimage(item.image[0]);
    }
  }, [productId, products]);

  const handleShareClick = () => {
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: productdata.name,
          text: 'Check out this product!',
          url,
        })
        .catch((err) => {
          console.error('Error sharing:', err);
        });
    } else {
      setIsShareOpen(true);
    }
  };
  

  return productdata ? (
    <PageTransition>
      <div className='border-t-2 pt-10 px-4 sm:px-6 lg:px-10'>
        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
          {/* Image Gallery Section */}
          <div className='flex flex-col-reverse sm:flex-row gap-4 lg:w-[55%]'>
            {/* Thumbnails */}
            <div className='flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[600px] pb-2 sm:pb-0'>
              {productdata.image.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  onClick={() => setimage(item)}
                  className={`w-20 sm:w-24 h-20 sm:h-24 cursor-pointer object-cover border-2 rounded-lg transition-all ${item === image
                      ? 'border-black shadow-lg'
                      : 'border-gray-200 hover:border-gray-400'
                    }`}
                  alt={`Thumbnail ${index + 1}`}
                  loading='lazy'
                />
              ))}
            </div>

            {/* Main Image */}
            <div className='flex-1 relative'>
              <div className='relative bg-gray-50 rounded-lg overflow-hidden'>
                <img
                  src={image}
                  loading='lazy'
                  className='w-full h-auto object-contain'
                  alt={productdata.name}
                />

                {/* Favorite Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className='absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all'
                >
                  {isFavorite ? (
                    <FaHeart className='text-red-500 text-lg' />
                  ) : (
                    <FaRegHeart className='text-gray-600 text-lg' />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className='lg:w-[45%]'>
            <h1 className='font-bold text-2xl lg:text-3xl mb-2'>{productdata.name}</h1>

            {/* Rating */}
            <div className='flex items-center gap-2 mb-4'>
              <div className='flex gap-1'>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src='https://www.svgrepo.com/show/475275/star.svg'
                    className='w-4 h-4'
                    alt='star'
                  />
                ))}
              </div>
              <span className='text-gray-600 text-sm font-medium'>(122 reviews)</span>
            </div>

            {/* Price */}
            <p className='text-3xl font-bold mb-6'>₹{productdata.price}</p>

            {/* Description */}
            <p className='text-gray-600 mb-8 leading-relaxed'>
              {productdata.description}
            </p>

            {/* Size Selection / Out of Stock */}
            {productdata.sizes.length === 0 ? (
              <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
                <p className='text-red-600 font-semibold text-lg mb-2'>
                  Out of Stock
                </p>
                <p className='text-gray-600 mb-4'>
                  New stock coming soon
                </p>
                <p className='text-green-600 font-medium mb-4'>
                  You can browse all collection
                </p>
                <Link to='/Collection'>
                  <button className='w-full bg-black hover:bg-gray-800 text-white font-medium px-8 py-3 rounded transition-colors'>
                    Browse All Collection
                  </button>
                </Link>
              </div>
            ) : (
              <>
                {/* Size Selection */}
                <div className='mb-6'>
                  <div className='flex items-center justify-between mb-3'>
                    <p className='font-semibold'>Select Size</p>

                  </div>
                  <div className='flex gap-3'>
                    {productdata.sizes.map((item, index) => (
                      <button
                        onClick={() => setsize(item)}
                        key={index}
                        className={`border-2 px-6 py-2 rounded transition-all font-medium ${item === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                          }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='space-y-3 mb-8'>
                  <button
                    onClick={() => {
                      if (!size) {
                        toast.error('Please select a size');
                        return;
                      }
                      addtocart(productdata._id, size);
                      toast.success('Added to cart!');
                    }}
                    className='w-full bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded transition-colors'
                  >
                    ADD TO CART
                  </button>

                  <button
                    onClick={handleShareClick}
                    className='w-full flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium px-6 py-4 rounded transition-all'
                  >
                    <FaShareAlt className="w-4 h-4" />
                    Share Product
                  </button>
                </div>
              </>
            )}

            {/* Product Features */}
            <div className='border-t pt-6 space-y-2 text-sm text-gray-600'>
              <p>✓ Quality Check And Fine Product</p>
              <p>✓ Cash on delivery is available</p>
              <p>✓ No returns and exchange are available within 7 days  T&C apply</p>
            </div>
          </div>
        </div>

        {/* Description & Reviews Tabs */}
        <div className='mt-16'>
          <div className='flex border-b'>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-semibold text-sm transition-colors ${activeTab === 'description'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-semibold text-sm transition-colors ${activeTab === 'reviews'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
                }`}
            >
              Reviews (122)
            </button>
          </div>

          <div className='py-8 text-sm text-gray-600 leading-relaxed space-y-4'>
            {activeTab === 'description' ? (
              <>
                <p>
                  Welcome to our exclusive thrift collection, where every piece is a unique,
                  pre-loved find curated for the modern streetwear enthusiast. We believe in
                  offering you rare and one-of-a-kind items
                  that stand out from mass-produced fashion. Because these are thrift products,
                  each item carries its own history and distinct character.
                </p>
                <p>
                  To bring these unique styles to life, we utilize advanced AI technology to
                  generate our product imagery. Please be aware that because these images are
                  AI-generated visualizations, there may be <b>slight variations in texture,
                    color, or specific details</b> between the digital image and the actual physical product.
                  We ask that you view these images as a stylistic reference, embracing the
                  authentic charm that comes with vintage and thrifted fashion.
                </p>
              </>
            ) : (
              <div className='text-center py-8'>
                <p className='text-gray-600 font-medium'>122 Customer Reviews</p>
                <p className='text-gray-500 text-sm mt-2'>Average rating: 4.8/5.0</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <Relatedproduct
          category={productdata.category}
          subcategory={productdata.subcategory}
        />

        {/* Floating Share Button */}
        <button
          onClick={handleShareClick}
          className='fixed bottom-6 right-6 bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50'
        >
          <FaShareAlt size={20} />
        </button>

        {/* Share Modal */}
        {isShareOpen && (
          <ShareModal
            url={window.location.href}
            name={productdata.name}
            onClose={() => setIsShareOpen(false)}
          />
        )}
      </div>
    </PageTransition>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;