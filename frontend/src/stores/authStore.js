import { makeAutoObservable } from 'mobx';
import api from '../services/api';

class AuthStore {
  user = null;
  token = localStorage.getItem('token');
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    if (this.token) {
      this.getCurrentUser();
    }
  }

  *register(email, username, password) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = yield api.post('/auth/register', {
        email,
        username,
        password,
      });
      this.user = response.data;
      yield this.login(username, password);
    } catch (error) {
      this.setError(error);
    } finally {
      this.isLoading = false;
    }
  }

  *login(username, password) {
    this.isLoading = true;
    this.error = null;
  
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
  
      const response = yield api.post(
        '/auth/login',
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
  
      this.token = response.data.access_token;
      localStorage.setItem('token', this.token);
      yield this.getCurrentUser();
    } catch (error) {
      this.setError(error);
    } finally {
      this.isLoading = false;
    }
  }
  

  *getCurrentUser() {
    try {
      const response = yield api.get('/auth/me', {
        params: { token: this.token },
      });
      this.user = response.data;
    } catch (error) {
      this.logout();
    }
  }

  setError(error) {
    if (error.response?.data?.detail) {
      const detail = error.response.data.detail;
      if (Array.isArray(detail)) {
        this.error = detail[0]?.msg || 'Validation error';
      } else {
        this.error = detail;
      }
    } else if (error.message) {
      this.error = error.message;
    } else {
      this.error = 'Something went wrong';
    }
  }

  logout() {
    this.user = null;
    this.token = null;
    this.error = null;
    localStorage.removeItem('token');
  }

  get isAuthenticated() {
    return !!this.user;
  }
}

export default new AuthStore();