import React from 'react';
import { Mail, Phone, Facebook, Twitter, Youtube, Instagram, Linkedin, Pin } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-black text-white py-1.5 border-b border-white/10 hidden md:block">
      <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center text-[11px] tracking-[0.12em] font-accent uppercase">
        {/* Left Side: Contact */}
        <div className="flex items-center gap-6">
          <a href="mailto:info@sportsurf.in" className="flex items-center gap-2 hover:text-[#B8965A] transition-colors duration-300 group">
            <Mail size={13} className="text-[#B8965A] group-hover:scale-110 transition-transform" />
            <span className="text-white">info@sportsurf.in</span>
          </a>
          <span className="text-white/20">|</span>
          <a href="tel:+919966109191" className="flex items-center gap-2 hover:text-[#B8965A] transition-colors duration-300 group">
            <Phone size={13} className="text-[#B8965A] group-hover:scale-110 transition-transform" />
            <span className="text-white">+91 9966109191</span>
          </a>
        </div>

        {/* Right Side: Social & Auth */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 border-r border-white/10 pr-8">
            <a href="#" className="text-white/80 hover:text-[#B8965A] transition-colors"><Facebook size={14} /></a>
            <a href="#" className="text-white/80 hover:text-[#B8965A] transition-colors"><Twitter size={14} /></a>
            <a href="#" className="text-white/80 hover:text-[#B8965A] transition-colors"><Youtube size={14} /></a>
            <a href="#" className="text-white/80 hover:text-[#B8965A] transition-colors"><Instagram size={14} /></a>
            <a href="#" className="text-white/80 hover:text-[#B8965A] transition-colors"><Linkedin size={14} /></a>
          </div>

          <div className="flex items-center gap-6">
            <a href="/register" className="text-white hover:text-[#B8965A] transition-colors">Registration</a>
            <span className="text-white/20">|</span>
            <a href="/login" className="hover:text-[#B8965A] transition-colors font-bold text-white uppercase">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
