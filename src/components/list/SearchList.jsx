import React, { Component } from "react";
import TournamentListComponent from "../tournament/TournamentListComponent";
import TeamsListComponent from "../team/TeamListComponent";

class SearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredObjects: []
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let filtered=[];
        this.props.objects.forEach(o => {
            if (o.name.includes(event.target.value)) {
                filtered.push(o);
            }
        })
        this.setState({filteredObjects: filtered})
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.isSet !== this.props.isSet) {
            this.setState(this.setState({filteredObjects: this.props.objects}))
        }
    }

    render() {
        return (
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th colSpan='10'>
                            <input onChange={this.onChange} size="1" className="form-control col-lg-2 float-right" type="search" placeholder="Search" aria-label="Search"/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !this.props.isSet ? (
                            <tr><td>No data to display</td></tr>
                        ) : (
                            this.state.filteredObjects.length !== 0 ? (
                                this.props.src==='tournaments' ? (
                                    this.state.filteredObjects.map(object => (
                                        <TournamentListComponent key={object.id} object={object} />
                                    ))
                                ) : this.props.src==='teams' ? (
                                    this.state.filteredObjects.map(object => (
                                        <TeamsListComponent key={object.id} object={object} />
                                    ))
                                ) : (
                                    <tr><td>No data to display</td></tr>
                                )
                            ) : (
                                <tr><td>No data to display</td></tr>
                            )
                            
                        )
                    }
                </tbody>
            </table>
        );
    }
}

export default SearchList;