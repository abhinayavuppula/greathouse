import { Link } from 'react-router-dom';
import { WishlistHeartButton } from './WishlistHeartButton';
import { useCartStore } from '../store/useStore';

export function ProductCard({ product, masonryHeight }) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Default to first variant/size available or just generic
    addItem(product, product.sizes?.[0] || 'Standard', 1);
  };

  // Determine aspect ratio class dynamically based on masonry prop
  let aspectClass = "aspect-[4/5]"; // default slightly taller than square for luxury feel
  if (masonryHeight === 'tall') aspectClass = "aspect-[3/4]";
  else if (masonryHeight === 'short') aspectClass = "aspect-video";
  else if (masonryHeight === 'square') aspectClass = "aspect-square";

  return (
    <Link to={`/product/${product.slug}`} className="group block cursor-none transition-transform duration-400 ease-luxury hover:-translate-y-2">
      <div className={`relative ${aspectClass} w-full bg-cream mb-4 overflow-hidden`}>
        <img 
          src={product.images?.[0] || '/placeholder.webp'} 
          alt={product.name} 
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-luxury group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && <span className="bg-ivory text-charcoal px-2 py-1 text-[9px] font-accent tracking-widest uppercase rounded-sm">NEW</span>}
          {product.originalPrice && <span className="bg-gold text-white px-2 py-1 text-[9px] font-accent tracking-widest uppercase rounded-sm">SALE</span>}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <WishlistHeartButton product={product} className="bg-ivory/80 backdrop-blur-md p-2 rounded-full shadow-sm hover:bg-ivory" />
        </div>

        {/* Add To Cart Bar */}
        <div className="absolute bottom-0 left-0 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-luxury z-10">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-charcoal/90 backdrop-blur-md text-ivory py-3 text-xs tracking-widest font-accent uppercase hover:bg-charcoal transition-colors cursor-none"
          >
            + Quick Add
          </button>
        </div>
      </div>

      <div className="px-1 relative z-10">
        <div className="flex justify-between items-start mb-1">
          <div>
            <span className="text-[10px] text-gold font-accent tracking-widest uppercase block mb-1">
              {(product.category || '').replace('-', ' ')}
            </span>
            <h3 className="font-display text-lg text-charcoal leading-snug truncate">
              {product.name}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="font-body font-medium text-sm text-charcoal">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs text-charcoal/40 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
