import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export function PageTransition({ children }) {
  const curtainRef = useRef(null);
  const logoRef = useRef(null);
  const location = useLocation();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    const tl = gsap.timeline();
    // Curtain enters (covers screen from bottom)
    tl.set(curtainRef.current, { top: '100vh' })
      .to(curtainRef.current, { top: 0, duration: 0.5, ease: 'power3.inOut' })
      .to(logoRef.current, { opacity: 1, duration: 0.2 }, '-=0.1')
      // Scroll to top while curtain is closed
      .call(() => window.scrollTo(0, 0))
      // Curtain leaves (reveals new page by pulling up)
      .to(logoRef.current, { opacity: 0, duration: 0.15 }, '+=0.15')
      .to(curtainRef.current, { top: '-100vh', duration: 0.5, ease: 'power3.inOut' })
      .set(curtainRef.current, { top: '100vh' }); // reset for next time
  }, [location.pathname]);

  return (
    <>
      <div ref={curtainRef} className="page-curtain">
        <span ref={logoRef} className="page-curtain__logo">GH</span>
      </div>
      {children}
    </>
  );
}
