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
      </div>
    </div>
  );
}
