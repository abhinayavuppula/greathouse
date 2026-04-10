import { useEffect } from 'react';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';

export default function DesignInspirationsPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  const inspirations = [
    { title: 'Monsoon Sanctuary', slug: 'monsoon-sanctuary', tag: 'Aesthetic Mood', img: '/images/hero-1.webp', desc: 'Moody interiors that embrace the rhythmic rain. Deep greens, polished teak, and the warmth of lamplight.' },
    { title: 'Arid Elegance', slug: 'arid-elegance', tag: 'Curated Setting', img: '/images/story-hero.webp', desc: 'Minimalist forms inspired by the Deccan landscape. Warm sand tones, raw stone, and breathable linens.' },
    { title: 'Modern Chettinad', slug: 'modern-chettinad', tag: 'Heritage Mood', img: '/images/products/chettinad-bed.webp', desc: 'Repurposing ancestral architectural elements into objects of contemporary luxury. Polished pillars and oxide floors.' },
    { title: 'Coastal Rattan', slug: 'coastal-rattan', tag: 'Textural Study', img: '/images/products/cane-chair.webp', desc: 'A dialogue between the sea and the home. Light textures, open weaves, and a palette of salt and sun.' },
  ];

  return (
    <div className="bg-ivory pt-32">
      <div className="text-center mb-24 px-6">
        <p className="font-accent text-[10px] tracking-[0.3em] text-gold uppercase mb-6">Visual Moods</p>
        <h1 className="font-display text-5xl md:text-8xl text-charcoal mb-6">Design Inspirations</h1>
      </div>

      <Section py="xl" className="space-y-32">
        {inspirations.map((ins, idx) => (
          <div key={idx} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`} data-reveal>
            <div className="w-full lg:w-2/3 aspect-[16/9] overflow-hidden bg-cream">
              <img src={ins.img} alt={ins.title} className="w-full h-full object-cover grayscale" />
            </div>
            <div className="w-full lg:w-1/3">
              <span className="font-accent text-[10px] tracking-widest text-gold uppercase mb-4 block">{ins.tag}</span>
              <h2 className="font-display text-4xl mb-6">{ins.title}</h2>
              <p className="font-body text-charcoal/70 mb-8">Exploring the intersection of historical Indian architecture and the clean lines of contemporary interior design.</p>
              <Link to={`/design-inspirations/${ins.slug}`} className="btn-outline-gold">EXPLORE MOODBOOK</Link>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}
