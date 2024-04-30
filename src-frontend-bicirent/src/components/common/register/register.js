import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import './register.css';

import RegisterFormInput from "../../UI/inputs/registerFormInput/registerFormInput";
import AuthButton from "../../UI/Button/AuthButtom/authButtom";

import authService from "../../../services/auth/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="login-text-error">
                ¡Este campo es obligatorio!
            </div>
        );
    }
};

const email = value => {
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

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            firstname: "",
            lastName: "",
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            authService.register(
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.firstname,
                this.state.lastName,
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                    });
                },
                () => {
                    this.props.router.navigate("/");
                    window.location.reload()
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();


                    this.setState({
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="register-container">
                <div className="register-dash-board-signin">
                    <div className="register-containermainsignin">
                        <div className="register-containersignin">
                            <div className="register-containersignintitle">
                                <div className="register-containerregistersectiontitle">
                                    <span className="register-text">
                                        <span>Create una cuenta</span>
                                    </span>
                                </div>
                            </div>
                            <Form
                                onSubmit={this.handleRegister}
                                ref={c => {
                                    this.form = c;
                                }}
                            >
                                <>
                                    <RegisterFormInput
                                        type="text"
                                        placeholder="Usuario"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                    />

                                    <RegisterFormInput
                                        type="text"
                                        placeholder="Nombre"
                                        name="firstname"
                                        value={this.state.firstname}
                                        onChange={this.onChangeFirstName}
                                        validations={[required, vfirstname]}
                                    />

                                    <RegisterFormInput
                                        type="text"
                                        placeholder="Apellido"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.onChangeLastName}
                                        validations={[required, vlastname]}
                                    />
                                    <RegisterFormInput
                                        type="text"
                                        placeholder="Correo Electrónico"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />

                                    <RegisterFormInput
                                        type="password"
                                        placeholder="Contraseña"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />


                                    <div className="register-containerbuttomsignin">
                                        <AuthButton
                                            loading={this.state.loading}
                                            onClick={this.handleRegister}
                                            className="login-containerbuttom1"
                                        >
                                            Crear Cuenta
                                        </AuthButton>
                                    </div>

                                </>

                                {this.state.message && (
                                    <div className="form-group">
                                        <div className={"register-containererror-message-error"}>
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>
                            <div className="register-containerregistersubtext">
                                <div className="register-containerregistersectionsubtext1">
                                    <span className="register-text08">
                                        <span>
                                            Al hacer clic en Crear Cuenta, aceptas los Términos de Servicio
                                            y la Política de Privacidad de BiciRent Co.
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="register-containersigninsubtext2">
                                <div className="register-containerregistersectionsubtext2">
                                    <span className="register-text12">
                                        <span>¿No tienes cuenta?</span>
                                    </span>
                                </div>
                            </div>
                            <div className="register-containerregisterbuttom">
                                <AuthButton to="/login" className="login-containerbuttom2">
                                    Iniciar Sesión
                                </AuthButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
