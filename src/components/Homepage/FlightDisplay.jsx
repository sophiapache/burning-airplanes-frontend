import { Link } from 'react-router-dom';

const FlightDisplay = (props) => {
    return (
        <div className='flight-info-container'>
            <div>{ props.flights.map((f) => <p key={ f.id }>Date: { f.date }</p>) }</div>
            <div>{ props.flights.map((f) => <p><Link to ={`/flights/${ f.id }`}>Flight ID: { f.id }</Link></p>) }</div>
            <div> { props.flights.map((f) => <p key={ f.id }>Origin: { f.origin }</p>) }</div>
            <div>{ props.flights.map((f) => <p key={ f.id }>Destination: { f.destination }</p>) }</div>
            <div>{ props.flights.map((f) => <p key={ f.id }>Airplane: { f.airplane_id }</p>) }</div>
        </div>
    );
};

export default FlightDisplay;