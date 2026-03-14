import { useEffect, useState } from 'react';
import { Section } from '../components/Section';

export default function ContactPage() {
  const [formState, setFormState] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
      console.log("Form Submitted");
    }, 1500);
  };

  return (
    <>
      <div className="w-full bg-cream py-20 flex flex-col items-center justify-center border-b border-charcoal/5">
        <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">Get in Touch</h1>
        <p className="font-body text-charcoal/70 animate-in fade-in duration-700 delay-200">We're here to help you build your Great House.</p>
      </div>

      <Section py="2xl">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left - Contact Form */}
          <div className="w-full lg:w-[55%]" data-reveal>
            {formState === 'success' ? (
               <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-ivory/50 border border-gold/10 animate-in fade-in zoom-in-95 duration-500">
                 <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6">
                   ✓
                 </div>
                 <h3 className="font-display text-3xl mb-2">Message Sent</h3>
                 <p className="font-body text-charcoal/70">Thank you for reaching out. A member of our team will get back to you within 24 hours.</p>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Name *</label>
                  <div className="relative group">
                    <input type="text" required className="w-full bg-transparent border-b border-charcoal/20 py-3 font-body text-charcoal outline-none group-focus-within:border-transparent transition-colors" />
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left group-focus-within:scale-x-100 transition-transform duration-300"></span>
                  </div>
                </div>

                <div>
                  <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Email *</label>
                  <div className="relative group">
                    <input type="email" required className="w-full bg-transparent border-b border-charcoal/20 py-3 font-body text-charcoal outline-none group-focus-within:border-transparent transition-colors" />
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left group-focus-within:scale-x-100 transition-transform duration-300"></span>
                  </div>
                </div>

                <div>
                  <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Phone</label>
                  <div className="relative group">
                    <input type="tel" className="w-full bg-transparent border-b border-charcoal/20 py-3 font-body text-charcoal outline-none group-focus-within:border-transparent transition-colors" />
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left group-focus-within:scale-x-100 transition-transform duration-300"></span>
                  </div>
                </div>

                <div>
                  <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Subject</label>
                  <select className="w-full bg-transparent border-b border-charcoal/20 py-3 font-body text-charcoal outline-none appearance-none cursor-pointer focus:border-gold transition-colors">
                    <option>Order Enquiry</option>
                    <option>Custom Sizing</option>
                    <option>General</option>
                    <option>Press</option>
                  </select>
                </div>

                <div>
                  <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Message *</label>
                  <div className="relative group">
                    <textarea required rows="4" className="w-full bg-transparent border-b border-charcoal/20 py-3 font-body text-charcoal outline-none resize-none group-focus-within:border-transparent transition-colors"></textarea>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left group-focus-within:scale-x-100 transition-transform duration-300"></span>
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" disabled={formState === 'loading'} className="btn-gold w-full relative overflow-hidden group">
                    <span className="relative z-10 transition-colors uppercase">{formState === 'loading' ? 'Sending...' : 'Send Message →'}</span>
                    <div className="absolute inset-0 bg-gold-light transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-luxury"/>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right - Info */}
          <div className="w-full lg:w-[45%]" data-reveal delay="0.2">
            <div className="bg-charcoal text-ivory p-10 md:p-14 dark-section h-full flex flex-col justify-center">
              <h3 className="font-display text-3xl mb-10 text-gold">Contact Info</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-accent text-[10px] tracking-widest uppercase text-ivory/50 mb-2">Location</h4>
                  <p className="font-body text-lg">Hyderabad, Telangana, India<br/>(Showroom by appointment)</p>
                </div>
                
                <div>
                  <h4 className="font-accent text-[10px] tracking-widest uppercase text-ivory/50 mb-2">Phone</h4>
                  <p className="font-body text-lg">+91-99999-99999<br/><span className="text-sm opacity-70">Mon–Sat, 10am–7pm IST</span></p>
                </div>

                <div>
                  <h4 className="font-accent text-[10px] tracking-widest uppercase text-ivory/50 mb-2">Email</h4>
                  <p className="font-body text-lg">hello@greathouses.in</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-ivory/10">
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-sm font-accent text-[10px] tracking-widest uppercase hover:bg-[#1DA851] transition-colors cursor-none">
                  <span className="text-lg">💬</span> Open WhatsApp Chat →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
