<<<<<<< HEAD:src/pages/RegisterPage.jsx
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
=======
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Logic for API call would go here
      setTimeout(() => {
        // Simulating success
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-ivory">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white overflow-hidden shadow-2xl shadow-charcoal/5">
        {/* Left Side - Context */}
        <div className="w-full md:w-2/5 p-12 bg-charcoal text-white flex flex-col justify-between">
          <div>
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase mb-4 opacity-50">Join Us</p>
            <h2 className="font-display text-4xl mb-6">Create Your Profile</h2>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-8">
              Join the Great Houses community to save your favorite pieces, track orders, and receive early access to new collections.
            </p>
            <div className="w-10 h-[1px] bg-gold" />
          </div>

          <div className="space-y-6 pt-12 border-t border-white/5 mt-auto">
             <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                   <span className="text-[10px] text-gold font-accent">01</span>
                </div>
                <p className="text-xs text-white/50 leading-tight pt-1">Curate your own moodboards and wishlists.</p>
             </div>
             <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                   <span className="text-[10px] text-gold font-accent">02</span>
                </div>
                <p className="text-xs text-white/50 leading-tight pt-1">Personalized design recommendations from our team.</p>
             </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-3/5 p-12 md:p-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="font-accent text-[9px] tracking-widest uppercase text-charcoal/50">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 group-focus-within:text-gold transition-colors" />
                  <input 
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-charcoal/5 py-3 pl-10 pr-4 font-body focus:outline-none focus:border-gold transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-accent text-[9px] tracking-widest uppercase text-charcoal/50">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 group-focus-within:text-gold transition-colors" />
                  <input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-charcoal/5 py-3 pl-10 pr-4 font-body focus:outline-none focus:border-gold transition-all"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-accent text-[9px] tracking-widest uppercase text-charcoal/50">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 group-focus-within:text-gold transition-colors" />
                    <input 
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-white border border-charcoal/5 py-3 pl-10 pr-10 font-body focus:outline-none focus:border-gold transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-accent text-[9px] tracking-widest uppercase text-charcoal/50">Confirm Password</label>
                  <input 
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-white border border-charcoal/5 py-3 px-4 font-body focus:outline-none focus:border-gold transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="font-accent text-[9px] tracking-widest uppercase text-charcoal/40 hover:text-gold transition-colors"
                >
                  {showPassword ? 'Hide Passwords' : 'Show Passwords'}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-body">{error}</p>
            )}

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-charcoal text-white py-4 font-accent text-[10px] tracking-[0.2em] uppercase hover:bg-gold transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center font-body text-sm text-charcoal/60">
            Already have an account? {' '}
            <Link to="/login" className="text-gold font-medium hover:underline tracking-tight">
              Sign In
            </Link>
          </p>
        </div>
>>>>>>> b989ed7650a0d9c0e20d98bfc30f792eb719839e:apps/frontend/src/pages/RegisterPage.jsx
      </div>
    </div>
  );
}
