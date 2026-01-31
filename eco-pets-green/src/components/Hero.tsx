import React from 'react';
import { Leaf, ArrowRight, Truck, Shield, Award } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840075862_1bf6d2c0.jpg"
          alt="Happy dog in nature"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <Leaf className="w-5 h-5" />
            <span className="text-sm font-medium">Eco-Certified Pet Products</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Where Pets Thrive,{' '}
            <span className="text-emerald-300">Naturally.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-emerald-100 mb-8 leading-relaxed">
            Discover premium, sustainable products for your beloved companions. 
            Every purchase supports a greener planet and happier pets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={onShopNow}
              className="group px-8 py-4 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-emerald-600/30 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-emerald-600/50 transition-all flex items-center justify-center gap-2">
              <Leaf className="w-5 h-5" />
              Our Green Promise
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-white/70">On orders $50+</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">100% Safe</p>
                <p className="text-xs text-white/70">Vet approved</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Eco Certified</p>
                <p className="text-xs text-white/70">Sustainable sourcing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
