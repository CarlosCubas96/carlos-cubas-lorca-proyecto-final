import React, { Component } from "react";

import './dashBoardBicyclesAdmin.css';
import Header from "../../../components/common/layout/header/header";
import SidebarsectionAdmin from "../../../components/admin/aside/sidebarsectionAdmin";
import Icon from "../../../components/UI/icon/icon";
import FormButtom from "../../../components/UI/Button/FormButton/formButton";
import ModalDelete from "../../../components/UI/Modal/modalDelete";
import authService from "../../../services/auth/auth.service";
import BicycleService from "../../../services/bicycle/bicycle.service";
import Utils from "../../../common/utils";


export default class DashBoardBicyclesAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            bicycles: [],
            searchQuery: '',
            currentPage: 0,
            totalPages: 0,
            showDeleteModal: false,
            bicycleToDeleteId: null,
        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_ADMIN')) {
            this.setState({
                currentUser: user,
            });
        }
        this.retrieveBicycles();
    }

    onChangeSearchQuery(e) {
        const searchQuery = e.target.value;
        this.setState({
            searchQuery: searchQuery,
            currentPage: 0
        }, () => {
            this.retrieveBicycles();
        });
    }

    handlePageChange(pageNumber) {
        this.setState({
            currentPage: pageNumber
        }, () => {
            this.retrieveBicycles();
        });
    }

    retrieveBicycles() {
        const { searchQuery, currentPage } = this.state;
        const pageSize = 6;
        BicycleService.getAllBicycles(searchQuery, currentPage, pageSize)
            .then(data => {
                this.setState({
                    bicycles: data.content,
                    totalPages: data.totalPages
                });
            })
            .catch(error => {
                console.error('Error fetching rentals:', error);
            });
    }

    handleDeleteBicycle(id) {
        this.setState({
            showDeleteModal: true,
            bicycleToDeleteId: id
        });
    }

    confirmDeleteBicycle() {
        const { bicycleToDeleteId } = this.state;
        BicycleService.deleteBicycle(bicycleToDeleteId)
            .then(() => {
                this.setState(prevState => ({
                    bicycles: prevState.bicycles.filter(bicycle => bicycle.id !== bicycleToDeleteId),
                    showDeleteModal: false,
                    bicycleToDeleteId: null
                }), () => {

                    this.retrieveBicycles();
                });
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }


    render() {
        const { currentUser, bicycles, searchQuery, currentPage, totalPages, showDeleteModal } = this.state;

        return (
            <>
                <div className="admin-dashboard-main-container">
                    <div className="admin-dashboard-main-dash-board-main-admin">
                        <Header currentUser={currentUser} />
                        <div className="admin-dashboard-main-containerdashboardadmin">
                            <div className="admin-dashboard-main-containerdashboardsections">
                                <SidebarsectionAdmin />
                                <div className="admin-dashboard-main-containermainsection">
                                    <div className="admin-dashboard-rentals-containermainsectiontitle">
                                        <div className="admin-dashboard-rentals-containersectiontitle">
                                            <span className="admin-dashboard-rentals-text">
                                                <span>Gestión de Bicicletas</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="admin-dashboard-rentals-containermainsectionsearch-box">
                                        <div className="admin-dashboard-rentals-containersectionsearch-box">

                                            <Icon name="Lupa" color="#637887" />
                                            <input
                                                type="text"
                                                placeholder="Buscar alquileres por usuario o modelo de bicicleta"
                                                className="admin-dashboard-rentals-sectioninputsearch-box"
                                                value={searchQuery}
                                                onChange={(e) => this.onChangeSearchQuery(e)}
                                            />
                                        </div>
                                    </div>
                                    <table className="admin-dashboard-rentals-containermainsectiontable">
                                        <thead className="admin-dashboard-rentals-containersectionheadertable">
                                            <tr className="admin-dashboard-rentals-sectionsheadertable">
                                                {/* Encabezado de la tabla */}
                                                <th className="admin-dashboard-rentals-sectionheadertable1">
                                                    <div className="admin-dashboard-rentals-textheadertable1">
                                                        <span className="admin-dashboard-rentals-text02">
                                                            <div>Usuario</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-rentals-sectionheadertable2">
                                                    <div className="admin-dashboard-rentals-textheadertable2">
                                                        <span className="admin-dashboard-rentals-text04">
                                                            <div>Inquilino</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-rentals-sectionheadertable3">
                                                    <div className="admin-dashboard-rentals-textheadertable3">
                                                        <span className="admin-dashboard-rentals-text06">
                                                            <div>Modelo</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-rentals-sectionheadertable5">
                                                    <div className="admin-dashboard-rentals-textheadertable5">
                                                        <span className="admin-dashboard-rentals-text10">
                                                            <div>Precio</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-rentals-sectionheadertable4">
                                                    <div className="admin-dashboard-rentals-textheadertable4">
                                                        <span className="admin-dashboard-rentals-text08">
                                                            <div>Categoria</div>
                                                        </span>
                                                    </div>
                                                </th>

                                                <th className="admin-dashboard-rentals-sectionheadertable6">
                                                    <div className="admin-dashboard-rentals-textheadertable6">
                                                        <span className="admin-dashboard-rentals-text12">
                                                            <div>Acciones</div>
                                                        </span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="admin-dashboard-rentals-containersectionmaintable">
                                            {/* Cuerpo de la tabla */}

                                            {Array.isArray(bicycles) && bicycles.map(bicycle => (
                                                <tr key={bicycle.id} className="admin-dashboard-rentals-sectiontabletr">
                                                    <td className="admin-dashboard-rentals-sectiontabletd">
                                                        <div className="admin-dashboard-rentals-td">
                                                            <span className="admin-dashboard-rentals-text14">
                                                                <span>{bicycle.landlordUsername}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-rentals-sectiontabletd1">
                                                        <div className="admin-dashboard-rentals-td1">
                                                            <span className="admin-dashboard-rentals-text16">
                                                                <span>{bicycle.tenantUsername}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-rentals-sectiontabletd2">
                                                        <div className="admin-dashboard-rentals-td2">
                                                            <span className="admin-dashboard-rentals-text18">
                                                                <span>{bicycle.bicycleBrandModel}</span>
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="admin-dashboard-rentals-sectiontabletd4">
                                                        <div className="admin-dashboard-rentals-td4">
                                                            <span className="admin-dashboard-rentals-text22">
                                                                <span>{bicycle.cost + " €/Hora"}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-rentals-sectiontabletd3">
                                                        <div className="admin-dashboard-rentals-td3">
                                                            <span className="admin-dashboard-rentals-text20">
                                                                <span>{Utils.capitalize(bicycle.category)}</span>
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="admin-dashboard-rentals-sectiontabletd5">
                                                        <FormButtom to={`/admin/bicicletas/edit/${bicycle.id}`}>Editar</FormButtom>
                                                    </td>
                                                    <td className="admin-dashboard-rentals-sectiontabletd6">
                                                        <FormButtom onClick={() => this.handleDeleteBicycle(bicycle.id)}>Eliminar</FormButtom>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                        <tfoot className="admin-dashboard-rentals-containersectionmainpagination">
                                            <tr>
                                                <td className="admin-dashboard-rentals-containerpageiconleft">
                                                    {currentPage >= 1 && (
                                                        <button className="admin-dashboard-rentals-containericonleft" onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                                                            <Icon name="Arrow1" size='26px' />
                                                        </button>
                                                    )}
                                                </td>
                                                {Array.from(Array(totalPages).keys()).slice(currentPage, currentPage + 4).map(pageNumber => (
                                                    <td key={pageNumber} className={`admin-dashboard-rentals-containerpagenum1 ${pageNumber === currentPage ? 'active-page' : ''}`}>
                                                        <span className={'admin-dashboard-rentals-text2'}>{pageNumber + 1}</span>
                                                    </td>
                                                ))}
                                                <td className="admin-dashboard-rentals-containerpageiconright">
                                                    {currentPage < totalPages - 1 && (
                                                        <button className="admin-dashboard-rentals-containericonleft" onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                                                            <Icon name="Arrow2" size='26px' />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <ModalDelete
                                        show={showDeleteModal}
                                        onHide={() => this.setState({ showDeleteModal: false })}
                                        onConfirm={this.confirmDeleteBicycle}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
