import { useEffect } from 'react';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'project-01',
    slug: 'heritage-rebirth',
    category: 'RESIDENTIAL · HYDERABAD',
    title: 'Project 01: A Heritage Rebirth',
    desc: 'A 4,000 sq.ft villa where every piece of furniture was custom-designed to match the unique proportions of colonial-era ceilings while maintaining modern ergonomics.'
  },
  {
    id: 'project-02',
    slug: 'minimalist-retreat',
    category: 'APARTMENT · GACHIBOWLI',
    title: 'Project 02: The Minimalist Retreat',
    desc: 'Maximizing light and space in a high-rise unit. Focus on multi-functional teak pieces and a monochromatic material palette.'
  },
  {
    id: 'project-03',
    slug: 'courtyard-house',
    category: 'VILLA · JUBILEE HILLS',
    title: 'Project 03: The Courtyard House',
    desc: 'Integrating outdoor and indoor living through the use of weather-resistant rattan and open-grain timber finishes.'
  }
];

export default function CaseStudiesPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-ivory pt-32">
      <div className="text-center mb-24 px-6">
        <p className="font-accent text-[10px] tracking-[0.3em] text-gold uppercase mb-6">Project Archive</p>
        <h1 className="font-display text-5xl md:text-8xl text-charcoal mb-6">Case Studies</h1>
      </div>

      <Section py="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project, i) => (
            <Link to={`/case-studies/${project.slug}`} key={i} className="group cursor-none block border-t border-charcoal/10 pt-12" data-reveal>
              <span className="font-accent text-[10px] text-gold mb-4 block">{project.category}</span>
              <h3 className="font-display text-4xl mb-6 group-hover:text-gold transition-colors">{project.title}</h3>
              <p className="font-body text-charcoal/70 mb-8 leading-relaxed">
                {project.desc}
              </p>
              <button className="btn-outline-gold self-start">VIEW PROJECT JOURNAL</button>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
