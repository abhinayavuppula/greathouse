import React from 'react';
import { User, Package, Settings, LogOut, ChevronRight, Star, Heart } from 'lucide-react';

export default function UserProfilePage() {
  const user = {
    name: 'Abhinaya Vuppula',
    email: 'abhinaya@example.com',
    memberSince: 'March 2024',
    recentOrders: [
      { id: 'ORD-7721', date: '2024-03-10', status: 'Delivered', amount: '₹12,500' },
      { id: 'ORD-7689', date: '2024-02-28', status: 'In Transit', amount: '₹4,200' },
    ]
  };

  return (
    <div className="bg-ivory min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-charcoal pt-32 pb-20 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-32 h-32 rounded-full border-2 border-gold/30 p-1 flex items-center justify-center bg-white/5 overflow-hidden">
            <User size={64} className="text-gold" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-display text-4xl md:text-5xl text-white mb-2">{user.name}</h1>
            <p className="text-ivory/60 font-body text-sm tracking-widest uppercase">{user.email}</p>
            <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
              <span className="text-[10px] uppercase tracking-widest text-gold border border-gold/30 px-3 py-1 rounded-full">Pro Member</span>
              <span className="text-[10px] uppercase tracking-widest text-ivory/40">Since {user.memberSince}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { icon: User, label: 'Profile Overview', active: true },
              { icon: Package, label: 'My Orders', active: false },
              { icon: Heart, label: 'Wishlist', active: false },
              { icon: Star, label: 'Reviews', active: false },
              { icon: Settings, label: 'Settings', active: false },
              { icon: LogOut, label: 'Sign Out', active: false, color: 'text-red-500/70' }
            ].map((item, idx) => (
              <button 
                key={idx}
                className={`w-full flex items-center justify-between p-4 transition-all duration-300 ${item.active ? 'bg-white shadow-sm border border-gold/10' : 'hover:bg-gold/5 opacity-60 hover:opacity-100'}`}
              >
                <div className={`flex items-center gap-4 ${item.color || 'text-charcoal'}`}>
                  <item.icon size={18} />
                  <span className="text-[11px] uppercase tracking-widest font-accent font-semibold">{item.label}</span>
                </div>
                {item.active && <ChevronRight size={14} className="text-gold" />}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-10">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Orders Placing', val: '12' },
                { label: 'Wishlist Items', val: '24' },
                { label: 'Reward Points', val: '1,500' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 border border-gold/10 shadow-sm text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-warm-gray mb-2">{stat.label}</p>
                  <p className="text-3xl font-display text-charcoal">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-8 md:p-10 border border-gold/10 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-display text-2xl text-charcoal">Recent Orders</h3>
              </div>
              
              <div className="space-y-6">
                {user.recentOrders.map((order, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-ivory-dark group hover:border-gold/30 transition-colors">
                    <div className="flex flex-col gap-1 mb-4 md:mb-0">
                      <span className="text-[10px] uppercase tracking-widest text-warm-gray">{order.date}</span>
                      <span className="font-accent font-bold text-sm text-charcoal">{order.id}</span>
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-widest text-warm-gray">Amount</span>
                        <span className="font-body text-sm font-semibold">{order.amount}</span>
                      </div>
                      <div className="flex flex-col items-end min-w-[100px]">
                        <span className="text-[10px] uppercase tracking-widest text-warm-gray">Status</span>
                        <span className={`text-[11px] uppercase tracking-widest font-bold ${order.status === 'Delivered' ? 'text-green-600' : 'text-gold'}`}>{order.status}</span>
                      </div>
                      <button className="p-2 border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-10 p-4 border border-gold/20 text-gold font-accent text-[11px] uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-500">
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ArrowRight = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14m-7-7 7 7-7 7"/>
  </svg>
);
