import { Component } from "react";


export default class Lista extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "LISTADO"
        };
    }

    
    componentDidMount() {
      
    

    }

    render() {
        return (
            <>
                <h3>{this.state.content}</h3>

            </>
        );
    }
}
