import React from 'react';

const FlightInfo = (props) => {
    return (
        <div>
            <h1>Virgin Airplane</h1>
            <div className='flight-info-container'>
                <div>{props.number}</div>
                <div>{props.date}</div>
                <div>{props.origin} > {props.destination}</div>
            </div>
        </div>
    );
}

export default FlightInfo;
