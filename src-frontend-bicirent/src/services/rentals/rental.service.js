import AxiosService from '../../common/axios-service';

const RentalService = {
  getAllRentals: (searchQuery, pageNumber, pageSize) => {
    const url = searchQuery ? `rentals?searchTerm=${searchQuery}&pageNumber=${pageNumber}&pageSize=${pageSize}` : `rentals?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return AxiosService.get(url)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  getRentalById: (id) => {
    return AxiosService.get(`rentals/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  createRental: (rentalData) => {
    return AxiosService.post('rentals', rentalData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  updateRental: (id, rentalData) => {
    return AxiosService.put(`rentals/${id}`, rentalData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  deleteRental: (id) => {
    return AxiosService.delete(`rentals/${id}`)
      .then(() => true)
      .catch(error => {
        throw error;
      });
  },

  searchRentalByName: (searchQuery) => {
    return AxiosService.get(`rentals/search?query=${searchQuery}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
};

export default RentalService;
