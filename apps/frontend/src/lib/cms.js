import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const cms = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPageBySlug = async (slug) => {
  const isPreview = new URLSearchParams(window.location.search).has('preview');
  const endpoint = `/pages/slug/${slug}${isPreview ? '?preview=1' : ''}`;
  const response = await cms.get(endpoint);
  return response.data.data;
};

export const getThemeSettings = async () => {
  const response = await cms.get('/theme');
  return response.data.data;
};

export const getProducts = async (params = {}) => {
  const response = await cms.get('/products', { params });
  return response.data;
};

export const getCategories = async () => {
  const response = await cms.get('/categories');
  return response.data.data;
};
