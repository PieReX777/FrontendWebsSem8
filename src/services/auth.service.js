import axios from 'axios';

// Configuración de la URL base según el entorno
const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL || 'https://serviciowebbackend.onrender.com/api'
  : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 10 segundos máximo de espera
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para añadir el token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores globales
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('No autorizado - redirigir a login');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error('Error en la petición:', error.message);
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.message);
    } else {
      console.error('Error al configurar la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

const AuthService = {
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Opcional: hacer una llamada al backend para invalidar el token
    return Promise.resolve();
  }
};

export { AuthService };

export default api;