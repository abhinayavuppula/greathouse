import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Check } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '',
    agreeTerms: false 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration attempt:', formData);
    // Add logic here
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-ivory px-6 py-20">
      <div className="max-w-md w-full" data-reveal>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Join Us</h1>
          <p className="text-warm-gray font-body text-sm tracking-wide">
            Create an account to start your journey with GreatHouses.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 md:p-10 shadow-sm border border-gold/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-accent text-charcoal mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                <input
                  type="text"
                  required
                  className="w-full bg-ivory/30 border border-gold/20 py-3 pl-10 pr-4 focus:border-gold outline-none transition-colors font-body text-sm"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-accent text-charcoal mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                <input
                  type="email"
                  required
                  className="w-full bg-ivory/30 border border-gold/20 py-3 pl-10 pr-4 focus:border-gold outline-none transition-colors font-body text-sm"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-accent text-charcoal mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                <input
                  type="password"
                  required
                  className="w-full bg-ivory/30 border border-gold/20 py-3 pl-10 pr-4 focus:border-gold outline-none transition-colors font-body text-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div 
                className={`mt-1 flex-shrink-0 w-4 h-4 border border-gold/40 flex items-center justify-center cursor-pointer transition-colors ${formData.agreeTerms ? 'bg-gold border-gold' : 'bg-transparent'}`}
                onClick={() => setFormData({ ...formData, agreeTerms: !formData.agreeTerms })}
              >
                {formData.agreeTerms && <Check size={10} className="text-white" />}
              </div>
              <p className="text-[10px] text-warm-gray leading-normal">
                I agree to the <a href="#" className="underline hover:text-charcoal transition-colors">Terms of Service</a> and <a href="#" className="underline hover:text-charcoal transition-colors">Privacy Policy</a>.
              </p>
            </div>

            <button type="submit" className="w-full btn-gold group" disabled={!formData.agreeTerms}>
              <span>Create Account</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gold/10"></div></div>
            <span className="relative px-4 bg-white text-[10px] uppercase tracking-widest text-warm-gray">Register with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-gold/20 py-3 hover:bg-ivory transition-colors group">
              <Chrome size={16} className="text-charcoal opacity-70 group-hover:opacity-100" />
              <span className="text-[10px] uppercase tracking-widest font-accent">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-gold/20 py-3 hover:bg-ivory transition-colors group">
              <Github size={16} className="text-charcoal opacity-70 group-hover:opacity-100" />
              <span className="text-[10px] uppercase tracking-widest font-accent">GitHub</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-warm-gray">
          Already have an account?{' '}
          <Link to="/login" className="text-gold font-accent text-[11px] uppercase tracking-widest hover:text-gold-light transition-colors ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
