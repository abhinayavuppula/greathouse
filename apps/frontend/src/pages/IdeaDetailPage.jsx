import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/Section';

const CONTENT_MAP = {
  'teak-textures': {
    title: 'The Art of the Interlocking Joint',
    subtitle: 'Technique · Teak Textures',
    description: 'In solid teak construction, the joint is not just a point of connection; it is proof of integrity. We eschew modern screws and adhesives for the generational knowledge of dovetails and mortise-and-tenon.',
    img: '/images/products/rattan-sofa.webp',
    details: [
      { step: '01. Origin', text: 'Sourced from the heart of dry-wood forests, our teak is kiln-dried for 45 days before the first chisel touches the surface.' },
      { step: '02. Execution', text: 'Every joint is hand-finished. A deviation of even 1mm is discarded—perfection is the only metric that matters for a piece intended to last a century.' }
    ],
    care: 'Solid wood breathes. Learn how to maintain the tactile soul of your pieces through Hyderabad\'s varying humidity.'
  },
  'brass-accents': {
    title: 'The Living Finish of Hand-Polished Brass',
    subtitle: 'Hardware · Brass Accents',
    description: 'Brass is a metal that ages with the house. Our hand-poured brass fittings are left unlacquered, allowing them to develop a unique patina that reflects the touch of those who move through the space.',
    img: '/images/products/pooja-cabinet.webp',
    details: [
      { step: '01. Casting', text: 'Traditional sand-casting methods ensure each handle and hinge has a microscopic level of uniqueness.' },
      { step: '02. Polishing', text: 'Four stages of hand-polishing bring out the warm, butter-like glow of the metal without the artificial shine of machines.' }
    ],
    care: 'A simple olive oil rub once a year is all you need to maintain the depth of the metal while allowing the natural aging process.'
  },
  'cane-weaving': {
    title: 'Elasticity and Age-Old Resilience',
    subtitle: 'Technique · Cane Weaving',
    description: 'The diagonal weave of natural cane is more than a decorative element—it is an engineering marvel that offers ventilation and structural flexibility.',
    img: '/images/products/cane-chair.webp',
    details: [
      { step: '01. Selection', text: 'Only the outer skin of the rattan vine is harvested for our weaving, ensuring maximum tensile strength.' },
      { step: '02. Pattern', text: 'Our weavers follow the "Hexagonal Open Weave" which has been a staple of Indian luxury since the Mughal era.' }
    ],
    care: 'Keep cane away from prolonged direct sunlight to prevent brittleness. A light misting during peak summer helps maintain its elasticity.'
  },
  'linen-comfort': {
    title: 'Breathable Fabrics for Indian Summers',
    subtitle: 'Upholstery · Linen Comfort',
    description: 'Linen is the most noble of fabrics for a tropical climate. Its ability to wick moisture and its natural slub texture make it the perfect companion for solid wood.',
    img: '/images/products/chettinad-bed.webp',
    details: [
      { step: '01. Weight', text: 'We use high-GSM Belgian linen, offering a heavy drape that stays cool to the touch even in 40°C heat.' },
      { step: '02. Softness', text: 'Pre-washed with volcanic stones to achieve a "lived-in" softness that usually takes decades to develop.' }
    ],
    care: 'Linen looks best when its natural wrinkles are celebrated. Avoid heavy starching to maintain its breathable structure.'
  },
  'inlay-art': {
    title: 'The Ancient Precision of Bone and MOP',
    subtitle: 'Inlay · Inlay Art',
    description: 'Inlay work is a test of patience. It involves carving intricate channels in wood and filling them with hand-shaped pieces of Mother of Pearl or ethically sourced bone.',
    img: '/images/products/accent-table.webp',
    details: [
      { step: '01. Carving', text: 'The wood is carved to a depth of precisely 3mm, following floral or geometric patterns inspired by Deccan architecture.' },
      { step: '02. Setting', text: 'Each fragment is set into a natural resin, then sanded until the surface is perfectly flush.' }
    ],
    care: 'Use only a dry, soft cloth for dusting. Avoid chemical cleaners which can degrade the natural resin binding the inlay.'
  },
  'velvet-deep': {
    title: 'Regal Textures for Statement Pieces',
    subtitle: 'Upholstery · Velvet Deep',
    description: 'Deep-pile velvet adds a layer of acoustic and tactile softness to high-ceiling rooms. It catches the light in ways that transform a chair from a furniture piece to a sculptural element.',
    img: '/images/products/velvet-accent-chair.webp',
    details: [
      { step: '01. Density', text: 'Our velvets have a thread count that ensures the "pile" never flattens under regular use.' },
      { step: '02. Color', text: 'Dyed in small batches to achieve deep, jewel tones that are exclusive to the GreatHouses palette.' }
    ],
    care: 'Steam lightly to remove any pressure marks. Avoid rubbing spills; instead, blot them with a clean, dry cloth.'
  }
};

export default function IdeaDetailPage() {
  const { slug } = useParams();
  
  const content = useMemo(() => {
    return CONTENT_MAP[slug] || CONTENT_MAP['teak-textures'];
  }, [slug]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-ivory pt-32">
      <Section py="xl">
        <Link to="/idea-library" className="font-accent text-[10px] tracking-widest text-gold uppercase mb-12 inline-block hover:underline transition-all">← BACK TO LIBRARY</Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32 group cursor-none">
            <img 
              src={content.img} 
              alt={content.title} 
              className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
            />
          </div>
          
          <div className="pt-8">
            <p className="font-accent text-[10px] tracking-[0.3em] text-gold uppercase mb-6">{content.subtitle}</p>
            <h1 className="font-display text-5xl md:text-7xl mb-8 leading-tight">{content.title}</h1>
            <p className="font-body text-xl text-charcoal/80 leading-[1.8] mb-12">
              {content.description}
            </p>
            
            <div className="space-y-16">
              {content.details.map((d, i) => (
                <div key={i}>
                  <h3 className="font-display text-2xl mb-4 text-gold italic">{d.step}</h3>
                  <p className="font-body text-charcoal/70 leading-relaxed">
                    {d.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-24 p-12 bg-charcoal text-ivory dark-section">
               <h4 className="font-display text-2xl mb-6">Caring for the Material</h4>
               <p className="font-body text-ivory/60 text-sm mb-8">{content.care}</p>
               <button className="btn-outline-ivory">DOWNLOAD CARE GUIDE</button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
