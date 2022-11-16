import React, { Component } from 'react';
import FlightInfo from './FlightInfo';
import SeatChart from './SeatChart';
import SelectedSeat from './SelectedSeat';
import axios from 'axios'


// const FLIGHT_URL =  // here it needs the flight id -> grab from app(?)
const RESERVATION_URL = 'http://localhost:3000/reservations/new' // post url
const ALL_RESERVATIONS_URL = 'http://localhost:3000/reservations.json'

class FlightPage extends Component {
    constructor() {
        super();
        this.state = {
            totalSeats: [[]], // here is in fact an array with all rows and columns, not lookinf if it is reserved or not
            userId: 0,
            airplaneId: 2,
            flightNumber: 0,
            origin: '',
            destination: '',
            date: '',
            selectedRow: 0,
            selectedColumn: 0
        }

        this._saveReservation = this._saveReservation.bind(this)
    }

    fetchFlightData = (flightId) => { // find a way to grab flightId from homepage
        // (`http://localhost:3000/flights/${flightId}.json`) -> change to this later
        axios(`http://localhost:3000/flights/3.json`).then((response) => {
            const flightData = Object.assign({}, this.state);
            flightData.userId = response.data.user_id;
            flightData.airplaneId = response.data.airplane_id;
            flightData.flightNumber = response.data.flight_number;
            flightData.origin = response.data.origin;
            flightData.destination = response.data.destination;
            const date = new Date(response.data.date).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
            flightData.date = date;
            this.setState(flightData);

            // fetch airplane seats

            let reservedSeats = {}
            // http://localhost:3000/flights/3/reservations.json
            axios(ALL_RESERVATIONS_URL).then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    const currentSeat = response.data.seat[i].split("");
                    reservedSeats[`${response.data.id}`] = {
                        row: currentSeat[0],
                        column: currentSeat[1].charCodeAt(0) % 32,
                        seat: response.data.seat[i],
                        user: response.data.user_id.email
                    }
                }

                axios(`http://localhost:3000/airplanes/${this.state.airplaneId}.json`).then((response) => {
                    const totalSeats = new Array(response.data.rows);

                    for (let i = 0; i < totalSeats.length; i++) {
                        totalSeats[i] = new Array(response.data.columns);
                        for (let j = 0; j < totalSeats[i].length; j++) {
                            totalSeats[i][j] = {
                                seat: `${i}-${j}`, // TODO convert j to letter
                            };
                        }
                    }

                    Object.keys(reservedSeats).forEach(key => {
                        const row = reservedSeats[key].row;
                        const column = reservedSeats[key].column;
                        totalSeats[row][column].user = reservedSeats.user;
                    })

                    const flightData = Object.assign({}, this.state);
                    flightData.totalSeats = totalSeats;
                    this.setState(flightData);
                })
            })
        })
    }

    componentDidMount() {
        this.fetchFlightData()
            // .then(() => this.fetchAirplanesSeats())
            // .then(() => this.matchAvailableSeats()); 
        // / break it down because after posting reservation, i'll call it there too
    }
    
    _saveReservation() {
        // logic for posting on the database -> reservation
    
        axios.post(RESERVATION_URL, {
            user_id: this.state.userId,
            airplane_id: this.state.airplaneId,
            row: this.state.selectedRow, // this info will be sent by the selected seat
            column: this.state.selectedColumn // same
        }).then(() => {
            this.matchAvailableSeats()
        });
    }
    
    render() {
        const flight = this.state;
    
        return (
            <div>
                <FlightInfo
                    number={flight.flightNumber}
                    origin={flight.origin}
                    destination={flight.destination}
                    date={flight.date}
                />
                <SeatChart
                    seats={flight.totalSeats}
                />
                <SelectedSeat
                    row={flight.selectedRow}
                    column={flight.selectedColumn}
                    onSubmit={this._saveReservation}
                />
            </div>
        );
    };
}
export default FlightPage;

// fetchReservedSeats = () => {
//     let reservedSeats = {}
//     axios(ALL_RESERVATIONS_URL).then((response) => {
//         for (let i = 0; i < response.data.length; i++) { 
//             const currentSeat = response.data.seat[i].split("");
//             reservedSeats[`${response.data.id}`] = {
//                 row: currentSeat[0],
//                 column: currentSeat[1].charCodeAt(0) % 32
//             }
//         }
//     }).then(() => {
//         const reservedSeats = this.fetchReservedSeats();
//         let updatedSeats = this.state.totalSeats 
//         Object.keys(reservedSeats).forEach(key => {
//             const row =reservedSeats[key].row;
//             const column = reservedSeats[key].column;
//             updatedSeats[row][column] = false;
//         })
//         const flightData = Object.assign({}, this.state);
//         flightData.availableSeats = updatedSeats;
//         this.setState(flightData);
//     })
// }

// matchAvailableSeats = () => {
//    const reservedSeats = this.fetchReservedSeats();
//    let updatedSeats = this.state.totalSeats 
//    Object.keys(reservedSeats).forEach(key => {
//         const row =reservedSeats[key].row;
//         const column = reservedSeats[key].column;
//         updatedSeats[row][column] = false;
//    })
//    const flightData = Object.assign({}, this.state);
//    flightData.availableSeats = updatedSeats;
//    this.setState(flightData);
// }

// fetchAirplanesSeats = () => {
//     axios(`http://localhost:3000/airplanes/${this.state.airplaneId}.json`).then((response) => {
//         const totalSeats = new Array(response.data.columns).fill(new Array(response.data.rows).fill(true));
//         const flightData = Object.assign({}, this.state);
//         flightData.totalSeats = totalSeats;
//         this.setState(flightData);
//     })
// }