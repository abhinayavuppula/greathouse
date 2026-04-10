import { Link } from 'react-router-dom';

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 font-accent text-[10px] tracking-[0.15em] uppercase text-warm-gray mb-6">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-gold">{item.label}</span>
            ) : (
              <>
                <Link to={item.href} className="hover:text-charcoal transition-colors">
                  {item.label}
                </Link>
                <span className="text-gold opacity-50">→</span>
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
