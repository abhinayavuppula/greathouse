import React from 'react';
import { cn } from '../lib/utils';
// These will be imported once we create the actual section components
// For now, we stub them with a simple placeholder

const HeroBanner = ({ content, styles }) => (
  <section style={styles} className="hero-banner relative flex items-center justify-center min-h-[500px]">
    {content.backgroundImage && (
      <img src={content.backgroundImage} className="absolute inset-0 w-full h-full object-cover" alt="" />
    )}
    <div className="relative z-10 text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: content.textColor }}>{content.headline}</h1>
      <p className="text-lg md:text-xl" style={{ color: content.textColor }}>{content.subheadline}</p>
    </div>
  </section>
);

const TextContent = ({ content, styles }) => (
  <section style={styles} className="py-16 px-4">
    <div className="max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: content.richText }} />
  </section>
);

const FeaturedProducts = ({ content, styles }) => (
  <section style={styles} className="py-16 px-4">
    <h2 className="text-3xl font-bold text-center mb-12">{content.sectionTitle}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Product cards will go here */}
      <p className="col-span-3 text-center text-muted">Featured products content...</p>
    </div>
  </section>
);

const ImageTextSplit = ({ content, styles }) => (
  <section style={styles} className={cn("py-16 px-4 flex flex-col md:flex-row items-center gap-12", content.imagePosition === 'right' ? 'md:flex-row-reverse' : '')}>
    <div className="flex-1">
      {content.image && <img src={content.image} className="rounded-lg shadow-xl" alt="" />}
    </div>
    <div className="flex-1 space-y-4">
      <h2 className="text-3xl font-bold">{content.headline}</h2>
      <div dangerouslySetInnerHTML={{ __html: content.richText }} />
      {content.showButton && (
        <a href={content.buttonLink} className="inline-block px-6 py-3 bg-secondary text-white rounded font-medium">
          {content.buttonText}
        </a>
      )}
    </div>
  </section>
);

const StatsCounter = ({ content, styles }) => (
  <section style={styles} className="py-12 bg-primary text-white">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {content.stats?.map((stat, i) => (
        <div key={i}>
          <p className="text-4xl font-bold mb-2">{stat.value}</p>
          <p className="text-sm text-white/70">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

const Newsletter = ({ content, styles }) => (
  <section style={styles} className="py-16 px-4 text-center bg-accent/20">
    <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
    <p className="text-muted mb-8">{content.subtitle}</p>
    <form className="max-w-md mx-auto flex gap-2">
      <input type="email" placeholder={content.placeholder} className="flex-1 px-4 py-2 rounded border border-border" />
      <button type="submit" className="px-6 py-2 bg-secondary text-white rounded font-medium">{content.buttonText}</button>
    </form>
  </section>
);

const FaqAccordion = ({ content, styles }) => (
  <section style={styles} className="py-16 px-4 max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold mb-12 text-center">{content.sectionTitle}</h2>
    <div className="space-y-4">
      {content.items?.map((item, i) => (
        <details key={i} className="border-b border-border pb-4 group">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center py-2">
            {item.question}
            <span className="group-open:rotate-180 transition-transform">↓</span>
          </summary>
          <p className="pt-2 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  </section>
);

const SectionMap = {
  HERO_BANNER: HeroBanner,
  IMAGE_TEXT_SPLIT: ImageTextSplit,
  TEXT_CONTENT: TextContent,
  FEATURED_PRODUCTS: FeaturedProducts,
  STATS_COUNTER: StatsCounter,
  NEWSLETTER: Newsletter,
  CONTACT_FORM: Newsletter, // Reuse newsletter layout for now
  FAQ_ACCORDION: FaqAccordion,
};

export function SectionRenderer({ sections = [] }) {
  if (!sections || !sections.length) return null;

  return (
    <>
      {sections.filter(s => s.visible).map((section) => {
        const Component = SectionMap[section.type];
        if (!Component) {
          console.warn(`Unknown section type: ${section.type}`);
          return null;
        }

        // Parse styles from JSON if needed
        const styles = typeof section.styles === 'string' ? JSON.parse(section.styles) : section.styles;
        const content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;

        // Construct CSS style object from section styles
        const cssStyles = {
          backgroundColor: styles.backgroundColor,
          color: styles.textColor,
          paddingTop: styles.paddingTop ? `${styles.paddingTop}px` : undefined,
          paddingBottom: styles.paddingBottom ? `${styles.paddingBottom}px` : undefined,
          borderRadius: styles.borderRadius ? `${styles.borderRadius}px` : undefined,
          // ... handle more styles
        };

        return <Component key={section.id} content={content} styles={cssStyles} />;
      })}
    </>
  );
}
