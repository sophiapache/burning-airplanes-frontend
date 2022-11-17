import React from 'react';

const SelectedSeat = (props) => {
    const _handleClick = () => {
        props.onSubmit()
    }

    return (
        <div className="selected-seat-container">
            <div>Selected seat {props.seat}</div>
            <div><button onClick={_handleClick}>Buy ticket</button></div>
        </div>
        
    );
}

export default SelectedSeat