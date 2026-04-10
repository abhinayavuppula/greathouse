import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/Section';

const CASE_STUDIES_MAP = {
  'heritage-rebirth': {
    title: 'A Heritage Rebirth',
    client: 'The Rao Residence',
    scale: '4,000 sq.ft Villa',
    duration: '6 Months',
    overview: 'This project involved the complete interior overhaul of a colonial-era villa. The primary objective was to respect the architectural heritage while creating a residence suitable for a modern, tech-forward family.',
    scope: ['Custom Woodwork', 'Heritage Restoration', 'Spatial Planning', 'Lighting Design'],
    process: [
      { phase: 'Discovery', detail: 'Three weeks of architectural mapping to understand how the light moved through the high-ceiling rooms.' },
      { phase: 'Material Sourcing', detail: 'Acquiring reclaimed Burma teak to match the existing structural pillars of the home.' },
      { phase: 'Craftsmanship', detail: 'Over 2,000 man-hours of hand-carving and joinery performed on-site.' }
    ],
    results: 'The final residence maintains its original soul but functions with the efficiency of a modern luxury apartment, featuring integrated smart home features hidden within classical cabinetry.'
  },
  'minimalist-retreat': {
    title: 'The Minimalist Retreat',
    client: 'Siddharth M.',
    scale: '1,800 sq.ft Apartment',
    duration: '3 Months',
    overview: 'A high-rise unit in Gachibowli that needed to serve as both a quiet sanctuary and an entertaining space. The focus was on "quiet luxury" and multi-functional design.',
    scope: ['Bespoke Apartment Furniture', 'Material Curation', 'Art Integration'],
    process: [
      { phase: 'Planning', detail: 'Using 3D modelling to ensure every piece maximized the available floor area without cluttering the sightlines.' },
      { phase: 'Texture Selection', detail: 'Pairing raw concrete walls with the softness of sand-washed linen and warm ash wood.' }
    ],
    results: 'A space that feels significantly larger than its footprint, characterized by a sense of calm and a highly efficient use of vertical space.'
  },
  'courtyard-house': {
    title: 'The Courtyard House',
    client: 'The Varma Villa',
    scale: '6,500 sq.ft Residence',
    duration: '9 Months',
    overview: 'A multi-generational home designed around a central open-air courtyard. The furniture needed to be weather-resistant yet indistinguishable from indoor luxury pieces.',
    scope: ['Indoor-Outdoor Furniture', 'Landscape Coordination', 'Large-Scale Installations'],
    process: [
      { phase: 'Climate Testing', detail: 'Testing wood finishes against Hyderabad\'s extreme temperature fluctuations and monsoon moisture.' },
      { phase: 'Custom Design', detail: 'Creating a 14-seater dining table from a single slab of seasoned teak.' }
    ],
    results: 'A seamless transition between the garden and the living areas, where the furniture ages beautifully alongside the natural elements of the courtyard.'
  }
};

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  
  const study = useMemo(() => {
    return CASE_STUDIES_MAP[slug] || CASE_STUDIES_MAP['heritage-rebirth'];
  }, [slug]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-ivory pt-32">
      <Section py="xl">
        <Link to="/case-studies" className="font-accent text-[10px] tracking-widest text-gold uppercase mb-12 inline-block hover:underline transition-all">← BACK TO CASE STUDIES</Link>
        
        <div className="mb-24">
           <h1 className="font-display text-5xl md:text-8xl mb-12">{study.title}</h1>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-y border-charcoal/10 py-12">
              <div>
                 <span className="font-accent text-[10px] text-gold uppercase block mb-2">Client</span>
                 <p className="font-body text-lg">{study.client}</p>
              </div>
              <div>
                 <span className="font-accent text-[10px] text-gold uppercase block mb-2">Scale</span>
                 <p className="font-body text-lg">{study.scale}</p>
              </div>
              <div>
                 <span className="font-accent text-[10px] text-gold uppercase block mb-2">Duration</span>
                 <p className="font-body text-lg">{study.duration}</p>
              </div>
              <div>
                 <span className="font-accent text-[10px] text-gold uppercase block mb-2">Scope</span>
                 <p className="font-body text-sm uppercase tracking-wider">{study.scope.join(' · ')}</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
           <div>
              <h2 className="font-display text-4xl mb-8 italic">Overview</h2>
              <p className="font-body text-xl text-charcoal/80 leading-relaxed">
                 {study.overview}
              </p>
           </div>
           <div className="bg-cream p-12">
              <h2 className="font-display text-4xl mb-8 italic text-gold">The Process</h2>
              <div className="space-y-8">
                 {study.process.map((p, i) => (
                   <div key={i}>
                      <span className="font-accent text-[10px] text-gold uppercase block mb-2">{p.phase}</span>
                      <p className="font-body text-charcoal/70">{p.detail}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="mb-32">
           <img src="/images/story-hero.webp" alt="Project Hero" className="w-full aspect-[21/9] object-cover grayscale" />
        </div>

        <div className="max-w-3xl mx-auto text-center">
           <h2 className="font-display text-4xl mb-8">Outcome</h2>
           <p className="font-body text-2xl text-charcoal/70 leading-relaxed italic">
              "{study.results}"
           </p>
           <div className="mt-16">
              <Link to="/consultation" className="btn-gold">ENQUIRE ABOUT SIMILAR PROJECTS</Link>
           </div>
        </div>
      </Section>
    </div>
  );
}
