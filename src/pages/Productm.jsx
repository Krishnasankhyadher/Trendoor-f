import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shopcontext } from '../context/Shopcontext';
import Relatedproduct from '../components/Relatedproduct';
import { toast } from 'react-toastify';
import { FaShareAlt } from 'react-icons/fa';
import ShareModal from '../components/Sharemodel';

const Product = () => {
  const { productId } = useParams();
  const { products, addtocart } = useContext(Shopcontext);
  const [productdata, setproductdata] = useState(null);
  const [image, setimage] = useState('');
  const [size, setsize] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);

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
    <div className='border-t-2 pt-10 px-6 relative'>
      {/* Main Content */}
      <div className='flex flex-col sm:flex-row gap-10'>
        {/* Thumbnails */}
        <div className='flex sm:flex-col gap-3 w-full sm:w-[15%] overflow-x-auto sm:overflow-y-auto max-h-[500px]'>
          {productdata.image.map((item, index) => (
            <img
              key={index}
              src={item}
              onClick={() => setimage(item)}
              className='w-[24%] sm:w-full sm:h-auto cursor-pointer object-cover border border-gray-200 rounded'
              alt=''
              loading='lazy'
            />
          ))}
        </div>

        {/* Main Image */}
        <div className='w-full sm:w-[45%]'>
          <img
            src={image}
            loading='lazy'
            className='w-full h-auto object-contain border border-gray-200 rounded'
            alt=''
          />
        </div>

        {/* Product Info */}
        <div className='w-full sm:w-[40%] flex flex-col justify-start'>
          <h1 className='font-semibold text-2xl mb-3'>{productdata.name}</h1>

          <div className='flex items-center gap-1 mb-3'>
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src='https://www.svgrepo.com/show/475275/star.svg'
                className='w-4 h-4'
                alt='star'
              />
            ))}
            <p className='pl-2 text-gray-500'>(122)</p>
          </div>

          <p className='text-2xl font-semibold'>₹{productdata.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>
            {productdata.description}
          </p>

          {/* Size + Button */}
          {productdata.sizes.length === 0 ? (
            <div className='my-8 text-red-500 font-semibold text-lg'>
              Out of Stock,
              <br />
              New stock coming soon
              <br />
              <p className='text-green-500 py-2'>
                You can browse all collection
              </p>
              <Link to='/Collection'>
                <button className='bg-black text-white text-base px-15 py-4 text-center'>
                  Browse All Collection
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className='flex flex-col gap-4 my-8'>
                <p>Select Size</p>
                <div className='flex gap-2'>
                  {productdata.sizes.map((item, index) => (
                    <button
                      onClick={() => setsize(item)}
                      key={index}
                      className={`border py-2 px-4 bg-gray-100 hover:bg-gray-200 ${
                        item === size ? 'border-orange-500' : ''
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  if (!size) {
                    toast.error('Please select a size');
                    return;
                  }
                  addtocart(productdata._id, size);
                  toast.success('Added to cart!');
                }}
                className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
              >
                ADD TO CART
              </button>
        <button
  onClick={handleShareClick}
  className='
    flex items-center justify-center gap-2
    px-4 py-3 
    text-sm font-medium
    border border-gray-200 rounded-md
    bg-white text-gray-700
    hover:bg-gray-50 hover:border-gray-300
    active:bg-gray-100
    transition-colors duration-150
    shadow-xs
  '
>
  <FaShareAlt className="w-4 h-4" />
  Share Product
</button>
            </>
          )}

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>Quality Check And Fine Product</p>
            <p>Cash on delivery is available</p>
            <p>No return and exchange depends on T&C</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-gray-300 px-5 py-3 text-sm'>
            Description
          </b>
          <p className='border border-gray-300 px-5 py-3 text-sm'>
            Review(122)
          </p>
        </div>
        <div className='flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500'>
          <p>
            An e-commerce platform is a digital solution that enables users to
            explore, purchase, and manage products or services online. It acts
            as a centralized marketplace where sellers showcase their offerings,
            while buyers can compare, choose, and make purchases from the
            comfort of their homes. These platforms streamline the buying
            process and eliminate the need for physical interaction, making
            shopping faster and more efficient.
          </p>
          <p>
            Each product page generally includes high-quality images, detailed
            specifications, pricing, and options such as size or color. This
            helps customers make informed decisions. With built-in features like
            cart systems, secure payment gateways, and customer support,
            e-commerce platforms have become an essential part of modern retail.
          </p>
        </div>
      </div>

      <Relatedproduct
        category={productdata.category}
        subcategory={productdata.subcategory}
      />

      {/* Floating Share Button */}
      <button
        onClick={handleShareClick}
        className='fixed bottom-5 right-5 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 z-50'
      >
        <FaShareAlt size={20} />
      </button>

      {/* Share Modal (for desktop fallback) */}
      {isShareOpen && (
        <ShareModal
          url={window.location.href}
          name={productdata.name}
          onClose={() => setIsShareOpen(false)}
        />
      )}
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
