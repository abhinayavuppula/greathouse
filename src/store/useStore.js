import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// UI State Store (Cart Drawer, Mobile Nav)
export const useUIStore = create((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
}));

// Wishlist Store
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const items = get().items;
        const exists = items.some(i => i.slug === product.slug);
        if (exists) {
          set({ items: items.filter(i => i.slug !== product.slug) });
        } else {
          set({ items: [...items, product] });
        }
      },
      removeItem: (slug) => set({ items: get().items.filter(i => i.slug !== slug) }),
      clearWishlist: () => set({ items: [] })
    }),
    { name: 'gh-wishlist-storage' }
  )
);

// Cart Store
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(i => i.slug === product.slug && i.variant === variant);
        if (existingItem) {
          set({
            items: items.map(i => i.slug === product.slug && i.variant === variant
              ? { ...i, quantity: i.quantity + quantity } : i)
          });
        } else {
          set({ items: [...items, { ...product, variant, quantity }] });
        }
        useUIStore.getState().openCart();
      },
      removeItem: (slug, variant) => {
        set({ items: get().items.filter(i => !(i.slug === slug && i.variant === variant)) });
      },
      updateQuantity: (slug, variant, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map(i => i.slug === slug && i.variant === variant
            ? { ...i, quantity } : i)
        });
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
      getCartCount: () => get().items.reduce((count, item) => count + item.quantity, 0)
    }),
    { name: 'gh-cart-storage' }
  )
);

// Toast Store
export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 2500);
  },
}));
