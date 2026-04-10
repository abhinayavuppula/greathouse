import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SpacesPage() {
  const spaces = [
    {
      id: 'living-room',
      name: 'The Living Room',
      description: 'Lounge in luxury with our curated seating and artisanal coffee tables.',
      image: '/images/spaces/living-room.webp',
      link: '/shop/living-room',
      color: 'bg-[#F2EDEA]'
    },
    {
      id: 'dining',
      name: 'The Dining Hall',
      description: 'Gather around solid wood tables designed for generations of conversation.',
      image: '/images/spaces/dining.webp',
      link: '/shop/dining',
      color: 'bg-[#EAEAEA]'
    },
    {
      id: 'bedroom',
      name: 'The Sanctuary',
      description: 'Find rest in spaces defined by natural materials and serene silhouettes.',
      image: '/images/spaces/bedroom.webp',
      link: '/shop/bedroom',
      color: 'bg-[#F9F7F5]'
    },
    {
      id: 'office',
      name: 'The Study',
      description: 'Functional elegance for the thinking home. Teak and leather workbenches.',
      image: '/images/spaces/office.webp',
      link: '/shop/office',
      color: 'bg-[#E3E4E8]'
    }
  ];

  return (
    <div className="pt-20">
      <div className="w-full bg-ivory py-24 px-6 text-center border-b border-charcoal/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Discovery</p>
          <h1 className="font-display text-5xl md:text-7xl text-charcoal mb-8 excerpt">Shop By Space</h1>
          <p className="font-body text-charcoal/60 max-w-xl mx-auto leading-relaxed">
            Every room tells a story. We've categorized our collections to help you curate each chapter of your home with cohesive, artisanal pieces.
          </p>
        </motion.div>
      </div>

      <Section py="0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {spaces.map((space, idx) => (
            <motion.div 
              key={space.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[600px] overflow-hidden flex flex-col"
            >
              {/* Background Color/Pattern */}
              <div className={`absolute inset-0 ${space.color} -z-10`} />
              
              {/* Image Container */}
              <div className="flex-1 overflow-hidden relative">
                <img 
                  src={space.image} 
                  alt={space.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-500" />
              </div>

              {/* Text Content */}
              <div className="p-12 bg-white flex flex-col items-start space-y-4 group-hover:bg-ivory transition-colors duration-500 border-t border-charcoal/5">
                <p className="font-accent text-[9px] tracking-widest uppercase text-charcoal/40">EXPLORE THE</p>
                <h3 className="font-display text-3xl text-charcoal">{space.name}</h3>
                <p className="font-body text-sm text-charcoal/60 max-w-sm">{space.description}</p>
                <Link 
                  to={space.link} 
                  className="flex items-center gap-2 group/link pt-2"
                >
                  <span className="font-accent text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">VIEW COLLECTION</span>
                  <ArrowRight className="w-4 h-4 text-gold group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Bespoke Banner */}
      <Section py="xl" className="bg-charcoal text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto px-6 py-12 border border-white/10"
        >
          <h2 className="font-display text-4xl mb-6">Designing for a specific layout?</h2>
          <p className="font-body text-white/60 mb-8 max-w-md mx-auto">
            Our team offers personalized consultation services for full home furnishing projects.
          </p>
          <Link to="/consultation" className="btn-outline-white inline-block">BOOK A CONSULTATION</Link>
        </motion.div>
      </Section>
    </div>
  );
}
