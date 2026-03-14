import { useEffect } from 'react';
import { Section } from '../components/Section';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/images/about-hero.webp" 
          alt="Workshop" 
          className="absolute inset-0 w-full h-full object-cover animate-[kenBurns_2s_var(--ease-luxury)_forwards] scale-[1.08]" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-ivory">
          <h1 className="font-display text-5xl md:text-7xl leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
            More Than Furniture.<br/>It's a Way of Living.
          </h1>
        </div>
      </div>

      <Section py="2xl">
        {/* Row 1 - The Why */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 mb-32 items-center">
          <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden" data-reveal="scale">
            <img src="/images/about-1.webp" alt="Artisan hands" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="w-full md:w-1/2" data-reveal="right" delay="0.2">
            <h3 className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase mb-6">The Why</h3>
            <p className="font-display text-3xl md:text-4xl text-charcoal leading-snug italic mb-8 border-l border-gold pl-6">
              "Great Houses was born from a question: why do Indian homes look like catalogs from everywhere but India?"
            </p>
            <p className="font-body text-charcoal/80 leading-relaxed text-lg mb-6">
              Founded in 2020, we set out to create furniture that draws from the best of Indian craft traditions — Chettinad stone patterns, Kerala rattan weaving, Rajasthani teak joinery — and translates them into pieces built for how you actually live today.
            </p>
          </div>
        </div>

        {/* Row 2 - The Craft */}
        <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-24 mb-32 items-center">
          <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden" data-reveal="scale">
            <img src="/images/about-2.webp" alt="Workshop interior" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="w-full md:w-1/2" data-reveal="left" delay="0.2">
            <h3 className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase mb-6">The Craft</h3>
            <p className="font-display text-3xl md:text-4xl text-charcoal leading-snug italic mb-8 border-l border-gold pl-6">
              "Every joint is hand-fitted. Every finish is applied twice. Every piece is signed by the craftsman who built it."
            </p>
            <p className="font-body text-charcoal/80 leading-relaxed text-lg mb-6">
              We partner with artisan workshops across Tamil Nadu, Kerala, and Rajasthan — ensuring fair wages, traditional skills, and zero-shortcut quality.
            </p>
          </div>
        </div>

        {/* Row 3 - The Promise */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 mb-16 items-center">
          <div className="w-full md:w-1/2 aspect-[5/4] overflow-hidden" data-reveal="scale">
            <img src="/images/about-3.webp" alt="Styled room" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="w-full md:w-1/2" data-reveal="right" delay="0.2">
            <h3 className="font-accent text-[10px] tracking-[0.2em] text-gold uppercase mb-6">The Promise</h3>
            <p className="font-display text-3xl md:text-4xl text-charcoal leading-snug italic mb-8 border-l border-gold pl-6">
              "We're not selling furniture. We're helping you build a home you'll never want to leave."
            </p>
            <p className="font-body text-charcoal/80 leading-relaxed text-lg mb-6">
              3-Year warranty. Custom sizing. Free delivery on orders over ₹5,000. And a team that answers the phone when you call.
            </p>
          </div>
        </div>
      </Section>

      <Section bg="cream" py="2xl">
        <h2 className="font-display text-4xl text-center mb-16" data-reveal>Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: '🪵', title: 'Craftsmanship First', desc: 'No shortcuts. Only hand-finished perfection.' },
            { icon: '🌿', title: 'Sustainably Sourced', desc: 'Ethically harvested teak and natural materials.' },
            { icon: '💰', title: 'Honest Pricing', desc: 'Direct from artisans to you, cutting out middlemen.' },
            { icon: '🏠', title: 'Made for Real Homes', desc: 'Beautiful design that actually functions perfectly.' }
          ].map((v, i) => (
             <div key={i} className="text-center" data-reveal delay={i * 0.1}>
               <div className="text-4xl mb-4">{v.icon}</div>
               <h4 className="font-accent text-sm tracking-widest text-gold uppercase mb-3">{v.title}</h4>
               <p className="font-body text-sm text-charcoal/80">{v.desc}</p>
             </div>
          ))}
        </div>
      </Section>

      <Section py="3xl">
        <h2 className="font-display text-4xl text-center mb-20" data-reveal>Our Process</h2>
        <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-12 before:content-[''] before:hidden md:before:block before:absolute before:top-6 before:left-[10%] before:right-[10%] before:h-[1.5px] before:bg-charcoal/10" data-reveal delay="0.2">
          {[
            { step: '1', title: 'Designed with Intent', desc: 'Sketched in-house, refined with artisans.' },
            { step: '2', title: 'Crafted by Hand', desc: 'Built using traditional joinery and finishes.' },
            { step: '3', title: 'Delivered with Care', desc: 'White-glove delivery and assembly included.' }
          ].map((p, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full border border-gold bg-ivory text-gold font-display text-2xl flex items-center justify-center mb-6">{p.step}</div>
              <h4 className="font-display text-2xl mb-3 text-center">{p.title}</h4>
              <p className="font-body text-sm text-charcoal/70 text-center">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
