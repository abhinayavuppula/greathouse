import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useUIStore, useCartStore, useWishlistStore } from '../store/useStore';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { toggleMobileNav, isMobileNavOpen, openCart } = useUIStore();
  const cartCount = useCartStore((state) => state.getCartCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`sticky top-0 z-40 w-full transition-all duration-400 ease-luxury ${
          scrolled ? 'bg-ivory/92 backdrop-blur-md shadow-[0_1px_0_rgba(184,150,90,0.15)] h-[72px]' : 'bg-transparent h-[80px]'
        }`}
      >
        <div className="h-full px-6 md:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-charcoal" onClick={toggleMobileNav}>
            {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center justify-center -mt-1 group cursor-none">
            <span className="font-display text-3xl tracking-widest text-charcoal relative">
              <span className={`transition-opacity duration-400 ${scrolled ? 'opacity-0 absolute' : 'opacity-100'}`}>GH</span>
              <span className={`transition-opacity duration-400 ${scrolled ? 'opacity-100' : 'opacity-0 absolute'}`}>GREAT HOUSES</span>
            </span>
            <span className="w-8 h-[1px] bg-gold mt-1 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide">
            <Link to="/spaces" className="hover:text-gold transition-colors cursor-none relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300">Spaces</Link>
            <Link to="/collections" className="hover:text-gold transition-colors cursor-none relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300">Collections</Link>
            <Link to="/lookbook" className="hover:text-gold transition-colors cursor-none relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300">Lookbook</Link>
            <Link to="/the-edit" className="hover:text-gold transition-colors cursor-none relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300">The Edit</Link>
          </div>

          {/* Icons & CTA */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/login" className="text-charcoal hover:text-gold transition-colors cursor-none">
              <span className="font-accent text-[10px] tracking-widest uppercase hidden lg:inline mr-1">Sign In</span>
              <Search size={20} className="lg:hidden" strokeWidth={1.5} />
            </Link>
            <Link to="/wishlist" className="text-charcoal hover:text-gold transition-colors relative cursor-none">
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && <span className="absolute -top-1 -right-2 bg-gold text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-accent">{wishlistCount}</span>}
            </Link>
            <button onClick={openCart} className="text-charcoal hover:text-gold transition-colors relative cursor-none">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-gold text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-accent">{cartCount}</span>}
            </button>
            <Link to="/consultation" className="btn-outline-gold hidden lg:flex ml-2 cursor-none">CONSULT →</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-charcoal z-50 transform transition-transform duration-500 ease-snap ${isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full relative">
          <button className="absolute top-6 right-6 text-ivory" onClick={toggleMobileNav}>
            <X size={28} />
          </button>
          
          <div className="flex justify-center mb-16 pt-4">
            <span className="font-display text-3xl tracking-widest text-gold relative">GH</span>
          </div>

          <div className="flex flex-col gap-6 font-display text-4xl text-ivory">
            <Link to="/shop" onClick={toggleMobileNav} className="hover:text-gold transition-colors">Shop All</Link>
            <Link to="/lookbook" onClick={toggleMobileNav} className="hover:text-gold transition-colors">Lookbook</Link>
            <Link to="/the-edit" onClick={toggleMobileNav} className="hover:text-gold transition-colors">The Edit</Link>
            <Link to="/our-story" onClick={toggleMobileNav} className="hover:text-gold transition-colors">Our Story</Link>
            <Link to="/contact" onClick={toggleMobileNav} className="hover:text-gold transition-colors">Contact</Link>
          </div>

          <div className="mt-auto mb-12">
             <Link to="/consultation" onClick={toggleMobileNav} className="btn-outline-ivory w-full mb-4">BOOK A CONSULTATION</Link>
             <button className="w-full bg-[#25D366] text-white tracking-[0.1em] font-accent text-[11px] uppercase py-[14px] px-[32px] hover:bg-[#1DA851] transition-colors duration-300">
               WhatsApp Us
             </button>
          </div>
        </div>
      </div>
    </>
  );
}
