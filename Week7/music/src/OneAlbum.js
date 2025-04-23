import React, {useState} from "react";
import TrackList from './TrackList';
import TrackLyrics from './TrackLyrics';
import TrackVideo from "./TrackVideo";

const OneAlbum = (props) => {
    const [selectedTrack, setSelectedTrack] = useState(0);

    const onSelectTrack = (trackNumber) => {
        //alert(JSON.stringify(trackNumber));
        for (let i=0; i<props.album.tracks.length; i++) {
            if(props.album.tracks[i].trackId == trackNumber) {
                //alert("index "+i);
                setSelectedTrack(i);
            }
        }
    }

    //alert(JSON.stringify(props.album.tracks));

    return (
        <div className="container">
            <h2>Album Details for {props.album.title}</h2>
            <div className="row" >
                <div className="col col-sm-3" >
                    <div className="card" >
                        <img
                            src={props.album.image}
                            className="card-img-top"
                            alt={props.album.title}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{props.album.title}</h5>
                            <p className="card-text">{props.album.description}</p>
                            <div className="list-group">
                                <TrackList tracks={props.album.tracks} onClick={(trackNumber) => onSelectTrack(trackNumber)} />
                            </div>
                            <a href='/#' className="btn btn-primary">
                                Edit
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-9">
                    <div className="card">
                        <TrackLyrics track={props.album.tracks[selectedTrack]} />
                    </div>
                    <div className="card">
                        <TrackVideo track={props.album.tracks[selectedTrack]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneAlbum;