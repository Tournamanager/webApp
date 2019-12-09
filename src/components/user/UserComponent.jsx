import React, { Component} from "react";

export default class UserComponent extends Component{

    render(){
        return (
            <div>
                <div>
                    <h5>{this.props.user.username}</h5>
                </div>
            </div>
        )
    }
}
