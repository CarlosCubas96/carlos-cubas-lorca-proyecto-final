import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../../components/common/layout/header/header";
import authService from "../../../services/auth/auth.service";
import SidebarsectionAdmin from "../../../components/admin/aside/sidebarsectionAdmin";
import Form from "react-validation/build/form";
import { isEmail } from "validator";
import './dashBoardEditUserAdmin.css';
import UserService from "../../../services/user/user.service";
import EditFormInput from "../../../components/UI/inputs/EditFormInput/editFormInput";
import FormButton from "../../../components/UI/Button/FormButton/formButton";

const required = value => {
    if (!value) {
        return (
            <div className="login-text-error">
                ¡Este campo es obligatorio!
            </div>
        );
    }
};

const vemail = value => {
    if (!isEmail(value)) {
        return (
            <div className="login-text-error">
                Este no es un correo electrónico válido.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="login-text-error">
                El nombre de usuario debe tener entre 3 y 20 caracteres.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="login-text-error">
                La contraseña debe tener entre 6 y 40 caracteres.
            </div>
        );
    }
};

const vfirstname = value => {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="login-text-error">
                El nombre debe tener entre 2 y 30 caracteres.
            </div>
        );
    }
};

const vlastname = value => {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="login-text-error">
                El apellido debe tener entre 2 y 30 caracteres.
            </div>
        );
    }
};

const DashBoardEditUserAdmin = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentEditUserProfile, setCurrentEditUserProfile] = useState({
        id: null,
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });
    const [editable, setEditable] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_ADMIN')) {
            setCurrentUser(user);
            getUserProfile(id);
        }
    }, [id]);

    const getUserProfile = (id) => {
        UserService.getUserById(id)
            .then(response => {
                setCurrentEditUserProfile(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setCurrentEditUserProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleEdit = () => {
        setEditable(prevState => !prevState);
        setMessage(null);
        setErrorMessage(null);
    }

    const handleUpdateProfile = () => {
        const { id, ...userData } = currentEditUserProfile;

        UserService.updateUser(id, userData)
            .then(updatedUser => {
                console.log("Usuario actualizado:", updatedUser);
                setEditable(false);
                setMessage("Usuario actualizado exitosamente!");
                setErrorMessage(null);
            })
            .catch(error => {
                console.error("Error al actualizar el Usuario:", error);
                setErrorMessage("Error al actualizar el Usuario. Inténtalo de nuevo.");
                setMessage(null);
            });
    }

    return (
        <>
            <div className="admin-dashboard-main-container">
                <div className="admin-dashboard-main-dash-board-main-admin">
                    <Header currentUser={currentUser} />
                    <div className="admin-dashboard-main-containerdashboardadmin">
                        <div className="admin-dashboard-main-containerdashboardsections">
                            <SidebarsectionAdmin />
                            <div className="dash-board-edit-user-admin-containermainsection">
                                <div className="dash-board-edit-user-admin-containermainsectiontitle">
                                    <div className="dash-board-edit-user-admin-containersectiontitle">
                                        <span className="dash-board-edit-user-admin-text">
                                            <span>Gestión de Usuario</span>
                                        </span>
                                    </div>
                                </div>
                                <Form className="dash-board-edit-user-admin-containermainsectioneditprofile">
                                    <div className="dash-board-edit-user-admin-containermainsectionusername">
                                        <EditFormInput
                                            label="Usuario"
                                            type="text"
                                            placeholder={currentEditUserProfile.username}
                                            name="username"
                                            value={currentEditUserProfile.username}
                                            onChange={onChange}
                                            disabled={true}
                                            validations={[required, vusername]}
                                        />
                                    </div>
                                    <div className="dash-board-edit-user-admin-containermainsectionfirst-name">
                                        <EditFormInput
                                            label="Nombre"
                                            type="text"
                                            placeholder={currentEditUserProfile.firstname}
                                            name="firstname"
                                            value={currentEditUserProfile.firstname}
                                            onChange={onChange}
                                            disabled={!editable}
                                            validations={[required, vfirstname]}
                                        />
                                    </div>
                                    <div className="dash-board-edit-user-admin-containermainsectionlast-name">
                                        <EditFormInput
                                            label="Apellido"
                                            type="text"
                                            placeholder={currentEditUserProfile.lastname}
                                            name="lastname"
                                            value={currentEditUserProfile.lastname}
                                            onChange={onChange}
                                            disabled={!editable}
                                            validations={[required, vlastname]}
                                        />
                                    </div>
                                    <div className="dash-board-edit-user-admin-containermainsectionemail">
                                        <EditFormInput
                                            label="Correo Electrónico"
                                            type="email"
                                            placeholder={currentEditUserProfile.email}
                                            name="email"
                                            value={currentEditUserProfile.email}
                                            onChange={onChange}
                                            disabled={!editable}
                                            validations={[required, vemail]}
                                        />
                                    </div>
                                    <div className="dash-board-edit-user-admin-containermainsectionpassword">
                                        <EditFormInput
                                            label="Contraseña"
                                            type="password"
                                            placeholder="Contraseña"
                                            name="password"
                                            value={currentEditUserProfile.password}
                                            onChange={onChange}
                                            disabled={!editable}
                                            validations={[required, vpassword]}
                                        />
                                    </div>
                                </Form>
                                <div className="dash-board-edit-user-admin-containermainsectionbuttoms">
                                    <FormButton onClick={handleEdit}>Editar</FormButton>
                                    <FormButton onClick={handleUpdateProfile}>Guardar</FormButton>
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
        </>
    );
}

export default DashBoardEditUserAdmin;
