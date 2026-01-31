import React, { useState, useMemo, useRef } from 'react';
import { products, Product } from '../data/products';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import { Package } from 'lucide-react';

interface ProductGridProps {
  searchQuery: string;
  initialPetType?: string;
  showEcoOnly?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  searchQuery, 
  initialPetType = 'All',
  showEcoOnly: initialShowEcoOnly = false 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPetType, setSelectedPetType] = useState(initialPetType);
  const [showEcoOnly, setShowEcoOnly] = useState(initialShowEcoOnly);
  const [sortBy, setSortBy] = useState('featured');
  const gridRef = useRef<HTMLDivElement>(null);

  // Update filters when props change
  React.useEffect(() => {
    setSelectedPetType(initialPetType);
  }, [initialPetType]);

  React.useEffect(() => {
    setShowEcoOnly(initialShowEcoOnly);
  }, [initialShowEcoOnly]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.petType.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Pet type filter
    if (selectedPetType !== 'All') {
      result = result.filter(p => p.petType === selectedPetType);
    }

    // Eco filter
    if (showEcoOnly) {
      result = result.filter(p => p.isEco);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - bestsellers first
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPetType, showEcoOnly, sortBy]);

  return (
    <section ref={gridRef} id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {selectedPetType !== 'All' ? `${selectedPetType} Products` : 'All Products'}
          </h2>
          <p className="text-gray-600">
            {showEcoOnly 
              ? 'Eco-certified products for sustainable pet care'
              : 'Browse our complete collection of premium pet products'
            }
          </p>
        </div>

        {/* Filters */}
        <ProductFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPetType={selectedPetType}
          setSelectedPetType={setSelectedPetType}
          showEcoOnly={showEcoOnly}
          setShowEcoOnly={setShowEcoOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
          productCount={filteredProducts.length}
        />

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
