import React, { Component } from 'react';
import ApiCommunication from "../services/apicommunication/ApiCommunication";

import MaterialTable from 'material-table';

class AllTeamsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamList: { teams: [] }
        }
    }

    componentDidMount() {
        var body = "query {teams{name}}";
        var vars = `{} `;

      ApiCommunication.graphQlCall(this, body, vars, "teamList")
    
    }

    render() {   
        return (
            <div style={{margin: '50px'}}>
                <MaterialTable
                    title= "Teams"
                    columns={[{title: 'Name', field: 'name' }]}
                    data={this.state.teamList.teams}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        this.setState(prevState => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />
            </div>
        );
    }

}

export default AllTeamsView

