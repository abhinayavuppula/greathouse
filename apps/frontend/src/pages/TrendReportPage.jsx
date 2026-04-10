import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/Section';

const TRENDS_MAP = {
  'veranda-interior': {
    title: 'The Return of the Veranda Interior',
    year: '2026',
    author: 'Elena GreatHouse, Creative Director',
    subtitle: 'Trend 01 · Breaking the Box',
    intro: 'As urban density increases, the Indian home is losing its most vital lung: the veranda. For 2026, we are seeing a massive shift towards recreating this liminal space inside the home using materiality and spatial sequencing.',
    sections: [
      { heading: 'Material Transparency', text: 'The use of rattan and perforated screens allows for air movement and visual continuity, mimicking the feel of a semi-outdoor space.' },
      { heading: 'Tonal Continuity', text: 'Using exterior-grade materials like rough-hewn stone and raw timber for indoor flooring and wall cladding.' }
    ],
    conclusion: 'The "Veranda Interior" is not just a style; it is a psychological response to the high-rise era—a way to reclaim our connection to the elements within the safety of our homes.'
  },
  'artesian-tech': {
    title: 'Artesian Tech: Hidden Luxury',
    year: '2026',
    author: 'Vikram Mehta, Head of Design',
    subtitle: 'Trend 02 · The Analog Soul',
    intro: 'Technology should be heard (and felt), not seen. We are moving away from flashy screens and towards tactile controls hidden in brass and wood.',
    sections: [
      { heading: 'Tactile Interfaces', text: 'Knurled brass toggles instead of touchscreens. The mechanical click of a switch becomes a luxury experience.' },
      { heading: 'Acoustic Warmth', text: 'Furniture designed with specific acoustic properties to house high-end sound systems without the need for visible speakers.' }
    ],
    conclusion: 'Luxury in the digital age is defined by what you can choose to ignore. By hiding technology, we prioritize the human experience of the space.'
  },
  'monochromatic-materiality': {
    title: 'Monochromatic Materiality',
    year: '2026',
    author: 'Sarah Chen, Material Researcher',
    subtitle: 'Trend 03 · Tonal Depth',
    intro: 'Moving beyond "color" and into "texture". A room where everything is the same hue of sand or charcoal, but every surface feels different to the touch.',
    sections: [
      { heading: 'Tonal Frequency', text: 'Matching the visual frequency of linen, silk, and timber so they merge into a single cohesive atmosphere.' },
      { heading: 'Micro-Shadows', text: 'Relying on the natural grain of wood and the weave of fabric to create interest through depth rather than color contrast.' }
    ],
    conclusion: 'When we remove color, we are forced to see the quality of the material. It is the ultimate test of artisanal craftsmanship.'
  }
};

export default function TrendReportPage() {
  const { slug } = useParams();
  
  const report = useMemo(() => {
    return TRENDS_MAP[slug] || TRENDS_MAP['veranda-interior'];
  }, [slug]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-ivory pt-32">
      <Section py="xl">
        <Link to="/design-trends" className="font-accent text-[10px] tracking-widest text-gold uppercase mb-12 inline-block hover:underline transition-all">← BACK TO TRENDS</Link>
        
        <article className="max-w-4xl mx-auto">
           <header className="mb-24">
              <p className="font-accent text-[10px] tracking-[0.3em] text-gold uppercase mb-6">{report.subtitle}</p>
              <h1 className="font-display text-5xl md:text-8xl mb-8 leading-tight">{report.title}</h1>
              <div className="flex justify-between items-center py-6 border-y border-charcoal/10">
                 <span className="font-body text-charcoal/40 italic">{report.author}</span>
                 <span className="font-accent text-[10px] text-gold uppercase">{report.year}</span>
              </div>
           </header>

           <div className="mb-24">
              <p className="font-body text-3xl text-charcoal/80 leading-relaxed mb-16 italic">
                 {report.intro}
              </p>
           </div>

           <div className="space-y-24 mb-32">
              {report.sections.map((sec, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <h3 className="font-display text-2xl text-gold italic col-span-1">{sec.heading}</h3>
                   <p className="font-body text-xl text-charcoal/70 leading-relaxed col-span-2">
                      {sec.text}
                   </p>
                </div>
              ))}
           </div>

           <div className="p-16 bg-cream mb-32">
              <h2 className="font-display text-3xl mb-8">Executive Conclusion</h2>
              <p className="font-body text-xl text-charcoal/70 leading-relaxed">
                 {report.conclusion}
              </p>
           </div>

           <footer className="text-center py-24 border-t border-charcoal/10">
              <h4 className="font-display text-2xl mb-8">Discuss these trends with our curators</h4>
              <button className="btn-gold">BOOK A PRIVATE PREVIEW</button>
           </footer>
        </article>
      </Section>
    </div>
  );
}
