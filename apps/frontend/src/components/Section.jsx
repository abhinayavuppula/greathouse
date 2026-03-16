export function Section({ children, bg = 'ivory', py = '3xl', className = '' }) {
  const bgColors = {
    ivory: 'bg-ivory text-charcoal',
    cream: 'bg-cream text-charcoal',
    charcoal: 'bg-charcoal text-ivory dark-section', // dark-section for cursor inversion
  };
  
  const paddingY = {
    xl: 'py-3 md:py-4',
    '2xl': 'py-4 md:py-6',
    '3xl': 'py-6 md:py-8',
  };

  return (
    <section className={`${bgColors[bg]} ${paddingY[py]} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {children}
      </div>
    </section>
  );
}
