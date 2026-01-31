import React from 'react';
import { productCategories, petTypes } from '../data/products';
import { Filter, X, Leaf, SlidersHorizontal } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPetType: string;
  setSelectedPetType: (petType: string) => void;
  showEcoOnly: boolean;
  setShowEcoOnly: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  productCount: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedPetType,
  setSelectedPetType,
  showEcoOnly,
  setShowEcoOnly,
  sortBy,
  setSortBy,
  productCount
}) => {
  const hasActiveFilters = selectedCategory !== 'All' || selectedPetType !== 'All' || showEcoOnly;

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedPetType('All');
    setShowEcoOnly(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Filter Icon & Count */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">Filters</span>
          </div>
          <span className="text-sm text-gray-500">
            {productCount} products
          </span>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-gray-200" />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {productCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-gray-200" />

        {/* Pet Type Filter */}
        <div className="flex flex-wrap gap-2">
          {petTypes.slice(0, 4).map((petType) => (
            <button
              key={petType}
              onClick={() => setSelectedPetType(petType)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedPetType === petType
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {petType}
            </button>
          ))}
        </div>

        {/* Eco Filter */}
        <button
          onClick={() => setShowEcoOnly(!showEcoOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            showEcoOnly
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          <Leaf className="w-4 h-4" />
          Eco Only
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2 ml-auto">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-100 border-0 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
