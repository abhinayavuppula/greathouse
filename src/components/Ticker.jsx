import './Ticker.css';

export function Ticker() {
  const items = [
    "Free Delivery Across India on Orders Over ₹5,000",
    "Handcrafted Luxury Furniture — Rooted in Indian Heritage",
    "3-Year Warranty on Every Piece",
    <span key="cta-1" className="ticker-item--cta">Custom Sizing Available on Request</span>,
    "COD Available · UPI · EMI · Net Banking",
    "Trusted by 500+ Indian Homes",
    <span key="cta-2" className="ticker-item--cta">New: Chettinad Modern Series — Shop Now</span>,
    "Pooja Mandals Now In Stock",
    "Hotel-Like Bedroom Designs for Every Budget"
  ];

  const renderItems = () => {
    return items.map((item, idx) => (
      <div key={idx} className="ticker-item-group">
        <span className="ticker-item--sep">✦</span>
        <span className="ticker-item">{item}</span>
      </div>
    ));
  };

  return (
    <div className="ticker-wrap h-[32px] md:h-[38px]">
      <div className="ticker-track">
        {renderItems()}
        {renderItems()}
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
}
