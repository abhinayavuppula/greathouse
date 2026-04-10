import { Link } from 'react-router-dom';

const categories = [
  {
    label: 'Bedrooms',
    slug: '/shop/luxury-beds',
    bg: '#F5EFE6', // warm cream
    image: '/images/products/chettinad-bed.webp',
  },
  {
    label: 'Theme Homes',
    slug: '/shop/theme-homes',
    bg: '#FEF3C7', // pale yellow
    image: '/images/products/rattan-sofa.webp',
  },
  {
    label: 'Greathouses',
    slug: '/shop/greathouses',
    bg: '#DBEAFE', // light blue
    image: '/images/products/pooja-cabinet.webp',
  },
  {
    label: 'Kitchens',
    slug: '/shop/kitchens',
    bg: '#FEE2E2', // pale beige
    image: '/images/products/dining-table.webp',
  },
  {
    label: 'Futuristic',
    slug: '/shop/futuristic',
    bg: '#EDE9FE', // pale lavender
    image: '/images/products/cane-chair.webp',
  },
  {
    label: 'Storages',
    slug: '/shop/storages',
    bg: '#DCFCE7', // soft green
    image: '/images/products/mirror-wardrobe.webp',
  },
];

export function CategoryNav() {
  return (
    <nav className="w-full bg-white border-b border-charcoal/8 py-3 px-4 overflow-x-auto">
      <ul className="flex items-start justify-start md:justify-center gap-6 md:gap-10 min-w-max md:min-w-0 mx-auto">
        {categories.map((cat) => (
          <li key={cat.slug} className="flex-shrink-0">
            <Link
              to={cat.slug}
              className="group flex flex-col items-center gap-4"
            >
              <div className="relative flex flex-col items-center group-hover:-translate-y-2 transition-transform duration-300">
                {/* Circular background */}
                <div
                  className="w-24 h-24 md:w-[130px] md:h-[130px] rounded-full flex items-center justify-center shadow-inner overflow-hidden"
                  style={{ backgroundColor: cat.bg }}
                >
                  {/* Real product photograph instead of SVG */}
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Label */}
              <span className="font-accent mt-1.5 text-[10px] md:text-xs tracking-[0.1em] uppercase text-charcoal group-hover:text-gold transition-colors duration-200 text-center max-w-[120px] leading-tight">
                {cat.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
