import { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { Filter, ChevronDown } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

export default function CategoryPage() {
  const { category: categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const subCategorySlug = searchParams.get('sub');
  const [activeSort, setActiveSort] = useState('Featured');
  
  const categoryDesc = categoriesData.find(c => c.slug === categorySlug);
  
  // Filter products by category and subcategory
  const products = productsData.filter(p => {
    const matchesCategory = p.category === categorySlug;
    const matchesSub = !subCategorySlug || p.subcategory === subCategorySlug;
    return matchesCategory && matchesSub;
  });
  
  // Guarantee products for a dense masonry grid
  const displayProducts = Array.from({ length: Math.max(12, products.length) }).map((_, i) => {
    const sourceProduct = products.length > 0 ? products[i % products.length] : productsData[i % productsData.length];
    return { ...sourceProduct, id: `${sourceProduct.id}-copy-${i}-${subCategorySlug || 'all'}`, slug: `${sourceProduct.slug}-copy-${i}-${subCategorySlug || 'all'}` };
  });

  const masonryPattern = ['tall', 'square', 'short', 'tall', 'square', 'default', 'tall', 'short', 'tall', 'square', 'short', 'default'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug, subCategorySlug]);

  if (!categoryDesc) return <div className="pt-32 text-center h-screen">Category not found</div>;

  return (
    <>
      <div className="w-full">
        <div className="w-full min-h-[320px] bg-charcoal relative flex flex-col items-center justify-center p-6 dark-section overflow-hidden">
          <img src={categoryDesc.heroImage || '/placeholder.webp'} alt={categoryDesc.name} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent z-10"></div>
          
          <h1 className="font-display text-5xl md:text-6xl text-ivory relative z-20 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
            {categoryDesc.name}
          </h1>
          {subCategorySlug && (
            <p className="font-display text-xl text-gold relative z-20 mb-2 capitalize text-center">
              {categoryDesc.subcategories?.find(s => s.slug === subCategorySlug)?.name}
            </p>
          )}
          <p className="font-display text-2xl text-gold italic relative z-20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 text-center max-w-2xl">
            "{categoryDesc.tagline}"
          </p>
          
          <div className="relative z-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: categoryDesc.name, href: `/shop/${categorySlug}` },
              ...(subCategorySlug ? [{ label: categoryDesc.subcategories?.find(s => s.slug === subCategorySlug)?.name }] : [])
            ]} />
          </div>
          <p className="font-body text-ivory/80 max-w-2xl text-center relative z-20 mt-4 animate-in fade-in duration-700 delay-300">
            {categoryDesc.description}
          </p>
        </div>
      </div>

      <div className="sticky top-[72px] md:top-[80px] z-30 bg-ivory/95 backdrop-blur-md border-y border-charcoal/10 px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center transition-all duration-400">
        <div className="hidden md:flex items-center gap-8 font-accent text-[10px] tracking-widest text-charcoal/80 uppercase">
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
          {/* Left Sidebar Sub-Category Menu */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-[160px]">
              <h3 className="font-accent text-xs tracking-widest uppercase text-charcoal/50 mb-6 font-bold">Collections</h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link 
                    to={`/shop/${categorySlug}`}
                    className={`font-body text-charcoal transition-colors hover:text-gold ${!subCategorySlug ? 'font-medium text-gold' : 'opacity-70'}`}
                  >
                    All {categoryDesc.name}
                  </Link>
                </li>
                {categoryDesc.subcategories?.map(sub => (
                  <li key={sub.slug}>
                    <Link 
                      to={`/shop/${categorySlug}?sub=${sub.slug}`}
                      className={`font-body text-charcoal transition-colors hover:text-gold ${subCategorySlug === sub.slug ? 'font-medium text-gold' : 'opacity-70'}`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 pt-12 border-t border-charcoal/5">
                <Link to="/shop" className="font-accent text-[10px] tracking-widest uppercase text-gold hover:underline">
                  &larr; Back to Shop All
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Side Masonry Grid */}
          <div className="flex-1">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-6">
              {displayProducts.map((product, idx) => (
                <div key={product.id} className="break-inside-avoid mb-12">
                  <ProductCard product={product} masonryHeight={masonryPattern[idx % masonryPattern.length]} />
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <button className="btn-outline-gold">LOAD MORE PRODUCTS</button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
