import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.revealDelay || 0;
          setTimeout(() => e.target.classList.add('is-revealed'), delay * 1000);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
    
    return () => {
      els.forEach(el => observer.unobserve(el));
    }
  }, []);
}
