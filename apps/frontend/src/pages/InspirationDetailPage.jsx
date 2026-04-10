import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/Section';

const MOOD_MAP = {
  'monsoon-sanctuary': {
    title: 'Monsoon Sanctuary',
    subtitle: 'Aesthetic Mood · The Rhythmic Indoor',
    description: 'When the clouds gather over Hyderabad, the home should become a fortress of warmth. This mood focuses on highly polished surfaces that reflect the moody sky and deep textures that absorb sound.',
    img: '/images/hero-1.webp',
    palette: ['#1A2421', '#2D3A30', '#B58E3D', '#E8E2D6'],
    elements: ['Dark Polished Teak', 'Deep Forest Velvet', 'Aged Brass Hardware', 'Hand-Knotted Wool Rugs'],
    quote: 'Design is not what we see, but what we feel during a downpour.'
  },
  'arid-elegance': {
    title: 'Arid Elegance',
    subtitle: 'Curated Setting · Deccan Minimalism',
    description: 'Inspired by the boulders and dry heat of the Deccan plateau. This setting uses raw, honest materials to create a space that feels naturally cooled and deeply grounded.',
    img: '/images/story-hero.webp',
    palette: ['#D2B48C', '#E6D5B8', '#8B4513', '#F5F5DC'],
    elements: ['Rough-Hewn Stone', 'Unbleached Linen', 'Raw Ash Wood', 'Terracotta Accents'],
    quote: 'In the desert, luxury is found in the shadow and the cool touch of stone.'
  },
  'modern-chettinad': {
    title: 'Modern Chettinad',
    subtitle: 'Heritage Mood · Ancestral Continuity',
    description: 'Chettinad design is famous for its grandiose scale and vibrant colors. We\'ve distilled this into a contemporary language—keeping the iconic pillars and oxide finishes but framing them in minimalist geometry.',
    img: '/images/products/chettinad-bed.webp',
    palette: ['#800000', '#FFD700', '#000000', '#F0E68C'],
    elements: ['Red Oxide Finishes', 'Burma Teak Pillars', 'Athangudi Tile Patterns', 'Heavy Carved Doors'],
    quote: 'The past is not behind us; it is beneath our feet and in the pillars that hold our roof.'
  },
  'coastal-rattan': {
    title: 'Coastal Rattan',
    subtitle: 'Textural Study · The Breathable Home',
    description: 'A tribute to India\'s long coastline. This look is about transparency, air movement, and the play of light through woven surfaces.',
    img: '/images/products/cane-chair.webp',
    palette: ['#ADD8E6', '#F0FFFF', '#DEB887', '#FFFFFF'],
    elements: ['Natural Rattan', 'Bleached Oak', 'Soft Cotton Voile', 'Mother of Pearl Inlay'],
    quote: 'A home should breathe as deeply as the ocean at low tide.'
  }
};

export default function InspirationDetailPage() {
  const { slug } = useParams();
  
  const mood = useMemo(() => {
    return MOOD_MAP[slug] || MOOD_MAP['monsoon-sanctuary'];
  }, [slug]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-ivory pt-32">
      <Section py="xl">
        <Link to="/design-inspirations" className="font-accent text-[10px] tracking-widest text-gold uppercase mb-12 inline-block hover:underline transition-all">← BACK TO INSPIRATIONS</Link>
        
        <div className="mb-24">
          <p className="font-accent text-[10px] tracking-[0.3em] text-gold uppercase mb-6">{mood.subtitle}</p>
          <h1 className="font-display text-5xl md:text-8xl mb-8 leading-tight">{mood.title}</h1>
          <p className="font-body text-2xl text-charcoal/80 leading-relaxed max-w-3xl">
            {mood.quote}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-8 overflow-hidden bg-cream">
            <img 
              src={mood.img} 
              alt={mood.title} 
              className="w-full aspect-[16/9] object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
            />
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center bg-charcoal p-12 text-ivory">
             <h3 className="font-display text-2xl mb-8 italic text-gold">The Palette</h3>
             <div className="flex gap-4 mb-12">
                {mood.palette.map((color, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border border-ivory/10" style={{ backgroundColor: color }} title={color}></div>
                ))}
             </div>
             <h3 className="font-display text-2xl mb-8 italic text-gold">Core Elements</h3>
             <ul className="space-y-4 font-body text-ivory/60">
                {mood.elements.map((el, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                    {el}
                  </li>
                ))}
             </ul>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center py-24">
           <h2 className="font-display text-4xl mb-8">Bring this mood to your space</h2>
           <p className="font-body text-charcoal/60 mb-12 text-lg italic">
             Our designers can help you adapt the {mood.title} aesthetic to your specific floor plan and light conditions.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Link to="/shop" className="btn-gold">SHOP THE LOOK</Link>
             <Link to="/consultation" className="btn-outline-gold">BOOK CONSULTATION</Link>
           </div>
        </div>
      </Section>
    </div>
  );
}
