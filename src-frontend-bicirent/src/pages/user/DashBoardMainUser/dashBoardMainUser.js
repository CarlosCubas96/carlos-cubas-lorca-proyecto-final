import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import authService from "../../../services/auth/auth.service";
import RentalService from "../../../services/rental/rental.service";
import Header from "../../../components/common/layout/header/header";
import './dashBoardMainUser.css';
import Icon from "../../../components/UI/icon/icon";

const DashBoardMainUser = () => {
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
    const [rentals, setRentals] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rentalStatus, setRentalStatus] = useState("ACTIVE");
    const [activeButton, setActiveButton] = useState("active");

    const retrieveRentals = useCallback((userId, status) => {
        const pageSize = 4;
        RentalService.getRentalsByLandlordId(userId, status, currentPage, pageSize)
            .then(data => {
                setRentals(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching rentals:', error);
            });
    }, [currentPage]);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            retrieveRentals(user.id, rentalStatus);
        }
    }, [rentalStatus, retrieveRentals]);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (currentUser) {
            retrieveRentals(currentUser.id, rentalStatus);
        }
    };

    const handleActiveRentals = () => {
        setActiveButton("active");
        setRentalStatus("ACTIVE");
        setCurrentPage(0);
        retrieveRentals(currentUser.id, "ACTIVE");
    };

    const handleInactiveRentals = () => {
        setActiveButton("inactive");
        setRentalStatus("INACTIVE");
        setCurrentPage(0);
        retrieveRentals(currentUser.id, "INACTIVE");
    };

    return (
        <div className="dash-board-main-user-container">
            <div className="dash-board-main-user-dash-board-main-user">
                <Header currentUser={currentUser} />
                <div className="dash-board-main-user-containerdashboarduser">
                    <div className="dash-board-main-user-containerdashboardsections">
                        <div className="dash-board-main-user-containermainsectionuser">
                            <div className="dash-board-main-user-containermainsectiontitle">
                                <div className="dash-board-main-user-containersectiontitle">
                                    <span className="dash-board-main-user-text12">
                                        <span>Panel de Usuario</span>
                                    </span>
                                </div>
                            </div>
                            <div className="dash-board-main-user-containermainsectionsubtitle">
                                <div className="dash-board-main-user-containersectionsubitle">
                                    <span className="dash-board-main-user-text14">
                                        <span>Bienvenido {currentUser.username}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="dash-board-main-user-containermainsectioncards">
                                <Link to={"/user/perfil"} className="dash-board-main-user-containersectioncard">
                                    <div className="dash-board-main-user-containersectioncardicon">
                                        <Icon name="User" />
                                    </div>
                                    <div className="dash-board-main-user-containersectioncardbody">
                                        <div className="dash-board-main-user-containercardbodytitle">
                                            <span className="dash-board-main-user-text16">
                                                <span>Perfil</span>
                                            </span>
                                        </div>
                                        <div className="dash-board-main-user-containercardbodysubtitle">
                                            <span className="dash-board-main-user-text18">
                                                <span>Edita tu perfil de usuario</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <Link to={"/user/publicaciones"} className="dash-board-main-user-containersectioncard1">
                                    <div className="dash-board-main-user-containersectioncardicon1">
                                        <Icon name="Carpeta" />
                                    </div>
                                    <div className="dash-board-main-user-containersectioncardbody1">
                                        <div className="dash-board-main-user-containercardbodytitle1">
                                            <span className="dash-board-main-user-text20">
                                                <span>Publicaciones</span>
                                            </span>
                                        </div>
                                        <div className="dash-board-main-user-containercardbodysubtitle1">
                                            <span className="dash-board-main-user-text22">
                                                <span>Explora y gestiona tus publicaciones</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="dash-board-main-user-containermainsectionsubtitle1">
                                <div className="dash-board-main-user-containersectionsubitle1">
                                    <span className="dash-board-main-user-text24">
                                        <span>Historial de Alquileres</span>
                                    </span>
                                </div>
                            </div>
                            <div className="dash-board-main-user-containermainsectionbuttoms">
                                <button className={`dash-board-main-user-containerbuttomactive ${activeButton === "active" ? 'active' : 'inactive'}`} onClick={handleActiveRentals}>
                                    <div className="dash-board-main-user-containerbuttomactivetext">
                                        <span className="dash-board-main-user-text26">
                                            <span>Activos</span>
                                        </span>
                                    </div>
                                </button>
                                <button className={`dash-board-main-user-containerbuttomactive1 ${activeButton === "inactive" ? 'active' : 'inactive'}`} onClick={handleInactiveRentals}>
                                    <div className="dash-board-main-user-containerbuttomactivetext1">
                                        <span className="dash-board-main-user-text28">
                                            <span>Inactivos</span>
                                        </span>
                                    </div>
                                </button>
                            </div>
                            <div className="dash-board-main-user-containermainsectionrentals">
                                {rentals && rentals.length > 0 ? (
                                    rentals.map(rental => (
                                        <div key={rental.id} className="dash-board-main-user-depth5-frame0">
                                            <div className="dash-board-main-user-depth10-frame0">
                                                <img src={rental.bicycleImage} className="dash-board-main-user-depth11-frame0" alt="Imagen de la bicicleta" />
                                            </div>
                                            <div className="dash-board-main-user-depth6-frame1">
                                                <div className="dash-board-main-user-depth7-frame0">
                                                    <div className="dash-board-main-user-depth8-frame0">
                                                        <span className="dash-board-main-user-text30">
                                                            <span>{rental.bicycleDescription}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="dash-board-main-user-depth7-frame1">
                                                    <div className="dash-board-main-user-depth8-frame01">
                                                        <span className="dash-board-main-user-text32">
                                                            <span>{rental.endDate}</span>
                                                        </span>
                                                    </div>
                                                    <div className="dash-board-main-user-depth8-frame02">
                                                        <span className="dash-board-main-user-text34">
                                                            <span>{rental.cost} €/ Hora</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No hay alquileres disponibles de este usuario</div>
                                )}
                            </div>
                            {rentals && rentals.length > 0 && (
                                <table className="dash-board-main-user-containersectionmainpagination">
                                    <tfoot className="admin-dashboard-users-containersectionmainpagination">
                                        <tr>
                                            <td className="admin-dashboard-users-containerpageiconleft">
                                                {currentPage >= 1 && (
                                                    <button className="admin-dashboard-users-containericonleft" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
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
                                                    <button className="admin-dashboard-users-containericonleft" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                                                        <Icon name="Arrow2" size='26px' />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoardMainUser;
