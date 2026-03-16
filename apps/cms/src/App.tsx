import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { queryClient } from './lib/queryClient'
import { useAuthStore } from './store/authStore'
import { AppLayout } from './components/layout/AppLayout'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pages from './pages/Pages'
import PageEditor from './pages/PageEditor'
import Theme from './pages/Theme'
import Media from './pages/Media'
import Inquiries from './pages/Inquiries'
import ProductForm from './pages/ProductForm'

// Lazy stubs for remaining pages (implement in next phase if needed)
import { lazy, Suspense } from 'react'

const Products = lazy(() => import('./pages/Products'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Team = lazy(() => import('./pages/Team'))
const Newsletter = lazy(() => import('./pages/Newsletter'))
const Settings = lazy(() => import('./pages/Settings'))
const Categories = lazy(() => import('./pages/Categories'))
const Collections = lazy(() => import('./pages/Collections'))

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function LoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="pages" element={<Pages />} />
            <Route path="pages/:pageId/edit" element={<PageEditor />} />
            <Route path="theme" element={<Theme />} />
            <Route path="media" element={<Media />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="products" element={<Suspense fallback={<LoadingFallback />}><Products /></Suspense>} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="testimonials" element={<Suspense fallback={<LoadingFallback />}><Testimonials /></Suspense>} />
            <Route path="team" element={<Suspense fallback={<LoadingFallback />}><Team /></Suspense>} />
            <Route path="newsletter" element={<Suspense fallback={<LoadingFallback />}><Newsletter /></Suspense>} />
            <Route path="settings" element={<Suspense fallback={<LoadingFallback />}><Settings /></Suspense>} />
            <Route path="categories" element={<Suspense fallback={<LoadingFallback />}><Categories /></Suspense>} />
            <Route path="collections" element={<Suspense fallback={<LoadingFallback />}><Collections /></Suspense>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors closeButton />
    </QueryClientProvider>
  )
}
