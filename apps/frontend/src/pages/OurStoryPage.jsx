import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '../components/Section';

export default function OurStoryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="bg-ivory selection:bg-gold selection:text-white">
      {/* Dynamic Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gold z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Immersive Hero */}
      <div className="relative h-[90vh] overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img 
            src="/images/story-hero.webp" 
            alt="The Great Houses Workshop" 
            className="w-full h-full object-cover grayscale brightness-50" 
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-accent text-[11px] tracking-[0.5em] text-gold uppercase mb-8"
          >
            Since 2021
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-7xl md:text-9xl text-white leading-tight mb-8"
          >
            Rooted in <br /> Craft.
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="w-24 h-[1px] bg-gold mx-auto"
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="font-accent text-[8px] tracking-widest uppercase">Scroll To Explore</span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
             <motion.div 
               animate={{ y: [-100, 100] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="absolute inset-0 bg-gold"
             />
          </div>
        </motion.div>
      </div>

      {/* The Origin Narrative */}
      <Section py="2xl" className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
           {/* Sticky Sub-Header */}
           <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <h2 className="font-display text-4xl text-charcoal leading-tight mb-6">A Reaction to <br /> the Ordinary.</h2>
              <div className="w-12 h-[1px] bg-gold mb-6" />
              <p className="font-body text-charcoal/40 text-sm italic">Hyderabad, India</p>
           </div>

           {/* Main Content */}
           <div className="lg:col-span-8 space-y-12">
              <p className="font-body text-xl md:text-2xl text-charcoal/80 leading-relaxed font-light">
                We began in a small living room, staring at a very ordinary coffee table. It was perfectly functional, completely identical to thousands of others, and stripped entirely of any cultural identity.
              </p>
              
              <div className="font-body text-charcoal/60 leading-[1.8] space-y-8">
                <p>
                  Why is it that the country responsible for the world's most intricate joinery and the finest rattan weaving was settling for flat-pack catalog furniture? We looked around and realized that while Indian homes have distinct souls, the furniture we fill them with often doesn't.
                </p>
                <p>
                  The market offered two extremes. On one end, mass-produced pieces that couldn't survive three monsoons. On the other, traditional furniture that was often too ornate or heavy for modern apartment living.
                </p>
              </div>

              {/* Big Quote */}
              <div className="py-16 border-y border-charcoal/5">
                 <h3 className="font-display text-4xl md:text-5xl text-charcoal italic leading-tight">
                   "We aren't trying to reinvent Indian furniture. We're trying to remember it."
                 </h3>
              </div>
           </div>
        </div>
      </Section>

      {/* Image/Highlight Section */}
      <div className="bg-charcoal py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               <div className="w-full lg:w-1/2">
                  <motion.div 
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="aspect-square relative"
                  >
                    <img src="/images/wood-texture.webp" alt="Solid Wood Detail" className="w-full h-full object-cover grayscale opacity-80" />
                    <div className="absolute -bottom-10 -right-10 bg-gold p-12 hidden md:block">
                        <p className="font-display text-3xl text-white">100% Solid <br /> Teak & Sheesham.</p>
                    </div>
                  </motion.div>
               </div>
               <div className="w-full lg:w-1/2 space-y-8">
                  <p className="font-accent text-gold text-[10px] tracking-widest uppercase">The Materials</p>
                  <h2 className="font-display text-5xl text-white">Born in this Geography.</h2>
                  <p className="font-body text-white/50 leading-relaxed">
                    We don't use veneers or engineered wood for our structural frames. We use species that have evolved in this climate, meaning they naturally resist the humidity swings that destroy imported timber.
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                    <div>
                      <p className="font-display text-2xl text-white mb-2">Sustainable</p>
                      <p className="text-xs text-white/40">Responsibly sourced from managed plantations.</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl text-white mb-2">Lifetime</p>
                      <p className="text-xs text-white/40">Interlocking joints that breathe and move with the wood.</p>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* The Artisans */}
      <Section py="2xl" className="max-w-5xl mx-auto px-6">
         <div className="text-center mb-24">
            <h2 className="font-display text-5xl md:text-7xl text-charcoal mb-8">Partners, Not Factories.</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'The Weavers', region: 'Kerala', desc: 'Masters of the double-weave rattan pattern for infinite elasticity.' },
              { title: 'The Carvers', region: 'Rajasthan', desc: 'Third-generation woodworkers who understand the grain of solid timber.' },
              { title: 'The Polishers', region: 'Tamil Nadu', desc: 'Expertise in natural oil finishes that let the wood age gracefully.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-cream border border-charcoal/5"
              >
                <h4 className="font-display text-2xl mb-2">{item.title}</h4>
                <p className="font-accent text-[9px] text-gold tracking-widest uppercase mb-6">{item.region}</p>
                <p className="text-sm text-charcoal/60 leading-relaxed italic">"{item.desc}"</p>
              </motion.div>
            ))}
         </div>
      </Section>
    </div>
  );
}
