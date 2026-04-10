import './WhatsAppFloat.css';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  return (
    <a 
      href="https://wa.me/919999999999?text=Hi, I'm interested in..."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float group"
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsapp-float__icon">
        <MessageCircle size={24} color="white" strokeWidth={1.5} />
      </span>
      <span className="whatsapp-float__text">💬 Chat to Order</span>
      <span className="whatsapp-float__pulse"></span>
    </a>
  );
}
