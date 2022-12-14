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
            allFlights: [],
            flights: [],
            flight_id: [],
            origin: '',
            destination: '',
            date: ''
        };
    };

    componentDidMount() {
            axios(FLIGHTS_URL).then((response) => {
                this.setState({allFlights: response.data});
            });
    };

    _handleInputOne = (e) => {
        this.setState({origin: e.target.value});
    };

    _handleInputTwo = (e) => {
        this.setState({destination: e.target.value});
    };

    // filter this.state.flights array and have origin key match this.state.origin
    filterFlights = () => {
        let flights = [];
        for(let i=0;i<this.state.allFlights.length;i++) {
            let flight = this.state.allFlights[i];
            if (flight.origin === this.state.origin && flight.destination === this.state.destination) {
                flights.push(flight);
            }
        } console.log(flights);
        this.setState({flights: flights});
    };



    render() {
        return (
            <div>
                <h1>Search For Flights</h1>
                <SearchForm _handleInputOne={ this._handleInputOne } _handleInputTwo={ this._handleInputTwo } onSubmit={ this.filterFlights }/>
                <FlightDisplay flights={ this.state.flights } />
            </div>
        );
    }
}

export default SearchPage;