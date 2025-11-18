import { useContext, useEffect, useState } from 'react';
import Titls from './Titls';
import { ShopDataContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const Latestcollection = () => {
  const { products } = useContext(ShopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Get the latest 10 products
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  const openFullscreen = (imageSrc, e) => {
    e.preventDefault();
    setFullscreenImage(imageSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center py-8">
        <Titls text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Step into style with our new collection dropping this season
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.length > 0 ? (
          latestProducts.map((item) => (
            <div key={item._id} className="text-gray-700 cursor-pointer group">
              <div 
                className="overflow-hidden rounded-lg cursor-zoom-in relative"
                onClick={(e) => openFullscreen(item.Image1, e)}
              >
                <img
                  src={item.Image1}
                  alt={item.name}
                  className="hover:scale-110 transition ease-in-out duration-300 w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 pointer-events-none">
                  <span className="text-white text-xs font-semibold bg-black bg-opacity-50 px-3 py-1 rounded-full">
                    Click to Zoom
                  </span>
                </div>
              </div>
              <Link to={`/product/${item._id}`}>
                <p className="pt-3 pb-1 text-sm hover:text-purple-600 transition-colors">{item.name}</p>
                <p className="text-sm font-medium">₹{item.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No products available yet</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>

      {/* Fullscreen Image Viewer with Zoom */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center cursor-pointer"
          onClick={closeFullscreen}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 transition-colors z-50 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
            onClick={closeFullscreen}
          >
            <FiX />
          </button>

          {/* Instructions */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-6 py-3 rounded-full">
            Click anywhere to close | Move mouse to zoom
          </div>

          {/* Zoomed Image */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
              style={{
                transform: 'scale(2)',
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                transition: 'transform-origin 0.1s ease-out'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Latestcollection;