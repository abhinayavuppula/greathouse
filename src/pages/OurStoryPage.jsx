import { useEffect, useState } from 'react';
import { Section } from '../components/Section';

export default function OurStoryPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div 
        className="fixed top-[72px] md:top-[80px] left-0 h-[2px] bg-gold z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="w-full relative h-[60vh]">
        <img src="/images/story-hero.webp" alt="Great Houses Origin" className="w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      <Section py="xl" className="font-body text-charcoal/80 leading-relaxed max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl text-charcoal text-center mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          The Story of Great Houses
        </h1>

        <p className="mb-4 text-lg" data-reveal>
          <span className="font-display text-6xl text-gold float-left leading-none mt-1 mr-0.5">W</span>e began in a small living room in Hyderabad, staring at a very ordinary coffee table. It was perfectly functional, completely identical to thousands of others across the world, and stripped entirely of any cultural identity. We looked around and realized that while Indian homes have distinct souls, the furniture we fill them with often doesn't.
        </p>

        <p className="mb-6 text-lg" data-reveal>
          Why is it that the very country responsible for some of the world's most intricate joinery, the finest rattan weaving, and the most robust teak carving was settling for flat-pack catalog furniture?
        </p>

        <h2 className="font-display text-2xl md:text-3xl text-charcoal mt-8 mb-4" data-reveal>The Problem We Set Out to Solve</h2>
        
        <p className="mb-6 text-lg" data-reveal>
          The market offered two extremes. On one end, you had cheap, mass-produced pieces that couldn't survive three monsoons. On the other end, traditional Indian furniture was often too ornate, too heavy, or completely out of place in a modern apartment layout. There was no middle ground—no furniture that celebrated Indian materials while embracing contemporary, minimalist silhouettes.
        </p>

        <div className="my-10 flex items-center gap-12" data-reveal>
          <div className="h-[1px] flex-grow bg-gold/30" />
          <div className="w-3 h-3 border border-gold rotate-45" />
          <div className="h-[1px] flex-grow bg-gold/30" />
        </div>

        <h2 className="font-display text-2xl md:text-3xl text-charcoal mt-8 mb-4" data-reveal>The Craft Partners</h2>
        
        <p className="mb-8 text-lg" data-reveal>
          Great Houses is not a factory. It's a network. Over the first year, we traveled across Tamil Nadu, Kerala, and Rajasthan, knocking on the doors of third-generation carpenters, master polishers, and weavers. We don't employ these artisans; we partner with them. We bring the contemporary design vision, and they bring the generational knowledge of how solid timber actually breathes and moves.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
          <div className="bg-cream p-12 relative overflow-hidden group" data-reveal="left">
             <div className="relative z-10">
               <h4 className="font-display text-2xl mb-4">The Kerala Weave</h4>
               <p className="italic text-sm text-charcoal/70 leading-relaxed">
                 Our rattan is sourced from Kerala, where artisans still follow the traditional double-weave pattern that provides elasticity and infinite breathability—perfect for the tropical Indian climate.
               </p>
             </div>
             <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
               <span className="font-display text-[120px]">K</span>
             </div>
          </div>
          <div className="bg-charcoal text-ivory p-12 relative overflow-hidden group" data-reveal="right">
             <div className="relative z-10">
               <h4 className="font-display text-2xl mb-4">The Jodhpur Joinery</h4>
               <p className="italic text-sm text-ivory/60 leading-relaxed">
                 Using reclaimed timbers and time-tested interlocking joints, our Jodhpur workshops ensure that every piece carries the structural integrity of ancient palaces.
               </p>
             </div>
             <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
               <span className="font-display text-[120px] text-gold">J</span>
             </div>
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl text-charcoal mt-8 mb-4" data-reveal>The Material Philosophy</h2>
        
        <p className="mb-6 text-lg" data-reveal>
          We don't use veneers or engineered wood for our core structural frames. We use solid Sheesham (Indian Rosewood) and Indian Teak. These species have evolved in this geography, meaning they naturally resist the severe humidity swings that destroy imported wood. When properly kiln-dried and joined using time-honored interlocking joints, they form pieces capable of outlasting their owners.
        </p>

        <h2 className="font-display text-2xl md:text-3xl text-charcoal mt-8 mb-4" data-reveal>Where We're Going</h2>
        
        <p className="mb-10 text-lg" data-reveal>
          Our vision for the next five years is simple but incredibly difficult: to be the default choice for the new Indian home. A home that doesn't want to look like Brooklyn or Scandinavia, but wants to look authentically, beautifully Indian. We're building Great Houses piece by piece, room by room, ensuring that every design that leaves our workshops is a worthy addition to your living space.
        </p>

        <div className="text-center" data-reveal>
          <a href="/shop" className="btn-gold">SHOP THE COLLECTION</a>
        </div>
      </Section>
    </>
  );
}
