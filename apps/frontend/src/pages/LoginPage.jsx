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
                />
              </div>
            </div>

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
      </div>
    </div>
  );
}
