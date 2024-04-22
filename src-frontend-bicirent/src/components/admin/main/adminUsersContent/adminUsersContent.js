import React from 'react'

import './adminUsersContent.css'
import SidebarsectionAdmin from '../../aside/sidebarsectionAdmin'
import Icon from '../../../UI/icon/icon'
import SearchBoxButton from '../../../UI/Button/SearchBoxButton/searchBoxButton'

const AdminDashboardUsers = () => {
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

                            <label > <Icon name="Lupa"/></label>
                          

                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Buscar usuarios"
                                    className="admin-dashboard-users-sectioninputsearch-box"
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
                                <tr className="admin-dashboard-users-sectiontabletr">
                                    <td className="admin-dashboard-users-sectiontabletd">
                                        <span className="admin-dashboard-users-text014">Hannah Lee</span>
                                    </td>
                                    <td className="admin-dashboard-users-sectiontabletd01">
                                        <span className="admin-dashboard-users-text016">Cruiser Bike</span>
                                    </td>
                                    <td className="admin-dashboard-users-sectiontabletd02">
                                        <span className="admin-dashboard-users-text018">Hannah Lee</span>
                                    </td>
                                    <td className="admin-dashboard-users-sectiontabletd03">
                                        <span className="admin-dashboard-users-text020">Hannah Lee</span>
                                    </td>
                                    <td className="admin-dashboard-users-sectiontabletd04">
                                        <span className="admin-dashboard-users-text022">Usuario</span>
                                    </td>
                                    <td className="admin-dashboard-users-sectiontabletd05">
                                        <div className="admin-dashboard-users-depth11-frame0">
                                        <SearchBoxButton to="/admin">Editar</SearchBoxButton>
                                        </div>
                                    </td>
                                    <td className="admin-dashboard-users-sectiontabletd06">
                                        <div className="admin-dashboard-users-depth11-frame001">
                                        <SearchBoxButton to="/admin">Eliminar</SearchBoxButton>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardUsers
