import axios from 'axios';
import React, { useState } from 'react';

const SearchForm = (props) => {
    const [info, setInfo] = useState('');

    const _handleInput = (e) => {
        setInfo(e.target.value);
    };

    const _handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(info);
    }

    return (
        <form onSubmit={ _handleSubmit }>
            <label for="destination">Destination</label>
            <input type="text" onInput={ _handleInput }  id="destination" name="destination" required />
            <label for="origin">Origin</label>
            <input type="text" onInput={ _handleInput }  id="origin" name="origin" required />
            <input type="submit" value="Search" />
        </form>
    );
};

export default SearchForm;