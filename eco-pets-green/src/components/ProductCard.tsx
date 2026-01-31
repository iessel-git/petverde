import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Heart, ShoppingCart, Star, Leaf, Sparkles, TrendingUp } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isInWishlist = wishlist.includes(product.id);
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isEco && (
            <span className="flex items-center gap-1 bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              <Leaf className="w-3 h-3" />
              Eco
            </span>
          )}
          {product.isNew && (
            <span className="flex items-center gap-1 bg-sky-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="flex items-center gap-1 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              Bestseller
            </span>
          )}
          {discount > 0 && (
            <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isInWishlist 
              ? 'bg-rose-500 text-white' 
              : 'bg-white/90 text-gray-600 hover:bg-rose-50 hover:text-rose-500'
          } shadow-md`}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Button */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              isAdding 
                ? 'bg-emerald-700 text-white' 
                : 'bg-white text-emerald-700 hover:bg-emerald-600 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Added!' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Pet Type */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
            {product.petType}
          </span>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[48px] group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Eco Features */}
        {product.ecoFeatures && product.ecoFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.ecoFeatures.slice(0, 2).map((feature, i) => (
              <span key={i} className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart - Mobile */}
        <button
          onClick={handleAddToCart}
          className="md:hidden w-full mt-3 py-2 bg-emerald-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
