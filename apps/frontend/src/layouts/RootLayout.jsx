import { Outlet } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { Ticker } from '../components/Ticker';
import { NavBar } from '../components/NavBar';
import { CategoryNav } from '../components/CategoryNav';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { CartDrawer } from '../components/CartDrawer';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { ToastContainer } from '../components/Toast';
import { TopBar } from '../components/TopBar';

export function RootLayout() {
  useReveal(); // Initialize GSAP scroll-reveal system globally

  return (
    <div className="flex flex-col min-h-screen bg-ivory text-charcoal selection:bg-gold selection:text-white">
      <TopBar />
      <NavBar />
      <CategoryNav />
      <Ticker />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      
      <CartDrawer />
      <WhatsAppFloat />
      <ToastContainer />
      <CustomCursor />
    </div>
  );
}
