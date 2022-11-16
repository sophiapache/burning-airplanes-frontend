const FlightDisplay = (props) => {
    console.log(props);
    return (
        <div>
            <p> { props.flights.length }</p>
        </div>
    );
};

export default FlightDisplay;