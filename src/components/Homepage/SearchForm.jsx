import axios from 'axios';
import React, { useState } from 'react';

const SearchForm = (props) => {

    const _handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit();
        // props.onSubmit(origin);
        // props.onSubmit(destination);
    };



    return (
        <form onSubmit={ _handleSubmit }>
            <label for="origin">Origin</label>
            <input type="text" onChange={ props._handleInputOne }  id="origin" name="origin" required />
            <label for="destination">Destination</label>
            <input type="text" onChange={ props._handleInputTwo }  id="destination" name="destination" required />
            <input type="submit" value="Search" />
        </form>
    );
};

export default SearchForm;