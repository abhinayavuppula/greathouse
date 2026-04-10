import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CollectionsPage() {
  const collections = [
    {
      id: 'heritage-teak',
      name: 'The Heritage Teak Series',
      tagline: 'Generational Craftsmanship',
      description: 'Solid teak pieces inspired by mid-century Indian silhouettes and traditional joinery.',
      image: '/images/collections/heritage-teak.webp',
      itemCount: 12,
      link: '/shop/heritage-teak'
    },
    {
      id: 'modern-rattan',
      name: 'Rattan & Light',
      tagline: 'Tropical Minimalism',
      description: 'Hand-woven rattan meets sleek charcoal frames. A study in texture and breathability.',
      image: '/images/collections/modern-rattan.webp',
      itemCount: 8,
      link: '/shop/modern-rattan'
    },
    {
      id: 'the-monolith',
      name: 'The Monolith Collection',
      tagline: 'Sculptural Forms',
      description: 'Architectural furniture carved from single blocks of Stone and Sheesham.',
      image: '/images/collections/monolith.webp',
      itemCount: 6,
      link: '/shop/monolith'
    }
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="w-full bg-charcoal text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <Sparkles className="w-6 h-6 text-gold mb-6 opacity-80" />
            <h1 className="font-display text-5xl md:text-7xl mb-8 tracking-tight text-center">Curated Series</h1>
            <p className="font-body text-white/50 max-w-lg mx-auto text-center leading-relaxed">
              Our collections represent complete design philosophies, brought to life through the hands of master artisans.
            </p>
          </motion.div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl -z-0" />
      </div>

      {/* Collections List */}
      <Section py="xl">
        <div className="space-y-32">
          {collections.map((collection, idx) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}
            >
              {/* Image side */}
              <div className="w-full md:w-1/2 group relative">
                <div className="aspect-[4/5] overflow-hidden">
                   <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                {/* Decoration */}
                <div className={`absolute -bottom-6 ${idx % 2 === 0 ? '-right-6' : '-left-6'} w-32 h-32 border border-gold/20 -z-10`} />
              </div>

              {/* Text side */}
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-gold mb-4">{collection.tagline}</p>
                <h2 className="font-display text-4xl text-charcoal mb-6 leading-tight">{collection.name}</h2>
                <div className="w-12 h-[1px] bg-gold mb-8" />
                <p className="font-body text-charcoal/60 leading-relaxed mb-10 max-w-sm">
                  {collection.description}
                </p>
                <div className="flex items-center gap-8">
                  <Link to={collection.link} className="btn-gold">DISCOVER COLLECTION</Link>
                  <p className="font-accent text-[9px] tracking-widest text-charcoal/30 uppercase">
                    {collection.itemCount} PIECES
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section py="2xl" className="bg-ivory border-t border-charcoal/5">
         <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-3xl text-charcoal mb-6 excerpt">Looking for something specific?</h3>
            <p className="font-body text-charcoal/60 mb-8">View our entire catalog of artisanal furniture and home decor.</p>
            <Link to="/shop" className="flex items-center justify-center gap-2 group">
              <span className="font-accent text-[11px] tracking-[0.3em] uppercase text-gold font-bold">SHOP ALL PRODUCTS</span>
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>
      </Section>
    </div>
  );
}
