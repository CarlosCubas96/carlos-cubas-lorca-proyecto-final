import React, { Component } from "react";
import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';

import authService from "../../services/auth/auth.service";
import StatisticsService from "../../services/stadistics/stadistics.service";
import Header from "../../components/common/layout/header/header";
import SidebarsectionAdmin from "../../components/admin/aside/sidebarsectionAdmin";
import RentalLineChart from "../../components/UI/charts/RentalLineChart";
import './homeAdmin.css';

export default class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            rentalData: undefined,
            generalStats: undefined,
            bicyclesByCategory: undefined,
            error: null

        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user) {
            this.setState({ currentUser: user });
        }
        this.loadRentalData();
        this.loadGeneralStats();
        this.loadBicyclesByCategory();
    }

    loadRentalData = () => {
        StatisticsService.getRentalsOverTime()
            .then(data => {
                this.setState({ rentalData: data, error: null });
                console.log("Rental Data:", data);
            })
            .catch(error => {
                this.setState({ error: error.toString(), rentalData: undefined });
                console.error("Error fetching data: ", error);
            });
    };

    loadGeneralStats = () => {
        StatisticsService.getGeneralStats()
            .then(data => {
                this.setState({ generalStats: data });
                console.log("GeneralStats: ", data);
            })
            .catch(error => {
                this.setState({ error: error.toString() });
                console.log("Error fetching data: ", error);
            });
    };

    loadBicyclesByCategory = () => {
        StatisticsService.getBicyclesByCategory()
            .then(data => {
                this.setState({ bicyclesByCategory: data });
                console.log("BicyclesByCategory: ", data);
            })
            .catch(error => {
                this.setState({ error: error.toString() });
                console.log("Error fetching data: ", error);
            });
    };




    render() {
        const { currentUser, rentalData, error } = this.state;

        let contentHeaderDate = "Cargando datos de alquileres..."; // Mensaje predeterminado

        if (rentalData && Object.keys(rentalData).length > 0) {
            const dates = Object.keys(rentalData).sort();
            const firstDate = dates[0];
            const lastDate = dates[dates.length - 1];
            const formattedFirstDate = format(parseISO(firstDate), 'MMMM d, yyyy', { locale: es });
            const formattedLastDate = format(parseISO(lastDate), 'MMMM d, yyyy', { locale: es });
            contentHeaderDate = `${formattedFirstDate} - ${formattedLastDate}`;
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
                                        <div className="admin-dashboard-main-containerfeaturelist">
                                            <div className="admin-dashboard-main-containerfeaturetitle">
                                                <span className="admin-dashboard-main-text20">
                                                    <span>Total de Alquileres</span>
                                                </span>
                                            </div>
                                            <div className="admin-dashboard-main-containerfeaturetext">
                                                <span className="admin-dashboard-main-text22">
                                                    <span>12</span>
                                                </span>
                                            </div>

                                        </div>
                                        <div className="admin-dashboard-main-containerfeaturelist1">
                                            <div className="admin-dashboard-main-containerfeaturetitle1">
                                                <span className="admin-dashboard-main-text26">
                                                    <span>Alquileres completados</span>
                                                </span>
                                            </div>
                                            <div className="admin-dashboard-main-containerfeaturetext1">
                                                <span className="admin-dashboard-main-text28">
                                                    <span>10</span>
                                                </span>
                                            </div>

                                        </div>
                                        <div className="admin-dashboard-main-containerfeaturelist2">
                                            <div className="admin-dashboard-main-containerfeaturetitle2">
                                                <span className="admin-dashboard-main-text32">
                                                    <span>Usuarios Totales</span>
                                                </span>
                                            </div>
                                            <div className="admin-dashboard-main-containerfeaturetext2">
                                                <span className="admin-dashboard-main-text34">
                                                    <span>2</span>
                                                </span>
                                            </div>
                                            <div className="admin-dashboard-main-containerfeaturepercent2">
                                                <span className="admin-dashboard-main-text36">
                                                    <span>+4%</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="admin-dashboard-main-containerfeaturelist3">
                                            <div className="admin-dashboard-main-containerfeaturetitle3">
                                                <span className="admin-dashboard-main-text38">
                                                    <span>Bicicletas Alquiladas</span>
                                                </span>
                                            </div>
                                            <div className="admin-dashboard-main-containerfeaturetext3">
                                                <span className="admin-dashboard-main-text40">
                                                    <span>4</span>
                                                </span>
                                            </div>
                                            <div className="admin-dashboard-main-containerfeaturepercent3">
                                                <span className="admin-dashboard-main-text42">
                                                    <span>+4%</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admin-dashboard-main-containermainsectioncontent">
                                        <div className="admin-dashboard-main-containersectioncontent2">
                                            <div className="admin-dashboard-main-containercontentheader">
                                                <span className="admin-dashboard-main-text44">
                                                    <span>Categorías</span>
                                                </span>
                                            </div>
                                            <div className="admin-dashboard-main-containercontentmain">
                                                <div className="admin-dashboard-main-containercontentmaincategories">
                                                    <div className="admin-dashboard-main-containercategoriessidebar">
                                                        <div className="admin-dashboard-main-containercategoriessidebartext">
                                                            <span className="admin-dashboard-main-text46">
                                                                <span>Montaña</span>
                                                            </span>
                                                        </div>
                                                        <div className="admin-dashboard-main-containercategoriessidebartext1">
                                                            <span className="admin-dashboard-main-text48">
                                                                <span>Paseo</span>
                                                            </span>
                                                        </div>
                                                        <div className="admin-dashboard-main-containercategoriessidebartext2">
                                                            <span className="admin-dashboard-main-text50">
                                                                <span>Trabajo</span>
                                                            </span>
                                                        </div>
                                                        <div className="admin-dashboard-main-containercategoriessidebartext3">
                                                            <span className="admin-dashboard-main-text52">
                                                                <span>Viajes</span>
                                                            </span>
                                                        </div>
                                                        <div className="admin-dashboard-main-containercategoriessidebartext4">
                                                            <span className="admin-dashboard-main-text54">
                                                                <span>Reparto</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="admin-dashboard-main-containercategoriesnav-progress">
                                                        <div className="admin-dashboard-main-containernav-progress">
                                                            <div className="admin-dashboard-main-nav-progress"></div>
                                                        </div>
                                                        <div className="admin-dashboard-main-containernav-progress1">
                                                            <div className="admin-dashboard-main-nav-progress1"></div>
                                                        </div>
                                                        <div className="admin-dashboard-main-containernav-progress2">
                                                            <div className="admin-dashboard-main-nav-progress2"></div>
                                                        </div>
                                                        <div className="admin-dashboard-main-containernav-progress3">
                                                            <div className="admin-dashboard-main-nav-progress3"></div>
                                                        </div>
                                                        <div className="admin-dashboard-main-containernav-progress4">
                                                            <div className="admin-dashboard-main-nav-progress4"></div>
                                                        </div>
                                                    </div>
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

                                                {error && <p>Error al cargar los datos de la gráfica: {error}</p>}
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
