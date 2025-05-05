import api from './api';

// Cambiamos de export default a named export
export const AuthService = {
  login: async (username, password) => {
    return api.post('/auth/signin', { username, password });
  },
  register: async (username, email, password, roles) => {
    return api.post('/auth/signup', { username, email, password, roles });
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};

