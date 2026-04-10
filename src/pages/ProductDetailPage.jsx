import { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { ImageLightbox } from '../components/ImageLightbox';
import productsData from '../data/products.json';
import { useParams } from 'react-router-dom';
import { useCartStore, useWishlistStore, useToastStore } from '../store/useStore';
import { Heart } from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = productsData.find(p => p.slug === slug) || productsData[0]; // fallback
  
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('DESCRIPTION');
  
  const { addItem } = useCartStore();
  const { toggleItem, items: wishlistItems } = useWishlistStore();
  const { addToast } = useToastStore();
  
  const isHearted = wishlistItems.some(i => i.slug === product.slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleAddToCart = () => {
    addItem(product, `${selectedSize} / ${selectedMaterial}`, quantity);
    addToast('Added to cart');
  };

  const tabs = ['DESCRIPTION', 'SPECIFICATIONS', 'DELIVERY & RETURNS', 'REVIEWS (24)'];

  return (
    <>
      <Section py="lg" className="border-b border-charcoal/10 mt-10 md:mt-0">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left - Gallery */}
          <div className="w-full lg:w-[55%] animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div 
              className="aspect-square bg-cream overflow-hidden cursor-zoom-in relative group"
              onClick={() => setLightboxOpen(true)}
            >
              <img 
                src={product.images?.[activeImage] || '/placeholder.webp'} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-luxury group-hover:scale-105"
              />
            </div>
            
            {(product.images?.length || 0) > 1 && (
              <div className="flex overflow-x-auto gap-4 mt-6 pb-2 hide-scrollbar">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`min-w-[80px] w-20 aspect-square bg-cream relative ${activeImage === idx ? 'ring-1 ring-gold ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Right - Details */}
          <div className="w-full lg:w-[45%] flex flex-col pt-4 md:pt-10 animate-in fade-in slide-in-from-right-8 duration-700 delay-200 fill-mode-both">
            <Breadcrumb items={[
              { label: 'Shop', href: '/shop' },
              { label: (product.category || 'Category').replace('-', ' '), href: `/shop/${product.category || 'shop'}` },
              { label: product.name || 'Product' }
            ]} />
            
            <h1 className="font-display text-4xl lg:text-[42px] leading-[1.1] text-charcoal mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-gold text-sm cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveTab('REVIEWS (24)')}>
                ★★★★★ <span className="text-charcoal/60 ml-2 font-body">4.8 (24 reviews)</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="font-body text-2xl font-medium">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && <span className="text-charcoal/40 line-through text-lg">₹{product.originalPrice.toLocaleString('en-IN')}</span>}
              {product.originalPrice && <span className="bg-gold/10 text-gold px-3 py-1 text-[10px] font-accent tracking-widest uppercase rounded">SAVE ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}</span>}
            </div>
            
            <p className="font-body text-charcoal/80 leading-relaxed mb-10 max-w-lg">
              {product.shortDescription}
            </p>
            
            {/* Options */}
            <div className="space-y-8 mb-10">
              {product.sizes && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-accent text-[10px] tracking-widest text-charcoal/60 uppercase">Size</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`font-body text-sm px-5 py-2 transition-colors ${selectedSize === size ? 'bg-charcoal text-ivory' : 'bg-transparent border border-charcoal/20 hover:border-charcoal'}`}
                      >
                        {selectedSize === size && '■ '} {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.materials && (
                <div>
                  <span className="font-accent text-[10px] tracking-widest text-charcoal/60 uppercase block mb-3">Material / Finish</span>
                  <div className="flex flex-wrap gap-3">
                    {product.materials.map(mat => (
                      <button 
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`font-body text-sm px-5 py-2 transition-colors flex items-center gap-2 ${selectedMaterial === mat ? 'bg-charcoal text-ivory' : 'bg-transparent border border-charcoal/20 hover:border-charcoal'}`}
                      >
                        <span className={`w-3 h-3 rounded-full ${mat.includes('Walnut') ? 'bg-[#5c4033]' : mat.includes('Ebony') ? 'bg-[#2a2a2a]' : 'bg-[#d2b48c]'}`}></span>
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="font-accent text-[10px] tracking-widest text-charcoal/60 uppercase block mb-3">Quantity</span>
                <div className="flex items-center border border-charcoal/20 w-max">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-charcoal/60 hover:text-charcoal transition-colors">−</button>
                  <span className="font-body text-sm font-medium w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-charcoal/60 hover:text-charcoal transition-colors">+</button>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={handleAddToCart}
                className="flex-1 btn-gold relative overflow-hidden group py-[16px]"
              >
                <span className="relative z-10 transition-colors">ADD TO CART</span>
                <div className="absolute inset-0 bg-gold-light transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-luxury"/>
              </button>
              <button 
                onClick={() => toggleItem(product)}
                className="flex-1 btn-outline-gold group flex items-center justify-center gap-2 py-[15px]"
              >
                <Heart size={14} fill={isHearted ? 'currentColor' : 'transparent'} className="transition-all duration-300 group-hover:scale-110" />
                {isHearted ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>

            {/* Guarantees */}
            <div className="border-y border-charcoal/10 py-6 space-y-4 font-body text-sm text-charcoal/80">
              <p className="flex items-center gap-3"><span className="text-xl">📦</span> Free delivery to Hyderabad — Est. 7-12 working days</p>
              <p className="flex items-center gap-3"><span className="text-xl">📐</span> Custom sizing available — Contact us</p>
              <p className="flex items-center gap-3"><span className="text-xl">🛡️</span> 3-Year Warranty included</p>
            </div>

            <a href="https://wa.me/919999999999" className="mt-8 flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] py-4 rounded-sm font-accent text-[10px] tracking-widest uppercase hover:bg-[#25D366]/20 transition-colors">
              <span className="text-lg">💬</span> Chat on WhatsApp to Order
            </a>

          </div>
        </div>
      </Section>

      {/* Tabs Section */}
      <Section py="xl" className="border-b border-charcoal/10">
        <div className="flex overflow-x-auto hide-scrollbar gap-8 md:gap-12 mb-12 border-b border-charcoal/10 relative">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-accent text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-charcoal' : 'text-charcoal/40 hover:text-charcoal/80'}`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold" data-reveal="scale" />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[200px] animate-in fade-in duration-500">
          {activeTab === 'DESCRIPTION' && (
            <div className="max-w-3xl font-body text-charcoal/80 leading-relaxed space-y-6">
              <p>{product.description}</p>
              <p>Built with uncompromising quality, every piece is a testament to the artisan's dedication to their craft.</p>
            </div>
          )}
          {activeTab === 'SPECIFICATIONS' && (
            <div className="max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <div key={key} className="flex flex-col border-b border-charcoal/10 pb-4">
                    <span className="font-accent text-[10px] tracking-widest text-charcoal/50 uppercase mb-1">{key}</span>
                    <span className="font-body text-charcoal">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'DELIVERY & RETURNS' && (
            <div className="max-w-3xl font-body text-charcoal/80 leading-relaxed space-y-6">
              <h4 className="font-display text-2xl text-charcoal mb-4">Delivery</h4>
              <p>We offer white-glove delivery across all major Indian cities. Your furniture will be unwrapped, assembled, and placed exactly where you want it by our trained team.</p>
              <h4 className="font-display text-2xl text-charcoal mt-8 mb-4">Returns</h4>
              <p>We accept returns within 7 days of delivery for standard items. Custom-sized items are non-refundable. Please keep original packaging.</p>
            </div>
          )}
          {activeTab === 'REVIEWS (24)' && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-6 mb-12">
                <span className="font-display text-6xl text-gold">4.8</span>
                <div className="flex flex-col">
                  <span className="text-gold text-lg tracking-widest">★★★★★</span>
                  <span className="font-accent text-[10px] tracking-widest text-charcoal/50 uppercase">Based on 24 reviews</span>
                </div>
              </div>
              
              {/* Dummy Review */}
              <div className="border-t border-charcoal/10 pt-8 mt-8">
                <div className="flex text-gold text-sm tracking-widest mb-3">★★★★★</div>
                <h5 className="font-display text-2xl mb-2">Beautiful craftsmanship</h5>
                <p className="font-body text-charcoal/80 mb-4">"The bed is exactly what we wanted for our new home. The detailing is perfect and the quality of teak feels very premium."</p>
                <span className="font-accent text-[10px] tracking-widest text-charcoal/50 uppercase">— ADITI S., HYDERABAD</span>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* You May Also Love */}
      <Section py="2xl">
        <div className="flex justify-between items-end mb-12">
          <h3 className="font-display text-3xl md:text-4xl" data-reveal>You May Also Love</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.slice(0, 4).map((p, idx) => (
             <div key={p.id} data-reveal delay={idx * 0.1}>
               <ProductCard product={p} />
             </div>
          ))}
        </div>
      </Section>

      {lightboxOpen && (
        <ImageLightbox images={product.images || ['/placeholder.webp']} currentIndex={activeImage} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}
