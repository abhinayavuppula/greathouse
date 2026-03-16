import { useEffect, useState } from 'react';
import { Section } from '../components/Section';
import { ImageLightbox } from '../components/ImageLightbox';
import { Link } from 'react-router-dom';

export default function LookbookPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [
    '/images/lookbook/lookbook-1.webp',
    '/images/lookbook/lookbook-2.webp',
    '/images/lookbook/lookbook-3.webp',
    '/images/lookbook/lookbook-4.webp',
    '/images/lookbook/lookbook-2.webp', // dummy repeats
    '/images/lookbook/lookbook-1.webp',
    '/images/lookbook/lookbook-4.webp',
    '/images/lookbook/lookbook-3.webp',
    '/images/lookbook/lookbook-1.webp'
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="w-full pt-20 border-b border-charcoal/5">
        <div className="w-full h-[400px] flex flex-col items-center justify-center p-6 bg-cream">
          <p className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">Inspiration</p>
          <h1 className="font-display text-5xl md:text-7xl text-charcoal mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">The Lookbook</h1>
          <p className="font-body text-charcoal/70 max-w-lg text-center animate-in fade-in duration-700 delay-300">Explore how our pieces live and breathe in real homes. Click any image to view details.</p>
        </div>
      </div>

      <Section py="xl">
        {/* Simple CSS Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
             <div 
               key={idx} 
               className="relative group overflow-hidden break-inside-avoid cursor-zoom-in"
               onClick={() => openLightbox(idx)}
               data-reveal
               delay={(idx % 3) * 0.1}
             >
               <img 
                 src={src} 
                 alt={`Lookbook ${idx + 1}`} 
                 className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]" 
                 loading="lazy" 
               />
               <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 <Link to="/shop" className="pointer-events-auto bg-ivory text-charcoal px-6 py-3 font-accent text-[9px] tracking-widest uppercase hover:bg-gold hover:text-white transition-colors">Shop The Look</Link>
               </div>
             </div>
          ))}
        </div>
        
        <div className="mt-20 text-center" data-reveal delay="0.2">
          <button className="btn-outline-gold">LOAD MORE</button>
        </div>
      </Section>

      {lightboxOpen && (
        <ImageLightbox images={images} currentIndex={activeImageIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}
