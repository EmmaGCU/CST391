
//import Quote from './Quote';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; 

const TagListItem = (props) => {

    const [isChecked, setIsChecked] = useState(props.checked);

    const onCheckboxChange = (event) => {
        console.log("old state was "+isChecked);
        setIsChecked(!isChecked);
       // console.log('tag is ',props.tag);
        //console.log(event.target.checked);
        console.log('Selected checkbox is ', event.target.id);
        props.onChange(props.tag, event.target.checked);
    };


    //console.log("at start, tag is: ",props.tag);

    return (
        <div>
            <input type="checkbox" checked={isChecked} id={props.tag.tagId} onChange={onCheckboxChange} name={props.tag.name}/>
            <label>{props.tag.name}</label>
        </div>
    );
};

export default TagListItem;