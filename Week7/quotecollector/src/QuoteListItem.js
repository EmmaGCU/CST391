import React from 'react';
//import Quote from './Quote';
import { useNavigate } from 'react-router-dom';

const QuoteListItem = (props) => {
    const onSelectQuote = (quoteId) => {
        console.log('Selected quote is ', quoteId);
        props.onClick(quoteId);
    };

    return (
        <div style={{textAlign: 'center', width: '100%'}}>
            <button className="list-group-item btn" style={{textAlign: 'center', width: '100%'}} active onClick={() => onSelectQuote(props.quote.quoteId)}>
                {props.quote.text}
            </button>
        </div>
    );
};

export default QuoteListItem;