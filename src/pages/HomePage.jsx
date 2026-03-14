import { Section } from '../components/Section';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import productsData from '../data/products.json';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

// CountUp hook
function useCountUp(end, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return count;
}

export default function HomePage() {
  const homesCount = useCountUp(500);
  const collectionsCount = useCountUp(12);
  const warrantyCount = useCountUp(3);

  return (
    <>
      {/* 1.3 Hero Section */}
      <section className="relative w-full h-[calc(100vh-118px)] flex flex-col md:flex-row overflow-hidden bg-ivory">
        <div className="w-full md:w-[58%] h-[50vh] md:h-full relative overflow-hidden">
          <img 
            src="/images/hero-home.webp" 
            alt="Chettinad Modern Bedroom" 
            className="absolute inset-0 w-full h-full object-cover animate-[kenBurns_1.4s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards] scale-[1.08]" 
            style={{ transformOrigin: 'center center' }}
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="w-full md:w-[42%] h-[50vh] md:h-full bg-ivory flex flex-col justify-center px-8 md:px-16 xl:px-24">
          <p className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-both">
            Great Houses · Est. 2020
          </p>
          <div className="w-12 h-[1.5px] bg-gold my-6 origin-left animate-[scaleX_0.8s_ease-in-out_forwards] scale-x-0" style={{ animationDelay: '0.6s' }}></div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-[72px] leading-[1.1] text-charcoal -tracking-[0.02em] mb-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-[700ms] fill-mode-both">
            Where Craft Meets <br/><span className="italic">Comfort.</span>
          </h1>
          
          <p className="font-body text-charcoal/80 text-lg leading-relaxed mb-10 max-w-md animate-in fade-in duration-700 delay-[900ms] fill-mode-both">
            Luxury furniture rooted in Indian heritage, designed for the way you live today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-[1100ms] fill-mode-both">
            <Link to="/shop" className="btn-gold">Explore the Collection</Link>
            <Link to="/consultation" className="btn-outline-gold">Book a Consultation</Link>
          </div>
          
          <a href="#whatsapp" className="inline-block mt-8 text-sm font-medium text-charcoal/70 hover:text-gold transition-colors animate-in fade-in duration-700 delay-[1300ms] fill-mode-both">
            <span className="text-[#25D366]">💬</span> Chat to Order on WhatsApp
          </a>
        </div>
      </section>

      {/* 1.4 Trust Bar */}
      <div className="w-full bg-cream h-[56px] flex items-center overflow-hidden border-y border-gold/10 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 hidden md:flex items-center justify-between font-accent text-[11px] tracking-widest uppercase text-charcoal/80">
          <span data-reveal delay="0.1">🪵 Solid Teak & Rattan</span>
          <span className="text-gold/30">|</span>
          <span data-reveal delay="0.2">🚚 Free Delivery Over ₹5,000</span>
          <span className="text-gold/30">|</span>
          <span data-reveal delay="0.3">🛡️ 3-Year Warranty</span>
          <span className="text-gold/30">|</span>
          <span data-reveal delay="0.4">📐 Custom Sizing Available</span>
        </div>
        
        {/* Mobile */}
        <div className="md:hidden flex whitespace-nowrap overflow-hidden animate-[ticker-infinite_20s_linear_infinite]">
          <div className="flex font-accent text-[10px] tracking-widest uppercase items-center">
            <span className="px-6">🪵 Solid Teak & Rattan</span>
            <span className="text-gold">✦</span>
            <span className="px-6">🚚 Free Delivery</span>
            <span className="text-gold">✦</span>
            <span className="px-6">🛡️ 3-Year Warranty</span>
            <span className="text-gold">✦</span>
            <span className="px-6">📐 Custom Sizing</span>
            <span className="text-gold px-6">✦</span>
          </div>
          <div className="flex font-accent text-[10px] tracking-widest uppercase items-center">
            <span className="px-6">🪵 Solid Teak & Rattan</span>
            <span className="text-gold">✦</span>
            <span className="px-6">🚚 Free Delivery</span>
            <span className="text-gold">✦</span>
            <span className="px-6">🛡️ 3-Year Warranty</span>
            <span className="text-gold">✦</span>
            <span className="px-6">📐 Custom Sizing</span>
            <span className="text-gold px-6">✦</span>
          </div>
        </div>
      </div>

      {/* 1.5 Category Showcase */}
      <Section py="2xl">
        <div className="text-center mb-16">
          <p className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase mb-4" data-reveal>Curated Collections</p>
          <h2 className="font-display text-4xl md:text-5xl" data-reveal delay="0.1">Every Room, Elevated.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {/* Luxury Beds (wide) */}
          <Link to="/shop/luxury-beds" className="group relative overflow-hidden bg-charcoal md:col-span-2 md:row-span-2" data-reveal="scale" delay="0.1">
            <img src="/images/categories/luxury-beds.webp" alt="Luxury Beds" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gold/40 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="absolute top-6 right-6 font-body text-xs text-white bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">12 pieces</span>
            <h3 className="absolute bottom-6 left-6 font-accent text-xl tracking-widest uppercase text-ivory transform group-hover:-translate-y-1 transition-transform duration-400">Luxury Beds</h3>
          </Link>

          {/* Living Room (tall) */}
          <Link to="/shop/living-room" className="group relative overflow-hidden bg-charcoal md:col-span-1 md:row-span-2" data-reveal="scale" delay="0.2">
            <img src="/images/categories/living-room.webp" alt="Living Room" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-60 transition-opacity duration-500"></div>
            <span className="absolute top-6 right-6 font-body text-xs text-white bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">24 pieces</span>
            <h3 className="absolute bottom-6 left-6 font-accent text-xl tracking-widest uppercase text-ivory transform group-hover:-translate-y-1 transition-transform duration-400">Living Room</h3>
          </Link>

          {/* Affordable Luxury */}
          <Link to="/shop/affordable-luxury" className="group relative overflow-hidden bg-charcoal md:col-span-1 md:row-span-1" data-reveal="scale" delay="0.3">
            <img src="/images/categories/affordable-luxury.webp" alt="Affordable Luxury" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:opacity-60 transition-opacity duration-500"></div>
            <h3 className="absolute bottom-6 left-6 font-accent text-[14px] md:text-[11px] lg:text-[14px] tracking-widest uppercase text-ivory transform group-hover:-translate-y-1 transition-transform duration-400">Affordable Luxury</h3>
          </Link>

          {/* Pooja Mandir */}
          <Link to="/shop/pooja-mandir" className="group relative overflow-hidden bg-charcoal md:col-span-1 md:row-span-1" data-reveal="scale" delay="0.4">
            <img src="/images/categories/pooja-mandir.webp" alt="Pooja Mandir" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:opacity-60 transition-opacity duration-500"></div>
            <h3 className="absolute bottom-6 left-6 font-accent text-[14px] md:text-[11px] lg:text-[14px] tracking-widest uppercase text-ivory transform group-hover:-translate-y-1 transition-transform duration-400">Pooja Mandir</h3>
          </Link>
        </div>
      </Section>

      {/* 1.6 Featured Products */}
      <Section bg="cream" py="2xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <p className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase mb-4" data-reveal>Hand-Selected</p>
            <h2 className="font-display text-4xl md:text-5xl italic" data-reveal delay="0.1">Pieces Worth Living With</h2>
            <p className="font-body text-charcoal/70 mt-4" data-reveal delay="0.2">Handpicked for spaces that deserve more</p>
          </div>
          <Link to="/shop" className="hidden md:inline-flex btn-outline-gold mt-6 md:mt-0" data-reveal delay="0.3">
            VIEW ALL PRODUCTS →
          </Link>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {productsData.slice(0, 4).map((product, idx) => (
            <div key={product.id} data-reveal delay={idx * 0.08}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Row 2 — independent scroll-reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-12">
          {productsData.slice(4, 8).map((product, idx) => (
            <div key={product.id} data-reveal delay={idx * 0.08}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Row 3 — independent scroll-reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-12">
          {productsData.slice(8, 12).map((product, idx) => (
            <div key={product.id} data-reveal delay={idx * 0.08}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="btn-outline-gold w-full">VIEW ALL PRODUCTS →</Link>
        </div>
      </Section>

      {/* 1.7 Brand Story */}
      <section className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-[800px] overflow-hidden">
          <img src="/images/brand-story-home.webp" alt="Craftsmanship" className="w-full h-full object-cover" data-reveal="left" loading="lazy" />
        </div>
        <div className="w-full lg:w-1/2 bg-charcoal text-ivory dark-section flex flex-col justify-center px-8 md:px-16 xl:px-24 py-6 lg:py-0 relative overflow-hidden">
          {/* Subtle SVG pattern background */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwTTIwIDB2NDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvc3ZnPg==')]" />
          
          <p className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase mb-6 z-10" data-reveal>Crafted for the Great Indian Home</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 z-10 max-w-lg" data-reveal delay="0.1">
            Built to outlast trends. Designed to feel like yours.
          </h2>
          <p className="font-body text-ivory/70 text-lg leading-relaxed mb-10 max-w-lg z-10" data-reveal delay="0.2">
            Every piece is made by master craftsmen across India using traditional joinery, premium solid teak, and authentic rattan. We believe true luxury isn't imported from afar—it's perfected right here at home.
          </p>
          <div className="mb-16 z-10" data-reveal delay="0.3">
            <Link to="/our-story" className="btn-outline-ivory">OUR STORY →</Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-ivory/10 z-10">
            <div data-reveal delay="0.4">
              <span className="font-display text-4xl md:text-5xl text-gold block mb-2">{homesCount}+</span>
              <span className="font-accent text-[9px] tracking-widest text-ivory/60 uppercase">Happy Homes</span>
            </div>
            <div data-reveal delay="0.5">
              <span className="font-display text-4xl md:text-5xl text-gold block mb-2">{collectionsCount}</span>
              <span className="font-accent text-[9px] tracking-widest text-ivory/60 uppercase">Collections</span>
            </div>
            <div data-reveal delay="0.6">
              <span className="font-display text-4xl md:text-5xl text-gold block mb-2">{warrantyCount} Years</span>
              <span className="font-accent text-[9px] tracking-widest text-ivory/60 uppercase">Warranty</span>
            </div>
          </div>
        </div>
      </section>


      {/* 1.9 Lookbook Teaser */}
      <section className="bg-charcoal text-ivory py-6 md:py-8 px-6 dark-section">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <p className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase mb-4 text-center" data-reveal>The Art of Living Well</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full mt-12 mb-16">
            {[1,2,3,4].map((i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden group cursor-none" data-reveal delay={i * 0.1}>
                <img 
                  src={`/images/lookbook/lookbook-${i}.webp`} 
                  alt="Lookbook Inspiration" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center pointer-events-none">
                  <p className="font-display text-2xl mb-2">Modern Haven</p>
                  <p className="font-accent text-xs tracking-widest text-gold">EXPLORE →</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/lookbook" className="btn-outline-gold" data-reveal>VIEW THE LOOKBOOK →</Link>
        </div>
      </section>

      {/* 1.10 Blog Teaser */}
      <Section py="2xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 className="font-display text-4xl md:text-5xl" data-reveal>From The Edit</h2>
          <Link to="/the-edit" className="hidden md:inline-flex btn-outline-gold mt-6 md:mt-0" data-reveal delay="0.1">
            VISIT THE EDIT →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Blog 1 */}
          <Link to="/the-edit/hotel-bedroom-india" className="group block cursor-none" data-reveal delay="0.1">
            <div className="aspect-[4/3] overflow-hidden mb-6 bg-cream border border-charcoal/5">
              <img src="/images/blog/blog-1.webp" alt="Hotel-Like Bedroom" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <span className="font-accent text-[9px] tracking-widest text-gold uppercase block mb-3">DESIGN TIPS</span>
            <h3 className="font-display text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors">How to Create a Hotel-Like Bedroom in India</h3>
            <p className="font-body text-charcoal/70 text-sm line-clamp-2 mb-4">Discover the secrets to transforming your everyday sleep space into a five-star sanctuary — with furniture that actually lasts.</p>
            <span className="font-accent text-[10px] tracking-widest text-charcoal uppercase group-hover:text-gold transition-colors">READ MORE →</span>
          </Link>

          {/* Blog 2 */}
          <Link to="/the-edit/teak-vs-sheesham" className="group block cursor-none" data-reveal delay="0.2">
            <div className="aspect-[4/3] overflow-hidden mb-6 bg-cream border border-charcoal/5">
              <img src="/images/blog/blog-2.webp" alt="Teak vs Sheesham" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <span className="font-accent text-[9px] tracking-widest text-gold uppercase block mb-3">MATERIAL GUIDE</span>
            <h3 className="font-display text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors">Teak vs Sheesham: Which Wood is Right for Your Home?</h3>
            <p className="font-body text-charcoal/70 text-sm line-clamp-2 mb-4">A deep dive into India's two most loved hardwoods — their grain, durability, cost, and which rooms each suits best.</p>
            <span className="font-accent text-[10px] tracking-widest text-charcoal uppercase group-hover:text-gold transition-colors">READ MORE →</span>
          </Link>

          {/* Blog 3 */}
          <Link to="/the-edit/pooja-room-design" className="group block cursor-none" data-reveal delay="0.3">
            <div className="aspect-[4/3] overflow-hidden mb-6 bg-cream border border-charcoal/5">
              <img src="/images/blog/blog-3.webp" alt="Pooja Room Design" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <span className="font-accent text-[9px] tracking-widest text-gold uppercase block mb-3">INTERIORS</span>
            <h3 className="font-display text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors">Designing a Pooja Room That Feels Sacred and Stylish</h3>
            <p className="font-body text-charcoal/70 text-sm line-clamp-2 mb-4">From choosing the right mandir cabinet to lighting and décor — how to create a devotional space that reflects your family's heritage.</p>
            <span className="font-accent text-[10px] tracking-widest text-charcoal uppercase group-hover:text-gold transition-colors">READ MORE →</span>
          </Link>

        </div>
      </Section>

      {/* 1.11 Instagram Feed */}
      <section className="py-5 overflow-hidden bg-ivory">
        <div className="text-center mb-12" data-reveal>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">#GreatHousesIndia</h2>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4">
           {[1,2,3,4,5,6].map((i) => (
             <a href="https://instagram.com" target="_blank" rel="noreferrer" key={i} className="min-w-[280px] md:min-w-[16.666vw] aspect-square block relative group cursor-none overflow-hidden snap-center bg-cream border border-ivory">
                <img src={`/images/ig/ig-${i}.webp`} alt="Instagram post" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
             </a>
           ))}
        </div>
        <div className="text-center mt-12" data-reveal>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn-outline-gold">FOLLOW ON INSTAGRAM →</a>
        </div>
      </section>

      {/* 1.12 Newsletter Strip */}
      <section className="bg-charcoal text-ivory py-6 px-6 border-t border-ivory/10 dark-section">
        <div className="max-w-3xl mx-auto text-center" data-reveal>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Design Intelligence, Delivered.</h2>
          <p className="font-body text-ivory/70 text-lg mb-10">
            First access to new collections, styling guides & exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4 mb-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-ivory/5 border border-ivory/20 px-6 py-4 outline-none font-body text-ivory focus:border-gold transition-colors"
              required
            />
            <button type="submit" className="btn-gold">JOIN THE INNER CIRCLE</button>
          </form>
          <p className="font-accent text-[9px] tracking-widest text-ivory/40 uppercase">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
      {/* Testimonials — Final section before footer */}
      <Section bg="cream" py="2xl" className="overflow-hidden">
        <p className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase mb-4 text-center" data-reveal>Trusted by 500+ Indian Homes</p>
        <h2 className="font-display text-4xl md:text-5xl text-center italic mb-12" data-reveal delay="0.1">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* Review 1 */}
          <div className="bg-ivory p-8 md:p-10 relative" data-reveal delay="0.1">
            <span className="absolute top-4 left-6 font-display text-8xl text-gold/20 leading-none pointer-events-none">"</span>
            <div className="flex gap-1 mb-6 z-10 relative">
              {[1,2,3,4,5].map(s => <span key={s} className="text-gold text-sm">★</span>)}
            </div>
            <p className="font-display text-xl leading-relaxed text-charcoal italic mb-8 relative z-10">
              "We spent months searching for a bed that felt truly Indian yet modern. The Chettinad Bed from Great Houses is exactly that — our bedroom finally feels like it belongs in a design magazine."
            </p>
            <div className="flex items-center gap-4 border-t border-charcoal/10 pt-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-cream flex-shrink-0">
                <img src="/images/placeholder-avatar.webp" alt="Aditi Sharma" className="w-full h-full object-cover grayscale" loading="lazy" />
              </div>
              <div>
                <p className="font-body font-medium text-sm">Aditi Sharma</p>
                <p className="font-accent text-[10px] tracking-widest text-warm-gray mt-1">LUXURY BEDS • BANGALORE</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-ivory p-8 md:p-10 relative" data-reveal delay="0.2">
            <span className="absolute top-4 left-6 font-display text-8xl text-gold/20 leading-none pointer-events-none">"</span>
            <div className="flex gap-1 mb-6 z-10 relative">
              {[1,2,3,4,5].map(s => <span key={s} className="text-gold text-sm">★</span>)}
            </div>
            <p className="font-display text-xl leading-relaxed text-charcoal italic mb-8 relative z-10">
              "The Kerala Rattan Sofa is the centrepiece of our living room. The craftsmanship is unlike anything I've seen at this price point — every guest asks where we got it. Delivery was smooth and the team was incredibly helpful."
            </p>
            <div className="flex items-center gap-4 border-t border-charcoal/10 pt-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-cream flex-shrink-0">
                <img src="/images/placeholder-avatar.webp" alt="Rohan Mehta" className="w-full h-full object-cover grayscale" loading="lazy" />
              </div>
              <div>
                <p className="font-body font-medium text-sm">Rohan Mehta</p>
                <p className="font-accent text-[10px] tracking-widest text-warm-gray mt-1">LIVING ROOM • MUMBAI</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-ivory p-8 md:p-10 relative" data-reveal delay="0.3">
            <span className="absolute top-4 left-6 font-display text-8xl text-gold/20 leading-none pointer-events-none">"</span>
            <div className="flex gap-1 mb-6 z-10 relative">
              {[1,2,3,4,5].map(s => <span key={s} className="text-gold text-sm">★</span>)}
            </div>
            <p className="font-display text-xl leading-relaxed text-charcoal italic mb-8 relative z-10">
              "We ordered the Kerala Pooja Cabinet for our new home. It arrived beautifully packed and the gold-leaf finish is even more stunning in person. It has brought such a sense of calm to our pooja room."
            </p>
            <div className="flex items-center gap-4 border-t border-charcoal/10 pt-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-cream flex-shrink-0">
                <img src="/images/placeholder-avatar.webp" alt="Priya Nair" className="w-full h-full object-cover grayscale" loading="lazy" />
              </div>
              <div>
                <p className="font-body font-medium text-sm">Priya Nair</p>
                <p className="font-accent text-[10px] tracking-widest text-warm-gray mt-1">POOJA MANDIR • KOCHI</p>
              </div>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}
