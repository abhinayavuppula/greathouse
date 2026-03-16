import { useState, useEffect } from 'react';
import { getPageBySlug, getThemeSettings } from '../lib/cms';

export const usePage = (slug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getPageBySlug(slug)
      .then((page) => {
        setData(page);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [slug]);

  return { data, loading, error };
};

export const useTheme = () => {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getThemeSettings()
      .then((t) => {
        setTheme(t);
        setLoading(false);
        applyThemeVariables(t);
      })
      .catch(() => setLoading(false));
  }, []);

  return { theme, loading };
};

const applyThemeVariables = (theme) => {
  if (!theme) return;
  const root = document.documentElement;
  
  // Mapping theme settings to CSS variables used in tailwind.config.js
  const mappings = {
    colorPrimary: '--color-primary',
    colorSecondary: '--color-secondary',
    colorAccent: '--color-accent',
    colorBackground: '--color-background',
    colorText: '--color-text',
    colorMuted: '--color-muted',
    colorBorder: '--color-border',
    fontHeading: '--font-heading',
    fontBody: '--font-body',
    borderRadius: '--radius-base',
  };

  Object.entries(mappings).forEach(([themeKey, cssVar]) => {
    if (theme[themeKey]) {
      root.style.setProperty(cssVar, theme[themeKey]);
    }
  });

  // Handle custom CSS
  if (theme.customCSS) {
    let styleTag = document.getElementById('cms-custom-css');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'cms-custom-css';
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = theme.customCSS;
  }
};
