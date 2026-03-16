import { X, Minus, Plus } from 'lucide-react';
import { useUIStore, useCartStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();

  const total = getCartTotal();
  const FREE_SHIPPING_THRESHOLD = 5000;
  const progressPercent = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFree = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-400 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[440px] bg-ivory shadow-2xl z-50 transform transition-transform duration-400 ease-luxury flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
          <h2 className="font-accent tracking-widest text-sm text-charcoal">YOUR CART ({items.length})</h2>
          <button onClick={closeCart} className="text-charcoal hover:text-gold transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 border-b border-gold/10 bg-cream/30">
          {progressPercent === 100 ? (
            <p className="text-xs font-accent text-gold text-center tracking-widest uppercase mb-3">You've unlocked free shipping!</p>
          ) : (
            <p className="text-xs font-body text-charcoal/80 text-center mb-3">
              Add <span className="font-medium text-charcoal">₹{remainingForFree.toLocaleString('en-IN')}</span> more for free delivery
            </p>
          )}
          <div className="w-full h-1 bg-charcoal/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <p className="font-display text-2xl mb-4 text-charcoal">Your cart is empty.</p>
              <button onClick={closeCart} className="text-sm border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={`${item.slug}-${item.variant}`} className="flex gap-4">
                  <div className="w-24 h-24 bg-cream overflow-hidden">
                    <img src={item.images?.[0] || '/placeholder.png'} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-display text-lg text-charcoal leading-tight">{item.name}</h3>
                        <button onClick={() => removeItem(item.slug, item.variant)} className="text-charcoal/40 hover:text-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-charcoal/60 mt-1">{item.variant}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-charcoal/20">
                        <button onClick={() => updateQuantity(item.slug, item.variant, item.quantity - 1)} className="p-2 text-charcoal/60 hover:text-charcoal"><Minus size={12} /></button>
                        <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.slug, item.variant, item.quantity + 1)} className="p-2 text-charcoal/60 hover:text-charcoal"><Plus size={12} /></button>
                      </div>
                      <p className="font-body text-sm font-medium">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-ivory border-t border-charcoal/10 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10">
            <div className="flex justify-between items-end mb-6">
              <span className="font-accent tracking-widest text-xs text-charcoal/60">SUBTOTAL</span>
              <span className="font-display text-2xl text-charcoal">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <Link to="/checkout" onClick={closeCart} className="btn-gold w-full text-center relative overflow-hidden group">
              <span className="relative z-10">PROCEED TO CHECKOUT →</span>
              <div className="absolute inset-0 bg-gold-light transform translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-luxury"/>
            </Link>
            <button onClick={closeCart} className="w-full mt-4 text-xs font-accent tracking-widest text-charcoal/60 hover:text-charcoal transition-colors">
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </>
  );
}
