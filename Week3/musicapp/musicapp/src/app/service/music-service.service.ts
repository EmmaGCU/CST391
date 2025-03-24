import { Injectable } from '@angular/core';
import exampledata from '../../data/sample-music-data.json'; //import the data for the application
import { Artist } from './../models/artists.model'; //import the Artist model
import { Album } from '../models/albums.model'; //import the Album model

@Injectable({ providedIn: 'root' })
export class MusicServiceService {

  albums: Album[] = exampledata; //read the data into an array

  public getArtists(): Artist[] { //get a list of all artists that exist in the database
    let artists: Artist[] = []; //create an array to store the artists
    let artistSet = new Set<string>(); //create a set to avoid duplicate artists

    //for each album in the albums array, add its artist to the set
    this.albums.forEach(a => artistSet.add(a.artist)); 

    //for each artist in the set, add to the artists array
    artistSet.forEach(a => artists.push({artist: a})) 

    return artists; //return the list of artists found
  }

  public getAlbums(): Album[] {
    // Return the list of Albums
    return this.albums;
  }

  public getAlbum(id: number): Album | null { //retrieve an album based on its Id
    let album = null; //declare and initialize the album variable
    for (let i=0; i<this.albums.length; i++) { //for each album
      if (this.albums[i].albumId == id) { //if the id of the current album matches the given id
        album = this.albums[i]; //set the value of album
        break; //we have found our album, exit the loop
      }
    }
    return album; //return the album found (will be null if not found)
  }

  public getAlbumsOfArtist(artistName: String): Album[] { //get all albums by a given artist

    let albums: Album[] = []; //create an array of albums to hold any matches found

    this.albums.forEach(album => { //for each album
      //if the current album's artist matches the given artist name
      if (album.artist == artistName) { 
        albums.push(album); //add the album to the array of matches
      }
    });
    return albums; //return the array of matching albums
  }

  public createAlbum(album: Album): number { //create a new album
    // Add a new Album to the list of Albums
    this.albums.push(album);
    return 1;
  }

  public updateAlbum(album: Album): number {
    // Search for the Album in the list of Albums and replace it in the list
    for (let i = 0; i < this.albums.length; ++i) { //for each album
      if (this.albums[i].albumId == album.albumId) { //if the current album's id matches the id of the given album
        this.albums.splice(i, 1, album); //replace the original album with the given album
        return 0; //return successful 
      }
    }
    return -1; //no album found with matching id, cannot update a non-existing album
  }

  public deleteAlbum(id: number): number {
    // Search for the Album in the list of Albums and delete from the list
    for (let i = 0; i < this.albums.length; ++i) { //for each album
      if (this.albums[i].albumId == id) { //if the current album's id matches the id given
        this.albums.splice(i, 1); //remove the album from the list
        return 0; //return successful
      }
    }
    return -1; //album not found, cannot delete a non-existing album
  }
}