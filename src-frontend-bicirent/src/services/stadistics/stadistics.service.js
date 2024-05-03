import AxiosService from '../../common/axios-service';

const StatisticsService = {
    getGeneralStats: () => {
        return AxiosService.get('/statistics/general-stats')
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    },


    getBicyclesByCategory: () => {
        return AxiosService.get('/statistics/bicycles-by-category')
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    },

    getRentalsOverTime: () => {
        return AxiosService.get('/statistics/rentals-over-last-month')
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
};

export default StatisticsService;
