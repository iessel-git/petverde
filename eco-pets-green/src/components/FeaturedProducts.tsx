import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  onViewAll: () => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onViewAll }) => {
  const featuredProducts = products.filter(p => p.isBestseller).slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Customer Favorites</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Bestselling Products
            </h2>
            <p className="text-gray-600 mt-2">
              Discover what other pet parents love most
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="group flex items-center gap-2 text-emerald-600 font-semibold mt-4 md:mt-0 hover:text-emerald-700 transition-colors"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
