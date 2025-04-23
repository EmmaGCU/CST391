import React from 'react';
import TrackTitle from './TrackTitle';

const TrackList = (props) => {
const handleSelectTrack = (trackId) => {
    props.onClick(trackId);
}

    const tracks = props.tracks.map((track) => {
        return (
            <div>
                <li><TrackTitle text={track.title} trackId={track.trackId} onClick={(trackId) => handleSelectTrack(trackId)}/></li>
            </div>
        );
    });

    return (
        <div>
            Tracks:
            {tracks}
        </div>
    );
};

export default TrackList;