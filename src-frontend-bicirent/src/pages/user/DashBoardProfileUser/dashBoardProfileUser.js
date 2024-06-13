import React, { Component } from "react";
import Header from "../../../components/common/layout/header/header";
import authService from "../../../services/auth/auth.service";
import Form from "react-validation/build/form";
import { isEmail } from "validator";
import './dashBoardProfileUser.css';
import UserService from "../../../services/user/user.service";
import EditFormInput from "../../../components/UI/inputs/EditFormInput/editFormInput";
import FormButton from "../../../components/UI/Button/FormButton/formButton";
import Icon from "../../../components/UI/icon/icon";

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

export default class DashBoardProfileUser extends Component {
    constructor(props) {
        super(props);
        this.getUserProfile = this.getUserProfile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);

        this.state = {
            currentUser: undefined,
            currentUserProfile: {
                id: null,
                username: "",
                firstname: "",
                lastname: "",
                email: "",
                password: "",
            },
            editable: false,
            message: null,
            errorMessage: null
        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
            }, () => {
                if (this.state.currentUser && this.state.currentUser.id) {
                    this.getUserProfile(this.state.currentUser.id);
                } else {
                    console.log("El usuario actual es inválido.");
                }
            });
        }
    }

    getUserProfile(id) {
        UserService.getUserById(id)
            .then(response => {
                this.setState({
                    currentUserProfile: response
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            currentUserProfile: {
                ...prevState.currentUserProfile,
                [name]: value
            }
        }));
    }

    handleEdit() {
        this.setState(prevState => ({
            editable: !prevState.editable,
            message: null,
            errorMessage: null
        }));
    }

    handleUpdateProfile() {
        const { currentUserProfile } = this.state;
        const { id, ...userData } = currentUserProfile;

        UserService.updateUser(id, userData)
            .then(updatedUser => {
                console.log("Perfil actualizado:", updatedUser);
                this.setState({
                    editable: false,
                    message: "¡Perfil actualizado exitosamente!",
                    errorMessage: null
                });
            })
            .catch(error => {
                console.error("Error al actualizar el perfil:", error);
                this.setState({
                    errorMessage: "Error al actualizar el perfil. Inténtalo de nuevo.",
                    message: null
                });
            });
    }

    handleGoBack = () => {
        window.history.back();
    };


    render() {
        const { currentUser, currentUserProfile, editable, message, errorMessage } = this.state;

        return (
            <div className="admin-dashboard-main-container">
                <div className="admin-dashboard-main-dash-board-main-admin">
                    <Header currentUser={currentUser} />
                    <div className="admin-dashboard-main-containerdashboardadmin">
                        <div className="admin-dashboard-main-containerdashboardsections">
                            <div className="dash-board-profile-user-containermainsection">
                                <div className="dash-board-profile-admin-containermainsectiontitle">
                                    <div className="dash-board-profile-admin-containersectiontitle">
                                        <span className="dash-board-profile-admin-text">
                                            <span>Perfil de Usuario</span>
                                        </span>
                                    </div>
                                    <button style={{ border: 'none', background: 'inherit' }} onClick={() => this.handleGoBack()}>
                                        <Icon name="ArrowExit" size="30px"></Icon>
                                    </button>


                                </div>
                                <Form className="dash-board-profile-admin-containermainsectioneditprofile">
                                    <div className="dash-board-profile-admin-containermainsectionusername">
                                        <EditFormInput
                                            label="Usuario"
                                            type="text"
                                            placeholder={currentUserProfile.username}
                                            name="username"
                                            value={currentUserProfile.username}
                                            onChange={this.onChange}
                                            disabled={true}
                                            validations={[required, vusername]}
                                        />
                                    </div>
                                    <div className="dash-board-profile-admin-containermainsectionfirst-name">
                                        <EditFormInput
                                            label="Nombre"
                                            type="text"
                                            placeholder={currentUserProfile.firstname}
                                            name="firstname"
                                            value={currentUserProfile.firstname}
                                            onChange={this.onChange}
                                            disabled={!editable}
                                            validations={[required, vfirstname]}
                                        />
                                    </div>
                                    <div className="dash-board-profile-admin-containermainsectionlast-name">
                                        <EditFormInput
                                            label="Apellido"
                                            type="text"
                                            placeholder={currentUserProfile.lastname}
                                            name="lastname"
                                            value={currentUserProfile.lastname}
                                            onChange={this.onChange}
                                            disabled={!editable}
                                            validations={[required, vlastname]}
                                        />
                                    </div>
                                    <div className="dash-board-profile-admin-containermainsectionemail">
                                        <EditFormInput
                                            label="Correo Electrónico"
                                            type="email"
                                            placeholder={currentUserProfile.email}
                                            name="email"
                                            value={currentUserProfile.email}
                                            onChange={this.onChange}
                                            disabled={!editable}
                                            validations={[required, vemail]}
                                        />
                                    </div>
                                    <div className="dash-board-profile-admin-containermainsectionpassword">
                                        <EditFormInput
                                            label="Contraseña"
                                            type="password"
                                            placeholder="Contraseña"
                                            name="password"
                                            value={currentUserProfile.password}
                                            onChange={this.onChange}
                                            disabled={true}
                                            validations={[required, vpassword]}
                                        />
                                    </div>
                                </Form>
                                <div className="dash-board-profile-admin-containermainsectionbuttoms">
                                    <FormButton color="#F5F5F5" onClick={this.handleEdit}>Editar</FormButton>
                                    <FormButton color="#F5F5F5" onClick={this.handleUpdateProfile}>Guardar</FormButton>
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
    }
}

