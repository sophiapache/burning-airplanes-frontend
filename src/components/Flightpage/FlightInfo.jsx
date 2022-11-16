import React from 'react';

const FlightInfo = (props) => {
    return (
        <div>
            <h1>Company name</h1>
            <ul>
                <li>{props.number}</li>
                <li>{props.date}</li>
                <li>{props.origin} > {props.destination}</li>
            </ul>
        </div>
    );
}

export default FlightInfo;
