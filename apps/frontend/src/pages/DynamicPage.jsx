import React from 'react';
import { useParams } from 'react-router-dom';
import { usePage } from '../hooks/useCMS';
import { SectionRenderer } from '../components/SectionRenderer';
import NotFoundPage from './NotFoundPage';

export default function DynamicPage() {
  const { slug } = useParams();
  // If no slug is present, assume we are on the home page
  const pageSlug = slug || 'home';
  
  const { data: page, loading, error } = usePage(pageSlug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !page) {
    return <NotFoundPage />;
  }

  return (
    <div className="cms-page-wrapper">
      <SectionRenderer sections={page.sections} />
    </div>
  );
}
