import React, { Component } from 'react';

class UserMatchesComponent extends Component {

    listItems = () => (
        this.props.matches.map((item) => {
            return <li key={item.id} className="list-group-item" onClick={() => this.props.history.push("/match/" + item.id)}>{item.name}</li>
        })
    )

    render() {
        return (
            <div className="col-md-5" style={{ margin: '0 auto' }}>
                <div>
                    <h2 style={{ display: 'inline-block' }}>Matches</h2>
                </div>

                <ul className="list-group">
                    {
                        this.listItems()
                    }
                </ul>
            </div>

        )
    }

}

export default UserMatchesComponent;
