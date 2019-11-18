import React, {Component } from 'react';
import SearchForm from './SearchForm';
import FlightResults from './FlightResults';


class FlightSearch extends Component {


    render() {
        return(
            <div>
                <h1>Flight Search</h1>
                <SearchForm />
            </div>
        )
    }

}

export default FlightSearch