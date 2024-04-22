import React, { Component } from "react";
import Header from "../../../components/common/layout/header/header";
import authService from "../../../services/auth/auth.service";
import AdminDashboardUsers from "../../../components/admin/main/adminUsersContent/adminUsersContent";

export default class UsersPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_ADMIN')) {
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
                <AdminDashboardUsers/>    
            </div>
        );
    }
}
