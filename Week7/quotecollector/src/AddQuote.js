import React, { useEffect, useState, setState } from 'react';
import QuoteList from './QuoteList';
import dataSource from './dataSource';
import { useNavigate } from 'react-router-dom';

const AddQuote = (props) => {
    let navigate = useNavigate();

    useEffect(() => {
        navigate('/edit', {state:{user:props.user}});
    }, []);
};

export default AddQuote;