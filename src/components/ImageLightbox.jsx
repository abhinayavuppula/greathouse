import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function ImageLightbox({ images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      if (e.key === 'ArrowLeft') setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  const handleNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-[#1C1A17]/95 flex items-center justify-center transition-opacity duration-300 pointer-events-auto"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-ivory/60 hover:text-white transition-colors p-2"
        onClick={onClose}
      >
        <X size={32} strokeWidth={1} />
      </button>

      {images.length > 1 && (
        <>
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-white transition-colors p-4"
            onClick={handlePrev}
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-white transition-colors p-4"
            onClick={handleNext}
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        </>
      )}

      <div 
        className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={images[index]} 
          alt={`Gallery image ${index + 1}`} 
          className="max-w-full max-h-full object-contain animate-in fade-in zoom-in-95 duration-400"
        />
        
        {images.length > 1 && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1 transition-all duration-300 ${i === index ? 'w-8 bg-gold' : 'w-2 bg-ivory/30 hover:bg-ivory/60'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
