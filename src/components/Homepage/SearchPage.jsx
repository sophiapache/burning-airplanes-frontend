import axios from 'axios';
import React, { Component } from 'react';
import SearchForm from './SearchForm';
import FlightDisplay from './FlightDisplay';
import { findByAltText } from '@testing-library/react';

const FLIGHTS_URL = `http://localhost:3000/flights.json`;

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            flights: [],
            flight_id: [],
            origin: '',
            destination: '',
            date: ''
        };
    };

    componentDidMount() {
            axios(FLIGHTS_URL).then((response) => {
                this.setState({flights: response.data});
            });
    };

    // fetchFlights() {
    //     axios(FLIGHTS_URL).then((response) => {
    //         const flights = response.data;
    //         })
    // };

    render() {
        return (
            <div>
                <h1>Airline</h1>
                <SearchForm onSubmit={ this.filterFlights }/>
                <FlightDisplay flights={ this.state.flights } />
            </div>
        );
    }
}

export default SearchPage;