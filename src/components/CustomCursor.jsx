import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate(calc(${clientX}px - 50%), calc(${clientY}px - 50%))`;
        ringRef.current.style.transform = `translate(calc(${clientX}px - 50%), calc(${clientY}px - 50%))`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block"></div>
      <div ref={ringRef} className="cursor-ring hidden md:block"></div>
    </>
  );
}
