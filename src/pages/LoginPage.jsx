import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Add logic here
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-ivory px-6 py-20">
      <div className="max-w-md w-full" data-reveal>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Welcome Back</h1>
          <p className="text-warm-gray font-body text-sm tracking-wide">
            Enter your credentials to access your GreatHouses account.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 md:p-10 shadow-sm border border-gold/10">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-accent text-charcoal">Password</label>
                <a href="#" className="text-[10px] uppercase tracking-[0.1em] font-accent text-gold hover:text-gold-light transition-colors">Forgot?</a>
              </div>
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

            <button type="submit" className="w-full btn-gold group">
              <span>Sign In</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gold/10"></div></div>
            <span className="relative px-4 bg-white text-[10px] uppercase tracking-widest text-warm-gray">Or continue with</span>
          </div>

          {/* Social Logins */}
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
          Don't have an account?{' '}
          <Link to="/register" className="text-gold font-accent text-[11px] uppercase tracking-widest hover:text-gold-light transition-colors ml-1">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
