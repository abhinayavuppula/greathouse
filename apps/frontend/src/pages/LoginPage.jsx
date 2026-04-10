<<<<<<< HEAD:src/pages/LoginPage.jsx
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
=======
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Logic for API call would go here
      // For now, simulating a successful login
      setTimeout(() => {
        const mockUser = { id: '1', email, name: 'Guest User', role: 'USER' };
        const mockToken = 'mock-jwt-token';
        setAuth(mockUser, mockToken);
        navigate('/');
      }, 1500);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-ivory">
      {/* Left Side - Visual */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="/images/auth-bg.webp" 
            alt="Interior Inspiration" 
            className="w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-charcoal/20" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-20 text-white">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase mb-4 opacity-70">Elevate Your Living</p>
            <h2 className="font-display text-5xl mb-6">Welcome Back to <br /> Great Houses</h2>
            <div className="w-12 h-[1px] bg-gold" />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h1 className="font-display text-4xl text-charcoal mb-4 text-center lg:text-left">Sign In</h1>
            <p className="font-body text-charcoal/60 text-center lg:text-left">Enter your details to access your profile and saved favorites.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-accent text-[9px] tracking-widest uppercase text-charcoal/50">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 group-focus-within:text-gold transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-charcoal/5 py-3 pl-10 pr-4 font-body focus:outline-none focus:border-gold transition-all"
                  placeholder="name@example.com"
                  required
>>>>>>> b989ed7650a0d9c0e20d98bfc30f792eb719839e:apps/frontend/src/pages/LoginPage.jsx
                />
              </div>
            </div>

<<<<<<< HEAD:src/pages/LoginPage.jsx
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
=======
            <div className="space-y-2">
              <label className="font-accent text-[9px] tracking-widest uppercase text-charcoal/50">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 group-focus-within:text-gold transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-charcoal/5 py-3 pl-10 pr-12 font-body focus:outline-none focus:border-gold transition-all"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-gold transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-right">
                <Link to="/forgot-password" size="sm" className="font-accent text-[9px] tracking-widest uppercase text-charcoal/40 hover:text-gold transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-body animate-shake">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-charcoal text-white py-4 font-accent text-[10px] tracking-[0.2em] uppercase hover:bg-gold transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center font-body text-sm text-charcoal/60">
            Don't have an account? {' '}
            <Link to="/register" className="text-gold font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
>>>>>>> b989ed7650a0d9c0e20d98bfc30f792eb719839e:apps/frontend/src/pages/LoginPage.jsx
      </div>
    </div>
  );
}
