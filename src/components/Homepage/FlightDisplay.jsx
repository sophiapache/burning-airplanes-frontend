import { Link } from 'react-router-dom';

const FlightDisplay = (props) => {
    return (
        <div className='flight-info-container'>
            <div><h3>Date:</h3>{ props.flights.map((f) => <p key={ f.id }>{ f.date }</p>) }</div>
            <div><h3>Flight ID:</h3>{ props.flights.map((f) => <p><Link to ={`/flights/${ f.id }`}>{ f.id }</Link></p>) }</div>
            <div><h3>Origin:</h3>{ props.flights.map((f) => <p key={ f.id }>{ f.origin }</p>) }</div>
            <div><h3>Destination:</h3>{ props.flights.map((f) => <p key={ f.id }>{ f.destination }</p>) }</div>
            <div><h3>Airplane ID:</h3>{ props.flights.map((f) => <p key={ f.id }>{ f.airplane_id }</p>) }</div>
        </div>
    );
};

export default FlightDisplay;