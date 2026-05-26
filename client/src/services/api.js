import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // Prevent infinite loading if backend is down
});

// Attach JWT token for admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Public API
export const getAbout = () => api.get('/about');
export const getSocialLinks = () => api.get('/social');
export const getProjects = () => api.get('/projects');
export const getSkills = () => api.get('/skills');
export const getCertifications = () => api.get('/certifications');
export const getAchievements = () => api.get('/achievements');
export const submitContact = (data) => api.post('/contact', data);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');

// Admin CRUD
export const getDashboardStats = () => api.get('/dashboard/stats');
export const updateAbout = (data) => api.put('/about', data);
export const updateSocialLinks = (data) => api.put('/social', data);

export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

export const createCertification = (data) => api.post('/certifications', data);
export const updateCertification = (id, data) => api.put(`/certifications/${id}`, data);
export const deleteCertification = (id) => api.delete(`/certifications/${id}`);

export const createAchievement = (data) => api.post('/achievements', data);
export const updateAchievement = (id, data) => api.put(`/achievements/${id}`, data);
export const deleteAchievement = (id) => api.delete(`/achievements/${id}`);

export const getContactMessages = () => api.get('/contact');
export const markMessageRead = (id) => api.patch(`/contact/${id}/read`);
export const deleteMessage = (id) => api.delete(`/contact/${id}`);

// Chatbot
export const getChatbotData = () => api.get('/chatbot/data');
