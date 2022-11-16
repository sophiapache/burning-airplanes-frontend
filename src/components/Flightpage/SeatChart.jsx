import React from 'react';

const SeatChart = (props) => {
    
    const _handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.innerText)
        const buttonValue = e.target.innerText;
        props.onSelectedSeat(buttonValue);
    }

    const getButton = (seat) => {

        if ('user' in seat) {
            return (
                <button key={seat.seat} disabled>
                    <strong>user</strong>
                </button>
            );
        } else {
            return (
                <button onClick={_handleClick} key={seat.seat}>
                    {seat.seat}
                </button>
            );
        }
        
    }


    return (
        <div className="seat-chart-container">
            { props.seats.map((column) => {
                return (
                    <div className="row-container">
                        {column.map((row) => {
                            return (
                                getButton(row)
                            );
                        })}
                    </div>
                );
            })} 
        </div>
    );
}

export default SeatChart;