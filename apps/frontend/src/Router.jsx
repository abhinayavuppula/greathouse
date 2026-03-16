import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootLayout } from './layouts/RootLayout';
import { PageTransition } from './components/PageTransition';

import HomePage from './pages/HomePage';
import ShopAllPage from './pages/ShopAllPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import OurStoryPage from './pages/OurStoryPage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import FAQPage from './pages/FAQPage';
import WishlistPage from './pages/WishlistPage';
import SearchPage from './pages/SearchPage';
import LookbookPage from './pages/LookbookPage';
import ConsultationPage from './pages/ConsultationPage';
import NotFoundPage from './pages/NotFoundPage';
import DynamicPage from './pages/DynamicPage';

const Wrap = ({ children }) => (
  <PageTransition>
    {children}
  </PageTransition>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Wrap><DynamicPage /></Wrap> }, // Use DynamicPage for home as well
      { path: 'shop', element: <Wrap><ShopAllPage /></Wrap> },
      { path: 'shop/:category', element: <Wrap><CategoryPage /></Wrap> },
      { path: 'product/:slug', element: <Wrap><ProductDetailPage /></Wrap> },
      { path: 'about', element: <Wrap><AboutPage /></Wrap> },
      { path: 'our-story', element: <Wrap><OurStoryPage /></Wrap> },
      { path: 'contact', element: <Wrap><ContactPage /></Wrap> },
      { path: 'the-edit', element: <Wrap><BlogListPage /></Wrap> },
      { path: 'the-edit/:slug', element: <Wrap><BlogPostPage /></Wrap> },
      { path: 'faq', element: <Wrap><FAQPage /></Wrap> },
      { path: 'wishlist', element: <Wrap><WishlistPage /></Wrap> },
      { path: 'search', element: <Wrap><SearchPage /></Wrap> },
      { path: 'lookbook', element: <Wrap><LookbookPage /></Wrap> },
      { path: 'consultation', element: <Wrap><ConsultationPage /></Wrap> },
      { path: ':slug', element: <Wrap><DynamicPage /></Wrap> }, // Catch all for CMS pages
      { path: '*', element: <Wrap><NotFoundPage /></Wrap> },
    ]
  }
]);

import { useTheme } from './hooks/useCMS';

export function AppRouter() {
  useTheme(); // Apply global theme from CMS
  return <RouterProvider router={router} />;
}
