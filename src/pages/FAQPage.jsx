import { useEffect, useState } from 'react';
import { Section } from '../components/Section';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "Where is Great Houses furniture made?",
      a: "All our pieces are handcrafted in artisanal workshops across India, primarily in Rajasthan, Kerala, and Tamil Nadu. We partner directly with multigenerational craftsmen to ensure traditional techniques are preserved and fair wages are paid."
    },
    {
      q: "Do you use solid wood or engineered wood?",
      a: "We exclusively use solid wood—primarily Indian Rosewood (Sheesham) and Teak—for all structural frames. We do not use MDF, particle board, or cheap veneers. Sometimes, for large flat panels (like the back of a wardrobe) to prevent natural warping, we use high-grade plywood, but our commitment is to solid, natural timber."
    },
    {
      q: "Can I request custom dimensions?",
      a: "Yes. Because every piece is made to order, we can accommodate modifications to dimensions for most of our designs. Please contact our team with the product name and your required dimensions for a custom quote."
    },
    {
      q: "How does white-glove delivery work?",
      a: "Within our primary delivery zones, our own team will transport the furniture to your home, carry it to the exact room you choose, assemble it if required, and remove all packaging. You don't have to lift a finger."
    },
    {
      q: "What is your return policy?",
      a: "We offer a 7-day return policy for standard items if you are not fully satisfied. A restocking fee may apply, and return shipping costs are deducted from the refund. Custom or modified orders cannot be returned."
    },
    {
      q: "How should I care for my solid wood furniture?",
      a: "Keep it away from direct sunlight and extreme heat sources like radiators. Dust regularly with a dry, soft cloth. Avoid abrasive chemical cleaners. We recommend polishing the wood once every 6 months using natural beeswax to maintain its luster."
    }
  ];

  return (
    <>
      <div className="w-full bg-cream py-20 flex flex-col items-center justify-center border-b border-charcoal/5">
        <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">FAQ</h1>
        <p className="font-body text-charcoal/70 animate-in fade-in duration-700 delay-200">Everything you need to know.</p>
      </div>

      <Section py="2xl">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-charcoal/10 bg-ivory overflow-hidden transition-all duration-300"
                data-reveal
                delay={idx * 0.1}
              >
                <button 
                  className="w-full px-6 py-6 flex justify-between items-center text-left bg-transparent hover:bg-cream transition-colors"
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                >
                  <span className="font-display text-xl text-charcoal pr-8">{faq.q}</span>
                  <span className="text-gold flex-shrink-0">
                    {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-400 ease-in-out ${
                    openIndex === idx ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-body text-charcoal/80 leading-relaxed pt-2 border-t border-charcoal/5">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center border-t border-charcoal/10 pt-16" data-reveal>
            <h3 className="font-display text-3xl mb-4">Still have questions?</h3>
            <p className="font-body text-charcoal/70 mb-8">Our design specialists are here to assist you.</p>
            <Link to="/contact" className="btn-outline-gold">CONTACT US</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
