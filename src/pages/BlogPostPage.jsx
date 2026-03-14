import { useEffect, useState } from 'react';
import { Section } from '../components/Section';
import { Breadcrumb } from '../components/Breadcrumb';
import { Link } from 'react-router-dom';

export default function BlogPostPage() {
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
      
      <div className="w-full pt-20">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Breadcrumb items={[
              { label: 'The Edit', href: '/the-edit' },
              { label: 'Design Tips' }
            ]} />
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            How to Create a Hotel-Like Bedroom in India
          </h1>
          
          <div className="flex items-center gap-4 text-charcoal/60 font-accent text-[10px] tracking-widest uppercase animate-in fade-in duration-700 delay-200">
            <span>By The Editorial Team</span>
            <span className="text-gold/50">|</span>
            <span>October 12, 2023</span>
            <span className="text-gold/50">|</span>
            <span>4 Min Read</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[50vh] md:h-[70vh]">
          <img src="/images/blog/blog-1.webp" alt="Post Hero" className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000" />
        </div>
      </div>

      <Section py="2xl" className="font-body text-charcoal/80 leading-[1.85] text-lg max-w-3xl mx-auto">
        <p className="first-letter:font-display first-letter:text-6xl first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-2 mb-8">
          There is a specific feeling you get when walking into a luxury heritage hotel. It's an immediate sense of quiet. The air feels cooler. Sounds are muffled. The visual noise of the city disappears. In our daily lives, particularly in bustling Indian cities, preserving that sense of sanctuary in our own bedrooms requires deliberate design choices.
        </p>

        <p className="mb-12">
          It's not just about spending money on expensive sheets; it's about engaging all senses and removing friction from the space. Here are four foundational rules we follow when designing bedrooms for our clients.
        </p>

        <h2 className="font-display text-3xl text-charcoal mt-16 mb-6">1. Ground the Room with a Substantial Bed</h2>
        <p className="mb-6">
          The bed is not just furniture; it is the architectural anchor of the room. In rooms with high ceilings or large windows, a flimsy bed frame feels lost. We recommend investing in solid wood frames—preferably Teak or Rosewood—that have visual weight. Options like our <Link to="/product/chettinad-bed" className="text-gold border-b border-gold/30 hover:border-gold transition-colors">Chettinad Canopy Bed</Link> instantly draw the eye and establish a hierarchy in the room's layout.
        </p>

        <h2 className="font-display text-3xl text-charcoal mt-16 mb-6">2. Layer Natural Textures, Not Just Colors</h2>
        <p className="mb-6">
          The secret to the "hotel feel" isn't a monochrome palette, but a deep layering of textures. In a tropical climate, synthetics feel stifling. Layer block-printed cotton quilts over crisp percale sheets. Introduce a rattan bench at the foot of the bed. The interplay between the smooth, polished wood of the bed frame and the tactile roughness of natural fibers creates a room that feels expensive and intentional.
        </p>

        {/* Inline image pull-quote layout */}
        <div className="my-16 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <img src="/images/blog/blog-2.webp" alt="Detail shot" className="w-full h-auto" />
            <p className="text-xs text-charcoal/50 mt-3 font-body italic text-center">Rattan headboards allow vital air circulation while providing support.</p>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="font-display text-2xl text-charcoal mb-4">The Breathability Factor</h3>
            <p className="text-base">
              Rattan (or 'cane' as it's locally known) isn't just an aesthetic choice. For centuries, Indian beds utilized woven surfaces to allow air to circulate around the mattress, preventing heat trapping during humid nights.
            </p>
          </div>
        </div>

        <h2 className="font-display text-3xl text-charcoal mt-16 mb-6">3. Eliminate Visual Clutter Immediately</h2>
        <p className="mb-12">
          In a hotel room, everything has a hidden place. Apply this brutally to your own space. Use bedside tables with deep drawers rather than open shelves. If you must have electronics, ensure cables are routed entirely out of sight. A bedroom should present zero visual tasks to your brain when you enter it.
        </p>

        <div className="border-t border-charcoal/10 pt-12 mt-16 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="font-accent text-[10px] tracking-widest text-charcoal/50 uppercase">SHARE</span>
            <button className="text-charcoal hover:text-gold transition-colors">FB</button>
            <button className="text-charcoal hover:text-gold transition-colors">TW</button>
            <button className="text-charcoal hover:text-gold transition-colors">WA</button>
          </div>
          <Link to="/the-edit" className="font-accent text-[10px] tracking-widest text-charcoal uppercase border-b border-charcoal/30 pb-1 hover:text-gold hover:border-gold transition-colors">
            BACK TO THE EDIT
          </Link>
        </div>
      </Section>
    </>
  );
}
