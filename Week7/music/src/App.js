import React, { useEffect, useState } from 'react';
//import ReactDOM from 'react-dom';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Card from './Card';
import './App.css';
//import albums from './albums.json';
import SearchAlbum from './SearchAlbum';
import dataSource from './dataSource';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import NavBar from './NavBar';
import EditAlbum from './EditAlbum';
import OneAlbum from './OneAlbum';

const App = (props) => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [albumList, setAlbumList] = useState([]);
    const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);

    let refresh = false;

    const updateSearchResults = (phrase) => {
        console.log('Phrase is ' + phrase);
        setSearchPhrase(phrase);
    }

    useEffect(() => {
        //setAlbumList(albums);
        loadAlbums();
    }, [refresh]);

    const loadAlbums = async () => {
        const response = await dataSource.get('/albums');

        setAlbumList(response.data);
    }

    const renderedList = albumList.filter((album) => {
        if (
            album.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
            searchPhrase === ''
        ) {
            return true;
        }
        return false;
    });

    const updateSingleAlbum = (id, navigate, uri) => {
        console.log('Update Single Album = ', id);
        console.log('Update Single Album = ', navigate);
        var indexNumber = 0;
        //alert(JSON.stringify(albumList));
        for (var i=0; i < albumList.length; i++) {
            //alert('albumList[i].albumId: ' + albumList[i].albumId + '\ni: ' + i + '\nid: ' + id);
            if (albumList[i].albumId === id) {
                //alert('albumList[i].id: ' + albumList[i].id + '\ni: ' + i);
                indexNumber = i;
                break;
            }
        }
        setCurrentlySelectedAlbumId(indexNumber);
        let path = uri + indexNumber;
        console.log('path', path);
        navigate(path);
    };

    console.log('renderedList', renderedList);

    const onEditAlbum = (navigate) => {
        loadAlbums();
        navigate("/");
    }
    
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route
                    exact
                    path='/'
                    element={
                        <SearchAlbum
                            updateSearchResults={updateSearchResults}
                            albumList={renderedList}
                            updateSingleAlbum={(albumId, navigate, uri) => updateSingleAlbum(albumId, navigate, uri)} 
                        />
                    }
                />
                <Route exact path='/new' element={<EditAlbum onEditAlbum={onEditAlbum}/>} />
                <Route exact path='/edit/:albumId' element={<EditAlbum onEditAlbum={onEditAlbum} album={albumList[currentlySelectedAlbumId]}/>} />
                <Route 
                    exact
                    path='/show/:albumId'
                    element={<OneAlbum album={albumList[currentlySelectedAlbumId]} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;