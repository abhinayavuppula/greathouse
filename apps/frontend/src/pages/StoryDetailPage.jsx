import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/Section';

const STORIES_MAP = {
  'jubilee-hills-penthouse': {
    title: 'The Jubilee Hills Penthouse',
    location: 'Jubilee Hills, Hyderabad',
    challenge: 'A cold, modern skyscraper unit felt disconnected from the family’s warmth. The high ceilings made standard furniture feel diminutive.',
    solution: 'We introduced oversized, vertical-focused pieces and used the transparency of cane to maintain the view while adding a layer of tactile shadow.',
    testimonial: '"Every time I walk into the living room now, I feel like I\'m in a home, not a showroom."',
    client: 'Ananya & Vikram Reddy',
    imgBefore: '/images/products/dining-table.webp',
    imgAfter: '/images/products/dining-table.webp'
  },
  'banjara-hills-bungalow': {
    title: 'Banjara Hills Bungalow Refresh',
    location: 'Banjara Hills, Hyderabad',
    challenge: 'A 40-year-old family bungalow was cluttered and dark. The challenge was to modernize without losing the "old Hyderabad" soul.',
    solution: 'We stripped back the layers to reveal original oxide floors and introduced minimalist brass-accented wood pieces that complemented the heritage architecture.',
    testimonial: '"It feels like my childhood home has finally grown up with me. The light is different now—it\'s softer."',
    client: 'The Kapoor Family',
    imgBefore: '/images/products/pooja-cabinet.webp',
    imgAfter: '/images/products/pooja-cabinet.webp'
  },
  'financial-district-loft': {
    title: 'Financial District Loft',
    location: 'Financial District, Hyderabad',
    challenge: 'An industrial loft with concrete walls and exposed pipes felt too aggressive for a residential setting.',
    solution: 'We used the warmth of heavy linen and the organic curves of rattan to break the hard lines of the industrial architecture.',
    testimonial: '"I didn\'t believe that furniture could change the temperature of a room until I saw the linen drapes against the concrete."',
    client: 'Sameer Sheikh',
    imgBefore: '/images/products/rattan-sofa.webp',
    imgAfter: '/images/products/rattan-sofa.webp'
  }
};

export default function StoryDetailPage() {
  const { slug } = useParams();
  
  const story = useMemo(() => {
    return STORIES_MAP[slug] || STORIES_MAP['jubilee-hills-penthouse'];
  }, [slug]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-ivory pt-32">
      <Section py="xl">
        <Link to="/before-after" className="font-accent text-[10px] tracking-widest text-gold uppercase mb-12 inline-block hover:underline transition-all">← BACK TO TRANSFORMATIONS</Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
           <div>
              <p className="font-accent text-[10px] tracking-[0.3em] text-gold uppercase mb-6">{story.location}</p>
              <h1 className="font-display text-5xl md:text-8xl mb-8 leading-tight">{story.title}</h1>
           </div>
           <div className="p-12 border-l border-charcoal/10 italic">
              <p className="font-body text-2xl text-charcoal/60 mb-6">
                {story.testimonial}
              </p>
              <footer className="font-accent text-[10px] tracking-widest text-gold uppercase">— {story.client}</footer>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
           <div className="space-y-4">
              <span className="font-accent text-[10px] text-charcoal/40 uppercase">Before</span>
              <div className="aspect-[4/3] overflow-hidden bg-cream grayscale opacity-50">
                 <img src={story.imgBefore} alt="Before" className="w-full h-full object-cover" />
              </div>
           </div>
           <div className="space-y-4">
              <span className="font-accent text-[10px] text-gold uppercase">After</span>
              <div className="aspect-[4/3] overflow-hidden bg-cream">
                 <img src={story.imgAfter} alt="After" className="w-full h-full object-cover" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
           <div>
              <h3 className="font-display text-3xl mb-8 text-gold italic">The Challenge</h3>
              <p className="font-body text-xl text-charcoal/80 leading-relaxed">
                 {story.challenge}
              </p>
           </div>
           <div>
              <h3 className="font-display text-3xl mb-8 text-gold italic">The GreatHouses Solution</h3>
              <p className="font-body text-xl text-charcoal/80 leading-relaxed">
                 {story.solution}
              </p>
           </div>
        </div>

        <div className="mt-32 p-16 bg-charcoal text-ivory text-center">
           <h2 className="font-display text-4xl mb-8">Ready for your transformation?</h2>
           <p className="font-body text-ivory/60 mb-12 max-w-2xl mx-auto">
             Every house has a story waiting to be told. Let us help you write the next chapter with artisanal furniture and design.
           </p>
           <button className="btn-gold">START YOUR PROJECT</button>
        </div>
      </Section>
    </div>
  );
}
