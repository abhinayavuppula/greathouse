import { useEffect } from 'react';
import { Section } from '../components/Section';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen pt-20 flex flex-col">
      <Section className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-[120px] md:text-[180px] leading-none text-charcoal/10 font-bold tracking-tighter animate-in fade-in zoom-in-95 duration-1000">404</h1>
        <div className="relative z-10 -mt-10 md:-mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6">Page Not Found</h2>
          <p className="font-body text-charcoal/70 text-lg mb-10 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-gold">RETURN HOME</Link>
            <Link to="/shop" className="btn-outline-gold">EXPLORE COLLECTION</Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
