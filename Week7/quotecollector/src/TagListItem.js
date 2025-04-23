import React from 'react';
//import Quote from './Quote';
import { useNavigate } from 'react-router-dom';

const TagListItem = (props) => {
    const onSelectQuote = (tagId) => {
        console.log('Selected checkbox is ', tagId);
        props.onChange(tagId);
    };

    return (
        <div>
            <input type="checkbox" id={props.tag.tagId} name={props.tag.name} 
                value={props.tag.tagId} />
            <label>{props.tag.name}</label>
        </div>
    );
};

export default TagListItem;