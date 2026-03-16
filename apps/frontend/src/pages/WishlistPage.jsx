import { useEffect } from 'react';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { useWishlistStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { items } = useWishlistStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-full pt-20 border-b border-charcoal/5">
        <div className="w-full py-16 flex flex-col items-center justify-center p-6 bg-ivory">
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">Your Wishlist</h1>
          <p className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 animate-in fade-in duration-700 delay-200">
            {items.length} {items.length === 1 ? 'Item' : 'Items'} Saved
          </p>
        </div>
      </div>

      <Section py="2xl" className="min-h-[50vh]">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-700" data-reveal>
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center text-3xl mb-6">♡</div>
            <h2 className="font-display text-2xl text-charcoal mb-4">Your wishlist is currently empty</h2>
            <p className="font-body text-charcoal/70 mb-8 max-w-sm text-center">
              Curate your favorite pieces by clicking the heart icon on any product page.
            </p>
            <Link to="/shop" className="btn-gold">Explore the Collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {items.map((product, idx) => (
              <div key={product.id} data-reveal delay={(idx % 4) * 0.1}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
