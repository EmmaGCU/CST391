import React from 'react';

const TrackVideo = (props) => {
    return (
        <div>
            <a href={props.track.video}>{props.track.video}</a>
        </div>
    );
}

export default TrackVideo;