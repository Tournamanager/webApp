import React, { Component } from "react";
import TournamentListComponent from "../tournament/TournamentListComponent";
import TeamsListComponent from "../team/TeamListComponent";

class SearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredObjects:props.objects
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.filtered=[];
        this.props.objects.forEach(o => {
            if (o.name.includes(event.target.value)) {
                this.filtered.push(o);
            }
        })
        this.setState({filteredObjects: this.filtered})
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
                    {this.props.src==='tournaments' ? (
                        this.state.filteredObjects.map(object => (
                            <TournamentListComponent key={object.id} object={object} />
                        ))
                    ) : this.props.src==='teams' ? (
                        this.state.filteredObjects.map(object => (
                            <TeamsListComponent key={object.id} object={object} />
                        ))
                    ) : (
                        <div>No data to display</div>
                    )
                }
                </tbody>
            </table>
        );
    }
}

export default SearchList;