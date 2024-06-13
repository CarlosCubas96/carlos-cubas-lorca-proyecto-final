import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../../components/common/layout/header/header";
import authService from "../../../services/auth/auth.service";
import SidebarsectionAdmin from "../../../components/admin/aside/sidebarsectionAdmin";
import Form from "react-validation/build/form";
import './dashBoardEditRentalAdmin.css';
import RentalService from "../../../services/rental/rental.service";
import EditFormInput from "../../../components/UI/inputs/EditFormInput/editFormInput";
import FormButton from "../../../components/UI/Button/FormButton/formButton";
import CheckBoxFormInput from "../../../components/UI/inputs/CheckboxFormInput/checkboxFormInput";

const required = (value) => {
    if (!value) {
        return (
            <div className="login-text-error">
                ¡Este campo es obligatorio!
            </div>
        );
    }
};

const vusername = (value) => {
    if (!value || value.length < 3 || value.length > 20) {
        return (
            <div className="login-text-error">
                El nombre de usuario debe tener entre 3 y 20 caracteres.
            </div>
        );
    }
};

const vprice = (value) => {
    if (value && isNaN(value)) {
        return (
            <div className="login-text-error">
                El precio debe ser un número válido.
            </div>
        );
    }
};

const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
};

const DashBoardEditRentalAdmin = () => {
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentEditRental, setCurrentEditRental] = useState({
        id: null,
        landlord: { username: '' },
        tenant: { username: '' },
        startDate: '',
        endDate: '',
        rentedBicycle: { rentalPrice: 0 },
        rentalStatus: ''
    });

    const [editable, setEditable] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_ADMIN')) {
            setCurrentUser(user);
            getRentalId(id);
        }
    }, [id]);

    const getRentalId = (id) => {
        RentalService.getRentalById(id)
            .then(response => {
                const formattedStartDate = formatDate(response.startDate);
                const formattedEndDate = formatDate(response.endDate);
                setCurrentEditRental({
                    ...response,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rentalPrice') {
            setCurrentEditRental(prevState => ({
                ...prevState,
                rentedBicycle: {
                    ...prevState.rentedBicycle,
                    rentalPrice: parseFloat(value)
                }
            }));
        } else {
            setCurrentEditRental(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleEdit = () => {
        setEditable(prevState => !prevState);
        setMessage(null);
        setErrorMessage(null);
    };

    const handleUpdateRental = () => {
        RentalService.updateRental(id, currentEditRental)
            .then(currentEditRental => {
                setEditable(false);
                setMessage("Alquiler actualizado exitosamente!");
                setErrorMessage(null);
            })
            .catch(error => {
                setErrorMessage("Error al actualizar el Alquiler. Inténtalo de nuevo." + error);
                setMessage(null);
            });
    };


    return (
        <div className="admin-dashboard-main-container">
            <div className="admin-dashboard-main-dash-board-main-admin">
                <Header currentUser={currentUser} />
                <div className="admin-dashboard-main-containerdashboardadmin">
                    <div className="admin-dashboard-main-containerdashboardsections">
                        <SidebarsectionAdmin />
                        <div className="dash-board-profile-admin-containermainsection">
                            <div className="dash-board-profile-admin-containermainsectiontitle">
                                <div className="dash-board-profile-admin-containersectiontitle">
                                    <span className="dash-board-profile-admin-text">
                                        <span>Gestión de Alquiler</span>
                                    </span>
                                </div>
                            </div>
                            <Form className="dash-board-rentals-admin-containermainsectioneditprofile">
                                <div className="dash-board-profile-admin-containermainsectionusername">
                                    <EditFormInput
                                        label="Propietario"
                                        type="text"
                                        placeholder={currentEditRental.landlord.username}
                                        name="landlord-username"
                                        value={currentEditRental.landlord.username}
                                        onChange={onChange}
                                        disabled={true}
                                        validations={[required, vusername]}
                                    />
                                </div>
                                <div className="dash-board-profile-admin-containermainsectionfirst-name">
                                    <EditFormInput
                                        label="Inquilino"
                                        type="text"
                                        placeholder={currentEditRental.tenant.username}
                                        name="tenant-username"
                                        value={currentEditRental.tenant.username}
                                        onChange={onChange}
                                        disabled={true}
                                        validations={[required, vusername]}
                                    />
                                </div>
                                <div className="dash-board-profile-admin-containermainsectionlast-name">
                                    <EditFormInput
                                        label="Fecha de Inicio"
                                        type="date"
                                        placeholder={currentEditRental.startDate}
                                        name="startDate"
                                        value={currentEditRental.startDate}
                                        onChange={onChange}
                                        disabled={!editable}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="dash-board-profile-admin-containermainsectionlast-name">
                                    <EditFormInput
                                        label="Fecha de Finalización"
                                        type="date"
                                        placeholder={currentEditRental.endDate}
                                        name="endDate"
                                        value={currentEditRental.endDate}
                                        onChange={onChange}
                                        disabled={!editable}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="dash-board-profile-admin-containermainsectionlast-name">
                                    <EditFormInput
                                        label="Precio de Alquiler"
                                        type="number"
                                        placeholder={String(currentEditRental.rentedBicycle.rentalPrice)}
                                        name="rentalPrice"
                                        value={isNaN(currentEditRental.rentedBicycle.rentalPrice) ? '' : String(currentEditRental.rentedBicycle.rentalPrice)}
                                        onChange={onChange}
                                        disabled={!editable}
                                        validations={[required, vprice]}
                                    />
                                </div>
                                <div className="dash-board-profile-admin-containermainsection-checkbox">
                                    <CheckBoxFormInput
                                        label="Estado del Alquiler"
                                        name="rentalStatus"
                                        options={[
                                            { value: 'ACTIVE', label: 'Activo' },
                                            { value: 'COMPLETED', label: 'Completado' },
                                            { value: 'INACTIVE', label: 'Inactivo' }
                                        ]}
                                        selectedValue={currentEditRental.rentalStatus}
                                        onChange={onChange}
                                        disabled={!editable}
                                        validations={[required]}
                                    />
                                </div>
                            </Form>
                            <div className="dash-board-profile-admin-containermainsectionbuttoms">
                                <FormButton onClick={handleEdit}>Editar</FormButton>
                                <FormButton onClick={handleUpdateRental}>Guardar</FormButton>
                                {message && <div className="form-group">
                                    <div className="edit-containermessage-message">
                                        {message}
                                    </div>
                                </div>}
                                {errorMessage && <div className="form-group">
                                    <div className="edit-containererror-message">
                                        {errorMessage}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardEditRentalAdmin;
