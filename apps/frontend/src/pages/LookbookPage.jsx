import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../components/Section';
import { ImageLightbox } from '../components/ImageLightbox';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function LookbookPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const looks = [
    {
      src: '/images/lookbook/lookbook-1.webp',
      title: 'Monsoon Morning',
      space: 'The Study',
      products: ['teak-desk', 'rattan-chair']
    },
    {
      src: '/images/lookbook/lookbook-2.webp',
      title: 'Minimalist Dining',
      space: 'Dining Hall',
      products: ['solid-teak-table']
    },
    {
      src: '/images/lookbook/lookbook-3.webp',
      title: 'The Silent Bedroom',
      space: 'Bedroom',
      products: ['chettinad-bed']
    },
    {
      src: '/images/lookbook/lookbook-4.webp',
      title: 'Living Harmony',
      space: 'Living Room',
      products: ['coffee-table-v1']
    },
    {
      src: '/images/lookbook/lookbook-2.webp',
      title: 'Ancestral Tones',
      space: 'Pooja Mandir',
      products: ['hand-carved-altar']
    },
    {
      src: '/images/lookbook/lookbook-1.webp',
      title: 'Modern Work',
      space: 'Workspace',
      products: ['office-shelf']
    }
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
      {/* Editorial Header */}
      <div className="w-full pt-32 pb-20 bg-ivory overflow-hidden border-b border-gold/5">
        <div className="px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col md:flex-row items-end gap-12"
          >
            <div className="w-full md:w-1/2">
              <p className="font-accent text-[10px] tracking-[0.4em] text-gold uppercase mb-6">Volume III — 2024</p>
              <h1 className="font-display text-6xl md:text-8xl text-charcoal leading-[0.9] mb-8">Spatial <br /> Poetry</h1>
              <div className="w-20 h-[1px] bg-gold" />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <p className="font-body text-charcoal/60 leading-relaxed italic">
                "We believe that a well-designed space is not just about the objects within it, but the dialogue between them. Explore our latest curation of lived-in luxury."
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Section py="xl">
        {/* Dynamic Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {looks.map((look, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
              className="relative group overflow-hidden break-inside-avoid bg-cream cursor-none"
            >
              <div className="overflow-hidden aspect-[3/4]">
                <img 
                  src={look.src} 
                  alt={look.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                  loading="lazy" 
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <p className="font-accent text-[9px] tracking-widest text-white/50 uppercase">{look.space}</p>
                   <button 
                    onClick={() => openLightbox(idx)}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all"
                   >
                     <ShoppingBag size={16} />
                   </button>
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-2xl text-white mb-4">{look.title}</h3>
                  <Link to="/shop" className="inline-flex items-center gap-2 group/link">
                    <span className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase border-b border-gold/30 pb-1">Shop The Selection</span>
                    <ArrowRight size={14} className="text-gold group-hover/link:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              {/* Mobile Info (Visible without hover on mobile) */}
              <div className="md:hidden p-6 bg-white border-t border-charcoal/5">
                 <h3 className="font-display text-lg mb-1">{look.title}</h3>
                 <p className="font-accent text-[9px] tracking-widest text-charcoal/40 uppercase">{look.space}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Narrative Section */}
      <Section py="2xl" className="bg-charcoal text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-accent text-[10px] tracking-[0.4em] text-gold uppercase mb-10">The Philosophy</p>
            <h2 className="font-display text-4xl md:text-5xl mb-12 leading-tight">Authenticity is the <br /> New Luxury.</h2>
            <p className="font-body text-white/50 max-w-lg mb-12 italic leading-relaxed">
              Every photograph in this lookbook was taken in a functional home. We don't believe in showrooms. We believe in life — messy, beautiful, and authentic.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
               <Link to="/our-story" className="btn-outline-white">READ OUR STORY</Link>
               <Link to="/contact" className="btn-gold">BOOK A VISIT</Link>
            </div>
          </motion.div>
        </div>
        
        {/* Ambient light effect */}
        <div className="absolute -bottom-1/2 -left-1/4 w-[1000px] h-[1000px] bg-gold/5 rounded-full blur-[120px]" />
      </Section>

      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox 
            images={looks.map(l => l.src)} 
            currentIndex={activeImageIndex} 
            onClose={() => setLightboxOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
