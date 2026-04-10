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
import IdeaLibraryPage from './pages/IdeaLibraryPage';
import DesignInspirationsPage from './pages/DesignInspirationsPage';
import BeforeAfterPage from './pages/BeforeAfterPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import DesignTrendsPage from './pages/DesignTrendsPage';
import TrendReportPage from './pages/TrendReportPage';
import LookbookPage from './pages/LookbookPage';
import IdeaDetailPage from './pages/IdeaDetailPage';
import InspirationDetailPage from './pages/InspirationDetailPage';
import StoryDetailPage from './pages/StoryDetailPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import FAQPage from './pages/FAQPage';
import WishlistPage from './pages/WishlistPage';
import SearchPage from './pages/SearchPage';
import ConsultationPage from './pages/ConsultationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';

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
      { index: true, element: <Wrap><HomePage /></Wrap> },
      { path: 'idea-library', element: <Wrap><IdeaLibraryPage /></Wrap> },
      { path: 'idea-library/:slug', element: <Wrap><IdeaDetailPage /></Wrap> },
      { path: 'design-inspirations', element: <Wrap><DesignInspirationsPage /></Wrap> },
      { path: 'design-inspirations/:slug', element: <Wrap><InspirationDetailPage /></Wrap> },
      { path: 'before-after', element: <Wrap><BeforeAfterPage /></Wrap> },
      { path: 'before-after/:slug', element: <Wrap><StoryDetailPage /></Wrap> },
      { path: 'case-studies', element: <Wrap><CaseStudiesPage /></Wrap> },
      { path: 'case-studies/:slug', element: <Wrap><CaseStudyDetailPage /></Wrap> },
      { path: 'design-trends', element: <Wrap><DesignTrendsPage /></Wrap> },
      { path: 'design-trends/:slug', element: <Wrap><TrendReportPage /></Wrap> },
      { path: 'lookbook', element: <Wrap><LookbookPage /></Wrap> },
      { path: 'shop', element: <Wrap><ShopAllPage /></Wrap> },
      { path: 'shop/:category', element: <Wrap><CategoryPage /></Wrap> },
      { path: 'product/:slug', element: <Wrap><ProductDetailPage /></Wrap> },
      { path: 'about', element: <Wrap><AboutPage /></Wrap> },
      { path: 'our-story', element: <Wrap><OurStoryPage /></Wrap> },
      { path: 'contact', element: <Wrap><ContactPage /></Wrap> },
      { path: 'faq', element: <Wrap><FAQPage /></Wrap> },
      { path: 'wishlist', element: <Wrap><WishlistPage /></Wrap> },
      { path: 'search', element: <Wrap><SearchPage /></Wrap> },
      { path: 'consultation', element: <Wrap><ConsultationPage /></Wrap> },
      { path: 'login', element: <Wrap><LoginPage /></Wrap> },
      { path: 'register', element: <Wrap><RegisterPage /></Wrap> },
      { path: 'profile', element: <Wrap><UserProfilePage /></Wrap> },
      { path: '*', element: <Wrap><NotFoundPage /></Wrap> },
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
