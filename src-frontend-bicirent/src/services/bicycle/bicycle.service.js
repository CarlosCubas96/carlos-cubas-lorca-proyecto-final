import AxiosService from '../../common/axios-service';

const BicycleService = {
  getAllBicycles: (searchQuery, pageNumber, pageSize) => {
    const url = searchQuery
      ? `bicycles?searchTerm=${searchQuery}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      : `bicycles?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return AxiosService.get(url)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  getBicycleById: (id) => {
    return AxiosService.get(`bicycles/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  createBicycle: (bicycleData) => {
    return AxiosService.post('bicycles', bicycleData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  updateBicycle: (id, bicycleData) => {
    return AxiosService.put(`bicycles/${id}`, bicycleData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  deleteBicycle: (id) => {
    return AxiosService.delete(`bicycles/${id}`)
      .then(() => true)
      .catch(error => {
        throw error;
      });
  },

  searchBicycleByName: (searchQuery) => {
    return AxiosService.get(`bicycles/search?query=${searchQuery}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  getAllCategories: () => {
    return AxiosService.get('bicycles/categories')
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  getImageByName: (imageName) => {
    return AxiosService.get(`bicycles/images/${imageName}`, {
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  },

  uploadImage: (imageFile) => {


    return AxiosService.post('images/upload', imageFile, {
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }





};

export default BicycleService;
