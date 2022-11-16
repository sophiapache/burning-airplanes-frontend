import React, { Component } from 'react';
import FlightInfo from './FlightInfo';
import SeatChart from './SeatChart';
import SelectedSeat from './SelectedSeat';

// import axios
// request should be done here (inside class)
// variable for url

// const FLIGHT_URL =  // here it needs the flight id -> grab from app(?)
const RESERVATION_URL = 'http://localhost:3000/reservations/new' // post url
const ALL_RESERVATIONS_URL = 'http://localhost:3000/reservations.json'

class FlightPage extends Component {
    constructor() {
        super();
        this.state = {
            availableSeats: [[]],
            userId: 0,
            airplaneId: 0,
            selectedRow: 0,
            selectedColum: 0
        }

        this._saveReservation = this._saveReservation.bind(this)
    }

    
    fetchFlightData = () => {
        axios(`http://localhost:3000/flights/${flightId}.json`).then((response) => {
            const flightData = Object.assign({}, this.state);
            flightData.userId = response.user_id;
            flightData.airplaneId = response.airplane_id;
            this.setState(flightData);
        })
    }

    matchAvailableSeats = () => {
        axios(ALL_RESERVATIONS_URL).then((response) => {
            let reservedRows;
            for (let i = 0; i < response.)
        })
    }

    fetchAirplanesSeats = () => {
        axios(`http://localhost:3000/airplanes/${this.airplaneId}.json`).then((response) => {
            const totalSeats = new Array(response.columns).fill(new Array(response.rows).fill(true));
            this.matchAvailableSeats(totalSeats);
        })
    }


    componentDidMount() {
        this.fetchFlightData() // break it down because after posting reservation, i'll call it there too
        this.fetchAirplanesSeats()
    }

    _saveReservation(row, column) {
        // logic for posting on the database -> reservation

        axios.post(RESERVATION_URL, {
            user_id: this.state.userId,
            airplane_id: this.state.airplaneId,
            row: this.state.selectedRow,
            column: this.state.selectedColum
        }).then(() => {
            this.fetchFlightData();
            // maybe we need to deselect the row and column
        });
    }

    render() {
        return (
            <div>
                <FlightInfo/>
                <SeatChart/>
                <SelectedSeat onSubmit={this.saveReservation}/>
            </div>
        );
    }
}

export default FlightPage;