import AxiosService from '../../common/axios-service';

const UserService = {
  getAllUsers: (searchQuery, pageNumber, pageSize) => {
    const url = searchQuery ? `users?searchTerm=${searchQuery}&pageNumber=${pageNumber}&pageSize=${pageSize}` : `users?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return AxiosService.get(url)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  getUserById: (id) => {
    return AxiosService.get(`users/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  createUser: (userData) => {
    return AxiosService.post('users', userData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  updateUser: (id, userData) => {
    return AxiosService.put(`users/${id}`, userData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  deleteUser: (id) => {
    return AxiosService.delete(`users/${id}`)
      .then(() => true)
      .catch(error => {
        throw error;
      });
  },

  searchUserByName: (searchQuery) => {
    return AxiosService.get(`users/search?query=${searchQuery}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
};

export default UserService;
