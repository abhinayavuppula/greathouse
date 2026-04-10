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
    '/images/lookbook/lookbook-2.webp',
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16" data-reveal>
          <div className="max-w-xl mb-8 md:mb-0">
            <h2 className="font-display text-4xl mb-6">Real Homes, Real Stories</h2>
            <p className="font-body text-charcoal/60">A curated gallery of curated spaces. We believe furniture is best understood through the context of life.</p>
          </div>
          <div className="flex gap-6 font-accent text-[9px] tracking-widest uppercase">
             <button className="text-gold border-b border-gold">All Styles</button>
             <button className="hover:text-gold transition-colors">Minimalist</button>
             <button className="hover:text-gold transition-colors">Maximalist</button>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((src, idx) => (
             <div 
               key={idx} 
               className="relative group overflow-hidden break-inside-avoid cursor-none"
               onClick={() => openLightbox(idx)}
               data-reveal
               delay={(idx % 3) * 0.1}
             >
               <img 
                 src={src} 
                 alt={`Lookbook ${idx + 1}`} 
                 className="w-full h-auto object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.02]" 
                 loading="lazy" 
               />
               <div className="absolute inset-0 bg-charcoal/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                 <span className="font-accent text-[10px] tracking-[0.2em] text-white/70 uppercase mb-2">Project 0{idx + 1}</span>
                 <h4 className="font-display text-2xl text-white mb-6">Heritage Redefined</h4>
                 <Link to="/shop" className="bg-ivory text-charcoal px-8 py-3 font-accent text-[9px] tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-300">SEE THE PIECES</Link>
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
