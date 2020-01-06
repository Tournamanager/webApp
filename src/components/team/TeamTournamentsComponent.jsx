import React, { Component } from 'react';

class TeamTournamentsComponent extends Component {


    listItems = () => {
        this.props.tournaments.map((item) => {
            return <li key={item.id} className="list-group-item">{item.name}</li>
        })
    }

    render() {
        return (
            <div className="col-md-5" style={{ margin: '0 auto' }}>
                <div>
                    <h2 style={{ display: 'inline-block' }}>Tournaments</h2>
                    <button style={{ verticalAlign: 'super', float: 'right' }} type="button" className="btn btn-dark"><i style={{ verticalAlign: 'middle', fontSize: '28px' }} className="material-icons">add_circle</i>
                    </button>
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

export default TeamTournamentsComponent;