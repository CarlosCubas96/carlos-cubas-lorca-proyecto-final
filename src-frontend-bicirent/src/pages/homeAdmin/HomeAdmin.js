import React, { Component } from "react";
import Header from "../../components/common/layout/header/header"


import authService from "../../services/auth/auth.service";
import AdminDashboardMain from "../../components/admin/main/adminMainContent/adminMainContent";


export default class HomeAdmin extends Component {
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

            <>
                <Header currentUser={currentUser} />
                <AdminDashboardMain />
            </>
        );
    }
}
