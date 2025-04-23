import React from "react";
import SearchForm from "./searchForm";
import AlbumList from "./AlbumList";

const SearchAlbum = (props) => {
    console.log('props with update single album ', props);
    return (
        <div className='container'>
            <SearchForm onSubmit={props.updateSearchResults} />
            <AlbumList albumList={props.albumList} onClick={(albumId, navigate, uri) => props.updateSingleAlbum(albumId, navigate, uri)} />
        </div>
    );
};

export default SearchAlbum;