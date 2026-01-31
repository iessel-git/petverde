import React from 'react';
import { RefreshCw, Percent, Calendar, CheckCircle } from 'lucide-react';

const SubscribeSection: React.FC = () => {
  const benefits = [
    {
      icon: Percent,
      title: 'Save 20%',
      description: 'On every auto-ship order'
    },
    {
      icon: RefreshCw,
      title: 'Never Run Out',
      description: 'Automatic deliveries on your schedule'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Pause, skip, or cancel anytime'
    }
  ];

  const popularSubscriptions = [
    { name: 'Premium Dog Food', frequency: 'Every 4 weeks', savings: '$11.00/month' },
    { name: 'Cat Litter Bundle', frequency: 'Every 3 weeks', savings: '$8.50/month' },
    { name: 'Wellness Treats Pack', frequency: 'Every 6 weeks', savings: '$5.00/month' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
              <RefreshCw className="w-5 h-5" />
              <span className="text-sm font-semibold">Subscribe & Save</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Auto-Ship Your Pet's Essentials
            </h2>
            
            <p className="text-gray-600 text-lg mb-8">
              Set up recurring deliveries for your pet's favorite products and save 20% on every order. 
              It's the easiest way to keep your furry friend happy and healthy.
            </p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 mx-auto sm:mx-0">
                    <benefit.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-500">{benefit.description}</p>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-200">
              Start Your Subscription
            </button>
          </div>

          {/* Right Content - Popular Subscriptions */}
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-8 border border-emerald-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Popular Subscriptions</h3>
            
            <div className="space-y-4">
              {popularSubscriptions.map((sub, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{sub.name}</h4>
                      <p className="text-sm text-gray-500">{sub.frequency}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-600 font-bold">{sub.savings}</p>
                      <p className="text-xs text-gray-400">saved</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Points */}
            <div className="mt-6 pt-6 border-t border-emerald-100">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Free shipping on all subscriptions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Earn 3x Green Paws Points</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Modify or cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
