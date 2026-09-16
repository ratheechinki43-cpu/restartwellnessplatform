// Dynamic Backend API Base URL configuration for Vite
// Reads VITE_API_URL from environment variable (e.g. Render backend URL in production)
// Defaults to http://localhost:8000 for local development

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  STORIES: `${API_BASE_URL}/api/stories`,
};
