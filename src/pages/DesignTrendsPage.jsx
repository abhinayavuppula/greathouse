import { useEffect } from 'react';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';

const trends = [
  {
    id: '01',
    year: '2026',
    title: 'The Return of the Veranda Interior',
    slug: 'veranda-interior',
    desc: 'How we\'re bringing the breathability and materiality of traditional Indian outdoor spaces inside our modern high-rises.',
    img: '/images/blog/blog-1.webp'
  },
  {
    id: '02',
    year: '2026',
    title: 'Artesian Tech: Hidden Luxury',
    slug: 'artesian-tech',
    desc: 'The shift towards integrating smart home technology within traditional carpentry, ensuring the soul of the home remains analog.',
    img: '/images/hero-1.webp'
  },
  {
    id: '03',
    year: '2026',
    title: 'Monochromatic Materiality',
    slug: 'monochromatic-materiality',
    desc: 'Exploring the depth of single-material rooms. When teak, linen, and stone all share the same tonal frequency.',
    img: '/images/story-hero.webp'
  }
];

export default function DesignTrendsPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-ivory pt-32">
      <div className="text-center mb-24 px-6">
        <p className="font-accent text-[10px] tracking-[0.3em] text-gold uppercase mb-6">The Future of Living</p>
        <h1 className="font-display text-5xl md:text-8xl text-charcoal mb-6">Design Trends</h1>
        <p className="font-body text-charcoal/60 max-w-xl mx-auto italic">
          Mapping the shifts from mass-consumption to artisanal value in the Indian home.
        </p>
      </div>

      <Section py="xl" className="space-y-32">
        {trends.map((trend, idx) => (
          <div key={idx} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`p-16 flex flex-col justify-center ${idx % 2 === 0 ? 'bg-charcoal text-ivory dark-section' : 'bg-cream text-charcoal'}`} data-reveal={idx % 2 === 0 ? 'left' : 'right'}>
              <span className={`font-accent text-[10px] ${idx % 2 === 0 ? 'text-gold' : 'text-gold'} mb-6 block`}>TREND {trend.id} · {trend.year}</span>
              <h2 className="font-display text-4xl mb-8 leading-tight">{trend.title}</h2>
              <p className={`font-body ${idx % 2 === 0 ? 'text-ivory/60' : 'text-charcoal/60'} mb-12`}>
                {trend.desc}
              </p>
              <Link to={`/design-trends/${trend.slug}`} className={`btn-outline-${idx % 2 === 0 ? 'ivory' : 'gold'} w-fit`}>READ FULL TREND REPORT</Link>
            </div>
            <div className="aspect-square bg-cream overflow-hidden" data-reveal={idx % 2 === 0 ? 'right' : 'left'}>
              <img src={trend.img} alt={trend.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}
