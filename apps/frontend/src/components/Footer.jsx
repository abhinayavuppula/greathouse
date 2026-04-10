import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-20 border-t border-charcoal dark-section relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1 */}
          <div data-reveal delay="0.1">
            <h2 className="font-display text-3xl tracking-widest text-gold mb-6">GH</h2>
            <p className="text-sm text-ivory/70 leading-relaxed mb-8 max-w-[240px]">
              Luxury furniture rooted in Indian heritage, designed for the way you live today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gold transition-colors">IG</a>
              <a href="#" className="hover:text-gold transition-colors">FB</a>
              <a href="#" className="hover:text-gold transition-colors">IN</a>
              <a href="#" className="hover:text-gold transition-colors">PT</a>
            </div>
          </div>

          {/* Col 2 */}
          <div data-reveal delay="0.2">
            <h4 className="font-accent tracking-[0.15em] text-xs text-gold mb-6 uppercase">Explore</h4>
            <ul className="space-y-3 text-sm text-ivory/80 font-body">
              <li><Link to="/our-story" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
              <li><Link to="/the-edit" className="hover:text-white transition-colors">The Edit (Blog)</Link></li>
              <li><Link to="/consultation" className="hover:text-white transition-colors">Book a Consultation</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div data-reveal delay="0.3">
            <h4 className="font-accent tracking-[0.15em] text-xs text-gold mb-6 uppercase">Support</h4>
            <ul className="space-y-3 text-sm text-ivory/80 font-body">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div data-reveal delay="0.4">
            <h4 className="font-accent tracking-[0.15em] text-xs text-gold mb-6 uppercase">Newsletter</h4>
            <p className="font-display text-xl mb-2 text-white">Design Intelligence, Delivered.</p>
            <p className="text-xs text-ivory/70 mb-6">Stay ahead with new collections, styling guides & exclusive offers.</p>
            
            <form className="flex border-b border-ivory/30 pb-2 mb-8 group focus-within:border-gold transition-colors">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none outline-none text-sm w-full font-body placeholder:text-ivory/40"
              />
              <button type="submit" className="font-accent text-[10px] tracking-widest text-gold hover:text-gold-light">JOIN →</button>
            </form>
            
            <div className="flex gap-3 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
               {/* Payment icons placeholder */}
               <span className="text-xs font-accent tracking-wider">UPI / VISA / MC / COD</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-ivory/10 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-body text-ivory/50">
          <p>© 2025 Great Houses. All rights reserved.</p>
          <p className="my-2 md:my-0">Made with love in India 🇮🇳</p>
          <p>GST: 36ABCDE1234F1Z5</p>
        </div>
      </div>
    </footer>
  );
}
