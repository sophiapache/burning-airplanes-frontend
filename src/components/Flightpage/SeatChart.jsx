import React, {useState} from 'react';

const SeatChart = (props) => {
    const [isActive, setIsActive] = useState(false);

    const toggleClass = (e) => {
        setIsActive(!useState)
    }


    const _handleClick = (e) => {
        e.preventDefault();
        toggleClass(e);  

        e.target.className = "active-button";
        const buttonValue = e.target.innerText;
        props.onSelectedSeat(buttonValue);
    }

    const getButton = (seat) => {

        if ('user' in seat) {
            return (
                <button className="unavailable-seat" key={seat.seat} disabled>
                    <strong>{seat.user}</strong>
                </button>
            );
        } else {
            return (
                <button className={`unavailable-seat ${isActive ? "" : "active-button"}`} onClick={_handleClick} key={seat.seat}>
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