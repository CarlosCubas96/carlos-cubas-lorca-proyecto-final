import axios from 'axios';
import authHeader from '../services/auth/auth.header';

const BASE_URL = 'http://localhost:8081/api';

class AxiosService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.setInterceptors();
  }

  setInterceptors() {
    this.axiosInstance.interceptors.request.use(
      config => {
        const headers = authHeader();
        config.headers = {
          ...config.headers,
          ...headers
        };
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  // Métodos para realizar las solicitudes HTTP

  get(url, params) {
    return this.axiosInstance.get(url, { params });
  }

  post(url, data) {
    return this.axiosInstance.post(url, data);
  }

  put(url, data) {
    return this.axiosInstance.put(url, data);
  }

  delete(url) {
    return this.axiosInstance.delete(url);
  }
}

const axiosServiceInstance = new AxiosService();

export default axiosServiceInstance;
