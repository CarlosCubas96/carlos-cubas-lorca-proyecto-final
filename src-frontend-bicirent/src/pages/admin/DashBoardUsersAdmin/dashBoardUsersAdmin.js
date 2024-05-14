import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import './dashBoardUsersAdmin.css';
import Header from "../../../components/common/layout/header/header";
import SidebarsectionAdmin from "../../../components/admin/aside/sidebarsectionAdmin";
import Icon from "../../../components/UI/icon/icon";
import FormButtom from "../../../components/UI/Button/FormButton/formButton";
import UserService from "../../../services/user/user.service";
import authService from "../../../services/auth/auth.service";

export default class DashBoardUsersAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            users: [],
            searchQuery: '',
            currentPage: 0,
            totalPages: 0,
            showDeleteModal: false,
            userToDeleteId: null,
        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_ADMIN')) {
            this.setState({
                currentUser: user,
            });
        }
        this.retrieveUsers();
    }

    onChangeSearchQuery(e) {
        const searchQuery = e.target.value;
        this.setState({
            searchQuery: searchQuery,
            currentPage: 0
        }, () => {
            this.retrieveUsers();
        });
    }

    handlePageChange(pageNumber) {
        this.setState({
            currentPage: pageNumber
        }, () => {
            this.retrieveUsers();
        });
    }

    retrieveUsers() {
        const { searchQuery, currentPage } = this.state;
        const pageSize = 6;
        UserService.getAllUsers(searchQuery, currentPage, pageSize)
            .then(data => {
                this.setState({
                    users: data.content,
                    totalPages: data.totalPages
                });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    handleDeleteUser(id) {
        // Mostrar el modal antes de eliminar el usuario
        this.setState({
            showDeleteModal: true,
            userToDeleteId: id
        });
    }

    confirmDeleteUser() {
        const { userToDeleteId } = this.state;
        UserService.deleteUser(userToDeleteId)
            .then(() => {
                this.setState(prevState => ({
                    users: prevState.users.filter(user => user.id !== userToDeleteId),
                    showDeleteModal: false,
                    userToDeleteId: null
                }), () => {

                    this.retrieveUsers();
                });
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }


    render() {
        const { currentUser, users, searchQuery, currentPage, totalPages, showDeleteModal } = this.state;

        return (
            <>
                <div className="admin-dashboard-main-container">
                    <div className="admin-dashboard-main-dash-board-main-admin">
                        <Header currentUser={currentUser} />
                        <div className="admin-dashboard-main-containerdashboardadmin">
                            <div className="admin-dashboard-main-containerdashboardsections">
                                <SidebarsectionAdmin />
                                <div className="admin-dashboard-main-containermainsection">
                                    <div className="admin-dashboard-users-containermainsectiontitle">
                                        <div className="admin-dashboard-users-containersectiontitle">
                                            <span className="admin-dashboard-users-text">
                                                <span>Gestión de Usuarios</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="admin-dashboard-users-containermainsectionsearch-box">
                                        <div className="admin-dashboard-users-containersectionsearch-box">

                                            <Icon name="Lupa" color="#637887" />
                                            <input
                                                type="text"
                                                placeholder="Buscar usuarios por usuario, nombre o correo electrónico"
                                                className="admin-dashboard-users-sectioninputsearch-box"
                                                value={searchQuery}
                                                onChange={(e) => this.onChangeSearchQuery(e)}
                                            />
                                        </div>
                                    </div>
                                    <table className="admin-dashboard-users-containermainsectiontable">
                                        <thead className="admin-dashboard-users-containersectionheadertable">
                                            <tr className="admin-dashboard-users-sectionsheadertable">
                                                {/* Encabezado de la tabla */}
                                                <th className="admin-dashboard-users-sectionheadertable1">
                                                    <div className="admin-dashboard-users-textheadertable1">
                                                        <span className="admin-dashboard-users-text02">
                                                            <div>Nombre</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-users-sectionheadertable2">
                                                    <div className="admin-dashboard-users-textheadertable2">
                                                        <span className="admin-dashboard-users-text04">
                                                            <div>Usuario</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-users-sectionheadertable3">
                                                    <div className="admin-dashboard-users-textheadertable3">
                                                        <span className="admin-dashboard-users-text06">
                                                            <div>Apellido</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-users-sectionheadertable4">
                                                    <div className="admin-dashboard-users-textheadertable4">
                                                        <span className="admin-dashboard-users-text08">
                                                            <div>Email</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-users-sectionheadertable5">
                                                    <div className="admin-dashboard-users-textheadertable5">
                                                        <span className="admin-dashboard-users-text10">
                                                            <div>ROL </div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-users-sectionheadertable6">
                                                    <div className="admin-dashboard-users-textheadertable6">
                                                        <span className="admin-dashboard-users-text12">
                                                            <div>Acciones</div>
                                                        </span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="admin-dashboard-users-containersectionmaintable">
                                            {/* Cuerpo de la tabla */}
                                            {Array.isArray(users) && users.map(user => (
                                                <tr key={user.id} className="admin-dashboard-users-sectiontabletr">
                                                    <td className="admin-dashboard-users-sectiontabletd">
                                                        <div className="admin-dashboard-users-td">
                                                            <span className="admin-dashboard-users-text14">
                                                                <span>{user.firstName}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-users-sectiontabletd1">
                                                        <div className="admin-dashboard-users-td1">
                                                            <span className="admin-dashboard-users-text16">
                                                                <span>{user.username}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-users-sectiontabletd2">
                                                        <div className="admin-dashboard-users-td2">
                                                            <span className="admin-dashboard-users-text18">
                                                                <span>{user.lastName}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-users-sectiontabletd3">
                                                        <div className="admin-dashboard-users-td3">
                                                            <span className="admin-dashboard-users-text20">
                                                                <span>{user.email}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-users-sectiontabletd4">
                                                        <div className="admin-dashboard-users-td4">
                                                            <span className="admin-dashboard-users-text22">
                                                                <span>{user.rol}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-users-sectiontabletd5">
                                                        <FormButtom to={`/admin/usuarios/edit/${user.id}`}>Editar</FormButtom>
                                                    </td>
                                                    <td className="admin-dashboard-users-sectiontabletd6">
                                                        <FormButtom onClick={() => this.handleDeleteUser(user.id)}>Eliminar</FormButtom>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="admin-dashboard-users-containersectionmainpagination">
                                            <tr>
                                                <td className="admin-dashboard-users-containerpageiconleft">
                                                    {currentPage >= 1 && (
                                                        <button className="admin-dashboard-users-containericonleft" onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                                                            <Icon name="Arrow1" size='26px' />
                                                        </button>
                                                    )}
                                                </td>
                                                {Array.from(Array(totalPages).keys()).slice(currentPage, currentPage + 4).map(pageNumber => (
                                                    <td key={pageNumber} className={`admin-dashboard-users-containerpagenum1 ${pageNumber === currentPage ? 'active-page' : ''}`}>
                                                        <span className={'admin-dashboard-users-text2'}>{pageNumber + 1}</span>
                                                    </td>
                                                ))}
                                                <td className="admin-dashboard-users-containerpageiconright">
                                                    {currentPage < totalPages - 1 && (
                                                        <button className="admin-dashboard-users-containericonleft" onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                                                            <Icon name="Arrow2" size='26px' />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    {/* Modal para eliminar usuario */}
                                    <Modal show={showDeleteModal} onHide={() => this.setState({ showDeleteModal: false })}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirmar eliminación</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            ¿Estás seguro de que quieres eliminar este usuario?
                                            Esta acción no se puede deshacer.
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <FormButtom color="#D4DCE4" onClick={() => this.setState({ showDeleteModal: false })}>
                                                Cancelar
                                            </FormButtom>
                                            <FormButtom onClick={() => this.confirmDeleteUser()}>
                                                Eliminar
                                            </FormButtom>
                                        </Modal.Footer>
                                    </Modal>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
