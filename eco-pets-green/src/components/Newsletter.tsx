import React, { useState } from 'react';
import { Mail, Leaf, CheckCircle, Gift } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate submission
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-2 text-emerald-600 mb-4">
                <Gift className="w-5 h-5" />
                <span className="text-sm font-semibold">EXCLUSIVE OFFER</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Get 15% Off Your First Order
              </h2>
              
              <p className="text-gray-600 mb-6">
                Join the PetVerde family and receive exclusive deals, eco-tips, and early access 
                to new sustainable products. Plus, earn bonus Green Paws Points!
              </p>

              {isSubmitted ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl text-emerald-700">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Welcome to the pack!</p>
                    <p className="text-sm">Check your email for your 15% discount code.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 ${
                        error ? 'border-rose-300 focus:border-rose-500' : 'border-gray-200 focus:border-emerald-500'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {error && (
                    <p className="text-rose-500 text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-200"
                  >
                    Subscribe & Save 15%
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                  </p>
                </form>
              )}

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Exclusive deals</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Early access</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Eco tips & guides</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Bonus points</span>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden md:block relative bg-gradient-to-br from-emerald-500 to-emerald-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Join 100K+ Pet Parents</h3>
                  <p className="text-emerald-100">Making sustainable choices for their furry friends</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full" />
              <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
