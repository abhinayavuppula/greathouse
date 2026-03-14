import { useEffect, useState, useMemo } from 'react';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import productsData from '../data/products.json';
import Fuse from 'fuse.js';
import { Search as SearchIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fuse = useMemo(() => new Fuse(productsData, {
    keys: ['name', 'shortDescription', 'category', 'materials'],
    threshold: 0.3
  }), []);

  const results = useMemo(() => {
    if (!query) return [];
    return fuse.search(query).map(res => res.item);
  }, [query, fuse]);

  return (
    <>
      <div className="w-full pt-20">
        <div className="w-full py-24 flex flex-col items-center justify-center px-6 bg-charcoal text-ivory dark-section relative">
          <div className="w-full max-w-4xl relative animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-ivory/50" />
            <input 
              type="text" 
              placeholder="Search products, materials, or categories..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-ivory/10 border border-ivory/20 font-display text-2xl md:text-3xl lg:text-4xl text-white py-6 pl-16 pr-16 outline-none focus:border-gold transition-colors placeholder:text-ivory/30"
              autoFocus
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-ivory/50 hover:text-white transition-colors"
              >
                <X />
              </button>
            )}
          </div>
          
          <div className="mt-8 flex gap-4 text-xs font-accent tracking-widest text-ivory/50 uppercase animate-in fade-in duration-700 delay-200">
            <span>Popular:</span>
            <button onClick={() => setQuery('Teak')} className="hover:text-gold transition-colors">Teak Wood</button>
            <button onClick={() => setQuery('Rattan')} className="hover:text-gold transition-colors">Rattan</button>
            <button onClick={() => setQuery('Bed')} className="hover:text-gold transition-colors">Beds</button>
          </div>
        </div>
      </div>

      <Section py="xl" className="min-h-[50vh]">
        {!query ? (
          <div className="h-full flex flex-col items-center justify-center opacity-60">
             <p className="font-display text-2xl text-charcoal">What are you looking for today?</p>
          </div>
        ) : results.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center" data-reveal>
             <h2 className="font-display text-4xl text-charcoal mb-4">No results found for "{query}"</h2>
             <p className="font-body text-charcoal/70 mb-8 max-w-lg text-center">
               We couldn't find anything matching your search. Please check your spelling or try more general terms like "chair" or "bedroom".
             </p>
             <Link to="/shop" className="btn-outline-gold">View All Products</Link>
          </div>
        ) : (
          <div>
            <p className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 mb-12" data-reveal>
              Showing {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((product, idx) => (
                <div key={product.id} data-reveal delay={(idx % 4) * 0.1}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
