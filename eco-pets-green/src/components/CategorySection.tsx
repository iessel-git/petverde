import React from 'react';
import { categories } from '../data/products';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  onCategorySelect: (petType: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ onCategorySelect }) => {
  const petTypeMap: Record<string, string> = {
    'dogs': 'Dog',
    'cats': 'Cat',
    'birds': 'Bird',
    'fish': 'Fish',
    'small-animals': 'Small Animal',
    'reptiles': 'Reptile',
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by Pet
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect eco-friendly products for every member of your family
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(petTypeMap[category.id])}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
                <span className="flex items-center gap-1 text-emerald-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
