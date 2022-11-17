import React from 'react';

const SelectedSeat = (props) => {
    return (
        <div className="selected-seat-container">
            Selected seat {props.seat}
        </div>
    );
}

export default SelectedSeat