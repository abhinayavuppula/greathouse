import { useEffect, useState } from 'react';
import { Section } from '../components/Section';

export default function ConsultationPage() {
  const [formState, setFormState] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <>
      <div className="w-full pt-20">
        <div className="w-full h-[50vh] relative flex flex-col items-center justify-center px-6 overflow-hidden">
          <img src="/images/consult-hero.webp" alt="Design Consultation" className="absolute inset-0 w-full h-full object-cover animate-[kenBurns_2s_var(--ease-luxury)_forwards] scale-[1.08] grayscale" />
          <div className="absolute inset-0 bg-charcoal/60"></div>
          
          <h1 className="font-display text-5xl md:text-6xl text-ivory relative z-10 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">Design Consultation</h1>
          <p className="font-body text-ivory/80 max-w-lg text-center relative z-10 animate-in fade-in duration-700 delay-200">
            Let our design specialists help you curate the perfect pieces for your unique space.
          </p>
        </div>
      </div>

      <Section py="2xl">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          <div className="w-full lg:w-1/2" data-reveal>
            <h2 className="font-display text-4xl mb-6 text-charcoal">How It Works</h2>
            <div className="space-y-12">
              <div className="flex gap-6">
                 <div className="w-10 h-10 rounded-full bg-cream shrink-0 flex items-center justify-center font-display text-xl text-gold">1</div>
                 <div>
                   <h3 className="font-accent text-sm tracking-widest uppercase text-charcoal mb-2">Book Your Session</h3>
                   <p className="font-body text-charcoal/70">Fill out the form below with details about your space, style preferences, and what you're looking for.</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="w-10 h-10 rounded-full bg-cream shrink-0 flex items-center justify-center font-display text-xl text-gold">2</div>
                 <div>
                   <h3 className="font-accent text-sm tracking-widest uppercase text-charcoal mb-2">The Consultation</h3>
                   <p className="font-body text-charcoal/70">We'll schedule a 45-minute video call to discuss floor plans, material swatches, and piece selection.</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="w-10 h-10 rounded-full bg-cream shrink-0 flex items-center justify-center font-display text-xl text-gold">3</div>
                 <div>
                   <h3 className="font-accent text-sm tracking-widest uppercase text-charcoal mb-2">Your Curated Proposal</h3>
                   <p className="font-body text-charcoal/70">You'll receive a custom presentation featuring recommended pieces, styling advice, and fabric choices tailored to your Indian home.</p>
                 </div>
              </div>
            </div>
            
            <div className="mt-16 p-8 bg-charcoal text-ivory dark-section" data-reveal delay="0.2">
              <h4 className="font-display text-2xl mb-4 italic text-gold">"The consultation saved us from making a very expensive layout mistake in our living room."</h4>
              <p className="font-accent text-[10px] tracking-widest uppercase text-ivory/50">— RAHUL M., PREVIOUS CLIENT</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-ivory border border-charcoal/10 p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]" data-reveal delay="0.1">
            {formState === 'success' ? (
               <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                 <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6">
                   ✓
                 </div>
                 <h3 className="font-display text-3xl mb-2">Request Received</h3>
                 <p className="font-body text-charcoal/70">Our design team will contact you within 24 hours to schedule your consultation slot.</p>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="font-display text-3xl mb-6">Request a Session</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">First Name *</label>
                    <input type="text" required className="w-full bg-cream border border-transparent px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Last Name *</label>
                    <input type="text" required className="w-full bg-cream border border-transparent px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-gold transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Email *</label>
                  <input type="email" required className="w-full bg-cream border border-transparent px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-gold transition-colors" />
                </div>

                <div>
                  <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Phone *</label>
                  <input type="tel" required className="w-full bg-cream border border-transparent px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-gold transition-colors" />
                </div>

                <div>
                  <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Room Type</label>
                  <select className="w-full bg-cream border border-transparent px-4 py-3 font-body text-sm text-charcoal outline-none appearance-none cursor-pointer focus:border-gold transition-colors">
                    <option>Living Room</option>
                    <option>Bedroom</option>
                    <option>Dining Room</option>
                    <option>Full Home Setup</option>
                  </select>
                </div>

                <div>
                  <label className="font-accent text-[10px] tracking-widest uppercase text-charcoal/60 block mb-2">Project Details</label>
                  <textarea rows="4" placeholder="Tell us a bit about your space and what you're looking for..." className="w-full bg-cream border border-transparent px-4 py-3 font-body text-sm text-charcoal outline-none resize-none focus:border-gold transition-colors"></textarea>
                </div>

                <div className="mt-4">
                  <button type="submit" disabled={formState === 'loading'} className="btn-gold w-full">
                    {formState === 'loading' ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                  </button>
                </div>
                <p className="text-[10px] font-accent tracking-widest uppercase text-center text-charcoal/40 mt-2">Consultations are complimentary.</p>
              </form>
            )}
          </div>

        </div>
      </Section>
    </>
  );
}
