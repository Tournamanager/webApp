import React, { Component } from 'react';
import ApiCommunication from "./apicommunication/ApiCommunication";

import MaterialTable from 'material-table';

class Teams extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamList: { teams: [] }
        }
            [this.state, this.setState] = {
            columns: [
                { title: 'Team name', field: 'name' },
                { title: 'Team captain', field: 'teamcaptain' },
                { title: 'Created at', field: 'created_at', type: 'string' },
                
            ],
            data: [
                { name: 'Maatwerkboys', teamcaptain: 'Kees', created_at: '18-11-2019'},
            ],
        };
    }

    componentDidMount() {
        var body = "query {teams{name}}";
        var vars = `{} `;

        ApiCommunication.graphQlCall(this, body, vars, "teamList")
        // .then(res => console.log(res))
        // .catch(err => console.log(err));  
    
    }

    render() {   
        return (
            <div style={{margin: '50px'}}>
                <MaterialTable
                    title="Teams"
                    columns={this.state.columns}
                    data={this.state.data}
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

export default Teams

