import React from 'react';

const TrackTitle = (props) => {
    return (
        <span onClick={() => props.onClick(props.trackId)}>
            {props.text}
        </span>
    );
};

export default TrackTitle;