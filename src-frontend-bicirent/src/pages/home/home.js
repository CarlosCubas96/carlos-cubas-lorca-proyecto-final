import React, { Component } from "react";
import Header from "../../components/common/layout/header/header";
import Main from "../../components/common/layout/main/main";
import Footer from "../../components/common/layout/footer/footer";
import authService from "../../services/auth/auth.service";
import DashBoardMainAdmin from "../../pages/admin/DashBoardMainAdmin/dashBoardMainAdmin";

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
        <div>
          <Header currentUser={currentUser} />
          <Main />
          <Footer />
        </div>
      );
    }

    return (
      <div>
        {currentUser.roles.includes("ROLE_ADMIN") ? (
          <DashBoardMainAdmin />
        ) : (
          <>
            <Header currentUser={currentUser} />
            <Main />
            <Footer />
          </>
        )}
      </div>
    );
  }
}
