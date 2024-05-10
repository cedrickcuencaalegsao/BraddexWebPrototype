// AuthService.js
class AuthService {
    getToken() {
      return localStorage.getItem('token');
    }
  
    setToken(token) {
      localStorage.setItem('token', token);
    }
  
    removeToken() {
      localStorage.removeItem('token');
    }
  
    isAuthenticated() {
      return !!this.getToken();
    }
  }
  
  export default new AuthService();
  