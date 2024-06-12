import axios from "axios";

const API_URL = "http://ec2-54-234-29-153.compute-1.amazonaws.com:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch(error => {
        if (error.response && error.response.data) {
          throw error.response.data;

        } else {
          throw new Error("Error de conexión");
        }
      });
  }


  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, firstname, lastName, role) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      firstname,
      lastName,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

const authService = new AuthService();

export default authService;
