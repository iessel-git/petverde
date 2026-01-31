import React from 'react';
import { Leaf, Recycle, TreePine, Heart, Globe, Award } from 'lucide-react';

const GreenPromise: React.FC = () => {
  const promises = [
    {
      icon: Leaf,
      title: 'Sustainable Sourcing',
      description: 'Every product is vetted for ethical and sustainable sourcing practices.'
    },
    {
      icon: Recycle,
      title: 'Eco-Friendly Packaging',
      description: 'We use recyclable, biodegradable, or compostable packaging materials.'
    },
    {
      icon: TreePine,
      title: 'Carbon Neutral Shipping',
      description: 'We offset 100% of shipping emissions through verified carbon projects.'
    },
    {
      icon: Heart,
      title: 'Animal Welfare First',
      description: 'No products tested on animals. We support rescue organizations.'
    },
    {
      icon: Globe,
      title: '1% for the Planet',
      description: 'We donate 1% of all sales to environmental nonprofits.'
    },
    {
      icon: Award,
      title: 'Certified Products',
      description: 'Look for our Green Paw badge on certified eco-friendly products.'
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840274771_adfc46d2.jpg"
          alt="Forest"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full mb-6">
            <Leaf className="w-5 h-5" />
            <span className="text-sm font-medium">Our Commitment</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            The PetVerde Green Promise
          </h2>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            We believe that caring for your pets shouldn't come at the cost of our planet. 
            Here's how we're making a difference.
          </p>
        </div>

        {/* Promise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((promise, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-emerald-500/30 rounded-xl flex items-center justify-center mb-4">
                <promise.icon className="w-7 h-7 text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{promise.title}</h3>
              <p className="text-emerald-100/80">{promise.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</p>
            <p className="text-emerald-200">Trees Planted</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">2M+</p>
            <p className="text-emerald-200">Plastic Bottles Saved</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">100%</p>
            <p className="text-emerald-200">Carbon Neutral</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">$500K</p>
            <p className="text-emerald-200">Donated to Rescues</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenPromise;
