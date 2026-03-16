import { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShopAllPage() {
  const [activeSort, setActiveSort] = useState('Featured');
  // Add some dummy products so the grid looks full (exactly 12 for dense masonry)
  const [products] = useState(() => {
    let arr = [...productsData];
    // If we have less than 12, pad it out to exactly 12
    if (arr.length < 12) {
      const needed = 12 - arr.length;
      for (let i = 0; i < needed; i++) {
        arr.push({...productsData[i % productsData.length], id: `dummy-${i}`, slug: `dummy-${i}`});
      }
    } else {
      arr = arr.slice(0, 12); // cap at 12 for the initial view
    }
    return arr;
  });

  const masonryPattern = ['tall', 'square', 'short', 'tall', 'square', 'default', 'tall', 'short', 'tall', 'square', 'short', 'default'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-full h-[280px] bg-charcoal relative flex flex-col items-center justify-center p-6 dark-section overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent z-10"></div>
          
          <h1 className="font-display text-5xl md:text-6xl text-ivory relative z-20 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">The Collection</h1>
          <div className="relative z-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Shop' }
            ]} />
          </div>
        </div>
      </div>

      <div className="sticky top-[72px] md:top-[80px] z-30 bg-ivory/95 backdrop-blur-md border-y border-charcoal/10 px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center transition-all duration-400">
        <div className="hidden md:flex items-center gap-8 font-accent text-[10px] tracking-widest text-charcoal/80 uppercase">
          <button className="flex items-center gap-2 hover:text-gold transition-colors">All Categories <ChevronDown size={12} /></button>
          <button className="flex items-center gap-2 hover:text-gold transition-colors">Price Range <ChevronDown size={12} /></button>
          <button className="flex items-center gap-2 hover:text-gold transition-colors">Material <ChevronDown size={12} /></button>
          <button className="flex items-center gap-2 hover:text-gold transition-colors">Style <ChevronDown size={12} /></button>
        </div>
        
        <button className="md:hidden w-full flex items-center justify-center gap-2 font-accent text-[11px] tracking-widest btn-outline-gold mb-4 md:mb-0">
          <Filter size={14} /> FILTER & SORT
        </button>

        <div className="hidden md:flex items-center gap-4 font-accent text-[10px] tracking-widest text-charcoal/80 uppercase">
          <span className="opacity-50">Sort by:</span>
          <div className="relative group cursor-pointer border border-charcoal/20 px-4 py-2 hover:border-gold transition-colors">
            <div className="flex items-center justify-between gap-6 min-w-[120px]">{activeSort} <ChevronDown size={12} /></div>
            
            <div className="absolute top-[100%] left-0 w-full mt-2 bg-ivory shadow-xl border border-charcoal/10 py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
              {['Featured', 'Newest', 'Price: High-Low', 'Price: Low-High'].map(opt => (
                <div 
                  key={opt} 
                  className={`px-4 py-2 hover:bg-cream transition-colors ${activeSort === opt ? 'text-gold' : ''}`}
                  onClick={() => setActiveSort(opt)}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Section py="lg" className="min-h-screen border-t border-charcoal/5">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar Category Menu */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-[160px]">
              <h3 className="font-accent text-xs tracking-widest uppercase text-charcoal/50 mb-6">Categories</h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link 
                    to="/shop"
                    className="font-body text-charcoal transition-colors hover:text-gold font-medium text-gold"
                  >
                    All Furniture
                  </Link>
                </li>
                {categoriesData.map(cat => (
                  <li key={cat.slug}>
                    <Link 
                      to={`/shop/${cat.slug}`}
                      className="font-body text-charcoal opacity-70 transition-colors hover:text-gold"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Side Masonry Grid */}
          <div className="flex-1">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-6">
              {products.map((product, idx) => (
                <div key={product.id} className="break-inside-avoid mb-12" data-reveal delay={(idx % 3) * 0.1}>
                  <ProductCard product={product} masonryHeight={masonryPattern[idx % masonryPattern.length]} />
                </div>
              ))}
            </div>

            <div className="mt-16 text-center" data-reveal delay="0.2">
              <button className="btn-outline-gold">LOAD MORE PRODUCTS</button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
