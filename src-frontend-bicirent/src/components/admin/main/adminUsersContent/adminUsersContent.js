import React, { Component } from 'react';
import UserService from '../../../../services/user/user.service';
import SearchBoxButton from '../../../UI/Button/SearchBoxButton/searchBoxButton';
import Icon from '../../../UI/icon/icon';
import SidebarsectionAdmin from '../../aside/sidebarsectionAdmin';

export default class AdminDashboardUsers extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

        this.state = {
            users: [],
            searchQuery: '',
            currentPage: 0,
            totalPages: 0
        };
    }

    componentDidMount() {
        this.retrieveUsers();
    }

    onChangeSearchQuery(e) {
        const searchQuery = e.target.value;
        this.setState({
            searchQuery: searchQuery,
            currentPage: 0 // Reset currentPage when searchQuery changes
        }, () => {
            this.retrieveUsers(); // Llamar a retrieveUsers después de actualizar searchQuery
        });
    }

    handlePageChange(pageNumber) {
        this.setState({
            currentPage: pageNumber
        }, () => {
            this.retrieveUsers(); // Llamar a retrieveUsers después de actualizar currentPage
        });
    }

    retrieveUsers() {
        const { searchQuery, currentPage } = this.state;
        const pageSize = 8; // Cantidad de usuarios por página
    
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
        UserService.deleteUser(id)
            .then(() => {
                this.setState(prevState => ({
                    users: prevState.users.filter(user => user.id !== id)
                }));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }

    render() {
        const { users, searchQuery, currentPage, totalPages } = this.state;

        return (
            <div className="admin-dashboard-main-container">
                <div className="admin-dashboard-main-containerdashboardadmin">
                    <div className="admin-dashboard-main-containerdashboardsections">
                        <SidebarsectionAdmin />
                        <div className="admin-dashboard-users-containermainsection">
                            <div className="admin-dashboard-users-containermainsectiontitle">
                                <div className="admin-dashboard-users-containersectiontitle">
                                    <span className="admin-dashboard-users-text">
                                        <span>Gestión de Usuarios</span>
                                    </span>
                                </div>
                            </div>
                            <div className="admin-dashboard-users-containersectionsearch-box">
                                <label><Icon name="Lupa" /></label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Buscar usuarios por nombre de usuario, nombre o correo electrónico"
                                        className="admin-dashboard-users-sectioninputsearch-box"
                                        value={searchQuery}
                                        onChange={this.onChangeSearchQuery}
                                    />
                                    <div />
                                </div>
                            </div>
                            <table className="admin-dashboard-users-containermainsectiontable">
                                <thead className="admin-dashboard-users-containersectionheadertable">
                                    <tr className="admin-dashboard-users-sectionsheadertable">
                                        <th className="admin-dashboard-users-sectionheadertable1">
                                            <span className="admin-dashboard-users-text002">Nombre</span>
                                        </th>
                                        <th className="admin-dashboard-users-sectionheadertable2">
                                            <span className="admin-dashboard-users-text004">Usuario</span>
                                        </th>
                                        <th className="admin-dashboard-users-sectionheadertable3">
                                            <span className="admin-dashboard-users-text006">Apellido</span>
                                        </th>
                                        <th className="admin-dashboard-users-sectionheadertable4">
                                            <span className="admin-dashboard-users-text008">Correo Electrónico</span>
                                        </th>
                                        <th className="admin-dashboard-users-sectionheadertable5">
                                            <span className="admin-dashboard-users-text010">Rol</span>
                                        </th>
                                        <th className="admin-dashboard-users-sectionheadertable6">
                                            <span className="admin-dashboard-users-text012">Acciones</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="admin-dashboard-users-containersectionmaintable">
                                    {Array.isArray(users) && users.map(user => (
                                        <tr key={user.id} className="admin-dashboard-users-sectiontabletr">
                                            <td className="admin-dashboard-users-sectiontabletd">{user.firstName}</td>
                                            <td className="admin-dashboard-users-sectiontabletd01">{user.username}</td>
                                            <td className="admin-dashboard-users-sectiontabletd02">{user.lastName}</td>
                                            <td className="admin-dashboard-users-sectiontabletd03">{user.email}</td>
                                            <td className="admin-dashboard-users-sectiontabletd04">{user.rol}</td>
                                            <td className="admin-dashboard-users-sectiontabletd05">
                                                <div className="admin-dashboard-users-depth11-frame0">
                                                    <SearchBoxButton to={`/admin/edit/${user.id}`}>Editar</SearchBoxButton>
                                                </div>
                                            </td>
                                            <td className="admin-dashboard-users-sectiontabletd06">
                                                <div className="admin-dashboard-users-depth11-frame001">
                                                    <SearchBoxButton onClick={() => this.handleDeleteUser(user.id)}>Eliminar</SearchBoxButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pagination-container">
                                {Array.from(Array(totalPages).keys()).map(pageNumber => (
                                    <button
                                        key={pageNumber}
                                        className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
                                        onClick={() => this.handlePageChange(pageNumber)}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
