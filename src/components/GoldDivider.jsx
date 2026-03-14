export function GoldDivider({ width = '48px', className = '' }) {
  return (
    <div 
      className={`h-[1.5px] bg-gold origin-left transition-transform duration-700 ease-luxury ${className}`} 
      style={{ width }}
      data-reveal
    />
  );
}
