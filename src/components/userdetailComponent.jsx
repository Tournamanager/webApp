import React, { Component } from 'react';

class Userdetails extends Component {



    render() {
        return (
            <div>
               <h5>{console.log(this.props.data.id)}</h5>
               <h5>{this.props.data.id}</h5>
               <h5>{this.props.data.name}</h5>
               <h5>{this.props.data.phone}</h5>
            </div>
        )
    }
}

export default Userdetails
