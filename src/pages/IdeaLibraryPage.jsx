import { useEffect } from 'react';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';

const ideas = [
  { title: 'Teak Textures', slug: 'teak-textures', desc: 'Understanding the grain of solid timber.', img: '/images/products/rattan-sofa.webp' },
  { title: 'Brass Accents', slug: 'brass-accents', desc: 'The subtle glow of hand-polished metal.', img: '/images/products/pooja-cabinet.webp' },
  { title: 'Cane Weaving', slug: 'cane-weaving', desc: 'Elasticity and age-old resilience.', img: '/images/products/cane-chair.webp' },
  { title: 'Linen Comfort', slug: 'linen-comfort', desc: 'Breathable fabrics for Indian summers.', img: '/images/products/chettinad-bed.webp' },
  { title: 'Inlay Art', slug: 'inlay-art', desc: 'The ancient precision of Bone and MOP.', img: '/images/products/accent-table.webp' },
  { title: 'Velvet Deep', slug: 'velvet-deep', desc: 'Regal textures for statement pieces.', img: '/images/products/velvet-accent-chair.webp' },
];

export default function IdeaLibraryPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-ivory pt-32">
      <div className="text-center mb-24 px-6">
        <p className="font-accent text-[10px] tracking-[0.3em] text-gold uppercase mb-6">Material Journal</p>
        <h1 className="font-display text-5xl md:text-8xl text-charcoal mb-6">Idea Library</h1>
        <p className="font-body text-charcoal/60 max-w-xl mx-auto text-lg italic">
          A tactile catalog of the components that build a GreatHouse.
        </p>
      </div>

      <Section py="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ideas.map((idea, idx) => (
            <Link to={`/idea-library/${idea.slug}`} key={idx} className="group cursor-none block" data-reveal delay={idx * 0.1}>
              <div className="aspect-square overflow-hidden mb-6 bg-cream border border-charcoal/5">
                <img src={idea.img} alt={idea.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
              </div>
              <h3 className="font-display text-2xl mb-2 group-hover:text-gold transition-colors">{idea.title}</h3>
              <p className="font-body text-sm text-charcoal/60">{idea.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
