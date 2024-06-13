import React, { Component } from "react";
import Form from "react-validation/build/form";
import { withRouter } from "../../../common/with-router";
import CheckButton from "react-validation/build/button";

import './login.css';

import LoginFormInput from "../../UI/inputs/loginFormInput/loginFormInput";
import AuthButtom from "../../UI/Button/AuthButtom/authButtom";

import authService from "../../../services/auth/auth.service";
import { Link } from "react-router-dom";
import Icon from "../../UI/icon/icon";

const required = value => {
  if (!value) {
    return (
      <div className="login-text-error">
        ¡Este campo es obligatorio!
      </div>
    );
  }
};


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      authService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();


          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-dash-board-signin">
          <div className="login-containermainsignin">
            <div className="login-containersignin">
              <div className="login-containersignintitle">
                <div className="login-containerregistersectiontitle">
                  <span className="login-text">
                    <span>Bienvenido a BiciRent</span>
                  </span>
                  <Link to={"/"} style={{ border: 'none', background: 'inherit' }}>
                    <Icon name="ArrowExit" size="30px"></Icon>
                  </Link>
                </div>
              </div>
              <div className="login-containersigninsubtext">
                <div className="login-containerregistersectionsubtext">
                  <span className="login-text02">
                    <span>Logéate con tu cuenta para continuar</span>
                  </span>
                </div>
              </div>
              <Form
                onSubmit={this.handleLogin}
                ref={c => {
                  this.form = c;
                }}
              >


                <LoginFormInput
                  label="Usuario"
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                />

                <LoginFormInput
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />

                <div className="login-containerbuttomsignin">

                  <AuthButtom
                    loading={this.state.loading}
                    onClick={this.handleLogin}
                    className="login-containerbuttom1"
                  >
                    Iniciar Sesión
                  </AuthButtom>



                </div>

                {this.state.message && (
                  <div className="form-group">
                    <div className="login-containererror-message">
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
              <div className="login-containerregistersubtext">
                <div className="login-containerregistersectionsubtext1">
                  <span className="login-text08">
                    <span>
                      Al hacer clic en Crear Cuenta, aceptas los Términos de
                      Servicio y la Política de Privacidad de BiciRent Co.
                    </span>
                  </span>
                </div>
              </div>
              <div className="login-containersigninsubtext2">
                <div className="login-containerregistersectionsubtext2">
                  <span className="login-text12">
                    <span>¿No tienes cuenta?</span>
                  </span>
                </div>
              </div>
              <div className="login-containerregisterbuttom">


                <AuthButtom
                  to="/registro"
                  className="login-containerbuttom2"
                >
                  Crear Cuenta
                </AuthButtom>



              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
