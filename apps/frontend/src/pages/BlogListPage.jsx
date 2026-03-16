import { useEffect } from 'react';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';

export default function BlogListPage() {
  const posts = [
    { title: "How to Create a Hotel-Like Bedroom in India", category: "DESIGN TIPS", image: 1 },
    { title: "The Enduring Appeal of Chettinad Craft", category: "CRAFTSMANSHIP", image: 2 },
    { title: "Styling Rattan for the Modern Apartment", category: "STYLING", image: 3 },
    { title: "Why Solid Teak Wood Outlasts Everything Else", category: "MATERIALS", image: 2 },
    { title: "Interview with our Master Joiner, Ramesh", category: "PEOPLE", image: 3 },
    { title: "Preparing Your Wood Furniture for the Monsoon", category: "CARE", image: 1 },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-full pt-20 border-b border-charcoal/5">
        <div className="w-full h-[400px] flex flex-col items-center justify-center p-6 bg-charcoal text-ivory dark-section relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,...')]" />
          <h1 className="font-display text-5xl md:text-7xl mb-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">The Edit</h1>
          <p className="font-body text-ivory/70 max-w-lg text-center relative z-10 animate-in fade-in duration-700 delay-200">
            Journal entries on design, craft, and the art of living well in India.
          </p>
        </div>
      </div>

      {/* Featured Article */}
      <Section py="2xl" className="border-b border-charcoal/10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-[60%] aspect-[16/9] lg:aspect-[4/3] bg-cream overflow-hidden group cursor-none block">
            <Link to={`/the-edit/featured`}>
              <img src="/images/blog/blog-1.webp" alt="Featured" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]" />
            </Link>
          </div>
          <div className="w-full lg:w-[40%] flex flex-col justify-center" data-reveal="left" delay="0.2">
            <span className="font-accent text-[10px] tracking-widest text-gold uppercase mb-6 block">FEATURED · INTERIORS</span>
            <Link to={`/the-edit/featured`} className="hover:text-gold transition-colors block">
              <h2 className="font-display text-4xl lg:text-5xl leading-tight text-charcoal mb-6">Embracing the Tropics: A Guide to Slow Living</h2>
            </Link>
            <p className="font-body text-charcoal/70 leading-relaxed mb-8">
              We explore how adjusting our interiors to accept the Indian climate—rather than fighting it with enclosed spaces and heavy drapes—can fundamentally change the way we experience our homes.
            </p>
            <Link to={`/the-edit/featured`} className="font-accent text-[10px] tracking-widest text-charcoal uppercase border-b border-charcoal/30 pb-1 self-start hover:text-gold hover:border-gold transition-colors">
              READ FULL ARTICLE →
            </Link>
          </div>
        </div>
      </Section>

      <Section py="2xl">
        <div className="flex justify-between items-end mb-12" data-reveal>
          <h3 className="font-display text-3xl">Latest Articles</h3>
          <div className="hidden md:flex gap-6 font-accent text-[10px] tracking-widest uppercase text-charcoal/60">
            <button className="text-charcoal hover:text-gold transition-colors">All</button>
            <button className="hover:text-gold transition-colors">Design Tips</button>
            <button className="hover:text-gold transition-colors">Craftsmanship</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post, idx) => (
            <Link to={`/the-edit/post-${idx}`} key={idx} className="group block cursor-none" data-reveal delay={(idx % 3) * 0.1}>
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-cream border border-charcoal/5">
                <img src={`/images/blog/blog-${post.image}.webp`} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <span className="font-accent text-[9px] tracking-widest text-gold uppercase block mb-4">{post.category}</span>
              <h3 className="font-display text-2xl leading-snug text-charcoal mb-4 group-hover:text-gold transition-colors">{post.title}</h3>
              <p className="font-body text-charcoal/70 text-sm line-clamp-2 mb-6">Brief excerpt demonstrating the content of the article and inviting the reader to continue reading.</p>
              <span className="font-accent text-[10px] tracking-widest text-charcoal uppercase group-hover:text-gold transition-colors">READ MORE →</span>
            </Link>
          ))}
        </div>
        
        <div className="mt-20 text-center" data-reveal delay="0.2">
          <button className="btn-outline-gold">LOAD OLDER POSTS</button>
        </div>
      </Section>
    </>
  );
}
