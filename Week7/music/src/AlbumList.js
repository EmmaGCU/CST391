import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const AlbumList = (props) => {
    const handleSelectionOne = (albumId, uri) => {
        console.log('Selected ID is ' + albumId);
        props.onClick(albumId, navigator, uri);
    };

    console.log('props albumList', props);
    const navigator = useNavigate();
    const albums = props.albumList.map((album) => {
        //alert(JSON.stringify(album));
        return (
            <Card
                key={album.albumId}
                albumId={album.albumId}
                albumTitle={album.title}
                albumDescription={album.description}
                buttonText='Details'
                imgURL={album.image}
                onClick={handleSelectionOne}
            />
        );
    });
    return <div className='container'>{albums}</div>
};

export default AlbumList;