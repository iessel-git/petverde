import React from 'react';
import { useCart } from '../contexts/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, Leaf, Truck } from 'lucide-react';

const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    clearCart 
  } = useCart();

  if (!isCartOpen) return null;

  const shippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - cartTotal);
  const hasReachedFreeShipping = cartTotal >= shippingThreshold;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
            <span className="bg-emerald-100 text-emerald-700 text-sm font-medium px-2 py-0.5 rounded-full">
              {cartItems.length} items
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="p-4 bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-5 h-5 text-emerald-600" />
            {hasReachedFreeShipping ? (
              <span className="text-sm text-emerald-700 font-medium">
                You've unlocked FREE carbon-neutral shipping!
              </span>
            ) : (
              <span className="text-sm text-gray-600">
                Add <span className="font-bold text-emerald-700">${remainingForFreeShipping.toFixed(2)}</span> more for free shipping
              </span>
            )}
          </div>
          <div className="h-2 bg-emerald-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (cartTotal / shippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Start shopping for eco-friendly pet products!</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-emerald-600 font-bold">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-white">
            {/* Green Paws Points */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-emerald-50 rounded-lg">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-emerald-700">
                Earn <span className="font-bold">{Math.floor(cartTotal * 2)}</span> Green Paws Points with this order!
              </span>
            </div>

            {/* Totals */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className={hasReachedFreeShipping ? 'text-emerald-600 font-medium' : ''}>
                  {hasReachedFreeShipping ? 'FREE' : '$5.99'}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                <span>Total</span>
                <span>${(cartTotal + (hasReachedFreeShipping ? 0 : 5.99)).toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-200 mb-2">
              Proceed to Checkout
            </button>
            <button 
              onClick={clearCart}
              className="w-full py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CartDrawer;
