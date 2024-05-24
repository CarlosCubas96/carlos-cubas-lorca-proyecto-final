import React, { Component } from "react";
import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';

import authService from "../../../services/auth/auth.service";
import StatisticsService from "../../../services/stadistics/stadistics.service";
import Header from "../../../components/common/layout/header/header";
import SidebarsectionAdmin from "../../../components/admin/aside/sidebarsectionAdmin";
import RentalLineChart from "../../../components/UI/charts/RentalLineChart";
import './dashBoardMainAdmin.css';
import Utils from "../../../common/utils";

export default class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            rentalData: undefined,
            generalStats: undefined,
            totalBicycles: 0,
            bicyclesByCategory: undefined,
            error: null

        };
    }

    async componentDidMount() {
        const user = authService.getCurrentUser();
        if (user) {
            this.setState({ currentUser: user });
        }

        this.loadRentalData();

        try {
            await this.loadGeneralStats(); // Esperar a que los stats generales sean cargados
            await this.loadBicyclesByCategory(); // Solo se llama después de que loadGeneralStats ha completado
        } catch (error) {
            console.error("Error loading data: ", error);
        }
    }



    loadRentalData = () => {
        StatisticsService.getRentalsOverTime()
            .then(data => {
                this.setState({ rentalData: data, error: null });
            })
            .catch(error => {
                this.setState({ error: error.toString(), rentalData: undefined });
                console.error("Error fetching data: ", error);
            });
    };

    loadGeneralStats = async () => {
        try {
            const data = await StatisticsService.getGeneralStats();
            const filteredStats = {
                'Bicicletas Alquiladas': data['Bicicletas Alquiladas'],
                'Total de Alquileres': data['Total de Alquileres'],
                'Alquileres Completados': data['Alquileres Completados'],
                'Usuarios Totales': data['Total de Usuarios'],
                'totalBicycles': data['totalBicycles']
            };
            this.setState({ generalStats: filteredStats });
        } catch (error) {
            this.setState({ error: error.toString() });
            console.log("Error fetching data: ", error);
        }
    };

    loadBicyclesByCategory = async () => {
        try {
            const data = await StatisticsService.getBicyclesByCategory();
            this.setState({ bicyclesByCategory: data });
        } catch (error) {
            this.setState({ error: error.toString() });
            console.error("Error fetching bicycles by category: ", error);
        }
    };






    render() {
        const { currentUser, rentalData, error, bicyclesByCategory, generalStats } = this.state;

        let contentHeaderDate = "Cargando datos de alquileres...";

        if (rentalData && Object.keys(rentalData).length > 0) {
            const dates = Object.keys(rentalData).sort();
            const firstDate = dates[0];
            const lastDate = dates[dates.length - 1];
            const formattedFirstDate = format(parseISO(firstDate), 'MMMM d, yyyy', { locale: es });
            const formattedLastDate = format(parseISO(lastDate), 'MMMM d, yyyy', { locale: es });
            contentHeaderDate = `${Utils.capitalize(formattedFirstDate)} - ${Utils.capitalize(formattedLastDate)}`;
        }


        return (

            <>


                <div className="admin-dashboard-main-container">
                    <div className="admin-dashboard-main-dash-board-main-admin">


                        <Header currentUser={currentUser} />

                        <div className="admin-dashboard-main-containerdashboardadmin">
                            <div className="admin-dashboard-main-containerdashboardsections">

                                <SidebarsectionAdmin />

                                <div className="admin-dashboard-main-containermainsection">
                                    <div className="admin-dashboard-main-containermainsectiontitle">
                                        <div className="admin-dashboard-main-containersectiontitle">
                                            <span className="admin-dashboard-main-text18">
                                                <span>Panel de Adminitrador</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="admin-dashboard-main-containermainsectionfeaturelist">

                                        {generalStats && Object.entries(generalStats).slice(0, 4).map(([label, value]) => (
                                            <div key={label} className="admin-dashboard-main-containerfeaturelist">
                                                <div className="admin-dashboard-main-containerfeaturetitle">
                                                    <span className="admin-dashboard-main-text20">
                                                        <span>{label} </span>
                                                    </span>
                                                </div>
                                                <div className="admin-dashboard-main-containerfeaturetext">
                                                    <span className="admin-dashboard-main-text22">
                                                        <span>{value}</span>
                                                    </span>
                                                </div>

                                            </div>
                                        ))}




                                    </div>
                                    <div className="admin-dashboard-main-containermainsectioncontent">

                                        <div className="admin-dashboard-main-containersectioncontent2">
                                            <div className="admin-dashboard-main-containercontentheader">
                                                <span className="admin-dashboard-main-text44">
                                                    <span>Categorías</span>
                                                </span>
                                            </div>
                                            <div className="admin-dashboard-main-containercontentmain">
                                                <div className="admin-dashboard-main-containercategoriessidebar">
                                                    {bicyclesByCategory && Object.entries(bicyclesByCategory).map(([categoryName, percentage]) => (
                                                        <div key={categoryName} className="admin-dashboard-main-containernav-progress-category">
                                                            <div className="admin-dashboard-main-containercategoriessidebartext">
                                                                <span className="admin-dashboard-main-text46">
                                                                    <span>{Utils.capitalize(categoryName)}</span>
                                                                </span>
                                                            </div>
                                                            <div className="progress admin-dashboard-main-containernav-progress">
                                                                <div className="progress-bar admin-dashboard-main-nav-progress" style={{ width: `${percentage}%` }} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="admin-dashboard-main-containersectioncontent1">
                                            <div className="admin-dashboard-main-containercontentheader1">
                                                <div className="admin-dashboard-main-containercontentheadertitle">
                                                    <span className="admin-dashboard-main-text56">
                                                        <span>Últimos 30 días</span>
                                                    </span>
                                                </div>
                                                <div className="admin-dashboard-main-containercontentheaderdate">
                                                    <span className="admin-dashboard-main-text58">
                                                        {contentHeaderDate}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="admin-dashboard-main-containercontentmain1">

                                                {error && <p>Error al cargar los datos de la gráfica</p>}
                                                {rentalData ? <RentalLineChart rentalData={rentalData} /> : <p>{contentHeaderDate}</p>}

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

