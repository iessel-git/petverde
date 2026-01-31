import React from 'react';
import { Leaf, Gift, Star, Crown, ArrowRight } from 'lucide-react';

const LoyaltySection: React.FC = () => {
  const tiers = [
    {
      name: 'Seedling',
      points: '0 - 999',
      icon: Leaf,
      color: 'emerald',
      benefits: ['1 point per $1 spent', 'Birthday treat for your pet', 'Exclusive member deals']
    },
    {
      name: 'Sprout',
      points: '1,000 - 4,999',
      icon: Star,
      color: 'sky',
      benefits: ['1.5x points on all orders', 'Early access to sales', 'Free shipping on $35+']
    },
    {
      name: 'Evergreen',
      points: '5,000+',
      icon: Crown,
      color: 'amber',
      benefits: ['2x points on all orders', 'Free shipping always', 'VIP customer support', 'Exclusive products']
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-900 to-emerald-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full mb-6">
            <Gift className="w-5 h-5" />
            <span className="text-sm font-semibold">Rewards Program</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Green Paws Points
          </h2>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Earn points on every purchase and unlock exclusive rewards. The more you shop sustainably, 
            the more you save!
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, index) => (
            <div 
              key={tier.name}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 ${
                index === 2 ? 'ring-2 ring-amber-400' : ''
              }`}
            >
              {index === 2 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}
              
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                index === 0 ? 'bg-emerald-500/30' : 
                index === 1 ? 'bg-sky-500/30' : 'bg-amber-500/30'
              }`}>
                <tier.icon className={`w-7 h-7 ${
                  index === 0 ? 'text-emerald-300' : 
                  index === 1 ? 'text-sky-300' : 'text-amber-300'
                }`} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
              <p className="text-emerald-200 text-sm mb-4">{tier.points} points</p>
              
              <ul className="space-y-2">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-emerald-100">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-xl">
            Join Green Paws Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-emerald-200 text-sm mt-4">
            Already a member? <a href="#" className="text-white underline hover:no-underline">Sign in</a> to check your points
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoyaltySection;
