import { Heart } from 'lucide-react';
import { useWishlistStore } from '../store/useStore';
import { useState } from 'react';

export function WishlistHeartButton({ product, className = '' }) {
  const { toggleItem, items } = useWishlistStore();
  const isHearted = items.some(i => i.slug === product.slug);
  const [animating, setAnimating] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    toggleItem(product);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 250);
  };

  return (
    <button 
      onClick={handleClick}
      className={`text-gold transition-all duration-200 cursor-none ${animating ? 'scale-125' : 'scale-100'} ${className}`}
      aria-label="Toggle Wishlist"
    >
      <Heart size={20} fill={isHearted ? 'currentColor' : 'transparent'} strokeWidth={1.5} />
    </button>
  );
}
