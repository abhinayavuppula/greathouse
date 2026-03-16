import { useToastStore } from '../store/useStore';
import { Check } from 'lucide-react';

export function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className="bg-charcoal text-ivory px-6 py-4 min-w-[280px] shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300"
        >
          <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center text-gold">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="font-body text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
