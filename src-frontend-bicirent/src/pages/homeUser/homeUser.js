import { Component } from "react";
import HeaderUser from "../../components/common/layout/header/headerUser";

export default class HomeUser extends Component {
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
                <HeaderUser />
                <h3>{this.state.content}</h3>

            </>
        );
    }
}
