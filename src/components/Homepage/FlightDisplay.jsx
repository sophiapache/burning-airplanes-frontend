const FlightDisplay = (props) => {
    return (
        <div>
            { props.flights.map((f) => <p key={ f.id }>Date: { f.date }</p>) }
            { props.flights.map((f) => <p key={ f.id }>Flight ID: { f.id }</p>) }
            { props.flights.map((f) => <p key={ f.id }>Origin: { f.origin }</p>) }
            { props.flights.map((f) => <p key={ f.id }>Destination: { f.destination }</p>) }
            { props.flights.map((f) => <p key={ f.id }>Airplane: { f.airplane_id }</p>) }
        </div>
    );
};

export default FlightDisplay;