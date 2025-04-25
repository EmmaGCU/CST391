import React, { useEffect, useState, setState } from 'react';
import dataSource from './dataSource';
//import Quote from './Quote';
import QuoteListItem from './QuoteListItem';
import { useNavigate, useLocation } from 'react-router-dom';

const QuoteList = (props) => {
    const [currentlySelectedQuoteIndex, setCurrentlySelectedQuoteIndex] = useState(null);

    if (props.search) {
        console.log('QuoteList search: ', props.search);
    }
    else {
        console.log('QuoteList search: undefined');
    }

    const onSelectQuote = (quoteId) => {
        let quoteIndex;
        //console.log('QuoteId in QuoteList', quoteId);
        for(let i=0; i<props.quoteList.length; i++) {
            if (props.quoteList[i].quoteId === quoteId) {
                setCurrentlySelectedQuoteIndex(i);
                //console.log("Found quote ID",quoteId," at index ",i);
                quoteIndex = i;
                break;
            }
        }
        if (props.from === '/quotes') {
            console.log('from: ', props.from);
            navigate('/quote', {state:{quote:props.quoteList[quoteIndex], user:props.user, from:props.from}})
        }
        else {
            console.log('from: ', props.from);
            navigate('/quote', {state:{quote:props.quoteList[quoteIndex], user:props.user, from:props.from, search:props.search}})
        }
    };

    const navigate = useNavigate();

    const quotes = props.quoteList.map((quote) => {
        return (
            <QuoteListItem quote={quote} onClick={(quoteId) => onSelectQuote(quoteId, navigate)}/>
        );
    });
    return <div style={{textAlign: 'center', width: '100%'}}>{quotes}</div>
};

export default QuoteList;