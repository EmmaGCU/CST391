import React, { useEffect, useState, setState } from 'react';
import dataSource from './dataSource';
//import Quote from './Quote';
import QuoteListItem from './QuoteListItem';
import { useNavigate } from 'react-router-dom';

const QuoteList = (props) => {
    const [currentlySelectedQuoteIndex, setCurrentlySelectedQuoteIndex] = useState(null);

    const onSelectQuote = (quoteId) => {
        let quoteIndex;
        console.log('QuoteId in QuoteList', quoteId);
        for(let i=0; i<props.quoteList.length; i++) {
            if (props.quoteList[i].quoteId === quoteId) {
                setCurrentlySelectedQuoteIndex(i);
                console.log("Found quote ID",quoteId," at index ",i);
                quoteIndex = i;
                break;
            }
        }
        navigate('/quote', {state:{quote:props.quoteList[quoteIndex], user:props.user}})
    };

    // useEffect(() => {
    //     if (props.quoteList != null) {
    //         setMyQuoteList(props.quoteList);
    //     }
    //     else {
    //         loadQuotes();
    //     }

    // }, []);

    // const loadQuotes = async (userId) => {
    //     let response;
    //     response = await dataSource.get('/quotes?userId=1');
    //     setMyQuoteList(response.data);
    //     console.log("*** refreshed from DB ***",response.data);
    // }

    console.log('props quoteList', props);
    const navigate = useNavigate();

    // if (myQuoteList==null && props.quoteList != null) {
    //     setMyQuoteList(props.quoteList);
    // }

    // if (myQuoteList === null) {
    //     return (<div>Loading...</div>);
    // }
    // else {
        const quotes = props.quoteList.map((quote) => {
            console.log(JSON.stringify(quote));
            console.log('bulding button for quote id ',quote.quoteId);
            //const x = quote.quoteId;
            return (
                <QuoteListItem quote={quote} onClick={(quoteId) => onSelectQuote(quoteId, navigate)}/>
            );
        });
        return <div style={{textAlign: 'center', width: '100%'}}>{quotes}</div>
    // }
};

export default QuoteList;