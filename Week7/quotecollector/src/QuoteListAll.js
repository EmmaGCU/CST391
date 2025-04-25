import React, { useEffect, useState, setState } from 'react';
import QuoteList from './QuoteList';
import dataSource from './dataSource';
import { useNavigate } from 'react-router-dom';

const QuoteListAll = (props) => {
    const [quoteList, setQuoteList] = useState([]);

    const loadQuotes = async (userId) => {
        let response;
        response = await dataSource.get('/quotes?userId='+userId);
        //setState. ({quoteList: response.data});
        setQuoteList(response.data);
        //console.log("Quotes loaded in QLA: ",response.data);
        
    }

    const onSelectQuote = (quoteId, navigate) => {
        console.log('Selected quote is ', quoteId);
        props.onClick(quoteId, navigate);
    };

    useEffect(() => {
        //console.log('In QLA useEffect')
        loadQuotes(props.user);
    }, []);

    //console.log("Rendering QLA");

    return (
        <QuoteList quoteList={quoteList} from='/quotes' user={props.user} onClick={(quoteId, navigate) => onSelectQuote(quoteId, navigate)}/>
        // (ready) ? 
        // (<QuoteList quoteList={quoteList} user={props.user} onClick={(quoteId, navigate) => onSelectQuote(quoteId, navigate)}/>)
        //  :
        //  (<div>Loading...</div>)
    );
};

export default QuoteListAll;