import React, { Component } from 'react';

class UserTournamentsComponent extends Component {

    listItems = () => (
        this.props.tournaments.length > 0 ?
            this.props.tournaments.map((item) => {
                return <li key={item.id} className="list-group-item"
                           onClick={() => this.props.history.push("/tournament/" + item.id)}>{item.name}</li>
            }) : <li>No tournaments found.</li>
    )

    render() {
        return (
            <div className="col-md-3" style={{ margin: '0 auto' }}>
                <div>
                    <h2 className="text-center" style={{ display: 'inline-block' }}>Tournaments</h2>
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

export default UserTournamentsComponent;
