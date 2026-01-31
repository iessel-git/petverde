import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer M.',
      location: 'Portland, OR',
      pet: 'Max, Golden Retriever',
      rating: 5,
      text: 'PetVerde has completely changed how I shop for Max. The quality of the eco-friendly products is outstanding, and I love knowing that my purchases are helping the planet. The subscription service saves me so much time!',
      image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840075862_1bf6d2c0.jpg'
    },
    {
      id: 2,
      name: 'David K.',
      location: 'Seattle, WA',
      pet: 'Luna, Tabby Cat',
      rating: 5,
      text: 'Finally, a pet store that cares about sustainability! Luna loves the natural toys, and I appreciate the transparent sourcing information. The Green Paws Points program is a great bonus.',
      image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840168096_2f1f426f.jpg'
    },
    {
      id: 3,
      name: 'Sarah L.',
      location: 'Austin, TX',
      pet: 'Buddy & Bella, Rescue Dogs',
      rating: 5,
      text: 'As someone who adopted two rescue dogs, finding a company that supports animal welfare is important to me. PetVerde\'s commitment to rescue organizations and sustainable products makes them my go-to pet store.',
      image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840129721_dec2dcca.jpg'
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            What Pet Parents Say
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-emerald-200 mb-6" />
            
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Image */}
              <div className="md:col-span-1">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].pet}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < testimonials[activeIndex].rating 
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-gray-200'
                      }`} 
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-bold text-gray-800">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[activeIndex].location}</p>
                  <p className="text-sm text-emerald-600 font-medium">{testimonials[activeIndex].pet}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'bg-emerald-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
