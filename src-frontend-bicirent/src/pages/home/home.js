import React, { Component } from "react";
import Header from "../../components/common/layout/header/header"
import Main from "../../components/common/layout/main/main";
import Footer from "../../components/common/layout/footer/footer";

import authService from "../../services/auth/auth.service";


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

    return (
      <div>
        <Header currentUser={currentUser} />
        <Main  />
        <Footer />
      </div>
    );
  }
}
