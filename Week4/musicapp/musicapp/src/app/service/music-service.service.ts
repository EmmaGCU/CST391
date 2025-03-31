import { Injectable } from '@angular/core';
import exampledata from '../../data/sample-music-data.json'; //import the data for the application
import { Artist } from './../models/artists.model'; //import the Artist model
import { Album } from '../models/albums.model'; //import the Album model
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MusicServiceService {

  constructor(private http: HttpClient) {}

  private host = "http://localhost:3000";

  //albums: Album[] = exampledata; //read the data into an array

  public getArtists(callback: (artists: Artist[]) => void): void { //get a list of all artists that exist in the database
    this.http.get<Artist[]>(this.host + "/artists").
      subscribe((artists: Artist[]) => {
        callback(artists);
      });
  }

  public getAlbums(callback: (albums: Album[]) => void): void { //get a list of all albums that exist in the database
    this.http.get<Album[]>(this.host + "/albums").
      subscribe((albums: Album[]) => {
        callback(albums);
      });
  }

  public getAlbum(callback:(album: Album) => void, id: number): void { //retrieve an album based on its Id
    this.http.get<Album>(this.host + "/albums?id="+id).
      subscribe((album: Album) => {
        callback(album);
      });
  }

  public getAlbumsOfArtist(artistName: String, callback: (albums: Album[]) => void): void { //get all albums by a given artist
    let request = this.host + '/albums/' + artistName;
    console.log('request', request);
    this.http.get<Album[]>(request).
      subscribe((albums: Album[]) => {
        console.log(albums);
        callback(albums);
      });
  }

  public createAlbum(album: Album, callback: () => void): void { //create a new album
    // Add a new Album to the list of Albums
    this.http.post<Album>(this.host + "/albums", album).
      subscribe((data) => {
        callback();
      });
  }

  public updateAlbum(album: Album, callback: () => void): void {
    this.http.put<Album>(this.host + "/albums", album).
      subscribe((data) => {
        callback();
      });
  }

  public deleteAlbum(id: number, callback: () => void): void {
    this.http.delete(this.host + "/albums/" + id).
      subscribe((data) => {
        callback();
      });
  }
}