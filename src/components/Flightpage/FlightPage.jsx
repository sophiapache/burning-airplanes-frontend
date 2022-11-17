import React, { Component } from 'react';
import FlightInfo from './FlightInfo';
import SeatChart from './SeatChart';
import SelectedSeat from './SelectedSeat';
import axios from 'axios'

const RESERVATION_URL = 'http://localhost:3000/reservations/new' // post url

class FlightPage extends Component {
    constructor() {
        super();
        this.state = {
            totalSeats: [[]], 
            userId: 0,
            airplaneId: 0,
            flightNumber: 0,
            origin: '',
            destination: '',
            date: '',
            selectedSeat: '', 
            reservations: []
        }

        this._saveReservation = this._saveReservation.bind(this)
    }

    fetchFlightData = () => { 
        const flightId = this.props.match.params.id
        axios(`http://localhost:3000/flights/${flightId}.json`).then((response) => {
            console.log('here',response.data)
            const flightData = Object.assign({}, this.state);
            flightData.userId = response.data.user_id;
            flightData.airplaneId = response.data.airplane_id;
            flightData.flightNumber = response.data.flight_number;
            flightData.origin = response.data.origin;
            flightData.destination = response.data.destination;
            flightData.reservations = response.data.reservations;
            const date = new Date(response.data.date).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
            flightData.date = date;
            this.setState(flightData);

            let reservedSeats = {}
            
            for (let i = 0; i < flightData.reservations.length; i++) {
                const currentSeat = flightData.reservations[i].seat;
                console.log(flightData.reservations[i])
                reservedSeats[`${flightData.reservations[i].id}`] = {
                    row: currentSeat.slice(0, -1), // seat number
                    column: currentSeat.slice(-1).charCodeAt(0) % 32, // seat letter to number
                    user: flightData.reservations[i].user_id // todo: find user name
                }
            }

            axios(`http://localhost:3000/airplanes/${flightData.airplaneId}.json`).then((response) => {
                const totalSeats = new Array(response.data.rows);

                for (let i = 0; i < totalSeats.length; i++) {
                    totalSeats[i] = new Array(response.data.columns);
                    for (let j = 0; j < totalSeats[i].length; j++) {
                        const seatLetter = String.fromCharCode(j + "A".charCodeAt(0));
                        totalSeats[i][j] = {
                            seat: `${seatLetter}${i+1}`,
                            row: i,
                            column: j
                        };
                    }
                }

                console.log(totalSeats)
                Object.keys(reservedSeats).forEach(key => {
                    const row = reservedSeats[key].row;
                    const column = reservedSeats[key].column;
                    console.log(row, column)
                    totalSeats[row - 1][column - 1]['user'] = reservedSeats[key].user;
                })

                const flightData = Object.assign({}, this.state);
                flightData.totalSeats = totalSeats;
                this.setState(flightData);
            })
        });
    }

    componentDidMount() {
        this.fetchFlightData();
    }

    _handleSelectedSeat = (seat) => {
        console.log('seat is', seat)
        const updatedState = Object.assign({}, this.state);
        updatedState.selectedSeat = seat;
        console.log(updatedState.selectedSeat)
        this.setState(updatedState)
    }
    
    _saveReservation() {
        axios.post(RESERVATION_URL, {
            user_id: this.state.userId,
            airplane_id: this.state.airplaneId,
            seat: this.state.selectedSeat
        }).then(() => {
            this.fetchFlightData()
        });
    }
    
    render() {
        const flight = this.state;
    
        return (
            <div className="flight-page-container">
                <FlightInfo
                    number={flight.flightNumber}
                    origin={flight.origin}
                    destination={flight.destination}
                    date={flight.date}
                />
                <SeatChart
                    seats={flight.totalSeats}
                    onSelectedSeat={this._handleSelectedSeat}
                />
                <SelectedSeat
                    seat={flight.selectedSeat}
                    onSubmit={this._saveReservation}
                />
            </div>
        );
    };
}
export default FlightPage;