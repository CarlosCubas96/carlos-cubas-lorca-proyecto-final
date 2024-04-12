import React, { Component } from "react";
import Main from "../../components/common/layout/main/main";
import Footer from "../../components/common/layout/footer/footer";
import HeaderUser from "../../components/common/layout/header/headerUser";
import authService from "../../services/auth/auth.service";
import HeaderAdmin from "../../components/admin/header/headerAdmin";

export default class Home extends Component {
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

        if (!currentUser) {
            return (
                <>
                    <HeaderUser />
                    <Main />
                    <Footer />
                    
                </>
            );

        } else {
            if (currentUser.roles.includes('ROLE_ADMIN')) {
                return (
                    <>
                        <HeaderAdmin />
                        <Main />
                        <Footer />
                    </>
                );
            }

          
           
        }
    }
}
