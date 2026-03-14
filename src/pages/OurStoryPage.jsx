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
      
      <div className="w-full relative h-[70vh]">
        <img src="/images/story-hero.webp" alt="Great Houses Origin" className="w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-charcoal/40" />
      </div>

      <Section py="2xl" className="font-body text-lg text-charcoal/80 leading-[1.85] max-w-3xl mx-auto">
        <h1 className="font-display text-5xl md:text-6xl text-charcoal text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          The Story of Great Houses
        </h1>

        <p className="first-letter:font-display first-letter:text-6xl first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-2 mb-8" data-reveal>
          We began in a small living room in Hyderabad, staring at a very ordinary coffee table. It was perfectly functional, completely identical to thousands of others across the world, and stripped entirely of any cultural identity. We looked around and realized that while Indian homes have distinct souls, the furniture we fill them with often doesn't.
        </p>

        <p className="mb-12" data-reveal>
          Why is it that the very country responsible for some of the world's most intricate joinery, the finest rattan weaving, and the most robust teak carving was settling for flat-pack catalog furniture?
        </p>

        <h2 className="font-display text-4xl text-charcoal mt-16 mb-8" data-reveal>The Problem We Set Out to Solve</h2>
        
        <p className="mb-8" data-reveal>
          The market offered two extremes. On one end, you had cheap, mass-produced pieces that couldn't survive three monsoons. On the other end, traditional Indian furniture was often too ornate, too heavy, or completely out of place in a modern apartment layout. There was no middle ground—no furniture that celebrated Indian materials while embracing contemporary, minimalist silhouettes.
        </p>

        <div className="my-16 py-8 border-y border-gold/20" data-reveal>
          <p className="font-display text-4xl leading-tight italic text-charcoal text-center">
            "We aren't trying to reinvent Indian furniture. We're trying to remember it, and translate it for how we live today."
          </p>
        </div>

        <h2 className="font-display text-4xl text-charcoal mt-16 mb-8" data-reveal>The Craft Partners</h2>
        
        <p className="mb-8" data-reveal>
          Great Houses is not a factory. It's a network. Over the first year, we traveled across Tamil Nadu, Kerala, and Rajasthan, knocking on the doors of third-generation carpenters, master polishers, and weavers. We don't employ these artisans; we partner with them. We bring the contemporary design vision, and they bring the generational knowledge of how solid timber actually breathes and moves.
        </p>

        <div className="bg-cream p-8 my-12 italic text-sm" data-reveal>
          Our rattan is sourced from Kerala, where artisans still follow the traditional double-weave pattern that provides elasticity and infinite breathability—perfect for the tropical Indian climate.
        </div>

        <h2 className="font-display text-4xl text-charcoal mt-16 mb-8" data-reveal>The Material Philosophy</h2>
        
        <p className="mb-8" data-reveal>
          We don't use veneers or engineered wood for our core structural frames. We use solid Sheesham (Indian Rosewood) and Indian Teak. These species have evolved in this geography, meaning they naturally resist the severe humidity swings that destroy imported wood. When properly kiln-dried and joined using time-honored interlocking joints, they form pieces capable of outlasting their owners.
        </p>

        <h2 className="font-display text-4xl text-charcoal mt-16 mb-8" data-reveal>Where We're Going</h2>
        
        <p className="mb-16" data-reveal>
          Our vision for the next five years is simple but incredibly difficult: to be the default choice for the new Indian home. A home that doesn't want to look like Brooklyn or Scandinavia, but wants to look authentically, beautifully Indian. We're building Great Houses piece by piece, room by room, ensuring that every design that leaves our workshops is a worthy addition to your living space.
        </p>

        <div className="text-center" data-reveal>
          <a href="/shop" className="btn-gold">SHOP THE COLLECTION</a>
        </div>
      </Section>
    </>
  );
}
