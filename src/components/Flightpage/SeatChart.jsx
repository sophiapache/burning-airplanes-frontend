import React from 'react';

const SeatChart = (props) => {
    
    // const __handleSelection = (e) => {

    // }

    const getButton = (seat) => {

        if ('user' in seat) {
            return (
                <button>
                    <strong>user</strong>
                </button>
            );
        } else {
            return (
                <button>
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