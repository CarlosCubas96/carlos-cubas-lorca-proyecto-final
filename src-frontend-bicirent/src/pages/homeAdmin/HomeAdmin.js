import React, { Component } from "react";
import Header from "../../components/common/layout/header/header"

import "./homeAdmin.css"


import authService from "../../services/auth/auth.service";
import SidebarsectionAdmin from "../../components/admin/aside/sidebarsectionAdmin";


export default class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    render() {
        const { currentUser } = this.state;

        return (

            <>
                {/*  */}

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
                                            <div className="admin-dashboard-main-containerfeaturepercent">
                                                <span className="admin-dashboard-main-text24">
                                                    <span>+4%</span>
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
                                            <div className="admin-dashboard-main-containerfeaturepercent1">
                                                <span className="admin-dashboard-main-text30">
                                                    <span>+4%</span>
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
                                                        <span>Enero 1, 2024 - Enero 31, 2024</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="admin-dashboard-main-containercontentmain1">
                                                <div className="admin-dashboard-main-containercontentmainchar">
                                                    <div className="admin-dashboard-main-containercharmain">
                                                        <img
                                                            src="https://play.teleporthq.io/static/svg/default-img.svg"
                                                            alt="containerchar1184"
                                                            className="admin-dashboard-main-containerchar"
                                                        />
                                                    </div>
                                                    <div className="admin-dashboard-main-containerchartext">
                                                        <div className="admin-dashboard-main-containerchartext1">
                                                            <span className="admin-dashboard-main-text60">
                                                                <span>Jan 1</span>
                                                            </span>
                                                        </div>
                                                        <div className="admin-dashboard-main-containerchartext2">
                                                            <span className="admin-dashboard-main-text62">
                                                                <span>Jan 7</span>
                                                            </span>
                                                        </div>
                                                        <div className="admin-dashboard-main-containerchartext3">
                                                            <span className="admin-dashboard-main-text64">
                                                                <span>Jan 14</span>
                                                            </span>
                                                        </div>
                                                        <div className="admin-dashboard-main-containerchartext4">
                                                            <span className="admin-dashboard-main-text66">
                                                                <span>Jan 21</span>
                                                            </span>
                                                        </div>
                                                        <div className="admin-dashboard-main-containerchartext5">
                                                            <span className="admin-dashboard-main-text68">
                                                                <span>Jan 28</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
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
