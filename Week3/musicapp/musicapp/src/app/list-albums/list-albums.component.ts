import { Component, Input, OnInit } from '@angular/core';
import { MusicServiceService } from '../service/music-service.service';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DisplayAlbumComponent } from "../display-album/display-album.component";

@Component({
  selector: 'app-list-albums',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DisplayAlbumComponent
],
  templateUrl: './list-albums.component.html',
  styleUrl: './list-albums.component.css'
})
export class ListAlbumsComponent implements OnInit {
  @Input() artist!: Artist;
  albums!: Album[];
  selectedAlbum: Album | null = null;

  constructor(private service: MusicServiceService) {}

  ngOnInit(): void {
    this.albums = this.service.getAlbumsOfArtist(this.artist!.artist);
  }

  onSelectAlbum(album: Album) {
    this.selectedAlbum = album;
  }
}
