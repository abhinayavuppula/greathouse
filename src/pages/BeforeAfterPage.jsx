import { useEffect } from 'react';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';

const stories = [
  {
    title: 'The Jubilee Hills Penthouse',
    slug: 'jubilee-hills-penthouse',
    desc: 'Replacing generic hotel-style furniture with artisanal teak and rattan to bring soul to a glass-and-steel skyscraper.',
    beforeImg: '/images/products/dining-table.webp',
    afterImg: '/images/products/dining-table.webp',
  },
  {
    title: 'Banjara Hills Bungalow Refresh',
    slug: 'banjara-hills-bungalow',
    desc: 'A heritage home that needed to breathe again. We restored the original oxide floors and introduced minimalist brass-accented pieces.',
    beforeImg: '/images/products/pooja-cabinet.webp',
    afterImg: '/images/products/pooja-cabinet.webp',
  },
  {
    title: 'Financial District Loft',
    slug: 'financial-district-loft',
    desc: 'Softening a concrete industrial space with the curves of mid-century inspired cane furniture and heavy linen drapes.',
    beforeImg: '/images/products/rattan-sofa.webp',
    afterImg: '/images/products/rattan-sofa.webp',
  }
];

export default function BeforeAfterPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-ivory pt-32">
      <div className="text-center mb-24 px-6">
        <p className="font-accent text-[10px] tracking-[0.3em] text-gold uppercase mb-6">Transformations</p>
        <h1 className="font-display text-5xl md:text-8xl text-charcoal mb-6">Before & After</h1>
      </div>

      <Section py="xl">
        <div className="grid grid-cols-1 gap-40">
           {stories.map((story, idx) => (
             <Link to={`/before-after/${story.slug}`} key={idx} className="group block cursor-none" data-reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                   <div className="relative aspect-[4/3] bg-charcoal/10 overflow-hidden">
                      <div className="absolute top-4 left-4 z-10 font-accent text-[10px] text-white bg-charcoal px-4 py-1">BEFORE</div>
                      <img src={story.beforeImg} alt="Before" className="w-full h-full object-cover grayscale opacity-50" />
                   </div>
                   <div className="relative aspect-[4/3] bg-charcoal/10 overflow-hidden">
                      <div className="absolute top-4 left-4 z-10 font-accent text-[10px] text-white bg-gold px-4 py-1">AFTER</div>
                      <img src={story.afterImg} alt="After" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                </div>
                <div className="max-w-2xl">
                   <h3 className="font-display text-3xl mb-4 group-hover:text-gold transition-colors">{story.title}</h3>
                   <p className="font-body text-charcoal/70">{story.desc}</p>
                </div>
             </Link>
           ))}
        </div>
      </Section>
    </div>
  );
}
