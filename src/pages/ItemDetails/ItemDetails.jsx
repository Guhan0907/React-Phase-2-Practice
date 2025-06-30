import React , {Component} from "react";

class ItemDetails extends Component {
    constructor (props){
        super(props);
        this.state = {
            product : null
        }
    }

    render () {
        return (
            <>
                
                <h1> hello this is the children </h1>
            
            </>
        )
    }
}

export default ItemDetails;

