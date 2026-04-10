import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Design Tips', 'Craftsmanship', 'Styling', 'Materials', 'People'];

  const posts = [
    { title: "How to Create a Hotel-Like Bedroom in India", category: "Design Tips", image: 1, date: "Mar 12, 2024" },
    { title: "The Enduring Appeal of Chettinad Craft", category: "Craftsmanship", image: 2, date: "Mar 08, 2024" },
    { title: "Styling Rattan for the Modern Apartment", category: "Styling", image: 3, date: "Mar 05, 2024" },
    { title: "Why Solid Teak Wood Outlasts Everything Else", category: "Materials", image: 1, date: "Feb 28, 2024" },
    { title: "Interview with our Master Joiner, Ramesh", category: "People", image: 2, date: "Feb 22, 2024" },
    { title: "Preparing Your Wood Furniture for the Monsoon", category: "Design Tips", image: 3, date: "Feb 15, 2024" },
  ];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-ivory pt-20">
      {/* Editorial Header */}
      <div className="w-full py-32 px-6 border-b border-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-accent text-[11px] tracking-[0.4em] text-gold uppercase mb-8"
          >
            The Great Houses Journal
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-7xl md:text-9xl text-charcoal leading-[0.8] mb-12"
          >
            The <br /> Edit.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-charcoal/60 max-w-lg mx-auto leading-relaxed italic"
          >
            Observations on architecture, artisanal craft, and the quiet beauty of a well-lived home.
          </motion.p>
        </div>
      </div>

      {/* Featured Entry */}
      <Section py="xl" className="border-b border-gold/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 aspect-[16/10] overflow-hidden group cursor-none"
          >
            <Link to="/the-edit/featured">
              <img 
                src="/images/blog/blog-1.webp" 
                alt="Featured Article" 
                className="w-full h-full object-cover grayscale brightness-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
              />
            </Link>
          </motion.div>
          <div className="lg:col-span-5 lg:pl-12">
            <p className="font-accent text-[10px] tracking-widest text-gold uppercase mb-6 flex items-center gap-3">
               <span className="w-8 h-[1px] bg-gold" />
               Featured Entry
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-charcoal mb-8">
              Embracing the Tropics: A Guide to Slow Living
            </h2>
            <p className="font-body text-charcoal/60 leading-relaxed mb-10 text-lg">
              We explore how adjusting our interiors to accept the Indian climate can fundamentally change the way we experience our homes.
            </p>
            <Link 
              to="/the-edit/featured" 
              className="group inline-flex items-center gap-4 py-4 px-8 border border-charcoal text-charcoal font-accent text-[10px] tracking-[0.2em] uppercase hover:bg-charcoal hover:text-white transition-all"
            >
              Read Article
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-ivory/80 backdrop-blur-md border-b border-gold/5 py-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-8 whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-accent text-[10px] tracking-widest uppercase transition-all relative py-2 ${
                activeCategory === cat ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <Section py="xl">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/the-edit/post-${idx}`} className="group block cursor-none">
                  <div className="aspect-[4/5] overflow-hidden mb-8 bg-cream border border-charcoal/5 relative">
                    <img 
                      src={`/images/blog/blog-${post.image}.webp`} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2">
                       <p className="font-accent text-[8px] tracking-widest text-charcoal uppercase">{post.date}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="font-accent text-[9px] tracking-widest text-gold uppercase">{post.category}</p>
                    <h3 className="font-display text-2xl text-charcoal leading-snug group-hover:text-gold transition-colors">{post.title}</h3>
                    <div className="w-8 h-[1px] bg-charcoal/10 group-hover:w-16 group-hover:bg-gold transition-all duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-charcoal/40">No entries in this category yet.</p>
          </div>
        )}
      </Section>
    </div>
  );
}
