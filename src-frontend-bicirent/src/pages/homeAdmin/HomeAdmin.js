import React, { Component } from "react";
import HeaderAdmin from "../../components/admin/header/headerAdmin";

export default class HomeAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
      
    

    }

    render() {

        
        return (
            <>
                <HeaderAdmin />
                <h3>{this.state.content}</h3>

            </>
        );
    }
}
