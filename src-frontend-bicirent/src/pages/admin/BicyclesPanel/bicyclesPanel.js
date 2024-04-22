import React, { Component } from "react";
import Header from "../../../components/common/layout/header/header"


import authService from "../../../services/auth/auth.service";


export default class BicyclesPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    render() {
        const { currentUser } = this.state;

        return (

            <div>
                <Header currentUser={currentUser} />
                <div>
                    <h2>Bicicletas</h2>
                    <p>Aquí va el contenido del panel de bicicletas...</p>
                </div>
            </div>
        );
    }
}
