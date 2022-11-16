import React from 'react';

const SeatChart = (props) => {
    console.log(props)
    return (
        <div className="seat-chart-container">
            { props.seats.map((column) => {
                return (
                    <div className="row-container">
                        {column.map((row) => {
                            return (
                                <button>{row.seat}</button>
                            );
                        })}
                    </div>
                );
            })} 
        </div>
    );
}

export default SeatChart;